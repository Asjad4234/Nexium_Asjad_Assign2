'use client';

import { BlogSummarizer } from './components/BlogSummarizer';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-8 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Blog Summarizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform lengthy blog posts into concise summaries with Urdu translation
          </p>
          
          {/* Feature Icons */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Smart Search</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">AI Summary</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Urdu Translation</span>
            </div>
          </div>
        </div>
        
        <BlogSummarizer />
      </div>
      <Toaster />
    </div>
  );
}