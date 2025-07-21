import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapIcon, 
  BookmarkIcon, 
  ChatBubbleLeftIcon,
  ClockIcon,
  ShieldExclamationIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  SunIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import useAppStore from '../stores/appStore';

const HomePage = () => {
  const { 
    user, 
    isAuthenticated, 
    savedPlaces, 
    weatherData, 
    userLocation,
    recommendations 
  } = useAppStore();

  const quickActions = [
    {
      title: 'Explore Map',
      description: 'Find amazing places near you',
      icon: MapIcon,
      href: '/map',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Get Recommendations',
      description: 'AI-powered place suggestions',
      icon: SparklesIcon,
      href: '/recommendations',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Chat with Genie',
      description: 'Ask travel questions',
      icon: ChatBubbleLeftIcon,
      href: '/chat',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Plan Itinerary',
      description: 'Create your perfect trip',
      icon: ClockIcon,
      href: '/itinerary',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'Emergency Help',
      description: 'Quick access to emergency services',
      icon: ShieldExclamationIcon,
      href: '/emergency',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      title: 'Group Checklist',
      description: 'Plan with friends and family',
      icon: UserGroupIcon,
      href: '/checklist',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ];

  const stats = [
    { label: 'Saved Places', value: savedPlaces.length, icon: BookmarkIcon },
    { label: 'Recommendations', value: recommendations.length, icon: SparklesIcon },
    { label: 'Countries Available', value: '195+', icon: GlobeAltIcon },
    { label: 'Emergency Contacts', value: '24/7', icon: ShieldExclamationIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Main Genie Logo and Title */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <motion.div
                  className="relative"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-blue-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white text-4xl">🧞</span>
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <div>
                  <h1 className="text-6xl md:text-8xl font-bold font-display bg-gradient-to-r from-purple-600 via-blue-600 to-yellow-500 bg-clip-text text-transparent">
                    Travel Genie
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                    Your AI-Powered Travel Companion
                  </p>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Discover amazing places, plan perfect trips, and explore the world with confidence. 
                Your magical journey starts here! ✨
              </motion.p>

              {/* Welcome Message */}
              {isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg border border-white/20"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome back, {user?.name || 'Traveler'}! 👋
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ready for your next adventure? Let's explore what's waiting for you.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg border border-white/20"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to explore? 🌍
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Join thousands of travelers discovering amazing places every day
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/register"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      to="/map"
                      className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      Explore as Guest
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-32 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-40"
            animate={{ 
              y: [0, 30, 0],
              x: [0, -15, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-3 h-3 bg-yellow-400 rounded-full opacity-50"
            animate={{ 
              y: [0, -15, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What would you like to do?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose from our powerful travel tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Link
                    to={action.href}
                    className={`block ${action.bgColor} backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 h-full`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by AI Magic ✨
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the future of travel planning with our advanced AI features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 text-center border border-blue-200 dark:border-blue-800"
            >
              <SparklesIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Smart Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized place suggestions based on your preferences and travel history
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center border border-purple-200 dark:border-purple-800"
            >
              <ChatBubbleLeftIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                AI Travel Assistant
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Chat with our AI genie for instant travel advice, tips, and local insights
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 text-center border border-green-200 dark:border-green-800"
            >
              <ClockIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Auto Itinerary
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate perfect travel plans automatically based on your destination and duration
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to start your magical journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of travelers who trust Travel Genie for their adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/map"
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Exploring Now
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Create Free Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;