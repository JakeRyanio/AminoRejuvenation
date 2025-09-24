export interface Product {
  id: string
  name: string
  abbreviation: string
  dosage: string
  price: number
  category: string
  overview: string
  description: string
  image: string
  reviews: {
    rating: number
    count: number
  }
  specifications: {
    purity: string
    storage: string
    shelfLife: string
  }
}

export const categories = [
  "All",
  "Weight Loss",
  "Sleep", 
  "Skin & Beauty",
  "Recovery/Immunity",
  "Muscle",
  "Longevity",
  "Immunity"
]

export const products: Product[] = [
  // Weight Loss Products
  {
    id: "tirzepatide-10mg",
    name: "Tirzepatide (10mg)",
    abbreviation: "Tirz",
    dosage: "10mg",
    price: 135.00,
    category: "Weight Loss",
    overview: "Advanced GLP-1 agonist for weight management and metabolic support.",
    description: "Tirzepatide is a dual GIP and GLP-1 receptor agonist that has shown remarkable results in weight management and blood sugar control.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 127 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tirzepatide-15mg",
    name: "Tirzepatide (15mg)",
    abbreviation: "Tirz",
    dosage: "15mg",
    price: 150.00,
    category: "Weight Loss",
    overview: "Higher potency Tirzepatide for enhanced weight management results.",
    description: "This (15mg) formulation offers increased potency for those who have adapted to lower doses or require stronger metabolic support.",
    image: "/images/image-6.png",
    reviews: { rating: 4.9, count: 89 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tirzepatide-20mg",
    name: "Tirzepatide (20mg)",
    abbreviation: "Tirz",
    dosage: "20mg",
    price: 175.00,
    category: "Weight Loss",
    overview: "Maximum strength Tirzepatide for advanced weight management.",
    description: "This (20mg) formulation provides increased potency for individuals requiring stronger metabolic support and appetite control.",
    image: "/images/image-6.png",
    reviews: { rating: 4.9, count: 156 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tirzepatide-30mg",
    name: "Tirzepatide (30mg)",
    abbreviation: "Tirz",
    dosage: "30mg",
    price: 225.00,
    category: "Weight Loss",
    overview: "Ultra-high potency Tirzepatide for maximum metabolic support.",
    description: "This (30mg) formulation is designed for individuals requiring maximum metabolic support and appetite control for their weight management goals.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 73 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tirzepatide-60mg",
    name: "Tirzepatide (60mg)",
    abbreviation: "Tirz",
    dosage: "60mg",
    price: 450.00,
    category: "Weight Loss",
    overview: "Maximum strength Tirzepatide for advanced weight management needs.",
    description: "Our highest concentration Tirzepatide formulation, providing maximum metabolic support and appetite control for individuals with significant weight management goals.",
    image: "/images/image-6.png",
    reviews: { rating: 4.9, count: 45 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "semaglutide-10mg",
    name: "Semaglutide (10mg)",
    abbreviation: "Sema",
    dosage: "10mg",
    price: 150.00,
    category: "Weight Loss",
    overview: "Proven GLP-1 agonist for effective weight management.",
    description: "Semaglutide is a well-researched GLP-1 receptor agonist that has demonstrated significant results in weight management and blood sugar control.",
    image: "/images/image-6.png",
    reviews: { rating: 4.7, count: 203 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "semaglutide-15mg",
    name: "Semaglutide (15mg)",
    abbreviation: "Sema",
    dosage: "15mg",
    price: 200.00,
    category: "Weight Loss",
    overview: "Higher potency Semaglutide for enhanced weight management.",
    description: "This (15mg) formulation offers increased potency for those who have adapted to lower doses or require stronger metabolic support.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 134 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "retatrutide-10mg",
    name: "Retatrutide (10mg)",
    abbreviation: "Reta",
    dosage: "10mg",
    price: 145.00,
    category: "Weight Loss",
    overview: "Next-generation triple agonist for advanced weight management.",
    description: "Retatrutide is a novel triple agonist targeting GIP, GLP-1, and glucagon receptors, offering superior weight management results compared to traditional GLP-1 agonists.",
    image: "/images/image-6.png",
    reviews: { rating: 4.9, count: 67 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "retatrutide-20mg",
    name: "Retatrutide (20mg)",
    abbreviation: "Reta",
    dosage: "20mg",
    price: 200.00,
    category: "Weight Loss",
    overview: "Higher potency Retatrutide for maximum weight management results.",
    description: "This (20mg) formulation provides increased potency for individuals requiring maximum metabolic support and appetite control for their weight management journey.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 42 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tesamorelin-10mg",
    name: "Tesamorelin (10mg)",
    abbreviation: "Tesa",
    dosage: "10mg",
    price: 120.00,
    category: "Weight Loss",
    overview: "Growth hormone releasing hormone for metabolic support.",
    description: "Tesamorelin is a growth hormone releasing hormone analog that supports fat metabolism and lean muscle mass, making it an excellent choice for body composition improvement.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 89 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "aod9604-2mg",
    name: "AOD9604 (2mg)",
    abbreviation: "AOD",
    dosage: "2mg",
    price: 50.00,
    category: "Weight Loss",
    overview: "Fragment of growth hormone for targeted fat burning.",
    description: "AOD9604 is a fragment of growth hormone that specifically targets fat cells for breakdown while preserving muscle mass, making it ideal for body recomposition.",
    image: "/images/image-6.png",
    reviews: { rating: 4.5, count: 78 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "aod9604-5mg",
    name: "AOD9604 (5mg)",
    abbreviation: "AOD",
    dosage: "5mg",
    price: 100.00,
    category: "Weight Loss",
    overview: "Higher potency AOD9604 for enhanced fat burning results.",
    description: "This (5mg) formulation provides increased potency for individuals requiring stronger fat burning support and body recomposition effects.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 45 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "cagrilintide-5mg",
    name: "Cagrilintide (5mg)",
    abbreviation: "Cagri",
    dosage: "5mg",
    price: 80.00,
    category: "Weight Loss",
    overview: "Novel amylin analog for effective appetite suppression.",
    description: "Cagrilintide is a long-acting amylin analog that provides sustained appetite suppression and satiety, making it an excellent choice for those struggling with hunger control.",
    image: "/images/image-6.png",
    reviews: { rating: 4.7, count: 56 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "cagrilintide-10mg",
    name: "Cagrilintide (10mg)",
    abbreviation: "Cagri",
    dosage: "10mg",
    price: 130.00,
    category: "Weight Loss",
    overview: "Higher potency Cagrilintide for enhanced appetite control.",
    description: "This (10mg) formulation provides increased potency for individuals requiring stronger appetite suppression and satiety control for their weight management goals.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 34 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "lipo-c-10ml",
    name: "Lipo-C (10ml)",
    abbreviation: "Lipo-C",
    dosage: "10ml",
    price: 85.00,
    category: "Weight Loss",
    overview: "Liposomal Vitamin C for enhanced absorption and metabolism support.",
    description: "Lipo-C is a liposomal form of Vitamin C that provides superior absorption and bioavailability, supporting immune function and metabolic processes.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 112 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Sleep Products
  {
    id: "dsip-5mg",
    name: "DSIP (5mg)",
    abbreviation: "DSIP",
    dosage: "5mg",
    price: 50.00,
    category: "Sleep",
    overview: "Delta sleep-inducing peptide for natural sleep support.",
    description: "DSIP (Delta Sleep-Inducing Peptide) is a naturally occurring peptide that promotes deep, restorative sleep by regulating sleep cycles and improving sleep quality.",
    image: "/images/image-6.png",
    reviews: { rating: 4.7, count: 92 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Skin & Beauty Products
  {
    id: "glow-combo-50mg",
    name: "GLOW (GHK-Cu 35mg, TB500 10mg, BPC157 5mg)",
    abbreviation: "GLOW",
    dosage: "(GHK-Cu 35mg, TB500 (10mg), BPC157 (5mg))",
    price: 140.00,
    category: "Skin & Beauty",
    overview: "Premium skin rejuvenation combo (GHK-Cu 35mg, TB500 (10mg), BPC157 (5mg)).",
    description: "Our signature GLOW combo combines three powerful peptides for comprehensive skin rejuvenation: GHK-Cu for collagen synthesis, TB500 for tissue repair, and BPC157 for healing support.",
    image: "/images/image-6.png",
    reviews: { rating: 4.9, count: 156 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "ghk-cu-50mg",
    name: "GHK-CU (50mg)",
    abbreviation: "GHK-CU",
    dosage: "50mg",
    price: 50.00,
    category: "Skin & Beauty",
    overview: "Copper peptide for skin rejuvenation and collagen synthesis.",
    description: "GHK-Cu is a copper peptide that stimulates collagen production, improves skin elasticity, and promotes wound healing, making it essential for anti-aging skincare.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 134 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "ghk-cu-100mg",
    name: "GHK-CU (100mg)",
    abbreviation: "GHK-CU",
    dosage: "100mg",
    price: 95.00,
    category: "Skin & Beauty",
    overview: "Higher potency GHK-Cu for enhanced skin rejuvenation.",
    description: "This (100mg) formulation provides increased potency for individuals requiring stronger skin rejuvenation and collagen synthesis support.",
    image: "/images/image-6.png",
    reviews: { rating: 4.7, count: 89 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Recovery/Immunity Products
  {
    id: "bpc157-5mg",
    name: "BPC-157 (5mg)",
    abbreviation: "BPC",
    dosage: "5mg",
    price: 50.00,
    category: "Recovery/Immunity",
    overview: "Body Protection Compound for tissue repair and healing.",
    description: "BPC-157 is a synthetic peptide that promotes healing of various tissues including muscle, tendon, ligament, and gastrointestinal tract, making it essential for recovery.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 203 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "bpc157-10mg",
    name: "BPC-157 (10mg)",
    abbreviation: "BPC",
    dosage: "10mg",
    price: 85.00,
    category: "Recovery/Immunity",
    overview: "Higher potency BPC-157 for enhanced tissue repair.",
    description: "This (10mg) formulation provides increased potency for individuals requiring stronger tissue repair and healing support.",
    image: "/images/image-6.png",
    reviews: { rating: 4.7, count: 67 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tb500-5mg",
    name: "TB-500 (5mg)",
    abbreviation: "TB",
    dosage: "5mg",
    price: 55.00,
    category: "Recovery/Immunity",
    overview: "Thymosin Beta-4 for tissue repair and regeneration.",
    description: "TB-500 is a synthetic version of Thymosin Beta-4 that promotes tissue repair, reduces inflammation, and accelerates healing of various tissues including muscle and skin.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 145 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tb500-10mg",
    name: "TB-500 (10mg)",
    abbreviation: "TB",
    dosage: "10mg",
    price: 125.00,
    category: "Recovery/Immunity",
    overview: "Higher potency TB-500 for enhanced tissue repair.",
    description: "This (10mg) formulation provides increased potency for individuals requiring stronger tissue repair and regeneration support.",
    image: "/images/image-6.png",
    reviews: { rating: 4.7, count: 78 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tb500-bpc157-combo",
    name: "TB500 (5mg) + BPC157 (5mg)",
    abbreviation: "TB5/BPC157",
    dosage: "10mg",
    price: 100.00,
    category: "Recovery/Immunity",
    overview: "Powerful recovery combo for comprehensive tissue repair.",
    description: "This combination of TB-500 and BPC-157 provides synergistic effects for comprehensive tissue repair, healing, and recovery support.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 112 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "kpv-10mg",
    name: "KPV (10mg)",
    abbreviation: "KPV",
    dosage: "10mg",
    price: 85.00,
    category: "Recovery/Immunity",
    overview: "Anti-inflammatory peptide for pain and inflammation relief.",
    description: "KPV is a tripeptide with potent anti-inflammatory properties that helps reduce pain, inflammation, and supports healing processes throughout the body.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 89 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Muscle Products
  {
    id: "ipamorelin-5mg",
    name: "Ipamorelin (5mg)",
    abbreviation: "Ipa",
    dosage: "5mg",
    price: 45.00,
    category: "Muscle",
    overview: "Selective growth hormone secretagogue for muscle development.",
    description: "Ipamorelin is a selective growth hormone secretagogue that stimulates growth hormone release without affecting cortisol or other hormones, making it ideal for muscle development.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 134 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "sermorelin-5mg",
    name: "Sermorelin (5mg)",
    abbreviation: "SM-5",
    dosage: "5mg",
    price: 60.00,
    category: "Muscle",
    overview: "Growth hormone releasing hormone for muscle development.",
    description: "Sermorelin is a growth hormone releasing hormone that stimulates natural growth hormone production, supporting muscle growth, fat loss, and recovery.",
    image: "/images/image-6.png",
    reviews: { rating: 4.7, count: 167 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "sermorelin-10mg",
    name: "Sermorelin (10mg)",
    abbreviation: "SM-10",
    dosage: "10mg",
    price: 110.00,
    category: "Muscle",
    overview: "Higher potency Sermorelin for enhanced muscle development.",
    description: "This (10mg) formulation provides increased potency for individuals requiring stronger growth hormone stimulation for muscle development and recovery.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 98 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "cjc1295-dac-2mg",
    name: "CJC-1295 DAC (2mg)",
    abbreviation: "CJC Dac",
    dosage: "2mg",
    price: 65.00,
    category: "Muscle",
    overview: "Long-acting growth hormone releasing hormone analog.",
    description: "CJC-1295 DAC is a long-acting growth hormone releasing hormone analog that provides sustained growth hormone stimulation for muscle development and recovery.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 123 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "cjc1295-no-dac-2mg",
    name: "CJC-1295 w/o DAC (2mg)",
    abbreviation: "CJC w/o Dac",
    dosage: "2mg",
    price: 50.00,
    category: "Muscle",
    overview: "Short-acting growth hormone releasing hormone analog.",
    description: "CJC-1295 without DAC provides short-acting growth hormone stimulation, ideal for those who prefer more controlled dosing schedules.",
    image: "/images/image-6.png",
    reviews: { rating: 4.5, count: 89 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "hcg-5000iu",
    name: "HCG (5000IU)",
    abbreviation: "HCG",
    dosage: "5000IU",
    price: 60.00,
    category: "Muscle",
    overview: "Human chorionic gonadotropin for hormone optimization.",
    description: "HCG supports testosterone production and hormone optimization, making it valuable for muscle development and overall hormonal health.",
    image: "/images/image-6.png",
    reviews: { rating: 4.4, count: 76 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Longevity Products
  {
    id: "mots-c-10mg",
    name: "Mots-C (10mg)",
    abbreviation: "Mots-C",
    dosage: "10mg",
    price: 95.00,
    category: "Longevity",
    overview: "Mitochondrial-derived peptide for longevity and metabolism.",
    description: "MOTS-C is a mitochondrial-derived peptide that regulates metabolism, supports healthy aging, and provides neuroprotective benefits for longevity and cognitive health.",
    image: "/images/image-6.png",
    reviews: { rating: 4.8, count: 78 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "semax-5mg",
    name: "Semax (5mg)",
    abbreviation: "Semax",
    dosage: "5mg",
    price: 30.00,
    category: "Longevity",
    overview: "Nootropic peptide for cognitive enhancement and neuroprotection.",
    description: "Semax is a synthetic peptide that enhances cognitive function, provides neuroprotection, and supports brain health for improved mental performance and longevity.",
    image: "/images/image-6.png",
    reviews: { rating: 4.5, count: 156 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "selank-10mg",
    name: "Selank (10mg)",
    abbreviation: "Selank",
    dosage: "10mg",
    price: 50.00,
    category: "Longevity",
    overview: "Anxiolytic peptide for stress management and cognitive support.",
    description: "Selank is a synthetic peptide that provides anxiolytic effects, reduces stress, and supports cognitive function for improved mental health and longevity.",
    image: "/images/image-6.png",
    reviews: { rating: 4.6, count: 98 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "nad-plus-500",
    name: "Nad+ (500)",
    abbreviation: "NAD+",
    dosage: "500",
    price: 145.00,
    category: "Longevity",
    overview: "Nicotinamide adenine dinucleotide for cellular energy and longevity.",
    description: "NAD+ is a coenzyme essential for cellular energy production, DNA repair, and longevity. This high-potency formulation supports healthy aging and cellular function.",
    image: "/images/image-6.png",
    reviews: { rating: 4.7, count: 67 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "pt141-10mg",
    name: "PT-141 (10mg)",
    abbreviation: "PT",
    dosage: "10mg",
    price: 40.00,
    category: "Longevity",
    overview: "Melanocortin agonist for libido and sexual health support.",
    description: "PT-141 is a melanocortin agonist that supports sexual health, libido, and overall vitality, making it valuable for quality of life and longevity.",
    image: "/images/image-6.png",
    reviews: { rating: 4.4, count: 89 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Immunity Products
  {
    id: "thymosin-alpha-10mg",
    name: "Thymosin Alpa (10mg)",
    abbreviation: "TA-10",
    dosage: "10mg",
    price: 85.00,
    category: "Immunity",
    overview: "Immune system support and recovery enhancement.",
    description: "Thymosin Alpha is a peptide that supports immune system function, enhances recovery, and provides antioxidant protection for overall health and wellness.",
    image: "/images/image-6.png",
    reviews: { rating: 4.5, count: 56 },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  }
]

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  if (category === "All") {
    return products
  }
  return products.filter(product => product.category === category)
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  )
}