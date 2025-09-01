// src/components/EditNoteForm.tsx
import { useState } from 'react'
import { Save } from './Icons'
import { Note } from './NoteDisplay'

interface EditNoteFormProps {
  note: Note
  onSave: (updates: Partial<Note>) => void
  onCancel: () => void
  isDarkMode: boolean
  categories: string[]
}

export default function EditNoteForm({ note, onSave, onCancel, isDarkMode, categories }: EditNoteFormProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [category, setCategory] = useState(note.category)

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white'} rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm`}
      />
      
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white'} rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm`}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white'} rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm`}
      />
      
      <div className="flex gap-2">
        <button
          onClick={() => onSave({ title, content, category })}
          className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors flex items-center gap-1"
        >
          <Save />
          Save
        </button>
        <button
          onClick={onCancel}
          className={`${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} px-3 py-1 rounded text-sm transition-colors`}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}