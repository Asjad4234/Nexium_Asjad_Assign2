import React, { useState, useEffect } from 'react';
import { BlogSummarizer } from './components/BlogSummarizer';
import { Toaster } from '@/components/ui/sonner';
import ExpandableSearchBar from './components/ui/expandablesearchbar';
import './App.css';

function FeatureFlip() {
  const features = [
    {
      label: 'Smart Search',
      gradient: 'from-blue-600 via-indigo-500 to-purple-600',
      svg: (
        <svg className="w-12 h-12 mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      label: 'AI Summary',
      gradient: 'from-green-600 via-teal-500 to-emerald-600',
      svg: (
        <svg className="w-12 h-12 mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="7" y="4" width="10" height="16" rx="2" strokeWidth="2" />
          <path d="M9 8h6" strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: 'Urdu Translation',
      gradient: 'from-pink-600 via-fuchsia-500 to-purple-600',
      svg: (
        <svg className="w-12 h-12 mb-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
    },
  ];
  const [index, setIndex] = React.useState(0);
  const [fadeKey, setFadeKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => {
        const next = (i + 1) % features.length;
        setFadeKey(next); // trigger fade
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const feature = features[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-[120px]">
      <div
        key={fadeKey}
        className="bg-white/60 rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center fade-slide-in"
        style={{ minWidth: 180, minHeight: 120 }}
      >
        {feature.svg}
        <span className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
          {feature.label}
        </span>
      </div>
    </div>
  );
}

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
            <svg className="absolute inset-0 w-full h-full animate-pulse-slow" viewBox="0 0 112 112" fill="none">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#06beb6" />
                  <stop offset="100%" stopColor="#ff6e7f" />
                </linearGradient>
              </defs>
              <path d="M56 8C74 8 104 24 104 56C104 88 74 104 56 104C38 104 8 88 8 56C8 24 38 8 56 8Z" fill="url(#waveGrad)" fillOpacity="0.18" />
            </svg>
            {/* Lightbulb icon with gradient ring and floating animation */}
            <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl animate-float">
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
            Summarize smarter. Read faster. Powered by AI & Urdu.
          </p>
          {/* Feature Icons */}
          <div className="flex justify-center items-center mt-12">
            <FeatureFlip />
          </div>
        </div>
        <BlogSummarizer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;