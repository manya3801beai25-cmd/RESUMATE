import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const INITIAL_KANBAN_JOBS = [
  {
    id: 'job-1',
    company: 'Apex Innovations',
    role: 'Senior Full Stack Engineer',
    location: 'Remote (US)',
    salary: '$170k - $195k',
    stage: 'interviewing',
    atsScore: 92,
    dateAdded: '2026-08-14',
    notes: 'Technical screening passed. System Design round scheduled for Thursday.'
  },
  {
    id: 'job-2',
    company: 'Stripe',
    role: 'Staff Frontend Engineer',
    location: 'San Francisco, CA',
    salary: '$210k - $240k',
    stage: 'applied',
    atsScore: 88,
    dateAdded: '2026-08-16',
    notes: 'Submitted tailored resume and cover letter via referral.'
  },
  {
    id: 'job-3',
    company: 'Vercel',
    role: 'Senior React / Next.js Specialist',
    location: 'Remote',
    salary: '$180k - $210k',
    stage: 'offer',
    atsScore: 96,
    dateAdded: '2026-08-10',
    notes: 'Offer received! Reviewing equity package & benefits.'
  },
  {
    id: 'job-4',
    company: 'Anthropic',
    role: 'AI Interface Engineer',
    location: 'San Francisco / Hybrid',
    salary: '$190k - $230k',
    stage: 'saved',
    atsScore: 84,
    dateAdded: '2026-08-18',
    notes: 'Pre-requisite: Review Claude API docs and Prompt Caching.'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('resumate_user');
    return saved ? JSON.parse(saved) : {
      name: 'Alex Rivera',
      email: 'alex.rivera@resumate.io',
      isGuest: true,
      tier: 'Pro Member',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
  });

  const [scanHistory, setScanHistory] = useState(() => {
    const saved = localStorage.getItem('resumate_scans');
    return saved ? JSON.parse(saved) : [
      { id: 'scan-1', role: 'Senior Full Stack Engineer', company: 'Apex Innovations', score: 92, date: '2026-08-18' },
      { id: 'scan-2', role: 'Staff Frontend Engineer', company: 'Stripe', score: 88, date: '2026-08-15' },
      { id: 'scan-3', role: 'React Core Developer', company: 'NexaTech', score: 79, date: '2026-08-12' }
    ];
  });

  const [kanbanJobs, setKanbanJobs] = useState(() => {
    const saved = localStorage.getItem('resumate_kanban');
    return saved ? JSON.parse(saved) : INITIAL_KANBAN_JOBS;
  });

  const [supportTickets, setSupportTickets] = useState(() => {
    const saved = localStorage.getItem('resumate_tickets');
    return saved ? JSON.parse(saved) : [
      { id: 'TKT-4892', subject: 'Custom PDF Export Margins', status: 'Resolved', date: '2026-08-17', category: 'Feature Request' },
      { id: 'TKT-4910', subject: 'Ashby ATS Parsing Advice', status: 'In Progress', date: '2026-08-19', category: 'ATS Consultation' }
    ];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('resumate_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('resumate_scans', JSON.stringify(scanHistory));
  }, [scanHistory]);

  useEffect(() => {
    localStorage.setItem('resumate_kanban', JSON.stringify(kanbanJobs));
  }, [kanbanJobs]);

  useEffect(() => {
    localStorage.setItem('resumate_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  const loginAsGuest = () => {
    const guestUser = {
      name: 'Guest Explorer',
      email: 'guest@resumate.io',
      isGuest: true,
      tier: 'Free Trial',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    setUser(guestUser);
    setIsAuthModalOpen(false);
  };

  const loginUser = (name, email) => {
    setUser({
      name: name || 'Demo Member',
      email: email || 'user@resumate.io',
      isGuest: false,
      tier: 'Pro Unlimited',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    loginAsGuest();
  };

  const addScanRecord = (record) => {
    const newRecord = {
      id: `scan-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...record
    };
    setScanHistory(prev => [newRecord, ...prev.slice(0, 9)]);
  };

  const addKanbanJob = (job) => {
    const newJob = {
      id: `job-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      ...job
    };
    setKanbanJobs(prev => [newJob, ...prev]);
  };

  const updateKanbanJobStage = (jobId, newStage) => {
    setKanbanJobs(prev => prev.map(job => job.id === jobId ? { ...job, stage: newStage } : job));
  };

  const deleteKanbanJob = (jobId) => {
    setKanbanJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const addSupportTicket = (ticket) => {
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      ...ticket
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginAsGuest,
        loginUser,
        logout,
        scanHistory,
        addScanRecord,
        kanbanJobs,
        addKanbanJob,
        updateKanbanJobStage,
        deleteKanbanJob,
        supportTickets,
        addSupportTicket,
        isAuthModalOpen,
        setIsAuthModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
