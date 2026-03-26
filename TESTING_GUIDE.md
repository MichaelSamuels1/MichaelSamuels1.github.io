# Testing Guide - QuantumHomelab Enhanced Platform

## 🧪 Complete Testing Workflow

Follow these steps to test all the new features end-to-end.

---

## ✅ Test 1: Browse Products

### Steps:
1. Open `index.html` in your browser
2. Scroll to "Secure your digital sovereignty" section (Pricing area)
3. Look for three pricing cards: The Vault, The Compute Node, The Core

### Expected Results:
- Cards display properly
- "View Details" buttons are visible
- Buttons are clickable
- Cart icon shows "0" in navbar

---

## ✅ Test 2: View Product Details

### Steps:
1. From pricing cards, click any "View Details" button
2. Verify you're on `product.html?id=vault` (or compute/core)
3. Check that product information loads correctly

### Expected Results:
- ✅ Product name, tagline, and description display
- ✅ Pricing shows correctly
- ✅ Features list is visible
- ✅ Specifications section shows details
- ✅ Product comparison table displays all 3 tiers
- ✅ FAQ section is expandable
- ✅ Back to Home link works

---

## ✅ Test 3: Test Billing Toggle

### Steps:
1. On product details page, find "Monthly" and "Annual" buttons
2. Click "Annual (Save 20%)" button
3. Observe price change

### Expected Results:
- ✅ "Annual" button becomes highlighted
- ✅ Price updates with animation fade effect
- ✅ Price shows annual value (e.g., $48 for Vault)
- ✅ Clicking "Monthly" switches back correctly

---

## ✅ Test 4: Add to Cart

### Steps:
1. On product page, change quantity to 2
2. Click "Add to Cart" button
3. Observe confirmation message

### Expected Results:
- ✅ Quantity increases with +/- buttons
- ✅ Confirmation message appears: "✓ Added 2x [Product Name] to cart"
- ✅ Message disappears after 2 seconds
- ✅ Cart badge in navbar updates to show "2"

---

## ✅ Test 5: Test Multiple Products

### Steps:
1. On current product page, click "Continue Shopping"
2. Navigate to a different product (e.g., from Vault to Compute Node)
3. Add this product to cart with different billing period
4. Return to checkout

### Expected Results:
- ✅ Both products appear in cart
- ✅ Each shows correct quantity
- ✅ Billing periods are preserved (monthly vs annual)
- ✅ Cart count reflects total items

---

## ✅ Test 6: Checkout Flow

### Steps:
1. Click cart icon in navbar (shows item count)
2. Verify on `checkout.html`
3. Review order summary on left side

### Expected Results:
- ✅ All cart items visible
- ✅ Quantities displayed correctly
- ✅ Individual prices calculated correctly
- ✅ Subtotal = sum of all items
- ✅ Tax = Subtotal × 8%
- ✅ Total = Subtotal + Tax

---

## ✅ Test 7: Modify Cart

### Steps:
1. On checkout page, change quantity of one item
2. Click cart item's remove (✕) button on another item
3. Click "Continue Shopping" link

### Expected Results:
- ✅ Quantity changes update totals immediately
- ✅ Remove button deletes item from cart
- ✅ Totals recalculate after each change
- ✅ Continue Shopping returns to products

---

## ✅ Test 8: Checkout Form - Valid Data

### Steps:
1. Fill checkout form with valid data:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Address:** 123 Main Street
   - **City:** St. Louis
   - **State:** MO
   - **ZIP:** 63101
   - **Card Number:** 4532 1234 5678 9010 (any 16 digits)
   - **Expiry:** 12/25
   - **CVV:** 123
2. Check "I agree to terms"
3. Click "Complete Purchase"

### Expected Results:
- ✅ No error messages appear
- ✅ Button shows "Processing..." state
- ✅ Form disappears after 2 seconds
- ✅ Confirmation modal appears with checkmark
- ✅ Order ID is displayed (format: QHL-...)
- ✅ Email and total are correct

---

## ✅ Test 9: Checkout Form - Invalid Data

### Steps:
1. Try submitting with incomplete/invalid data:
   - Leave email blank
   - Use invalid email "notanemail"
   - Use invalid ZIP "ABC"
   - Use invalid card "1234"
   - Use invalid expiry "13/99"

### Expected Results:
- ✅ Error messages appear above Submit button
- ✅ Form doesn't submit
- ✅ Each field shows appropriate error
- ✅ Errors clear when fixed

---

## ✅ Test 10: Order Confirmation

### Steps:
1. After successful checkout, confirmation modal shows
2. Click "Go to Dashboard" button
3. Verify order appears in account

### Expected Results:
- ✅ Confirmation modal displays with success check (✓)
- ✅ Order ID is visible
- ✅ Email matches what you entered
- ✅ Total is correct
- ✅ Redirects to account.html
- ✅ Cart is cleared

