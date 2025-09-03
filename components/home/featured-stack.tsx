"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Zap, Package, TrendingUp } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { products } from "@/lib/products-data"

export function FeaturedStack() {
  const { addItem } = useCart()
  
  // Find the Lean Clean Stack product
  const featuredProduct = products.find(p => p.id === "lean-clean-stack")
  
  if (!featuredProduct) return null

  const handleAddToCart = () => {
    addItem({
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      image: featuredProduct.image,
      purchaseType: "one-time",
    })
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#2a2624] to-[#201c1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 text-sm font-semibold">
              <Zap className="h-4 w-4 mr-2" />
              MONTHLY FEATURED STACK
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-[#ebe7e4]">
            This Month's Special Bundle
          </h2>
          <p className="text-xl text-[#beb2a4] max-w-3xl mx-auto">
            Our expertly curated combination for maximum results. Save $51 when you get both products together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="elegant-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-[#3a3632] to-[#2a2624] p-8 lg:p-12 flex items-center justify-center">
                <div className="absolute top-6 left-6">
                  <Badge className="bg-red-500 text-white px-3 py-1 text-xs font-bold animate-pulse">
                    SAVE $51
                  </Badge>
                </div>
                <div className="relative">
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    width={400}
                    height={400}
                    className="object-contain max-w-full h-auto"
                    onError={(e) => {
                      console.error('Image failed to load:', featuredProduct.image)
                    }}
                  />
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-emerald-500 text-white rounded-full p-2">
                      <Package className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(featuredProduct.reviews.rating) 
                              ? "text-[#d2c6b8] fill-current" 
                              : "text-[#504c4a]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[#beb2a4] ml-2 text-sm">
                      {featuredProduct.reviews.rating} ({featuredProduct.reviews.count} reviews)
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-serif font-medium mb-4 text-[#ebe7e4]">
                    {featuredProduct.name}
                  </h3>
                  
                  <p className="text-[#beb2a4] mb-6 text-lg leading-relaxed">
                    The perfect combination of weight loss and skin enhancement. Get Retatrutide 20mg for advanced metabolic support plus Glow 50 for collagen production and skin health.
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl font-bold text-[#d2c6b8] mr-4">
                      ${featuredProduct.price.toFixed(2)}
                    </div>
                    <div className="text-lg text-[#beb2a4] line-through mr-2">
                      $340.00
                    </div>
                    <Badge className="bg-emerald-500 text-white px-2 py-1 text-sm">
                      SAVE $51
                    </Badge>
                  </div>
                  <div className="text-[#beb2a4]">
                    One-time purchase only • Bundle discount applied
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-[#ebe7e4] mb-4">What's Included:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                      <span className="text-[#beb2a4]">Retatrutide 20mg - Advanced weight loss support</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                      <span className="text-[#beb2a4]">Glow 50 - Skin health & collagen boost</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                      <span className="text-[#beb2a4]">Comprehensive research-grade quality</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add Stack to Cart
                  </Button>
                  
                  <Link href={`/products/${featuredProduct.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-[#d2c6b8] text-[#d2c6b8] hover:bg-[#d2c6b8] hover:text-[#201c1a] py-4 text-lg transition-all duration-300"
                    >
                      <TrendingUp className="h-5 w-5 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 pt-6 border-t border-[#403c3a]">
                  <div className="flex items-center justify-center space-x-6 text-[#beb2a4] text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                      <span>Research Grade</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                      <span>Expert Curated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
