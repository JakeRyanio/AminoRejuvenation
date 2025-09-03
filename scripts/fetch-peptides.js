// Fetch the peptide list from the provided CSV URL
async function fetchPeptideList() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PEPTIDE%20LIST-h9UQD08spngjMhPwXRT3XDLIZZWmmh.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV Content:")
    console.log(csvText)

    // Parse CSV manually
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    console.log("\nHeaders:", headers)

    const peptides = []
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
        const peptide = {}
        headers.forEach((header, index) => {
          peptide[header] = values[index] || ""
        })
        peptides.push(peptide)
      }
    }

    console.log("\nParsed Peptides:")
    console.log(JSON.stringify(peptides, null, 2))

    return peptides
  } catch (error) {
    console.error("Error fetching peptide list:", error)
    return []
  }
}

// Execute the function
fetchPeptideList()
