# 🔗 GoDaddy DNS Configuration Guide

## **Step-by-Step GoDaddy DNS Setup**

### **Step 1: Access GoDaddy DNS Management**

1. Log into your GoDaddy account
2. Go to "My Products" → "Domains"
3. Find your domain and click "DNS"
4. Click "Manage DNS"

### **Step 2: Choose Your Hosting Platform**

#### **For Vercel (Recommended)**

**Add these DNS records:**

**A Record (Root Domain):**
```
Type: A
Name: @
Value: 76.76.19.19
TTL: 600
```

**CNAME Record (www subdomain):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

#### **For Netlify**

**Add these DNS records:**

**A Record (Root Domain):**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 600
```

**CNAME Record (www subdomain):**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
TTL: 600
```

#### **For Railway**

**Add these DNS records:**

**A Record (Root Domain):**
```
Type: A
Name: @
Value: [Railway will provide this IP]
TTL: 600
```

**CNAME Record (www subdomain):**
```
Type: CNAME
Name: www
Value: [Railway will provide this URL]
TTL: 600
```

### **Step 3: Remove Conflicting Records**

**Remove these if they exist:**
- Any existing A records pointing to GoDaddy parking pages
- Any CNAME records for www pointing to GoDaddy
- Any conflicting redirects

### **Step 4: Verify Configuration**

**Check these in GoDaddy DNS:**
- [ ] A record for @ points to hosting platform IP
- [ ] CNAME record for www points to hosting platform
- [ ] No conflicting records remain
- [ ] TTL is set to 600 (or lowest available)

### **Step 5: Wait for Propagation**

**DNS changes can take:**
- **Immediate to 1 hour**: Most users
- **Up to 24 hours**: Some DNS providers
- **Up to 48 hours**: Rare cases

### **Step 6: Test Your Domain**

**Test these URLs:**
- `https://yourdomain.com` (root domain)
- `https://www.yourdomain.com` (www subdomain)
- Both should show your Precision Peptides website

## **Troubleshooting**

### **Domain Not Working After 24 Hours**

1. **Check DNS propagation:**
   - Use https://www.whatsmydns.net/
   - Enter your domain and check A/CNAME records

2. **Verify DNS records:**
   - Go back to GoDaddy DNS management
   - Ensure records match exactly

3. **Clear browser cache:**
   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Try incognito/private browsing

### **SSL Certificate Issues**

1. **Wait for SSL provisioning** (5-10 minutes)
2. **Check hosting platform SSL status**
3. **Ensure domain is properly connected**

### **www vs Non-www Issues**

1. **Set up redirects in your hosting platform**
2. **Choose one as primary** (recommend non-www)
3. **Configure 301 redirects**

## **GoDaddy Support**

**If you need help:**
- **Phone**: 1-866-938-1119
- **Live Chat**: Available in GoDaddy dashboard
- **Knowledge Base**: https://www.godaddy.com/help

## **Quick Reference**

**Vercel DNS Records:**
```
A    @    76.76.19.19
CNAME www cname.vercel-dns.com
```

**Netlify DNS Records:**
```
A    @    75.2.60.5
CNAME www your-site-name.netlify.app
```

**Railway DNS Records:**
```
A    @    [Railway IP]
CNAME www [Railway URL]
```

## **Next Steps After DNS Setup**

1. **Wait for DNS propagation** (up to 24 hours)
2. **Test your domain** thoroughly
3. **Set up SSL certificate** (automatic with most platforms)
4. **Configure redirects** (www to non-www or vice versa)
5. **Test all functionality** (cart, checkout, etc.)
6. **Set up monitoring** (optional) 