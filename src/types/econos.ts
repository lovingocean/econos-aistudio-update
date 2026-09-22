export type UserRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  currentOrgId: string;
  avatarUrl?: string;
  createdAt: string;
  password?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  isDemo: boolean;
  ownerId: string;
  createdAt: string;
  tier: 'FREE' | 'PRO' | 'BUSINESS' | 'ENTERPRISE';
}

export interface Business {
  id: string;
  organizationId: string;
  name: string;
  industry: string;
  currency: string;
  fiscalYearEnd: string;
  createdAt: string;
}

export interface EconomicProfile {
  id: string;
  businessId: string;
  organizationId: string;
  monthlyRevenue: number | null;
  monthlyCogs: number | null;
  monthlyOpex: number | null;
  cashOnHand: number | null;
  totalAssets: number | null;
  totalLiabilities: number | null;
  activeCustomersCount: number | null;
  activeSuppliersCount: number | null;
  netBurnRate: number | null;
  runwayMonths: number | null;
  grossMarginPct: number | null;
  netMarginPct: number | null;
  growthRateMoM: number | null;
  primaryObjective: string;
  keyRisks: string[];
  updatedAt: string;
}

export type OpportunityCategory = 
  | 'REVENUE_EXPANSION' 
  | 'COST_OPTIMIZATION' 
  | 'WORKING_CAPITAL' 
  | 'PRICING_STRATEGY' 
  | 'SUPPLIER_RENEGOTIATION' 
  | 'PRODUCTIVITY_AUTOMATION';

export type OpportunityStatus = 
  | 'DISCOVERED' 
  | 'ANALYZED' 
  | 'SIMULATED' 
  | 'RECOMMENDED' 
  | 'APPROVED' 
  | 'EXECUTING' 
  | 'COMPLETED' 
  | 'VERIFIED' 
  | 'LEARNED';

