import React, { useState, useEffect } from 'react';
import {
  Building2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  TrendingUp,
  BarChart3,
  Sliders,
  Play,
  Pause,
  RefreshCw,
  FileCheck2,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  PieChart,
  Activity,
  Compass,
  ArrowLeftRight,
  Database,
  ExternalLink,
  ChevronRight,
  Award
} from 'lucide-react';
import { MarketInstrument } from '../../types/omnifinExchange';

interface EnterprisePrimeDeskProps {
  instruments?: MarketInstrument[];
  onStartAlgoOrder?: (algoType: string, asset: string, totalAmount: number, details: any) => void;
}

export const EnterprisePrimeDesk: React.FC<EnterprisePrimeDeskProps> = ({
  instruments = [],
  onStartAlgoOrder
}) => {
  const [activePrimeTab, setActivePrimeTab] = useState<'ALGO_SUITE' | 'SUB_ACCOUNTS' | 'PORTFOLIO_VAR' | 'BEST_EXECUTION'>('ALGO_SUITE');

  // Algo Execution State
  const [selectedAlgo, setSelectedAlgo] = useState<'TWAP' | 'VWAP' | 'ICEBERG' | 'POV' | 'IMPLEMENTATION_SHORTFALL'>('TWAP');
  const [algoAsset, setAlgoAsset] = useState<string>('BTC-PERP');
  const [algoTotalSize, setAlgoTotalSize] = useState<number>(25.0);
  const [algoDurationMinutes, setAlgoDurationMinutes] = useState<number>(60);
  const [algoSlices, setAlgoSlices] = useState<number>(12);
  const [icebergDisplaySize, setIcebergDisplaySize] = useState<number>(1.5);
  const [povTargetPct, setPovTargetPct] = useState<number>(8.5);

  // Simulated Running Algo Execution
  const [isAlgoRunning, setIsAlgoRunning] = useState<boolean>(true);
  const [filledSlices, setFilledSlices] = useState<number>(4);
  const [filledVolume, setFilledVolume] = useState<number>(8.33);
  const [avgFillPrice, setAvgFillPrice] = useState<number>(84128.5);
  const [arrivalPrice, setArrivalPrice] = useState<number>(84115.0);
  const [slippageBps, setSlippageBps] = useState<number>(1.6);

  // Sub-accounts State
  const [subAccounts, setSubAccounts] = useState([
    {
      id: 'DESK-01',
      name: 'High-Frequency Market Making Enclave',
      allocatedUsd: 45000000,
      availableMarginUsd: 38200000,
      activePositions: 8,
      maxLeverage: '15x',
      dailyPnlUsd: 342500,
      dailyPnlPct: 0.76,
      status: 'ACTIVE_TRADING',
      approvedAssets: ['BTC', 'ETH', 'SOL', 'USDT']
    },
    {
      id: 'DESK-02',
      name: 'Systematic Quantitative Alpha Fund',
      allocatedUsd: 32500000,
      availableMarginUsd: 26800000,
      activePositions: 14,
      maxLeverage: '5x',
      dailyPnlUsd: 580000,
      dailyPnlPct: 1.78,
      status: 'ACTIVE_TRADING',
      approvedAssets: ['ALL_DIGITAL_ASSETS']
    },
    {
      id: 'DESK-03',
      name: 'Tokenized RWAs & US T-Bills Treasury Rail',
      allocatedUsd: 125000000,
      availableMarginUsd: 125000000,
      activePositions: 3,
      maxLeverage: '1x (Fully Collateralized)',
      dailyPnlUsd: 17530,
      dailyPnlPct: 0.014,
      status: 'YIELD_ACCRUING',
      approvedAssets: ['UST-3M-SPOT', 'XAU-RWA', 'USD-O']
    },
    {
      id: 'DESK-04',
      name: 'Prime Segregated Custody Vault (BNY Mellon)',
      allocatedUsd: 88000000,
      availableMarginUsd: 88000000,
      activePositions: 0,
      maxLeverage: '1x',
      dailyPnlUsd: 0,
      dailyPnlPct: 0.0,
      status: 'AIR_GAPPED_SAFE',
      approvedAssets: ['COLD_CUSTODY_ONLY']
    }
  ]);

  // Simulate algo ticking
  useEffect(() => {
    if (!isAlgoRunning) return;
    const interval = setInterval(() => {
      setFilledSlices(prev => {
        if (prev >= algoSlices) return prev;
        const next = prev + 1;
        setFilledVolume(Number(((algoTotalSize / algoSlices) * next).toFixed(2)));
        setAvgFillPrice(p => p + (Math.random() - 0.48) * 8);
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAlgoRunning, algoSlices, algoTotalSize]);

  const handleLaunchAlgo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAlgoRunning(true);
    setFilledSlices(1);
    setFilledVolume(Number((algoTotalSize / algoSlices).toFixed(2)));
    setArrivalPrice(84115.0);
    setAvgFillPrice(84115.0);
    if (onStartAlgoOrder) {
      onStartAlgoOrder(selectedAlgo, algoAsset, algoTotalSize, {
        duration: algoDurationMinutes,
        slices: algoSlices,
        displaySize: icebergDisplaySize,
        povTargetPct
      });
    }
  };

  const totalEnterpriseAumUsd = subAccounts.reduce((sum, d) => sum + d.allocatedUsd, 0);

  return (
    <div className="bg-[#0b1322] border border-slate-800 rounded-3xl p-6 text-white font-mono text-xs shadow-2xl space-y-6">
      
      {/* 1. Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg">
            <Building2 className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Enterprise Prime Brokerage Desk
              </h2>
              <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                Institutional Core Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Algorithmic execution (TWAP/VWAP/Iceberg), multi-tenant sub-account allocations, and Basel III real-time portfolio VaR.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto font-mono text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <div className="text-[10px] text-slate-400 uppercase">Master Entity AUM</div>
            <div className="font-black text-sm text-cyan-300">${(totalEnterpriseAumUsd / 1000000).toFixed(1)}M USD</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <div className="text-[10px] text-slate-400 uppercase">LEI Identifier</div>
            <div className="font-bold text-slate-300 text-[11px]">5493006M3O784019</div>
          </div>
        </div>
      </div>

      {/* 2. Prime Surface Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {[
          { id: 'ALGO_SUITE', label: '1. Algorithmic Execution Suite (TWAP / Iceberg)', icon: Cpu },
          { id: 'SUB_ACCOUNTS', label: '2. Multi-Tenant Desk & Sub-Account AUM', icon: Layers },
          { id: 'PORTFOLIO_VAR', label: '3. Real-Time Portfolio VaR & Tail Risk', icon: Activity },
          { id: 'BEST_EXECUTION', label: '4. MiCA & Best Execution Audit (RTS 28)', icon: Award }
        ].map(t => {
          const Icon = t.icon;
          const isSelected = activePrimeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActivePrimeTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB 1: ALGORITHMIC EXECUTION SUITE */}
      {activePrimeTab === 'ALGO_SUITE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Algo Configuration Console */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Configure Institutional Order Algo</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Zero Front-Running
              </span>
            </div>

            {/* Select Algo Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-bold">Execution Algorithm:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'TWAP', name: 'TWAP', desc: 'Time-Weighted' },
                  { id: 'VWAP', name: 'VWAP', desc: 'Volume-Weighted' },
                  { id: 'ICEBERG', name: 'Iceberg', desc: 'Hidden Depth' },
                  { id: 'POV', name: 'POV', desc: '% of Market Vol' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedAlgo(item.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      selectedAlgo === item.id
                        ? 'bg-blue-600/30 border-blue-500 text-cyan-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleLaunchAlgo} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold">Target Instrument:</label>
                  <select
                    value={algoAsset}
                    onChange={(e) => setAlgoAsset(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-hidden focus:border-cyan-400"
                  >
                    <option value="BTC-PERP">BTC-PERP (Perpetual)</option>
                    <option value="ETH-PERP">ETH-PERP (Perpetual)</option>
                    <option value="SOL-PERP">SOL-PERP (Perpetual)</option>
                    <option value="UST-3M-SPOT">UST-3M-SPOT (T-Bill RWA)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold">Total Block Size:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={algoTotalSize}
                    onChange={(e) => setAlgoTotalSize(parseFloat(e.target.value) || 1)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-hidden focus:border-cyan-400"
                  />
                </div>
              </div>

              {selectedAlgo === 'TWAP' && (
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Duration (Minutes):</label>
                    <input
                      type="number"
                      value={algoDurationMinutes}
                      onChange={(e) => setAlgoDurationMinutes(parseInt(e.target.value) || 10)}
                      className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Slice Intervals:</label>
                    <input
                      type="number"
                      value={algoSlices}
                      onChange={(e) => setAlgoSlices(parseInt(e.target.value) || 4)}
                      className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>
              )}

              {selectedAlgo === 'ICEBERG' && (
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Visible Display Size:</span>
                    <span className="text-cyan-300 font-bold">{icebergDisplaySize} contracts</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.5"
                    value={icebergDisplaySize}
                    onChange={(e) => setIcebergDisplaySize(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="text-[10px] text-slate-500">
                    Remaining {(algoTotalSize - icebergDisplaySize).toFixed(1)} size kept completely hidden from exchange public depth.
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch {selectedAlgo} Execution Engine</span>
              </button>
            </form>
          </div>

          {/* Right Column: Live Algo Execution Telemetry */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-white text-xs">
                  Active Execution: {selectedAlgo} on {algoAsset}
                </h3>
              </div>
              <button
                onClick={() => setIsAlgoRunning(!isAlgoRunning)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
              >
                {isAlgoRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isAlgoRunning ? 'Pause Engine' : 'Resume Engine'}</span>
              </button>
            </div>

            {/* Execution Progress Bar */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Order Fill Completion:</span>
                <span className="text-cyan-300 font-black">
                  {((filledVolume / algoTotalSize) * 100).toFixed(1)}% ({filledVolume} / {algoTotalSize} {algoAsset.split('-')[0]})
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (filledVolume / algoTotalSize) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Slice {filledSlices} of {algoSlices} filled</span>
                <span>Anti-MEV Randomization Active (±140ms jitter)</span>
              </div>
            </div>

            {/* Benchmark Quality Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Arrival Price</div>
                <div className="font-black text-white text-xs mt-1">${arrivalPrice.toLocaleString(undefined, { minimumFractionDigits: 1 })}</div>
                <div className="text-[10px] text-slate-500">Pre-trade benchmark</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Avg Execution Price</div>
                <div className="font-black text-cyan-300 text-xs mt-1">${avgFillPrice.toLocaleString(undefined, { minimumFractionDigits: 1 })}</div>
                <div className="text-[10px] text-emerald-400">VWAP Beat: +0.4 bps</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Realized Slippage</div>
                <div className="font-black text-emerald-400 text-xs mt-1">+{slippageBps} bps</div>
                <div className="text-[10px] text-slate-500">Below 5 bps cap</div>
              </div>
            </div>

            {/* Execution Slice Log */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Recent Completed Child Orders:</div>
              <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
                {[
                  { slice: 4, size: '2.08 BTC', price: 84131.2, venue: 'OMNIFIN Internal Netting (Zero Fee)', time: 'Just now' },
                  { slice: 3, size: '2.08 BTC', price: 84127.8, venue: 'CME Globex Basis Cross', time: '4m ago' },
                  { slice: 2, size: '2.08 BTC', price: 84124.0, venue: 'Binance Prime Custodial Rail', time: '8m ago' },
                  { slice: 1, size: '2.08 BTC', price: 84115.0, venue: 'Internal Liquidity Pool', time: '12m ago' }
                ].slice(0, filledSlices).map(item => (
                  <div key={item.slice} className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-300">Slice #{item.slice}</span>
                      <span className="text-white font-bold">{item.size}</span>
                      <span className="text-slate-400">@ ${item.price.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{item.venue}</span>
                      <span className="text-slate-400 font-mono">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. TAB 2: MULTI-TENANT SUB-ACCOUNTS & DESK AUM */}
      {activePrimeTab === 'SUB_ACCOUNTS' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <h3 className="font-bold text-white text-sm">Enterprise Multi-Tenant Desk Hierarchy</h3>
              <p className="text-[11px] text-slate-400 font-sans">
                Isolate risk, segregate collateral pools, and enforce strict role-based spending caps across trading groups.
              </p>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-md">
              <Building2 className="w-3.5 h-3.5" />
              <span>+ Provision New Sub-Account</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subAccounts.map(desk => (
              <div key={desk.id} className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                        {desk.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        desk.status === 'ACTIVE_TRADING' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        desk.status === 'YIELD_ACCRUING' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {desk.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="font-black text-sm text-white mt-1">{desk.name}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px]">
                  <div>
                    <div className="text-[10px] text-slate-500">Allocated AUM</div>
                    <div className="font-bold text-white mt-0.5">${(desk.allocatedUsd / 1000000).toFixed(1)}M</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Max Leverage</div>
                    <div className="font-bold text-cyan-300 mt-0.5">{desk.maxLeverage}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">24h Desk PnL</div>
                    <div className={`font-bold mt-0.5 ${desk.dailyPnlUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {desk.dailyPnlUsd >= 0 ? '+' : ''}${(desk.dailyPnlUsd / 1000).toFixed(1)}k ({desk.dailyPnlPct}%)
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <div className="text-slate-400">
                    Approved Rails: <strong className="text-slate-200">{desk.approvedAssets.join(', ')}</strong>
                  </div>
                  <button className="text-cyan-400 hover:text-cyan-300 font-bold transition flex items-center gap-1 cursor-pointer">
                    <span>Manage Risk Limits</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 3: REAL-TIME PORTFOLIO VAR & TAIL RISK */}
      {activePrimeTab === 'PORTFOLIO_VAR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-bold text-white text-sm">Value-at-Risk (VaR) &amp; Expected Shortfall</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">1-Day VaR (95%)</div>
                <div className="font-black text-amber-400 text-sm">-$1,840,000</div>
                <div className="text-[10px] text-slate-500">0.72% of Total Capital</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">1-Day VaR (99%)</div>
                <div className="font-black text-rose-400 text-sm">-$2,620,000</div>
                <div className="text-[10px] text-slate-500">1.03% of Total Capital</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">Expected Shortfall (CVaR)</div>
                <div className="font-black text-rose-500 text-sm">-$3,410,000</div>
                <div className="text-[10px] text-slate-500">Tail Risk beyond 99%</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white">Component Risk Breakdown by Asset Class:</div>
              <div className="space-y-2">
                {[
                  { name: 'Bitcoin Systematic Delta (BTC-PERP)', pct: 42.1, color: 'bg-amber-500' },
                  { name: 'Ethereum Smart Contract Exposure (ETH-PERP)', pct: 28.4, color: 'bg-blue-500' },
                  { name: 'High-Beta Altcoins (SOL, AVAX, SUI)', pct: 18.2, color: 'bg-cyan-400' },
                  { name: 'Treasury T-Bills & Physical Gold RWAs (Yield Rail)', pct: 11.3, color: 'bg-emerald-500' }
                ].map(item => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="font-bold text-white">{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-bold text-white text-sm">Historical Stress Simulation Matrix</h3>
            
            <div className="space-y-2.5">
              {[
                { name: 'March 2020 Liquidity Freeze (-38% Flash Crash)', impactUsd: '-$14.2M', marginSurv: '100% Solvency', buffer: '3.8σ buffer' },
                { name: 'FTX-Style Counterparty Bankruptcy Shock', impactUsd: '$0.00 (Segregated BNY Vaults)', marginSurv: 'Zero Haircut', buffer: '100% Backed' },
                { name: 'US Treasury Yield Spike (+150 bps Overnight)', impactUsd: '+$1.4M (Floating Basis Benefit)', marginSurv: 'Net Positive', buffer: 'Safe' }
              ].map((sim, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200 text-xs">{sim.name}</div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Simulated Balance Sheet Impact:</span>
                    <span className="font-bold text-cyan-300">{sim.impactUsd}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{sim.marginSurv}</span>
                    <span className="text-emerald-400">{sim.buffer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 6. TAB 4: MICA & BEST EXECUTION AUDIT (RTS 28) */}
      {activePrimeTab === 'BEST_EXECUTION' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Regulatory Best Execution Transparency (MiCA &amp; RTS 28 Compliant)</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-sans">
                Continuous cryptographic audit verifying orders filled at or superior to the Global Consolidated Tape NBBO.
              </p>
            </div>

            <button
              onClick={() => alert('Best Execution Audit Package (RTS 28) successfully exported. SHA-256 Merkle root verified.')}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Compliance Audit Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Best Execution Score</div>
              <div className="font-black text-emerald-400 text-sm mt-1">99.84%</div>
              <div className="text-[10px] text-slate-500">Filled at or inside NBBO</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Average Effective Spread</div>
              <div className="font-black text-cyan-300 text-sm mt-1">0.42 bps</div>
              <div className="text-[10px] text-slate-500">vs 1.8 bps retail benchmark</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Price Improvement Savings</div>
              <div className="font-black text-white text-sm mt-1">$184,200 USD</div>
              <div className="text-[10px] text-emerald-400">Captured over last 30 days</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Proof State Root</div>
              <div className="font-bold text-slate-300 text-[10px] mt-1 font-mono">0x7f48...28b9</div>
              <div className="text-[10px] text-emerald-400">Anchored to Ethereum L1</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
