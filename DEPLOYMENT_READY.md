# QuantumHomelab - Deployment Ready ✨

Your full-stack app is ready to deploy! Here's exactly what to do:

---

## 📋 Pre-Deployment Checklist

- [x] Frontend React app built and tested
- [x] All components created (Navbar, pages, Cart, Auth)
- [x] Source code committed to GitHub
- [ ] PostgreSQL database created (need to do this)
- [ ] Backend deployed to Vercel (need to do this)
- [ ] Frontend deployed to GitHub Pages (need to do this)

---

## 🔧 Two-Part Deployment (15 minutes)

### Part 1: Backend on Vercel (10 minutes)

#### 1.1 Create PostgreSQL Database

**Choose ONE option:**

**Supabase (Easiest - Recommended)**
```
1. Go to https://supabase.com
2. Click "Start your project"
3. Create new free project
4. Go to Settings > Database > Connection Strings
5. Copy the URI (full PostgreSQL URL)
6. Save it somewhere safe
```

**OR Railway**
```
1. Go to https://railway.app
2. Create account with GitHub
3. New Project > PostgreSQL
4. Once running, click "Connect"
5. Copy the PostgreSQL URL
6. Save it
```

**OR Render**
```
1. Go to https://render.com
2. New PostgreSQL Database
3. Copy "External Database URL"
4. Save it
```

#### 1.2 Generate JWT Secret
```bash
openssl rand -hex 32
```
Copy the output and save it.

#### 1.3 Deploy Backend Repository

In the `quantumhomelab-api` folder:

```bash
cd ../quantumhomelab-api

# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial backend setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/quantumhomelab-api.git
git push -u origin main
```

#### 1.4 Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select `quantumhomelab-api` repository
5. **Add these 4 environment variables:**
   - `DATABASE_URL` = (your PostgreSQL URL from step 1.1)
   - `JWT_SECRET` = (your secret from step 1.2)
   - `STRIPE_SECRET` = `sk_test_4242424242424242` (test key for now)
   - `CORS_ORIGIN` = `https://MichaelSamuels1.github.io`
6. Click "Deploy"
7. ⏳ Wait 2-3 minutes for Vercel to deploy
8. 📋 **Copy your Vercel deployment URL** (e.g., `https://quantumhomelab-api.vercel.app`)

---

### Part 2: Frontend on GitHub Pages (5 minutes)

#### 2.1 Update Backend URL

Edit this file:
```
.env.production
```

Replace with your Vercel URL:
```
VITE_API_URL=https://your-vercel-url.vercel.app
```

#### 2.2 Commit and Deploy

```bash
# Back in frontend directory
cd ../MichaelSamuels1.github.io

# Commit the updated .env.production
git add .env.production
git commit -m "Update backend URL for production"
git push origin main

# Deploy to GitHub Pages
npm run deploy
```

Done! 🎉

---

## ✅ Verify It Works

1. **Go to your live app:**
   ```
   https://michaelsamuels1.github.io
   ```

2. **Test registration:**
   - Click "Account"
   - Register a new user
   - You should be logged in

3. **Test cart:**
   - Click "Buy Now" on a product
   - Go to "Cart"
   - You should see your item in the cart

4. **Check cookies:**
   - Press F12 (DevTools)
   - Go to Application tab
   - Check Cookies for your domain
   - You should see a `token` cookie

---

## 🆘 Troubleshooting

### "API connection failed" after login
- Check Vercel backend deployment succeeded
- Verify `CORS_ORIGIN` in Vercel exactly matches: `https://MichaelSamuels1.github.io`
- Check `VITE_API_URL` in `.env.production` is correct

### "Database connection error"
- Verify `DATABASE_URL` is correct in Vercel
- If using Supabase: Allow all connections (default)
- If using Railway/Render: Verify database is running and credentials are correct

### Still having issues?
```bash
# Check if backend is responding
curl https://your-vercel-url.vercel.app/health

# Check if frontend is built correctly
npm run build
```

---

## 📚 Project Structure

### Frontend
```
MichaelSamuels1.github.io/
├── src/
│   ├── components/      # Navbar, Footer
│   ├── context/         # Auth & Cart state
│   ├── pages/           # All page components
│   ├── lib/             # API client
│   └── styles/          # CSS
├── package.json         # Dependencies
├── vite.config.js       # Build config
└── .env.production      # Backend URL
```

### Backend
```
quantumhomelab-api/
├── api/
│   ├── index.js         # Express server
│   ├── db.js            # PostgreSQL connection
│   ├── middleware.js    # JWT & cookies
│   └── routes/          # API endpoints
├── package.json
└── vercel.json          # Vercel config
```

---

## 🚀 What's Live

### API Endpoints
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get user
- `POST /api/auth/logout` - Logout
- `GET /api/products` - List products
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update quantity
- `DELETE /api/cart/:id` - Remove item
- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order

### Frontend Features
- Landing page with pricing
- User registration & login
- Shopping cart
- Checkout flow
- Product details
- Company manifesto
- Responsive design

---

## 📝 Next Steps (Future)

- [ ] Add Stripe payment processing
- [ ] Add email notifications
- [ ] Custom domain setup
- [ ] Admin dashboard
- [ ] Order status tracking
- [ ] User account dashboard

---

You're ready! Follow the deployment steps above and your app will be live in 15 minutes. 🎯
