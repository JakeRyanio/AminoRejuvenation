"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CheckoutTestPage() {
  return (
    <div className="min-h-screen bg-[#201c1a] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-2xl font-medium text-[#ebe7e4] mb-4">Checkout Test Page</h1>
        <p className="text-[#beb2a4] mb-6">
          This is a simple test page to verify the checkout route works without complex dependencies.
        </p>
        <div className="space-y-3">
          <Link href="/shop">
            <Button className="bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium w-full">
              Go to Shop
            </Button>
          </Link>
          <Link href="/checkout">
            <Button variant="outline" className="w-full border-[#403c3a] text-[#ebe7e4] hover:bg-[#403c3a]">
              Try Full Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 