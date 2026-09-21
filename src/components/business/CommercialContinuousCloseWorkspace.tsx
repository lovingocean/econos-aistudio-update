import React, { useState } from 'react';
import { 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Unlock, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  BarChart2, 
  RefreshCw, 
  FileText, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export interface MonthEndTask {
  id: string;
  name: string;
  category: 'CASH_REC' | 'AR_AP' | 'FIXED_ASSETS' | 'FX_TREASURY' | 'REVENUE' | 'TAX_PROVISION' | 'EXECUTIVE_SIGN';
  assignedRole: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'BLOCKED';
  completedAt?: string;
  verifiedBy?: string;
  ledgerImpact: string;
}

const INITIAL_CLOSE_TASKS: MonthEndTask[] = [
  {
    id: 'close_01',
    name: 'JPMorgan & Silicon Valley Bank multi-account feed reconciliation',
    category: 'CASH_REC',
    assignedRole: 'Senior Treasury Analyst',
    status: 'COMPLETED',
    completedAt: '2026-09-18 14:22 UTC',
    verifiedBy: 'eleanor.vance@econos.corp',
    ledgerImpact: 'Balanced cash accounts 1010 & 1020 ($0.00 delta)'
  },
  {
    id: 'close_02',
    name: 'Accounts Payable 3-way match & unbilled expense accrual estimate',
    category: 'AR_AP',
    assignedRole: 'Staff Accountant',
    status: 'COMPLETED',
    completedAt: '2026-09-18 16:45 UTC',
    verifiedBy: 'marcus.chen@econos.corp',
    ledgerImpact: 'Accrued $14,200 in uninvoiced vendor compute liabilities'
  },
  {
    id: 'close_03',
    name: 'Fixed asset MACRS & Straight-line monthly depreciation amortization',
    category: 'FIXED_ASSETS',
    assignedRole: 'Accounting Lead',
    status: 'COMPLETED',
    completedAt: '2026-09-19 09:10 UTC',
    verifiedBy: 'marcus.chen@econos.corp',
    ledgerImpact: 'DR 6050 Depreciation ($13,570) | CR 1650 Accum Depr ($13,570)'
  },
  {
    id: 'close_04',
    name: 'Multi-Currency EUR/GBP FX forward derivative Mark-to-Market revaluation',
    category: 'FX_TREASURY',
    assignedRole: 'VP of Treasury',
    status: 'COMPLETED',
    completedAt: '2026-09-19 11:30 UTC',
    verifiedBy: 'eleanor.vance@econos.corp',
    ledgerImpact: 'Unrealized MTM gain credited +$1,020 to comprehensive income'
  },
  {
    id: 'close_05',
    name: 'ASC 606 deferred revenue waterfall ratable release & milestone billing',
    category: 'REVENUE',
    assignedRole: 'Revenue Controller',
    status: 'COMPLETED',
    completedAt: '2026-09-19 15:00 UTC',
    verifiedBy: 'sarah.lin@econos.corp',
    ledgerImpact: 'Released $24,750 from Account 2100 into Account 4000 SaaS Revenue'
  },
  {
    id: 'close_06',
    name: 'Cross-border EU VAT OSS & state sales tax nexus provision calculation',
    category: 'TAX_PROVISION',
    assignedRole: 'Tax Director',
    status: 'IN_PROGRESS',
    ledgerImpact: 'Estimated tax liability balance $18,400 awaiting final HMRC batch'
  },
  {
    id: 'close_07',
    name: 'Dual-CFO final fiduciary review & cryptographic ledger hard-close lock',
    category: 'EXECUTIVE_SIGN',
    assignedRole: 'Chief Financial Officer',
    status: 'PENDING',
    ledgerImpact: 'Enforces immutable SHA-256 seal preventing retrospective postings'
  }
];

export const CommercialContinuousCloseWorkspace: React.FC = () => {
  const [tasks, setTasks] = useState<MonthEndTask[]>(INITIAL_CLOSE_TASKS);
  const [isHardLocked, setIsHardLocked] = useState<boolean>(false);
  const [lockHash, setLockHash] = useState<string | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const completedCount = tasks.filter(t => t.status === 'COMPLETED').length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  const handleCompleteTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: 'COMPLETED',
          completedAt: 'Just now',
          verifiedBy: 'current_cfo_user@econos.corp'
        };
      }
      return t;
    }));
    setStatusNotice(`Task ${id} completed & validated against balanced General Ledger.`);
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const handleExecuteHardCloseLock = () => {
    const seal = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setLockHash(seal);
    setIsHardLocked(true);
    setTasks(prev => prev.map(t => ({
      ...t,
      status: 'COMPLETED',
      completedAt: t.completedAt || '2026-09-20 12:00 UTC',
      verifiedBy: t.verifiedBy || 'chief.financial.officer@econos.corp'
    })));
    setStatusNotice('Period Hard-Close Lock executed! General Ledger accounts cryptographically sealed.');
    setTimeout(() => setStatusNotice(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#132338] text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                CONTINUOUS ACCOUNTING & MONTH-END CLOSE
              </span>
              <span className="text-slate-400 text-xs font-mono">• Orchestrated Runbook</span>
            </div>
            <h2 className="text-xl font-bold font-mono tracking-tight text-white mt-1">
              Autonomous Month-End Close & Hard-Lock Seal
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Replaces multi-week manual closes with orchestrated continuous reconciliations, automated accruals, ratable revenue releases, and an immutable cryptographic hard-close seal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isHardLocked ? (
              <button
                onClick={handleExecuteHardCloseLock}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition shadow-sm self-start md:self-auto shrink-0"
              >
                <Lock className="w-4 h-4" />
                <span>Execute Hard-Close Seal</span>
              </button>
            ) : (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>PERIOD HARD-LOCKED</span>
              </div>
            )}
          </div>
        </div>

        {statusNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusNotice}</span>
          </div>
        )}

        {/* Close Progress Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Close Runbook Progress</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {isHardLocked ? '100%' : `${progressPct}%`} Complete
            </div>
            <div className="text-[11px] text-amber-400/80 font-mono mt-0.5">
              {isHardLocked ? tasks.length : completedCount} of {tasks.length} Milestone Tasks
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Close Cycle Time</span>
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
              1.8 Business Days
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Benchmark: 8.5 Days (SaaS)</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>GL Reconciled Delta</span>
              <Award className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              $0.00 Imbalance
            </div>
            <div className="text-[11px] text-cyan-400/80 font-mono mt-0.5">100% Double-Entry Parity</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Ledger Security State</span>
              {isHardLocked ? <Lock className="w-4 h-4 text-emerald-400" /> : <Unlock className="w-4 h-4 text-amber-400" />}
            </div>
            <div className={`text-lg font-bold font-mono mt-1 ${isHardLocked ? 'text-emerald-300' : 'text-amber-300'}`}>
              {isHardLocked ? 'Cryptographically Sealed' : 'Pre-Close Draft'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
              {lockHash ? lockHash.slice(0, 16) + '...' : 'Awaiting Final Signature'}
            </div>
          </div>
        </div>
      </div>

      {/* Cryptographic Seal Proof Bar (If Sealed) */}
      {isHardLocked && lockHash && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs text-xs font-mono">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>IMMUTABLE HARD-CLOSE SEAL PROOF</span>
            </div>
            <span className="text-[11px] text-emerald-700">Timestamp: 2026-09-20 12:00:00 UTC</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-600 break-all bg-white/80 p-2.5 rounded-xl border border-emerald-100">
            <span className="text-slate-400">SHA-256 Ledger State Root: </span>
            <span className="font-mono font-bold text-emerald-900">{lockHash}</span>
          </div>
          <div className="mt-1 text-[10px] text-emerald-700">
            All retrospective GL modifications are rejected by server protocol. Auditor access token generated.
          </div>
        </div>
      )}

      {/* Month-End Runbook Task Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-mono text-slate-900">
              Month-End Accounting Close Runbook
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Period: <span className="font-bold text-slate-800">September 2026</span> • Automated Dependency Graph
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Tasks: <span className="font-bold text-emerald-600">{completedCount}</span> / {tasks.length} Completed
          </div>
        </div>

        <div className="divide-y divide-slate-200/80">
          {tasks.map((task, idx) => {
            const isCompleted = task.status === 'COMPLETED' || isHardLocked;
            const isInProgress = task.status === 'IN_PROGRESS' && !isHardLocked;

            return (
              <div key={task.id} className="p-4 hover:bg-slate-50/70 transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isInProgress ? (
                      <Clock className="w-4 h-4 text-amber-500 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-500">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="font-bold text-slate-900">{task.name}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      Role: <span className="text-slate-700 font-semibold">{task.assignedRole}</span>
                      {task.verifiedBy && (
                        <span> • Verified by <span className="text-emerald-700">{task.verifiedBy}</span></span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-slate-400" />
                      <span>{task.ledgerImpact}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isCompleted 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : isInProgress
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isCompleted ? 'VERIFIED & POSTED' : isInProgress ? 'IN PROGRESS' : 'PENDING'}
                  </span>

                  {!isCompleted && (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="px-3 py-1 rounded-lg bg-[#132338] hover:bg-slate-800 text-white font-bold text-[11px] transition shadow-2xs"
                    >
                      Sign Off Task
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MoM Variance & Fluctuation Analysis */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-amber-600" />
          <span>Automated MoM Variance & Fluctuation Analysis (P&L Audit Walk)</span>
        </h3>
        <p className="text-xs text-slate-500 font-mono">
          Identifies material line-item variances (&gt; ±5.0%) between August and September close:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="text-slate-500 font-semibold">Subscription Revenue</div>
            <div className="text-sm font-bold text-slate-900">$184,200 <span className="text-emerald-600 text-xs font-bold">(+12.4% MoM)</span></div>
            <div className="text-[11px] text-slate-500 mt-1">
              Driven by 3 Enterprise annual expansions and unbundled ASC 606 milestone revenue recognition.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="text-slate-500 font-semibold">Cloud Infrastructure COGS</div>
            <div className="text-sm font-bold text-slate-900">$38,400 <span className="text-rose-600 text-xs font-bold">(+14.5% MoM)</span></div>
            <div className="text-[11px] text-slate-500 mt-1">
              Snowflake compute consumption peak; flagged by AI CFO Anomaly Surveillance as optimization target.
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="text-slate-500 font-semibold">Net Operating Cash Flow</div>
            <div className="text-sm font-bold text-slate-900">+$68,200 <span className="text-emerald-600 text-xs font-bold">(+22.1% MoM)</span></div>
            <div className="text-[11px] text-slate-500 mt-1">
              Accelerated AR collections and 2/10 dynamic discount optimization reduced gross payable cash drag.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
