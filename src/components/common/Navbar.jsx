import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Cpu, 
  ClipboardList,
  GraduationCap,
  Compass,
  Linkedin,
  FileEdit, 
  ScanSearch, 
  Mail, 
  HelpCircle, 
  User, 
  Menu, 
  X, 
  Languages
} from 'lucide-react';

export default function Navbar({ user, onOpenAuthModal }) {
  const { currentLang, changeLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 1. OLD / CORE TOOLS (First in navbar)
  const oldFeatures = [
    { to: '/builder', label: t.nav.builder || 'Builder', icon: FileEdit },
    { to: '/scanner', label: t.nav.scanner || 'ATS Scanner', icon: ScanSearch },
    { to: '/cover-letter', label: t.nav.coverLetter || 'Cover Letter', icon: Mail },
  ];

  // 2. NEW FEATURES (Added right afterwards in sequence: Interview -> App Tracker -> LinkedIn -> Roadmap)
  const newFeatures = [
    { to: '/interview-prep', label: t.nav.interviewPrep || 'Interview Prep', icon: GraduationCap },
    { to: '/tracker', label: t.nav.tracker || 'App Tracker', icon: ClipboardList },
    { to: '/linkedin-analyzer', label: t.nav.linkedin || 'LinkedIn Audit', icon: Linkedin },
    { to: '/roadmap', label: t.nav.roadmap || 'Roadmap', icon: Compass },
  ];

  // 3. END FEATURE (Help Desk placed at the very end of navigation)
  const endFeature = { 
    to: '/help-desk', 
    label: t.nav.helpDesk || 'Help Desk', 
    icon: HelpCircle 
  };

  return (
    <header className="sticky top-0 z-40 bg-[#060a12]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#060a12] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  {t.nav.brand}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/40">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden 2xl:block">
                {t.nav.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation: Old features first -> New features in sequence -> Help Desk at the end */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10 shadow-inner">
            
            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.nav.home}</span>
            </NavLink>

            {/* Subtle Divider */}
            <div className="h-4 w-[1px] bg-white/15 mx-0.5 shrink-0" />

            {/* 1. Old / Core Features */}
            {oldFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-2 xl:px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {/* Subtle Divider */}
            <div className="h-4 w-[1px] bg-white/15 mx-0.5 shrink-0" />

            {/* 2. New Features (Added right afterwards in sequence) */}
            {newFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-2 xl:px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {/* Subtle Divider before Help Desk */}
            <div className="h-4 w-[1px] bg-white/15 mx-0.5 shrink-0" />

            {/* 3. Help Desk (End Feature) */}
            {(() => {
              const Icon = endFeature.icon;
              return (
                <NavLink
                  to={endFeature.to}
                  className={({ isActive }) =>
                    `px-2 xl:px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{endFeature.label}</span>
                </NavLink>
              );
            })()}

          </nav>

          {/* Right Language Switcher & Profile Actions */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Language Selector */}
            <div className="flex items-center gap-0.5 bg-black/50 p-1 rounded-xl border border-white/10">
              <Languages className="w-3.5 h-3.5 text-cyan-400 ml-1 hidden xl:block" />
              
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'en'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>

              <button
                onClick={() => changeLanguage('hi')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'hi'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="हिन्दी (Hindi)"
              >
                हिन्दी
              </button>

              <button
                onClick={() => changeLanguage('pa')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'pa'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="ਪੰਜਾਬੀ (Punjabi)"
              >
                ਪੰਜਾਬੀ
              </button>
            </div>

            {/* User Profile / Guest Mode */}
            {user && (
              <button
                onClick={onOpenAuthModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span className="max-w-[85px] xl:max-w-[110px] truncate">{user.name || t.nav.guest}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 space-y-2 animate-fadeIn">
            
            {/* Home */}
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`
              }
            >
              <Cpu className="w-4 h-4" />
              <span>{t.nav.home}</span>
            </NavLink>

            {/* Old Features */}
            <div className="grid grid-cols-2 gap-2">
              {oldFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-white/5 text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-white/10 my-2" />

            {/* New Features */}
            <div className="grid grid-cols-2 gap-2">
              {newFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-white/5 text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-white/10 my-2" />

            {/* Help Desk (End Feature) */}
            <NavLink
              to={endFeature.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`
              }
            >
              <HelpCircle className="w-4 h-4" />
              <span>{endFeature.label}</span>
            </NavLink>

            {user && (
              <button
                onClick={() => { setIsMobileMenuOpen(false); onOpenAuthModal(); }}
                className="w-full mt-2 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-slate-200 flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>{user.name} ({user.tier || t.nav.guest})</span>
              </button>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
