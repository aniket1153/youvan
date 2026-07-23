import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CLUBS } from '../data/content'
import { fadeUp, staggerContainer, SectionHeading } from './Navbar'
import { useRegister } from '../context/RegisterContext'

function Clubs() {
  const { openRegister } = useRegister()

  return (
    <section id="clubs" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Interested Clubs"
          titleMr="आपल्या आवडीचे क्षेत्र निवडा"
          subtitle="Pick a club vibe — then plug into community action."
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {CLUBS.map((club) => (
            <motion.article
              key={club.id}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="glass group flex flex-col rounded-[20px] p-5 sm:p-7"
            >
              <div
                className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${club.gradient} text-3xl shadow-md sm:mb-5`}
                aria-hidden="true"
              >
                {club.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                {club.nameMr}
              </h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-orange-200 sm:text-sm">
                {club.tags}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/80">
                {club.description}
              </p>
              <button
                type="button"
                onClick={openRegister}
                className="btn-glow mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-orange-500 px-5 py-2.5 text-sm font-semibold text-white sm:mt-6"
                aria-label={`Join ${club.name}`}
              >
                Join Club
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Clubs
