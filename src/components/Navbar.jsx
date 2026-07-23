import { motion } from 'framer-motion'
import Logo from './Logo'
import { useRegister } from '../context/RegisterContext'

/** Shared fade-up variant used across section animations */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

/**
 * Section headings default to light text for the full-site gradient look.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleMr,
  subtitle,
  className = '',
}) {
  return (
    <motion.div
      className={`mx-auto mb-8 max-w-3xl text-center sm:mb-10 ${className}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-orange-300 uppercase sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {titleMr && (
        <p className="mt-2 text-base font-semibold text-orange-200 sm:text-xl">
          {titleMr}
        </p>
      )}
      {subtitle && (
        <p className="mt-3 text-sm text-white/75 sm:text-lg">{subtitle}</p>
      )}
    </motion.div>
  )
}

export default function Navbar() {
  const { openRegister } = useRegister()

  const links = [
    { href: '#about', label: 'About' },
    { href: '#clubs', label: 'Clubs' },
    { href: '#community', label: 'Community' },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-5"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="inline-flex shrink-0 items-center rounded-2xl bg-white/95 px-2 py-1 shadow-md ring-1 ring-white/60 transition hover:bg-white sm:px-2.5 sm:py-1.5"
          aria-label="YOUVAN home"
        >
          <Logo variant="nav" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={openRegister}
          className="btn-glow shrink-0 rounded-full bg-gradient-to-r from-accent to-orange-500 px-3 py-2 text-xs font-semibold text-white shadow-md sm:px-4 sm:text-sm"
        >
          Join YOUVAN
        </button>
      </nav>
    </header>
  )
}
