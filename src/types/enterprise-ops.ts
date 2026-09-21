// Enterprise Commercial Operations: Bank Reconciliation, ERP Integrations, Dual-Control RBAC, and What-If Stress Studio

// ==========================================
// 1. RECONCILIATION & MATCHING ENGINE
// ==========================================
export type ReconciliationMatchConfidence = 'EXACT_MATCH' | 'HIGH_PROBABILITY' | 'HEURISTIC' | 'UNMATCHED';

export interface ReconciliationMatchCandidate {
  id: string;
  transactionId: string;
  referenceType: 'INVOICE' | 'EXPENSE' | 'SWEEP' | 'PAYROLL';
  referenceId: string;
  referenceNumber: string; // e.g. "INV-2026-001" or "AWS-INV-998214"
  counterpartyName: string;
  transactionAmount: number;
  referenceAmount: number;
  amountDifference: number;
  transactionDate: string;
  referenceDueDate: string;
  daysDifference: number;
  confidenceScore: number; // 0 to 100
  confidenceTier: ReconciliationMatchConfidence;
  matchReasons: string[];
  suggestedAction: 'AUTO_RECONCILE' | 'MANUAL_REVIEW' | 'FLAG_DISCREPANCY';
}

export interface ReconciliationAuditReceipt {
  id: string;
  transactionId: string;
  referenceType: 'INVOICE' | 'EXPENSE' | 'SWEEP' | 'PAYROLL';
  referenceId: string;
  referenceNumber: string;
  counterparty: string;
  amount: number;
  reconciledAt: string;
  reconciledBy: string;
  reconciliationMethod: 'AUTONOMOUS_EXACT' | 'MANUAL_OVERRIDE' | 'HEURISTIC_CONFIRMED';
  cryptographicProofHash: string;
  bankAccountId: string;
  bankAccountName: string;
  notes?: string;
}

// ==========================================
// 2. ERP INTEGRATIONS & WEBHOOKS
// ==========================================
export type ErpExportFormat = 'QUICKBOOKS_ONLINE_CSV' | 'QUICKBOOKS_IIF' | 'XERO_CSV' | 'NETSUITE_CSV' | 'OFX_XML';

export interface ErpGeneralLedgerEntry {
  id: string;
  date: string;
  entryNumber: string;
  accountCode: string;
  accountName: string;
  description: string;
  debitUsd: number;
  creditUsd: number;
  referenceId: string;
  entityName: string;
}

export interface WebhookEndpointConfig {
  id: string;
  organizationId: string;
  url: string;
  description: string;
  secretKeyMasked: string;
  status: 'ACTIVE' | 'PAUSED' | 'FAILED';
  subscribedEvents: string[];
  createdAt: string;
  lastTriggeredAt?: string;
  successfulDeliveriesCount: number;
  failedDeliveriesCount: number;
}

export interface WebhookDeliveryLog {
  id: string;
  endpointId: string;
  event: string;
  dispatchedAt: string;
  statusCode: number;
  latencyMs: number;
  signatureHeader: string;
  payloadSummary: string;
  status: 'SUCCESS' | 'FAILURE';
  responseBody?: string;
}

// ==========================================
// 3. DUAL-CONTROL RBAC & APPROVAL CHAINS
// ==========================================
export type EnterpriseRoleType = 
  | 'CFO_SOVEREIGN_ADMIN' 
  | 'CORPORATE_CONTROLLER' 
  | 'TREASURY_OPERATOR' 
  | 'COMPLIANCE_AUDITOR' 
  | 'SALES_BILLING_LEAD';

export interface EnterpriseRolePermission {
  role: EnterpriseRoleType;
  displayName: string;
  description: string;
  maxSingleSignerLimitUsd: number;
  canApproveDualSignOff: boolean;
  canConfigureWebhooks: boolean;
  canOverridePricingFloor: boolean;
  canExecuteTreasurySweeps: boolean;
  canSignTaxFilings: boolean;
  activeMembersCount: number;
}

