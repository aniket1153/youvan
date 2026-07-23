import { motion } from 'framer-motion'
import { Users, HeartHandshake } from 'lucide-react'
import Navbar, { fadeUp } from './Navbar'
import Logo from './Logo'
import { useRegister } from '../context/RegisterContext'

/**
 * Hero — brand-first with Join YOUVAN opening the registration modal.
 */
function Hero() {
  const { openRegister } = useRegister()

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <Navbar />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          animate={{ y: [0, 28, 0], x: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-16 top-32 h-80 w-80 rounded-full bg-green/35 blur-3xl"
          animate={{ y: [0, -26, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary-light/30 blur-2xl"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:px-6 sm:pb-24 sm:pt-28">
        <motion.p
          className="mb-4 text-[10px] font-semibold tracking-[0.18em] text-orange-200 uppercase sm:text-sm"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          in association with PRAYAN
        </motion.p>

        <motion.div
          className="rounded-[20px] bg-white px-4 py-3 shadow-2xl shadow-black/30 sm:px-8 sm:py-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.05 }}
        >
          <Logo variant="hero" />
        </motion.div>

        <h1 className="sr-only">YOUVAN — Youth for Bharat</h1>

        <motion.p
          className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-white/95 sm:mt-4 sm:text-lg"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.12 }}
        >
          युवकांनी एकत्र येऊन, समाजासाठी आणि राष्ट्रासाठी काम करण्याचा नवा
          प्रवास.
        </motion.p>

        <motion.p
          className="mt-4 max-w-3xl text-xs font-semibold leading-snug text-orange-200 sm:mt-5 sm:text-base"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.18 }}
        >
          &ldquo;युवा Organized and United with Vision and Action for Nation
          Building&rdquo;
        </motion.p>

        <motion.p
          className="mt-4 max-w-2xl text-xs leading-relaxed text-white/80 sm:mt-6 sm:text-base"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.24 }}
        >
          Join a community where students, young professionals, artists, gamers,
          trekkers, entrepreneurs and volunteers come together to learn, serve
          society and create positive change.
        </motion.p>

        <motion.div
          className="mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <button
            type="button"
            onClick={openRegister}
            className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/35 sm:px-8 sm:text-base"
          >
            <Users className="h-5 w-5" aria-hidden="true" />
            Join YOUVAN
          </button>
          <button
            type="button"
            onClick={openRegister}
            className="btn-glow inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 sm:px-8 sm:text-base"
          >
            <HeartHandshake className="h-5 w-5" aria-hidden="true" />
            Become a Volunteer
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
