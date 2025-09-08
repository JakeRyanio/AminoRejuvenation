"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [cryptoType, setCryptoType] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  useEffect(() => {
    const pi = searchParams.get("payment_intent")
    const pm = searchParams.get("payment_method")
    const crypto = searchParams.get("crypto")
    const txId = searchParams.get("tx_id")
    
    setPaymentIntent(pi)
    setPaymentMethod(pm)
    setCryptoType(crypto)
    setTransactionId(txId)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#201c1a] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-serif font-medium mb-4 text-[#ebe7e4]">
            {paymentMethod === "crypto" ? "Crypto Payment Received!" : "Order Confirmed!"}
          </h1>
          <p className="text-xl text-[#beb2a4] mb-8">
            {paymentMethod === "crypto" 
              ? "Thank you for your crypto payment. Your order will be processed once the transaction is verified on the blockchain."
              : "Thank you for your purchase. Your order has been successfully processed."
            }
          </p>

          {/* Telegram Join Notice - TOP PRIORITY */}
          <div className="elegant-card p-8 mb-8 bg-emerald-900/30 border-2 border-emerald-400/50 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300 text-center">🔥 IMPORTANT!! 🔥</h2>
            <p className="text-emerald-100 text-xl font-bold leading-relaxed mb-6 text-center">
              "Join The Precision Peptides Telegram" for all updates and crucial info regarding orders and up to date peptide info
            </p>
            <div className="text-center">
              <a 
                href="https://t.me/+5bkte1L2DtJkNmUx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚀 Join Telegram Channel Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Order Details */}
          {(paymentIntent || transactionId) && (
            <div className="elegant-card p-6 mb-8 text-left">
              <h2 className="text-xl font-medium mb-4 text-[#ebe7e4]">Order Details</h2>
              <div className="space-y-2 text-[#beb2a4]">
                {paymentMethod === "crypto" ? (
                  <>
                    <p>
                      <strong className="text-[#ebe7e4]">Payment Method:</strong> {cryptoType} Cryptocurrency
                    </p>
                    <p>
                      <strong className="text-[#ebe7e4]">Transaction ID:</strong> {transactionId}
                    </p>
                    <p>
                      <strong className="text-[#ebe7e4]">Status:</strong>{" "}
                      <span className="text-yellow-400">Pending Verification</span>
                    </p>
                    <p>
                      <strong className="text-[#ebe7e4]">Processing Time:</strong> 2-4 hours after verification
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong className="text-[#ebe7e4]">Order ID:</strong> {paymentIntent}
                    </p>
                    <p>
                      <strong className="text-[#ebe7e4]">Payment Method:</strong> Credit Card
                    </p>
                    <p>
                      <strong className="text-[#ebe7e4]">Status:</strong>{" "}
                      <span className="text-emerald-400">Confirmed</span>
                    </p>
                    <p>
                      <strong className="text-[#ebe7e4]">Processing Time:</strong> 24-48 hours
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Crypto Verification Notice */}
          {paymentMethod === "crypto" && (
            <div className="elegant-card p-6 mb-8 bg-blue-900/20 border border-blue-500/30">
              <h3 className="text-lg font-medium mb-3 text-blue-300">Crypto Payment Verification</h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                Your {cryptoType} payment is being verified on the blockchain. Once confirmed, we'll process your order immediately. 
                You'll receive an email confirmation once verification is complete. This typically takes 10-30 minutes depending on network congestion.
              </p>
            </div>
          )}

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
          <div className="flex justify-center">
            <Link href="/shop">
              <Button className="bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium px-8">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-[#beb2a4] text-sm mt-8">
            Need help? Contact our support team at{" "}
            <a href="mailto:precisionpeptides@proton.me" className="text-[#d2c6b8] hover:text-[#ebe7e4]">
              precisionpeptides@proton.me
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
