import React, { useState } from 'react';
import { 
  X, 
  FileCheck2, 
  CheckCircle2, 
  Download, 
  DollarSign, 
  ArrowUpRight, 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Plus, 
  Users 
} from 'lucide-react';
import { AppLayer } from '../../types/econos';

interface Q3DrilldownProps {
  taxCapturedToday: number;
  durabilityScore: number;
  onClose: () => void;
  onSelectLayer: (layer: AppLayer) => void;
}

export const Q3TaxCreditDrilldownModal: React.FC<Q3DrilldownProps> = ({
  taxCapturedToday,
  durabilityScore,
  onClose,
  onSelectLayer
}) => {
  const [employees, setEmployees] = useState([
    { id: 'emp-1', name: 'Dr. Elena Rostova', role: 'Chief Cryptographer (NIST ML-KEM)', qualifiedWage: 310000, allocationPct: 85, eligibleCredit: 26350, sprintDocs: '14 Contemporaneous Sprints' },
    { id: 'emp-2', name: 'Marcus Vance', role: 'Lead Autonomous Consensus Architect', qualifiedWage: 285000, allocationPct: 90, eligibleCredit: 25650, sprintDocs: '22 Architectural RFCs' },
    { id: 'emp-3', name: 'Dr. Jun Takahashi', role: 'Quantum Lattice Hardware Engineer', qualifiedWage: 260000, allocationPct: 75, eligibleCredit: 19500, sprintDocs: '9 Verification Runs' },
    { id: 'emp-4', name: 'Sarah Al-Mansoor', role: 'Real-Time Financial Settlement Lead', qualifiedWage: 240000, allocationPct: 80, eligibleCredit: 19200, sprintDocs: '18 Commit Audit Logs' }
  ]);

  const [auditExporting, setAuditExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExportForm6765 = () => {
    setAuditExporting(true);
    setTimeout(() => {
      setAuditExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0c0905] border border-amber-500/40 rounded-3xl w-full max-w-4xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                <span>Q3 Deep Inspection: Continuous §41 ASC R&amp;D Tax Credit Engine</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                  LAYER 62
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">Automated 4-Part Statutory Gate Verification &amp; IRS Form 6765 Dossier</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono transition cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 font-mono text-xs text-slate-300 bg-[#050811]">
          {/* Key Tax Metrics Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Captured Tax Credits</span>
              <span className="text-lg font-bold text-amber-300 mt-0.5 block">
                ${(taxCapturedToday / 1000000).toFixed(4)}M
              </span>
              <span className="text-[9px] text-emerald-400 font-bold">+42.8/sec real-time</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Audit Durability Score</span>
              <span className="text-lg font-bold text-emerald-400 mt-0.5 block">{durabilityScore}%</span>
              <span className="text-[9px] text-slate-500">IRS Examination Ready</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Qualified Wages (QRE)</span>
              <span className="text-lg font-bold text-white mt-0.5 block">$1.095M / Mo</span>
              <span className="text-[9px] text-slate-500">Auto-sprint logged</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Statutory Gates</span>
              <span className="text-lg font-bold text-cyan-300 mt-0.5 block">4 / 4 PASS</span>
              <span className="text-[9px] text-emerald-400">100% Contemporaneous</span>
            </div>
          </div>

          {/* Statutory 4-Part Test Visual Checklist */}
          <div className="p-4 rounded-2xl bg-[#140e06] border border-amber-500/30 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Statutory 4-Part Test Continuous Compliance</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-[11px]">1. Section 174 Requirement</strong>
                  <span className="text-[10px] text-slate-400">Research expenses incurred directly in connection with trade/business for innovative product discovery.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-[11px]">2. Technological Uncertainty</strong>
                  <span className="text-[10px] text-slate-400">Information available at inception did not establish capability or methodical design of consensus components.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-[11px]">3. Process of Experimentation</strong>
                  <span className="text-[10px] text-slate-400">Systematic simulation, algorithmic stress modeling, and benchmarking of alternative technical hypotheses.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-[11px]">4. Technological in Nature</strong>
                  <span className="text-[10px] text-slate-400">Grounding fundamentally in principles of computer science, post-quantum mathematics, and distributed systems.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Qualified Personnel Wage Allocations Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Qualified Engineering Wage Allocations</span>
              </h4>

              <button
                onClick={handleExportForm6765}
                disabled={auditExporting}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{auditExporting ? 'Synthesizing Dossier...' : exportComplete ? 'Dossier Downloaded!' : 'Generate Form 6765 Dossier'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {employees.map(emp => (
                <div key={emp.id} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{emp.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                        {emp.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      <span>Annualized Wage: <strong className="text-slate-200">${emp.qualifiedWage.toLocaleString()}</strong></span>
                      <span className="mx-2">•</span>
                      <span>QRE Allocation: <strong className="text-cyan-400">{emp.allocationPct}%</strong></span>
                      <span className="mx-2">•</span>
                      <span>Verified: <strong className="text-slate-300">{emp.sprintDocs}</strong></span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-emerald-400 block">+${emp.eligibleCredit.toLocaleString()} Credit</span>
                    <span className="text-[9px] text-slate-500">ASC 730 Contemporaneous</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Contemporaneously signed under penalties of perjury per IRC Section 6065.
            </span>

            <button
              onClick={() => {
                onClose();
                onSelectLayer('LAYER_62_RD_TAX_CREDIT');
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Open Layer 62 Full Workspace</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
