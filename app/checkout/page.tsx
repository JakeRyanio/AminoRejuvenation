"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Truck, Shield, ArrowLeft, CreditCard, Smartphone, DollarSign, X, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { CheckoutFormData } from "@/lib/types"

export default function CheckoutPage() {
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
    paymentMethod: "",
  })

  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCashAppQR, setShowCashAppQR] = useState(false)
  const [showVenmoQR, setShowVenmoQR] = useState(false)
  const [showPayPalQR, setShowPayPalQR] = useState(false)

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsProcessing(true)
    setError(null)

    // Validate payment method selection
    if (!formData.paymentMethod) {
      setError("Please select a payment method to complete your purchase.")
      setIsProcessing(false)
      return
    }

    // Validate disclaimer acceptance
    if (!disclaimerAccepted) {
        setError("Please accept the research disclaimer to complete your purchase.")
      setIsProcessing(false)
      return
    }

    try {
      // Send order to Zapier
      const orderData = {
        orderId: Date.now().toString(),
        customerEmail: formData.email,
        customerFirstName: formData.firstName,
        customerLastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        productNames: items.map(item => item.name).join(', '),
        totalAmount: total.toFixed(2),
        orderDate: new Date().toISOString(),
        specialInstructions: formData.specialInstructions
      }

      // Send to Zapier via API route (avoids CORS issues)
      console.log('Sending order data to Zapier:', orderData)
      
      const apiResponse = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })
      
      if (apiResponse.ok) {
        console.log('✅ Order sent to Zapier successfully')
        const responseData = await apiResponse.json()
        console.log('Zapier response:', responseData)
      } else {
        console.error('❌ Failed to send order to Zapier:', apiResponse.status, apiResponse.statusText)
      }

      // Continue with normal order processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      clearCart()
      router.push(`/checkout/success?order_id=${Date.now()}`)
    } catch (err) {
      console.error("Checkout error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 text-brand-600 mx-auto mb-6" />
          <h2 className="text-2xl font-medium text-brand-900 mb-4">Your cart is empty</h2>
          <p className="text-brand-700 mb-8">Add some products to your cart before checking out.</p>
          <Link href="/shop">
            <Button className="bg-brand-600 hover:bg-brand-700 text-white font-medium">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/shop" className="inline-flex items-center text-brand-600 hover:text-brand-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>
        <h1 className="text-4xl font-serif font-medium mt-4 text-brand-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="order-2 lg:order-1">
          <div className="elegant-card p-6 sticky top-8">
            <h2 className="text-2xl font-medium mb-6 text-brand-900">Order Summary</h2>

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
                    <h3 className="font-medium text-brand-800">{item.name}</h3>
                    <p className="text-brand-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-brand-700">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Separator className="bg-brand-200 mb-6" />

            <div className="space-y-3">
              <div className="flex justify-between text-brand-700">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-700">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-brand-700">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <Separator className="bg-brand-200" />
              <div className="flex justify-between text-xl font-medium text-brand-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="mt-6 pt-6 border-t border-brand-200">
              <div className="flex items-center justify-center space-x-6 text-brand-600">
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
              <h3 className="text-xl font-medium mb-6 text-brand-900">Contact Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-800">Email Address *</label>
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
                    <label className="block text-sm font-medium mb-2 text-brand-800">First Name *</label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-brand-800">Last Name *</label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-800">Phone Number</label>
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
              <h3 className="text-xl font-medium mb-6 text-brand-900">Shipping Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-800">Address *</label>
                  <Input
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="elegant-input"
                    placeholder="123 Main St"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-800">Address Line 2</label>
                  <Input
                    value={formData.address2}
                    onChange={(e) => handleInputChange("address2", e.target.value)}
                    className="elegant-input"
                    placeholder="Apt, Suite, Unit, Building, Floor, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-brand-800">City *</label>
                    <Input
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-brand-800">State *</label>
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
                    <label className="block text-sm font-medium mb-2 text-brand-800">ZIP Code *</label>
                    <Input
                      required
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="elegant-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-brand-800">Country *</label>
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
                  <label className="block text-sm font-medium mb-2 text-brand-800">Special Instructions</label>
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
              <h3 className="text-xl font-medium mb-6 text-brand-900">Payment Information</h3>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-4 text-brand-800">Select Payment Method *</label>
                <div className="grid grid-cols-1 gap-3">
                  {/* PayPal Option */}
                  <div
                    className={`elegant-card p-4 cursor-pointer transition-all duration-200 border-2 ${
                      formData.paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-50"
                        : "border-brand-200 hover:border-brand-300"
                    }`}
                    onClick={() => {
                      handleInputChange("paymentMethod", "paypal")
                      setShowPayPalQR(true)
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          formData.paymentMethod === "paypal" ? "border-blue-500 bg-blue-500" : "border-brand-300"
                        }`}
                      >
                        {formData.paymentMethod === "paypal" && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="font-medium text-brand-800">PayPal</span>
                          <p className="text-sm text-brand-600">Pay securely with your PayPal account</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CashApp Option */}
                  <div
                    className={`elegant-card p-4 cursor-pointer transition-all duration-200 border-2 ${
                      formData.paymentMethod === "cashapp"
                        ? "border-green-500 bg-green-50"
                        : "border-brand-200 hover:border-brand-300"
                    }`}
                    onClick={() => {
                      handleInputChange("paymentMethod", "cashapp")
                      setShowCashAppQR(true)
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          formData.paymentMethod === "cashapp" ? "border-green-500 bg-green-500" : "border-brand-300"
                        }`}
                      >
                        {formData.paymentMethod === "cashapp" && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="font-medium text-brand-800">CashApp</span>
                          <p className="text-sm text-brand-600">Send payment via CashApp</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Venmo Option */}
                  <div
                    className={`elegant-card p-4 cursor-pointer transition-all duration-200 border-2 ${
                      formData.paymentMethod === "venmo"
                        ? "border-blue-500 bg-blue-50"
                        : "border-brand-200 hover:border-brand-300"
                    }`}
                    onClick={() => {
                      handleInputChange("paymentMethod", "venmo")
                      setShowVenmoQR(true)
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          formData.paymentMethod === "venmo" ? "border-blue-500 bg-blue-500" : "border-brand-300"
                        }`}
                      >
                        {formData.paymentMethod === "venmo" && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                          <Smartphone className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="font-medium text-brand-800">Venmo</span>
                          <p className="text-sm text-brand-600">Pay with Venmo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Payment Processing</h4>
                <p className="text-sm text-blue-700">
                  After selecting your payment method, you'll be redirected to complete your payment securely.
                </p>
              </div>

              {/* Wellness Disclaimer Checkbox */}
              <div className="mb-6 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="disclaimer"
                    checked={disclaimerAccepted}
                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 text-brand-600 bg-white border-brand-300 rounded focus:ring-brand-500 focus:ring-2"
                    required
                  />
                  <label htmlFor="disclaimer" className="text-sm text-amber-800 leading-relaxed">
                    <span className="font-medium text-amber-900">Required:</span> By checking this box I acknowledge that all products sold by Amino Rejuvenation are for research purposes only. These products are not intended for human consumption, diagnosis, treatment, cure, or prevention of any disease. Not for use in humans or animals.
                  </label>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={!disclaimerAccepted || !formData.paymentMethod || isProcessing}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Order...
                  </div>
                ) : formData.paymentMethod ? (
                  `Pay with ${formData.paymentMethod.charAt(0).toUpperCase() + formData.paymentMethod.slice(1)} - $${total.toFixed(2)}`
                ) : (
                  `Complete Order - $${total.toFixed(2)}`
                )}
              </Button>

              <p className="text-xs text-brand-600 text-center mt-4">
                Your information is secure and encrypted. We never store your payment details.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* CashApp QR Code Modal */}
      {showCashAppQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowCashAppQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Scan to Pay with Cash App</h3>
              <p className="text-gray-600 mb-6">Use your Cash App to scan the QR code below</p>
              
              {/* QR Code */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-6 inline-block">
                <img
                  src={`/images/cashapp-qr.png?t=${Date.now()}`}
                  alt="CashApp QR Code"
                  className="w-48 h-48 object-contain rounded-lg"
                  onError={(e) => {
                    // Show fallback if image fails to load
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center hidden">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-1">QR Code Image</p>
                    <p className="text-xs text-red-500">Please upload cashapp-qr.png</p>
                    <p className="text-xs text-gray-400 mt-1">File should be &gt; 0 bytes</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-6">$aminorejuvenation</p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-red-800 mb-2">⚠️ IMPORTANT NOTE:</h4>
                  <p className="text-sm text-red-700">
                    Please add your <strong>FULL NAME MATCHING CART CHECKOUT</strong> to the note for payment on CashApp. 
                    This ensures we can match your payment to your order.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Order Total:</p>
                  <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <Button
                  onClick={() => setShowCashAppQR(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowCashAppQR(false)
                    // Here you would typically redirect to CashApp or handle the payment
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  I've Sent Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Venmo QR Code Modal */}
      {showVenmoQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowVenmoQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay with Venmo</h3>
              <p className="text-gray-600 mb-6">Use your Venmo app to scan the QR code below</p>
              
              {/* QR Code */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-6 inline-block">
                <img
                  src={`/images/venmo-qr.png?t=${Date.now()}`}
                  alt="Venmo QR Code"
                  className="w-48 h-48 object-contain rounded-lg"
                  onError={(e) => {
                    // Show fallback if image fails to load
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center hidden">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-1">QR Code Image</p>
                    <p className="text-xs text-red-500">Please upload venmo-qr.png</p>
                    <p className="text-xs text-gray-400 mt-1">File should be &gt; 0 bytes</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 mb-6">@aminorejuvenations</p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-red-800 mb-2">⚠️ IMPORTANT NOTE:</h4>
                  <p className="text-sm text-red-700">
                    Please add your <strong>FULL NAME MATCHING CART CHECKOUT</strong> to the note for payment on Venmo. 
                    This ensures we can match your payment to your order.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Order Total:</p>
                  <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <Button
                  onClick={() => setShowVenmoQR(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowVenmoQR(false)
                    // Here you would typically redirect to Venmo or handle the payment
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  I've Sent Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PayPal QR Code Modal */}
      {showPayPalQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowPayPalQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay with PayPal</h3>
              <p className="text-gray-600 mb-6">Use your PayPal app to scan the QR code below</p>
              
              {/* QR Code */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-6 inline-block">
                <img
                  src={`/images/paypal-qr.png?t=${Date.now()}`}
                  alt="PayPal QR Code"
                  className="w-48 h-48 object-contain rounded-lg"
                  onError={(e) => {
                    // Show fallback if image fails to load
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center hidden">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-1">QR Code Image</p>
                    <p className="text-xs text-red-500">Please upload paypal-qr.png</p>
                    <p className="text-xs text-gray-400 mt-1">File should be &gt; 0 bytes</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 mb-6">aminorejuvenation@gmail.com</p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-red-800 mb-2">⚠️ IMPORTANT NOTE:</h4>
                  <p className="text-sm text-red-700">
                    Please add your <strong>FULL NAME MATCHING CART CHECKOUT</strong> to the note for payment on PayPal. 
                    This ensures we can match your payment to your order.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Order Total:</p>
                  <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <Button
                  onClick={() => setShowPayPalQR(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowPayPalQR(false)
                    // Here you would typically redirect to PayPal or handle the payment
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  I've Sent Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}