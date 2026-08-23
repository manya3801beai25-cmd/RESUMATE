import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Send, 
  Ticket, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Bot,
  User,
  Clock
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';

export default function CustomerSupportView() {
  const { supportTickets, addSupportTicket, user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'ticket' | 'faq'
  
  // Live Chat Simulator state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your 24/7 Resumate Career & ATS Support Assistant. How can I help optimize your job hunt today?',
      time: 'Just now'
    }
  ]);
  const [inputChat, setInputChat] = useState('');

  // Ticket Form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('ATS Consultation');
  const [ticketDetails, setTicketDetails] = useState('');

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState(0);

  const FAQS = [
    {
      q: 'How does Resumate calculate the ATS Match Score?',
      a: 'Resumate parses both your resume and the target job description into categorized semantic tokens (Hard Tech Skills, Soft Skills/Methodologies, and Tools). The algorithm applies a 50% weight to hard skill keyword density, 20% to soft skills, 20% to formatting health, and 10% to keyword frequency.'
    },
    {
      q: 'Does Resumate work with Greenhouse, Workday, and Lever?',
      a: 'Yes! Our ATS Detector engine specifically emulates the parsing heuristics of Greenhouse, Workday, Taleo, Ashby, Lever, and iCIMS, warning you about table limits, multi-column stripping, and specific date formatting.'
    },
    {
      q: 'What is the Google XYZ Formula and why is it important?',
      a: 'The Google XYZ formula was pioneered by Laszlo Bock (ex-SVP of People Operations at Google): "Accomplished [X] as measured by [Y], by doing [Z]". It forces candidate bullet points to focus on concrete business impact and quantifiable numbers rather than passive duties.'
    },
    {
      q: 'Are my resume and personal data private and secure?',
      a: '100% private. All NLP parsing, scoring heuristics, and speech synthesis run entirely client-side inside your browser. No personal resume content or contact details are sent to external third-party servers.'
    },
    {
      q: 'How do I download a high-resolution vector PDF of my resume?',
      a: 'In the Live Resume Builder view, click the "PDF Export" button at the top right. It instantly renders an A4 vector document optimized for standard ATS parsers.'
    }
  ];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputChat,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputChat.toLowerCase();
    setInputChat('');

    // Simulate smart bot response
    setTimeout(() => {
      let reply = "I can definitely help with that! To maximize ATS searchability, make sure your hard skill keywords appear in both your Skills section and within your work experience bullet points.";
      
      if (query.includes('workday') || query.includes('greenhouse')) {
        reply = "Workday and Greenhouse parse single-column layouts with standard headers (Experience, Skills, Education) best. Avoid nested text boxes or graphic skill bars.";
      } else if (query.includes('xyz') || query.includes('bullet') || query.includes('google')) {
        reply = "Google XYZ formula requires an action verb + measurable metric (e.g. % increase or $ saved) + the methodology used. Check out our XYZ Bullet Scorer view for 3 AI rewrites!";
      } else if (query.includes('pdf') || query.includes('export') || query.includes('download')) {
        reply = "You can download your resume as a clean PDF in the Resume Builder view by clicking 'PDF Export'.";
      } else if (query.includes('interview') || query.includes('star') || query.includes('voice')) {
        reply = "Head to the AI Mock Interview simulator to practice standard STAR responses or 20-second Rapid-Fire blitz rounds with voice feedback.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: 'Just now'
      }]);
    }, 700);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDetails.trim()) {
      addToast('Please provide a subject and details.', 'error');
      return;
    }

    const created = addSupportTicket({
      subject: ticketSubject,
      category: ticketCategory,
      details: ticketDetails
    });

    setTicketSubject('');
    setTicketDetails('');
    addToast(`Ticket #${created.id} submitted! Support will respond within 24 hours.`, 'success');
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>24/7 CUSTOMER CARE & HELP DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Support Center & Career Knowledge Base
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Chat with our AI Career Assistant, submit inquiries to human advisors, or browse the ATS FAQ.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-white/10">
          {[
            { id: 'chat', label: '💬 Live Assistant' },
            { id: 'ticket', label: '🎫 Ticket Desk' },
            { id: 'faq', label: '📖 Knowledge FAQ' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* TAB 1: LIVE CHAT ASSISTANT */}
        {activeTab === 'chat' && (
          <div className="lg:col-span-12">
            <GlassCard glowColor="cyan" className="p-0 overflow-hidden flex flex-col h-[560px]">
              
              {/* Chat Header */}
              <div className="p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Resumate Copilot
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="text-[10px] text-slate-400">Online • Instant ATS Guidance</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  Assistant Active
                </span>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${msg.sender === 'user' ? 'bg-violet-500/30 text-violet-300 border border-violet-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'}`}>
                      {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-tr-none' : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendChat} className="p-3 bg-slate-900/90 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  placeholder="Ask any question about ATS matching, Workday formatting, or interview tips..."
                  className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:ring-1 focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </form>
            </GlassCard>
          </div>
        )}

        {/* TAB 2: SUPPORT TICKET DESK */}
        {activeTab === 'ticket' && (
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* New Ticket Form */}
            <div className="lg:col-span-7">
              <GlassCard glowColor="cyan" className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-cyan-400" />
                  Submit Support or Feature Ticket
                </h3>

                <form onSubmit={handleTicketSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Ticket Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Issue parsing multi-page PDF"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs bg-slate-900"
                    >
                      <option value="ATS Consultation">ATS Consultation</option>
                      <option value="Technical Issue">Technical / PDF Export Issue</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Billing & Pro Tier">Account / Pro Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Details</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Explain your question or feedback in detail..."
                      value={ticketDetails}
                      onChange={(e) => setTicketDetails(e.target.value)}
                      className="w-full p-3 rounded-lg glass-input text-xs resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Ticket
                  </button>
                </form>
              </GlassCard>
            </div>

            {/* Existing Tickets List */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Your Support Inquiries ({supportTickets.length})
              </h3>

              {supportTickets.map((tkt) => (
                <GlassCard key={tkt.id} glowColor="none" className="p-4 bg-slate-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-300">#{tkt.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${tkt.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                      {tkt.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{tkt.subject}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-white/5">
                    <span>{tkt.category}</span>
                    <span>{tkt.date}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FAQ ACCORDION */}
        {activeTab === 'faq' && (
          <div className="lg:col-span-12 space-y-3">
            {FAQS.map((faq, idx) => (
              <GlassCard
                key={idx}
                glowColor="cyan"
                className="p-5 cursor-pointer transition-all"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-mono">
                      ?
                    </span>
                    {faq.q}
                  </h3>
                  {expandedFaq === idx ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>

                {expandedFaq === idx && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 pt-3 border-t border-white/10 leading-relaxed font-sans">
                    {faq.a}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
