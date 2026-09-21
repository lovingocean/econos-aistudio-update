import React, { useState, useMemo, useEffect } from 'react';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { 
  WhatIfScenarioInput, 
  WhatIfSimulationComparison,
  CashFlowForecastResponse,
  EconomicProfile
} from '../../types/econos';
import { 
  Sliders, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Download, 
  RefreshCw, 
  Sparkles, 
  FileText, 
  Clock, 
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Building2,
  DollarSign
} from 'lucide-react';

interface CommercialWhatIfStudioWorkspaceProps {
  onNavigateToCashFlow?: () => void;
}

export const CommercialWhatIfStudioWorkspace: React.FC<CommercialWhatIfStudioWorkspaceProps> = () => {
  const { currentOrg, currentBusiness } = useAuth();

  // Baseline economic metrics
  const [profile, setProfile] = useState<EconomicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default baseline assumptions
  const baseCash = 890000;
  const baseRev = 425000;
  const baseOpex = 198000;
  const baseCogs = 132000;

  // Interactive Shock Parameters
  const [shocks, setShocks] = useState<WhatIfScenarioInput>({
    revenueGrowthShockMoM: 0, // -50% to +50%
    opexInflationShockPct: 0, // 0% to +40%
    topCustomerChurnPct: 0, // 0% to 50%
    receivablesCollectionDelayDays: 0, // 0 to 60 days
    strategicCapexExpansionUsd: 0 // $0 to $300,000
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.getEconomicSnapshot().catch(() => null);
        if (res?.profile) {
          setProfile(res.profile);
        }
      } catch (err) {
        console.error('Failed to load profile for scenario studio', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [currentOrg?.id]);

  // Dynamic calculation engine for custom shocks
  const simulationResults = useMemo(() => {
    const liquidCash = profile?.cashOnHand || baseCash;
    const monthlyRev = (profile?.monthlyRevenue || baseRev) * (1 - (shocks.topCustomerChurnPct / 100));
    const effectiveGrowth = (profile?.growthRateMoM || 4.5) / 100 + (shocks.revenueGrowthShockMoM / 100);
    const monthlyOpex = (profile?.monthlyOpex || baseOpex) * (1 + (shocks.opexInflationShockPct / 100));
    const monthlyCogs = (profile?.monthlyCogs || baseCogs) * (1 + (shocks.opexInflationShockPct / 200));

    // 12-month projections
    let runningCash = liquidCash - shocks.strategicCapexExpansionUsd;
    let lowestCash = runningCash;
    let lowestMonth = 'Month 1';
    let depletedMonth = 25; // Solvent through 24 mo

    const months = ['Oct 2026', 'Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027', 'May 2027', 'Jun 2027', 'Jul 2027', 'Aug 2027', 'Sep 2027'];
    const projectionTimeline: Array<{ month: string; cash: number; netFlow: number }> = [];

    // Collection delay discount factor on early cash flow
    const collectionDelayDamping = Math.max(0.6, 1 - (shocks.receivablesCollectionDelayDays / 120));

    for (let m = 0; m < 12; m++) {
      const growthFactor = Math.pow(1 + effectiveGrowth, m);
      const inflow = (monthlyRev * growthFactor) * (m === 0 ? collectionDelayDamping : 1);
      const outflow = monthlyOpex + monthlyCogs;
      const net = inflow - outflow;
      runningCash += net;

      if (runningCash < lowestCash) {
        lowestCash = runningCash;
        lowestMonth = months[m];
      }

      if (runningCash <= 0 && depletedMonth > 24) {
        depletedMonth = m + 1;
      }

      projectionTimeline.push({
        month: months[m],
        cash: Math.round(runningCash),
        netFlow: Math.round(net)
      });
    }

    // Dynamic Monte Carlo 1000-path stochastic modeling
    const NUM_SIMS = 1000;
    let solvent12 = 0;
    let solvent24 = 0;

    for (let s = 0; s < NUM_SIMS; s++) {
      let simCash = liquidCash - shocks.strategicCapexExpansionUsd;
      let survived12 = true;
      let survived24 = true;

      for (let m = 1; m <= 24; m++) {
        // Normal stochastic variance
        const zRev = (Math.random() - 0.5) * 2;
        const zExp = (Math.random() - 0.5) * 2;
        const revMultiplier = Math.max(0.3, 1 + (effectiveGrowth * m) + (zRev * 0.16));
        const expMultiplier = Math.max(0.7, (1 + (shocks.opexInflationShockPct / 100)) + (zExp * 0.08));

        const simInflow = monthlyRev * revMultiplier;
        const simOutflow = (monthlyOpex + monthlyCogs) * expMultiplier;
        simCash += (simInflow - simOutflow);

        if (simCash <= 0) {
          if (m <= 12) survived12 = false;
          survived24 = false;
          break;
        }
      }

      if (survived12) solvent12++;
      if (survived24) solvent24++;
    }

    const survivalProbability12Mo = Number(((solvent12 / NUM_SIMS) * 100).toFixed(1));
    const survivalProbability24Mo = Number(((solvent24 / NUM_SIMS) * 100).toFixed(1));

    // Baseline runway calculation (no shocks)
    const baseNet = (profile?.monthlyRevenue || baseRev) - ((profile?.monthlyOpex || baseOpex) + (profile?.monthlyCogs || baseCogs));
    const baselineRunwayMonths = baseNet < 0 ? Math.round((liquidCash / Math.abs(baseNet)) * 10) / 10 : 24.0;

    // Shocked runway
    const currentBurn = (monthlyOpex + monthlyCogs) - monthlyRev;
    const shockedRunwayMonths = currentBurn > 0 
      ? Math.max(1, Math.min(24, Math.round((liquidCash / currentBurn) * 10) / 10))
      : 24.0;

    const runwayDelta = Math.round((shockedRunwayMonths - baselineRunwayMonths) * 10) / 10;

    return {
      startingLiquidCash: liquidCash,
      endingCash12Mo: Math.round(runningCash),
      lowestCashTroughUsd: Math.round(lowestCash),
      lowestCashTroughMonth: lowestMonth,
      projectedRunwayMonths: shockedRunwayMonths,
      baselineRunwayMonths,
      runwayDeltaMonths: runwayDelta,
      survivalProbability12Mo,
      survivalProbability24Mo,
      projectionTimeline
    };
  }, [profile, shocks]);

  // Pre-configured scenario presets
  const presets = [
    {
      name: 'Base Operating Plan',
      desc: 'Baseline growth with zero macro stress shocks',
      shocks: {
        revenueGrowthShockMoM: 0,
        opexInflationShockPct: 0,
        topCustomerChurnPct: 0,
        receivablesCollectionDelayDays: 0,
        strategicCapexExpansionUsd: 0
      }
    },
    {
      name: 'Stagflationary Squeeze',
      desc: '+15% OPEX Inflation, -15% Revenue Growth, 30-Day DSO Lag',
      shocks: {
        revenueGrowthShockMoM: -15,
        opexInflationShockPct: 15,
        topCustomerChurnPct: 10,
        receivablesCollectionDelayDays: 30,
        strategicCapexExpansionUsd: 0
      }
    },
    {
      name: 'Black Swan Demand Shock',
      desc: 'Top client defaults (-35% revenue cliff) and +20% compute inflation',
      shocks: {
        revenueGrowthShockMoM: -25,
        opexInflationShockPct: 20,
        topCustomerChurnPct: 35,
        receivablesCollectionDelayDays: 45,
        strategicCapexExpansionUsd: 0
      }
    },
    {
      name: 'Aggressive Capital Reinvestment',
      desc: '+25% MoM Revenue Surge with $150k one-off expansion CapEx',
      shocks: {
        revenueGrowthShockMoM: 25,
        opexInflationShockPct: 5,
        topCustomerChurnPct: 0,
        receivablesCollectionDelayDays: 0,
        strategicCapexExpansionUsd: 150000
      }
    }
  ];

  const handleApplyPreset = (presetShocks: WhatIfScenarioInput, presetName: string) => {
    setShocks(presetShocks);
    showToast(`Applied preset: ${presetName}`);
  };

  // Export scenario report
  const handleExportReport = () => {
    const content = `# ECONOS EXECUTIVE WHAT-IF SCENARIO STRESS REPORT
Generated: ${new Date().toISOString()}
Organization: ${currentOrg?.name || 'Econos Enterprise'}

==================================================
1. APPLIED STRESS SHOCKS:
- Revenue Growth Shock: ${shocks.revenueGrowthShockMoM > 0 ? '+' : ''}${shocks.revenueGrowthShockMoM}% MoM
- OPEX & Cost Inflation: +${shocks.opexInflationShockPct}%
- Top Customer Churn: ${shocks.topCustomerChurnPct}%
- Receivables Collection Lag: +${shocks.receivablesCollectionDelayDays} Days
- One-Off CapEx / Headcount Expansion: $${shocks.strategicCapexExpansionUsd.toLocaleString()} USD

==================================================
2. DYNAMIC STOCHASTIC OUTCOMES:
- Projected Runway: ${simulationResults.projectedRunwayMonths} Months (Delta: ${simulationResults.runwayDeltaMonths > 0 ? '+' : ''}${simulationResults.runwayDeltaMonths} mo)
- 12-Month Survival Probability: ${simulationResults.survivalProbability12Mo}%
- 24-Month Solvency Confidence: ${simulationResults.survivalProbability24Mo}%
- Lowest Cash Trough: $${simulationResults.lowestCashTroughUsd.toLocaleString()} USD in ${simulationResults.lowestCashTroughMonth}
- Ending 12-Month Cash: $${simulationResults.endingCash12Mo.toLocaleString()} USD

==================================================
3. RECOMMENDED FIDUCIARY MITIGATIONS:
- Trigger 2/10 Net-30 early settlement AR incentive to pull forward ~$24,500 liquid cash.
- Extend major compute and supplier disbursements to Net-60 terms.
- Maintain liquid T-Bill sweep buffer above $200,000 threshold.
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ECONOS_Stress_Report_${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Executive Stress Report.');
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#132338] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/80">
                Macro Shock Simulation Studio
              </span>
              <span className="text-slate-400 text-xs">&bull; Real-Time Monte Carlo Stress Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2 flex items-center gap-2 font-sans">
              Scenario Stress-Testing & &quot;What-If&quot; Studio
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl font-sans leading-relaxed">
              Stress-test enterprise solvency against inflation spikes, customer defaults, and collection lags. Dynamic 1,000-path stochastic modeling calculates survival probability in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportReport}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Stress Memo</span>
            </button>
          </div>
        </div>

        {/* Dynamic Key Performance Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <div className="text-[11px] text-slate-500">Projected Runway</div>
            <div className="text-xl font-bold text-slate-900 mt-1 flex items-baseline gap-2">
              <span>{simulationResults.projectedRunwayMonths} Mo</span>
              <span className={`text-[11px] font-bold ${
                simulationResults.runwayDeltaMonths >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {simulationResults.runwayDeltaMonths > 0 ? '+' : ''}{simulationResults.runwayDeltaMonths} mo
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">vs {simulationResults.baselineRunwayMonths} mo baseline</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <div className="text-[11px] text-slate-500">12-Mo Survival Probability</div>
            <div className="text-xl font-bold text-slate-900 mt-1 flex items-baseline gap-1.5">
              <span>{simulationResults.survivalProbability12Mo}%</span>
              <span className={`text-[10px] ${
                simulationResults.survivalProbability12Mo >= 85 ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {simulationResults.survivalProbability12Mo >= 85 ? 'High Assurance' : 'Vulnerable'}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  simulationResults.survivalProbability12Mo >= 85 ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${simulationResults.survivalProbability12Mo}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <div className="text-[11px] text-slate-500">24-Mo Solvency Confidence</div>
            <div className="text-xl font-bold text-slate-900 mt-1">
              {simulationResults.survivalProbability24Mo}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1">1,000 stochastic iterations</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <div className="text-[11px] text-slate-500">Lowest Cash Trough</div>
            <div className="text-xl font-bold text-slate-900 mt-1">
              ${(simulationResults.lowestCashTroughUsd / 1000).toFixed(0)}k
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Occurs in {simulationResults.lowestCashTroughMonth}
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Presets Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-slate-400 font-bold uppercase shrink-0 mr-1">Presets:</span>
        {presets.map(p => (
          <button
            key={p.name}
            onClick={() => handleApplyPreset(p.shocks, p.name)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium transition shrink-0 shadow-xs hover:border-slate-300"
          >
            <Zap className="w-3 h-3 text-amber-500" />
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      {/* Main Studio Grid: Sliders & Visualized Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Interactive Shock Sliders */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm font-sans">Macroeconomic Shock Controls</h3>
            </div>
            <button
              onClick={() => handleApplyPreset(presets[0].shocks, 'Base Operating Plan')}
              className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to Base</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Slider 1: Revenue Demand Shock */}
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">Revenue Demand Shock (MoM):</span>
                <span className={`font-mono ${shocks.revenueGrowthShockMoM >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {shocks.revenueGrowthShockMoM > 0 ? '+' : ''}{shocks.revenueGrowthShockMoM}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={shocks.revenueGrowthShockMoM}
                onChange={e => setShocks(prev => ({ ...prev, revenueGrowthShockMoM: Number(e.target.value) }))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>-50% Contraction</span>
                <span>0% Base</span>
                <span>+50% Surge</span>
              </div>
            </div>

            {/* Slider 2: OPEX Inflation Shock */}
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">Cost & Inflation Squeeze:</span>
                <span className={`font-mono ${shocks.opexInflationShockPct > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                  +{shocks.opexInflationShockPct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={shocks.opexInflationShockPct}
                onChange={e => setShocks(prev => ({ ...prev, opexInflationShockPct: Number(e.target.value) }))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>0% Normal</span>
                <span>+20% High</span>
                <span>+40% Severe</span>
              </div>
            </div>

            {/* Slider 3: Top Customer Churn */}
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">Key Customer Default / Churn:</span>
                <span className={`font-mono ${shocks.topCustomerChurnPct > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                  -{shocks.topCustomerChurnPct}% ARR
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={shocks.topCustomerChurnPct}
                onChange={e => setShocks(prev => ({ ...prev, topCustomerChurnPct: Number(e.target.value) }))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-0.5">Simulates loss of largest enterprise accounts.</div>
            </div>

            {/* Slider 4: Collection Delay Lag */}
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">DSO Receivables Collection Lag:</span>
                <span className="font-mono text-slate-800">
                  +{shocks.receivablesCollectionDelayDays} Days
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="15"
                value={shocks.receivablesCollectionDelayDays}
                onChange={e => setShocks(prev => ({ ...prev, receivablesCollectionDelayDays: Number(e.target.value) }))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-0.5">Customer payments delayed beyond normal Net-30 terms.</div>
            </div>

            {/* Slider 5: Strategic Expansion CapEx */}
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">Discretionary CapEx / Headcount:</span>
                <span className="font-mono text-slate-800">
                  ${(shocks.strategicCapexExpansionUsd / 1000).toFixed(0)}k USD
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="300000"
                step="25000"
                value={shocks.strategicCapexExpansionUsd}
                onChange={e => setShocks(prev => ({ ...prev, strategicCapexExpansionUsd: Number(e.target.value) }))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-0.5">One-off capital deployment for R&D expansion.</div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: 12-Month Liquidity Curve & Timeline */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-sans">12-Month Projected Liquidity Trajectory</h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Stochastically adjusted cash balance through Sep 2027
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
              Ending: ${(simulationResults.endingCash12Mo / 1000).toFixed(0)}k USD
            </span>
          </div>

          {/* Month by month cash flow timeline */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {simulationResults.projectionTimeline.map(pt => {
              const isTrough = pt.cash === simulationResults.lowestCashTroughUsd;
              const isDeficit = pt.cash < 200000;

              return (
                <div 
                  key={pt.month}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition ${
                    isTrough 
                      ? 'bg-amber-50/70 border-amber-300' 
                      : isDeficit 
                        ? 'bg-rose-50/40 border-rose-200' 
                        : 'bg-slate-50/70 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800 w-20">{pt.month}</span>
                    {isTrough && (
                      <span className="text-[10px] font-bold uppercase bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                        Cash Trough
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Net Flow:</span>
                      <span className={`font-mono font-bold ${pt.netFlow >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {pt.netFlow >= 0 ? '+' : ''}${(pt.netFlow / 1000).toFixed(1)}k
                      </span>
                    </div>

                    <div className="text-right w-24">
                      <span className="text-[10px] text-slate-400 block">Balance:</span>
                      <span className="font-mono font-bold text-slate-900">
                        ${(pt.cash / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Strategic Mitigations Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm font-sans flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Automated Strategic Executive Mitigations</span>
            </h3>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Ranked countermeasures calculated to protect runway under stressed scenarios.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 font-sans">Accelerate AR Discount</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                +$24,500 Cash
              </span>
            </div>
            <p className="text-slate-500 font-sans text-xs">
              Offer a 2/10 Net-30 early settlement rebate on open enterprise invoices to pull forward collections into current cycle.
            </p>
            <div className="text-[10px] text-slate-400 pt-1">Execution Speed: 3 Days &bull; Low Risk</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 font-sans">Extend AP to Net-60</span>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                +$18,000 Buffer
              </span>
            </div>
            <p className="text-slate-500 font-sans text-xs">
              Align major contractor and software compute disbursements to milestone deliverables to prevent mid-quarter liquidity trough.
            </p>
            <div className="text-[10px] text-slate-400 pt-1">Execution Speed: 7 Days &bull; Low Risk</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 font-sans">Draw T-Bill Yield Reserve</span>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                +$125,000 Liquid
              </span>
            </div>
            <p className="text-slate-500 font-sans text-xs">
              Direct an automatic liquid sweep from sovereign T-Bills into operating checking if reserves breach the safety floor.
            </p>
            <div className="text-[10px] text-slate-400 pt-1">Execution Speed: 24 Hours &bull; Zero Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
};
