export interface EnterpriseIssue {
  id: string;
  number: number;
  title: string;
  tagline: string;
  category: 'CASH_TREASURY' | 'MACRO_RISK' | 'GOVERNANCE_TRUST' | 'OPERATIONS_OPEX' | 'INTELLIGENCE_TWIN';
  executiveSummary: string;
  businessSuffering: string;
  econosSolution: string;
  layerAssigned: string;
  agentsAssigned: { code: string; name: string; role: string }[];
  governanceClass: 'CLASS_A' | 'CLASS_B' | 'CLASS_C' | 'CLASS_D' | 'CLASS_E';
  typicalEnterpriseLeakage: string;
  econosDeliverableROI: string;
  beforeMetrics: { label: string; value: string; status: 'bad' | 'neutral' }[];
  afterMetrics: { label: string; value: string; status: 'good' }[];
  simulationType: 
    | 'LATENCY_TWIN' 
    | 'CASH_SWEEP' 
    | 'MACRO_HEDGE' 
    | 'GRAPH_SILO' 
    | 'MONTE_CARLO' 
    | 'PROCUREMENT_AUCTION' 
    | 'EXECUTION_CHASM' 
    | 'COVENANT_GUARDIAN' 
    | 'AI_FIREWALL_TEST' 
    | 'OUTCOME_LEARNING';
}

