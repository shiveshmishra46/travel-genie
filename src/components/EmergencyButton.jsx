import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Warning, 
  Phone, 
  FirstAid, 
  Shield, 
  Fire,
  Plus,
  X
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { useApp } from '@/context/AppContext'
import { useGeolocation } from '@/hooks/useGeolocation'

const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useKV('emergency-contacts', [
    { id: 1, name: 'Police', number: '100', icon: Shield, type: 'service' },
    { id: 2, name: 'Fire Brigade', number: '101', icon: Fire, type: 'service' },
    { id: 3, name: 'Ambulance', number: '108', icon: FirstAid, type: 'service' }
  ])
  const { emergencyMode, activateEmergencyMode, deactivateEmergencyMode } = useApp()
  const { location } = useGeolocation()

  const handleEmergencyCall = (contact) => {
    window.open(`tel:${contact.number}`, '_self')
  }

  const handlePanicMode = () => {
    if (emergencyMode) {
      deactivateEmergencyMode()
    } else {
      activateEmergencyMode()
      
      // Generate emergency email
      const subject = 'EMERGENCY - Immediate Assistance Required'
      const body = `This is an emergency alert from Travel Genie.

Location: ${location ? `${location.latitude}, ${location.longitude}` : 'Location unavailable'}
Time: ${new Date().toLocaleString()}
Map Link: ${location ? `https://maps.google.com?q=${location.latitude},${location.longitude}` : 'N/A'}

Please send help immediately.

This message was sent automatically by Travel Genie Emergency System.`

      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(mailtoLink)
    }
  }

  return (
    <>
      {/* Emergency Button */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`emergency-btn rounded-full w-14 h-14 shadow-lg ${
            emergencyMode ? 'active' : ''
          }`}
          size="icon"
        >
          <Warning size={24} weight="fill" className="text-white" />
        </Button>
        
        {emergencyMode && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -left-2 animate-pulse"
          >
            ACTIVE
          </Badge>
        )}
      </div>

      {/* Emergency Panel */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 md:bottom-24 md:right-6 z-50 bg-card border border-border rounded-xl shadow-xl p-4 w-80 max-w-[calc(100vw-2rem)] animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Warning size={20} className="text-destructive" />
              Emergency Services
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Panic Mode Toggle */}
          <div className="mb-4">
            <Button
              onClick={handlePanicMode}
              variant={emergencyMode ? "outline" : "destructive"}
              className="w-full"
            >
              {emergencyMode ? 'Deactivate Panic Mode' : 'ACTIVATE PANIC MODE'}
            </Button>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {emergencyMode 
                ? 'Click to turn off emergency mode' 
                : 'Sends location via email to emergency contacts'
              }
            </p>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-2">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <contact.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.number}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleEmergencyCall(contact)}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  <Phone size={14} className="mr-1" />
                  Call
                </Button>
              </div>
            ))}
          </div>

          {/* Add Custom Contact */}
          <Button
            variant="ghost"
            className="w-full mt-3 text-sm"
            onClick={() => {
              // In a real app, this would open a form to add custom contacts
              alert('Custom contact feature coming soon!')
            }}
          >
            <Plus size={16} className="mr-2" />
            Add Custom Contact
          </Button>
        </div>
      )}
    </>
  )
}

export default EmergencyButton