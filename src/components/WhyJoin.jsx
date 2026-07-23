import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { WHY_JOIN } from '../data/content'
import { fadeUp, staggerContainer, SectionHeading } from './Navbar'

function WhyJoin() {
  return (
    <section id="why" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Why Join YOUVAN?"
          titleMr="YOUVAN मध्ये का सहभागी व्हावे?"
        />

        <motion.ul
          className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {WHY_JOIN.map((item) => (
            <motion.li
              key={item}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="glass flex items-start gap-3 rounded-[20px] px-4 py-3.5 sm:py-4"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-green"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-white sm:text-base">
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default WhyJoin
