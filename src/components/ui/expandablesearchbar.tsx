import React, { useState } from 'react';
import { Search, Globe, Loader2 } from 'lucide-react';

interface ExpandableSearchBarProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

function ExpandableSearchBar({ onSubmit, isLoading = false }: ExpandableSearchBarProps) {
  const [url, setUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (url.trim() && !isLoading) {
      // Add protocol if missing
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      onSubmit(formattedUrl);
      setUrl('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative">
      <form
        className={
          `relative flex items-center bg-white/20 backdrop-blur-lg border border-white/30 \
          rounded-full transition-all duration-500 ease-in-out shadow-xl\n          ${isExpanded ? 'w-80 px-6 py-3' : 'w-12 h-12 px-3 py-3'}\n          hover:shadow-indigo-500/25 hover:border-indigo-400/50`
        }
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => !url && setIsExpanded(false)}
        onSubmit={handleSubmit}
      >
        <Search 
          className={
            `text-gray-700 transition-all duration-300 flex-shrink-0\n            ${isExpanded ? 'w-4 h-4' : 'w-5 h-5'}`
          } 
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to summarize..."
          className={
            `bg-transparent text-gray-700 placeholder-gray-500 border-none outline-none \n            transition-all duration-500 ease-in-out\n            ${isExpanded ? 'w-full ml-3 opacity-100' : 'w-0 ml-0 opacity-0'}`
          }
          onFocus={() => setIsExpanded(true)}
          onBlur={() => !url && setIsExpanded(false)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          disabled={isLoading}
        />
        {url && (
          <button
            type="submit"
            disabled={isLoading}
            className="ml-2 p-1 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors duration-200"
          >
            <Globe className="w-4 h-4 text-indigo-600" />
          </button>
        )}
      </form>
      {/* Subtle glow effect */}
      <div className={
        `absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 \n        blur-xl transition-opacity duration-500 -z-10\n        ${isExpanded ? 'opacity-100' : 'opacity-0'}`
      } />
    </div>
  );
}

export default ExpandableSearchBar;