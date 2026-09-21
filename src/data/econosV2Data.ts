import {
  DecisionPackage,
  BrainPipelineStep,
  GlobalGraphNode,
  GlobalGraphEdge,
  CounterpartyTwin,
  EconomicProtocolMessage,
  EconomicModelEntry,
  GlobalSimulationRun,
  StrategicExperiment,
  MaDealPipelineItem,
  ExecutiveQuestionAnswer,
  ExecutiveKPI,
  MarketplaceModule
} from '../types/econosV2';

// ==========================================
// 1. ECONOMIC BRAIN PIPELINE & DECISION PACKAGES
// ==========================================

export const INITIAL_BRAIN_PIPELINE: BrainPipelineStep[] = [
  { stage: 'OBSERVE', name: 'Global & Internal Event Ingestion', status: 'COMPLETED', latencyMs: 140, details: 'Bank feeds, ERP changes, vendor invoices, SOFR yields captured.' },
  { stage: 'DECOMPOSE', name: 'Task & Objective Decomposition', status: 'COMPLETED', latencyMs: 85, details: 'Cross-functional economic problem decomposed into 4 sub-problems.' },
  { stage: 'SELECT_AGENTS', name: 'Dynamic Agent Team Selection', status: 'COMPLETED', latencyMs: 92, details: 'Selected Agent 05, Agent 07, Agent 10, Agent 14, Agent 27.' },
  { stage: 'PARALLEL_ANALYSIS', name: 'Parallelized Domain Modeling', status: 'COMPLETED', latencyMs: 310, details: 'Treasury, working capital, debt covenant & pricing models executed.' },
  { stage: 'RESOLVE_CONFLICTS', name: 'Cross-Agent Arbitration (Agent 27)', status: 'COMPLETED', latencyMs: 240, details: 'Resolved margin vs. working capital collision via Pareto optimization.' },
  { stage: 'SIMULATE', name: 'Multi-Layer Stochastic Stress Test', status: 'COMPLETED', latencyMs: 650, details: '10,000 Monte Carlo paths executed across SOFR rate hikes and vendor shocks.' },
  { stage: 'SYNTHESIZE', name: 'Unified Decision Package Generation', status: 'COMPLETED', latencyMs: 180, details: 'Packaged Package #DP-2026-0881 with execution and rollback plans.' },
  { stage: 'VERIFY', name: 'Epistemic & AI Firewall Verification', status: 'COMPLETED', latencyMs: 115, details: 'Deterministic validation passed; Ed25519 cryptographic passport authenticated.' },
  { stage: 'AUTHORIZE', name: 'Governance Class Assignment (Class C)', status: 'COMPLETED', latencyMs: 95, details: 'CFO / Human multi-sig queue notified with single-click mobile mandate.' },
  { stage: 'EXECUTE', name: 'Autonomous Execution Gateway Dispatch', status: 'IN_PROGRESS', latencyMs: 0, details: 'Awaiting Class C executive sign-off for Sovereign Treasury Bridge dispatch.' },
  { stage: 'RECONCILE', name: 'Real-Time General Ledger Reconcile', status: 'PENDING', latencyMs: 0, details: 'Scheduled for 30d, 60d, and 90d post-execution outcome audit.' },
  { stage: 'LEARN', name: 'Outcome Learning & Bayesian Recalibration', status: 'PENDING', latencyMs: 0, details: 'Will tune Agent 05 & Agent 07 confidence priors upon realized GL clears.' }
];

