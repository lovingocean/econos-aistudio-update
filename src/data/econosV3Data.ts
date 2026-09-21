// ECONOS Sovereign Operating System - V3 Data & Layer Specifications
// Layers 11, 12, 13, 14, and 16

// ==========================================
// LAYER 11: AUTONOMOUS EXECUTION & BANKING RAILS
// ==========================================

export interface BankingRail {
  id: string;
  name: string;
  protocol: 'ISO_20022' | 'FEDNOW' | 'SWIFT_GPI' | 'ACH_NACHA' | 'PLAID_CORE' | 'STRIPE_SOVEREIGN';
  status: 'ONLINE' | 'STANDBY' | 'DEGRADED';
  settlementSpeed: string;
  dailyCapacityUsd: number;
  allocatedTodayUsd: number;
  latencyMs: number;
  dualKeyEnforced: boolean;
  endpoint: string;
}

export interface ErpBridgeConnector {
  id: string;
  system: 'SAP S/4HANA' | 'ORACLE NETSUITE' | 'WORKDAY FINANCIALS' | 'QUICKBOOKS ENTERPRISE';
  protocol: string;
  syncMode: 'BI_DIRECTIONAL_STREAM' | 'EVENT_DRIVEN_WEBHOOK' | 'BATCH_SETTLEMENT';
  status: 'ACTIVE_SYNC' | 'IDLE' | 'PAUSED';
  lastSyncTimestamp: string;
  reconciliationDelta: number;
  unpostedQueueCount: number;
}

export interface ExecutionOrder {
  id: string;
  orderNumber: string;
  title: string;
  proposingAgent: string;
  category: 'TREASURY_SWEEP' | 'SUPPLIER_DISCOUNTING' | 'FX_FORWARD_COLLAR' | 'PAYROLL_ESCROW' | 'WORKING_CAPITAL_DRAWDOWN';
  amountUsd: number;
  rail: string;
  targetAccount: string;
  governanceClass: 'CLASS_A' | 'CLASS_B' | 'CLASS_C' | 'CLASS_D';
  signersRequired: string[];
  signersApproved: string[];
  merkleProofHash: string;
  status: 'READY_TO_DISPATCH' | 'DISPATCHED' | 'SETTLED' | 'ROLLED_BACK';
  rollbackAvailable: boolean;
  rollbackWindowMinutes: number;
  dispatchedAt?: string;
  settledAt?: string;
  compensationPlan: string;
}

export const MOCK_BANKING_RAILS: BankingRail[] = [
  {
    id: 'rail-fednow',
    name: 'FedNow Instant Clearing Rail',
    protocol: 'FEDNOW',
    status: 'ONLINE',
    settlementSpeed: '< 2.5 seconds',
    dailyCapacityUsd: 25000000,
    allocatedTodayUsd: 4820000,
    latencyMs: 145,
    dualKeyEnforced: true,
    endpoint: 'fednow://gateway.frb.econos.internal/v2/clearing'
  },
  {
    id: 'rail-iso20022',
    name: 'JPMorgan Chase Wholesale ISO 20022',
    protocol: 'ISO_20022',
    status: 'ONLINE',
    settlementSpeed: 'Real-time Gross Settlement (RTGS)',
    dailyCapacityUsd: 100000000,
    allocatedTodayUsd: 18450000,
    latencyMs: 220,
    dualKeyEnforced: true,
    endpoint: 'iso20022://jpm.wholesale.node/camt.053'
  },
  {
    id: 'rail-swift',
    name: 'SWIFT gpi Cross-Border Treasury Rail',
    protocol: 'SWIFT_GPI',
    status: 'ONLINE',
    settlementSpeed: '12 - 45 minutes (Cross-border FX)',
    dailyCapacityUsd: 50000000,
    allocatedTodayUsd: 9120000,
    latencyMs: 580,
    dualKeyEnforced: true,
    endpoint: 'swift://swiftnet.sipn.econos-corp/mt103_pacs008'
  },
  {
    id: 'rail-ach',
    name: 'NACHA Same-Day Automated Clearing House',
    protocol: 'ACH_NACHA',
    status: 'ONLINE',
    settlementSpeed: 'Same-Day Batch (13:00 / 17:00 EST)',
    dailyCapacityUsd: 15000000,
    allocatedTodayUsd: 1200000,
    latencyMs: 82,
    dualKeyEnforced: false,
    endpoint: 'nacha://us-east.ach-core.svb-bridge/direct'
  }
];

