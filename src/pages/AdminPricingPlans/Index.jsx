import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { api, formatApiError } from '../../lib/api.js'

function isAdmin(session) {
  return Array.isArray(session?.user?.roles) && session.user.roles.includes('admin')
}

const EMPTY = {
  id: '',
  name: '',
  monthlyPrice: 0,
  yearlyPricePerMonth: 0,
  blurb: '',
  note: '',
  sortOrder: 0,
  active: true,
}

export default function AdminPricingPlans() {
  const { session } = useAuth()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState('')
  const [newPlan, setNewPlan] = useState(EMPTY)

  const authHeaders = useMemo(() => {
    const token = session?.token
    return token ? { Authorization: `Bearer ${token}` } : {}
  }, [session?.token])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const res = await api('/api/admin/pricing/plans', { headers: authHeaders })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(formatApiError(data))
      setPlans(Array.isArray(data.plans) ? data.plans : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load plans')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAdmin(session)) return
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.token])

  async function savePlan(id, payload) {
    setSavingId(id)
    setError('')
    try {
      const res = await api(`/api/admin/pricing/plans/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(formatApiError(data))
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSavingId('')
    }
  }

  if (!isAdmin(session)) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">Pricing Plans</h1>
        <p className="mt-2 text-sm text-gray-600">You don’t have access to this page.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Pricing Plans</h1>
          <p className="mt-1 text-sm text-gray-600">
            Edit plan name, price, and text. This controls the pricing shown in “Add website”.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="font-semibold text-gray-900">Existing plans</div>
          {loading ? <div className="text-sm text-gray-500">Loading…</div> : null}
        </div>

        <div className="divide-y divide-gray-200">
          {plans.map((p) => (
            <PlanRow
              key={p.id}
              plan={p}
              saving={savingId === p.id}
              onSave={(next) => savePlan(p.id, next)}
            />
          ))}
          {!loading && plans.length === 0 ? (
            <div className="px-4 py-8 text-sm text-gray-600">No plans found.</div>
          ) : null}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="font-semibold text-gray-900">Create a new plan</div>
          <p className="mt-1 text-sm text-gray-600">
            Use a stable id like <code className="px-1 py-0.5 bg-gray-100 rounded">pro</code>.
          </p>
        </div>
        <div className="p-4">
          <PlanEditor
            value={newPlan}
            onChange={setNewPlan}
            showId
          />
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              disabled={!newPlan.id.trim() || savingId === '__new__'}
              onClick={() => savePlan(newPlan.id.trim(), { ...newPlan, id: undefined })}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              Create / Update
            </button>
            <button
              type="button"
              onClick={() => setNewPlan(EMPTY)}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlanRow({ plan, saving, onSave }) {
  const [draft, setDraft] = useState(plan)

  useEffect(() => setDraft(plan), [plan])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 truncate">
            {plan.name}{' '}
            <span className="text-xs font-normal text-gray-500">
              ({plan.id})
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Active: {plan.active ? 'Yes' : 'No'} • Sort: {plan.sortOrder ?? 0}
          </div>
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={() => onSave(normalizePlanPayload(draft))}
          className="px-3 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      <div className="mt-4">
        <PlanEditor value={draft} onChange={setDraft} />
      </div>
    </div>
  )
}

function normalizePlanPayload(v) {
  return {
    name: String(v.name ?? ''),
    monthlyPrice: Number(v.monthlyPrice ?? 0),
    yearlyPricePerMonth: Number(v.yearlyPricePerMonth ?? 0),
    blurb: String(v.blurb ?? ''),
    note: String(v.note ?? ''),
    sortOrder: Number.isFinite(Number(v.sortOrder)) ? Number(v.sortOrder) : 0,
    active: !!v.active,
  }
}

function PlanEditor({ value, onChange, showId = false }) {
  const v = value ?? EMPTY
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {showId ? (
        <Field label="ID">
          <input
            value={v.id}
            onChange={(e) => onChange({ ...v, id: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="e.g. pro"
          />
        </Field>
      ) : null}

      <Field label="Name">
        <input
          value={v.name}
          onChange={(e) => onChange({ ...v, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </Field>

      <Field label="Monthly price">
        <input
          type="number"
          step="0.01"
          min="0"
          value={v.monthlyPrice}
          onChange={(e) => onChange({ ...v, monthlyPrice: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </Field>

      <Field label="Yearly price (per month)">
        <input
          type="number"
          step="0.01"
          min="0"
          value={v.yearlyPricePerMonth}
          onChange={(e) => onChange({ ...v, yearlyPricePerMonth: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </Field>

      <Field label="Blurb">
        <input
          value={v.blurb}
          onChange={(e) => onChange({ ...v, blurb: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </Field>

      <Field label="Sort order">
        <input
          type="number"
          step="1"
          value={v.sortOrder ?? 0}
          onChange={(e) => onChange({ ...v, sortOrder: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </Field>

      <Field label="Active">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={!!v.active}
            onChange={(e) => onChange({ ...v, active: e.target.checked })}
          />
          Enabled
        </label>
      </Field>

      <Field label="Note" full>
        <textarea
          value={v.note}
          onChange={(e) => onChange({ ...v, note: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-24"
        />
      </Field>
    </div>
  )
}

function Field({ label, children, full = false }) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <div className="text-xs font-medium text-gray-600 mb-1">{label}</div>
      {children}
    </div>
  )
}