export const MOCK_DECISION_PACKAGES: DecisionPackage[] = [
  {
    id: 'dp-01',
    packageNumber: 'DP-2026-0881',
    title: 'Working Capital Acceleration & Multi-Bank Sweep Optimization',
    objective: 'Compress cash conversion cycle from 76 days to 52 days and eliminate $1.8M in idle non-interest bank balances while protecting 90-day senior debt covenants.',
    currentState: 'Subsidiary balances across JPMorgan, SVB, and BNP Paribas yield 0.18% APY. DSO has drifted to 68.4 days due to unoptimized 60-day invoice terms. Senior bank DSCR covenant buffer has narrowed to 1.48x (minimum 1.35x).',
    evidence: [
      'JPMorgan treasury sweep account has $1.85M idle cash earning 0.18% APY.',
      'Uncollected invoices >45 days total $2,340,000 across 18 mid-market enterprise accounts.',
      'SOFR overnight T-bill yields offer 5.15% with zero principal duration risk.',
      'Quarterly debt service payment of $420,000 due in 42 days.'
    ],
    dataSources: [
      'Layer 04 Enterprise Digital Twin (Live GL streaming)',
      'Kyriba Multi-Bank Clearing Feed',
      'Agent 10 Debt Covenant Guardian Real-Time Ratio Monitor',
      'Fed Reserve H.15 Overnight Treasury Yield Curve'
    ],
    assumptions: [
      'Overnight repo/T-bill yield remains ≥5.00% over the next 90 days.',
      '85% of tier-1 customers accept dynamic 2/10 Net 30 early settlement terms.',
      'Minimum operating cash liquidity floor of $500,000 is maintained at all times.'
    ],
    participatingAgents: [
      {
        agentId: 5,
        agentCode: 'AGENT_05',
        agentName: 'Liquidity & Cash Sweeper',
        tier: 'Tier 2 - Treasury',
        role: 'Autonomous multi-bank balance routing & overnight yield harvesting',
        recommendation: 'Sweep $1,350,000 into overnight Treasury facility, leaving $500,000 buffer in SVB operating account.',
        confidence: 0.98,
        evidence: ['Daily operating cash variance over last 180 days never exceeded $210,000 in a 48h cycle.'],
        keyAssumptions: ['T-bill liquidity redemption window is <2 hours.'],
        financialImpactUsd: 69500
      },
      {
        agentId: 7,
        agentCode: 'AGENT_07',
        agentName: 'Working Capital Optimizer',
        tier: 'Tier 2 - Treasury',
        role: 'Dynamic 2/10 Net 30 DSO compression',
        recommendation: 'Deploy dynamic 1.8% early payment discount to the 14 slowest-paying enterprise accounts to pull $1.4M into current month.',
        confidence: 0.92,
        evidence: ['Customers 1-14 have average cost of capital >11%; 1.8% 10-day discount has 88% historic acceptance.'],
        keyAssumptions: ['Receivables collected are not delayed by vendor dispute.'],
        financialImpactUsd: 142000
      },
      {
        agentId: 10,
        agentCode: 'AGENT_10',
        agentName: 'Debt Covenant Guardian',
        tier: 'Tier 2 - Treasury',
        role: 'Leverage & DSCR covenant headroom verification',
        recommendation: 'Approve sweep and DSO acceleration; certifies that DSCR will expand from 1.48x to 1.84x, creating 49 bps of covenant safety headroom.',
        confidence: 0.99,
        evidence: ['Calculated pro-forma cash buffer covers next 2 quarterly debt obligations with 2.2x coverage.'],
        keyAssumptions: ['Senior lender does not revise definition of qualifying liquidity.'],
        financialImpactUsd: 0
      }
    ],
    conflicts: [
      {
        id: 'conf-1',
        agentA: { id: 7, code: 'AGENT_07', name: 'Working Capital Optimizer', position: 'Offer 2.2% early discount to maximize liquidity speed' },
        agentB: { id: 14, code: 'AGENT_14', name: 'Dynamic Pricing / Elasticity', position: 'Objected to 2.2% discount as it dilutes gross margin by 44 bps' },
        conflictType: 'LIQUIDITY_VS_YIELD',
        description: 'Working Capital agent wants aggressive early-pay discount for cash velocity, while Pricing agent wants to protect gross margin realization.',
        tradeoffMatrix: [
          { metric: 'Cash Accelerated', optionA: '$1,620,000 (Day 10)', optionB: '$850,000 (Day 30)' },
          { metric: 'Gross Margin Impact', optionA: '-44 bps dilution', optionB: '0 bps dilution' },
          { metric: 'Net Economic Value', optionA: '+$94,000', optionB: '+$31,000' }
        ],
        resolutionStrategy: 'PARETO_OPTIMAL',
        resolvedRecommendation: 'Arbitrated via Agent 27: Set dynamic discount at calibrated 1.65% targeted only at accounts with DSO >62 days. Preserves 36 bps of margin while capturing 84% of cash acceleration.',
        arbitrationAgentId: 27
      }
    ],
    alternativesConsidered: [
      {
        title: 'Draw from Senior Revolver at SOFR + 280 bps',
        description: 'Bridge receivables lag by drawing $1M from credit facility.',
        rejectionReason: 'Incurs 8.05% interest cost ($80,500 annual drag) and degrades debt covenant ratio from 1.48x to 1.39x.',
        expectedImpact: -80500
      },
      {
        title: 'Aggressive Debt Factoring at 4.5% Discount',
        description: 'Sell overdue invoices to third-party factoring firm.',
        rejectionReason: 'Destroys enterprise gross margin; factoring fees exceed internal cost of capital by 320 bps.',
        expectedImpact: -105000
      }
    ],
    scenarioResults: [
      { scenarioName: 'Baseline Central Plan', probability: 0.70, ebitdaImpactUsd: 211500, cashRunwayImpactMonths: 3.4, solvencyScore: 99.2 },
      { scenarioName: 'Fed Rate Hike (+50 bps)', probability: 0.20, ebitdaImpactUsd: 246000, cashRunwayImpactMonths: 3.8, solvencyScore: 99.5 },
      { scenarioName: 'Customer Early Pay Drop (-30%)', probability: 0.10, ebitdaImpactUsd: 135000, cashRunwayImpactMonths: 2.1, solvencyScore: 98.1 }
    ],
    expectedEconomicImpact: {
      netFinancialGainUsd: 211500,
      irrPct: 38.4,
      paybackMonths: 0.8,
      confidenceInterval: [184000, 248000]
    },
    downsideScenarios: [
      {
        stressCondition: 'Unexpected $400K unexpected vendor invoice clears same day as sweep.',
        worstCaseLossUsd: 1200,
        containmentStrategy: 'SVB $500K operating buffer automatically absorbs settlement; sweep has automated same-day reverse wire protocol.'
      }
    ],
    constraints: [
      'SVB operating cash floor must not drop below $500,000.',
      'Action must not violate Senior Loan Covenant Agreement Clause 7.2 (Permitted Investments).',
      'Maximum vendor discount granted must not exceed 1.75%.'
    ],
    dependencies: [
      'Layer 02 Universal Economic Graph entity validation',
      'Kyriba automated clearing house webhook connectivity',
      'Class C multi-signature cryptographic authorization'
    ],
    confidence: 0.94,
    calibrationHistory: {
      historicalAccuracyPct: 96.8,
      brierScore: 0.042,
      modelId: 'MOD-TREASURY-SWEEP-V3.4'
    },
    authorizationClass: 'CLASS_C',
    executionPlan: {
      steps: [
        { order: 1, actor: 'Agent 24 (Cryptographic Identity)', action: 'Generate Ed25519 execution authorization signature', targetSystem: 'ECONOS Sovereign Mesh', estimatedDuration: '400ms', verificationCheck: 'Cryptographic signature verified against HSM public key.' },
        { order: 2, actor: 'Agent 05 (Liquidity Sweeper)', action: 'Issue multi-bank routing sweep for $1,350,000 into T-Bill facility', targetSystem: 'JPMorgan Treasury Bridge', estimatedDuration: '1.2s', verificationCheck: 'Bank API confirms ledger balance transfer code 200.' },
        { order: 3, actor: 'Agent 07 (Working Capital)', action: 'Dispatch dynamic early payment invoices with 1.65% 10-day incentives', targetSystem: 'Stripe & Bill.com Gateways', estimatedDuration: '3.4s', verificationCheck: 'Delivery confirmations logged in Universal Economic Graph.' }
      ]
    },
    rollbackPlan: {
      triggerCondition: 'If SVB operating balance drops below $400,000 within 24 hours of execution.',
      steps: [
        'Instantly initiate T-bill reverse liquidation API call.',
        'Restore $500,000 liquidity buffer to SVB within 90 minutes.',
        'Log incident in Layer 09 Deterministic Audit Ledger and alert Treasurer.'
      ],
      maxTimeWindowHours: 24,
      recoveryGuarantee: '100% principal preservation guaranteed under Treasury collateralization.'
    },
    monitoringTriggers: [
      { metric: 'SVB Operating Cash Floor', threshold: '< $450,000', autoAction: 'Trigger partial $150K sweep reversal' },
      { metric: 'Early Payment Uptake Ratio', threshold: '< 60% after 7 days', autoAction: 'Re-calibrate Agent 07 discount elasticity model' }
    ],
    expectedOutcome: '+$211,500 annualized financial benefit, -24 days cash conversion cycle, and zero debt covenant stress.',
    status: 'PENDING_AUTHORIZATION',
    createdAt: '2026-09-16T08:15:00Z'
  }
];

// ==========================================
// 2. GLOBAL ECONOMIC GRAPH EXPANSION DATA
// ==========================================

