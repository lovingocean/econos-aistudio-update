import React, { useState } from 'react';
import { 
  X, 
  Milestone, 
  Layers, 
  Bot, 
  PieChart, 
  ShieldCheck, 
  Compass, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  DollarSign, 
  Building2, 
  Network, 
  Cpu, 
  Flame, 
  Lock, 
  FileSpreadsheet, 
  Sparkles,
  Search,
  Filter,
  Zap
} from 'lucide-react';

interface RoadmapMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSolutions?: () => void;
}

type TabKey = 'phases' | 'mvp_vs_longterm' | 'agents' | 'capital_flywheel';

export const RoadmapMatrixModal: React.FC<RoadmapMatrixModalProps> = ({ isOpen, onClose, onOpenSolutions }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('phases');
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [layerFilter, setLayerFilter] = useState<string>('all');
  const [agentTierFilter, setAgentTierFilter] = useState<string>('all');

  if (!isOpen) return null;

  const phases = [
    {
      phase: 1,
      name: 'Phase 1: Foundation MVP (Closed-Loop Core)',
      timeline: 'Months 0 – 6',
      targetScale: '$10M – $50M ARR Enterprise Pilots',
      theme: 'Zero-Risk Trust Anchor, Closed-Loop Intelligence & Provenance',
      budget: '$8.5M Allocation',
      status: 'Current MVP Build',
      keyDeliverables: [
        'Single-tenant & Multi-tenant Zero-Trust data isolation with PBKDF2/timing-safe auth and BOLA protection',
        'Enterprise Digital Twin V1 (General Ledger, Cash Flow, Working Capital, Accounts Receivable)',
        'Core 6 Sovereign Agents: Liquidity Sweeper, Working Capital Optimizer, GL Reconciliation, LTV/Churn, Cryptographic Identity Custodian, Epistemic Auditor',
        'Ed25519 Cryptographic Economic Passports for verified agent identity & spending limits',
        'Deterministic AI Firewall with Policy Guardrails & Class C Human-in-the-Loop Approvals',
        'Scenario-to-Opportunity Epistemic Promotion linking financial simulations directly into live tracked initiatives',
        'Dynamic Economic Graph V1 rendering enterprise nodes (Orgs, Businesses, Opportunities, Outcomes, Agents)'
      ],
      decisionAutonomy: 'Class C (Human Approval Required for all actions >$0), Class A for read-only sync',
      roiTarget: '$1.5M – $4.0M annualized working capital & cash drag reduction per enterprise customer',
      failureBoundary: 'Zero unapproved financial execution. Complete deterministic rollback on anomalies.'
    },
    {
      phase: 2,
      name: 'Phase 2: Commercial Scalability & Controlled Autonomy',
      timeline: 'Months 6 – 18',
      targetScale: '$50M – $250M Total Processed Flow',
      theme: 'Direct Bank/ERP Connectors, Class B Policy Execution & Outcome Learning V1',
      budget: '$14.0M Allocation',
      status: 'Upcoming Milestone',
      keyDeliverables: [
        'Production connectors to Tier-1 ERPs (SAP S/4HANA, Oracle NetSuite, Workday) and Core Banking APIs (Plaid, SWIFT, FedNow)',
        'Expansion to 14 Sovereign Agents (Adding FX & Commodity Hedger, Reverse-Auction Procurement, Dynamic Pricing, Debt Covenant Guardian)',
        'Class B Policy-Controlled Autonomous Execution: automated cash sweeping & early-pay vendor discount capture up to $50K/day under strict rules',
        'Decision Ledger: Immutable cryptographic audit trail of all proposals, counterfactuals, approvals, and execution hashes',
        'Outcome Learning Engine V1: Automated 90-day reconciliation comparing predicted financial impacts vs. audited general ledger delta',
        'Subagent Delegation Framework: Parent agents can spawn ephemeral worker subagents with strictly bounded subordinate budget caps'
      ],
      decisionAutonomy: 'Class A (Reversible micro-actions <$5K), Class B (Policy-governed <$50K), Class C (Human executive approval for >$50K)',
      roiTarget: '$5.0M – $12.0M verified cash yield & margin expansion per client',
      failureBoundary: 'Cryptographic kill-switch instantly halts autonomous execution if model drift exceeds 3.5%'
    },
    {
      phase: 3,
      name: 'Phase 3: Multi-Agent Mesh & Industry Operating Systems',
      timeline: 'Months 18 – 36',
      targetScale: '$1B+ Enterprise Economic Volume',
      theme: 'All 28 Sovereign Agents, Vertical Industry Suites, War-Room Engine',
      budget: '$15.5M Allocation',
      status: 'Mid-Term Roadmap',
      keyDeliverables: [
        'Complete 28 Sovereign Agent Mesh operating concurrently with real-time collision & deadlock resolution',
        'Industry-Specific Economic Systems: ECONOS Manufacturing (inventory + energy), ECONOS Energy (hedging + CapEx), ECONOS Retail (elasticity + supply), ECONOS Banking (liquidity + regulatory capital)',
        'Active Red-Team Adversary Agent (Agent 22) continuously generating synthetic adversarial prompt attacks and compliance stress tests',
        'Crisis & War-Room Engine: One-click containment protocol for supply-chain freezes, rate spikes, or bank illiquidity with automated preservation playbooks',
        'Monte Carlo Economic Simulation Engine scaling to 100,000+ stochastic iterations per decision package'
      ],
      decisionAutonomy: 'Class B Autonomous expansion up to $250K/transaction within strict company policy bounds',
      roiTarget: '300–600 bps EBITDA margin expansion across client portfolios',
      failureBoundary: 'Automated multi-agent quorum voting: 3-of-4 independent agent tier consensus required before executive escalation'
    },
    {
      phase: 4,
      name: 'Phase 4: Global Capital & Risk Transfer Network',
      timeline: 'Months 36 – 60',
      targetScale: '$10B+ Network Flow Across 500+ Enterprises',
      theme: 'Insured Execution Guarantee Pool & Institutional Liquidity Rails',
      budget: '$7.0M Allocation',
      status: 'Scale Milestone',
      keyDeliverables: [
        'ECONOS Execution Guarantee Pool ($100M+ underwritten facility insuring against model execution error or algorithmic misallocation)',
        'Direct Capital & Risk Network bridge connecting enterprises to institutional liquidity providers, private credit funds, and hedging desks',
        'Autonomous Cross-Border Tax Nexus & Currency Routing optimizing international corporate cash movements across multiple jurisdictions',
        'Automated Supply-Chain Reverse-Auction Marketplace matching verified corporate purchase orders with competitive supplier bids',
        'Institutional Memory Network: Cross-enterprise anonymized learning loop benchmarking economic elasticity and supplier reliability'
      ],
      decisionAutonomy: 'Class B up to $1M underwritten by Guarantee Pool; Class C/D for debt restructuring, M&A, and major capital allocation',
      roiTarget: 'Zero unhedged FX/commodity exposure; 15–25% reduction in corporate borrowing spread via continuous real-time credit scoring',
      failureBoundary: 'Full regulatory compliance (SOX, EU AI Act High-Risk System certification, Basel III/IV capital adequacy verification)'
    },
    {
      phase: 5,
      name: 'Phase 5: $10B Global Economic Simulator & World Model',
      timeline: 'Months 60+',
      targetScale: 'Global Economic Infrastructure ($100B+ Ecosystem)',
      theme: 'Global Economic World Model, Third-Party Marketplace & Sovereign Infrastructure',
      budget: '$5.0M Sustainable R&D Reserve',
      status: 'Long-Term Endgame',
      keyDeliverables: [
        'Global Economic World Model: Multi-country, multi-industry continuous simulation capturing supply-chain shocks, trade war tariffs, and central bank shifts',
        'ECONOS Open Marketplace: Third-party quantitative hedge funds, industry specialists, and risk analysts publishing certified autonomous agents and economic datasets',
        'Universal Economic Graph indexing over 100,000 corporate balance sheets, multi-tier supplier dependencies, and sovereign trade flows',
        'Global Systemic Risk Early-Warning Sentinel: Proactive alerting for macroeconomic contagion and counterparty failure weeks before traditional market indices reflect it'
      ],
      decisionAutonomy: 'Full spectrum A through D with sovereign hardware security module (HSM) signing anchors',
      roiTarget: 'Standardized Operating System for global enterprise finance, replacing legacy ERP/BI stacks with autonomous economic intelligence',
      failureBoundary: 'Partition-tolerant sovereign local deployment: enterprises can run completely offline in national security or crisis environments'
    }
  ];

  const layerComparison = [
    {
      id: 1,
      layer: 'Layer 1: Global Economic Intelligence',
      mvp: 'Curated macro data feeds (Federal Reserve FRED, ECB rates, oil/gas benchmarks, FX indices). Manual & scheduled ingestion.',
      longTerm: 'Continuous real-time ingestion of global shipping satellite telemetry, central bank transcripts, customs manifests, energy grid data, and sentiment graphs.',
      decisionClass: 'Class A (Read-only data synthesis)',
      category: 'Intelligence'
    },
    {
      id: 2,
      layer: 'Layer 2: Universal Economic Graph',
      mvp: 'Tenant-scoped dynamic economic graph linking Organization -> Business -> Opportunities -> Outcomes -> Agents with typed relationship edges.',
      longTerm: 'Global graph connecting 100,000+ companies, multi-tier suppliers, capital providers, contracts, commodities, and macroeconomic causal links.',
      decisionClass: 'Class A (Real-time graph indexing)',
      category: 'Knowledge'
    },
    {
      id: 3,
      layer: 'Layer 3: ECONOS Economic Brain',
      mvp: 'Rule-based synthesis + Gemini 3.8 Flash orchestration. Resolves multi-agent conflicts via priority scoring and confidence thresholds.',
      longTerm: 'Custom fine-tuned quantitative economic foundation model + deterministic linear programming optimizer (Gurobi/CPLEX) synthesizing millions of variables.',
      decisionClass: 'Class C (Strategic synthesis & human escalation)',
      category: 'Intelligence'
    },
    {
      id: 4,
      layer: 'Layer 4: Enterprise Digital Twin',
      mvp: 'P&L, Cash Flow, Working Capital (AR/AP), and Runway simulator with 3-scenario stress testing (+35% Growth, Downside Stress, Baseline).',
      longTerm: 'Comprehensive real-time twin modeling balance sheet, debt covenants, multi-currency cash pools, tax nexuses, employee headcount, and inventory SKU micro-economics.',
      decisionClass: 'Class A (Simulated model state)',
      category: 'Simulation'
    },
    {
      id: 5,
      layer: 'Layer 5: Agent Control Plane',
      mvp: 'Centralized RBAC/ABAC governance, monthly spending limit caps, tool whitelisting, cryptographic key verification, and single-click emergency kill-switches.',
      longTerm: 'FIPS 140-3 Level 4 Hardware Security Module (HSM) key anchors, automated subagent spawning with hierarchical budget propagation, and formal mathematical verification.',
      decisionClass: 'Class D (Executive governance)',
      category: 'Control'
    },
    {
      id: 6,
      layer: 'Layer 6: Sovereign Agent Mesh',
      mvp: '6 Core Agents in active pilot deployment: Liquidity Sweeper, Working Capital, GL Reconciliation, LTV/Churn, Cryptographic Identity Custodian, Epistemic Auditor.',
      longTerm: 'All 28 Sovereign Agents running across 4 coordinated tiers with autonomous multi-agent consensus, specialized domain subagents, and dynamic task delegation.',
      decisionClass: 'Class A to D (Governed by Agent Passport)',
      category: 'Execution'
    },
    {
      id: 7,
      layer: 'Layer 7: Economic Simulation Engine',
      mvp: 'Monte Carlo simulation up to 1,000 iterations for cash flow, rate shifts, and revenue shocks with sensitivity analysis.',
      longTerm: 'High-throughput cluster running 1,000,000+ stochastic paths, multi-agent game-theoretic counterfactuals, and systemic shock cascade modeling.',
      decisionClass: 'Class A (Compute simulation)',
      category: 'Simulation'
    },
    {
      id: 8,
      layer: 'Layer 8: Decision Engine',
      mvp: 'Standardized Decision Package with objective, assumptions, options, financial impacts, risks, confidence score, and rollback protocol.',
      longTerm: 'Multi-objective Pareto-frontier decision optimization generating legally compliant board resolution drafts and automated execution manifests.',
      decisionClass: 'Class B/C (Structured recommendations)',
      category: 'Decision'
    },
    {
      id: 9,
      layer: 'Layer 9: Trust & Verification Layer',
      mvp: 'Deterministic AI Firewall, Ed25519 cryptographic signatures, parameter range checking, policy violation interception, and audit logging.',
      longTerm: 'Adversarial red-team verification, formal logic proofs for financial constraints, zero-knowledge attestation, and continuous model drift halting.',
      decisionClass: 'Class A (Deterministic gatekeeper)',
      category: 'Trust'
    },
    {
      id: 10,
      layer: 'Layer 10: Human Approval Layer',
      mvp: 'Interactive executive approval queue with multi-tier role permissions (OWNER, ADMIN, OPERATOR), decision notes, and one-click resumption.',
      longTerm: 'Multi-signature executive & board approval workflows with hardware FIDO2/WebAuthn keys, automated compliance notarization, and audit archiving.',
      decisionClass: 'Class C/D (Human-in-the-loop)',
      category: 'Governance'
    },
    {
      id: 11,
      layer: 'Layer 11: Autonomous Execution Layer',
      mvp: 'Simulated API gateway + Stripe Sovereign Bridge + ERP webhook dispatchers with strict execution logs and failure containment.',
      longTerm: 'Direct banking integrations (SWIFT, FedNow, ISO 20022), automated ERP transaction posting (SAP BAPI, Oracle NetSuite SuiteTalk), and treasury trade execution.',
      decisionClass: 'Class A/B/C (Bounded execution)',
      category: 'Execution'
    },
    {
      id: 12,
      layer: 'Layer 12: Institutional Memory',
      mvp: 'Audit logs storing all proposed actions, simulated forecasts, human approvals, and execution timestamps per tenant.',
      longTerm: 'Universal Economic Memory Graph storing decades of decisions, macroeconomic conditions, counterfactual forecasts, and executive reasoning.',
      decisionClass: 'Class A (Immutable storage)',
      category: 'Memory'
    },
    {
      id: 13,
      layer: 'Layer 13: Outcome Learning Engine',
      mvp: 'Outcome Verification tracking recommended vs. actual impact, calculation of prediction delta, and epistemic provenance linking.',
      longTerm: 'Automated Bayesian model recalibration: prediction errors automatically adjust agent confidence priors, discount factors, and risk premiums across the network.',
      decisionClass: 'Class A (Model calibration)',
      category: 'Learning'
    },
    {
      id: 14,
      layer: 'Layer 14: Global Capital & Risk Network',
      mvp: 'Scenario-based debt and equity modeling; structured proposals for external capital needs.',
      longTerm: 'Direct programmatic liquidity marketplace connecting corporate treasuries to commercial paper desks, debt syndication, and automated hedging brokers.',
      decisionClass: 'Class D (Capital markets)',
      category: 'Capital'
    },
    {
      id: 15,
      layer: 'Layer 15: ECONOS Marketplace',
      mvp: 'Built-in extensible catalog of core sovereign agents and tools with tenant configuration.',
      longTerm: 'Third-party developer and quantitative firm marketplace with revenue-sharing, verified cryptographic certification, and sandboxed execution.',
      decisionClass: 'Class A (Platform ecosystem)',
      category: 'Ecosystem'
    },
    {
      id: 16,
      layer: 'Layer 16: Crisis / War-Room Engine',
      mvp: 'Downside stress testing scenario with automated cash preservation recommendations and freeze triggers.',
      longTerm: 'Dedicated Crisis Operating Room: automated liquidity containment, supply-chain rerouting, emergency credit line drawdown, and board communication streams.',
      decisionClass: 'Class C/D (Emergency override)',
      category: 'Crisis'
    },
    {
      id: 17,
      layer: 'Layer 17: ZK-SNARK Trade & Tax Clearance',
      mvp: 'OECD Pillar Two 15% minimum tax calculation and transfer pricing markup auditing.',
      longTerm: 'Zero-knowledge Groth16 cryptographic clearance proving cross-border tax compliance to sovereign authorities without leaking vendor pricing or margins.',
      decisionClass: 'Class A (Zero-Knowledge Proofs)',
      category: 'Trust'
    },
    {
      id: 18,
      layer: 'Layer 18: Programmable RWA & Tri-Party Repo Rails',
      mvp: 'Tokenized accounts receivable valuation with SOFR haircut calculations.',
      longTerm: 'Intra-day programmatic tri-party repo markets allowing corporate treasuries to borrow cash overnight against tokenized invoices with auto-liquidation.',
      decisionClass: 'Class B (Repo Liquidity Rails)',
      category: 'Capital'
    },
    {
      id: 19,
      layer: 'Layer 19: Macro & Geopolitics Micro-Hedge Synthesizer',
      mvp: 'Dynamic delta-hedging simulator for FX pairs and key raw commodity cost exposures.',
      longTerm: 'Autonomous options synthetic hedging matrix executing micro-hedges and rerouting maritime shipments around geopolitical chokepoints within seconds.',
      decisionClass: 'Class B (Algorithmic Micro-Hedging)',
      category: 'Intelligence'
    },
    {
      id: 20,
      layer: 'Layer 20: Capital Structure & Synthetic M&A Roll-Up Engine',
      mvp: 'Corporate WACC curve optimization and synthetic EBITDA multiple accretion models.',
      longTerm: 'Algorithmic roll-up targeting: automated pipeline evaluation, debt covenant firewall synthesis, and Delaware Revlon-compliant valuation packages.',
      decisionClass: 'Class D (Capital Markets & M&A)',
      category: 'Capital'
    },
    {
      id: 21,
      layer: 'Layer 21: Crisis & DEFCON Sovereign Defense War Room',
      mvp: 'Manual DEFCON trigger testing with cash-burn freeze checklists.',
      longTerm: 'One-click sovereign air-gap isolation, counterparty freeze protocols, and FedNow emergency liquidity draws with zero dependencies on third-party SaaS.',
      decisionClass: 'Class D (Executive War Defense)',
      category: 'Crisis'
    },
    {
      id: 22,
      layer: 'Layer 22: Autonomous Synthetic Central Bank (E-SDR Basket)',
      mvp: 'Multilateral currency basket pegged to physical gold, short-duration treasuries, and AAA European debt.',
      longTerm: 'Private algorithmic central bank issuing E-SDR clearing units with autonomous lender-of-last-resort discount window at 4.15% benchmark rate.',
      decisionClass: 'Class B/C (Monetary Clearing Unit)',
      category: 'Capital'
    },
    {
      id: 23,
      layer: 'Layer 23: Planetary Physical Twin & Orbital Satellite Escrow',
      mvp: 'Starlink AIS maritime telemetry tracking with simulated geofence arrivals.',
      longTerm: 'Orbital smart-lock escrow releasing tens of millions in cargo settlement the millisecond freight vessels breach verified destination port geofences.',
      decisionClass: 'Class B (Satellite IoT Escrow)',
      category: 'Execution'
    },
    {
      id: 24,
      layer: 'Layer 24: Post-Quantum Enclave & Air-Gap Hardware Mesh',
      mvp: 'NIST ML-KEM-1024 (Crystals-Kyber) & ML-DSA-87 key pairs in simulated confidential memory.',
      longTerm: 'Confidential AMD SEV-SNP and Intel TDX silicon enclave mesh with 3-of-5 threshold sharding across Switzerland, Iceland, and Singapore bunkers.',
      decisionClass: 'Class A (Post-Quantum Cryptography)',
      category: 'Trust'
    },
    {
      id: 25,
      layer: 'Layer 25: Autonomous Fiduciary AI Board & 190-Nation Regulatory Synthesizer',
      mvp: 'Delaware DGCL §141 board resolution generator with fiduciary risk scoring.',
      longTerm: '7-agent autonomous AI Board of Directors bound by corporate charters, executing sub-second SEC Form 8-K filings and EU CSRD disclosures.',
      decisionClass: 'Class C/D (Autonomous Governance)',
      category: 'Governance'
    },
    {
      id: 26,
      layer: 'Layer 26: Compute FLOP & Energy Commodity Arbitrage Grid',
      mvp: 'Nuclear and renewable baseload PPA contract tracking with locational price arbitrage.',
      longTerm: 'Liquid tokenized forward trading of GPU cluster FLOPs (NVIDIA H200 / B200 / TPU v5p), transforming compute expenditures into yield-generating treasury assets.',
      decisionClass: 'Class B (Commodity & Compute Yield)',
      category: 'Execution'
    }
  ];

  const agentDeployment = [
    // Tier 1
    { id: 1, name: 'Agent 01: Global Macro & Rate Arbitrageur', tier: 'Tier 1 - Macro', phase: 'Phase 2', status: 'In Design', autonomy: 'Class A', kpi: 'Yield Spread Optimization' },
    { id: 2, name: 'Agent 02: Capital Allocation & Balance Sheet Modeler', tier: 'Tier 1 - Macro', phase: 'Phase 2', status: 'In Design', autonomy: 'Class D', kpi: 'Weighted Average Cost of Capital (WACC)' },
    { id: 3, name: 'Agent 03: M&A & Strategic Synergy Synthesizer', tier: 'Tier 1 - Macro', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class D', kpi: 'Post-Merger Accretion Rate' },
    { id: 4, name: 'Agent 04: Geopolitical & Tariff Horizon Forecaster', tier: 'Tier 1 - Macro', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class A', kpi: 'Tariff Exposure Lead Time' },
    
    // Tier 2
    { id: 5, name: 'Agent 05: Liquidity & Cash Sweeping', tier: 'Tier 2 - Treasury', phase: 'Phase 1 (MVP)', status: 'Active Pilot', autonomy: 'Class B', kpi: 'Overnight Cash Drag Elimination' },
    { id: 6, name: 'Agent 06: FX & Commodity Hedger', tier: 'Tier 2 - Treasury', phase: 'Phase 2', status: 'In Design', autonomy: 'Class B', kpi: 'Basis Risk Variance' },
    { id: 7, name: 'Agent 07: Working Capital / DSO-DPO Optimizer', tier: 'Tier 2 - Treasury', phase: 'Phase 1 (MVP)', status: 'Active Pilot', autonomy: 'Class B', kpi: 'Cash Conversion Cycle (Days)' },
    { id: 8, name: 'Agent 08: Reverse-Auction Procurement', tier: 'Tier 2 - Treasury', phase: 'Phase 2', status: 'In Design', autonomy: 'Class B', kpi: 'SaaS / Vendor Unit Cost Delta' },
    { id: 9, name: 'Agent 09: Tax Nexus / Cross-Border Tax', tier: 'Tier 2 - Treasury', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class C', kpi: 'Effective Tax Rate Compliance' },
    { id: 10, name: 'Agent 10: Debt Covenant Guardian', tier: 'Tier 2 - Treasury', phase: 'Phase 2', status: 'In Design', autonomy: 'Class A', kpi: 'Covenant Headroom Margin' },
    { id: 11, name: 'Agent 11: GL Reconciliation / Anomaly Detection', tier: 'Tier 2 - Treasury', phase: 'Phase 1 (MVP)', status: 'Active Pilot', autonomy: 'Class A', kpi: 'Reconciliation Automation %' },
    { id: 12, name: 'Agent 12: Cap Table / Equity Dilution', tier: 'Tier 2 - Treasury', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class D', kpi: 'Dilution Precision' },
    { id: 13, name: 'Agent 13: Depreciation / CapEx Replacement', tier: 'Tier 2 - Treasury', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class C', kpi: 'Asset Lifecycle ROI' },

    // Tier 3
    { id: 14, name: 'Agent 14: Dynamic Pricing / Elasticity', tier: 'Tier 3 - Revenue', phase: 'Phase 2', status: 'In Design', autonomy: 'Class B', kpi: 'Gross Margin Realization' },
    { id: 15, name: 'Agent 15: LTV / Churn Early Sentinel', tier: 'Tier 3 - Revenue', phase: 'Phase 1 (MVP)', status: 'Active Pilot', autonomy: 'Class A', kpi: 'Net Revenue Retention (NRR)' },
    { id: 16, name: 'Agent 16: Unit Economics / Feature ROI', tier: 'Tier 3 - Revenue', phase: 'Phase 2', status: 'In Design', autonomy: 'Class A', kpi: 'Gross Margin per Feature' },
    { id: 17, name: 'Agent 17: TAM Expansion Scout', tier: 'Tier 3 - Revenue', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class A', kpi: 'Addressable Pipeline Value' },
    { id: 18, name: 'Agent 18: Enterprise Contract Risk / SLA Sentinel', tier: 'Tier 3 - Revenue', phase: 'Phase 2', status: 'In Design', autonomy: 'Class A', kpi: 'Contractual Penalty Avoidance' },
    { id: 19, name: 'Agent 19: Sales Commission Optimizer', tier: 'Tier 3 - Revenue', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class C', kpi: 'Commission ROI / Deal Margin' },
    { id: 20, name: 'Agent 20: Collections / Recovery Orchestrator', tier: 'Tier 3 - Revenue', phase: 'Phase 2', status: 'In Design', autonomy: 'Class B', kpi: 'Delinquent AR Recovery %' },
    { id: 21, name: 'Agent 21: Headcount Productivity / Org Efficiency', tier: 'Tier 3 - Revenue', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class A', kpi: 'Revenue per Employee' },

    // Tier 4
    { id: 22, name: 'Agent 22: Red-Team Adversary', tier: 'Tier 4 - Trust', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class A', kpi: 'Vulnerability Detection Rate' },
    { id: 23, name: 'Agent 23: Epistemic / Hallucination Auditor', tier: 'Tier 4 - Trust', phase: 'Phase 1 (MVP)', status: 'Active Pilot', autonomy: 'Class A', kpi: 'Claim Verification Accuracy' },
    { id: 24, name: 'Agent 24: Cryptographic Identity / Key Custodian', tier: 'Tier 4 - Trust', phase: 'Phase 1 (MVP)', status: 'Active Pilot', autonomy: 'Class A', kpi: 'Passport Cryptographic Validity' },
    { id: 25, name: 'Agent 25: Model Drift / Calibration Monitor', tier: 'Tier 4 - Trust', phase: 'Phase 2', status: 'In Design', autonomy: 'Class A', kpi: 'Brier Calibration Score' },
    { id: 26, name: 'Agent 26: AI / Algorithmic Compliance Officer', tier: 'Tier 4 - Trust', phase: 'Phase 2', status: 'In Design', autonomy: 'Class A', kpi: 'Audit Log Integrity %' },
    { id: 27, name: 'Agent 27: Multi-Agent Collision & Deadlock Resolver', tier: 'Tier 4 - Trust', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class A', kpi: 'Consensus Resolution Latency' },
    { id: 28, name: 'Agent 28: Disaster Recovery / Sovereign Fallback', tier: 'Tier 4 - Trust', phase: 'Phase 3', status: 'Backlog', autonomy: 'Class D', kpi: 'Cold-Start RTO / RPO' },

    // Tier 5 - Planetary
    { id: 29, name: 'Agent 29: Synthetic Central Bank Currency Governor', tier: 'Tier 5 - Planetary', phase: 'Phase 4', status: 'Active Pilot', autonomy: 'Class B', kpi: 'E-SDR Basket Peg Stability & Yield' },
    { id: 30, name: 'Agent 30: Starlink Maritime AIS & Physical Twin Custodian', tier: 'Tier 5 - Planetary', phase: 'Phase 4', status: 'Active Pilot', autonomy: 'Class B', kpi: 'Orbital Geofence Escrow Precision' },
    { id: 31, name: 'Agent 31: Post-Quantum Enclave Key Shard Sentinel', tier: 'Tier 5 - Planetary', phase: 'Phase 4', status: 'Active Pilot', autonomy: 'Class A', kpi: 'ML-KEM-1024 Remote Attestation %' },
    { id: 32, name: 'Agent 32: Fiduciary AI Board DGCL Counsel', tier: 'Tier 5 - Planetary', phase: 'Phase 5', status: 'Active Pilot', autonomy: 'Class D', kpi: 'Statutory Resolution Quorum Rate' },
    { id: 33, name: 'Agent 33: Nuclear & Compute Commodity Grid Arbitrageur', tier: 'Tier 5 - Planetary', phase: 'Phase 5', status: 'Active Pilot', autonomy: 'Class B', kpi: 'MWh & PFLOPS Arbitrage Margin' }
  ];

  const filteredLayers = layerFilter === 'all' 
    ? layerComparison 
    : layerComparison.filter(l => (l.category || '').toLowerCase() === (layerFilter || '').toLowerCase());

  const filteredAgents = agentTierFilter === 'all'
    ? agentDeployment
    : agentDeployment.filter(a => (a.tier || '').toLowerCase().includes((agentTierFilter || '').toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-[#132338] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black">
              <Milestone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">ECONOS Implementation Roadmap & Architecture</h2>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-500 text-slate-950">
                  $10B Target Vision
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Rigorous separation of MVP scope vs. long-term sovereign economic infrastructure across 16 layers & 28 agents.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 bg-slate-50 text-xs font-mono">
          <button
            onClick={() => setActiveTab('phases')}
            className={`px-4 py-2.5 font-semibold rounded-t-lg transition flex items-center gap-2 border-b-2 ${
              activeTab === 'phases'
                ? 'border-amber-500 text-slate-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Milestone className="w-3.5 h-3.5 text-amber-500" />
            <span>5-Phase Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('mvp_vs_longterm')}
            className={`px-4 py-2.5 font-semibold rounded-t-lg transition flex items-center gap-2 border-b-2 ${
              activeTab === 'mvp_vs_longterm'
                ? 'border-indigo-600 text-slate-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>MVP vs. Long-Term (16 Layers)</span>
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className={`px-4 py-2.5 font-semibold rounded-t-lg transition flex items-center gap-2 border-b-2 ${
              activeTab === 'agents'
                ? 'border-emerald-600 text-slate-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
            <span>28 Agents Deployment Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('capital_flywheel')}
            className={`px-4 py-2.5 font-semibold rounded-t-lg transition flex items-center gap-2 border-b-2 ${
              activeTab === 'capital_flywheel'
                ? 'border-sky-600 text-slate-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5 text-sky-600" />
            <span>Capital Allocation & Flywheel</span>
          </button>

          {onOpenSolutions && (
            <button
              onClick={() => {
                onClose();
                onOpenSolutions();
              }}
              className="ml-auto mb-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-xs"
              title="Open the 10 Business Problem Solver & Execution Engine"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">10 Business Solutions</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                Interactive
              </span>
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">

          {/* TAB 1: 5-PHASE ROADMAP */}
          {activeTab === 'phases' && (
            <div className="space-y-6">
              {/* Phase Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {phases.map(p => (
                  <button
                    key={p.phase}
                    onClick={() => setSelectedPhase(p.phase)}
                    className={`p-3 rounded-xl text-left border transition ${
                      selectedPhase === p.phase
                        ? 'bg-[#132338] text-white border-[#132338] shadow-md'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className={selectedPhase === p.phase ? 'text-amber-400 font-bold' : 'text-slate-500 font-medium'}>
                        Phase {p.phase}
                      </span>
                      <span className={`text-[9px] px-1 rounded ${
                        p.phase === 1 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {p.phase === 1 ? 'MVP' : `${p.timeline.split(' ')[0]}`}
                      </span>
                    </div>
                    <div className="text-xs font-bold mt-1 line-clamp-1">{p.name.split(':')[1]?.trim() || p.name}</div>
                    <div className="text-[10px] mt-1 opacity-80">{p.timeline}</div>
                  </button>
                ))}
              </div>

              {/* Selected Phase Detail View */}
              {(() => {
                const cur = phases.find(p => p.phase === selectedPhase) || phases[0];
                return (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">{cur.timeline}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-mono text-slate-500">{cur.budget}</span>
                          <span className="text-slate-300">•</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {cur.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-1">{cur.name}</h3>
                        <p className="text-xs text-slate-600 mt-0.5">{cur.theme}</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right">
                        <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Target Economic Scale</div>
                        <div className="text-sm font-extrabold text-slate-900">{cur.targetScale}</div>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Core Deliverables & Architectural Milestones
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cur.keyDeliverables.map((d, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-700">
                            <span className="w-5 h-5 rounded-md bg-white border border-slate-300 flex items-center justify-center font-mono font-bold text-[10px] text-slate-700 shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Operational Boundaries */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
                        <div className="font-bold text-amber-900 font-mono text-[11px] mb-1 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-amber-600" />
                          Decision Autonomy
                        </div>
                        <p className="text-amber-800 text-[11px] leading-relaxed">{cur.decisionAutonomy}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                        <div className="font-bold text-emerald-900 font-mono text-[11px] mb-1 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          Enterprise ROI Profile
                        </div>
                        <p className="text-emerald-800 text-[11px] leading-relaxed">{cur.roiTarget}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 text-xs">
                        <div className="font-bold text-rose-900 font-mono text-[11px] mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          Safety & Failure Boundary
                        </div>
                        <p className="text-rose-800 text-[11px] leading-relaxed">{cur.failureBoundary}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Closed Loop Visual */}
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-xs font-mono font-bold text-slate-700 uppercase mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Unified Operating Loop Enforced Across All Phases
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono">
                  {['OBSERVE', 'UNDERSTAND', 'SIMULATE', 'DECIDE', 'VERIFY', 'APPROVE', 'EXECUTE', 'RECONCILE', 'LEARN'].map((step, idx, arr) => (
                    <React.Fragment key={step}>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold border border-slate-200 shadow-2xs">
                        {step}
                      </span>
                      {idx < arr.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MVP VS LONG-TERM (16 LAYERS) */}
          {activeTab === 'mvp_vs_longterm' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span>Filter by Functional Category:</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['all', 'Intelligence', 'Simulation', 'Execution', 'Trust', 'Governance'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setLayerFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                        layerFilter.toLowerCase() === cat.toLowerCase()
                          ? 'bg-[#132338] text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comparative Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 font-mono text-slate-700">
                        <th className="py-3 px-4 w-1/5 font-bold uppercase text-[11px]">System Layer</th>
                        <th className="py-3 px-4 w-2/5 font-bold uppercase text-[11px] text-emerald-800 bg-emerald-50/50">
                          MVP Scope (Now - Phase 1 & 2)
                        </th>
                        <th className="py-3 px-4 w-2/5 font-bold uppercase text-[11px] text-indigo-900 bg-indigo-50/40">
                          Long-Term Vision ($10B Scale)
                        </th>
                        <th className="py-3 px-3 font-bold uppercase text-[10px] text-center">Decision Class</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLayers.map(l => (
                        <tr key={l.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 px-4 align-top font-bold text-slate-900 font-mono text-[11px]">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              <span>{l.layer}</span>
                            </div>
                            <span className="text-[10px] font-normal text-slate-400 block mt-0.5">{l.category}</span>
                          </td>
                          <td className="py-3 px-4 align-top text-slate-700 bg-emerald-50/20 border-l border-r border-slate-100 text-[11px] leading-relaxed">
                            {l.mvp}
                          </td>
                          <td className="py-3 px-4 align-top text-slate-800 bg-indigo-50/10 text-[11px] leading-relaxed">
                            {l.longTerm}
                          </td>
                          <td className="py-3 px-3 align-top text-center font-mono font-bold text-[10px] text-slate-600 whitespace-nowrap">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                              {l.decisionClass.split(' ')[0]} {l.decisionClass.split(' ')[1]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 28 SOVEREIGN AGENTS DEPLOYMENT MATRIX */}
          {activeTab === 'agents' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Bot className="w-3.5 h-3.5 text-slate-400" />
                  <span>Filter by Agent Tier:</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['all', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'].map(tier => (
                    <button
                      key={tier}
                      onClick={() => setAgentTierFilter(tier)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                        agentTierFilter.toLowerCase() === tier.toLowerCase()
                          ? 'bg-[#132338] text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tier.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Agent Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredAgents.map(a => (
                  <div key={a.id} className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                        <span className="font-bold text-slate-700">{a.tier}</span>
                        <span className={`px-1.5 py-0.5 rounded font-bold ${
                          a.status === 'Active Pilot' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : a.status === 'In Design' 
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {a.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{a.name}</h4>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-[11px]">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-mono text-[10px] text-slate-400">Roadmap Phase:</span>
                        <span className="font-mono font-bold text-slate-800">{a.phase}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-mono text-[10px] text-slate-400">Decision Autonomy:</span>
                        <span className="font-mono font-bold text-amber-700">{a.autonomy}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-mono text-[10px] text-slate-400">Target KPI:</span>
                        <span className="font-mono font-medium text-slate-700 text-[10px]">{a.kpi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CAPITAL ALLOCATION & THE ULTIMATE FLYWHEEL */}
          {activeTab === 'capital_flywheel' && (
            <div className="space-y-6">
              {/* Capital Allocation of $50M */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Strategic $50,000,000 Capital Allocation</h3>
                    <p className="text-xs text-slate-500">Optimized distribution to scale ECONOS from MVP to $10B Institutional Market Standard.</p>
                  </div>
                  <div className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                    24-Month Runway
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Compute & Inference Cluster', amount: '$16.0M', pct: '32%', desc: 'Dedicated private GPU clusters for quant models & linear solvers' },
                    { label: 'Data & High-Freq Connectors', amount: '$11.0M', pct: '22%', desc: 'SWIFT/FedNow, SAP/Oracle direct APIs, satellite logistics telemetry' },
                    { label: 'Engineering & Quant Research', amount: '$12.0M', pct: '24%', desc: '25 senior systems safety, quant, and distributed systems engineers' },
                    { label: 'Hardware HSMs & Verification', amount: '$6.0M', pct: '12%', desc: 'FIPS 140-3 Level 4 HSMs, SOC2 Type II & formal mathematical verification' },
                    { label: 'Insurance Guarantee Backstop', amount: '$5.0M', pct: '10%', desc: 'Balance sheet liquidity underwriting Autonomous Execution Guarantee' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 font-bold uppercase">{item.pct} Share</div>
                        <div className="text-base font-extrabold text-slate-900 mt-0.5">{item.amount}</div>
                        <div className="text-xs font-bold text-slate-800 mt-1">{item.label}</div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Ultimate ECONOS Flywheel */}
              <div className="bg-gradient-to-br from-[#132338] to-[#1c3554] text-white rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  The Ultimate Economic Data & Decision Flywheel
                </div>
                <h3 className="text-lg font-bold">How Network Effects Create an Unassailable Institutional Moat</h3>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Unlike chat software or standalone analytics tools, ECONOS captures ground-truth economic feedback. Every autonomous transaction, supply-chain hedge, and pricing shift produces verified financial results in the general ledger. This proprietary Outcome Dataset continually trains the Economic World Model.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2">
                  {[
                    '1. More Enterprise Clients',
                    '2. More Economic Ledger Data',
                    '3. More Verified Decisions',
                    '4. More Real-World Outcomes',
                    '5. Proprietary Outcome Dataset',
                    '6. Continuous Model Recalibration'
                  ].map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/10 border border-white/10 text-xs font-mono font-medium">
                      <div className="text-amber-400 text-[10px] font-bold">Step 0{idx + 1}</div>
                      <div className="mt-1 text-slate-100 font-bold text-xs">{step.split('. ')[1]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Classes Summary */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <h4 className="text-xs font-mono font-bold text-slate-700 uppercase mb-3">
                  Human Governance: Decision Classification Framework
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-900 font-mono">Class A: Automatic</span>
                    <p className="text-[11px] text-emerald-800 mt-1">Reversible micro-actions (reconciliations, telemetry reads, alert routing).</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="font-bold text-blue-900 font-mono">Class B: Policy Controlled</span>
                    <p className="text-[11px] text-blue-800 mt-1">Autonomous within strict dollar limits ($5K–$50K) and predetermined covenants.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="font-bold text-amber-900 font-mono">Class C: Executive Approval</span>
                    <p className="text-[11px] text-amber-800 mt-1">Material financial decisions requiring explicit human authorization.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                    <span className="font-bold text-purple-900 font-mono">Class D: Board Authorization</span>
                    <p className="text-[11px] text-purple-800 mt-1">Capital restructuring, debt issuance, M&A, equity grants, and liquidations.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <span className="font-bold text-rose-900 font-mono">Class E: Prohibited</span>
                    <p className="text-[11px] text-rose-800 mt-1">Illegal, unverified, or hazardous operations strictly blocked by the AI Firewall.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ECONOS Closed Loop Protocol (OBSERVE → SIMULATE → DECIDE → VERIFY → EXECUTE → LEARN)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#132338] hover:bg-slate-800 text-white font-semibold transition shadow-xs text-xs"
          >
            Close Roadmap
          </button>
        </div>

      </div>
    </div>
  );
};
