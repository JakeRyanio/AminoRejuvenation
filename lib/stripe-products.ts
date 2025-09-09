// Enhanced Stripe product management with subscription support

export interface StripeProductData {
  id: string
  name: string
  price: number
  subscriptionPrice: number
  stripeProductId?: string
  oneTimePriceId?: string
  subscriptionPriceId?: string
}

// Map local product IDs to Stripe price IDs
// UPDATED WITH RE-SYNC RESULTS - ALL PRODUCTS NOW PROPERLY MAPPED
export const STRIPE_PRICE_MAP = {
  oneTime: {
    "tirzepatide-15mg": "price_1S5VtlAMQST6PhRY6YhYKaGf",
    "tirzepatide-30mg": "price_1S5VtnAMQST6PhRYJ6gBas1U",
    "tirzepatide-60mg": "price_1S5VtpAMQST6PhRYCC0V9cJX",
    "retatrutide-10mg": "price_1S5VtrAMQST6PhRYu5R6tFZx",
    "retatrutide-20mg": "price_1S5VttAMQST6PhRYl08isJ82",
    "retatrutide-30mg": "price_1S5VtvAMQST6PhRYBiPLrwjF",
    "retatrutide-50mg": "price_1S5VtxAMQST6PhRYfd5cRKlM",
    "lean-clean-stack": "price_1S5VtzAMQST6PhRYhX0X8LCu",
    "semaglutide-5mg": "price_1S5Vu1AMQST6PhRYwtZ7y254",
    "semaglutide-10mg": "price_1S5Vu3AMQST6PhRYV3U5C0iv",
    "semaglutide-15mg": "price_1S5Vu6AMQST6PhRYTmjEkQm0",
    "tesamorelin-10mg": "price_1S5Vu8AMQST6PhRYJF0Zzv5g",
    "lipo-c-10ml-10mg": "price_1S5VuAAMQST6PhRYT0aimiMn",
    "lipo-c-20ml-10mg": "price_1S5VuCAMQST6PhRYAxXcYG5i",
    "ghk-cu-50mg": "price_1S5VuEAMQST6PhRYTbnNV3c8",
    "mt-1": "price_1S5VuGAMQST6PhRYIwU1vCig",
    "mt-2": "price_1S5VuIAMQST6PhRYLSev6kKI",
    "glow-50": "price_1S5VuKAMQST6PhRYBaylNHB8",
    "glow-70": "price_1S5VuMAMQST6PhRYOHJ92qHj",
    "bpc-157-5mg": "price_1S5VuOAMQST6PhRY0qhYquHL",
    "bpc-157-10mg": "price_1S5VuQAMQST6PhRY5TYXwBlQ",
    "tb-500-5mg": "price_1S5VuSAMQST6PhRY7Y6wetVF",
    "tb-500-10mg": "price_1S5VuUAMQST6PhRY4Rfqo5qp",
    "thymosin-alpha-1-5mg": "price_1S5VuWAMQST6PhRYLgwQjFiy",
    "thymosin-alpha-1-10mg-recovery": "price_1S5VuYAMQST6PhRYHqbdWRcK",
    "tb500-bpc157-combo": "price_1S5VuaAMQST6PhRYQIbJsRQa",
    "cjc-1295-dac-2mg": "price_1S5VucAMQST6PhRYQc1zZ5vz",
    "cjc-1295-dac-5mg": "price_1S5VueAMQST6PhRYmPcq5WJz",
    "cjc-1295-no-dac-2mg": "price_1S5VugAMQST6PhRYn0ho6Ugd",
    "cjc-1295-no-dac-5mg": "price_1S5VuiAMQST6PhRYqSdMkTVV",
    "ipamorelin-5mg": "price_1S5VukAMQST6PhRYSHHmybKC",
    "sermorelin-10mg-muscle": "price_1S5VumAMQST6PhRY6uaUPdtS",
    "hcg-5000iu": "price_1S5VuoAMQST6PhRYzO7E6wZC",
    "ghrp-2-5mg": "price_1S5VupAMQST6PhRYcCsQg065",
    "ghrp-6-5mg": "price_1S5VusAMQST6PhRY0U5fKRyW",
    "epithalon-10mg": "price_1S5VutAMQST6PhRYTrquhA9Q",
    "mots-c-10mg-longevity": "price_1S5VuvAMQST6PhRYYPTpNJR2",
    "pt-141-10mg": "price_1S5VuxAMQST6PhRYmLoGBaLF",
    "nad-100mg": "price_1S5VuzAMQST6PhRYug0Zhh9L",
    "dsip-5mg": "price_1S5Vv1AMQST6PhRYasacETUU",
  },
  subscription: {
    "tirzepatide-15mg": "price_1Rm5DWAMQST6PhRY1Hq2j2no",
    "tirzepatide-30mg": "price_1Rm5DXAMQST6PhRYiEPAZsgC",
    "tirzepatide-60mg": "price_1Rm5DYAMQST6PhRYdxwKEOPE",
    "retatrutide-10mg": "price_1Rm5DZAMQST6PhRY1xlEgy52",
    "retatrutide-20mg": "price_1Rm5DaAMQST6PhRYaXV0AA1a",
    "retatrutide-30mg": "price_1Rm5DbAMQST6PhRYygb5Cnxu",
    "retatrutide-50mg": "price_1Rm5DcAMQST6PhRY5ON9RZto",
    "semaglutide-5mg": "price_1Rm5DdAMQST6PhRYRIL898vY",
    "semaglutide-10mg": "price_1Rm5DeAMQST6PhRY50d4tTqk",
    "semaglutide-15mg": "price_1Rm5DfAMQST6PhRYbrvzs9J8",
    "tesamorelin-10mg": "price_1Rm5DgAMQST6PhRYR8634pgc",
    "lipo-c-10ml-10mg": "price_1Rm5DhAMQST6PhRYNh7n3rG0",
    "lipo-c-20ml-10mg": "price_1Rm5DiAMQST6PhRY9Dy9SW9r",
    "ghk-cu-50mg": "price_1Rm5DjAMQST6PhRYPZY1GOwD",
    "mt-1": "price_1Rm5DkAMQST6PhRYTOt40DcR",
    "mt-2": "price_1Rm5DlAMQST6PhRYRpRevbBD",
    "glow-50": "price_1Rm5DmAMQST6PhRYHrOm8HnZ",
    "glow-70": "price_1Rm5DnAMQST6PhRYFfO0vPoO",
    "bpc-157-5mg": "price_1Rm5DoAMQST6PhRYjA93MYmw",
    "bpc-157-10mg": "price_1Rm5DoAMQST6PhRYWZoOamUp",
    "tb-500-5mg": "price_1Rm5DpAMQST6PhRYC0m7CBIg",
    "tb-500-10mg": "price_1Rm5DqAMQST6PhRY9nPEPkKO",
    "thymosin-alpha-1-5mg": "price_1Rm5DqAMQST6PhRYLJb8G0BS",
    "thymosin-alpha-1-10mg-recovery": "price_1Rm5DrAMQST6PhRYY1zCMR6x",
    "tb500-bpc157-combo": "price_1Rm5DsAMQST6PhRYZbTtNMH4",
    "cjc-1295-dac-2mg": "price_1Rm5DsAMQST6PhRYcwU4vgzX",
    "cjc-1295-dac-5mg": "price_1Rm5DtAMQST6PhRYETK0KPjq",
    "cjc-1295-no-dac-2mg": "price_1Rm5DuAMQST6PhRY1MdTQkYZ",
    "cjc-1295-no-dac-5mg": "price_1Rm5DuAMQST6PhRYriIlShg0",
    "ipamorelin-5mg": "price_1Rm5DvAMQST6PhRY5OksWzHc",
    "sermorelin-10mg-muscle": "price_1Rm5DwAMQST6PhRY4zIhWvfj",
    "hcg-5000iu": "price_1Rm5DxAMQST6PhRYtpcyH9eV",
    "ghrp-2-5mg": "price_1Rm5DxAMQST6PhRYwxp3JChT",
    "ghrp-6-5mg": "price_1Rm5DyAMQST6PhRYJQRN80DJ",
    "epithalon-10mg": "price_1Rm5DzAMQST6PhRYBgOpa4zu",
    "mots-c-10mg-longevity": "price_1Rm5DzAMQST6PhRY0nEeRqv6",
    "pt-141-10mg": "price_1Rm5E0AMQST6PhRYj1aQtfwo",
    "nad-100mg": "price_1Rm5E1AMQST6PhRYTVKaAwV9",
    "dsip-5mg": "price_1Rm5E2AMQST6PhRYLLSAadsN",
  },
}

