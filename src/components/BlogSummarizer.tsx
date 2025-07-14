import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import ExpandableSearchBar from './ui/expandablesearchbar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, FileText, Globe, CheckCircle, AlertCircle, Copy, Database, History, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { scrapeAndSummarize } from '../services/blogService';
import { SupabaseService } from '../services/supabaseService';
import { Summary as SupabaseSummary } from '../lib/supabase';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

interface Summary {
  url: string;
  title: string;
  summary: string;
  urduSummary: string;
  wordCount: number;
  readingTime: number;
}

export function BlogSummarizer() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState('');
  const [savedSummaries, setSavedSummaries] = useState<SupabaseSummary[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load saved summaries on component mount
  useEffect(() => {
    loadSavedSummaries();
  }, []);

  const loadSavedSummaries = async () => {
    try {
      setIsLoadingHistory(true);
      const summaries = await SupabaseService.getSummaries();
      setSavedSummaries(summaries);
    } catch (error) {
      console.error('Error loading saved summaries:', error);
      toast.error('Failed to load saved summaries');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleUrlSubmit = async (url: string) => {
    if (!url.trim()) {
      setError('Please enter a blog URL');
      setSummary(null);
      toast.error('Please enter a blog URL');
      return;
    }
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      setSummary(null);
      toast.error('Please enter a valid URL');
      return;
    }
    setIsLoading(true);
    setError('');
    setSummary(null);
    try {
      // Check if summary already exists
      const existingSummary = await SupabaseService.checkExistingSummary(url);
      if (existingSummary) {
        // Convert Supabase format to local format
        const summaryData: Summary = {
          url: existingSummary.url,
          title: existingSummary.title,
          summary: existingSummary.summary,
          urduSummary: existingSummary.urdu_summary,
          wordCount: existingSummary.word_count,
          readingTime: existingSummary.reading_time
        };
        setSummary(summaryData);
        toast.success('Found existing summary from database!');
        return;
      }

      const title = await extractTitle(url);
      const scrapedData = await scrapeAndSummarize(url);
      const summaryData: Summary = {
        url,
        title,
        summary: scrapedData.summary,
        urduSummary: scrapedData.urduSummary,
        wordCount: scrapedData.summary.split(' ').length,
        readingTime: Math.ceil(scrapedData.summary.split(' ').length / 200)
      };
      
      // Save to Supabase
      await SupabaseService.saveSummary({
        url: summaryData.url,
        title: summaryData.title,
        summary: summaryData.summary,
        urdu_summary: summaryData.urduSummary,
        word_count: summaryData.wordCount,
        reading_time: summaryData.readingTime
      });
      
      setSummary(summaryData);
      toast.success('Blog summarized and saved to database!');
      
      // Reload saved summaries
      await loadSavedSummaries();
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to process blog');
      toast.error('Failed to process blog');
    } finally {
      setIsLoading(false);
    }
  };

  const extractTitle = async (url: string): Promise<string> => {
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      const title = doc.querySelector('title')?.textContent || 'Untitled';
      return title.trim();
    } catch (error) {
      console.error('Error extracting title:', error);
      return 'Blog Post';
    }
  };
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleDeleteSummary = async (id: string) => {
    try {
      await SupabaseService.deleteSummary(id);
      toast.success('Summary deleted successfully!');
      await loadSavedSummaries();
    } catch (error) {
      console.error('Error deleting summary:', error);
      toast.error('Failed to delete summary');
    }
  };

  const loadSummaryFromHistory = (savedSummary: SupabaseSummary) => {
    const summaryData: Summary = {
      url: savedSummary.url,
      title: savedSummary.title,
      summary: savedSummary.summary,
      urduSummary: savedSummary.urdu_summary,
      wordCount: savedSummary.word_count,
      readingTime: savedSummary.reading_time
    };
    setSummary(summaryData);
    setShowHistory(false);
    toast.success('Summary loaded from history!');
  };

  // Utility to download summary as PDF
  const downloadPdf = (content: string, title: string, filename: string, isUrdu = false) => {
    const doc = new jsPDF();
    if (isUrdu) {
      // Use a standard font for Urdu text since custom font registration is problematic
      doc.setFont('helvetica');
      doc.setFontSize(14);
      doc.text(title, 10, 20);
      doc.setFontSize(10);
      // Split content into lines to handle long text better
      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, 10, 35);
    } else {
      doc.setFont('helvetica');
      doc.setFontSize(16);
      doc.text(title, 10, 20);
      doc.setFontSize(12);
      doc.text(content, 10, 35, { maxWidth: 180 });
    }
    doc.save(filename);
  };

  // Utility to download Urdu summary as .docx
  const downloadUrduDocx = async (content: string, title: string, filename: string) => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: title, bold: true, size: 32 }),
              ],
              alignment: 'right',
            }),
            new Paragraph({
              children: [
                new TextRun({ text: content, size: 28, font: 'Noto Nastaliq Urdu', rightToLeft: true }),
              ],
              alignment: 'right',
            }),
          ],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Expandable Search Bar */}
      <div className="flex justify-center mt-8">
        <ExpandableSearchBar onSubmit={handleUrlSubmit} isLoading={isLoading} />
      </div>

      {/* History Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowHistory(!showHistory)}
          className="bg-gradient-to-r from-teal-50 to-fuchsia-50 border-2 border-teal-200 hover:border-teal-400 hover:bg-gradient-to-r hover:from-teal-100 hover:to-fuchsia-100 transition-all duration-300 shadow-md"
        >
          <History className="w-5 h-5 mr-2 text-teal-600" />
          {showHistory ? 'Hide History' : 'Show History'} ({savedSummaries.length})
        </Button>
      </div>

      {/* History Section */}
      {showHistory && (
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 via-fuchsia-50 to-pink-50 backdrop-blur-2xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-teal-400 via-fuchsia-400 to-pink-400 rounded-xl">
                <Database className="w-7 h-7 text-white" />
              </div>
              <span className="bg-gradient-to-r from-teal-700 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent font-bold">
                Saved Summaries
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoadingHistory ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                <span className="ml-2 text-gray-600">Loading history...</span>
              </div>
            ) : savedSummaries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Database className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No saved summaries yet. Summarize your first blog to see it here!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {savedSummaries.map((savedSummary) => (
                  <div
                    key={savedSummary.id}
                    className="bg-white/80 rounded-xl p-4 border border-teal-100 hover:border-teal-300 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate mb-1">
                          {savedSummary.title}
                        </h4>
                        <p className="text-xs text-gray-500 truncate mb-2">
                          {savedSummary.url}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{savedSummary.word_count} words</span>
                          <span>•</span>
                          <span>{savedSummary.reading_time} min read</span>
                          <span>•</span>
                          <span>{new Date(savedSummary.created_at!).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => loadSummaryFromHistory(savedSummary)}
                          className="border-teal-200 hover:border-teal-400 hover:bg-teal-50"
                        >
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteSummary(savedSummary.id!)}
                          className="border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading Progress */}
      {isLoading && (
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="flex items-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                  <span className="text-xl font-semibold text-gray-700">
                    Processing your blog...
                  </span>
                </div>
                <div className="mt-4 space-y-2 w-full">
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
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert className="border-2 border-red-200/50 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6">
          <div className="p-2 bg-red-200 rounded-xl inline-block mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <AlertDescription className="text-red-800 text-lg font-medium">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Results */}
      {summary && (
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 backdrop-blur-2xl rounded-3xl overflow-hidden animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-green-400 via-teal-400 to-emerald-500 rounded-xl">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <span className="bg-gradient-to-r from-teal-700 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent font-bold drop-shadow-md">
                  Summary Complete
                </span>
              </CardTitle>
              <Badge className="px-5 py-2 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-indigo-700 rounded-full border-2 border-indigo-300 shadow-md text-base font-semibold animate-pulse">
                {summary.wordCount} words • {summary.readingTime} min read
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <div className="space-y-8">
              <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="font-bold text-2xl mb-2 text-gray-800 flex items-center gap-2">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                    </svg>
                    {summary.title}
                  </h3>
                  <p className="text-xs text-gray-500 break-all bg-white/70 px-3 py-2 rounded-lg border border-indigo-100 shadow-sm">
                    {summary.url}
                  </p>
                </div>
                <div className="hidden md:block">
                  <svg className="w-20 h-20 text-indigo-200" viewBox="0 0 200 200" fill="currentColor">
                    <path d="M40.7,-69.8C50.9,-62.3,56.8,-46.2,65.9,-31.1C75,-16,87.3,-2,87.2,12.1C87.1,26.2,74.6,40.4,62.8,52.8C51,65.2,39.9,75.8,26.3,81.1C12.7,86.4,-3.4,86.4,-18.8,82.2C-34.2,78,-48.9,69.6,-59.7,57.4C-70.5,45.2,-77.4,29.2,-80.1,12.4C-82.8,-4.4,-81.3,-21.9,-74.8,-36.8C-68.3,-51.7,-56.8,-64,-43.2,-70.8C-29.6,-77.6,-14.8,-78.9,1.4,-81.1C17.6,-83.3,35.2,-86.4,40.7,-69.8Z" transform="translate(100 100)" />
                  </svg>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-2xl border-2 border-indigo-100 bg-white/80 shadow-inner p-6 animate-slide-in-left flex flex-col">
                  <h4 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-400" /> English Summary
                  </h4>
                  <ScrollArea className="h-[300px] w-full rounded-xl border border-indigo-50 bg-gradient-to-br from-white to-indigo-50 p-4 shadow-sm">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">{summary.summary}</p>
                    </div>
                  </ScrollArea>
                  <Button
                    variant="outline"
                    className="mt-4 w-full border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 shadow-md animate-pop"
                    onClick={() => downloadPdf(summary.summary, summary.title + ' (English Summary)', 'english-summary.pdf')}
                  >
                    Download as PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-2 w-full border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 shadow-md animate-pop"
                    onClick={() => {
                      navigator.clipboard.writeText(summary.summary);
                      toast.success('English summary copied to clipboard!');
                    }}
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Summary
                  </Button>
                </div>
                <div className="rounded-2xl border-2 border-pink-100 bg-white/80 shadow-inner p-6 animate-slide-in-right flex flex-col">
                  <h4 className="text-lg font-semibold text-pink-700 mb-2 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-beige-400" /> Urdu Translation
                  </h4>
                  <ScrollArea className="h-[300px] w-full rounded-xl border border-pink-50 bg-gradient-to-br from-white to-pink-50 p-4 shadow-sm">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-800 leading-relaxed text-right urdu-text whitespace-pre-wrap text-xl">{summary.urduSummary}</p>
                    </div>
                  </ScrollArea>
                  <Button
                    variant="outline"
                    className="mt-4 w-full border-pink-300 hover:border-pink-500 hover:bg-pink-50 transition-all duration-300 shadow-md animate-pop"
                    onClick={() => downloadUrduDocx(summary.urduSummary, summary.title + ' (Urdu Translation)', 'urdu-summary.docx')}
                  >
                    Download as DOCX
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-2 w-full border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-300 shadow-md animate-pop"
                    onClick={() => {
                      navigator.clipboard.writeText(summary.urduSummary);
                      toast.success('Urdu summary copied to clipboard!');
                    }}
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Summary
                  </Button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-indigo-100 gap-4 animate-fade-in">
                <div className="flex items-center gap-6 text-indigo-500">
                  <span className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5" />
                    {summary.wordCount} words
                  </span>
                  <span className="flex items-center gap-2 text-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {summary.readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}