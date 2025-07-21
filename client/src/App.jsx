import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import useAppStore from './stores/appStore';

// Placeholder components for other pages
const RecommendationsPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Recommendations</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <p className="text-gray-600 dark:text-gray-400">AI-powered recommendations coming soon...</p>
    </div>
  </div>
);

const SavedPlacesPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Saved Places</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <p className="text-gray-600 dark:text-gray-400">Your saved places will appear here...</p>
    </div>
  </div>
);

const ChatPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Chat with Genie</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <p className="text-gray-600 dark:text-gray-400">AI chatbot integration coming soon...</p>
    </div>
  </div>
);

const VaultPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Document Vault</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <p className="text-gray-600 dark:text-gray-400">Secure document storage coming soon...</p>
    </div>
  </div>
);

const ChecklistPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Group Checklist</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <p className="text-gray-600 dark:text-gray-400">Group travel planning tools coming soon...</p>
    </div>
  </div>
);

const ItineraryPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Travel Itinerary</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <p className="text-gray-600 dark:text-gray-400">AI itinerary generator coming soon...</p>
    </div>
  </div>
);

const HistoryPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Location History</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <p className="text-gray-600 dark:text-gray-400">Your location history will appear here...</p>
    </div>
  </div>
);

const EmergencyPage = () => {
  const { emergencyContacts, isPanicMode, togglePanicMode } = useAppStore();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Emergency Services</h1>
        <button
          onClick={togglePanicMode}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isPanicMode
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {isPanicMode ? '🚨 PANIC MODE ON' : 'Activate Panic Mode'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyContacts.map((contact) => (
          <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{contact.name}</h3>
            <p className="text-2xl font-bold text-red-600 mb-3">{contact.number}</p>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Call Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to Travel Genie
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Continue your magical journey
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <p className="text-center text-gray-600 dark:text-gray-400">Authentication system coming soon...</p>
      </div>
    </div>
  </div>
);

const RegisterPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Join Travel Genie
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Start your adventure today
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <p className="text-center text-gray-600 dark:text-gray-400">Registration system coming soon...</p>
      </div>
    </div>
  </div>
);

function App() {
  const { isDarkMode } = useAppStore();

  // Apply theme class to body
  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="App">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="map" element={<MapPage />} />
              <Route path="recommendations" element={<RecommendationsPage />} />
              <Route path="saved" element={<SavedPlacesPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="vault" element={<VaultPage />} />
              <Route path="checklist" element={<ChecklistPage />} />
              <Route path="itinerary" element={<ItineraryPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="emergency" element={<EmergencyPage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