export const ENTERPRISE_ISSUES: EnterpriseIssue[] = [
  {
    id: 'issue-1',
    number: 1,
    title: 'The 30-Day Financial Latency Blindspot',
    tagline: 'Lagging monthly closes blindside leadership to intra-month margin collapse',
    category: 'INTELLIGENCE_TWIN',
    executiveSummary: 'Enterprises operate in the dark for 15–30 days every month waiting on human accounting month-close reconciliation, leaving them vulnerable to undetected cash burn and margin erosion.',
    businessSuffering: 'By the time the month-end close report reaches the CFO on day 22, customer churn has already cascaded, inventory costs have spiked, and available runway has shrunk without intervention.',
    econosSolution: 'Layer 04 Enterprise Digital Twin continuously streams bank clears, invoice receivables, and general ledger postings in real-time, delivering minute-by-minute EBITDA and liquidity visibility.',
    layerAssigned: 'Layer 04: Digital Twin & Ingestion',
    agentsAssigned: [
      { code: 'AGENT_11', name: 'GL Reconciliation & Anomaly Sentinel', role: 'Real-time ledger variance detection' },
      { code: 'AGENT_23', name: 'Epistemic Fact Auditor', role: 'Continuous ledger truth verification' }
    ],
    governanceClass: 'CLASS_A',
    typicalEnterpriseLeakage: '$450K – $1.2M in delayed operational corrections per quarter',
    econosDeliverableROI: 'Reduces decision latency from 28 days to <4 minutes; zero surprise EBITDA misses',
    beforeMetrics: [
      { label: 'Close Latency', value: '24 Business Days', status: 'bad' },
      { label: 'Variance Detection', value: 'Post-Mortem Only', status: 'bad' },
      { label: 'Intra-Month Runway Visibility', value: 'Estimated (Excel)', status: 'neutral' }
    ],
    afterMetrics: [
      { label: 'Close Latency', value: 'Continuous (Sub-second)', status: 'good' },
      { label: 'Variance Detection', value: 'Real-Time Streaming Alerts', status: 'good' },
      { label: 'Intra-Month Runway Visibility', value: 'Audited Live (14.2 Mos)', status: 'good' }
    ],
    simulationType: 'LATENCY_TWIN'
  },
  {
    id: 'issue-2',
    number: 2,
    title: 'Trapped Working Capital & Idle Cash Drag',
    tagline: 'Millions sit trapped in zero-yield operating accounts while credit lines are drawn at 8%',
    category: 'CASH_TREASURY',
    executiveSummary: 'Sub-optimal liquidity routing across fragmented subsidiary bank accounts traps substantial capital in non-interest accounts while vendor payment terms go unoptimized.',
    businessSuffering: 'Companies keep $2M–$15M across 6 subsidiary operating accounts earning 0.15% APY while simultaneously drawing from bank credit facilities at SOFR + 325 bps (8.25%). Invoices sit at 68 days DSO.',
    econosSolution: 'Agent 05 (Liquidity Sweeper) and Agent 07 (Working Capital Optimizer) autonomously pool multi-bank balances, sweep idle cash into 5.15% T-bill yield overnight, and dynamically deploy early-payment discounts.',
    layerAssigned: 'Layer 06: Sovereign Mesh (Tier 1 Treasury)',
    agentsAssigned: [
      { code: 'AGENT_05', name: 'Liquidity & Cash-Flow Sweeper', role: 'Autonomous multi-bank balance routing' },
      { code: 'AGENT_07', name: 'Working Capital Optimizer', role: 'Dynamic 2/10 Net 30 DSO compression' }
    ],
    governanceClass: 'CLASS_B',
    typicalEnterpriseLeakage: '$380K – $950K annual yield loss + $2.4M trapped receivables',
    econosDeliverableROI: '+18.4 Days DSO compression; +$142K automated annual interest yield on overnight sweeps',
    beforeMetrics: [
      { label: 'Days Sales Outstanding (DSO)', value: '68.4 Days', status: 'bad' },
      { label: 'Idle Operating Cash Yield', value: '0.18% APY', status: 'bad' },
      { label: 'Cash Conversion Cycle', value: '76 Days', status: 'bad' }
    ],
    afterMetrics: [
      { label: 'Days Sales Outstanding (DSO)', value: '49.1 Days (-19.3d)', status: 'good' },
      { label: 'Idle Operating Cash Yield', value: '5.15% APY Treasury', status: 'good' },
      { label: 'Cash Conversion Cycle', value: '52 Days (-24d)', status: 'good' }
    ],
    simulationType: 'CASH_SWEEP'
  },
  {
    id: 'issue-3',
    number: 3,
    title: 'Unhedged Macroeconomic Exposure (FX, Rates & Shocks)',
    tagline: 'Rate hikes, FX devaluations, and energy spikes crush margins without a proactive trading desk',
    category: 'MACRO_RISK',
    executiveSummary: 'Mid-market businesses absorb severe macroeconomic shocks because they lack specialized treasury trading desks to model and execute proactive currency and rate hedges.',
    businessSuffering: 'A 75 bps Fed rate hike or a 6% EUR/USD drop evaporates 300 bps of EBITDA margin overnight because procurement contracts are unhedged and floating-rate debt interest escalates.',
    econosSolution: 'Layer 01 Macro Intelligence & Agent 06 (FX Hedger) monitor global central bank signals, calculate the specific enterprise balance-sheet beta, and synthesize optimal forward contracts.',
    layerAssigned: 'Layer 01: Macro Intel & Layer 07: Simulation',
    agentsAssigned: [
      { code: 'AGENT_01', name: 'Macro Regime Arbitrageur', role: 'Monitors interest rates, inflation & yields' },
      { code: 'AGENT_06', name: 'FX & Commodity Hedger', role: 'Calculates portfolio forward contracts' }
    ],
    governanceClass: 'CLASS_C',
    typicalEnterpriseLeakage: '4% – 8% sudden EBITDA shrinkage during volatile macro cycles',
    econosDeliverableROI: 'Locks in budget certainty; 98.4% downside risk mitigation across EUR, GBP & floating debt',
    beforeMetrics: [
      { label: 'Floating Debt Exposure', value: '78% Unhedged', status: 'bad' },
      { label: 'Currency Volatility Beta', value: '0.84 (High)', status: 'bad' },
      { label: 'Macro Stress Readiness', value: 'Reactive Panic', status: 'bad' }
    ],
    afterMetrics: [
      { label: 'Floating Debt Exposure', value: '18% Synthetically Capped', status: 'good' },
      { label: 'Currency Volatility Beta', value: '0.08 (Immunized)', status: 'good' },
      { label: 'Macro Stress Readiness', value: 'Pre-Approved Playbook', status: 'good' }
    ],
    simulationType: 'MACRO_HEDGE'
  },
  {
    id: 'issue-4',
    number: 4,
    title: 'The "Siloed Fragmented Tool" Nightmare',
    tagline: 'ERP, CRM, Treasury, and HR live in isolation, leaving cross-functional ripple effects invisible',
    category: 'INTELLIGENCE_TWIN',
    executiveSummary: 'Enterprises maintain 6 to 12 disconnected software silos (NetSuite, Salesforce, Workday, Kyriba, Coupa). Finance teams waste 60% of their time stitching CSV files together.',
    businessSuffering: 'A supplier delivery delay inside ERP goes undetected by sales in CRM; customers churn due to fulfillment latency; cash flow in Treasury plummets without early warning.',
    econosSolution: 'Layer 02 Universal Economic Graph connects organizations, opportunities, accounts, agents, and outcomes into a unified relational semantic fabric with real-time dependency propagation.',
    layerAssigned: 'Layer 02: Economic Graph Fabric',
    agentsAssigned: [
      { code: 'AGENT_03', name: 'Supply Chain Arbitrageur', role: 'Bridges ERP stock to CRM delivery promises' },
      { code: 'AGENT_15', name: 'LTV / Churn Sentinel', role: 'Correlates delivery latency to renewal risk' }
    ],
    governanceClass: 'CLASS_A',
    typicalEnterpriseLeakage: 'Hundreds of human hours wasted monthly in manual reconciliation + blindside churn',
    econosDeliverableROI: 'Single source of unified economic truth; automated multi-system ripple alerts',
    beforeMetrics: [
      { label: 'System Silos', value: '8 Independent Tools', status: 'bad' },
      { label: 'Cross-System Sync Delay', value: 'Weekly / Bi-Weekly', status: 'bad' },
      { label: 'Manual CSV Reconciliations', value: '38 Hours / Month', status: 'bad' }
    ],
    afterMetrics: [
      { label: 'System Silos', value: '1 Universal Graph', status: 'good' },
      { label: 'Cross-System Sync Delay', value: 'Real-Time Semantic Web', status: 'good' },
      { label: 'Manual CSV Reconciliations', value: '0 Hours (Automated)', status: 'good' }
    ],
    simulationType: 'GRAPH_SILO'
  },
  {
    id: 'issue-5',
    number: 5,
    title: 'Fragile & Guesswork "What-If" Planning',
    tagline: 'Static Excel spreadsheets break when modeling complex, multi-variable macroeconomic stress',
    category: 'MACRO_RISK',
    executiveSummary: 'Executive planning hinges on fragile, single-case Excel files that fail to capture tail-risk distributions, correlated breakdowns, or multi-scenario stochastic realities.',
    businessSuffering: 'When the board asks "Can we survive a 25% revenue dip while CapEx commitments are active?", FP&A takes two weeks to build an error-prone formula that only tests one static assumption.',
    econosSolution: 'Layer 07 Stochastic Simulation Engine executes 1,000 to 100,000 Monte Carlo paths in seconds, generating complete probability distributions for solvency, runway, and cash preservation.',
    layerAssigned: 'Layer 07: Simulation Engine',
    agentsAssigned: [
      { code: 'AGENT_02', name: 'Capital Allocator', role: 'Simulates ROI distributions of CapEx decisions' },
      { code: 'AGENT_23', name: 'Epistemic Auditor', role: 'Separates facts from model assumptions' }
    ],
    governanceClass: 'CLASS_A',
    typicalEnterpriseLeakage: 'Bad multi-million dollar capital allocations based on single-point Excel formulas',
    econosDeliverableROI: 'Instant stochastic stress-testing; 95% Value-at-Risk (VaR) mathematically certified',
    beforeMetrics: [
      { label: 'Simulation Paths', value: '1 Static Spreadsheet', status: 'bad' },
      { label: 'Turnaround Time', value: '9 – 14 Days', status: 'bad' },
      { label: 'Solvency Confidence', value: 'Intuition / Guesswork', status: 'neutral' }
    ],
    afterMetrics: [
      { label: 'Simulation Paths', value: '10,000 Monte Carlo Runs', status: 'good' },
      { label: 'Turnaround Time', value: '<3 Seconds', status: 'good' },
      { label: 'Solvency Confidence', value: '99.2% Statistically Proved', status: 'good' }
    ],
    simulationType: 'MONTE_CARLO'
  },
  {
    id: 'issue-6',
    number: 6,
    title: 'Unchecked SaaS & Procurement Margin Bleed',
    tagline: 'Auto-renewing vendor contracts and unnegotiated pricing leak 8%–14% of enterprise EBITDA',
    category: 'OPERATIONS_OPEX',
    executiveSummary: 'Decentralized procurement leads to dormant software licenses, missed notification windows on auto-renewals, and absence of competitive price benchmarking.',
    businessSuffering: 'Enterprise software, AWS cloud commitments, and logistics contracts auto-renew at 8%–15% price increases without review, silently eroding operating margins.',
    econosSolution: 'Agent 08 (Reverse-Auction Procurement) scans contract renewal horizons, benchmarks market rates, aggregates purchasing leverage, and runs automated multi-round vendor bids.',
    layerAssigned: 'Layer 06: Sovereign Mesh (Tier 2 Operations)',
    agentsAssigned: [
      { code: 'AGENT_08', name: 'Reverse-Auction Procurement', role: 'Automated vendor rate benchmarking' },
      { code: 'AGENT_18', name: 'Contract Risk & SLA Sentinel', role: 'Auto-renewal horizon enforcement' }
    ],
    governanceClass: 'CLASS_B',
    typicalEnterpriseLeakage: '$220K – $800K per 100 enterprise employees in bloated vendor spend',
    econosDeliverableROI: 'Recovers 15% – 28% in annual vendor spend; eliminates 100% of unwanted auto-renewals',
    beforeMetrics: [
      { label: 'Dormant SaaS Waste', value: '23% Unused Seats', status: 'bad' },
      { label: 'Renewal Notice Window', value: 'Missed (Auto-Billed)', status: 'bad' },
      { label: 'Procurement Cycle Time', value: '45 Days per Vendor', status: 'bad' }
    ],
    afterMetrics: [
      { label: 'Dormant SaaS Waste', value: '0% (Auto-Deprovisioned)', status: 'good' },
      { label: 'Renewal Notice Window', value: '90-Day Warning + Bid', status: 'good' },
      { label: 'Procurement Cycle Time', value: '72 Hours (Reverse Auction)', status: 'good' }
    ],
    simulationType: 'PROCUREMENT_AUCTION'
  },
  {
    id: 'issue-7',
    number: 7,
    title: 'The "Execution Chasm" (Insights vs. Implementation)',
    tagline: 'BI dashboards generate colorful charts that fail to execute, leaving recommendations paralyzed',
    category: 'GOVERNANCE_TRUST',
    executiveSummary: 'Traditional business intelligence and consulting advice fail because bridging insight to real-world execution requires dozens of manual emails, tickets, bank wires, and approvals.',
    businessSuffering: 'Management teams know where the leaks are, but 80% of optimization opportunities die in email inboxes because execution friction is too high and accountability is diffuse.',
    econosSolution: 'Layer 10 Human Approval Pipeline & Layer 11 Execution Gateway package verified decisions into single-click action packets with verifiable cryptographic audit trails.',
    layerAssigned: 'Layer 10: Human Approval & Layer 11: Execution',
    agentsAssigned: [
      { code: 'AGENT_24', name: 'Identity & Cryptographic Custodian', role: 'Issues Ed25519 digitally signed mandates' },
      { code: 'AGENT_27', name: 'Consensus & Deadlock Arbiter', role: 'Resolves multi-department execution blocks' }
    ],
    governanceClass: 'CLASS_C',
    typicalEnterpriseLeakage: '70% – 85% of high-ROI strategic initiatives stalled or abandoned',
    econosDeliverableROI: 'Accelerates time-to-action from 6 weeks to 60 seconds with complete audit safety',
    beforeMetrics: [
      { label: 'Recommendation Execution', value: '18% Implemented', status: 'bad' },
      { label: 'Approval Latency', value: '3.5 Weeks', status: 'bad' },
      { label: 'Execution Audit Trail', value: 'Fragmented Emails', status: 'bad' }
    ],
    afterMetrics: [
      { label: 'Recommendation Execution', value: '94% Executed via Gate', status: 'good' },
      { label: 'Approval Latency', value: '<2 Minutes (Mobile/Web)', status: 'good' },
      { label: 'Execution Audit Trail', value: 'Ed25519 Cryptographic Log', status: 'good' }
    ],
    simulationType: 'EXECUTION_CHASM'
  },
  {
    id: 'issue-8',
    number: 8,
    title: 'Unexpected Debt Covenant Breaches & Credit Distress',
    tagline: 'Technical loan covenant violations freeze revolving credit lines and spike interest penalties',
    category: 'CASH_TREASURY',
    executiveSummary: 'Lenders impose strict covenant ratios (e.g., Leverage <3.5x, DSCR >1.5x). A single quarter dip can cause an accidental breach, triggering penalty interest and credit freezes.',
    businessSuffering: 'A seasonal dip or sudden one-off expense causes a technical debt covenant default. The senior bank levies 200 bps penalty interest and blocks dividend distributions.',
    econosSolution: 'Agent 10 (Debt Covenant Guardian) maintains real-time monitoring of loan agreements against projected cash flows, enforcing preventive CapEx guardrails 90 days before danger.',
    layerAssigned: 'Layer 06: Sovereign Mesh & Layer 09: Firewall',
    agentsAssigned: [
      { code: 'AGENT_10', name: 'Debt Covenant Guardian', role: 'Automated leverage & DSCR monitoring' },
      { code: 'AGENT_05', name: 'Liquidity Sweeper', role: 'Maintains required minimum cash reserves' }
    ],
    governanceClass: 'CLASS_C',
    typicalEnterpriseLeakage: 'Millions in penalty financing fees, downgraded credit ratings, and board distress',
    econosDeliverableROI: 'Zero covenant breaches; 90-day early warning buffer with automated remedial action',
    beforeMetrics: [
      { label: 'Covenant Headroom Visibility', value: 'Quarterly Static', status: 'bad' },
      { label: 'Breach Early-Warning', value: 'None (Surprise Default)', status: 'bad' },
      { label: 'Lender Penalty Exposure', value: '$350K+ in Fees', status: 'bad' }
    ],
    afterMetrics: [
      { label: 'Covenant Headroom Visibility', value: 'Continuous (Live 1.84x DSCR)', status: 'good' },
      { label: 'Breach Early-Warning', value: '90-Day Predictive Buffer', status: 'good' },
      { label: 'Lender Penalty Exposure', value: '$0 (100% Covenants Maintained)', status: 'good' }
    ],
    simulationType: 'COVENANT_GUARDIAN'
  },
  {
    id: 'issue-9',
    number: 9,
    title: 'Rogue AI & Hallucination Risk (The Enterprise Trust Barrier)',
    tagline: 'CFOs cannot risk corporate treasury on hallucinating, unconstrained black-box LLM prompts',
    category: 'GOVERNANCE_TRUST',
    executiveSummary: 'Enterprises reject generative AI for mission-critical finance because probabilistic LLMs hallucinate numbers, lack deterministic guardrails, and risk catastrophic unauthorized transactions.',
    businessSuffering: 'Experimental AI agents have caused accidental data leaks, executed illegal trades, or committed to incorrect vendor pricing because they lacked cryptographic boundaries.',
    econosSolution: 'Layer 05 Control Plane & Layer 09 Deterministic AI Firewall enforce multi-stage parameter inspection, strict spending caps, and Ed25519 signed passports with immediate auto-quarantine.',
    layerAssigned: 'Layer 05: Control Plane & Layer 09: AI Firewall',
    agentsAssigned: [
      { code: 'AGENT_22', name: 'Adversarial Red-Team Simulator', role: '24/7 synthetic prompt injection testing' },
      { code: 'AGENT_24', name: 'Cryptographic Identity Custodian', role: 'Revokes passports on policy violation' }
    ],
    governanceClass: 'CLASS_E',
    typicalEnterpriseLeakage: 'Catastrophic liability exposure; complete freeze of AI adoption by enterprise legal',
    econosDeliverableROI: 'Zero unauthorized actions; deterministic mathematical policy bounds; SOC2/ISO compliant',
    beforeMetrics: [
      { label: 'Agent Authority Boundary', value: 'Unbounded / Prompt-Only', status: 'bad' },
      { label: 'Hallucination Mitigation', value: 'Hope / Temperature: 0', status: 'bad' },
      { label: 'Financial Action Approval', value: 'Unverified / Ad-Hoc', status: 'bad' }
    ],
    afterMetrics: [
      { label: 'Agent Authority Boundary', value: 'Cryptographic Ed25519 Cap', status: 'good' },
      { label: 'Hallucination Mitigation', value: 'Deterministic AI Firewall', status: 'good' },
      { label: 'Financial Action Approval', value: 'Mandatory Class C / HSM Sign', status: 'good' }
    ],
    simulationType: 'AI_FIREWALL_TEST'
  },
  {
    id: 'issue-10',
    number: 10,
    title: 'Institutional Amnesia & The Broken Feedback Loop',
    tagline: 'Forecasts miss repeatedly because companies never reconcile models against actual general ledger outcomes',
    category: 'OPERATIONS_OPEX',
    executiveSummary: 'Organizations repeat identical forecasting and strategic errors because post-mortems are skipped, and predictive models are never calibrated against realized audited financials.',
    businessSuffering: 'Executives approve $10M initiatives based on rosy projections. When actual revenue lands 40% below target, nobody audits what went wrong, and the next plan uses the same flawed assumptions.',
    econosSolution: 'Layer 13 Closed-Loop Outcome Learning Engine reconciles every recommended decision against the General Ledger at 30, 60, and 90 days, mathematically tuning future priors.',
    layerAssigned: 'Layer 13: Outcome Learning & Feedback',
    agentsAssigned: [
      { code: 'AGENT_23', name: 'Epistemic Auditor', role: 'Separates facts, assumptions & estimates' },
      { code: 'AGENT_25', name: 'Self-Improvement Engine', role: 'Bayesian recalibration of agent confidence' }
    ],
    governanceClass: 'CLASS_A',
    typicalEnterpriseLeakage: 'Compounding forecasting errors leading to chronic overhiring and inventory write-offs',
    econosDeliverableROI: 'Continuous Bayesian calibration; shrinks forecast variance from ±22% to <±3.5%',
    beforeMetrics: [
      { label: 'Forecast Accuracy Variance', value: '±22.4% Error Rate', status: 'bad' },
      { label: 'Post-Mortem Reconciliation', value: '<5% of Initiatives', status: 'bad' },
      { label: 'Model Recalibration', value: 'Manual Annual Review', status: 'bad' }
    ],
    afterMetrics: [
      { label: 'Forecast Accuracy Variance', value: '±3.1% Error Rate', status: 'good' },
      { label: 'Post-Mortem Reconciliation', value: '100% Automated at 90d', status: 'good' },
      { label: 'Model Recalibration', value: 'Continuous Bayesian Update', status: 'good' }
    ],
    simulationType: 'OUTCOME_LEARNING'
  }
];
