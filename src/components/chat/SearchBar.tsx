import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setIsExpanded(false);
  };

  return (
    <div className={`flex items-center transition-all ${isExpanded ? 'w-64' : 'w-10'}`}>
      {isExpanded ? (
        <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2 w-full">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search messages..."
            autoFocus
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-400 outline-none"
          />
          <button onClick={handleClear} className="p-1 hover:bg-slate-600 rounded">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Search className="w-5 h-5 text-slate-400" />
        </button>
      )}
    </div>
  );
}
