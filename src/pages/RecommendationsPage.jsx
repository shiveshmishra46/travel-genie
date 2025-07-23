import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  MagnifyingGlass, 
  Heart, 
  Star, 
  MapPin, 
  Clock,
  CurrencyDollar,
  ForkKnife,
  Building,
  GraduationCap,
  ShoppingBag,
  GameController,
  FirstAid,
  Coffee
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

const RecommendationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [openNow, setOpenNow] = useState(false)
  const [savedPlaces, setSavedPlaces] = useKV('saved-places', [])

  const categories = [
    { id: 'all', name: 'All', icon: MagnifyingGlass },
    { id: 'food', name: 'Food & Drinks', icon: ForkKnife },
    { id: 'historic', name: 'Historic', icon: Building },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'health', name: 'Health', icon: FirstAid },
    { id: 'essentials', name: 'Essentials', icon: ShoppingBag },
    { id: 'entertainment', name: 'Entertainment', icon: GameController },
    { id: 'cafes', name: 'Cafes', icon: Coffee }
  ]

  const mockPlaces = [
    {
      id: 1,
      name: 'The Heritage Cafe',
      category: 'food',
      rating: 4.5,
      price: 250,
      distance: '0.5 km',
      openNow: true,
      description: 'Cozy cafe with local cuisine and great coffee',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop',
      tags: ['Vegetarian', 'WiFi', 'Outdoor Seating']
    },
    {
      id: 2,
      name: 'City Art Museum',
      category: 'historic',
      rating: 4.8,
      price: 100,
      distance: '1.2 km',
      openNow: true,
      description: 'Modern art gallery with contemporary exhibitions',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
      tags: ['Culture', 'Photography', 'Air Conditioned']
    },
    {
      id: 3,
      name: 'Central Library',
      category: 'education',
      rating: 4.3,
      price: 0,
      distance: '0.8 km',
      openNow: false,
      description: 'Historic library with vast collection and study spaces',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      tags: ['Free', 'WiFi', 'Quiet']
    },
    {
      id: 4,
      name: 'Night Market',
      category: 'entertainment',
      rating: 4.6,
      price: 300,
      distance: '2.1 km',
      openNow: true,
      description: 'Vibrant market with food stalls and local crafts',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop',
      tags: ['Street Food', 'Shopping', 'Live Music']
    },
    {
      id: 5,
      name: 'Wellness Center',
      category: 'health',
      rating: 4.4,
      price: 500,
      distance: '1.5 km',
      openNow: true,
      description: 'Complete wellness facility with spa and fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      tags: ['Spa', 'Gym', 'Meditation']
    },
    {
      id: 6,
      name: 'Local Grocery Store',
      category: 'essentials',
      rating: 4.1,
      price: 150,
      distance: '0.3 km',
      openNow: true,
      description: 'Well-stocked store with local and international products',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      tags: ['24/7', 'Local Products', 'Delivery']
    }
  ]

  const filteredPlaces = mockPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory
    const matchesPrice = place.price >= priceRange[0] && place.price <= priceRange[1]
    const matchesRating = place.rating >= ratingFilter
    const matchesOpenNow = !openNow || place.openNow

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesOpenNow
  })

  const toggleSavePlace = (place) => {
    setSavedPlaces(prev => {
      const isAlreadySaved = prev.find(p => p.id === place.id)
      if (isAlreadySaved) {
        return prev.filter(p => p.id !== place.id)
      } else {
        return [...prev, { ...place, savedAt: new Date().toISOString() }]
      }
    })
  }

  const isPlaceSaved = (placeId) => {
    return savedPlaces.some(p => p.id === placeId)
  }

  const smartSuggestions = [
    'Food under ₹200',
    'Historic Places near me',
    'Free attractions',
    'Open now',
    'Highly rated cafes',
    'Museums with WiFi'
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <MagnifyingGlass size={32} className="text-primary" />
          Discover Places
        </h1>
        <p className="text-muted-foreground">
          Find amazing places around you with smart recommendations
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, food, activities..."
              className="pl-10"
            />
          </div>

          {/* Smart Suggestions */}
          <div className="flex flex-wrap gap-2">
            {smartSuggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <category.icon size={16} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                step={50}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Minimum Rating: {ratingFilter}★
              </label>
              <Slider
                value={[ratingFilter]}
                onValueChange={(value) => setRatingFilter(value[0])}
                max={5}
                step={0.5}
                className="mt-2"
              />
            </div>

            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                id="openNow"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="openNow" className="text-sm font-medium">
                Open Now
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {filteredPlaces.length} places found
          </h2>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="distance">Sort by Distance</SelectItem>
              <SelectItem value="price">Sort by Price</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  onClick={() => toggleSavePlace(place)}
                  size="icon"
                  variant={isPlaceSaved(place.id) ? "default" : "secondary"}
                  className="absolute top-2 right-2"
                >
                  <Heart size={16} weight={isPlaceSaved(place.id) ? "fill" : "regular"} />
                </Button>
                {!place.openNow && (
                  <Badge variant="destructive" className="absolute top-2 left-2">
                    Closed
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{place.description}</p>

                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-muted-foreground" />
                    <span>{place.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CurrencyDollar size={14} className="text-muted-foreground" />
                    <span>₹{place.price}</span>
                  </div>
                  {place.openNow && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-green-500" />
                      <span className="text-green-500">Open</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {place.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <MapPin size={14} className="mr-2" />
                    View on Map
                  </Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecommendationsPage