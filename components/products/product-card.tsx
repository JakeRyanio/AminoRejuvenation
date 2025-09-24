"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import type { Product } from "@/lib/products-data"
import { memo } from "react"

interface ProductCardProps {
  product: Product
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
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
    <div className="elegant-card rounded-md overflow-hidden elegant-hover group">
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 product-image-card group-hover:scale-105 transition-transform duration-300"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
          <div className="absolute top-4 left-4">
            <span className="elegant-badge">{product.category}</span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl font-medium mb-2 text-brand-900 hover:text-brand-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-brand-800 text-sm mb-4 line-clamp-2">{product.overview}</p>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.reviews.rating) ? "text-brand-500 fill-current" : "text-brand-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-brand-700 ml-2">({product.reviews.count})</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-medium text-brand-700">${product.price.toFixed(2)}</span>
              <div className="text-sm text-brand-600">
                One-time purchase
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-brand-500 hover:bg-brand-600 text-brand-50 font-medium rounded-md px-4 py-2 text-sm"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})
