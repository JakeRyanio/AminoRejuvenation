"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, X } from "lucide-react"
import Image from "next/image"
import type { CartItem } from "./cart-context"

interface AddToCartPopupProps {
  isOpen: boolean
  onClose: () => void
  item: CartItem | null
}

export function AddToCartPopup({ isOpen, onClose, item }: AddToCartPopupProps) {
  const router = useRouter()

  if (!isOpen || !item) return null

  const handleCheckoutNow = () => {
    router.push("/checkout")
    onClose()
  }

  const handleContinueShopping = () => {
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleContinueShopping}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
        <div className="bg-[#201c1a] border border-[#403c3a] rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-center relative">
            <button
              onClick={handleContinueShopping}
              className="absolute top-2 right-2 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center justify-center space-x-2">
              <div className="bg-white/20 rounded-full p-2">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Added to Cart!</h2>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#2a2624] flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[#ebe7e4] mb-1">{item.name}</h3>
                <p className="text-[#beb2a4] text-sm capitalize mb-1">
                  {item.purchaseType === "subscription" ? "Monthly Subscription" : "One-time Purchase"}
                </p>
                <p className="text-[#d2c6b8] font-semibold">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleCheckoutNow}
                className="w-full bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-semibold py-3"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Checkout Now
              </Button>
              
              <Button
                onClick={handleContinueShopping}
                variant="outline"
                className="w-full border-[#403c3a] text-[#ebe7e4] hover:bg-[#2a2624] hover:text-[#ebe7e4] py-3"
              >
                Continue Shopping
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-4 p-3 bg-[#2a2624] rounded-lg">
              <p className="text-xs text-[#beb2a4] text-center">
                ✅ Free shipping on orders over $100 • 🔬 Research use only
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


