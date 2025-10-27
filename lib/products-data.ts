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
  benefits: string[]
  useCases: string[]
  reviews: {
    rating: number
    count: number
    featured: string
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
  // AOD9604 (sorted by dosage: 2mg, 5mg)
  {
    id: "aod9604-2mg",
    name: "AOD9604 (2mg)",
    abbreviation: "AOD",
    dosage: "2mg",
    price: 50.00,
    category: "Weight Loss",
    overview: "Fragment of growth hormone for targeted fat burning.",
    description: "Fragment of growth hormone for targeted fat burning.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Research on fat metabolism",
      "Body composition studies",
      "Metabolic pathway analysis",
      "Growth hormone fragment research"
    ],
    reviews: { 
      rating: 4.5, 
      count: 78,
      featured: "Excellent results for targeted fat reduction research"
    },
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
    description: "Fragment of growth hormone for targeted fat burning.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 45,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  
  // BPC-157 (sorted by dosage: 5mg, 10mg)
  {
    id: "bpc-157-5mg",
    name: "BPC-157 (5mg)",
    abbreviation: "BPC",
    dosage: "5mg",
    price: 75.00,
    category: "Recovery/Immunity",
    overview: "Body Protection Compound for enhanced recovery and healing.",
    description: "Body Protection Compound-157 is a synthetic peptide derived from a protective protein in gastric juice. It's known for healing injuries in muscles, tendons, and the digestive tract. Research shows it accelerates muscle, tendon, and ligament healing, promotes gut repair (ulcers, IBS), reduces inflammation, and supports neuroprotection.",
    image: "/images/image-5.png",
    benefits: [
      "Accelerates muscle and tendon healing",
      "Promotes gut repair and healing",
      "Reduces inflammation systemically",
      "Supports neuroprotection"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.7, 
      count: 156,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "bpc-157-10mg",
    name: "BPC-157 (10mg)",
    abbreviation: "BPC",
    dosage: "10mg",
    price: 125.00,
    category: "Recovery/Immunity",
    overview: "Higher potency BPC-157 for enhanced recovery support.",
    description: "Body Protection Compound-157 is a synthetic peptide derived from a protective protein in gastric juice. It's known for healing injuries in muscles, tendons, and the digestive tract. Research shows it accelerates muscle, tendon, and ligament healing, promotes gut repair (ulcers, IBS), reduces inflammation, and supports neuroprotection.",
    image: "/images/image-5.png",
    benefits: [
      "Accelerates muscle and tendon healing",
      "Promotes gut repair and healing",
      "Reduces inflammation systemically",
      "Supports neuroprotection"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.8, 
      count: 98,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Cagrilintide (sorted by dosage: 5mg, 10mg)
  {
    id: "cagrilintide-5mg",
    name: "Cagrilintide (5mg)",
    abbreviation: "Cag",
    dosage: "5mg",
    price: 110.00,
    category: "Weight Loss",
    overview: "Novel amylin analog for advanced weight management.",
    description: "Cagrilintide is a novel amylin analog that works synergistically with GLP-1 agonists to provide enhanced weight management results through multiple pathways.",
    image: "/images/image-5.png",
    benefits: [
      "Enhanced weight management results",
      "Synergistic with GLP-1 agonists",
      "Multiple metabolic pathway targeting",
      "Improved appetite regulation"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 34,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "cagrilintide-10mg",
    name: "Cagrilintide (10mg)",
    abbreviation: "Cag",
    dosage: "10mg",
    price: 180.00,
    category: "Weight Loss",
    overview: "Higher potency Cagrilintide for maximum weight management results.",
    description: "Cagrilintide is a novel amylin analog that works synergistically with GLP-1 agonists to provide enhanced weight management results through multiple pathways.",
    image: "/images/image-5.png",
    benefits: [
      "Enhanced weight management results",
      "Synergistic with GLP-1 agonists",
      "Multiple metabolic pathway targeting",
      "Improved appetite regulation"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.7, 
      count: 28,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // CJC-1295 DAC (sorted by dosage: 2mg)
  {
    id: "cjc-1295-dac-2mg",
    name: "CJC-1295 DAC (2mg)",
    abbreviation: "CJC",
    dosage: "2mg",
    price: 95.00,
    category: "Muscle",
    overview: "Long-acting growth hormone releasing hormone for sustained results.",
    description: "CJC-1295 is a growth hormone-releasing hormone analog that increases GH and IGF-1 levels. Available with or without DAC (Drug Affinity Complex), it enhances muscle growth and fat loss, improves sleep and recovery, and supports tissue repair and anti-aging processes.",
    image: "/images/image-5.png",
    benefits: [
      "Increases growth hormone levels",
      "Enhances muscle growth and fat loss",
      "Improves sleep and recovery",
      "Supports tissue repair and anti-aging"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 112,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // CJC-1295 w/o DAC (sorted by dosage: 2mg)
  {
    id: "cjc-1295-wo-dac-2mg",
    name: "CJC-1295 w/o DAC (2mg)",
    abbreviation: "CJC",
    dosage: "2mg",
    price: 85.00,
    category: "Muscle",
    overview: "Short-acting growth hormone releasing hormone for immediate results.",
    description: "CJC-1295 is a growth hormone-releasing hormone analog that increases GH and IGF-1 levels. Available with or without DAC (Drug Affinity Complex), it enhances muscle growth and fat loss, improves sleep and recovery, and supports tissue repair and anti-aging processes.",
    image: "/images/image-5.png",
    benefits: [
      "Increases growth hormone levels",
      "Enhances muscle growth and fat loss",
      "Improves sleep and recovery",
      "Supports tissue repair and anti-aging"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.5, 
      count: 89,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // DSIP (sorted by dosage: 5mg)
  {
    id: "dsip-5mg",
    name: "DSIP (5mg)",
    abbreviation: "DSIP",
    dosage: "5mg",
    price: 65.00,
    category: "Sleep",
    overview: "Delta sleep-inducing peptide for enhanced sleep quality.",
    description: "Delta Sleep-Inducing Peptide (DSIP) is a neuropeptide that promotes deep sleep and relaxation. It may also aid in hormone regulation and has shown promise for treating sleep disorders. Research indicates potential benefits for improving sleep quality and duration, reducing stress and anxiety, supporting hormone regulation, and may improve recovery and mood.",
    image: "/images/image-5.png",
    benefits: [
      "Promotes deep sleep and relaxation",
      "Aids in hormone regulation",
      "Reduces stress and anxiety",
      "Improves sleep quality and duration"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.4, 
      count: 67,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // GHK-CU (sorted by dosage: 50mg, 100mg)
  {
    id: "ghk-cu-50mg",
    name: "GHK-CU (50mg)",
    abbreviation: "GHK",
    dosage: "50mg",
    price: 80.00,
    category: "Skin & Beauty",
    overview: "Copper peptide for skin rejuvenation and anti-aging.",
    description: "GHK-CU is a copper peptide that has shown remarkable results in skin rejuvenation, wound healing, and anti-aging effects through collagen synthesis stimulation.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 134,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "ghk-cu-100mg",
    name: "GHK-CU (100mg)",
    abbreviation: "GHK",
    dosage: "100mg",
    price: 140.00,
    category: "Skin & Beauty",
    overview: "Higher potency GHK-CU for enhanced skin rejuvenation.",
    description: "This (100mg) formulation provides increased potency for individuals requiring stronger skin rejuvenation and anti-aging support.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.7, 
      count: 89,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // GLOW (sorted by dosage: 35mg, 10mg, 5mg)
  {
    id: "glow-stack",
    name: "GLOW (GHK-Cu 35mg, TB500 10mg, BPC157 5mg)",
    abbreviation: "GLOW",
    dosage: "35mg/10mg/5mg",
    price: 250.00,
    category: "Skin & Beauty",
    overview: "Premium skin rejuvenation stack combining multiple peptides.",
    description: "Glycyl-L-histidyl-L-lysine-copper is a copper peptide complex with strong regenerative, anti-inflammatory, and anti-aging properties. It's commonly used in dermatological research and wound healing protocols. Benefits include accelerated wound healing, reduced inflammation, stimulated collagen and hair growth, and improved skin texture and firmness.",
    image: "/images/image-5.png",
    benefits: [
      "Accelerated wound healing",
      "Reduced inflammation",
      "Stimulated collagen and hair growth",
      "Improved skin texture and firmness"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.8, 
      count: 45,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // HCG (sorted by dosage: 5000IU)
  {
    id: "hcg-5000iu",
    name: "HCG (5000IU)",
    abbreviation: "HCG",
    dosage: "5000IU",
    price: 90.00,
    category: "Muscle",
    overview: "Human chorionic gonadotropin for hormonal support.",
    description: "Human Chorionic Gonadotropin acts similarly to luteinizing hormone, prompting testosterone production. Often used in hormone replacement therapy research or fertility preservation. Benefits include maintained or restored testosterone levels, prevented testicular atrophy, supported fertility, and enhanced libido and mood.",
    image: "/images/image-5.png",
    benefits: [
      "Maintains or restores testosterone levels",
      "Prevents testicular atrophy",
      "Supports fertility preservation",
      "Enhances libido and mood"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.5, 
      count: 78,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Ipamorelin (sorted by dosage: 5mg)
  {
    id: "ipamorelin-5mg",
    name: "Ipamorelin (5mg)",
    abbreviation: "Ipa",
    dosage: "5mg",
    price: 70.00,
    category: "Muscle",
    overview: "Selective growth hormone releasing peptide for muscle growth.",
    description: "Ipamorelin is a selective growth hormone secretagogue known for stimulating GH release without significantly increasing cortisol or prolactin. It's highly regarded for its safety profile and promotes lean muscle growth, enhances recovery and repair, improves sleep quality, and supports fat metabolism.",
    image: "/images/image-5.png",
    benefits: [
      "Selective growth hormone stimulation",
      "No significant cortisol increase",
      "Promotes lean muscle growth",
      "Enhances recovery and repair"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 123,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // KPV (sorted by dosage: 10mg)
  {
    id: "kpv-10mg",
    name: "KPV (10mg)",
    abbreviation: "KPV",
    dosage: "10mg",
    price: 55.00,
    category: "Recovery/Immunity",
    overview: "Anti-inflammatory peptide for enhanced recovery.",
    description: "KPV is a tripeptide with potent anti-inflammatory properties that supports recovery and immune function through inflammatory pathway modulation.",
    image: "/images/image-5.png",
    benefits: [
      "Potent anti-inflammatory properties",
      "Supports recovery and immune function",
      "Modulates inflammatory pathways",
      "Research-grade peptide quality"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.4, 
      count: 56,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Lipo-C (sorted by dosage: 10ml)
  {
    id: "lipo-c-10ml",
    name: "Lipo-C (10ml)",
    abbreviation: "Lipo",
    dosage: "10ml",
    price: 120.00,
    category: "Weight Loss",
    overview: "Lipotropic compound for enhanced fat metabolism.",
    description: "Lipo-C is a lipotropic compound that supports fat metabolism and liver function, making it an excellent addition to weight management protocols.",
    image: "/images/image-5.png",
    benefits: [
      "Supports fat metabolism",
      "Enhances liver function",
      "Weight management protocols",
      "Metabolic optimization"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.5, 
      count: 67,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Mots-C (sorted by dosage: 10mg)
  {
    id: "mots-c-10mg",
    name: "Mots-C (10mg)",
    abbreviation: "Mots",
    dosage: "10mg",
    price: 95.00,
    category: "Longevity",
    overview: "Mitochondrial-derived peptide for cellular energy and longevity.",
    description: "Mots-C is a mitochondrial-derived peptide that enhances cellular energy production and may support longevity through mitochondrial function optimization.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 89,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Nad+ (sorted by dosage: 500)
  {
    id: "nad-plus-500",
    name: "Nad+ (500)",
    abbreviation: "NAD+",
    dosage: "500",
    price: 145.00,
    category: "Longevity",
    overview: "Nicotinamide Adenine Dinucleotide for cellular energy and anti-aging.",
    description: "Nicotinamide adenine dinucleotide is a crucial coenzyme involved in cellular energy metabolism and DNA repair processes. Extensively researched for aging, metabolic health, and cellular regeneration. Benefits include supported cellular energy production, enhanced DNA repair mechanisms, promoted healthy aging processes, and improved metabolic function.",
    image: "/images/image-5.png",
    benefits: [
      "Supported cellular energy production",
      "Enhanced DNA repair mechanisms",
      "Promoted healthy aging processes",
      "Improved metabolic function"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.9, 
      count: 98,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // PT-141 (sorted by dosage: 10mg)
  {
    id: "pt-141-10mg",
    name: "PT-141 (10mg)",
    abbreviation: "PT",
    dosage: "10mg",
    price: 85.00,
    category: "Muscle",
    overview: "Melanocortin receptor agonist for enhanced performance.",
    description: "PT-141 is a melanocortin receptor agonist used in sexual dysfunction research. Unlike PDE5 inhibitors, it acts on the nervous system to increase sexual desire and arousal. Benefits include improved libido in men and women, effectiveness for erectile dysfunction, enhanced sexual arousal, and CNS-based action.",
    image: "/images/image-5.png",
    benefits: [
      "Improved libido in men and women",
      "Effectiveness for erectile dysfunction",
      "Enhanced sexual arousal",
      "CNS-based action mechanism"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.5, 
      count: 45,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Retatrutide (sorted by dosage: 10mg, 20mg)
  {
    id: "retatrutide-10mg",
    name: "Retatrutide (10mg)",
    abbreviation: "Reta",
    dosage: "10mg",
    price: 145.00,
    category: "Weight Loss",
    overview: "Next-generation triple agonist for advanced weight management.",
    description: "Retatrutide is a novel triple agonist targeting GIP, GLP-1, and glucagon receptors under investigation for obesity, diabetes, and metabolic conditions. Benefits include accelerated weight loss, improved metabolic markers, potential for NAFLD treatment, and enhanced insulin sensitivity.",
    image: "/images/image-5.png",
    benefits: [
      "Accelerated weight loss",
      "Improved metabolic markers",
      "Potential NAFLD treatment",
      "Enhanced insulin sensitivity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.9, 
      count: 67,
      featured: "High-quality research peptide with excellent results"
    },
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
    description: "Retatrutide is a novel triple agonist targeting GIP, GLP-1, and glucagon receptors under investigation for obesity, diabetes, and metabolic conditions. Benefits include accelerated weight loss, improved metabolic markers, potential for NAFLD treatment, and enhanced insulin sensitivity.",
    image: "/images/image-5.png",
    benefits: [
      "Accelerated weight loss",
      "Improved metabolic markers",
      "Potential NAFLD treatment",
      "Enhanced insulin sensitivity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.8, 
      count: 42,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Selank (sorted by dosage: 10mg)
  {
    id: "selank-10mg",
    name: "Selank (10mg)",
    abbreviation: "Sel",
    dosage: "10mg",
    price: 75.00,
    category: "Recovery/Immunity",
    overview: "Anxiolytic peptide for stress management and immune support.",
    description: "Selank is a synthetic peptide with anxiolytic properties that supports stress management and immune function through neuropeptide modulation.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.5, 
      count: 78,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Semax (sorted by dosage: 5mg)
  {
    id: "semax-5mg",
    name: "Semax (5mg)",
    abbreviation: "Sem",
    dosage: "5mg",
    price: 65.00,
    category: "Recovery/Immunity",
    overview: "Nootropic peptide for cognitive enhancement and neuroprotection.",
    description: "Semax is a synthetic peptide that has shown benefits in cognitive function, neuroprotection, and stress resilience through neuropeptide modulation.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 89,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Semaglutide (sorted by dosage: 10mg, 15mg)
  {
    id: "semaglutide-10mg",
    name: "Semaglutide (10mg)",
    abbreviation: "Sema",
    dosage: "10mg",
    price: 150.00,
    category: "Weight Loss",
    overview: "Proven GLP-1 agonist for effective weight management.",
    description: "Semaglutide is a GLP-1 receptor agonist used for diabetes and chronic weight management research. It enhances insulin secretion and suppresses appetite. Research shows appetite suppression, substantial weight reduction, improved HbA1c levels, and cardiovascular risk reduction.",
    image: "/images/image-5.png",
    benefits: [
      "Appetite suppression",
      "Substantial weight reduction",
      "Improved HbA1c levels",
      "Cardiovascular risk reduction"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.7, 
      count: 203,
      featured: "High-quality research peptide with excellent results"
    },
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
    description: "Semaglutide is a GLP-1 receptor agonist used for diabetes and chronic weight management research. It enhances insulin secretion and suppresses appetite. Research shows appetite suppression, substantial weight reduction, improved HbA1c levels, and cardiovascular risk reduction.",
    image: "/images/image-5.png",
    benefits: [
      "Appetite suppression",
      "Substantial weight reduction",
      "Improved HbA1c levels",
      "Cardiovascular risk reduction"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.8, 
      count: 134,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Sermorelin (sorted by dosage: 5mg, 10mg)
  {
    id: "sermorelin-5mg",
    name: "Sermorelin (5mg)",
    abbreviation: "Ser",
    dosage: "5mg",
    price: 80.00,
    category: "Muscle",
    overview: "Growth hormone releasing hormone for muscle growth and recovery.",
    description: "Sermorelin is a GHRH analog that stimulates natural growth hormone release. It's used in research to promote recovery, energy, and lean mass. Benefits include increased natural growth hormone production, improved sleep quality, promoted lean muscle growth, and supported fat metabolism and energy.",
    image: "/images/image-5.png",
    benefits: [
      "Increased natural growth hormone production",
      "Improved sleep quality",
      "Promoted lean muscle growth",
      "Supported fat metabolism and energy"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 112,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "sermorelin-10mg",
    name: "Sermorelin (10mg)",
    abbreviation: "Ser",
    dosage: "10mg",
    price: 140.00,
    category: "Muscle",
    overview: "Higher potency Sermorelin for enhanced muscle growth and recovery.",
    description: "Sermorelin is a GHRH analog that stimulates natural growth hormone release. It's used in research to promote recovery, energy, and lean mass. Benefits include increased natural growth hormone production, improved sleep quality, promoted lean muscle growth, and supported fat metabolism and energy.",
    image: "/images/image-5.png",
    benefits: [
      "Increased natural growth hormone production",
      "Improved sleep quality",
      "Promoted lean muscle growth",
      "Supported fat metabolism and energy"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.7, 
      count: 89,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // TB-500 (sorted by dosage: 5mg, 10mg)
  {
    id: "tb-500-5mg",
    name: "TB-500 (5mg)",
    abbreviation: "TB",
    dosage: "5mg",
    price: 90.00,
    category: "Recovery/Immunity",
    overview: "Thymosin beta-4 for enhanced recovery and healing.",
    description: "Thymosin Beta-4 (TB-500) is a synthetic version that enhances tissue repair, reduces inflammation, and promotes cellular migration essential for healing. Benefits include enhanced muscle recovery, promotion of new blood vessel growth, reduced scar tissue formation, and improved flexibility and mobility.",
    image: "/images/image-5.png",
    benefits: [
      "Enhanced muscle recovery",
      "Promotion of new blood vessel growth",
      "Reduced scar tissue formation",
      "Improved flexibility and mobility"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.7, 
      count: 145,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },
  {
    id: "tb-500-10mg",
    name: "TB-500 (10mg)",
    abbreviation: "TB",
    dosage: "10mg",
    price: 160.00,
    category: "Recovery/Immunity",
    overview: "Higher potency TB-500 for enhanced recovery and healing.",
    description: "Thymosin Beta-4 (TB-500) is a synthetic version that enhances tissue repair, reduces inflammation, and promotes cellular migration essential for healing. Benefits include enhanced muscle recovery, promotion of new blood vessel growth, reduced scar tissue formation, and improved flexibility and mobility.",
    image: "/images/image-5.png",
    benefits: [
      "Enhanced muscle recovery",
      "Promotion of new blood vessel growth",
      "Reduced scar tissue formation",
      "Improved flexibility and mobility"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.8, 
      count: 98,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // TB500 + BPC157 (sorted by dosage: 5mg + 5mg)
  {
    id: "tb500-bpc157-stack",
    name: "TB500 (5mg) + BPC157 (5mg)",
    abbreviation: "TB+BPC",
    dosage: "5mg+5mg",
    price: 150.00,
    category: "Recovery/Immunity",
    overview: "Recovery stack combining TB-500 and BPC-157 for comprehensive healing.",
    description: "This stack combines TB-500 and BPC-157 for comprehensive recovery support, targeting both systemic healing and localized tissue repair.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.8, 
      count: 67,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Tesamorelin (sorted by dosage: 10mg)
  {
    id: "tesamorelin-10mg",
    name: "Tesamorelin (10mg)",
    abbreviation: "Tesa",
    dosage: "10mg",
    price: 120.00,
    category: "Weight Loss",
    overview: "Growth hormone releasing hormone for metabolic support.",
    description: "Tesamorelin is a growth hormone-releasing hormone analog that stimulates pituitary GH secretion. FDA-approved for HIV-associated lipodystrophy research. Benefits include reduced visceral fat, improved lipid profile, enhanced IGF-1 levels, and supported cognitive function.",
    image: "/images/image-5.png",
    benefits: [
      "Reduced visceral fat",
      "Improved lipid profile",
      "Enhanced IGF-1 levels",
      "Supported cognitive function"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.6, 
      count: 89,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Thymosin Alpha (sorted by dosage: 10mg)
  {
    id: "thymosin-alpha-10mg",
    name: "Thymosin Alpa (10mg)",
    abbreviation: "TA",
    dosage: "10mg",
    price: 95.00,
    category: "Immunity",
    overview: "Thymosin alpha-1 for immune system support and enhancement.",
    description: "Thymosin alpha-1 is a naturally occurring peptide that supports immune function and may enhance resistance to infections and immune-related conditions.",
    image: "/images/image-5.png",
    benefits: [
      "Targeted fat cell breakdown",
      "Preserves lean muscle mass",
      "Supports body recomposition",
      "Enhanced metabolic activity"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.5, 
      count: 56,
      featured: "High-quality research peptide with excellent results"
    },
    specifications: {
      purity: "99.9%",
      storage: "Refrigerate 2-8°C",
      shelfLife: "24 months"
    }
  },

  // Tirzepatide (sorted by dosage: 10mg, 15mg, 20mg, 30mg, 60mg)
  {
    id: "tirzepatide-10mg",
    name: "Tirzepatide (10mg)",
    abbreviation: "Tirz",
    dosage: "10mg",
    price: 135.00,
    category: "Weight Loss",
    overview: "Advanced GLP-1 agonist for weight management and metabolic support.",
    description: "Tirzepatide is a dual GIP and GLP-1 receptor agonist developed for diabetes and weight management research. It mimics incretin hormones, helping regulate blood sugar and appetite. Benefits include improved glycemic control, significant weight loss promotion, enhanced insulin sensitivity, and reduced cardiovascular risk markers.",
    image: "/images/image-5.png",
    benefits: [
      "Improved glycemic control",
      "Significant weight loss promotion",
      "Enhanced insulin sensitivity",
      "Reduced cardiovascular risk markers"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.8, 
      count: 127,
      featured: "High-quality research peptide with excellent results"
    },
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
    description: "Semaglutide is a GLP-1 receptor agonist used for diabetes and chronic weight management research. It enhances insulin secretion and suppresses appetite. Research shows appetite suppression, substantial weight reduction, improved HbA1c levels, and cardiovascular risk reduction.",
    image: "/images/image-5.png",
    benefits: [
      "Improved glycemic control",
      "Significant weight loss promotion",
      "Enhanced insulin sensitivity",
      "Reduced cardiovascular risk markers"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.9, 
      count: 89,
      featured: "High-quality research peptide with excellent results"
    },
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
    description: "Tirzepatide is a dual GIP and GLP-1 receptor agonist developed for diabetes and weight management research. It mimics incretin hormones, helping regulate blood sugar and appetite. Benefits include improved glycemic control, significant weight loss promotion, enhanced insulin sensitivity, and reduced cardiovascular risk markers.",
    image: "/images/image-5.png",
    benefits: [
      "Improved glycemic control",
      "Significant weight loss promotion",
      "Enhanced insulin sensitivity",
      "Reduced cardiovascular risk markers"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.9, 
      count: 156,
      featured: "High-quality research peptide with excellent results"
    },
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
    description: "Tirzepatide is a dual GIP and GLP-1 receptor agonist developed for diabetes and weight management research. It mimics incretin hormones, helping regulate blood sugar and appetite. Benefits include improved glycemic control, significant weight loss promotion, enhanced insulin sensitivity, and reduced cardiovascular risk markers.",
    image: "/images/image-5.png",
    benefits: [
      "Improved glycemic control",
      "Significant weight loss promotion",
      "Enhanced insulin sensitivity",
      "Reduced cardiovascular risk markers"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.8, 
      count: 73,
      featured: "High-quality research peptide with excellent results"
    },
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
    description: "Tirzepatide is a dual GIP and GLP-1 receptor agonist developed for diabetes and weight management research. It mimics incretin hormones, helping regulate blood sugar and appetite. Benefits include improved glycemic control, significant weight loss promotion, enhanced insulin sensitivity, and reduced cardiovascular risk markers.",
    image: "/images/image-5.png",
    benefits: [
      "Improved glycemic control",
      "Significant weight loss promotion",
      "Enhanced insulin sensitivity",
      "Reduced cardiovascular risk markers"
    ],
    useCases: [
      "Scientific research applications",
      "Laboratory studies",
      "Metabolic research",
      "Therapeutic pathway analysis"
    ],
    reviews: { 
      rating: 4.9, 
      count: 45,
      featured: "High-quality research peptide with excellent results"
    },
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
