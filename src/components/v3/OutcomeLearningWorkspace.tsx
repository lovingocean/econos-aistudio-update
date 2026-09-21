import React, { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Activity,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
  BarChart2,
  AlertTriangle,
  Zap
} from 'lucide-react';
import {
  MOCK_AGENT_CALIBRATIONS,
  MOCK_OUTCOME_RECONCILIATIONS,
  AgentCalibrationProfile,
  OutcomeReconciliation
} from '../../data/econosV3Data';

export const OutcomeLearningWorkspace: React.FC = () => {
  const [agents, setAgents] = useState<AgentCalibrationProfile[]>(MOCK_AGENT_CALIBRATIONS);
  const [reconciliations, setReconciliations] = useState<OutcomeReconciliation[]>(MOCK_OUTCOME_RECONCILIATIONS);
  const [selectedAgentId, setSelectedAgentId] = useState<number>(12);
  
  // Interactive Bayesian Simulation State
  const [simulatedVariancePct, setSimulatedVariancePct] = useState<number>(3.2);
  const [isUpdatingBayesian, setIsUpdatingBayesian] = useState<boolean>(false);
  const [bayesianUpdateMessage, setBayesianUpdateMessage] = useState<string | null>(null);

  const selectedAgent = agents.find(a => a.agentId === selectedAgentId) || agents[0];

  const handleRunBayesianUpdate = () => {
    setIsUpdatingBayesian(true);
    setBayesianUpdateMessage(null);

    setTimeout(() => {
      // Calculate updated prior weight and Brier score based on variance
      const varianceFactor = Math.abs(simulatedVariancePct) / 100;
      const newBrier = Math.max(0.05, Math.min(0.35, selectedAgent.brierScore + (varianceFactor > 0.05 ? 0.015 : -0.008)));
      const newAccuracy = Math.max(80, Math.min(99.5, selectedAgent.historicalAccuracyPct - simulatedVariancePct * 0.4));
      const newPrior = Math.max(0.70, Math.min(0.98, selectedAgent.priorWeight + (varianceFactor < 0.03 ? 0.02 : -0.03)));

      setAgents(prev => prev.map(a => {
        if (a.agentId === selectedAgentId) {
          return {
            ...a,
            brierScore: parseFloat(newBrier.toFixed(3)),
            historicalAccuracyPct: parseFloat(newAccuracy.toFixed(1)),
            priorWeight: parseFloat(newPrior.toFixed(2)),
            totalDecisionsEvaluated: a.totalDecisionsEvaluated + 1,
            reconciliationAuditCount: a.reconciliationAuditCount + 1,
            latestLearningInsight: `Bayesian posterior adjusted by ${simulatedVariancePct >= 0 ? '+' : ''}${simulatedVariancePct}%. Prior weight converged to ${newPrior.toFixed(2)} based on closed-loop GL reconciliation.`
          };
        }
        return a;
      }));

      // Add a new reconciliation entry
      const newRec: OutcomeReconciliation = {
        id: `rec-${Date.now()}`,
        decisionId: `dp-${Math.floor(Math.random() * 900 + 100)}`,
        title: `Simulated Closed-Loop Audit for ${selectedAgent.name}`,
        agentName: selectedAgent.name,
        decisionDate: 'Just now',
        reconciliationHorizon: '30_DAY',
        predictedOutcome: 250000,
        actualGlDelta: Math.round(250000 * (1 + simulatedVariancePct / 100)),
        variancePct: simulatedVariancePct,
        status: Math.abs(simulatedVariancePct) <= 3 ? 'RECONCILED_SUCCESS' : 'WITHIN_TOLERANCE',
        bayesianAdjustmentApplied: `Posterior distribution shifted prior weight to ${newPrior.toFixed(2)}.`
      };

      setReconciliations(prev => [newRec, ...prev]);
      setIsUpdatingBayesian(false);
      setBayesianUpdateMessage(`Bayesian update completed. Agent ${selectedAgent.code} confidence priors re-weighted.`);
    }, 1000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 font-black">
              <Brain className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Layer 13: Outcome Learning &amp; Bayesian Recalibration Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-[10px] font-mono text-purple-300 font-bold uppercase">
              Closed-Loop GL Reconciliation
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            The closed-loop learning feedback mechanism. Systematically audits predicted financial outcomes against audited General Ledger statements after 30, 60, and 90 days, dynamically updating agent prior weights and Brier calibration scores.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-right">
            <div className="text-[10px] text-slate-400">CALIBRATION DISCIPLINE</div>
            <div className="text-purple-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <Target className="w-3.5 h-3.5" />
              <span>Brier Scoring Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">MEAN BRIER SCORE</div>
          <div className="text-lg font-bold font-mono text-purple-700 mt-1">0.117</div>
          <div className="text-[10px] font-mono text-emerald-600 mt-0.5">&bull; Superforecaster Grade (&lt;0.15)</div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">AUDITED DECISIONS</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1">470 Decisions</div>
          <div className="text-[10px] font-mono text-slate-500 mt-0.5">&bull; 100% GL Reconciliation</div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">AVERAGE PREDICTION ERROR</div>
          <div className="text-lg font-bold font-mono text-emerald-700 mt-1">&plusmn;2.9%</div>
          <div className="text-[10px] font-mono text-slate-500 mt-0.5">&bull; Well within 5.0% tolerance</div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">ACTIVE LEARNING CYCLES</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1">Daily Automated</div>
          <div className="text-[10px] font-mono text-purple-600 mt-0.5">&bull; Bayesian Priors Updating</div>
        </div>
      </div>

      {/* Main Learning Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Agent Calibration Scorecard */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 font-bold px-1">
            <span>SOVEREIGN AGENT CALIBRATION</span>
            <span>{agents.length} AGENTS</span>
          </div>

          <div className="space-y-2.5">
            {agents.map(agent => {
              const isSelected = agent.agentId === selectedAgentId;
              return (
                <div
                  key={agent.agentId}
                  onClick={() => setSelectedAgentId(agent.agentId)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-white border-purple-500 shadow-xs ring-1 ring-purple-500/20'
                      : 'bg-white/80 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-purple-500" />
                      {agent.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      agent.calibrationStatus === 'SUPERFORECASTER'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {(agent.calibrationStatus || '').replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-800 line-clamp-1 mb-2">{agent.name}</p>

                  <div className="grid grid-cols-3 gap-1 text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[9px] text-slate-400 block">BRIER SCORE</span>
                      <span className="font-bold text-purple-700">{agent.brierScore}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">ACCURACY</span>
                      <span className="font-bold text-slate-800">{agent.historicalAccuracyPct}%</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">PRIOR WEIGHT</span>
                      <span className="font-bold text-slate-800">{agent.priorWeight}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Bayesian Recalibration Simulator */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-purple-600">{selectedAgent.code}</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-mono font-bold">
                  {selectedAgent.calibrationStatus}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">{selectedAgent.name}</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedAgent.specialization}</p>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400">PRIOR WEIGHT</div>
              <div className="text-xl font-bold font-mono text-purple-700">{selectedAgent.priorWeight}</div>
            </div>
          </div>

          {/* Latest Learning Insight */}
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200/80 text-xs font-mono text-purple-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-purple-900">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Continuous Learning Insight &amp; Model Parameter Shift
            </span>
            <p className="text-[11px] text-purple-900/90 leading-relaxed">
              {selectedAgent.latestLearningInsight}
            </p>
          </div>

          {/* Interactive Bayesian Update Studio */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-purple-600" />
                Simulate Closed-Loop GL Reconciliation Variance
              </h3>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                Math.abs(simulatedVariancePct) <= 3
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                Variance: {simulatedVariancePct >= 0 ? '+' : ''}{simulatedVariancePct}%
              </span>
            </div>

            <p className="text-xs text-slate-600 font-mono leading-relaxed">
              Adjust the actual audited GL delta compared to the agent&apos;s predicted financial gain. Running the Bayesian updater will dynamically recalculate the agent&apos;s posterior probability distribution and Brier score.
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>-10% (Underperformed)</span>
                <span>0% (Perfect Forecast)</span>
                <span>+10% (Exceeded Model)</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={simulatedVariancePct}
                onChange={(e) => setSimulatedVariancePct(parseFloat(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            <button
              onClick={handleRunBayesianUpdate}
              disabled={isUpdatingBayesian}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold transition shadow-xs flex items-center justify-center gap-2"
            >
              {isUpdatingBayesian ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing Markov Chain Monte Carlo Posterior...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Execute Bayesian Posterior Recalibration</span>
                </>
              )}
            </button>

            {bayesianUpdateMessage && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{bayesianUpdateMessage}</span>
              </div>
            )}
          </div>

          {/* Recent Reconciliations Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-800">
              Recent General Ledger Reconciliations
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {reconciliations.slice(0, 4).map(rec => (
                <div key={rec.id} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-mono flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">{rec.title}</span>
                    <span className="text-[10px] text-slate-400">{(rec.reconciliationHorizon || '').replace('_', '-')} &bull; Audited: ${rec.actualGlDelta.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${rec.variancePct >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {rec.variancePct >= 0 ? '+' : ''}{rec.variancePct}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">{(rec.status || '').replace(/_/g, ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
