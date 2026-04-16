import { useEffect, useMemo, useState } from 'react'
import { Info, ChevronDown, Leaf, CheckCircle2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useSites } from '../../context/SitesContext.jsx'
import { api, formatApiError } from '../../lib/api.js'

const STRIPE_MODE = import.meta.env.VITE_STRIPE_MODE === 'live' ? 'live' : 'test'

const DEFAULT_PLANS = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPricePerMonth: 0,
    blurb: 'Standard features, 1K shared page views.',
    note: 'Great for starters, comes with a badge on your site.',
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 8,
    yearlyPricePerMonth: 7,
    blurb: 'Essential features, 8K page views, 5GB CDN.',
    note: 'Great for small business websites, portfolios, and growing blogs seeking better performance.',
  },
]

const PLATFORM_OPTIONS = [
  { value: 'wordpress', label: 'WordPress' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'magento', label: 'Magento' },
  { value: 'opencart', label: 'OpenCart' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'custom', label: 'Custom HTML / other CMS' },
  { value: 'other', label: 'Other' },
]

function tryParseUrl(raw) {
  const t = raw.trim()
  if (!t) return null
  let s = t
  if (!/^https?:\/\//i.test(s)) {
    s = `https://${s}`
  }
  try {
    return new URL(s)
  } catch {
    return null
  }
}

function defaultSiteNameFromUrl(u) {
  const host = u.hostname
  const port = u.port ? `:${u.port}` : ''
  let path = u.pathname
  if (path.length > 1) path = path.replace(/\/$/, '')
  else path = ''
  return `${host}${port}${path}`
}