export const INITIAL_GLOBAL_GRAPH_NODES: GlobalGraphNode[] = [
  // 1. Transaction level
  { id: 'txn-101', label: 'Txn #9821: $450K Microchip PO', entityType: 'TRANSACTION', hierarchyLevel: 'TRANSACTION', jurisdiction: 'US-DE', financialExposureUsd: 450000, dependencyWeight: 0.72, confidence: 0.99, permissionScope: 'PUBLIC', provenance: 'ERP General Ledger' , timeValidityStart: '2026-01-01' },
  // 2. Company level
  { id: 'comp-host', label: 'Nexus Global Tech Corp (Host Enterprise)', entityType: 'COMPANY', hierarchyLevel: 'COMPANY', jurisdiction: 'US-CA', creditRating: 'A-', financialExposureUsd: 28500000, dependencyWeight: 1.0, confidence: 1.0, permissionScope: 'CONFIDENTIAL', provenance: 'Primary Digital Twin', timeValidityStart: '2020-01-01' },
  // 3. Customer / Supplier level
  { id: 'supp-semicon', label: 'Tokyo Advanced Silicon Ltd', entityType: 'SUPPLIER', hierarchyLevel: 'CUSTOMER_SUPPLIER', jurisdiction: 'JP', creditRating: 'BBB+', financialExposureUsd: 3200000, dependencyWeight: 0.88, confidence: 0.95, permissionScope: 'CONSENT_GRANTED', provenance: 'Counterparty Twin #CT-401', timeValidityStart: '2022-03-15' },
  { id: 'cust-enterprise', label: 'Apex Retail Enterprises (Tier 1 Customer)', entityType: 'CUSTOMER', hierarchyLevel: 'CUSTOMER_SUPPLIER', jurisdiction: 'US-NY', creditRating: 'A', financialExposureUsd: 4800000, dependencyWeight: 0.75, confidence: 0.96, permissionScope: 'CONSENT_GRANTED', provenance: 'Salesforce CRM Twin', timeValidityStart: '2021-08-01' },
  // 4. Counterparty level
  { id: 'bank-jpmorgan', label: 'JPMorgan Chase (Primary Treasury Bank)', entityType: 'BANK', hierarchyLevel: 'COUNTERPARTY', jurisdiction: 'US-NY', creditRating: 'AA', financialExposureUsd: 8500000, dependencyWeight: 0.92, confidence: 0.99, permissionScope: 'CONSENT_GRANTED', provenance: 'Kyriba Protocol Bridge', timeValidityStart: '2019-01-01' },
  { id: 'lender-syndicate', label: 'Blackstone Credit Senior Facility', entityType: 'LENDER', hierarchyLevel: 'COUNTERPARTY', jurisdiction: 'US-NY', creditRating: 'AAA', financialExposureUsd: 12000000, dependencyWeight: 0.95, confidence: 0.99, permissionScope: 'RESTRICTED_SELECTIVE', provenance: 'Senior Credit Agreement', timeValidityStart: '2023-06-01' },
  { id: 'logistics-maersk', label: 'Maersk Global Freight Lines', entityType: 'LOGISTICS', hierarchyLevel: 'COUNTERPARTY', jurisdiction: 'DK', creditRating: 'A', financialExposureUsd: 890000, dependencyWeight: 0.65, confidence: 0.94, permissionScope: 'CONSENT_GRANTED', provenance: 'Cargo Logistics API', timeValidityStart: '2023-01-01' },
  // 5. Industry level
  { id: 'ind-semiconductor', label: 'Global Semiconductor & Hardware Sector', entityType: 'MARKET', hierarchyLevel: 'INDUSTRY', jurisdiction: 'GLOBAL', financialExposureUsd: 14000000, dependencyWeight: 0.82, confidence: 0.91, permissionScope: 'PUBLIC', provenance: 'Bloomberg Industry Index', timeValidityStart: '2020-01-01' },
  // 6. Supply Chain level
  { id: 'sc-transpacific', label: 'Trans-Pacific Critical Hardware Corridor', entityType: 'ECONOMIC_EVENT', hierarchyLevel: 'SUPPLY_CHAIN', jurisdiction: 'APAC-US', financialExposureUsd: 7400000, dependencyWeight: 0.89, confidence: 0.93, permissionScope: 'PUBLIC', provenance: 'Maritime Trade Analytics', timeValidityStart: '2024-01-01' },
  // 7. Country level
  { id: 'country-us', label: 'United States Macro Regime (Fed / Rates)', entityType: 'COUNTRY', hierarchyLevel: 'COUNTRY', jurisdiction: 'US', financialExposureUsd: 22000000, dependencyWeight: 0.95, confidence: 0.98, permissionScope: 'PUBLIC', provenance: 'Federal Reserve Open Data', timeValidityStart: '2020-01-01' },
  { id: 'country-japan', label: 'Japan Macro Regime (BoJ / JPY)', entityType: 'COUNTRY', hierarchyLevel: 'COUNTRY', jurisdiction: 'JP', financialExposureUsd: 4100000, dependencyWeight: 0.61, confidence: 0.95, permissionScope: 'PUBLIC', provenance: 'Bank of Japan Feed', timeValidityStart: '2020-01-01' },
  // 8. Global Market level
  { id: 'gm-sofr', label: 'SOFR Global Dollar Benchmark (5.15%)', entityType: 'CURRENCY', hierarchyLevel: 'GLOBAL_MARKET', jurisdiction: 'GLOBAL', financialExposureUsd: 18500000, dependencyWeight: 0.94, confidence: 0.99, permissionScope: 'PUBLIC', provenance: 'NY Fed SOFR Terminal', timeValidityStart: '2020-01-01' }
];

export const INITIAL_GLOBAL_GRAPH_EDGES: GlobalGraphEdge[] = [
  { id: 'edge-1', source: 'txn-101', target: 'supp-semicon', relationshipType: 'TRANSACTS_WITH', economicExposureUsd: 450000, dependencyLevel: 'HIGH', timeValidity: '2026-Q1', provenance: 'PO #88192', permission: 'MUTUAL_CONSENT', confidence: 0.99, changeHistory: [] },
  { id: 'edge-2', source: 'comp-host', target: 'supp-semicon', relationshipType: 'SUPPLIES', economicExposureUsd: 3200000, dependencyLevel: 'CRITICAL', timeValidity: '2026-2027', provenance: 'Master Service Agreement #2024-09', permission: 'MUTUAL_CONSENT', confidence: 0.96, changeHistory: [] },
  { id: 'edge-3', source: 'comp-host', target: 'cust-enterprise', relationshipType: 'TRANSACTS_WITH', economicExposureUsd: 4800000, dependencyLevel: 'HIGH', timeValidity: '2026-Q2', provenance: 'Enterprise Sales Contract', permission: 'MUTUAL_CONSENT', confidence: 0.98, changeHistory: [] },
  { id: 'edge-4', source: 'comp-host', target: 'bank-jpmorgan', relationshipType: 'TRANSACTS_WITH', economicExposureUsd: 8500000, dependencyLevel: 'CRITICAL', timeValidity: 'Continuous', provenance: 'Treasury Depository Mandate', permission: 'MUTUAL_CONSENT', confidence: 0.99, changeHistory: [] },
  { id: 'edge-5', source: 'comp-host', target: 'lender-syndicate', relationshipType: 'FINANCES', economicExposureUsd: 12000000, dependencyLevel: 'CRITICAL', timeValidity: '2024-2029', provenance: 'Credit Agreement Covenant Sec 4', permission: 'SELECTIVE_DISCLOSURE', confidence: 0.99, changeHistory: [] },
  { id: 'edge-6', source: 'supp-semicon', target: 'logistics-maersk', relationshipType: 'DEPENDS_ON_LOGISTICS', economicExposureUsd: 890000, dependencyLevel: 'HIGH', timeValidity: '2026', provenance: 'Bill of Lading Feed', permission: 'SELECTIVE_DISCLOSURE', confidence: 0.92, changeHistory: [] },
  { id: 'edge-7', source: 'logistics-maersk', target: 'sc-transpacific', relationshipType: 'TRANSACTS_WITH', economicExposureUsd: 7400000, dependencyLevel: 'CRITICAL', timeValidity: 'Continuous', provenance: 'Maritime Corridor Transit Model', permission: 'PUBLIC_LEDGER', confidence: 0.95, changeHistory: [] },
  { id: 'edge-8', source: 'comp-host', target: 'gm-sofr', relationshipType: 'EXPOSED_TO_RATE', economicExposureUsd: 12000000, dependencyLevel: 'HIGH', timeValidity: 'Floating Rate', provenance: 'Senior Term Loan Float Formula', permission: 'PUBLIC_LEDGER', confidence: 0.99, changeHistory: [] },
  { id: 'edge-9', source: 'supp-semicon', target: 'country-japan', relationshipType: 'REGULATED_BY', economicExposureUsd: 3200000, dependencyLevel: 'MEDIUM', timeValidity: 'Continuous', provenance: 'Japan Export Control Registry', permission: 'PUBLIC_LEDGER', confidence: 0.94, changeHistory: [] }
];

