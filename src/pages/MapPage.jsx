import InteractiveMap from '@/components/InteractiveMap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Map as MapIcon, 
  NavigationArrow, 
  Clock, 
  MapPin,
  Camera,
  List
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { useGeolocation } from '@/hooks/useGeolocation'

const MapPage = () => {
  const [savedRoutes, setSavedRoutes] = useKV('saved-routes', [])
  const [locationHistory, setLocationHistory] = useKV('location-history', [])
  const [viewMode, setViewMode] = useState('map')
  const { location, error } = useGeolocation()

  const mockNearbyPlaces = [
    { id: 1, name: 'Central Park', type: 'Park', distance: '0.5 km', rating: 4.5 },
    { id: 2, name: 'Coffee House', type: 'Cafe', distance: '0.3 km', rating: 4.2 },
    { id: 3, name: 'Metro Station', type: 'Transit', distance: '0.2 km', rating: 4.0 },
    { id: 4, name: 'City Museum', type: 'Culture', distance: '1.2 km', rating: 4.7 }
  ]

  const mockTransitOptions = [
    { id: 1, type: 'Bus', route: 'Route 42', eta: '5 min', destination: 'Downtown' },
    { id: 2, type: 'Metro', route: 'Blue Line', eta: '8 min', destination: 'Airport' },
    { id: 3, type: 'Taxi', route: 'Uber', eta: '3 min', destination: 'On Demand' }
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MapIcon size={32} className="text-primary" />
            Interactive Map
          </h1>
          <p className="text-muted-foreground">
            Explore locations, save places, and navigate with ease
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            onClick={() => setViewMode('map')}
            size="sm"
          >
            <MapIcon size={16} className="mr-2" />
            Map
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
            size="sm"
          >
            <List size={16} className="mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      {error && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="pt-4">
            <p className="text-destructive text-sm">
              Location access denied or unavailable. Some features may be limited.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Map */}
        <div className="lg:col-span-3">
          {viewMode === 'map' ? (
            <Card className="overflow-hidden">
              <InteractiveMap className="h-[70vh]" />
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Nearby Places</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNearbyPlaces.map((place) => (
                    <div key={place.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{place.name}</h3>
                        <p className="text-sm text-muted-foreground">{place.type}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{place.distance}</Badge>
                          <Badge variant="outline">★ {place.rating}</Badge>
                        </div>
                      </div>
                      <Button size="sm">
                        <NavigationArrow size={16} className="mr-2" />
                        Directions
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {location ? (
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Lat:</strong> {location.latitude.toFixed(6)}
                  </p>
                  <p className="text-sm">
                    <strong>Lng:</strong> {location.longitude.toFixed(6)}
                  </p>
                  <p className="text-sm">
                    <strong>Accuracy:</strong> ±{location.accuracy}m
                  </p>
                  <Badge variant="outline" className="w-full justify-center">
                    GPS Active
                  </Badge>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Location not available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Transit Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <NavigationArrow size={20} className="text-primary" />
                Transit Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTransitOptions.map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{option.type}</p>
                      <p className="text-xs text-muted-foreground">{option.route}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{option.eta}</p>
                      <p className="text-xs text-muted-foreground">{option.destination}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Camera size={16} className="mr-2" />
                Capture Map
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock size={16} className="mr-2" />
                View History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin size={16} className="mr-2" />
                Save Location
              </Button>
            </CardContent>
          </Card>

          {/* Map Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Map Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Your Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Saved Places</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Search Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Recommendations</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MapPage