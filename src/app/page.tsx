// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import CreateNoteModal from '@/components/CreateNoteModal'
import NoteDisplay, { Note } from '@/components/NoteDisplay'
import EditNoteForm from '@/components/EditNoteForm'

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'general' })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('updated_at')
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Fetch notes
  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false })
    
    if (error) {
      console.error('Error:', error)
    } else {
      setNotes(data || [])
    }
    setLoading(false)
  }

  // Create note
  const createNote = async () => {
    if (!newNote.title.trim()) return
    
    const { data, error } = await supabase
      .from('notes')
      .insert([{ 
        title: newNote.title,
        content: newNote.content,
        category: newNote.category 
      }])
      .select()
    
    if (error) {
      console.error('Error:', error)
    } else {
      setNotes([data[0], ...notes])
      setNewNote({ title: '', content: '', category: 'general' })
      setIsCreating(false)
    }
  }

  // Update note
  const updateNote = async (id: string, updates: Partial<Note>) => {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error:', error)
    } else {
      setNotes(notes.map(note => note.id === id ? data[0] : note))
      setEditingId(null)
    }
  }

  // Delete note
  const deleteNote = async (id: string) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error:', error)
    } else {
      setNotes(notes.filter(note => note.id !== id))
    }
  }

  // Export notes
  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `my-notes-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  // Filter and sort notes
  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'category') return a.category.localeCompare(b.category)
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })

  const categories = ['general', 'work', 'personal', 'ideas', 'urgent']
  const noteStats = {
    total: notes.length,
    byCategory: categories.reduce((acc, cat) => {
      acc[cat] = notes.filter(n => n.category === cat).length
      return acc
    }, {} as Record<string, number>)
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} flex items-center justify-center transition-colors duration-300`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Header
        noteStats={noteStats}
        notes={notes}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsCreating={setIsCreating}
        exportNotes={exportNotes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <CreateNoteModal
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          newNote={newNote}
          setNewNote={setNewNote}
          createNote={createNote}
          categories={categories}
          isDarkMode={isDarkMode}
        />

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`${isDarkMode ? 'bg-gray-800/70 border-gray-700/20' : 'bg-white/70 border-white/20'} backdrop-blur-sm rounded-xl p-6 border hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
            >
              {editingId === note.id ? (
                <EditNoteForm 
                  note={note} 
                  onSave={(updates) => updateNote(note.id, updates)}
                  onCancel={() => setEditingId(null)}
                  isDarkMode={isDarkMode}
                  categories={categories}
                />
              ) : (
                <NoteDisplay 
                  note={note}
                  onEdit={() => setEditingId(note.id)}
                  onDelete={() => deleteNote(note.id)}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
              {searchTerm ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}