# All Orders Integration Setup (Stripe + Crypto)

## Overview
ALL orders from your website (both Stripe and cryptocurrency payments) are now automatically sent to your Zapier webhook. The system sends structured order data that clearly identifies the payment method used.

## Order Data Structure
ALL orders (Stripe and Crypto) are sent to your webhook with this structure:

```json
{
  "orderId": "STRIPE-1234567890-ABC123" or "CRYPTO-1234567890-ABC123",
  "orderSource": "website",
  "paymentMethod": "stripe" or "cryptocurrency",
  "customerInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "customer@email.com",
    "phone": "555-1234"
  },
  "shippingAddress": {
    "line1": "123 Main St",
    "line2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "items": [
    {
      "productId": "tirzepatide-15mg",
      "name": "Tirzepatide 15mg",
      "quantity": 2,
      "price": 189,
      "subtotal": 378,
      "purchaseType": "oneTime"
    }
  ],
  "totals": {
    "subtotal": 378,
    "shipping": 0,
    "tax": 0,
    "total": 378
  },
  "stripePaymentDetails": {
    "sessionId": "cs_test_...",
    "paymentIntentId": "pi_...",
    "subscriptionId": "sub_...", // if subscription
    "paymentStatus": "paid",
    "mode": "payment" or "subscription"
  },
  "cryptoPaymentDetails": {
    "cryptocurrency": "BTC",
    "transactionId": "abc123xyz789...",
    "walletAddress": "bc1q4utg2zy0523ud4e6x7w0fr9d90zcc9xdkhzjpx",
    "status": "pending_verification"
  },
  "specialInstructions": "Leave at door",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

## Setup Options

### Option 1: Zapier → Google Sheets (Easiest)

1. **Create a Zap:**
   - Trigger: Webhooks by Zapier → Catch Hook
   - Copy the webhook URL provided

2. **Add to Vercel:**
   - Go to your Vercel project settings
   - Add environment variable: `CRYPTO_ORDER_WEBHOOK_URL=your_zapier_webhook_url`

3. **Set up Google Sheets action:**
   - Action: Google Sheets → Create Spreadsheet Row
   - Map the fields from the webhook to your spreadsheet columns

4. **Test:**
   - Place a test crypto order
   - Check if it appears in your Google Sheet

### Option 2: Zapier → ShipStation

1. **Create a Zap:**
   - Trigger: Webhooks by Zapier → Catch Hook
   - Copy the webhook URL

2. **Add to Vercel:**
   - Add environment variable: `CRYPTO_ORDER_WEBHOOK_URL=your_zapier_webhook_url`

3. **Set up ShipStation action:**
   - Action: ShipStation → Create Order
   - Map fields:
     - Order Number: `orderId`
     - Customer Name: `customerInfo.firstName + customerInfo.lastName`
     - Email: `customerInfo.email`
     - Address fields: Map from `shippingAddress`
     - Items: Map from `items` array
     - Order Total: `totals.total`
     - Order Notes: Include `payment.cryptocurrency` and `payment.transactionId`

### Option 3: Zapier → Multiple Services

You can add multiple actions to one Zap:
1. Google Sheets (for record keeping)
2. ShipStation (for fulfillment)
3. Email/SMS (for notifications)
4. Slack (for team alerts)

### Option 4: Direct Google Sheets Integration (No Zapier)

If you want to skip Zapier entirely, I can modify the code to write directly to Google Sheets using the Google Sheets API. This would require:
- Setting up Google Cloud Console
- Creating service account credentials
- Adding Google Sheets API to the project

## Environment Variables

Add to Vercel:
```
CRYPTO_ORDER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID/
```

## Testing

1. Deploy to Vercel with the webhook URL
2. Place a test crypto order
3. Check your connected service (Google Sheets/ShipStation)
4. The order should appear with all details

## Troubleshooting

- If orders aren't appearing, check Vercel function logs
- In Zapier, check the Task History to see if webhooks are being received
- Make sure the webhook URL is exactly as provided by Zapier (including trailing slash if present)

## Benefits of This Approach

✅ No email setup required
✅ Direct integration with business tools
✅ Automatic order processing
✅ Can connect to multiple services simultaneously
✅ Easy to add more integrations later
✅ Professional workflow automation
✅ No manual data entry
