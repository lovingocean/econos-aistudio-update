// Commercial Operations Types: Pricing Engine, Treasury & Banking, CRM Pipeline, and Tax/Compliance

// ==========================================
// 1. PRICING & PACKAGING (RATE CARDS & CPQ)
// ==========================================
export interface RateCardItem {
  id: string;
  name: string;
  category: 'SUBSCRIPTION_SEAT' | 'USAGE_METER' | 'PROFESSIONAL_SERVICES' | 'SUPPORT_SLA' | 'CUSTOM_MODULE' | string;
  billingModel: 'FLAT_MONTHLY' | 'PER_SEAT' | 'PER_UNIT' | 'HOURLY' | 'TIERED' | string;
  unitPriceUsd: number;
  basePriceUsd?: number;
  floorPriceUsd?: number;
  costToDeliverUsd: number; // For gross margin calculation
  unitDescription: string; // e.g. "per active seat / month", "per million tokens"
  unit?: string;
  description?: string;
  minCommitmentUnits?: number;
  minimumMarginPct?: number;
  recommendedGrossMarginPct: number;
}

export interface ContractQuoteItem {
  id?: string;
  rateCardItemId: string;
  rateCardId?: string;
  name: string;
  unitPriceUsd: number;
  quantity: number;
  discountPct: number; // 0 to 100
  effectivePriceUsd: number;
  subtotalUsd: number;
  grossMarginPct: number;
  estimatedMarginPct?: number;
}

export interface ContractQuote {
  id: string;
  organizationId: string;
  quoteNumber: string;
  clientName: string;
  clientEmail: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'APPROVED' | 'CONVERTED_TO_INVOICE' | 'EXPIRED' | 'REJECTED';
  slaTier?: string;
  contractTermMonths: number;
  items: ContractQuoteItem[];
  annualContractValueUsd: number;
  totalContractValueUsd?: number;
  monthlyRecurringValueUsd: number;
  blendedGrossMarginPct: number;
  grossMarginPct?: number;
  discountPct?: number;
  marginFloorCompliant?: boolean;
  discountApprovedBy?: string;
  notes?: string;
  convertedInvoiceId?: string;
  validUntil: string;
  createdAt: string;
  updatedAt?: string;
}

// ==========================================
// 2. TREASURY, BANKING & RECONCILIATION
// ==========================================
export type TreasuryAccountType = 'CHECKING_OPERATING' | 'PAYROLL_SWEEP' | 'TREASURY_YIELD_TBILLS' | 'TAX_ESCROW' | 'MERCHANT_CLEARING' | string;

export interface TreasuryAccount {
  id: string;
  organizationId: string;
  accountName: string;
  accountNumberMasked: string; // e.g. "•••• 8921"
  accountNumberLast4?: string;
  institutionName: string; // e.g. "Silicon Valley Bank / First Citizens", "JPMorgan Chase", "Mercury"
  accountType: any;
  currency: string;
  currentBalanceUsd: number;
  availableBalanceUsd: number;
  annualYieldApyPct: number; // e.g. 4.85% on Treasury Sweep
  yieldRateApyPct?: number;
  isDefaultDisbursementAccount: boolean;
  unreconciledItemsCount: number;
  lastReconciledAt: string;
}

export interface BankTransaction {
  id: string;
  organizationId: string;
  accountId: string;
  date: string;
  description: string;
  amount: number; // positive deposit, negative debit
  category: any;
  status: 'POSTED' | 'PENDING' | 'RECONCILED' | 'UNRECONCILED' | string;
  matchedReferenceType?: 'INVOICE' | 'EXPENSE' | 'SWEEP' | 'PAYROLL';
  matchedReferenceId?: string;
  notes?: string;
}

// ==========================================
// 3. SALES PIPELINE & CRM DEAL FORECASTING
// ==========================================
export type DealStage = 'DISCOVERY' | 'PROPOSAL_SUBMITTED' | 'SECURITY_LEGAL_REVIEW' | 'CONTRACT_SIGNING' | 'CLOSED_WON' | 'CLOSED_LOST';

export interface PipelineDeal {
  id: string;
  organizationId: string;
  dealName: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  stage: DealStage;
  dealValueUsd: number;
  recurringAnnualUsd: number;
  winProbabilityPct: number; // 0 to 100
  weightedValueUsd: number; // dealValueUsd * (winProbabilityPct / 100)
  targetCloseDate: string;
  assignedLead: string;
  notes?: string;
  lossReason?: string;
  createdAt: string;
  updatedAt?: string;
}

// ==========================================
// 4. TAX RESERVES & COMPLIANCE VAULT
// ==========================================
export interface QuarterlyTaxEstimate {
  year: number;
  quarter: 1 | 2 | 3 | 4;
  estimatedTaxableIncomeUsd: number;
  effectiveTaxRatePct: number;
  estimatedTaxDueUsd: number;
  currentTaxReserveUsd: number;
  reserveSurplusOrDeficitUsd: number;
  dueDate: string;
  status: 'ACCRUING' | 'FUNDED' | 'FILED_AND_PAID';
}

export interface VendorTaxComplianceRecord {
  id: string;
  organizationId: string;
  vendorId?: string;
  vendorName: string;
  tinOrEinMasked?: string; // e.g. "XX-XXX4192"
  tinLast4Masked?: string;
  tinOnFileType?: string;
  entityType?: 'INDIVIDUAL_SOLE_PROP' | 'SINGLE_MEMBER_LLC' | 'C_CORPORATION' | 'S_CORPORATION' | 'PARTNERSHIP' | string;
  formType?: 'W9_US_CORP' | 'W9_US_LLC' | 'W9_US_INDIVIDUAL_1099' | 'W8_BEN_FOREIGN' | string;
  w9Status: 'VERIFIED' | 'EXPIRED' | 'MISSING' | 'NEEDS_RENEWAL' | 'PENDING_SIGNATURE' | string;
  w9ReceivedDate?: string;
  w9SignedDate?: string;
  annualYtdDisbursedUsd?: number;
  totalPaymentsYtdUsd?: number;
  requires1099Nec?: boolean;
  is1099Eligible?: boolean;
  nec1099FilingStatus?: 'NOT_REQUIRED' | 'DRAFT' | 'READY_TO_FILE' | 'FILED' | string;
  backupWithholdingRequired?: boolean;
}
