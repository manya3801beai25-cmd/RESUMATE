import React, { useState } from 'react';
import { 
  KanbanSquare, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Sparkles,
  CheckCircle2,
  FileSearch,
  ExternalLink
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';

export default function ApplicationTrackerView({ onNavigateToScanner }) {
  const { kanbanJobs, addKanbanJob, updateKanbanJobStage, deleteKanbanJob } = useAuth();
  const { addToast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('Remote (US)');
  const [newSalary, setNewSalary] = useState('$160k - $190k');
  const [newAtsScore, setNewAtsScore] = useState(90);
  const [newNotes, setNewNotes] = useState('');
  const [newStage, setNewStage] = useState('saved');

  const STAGES = [
    { id: 'saved', label: 'Wishlist / Saved', color: 'border-cyan-500/40 text-cyan-300' },
    { id: 'applied', label: 'Applied', color: 'border-violet-500/40 text-violet-300' },
    { id: 'interviewing', label: 'Interviewing', color: 'border-amber-500/40 text-amber-300' },
    { id: 'offer', label: 'Offer Received', color: 'border-emerald-500/40 text-emerald-300' }
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) {
      addToast('Please enter both company and job title.', 'error');
      return;
    }

    addKanbanJob({
      company: newCompany,
      role: newRole,
      location: newLocation,
      salary: newSalary,
      atsScore: Number(newAtsScore) || 85,
      notes: newNotes,
      stage: newStage
    });

    setIsAddModalOpen(false);
    setNewCompany('');
    setNewRole('');
    setNewNotes('');
    addToast('Job application added to board!', 'success');
  };

  const getNextStage = (currentStage) => {
    const order = ['saved', 'applied', 'interviewing', 'offer'];
    const idx = order.indexOf(currentStage);
    return idx < order.length - 1 ? order[idx + 1] : null;
  };

  const getPrevStage = (currentStage) => {
    const order = ['saved', 'applied', 'interviewing', 'offer'];
    const idx = order.indexOf(currentStage);
    return idx > 0 ? order[idx - 1] : null;
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium mb-2">
            <KanbanSquare className="w-3.5 h-3.5" />
            <span>JOB HUNT APPLICATION KANBAN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pipeline & ATS Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize applications, track interview milestones, and maintain target ATS scores.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Application
        </button>
      </div>

      {/* 4 Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {STAGES.map((col) => {
          const jobsInStage = (kanbanJobs || []).filter(j => j.stage === col.id);

          return (
            <div key={col.id} className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3 min-h-[500px]">
              
              {/* Column Header */}
              <div className={`flex items-center justify-between pb-2.5 border-b ${col.color}`}>
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider">{col.label}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-white/10 text-white">
                  {jobsInStage.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3">
                {jobsInStage.map((job) => {
                  const next = getNextStage(job.stage);
                  const prev = getPrevStage(job.stage);

                  return (
                    <GlassCard
                      key={job.id}
                      glowColor="none"
                      className="p-4 bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white">{job.role}</h4>
                          <p className="text-[11px] font-semibold text-cyan-300 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3" /> {job.company}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteKanbanJob(job.id)}
                          className="text-slate-500 hover:text-red-400 p-1"
                          title="Delete card"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Meta Tags */}
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
                        {job.location && (
                          <span className="bg-slate-800 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5 text-slate-400" /> {job.location}
                          </span>
                        )}
                        {job.salary && (
                          <span className="bg-slate-800 px-1.5 py-0.5 rounded flex items-center gap-0.5 text-emerald-400">
                            <DollarSign className="w-2.5 h-2.5" /> {job.salary}
                          </span>
                        )}
                      </div>

                      {/* ATS Score Tag */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <span className="text-[10px] font-mono text-slate-400">ATS Score:</span>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${job.atsScore >= 85 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                          {job.atsScore}%
                        </span>
                      </div>

                      {/* Notes */}
                      {job.notes && (
                        <p className="text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded border border-white/5 italic">
                          "{job.notes}"
                        </p>
                      )}

                      {/* Stage Shift Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                        {prev ? (
                          <button
                            onClick={() => updateKanbanJobStage(job.id, prev)}
                            className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                          >
                            <ArrowLeft className="w-3 h-3" /> Back
                          </button>
                        ) : <span />}

                        {next && (
                          <button
                            onClick={() => updateKanbanJobStage(job.id, next)}
                            className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-0.5"
                          >
                            Advance <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </GlassCard>
                  );
                })}

                {jobsInStage.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-white/10 rounded-xl">
                    No applications in this stage.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 border border-amber-500/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              Add Target Application
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OpenAI, Stripe, Google"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full Stack Engineer"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target ATS Score</label>
                  <input
                    type="number"
                    value={newAtsScore}
                    onChange={(e) => setNewAtsScore(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Initial Stage</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs bg-slate-900"
                >
                  <option value="saved">Wishlist / Saved</option>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer Received</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Notes / Action Items</label>
                <textarea
                  rows={2}
                  placeholder="Referral contact, upcoming round info, etc."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 rounded-lg glass-input text-xs resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