export type ApprovalRequestCategory = 
  | 'WIRE_DISBURSEMENT' 
  | 'CONTRACT_QUOTE_DISCOUNT' 
  | 'TREASURY_SWEEP' 
  | 'TAX_FILING_AUTHORIZATION' 
  | 'CREDIT_LIMIT_EXPANSION';

export interface DualControlApprovalTicket {
  id: string;
  organizationId: string;
  ticketNumber: string;
  category: ApprovalRequestCategory;
  title: string;
  description: string;
  amountUsd: number;
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'PENDING_FIRST_SIGNATURE' | 'PENDING_SECOND_SIGNATURE' | 'FULLY_APPROVED' | 'REJECTED';
  initiatedBy: string;
  initiatedAt: string;
  firstSignature?: {
    signerName: string;
    signerRole: EnterpriseRoleType;
    signedAt: string;
    signatureHash: string;
  };
  secondSignature?: {
    signerName: string;
    signerRole: EnterpriseRoleType;
    signedAt: string;
    signatureHash: string;
  };
  rejectionReason?: string;
  referenceId?: string;
}

// ==========================================
// 4. "WHAT-IF" STRESS SIMULATION STUDIO
// ==========================================
export interface WhatIfScenarioInput {
  revenueGrowthShockMoM: number; // -50% to +50%
  opexInflationShockPct: number; // 0% to +40%
  topCustomerChurnPct: number; // 0% to 50%
  receivablesCollectionDelayDays: number; // 0 to 60 days
  strategicCapexExpansionUsd: number; // $0 to $300,000
}

export interface WhatIfSimulationComparison {
  scenarioName: string;
  description: string;
  projectedRunwayMonths: number;
  runwayDeltaMonths: number;
  survivalProbability12Mo: number;
  survivalProbability24Mo: number;
  endingCash12Mo: number;
  lowestCashTroughUsd: number;
  lowestCashTroughMonth: string;
  status: 'SOLVENT' | 'CAUTION' | 'CRITICAL_SHORTFALL';
}

// ==========================================
// 5. AI CFO COPILOT & TREASURY BRIEFINGS
// ==========================================
export type AnomalySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TreasuryAnomalyAlert {
  id: string;
  type: 'WIRE_ANOMALY' | 'DUPLICATE_INVOICE' | 'PRICE_ESCALATION' | 'UNUSUAL_BURN' | 'COLLECTION_STALL';
  title: string;
  description: string;
  severity: AnomalySeverity;
  detectedAt: string;
  financialImpactUsd: number;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  counterparty?: string;
  recommendedAction: string;
}

export interface DailyTreasuryBriefing {
  id: string;
  date: string;
  headline: string;
  netCashFlow24hUsd: number;
  currentLiquidityUsd: number;
  runwayMonths: number;
  yieldEarned24hUsd: number;
  overnightMovements: {
    inflowsUsd: number;
    outflowsUsd: number;
    pendingWiresCount: number;
  };
  keyActionItems: string[];
  anomaliesDetectedCount: number;
  aiCommentary: string;
  confidenceScore: number;
}

export interface AiCfoChatMessage {
  id: string;
  sender: 'USER' | 'AI_CFO';
  timestamp: string;
  text: string;
  suggestedPrompts?: string[];
  actionRecommendation?: {
    type: 'SWEEP' | 'INVOICE_FOLLOWUP' | 'HEDGE' | 'CAPEX_ADJUST';
    label: string;
    payload: any;
  };
}

// ==========================================
// 6. MULTI-CURRENCY FX HEDGING & INTERNATIONAL TREASURY
// ==========================================
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'SGD';

export interface FxRateQuote {
  pair: string; // e.g. "EUR/USD"
  baseCurrency: CurrencyCode;
  quoteCurrency: CurrencyCode;
  spotRate: number;
  dayChangePct: number;
  volatility30d: number;
  updatedAt: string;
}

export interface CurrencyExposure {
  currency: CurrencyCode;
  symbol: string;
  flag: string;
  balanceInCurrency: number;
  usdEquivalent: number;
  unhedgedExposurePct: number;
  hedgedAmountUsd: number;
  hedgeRatioPct: number;
  openReceivablesUsd: number;
  openPayablesUsd: number;
  riskStatus: 'BALANCED' | 'MODERATE_EXPOSURE' | 'HIGH_EXPOSURE';
}

