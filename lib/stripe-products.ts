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
// UPDATED WITH SYNC RESULTS
export const STRIPE_PRICE_MAP = {
  oneTime: {
    "tirzepatide-15mg": "price_1Rm5DWAMQST6PhRYyAZpjtkU",
    "tirzepatide-30mg": "price_1Rm5DXAMQST6PhRYLxfSrz7G",
    "tirzepatide-60mg": "price_1Rm5DYAMQST6PhRYhrGKl9S5",
    "retatrutide-10mg": "price_1Rm5DZAMQST6PhRY611lwjsG",
    "retatrutide-20mg": "price_1Rm5DaAMQST6PhRYic3mJMoe",
    "retatrutide-30mg": "price_1Rm5DbAMQST6PhRYRHtX5qxC",
    "retatrutide-50mg": "price_1Rm5DcAMQST6PhRY5RZKytba",
    "semaglutide-5mg": "price_1Rm5DdAMQST6PhRYXVrSswQq",
    "semaglutide-10mg": "price_1Rm5DeAMQST6PhRYbtA0nnrt",
    "semaglutide-15mg": "price_1Rm5DfAMQST6PhRYNt3IobMR",
    "tesamorelin-10mg": "price_1Rm5DgAMQST6PhRY9RrJrSn1",
    "lipo-c-10ml-10mg": "price_1Rm5DhAMQST6PhRYGYyXFDay",
    "lipo-c-20ml-10mg": "price_1Rm5DiAMQST6PhRYzCteMstg",
    "ghk-cu-50mg": "price_1Rm5DjAMQST6PhRYd6I3mWZ7",
    "mt-1": "price_1Rm5DkAMQST6PhRYDcEcnbeb",
    "mt-2": "price_1Rm5DkAMQST6PhRYKfOAa4i7",
    "glow-50": "price_1Rm5DlAMQST6PhRYdNDiuts7",
    "glow-70": "price_1Rm5DmAMQST6PhRYAWTYMwzr",
    "bpc-157-5mg": "price_1Rm5DnAMQST6PhRYcL82dJ9U",
    "bpc-157-10mg": "price_1Rm5DoAMQST6PhRYiEo8wi3c",
    "tb-500-5mg": "price_1Rm5DpAMQST6PhRYceLkITlr",
    "tb-500-10mg": "price_1Rm5DpAMQST6PhRYi8W224BJ",
    "thymosin-alpha-1-5mg": "price_1Rm5DqAMQST6PhRYqIPHK0eI",
    "thymosin-alpha-1-10mg-recovery": "price_1Rm5DrAMQST6PhRYEoCJUAG8",
    "tb500-bpc157-combo": "price_1Rm5DrAMQST6PhRYkwoHeQAx",
    "cjc-1295-dac-2mg": "price_1Rm5DsAMQST6PhRY0bh6WjxX",
    "cjc-1295-dac-5mg": "price_1Rm5DtAMQST6PhRYVcWa7Jcp",
    "cjc-1295-no-dac-2mg": "price_1Rm5DuAMQST6PhRYH2Q2RsrV",
    "cjc-1295-no-dac-5mg": "price_1Rm5DuAMQST6PhRYKTDWSyYt",
    "ipamorelin-5mg": "price_1Rm5DvAMQST6PhRYrZqaiiHU",
    "sermorelin-10mg-muscle": "price_1Rm5DwAMQST6PhRYFQT3bMJS",
    "hcg-5000iu": "price_1Rm5DwAMQST6PhRYXxgF3dBN",
    "ghrp-2-5mg": "price_1Rm5DxAMQST6PhRYmU5OM954",
    "ghrp-6-5mg": "price_1Rm5DyAMQST6PhRYb3vkQ7PP",
    "epithalon-10mg": "price_1Rm5DzAMQST6PhRYjY2GgbQb",
    "mots-c-10mg-longevity": "price_1Rm5DzAMQST6PhRYD4hbvEPf",
    "pt-141-10mg": "price_1Rm5E0AMQST6PhRYzJIaacda",
    "nad-100mg": "price_1Rm5E1AMQST6PhRY2JEbjWCa",
    "dsip-5mg": "price_1Rm5E1AMQST6PhRYPzQhTYuz",
    "lean-clean-stack": "price_1RvJbzAMQST6PhRYAxYgpbLl",
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
