import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'
import { fadeUp, staggerContainer, SectionHeading } from './Navbar'

const items = [
  {
    icon: Target,
    title: 'Mission',
    titleMr: 'आमचे ध्येय',
    body: 'समाजासाठी कार्य करणारे, जबाबदार, सकारात्मक विचारांचे आणि नेतृत्वक्षम युवक तयार करणे.',
    accent: 'from-accent to-orange-500',
  },
  {
    icon: Eye,
    title: 'Vision',
    titleMr: 'आमची दृष्टी',
    body: 'प्रत्येक शहरात आणि प्रत्येक महाविद्यालयात समाजासाठी कार्य करणारे युवकांचे सक्षम नेटवर्क निर्माण करणे.',
    accent: 'from-green to-emerald-400',
  },
]

function MissionVision() {
  return (
    <section id="mission" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Mission & Vision"
          titleMr="ध्येय आणि दृष्टी"
          subtitle="Guiding every meetup, club, and community action."
        />

        <motion.div
          className="grid gap-4 sm:gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="glass rounded-[20px] p-5 sm:p-7"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-orange-200">
                  {item.titleMr}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                  {item.body}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default MissionVision
