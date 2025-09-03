// Debug script to check environment file loading
const fs = require("fs")
const path = require("path")

console.log("🔍 Environment File Debug")
console.log("=========================")
console.log("Current working directory:", process.cwd())
console.log("Script directory (__dirname):", __dirname)
console.log("Script file (__filename):", __filename)

// Check all possible locations
const envPaths = [
  path.join(__dirname, "..", ".env.local"), // Parent directory
  path.join(__dirname, "..", ".env"), // Parent directory .env
  path.join(__dirname, ".env.local"), // Current directory
  path.join(__dirname, ".env"), // Current directory .env
  path.join(process.cwd(), ".env.local"), // Working directory
  path.join(process.cwd(), ".env"), // Working directory .env
]

console.log("\n📁 Checking environment file locations:")
envPaths.forEach((envPath, index) => {
  const exists = fs.existsSync(envPath)
  console.log(`${index + 1}. ${envPath} - ${exists ? "✅ EXISTS" : "❌ NOT FOUND"}`)

  if (exists) {
    try {
      const content = fs.readFileSync(envPath, "utf8")
      const lines = content.split("\n").filter((line) => line.trim() && !line.startsWith("#"))
      console.log(`   📄 Contains ${lines.length} environment variables`)

      // Check for Stripe key specifically
      const hasStripeKey = lines.some((line) => line.startsWith("STRIPE_SECRET_KEY"))
      console.log(`   �� Contains STRIPE_SECRET_KEY: ${hasStripeKey ? "✅ YES" : "❌ NO"}`)

      if (hasStripeKey) {
        const stripeLine = lines.find((line) => line.startsWith("STRIPE_SECRET_KEY"))
        const keyPreview = stripeLine.split("=")[1]?.substring(0, 10) + "..."
        console.log(`   🔍 Key preview: ${keyPreview}`)
      }
    } catch (error) {
      console.log(`   ❌ Error reading file: ${error.message}`)
    }
  }
})

console.log("\n🌍 Current environment variables with 'STRIPE':")
Object.keys(process.env)
  .filter((key) => key.includes("STRIPE"))
  .forEach((key) => {
    const value = process.env[key]
    const preview = value ? value.substring(0, 10) + "..." : "undefined"
    console.log(`   ${key}: ${preview}`)
  })

// Try to find and load the first available env file
function loadEnvFile() {
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      console.log(`\n🔄 Attempting to load: ${envPath}`)
      try {
        const envContent = fs.readFileSync(envPath, "utf8")
        let loadedCount = 0

        envContent.split("\n").forEach((line) => {
          const trimmedLine = line.trim()
          if (trimmedLine && !trimmedLine.startsWith("#")) {
            const [key, ...valueParts] = trimmedLine.split("=")
            if (key && valueParts.length > 0) {
              const value = valueParts.join("=").replace(/^["']|["']$/g, "")
              process.env[key.trim()] = value.trim()
              loadedCount++

              if (key.trim().includes("STRIPE")) {
                console.log(`   ✅ Loaded ${key.trim()}: ${value.substring(0, 10)}...`)
              }
            }
          }
        })

        console.log(`   📊 Loaded ${loadedCount} environment variables`)
        return true
      } catch (error) {
        console.log(`   ❌ Error loading file: ${error.message}`)
      }
    }
  }
  return false
}

console.log("\n🔧 Attempting to load environment file...")
const loaded = loadEnvFile()

console.log(`\n📋 Final Status:`)
console.log(`   Environment file loaded: ${loaded ? "✅ YES" : "❌ NO"}`)
console.log(`   STRIPE_SECRET_KEY available: ${process.env.STRIPE_SECRET_KEY ? "✅ YES" : "❌ NO"}`)

if (process.env.STRIPE_SECRET_KEY) {
  console.log(`   Key preview: ${process.env.STRIPE_SECRET_KEY.substring(0, 15)}...`)
}

