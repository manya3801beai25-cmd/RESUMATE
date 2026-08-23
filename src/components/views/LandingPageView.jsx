import React, { useState } from 'react';
import { 
  FileSearch, 
  Sparkles, 
  FileText, 
  Mail, 
  Mic2, 
  KanbanSquare, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Zap, 
  Cpu, 
  Target, 
  Award, 
  TrendingUp, 
  Terminal,
  HelpCircle
} from 'lucide-react';
import Hero3DSlideshow from '../3d/Hero3DSlideshow';
import ScoreGauge from '../common/ScoreGauge';
import GlassCard from '../common/GlassCard';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS, calculateAtsMatch } from '../../utils/atsEngine';
import { useToast } from '../common/Toast';

export default function LandingPageView({ onNavigate }) {
  const { addToast } = useToast();

  // Quick mini scan demo on landing page
  const [quickResume, setQuickResume] = useState(SAMPLE_RESUMES.softwareEngineer);
  const [quickJd, setQuickJd] = useState(SAMPLE_JOB_DESCRIPTIONS.seniorReactNode);
  const [demoResult, setDemoResult] = useState(() => calculateAtsMatch(SAMPLE_RESUMES.softwareEngineer, SAMPLE_JOB_DESCRIPTIONS.seniorReactNode));

  const handleRunMiniScan = () => {
    const result = calculateAtsMatch(quickResume, quickJd);
    setDemoResult(result);
    addToast('ATS Scan simulated successfully!', 'success');
  };

  const featureCards = [
    {
      id: 'ats-scanner',
      title: 'ATS Resume Intelligence',
      icon: FileSearch,
      accent: 'cyan',
      tag: 'Core Scanner',
      desc: 'Scan your resume against any job description. Break down hard vs soft skill keyword gaps, keyword density, and formatting health.',
      stat: '98% Recruiter Match Heuristics'
    },
    {
      id: 'bullet-scorer',
      title: 'Google XYZ Bullet Scorer',
      icon: Sparkles,
      accent: 'violet',
      tag: 'Google Formula',
      desc: 'Grade every bullet point against "Accomplished [X] as measured by [Y], by doing [Z]". Eliminate passive phrases and get 3 AI metric rewrites.',
      stat: '3 Rewrites per Bullet'
    },
    {
      id: 'resume-builder',
      title: 'Live Dual-Pane Builder',
      icon: FileText,
      accent: 'emerald',
      tag: 'Real-time Scoring',
      desc: 'Draft resumes with instant live score feedback as you type. Choose from 4 cyber-sleek themes and export to clean vector PDF.',
      stat: '4 ATS-Ready Themes'
    },
    {
      id: 'cover-letter',
      title: 'Tailored Cover Letters',
      icon: Mail,
      accent: 'pink',
      tag: '4 Tone Styles',
      desc: 'Generate role-aligned cover letters across Professional, Energetic, Executive, and Creative tones in seconds.',
      stat: 'Instant Copy & .txt Export'
    },
    {
      id: 'mock-interview',
      title: 'STAR Mock Interview Coach',
      icon: Mic2,
      accent: 'cyan',
      tag: 'Voice & Blitz',
      desc: 'Practice technical & behavioral questions with real-time STAR scoring, 20-second Rapid-Fire blitz drills, and audio voice synthesis.',
      stat: 'Speech TTS & Audio Feedback'
    }
  ];

  return (
    <div className="relative space-y-20 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>RESUMATE PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Master The ATS. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Land The Interview.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              RESUMATE gives you unfair advantage in your job search with deep ATS keyword gap matching, Google XYZ bullet optimization, real-time live resume drafting, and voice-enabled STAR mock interviews.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('ats-scanner')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-glow-cyan flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4" /> Launch ATS Scanner
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('resume-builder')}
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 flex items-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" /> Open Resume Builder
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Client-Side Private</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Greenhouse & Workday Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                <span>Zero API Keys Required</span>
              </div>
            </div>
          </div>

          {/* Right Hero 3D Card Deck */}
          <div className="lg:col-span-6">
            <Hero3DSlideshow
              onNavigateToScanner={() => onNavigate('ats-scanner')}
              onNavigateToBuilder={() => onNavigate('resume-builder')}
            />
          </div>
        </div>
      </section>

      {/* 2. LIVE INTERACTIVE SCANNER PREVIEW WIDGET */}
      <section className="relative">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            Try Live ATS Simulation
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Test our parsing engine in real time. Compare a sample software engineer resume against a target job description.
          </p>
        </div>

        <GlassCard glowColor="cyan" className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Input previews */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Resume Snippet Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-bold text-cyan-300 uppercase">Target Resume</label>
                    <span className="text-[11px] text-slate-400">Alex Rivera (Sample)</span>
                  </div>
                  <textarea
                    rows={4}
                    value={quickResume}
                    onChange={(e) => setQuickResume(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs font-mono text-slate-300 resize-none"
                  />
                </div>

                {/* JD Snippet Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-bold text-violet-300 uppercase">Job Description</label>
                    <span className="text-[11px] text-slate-400">Senior Full Stack</span>
                  </div>
                  <textarea
                    rows={4}
                    value={quickJd}
                    onChange={(e) => setQuickJd(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs font-mono text-slate-300 resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  onClick={handleRunMiniScan}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Cpu className="w-4 h-4" /> Recalculate ATS Match
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>Detected Keywords:</span>
                  <span className="text-cyan-300 font-bold">{demoResult.matchedSkills.length} Matched</span>
                  <span>•</span>
                  <span className="text-red-400 font-bold">{demoResult.missingSkills.length} Missing</span>
                </div>
              </div>
            </div>

            {/* Score & Breakdown Preview */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-white/5 space-y-4">
              <ScoreGauge
                score={demoResult.overallScore}
                size={130}
                label="ATS Match"
                sublabel="Live Score"
              />

              <div className="w-full space-y-2 pt-2 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Hard Skills:</span>
                  <span className="text-emerald-400 font-bold">{demoResult.hardSkillScore}%</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Format Health:</span>
                  <span className="text-cyan-400 font-bold">{demoResult.formatScore}%</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('ats-scanner')}
                className="w-full py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                View Full Detailed Breakdown <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 3. PLATFORM CORE CAPABILITIES GRID */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Complete Career Acceleration Suite
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Every tool you need from resume drafting to final executive interview rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <GlassCard
                key={feat.id}
                glowColor={feat.accent}
                onClick={() => onNavigate(feat.id)}
                className="flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white/5 border border-white/10 text-slate-300">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">{feat.stat}</span>
                  <span className="text-xs text-slate-400 group-hover:text-white flex items-center gap-1 font-medium transition-colors">
                    Launch <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. STATISTICS & METRICS BANNER */}
      <section className="p-8 glass-panel rounded-2xl border border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400">350+</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Tech & Soft Skills Indexed</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono text-violet-400">6 Major</p>
            <p className="text-xs text-slate-400 font-medium mt-1">ATS Architectures Modeled</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">XYZ</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Google Formula Scoring</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold font-mono text-pink-400">0ms</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Local Browser Latency</p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION FOOTER BANNER */}
      <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 overflow-hidden text-center">
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to Optimize Your Resume For Top Tech Companies?
          </h2>
          <p className="text-sm text-slate-300">
            Scan your existing resume, calculate your instant ATS score, and generate interview-winning bullets in seconds.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('ats-scanner')}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-glow-cyan flex items-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" /> Start Free ATS Scan Now
            </button>
            <button
              onClick={() => onNavigate('mock-interview')}
              className="px-6 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-medium text-sm border border-white/10 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Mic2 className="w-4 h-4 text-cyan-400" /> Practice Mock Interview
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
