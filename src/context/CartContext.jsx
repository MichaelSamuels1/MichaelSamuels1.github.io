import { createContext, useState, useEffect } from 'react'
import api from '../lib/api'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Load cart from backend on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true)
        const response = await api.get('/api/cart')
        setItems(response.data.items || [])
      } catch (error) {
        // User may not be authenticated yet
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const addItem = async (productId, billing = 'monthly', quantity = 1) => {
    try {
      const response = await api.post('/api/cart', {
        productId,
        billing,
        quantity
      })
      setItems(response.data.items || [])
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add item' }
    }
  }

  const removeItem = async (itemId) => {
    try {
      const response = await api.delete(`/api/cart/${itemId}`)
      setItems(response.data.items || [])
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Failed to remove item' }
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await api.put(`/api/cart/${itemId}`, { quantity })
      setItems(response.data.items || [])
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Failed to update quantity' }
    }
  }

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + (item.quantity || 0), 0)
  }

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)
  }

  const getTax = () => {
    return getSubtotal() * 0.08 // 8% tax
  }

  const getTotal = () => {
    return getSubtotal() + getTax()
  }

  const clearCart = async () => {
    try {
      await api.post('/api/cart/clear')
      setItems([])
      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }

  return (
    <CartContext.Provider value={{
      items,
      loading,
      addItem,
      removeItem,
      updateQuantity,
      getItemCount,
      getSubtotal,
      getTax,
      getTotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
