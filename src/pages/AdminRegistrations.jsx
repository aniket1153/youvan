import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  ArrowLeft,
  RefreshCw,
  Search,
  Users,
  Lock,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react'
import Logo from '../components/Logo'

const API_BASE = (
  import.meta.env.VITE_API_URL || 'https://youvan-backend.vercel.app'
).replace(/\/$/, '')

/** Simple gate — only you know this PIN (set in .env as VITE_ADMIN_PIN) */
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || 'youvan@aniket'
const SESSION_KEY = 'youvan_admin_ok'

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return String(value)
  }
}

function normalizeList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.registrations)) return payload.registrations
  if (Array.isArray(payload?.data?.registrations)) return payload.data.registrations
  return []
}

/**
 * Secret admin page at /aniket
 * Desktop = table · Mobile = cards
 * GET https://youvan-backend.vercel.app/api/register
 */
function AdminRegistrations() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1',
  )
  const [pin, setPin] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/register`)
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Failed to load registrations')
      }
      setRows(normalizeList(data))
    } catch (err) {
      const isNetwork =
        err instanceof TypeError ||
        /Failed to fetch|NetworkError/i.test(String(err?.message || ''))
      toast.error(
        isNetwork
          ? 'Backend offline — check youvan-backend.vercel.app'
          : err.message || 'Could not load data',
      )
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (unlocked) fetchData()
  }, [unlocked, fetchData])

  function handleUnlock(e) {
    e.preventDefault()
    if (pin.trim() === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
      toast.success('Admin access granted')
    } else {
      toast.error('Wrong PIN')
    }
  }

  function handleLock() {
    sessionStorage.removeItem(SESSION_KEY)
    setUnlocked(false)
    setPin('')
    setRows([])
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => {
      const interests = Array.isArray(r.interests)
        ? r.interests.join(' ')
        : String(r.interests || '')
      return [
        r.fullName,
        r.collegeName,
        r.education,
        r.address,
        r.whatsapp,
        interests,
        r.age,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [rows, query])

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10 text-white">
        <form
          onSubmit={handleUnlock}
          className="glass w-full max-w-md rounded-[20px] p-6 sm:p-8"
        >
          <div className="mb-5 flex justify-center">
            <div className="rounded-xl bg-white px-3 py-2">
              <Logo variant="nav" />
            </div>
          </div>
          <div className="mb-4 flex items-center justify-center gap-2 text-orange-200">
            <Lock className="h-5 w-5" />
            <h1 className="font-display text-xl font-bold text-white">
              Admin Access
            </h1>
          </div>
          <p className="mb-5 text-center text-sm text-white/70">
            Enter your private PIN to view registrations.
          </p>
          <label htmlFor="admin-pin" className="text-sm font-semibold text-white">
            PIN
          </label>
          <input
            id="admin-pin"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/30 bg-white/90 px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-accent/40"
            placeholder="••••••••"
            autoFocus
          />
          <button
            type="submit"
            className="btn-glow mt-5 w-full rounded-full bg-gradient-to-r from-accent to-orange-500 py-3 font-semibold text-white"
          >
            Unlock
          </button>
          <Link
            to="/"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-3 py-5 text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="glass mb-5 rounded-[20px] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white px-2.5 py-1.5">
                <Logo variant="nav" />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold sm:text-2xl">
                  Registrations
                </h1>
                <p className="text-xs text-white/70 sm:text-sm">
                  Secret admin · /aniket
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold sm:text-sm">
                <Users className="h-4 w-4 text-orange-300" />
                {filtered.length} / {rows.length}
              </span>
              <button
                type="button"
                onClick={fetchData}
                disabled={loading}
                className="btn-glow inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm font-medium hover:bg-white/25 disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLock}
                className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-2 text-sm font-medium text-red-100 ring-1 ring-red-400/30"
              >
                <Lock className="h-4 w-4" />
                Lock
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                Site
              </Link>
            </div>
          </div>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, college, WhatsApp, interest..."
              className="w-full rounded-xl border border-white/25 bg-white/90 py-2.5 pr-3 pl-10 text-sm text-ink outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        {loading && rows.length === 0 ? (
          <p className="glass rounded-[20px] p-8 text-center text-white/80">
            Loading registrations...
          </p>
        ) : filtered.length === 0 ? (
          <p className="glass rounded-[20px] p-8 text-center text-white/80">
            No registrations found.
          </p>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {filtered.map((r) => (
                <article
                  key={r._id || r.id || `${r.whatsapp}-${r.createdAt}`}
                  className="glass rounded-[20px] p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h2 className="font-display text-base font-bold text-white">
                      {r.fullName || '—'}
                    </h2>
                    <span className="shrink-0 rounded-full bg-accent/25 px-2.5 py-0.5 text-xs font-semibold text-orange-100">
                      Age {r.age ?? '—'}
                    </span>
                  </div>

                  <ul className="space-y-2 text-sm text-white/85">
                    <li className="flex gap-2">
                      <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                      <span>{r.collegeName || '—'}</span>
                    </li>
                    <li className="flex gap-2">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                      <span>{r.education || '—'}</span>
                    </li>
                    <li className="flex gap-2">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                      <a
                        href={`https://wa.me/91${String(r.whatsapp || '').replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-2 hover:underline"
                      >
                        {r.whatsapp || '—'}
                      </a>
                    </li>
                    <li className="flex gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                      <span>{r.address || '—'}</span>
                    </li>
                    <li className="flex gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                      <span>
                        {Array.isArray(r.interests)
                          ? r.interests.join(', ')
                          : r.interests || '—'}
                      </span>
                    </li>
                    <li className="flex gap-2 text-xs text-white/60">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{formatDate(r.createdAt)}</span>
                    </li>
                  </ul>

                  {typeof r.sheetSynced === 'boolean' && (
                    <p
                      className={`mt-3 text-xs font-semibold ${
                        r.sheetSynced ? 'text-emerald-300' : 'text-amber-300'
                      }`}
                    >
                      Sheet: {r.sheetSynced ? 'Synced' : 'Not synced'}
                    </p>
                  )}
                </article>
              ))}
            </div>

            {/* Desktop table */}
            <div className="glass hidden overflow-hidden rounded-[20px] md:block">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-black/25 text-xs tracking-wide text-orange-200 uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">College</th>
                      <th className="px-4 py-3 font-semibold">Age</th>
                      <th className="px-4 py-3 font-semibold">Education</th>
                      <th className="px-4 py-3 font-semibold">WhatsApp</th>
                      <th className="px-4 py-3 font-semibold">Address</th>
                      <th className="px-4 py-3 font-semibold">Interests</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Sheet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr
                        key={r._id || r.id || `${r.whatsapp}-${i}`}
                        className="border-t border-white/10 hover:bg-white/5"
                      >
                        <td className="px-4 py-3 font-medium text-white">
                          {r.fullName || '—'}
                        </td>
                        <td className="px-4 py-3 text-white/85">
                          {r.collegeName || '—'}
                        </td>
                        <td className="px-4 py-3 text-white/85">{r.age ?? '—'}</td>
                        <td className="px-4 py-3 text-white/85">
                          {r.education || '—'}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`https://wa.me/91${String(r.whatsapp || '').replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-200 hover:underline"
                          >
                            {r.whatsapp || '—'}
                          </a>
                        </td>
                        <td className="max-w-[180px] truncate px-4 py-3 text-white/85">
                          {r.address || '—'}
                        </td>
                        <td className="max-w-[220px] px-4 py-3 text-white/85">
                          {Array.isArray(r.interests)
                            ? r.interests.join(', ')
                            : r.interests || '—'}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-white/70">
                          {formatDate(r.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          {typeof r.sheetSynced === 'boolean' ? (
                            <span
                              className={
                                r.sheetSynced
                                  ? 'text-emerald-300'
                                  : 'text-amber-300'
                              }
                            >
                              {r.sheetSynced ? 'Yes' : 'No'}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminRegistrations
