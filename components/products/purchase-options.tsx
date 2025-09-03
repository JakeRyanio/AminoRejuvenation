"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, RefreshCw, Zap } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import type { Product } from "@/lib/products-data"

interface PurchaseOptionsProps {
  product: Product
  quantity?: number
}

export function PurchaseOptions({ product, quantity = 1 }: PurchaseOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<"one-time" | "subscription">("one-time")
  const { addItem } = useCart()

  // For products without subscription, always use one-time
  const effectiveOption = !product.subscriptionPrice ? "one-time" : selectedOption

  const handleAddToCart = () => {
    const price = effectiveOption === "subscription" ? product.subscriptionPrice : product.price

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: effectiveOption === "subscription" ? `${product.name} (Monthly)` : product.name,
        price: price,
        image: product.image,
        purchaseType: effectiveOption,
      })
    }
  }

  const savings = product.subscriptionPrice ? product.price - product.subscriptionPrice : 0
  const savingsPercentage = product.subscriptionPrice ? Math.round((savings / product.price) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Purchase Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#ebe7e4]">Purchase Options</h3>

        {/* One-time Purchase */}
        <div
          className={`elegant-card p-4 cursor-pointer transition-all duration-200 ${
            selectedOption === "one-time"
              ? "border-[#d2c6b8] bg-[#d2c6b8]/10"
              : "border-[#403c3a] hover:border-[#504c4a]"
          }`}
          onClick={() => setSelectedOption("one-time")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  selectedOption === "one-time" ? "border-[#d2c6b8] bg-[#d2c6b8]" : "border-[#beb2a4]"
                }`}
              >
                {selectedOption === "one-time" && <div className="w-2 h-2 bg-[#201c1a] rounded-full m-0.5"></div>}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4 text-[#d2c6b8]" />
                  <span className="font-medium text-[#ebe7e4]">One-time Purchase</span>
                </div>
                <p className="text-sm text-[#beb2a4]">Single purchase, no commitment</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-medium text-[#ebe7e4]">${product.price.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Subscription - Only show if product has subscription option */}
        {product.subscriptionPrice && (
          <div
            className={`elegant-card p-4 cursor-pointer transition-all duration-200 relative ${
              selectedOption === "subscription"
                ? "border-emerald-400 bg-emerald-400/10"
                : "border-[#403c3a] hover:border-[#504c4a]"
            }`}
            onClick={() => setSelectedOption("subscription")}
          >
            {/* Popular Badge */}
            <div className="absolute -top-2 left-4">
              <span className="bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                SAVE {savingsPercentage}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedOption === "subscription" ? "border-emerald-400 bg-emerald-400" : "border-[#beb2a4]"
                  }`}
                >
                  {selectedOption === "subscription" && <div className="w-2 h-2 bg-[#201c1a] rounded-full m-0.5"></div>}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-emerald-400" />
                    <span className="font-medium text-[#ebe7e4]">Monthly Subscription</span>
                    <Zap className="h-3 w-3 text-emerald-400" />
                  </div>
                  <p className="text-sm text-[#beb2a4]">Delivered monthly • Cancel anytime</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-medium text-emerald-400">${product.subscriptionPrice.toFixed(2)}</div>
                <div className="text-sm text-[#beb2a4] line-through">${product.price.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Benefits for Subscription */}
      {selectedOption === "subscription" && (
        <div className="elegant-card p-4 bg-emerald-900/20 border border-emerald-500/30">
          <h4 className="font-medium text-emerald-300 mb-3">Subscription Benefits</h4>
          <ul className="space-y-2 text-sm text-emerald-200">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>
                Save ${savings.toFixed(2)} every month ({savingsPercentage}% off)
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>Never run out of research materials</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>Priority shipping and support</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>Cancel or modify anytime</span>
            </li>
          </ul>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        className={`w-full font-medium text-lg py-6 rounded-md transition-all duration-200 ${
          selectedOption === "subscription"
            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
            : "bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a]"
        }`}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        {selectedOption === "subscription"
          ? `Subscribe & Save - $${(product.subscriptionPrice * quantity).toFixed(2)}/month`
          : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
      </Button>

      {/* Subscription Note */}
      {selectedOption === "subscription" && (
        <p className="text-xs text-[#beb2a4] text-center">
          First delivery in 2-3 days, then monthly. Cancel anytime from your account.
        </p>
      )}
    </div>
  )
}
