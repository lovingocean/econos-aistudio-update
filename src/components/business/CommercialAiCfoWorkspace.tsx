import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  TrendingUp, 
  ShieldAlert, 
  HelpCircle,
  FileText,
  Calendar,
  Clock,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { DailyTreasuryBriefing, TreasuryAnomalyAlert, AiCfoChatMessage } from '../../types/enterprise-ops';

interface Props {
  onNavigateToTreasury?: () => void;
  onNavigateToInvoices?: () => void;
  onNavigateToCashFlow?: () => void;
}

const INITIAL_BRIEFING: DailyTreasuryBriefing = {
  id: 'brf_today_01',
  date: '2026-09-20',
  headline: 'Strong Liquidity Baseline: $1,428,500 Cash on Hand (18.4 Months Runway)',
  netCashFlow24hUsd: 14500,
  currentLiquidityUsd: 1428500,
  runwayMonths: 18.4,
  yieldEarned24hUsd: 194.20,
  overnightMovements: {
    inflowsUsd: 38200,
    outflowsUsd: 23700,
    pendingWiresCount: 3
  },
  keyActionItems: [
    'Execute recommended overnight Treasury Yield Sweep of $450,000 into 5.12% Treasury Bills to capture +$23,040/yr annualized interest.',
    '2 High-value customer invoices (Global Logix $34,200 & Horizon $18,900) approach day 28 of Net-30; send automated gentle early settlement reminder.',
    'Review flagged AWS Compute invoice variance (+18% above 3-month trailing moving average).'
  ],
  anomaliesDetectedCount: 2,
  aiCommentary: 'Overall cash velocity is robust. Operating cash burn remains disciplined at $77,600/mo against trailing 3-month collections. Primary risk vector is customer concentration: Apex Dynamics accounts for 28% of open accounts receivable.',
  confidenceScore: 98.4
};

const INITIAL_ANOMALIES: TreasuryAnomalyAlert[] = [
  {
    id: 'anom_01',
    type: 'PRICE_ESCALATION',
    title: 'Cloud Infrastructure Spike Detected',
    description: 'AWS September usage is pacing at $28,450 (+18.2% variance vs August baseline). GPU cluster utilization unflagged after dev simulation benchmark.',
    severity: 'HIGH',
    detectedAt: '2026-09-20 03:14 UTC',
    financialImpactUsd: 4380,
    status: 'OPEN',
    counterparty: 'Amazon Web Services Inc.',
    recommendedAction: 'Apply Spot Instance reservation caps or auto-idle staging GPU nodes.'
  },
  {
    id: 'anom_02',
    type: 'COLLECTION_STALL',
    title: 'DSO Aging Anomaly: Helios Energy Corp',
    description: 'Invoice INV-2026-042 ($24,800) has exceeded typical payment cycle (historical average 14 days vs current 36 days).',
    severity: 'MEDIUM',
    detectedAt: '2026-09-19 18:40 UTC',
    financialImpactUsd: 24800,
    status: 'INVESTIGATING',
    counterparty: 'Helios Energy Corp',
    recommendedAction: 'Trigger autonomous friendly escalation to AP controller with direct ACH pay link.'
  },
  {
    id: 'anom_03',
    type: 'DUPLICATE_INVOICE',
    title: 'Potential Duplicate Software Vendor Charge',
    description: 'Datadog Annual Platform renewal was matched against both credit card charge and pending AP ACH wire.',
    severity: 'CRITICAL',
    detectedAt: '2026-09-18 11:22 UTC',
    financialImpactUsd: 12000,
    status: 'RESOLVED',
    counterparty: 'Datadog Inc.',
    recommendedAction: 'Canceled scheduled ACH wire; settled cleanly via Corporate Brex card.'
  }
];

