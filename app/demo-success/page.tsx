"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"

export default function DemoSuccessPage() {
  return (
    <div className="min-h-screen bg-[#201c1a] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-serif font-medium mb-4 text-[#ebe7e4]">Order Confirmed!</h1>
          <p className="text-xl text-[#beb2a4] mb-8">
            Thank you for your purchase. Your order has been successfully processed.
          </p>

          {/* Order Details */}
          <div className="elegant-card p-6 mb-8 text-left">
            <h2 className="text-xl font-medium mb-4 text-[#ebe7e4]">Order Details</h2>
            <div className="space-y-2 text-[#beb2a4]">
              <p>
                <strong className="text-[#ebe7e4]">Order ID:</strong> pi_3QWxyzDemo123456789
              </p>
              <p>
                <strong className="text-[#ebe7e4]">Status:</strong>{" "}
                <span className="text-emerald-400">Confirmed</span>
              </p>
              <p>
                <strong className="text-[#ebe7e4]">Processing Time:</strong> 24-48 hours
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="elegant-card p-6 text-center">
              <div className="w-12 h-12 bg-sky-200/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-sky-300" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-[#ebe7e4]">Email Confirmation</h3>
              <p className="text-[#beb2a4] text-sm">
                You'll receive an email confirmation with your order details and tracking information.
              </p>
            </div>

            <div className="elegant-card p-6 text-center">
              <div className="w-12 h-12 bg-orange-200/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-orange-300" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-[#ebe7e4]">Shipping</h3>
              <p className="text-[#beb2a4] text-sm">
                Your order will be processed within 24-48 hours and shipped with temperature control.
              </p>
            </div>
          </div>

          {/* Telegram Join Notice */}
          <div className="elegant-card p-6 mb-8 bg-emerald-900/20 border border-emerald-500/30">
            <h3 className="text-lg font-medium mb-3 text-emerald-300">IMPORTANT!!</h3>
            <p className="text-emerald-200 text-base leading-relaxed mb-4">
              "Join The Precision Peptides Telegram" for all updates and crucial info regarding orders and up to date peptide info
            </p>
            <a 
              href="https://t.me/+5bkte1L2DtJkNmUx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Join Telegram Channel
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Important Notice */}
          <div className="elegant-card p-6 mb-8 bg-amber-900/20 border border-amber-500/30">
            <h3 className="text-lg font-medium mb-3 text-amber-300">Important Research Notice</h3>
            <p className="text-amber-200 text-sm leading-relaxed">
              All products are for research use only and are not intended for human consumption. Reconstitution
              instructions will be included with your order. Please ensure proper storage and handling according to the
              provided guidelines.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button className="bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium px-8">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#d2c6b8] text-[#d2c6b8] hover:bg-[#d2c6b8] hover:text-[#201c1a] font-medium px-8 bg-transparent"
              >
                Contact Support
              </Button>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-[#beb2a4] text-sm mt-8">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@precisionpeptides.com" className="text-[#d2c6b8] hover:text-[#ebe7e4]">
              support@precisionpeptides.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
