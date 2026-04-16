import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Legacy route: all upgrade flows use `/pricing` so plan cards stay consistent everywhere.
 */
export default function UpgradeSubscriptionPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/pricing', { replace: true })
  }, [navigate])

  return null
}