export const MOCK_ERP_BRIDGES: ErpBridgeConnector[] = [
  {
    id: 'erp-sap',
    system: 'SAP S/4HANA',
    protocol: 'RFC / BAPI_ACC_DOCUMENT_POST via SAP Gateway',
    syncMode: 'BI_DIRECTIONAL_STREAM',
    status: 'ACTIVE_SYNC',
    lastSyncTimestamp: '2 mins ago',
    reconciliationDelta: 0.00,
    unpostedQueueCount: 0
  },
  {
    id: 'erp-netsuite',
    system: 'ORACLE NETSUITE',
    protocol: 'SuiteTalk 2024.2 REST Web Services & TBA Token',
    syncMode: 'EVENT_DRIVEN_WEBHOOK',
    status: 'ACTIVE_SYNC',
    lastSyncTimestamp: 'Just now',
    reconciliationDelta: 0.00,
    unpostedQueueCount: 0
  },
  {
    id: 'erp-workday',
    system: 'WORKDAY FINANCIALS',
    protocol: 'Workday RaaS & Enterprise Interface Builder (EIB)',
    syncMode: 'BATCH_SETTLEMENT',
    status: 'ACTIVE_SYNC',
    lastSyncTimestamp: '14 mins ago',
    reconciliationDelta: 0.00,
    unpostedQueueCount: 0
  }
];

export const INITIAL_EXECUTION_ORDERS: ExecutionOrder[] = [
  {
    id: 'ord-881',
    orderNumber: 'ORD-2026-0881',
    title: 'Automated Tier-1 Supplier Dynamic Discounting Capture',
    proposingAgent: 'Agent 12 (Working Capital & AP Optimization)',
    category: 'SUPPLIER_DISCOUNTING',
    amountUsd: 185400,
    rail: 'FedNow Instant Clearing Rail',
    targetAccount: 'Apex Silicon Fabricators Inc. (JPMorgan Chase ****4918)',
    governanceClass: 'CLASS_B',
    signersRequired: ['VP Finance (Sarah Lin)', 'Agent 12 Sovereign Key'],
    signersApproved: ['VP Finance (Sarah Lin)', 'Agent 12 Sovereign Key'],
    merkleProofHash: '0x4f82a9bc3101e488d019fba24300a87611c9ea531b7908b29ff0891a27e77b42',
    status: 'READY_TO_DISPATCH',
    rollbackAvailable: true,
    rollbackWindowMinutes: 120,
    compensationPlan: 'Immediate reversal hook via FedNow PACS.004 returns funds within 180s if invoice validation hash fails.'
  },
  {
    id: 'ord-882',
    orderNumber: 'ORD-2026-0882',
    title: 'Surplus Operating Liquidity Overnight Treasury Bill Sweep',
    proposingAgent: 'Agent 19 (Treasury & Cash Yield Maximizer)',
    category: 'TREASURY_SWEEP',
    amountUsd: 1250000,
    rail: 'JPMorgan Chase Wholesale ISO 20022',
    targetAccount: 'US Treasury Direct Institutional Custody (Account #US-TREAS-8812)',
    governanceClass: 'CLASS_C',
    signersRequired: ['CFO (Michael Chang)', 'CEO Dual-Key Co-Signer', 'Agent 19 Key'],
    signersApproved: ['CFO (Michael Chang)', 'Agent 19 Key'],
    merkleProofHash: '0x9923b7e42d8f990112c30089fab2038167ac4005b871c89012356d78a9912be5',
    status: 'READY_TO_DISPATCH',
    rollbackAvailable: true,
    rollbackWindowMinutes: 60,
    compensationPlan: 'Auto-liquidation of overnight reverse-repo tranche at 08:30 EST next business cycle.'
  },
  {
    id: 'ord-883',
    orderNumber: 'ORD-2026-0883',
    title: 'EUR/USD Hedging Forward Collar Execution (EUR 3.5M)',
    proposingAgent: 'Agent 07 (FX Volatility & Currency Shield)',
    category: 'FX_FORWARD_COLLAR',
    amountUsd: 420000,
    rail: 'SWIFT gpi Cross-Border Treasury Rail',
    targetAccount: 'BNP Paribas Paris Wholesale Escrow (FR76 3000 4012 **** 9912)',
    governanceClass: 'CLASS_C',
    signersRequired: ['CFO (Michael Chang)', 'Risk Committee Chair', 'Agent 07 Key'],
    signersApproved: ['CFO (Michael Chang)', 'Risk Committee Chair', 'Agent 07 Key'],
    merkleProofHash: '0x77c901eef2a8b301c448d9012a84bb556019ceef44208a113bba490918ef0091',
    status: 'SETTLED',
    rollbackAvailable: false,
    rollbackWindowMinutes: 0,
    dispatchedAt: '2026-09-17 08:14:22 UTC',
    settledAt: '2026-09-17 08:29:45 UTC',
    compensationPlan: 'Contractual unwinding via counter-party swap if underlying invoice canceled.'
  }
];

