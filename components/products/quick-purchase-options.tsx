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

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      purchaseType: "one-time",
    })
  }

  return (
    <div className="space-y-3">
      {/* Price Display */}
      <div className="text-center">
        <div className="text-2xl font-medium text-[#d2c6b8] mb-1">${product.price.toFixed(2)}</div>
        <div className="text-sm text-[#beb2a4]">
          One-time purchase only
        </div>
      </div>

      {/* Purchase Buttons */}
      <div className="grid grid-cols-1 gap-2">
        <Button
          onClick={handleAddToCart}
          className="bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart - ${product.price.toFixed(2)}
        </Button>
      </div>
    </div>
  )
}
