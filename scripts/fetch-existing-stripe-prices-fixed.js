// Fixed version with better environment loading
const fs = require("fs")
const path = require("path")

// Enhanced environment file loading
function loadEnvFile() {
  const envPaths = [
    path.join(__dirname, "..", ".env.local"), // Parent directory
    path.join(__dirname, "..", ".env"), // Parent directory .env
    path.join(process.cwd(), ".env.local"), // Working directory
    path.join(process.cwd(), ".env"), // Working directory .env
    path.join(__dirname, ".env.local"), // Current directory
    path.join(__dirname, ".env"), // Current directory .env
  ]

  console.log("🔧 Loading environment variables...")
  console.log("Script directory:", __dirname)
  console.log("Working directory:", process.cwd())

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      console.log(`📁 Found environment file: ${envPath}`)
      try {
        const envContent = fs.readFileSync(envPath, "utf8")
        let loadedCount = 0

        envContent.split("\n").forEach((line) => {
          const trimmedLine = line.trim()
          if (trimmedLine && !trimmedLine.startsWith("#")) {
            const equalIndex = trimmedLine.indexOf("=")
            if (equalIndex > 0) {
              const key = trimmedLine.substring(0, equalIndex).trim()
              const value = trimmedLine
                .substring(equalIndex + 1)
                .trim()
                .replace(/^["']|["']$/g, "")

              if (key && value) {
                process.env[key] = value
                loadedCount++

                if (key.includes("STRIPE")) {
                  console.log(`   ✅ Loaded ${key}: ${value.substring(0, 10)}...`)
                }
              }
            }
          }
        })

        console.log(`   📊 Loaded ${loadedCount} environment variables total`)
        return true
      } catch (error) {
        console.log(`   ❌ Error loading file: ${error.message}`)
      }
    } else {
      console.log(`   ❌ Not found: ${envPath}`)
    }
  }

  return false
}

// Load environment variables first
if (!loadEnvFile()) {
  console.error("❌ Could not load any environment file")
  console.log("\n🔍 Please check that you have a .env.local file with STRIPE_SECRET_KEY")
  console.log("Expected location: project root directory")
  process.exit(1)
}

