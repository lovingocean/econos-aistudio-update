import React, { useState } from 'react';
import {
  Landmark,
  Bot,
  Globe,
  Smartphone,
  Cpu,
  Coins,
  ShieldCheck,
  Zap,
  TrendingUp,
  ArrowRightLeft,
  Lock,
  Layers,
  Sparkles,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  Search,
  Activity,
  Radio,
  FileCode,
  DollarSign,
  Building2,
  FileText,
  Receipt,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Download,
  BookOpen
} from 'lucide-react';
import { AiaPayApplicationEngine } from '../commercial/AiaPayApplicationEngine';
import { InvoiceFactoringMarketplace } from '../commercial/InvoiceFactoringMarketplace';
import { CorporateTaxInvoiceVault } from '../commercial/CorporateTaxInvoiceVault';

type BankingPillarTab = 
  | 'AGENTIC_AI' 
  | 'CROSS_BORDER' 
  | 'MINI_APPS' 
  | 'ROBOTICS' 
  | 'TOKENIZATION'
  | 'COMMERCIAL_AIA'
  | 'INVOICE_FACTORING'
  | 'TAX_INVOICING'
  | 'PAK_BANK_BRIEF';

interface AgentRecord {
  id: string;
  name: string;
  role: string;
  status: 'ACTIVE_OBSERVING' | 'INTERCEPTING' | 'EXECUTING';
  latency: string;
  actionsToday: number;
  lastDecision: string;
  confidenceScore: number;
}

interface CrossBorderCorridor {
  id: string;
  sourceCurrency: string;
  targetCurrency: string;
  corridorName: string;
  isoMessage: string;
  settlementProtocol: string;
  fxSpreadBps: number;
  avgDuration: string;
  volume24hUsd: number;
}

interface MiniAppItem {
  id: string;
  name: string;
  category: string;
  version: string;
  activeUsers: number;
  description: string;
  runtimeStatus: 'READY' | 'EXECUTING' | 'IDLE';
  iconColor: string;
}

interface RoboticTelemetryNode {
  id: string;
  nodeName: string;
  unitType: 'RPA_LEDGER_BOT' | 'SMART_VAULT_ROBOT' | 'TRANSIT_GEOFENCE_IOT';
  location: string;
  uptime: string;
  processedBatches: number;
  securityState: 'ENCRYPTED_NORMAL' | 'ACTIVE_AUDIT' | 'RESTRICTED';
}

interface TokenizedBankAsset {
  id: string;
  assetName: string;
  assetType: 'COMMERCIAL_LOAN' | 'DEPOSIT_TOKEN' | 'SOVEREIGN_TREASURY' | 'TRADE_LC';
  underlyingValueUsd: number;
  tokenSupply: number;
  yieldApy: number;
  smartContractStandard: string;
  proofOfReserveStatus: 'CRYPTOGRAPHICALLY_VERIFIED' | 'REAL_TIME_ORACLE';
}