// ==========================================
// 3. COUNTERPARTY DIGITAL TWINS DATA
// ==========================================

export const INITIAL_COUNTERPARTY_TWINS: CounterpartyTwin[] = [
  {
    id: 'ct-01',
    name: 'Tokyo Advanced Silicon Ltd',
    category: 'SUPPLIER',
    industry: 'High-Purity Silicon Wafers & Sensors',
    country: 'Japan',
    consentGranted: true,
    selectiveDisclosureScopes: ['DELIVERY_ETA', 'FINANCIAL_SOLVENCY_BAND', 'CAPACITY_INDEX'],
    lastPingTimestamp: '3 minutes ago',
    financialHealthScore: 84,
    defaultProbabilityPct: 1.4,
    deliveryReliabilityPct: 91.2,
    activeExposureUsd: 3200000,
    rippleScenario: {
      triggerEvent: 'BoJ Yen FX spike + Port of Yokohama bottleneck causes 18-day factory component delay',
      steps: [
        { step: 1, domain: 'SUPPLIER', metric: 'Delivery Probability', delta: '-34% (delayed 18d)', severity: 'WARNING', description: 'Silicon wafer shipment batch #882 fails dispatch window.' },
        { step: 2, domain: 'ENTERPRISE_INVENTORY', metric: 'Buffer Stock Runway', delta: 'Drops from 30d to 12d', severity: 'WARNING', description: 'Internal assembly lines deplete safety stock.' },
        { step: 3, domain: 'CUSTOMER_SLA', metric: 'On-Time Fulfillment', delta: '-28% fulfillment penalty', severity: 'CRITICAL', description: 'Tier-1 customer Apex Retail faces delayed Q2 launch.' },
        { step: 4, domain: 'CRM_CHURN', metric: 'Apex Churn Risk', delta: 'Spikes from 4% to 32%', severity: 'CRITICAL', description: 'Agent 15 predicts $1.2M contract cancellation probability.' },
        { step: 5, domain: 'TREASURY_CASH', metric: 'Quarterly Cash Flow', delta: '-$1,850,000 Net Drain', severity: 'CRITICAL', description: 'Delayed customer milestones postpone cash collections.' },
        { step: 6, domain: 'DEBT_COVENANT', metric: 'Senior DSCR Headroom', delta: 'Contracts from 1.84x to 1.39x', severity: 'WARNING', description: 'Approaches 1.35x technical loan covenant default limit.' }
      ],
      netEnterpriseCashLossUsd: 1850000,
      covenantBreachRisk: true
    }
  },
  {
    id: 'ct-02',
    name: 'Apex Retail Enterprises',
    category: 'CUSTOMER',
    industry: 'Omnichannel Consumer Hardware',
    country: 'United States',
    consentGranted: true,
    selectiveDisclosureScopes: ['PAYMENT_CADENCE', 'ORDER_FORECAST', 'CREDIT_LIMIT'],
    lastPingTimestamp: '12 minutes ago',
    financialHealthScore: 92,
    defaultProbabilityPct: 0.6,
    deliveryReliabilityPct: 98.4,
    activeExposureUsd: 4800000,
    rippleScenario: {
      triggerEvent: 'Customer requests 45-day payment term extension on $4.8M accounts receivable',
      steps: [
        { step: 1, domain: 'CUSTOMER_TERMS', metric: 'DSO Request', delta: 'Increases from 30d to 75d', severity: 'WARNING', description: 'Apex CFO issues unilateral corporate liquidity preservation request.' },
        { step: 2, domain: 'TREASURY_LIQUIDITY', metric: 'Operating Cash Buffer', delta: '-$4,800,000 Delayed Cash', severity: 'CRITICAL', description: 'Creates temporary multi-million dollar liquidity valley.' },
        { step: 3, domain: 'REVOLVER_DRAW', metric: 'Short-Term Facility Draw', delta: '+$3,000,000 at 8.05%', severity: 'WARNING', description: 'Incurs $60,000 in unbudgeted bridge financing interest.' }
      ],
      netEnterpriseCashLossUsd: 420000,
      covenantBreachRisk: false
    }
  },
  {
    id: 'ct-03',
    name: 'Blackstone Credit Syndicate',
    category: 'LENDER',
    industry: 'Institutional Private Credit & Syndicated Facilities',
    country: 'United States',
    consentGranted: true,
    selectiveDisclosureScopes: ['COVENANT_CERTIFICATE', 'QUALIFIED_CASH', 'LEVERAGE_RATIO'],
    lastPingTimestamp: '1 hour ago',
    financialHealthScore: 99,
    defaultProbabilityPct: 0.05,
    deliveryReliabilityPct: 100.0,
    activeExposureUsd: 12000000,
    rippleScenario: {
      triggerEvent: 'Lender imposes 25 bps pricing hike if DSCR dips below 1.45x for 2 consecutive quarters',
      steps: [
        { step: 1, domain: 'DEBT_FACILITY', metric: 'Borrowing Spread', delta: '+25 bps penalty margin', severity: 'WARNING', description: 'Interest margin steps up from SOFR+325 to SOFR+350.' },
        { step: 2, domain: 'CASH_DRAG', metric: 'Annual Debt Service', delta: '+$30,000/yr extra cash interest', severity: 'WARNING', description: 'Increases fixed debt service load.' }
      ],
      netEnterpriseCashLossUsd: 90000,
      covenantBreachRisk: false
    }
  }
];

