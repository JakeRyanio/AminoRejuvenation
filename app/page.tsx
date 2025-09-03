import { Hero } from "@/components/home/hero"
import { FeaturedProducts } from "@/components/home/featured-products"
import { FeaturedStack } from "@/components/home/featured-stack"
import { Benefits } from "@/components/home/benefits"
import { Testimonials } from "@/components/home/testimonials"
import { FloatingReviewButton } from "@/components/home/floating-review-button"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <FeaturedStack />
      <Benefits />
      <FloatingReviewButton />
      <Testimonials />
    </div>
  )
}
