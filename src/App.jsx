import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HomePage from './pages/HomePage'
import AdminRegistrations from './pages/AdminRegistrations'

/**
 * Routes:
 * /        → public YOUVAN site
 * /aniket  → secret admin registrations (PIN gated)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aniket" element={<AdminRegistrations />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </BrowserRouter>
  )
}

export default App
