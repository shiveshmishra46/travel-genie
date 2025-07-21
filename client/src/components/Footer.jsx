import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import useAppStore from '../stores/appStore';

const Footer = () => {
  const { isDarkMode, isOnline } = useAppStore();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Map', href: '/map' },
    { name: 'Recommendations', href: '/recommendations' },
    { name: 'Emergency', href: '/emergency' },
  ];

  const supportLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Genie Logo */}
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 via-blue-500 to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🧞</span>
              </div>
              <span className="text-lg font-bold font-display bg-gradient-to-r from-purple-600 via-blue-600 to-yellow-500 bg-clip-text text-transparent">
                Travel Genie
              </span>
            </motion.div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Your AI-powered travel companion for discovering amazing places, planning perfect trips, 
              and creating unforgettable memories. Explore the world with confidence and style.
            </p>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isOnline ? 'Online - All features available' : 'Offline - Limited features'}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <EnvelopeIcon className="w-4 h-4" />
                <span>support@travelgenie.app</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <PhoneIcon className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <GlobeAltIcon className="w-4 h-4" />
                <span>Available worldwide</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Travel Genie. All rights reserved.
            </div>

            {/* Features Badge */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPinIcon className="w-3 h-3" />
                <span>GPS Enabled</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>PWA Ready</span>
              </div>
            </div>

            {/* Made with Love */}
            <motion.div 
              className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <HeartIcon className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>for travelers</span>
            </motion.div>
          </div>
        </div>

        {/* Emergency Notice */}
        <motion.div 
          className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-700 dark:text-red-400">
              Emergency Services: Quick access available in all pages via the red emergency button
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;