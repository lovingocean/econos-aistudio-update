import { RiskTier } from './econos';

// ==========================================
// PRIORITY 1: ECONOMIC BRAIN & ORCHESTRATOR
// ==========================================

export type GovernanceClass = 'CLASS_A' | 'CLASS_B' | 'CLASS_C' | 'CLASS_D' | 'CLASS_E';

export interface AgentContribution {
  agentId: number;
  agentCode: string;
  agentName: string;
  tier: string;
  role: string;
  recommendation: string;
  confidence: number; // 0 to 1
  evidence: string[];
  keyAssumptions: string[];
  proposedAction?: string;
  financialImpactUsd?: number;
}

export interface AgentConflict {
  id: string;
  agentA: { id: number; code: string; name: string; position: string };
  agentB: { id: number; code: string; name: string; position: string };
  conflictType: 'RISK_VS_GROWTH' | 'LIQUIDITY_VS_YIELD' | 'MARGIN_VS_VOLUME' | 'SPEED_VS_ACCURACY' | 'COMPLIANCE_VS_CONVERSION';
  description: string;
  tradeoffMatrix: { metric: string; optionA: string; optionB: string }[];
  resolutionStrategy: 'PARETO_OPTIMAL' | 'RISK_PRIORITY' | 'CONSTRAINED_OPTIMIZATION' | 'HUMAN_ARBITRATION';
  resolvedRecommendation: string;
  arbitrationAgentId: number; // e.g. Agent 27
}

export interface DecisionPackage {
  id: string;
  packageNumber: string;
  title: string;
  objective: string;
  currentState: string;
  evidence: string[];
  dataSources: string[];
  assumptions: string[];
  participatingAgents: AgentContribution[];
  conflicts: AgentConflict[];
  alternativesConsidered: {
    title: string;
    description: string;
    rejectionReason: string;
    expectedImpact: number;
  }[];
  scenarioResults: {
    scenarioName: string;
    probability: number;
    ebitdaImpactUsd: number;
    cashRunwayImpactMonths: number;
    solvencyScore: number;
  }[];
  expectedEconomicImpact: {
    netFinancialGainUsd: number;
    irrPct: number;
    paybackMonths: number;
    confidenceInterval: [number, number];
  };
  downsideScenarios: {
    stressCondition: string;
    worstCaseLossUsd: number;
    containmentStrategy: string;
  }[];
  constraints: string[];
  dependencies: string[];
  confidence: number; // 0-1
  calibrationHistory: {
    historicalAccuracyPct: number;
    brierScore: number;
    modelId: string;
  };
  authorizationClass: GovernanceClass;
  executionPlan: {
    steps: {
      order: number;
      actor: string;
      action: string;
      targetSystem: string;
      estimatedDuration: string;
      verificationCheck: string;
    }[];
  };
  rollbackPlan: {
    triggerCondition: string;
    steps: string[];
    maxTimeWindowHours: number;
    recoveryGuarantee: string;
  };
  monitoringTriggers: {
    metric: string;
    threshold: string;
    autoAction: string;
  }[];
  expectedOutcome: string;
  actualOutcome?: string;
  status: 'SYNTHESIZING' | 'CONFLICT_RESOLUTION' | 'PENDING_AUTHORIZATION' | 'EXECUTING' | 'RECONCILING' | 'CLOSED';
  createdAt: string;
}

export interface BrainPipelineStep {
  stage: 
    | 'OBSERVE' 
    | 'DECOMPOSE' 
    | 'SELECT_AGENTS' 
    | 'PARALLEL_ANALYSIS' 
    | 'RESOLVE_CONFLICTS' 
    | 'SIMULATE' 
    | 'SYNTHESIZE' 
    | 'VERIFY' 
    | 'AUTHORIZE' 
    | 'EXECUTE' 
    | 'RECONCILE' 
    | 'LEARN';
  name: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  latencyMs: number;
  details: string;
}

// ==========================================
// PRIORITY 2: GLOBAL ECONOMIC GRAPH EXPANSION
// ==========================================

export type GlobalGraphHierarchy = 
  | 'TRANSACTION'
  | 'COMPANY'
  | 'CUSTOMER_SUPPLIER'
  | 'COUNTERPARTY'
  | 'INDUSTRY'
  | 'SUPPLY_CHAIN'
  | 'COUNTRY'
  | 'GLOBAL_MARKET';

