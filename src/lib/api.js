import axios from 'axios'

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important: Include httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      // Could redirect to login here if needed
      window.location.href = '/MichaelSamuels1.github.io/account'
    }
    return Promise.reject(error)
  }
)

export default api
