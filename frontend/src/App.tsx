import { useEffect, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function App() {
  const [status, setStatus] = useState<string>('checking...')

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('unreachable'))
  }, [])

  return (
    <div className="container">
      <h1>Hospital Appointment System</h1>
      <p className="subtitle">Book appointments with ease</p>
      <div className="status-card">
        <span>API Status: </span>
        <span className={status === 'ok' ? 'status-ok' : 'status-error'}>
          {status}
        </span>
      </div>
    </div>
  )
}
