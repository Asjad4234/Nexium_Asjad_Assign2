# AI Powered Blog Summarizer

A modern blog summarizer web app built with **Vite + React**, **n8n**, **Supabase**, and **ShadCN UI**.  
Users can enter a blog URL, which is scraped, summarized, translated to Urdu, and the results are displayed with persistent storage and download options.

---

## 🌟 Features

- **🔗 URL Processing**: Enter any blog URL for instant summarization
- **📝 Smart Summaries**: AI-powered content extraction and summarization
- **🌍 Urdu Translation**: Automatic translation to Urdu with proper RTL support
- **💾 Persistent Storage**: All summaries saved to Supabase database
- **📚 History Management**: View, load, and manage all saved summaries
- **📄 Download Options**: 
  - English summaries as PDF
  - Urdu summaries as DOCX (with proper RTL formatting)
- **🎨 Modern UI**: Beautiful gradient design with smooth animations
- **⚡ Performance**: Duplicate detection for faster loading
- **📱 Responsive**: Works perfectly on desktop and mobile

---

## 🚀 Live Demo

Deployed on Vercel:  
👉 [nexium-ansh-assign2-auri.vercel.app](https://nexium-ansh-assign2-auri.vercel.app)

---

## 🔄 Project Flow

### Step-by-step Process:
1. **User Input**: Enter a blog URL in the modern UI
2. **Duplicate Check**: App checks Supabase for existing summary
3. **Processing**: If new URL, sent to n8n workflow for processing
4. **Content Extraction**: ScrapingBee API scrapes and summarizes content
5. **Translation**: Google Translate API converts to Urdu
6. **Storage**: Results automatically saved to Supabase database
7. **Display**: Both summaries shown with download options
8. **History**: Summary added to searchable history

---

### Visual Workflow Overview

The n8n workflow handles the backend processing:

![n8n Workflow](./workflow/Blog_Summariser.PNG)

---

## 🛠️ Technologies Used

### **Frontend**
- **Vite + React + TypeScript** - Modern build tool and framework
- **ShadCN UI + Tailwind CSS** - Beautiful, accessible components
- **Lucide React** - Modern icon library
- **Sonner** - Toast notifications

### **Backend & APIs**
- **n8n** - Workflow automation platform
- **ScrapingBee API** - Web scraping and content extraction
- **Google Translate API** - Urdu translation service

### **Database & Storage**
- **Supabase** - PostgreSQL database with real-time features
- **Row Level Security (RLS)** - Secure data access

### **Utilities**
- **jsPDF** - PDF generation for English summaries
- **docx** - DOCX generation for Urdu summaries
- **date-fns** - Date formatting utilities

---

## 📊 Database Schema

The Supabase `summaries` table stores:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `url` | TEXT | Blog URL |
| `title` | TEXT | Blog title |
| `summary` | TEXT | English summary |
| `urdu_summary` | TEXT | Urdu translation |
| `word_count` | INTEGER | Number of words |
| `reading_time` | INTEGER | Reading time in minutes |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

---

## 🎨 UI Features

### **Modern Design**
- Gradient backgrounds and smooth animations
- Responsive layout for all devices
- Beautiful card-based interface
- Loading states and progress indicators

### **User Experience**
- Expandable search bar
- Real-time history updates
- Toast notifications for all actions
- Keyboard shortcuts and accessibility

---


## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Asjad4234/Nexium_Asjad_Assign2.git
   cd Nexium_Asjad_Assign2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL from `SUPABASE_SETUP.md` in your SQL editor
   - Update your `.env` file with the credentials

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── BlogSummarizer.tsx    # Main component
│   ├── animata/              # Animation components
│   └── ui/                   # ShadCN UI components
├── lib/
│   └── supabase.ts          # Supabase client
├── services/
│   ├── blogService.ts       # n8n webhook service
│   └── supabaseService.ts   # Database operations
└── main.tsx                 # App entry point
```

---

## 🔧 Configuration

### **Environment Variables**
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### **n8n Webhook**
The app uses a hosted n8n workflow for processing. The webhook URL is configured in `src/services/blogService.ts`.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **n8n** for workflow automation
- **ScrapingBee** for content extraction
- **Google Translate** for language services
- **Supabase** for database and hosting
- **ShadCN UI** for beautiful components
