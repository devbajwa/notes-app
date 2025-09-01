// src/components/CreateNoteModal.tsx
import { Save, X } from './Icons'

interface CreateNoteModalProps {
  isCreating: boolean
  setIsCreating: (value: boolean) => void
  newNote: {
    title: string
    content: string
    category: string
  }
  setNewNote: (note: { title: string; content: string; category: string }) => void
  createNote: () => void
  categories: string[]
  isDarkMode: boolean
}

export default function CreateNoteModal({
  isCreating,
  setIsCreating,
  newNote,
  setNewNote,
  createNote,
  categories,
  isDarkMode
}: CreateNoteModalProps) {
  if (!isCreating) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md shadow-2xl`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Create New Note
          </h2>
          <button 
            onClick={() => setIsCreating(false)}
            className={`p-1 hover:${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} rounded`}
          >
            <X />
          </button>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote({...newNote, title: e.target.value})}
            className={`w-full p-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          />
          
          <select
            value={newNote.category}
            onChange={(e) => setNewNote({...newNote, category: e.target.value})}
            className={`w-full p-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <textarea
            placeholder="Write your note..."
            value={newNote.content}
            onChange={(e) => setNewNote({...newNote, content: e.target.value})}
            rows={4}
            className={`w-full p-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          />
          
          <button
            onClick={createNote}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save />
            Save Note
          </button>
        </div>
      </div>
    </div>
  )
}