// ==========================================
// 4. ECONOS ECONOMIC PROTOCOL MESSAGES
// ==========================================

export const INITIAL_PROTOCOL_MESSAGES: EconomicProtocolMessage[] = [
  {
    id: 'msg-9901',
    protocolVersion: 'ECONOS-EEP-v2.1',
    senderInstanceId: 'inst-tokyo-silicon-jp.econos.net',
    recipientInstanceId: 'inst-nexus-host-us.econos.net',
    objectType: 'SUPPLY_SIGNAL',
    payloadSummary: 'Selective Disclosure: Silicon wafer batch #882 facing 6-day logistics delay at Yokohama port terminal.',
    selectiveDisclosureActive: true,
    encryptionStandard: 'AES-GCM-256',
    signatureAlgorithm: 'Ed25519',
    signerPassportId: 'PASS-JP-7729-AGENT03',
    replayProtectionNonce: '0x88f912a7bc40e',
    auditHash: 'sha256:4a8b7c9e01f23d5e89a012bc',
    timestamp: '2026-09-16T08:42:10Z',
    status: 'VERIFIED'
  },
  {
    id: 'msg-9902',
    protocolVersion: 'ECONOS-EEP-v2.1',
    senderInstanceId: 'inst-nexus-host-us.econos.net',
    recipientInstanceId: 'inst-jpmorgan-treasury.econos.net',
    objectType: 'LIQUIDITY_SIGNAL',
    payloadSummary: 'Authorized Sweep Intent: Rebalancing $1,350,000 to Overnight Repo yielding 5.15% APY.',
    selectiveDisclosureActive: true,
    encryptionStandard: 'AES-GCM-256',
    signatureAlgorithm: 'Ed25519',
    signerPassportId: 'PASS-US-0012-AGENT05',
    replayProtectionNonce: '0x99a14bc8de321',
    auditHash: 'sha256:1f2e3d4c5b6a7980ef',
    timestamp: '2026-09-16T08:44:22Z',
    status: 'VERIFIED'
  },
  {
    id: 'msg-9903',
    protocolVersion: 'ECONOS-EEP-v2.1',
    senderInstanceId: 'inst-nexus-host-us.econos.net',
    recipientInstanceId: 'inst-apex-retail-ny.econos.net',
    objectType: 'TRANSACTION',
    payloadSummary: 'Incentivized Early Clearing Settlement: 1.65% discount verified on Invoice #INV-2026-4402.',
    selectiveDisclosureActive: true,
    encryptionStandard: 'AES-GCM-256',
    signatureAlgorithm: 'Ed25519',
    signerPassportId: 'PASS-US-0012-AGENT07',
    replayProtectionNonce: '0x77c22ef109b88',
    auditHash: 'sha256:990a1b2c3d4e5f6a',
    timestamp: '2026-09-16T08:46:05Z',
    status: 'VERIFIED'
  }
];

// ==========================================
// 5. ECONOMIC MODEL REGISTRY ENTRIES
// ==========================================

export const INITIAL_MODEL_REGISTRY: EconomicModelEntry[] = [
  {
    id: 'mod-01',
    modelId: 'MOD-TREASURY-SWEEP-V3.4',
    version: '3.4.1',
    name: 'Multi-Bank Liquidity Sweep & Yield Optimizer',
    modelOwner: 'Treasury & Sovereign Mesh Team',
    purpose: 'Dynamically routes surplus operating balances across commercial banks to optimize overnight risk-free return while maintaining strict intraday liquidity floors.',
    assumptions: [
      'Overnight collateral is restricted strictly to US Treasuries and G7 Sovereign Paper.',
      'Bank clearing APIs maintain <120s round-trip SLA.',
      'Intraday operational variance conforms to Student-t fat-tailed distribution.'
    ],
    dataLineage: ['Fed H.15 Fed Funds', 'SOFR Index API', 'Kyriba Clearing Feeds', 'GL Statement Dumps'],
    trainingReference: 'Trained on 7 years of corporate liquidity cycles (2019-2026) across 450 corporate entities.',
    validationHistory: [
      { date: '2026-08-01', evaluator: 'Agent 23 (Epistemic Auditor)', outcome: 'PASSED' },
      { date: '2026-08-15', evaluator: 'Third-Party Quantitative Audit (KPMG-AI)', outcome: 'PASSED' }
    ],
    calibrationMetrics: {
      brierScore: 0.038,
      expectedCalibrationError: 0.019,
      meanAbsoluteErrorPct: 1.4
    },
    applicableIndustries: ['Software & SaaS', 'Discrete Manufacturing', 'Logistics', 'Healthcare'],
    applicableJurisdictions: ['US', 'EU', 'UK', 'SG', 'JP'],
    knownLimitations: ['Does not support illiquid offshore currency accounts without swap facilities.'],
    scenarioLimitations: ['Extreme negative interest rate regimes (< -0.50%).'],
    approvalStatus: 'VERIFIED_ACTIVE',
    deploymentStatus: 'PRODUCTION',
    historicalAccuracyScore: 98.4,
    assignedAgentCode: 'AGENT_05'
  },
  {
    id: 'mod-02',
    modelId: 'MOD-CHURN-SENTINEL-V2.8',
    version: '2.8.0',
    name: 'Cross-Functional Customer Renewal & Churn Risk Forecaster',
    modelOwner: 'Revenue Intelligence Division',
    purpose: 'Correlates supply chain delays, ticket latency, and invoice settlement friction to predict contract cancellation 90 days prior to formal notice.',
    assumptions: [
      'Customer contact frequency is tracked accurately via CRM webhooks.',
      'SLA delivery breach penalty is calculated mathematically per contract.'
    ],
    dataLineage: ['Salesforce Opportunity Events', 'Jira Service Management Logs', 'ERP Dispatch Timestamps'],
    trainingReference: '120,000 enterprise B2B subscription and contract lifecycles.',
    validationHistory: [
      { date: '2026-07-10', evaluator: 'Agent 25 (Calibration Monitor)', outcome: 'PASSED' }
    ],
    calibrationMetrics: {
      brierScore: 0.052,
      expectedCalibrationError: 0.027,
      meanAbsoluteErrorPct: 2.8
    },
    applicableIndustries: ['Enterprise B2B', 'Cloud Infrastructure', 'Telecommunications'],
    applicableJurisdictions: ['GLOBAL'],
    knownLimitations: ['Requires at least 6 months of historical customer interaction data.'],
    scenarioLimitations: ['Hostile M&A where customer leadership changes abruptly.'],
    approvalStatus: 'VERIFIED_ACTIVE',
    deploymentStatus: 'PRODUCTION',
    historicalAccuracyScore: 94.2,
    assignedAgentCode: 'AGENT_15'
  },
  {
    id: 'mod-03',
    modelId: 'MOD-COVENANT-GUARDIAN-V1.9',
    version: '1.9.4',
    name: 'Dynamic Debt Covenant & Solvency Ratio Predictor',
    modelOwner: 'Risk & Governance Group',
    purpose: 'Continuously stress-tests trailing twelve-month EBITDA and debt service obligations against bank credit agreements to prevent technical defaults.',
    assumptions: [
      'Credit agreement definitions of EBITDA add-backs remain legally fixed.',
      'CapEx commitments cannot be canceled without contract penalty.'
    ],
    dataLineage: ['Senior Credit Agreement PDF Parsing', 'ERP NetSuite GL Ledger', 'CapEx Depreciation Schedules'],
    trainingReference: '5,000 syndicated loan restructuring precedents and covenant compliance certificates.',
    validationHistory: [
      { date: '2026-08-20', evaluator: 'Agent 26 (Algorithmic Compliance Officer)', outcome: 'PASSED' }
    ],
    calibrationMetrics: {
      brierScore: 0.012,
      expectedCalibrationError: 0.008,
      meanAbsoluteErrorPct: 0.6
    },
    applicableIndustries: ['All Leveraged Enterprises'],
    applicableJurisdictions: ['US-NY Law', 'UK-English Law', 'EU-Luxembourg'],
    knownLimitations: ['Subject to manual review if credit agreement is amended verbally without doc.'],
    scenarioLimitations: ['Total lender insolvency / FDIC receivership.'],
    approvalStatus: 'VERIFIED_ACTIVE',
    deploymentStatus: 'PRODUCTION',
    historicalAccuracyScore: 99.6,
    assignedAgentCode: 'AGENT_10'
  }
];