// ==========================================
// LAYER 12: CRYPTOGRAPHIC DECISION LEDGER
// ==========================================

export interface DecisionBlock {
  blockNumber: number;
  blockHash: string;
  previousHash: string;
  timestamp: string;
  proposingAgentId: number;
  proposingAgentName: string;
  decisionTitle: string;
  governanceClass: string;
  approverPublicKey: string;
  approverName: string;
  merkleRoot: string;
  counterfactualsCount: number;
  financialImpactUsd: number;
  confidenceScore: number;
  soxSection404Verified: boolean;
  euAiActArticle14Compliant: boolean;
  iso42001Compliant: boolean;
  rationaleTreeExcerpt: string;
  auditTrailHash: string;
}

export const MOCK_DECISION_BLOCKS: DecisionBlock[] = [
  {
    blockNumber: 4824,
    blockHash: '0x3a9f4c82b1d0e9f78234190cba72891f94d0e123a4567890abcdef1234567890',
    previousHash: '0x88e7b1a09423c56d7812ef901234a567bcde890123456789abcdef0123456789',
    timestamp: '2026-09-17 09:30:14 UTC',
    proposingAgentId: 19,
    proposingAgentName: 'Agent 19 (Treasury & Cash Yield Maximizer)',
    decisionTitle: 'Overnight Treasury Yield Ladder Sweep ($1.25M to 5.28% 4-Week T-Bills)',
    governanceClass: 'CLASS_C',
    approverPublicKey: 'ed25519:9f8a23bc...481d',
    approverName: 'Michael Chang (Chief Financial Officer)',
    merkleRoot: '0xd4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5',
    counterfactualsCount: 4,
    financialImpactUsd: 66000,
    confidenceScore: 0.94,
    soxSection404Verified: true,
    euAiActArticle14Compliant: true,
    iso42001Compliant: true,
    rationaleTreeExcerpt: 'Evaluated 4 counterfactuals: 1. Keep in 0.8% sweep account (loss of $54k/yr), 2. Commercial paper (12 bps higher yield but +2.8x liquidity risk), 3. Money market fund (0.15% expense drag). Selected 4-week Treasury direct with rolling weekly ladder.',
    auditTrailHash: '0x11223344556677889900aabbccddeeff0011223344556677889900aabbccddee'
  },
  {
    blockNumber: 4823,
    blockHash: '0x88e7b1a09423c56d7812ef901234a567bcde890123456789abcdef0123456789',
    previousHash: '0x55d1a9807234b12c890123def456789012345678abcdef0123456789abcdef01',
    timestamp: '2026-09-16 16:42:08 UTC',
    proposingAgentId: 12,
    proposingAgentName: 'Agent 12 (Working Capital & AP Optimization)',
    decisionTitle: 'Supplier Early Payment Discount Capture ($185k early settlement @ 2.2% 10-day discount)',
    governanceClass: 'CLASS_B',
    approverPublicKey: 'ed25519:3b77e201...991a',
    approverName: 'Sarah Lin (VP of Finance & Operations)',
    merkleRoot: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    counterfactualsCount: 3,
    financialImpactUsd: 4078,
    confidenceScore: 0.98,
    soxSection404Verified: true,
    euAiActArticle14Compliant: true,
    iso42001Compliant: true,
    rationaleTreeExcerpt: 'Effective annualized IRR of 48.4% on early payment discount. Cash cushion exceeds minimum 6-month threshold by 2.4x. No vendor credit impact.',
    auditTrailHash: '0x22334455667788990011aabbccddeeff11223344556677889900aabbccddeeff'
  },
  {
    blockNumber: 4822,
    blockHash: '0x55d1a9807234b12c890123def456789012345678abcdef0123456789abcdef01',
    previousHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    timestamp: '2026-09-15 11:15:33 UTC',
    proposingAgentId: 6,
    proposingAgentName: 'Agent 06 (Dynamic Pricing & Elasticity Engine)',
    decisionTitle: 'Mid-Market SaaS Tier Price Realignment (+7.8% optimized for gross churn < 1.1%)',
    governanceClass: 'CLASS_B',
    approverPublicKey: 'ed25519:7710bc4a...2231',
    approverName: 'Elena Rostova (Chief Commercial Officer)',
    merkleRoot: '0x99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa',
    counterfactualsCount: 5,
    financialImpactUsd: 380000,
    confidenceScore: 0.91,
    soxSection404Verified: true,
    euAiActArticle14Compliant: true,
    iso42001Compliant: true,
    rationaleTreeExcerpt: 'Competitor benchmark pricing increased 12% across Q2. Cohort elasticity modeled at -0.32. Modeled churn impact: 14 accounts out of 1,280, generating +$380K net incremental ARR.',
    auditTrailHash: '0x33445566778899001122aabbccddeeff223344556677889900aabbccddeeff00'
  }
];

