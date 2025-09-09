import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY
    
    if (!stripeKey) {
      return NextResponse.json({
        error: "STRIPE_SECRET_KEY not found",
        status: "error"
      })
    }

    // Test the API key by making a simple request
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2024-06-20",
    })

    // Try to list products to test the key
    const products = await stripe.products.list({ limit: 1 })
    
    return NextResponse.json({
      status: "success",
      message: "Stripe API key is valid",
      keyPrefix: stripeKey.substring(0, 7) + "...",
      productsFound: products.data.length
    })
  } catch (error) {
    console.error("Stripe test error:", error)
    
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      keyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) + "..." || "NOT_SET"
    })
  }
}
