import React, { useState } from 'react';
import {
  Brain,
  Layers,
  Bot,
  Scale,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Play,
  RotateCcw,
  Check,
  Lock,
  Cpu,
  FileText,
  Activity,
  Zap,
  TrendingUp,
  Clock,
  Eye
} from 'lucide-react';
import { 
  INITIAL_BRAIN_PIPELINE, 
  MOCK_DECISION_PACKAGES 
} from '../../data/econosV2Data';
import { DecisionPackage, BrainPipelineStep } from '../../types/econosV2';

export const EconomicBrainWorkspace: React.FC = () => {
  const [pipelineSteps, setPipelineSteps] = useState<BrainPipelineStep[]>(INITIAL_BRAIN_PIPELINE);
  const [decisionPackages, setDecisionPackages] = useState<DecisionPackage[]>(MOCK_DECISION_PACKAGES);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('dp-01');
  const [activeTab, setActiveTab] = useState<'DECISION_PACKAGE' | 'MULTI_AGENT_TEAMS' | 'CONFLICT_ARBITRATION' | 'EXECUTION_ROLLBACK'>('DECISION_PACKAGE');
  
  // Interactive Execution State
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isExecuted, setIsExecuted] = useState<boolean>(false);
  const [arbitrationResolved, setArbitrationResolved] = useState<boolean>(true);

  const currentPackage = decisionPackages.find(p => p.id === selectedPackageId) || decisionPackages[0];

  const handleExecuteMandate = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsExecuted(true);
      // Update pipeline stage to executed
      setPipelineSteps(prev => prev.map(s => {
        if (s.stage === 'EXECUTE') {
          return { ...s, status: 'COMPLETED', latencyMs: 420, details: 'Executed on-chain via Stripe Sovereign Bridge. Receipt #0x88f2a...1b' };
        }
        if (s.stage === 'RECONCILE') {
          return { ...s, status: 'IN_PROGRESS', details: 'Continuous 30-day GL reconciliation listening to bank ledger webhooks.' };
        }
        return s;
      }));
    }, 1100);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black">
              <Brain className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              ECONOS Economic Brain &amp; Master Orchestrator
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 font-bold uppercase">
              28 Agents Coordinated
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Transforms 28 independent specialist agents into 1 unified, auditable economic decision system. 
            Automates task decomposition, dynamic team formation, cross-agent conflict resolution, and deterministic decision packaging.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-right">
            <div className="text-[10px] text-slate-400">ACTIVE GOVERNANCE</div>
            <div className="text-amber-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Class C Multi-Sig Enforced</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 12-Stage Master Orchestration Loop */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              The 12-Stage Closed Economic Decision Loop (V2 Orchestrator)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            OBSERVE &rarr; DECOMPOSE &rarr; SELECT &rarr; ANALYZE &rarr; ARBITRATE &rarr; SIMULATE &rarr; SYNTHESIZE &rarr; VERIFY &rarr; AUTHORIZE &rarr; EXECUTE &rarr; RECONCILE &rarr; LEARN
          </span>
        </div>

        {/* Pipeline Visual Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-1.5 text-[10px] font-mono">
          {pipelineSteps.map((step, idx) => {
            const isDone = step.status === 'COMPLETED';
            const isInProg = step.status === 'IN_PROGRESS';
            return (
              <div 
                key={step.stage}
                className={`p-2 rounded-lg border text-center transition ${
                  isDone 
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-semibold'
                    : isInProg
                    ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold ring-1 ring-amber-400 animate-pulse'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
                title={step.details}
              >
                <div className="text-[9px] text-slate-400 font-bold">{idx + 1}</div>
                <div className="truncate mt-0.5">{(step.stage || '').replace('_', ' ')}</div>
                <div className="text-[9px] mt-1 opacity-80">
                  {isDone ? `${step.latencyMs}ms` : isInProg ? 'Active' : 'Queued'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 rounded-xl text-xs font-mono">
        <button
          onClick={() => setActiveTab('DECISION_PACKAGE')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'DECISION_PACKAGE'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Unified Decision Package ({currentPackage.packageNumber})</span>
        </button>

        <button
          onClick={() => setActiveTab('MULTI_AGENT_TEAMS')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'MULTI_AGENT_TEAMS'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-emerald-600" />
          <span>Dynamic Agent Teams ({currentPackage.participatingAgents.length} Agents)</span>
        </button>

        <button
          onClick={() => setActiveTab('CONFLICT_ARBITRATION')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'CONFLICT_ARBITRATION'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-indigo-600" />
          <span>Cross-Agent Conflict Resolution (Agent 27)</span>
        </button>

        <button
          onClick={() => setActiveTab('EXECUTION_ROLLBACK')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'EXECUTION_ROLLBACK'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
          <span>Execution &amp; Rollback Guarantee</span>
        </button>
      </div>

      {/* TAB 1: DECISION PACKAGE STANDARD */}
      {activeTab === 'DECISION_PACKAGE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Decision Package Document */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono font-bold text-xs">
                      {currentPackage.packageNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold text-xs">
                      {(currentPackage.authorizationClass || '').replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Confidence: {(currentPackage.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono">
                    {currentPackage.title}
                  </h3>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-slate-400">EXPECTED ECONOMIC IMPACT</div>
                  <div className="text-base font-black text-emerald-700">
                    +${(currentPackage.expectedEconomicImpact?.netFinancialGainUsd ?? 0).toLocaleString()} / Year
                  </div>
                  <div className="text-[10px] text-slate-500">
                    IRR: {currentPackage.expectedEconomicImpact?.irrPct ?? 0}% &bull; Payback: {currentPackage.expectedEconomicImpact?.paybackMonths ?? 0} mos
                  </div>
                </div>
              </div>

              {/* Objective & Current State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700 uppercase text-[10px]">Objective</span>
                  <p className="text-slate-600 leading-relaxed">{currentPackage.objective}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700 uppercase text-[10px]">Current Operating State</span>
                  <p className="text-slate-600 leading-relaxed">{currentPackage.currentState}</p>
                </div>
              </div>

              {/* Evidence & Data Sources */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Empirical Evidence Base ({currentPackage.evidence.length} Facts Verified by Agent 23)
                </div>
                <div className="space-y-1.5 font-mono text-xs">
                  {currentPackage.evidence.map((ev, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/50 border border-emerald-200/60 text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenario Results Table */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Stochastic Scenario Simulation Results (10,000 Monte Carlo Paths)
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden font-mono text-xs">
                  <table className="w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px]">
                      <tr>
                        <th className="px-3 py-2 text-left">Scenario</th>
                        <th className="px-3 py-2 text-center">Probability</th>
                        <th className="px-3 py-2 text-right">EBITDA Impact</th>
                        <th className="px-3 py-2 text-right">Runway Delta</th>
                        <th className="px-3 py-2 text-right">Solvency Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {currentPackage.scenarioResults.map((sr, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="px-3 py-2 font-semibold text-slate-800">{sr.scenarioName}</td>
                          <td className="px-3 py-2 text-center text-slate-600">{(sr.probability * 100).toFixed(0)}%</td>
                          <td className="px-3 py-2 text-right font-bold text-emerald-700">+${(sr.ebitdaImpactUsd ?? 0).toLocaleString()}</td>
                          <td className="px-3 py-2 text-right text-indigo-700">+{sr.cashRunwayImpactMonths} mos</td>
                          <td className="px-3 py-2 text-right font-black text-slate-900">{sr.solvencyScore}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Downside Containment */}
              <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 text-xs font-mono space-y-1.5">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>DOWNSIDE STRESS ANALYSIS &amp; CONTAINMENT STRATEGY</span>
                </div>
                {currentPackage.downsideScenarios.map((ds, idx) => (
                  <div key={idx} className="text-slate-700 space-y-1">
                    <div><span className="font-semibold text-rose-900">Stress:</span> {ds.stressCondition}</div>
                    <div><span className="font-semibold text-rose-900">Worst-Case Downside:</span> -${(ds.worstCaseLossUsd ?? 0).toLocaleString()}</div>
                    <div className="text-emerald-800 font-semibold"><span className="text-slate-900">Containment:</span> {ds.containmentStrategy}</div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Right Column: Execution Action Gateway & Verification Bar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Multi-Sig Execution Card */}
            <div className="bg-[#132338] text-white rounded-2xl p-5 border border-[#1f3654] shadow-md space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">Execution Authorization</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  {currentPackage.authorizationClass}
                </span>
              </div>

              <div className="space-y-2 text-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Protocol:</span>
                  <span className="text-white font-semibold">ECONOS Sovereign Mesh v2.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cryptographic Key:</span>
                  <span className="text-emerald-400 font-mono">Ed25519 (HSM Enclave)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Signer Identity:</span>
                  <span className="text-white font-semibold">Agent 24 + CFO Wallet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rollback Window:</span>
                  <span className="text-amber-400 font-semibold">{currentPackage.rollbackPlan.maxTimeWindowHours}h Automated Guarantee</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={handleExecuteMandate}
                  disabled={isExecuting || isExecuted}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                    isExecuted 
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                  }`}
                >
                  {isExecuting ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" />
                      <span>Signing &amp; Executing on Sovereign Gateway...</span>
                    </>
                  ) : isExecuted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Executed on Gateway (Receipt #0x88f2)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Sign &amp; Execute Mandate</span>
                    </>
                  )}
                </button>
              </div>

              {isExecuted && (
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>On-Chain Execution Verified</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Multi-bank clearing sweep initiated. Scheduled outcome reconciliation logged in Universal Outcome Ledger at 30, 60, and 90 days.
                  </div>
                </div>
              )}
            </div>

            {/* Calibration & Model Lineage Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 font-mono text-xs">
              <div className="text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                Model Lineage &amp; Calibration (Agent 25)
              </div>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Model ID:</span>
                  <span className="font-bold text-slate-900">{currentPackage.calibrationHistory.modelId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Historical Accuracy:</span>
                  <span className="font-bold text-emerald-700">{currentPackage.calibrationHistory.historicalAccuracyPct}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Brier Calibration Score:</span>
                  <span className="font-bold text-indigo-700">{currentPackage.calibrationHistory.brierScore} (Calibrated)</span>
                </div>
              </div>
            </div>

            {/* Monitoring Triggers Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 font-mono text-xs">
              <div className="text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                Automated Monitoring Triggers
              </div>
              <div className="space-y-2">
                {currentPackage.monitoringTriggers.map((mt, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                    <div className="font-bold text-slate-900">{mt.metric}: <span className="text-rose-600">{mt.threshold}</span></div>
                    <div className="text-slate-500 text-[10px]">Action: {mt.autoAction}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: DYNAMIC AGENT TEAMS */}
      {activeTab === 'MULTI_AGENT_TEAMS' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 font-mono">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Dynamic Agent Team Assembled by Master Orchestrator
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Economic Brain selected these 3 specialized agents from the 28 Sovereign Agents mesh based on problem decomposition.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              3 Active Specialists
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPackage.participatingAgents.map((ag) => (
              <div key={ag.agentId} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#132338] text-amber-400 font-bold text-[10px]">
                    {ag.agentCode}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">{ag.tier}</span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{ag.agentName}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{ag.role}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Formal Recommendation</div>
                  <p className="text-slate-800 text-[11px] leading-snug">{ag.recommendation}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500">Confidence: {(ag.confidence * 100).toFixed(0)}%</span>
                  {ag.financialImpactUsd ? (
                    <span className="font-bold text-emerald-700">+${ag.financialImpactUsd.toLocaleString()}</span>
                  ) : (
                    <span className="font-semibold text-slate-600">Risk Guardian</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CROSS-AGENT CONFLICT ARBITRATION */}
      {activeTab === 'CONFLICT_ARBITRATION' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 font-mono text-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Cross-Agent Collision Detection &amp; Consensus Arbiter (Agent 27)
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Detects opposing objectives between agents (e.g. Working Capital speed vs. Pricing Gross Margin) and computes Pareto-optimal resolution.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              1 Conflict Resolved
            </span>
          </div>

          {currentPackage.conflicts.map((conf) => (
            <div key={conf.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                <span className="font-bold text-slate-900 text-xs uppercase text-indigo-700">
                  {(conf.conflictType || '').replace(/_/g, ' ')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200">
                  Strategy: {conf.resolutionStrategy}
                </span>
              </div>

              {/* Opposing Positions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 space-y-1">
                  <div className="font-bold text-amber-900 text-[11px]">{conf.agentA.code} ({conf.agentA.name})</div>
                  <p className="text-slate-700 text-[11px]">{conf.agentA.position}</p>
                </div>
                <div className="p-3 rounded-lg bg-rose-50/80 border border-rose-200 space-y-1">
                  <div className="font-bold text-rose-900 text-[11px]">{conf.agentB.code} ({conf.agentB.name})</div>
                  <p className="text-slate-700 text-[11px]">{conf.agentB.position}</p>
                </div>
              </div>

              {/* Tradeoff Matrix */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-slate-500">Mathematical Tradeoff Matrix</div>
                <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
                  <table className="w-full divide-y divide-slate-200">
                    <thead className="bg-slate-100 text-slate-600 text-[10px]">
                      <tr>
                        <th className="px-3 py-1.5 text-left">Tradeoff Dimension</th>
                        <th className="px-3 py-1.5 text-left">Option A (Agent 07)</th>
                        <th className="px-3 py-1.5 text-left">Option B (Agent 14)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {conf.tradeoffMatrix.map((tm, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-1.5 font-semibold text-slate-800">{tm.metric}</td>
                          <td className="px-3 py-1.5 text-amber-800">{tm.optionA}</td>
                          <td className="px-3 py-1.5 text-rose-800">{tm.optionB}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Resolution Verdict */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-1">
                <div className="font-bold text-xs flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Agent 27 Consensus Arbitration Verdict</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-800">
                  {conf.resolvedRecommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: EXECUTION & ROLLBACK GUARANTEE */}
      {activeTab === 'EXECUTION_ROLLBACK' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Step-by-Step Execution Plan &amp; Automated Rollback Specification
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Every ECONOS Decision Package defines irreversible verification checks and deterministic rollback procedures before authorization.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              1. Execution Sequence (3 Verified Steps)
            </div>
            <div className="space-y-2">
              {currentPackage.executionPlan.steps.map((step) => (
                <div key={step.order} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                        {step.order}
                      </span>
                      <span className="font-bold text-slate-900">{step.actor}</span>
                      <span className="text-[10px] text-slate-400">&bull; Target: {step.targetSystem}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] ml-7">{step.action}</p>
                  </div>
                  <div className="text-right text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                    Check: {step.verificationCheck}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>DETERMINISTIC ROLLBACK PLAN GUARANTEE</span>
            </div>
            <div className="text-slate-800 text-[11px] space-y-1">
              <div><span className="font-semibold text-amber-900">Trigger Condition:</span> {currentPackage.rollbackPlan.triggerCondition}</div>
              <div><span className="font-semibold text-amber-900">Recovery Guarantee:</span> {currentPackage.rollbackPlan.recoveryGuarantee}</div>
              <div className="pt-1">
                <span className="font-semibold text-slate-900">Automated Rollback Steps:</span>
                <ul className="list-disc list-inside mt-0.5 text-slate-600 space-y-0.5">
                  {currentPackage.rollbackPlan.steps.map((rb, idx) => (
                    <li key={idx}>{rb}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
