import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const RegisterContext = createContext(null)

/**
 * Shared open/close for the registration modal.
 * Any "Join YOUVAN" button can call openRegister().
 */
export function RegisterProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openRegister = useCallback(() => setIsOpen(true), [])
  const closeRegister = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, openRegister, closeRegister }),
    [isOpen, openRegister, closeRegister],
  )

  return (
    <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>
  )
}

export function useRegister() {
  const ctx = useContext(RegisterContext)
  if (!ctx) {
    throw new Error('useRegister must be used within RegisterProvider')
  }
  return ctx
}
