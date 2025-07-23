import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Plus, 
  Share, 
  Check, 
  Clock,
  User,
  Link as LinkIcon,
  Copy,
  Trash2
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/context/AuthContext'

const GroupPage = () => {
  const [checklists, setChecklists] = useKV('group-checklists', [])
  const [newChecklistName, setNewChecklistName] = useState('')
  const [newItemText, setNewItemText] = useState('')
  const { user } = useAuth()

  const createChecklist = () => {
    if (!newChecklistName.trim()) return
    
    const newChecklist = {
      id: Date.now(),
      name: newChecklistName,
      createdBy: user?.username || 'Anonymous',
      createdAt: new Date().toISOString(),
      shareId: Math.random().toString(36).substr(2, 9),
      members: [user?.username || 'Anonymous'],
      items: [],
      isPublic: true
    }
    
    setChecklists(prev => [newChecklist, ...prev])
    setNewChecklistName('')
  }

  const addItem = (checklistId) => {
    if (!newItemText.trim()) return
    
    const newItem = {
      id: Date.now(),
      text: newItemText,
      completed: false,
      addedBy: user?.username || 'Anonymous',
      addedAt: new Date().toISOString(),
      completedBy: null,
      completedAt: null
    }
    
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId 
        ? { ...checklist, items: [...checklist.items, newItem] }
        : checklist
    ))
    setNewItemText('')
  }

  const toggleItem = (checklistId, itemId) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            items: checklist.items.map(item => 
              item.id === itemId 
                ? {
                    ...item,
                    completed: !item.completed,
                    completedBy: !item.completed ? (user?.username || 'Anonymous') : null,
                    completedAt: !item.completed ? new Date().toISOString() : null
                  }
                : item
            )
          }
        : checklist
    ))
  }

  const deleteItem = (checklistId, itemId) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId 
        ? { ...checklist, items: checklist.items.filter(item => item.id !== itemId) }
        : checklist
    ))
  }

  const deleteChecklist = (checklistId) => {
    setChecklists(prev => prev.filter(checklist => checklist.id !== checklistId))
  }

  const shareChecklist = (checklist) => {
    const shareUrl = `${window.location.origin}/group/shared/${checklist.shareId}`
    navigator.clipboard.writeText(shareUrl)
    alert('Share link copied to clipboard!')
  }

  const getCompletionPercentage = (items) => {
    if (items.length === 0) return 0
    const completed = items.filter(item => item.completed).length
    return Math.round((completed / items.length) * 100)
  }

  const mockSharedChecklists = [
    {
      id: 'shared-1',
      name: 'Bali Trip Essentials',
      createdBy: 'sarah_travels',
      members: ['sarah_travels', 'mike_explorer', 'jenny_wanderer'],
      items: [
        { id: 1, text: 'Sunscreen SPF 50+', completed: true, completedBy: 'sarah_travels' },
        { id: 2, text: 'Underwater camera', completed: false },
        { id: 3, text: 'Travel adapter', completed: true, completedBy: 'mike_explorer' },
        { id: 4, text: 'Beach towels', completed: false },
        { id: 5, text: 'Snorkeling gear', completed: true, completedBy: 'jenny_wanderer' }
      ],
      isShared: true
    }
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users size={32} className="text-primary" />
            Group Planning
          </h1>
          <p className="text-muted-foreground">
            Collaborate with friends on shared travel checklists
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-accent">
              <Plus size={16} className="mr-2" />
              New Checklist
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Group Checklist</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Checklist Name</label>
                <Input
                  value={newChecklistName}
                  onChange={(e) => setNewChecklistName(e.target.value)}
                  placeholder="e.g., Weekend Trip to Mountains"
                />
              </div>
              
              <Button 
                onClick={createChecklist}
                disabled={!newChecklistName.trim()}
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                Create Checklist
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="my-lists" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-lists">My Checklists</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
        </TabsList>

        <TabsContent value="my-lists" className="space-y-6">
          {checklists.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No group checklists yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first collaborative checklist to organize group trips
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus size={16} className="mr-2" />
                      Create Your First Checklist
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Group Checklist</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Checklist Name</label>
                        <Input
                          value={newChecklistName}
                          onChange={(e) => setNewChecklistName(e.target.value)}
                          placeholder="e.g., Weekend Trip to Mountains"
                        />
                      </div>
                      
                      <Button 
                        onClick={createChecklist}
                        disabled={!newChecklistName.trim()}
                        className="w-full"
                      >
                        <Plus size={16} className="mr-2" />
                        Create Checklist
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {checklists.map((checklist) => (
                <Card key={checklist.id} className="h-fit">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{checklist.name}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            {checklist.createdBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {new Date(checklist.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{getCompletionPercentage(checklist.items)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${getCompletionPercentage(checklist.items)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => shareChecklist(checklist)}
                          size="sm"
                          variant="outline"
                        >
                          <Share size={14} />
                        </Button>
                        <Button
                          onClick={() => deleteChecklist(checklist.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Add new item */}
                    <div className="flex gap-2">
                      <Input
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="Add new item..."
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addItem(checklist.id)
                          }
                        }}
                      />
                      <Button
                        onClick={() => addItem(checklist.id)}
                        disabled={!newItemText.trim()}
                        size="sm"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    
                    {/* Items list */}
                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                      {checklist.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => toggleItem(checklist.id, item.id)}
                          />
                          <span className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {item.text}
                          </span>
                          {item.completed && (
                            <Badge variant="outline" className="text-xs">
                              ✓ {item.completedBy}
                            </Badge>
                          )}
                          <Button
                            onClick={() => deleteItem(checklist.id, item.id)}
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      ))}
                      
                      {checklist.items.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No items yet. Add your first item above!
                        </p>
                      )}
                    </div>
                    
                    {/* Members */}
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-2">Members ({checklist.members.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {checklist.members.map((member) => (
                          <Badge key={member} variant="secondary">
                            <User size={12} className="mr-1" />
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="shared" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockSharedChecklists.map((checklist) => (
              <Card key={checklist.id} className="h-fit">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        {checklist.name}
                        <Badge variant="outline" className="text-xs">
                          <LinkIcon size={10} className="mr-1" />
                          Shared
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {checklist.createdBy}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{getCompletionPercentage(checklist.items)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${getCompletionPercentage(checklist.items)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Items list (read-only for demo) */}
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {checklist.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg">
                        <Checkbox checked={item.completed} disabled />
                        <span className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.text}
                        </span>
                        {item.completed && (
                          <Badge variant="outline" className="text-xs">
                            ✓ {item.completedBy}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Members */}
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium mb-2">Members ({checklist.members.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {checklist.members.map((member) => (
                        <Badge key={member} variant="secondary">
                          <User size={12} className="mr-1" />
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {mockSharedChecklists.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <Share size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No shared checklists</h3>
                <p className="text-muted-foreground">
                  When someone shares a checklist with you, it will appear here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GroupPage