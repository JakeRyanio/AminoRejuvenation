# 🔧 Environment Variables Setup

## **Required Environment Variables for Cart/Checkout to Work**

Your cart page is not working because the Stripe environment variables are not configured. Here's how to fix it:

### **Step 1: Get Your Stripe Keys**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Click **"Developers"** → **"API keys"**
3. Copy your **Publishable key** and **Secret key**

### **Step 2: Add Environment Variables in Vercel**

1. Go to your Vercel dashboard: https://vercel.com/jake-pinnacleparts-projects/v0-simplicity-complex-website
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left sidebar
4. Add these variables:

#### **For Production:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
NEXT_PUBLIC_BASE_URL=https://precisionpeptides.store
```

#### **For Development (Optional):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### **Step 3: Redeploy**

After adding the environment variables:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on your latest deployment
3. Wait for the deployment to complete

### **Step 4: Test**

After redeployment, test:
- ✅ Add items to cart
- ✅ Go to checkout page
- ✅ Fill out form
- ✅ Test payment (use Stripe test card: 4242 4242 4242 4242)

## **Stripe Test Cards**

For testing payments, use these test card numbers:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Expired**: 4000 0000 0000 0069

## **Troubleshooting**

### **If cart still doesn't work:**
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Make sure you redeployed after adding variables
4. Clear browser cache

### **If checkout fails:**
1. Check Stripe dashboard for errors
2. Verify API keys are correct
3. Check that products have Stripe price IDs

## **Security Notes**

- ✅ **Publishable key** (starts with `pk_`) is safe to expose
- ❌ **Secret key** (starts with `sk_`) must be kept private
- ✅ Environment variables in Vercel are encrypted
- ✅ Never commit secret keys to your code

## **Next Steps**

Once environment variables are set:
1. Test the full checkout flow
2. Set up webhook endpoints (optional)
3. Configure email notifications (optional)
4. Set up order management (optional) 