export type GlobalEntityType = 
  | 'TRANSACTION'
  | 'COMPANY'
  | 'CUSTOMER'
  | 'SUPPLIER'
  | 'BANK'
  | 'LENDER'
  | 'INSURER'
  | 'LOGISTICS'
  | 'ASSET'
  | 'CONTRACT'
  | 'DEBT'
  | 'EQUITY'
  | 'COMMODITY'
  | 'CURRENCY'
  | 'MARKET'
  | 'COUNTRY'
  | 'REGULATION'
  | 'ECONOMIC_EVENT'
  | 'COMMITMENT'
  | 'EXPOSURE'
  | 'RISK'
  | 'FORECAST'
  | 'DECISION'
  | 'OUTCOME';

export interface GlobalGraphNode {
  id: string;
  label: string;
  entityType: GlobalEntityType;
  hierarchyLevel: GlobalGraphHierarchy;
  jurisdiction: string;
  creditRating?: string;
  financialExposureUsd?: number;
  dependencyWeight: number; // 0 to 1
  confidence: number;
  permissionScope: 'PUBLIC' | 'CONSENT_GRANTED' | 'RESTRICTED_SELECTIVE' | 'CONFIDENTIAL';
  provenance: string;
  timeValidityStart: string;
  timeValidityEnd?: string;
  metadata?: Record<string, any>;
}

export interface GlobalGraphEdge {
  id: string;
  source: string;
  target: string;
  relationshipType: 
    | 'OWNS' 
    | 'FINANCES' 
    | 'SUPPLIES' 
    | 'INSURES' 
    | 'TRANSACTS_WITH' 
    | 'EXPOSED_TO_RATE' 
    | 'EXPOSED_TO_CURRENCY' 
    | 'DEPENDS_ON_LOGISTICS' 
    | 'REGULATED_BY' 
    | 'VULNERABLE_TO_SHOCK';
  economicExposureUsd: number;
  dependencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timeValidity: string;
  provenance: string;
  permission: 'MUTUAL_CONSENT' | 'SELECTIVE_DISCLOSURE' | 'PUBLIC_LEDGER';
  confidence: number;
  changeHistory: { date: string; delta: string }[];
}

// ==========================================
// PRIORITY 3: COUNTERPARTY DIGITAL TWINS
// ==========================================

export type CounterpartyCategory = 
  | 'SUPPLIER' 
  | 'CUSTOMER' 
  | 'BANK' 
  | 'LENDER' 
  | 'INSURER' 
  | 'LOGISTICS_PROVIDER' 
  | 'STRATEGIC_PARTNER' 
  | 'ACQUISITION_TARGET';

export interface RipplePropagationStep {
  step: number;
  domain: string;
  metric: string;
  delta: string;
  severity: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  description: string;
}

export interface CounterpartyTwin {
  id: string;
  name: string;
  category: CounterpartyCategory;
  industry: string;
  country: string;
  consentGranted: boolean;
  selectiveDisclosureScopes: string[];
  lastPingTimestamp: string;
  financialHealthScore: number; // 0 to 100
  defaultProbabilityPct: number;
  deliveryReliabilityPct: number;
  activeExposureUsd: number;
  rippleScenario: {
    triggerEvent: string;
    steps: RipplePropagationStep[];
    netEnterpriseCashLossUsd: number;
    covenantBreachRisk: boolean;
  };
}

// ==========================================
// PRIORITY 4: ECONOS ECONOMIC PROTOCOL
// ==========================================

export interface EconomicProtocolMessage {
  id: string;
  protocolVersion: string;
  senderInstanceId: string;
  recipientInstanceId: string;
  objectType: 
    | 'ECONOMIC_ENTITY'
    | 'ECONOMIC_EVENT'
    | 'TRANSACTION'
    | 'CONTRACT'
    | 'COMMITMENT'
    | 'EXPOSURE'
    | 'FORECAST'
    | 'RISK_SIGNAL'
    | 'LIQUIDITY_SIGNAL'
    | 'SUPPLY_SIGNAL'
    | 'DEMAND_SIGNAL'
    | 'DECISION'
    | 'AUTHORIZATION'
    | 'EXECUTION'
    | 'OUTCOME';
  payloadSummary: string;
  selectiveDisclosureActive: boolean;
  encryptionStandard: 'AES-GCM-256' | 'ChaCha20-Poly1305';
  signatureAlgorithm: 'Ed25519' | 'ECDSA-P384';
  signerPassportId: string;
  replayProtectionNonce: string;
  auditHash: string;
  timestamp: string;
  status: 'DELIVERED' | 'VERIFIED' | 'REVOKED' | 'BLOCKED';
}

