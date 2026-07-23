import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { fadeUp, SectionHeading } from './Navbar'

function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About YOUVAN"
          title="About YOUVAN"
          titleMr="आमच्याविषयी"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="glass mx-auto max-w-3xl rounded-[20px] p-5 sm:p-10"
        >
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-orange-500 text-white shadow-lg sm:mb-5">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-white/90 sm:space-y-4 sm:text-lg">
            <p>
              YOUVAN हे युवकांचे सामाजिक, सांस्कृतिक आणि व्यक्तिमत्व विकासासाठी
              कार्य करणारे व्यासपीठ आहे.
            </p>
            <p>
              येथे विविध महाविद्यालयांतील विद्यार्थी, तरुण व्यावसायिक आणि
              समाजासाठी काहीतरी करण्याची इच्छा असलेले युवक एकत्र येतात.
            </p>
            <p>
              आमचे उद्दिष्ट केवळ कार्यक्रम आयोजित करणे नसून, जबाबदार, सक्षम आणि
              राष्ट्राभिमानी युवा घडविणे आहे.
            </p>
            <p>
              YOUVAN मध्ये प्रत्येकाला स्वतःच्या आवडीच्या क्षेत्रात काम
              करण्याची, नवीन मित्र जोडण्याची, नेतृत्व विकसित करण्याची आणि
              समाजासाठी योगदान देण्याची संधी मिळते.
            </p>
            <p className="rounded-[16px] border-l-4 border-accent bg-white/10 p-3 text-xs text-white/85 sm:p-4 sm:text-base">
              YOUVAN हे युवकांचा समाज आणि देशासाठी प्रत्येक क्षेत्रातील
              कार्यकर्ते घडविण्याचे संघटन निर्माण करण्याचे एक व्यासपीठ आहे. हे
              व्यासपीठ युवकांना एकत्र आणून, आपल्या आवडीच्या क्षेत्रात काम
              करण्यास, एकमेकांशी संपर्कात राहण्यास व समाजासाठी सकारात्मक योगदान
              देण्यास प्रेरित करते.
            </p>
            <p className="font-semibold text-orange-200">
              प्रत्येक स्वयंसेवकाला कृती हीच युवाशक्तीची खरी ओळख असल्याची जाणीव
              करून देण्याचा आमचा प्रयत्न आहे.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
