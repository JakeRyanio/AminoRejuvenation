"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Search, ExternalLink, Beaker, BookOpen, Microscope, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products-data"

interface PeptideInfo {
  Peptide: string
  Overview: string
  "PubMed Link": string
}

// Static peptide data based on the CSV structure
const peptideData: PeptideInfo[] = [
  {
    Peptide: "DSIP",
    Overview:
      "Delta Sleep-Inducing Peptide (DSIP) is a neuropeptide that promotes deep sleep and relaxation. It may also aid in hormone regulation and has shown promise for treating sleep disorders. Research indicates potential benefits for improving sleep quality and duration, reducing stress and anxiety, supporting hormone regulation, and may improve recovery and mood.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=DSIP",
  },
  {
    Peptide: "BPC-157",
    Overview:
      "Body Protection Compound-157 is a synthetic peptide derived from a protective protein in gastric juice. It's known for healing injuries in muscles, tendons, and the digestive tract. Research shows it accelerates muscle, tendon, and ligament healing, promotes gut repair (ulcers, IBS), reduces inflammation, and supports neuroprotection.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=bpc-157",
  },
  {
    Peptide: "TB-500",
    Overview:
      "Thymosin Beta-4 (TB-500) is a synthetic version that enhances tissue repair, reduces inflammation, and promotes cellular migration essential for healing. Benefits include enhanced muscle recovery, promotion of new blood vessel growth, reduced scar tissue formation, and improved flexibility and mobility.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=tb-500",
  },
  {
    Peptide: "GHK-Cu",
    Overview:
      "Glycyl-L-histidyl-L-lysine-copper is a copper peptide complex with strong regenerative, anti-inflammatory, and anti-aging properties. It's commonly used in dermatological research and wound healing protocols. Benefits include accelerated wound healing, reduced inflammation, stimulated collagen and hair growth, and improved skin texture and firmness.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=ghk-cu",
  },
  {
    Peptide: "Ipamorelin",
    Overview:
      "Ipamorelin is a selective growth hormone secretagogue known for stimulating GH release without significantly increasing cortisol or prolactin. It's highly regarded for its safety profile and promotes lean muscle growth, enhances recovery and repair, improves sleep quality, and supports fat metabolism.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=ipamorelin",
  },
  {
    Peptide: "CJC-1295",
    Overview:
      "CJC-1295 is a growth hormone-releasing hormone analog that increases GH and IGF-1 levels. Available with or without DAC (Drug Affinity Complex), it enhances muscle growth and fat loss, improves sleep and recovery, and supports tissue repair and anti-aging processes.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=cjc-1295",
  },
  {
    Peptide: "Sermorelin",
    Overview:
      "Sermorelin is a GHRH analog that stimulates natural growth hormone release. It's used in research to promote recovery, energy, and lean mass. Benefits include increased natural growth hormone production, improved sleep quality, promoted lean muscle growth, and supported fat metabolism and energy.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=sermorelin",
  },
  {
    Peptide: "Tirzepatide",
    Overview:
      "Tirzepatide is a dual GIP and GLP-1 receptor agonist developed for diabetes and weight management research. It mimics incretin hormones, helping regulate blood sugar and appetite. Benefits include improved glycemic control, significant weight loss promotion, enhanced insulin sensitivity, and reduced cardiovascular risk markers.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=tirzepatide",
  },
  {
    Peptide: "Semaglutide",
    Overview:
      "Semaglutide is a GLP-1 receptor agonist used for diabetes and chronic weight management research. It enhances insulin secretion and suppresses appetite. Research shows appetite suppression, substantial weight reduction, improved HbA1c levels, and cardiovascular risk reduction.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=semaglutide",
  },
  {
    Peptide: "Retatrutide",
    Overview:
      "Retatrutide is a novel triple agonist targeting GIP, GLP-1, and glucagon receptors under investigation for obesity, diabetes, and metabolic conditions. Benefits include accelerated weight loss, improved metabolic markers, potential for NAFLD treatment, and enhanced insulin sensitivity.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=retatrutide",
  },
  {
    Peptide: "Epithalon",
    Overview:
      "Epithalon is a synthetic peptide with longevity-enhancing effects that mimics a natural pineal gland peptide. Research links it to increased lifespan in animal studies. Benefits include extended telomere length, supported longevity and anti-aging, improved sleep and circadian rhythm, and boosted immune function.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=epithalon",
  },
  {
    Peptide: "MOTS-C",
    Overview:
      "Mitochondrial-derived peptide involved in cellular energy regulation and metabolic homeostasis. Research focuses on its effects on obesity, aging, and metabolic diseases. Benefits include improved insulin sensitivity, enhanced mitochondrial function, supported fat loss, and potential longevity and anti-aging properties.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=mots-c",
  },
  {
    Peptide: "PT-141",
    Overview:
      "PT-141 is a melanocortin receptor agonist used in sexual dysfunction research. Unlike PDE5 inhibitors, it acts on the nervous system to increase sexual desire and arousal. Benefits include improved libido in men and women, effectiveness for erectile dysfunction, enhanced sexual arousal, and CNS-based action.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=pt-141",
  },
  {
    Peptide: "NAD+",
    Overview:
      "Nicotinamide adenine dinucleotide is a crucial coenzyme involved in cellular energy metabolism and DNA repair processes. Extensively researched for aging, metabolic health, and cellular regeneration. Benefits include supported cellular energy production, enhanced DNA repair mechanisms, promoted healthy aging processes, and improved metabolic function.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=nad+anti-aging",
  },
  {
    Peptide: "Melanotan I",
    Overview:
      "Melanotan I is a synthetic analog of alpha-MSH that induces melanin production, offering a safer tanning method with potential photoprotective benefits. Research shows enhanced natural tanning, potential photoprotection, reduced UV-related skin damage, and potential appetite-suppressing effects.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=melanotan+1",
  },
  {
    Peptide: "Melanotan II",
    Overview:
      "Melanotan II is a more potent derivative of MT-I offering both tanning and libido-enhancing effects. It works through melanocortin receptors with dual cosmetic and sexual benefits. Research shows promoted tanning with less sun exposure, increased libido, supported fat loss, and enhanced skin protection.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=melanotan+2",
  },
  {
    Peptide: "Thymosin Alpha 1",
    Overview:
      "Thymosin Alpha 1 is used to modulate immune function and combat infection. It enhances T-cell production and is researched for conditions like hepatitis and cancer. Benefits include boosted T-cell function, regulated inflammation, applications in cancer and viral therapy, and supported recovery from illness.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+alpha+1",
  },
  {
    Peptide: "Tesamorelin",
    Overview:
      "Tesamorelin is a growth hormone-releasing hormone analog that stimulates pituitary GH secretion. FDA-approved for HIV-associated lipodystrophy research. Benefits include reduced visceral fat, improved lipid profile, enhanced IGF-1 levels, and supported cognitive function.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=tesamorelin",
  },
  {
    Peptide: "HCG",
    Overview:
      "Human Chorionic Gonadotropin acts similarly to luteinizing hormone, prompting testosterone production. Often used in hormone replacement therapy research or fertility preservation. Benefits include maintained or restored testosterone levels, prevented testicular atrophy, supported fertility, and enhanced libido and mood.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=hcg",
  },
  {
    Peptide: "GHRP-2",
    Overview:
      "Growth Hormone Releasing Peptide-2 is a synthetic peptide that stimulates pituitary GH secretion. It has appetite-stimulating effects and supports recovery and metabolism. Benefits include increased growth hormone levels, enhanced appetite and nutrient uptake, improved recovery and fat metabolism, and supported immune health.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=ghrp-2",
  },
  {
    Peptide: "GHRP-6",
    Overview:
      "Growth Hormone Releasing Peptide-6 strongly stimulates both GH secretion and appetite. Useful for research in recovery and anabolic repair. Benefits include boosted growth hormone levels, promoted muscle repair and growth, stimulated appetite, and aided fat loss and recovery.",
    "PubMed Link": "https://pubmed.ncbi.nlm.nih.gov/?term=ghrp-6",
  },
]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  // Optimize filtering with useMemo
  const filteredPeptides = useMemo(() => {
    return peptideData.filter(
      (peptide) =>
        peptide.Peptide.toLowerCase().includes(searchTerm.toLowerCase()) ||
        peptide.Overview.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  // Function to find matching products for a peptide - optimized with useCallback
  const findMatchingProducts = useCallback((peptideName: string) => {
    return products.filter(product => 
      product.name.toLowerCase().includes(peptideName.toLowerCase()) ||
      product.abbreviation.toLowerCase().includes(peptideName.toLowerCase())
    )
  }, [])

  const toggleExpanded = useCallback((peptideName: string) => {
    setExpandedCard(expandedCard === peptideName ? null : peptideName)
  }, [expandedCard])

  return (
    <div className="min-h-screen bg-[#201c1a]">
      {/* Hero Section */}
      <section className="relative py-20 hero-section">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-200/10 to-emerald-300/20 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-200/10 to-purple-300/20 rounded-full animate-pulse blur-xl"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-sky-200/10 to-sky-300/20 rounded-full animate-float blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-200/20 to-emerald-300/30 rounded-full flex items-center justify-center">
                <Microscope className="h-10 w-10 text-emerald-300" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6 text-brand-900">Explore Peptides</h1>

            <p className="text-xl md:text-2xl text-brand-700 max-w-3xl mx-auto font-light leading-relaxed">
              Comprehensive research guide to peptides and their scientific applications.
              <br />
              <em className="text-brand-600">Discover the science behind each compound.</em>
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-lg overflow-hidden elegant-card">
              <Image
                src="/images/image-6.png"
                alt="Research Peptides Laboratory"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-medium mb-2">Scientific Research</h3>
                <p className="text-lg opacity-90">Advanced peptide research and development</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-600 h-5 w-5" />
              <Input
                placeholder="Search peptides by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg elegant-input bg-brand-100 border-brand-300 text-brand-900 placeholder:text-brand-600"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 elegant-card bg-gradient-to-br from-brand-50/60 to-brand-100/70 border border-brand-200/50">
              <div className="w-12 h-12 bg-brand-400/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <Beaker className="h-6 w-6 text-brand-700 dark:text-emerald-300" />
              </div>
              <div className="text-3xl font-bold text-brand-800 dark:text-[#f3efec] mb-2">{filteredPeptides.length}</div>
              <div className="text-brand-700 font-medium dark:text-[#d6cdc3]">Research Peptides</div>
            </div>

            <div className="text-center p-6 elegant-card bg-gradient-to-br from-rose-50/60 to-rose-100/70 border border-rose-200/50">
              <div className="w-12 h-12 bg-rose-300/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-rose-700 dark:text-rose-300" />
              </div>
              <div className="text-3xl font-bold text-rose-800 dark:text-[#f3efec] mb-2">100+</div>
              <div className="text-rose-700 font-medium dark:text-rose-200">Research Studies</div>
            </div>

            <div className="text-center p-6 elegant-card bg-gradient-to-br from-lavender-50/60 to-lavender-100/70 border border-lavender-200/50">
              <div className="w-12 h-12 bg-lavender-300/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="h-6 w-6 text-lavender-700 dark:text-lavender-300" />
              </div>
              <div className="text-3xl font-bold text-lavender-800 dark:text-[#f3efec] mb-2">6</div>
              <div className="text-lavender-700 font-medium dark:text-lavender-200">Research Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Peptides Grid */}
      <section className="py-20 content-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPeptides.map((peptide, index) => {
              const isExpanded = expandedCard === peptide.Peptide
              const matchingProducts = findMatchingProducts(peptide.Peptide)
              
              return (
                <Card key={peptide.Peptide} className="elegant-card elegant-hover bg-brand-50 border-brand-200">
                  <CardHeader 
                    className="cursor-pointer" 
                    onClick={() => toggleExpanded(peptide.Peptide)}
                  >
                    <CardTitle className="text-2xl font-medium text-brand-900 flex items-center justify-between">
                      {peptide.Peptide}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Beaker className="h-4 w-4 text-white" />
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-brand-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-brand-600" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className={`text-brand-700 leading-relaxed ${isExpanded ? '' : 'line-clamp-4'}`}>
                      {peptide.Overview}
                    </p>

                    {isExpanded && matchingProducts.length > 0 && (
                      <div className="bg-brand-100 rounded-lg p-4 border border-brand-200">
                        <h4 className="font-medium text-brand-900 mb-3">Available Products:</h4>
                        <div className="space-y-2">
                          {matchingProducts.map((product) => (
                            <Link 
                              key={product.id} 
                              href={`/products/${product.id}`}
                              className="block p-2 bg-white rounded border border-brand-200 hover:bg-brand-50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-brand-900">{product.name}</span>
                                <span className="text-brand-600 font-medium">${product.price.toFixed(2)}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-brand-200">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-brand-300 text-brand-700 hover:bg-brand-100 hover:text-brand-900 bg-transparent"
                      >
                        <a
                          href={peptide["PubMed Link"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>PubMed</span>
                        </a>
                      </Button>

                      <Button size="sm" asChild className="bg-brand-600 hover:bg-brand-700 text-white">
                        <Link href="/shop">View All Products</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* No Results */}
          {filteredPeptides.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-2xl font-medium text-brand-900 mb-4">No peptides found</h3>
              <p className="text-brand-700 mb-6">Try adjusting your search terms</p>
              <Button onClick={() => setSearchTerm("")} className="bg-brand-600 hover:bg-brand-700 text-white">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 content-section-alt">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-medium mb-6 text-brand-900">Ready to Start Your Research?</h2>
            <p className="text-xl text-brand-700 mb-8 font-light">
              Explore our comprehensive catalog of research-grade peptides, each backed by scientific literature and
              quality assurance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-medium px-8 py-6 text-lg"
              >
                <a href="/shop">Browse Products</a>
              </Button>
              <div className="text-center">
                <p className="text-brand-700 mb-2">Need research support?</p>
                <a href="mailto:aminorejuvenation@gmail.com" className="text-brand-600 hover:text-brand-800 font-medium">
                  aminorejuvenation@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
