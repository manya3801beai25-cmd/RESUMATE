import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Building2, 
  Calendar, 
  DollarSign, 
  X, 
  Check, 
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

const INITIAL_APPS = [
  {
    id: 'app-1',
    company: 'Google India',
    role: 'Frontend Software Engineer',
    location: 'Bangalore / Hybrid',
    salary: '₹24 - 32 LPA',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    status: 'Interview',
    notes: 'Round 1 DSA cleared. System Design interview next Tuesday.'
  },
  {
    id: 'app-2',
    company: 'Microsoft',
    role: 'Full Stack Engineer',
    location: 'Hyderabad / Hybrid',
    salary: '₹20 - 28 LPA',
    date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    status: 'Applied',
    notes: 'Submitted tailored resume. Awaiting recruiter screening.'
  },
  {
    id: 'app-3',
    company: 'Razorpay',
    role: 'Backend SDE',
    location: 'Bangalore / Remote',
    salary: '₹18 - 25 LPA',
    date: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
    status: 'Offered',
    notes: 'Received official offer letter! CTC ₹22 LPA + Stocks.'
  },
  {
    id: 'app-4',
    company: 'Amazon Web Services',
    role: 'Cloud Solutions Engineer',
    location: 'Gurgaon / Onsite',
    salary: '₹22 - 30 LPA',
    date: new Date(Date.now() - 21 * 86400000).toISOString().split('T')[0],
    status: 'Rejected',
    notes: 'Role required 5+ years Kubernetes experience. Good practice.'
  }
];

const STATUS_CONFIG = {
  Applied: {
    label: 'Applied',
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    icon: Clock
  },
  Interview: {
    label: 'Interviewing',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    icon: AlertCircle
  },
  Offered: {
    label: 'Offer Received',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    icon: CheckCircle2
  },
  Rejected: {
    label: 'Archived / Rejected',
    bg: 'bg-rose-500/15',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    icon: XCircle
  }
};


