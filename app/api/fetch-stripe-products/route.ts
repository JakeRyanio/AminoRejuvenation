import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY

    if (!stripeKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY not found" },
        { status: 500 }
      )
    }

    // Fetch all products from Stripe
    const productsResponse = await fetch("https://api.stripe.com/v1/products?limit=100", {
      headers: {
        Authorization: `Bearer ${stripeKey}`,
      },
    })

    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products: ${productsResponse.statusText}`)
    }

    const productsData = await productsResponse.json()
    const products = productsData.data

    console.log(`Found ${products.length} products in Stripe`)

    // Fetch all prices
    const pricesResponse = await fetch("https://api.stripe.com/v1/prices?limit=100", {
      headers: {
        Authorization: `Bearer ${stripeKey}`,
      },
    })

    if (!pricesResponse.ok) {
      throw new Error(`Failed to fetch prices: ${pricesResponse.statusText}`)
    }

    const pricesData = await pricesResponse.json()
    const prices = pricesData.data

    console.log(`Found ${prices.length} prices in Stripe`)

    // Build price mapping
    const priceMapping = {
      oneTime: {} as Record<string, string>,
      subscription: {} as Record<string, string>,
    }

    // Group prices by product
    const pricesByProduct = prices.reduce((acc: any, price: any) => {
      const productId = price.product
      if (!acc[productId]) {
        acc[productId] = []
      }
      acc[productId].push(price)
      return acc
    }, {})

    // Map products to their prices
    for (const product of products) {
      const productPrices = pricesByProduct[product.id] || []
      
      // Find one-time and subscription prices
      const oneTimePrice = productPrices.find((p: any) => !p.recurring)
      const subscriptionPrice = productPrices.find((p: any) => p.recurring?.interval === "month")

      // Use metadata to get the local product ID
      const localId = product.metadata?.local_id || product.id

      if (oneTimePrice) {
        priceMapping.oneTime[localId] = oneTimePrice.id
      }

      if (subscriptionPrice) {
        priceMapping.subscription[localId] = subscriptionPrice.id
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
      products: products.length,
      prices: prices.length,
      priceMapping,
      priceMappingCode,
      products: products.map((p: any) => ({
        id: p.id,
        name: p.name,
        localId: p.metadata?.local_id || p.id,
        oneTimePrice: priceMapping.oneTime[p.metadata?.local_id || p.id],
        subscriptionPrice: priceMapping.subscription[p.metadata?.local_id || p.id],
      })),
    })
  } catch (error) {
    console.error("Error fetching Stripe products:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
