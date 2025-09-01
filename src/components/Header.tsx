// src/components/Header.tsx
import { Search } from './Icons'

interface HeaderProps {
  noteStats: {
    total: number
    byCategory: Record<string, number>
  }
  notes: any[]
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  setIsCreating: (value: boolean) => void
  exportNotes: () => void
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  categories: string[]
}

export default function Header({
  noteStats,
  notes,
  isDarkMode,
  setIsDarkMode,
  setIsCreating,
  exportNotes,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories
}: HeaderProps) {
  const Plus = () => <span className="text-lg">+</span>

  return (
    <header className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700/20' : 'border-white/20'} sticky top-0 z-10 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-400 text-white' : 'from-indigo-600 to-purple-600'} bg-clip-text`}>
              📝<span className='text-transparent'>My Notes</span>
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              {noteStats.total} notes • Last updated {notes.length > 0 ? new Date(notes[0]?.updated_at).toLocaleDateString() : 'Never'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-all duration-200 text-xl`}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            {/* Export Button */}
            <button
              onClick={exportNotes}
              className={`px-4 py-3 rounded-xl ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:scale-105 transition-all duration-200 font-medium`}
              title="Export Notes"
            >
              📥 Export
            </button>
            
            <button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus />
              New Note
            </button>
          </div>
        </div>
        
        {/* Filters & Search */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700/70 text-white' : 'border-gray-200 bg-white/70'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm`}
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700/70 text-white' : 'border-gray-200 bg-white/70'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm`}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat} ({noteStats.byCategory[cat] || 0})
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700/70 text-white' : 'border-gray-200 bg-white/70'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm`}
          >
            <option value="updated_at">Latest First</option>
            <option value="title">Alphabetical</option>
            <option value="category">By Category</option>
          </select>
        </div>
      </div>
    </header>
  )
}