import { type NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/products-data"

export async function POST(request: NextRequest) {
  try {
    // Try multiple possible environment variable names
    const expectedAuth =
      process.env.SYNC_SECRET_KEY || process.env.STRIPE_SYNC_KEY || process.env.API_SECRET_KEY || "Kinetix2025"

    const stripeKey = process.env.STRIPE_SECRET_KEY

    // Debug logging
    console.log("=== RESYNC STRIPE DEBUG ===")
    console.log("STRIPE_SECRET_KEY:", !!stripeKey)
    console.log("NODE_ENV:", process.env.NODE_ENV)
    console.log("Products to sync:", products.length)

    if (!stripeKey) {
      return NextResponse.json(
        {
          error: "STRIPE_SECRET_KEY not found in environment variables",
        },
        { status: 500 },
      )
    }

    // Check authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Missing or invalid Authorization header format",
          expected: "Authorization: Bearer <token>",
        },
        { status: 401 },
      )
    }

    const token = authHeader.replace("Bearer ", "")
    if (token !== expectedAuth) {
      return NextResponse.json(
        {
          error: "Invalid authorization token",
        },
        { status: 401 },
      )
    }

    const results = {
      created: 0,
      updated: 0,
      errors: 0,
      details: [] as any[],
    }

    const priceMapping = {
      oneTime: {} as Record<string, string>,
      subscription: {} as Record<string, string>,
    }

    console.log(`🔄 Starting re-sync of ${products.length} products...`)

    for (const product of products) {
      try {
        console.log(`🔄 Processing: ${product.name} (${product.id})`)

        // First, try to find existing product by metadata
        const existingProductsResponse = await fetch("https://api.stripe.com/v1/products?limit=100", {
          headers: {
            Authorization: `Bearer ${stripeKey}`,
          },
        })

        const existingProducts = await existingProductsResponse.json()
        let existingProduct = existingProducts.data.find((p: any) => 
          p.metadata?.local_id === product.id || p.id === product.id
        )

        let stripeProduct

        if (existingProduct) {
          console.log(`📝 Updating existing product: ${product.name}`)
          
          // Update existing product
          const updateResponse = await fetch(`https://api.stripe.com/v1/products/${existingProduct.id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeKey}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              name: product.name,
              description: product.overview.substring(0, 500),
              "metadata[category]": product.category,
              "metadata[local_id]": product.id,
            }),
          })

          stripeProduct = await updateResponse.json()
          
          if (updateResponse.ok) {
            console.log(`✅ Updated product: ${product.name}`)
            results.updated++
            results.details.push({ product: product.name, status: "updated" })
          } else {
            throw new Error(`Failed to update product: ${stripeProduct.error?.message}`)
          }
        } else {
          console.log(`🆕 Creating new product: ${product.name}`)
          
          // Create new product
          const createResponse = await fetch("https://api.stripe.com/v1/products", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeKey}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              id: product.id, // Use local ID as Stripe product ID
              name: product.name,
              description: product.overview.substring(0, 500),
              "metadata[category]": product.category,
              "metadata[local_id]": product.id,
            }),
          })

          stripeProduct = await createResponse.json()
          
          if (createResponse.ok) {
            console.log(`✅ Created product: ${product.name}`)
            results.created++
            results.details.push({ product: product.name, status: "created" })
          } else {
            throw new Error(`Failed to create product: ${stripeProduct.error?.message}`)
          }
        }

        // Now handle prices - first delete existing prices for this product
        const existingPricesResponse = await fetch(`https://api.stripe.com/v1/prices?product=${stripeProduct.id}`, {
          headers: {
            Authorization: `Bearer ${stripeKey}`,
          },
        })

        const existingPrices = await existingPricesResponse.json()
        
        // Archive existing prices
        for (const price of existingPrices.data) {
          if (!price.archived) {
            await fetch(`https://api.stripe.com/v1/prices/${price.id}`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${stripeKey}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                active: "false",
              }),
            })
            console.log(`🗑️ Archived old price: ${price.id}`)
          }
        }

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
        } else {
          console.error(`❌ Failed to create one-time price: ${oneTimePrice.error?.message}`)
        }

        // Create subscription price if applicable
        if (product.subscriptionPrice && product.subscriptionPrice > 0) {
          const subscriptionPriceResponse = await fetch("https://api.stripe.com/v1/prices", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeKey}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              product: stripeProduct.id,
              unit_amount: Math.round(product.subscriptionPrice * 100).toString(),
              currency: "usd",
              recurring: JSON.stringify({ interval: "month" }),
              "metadata[local_id]": product.id,
              "metadata[purchase_type]": "subscription",
            }),
          })

          const subscriptionPrice = await subscriptionPriceResponse.json()

          if (subscriptionPriceResponse.ok) {
            console.log(`🔄 Created subscription price: $${product.subscriptionPrice}/month (${subscriptionPrice.id})`)
            priceMapping.subscription[product.id] = subscriptionPrice.id
          } else {
            console.error(`❌ Failed to create subscription price: ${subscriptionPrice.error?.message}`)
          }
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500))

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

    // Generate the updated price mapping code
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

    console.log("✅ Re-sync completed!")
    console.log(`📊 Results: ${results.created} created, ${results.updated} updated, ${results.errors} errors`)

    return NextResponse.json({
      success: true,
      results,
      priceMapping,
      priceMappingCode,
      message: `Re-sync completed: ${results.created} created, ${results.updated} updated, ${results.errors} errors`,
    })
  } catch (error) {
    console.error("Re-sync error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
