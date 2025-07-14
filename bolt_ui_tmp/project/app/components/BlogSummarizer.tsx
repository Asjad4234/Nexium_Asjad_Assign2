'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Search, Loader2, FileText, Languages, ExternalLink, Clock } from 'lucide-react';

interface SummaryResult {
  url: string;
  title: string;
  summary: string;
  urduTranslation: string;
  timestamp: string;
}

export function BlogSummarizer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a valid blog URL');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to process blog');
      }

      const data = await response.json();
      setResult(data);
      toast.success('Blog summarized successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to summarize blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Enhanced Search Bar */}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="relative">
          <div 
            className={`search-container ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => !url && setIsExpanded(false)}
          >
            <div className="search-box">
              <div className="search-icon-wrapper">
                <Search className="search-icon" />
              </div>
              <input
                type="url"
                placeholder="Enter blog URL to summarize..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="search-input"
                disabled={loading}
                onFocus={() => setIsExpanded(true)}
              />
              <Button 
                type="submit" 
                disabled={loading || !url}
                className="search-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Summarize
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Processing your blog...</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  Scraping content...
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse delay-300"></div>
                  Generating summary...
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse delay-700"></div>
                  Translating to Urdu...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">English Summary</h3>
                  <p className="text-sm text-gray-600 font-normal">AI-generated content summary</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <h4 className="font-semibold text-xl mb-4 text-gray-800">{result.title}</h4>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">{result.summary}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {new Date(result.timestamp).toLocaleString()}
                </div>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Original
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Urdu Translation Card */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Languages className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Urdu Translation</h3>
                  <p className="text-sm text-gray-600 font-normal">اردو ترجمہ</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <p className="text-gray-800 leading-relaxed text-lg text-right" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
                  {result.urduTranslation}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        .search-container {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-box {
          display: flex;
          align-items: center;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 60px;
          padding: 6px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          width: 60px;
          height: 60px;
          overflow: hidden;
          position: relative;
        }

        .search-container.expanded .search-box {
          width: 600px;
          border-color: #3b82f6;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .search-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .search-icon {
          width: 20px;
          height: 20px;
          color: white;
        }

        .search-input {
          border: none;
          outline: none;
          background: transparent;
          margin-left: 16px;
          margin-right: 12px;
          flex: 1;
          font-size: 16px;
          opacity: 0;
          width: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          color: #374151;
        }

        .search-container.expanded .search-input {
          opacity: 1;
          width: 100%;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .search-button {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 30px;
          padding: 12px 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .search-container.expanded .search-button {
          opacity: 1;
          transform: scale(1);
        }

        .search-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #059669, #047857);
          transform: scale(1.05);
        }

        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: scale(1);
        }

        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}