// ==========================================
// PRIORITY 5: ECONOMIC MODEL REGISTRY
// ==========================================

export interface EconomicModelEntry {
  id: string;
  modelId: string;
  version: string;
  name: string;
  modelOwner: string;
  purpose: string;
  assumptions: string[];
  dataLineage: string[];
  trainingReference: string;
  validationHistory: { date: string; evaluator: string; outcome: 'PASSED' | 'CONDITIONAL' | 'FAILED' }[];
  calibrationMetrics: {
    brierScore: number;
    expectedCalibrationError: number;
    meanAbsoluteErrorPct: number;
  };
  applicableIndustries: string[];
  applicableJurisdictions: string[];
  knownLimitations: string[];
  scenarioLimitations: string[];
  approvalStatus: 'VERIFIED_ACTIVE' | 'PROVISIONAL' | 'UNDER_REVIEW' | 'RETIRED';
  deploymentStatus: 'PRODUCTION' | 'SHADOW_MODE' | 'CANARY' | 'DECOMMISSIONED';
  historicalAccuracyScore: number; // 0 to 100
  assignedAgentCode: string; // e.g. AGENT_05, AGENT_25
}

// ==========================================
// PRIORITY 6: GLOBAL ECONOMIC SIMULATOR
// ==========================================

export type GlobalShockType = 
  | 'INTEREST_RATE_SHOCK'
  | 'FX_DEVALUATION_SHOCK'
  | 'COMMODITY_SPIKE'
  | 'ENERGY_CRISIS'
  | 'TARIFF_REGIME_CHANGE'
  | 'GEOPOLITICAL_SANCTIONS'
  | 'TIER_1_SUPPLIER_FAILURE'
  | 'MAJOR_CUSTOMER_DEFAULT'
  | 'CREDIT_CONTRACTION'
  | 'BANK_RUN_SYSTEMIC'
  | 'GLOBAL_RECESSION_STAGFLATION'
  | 'DEMAND_COLLAPSE'
  | 'LOGISTICS_CHOKEPOINT'
  | 'SOVEREIGN_DEBT_SPIRAL';

export interface SimulationIntervention {
  id: string;
  title: string;
  layerOrAgent: string;
  description: string;
  executionCostUsd: number;
  mitigatedLossUsd: number;
  postInterventionSolvencyPct: number;
  recommendedGovernance: GovernanceClass;
  isOptimal: boolean;
}

export interface GlobalSimulationRun {
  id: string;
  shockType: GlobalShockType;
  title: string;
  severityLevel: 'MILD' | 'MODERATE' | 'SEVERE' | 'CATASTROPHIC';
  hierarchyScope: GlobalGraphHierarchy;
  monteCarloPaths: number;
  unhedgedLossUsd: number;
  unhedgedRunwayDeltaMonths: number;
  covenantHeadroomLossPct: number;
  interventions: SimulationIntervention[];
  distributionStats: {
    p10LossUsd: number;
    p50LossUsd: number;
    p90LossUsd: number;
    solvencyProbability: number;
  };
}

// ==========================================
// PRIORITY 7: STRATEGIC EXPERIMENTATION ENGINE
// ==========================================

export type ExperimentArea = 
  | 'PRICING_ELASTICITY'
  | 'PROCUREMENT_REVERSE_AUCTION'
  | 'INVENTORY_JIT_BUFFER'
  | 'COLLECTIONS_ACCELERATION'
  | 'SALES_COMP_ALIGNMENT'
  | 'CUSTOMER_RETENTION_INCENTIVE'
  | 'HEADCOUNT_DEPLOYMENT'
  | 'MARKETING_CAC_EFFICIENCY'
  | 'SUPPLIER_VOLUME_SPLIT'
  | 'FINANCING_MIX_OPTIMIZATION';

