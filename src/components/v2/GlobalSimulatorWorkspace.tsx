import React, { useState } from 'react';
import {
  Activity,
  BarChart3,
  FlaskConical,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sliders,
  Sparkles,
  Zap,
  ShieldCheck,
  Percent,
  Layers,
  Cpu
} from 'lucide-react';
import {
  INITIAL_SIMULATION_RUNS,
  INITIAL_EXPERIMENTS
} from '../../data/econosV2Data';
import {
  GlobalSimulationRun,
  GlobalShockType,
  StrategicExperiment,
  SimulationIntervention
} from '../../types/econosV2';

export const GlobalSimulatorWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GLOBAL_SIMULATOR' | 'STRATEGIC_EXPERIMENTS'>('GLOBAL_SIMULATOR');
  const [simulations, setSimulations] = useState<GlobalSimulationRun[]>(INITIAL_SIMULATION_RUNS);
  const [selectedSimId, setSelectedSimId] = useState<string>('sim-01');
  const [experiments, setExperiments] = useState<StrategicExperiment[]>(INITIAL_EXPERIMENTS);
  
  // Interactive Simulation Controls
  const [activeShockSeverity, setActiveShockSeverity] = useState<'MILD' | 'MODERATE' | 'SEVERE' | 'CATASTROPHIC'>('SEVERE');
  const [monteCarloCount, setMonteCarloCount] = useState<number>(10000);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [appliedInterventionId, setAppliedInterventionId] = useState<string | null>(null);

  const currentSim = simulations.find(s => s.id === selectedSimId) || simulations[0];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulations(prev => prev.map(s => {
        if (s.id === selectedSimId) {
          const multiplier = activeShockSeverity === 'CATASTROPHIC' ? 1.4 : activeShockSeverity === 'SEVERE' ? 1.0 : 0.7;
          return {
            ...s,
            severityLevel: activeShockSeverity,
            monteCarloPaths: monteCarloCount,
            unhedgedLossUsd: Math.round(s.unhedgedLossUsd * multiplier),
            distributionStats: {
              ...s.distributionStats,
              p50LossUsd: Math.round(s.distributionStats.p50LossUsd * multiplier),
              solvencyProbability: activeShockSeverity === 'CATASTROPHIC' ? 92.4 : 98.6
            }
          };
        }
        return s;
      }));
    }, 900);
  };

  const handleApplyIntervention = (intervention: SimulationIntervention) => {
    setAppliedInterventionId(intervention.id);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-black">
              <Activity className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Global Economic Simulator &amp; Strategic Experimentation Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-[10px] font-mono text-sky-300 font-bold uppercase">
              14 Macro Shocks &bull; Outcome Ledger
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Multi-layer stochastic simulator projecting external shocks from Transaction to Global Economy. 
            Identifies constrained optimal interventions and governs controlled A/B experiments to continuously train Bayesian priors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-right">
            <div className="text-[10px] text-slate-400">STOCHASTIC PRECISION</div>
            <div className="text-sky-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>{monteCarloCount.toLocaleString()} Paths Evaluated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 rounded-xl text-xs font-mono">
        <button
          onClick={() => setActiveTab('GLOBAL_SIMULATOR')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'GLOBAL_SIMULATOR'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span>Multi-Layer Global Simulator (14 Macro Shocks)</span>
        </button>

        <button
          onClick={() => setActiveTab('STRATEGIC_EXPERIMENTS')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'STRATEGIC_EXPERIMENTS'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
          <span>Strategic Experimentation Engine (Outcome Loop)</span>
        </button>
      </div>

      {/* TAB 1: GLOBAL SIMULATOR */}
      {activeTab === 'GLOBAL_SIMULATOR' && (
        <div className="space-y-6">
          
          {/* Shock Scenario Presets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            {simulations.map((sim) => (
              <button
                key={sim.id}
                onClick={() => {
                  setSelectedSimId(sim.id);
                  setAppliedInterventionId(null);
                }}
                className={`p-3.5 rounded-xl border text-left transition ${
                  selectedSimId === sim.id
                    ? 'bg-[#132338] text-white border-[#132338] shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold opacity-70">{sim.hierarchyScope}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    sim.severityLevel === 'CATASTROPHIC' ? 'bg-rose-500 text-white' :
                    sim.severityLevel === 'SEVERE' ? 'bg-amber-500 text-slate-950' :
                    'bg-sky-500 text-white'
                  }`}>
                    {sim.severityLevel}
                  </span>
                </div>
                <div className="font-bold text-sm mt-1">{sim.title}</div>
                <div className="text-[10px] text-rose-400 font-semibold mt-1">
                  Unhedged Downside: -${(sim.unhedgedLossUsd / 1000000).toFixed(2)}M
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Simulation Dashboard */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
            
            {/* Simulation Parameter Controls */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Shock Severity</span>
                  <div className="flex items-center gap-1">
                    {(['MILD', 'MODERATE', 'SEVERE', 'CATASTROPHIC'] as const).map((sev) => (
                      <button
                        key={sev}
                        onClick={() => setActiveShockSeverity(sev)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                          activeShockSeverity === sev
                            ? 'bg-[#132338] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Monte Carlo Precision</span>
                  <div className="flex items-center gap-1">
                    {[1000, 10000, 50000].map((count) => (
                      <button
                        key={count}
                        onClick={() => setMonteCarloCount(count)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                          monteCarloCount === count
                            ? 'bg-[#132338] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {count.toLocaleString()} Paths
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition shadow-xs flex items-center gap-2"
              >
                {isSimulating ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Stochastic Paths...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Simulation Engine</span>
                  </>
                )}
              </button>
            </div>

            {/* Core Simulator Answers (Prompt Mandate) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Question 1: What happens if this occurs? */}
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="text-rose-900 font-bold uppercase text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>1. What happens to this enterprise if this event occurs?</span>
                </div>
                <div className="space-y-1.5 text-slate-800 text-[11px]">
                  <div><span className="font-semibold text-rose-950">Expected Loss (P50):</span> -${(currentSim.distributionStats?.p50LossUsd ?? 0).toLocaleString()}</div>
                  <div><span className="font-semibold text-rose-950">Worst-Case 90% VaR (P90):</span> -${(currentSim.distributionStats?.p90LossUsd ?? 0).toLocaleString()}</div>
                  <div><span className="font-semibold text-rose-950">Cash Runway Drag:</span> {currentSim.unhedgedRunwayDeltaMonths} months reduction</div>
                  <div><span className="font-semibold text-rose-950">Debt Covenant Headroom:</span> -{currentSim.covenantHeadroomLossPct}% contraction</div>
                  <div className="pt-1 text-[10px] text-slate-500 italic">
                    Output evaluated across {(currentSim.monteCarloPaths ?? 0).toLocaleString()} stochastic simulation paths.
                  </div>
                </div>
              </div>

              {/* Question 2: Which intervention produces optimal modeled outcome? */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="text-emerald-900 font-bold uppercase text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>2. Which intervention produces the optimal modeled outcome?</span>
                </div>
                <div className="space-y-1.5 text-slate-800 text-[11px]">
                  {currentSim.interventions.filter(i => i.isOptimal).map((opt) => (
                    <div key={opt.id} className="space-y-1">
                      <div className="font-bold text-emerald-950 text-xs">{opt.title}</div>
                      <p className="text-slate-600 leading-snug">{opt.description}</p>
                      <div className="flex items-center justify-between pt-1 font-semibold text-emerald-800">
                        <span>Loss Mitigated: +${(opt.mitigatedLossUsd ?? 0).toLocaleString()}</span>
                        <span>Post-Solvency: {opt.postInterventionSolvencyPct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Interventions Comparison Matrix */}
            <div className="space-y-3">
              <div className="text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                Evaluated Intervention Options &amp; Governance Requirements
              </div>

              <div className="space-y-2.5">
                {currentSim.interventions.map((inv) => {
                  const isSelected = appliedInterventionId === inv.id || (appliedInterventionId === null && inv.isOptimal);
                  return (
                    <div 
                      key={inv.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition ${
                        isSelected 
                          ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400' 
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{inv.title}</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-bold text-[10px]">
                            {inv.layerOrAgent}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                            {inv.recommendedGovernance}
                          </span>
                          {inv.isOptimal && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">
                              ECONOS RANK 1 (OPTIMAL)
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-[11px] max-w-2xl">{inv.description}</p>
                      </div>

                      <div className="flex items-center gap-4 text-right shrink-0">
                        <div>
                          <div className="text-[10px] text-slate-400">EXECUTION COST</div>
                          <div className="font-bold text-slate-800">${(inv.executionCostUsd ?? 0).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">SAVINGS / VALUE</div>
                          <div className="font-bold text-emerald-700">+${(inv.mitigatedLossUsd ?? 0).toLocaleString()}</div>
                        </div>
                        <button
                          onClick={() => handleApplyIntervention(inv)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-slate-300 hover:bg-slate-100 text-slate-800'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select Option'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: STRATEGIC EXPERIMENTATION ENGINE */}
      {activeTab === 'STRATEGIC_EXPERIMENTS' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 font-mono text-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Strategic Experimentation &amp; Controlled Outcome Ledger Loop
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  HYPOTHESIS &rarr; SIMULATE &rarr; AUTHORIZE &rarr; CONTROLLED EXECUTION &rarr; MEASURE &rarr; RECONCILE &rarr; OUTCOME &rarr; MODEL UPDATE
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                Outcome-Grounded Loop Active
              </span>
            </div>

            <div className="space-y-4">
              {experiments.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#132338] text-amber-400 font-bold text-[10px]">
                        {exp.area}
                      </span>
                      <span className="font-bold text-slate-900 text-xs">{exp.title}</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                        {exp.authorizationClass}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      exp.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                      exp.status === 'ACTIVE_RUN' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {exp.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-700 uppercase text-[10px]">Hypothesis</span>
                      <p className="text-slate-600 leading-snug">{exp.hypothesis}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-700 uppercase text-[10px]">Risk Boundary &amp; Circuit Breaker</span>
                      <p className="text-slate-600 leading-snug">{exp.riskBoundary}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-700 pt-1">
                    <div><span className="font-semibold">Control Group:</span> {exp.controlGroup}</div>
                    <div><span className="font-semibold">Treatment Group:</span> {exp.treatmentGroup}</div>
                    <div><span className="font-semibold">Sample Size:</span> {exp.sampleSize}</div>
                  </div>

                  {exp.actualOutcome && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-1">
                      <div className="font-bold text-xs flex items-center gap-1.5 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Empirical Outcome Reconciled (p-value: {exp.statisticalSignificance})</span>
                      </div>
                      <p className="text-slate-800 text-[11px]">{exp.actualOutcome}</p>
                      {exp.modelUpdateRegistered && (
                        <div className="text-[10px] text-emerald-700 font-semibold pt-0.5">
                          &bull; Updated Model Priors registered in Universal Model Registry (Agent 25 Calibrated).
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
