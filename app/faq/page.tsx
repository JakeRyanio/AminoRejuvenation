import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What are research peptides?",
      answer:
        "Research peptides are short chains of amino acids used exclusively for scientific research and laboratory applications. They are not intended for human consumption and are designed to help researchers study various biological processes and mechanisms.",
    },
    {
      question: "How do you ensure peptide purity?",
      answer:
        "Every batch of our peptides undergoes rigorous testing using HPLC (High-Performance Liquid Chromatography) and mass spectrometry. We guarantee 99%+ purity and provide detailed certificates of analysis with each order.",
    },
    {
      question: "What is your shipping policy?",
      answer:
        "We offer fast, temperature-controlled shipping to maintain peptide integrity. Orders are typically processed within 24-48 hours and shipped via cold-chain delivery. Domestic orders usually arrive within 2-3 business days.",
    },
    {
      question: "Are your peptides legal?",
      answer:
        "Yes, our peptides are legal for research purposes. All products are clearly labeled 'For Research Use Only' and are not intended for human consumption. Customers are responsible for ensuring compliance with local regulations.",
    },
    {
      question: "How should peptides be stored?",
      answer:
        "Lyophilized (freeze-dried) peptides should be stored at -20°C or below in a dry environment. Once reconstituted, peptides should be stored at 2-8°C and used within the timeframe specified in the product documentation.",
    },
    {
      question: "Do you provide certificates of analysis?",
      answer:
        "Yes, we provide detailed certificates of analysis (COA) with every order. These documents include purity analysis, molecular weight confirmation, and other relevant analytical data to support your research.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, bank transfers, and cryptocurrency payments. All transactions are processed securely through encrypted payment gateways.",
    },
    {
      question: "Can I return or exchange products?",
      answer:
        "Due to the nature of research chemicals, we cannot accept returns of opened products. However, if you receive a damaged or incorrect item, please contact us within 48 hours for a replacement or refund.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping times vary by location, and customers are responsible for any customs duties or import fees. Some restrictions may apply based on local regulations.",
    },
    {
      question: "How do I reconstitute lyophilized peptides?",
      answer:
        "Detailed reconstitution instructions are provided with each product. Generally, peptides should be reconstituted with sterile water or appropriate buffer solutions. Always follow the specific guidelines provided for each peptide.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-lavender-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-[#1f2937]">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-[#374151] max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our research peptides and services
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group"
              >
                <div className="bg-white backdrop-blur-sm border border-brand-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-400 text-[#0f172a]">
                  <AccordionTrigger className="text-left px-6 py-4 hover:bg-brand-50/60 transition-colors rounded-t-xl text-[#0f172a]">
                    <span className="font-semibold text-[#0f172a] text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-[#1f2937]">
                    <div className="pt-2 pb-4">
                      <p className="leading-relaxed text-base">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-brand-100 to-lavender-100 rounded-2xl border border-brand-200 shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-900">Still have questions?</h3>
              <p className="text-brand-700 mb-6 max-w-2xl mx-auto">
                Our scientific support team is here to help with any technical questions about our products.
              </p>
              <div className="inline-flex items-center space-x-2 bg-white/60 px-6 py-3 rounded-full border border-brand-200">
                <span className="text-brand-800 font-medium">Contact us at:</span>
                <a 
                  href="mailto:aminorejuvenation@gmail.com" 
                  className="text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                >
                  aminorejuvenation@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