export interface StrategicExperiment {
  id: string;
  title: string;
  area: ExperimentArea;
  objective: string;
  hypothesis: string;
  controlGroup: string;
  treatmentGroup: string;
  sampleSize: string;
  successMetric: string;
  riskBoundary: string;
  authorizationClass: GovernanceClass;
  stopCondition: string;
  expectedOutcome: string;
  actualOutcome?: string;
  statisticalSignificance?: number;
  status: 'DESIGN' | 'SIMULATING' | 'APPROVED' | 'ACTIVE_RUN' | 'RECONCILING' | 'COMPLETED';
  outcomeLedgerId?: string;
  modelUpdateRegistered: boolean;
}

// ==========================================
// PRIORITY 8: M&A INTELLIGENCE NETWORK
// ==========================================

export interface MaDealPipelineItem {
  id: string;
  targetCompanyName: string;
  industry: string;
  enterpriseValueUsd: number;
  revenueUsd: number;
  ebitdaUsd: number;
  currentStage: 
    | 'TARGET_DISCOVERY'
    | 'TARGET_TWIN'
    | 'FINANCIAL_ANALYSIS'
    | 'VALUATION'
    | 'SYNERGY_MODEL'
    | 'CUSTOMER_SUPPLIER_IMPACT'
    | 'DEBT_CAPITAL_IMPACT'
    | 'TAX_ANALYSIS'
    | 'FINANCING_STRUCTURING'
    | 'GEOPOLITICAL_REGULATORY'
    | 'INTEGRATION_RISK'
    | 'DEAL_SIMULATION'
    | 'EXECUTIVE_REVIEW'
    | 'BOARD_CLASS_D_AUTHORIZATION'
    | 'EXECUTION'
    | 'POST_MERGER_MONITORING';
  projectedCostSynergiesUsd: number;
  projectedRevenueSynergiesUsd: number;
  postMergerWacc: number;
  proFormaRunwayMonths: number;
  integrationRiskScore: number; // 0 to 100
  assignedSpecialistAgent: 'AGENT_03 (M&A & Strategic Synergy Synthesizer)';
  requiredGovernance: 'CLASS_D';
  recommendation: 'ACQUIRE' | 'RENEGOTIATE_TERMS' | 'HOLD_FOR_MACRO_WINDOW' | 'ABANDON';
}

// ==========================================
// PRIORITY 9: EXECUTIVE COMMAND CENTER
// ==========================================

export interface ExecutiveQuestionAnswer {
  questionNumber: number;
  question: 
    | 'WHAT CHANGED?'
    | 'WHY DID IT CHANGE?'
    | 'WHAT COULD HAPPEN NEXT?'
    | 'WHAT OPTIONS EXIST?'
    | 'WHAT IS THE MODELED IMPACT OF EACH OPTION?'
    | 'WHAT AUTHORIZATION IS REQUIRED?'
    | 'WHAT WILL ECONOS EXECUTE?';
  headline: string;
  subtext: string;
  metricBadge?: string;
  evidencePoints: string[];
  actionRecommendation?: string;
  governanceClassRequired?: GovernanceClass;
}

export interface ExecutiveKPI {
  label: string;
  value: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  delta: string;
  health: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  agentOwner: string;
}

// ==========================================
// PRIORITY 10: ECONOS NETWORK MARKETPLACE
// ==========================================

export type MarketplaceModuleType = 
  | 'INDUSTRY_MODEL'
  | 'MACRO_SCENARIO_PACK'
  | 'COMPLIANCE_RULESET'
  | 'OPTIMIZATION_SOLVER'
  | 'SPECIALIZED_AGENT'
  | 'BENCHMARK_DATASET';

export interface MarketplaceModule {
  id: string;
  title: string;
  provider: string;
  moduleType: MarketplaceModuleType;
  version: string;
  verifiedSecurityAudit: boolean;
  governanceChecked: boolean;
  pricingModel: 'INCLUDED_ENTERPRISE' | 'USAGE_ROYALTY' | 'ANNUAL_SEAT';
  rating: number; // 1-5
  downloads: number;
  description: string;
  compatibleLayers: string[];
  sandboxTested: boolean;
  isActiveInstalled: boolean;
}
