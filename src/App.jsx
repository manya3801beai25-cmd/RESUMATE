import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ToastProvider } from './components/common/Toast';

import ParticleBackground from './components/3d/ParticleBackground';
import Navbar from './components/common/Navbar';
import AuthModal from './components/common/AuthModal';

import LandingPageView from './components/views/LandingPageView';
import AtsScannerView from './components/views/AtsScannerView';

import ResumeBuilderView from './components/views/ResumeBuilderView';
import CoverLetterView from './components/views/CoverLetterView';
import MockInterviewView from './components/views/MockInterviewView';
import CustomerSupportView from './components/views/CustomerSupportView';

import { Cpu, Heart, Shield, Sparkles } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('landing');

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 relative flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Particle Canvas Constellation Background */}
      <ParticleBackground />

      {/* Radial Top Glow Accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Main Glass Navigation Header */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Dynamic View Router */}
      <main className="flex-1 relative z-10">
        {activeTab === 'landing' && (
          <LandingPageView onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'ats-scanner' && (
          <AtsScannerView
            onNavigateToBuilder={() => setActiveTab('resume-builder')}
            onNavigateToBulletScorer={() => setActiveTab('bullet-scorer')}
          />
        )}

        

        {activeTab === 'resume-builder' && (
          <ResumeBuilderView />
        )}

        {activeTab === 'cover-letter' && (
          <CoverLetterView />
        )}

        {activeTab === 'mock-interview' && (
          <MockInterviewView />
        )}

        {activeTab === 'support' && (
          <CustomerSupportView />
        )}
      </main>

      {/* User Auth Modal */}
      <AuthModal />

      {/* Clean Cyber Footer */}
      <footer className="relative z-10 border-t border-white/10 glass-panel py-8 px-4 sm:px-6 lg:px-8 mt-12 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="font-bold text-white tracking-wider">RESUMATE</span>
            <span>• Next-Gen ATS Resume Intelligence</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <button onClick={() => setActiveTab('ats-scanner')} className="hover:text-cyan-300 transition-colors">ATS Scanner</button>
            <button onClick={() => setActiveTab('bullet-scorer')} className="hover:text-cyan-300 transition-colors">XYZ Scorer</button>
            <button onClick={() => setActiveTab('resume-builder')} className="hover:text-cyan-300 transition-colors">Resume Builder</button>
            <button onClick={() => setActiveTab('mock-interview')} className="hover:text-cyan-300 transition-colors">Mock Interview</button>
            <button onClick={() => setActiveTab('support')} className="hover:text-cyan-300 transition-colors">Support Desk</button>
          </div>

          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} RESUMATE. 100% Client-Side Privacy.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ResumeProvider>
    </AuthProvider>
  );
}
