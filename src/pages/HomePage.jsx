import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Map, 
  BookmarkSimple, 
  ChatCircle, 
  Vault, 
  Users, 
  Calendar,
  MapPin,
  Warning,
  Sparkles,
  ArrowRight,
  Globe,
  Shield,
  Lightning
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useApp } from '@/context/AppContext'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { user } = useAuth()
  const { emergencyMode } = useApp()

  const features = [
    {
      icon: Map,
      title: 'Interactive Map',
      description: 'Explore locations, get directions, and save your favorite places',
      path: '/map',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: ChatCircle,
      title: 'AI Assistant',
      description: 'Get personalized travel recommendations and instant help',
      path: '/chat',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: BookmarkSimple,
      title: 'Discover Places',
      description: 'Find restaurants, attractions, and hidden gems nearby',
      path: '/recommendations',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: 'Plan Itinerary',
      description: 'Create perfect travel plans with AI-powered suggestions',
      path: '/itinerary',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Users,
      title: 'Group Planning',
      description: 'Collaborate with friends on shared checklists and plans',
      path: '/group',
      color: 'bg-pink-500',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: Vault,
      title: 'Document Vault',
      description: 'Securely store your travel documents and tickets',
      path: '/vault',
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ]

  const stats = [
    { label: 'Locations Explored', value: '1M+', icon: Globe },
    { label: 'Travelers Helped', value: '50K+', icon: Users },
    { label: 'AI Recommendations', value: '99%', icon: Sparkles },
    { label: 'Security Rating', value: 'A+', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles size={64} className="text-primary animate-float" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Your AI-Powered Travel Companion
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover amazing places, plan perfect trips, and travel with confidence using our intelligent assistant
            </p>
            
            {emergencyMode && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-6"
              >
                <Badge variant="destructive" className="text-lg px-4 py-2 animate-pulse">
                  <Warning size={20} className="mr-2" />
                  Emergency Mode Active
                </Badge>
              </motion.div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link to="/map">
                  <Map size={20} className="mr-2" />
                  Explore Map
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/chat">
                  <ChatCircle size={20} className="mr-2" />
                  Ask AI Assistant
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <stat.icon size={32} className="mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Travel Smart</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From planning to exploring, we've got all the tools to make your journey unforgettable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={feature.path}>
                      Get Started
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Welcome Message for Users */}
      {user && (
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={user.avatar} 
                    alt={user.username}
                    className="w-16 h-16 rounded-full border-2 border-primary"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">Welcome back, {user.username}! 👋</h3>
                    <p className="text-muted-foreground">
                      Ready for your next adventure? Your saved places and trip plans are waiting for you.
                    </p>
                  </div>
                  <Button asChild>
                    <Link to="/saved">
                      <BookmarkSimple size={16} className="mr-2" />
                      View Saved
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning size={24} className="text-accent" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Jump right into your most-used features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button asChild variant="outline" className="h-20 flex-col gap-2">
                  <Link to="/map">
                    <MapPin size={24} />
                    <span className="text-sm">Find Places</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2">
                  <Link to="/recommendations">
                    <BookmarkSimple size={24} />
                    <span className="text-sm">Discover</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2">
                  <Link to="/itinerary">
                    <Calendar size={24} />
                    <span className="text-sm">Plan Trip</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2">
                  <Link to="/emergency">
                    <Warning size={24} />
                    <span className="text-sm">Emergency</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage