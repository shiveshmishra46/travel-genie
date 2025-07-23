import { createContext, useContext, useState } from 'react'
import { useKV } from '@github/spark/hooks'

const AppContext = createContext(null)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useKV('travel-genie-dark-mode', false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [toast, setToast] = useState(null)

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3000)
  }

  const activateEmergencyMode = () => {
    setEmergencyMode(true)
    showToast('Emergency mode activated!', 'error')
  }

  const deactivateEmergencyMode = () => {
    setEmergencyMode(false)
    showToast('Emergency mode deactivated', 'success')
  }

  const value = {
    isDarkMode,
    isOffline,
    emergencyMode,
    toast,
    toggleDarkMode,
    showToast,
    activateEmergencyMode,
    deactivateEmergencyMode,
    setIsOffline
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}