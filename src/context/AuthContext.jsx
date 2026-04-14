import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { api, formatApiError } from '../lib/api.js'

const STORAGE_KEY = 'blinkspeed_cloud_session'

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [session, setSessionState] = useState(loadSession)

  const setSession = useCallback((next) => {
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    setSessionState(next)
  }, [])

  const logout = useCallback(() => setSession(null), [setSession])

  const login = useCallback(
    async (email, password) => {
      let res
      try {
        res = await api('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : 'Network error'
        throw new Error(
          `${msg}. Is the API running and reachable? (Dev: Vite proxies /api to the Nest server.)`,
        )
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(formatApiError(data))
      if (!data.access_token) {
        throw new Error('Login response missing token')
      }
      setSession({ token: data.access_token, user: data.user })
    },
    [setSession],
  )

  const signup = useCallback(
    async ({ email, password, fullName }) => {
      let res
      try {
        res = await api('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            fullName: fullName || undefined,
          }),
        })
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : 'Network error'
        throw new Error(
          `${msg}. Is the API running and reachable? (Dev: leave VITE_API_URL empty to use the Vite /api proxy.)`,
        )
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(formatApiError(data))
      if (!data.access_token) {
        throw new Error('Registration response missing token')
      }
      setSession({ token: data.access_token, user: data.user })
    },
    [setSession],
  )

  const value = useMemo(
    () => ({ session, login, signup, logout, setSession }),
    [session, login, signup, logout, setSession],
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
