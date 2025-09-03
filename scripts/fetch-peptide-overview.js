// Fetch and analyze the peptide overview CSV data
async function fetchPeptideOverview() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Peptide_Overview_-_Part_4_Completed-vIhKi2GdGyAfGggzmMHC8r08ZCuHTU.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV Content (first 1000 chars):")
    console.log(csvText.substring(0, 1000))

    // Parse CSV manually
    const lines = csvText.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    console.log("\nHeaders:", headers)

    const peptides = []
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
            values.push(current.trim())
            current = ""
          } else {
            current += char
          }
        }
        values.push(current.trim()) // Add the last value

        const peptide = {}
        headers.forEach((header, index) => {
          peptide[header] = values[index] || ""
        })
        peptides.push(peptide)
      }
    }

    console.log("\nTotal peptides found:", peptides.length)
    console.log("\nFirst few peptides:")
    peptides.slice(0, 5).forEach((peptide, index) => {
      console.log(`${index + 1}. ${peptide.Peptide}`)
      console.log(`   Overview: ${peptide.Overview?.substring(0, 100)}...`)
      console.log(`   PubMed: ${peptide["PubMed Link"]}`)
      console.log("")
    })

    return peptides
  } catch (error) {
    console.error("Error fetching peptide overview:", error)
    return []
  }
}

// Execute the function
fetchPeptideOverview()