export default function ApplicationTrackerView({ addToast }) {
  const { t } = useLanguage();

  // 1. Applications State with localStorage
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_applications');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_APPS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('resumate_applications', JSON.stringify(applications));
    } catch (e) {}
  }, [applications]);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Inline Add State
  const [quickCompany, setQuickCompany] = useState('');
  const [quickRole, setQuickRole] = useState('');
  const [quickStatus, setQuickStatus] = useState('Applied');

  // Modal State for full edit/add
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalCompany, setModalCompany] = useState('');
  const [modalRole, setModalRole] = useState('');
  const [modalLocation, setModalLocation] = useState('Bangalore / Hybrid');
  const [modalSalary, setModalSalary] = useState('₹18 - 25 LPA');
  const [modalStatus, setModalStatus] = useState('Applied');
  const [modalNotes, setModalNotes] = useState('');
  const [modalDate, setModalDate] = useState(new Date().toISOString().split('T')[0]);

  // 1-Click Fast Inline Add
  const handleFastAdd = (e) => {
    e.preventDefault();
    if (!quickCompany.trim() || !quickRole.trim()) {
      if (addToast) addToast('Please enter both Company and Role name', 'error');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      company: quickCompany.trim(),
      role: quickRole.trim(),
      location: 'Remote / Hybrid',
      salary: 'Competitive',
      date: new Date().toISOString().split('T')[0],
      status: quickStatus,
      notes: 'Applied with optimized ATS resume.'
    };

    setApplications(prev => [newApp, ...prev]);
    setQuickCompany('');
    setQuickRole('');
    if (addToast) addToast(`Added "${newApp.company}" to pipeline!`, 'success');
  };

  // Quick 1-Click Status Change directly on card
  const handleQuickStatusChange = (id, newStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (addToast) addToast(`Status updated to "${newStatus}"!`, 'info');
  };

  // Delete Application
  const handleDelete = (id, company) => {
    if (window.confirm(`Delete application for "${company}"?`)) {
      setApplications(prev => prev.filter(a => a.id !== id));
      if (addToast) addToast(`Deleted application for "${company}".`, 'info');
    }
  };

  // Open Full Details Modal
  const handleOpenEdit = (app) => {
    setEditingId(app.id);
    setModalCompany(app.company);
    setModalRole(app.role);
    setModalLocation(app.location || '');
    setModalSalary(app.salary || '');
    setModalStatus(app.status || 'Applied');
    setModalNotes(app.notes || '');
    setModalDate(app.date || new Date().toISOString().split('T')[0]);
    setIsModalOpen(true);
  };

  const handleOpenFullAdd = () => {
    setEditingId(null);
    setModalCompany('');
    setModalRole('');
    setModalLocation('Bangalore / Hybrid');
    setModalSalary('₹18 - 25 LPA');
    setModalStatus('Applied');
    setModalNotes('');
    setModalDate(new Date().toISOString().split('T')[0]);
    setIsModalOpen(true);
  };

  // Save Modal
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!modalCompany.trim() || !modalRole.trim()) {
      if (addToast) addToast('Company and Role are required', 'error');
      return;
    }

    if (editingId) {
      setApplications(prev => prev.map(a => {
        if (a.id === editingId) {
          return {
            ...a,
            company: modalCompany.trim(),
            role: modalRole.trim(),
            location: modalLocation.trim(),
            salary: modalSalary.trim(),
            status: modalStatus,
            notes: modalNotes.trim(),
            date: modalDate
          };
        }
        return a;
      }));
      if (addToast) addToast(`Updated application for ${modalCompany}!`, 'success');
    } else {
      const newApp = {
        id: `app-${Date.now()}`,
        company: modalCompany.trim(),
        role: modalRole.trim(),
        location: modalLocation.trim(),
        salary: modalSalary.trim(),
        status: modalStatus,
        notes: modalNotes.trim(),
        date: modalDate
      };
      setApplications(prev => [newApp, ...prev]);
      if (addToast) addToast(`Added application for ${modalCompany}!`, 'success');
    }

    setIsModalOpen(false);
  };

  // Statistics KPIs
  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter(a => a.status === 'Applied').length;
    const interview = applications.filter(a => a.status === 'Interview').length;
    const offered = applications.filter(a => a.status === 'Offered').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    const rate = total > 0 ? Math.round(((offered + interview) / total) * 100) : 0;
    return { total, applied, interview, offered, rejected, rate };
  }, [applications]);

  // Filtered List
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      if (statusFilter !== 'all' && app.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCompany = app.company.toLowerCase().includes(q);
        const matchRole = app.role.toLowerCase().includes(q);
        const matchNotes = (app.notes || '').toLowerCase().includes(q);
        if (!matchCompany && !matchRole && !matchNotes) return false;
      }
      return true;
    });
  }, [applications, statusFilter, searchQuery]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
            <ClipboardList className="w-3.5 h-3.5 text-cyan-400" />
            <span>FAST APPLICATION PIPELINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Job Application Tracker
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            Quickly track and organize your job applications, interviews, and offers in one fast, easy dashboard.
          </p>
        </div>

        <button
          onClick={handleOpenFullAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* 2. Fast KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-[#090f1d] border border-white/10 shadow flex flex-col justify-between">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Applied</span>
          <span className="text-2xl font-black text-white font-mono mt-1">{stats.total}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#090f1d] border border-blue-500/20 shadow flex flex-col justify-between">
          <span className="text-[11px] font-mono text-blue-400 uppercase flex items-center gap-1">
            <Clock className="w-3 h-3" /> Under Review
          </span>
          <span className="text-2xl font-black text-blue-400 font-mono mt-1">{stats.applied}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#090f1d] border border-amber-500/20 shadow flex flex-col justify-between">
          <span className="text-[11px] font-mono text-amber-400 uppercase flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Interviews
          </span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1">{stats.interview}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#090f1d] border border-emerald-500/20 shadow flex flex-col justify-between">
          <span className="text-[11px] font-mono text-emerald-400 uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Offers
          </span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1">{stats.offered}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#090f1d] border border-purple-500/20 shadow flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-[11px] font-mono text-purple-400 uppercase flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Conversion
          </span>
          <span className="text-2xl font-black text-purple-400 font-mono mt-1">{stats.rate}%</span>
        </div>
      </div>

      {/* 3. Fast Inline Quick-Add Bar */}
      <form 
        onSubmit={handleFastAdd}
        className="p-4 rounded-2xl bg-gradient-to-r from-[#0c1426] via-[#090f1d] to-[#0c1426] border border-cyan-500/30 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono flex-shrink-0">
          <Sparkles className="w-4 h-4" />
          <span>Fast Add:</span>
        </div>

        <div className="relative flex-1">
          <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={quickCompany}
            onChange={(e) => setQuickCompany(e.target.value)}
            placeholder="Company (e.g. Google, Atlassian)"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={quickRole}
            onChange={(e) => setQuickRole(e.target.value)}
            placeholder="Role (e.g. Frontend Engineer)"
            className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={quickStatus}
          onChange={(e) => setQuickStatus(e.target.value)}
          className="px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/25 cursor-pointer flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Quick Add</span>
        </button>
      </form>

      {/* 4. Controls: Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#090f1d] p-3 rounded-2xl border border-white/10 shadow-md">
        
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `All (${applications.length})` },
            { id: 'Applied', label: `Applied (${stats.applied})` },
            { id: 'Interview', label: `Interviewing (${stats.interview})` },
            { id: 'Offered', label: `Offered (${stats.offered})` },
            { id: 'Rejected', label: `Rejected (${stats.rejected})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* 5. Applications Cards Grid */}
      {filteredApps.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#090f1d] border border-white/10 space-y-3">
          <ClipboardList className="w-10 h-10 text-cyan-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No applications match your filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Use the Quick Add bar above to log your job applications in seconds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApps.map((app) => {
            const config = STATUS_CONFIG[app.status] || STATUS_CONFIG.Applied;
            const StatusIcon = config.icon;

            return (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-[#090f1d] border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl flex flex-col justify-between space-y-4 group"
              >
                {/* Top Row: Company, Role & Status */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {app.company}
                      </h3>
                      <p className="text-xs text-cyan-400 font-medium mt-0.5">
                        {app.role}
                      </p>
                    </div>

                    {/* Quick 1-Click Status Dropdown / Badge */}
                    <div className="relative">
                      <select
                        value={app.status}
                        onChange={(e) => handleQuickStatusChange(app.id, e.target.value)}
                        className={`text-xs font-bold font-mono px-3 py-1.5 rounded-xl border appearance-none cursor-pointer pr-7 ${config.bg} ${config.text} ${config.border} focus:outline-none`}
                      >
                        <option value="Applied" className="bg-[#090f1d] text-blue-400">Applied</option>
                        <option value="Interview" className="bg-[#090f1d] text-amber-400">Interviewing</option>
                        <option value="Offered" className="bg-[#090f1d] text-emerald-400">Offered</option>
                        <option value="Rejected" className="bg-[#090f1d] text-rose-400">Rejected</option>
                      </select>
                      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-60">▼</span>
                    </div>
                  </div>

                  {/* Meta Strip: Location, Salary, Date */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                    {app.salary && (
                      <span className="text-emerald-400 font-bold">{app.salary}</span>
                    )}
                    {app.location && (
                      <span>• {app.location}</span>
                    )}
                    {app.date && (
                      <span className="text-slate-500">• {app.date}</span>
                    )}
                  </div>

                  {/* Notes */}
                  {app.notes && (
                    <p className="text-xs text-slate-300 bg-black/40 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                      {app.notes}
                    </p>
                  )}
                </div>

                {/* Bottom Row: Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: {app.id}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(app)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(app.id, app.company)}
                      className="p-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 6. MODAL: Full Add / Edit Details */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0c1220] border border-white/15 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-cyan-400" />
                <span>{editingId ? 'Edit Application Details' : 'Add New Application'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={modalCompany}
                    onChange={(e) => setModalCompany(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Job Role *
                  </label>
                  <input
                    type="text"
                    value={modalRole}
                    onChange={(e) => setModalRole(e.target.value)}
                    placeholder="e.g. SDE-2 Frontend"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={modalLocation}
                    onChange={(e) => setModalLocation(e.target.value)}
                    placeholder="Bangalore / Remote"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Salary / CTC
                  </label>
                  <input
                    type="text"
                    value={modalSalary}
                    onChange={(e) => setModalSalary(e.target.value)}
                    placeholder="₹18 - 25 LPA"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Application Date
                </label>
                <input
                  type="date"
                  value={modalDate}
                  onChange={(e) => setModalDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Notes & Interview Rounds
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Notes about interview rounds, HR contact, or next steps..."
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  {editingId ? 'Save Changes' : 'Add Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
