import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../api/client';
import { PipelineDeal } from '../../types/commercial-ops';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Plus,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Shield,
  Edit2,
  Trash2,
  X,
  FileCheck,
  Building2,
  ChevronRight
} from 'lucide-react';

interface CommercialPipelineWorkspaceProps {
  onNavigateToQuotes?: () => void;
}

export const CommercialPipelineWorkspace: React.FC<CommercialPipelineWorkspaceProps> = ({
  onNavigateToQuotes
}) => {
  const { currentOrg } = useAuth();
  const [deals, setDeals] = useState<PipelineDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal State
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [editingDealId, setEditingDealId] = useState<string | null>(null);
  const [dealName, setDealName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [stage, setStage] = useState<PipelineDeal['stage']>('PROPOSAL_SUBMITTED');
  const [dealValueUsd, setDealValueUsd] = useState<number>(100000);
  const [recurringAnnualUsd, setRecurringAnnualUsd] = useState<number>(100000);
  const [winProbabilityPct, setWinProbabilityPct] = useState<number>(50);
  const [targetCloseDate, setTargetCloseDate] = useState(
    new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0]
  );
  const [assignedLead, setAssignedLead] = useState('Commercial Growth Lead');
  const [notes, setNotes] = useState('');

  const loadPipeline = async () => {
    try {
      setLoading(true);
      const res = await api.getPipelineDeals();
      setDeals(res || []);
    } catch (err) {
      console.error('Failed to load deals', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPipeline();
  }, [currentOrg?.id]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 5000);
  };

  // KPIs
  const activeDeals = useMemo(() => deals.filter(d => d.stage !== 'CLOSED_LOST'), [deals]);
  const totalPipelineValue = useMemo(() => activeDeals.reduce((sum, d) => sum + d.dealValueUsd, 0), [activeDeals]);
  const totalWeightedForecast = useMemo(() => activeDeals.reduce((sum, d) => sum + d.weightedValueUsd, 0), [activeDeals]);
  const wonDealsCount = useMemo(() => deals.filter(d => d.stage === 'CLOSED_WON').length, [deals]);
  const winRatePct = deals.length > 0 ? Math.round((wonDealsCount / deals.length) * 100) : 0;

  // Stages Map
  const stagesList: Array<{ key: PipelineDeal['stage']; label: string; defaultProb: number; color: string }> = [
    { key: 'DISCOVERY', label: '1. Discovery & Needs', defaultProb: 30, color: 'border-blue-300 bg-blue-50/60 text-blue-800' },
    { key: 'PROPOSAL_SUBMITTED', label: '2. Proposal Submitted', defaultProb: 50, color: 'border-indigo-300 bg-indigo-50/60 text-indigo-800' },
    { key: 'SECURITY_LEGAL_REVIEW', label: '3. Security / Legal Review', defaultProb: 70, color: 'border-amber-300 bg-amber-50/60 text-amber-800' },
    { key: 'CONTRACT_SIGNING', label: '4. Contract Signing', defaultProb: 90, color: 'border-emerald-300 bg-emerald-50/60 text-emerald-800' },
    { key: 'CLOSED_WON', label: '5. Closed Won', defaultProb: 100, color: 'border-emerald-500 bg-emerald-100 text-emerald-900' },
    { key: 'CLOSED_LOST', label: 'Closed Lost', defaultProb: 0, color: 'border-slate-300 bg-slate-100 text-slate-600' }
  ];

  const handleOpenNewDealModal = () => {
    setEditingDealId(null);
    setDealName('');
    setCompanyName('');
    setContactName('');
    setContactEmail('');
    setStage('DISCOVERY');
    setDealValueUsd(120000);
    setRecurringAnnualUsd(100000);
    setWinProbabilityPct(30);
    setTargetCloseDate(new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0]);
    setAssignedLead('Commercial Growth Lead');
    setNotes('');
    setIsDealModalOpen(true);
  };

  const handleOpenEditDealModal = (deal: PipelineDeal) => {
    setEditingDealId(deal.id);
    setDealName(deal.dealName);
    setCompanyName(deal.companyName);
    setContactName(deal.contactName);
    setContactEmail(deal.contactEmail);
    setStage(deal.stage);
    setDealValueUsd(deal.dealValueUsd);
    setRecurringAnnualUsd(deal.recurringAnnualUsd);
    setWinProbabilityPct(deal.winProbabilityPct);
    setTargetCloseDate(deal.targetCloseDate);
    setAssignedLead(deal.assignedLead);
    setNotes(deal.notes);
    setIsDealModalOpen(true);
  };

  const handleStageSelect = (newStage: PipelineDeal['stage']) => {
    setStage(newStage);
    const stageMeta = stagesList.find(s => s.key === newStage);
    if (stageMeta) {
      setWinProbabilityPct(stageMeta.defaultProb);
    }
  };

  const handleSaveDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealName.trim() || !companyName.trim()) return;

    try {
      if (editingDealId) {
        await api.updatePipelineDeal(editingDealId, {
          dealName: dealName.trim(),
          companyName: companyName.trim(),
          contactName: contactName.trim(),
          contactEmail: contactEmail.trim(),
          stage,
          dealValueUsd: Number(dealValueUsd),
          recurringAnnualUsd: Number(recurringAnnualUsd),
          winProbabilityPct: Number(winProbabilityPct),
          targetCloseDate,
          assignedLead: assignedLead.trim(),
          notes: notes.trim()
        });
        showToast(`Deal "${dealName}" updated.`);
      } else {
        await api.createPipelineDeal({
          organizationId: currentOrg?.id || 'org_real_default',
          dealName: dealName.trim(),
          companyName: companyName.trim(),
          contactName: contactName.trim(),
          contactEmail: contactEmail.trim(),
          stage,
          dealValueUsd: Number(dealValueUsd),
          recurringAnnualUsd: Number(recurringAnnualUsd),
          winProbabilityPct: Number(winProbabilityPct),
          targetCloseDate,
          assignedLead: assignedLead.trim(),
          notes: notes.trim()
        });
        showToast(`Deal "${dealName}" added to sales pipeline.`);
      }

      setIsDealModalOpen(false);
      await loadPipeline();
    } catch (err: any) {
      alert(err.message || 'Failed to save deal');
    }
  };

  const handleAdvanceStage = async (deal: PipelineDeal, nextStage: PipelineDeal['stage']) => {
    const stageMeta = stagesList.find(s => s.key === nextStage);
    try {
      await api.updatePipelineDeal(deal.id, {
        stage: nextStage,
        winProbabilityPct: stageMeta ? stageMeta.defaultProb : deal.winProbabilityPct
      });
      await loadPipeline();
      showToast(`Deal "${deal.dealName}" advanced to ${(nextStage || '').replace(/_/g, ' ')}.`);
    } catch (err: any) {
      alert(err.message || 'Failed to update deal stage');
    }
  };

  const handleDeleteDeal = async (id: string, name: string) => {
    if (!confirm(`Remove deal "${name}" from pipeline?`)) return;
    try {
      await api.deletePipelineDeal(id);
      await loadPipeline();
      showToast(`Deal "${name}" removed.`);
    } catch (err: any) {
      alert(err.message || 'Failed to delete deal');
    }
  };

  const filteredDeals = useMemo(() => {
    return deals.filter(d => {
      const matchQuery =
        d.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.contactName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStage = stageFilter === 'ALL' || d.stage === stageFilter;
      return matchQuery && matchStage;
    });
  }, [deals, searchQuery, stageFilter]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Pipeline KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Gross Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-[#132338]" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Across {activeDeals.length} active enterprise opportunities
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Weighted Forecast ARR</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            ${totalWeightedForecast.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Probability-adjusted expected close revenue
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Historical Win Rate</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600">
            {winRatePct}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            {wonDealsCount} deals closed won
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Contract Signing Stage</span>
            <Briefcase className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-600">
            {deals.filter(d => d.stage === 'CONTRACT_SIGNING').length} Deals
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Final stage negotiation & countersignature
          </p>
        </div>
      </div>

      {/* Stage Flow Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 font-mono text-xs">
        {stagesList.map(s => {
          const count = deals.filter(d => d.stage === s.key).length;
          const stageValue = deals
            .filter(d => d.stage === s.key)
            .reduce((sum, d) => sum + d.dealValueUsd, 0);

          return (
            <div
              key={s.key}
              onClick={() => setStageFilter(stageFilter === s.key ? 'ALL' : s.key)}
              className={`p-3 rounded-xl border cursor-pointer transition ${
                stageFilter === s.key ? 'ring-2 ring-[#132338] shadow-xs' : 'hover:border-slate-400'
              } ${s.color}`}
            >
              <div className="font-bold text-[11px] truncate">{s.label}</div>
              <div className="text-lg font-extrabold mt-1">{count} deals</div>
              <div className="text-[10px] opacity-80 mt-0.5">${stageValue.toLocaleString()}</div>
            </div>
          );
        })}
      </div>

      {/* Deals Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden font-mono text-xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Enterprise Opportunity Pipeline</h3>
            <p className="text-slate-500 text-[11px]">Manage customer acquisition stages, ARR values, and close forecasting</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenNewDealModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#132338] hover:bg-[#1e3450] text-white font-medium transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Pipeline Deal</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search deal name, company, or contact..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Filter Stage:</span>
            <select
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Pipeline Stages</option>
              {stagesList.map(s => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Opportunity & Company</th>
                <th className="py-3 px-4">Pipeline Stage</th>
                <th className="py-3 px-4 text-right">Deal Value (ARR)</th>
                <th className="py-3 px-4 text-right">Win Probability</th>
                <th className="py-3 px-4 text-right">Weighted ARR</th>
                <th className="py-3 px-4">Target Close</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No pipeline opportunities match your criteria.
                  </td>
                </tr>
              ) : (
                filteredDeals.map(deal => {
                  const stageMeta = stagesList.find(s => s.key === deal.stage);

                  return (
                    <tr key={deal.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{deal.dealName}</div>
                        <div className="text-slate-600 text-[11px]">{deal.companyName}</div>
                        <div className="text-[10px] text-slate-400">
                          {deal.contactName} • {deal.contactEmail}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${stageMeta?.color || 'bg-slate-100'}`}>
                          {(deal.stage || '').replace(/_/g, ' ')}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1 truncate max-w-xs">
                          {deal.notes}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                        ${deal.dealValueUsd.toLocaleString()}
                        <div className="text-[10px] text-slate-400 font-normal">
                          ARR: ${deal.recurringAnnualUsd.toLocaleString()}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold">
                        <span className={deal.winProbabilityPct >= 70 ? 'text-emerald-600' : 'text-slate-700'}>
                          {deal.winProbabilityPct}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-emerald-600">
                        ${deal.weightedValueUsd.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        {deal.targetCloseDate}
                        <div className="text-[10px] text-slate-400">Owner: {deal.assignedLead}</div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {deal.stage === 'DISCOVERY' && (
                            <button
                              onClick={() => handleAdvanceStage(deal, 'PROPOSAL_SUBMITTED')}
                              className="px-2 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded text-[10px] font-bold"
                            >
                              Proposal
                            </button>
                          )}

                          {deal.stage === 'PROPOSAL_SUBMITTED' && (
                            <button
                              onClick={() => handleAdvanceStage(deal, 'SECURITY_LEGAL_REVIEW')}
                              className="px-2 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[10px] font-bold"
                            >
                              Legal
                            </button>
                          )}

                          {deal.stage === 'SECURITY_LEGAL_REVIEW' && (
                            <button
                              onClick={() => handleAdvanceStage(deal, 'CONTRACT_SIGNING')}
                              className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-bold"
                            >
                              Signing
                            </button>
                          )}

                          {deal.stage === 'CONTRACT_SIGNING' && (
                            <button
                              onClick={() => handleAdvanceStage(deal, 'CLOSED_WON')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold shadow-xs"
                            >
                              Close Won
                            </button>
                          )}

                          {deal.stage === 'CLOSED_WON' && onNavigateToQuotes && (
                            <button
                              onClick={onNavigateToQuotes}
                              className="px-2 py-1 bg-[#132338] text-white hover:bg-[#1e3450] rounded text-[10px] font-bold shadow-xs"
                              title="Convert to CPQ Quote"
                            >
                              CPQ Quote
                            </button>
                          )}

                          <button
                            onClick={() => handleOpenEditDealModal(deal)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                            title="Edit Deal"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteDeal(deal.id, deal.dealName)}
                            className="p-1.5 text-rose-400 hover:text-rose-700 rounded hover:bg-rose-50"
                            title="Delete Deal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD / EDIT DEAL */}
      {isDealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-mono text-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#132338]" />
                <h3 className="text-sm font-bold text-slate-900">
                  {editingDealId ? 'Edit Pipeline Opportunity' : 'Add New Commercial Deal'}
                </h3>
              </div>
              <button
                onClick={() => setIsDealModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDeal} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Deal Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Sovereign AI Deployment"
                    value={dealName}
                    onChange={e => setDealName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Industries"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Primary Contact Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Contact Email</label>
                  <input
                    type="email"
                    placeholder="jane.doe@company.com"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Pipeline Stage</label>
                  <select
                    value={stage}
                    onChange={e => handleStageSelect(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  >
                    {stagesList.map(s => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Target Close Date</label>
                  <input
                    type="date"
                    required
                    value={targetCloseDate}
                    onChange={e => setTargetCloseDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Deal Value ($)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={dealValueUsd}
                    onChange={e => setDealValueUsd(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Recurring ARR ($)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={recurringAnnualUsd}
                    onChange={e => setRecurringAnnualUsd(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Win Probability (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={winProbabilityPct}
                    onChange={e => setWinProbabilityPct(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Deal Context & Progress Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Key milestones, procurement decision makers, competitive landscape..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDealModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#132338] text-white rounded-xl font-bold shadow-xs hover:bg-[#1e3450]"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
