import React, { useState } from 'react';
import { 
  X, 
  Coins, 
  RefreshCw, 
  Sliders, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { AppLayer } from '../../types/econos';

interface Q1DrilldownProps {
  onClose: () => void;
  onSelectLayer: (layer: AppLayer) => void;
}

export const Q1SyntheticReservesModal: React.FC<Q1DrilldownProps> = ({
  onClose,
  onSelectLayer
}) => {
  const [tranches, setTranches] = useState([
    { id: 't1', name: 'Overcollateralized Treasury T-Bills (3-6m)', capital: 54.2, ratio: 42, targetRatio: 40, yield: 5.18, rating: 'AAA', status: 'LOCKED' },
    { id: 't2', name: 'Gold-Backed Tokenized Tranches (Layer 24)', capital: 32.6, ratio: 25, targetRatio: 25, yield: 11.40, rating: 'SOVEREIGN', status: 'ACTIVE' },
    { id: 't3', name: 'Synthetic Sovereign Debt Swaps (Layer 42)', capital: 24.8, ratio: 19, targetRatio: 20, yield: 6.42, rating: 'PRIME', status: 'HEDGED' },
    { id: 't4', name: 'Off-Chain Real-Asset Arbitrage (L42)', capital: 16.8, ratio: 14, targetRatio: 15, yield: 14.80, rating: 'HIGH-YIELD', status: 'REBALANCING' }
  ]);

  const [isRebalancing, setIsRebalancing] = useState(false);
  const [rebalancedNotice, setRebalancedNotice] = useState(false);

  const handleSimulateRebalance = () => {
    setIsRebalancing(true);
    setTimeout(() => {
      setTranches(prev => prev.map(t => ({
        ...t,
        ratio: t.targetRatio,
        capital: +(128.42 * (t.targetRatio / 100)).toFixed(1)
      })));
      setIsRebalancing(false);
      setRebalancedNotice(true);
      setTimeout(() => setRebalancedNotice(false), 3000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#070c17] border border-cyan-500/40 rounded-3xl w-full max-w-4xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                <span>Q1 Deep Inspection: Synthetic Balance Sheet &amp; Collateral Engine</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  LAYER 42
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">Continuous Multi-Asset Reserves Allocation &amp; Sovereign Yield Sweeps</p>
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
          {/* Key Metrics Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Total Synthetic Capital</span>
              <span className="text-lg font-bold text-white mt-0.5 block">$128.42B</span>
              <span className="text-[9px] text-emerald-400">Zero-counterparty debt</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Collateralization Ratio</span>
              <span className="text-lg font-bold text-cyan-300 mt-0.5 block">342.4%</span>
              <span className="text-[9px] text-slate-500">Regulatory Min: 250%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Weighted Yield</span>
              <span className="text-lg font-bold text-amber-300 mt-0.5 block">+7.62% APR</span>
              <span className="text-[9px] text-slate-500">Autonomous compounding</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Duration Exposure</span>
              <span className="text-lg font-bold text-emerald-400 mt-0.5 block">0.14 yr</span>
              <span className="text-[9px] text-slate-500">Ultra-short hedge</span>
            </div>
          </div>

          {/* Tranches Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <span>Active Tranche Portfolio</span>
                {rebalancedNotice && (
                  <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-semibold animate-fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Rebalanced to Target Allocations!
                  </span>
                )}
              </h4>

              <button
                onClick={handleSimulateRebalance}
                disabled={isRebalancing}
                className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRebalancing ? 'animate-spin' : ''}`} />
                <span>{isRebalancing ? 'Rebalancing Algorithmic Ratios...' : 'Auto-Rebalance to Targets'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {tranches.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition">
                  <div className="space-y-1 sm:max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{t.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                        {t.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Allocation: <strong className="text-slate-200">{t.ratio}%</strong> (Target: {t.targetRatio}%)</span>
                      <span>•</span>
                      <span>Capital: <strong className="text-amber-300">${t.capital}B</strong></span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">+{t.yield}% APR</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Verification Note */}
          <div className="p-4 rounded-2xl bg-[#091124] border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-xs font-bold text-white">Full-Reserve Off-Chain Attestation Active</div>
                <div className="text-[11px] text-slate-400">Continuous cryptographic solvency proof verified every 15 seconds</div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectLayer('LAYER_42_SYNTHETIC_BALANCE_SHEET');
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Open Layer 42 Workspace</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
