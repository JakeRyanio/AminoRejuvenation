"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Shield, Beaker, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuickPurchaseOptions } from "./quick-purchase-options"
import type { Product } from "@/lib/products-data"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)

  return (
        <div className="container mx-auto px-4 py-4 bg-rose-800 min-h-screen max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="space-y-2">
          <div className="relative elegant-card p-2">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={250}
              height={250}
              className="w-full product-image rounded-md"
              style={{ objectFit: "contain", objectPosition: "center", maxHeight: "200px" }}
            />
            <div className="absolute top-2 left-2">
              <span className="elegant-badge">{product.category}</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div>
                <h1 className="text-xl font-serif font-medium mb-2 text-white">{product.name}</h1>

            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.reviews.rating) ? "text-[#d2c6b8] fill-current" : "text-[#504c4a]"
                    }`}
                  />
                ))}
              </div>
                  <span className="text-rose-200 ml-2 text-xs">
                    {product.reviews.rating} ({product.reviews.count} reviews)
                  </span>
            </div>

            {/* Price Display */}
            <div className="mb-3">
              <div className="text-xl font-medium text-white mb-1">${product.price.toFixed(2)}</div>
              <div className="text-xs text-rose-200">
                One-time purchase only
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            {/* Purchase Options Component */}
            <QuickPurchaseOptions product={product} />
          </div>

          {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 py-3 border-t border-rose-700">
                <div className="text-center">
                  <div className="w-8 h-8 bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Shield className="h-4 w-4 text-rose-200" />
                  </div>
                  <p className="text-xs text-rose-200">Lab Tested</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Beaker className="h-4 w-4 text-rose-200" />
                  </div>
                  <p className="text-xs text-rose-200">99%+ Purity</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Clock className="h-4 w-4 text-rose-200" />
                  </div>
                  <p className="text-xs text-rose-200">Free Shipping</p>
                </div>
              </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-8">
        <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-rose-900 rounded-md">
            <TabsTrigger
              value="overview"
              className="text-rose-200 data-[state=active]:bg-rose-700 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="benefits"
              className="text-rose-200 data-[state=active]:bg-rose-700 data-[state=active]:text-white"
            >
              Benefits
            </TabsTrigger>
            <TabsTrigger
              value="research"
              className="text-rose-200 data-[state=active]:bg-rose-700 data-[state=active]:text-white"
            >
              Research Use
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-rose-200 data-[state=active]:bg-rose-700 data-[state=active]:text-white"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="elegant-card p-6">
              <h3 className="text-xl font-medium mb-3 text-gray-900">Product Overview</h3>
              <div className="text-gray-800 text-base leading-relaxed">
                {product.description.split("PubMed: ").map((part, index) => {
                  if (index === 0) {
                    return <span key={index}>{part}</span>
                  }
                  const linkMatch = part.match(/^(https?:\/\/[^\s]+)(.*)/)
                  if (linkMatch) {
                    return (
                      <span key={index}>
                        PubMed:{" "}
                        <a
                          href={linkMatch[1]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#d2c6b8] hover:text-[#ebe7e4] underline"
                        >
                          {linkMatch[1]}
                        </a>
                        {linkMatch[2]}
                      </span>
                    )
                  }
                  return <span key={index}>PubMed: {part}</span>
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="mt-6">
            <div className="elegant-card p-6">
              <h3 className="text-xl font-medium mb-4 text-gray-900">Potential Benefits</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-800">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="research" className="mt-6">
            <div className="elegant-card p-6">
              <h3 className="text-xl font-medium mb-4 text-gray-900">Scientific Use Cases</h3>
              <ul className="space-y-3 mb-6">
                {product.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-800">{useCase}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-rose-900 border border-rose-700 rounded-md p-4">
                <h4 className="text-base font-medium text-red-300 mb-2">Safety Disclaimer</h4>
                <p className="text-red-200 text-sm">DISCLAIMER: All products sold by Amino Rejuvenation are for research purposes only. These products are not intended for human consumption, diagnosis, treatment, cure, or prevention of any disease. Not for use in humans or animals.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="elegant-card p-6">
              <h3 className="text-xl font-medium mb-4 text-gray-900">Customer Reviews</h3>

              <div className="bg-rose-900 rounded-md p-4">
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-rose-300 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 font-medium text-white">5.0</span>
                </div>

                <p className="text-rose-200 italic mb-4">"{product.reviews.featured}"</p>
                <p className="text-sm text-rose-200">Verified Research Purchase</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
