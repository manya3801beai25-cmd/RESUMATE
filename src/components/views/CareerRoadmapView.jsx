import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  CAREER_ROADMAPS, 
  getRoadmapStats, 
  crossCheckResumeWithRoadmap 
} from '../../utils/roadmapData';
import { extractSkillsFromResume } from '../../utils/jobMatchingEngine';
import { 
  Compass, 
  RotateCcw, 
  FolderGit2, 
  Trophy, 
  Flame, 
  Check, 
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * CareerRoadmapView Component
 * Clean, Spacious, and Short Phased Milestones
 */
export default function CareerRoadmapView({ resumeData, addToast }) {
  const { t } = useLanguage();

  // 1. Active Role Selection
  const [selectedRoleId, setSelectedRoleId] = useState('ml_engineer');

  // 2. Completed Skills Map (Stored in localStorage)
  const [completedSkillsMap, setCompletedSkillsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_roadmap_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      ml_engineer: ['Python Basics', 'OOPs in Python', 'NumPy Arrays'],
      fullstack: ['Semantic HTML5', 'Box Model & Responsive Design', 'Flexbox & CSS Grid', 'useState & State Management'],
      java_backend: ['OOPs (Polymorphism, Inheritance, Encapsulation)', 'Java Collections Framework'],
      data_analyst: ['SELECT, WHERE, GROUP BY', 'JOINs (INNER, LEFT, FULL)']
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('resumate_roadmap_progress', JSON.stringify(completedSkillsMap));
    } catch (e) {}
  }, [completedSkillsMap]);

  // Current Roadmap Object
  const currentRoadmap = useMemo(() => {
    return CAREER_ROADMAPS.find(r => r.id === selectedRoleId) || CAREER_ROADMAPS[0];
  }, [selectedRoleId]);

  const activeCompletedSkills = useMemo(() => {
    return completedSkillsMap[selectedRoleId] || [];
  }, [completedSkillsMap, selectedRoleId]);

  const totalSkillsCount = useMemo(() => {
    return getRoadmapStats(currentRoadmap);
  }, [currentRoadmap]);

  const progressPercentage = useMemo(() => {
    if (totalSkillsCount === 0) return 0;
    return Math.round((activeCompletedSkills.length / totalSkillsCount) * 100);
  }, [activeCompletedSkills, totalSkillsCount]);

  // Resume Cross Check (Clean & Concise)
  const userResumeSkills = useMemo(() => extractSkillsFromResume(resumeData), [resumeData]);
  const resumeCrossCheck = useMemo(() => crossCheckResumeWithRoadmap(userResumeSkills, currentRoadmap), [userResumeSkills, currentRoadmap]);

  // Milestone Badge
  const achievementBadge = useMemo(() => {
    if (progressPercentage >= 80) return { text: 'Industry Ready 🚀', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    if (progressPercentage >= 40) return { text: 'Skilled Developer ⚡', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
    return { text: 'Fresh Explorer 🌱', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
  }, [progressPercentage]);

  // Toggle Skill Checkbox
  const handleToggleSkill = (skill) => {
    setCompletedSkillsMap(prev => {
      const currentList = prev[selectedRoleId] || [];
      const isDone = currentList.includes(skill);
      let updated;
      if (isDone) {
        updated = currentList.filter(s => s !== skill);
      } else {
        updated = [...currentList, skill];
        if (updated.length === totalSkillsCount) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          if (addToast) addToast(`🏆 Congratulations! Completed 100% of ${currentRoadmap.title}!`, 'success');
        } else if (addToast) {
          addToast(`Skill mastered! 🎯`, 'success', 1500);
        }
      }
      return { ...prev, [selectedRoleId]: updated };
    });
  };

  // Reset Progress
  const handleResetProgress = () => {
    if (window.confirm(`Reset progress for ${currentRoadmap.title}?`)) {
      setCompletedSkillsMap(prev => ({ ...prev, [selectedRoleId]: [] }));
      if (addToast) addToast('Progress reset', 'info');
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* 1. CLEAN & AIRY HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Career Roadmaps</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Step-by-Step Learning Track
          </h1>
          <p className="text-sm text-slate-400">
            Check off skills as you learn them to track your career readiness.
          </p>
        </div>

        <button
          onClick={handleResetProgress}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2. ROLE TABS (Short, Spacious, Clear) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CAREER_ROADMAPS.map((role) => {
          const isSelected = selectedRoleId === role.id;
          const completedCount = (completedSkillsMap[role.id] || []).length;
          const total = getRoadmapStats(role);
          const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

          return (
            <button
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#12102b] border-violet-500 shadow-xl shadow-violet-500/20 ring-1 ring-violet-500/50'
                  : 'bg-[#080d1a] border-white/10 hover:border-violet-500/30'
              }`}
            >
              <div className="space-y-2">
                <span className="text-2xl">{role.icon}</span>
                <h3 className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-violet-300' : 'text-white'}`}>
                  {role.title}
                </h3>
              </div>
              <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-emerald-400 font-semibold">{role.salary}</span>
                <span>{percent}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. ELEGANT & SPACIOUS PROGRESS CARD */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1029] via-[#09152b] to-[#0d1029] border border-violet-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{currentRoadmap.icon}</span>
              <span>{currentRoadmap.title}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Salary: <strong className="text-emerald-300">{currentRoadmap.salary}</strong>
            </p>
          </div>

          <div className={`px-3 py-1 rounded-xl border text-xs font-bold font-mono self-start sm:self-auto flex items-center gap-1.5 ${achievementBadge.color}`}>
            <Trophy className="w-3.5 h-3.5" />
            <span>{achievementBadge.text}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Progress: {progressPercentage}%</span>
            <span>{activeCompletedSkills.length}/{totalSkillsCount} Skills Mastered</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-black/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Resume Matched Notice (Short & clean) */}
        {resumeCrossCheck.masteredInResume.length > 0 && (
          <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong className="text-emerald-300">{resumeCrossCheck.masteredInResume.length} skills</strong> already verified from your resume ({resumeCrossCheck.masteredInResume.slice(0, 4).join(', ')})
            </span>
          </div>
        )}
      </div>

      {/* 4. SPACIOUS MILESTONE PHASES (Clear, Short, Uncluttered) */}
      <div className="space-y-6">
        {currentRoadmap.phases.map((phase, pIndex) => (
          <div key={phase.id} className="p-6 rounded-2xl bg-[#080d19] border border-white/10 space-y-5 shadow-lg">
            
            {/* Phase Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-white/5">
              <span className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-300 font-mono text-xs font-bold flex items-center justify-center">
                0{pIndex + 1}
              </span>
              <h3 className="text-base font-bold text-white tracking-wide">
                {phase.title}
              </h3>
            </div>

            {/* Steps & Checklists with generous breathing room */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phase.steps.map((step) => {
                return (
                  <div key={step.id} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
                    <h4 className="text-xs font-bold text-white">
                      {step.title}
                    </h4>

                    {/* Skill Checkboxes */}
                    <div className="space-y-1.5">
                      {step.skills.map((skill, sIdx) => {
                        const isDone = activeCompletedSkills.includes(skill);
                        return (
                          <div
                            key={sIdx}
                            onClick={() => handleToggleSkill(skill)}
                            className={`p-2 rounded-lg border flex items-center gap-2.5 cursor-pointer select-none transition-all ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-black/20 border-white/5 hover:border-white/10 text-slate-300'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                              isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-500'
                            }`}>
                              {isDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                            <span className={`text-xs ${isDone ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                              {skill}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Short Project Tip */}
                    {step.projectIdea && (
                      <p className="text-[11px] text-cyan-300/80 pt-1 flex items-start gap-1.5">
                        <FolderGit2 className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>Build: {step.projectIdea}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
