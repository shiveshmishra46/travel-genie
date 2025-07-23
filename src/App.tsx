import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import { Toaster } from '@/components/ui/sonner'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import RecommendationsPage from './pages/RecommendationsPage'
import ItineraryPage from './pages/ItineraryPage'
import GroupPage from './pages/GroupPage'
import EmergencyButton from './components/EmergencyButton'
import ChatBot from './components/ChatBot'
import VoiceSearchButton from './components/VoiceSearchButton'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import { useApp } from './context/AppContext'
import { Card, CardContent } from './components/ui/card'
import { WifiX } from '@phosphor-icons/react'

// Placeholder components for other pages
const SavedPlacesPage = () => <div className="container mx-auto px-4 py-6"><h1 className="text-2xl font-bold">Saved Places</h1><p>Coming soon...</p></div>
const VaultPage = () => <div className="container mx-auto px-4 py-6"><h1 className="text-2xl font-bold">Document Vault</h1><p>Coming soon...</p></div>
const HistoryPage = () => <div className="container mx-auto px-4 py-6"><h1 className="text-2xl font-bold">Location History</h1><p>Coming soon...</p></div>
const EmergencyPage = () => <div className="container mx-auto px-4 py-6"><h1 className="text-2xl font-bold">Emergency Services</h1><p>Coming soon...</p></div>
const ChatPage = () => <div className="container mx-auto px-4 py-6"><h1 className="text-2xl font-bold">AI Assistant</h1><p>Use the floating chat button or this page for AI assistance.</p></div>

const OfflineBanner = () => {
  const isOnline = useNetworkStatus()
  
  if (isOnline) return null
  
  return (
    <Card className="fixed top-20 left-4 right-4 z-40 border-destructive bg-destructive/10">
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <WifiX size={20} className="text-destructive" />
          <div>
            <p className="font-medium text-destructive">You are offline</p>
            <p className="text-sm text-muted-foreground">Some features may not work until you reconnect</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const AppContent = () => {
  const { setIsOffline } = useApp()
  const isOnline = useNetworkStatus()
  
  // Update app offline state
  React.useEffect(() => {
    setIsOffline(!isOnline)
  }, [isOnline, setIsOffline])

  const handleVoiceTranscript = (transcript) => {
    // Handle voice search results
    console.log('Voice search:', transcript)
    // In a real app, this would trigger search or navigation
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <OfflineBanner />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/saved" element={<SavedPlacesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
        </Routes>
      </main>

      {/* Floating Action Components */}
      <EmergencyButton />
      <ChatBot />
      <VoiceSearchButton onTranscript={handleVoiceTranscript} />
      
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </AppProvider>
  )
}

export default App