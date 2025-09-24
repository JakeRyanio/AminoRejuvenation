"use client"

import { X, Minus, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, total } = useCart()
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  // Debounced quantity update to prevent rapid clicking issues
  const handleQuantityUpdate = useCallback((productId: string, purchaseType: string, newQuantity: number) => {
    const itemKey = `${productId}-${purchaseType}`
    
    // Prevent rapid updates
    if (updatingItems.has(itemKey)) return
    
    setUpdatingItems(prev => new Set(prev).add(itemKey))
    
    // Small delay to prevent rapid clicking
    setTimeout(() => {
      updateQuantity(productId, purchaseType, newQuantity)
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemKey)
        return newSet
      })
    }, 100)
  }, [updateQuantity, updatingItems])

  const handleRemoveItem = useCallback((productId: string, purchaseType: string) => {
    const itemKey = `${productId}-${purchaseType}`
    
    // Prevent removal while updating
    if (updatingItems.has(itemKey)) return
    
    removeItem(productId, purchaseType)
  }, [removeItem, updatingItems])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-brand-50 border-l border-brand-200 shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-brand-200">
            <h2 className="text-lg font-medium text-brand-900">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-brand-700 hover:bg-brand-100">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-brand-700 mt-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const itemKey = `${item.id}-${item.purchaseType}`
                  const isUpdating = updatingItems.has(itemKey)
                  
                  return (
                    <div key={itemKey} className="flex items-center space-x-4 elegant-card p-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium text-brand-900">{item.name}</h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-brand-700 font-medium">${item.price.toFixed(2)}</p>
                          {false && (
                            <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">Monthly</span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={isUpdating}
                            className="h-8 w-8 border-brand-300 text-brand-700 hover:bg-brand-100 bg-transparent disabled:opacity-50"
                            onClick={() => handleQuantityUpdate(item.id, item.purchaseType, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="w-8 text-center text-brand-900">
                            {isUpdating ? "..." : item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            disabled={isUpdating}
                            className="h-8 w-8 border-brand-300 text-brand-700 hover:bg-brand-100 bg-transparent disabled:opacity-50"
                            onClick={() => handleQuantityUpdate(item.id, item.purchaseType, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={isUpdating}
                            onClick={() => handleRemoveItem(item.id, item.purchaseType)}
                            className="text-red-600 hover:text-red-700 hover:bg-brand-100 disabled:opacity-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-brand-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-brand-900">Total:</span>
                <span className="text-xl font-medium text-brand-700">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" onClick={onClose}>
                <Button className="w-full bg-brand-500 hover:bg-brand-600 text-brand-50 font-medium rounded-md py-3">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
