import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { getEffectivePlanId, useSites } from '../../context/SitesContext.jsx'
import { api, formatApiError } from '../../lib/api.js'

const STRIPE_MODE = import.meta.env.VITE_STRIPE_MODE === 'live' ? 'live' : 'test'

function normalizePlans(plans) {
  const arr = Array.isArray(plans) ? [...plans] : []
  // Customer pricing: hide inactive plans.
  const filtered = arr.filter((p) => p?.active !== false)
  filtered.sort((a, b) => {
    const ap = Number(a?.monthlyPrice)
    const bp = Number(b?.monthlyPrice)
    const aPrice = Number.isFinite(ap) ? ap : Number.POSITIVE_INFINITY
    const bPrice = Number.isFinite(bp) ? bp : Number.POSITIVE_INFINITY
    if (aPrice !== bPrice) return aPrice - bPrice
    return String(a?.name ?? '').localeCompare(String(b?.name ?? ''))
  })
  return filtered
}

function featuresFromPlan(plan) {
  return parsePlanNote(plan).features
}

function parsePlanNote(plan) {
  const rawFeatures = Array.isArray(plan?.features) ? plan.features : null
  if (rawFeatures?.length) {
    return { meta: {}, features: rawFeatures.map((x) => String(x)).filter(Boolean) }
  }

  const note = String(plan?.note ?? '').trim()
  if (!note) return { meta: {}, features: [] }

  const lines = note
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const meta = {}
  let i = 0
  for (; i < lines.length; i++) {
    const line = lines[i]
    if (line === '---') {
      i++
      break
    }
    if (!line.startsWith('@')) break
    const m = /^@([a-zA-Z0-9_]+)\s*:\s*(.*)$/.exec(line)
    if (!m) break
    const key = m[1]
    const raw = m[2]
    meta[key] = raw
  }

  if (typeof meta.mostPopular === 'string') {
    meta.mostPopular = /^(1|true|yes)$/i.test(meta.mostPopular.trim())
  }
  for (const k of ['websites', 'pageviews', 'cdnGB', 'teamMembers']) {
    if (typeof meta[k] === 'string') {
      const n = Number(String(meta[k]).replace(/[^0-9.]/g, ''))
      if (Number.isFinite(n)) meta[k] = n
    }
  }

  const features = lines
    .slice(i)
    .map((l) => l.replace(/^\s*[-•]\s*/, '').trim())
    .filter(Boolean)

  // Back-compat: if there was no meta and no separator, treat the entire note as a single feature.
  if (!features.length && lines.length && !lines[0].startsWith('@')) {
    return { meta: {}, features: [note] }
  }

  return { meta, features }
}

