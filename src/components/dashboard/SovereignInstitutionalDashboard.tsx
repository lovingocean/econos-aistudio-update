import React, { useState, useEffect, useMemo } from 'react';
import { AppLayer } from '../../types/econos';
import { 
  MASTER_100_LAYERS, 
  getLayerByNumber 
} from '../../data/master100LayersData';
import { 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Zap, 
  Lock, 
  Radio, 
  Clock, 
  Compass, 
  FileCheck2, 
  ArrowUpRight, 
  Server, 
  RotateCcw, 
  Sparkles, 
  Filter, 
  Play, 
  Pause, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Workflow,
  Cpu,
  Coins,
  DollarSign,
  Activity,
  Maximize2,
  Sliders,
  FileDown
} from 'lucide-react';
import { MacroScenarioStressSimulator } from './MacroScenarioStressSimulator';
import { SovereignInstitutionalExportModal } from './SovereignInstitutionalExportModal';
import { Q1SyntheticReservesModal } from './Q1SyntheticReservesModal';
import { Q3TaxCreditDrilldownModal } from './Q3TaxCreditDrilldownModal';

interface SovereignInstitutionalDashboardProps {
  onSelectLayer: (layer: AppLayer) => void;
}

interface QuadrantAuditItem {
  id: string;
  time: string;
  layerNum: number;
  layerName: string;
  action: string;
  hash: string;
  latencyMs: number;
  status: 'VERIFIED' | 'SETTLED' | 'SYNCED';
}

const INITIAL_QUADRANT_AUDIT: QuadrantAuditItem[] = [
  { id: 'q-1', time: '04:32:12', layerNum: 62, layerName: 'Continuous R&D Tax Credit §41', action: 'ASC 730 Contemporaneous Log Sealed', hash: '0x8f2a...c4b1', latencyMs: 0.72, status: 'VERIFIED' },
  { id: 'q-2', time: '04:32:09', layerNum: 42, layerName: 'Synthetic Balance Sheet', action: 'Off-Chain Collateral Ratio Adjusted 342%', hash: '0x3e1d...99fa', latencyMs: 0.94, status: 'SETTLED' },
  { id: 'q-3', time: '04:32:06', layerNum: 32, layerName: 'Post-Quantum Crystals-Kyber', action: 'NIST ML-KEM Enclave Key Rotation', hash: '0xaa45...71de', latencyMs: 0.65, status: 'VERIFIED' },
  { id: 'q-4', time: '04:32:03', layerNum: 19, layerName: 'FedNow Instant Liquidity', action: 'Atomic Reserve Sweep Cleared', hash: '0x1c8b...321a', latencyMs: 0.88, status: 'SETTLED' },
  { id: 'q-5', time: '04:32:00', layerNum: 20, layerName: 'Satellite Orbital Escrow', action: 'LEO Ephemeris Cryptographic Attestation', hash: '0x991f...45e2', latencyMs: 1.15, status: 'SYNCED' }
];

