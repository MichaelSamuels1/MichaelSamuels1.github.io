# Product Catalog Documentation

## Complete Product Database

All products are defined in `backend.js` and accessible via the `PRODUCTS` object.

---

## Product: The Vault (Tier 1)

**ID:** `vault`  
**Price:** $5/month | $48/year  
**Best For:** Individuals seeking secure cloud storage

### Features:
- 100GB Nextcloud Storage
- WireGuard Private VPN Access
- 2TB Monthly Bandwidth
- Basic Email Support
- GDPR Compliant
- No Tracking or Logs

### Specifications:
- **Storage:** 100GB SSD
- **VPN:** WireGuard Protocol
- **Bandwidth:** 2TB/month
- **Support:** 24-48 hour email response
- **Uptime:** 99.0% SLA

### Use Cases:
- Personal file backup
- Photo storage and sync
- Private document hosting
- Budget-conscious privacy

---

## Product: The Compute Node (Tier 2)

**ID:** `compute`  
**Price:** $15/month | $144/year  
**Best For:** Developers and small teams  
**🌟 MOST POPULAR**

### Features:
- 500GB SSD Storage
- 2 Docker Container Slots
- Dedicated Reverse Proxy
- Uptime Monitoring (99.9%)
- Priority Email & Chat Support
- API Access
- Monthly Backup Snapshots
- Free SSL/TLS Certificates

### Specifications:
- **Storage:** 500GB RAID-1 SSD
- **Containers:** 2 slots (2GB RAM each)
- **Proxy:** Dedicated with auto-scaling
- **Support:** 4-hour email, 2-hour chat response
- **Uptime SLA:** 99.9%

### Use Cases:
- Web application hosting
- API microservices
- Docker container deployment
- Development team infrastructure
- Small business websites

---

## Product: The Core (Tier 3)

**ID:** `core`  
**Price:** $35/month | $336/year  
**Best For:** Enterprise and mission-critical applications

### Features:
- 1TB Storage (RAID-10)
- Dedicated VPN Endpoint
- Full Reverse Proxy Control
- 4 Docker Container Slots
- Priority 24/7 Phone Support
- Dedicated Server Manager
- Daily Backup & DR Plan
- Custom Compliance Setup
- Guaranteed 99.95% SLA

### Specifications:
- **Storage:** 1TB RAID-10 Enterprise SSD
- **Containers:** 4 slots (4GB RAM each)
- **VPN:** Private dedicated endpoint
- **Support:** 1-hour all channels, 24/7 phone
- **Uptime SLA:** 99.95% with compensation

### Use Cases:
- Enterprise applications
- Mission-critical services
- Multi-tenant platforms
- High-traffic websites
- Compliance-heavy workloads

---

## Accessing Products Programmatically

### Get Single Product:
```javascript
const product = window.QuantumBackend.getProductById('vault');
console.log(product.name); // "The Vault"
console.log(product.price); // 5
```

### Get All Products:
```javascript
const allProducts = window.QuantumBackend.getAllProducts();
allProducts.forEach(product => {
    console.log(`${product.name}: $${product.price}/mo`);
});
```

### Product Object Structure:
```javascript
{
    id: 'vault',
    name: 'The Vault',
    type: 'TIER 1',
    tagline: 'Personal Cloud Storage',
    price: 5,
    yearlyPrice: 48,
    description: '...',
    features: [...],
    specs: {
        storage: '100GB SSD',
        vpn: 'WireGuard Protocol',
        // ...
    },
    image: '🔒',
    color: 'red'
}
```

---

## Pricing Comparison

| Feature | The Vault | The Compute Node | The Core |
|---------|-----------|------------------|----------|
| **Monthly Price** | $5 | $15 | $35 |
| **Annual Price** | $48 | $144 | $336 |
| **Annual Savings** | 20% | 20% | 20% |
| **Storage** | 100GB | 500GB | 1TB |
| **Docker Containers** | — | 2 | 4 |
| **VPN** | Shared | Shared | Dedicated |
| **Support** | Email | Chat + Email | 24/7 Phone |
| **SLA** | 99.0% | 99.9% | 99.95% |
| **Backups** | Monthly | Monthly | Daily |
| **Dedicated Manager** | ❌ | ❌ | ✅ |

---

## Adding New Products

To add a new product to the catalog:

1. **Edit `backend.js`**
2. **Add to PRODUCTS object:**

```javascript
PRODUCTS.newproduct = {
    id: 'newproduct',
    name: 'Product Name',
    type: 'TIER X',
    tagline: 'Short description',
    price: 25,
    yearlyPrice: 300,
    description: 'Longer description here...',
    features: [
        'Feature 1',
        'Feature 2',
        // ...
    ],
    specs: {
        storage: '250GB SSD',
        // ... other specs
    },
    image: '🎯',
    color: 'red'
};
```

3. **Update links in HTML files:**
   - Add button: `<a href="product.html?id=newproduct">View Details</a>`

4. **Update comparison table** in product.html

---

## Product Navigation URLs

Direct links to product pages:

- **The Vault:** `product.html?id=vault`
- **The Compute Node:** `product.html?id=compute`
- **The Core:** `product.html?id=core`

All product pages are dynamically generated from the product data.

---

## Product Icons & Colors

Each product has an emoji icon and brand color:

- **The Vault:** 🔒 Red (#E31837)
- **The Compute Node:** ⚙️ White/Default
- **The Core:** 🏢 Red (#E31837)

Icons are displayed:
- In pricing cards on homepage
- Large on product detail pages
- In comparison tables

---

## Feature Inheritance

Products inherit features from tier to tier:

- **All tiers:** GDPR compliant, no logs, secure
- **Tier 1:** Basic VPN and storage
- **Tier 2:** + Containers, + Priority support
- **Tier 3:** + Everything + Phone support + SLA

---

## Billing Options

Each product supports:

- **Monthly billing:** Pay per month, no commitment
- **Annual billing:** 20% discount, prepay annually
- **Auto-renewal:** Can be configured per user

Pricing model is stored in cart with billing type:
```javascript
{
    id: 'vault',
    billing: 'monthly', // or 'yearly'
    price: 5,
    quantity: 1
}
```

---

## Support Levels

### Vault (Basic)
- Email support
- 24-48 hour response
- Community forum access

### Compute Node (Priority)
- Email & Chat
- 2-4 hour response
- Dedicated support channel
- Escalation path

### Core (Enterprise)
- 24/7 Phone support
- 1-hour response guarantee
- Dedicated account manager
- SLA compensation
- Custom support hours

---

## SLA Details

### Vault (99.0%)
- 3.65 days downtime per year
- Basic compensation if breached

### Compute Node (99.9%)
- 8.76 hours downtime per year
- Service credits for breach
- Monitoring dashboard

### Core (99.95%)
- 4.38 hours downtime per year
- Full service compensation
- Guaranteed uptime commitment
- Monthly SLA reports

---

## Future Products

Possible tiers to add:

1. **Starter Lite** - $2/mo (1 container, 50GB storage)
2. **Business** - $50/mo (10 containers, 2TB storage)
3. **Enterprise+** - Custom pricing

---

## Support & Documentation

For each product, provide:

- ✅ Detailed feature list
- ✅ Technical specifications
- ✅ Setup guide
- ✅ API documentation
- ✅ FAQ section
- ✅ Troubleshooting guide

All included in the product page structure!

---

**Last Updated:** March 2026  
**Catalog Version:** 1.0  
**Total Products:** 3 (Tiers)
