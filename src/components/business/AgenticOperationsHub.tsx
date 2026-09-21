import React, { useState } from 'react';
import { 
  Bot, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Play, 
  Layers, 
  DollarSign, 
  Lock, 
  TrendingUp, 
  Activity, 
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { AppLayer } from '../../types/econos';
import { SOVEREIGN_28_AGENT_FLEET } from '../../data/sovereignAgentFleetData';

interface AgenticOperationsHubProps {
  onNavigateToLayer?: (layer: AppLayer) => void;
}

interface AutonomousActionLog {
  id: string;
  agentCode: string;
  agentName: string;
  action: string;
  impactUsd: number;
  hash: string;
  timestamp: string;
  status: 'COMMITTED' | 'VERIFIED' | 'SETTLED';
  rail: string;
}

const INITIAL_ACTION_LOGS: AutonomousActionLog[] = [
  {
    id: 'act-901',
    agentCode: 'LIQ-SWEEP',
    agentName: 'Atlas-01',
    action: 'Overnight SOFR repo liquidity sweep executed across 3 sweep accounts',
    impactUsd: 412500,
    hash: 'sha256:8e4a1f...9b2c',
    timestamp: '14 mins ago',
    status: 'SETTLED',
    rail: 'FedNow / BNY Mellon'
  },
  {
    id: 'act-902',
    agentCode: 'AP-OCR',
    agentName: 'Vulcan-10',
    action: 'Optical character recognition (OCR) and 3-way match on 8 vendor bills',
    impactUsd: 64200,
    hash: 'sha256:3d7b9c...a1f4',
    timestamp: '32 mins ago',
    status: 'VERIFIED',
    rail: 'NetSuite ERP Bridge'
  },
  {
    id: 'act-903',
    agentCode: 'AR-MATCH',
    agentName: 'Minerva-08',
    action: 'Automated lockbox wire matching for 4 enterprise invoice receivables',
    impactUsd: 128900,
    hash: 'sha256:1f9c8d...7e2b',
    timestamp: '1 hr ago',
    status: 'SETTLED',
    rail: 'JPMorgan Chase ACH'
  },
  {
    id: 'act-904',
    agentCode: 'TAX-SYNTH',
    agentName: 'Aequitas-15',
    action: 'Form 6765 §41 R&D payroll offset credit synthesized & cryptographically sealed',
    impactUsd: 48500,
    hash: 'sha256:6c2a4f...8d1e',
    timestamp: '2 hrs ago',
    status: 'COMMITTED',
    rail: 'Internal Tax Enclave'
  }
];

export const AgenticOperationsHub: React.FC<AgenticOperationsHubProps> = ({
  onNavigateToLayer
}) => {
  const [actionLogs, setActionLogs] = useState<AutonomousActionLog[]>(INITIAL_ACTION_LOGS);
  const [runningAction, setRunningAction] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [selectedAgentFilter, setSelectedAgentFilter] = useState<string>('ALL');

  // Key commercial agents active in business operations
  const commercialAgents = SOVEREIGN_28_AGENT_FLEET.filter(a => 
    ['agt_liq_01', 'agt_fed_02', 'agt_fx_03', 'agt_inv_08', 'agt_ocr_10', 'agt_tax_15', 'agt_cpq_18', 'agt_sox_26'].includes(a.id)
  );

  const handleRunAutonomousAction = (actionKey: string, title: string, agentCode: string, agentName: string, amount: number, rail: string) => {
    setRunningAction(actionKey);
    setSuccessBanner(null);

    setTimeout(() => {
      const newLog: AutonomousActionLog = {
        id: `act-${Date.now()}`,
        agentCode,
        agentName,
        action: title,
        impactUsd: amount,
        hash: `sha256:${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 6)}`,
        timestamp: 'Just now',
        status: 'SETTLED',
        rail
      };

      setActionLogs(prev => [newLog, ...prev]);
      setRunningAction(null);
      setSuccessBanner(`Autonomous Task Completed: "${title}" by ${agentName}. Cryptographic receipt committed to Decision Ledger.`);
    }, 1100);
  };

  const filteredLogs = selectedAgentFilter === 'ALL'
    ? actionLogs
    : actionLogs.filter(log => log.agentCode === selectedAgentFilter);

  return (
    <div className="space-y-6">
      {/* Top Banner: Sovereign Architecture Orientation */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  ECONOS AGENTIC CORE
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  28 Sovereign Agents Active
                </span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <Bot className="w-6 h-6 text-sky-400" />
                Agentic Automation & Sovereign AI Operations
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans leading-relaxed">
                Autonomous economic agents handle high-frequency commercial execution—from 3-way invoice matching and AP OCR to overnight SOFR liquidity sweeps, dynamic pricing CPQ, and statutory tax provisioning.
              </p>
            </div>

            {/* Quick Portals to Deep System Layers */}
            <div className="flex flex-wrap items-center gap-2">
              {onNavigateToLayer && (
                <>
                  <button
                    id="nav-to-trust-layer"
                    onClick={() => onNavigateToLayer('TRUST')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-bold transition shadow-sm cursor-pointer"
                    title="Jump to Layer 3: 28 Sovereign Agents Fleet & AI Firewall"
                  >
                    <ShieldCheck className="w-4 h-4 text-sky-200" />
                    <span>Layer 3 • Agent Fleet (28)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id="nav-to-execution-layer"
                    onClick={() => onNavigateToLayer('AUTONOMOUS_EXECUTION')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition shadow-sm cursor-pointer"
                    title="Jump to Layer 11: Direct Banking & ERP Execution Rails"
                  >
                    <Zap className="w-4 h-4 text-emerald-200" />
                    <span>Layer 11 • Execution Rails</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id="nav-to-brain-layer"
                    onClick={() => onNavigateToLayer('ECONOMIC_BRAIN')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold transition shadow-sm cursor-pointer"
                    title="Jump to Layer 5: Economic Brain Orchestrator"
                  >
                    <Cpu className="w-4 h-4 text-amber-200" />
                    <span>Layer 5 • Economic Brain</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Pre-Flight Firewall</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero-Trust Active
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Prompt-injection &amp; cap defense</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Settlement Velocity</div>
              <div className="text-base font-bold text-sky-400 mt-0.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                Sub-Second (ISO 20022)
              </div>
              <div className="text-[10px] text-slate-500 mt-1">FedNow &amp; ACH direct bridges</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Today's Executed Actions</div>
              <div className="text-base font-bold text-amber-300 mt-0.5 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-300" />
                {actionLogs.length + 138} Operations
              </div>
              <div className="text-[10px] text-slate-500 mt-1">100% cryptographic receipts</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Automated Capital Flow</div>
              <div className="text-base font-bold text-emerald-300 mt-0.5 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-300" />
                $654,100 Today
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Reconciled, swept &amp; verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button 
            onClick={() => setSuccessBanner(null)} 
            className="text-emerald-700 hover:text-emerald-900 font-bold px-2 py-0.5 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Interactive Autonomous Triggers Panel */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-mono">
              <Play className="w-4 h-4 text-sky-600 fill-sky-600" />
              Live Autonomous Automation Triggers
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              Dispatch high-velocity autonomous workflows with real-time pre-flight assertion and Merkle verification.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">
            Interactive Test Console
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Action 1: AP OCR */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  Vulcan-10 (AP-OCR)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Tier 2</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">AP Invoice OCR &amp; 3-Way Match</h4>
              <p className="text-[11px] text-slate-500 mt-1 font-sans">
                Scans pending vendor bills, checks for PO discrepancies, and prepares automated settlement batch.
              </p>
            </div>
            <button
              id="trigger-ap-ocr"
              disabled={runningAction !== null}
              onClick={() => handleRunAutonomousAction('ap-ocr', 'AP Invoice OCR batch matched 6 vendor bills against POs', 'AP-OCR', 'Vulcan-10', 58300, 'NetSuite ERP')}
              className={`mt-4 w-full py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                runningAction === 'ap-ocr'
                  ? 'bg-slate-200 text-slate-600'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {runningAction === 'ap-ocr' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing OCR...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Execute AP Match ($58.3k)</span>
                </>
              )}
            </button>
          </div>

          {/* Action 2: SOFR Sweep */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Atlas-01 (LIQ-SWEEP)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Tier 1</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">Overnight SOFR Repo Sweep</h4>
              <p className="text-[11px] text-slate-500 mt-1 font-sans">
                Sweeps idle operational cash exceeding operating targets into high-yield repo backing (5.32% yield).
              </p>
            </div>
            <button
              id="trigger-sofr-sweep"
              disabled={runningAction !== null}
              onClick={() => handleRunAutonomousAction('sofr-sweep', 'Overnight SOFR cash sweep relocated $250,000 to treasury pool', 'LIQ-SWEEP', 'Atlas-01', 250000, 'FedNow / BNY Mellon')}
              className={`mt-4 w-full py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                runningAction === 'sofr-sweep'
                  ? 'bg-slate-200 text-slate-600'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {runningAction === 'sofr-sweep' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Sweeping Cash...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sweep to SOFR ($250k)</span>
                </>
              )}
            </button>
          </div>

          {/* Action 3: AR Lockbox Match */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                  Minerva-08 (AR-MATCH)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Tier 2</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">AR Wire Inbound Reconciliation</h4>
              <p className="text-[11px] text-slate-500 mt-1 font-sans">
                Matches inbound customer wires against open receivables and triggers automated thank-you receipt.
              </p>
            </div>
            <button
              id="trigger-ar-match"
              disabled={runningAction !== null}
              onClick={() => handleRunAutonomousAction('ar-match', 'Inbound wire matched against ACME Corp invoice #INV-2026-08', 'AR-MATCH', 'Minerva-08', 92400, 'JPMorgan Chase ACH')}
              className={`mt-4 w-full py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                runningAction === 'ar-match'
                  ? 'bg-slate-200 text-slate-600'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {runningAction === 'ar-match' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Matching Wires...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>Reconcile AR ($92.4k)</span>
                </>
              )}
            </button>
          </div>

          {/* Action 4: Tax Credit Synthesis */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                  Aequitas-15 (TAX-SYNTH)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Tier 3</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">R&amp;D Tax Credit §41 Synthesis</h4>
              <p className="text-[11px] text-slate-500 mt-1 font-sans">
                Quantifies qualified research expenses (QRE) and compiles tamper-proof audit trail for tax provisions.
              </p>
            </div>
            <button
              id="trigger-tax-synth"
              disabled={runningAction !== null}
              onClick={() => handleRunAutonomousAction('tax-synth', 'Synthesized $34,800 QRE credit with cryptographic IRS substantiation block', 'TAX-SYNTH', 'Aequitas-15', 34800, 'Statutory Enclave')}
              className={`mt-4 w-full py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                runningAction === 'tax-synth'
                  ? 'bg-slate-200 text-slate-600'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {runningAction === 'tax-synth' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Credit...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  <span>Synthesize R&amp;D ($34.8k)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Commercial Autonomous Agents Registry Grid */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-mono flex items-center gap-2">
              <Bot className="w-4 h-4 text-sky-600" />
              Active Commercial Fleet
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              Automated autonomous workers assigned to your current enterprise business entity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToLayer && (
              <button
                onClick={() => onNavigateToLayer('TRUST')}
                className="text-xs font-mono font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-200 transition cursor-pointer"
              >
                <span>View All 28 Sovereign Agents</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {commercialAgents.map(agent => (
            <div 
              key={agent.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                    {agent.code}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {agent.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 truncate" title={agent.name}>
                  {agent.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 font-sans">
                  {agent.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Trust Score:</span>
                    <span className="font-bold text-slate-900">{agent.trustScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Prediction Accuracy:</span>
                    <span className="font-bold text-emerald-700">{(1 - agent.brierScore).toFixed(3)} Brier</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Actions Executed:</span>
                    <span className="font-bold text-slate-900">{agent.totalActionsExecuted.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Monthly Limit:</span>
                    <span className="font-bold text-slate-900">${(agent.spendingLimitMonthly / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span className="truncate max-w-[150px]" title={agent.passportId}>
                  {agent.passportId}
                </span>
                <span className="text-emerald-600 font-bold">Ed25519 Signed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Cryptographic Agent Action Stream */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Cryptographic Execution Ledger Stream
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              Immutable ledger receipts of automated actions dispatched by the agent fleet.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-slate-500 text-[10px]">Filter by Agent:</span>
            <select
              value={selectedAgentFilter}
              onChange={(e) => setSelectedAgentFilter(e.target.value)}
              className="px-2 py-1 rounded-lg border border-slate-200 text-xs bg-slate-50 text-slate-800"
            >
              <option value="ALL">All Commercial Agents</option>
              <option value="LIQ-SWEEP">Atlas-01 (LIQ-SWEEP)</option>
              <option value="AP-OCR">Vulcan-10 (AP-OCR)</option>
              <option value="AR-MATCH">Minerva-08 (AR-MATCH)</option>
              <option value="TAX-SYNTH">Aequitas-15 (TAX-SYNTH)</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {filteredLogs.map(log => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/70 rounded-lg px-2 transition">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-700 font-bold text-[10px]">
                  {log.agentCode.substring(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.agentName}</span>
                    <span className="text-[10px] text-slate-400">({log.agentCode})</span>
                    <span className="text-[10px] text-slate-400">• {log.timestamp}</span>
                  </div>
                  <div className="text-xs text-slate-700 font-sans mt-0.5">{log.action}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                    <span>Rail: {log.rail}</span>
                    <span>•</span>
                    <span className="text-slate-500 truncate max-w-[200px]" title={log.hash}>{log.hash}</span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  ${log.impactUsd.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-0.5">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
