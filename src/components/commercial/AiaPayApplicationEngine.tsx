import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Printer, 
  ArrowRight, 
  Zap, 
  Building2, 
  Plus, 
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Percent
} from 'lucide-react';

export interface AiaG703LineItem {
  itemNumber: string;
  descriptionOfWork: string;
  scheduledValue: number;
  workCompletedPrevious: number;
  workCompletedThisPeriod: number;
  materialsStored: number;
  totalCompletedAndStored: number;
  percentComplete: number;
  balanceToFinish: number;
  retainageAmount: number;
}

export interface AiaG702Application {
  id: string;
  applicationNumber: number;
  periodTo: string;
  projectName: string;
  contractorName: string;
  generalContractorName: string;
  architectName: string;
  contractDate: string;
  originalContractSum: number;
  netChangeByChangeOrders: number;
  contractSumToDate: number;
  totalCompletedAndStoredToDate: number;
  retainagePct: number;
  totalRetainageAmount: number;
  totalEarnedLessRetainage: number;
  lessPreviousCertificatesForPayment: number;
  currentPaymentDue: number;
  balanceToFinishIncludingRetainage: number;
  status: 'DRAFT' | 'CERTIFIED_AIA' | 'ADVANCED_FACTOR_PAID' | 'DISPUTED';
  factoredAmountUsd?: number;
  factoredAt?: number;
  lineItems: AiaG703LineItem[];
}

