import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const STORAGE_KEY = 'blinkspeed_sites_v1'

/** @typedef {{ id: string, url: string, hostLabel: string, name: string, platform: string, planId: string, yearly: boolean, createdAt: string }} Site */

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { sites: [], currentSiteId: null }
    const data = JSON.parse(raw)
    return {
      sites: Array.isArray(data.sites) ? data.sites : [],
      currentSiteId: data.currentSiteId ?? null,
    }
  } catch {
    return { sites: [], currentSiteId: null }
  }
}

function saveState(sites, currentSiteId) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ sites, currentSiteId }),
    )
  } catch {
    /* ignore quota */
  }
}

export function hostLabelFromUrl(urlString) {
  const t = urlString.trim()
  if (!t) return ''
  let s = t
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`
  try {
    const u = new URL(s)
    const port = u.port
    const host = u.hostname
    if (
      port &&
      port !== '80' &&
      port !== '443' &&
      !(port === '443' && u.protocol === 'https:')
    ) {
      return `${host}:${port}`
    }
    return host
  } catch {
    return t.slice(0, 48)
  }
}

const SitesContext = createContext(null)

export function SitesProvider({ children }) {
  const [sites, setSites] = useState([])
  const [currentSiteId, setCurrentSiteId] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const { sites: s, currentSiteId: id } = loadState()
    setSites(s)
    setCurrentSiteId(id)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    saveState(sites, currentSiteId)
  }, [sites, currentSiteId, ready])

  const currentSite = useMemo(
    () => sites.find((x) => x.id === currentSiteId) ?? null,
    [sites, currentSiteId],
  )

  const addSite = useCallback((payload) => {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `site-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    const url = payload.url.trim()
    const hostLabel = hostLabelFromUrl(url)
    const site = {
      id,
      url,
      hostLabel,
      name: payload.name.trim(),
      platform: payload.platform,
      planId: payload.planId,
      yearly: !!payload.yearly,
      createdAt: new Date().toISOString(),
    }
    setSites((prev) => [...prev, site])
    setCurrentSiteId(id)
    return site
  }, [])

  const setCurrentSite = useCallback((id) => {
    setCurrentSiteId(id)
  }, [])

  const value = useMemo(
    () => ({
      sites,
      currentSiteId,
      currentSite,
      addSite,
      setCurrentSite,
      ready,
    }),
    [sites, currentSiteId, currentSite, addSite, setCurrentSite, ready],
  )

  return (
    <SitesContext.Provider value={value}>{children}</SitesContext.Provider>
  )
}

export function useSites() {
  const ctx = useContext(SitesContext)
  if (!ctx) {
    throw new Error('useSites must be used within SitesProvider')
  }
  return ctx
}
