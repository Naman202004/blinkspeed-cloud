import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useSites } from '../../context/SitesContext.jsx'
import { api, formatApiError } from '../../lib/api.js'

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { session } = useAuth()
  const { addSite } = useSites()
  const [error, setError] = useState(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const mode = searchParams.get('mode') || 'test'
    if (!sessionId) {
      setError('Missing session.')
      return
    }
    if (!session?.token) {
      setError('Not signed in.')
      return
    }

    const doneKey = `blinkspeed_checkout_done_${sessionId}`
    if (sessionStorage.getItem(doneKey)) {
      navigate('/dashboard', { replace: true })
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        const res = await api(
          `/api/stripe/checkout-session/${encodeURIComponent(sessionId)}?mode=${encodeURIComponent(mode)}`,
          { headers: { Authorization: `Bearer ${session.token}` } },
        )
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(formatApiError(data))
        if (cancelled) return

        addSite({
          url: data.siteUrl,
          name: data.siteName,
          platform: data.sitePlatform,
          planId: data.planId,
          yearly: !!data.yearly,
        })
        sessionStorage.setItem(doneKey, '1')
        navigate('/dashboard', { replace: true })
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not confirm payment.')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [searchParams, session, addSite, navigate])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      {error ? (
        <>
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/add-website" className="text-[#635bff] font-medium hover:underline">
            Back to Add website
          </Link>
        </>
      ) : (
        <p className="text-[#697386]">Confirming your subscription…</p>
      )}
    </div>
  )
}
