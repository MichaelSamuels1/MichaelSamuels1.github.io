#!/bin/bash

# QuantumHomelab Frontend Deployment Script
# Run this to deploy to GitHub Pages

set -e

echo "🚀 Deploying QuantumHomelab Frontend..."
echo ""

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
  echo "❌ Error: .env.production not found"
  echo "Please create .env.production with your backend URL:"
  echo "VITE_API_URL=https://your-backend-url.vercel.app"
  exit 1
fi

echo "✓ .env.production found"
echo ""

# Check if backend URL is set
BACKEND_URL=$(grep "VITE_API_URL" .env.production | cut -d'=' -f2)
if [ -z "$BACKEND_URL" ] || [ "$BACKEND_URL" = "https://quantumhomelab-api.vercel.app" ]; then
  echo "⚠️  Warning: Backend URL should be your actual Vercel deployment URL"
  echo "Current VITE_API_URL: $BACKEND_URL"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo "📦 Building React app..."
npm run build

if [ ! -d "dist" ]; then
  echo "❌ Build failed - dist directory not created"
  exit 1
fi

echo "✓ Build successful"
echo ""
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo ""
echo "✅ Deployment complete!"
echo "Your app is live at: https://michaelsamuels1.github.io"
echo ""
echo "Next steps:"
echo "1. Verify your backend is deployed to Vercel"
echo "2. Update VITE_API_URL in .env.production with your Vercel URL"
echo "3. Test the app at https://michaelsamuels1.github.io"
