import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function AccountPage() {
  const { user, isLoggedIn, login, register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (isRegistering) {
        const result = await register(formData.email, formData.password, formData.name)
        if (result.success) {
          navigate('/')
        } else {
          setError(result.message)
        }
      } else {
        const result = await login(formData.email, formData.password)
        if (result.success) {
          navigate('/')
        } else {
          setError(result.message)
        }
      }
    } catch (err) {
      setError('An error occurred')
    }
  }

  if (isLoggedIn) {
    return (
      <section style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1>Welcome, {user?.name}</h1>
          <p>Email: {user?.email}</p>
          <button className="btn-primary">View My Orders</button>
        </div>
      </section>
    )
  }

  return (
    <section style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1>{isRegistering ? 'Create Account' : 'Sign In'}</h1>
        {error && <div style={{ color: '#E31837', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isRegistering && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          )}
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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <button type="submit" className="btn-primary">
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ background: 'none', border: 'none', color: '#E31837', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegistering ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </section>
  )
}
