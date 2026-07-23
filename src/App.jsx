import { RegisterProvider } from './context/RegisterContext'
import Hero from './components/Hero'
import About from './components/About'
import MissionVision from './components/MissionVision'
import Quote from './components/Quote'
import WhyJoin from './components/WhyJoin'
import Clubs from './components/Clubs'
import Community from './components/Community'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'

/**
 * Full-site gradient canvas + Join YOUVAN opens registration modal.
 */
function App() {
  return (
    <RegisterProvider>
      <div className="min-h-screen overflow-x-hidden text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>

        <Hero />

        <main id="main">
          <About />
          <MissionVision />
          <Quote />
          <WhyJoin />
          <Clubs />
          <Community />
        </main>

        <Footer />

        {/* Modal registration — opened by Join YOUVAN / Join Club */}
        <RegistrationForm />
      </div>
    </RegisterProvider>
  )
}

export default App
