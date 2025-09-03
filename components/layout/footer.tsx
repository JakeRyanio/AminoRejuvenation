import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#2a2624] border-t border-[#403c3a] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/precision-peptides-monogram.png"
                  alt="Precision Peptides"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-serif font-medium text-[#ebe7e4]">PRECISION PEPTIDES</span>
            </div>
            <p className="text-[#d2c6b8] mb-4 font-medium">Precision. Purity. Potential.</p>
            <p className="text-sm text-[#beb2a4]">
              Premium research peptides for scientific applications. All products are for research use only.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 text-[#ebe7e4]">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/shop" className="block text-[#beb2a4] hover:text-[#d2c6b8] transition-colors">
                Shop
              </Link>
              <Link href="/faq" className="block text-[#beb2a4] hover:text-[#d2c6b8] transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="font-medium mb-4 text-[#ebe7e4]">Trust & Quality</h4>
            <div className="space-y-2 text-sm text-[#beb2a4]">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#d2c6b8] rounded-full"></div>
                <span>USA Lab-Tested</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#d2c6b8] rounded-full"></div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#d2c6b8] rounded-full"></div>
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#403c3a] mt-8 pt-8">
          <p className="text-[#beb2a4] text-sm text-center">© 2024 Precision Peptides. All rights reserved.</p>
        </div>

        <div className="mt-8 p-4 bg-[#403c3a] border border-[#504c4a] rounded-lg">
          <p className="text-xs text-[#beb2a4] text-center">
            <strong>DISCLAIMER:</strong> All products sold by Precision Peptides are for research purposes only. These
            products are not intended for human consumption, diagnosis, treatment, cure, or prevention of any disease.
            Not for use in humans or animals.
          </p>
        </div>
      </div>
    </footer>
  )
}
