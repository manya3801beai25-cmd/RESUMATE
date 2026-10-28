import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Bookmark, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Layers, 
  MessageSquare, 
  Terminal, 
  Zap,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

/**
 * Curated Question Bank for Tech Interviews
 * Categorized by: React & Frontend, Backend & APIs, Behavioral & STAR, Core CS & System
 */
const INTERVIEW_QUESTIONS = [
  {
    id: 'q-1',
    category: 'frontend',
    categoryLabel: '⚛️ React & Frontend',
    difficulty: 'Intermediate',
    question: 'Explain the Virtual DOM and how React\'s reconciliation diffing algorithm works.',
    concept: 'Virtual DOM is a lightweight in-memory representation of the real DOM.',
    answer: 'When state or props change, React builds a new Virtual DOM tree and compares it to the previous one using a heuristic O(n) diffing algorithm. It batches minimal changes and updates only the modified real DOM nodes during the commit phase, avoiding expensive browser layout reflows.',
    starTip: 'Mention why keys are essential in lists (identity tracking) and how React Fiber enables interruptible asynchronous rendering.'
  },
  {
    id: 'q-2',
    category: 'frontend',
    categoryLabel: '⚛️ React & Frontend',
    difficulty: 'Beginner',
    question: 'What are the Rules of Hooks and why must useEffect dependencies be exhaustive?',
    concept: 'Hooks must only be called at the top level of React functions, not inside loops or conditionals.',
    answer: 'React relies on the call order of hooks across re-renders to preserve their state pointers. The useEffect dependency array must declare all external values referenced inside the effect closure to prevent stale state bugs and ensure synchronous alignment with the component lifecycle.',
    starTip: 'Cite practical solutions: useCallback/useMemo for stable references, or extracting helper functions outside the component.'
  },
  {
    id: 'q-3',
    category: 'frontend',
    categoryLabel: '⚛️ React & Frontend',
    difficulty: 'Intermediate',
    question: 'How do you optimize a React web app to prevent redundant re-renders?',
    concept: 'Components re-render when their parent renders, state changes, or context updates.',
    answer: '1. State Colocation: keep state as close to where it is used as possible.\n2. Memoization: wrap pure display components with React.memo and memoize callback handlers with useCallback.\n3. Virtualization: use virtual windowing (e.g. react-window) for long lists.\n4. Code-Splitting: use React.lazy and Suspense for route-based chunking.',
    starTip: 'Never prematurely optimize — always profile first using React DevTools Profiler to find actual render bottlenecks.'
  },
  {
    id: 'q-4',
    category: 'backend',
    categoryLabel: '🚀 Backend & Databases',
    difficulty: 'Intermediate',
    question: 'What is the architectural difference between REST and GraphQL?',
    concept: 'REST is resource-oriented with fixed endpoints; GraphQL is client-specified query-oriented.',
    answer: 'REST exposes separate endpoints per resource (e.g. /users, /posts) returning fixed JSON payloads, which can cause over-fetching or multiple roundtrips (under-fetching). GraphQL provides a single schema endpoint where the client asks for exactly the fields needed in a single query.',
    starTip: 'Note that REST excels in standard HTTP caching (ETags, CDN), while GraphQL requires specialized client caching (Apollo/Relay).'
  },
  {
    id: 'q-5',
    category: 'backend',
    categoryLabel: '🚀 Backend & Databases',
    difficulty: 'Intermediate',
    question: 'How do B-Tree indexes speed up SQL queries and what are their write trade-offs?',
    concept: 'Indexes are auxiliary data structures that enable logarithmic lookup times.',
    answer: 'B-Tree indexes sort column values into balanced tree structures, reducing table scans from O(N) to O(log N) for equality and range queries. However, each index adds disk overhead and slows down INSERT, UPDATE, and DELETE operations because the index tree must be rebalanced on every write.',
    starTip: 'Explain composite indexes: column order matters (Leftmost Prefix Rule). Index high-cardinality columns first.'
  },
  {
    id: 'q-6',
    category: 'backend',
    categoryLabel: '🚀 Backend & Databases',
    difficulty: 'Beginner',
    question: 'How does JWT (JSON Web Token) authentication work statelessly?',
    concept: 'A signed cryptographic token consisting of Header, Payload, and Signature.',
    answer: 'When a user logs in, the backend signs user claims with a secret key and returns a JWT. The client sends this token in the Authorization: Bearer header on subsequent requests. The server validates the signature mathematically without querying a session database, making it horizontally scalable.',
    starTip: 'Highlight security best practices: store tokens in secure httpOnly cookies to prevent XSS, and use short expiry with refresh tokens.'
  },
  {
    id: 'q-7',
    category: 'behavioral',
    categoryLabel: '🤝 Behavioral (STAR)',
    difficulty: 'Intermediate',
    question: 'Tell me about a challenging bug you encountered in production. How did you resolve it?',
    concept: 'Assesses debugging methodology, calmness under pressure, and systemic prevention.',
    answer: '• Situation: A production memory leak caused our API server pods to crash during peak traffic spikes.\n• Task: Quickly diagnose the root cause without customer data loss.\n• Action: Analyzed server heap dumps, traced unclosed database connections in an asynchronous retry loop, deployed a patch with connection pooling limits, and added automated Grafana alerts.\n• Result: Pod crash rate dropped to 0%, latency stabilized under 60ms, and we added connection leak tests to our CI/CD pipeline.',
    starTip: 'Always follow the STAR structure: Situation (15%), Task (15%), Action (50%), Result (20% with tangible metrics).'
  },
  {
    id: 'q-8',
    category: 'behavioral',
    categoryLabel: '🤝 Behavioral (STAR)',
    difficulty: 'Beginner',
    question: 'How do you handle technical disagreements or conflicts within your team?',
    concept: 'Tests collaborative empathy, active listening, and decision-making objectivity.',
    answer: '• Situation: My teammate and I disagreed on whether to use Redux Toolkit vs React Context for a new dashboard module.\n• Task: Agree on the best technical direction without delaying sprint deadlines.\n• Action: Scheduled a quick 20-minute sync, listed pros and cons against our project requirements (state frequency, bundle size), and built a fast 30-minute prototype demonstrating both.\n• Result: Data showed Context was sufficient and saved 25KB bundle size. We documented the decision in an ADR (Architecture Decision Record) and delivered on schedule.',
    starTip: 'Emphasize "disagree and commit" and focusing on data/benchmarks rather than personal ego.'
  },
  {
    id: 'q-9',
    category: 'behavioral',
    categoryLabel: '🤝 Behavioral (STAR)',
    difficulty: 'Beginner',
    question: 'What are your salary expectations for this role?',
    concept: 'Tests market awareness, confidence, and collaborative negotiation etiquette.',
    answer: 'Based on market research for this role in our location and my experience with [tech stack], my target range is [₹X to ₹Y LPA / $X to $Y]. However, compensation is just one factor for me — I am very excited about your team\'s product impact, and I am flexible depending on the overall benefits, stock options, and growth opportunities.',
    starTip: 'Always state a reasonable range rather than a single fixed number, and tie it back to value created.'
  },
  {
    id: 'q-10',
    category: 'system',
    categoryLabel: '🧠 System & CS Fundamentals',
    difficulty: 'Advanced',
    question: 'Explain JavaScript\'s Event Loop, Microtask Queue (Promises), and Macrotask Queue.',
    concept: 'JavaScript is single-threaded; asynchronous operations are coordinated by the event loop.',
    answer: 'The call stack executes synchronous code. When async tasks complete, their callbacks enter queues. The Event Loop prioritizes the Microtask queue (Promise callbacks, queueMicrotask) and drains it completely before picking a single task from the Macrotask queue (setTimeout, setInterval, I/O).',
    starTip: 'Provide the classic execution order example: console.log(1) -> setTimeout(2, 0) -> Promise.resolve(3) logs: 1, 3, 2.'
  },
  {
    id: 'q-11',
    category: 'system',
    categoryLabel: '🧠 System & CS Fundamentals',
    difficulty: 'Advanced',
    question: 'What is Redis caching, and what is the difference between Cache-Aside and Write-Through?',
    concept: 'Redis stores key-value data in RAM for ultra-fast sub-millisecond retrieval.',
    answer: '• Cache-Aside (Lazy Loading): The app checks Redis first; on a cache miss, it reads from the DB, writes to Redis, and returns the data. Best for read-heavy workloads.\n• Write-Through: The app writes data to the cache and the database simultaneously. Ensures cache is always fresh at the cost of higher write latency.',
    starTip: 'Mention how to prevent "Cache Stampede" by using distributed locks (Redlock) or probabilistic early expiration.'
  },
  {
    id: 'q-12',
    category: 'behavioral',
    categoryLabel: '🤝 Behavioral (STAR)',
    difficulty: 'Beginner',
    question: 'Why should we hire you over other qualified candidates?',
    concept: 'Tests candidate differentiation, enthusiasm, and alignment with the team\'s mission.',
    answer: 'I offer a unique blend of solid technical fundamentals in [key stack], strong product curiosity, and a proven track record of shipping end-to-end features quickly. I don\'t just write code; I actively optimize for user experience, performance, and clean maintainability. I am eager to hit the ground running and add immediate value to your sprint goals.',
    starTip: 'Directly reference 1 or 2 specific projects from your resume and connect them to problems the company solves.'
  }
];

