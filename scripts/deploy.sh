#!/bin/bash

# 🚀 Precision Peptides Deployment Script
# This script helps deploy your Next.js app and connect your GoDaddy domain

echo "🚀 Starting Precision Peptides Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the application
echo "🔨 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Choose your hosting platform:"
echo "   - Vercel (recommended): https://vercel.com"
echo "   - Netlify: https://netlify.com"
echo "   - Railway: https://railway.app"
echo ""
echo "2. Deploy your app using one of these methods:"
echo ""
echo "   For Vercel:"
echo "   npm install -g vercel"
echo "   vercel"
echo ""
echo "   For Netlify:"
echo "   npm install -g netlify-cli"
echo "   netlify deploy --prod --dir=out"
echo ""
echo "3. Configure your GoDaddy DNS records (see DEPLOYMENT.md for details)"
echo ""
echo "4. Set up environment variables in your hosting platform"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo "" 