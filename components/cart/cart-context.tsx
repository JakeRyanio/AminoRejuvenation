"use client"

import React, { createContext, useContext, useReducer, useState, useCallback, type ReactNode } from "react"
import type { CartItem, CartState, CartAction } from "@/lib/types"

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (productId: string, purchaseType: string) => void
  updateQuantity: (productId: string, purchaseType: string, quantity: number) => void
  clearCart: () => void
  total: number
  // Popup state
  isPopupOpen: boolean
  popupItem: CartItem | null
  showPopup: (item: CartItem) => void
  hidePopup: () => void
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Check if item already exists with same ID and purchase type
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.purchaseType === action.payload.purchaseType,
      )

      if (existingItem) {
        // Update quantity of existing item
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id && item.purchaseType === action.payload.purchaseType
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      } else {
        // Add new item
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        return {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => !(item.id === action.payload.productId && item.purchaseType === action.payload.purchaseType),
      )
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }

    case "UPDATE_QUANTITY": {
      const { productId, purchaseType, quantity } = action.payload
      
      // Validate quantity
      const validQuantity = Math.max(0, Math.min(quantity, 99)) // Limit to 99 max
      
      const updatedItems = state.items
        .map((item) =>
          item.id === productId && item.purchaseType === purchaseType
            ? { ...item, quantity: validQuantity }
            : item,
        )
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity

      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }

    case "CLEAR_CART":
      return { items: [], total: 0 }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupItem, setPopupItem] = useState<CartItem | null>(null)

  const showPopup = useCallback((item: CartItem) => {
    setPopupItem(item)
    setIsPopupOpen(true)
  }, [])

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    // Validate item data
    if (!item.id || !item.name || item.price <= 0) {
      console.error("Invalid item data:", item)
      return
    }
    
    dispatch({ type: "ADD_ITEM", payload: item })
    
    // Show popup with the added item
    const cartItem: CartItem = { ...item, quantity: 1 }
    showPopup(cartItem)
  }, [showPopup])

  const hidePopup = useCallback(() => {
    setIsPopupOpen(false)
    setPopupItem(null)
  }, [])

  const removeItem = useCallback((productId: string, purchaseType: string) => {
    if (!productId || !purchaseType) {
      console.error("Invalid remove item parameters:", { productId, purchaseType })
      return
    }
    
    dispatch({ type: "REMOVE_ITEM", payload: { productId, purchaseType } })
  }, [])

  const updateQuantity = useCallback((productId: string, purchaseType: string, quantity: number) => {
    if (!productId || !purchaseType || quantity < 0) {
      console.error("Invalid update quantity parameters:", { productId, purchaseType, quantity })
      return
    }
    
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, purchaseType, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [])

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total: state.total,
        // Popup state
        isPopupOpen,
        popupItem,
        showPopup,
        hidePopup,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
