import React, { useState } from 'react';
import {
  Compass,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Bot,
  Activity,
  DollarSign,
  Layers,
  Scale
} from 'lucide-react';
import {
  INITIAL_EXECUTIVE_KPIS,
  INITIAL_EXECUTIVE_QUESTIONS,
  INITIAL_MA_DEALS
} from '../../data/econosV2Data';
import { 
  ExecutiveKPI, 
  ExecutiveQuestionAnswer, 
  MaDealPipelineItem 
} from '../../types/econosV2';

export const ExecutiveCommandCenterWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'EXECUTIVE_QUESTIONS' | 'MA_PIPELINE'>('EXECUTIVE_QUESTIONS');
  const [kpis] = useState<ExecutiveKPI[]>(INITIAL_EXECUTIVE_KPIS);
  const [questions] = useState<ExecutiveQuestionAnswer[]>(INITIAL_EXECUTIVE_QUESTIONS);
  const [deals, setDeals] = useState<MaDealPipelineItem[]>(INITIAL_MA_DEALS);
  const [expandedQuestionNum, setExpandedQuestionNum] = useState<number | null>(1);
  const [selectedDealId, setSelectedDealId] = useState<string>('ma-01');
  const [boardAuthorized, setBoardAuthorized] = useState<boolean>(false);

  const selectedDeal = deals.find(d => d.id === selectedDealId) || deals[0];

  const handleAuthorizeDeal = () => {
    setBoardAuthorized(true);
    setDeals(prev => prev.map(d => {
      if (d.id === selectedDealId) {
        return {
          ...d,
          currentStage: 'EXECUTION',
          recommendation: 'ACQUIRE'
        };
      }
      return d;
    }));
  };

  const maStages = [
    'TARGET_DISCOVERY',
    'TARGET_TWIN',
    'FINANCIAL_ANALYSIS',
    'VALUATION',
    'SYNERGY_MODEL',
    'CUSTOMER_SUPPLIER_IMPACT',
    'DEBT_CAPITAL_IMPACT',
    'TAX_ANALYSIS',
    'FINANCING_STRUCTURING',
    'GEOPOLITICAL_REGULATORY',
    'INTEGRATION_RISK',
    'DEAL_SIMULATION',
    'EXECUTIVE_REVIEW',
    'BOARD_CLASS_D_AUTHORIZATION',
    'EXECUTION',
    'POST_MERGER_MONITORING'
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black">
              <Compass className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Executive Strategic Command Center &amp; M&amp;A Intelligence Network
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold uppercase">
              C-Suite &bull; Board Governance
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Strategic decision layer answering the 7 fundamental executive questions. 
            Integrates the 16-stage M&amp;A Intelligence Network around specialist Agent 03 with Class D Board Authorization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-right">
            <div className="text-[10px] text-slate-400">EXECUTIVE CERTAINTY</div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>7/7 Questions Resolved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top C-Suite KPI Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-[10px] text-slate-500 uppercase font-bold truncate">{kpi.label}</div>
            <div className="text-lg font-black text-slate-900">{kpi.value}</div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-emerald-700 font-semibold">{kpi.delta}</span>
              <span className="text-slate-400 truncate max-w-[80px]">{kpi.agentOwner.split(' ')[1]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 rounded-xl text-xs font-mono">
        <button
          onClick={() => setActiveTab('EXECUTIVE_QUESTIONS')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'EXECUTIVE_QUESTIONS'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>The 7 Executive Strategic Questions</span>
        </button>

        <button
          onClick={() => setActiveTab('MA_PIPELINE')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'MA_PIPELINE'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
          <span>M&amp;A Intelligence Network (Agent 03 16-Stage Pipeline)</span>
        </button>
      </div>

      {/* TAB 1: THE 7 EXECUTIVE QUESTIONS */}
      {activeTab === 'EXECUTIVE_QUESTIONS' && (
        <div className="space-y-4 font-mono text-xs">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <span className="text-slate-700 font-bold uppercase text-[11px]">
              Executive Briefing Stream: Closed-Loop Strategic Hierarchy
            </span>
            <span className="text-slate-400 text-[10px]">
              Answers calibrated by Economic Brain &bull; Real-time Digital Twin telemetry
            </span>
          </div>

          <div className="space-y-3">
            {questions.map((q) => {
              const isExpanded = expandedQuestionNum === q.questionNumber;
              return (
                <div 
                  key={q.questionNumber}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition"
                >
                  <button
                    onClick={() => setExpandedQuestionNum(isExpanded ? null : q.questionNumber)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-[#132338] text-amber-400 font-black flex items-center justify-center text-xs shrink-0">
                        Q{q.questionNumber}
                      </div>
                      <div>
                        <div className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                          {q.question}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          {q.headline}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {q.metricBadge && (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 hidden sm:inline">
                          {q.metricBadge}
                        </span>
                      )}
                      {q.governanceClassRequired && (
                        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                          {q.governanceClassRequired}
                        </span>
                      )}
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3">
                      <p className="text-slate-700 leading-relaxed text-xs">
                        {q.subtext}
                      </p>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Underlying Telemetry &amp; Evidence Points
                        </span>
                        <div className="space-y-1">
                          {q.evidencePoints.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-slate-800 text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: M&A INTELLIGENCE NETWORK */}
      {activeTab === 'MA_PIPELINE' && (
        <div className="space-y-6 font-mono text-xs">
          
          {/* Target Selector */}
          <div className="flex flex-wrap gap-2">
            {deals.map((deal) => (
              <button
                key={deal.id}
                onClick={() => setSelectedDealId(deal.id)}
                className={`p-3.5 rounded-xl border text-left transition flex-1 min-w-[280px] ${
                  selectedDealId === deal.id
                    ? 'bg-[#132338] text-white border-[#132338] shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold opacity-70">{deal.industry}</span>
                  <span className="text-[10px] text-amber-400 font-bold">EV: ${(deal.enterpriseValueUsd / 1000000).toFixed(1)}M</span>
                </div>
                <div className="font-bold text-sm mt-1">{deal.targetCompanyName}</div>
                <div className="text-[10px] opacity-70 mt-0.5">
                  Current Stage: {(deal.currentStage || '').replace(/_/g, ' ')}
                </div>
              </button>
            ))}
          </div>

          {/* Detailed 16-Stage Pipeline Viewer */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            
            {/* Deal Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{selectedDeal.targetCompanyName}</h3>
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                    Class D (Board Auth Required)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Specialist: Agent 03
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">
                  Revenue: ${(selectedDeal.revenueUsd / 1000000).toFixed(1)}M &bull; EBITDA: ${(selectedDeal.ebitdaUsd / 1000000).toFixed(1)}M &bull; Pro-Forma WACC: {selectedDeal.postMergerWacc}%
                </p>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-[10px] text-slate-400">COST SYNERGIES</div>
                  <div className="text-sm font-bold text-emerald-700">+${(selectedDeal.projectedCostSynergiesUsd / 1000000).toFixed(2)}M</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">REVENUE SYNERGIES</div>
                  <div className="text-sm font-bold text-indigo-700">+${(selectedDeal.projectedRevenueSynergiesUsd / 1000000).toFixed(2)}M</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">INTEGRATION RISK</div>
                  <div className="text-sm font-bold text-slate-800">{selectedDeal.integrationRiskScore}/100</div>
                </div>
              </div>
            </div>

            {/* 16-Stage Visual Stepper */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                16-Stage M&amp;A Execution Pipeline
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 text-[9px]">
                {maStages.map((stage, idx) => {
                  const currentIdx = maStages.indexOf(selectedDeal.currentStage);
                  const isDone = idx <= currentIdx;
                  const isCurrent = stage === selectedDeal.currentStage;
                  return (
                    <div 
                      key={stage}
                      className={`p-2 rounded-lg border text-center transition ${
                        isCurrent
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 ring-1 ring-amber-500'
                          : isDone
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                      title={stage}
                    >
                      <div className="font-bold opacity-70">0{idx + 1}</div>
                      <div className="truncate mt-0.5">{(stage || '').replace(/_/g, ' ')}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Board Class D Authorization Box */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>CLASS D / BOARD AUTHORIZATION REQUIRED</span>
                </div>
                <p className="text-slate-400 text-xs">
                  M&amp;A capital commitments over $10M require multi-signature cryptographic board sign-off before dispatching tender offer.
                </p>
              </div>

              <button
                onClick={handleAuthorizeDeal}
                disabled={boardAuthorized}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  boardAuthorized 
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                }`}
              >
                {boardAuthorized ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Board Authorized &bull; Deal Dispatched</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Sign Board Authorization (Class D)</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
