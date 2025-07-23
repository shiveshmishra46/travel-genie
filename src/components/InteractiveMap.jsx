import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Crosshair, 
  Camera, 
  Compass,
  MagnifyingGlass,
  MapPin,
  Heart,
  Navigation
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { useGeolocation } from '@/hooks/useGeolocation'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const MapControls = ({ onSearch, onCenterUser, onCapture, compassMode, onToggleCompass }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-2">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search locations..."
            className="pl-10 bg-background/95 backdrop-blur-sm"
          />
        </div>
        <Button type="submit" size="icon" className="bg-primary">
          <MagnifyingGlass size={16} />
        </Button>
      </form>
      
      <div className="flex gap-2 justify-end">
        <Button
          onClick={onCenterUser}
          size="icon"
          variant="secondary"
          className="bg-background/95 backdrop-blur-sm"
        >
          <Crosshair size={16} />
        </Button>
        <Button
          onClick={onCapture}
          size="icon"
          variant="secondary"
          className="bg-background/95 backdrop-blur-sm"
        >
          <Camera size={16} />
        </Button>
        <Button
          onClick={onToggleCompass}
          size="icon"
          variant={compassMode ? "default" : "secondary"}
          className="bg-background/95 backdrop-blur-sm"
        >
          <Compass size={16} />
        </Button>
      </div>
    </div>
  )
}

const MapUpdater = ({ center, zoom }) => {
  const map = useMap()
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom())
    }
  }, [center, zoom, map])
  
  return null
}

const InteractiveMap = ({ className = '' }) => {
  const [markers, setMarkers] = useKV('map-markers', [])
  const [center, setCenter] = useState([28.6139, 77.2090]) // Delhi default
  const [zoom, setZoom] = useState(10)
  const [compassMode, setCompassMode] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const { location } = useGeolocation()
  const mapRef = useRef()

  useEffect(() => {
    if (location) {
      setCenter([location.latitude, location.longitude])
    }
  }, [location])

  const handleSearch = async (query) => {
    try {
      // Using Nominatim for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      )
      const results = await response.json()
      
      if (results.length > 0) {
        const firstResult = results[0]
        const newCenter = [parseFloat(firstResult.lat), parseFloat(firstResult.lon)]
        setCenter(newCenter)
        setZoom(15)
        setSearchResults(results)
      }
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const handleCenterUser = () => {
    if (location) {
      setCenter([location.latitude, location.longitude])
      setZoom(15)
    }
  }

  const handleCapture = () => {
    // In a real app, this would capture the map as an image
    alert('Map capture feature coming soon!')
  }

  const handleMapClick = (e) => {
    const newMarker = {
      id: Date.now(),
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      title: 'Custom Location',
      description: 'Added by click',
      saved: false,
      timestamp: new Date().toISOString()
    }
    setMarkers(prev => [...prev, newMarker])
  }

  const toggleSaveMarker = (markerId) => {
    setMarkers(prev => 
      prev.map(marker => 
        marker.id === markerId 
          ? { ...marker, saved: !marker.saved }
          : marker
      )
    )
  }

  const deleteMarker = (markerId) => {
    setMarkers(prev => prev.filter(marker => marker.id !== markerId))
  }

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg z-0"
        eventHandlers={{
          click: handleMapClick
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={center} zoom={zoom} />
        
        {/* User location marker */}
        {location && (
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Your Location</p>
                <p className="text-sm text-muted-foreground">
                  Accuracy: ±{location.accuracy}m
                </p>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Custom markers */}
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold">{marker.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{marker.description}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => toggleSaveMarker(marker.id)}
                    size="sm"
                    variant={marker.saved ? "default" : "outline"}
                    className="flex-1"
                  >
                    <Heart size={14} className="mr-1" />
                    {marker.saved ? 'Saved' : 'Save'}
                  </Button>
                  <Button
                    onClick={() => deleteMarker(marker.id)}
                    size="sm"
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Search result markers */}
        {searchResults.map((result, index) => (
          <Marker 
            key={`search-${index}`} 
            position={[parseFloat(result.lat), parseFloat(result.lon)]}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold">{result.display_name.split(',')[0]}</h3>
                <p className="text-sm text-muted-foreground">{result.display_name}</p>
                <Button
                  onClick={() => {
                    const newMarker = {
                      id: Date.now() + index,
                      lat: parseFloat(result.lat),
                      lng: parseFloat(result.lon),
                      title: result.display_name.split(',')[0],
                      description: result.display_name,
                      saved: false,
                      timestamp: new Date().toISOString()
                    }
                    setMarkers(prev => [...prev, newMarker])
                  }}
                  size="sm"
                  className="mt-2 w-full"
                >
                  <MapPin size={14} className="mr-1" />
                  Add Marker
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <MapControls
        onSearch={handleSearch}
        onCenterUser={handleCenterUser}
        onCapture={handleCapture}
        compassMode={compassMode}
        onToggleCompass={() => setCompassMode(!compassMode)}
      />
      
      {/* Status indicators */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {compassMode && (
          <Badge variant="secondary" className="bg-background/95 backdrop-blur-sm">
            <Compass size={12} className="mr-1" />
            Compass Mode
          </Badge>
        )}
        {location && (
          <Badge variant="secondary" className="bg-background/95 backdrop-blur-sm">
            <Navigation size={12} className="mr-1" />
            GPS Active
          </Badge>
        )}
      </div>
    </div>
  )
}

export default InteractiveMap