import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Timer, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Radio, 
  ChevronRight, 
  MessageSquare, 
  HelpCircle,
  Play,
  Square
} from 'lucide-react';
import ScoreGauge from '../common/ScoreGauge';
import GlassCard from '../common/GlassCard';
import { 
  INTERVIEW_ROLES, 
  QUESTION_BANK, 
  evaluateAnswer, 
  speakQuestion, 
  stopSpeech 
} from '../../utils/interviewEngine';
import { useToast } from '../common/Toast';

export default function MockInterviewView() {
  const { addToast } = useToast();

  const [selectedRole, setSelectedRole] = useState('fullstack');
  const [practiceMode, setPracticeMode] = useState('standard'); // 'standard' | 'blitz' | 'voice'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Rapid-Fire Blitz Timer (20s)
  const [blitzTimer, setBlitzTimer] = useState(20);
  const [isBlitzActive, setIsBlitzActive] = useState(false);
  const blitzIntervalRef = useRef(null);

  // Speech Recognition Reference
  const recognitionRef = useRef(null);

  const currentQuestions = QUESTION_BANK[selectedRole] || QUESTION_BANK.fullstack;
  const activeQuestion = currentQuestions[currentQIndex] || currentQuestions[0];

  // Evaluated Score
  const [evaluation, setEvaluation] = useState(() => evaluateAnswer(''));

  useEffect(() => {
    setUserAnswer('');
    setEvaluation(evaluateAnswer(''));
    stopSpeech();
    setIsSpeaking(false);
    resetBlitz();
  }, [selectedRole, currentQIndex]);

  // Handle Blitz Timer
  useEffect(() => {
    if (isBlitzActive && blitzTimer > 0) {
      blitzIntervalRef.current = setInterval(() => {
        setBlitzTimer(prev => prev - 1);
      }, 1000);
    } else if (blitzTimer === 0 && isBlitzActive) {
      clearInterval(blitzIntervalRef.current);
      setIsBlitzActive(false);
      handleGradeAnswer();
      addToast('Time is up! Evaluation complete.', 'info');
    }

    return () => clearInterval(blitzIntervalRef.current);
  }, [isBlitzActive, blitzTimer]);

  const startBlitz = () => {
    setBlitzTimer(20);
    setIsBlitzActive(true);
    setUserAnswer('');
    addToast('Rapid-Fire 20s blitz started! Answer quickly.', 'info');
  };

  const resetBlitz = () => {
    setIsBlitzActive(false);
    setBlitzTimer(20);
    clearInterval(blitzIntervalRef.current);
  };

  // Text-To-Speech
  const handleToggleTTS = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakQuestion(activeQuestion.question, () => {
        setIsSpeaking(false);
      });
    }
  };

  // Speech Recognition (Voice Input)
  const handleToggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      addToast('Web Speech Recognition is not supported in this browser. You can type your answer instead.', 'error');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        addToast('Listening... Speak your answer.', 'info');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setUserAnswer(prev => prev + transcript);
      };

      recognition.onerror = (err) => {
        console.error(err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      addToast('Could not start voice recognition.', 'error');
    }
  };

  const handleGradeAnswer = () => {
    const res = evaluateAnswer(userAnswer, activeQuestion);
    setEvaluation(res);
    addToast(`Answer evaluated! STAR Score: ${res.score}%`, 'success');
  };

  const nextQuestion = () => {
    if (currentQIndex < currentQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setCurrentQIndex(0);
    }
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-2">
            <Mic className="w-3.5 h-3.5" />
            <span>AI MOCK INTERVIEW & STAR COACH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Role-Specific STAR Practice Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Master high-stakes behavioral and technical interview questions with live STAR methodology grading.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-white/10">
          {[
            { id: 'standard', label: 'Standard STAR' },
            { id: 'blitz', label: '⚡ Rapid-Fire (20s)' },
            { id: 'voice', label: '🎙️ Voice & Audio' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => {
                setPracticeMode(m.id);
                resetBlitz();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                practiceMode === m.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Role Selection Chips */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-mono text-slate-400 mr-1">Target Track:</span>
        {INTERVIEW_ROLES.map(role => (
          <button
            key={role.id}
            onClick={() => {
              setSelectedRole(role.id);
              setCurrentQIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedRole === role.id
                ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-glow-cyan'
                : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:bg-slate-800'
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Main Practice Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Question & Candidate Answer (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Question Card */}
          <GlassCard glowColor="cyan" className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Question {currentQIndex + 1} of {currentQuestions.length}
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">{activeQuestion.category}</span>
              </div>

              {/* Text-to-Speech Play Button */}
              <button
                onClick={handleToggleTTS}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                  isSpeaking
                    ? 'bg-cyan-500/30 text-cyan-300 border-cyan-400 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/10'
                }`}
                title="AI reads question aloud"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                <span className="hidden sm:inline">{isSpeaking ? 'Stop Voice' : 'Listen'}</span>
              </button>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              "{activeQuestion.question}"
            </h2>

            {/* STAR Breakdown Guidance Accordion */}
            {activeQuestion.starTips && (
              <div className="p-3.5 bg-slate-900/70 rounded-xl border border-white/5 space-y-2 text-xs">
                <p className="font-mono text-cyan-300 font-bold uppercase text-[10px]">Recommended STAR Strategy:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div><strong className="text-white">Situation:</strong> {activeQuestion.starTips.situation}</div>
                  <div><strong className="text-white">Task:</strong> {activeQuestion.starTips.task}</div>
                  <div><strong className="text-white">Action:</strong> {activeQuestion.starTips.action}</div>
                  <div><strong className="text-white">Result:</strong> {activeQuestion.starTips.result}</div>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Rapid-Fire Blitz Timer Banner */}
          {practiceMode === 'blitz' && (
            <div className="p-4 rounded-xl glass-panel border border-violet-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-lg ${blitzTimer <= 5 ? 'bg-red-500/20 text-red-400 animate-ping' : 'bg-violet-500/20 text-violet-300'}`}>
                  {blitzTimer}s
                </div>
                <div>
                  <p className="text-xs font-bold text-white">20-Second Rapid-Fire Blitz Drills</p>
                  <p className="text-[11px] text-slate-400">Answer before the clock hits zero!</p>
                </div>
              </div>

              {!isBlitzActive ? (
                <button
                  onClick={startBlitz}
                  className="px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-bold text-xs shadow-glow-violet flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Start Timer
                </button>
              ) : (
                <button
                  onClick={resetBlitz}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 flex items-center gap-1"
                >
                  <Square className="w-3.5 h-3.5 text-red-400" /> Stop
                </button>
              )}
            </div>
          )}

          {/* Answer Input Area */}
          <GlassCard glowColor="none" className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Your Answer / Response
              </label>

              {/* Voice input trigger */}
              <button
                onClick={handleToggleVoiceInput}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isListening
                    ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/10'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{isListening ? 'Stop Recording' : 'Voice Dictate'}</span>
              </button>
            </div>

            <textarea
              rows={6}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Structure your answer: Start with the Situation at your company, the Task assigned, specific Actions you led, and the final quantifiable Result..."
              className="w-full p-4 rounded-xl glass-input text-xs sm:text-sm font-sans text-slate-100 leading-relaxed resize-y focus:ring-1 focus:ring-cyan-400"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={nextQuestion}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                Skip to Next Question <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleGradeAnswer}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-glow-cyan flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4" /> Evaluate STAR Score
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Real-Time Scorecard (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard glowColor="cyan" className="p-6 text-center space-y-5">
            <ScoreGauge
              score={evaluation.score}
              size={140}
              label="STAR Score"
              sublabel="Response Quality"
            />

            {/* STAR Checklist 4-Pill Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className={`p-2.5 rounded-lg border flex items-center justify-between ${evaluation.starChecklist.situation ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900/60 border-white/5 text-slate-400'}`}>
                <span>Situation:</span>
                <span>{evaluation.starChecklist.situation ? '✓ PASS' : '✗ MISSING'}</span>
              </div>
              <div className={`p-2.5 rounded-lg border flex items-center justify-between ${evaluation.starChecklist.task ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900/60 border-white/5 text-slate-400'}`}>
                <span>Task:</span>
                <span>{evaluation.starChecklist.task ? '✓ PASS' : '✗ MISSING'}</span>
              </div>
              <div className={`p-2.5 rounded-lg border flex items-center justify-between ${evaluation.starChecklist.action ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900/60 border-white/5 text-slate-400'}`}>
                <span>Action:</span>
                <span>{evaluation.starChecklist.action ? '✓ PASS' : '✗ MISSING'}</span>
              </div>
              <div className={`p-2.5 rounded-lg border flex items-center justify-between ${evaluation.starChecklist.result ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900/60 border-white/5 text-slate-400'}`}>
                <span>Result:</span>
                <span>{evaluation.starChecklist.result ? '✓ PASS' : '✗ MISSING'}</span>
              </div>
            </div>

            {/* Coach Feedback List */}
            <div className="space-y-2 pt-3 border-t border-white/10 text-left">
              <p className="text-xs font-mono font-bold text-cyan-300 uppercase">AI Interviewer Feedback:</p>
              {evaluation.feedback.map((fb, i) => (
                <div key={i} className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-white/5 leading-snug">
                  {fb}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
}
