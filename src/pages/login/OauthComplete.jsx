import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { api, formatApiError } from '../../lib/api.js'

export default function OauthComplete() {
  const navigate = useNavigate()
  const { setSession } = useAuth()
  const [err, setErr] = useState(null)

  useEffect(() => {
    const hash = window.location.hash?.replace(/^#/, '') ?? ''
    const params = new URLSearchParams(hash)
    const token = params.get('access_token')
    if (!token) {
      setErr('Missing access token. Try signing in again.')
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const res = await api('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(formatApiError(data))
        if (cancelled) return
        setSession({
          token,
          user: {
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.fullName,
            roles: data.user.roles,
          },
        })
        // Customer app dashboard (not admin — admin uses "/" for its home).
        navigate('/dashboard', { replace: true })
      } catch (e) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : 'Could not complete sign-in')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [navigate, setSession])

  if (err) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <p className="text-red-600 text-center mb-4">{err}</p>
        <Link to="/login" className="text-purple-600 underline">
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 text-gray-600">
      Completing sign-in…
    </div>
  )
}