export default function AddWebsite() {
  const location = useLocation()
  const navigate = useNavigate()
  const { session } = useAuth()
  const { sites, addSite } = useSites()
  const [siteUrl, setSiteUrl] = useState('')
  const [siteName, setSiteName] = useState('')
  const [siteNameManual, setSiteNameManual] = useState(false)
  const [sitePlatform, setSitePlatform] = useState('other')
  const [yearly, setYearly] = useState(true)
  const [planId, setPlanId] = useState(
    typeof location?.state?.preselectPlanId === 'string' && location.state.preselectPlanId.trim()
      ? location.state.preselectPlanId.trim()
      : 'free',
  )
  const [submitting, setSubmitting] = useState(false)
  const [plans, setPlans] = useState(DEFAULT_PLANS)
  const [showAllPlans, setShowAllPlans] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await api('/api/pricing/plans')
        const data = await res.json().catch(() => ({}))
        if (!res.ok) return
        if (!cancelled && Array.isArray(data.plans) && data.plans.length) {
          // De-dupe by id (prevents duplicated cards if the backend returns duplicates)
          const seen = new Set()
          const unique = []
          for (const p of data.plans) {
            const id = typeof p?.id === 'string' ? p.id : ''
            if (!id || seen.has(id)) continue
            seen.add(id)
            unique.push(p)
          }

          setPlans(unique)
          if (!unique.some((p) => p?.id === planId) && unique[0]?.id) {
            setPlanId(unique[0].id)
          }
        }
      } catch {
        /* keep defaults */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [planId])

  const parsedUrl = tryParseUrl(siteUrl)
  const urlValid = !!parsedUrl
  const urlAlreadyAdded = urlValid && sites.some((s) => s.url === parsedUrl.href)

  function onSiteUrlChange(value) {
    setSiteUrl(value)
    const u = tryParseUrl(value)
    if (u && !siteNameManual) {
      setSiteName(defaultSiteNameFromUrl(u))
    }
    if (!value.trim()) {
      setSiteName('')
      setSiteNameManual(false)
    }
  }

  function onSiteNameChange(value) {
    setSiteNameManual(true)
    setSiteName(value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!parsedUrl || !siteName.trim()) return
    if (urlAlreadyAdded) return

    const selectedPlan = plans.find((p) => p.id === planId)
    if (planId !== 'free' && selectedPlan) {
      if (!session?.token) {
        navigate('/login', { replace: false })
        return
      }

      setSubmitting(true)
      try {
        const res = await api('/api/stripe/checkout-session', {
          method: 'POST',
          headers: { Authorization: `Bearer ${session.token}` },
          body: JSON.stringify({
            mode: STRIPE_MODE,
            // Default to INR; backend supports 'usd' too, but user requested no custom UI.
            currency: 'inr',
            planId,
            yearly,
            appUrl: window.location.origin,
            siteUrl: parsedUrl.href,
            siteName: siteName.trim(),
            sitePlatform,
          }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(formatApiError(data))
        if (!data.url) throw new Error('No checkout URL returned')
        window.location.assign(data.url)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Checkout failed'
        // Minimal UX: send user back to dashboard with the site not created yet.
        alert(msg)
      } finally {
        setSubmitting(false)
      }
      return
    }

    setSubmitting(true)
    try {
      addSite({
        url: parsedUrl.href,
        name: siteName.trim(),
        platform: sitePlatform,
        planId,
        yearly,
      })
      navigate('/dashboard', { replace: false })
    } finally {
      setSubmitting(false)
    }
  }

  const normalizedPlans = useMemo(() => {
    // Keep ordering stable: active first (if present), then monthly price, then name.
    const arr = Array.isArray(plans) ? [...plans] : []
    arr.sort((a, b) => {
      const aActive = a?.active === false ? 0 : 1
      const bActive = b?.active === false ? 0 : 1
      if (aActive !== bActive) return bActive - aActive
      const ap = Number(a?.monthlyPrice)
      const bp = Number(b?.monthlyPrice)
      const aPrice = Number.isFinite(ap) ? ap : Number.POSITIVE_INFINITY
      const bPrice = Number.isFinite(bp) ? bp : Number.POSITIVE_INFINITY
      if (aPrice !== bPrice) return aPrice - bPrice
      return String(a?.name ?? '').localeCompare(String(b?.name ?? ''))
    })
    return arr
  }, [plans])

  const showDetails = urlValid
  const visiblePlans = showAllPlans ? normalizedPlans : normalizedPlans.slice(0, 2)
  const hasMorePlans = normalizedPlans.length > 2

  return (
    <div className="min-h-[calc(100vh-64px)] px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">Add new website</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="site-url"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2"
              >
                Site URL
                <Info size={14} className="text-gray-400" aria-hidden />
              </label>
              <div className="relative">
                <input
                  id="site-url"
                  type="text"
                  inputMode="url"
                  value={siteUrl}
                  onChange={(e) => onSiteUrlChange(e.target.value)}
                  placeholder="Please type in your website URL"
                  className={`w-full px-4 py-2.5 pr-11 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    siteUrl && (!urlValid || urlAlreadyAdded)
                      ? 'border-amber-400'
                      : 'border-gray-300'
                  }`}
                  autoComplete="url"
                  aria-invalid={siteUrl.length > 0 && !urlValid}
                />
                {urlValid ? (
                  <CheckCircle2
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600"
                    size={22}
                    aria-hidden
                  />
                ) : null}
              </div>
              {siteUrl && !urlValid ? (
                <p className="mt-1.5 text-xs text-amber-700">Enter a valid URL (e.g. https://example.com)</p>
              ) : siteUrl && urlAlreadyAdded ? (
                <p className="mt-1.5 text-xs text-amber-700">
                  The site URL has already been added to your account.
                </p>
              ) : null}
            </div>

            {showDetails ? (
              <>
                <div>
                  <label
                    htmlFor="site-name"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2"
                  >
                    Site name
                    <Info size={14} className="text-gray-400" aria-hidden />
                  </label>
                  <div className="relative">
                    <input
                      id="site-name"
                      type="text"
                      value={siteName}
                      onChange={(e) => onSiteNameChange(e.target.value)}
                      placeholder="Shown in your dashboard"
                      className="w-full px-4 py-2.5 pr-11 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      autoComplete="off"
                    />
                    {siteName.trim() ? (
                      <CheckCircle2
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600"
                        size={22}
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Pre-filled from your URL — you can edit it.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="site-platform"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2"
                  >
                    Site platform
                  </label>
                  <select
                    id="site-platform"
                    value={sitePlatform}
                    onChange={(e) => setSitePlatform(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {PLATFORM_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    Running on WordPress, Magento, or OpenCart? Select your platform from the
                    dropdown menu.
                  </p>
                </div>
              </>
            ) : null}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 mb-4">
              Choose a speed optimization subscription
            </p>
            <div className="flex items-center justify-between gap-4 mb-4">
              <button
                type="button"
                onClick={() => navigate('/pricing?from=add-website')}
                className="text-sm text-purple-600 font-medium hover:text-purple-700"
              >
                Compare features
              </button>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className={!yearly ? 'font-semibold text-gray-900' : ''}>Monthly</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={yearly}
                  onClick={() => setYearly(!yearly)}
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

            <div className="space-y-3">
              {visiblePlans.map((plan) => {
                const monthly = Number(plan.monthlyPrice)
                const yearlyPerMonth = Number(plan.yearlyPricePerMonth)
                const yearlyTotal = yearlyPerMonth * 12
                // When Yearly is selected, show the monthly price as the "cut" price (like the design),
                // and show yearly-per-month as the main price.
                const showStrike =
                  yearly &&
                  Number.isFinite(monthly) &&
                  Number.isFinite(yearlyPerMonth) &&
                  monthly > 0 &&
                  yearlyPerMonth > 0
                return (
                  <label
                    key={plan.id}
                    className={`flex gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      planId === plan.id
                        ? 'border-purple-600 bg-purple-50/50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={planId === plan.id}
                      onChange={() => setPlanId(plan.id)}
                      className="mt-1 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-semibold text-gray-900">{plan.name}</span>
                        {monthly === 0 ? (
                          <span className="text-gray-900">
                            $0<span className="text-gray-500 font-normal"> /mo</span>
                          </span>
                        ) : (
                          <>
                            {showStrike && (
                              <span className="text-gray-400 line-through text-sm">
                                ${monthly.toFixed(2)} /mo
                              </span>
                            )}
                            {yearly ? (
                              <>
                                <span className="text-gray-900">
                                  $
                                  {Number.isFinite(yearlyTotal)
                                    ? yearlyTotal.toFixed(2)
                                    : '0.00'}
                                  <span className="text-gray-500 font-normal"> /yr</span>
                                </span>
                                <span className="text-xs text-gray-500">
                                  ${Number.isFinite(yearlyPerMonth) ? yearlyPerMonth.toFixed(2) : '0.00'} /mo billed
                                  annually
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-900">
                                ${Number.isFinite(monthly) ? monthly.toFixed(2) : '0.00'}
                                <span className="text-gray-500 font-normal"> /mo</span>
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{plan.blurb}</p>
                      <PlanDetails plan={plan} />
                    </div>
                  </label>
                )
              })}
            </div>

            {/* Only show control while some plans are collapsed; hide when all cards are visible */}
            {hasMorePlans && !showAllPlans ? (
              <button
                type="button"
                onClick={() => setShowAllPlans(true)}
                className="mt-4 flex items-center gap-1 text-sm text-purple-600 font-medium hover:text-purple-700"
              >
                View more plans
                <ChevronDown size={16} className="transition-transform" />
              </button>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={submitting || !urlValid || !siteName.trim() || urlAlreadyAdded}
            className="w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Adding…' : 'Add'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
          <span className="inline-flex w-6 h-6 rounded-full border border-emerald-600/30 bg-emerald-50/80 items-center justify-center text-emerald-700">
            <Leaf size={14} strokeWidth={2} aria-hidden />
          </span>
          Every Blinkspeed purchase helps reduce the global carbon footprint.
        </p>
      </div>
    </div>
  )
}

function PlanDetails({ plan }) {
  // Supports:
  // - `plan.features` as array of strings (if backend provides)
  // - `plan.note` as newline-separated bullets (admin-editable textarea)
  const rawFeatures = Array.isArray(plan?.features) ? plan.features : null
  const note = String(plan?.note ?? '').trim()
  const lines = note
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  // Support metadata header in note:
  // @key:value lines, optional '---' separator, then features.
  let start = 0
  for (; start < lines.length; start++) {
    const line = lines[start]
    if (line === '---') {
      start++
      break
    }
    if (!line.startsWith('@')) break
  }

  const noteLines = lines
    .slice(start)
    .map((l) => l.replace(/^\s*[-•]\s*/, '').trim())
    .filter(Boolean)

  const features = rawFeatures?.length ? rawFeatures : noteLines
  if (!features?.length) return null

  return (
    <ul className="mt-2 space-y-1 text-xs text-gray-600">
      {features.map((f, idx) => (
        <li key={`${plan?.id ?? 'plan'}-${idx}`} className="flex gap-2">
          <span className="mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-purple-50 text-purple-700 flex-shrink-0">
            ✓
          </span>
          <span className="leading-relaxed">{String(f)}</span>
        </li>
      ))}
    </ul>
  )
}
