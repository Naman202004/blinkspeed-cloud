import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

/** Redirects to dashboard when already signed in (login/register). */
export function GuestOnly({ children }) {
  const { session } = useAuth()
  if (session?.token) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}
