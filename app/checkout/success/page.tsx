"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    const oid = searchParams.get("order_id")
    setOrderId(oid)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#201c1a] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-brand-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-serif font-medium mb-4 text-[#ebe7e4]">
            Order Confirmed!
          </h1>
          <p className="text-xl text-[#beb2a4] mb-8">
            Thank you for your purchase. Your order has been successfully processed and will be shipped within 1-2 business days.
          </p>


          {/* Order Details */}
          {orderId && (
            <div className="elegant-card p-6 mb-8 text-left bg-[#403c3a] border border-[#504c4a]">
              <h2 className="text-xl font-medium mb-4 text-[#ebe7e4]">Order Details</h2>
              <div className="space-y-2 text-[#beb2a4]">
                <p>
                  <strong className="text-[#d2c6b8]">Order ID:</strong> {orderId}
                </p>
                <p>
                  <strong className="text-[#d2c6b8]">Status:</strong>{" "}
                  <span className="text-brand-400 font-semibold">Confirmed</span>
                </p>
                <p>
                  <strong className="text-[#d2c6b8]">Processing Time:</strong> 1-2 business days
                </p>
                <p>
                  <strong className="text-[#d2c6b8]">Shipping:</strong> Free shipping on all orders
                </p>
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="elegant-card p-6 mb-8 bg-amber-100/80 border border-amber-300/60">
            <h3 className="text-lg font-medium mb-3 text-amber-900">Important Research Notice</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              All products sold by Amino Rejuvenation are for research purposes only. These products are not intended for human consumption, diagnosis, treatment, cure, or prevention of any disease. Not for use in humans or animals.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Link href="/shop">
              <Button className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-8">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-[#beb2a4] text-sm mt-8">
            Need help? Contact our support team at{" "}
            <a href="mailto:aminorejuvenation@gmail.com" className="text-[#d2c6b8] hover:text-[#ebe7e4] font-medium">
              aminorejuvenation@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
