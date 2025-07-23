import { createContext, useContext, useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useKV('travel-genie-user', null)
  const [isLoading, setIsLoading] = useState(false)
  const [sessions, setSessions] = useKV('travel-genie-sessions', [])

  const login = async (credentials) => {
    setIsLoading(true)
    try {
      // Mock login for demo - in real app would call API
      const mockUser = {
        id: Date.now(),
        username: credentials.username,
        email: credentials.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.username}`,
        isVerified: true,
        twoFactorEnabled: false,
        createdAt: new Date().toISOString()
      }
      
      const session = {
        id: Date.now(),
        device: navigator.userAgent,
        location: 'Current Location',
        lastActive: new Date().toISOString(),
        current: true
      }
      
      setUser(mockUser)
      setSessions(prev => [...prev.filter(s => !s.current), session])
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    setIsLoading(true)
    try {
      // Mock registration
      const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
        isVerified: false,
        twoFactorEnabled: false,
        createdAt: new Date().toISOString()
      }
      
      setUser(newUser)
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    setSessions([])
  }

  const logoutFromDevice = async (sessionId) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId))
  }

  const value = {
    user,
    isLoading,
    sessions,
    login,
    register,
    logout,
    logoutFromDevice,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}