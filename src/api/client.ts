import {
  User,
  Organization,
  Business,
  EconomicProfile,
  Opportunity,
  Scenario,
  OutcomeVerification,
  WealthProfile,
  WealthEngineItem,
  Agent,
  EconomicPassport,
  AgentApprovalRequest,
  AgentIncident,
  AuditLogEntry,
  PolicyRule,
  EconomicGraphData,
  PricingPlan,
  Subscription,
  PlanEntitlements,
  BillingCustomer,
  Invoice,
  Expense,
  CashFlowForecastResponse,
  CashFlowSimulationParams,
  CommercialAnalytics,
  AdminPricingAudit,
  PlanId,
  BillingInterval,
  RateCardItem,
  ContractQuote,
  TreasuryAccount,
  BankTransaction,
  PipelineDeal,
  QuarterlyTaxEstimate,
  VendorTaxComplianceRecord
} from '../types/econos';

class EconosApiClient {
  private currentOrgId: string | null = null;
  private currentUserId: string | null = null;
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('econos_auth_token');
      this.currentOrgId = localStorage.getItem('econos_org_id');
      this.currentUserId = localStorage.getItem('econos_user_id');
    }
  }

  public setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('econos_auth_token', token);
      } else {
        localStorage.removeItem('econos_auth_token');
      }
    }
  }

  public setContext(orgId: string, userId: string) {
    this.currentOrgId = orgId;
    this.currentUserId = userId;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('econos_org_id', orgId);
        localStorage.setItem('econos_user_id', userId);
      } catch (_) {}
    }
  }

  public clearAuth() {
    this.token = null;
    this.currentUserId = null;
    this.currentOrgId = null;
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('econos_auth_token');
        localStorage.removeItem('econos_org_id');
        localStorage.removeItem('econos_user_id');
      } catch (_) {}
    }
  }

  public getCurrentUserId(): string | null {
    return this.currentUserId;
  }

  public getCurrentOrgId(): string | null {
    return this.currentOrgId;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
      ...(this.currentOrgId ? { 'x-organization-id': this.currentOrgId } : {}),
      ...(this.currentUserId ? { 'x-user-id': this.currentUserId } : {}),
      ...((options.headers as any) || {})
    };

    const res = await fetch(endpoint, {
      ...options,
      headers
    });

    if (!res.ok) {
      let errMsg = `Request failed with status ${res.status}`;
      try {
        const json = await res.json();
        if (json.error) errMsg = json.error;
        else if (json.message) errMsg = json.message;
      } catch (_) {}
      throw new Error(errMsg);
    }

    return res.json();
  }

  // Auth
  public async getMe(): Promise<{ authenticated: boolean; user: User; organizations: Organization[]; currentOrg?: Organization; subscription?: Subscription }> {
    return this.request('/api/auth/me');
  }

  public async getUsers(): Promise<User[]> {
    return this.request('/api/auth/users');
  }

  public async login(email: string, password?: string, userId?: string): Promise<{ authenticated: boolean; user: User; token: string; currentOrg: Organization; subscription?: Subscription; organizations: Organization[] }> {
    const res = await this.request<any>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, userId })
    });
    if (res.token) {
      this.setToken(res.token);
      if (res.user?.id && res.currentOrg?.id) {
        this.setContext(res.currentOrg.id, res.user.id);
      }
    }
    return res;
  }

  public async loginAsMeek(): Promise<{ authenticated: boolean; user: User; token: string; currentOrg: Organization; subscription?: Subscription; organizations: Organization[] }> {
    const res = await this.request<any>('/api/auth/sovereign-session', {
      method: 'POST'
    });
    if (res.token) {
      this.setToken(res.token);
      if (res.user?.id && res.currentOrg?.id) {
        this.setContext(res.currentOrg.id, res.user.id);
      }
    }
    return res;
  }

  public async loginAsDemo(): Promise<{ authenticated: boolean; user: User; token: string; currentOrg: Organization; subscription?: Subscription; organizations: Organization[] }> {
    const res = await this.request<any>('/api/auth/demo-session', {
      method: 'POST'
    });
    if (res.token) {
      this.setToken(res.token);
      if (res.user?.id && res.currentOrg?.id) {
        this.setContext(res.currentOrg.id, res.user.id);
      }
    }
    return res;
  }

  public async signup(data: { name: string; email: string; password?: string; organizationName?: string; businessName?: string; tier?: string }): Promise<{ authenticated: boolean; user: User; token: string; organization: Organization; business: Business; subscription?: Subscription; organizations: Organization[] }> {
    const res = await this.request<any>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.token) {
      this.setToken(res.token);
      if (res.user?.id && res.organization?.id) {
        this.setContext(res.organization.id, res.user.id);
      }
    }
    return res;
  }

  public async logout(): Promise<void> {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } catch (_) {}
    this.clearAuth();
  }

  public async getOrganizations(): Promise<Organization[]> {
    return this.request('/api/organizations');
  }

  public async createOrganization(name: string, tier: Organization['tier'] = 'PRO'): Promise<Organization> {
    return this.request('/api/organizations', {
      method: 'POST',
      body: JSON.stringify({ name, tier })
    });
  }

  public async getBusinesses(): Promise<Business[]> {
    return this.request('/api/businesses');
  }

  public async createBusiness(name: string, industry?: string): Promise<Business> {
    return this.request('/api/businesses', {
      method: 'POST',
      body: JSON.stringify({ name, industry })
    });
  }

  // Business Module
  public async getEconomicSnapshot(): Promise<{
    business: Business;
    profile: EconomicProfile;
    opportunitiesCount: number;
    scenariosCount: number;
    verificationsCount: number;
  }> {
    return this.request('/api/business/economic-snapshot');
  }

  public async updateEconomicProfile(data: Partial<EconomicProfile> & { businessId: string }): Promise<EconomicProfile> {
    return this.request('/api/business/economic-profile', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async getOpportunities(): Promise<Opportunity[]> {
    return this.request('/api/business/opportunities');
  }

  public async createOpportunity(data: Partial<Opportunity>): Promise<Opportunity> {
    return this.request('/api/business/opportunities', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async updateOpportunityStatus(id: string, status: Opportunity['status']): Promise<Opportunity> {
    return this.request(`/api/business/opportunities/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  public async getScenarios(): Promise<Scenario[]> {
    return this.request('/api/business/scenarios');
  }

  public async createScenario(data: Partial<Scenario>): Promise<Scenario> {
    return this.request('/api/business/scenarios', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async getOutcomes(): Promise<OutcomeVerification[]> {
    return this.request('/api/business/outcomes');
  }

  public async createOutcomeVerification(data: Partial<OutcomeVerification>): Promise<OutcomeVerification> {
    return this.request('/api/business/outcomes', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Wealth Module
  public async getWealthProfile(): Promise<WealthProfile> {
    return this.request('/api/wealth/profile');
  }

  public async updateWealthProfile(data: Partial<WealthProfile>): Promise<WealthProfile> {
    return this.request('/api/wealth/profile', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async getWealthEngines(): Promise<WealthEngineItem[]> {
    return this.request('/api/wealth/engines');
  }

  public async updateWealthEngine(code: string, data: Partial<WealthEngineItem>): Promise<WealthEngineItem> {
    return this.request(`/api/wealth/engines/${code}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  public async consultWealthAdvisor(query: string): Promise<any> {
    return this.request('/api/wealth/advisor/consult', {
      method: 'POST',
      body: JSON.stringify({ query })
    });
  }

  // Trust Module
  public async getTrustOverview(): Promise<{
    avgTrustScore: number | null;
    totalAgents: number;
    activeAgents: number;
    pendingApprovals: number;
    openIncidents: number;
    totalAuditLogs: number;
    activePolicies: number;
  }> {
    return this.request('/api/trust/overview');
  }

  public async getAgents(): Promise<Agent[]> {
    return this.request('/api/trust/agents');
  }

  public async createAgent(data: Partial<Agent>): Promise<Agent> {
    return this.request('/api/trust/agents', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async updateAgentStatus(id: string, status: Agent['status']): Promise<Agent> {
    return this.request(`/api/trust/agents/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  public async getAgentPassport(id: string): Promise<EconomicPassport> {
    return this.request(`/api/trust/agents/${id}/passport`);
  }

  public async executeFirewallTool(data: {
    agentId: string;
    toolName: string;
    intent: string;
    financialImpact?: number;
    targetResource?: string;
    params?: Record<string, any>;
  }): Promise<any> {
    return this.request('/api/trust/firewall/execute', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async getApprovals(): Promise<AgentApprovalRequest[]> {
    return this.request('/api/trust/approvals');
  }

  public async decideApproval(id: string, status: 'APPROVED' | 'REJECTED', decisionNotes?: string): Promise<AgentApprovalRequest> {
    return this.request(`/api/trust/approvals/${id}/decide`, {
      method: 'POST',
      body: JSON.stringify({ status, decisionNotes })
    });
  }

  public async getIncidents(): Promise<AgentIncident[]> {
    return this.request('/api/trust/incidents');
  }

  public async updateIncidentStatus(id: string, status: AgentIncident['status'], resolution?: string): Promise<AgentIncident> {
    return this.request(`/api/trust/incidents/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status, resolution })
    });
  }

  public async getAuditLogs(): Promise<AuditLogEntry[]> {
    return this.request('/api/trust/audit-logs');
  }

  public async getPolicies(): Promise<PolicyRule[]> {
    return this.request('/api/trust/policies');
  }

  public async updatePolicy(id: string, data: Partial<PolicyRule>): Promise<PolicyRule> {
    return this.request(`/api/trust/policies/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  // Economic Graph
  public async getEconomicGraph(): Promise<EconomicGraphData> {
    return this.request('/api/graph');
  }

  // Test Suite
  public async runSystemTests(): Promise<{
    totalTests: number;
    passedCount: number;
    failedCount: number;
    allPassed: boolean;
    totalDurationMs: number;
    tests: Array<{ testName: string; passed: boolean; details: string; durationMs: number }>;
  }> {
    return this.request('/api/tests/run-all', {
      method: 'POST'
    });
  }

  // ================= COMMERCIAL & BILLING =================
  public async getPricingPlans(): Promise<PricingPlan[]> {
    return this.request('/api/billing/plans');
  }

  public async getSubscription(): Promise<{
    subscription: Subscription;
    plan: PricingPlan;
    entitlements: PlanEntitlements;
    usage: any;
  }> {
    return this.request('/api/billing/subscription');
  }

  public async getBillingCustomer(): Promise<BillingCustomer> {
    return this.request('/api/billing/customer');
  }

  public async startTrial(planId: PlanId): Promise<{
    subscription: Subscription;
    plan: PricingPlan;
    entitlements: PlanEntitlements;
    message: string;
  }> {
    return this.request('/api/billing/trial/start', {
      method: 'POST',
      body: JSON.stringify({ planId })
    });
  }

  public async upgradeSubscription(planId: PlanId, billingInterval: BillingInterval = 'monthly'): Promise<{
    subscription: Subscription;
    plan: PricingPlan;
    entitlements: PlanEntitlements;
    message: string;
  }> {
    return this.request('/api/billing/upgrade', {
      method: 'POST',
      body: JSON.stringify({ planId, billingInterval })
    });
  }

  public async downgradeSubscription(planId: PlanId): Promise<{
    subscription: Subscription;
    plan: PricingPlan;
    entitlements: PlanEntitlements;
    affectedCapabilities: string[];
    message: string;
  }> {
    return this.request('/api/billing/downgrade', {
      method: 'POST',
      body: JSON.stringify({ planId })
    });
  }

  public async cancelSubscription(atPeriodEnd: boolean = true): Promise<{
    subscription: Subscription;
    message: string;
  }> {
    return this.request('/api/billing/cancel', {
      method: 'POST',
      body: JSON.stringify({ atPeriodEnd })
    });
  }

  public async resumeSubscription(): Promise<{
    subscription: Subscription;
    message: string;
  }> {
    return this.request('/api/billing/resume', {
      method: 'POST'
    });
  }

  public async adminSwitchPlan(planId: PlanId, billingInterval: BillingInterval = 'monthly'): Promise<{
    subscription: Subscription;
    plan: PricingPlan;
    entitlements: PlanEntitlements;
    message: string;
  }> {
    return this.request('/api/billing/admin-switch-plan', {
      method: 'POST',
      body: JSON.stringify({ planId, billingInterval })
    });
  }

  public async getInvoices(): Promise<Invoice[]> {
    return this.request('/api/invoices');
  }

  public async getInvoiceById(id: string): Promise<Invoice> {
    return this.request(`/api/invoices/${id}`);
  }

  public async createInvoice(invoice: Partial<Invoice>): Promise<Invoice> {
    return this.request('/api/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice)
    });
  }

  public async updateInvoice(id: string, invoice: Partial<Invoice>): Promise<Invoice> {
    return this.request(`/api/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(invoice)
    });
  }

  public async updateInvoiceStatus(id: string, status: Invoice['status']): Promise<Invoice> {
    return this.request(`/api/invoices/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  public async deleteInvoice(id: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/api/invoices/${id}`, {
      method: 'DELETE'
    });
  }

  // Commercial Expenses & Accounts Payable (AP)
  public async getExpenses(): Promise<Expense[]> {
    return this.request('/api/expenses');
  }

  public async getExpenseById(id: string): Promise<Expense> {
    return this.request(`/api/expenses/${id}`);
  }

  public async createExpense(expense: Partial<Expense>): Promise<Expense> {
    return this.request('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expense)
    });
  }

  public async updateExpense(id: string, updates: Partial<Expense>): Promise<Expense> {
    return this.request(`/api/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  public async updateExpenseStatus(id: string, status: Expense['status'], approvedBy?: string): Promise<Expense> {
    return this.request(`/api/expenses/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, approvedBy })
    });
  }

  public async deleteExpense(id: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/api/expenses/${id}`, {
      method: 'DELETE'
    });
  }

  // 10c. Commercial Cash Flow & Monte Carlo Runway Forecast Engine
  public async getCashFlowForecast(params?: Partial<CashFlowSimulationParams>): Promise<CashFlowForecastResponse> {
    return this.request('/api/cashflow/forecast', {
      method: 'POST',
      body: JSON.stringify(params || {})
    });
  }

  public async getUsage(): Promise<any> {
    return this.request('/api/billing/usage');
  }

  public async getCommercialAnalytics(): Promise<CommercialAnalytics> {
    return this.request('/api/billing/analytics');
  }

  public async updateAdminPricing(planId: PlanId, updates: Partial<PricingPlan>, reason: string): Promise<PricingPlan> {
    return this.request('/api/admin/pricing', {
      method: 'PUT',
      body: JSON.stringify({ planId, updates, reason })
    });
  }

  public async getAdminPricingAudits(): Promise<AdminPricingAudit[]> {
    return this.request('/api/admin/pricing/audits');
  }

  // Commercial Operations: Pricing & CPQ
  public async getRateCards(): Promise<RateCardItem[]> {
    return this.request('/api/pricing/rate-cards');
  }

  public async createRateCard(data: Omit<RateCardItem, 'id'>): Promise<RateCardItem> {
    return this.request('/api/pricing/rate-cards', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async updateRateCard(id: string, updates: Partial<RateCardItem>): Promise<RateCardItem> {
    return this.request(`/api/pricing/rate-cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  public async deleteRateCard(id: string): Promise<{ success: boolean }> {
    return this.request(`/api/pricing/rate-cards/${id}`, {
      method: 'DELETE'
    });
  }

  public async getContractQuotes(): Promise<ContractQuote[]> {
    return this.request('/api/pricing/quotes');
  }

  public async createContractQuote(data: Omit<ContractQuote, 'id' | 'createdAt'>): Promise<ContractQuote> {
    return this.request('/api/pricing/quotes', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async updateContractQuote(id: string, updates: Partial<ContractQuote>): Promise<ContractQuote> {
    return this.request(`/api/pricing/quotes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  public async convertQuoteToInvoice(quoteId: string): Promise<{ quote: ContractQuote; invoice: Invoice }> {
    return this.request(`/api/pricing/quotes/${quoteId}/convert-to-invoice`, {
      method: 'POST'
    });
  }

  // Commercial Operations: Banking & Treasury
  public async getTreasuryAccounts(): Promise<TreasuryAccount[]> {
    return this.request('/api/treasury/accounts');
  }

  public async transferTreasuryFunds(params: {
    fromAccountId: string;
    toAccountId: string;
    amountUsd: number;
    memo?: string;
  }): Promise<{ success: boolean; fromAccount?: TreasuryAccount; toAccount?: TreasuryAccount; error?: string }> {
    return this.request('/api/treasury/transfer', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  public async getBankTransactions(accountId?: string): Promise<BankTransaction[]> {
    const q = accountId ? `?accountId=${encodeURIComponent(accountId)}` : '';
    return this.request(`/api/treasury/transactions${q}`);
  }

  public async updateBankTransaction(
    id: string,
    updates: Partial<BankTransaction>
  ): Promise<BankTransaction> {
    return this.request(`/api/treasury/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  public async reconcileBankTransaction(
    id: string,
    params: { matchedReferenceType?: 'INVOICE' | 'EXPENSE' | 'SWEEP'; matchedReferenceId?: string }
  ): Promise<BankTransaction> {
    return this.request(`/api/treasury/transactions/${id}/reconcile`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  // Commercial Operations: Sales Pipeline & CRM
  public async getPipelineDeals(): Promise<PipelineDeal[]> {
    return this.request('/api/crm/deals');
  }

  public async createPipelineDeal(deal: Omit<PipelineDeal, 'id' | 'createdAt' | 'weightedValueUsd'>): Promise<PipelineDeal> {
    return this.request('/api/crm/deals', {
      method: 'POST',
      body: JSON.stringify(deal)
    });
  }

  public async updatePipelineDeal(id: string, updates: Partial<PipelineDeal>): Promise<PipelineDeal> {
    return this.request(`/api/crm/deals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  public async deletePipelineDeal(id: string): Promise<{ success: boolean }> {
    return this.request(`/api/crm/deals/${id}`, {
      method: 'DELETE'
    });
  }

  public async getPipelineSummary(): Promise<{
    totalPipelineValue: number;
    totalWeightedValue: number;
    dealsCount: number;
    activeDealsCount: number;
    stageBreakdown: Record<string, { count: number; totalValue: number; weightedValue: number }>;
  }> {
    return this.request('/api/crm/pipeline-summary');
  }

  // Commercial Operations: Tax & 1099 Compliance
  public async getQuarterlyTaxEstimates(): Promise<QuarterlyTaxEstimate[]> {
    return this.request('/api/compliance/tax-estimates');
  }

  public async updateTaxEstimateReserve(params: {
    quarter: number;
    year: number;
    reserveAmountUsd: number;
    status?: QuarterlyTaxEstimate['status'];
  }): Promise<QuarterlyTaxEstimate> {
    return this.request('/api/compliance/tax-estimates/reserve', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  public async getVendorTaxComplianceRecords(): Promise<VendorTaxComplianceRecord[]> {
    return this.request('/api/compliance/w9-vendors');
  }

  public async createVendorTaxRecord(record: Omit<VendorTaxComplianceRecord, 'id'>): Promise<VendorTaxComplianceRecord> {
    return this.request('/api/compliance/w9-vendors', {
      method: 'POST',
      body: JSON.stringify(record)
    });
  }

  public async updateVendorTaxRecord(id: string, updates: Partial<VendorTaxComplianceRecord>): Promise<VendorTaxComplianceRecord> {
    return this.request(`/api/compliance/w9-vendors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  public async runCommercialTestSuite(): Promise<{
    totalTests: number;
    passedCount: number;
    failedCount: number;
    allPassed: boolean;
    totalDurationMs: number;
    tests: Array<{ id: number; name: string; category: string; passed: boolean; details: string; durationMs: number }>;
  }> {
    return this.request('/api/tests/commercial-suite', {
      method: 'POST'
    });
  }

  public async resetDemo(): Promise<void> {
    await this.request('/api/demo/reset', { method: 'POST' });
  }
}

export const api = new EconosApiClient();
export const econosApi = api;
