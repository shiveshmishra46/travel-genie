import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../stores/appStore';

const MainLayout = () => {
  const { isPanicMode, isOnline } = useAppStore();

  // Monitor online/offline status
  React.useEffect(() => {
    const handleOnline = () => useAppStore.getState().setOnlineStatus(true);
    const handleOffline = () => useAppStore.getState().setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${
      isPanicMode ? 'bg-red-50 dark:bg-red-900/10' : 'bg-gray-50 dark:bg-gray-900'
    }`}>
      <Header />
      
      {/* Offline Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-medium"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-yellow-900 rounded-full animate-pulse" />
              <span>You are offline – some features may not work</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panic Mode Banner */}
      <AnimatePresence>
        {isPanicMode && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-red-600 text-white px-4 py-3 text-center font-medium animate-pulse"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-ping" />
              <span className="text-lg">🚨 PANIC MODE ACTIVATED 🚨</span>
              <div className="w-3 h-3 bg-white rounded-full animate-ping" />
            </div>
            <p className="text-sm mt-1 opacity-90">
              Emergency services have been notified. Stay calm and safe.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;