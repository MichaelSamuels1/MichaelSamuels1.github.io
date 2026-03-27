import { useSearchParams } from 'react-router-dom'

const PRODUCTS = {
  'vault': {
    id: 'vault',
    name: 'The Vault',
    type: 'TIER 1',
    tagline: 'Personal Cloud Storage',
    price: 5,
    yearlyPrice: 48,
    description: 'Perfect for individuals who need secure cloud storage and privacy.',
    features: [
      '100GB Nextcloud Storage',
      'WireGuard Private VPN Access',
      '2TB Monthly Bandwidth',
      'Basic Email Support',
      'GDPR Compliant',
      'No Tracking or Logs'
    ]
  },
  'compute': {
    id: 'compute',
    name: 'The Compute Node',
    type: 'TIER 2',
    tagline: 'Application & Container Hosting',
    price: 15,
    yearlyPrice: 144,
    description: 'Developer-focused tier with Docker support and custom application hosting.',
    features: [
      '500GB SSD Storage',
      '2 Docker Container Slots',
      'Dedicated Reverse Proxy',
      'Uptime Monitoring (99.9%)',
      'Priority Email & Chat Support',
      'API Access'
    ]
  },
  'core': {
    id: 'core',
    name: 'The Core',
    type: 'TIER 3',
    tagline: 'Enterprise Infrastructure',
    price: 35,
    yearlyPrice: 336,
    description: 'Enterprise-grade hosting with guaranteed uptime, full control, and dedicated support.',
    features: [
      '1TB Storage (RAID-10)',
      'Dedicated VPN Endpoint',
      'Full Reverse Proxy Control',
      '4 Docker Container Slots',
      'Priority 24/7 Phone Support',
      'Guaranteed 99.95% SLA'
    ]
  }
}

export default function ProductPage() {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('id') || 'vault'
  const product = PRODUCTS[productId]

  if (!product) {
    return (
      <section style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <h1>Product not found</h1>
      </section>
    )
  }

  return (
    <section style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>{product.name}</h1>
        <p className="section-subtitle">{product.tagline}</p>
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ color: '#E31837' }}>${product.price}/mo</h2>
          <p>{product.description}</p>
          <h3 style={{ marginTop: '2rem' }}>Features:</h3>
          <ul style={{ marginTop: '1rem' }}>
            {product.features.map((feature, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>✓ {feature}</li>
            ))}
          </ul>
          <button className="btn-primary" style={{ marginTop: '2rem' }}>Buy Now</button>
        </div>
      </div>
    </section>
  )
}
