import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  ChatCircle, 
  X, 
  PaperPlaneRight,
  Robot,
  User
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useKV('chatbot-messages', [
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your Travel Genie AI assistant. I can help you with travel recommendations, itinerary planning, packing lists, and answer any travel-related questions. How can I assist you today?",
      timestamp: new Date().toISOString()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      // Use Spark's LLM API for travel assistance
      const prompt = spark.llmPrompt`You are a helpful travel assistant. The user asked: "${message}". Provide a helpful, concise response about travel, destinations, recommendations, or travel planning. Keep responses under 150 words and be specific and actionable.`
      
      const response = await spark.llm(prompt)
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. In the meantime, you can explore the map or check out our recommendations section!",
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-36 right-4 md:bottom-24 md:right-20 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <ChatCircle size={24} weight="fill" className="text-white" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-52 right-4 md:bottom-40 md:right-20 z-50 w-80 max-w-[calc(100vw-2rem)] animate-slide-up">
          <Card className="shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Robot size={20} className="text-primary" />
                <h3 className="font-semibold">Travel Genie AI</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X size={16} />
              </Button>
            </div>

            <CardContent className="p-0">
              <ScrollArea className="h-80 p-4 custom-scrollbar">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.type === 'user' ? 'bg-primary' : 'bg-secondary'
                        }`}>
                          {msg.type === 'user' ? (
                            <User size={16} className="text-white" />
                          ) : (
                            <Robot size={16} className="text-secondary-foreground" />
                          )}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          msg.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <Robot size={16} className="text-secondary-foreground" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about travel..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!message.trim() || isLoading}
                    size="icon"
                  >
                    <PaperPlaneRight size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default ChatBot