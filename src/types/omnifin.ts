/**
 * OMNIFIN — GLOBAL AUTONOMOUS FINANCIAL OPERATING LAYER
 * State + Intelligence + Integrity + Execution + Clearing + Settlement Layer
 * Operates above and across existing financial infrastructure.
 */

export type OmnifinSurface = 
  | 'OVERVIEW'
  | 'MARKET'
  | 'WALLET'
  | 'SHIELD'
  | 'INTELLIGENCE'
  | 'INTEGRITY'
  | 'RISK'
  | 'LIQUIDITY'
  | 'CLEAR'
  | 'SETTLE'
  | 'PROOF'
  | 'AGENTS'
  | 'RWA'
  | 'TREASURY'
  | 'RECOVERY'
  | 'DEVELOPER';

export type OmnifinOperatingStep =
  | 'OBSERVE'
  | 'UNDERSTAND'
  | 'DETECT'
  | 'SIMULATE'
  | 'DECIDE'
  | 'AUTHORIZE'
  | 'EXECUTE'
  | 'CLEAR'
  | 'SETTLE'
  | 'VERIFY'
  | 'RECONCILE'
  | 'MONITOR'
  | 'LEARN';

export type EmergencyMarketMode =
  | 'NORMAL'
  | 'ELEVATED_RISK'
  | 'RESTRICTED'
  | 'EMERGENCY'
  | 'ISOLATED'
  | 'RECOVERY'
  | 'RECONCILIATION';

export type OmnifinAssetClass =
  | 'CRYPTO'
  | 'STABLECOIN'
  | 'NFT'
  | 'TOKENIZED_SECURITY'
  | 'EQUITY'
  | 'BOND'
  | 'COMMODITY'
  | 'FX'
  | 'DERIVATIVE'
  | 'LOAN'
  | 'INVOICE'
  | 'COLLATERAL'
  | 'TREASURY_ASSET'
  | 'PRIVATE_CREDIT'
  | 'RWA_INSTRUMENT';

export interface OmnifinUniversalAsset {
  id: string;
  symbol: string;
  name: string;
  assetClass: OmnifinAssetClass;
  issuer: string;
  jurisdiction: string;
  currentPrice: number;
  change24h: number;
  liquidityUsd: number;
  marketDepthUsd: number;
  collateralHaircutPct: number;
  riskScore: number; // 0-100 (lower is safer)
  ownershipConcentrationPct: number;
  contractPermissions: {
    isUpgradable: boolean;
    hasAdminPause: boolean;
    hasMintAuthority: boolean;
    isMpcGuarded: boolean;
  };
  provenanceProofHash: string;
  settlementRails: string[];
}

export interface CausalEventNode {
  eventId: string;
  parentHash: string;
  timestamp: string;
  source: string;
  category: 'MACRO_SHOCK' | 'BOND_YIELD' | 'FX_CURRENCY' | 'EQUITY_STRESS' | 'LIQUIDITY_RUN' | 'SETTLEMENT_CLEAR' | 'POLICY_DEFENSE';
  title: string;
  description: string;
  causalImpact: string;
  riskDelta: number;
  proofSignature: string;
}

export interface MarketIntegrityAlert {
  id: string;
  assetSymbol: string;
  category: 'WASH_TRADING' | 'SPOOFING' | 'LIQUIDITY_MANIPULATION' | 'WALLET_CLUSTER' | 'INSIDER_DUMP' | 'ORACLE_DIVERGENCE';
  observedFacts: string;
  riskSignals: string;
  confirmedViolation: boolean;
  confidenceScore: number; // 0-100%
  timestamp: string;
  evidenceHashes: string[];
  recommendedAction: string;
}

export interface ProofCarryingTransaction {
  txId: string;
  intent: string;
  amountUsd: number;
  asset: string;
  sourceAccount: string;
  destinationRail: string;
  timestamp: string;
  proofs: {
    intentProof: boolean;
    identityProof: boolean;
    permissionProof: boolean;
    securityProof: boolean;
    riskProof: boolean;
    simulationProof: boolean;
    policyProof: boolean;
    authorizationProof: boolean;
    executionProof: boolean;
    settlementProof: boolean;
  };
  status: 'PENDING' | 'POLICY_CHECK' | 'PROOF_VERIFIED' | 'SETTLED' | 'REJECTED_NO_PROOF';
}

export interface AutonomousFinancialAgent {
  id: string;
  name: string;
  role: 
    | 'Market Intelligence Agent'
    | 'Trading Agent'
    | 'Treasury Agent'
    | 'Risk Agent'
    | 'Security Agent'
    | 'Liquidity Agent'
    | 'Clearing Agent'
    | 'Compliance Agent'
    | 'Research Agent'
    | 'Portfolio Agent'
    | 'Recovery Agent'
    | 'Audit Agent';
  leastPrivilegeScope: string;
  spendingLimitUsd: number;
  currentCycleSpendUsd: number;
  reputationScore: number;
  status: 'ACTIVE' | 'POLICY_LOCKED' | 'SIMULATING' | 'REVERTED';
  lastAction: string;
  lastActionTime: string;
  emergencyFreezeAvailable: boolean;
}

export interface NettingObligation {
  id: string;
  partyA: string;
  partyB: string;
  asset: string;
  grossObligationAtoB: number;
  grossObligationBtoA: number;
  netObligationAmount: number;
  netPayer: string;
  netReceiver: string;
  settlementDeadline: string;
  capitalSavedUsd: number;
  status: 'NETTED_VERIFIED' | 'SETTLEMENT_QUEUED' | 'FINALIZED';
}

export interface CounterfactualSimulationResult {
  simulationId: string;
  scenarioName: string;
  expectedOutcome: string;
  bestCase: string;
  baseCase: string;
  adverseCase: string;
  extremeCase: string;
  invalidationCondition: string;
  maxEstimatedDrawdownPct: number;
  liquiditySurplusRequiredUsd: number;
  policyApproved: boolean;
}
