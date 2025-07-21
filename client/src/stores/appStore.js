import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme state
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // User state
      user: null,
      isAuthenticated: false,
      isGuest: true,
      setUser: (user) => set({ user, isAuthenticated: !!user, isGuest: !user }),
      logout: () => set({ user: null, isAuthenticated: false, isGuest: true }),

      // Map state
      mapCenter: [28.6139, 77.2090], // Delhi default
      mapZoom: 10,
      userLocation: null,
      markers: [],
      savedPlaces: [],
      setMapCenter: (center) => set({ mapCenter: center }),
      setMapZoom: (zoom) => set({ mapZoom: zoom }),
      setUserLocation: (location) => set({ userLocation: location }),
      addMarker: (marker) => set((state) => ({ markers: [...state.markers, marker] })),
      removeMarker: (id) => set((state) => ({ 
        markers: state.markers.filter(marker => marker.id !== id) 
      })),
      addSavedPlace: (place) => set((state) => ({ 
        savedPlaces: [...state.savedPlaces, { ...place, id: Date.now() }] 
      })),
      removeSavedPlace: (id) => set((state) => ({ 
        savedPlaces: state.savedPlaces.filter(place => place.id !== id) 
      })),

      // Search state
      searchQuery: '',
      searchResults: [],
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchResults: (results) => set({ searchResults: results }),

      // Recommendations state
      recommendations: [],
      recommendationFilters: {
        category: 'all',
        priceRange: [0, 1000],
        rating: 0,
        openNow: false,
      },
      setRecommendations: (recommendations) => set({ recommendations }),
      updateFilters: (filters) => set((state) => ({ 
        recommendationFilters: { ...state.recommendationFilters, ...filters }
      })),

      // Emergency state
      emergencyContacts: [
        { id: 1, name: 'Police', number: '100', type: 'police' },
        { id: 2, name: 'Hospital', number: '108', type: 'medical' },
        { id: 3, name: 'Fire', number: '101', type: 'fire' },
      ],
      addEmergencyContact: (contact) => set((state) => ({ 
        emergencyContacts: [...state.emergencyContacts, { ...contact, id: Date.now() }] 
      })),
      removeEmergencyContact: (id) => set((state) => ({ 
        emergencyContacts: state.emergencyContacts.filter(contact => contact.id !== id) 
      })),

      // Offline state
      isOnline: navigator.onLine,
      setOnlineStatus: (status) => set({ isOnline: status }),

      // Travel documents
      documents: [],
      addDocument: (doc) => set((state) => ({ 
        documents: [...state.documents, { ...doc, id: Date.now() }] 
      })),
      removeDocument: (id) => set((state) => ({ 
        documents: state.documents.filter(doc => doc.id !== id) 
      })),

      // Group checklist
      groupChecklist: [],
      addChecklistItem: (item) => set((state) => ({ 
        groupChecklist: [...state.groupChecklist, { ...item, id: Date.now(), completed: false }] 
      })),
      toggleChecklistItem: (id) => set((state) => ({ 
        groupChecklist: state.groupChecklist.map(item => 
          item.id === id ? { ...item, completed: !item.completed } : item
        ) 
      })),
      removeChecklistItem: (id) => set((state) => ({ 
        groupChecklist: state.groupChecklist.filter(item => item.id !== id) 
      })),

      // Location history
      locationHistory: [],
      addLocationHistory: (location) => set((state) => ({ 
        locationHistory: [{ ...location, timestamp: Date.now(), id: Date.now() }, ...state.locationHistory].slice(0, 100) 
      })),

      // Weather data
      weatherData: null,
      setWeatherData: (data) => set({ weatherData: data }),

      // Transit data
      transitData: [],
      setTransitData: (data) => set({ transitData: data }),

      // Voice search
      isListening: false,
      setListening: (status) => set({ isListening: status }),

      // Panic mode
      isPanicMode: false,
      togglePanicMode: () => set((state) => ({ isPanicMode: !state.isPanicMode })),

      // Compass mode
      compassEnabled: false,
      deviceOrientation: 0,
      toggleCompass: () => set((state) => ({ compassEnabled: !state.compassEnabled })),
      setDeviceOrientation: (orientation) => set({ deviceOrientation: orientation }),

      // Chat state
      chatMessages: [],
      addChatMessage: (message) => set((state) => ({ 
        chatMessages: [...state.chatMessages, { ...message, id: Date.now() }] 
      })),
      clearChatMessages: () => set({ chatMessages: [] }),

      // Itinerary state
      currentItinerary: null,
      itineraries: [],
      setCurrentItinerary: (itinerary) => set({ currentItinerary: itinerary }),
      addItinerary: (itinerary) => set((state) => ({ 
        itineraries: [...state.itineraries, { ...itinerary, id: Date.now() }] 
      })),

      // Notification state
      notifications: [],
      addNotification: (notification) => set((state) => ({ 
        notifications: [...state.notifications, { ...notification, id: Date.now() }] 
      })),
      removeNotification: (id) => set((state) => ({ 
        notifications: state.notifications.filter(n => n.id !== id) 
      })),
    }),
    {
      name: 'travel-genie-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isGuest: state.isGuest,
        savedPlaces: state.savedPlaces,
        emergencyContacts: state.emergencyContacts,
        documents: state.documents,
        groupChecklist: state.groupChecklist,
        locationHistory: state.locationHistory,
        compassEnabled: state.compassEnabled,
        itineraries: state.itineraries,
      }),
    }
  )
);

export default useAppStore;