// ==========================================
// 6. GLOBAL SIMULATION RUNS (14 SHOCKS)
// ==========================================

export const INITIAL_SIMULATION_RUNS: GlobalSimulationRun[] = [
  {
    id: 'sim-01',
    shockType: 'INTEREST_RATE_SHOCK',
    title: 'Fed Rate Hike (+100 bps) & Global Credit Spread Widening',
    severityLevel: 'SEVERE',
    hierarchyScope: 'GLOBAL_MARKET',
    monteCarloPaths: 10000,
    unhedgedLossUsd: 680000,
    unhedgedRunwayDeltaMonths: -2.8,
    covenantHeadroomLossPct: 32.0,
    distributionStats: {
      p10LossUsd: 420000,
      p50LossUsd: 680000,
      p90LossUsd: 940000,
      solvencyProbability: 97.4
    },
    interventions: [
      {
        id: 'int-1',
        title: 'Synthetic SOFR Interest Rate Cap at 5.25%',
        layerOrAgent: 'Agent 06 (FX & Commodity Hedger)',
        description: 'Synthesizes interest rate collar capping floating debt coupon at 5.25% while financing the cap with a 4.00% floor.',
        executionCostUsd: 14000,
        mitigatedLossUsd: 490000,
        postInterventionSolvencyPct: 99.8,
        recommendedGovernance: 'CLASS_C',
        isOptimal: true
      },
      {
        id: 'int-2',
        title: 'Accelerate Working Capital Collections',
        layerOrAgent: 'Agent 07 (Working Capital Optimizer)',
        description: 'Compresses DSO by 16 days to reduce reliance on floating-rate credit line draws.',
        executionCostUsd: 28000,
        mitigatedLossUsd: 310000,
        postInterventionSolvencyPct: 99.1,
        recommendedGovernance: 'CLASS_B',
        isOptimal: false
      }
    ]
  },
  {
    id: 'sim-02',
    shockType: 'TIER_1_SUPPLIER_FAILURE',
    title: 'Critical Tokyo Semiconductor Factory Earthquake & 45-Day Shutdown',
    severityLevel: 'CATASTROPHIC',
    hierarchyScope: 'SUPPLY_CHAIN',
    monteCarloPaths: 10000,
    unhedgedLossUsd: 2850000,
    unhedgedRunwayDeltaMonths: -5.6,
    covenantHeadroomLossPct: 68.0,
    distributionStats: {
      p10LossUsd: 1950000,
      p50LossUsd: 2850000,
      p90LossUsd: 3900000,
      solvencyProbability: 91.2
    },
    interventions: [
      {
        id: 'int-3',
        title: 'Autonomous Dual-Sourcing Routing to TSMC European Fab',
        layerOrAgent: 'Agent 03 (Supply Chain Arbitrageur)',
        description: 'Automatically shifts 60% of wafer allocations to secondary qualified European foundry with pre-negotiated volume agreements.',
        executionCostUsd: 85000,
        mitigatedLossUsd: 2200000,
        postInterventionSolvencyPct: 98.9,
        recommendedGovernance: 'CLASS_C',
        isOptimal: true
      },
      {
        id: 'int-4',
        title: 'Emergency Safety Stock Buyout on Open Spot Market',
        layerOrAgent: 'Agent 08 (Reverse-Auction Procurement)',
        description: 'Purchases 3 months of buffer silicon on spot market at 35% premium.',
        executionCostUsd: 450000,
        mitigatedLossUsd: 1600000,
        postInterventionSolvencyPct: 96.4,
        recommendedGovernance: 'CLASS_C',
        isOptimal: false
      }
    ]
  },
  {
    id: 'sim-03',
    shockType: 'FX_DEVALUATION_SHOCK',
    title: 'EUR / USD Sudden 8% Devaluation Against US Dollar',
    severityLevel: 'MODERATE',
    hierarchyScope: 'COUNTRY',
    monteCarloPaths: 10000,
    unhedgedLossUsd: 420000,
    unhedgedRunwayDeltaMonths: -1.2,
    covenantHeadroomLossPct: 14.0,
    distributionStats: {
      p10LossUsd: 280000,
      p50LossUsd: 420000,
      p90LossUsd: 590000,
      solvencyProbability: 99.1
    },
    interventions: [
      {
        id: 'int-5',
        title: 'Forward FX Currency Lock via Layer 06 Mesh',
        layerOrAgent: 'Agent 06 (FX Hedger)',
        description: 'Locks in €4.5M in European customer receivables at 1.085 EUR/USD for 180 days.',
        executionCostUsd: 8500,
        mitigatedLossUsd: 385000,
        postInterventionSolvencyPct: 99.9,
        recommendedGovernance: 'CLASS_B',
        isOptimal: true
      }
    ]
  }
];

// ==========================================
// 7. STRATEGIC EXPERIMENTATION ENGINE
// ==========================================