// ==========================================
// LAYER 13: OUTCOME LEARNING & BAYESIAN RECALIBRATION
// ==========================================

export interface AgentCalibrationProfile {
  agentId: number;
  code: string;
  name: string;
  specialization: string;
  totalDecisionsEvaluated: number;
  brierScore: number; // 0.00 (perfect) to 1.00 (poor)
  calibrationStatus: 'SUPERFORECASTER' | 'WELL_CALIBRATED' | 'MILD_OVERCONFIDENCE' | 'UNDER_CONFIDENT';
  historicalAccuracyPct: number;
  priorWeight: number; // Bayesian prior weight (0.0 to 1.0)
  learningRate: number;
  reconciliationAuditCount: number;
  averageVariancePct: number;
  latestLearningInsight: string;
}

export interface OutcomeReconciliation {
  id: string;
  decisionId: string;
  title: string;
  agentName: string;
  decisionDate: string;
  reconciliationHorizon: '30_DAY' | '60_DAY' | '90_DAY';
  predictedOutcome: number; // e.g. USD
  actualGlDelta: number; // Audited General Ledger
  variancePct: number;
  status: 'RECONCILED_SUCCESS' | 'WITHIN_TOLERANCE' | 'RECALIBRATION_TRIGGERED';
  bayesianAdjustmentApplied: string;
}

