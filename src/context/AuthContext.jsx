import { createContext, useState, useEffect } from 'react'
import api from '../lib/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/api/auth/me')
        setUser(response.data.user)
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const register = async (email, password, name) => {
    try {
      const response = await api.post('/api/auth/register', {
        email,
        password,
        name
      })
      setUser(response.data.user)
      setIsLoggedIn(true)
      return { success: true, user: response.data.user }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' }
    }
  }

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password
      })
      setUser(response.data.user)
      setIsLoggedIn(true)
      return { success: true, user: response.data.user }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }

  const logout = async () => {
    try {
      await api.post('/api/auth/logout')
      setUser(null)
      setIsLoggedIn(false)
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Logout failed' }
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      loading,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
