import React, { useState } from 'react';
import {
  BookOpen,
  Printer,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Coins,
  Flame,
  Lock,
  Cpu,
  TrendingUp,
  FileText,
  Layers,
  ChevronRight,
  Sparkles,
  Zap,
  Globe2,
  BarChart2,
  Copy,
  Check,
  Building,
  UserCheck,
  ArrowRight,
  Eye,
  Activity
} from 'lucide-react';

export const AuraXWhitepaper: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('abstract');
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  const contractAddress = '0x6a813C3a89b6776712f7Fa4a47E1d1D45fAcE1ED';
  const deployerAddress = '0x9fF60030aC1e02E1302D3aFa6CaDf347E3fbb97A';
  const treasuryAddress = '0x095871Cfed26b28f03e409AE612c0A5F1e1726cD';

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'abstract', title: '1. Executive Abstract & Vision' },
    { id: 'founder', title: '2. Founder & Solo-Builder Track Record' },
    { id: '100-layers', title: '3. 100 Real-World Layers & The 12-Step Loop' },
    { id: 'dual-chain', title: '4. Dual-Chain Topology (Base 8453 + AuraX L1 9924)' },
    { id: 'dual-engine', title: '5. Dual-Engine Ecosystem ($AURX & USD-O)' },
    { id: 'math-burn', title: '6. Autonomous Buyback & Burn Model (30% Rev)' },
    { id: 'tokenomics', title: '7. Token Distribution & Vesting (25M Team)' },
    { id: 'architecture', title: '8. Institutional Terminal & Whale Radar' },
    { id: 'prop-desk', title: '9. Prop Trading Desk ($200K Funded Capital)' },
    { id: 'security', title: '10. Security, Sourcify & CertiK Audit Status' },
    { id: 'governance', title: '11. Governance DAO & Staking Vault (23.6% APY)' },
    { id: 'disclaimer', title: '12. Legal Disclaimers & Risk Notices' }
  ];

  const fullMarkdownWhitepaper = `# AuraX Protocol: An Autonomous Quantitative Execution & Deflationary Liquidity Engine

**Published:** September 2026 (Updated v2.1)
**Author:** AuraX Quantitative Research Group
**Base Mainnet Genesis Verified:** Block #51827528 | Chain ID: 8453
**AuraX Sovereign Layer-1:** Testnet Live | Chain ID: 9924 | 100,000+ Real TPS
**Base Contract:** 0x6a813C3a89b6776712f7Fa4a47E1d1D45fAcE1ED (Sourcify Exact Match Verified ✅)
**Audit Status:** CertiK Formal Security Audit Scheduled Q4 2026

---

## 01. Executive Abstract & Vision

Modern digital asset markets suffer from three structural failures: predatory market-making toxicity, inflationary token emission death spirals, and the complete absence of institutional-grade execution infrastructure accessible to retail participants.

AuraX Protocol ($AURX) introduces an institutional, mathematically grounded paradigm: a **zero-inflation, fixed-supply (100,000,000 $AURX)** economic network directly interconnected with a high-frequency cross-market execution terminal, institutional prop-firm desk, Whale Radar oracle intelligence, and an autonomous buyback-and-burn engine.

**Core Mission:** To engineer an enterprise-grade financial terminal where real economic activity — exchange maker/taker spreads, prop trading evaluation licenses, and delta-neutral arbitrage gains — systematically flows into market-buying and permanently removing $AURX tokens from circulation.

**The Result:** A protocol where every dollar of real revenue mathematically reduces supply. No governance votes. No discretionary burns. Pure algorithmic deflation.

---

## 02. Founder & Solo-Builder Track Record

**Founder:** Iftikhar Ahmad
**Role:** Protocol Architect & Lead Engineer
**Location:** Multan, Pakistan
**GitHub:** github.com/lovingocean

**Track Record:**
Built and deployed the following live products as a solo founder with zero venture capital:

| Product | Description | Status |
|---|---|---|
| FlowMind AI | 49-module AI business operating system | ✅ Live, paying customers |
| Nova AI | 17-agent autonomous AI employee | ✅ Live |
| ECONOS | 70+ module financial OS with AI CFO, continuous close, SOC-2 vault | ✅ Live |
| AURAX Terminal | Institutional clearing layer, $142B AUM monitored, 0.42ms latency | ✅ Operational |
| AuraX L1 Blockchain | Zero-fraud consensus with in-consensus MEV protection | ✅ Testnet live (Chain ID 9924) |
| AuraX Exchange | Real-time crypto exchange with prime brokerage desk | ✅ Operational |
| $AURX Token | ERC-20 on Base mainnet, verified, fixed 100M supply | ✅ Deployed & Verified |

**Philosophy:** Every line of code in the AuraX stack was written to solve a real institutional problem. This is not a whitepaper concept. It is operational infrastructure.

---

## 03. The 100 Real-World Layers & The 12-Step Autonomous Operating Loop

AuraX integrates with ECONOS and OMNIFIN to operate across a continuous 12-step autonomous loop:

\`\`\`
OBSERVE → UNDERSTAND → DETECT → SIMULATE → DECIDE → AUTHORIZE → EXECUTE → CLEAR → SETTLE → VERIFY → RECONCILE → MONITOR → LEARN
\`\`\`

This autonomous cognitive loop powers 100 enterprise layers:
1. **Business Layer (25 Modules):** Real-time Economic Snapshot P&L, ASC 606 revenue recognition, 3-way procure-to-pay match, AI CFO copilot, 50-scenario stress studio, 90-day cash runway, and multi-bank treasury aggregation.
2. **Wealth Layer (20 Engines):** Wealth gap diagnostics, M&A deal flow, Barbell capital allocation, 10-year digital twin net worth simulator, tax optimization, and real estate DSCR underwriting.
3. **Trust & Governance Layer (28 AI Agents & 8-Stage Firewall):** Cryptographic economic passports, 8-stage pre-execution firewall (Signature, Prompt Guard, Semantic Bounds, Policy Check, Risk Scoring, Invariant Verification, Dual-Control RBAC, and Audit Hash), and Merkle audit ledger.
4. **OMNIFIN Global Clearing Stack (27 Engines):** Proof-Carrying Transaction (PCT) rails, 0.42ms causal execution latency, $142B AUM monitored, and $18.2B netted daily.

---

## 04. Dual-Chain Topology: Base Mainnet (8453) + AuraX Sovereign L1 (9924)

AuraX utilizes a dual-chain architecture to achieve both maximum liquidity and unmatched execution throughput:

1. **Base Mainnet (Chain ID 8453):**
   - Serves as the primary public liquidity & trading venue for the $AURX ERC-20 token.
   - Interoperates with Aerodrome, Uniswap V3, and Ethereum Layer-2 DeFi ecosystems.
   - Deployed at Block #51827528 with Sourcify Exact Match Bytecode Verification.

2. **AuraX Sovereign Layer-1 (Chain ID 9924):**
   - Purpose-built high-throughput DAG-BFT blockchain engineered specifically for financial transactions.
   - 100,000+ real TPS with sub-millisecond causal finality.
   - Hardware-bound consensus (1-PC = 1-Validator) eliminating cloud bot Sybil attacks.
   - Built-in Zero-Drainer Invariant: Mathematical velocity checks intercept malicious wallet-draining attempts at consensus level.
   - Seamless two-way bridge locks $AURX on Base and mints native gas $AURX on AuraX Sovereign L1.

---

## 05. Dual-Engine Ecosystem: $AURX & USD-O

### 5.1 $AURX — Protocol Governance & Value Engine
- **Standard:** ERC-20 + ERC20Burnable on Base Mainnet (Chain ID: 8453)
- **Supply:** Strictly fixed at 100,000,000. No mint function exists. Ever.
- **Utility:**
  - 50% exchange fee discount for $AURX holders
  - Priority access to high-tier prop challenges
  - Governance voting weight proportional to vault stake
  - Whale Radar signal access (stakers only)
  - Revenue share from protocol burns (pure deflationary benefit)

### 5.2 USD-O — Institutional Settlement Unit
USD-O is a fully collateralized synthetic dollar used for:
- Clearing prop desk evaluation accounts
- Paying staking yields in stable denomination
- Funding exchange margin pools
- Cross-chain settlement without crypto volatility exposure
- 110% over-collateralization ratio maintained by autonomous rebalancing agents.

---

## 06. Mathematical Model of Autonomous Buyback & Burn

Unlike inflationary reward models, AuraX utilizes a mathematically verified deflationary sink:

\`\`\`
Q_burn(t) = ( γ × R_protocol(t) ) / P_market(t)
\`\`\`

**Where:**
- \`R_protocol(t)\` = Total gross revenue in epoch t (exchange fees + prop fees + VIP subscriptions)
- \`γ = 0.30\` = Algorithmic burn fraction (strictly 30% of gross revenue, hardcoded)
- \`P_market(t)\` = Time-Weighted Average Price (TWAP) of $AURX on Base DEX pools
- \`Q_burn(t)\` = Tokens bought from open market and burned permanently

### Deflationary Trajectory:
- **Year 1:** $1.38M Revenue → 345,000 $AURX Burned
- **Year 3:** $15M Revenue → 3,750,000 $AURX Burned
- **Year 5:** $50M Revenue → 12,500,000 $AURX Burned (12.5% Supply Destroyed)
- **Year 10:** $200M Revenue → 50,000,000 $AURX Burned (50% Supply Destroyed)

---

## 07. Token Distribution & Vesting Schedule

**Total Supply: Strictly Fixed at 100,000,000 $AURX (Immutable)**

| Allocation Category | % | Tokens | Vesting & Release Schedule |
|---|---|---|---|
| **Community Staking & Liquidity** | 30% | 30,000,000 | 4-year linear release tied to Staking Vault lockups (23.6% APY) |
| **Core Engineering & Founders** | **25%** | **25,000,000** | **10% unlocked at TGE (2.5M) for operational capital & dev runway; remaining 90% linear over 24 months (0-day cliff)** |
| **Public Launchpad & Pre-Sale** | 20% | 20,000,000 | 25% at TGE; 75% linear over 6 months |
| **Strategic Treasury & Reserves** | 15% | 15,000,000 | Multi-sig governance timelock for ecosystem expansion & cross-chain liquidity |
| **Ecosystem Grants & Market Making** | 10% | 10,000,000 | 100% unlocked at TGE for CEX/DEX bid-ask depth & initial LP pools |

*Note on Founder Allocation:* Unlike legacy projects with punitive 12-month lockup cliffs that starve early development, AuraX provides 10% at TGE to cover cloud infrastructure, validator hardware, and exchange listings, with the remainder vesting smoothly every month over 24 months.

---

## 08. Institutional Terminal Architecture

- **Latency:** 0.42ms causal execution latency
- **Venues:** Aerodrome (Base), Uniswap V3, off-chain market makers
- **Protection:** MEV-resistant order splitting across multiple venues simultaneously
- **Whale Radar Oracle:** Real-time multi-chain mempool surveillance detecting institutional accumulation patterns >$500,000 across Base, Ethereum, and Solana.

---

## 09. Prop Trading Desk

- **Evaluation Tiers:** $99 to $999 for $10,000 up to $200,000 in funded capital.
- **Profit Splits:** 80/20 to 85/15 (trader/protocol).
- **Revenue Recycling:** 30% of all evaluation fees automatically flow into the $AURX market buyback-and-burn engine.

---

## 10. Smart Contract Security, Verification & Audit Status

- **Standards:** OpenZeppelin v5.0, ERC20Burnable, EIP-2612 Permit, AccessControl RBAC
- **Sourcify Verification:** ✅ Exact Match Verified on Base Mainnet (Block #51827528)
- **BaseScan Contract:** 0x6a813C3a89b6776712f7Fa4a47E1d1D45fAcE1ED
- **Audit Status:** Formal security audit by **CertiK scheduled for Q4 2026**.

---

## 11. Governance DAO & Staking Vault

- **APY:** 23.6% (paid in USD-O stable yield derived from real protocol fees)
- **Lock Periods:** 30 days (15% APY) | 90 days (20% APY) | 365 days (23.6% APY)
- **Governance Rights:** Protocol fee adjustments, treasury grants, and new asset listings.

---

## 12. Legal Disclaimers

This document is for technical and informational purposes only. $AURX is a cryptographic utility token. Past performance is not indicative of future results. Participants must ensure local legal compliance.
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdownWhitepaper);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">AuraX Protocol Technical Whitepaper</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                v2.1 OFFICIAL SPECIFICATION
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous Quantitative Liquidity, 100-Layer Financial OS, Dual-Chain Topology &amp; Fixed 100M Deflationary Tokenomics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-sm font-mono"
            title="Copy entire whitepaper as clean Markdown"
          >
            {copiedMarkdown ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied Markdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Whitepaper</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer border border-slate-700 shadow-sm"
            title="Print or Export as PDF"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print / PDF</span>
          </button>

          <a
            href={`https://basescan.org/token/${contractAddress}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 transition shadow-md"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span>BaseScan Verified</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Layout: Sidebar TOC & Content Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Table of Contents Sticky Sidebar */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sticky top-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Table of Contents</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">12 Chapters</span>
          </div>

          <div className="space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  const el = document.getElementById(`wp-${section.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                  activeSection === section.id
                    ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="truncate">{section.title}</span>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${activeSection === section.id ? 'text-amber-400' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>

          {/* Quick Contract Snapshot Badge */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-[11px] font-mono">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-bold flex items-center justify-between">
              <span>On-Chain Genesis Specs</span>
              <span className="text-emerald-400">Live &amp; Verified</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-400">Token Ticker:</span>
              <span className="text-amber-300 font-bold">$AURX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fixed Supply:</span>
              <span className="text-emerald-400 font-bold">100,000,000 (Fixed)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Primary DEX Rail:</span>
              <span className="text-cyan-300 font-bold">Base Mainnet (8453)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sovereign Layer-1:</span>
              <span className="text-purple-300 font-bold">AuraX L1 (9924)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bytecode Verification:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Sourcify Exact Match
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Audit Status:</span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> CertiK Sched. Q4 2026
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Founder Allocation:</span>
              <span className="text-indigo-300 font-bold">25M (25%) • 0-Day Cliff</span>
            </div>
            <div className="pt-2 border-t border-slate-800 break-all text-[10px] text-slate-400">
              <span className="text-slate-500 block mb-0.5">Contract Address:</span>
              <code className="text-amber-200 select-all font-bold">{contractAddress}</code>
            </div>
            <div className="pt-1.5 border-t border-slate-800 break-all text-[10px] text-slate-400">
              <span className="text-slate-500 block mb-0.5">Protocol Treasury Vault:</span>
              <code className="text-cyan-300 select-all font-bold">{treasuryAddress}</code>
            </div>
          </div>
        </div>

        {/* Technical Whitepaper Document Body */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-12 text-slate-300 font-sans leading-relaxed shadow-xl">
          
          {/* Header Title Block */}
          <div className="border-b border-slate-800 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL PROTOCOL SPECIFICATION — v2.1 REVISION</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              AuraX Protocol: An Autonomous Quantitative Execution &amp; Deflationary Liquidity Engine
            </h1>
            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-4 font-mono">
              <span>Published: September 2026</span>
              <span>•</span>
              <span>Author: AuraX Quantitative Research Group</span>
              <span>•</span>
              <span className="text-emerald-400">Base Mainnet Genesis Verified (Block #51827528)</span>
            </div>
          </div>

          {/* Section 1 */}
          <section id="wp-abstract" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">01.</span> Executive Abstract &amp; Vision
            </h2>
            <p className="text-sm">
              Modern digital asset markets suffer from high structural fragmentation, predatory market-making toxicity, and predatory token inflation schedules. Traditional decentralized protocols rely on inflationary emissions to subsidize yields, which invariably leads to downward price spirals and long-term liquidity depletion.
            </p>
            <p className="text-sm">
              <strong>AuraX Protocol ($AURX)</strong> introduces an institutional, mathematically grounded paradigm: a zero-inflation, fixed-supply (100,000,000 $AURX) economic network directly interconnected with a high-frequency cross-market execution terminal, institutional prop-firm desk, and autonomous buyback-and-burn engine.
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Core Mission Statement
              </div>
              <p className="text-slate-400">
                To engineer an enterprise-grade financial terminal where real economic activity—exchange maker/taker spreads, prop trading evaluation licenses, and delta-neutral arbitrage gains—systematically flows into market-buying and permanently removing $AURX tokens from circulation.
              </p>
            </div>
          </section>

          {/* Section 2: Founder & Solo-Builder Track Record */}
          <section id="wp-founder" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">02.</span> Founder &amp; Solo-Builder Track Record
            </h2>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-sm font-black text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>Iftikhar Ahmad — Protocol Architect &amp; Lead Engineer</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px] block mt-0.5">
                    Location: Multan, Pakistan • GitHub: <a href="https://github.com/lovingocean" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/lovingocean</a>
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px] border border-emerald-500/20">
                  Solo Builder • Zero VC Dependency
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                AuraX was engineered entirely from first principles without predatory venture capital or multi-million dollar marketing fluff. The underlying software suite represents years of active production software development:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-amber-300">FlowMind AI:</strong> 49-module business operating system with active paying enterprise users.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-cyan-300">Nova AI:</strong> 17-agent autonomous AI employee orchestration engine.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-300">ECONOS Financial OS:</strong> 70+ modules with AI CFO, continuous close, and SOC-2 evidence vault.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-purple-300">AuraX Sovereign L1:</strong> Zero-fraud DAG-BFT consensus with in-browser validator node support.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: 100 Real-World Layers & The 12-Step Loop */}
          <section id="wp-100-layers" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">03.</span> The 100 Real-World Layers &amp; 12-Step Autonomous Loop
            </h2>
            <p className="text-sm">
              While conventional crypto tokens operate in an isolated speculative vacuum, $AURX is the native governance and settlement token for a complete 100-layer institutional operating system (ECONOS + OMNIFIN + AuraX).
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-indigo-500/30 font-mono text-xs space-y-2">
              <div className="text-amber-300 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>The 12-Step Autonomous Operating Loop:</span>
              </div>
              <div className="text-[11px] text-cyan-300 font-bold break-words leading-relaxed">
                OBSERVE → UNDERSTAND → DETECT → SIMULATE → DECIDE → AUTHORIZE → EXECUTE → CLEAR → SETTLE → VERIFY → RECONCILE → MONITOR → LEARN
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Every commercial action undergoes this continuous closed loop, ensuring zero human bottleneck, continuous real-time ledger settlement, and autonomous machine learning on every financial outcome.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-400 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> 1. Business Layer (25 Modules)
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Real-time Economic Snapshot P&amp;L, ASC 606 revenue recognition, 3-way procure-to-pay match, AI CFO copilot, 50-scenario stress studio, and continuous close.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 2. Wealth Layer (20 Engines)
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Wealth gap diagnostics, M&amp;A acquisition deal flow, Barbell capital allocation, 10-year digital twin net worth simulator, and IP royalty licensing.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-amber-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 3. Trust Layer (28 AI Agents &amp; Firewall)
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Cryptographic economic passports, 8-stage pre-execution firewall (Prompt Guard, Semantic Bounds, Invariant Check, Dual-Control RBAC), and Merkle audit ledger.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-purple-400 flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5" /> 4. OMNIFIN Global Clearing Stack
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Proof-Carrying Transaction (PCT) rails, 0.42ms causal latency, $142B AUM monitored, and $18.2B netted daily across 15 asset classes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Dual-Chain Topology */}
          <section id="wp-dual-chain" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">04.</span> Dual-Chain Topology: Base Mainnet (8453) + AuraX Sovereign L1 (9924)
            </h2>
            <p className="text-sm">
              To eliminate common misconceptions regarding chain IDs, AuraX formally implements a dual-chain architecture:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
                <div className="font-bold text-cyan-300 flex items-center justify-between">
                  <span>Base Mainnet (Chain ID 8453)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">Liquid Trading Rail</span>
                </div>
                <p className="text-slate-400 font-sans">
                  Hosts the canonical $AURX ERC-20 token (deployed at Block #51827528). Provides immediate decentralized liquidity via Aerodrome and Uniswap V3 on Ethereum Layer-2, allowing users to buy, sell, and stake with zero barrier to entry.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
                <div className="font-bold text-purple-300 flex items-center justify-between">
                  <span>AuraX Sovereign L1 (Chain ID 9924)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">Execution Settlement Rail</span>
                </div>
                <p className="text-slate-400 font-sans">
                  Hosts the dedicated DAG-BFT high-speed blockchain network capable of 100,000+ real TPS. Features silicon hardware consensus (1-PC = 1-Validator) and consensus-level anti-drainer security. Tokens bridge bi-directionally between Base and AuraX L1.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="wp-dual-engine" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">05.</span> Dual-Engine Ecosystem: $AURX &amp; USD-O
            </h2>
            <p className="text-sm">
              AuraX separates settlement from value-accrual through a complementary dual-asset framework:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-slate-300">
              <li>
                <strong className="text-amber-400">$AURX (Protocol Governance &amp; Utility Engine):</strong> Strict 100M cap ERC-20 token deployed on Base Mainnet. Grants 50% exchange fee discounts, priority access to high-tier prop challenges, and governance voting power.
              </li>
              <li>
                <strong className="text-emerald-400">USD-O (Institutional Settlement Unit):</strong> 1:1 fully collateralized synthetic dollar used for clearing prop desk accounts, paying staking yields, and funding exchange margin pools without exposure to crypto volatility.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="wp-math-burn" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">06.</span> Mathematical Model of Autonomous Buyback &amp; Burn
            </h2>
            <p className="text-sm">
              Unlike inflationary reward models, AuraX utilizes a mathematical deflationary sink governed by verified protocol revenues:
            </p>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3">
              <div className="text-slate-400">// Deflationary Quantity Equation</div>
              <div className="text-amber-300 text-sm font-bold">
                Q_burn(t) = ( &gamma; &times; R_protocol(t) ) / P_market(t)
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                Where:
                <br />• <strong>R_protocol(t)</strong> = Total gross revenue accumulated from exchange taker fees, prop firm challenge fees, and VIP terminal subscriptions in epoch t.
                <br />• <strong>&gamma; = 0.30</strong> = Algorithmic burn fraction (strictly 30% of gross protocol revenue hardcoded).
                <br />• <strong>P_market(t)</strong> = Time-Weighted Average Price (TWAP) of $AURX on Base DEX pools.
                <br />• <strong>Q_burn(t)</strong> = Total quantity of $AURX bought directly from open-market liquidity pools and routed to the burn address.
              </div>
            </div>
            <p className="text-xs text-slate-400">
              The burn function is executed on-chain via <code>executeProtocolRevenueBurn()</code> in the <code>AuraXToken.sol</code> contract, irrevocably reducing circulating supply on Base.
            </p>
          </section>

          {/* Section 7: Updated Tokenomics (25M Team, Flexible Runway) */}
          <section id="wp-tokenomics" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">07.</span> Token Distribution &amp; Vesting Schedule (Updated)
            </h2>
            <p className="text-sm">
              Total initial and maximum supply is strictly hard-coded to <strong>100,000,000 $AURX</strong>. No mint function exists beyond genesis.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">Allocation Category</th>
                    <th className="py-2.5 px-3">Percentage</th>
                    <th className="py-2.5 px-3">Total Tokens</th>
                    <th className="py-2.5 px-3">Vesting &amp; Lockup Schedule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  <tr className="bg-purple-950/20">
                    <td className="py-3 px-3 font-bold text-purple-300">Core Engineering &amp; Founders</td>
                    <td className="py-3 px-3 font-black text-white">25%</td>
                    <td className="py-3 px-3 font-black text-amber-300">25,000,000</td>
                    <td className="py-3 px-3 text-slate-300 font-sans">
                      <strong>10% unlocked at TGE (2.5M)</strong> for infrastructure &amp; operational runway; remaining 90% unlocks linearly every month over 24 months. <strong>No 1-year cliff lockout.</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">Community Staking &amp; Liquidity</td>
                    <td className="py-2.5 px-3">30%</td>
                    <td className="py-2.5 px-3">30,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">4-year linear release tied to Staking Vault lockups (23.6% APY)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-cyan-400">Public Launchpad &amp; Pre-Sale</td>
                    <td className="py-2.5 px-3">20%</td>
                    <td className="py-2.5 px-3">20,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">25% unlocked at TGE, 75% unlocked linearly over 6 months</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-400">AuraX Strategic Treasury &amp; Reserves</td>
                    <td className="py-2.5 px-3">15%</td>
                    <td className="py-2.5 px-3">15,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">Multi-sig timelock for ecosystem expansion, grants &amp; bridge liquidity</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-blue-400">Ecosystem Grants &amp; MM Provision</td>
                    <td className="py-2.5 px-3">10%</td>
                    <td className="py-2.5 px-3">10,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">100% unlocked at TGE for CEX and DEX deep bid/ask liquidity provision</td>
                  </tr>
                  <tr className="bg-slate-950 font-bold">
                    <td className="py-2.5 px-3 text-white">TOTAL VERIFIED SUPPLY</td>
                    <td className="py-2.5 px-3 text-white">100%</td>
                    <td className="py-2.5 px-3 text-emerald-400">100,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">Fixed &amp; Immutable Cap (No Minter)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <strong>Architectural Note on Founder Vesting:</strong> The previous theoretical 1-year hard cliff has been removed in v2.1. Starving the founding engineering team of operating liquidity during the first 12 months is counter-productive to network growth. Instead, releasing 10% at TGE provides working capital for server clusters, RPC endpoints, and legal licensing, while a smooth 24-month linear vesting ensures long-term economic alignment.
            </div>
          </section>

          {/* Section 8: Architecture */}
          <section id="wp-architecture" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">08.</span> Institutional Terminal Architecture &amp; Whale Radar
            </h2>
            <p className="text-sm">
              The AuraX Terminal operates an event-driven, sub-millisecond Smart Order Routing (SOR) engine designed for high-frequency traders and quantitative institutional desks:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Sub-Millisecond Smart Order Routing
                </div>
                <p className="text-slate-400">
                  Splits parent orders across deep decentralized liquidity pools (Aerodrome on Base, Uniswap V3, and off-chain market makers) to guarantee zero slippage and MEV protection.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> Whale Radar Oracle Intelligence
                </div>
                <p className="text-slate-400">
                  Surveils Base, Ethereum, and Solana mempools for accumulation blocks exceeding $500,000, broadcasting priority execution alerts directly to $AURX stakers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="wp-prop-desk" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">09.</span> Prop Trading Desk ($200K Funded Capital)
            </h2>
            <p className="text-sm">
              The protocol finances disciplined traders up to $200,000 in funded capital. Evaluation fees and platform spreads directly subsidize protocol treasury reserves.
            </p>
            <p className="text-sm">
              Crucially, <strong>30% of all evaluation challenge fees</strong> are automatically routed into the buyback-and-burn engine, permanently purchasing $AURX from Base DEX pools and burning it to address zero.
            </p>
          </section>

          {/* Section 10: Security, Verification & Audit Status */}
          <section id="wp-security" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">10.</span> Smart Contract Security, Verification &amp; Audit Status
            </h2>
            <p className="text-sm">
              The <code>AuraXToken.sol</code> contract utilizes OpenZeppelin v5.0 industry-standard libraries, inheriting:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-slate-300">
              <li><strong>ERC-20 &amp; ERC20Burnable:</strong> Standardized transfer and token destruction functionality without hidden transfer fees or blacklist traps.</li>
              <li><strong>EIP-2612 Permit:</strong> Gasless meta-transactions enabling zero-gas token approvals in high-frequency trading interfaces.</li>
              <li><strong>AccessControl (RBAC):</strong> Granular separation of administrative duties; the <code>REVENUE_BURNER_ROLE</code> is strictly isolated to the autonomous buyback contract.</li>
              <li><strong>Sourcify Exact Match Verification:</strong> Bytecode verified on Base Mainnet (Chain ID 8453) on 2026-09-26 at Block #51827528.</li>
              <li><strong>CertiK Audit Status:</strong> Full comprehensive security audit scheduled for <strong>Q4 2026</strong>. Current verification is backed by formal bytecode match on Sourcify and BaseScan.</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section id="wp-governance" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">11.</span> Governance DAO &amp; Staking Vault (23.6% APY)
            </h2>
            <p className="text-sm">
              Holders staking $AURX in the protocol vault receive voting weights on:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
              <li>1. Adjustment of protocol maker/taker fee tiers.</li>
              <li>2. Allocation of strategic treasury grants for layer-2 bridging and liquidity expansion.</li>
              <li>3. Integration of new institutional trading pairs and synthetic assets.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section id="wp-disclaimer" className="space-y-4 pt-4 border-t border-slate-800 text-slate-500 text-xs leading-relaxed">
            <h2 className="text-base font-bold text-slate-400 flex items-center gap-2">
              <span className="text-slate-500 font-mono">12.</span> Legal Disclaimers &amp; Regulatory Notices
            </h2>
            <p>
              This whitepaper is intended strictly for informational and technical documentation purposes and does not constitute financial, investment, legal, or tax advice. $AURX tokens are cryptographic utility instruments designed for platform fee discounts, governance participation, and protocol utility within the AuraX ecosystem.
            </p>
            <p>
              Cryptocurrency trading involves substantial risk of loss. Past algorithmic performance or backtested delta-neutral funding yields are not indicative of future results. Participants should ensure full compliance with their respective local jurisdictions before acquiring digital assets.
            </p>
            <div className="pt-4 text-center font-mono text-[11px] text-slate-600">
              &copy; 2026 AuraX Protocol Quantitative Research Group. All Rights Reserved.
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
