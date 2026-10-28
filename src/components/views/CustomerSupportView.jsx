import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, X, Sparkles } from 'lucide-react';
import { useTitle } from '../../hooks/useTitle';

const WEBSITE_FAQS = [
  {
    id: 1,
    q: 'How do I build and edit my resume on RESUMATE?',
    a: 'Navigate to the Resume Builder page from the top navbar. Fill in your personal details, work experience, projects, education, and skills. You can select between 4 sleek ATS-ready themes and watch the live preview update in real-time.'
  },
  {
    id: 2,
    q: 'How does the ATS Scanner evaluate my resume?',
    a: 'In the ATS Scanner tab, paste your resume text alongside any target job description. The engine analyzes keyword match percentages for technical hard skills and soft skills, audits formatting health, and highlights missing keywords you should add.'
  },
  {
    id: 3,
    q: 'How does the Job Application Tracker work?',
    a: 'The App Tracker helps you manage your job hunt pipeline. Use the "Quick Add" bar at the top to log new applications in seconds. You can update statuses (Applied, Interviewing, Offered, Rejected) directly from the cards with 1-click.'
  },
  {
    id: 4,
    q: 'How do I download or export my resume as a PDF?',
    a: 'Go to the Resume Builder view and click the "PDF Export" button located at the top-right of the resume preview pane. It generates a high-resolution, ATS-friendly vector PDF directly in your browser.'
  },
  {
    id: 5,
    q: 'How do I generate a targeted Cover Letter?',
    a: 'Open the Cover Letter generator tab, enter your target company and job title, and click "Generate". RESUMATE creates a tailored, professional cover letter highlighting relevant skills from your resume, complete with 1-click clipboard copy.'
  },
  {
    id: 6,
    q: 'What is the Interview Prep Hub and how should I use it?',
    a: 'The Interview Prep tab features high-yield technical and behavioral questions categorized by React, Backend, Core CS, and STAR framework behavioral scenarios. Each question includes model answers, core concepts, and recruiter tips.'
  },
  {
    id: 7,
    q: 'How does the Career Roadmap help my tech learning?',
    a: 'The Career Roadmap offers 4 structured learning paths (Full Stack Web Developer, Machine Learning, Java Backend, and Data Analyst). You can mark completed topics with checkboxes to see your real-time progress percentage and unlock achievement badges.'
  },
  {
    id: 8,
    q: 'How does the LinkedIn Profile Analyzer work?',
    a: 'In the LinkedIn Audit tab, paste your current LinkedIn headline and About section. The tool runs an SEO audit for recruiter searchability and instantly generates 3 high-converting, metric-focused headlines you can copy with 1 click.'
  },
  {
    id: 9,
    q: 'Is my personal data and resume information safe and private?',
    a: 'Yes, 100% private. RESUMATE runs completely on the client-side. All resume editing, ATS scoring, and application tracking data are saved locally in your browser storage (localStorage). Zero data is sent to external tracking servers.'
  },
  {
    id: 10,
    q: 'How do I switch the website language?',
    a: 'Use the language selector in the top-right corner of the Navbar to toggle between English (EN), हिन्दी (Hindi), and ਪੰਜਾਬੀ (Punjabi) at any time.'
  }
];

export default function CustomerSupportView() {
  useTitle('Help Desk & FAQs');

  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState(1); // First question open by default

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return WEBSITE_FAQS;
    const q = searchQuery.toLowerCase();
    return WEBSITE_FAQS.filter(
      item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* 1. Simple Clean Header */}
      <div className="text-center space-y-2 pb-4 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>RESUMATE HELP DESK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Website Help Desk & FAQs
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Common questions on using RESUMATE tools, resume exports, ATS scanner, and privacy.
        </p>
      </div>

      {/* 2. Fast Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search website FAQs (e.g. pdf, ats, cover letter, tracker, privacy)..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#090f1d] border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-lg"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. Simple Clean FAQ Accordion List */}
      <div className="space-y-3 pt-2">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center rounded-2xl bg-[#090f1d] border border-white/10 space-y-2">
            <HelpCircle className="w-8 h-8 text-cyan-400 mx-auto opacity-60" />
            <p className="text-sm text-slate-300">No questions found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-cyan-400 hover:underline font-mono"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#0b1324] border-cyan-500/40 shadow-lg'
                    : 'bg-[#090f1d] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg bg-white/5 text-slate-400 flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/5 animate-fadeIn">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 4. Quick Help Footer Note */}
      <div className="p-4 rounded-2xl bg-[#090f1d] border border-white/5 text-center text-xs text-slate-400">
        Ready to optimize your application? Head over to the{' '}
        <a href="/builder" className="text-cyan-400 hover:underline font-bold">
          Resume Builder
        </a>{' '}
        or test with the{' '}
        <a href="/scanner" className="text-cyan-400 hover:underline font-bold">
          ATS Scanner
        </a>.
      </div>

    </div>
  );
}
