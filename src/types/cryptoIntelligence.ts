export type SignalStatus = 
  | 'WATCH'
  | 'POTENTIAL_ENTRY'
  | 'HOLD_MONITOR'
  | 'REDUCE_RISK'
  | 'EXIT_CONDITION'
  | 'NO_SETUP_INSUFFICIENT_DATA';

export type MarketRegimeType =
  | 'STRONG_BULL'
  | 'BULL'
  | 'NEUTRAL'
  | 'RANGE'
  | 'BEAR'
  | 'STRONG_BEAR'
  | 'HIGH_VOLATILITY'
  | 'PANIC'
  | 'RECOVERY'
  | 'TRANSITION';

export type TimeHorizonType =
  | 'SCALPING_MINUTES'
  | 'INTRADAY_HOURS'
  | 'SHORT_TERM_1_7D'
  | 'SWING_1_4W'
  | 'MEDIUM_TERM_1_6M'
  | 'LONG_TERM_6M_PLUS';

export type DataQualityGrade = 'HIGH' | 'MEDIUM' | 'LOW';

export type OverallRiskGrade = 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';

export type AnomalyLevel = 'NORMAL' | 'UNUSUAL' | 'HIGHLY_UNUSUAL' | 'POTENTIAL_MANIPULATION_RISK';

export interface ConfluenceComponent {
  category: 
    | 'TECHNICAL'
    | 'VOLUME'
    | 'ORDER_FLOW'
    | 'DERIVATIVES'
    | 'ON_CHAIN'
    | 'TOKENOMICS'
    | 'SENTIMENT'
    | 'NEWS_EVENTS'
    | 'MACRO'
    | 'MARKET_REGIME';
  score: number; // -100 to +100
  signal: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  weight: number;
  evidence: string;
  contradiction: string;
}

export interface ScenarioDetail {
  probability: number; // 0 - 100
  trigger: string;
  expectedPath: string;
  targetRange: [number, number];
  supportingEvidence: string[];
  risks: string[];
}

export interface OrderMicrostructureAnalysis {
  bidAskImbalancePct: number; // e.g. +14.2% buyer dominance
  buyPressureUsd: number;
  sellPressureUsd: number;
  spreadBps: number;
  effectiveSlippageBps: number;
  nearestBidWall: { price: number; volumeUsd: number };
  nearestAskWall: { price: number; volumeUsd: number };
  absorptionDetected: boolean;
  liquiditySwept: boolean;
  anomalyScore: AnomalyLevel;
  microstructureNotes: string;
}

export interface DerivativesAnalysisState {
  fundingRatePct: number;
  fundingAnnualizedPct: number;
  fundingCondition: 'EXTREME_POSITIVE' | 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'EXTREME_NEGATIVE';
  openInterestUsd: number;
  oi24hChangePct: number;
  oiPriceDivergence: 'NONE' | 'BULLISH_DIVERGENCE' | 'BEARISH_DIVERGENCE' | 'LEVERAGE_EXPANSION';
  longShortRatio: number;
  estimatedLongLiquidationsUsd: number;
  estimatedShortLiquidationsUsd: number;
  squeezeRisk: 'NONE' | 'POTENTIAL_SHORT_SQUEEZE' | 'POTENTIAL_LONG_SQUEEZE';
}

export interface OnChainTokenomicsState {
  circulatingSupply: number;
  totalSupply: number;
  fdvUsd: number;
  marketCapUsd: number;
  fdvToMcapRatio: number;
  supplyRisk: 'LOW_SUPPLY_RISK' | 'MEDIUM_SUPPLY_RISK' | 'HIGH_SUPPLY_RISK';
  upcomingUnlockDate?: string;
  upcomingUnlockAmountUsd?: number;
  whaleFlow24hNetUsd: number; // positive = net inflow/accumulation
  exchangeNetFlow24hUsd: number; // negative = outflow from exchanges (bullish accumulation)
  top10HoldersConcentrationPct: number;
  smartMoneyAccumulationScore: number; // 0 to 100
}

export interface MacroBtcContextState {
  btcPrice: number;
  btcTrend: 'BULLISH' | 'NEUTRAL' | 'BEARISH';
  btcDominancePct: number;
  ethBtcRatio: number;
  dxyDollarIndex: number;
  us10yTreasuryYield: number;
  globalLiquidityCondition: 'EXPANDING' | 'NEUTRAL' | 'CONTRACTING';
  riskAppetite: 'RISK_ON' | 'NEUTRAL' | 'RISK_OFF';
}

export interface AiMarketViewDecision {
  assetSymbol: string;
  assetName: string;
  currentPrice: number;
  directionalBias: 'BULLISH' | 'MODERATELY_BULLISH' | 'NEUTRAL' | 'MODERATELY_BEARISH' | 'BEARISH' | 'NO_BIAS';
  timeHorizon: TimeHorizonType;
  confidencePct: number;
  dataQuality: DataQualityGrade;
  marketRegime: MarketRegimeType;
  potentialEntryZone: [number, number] | null;
  targetZones: {
    tp1: number;
    tp2: number;
    tp3: number;
  } | null;
  invalidationLevel: number | null;
  invalidationCondition: string;
  riskGrade: OverallRiskGrade;
  riskRewardRatio: string;
  bullCase: ScenarioDetail;
  baseCase: ScenarioDetail;
  bearCase: ScenarioDetail;
  keyCatalysts: string[];
  biggestRisks: string[];
  thesisChangeTrigger: string;
  status: SignalStatus;
  evidenceSummary: {
    whySignalExists: string;
    supportingEvidence: string[];
    contradictingEvidence: string[];
    whatMarketIsPricing: string;
    whatMustHappenToStrengthen: string;
    whatMustHappenToWeaken: string;
    missingDataCaveats: string[];
  };
}

export interface RealtimeReEvaluationAudit {
  id: string;
  timestamp: string;
  previousConfidence: number;
  newConfidence: number;
  changeReason: string;
  evidenceFactorShifted: string;
  statusDelta: string;
}

export interface WhatIfStressTestScenario {
  id: string;
  name: string;
  btcPriceShiftPct: number;
  volatilityExpansionPct: number;
  fundingSurgeBps: number;
  tokenUnlockSellPressureUsd: number;
  simulatedPriceImpactPct: number;
  simulatedDrawdownUsd: number;
  survivalProbabilityPct: number;
  notes: string;
}
