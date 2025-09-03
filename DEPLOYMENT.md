# 🚀 Deployment Guide - Precision Peptides

## **Domain Connection Options**

### **Option 1: Vercel (Recommended)**

#### **Step 1: Deploy to Vercel**
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy your app:
   ```bash
   vercel
   ```

3. Follow the prompts and connect your GitHub repository

#### **Step 2: Connect GoDaddy Domain**
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your GoDaddy domain (e.g., `yourdomain.com`)
4. Vercel will provide DNS records to configure

#### **Step 3: Configure GoDaddy DNS**
In your GoDaddy DNS settings, add these records:

**For Root Domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.19.19
TTL: 600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

### **Option 2: Netlify**

#### **Step 1: Deploy to Netlify**
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=out
   ```

#### **Step 2: Configure DNS**
Add these DNS records in GoDaddy:

**For Root Domain:**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
TTL: 600
```

### **Option 3: Railway**

#### **Step 1: Deploy to Railway**
1. Connect your GitHub repo to Railway
2. Railway will auto-deploy your app
3. Get your Railway URL

#### **Step 2: Configure Custom Domain**
1. In Railway dashboard, go to your app
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records provided by Railway

## **Environment Variables Setup**

Create a `.env.local` file with these variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Base URL (update with your domain)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Database (if using)
DATABASE_URL=your_database_url

# Email (if using)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## **SSL Certificate**

Most hosting platforms (Vercel, Netlify, Railway) provide automatic SSL certificates. No additional configuration needed.

## **Testing Your Deployment**

1. **Build locally first:**
   ```bash
   npm run build
   ```

2. **Test the build:**
   ```bash
   npm start
   ```

3. **Check for errors:**
   - Review build output
   - Test all functionality
   - Verify Stripe integration

## **Post-Deployment Checklist**

- [ ] Domain resolves correctly
- [ ] SSL certificate is active (https://)
- [ ] All pages load properly
- [ ] Cart functionality works
- [ ] Stripe checkout works
- [ ] Images load correctly
- [ ] Mobile responsiveness
- [ ] Performance is good

## **Troubleshooting**

### **Domain Not Resolving**
- Check DNS propagation (can take 24-48 hours)
- Verify DNS records are correct
- Clear browser cache

### **SSL Issues**
- Wait for SSL certificate to provision (usually 5-10 minutes)
- Check if hosting platform supports your domain

### **Build Errors**
- Check environment variables
- Review build logs
- Test locally first

## **Support**

For domain-specific issues:
- **GoDaddy Support**: 1-866-938-1119
- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://www.netlify.com/support/

## **Recommended Next Steps**

1. **Choose your hosting platform** (Vercel recommended)
2. **Deploy your app**
3. **Configure your GoDaddy DNS**
4. **Test thoroughly**
5. **Set up monitoring** (optional)
6. **Configure backups** (optional) 

# �� **Cart Page Issues - FIXED!**

## **✅ What I Fixed:**

### **1. Checkout Page Issues:**
- ✅ **Fixed Stripe initialization** with proper error handling
- ✅ **Added environment variable validation** 
- ✅ **Improved error messages** for better debugging
- ✅ **Fixed API route** to return correct payment intent format
- ✅ **Updated Stripe API version** to latest

### **2. API Route Issues:**
- ✅ **Fixed payment intent creation** 
- ✅ **Added proper error handling**
- ✅ **Fixed metadata structure**
- ✅ **Updated API responses**

### **3. Cart Context Issues:**
- ✅ **Fixed ID handling** for cart items
- ✅ **Added proper validation**
- ✅ **Improved error handling**

## **🔧 What You Need to Do:**

### **Step 1: Add Environment Variables in Vercel**

1. Go to: https://vercel.com/jake-pinnacleparts-projects/v0-simplicity-complex-website
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:

```
<code_block_to_apply_changes_from>
```

### **Step 2: Get Your Stripe Keys**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Click **"Developers"** → **"API keys"**
3. Copy your **Publishable key** and **Secret key**

### **Step 3: Redeploy**

After adding environment variables:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on your latest deployment

## **🎯 Current Status:**

- ✅ **App deployed successfully**
- ✅ **All fixes applied**
- ✅ **Cart functionality improved**
- ✅ **Error handling enhanced**
- ⏳ **Waiting for environment variables**

## **📋 Test After Setup:**

Once you add the environment variables and redeploy:

1. **Add items to cart** ✅
2. **Go to checkout page** ✅
3. **Fill out form** ✅
4. **Test payment** (use: 4242 4242 4242 4242) ✅

## **📖 Documentation Created:**

- `ENVIRONMENT_SETUP.md` - Complete setup guide
- `DEPLOYMENT.md` - Deployment instructions
- `GODADDY_DNS_SETUP.md` - DNS configuration

The cart page should work perfectly once you add the Stripe environment variables! Let me know when you've added them and I can help you test the full checkout flow. 