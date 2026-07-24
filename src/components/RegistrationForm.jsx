import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { PartyPopper, X } from 'lucide-react'
import { INTEREST_OPTIONS } from '../data/content'
import { useRegister } from '../context/RegisterContext'
import Logo from './Logo'

const INITIAL = {
  fullName: '',
  collegeName: '',
  age: '',
  education: '',
  address: '',
  whatsapp: '',
  interests: [],
}

/** Indian mobile: 10 digits starting with 6–9 */
function isValidWhatsApp(value) {
  return /^[6-9]\d{9}$/.test(value.replace(/\D/g, ''))
}

function validateField(name, value, form) {
  switch (name) {
    case 'fullName':
      return value.trim().length < 2 ? 'कृपया पूर्ण नाव लिहा.' : ''
    case 'collegeName':
      return value.trim().length < 2 ? 'कृपया महाविद्यालयाचे नाव लिहा.' : ''
    case 'age': {
      const age = Number(value)
      if (!value || Number.isNaN(age)) return 'वय आवश्यक आहे.'
      if (age < 16 || age > 35) return 'वय १६ ते ३५ दरम्यान असावे.'
      return ''
    }
    case 'education':
      return value.trim().length < 2 ? 'कृपया शिक्षण / पात्रता लिहा.' : ''
    case 'address':
      return value.trim().length < 8 ? 'कृपया पूर्ण पत्ता लिहा.' : ''
    case 'whatsapp':
      return isValidWhatsApp(value)
        ? ''
        : 'वैध १० अंकी भारतीय मोबाइल क्रमांक लिहा.'
    case 'interests':
      return form.interests.length === 0
        ? 'किमान एक आवडीचे क्षेत्र निवडा.'
        : ''
    default:
      return ''
  }
}

function validateAll(form) {
  const errors = {}
  for (const key of Object.keys(INITIAL)) {
    const msg = validateField(key, form[key], form)
    if (msg) errors[key] = msg
  }
  return errors
}

/**
 * Registration opens as a modal when Join YOUVAN is clicked.
 * Gradient header + glass body — not a flat white page section.
 */
