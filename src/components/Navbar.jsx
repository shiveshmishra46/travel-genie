import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  List, 
  Moon, 
  Sun, 
  Map, 
  BookmarkSimple, 
  ChatCircle, 
  Vault, 
  Users, 
  Calendar,
  MapPin,
  Warning,
  House
} from '@phosphor-icons/react'
import LogoGenie from './LogoGenie'
import { useApp } from '@/context/AppContext'
import { useAuth } from '@/context/AuthContext'
import { useIsMobile } from '@/hooks/use-mobile'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isDarkMode, toggleDarkMode, emergencyMode } = useApp()
  const { user } = useAuth()
  const isMobile = useIsMobile()

  const navItems = [
    { path: '/', label: 'Home', icon: House },
    { path: '/map', label: 'Map', icon: Map },
    { path: '/recommendations', label: 'Discover', icon: BookmarkSimple },
    { path: '/saved', label: 'Saved', icon: BookmarkSimple },
    { path: '/chat', label: 'AI Assistant', icon: ChatCircle },
    { path: '/vault', label: 'Vault', icon: Vault },
    { path: '/group', label: 'Group', icon: Users },
    { path: '/itinerary', label: 'Itinerary', icon: Calendar },
    { path: '/history', label: 'History', icon: MapPin },
    { path: '/emergency', label: 'Emergency', icon: Warning }
  ]

  const NavContent = () => (
    <div className="flex flex-col gap-4">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            location.pathname === item.path
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          <item.icon size={20} />
          <span className="font-medium">{item.label}</span>
          {item.path === '/emergency' && emergencyMode && (
            <Badge variant="destructive" className="ml-auto animate-pulse">
              Active
            </Badge>
          )}
        </Link>
      ))}
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
            <span className="text-sm font-medium">Dark Mode</span>
          </div>
          <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/">
              <LogoGenie size="md" />
            </Link>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <List size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="mt-6">
                  <LogoGenie size="lg" className="mb-8" />
                  <NavContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <LogoGenie size="lg" />
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
                {item.path === '/emergency' && emergencyMode && (
                  <Badge variant="destructive" className="ml-1 animate-pulse">
                    Active
                  </Badge>
                )}
              </Link>
            ))}
            
            <div className="flex items-center gap-2 ml-4">
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar