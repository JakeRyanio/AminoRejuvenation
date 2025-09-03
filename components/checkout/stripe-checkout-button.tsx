"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  specialInstructions: string
}

interface StripeCheckoutButtonProps {
  formData: CheckoutFormData
  isFormValid: boolean
}

export function StripeCheckoutButton({ formData, isFormValid }: StripeCheckoutButtonProps) {
  const { items, total, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (!isFormValid) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderData: {
            items,
            customerInfo: formData,
            total,
          },
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={!isFormValid || isLoading || items.length === 0}
      className="w-full bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium py-6 text-lg"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#201c1a] mr-2"></div>
          Redirecting to Checkout...
        </div>
      ) : (
        `Proceed to Payment - $${total.toFixed(2)}`
      )}
    </Button>
  )
}