export const SovereignInstitutionalDashboard: React.FC<SovereignInstitutionalDashboardProps> = ({
  onSelectLayer
}) => {
  const [isLive, setIsLive] = useState(true);
  const [selectedConstellationTier, setSelectedConstellationTier] = useState<number | 'ALL'>('ALL');
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  // Pipeline Modals State
  const [showScenarioSimulator, setShowScenarioSimulator] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showQ1Drilldown, setShowQ1Drilldown] = useState(false);
  const [showQ3Drilldown, setShowQ3Drilldown] = useState(false);
  
  // Real-time fluctuating metrics
  const [totalAum, setTotalAum] = useState(128420500000); // $128.42B
  const [taxCapturedToday, setTaxCapturedToday] = useState(18640250); // $18.64M
  const [atomicSettlementSec, setAtomicSettlementSec] = useState(0.42);
  const [merkleHashRate, setMerkleHashRate] = useState(148200); // 148.2k ops/sec
  const [durabilityScore, setDurabilityScore] = useState(99.4);
  const [auditEvents, setAuditEvents] = useState<QuadrantAuditItem[]>(INITIAL_QUADRANT_AUDIT);
  const [constellationRotation, setConstellationRotation] = useState(0);

  // Synthetic Balance Sheet (Quadrant 1) breakdown
  const [syntheticReserves, setSyntheticReserves] = useState([
    { name: 'Overcollateralized Treasury T-Bills', value: '$54.2B', share: 42, yieldPct: '+5.18%', status: 'AAA' },
    { name: 'Gold-Backed Tokenized Tranches', value: '$32.6B', share: 25, yieldPct: '+11.4%', status: 'SOVEREIGN' },
    { name: 'Synthetic Sovereign Debt Swaps', value: '$24.8B', share: 19, yieldPct: '+6.42%', status: 'PRIME' },
    { name: 'Off-Chain Real-Asset Arbitrage (L42)', value: '$16.8B', share: 14, yieldPct: '+14.8%', status: 'HIGH-YIELD' },
  ]);

  // Live simulation tick
  useEffect(() => {
    if (!isLive) return;

    // Rotation ticker
    const rotInterval = setInterval(() => {
      setConstellationRotation(prev => (prev + 0.8) % 360);
    }, 50);

    // High-frequency telemetry tick
    const tickInterval = setInterval(() => {
      // Incremental tax credit accumulation ($15-$45 every 2 seconds)
      const taxInc = Math.floor(18 + Math.random() * 32);
      setTaxCapturedToday(prev => prev + taxInc);

      // Jitter on hash rate & settlement speed
      setMerkleHashRate(prev => Math.floor(147000 + Math.random() * 3500));
      setAtomicSettlementSec(+(0.40 + Math.random() * 0.05).toFixed(2));

      // Append live audit event occasionally
      if (Math.random() > 0.4) {
        const pool = [
          { lNum: 62, name: 'Continuous R&D Tax Credit §41', act: 'Contemporaneous Payroll Credit Swept' },
          { lNum: 42, name: 'Synthetic Balance Sheet', act: 'Synthetic Capital Hedge Adjusted' },
          { lNum: 1, name: 'Enterprise Business Core', act: 'Consensus General Ledger Sync' },
          { lNum: 19, name: 'FedNow Instant Liquidity', act: 'Zero-Lag Settlement Transit Confirmed' },
          { lNum: 32, name: 'Post-Quantum Crystals-Kyber', act: 'ML-KEM Keypair Re-verified' },
          { lNum: 100, name: 'Kardashev Omega Continuous', act: 'Civilizational State Hash Broadcast' }
        ];
        const chosen = pool[Math.floor(Math.random() * pool.length)];
        const newEv: QuadrantAuditItem = {
          id: `q-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          layerNum: chosen.lNum,
          layerName: chosen.name,
          action: chosen.act,
          hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
          latencyMs: +(0.6 + Math.random() * 0.6).toFixed(2),
          status: Math.random() > 0.3 ? 'VERIFIED' : 'SETTLED'
        };
        setAuditEvents(curr => [newEv, ...curr.slice(0, 7)]);
      }
    }, 2000);

    return () => {
      clearInterval(rotInterval);
      clearInterval(tickInterval);
    };
  }, [isLive]);

  // Constellation 9 Tiers coordinates generator
  const constellationTiers = useMemo(() => {
    return [
      { tier: 1, name: 'Core OS', range: 'L1–5', angle: 0, r: 40, color: '#10b981', layers: [1, 2, 3, 4, 5] },
      { tier: 2, name: 'Strategic', range: 'L6–10', angle: 40, r: 65, color: '#6366f1', layers: [6, 7, 8, 9, 10] },
      { tier: 3, name: 'Sovereign Rails', range: 'L11–19', angle: 80, r: 90, color: '#f59e0b', layers: [11, 14, 19] },
      { tier: 4, name: 'Planetary Grid', range: 'L20–26', angle: 120, r: 110, color: '#14b8a6', layers: [20, 22, 26] },
      { tier: 5, name: 'Frontier', range: 'L27–31', angle: 160, r: 125, color: '#f43f5e', layers: [27, 29, 31] },
      { tier: 6, name: 'Omni Singularity', range: 'L32–41', angle: 200, r: 140, color: '#8b5cf6', layers: [32, 35, 41] },
      { tier: 7, name: 'Synthetics', range: 'L42–61', angle: 240, r: 155, color: '#38bdf8', layers: [42, 45, 52, 61] },
      { tier: 8, name: 'Tax & PE Audit', range: 'L62–75', angle: 280, r: 168, color: '#fbbf24', layers: [62, 65, 70, 75] },
      { tier: 9, name: 'Continuity', range: 'L76–100', angle: 320, r: 180, color: '#ec4899', layers: [76, 85, 92, 100] },
    ];
  }, []);

  return (
    <div 
      id="sovereign-institutional-dashboard-c"
      className="bg-[#050811] text-slate-100 rounded-3xl border border-slate-800/90 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-5 sm:p-6 space-y-6 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

      {/* TOP INSTITUTIONAL COMMAND HEADER RIBBON */}
      <div className="relative border-b border-slate-800/80 pb-5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Brand & Multi-Currency Treasury KPI */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/50 flex items-center justify-center text-amber-300 font-mono font-black text-xl shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              Ω
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                  <span>ECONOS SOVEREIGN COMMAND</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 font-bold tracking-widest uppercase">
                    100-LAYER INSTITUTIONAL ARCHITECTURE
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-3 flex-wrap">
                <span>Autonomous Planetary Sovereign OS</span>
                <span className="text-slate-700">•</span>
                <span className="text-emerald-400 font-semibold">100/100 Layers Active</span>
                <span className="text-slate-700">•</span>
                <span>Zero-Counterparty Risk Consensus</span>
              </p>
            </div>
          </div>

          {/* Institutional Metric Pills */}
          <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap font-mono text-xs">
            {/* Metric 1: Total Liquid Reserves AUM */}
            <div className="px-3.5 py-2 rounded-2xl bg-[#0a101d] border border-slate-800 flex items-center gap-2.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Total AUM Reserves</div>
                <div className="text-sm sm:text-base font-bold text-amber-300">
                  ${(totalAum / 1000000000).toFixed(2)}B
                </div>
              </div>
            </div>

            {/* Metric 2: Atomic Settlement Velocity */}
            <div className="px-3.5 py-2 rounded-2xl bg-[#0a101d] border border-slate-800 flex items-center gap-2.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Atomic Settlement</div>
                <div className="text-sm sm:text-base font-bold text-cyan-400">
                  {atomicSettlementSec}s <span className="text-[10px] font-normal text-slate-400">zero-lag</span>
                </div>
              </div>
            </div>

            {/* Metric 3: Cluster SLA */}
            <div className="px-3.5 py-2 rounded-2xl bg-[#0a101d] border border-slate-800 flex items-center gap-2.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Sovereign SLA</div>
                <div className="text-sm sm:text-base font-bold text-emerald-400">
                  99.999%
                </div>
              </div>
            </div>

            {/* Ticker Stream Pause / Live Toggle */}
            <button
              onClick={() => setIsLive(!isLive)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                isLive 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700' 
                  : 'bg-amber-950 hover:bg-amber-900 text-amber-300 border-amber-500/40'
              }`}
              title={isLive ? 'Pause live institutional stream' : 'Resume live stream'}
            >
              {isLive ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4 DEDICATED MISSION QUADRANTS (CONCEPT C ARCHITECTURE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ==================================================================== */}
        {/* QUADRANT 1: MULTI-ASSET SYNTHETIC RESERVES (LAYER 42 SYNTHETICS) */}
        {/* ==================================================================== */}
        <div className="bg-[#090e1c] rounded-2xl border border-slate-800/90 p-5 space-y-4 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Q1: MULTI-ASSET SYNTHETIC RESERVES</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono">
                    LAYER 42
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  Continuous Off-Chain Balance Sheet Collateralization (342% Overcollateralized)
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectLayer('LAYER_42_SYNTHETIC_BALANCE_SHEET')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-slate-700 text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer"
            >
              <span>Inspect L42</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Synthetic Asset Tranches List */}
          <div className="space-y-2.5 font-mono">
            {syntheticReserves.map((asset, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:bg-slate-850/80 transition">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <span>{asset.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {asset.status}
                    </span>
                  </div>
                  <div className="w-44 sm:w-56 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-sky-400 h-full rounded-full" 
                      style={{ width: `${asset.share}%` }} 
                    />
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-white">{asset.value}</div>
                  <div className="text-[10px] text-emerald-400 font-bold">{asset.yieldPct} APR</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-xs font-mono">
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Reserve Ratio</span>
              <span className="text-cyan-400 font-bold text-sm">342.4%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Duration Hedge</span>
              <span className="text-emerald-400 font-bold text-sm">0.14 yr</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Weighted Yield</span>
              <span className="text-amber-300 font-bold text-sm">7.62%</span>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* QUADRANT 2: PLANETARY CONSTELLATION TOPOLOGY (ALL 9 TIERS) */}
        {/* ==================================================================== */}
        <div className="bg-[#090e1c] rounded-2xl border border-slate-800/90 p-5 space-y-4 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Q2: PLANETARY LAYER CONSTELLATION</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-mono">
                    9 TIERS • 100 LAYERS
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  Real-time cross-tier routing vectors &amp; autonomous consensus state
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedConstellationTier('ALL')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition cursor-pointer ${
                  selectedConstellationTier === 'ALL'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Reset
              </button>
            </div>
          </div>

          {/* SVG Constellation Stage */}
          <div className="relative flex flex-col items-center justify-center py-1">
            <svg viewBox="0 0 400 240" className="w-full h-56 select-none overflow-visible">
              <defs>
                <radialGradient id="constCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#060a12" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Glow */}
              <circle cx="200" cy="120" r="105" fill="url(#constCenterGlow)" />

              {/* Orbital Rings */}
              <ellipse cx="200" cy="120" rx="60" ry="32" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <ellipse cx="200" cy="120" rx="110" ry="60" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <ellipse cx="200" cy="120" rx="160" ry="90" fill="none" stroke="#1e293b" strokeWidth="1.25" />

              {/* Center Sovereign Kernel Node */}
              <circle cx="200" cy="120" r="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="200" cy="120" r="5" fill="#f59e0b" className="animate-pulse" />
              <text x="200" y="142" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">
                ECONOS KERNEL
              </text>

              {/* 9 Tier Orbital Constellation Nodes */}
              {constellationTiers.map((t, i) => {
                // Apply subtle live rotation to angle
                const currentAngleRad = ((t.angle + constellationRotation) * Math.PI) / 180;
                // Oval projection
                const rx = i < 3 ? 60 : i < 6 ? 110 : 160;
                const ry = i < 3 ? 32 : i < 6 ? 60 : 90;
                const x = 200 + Math.cos(currentAngleRad) * rx;
                const y = 120 + Math.sin(currentAngleRad) * ry;
                const isSelected = selectedConstellationTier === t.tier;
                const isHovered = hoveredNode === t.tier;

                return (
                  <g 
                    key={t.tier} 
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredNode(t.tier)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedConstellationTier(selectedConstellationTier === t.tier ? 'ALL' : t.tier)}
                  >
                    {/* Vector line to center */}
                    <line 
                      x1="200" 
                      y1="120" 
                      x2={x} 
                      y2={y} 
                      stroke={t.color} 
                      strokeWidth={isSelected || isHovered ? "1.5" : "0.75"} 
                      strokeOpacity={isSelected || isHovered ? "0.85" : "0.2"} 
                    />

                    {/* Node Halo */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={isSelected ? 10 : isHovered ? 8 : 5} 
                      fill={t.color} 
                      fillOpacity={isSelected ? "0.4" : "0.2"} 
                    />

                    {/* Core node */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={isSelected ? 5 : 3.5} 
                      fill={t.color} 
                      stroke="#050811" 
                      strokeWidth="1.5" 
                    />

                    {/* Node Label */}
                    <text 
                      x={x + (x > 200 ? 6 : -6)} 
                      y={y + (y > 120 ? 8 : -4)} 
                      textAnchor={x > 200 ? "start" : "end"} 
                      fill={isSelected ? "#fbbf24" : isHovered ? "#ffffff" : "#94a3b8"} 
                      fontSize="8" 
                      fontFamily="monospace" 
                      fontWeight="bold"
                    >
                      T{t.tier} ({t.range})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Tier Shortcuts Bar */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Constellation Focus: <strong className="text-amber-300">{selectedConstellationTier === 'ALL' ? 'All 100 System Layers' : `Tier ${selectedConstellationTier} Isolated`}</strong></span>
            <span className="text-slate-500">Live Orbit Speed: 0.8°/tick</span>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* QUADRANT 3: REAL-TIME CONTINUOUS §41 ASC TAX CREDIT ENGINE */}
        {/* ==================================================================== */}
        <div className="bg-[#090e1c] rounded-2xl border border-slate-800/90 p-5 space-y-4 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Q3: CONTINUOUS §41 ASC TAX CAPTURE</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-mono">
                    LAYER 62
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  Automated IRS 4-Part Test Verification &amp; Real-Time Contemporaneous Ledger
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectLayer('LAYER_62_RD_TAX_CREDIT')}
              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold transition flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <span>Open Layer 62</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Real-time Ticker Value */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30">
            <div className="text-xs font-mono text-amber-300 uppercase font-semibold">
              R&amp;D Tax Credits Captured (2026 Fiscal Cycle)
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                ${(taxCapturedToday / 1000000).toFixed(4)}M
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold animate-pulse">
                +42.8/sec
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-3">
              <span>Durability Score: <strong className="text-emerald-400">{durabilityScore}%</strong></span>
              <span>•</span>
              <span>IRS Form 6765 Ready: <strong className="text-slate-200">100%</strong></span>
            </div>
          </div>

          {/* 4-Part Statutory Audit Gate */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Section 174</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> PASS
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Tech Uncertainty</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> PASS
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Process of Exper.</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> PASS
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Hard Science Basis</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> PASS
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* QUADRANT 4: AUTONOMOUS CRYPTOGRAPHIC MERKLE EXECUTION ENGINE */}
        {/* ==================================================================== */}
        <div className="bg-[#090e1c] rounded-2xl border border-slate-800/90 p-5 space-y-4 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Workflow className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Q4: MERKLE EXECUTION &amp; AUDIT ENGINE</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-mono">
                    LIVE STREAM
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  High-Throughput Cryptographic Consensus &amp; Circuit Breakers
                </div>
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-xs font-bold text-emerald-400">{(merkleHashRate / 1000).toFixed(1)}k ops/s</div>
              <div className="text-[10px] text-slate-500">Zero Circuit Faults</div>
            </div>
          </div>

          {/* Micro-Audit Live Stream */}
          <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            {auditEvents.map(ev => (
              <div key={ev.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-850 flex items-center justify-between transition">
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="font-bold text-amber-400">L{ev.layerNum}</span>
                    <span className="text-slate-200 font-medium truncate">{ev.layerName}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {ev.hash}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {ev.action}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    {ev.status}
                  </span>
                  <span className="block text-[10px] text-sky-400 mt-0.5">{ev.latencyMs}ms</span>
                </div>
              </div>
            ))}
          </div>

          {/* Cryptographic Proof Verification Strip */}
          <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>NIST Post-Quantum Cryptographic Proof Sealed</span>
            </span>
            <span className="text-amber-300 font-bold">100% Deterministic</span>
          </div>
        </div>

      </div>

      {/* QUICK WORKSPACE LAUNCHER STRIP FOR ALL 100 LAYERS */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Quick Launch Core Layer Workspaces:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onSelectLayer('BUSINESS')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-400 transition cursor-pointer"
          >
            L1: Business Core
          </button>
          <button
            onClick={() => onSelectLayer('WEALTH')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-400 transition cursor-pointer"
          >
            L2: Wealth Architecture
          </button>
          <button
            onClick={() => onSelectLayer('TRUST')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-400 transition cursor-pointer"
          >
            L3: Asset Protection Trust
          </button>
          <button
            onClick={() => onSelectLayer('LAYER_42_SYNTHETIC_BALANCE_SHEET')}
            className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 transition cursor-pointer"
          >
            L42: Synthetics
          </button>
          <button
            onClick={() => onSelectLayer('LAYER_62_RD_TAX_CREDIT')}
            className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-500/40 transition cursor-pointer"
          >
            L62: §41 ASC Tax
          </button>
          <button
            onClick={() => onSelectLayer('EXTENDED_LAYERS_WORKSPACE')}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold shadow-xs transition cursor-pointer"
          >
            View All 100 Layers →
          </button>
        </div>
      </div>
    </div>
  );
};