export const MOCK_AGENT_CALIBRATIONS: AgentCalibrationProfile[] = [
  {
    agentId: 12,
    code: 'AGENT_12',
    name: 'Working Capital & AP Optimization',
    specialization: 'Supplier discounting, DPO/DSO optimization & inventory float',
    totalDecisionsEvaluated: 148,
    brierScore: 0.082,
    calibrationStatus: 'SUPERFORECASTER',
    historicalAccuracyPct: 96.4,
    priorWeight: 0.92,
    learningRate: 0.045,
    reconciliationAuditCount: 148,
    averageVariancePct: 1.8,
    latestLearningInsight: 'Supplier invoice acceptance probability updated for semiconductor sector from 88% to 94% following Q2 vendor ledger analysis.'
  },
  {
    agentId: 19,
    code: 'AGENT_19',
    name: 'Treasury & Cash Yield Maximizer',
    specialization: 'Yield curve arbitrage, repo facilities, short-term debt',
    totalDecisionsEvaluated: 92,
    brierScore: 0.095,
    calibrationStatus: 'SUPERFORECASTER',
    historicalAccuracyPct: 95.1,
    priorWeight: 0.90,
    learningRate: 0.038,
    reconciliationAuditCount: 92,
    averageVariancePct: 2.1,
    latestLearningInsight: 'Fed benchmark terminal rate prior narrowed by 18 bps following PCE print reconciliation.'
  },
  {
    agentId: 6,
    code: 'AGENT_06',
    name: 'Dynamic Pricing & Elasticity Engine',
    specialization: 'SaaS expansion, price elasticity, contract renewal escalators',
    totalDecisionsEvaluated: 64,
    brierScore: 0.134,
    calibrationStatus: 'WELL_CALIBRATED',
    historicalAccuracyPct: 90.2,
    priorWeight: 0.84,
    learningRate: 0.062,
    reconciliationAuditCount: 64,
    averageVariancePct: 4.6,
    latestLearningInsight: 'Enterprise cohort willingness-to-pay elasticity dampened by 6% in response to multi-year upfront discount incentives.'
  },
  {
    agentId: 1,
    code: 'AGENT_01',
    name: 'Macro Economic & Monetary Intelligence',
    specialization: 'Fed policy rates, global trade tariff cycles, CPI forecasts',
    totalDecisionsEvaluated: 112,
    brierScore: 0.118,
    calibrationStatus: 'WELL_CALIBRATED',
    historicalAccuracyPct: 91.8,
    priorWeight: 0.88,
    learningRate: 0.050,
    reconciliationAuditCount: 112,
    averageVariancePct: 3.4,
    latestLearningInsight: 'Eurozone stagflation likelihood lowered from 22% to 14% after German industrial production rebound.'
  },
  {
    agentId: 7,
    code: 'AGENT_07',
    name: 'FX Volatility & Currency Shield',
    specialization: 'Options collars, forward hedges, cross-currency cash routing',
    totalDecisionsEvaluated: 54,
    brierScore: 0.158,
    calibrationStatus: 'WELL_CALIBRATED',
    historicalAccuracyPct: 88.6,
    priorWeight: 0.81,
    learningRate: 0.075,
    reconciliationAuditCount: 54,
    averageVariancePct: 5.2,
    latestLearningInsight: 'JPY carry-trade volatility factor expanded by 12% in Monte Carlo scenario generator.'
  }
];

export const MOCK_OUTCOME_RECONCILIATIONS: OutcomeReconciliation[] = [
  {
    id: 'rec-01',
    decisionId: 'dp-01',
    title: 'Q2 Tier-1 Supplier Dynamic Discounting Campaign',
    agentName: 'Agent 12 (Working Capital)',
    decisionDate: '60 days ago',
    reconciliationHorizon: '60_DAY',
    predictedOutcome: 185400,
    actualGlDelta: 188920,
    variancePct: 1.9,
    status: 'RECONCILED_SUCCESS',
    bayesianAdjustmentApplied: 'Increased vendor adoption confidence prior from 0.88 to 0.91.'
  },
  {
    id: 'rec-02',
    decisionId: 'dp-02',
    title: 'Mid-Market SaaS Renewal Expansion (+8%)',
    agentName: 'Agent 06 (Dynamic Pricing)',
    decisionDate: '90 days ago',
    reconciliationHorizon: '90_DAY',
    predictedOutcome: 380000,
    actualGlDelta: 364500,
    variancePct: -4.1,
    status: 'WITHIN_TOLERANCE',
    bayesianAdjustmentApplied: 'Slightly broadened churn risk parameter in high-inflation micro-segments.'
  },
  {
    id: 'rec-03',
    decisionId: 'dp-03',
    title: 'Overnight Reverse-Repo Treasury Re-allocation',
    agentName: 'Agent 19 (Treasury & Cash Yield)',
    decisionDate: '30 days ago',
    reconciliationHorizon: '30_DAY',
    predictedOutcome: 66000,
    actualGlDelta: 66840,
    variancePct: 1.2,
    status: 'RECONCILED_SUCCESS',
    bayesianAdjustmentApplied: 'No adjustment needed; prediction delta within 99% confidence band.'
  }
];