export const INITIAL_EXPERIMENTS: StrategicExperiment[] = [
  {
    id: 'exp-01',
    title: 'Dynamic SaaS Elasticity Test on Enterprise Cohort B',
    area: 'PRICING_ELASTICITY',
    objective: 'Test whether a 7.5% price increase on non-core API modules impacts customer retention or expands gross margin.',
    hypothesis: 'Cohorts with daily active usage >4.2 hours will exhibit price elasticity < -0.22, generating net +$310K ARR without statistically significant churn.',
    controlGroup: '120 Enterprise accounts on fixed legacy contract terms.',
    treatmentGroup: '120 Matched Enterprise accounts subject to 7.5% usage-tier step.',
    sampleSize: '240 Enterprise Accounts ($14M ARR base)',
    successMetric: 'Net Revenue Retention (NRR) > 108% with churn delta < 1.0%.',
    riskBoundary: 'Immediate circuit breaker rollback if 3 or more accounts issue formal cancellation notice.',
    authorizationClass: 'CLASS_B',
    stopCondition: 'Cumulative churn exceeds $50,000 ARR in 30-day trial window.',
    expectedOutcome: '+$310,000 incremental margin with 94% statistical power.',
    actualOutcome: '+$284,000 realized margin; churn rate delta was 0.28% (statistically insignificant).',
    statisticalSignificance: 0.96,
    status: 'COMPLETED',
    outcomeLedgerId: 'LEDGER-EXP-2026-01',
    modelUpdateRegistered: true
  },
  {
    id: 'exp-02',
    title: 'Automated Reverse-Auction Sourcing for Logistics & Warehousing',
    area: 'PROCUREMENT_REVERSE_AUCTION',
    objective: 'Deploy Agent 08 automated multi-round bidding across 4 regional 3PL freight carriers.',
    hypothesis: 'Real-time load bidding will compress freight costs per pallet by 14%–19% without degrading on-time delivery.',
    controlGroup: '50% of shipping lanes managed under legacy static rate sheets.',
    treatmentGroup: '50% of shipping lanes allocated via dynamic spot reverse auction.',
    sampleSize: '1,400 Shipments over 60 days',
    successMetric: 'Freight cost reduction ≥ 15% and on-time arrival rate ≥ 98.0%.',
    riskBoundary: 'Fallback to primary contracted carrier if no bid clears within 4 hours.',
    authorizationClass: 'CLASS_B',
    stopCondition: 'On-time delivery dips below 96.5% on any single lane.',
    expectedOutcome: '+$145,000 in direct logistics savings.',
    status: 'ACTIVE_RUN',
    modelUpdateRegistered: false
  }
];

// ==========================================
// 8. M&A INTELLIGENCE NETWORK (AGENT 03 PIPELINE)
// ==========================================

export const INITIAL_MA_DEALS: MaDealPipelineItem[] = [
  {
    id: 'ma-01',
    targetCompanyName: 'Vanguard Sensor Systems Inc.',
    industry: 'Industrial IoT & Predictive Sensors',
    enterpriseValueUsd: 18500000,
    revenueUsd: 12400000,
    ebitdaUsd: 2100000,
    currentStage: 'SYNERGY_MODEL',
    projectedCostSynergiesUsd: 1450000,
    projectedRevenueSynergiesUsd: 2800000,
    postMergerWacc: 7.8,
    proFormaRunwayMonths: 24.2,
    integrationRiskScore: 34,
    assignedSpecialistAgent: 'AGENT_03 (M&A & Strategic Synergy Synthesizer)',
    requiredGovernance: 'CLASS_D',
    recommendation: 'ACQUIRE'
  },
  {
    id: 'ma-02',
    targetCompanyName: 'Aura Logistics AI Corp',
    industry: 'Freight Route Optimization & Port Automation',
    enterpriseValueUsd: 32000000,
    revenueUsd: 18200000,
    ebitdaUsd: 1400000,
    currentStage: 'FINANCIAL_ANALYSIS',
    projectedCostSynergiesUsd: 2200000,
    projectedRevenueSynergiesUsd: 3900000,
    postMergerWacc: 8.4,
    proFormaRunwayMonths: 18.0,
    integrationRiskScore: 62,
    assignedSpecialistAgent: 'AGENT_03 (M&A & Strategic Synergy Synthesizer)',
    requiredGovernance: 'CLASS_D',
    recommendation: 'HOLD_FOR_MACRO_WINDOW'
  }
];

// ==========================================
// 9. EXECUTIVE STRATEGIC COMMAND CENTER DATA
// ==========================================

export const INITIAL_EXECUTIVE_KPIS: ExecutiveKPI[] = [
  { label: 'EBITDA Run-Rate', value: '$18.4M', trend: 'UP', delta: '+8.2% MoM', health: 'HEALTHY', agentOwner: 'Agent 16 (Unit Economics)' },
  { label: 'True Cash Runway', value: '16.4 Mos', trend: 'UP', delta: '+2.1 Mos', health: 'HEALTHY', agentOwner: 'Agent 05 (Liquidity Sweeper)' },
  { label: 'Working Capital / DSO', value: '49.1 Days', trend: 'DOWN', delta: '-19.3 Days', health: 'HEALTHY', agentOwner: 'Agent 07 (Working Capital)' },
  { label: 'Senior Covenant DSCR', value: '1.84x', trend: 'UP', delta: '+0.36x Headroom', health: 'HEALTHY', agentOwner: 'Agent 10 (Covenant Guardian)' },
  { label: 'Macro FX/Rate Beta', value: '0.08', trend: 'DOWN', delta: 'Immunized', health: 'HEALTHY', agentOwner: 'Agent 06 (FX Hedger)' },
  { label: 'Autonomous Trust Index', value: '99.98%', trend: 'STABLE', delta: '0 Incidents', health: 'HEALTHY', agentOwner: 'Agent 24 (Key Custodian)' }
];

