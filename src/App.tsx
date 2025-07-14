import React from 'react';
import { BlogSummarizer } from './components/BlogSummarizer';
import { Toaster } from './components/ui/sonner';
import TextFlip from './components/animata/text/text-flip';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background SVG Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Right Decoration */}
        <svg className="absolute top-0 right-0 w-96 h-96 text-blue-100 opacity-60" viewBox="0 0 200 200" fill="currentColor">
          <path d="M40.7,-69.8C50.9,-62.3,56.8,-46.2,65.9,-31.1C75,-16,87.3,-2,87.2,12.1C87.1,26.2,74.6,40.4,62.8,52.8C51,65.2,39.9,75.8,26.3,81.1C12.7,86.4,-3.4,86.4,-18.8,82.2C-34.2,78,-48.9,69.6,-59.7,57.4C-70.5,45.2,-77.4,29.2,-80.1,12.4C-82.8,-4.4,-81.3,-21.9,-74.8,-36.8C-68.3,-51.7,-56.8,-64,-43.2,-70.8C-29.6,-77.6,-14.8,-78.9,1.4,-81.1C17.6,-83.3,35.2,-86.4,40.7,-69.8Z" transform="translate(100 100)" />
        </svg>
        {/* Bottom Left Decoration */}
        <svg className="absolute bottom-0 left-0 w-80 h-80 text-indigo-100 opacity-50" viewBox="0 0 200 200" fill="currentColor">
          <path d="M44.3,-76.1C57.2,-69.8,67.5,-56.2,74.8,-41.1C82.1,-26,86.4,-9.4,84.9,6.7C83.4,22.8,76.1,38.4,66.2,51.2C56.3,64,43.8,74,29.4,79.9C15,85.8,-1.3,87.6,-17.1,84.2C-32.9,80.8,-48.2,72.2,-59.7,59.8C-71.2,47.4,-78.9,31.2,-81.8,14.1C-84.7,-3,-82.8,-21,-75.6,-36.2C-68.4,-51.4,-55.9,-63.8,-41.8,-69.5C-27.7,-75.2,-12.1,-74.2,3.8,-80.1C19.7,-86,39.4,-99.8,44.3,-76.1Z" transform="translate(100 100)" />
        </svg>
        {/* Center Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-indigo-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-50 animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Logo/Icon */}
          <div className="relative flex items-center justify-center w-28 h-28 mx-auto mb-8">
            {/* Wavy SVG background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 112" fill="none">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#06beb6" />
                  <stop offset="100%" stopColor="#ff6e7f" />
                </linearGradient>
              </defs>
              <path d="M56 8C74 8 104 24 104 56C104 88 74 104 56 104C38 104 8 88 8 56C8 24 38 8 56 8Z" fill="url(#waveGrad)" fillOpacity="0.18" />
            </svg>
            {/* Lightbulb icon with gradient ring and floating animation */}
            <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl">
              <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M9 18h6m-3 0v2m-4-2a7 7 0 1114 0c0 2.5-2 4.5-4.5 4.5h-5A4.5 4.5 0 015 18z" />
                <path d="M12 2a7 7 0 00-7 7c0 2.5 2 4.5 4.5 4.5h5A4.5 4.5 0 0019 9a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-teal-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent font-[Poppins,Inter,sans-serif] drop-shadow-lg pb-2">
            AI Powered Blog Summarizer
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium italic text-center pt-4 bg-gradient-to-r from-teal-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            Summarize smarter. Read faster. Download Summaries.
          </p>
          {/* Feature Icons */}
          <div className="relative flex justify-center items-center mt-12">
            {/* Decorative SVGs */}
            <svg className="absolute -left-8 -top-4 w-8 h-8 text-blue-200 opacity-70" viewBox="0 0 32 32" fill="currentColor"><circle cx="16" cy="16" r="16" /></svg>
            <svg className="absolute left-1/2 -bottom-6 w-6 h-6 text-fuchsia-200 opacity-60" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="12" /></svg>
            <svg className="absolute right-0 -top-6 w-10 h-10 text-indigo-100 opacity-50" viewBox="0 0 40 40" fill="currentColor"><ellipse cx="20" cy="20" rx="20" ry="16" /></svg>
            <div className="absolute -right-8 bottom-0 w-4 h-4 bg-teal-200 rounded-full opacity-70"></div>
            <TextFlip />
          </div>
        </div>
        <BlogSummarizer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;