export interface Opportunity {
  id: string;
  businessId: string;
  organizationId: string;
  title: string;
  description: string;
  source: string;
  category: OpportunityCategory;
  estimatedImpact: number;
  confidence: number; // 0 to 1
  probability: number; // 0 to 1
  capitalRequired: number;
  timeRequiredWeeks: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  assumptions: string[];
  expectedOutcome: string;
  status: OpportunityStatus;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface Scenario {
  id: string;
  businessId: string;
  organizationId: string;
  name: string;
  description: string;
  revenueAdjustmentPct: number;
  cogsAdjustmentPct: number;
  opexAdjustmentPct: number;
  newHiresCount: number;
  averageSalary: number;
  capitalInvestment: number;
  priceIncreasePct: number;
  projectedRevenue: number;
  projectedNetProfit: number;
  projectedRunwayMonths: number;
  facts: string[];
  assumptions: string[];
  estimates: string[];
  projections: string[];
  recommendation: string;
  createdAt: string;
}

export interface OutcomeVerification {
  id: string;
  businessId: string;
  organizationId: string;
  opportunityId: string;
  recommendationTitle: string;
  actionTaken: string;
  expectedFinancialImpact: number;
  actualFinancialImpact: number;
  variance: number;
  variancePercentage: number;
  verificationEvidence: string;
  verifiedAt: string;
  verifiedBy: string;
  isVerified: boolean;
  learningInsights: string;
  status: 'PENDING' | 'VERIFIED' | 'DISPUTED';
}

// Application Navigation Layers
export type AppLayer = 
  | 'SOVEREIGN_COMMAND'
  | 'BUSINESS' 
  | 'CLIENT_ACQUISITION'
  | 'WEALTH' 
  | 'TRUST' 
  | 'GRAPH'
  | 'ECONOMIC_BRAIN'
  | 'GLOBAL_NETWORK'
  | 'SIMULATOR'
  | 'EXECUTIVE'
  | 'MODEL_REGISTRY'
  | 'AUTONOMOUS_EXECUTION'
  | 'DECISION_LEDGER'
  | 'OUTCOME_LEARNING'
  | 'CAPITAL_NETWORK'
  | 'WAR_ROOM'
  | 'P2P_CLEARING'
  | 'ZK_TRADE_CLEARANCE'
  | 'RWA_REPO_MARKET'
  | 'MACRO_HEDGE_SYNTH'
  | 'CAPITAL_MA_OPTIMIZER'
  | 'SYNTHETIC_CENTRAL_BANK'
  | 'ORBITAL_ESCROW'
  | 'POST_QUANTUM_ENCLAVE'
  | 'FIDUCIARY_GOVERNANCE'
  | 'COMPUTE_ENERGY_GRID'
  | 'RELATIVISTIC_LIGHT_CONE'
  | 'GEOENGINEERING_DERIVATIVE'
  | 'POST_HUMAN_ENTERPRISE'
  | 'BIOLOGICAL_NEUROMORPHIC_GRID'
  | 'KARDASHEV_OMEGA_PROTOCOL'
  | 'OMNI_TELEMETRY_BUS'
  | 'OMNI_CLEARING_MESH'
  | 'OMNI_MINERAL_TITLE'
  | 'OMNI_LEGAL_SYNTHESIS'
  | 'OMNI_POWER_GRID'
  | 'OMNI_CREDIT_MATRIX'
  | 'OMNI_ROBOTIC_LABOR'
  | 'OMNI_INTENT_TRANSLATION'
  | 'OMNI_QUANTUM_CITADEL'
  | 'OMNI_CIVILIZATION_ANCHOR'
  | 'LAYER_62_RD_TAX_CREDIT'
  | 'EXTENDED_LAYERS_WORKSPACE'
  | `LAYER_${number}`
  | (string & {});

export interface MasterLayerSpec {
  layerNumber: number;
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  category: 
    | 'CORE_OS' 
    | 'V2_STRATEGIC' 
    | 'SOVEREIGN_INFRA' 
    | 'PLANETARY_SYSTEMS' 
    | 'CIVILIZATIONAL_FRONTIER' 
    | 'OMNI_SINGULARITY'
    | 'ENTERPRISE_SYNTHETICS' 
    | 'INSTITUTIONAL_TAX_PE' 
    | 'DEEP_SPACE_CONTINUUM';
  categoryLabel: string;
  businessBenefit: string;
  paymentCriteria: string;
  monetizationType: 'FLAT_MONTHLY' | 'PERFORMANCE_VALUE_SHARE' | 'PER_ENTITY_ASSET' | 'SOVEREIGN_INSTITUTIONAL';
  suggestedFee: string;
  metric: string;
  status: 'OPERATIONAL' | 'LIVE_EXECUTION' | 'VERIFIED' | 'PILOT';
  description: string;
  keyOutputs: string[];
  complianceStandard?: string;
}

export interface RdTaxCreditState {
  taxYear: number;
  entityType: 'C_CORP' | 'S_CORP' | 'LLC_PARTNERSHIP';
  grossReceiptsPrior5Yrs: number;
  isStartupPayrollEligible: boolean;
  w2WageQre: number;
  suppliesQre: number;
  contractorQre: number;
  cloudComputeQre: number;
  historicalQre3YrAvg: number;
  calculationMethod: 'ASC' | 'REGULAR';
  auditReadinessScore: number;
  documentationRecords: Array<{
    id: string;
    projectCode: string;
    projectName: string;
    technicalUncertainty: string;
    experimentationMethod: string;
    qualifyingAmount: number;
    evidenceLinksCount: number;
    isAuditReady: boolean;
  }>;
}

// Layer 2: Wealth Types
export type WealthEngineCategory = 
  | 'INTELLIGENCE' 
  | 'EXPANSION' 
  | 'ALLOCATION' 
  | 'OPTIMIZATION' 
  | 'PROTECTION' 
  | 'DEFENSE' 
  | 'ACCELERATION';

export interface WealthProfile {
  id: string;
  userId: string;
  organizationId: string;
  liquidAssets: number | null;
  illiquidAssets: number | null;
  businessEquityValue: number | null;
  totalPersonalDebt: number | null;
  passiveMonthlyIncome: number | null;
  activeMonthlyIncome: number | null;
  monthlyPersonalExpenses: number | null;
  targetNetWorth: number;
  targetRetirementAge: number;
  currentAge: number;
  riskTolerance: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  updatedAt: string;
}

export interface WealthEngineItem {
  id: number;
  code: string;
  name: string;
  description: string;
  category: 'EXPANSION' | 'ALLOCATION' | 'OPTIMIZATION' | 'PROTECTION' | 'INTELLIGENCE';
  status: 'ACTIVE' | 'OPTIMAL' | 'ATTENTION_REQUIRED' | 'SIMULATING';
  score: number; // 0-100
  metricLabel: string;
  metricValue: string;
  keyFinding: string;
  recommendedAction: string;
}

export interface WealthAdvisorMessage {
  id: string;
  sender: 'USER' | 'ADVISOR';
  content: string;
  timestamp: string;
  meta?: {
    wealthGoal?: string;
    trajectory?: string;
    largestConstraint?: string;
    confidence?: number;
    assumptions?: string[];
    risks?: string[];
    recommendedAction?: string;
    projectedImpact?: number;
  };
}

// Layer 3: Trust Types
export type AgentStatus = 'ACTIVE' | 'PAUSED' | 'FROZEN' | 'DISABLED' | 'REVOKED';
export type RiskTier = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AutonomyLevel = 'SUPERVISED' | 'CONDITIONAL' | 'AUTONOMOUS';

export interface Agent {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  ownerId: string;
  ownerName: string;
  status: AgentStatus;
  version: string;
  modelProvider: string;
  model: string;
  capabilities: string[];
  permissions: string[];
  riskTier: RiskTier;
  trustScore: number | null; // null represents INSUFFICIENT DATA
  reputationScore: number;
  autonomyLevel: AutonomyLevel;
  totalActionsExecuted: number;
  successfulActions: number;
  incidentCount: number;
  spendingLimitMonthly: number;
  lastActivityAt: string;
  lastIncidentAt: string | null;
  createdAt: string;
  passportId: string;
  parentAgentId?: string | null;
  allowSubagentDelegation?: boolean;
  maxSubagents?: number;
  delegatedBudgetLimitMonthly?: number;
  subagentIds?: string[];
}

export interface EconomicPassport {
  passportId: string;
  agentId: string;
  agentName: string;
  organizationId: string;
  organizationName: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string;
  cryptographicSignature: string;
  signatureAlgorithm?: string;
  issuerPublicKey?: string;
  verifiedIdentity: boolean;
  currentTrustScore: number | null;
  reputationRating: string;
  riskClassification: RiskTier;
  economicAuthorityLimitUsd: number;
  verifiedOutcomesCount: number;
  activeIncidentsCount: number;
  permittedTools: string[];
  jurisdictionRestrictions: string[];
}

export interface AgentApprovalRequest {
  id: string;
  agentId: string;
  agentName: string;
  organizationId: string;
  intent: string;
  actionName: string;
  toolName: string;
  parameters?: Record<string, any>;
  requestedPermission: string;
  financialImpact: number;
  riskTier: RiskTier;
  affectedResource: string;
  reasoning: string;
  evidence: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  requestedAt: string;
  decidedAt?: string;
  decidedBy?: string;
  decisionNotes?: string;
}

export interface AgentIncident {
  id: string;
  agentId: string;
  agentName: string;
  organizationId: string;
  severity: RiskTier;
  category: string;
  title?: string;
  description: string;
  detectedAt: string;
  createdAt?: string;
  policyTripped?: string;
  source: string;
  actionAttempted: string;
  status: 'OPEN' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED' | 'CLOSED';
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  relatedAuditId?: string;
}

export interface AuditLogEntry {
  id: string;
  organizationId: string;
  actorId: string;
  actorName: string;
  agentId?: string;
  agentName?: string;
  action: string;
  resource: string;
  riskTier: RiskTier;
  decision: 'ALLOWED' | 'MONITORED' | 'ESCALATED' | 'BLOCKED';
  result: 'SUCCESS' | 'FAILURE' | 'PENDING_APPROVAL';
  timestamp: string;
  details: string;
}

export interface FirewallPipelineStage {
  stage: number;
  name: string;
  status: 'PASSED' | 'BLOCKED' | 'ESCALATED';
  details: string;
}

export interface FirewallDecision {
  decisionCode: 'ALLOWED' | 'BLOCKED' | 'ESCALATED';
  reason: string;
  riskTier: RiskTier;
  executed: boolean;
  pipelineStages: FirewallPipelineStage[];
  auditLogId: string;
  timestamp: string;
  approvalRequestId?: string;
}

export interface PolicyRule {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  category: 'FINANCIAL' | 'SECURITY' | 'DATA_ACCESS' | 'TEMPORAL';
  thresholdValue?: number;
  enforcement: 'BLOCK' | 'REQUIRE_APPROVAL' | 'LOG_ALERT';
  isActive: boolean;
}

// Economic Graph Types
export interface GraphNode {
  id: string;
  label: string;
  type: 'PERSON' | 'ORGANIZATION' | 'BUSINESS' | 'REVENUE' | 'ASSET' | 'LIABILITY' | 'OPPORTUNITY' | 'AGENT' | 'OUTCOME';
  value?: string;
  status?: string;
  properties?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation?: string;
  relationship?: string;
  verified?: boolean;
  financialImpact?: number;
}

export type EconomicGraphNode = GraphNode;
export type EconomicGraphEdge = GraphEdge;

export interface EconomicGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// Dimension 1: ZK Tax & Trade Clearance
export interface ZkTransferPricingProof {
  id: string;
  sourceEntity: string;
  destinationEntity: string;
  transactionType: 'IP_ROYALTY' | 'MANAGEMENT_SERVICES' | 'COMPONENT_SALES' | 'INTERCOMPANY_LOAN';
  grossAmountUsd: number;
  snarkCircuit: 'Groth16-BN254' | 'Plonk-KZG';
  zkProofHash: string;
  armLengthMarginPct: number;
  oecdCompliant: boolean;
  taxJurisdictionFrom: string;
  taxJurisdictionTo: string;
  verifiedAt: string;
  status: 'PROVEN_COMPLIANT' | 'GENERATING_PROOF' | 'AUDIT_FLAGGED';
}

export interface OecdPillarTwoJurisdiction {
  jurisdiction: string;
  countryCode: string;
  statutoryTaxRatePct: number;
  effectiveTaxRatePct: number;
  pillarTwoThresholdPct: 15;
  topUpTaxRequiredPct: number;
  annualCoveredTaxesUsd: number;
  safeHarbourStatus: 'QUALIFIED_TRANSITIONAL' | 'FULL_COMPLIANCE' | 'TOP_UP_ACCRUED';
}

export interface HsCodeCustomsTariff {
  id: string;
  hsCode: string;
  description: string;
  originCountry: string;
  destinationCountry: string;
  standardTariffPct: number;
  optimizedTreatyTariffPct: number;
  applicableTreaty: string;
  annualSavingsUsd: number;
  declarationStatus: 'AUTO_CLEARED' | 'DOCS_MATCHED' | 'ESCROW_SETTLED';
}

// Dimension 2: RWA & Repo Market
export interface TokenizedReceivable {
  id: string;
  invoiceId: string;
  debtorName: string;
  debtorRating: 'AAA' | 'AA' | 'A' | 'BBB';
  faceValueUsd: number;
  maturityDate: string;
  tokenStandard: 'ERC-3643' | 'CUSIP-ONCHAIN';
  tokenContractAddress: string;
  annualYieldPct: number;
  loanToValuePct: number;
  availableCollateralBorrowUsd: number;
  isPledged: boolean;
  pledgedToFacility?: string;
}

export interface IntradayRepoFacility {
  id: string;
  counterpartyName: string;
  counterpartyType: 'CENTRAL_CLEARING' | 'TIER_1_TREASURY' | 'P2P_PEER_CORP';
  facilityLimitUsd: number;
  utilizedBorrowUsd: number;
  sofrSpreadBps: number;
  allInRatePct: number;
  collateralType: 'US_TREASURY' | 'TOKENIZED_RECEIVABLES' | 'INVESTMENT_GRADE_CP';
  haircutPct: number;
  settlementSpeed: 'INSTANT_SUB_SECOND' | 'INTRA_DAY_2HR' | 'OVERNIGHT';
  status: 'ACTIVE' | 'STANDBY' | 'EXHAUSTED';
}

// Dimension 3: Macro-Hedging & Geopolitical Synthesizer
export interface MacroHedgingPosition {
  id: string;
  assetClass: 'FX' | 'COMMODITY' | 'INTEREST_RATE';
  pairOrInstrument: string;
  direction: 'LONG_HEDGE' | 'SHORT_HEDGE';
  notionalUsd: number;
  unhedgedExposureUsd: number;
  hedgeRatioPct: number;
  currentMtmPnlUsd: number;
  executionVenue: 'DIRECT_ISDA_SWAP' | 'CME_CLEARING' | 'DECENTRALIZED_RFQ';
  autoRebalanceDelta: boolean;
}

export interface GeopoliticalChokepoint {
  id: string;
  name: string;
  region: string;
  transitRiskScore: number; // 0-100
  status: 'NOMINAL' | 'ELEVATED_RISK' | 'CRITICAL_BLOCKAGE' | 'REROUTED';
  typicalDailyTransitVolumeUsd: string;
  averageDelayDays: number;
  insurancePremiumSurchargePct: number;
  alternativeRouteName: string;
  rerouteCostDeltaUsd: number;
  recommendedAction: string;
}

// Dimension 4: Capital Structure & Synthetic M&A
export interface CapitalStructureProfile {
  totalEnterpriseValueUsd: number;
  totalDebtUsd: number;
  totalEquityUsd: number;
  costOfDebtAfterTaxPct: number;
  costOfEquityPct: number;
  currentWaccPct: number;
  optimalWaccPct: number;
  annualInterestSavingsPotentialUsd: number;
  creditRating: string;
  interestCoverageRatio: number;
  debtToEbitdaRatio: number;
}

export interface DebtCovenantRule {
  id: string;
  covenantName: string;
  lenderFacility: string;
  covenantType: 'AFFIRMATIVE' | 'NEGATIVE' | 'FINANCIAL_RATIO';
  thresholdValue: number;
  currentValue: number;
  headroomPct: number;
  status: 'SAFE' | 'WARNING_TIGHT_HEADROOM' | 'BREACHED';
  actionOnViolation: 'BLOCK_AUTONOMOUS_PAYMENTS' | 'FORCE_COLLATERAL_INJECTION' | 'ALERT_CFO';
}

export interface SyntheticMaTarget {
  id: string;
  targetName: string;
  industry: string;
  enterpriseValueUsd: number;
  ebitdaAnnualUsd: number;
  acquisitionMultipleEvEbitda: number;
  postMergerSynergyAnnualUsd: number;
  proFormaAccretionPct: number;
  combinedWaccImpactBps: number;
  antitrustRiskScore: number;
  dealReadinessScore: number;
}

// ==========================================
// Planetary Layer 22: Synthetic Central Bank (E-SDR)
// ==========================================
export interface EsdrReserveAsset {
  id: string;
  assetName: string;
  assetCode: string;
  category: 'SOVEREIGN_RWA' | 'FIAT_RESERVE' | 'HARD_COMMODITY' | 'CRITICAL_METALS';
  weightPct: number;
  reserveValueUsd: number;
  yieldAnnualPct: number;
  custodianVenue: string;
  auditVerificationMethod: 'ONCHAIN_PROOF_OF_RESERVE' | 'ISDA_TRIPARTY_VERIFIED';
}

export interface CentralBankDiscountFacility {
  id: string;
  borrowerEntity: string;
  creditLimitEsdr: number;
  drawnBalanceEsdr: number;
  benchmarkDiscountRatePct: number;
  collateralPledgedUsd: number;
  collateralRatioPct: number;
  status: 'OPEN_LIQUID' | 'ACCELERATED_AMORTIZATION' | 'STANDBY';
  maturityTermDays: number;
}

// ==========================================
// Planetary Layer 23: Orbital Satellite & Physical Twin Escrow
// ==========================================
export interface SatelliteCargoVoyage {
  id: string;
  vesselName: string;
  imoNumber: string;
  flagState: string;
  cargoManifestDescription: string;
  cargoValuationUsd: number;
  escrowSmartContractAddress: string;
  originPort: string;
  destinationPort: string;
  currentLat: number;
  currentLng: number;
  destinationGeofenceRadiusKm: number;
  distanceToDestinationKm: number;
  starlinkSignalQuality: 'OPTIMAL' | 'DEGRADED' | 'OFFLINE';
  tamperSealStatus: 'CRYPTOGRAPHICALLY_SEALED' | 'INSPECTION_BYPASS' | 'BREACH_DETECTED';
  escrowCondition: 'ARRIVAL_WITHIN_GEOFENCE' | 'CUSTOMS_RFID_CLEARED' | 'PORT_DISCHARGE_CONFIRMED';
  escrowStatus: 'LOCKED_IN_ORBITAL_ESCROW' | 'RELEASED_AUTOMATICALLY' | 'FLAGGED_MANUAL_HOLD';
}

// ==========================================
// Planetary Layer 24: Post-Quantum Enclave & Air-Gap Mesh
// ==========================================
export interface PostQuantumCryptographicKey {
  id: string;
  keyAlias: string;
  algorithmStandard: 'ML-KEM-1024 (Crystals-Kyber)' | 'ML-DSA-87 (Crystals-Dilithium)' | 'SPHINCS+-SHA256';
  nistSecurityLevel: 5; // Highest NIST level
  quantumBitSecurityEquivalent: 256;
  activeShards: number;
  totalShardsThreshold: number; // e.g. 3 of 5
  hardwareEnclaveType: 'AMD_SEV_SNP' | 'INTEL_TDX' | 'AWS_NITRO_ENCLAVE';
  geographicDistribution: string[];
  lastRotationTimestamp: string;
  status: 'POST_QUANTUM_SECURE' | 'ROTATING_KEYS';
}

export interface EnclaveHostNode {
  id: string;
  jurisdiction: string;
  datacenterProvider: string;
  attestationStatus: 'REMOTE_ATTESTATION_VERIFIED' | 'ATTESTATION_PENDING';
  memoryEncryptionKeyId: string;
  tamperResponseAction: 'ZEROIZE_VOLATILE_KEYS' | 'AIR_GAP_ISOLATE';
  latencyMs: number;
}

// ==========================================
// Planetary Layer 25: Autonomous Fiduciary AI Board & 190-Nation Compliance
// ==========================================
export interface FiduciaryBoardResolution {
  id: string;
  resolutionTitle: string;
  category: 'TREASURY_CAPITAL_DRAW' | 'CROSS_BORDER_SPV_CREATION' | 'MERGER_BID_AUTHORIZATION' | 'DIVIDEND_SWEEP';
  statutoryJurisdictionBasis: string; // e.g. "Delaware General Corporation Law §141"
  fiduciaryRiskScore: number; // 0-100 (lower is safer)
  autonomousVoteOutcome: 'PASSED_UNANIMOUS' | 'PASSED_MAJORITY' | 'REJECTED_FIDUCIARY_BREACH';
  boardAgentQuorum: number; // e.g. 7 of 7 AI Board Seats
  hashVerificationProof: string;
  enactedAt: string;
  actionPayloadSummary: string;
}

export interface SovereignRegulatoryFiling {
  id: string;
  regulatoryAgency: 'US_SEC' | 'EU_ESMA' | 'SG_MAS' | 'UK_FCA' | 'CH_FINMA';
  filingType: 'FORM_8K_MATERIAL_EVENT' | 'CSRD_ESG_SUSTAINABILITY' | 'MAS_NOTICE_637' | 'FINMA_AML_AUDIT';
  filingStatus: 'AUTO_FILED_CONFIRMED' | 'READY_FOR_SUBMISSION' | 'GENERATING_PACKAGE';
  auditTrailVerificationHash: string;
  duePeriod: string;
  automatedCompilationLatencySec: number;
}

// ==========================================
// Planetary Layer 26: Compute FLOP & Energy Arbitrage Grid
// ==========================================
export interface EnergyPpaContract {
  id: string;
  facilityLocation: string;
  gridInterconnect: string; // e.g. ERCOT, Nord Pool, PJM
  capacityMegawatts: number;
  baseloadPpaPriceMwhUsd: number;
  currentSpotLocationalPriceUsd: number;
  renewableSourceMix: '100% NUCLEAR' | 'GEOTHERMAL_HYDRO' | 'WIND_SOLAR_BATTERY';
  hedgeStatus: 'LOCKED_FORWARD_HEDGE' | 'SPOT_ARBITRAGING' | 'CURTAILMENT_EXPORT';
  annualEnergyCostSavingsUsd: number;
}

export interface TokenizedComputeForward {
  id: string;
  clusterDescriptor: string;
  acceleratorHardware: 'NVIDIA H200 SXM' | 'NVIDIA B200 NVL' | 'TPU v5p Tensor Pod';
  flopsCapacityEaPetaflops: number;
  allocatedHours: number;
  contractExecutionPricePerHourUsd: number;
  currentSpotMarketRentRateUsd: number;
  arbitrageYieldUsd: number;
  deliveryQuarter: string;
  hedgeMode: 'INTERNAL_MODEL_TRAINING' | 'MARKET_YIELD_ARBITRAGE';
}

// ==========================================
// Tier 5 Frontier Layer 27: Relativistic Light-Cone Clearing & Interplanetary Rails
// ==========================================
export interface CelestialClearingNode {
  id: string;
  name: string;
  celestialBody: 'EARTH_LEO' | 'MOON_SOUTH_POLE' | 'MARS_JEZERO' | 'LAGRANGE_L2' | 'CERES_BELT';
  orbitalDistanceKm: number;
  oneWayLightLagSeconds: number;
  localRelativisticTimestamp: string;
  dagBlockHeight: number;
  activeLiquidityBufferUsd: number;
  status: 'SYNCHRONIZED' | 'LIGHT_CONE_DELAY' | 'OCCULTED';
}

export interface InterplanetaryCommodityEscrow {
  id: string;
  contractTitle: string;
  commodityType: 'HELIUM_3_ISOTOPE' | 'HYDROGEN_WATER_PROPELLANT' | 'REGOLITH_RARE_EARTH' | 'SOLAR_SATELLITE_POWER';
  originNode: string;
  destinationNode: string;
  notionalValueUsd: number;
  causalDagProofHash: string;
  lightDelayCompensationBps: number;
  settlementStatus: 'LOCKED_IN_TRANSIT' | 'CAUSAL_VERIFIED' | 'SETTLED_ON_ARRIVAL';
  deliveryArrivalDate: string;
}

// ==========================================
// Tier 5 Frontier Layer 28: Global Thermosphere & Climate Macro-Derivatives
// ==========================================
export interface AtmosphericTelemetryStream {
  id: string;
  sensorNetwork: string; // e.g. NOAA-SAR Sentinel-6, Argo Float Mesh, Mauna Loa
  region: string;
  metricType: 'TROPOSPHERIC_CO2_PPM' | 'GULF_STREAM_AMOC_SV' | 'STRATOSPHERIC_AEROSOL_OPTICAL_DEPTH' | 'ANTARCTIC_MASS_LOSS_GT';
  currentReading: number;
  baseline1990Reference: number;
  volatilityZScore: number;
  derivativeTriggerThreshold: number;
  status: 'NOMINAL' | 'ELEVATED_STRESS' | 'PARAMETRIC_BREACH';
}

export interface CatastropheLiquiditySwap {
  id: string;
  hazardClass: 'AMOC_SLOWDOWN' | 'CATEGORY_6_MEGA_HURRICANE' | 'PAN_CONTINENTAL_DROUGHT' | 'SOLAR_CORONAL_EJECTION';
  coveredRegion: string;
  standbyLiquidityPoolUsd: number;
  triggerParametricIndex: string;
  payoutSponsor: 'SUBNATIONAL_CONSORTIUM' | 'GLOBAL_REINSURANCE_SYN' | 'SOVEREIGN_EMERGENCY_FUND';
  drawdownExecutionSpeedMs: number;
  isAutoDispatched: boolean;
  activeHedgingNotionalUsd: number;
}

// ==========================================
// Tier 5 Frontier Layer 29: Post-Human Autonomous Enterprise Synthesizer (Zero-Employee DAOs)
// ==========================================
export interface AutonomousSyntheticEnterprise {
  id: string;
  legalEntityIdentifier: string;
  incorporationJurisdiction: 'DELAWARE_DST_AUTONOMOUS' | 'SWISS_VEREIN_ALGO' | 'ADGM_SYNTHETIC_CORP' | 'SINGAPORE_VCC_AI';
  fiduciaryBoardType: '100%_MACHINE_GOVERNED';
  coreEconomicPurpose: string;
  operationalCashFlowMoUsd: number;
  treasuryReservesUsd: number;
  automatedShareBuybackBpsDaily: number;
  subSecondArbitrationClause: string;
  totalAutonomousSubcontracts: number;
  lifeCycleStatus: 'PERPETUAL_VALUE_CREATION' | 'SELF_LIQUIDATING_SPV' | 'M&A_SYNTHESIS_ACTIVE';
}

export interface SubSecondArbitrationDocket {
  id: string;
  disputeSubject: string;
  agentParties: string[];
  disputedAmountUsd: number;
  arbitrationAlgorithm: 'NASH_EQUILIBRIUM_CRYPTOGRAPHIC_RESOLVER';
  adjudicationLatencyMs: number;
  verdictOutcome: 'OPTIMAL_PARETO_SPLIT' | 'CONTRACT_ENFORCED_WITH_PENALTY' | 'CROSS_ESCROW_VOID';
  zkLegalProofHash: string;
  timestamp: string;
}

// ==========================================
// Tier 5 Frontier Layer 30: Biological & Neuromorphic Synthetic Wetware Grid
// ==========================================
export interface NeuromorphicWetwareNode {
  id: string;
  facilityLocation: string;
  computeMedium: 'CORTICAL_ORGANOID_ARRAY' | 'SYNTHETIC_DNA_COLD_STORAGE' | 'OPTICAL_NEUROMORPHIC_TENSOR';
  operatingWattage: number; // e.g. 0.05 Watts vs 800W for GPU
  tflopsEquivalent: number;
  storageDensityPetabytesPerGram?: number;
  neuralPlasticityLearningRate: number;
  biologicalLifespanRemainingHours: number;
  thermalEfficiencyRatio: string; // e.g. "99.98% lower than silicon"
  status: 'ONLINE_ACTIVE' | 'SYNAPTIC_PRUNING' | 'DNA_COLD_ARCHIVE';
}

export interface BioComputeForwardContract {
  id: string;
  researchSponsor: string;
  jobSpecification: 'PROTEIN_DE_NOVO_SYNTHESIS' | 'DNA_100TB_LONG_TERM_COLD_WRITE' | 'BRAIN_ORGANOID_SIMULATION';
  capacityUnitsAllocated: string;
  contractPriceUsd: number;
  energySavedKwhVsSilicon: number;
  executionPhase: 'SYNTHESIZING' | 'VERIFYING_MOLECULAR_HASH' | 'DELIVERED_TO_VAULT';
}

// ==========================================
// Tier 5 Frontier Layer 31: The Kardashev Omega Protocol (Civilizational Continuity)
// ==========================================
export interface CivilizationVaultSnapshot {
  id: string;
  storageMedium: 'SYNTHETIC_SAPPHIRE_QUARTZ' | 'SALT_CAVERN_DEEP_GEOLOGICAL' | 'LUNAR_CRATER_COLD_TRAP';
  geographicCoordinates: string;
  totalEncryptedStateBytes: string; // e.g. "480 Petabytes Global Asset Registry"
  lastEtchTimestamp: string;
  tamperProofDurabilityYears: number; // e.g. 1,000,000,000 years
  postQuantumResilienceLevel: 'LATTICE_CRYSTALS_KYBER_1024_PROVEN';
  readinessState: 'CONTINUOUS_LIVE_ETCH' | 'DEEP_DORMANT_RECOVERY_READY';
}

export interface OmegaRebootTrigger {
  id: string;
  cataclysmCondition: 'SOLAR_CME_GRID_BLACKOUT' | 'GLOBAL_SWIFT_SHUTDOWN_72H' | 'TOTAL_FIAT_COLLAPSE' | 'DEEP_INTERNET_PARTITION';
  detectionSensorQuorum: string; // e.g. "5 of 6 air-gapped subterranean seismic & optical relays"
  debtJubileeAction: 'ALGORITHMIC_UNWIND_DEBT_TO_ZERO';
  currencyResetStandard: 'PHYSICAL_CALORIC_JOULES_AND_POTABLE_WATER';
  lastSimulatedExecutionLatencySec: number;
  status: 'STANDBY_WATCHDOG' | 'DRILL_TEST_PASSED';
}

// ==========================================
// Tier 6: Omni-Access Singularity (Layers 32 - 41)
// ==========================================
export interface OmniTelemetryStreamRecord {
  id: string;
  feedType: 'OPTICAL_SAR_SATELLITE' | 'AIS_MARITIME_CARGO' | 'PORT_GANTRY_LOGISTICS' | 'INDUSTRIAL_SMART_METER';
  location: string;
  samplingFrequencyHz: number;
  uncompressedThroughputGbps: number;
  anomalyConfidencePercent: number;
  activeFeedStatus: 'STREAMING' | 'CALIBRATING' | 'TRIGGERED';
}

export interface OmniClearingGatewayRecord {
  id: string;
  networkProtocol: 'FEDNOW_DIRECT' | 'SWIFT_ISO20022_ATOMIC' | 'TARGET2_REALTIME' | 'CIPS_CROSS_BORDER' | 'CENTRAL_BANK_REPO';
  clearingLatencyMs: number;
  volume24hUsd: number;
  dailyNettingCompressionRatio: string;
  liquidityBufferUsd: number;
  status: 'OPERATIONAL' | 'HIGH_VOLUME';
}

export interface OmniCrustTitleRecord {
  id: string;
  resourceCategory: 'LITHIUM_BRINE_DEPOSIT' | 'RARE_EARTH_CARBONATITE' | 'DEEP_AQUIFER_RESERVOIR' | 'URANIUM_CONCESSION';
  jurisdictionCadastre: string;
  estimatedReserveTons: number;
  tokenizedValuationUsd: number;
  royaltyStreamBps: number;
  lienVerificationProof: string;
}

export interface OmniLegalJurisdictionRecord {
  id: string;
  sovereignJurisdiction: string;
  legalRegime: 'STATUTORY_COMMON_LAW' | 'CIVIL_CODE_SYNTHESIS' | 'SPECIAL_ECONOMIC_ZONE_DIFC' | 'SWISS_VEREIN_AUTONOMOUS';
  statutoryIngestionCoveragePct: number;
  automatedFilingLatencySec: number;
  activeDisputeResolutionRules: string;
  complianceConfidenceScore: number;
}

export interface OmniBaseloadPowerRecord {
  id: string;
  facilityName: string;
  generationClass: 'SMR_ADVANCED_NUCLEAR' | 'HVDC_INTERCONTINENTAL_INTERTIE' | 'ULTRA_DEEP_GEOTHERMAL' | 'HYDRO_PUMPED_STORAGE';
  capacityMw: number;
  currentCurtailmentPct: number;
  marginalCostPerMwhUsd: number;
  computeRedirectionReady: boolean;
}

export interface OmniCreditMatrixRecord {
  id: string;
  obligorEntity: string;
  industrySector: string;
  totalDebtExposureUsd: number;
  bayesianDefaultProbability90d: number;
  liquidityRunwayDays: number;
  automatedHedgeState: 'FULLY_COLLATERALIZED' | 'DYNAMICALLY_SHORTED' | 'MONITORED';
}

export interface OmniRoboticLaborRecord {
  id: string;
  fleetIdentifier: string;
  hardwareClass: 'AUTONOMOUS_HAUL_TRUCK' | 'CONTAINER_PORT_STRADDLE' | 'AGRICULTURAL_HARVEST_ROBOT' | 'DATA_CENTER_MAINTENANCE_BOT';
  operatorWalletAddress: string;
  unitsInSwarm: number;
  settlementRatePerTaskUsd: number;
  dailyTasksCompleted: number;
  status: 'ACTIVE_HAUL' | 'BATTERY_HOTSWAP' | 'TASK_QUEUED';
}

export interface OmniExecutiveDirectiveRecord {
  id: string;
  mandateTitle: string;
  naturalLanguageIntent: string;
  translatedConstraintsCount: number;
  executionReadinessScore: number;
  downstreamSmartContractsDispatched: number;
  status: 'SYNTHESIZED_EXECUTING' | 'AWAITING_CHAIR_SIGNATURE' | 'COMPLETED';
}

export interface OmniQuantumCitadelRecord {
  id: string;
  enclaveNode: string;
  cryptographicStandard: 'CRYSTALS_KYBER_1024' | 'SPHINCS_PLUS_HASH_SIG' | 'FHE_HOMOMORPHIC_TENSOR';
  zeroKnowledgeProofLatencyMs: number;
  quantumAttackResistanceYears: number;
  keysUnderSequestration: number;
  auditState: 'PROVEN_SECURE' | 'ATTESTATION_FRESH';
}

export interface OmniCivilizationEpochRecord {
  id: string;
  epochDesignation: string;
  globalWealthAnchorPeg: 'CALORIC_ENERGY_JOULES' | 'POTABLE_WATER_LITERS' | 'GRAIN_EQUIVALENT_CALORIES';
  immutableStateHash: string;
  deepVaultSynchronizationState: 'SVALBARD_ATACAMA_LUNAR_SYNCED';
  debtJubileeReadiness: boolean;
  recoveryTtlSeconds: number;
}

export * from './billing';
export * from './cashflow';
export * from './commercial-ops';
export * from './enterprise-ops';

// ==========================================
// Client Acquisition, Google Maps Discovery & AI Outbound Calling
// ==========================================
export type OutreachStatus = 
  | 'NOT_CONTACTED' 
  | 'EMAIL_DRAFTED' 
  | 'EMAIL_SENT' 
  | 'OPENED' 
  | 'CLICKED' 
  | 'IN_CHAT' 
  | 'VOICE_CALLED' 
  | 'CONVERTED';

export interface ScrapedLead {
  id: string;
  name: string;
  category: string;
  location: string;
  address: string;
  city: string;
  state: string;
  zip?: string;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  status: 'OPERATIONAL' | 'VERIFIED' | 'CLOSING_SOON';
  priceLevel: string;
  openingHours?: string;
  estimatedRevenueRange: string;
  monthlyInvoiceVolume: number;
  icpScore: number; // 0-100
  cashFlowFriction: string;
  contactEmail: string;
  outreachStatus: OutreachStatus;
  lastEmailSentAt?: string;
  lastEmailSubject?: string;
  lastEmailBody?: string;
  emailHistory?: Array<{ subject: string; body: string; sentAt: string }>;
  flywheelAuditSent?: boolean;
  lastInteractionAt?: string;
  notes?: string;
  callCount: number;
  tags: string[];
}

export interface OutboundCallRecord {
  id: string;
  leadId: string;
  leadName: string;
  phone: string;
  status: 'INITIATED' | 'RINGING' | 'CONNECTED' | 'COMPLETED' | 'MISSED' | 'FAILED';
  durationSeconds: number;
  callType: 'WEB_BROWSER_VOICE' | 'AUTOMATED_PHONE_OUTBOUND';
  transcript: Array<{ role: 'ai' | 'client'; text: string; timestamp: string }>;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'SKEPTICAL' | 'HIGH_INTENT';
  detectedInterest: string[];
  meetingBooked?: boolean;
  scheduledMeetingTime?: string;
  createdAt: string;
}

