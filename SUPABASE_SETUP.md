# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Note down your project URL and anon key

## 2. Set Up Environment Variables

Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 3. Create the Database Table

Run this SQL in your Supabase SQL editor:

```sql
-- Create summaries table
CREATE TABLE summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  urdu_summary TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  reading_time INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on URL for faster lookups
CREATE INDEX idx_summaries_url ON summaries(url);

-- Create index on created_at for sorting
CREATE INDEX idx_summaries_created_at ON summaries(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can customize this later)
CREATE POLICY "Allow all operations" ON summaries
  FOR ALL USING (true);
```

## 4. Features Added

- ✅ **Automatic saving** of summaries to Supabase
- ✅ **Duplicate detection** - checks if URL already exists
- ✅ **History view** - shows all saved summaries
- ✅ **Load from history** - click to reload any saved summary
- ✅ **Delete summaries** - remove unwanted entries
- ✅ **Real-time updates** - history updates automatically

## 5. How It Works

1. When you submit a URL, the app first checks if it already exists in Supabase
2. If found, it loads the existing summary (faster)
3. If not found, it processes the URL and saves the result to Supabase
4. The history section shows all saved summaries with options to load or delete

## 6. Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| url | TEXT | Blog URL |
| title | TEXT | Blog title |
| summary | TEXT | English summary |
| urdu_summary | TEXT | Urdu translation |
| word_count | INTEGER | Number of words |
| reading_time | INTEGER | Reading time in minutes |
| created_at | TIMESTAMP | When created |
| updated_at | TIMESTAMP | When last updated | 