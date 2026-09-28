import React, { useState } from 'react';
import {
  BookOpen,
  Download,
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
  BarChart2
} from 'lucide-react';

export const AuraXWhitepaper: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('abstract');

  const contractAddress = '0x6a813C3a89b6776712f7Fa4a47E1d1D45fAcE1ED';
  const deployerAddress = '0x9fF60030aC1e02E1302D3aFa6CaDf347E3fbb97A';

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'abstract', title: '1. Executive Abstract & Vision' },
    { id: 'architecture', title: '2. Institutional Terminal Architecture' },
    { id: 'dual-engine', title: '3. Dual-Engine Ecosystem ($AURX & USD-O)' },
    { id: 'math-burn', title: '4. Autonomous Buyback & Burn Equations' },
    { id: 'tokenomics', title: '5. Token Distribution & Vesting Schedule' },
    { id: 'prop-desk', title: '6. Prop Trading & Whale Radar Intelligence' },
    { id: 'security', title: '7. Smart Contract Security & Formal Verification' },
    { id: 'governance', title: '8. Governance DAO & Staking Yield' },
    { id: 'disclaimer', title: '9. Legal Disclaimers & Regulatory Notices' }
  ];

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
                v1.0.4 OFFICIAL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              The Architecture of Autonomous Quantitative Liquidity, Deflationary Mechanics &amp; Cross-Market Prop Trading
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer border border-slate-700 shadow-sm"
            title="Print or Export as PDF"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print / Save as PDF</span>
          </button>
          <a
            href={`https://basescan.org/token/${contractAddress}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 transition shadow-md"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span>BaseScan Verified Contract</span>
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
            <span className="text-[10px] text-emerald-400 font-mono">9 Chapters</span>
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
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-[11px] font-mono">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-bold">On-Chain Genesis Specs</div>
            <div className="flex justify-between">
              <span className="text-slate-400">Token Ticker:</span>
              <span className="text-amber-300 font-bold">$AURX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fixed Supply:</span>
              <span className="text-emerald-400 font-bold">100,000,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Network:</span>
              <span className="text-cyan-300 font-bold">Base Mainnet (8453)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sourcify Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Exact Match
              </span>
            </div>
            <div className="pt-2 border-t border-slate-800 break-all text-[10px] text-slate-400">
              <span className="text-slate-500 block mb-0.5">Contract Address:</span>
              <code className="text-amber-200 select-all font-bold">{contractAddress}</code>
            </div>
            <div className="pt-1.5 border-t border-slate-800 break-all text-[10px] text-slate-400">
              <span className="text-slate-500 block mb-0.5">Protocol Treasury Vault:</span>
              <code className="text-cyan-300 select-all font-bold">0x095871Cfed26b28f03e409AE612c0A5F1e1726cD</code>
            </div>
          </div>
        </div>

        {/* Technical Whitepaper Document Body */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-12 text-slate-300 font-sans leading-relaxed shadow-xl">
          
          {/* Header Title Block */}
          <div className="border-b border-slate-800 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <span>OFFICIAL PROTOCOL SPECIFICATION</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              AuraX Protocol: An Autonomous Quantitative Execution &amp; Deflationary Liquidity Engine
            </h1>
            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-4 font-mono">
              <span>Published: September 2026</span>
              <span>•</span>
              <span>Author: AuraX Quantitative Research Group</span>
              <span>•</span>
              <span className="text-emerald-400">Base Mainnet Genesis Verified</span>
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

          {/* Section 2 */}
          <section id="wp-architecture" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">02.</span> Institutional Terminal Architecture
            </h2>
            <p className="text-sm">
              The AuraX Terminal operates an event-driven, sub-millisecond Smart Order Routing (SOR) engine designed for high-frequency traders and quantitative institutional desks.
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
                  <BarChart2 className="w-4 h-4" /> Delta-Neutral Basis Arbitrage
                </div>
                <p className="text-slate-400">
                  Autonomous algorithms exploit perpetual funding rate differentials between spot and derivative markets, capturing 26.8% annualized risk-free basis spreads.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="wp-dual-engine" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">03.</span> Dual-Engine Ecosystem: $AURX &amp; USD-O
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

          {/* Section 4 */}
          <section id="wp-math-burn" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">04.</span> Mathematical Model of Autonomous Buyback &amp; Burn
            </h2>
            <p className="text-sm">
              Unlike inflationary reward models, AuraX utilizes a mathematical deflationary sink governed by verified protocol revenues. 
            </p>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3">
              <div className="text-slate-400">// Deflationary Quantity Equation</div>
              <div className="text-amber-300 text-sm font-bold">
                Q_burn(t) = ( &gamma; &times; R_protocol(t) ) / P_market(t)
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                Where:
                <br />• <strong>R_protocol(t)</strong> = Total gross revenue accumulated from exchange taker fees, prop firm challenge fees, and VIP terminal subscriptions in epoch t.
                <br />• <strong>&gamma; = 0.30</strong> = Algorithmic burn fraction (strictly 30% of gross protocol revenue).
                <br />• <strong>P_market(t)</strong> = Time-Weighted Average Price (TWAP) of $AURX on Base DEX pools.
                <br />• <strong>Q_burn(t)</strong> = Total quantity of $AURX bought directly from open-market liquidity pools and routed to the burn address.
              </div>
            </div>
            <p className="text-xs text-slate-400">
              The burn function is executed on-chain via <code>executeProtocolRevenueBurn()</code> in the <code>AuraXToken.sol</code> contract, irrevocably reducing the circulating supply on Base.
            </p>
          </section>

          {/* Section 5 */}
          <section id="wp-tokenomics" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">05.</span> Token Distribution &amp; Vesting Schedule
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
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">Community Staking &amp; Liquidity</td>
                    <td className="py-2.5 px-3">30%</td>
                    <td className="py-2.5 px-3">30,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">4-year linear decay; reward emissions tied to vault lockups</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-400">AuraX Strategic Treasury</td>
                    <td className="py-2.5 px-3">25%</td>
                    <td className="py-2.5 px-3">25,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">12-month cliff, followed by 36-month multi-sig timelock vesting</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-cyan-400">Public Launchpad &amp; Pre-Sale</td>
                    <td className="py-2.5 px-3">20%</td>
                    <td className="py-2.5 px-3">20,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">25% unlocked at TGE, 75% unlocked linearly over 6 months</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-purple-400">Core Engineering &amp; Team</td>
                    <td className="py-2.5 px-3">15%</td>
                    <td className="py-2.5 px-3">15,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">12-month cliff, 36-month linear vesting; aligned with long-term protocol health</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-blue-400">Ecosystem Grants &amp; MM Provision</td>
                    <td className="py-2.5 px-3">10%</td>
                    <td className="py-2.5 px-3">10,000,000</td>
                    <td className="py-2.5 px-3 text-slate-400">100% unlocked at TGE for CEX and DEX deep bid/ask liquidity provision</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section id="wp-prop-desk" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">06.</span> Prop Trading &amp; Whale Radar Intelligence
            </h2>
            <p className="text-sm">
              The protocol finances disciplined traders up to $200,000 in funded capital. Evaluation fees and platform spreads directly subsidize protocol treasury reserves.
            </p>
            <p className="text-sm">
              Additionally, the <strong>Whale Radar Oracle</strong> monitors multi-chain mempools (Base, Ethereum, Solana), detecting accumulation patterns exceeding $500,000 and broadcasting execution alerts to $AURX stakers in real time.
            </p>
          </section>

          {/* Section 7 */}
          <section id="wp-security" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">07.</span> Smart Contract Security &amp; Formal Verification
            </h2>
            <p className="text-sm">
              The <code>AuraXToken.sol</code> contract utilizes OpenZeppelin v5.0 industry-standard libraries, inheriting:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-slate-300">
              <li><strong>ERC-20 &amp; ERC20Burnable:</strong> Standardized transfer and token destruction functionality without hidden transfer fees or blacklist traps.</li>
              <li><strong>EIP-2612 Permit:</strong> Gasless meta-transactions enabling zero-gas token approvals in high-frequency trading interfaces.</li>
              <li><strong>AccessControl (RBAC):</strong> Granular separation of administrative duties; the <code>REVENUE_BURNER_ROLE</code> is strictly isolated to the autonomous buyback contract.</li>
              <li><strong>Sourcify Exact Match Verification:</strong> Bytecode verified on Base Mainnet (Chain ID 8453) on 2026-09-26 at Block #51827528.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="wp-governance" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-mono">08.</span> Governance DAO &amp; Staking Vault (23.6% APY)
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

          {/* Section 9 */}
          <section id="wp-disclaimer" className="space-y-4 pt-4 border-t border-slate-800 text-slate-500 text-xs leading-relaxed">
            <h2 className="text-base font-bold text-slate-400 flex items-center gap-2">
              <span className="text-slate-500 font-mono">09.</span> Legal Disclaimers &amp; Regulatory Notices
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