export interface FxForwardHedgeContract {
  id: string;
  contractNumber: string;
  currencyPair: string;
  direction: 'BUY' | 'SELL';
  notionalAmountForeign: number;
  lockedForwardRate: number;
  currentSpotRate: number;
  mtmGainLossUsd: number; // Mark to market
  maturityDate: string;
  status: 'ACTIVE' | 'SETTLED' | 'CANCELLED';
  purpose: string;
}

export interface InternationalTaxNexus {
  jurisdiction: string;
  code: string; // e.g. "EU-OSS", "UK-HMRC", "US-CA", "JP-NTA"
  taxType: 'VAT' | 'GST' | 'SALES_TAX' | 'DIGITAL_SERVICES';
  standardRatePct: number;
  currentQuarterTaxableSalesUsd: number;
  accruedTaxLiabilityUsd: number;
  filingDeadline: string;
  status: 'COMPLIANT' | 'THRESHOLD_APPROACHING' | 'FILING_DUE';
  autoReverseChargeEnabled: boolean;
}

// ==========================================
// 7. CAP TABLE, EQUITY & CAPEX DEPRECIATION
// ==========================================
export type ShareClass = 'COMMON' | 'PREFERRED_SEED' | 'PREFERRED_SERIES_A' | 'PREFERRED_SERIES_B' | 'OPTIONS_POOL';

export interface CapTableShareholder {
  id: string;
  name: string;
  stakeholderType: 'FOUNDER' | 'INVESTOR' | 'EMPLOYEE_POOL' | 'ADVISOR';
  shareClass: ShareClass;
  sharesCount: number;
  ownershipPct: number;
  investedCapitalUsd: number;
  currentValuationUsd: number;
  liquidationPreferenceMultiple: number;
  vestedPct: number;
}

export interface SafeNoteAgreement {
  id: string;
  investorName: string;
  investmentAmountUsd: number;
  valuationCapUsd: number;
  discountPct: number;
  dateSigned: string;
  conversionTriggerStatus: 'OUTSTANDING' | 'CONVERTED';
}

export interface FixedAssetDepreciation {
  id: string;
  assetTag: string;
  name: string;
  category: 'COMPUTING_HARDWARE' | 'ENTERPRISE_SOFTWARE' | 'OFFICE_INFRASTRUCTURE' | 'LAB_EQUIPMENT';
  purchaseDate: string;
  costBasisUsd: number;
  salvageValueUsd: number;
  usefulLifeMonths: number;
  method: 'STRAIGHT_LINE' | 'MACRS_5YR' | 'MACRS_7YR';
  accumulatedDepreciationUsd: number;
  currentBookValueUsd: number;
  monthlyDepreciationExpenseUsd: number;
  generalLedgerAccountId: string;
}

// ==========================================
// 8. INVESTOR RELATIONS & BOARD DECK STUDIO
// ==========================================
export interface InvestorSaaSMetrics {
  mrrUsd: number;
  arrUsd: number;
  arrGrowthYoYPct: number;
  netRevenueRetentionPct: number;
  grossMarginPct: number;
  cacUsd: number;
  ltvUsd: number;
  ltvToCacRatio: number;
  magicNumber: number;
  ruleOf40Score: number;
  burnMultiple: number;
  cashRunwayMonths: number;
  grossRetentionPct: number;
  activeEnterpriseCustomers: number;
}

export interface BoardDeckSlide {
  id: string;
  slideNumber: number;
  title: string;
  category: 'EXECUTIVE_SUMMARY' | 'FINANCIALS' | 'GROWTH_METRICS' | 'UNIT_ECONOMICS' | 'CAP_TABLE_OUTLOOK';
  keyTakeaway: string;
  chartType: 'ARR_BRIDGE' | 'COHORT_NRR' | 'BURN_RUNWAY' | 'WATERFALL' | 'CAP_TABLE_PIE';
  metricsSummary: { label: string; value: string; trend: 'POSITIVE' | 'NEUTRAL' | 'WARNING' }[];
}

