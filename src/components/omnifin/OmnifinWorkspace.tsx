import React, { useState } from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  Activity, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Lock, 
  Key, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Scale, 
  Coins, 
  Landmark, 
  FileText, 
  Database, 
  Bot, 
  Search, 
  Sliders, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  DollarSign, 
  BarChart3, 
  Radio, 
  Network, 
  Eye, 
  History, 
  ExternalLink,
  ChevronRight,
  Shield,
  FileCheck2,
  GitBranch,
  Filter,
  Wallet,
  QrCode
} from 'lucide-react';
import { 
  OmnifinSurface, 
  OmnifinOperatingStep, 
  EmergencyMarketMode, 
  OmnifinUniversalAsset,
  AutonomousFinancialAgent,
  MarketIntegrityAlert,
  ProofCarryingTransaction,
  NettingObligation,
  CounterfactualSimulationResult
} from '../../types/omnifin';
import { OmnifinRealtimeExchange } from './OmnifinRealtimeExchange';
import { OmnifinWalletFunding } from './OmnifinWalletFunding';
import {
  Web3WalletState,
  Web3Network,
  Web3WalletProvider
} from '../../types/omnifinExchange';
import { 
  INITIAL_OMNIFIN_ASSETS, 
  INITIAL_AUTONOMOUS_AGENTS, 
  INITIAL_CAUSAL_GRAPH, 
  INITIAL_INTEGRITY_ALERTS, 
  INITIAL_PROOF_TRANSACTIONS, 
  INITIAL_NETTING_OBLIGATIONS, 
  INITIAL_COUNTERFACTUAL_SIMULATION,
  SAMPLE_NFL_SCRIPTS
} from '../../data/omnifinData';

const OPERATING_STEPS: Array<{ step: OmnifinOperatingStep; label: string; desc: string }> = [
  { step: 'OBSERVE', label: '1. Observe', desc: 'Continuous ingest of raw prices, mempools, books & feeds' },
  { step: 'UNDERSTAND', label: '2. Understand', desc: 'Reconstruct underlying economic state & causal context' },
  { step: 'DETECT', label: '3. Detect', desc: 'Identify anomalies, wash trades, front-running & manipulation' },
  { step: 'SIMULATE', label: '4. Simulate', desc: 'Run adverse, extreme, and liquidity shock counterfactuals' },
  { step: 'DECIDE', label: '5. Decide', desc: 'Formulate algorithmic & agent execution proposals' },
  { step: 'AUTHORIZE', label: '6. Authorize', desc: 'Multi-signature, MPC, and role-based cryptographic consent' },
  { step: 'EXECUTE', label: '7. Execute', desc: 'Sub-millisecond routing across decentralized & prime venues' },
  { step: 'CLEAR', label: '8. Clear', desc: 'Calculate who owes what to whom across all counterparties' },
  { step: 'SETTLE', label: '9. Settle', desc: 'Multi-rail physical & cryptographic asset transfer' },
  { step: 'VERIFY', label: '10. Verify', desc: 'Zero-knowledge proofs and state transition verification' },
  { step: 'RECONCILE', label: '11. Reconcile', desc: 'Continuous ledger invariant and balance verification' },
  { step: 'MONITOR', label: '12. Monitor', desc: '24/7 post-trade surveillance and systemic risk tracking' },
  { step: 'LEARN', label: '13. Learn', desc: 'Bayesian model calibration without historical revisionism' }
];