---

## ✅ Test 11: User Registration

### Steps:
1. On `account.html`, if not logged in, see signup form
2. Click "Create Account" tab
3. Fill in:
   - **Name:** Jane Developer
   - **Email:** jane@dev.com
   - **Password:** secure123
   - **Confirm:** secure123
4. Click "Create Account"

### Expected Results:
- ✅ Form validates (passwords must match)
- ✅ Account created
- ✅ Dashboard displays with account info
- ✅ "Member Since" date shows today
- ✅ Greeting shows "Hi, Jane Developer!"

---

## ✅ Test 12: View Order History

### Steps:
1. After registration, you should see empty order state
2. Go back and make a purchase
3. Return to `account.html` and sign in with same email
4. Dashboard loads

### Expected Results:
- ✅ "No orders yet" message initially
- ✅ After purchase, order card appears
- ✅ Order shows: ID, Date, Items, Total
- ✅ Status shows "CONFIRMED & ACTIVE"
- ✅ Can see each item in order

---

## ✅ Test 13: User Login

### Steps:
1. On account page, click "Sign In" tab
2. Enter same email from registration: jane@dev.com
3. Enter wrong password first
4. Then enter correct password: secure123
5. Click "Sign In"

### Expected Results:
- ✅ Wrong password shows error message
- ✅ Correct credentials log in user
- ✅ Dashboard displays with user info
- ✅ Order history appears
- ✅ Navigation shows "Hi, [Name]!"

---

## ✅ Test 14: Sign Out

### Steps:
1. Logged in on account page
2. Click "Sign Out" button
3. Verify return to login screen

### Expected Results:
- ✅ Dashboard disappears
- ✅ Login/Register forms reappear
- ✅ Can log in again with same credentials
- ✅ Orders are still saved

---

## ✅ Test 15: Cart Persistence

### Steps:
1. Add item to cart
2. Check cart count in navbar
3. Refresh page (F5)
4. Go to checkout page

### Expected Results:
- ✅ Item still in cart after refresh
- ✅ Cart count persists
- ✅ Checkout page shows items
- ✅ Data survives browser refresh

---

## ✅ Test 16: Cross-Page Navigation

### Steps:
1. Add item to cart on homepage
2. Click product "View Details"
3. Add different item
4. Add another from sidebar
5. Return to checkout

### Expected Results:
- ✅ Cart count updates on each page
- ✅ All items accumulated in cart
- ✅ Cart icon always shows correct count
- ✅ Smooth navigation between pages

---

## ✅ Test 17: Responsive Design

### Steps:
1. Open index.html on different screen sizes:
   - Desktop (1920px)
   - Tablet (768px)
   - Mobile (375px)
2. Test all new pages at each size
3. Try hamburger menu on mobile

### Expected Results:
- ✅ Layout adjusts appropriately
- ✅ Text remains readable
- ✅ Buttons remain clickable
- ✅ Forms stack nicely
- ✅ Comparison table reflows
- ✅ Hamburger menu works on mobile

---

## ✅ Test 18: Browser Compatibility

### Test on:
- Chrome / Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅

### Expected Results:
- ✅ All pages load correctly
- ✅ Styles render properly
- ✅ JavaScript functions work
- ✅ Forms submit successfully
- ✅ Modals appear correctly

---

## 🔄 Quick Test Scenario

For a quick end-to-end test, follow this flow:

1. **Home Page** → Click service card "Learn More"
2. **Product Page** → Add 2x items to cart
3. **Checkout Page** → Review cart, modify qty
4. **Checkout Form** → Fill valid data, submit
5. **Confirmation** → See success modal
6. **Dashboard** → Click "Go to Dashboard"
7. **Sign In** → Register new account
8. **Dashboard** → See new order in history

**Expected Time:** 3-5 minutes

---

## 🐛 Troubleshooting

### Issue: Cart not updating
- **Solution:** Ensure backend.js is loaded first, then script.js

### Issue: Product page shows wrong info
- **Solution:** Check URL parameter (e.g., ?id=vault)

### Issue: Form won't submit
- **Solution:** Check for red error messages above button

### Issue: Orders not showing
- **Solution:** Make sure you signed in with correct email after purchase

### Issue: Styles look broken
- **Solution:** Hard refresh (Ctrl+F5 or Cmd+Shift+R)

---

## ✨ Test Checklist

- [ ] All pages load without errors
- [ ] Cart updates correctly
- [ ] Products add to cart
- [ ] Checkout form validates
- [ ] Orders are confirmed
- [ ] User registration works
- [ ] Login works with stored accounts
- [ ] Order history displays
- [ ] Sign out functions
- [ ] Data persists on refresh
- [ ] Responsive on mobile
- [ ] All links work correctly

---

## 🎉 You're All Set!

If all tests pass, your e-commerce platform is ready to go! 🚀
