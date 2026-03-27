import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const PRODUCTS = {
  'vault': {
    id: 'vault',
    name: 'The Vault',
    type: 'TIER 1',
    tagline: 'Personal Cloud Storage',
    price: 5,
    yearlyPrice: 48,
  },
  'compute': {
    id: 'compute',
    name: 'The Compute Node',
    type: 'TIER 2',
    tagline: 'Application & Container Hosting',
    price: 15,
    yearlyPrice: 144,
    popular: true
  },
  'core': {
    id: 'core',
    name: 'The Core',
    type: 'TIER 3',
    tagline: 'Enterprise Infrastructure',
    price: 35,
    yearlyPrice: 336,
  }
}

export default function HomePage() {
  const { addItem } = useContext(CartContext)

  const handleBuyNow = async (productId) => {
    await addItem(productId, 'monthly', 1)
    alert('Added to cart!')
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <span className="badge animate-fade-in">SECURE. PRIVATE. LOCAL.</span>
          <h1 className="animate-fade-in" style={{animationDelay: '0.1s'}}>The Most <span className="highlight">Private</span><br />Cloud Ever.</h1>
          <p className="animate-fade-in" style={{animationDelay: '0.2s'}}>Your data deserves better than big corporations. Host it on dedicated, local hardware from our optimized homelab network. Real security from the ground up.</p>
          <div className="hero-btns animate-fade-in" style={{animationDelay: '0.3s'}}>
            <a href="#pricing" className="btn-primary">Explore Hosting Plans</a>
            <a href="manifesto" className="btn-secondary">Read the Manifesto →</a>
          </div>
        </div>
        <div className="hero-graphic">
          <div className="server-rack-glass">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`server-unit ${i === 2 ? 'active' : ''}`}>
                <div className="server-bezel">
                  <div className="server-header">
                    <div className={`led-indicator ${i === 2 ? 'active-led' : ''}`}></div>
                    <span className="server-label">U{i}</span>
                  </div>
                  <div className="server-body">
                    <div className="ventilation">
                      {[1, 2, 3].map(j => <div key={j} className="vent-slot"></div>)}
                    </div>
                    <div className="ports-section">
                      {[1, 2].map(j => <div key={j} className="port-item network"></div>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hero-glow"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="section-header">
          <h2>Built for your data sovereignty.</h2>
          <p className="section-subtitle">From private files to secure codebases, QuantumHomelab provides a dedicated slice of our optimized local network.</p>
        </div>
        <div className="grid">
          <div className="card-glass hover-lift">
            <div className="icon-circle red">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.96-3.83c-.375-.48-.11-1.17.42-1.17.32 0 .63.2.79.53L9.7 11.07l2.05-2.63c.16-.33.47-.53.79-.53.53 0 .795.69.42 1.17z"/>
              </svg>
            </div>
            <h3>Personal Cloud</h3>
            <p>Host files, sync calendars, and manage photos on Nextcloud, hosted directly from our homelab.</p>
            <div className="card-features">
              <span className="feature-tag">Nextcloud</span>
              <span className="feature-tag">100GB+</span>
            </div>
          </div>
          <div className="card-glass active-card hover-lift">
            <div className="icon-circle white">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><path d="M12 5v14M5 12h14"/>
              </svg>
            </div>
            <h3>API Endpoint Hosting</h3>
            <p>Run your Dockerized containers or microservices behind our secure proxy.</p>
            <div className="card-features">
              <span className="feature-tag">Docker</span>
              <span className="feature-tag">2-8 Slots</span>
            </div>
          </div>
          <div className="card-glass hover-lift">
            <div className="icon-circle red">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3>VPN Gateway</h3>
            <p>A private WireGuard connection to tunnel your traffic safely through our hub.</p>
            <div className="card-features">
              <span className="feature-tag">WireGuard</span>
              <span className="feature-tag">Military Grade</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p className="section-subtitle">From registration to deployment in minutes</p>
        </div>
        <div className="steps-container">
          <div className="step" data-step="1">
            <div className="step-number">01</div>
            <h3>Choose Your Plan</h3>
            <p>Select from our three tiers based on your storage, compute, and bandwidth needs. Upgrade or downgrade anytime.</p>
            <div className="step-icon">📋</div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step" data-step="2">
            <div className="step-number">02</div>
            <h3>Instant Provisioning</h3>
            <p>Your dedicated infrastructure is deployed automatically. No waiting, no tickets. You control everything.</p>
            <div className="step-icon">⚡</div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step" data-step="3">
            <div className="step-number">03</div>
            <h3>Deploy Your Apps</h3>
            <p>Push your containers, connect your VPN, or host your files. Full control via our clean API.</p>
            <div className="step-icon">🚀</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="section-header">
          <h2>Secure your digital sovereignty.</h2>
          <p className="section-subtitle">A marketplace for localized computing power. Choose the private plan that fits your growth.</p>
        </div>
        <div className="pricing-controls">
          <button className="billing-toggle active">Monthly Billing</button>
          <button className="billing-toggle">Annual (Save 20%)</button>
        </div>
        <div className="grid pricing-grid">
          {Object.values(PRODUCTS).map(product => (
            <div key={product.id} className={`card-pricing hover-lift ${product.popular ? 'featured' : ''}`}>
              {product.popular && <span className="plan-badge">★ MOST POPULAR ★</span>}
              <span className="plan-type">{product.type}</span>
              <h3>{product.name}</h3>
              <p className="price"><span className="price-amount">${product.price}</span><span>/mo</span></p>
              <p className="price-note">${product.yearlyPrice} per year</p>
              <ul>
                {product.id === 'vault' && (
                  <>
                    <li>100GB Nextcloud Storage</li>
                    <li>WireGuard Private VPN Access</li>
                    <li>2TB Monthly Bandwidth</li>
                    <li>Basic Support</li>
                  </>
                )}
                {product.id === 'compute' && (
                  <>
                    <li>500GB SSD Storage</li>
                    <li>2 Docker Container Slots</li>
                    <li>Dedicated Reverse Proxy</li>
                    <li>Uptime Monitoring</li>
                    <li>Priority Support</li>
                  </>
                )}
                {product.id === 'core' && (
                  <>
                    <li>1TB Storage (RAID 10)</li>
                    <li>Dedicated VPN Endpoint</li>
                    <li>Full Reverse Proxy Control</li>
                    <li>Priority Support</li>
                    <li>SLA Guarantee</li>
                  </>
                )}
              </ul>
              <button className="btn-primary buy-now-btn" onClick={() => handleBuyNow(product.id)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="specs-section">
        <div className="section-header">
          <h2>Enterprise Infrastructure</h2>
          <p className="section-subtitle">Built on proven, secure hardware you can trust</p>
        </div>
        <div className="specs-grid">
          <div className="spec-card">
            <h4>Networking</h4>
            <ul>
              <li><strong>Cisco 3560X</strong> managed switch</li>
              <li>EdgeRouter with dual-WAN</li>
              <li>99.95% uptime SLA</li>
            </ul>
          </div>
          <div className="spec-card">
            <h4>Storage</h4>
            <ul>
              <li>Enterprise SSDs with RAID 10</li>
              <li>Real-time encrypted backups</li>
              <li>Daily integrity checks</li>
            </ul>
          </div>
          <div className="spec-card">
            <h4>Security</h4>
            <ul>
              <li>Zero-trust architecture</li>
              <li>End-to-end encryption</li>
              <li>No logs, no tracking</li>
            </ul>
          </div>
          <div className="spec-card">
            <h4>Compliance</h4>
            <ul>
              <li>GDPR compliant</li>
              <li>US-based infrastructure</li>
              <li>Transparent data handling</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