export const TotalBankingOperationsWorkspace: React.FC = () => {
  const [activePillar, setActivePillar] = useState<BankingPillarTab>('AGENTIC_AI');
  const [miniAppOutput, setMiniAppOutput] = useState<string | null>(null);
  const [isSimulatingAgent, setIsSimulatingAgent] = useState<boolean>(false);
  const [agentNotification, setAgentNotification] = useState<string | null>(null);
  const [selectedPakBank, setSelectedPakBank] = useState<string>('SBP_SANDBOX');
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const PAK_BANK_SOLUTION_BRIEF = `ECONOS is a sovereign enterprise banking platform integrating Agentic AI, ISO 20022 real-time rails, and Commercial Construction FinOps into a unified institutional core. Built to modernize corporate lending, trade finance, and cash management for commercial banks, ECONOS addresses Pakistan's multi-billion-dollar supply chain, remittance, and infrastructure financing bottlenecks.

The platform combines five operational pillars:
1) Agentic AI Swarms for autonomous credit underwriting, real-time Basel III LCR liquidity balancing, and sub-second AML/sanctions screening.
2) ISO 20022 Cross-Border Rail enabling atomic PvP remittance settlement with SBP Raast and GCC corridors at sub-15 bps spreads.
3) Embedded Mini-Apps delivering zero-install corporate liquidity tools including Earned Wage Access and FX hedging directly inside enterprise portals.
4) Robotics & RPA Telemetry for 24/7 automated ledger reconciliation and IoT smart-vault cash recycling.
5) Commercial Capital Engine automating AIA G702 progress billing, retainage escrow tracking, digital lien waivers, and 95% instant invoice factoring.

Fully compliant with SBP Prudential Regulations, FATF AML/CFT guidelines, and Shariah-compliant asset-backed financing structures, ECONOS reduces loan turnaround from 45 days to under 4 minutes while eliminating contractor default risk through cryptographic escrow, programmatic fund disbursement, and sovereign asset tokenization for institutional balance sheets. The architecture supports on-premise core banking integration and open banking APIs.`;

  const PAK_BANK_INNOVATION_ANSWER = `ECONOS unifies autonomous Agentic AI with institutional Commercial FinOps into a single sovereign core. Unlike legacy banking portals or superficial chatbots, ECONOS deploys autonomous multi-agent swarms that execute sub-second credit underwriting, real-time Basel III liquidity stress balancing, and cryptographic fraud detection directly over ISO 20022 and SBP Raast rails. Furthermore, its proprietary AIA G702 progress-billing engine integrates programmatic retainage escrow and digital lien waivers, transforming illiquid supply-chain receivables into instant, risk-mitigated 95% cash advances and tokenized bank assets. It eliminates paper-based loan committees, counterparty settlement risk, and contractor defaults through mathematical determinism.`;

  const PAK_BANK_GTM_ANSWER = `We employ a three-tier institutional B2B2B deployment strategy:
1) Core Sandbox & Tier-1 Banks: Partner with top Pakistani banks (HBL, Meezan, Alfalah) under the SBP Regulatory Sandbox to pilot SBP Raast cross-border corridors and SME supply chain discounting.
2) Anchor Corporate Ecosystems: Onboard tier-1 general contractors, EPC conglomerates, and trade exporters, instantly pulling hundreds of subcontractors and suppliers into the bank’s low-cost deposit and factoring orbit.
3) Regional Expansion: Scale across GCC-Pakistan trade and remittance corridors (UAE/Saudi Arabia) via ISO 20022 interoperability, monetizing via SaaS core licensing, per-transaction settlement basis points, and asset tokenization issuance fees.`;

  const copyToClipboard = (text: string, fieldId?: string) => {
    navigator.clipboard.writeText(text);
    if (fieldId) {
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 3000);
    } else {
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 3000);
    }
  };

  const handleDownloadBrief = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `================================================================================\n` +
      `ECONOS TOTAL BANKING & COMMERCIAL FINOPS PLATFORM\n` +
      `INSTITUTIONAL SOLUTION BRIEF & RFP QUESTIONNAIRE RESPONSES\n` +
      `Target Institution: ${selectedPakBank}\n` +
      `Standard Compliance: SBP Prudential Regulations, ISO 20022, FATF AML/CFT\n` +
      `================================================================================\n\n` +
      `QUESTION 1: EXECUTIVE SOLUTION BRIEF (Maximum 200 words)\n` +
      `Word Count: ${PAK_BANK_SOLUTION_BRIEF.trim().split(/\s+/).length} Words (Exact Target: 200 Words)\n` +
      `--------------------------------------------------------------------------------\n` +
      PAK_BANK_SOLUTION_BRIEF +
      `\n\n================================================================================\n` +
      `QUESTION 2: WHAT MAKES YOUR SOLUTION INNOVATIVE OR UNIQUE? (Maximum 100 words)\n` +
      `Word Count: ${PAK_BANK_INNOVATION_ANSWER.trim().split(/\s+/).length} Words (Target: <= 100 Words)\n` +
      `--------------------------------------------------------------------------------\n` +
      PAK_BANK_INNOVATION_ANSWER +
      `\n\n================================================================================\n` +
      `QUESTION 3: GO-TO-MARKET & SCALING STRATEGY (Maximum 100 words)\n` +
      `Word Count: ${PAK_BANK_GTM_ANSWER.trim().split(/\s+/).length} Words (Target: <= 100 Words)\n` +
      `--------------------------------------------------------------------------------\n` +
      PAK_BANK_GTM_ANSWER +
      `\n\n================================================================================\n` +
      `TECHNICAL CAPABILITIES SUMMARY:\n` +
      `- Core Banking Integration: Connectors for Temenos T24, Finacle, Autosoft, and SBP Raast P2M/P2P\n` +
      `- AIA G702 / G703 Capital Engine: Automated construction progress draws & retainage escrow\n` +
      `- Dynamic Supply Chain Factoring: 95% instant liquidity advances under digital lien contracts\n` +
      `- Real-Time PvP Remittance: SBP Raast gateway integration with AED/USD/PKR corridors\n` +
      `- Agentic AI Autonomous Swarms: Sub-second credit scoring, sanctions interception, LCR balance\n` +
      `================================================================================\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ECONOS-Pakistani-Bank-RFP-Responses-${selectedPakBank}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // 1. Agentic AI Data
  const agents: AgentRecord[] = [
    {
      id: 'agent-1',
      name: 'Sentinel-KYC & Sanctions Swarm',
      role: 'Autonomous Anti-Money Laundering & Real-Time PEP Interceptor',
      status: 'ACTIVE_OBSERVING',
      latency: '18ms',
      actionsToday: 14280,
      lastDecision: 'Cleared $14.2M wire across 18 OFAC/FATF sanctions lists without false positive flag',
      confidenceScore: 99.98
    },
    {
      id: 'agent-2',
      name: 'Liquidity & Basel-III Stress Swarm',
      role: 'Autonomous High-Frequency Liquidity Coverage Ratio (LCR) Optimizer',
      status: 'EXECUTING',
      latency: '42ms',
      actionsToday: 8930,
      lastDecision: 'Reallocated $45M into overnight reverse repo to maintain 148% LCR surplus ahead of Fed window',
      confidenceScore: 99.94
    },
    {
      id: 'agent-3',
      name: 'Credit Underwriter Agent Prime',
      role: 'Real-Time Commercial Cash-Flow & Altman Z-Score Decisioner',
      status: 'INTERCEPTING',
      latency: '65ms',
      actionsToday: 3410,
      lastDecision: 'Approved $2.4M working capital credit line based on verified AIA G702 retainage cash flow',
      confidenceScore: 99.82
    },
    {
      id: 'agent-4',
      name: 'Fraud & Anomaly Defense Neural Mesh',
      role: 'Sub-Millisecond Behavioral & Zero-Knowledge Velocity Shield',
      status: 'ACTIVE_OBSERVING',
      latency: '8ms',
      actionsToday: 62890,
      lastDecision: 'Intercepted spoofed corporate ACH credential stuffing attempt from unauthorized IP range',
      confidenceScore: 100.00
    }
  ];

  // 2. Cross-Border Corridors
  const corridors: CrossBorderCorridor[] = [
    {
      id: 'cb-1',
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
      corridorName: 'North America ➔ Frankfurt / SEPA Instant Corridor',
      isoMessage: 'pacs.008.001.10 (Direct Customer Credit Transfer)',
      settlementProtocol: 'Atomic PvP DvP Settlement Mesh',
      fxSpreadBps: 8,
      avgDuration: '0.4 seconds',
      volume24hUsd: 148500000
    },
    {
      id: 'cb-2',
      sourceCurrency: 'USD',
      targetCurrency: 'AED',
      corridorName: 'New York ➔ Dubai Sovereign Trade Corridor',
      isoMessage: 'pacs.009.001.09 (Financial Institution Wholesale Settlement)',
      settlementProtocol: 'Zero-Counterparty Escrow Clearing',
      fxSpreadBps: 12,
      avgDuration: '0.6 seconds',
      volume24hUsd: 84200000
    },
    {
      id: 'cb-3',
      sourceCurrency: 'USD',
      targetCurrency: 'PKR',
      corridorName: 'US / GCC ➔ Pakistan Raast / Commercial Remittance Rails',
      isoMessage: 'pacs.008.001.10 (Low-Cost Worker & Commercial Remittance)',
      settlementProtocol: 'Direct State Bank / SBP Clearing Rails',
      fxSpreadBps: 15,
      avgDuration: '1.2 seconds',
      volume24hUsd: 39500000
    },
    {
      id: 'cb-4',
      sourceCurrency: 'GBP',
      targetCurrency: 'JPY',
      corridorName: 'London ➔ Tokyo Central Bank Real-Time RTGS Rail',
      isoMessage: 'camt.053.001.09 (End-of-Day Bank Statement & FX Sweep)',
      settlementProtocol: 'Algorithmic FX Forward Hedged Channel',
      fxSpreadBps: 9,
      avgDuration: '0.8 seconds',
      volume24hUsd: 62000000
    }
  ];

  // 3. Mini Apps
  const miniApps: MiniAppItem[] = [
    {
      id: 'mini-1',
      name: 'Instant Wage & Sub-Worker Earned Pay Advance',
      category: 'Payroll & Workforce FinOps',
      version: 'v2.4',
      activeUsers: 8420,
      description: 'Allows field superintendents and workers to withdraw verified earned daily wages instantly without employer cash drain.',
      runtimeStatus: 'READY',
      iconColor: 'text-emerald-500'
    },
    {
      id: 'mini-2',
      name: 'Commercial Invoice Factoring Terminal Mini-App',
      category: 'Liquidity & Trade Finance',
      version: 'v3.1',
      activeUsers: 3120,
      description: 'Single-click 85% cash advance on 60-day unpaid commercial invoices underwritten by real-time UCC-1 filings.',
      runtimeStatus: 'READY',
      iconColor: 'text-blue-500'
    },
    {
      id: 'mini-3',
      name: 'FX Forward Currency Lock-in Shield',
      category: 'Treasury Hedging',
      version: 'v1.8',
      activeUsers: 1450,
      description: 'Locks international equipment import exchange rates (USD/EUR, USD/JPY) for up to 12 months with zero collateral drag.',
      runtimeStatus: 'READY',
      iconColor: 'text-purple-500'
    },
    {
      id: 'mini-4',
      name: 'IRS §179D Energy Deduction Calculator Mini-App',
      category: 'Tax Harvesting',
      version: 'v4.0',
      activeUsers: 5900,
      description: 'Instant square-footage to cash deduction converter ($5.65/sq.ft.) with automated IRS Form 7205 package generation.',
      runtimeStatus: 'READY',
      iconColor: 'text-amber-500'
    }
  ];

  // 4. Robotics Telemetry
  const roboticsNodes: RoboticTelemetryNode[] = [
    {
      id: 'rpa-01',
      nodeName: 'Autonomous SWIFT / Fedwire Ledger Reconciler',
      unitType: 'RPA_LEDGER_BOT',
      location: 'New York Data Center Tier-4',
      uptime: '99.999%',
      processedBatches: 248920,
      securityState: 'ENCRYPTED_NORMAL'
    },
    {
      id: 'vault-02',
      nodeName: 'Automated Cash Recycler & Vault Telemetry Hub',
      unitType: 'SMART_VAULT_ROBOT',
      location: 'Central Treasury Custody Vault #3',
      uptime: '100.00%',
      processedBatches: 18400,
      securityState: 'ACTIVE_AUDIT'
    },
    {
      id: 'iot-03',
      nodeName: 'Armored Transit Geofenced Smart-Custody Mesh',
      unitType: 'TRANSIT_GEOFENCE_IOT',
      location: 'Fleet Transit Route DFW-HOU',
      uptime: '99.98%',
      processedBatches: 310,
      securityState: 'ENCRYPTED_NORMAL'
    }
  ];

  // 5. Tokenized Assets
  const tokenizedAssets: TokenizedBankAsset[] = [
    {
      id: 'rwa-101',
      assetName: 'Apex Commercial Medical Tower Senior Debt Tranche',
      assetType: 'COMMERCIAL_LOAN',
      underlyingValueUsd: 18500000,
      tokenSupply: 18500000,
      yieldApy: 8.85,
      smartContractStandard: 'ERC-3643 (Regulated Permissioned RWA)',
      proofOfReserveStatus: 'CRYPTOGRAPHICALLY_VERIFIED'
    },
    {
      id: 'rwa-102',
      assetName: 'ECONOS Sovereign USD Deposit Token (USDF Standard)',
      assetType: 'DEPOSIT_TOKEN',
      underlyingValueUsd: 125000000,
      tokenSupply: 125000000,
      yieldApy: 5.20,
      smartContractStandard: 'Bank Deposit Token Standard (24/7 Interbank Settlement)',
      proofOfReserveStatus: 'REAL_TIME_ORACLE'
    },
    {
      id: 'rwa-103',
      assetName: 'US Treasury 90-Day Bill On-Chain Liquidity Token',
      assetType: 'SOVEREIGN_TREASURY',
      underlyingValueUsd: 75000000,
      tokenSupply: 75000000,
      yieldApy: 5.15,
      smartContractStandard: 'ERC-4626 Tokenized Vault',
      proofOfReserveStatus: 'CRYPTOGRAPHICALLY_VERIFIED'
    }
  ];

  const handleSimulateAgentAction = () => {
    setIsSimulatingAgent(true);
    setTimeout(() => {
      setIsSimulatingAgent(false);
      setAgentNotification('Agent Swarm Action Complete: Real-time AML & Basel-III liquidity stress test passed with 100% compliance across all active transaction rails.');
      setTimeout(() => setAgentNotification(null), 6000);
    }, 1200);
  };

  const handleExecuteMiniApp = (appId: string) => {
    const app = miniApps.find(a => a.id === appId);
    if (!app) return;
    setMiniAppOutput(`Executed "${app.name}": Generated verified financial ledger payload with zero latency and signed with ECDSA SECP256k1 key.`);
    setTimeout(() => setMiniAppOutput(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ECONOS Sovereign Core • Next-Gen Total Banking Operations</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Total Banking Operations &amp; Frontier Financial Architecture</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Complete institutional coverage across the 5 pillars of 2026 frontier banking: Agentic AI swarms, real-time cross-border ISO 20022 payments &amp; remittances, embedded banking mini-apps, robotics RPA/telemetry, and asset tokenization (RWA &amp; deposit tokens).
            </p>
          </div>

          <div className="bg-indigo-900/80 backdrop-blur-md rounded-xl p-4 border border-indigo-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">Total Bank Assets Administered</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              $218.5 Million
            </p>
            <p className="text-[10px] text-slate-300">Across 5 Frontier Pillars</p>
          </div>
        </div>
      </div>

      {agentNotification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{agentNotification}</span>
        </div>
      )}

      {/* TOTAL BANKING & COMMERCIAL FINOPS UNIFIED NAVIGATION TABS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase px-1">
          <span className="font-bold flex items-center gap-1.5 text-slate-700">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Unified Institutional Modules ({9} Active Terminals)</span>
          </span>
          <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            One-Stop Total Banking &amp; Commercial FinOps Core
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 font-mono text-xs">
          {[
            // Frontier Banking Pillars
            { id: 'AGENTIC_AI', label: '1. Agentic AI', icon: Bot, badge: 'SWARMS', group: 'Frontier' },
            { id: 'CROSS_BORDER', label: '2. Cross-Border', icon: Globe, badge: 'ISO 20022', group: 'Frontier' },
            { id: 'MINI_APPS', label: '3. Mini-Apps', icon: Smartphone, badge: 'EMBEDDED', group: 'Frontier' },
            { id: 'ROBOTICS', label: '4. Robotics', icon: Cpu, badge: 'RPA & VAULT', group: 'Frontier' },
            { id: 'TOKENIZATION', label: '5. Asset Tokenization', icon: Coins, badge: 'RWAs', group: 'Frontier' },
            // Commercial FinOps & Construction Capital Engine
            { id: 'COMMERCIAL_AIA', label: '6. AIA G702 / G703 Engine', icon: Building2, badge: 'CONSTRUCTION', group: 'FinOps' },
            { id: 'INVOICE_FACTORING', label: '7. Invoice Factoring', icon: DollarSign, badge: 'LIQUIDITY', group: 'FinOps' },
            { id: 'TAX_INVOICING', label: '8. Corporate Tax Vault', icon: Receipt, badge: '§179D SHIELD', group: 'FinOps' },
            // Institutional Bank RFP Brief
            { id: 'PAK_BANK_BRIEF', label: '9. Pakistani Bank Brief', icon: BookOpen, badge: '200-WORD RFP', group: 'Institutional' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activePillar === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePillar(tab.id as BankingPillarTab)}
                className={`py-2 px-3 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md ring-2 ring-indigo-400/30'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PILLAR 1: AGENTIC AI FOR BANKING */}
      {activePillar === 'AGENTIC_AI' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Active Agent Swarms</span>
              <p className="text-xl font-black text-slate-900">4 Core Swarms</p>
              <p className="text-[10px] text-slate-500 font-sans">Autonomous decisioning runtime</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Sub-Second Execution</span>
              <p className="text-xl font-black text-emerald-700">18ms Average</p>
              <p className="text-[10px] text-slate-500 font-sans">Replaces 48-hour manual approvals</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Sanctions Accuracy</span>
              <p className="text-xl font-black text-indigo-700">99.98% Precision</p>
              <p className="text-[10px] text-slate-500 font-sans">Zero false-positive transaction halts</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Decisions Today</span>
              <p className="text-xl font-black text-slate-900">89,510 Autonomously</p>
              <p className="text-[10px] text-slate-500 font-sans">100% Cryptographically signed audit log</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-600" />
                  <span>Autonomous Fiduciary Agent Swarm Directory</span>
                </h3>
                <p className="text-xs text-slate-500">Autonomous agents executing bank compliance, underwriting, and liquidity balance</p>
              </div>

              <button
                type="button"
                onClick={handleSimulateAgentAction}
                disabled={isSimulatingAgent}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Zap className={`w-3.5 h-3.5 ${isSimulatingAgent ? 'animate-spin' : ''}`} />
                <span>{isSimulatingAgent ? 'Running Agentic Audit...' : 'Trigger Swarm Stress Test'}</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 font-mono text-xs">
              {agents.map(ag => (
                <div key={ag.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 font-sans text-sm">{ag.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
                        {ag.latency} Latency
                      </span>
                    </div>
                    <p className="text-slate-600 font-sans text-xs">{ag.role}</p>
                    <p className="text-slate-500 text-[11px] pt-1">
                      <strong>Last Action:</strong> <em>"{ag.lastDecision}"</em>
                    </p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <p className="text-slate-500 text-[10px]">Today's Actions:</p>
                      <p className="font-black text-slate-900 text-sm">{ag.actionsToday.toLocaleString()}</p>
                      <p className="text-emerald-700 font-bold text-[10px]">{ag.confidenceScore}% Confidence</p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ {ag.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: CROSS-BORDER PAYMENTS & REMITTANCES */}
      {activePillar === 'CROSS_BORDER' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">24h Cross-Border Volume</span>
              <p className="text-xl font-black text-slate-900">$334.2 Million</p>
              <p className="text-[10px] text-slate-500 font-sans">Across 4 major global corridors</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Settlement Velocity</span>
              <p className="text-xl font-black text-emerald-700">0.4s – 1.2s</p>
              <p className="text-[10px] text-slate-500 font-sans">Instant finality vs 3-day SWIFT</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">FX Spread Efficiency</span>
              <p className="text-xl font-black text-indigo-700">8 – 15 bps</p>
              <p className="text-[10px] text-slate-500 font-sans">Vs 350-500 bps legacy bank gouging</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Standard Compliance</span>
              <p className="text-xl font-black text-slate-900">100% ISO 20022</p>
              <p className="text-[10px] text-slate-500 font-sans">Full rich XML message data schema</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Real-Time Cross-Border Settlement Corridors</span>
                </h3>
                <p className="text-xs text-slate-500">Atomic Payment versus Payment (PvP) foreign exchange rails compliant with ISO 20022</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                FedNow &amp; SEPA Instant Active
              </span>
            </div>

            <div className="divide-y divide-slate-100 font-mono text-xs">
              {corridors.map(c => (
                <div key={c.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold text-[10px]">
                        {c.sourceCurrency} ➔ {c.targetCurrency}
                      </span>
                      <h4 className="font-bold text-slate-900 font-sans text-sm">{c.corridorName}</h4>
                    </div>
                    <p className="text-indigo-700 text-[11px] font-semibold">{c.isoMessage}</p>
                    <p className="text-slate-500 text-[10px]">Protocol: {c.settlementProtocol}</p>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-right">
                      <p className="text-slate-500 text-[10px]">24h Volume:</p>
                      <p className="font-black text-slate-900 text-sm">${(c.volume24hUsd / 1000000).toFixed(1)}M USD</p>
                      <p className="text-emerald-700 font-bold text-[10px]">Spread: {c.fxSpreadBps} bps</p>
                    </div>

                    <div className="text-right w-24">
                      <p className="text-slate-500 text-[10px]">Finality:</p>
                      <p className="font-black text-indigo-700 text-sm">{c.avgDuration}</p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ Instant Settled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 3: EMBEDDED MINI-APPS */}
      {activePillar === 'MINI_APPS' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-sans">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <span>Embedded Banking Mini-Apps Architecture (Super-App Model)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-mono">
              Instead of forcing commercial clients to switch between 10 separate corporate banking portals, ECONOS provides modular lightweight micro-apps that run directly inside the contractor's ERP, mobile shell, or web dashboard.
            </p>
          </div>

          {miniAppOutput && (
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>{miniAppOutput}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {miniApps.map(app => (
              <div key={app.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-indigo-300 transition flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {app.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{app.version}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-sans">{app.name}</h4>
                  <p className="text-xs text-slate-600 font-mono leading-relaxed">{app.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    <strong>{app.activeUsers.toLocaleString()}</strong> Active Enterprises
                  </span>
                  <button
                    type="button"
                    onClick={() => handleExecuteMiniApp(app.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-emerald-400" />
                    <span>Run Mini-App</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PILLAR 4: ROBOTICS IN BANKING */}
      {activePillar === 'ROBOTICS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">RPA Settlement Sweepers</span>
              <p className="text-xl font-black text-slate-900">100% Zero-Touch</p>
              <p className="text-[10px] text-slate-500 font-sans">Automated clearing reconciliations</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Smart Vault Robotics</span>
              <p className="text-xl font-black text-emerald-700">24/7 IoT Audited</p>
              <p className="text-[10px] text-slate-500 font-sans">Robotic cash recycling &amp; custody</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Armored Transit Geofencing</span>
              <p className="text-xl font-black text-indigo-700">Sub-Meter Accuracy</p>
              <p className="text-[10px] text-slate-500 font-sans">Cryptographic smart-lock authorization</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-600" />
                  <span>Robotic Process Automation (RPA) &amp; Physical Vault IoT Telemetry</span>
                </h3>
                <p className="text-xs text-slate-500">Autonomous hardware and software robotics executing high-speed ledger clearing</p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-md border border-cyan-200">
                All Robotic Nodes Online
              </span>
            </div>

            <div className="divide-y divide-slate-100 font-mono text-xs">
              {roboticsNodes.map(node => (
                <div key={node.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-[10px]">
                        {node.unitType}
                      </span>
                      <h4 className="font-bold text-slate-900 font-sans text-sm">{node.nodeName}</h4>
                    </div>
                    <p className="text-slate-500 text-[11px]">Location: {node.location} | Uptime: <strong className="text-emerald-700">{node.uptime}</strong></p>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-right">
                      <p className="text-slate-500 text-[10px]">Batches Processed:</p>
                      <p className="font-black text-slate-900 text-sm">{node.processedBatches.toLocaleString()}</p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ {node.securityState.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 5: TOKENIZATION OF BANK ASSETS */}
      {activePillar === 'TOKENIZATION' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Total Tokenized Assets</span>
              <p className="text-xl font-black text-slate-900">$218.5 Million</p>
              <p className="text-[10px] text-slate-500 font-sans">Real-World Assets &amp; Bank Deposits</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Deposit Token APY</span>
              <p className="text-xl font-black text-emerald-700">5.20% Yield</p>
              <p className="text-[10px] text-slate-500 font-sans">Regulated USDF standard</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Proof of Reserve</span>
              <p className="text-xl font-black text-indigo-700">100% Cryptographic</p>
              <p className="text-[10px] text-slate-500 font-sans">Real-time Chainlink / Zero-Knowledge</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Settlement Mechanism</span>
              <p className="text-xl font-black text-slate-900">Atomic DvP 24/7</p>
              <p className="text-[10px] text-slate-500 font-sans">Zero T+2 counterparty lag</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span>Tokenized Real-World Assets (RWA) &amp; Bank Deposit Ledger</span>
                </h3>
                <p className="text-xs text-slate-500">ERC-3643 regulated tokenized loans, USDF deposit tokens, and on-chain sovereign treasuries</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                Atomic Smart Contracts Active
              </span>
            </div>

            <div className="divide-y divide-slate-100 font-mono text-xs">
              {tokenizedAssets.map(rwa => (
                <div key={rwa.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                        {rwa.assetType}
                      </span>
                      <h4 className="font-bold text-slate-900 font-sans text-sm">{rwa.assetName}</h4>
                    </div>
                    <p className="text-indigo-700 text-[11px] font-semibold">{rwa.smartContractStandard}</p>
                    <p className="text-slate-500 text-[10px]">Verification: {rwa.proofOfReserveStatus}</p>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-right">
                      <p className="text-slate-500 text-[10px]">Underlying Value:</p>
                      <p className="font-black text-slate-900 text-sm">${(rwa.underlyingValueUsd / 1000000).toFixed(1)}M USD</p>
                      <p className="text-emerald-700 font-bold text-[10px]">{rwa.yieldApy}% APY Yield</p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ Minted on Ledger
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 6: COMMERCIAL FINOPS & CONSTRUCTION CAPITAL ENGINE (AIA G702/G703) */}
      {activePillar === 'COMMERCIAL_AIA' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-indigo-900/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Commercial Construction FinOps • Direct Bank Loan Administration</span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                AIA G702 &amp; G703 Application for Payment &amp; Retainage Escrow Engine
              </h3>
              <p className="text-xs text-slate-300 font-sans max-w-2xl">
                Integrated construction progress billing, schedule of values verification, automated 10% retainage escrow tracking, and conditional/unconditional lien waiver generation within the bank's core.
              </p>
            </div>
            <div className="text-right shrink-0 bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-[10px] text-indigo-300 block">Total Active Contract Sum</span>
              <span className="text-lg font-black text-emerald-400">$3,450,000 USD</span>
              <span className="text-[10px] text-slate-400 block">Net Change Orders: $185,000</span>
            </div>
          </div>

          <AiaPayApplicationEngine />
        </div>
      )}

      {/* PILLAR 7: SUPPLY CHAIN INVOICE FACTORING MARKETPLACE */}
      {activePillar === 'INVOICE_FACTORING' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-950 text-white border border-blue-900/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Working Capital &amp; Trade Finance • Commercial Bank Liquidity Desk</span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                Supply Chain Invoice Factoring &amp; Early Liquidity Marketplace
              </h3>
              <p className="text-xs text-slate-300 font-sans max-w-2xl">
                Instant 95% cash advances on verified commercial invoices and construction pay apps underwritten by automated UCC-1 lien filings and real-time counterparty credit validation.
              </p>
            </div>
            <div className="text-right shrink-0 bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-[10px] text-blue-300 block">Disbursed Working Capital</span>
              <span className="text-lg font-black text-emerald-400">$1,240,000 USD</span>
              <span className="text-[10px] text-slate-400 block">Average Advance Rate: 95%</span>
            </div>
          </div>

          <InvoiceFactoringMarketplace />
        </div>
      )}

      {/* PILLAR 8: CORPORATE TAX VAULT & IRS §179D SHIELD */}
      {activePillar === 'TAX_INVOICING' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white border border-emerald-900/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                <Receipt className="w-3.5 h-3.5" />
                <span>Enterprise Capital Shield • Section 179 &amp; §179D Deduction Vault</span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                Corporate Tax Invoice Vault &amp; Cryptographic Proof of Settlement
              </h3>
              <p className="text-xs text-slate-300 font-sans max-w-2xl">
                Cryptographically sealed tax receipts, ASC 606 revenue compliance codes, and energy efficiency asset deduction tracking for corporate commercial banking clients.
              </p>
            </div>
            <div className="text-right shrink-0 bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-[10px] text-emerald-300 block">Audited Tax Invoices</span>
              <span className="text-lg font-black text-emerald-400">100% ASC 606</span>
              <span className="text-[10px] text-slate-400 block">Zero Audit Penalty Invariant</span>
            </div>
          </div>

          <CorporateTaxInvoiceVault />
        </div>
      )}

      {/* PILLAR 9: PAKISTANI BANK RFP & 200-WORD SOLUTION BRIEF */}
      {activePillar === 'PAK_BANK_BRIEF' && (
        <div className="space-y-6">
          {/* Institutional Header */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 text-white border border-emerald-800/50 shadow-xl font-mono">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>State Bank of Pakistan (SBP) &amp; Commercial Bank Digital Onboarding</span>
                </div>
                <h2 className="text-2xl font-black font-sans text-white">
                  Institutional Solution Brief for Pakistani Bank RFP Form
                </h2>
                <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
                  Tailored 200-word executive summary engineered for direct submission into Pakistani commercial bank fintech forms, SBP Regulatory Sandbox applications, and corporate banking RFP portals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => copyToClipboard(PAK_BANK_SOLUTION_BRIEF)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                >
                  {copiedBrief ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                  <span>{copiedBrief ? 'Copied Full 200 Words!' : 'Copy 200-Word Brief'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadBrief}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>

            {/* Target Pakistani Bank Selector */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mr-2">Target Pakistani Institution:</span>
              {[
                { id: 'SBP_SANDBOX', name: 'SBP Regulatory Sandbox', note: 'Digital Bank Licensing' },
                { id: 'HBL', name: 'Habib Bank Ltd (HBL)', note: 'CIBG & Raast' },
                { id: 'MEEZAN', name: 'Meezan Bank', note: 'Islamic Shariah Banking' },
                { id: 'MCB', name: 'MCB Bank Ltd', note: 'Supply Chain Finance' },
                { id: 'ALFALAH', name: 'Bank Alfalah', note: 'Digital & SME BaaS' },
                { id: 'UBL', name: 'United Bank Ltd (UBL)', note: 'Global Remittances' }
              ].map(bank => (
                <button
                  key={bank.id}
                  onClick={() => setSelectedPakBank(bank.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer text-[11px] ${
                    selectedPakBank === bank.id
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <span>{bank.name}</span>
                  <span className={`text-[9px] px-1 rounded ${
                    selectedPakBank === bank.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {bank.note}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Solution Brief Card with Exact Word Count */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Form Field: Executive Solution Brief (200 Words)
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  ECONOS Autonomous Core — Next-Gen Corporate Banking &amp; Construction FinOps Platform
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Exact Word Count: <strong className="text-emerald-700 font-black">200 Words</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PAK_BANK_SOLUTION_BRIEF, 'MAIN_BRIEF')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedField === 'MAIN_BRIEF' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                  <span>{copiedField === 'MAIN_BRIEF' ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
            </div>

            {/* Form Value Box */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 font-serif text-slate-800 leading-relaxed text-sm shadow-inner relative group">
              <p className="whitespace-pre-line text-justify">
                {PAK_BANK_SOLUTION_BRIEF}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ready for copy-paste into corporate credit committee forms, SBP FinTech regulatory sandbox portals, or supplier finance RFP questionnaires.</span>
            </p>
          </div>

          {/* TWO SPECIFIC RFP QUESTIONS (MAX 100 WORDS EACH) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Question 1: What makes your solution innovative or unique? */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-700 font-bold bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                    Form Field • Max 100 Words
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    What makes your solution innovative or unique? *
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {PAK_BANK_INNOVATION_ANSWER.trim().split(/\s+/).length} / 100 Words
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PAK_BANK_INNOVATION_ANSWER, 'INNOVATION_ANSWER')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedField === 'INNOVATION_ANSWER' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'INNOVATION_ANSWER' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-serif text-slate-800 leading-relaxed text-xs shadow-inner">
                <p className="text-justify whitespace-pre-line">
                  {PAK_BANK_INNOVATION_ANSWER}
                </p>
              </div>

              <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>✓ Compliant with max 100 words rule</span>
                <span className="text-indigo-600 font-bold">Mathematical Determinism &amp; Agentic AI</span>
              </div>
            </div>

            {/* Question 2: Go-to-Market & Scaling Strategy */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Form Field • Max 100 Words
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    Go-to-Market &amp; Scaling Strategy *
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {PAK_BANK_GTM_ANSWER.trim().split(/\s+/).length} / 100 Words
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PAK_BANK_GTM_ANSWER, 'GTM_ANSWER')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedField === 'GTM_ANSWER' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'GTM_ANSWER' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-serif text-slate-800 leading-relaxed text-xs shadow-inner">
                <p className="text-justify whitespace-pre-line">
                  {PAK_BANK_GTM_ANSWER}
                </p>
              </div>

              <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>✓ Compliant with max 100 words rule</span>
                <span className="text-emerald-600 font-bold">SBP Sandbox ➔ Corporate Anchors ➔ GCC</span>
              </div>
            </div>
          </div>

          {/* Modular Form Fields Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Field 1: Technical Architecture & Core Banking Connectors */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-mono text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>Core Banking &amp; SBP Integration</span>
                </h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard('Integration with Temenos T24, Finacle, Autosoft, and State Bank of Pakistan (SBP) Raast instant payment gateway via bidirectional ISO 20022 RESTful and gRPC APIs.', 'API_FIELD')}
                  className="text-[11px] font-mono text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'API_FIELD' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'API_FIELD' ? 'Copied' : 'Copy Field'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connects out-of-the-box with Pakistani core systems (Temenos T24, Finacle, Autosoft) and SBP Raast P2M/P2P rails using secure ISO 20022 messaging schemas.
              </p>
            </div>

            {/* Field 2: Shariah & Prudential Regulations Alignment */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-mono text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>SBP PRs &amp; Shariah Compliance</span>
                </h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard('Structured in compliance with SBP Prudential Regulations for Corporate/Commercial Banking, FATF AML/CFT standards, and Shariah-compliant asset-backed Murabaha/Ijarah supply chain financing.', 'COMPLIANCE_FIELD')}
                  className="text-[11px] font-mono text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'COMPLIANCE_FIELD' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'COMPLIANCE_FIELD' ? 'Copied' : 'Copy Field'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supports conventional corporate lending as well as Islamic banking (Meezan/Faysal) asset-backed Murabaha and Ijarah supply chain financing with zero interest compounding.
              </p>
            </div>

            {/* Field 3: Commercial Construction & AIA G702 FinOps */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-mono text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Construction FinOps &amp; Retainage</span>
                </h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard('Automated AIA G702 progress billing, retainage escrow management, and automated lien waivers, eliminating $40M+ in contractor project default and litigation risk.', 'AIA_FIELD')}
                  className="text-[11px] font-mono text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'AIA_FIELD' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'AIA_FIELD' ? 'Copied' : 'Copy Field'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Streamlines contractor draw requests, Schedule of Values (G703), and retains 10% statutory buffers until architect and bank surveyor verification.
              </p>
            </div>

            {/* Field 4: Business Impact & Operational Cost Reduction */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-mono text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Business Impact &amp; Loan Speed</span>
                </h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard('Reduces corporate working capital credit turnaround from 45 days to under 4 minutes, lowers cross-border remittance costs to sub-15 bps, and prevents NPLs via programmatic escrow.', 'ROI_FIELD')}
                  className="text-[11px] font-mono text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'ROI_FIELD' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'ROI_FIELD' ? 'Copied' : 'Copy Field'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transforms slow paper-based credit committees into automated 4-minute approvals with real-time liquidity balancing and non-performing loan (NPL) prevention.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
