import React, { useState, useMemo, useCallback } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// UI Components
import Navbar from './components/common/Navbar';
import AuthModal from './components/common/AuthModal';
import ToastContainer from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute';

// View Pages
import LandingPageView from './components/views/LandingPageView';
import ApplicationTrackerView from './components/views/ApplicationTrackerView';
import InterviewPrepView from './components/views/InterviewPrepView';
import CareerRoadmapView from './components/views/CareerRoadmapView';
import LinkedInAnalyzerView from './components/views/LinkedInAnalyzerView';
import ResumeBuilderView from './components/views/ResumeBuilderView';
import AtsScannerView from './components/views/AtsScannerView';
import CoverLetterView from './components/views/CoverLetterView';
import CustomerSupportView from './components/views/CustomerSupportView';
import AccountView from './components/views/AccountView';
import NotFoundView from './components/views/NotFoundView';

// Custom Hooks & Helper Utilities (Lectures 31-42)
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateAtsMatch } from './utils/atsEngine';
import { 
  INITIAL_RESUME, 
  INITIAL_USER, 
  INITIAL_SCAN_HISTORY 
} from './utils/initialData';

import { Cpu, Heart, Sparkles, Globe } from 'lucide-react';

function AppContent() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 1. Custom Hooks for persistent state (Lectures 19-24: Browser storage & JSON)
  const [user, setUser] = useLocalStorage('resumate_user', INITIAL_USER);
  const [resumeData, setResumeData] = useLocalStorage('resumate_active_resume', INITIAL_RESUME);
  const [scanHistory, setScanHistory] = useLocalStorage('resumate_scans', INITIAL_SCAN_HISTORY);
  const [applications, setApplications] = useLocalStorage('resumate_applications', []);

  // 2. Local state for templates and modal UI state
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [targetJobDescription, setTargetJobDescription] = useState(
    `Job Title: Senior Full Stack Engineer\nRequired Skills: React, TypeScript, Node.js, PostgreSQL, AWS, Docker, Kubernetes, CI/CD, Agile.`
  );

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // 3. useCallback hook for memoized Toast Notifications (Lectures 31-36)
  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  // 4. State updater handlers (Lifting State Up)
  const updateResumeData = useCallback((updater) => {
    setResumeData((prev) => {
      return typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
    });
  }, [setResumeData]);

  const loginUser = useCallback((name, email) => {
    setUser({
      name: name || 'Demo Member',
      email: email || 'user@resumate.io',
      isGuest: false,
      tier: 'Pro Member'
    });
    addToast('Profile saved successfully!', 'success');
  }, [setUser, addToast]);

  const loginAsGuest = useCallback(() => {
    setUser({
      name: 'Guest Explorer',
      email: 'guest@resumate.io',
      isGuest: true,
      tier: 'Free Trial'
    });
    addToast('Switched to Guest Explorer mode.', 'info');
  }, [setUser, addToast]);

  const addScanRecord = useCallback((record) => {
    const newRecord = {
      id: `scan-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...record
    };
    setScanHistory((prev) => [newRecord, ...prev.slice(0, 9)]);
  }, [setScanHistory]);

  // Handler for adding application from Job Matcher directly into Tracker
  const handleSaveApplicationFromJob = useCallback((newApp) => {
    setApplications((prev) => [newApp, ...prev]);
  }, [setApplications]);

  // 5. useMemo hook for expensive calculations (Plain Text Resume & Live ATS Match)
  const plainTextResume = useMemo(() => {
    const p = resumeData.personal || {};
    const expText = (resumeData.experiences || [])
      .map((e) => `${e.role} at ${e.company}\n${(e.bullets || []).join('\n')}`)
      .join('\n\n');
    const projText = (resumeData.projects || [])
      .map((pr) => `${pr.name} (${pr.techStack}):\n${(pr.bullets || []).join('\n')}`)
      .join('\n\n');
    const skillsText = Object.values(resumeData.skills || {}).join(' ');
    const eduText = (resumeData.education || [])
      .map((ed) => `${ed.degree} ${ed.school} ${ed.year}`)
      .join(' ');

    return `${p.fullName || ''} - ${p.roleTitle || ''}\n${p.email || ''} | ${p.phone || ''} | ${p.location || ''}\n\nSUMMARY\n${resumeData.summary || ''}\n\nEXPERIENCE\n${expText}\n\nPROJECTS\n${projText}\n\nSKILLS\n${skillsText}\n\nEDUCATION\n${eduText}`;
  }, [resumeData]);

  const liveAtsResult = useMemo(() => {
    return calculateAtsMatch(plainTextResume, targetJobDescription);
  }, [plainTextResume, targetJobDescription]);

  const liveAtsScore = liveAtsResult.overallScore || 85;

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 relative flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Ambient Glow Mesh */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Navigation Header with Multilingual Support */}
      <Navbar
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main React Router View Switcher (Lectures 37-48) */}
      <main className="flex-1 relative z-10">
        <Routes>
          {/* Home Landing Page */}
          <Route 
            path="/" 
            element={
              <LandingPageView
                onNavigate={(path) => navigate(`/${path}`)}
                addToast={addToast}
              />
            } 
          />

          {/* Fast Application Tracker */}
          <Route 
            path="/tracker" 
            element={
              <ApplicationTrackerView
                addToast={addToast}
              />
            } 
          />
          <Route path="/applications" element={<Navigate to="/tracker" replace />} />
          <Route path="/jobs" element={<Navigate to="/tracker" replace />} />
          <Route path="/job-tracker" element={<Navigate to="/tracker" replace />} />
          <Route path="/portfolio" element={<Navigate to="/tracker" replace />} />
          <Route path="/projects" element={<Navigate to="/tracker" replace />} />
          <Route path="/outreach" element={<Navigate to="/tracker" replace />} />
          <Route path="/recruiter-outreach" element={<Navigate to="/tracker" replace />} />
          <Route path="/salary-calculator" element={<Navigate to="/tracker" replace />} />
          <Route path="/salary" element={<Navigate to="/tracker" replace />} />

          {/* New Feature: Interview Preparation Copilot & Q&A Hub */}
          <Route 
            path="/interview-prep" 
            element={
              <InterviewPrepView
                addToast={addToast}
              />
            } 
          />

          {/* 3. Feature 3: Personalized Career Roadmap */}
          <Route 
            path="/roadmap" 
            element={
              <CareerRoadmapView
                resumeData={resumeData}
                addToast={addToast}
              />
            } 
          />

          {/* 5. Feature 5: LinkedIn Profile Analyzer */}
          <Route 
            path="/linkedin-analyzer" 
            element={
              <LinkedInAnalyzerView
                resumeData={resumeData}
                addToast={addToast}
              />
            } 
          />

          {/* Resume Builder Routes */}
          <Route 
            path="/builder" 
            element={
              <ResumeBuilderView
                resumeData={resumeData}
                onUpdateResume={updateResumeData}
                activeTemplate={activeTemplate}
                onSelectTemplate={setActiveTemplate}
                liveAtsScore={liveAtsScore}
                addToast={addToast}
              />
            } 
          />
          <Route 
            path="/builder/:templateId" 
            element={
              <ResumeBuilderView
                resumeData={resumeData}
                onUpdateResume={updateResumeData}
                activeTemplate={activeTemplate}
                onSelectTemplate={setActiveTemplate}
                liveAtsScore={liveAtsScore}
                addToast={addToast}
              />
            } 
          />

          {/* ATS Scanner Routes */}
          <Route 
            path="/scanner" 
            element={
              <AtsScannerView
                onAddScanRecord={addScanRecord}
                addToast={addToast}
              />
            } 
          />
          <Route 
            path="/scanner/:presetId" 
            element={
              <AtsScannerView
                onAddScanRecord={addScanRecord}
                addToast={addToast}
              />
            } 
          />

          {/* Cover Letter Route */}
          <Route 
            path="/cover-letter" 
            element={
              <CoverLetterView
                resumeData={resumeData}
                addToast={addToast}
              />
            } 
          />

          {/* Help Desk Route */}
          <Route 
            path="/help-desk" 
            element={
              <CustomerSupportView
                user={user}
                addToast={addToast}
              />
            } 
          />
          <Route path="/faq" element={<Navigate to="/help-desk" replace />} />

          {/* Protected Account Route */}
          <Route element={<ProtectedRoute isAllowed={!user.isGuest} redirectPath="/" />}>
            <Route 
              path="/account" 
              element={
                <AccountView 
                  user={user} 
                  scanHistory={scanHistory} 
                />
              } 
            />
          </Route>

          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>

      {/* User Profile Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onSaveUser={loginUser}
        onGuestLogin={loginAsGuest}
      />

      {/* Global Toast Container */}
      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
      />

      {/* Clean Cyber Footer */}
      <footer className="relative z-10 border-t border-white/10 glass-panel py-8 px-4 sm:px-6 lg:px-8 mt-12 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="font-bold text-white tracking-wider">RESUMATE</span>
            <span>• Next-Gen AI ATS & Career Copilot</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-mono">
            <button onClick={() => navigate('/builder')} className="hover:text-cyan-300 transition-colors">Resume Builder</button>
            <span className="text-white/20">•</span>
            <button onClick={() => navigate('/scanner')} className="hover:text-emerald-300 transition-colors">ATS Scanner</button>
            <span className="text-white/20">•</span>
            <button onClick={() => navigate('/cover-letter')} className="hover:text-pink-300 transition-colors">Cover Letter</button>
            <span className="text-white/20">|</span>
            <button onClick={() => navigate('/interview-prep')} className="hover:text-amber-300 transition-colors">Interview Prep</button>
            <span className="text-white/20">•</span>
            <button onClick={() => navigate('/tracker')} className="hover:text-cyan-300 transition-colors">App Tracker</button>
            <span className="text-white/20">•</span>
            <button onClick={() => navigate('/linkedin-analyzer')} className="hover:text-blue-300 transition-colors">LinkedIn Audit</button>
            <span className="text-white/20">•</span>
            <button onClick={() => navigate('/roadmap')} className="hover:text-violet-300 transition-colors">Roadmap</button>
            <span className="text-white/20">|</span>
            <button onClick={() => navigate('/help-desk')} className="hover:text-cyan-400 transition-colors font-semibold">Help Desk</button>
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
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