// ==========================================
// LAYER 14: GLOBAL CAPITAL & RISK NETWORK
// ==========================================

export interface GuaranteePoolMetrics {
  totalInsuredPoolUsd: number;
  availableLiquidityUsd: number;
  activeCoverageRatioPct: number;
  underwritingSyndicate: string[];
  cumulativeClaimsUsd: number;
  claimsFrequencyPct: number;
  insuranceReinsuranceRating: string;
  lastSolvencyAuditDate: string;
}

export interface CreditFacility {
  id: string;
  facilityName: string;
  lenderSyndicate: string;
  facilityType: 'COMMERCIAL_PAPER' | 'REVOLVING_CREDIT' | 'RECEIVABLES_FACTORING' | 'MEZZANINE_CREDIT';
  totalLimitUsd: number;
  drawnAmountUsd: number;
  interestRateSpread: string;
  effectiveRatePct: number;
  covenantStatus: 'COMPLIANT' | 'VIGILANCE' | 'BREACH';
  dscrActual: number;
  dscrMinimum: number;
  quickRatioActual: number;
  quickRatioMinimum: number;
}

export const MOCK_GUARANTEE_METRICS: GuaranteePoolMetrics = {
  totalInsuredPoolUsd: 100000000, // $100M Sovereign Guarantee Pool
  availableLiquidityUsd: 98450000,
  activeCoverageRatioPct: 99.98,
  underwritingSyndicate: ['Munich Re Capital Solutions', 'Aon Enterprise Risk Syndicate', 'Lloyds Sovereign Underwriting'],
  cumulativeClaimsUsd: 0,
  claimsFrequencyPct: 0.000,
  insuranceReinsuranceRating: 'AA+ Sovereign Rated',
  lastSolvencyAuditDate: 'September 2026'
};

export const MOCK_CREDIT_FACILITIES: CreditFacility[] = [
  {
    id: 'fac-cp-01',
    facilityName: 'Sovereign Commercial Paper Facility (Tier-1)',
    lenderSyndicate: 'Goldman Sachs Institutional / J.P. Morgan Asset Management',
    facilityType: 'COMMERCIAL_PAPER',
    totalLimitUsd: 25000000,
    drawnAmountUsd: 5000000,
    interestRateSpread: 'SOFR + 0.85%',
    effectiveRatePct: 5.85,
    covenantStatus: 'COMPLIANT',
    dscrActual: 2.45,
    dscrMinimum: 1.35,
    quickRatioActual: 1.82,
    quickRatioMinimum: 1.10
  },
  {
    id: 'fac-rc-02',
    facilityName: 'Syndicated Working Capital Revolver',
    lenderSyndicate: 'Bank of America / Wells Fargo Capital Finance',
    facilityType: 'REVOLVING_CREDIT',
    totalLimitUsd: 15000000,
    drawnAmountUsd: 0,
    interestRateSpread: 'SOFR + 1.25%',
    effectiveRatePct: 6.25,
    covenantStatus: 'COMPLIANT',
    dscrActual: 2.45,
    dscrMinimum: 1.35,
    quickRatioActual: 1.82,
    quickRatioMinimum: 1.10
  },
  {
    id: 'fac-rf-03',
    facilityName: 'Automated Account Receivables Dynamic Factoring',
    lenderSyndicate: 'Ares Commercial Finance / Apollo Direct Lending',
    facilityType: 'RECEIVABLES_FACTORING',
    totalLimitUsd: 10000000,
    drawnAmountUsd: 2400000,
    interestRateSpread: '0.65% Flat per 30-Day Cycle',
    effectiveRatePct: 7.80,
    covenantStatus: 'COMPLIANT',
    dscrActual: 2.45,
    dscrMinimum: 1.35,
    quickRatioActual: 1.82,
    quickRatioMinimum: 1.10
  }
];

// ==========================================
// LAYER 16: CRISIS / WAR-ROOM SOVEREIGN ENGINE
// ==========================================

