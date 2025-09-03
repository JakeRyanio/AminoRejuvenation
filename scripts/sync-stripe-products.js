// Enhanced script to sync products with both one-time and subscription pricing
import { products } from "../lib/products-data.js"

async function syncProductsToStripe() {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

  if (!STRIPE_SECRET_KEY) {
    console.error("❌ STRIPE_SECRET_KEY not found in environment variables")
    console.log("Make sure you have STRIPE_SECRET_KEY in your .env.local file")
    return
  }

  console.log("🚀 Starting Stripe product sync with subscription support...")
  console.log(`📦 Found ${products.length} products to sync`)

  const results = {
    created: 0,
    existing: 0,
    errors: 0,
  }

  const priceMapping = {
    oneTime: {},
    subscription: {},
  }

  for (const product of products) {
    try {
      console.log(`\n🔄 Processing: ${product.name}`)

      // Create product in Stripe
      const productResponse = await fetch("https://api.stripe.com/v1/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
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

        // Create one-time purchase price
        const oneTimePriceResponse = await fetch("https://api.stripe.com/v1/prices", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
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
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            product: stripeProduct.id,
            unit_amount: Math.round(product.subscriptionPrice * 100).toString(),
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
        } else {
          console.error(`❌ Failed to create product ${product.name}:`, stripeProduct.error?.message)
          results.errors++
        }
      }

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 300))
    } catch (error) {
      console.error(`❌ Error syncing product ${product.name}:`, error.message)
      results.errors++
    }
  }

  console.log("\n" + "=".repeat(60))
  console.log("📊 SYNC RESULTS:")
  console.log(`✅ Created: ${results.created} products`)
  console.log(`⚠️  Already existed: ${results.existing} products`)
  console.log(`❌ Errors: ${results.errors} products`)
  console.log("=".repeat(60))

  if (results.created > 0) {
    console.log("\n🔧 STRIPE_PRICE_MAP for lib/stripe-products.ts:")
    console.log("export const STRIPE_PRICE_MAP = {")
    console.log("  oneTime: {")
    Object.entries(priceMapping.oneTime).forEach(([productId, priceId]) => {
      console.log(`    "${productId}": "${priceId}",`)
    })
    console.log("  },")
    console.log("  subscription: {")
    Object.entries(priceMapping.subscription).forEach(([productId, priceId]) => {
      console.log(`    "${productId}": "${priceId}",`)
    })
    console.log("  },")
    console.log("}")

    console.log("\n🔧 NEXT STEPS:")
    console.log("1. Copy the STRIPE_PRICE_MAP from above")
    console.log("2. Update lib/stripe-products.ts with the new mapping")
    console.log("3. Test your checkout flow with both purchase options")
  }
}

// Run the sync
syncProductsToStripe().catch(console.error)
