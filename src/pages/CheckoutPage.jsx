import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import api from '../lib/api'

export default function CheckoutPage() {
  const { items, getSubtotal, getTax, getTotal, clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create order
      const orderResponse = await api.post('/api/orders', {
        items,
        customerInfo: formData
      })

      // For now, just complete the order (Stripe integration comes later)
      // In Phase 7, we'll integrate with Stripe here
      await clearCart()
      navigate('/')
      alert('Order placed successfully!')
    } catch (err) {
      setError('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <section style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Billing Information</h3>
            {error && <div style={{ color: '#E31837' }}>{error}</div>}

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              required
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />

            <h3 style={{ marginTop: '2rem' }}>Payment Information</h3>
            <input
              type="text"
              name="cardNumber"
              placeholder="16-Digit Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ marginTop: '2rem' }}
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>
          </form>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            borderRadius: '20px',
            padding: '2rem',
            height: 'fit-content'
          }}>
            <h3>Order Summary</h3>
            <div style={{ marginTop: '1.5rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #ddd', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal:</span>
                  <span>{formatCurrency(getSubtotal())}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Tax (8%):</span>
                  <span>{formatCurrency(getTax())}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>{formatCurrency(getTotal())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
