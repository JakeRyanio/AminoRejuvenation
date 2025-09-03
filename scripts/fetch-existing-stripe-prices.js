// Script to fetch all existing Stripe products and prices to build complete mapping
import { products } from "/Users/jakeryan/Documents/precision-peptides/simplicity-complex-ecommerce/lib/products-data.ts"

async function fetchExistingStripePrices() {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

  if (!STRIPE_SECRET_KEY) {
    console.error("❌ STRIPE_SECRET_KEY not found in environment variables")
    console.log("Make sure you have STRIPE_SECRET_KEY in your .env.local file")
    return
  }

  console.log("🔍 Fetching existing Stripe products and prices...")
  console.log(`📦 Looking for ${products.length} local products`)

  const priceMapping = {
    oneTime: {},
    subscription: {},
  }

  const results = {
    found: 0,
    missing: 0,
    errors: 0,
    details: [],
  }

  try {
    // Fetch all products from Stripe
    console.log("\n📥 Fetching all Stripe products...")
    let allProducts = []
    let hasMore = true
    let startingAfter = null

    while (hasMore) {
      const url = new URL("https://api.stripe.com/v1/products")
      url.searchParams.set("limit", "100")
      if (startingAfter) {
        url.searchParams.set("starting_after", startingAfter)
      }

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${data.error?.message}`)
      }

      allProducts = allProducts.concat(data.data)
      hasMore = data.has_more
      if (hasMore && data.data.length > 0) {
        startingAfter = data.data[data.data.length - 1].id
      }
    }

    console.log(`✅ Found ${allProducts.length} products in Stripe`)

    // Fetch all prices from Stripe
    console.log("\n💰 Fetching all Stripe prices...")
    let allPrices = []
    hasMore = true
    startingAfter = null

    while (hasMore) {
      const url = new URL("https://api.stripe.com/v1/prices")
      url.searchParams.set("limit", "100")
      if (startingAfter) {
        url.searchParams.set("starting_after", startingAfter)
      }

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Failed to fetch prices: ${data.error?.message}`)
      }

      allPrices = allPrices.concat(data.data)
      hasMore = data.has_more
      if (hasMore && data.data.length > 0) {
        startingAfter = data.data[data.data.length - 1].id
      }
    }

    console.log(`✅ Found ${allPrices.length} prices in Stripe`)

    // Create a map of product ID to product for quick lookup
    const stripeProductMap = {}
    allProducts.forEach((product) => {
      stripeProductMap[product.id] = product
    })

    // Process each local product
    console.log("\n🔄 Matching local products with Stripe prices...")

    for (const localProduct of products) {
      try {
        console.log(`\n🔍 Processing: ${localProduct.name} (${localProduct.id})`)

        // Find the Stripe product that matches this local product
        const matchingStripeProduct = allProducts.find(
          (stripeProduct) =>
            stripeProduct.id === localProduct.id ||
            stripeProduct.metadata?.local_id === localProduct.id ||
            stripeProduct.name === localProduct.name,
        )

        if (!matchingStripeProduct) {
          console.log(`❌ No matching Stripe product found for: ${localProduct.name}`)
          results.missing++
          results.details.push({
            product: localProduct.name,
            status: "missing",
            localId: localProduct.id,
          })
          continue
        }

        console.log(`✅ Found Stripe product: ${matchingStripeProduct.id}`)

        // Find prices for this product
        const productPrices = allPrices.filter((price) => price.product === matchingStripeProduct.id)

        if (productPrices.length === 0) {
          console.log(`⚠️  No prices found for product: ${localProduct.name}`)
          results.missing++
          results.details.push({
            product: localProduct.name,
            status: "no_prices",
            stripeProductId: matchingStripeProduct.id,
          })
          continue
        }

        console.log(`💰 Found ${productPrices.length} price(s) for ${localProduct.name}`)

        // Categorize prices
        let oneTimePrice = null
        let subscriptionPrice = null

        for (const price of productPrices) {
          const isSubscription = price.recurring !== null
          const purchaseType = price.metadata?.purchase_type

          console.log(
            `   - Price ${price.id}: $${(price.unit_amount / 100).toFixed(2)} ${isSubscription ? "(subscription)" : "(one-time)"} ${purchaseType ? `[${purchaseType}]` : ""}`,
          )

          if (isSubscription || purchaseType === "subscription") {
            if (!subscriptionPrice) {
              subscriptionPrice = price
            }
          } else if (!isSubscription || purchaseType === "one-time") {
            if (!oneTimePrice) {
              oneTimePrice = price
            }
          }
        }

        // If we couldn't categorize by metadata or recurring, try by price amount
        if (!oneTimePrice && !subscriptionPrice && productPrices.length >= 2) {
          // Sort by price amount and assume higher price is one-time, lower is subscription
          const sortedPrices = productPrices.sort((a, b) => b.unit_amount - a.unit_amount)
          oneTimePrice = sortedPrices[0]
          subscriptionPrice = sortedPrices[1]
          console.log(
            `   📊 Categorized by price: one-time=$${(oneTimePrice.unit_amount / 100).toFixed(2)}, subscription=$${(subscriptionPrice.unit_amount / 100).toFixed(2)}`,
          )
        } else if (productPrices.length === 1) {
          // Only one price found, assume it's one-time
          oneTimePrice = productPrices[0]
          console.log(`   📊 Single price found, assuming one-time: $${(oneTimePrice.unit_amount / 100).toFixed(2)}`)
        }

        // Add to mapping
        if (oneTimePrice) {
          priceMapping.oneTime[localProduct.id] = oneTimePrice.id
          console.log(`   ✅ One-time price: ${oneTimePrice.id}`)
        }

        if (subscriptionPrice) {
          priceMapping.subscription[localProduct.id] = subscriptionPrice.id
          console.log(`   ✅ Subscription price: ${subscriptionPrice.id}`)
        }

        results.found++
        results.details.push({
          product: localProduct.name,
          status: "found",
          oneTimePrice: oneTimePrice?.id,
          subscriptionPrice: subscriptionPrice?.id,
          stripeProductId: matchingStripeProduct.id,
        })
      } catch (error) {
        console.error(`❌ Error processing ${localProduct.name}:`, error.message)
        results.errors++
        results.details.push({
          product: localProduct.name,
          status: "error",
          error: error.message,
        })
      }
    }
  } catch (error) {
    console.error("❌ Error fetching Stripe data:", error.message)
    return
  }

  // Display results
  console.log("\n" + "=".repeat(60))
  console.log("📊 FETCH RESULTS:")
  console.log(`✅ Found: ${results.found} products`)
  console.log(`❌ Missing: ${results.missing} products`)
  console.log(`⚠️  Errors: ${results.errors} products`)
  console.log("=".repeat(60))

  // Display missing products
  if (results.missing > 0) {
    console.log("\n❌ MISSING PRODUCTS:")
    results.details
      .filter((detail) => detail.status === "missing" || detail.status === "no_prices")
      .forEach((detail) => {
        console.log(`   - ${detail.product} (${detail.localId})`)
      })
  }

  // Generate the complete price mapping
  console.log("\n🔧 COMPLETE STRIPE_PRICE_MAP for lib/stripe-products.ts:")
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

  console.log(`\n📈 MAPPING STATS:`)
  console.log(`   One-time prices: ${Object.keys(priceMapping.oneTime).length}`)
  console.log(`   Subscription prices: ${Object.keys(priceMapping.subscription).length}`)
  console.log(
    `   Total mappings: ${Object.keys(priceMapping.oneTime).length + Object.keys(priceMapping.subscription).length}`,
  )

  if (results.missing > 0) {
    console.log("\n🔧 NEXT STEPS FOR MISSING PRODUCTS:")
    console.log("1. Run the sync script to create missing products")
    console.log("2. Or manually create them in Stripe Dashboard")
    console.log("3. Then run this script again to get complete mapping")
  }

  return {
    priceMapping,
    results,
    success: results.errors === 0,
  }
}

// Run the fetch
fetchExistingStripePrices().catch(console.error)
