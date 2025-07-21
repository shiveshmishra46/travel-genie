import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BookmarkIcon,
  CameraIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import {
  Navigation,
  Layers,
  Compass,
  Route,
  Car,
  Truck,
  User
} from 'lucide-react';
import useAppStore from '../stores/appStore';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color = 'blue', icon = '📍') => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${icon}</div>`,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

// Component to handle map events
const MapEventHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

// Component to center map on user location
const LocationFinder = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  
  return null;
};

const MapPage = () => {
  const {
    mapCenter,
    mapZoom,
    userLocation,
    markers,
    savedPlaces,
    isDarkMode,
    compassEnabled,
    deviceOrientation,
    setMapCenter,
    setMapZoom,
    setUserLocation,
    addMarker,
    removeMarker,
    addSavedPlace,
    addLocationHistory,
    setDeviceOrientation
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [mapStyle, setMapStyle] = useState('streets');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCompass, setShowCompass] = useState(false);
  const mapRef = useRef(null);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = [latitude, longitude];
          setUserLocation(location);
          setMapCenter(location);
          addLocationHistory({
            lat: latitude,
            lng: longitude,
            address: 'Current Location'
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Delhi if geolocation fails
          const defaultLocation = [28.6139, 77.2090];
          setUserLocation(defaultLocation);
          setMapCenter(defaultLocation);
        }
      );
    }
  };

  // Search for places using Nominatim API
  const searchPlaces = async (query) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    searchPlaces(searchQuery);
  };

  // Handle map click
  const handleMapClick = (latlng) => {
    const newMarker = {
      id: Date.now(),
      lat: latlng.lat,
      lng: latlng.lng,
      title: 'Custom Marker',
      type: 'custom'
    };
    addMarker(newMarker);
  };

  // Select search result
  const selectSearchResult = (result) => {
    const location = [parseFloat(result.lat), parseFloat(result.lon)];
    setMapCenter(location);
    setSelectedLocation({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      title: result.display_name,
      address: result.display_name
    });
    setSearchResults([]);
    setSearchQuery('');
  };

  // Save current location
  const saveLocation = (location) => {
    addSavedPlace({
      lat: location.lat,
      lng: location.lng,
      title: location.title || 'Saved Location',
      address: location.address || '',
      savedAt: new Date().toISOString()
    });
  };

  // Get map tiles based on style and theme
  const getMapTiles = () => {
    const baseUrls = {
      streets: isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
    };
    
    return baseUrls[mapStyle] || baseUrls.streets;
  };

  // Handle device orientation for compass
  useEffect(() => {
    if (compassEnabled && 'DeviceOrientationEvent' in window) {
      const handleOrientation = (event) => {
        if (event.alpha !== null) {
          setDeviceOrientation(event.alpha);
        }
      };

      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [compassEnabled, setDeviceOrientation]);

  // Initialize location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Calculate route (mock implementation)
  const calculateRoute = async (from, to, vehicle = 'car') => {
    // This would typically use OpenRouteService API
    // For now, showing mock data
    const distance = Math.sqrt(
      Math.pow(to.lat - from.lat, 2) + Math.pow(to.lng - from.lng, 2)
    ) * 111; // Rough km conversion
    
    const speeds = { car: 50, bike: 25, walk: 5 };
    const time = (distance / speeds[vehicle]) * 60; // minutes
    
    setRouteInfo({
      distance: distance.toFixed(1),
      time: Math.round(time),
      vehicle
    });
  };

  // Take screenshot of map
  const takeMapScreenshot = async () => {
    if (mapRef.current) {
      try {
        // This would use html2canvas or similar library
        console.log('Screenshot taken');
      } catch (error) {
        console.error('Screenshot error:', error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Map Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mr-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places, addresses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              {isSearching && (
                <div className="absolute right-3 top-2.5 w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              )}
            </div>
            
            {/* Search Results */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto"
                >
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => selectSearchResult(result)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {result.display_name.split(',')[0]}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {result.display_name}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Map Controls */}
          <div className="flex items-center space-x-2">
            {/* Location Button */}
            <motion.button
              onClick={getCurrentLocation}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation className="w-5 h-5" />
            </motion.button>

            {/* Map Style Selector */}
            <select
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="streets">Streets</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
            </select>

            {/* Compass Toggle */}
            <motion.button
              onClick={() => setShowCompass(!showCompass)}
              className={`p-2 rounded-lg transition-colors ${
                showCompass 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="w-5 h-5" />
            </motion.button>

            {/* Screenshot Button */}
            <motion.button
              onClick={takeMapScreenshot}
              className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CameraIcon className="w-5 h-5" />
            </motion.button>

            {/* Fullscreen Toggle */}
            <motion.button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Layers className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Route Info */}
        <AnimatePresence>
          {routeInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-400">
                      {routeInfo.distance} km
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-400">
                      {routeInfo.time} min
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setRouteInfo(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear Route
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Container */}
      <div className={`flex-1 relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        <MapContainer
          ref={mapRef}
          center={mapCenter}
          zoom={mapZoom}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            url={getMapTiles()}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapEventHandler onMapClick={handleMapClick} />
          <LocationFinder position={userLocation} />

          {/* User Location Marker */}
          {userLocation && (
            <Marker 
              position={userLocation} 
              icon={createCustomIcon('#3b82f6', '👤')}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">Your Location</h3>
                  <p className="text-sm text-gray-600">Current position</p>
                  <button
                    onClick={() => saveLocation({
                      lat: userLocation[0],
                      lng: userLocation[1],
                      title: 'My Current Location'
                    })}
                    className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    Save Location
                  </button>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Custom Markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon('#ef4444', '📍')}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{marker.title}</h3>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveLocation(marker)}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => removeMarker(marker.id)}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Selected Location Marker */}
          {selectedLocation && (
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={createCustomIcon('#10b981', '🎯')}
            >
              <Popup>
                <div className="p-2 max-w-xs">
                  <h3 className="font-semibold">{selectedLocation.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{selectedLocation.address}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveLocation(selectedLocation)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      <BookmarkIcon className="w-3 h-3 inline mr-1" />
                      Save
                    </button>
                    {userLocation && (
                      <button
                        onClick={() => calculateRoute(
                          { lat: userLocation[0], lng: userLocation[1] },
                          selectedLocation
                        )}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                      >
                        <Route className="w-3 h-3 inline mr-1" />
                        Route
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Saved Places Markers */}
          {savedPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              icon={createCustomIcon('#8b5cf6', '⭐')}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{place.title}</h3>
                  <p className="text-xs text-gray-600">{place.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Saved {new Date(place.savedAt).toLocaleDateString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Compass Overlay */}
        <AnimatePresence>
          {showCompass && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-4 right-4 z-10"
            >
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <div
                  className="text-2xl transition-transform duration-300"
                  style={{ transform: `rotate(${deviceOrientation}deg)` }}
                >
                  🧭
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col space-y-2">
          <button
            onClick={() => {
              const newZoom = mapZoom + 1;
              setMapZoom(newZoom);
            }}
            className="w-10 h-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 flex items-center justify-center font-bold"
          >
            +
          </button>
          <button
            onClick={() => {
              const newZoom = mapZoom - 1;
              setMapZoom(newZoom);
            }}
            className="w-10 h-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 flex items-center justify-center font-bold"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;