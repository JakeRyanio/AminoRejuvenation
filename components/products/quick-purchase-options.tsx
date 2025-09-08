"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, RefreshCw } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import type { Product } from "@/lib/products-data"

interface QuickPurchaseOptionsProps {
  product: Product
}

export function QuickPurchaseOptions({ product }: QuickPurchaseOptionsProps) {
  const { addItem } = useCart()

  const handleAddToCart = (purchaseType: "one-time" | "subscription") => {
    const price = purchaseType === "subscription" ? (product.subscriptionPrice || 0) : product.price
    const name = purchaseType === "subscription" ? `${product.name} (Monthly)` : product.name

    addItem({
      id: product.id,
      name: name,
      price: price,
      image: product.image,
      purchaseType: purchaseType,
    })
  }

  const savings = product.subscriptionPrice ? product.price - product.subscriptionPrice : 0
  const savingsPercentage = product.subscriptionPrice ? Math.round((savings / product.price) * 100) : 0

  return (
    <div className="space-y-3">
      {/* Price Display */}
      <div className="text-center">
        <div className="text-2xl font-medium text-[#d2c6b8] mb-1">${product.price.toFixed(2)}</div>
        {product.subscriptionPrice && (
          <div className="text-sm text-emerald-400">
            Or ${product.subscriptionPrice.toFixed(2)}/month (Save {savingsPercentage}%)
          </div>
        )}
        {!product.subscriptionPrice && (
          <div className="text-sm text-[#beb2a4]">
            One-time purchase only
          </div>
        )}
      </div>

      {/* Purchase Buttons */}
      <div className="grid grid-cols-1 gap-2">
        <Button
          onClick={() => handleAddToCart("one-time")}
          className="bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Buy Once - ${product.price.toFixed(2)}
        </Button>

        {product.subscriptionPrice && (
          <Button
            onClick={() => handleAddToCart("subscription")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium relative"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Subscribe & Save {savingsPercentage}% - ${product.subscriptionPrice.toFixed(2)}/mo
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">SAVE</span>
          </Button>
        )}
      </div>
    </div>
  )
}
