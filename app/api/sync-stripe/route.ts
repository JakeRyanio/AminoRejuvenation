import { type NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/products-data"

export async function POST(request: NextRequest) {
  try {
    // Try multiple possible environment variable names
    const expectedAuth =
      process.env.SYNC_SECRET_KEY || process.env.STRIPE_SYNC_KEY || process.env.API_SECRET_KEY || "Kinetix2025" // Fallback for testing

    const stripeKey = process.env.STRIPE_SECRET_KEY

    // Debug logging
    console.log("=== SYNC STRIPE DEBUG ===")
    console.log("SYNC_SECRET_KEY:", process.env.SYNC_SECRET_KEY ? "SET" : "NOT SET")
    console.log("STRIPE_SYNC_KEY:", process.env.STRIPE_SYNC_KEY ? "SET" : "NOT SET")
    console.log("API_SECRET_KEY:", process.env.API_SECRET_KEY ? "SET" : "NOT SET")
    console.log("STRIPE_SECRET_KEY:", !!stripeKey)
    console.log("NODE_ENV:", process.env.NODE_ENV)
    console.log("Using auth token:", expectedAuth ? "SET" : "NOT SET")

    if (!stripeKey) {
      return NextResponse.json(
        {
          error: "STRIPE_SECRET_KEY not found in environment variables",
          debug: {
            syncKeyExists: !!process.env.SYNC_SECRET_KEY,
            stripeKeyExists: !!stripeKey,
            nodeEnv: process.env.NODE_ENV,
          },
        },
        { status: 500 },
      )
    }

    // Check authorization header
    const authHeader = request.headers.get("authorization")
    console.log("Auth header received:", authHeader ? "EXISTS" : "MISSING")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Missing or invalid Authorization header format",
          expected: "Authorization: Bearer <token>",
          received: authHeader ? "Header exists but wrong format" : "No header",
        },
        { status: 401 },
      )
    }

    const token = authHeader.replace("Bearer ", "")
    console.log("Token extracted:", token ? "EXISTS" : "EMPTY")
    console.log("Expected token:", expectedAuth)
    console.log("Tokens match:", token === expectedAuth)

    if (token !== expectedAuth) {
      return NextResponse.json(
        {
          error: "Invalid token",
          debug: {
            tokenReceived: !!token,
            tokenLength: token?.length || 0,
            expectedLength: expectedAuth?.length || 0,
            match: token === expectedAuth,
            receivedToken: token, // Temporary for debugging
            expectedToken: expectedAuth, // Temporary for debugging
          },
        },
        { status: 401 },
      )
    }

    console.log("🚀 Starting Stripe product sync with subscription support...")
    console.log(`📦 Found ${products.length} products to sync`)

    const results = {
      created: 0,
      existing: 0,
      errors: 0,
      details: [] as any[],
    }

    const priceMapping = {
      oneTime: {} as Record<string, string>,
      subscription: {} as Record<string, string>,
    }

    for (const product of products) {
      try {
        console.log(`🔄 Processing: ${product.name}`)

        // Create product in Stripe
        const productResponse = await fetch("https://api.stripe.com/v1/products", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${stripeKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            id: product.id,
            name: product.name,
            description: product.overview.substring(0, 500),
            "metadata[category]": product.category,
            "metadata[local_id]": product.id,
          }),
        })

        const stripeProduct = await productResponse.json()

        if (productResponse.ok) {
          console.log(`✅ Created product: ${product.name}`)
          results.created++
          results.details.push({ product: product.name, status: "created" })

          // Create one-time purchase price
          const oneTimePriceResponse = await fetch("https://api.stripe.com/v1/prices", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeKey}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              product: stripeProduct.id,
              unit_amount: Math.round(product.price * 100).toString(),
              currency: "usd",
              "metadata[local_id]": product.id,
              "metadata[purchase_type]": "one-time",
            }),
          })

          const oneTimePrice = await oneTimePriceResponse.json()

          if (oneTimePriceResponse.ok) {
            console.log(`💰 Created one-time price: $${product.price} (${oneTimePrice.id})`)
            priceMapping.oneTime[product.id] = oneTimePrice.id
          }

          // Create subscription price
          const subscriptionPriceResponse = await fetch("https://api.stripe.com/v1/prices", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeKey}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              product: stripeProduct.id,
              unit_amount: Math.round((product.subscriptionPrice || 0) * 100).toString(),
              currency: "usd",
              "recurring[interval]": "month",
              "metadata[local_id]": product.id,
              "metadata[purchase_type]": "subscription",
            }),
          })

          const subscriptionPrice = await subscriptionPriceResponse.json()

          if (subscriptionPriceResponse.ok) {
            console.log(`🔄 Created subscription price: $${product.subscriptionPrice}/month (${subscriptionPrice.id})`)
            priceMapping.subscription[product.id] = subscriptionPrice.id
          }
        } else {
          if (stripeProduct.error?.code === "resource_already_exists") {
            console.log(`⚠️  Product already exists: ${product.name}`)
            results.existing++
            results.details.push({ product: product.name, status: "already_exists" })
          } else {
            console.error(`❌ Failed to create product ${product.name}:`, stripeProduct.error?.message)
            results.errors++
            results.details.push({
              product: product.name,
              status: "error",
              error: stripeProduct.error?.message,
            })
          }
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 300))
      } catch (error) {
        console.error(`❌ Error syncing product ${product.name}:`, error)
        results.errors++
        results.details.push({
          product: product.name,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    // Generate the price mapping code
    const priceMappingCode = `export const STRIPE_PRICE_MAP = {
  oneTime: {
${Object.entries(priceMapping.oneTime)
  .map(([productId, priceId]) => `    "${productId}": "${priceId}",`)
  .join("\n")}
  },
  subscription: {
${Object.entries(priceMapping.subscription)
  .map(([productId, priceId]) => `    "${productId}": "${priceId}",`)
  .join("\n")}
  },
}`

    return NextResponse.json({
      success: true,
      results,
      priceMapping,
      priceMappingCode,
      message: "Sync completed successfully",
    })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Also allow GET for easy testing
export async function GET() {
  return NextResponse.json({
    message: "Stripe sync endpoint ready. Use POST with Authorization header to sync products.",
    debug: {
      syncKeyExists: !!process.env.SYNC_SECRET_KEY,
      stripeKeyExists: !!process.env.STRIPE_SECRET_KEY,
      nodeEnv: process.env.NODE_ENV,
      allEnvKeys: Object.keys(process.env).filter((key) => key.includes("SECRET") || key.includes("SYNC")),
    },
  })
}
