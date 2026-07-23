import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import Logo from './Logo'
import { useRegister } from '../context/RegisterContext'

function Footer() {
  const { openRegister } = useRegister()

  const social = [
    {
      href: 'https://wa.me/',
      label: 'WhatsApp Community',
      icon: FaWhatsapp,
      hover: 'hover:bg-[#25D366]',
    },
    {
      href: 'mailto:hello@youvan.in',
      label: 'Email',
      icon: FaEnvelope,
      hover: 'hover:bg-accent',
    },
    {
      href: 'https://instagram.com',
      label: 'Instagram',
      icon: FaInstagram,
      hover: 'hover:bg-pink-600',
    },
    {
      href: 'https://facebook.com',
      label: 'Facebook',
      icon: FaFacebook,
      hover: 'hover:bg-blue-600',
    },
    {
      href: 'https://youtube.com',
      label: 'YouTube',
      icon: FaYoutube,
      hover: 'hover:bg-red-600',
    },
  ]

  return (
    <footer className="relative border-t border-white/15 px-4 py-12 sm:px-6 sm:py-14">
      <div className="glass mx-auto max-w-6xl rounded-[20px] p-6 sm:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="inline-flex rounded-[16px] bg-white px-3 py-2 shadow-md">
              <Logo variant="footer" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Youth Organized and United with Vision and Action for Nation
              Building
            </p>
            <p className="mt-2 text-xs font-medium text-orange-300">
              in association with PRAYAN
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
              <FaMapMarkerAlt className="h-4 w-4 text-accent" aria-hidden="true" />
              Maharashtra, India
            </p>
            <button
              type="button"
              onClick={openRegister}
              className="btn-glow mt-5 rounded-full bg-gradient-to-r from-accent to-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Join YOUVAN
            </button>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide text-orange-300 uppercase">
              Connect
            </p>
            <ul className="flex flex-wrap gap-3">
              {social.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={
                        item.href.startsWith('mailto')
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className={`btn-glow inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition ${item.hover}`}
                      aria-label={item.label}
                      title={item.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                )
              })}
            </ul>
            <a
              href="mailto:hello@youvan.in"
              className="mt-4 inline-block text-sm text-white/75 underline-offset-4 hover:text-white hover:underline"
            >
              hello@youvan.in
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-white/15 pt-5 text-center text-xs text-white/55 md:text-left">
          Copyright © 2026 YOUVAN · Youth Community for Nation Building
        </p>
      </div>
    </footer>
  )
}

export default Footer