export const AiaPayApplicationEngine: React.FC = () => {
  const [applications, setApplications] = useState<AiaG702Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<AiaG702Application | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdvancingId, setIsAdvancingId] = useState<string | null>(null);
  const [advanceSuccess, setAdvanceSuccess] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [viewContinuationSheet, setViewContinuationSheet] = useState<boolean>(false);

  // New application form state
  const [newProjectName, setNewProjectName] = useState('Houston Medical Center Tower 4 — Central Mechanical');
  const [newContractorName, setNewContractorName] = useState('Apex Mechanical Contractors LLC');
  const [newGcName, setNewGcName] = useState('Skanska USA Building');
  const [newArchitectName, setNewArchitectName] = useState('Page Southerland Page Inc');
  const [newContractSum, setNewContractSum] = useState<number>(750000);
  const [newPhaseCompleted, setNewPhaseCompleted] = useState<number>(185000);
  const [newMaterialsStored, setNewMaterialsStored] = useState<number>(22000);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/aia/pay-applications');
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
        if (data.applications && data.applications.length > 0 && !selectedApp) {
          setSelectedApp(data.applications[0]);
        }
      }
    } catch (e) {
      console.warn('Failed to load AIA pay applications:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAdvancePayApp = async (appId: string) => {
    setIsAdvancingId(appId);
    setAdvanceSuccess(null);
    try {
      const res = await fetch(`/api/aia/pay-applications/${appId}/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        setAdvanceSuccess(`✅ Capital Released! $${Math.round(data.netAdvanceFunded).toLocaleString()} wired via Same-Day FedACH to Contractor Treasury. 10% Retainage ($${Math.round(data.retainedByOwner).toLocaleString()}) safely reserved.`);
        fetchApplications();
        if (selectedApp && selectedApp.id === appId) {
          setSelectedApp(data.application);
        }
      }
    } catch (e) {
      console.error('Failed to factor pay application:', e);
    } finally {
      setIsAdvancingId(null);
    }
  };

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const lineItems: AiaG703LineItem[] = [
        {
          itemNumber: '01-ROUGH-IN',
          descriptionOfWork: 'Primary Chill-Water Mains & Pipe Hangers',
          scheduledValue: newContractSum * 0.5,
          workCompletedPrevious: 0,
          workCompletedThisPeriod: newPhaseCompleted * 0.7,
          materialsStored: newMaterialsStored,
          totalCompletedAndStored: (newPhaseCompleted * 0.7) + newMaterialsStored,
          percentComplete: Math.round((((newPhaseCompleted * 0.7) + newMaterialsStored) / (newContractSum * 0.5)) * 100),
          balanceToFinish: (newContractSum * 0.5) - ((newPhaseCompleted * 0.7) + newMaterialsStored),
          retainageAmount: ((newPhaseCompleted * 0.7) + newMaterialsStored) * 0.1
        },
        {
          itemNumber: '02-AIR-HANDLERS',
          descriptionOfWork: 'Roof-Mounted AHU Rigging & Isolation Springs',
          scheduledValue: newContractSum * 0.5,
          workCompletedPrevious: 0,
          workCompletedThisPeriod: newPhaseCompleted * 0.3,
          materialsStored: 0,
          totalCompletedAndStored: newPhaseCompleted * 0.3,
          percentComplete: Math.round(((newPhaseCompleted * 0.3) / (newContractSum * 0.5)) * 100),
          balanceToFinish: (newContractSum * 0.5) - (newPhaseCompleted * 0.3),
          retainageAmount: (newPhaseCompleted * 0.3) * 0.1
        }
      ];

      const res = await fetch('/api/aia/pay-applications/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: newProjectName,
          contractorName: newContractorName,
          generalContractorName: newGcName,
          architectName: newArchitectName,
          originalContractSum: newContractSum,
          lineItems
        })
      });

      if (res.ok) {
        const data = await res.json();
        setShowCreateModal(false);
        fetchApplications();
        setSelectedApp(data.application);
      }
    } catch (e) {
      console.error('Failed to create application:', e);
    }
  };

  const currentApp = selectedApp || applications[0];

  return (
    <div className="space-y-6 font-mono text-slate-800">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d1829] via-[#132338] to-[#0d1829] p-6 text-white border border-slate-700/80 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AMERICAN INSTITUTE OF ARCHITECTS (AIA) DOCUMENT G702 &amp; G703</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Commercial Construction Pay Application &amp; Schedule of Values
          </h2>
          <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed">
            The multi-trillion dollar commercial standard for general contractors and trade subcontractors. Enforces strict 10% retainage escrow, line-item progress audits, and instant same-day working capital factoring advances.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:from-emerald-400 hover:to-teal-300 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New AIA G702 Pay App</span>
        </button>
      </div>

      {advanceSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{advanceSuccess}</span>
          </div>
          <button onClick={() => setAdvanceSuccess(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Application List Selector + Formal G702 Certificate View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Applications List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between px-1">
            <span>Pay Applications ({applications.length})</span>
            <span className="text-[10px] text-emerald-600 font-bold">Standard 10% Retainage</span>
          </div>

          <div className="space-y-3">
            {applications.map(app => {
              const isSelected = currentApp?.id === app.id;
              const isFunded = app.status === 'ADVANCED_FACTOR_PAID';
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-xs space-y-2 ${
                    isSelected 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-400/40' 
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px] font-mono opacity-80">Application #{app.applicationNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isFunded 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' 
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}>
                      {isFunded ? 'ADVANCED 98% (PAID)' : 'CERTIFIED • READY'}
                    </span>
                  </div>

                  <div className="font-bold truncate text-sm">{app.projectName}</div>
                  <div className={`text-[11px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    GC: {app.generalContractorName}
                  </div>

                  <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between font-mono">
                    <div>
                      <span className={`text-[10px] block ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>Due Now:</span>
                      <span className={`font-black text-sm ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        ${app.currentPaymentDue.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] block ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>10% Retained:</span>
                      <span className={`font-semibold text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                        ${app.totalRetainageAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Formal AIA Document G702 & Continuation Sheet G703 (8 cols) */}
        {currentApp && (
          <div className="lg:col-span-8 space-y-4">
            
            {/* View Mode Toggle: G702 Summary vs G703 Continuation Sheet */}
            <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewContinuationSheet(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                    !viewContinuationSheet 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AIA Document G702 (Payment Certificate)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewContinuationSheet(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                    viewContinuationSheet 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Percent className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AIA Document G703 (Schedule of Values)</span>
                </button>
              </div>

              {/* Action Buttons: Advance or Print */}
              <div className="flex items-center gap-2">
                {currentApp.status === 'CERTIFIED_AIA' && (
                  <button
                    type="button"
                    onClick={() => handleAdvancePayApp(currentApp.id)}
                    disabled={isAdvancingId === currentApp.id}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isAdvancingId === currentApp.id ? 'Releasing Funds...' : 'Instant 98% Factor Release'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB VIEW 1: AIA G702 CERTIFICATE */}
            {!viewContinuationSheet ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-xs">
                
                {/* Official AIA Header Block */}
                <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">AIA DOCUMENT G702™ — 1992</span>
                    <h3 className="text-lg font-black text-slate-950 mt-0.5">APPLICATION AND CERTIFICATE FOR PAYMENT</h3>
                    <p className="text-[11px] text-slate-600 font-sans mt-0.5">
                      American Institute of Architects Standard Form for Construction Contracts
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-right text-[11px] space-y-0.5">
                    <div><strong>APPLICATION NO:</strong> #{currentApp.applicationNumber}</div>
                    <div><strong>PERIOD TO:</strong> {currentApp.periodTo}</div>
                    <div><strong>CONTRACT DATE:</strong> {currentApp.contractDate}</div>
                  </div>
                </div>

                {/* Parties Block */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[11px]">
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px] block">To Owner / General Contractor:</span>
                    <strong className="text-slate-900 block mt-0.5">{currentApp.generalContractorName}</strong>
                    <span className="text-slate-500">Project: {currentApp.projectName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px] block">From Subcontractor:</span>
                    <strong className="text-slate-900 block mt-0.5">{currentApp.contractorName}</strong>
                    <span className="text-slate-500">Scope: Division 15/16 Commercial Trade</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px] block">Architect of Record:</span>
                    <strong className="text-slate-900 block mt-0.5">{currentApp.architectName}</strong>
                    <span className="text-slate-500">AIA Member Certified</span>
                  </div>
                </div>

                {/* The 9 Canonical AIA G702 Accounting Lines */}
                <div className="space-y-2 border border-slate-200 rounded-2xl p-4 bg-white">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
                    Contractor's Signed Application for Payment
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-slate-100">
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-700">1. ORIGINAL CONTRACT SUM</span>
                      <strong className="text-slate-900 font-mono">${currentApp.originalContractSum.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-700">2. Net change by Change Orders</span>
                      <strong className="text-slate-900 font-mono">${currentApp.netChangeByChangeOrders.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between py-1.5 bg-slate-50 px-2 rounded-lg font-bold">
                      <span className="text-slate-900">3. CONTRACT SUM TO DATE (Line 1 ± 2)</span>
                      <strong className="text-slate-950 font-mono text-sm">${currentApp.contractSumToDate.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-700">4. TOTAL COMPLETED &amp; STORED TO DATE (Column G on G703)</span>
                      <strong className="text-slate-900 font-mono">${currentApp.totalCompletedAndStoredToDate.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between py-1.5 text-amber-800 bg-amber-50/60 px-2 rounded-lg">
                      <span>5. RETAINAGE (10% of Completed Work &amp; Stored Materials)</span>
                      <strong className="font-mono">-${currentApp.totalRetainageAmount.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-700">6. TOTAL EARNED LESS RETAINAGE (Line 4 less Line 5 Total)</span>
                      <strong className="text-slate-900 font-mono">${currentApp.totalEarnedLessRetainage.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-700">7. LESS PREVIOUS CERTIFICATES FOR PAYMENT (Line 6 from prior Certificate)</span>
                      <strong className="text-slate-900 font-mono">-${currentApp.lessPreviousCertificatesForPayment.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between py-2.5 bg-emerald-50 border border-emerald-300 px-3 rounded-xl text-emerald-950 font-black text-sm">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>8. CURRENT PAYMENT DUE (Line 6 less Line 7)</span>
                      </span>
                      <strong className="font-mono text-base text-emerald-700">
                        ${currentApp.currentPaymentDue.toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex justify-between py-1.5 text-slate-500">
                      <span>9. BALANCE TO FINISH, INCLUDING RETAINAGE (Line 3 less Line 6)</span>
                      <strong className="font-mono">${currentApp.balanceToFinishIncludingRetainage.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                {/* Instant Factoring Acceleration Callout */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-900 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>Instant Working Capital Acceleration (Same-Day Wire)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                      General Contractor payment cycle is Net-60 days. ECONOS advances 98% of Line 8 ($<strong>{Math.round(currentApp.currentPaymentDue * 0.98).toLocaleString()}</strong>) in 3 seconds directly into your linked bank account.
                    </p>
                  </div>

                  {currentApp.status === 'CERTIFIED_AIA' ? (
                    <button
                      type="button"
                      onClick={() => handleAdvancePayApp(currentApp.id)}
                      disabled={isAdvancingId === currentApp.id}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shrink-0 shadow-lg cursor-pointer hover:from-emerald-400 hover:to-teal-300"
                    >
                      {isAdvancingId === currentApp.id ? 'Releasing Funds...' : 'Advance $ ' + Math.round(currentApp.currentPaymentDue * 0.98).toLocaleString()}
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold shrink-0">
                      ✓ FACTORED &amp; RELEASED
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* TAB VIEW 2: AIA G703 CONTINUATION SHEET (SCHEDULE OF VALUES) */
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs overflow-x-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500">AIA DOCUMENT G703™ — 1992</span>
                    <h3 className="text-base font-black text-slate-900">CONTINUATION SHEET &amp; SCHEDULE OF VALUES</h3>
                  </div>
                  <span className="text-[11px] text-slate-500">App #{currentApp.applicationNumber} • {currentApp.periodTo}</span>
                </div>

                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="py-2.5 px-3">Item #</th>
                      <th className="py-2.5 px-3">Description of Work</th>
                      <th className="py-2.5 px-3 text-right">Scheduled Value</th>
                      <th className="py-2.5 px-3 text-right">Previous Work</th>
                      <th className="py-2.5 px-3 text-right">This Period</th>
                      <th className="py-2.5 px-3 text-right">Stored Mat.</th>
                      <th className="py-2.5 px-3 text-right">Total Completed</th>
                      <th className="py-2.5 px-3 text-right">% Done</th>
                      <th className="py-2.5 px-3 text-right text-amber-700">10% Retained</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {currentApp.lineItems.map(item => (
                      <tr key={item.itemNumber} className="hover:bg-slate-50/80 transition">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{item.itemNumber}</td>
                        <td className="py-2.5 px-3 font-sans max-w-[200px] truncate">{item.descriptionOfWork}</td>
                        <td className="py-2.5 px-3 text-right">${item.scheduledValue.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">${item.workCompletedPrevious.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-600">${item.workCompletedThisPeriod.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">${item.materialsStored.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">${item.totalCompletedAndStored.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right font-bold">{item.percentComplete}%</td>
                        <td className="py-2.5 px-3 text-right font-bold text-amber-700">${item.retainageAmount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

      </div>

      {/* CREATE NEW AIA G702 APPLICATION MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-xl w-full text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">Create New AIA G702 Pay Application</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-3 font-mono">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-sans"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">General Contractor</label>
                  <input
                    type="text"
                    value={newGcName}
                    onChange={e => setNewGcName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-sans"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Architect</label>
                  <input
                    type="text"
                    value={newArchitectName}
                    onChange={e => setNewArchitectName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-sans"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Total Contract ($)</label>
                  <input
                    type="number"
                    value={newContractSum}
                    onChange={e => setNewContractSum(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Period Work ($)</label>
                  <input
                    type="number"
                    value={newPhaseCompleted}
                    onChange={e => setNewPhaseCompleted(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Materials Stored ($)</label>
                  <input
                    type="number"
                    value={newMaterialsStored}
                    onChange={e => setNewMaterialsStored(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                <strong>AIA Rule:</strong> 10% retainage (${Math.round((newPhaseCompleted + newMaterialsStored) * 0.1).toLocaleString()}) will automatically be escrowed. Current payment due will be ${Math.round((newPhaseCompleted + newMaterialsStored) * 0.9).toLocaleString()}.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                >
                  Generate &amp; Certify G702
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