const INITIAL_MESSAGES: AiCfoChatMessage[] = [
  {
    id: 'msg_01',
    sender: 'AI_CFO',
    timestamp: '08:30 AM',
    text: 'Good morning! I have prepared your Daily Treasury & Cash Intelligence Briefing for September 20, 2026. Current cash stands at $1,428,500 across operating accounts with 18.4 months of runway. Would you like me to analyze potential burn scenarios or execute your $450k overnight treasury sweep?',
    suggestedPrompts: [
      'What happens if our top customer delays payment by 45 days?',
      'How much interest can we capture by sweeping idle cash?',
      'Draft a 2-paragraph board memo on our Q3 Gross Margin variance'
    ]
  }
];

export const CommercialAiCfoWorkspace: React.FC<Props> = ({
  onNavigateToTreasury,
  onNavigateToInvoices,
  onNavigateToCashFlow
}) => {
  const [briefing] = useState<DailyTreasuryBriefing>(INITIAL_BRIEFING);
  const [anomalies, setAnomalies] = useState<TreasuryAnomalyAlert[]>(INITIAL_ANOMALIES);
  const [messages, setMessages] = useState<AiCfoChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'BRIEFING' | 'COPILOT' | 'ANOMALIES'>('BRIEFING');

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: AiCfoChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'USER',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let replyText = '';
      let actionRec: any = undefined;

      const lower = query.toLowerCase();
      if (lower.includes('delay') || lower.includes('what happens') || lower.includes('top customer')) {
        replyText = `**Stochastic Stress Impact Analysis**:
If our top customer (Apex Dynamics, $58,000 monthly ARR) delays payment by 45 days:
• **Runway Contraction**: Net cash runway contracts by **-1.4 months** (from 18.4 to 17.0 months).
• **Lowest Liquidity Trough**: Cash trough shifts from month 6 to month 4, reaching a low of $1,180,000.
• **Solvency Probability**: 12-month survival remains resilient at **98.2%**, well above our 90% risk policy floor.
• **Recommended Countermeasure**: Offer a dynamic 1.5% 10-day early settlement discount to incentivize immediate ACH release.`;
        actionRec = {
          type: 'INVOICE_FOLLOWUP',
          label: 'Deploy Dynamic 1.5% Settlement Offer',
          payload: { invoiceId: 'inv_top_customer' }
        };
      } else if (lower.includes('interest') || lower.includes('sweep') || lower.includes('idle')) {
        replyText = `**Treasury Yield Optimization**:
• Idle Operating Checking: **$680,000** yielding 0.05% APY.
• Proposed Sweep: **$450,000** allocated into 30-day US Treasury Bills yielding **5.12% APY**.
• **Incremental Yield**: Generates **+$23,040 in risk-free annualized yield** (+$1,920/month) with zero disruption to the $77k/mo payroll buffer.
• Dual-control signature requirements: Initiable immediately by Treasury Operator, requiring secondary Controller sign-off.`;
        actionRec = {
          type: 'SWEEP',
          label: 'Initiate $450,000 Dual-Control Sweep',
          payload: { amount: 450000, target: 'US_TREASURY_BILLS' }
        };
      } else if (lower.includes('board') || lower.includes('memo') || lower.includes('gross margin')) {
        replyText = `**Executive Board Memorandum — Q3 Margin Analysis**:

**To**: Board of Directors & Audit Committee  
**From**: Office of the CFO  
**Date**: September 20, 2026  
**Subject**: Q3 Gross Margin Performance & Operating Leverage  

"In Q3 2026, ECONOS delivered an expanded Gross Margin of **78.4%**, up +320 bps quarter-over-quarter. Key margin drivers include:
1. **Hosting & Inference Efficiency**: Migration to reserved GPU clusters and autonomous cache tiering compressed COGS by 14.1%.
2. **Expansion Economics**: Net Revenue Retention (NRR) reached 124% across enterprise tier customers with negligible incremental customer onboarding expense.
3. **Liquidity Position**: Fully capitalized with 18.4 months of runway; zero external venture debt required."`;
      } else {
        replyText = `**AI CFO Assessment**:  
Based on our real-time double-entry ledger and trailing 90-day cash velocity:
• Liquidity is in the **Top 5th Percentile** for SaaS companies at this scale.
• Operating efficiency: Rule of 40 score is **48.2%** (34% YoY growth + 14.2% free cash flow margin).
• DSO is healthy at **24.2 days** (industry benchmark 45 days).  
How else may I assist with board decks, scenario modeling, or vendor negotiation strategy?`;
      }

      const aiMsg: AiCfoChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'AI_CFO',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: replyText,
        actionRecommendation: actionRec,
        suggestedPrompts: [
          'Review our top 5 software vendor contracts',
          'Calculate our CAC Payback Period & Magic Number',
          'Show currency exposure in EUR and GBP'
        ]
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 700);
  };

  const handleResolveAnomaly = (id: string) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, status: 'RESOLVED' } : a));
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
              AUTONOMOUS AI CFO ENGINE
            </span>
            <span className="text-slate-400 text-xs font-mono">• Gemini 3.8 Flash Financial Core</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span>AI CFO Copilot & Daily Treasury Intelligence</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time morning liquidity briefings, proactive anomaly & fraud surveillance, and natural-language financial modeling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono font-medium">
            <button
              onClick={() => setActiveSubTab('BRIEFING')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeSubTab === 'BRIEFING' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Morning Briefing
            </button>
            <button
              onClick={() => setActiveSubTab('COPILOT')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                activeSubTab === 'COPILOT' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Interactive Copilot</span>
            </button>
            <button
              onClick={() => setActiveSubTab('ANOMALIES')}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
                activeSubTab === 'ANOMALIES' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Anomalies ({anomalies.filter(a => a.status === 'OPEN').length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB: BRIEFING */}
      {activeSubTab === 'BRIEFING' && (
        <div className="space-y-6">
          {/* Key KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Current Liquidity</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                ${briefing.currentLiquidityUsd.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>+${briefing.netCashFlow24hUsd.toLocaleString()} net 24h inflow</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Runway Buffer</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                {briefing.runwayMonths} Mo
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                At baseline burn of $77,600/mo
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">24h Treasury Yield</span>
              <div className="text-2xl font-bold font-mono text-indigo-700 mt-1">
                +${briefing.yieldEarned24hUsd.toFixed(2)}
              </div>
              <div className="text-[11px] font-mono text-indigo-600 mt-1 font-medium">
                5.12% APY active sweep protocol
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Anomalies Under Watch</span>
              <div className="text-2xl font-bold font-mono text-amber-600 mt-1">
                {briefing.anomaliesDetectedCount} Active
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                1 Price Escalation • 1 Collection Lag
              </div>
            </div>
          </div>

          {/* AI Executive Commentary Card */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-200/80 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between gap-2 border-b border-indigo-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    EXECUTIVE TREASURY MEMORANDUM • {briefing.date}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Telemetry Confidence: {briefing.confidenceScore}% • All bank feeds validated
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                LIQUIDITY: PRISTINE
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 text-sm">
                {briefing.headline}
              </p>
              <p>
                {briefing.aiCommentary}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-indigo-100/80">
              <h4 className="text-xs font-bold font-mono uppercase text-slate-700 mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Autonomous Action Items For Today</span>
              </h4>
              <div className="space-y-2.5">
                {briefing.keyActionItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-white/90 border border-indigo-100 text-xs text-slate-800 shadow-2xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => setActiveSubTab('COPILOT')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Interactive Copilot Session</span>
              </button>
              {onNavigateToTreasury && (
                <button
                  onClick={onNavigateToTreasury}
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5"
                >
                  <span>Review Treasury Sweeps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB: COPILOT */}
      {activeSubTab === 'COPILOT' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Chat Window */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl flex flex-col h-[650px] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-mono text-slate-900 uppercase">AI CFO Live Session</h3>
                  <span className="text-[10px] text-emerald-600 font-mono font-medium">Connected to Real-Time General Ledger</span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Context: USD Operating Portfolio</span>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 mb-1 px-1">
                    <span>{msg.sender === 'USER' ? 'You (Meek Ifti)' : 'AI CFO Engine'}</span>
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div className={`p-4 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'USER'
                      ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none whitespace-pre-wrap'
                  }`}>
                    {msg.text}

                    {msg.actionRecommendation && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80">
                        <button
                          onClick={() => {
                            if (msg.actionRecommendation?.type === 'SWEEP' && onNavigateToTreasury) {
                              onNavigateToTreasury();
                            } else if (msg.actionRecommendation?.type === 'INVOICE_FOLLOWUP' && onNavigateToInvoices) {
                              onNavigateToInvoices();
                            }
                          }}
                          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-mono font-bold hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-2xs"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>{msg.actionRecommendation.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[85%]">
                      {msg.suggestedPrompts.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-2.5 py-1 rounded-full bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-mono transition text-left"
                        >
                          + {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 p-2">
                  <Bot className="w-4 h-4 animate-spin text-indigo-600" />
                  <span>AI CFO analyzing general ledger and monte carlo trajectories...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask financial question, request scenario projections, or draft board reports..."
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isThinking}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Reference Telemetry */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <h3 className="text-xs font-mono uppercase text-slate-700 font-bold mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Executive Command Presets</span>
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSendMessage('Draft a 2-paragraph board memo on our Q3 Gross Margin variance')}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-xs font-mono text-slate-700 transition"
                >
                  <div className="font-bold text-indigo-900">Q3 Board Memo Draft</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Generates audit committee briefing on gross margins & expansion</div>
                </button>

                <button
                  onClick={() => handleSendMessage('What happens if our top customer delays payment by 45 days?')}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-xs font-mono text-slate-700 transition"
                >
                  <div className="font-bold text-indigo-900">Top Customer Default Stress</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Models DSO collection lag against payroll requirements</div>
                </button>

                <button
                  onClick={() => handleSendMessage('How much interest can we capture by sweeping idle cash?')}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-xs font-mono text-slate-700 transition"
                >
                  <div className="font-bold text-indigo-900">Treasury Sweep Yield Analysis</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Calculates risk-free US T-Bill annualized capture</div>
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono space-y-2">
              <div className="text-slate-900 font-bold uppercase text-[11px]">Guardrail Protocol</div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                The AI CFO operates under non-custodial read-and-recommend guidelines. All disbursements, wire authorizations, and ledger updates require human dual-control countersignature before settlement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB: ANOMALIES */}
      {activeSubTab === 'ANOMALIES' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="text-sm font-bold font-mono text-slate-900">Proactive Anomaly & Fraud Guard</h3>
                <p className="text-xs text-slate-500">Autonomous pattern checks evaluating duplicate wires, runaway vendor bills, and collection halts.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              {anomalies.filter(a => a.status !== 'RESOLVED').length} Open Incidents
            </span>
          </div>

          <div className="space-y-3">
            {anomalies.map(anom => (
              <div 
                key={anom.id}
                className={`p-5 rounded-xl border bg-white shadow-xs transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  anom.status === 'RESOLVED' 
                    ? 'border-slate-200 opacity-60 bg-slate-50/60'
                    : anom.severity === 'CRITICAL'
                      ? 'border-rose-300 bg-rose-50/20'
                      : anom.severity === 'HIGH'
                        ? 'border-amber-300 bg-amber-50/20'
                        : 'border-blue-200'
                }`}
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      anom.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                      anom.severity === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {anom.severity}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-900">{anom.title}</span>
                    <span className="text-[11px] font-mono text-slate-400">• {anom.detectedAt}</span>
                  </div>
                  <p className="text-xs text-slate-600">{anom.description}</p>
                  <div className="flex items-center gap-4 text-xs font-mono pt-1">
                    <span className="text-slate-500">Counterparty: <strong className="text-slate-800">{anom.counterparty}</strong></span>
                    <span className="text-slate-500">Exposure: <strong className="text-rose-600">${anom.financialImpactUsd.toLocaleString()}</strong></span>
                  </div>
                  <div className="text-xs text-indigo-900 font-mono bg-indigo-50/80 p-2 rounded border border-indigo-100 mt-2">
                    💡 <strong>Action:</strong> {anom.recommendedAction}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  {anom.status !== 'RESOLVED' ? (
                    <button
                      onClick={() => handleResolveAnomaly(anom.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-mono font-medium rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Mitigated</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
