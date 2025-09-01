// src/components/NoteDisplay.tsx
import { Edit2, Trash2 } from './Icons'

export interface Note {
  id: string
  title: string
  content: string
  category: string
  created_at: string
  updated_at: string
}

interface NoteDisplayProps {
  note: Note
  onEdit: () => void
  onDelete: () => void
  isDarkMode: boolean
}

export default function NoteDisplay({ note, onEdit, onDelete, isDarkMode }: NoteDisplayProps) {
  return (
    <>
      <div className="flex items-start justify-between mb-3">
        <span className={`${isDarkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-800'} px-2 py-1 rounded-full text-xs font-medium`}>
          {note.category}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={onEdit} 
            className={`${isDarkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-400 hover:text-indigo-600'} p-1`}
          >
            <Edit2 />
          </button>
          <button 
            onClick={onDelete} 
            className={`${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'} p-1`}
          >
            <Trash2 />
          </button>
        </div>
      </div>
      
      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
        {note.title}
      </h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-3 line-clamp-3`}>
        {note.content}
      </p>
      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        {new Date(note.updated_at).toLocaleDateString()}
      </p>
    </>
  )
}