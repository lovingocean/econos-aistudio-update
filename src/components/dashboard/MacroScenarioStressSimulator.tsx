import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  TrendingUp, 
  TrendingDown, 
  RotateCcw, 
  ShieldAlert, 
  Zap, 
  DollarSign, 
  Building2, 
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface ScenarioParams {
  fedRateHikeBps: number; // -100 to +300 bps
  rdSpendShiftPct: number; // -50% to +100%
  cryptoVolatilityIndex: number; // 10 to 100
  cyberStressFactor: number; // 1 to 5
}

const DEFAULT_PARAMS: ScenarioParams = {
  fedRateHikeBps: 25,
  rdSpendShiftPct: 20,
  cryptoVolatilityIndex: 35,
  cyberStressFactor: 1,
};

export const MacroScenarioStressSimulator: React.FC = () => {
  const [params, setParams] = useState<ScenarioParams>(DEFAULT_PARAMS);

  // Computed outcomes based on scenario sliders
  const simulation = useMemo(() => {
    // Baseline AUM = $128.4B
    const baseAum = 128.42;
    // Impact of rate hike on Treasury yield vs duration mark-to-market
    const rateYieldGain = (params.fedRateHikeBps * 0.042); // +$M
    const rateCapitalDrag = (params.fedRateHikeBps * 0.021); // -$M net drag
    const netAumImpact = ((rateYieldGain - rateCapitalDrag) * 0.1).toFixed(2);

    // Collateralization ratio simulation (base 342.4%)
    const collateralRatio = Math.max(
      210, 
      Math.min(480, 342.4 + (params.fedRateHikeBps * 0.08) - (params.cryptoVolatilityIndex * 0.35) - (params.cyberStressFactor * 4.2))
    ).toFixed(1);

    // §41 Tax Credit Delta (base $18.64M)
    const baseTax = 18.64;
    const simulatedTaxCredit = (baseTax * (1 + params.rdSpendShiftPct / 100)).toFixed(2);
    const taxCreditGain = ((+simulatedTaxCredit) - baseTax).toFixed(2);

    // Quantum / Merkle Execution throughput impact
    const baseThroughput = 148.2; // k ops/sec
    const simulatedThroughput = Math.max(
      85, 
      baseThroughput - (params.cyberStressFactor - 1) * 12.4 + (params.cryptoVolatilityIndex > 50 ? 8.5 : 0)
    ).toFixed(1);

    // Solvency status
    const isSolvent = +collateralRatio >= 250;
    const auditDurability = Math.max(92, 99.4 - (params.rdSpendShiftPct > 60 ? 2.8 : 0)).toFixed(1);

    return {
      netAumImpact: +netAumImpact >= 0 ? `+$${netAumImpact}B` : `-$${Math.abs(+netAumImpact)}B`,
      collateralRatio,
      simulatedTaxCredit: `$${simulatedTaxCredit}M`,
      taxCreditGain: +taxCreditGain >= 0 ? `+$${taxCreditGain}M` : `-$${Math.abs(+taxCreditGain)}M`,
      simulatedThroughput: `${simulatedThroughput}k ops/s`,
      isSolvent,
      auditDurability: `${auditDurability}%`
    };
  }, [params]);

  const handleReset = () => {
    setParams(DEFAULT_PARAMS);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#080d19] border border-slate-800 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Macro Stress &amp; Capital Scenario Engine</h4>
            <p className="text-[11px] text-slate-400">Simulate cross-tier balance sheet, collateral, and tax solvency shocks</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer self-start sm:self-center"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Slider 1: Fed Rate Hike */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Fed Interest Rate</span>
            <span className="font-bold text-amber-400">
              {params.fedRateHikeBps >= 0 ? `+${params.fedRateHikeBps}` : params.fedRateHikeBps} bps
            </span>
          </div>
          <input
            type="range"
            min="-100"
            max="300"
            step="25"
            value={params.fedRateHikeBps}
            onChange={e => setParams(prev => ({ ...prev, fedRateHikeBps: parseInt(e.target.value) }))}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>-100 bps</span>
            <span>0</span>
            <span>+300 bps</span>
          </div>
        </div>

        {/* Slider 2: R&D Spend Shift */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">§41 R&amp;D Shift</span>
            <span className="font-bold text-emerald-400">
              {params.rdSpendShiftPct >= 0 ? `+${params.rdSpendShiftPct}%` : `${params.rdSpendShiftPct}%`}
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="100"
            step="10"
            value={params.rdSpendShiftPct}
            onChange={e => setParams(prev => ({ ...prev, rdSpendShiftPct: parseInt(e.target.value) }))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>-50%</span>
            <span>0%</span>
            <span>+100%</span>
          </div>
        </div>

        {/* Slider 3: Crypto Volatility */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Synthetic Volatility</span>
            <span className="font-bold text-cyan-400">{params.cryptoVolatilityIndex} VIX</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={params.cryptoVolatilityIndex}
            onChange={e => setParams(prev => ({ ...prev, cryptoVolatilityIndex: parseInt(e.target.value) }))}
            className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>10 Low</span>
            <span>50 Mod</span>
            <span>100 Shock</span>
          </div>
        </div>

        {/* Slider 4: Cyber/Quantum Stress Factor */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Cyber Enclave Stress</span>
            <span className="font-bold text-rose-400">Tier {params.cyberStressFactor} Stress</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={params.cyberStressFactor}
            onChange={e => setParams(prev => ({ ...prev, cyberStressFactor: parseInt(e.target.value) }))}
            className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>1 Normal</span>
            <span>3 Elevated</span>
            <span>5 Max Shock</span>
          </div>
        </div>
      </div>

      {/* Simulated Outcomes Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-[#0d1527] border border-cyan-500/30">
          <span className="text-[10px] text-slate-400 block uppercase">Simulated Collateral Ratio</span>
          <div className="text-base font-bold text-cyan-300 mt-0.5 flex items-center gap-1.5">
            <span>{simulation.collateralRatio}%</span>
            {simulation.isSolvent ? (
              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                HEALTHY
              </span>
            ) : (
              <span className="text-[9px] px-1 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
                CRITICAL
              </span>
            )}
          </div>
          <span className="text-[9px] text-slate-500 block mt-1">Regulatory Min: 250.0%</span>
        </div>

        <div className="p-3 rounded-xl bg-[#0d1527] border border-emerald-500/30">
          <span className="text-[10px] text-slate-400 block uppercase">§41 Tax Credit Yield</span>
          <div className="text-base font-bold text-emerald-300 mt-0.5 flex items-center gap-1.5">
            <span>{simulation.simulatedTaxCredit}</span>
            <span className="text-[10px] text-emerald-400 font-normal">({simulation.taxCreditGain})</span>
          </div>
          <span className="text-[9px] text-slate-500 block mt-1">Durability: {simulation.auditDurability}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#0d1527] border border-amber-500/30">
          <span className="text-[10px] text-slate-400 block uppercase">AUM Balance Sheet Delta</span>
          <div className="text-base font-bold text-amber-300 mt-0.5">
            {simulation.netAumImpact}
          </div>
          <span className="text-[9px] text-slate-500 block mt-1">Rate duration matched</span>
        </div>

        <div className="p-3 rounded-xl bg-[#0d1527] border border-purple-500/30">
          <span className="text-[10px] text-slate-400 block uppercase">Merkle Execution Latency</span>
          <div className="text-base font-bold text-purple-300 mt-0.5">
            {simulation.simulatedThroughput}
          </div>
          <span className="text-[9px] text-slate-500 block mt-1">Post-Quantum ML-KEM Enclave</span>
        </div>
      </div>
    </div>
  );
};
