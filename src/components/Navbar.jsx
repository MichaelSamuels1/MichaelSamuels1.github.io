import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isLoggedIn, logout } = useContext(AuthContext)
  const { getItemCount } = useContext(CartContext)
  const cartCount = getItemCount()

  const handleLogout = async () => {
    await logout()
    setMobileMenuOpen(false)
  }

  return (
    <nav className="glass-nav" id="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          Quantum<span>Homelab</span>
        </Link>
        <div className="nav-links">
          <a href="/#services">Services</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#how-it-works">How It Works</a>
          <Link to="/manifesto">Manifesto</Link>
          {isLoggedIn ? (
            <>
              <span className="user-greeting">{user?.name || 'Account'}</span>
              <button onClick={handleLogout} className="btn-primary-small">
                Logout
              </button>
            </>
          ) : (
            <Link to="/account" className="btn-primary-small" id="accountNav">
              Account
            </Link>
          )}
          <Link to="/cart" className="btn-primary-small">
            Cart <span id="cart-count" className="cart-badge">{cartCount}</span>
          </Link>
        </div>
        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  )
}
