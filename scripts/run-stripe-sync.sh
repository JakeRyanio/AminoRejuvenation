#!/bin/bash

echo "🚀 Precision Peptides - Stripe Product Sync"
echo "=========================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your STRIPE_SECRET_KEY"
    exit 1
fi

# Check if STRIPE_SECRET_KEY is set
if ! grep -q "STRIPE_SECRET_KEY" .env.local; then
    echo "❌ STRIPE_SECRET_KEY not found in .env.local"
    echo "Please add: STRIPE_SECRET_KEY=sk_test_your_key_here"
    exit 1
fi

echo "✅ Environment file found"
echo "🔄 Loading environment variables..."

# Load environment variables
export $(cat .env.local | xargs)

echo "🚀 Running Stripe product sync..."
node scripts/sync-stripe-products.js

echo "✅ Sync completed!"
