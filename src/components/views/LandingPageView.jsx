import React, { useState } from 'react';
import { 
  FileSearch, 
  FileText, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Cpu,
  Sparkles,
  Briefcase,
  ClipboardList,
  Compass,
  Linkedin,
  GraduationCap,
  HelpCircle,
  Layers
} from 'lucide-react';
import ScoreGauge from '../common/ScoreGauge';
import GlassCard from '../common/GlassCard';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS, calculateAtsMatch } from '../../utils/atsEngine';

/**
 * LandingPageView Component
 * Showcases New Features (in sequence) and Core Suite (on one side)
 */
export default function LandingPageView({ onNavigate, addToast }) {
  // useState hook for mini scan demo on landing page
  const [quickResume, setQuickResume] = useState(SAMPLE_RESUMES.softwareEngineer);
  const [quickJd, setQuickJd] = useState(SAMPLE_JOB_DESCRIPTIONS.seniorReactNode);
  const [demoResult, setDemoResult] = useState(() => calculateAtsMatch(SAMPLE_RESUMES.softwareEngineer, SAMPLE_JOB_DESCRIPTIONS.seniorReactNode));

  const handleRunMiniScan = () => {
    const result = calculateAtsMatch(quickResume, quickJd);
    setDemoResult(result);
    if (addToast) {
      addToast('ATS Scan simulated successfully!', 'success');
    }
  };

  // 1. NEW FEATURES (In Sequence: App Tracker -> Interview Prep -> Career Roadmap -> LinkedIn Audit)
  const newFeaturesSequence = [
    {
      id: 'tracker',
      step: '01',
      title: 'Fast Job Application Tracker',
      icon: ClipboardList,
      accent: 'cyan',
      tag: 'STEP 1 • PIPELINE',
      desc: 'Quickly log job applications, track interview stages, and manage your placement pipeline with instant inline status changes.',
      stat: 'Fast Inline Add & Tracking'
    },
    {
      id: 'interview-prep',
      step: '02',
      title: 'Interview Prep & Q&A Hub',
      icon: GraduationCap,
      accent: 'amber',
      tag: 'STEP 2 • INTERVIEWS',
      desc: 'Master high-yield technical and behavioral questions with STAR framework talking points, recruiter tips, and live readiness score.',
      stat: 'STAR Framework & Readiness Score'
    },
    {
      id: 'roadmap',
      step: '03',
      title: 'Personalized Career Roadmap',
      icon: Compass,
      accent: 'violet',
      tag: 'STEP 3 • ROADMAP',
      desc: 'Choose your target tech track (Full Stack, ML, Java, Data) and mark milestone skills completed with real-time progression tracking.',
      stat: 'Milestones & Project Ideas'
    },
    {
      id: 'linkedin-analyzer',
      step: '04',
      title: 'LinkedIn Profile Analyzer',
      icon: Linkedin,
      accent: 'blue',
      tag: 'STEP 4 • VISIBILITY',
      desc: 'Audit your headline and About section for recruiter SEO keywords, and generate 3 high-converting AI headlines with 1-click copy.',
      stat: 'Recruiter SEO & Headline AI'
    }
  ];

  // 2. CORE TOOLS (Old Foundation Suite: Builder -> ATS Scanner -> Cover Letter -> Help Desk)
  const coreFeatures = [
    {
      id: 'builder',
      title: 'Live Resume Builder',
      icon: FileText,
      accent: 'cyan',
      tag: 'CORE TOOL',
      desc: 'Build & edit your resume in real time. Choose from 4 sleek themes and export high-resolution ATS vector PDFs.',
      stat: '4 ATS-Ready Themes'
    },
    {
      id: 'scanner',
      title: 'ATS Resume Intelligence',
      icon: FileSearch,
      accent: 'emerald',
      tag: 'CORE TOOL',
      desc: 'Scan your resume against any target job description. Detect missing hard and soft skill keywords with instant score breakdown.',
      stat: '98% Recruiter Match Heuristics'
    },
    {
      id: 'cover-letter',
      title: 'AI Cover Letter Generator',
      icon: Mail,
      accent: 'pink',
      tag: 'CORE TOOL',
      desc: 'Generate tailored, persuasive cover letters aligned to your resume skills and the specific job description in seconds.',
      stat: 'Instant Role Tailoring'
    },
    {
      id: 'help-desk',
      title: 'Website Help Desk & FAQs',
      icon: HelpCircle,
      accent: 'cyan',
      tag: 'HELP & SUPPORT',
      desc: 'Simple accordion FAQs explaining all RESUMATE features, privacy, PDF exports, and quick tips for landing interviews.',
      stat: '10 Essential FAQs & Tips'
    }
  ];

  return (
    <div className="relative space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-8 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>RESUMATE • NEXT-GEN AI CAREER COPILOT</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Master The ATS. <br />
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            Land Your Dream Tech Role.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          RESUMATE empowers tech candidates with Fast Job Application Tracking, Live ATS Resume Building, Heuristic ATS Keyword Scanning, Interview Prep, Career Roadmaps, and LinkedIn Profile Auditing.
        </p>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('tracker')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            <ClipboardList className="w-4 h-4" /> Open App Tracker
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('builder')}
            className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-cyan-500/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-cyan-400" /> Resume Builder
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> 100% Client-Side Privacy
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Sparkles className="w-4 h-4" /> Multilingual: EN • हिन्दी • ਪੰਜਾਬੀ
          </span>
          <span className="flex items-center gap-1.5 text-violet-400">
            <Compass className="w-4 h-4" /> 4 Career Roadmaps
          </span>
        </div>
      </section>

      {/* 2. NEW FEATURES (IN SEQUENCE: App Tracker -> Interview Prep -> Career Roadmap -> LinkedIn Audit) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>NEW FEATURES • IN END-TO-END SEQUENCE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Career Acceleration Pipeline</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-normal">
                4 New Modules
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Step 1: Track Pipeline ➔ Step 2: Master Interviews ➔ Step 3: Follow Roadmap ➔ Step 4: LinkedIn Audit
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
            Execution Flow: 01 ➔ 02 ➔ 03 ➔ 04
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newFeaturesSequence.map((card) => {
            const Icon = card.icon;
            return (
              <GlassCard
                key={card.id}
                accent={card.accent}
                hover
                className="flex flex-col justify-between p-5 cursor-pointer group relative overflow-hidden border-cyan-500/30 hover:border-cyan-400"
                onClick={() => onNavigate(card.id)}
              >
                {/* Step Watermark */}
                <span className="absolute top-2 right-3 text-4xl font-black text-white/[0.04] select-none pointer-events-none font-mono">
                  {card.step}
                </span>

                <div className="space-y-3.5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold uppercase tracking-wider bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                      {card.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="text-cyan-400 text-[11px] truncate">{card.stat}</span>
                  <span className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors shrink-0">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 3. CORE TOOLS (ON ONE SIDE: Resume Builder -> ATS Scanner -> Cover Letter -> Help Desk) */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono font-bold mb-2">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>CORE RESUME FOUNDATION • ORIGINAL SUITE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Core Application Tools</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 font-normal">
                4 Foundation Modules
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Craft, score, customize, and get support for your ATS resumes and cover letters.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
            100% Client-Side Privacy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreFeatures.map((card) => {
            const Icon = card.icon;
            return (
              <GlassCard
                key={card.id}
                accent={card.accent}
                hover
                className="flex flex-col justify-between p-5 cursor-pointer group"
                onClick={() => onNavigate(card.id)}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-400">
                      {card.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 text-[11px] truncate">{card.stat}</span>
                  <span className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors shrink-0">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE ATS MINI SCANNER DEMO */}
      <section className="bg-gradient-to-r from-[#0c1322] via-[#09152b] to-[#0c1322] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>LIVE ATS ALGORITHM DEMO</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Instant ATS Match Tester
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience the client-side TF-IDF keyword extraction and formatting audit in real-time.
            </p>
          </div>

          <button
            onClick={handleRunMiniScan}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md self-start sm:self-auto cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" /> Run Match Simulation
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 uppercase font-semibold">
                Sample Resume Text
              </label>
              <textarea
                rows={7}
                value={quickResume}
                onChange={(e) => setQuickResume(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 uppercase font-semibold">
                Target Job Description
              </label>
              <textarea
                rows={7}
                value={quickJd}
                onChange={(e) => setQuickJd(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
            <ScoreGauge 
              score={demoResult.overallScore} 
              size={130} 
              label="ATS Match" 
              sublabel={demoResult.overallScore >= 80 ? 'Excellent' : 'Needs Optimization'} 
            />

            <div className="w-full space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Hard Skills Match:</span>
                <span className="text-cyan-400 font-bold">{demoResult.hardSkillMatch}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Soft Skills Match:</span>
                <span className="text-violet-400 font-bold">{demoResult.softSkillMatch}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Searchability Audit:</span>
                <span className="text-emerald-400 font-bold">{demoResult.searchabilityScore}/100</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('scanner')}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Full In-Depth Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
