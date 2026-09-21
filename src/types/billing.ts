export type PlanId = 'free' | 'pro' | 'business' | 'enterprise';

export type BillingInterval = 'monthly' | 'annual';

export type SubscriptionStatus = 
  | 'FREE' 
  | 'TRIALING' 
  | 'ACTIVE' 
  | 'PAST_DUE' 
  | 'PAUSED' 
  | 'CANCELED' 
  | 'EXPIRED';

export interface PlanEntitlements {
  aiAdvisorLevel: 'limited' | 'enabled' | 'full';
  wealthEngines: 'limited' | 'full';
  maxAgents: number;
  maxSeats: number;
  maxMonthlyAiCalls: number;
  maxMonthlySimulations: number;
  maxScenarios?: number;
  supportLevel?: string;
  advancedTrust: boolean;
  aiFirewall: boolean;
  humanApprovalWorkflow: boolean;
  advancedAuditLogs: boolean;
  customPolicies: boolean;
  apiAccess: boolean;
  ssoSaml: boolean;
  dedicatedInfrastructure: boolean;
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  targetAudience: string;
  description?: string;
  isPopular?: boolean;
  monthlyPrice: number | null; // null for custom Enterprise
  annualPrice: number | null; // null for custom Enterprise
  currency: string;
  trialDays: number;
  isActive: boolean;
  features: string[];
  entitlements: PlanEntitlements;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  organizationId: string;
  planId: PlanId;
  status: SubscriptionStatus;
  billingInterval: BillingInterval;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialStart?: string;
  trialEnd?: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  billingCustomerId: string;
  providerSubscriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingCustomer {
  id: string;
  organizationId: string;
  email: string;
  name: string;
  paymentMethodBrand?: string;
  paymentMethodLast4?: string;
  providerCustomerId: string;
  createdAt: string;
}

export interface UsageRecord {
  id: string;
  organizationId: string;
  metric: 'ai_tokens' | 'ai_calls' | 'agent_executions' | 'simulations' | 'api_calls' | 'verification_proofs';
  quantity: number;
  costEstimateUsd: number;
  recordedAt: string;
  period: string; // YYYY-MM
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRatePct?: number;
  amount: number;
}

export type InvoicePaymentTerms = 'DUE_ON_RECEIPT' | 'NET_15' | 'NET_30' | 'NET_60';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'open' | 'overdue' | 'void' | 'uncollectible';

export interface Invoice {
  id: string;
  organizationId: string;
  invoiceNumber?: string;
  clientName?: string;
  clientEmail?: string;
  clientAddress?: string;
  clientTaxId?: string;
  issueDate?: string;
  dueDate?: string;
  paymentTerms?: InvoicePaymentTerms;
  lineItems?: InvoiceLineItem[];
  subtotal?: number;
  taxTotal?: number;
  discountTotal?: number;
  totalAmount?: number;
  amountPaid: number;
  currency: string;
  status: InvoiceStatus;
  billingReason?: 'subscription_create' | 'subscription_cycle' | 'subscription_update' | 'manual' | 'commercial_services';
  notes?: string;
  paymentInstructions?: string;
  invoicePdfUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PaymentEvent {
  id: string;
  organizationId: string;
  providerEventId: string;
  eventType: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'refunded';
  failureReason?: string;
  createdAt: string;
}

export interface SubscriptionEvent {
  id: string;
  organizationId: string;
  fromPlan: PlanId;
  toPlan: PlanId;
  eventType: 'CREATED' | 'TRIAL_STARTED' | 'UPGRADED' | 'DOWNGRADED' | 'CANCELED' | 'RENEWED' | 'EXPIRED' | 'PAST_DUE';
  reason: string;
  timestamp: string;
}

export interface ProcessedWebhookEvent {
  id: string;
  providerEventId: string;
  eventType: string;
  processedAt: string;
}

export interface AdminPricingAudit {
  id: string;
  adminUserId: string;
  changedBy?: string;
  planId: PlanId;
  field: string;
  oldValue: any;
  newValue: any;
  reason: string;
  timestamp: string;
}

export type ExpenseCategory = 
  | 'SOFTWARE_SAAS' 
  | 'PAYROLL_CONTRACTORS' 
  | 'MARKETING_ADS' 
  | 'OFFICE_FACILITIES' 
  | 'LEGAL_COMPLIANCE' 
  | 'HARDWARE_EQUIPMENT' 
  | 'TRAVEL_MEALS' 
  | 'OTHER';

export type ExpenseStatus = 'pending_approval' | 'approved' | 'paid' | 'rejected';
export type ExpensePaymentMethod = 'corporate_card' | 'ach_wire' | 'check' | 'reimbursement';

export interface Expense {
  id: string;
  organizationId: string;
  vendorName: string;
  category: ExpenseCategory;
  description: string;
  invoiceNumber?: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: ExpenseStatus;
  paymentMethod: ExpensePaymentMethod;
  approvedBy?: string;
  approvedAt?: string;
  receiptUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CommercialAnalytics {
  totalSignups: number;
  trialStarts: number;
  trialConversions: number;
  paidSubscriptions: number;
  upgrades: number;
  downgrades: number;
  cancellations: number;
  churnRate: number | null;
  mrr: number;
  arr: number;
  arpu: number | null;
  planDistribution: Record<PlanId, number>;
  activeOrganizations: number;
  activeAgents: number;
  totalAiUsage: number;
  totalUsageCost: number;
  grossMarginEstimate: number | null;
}

export interface EntitlementCheckResult {
  allowed: boolean;
  reason?: string;
  currentUsage?: number;
  limit?: number;
  upgradeRequiredPlan?: PlanId;
}
