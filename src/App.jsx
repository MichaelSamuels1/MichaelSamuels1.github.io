import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AccountPage from './pages/AccountPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProductPage from './pages/ProductPage'
import ManifestoPage from './pages/ManifestoPage'

function App() {
  return (
    <Router basename="/MichaelSamuels1.github.io/">
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
