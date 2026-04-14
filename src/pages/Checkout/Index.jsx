import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Info, Mail, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { api, formatApiError } from '../../lib/api.js'

const STRIPE_MODE = import.meta.env.VITE_STRIPE_MODE === 'live' ? 'live' : 'test'
const USD_INR_RATE = Number(import.meta.env.VITE_USD_INR_RATE ?? '96.8345')

function formatUsd(n) {
  if (!Number.isFinite(n)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n)
}

function formatInr(n) {
  if (!Number.isFinite(n)) return '₹0.00'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(n)
}

/**
 * Order summary + redirect to Stripe Checkout (card collected on Stripe; funds go to the
 * admin-connected Stripe account).
 */
export default function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { session } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [currency, setCurrency] = useState('inr')

  const draft = location.state
  useEffect(() => {
    if (draft?.error) {
      setError(draft.error)
    }
  }, [draft])

  useEffect(() => {
    if (!draft?.siteUrl || !draft?.planId || !draft?.plan) {
      navigate('/add-website', { replace: true })
    }
  }, [draft, navigate])

  const plan = draft?.plan
  const yearly = !!draft?.yearly

  const amounts = useMemo(() => {
    if (!plan) return null
    const monthly = Number(plan.monthlyPrice)
    const ypm = Number(plan.yearlyPricePerMonth)
    if (yearly) {
      const perYear = ypm * 12
      return {
        headline: perYear,
        renewal: `Then ${formatUsd(perYear)} per year. Renews automatically until cancelled.`,
        line: perYear,
        intervalLabel: 'year',
      }
    }
    return {
      headline: monthly,
      renewal: `Then ${formatUsd(monthly)} per month. Renews automatically until cancelled.`,
      line: monthly,
      intervalLabel: 'month',
    }
  }, [plan, yearly])

  const display = useMemo(() => {
    if (!amounts) return null
    const usd = amounts.headline
    if (currency === 'usd') {
      return {
        headline: formatUsd(usd),
        line: formatUsd(amounts.line),
        note: 'Prices in USD.',
      }
    }
    const inr = usd * (Number.isFinite(USD_INR_RATE) ? USD_INR_RATE : 96.8345)
    const lineInr = amounts.line * (Number.isFinite(USD_INR_RATE) ? USD_INR_RATE : 96.8345)
    return {
      headline: formatInr(inr),
      line: formatInr(lineInr),
      note: `1 USD = ${(Number.isFinite(USD_INR_RATE) ? USD_INR_RATE : 96.8345).toFixed(4)} INR (includes 4% conversion fee). Charges will vary based on exchange rates.`,
    }
  }, [amounts, currency])

  const canceled = searchParams.get('canceled') === '1'

  async function handlePay() {
    if (!draft || !plan || !session?.token) return
    setError(null)
    setSubmitting(true)
    try {
      const appUrl = window.location.origin
      const res = await api('/api/stripe/checkout-session', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.token}` },
        body: JSON.stringify({
          mode: STRIPE_MODE,
          currency,
          planId: plan.id,
          yearly,
          appUrl,
          siteUrl: draft.siteUrl,
          siteName: draft.siteName,
          sitePlatform: draft.sitePlatform,
        }),
      })
      const raw = await res.text()
      let data = {}
      try {
        data = raw ? JSON.parse(raw) : {}
      } catch {
        /* non-JSON body */
      }
      if (!res.ok) {
        throw new Error(formatApiError(data) || raw || `Request failed (${res.status})`)
      }
      if (!data.url) throw new Error('No checkout URL returned')
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (!plan || !amounts || !display) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#635bff]" aria-hidden />
      </div>
    )
  }

  const productTitle = `${plan.name} — ${yearly ? 'Yearly' : 'Monthly'} billing`
  const email = session?.user?.email ?? ''

  return (
    <div className="min-h-screen bg-white text-[#0a2540]">
      <header className="border-b border-[#e6ebf1] flex items-center justify-between px-6 py-4 sm:px-10">
        <Link
          to="/add-website"
          state={draft}
          className="text-sm font-medium text-[#635bff] hover:text-[#4a3fd4]"
        >
          ← Back
        </Link>
        <span className="text-xs font-medium text-[#697386] uppercase tracking-wide">
          Secure checkout
        </span>
      </header>

      {canceled ? (
        <div className="max-w-6xl mx-auto px-6 py-3 bg-amber-50 text-amber-900 text-sm text-center border-b border-amber-100">
          Payment was canceled. You can try again below.
        </div>
      ) : null}

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-57px)]">
        <aside className="bg-[#f7fafc] border-b lg:border-b-0 lg:border-r border-[#e6ebf1] lg:w-[46%] px-6 py-10 sm:px-10 lg:px-12">
          <h1 className="text-xl font-semibold text-[#0a2540] leading-snug">
            Subscribe to {productTitle}
          </h1>

          <p className="mt-6 text-4xl font-semibold tracking-tight text-[#0a2540]">
            {display.headline}
          </p>
          <p className="mt-2 text-sm text-[#697386]">
            {yearly
              ? `Then ${currency === 'usd' ? formatUsd(amounts.headline) : formatInr(amounts.headline * USD_INR_RATE)} per year starting next year`
              : `Then ${currency === 'usd' ? formatUsd(amounts.headline) : formatInr(amounts.headline * USD_INR_RATE)} per month starting next month`}
          </p>

          <div className="mt-8 flex gap-2">
            {['inr', 'usd'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  currency === c
                    ? 'border-[#635bff] bg-white text-[#0a2540] shadow-sm'
                    : 'border-transparent bg-white/60 text-[#697386] hover:border-[#e6ebf1]'
                }`}
              >
                <span className="text-base" aria-hidden>
                  {c === 'inr' ? '🇮🇳' : '🇺🇸'}
                </span>
                {c.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#697386] leading-relaxed">{display.note}</p>

          <div className="mt-10 border-t border-[#e6ebf1] pt-8">
            <div className="flex justify-between gap-4 text-sm">
              <div>
                <p className="font-medium text-[#0a2540]">{productTitle}</p>
                <p className="mt-1 text-[#697386] text-xs leading-relaxed">{plan.blurb}</p>
              </div>
              <p className="font-medium text-[#0a2540] shrink-0 tabular-nums">
                {display.line}
              </p>
            </div>

            <div className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between text-[#697386]">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#0a2540]">{display.line}</span>
              </div>
              <div className="flex justify-between items-center text-[#697386]">
                <span className="inline-flex items-center gap-1">
                  Tax
                  <Info className="w-3.5 h-3.5 text-[#a3acb9]" aria-hidden />
                </span>
                <span className="text-xs">Calculated at checkout</span>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-baseline border-t border-[#e6ebf1] pt-6">
              <span className="text-base font-semibold text-[#0a2540]">Total due today</span>
              <span className="text-xl font-semibold tabular-nums text-[#0a2540]">
                {display.headline}
              </span>
            </div>
          </div>
        </aside>

        <section className="flex-1 bg-white px-6 py-10 sm:px-10 lg:px-14">
          <div className="max-w-md mx-auto space-y-8">
            <div>
              <h2 className="text-base font-semibold text-[#0a2540] mb-3">Contact</h2>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3acb9]"
                  aria-hidden
                />
                <input
                  readOnly
                  value={email}
                  className="w-full rounded-md border border-[#e6ebf1] bg-[#f7fafc] py-2.5 pl-10 pr-3 text-sm text-[#0a2540]"
                />
              </div>
            </div>

            <div className="rounded-lg border border-[#e6ebf1] bg-[#f7fafc] p-4 text-sm text-[#697386]">
              Card and billing details are entered on Stripe Checkout so your payment is processed
              securely. Funds are paid to the workspace connected by your administrator in Stripe{' '}
              {STRIPE_MODE === 'live' ? '(live)' : '(test)'} mode.
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="button"
              disabled={submitting || !session?.token}
              onClick={handlePay}
              className="w-full rounded-md bg-[#635bff] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 text-[15px] shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                  Redirecting…
                </>
              ) : (
                'Continue to payment'
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
