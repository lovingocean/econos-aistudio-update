import React, { useState, useEffect, useMemo } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Layers,
  Zap,
  BarChart3,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Eye,
  Lock,
  Globe2,
  Cpu,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Coins,
  DollarSign,
  Share2,
  Compass,
  FileCheck2,
  Scale
} from 'lucide-react';
import {
  SignalStatus,
  MarketRegimeType,
  TimeHorizonType,
  AiMarketViewDecision,
  ConfluenceComponent,
  OrderMicrostructureAnalysis,
  DerivativesAnalysisState,
  OnChainTokenomicsState,
  MacroBtcContextState,
  RealtimeReEvaluationAudit,
  WhatIfStressTestScenario
} from '../../types/cryptoIntelligence';
import { MarketInstrument, RealtimeOrderBook } from '../../types/omnifinExchange';
import { INITIAL_EXCHANGE_INSTRUMENTS, INITIAL_ORDER_BOOK } from '../../data/omnifinExchangeData';
import { cryptoMarketService } from '../../services/cryptoService';
import { cryptoIntelligenceEngine } from '../../services/cryptoIntelligenceEngine';
import { PostPublishStudioModal } from './PostPublishStudioModal';

export const AiCryptoIntelligenceWorkspace: React.FC = () => {
  // Instruments & Live feeds
  const [instruments, setInstruments] = useState<MarketInstrument[]>(INITIAL_EXCHANGE_INSTRUMENTS);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTC-PERP');
  const [orderBook, setOrderBook] = useState<RealtimeOrderBook | null>(INITIAL_ORDER_BOOK);
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizonType>('SHORT_TERM_1_7D');

  // Metadata
  const [feedSource, setFeedSource] = useState<string>('Binance Global Liquidity Feed');
  const [feedLatencyMs, setFeedLatencyMs] = useState<number>(78);
  const [lastUpdate, setLastUpdate] = useState<string>('Just now');
  const [copiedDecision, setCopiedDecision] = useState<boolean>(false);
  const [showPublishStudio, setShowPublishStudio] = useState<boolean>(false);

  // Autonomous Execution Boundary Safety State (Section 38 & 39)
  const [executionSafetyMode, setExecutionSafetyMode] = useState<'ANALYSIS_ONLY' | 'HUMAN_APPROVAL_REQUIRED'>('ANALYSIS_ONLY');
  const [maxLossLimitUsd, setMaxLossLimitUsd] = useState<number>(2500);

  // Active view tab inside Intelligence
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'CONFLUENCE' | 'SCENARIOS' | 'MICROSTRUCTURE' | 'DERIVATIVES_ONCHAIN' | 'STRESS_TEST' | 'AUDIT_LOG'
  >('OVERVIEW');

  // Fetch live market ticks and update instruments & order book continuously
  useEffect(() => {
    let isMounted = true;
    const pollLiveData = async () => {
      const startTime = performance.now();
      try {
        const tickers = await cryptoMarketService.fetchLiveTickers();
        if (!isMounted) return;

        setFeedLatencyMs(Math.round(performance.now() - startTime));
        setFeedSource(cryptoMarketService.getFeedSource());
        setLastUpdate(new Date().toLocaleTimeString());

        if (tickers && tickers.length > 0) {
          setInstruments(prev => cryptoMarketService.updateInstrumentsWithLiveTickers(prev, tickers));
        }

        const book = await cryptoMarketService.fetchOrderBook(selectedSymbol);
        if (book && isMounted) {
          setOrderBook(book);
        }
      } catch (e) {
        console.warn('[IntelligenceWorkspace] Tick poll error:', e);
      }
    };

    pollLiveData();
    const interval = setInterval(pollLiveData, 2500);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedSymbol]);

  // Selected instrument
  const currentInstrument = useMemo(() => {
    return instruments.find(i => i.symbol === selectedSymbol) || instruments[0];
  }, [instruments, selectedSymbol]);

  // BTC reference price for macro cross-asset calculations
  const btcPrice = useMemo(() => {
    const btc = instruments.find(i => i.symbol.includes('BTC'));
    return btc?.lastPrice || 84050;
  }, [instruments]);

  // Run the 45-step Master Intelligence Engine
  const intelligenceReport = useMemo(() => {
    return cryptoIntelligenceEngine.analyzeAsset(
      currentInstrument,
      orderBook,
      timeHorizon,
      btcPrice
    );
  }, [currentInstrument, orderBook, timeHorizon, btcPrice]);

  const { decision, confluenceComponents, microstructure, derivatives, tokenomics, macro, stressTests, recentAudits } =
    intelligenceReport;

  // Copy structured decision text
  const handleCopyReport = () => {
    const text = `=== AI MARKET VIEW (ECONOS OMNIFIN) ===
ASSET: ${decision.assetSymbol} (${decision.assetName})
CURRENT PRICE: $${decision.currentPrice.toLocaleString()}
DIRECTIONAL BIAS: ${decision.directionalBias}
TIME HORIZON: ${decision.timeHorizon}
CONFIDENCE: ${decision.confidencePct}% (Model Uncertainty Aware)
DATA QUALITY: ${decision.dataQuality}
MARKET REGIME: ${decision.marketRegime}
POTENTIAL ENTRY: ${decision.potentialEntryZone ? `$${decision.potentialEntryZone[0].toLocaleString()} - $${decision.potentialEntryZone[1].toLocaleString()}` : 'NO VALID ENTRY CURRENTLY'}
TARGET ZONES: ${decision.targetZones ? `TP1: $${decision.targetZones.tp1.toLocaleString()} | TP2: $${decision.targetZones.tp2.toLocaleString()} | TP3: $${decision.targetZones.tp3.toLocaleString()}` : 'N/A'}
INVALIDATION: ${decision.invalidationLevel ? `$${decision.invalidationLevel.toLocaleString()} (${decision.invalidationCondition})` : 'N/A'}
RISK: ${decision.riskGrade}
RISK/REWARD: ${decision.riskRewardRatio}
STATUS: ${decision.status}

BULL CASE (${decision.bullCase.probability}%): ${decision.bullCase.trigger}
BASE CASE (${decision.baseCase.probability}%): ${decision.baseCase.trigger}
BEAR CASE (${decision.bearCase.probability}%): ${decision.bearCase.trigger}

THESIS CHANGE TRIGGER: ${decision.thesisChangeTrigger}
FEED: ${feedSource} (${feedLatencyMs}ms latency)`;

    navigator.clipboard.writeText(text);
    setCopiedDecision(true);
    setTimeout(() => setCopiedDecision(false), 2500);
  };

  // Status badge style helper
  const getStatusBadge = (status: SignalStatus) => {
    switch (status) {
      case 'POTENTIAL_ENTRY':
        return 'bg-emerald-500 text-slate-950 font-black shadow-xs';
      case 'HOLD_MONITOR':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold';
      case 'WATCH':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold';
      case 'REDUCE_RISK':
        return 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold';
      case 'EXIT_CONDITION':
        return 'bg-rose-500 text-white font-black';
      default:
        return 'bg-slate-800 text-slate-400 border border-slate-700 font-bold';
    }
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      
      {/* 1. TOP HEADER: ASSET & HORIZON BAR WITH LIVE PROVENANCE BADGE */}
      <div className="bg-[#0b1322] border border-slate-800 rounded-3xl p-5 text-white shadow-xl space-y-4">
        
        {/* Strip 1: Title, Feed Provenance, and Uncertainty Disclaimer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white font-mono">
                  AI Crypto Market Intelligence &amp; Signal Engine
                </h2>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                  Continuous Loop v3.4
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Evidence-driven quantitative scenarios &amp; risk/reward analytics. Zero prophecy — pure probabilistic math.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowPublishStudio(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
              title="Create Social Post, Twitter Thread, Substack Memo, or Telegram Alert"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>Create &amp; Publish Post</span>
            </button>

            <div className="flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-emerald-300 shrink-0 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-white uppercase">{feedSource}</span>
              <span className="text-slate-400">({feedLatencyMs}ms • {lastUpdate})</span>
            </div>
          </div>
        </div>

        {/* Strip 2: Asset Chips & Horizon Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono text-xs">
          
          {/* Asset Chips with Live Prices */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {instruments.slice(0, 7).map(inst => {
              const isSelected = inst.symbol === selectedSymbol;
              return (
                <button
                  key={inst.symbol}
                  onClick={() => setSelectedSymbol(inst.symbol)}
                  className={`px-3 py-2 rounded-xl border transition cursor-pointer text-left shrink-0 flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  <span className="font-bold">{inst.baseAsset}</span>
                  <span className={isSelected ? 'text-slate-900 font-black' : 'text-slate-100 font-semibold'}>
                    ${inst.lastPrice >= 1 ? inst.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : inst.lastPrice.toFixed(4)}
                  </span>
                  <span className={`text-[10px] font-bold ${
                    isSelected 
                      ? 'text-slate-950 underline' 
                      : inst.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {inst.change24h >= 0 ? '+' : ''}{inst.change24h}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Time Horizon Selector (Section 22) */}
          <div className="flex items-center gap-1.5 shrink-0 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold px-2">Horizon:</span>
            {[
              { id: 'SCALPING_MINUTES', label: 'Scalp (m)' },
              { id: 'INTRADAY_HOURS', label: 'Intraday (h)' },
              { id: 'SHORT_TERM_1_7D', label: '1-7 Days' },
              { id: 'SWING_1_4W', label: '1-4 Weeks' },
              { id: 'MEDIUM_TERM_1_6M', label: '1-6 Mos' }
            ].map(h => (
              <button
                key={h.id}
                onClick={() => setTimeHorizon(h.id as TimeHorizonType)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  timeHorizon === h.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>

        </div>

        {/* Strip 3: Key Executive Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1 text-xs font-mono">
          
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Signal Status</div>
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-lg text-xs font-black uppercase ${getStatusBadge(decision.status)}`}>
                {decision.status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Directional Bias</div>
            <div className={`text-sm font-black flex items-center gap-1 ${
              decision.directionalBias.includes('BULL') ? 'text-emerald-400' :
              decision.directionalBias.includes('BEAR') ? 'text-rose-400' : 'text-slate-300'
            }`}>
              {decision.directionalBias.includes('BULL') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{decision.directionalBias}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Market Regime</div>
            <div className="text-sm font-black text-cyan-300">
              {decision.marketRegime.replace(/_/g, ' ')}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Confidence Level</div>
            <div className="text-sm font-black text-white flex items-center justify-between">
              <span>{decision.confidencePct}%</span>
              <span className="text-[10px] text-slate-400 font-normal">Quality: {decision.dataQuality}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Risk / Reward</div>
            <div className="text-sm font-black text-amber-300">
              {decision.riskRewardRatio}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Overall Risk</div>
            <div className={`text-sm font-black ${
              decision.riskGrade === 'LOW' ? 'text-emerald-400' :
              decision.riskGrade === 'MODERATE' ? 'text-cyan-300' :
              decision.riskGrade === 'HIGH' ? 'text-amber-400' : 'text-rose-500'
            }`}>
              {decision.riskGrade} RISK
            </div>
          </div>

        </div>

      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
        {[
          { id: 'OVERVIEW', label: '1. AI Market View (Report)', icon: FileCheck2 },
          { id: 'CONFLUENCE', label: '2. 10-Layer Confluence Radar', icon: Scale },
          { id: 'SCENARIOS', label: '3. Bull / Base / Bear Probabilities', icon: Compass },
          { id: 'MICROSTRUCTURE', label: '4. Order Book Microstructure', icon: BarChart3 },
          { id: 'DERIVATIVES_ONCHAIN', label: '5. Derivatives & Tokenomics', icon: Activity },
          { id: 'STRESS_TEST', label: '6. What-If Simulation Sandbox', icon: Zap },
          { id: 'AUDIT_LOG', label: '7. Live Re-Evaluation Log', icon: Clock }
        ].map(t => {
          const Icon = t.icon;
          const isSelected = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB 1: SECTION 41 STANDARDIZED AI MARKET VIEW REPORT */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
          
          {/* Left Column: Standardized Decision Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">
                    Section 41 Standardized AI Decision Output
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Verifiable synthesis adhering to Section 41 master execution format.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPublishStudio(true)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Generate X Thread, Substack Article, Telegram Alert, or Bloomberg Memo"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Publish Alpha Post</span>
                </button>

                <button
                  onClick={handleCopyReport}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  {copiedDecision ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDecision ? 'Copied' : 'Copy Clean Output'}</span>
                </button>
              </div>
            </div>

            {/* Structured Table of Section 41 Decision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">ASSET:</span>
                  <span className="font-bold text-slate-900">{decision.assetSymbol} ({decision.assetName})</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">CURRENT CONDITION:</span>
                  <span className="font-bold text-slate-900">{decision.marketRegime}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">DIRECTIONAL BIAS:</span>
                  <span className="font-bold text-emerald-700">{decision.directionalBias}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">TIME HORIZON:</span>
                  <span className="font-bold text-slate-800">{decision.timeHorizon.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">CONFIDENCE:</span>
                  <span className="font-bold text-blue-700">{decision.confidencePct}% (Uncertainty-Weighted)</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">DATA QUALITY:</span>
                  <span className="font-bold text-emerald-700">{decision.dataQuality} (Multi-Source Verified)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">POTENTIAL ENTRY:</span>
                  <span className="font-bold text-slate-900">
                    {decision.potentialEntryZone 
                      ? `$${decision.potentialEntryZone[0].toLocaleString()} - $${decision.potentialEntryZone[1].toLocaleString()}` 
                      : 'NO VALID ENTRY CURRENTLY'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">TARGET ZONES:</span>
                  <span className="font-bold text-emerald-700">
                    {decision.targetZones 
                      ? `TP1: $${decision.targetZones.tp1.toLocaleString()} | TP2: $${decision.targetZones.tp2.toLocaleString()}` 
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">INVALIDATION:</span>
                  <span className="font-bold text-rose-700">
                    {decision.invalidationLevel ? `$${decision.invalidationLevel.toLocaleString()}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">OVERALL RISK:</span>
                  <span className="font-bold text-slate-900">{decision.riskGrade}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">RISK/REWARD:</span>
                  <span className="font-bold text-blue-700">{decision.riskRewardRatio}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">STATUS:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-black uppercase ${getStatusBadge(decision.status)}`}>
                    {decision.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

            </div>

            {/* Evidence & Contradiction Breakdown (Section 28) */}
            <div className="space-y-4 pt-2">
              <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">
                Evidence Synthesis &amp; Contradiction Audit (Section 28 &amp; 42)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Supporting Evidence */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Supporting Confluence Evidence:</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-emerald-800 list-disc list-inside">
                    {decision.evidenceSummary.supportingEvidence.map((ev, i) => (
                      <li key={i}>{ev}</li>
                    ))}
                  </ul>
                </div>

                {/* Contradicting Evidence (Anti-Confirmation Bias) */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Contradicting Evidence &amp; Headwinds:</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-amber-800 list-disc list-inside">
                    {decision.evidenceSummary.contradictingEvidence.map((ev, i) => (
                      <li key={i}>{ev}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Dynamic Thesis Triggers */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold uppercase tracking-wider">What Would Change The Thesis:</span>
                  <span className="text-slate-400 text-[10px]">Continuous Monitoring</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                  {decision.thesisChangeTrigger}
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Probability Matrix & Execution Safety Boundary */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Probability Breakdown Bar (Section 18) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h3 className="font-black text-slate-900 text-sm flex items-center justify-between">
                <span>Normalized Scenario Probabilities</span>
                <span className="text-[10px] text-blue-600 font-bold">Sum: 100%</span>
              </h3>

              <div className="space-y-3">
                
                {/* Bull Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-emerald-700">Bull Case ({decision.bullCase.probability}%)</span>
                    <span className="text-slate-500">${decision.bullCase.targetRange[0].toLocaleString()} - ${decision.bullCase.targetRange[1].toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${decision.bullCase.probability}%` }} />
                  </div>
                </div>

                {/* Base Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-blue-700">Base Case ({decision.baseCase.probability}%)</span>
                    <span className="text-slate-500">${decision.baseCase.targetRange[0].toLocaleString()} - ${decision.baseCase.targetRange[1].toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${decision.baseCase.probability}%` }} />
                  </div>
                </div>

                {/* Bear Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-rose-700">Bear Case ({decision.bearCase.probability}%)</span>
                    <span className="text-slate-500">${decision.bearCase.targetRange[0].toLocaleString()} - ${decision.bearCase.targetRange[1].toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${decision.bearCase.probability}%` }} />
                  </div>
                </div>

              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500 leading-relaxed font-sans">
                Never present uncertainty as certainty. Probabilities are dynamically weighted by Bayesian multi-signal confluence.
              </div>
            </div>

            {/* Autonomous Trading Boundary Guard (Section 38 & 39) */}
            <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-md p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <h3 className="font-black text-sm text-white">Execution Safety Boundary</h3>
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Analysis signals are separated from order execution. Automated trading requires explicit human policy parameters.
              </p>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Current Mode:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    {executionSafetyMode === 'ANALYSIS_ONLY' ? 'ANALYSIS ONLY (SAFE)' : 'ARMED / HUMAN-IN-THE-LOOP'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Max Loss Guardrail:</span>
                  <span className="text-white font-bold">${maxLossLimitUsd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Slippage Ceiling:</span>
                  <span className="text-cyan-300 font-bold">0.25% (25 bps)</span>
                </div>
              </div>

              <button
                onClick={() => setExecutionSafetyMode(m => m === 'ANALYSIS_ONLY' ? 'HUMAN_APPROVAL_REQUIRED' : 'ANALYSIS_ONLY')}
                className={`w-full py-2.5 rounded-xl font-bold transition cursor-pointer text-xs ${
                  executionSafetyMode === 'ANALYSIS_ONLY'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {executionSafetyMode === 'ANALYSIS_ONLY' ? 'Configure Autonomous Execution Safeguards' : 'Lock to Read-Only Analysis'}
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 4. TAB 2: 10-LAYER CONFLUENCE RADAR (SECTION 43) */}
      {activeTab === 'CONFLUENCE' && (
        <div className="space-y-6 font-mono text-xs">
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-sm">Multi-Signal Confluence Engine (Section 43)</h3>
                <p className="text-[11px] text-slate-500 font-sans">
                  The system never relies on a single indicator. High confluence requires independent verification across all 10 analytical domains.
                </p>
              </div>
              <span className="text-blue-700 font-bold px-3 py-1 rounded-xl bg-blue-50 border border-blue-200">
                10 Layers Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {confluenceComponents.map(comp => (
                <div
                  key={comp.category}
                  className="p-4 rounded-2xl border bg-slate-50/70 border-slate-200 hover:border-slate-300 space-y-2 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-xs">{comp.category}</span>
                      <span className="text-[10px] text-slate-400">(Weight: {comp.weight}%)</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      comp.signal === 'BULLISH' ? 'bg-emerald-100 text-emerald-800' :
                      comp.signal === 'BEARISH' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {comp.signal} ({comp.score > 0 ? `+${comp.score}` : comp.score})
                    </span>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-slate-200/80">
                    <div className="text-[11px] text-slate-700">
                      <strong className="text-emerald-700">Evidence:</strong> {comp.evidence}
                    </div>
                    {comp.contradiction && (
                      <div className="text-[11px] text-slate-500">
                        <strong className="text-amber-700">Contradiction:</strong> {comp.contradiction}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* 5. TAB 3: PROBABILITY-WEIGHTED SCENARIOS (SECTION 18) */}
      {activeTab === 'SCENARIOS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
          
          {/* Bull Case */}
          <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="font-black text-slate-900 text-sm">BULL CASE</h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs">
                {decision.bullCase.probability}%
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Trigger Condition:</div>
                <div className="font-bold text-slate-900 mt-0.5">{decision.bullCase.trigger}</div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Target Range:</div>
                <div className="font-black text-emerald-700 text-sm mt-0.5">
                  ${decision.bullCase.targetRange[0].toLocaleString()} – ${decision.bullCase.targetRange[1].toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Expected Path:</div>
                <div className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{decision.bullCase.expectedPath}</div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">Supporting Evidence:</div>
                <ul className="space-y-1 list-disc list-inside text-slate-600 text-[11px]">
                  {decision.bullCase.supportingEvidence.map((ev, i) => (
                    <li key={i}>{ev}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Base Case */}
          <div className="bg-white rounded-3xl border-2 border-blue-300 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <h3 className="font-black text-slate-900 text-sm">BASE CASE</h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-blue-600 text-white font-black text-xs">
                {decision.baseCase.probability}%
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Trigger Condition:</div>
                <div className="font-bold text-slate-900 mt-0.5">{decision.baseCase.trigger}</div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Target Range:</div>
                <div className="font-black text-blue-700 text-sm mt-0.5">
                  ${decision.baseCase.targetRange[0].toLocaleString()} – ${decision.baseCase.targetRange[1].toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Expected Path:</div>
                <div className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{decision.baseCase.expectedPath}</div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">Supporting Evidence:</div>
                <ul className="space-y-1 list-disc list-inside text-slate-600 text-[11px]">
                  {decision.baseCase.supportingEvidence.map((ev, i) => (
                    <li key={i}>{ev}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bear Case */}
          <div className="bg-white rounded-3xl border-2 border-rose-300 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <h3 className="font-black text-slate-900 text-sm">BEAR CASE</h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-xs">
                {decision.bearCase.probability}%
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Trigger Condition:</div>
                <div className="font-bold text-slate-900 mt-0.5">{decision.bearCase.trigger}</div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Target Range:</div>
                <div className="font-black text-rose-700 text-sm mt-0.5">
                  ${decision.bearCase.targetRange[0].toLocaleString()} – ${decision.bearCase.targetRange[1].toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Expected Path:</div>
                <div className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{decision.bearCase.expectedPath}</div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">Downside Risks:</div>
                <ul className="space-y-1 list-disc list-inside text-slate-600 text-[11px]">
                  {decision.bearCase.risks.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 6. TAB 4: ORDER BOOK MICROSTRUCTURE (SECTION 4) */}
      {activeTab === 'MICROSTRUCTURE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="font-black text-slate-900 text-sm flex items-center justify-between">
              <span>Order Flow &amp; Liquidity Imbalance (Section 4)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                microstructure.anomalyScore === 'NORMAL' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {microstructure.anomalyScore}
              </span>
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Bid / Ask Imbalance Ratio:</span>
                  <span className={`font-black text-sm ${microstructure.bidAskImbalancePct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {microstructure.bidAskImbalancePct >= 0 ? '+' : ''}{microstructure.bidAskImbalancePct}%
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${Math.max(20, Math.min(80, 50 + microstructure.bidAskImbalancePct / 2))}%` }} />
                  <div className="bg-rose-500 h-full flex-1" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Buyer Depth: ${(microstructure.buyPressureUsd / 1000000).toFixed(1)}M</span>
                  <span>Seller Depth: ${(microstructure.sellPressureUsd / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="text-[10px] text-emerald-800 font-bold uppercase">Nearest Bid Wall</div>
                  <div className="font-black text-slate-900 mt-1">${microstructure.nearestBidWall.price.toLocaleString()}</div>
                  <div className="text-[10px] text-emerald-700">${(microstructure.nearestBidWall.volumeUsd / 1000000).toFixed(2)}M resting</div>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
                  <div className="text-[10px] text-rose-800 font-bold uppercase">Nearest Ask Wall</div>
                  <div className="font-black text-slate-900 mt-1">${microstructure.nearestAskWall.price.toLocaleString()}</div>
                  <div className="text-[10px] text-rose-700">${(microstructure.nearestAskWall.volumeUsd / 1000000).toFixed(2)}M resting</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="font-black text-slate-900 text-sm">Execution Quality &amp; Spread Metrics</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Current Market Spread:</span>
                <span className="font-black text-slate-900">{microstructure.spreadBps} bps</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Effective Expected Slippage:</span>
                <span className="font-black text-emerald-700">{microstructure.effectiveSlippageBps} bps (Institutional Grade)</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Absorption Detected:</span>
                <span className={`font-bold ${microstructure.absorptionDetected ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {microstructure.absorptionDetected ? 'Active (Passive Bids Absorbing Market Volume)' : 'None'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-300 text-[11px] leading-relaxed">
                {microstructure.microstructureNotes}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 7. TAB 5: DERIVATIVES & TOKENOMICS (SECTIONS 5, 6, 7) */}
      {activeTab === 'DERIVATIVES_ONCHAIN' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          
          {/* Derivatives Panel */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="font-black text-slate-900 text-sm">Derivatives Leverage &amp; Funding (Section 5)</h3>
            
            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Perpetual Funding Rate (8h):</span>
                <span className={`font-black ${derivatives.fundingRatePct >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  +{derivatives.fundingRatePct}% ({derivatives.fundingAnnualizedPct}% APR)
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Total Open Interest:</span>
                <span className="font-black text-slate-900">
                  ${(derivatives.openInterestUsd / 1000000).toFixed(1)}M ({derivatives.oi24hChangePct > 0 ? '+' : ''}{derivatives.oi24hChangePct}% 24h)
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Long / Short Ratio:</span>
                <span className="font-black text-blue-700">{derivatives.longShortRatio}:1</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Est. Long Liquidation Exposure:</span>
                <span className="font-black text-rose-700">${(derivatives.estimatedLongLiquidationsUsd / 1000000).toFixed(1)}M</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Squeeze Vulnerability:</span>
                <span className="font-bold text-slate-800">{derivatives.squeezeRisk.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          {/* Tokenomics & On-Chain Panel */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="font-black text-slate-900 text-sm">Tokenomics &amp; Whale Inflows (Section 6 &amp; 7)</h3>
            
            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">FDV vs Market Cap Ratio:</span>
                <span className="font-black text-slate-900">{tokenomics.fdvToMcapRatio}x ({tokenomics.supplyRisk.replace(/_/g, ' ')})</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">24h Net Exchange Outflows:</span>
                <span className="font-black text-emerald-700">${(Math.abs(tokenomics.exchangeNetFlow24hUsd) / 1000000).toFixed(1)}M (Cold Storage Outflow)</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Whale Net Flow (24h):</span>
                <span className="font-black text-blue-700">+${(tokenomics.whaleFlow24hNetUsd / 1000000).toFixed(1)}M Net Accumulation</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Top 10 Holders Concentration:</span>
                <span className="font-black text-slate-900">{tokenomics.top10HoldersConcentrationPct}%</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Smart Money Accumulation Score:</span>
                <span className="font-black text-emerald-700">{tokenomics.smartMoneyAccumulationScore} / 100</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 8. TAB 6: WHAT-IF SIMULATION SANDBOX (SECTION 32) */}
      {activeTab === 'STRESS_TEST' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6 font-mono text-xs">
          <div>
            <h3 className="font-black text-slate-900 text-sm">Interactive What-If Stress Testing Engine (Section 32)</h3>
            <p className="text-[11px] text-slate-500 font-sans">
              Simulates portfolio and margin balance resilience under adverse exogenous macro and liquidity shocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stressTests.map(test => (
              <div key={test.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-black text-slate-900 text-xs flex items-center justify-between">
                  <span>{test.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">
                    Survival: {test.survivalProbabilityPct}%
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Simulated Price Impact:</span>
                    <span className="font-bold text-rose-600">{test.simulatedPriceImpactPct}%</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Simulated Drawdown per unit:</span>
                    <span className="font-bold text-slate-900">${test.simulatedDrawdownUsd.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[10px] text-slate-600 leading-relaxed font-sans">
                  {test.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. TAB 7: LIVE RE-EVALUATION LOG (SECTION 29) */}
      {activeTab === 'AUDIT_LOG' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-black text-slate-900 text-sm">Continuous Intelligence &amp; Re-Evaluation Audit Trail (Section 29)</h3>
              <p className="text-[11px] text-slate-500 font-sans">
                Every material confidence shift records which evidence changed and why.
              </p>
            </div>
            <span className="text-[11px] text-blue-700 font-bold px-3 py-1 rounded-xl bg-blue-50 border border-blue-200">
              {recentAudits.length} Dynamic Events
            </span>
          </div>

          {recentAudits.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-sans">
              Signal baseline calibrated. Audits record automatically as live order depth or price ticks shift confidence by ≥2%.
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentAudits.map(audit => (
                <div key={audit.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">{audit.changeReason}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-bold">
                        {audit.statusDelta}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Factor: {audit.evidenceFactorShifted}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <div>{audit.timestamp}</div>
                    <div className="font-bold text-slate-700">{audit.previousConfidence}% → {audit.newConfidence}%</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating Modal: Alpha Publishing & Post Studio */}
      {showPublishStudio && (
        <PostPublishStudioModal
          decision={decision}
          onClose={() => setShowPublishStudio(false)}
        />
      )}

    </div>
  );
};
