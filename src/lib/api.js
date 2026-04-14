/**
 * Base URL for the API (no trailing slash), without a duplicate /api suffix.
 * Set VITE_API_URL to the API origin only, e.g. http://localhost:3000 — not http://localhost:3000/api
 */
function normalizeApiBase() {
  let base = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/$/, '')
  if (base.endsWith('/api')) {
    base = base.slice(0, -4)
  }
  return base
}

export function apiUrl(path) {
  if (path.startsWith('http')) return path
  const p = path.startsWith('/') ? path : `/${path}`
  return `${normalizeApiBase()}${p}`
}

export async function api(path, options = {}) {
  return fetch(apiUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
}

export function formatApiError(data) {
  if (Array.isArray(data.message)) return data.message.join(', ')
  if (typeof data.message === 'string') return data.message
  return 'Request failed'
}
