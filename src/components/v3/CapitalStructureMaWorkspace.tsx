import React, { useState } from 'react';
import { 
  Building2, 
  PieChart, 
  ShieldCheck, 
  Scale, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  AlertOctagon, 
  DollarSign, 
  Percent,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { 
  CAPITAL_STRUCTURE_PROFILE, 
  DEBT_COVENANTS, 
  SYNTHETIC_MA_TARGETS 
} from '../../data/sovereignDimensionsData';
import { DebtCovenantRule, SyntheticMaTarget } from '../../types/econos';

export const CapitalStructureMaWorkspace: React.FC = () => {
  const [profile, setProfile] = useState(CAPITAL_STRUCTURE_PROFILE);
  const [covenants] = useState<DebtCovenantRule[]>(DEBT_COVENANTS);
  const [targets] = useState<SyntheticMaTarget[]>(SYNTHETIC_MA_TARGETS);
  const [selectedTarget, setSelectedTarget] = useState<SyntheticMaTarget>(SYNTHETIC_MA_TARGETS[0]);
  const [isSimulatingMa, setIsSimulatingMa] = useState(false);
  const [maOutcomeNotice, setMaOutcomeNotice] = useState<string | null>(null);

  // Capital Rebalancer Interactive State
  const [targetDebtRatio, setTargetDebtRatio] = useState(30); // 30% debt, 70% equity

  // Dynamically calculate WACC based on slider
  const simulatedCostOfDebt = profile.costOfDebtAfterTaxPct;
  const simulatedCostOfEquity = profile.costOfEquityPct;
  const simulatedWacc = ((targetDebtRatio / 100) * simulatedCostOfDebt) + (((100 - targetDebtRatio) / 100) * simulatedCostOfEquity);
  const annualSavings = Math.max(0, ((profile.currentWaccPct - simulatedWacc) / 100) * profile.totalEnterpriseValueUsd);

  const handleSimulateMerger = (target: SyntheticMaTarget) => {
    setIsSimulatingMa(true);
    setMaOutcomeNotice(null);

    setTimeout(() => {
      setIsSimulatingMa(false);
      setMaOutcomeNotice(`Pro-forma merger simulation complete for ${target.targetName}. Combined Enterprise Value: $${((profile.totalEnterpriseValueUsd + target.enterpriseValueUsd) / 1000000).toFixed(1)}M. Accretive by +${target.proFormaAccretionPct}% with annual EBITDA synergies of $${(target.postMergerSynergyAnnualUsd / 1000000).toFixed(1)}M.`);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Dimension 4 • Corporate Finance & M&A Engine
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Autonomous Capital Structure & Synthetic M&A Optimization
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              24/7 algorithmic balance-sheet optimization minimizes WACC, enforces continuous debt covenant firewalls against syndicated loan agreements, and executes mathematical roll-up M&A synergy simulations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-mono font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Credit Rating: {profile.creditRating}</span>
            </span>
          </div>
        </div>

        {/* Macro Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Enterprise Value (TEV)</span>
            <span className="text-base font-bold text-slate-900">
              ${(profile.totalEnterpriseValueUsd / 1000000).toFixed(1)}M USD
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Current WACC</span>
            <span className="text-base font-bold text-amber-700">{profile.currentWaccPct}% (Opt: {profile.optimalWaccPct}%)</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Interest Savings Potential</span>
            <span className="text-base font-bold text-emerald-700">+${(profile.annualInterestSavingsPotentialUsd / 1000000).toFixed(1)}M/yr</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Leverage (Debt/EBITDA)</span>
            <span className="text-base font-bold text-purple-700">{profile.debtToEbitdaRatio}x (Max 3.50x)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: WACC Rebalancer Studio + Debt Covenant Firewall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: WACC Minimizer Studio (Col-6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" />
              <h2 className="font-bold text-slate-900 text-sm">Continuous WACC Minimization Engine</h2>
            </div>
            <span className="text-[10px] text-slate-400">Miller-Modigliani Shield Active</span>
          </div>
          <p className="text-slate-500 text-[11px] mt-2 font-sans">
            Dynamically adjust capital structure weights between syndicated term debt and equity retention to identify the mathematical minimum cost of corporate capital.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-[11px]">
                <span className="text-slate-600">Simulated Debt Weight:</span>
                <span className="font-bold text-slate-900">{targetDebtRatio}% Debt / {100 - targetDebtRatio}% Equity</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={targetDebtRatio}
                onChange={e => setTargetDebtRatio(Number(e.target.value))}
                className="w-full accent-purple-700"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10% Conservative</span>
                <span>Optimal: ~28%</span>
                <span>50% High Leverage</span>
              </div>
            </div>

            {/* WACC Outcome Box */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Current WACC:</span>
                <span className="text-slate-700 font-bold">{profile.currentWaccPct}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Simulated WACC:</span>
                <span className="text-purple-700 font-bold">{simulatedWacc.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">After-Tax Debt Cost:</span>
                <span className="text-slate-700">{profile.costOfDebtAfterTaxPct}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cost of Equity (CAPM):</span>
                <span className="text-slate-700">{profile.costOfEquityPct}%</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-slate-600 font-bold">Annual Capital Cost Reduction:</span>
                <span className="text-base font-bold text-emerald-700 font-mono">
                  +${(annualSavings / 1000000).toFixed(2)}M / yr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Real-Time Debt Covenant Firewall (Col-6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <h2 className="font-bold text-slate-900 text-sm">Debt Covenant Real-Time Firewall</h2>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">All Covenants Safe</span>
            </div>

            <div className="mt-4 space-y-3">
              {covenants.map(cov => (
                <div key={cov.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{cov.covenantName}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {cov.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-sans">
                    <span>Facility: {cov.lenderFacility}</span>
                    <span>Headroom: <strong className="text-emerald-700 font-mono">+{cov.headroomPct}%</strong></span>
                  </div>

                  <div className="pt-1 text-[10px] text-slate-500 flex justify-between">
                    <span>Current Value: <strong>{cov.currentValue}</strong></span>
                    <span>Covenant Threshold: <strong>{cov.thresholdValue}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Enforcement Trigger: <strong className="text-slate-800">BLOCK_AUTONOMOUS_PAYMENTS</strong></span>
            <span className="text-emerald-700 font-bold">Safe Headroom &gt; 30%</span>
          </div>
        </div>
      </div>

      {/* Synthetic M&A Roll-Up Pipeline */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="font-bold text-slate-900 text-sm">Algorithmic M&A Roll-Up & Synergy Simulator ({targets.length})</h2>
          </div>
          <span className="text-[10px] text-slate-400">Continuous Pro-Forma Accretion Screening</span>
        </div>

        {maOutcomeNotice && (
          <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{maOutcomeNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {targets.map(t => (
            <div
              key={t.id}
              className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                selectedTarget.id === t.id 
                  ? 'bg-purple-50/40 border-purple-300 shadow-2xs' 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                    {t.industry}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    +{t.proFormaAccretionPct}% Accretive
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-xs">{t.targetName}</h3>

                <div className="mt-3 space-y-1 text-[11px] text-slate-600 font-sans">
                  <div className="flex justify-between">
                    <span>Valuation (EV):</span>
                    <strong className="text-slate-900 font-mono">${(t.enterpriseValueUsd / 1000000).toFixed(1)}M</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>EV/EBITDA Multiple:</span>
                    <strong className="text-slate-900 font-mono">{t.acquisitionMultipleEvEbitda}x</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Synergies:</span>
                    <strong className="text-emerald-700 font-mono">+${(t.postMergerSynergyAnnualUsd / 1000000).toFixed(1)}M/yr</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>WACC Impact:</span>
                    <strong className="text-purple-700 font-mono">{t.combinedWaccImpactBps} bps</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTarget(t);
                  handleSimulateMerger(t);
                }}
                disabled={isSimulatingMa}
                className="mt-4 w-full py-2 px-3 rounded-lg bg-[#132338] hover:bg-[#0c1827] text-white font-bold transition flex items-center justify-center gap-1.5 text-xs shadow-2xs"
              >
                <span>{isSimulatingMa && selectedTarget.id === t.id ? 'Simulating Deal...' : 'Simulate Pro-Forma Merger'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