export default function PricingPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { session } = useAuth()
  const { currentSite, setSitePlan, ready: sitesReady } = useSites()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [yearly, setYearly] = useState(true)
  const [submittingPlanId, setSubmittingPlanId] = useState('')

  const currentPlanId = getEffectivePlanId(currentSite)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const res = await api('/api/pricing/plans')
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(formatApiError(data))
        if (!cancelled) setPlans(Array.isArray(data.plans) ? data.plans : [])
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load plans')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const ordered = useMemo(() => normalizePlans(plans), [plans])

  const currentPlanDisplayName = useMemo(() => {
    const cur = String(currentPlanId || 'free').toLowerCase()
    const match = ordered.find((p) => String(p?.id ?? '').toLowerCase() === cur)
    if (match?.name?.trim()) return match.name.trim()
    const id = currentPlanId || 'free'
    if (id === 'free') return 'Free'
    return id.charAt(0).toUpperCase() + id.slice(1)
  }, [ordered, currentPlanId])

  const allowChooseFree = useMemo(() => {
    const sp = new URLSearchParams(location.search)
    return sp.get('from') === 'add-website'
  }, [location.search])

  /** Monthly list price for the user's current plan (for Upgrade / Downgrade labels). */
  const currentPlanMonthly = useMemo(() => {
    const cur = String(currentPlanId || 'free').toLowerCase()
    const p = ordered.find((x) => String(x?.id ?? '').toLowerCase() === cur)
    const n = Number(p?.monthlyPrice)
    return Number.isFinite(n) ? n : 0
  }, [ordered, currentPlanId])

  function planIndexInOrdered(planId) {
    const id = String(planId || 'free').toLowerCase()
    return ordered.findIndex((x) => String(x?.id ?? '').toLowerCase() === id)
  }

  function actionButtonLabel(plan, isCurrent) {
    if (!sitesReady || !currentSite) return 'Choose'
    if (isCurrent) return 'Choose'
    const curId = String(currentPlanId || 'free').toLowerCase()
    const pid = String(plan?.id ?? '').toLowerCase()
    if (pid === curId) return 'Choose'

    const curIdx = planIndexInOrdered(currentPlanId)
    const planIdx = planIndexInOrdered(plan?.id)
    if (curIdx >= 0 && planIdx >= 0) {
      if (planIdx < curIdx) return 'Downgrade'
      if (planIdx > curIdx) return 'Upgrade'
    }

    const pm = Number(plan?.monthlyPrice)
    const planMonthly = Number.isFinite(pm) ? pm : 0
    if (planMonthly < currentPlanMonthly) return 'Downgrade'
    if (planMonthly > currentPlanMonthly) return 'Upgrade'
    return 'Choose'
  }

  async function handleChoose(plan) {
    if (!plan || !currentSite) {
      navigate('/add-website')
      return
    }

    if (plan.id === 'free') {
      if (allowChooseFree) {
        navigate('/add-website', { state: { preselectPlanId: 'free' } })
        return
      }
      // Downgrade from a paid plan to Free directly on this page
      if (currentPlanId !== 'free') {
        setSitePlan(currentSite.id, 'free')
        setError(null)
        return
      }
      setError('Select a website above, or open pricing from Add website → Compare features.')
      return
    }

    if (!session?.token) {
      navigate('/login', { replace: false })
      return
    }

    setSubmittingPlanId(plan.id)
    setError('')
    try {
      const res = await api('/api/stripe/checkout-session', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.token}` },
        body: JSON.stringify({
          mode: STRIPE_MODE,
          currency: 'inr',
          planId: plan.id,
          yearly,
          appUrl: window.location.origin,
          siteUrl: currentSite.url,
          siteName: currentSite.name,
          sitePlatform: currentSite.platform,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(formatApiError(data))
      if (!data.url) throw new Error('No checkout URL returned')
      window.location.assign(data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed')
    } finally {
      setSubmittingPlanId('')
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] px-6 py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-purple-700 font-medium hover:text-purple-800"
      >
        ← Back
      </button>

      <div className="mt-6">
        {currentSite ? (
          <>
            <h1 className="text-xl font-bold text-gray-900">
              Your current plan:{' '}
              <span className="text-purple-700">{currentPlanDisplayName}</span>
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Compare plans below to change or upgrade your subscription.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-gray-900">Choose your subscription</h1>
            <p className="mt-1 text-sm text-gray-600">
              Add a website first to show your current plan here.
            </p>
          </>
        )}

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-xs text-gray-600">
            {currentSite?.hostLabel ? (
              <>
                Website: <span className="font-semibold text-gray-900">{currentSite.hostLabel}</span>
              </>
            ) : (
              <>Select a website to upgrade.</>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className={!yearly ? 'font-semibold text-gray-900' : ''}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={yearly}
              onClick={() => setYearly((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                yearly ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  yearly ? 'translate-x-5' : ''
                }`}
              />
            </button>
            <span className={yearly ? 'font-semibold text-gray-900' : ''}>
              Yearly (Save up to 18%)
            </span>
          </div>
        </div>
      </div>

      {error ? <div className="mt-6 text-sm text-red-600">{error}</div> : null}

      {loading || !sitesReady ? (
        <div className="mt-10 text-sm text-gray-600">Loading…</div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {ordered.map((plan) => {
            const isCurrent =
              String(plan?.id ?? '').toLowerCase() === String(currentPlanId || 'free').toLowerCase()
            const canChoose =
              !!currentSite &&
              (plan?.id !== 'free' ||
                allowChooseFree ||
                currentPlanId !== 'free')
            const parsed = parsePlanNote(plan)
            const btnLabel = actionButtonLabel(plan, isCurrent)

            const monthly = Number(plan?.monthlyPrice)
            const yearlyPerMonth = Number(plan?.yearlyPricePerMonth)
            const yearlyTotal = yearlyPerMonth * 12
            const showStrike =
              yearly &&
              Number.isFinite(monthly) &&
              Number.isFinite(yearlyPerMonth) &&
              monthly > 0 &&
              yearlyPerMonth > 0

            return (
              <div
                key={plan.id}
                className={`rounded-xl border bg-white p-5 flex flex-col ${
                  isCurrent ? 'border-purple-300 bg-purple-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{plan?.name ?? plan?.id}</div>
                    <div className="text-sm text-gray-600">{plan?.blurb ?? ''}</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {parsed?.meta?.mostPopular ? (
                      <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-900 font-semibold">
                        Most popular
                      </span>
                    ) : null}
                    {isCurrent ? (
                      <span className="text-[11px] px-2 py-1 rounded-full bg-purple-100 text-purple-800 font-semibold">
                        Current
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    {yearly ? (
                      <>
                        {showStrike ? (
                          <span className="text-sm text-gray-400 line-through">
                            ${monthly.toFixed(2)}
                          </span>
                        ) : null}
                        <span className="text-3xl font-bold text-gray-900 tabular-nums">
                          $
                          {Number.isFinite(yearlyPerMonth)
                            ? yearlyPerMonth.toFixed(2)
                            : '0.00'}
                        </span>
                        <span className="text-sm text-gray-500">/month</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-gray-900 tabular-nums">
                          ${Number.isFinite(monthly) ? monthly.toFixed(2) : '0.00'}
                        </span>
                        <span className="text-sm text-gray-500">/month</span>
                      </>
                    )}
                  </div>

                  {yearly && Number.isFinite(yearlyTotal) && yearlyTotal > 0 ? (
                    <div className="mt-1 text-xs text-gray-500">
                      ${yearlyTotal.toFixed(2)} /yr billed annually
                    </div>
                  ) : null}
                </div>

                <div className="mt-5">
                  {isCurrent ? (
                    <button
                      type="button"
                      disabled
                      aria-current="true"
                      className="w-full rounded-md py-2.5 text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-200 cursor-default"
                    >
                      Current plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!canChoose || submittingPlanId === plan.id || !currentSite}
                      onClick={() => handleChoose(plan)}
                      className={`w-full rounded-md py-2.5 text-sm font-medium transition-colors ${
                        canChoose && submittingPlanId !== plan.id
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {submittingPlanId === plan.id ? 'Redirecting…' : btnLabel}
                    </button>
                  )}

                  {!currentSite ? (
                    <div className="mt-2 text-[11px] text-gray-500">
                      Add/select a website first.
                    </div>
                  ) : isCurrent ? null : plan?.id === 'free' ? (
                    <div className="mt-2 text-[11px] text-gray-500">
                      {allowChooseFree
                        ? 'Select Free to go back to Add website.'
                        : currentPlanId !== 'free'
                          ? 'Switch this website to the Free plan (no payment).'
                          : null}
                    </div>
                  ) : null}
                </div>

                <PlanMetrics meta={parsed.meta} />

                <div className="mt-6 border-t border-gray-100 pt-4">
                  <PlanFeatures plan={plan} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function PlanFeatures({ plan }) {
  const features = featuresFromPlan(plan)
  if (!features.length) return null
  return (
    <ul className="space-y-2 text-sm text-gray-700">
      {features.map((f, idx) => (
        <li key={`${plan?.id ?? 'plan'}-${idx}`} className="flex gap-2">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-50 text-purple-700 flex-shrink-0">
            ✓
          </span>
          <span className="leading-relaxed">{f}</span>
        </li>
      ))}
    </ul>
  )
}

function PlanMetrics({ meta }) {
  const websites = Number(meta?.websites)
  const pageviews = Number(meta?.pageviews)
  const cdnGB = Number(meta?.cdnGB)
  const teamMembers = Number(meta?.teamMembers)

  const has =
    Number.isFinite(websites) ||
    Number.isFinite(pageviews) ||
    Number.isFinite(cdnGB) ||
    Number.isFinite(teamMembers)

  if (!has) return null

  const fmtInt = (n) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)

  return (
    <div className="mt-5 text-xs text-gray-600">
      {Number.isFinite(websites) ? (
        <div className="font-medium text-gray-700">For {fmtInt(websites)} website{websites === 1 ? '' : 's'}</div>
      ) : null}
      <div className="mt-2 space-y-1">
        {Number.isFinite(pageviews) ? (
          <div>
            <span className="font-semibold text-gray-800">{fmtInt(pageviews)}</span> /mo pageviews
          </div>
        ) : null}
        {Number.isFinite(cdnGB) ? (
          <div>
            <span className="font-semibold text-gray-800">{fmtInt(cdnGB)}</span> GB /mo CDN traffic
          </div>
        ) : null}
        {Number.isFinite(teamMembers) ? (
          <div>
            <span className="font-semibold text-gray-800">{fmtInt(teamMembers)}</span> team member{teamMembers === 1 ? '' : 's'}
          </div>
        ) : null}
      </div>
    </div>
  )
}