// Products list
const products = [
  // Weight Loss Category
  { id: "tirzepatide-15mg", name: "Tirzepatide (15mg/vial)", category: "Weight Loss" },
  { id: "tirzepatide-30mg", name: "Tirzepatide (30mg/vial)", category: "Weight Loss" },
  { id: "tirzepatide-60mg", name: "Tirzepatide (60mg/vial)", category: "Weight Loss" },
  { id: "retatrutide-10mg", name: "Retatrutide (10mg/vial)", category: "Weight Loss" },
  { id: "retatrutide-20mg", name: "Retatrutide (20mg/vial)", category: "Weight Loss" },
  { id: "retatrutide-30mg", name: "Retatrutide (30mg/vial)", category: "Weight Loss" },
  { id: "retatrutide-50mg", name: "Retatrutide (50mg/vial)", category: "Weight Loss" },
  { id: "semaglutide-5mg", name: "Semaglutide (5mg/vial)", category: "Weight Loss" },
  { id: "semaglutide-10mg", name: "Semaglutide (10mg/vial)", category: "Weight Loss" },
  { id: "semaglutide-15mg", name: "Semaglutide (15mg/vial)", category: "Weight Loss" },
  { id: "tesamorelin-10mg", name: "Tesamorelin (10mg/vial)", category: "Weight Loss" },
  { id: "lipo-c-10ml-10mg", name: "Lipo-C (10ml*10mg/ml/vial)", category: "Weight Loss" },
  { id: "lipo-c-20ml-10mg", name: "Lipo-C (20ml*10mg/ml/vial)", category: "Weight Loss" },

  // Skin & Beauty Category
  { id: "ghk-cu-50mg", name: "GHK-Cu (50mg/vial)", category: "Skin & Beauty" },
  { id: "mt-1", name: "MT-I (10mg/vial)", category: "Skin & Beauty" },
  { id: "mt-2", name: "MT-II (10mg/vial)", category: "Skin & Beauty" },
  { id: "glow-50", name: "Glow 50 (GHK-Cu 35mg, TB500 10mg, BPC157 5mg)", category: "Skin & Beauty" },
  { id: "glow-70", name: "Glow 70 (GHK-Cu 50mg, TB500 10mg, BPC157 10mg)", category: "Skin & Beauty" },

  // Recovery / Immunity Category
  { id: "bpc-157-5mg", name: "BPC-157 (5mg/vial)", category: "Recovery / Immunity" },
  { id: "bpc-157-10mg", name: "BPC-157 (10mg/vial)", category: "Recovery / Immunity" },
  { id: "tb-500-5mg", name: "TB-500 (TB4 5mg/vial)", category: "Recovery / Immunity" },
  { id: "tb-500-10mg", name: "TB-500 (TB4 10mg/vial)", category: "Recovery / Immunity" },
  { id: "thymosin-alpha-1-5mg", name: "Thymosin Alpha 1 (5mg/vial)", category: "Recovery / Immunity" },
  { id: "thymosin-alpha-1-10mg-recovery", name: "Thymosin Alpha 1 (10mg/vial)", category: "Recovery / Immunity" },
  { id: "tb500-bpc157-combo", name: "TB500+BPC157 (TB500 10mg + BPC157 10mg)", category: "Recovery / Immunity" },

  // Muscle Growth Category
  { id: "cjc-1295-dac-2mg", name: "CJC-1295 (DAC) (2mg/vial)", category: "Muscle Growth" },
  { id: "cjc-1295-dac-5mg", name: "CJC-1295 (DAC) (5mg/vial)", category: "Muscle Growth" },
  { id: "cjc-1295-no-dac-2mg", name: "CJC-1295 w/o DAC (2mg/vial)", category: "Muscle Growth" },
  { id: "cjc-1295-no-dac-5mg", name: "CJC-1295 w/o DAC (5mg/vial)", category: "Muscle Growth" },
  { id: "ipamorelin-5mg", name: "Ipamorelin (5mg/vial)", category: "Muscle Growth" },
  { id: "sermorelin-10mg-muscle", name: "Sermorelin (10mg/vial)", category: "Muscle Growth" },
  { id: "hcg-5000iu", name: "HCG (5000iu/vial)", category: "Muscle Growth" },
  { id: "ghrp-2-5mg", name: "GHRP-2 (5mg/vial)", category: "Muscle Growth" },
  { id: "ghrp-6-5mg", name: "GHRP-6 (5mg/vial)", category: "Muscle Growth" },

  // Longevity Category
  { id: "epithalon-10mg", name: "Epithalon (10mg/vial)", category: "Longevity" },
  { id: "mots-c-10mg-longevity", name: "MOTS-C (10mg/vial)", category: "Longevity" },
  { id: "pt-141-10mg", name: "PT-141 (10mg/vial)", category: "Longevity" },
  { id: "nad-100mg", name: "NAD+ (500mg/vial)", category: "Longevity" },

  // Sleep Category
  { id: "dsip-5mg", name: "DSIP (5mg/vial)", category: "Sleep" },
]

async function fetchExistingStripePrices() {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

  if (!STRIPE_SECRET_KEY) {
    console.error("❌ STRIPE_SECRET_KEY not found in environment variables")
    console.log(
      "Available environment variables:",
      Object.keys(process.env).filter((k) => k.includes("STRIPE")),
    )
    return
  }

  console.log("✅ STRIPE_SECRET_KEY found!")
  console.log(`🔑 Key starts with: ${STRIPE_SECRET_KEY.substring(0, 15)}...`)
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
            `   - Price ${price.id}: $${(price.unit_amount / 100).toFixed(2)} ${
              isSubscription ? "(subscription)" : "(one-time)"
            } ${purchaseType ? `[${purchaseType}]` : ""}`,
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
            `   📊 Categorized by price: one-time=$${(oneTimePrice.unit_amount / 100).toFixed(
              2,
            )}, subscription=$${(subscriptionPrice.unit_amount / 100).toFixed(2)}`,
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

