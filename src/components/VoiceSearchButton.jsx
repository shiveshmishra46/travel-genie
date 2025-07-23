import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicrophoneSlash } from '@phosphor-icons/react'
import { useVoiceSearch } from '@/hooks/useVoiceSearch'
import { Badge } from '@/components/ui/badge'

const VoiceSearchButton = ({ onTranscript }) => {
  const { isListening, transcript, error, startListening, stopListening } = useVoiceSearch()

  const handleClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Handle transcript changes
  useState(() => {
    if (transcript && onTranscript) {
      onTranscript(transcript)
    }
  }, [transcript])

  return (
    <div className="fixed bottom-52 right-4 md:bottom-40 md:right-36 z-50">
      <div className="relative">
        <Button
          onClick={handleClick}
          className={`rounded-full w-12 h-12 shadow-lg transition-all duration-200 ${
            isListening 
              ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
              : 'bg-accent hover:bg-accent/90'
          }`}
          size="icon"
        >
          {isListening ? (
            <MicrophoneSlash size={20} className="text-white" />
          ) : (
            <Mic size={20} className="text-white" />
          )}
        </Button>
        
        {isListening && (
          <Badge 
            variant="secondary" 
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap animate-pulse"
          >
            Listening...
          </Badge>
        )}
        
        {error && (
          <Badge 
            variant="destructive" 
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs"
          >
            Error
          </Badge>
        )}
      </div>
    </div>
  )
}

export default VoiceSearchButton