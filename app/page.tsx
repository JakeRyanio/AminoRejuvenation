import { Hero } from "@/components/home/hero"
import { FeaturedProducts } from "@/components/home/featured-products"
import { FeaturedStack } from "@/components/home/featured-stack"
import { Benefits } from "@/components/home/benefits"
import { Testimonials } from "@/components/home/testimonials"
import { FloatingReviewButton } from "@/components/home/floating-review-button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Amino Rejuvenation | Premium Health & Wellness Solutions",
  description: "Discover premium health and wellness solutions designed to support your journey to optimal well-being. Quality products, expert guidance, and transformative results.",
  keywords: "health wellness, amino acids, rejuvenation, wellness solutions, health products, premium supplements, wellness journey, optimal well-being",
  openGraph: {
    title: "Amino Rejuvenation | Premium Health & Wellness Solutions",
    description: "Discover premium health and wellness solutions designed to support your journey to optimal well-being. Quality products, expert guidance, and transformative results.",
    images: ["/placeholder-logo.svg"]
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Homepage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Amino Rejuvenation - Premium Health & Wellness Solutions",
            "description": "Discover premium health and wellness solutions designed to support your journey to optimal well-being. Quality products, expert guidance, and transformative results.",
            "url": "https://aminorejuvenation.com",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Featured Wellness Products",
              "description": "Top-selling health and wellness products for optimal well-being",
              "numberOfItems": 12
            }
          })
        }}
      />
      
      <header>
        <h1 className="sr-only">Amino Rejuvenation - Premium Health & Wellness Solutions</h1>
      </header>
      
      <Hero />
      <FeaturedProducts />
      <FeaturedStack />
      <Benefits />
      <FloatingReviewButton />
      <Testimonials />
    </div>
  )
}
