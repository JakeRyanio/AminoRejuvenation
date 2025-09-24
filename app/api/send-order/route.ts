import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // Send to Zapier webhook
    const zapierResponse = await fetch(process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    
    if (zapierResponse.ok) {
      const responseData = await zapierResponse.json()
      return NextResponse.json({ success: true, data: responseData })
    } else {
      console.error('Zapier webhook failed:', zapierResponse.status, zapierResponse.statusText)
      return NextResponse.json({ success: false, error: 'Zapier webhook failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error sending order to Zapier:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
