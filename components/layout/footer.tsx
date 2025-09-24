import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-brand-100 border-t border-brand-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/transparent-logo.png"
                  alt="Amino Rejuvenation"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-serif font-medium text-brand-800">AMINO REJUVENATION</span>
            </div>
            <p className="text-brand-600 mb-4 font-medium">Wellness. Vitality. Transformation.</p>
            <p className="text-sm text-brand-700">
              Premium health and wellness solutions designed to support your journey to optimal well-being.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 text-brand-800">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/shop" className="block text-brand-600 hover:text-brand-500 transition-colors">
                Shop
              </Link>
              <Link href="/faq" className="block text-brand-600 hover:text-brand-500 transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="font-medium mb-4 text-brand-800">Trust & Quality</h4>
            <div className="space-y-2 text-sm text-brand-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-200 mt-8 pt-8">
          <p className="text-brand-600 text-sm text-center">© 2024 Amino Rejuvenation. All rights reserved.</p>
        </div>

        <div className="mt-8 p-4 bg-brand-200 border border-brand-300 rounded-lg">
          <p className="text-xs text-brand-700 text-center">
            <strong>DISCLAIMER:</strong> All products sold by Amino Rejuvenation are for research purposes only. These products are not intended for human consumption, diagnosis, treatment, cure, or prevention of any disease. Not for use in humans or animals.
          </p>
        </div>
      </div>
    </footer>
  )
}
