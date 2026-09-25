import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  ShieldAlert, 
  Network, 
  Brain, 
  Globe2, 
  Activity, 
  Compass, 
  Cpu,
  Layers,
  Sparkles,
  Send,
  Hash,
  Target,
  DollarSign,
  AlertOctagon, 
  Shield,
  Lock,
  Coins,
  Anchor,
  Building2,
  Landmark,
  Satellite,
  Scale,
  Zap,
  Rocket,
  CloudRain,
  Gavel,
  Dna,
  RotateCcw,
  Eye,
  Mountain,
  Truck,
  Radio,
  PhoneCall,
  Calculator,
  FileCheck2
} from 'lucide-react';
import { AppLayer } from '../../types/econos';

export type ActiveLayer = AppLayer;

interface LayerNavigationProps {
  currentLayer?: AppLayer;
  activeLayer?: AppLayer;
  onSelectLayer: (layer: AppLayer) => void;
  pendingApprovalsCount?: number;
  openIncidentsCount?: number;
}

export const LayerNavigation: React.FC<LayerNavigationProps> = ({
  currentLayer,
  activeLayer,
  onSelectLayer,
  pendingApprovalsCount = 0,
  openIncidentsCount = 0
}) => {
  const selected = currentLayer || activeLayer || 'BUSINESS';
  const [activeGroup, setActiveGroup] = useState<
    | 'CORE_OS' 
    | 'V2_STRATEGIC' 
    | 'SOVEREIGN_INFRA' 
    | 'PLANETARY_SYSTEMS' 
    | 'CIVILIZATIONAL_FRONTIER' 
    | 'OMNI_SINGULARITY'
    | 'ENTERPRISE_SYNTHETICS'
    | 'INSTITUTIONAL_TAX_PE'
    | 'EXTENDED_100_MATRIX'
  >(
    selected === 'LAYER_62_RD_TAX_CREDIT' || selected === 'LAYER_62' || selected.startsWith('LAYER_6') || selected.startsWith('LAYER_7')
      ? 'INSTITUTIONAL_TAX_PE'
      : (selected.startsWith('LAYER_4') || selected.startsWith('LAYER_5'))
      ? 'ENTERPRISE_SYNTHETICS'
      : selected === 'EXTENDED_LAYERS_WORKSPACE' || selected.startsWith('LAYER_')
      ? 'EXTENDED_100_MATRIX'
      : ['OMNI_TELEMETRY_BUS', 'OMNI_CLEARING_MESH', 'OMNI_MINERAL_TITLE', 'OMNI_LEGAL_SYNTHESIS', 'OMNI_POWER_GRID', 'OMNI_CREDIT_MATRIX', 'OMNI_ROBOTIC_LABOR', 'OMNI_INTENT_TRANSLATION', 'OMNI_QUANTUM_CITADEL', 'OMNI_CIVILIZATION_ANCHOR'].includes(selected)
      ? 'OMNI_SINGULARITY'
      : ['RELATIVISTIC_LIGHT_CONE', 'GEOENGINEERING_DERIVATIVE', 'POST_HUMAN_ENTERPRISE', 'BIOLOGICAL_NEUROMORPHIC_GRID', 'KARDASHEV_OMEGA_PROTOCOL'].includes(selected)
      ? 'CIVILIZATIONAL_FRONTIER'
      : ['SYNTHETIC_CENTRAL_BANK', 'ORBITAL_ESCROW', 'POST_QUANTUM_ENCLAVE', 'FIDUCIARY_GOVERNANCE', 'COMPUTE_ENERGY_GRID'].includes(selected)
      ? 'PLANETARY_SYSTEMS'
      : ['AUTONOMOUS_EXECUTION', 'DECISION_LEDGER', 'OUTCOME_LEARNING', 'CAPITAL_NETWORK', 'P2P_CLEARING', 'WAR_ROOM', 'ZK_TRADE_CLEARANCE', 'RWA_REPO_MARKET', 'MACRO_HEDGE_SYNTH', 'CAPITAL_MA_OPTIMIZER'].includes(selected)
      ? 'SOVEREIGN_INFRA'
      : ['ECONOMIC_BRAIN', 'GLOBAL_NETWORK', 'SIMULATOR', 'EXECUTIVE', 'MODEL_REGISTRY'].includes(selected)
      ? 'V2_STRATEGIC'
      : 'CORE_OS'
  );

  useEffect(() => {
    if (selected === 'LAYER_62_RD_TAX_CREDIT' || selected === 'LAYER_62' || selected.startsWith('LAYER_6') || selected.startsWith('LAYER_7')) {
      setActiveGroup('INSTITUTIONAL_TAX_PE');
    } else if (selected.startsWith('LAYER_4') || selected.startsWith('LAYER_5')) {
      setActiveGroup('ENTERPRISE_SYNTHETICS');
    } else if (selected === 'EXTENDED_LAYERS_WORKSPACE' || selected.startsWith('LAYER_')) {
      setActiveGroup('EXTENDED_100_MATRIX');
    } else if (['OMNI_TELEMETRY_BUS', 'OMNI_CLEARING_MESH', 'OMNI_MINERAL_TITLE', 'OMNI_LEGAL_SYNTHESIS', 'OMNI_POWER_GRID', 'OMNI_CREDIT_MATRIX', 'OMNI_ROBOTIC_LABOR', 'OMNI_INTENT_TRANSLATION', 'OMNI_QUANTUM_CITADEL', 'OMNI_CIVILIZATION_ANCHOR'].includes(selected)) {
      setActiveGroup('OMNI_SINGULARITY');
    } else if (['RELATIVISTIC_LIGHT_CONE', 'GEOENGINEERING_DERIVATIVE', 'POST_HUMAN_ENTERPRISE', 'BIOLOGICAL_NEUROMORPHIC_GRID', 'KARDASHEV_OMEGA_PROTOCOL'].includes(selected)) {
      setActiveGroup('CIVILIZATIONAL_FRONTIER');
    } else if (['SYNTHETIC_CENTRAL_BANK', 'ORBITAL_ESCROW', 'POST_QUANTUM_ENCLAVE', 'FIDUCIARY_GOVERNANCE', 'COMPUTE_ENERGY_GRID'].includes(selected)) {
      setActiveGroup('PLANETARY_SYSTEMS');
    } else if (['AUTONOMOUS_EXECUTION', 'DECISION_LEDGER', 'OUTCOME_LEARNING', 'CAPITAL_NETWORK', 'P2P_CLEARING', 'WAR_ROOM', 'ZK_TRADE_CLEARANCE', 'RWA_REPO_MARKET', 'MACRO_HEDGE_SYNTH', 'CAPITAL_MA_OPTIMIZER'].includes(selected)) {
      setActiveGroup('SOVEREIGN_INFRA');
    } else if (['ECONOMIC_BRAIN', 'GLOBAL_NETWORK', 'SIMULATOR', 'EXECUTIVE', 'MODEL_REGISTRY'].includes(selected)) {
      setActiveGroup('V2_STRATEGIC');
    } else {
      setActiveGroup('CORE_OS');
    }
  }, [selected]);

  const coreLayers = [
    {
      id: 'OMNIFIN' as AppLayer,
      name: '⚡ OMNIFIN Global Layer',
      subtitle: 'State + Intelligence + Clearing + Settlement',
      question: '15 Asset Classes • 14 Surfaces • Proof-Carrying Rail',
      icon: Globe2,
      color: 'sky',
      badge: 'GLOBAL OS'
    },
    {
      id: 'SOVEREIGN_COMMAND' as AppLayer,
      name: 'Ω. Sovereign Command',
      subtitle: 'Concept C 4-Quadrant Institutional Mission Architecture',
      question: 'Synthetic Reserves • Planetary Map • §41 ASC Tax • Merkle Engine',
      icon: Compass,
      color: 'amber',
      badge: '4-QUADRANT OS'
    },
    {
      id: 'BUSINESS' as AppLayer,
      name: '1. Business',
      subtitle: 'FinOps, AI CFO, P2P, RevRec, Close & Audit',
      question: 'P2P 3-Way Match • ASC 606 • Continuous Close • SOC-2',
      icon: Briefcase,
      color: 'amber'
    },
    {
      id: 'CLIENT_ACQUISITION' as AppLayer,
      name: 'Client Acquisition',
      subtitle: 'Maps Scraper • Outbound Email • Voice Agent',
      question: 'Automated Lead Harvest • Roadmap Dispatch • Phone Calls',
      icon: PhoneCall,
      color: 'emerald',
      badge: 'MAPS + CALLS'
    },
    {
      id: 'WEALTH' as AppLayer,
      name: '2. Wealth',
      subtitle: '20 Interconnected Engines & Twin',
      question: 'Highest-leverage wealth actions?',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      id: 'TRUST' as AppLayer,
      name: '3. Trust',
      subtitle: '28 Agents, AI Firewall & Passports',
      question: 'What AI can I safely authorize to act?',
      icon: ShieldAlert,
      color: 'indigo',
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Approvals` : undefined,
      alert: openIncidentsCount > 0
    },
    {
      id: 'GRAPH' as AppLayer,
      name: 'Economic Graph',
      subtitle: 'Cross-Layer Relational Fabric',
      question: 'People • Assets • Agents • Outcomes',
      icon: Network,
      color: 'purple'
    }
  ];

  const v2StrategicLayers = [
    {
      id: 'ECONOMIC_BRAIN' as AppLayer,
      name: 'Economic Brain',
      subtitle: '12-Stage Master Orchestrator',
      question: 'Dynamic teams, conflict arbitration & decision packages',
      icon: Brain,
      color: 'amber'
    },
    {
      id: 'GLOBAL_NETWORK' as AppLayer,
      name: 'Global Network',
      subtitle: '8-Tier Graph & Counterparty Twins',
      question: 'Multi-hop ripple propagation & EEP-v2.1 protocol',
      icon: Globe2,
      color: 'purple'
    },
    {
      id: 'SIMULATOR' as AppLayer,
      name: 'Global Simulator',
      subtitle: '14 Macro Shocks & Experiments',
      question: '10,000 Monte Carlo paths & Outcome Ledger loop',
      icon: Activity,
      color: 'sky'
    },
    {
      id: 'EXECUTIVE' as AppLayer,
      name: 'Executive Command',
      subtitle: '7 Strategic Questions & M&A',
      question: 'C-Suite briefing & 16-stage M&A Agent 03 pipeline',
      icon: Compass,
      color: 'indigo'
    },
    {
      id: 'MODEL_REGISTRY' as AppLayer,
      name: 'Model Registry',
      subtitle: 'Calibrated Models & Marketplace',
      question: 'Agent 25 drift monitoring & certified modules',
      icon: Cpu,
      color: 'teal'
    }
  ];

  const sovereignLayers = [
    {
      id: 'AUTONOMOUS_EXECUTION' as AppLayer,
      name: '11. Execution',
      subtitle: 'Direct Banking & ERP Rails',
      question: 'FedNow • ISO 20022 • Rollback Protocols',
      icon: Send,
      color: 'emerald'
    },
    {
      id: 'DECISION_LEDGER' as AppLayer,
      name: '12. Decision Ledger',
      subtitle: 'Cryptographic Institutional Memory',
      question: 'SHA-256 Merkle blocks • SOX 404 Proofs',
      icon: Hash,
      color: 'amber'
    },
    {
      id: 'OUTCOME_LEARNING' as AppLayer,
      name: '13. Outcome Learning',
      subtitle: 'Bayesian Recalibration Engine',
      question: 'Brier Scores • 30/60/90d GL Reconciliation',
      icon: Target,
      color: 'purple'
    },
    {
      id: 'CAPITAL_NETWORK' as AppLayer,
      name: '14. Capital Network',
      subtitle: '$100M Sovereign Guarantee Pool',
      question: 'Underwritten Risk • Liquidity Syndication',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      id: 'P2P_CLEARING' as AppLayer,
      name: '14B. P2P Clearing Mesh',
      subtitle: 'Multilateral Netting Rails',
      question: 'Cross-Tenant Netting • Zero Banking Float',
      icon: Network,
      color: 'emerald'
    },
    {
      id: 'ZK_TRADE_CLEARANCE' as AppLayer,
      name: '15. ZK Trade & Tax',
      subtitle: 'ZK-SNARK Transfer Pricing & OECD',
      question: 'Zero-Leakage Proofs • Pillar Two 15% Floor',
      icon: Lock,
      color: 'emerald'
    },
    {
      id: 'RWA_REPO_MARKET' as AppLayer,
      name: '16. RWA & Repo Market',
      subtitle: 'Tokenized Receivables & SOFR',
      question: 'Intra-Day Liquidity • Tri-Party Repo Rails',
      icon: Coins,
      color: 'teal'
    },
    {
      id: 'MACRO_HEDGE_SYNTH' as AppLayer,
      name: '17. Macro & Geopolitics',
      subtitle: 'Autonomous Micro-Hedging',
      question: 'Delta Neutral FX/Commodities • Chokepoint Reroutes',
      icon: Anchor,
      color: 'sky'
    },
    {
      id: 'CAPITAL_MA_OPTIMIZER' as AppLayer,
      name: '18. Capital & M&A Engine',
      subtitle: 'WACC & Synthetic M&A Roll-Up',
      question: 'Covenant Firewalls • Algorithmic Synergies',
      icon: Building2,
      color: 'purple'
    },
    {
      id: 'WAR_ROOM' as AppLayer,
      name: '19. War Room',
      subtitle: 'Crisis & Systemic Defense Console',
      question: 'DEFCON Playbooks • Sovereign Air-Gap Mode',
      icon: AlertOctagon,
      color: 'red'
    }
  ];

  const planetaryLayers = [
    {
      id: 'SYNTHETIC_CENTRAL_BANK' as AppLayer,
      name: '22. Central Bank',
      subtitle: 'E-SDR Basket & Discount Window',
      question: 'Gold & Bond Reserves • Lender of Last Resort',
      icon: Landmark,
      color: 'emerald'
    },
    {
      id: 'ORBITAL_ESCROW' as AppLayer,
      name: '23. Orbital Escrow',
      subtitle: 'Physical Twin & Satellite IoT',
      question: 'Starlink Telemetry • Auto-Release Geofences',
      icon: Satellite,
      color: 'sky'
    },
    {
      id: 'POST_QUANTUM_ENCLAVE' as AppLayer,
      name: '24. Post-Quantum Enclave',
      subtitle: 'Kyber / Dilithium & Air-Gap Mesh',
      question: 'NIST Level-5 • AMD SEV-SNP Silicon Shards',
      icon: Lock,
      color: 'purple'
    },
    {
      id: 'FIDUCIARY_GOVERNANCE' as AppLayer,
      name: '25. Fiduciary AI Board',
      subtitle: 'DGCL §141 & 190-Nation Filings',
      question: '7-Seat AI Board Quorum • SEC Form 8-K / CSRD',
      icon: Scale,
      color: 'teal'
    },
    {
      id: 'COMPUTE_ENERGY_GRID' as AppLayer,
      name: '26. Compute & Energy',
      subtitle: 'FLOP Forwards & Nuclear PPAs',
      question: 'Megawatt Locational Arb • GPU Spot Yields',
      icon: Zap,
      color: 'amber'
    }
  ];

  const frontierLayers = [
    {
      id: 'RELATIVISTIC_LIGHT_CONE' as AppLayer,
      name: '27. Relativistic Rails',
      subtitle: 'Spacetime Causal Minkowski DAG',
      question: 'Earth-Moon-Mars • Light-Lag Reconciler',
      icon: Rocket,
      color: 'indigo'
    },
    {
      id: 'GEOENGINEERING_DERIVATIVE' as AppLayer,
      name: '28. Climate Derivatives',
      subtitle: 'Stratospheric & AMOC Swaps',
      question: 'Sensor Feeds • Instant Catastrophe Pools',
      icon: CloudRain,
      color: 'teal'
    },
    {
      id: 'POST_HUMAN_ENTERPRISE' as AppLayer,
      name: '29. Post-Human Enterprise',
      subtitle: 'Zero-Employee Sovereign DAOs',
      question: 'Delaware DSTs • Sub-Second Arbitration Courts',
      icon: Gavel,
      color: 'purple'
    },
    {
      id: 'BIOLOGICAL_NEUROMORPHIC_GRID' as AppLayer,
      name: '30. Bio-Compute & Wetware',
      subtitle: 'Organoids & Synthetic DNA Vaults',
      question: '99.98% Lower Energy • Synaptic Forwards',
      icon: Dna,
      color: 'emerald'
    },
    {
      id: 'KARDASHEV_OMEGA_PROTOCOL' as AppLayer,
      name: '31. Kardashev Omega',
      subtitle: 'Civilizational Continuity Rails',
      question: '1B-Yr Sapphire Vaults • Caloric Jubilee Reset',
      icon: RotateCcw,
      color: 'amber'
    }
  ];

  const omniSingularityLayers = [
    {
      id: 'OMNI_TELEMETRY_BUS' as AppLayer,
      name: '32. Earth Sensory Bus',
      subtitle: 'Real-time SAR, Maritime AIS & Ports',
      question: 'Physical State Ingestion • Zero Asymmetry',
      icon: Eye,
      color: 'indigo'
    },
    {
      id: 'OMNI_CLEARING_MESH' as AppLayer,
      name: '33. Sovereign Clearing',
      subtitle: 'FedNow, SWIFT ISO20022 & TARGET2',
      question: 'Atomic Multilateral Netting • $90B/Day',
      icon: Send,
      color: 'emerald'
    },
    {
      id: 'OMNI_MINERAL_TITLE' as AppLayer,
      name: '34. Crust & Cadastre',
      subtitle: 'Lithium, Rare Earths & Water Rights',
      question: 'Planetary Geology • Tokenized Concessions',
      icon: Mountain,
      color: 'amber'
    },
    {
      id: 'OMNI_LEGAL_SYNTHESIS' as AppLayer,
      name: '35. 195-Nation Law',
      subtitle: 'Statutory Codes & Sub-Second Arbitration',
      question: 'Delaware, Swiss & DIFC Autonomous Charters',
      icon: Scale,
      color: 'purple'
    },
    {
      id: 'OMNI_POWER_GRID' as AppLayer,
      name: '36. Baseload Grid',
      subtitle: 'SMR Nuclear, HVDC & Geothermal',
      question: 'Compute Arbitrage • 4,512 MW Baseload',
      icon: Zap,
      color: 'amber'
    },
    {
      id: 'OMNI_CREDIT_MATRIX' as AppLayer,
      name: '37. Credit Matrix',
      subtitle: 'Pre-Cognitive 90-Day Default Detection',
      question: 'Systemic Contagion Hedging • Dynamic Shorts',
      icon: ShieldAlert,
      color: 'rose'
    },
    {
      id: 'OMNI_ROBOTIC_LABOR' as AppLayer,
      name: '38. Robotic Labor',
      subtitle: 'Autonomous Haulers & Gantry Cranes',
      question: 'Machine Wallets • Task Micro-Settlement',
      icon: Truck,
      color: 'blue'
    },
    {
      id: 'OMNI_INTENT_TRANSLATION' as AppLayer,
      name: '39. Thought to Action',
      subtitle: 'Semantic Mandates to Smart Contracts',
      question: 'Natural Language Execution • Zero Overhead',
      icon: Sparkles,
      color: 'indigo'
    },
    {
      id: 'OMNI_QUANTUM_CITADEL' as AppLayer,
      name: '40. Quantum Citadel',
      subtitle: 'Kyber-1024 & Lattice Zero-Knowledge',
      question: '50-Year Quantum Immunity • Mathematical Proof',
      icon: Lock,
      color: 'cyan'
    },
    {
      id: 'OMNI_CIVILIZATION_ANCHOR' as AppLayer,
      name: '41. Civilization Epoch',
      subtitle: 'Sapphire Memory & Caloric Anchors',
      question: 'Cataclysm Reboot Rails • Algorithmic Jubilee',
      icon: RotateCcw,
      color: 'amber'
    }
  ];

  const enterpriseSyntheticsLayers = [
    {
      id: 'LAYER_42_SYNTHETIC_BALANCE_SHEET' as AppLayer,
      name: '42. Balance Sheet Sculptor',
      subtitle: 'Working Capital Rebalancing & Debt Optimization',
      question: 'Reduce WACC 120-250 bps • Eliminate Cash Drag',
      icon: TrendingUp,
      color: 'amber'
    },
    {
      id: 'LAYER_43_TREASURY_SWEEPER' as AppLayer,
      name: '43. Treasury Sweeper',
      subtitle: 'Zero-Balance Overnight Sweeper',
      question: 'SOFR Yield Maximizer • $35K-$140K Interest Gains',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      id: 'LAYER_44_WORKING_CAPITAL_REBALANCE' as AppLayer,
      name: '44. Working Capital Rebalance',
      subtitle: 'DSO vs DPO Dynamic Compression',
      question: 'Cash Conversion Cycle -18 Days • Free Up Liquidity',
      icon: Activity,
      color: 'indigo'
    },
    {
      id: 'LAYER_45_MULTICURRENCY_FX' as AppLayer,
      name: '45. Multi-Currency FX Engine',
      subtitle: 'Cross-Border Wholesale Corridor',
      question: 'Zero Spread Netting • Cut 1.5-3.0% FX Fees',
      icon: Globe2,
      color: 'cyan'
    },
    {
      id: 'LAYER_46_SUPPLY_CHAIN_FIREWALL' as AppLayer,
      name: '46. Supply Chain Firewall',
      subtitle: 'Dual-Sourcing Logistics Interceptor',
      question: 'Prevent Factory Stoppages • Automated PO Reroute',
      icon: Shield,
      color: 'rose'
    },
    {
      id: 'LAYER_47_VENDOR_DISCOUNT_CAPTURE' as AppLayer,
      name: '47. Vendor Discount Capture',
      subtitle: '2/10 Net 30 Early Payment Yield',
      question: '36.7% Annualized Risk-Free IRR on Cash',
      icon: Coins,
      color: 'emerald'
    },
    {
      id: 'LAYER_48_SUB_TIER_INSOLVENCY' as AppLayer,
      name: '48. Sub-Tier Insolvency Radar',
      subtitle: 'Tier 2/3 Distress Detection',
      question: '60-90 Day Advance Supplier Default Warning',
      icon: AlertOctagon,
      color: 'amber'
    },
    {
      id: 'LAYER_49_VAT_GST_ARBITRAGE' as AppLayer,
      name: '49. VAT/GST Reclaim Rails',
      subtitle: 'Automated 13th Directive Reclaims',
      question: '100% Cross-Border Tax Recovery • $240K+ Salvaged',
      icon: Scale,
      color: 'blue'
    },
    {
      id: 'LAYER_50_SOVEREIGN_DEBT_SWAP' as AppLayer,
      name: '50. Debt Swap Engine',
      subtitle: 'Debt-for-Equity & Restructuring',
      question: '30-50% Interest Burden Cut • Covenant Relief',
      icon: Landmark,
      color: 'purple'
    },
    {
      id: 'LAYER_51_ABCP_CONDUIT' as AppLayer,
      name: '51. ABCP Conduit',
      subtitle: 'Asset-Backed Commercial Paper',
      question: 'SOFR + 45 bps Mid-Market Borrowing Facility',
      icon: Building2,
      color: 'indigo'
    },
    {
      id: 'LAYER_52_DYNAMIC_PRICE_ELASTICITY' as AppLayer,
      name: '52. Dynamic Pricing Matrix',
      subtitle: 'Real-Time Margin Optimization',
      question: '+240-480 bps Gross Margin Expansion',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      id: 'LAYER_53_SAAS_RIGHTSIZING' as AppLayer,
      name: '53. SaaS License Sentinel',
      subtitle: 'Ghost Seat Deprovisioning',
      question: 'Instant 20-35% Cloud & Software Cost Cut',
      icon: Cpu,
      color: 'cyan'
    },
    {
      id: 'LAYER_54_HEADCOUNT_PRODUCTIVITY' as AppLayer,
      name: '54. Labor Allocator',
      subtitle: 'Revenue per Employee Optimization',
      question: '+25-40% Rev/FTE Margin Lift',
      icon: Target,
      color: 'purple'
    },
    {
      id: 'LAYER_55_INSURANCE_UNDERWRITING' as AppLayer,
      name: '55. Insurance Underwriting',
      subtitle: 'D&O & Cyber Risk Reverse Auction',
      question: '18-30% Commercial Premium Reduction',
      icon: Shield,
      color: 'blue'
    },
    {
      id: 'LAYER_56_CARBON_TOKENIZATION' as AppLayer,
      name: '56. Carbon Credit Tokenizer',
      subtitle: 'Scope 1/2/3 Offset Registry',
      question: 'Monetize Net-Zero Milestones into Tradeable Cash',
      icon: Sparkles,
      color: 'emerald'
    },
    {
      id: 'LAYER_57_ASC_606_REV_REC' as AppLayer,
      name: '57. ASC 606 RevRec Pipeline',
      subtitle: 'Deferred Revenue Waterfall',
      question: 'Zero Restatement Risk • Audit-Ready Schedules',
      icon: Hash,
      color: 'amber'
    },
    {
      id: 'LAYER_58_PHANTOM_STOCK_CLEARING' as AppLayer,
      name: '58. Inventory Clearinghouse',
      subtitle: 'Dead Stock Secondary B2B Auctions',
      question: 'Liberate 40-70% Cash from Locked Warehouses',
      icon: Truck,
      color: 'indigo'
    },
    {
      id: 'LAYER_59_SEC_CONTINUOUS_AUDIT' as AppLayer,
      name: '59. Continuous SEC/IFRS Audit',
      subtitle: 'Automated 10-K/10-Q & XBRL Engine',
      question: 'Audit Prep Reduced from 8 Weeks to 48 Hours',
      icon: Landmark,
      color: 'purple'
    },
    {
      id: 'LAYER_60_PATENT_SHIELD' as AppLayer,
      name: '60. Patent & IP Shield',
      subtitle: 'Prior Art Scanner & Collateralizer',
      question: 'Patent Valuation & Defensive Litigation Moat',
      icon: Lock,
      color: 'cyan'
    },
    {
      id: 'LAYER_61_PE_LBO_OPTIMIZER' as AppLayer,
      name: '61. PE LBO & Covenant Engine',
      subtitle: 'Leveraged Buyout Waterfall & Return IRR',
      question: 'Target 28.4% IRR with Zero Covenant Default',
      icon: Compass,
      color: 'emerald'
    }
  ];

  const taxAndPeLayers = [
    {
      id: 'LAYER_62_RD_TAX_CREDIT' as AppLayer,
      name: '62. R&D Tax Credit (§41)',
      subtitle: 'IRC §41, §3111(f) & Form 6765',
      question: '$50K-$500K+ Cash Refund or Payroll Offset',
      icon: Calculator,
      color: 'amber',
      badge: 'REQUESTED L62'
    },
    {
      id: 'LAYER_63_OPPORTUNITY_ZONE' as AppLayer,
      name: '63. Opportunity Zones & §1031',
      subtitle: 'QOF 10-Year 0% Capital Gain Elimination',
      question: '100% Tax Elimination on 10-Year Qualified Assets',
      icon: Building2,
      color: 'emerald'
    },
    {
      id: 'LAYER_64_QSBS_MULTIPLIER' as AppLayer,
      name: '64. QSBS Multiplier (§1202)',
      subtitle: '$10M / 10x Basis Exclusion Stacking',
      question: 'Save $2.38M+ Tax per Shareholder on Exit',
      icon: Coins,
      color: 'indigo'
    },
    {
      id: 'LAYER_65_PTET_SALT_OPTIMIZER' as AppLayer,
      name: '65. PTET SALT Workaround',
      subtitle: '36-State Pass-Through Entity Tax',
      question: 'Bypass $10K SALT Cap • Save $30K-$120K/Partner',
      icon: Scale,
      color: 'purple'
    },
    {
      id: 'LAYER_66_TRANSFER_PRICING_APA' as AppLayer,
      name: '66. Transfer Pricing APA',
      subtitle: 'OECD BEPS 2.0 & Economic Substance',
      question: 'Eliminate §482 Double Taxation & Audits',
      icon: Globe2,
      color: 'cyan'
    },
    {
      id: 'LAYER_67_PE_CARVEOUT_INTEGRATION' as AppLayer,
      name: '67. PE Carve-Out Rails',
      subtitle: 'TSA Billing & Standalone Separation',
      question: 'Cut Carve-Out Timeline 6 Months • Save $1.2M',
      icon: Network,
      color: 'rose'
    },
    {
      id: 'LAYER_72_COST_SEGREGATION_179D' as AppLayer,
      name: '72. Cost Segregation (§179D)',
      subtitle: 'Accelerated Building Depreciation',
      question: '$150K-$600K Year-1 Real Estate Deductions',
      icon: Landmark,
      color: 'emerald'
    },
    {
      id: 'LAYER_74_ESOP_TRANSITION' as AppLayer,
      name: '74. ESOP Transition Engine',
      subtitle: 'IRC §1042 Tax-Free Founder Sale',
      question: '0% Capital Gains to Founder • 100% Tax-Exempt Co',
      icon: Target,
      color: 'amber'
    },
    {
      id: 'LAYER_75_CAPTIVE_INSURANCE' as AppLayer,
      name: '75. Captive Insurance (§831b)',
      subtitle: 'Micro-Captives & Reinsurance Shield',
      question: 'Shelter $2.8M/Yr Pre-Tax with 0% Underwriting Tax',
      icon: Shield,
      color: 'blue'
    }
  ];

  const currentLayersList = 
    activeGroup === 'CORE_OS' 
      ? coreLayers 
      : activeGroup === 'V2_STRATEGIC' 
      ? v2StrategicLayers 
      : activeGroup === 'PLANETARY_SYSTEMS'
      ? planetaryLayers
      : activeGroup === 'CIVILIZATIONAL_FRONTIER'
      ? frontierLayers
      : activeGroup === 'OMNI_SINGULARITY'
      ? omniSingularityLayers
      : activeGroup === 'ENTERPRISE_SYNTHETICS'
      ? enterpriseSyntheticsLayers
      : activeGroup === 'INSTITUTIONAL_TAX_PE'
      ? taxAndPeLayers
      : activeGroup === 'EXTENDED_100_MATRIX'
      ? [...enterpriseSyntheticsLayers, ...taxAndPeLayers]
      : sovereignLayers;

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200/80 rounded-2xl p-2 shadow-xs space-y-2">
      
      {/* Group Toggle Header */}
      <div className="flex items-center justify-between px-2 pt-1 border-b border-slate-100 pb-2">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => {
              setActiveGroup('CORE_OS');
              if (!['BUSINESS', 'WEALTH', 'TRUST', 'GRAPH'].includes(selected)) {
                onSelectLayer('BUSINESS');
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'CORE_OS'
                ? 'bg-[#132338] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Foundational OS (L1-4)</span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('V2_STRATEGIC');
              if (!['ECONOMIC_BRAIN', 'GLOBAL_NETWORK', 'SIMULATOR', 'EXECUTIVE', 'MODEL_REGISTRY'].includes(selected)) {
                onSelectLayer('ECONOMIC_BRAIN');
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'V2_STRATEGIC'
                ? 'bg-[#132338] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Strategic Expansion (L5-9)</span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('SOVEREIGN_INFRA');
              if (!['AUTONOMOUS_EXECUTION', 'DECISION_LEDGER', 'OUTCOME_LEARNING', 'CAPITAL_NETWORK', 'P2P_CLEARING', 'WAR_ROOM', 'ZK_TRADE_CLEARANCE', 'RWA_REPO_MARKET', 'MACRO_HEDGE_SYNTH', 'CAPITAL_MA_OPTIMIZER'].includes(selected)) {
                onSelectLayer('AUTONOMOUS_EXECUTION');
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'SOVEREIGN_INFRA'
                ? 'bg-[#132338] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-300" />
            <span>Sovereign Rails &amp; Defense (L11-19)</span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('PLANETARY_SYSTEMS');
              if (!['SYNTHETIC_CENTRAL_BANK', 'ORBITAL_ESCROW', 'POST_QUANTUM_ENCLAVE', 'FIDUCIARY_GOVERNANCE', 'COMPUTE_ENERGY_GRID'].includes(selected)) {
                onSelectLayer('SYNTHETIC_CENTRAL_BANK');
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'PLANETARY_SYSTEMS'
                ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-sky-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-purple-300" />
            <span>Planetary Grid (L22-26)</span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('CIVILIZATIONAL_FRONTIER');
              if (!['RELATIVISTIC_LIGHT_CONE', 'GEOENGINEERING_DERIVATIVE', 'POST_HUMAN_ENTERPRISE', 'BIOLOGICAL_NEUROMORPHIC_GRID', 'KARDASHEV_OMEGA_PROTOCOL'].includes(selected)) {
                onSelectLayer('RELATIVISTIC_LIGHT_CONE');
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'CIVILIZATIONAL_FRONTIER'
                ? 'bg-gradient-to-r from-amber-600 via-rose-600 to-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-amber-300" />
            <span>Civilizational Frontier (L27-31)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 text-[9px] font-mono font-bold">
              5 FRONTIER
            </span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('OMNI_SINGULARITY');
              if (!['OMNI_TELEMETRY_BUS', 'OMNI_CLEARING_MESH', 'OMNI_MINERAL_TITLE', 'OMNI_LEGAL_SYNTHESIS', 'OMNI_POWER_GRID', 'OMNI_CREDIT_MATRIX', 'OMNI_ROBOTIC_LABOR', 'OMNI_INTENT_TRANSLATION', 'OMNI_QUANTUM_CITADEL', 'OMNI_CIVILIZATION_ANCHOR'].includes(selected)) {
                onSelectLayer('OMNI_TELEMETRY_BUS');
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'OMNI_SINGULARITY'
                ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border border-amber-400/40 ring-1 ring-amber-400/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Omni-Access (L32-41)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] font-mono font-bold">
              10 OMNI
            </span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('ENTERPRISE_SYNTHETICS');
              if (!selected.startsWith('LAYER_4') && !selected.startsWith('LAYER_5')) {
                onSelectLayer('LAYER_42_SYNTHETIC_BALANCE_SHEET');
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'ENTERPRISE_SYNTHETICS'
                ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-700 text-white shadow-md border border-cyan-400/40'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Enterprise (L42-61)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-300 text-[9px] font-mono font-bold">
              20 LAYERS
            </span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('INSTITUTIONAL_TAX_PE');
              if (selected !== 'LAYER_62_RD_TAX_CREDIT' && selected !== 'LAYER_62') {
                onSelectLayer('LAYER_62_RD_TAX_CREDIT');
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'INSTITUTIONAL_TAX_PE'
                ? 'bg-gradient-to-r from-amber-700 via-emerald-800 to-slate-900 text-white shadow-md border border-amber-400/50 ring-1 ring-amber-400/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-amber-300" />
            <span>Tax &amp; PE (L62-75)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/40 text-[9px] font-mono font-bold">
              ⭐ L62 R&amp;D
            </span>
          </button>

          <button
            onClick={() => {
              setActiveGroup('EXTENDED_100_MATRIX');
              onSelectLayer('EXTENDED_LAYERS_WORKSPACE');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeGroup === 'EXTENDED_100_MATRIX' || selected === 'EXTENDED_LAYERS_WORKSPACE'
                ? 'bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white shadow-md border border-purple-400/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-300" />
            <span>100-Layer Sovereign Matrix</span>
            <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold">
              ALL 100
            </span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400 hidden xl:block">
          {activeGroup === 'CORE_OS' 
            ? 'Operating System Runtime Core' 
            : activeGroup === 'V2_STRATEGIC'
            ? 'Network-Level Orchestration & Intelligence'
            : activeGroup === 'PLANETARY_SYSTEMS'
            ? 'Synthetic Central Bank, Orbital IoT Escrow, PQC Enclave & FLOP Energy Grid'
            : activeGroup === 'CIVILIZATIONAL_FRONTIER'
            ? 'Relativistic Minkowski DAG, Geoengineering Swaps, Zero-Employee DAOs, Bio-Compute & Omega Protocol'
            : activeGroup === 'OMNI_SINGULARITY'
            ? 'Omni-Access: Earth Telemetry, RTGS Clearing, Subsurface Cadastre, 195-Nation Law & Post-Quantum Citadels'
            : activeGroup === 'ENTERPRISE_SYNTHETICS'
            ? 'Layers 42–61: Balance Sheet Sculptor, SOFR Sweeper, FX Corridor, RevRec Waterfall & LBO Optimizer'
            : activeGroup === 'INSTITUTIONAL_TAX_PE'
            ? 'Layers 62–75: IRC §41 R&D Credits, QOF §1031, QSBS §1202, PTET & Captive Insurance'
            : activeGroup === 'EXTENDED_100_MATRIX'
            ? 'All 100 Autonomous Sovereign Layers: Full Operational Matrix & Deep Space Infrastructure'
            : 'Autonomous Banking Rails, Cryptographic Ledger & War-Room Defense'}
        </div>
      </div>

      {/* 100-Layer Master Quick Status & Jump Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-slate-50/90 rounded-xl border border-slate-200/80 text-[11px] font-mono text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-800">100 Sovereign Layers Fully Operational (Tiers 1–9)</span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-500 hidden sm:inline">
            Active: {
              activeGroup === 'CORE_OS' ? 'Tier 1 Foundational (L1–4)' : 
              activeGroup === 'V2_STRATEGIC' ? 'Tier 2 Strategic (L5–9)' : 
              activeGroup === 'SOVEREIGN_INFRA' ? 'Tier 3 Sovereign Rails (L11–19)' : 
              activeGroup === 'PLANETARY_SYSTEMS' ? 'Tier 4 Planetary Grid (L22–26)' : 
              activeGroup === 'CIVILIZATIONAL_FRONTIER' ? 'Tier 5 Civilizational Frontier (L27–31)' : 
              activeGroup === 'OMNI_SINGULARITY' ? 'Tier 6 Omni-Access (L32–41)' :
              activeGroup === 'ENTERPRISE_SYNTHETICS' ? 'Tier 7 Enterprise Synthetics (L42–61)' :
              activeGroup === 'INSTITUTIONAL_TAX_PE' ? 'Tier 8 Tax & Private Equity (L62–75)' :
              'Tier 9 Complete 100-Layer Sovereign Matrix'
            }
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <button
            onClick={() => {
              setActiveGroup('CORE_OS');
              onSelectLayer('SOVEREIGN_COMMAND');
            }}
            className="px-2.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold border border-amber-500/40 transition flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <span>Ω Concept C Dashboard</span>
          </button>
          <button
            onClick={() => {
              setActiveGroup('ENTERPRISE_SYNTHETICS');
              onSelectLayer('LAYER_42_SYNTHETIC_BALANCE_SHEET');
            }}
            className="px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <span>⚡ Check Layers 42–61</span>
          </button>
          <button
            onClick={() => {
              setActiveGroup('INSTITUTIONAL_TAX_PE');
              onSelectLayer('LAYER_62_RD_TAX_CREDIT');
            }}
            className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 transition flex items-center gap-1 cursor-pointer ring-1 ring-amber-400/40"
          >
            <span>🏛️ Check Layer 62 (R&amp;D Tax)</span>
          </button>
          <button
            onClick={() => {
              setActiveGroup('EXTENDED_100_MATRIX');
              onSelectLayer('EXTENDED_LAYERS_WORKSPACE');
            }}
            className="px-2 py-0.5 rounded bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-purple-950 font-bold border border-purple-300 transition flex items-center gap-1 cursor-pointer"
          >
            <span>🌐 100-Layer Grid</span>
          </button>
        </div>
      </div>

      {/* Layer Pills */}
      <div className="flex space-x-1 sm:space-x-2.5 overflow-x-auto py-1 no-scrollbar">
        {currentLayersList.map((layer) => {
          const Icon = layer.icon;
          const isActive = selected === layer.id;

          return (
            <button
              key={layer.id}
              id={`tab-${(layer?.id || '').toLowerCase()}`}
              onClick={() => onSelectLayer(layer.id)}
              className={`flex-1 min-w-[180px] text-left p-3 rounded-xl border transition relative ${
                isActive
                  ? 'bg-white border-slate-300 shadow-sm ring-1 ring-slate-900/5'
                  : 'bg-slate-50/80 hover:bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? layer.color === 'amber'
                          ? 'text-amber-600'
                          : layer.color === 'emerald'
                          ? 'text-emerald-600'
                          : layer.color === 'indigo'
                          ? 'text-indigo-600'
                          : layer.color === 'sky'
                          ? 'text-sky-600'
                          : layer.color === 'teal'
                          ? 'text-teal-600'
                          : layer.color === 'red'
                          ? 'text-red-600'
                          : 'text-purple-600'
                        : 'text-slate-400'
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-wider font-mono ${
                      isActive ? 'text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    {layer.name}
                  </span>
                </div>

                {'badge' in layer && layer.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {String(layer.badge)}
                  </span>
                )}
              </div>

              <div className="text-[11px] text-slate-600 font-medium truncate">{layer.subtitle}</div>
              <div className="text-[10px] font-mono text-slate-400 italic mt-0.5 truncate">
                "{layer.question}"
              </div>

              {isActive && (
                <div
                  className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${
                    layer.color === 'amber'
                      ? 'bg-amber-500'
                      : layer.color === 'emerald'
                      ? 'bg-emerald-600'
                      : layer.color === 'indigo'
                      ? 'bg-indigo-600'
                      : layer.color === 'sky'
                      ? 'bg-sky-500'
                      : layer.color === 'teal'
                      ? 'bg-teal-500'
                      : layer.color === 'red'
                      ? 'bg-red-600'
                      : 'bg-purple-600'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};