function RegistrationForm() {
  const { isOpen, closeRegister } = useRegister()
  const [form, setForm] = useState(INITIAL)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState(() => validateAll(INITIAL))
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setErrors(validateAll(form))
  }, [form])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [isOpen])

  // Reset transient submit state each time modal opens
  useEffect(() => {
    if (!isOpen) return
    setIsSubmitting(false)
    setShowSuccess(false)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKey(e) {
      if (e.key === 'Escape') {
        if (showSuccess) setShowSuccess(false)
        else closeRegister()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, showSuccess, closeRegister])

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors])

  function handleChange(e) {
    const { name, value, checked } = e.target

    if (name === 'interests') {
      setForm((prev) => {
        const next = checked
          ? [...prev.interests, value]
          : prev.interests.filter((c) => c !== value)
        return { ...prev, interests: next }
      })
      return
    }

    if (name === 'whatsapp') {
      setForm((prev) => ({
        ...prev,
        whatsapp: value.replace(/\D/g, '').slice(0, 10),
      }))
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const allTouched = Object.keys(INITIAL).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {},
    )
    setTouched(allTouched)

    const nextErrors = validateAll(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const apiBase = (
      import.meta.env.VITE_API_URL || 'https://youvan-backend.vercel.app'
    ).replace(/\/$/, '')

    // Payload matches backend POST /api/register + curl contract
    const payload = {
      fullName: form.fullName.trim(),
      collegeName: form.collegeName.trim(),
      age: Number(form.age),
      education: form.education.trim(),
      address: form.address.trim(),
      whatsapp: form.whatsapp,
      interests: form.interests,
    }

    setIsSubmitting(true)

    try {
      const res = await fetch(`${apiBase}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let data = null
      try {
        data = await res.json()
      } catch {
        data = null
      }

      if (!res.ok) {
        const message =
          data?.message ||
          data?.error ||
          (Array.isArray(data?.errors) && data.errors[0]?.msg) ||
          'नोंदणी अयशस्वी. पुन्हा प्रयत्न करा.'
        throw new Error(message)
      }

      toast.success(
        data?.message ||
          'नोंदणी यशस्वी! डेटा सेव्ह झाला. आम्ही लवकरच WhatsApp वर संपर्क करू.',
      )
      setShowSuccess(true)
      setForm(INITIAL)
      setTouched({})
    } catch (err) {
      const isNetwork =
        err instanceof TypeError ||
        /Failed to fetch|NetworkError/i.test(String(err?.message || ''))
      const message = isNetwork
        ? 'सर्व्हरशी कनेक्ट होऊ शकले नाही. Backend तपासा (youvan-backend.vercel.app).'
        : err.message || 'नोंदणी अयशस्वी. पुन्हा प्रयत्न करा.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleClose() {
    setShowSuccess(false)
    closeRegister()
  }

  const fieldClass =
    'mt-1.5 w-full rounded-xl border border-white/40 bg-white/90 px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/25 sm:px-4 sm:py-3'

  const errorClass = 'mt-1 text-xs font-medium text-red-200 sm:text-sm'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close registration"
            className="absolute inset-0 bg-[#0b1b4a]/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal panel — full height on mobile, centered card on desktop */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-heading"
            className="relative z-10 flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[24px] bg-gradient-to-br from-primary via-[#1e40af] to-[#0f766e] shadow-2xl sm:max-h-[90vh] sm:max-w-xl sm:rounded-[24px]"
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient header */}
            <div className="relative shrink-0 border-b border-white/15 px-4 pb-4 pt-4 sm:px-6 sm:pt-5">
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:top-4 sm:right-4"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center gap-3 pr-8 text-center">
                <div className="rounded-xl bg-white px-2.5 py-1.5 shadow-md">
                  <Logo variant="nav" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-orange-200 uppercase">
                    Registration
                  </p>
                  <h2
                    id="register-heading"
                    className="font-display mt-1 text-xl font-bold text-white sm:text-2xl"
                  >
                    YOUVAN सदस्य नोंदणी
                  </h2>
                  <p className="mt-1 text-xs text-white/75 sm:text-sm">
                    Join the youth community for nation building
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable form body */}
            <form
              id="youvan-register-form"
              onSubmit={handleSubmit}
              noValidate
              className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5"
            >
              <div className="mb-4">
                <label htmlFor="fullName" className="text-sm font-semibold text-white">
                  पूर्ण नाव <span className="text-orange-300">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass}
                  placeholder="e.g. आरव शर्मा"
                  aria-invalid={touched.fullName && !!errors.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <p className={errorClass} role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="collegeName"
                  className="text-sm font-semibold text-white"
                >
                  महाविद्यालयाचे नाव <span className="text-orange-300">*</span>
                </label>
                <input
                  id="collegeName"
                  name="collegeName"
                  type="text"
                  required
                  value={form.collegeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass}
                  placeholder="e.g. Pune University"
                  aria-invalid={touched.collegeName && !!errors.collegeName}
                />
                {touched.collegeName && errors.collegeName && (
                  <p className={errorClass} role="alert">
                    {errors.collegeName}
                  </p>
                )}
              </div>

              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="age" className="text-sm font-semibold text-white">
                    वय <span className="text-orange-300">*</span>
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    inputMode="numeric"
                    min={16}
                    max={35}
                    required
                    value={form.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass}
                    placeholder="18"
                    aria-invalid={touched.age && !!errors.age}
                  />
                  {touched.age && errors.age && (
                    <p className={errorClass} role="alert">
                      {errors.age}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="education"
                    className="text-sm font-semibold text-white"
                  >
                    शिक्षण / पात्रता <span className="text-orange-300">*</span>
                  </label>
                  <input
                    id="education"
                    name="education"
                    type="text"
                    required
                    value={form.education}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass}
                    placeholder="e.g. B.A. / B.Tech"
                    aria-invalid={touched.education && !!errors.education}
                  />
                  {touched.education && errors.education && (
                    <p className={errorClass} role="alert">
                      {errors.education}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="text-sm font-semibold text-white">
                  पूर्ण पत्ता <span className="text-orange-300">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  required
                  value={form.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${fieldClass} resize-y`}
                  placeholder="गांव / शहर, जिल्हा, राज्य, पिन"
                  aria-invalid={touched.address && !!errors.address}
                />
                {touched.address && errors.address && (
                  <p className={errorClass} role="alert">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="whatsapp" className="text-sm font-semibold text-white">
                  WhatsApp क्रमांक <span className="text-orange-300">*</span>
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-medium text-slate-500">
                    +91
                  </span>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    maxLength={10}
                    value={form.whatsapp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldClass} mt-0 pl-12`}
                    placeholder="9876543210"
                    aria-invalid={touched.whatsapp && !!errors.whatsapp}
                  />
                </div>
                {touched.whatsapp && errors.whatsapp && (
                  <p className={errorClass} role="alert">
                    {errors.whatsapp}
                  </p>
                )}
              </div>

              <fieldset className="mb-2">
                <legend className="text-sm font-semibold text-white">
                  आपल्या आवडीचे क्षेत्र निवडा{' '}
                  <span className="text-orange-300">*</span>
                </legend>
                <div className="mt-2.5 grid max-h-40 gap-2 overflow-y-auto pr-1 sm:max-h-48 sm:grid-cols-2">
                  {INTEREST_OPTIONS.map((opt) => {
                    const checked = form.interests.includes(opt.label)
                    return (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-2.5 py-2 transition ${
                          checked
                            ? 'border-accent bg-accent/25'
                            : 'border-white/25 bg-white/10 hover:bg-white/15'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="interests"
                          value={opt.label}
                          checked={checked}
                          onChange={handleChange}
                          onBlur={() =>
                            setTouched((prev) => ({ ...prev, interests: true }))
                          }
                          className="h-4 w-4 rounded border-white/40 text-accent focus:ring-accent"
                        />
                        <span className="text-xs font-medium text-white sm:text-sm">
                          <span aria-hidden="true">{opt.icon} </span>
                          {opt.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
                {touched.interests && errors.interests && (
                  <p className={errorClass} role="alert">
                    {errors.interests}
                  </p>
                )}
              </fieldset>
            </form>

            {/* Sticky submit footer */}
            <div className="shrink-0 border-t border-white/15 bg-black/15 px-4 py-3 sm:px-6 sm:py-4">
              <button
                type="submit"
                form="youvan-register-form"
                disabled={!isValid || isSubmitting}
                className="btn-glow w-full rounded-full bg-gradient-to-r from-accent via-orange-500 to-[#fbbf24] px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 disabled:shadow-none"
              >
                {isSubmitting ? 'नोंदणी होत आहे...' : 'नोंदणी करा'}
              </button>
            </div>

            {/* Nested success overlay */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center bg-[#0b1b4a]/80 p-5 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-full max-w-sm rounded-[20px] bg-gradient-to-br from-white to-orange-50 p-6 text-center shadow-2xl sm:p-8"
                    initial={{ scale: 0.9, y: 12 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                  >
                    <div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-green text-white shadow-lg"
                      aria-hidden="true"
                    >
                      <PartyPopper className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                      Welcome to YOUVAN! 🎉
                    </h3>
                    <p className="mt-3 text-sm text-muted">
                      तुमची नोंदणी प्राप्त झाली आहे. लवकरच आम्ही WhatsApp वर
                      संपर्क करू.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn-glow mt-6 w-full rounded-full bg-gradient-to-r from-primary to-green px-6 py-3 font-semibold text-white"
                      autoFocus
                    >
                      छान!
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RegistrationForm