export interface CrisisScenario {
  id: string;
  name: string;
  threatLevel: 'DEFCON_1_EXTREME' | 'DEFCON_2_CRITICAL' | 'DEFCON_3_ELEVATED' | 'DEFCON_4_NORMAL';
  triggerMechanism: string;
  primaryRiskExposures: string[];
  simulatedEnterpriseImpactUsd: number;
  cashRunwayDropMonths: number;
  recommendedPlaybook: string;
  mitigationSpeed: string;
  autoExecutable: boolean;
}

export interface CrisisPlaybook {
  id: string;
  code: string;
  title: string;
  objective: string;
  targetCrisis: string;
  actionChecklist: {
    step: number;
    action: string;
    responsibleAgent: string;
    targetSystem: string;
    estimatedExecutionSeconds: number;
    completed: boolean;
  }[];
  expectedLiquidityPreservedUsd: number;
  runwayExtensionMonths: number;
  offlineAirGapCompatible: boolean;
}

export const MOCK_CRISIS_SCENARIOS: CrisisScenario[] = [
  {
    id: 'crisis-bank-run',
    name: 'Tier-1 Counterparty Bank Insolvency / Run on Deposits',
    threatLevel: 'DEFCON_2_CRITICAL',
    triggerMechanism: 'Credit Default Swap (CDS) spread spikes > 350 bps on primary custodian bank; deposit outflow contagion.',
    primaryRiskExposures: ['Uninsured cash balance ($4.8M above $250k FDIC limit)', 'Payroll lockup', 'Vendor wire freezes'],
    simulatedEnterpriseImpactUsd: 4800000,
    cashRunwayDropMonths: 7.2,
    recommendedPlaybook: 'PLAYBOOK-01: Swift-Sweep Capital Preservation Protocol',
    mitigationSpeed: '< 90 seconds (Automated FedNow Sweep)',
    autoExecutable: true
  },
  {
    id: 'crisis-supply-freeze',
    name: 'Taiwan Strait Shipping Freeze & Semiconductor Disruption',
    threatLevel: 'DEFCON_2_CRITICAL',
    triggerMechanism: 'Naval blockade declaration, marine insurance cancellation in South China Sea, 90-day lead-time shock.',
    primaryRiskExposures: ['Primary hardware bill-of-materials delay', 'Q4 customer delivery SLA breach penalties'],
    simulatedEnterpriseImpactUsd: 2150000,
    cashRunwayDropMonths: 3.4,
    recommendedPlaybook: 'PLAYBOOK-02: Dual-Hemisphere Supplier Redirection Protocol',
    mitigationSpeed: '< 4 hours (Pre-contracted standby suppliers)',
    autoExecutable: false
  },
  {
    id: 'crisis-stagflation-spike',
    name: 'Sudden Oil + CPI Spike with 150 bps Emergency Fed Rate Hike',
    threatLevel: 'DEFCON_3_ELEVATED',
    triggerMechanism: 'Stagflationary stag shock: Crude oil > $135/bbl, PCE > 6.4%, variable-rate debt burden explodes.',
    primaryRiskExposures: ['Variable-rate credit cost increase (+180 bps)', 'Enterprise customer budget freezes'],
    simulatedEnterpriseImpactUsd: 1400000,
    cashRunwayDropMonths: 2.1,
    recommendedPlaybook: 'PLAYBOOK-03: Variable Debt Cap & Cash-in-Advance Invoicing',
    mitigationSpeed: '< 24 hours',
    autoExecutable: true
  }
];

