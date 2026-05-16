import { useEffect, useState } from 'react'
import "./App.css"
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

type ApiStatus = 'checking' | 'ok' | 'error'

export default function App() {
  const [status, setStatus] = useState<ApiStatus>('checking')

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_URL}/health`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        })
        
        if (!response.ok) {
          setStatus('error')
          return
        }

        const data = await response.json()
        setStatus(data.status === 'ok' ? 'ok' : 'error')
      } catch {
        setStatus('error')
      }
    }

    checkHealth()
  }, [])

  return (
    <div className="container">
      <h1>Hospital Appointment System</h1>
      <p className="subtitle">Book appointments with ease</p>
      <div className="status-card">
        <span>API Status: </span>
        <span className={status === 'ok' ? 'status-ok' : 'status-error'}>
          {status === 'checking' ? 'Checking...' : status}
        </span>
      </div>
    </div>
  )
}
