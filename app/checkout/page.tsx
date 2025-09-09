"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, CreditCard, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Crypto wallet addresses
const CRYPTO_WALLETS = {
  USDT: "0x8626B0C7C26f8Aa6Ba1AbE77Ae3dD14AA7698a61",
  ETH: "0x8626B0C7C26f8Aa6Ba1AbE77Ae3dD14AA7698a61", 
  BTC: "bc1phe9xfm9a5xan9ak6ns0qutq73mz7r9q27h3qjgpvn8sx83qsqausg9v6fc"
}

// Initialize Stripe with proper error handling
const getStripePromise = () => {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!publishableKey) {
      console.warn("Stripe publishable key not configured")
      return null
    }
    return loadStripe(publishableKey)
  } catch (error) {
    console.error("Failed to initialize Stripe:", error)
    return null
  }
}

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  address2: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  specialInstructions: string
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { items, total, clearCart } = useCart()

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    specialInstructions: "",
  })

  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card")
  const [selectedCrypto, setSelectedCrypto] = useState<"USDT" | "BTC" | "ETH">("USDT")
  const [transactionId, setTransactionId] = useState("")
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isStripeReady, setIsStripeReady] = useState(false)

  useEffect(() => {
    if (stripe && elements) {
      setIsStripeReady(true)
    }
  }, [stripe, elements])

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCryptoPayment = async () => {
    // Validate transaction ID
    if (!transactionId.trim()) {
      setError("Please enter your transaction ID.")
      return
    }

    try {
      const response = await fetch("/api/crypto-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderData: {
            items,
            customerInfo: formData,
            total,
            paymentMethod: "crypto",
            cryptocurrency: selectedCrypto,
            walletAddress: CRYPTO_WALLETS[selectedCrypto],
            transactionId: transactionId.trim(),
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      
      // Clear cart and redirect to success page
      clearCart()
      router.push(`/checkout/success?payment_method=crypto&crypto=${selectedCrypto}&tx_id=${transactionId}`)
    } catch (error) {
      console.error("Crypto payment error:", error)
      setError(error instanceof Error ? error.message : "Failed to process crypto payment")
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsProcessing(true)
    setError(null)

    // Validate disclaimer acceptance for all payments
    if (!disclaimerAccepted) {
      setError("Please accept the research disclaimer to complete your purchase.")
      setIsProcessing(false)
      return
    }

    // Handle crypto payment
    if (paymentMethod === "crypto") {
      await handleCryptoPayment()
      setIsProcessing(false)
      return
    }

    // Handle card payment
    if (!stripe || !elements) {
      setError("Payment processing is not available. Please refresh the page and try again.")
      setIsProcessing(false)
      return
    }

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === "pk_test_placeholder") {
      setError("Payment processing is not configured. Please contact support.")
      setIsProcessing(false)
      return
    }

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "usd",
          orderData: {
            items,
            customerInfo: formData,
            total,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const { clientSecret, error: serverError } = await response.json()

      if (serverError) {
        throw new Error(serverError)
      }

      if (!clientSecret) {
        throw new Error("No payment intent received from server")
      }

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        throw new Error("Card element not found")
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              line2: formData.address2 || undefined,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
              country: formData.country,
            },
          },
        },
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      if (paymentIntent?.status === "succeeded") {
        clearCart()
        router.push(`/checkout/success?payment_intent=${paymentIntent.id}`)
      }
    } catch (err) {
      console.error("Checkout error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 text-[#beb2a4] mx-auto mb-6" />
          <h2 className="text-2xl font-medium text-[#ebe7e4] mb-4">Your cart is empty</h2>
          <p className="text-[#beb2a4] mb-8">Add some products to your cart before checking out.</p>
          <Link href="/shop">
            <Button className="bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/shop" className="inline-flex items-center text-[#d2c6b8] hover:text-[#ebe7e4] transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>
        <h1 className="text-4xl font-serif font-medium mt-4 text-[#ebe7e4]">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="order-2 lg:order-1">
          <div className="elegant-card p-6 sticky top-8">
            <h2 className="text-2xl font-medium mb-6 text-[#ebe7e4]">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.purchaseType}`} className="flex items-center space-x-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-[#ebe7e4]">{item.name}</h3>
                    <p className="text-[#beb2a4] text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-[#d2c6b8]">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Separator className="bg-[#403c3a] mb-6" />

            <div className="space-y-3">
              <div className="flex justify-between text-[#beb2a4]">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#beb2a4]">
                <span>Shipping</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-[#beb2a4]">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <Separator className="bg-[#403c3a]" />
              <div className="flex justify-between text-xl font-medium text-[#ebe7e4]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="mt-6 pt-6 border-t border-[#403c3a]">
              <div className="flex items-center justify-center space-x-6 text-[#beb2a4]">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span className="text-xs">Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="order-1 lg:order-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="elegant-card p-6">
              <h3 className="text-xl font-medium mb-6 text-[#ebe7e4]">Contact Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Email Address *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="elegant-input"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">First Name *</label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Last Name *</label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="elegant-input"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="elegant-card p-6">
              <h3 className="text-xl font-medium mb-6 text-[#ebe7e4]">Shipping Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Address *</label>
                  <Input
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="elegant-input"
                    placeholder="123 Main St"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Address Line 2</label>
                  <Input
                    value={formData.address2}
                    onChange={(e) => handleInputChange("address2", e.target.value)}
                    className="elegant-input"
                    placeholder="Apt, Suite, Unit, Building, Floor, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">City *</label>
                    <Input
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">State *</label>
                    <Input
                      required
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">ZIP Code *</label>
                    <Input
                      required
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Country *</label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="elegant-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Special Instructions</label>
                  <Textarea
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                    className="elegant-input"
                    placeholder="Any special delivery instructions..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="elegant-card p-6">
              <h3 className="text-xl font-medium mb-6 text-[#ebe7e4]">Payment Information</h3>

              {/* Payment Method Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-[#ebe7e4]">Payment Method *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-[#d2c6b8] bg-[#d2c6b8]/10"
                        : "border-[#403c3a] bg-[#2a2624] hover:border-[#5a5651]"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 mx-auto mb-2 text-[#ebe7e4]" />
                    <div className="text-sm font-medium text-[#ebe7e4]">Pay by Card</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("crypto")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "crypto"
                        ? "border-[#d2c6b8] bg-[#d2c6b8]/10"
                        : "border-[#403c3a] bg-[#2a2624] hover:border-[#5a5651]"
                    }`}
                  >
                    <div className="h-6 w-6 mx-auto mb-2 text-[#ebe7e4] font-bold text-lg">₿</div>
                    <div className="text-sm font-medium text-[#ebe7e4]">Pay by Crypto</div>
                  </button>
                </div>
              </div>

              {/* Card Payment Section */}
              {paymentMethod === "card" && (
                <>
                  {!isStripeReady ? (
                    <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-md">
                      <p className="text-yellow-400 text-sm">Loading payment system...</p>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">Card Details *</label>
                      <div className="p-4 border border-[#403c3a] rounded-md bg-[#2a2624]">
                        <CardElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#ebe7e4",
                                "::placeholder": {
                                  color: "#beb2a4",
                                },
                              },
                              invalid: {
                                color: "#ef4444",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Crypto Payment Section */}
              {paymentMethod === "crypto" && (
                <div className="space-y-6">
                  {/* Cryptocurrency Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-[#ebe7e4]">Select Cryptocurrency *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["USDT", "BTC", "ETH"] as const).map((crypto) => (
                        <button
                          key={crypto}
                          type="button"
                          onClick={() => setSelectedCrypto(crypto)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedCrypto === crypto
                              ? "border-[#d2c6b8] bg-[#d2c6b8]/10"
                              : "border-[#403c3a] bg-[#2a2624] hover:border-[#5a5651]"
                          }`}
                        >
                          <div className="text-sm font-medium text-[#ebe7e4]">{crypto}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wallet Address Display */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">
                      Send {selectedCrypto} to this address:
                    </label>
                    <div className="p-4 border border-[#403c3a] rounded-md bg-[#2a2624]">
                      <div className="font-mono text-sm text-[#ebe7e4] break-all">
                        {CRYPTO_WALLETS[selectedCrypto]}
                      </div>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(CRYPTO_WALLETS[selectedCrypto])}
                        className="mt-2 text-xs text-[#d2c6b8] hover:text-[#beb2a4] underline"
                      >
                        Click to copy address
                      </button>
                    </div>
                  </div>

                  {/* Transaction ID Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#ebe7e4]">
                      Transaction ID *
                    </label>
                    <Input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Paste your transaction ID here"
                      className="bg-[#2a2624] border-[#403c3a] text-[#ebe7e4] placeholder:text-[#beb2a4]"
                      required
                    />
                    <p className="mt-1 text-xs text-[#beb2a4]">
                      After sending {selectedCrypto} to the address above, paste your transaction ID here.
                    </p>
                  </div>

                  {/* Crypto Payment Instructions */}
                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-md">
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Payment Instructions:</h4>
                    <ol className="text-xs text-blue-300 space-y-1">
                      <li>1. Copy the {selectedCrypto} wallet address above</li>
                      <li>2. Send exactly ${total.toFixed(2)} worth of {selectedCrypto} to that address</li>
                      <li>3. Copy your transaction ID from your wallet</li>
                      <li>4. Paste the transaction ID in the field above</li>
                      <li>5. Click "Complete Payment" to finish your order</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Research Disclaimer Checkbox */}
              <div className="mb-6 p-6 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="disclaimer"
                    checked={disclaimerAccepted}
                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#d2c6b8] bg-[#2a2624] border-[#403c3a] rounded focus:ring-[#d2c6b8] focus:ring-2"
                    required
                  />
                  <label htmlFor="disclaimer" className="text-sm text-amber-200 leading-relaxed">
                    <span className="font-medium text-amber-300">Required:</span> By checking this box I acknowledge that all products sold by Precision Peptides are intended for laboratory and research purposes only. They are not for human consumption, medical use, or diagnostic purposes. By purchasing, you acknowledge that you assume full responsibility for your own research practices. Precision Peptides shall not be held liable for any misuse, handling, or application of these products outside of their intended research use.
                  </label>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-md">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={
                  !disclaimerAccepted ||
                  (paymentMethod === "card" && !isStripeReady) || 
                  (paymentMethod === "crypto" && !transactionId.trim()) ||
                  isProcessing
                }
                className="w-full bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#201c1a] mr-2"></div>
                    {paymentMethod === "card" ? "Processing Payment..." : "Processing Crypto Payment..."}
                  </div>
                ) : (
                  `Complete ${paymentMethod === "card" ? "Card" : "Crypto"} Payment - $${total.toFixed(2)}`
                )}
              </Button>

              <p className="text-xs text-[#beb2a4] text-center mt-4">
                Your payment information is secure and encrypted. We never store your card details.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const [stripePromise, setStripePromise] = useState<any>(null)
  const [stripeError, setStripeError] = useState<string | null>(null)

  useEffect(() => {
    const initStripe = async () => {
      try {
        const promise = getStripePromise()
        if (promise) {
          setStripePromise(promise)
        } else {
          setStripeError("Payment processing is not configured")
        }
      } catch (error) {
        console.error("Failed to initialize Stripe:", error)
        setStripeError("Failed to load payment system")
      }
    }

    initStripe()
  }, [])

  if (stripeError) {
    return (
      <div className="min-h-screen bg-[#201c1a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-[#ebe7e4] mb-4">Payment System Unavailable</h1>
          <p className="text-[#beb2a4] mb-6">{stripeError}</p>
          <Link href="/shop">
            <Button className="bg-[#d2c6b8] hover:bg-[#beb2a4] text-[#201c1a] font-medium">
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!stripePromise) {
    return (
      <div className="min-h-screen bg-[#201c1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d2c6b8] mx-auto mb-4"></div>
          <p className="text-[#beb2a4]">Loading payment system...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#201c1a]">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}
