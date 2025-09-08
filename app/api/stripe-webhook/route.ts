import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      console.error("No Stripe signature found")
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured")
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("Stripe webhook received:", event.type)

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      console.log("Processing completed checkout session:", session.id)

      // Get session with line items for complete order data
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "line_items.data.price.product"]
      })

      // Format order data for Zapier
      const orderData = {
        orderId: session.metadata?.orderId || `stripe_${session.id}`,
        paymentMethod: "stripe",
        paymentStatus: "completed",
        createdAt: new Date().toISOString(),
        
        // Customer info
        customerInfo: {
          email: session.customer_details?.email || session.customer_email,
          name: session.customer_details?.name || session.metadata?.customerName,
          phone: session.customer_details?.phone,
        },

        // Shipping address
        shippingAddress: (session as any).shipping_details?.address ? {
          line1: (session as any).shipping_details.address.line1,
          line2: (session as any).shipping_details.address.line2,
          city: (session as any).shipping_details.address.city,
          state: (session as any).shipping_details.address.state,
          postal_code: (session as any).shipping_details.address.postal_code,
          country: (session as any).shipping_details.address.country,
        } : null,

        // Billing address
        billingAddress: session.customer_details?.address ? {
          line1: session.customer_details.address.line1,
          line2: session.customer_details.address.line2,
          city: session.customer_details.address.city,
          state: session.customer_details.address.state,
          postal_code: session.customer_details.address.postal_code,
          country: session.customer_details.address.country,
        } : null,

        // Order totals
        totals: {
          subtotal: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
          tax: session.total_details?.amount_tax ? session.total_details.amount_tax / 100 : 0,
          shipping: session.total_details?.amount_shipping ? session.total_details.amount_shipping / 100 : 0,
          total: session.amount_total ? session.amount_total / 100 : 0,
        },

        // Line items
        items: sessionWithLineItems.line_items?.data.map(item => ({
          id: item.price?.product ? 
            (typeof item.price.product === 'string' ? item.price.product : item.price.product.id) : 
            'unknown',
          name: item.description,
          quantity: item.quantity,
          price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
          total: item.amount_total / 100,
        })) || [],

        // Stripe specific data
        stripeData: {
          sessionId: session.id,
          paymentIntentId: session.payment_intent,
          subscriptionId: session.subscription,
          mode: session.mode,
        },
      }

      // Send to Zapier webhook
      if (process.env.ZAPIER_WEBHOOK_URL) {
        try {
          const webhookResponse = await fetch(process.env.ZAPIER_WEBHOOK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          })

          if (!webhookResponse.ok) {
            console.error("Zapier webhook failed:", webhookResponse.status, webhookResponse.statusText)
          } else {
            console.log("Order sent to Zapier successfully")
          }
        } catch (webhookError) {
          console.error("Zapier webhook error:", webhookError)
        }
      } else {
        console.warn("ZAPIER_WEBHOOK_URL not configured - order not sent to Zapier")
      }
    }

    // Handle payment_intent.succeeded for additional processing if needed
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("Payment intent succeeded:", paymentIntent.id)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Stripe webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
