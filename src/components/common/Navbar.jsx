import React, { useState } from 'react';
import { 
  FileSearch, 
  Sparkles, 
  FileText, 
  Mail, 
  Mic2, 
  KanbanSquare, 
  HelpCircle, 
  UserCheck, 
  Menu, 
  X,
  Compass,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';

export default function Navbar({ activeTab, onTabChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setIsAuthModalOpen } = useAuth();
  const { liveAtsScore } = useResume();

  const navItems = [
    { id: 'landing', label: 'Home', icon: Compass },
    { id: 'ats-scanner', label: 'ATS Scanner', icon: FileSearch, highlight: true },
    
    { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
    { id: 'cover-letter', label: 'Cover Letter', icon: Mail },
    { id: 'mock-interview', label: 'AI Mock Interview', icon: Mic2 },
    { id: 'support', label: 'Help Desk', icon: HelpCircle }
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 60) return 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10';
    return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo - RESUMATE */}
          <div 
            onClick={() => handleTabClick('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-violet-500 to-emerald-400 p-[1px] shadow-glow-cyan group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                RESUMATE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Live ATS pill & User Account */}
          <div className="flex items-center gap-3">
            
            {/* Live ATS score pill */}
            <div 
              onClick={() => handleTabClick('ats-scanner')}
              title="Current Resume ATS Score"
              className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold cursor-pointer hover:scale-105 transition-transform ${getScoreColor(liveAtsScore.overallScore || 85)}`}
            >
              <span className="text-slate-400 font-sans font-medium text-[11px]">ATS Score:</span>
              <span>{liveAtsScore.overallScore || 85}%</span>
            </div>

            {/* Auth / Profile Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-xs font-medium text-slate-200 transition-all hover:border-cyan-500/40 shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{user?.name || 'Account'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800/60 border border-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Signed in as: <strong className="text-white">{user?.name}</strong></span>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Manage Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
