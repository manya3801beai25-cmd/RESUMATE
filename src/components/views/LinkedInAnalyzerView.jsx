import React, { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  analyzeLinkedInProfile, 
  LINKEDIN_SAMPLE_PROFILES 
} from '../../utils/linkedinEngine';
import { 
  Linkedin, 
  Sparkles, 
  Copy, 
  Check, 
  Target, 
  RotateCcw,
  Wand2
} from 'lucide-react';

/**
 * LinkedInAnalyzerView - Short, Clean, and Easy-to-Understand
 */
export default function LinkedInAnalyzerView({ addToast }) {
  const { currentLang } = useLanguage();

  // 1. Just 2 Short Inputs! (Role & Headline)
  const [targetRole, setTargetRole] = useState(LINKEDIN_SAMPLE_PROFILES.fullstack.targetRole);
  const [headline, setHeadline] = useState(LINKEDIN_SAMPLE_PROFILES.fullstack.headline);

  // Copy state
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [isAboutCopied, setIsAboutCopied] = useState(false);

  // 2. Real-time Analysis
  const analysisResult = useMemo(() => {
    return analyzeLinkedInProfile({
      headline,
      about: `Software engineer specializing in building modern web applications. Open to new roles.`,
      skills: 'React, Node.js, JavaScript, SQL, TypeScript',
      targetRole,
      language: currentLang
    });
  }, [headline, targetRole, currentLang]);

  const { overallScore, headlineFeedback, generatedHeadlines, generatedAbout } = analysisResult;

  // 3. Fast Presets (1-Click Sample Loading)
  const handleLoadSample = useCallback((key) => {
    const prof = LINKEDIN_SAMPLE_PROFILES[key];
    if (prof) {
      setTargetRole(prof.targetRole);
      setHeadline(prof.headline);
      if (addToast) addToast(`Loaded ${prof.label} sample!`, 'success');
    }
  }, [addToast]);

  // Copy helper
  const handleCopy = (text, type, idx = null) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'headline') {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
      if (addToast) addToast('Headline copied to clipboard!', 'success');
    } else {
      setIsAboutCopied(true);
      setTimeout(() => setIsAboutCopied(false), 2000);
      if (addToast) addToast('About summary copied!', 'success');
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* 1. SHORT & CLEAN HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Linkedin className="w-6 h-6 text-[#388ee6]" />
            <span>LinkedIn Headline Optimizer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Audit your LinkedIn headline and generate recruiter-friendly variations.
          </p>
        </div>

        {/* 1-Click Test Presets */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {Object.entries(LINKEDIN_SAMPLE_PROFILES).map(([key, prof]) => (
            <button
              key={key}
              onClick={() => handleLoadSample(key)}
              className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/40 text-[11px] font-semibold text-slate-300 transition-all"
            >
              {prof.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SIMPLE INPUTS & SCORECARD (Side-by-side, No Bloat) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left: 2 Clean Inputs */}
        <div className="md:col-span-7 p-5 rounded-2xl bg-[#090f1d] border border-white/10 space-y-3.5 shadow-md">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Job Title
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#0A66C2]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span className="font-semibold">Current Headline</span>
              <span className="text-slate-500 font-mono text-[11px]">{headline.length}/220</span>
            </div>
            <textarea
              rows={3}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Software Engineer | React, Node.js & TypeScript | Computer Science Graduate"
              className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#0A66C2] leading-relaxed"
            />
          </div>
        </div>

        {/* Right: Score Dial & 2 Quick Tips */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-[#0a1224] border border-cyan-500/20 shadow-md flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border-2 border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-black font-mono text-cyan-300">
                {overallScore}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {overallScore >= 75 ? '🔥 Recruiter Ready' : '⚡ Needs Optimization'}
              </span>
              <p className="text-[11px] text-slate-400">
                Recruiter Search Ranking Score
              </p>
            </div>
          </div>

          {/* 2 Short Tips */}
          <div className="pt-2 border-t border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
              Quick Tips:
            </span>
            <ul className="text-xs text-slate-300 space-y-1">
              {headlineFeedback.slice(0, 2).map((fb, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-cyan-400">•</span>
                  <span>{fb}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* 3. AI HEADLINES (2 Short & Punchy Options with 1-Click Copy) */}
      <div className="p-5 rounded-2xl bg-[#090f1d] border border-cyan-500/20 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">
              AI-Generated High-Converting Headlines
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {generatedHeadlines.slice(0, 2).map((item, idx) => {
            const isCopied = copiedIdx === idx;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block mb-1">
                    {item.type}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    "{item.headline}"
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                  <button
                    onClick={() => setHeadline(item.headline)}
                    className="flex-1 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition-all"
                  >
                    Use Headline
                  </button>
                  <button
                    onClick={() => handleCopy(item.headline, 'headline', idx)}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1 transition-all"
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Done' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SHORT ELEVATOR PITCH BIO */}
      <div className="p-5 rounded-2xl bg-[#090f1d] border border-violet-500/20 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white">
              AI Recruiter Elevator Pitch (About Summary)
            </h3>
          </div>

          <button
            onClick={() => handleCopy(generatedAbout, 'about')}
            className="px-3 py-1 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {isAboutCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{isAboutCopied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
          {generatedAbout}
        </div>
      </div>

    </div>
  );
}