export async function getStripeProductInfo(productId: string, purchaseType: "one-time" | "subscription") {
  const priceMapKey = purchaseType === "one-time" ? "oneTime" : "subscription"
  const priceMap = STRIPE_PRICE_MAP[priceMapKey]
  const stripePriceId = (priceMap as any)[productId]

  if (!stripePriceId) {
    console.warn(`No Stripe price ID found for product: ${productId} (${purchaseType})`)
    return null
  }

  try {
    const response = await fetch(`https://api.stripe.com/v1/prices/${stripePriceId}?expand[]=product`, {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error("Error fetching Stripe product info:", error)
  }

  return null
}

export function createLineItemsFromCart(cartItems: any[]) {
  return cartItems.map((item) => {
    const purchaseType = item.purchaseType || "one-time"
    const priceMapKey = purchaseType === "one-time" ? "oneTime" : "subscription"
    const priceMap = STRIPE_PRICE_MAP[priceMapKey]
    const stripePriceId = (priceMap as any)[item.id]

    if (!stripePriceId) {
      throw new Error(`No Stripe price ID found for product: ${item.id} (${purchaseType})`)
    }

    return {
      price: stripePriceId,
      quantity: item.quantity,
    }
  })
}

export function getProductPriceId(productId: string, purchaseType: "one-time" | "subscription") {
  const priceMapKey = purchaseType === "one-time" ? "oneTime" : "subscription"
  const priceMap = STRIPE_PRICE_MAP[priceMapKey]
  return (priceMap as any)[productId]
}
