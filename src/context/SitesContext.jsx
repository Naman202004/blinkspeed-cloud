import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const STORAGE_KEY = 'blinkspeed_sites_v1'

/** @typedef {{ id: string, url: string, hostLabel: string, name: string, platform: string, planId: string, yearly: boolean, subscriptionId?: string | null, expiresAt?: string | null, createdAt: string }} Site */

const DEFAULT_PLAN_ID = 'free'

/** Paid plans only count after Stripe checkout saved a subscription id (or plan is free). */
export function getEffectivePlanId(site) {
  if (!site) return DEFAULT_PLAN_ID
  const raw =
    typeof site.planId === 'string' && site.planId.trim() ? site.planId.trim() : DEFAULT_PLAN_ID
  if (raw === DEFAULT_PLAN_ID) return DEFAULT_PLAN_ID
  const sub =
    typeof site.subscriptionId === 'string' && site.subscriptionId.trim()
      ? site.subscriptionId.trim()
      : null
  if (!sub) return DEFAULT_PLAN_ID
  return raw
}

function normalizeSites(rawSites) {
  const sites = Array.isArray(rawSites) ? rawSites : []
  const now = Date.now()
  return sites.map((s) => {
    const planId = typeof s?.planId === 'string' && s.planId.trim() ? s.planId : DEFAULT_PLAN_ID
    const expiresAt = typeof s?.expiresAt === 'string' ? s.expiresAt : null
    const expired = expiresAt ? Date.parse(expiresAt) <= now : false
    if (planId !== DEFAULT_PLAN_ID && expired) {
      return {
        ...s,
        planId: DEFAULT_PLAN_ID,
        yearly: false,
        subscriptionId: null,
        expiresAt: null,
      }
    }
    // Stale data: paid plan in localStorage but never completed checkout (no Stripe subscription)
    const sub =
      typeof s?.subscriptionId === 'string' && s.subscriptionId.trim()
        ? s.subscriptionId.trim()
        : null
    if (planId !== DEFAULT_PLAN_ID && !sub) {
      return {
        ...s,
        planId: DEFAULT_PLAN_ID,
        yearly: false,
        subscriptionId: null,
        expiresAt: null,
      }
    }
    return { ...s, planId, expiresAt }
  })
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { sites: [], currentSiteId: null }
    const data = JSON.parse(raw)
    return {
      sites: normalizeSites(data.sites),
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
    const url = payload.url.trim()
    let selectId = null
    setSites((prev) => {
      const existing = prev.find((s) => s.url === url)
      if (existing) {
        selectId = existing.id
        // Update existing site plan/subscription if provided.
        const nextPlanId =
          typeof payload.planId === 'string' && payload.planId.trim()
            ? payload.planId.trim()
            : existing.planId || DEFAULT_PLAN_ID
        const nextYearly = !!payload.yearly
        const nextSubId =
          typeof payload.subscriptionId === 'string' ? payload.subscriptionId : existing.subscriptionId ?? null
        const nextExpiresAt =
          typeof payload.expiresAt === 'string' ? payload.expiresAt : existing.expiresAt ?? null
        return prev.map((s) =>
          s.id === existing.id
            ? {
                ...s,
                name: payload.name?.trim() ? payload.name.trim() : s.name,
                platform: payload.platform ?? s.platform,
                planId: nextPlanId,
                yearly: nextYearly,
                subscriptionId: nextSubId,
                expiresAt: nextExpiresAt,
              }
            : s,
        )
      }
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `site-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      const hostLabel = hostLabelFromUrl(url)
      const planId =
        typeof payload.planId === 'string' && payload.planId.trim()
          ? payload.planId.trim()
          : DEFAULT_PLAN_ID
      const yearly = !!payload.yearly
      const site = {
        id,
        url,
        hostLabel,
        name: payload.name.trim(),
        platform: payload.platform,
        planId,
        yearly,
        subscriptionId: typeof payload.subscriptionId === 'string' ? payload.subscriptionId : null,
        expiresAt: typeof payload.expiresAt === 'string' ? payload.expiresAt : null,
        createdAt: new Date().toISOString(),
      }
      selectId = id
      return [...prev, site]
    })
    if (selectId) setCurrentSiteId(selectId)
    return selectId ? { id: selectId } : null
  }, [])

  const downgradeExpired = useCallback(() => {
    const now = Date.now()
    setSites((prev) =>
      prev.map((s) => {
        const planId = typeof s?.planId === 'string' && s.planId.trim() ? s.planId : DEFAULT_PLAN_ID
        if (planId === DEFAULT_PLAN_ID) return { ...s, planId }
        const expiresAt = typeof s?.expiresAt === 'string' ? s.expiresAt : null
        if (expiresAt && Date.parse(expiresAt) <= now) {
          return {
            ...s,
            planId: DEFAULT_PLAN_ID,
            yearly: false,
            subscriptionId: null,
            expiresAt: null,
          }
        }
        return { ...s, planId, expiresAt }
      }),
    )
  }, [])

  // Auto-downgrade expired plans while the app is open.
  useEffect(() => {
    if (!ready) return
    downgradeExpired()
    const id = setInterval(() => downgradeExpired(), 60 * 60 * 1000) // hourly
    return () => clearInterval(id)
  }, [ready, downgradeExpired])

  const setCurrentSite = useCallback((id) => {
    setCurrentSiteId(id)
  }, [])

  /** Set plan for a site (e.g. downgrade to Free). Clears subscription fields when moving to Free. */
  const setSitePlan = useCallback((siteId, planId) => {
    const pid =
      typeof planId === 'string' && planId.trim() ? planId.trim() : DEFAULT_PLAN_ID
    setSites((prev) =>
      prev.map((s) => {
        if (s.id !== siteId) return s
        if (pid === DEFAULT_PLAN_ID) {
          return {
            ...s,
            planId: DEFAULT_PLAN_ID,
            yearly: false,
            subscriptionId: null,
            expiresAt: null,
          }
        }
        return { ...s, planId: pid }
      }),
    )
  }, [])

  const value = useMemo(
    () => ({
      sites,
      currentSiteId,
      currentSite,
      addSite,
      setCurrentSite,
      setSitePlan,
      downgradeExpired,
      ready,
    }),
    [sites, currentSiteId, currentSite, addSite, setCurrentSite, setSitePlan, downgradeExpired, ready],
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
