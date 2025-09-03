import { NextResponse } from "next/server"

export async function GET() {
  const envVars = {
    hasStripePublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
    publishableKeyPrefix: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10) || "NOT_SET",
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "NOT_SET"
  }

  return NextResponse.json(envVars)
}
