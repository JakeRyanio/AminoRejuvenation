// Fetch and analyze the peptide pricing CSV data
async function fetchPricingData() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peptide%20price-FDRfqrBOovVhmPaHvWrqExAOkfPeKK.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV Content:")
    console.log(csvText)

    // Parse CSV manually
    const lines = csvText.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    console.log("\nHeaders:", headers)

    const pricingData = []
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        // Handle CSV parsing with potential commas in quoted fields
        const row = lines[i]
        const values = []
        let current = ""
        let inQuotes = false

        for (let j = 0; j < row.length; j++) {
          const char = row[j]
          if (char === '"') {
            inQuotes = !inQuotes
          } else if (char === "," && !inQuotes) {
            values.push(current.trim().replace(/"/g, ""))
            current = ""
          } else {
            current += char
          }
        }
        values.push(current.trim().replace(/"/g, "")) // Add the last value

        const item = {}
        headers.forEach((header, index) => {
          item[header] = values[index] || ""
        })
        pricingData.push(item)
      }
    }

    console.log("\nTotal pricing entries found:", pricingData.length)
    console.log("\nAll pricing data:")
    pricingData.forEach((item, index) => {
      console.log(`${index + 1}.`, JSON.stringify(item, null, 2))
    })

    // Create a mapping for easier product matching
    console.log("\n=== PRICING MAPPING ===")
    pricingData.forEach((item) => {
      const keys = Object.keys(item)
      console.log(`Product: ${item[keys[0]]}, Price: ${item[keys[1]] || item.Price || item.price}`)
    })

    return pricingData
  } catch (error) {
    console.error("Error fetching pricing data:", error)
    return []
  }
}

// Execute the function
fetchPricingData()
