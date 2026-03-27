import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTax, getTotal } = useContext(CartContext)
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/account')
      return
    }
    navigate('/checkout')
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
        <h1>Shopping Cart</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p>Your cart is empty</p>
            <Link to="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <th style={{ textAlign: 'left', padding: '1rem' }}>Product</th>
                    <th style={{ textAlign: 'center', padding: '1rem' }}>Quantity</th>
                    <th style={{ textAlign: 'right', padding: '1rem' }}>Price</th>
                    <th style={{ textAlign: 'right', padding: '1rem' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem' }}>
                        <div>{item.name}</div>
                        <small style={{ color: '#999' }}>{item.billing}</small>
                      </td>
                      <td style={{ textAlign: 'center', padding: '1rem' }}>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          style={{ width: '60px', padding: '0.5rem' }}
                        />
                      </td>
                      <td style={{ textAlign: 'right', padding: '1rem' }}>
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td style={{ textAlign: 'right', padding: '1rem' }}>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{ background: 'none', border: 'none', color: '#E31837', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              borderRadius: '20px',
              padding: '2rem',
              height: 'fit-content'
            }}>
              <h3>Order Summary</h3>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal:</span>
                  <span>{formatCurrency(getSubtotal())}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Tax (8%):</span>
                  <span>{formatCurrency(getTax())}</span>
                </div>
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>{formatCurrency(getTotal())}</span>
                </div>
                <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