export const OmnifinWorkspace: React.FC = () => {
  // Navigation & View state
  const [activeSurface, setActiveSurface] = useState<OmnifinSurface>('OVERVIEW');
  const [activeOperatingStep, setActiveOperatingStep] = useState<OmnifinOperatingStep>('OBSERVE');
  const [emergencyMode, setEmergencyMode] = useState<EmergencyMarketMode>('NORMAL');
  
  // Data state
  const [assets, setAssets] = useState<OmnifinUniversalAsset[]>(INITIAL_OMNIFIN_ASSETS);
  const [agents, setAgents] = useState<AutonomousFinancialAgent[]>(INITIAL_AUTONOMOUS_AGENTS);
  const [alerts, setAlerts] = useState<MarketIntegrityAlert[]>(INITIAL_INTEGRITY_ALERTS);
  const [proofTxs, setProofTxs] = useState<ProofCarryingTransaction[]>(INITIAL_PROOF_TRANSACTIONS);
  const [nettingObligations, setNettingObligations] = useState<NettingObligation[]>(INITIAL_NETTING_OBLIGATIONS);
  const [simulation] = useState<CounterfactualSimulationResult>(INITIAL_COUNTERFACTUAL_SIMULATION);

  // NFL IDE state
  const [nflScriptIndex, setNflScriptIndex] = useState<number>(0);
  const [nflCode, setNflCode] = useState<string>(SAMPLE_NFL_SCRIPTS[0].code);
  const [isCompilingNfl, setIsCompilingNfl] = useState<boolean>(false);
  const [nflOutput, setNflOutput] = useState<string | null>(null);

  // Filter state for Integrity
  const [integrityFilter, setIntegrityFilter] = useState<'ALL' | 'CONFIRMED' | 'SIGNALS'>('ALL');

  // Trade simulation state in Market surface
  const [tradeAmount, setTradeAmount] = useState<string>('500000');
  const [selectedTradeAsset, setSelectedTradeAsset] = useState<string>('BTC-INST');
  const [tradeStatus, setTradeStatus] = useState<string | null>(null);
  const [isExecutingTrade, setIsExecutingTrade] = useState<boolean>(false);

  // Web3 Wallet & Exchange Deposit State
  const [workspaceMargin, setWorkspaceMargin] = useState<number>(1174150);
  const [web3Wallet, setWeb3Wallet] = useState<Web3WalletState>({
    isConnected: true,
    address: '0x71C8349281aE4aC9128490B82019482901a84b29',
    walletProvider: 'metamask',
    network: 'arbitrum',
    chainId: 42161,
    walletBalances: {
      usdo: 38400,
      btc: 1.45,
      eth: 12.8,
      sol: 85.0
    },
    isSignatureVerified: true
  });

  const handleConnectWeb3 = async (provider: Web3WalletProvider) => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum && provider === 'metamask') {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          setWeb3Wallet(prev => ({
            ...prev,
            isConnected: true,
            address: accounts[0],
            walletProvider: provider
          }));
          return;
        }
      }
    } catch (err) {
      console.warn('Real Web3 connection fallback to simulated institutional provider', err);
    }

    setWeb3Wallet(prev => ({
      ...prev,
      isConnected: true,
      address: `0x71C8${Math.random().toString(16).substring(2, 6).toUpperCase()}...4B29`,
      walletProvider: provider,
      isSignatureVerified: true
    }));
  };

  const handleDisconnectWeb3 = () => {
    setWeb3Wallet(prev => ({
      ...prev,
      isConnected: false,
      address: null,
      walletProvider: null
    }));
  };

  const handleSwitchWeb3Network = (network: Web3Network) => {
    setWeb3Wallet(prev => ({
      ...prev,
      network,
      chainId: network === 'arbitrum' ? 42161 : network === 'ethereum' ? 1 : network === 'base' ? 8453 : network === 'polygon' ? 137 : 101
    }));
  };

  const handleWeb3Deposit = (
    asset: string,
    amount: number,
    amountUsd: number,
    network: string,
    txHash: string
  ) => {
    setWorkspaceMargin(prev => prev + amountUsd);
  };

  const handleWeb3Withdraw = (
    asset: string,
    amount: number,
    destinationAddress: string
  ) => {
    const amountUsd = asset === 'BTC' ? amount * 94850 : asset === 'ETH' ? amount * 3480 : amount;
    setWorkspaceMargin(prev => Math.max(0, prev - amountUsd));
  };

  // Handle NFL compilation simulation
  const handleCompileNfl = () => {
    setIsCompilingNfl(true);
    setNflOutput(null);
    setTimeout(() => {
      setIsCompilingNfl(false);
      setNflOutput(`[NFL COMPILER 2.6.4] SYNTAX OK
--------------------------------------------------
INTENT: Verified Proof-Carrying State Transition
TARGET ASSET: BTC-INST / USD-O
ESTIMATED SLIPPAGE: 0.0042% (Optimal Routing)
MAX DRAWDOWN TOLERANCE: < 3.00% (Passed: 1.48%)
SECURITY PROOF: STRICT_MPC (Attestation #99482)
POLICY INVARIANT: NO_LEVERAGE_OVER_3X (Enforced)
SETTLEMENT ENCLAVE: OMNIFIN_CLEAR_NET / FEDWIRE_RTGS
STATUS: READY_FOR_SIGNATURE [TRANSACTION SIGNED & DISPATCHED]`);
    }, 600);
  };

  // Handle trade execution simulation
  const handleExecuteTrade = () => {
    setIsExecutingTrade(true);
    setTradeStatus('Validating 10-step pipeline: Identity → Security → Integrity → Risk → Policy...');
    setTimeout(() => {
      setIsExecutingTrade(false);
      setTradeStatus(`Order for $${Number(tradeAmount).toLocaleString()} ${selectedTradeAsset} AUTHORIZED & CLEARED. 10/10 Proofs Attached. Settled via OMNIFIN Multi-Rail in 0.38ms.`);
    }, 900);
  };

  // Toggle Agent freeze status
  const handleToggleAgentStatus = (agentId: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        const nextStatus = a.status === 'ACTIVE' ? 'POLICY_LOCKED' : 'ACTIVE';
        return {
          ...a,
          status: nextStatus,
          lastAction: nextStatus === 'POLICY_LOCKED' ? 'EMERGENCY PROTOCOL: Frozen by Human Executive' : 'Policy Re-Authorized by Sovereign Key'
        };
      }
      return a;
    }));
  };

  // Run Netting Cycle simulation
  const handleRunNettingCycle = () => {
    setNettingObligations(prev => prev.map(o => ({
      ...o,
      status: 'NETTED_VERIFIED',
      capitalSavedUsd: o.capitalSavedUsd + 15000000
    })));
  };

  return (
    <div className="space-y-6 text-slate-900">
      
      {/* MASTER TOP BANNER: OMNIFIN SOVEREIGN OPERATING HEADER */}
      <div className="rounded-3xl bg-gradient-to-b from-[#080e1a] via-[#0b1528] to-[#080d19] text-white p-6 sm:p-8 border border-blue-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow & Grid Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/30">
                  <Globe2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>OMNIFIN</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/40">
                    GLOBAL OPERATING LAYER
                  </span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                A universal <span className="text-cyan-300 font-semibold">Financial State + Intelligence + Integrity + Execution + Clearing + Settlement Layer</span> operating above and across all blockchains, banks, exchanges, and AI agents.
              </p>
            </div>

            {/* Emergency Mode Controller */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Emergency Market Mode</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    emergencyMode === 'NORMAL' ? 'bg-emerald-400 animate-pulse' :
                    emergencyMode === 'ELEVATED_RISK' ? 'bg-amber-400' : 'bg-rose-500 animate-ping'
                  }`} />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">{emergencyMode}</span>
                </div>
              </div>
              <select
                value={emergencyMode}
                onChange={(e) => setEmergencyMode(e.target.value as EmergencyMarketMode)}
                className="bg-slate-950 text-xs font-mono text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-cyan-400 cursor-pointer"
              >
                <option value="NORMAL">NORMAL (All Rails Active)</option>
                <option value="ELEVATED_RISK">ELEVATED_RISK (+25% Haircuts)</option>
                <option value="RESTRICTED">RESTRICTED (Allowlist Only)</option>
                <option value="EMERGENCY">EMERGENCY (Hedge Sweeps)</option>
                <option value="ISOLATED">ISOLATED (Air-Gapped Enclave)</option>
                <option value="RECOVERY">RECOVERY (Replay DAG Tree)</option>
                <option value="RECONCILIATION">RECONCILIATION (Audit Audit)</option>
              </select>
            </div>
          </div>

          {/* Master Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400">Total Monitored AUM</div>
              <div className="text-lg font-black text-amber-300 font-mono mt-0.5">$142.85B</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-mono">15 Asset Classes</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400">Autonomous Clearing</div>
              <div className="text-lg font-black text-cyan-300 font-mono mt-0.5">98.4%</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">$18.2B Netted Today</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400">Causal Latency</div>
              <div className="text-lg font-black text-emerald-300 font-mono mt-0.5">0.42ms</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-mono">Zero Contagion Lag</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400">Active AI Swarms</div>
              <div className="text-lg font-black text-purple-300 font-mono mt-0.5">12 Agents</div>
              <div className="text-[10px] text-purple-400 mt-1 font-mono">Least Privilege Scope</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400">Settlement SLA</div>
              <div className="text-lg font-black text-white font-mono mt-0.5">99.999%</div>
              <div className="text-[10px] text-cyan-400 mt-1 font-mono">Proof-Carrying Rails</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-400">Capital Saved (Netting)</div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">$245.0M</div>
              <div className="text-[10px] text-emerald-300 mt-1 font-mono">Collateral Preserved</div>
            </div>
          </div>

          {/* 12-STEP FINANCIAL OPERATING LOOP TRACKER */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                12-STEP AUTONOMOUS FINANCIAL OPERATING LOOP
              </span>
              <span className="text-[11px] text-cyan-300">
                Current: {OPERATING_STEPS.find(s => s.step === activeOperatingStep)?.label}
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-13 gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {OPERATING_STEPS.map((s, idx) => {
                const isActive = activeOperatingStep === s.step;
                return (
                  <button
                    key={s.step}
                    onClick={() => setActiveOperatingStep(s.step)}
                    className={`px-2 py-1.5 rounded-lg text-left transition text-[10px] font-mono font-bold truncate cursor-pointer ${
                      isActive 
                        ? 'bg-cyan-500 text-slate-950 shadow-md font-black ring-1 ring-cyan-300' 
                        : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    title={`${s.label}: ${s.desc}`}
                  >
                    <div className="truncate">{idx + 1}. {s.step}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-2 text-xs font-mono text-cyan-200/90 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="font-bold text-cyan-400">Step Protocol:</span>
              <span>{OPERATING_STEPS.find(s => s.step === activeOperatingStep)?.desc}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SURFACE NAVIGATION BAR (14 CORE PRODUCT SURFACES + NFL IDE) */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'OVERVIEW', label: 'Overview & Architecture', icon: Layers },
            { id: 'MARKET', label: '⚡ Real-Time Exchange', icon: TrendingUp },
            { id: 'WALLET', label: '⚡ Web3 Wallet & Deposit', icon: Wallet },
            { id: 'SHIELD', label: 'Smart Contract Shield', icon: Shield },
            { id: 'INTELLIGENCE', label: 'Cross-Market Intelligence', icon: Network },
            { id: 'INTEGRITY', label: 'Market Integrity', icon: ShieldAlert },
            { id: 'RISK', label: 'Risk & Margining', icon: Activity },
            { id: 'LIQUIDITY', label: 'Liquidity Fabric', icon: BarChart3 },
            { id: 'CLEAR', label: 'Clear & Netting Engine', icon: Scale },
            { id: 'SETTLE', label: 'Multi-Rail Settlement', icon: Landmark },
            { id: 'PROOF', label: 'Proof-Carrying Tx (PCT)', icon: FileCheck2 },
            { id: 'AGENTS', label: '12 Autonomous Agents', icon: Bot },
            { id: 'RWA', label: 'RWA & Tokenization', icon: Coins },
            { id: 'TREASURY', label: 'Autonomous Treasury', icon: DollarSign },
            { id: 'RECOVERY', label: 'Immune & Recovery', icon: RefreshCw },
            { id: 'DEVELOPER', label: 'NFL Language IDE', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSurface === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSurface(tab.id as OmnifinSurface)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#132338] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA BASED ON SELECTED SURFACE */}
      <div className="space-y-6">

        {/* 1. OVERVIEW SURFACE */}
        {activeSurface === 'OVERVIEW' && (
          <div className="space-y-6">
            {/* Core Principle Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border border-blue-500/30 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Fundamental Operating Principle
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                "Don't Just Read The Market. Reconstruct The Market."
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Never trust a displayed financial outcome merely because a transaction occurred. Every reported price, volume, liquidity depth, collateral position, and market signal is rigorously reconstructed against underlying evidence, causal graph flows, and cryptographic proofs before irreversible execution.
              </p>
            </div>

            {/* Architecture Pipeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-3">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900 font-mono">1. Universal Financial State Engine</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Maintains a continuously updated machine-readable state of reality: Asset, Owner, Beneficial Owner, Liquidity Depth, Collateral, Exposure, Risk, and Provenance.
                </p>
                <div className="mt-4 p-2.5 rounded-lg bg-slate-50 font-mono text-[11px] text-slate-700 border border-slate-200">
                  CURRENT_STATE → INTENT → SIMULATION → POLICY → EXECUTION → PROOF
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900 font-mono">2. Proof-Carrying Transactions (PCT)</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  High-value transactions carry machine-verifiable evidence that all mandatory controls passed: Intent, Identity, Security, Simulation, Policy, and Authorization.
                </p>
                <div className="mt-4 p-2.5 rounded-lg bg-emerald-50 font-mono text-[11px] text-emerald-800 border border-emerald-200 font-bold">
                  Missing Required Proof: NO SETTLEMENT
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-3">
                  <Bot className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900 font-mono">3. Least-Privilege AI Agent Economy</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  12 specialized autonomous agents operate under strict protocol boundaries. AI proposes solutions; the protocol strictly validates and enforces.
                </p>
                <div className="mt-4 p-2.5 rounded-lg bg-purple-50 font-mono text-[11px] text-purple-800 border border-purple-200">
                  AI Proposes. Protocol Enforces. Never Self-Authorizes.
                </div>
              </div>
            </div>

            {/* Universal Asset Universe Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 font-mono">Universal Financial Object Model (15 Asset Classes)</h3>
                  <p className="text-xs text-slate-500">Live reconstructed liquidity, collateral haircuts, and provenance hashes</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  {assets.length} Active Feeds
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3">Asset</th>
                      <th className="px-4 py-3">Class</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">24h Chg</th>
                      <th className="px-4 py-3">Liquidity Depth</th>
                      <th className="px-4 py-3">Haircut</th>
                      <th className="px-4 py-3">Risk Rating</th>
                      <th className="px-4 py-3">Settlement Rails</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {assets.map((asset) => (
                      <tr key={asset.id} className="hover:bg-slate-50/80 transition">
                        <td className="px-4 py-3 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span>{asset.symbol}</span>
                            <span className="text-[10px] text-slate-400 font-normal truncate max-w-[120px]">{asset.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {asset.assetClass}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-800">
                          ${asset.currentPrice >= 1 ? asset.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : asset.currentPrice.toFixed(4)}
                        </td>
                        <td className={`px-4 py-3 font-bold ${asset.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          ${(asset.liquidityUsd / 1000000).toFixed(1)}M
                        </td>
                        <td className="px-4 py-3 text-slate-700 font-semibold">
                          {asset.collateralHaircutPct}%
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            asset.riskScore <= 15 ? 'bg-emerald-100 text-emerald-800' :
                            asset.riskScore <= 25 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            Score {asset.riskScore}/100
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-[10px] truncate max-w-[180px]">
                          {asset.settlementRails.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. REAL-TIME FINANCIAL EXCHANGE & AUTONOMOUS TRADING CORE */}
        {activeSurface === 'MARKET' && (
          <OmnifinRealtimeExchange />
        )}

        {/* 2B. WEB3 WALLET, RECEIVING ADDRESS & EXCHANGE FUNDING */}
        {activeSurface === 'WALLET' && (
          <OmnifinWalletFunding
            walletState={web3Wallet}
            onConnectWallet={handleConnectWeb3}
            onDisconnectWallet={handleDisconnectWeb3}
            onSwitchNetwork={handleSwitchWeb3Network}
            onDepositFunds={handleWeb3Deposit}
            onWithdrawFunds={handleWeb3Withdraw}
            availableMarginUsd={workspaceMargin}
            totalEquityUsd={workspaceMargin + 185000}
            onStartTradingPair={(_symbol) => {
              setActiveSurface('MARKET');
            }}
          />
        )}

        {/* 3. SHIELD & SMART CONTRACT SECURITY */}
        {activeSurface === 'SHIELD' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-mono">Smart Contract Bytecode & Security Rail</h3>
                  <p className="text-xs text-slate-500">Continuous auditing of proxy patterns, admin authorities, token allowances, and unverified functions</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                  Zero Malicious Allowances
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono font-bold text-slate-700">Proxy & Upgrade Authority</div>
                  <p className="text-xs text-slate-500 mt-1">Identifies hidden upgrade keys and multi-sig timelocks before allowing capital commitment.</p>
                  <div className="mt-3 text-[11px] font-mono font-bold text-emerald-600">PASS: 48hr Timelock Required</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono font-bold text-slate-700">Bytecode Decompilation</div>
                  <p className="text-xs text-slate-500 mt-1">Simulates state delta comparisons to catch hidden reentrancy and drain routines.</p>
                  <div className="mt-3 text-[11px] font-mono font-bold text-emerald-600">PASS: 1,420 Opcode Invariants Intact</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono font-bold text-slate-700">Emergency Asset Freeze</div>
                  <p className="text-xs text-slate-500 mt-1">Pre-authorized cryptographic revoke switches trigger instantly if anomaly detected.</p>
                  <div className="mt-3 text-[11px] font-mono font-bold text-blue-600">READY: MPC Guard Active</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. CROSS-MARKET INTELLIGENCE & CAUSAL GRAPH */}
        {activeSurface === 'INTELLIGENCE' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 font-mono">Cross-Market Causal Event Graph</h3>
                <p className="text-xs text-slate-500">Rate Shock → Bond Yield → FX Basis → Equity Pullback → Crypto Liquidity → Collateral Firewall</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                DAG Depth: 5 Nodes
              </span>
            </div>

            <div className="space-y-4">
              {INITIAL_CAUSAL_GRAPH.map((node, i) => (
                <div key={node.eventId} className="relative pl-6 pb-4 border-l-2 border-blue-300 last:border-0 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
                  
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-slate-900">Step {i + 1}: {node.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                          {node.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Timestamp: {node.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{node.description}</p>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-t border-slate-200/60">
                      <div className="text-blue-700 font-semibold flex items-center gap-1">
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Causal Effect: {node.causalImpact}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Proof Hash: {node.proofSignature}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. MARKET INTEGRITY & WASH TRADING */}
        {activeSurface === 'INTEGRITY' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 font-mono">Market Integrity Engine (Facts vs Signals vs Violations)</h3>
                <p className="text-xs text-slate-500">Separate observed facts from probabilistic risk signals and confirmed policy violations.</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setIntegrityFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg transition font-bold ${integrityFilter === 'ALL' ? 'bg-[#132338] text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  All Alerts
                </button>
                <button
                  onClick={() => setIntegrityFilter('CONFIRMED')}
                  className={`px-2.5 py-1 rounded-lg transition font-bold ${integrityFilter === 'CONFIRMED' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  Confirmed Violations
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {alerts
                .filter(a => integrityFilter === 'ALL' || (integrityFilter === 'CONFIRMED' && a.confirmedViolation))
                .map(alert => (
                  <div key={alert.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xs text-slate-900">{alert.assetSymbol}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                          {alert.category}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        alert.confirmedViolation ? 'bg-rose-600 text-white' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {alert.confirmedViolation ? 'CONFIRMED VIOLATION' : 'RISK SIGNAL ONLY'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div className="font-bold text-slate-700 mb-1">OBSERVED FACTS (Verifiable)</div>
                        <p className="text-slate-600 leading-relaxed">{alert.observedFacts}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div className="font-bold text-slate-700 mb-1">RISK SIGNAL (Analysis)</div>
                        <p className="text-slate-600 leading-relaxed">{alert.riskSignals}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-2 border-t border-slate-200">
                      <div className="text-slate-600">
                        <strong className="text-slate-900">Enforcement Action:</strong> {alert.recommendedAction}
                      </div>
                      <div className="text-[10px] text-slate-400">Confidence: {alert.confidenceScore}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 6. CLEARING & NETTING ENGINE */}
        {activeSurface === 'CLEAR' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 font-mono">Bilateral & Multilateral Netting Engine</h3>
                <p className="text-xs text-slate-500">"Who owes what to whom?" Aggregate compatible obligations and reduce required physical settlement volume.</p>
              </div>

              <button
                onClick={handleRunNettingCycle}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Run Multilateral Netting Cycle</span>
              </button>
            </div>

            {/* Netting Example Concept Banner */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-900 leading-relaxed">
              <strong className="font-bold text-blue-950">Netting Principle (Section 19):</strong> Party A owes Party B $100M. Party B owes Party A $80M. Rather than moving $180M in physical wires across banking systems, OMNIFIN settles the net difference: <strong>Party A pays Party B $20M</strong>, instantly freeing $160M in reserve collateral with full audit reconciliation!
            </div>

            <div className="space-y-4">
              {nettingObligations.map(obl => (
                <div key={obl.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-mono text-xs font-bold text-slate-900">
                      {obl.partyA} ⇄ {obl.partyB}
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                      {obl.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400">Gross Obligation (A → B)</div>
                      <div className="text-sm font-black text-slate-800">${(obl.grossObligationAtoB / 1000000).toFixed(1)}M {obl.asset}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400">Gross Obligation (B → A)</div>
                      <div className="text-sm font-black text-slate-800">${(obl.grossObligationBtoA / 1000000).toFixed(1)}M {obl.asset}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div className="text-[10px] text-emerald-800 font-bold">Net Final Settlement</div>
                      <div className="text-sm font-black text-emerald-900">${(obl.netObligationAmount / 1000000).toFixed(1)}M ({obl.netPayer})</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-1 text-slate-500">
                    <div>Capital Preserved: <strong className="text-emerald-700">${(obl.capitalSavedUsd / 1000000).toFixed(1)}M</strong></div>
                    <div>Deadline: {obl.settlementDeadline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. PROOF-CARRYING TRANSACTIONS (PCT) */}
        {activeSurface === 'PROOF' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 font-mono">Proof-Carrying Transactions (PCT Rail)</h3>
                <p className="text-xs text-slate-500">A high-value transaction carries machine-verifiable evidence that all mandatory controls passed.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-mono font-bold">
                10 Mandatory Proofs
              </span>
            </div>

            <div className="space-y-4">
              {proofTxs.map(tx => (
                <div key={tx.txId} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-black text-xs text-slate-900">{tx.txId}</span>
                      <span className="ml-2 text-xs text-slate-600 font-mono">({tx.intent})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      tx.status === 'SETTLED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {tx.status}
                    </span>
                  </div>

                  {/* Proof Check Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono">
                    {Object.entries(tx.proofs).map(([key, val]) => (
                      <div
                        key={key}
                        className={`p-2 rounded-lg border flex items-center justify-between ${
                          val ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900 font-bold'
                        }`}
                      >
                        <span className="truncate">{key.replace('Proof', '')}</span>
                        <span>{val ? '✓' : '✗'}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
                    <div>Value: <strong className="text-slate-800">${(tx.amountUsd / 1000000).toFixed(2)}M</strong> {tx.asset}</div>
                    <div>Destination Rail: {tx.destinationRail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. AUTONOMOUS FINANCIAL AGENTS (12 SPECIALIZED ROLES) */}
        {activeSurface === 'AGENTS' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 font-mono">12 Specialized Autonomous AI Financial Agents</h3>
                <p className="text-xs text-slate-500">Each agent operates under Least Privilege + Explicit Protocol Authority + Continuous Monitoring</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 text-xs font-mono font-bold">
                12 Active Agents
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map(agent => (
                <div key={agent.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-slate-900">{agent.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        agent.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-purple-700 font-semibold mt-0.5">{agent.role}</div>

                    <div className="mt-2 text-[10px] font-mono text-slate-500 p-2 rounded bg-white border border-slate-200">
                      <strong className="text-slate-700">Least Privilege Scope:</strong><br />
                      {agent.leastPrivilegeScope}
                    </div>

                    <div className="mt-2 text-[10px] font-mono text-slate-600">
                      Last Action ({agent.lastActionTime}):<br />
                      <span className="text-slate-800 font-medium">{agent.lastAction}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-[10px] font-mono text-slate-500">
                      Spend: ${(agent.currentCycleSpendUsd / 1000).toFixed(0)}k / ${(agent.spendingLimitUsd / 1000).toFixed(0)}k
                    </div>

                    <button
                      onClick={() => handleToggleAgentStatus(agent.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer ${
                        agent.status === 'ACTIVE'
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      {agent.status === 'ACTIVE' ? 'Freeze Agent' : 'Re-Authorize'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. NATIVE FINANCIAL LANGUAGE (NFL) IDE & COMPILER */}
        {activeSurface === 'DEVELOPER' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: NFL Code Editor */}
            <div className="lg:col-span-2 bg-[#090e17] rounded-2xl border border-slate-800 shadow-xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono font-black text-sm text-white">Native Financial Language (NFL) Compiler</span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={nflScriptIndex}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setNflScriptIndex(idx);
                      setNflCode(SAMPLE_NFL_SCRIPTS[idx].code);
                    }}
                    className="bg-slate-900 text-xs font-mono text-slate-300 border border-slate-700 rounded-lg px-2.5 py-1"
                  >
                    {SAMPLE_NFL_SCRIPTS.map((s, i) => (
                      <option key={i} value={i}>{s.title}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleCompileNfl}
                    disabled={isCompilingNfl}
                    className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Play className={`w-3 h-3 ${isCompilingNfl ? 'animate-spin' : ''}`} />
                    <span>{isCompilingNfl ? 'Compiling...' : 'Run & Settle'}</span>
                  </button>
                </div>
              </div>

              {/* Code TextArea */}
              <div className="relative">
                <textarea
                  value={nflCode}
                  onChange={(e) => setNflCode(e.target.value)}
                  rows={14}
                  className="w-full font-mono text-xs text-cyan-200 bg-slate-950/80 p-4 rounded-xl border border-slate-800 focus:outline-hidden focus:border-cyan-500 leading-relaxed resize-none shadow-inner"
                  spellCheck={false}
                />
              </div>

              {/* Compiler Output */}
              {nflOutput && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 font-mono text-xs text-cyan-300 whitespace-pre-wrap leading-relaxed">
                  {nflOutput}
                </div>
              )}
            </div>

            {/* Right Col: NFL Primitives Documentation */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 text-xs font-mono">
              <h3 className="text-sm font-black text-slate-900">NFL Native Primitives (Section 42)</h3>
              <p className="text-slate-500">Expresses pure financial intent; the OMNIFIN protocol deterministically synthesizes valid execution paths.</p>

              <div className="space-y-2 pt-2 text-[11px]">
                {[
                  { prim: 'OBSERVE', desc: 'Queries real-time reconstructed market depth and exposures' },
                  { prim: 'SIMULATE', desc: 'Runs counterfactual price & liquidity shock models' },
                  { prim: 'HEDGE', desc: 'Synthesizes delta-neutral hedges using approved enclaves' },
                  { prim: 'REQUIRE', desc: 'Enforces hard policy invariants (e.g. max drawdown < 3%)' },
                  { prim: 'CLEAR', desc: 'Computes bilateral & multilateral netting obligations' },
                  { prim: 'SETTLE', desc: 'Dispatches multi-rail physical & cryptographic transfer' },
                  { prim: 'VERIFY', desc: 'Validates Zero-Knowledge proof of state transition' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-blue-700">{item.prim}</span>: {item.desc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 10. RISK & MARGINING ENGINE */}
        {activeSurface === 'RISK' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 font-mono">Dynamic Portfolio Risk, Margining &amp; Stress Testing (Section 6 &amp; 15)</h3>
                <p className="text-xs text-slate-500">Continuous pre-trade risk evaluation: Value-at-Risk (VaR), SPAN margin parameters, collateral haircuts, and counterfactual crisis simulations</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                Systemic Margin Ratio: 168.4%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-400 text-[10px]">1-Day 99% Parametric VaR</div>
                <div className="text-xl font-black text-slate-900 mt-1">$4.18M</div>
                <div className="text-[10px] text-emerald-600 mt-1">Within $15M Global Risk Ceiling</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-400 text-[10px]">Initial Margin Requirement</div>
                <div className="text-xl font-black text-slate-900 mt-1">$12.45M</div>
                <div className="text-[10px] text-blue-600 mt-1">SPAN Portfolio Offset Applied</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-400 text-[10px]">Maintenance Margin Level</div>
                <div className="text-xl font-black text-slate-900 mt-1">$8.20M</div>
                <div className="text-[10px] text-emerald-600 mt-1">Liquidation Buffer: 51.8%</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-400 text-[10px]">Cross-Collateral Haircut Avg</div>
                <div className="text-xl font-black text-purple-700 mt-1">6.8%</div>
                <div className="text-[10px] text-slate-500 mt-1">Dynamically scaled by liquidity depth</div>
              </div>
            </div>

            {/* Counterfactual Crisis Simulation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-900 text-sm">Active Counterfactual Scenario: {simulation.scenarioName}</div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">99.4% Robustness</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <div className="text-slate-400 font-semibold">EXPECTED OUTCOME</div>
                  <div className="text-slate-800 mt-1">{simulation.expectedOutcome}</div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="text-emerald-800 font-semibold">BEST CASE</div>
                  <div className="text-emerald-900 mt-1">{simulation.bestCase}</div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="text-amber-800 font-semibold">ADVERSE CASE</div>
                  <div className="text-amber-900 mt-1">{simulation.adverseCase}</div>
                </div>

                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                  <div className="text-rose-800 font-semibold">EXTREME CASE</div>
                  <div className="text-rose-900 mt-1">{simulation.extremeCase}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 text-slate-200 text-[11px] leading-relaxed">
                <strong className="text-amber-300">Hard Invalidation Condition:</strong> {simulation.invalidationCondition}
              </div>
            </div>
          </div>
        )}

        {/* 11. WALLET & CUSTODY INFRASTRUCTURE */}
        {activeSurface === 'WALLET' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Wallet, Custody Infrastructure &amp; Security Firewall (Section 7 &amp; 22)</h3>
                <p className="text-xs text-slate-500 font-sans">Multi-party computation (MPC) 3-of-5 threshold signatures, hardware enclave isolation, anti-drain velocity locks, and zero-trust authentication</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                HSM Tier-4 Enclaves Online
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">MPC Threshold Key Sharding</span>
                  <Key className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-slate-600 text-[11px] font-sans">Keys never exist in a single location. 3-of-5 quorum required across cold enclaves, institution signers, and compliance validators.</p>
                <div className="p-2 rounded bg-white border border-slate-200 text-[10px] space-y-1">
                  <div>• Shard 1 (Cold HSM Swiss Vault): <strong className="text-emerald-600">HEALTHY</strong></div>
                  <div>• Shard 2 (AWS Nitro Enclave): <strong className="text-emerald-600">HEALTHY</strong></div>
                  <div>• Shard 3 (GCP Confidential Space): <strong className="text-emerald-600">HEALTHY</strong></div>
                  <div>• Shard 4 (Institutional Hardware Token): <strong className="text-emerald-600">HEALTHY</strong></div>
                  <div>• Shard 5 (Emergency Revoke Enclave): <strong className="text-blue-600">STANDBY</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Anti-Drain Security Firewall</span>
                  <Lock className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-600 text-[11px] font-sans">Every transaction passes autonomous velocity and abnormal destination inspection prior to signing.</p>
                <div className="p-2 rounded bg-white border border-slate-200 text-[10px] space-y-1">
                  <div>• Velocity Limit: <strong className="text-slate-800">$25M / hour max</strong></div>
                  <div>• New Address Quarantine: <strong className="text-slate-800">120-minute timelock</strong></div>
                  <div>• Biometric Re-Auth: <strong className="text-emerald-600">Enforced &gt; $500k</strong></div>
                  <div>• Drain Protection: <strong className="text-emerald-600">Autonomous Cutoff Active</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Session &amp; Identity Rails</span>
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-slate-600 text-[11px] font-sans">Hardware identity tokens bound to cryptographic public keys; zero password reliance, instant session revoking.</p>
                <div className="p-2 rounded bg-white border border-slate-200 text-[10px] space-y-1">
                  <div>• Active Operator Sessions: <strong className="text-slate-800">4 Verified</strong></div>
                  <div>• Session Expiry: <strong className="text-slate-800">45 minutes idle</strong></div>
                  <div>• FIDO2 / WebAuthn: <strong className="text-emerald-600">Hardware Level-3</strong></div>
                  <div>• Emergency Killswitch: <strong className="text-rose-600">Armed (Instant Freeze)</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12. LIQUIDITY FABRIC & CROSS-VENUE AGGREGATION */}
        {activeSurface === 'LIQUIDITY' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Liquidity Fabric &amp; Cross-Market Depth Matrix (Section 9 &amp; 16)</h3>
                <p className="text-xs text-slate-500 font-sans">Aggregated liquidity depth across centralized order books, automated market makers (AMMs), dark pools, and institutional crossing networks</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold text-xs">
                Total Available Depth: $1.84 Billion
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-400 text-[10px]">OMNIFIN Internal Dark Netting</div>
                <div className="text-lg font-black text-slate-900 mt-1">$450.2M</div>
                <div className="text-[10px] text-emerald-600 mt-1">Zero-Slippage Atomic Cross</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-400 text-[10px]">CME Globex Institutional Book</div>
                <div className="text-lg font-black text-slate-900 mt-1">$680.5M</div>
                <div className="text-[10px] text-blue-600 mt-1">Prime Brokerage Clearing</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-400 text-[10px]">Deribit Options/Perps Book</div>
                <div className="text-lg font-black text-slate-900 mt-1">$510.0M</div>
                <div className="text-[10px] text-purple-600 mt-1">Deep Volatility Convexity</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-400 text-[10px]">On-Chain Concentrated Pools</div>
                <div className="text-lg font-black text-slate-900 mt-1">$199.3M</div>
                <div className="text-[10px] text-amber-600 mt-1">Uniswap V4 Hooks + Curve ZK</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-300 font-bold">Dynamic Liquidity Protection Shield</span>
                <span className="text-emerald-400 text-[10px]">Spread Cushion Active</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                If market volatility exceeds 65% annualized, the liquidity engine expands quotes dynamically, activates synthetic internalization buffers, and routes flow to the lowest latency venue to prevent toxic order flow contamination.
              </p>
            </div>
          </div>
        )}

        {/* 13. MULTI-RAIL SETTLEMENT FABRIC */}
        {activeSurface === 'SETTLE' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Multi-Rail Real-Time Settlement Fabric (Section 19 &amp; 27)</h3>
                <p className="text-xs text-slate-500 font-sans">Instant Delivery-versus-Payment (DvP) and Payment-versus-Payment (PvP) across banking rails, clearing houses, and cryptographic blockchains</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                T+0 Continuous Settlement Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">FedNow &amp; Fedwire</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">LIVE</span>
                </div>
                <div className="text-slate-500 text-[11px]">US Federal Reserve Master Account RTGS with instant sub-second finality.</div>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600">Daily Cleared: $2.4B • 1.4s SLA</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">SEPA Instant (SCT)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">LIVE</span>
                </div>
                <div className="text-slate-500 text-[11px]">Pan-European real-time euro clearing for instantaneous cross-border settlement.</div>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600">Daily Cleared: €1.8B • 2.1s SLA</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">SWIFT ISO 20022</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">pacs.008/009</span>
                </div>
                <div className="text-slate-500 text-[11px]">End-to-end UETR cryptographic message generation and automated reconciliation.</div>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600">Corridors: 42 Global Banks</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Atomic Cryptographic ZK</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">ZERO TRUST</span>
                </div>
                <div className="text-slate-500 text-[11px]">Ethereum L1, Arbitrum, Solana, and Lightning HTLC atomic cross-chain bridges.</div>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600">Proof: Groth16 • 0.4s Finality</div>
              </div>
            </div>
          </div>
        )}

        {/* 14. RWA & TOKENIZED ASSETS */}
        {activeSurface === 'RWA' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 font-mono">Real-World Asset (RWA) Engine (Section 30)</h3>
                <p className="text-xs text-slate-500">Legal ownership and digital representation are maintained as distinct concepts. No assumption of tokenization creating automatic title.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-mono font-bold">
                Dual Custody Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900">Legal Title &amp; Off-Chain Custodian</div>
                <p className="text-slate-600">Physical deeds, warehouse receipts, and trade invoices held with verified institutional trustees (BNY Mellon, Zurich Vault SA, MAS).</p>
                <div className="text-[10px] text-emerald-600 font-bold">Audited Weekly via Independent Legal Counsel</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900">Digital Programmable Representation</div>
                <p className="text-slate-600">Fractional liquidity, automated collateralization, repo borrowing, and instant netting across the OMNIFIN clearing mesh.</p>
                <div className="text-[10px] text-blue-600 font-bold">Cryptographically Provenance-Hashed</div>
              </div>
            </div>
          </div>
        )}

        {/* 15. SOVEREIGN TREASURY & INSURANCE BUFFERS */}
        {activeSurface === 'TREASURY' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Sovereign Treasury Engine &amp; Dedicated Insurance Buffers (Section 23 &amp; 37)</h3>
                <p className="text-xs text-slate-500 font-sans">Automated yield sweeps, 100% 1-to-1 customer liability backing, dedicated insurance fund, and hot/cold reserve isolation</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                Solvency: 118.58% Over-Collateralized
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Autonomous Yield Sweeps</div>
                <div className="text-xl font-black text-slate-900 mt-1">5.12% APR</div>
                <div className="text-[10px] text-emerald-600 mt-1">Direct into US Treasury 3M T-Bills ($485M allocated)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Collateral Haircut Enclave</div>
                <div className="text-xl font-black text-slate-900 mt-1">142% Coverage</div>
                <div className="text-[10px] text-blue-600 mt-1">Dynamic adjustments under market volatility</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Dedicated Insurance Fund</div>
                <div className="text-xl font-black text-emerald-700 mt-1">$45.0M</div>
                <div className="text-[10px] text-emerald-600 mt-1">Zero socialized losses since protocol genesis</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-300 font-bold">Continuous Asset-Liability Matching (ALM)</span>
                <span className="text-emerald-400 text-[10px]">Invariant Verified</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Assets: $1.850B | Customer Liabilities: $1.560B | Surplus Capital: $290M. OMNIFIN guarantees that customer assets are never rehypothecated without explicit multi-signature consent.
              </p>
            </div>
          </div>
        )}

        {/* 16. IMMUNE SYSTEM, EMERGENCY CONTROLS & DISASTER RECOVERY */}
        {activeSurface === 'RECOVERY' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Protocol Immune System &amp; Emergency Controls (Section 21, 38 &amp; 41)</h3>
                <p className="text-xs text-slate-500 font-sans">Graduated circuit breakers, autonomous market pauses, state rollback protection, and deterministic disaster recovery</p>
              </div>
              <span className={`px-2.5 py-1 rounded font-bold text-xs ${
                emergencyMode === 'NORMAL' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                Mode: {emergencyMode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Level-1 Volatility Halt</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">5-Min Pause</span>
                </div>
                <p className="text-slate-600 text-[11px] font-sans">Triggers if an instrument moves &gt;7% in under 60 seconds without confirmed fundamental news flow.</p>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500">Auto-resumes after order book stabilization.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Level-2 Venue Isolation</span>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">Rail Quarantine</span>
                </div>
                <p className="text-slate-600 text-[11px] font-sans">If an external bridge or oracle feed displays divergent prices &gt;300 bps, its feed is instantly quarantined.</p>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500">Protects internal exchange from bad debt.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Level-3 State Recovery</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">Causal Replay</span>
                </div>
                <p className="text-slate-600 text-[11px] font-sans">Reconstructs exact order book and balance state from genesis sequence without loss of non-compromised trades.</p>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500">Deterministic cryptographic audit.</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-rose-400">Emergency Circuit Breaker Trigger Controls</div>
                <div className="text-[11px] text-slate-400">Requires 3-of-5 Governance Multisig or Autonomous Immune Detection</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEmergencyMode(emergencyMode === 'NORMAL' ? 'ELEVATED_RISK' : 'NORMAL')}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer transition"
                >
                  {emergencyMode === 'NORMAL' ? 'Elevate Risk Level' : 'Reset to Normal'}
                </button>
                <button
                  onClick={() => setEmergencyMode('NORMAL')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition border border-slate-700"
                >
                  Clear All Warnings
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