export const INITIAL_EXECUTIVE_QUESTIONS: ExecutiveQuestionAnswer[] = [
  {
    questionNumber: 1,
    question: 'WHAT CHANGED?',
    headline: 'Operating Liquidity & Working Capital Surge with Reduced Macro Beta',
    subtext: 'Cash conversion cycle compressed by 19.3 days; $1.35M in idle balances swept into 5.15% annualized yield.',
    metricBadge: '+$211.5K Value Created',
    evidencePoints: [
      'Multi-bank clearing consolidated $1.85M across JPMorgan, SVB, and BNP Paribas.',
      'Tier-1 customer Apex Retail accepted dynamic 1.65% 10-day early settlement.',
      'Fed SOFR rate hike exposure was synthetically capped at 5.25% by Agent 06.'
    ]
  },
  {
    questionNumber: 2,
    question: 'WHY DID IT CHANGE?',
    headline: 'Autonomous Coordination of Agent Mesh (Agents 05, 07, 10 & 27)',
    subtext: 'Economic Brain resolved pricing vs. working capital collision to extract liquidity without sacrificing margin.',
    metricBadge: '0 Conflicts Unresolved',
    evidencePoints: [
      'Pareto optimization by Agent 27 protected 36 bps of gross margin.',
      'GL reconciliation verified continuous variance detection in <3.4 seconds.',
      'Deterministic AI Firewall verified zero prompt injection or unauthorized transfer risk.'
    ]
  },
  {
    questionNumber: 3,
    question: 'WHAT COULD HAPPEN NEXT?',
    headline: '18-Day Component Delay Warning from Tokyo Semiconductor Fab',
    subtext: 'Yokohama port bottleneck threatens to deplete safety buffer stock from 30 days to 12 days by mid-Q2.',
    metricBadge: '32% Churn Risk at Apex',
    evidencePoints: [
      'Universal Economic Graph detected delivery delay signal via protocol msg-9901.',
      'Cross-silo propagation model projects potential $1.85M quarterly revenue push.',
      'Senior bank covenant DSCR could narrow from 1.84x to 1.39x if unaddressed.'
    ]
  },
  {
    questionNumber: 4,
    question: 'WHAT OPTIONS EXIST?',
    headline: 'Three Coordinated Intervention Paths Evaluated by Global Simulator',
    subtext: 'Stochastic engine compared dual-sourcing, emergency spot buyout, and customer delivery re-scheduling.',
    metricBadge: 'Option A Ranked Optimal',
    evidencePoints: [
      'Option A: Activate TSMC European Foundry dual-sourcing agreement ($85K setup, $2.2M loss prevented).',
      'Option B: Purchase emergency spot silicon at 35% premium ($450K cost, $1.6M loss prevented).',
      'Option C: Negotiate delayed milestone acceptance with Apex Retail with 2% discount incentive.'
    ]
  },
  {
    questionNumber: 5,
    question: 'WHAT IS THE MODELED IMPACT OF EACH OPTION?',
    headline: 'Option A Delivers 98.9% Solvency Protection & Mitigates $2.2M Downside',
    subtext: 'Monte Carlo simulation of 10,000 paths confirms Option A preserves Senior Loan DSCR above 1.72x.',
    metricBadge: '99.8% Solvency Preserved',
    evidencePoints: [
      'Net enterprise financial gain: +$2,115,000 compared to unhedged baseline.',
      'Worst-case P90 loss capped at $650,000 vs. $3.9M unhedged.',
      'Integration risk score: Low (34/100) under existing pre-qualification.'
    ]
  },
  {
    questionNumber: 6,
    question: 'WHAT AUTHORIZATION IS REQUIRED?',
    headline: 'Class C Human CFO / Multi-Sig Sign-Off Mandate',
    subtext: 'Financial allocation exceeds $50K automated threshold; requires Ed25519 cryptographic key signature.',
    metricBadge: 'Class C Required',
    evidencePoints: [
      'Decision Package #DP-2026-0881 validated by Deterministic AI Firewall (5/5 stages passed).',
      'Rollback guarantee: Automated 24h reverse liquidation in place.',
      'Mobile single-click mandate sent to CFO and Treasurer cryptographic wallets.'
    ],
    governanceClassRequired: 'CLASS_C'
  },
  {
    questionNumber: 7,
    question: 'WHAT WILL ECONOS EXECUTE?',
    headline: 'Immediate Automated Dispatch via Layer 11 Execution Gateway',
    subtext: 'Upon Class C signature, ECONOS initiates foundry routing, bank wire sweeps, and customer notification.',
    metricBadge: 'Ready for 1-Click Action',
    evidencePoints: [
      'TSMC European allocation order routed via secure B2B API gateway.',
      'JPMorgan treasury sweep confirmed with code 200 receipt.',
      'Outcome Ledger reconciliation scheduled for 30d, 60d, and 90d post-clearing.'
    ]
  }
];

// ==========================================
// 10. ECONOS NETWORK MARKETPLACE MODULES
// ==========================================

export const INITIAL_MARKETPLACE_MODULES: MarketplaceModule[] = [
  {
    id: 'mkt-01',
    title: 'Advanced Discrete Manufacturing Supply Chain Model',
    provider: 'Fraunhofer IPA & Global Manufacturing Analytics',
    moduleType: 'INDUSTRY_MODEL',
    version: '2.4.0',
    verifiedSecurityAudit: true,
    governanceChecked: true,
    pricingModel: 'INCLUDED_ENTERPRISE',
    rating: 4.9,
    downloads: 1420,
    description: 'High-fidelity Bill of Materials (BOM) multi-echelon inventory optimization model calibrated across automotive and aerospace assembly plants.',
    compatibleLayers: ['Layer 02: Economic Graph', 'Layer 07: Simulator', 'Agent 03'],
    sandboxTested: true,
    isActiveInstalled: true
  },
  {
    id: 'mkt-02',
    title: 'Geopolitical Tariff & Sanctions Stress Pack (2026-2028)',
    provider: 'Geopolitical Risk Intelligence Consortium',
    moduleType: 'MACRO_SCENARIO_PACK',
    version: '4.1.2',
    verifiedSecurityAudit: true,
    governanceChecked: true,
    pricingModel: 'USAGE_ROYALTY',
    rating: 4.8,
    downloads: 890,
    description: 'Stochastic simulation library containing 45 pre-built trade shock scenarios, including US-China tariff escalation, Red Sea logistics chokepoints, and critical mineral export quotas.',
    compatibleLayers: ['Layer 01: Macro Intel', 'Layer 07: Simulator', 'Agent 04'],
    sandboxTested: true,
    isActiveInstalled: true
  },
  {
    id: 'mkt-03',
    title: 'EU Corporate Sustainability & CSRD Compliance Ruleset',
    provider: 'Deloitte Quantum Compliance Labs',
    moduleType: 'COMPLIANCE_RULESET',
    version: '1.8.0',
    verifiedSecurityAudit: true,
    governanceChecked: true,
    pricingModel: 'ANNUAL_SEAT',
    rating: 4.7,
    downloads: 620,
    description: 'Deterministic firewall ruleset validating carbon accounting, Scope 3 supplier disclosures, and ESG compliance against European Corporate Sustainability Reporting Directives.',
    compatibleLayers: ['Layer 05: Control Plane', 'Layer 09: AI Firewall', 'Agent 26'],
    sandboxTested: true,
    isActiveInstalled: false
  },
  {
    id: 'mkt-04',
    title: 'Mixed-Integer Linear Programming Working Capital Solver',
    provider: 'ETH Zurich Operations Research Institute',
    moduleType: 'OPTIMIZATION_SOLVER',
    version: '3.0.1',
    verifiedSecurityAudit: true,
    governanceChecked: true,
    pricingModel: 'INCLUDED_ENTERPRISE',
    rating: 4.9,
    downloads: 2100,
    description: 'Sub-second mathematical optimization engine for dynamic discount scheduling across multi-tier accounts payable and receivable networks.',
    compatibleLayers: ['Layer 08: Decision Engine', 'Agent 07'],
    sandboxTested: true,
    isActiveInstalled: true
  }
];
