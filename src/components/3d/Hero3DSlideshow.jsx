import React, { useState, useRef } from 'react';
import { ShieldCheck, Zap, Sparkles, CheckCircle2, Award, ArrowRight, FileCheck, Layers } from 'lucide-react';

export default function Hero3DSlideshow({ onNavigateToScanner, onNavigateToBuilder }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 3D tilt
    setRotateX((-y / rect.height) * 14);
    setRotateY((x / rect.width) * 14);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const showcaseCards = [
    {
      title: 'ATS Resume Intelligence',
      badge: '96% ATS Compatibility',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      tagline: 'Instant keyword matching, density checker & formatting auditor',
      features: ['Greenhouse & Workday parser compliance', 'Missing hard/soft skills gap extraction', 'Contact info & link verification'],
      previewText: 'Alex Rivera • Senior Full Stack Engineer (React, TypeScript, AWS, Node.js)',
      accent: 'border-cyan-500/40 shadow-glow-cyan'
    },
    
    {
      title: 'AI Mock Interview Simulator',
      badge: 'STAR Methodology',
      badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
      tagline: 'Role-specific technical & behavioral voice practice drills',
      features: ['20-second Rapid-Fire blitz mode', 'Web Speech audio synthesizer & voice input', 'STAR structure evaluation meter'],
      previewText: 'Situation ➔ Task ➔ Action ➔ Result (Live feedback & metric scores)',
      accent: 'border-pink-500/40 shadow-glow-pink'
    }
  ];

  const current = showcaseCards[activeTab];

  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ perspective: '1200px' }}>
      {/* Background glow orb */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse-slow pointer-events-none" />

      {/* Tilt Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className={`relative glass-panel rounded-2xl p-6 md:p-8 border transition-all duration-300 ${current.accent}`}
      >
        {/* Floating Holographic Top Ribbon */}
        <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono tracking-wider text-cyan-300 font-semibold uppercase">
              RESUMATE
            </span>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${current.badgeColor}`}>
            {current.badge}
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 mb-6 p-1 bg-slate-900/60 rounded-xl border border-white/5">
          {showcaseCards.map((card, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                activeTab === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              0{idx + 1}. {card.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Content Showcase */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              {current.title}
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </h3>
            <p className="text-sm text-slate-300 mt-1">{current.tagline}</p>
          </div>

          {/* Interactive Feature List */}
          <div className="space-y-2 py-2">
            {current.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm text-slate-300 bg-slate-800/40 p-2.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Live Preview Snippet Box */}
          <div className="p-3.5 bg-black/40 rounded-xl border border-cyan-500/20 font-mono text-xs text-slate-300 flex items-start gap-2.5">
            <span className="text-cyan-400 font-bold">❯</span>
            <p className="line-clamp-2 italic text-cyan-100/90">{current.previewText}</p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap gap-3 items-center">
            <button
              onClick={onNavigateToScanner}
              className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs md:text-sm shadow-glow-cyan flex items-center justify-center gap-1.5 transition-all transform active:scale-95"
            >
              <Zap className="w-4 h-4" /> Run Quick Scan
            </button>
            <button
              onClick={onNavigateToBuilder}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium text-xs md:text-sm border border-white/10 flex items-center justify-center gap-1.5 transition-all"
            >
              <FileCheck className="w-4 h-4 text-cyan-400" /> Open Builder
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
