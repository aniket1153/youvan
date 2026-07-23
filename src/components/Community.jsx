import { motion } from 'framer-motion'
import { ACTIVITIES } from '../data/content'
import { fadeUp, staggerContainer, SectionHeading } from './Navbar'

function Community() {
  return (
    <section id="community" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Community Activities"
          titleMr="आमचे कार्यक्षेत्र"
          subtitle="Serve society across every sector that matters."
        />

        <motion.div
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {ACTIVITIES.map((item) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="glass rounded-[20px] p-4 sm:p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white/25 to-white/5 text-2xl shadow-sm ring-1 ring-white/30"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <h3 className="font-display text-base font-bold text-white sm:text-lg">
                  {item.name}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-white/75 sm:text-sm">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Community