export const MOCK_CRISIS_PLAYBOOKS: CrisisPlaybook[] = [
  {
    id: 'pb-01',
    code: 'PLAYBOOK-01',
    title: 'Counterparty Bank Failure Swift-Sweep Protocol',
    objective: 'Instantly evacuate all balances exceeding $250k FDIC threshold into sovereign direct T-Bills via FedNow within 90 seconds.',
    targetCrisis: 'Counterparty Bank Insolvency',
    expectedLiquidityPreservedUsd: 4800000,
    runwayExtensionMonths: 7.2,
    offlineAirGapCompatible: true,
    actionChecklist: [
      {
        step: 1,
        action: 'Lock all outbound non-payroll clearing accounts & halt scheduled discretionary batch transfers',
        responsibleAgent: 'Agent 26 (Deterministic AI Firewall)',
        targetSystem: 'All Banking Rails & ERP',
        estimatedExecutionSeconds: 4,
        completed: false
      },
      {
        step: 2,
        action: 'Transmit instant ISO 20022 clearing instruction to sweep $4,550,000 into US Treasury Direct overnight facility',
        responsibleAgent: 'Agent 19 (Treasury & Cash Yield Maximizer)',
        targetSystem: 'FedNow / RTGS Rails',
        estimatedExecutionSeconds: 12,
        completed: false
      },
      {
        step: 3,
        action: 'Re-route upcoming customer incoming AR wires to secondary sovereign vault account (JPMorgan Chase)',
        responsibleAgent: 'Agent 12 (Working Capital & AP)',
        targetSystem: 'Stripe Sovereign & Billing Gateway',
        estimatedExecutionSeconds: 25,
        completed: false
      },
      {
        step: 4,
        action: 'Generate cryptographic cryptographic decision package and notify C-Suite & Board with zero-loss certification',
        responsibleAgent: 'Agent 28 (Executive Command & Board Synthesizer)',
        targetSystem: 'Executive Command Center & Secure SMS',
        estimatedExecutionSeconds: 15,
        completed: false
      }
    ]
  },
  {
    id: 'pb-02',
    code: 'PLAYBOOK-02',
    title: 'Supply-Chain Freeze Defense & Alternative Vendor Routing',
    objective: 'Pre-authorize pre-vetted secondary domestic/European suppliers and secure critical hardware buffer inventory.',
    targetCrisis: 'Global Supply Chain Blockade',
    expectedLiquidityPreservedUsd: 2150000,
    runwayExtensionMonths: 3.4,
    offlineAirGapCompatible: false,
    actionChecklist: [
      {
        step: 1,
        action: 'Evaluate alternative supplier inventory availability across Tier-2 partner network',
        responsibleAgent: 'Agent 13 (Supply Chain & Vendor Arbitrage)',
        targetSystem: 'Global Graph Counterparty Network',
        estimatedExecutionSeconds: 60,
        completed: false
      },
      {
        step: 2,
        action: 'Execute pre-negotiated option contracts with Mexican & Vietnamese assembly plants',
        responsibleAgent: 'Agent 04 (Contractual & Vendor SLA)',
        targetSystem: 'ERP Procurement Bridge',
        estimatedExecutionSeconds: 180,
        completed: false
      },
      {
        step: 3,
        action: 'Adjust dynamic pricing by +4.5% to absorb freight surge without customer cancellation',
        responsibleAgent: 'Agent 06 (Dynamic Pricing Engine)',
        targetSystem: 'Billing Gateway',
        estimatedExecutionSeconds: 45,
        completed: false
      }
    ]
  },
  {
    id: 'pb-03',
    code: 'PLAYBOOK-03',
    title: 'Stagflation Liquidity Fortification & Debt Collar Lock',
    objective: 'Hedge 100% of variable debt exposure with interest rate caps and shift invoicing to Net-10 with early discount incentives.',
    targetCrisis: 'High Inflation & Interest Rate Spike',
    expectedLiquidityPreservedUsd: 1400000,
    runwayExtensionMonths: 2.1,
    offlineAirGapCompatible: true,
    actionChecklist: [
      {
        step: 1,
        action: 'Execute interest rate collar fixing SOFR rate at 5.50% ceiling for $15M variable credit',
        responsibleAgent: 'Agent 19 (Treasury & Cash Yield Maximizer)',
        targetSystem: 'Wholesale Derivatives Desk',
        estimatedExecutionSeconds: 30,
        completed: false
      },
      {
        step: 2,
        action: 'Deploy dynamic customer discount of 2% for payment in 5 days (pulling forward $820k cash)',
        responsibleAgent: 'Agent 12 (Working Capital & AP)',
        targetSystem: 'NetSuite AR Engine',
        estimatedExecutionSeconds: 60,
        completed: false
      },
      {
        step: 3,
        action: 'Pause non-revenue headcount additions and redirect $400k marketing budget into retention',
        responsibleAgent: 'Agent 18 (OPEX & Cost Efficiency)',
        targetSystem: 'Workday Financials',
        estimatedExecutionSeconds: 90,
        completed: false
      }
    ]
  }
];
