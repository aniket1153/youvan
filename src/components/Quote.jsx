import { motion } from 'framer-motion'
import { Quote as QuoteIcon } from 'lucide-react'
import { fadeUp } from './Navbar'

function Quote() {
  return (
    <section id="quote" className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-accent/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-green/30 blur-3xl"
        aria-hidden="true"
      />

      <motion.blockquote
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="glass relative mx-auto max-w-2xl rounded-[20px] px-5 py-8 text-center sm:px-10 sm:py-10"
      >
        <QuoteIcon
          className="mx-auto mb-4 h-8 w-8 text-orange-300"
          aria-hidden="true"
        />
        <p className="mb-2 text-sm font-semibold tracking-wide text-orange-200 uppercase">
          एक विचार...
        </p>
        <p className="font-display text-xl font-bold leading-snug text-white sm:text-3xl">
          एकच चर्चा नाही...
          <br />
          आता कृती!
        </p>
        <p className="mt-5 text-base font-medium text-white/90 sm:text-xl">
          चला, युवा जोडूया... बदल घडवूया...
        </p>
      </motion.blockquote>
    </section>
  )
}

export default Quote
