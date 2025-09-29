import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Beaker, Shield, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-section dark:bg-[rgb(43,47,44)]">
      {/* Subtle pastel background elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-200/10 to-emerald-300/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-rose-200/10 to-rose-300/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-sky-200/10 to-sky-300/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-purple-200/10 to-purple-300/20 rounded-full animate-pulse blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/images/transparent-logo.png"
                alt="Amino Rejuvenation"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6 leading-tight text-brand-deep-mauve dark:text-brand-50">
              AMINO
              <br />
              REJUVENATION
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-brand-sage-green mb-8 max-w-2xl font-light dark:text-brand-200">
              Premium health and wellness solutions for optimal well-being.
              <br />
              <em className="text-brand-deep-mauve dark:text-brand-100">Wellness. Vitality. Transformation.</em>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-brand-sage-green to-brand-deep-mauve hover:from-brand-deep-mauve hover:to-brand-sage-green text-white font-medium px-8 py-6 text-lg hover:scale-105 transition-all duration-300 shadow-lg dark:from-brand-700 dark:to-rose-700">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <Image
              src="/images/image-5.png"
              alt="Amino Rejuvenation Wellness Products"
              width={600}
              height={600}
              className="object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Key Features with brand colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center p-8 elegant-card elegant-hover bg-gradient-to-br from-rose-100/40 to-rose-200/50 border border-rose-200/60 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 dark:from-[#2B2F2C] dark:to-[#2B2F2C] dark:border-brand-700">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full flex items-center justify-center mb-6">
              <Beaker className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-brand-deep-mauve dark:text-brand-50">Premium Quality</h3>
            <p className="text-brand-sage-green text-center leading-relaxed dark:text-brand-200">
              Highest quality ingredients and rigorous testing protocols
            </p>
          </div>

          <div className="flex flex-col items-center p-8 elegant-card elegant-hover bg-gradient-to-br from-brand-100/40 to-brand-200/50 border border-brand-200/60 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 dark:from-[#2B2F2C] dark:to-[#2B2F2C] dark:border-brand-700">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-brand-deep-mauve dark:text-brand-50">Expert Formulated</h3>
            <p className="text-brand-sage-green text-center leading-relaxed dark:text-brand-200">
              All products are expertly formulated for optimal wellness
            </p>
          </div>

          <div className="flex flex-col items-center p-8 elegant-card elegant-hover bg-gradient-to-br from-rose-100/40 to-rose-200/50 border border-rose-200/60 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 dark:from-[#2B2F2C] dark:to-[#2B2F2C] dark:border-brand-700">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-brand-deep-mauve dark:text-brand-50">Free Shipping</h3>
            <p className="text-brand-sage-green text-center leading-relaxed dark:text-brand-200">
              Complimentary shipping with 24-48 hour processing
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
