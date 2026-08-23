import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  RotateCcw,
  Plus,
  Flame,
  FileCheck
} from 'lucide-react';
import ScoreGauge from '../common/ScoreGauge';
import GlassCard from '../common/GlassCard';
import { scoreBulletPoint, SAMPLE_BULLETS, POWER_ACTION_VERBS, WEAK_PASSIVE_PHRASES } from '../../utils/bulletImpactEngine';
import { useToast } from '../common/Toast';
import { useResume } from '../../context/ResumeContext';

export default function BulletScorerView({ onNavigateToBuilder }) {
  const { addToast } = useToast();
  const { updateResumeData } = useResume();

  const [inputBullet, setInputBullet] = useState(SAMPLE_BULLETS[0].text);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeAnalysis, setActiveAnalysis] = useState(() => scoreBulletPoint(SAMPLE_BULLETS[0].text));

  const handleAnalyze = (textToAnalyze = inputBullet) => {
    const res = scoreBulletPoint(textToAnalyze);
    setActiveAnalysis(res);
    addToast('Bullet impact analyzed!', 'success');
  };

  const handleSampleClick = (sample) => {
    setInputBullet(sample.text);
    const res = scoreBulletPoint(sample.text);
    setActiveAnalysis(res);
    addToast(`Loaded ${sample.label}!`, 'info');
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    addToast('Rewrite copied to clipboard!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleApplyToResume = (rewriteText) => {
    updateResumeData(prev => {
      const exps = [...(prev.experiences || [])];
      if (exps.length > 0) {
        exps[0].bullets = [rewriteText, ...(exps[0].bullets || [])];
      }
      return { ...prev, experiences: exps };
    });
    addToast('Added bullet to your active resume!', 'success');
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GOOGLE XYZ FORMULA SCORER & AI REWRITER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Accomplished [X] as Measured by [Y], by Doing [Z]
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Turn passive job duties into quantifiable, high-impact resume bullets that captivate hiring managers.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Samples:</span>
          {SAMPLE_BULLETS.map((sample, i) => (
            <button
              key={i}
              onClick={() => handleSampleClick(sample)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 border border-white/10 transition-colors"
            >
              {sample.type === 'weak' ? '🔴 Weak' : sample.type === 'moderate' ? '🟡 Moderate' : '🟢 Master'}
            </button>
          ))}
        </div>
      </div>

      {/* Input & Evaluation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bullet Input Form */}
        <div className="lg:col-span-7 space-y-4">
          <GlassCard glowColor="violet" className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-violet-400" />
                Input Resume Bullet Point
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {inputBullet.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              rows={4}
              value={inputBullet}
              onChange={(e) => setInputBullet(e.target.value)}
              placeholder="e.g. Responsible for improving application speed and writing tests..."
              className="w-full p-4 rounded-xl glass-input text-xs sm:text-sm font-sans text-slate-200 leading-relaxed resize-y focus:ring-1 focus:ring-violet-400"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setInputBullet('');
                  setActiveAnalysis(scoreBulletPoint(''));
                }}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear
              </button>

              <button
                onClick={() => handleAnalyze()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-400 hover:to-pink-400 text-white font-extrabold text-xs shadow-glow-violet flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4" /> Analyze Impact Score
              </button>
            </div>
          </GlassCard>

          {/* Diagnostic Heuristics Checklist */}
          {activeAnalysis && (
            <GlassCard glowColor="none" className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Formula Breakdown Checklist
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-medium">
                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 ${activeAnalysis.hasPowerVerb ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                  <span className="font-bold">Power Verb</span>
                  <span className="text-[10px] font-mono">{activeAnalysis.hasPowerVerb ? '✓ Detected' : '✗ Weak / Missing'}</span>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 ${activeAnalysis.hasMetric ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                  <span className="font-bold">Quantification</span>
                  <span className="text-[10px] font-mono">{activeAnalysis.hasMetric ? '✓ Numbers/Metrics' : '✗ No Metrics'}</span>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 ${!activeAnalysis.hasPassiveVoice ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
                  <span className="font-bold">Active Voice</span>
                  <span className="text-[10px] font-mono">{!activeAnalysis.hasPassiveVoice ? '✓ Active' : '⚠ Passive Phrasing'}</span>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 ${activeAnalysis.hasXyzFormula ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-violet-500/10 border-violet-500/30 text-violet-300'}`}>
                  <span className="font-bold">XYZ Compliant</span>
                  <span className="text-[10px] font-mono">{activeAnalysis.hasXyzFormula ? '✓ Master' : '🟡 Partial'}</span>
                </div>
              </div>

              {/* Feedback items */}
              <div className="space-y-1.5 pt-2">
                {activeAnalysis.feedback.map((fb, i) => (
                  <div key={i} className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{fb}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        {/* Right Score Gauge */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard glowColor="violet" className="flex flex-col items-center justify-center p-6 text-center space-y-4">
            <ScoreGauge
              score={activeAnalysis?.score || 0}
              size={150}
              label="Impact Score"
              sublabel="Google XYZ Rating"
            />

            <div className="w-full space-y-2 pt-3 border-t border-white/10 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-300">
                <span>Power Action Verb:</span>
                <span className={activeAnalysis?.hasPowerVerb ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {activeAnalysis?.hasPowerVerb ? 'Active' : 'Missing'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Metrics & Scope:</span>
                <span className={activeAnalysis?.hasMetric ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {activeAnalysis?.metricsDetected?.length ? activeAnalysis.metricsDetected.join(', ') : 'None'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/30 text-left text-xs text-violet-200">
              <strong>Google Recruiters Look For:</strong> Action verb + concrete project scope + measurable numerical outcome + method utilized.
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 3 AI Generated Rewrites Section */}
      {activeAnalysis?.rewrites && activeAnalysis.rewrites.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              AI Quantified Rewrites (3 High-Impact Options)
            </h2>
            <span className="text-xs font-mono text-slate-400">Click to copy or apply directly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeAnalysis.rewrites.map((rewrite, idx) => (
              <GlassCard
                key={rewrite.id}
                glowColor={idx === 0 ? 'cyan' : idx === 1 ? 'violet' : 'emerald'}
                className="flex flex-col justify-between p-5 space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 border border-white/10 text-white">
                      {rewrite.tone}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">~95% Impact</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                    "{rewrite.text}"
                  </p>

                  <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-white/5 italic">
                    {rewrite.highlight}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleCopy(rewrite.text, idx)}
                    className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>

                  <button
                    onClick={() => handleApplyToResume(rewrite.text)}
                    className="px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                    title="Insert directly into active resume draft"
                  >
                    <Plus className="w-3.5 h-3.5" /> Apply
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
