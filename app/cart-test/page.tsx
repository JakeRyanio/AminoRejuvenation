"use client"

import React, { useState } from "react"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"

export default function CartTestPage() {
  const { items, addItem, removeItem, total } = useCart()
  const [error, setError] = useState<string | null>(null)

  const testItem = {
    id: "test-product",
    name: "Test Product",
    price: 29.99,
    image: "/placeholder.svg",
    purchaseType: "one-time" as const
  }

  const handleAddItem = () => {
    try {
      addItem(testItem)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }

  const handleRemoveItem = () => {
    try {
      if (items.length > 0) {
        removeItem(items[0].id, items[0].purchaseType)
        setError(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }

  return (
    <div className="min-h-screen bg-[#201c1a] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-2xl font-medium text-[#ebe7e4] mb-4">Cart Test Page</h1>
        
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-[#2a2624] rounded-md">
            <h2 className="font-medium text-[#ebe7e4] mb-2">Cart Status:</h2>
            <div className="text-[#beb2a4] text-sm">
              <div>Items in cart: {items.length}</div>
              <div>Total: ${total.toFixed(2)}</div>
            </div>
          </div>

          {items.length > 0 && (
            <div className="p-4 bg-[#2a2624] rounded-md">
              <h3 className="font-medium text-[#ebe7e4] mb-2">Cart Items:</h3>
              {items.map((item, index) => (
                <div key={index} className="text-[#beb2a4] text-sm">
                  {item.name} - Qty: {item.quantity} - ${item.price}
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-md">
              <p className="text-red-400 text-sm">Error: {error}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleAddItem}
            className="bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium w-full"
          >
            Add Test Item
          </Button>
          
          {items.length > 0 && (
            <Button
              onClick={handleRemoveItem}
              variant="outline"
              className="w-full border-[#403c3a] text-[#ebe7e4] hover:bg-[#403c3a]"
            >
              Remove First Item
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 