export default function InterviewPrepView({ addToast }) {
  const { t } = useLanguage();

  // 1. State for Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'frontend', 'backend', 'behavioral', 'system'
  const [selectedDifficulty, setSelectedDifficulty] = useState('all'); // 'all', 'Beginner', 'Intermediate', 'Advanced'

  // 2. State for Expanded Cards (Accordion)
  const [expandedId, setExpandedId] = useState(null);

  // 3. Persistent State for Practiced & Bookmarked Questions
  const [practicedIds, setPracticedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_practiced_questions');
      return saved ? JSON.parse(saved) : ['q-1', 'q-7'];
    } catch {
      return ['q-1', 'q-7'];
    }
  });

  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_bookmarked_questions');
      return saved ? JSON.parse(saved) : ['q-1', 'q-9'];
    } catch {
      return ['q-1', 'q-9'];
    }
  });

  const [copiedId, setCopiedId] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('resumate_practiced_questions', JSON.stringify(practicedIds));
    } catch (e) {}
  }, [practicedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('resumate_bookmarked_questions', JSON.stringify(savedIds));
    } catch (e) {}
  }, [savedIds]);

  // Toggle Practiced
  const handleTogglePracticed = (id) => {
    setPracticedIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      if (addToast) {
        addToast(exists ? 'Marked as unpracticed' : 'Question marked as Practiced! 🎯', 'success');
      }
      return updated;
    });
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id) => {
    setSavedIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      if (addToast) {
        addToast(exists ? 'Removed bookmark' : 'Bookmarked for interview review ⭐', 'info');
      }
      return updated;
    });
  };

  // 1-Click Copy Answer
  const handleCopyAnswer = (q) => {
    const textToCopy = `Question: ${q.question}\n\nConcept: ${q.concept}\n\nKey Answer:\n${q.answer}\n\nInterview Tip:\n${q.starTip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(q.id);
    if (addToast) addToast('Copied full answer & STAR tips to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset progress
  const handleResetProgress = () => {
    if (window.confirm('Reset all practiced interview questions?')) {
      setPracticedIds([]);
      if (addToast) addToast('Interview practice progress reset.', 'info');
    }
  };

  // Filtered Questions with useMemo
  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter(q => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'saved') {
          if (!savedIds.includes(q.id)) return false;
        } else if (q.category !== selectedCategory) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchQ = q.question.toLowerCase().includes(query);
        const matchC = q.concept.toLowerCase().includes(query);
        const matchA = q.answer.toLowerCase().includes(query);
        const matchT = q.starTip.toLowerCase().includes(query);
        if (!matchQ && !matchC && !matchA && !matchT) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery, savedIds]);

  // Overall Readiness Calculation
  const readinessMetrics = useMemo(() => {
    const total = INTERVIEW_QUESTIONS.length;
    const practiced = practicedIds.length;
    const percentage = total > 0 ? Math.round((practiced / total) * 100) : 0;
    return { total, practiced, percentage };
  }, [practicedIds]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>INTERVIEW COPILOT & CHEAT SHEET</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interview Prep & Q&A Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            Master high-yield technical and behavioral questions with structured STAR-method talking points and live readiness tracking.
          </p>
        </div>

        {/* Readiness Score Progress Pill */}
        <div className="p-4 rounded-2xl bg-[#090f1d] border border-emerald-500/30 shadow-md min-w-[220px]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-mono text-slate-400 uppercase">Readiness Score</span>
            <span className="font-black text-emerald-400 font-mono text-sm">
              {readinessMetrics.percentage}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${readinessMetrics.percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{readinessMetrics.practiced} of {readinessMetrics.total} mastered</span>
            {readinessMetrics.practiced > 0 && (
              <button 
                onClick={handleResetProgress}
                className="text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                title="Reset progress"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by concept or keyword (e.g. Virtual DOM, STAR, SQL, JWT, salary)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#090f1d] border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all shadow-md"
          />
        </div>

        {/* Category Pills & Difficulty Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'frontend', label: '⚛️ Frontend & React' },
              { id: 'backend', label: '🚀 Backend & Databases' },
              { id: 'behavioral', label: '🤝 Behavioral (STAR)' },
              { id: 'system', label: '🧠 System & CS' },
              { id: 'saved', label: `⭐ Saved (${savedIds.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                    : 'bg-[#090f1d] border border-white/10 hover:bg-white/5 text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#090f1d] border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

        </div>
      </div>

      {/* 3. Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#090f1d] border border-white/10 space-y-3">
          <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No questions found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or reset the topic filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const isPracticed = practicedIds.includes(q.id);
            const isSaved = savedIds.includes(q.id);

            const difficultyColor = 
              q.difficulty === 'Beginner' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
              q.difficulty === 'Intermediate' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
              'text-purple-400 bg-purple-500/10 border-purple-500/30';

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded 
                    ? 'bg-[#090f1d] border-emerald-500/40 shadow-lg shadow-emerald-500/5' 
                    : 'bg-[#090f1d]/80 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Question Header Bar */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  <div className="flex items-start gap-3 flex-1 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : q.id)}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePracticed(q.id);
                      }}
                      className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors flex-shrink-0"
                      title={isPracticed ? 'Mark as unpracticed' : 'Mark as practiced'}
                    >
                      {isPracticed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {q.categoryLabel}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${difficultyColor}`}>
                          {q.difficulty}
                        </span>
                        {isPracticed && (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            ✓ Mastered
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white hover:text-emerald-300 transition-colors leading-snug">
                        {q.question}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {q.concept}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Bookmark & Expand */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleToggleBookmark(q.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-amber-400 transition-colors"
                      title="Bookmark Question"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isExpanded
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      <span>{isExpanded ? 'Hide Answer' : 'View Answer'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4 animate-fadeIn text-xs sm:text-sm">
                    
                    {/* Key Model Answer */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono text-xs uppercase tracking-wider">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Recommended Model Answer</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                        {q.answer}
                      </div>
                    </div>

                    {/* Pro Tip / STAR Framework Box */}
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-bold text-emerald-300 text-xs block">
                          Recruiter & Interviewer Tip:
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {q.starTip}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions inside Card */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleTogglePracticed(q.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isPracticed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isPracticed ? 'Marked as Practiced ✓' : 'Mark as Practiced'}</span>
                      </button>

                      <button
                        onClick={() => handleCopyAnswer(q)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        {copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === q.id ? 'Copied!' : 'Copy Answer'}</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
