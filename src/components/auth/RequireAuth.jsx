import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export function RequireAuth() {
  const { session } = useAuth()
  if (!session?.token) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
