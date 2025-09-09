import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { orderData } = await request.json()

    // Validate required fields
    if (!orderData.transactionId || !orderData.cryptocurrency || !orderData.walletAddress) {
      return NextResponse.json({ 
        error: "Missing required crypto payment information" 
      }, { status: 400 })
    }

    // Here you could add additional validation:
    // - Verify transaction on blockchain (requires blockchain API integration)
    // - Check if transaction amount matches order total
    // - Validate wallet address format
    
    // For now, we'll just log the crypto payment and send to webhook
    console.log("Crypto payment received:", {
      cryptocurrency: orderData.cryptocurrency,
      transactionId: orderData.transactionId,
      walletAddress: orderData.walletAddress,
      total: orderData.total,
      customerEmail: orderData.customerInfo.email
    })

    // Send order data to webhook (Zapier) for processing
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...orderData,
            orderId: `crypto_${Date.now()}`,
            paymentStatus: "pending_verification",
            createdAt: new Date().toISOString(),
          }),
        })

        if (!webhookResponse.ok) {
          console.error("Webhook failed:", webhookResponse.status, webhookResponse.statusText)
        } else {
          console.log("Order sent to webhook successfully")
        }
      } catch (webhookError) {
        console.error("Webhook error:", webhookError)
      }
    }

    return NextResponse.json({
      success: true,
      orderId: `crypto_${Date.now()}`,
      message: "Crypto payment received. Your order will be processed once the transaction is verified."
    })
  } catch (error) {
    console.error("Error processing crypto payment:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to process crypto payment" 
    }, { status: 500 })
  }
}


