import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  Download,
  Sparkles,
  Flame,
  Trophy,
  ShieldCheck,
  Zap,
  Layers,
  Image as ImageIcon,
  Send,
  Globe,
  Radio,
  Coins,
  CheckCheck,
  Cpu,
  Building,
  Facebook,
  Linkedin,
  ShieldAlert,
  Award,
  FileText,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Activity,
  BarChart3,
  Database,
  Shield,
  Lock,
  Briefcase,
  RefreshCw,
  Eye,
  Terminal,
  Search
} from 'lucide-react';
import {
  OPERATING_LOOP_STEPS,
  BUSINESS_LAYER_MODULES,
  WEALTH_LAYER_ENGINES,
  TRUST_LAYER_SPECS,
  OMNIFIN_GLOBAL_SPECS,
  FULL_STACK_COPY_KITS
} from './AuraX100LayersData';

interface AuraXViralSocialKitProps {
  referralCode?: string;
  walletAddress?: string;
  className?: string;
}

export const AuraXViralSocialKit: React.FC<AuraXViralSocialKitProps> = ({
  referralCode = 'AURX-GENESIS',
  walletAddress = '',
  className = ''
}) => {
  // Navigation tabs within the Social Suite
  const [activeMainTab, setActiveMainTab] = useState<'100_LAYERS_SOLUTION' | 'BRAND_PAGES' | 'EXCLUSIVE_FEATURES' | 'VIRAL_POSTS' | 'MEDIA_ASSETS'>('100_LAYERS_SOLUTION');
  const [selected100LayerTab, setSelected100LayerTab] = useState<'12_STEP_LOOP' | 'BUSINESS_25' | 'WEALTH_20' | 'TRUST_28' | 'OMNIFIN_GLOBAL' | 'MANIFESTO_POSTS'>('12_STEP_LOOP');
  const [moduleSearch, setModuleSearch] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<'TWITTER' | 'LINKEDIN' | 'FACEBOOK'>('TWITTER');
  const [selectedTemplate, setSelectedTemplate] = useState<'VIRAL_AIRDROP' | 'TECH_L1' | 'TWITTER_PUNCHY'>('VIRAL_AIRDROP');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cleanCode = referralCode || (walletAddress ? 'AURX-' + walletAddress.substring(2, 8).toUpperCase() : 'AURX-GENESIS');

  // Direct, instant canonical URL — zero redirects, zero third-party delay, opens our site immediately
  const vercelDomain = 'https://econos-aistudio-update.vercel.app';
  const activeLink = `${vercelDomain}/?ref=${cleanCode}`;

  const englishHashtags = '#AuraX #Layer1 #Blockchain #CryptoAirdrop #Testnet #Web3 #Crypto #AirdropAlert #FreeCrypto #DeFi #Ethereum #Solana #Bitcoin #Giveaway #EarnCrypto';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadAsset = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Viral post templates
  const templates = {
    VIRAL_AIRDROP: `🔥 AURA-X SOVEREIGN L1 — INCENTIVIZED TESTNET IS OFFICIALLY LIVE! 🌐⚡

Experience the world's first Zero-Fraud, Hardware-Consensus Layer-1 Blockchain. Built for institutional speed, consumer privacy, and zero gas-drains.

💎 KEY BLOCKCHAIN FEATURES:
⚡ 100,000+ Real TPS & Sub-Second Finality (DAG-BFT + PCT Engine)
🛡️ Zero-Fraud Proof-of-Yield (PoY) & Anti-Drainer Threat Interception
⛽ Frictionless EVM Compatibility — Deploy Solidity dApps in seconds
🔄 Built-in Zero-Slippage DEX & 12.5% APY Staking Vaults
🐳 Real Decentralized Node Infrastructure running directly in browser

🎁 JOIN THE TESTNET & CLAIM VERIFIED REWARDS:
• 🎁 Claim 1,000 Free $AURX from Genesis Faucet
• 💰 Earn +100 $AURX instant bonus with my invite code: ${cleanCode}
• 🏆 Earn Airdrop XP & Staking Rewards on every action
• 👥 Invite friends & earn +50 $AURX & +250 XP per valid peer

👉 Start Earning Now (Claim Faucet):
🔗 ${activeLink}

${englishHashtags}`,

    TECH_L1: `🚀 INTRODUCING AURA-X: The High-Throughput Sovereign Layer-1 Built for the Zero-Fraud Era ⛓️🛡️

Traditional blockchains suffer from MEV manipulation, wallet drainers, and gas spikes. AuraX redesigns Layer-1 architecture with mathematical invariants:

⚙️ ARCHITECTURAL SPECIFICATIONS:
• Consensus: Quantum DAG-BFT with Physical Hardware Fingerprint (PCT)
• Throughput: 100,000+ TPS with cryptographic sub-second settlement
• Execution: Full EVM Bytecode & JSON-RPC 2.0 Compatibility (Chain ID: 9924)
• Security: Anti-Sybil Proof-of-Yield with automated wallet drainer veto
• DeFi Layer: Native Invariant Vaults & AMM Liquidity Pools

🎁 INCENTIVIZED TESTNET REWARD PROGRAM:
Validators, developers, and early testers earn verified $AURX tokens & Airdrop allocations for testing on-chain throughput.

🔗 Testnet Genesis Access: ${activeLink}
Use Invite Key: ${cleanCode} (+100 $AURX Genesis Allocation)

${englishHashtags}`,

    TWITTER_PUNCHY: `🚨 $AURX INCENTIVIZED TESTNET IS LIVE! 🚨

AuraX is the new sovereign Layer-1 with 100K+ TPS & Zero-Fraud consensus ⚡🛡️

🎁 Join now & claim 1,000 $AURX Faucet + 100 $AURX bonus!
Complete quests & earn airdrop XP daily 💎

👉 Claim Here: ${activeLink}
(Code: ${cleanCode})

#AuraX #Layer1 #CryptoAirdrop #Testnet #Web3 #Crypto`
  };

  // Brand profiles for Twitter, LinkedIn, Facebook
  const brandProfiles = {
    TWITTER: {
      name: 'AuraX Sovereign Layer-1',
      handle: '@AuraXNetwork (or @AuraX_L1)',
      tagline: "The World's First Zero-Fraud Sovereign Layer-1 Blockchain.",
      bio: "⚡ 100,000+ TPS DAG-BFT | 🛡️ Silicon Hardware Consensus & Zero-Drainer Invariant Shield | ⛽ EVM Native | 🎁 Incentivized Testnet Live 👇",
      location: 'Global / Decentralized Sovereign Network',
      website: 'https://econos-aistudio-update.vercel.app',
      headerBannerText: 'AuraX Sovereign L1 — Zero-Fraud Consensus | 100K+ TPS | Proof-of-Yield',
      pinnedTweet: `🌐 Welcome to AuraX — The Sovereign Layer-1 Engineered for the Zero-Fraud Era.

Why settle for blockchains where 1 phishing link drains your life savings, or where gas fees spike 1,000% during high volume?

⚡ 100,000+ Real TPS with sub-second finality
🛡️ Hardware-Fingerprinted Physical Consensus (Zero Bot Farms)
🔒 Consensus-Level Anti-Drainer Threat Interception
⛽ EVM Bytecode Native & Zero-Gas Onboarding
💎 Proof-of-Yield (PoY) 12.5% APY Staking

🎁 INCENTIVIZED TESTNET IS LIVE:
Claim 1,000 Free $AURX from Genesis Faucet, run validator nodes in your browser & earn verified airdrop rewards.

👇 Start Building & Earning:
🔗 ${activeLink}

#AuraX #Layer1 #Blockchain #Web3 #Crypto #CryptoAirdrop #DeFi`,
      firstThread: [
        "1/5 🧵 What makes @AuraXNetwork fundamentally different from every other Layer-1 in existence? A quick architectural breakdown 👇",
        "2/5 🛡️ 1. ZERO-FRAUD PROTOCOL: In Bitcoin & Ethereum, once you sign a malicious tx, your funds are gone forever. On AuraX, the consensus engine runs automated mathematical velocity invariants. Wallet-draining anomalies are intercepted and vetoed at the protocol layer with zero state loss.",
        "3/5 💻 2. SILICON HARDWARE CONSENSUS (PCT): PoW wastes gigawatts of coal; PoS centralizes control to billionaire staking cartels. AuraX binds validator integrity to physical hardware entropy. 1-PC = 1-Validator, eliminating Sybil cloud bot armies.",
        "4/5 ⚡ 3. NON-INFLATIONARY PROOF-OF-YIELD (PoY): Other chains pay staking yields by printing new coins (causing token dilution). AuraX generates 12.5% APY mathematically routed from real cross-chain AMM liquidity velocity & settlement fees.",
        "5/5 🚀 Experience the future today. Connect your wallet to our live Genesis Node, claim 1,000 $AURX from the faucet, and earn testnet airdrop XP: " + activeLink
      ]
    },
    LINKEDIN: {
      name: 'AuraX Network',
      pageType: 'Company Page (Enterprise & Developer Focus)',
      tagline: 'Next-Generation Zero-Fraud Sovereign Layer-1 Blockchain Infrastructure for Global Finance',
      industry: 'Blockchain Services, Financial Technology & Cryptographic Infrastructure',
      companySize: '11-50 employees',
      website: 'https://econos-aistudio-update.vercel.app',
      aboutUs: `AuraX Network is the developer of AuraX Sovereign Layer-1, a breakthrough decentralized blockchain architecture engineered to solve the systemic vulnerabilities plaguing traditional distributed ledgers.

While existing blockchains suffer from predatory MEV extraction, irreversible wallet-drainer scams, and exponential network congestion, AuraX introduces the world's first mathematical invariant consensus engine:

• Physical Hardware Consensus (PCT): Eliminates cloud bot manipulation and Sybil validator collusion by anchoring cryptographic state to physical CPU/TPM silicon entropy.
• Consensus-Level Anti-Drainer Threat Interception: Automatically detects, intercepts, and vetoes anomalous balance-drainage transactions before state finalization, establishing true institutional safety for digital assets.
• 100,000+ Transactions Per Second (TPS): Powered by an asynchronous DAG-BFT execution pipeline delivering deterministic sub-second finality with zero mempool congestion.
• Full EVM Compatibility: Seamless drop-in support for Ethereum Solidity contracts, tooling (MetaMask, Hardhat, Foundry), and JSON-RPC 2.0 endpoints.
• Mathematical Proof-of-Yield (PoY): Non-inflationary native staking yielding up to 12.5% APY derived from transaction velocity rather than arbitrary token dilution.

AuraX is designed for institutions, decentralized finance protocols, and global enterprises requiring deterministic security, zero-fraud guarantees, and high-throughput scalability.`,
      specialties: 'Layer-1 Blockchain, Zero-Fraud Cryptographic Invariants, DAG-BFT Consensus, High-Frequency Web3 Infrastructure, EVM Compatibility, Enterprise DeFi, Anti-Sybil Hardware Attestation',
      firstPost: `Today marks a monumental milestone in distributed systems: The launch of the AuraX Sovereign Layer-1 Incentivized Testnet.

For over a decade, the blockchain industry accepted a painful trade-off: security meant slow throughput, and speed meant network outages and rampant wallet drainers.

AuraX was engineered from first mathematical principles to eliminate this compromise. By coupling Physical Computation Attestation (PCT) with an asynchronous DAG-BFT consensus engine, AuraX achieves:

✔ 100,000+ Transactions Per Second with sub-second finality
✔ Protocol-level invariant interception that prevents wallet-draining exploits
✔ Full EVM parity for institutional Solidity deployments
✔ Non-inflationary native staking yield mathematically derived from transaction velocity

We invite developers, enterprise partners, and decentralized node operators to experience the AuraX Genesis Node Engine and participate in our Incentivized Testnet program:

🔗 Learn more & join the testnet: https://econos-aistudio-update.vercel.app

#Blockchain #Web3 #Layer1 #FinancialTechnology #Cryptography #Cybersecurity #DeFi #Infrastructure`
    },
    FACEBOOK: {
      name: 'AuraX Sovereign Blockchain',
      category: 'Science, Technology & Engineering / Internet Company / Cryptocurrency',
      bio: 'The world’s first Zero-Fraud Sovereign Layer-1 Blockchain with 100,000+ TPS and Proof-of-Yield Consensus.',
      website: 'https://econos-aistudio-update.vercel.app',
      callToAction: 'Use App (or Learn More)',
      aboutStory: `Welcome to the official page of AuraX Sovereign Layer-1!

AuraX is a revolutionary high-speed, zero-fraud blockchain designed to make Web3 safe, fast, and accessible for everyone. 

Have you ever worried about losing your crypto to phishing links or fake approvals? AuraX is the ONLY blockchain in the world built with a consensus-level Zero-Fraud Shield that intercepts wallet drainers before your funds can ever be stolen.

Key Highlights:
⚡ Blazing Fast: 100,000+ transactions per second — transfers happen in milliseconds.
🛡️ Zero-Fraud Security: Built-in mathematical protection against scammers and wallet drainers.
⛽ Ultra-Low & Zero Gas Fees: Transfer and trade without paying ridiculous gas prices.
🎁 Earn Free Rewards: Join our live Incentivized Testnet today, claim 1,000 Free $AURX tokens from our faucet, and earn real rewards by participating in quests.

Join the global community shaping the next era of decentralized finance!`,
      firstPost: `🌐 WELCOME TO THE FUTURE OF CRYPTO: AURA-X SOVEREIGN LAYER-1 IS HERE! ⚡🛡️

We are thrilled to officially unveil AuraX — the high-speed blockchain built to put an end to crypto fraud, high gas fees, and network slowdowns.

Why is AuraX revolutionary?
1️⃣ Zero-Fraud Shield: The world's first blockchain with built-in protection against wallet-draining scams.
2️⃣ 100,000+ TPS: Instant transfers and zero waiting times.
3️⃣ Free Incentivized Testnet: Anyone can join right now, claim 1,000 Free $AURX tokens, and earn rewards!

Ready to get started?
👉 Visit https://econos-aistudio-update.vercel.app to connect your wallet, claim free tokens, and join the testnet revolution today!

#AuraX #Crypto #Blockchain #Web3 #Testnet #FreeCrypto #Airdrop #Technology`
    }
  };

  // The 6 Unmatched World-First Features
  const unmatchedFeatures = [
    {
      id: 'PCT_HARDWARE',
      icon: Cpu,
      title: '1. Physical Silicon Hardware Consensus (PCT)',
      badge: 'World First',
      vsCompetitors: 'Bitcoin uses energy-wasting PoW; Ethereum & Solana use PoS where billionaire validator cartels control the network.',
      auraXSecret: 'AuraX binds validator identity and consensus weight directly to unique physical CPU/TPM silicon entropy with Anti-Sybil 1-PC-1-Validator guards. It eliminates cloud bot farms and centralized staking syndicates forever.',
      benefit: 'Fair decentralization, immune to AWS/cloud hosting bans, zero energy waste.'
    },
    {
      id: 'ZERO_FRAUD_SHIELD',
      icon: ShieldAlert,
      title: '2. Consensus-Level Anti-Drainer Threat Interception',
      badge: 'Zero-Fraud Veto',
      vsCompetitors: 'On Ethereum, Solana, and Bitcoin: once you sign a malicious phishing contract, your entire wallet is drained permanently with ZERO recourse.',
      auraXSecret: 'AuraX implements Autonomous Mathematical Invariants directly into block validation. If an anomalous velocity or balance-drainage pattern is detected, the transaction is cryptographically intercepted and vetoed BEFORE state finalization with instant rollback.',
      benefit: 'Phishing attacks and malicious drainers are rendered mathematically impossible.'
    },
    {
      id: 'PROOF_OF_YIELD',
      icon: Coins,
      title: '3. Non-Inflationary Proof-of-Yield (PoY) Staking',
      badge: 'Zero Token Inflation',
      vsCompetitors: 'Other altcoins pay 8-15% staking yields by printing billions of new coins, constantly diluting your bag and crashing the token price.',
      auraXSecret: 'AuraX staking yield (12.5% APY) is strictly non-inflationary. It is mathematically generated from real cross-chain AMM liquidity velocity, transaction invariants, and institutional settlement throughput.',
      benefit: 'Real organic yield backed by network activity, not toxic hyper-inflation.'
    },
    {
      id: 'DAG_BFT_SPEED',
      icon: Zap,
      title: '4. 100,000+ Real TPS Asynchronous DAG-BFT',
      badge: 'Sub-Second Finality',
      vsCompetitors: 'Ethereum does 15-30 TPS with $50 gas spikes; Solana suffers frequent chain halts and dropped transactions.',
      auraXSecret: 'AuraX employs a DAG-BFT asynchronous pipelined consensus engine with zero state-lock collisions and deterministic sub-second finality. Transactions stream in parallel without waiting for sequential block timers.',
      benefit: 'Instantaneous settlement, zero mempool queues, resilient under extreme peak load.'
    },
    {
      id: 'ZERO_GAS_EVM',
      icon: Sparkles,
      title: '5. Frictionless Zero-Gas EVM Onboarding',
      badge: '100% Solidity Native',
      vsCompetitors: 'New Web3 users are blocked immediately because they need ETH or SOL to pay gas fees before doing anything.',
      auraXSecret: 'AuraX allows frictionless onboarding with silicon hardware attestation vouchers, sponsoring initial transactions while maintaining full EVM/Solidity compatibility (Chain ID: 9924).',
      benefit: 'Zero friction for mainstream consumers; deploy any Ethereum smart contract in 1 second.'
    },
    {
      id: 'BROWSER_VALIDATOR',
      icon: Globe,
      title: '6. Serverless In-Browser Full Validator Node',
      badge: 'Zero Server Cost',
      vsCompetitors: 'Running an Ethereum or Solana validator requires a $5,000+ dedicated server rig with 64GB RAM and 2TB NVMe drives.',
      auraXSecret: 'AuraX features an ultra-lightweight client execution runtime. Anyone with a normal laptop or smartphone can validate blocks directly in their browser tab and earn validator rewards.',
      benefit: 'True mass decentralization across hundreds of thousands of consumer devices.'
    }
  ];

  return (
    <div className={`rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 shadow-2xl space-y-6 ${className}`}>
      {/* Top Header & Main Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black font-mono tracking-tight text-white">
                AuraX Official Brand & Social Launch Center
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                Official Kit
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Complete profile blueprints, unmatched world-first features, and viral campaigns for Twitter, LinkedIn & Facebook.
            </p>
          </div>
        </div>

        {/* Quick Media Asset Download */}
        <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
          <button
            type="button"
            onClick={() => handleDownloadAsset('/aurax_brand_banner.jpg', 'aurax_official_brand_banner.jpg')}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Header Banner</span>
          </button>
          <button
            type="button"
            onClick={() => handleDownloadAsset('/aurax_chain_visual.jpg', 'aurax_layer1_visual.jpg')}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Chain Visual</span>
          </button>
        </div>
      </div>

      {/* Main Mode Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs font-bold">
        {[
          { id: '100_LAYERS_SOLUTION', label: '🌐 100 Real-World Financial Layers (The Solution)', icon: Layers },
          { id: 'BRAND_PAGES', label: '🏢 Social Media Pages Setup (𝕏, LinkedIn, Facebook)', icon: Building },
          { id: 'EXCLUSIVE_FEATURES', label: '⚡ Features No Other Chain Has', icon: Zap },
          { id: 'VIRAL_POSTS', label: '🔥 Viral Testnet Posts & Quests', icon: Flame },
          { id: 'MEDIA_ASSETS', label: '🎨 Official Banner & Image Assets', icon: ImageIcon }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMainTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MODE 0: THE 100-LAYER AUTONOMOUS FINANCIAL SOLUTION (ECONOS + OMNIFIN + AuraX) */}
      {/* ========================================================================= */}
      {activeMainTab === '100_LAYERS_SOLUTION' && (
        <div className="space-y-6 animate-in fade-in duration-200 font-mono">
          {/* Executive Architecture Header */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>THE UNIFIED FINANCIAL OPERATING SYSTEM (100 REAL-WORLD LAYERS)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                How ECONOS, OMNIFIN & AuraX Solve Real-World Enterprise Finance
              </h2>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                We aren't just deploying an isolated Layer-1. We have engineered the world's first unified 100-layer autonomous financial operating stack running on a continuous 12-step cognitive loop — replacing billions of dollars of fragmented ERP, banking, accounting, and clearing software.
              </p>
            </div>

            {/* Architecture Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-5 mt-4 border-t border-slate-800 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Operating Loop</div>
                <div className="text-sm font-black text-cyan-400 mt-0.5">12 Continuous Steps</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Business Layer</div>
                <div className="text-sm font-black text-purple-400 mt-0.5">25 Modules</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Wealth Layer</div>
                <div className="text-sm font-black text-emerald-400 mt-0.5">20 Engines</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Trust Layer</div>
                <div className="text-sm font-black text-amber-400 mt-0.5">28 AI Agents</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">OMNIFIN Global</div>
                <div className="text-sm font-black text-sky-400 mt-0.5">$142B Monitored</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">AuraX L1 Bedrock</div>
                <div className="text-sm font-black text-rose-400 mt-0.5">Zero-Fraud PoY</div>
              </div>
            </div>
          </div>

          {/* Sub-Tabs Navigator */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
            {[
              { id: '12_STEP_LOOP', label: '🔄 12-Step Autonomous Loop', count: '12 Steps' },
              { id: 'BUSINESS_25', label: '🏢 Business Layer', count: '25 Modules' },
              { id: 'WEALTH_20', label: '💎 Wealth Layer', count: '20 Engines' },
              { id: 'TRUST_28', label: '🛡️ Trust Layer', count: '28 Agents + Firewall' },
              { id: 'OMNIFIN_GLOBAL', label: '🌐 OMNIFIN Global & L1', count: 'Universal Rails' },
              { id: 'MANIFESTO_POSTS', label: '📢 Full-Stack Social Copy Kits', count: 'LinkedIn / 𝕏 / FB' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelected100LayerTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
                  selected100LayerTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selected100LayerTab === tab.id ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* SUB-VIEW 1: THE 12-STEP OPERATING LOOP */}
          {selected100LayerTab === '12_STEP_LOOP' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-cyan-400" />
                    <span>The Continuous 12-Step Autonomous Financial Operating Loop</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Self-healing, closed-loop financial cognition executing without human latency or data entry errors.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(
                    'OBSERVE → UNDERSTAND → DETECT → SIMULATE → DECIDE → AUTHORIZE → EXECUTE → CLEAR → SETTLE → VERIFY → RECONCILE → MONITOR → LEARN\n\n' +
                    OPERATING_LOOP_STEPS.map(s => `${s.step}. ${s.name} (${s.tagline}): ${s.description}`).join('\n'),
                    '12_loop'
                  )}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
                >
                  {copiedKey === '12_loop' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === '12_loop' ? 'Loop Copied!' : 'Copy 12-Step Loop'}</span>
                </button>
              </div>

              {/* Loop Flow Diagram */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 overflow-x-auto whitespace-nowrap scrollbar-thin">
                <div className="flex items-center gap-2 text-[11px] font-black">
                  {OPERATING_LOOP_STEPS.map((s, idx) => (
                    <React.Fragment key={s.step}>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] flex items-center justify-center font-bold">
                          {s.step}
                        </span>
                        <span>{s.name}</span>
                      </span>
                      {idx < OPERATING_LOOP_STEPS.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Step Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {OPERATING_LOOP_STEPS.map(s => (
                  <div key={s.step} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-black flex items-center justify-center">
                          {s.step}
                        </div>
                        <span className="font-black text-white text-xs">{s.name}</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                        {s.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-cyan-400 font-bold">{s.tagline}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: BUSINESS LAYER (25 MODULES) */}
          {selected100LayerTab === 'BUSINESS_25' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-purple-400" />
                    <span>Business Layer (25 Autonomous Financial Modules)</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Real-time GAAP accounting, continuous close, CPQ, treasury, and 3-way match.
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      value={moduleSearch}
                      onChange={(e) => setModuleSearch(e.target.value)}
                      placeholder="Search modules..."
                      className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-44"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(
                      BUSINESS_LAYER_MODULES.map(m => `• ${m.name} (${m.tagline}): ${m.description}`).join('\n'),
                      'biz_modules'
                    )}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
                  >
                    {copiedKey === 'biz_modules' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy 25 Modules</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {BUSINESS_LAYER_MODULES.filter(m => 
                  !moduleSearch || 
                  m.name.toLowerCase().includes(moduleSearch.toLowerCase()) || 
                  m.description.toLowerCase().includes(moduleSearch.toLowerCase()) ||
                  m.category.toLowerCase().includes(moduleSearch.toLowerCase())
                ).map(m => (
                  <div key={m.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 hover:border-slate-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{m.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-800">
                        {m.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-purple-400 font-semibold">{m.tagline}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: WEALTH LAYER (20 ENGINES) */}
          {selected100LayerTab === 'WEALTH_20' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Wealth Layer (20 Autonomous Engines)</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Translates business profits into generational family wealth, M&A expansion, and tax preservation.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(
                    WEALTH_LAYER_ENGINES.map(m => `• ${m.name} (${m.tagline}): ${m.description}`).join('\n'),
                    'wealth_modules'
                  )}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
                >
                  {copiedKey === 'wealth_modules' ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy 20 Wealth Engines</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {WEALTH_LAYER_ENGINES.map(w => (
                  <div key={w.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 hover:border-slate-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{w.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 border border-slate-800">
                        {w.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold">{w.tagline}</div>
                    <p className="text-[11px] text-slate-400 leading-snug">{w.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 4: TRUST LAYER (28 AGENTS & FIREWALL) */}
          {selected100LayerTab === 'TRUST_28' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Trust Layer (28 AI Agents + 8-Stage AI Firewall)</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Bank-grade cryptographic economic passports, dynamic risk scoring, and human approval queues.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(
                    TRUST_LAYER_SPECS.features.map(f => `• ${f.title}: ${f.desc}`).join('\n'),
                    'trust_specs'
                  )}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
                >
                  {copiedKey === 'trust_specs' ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Trust Specs</span>
                </button>
              </div>

              {/* 8-Stage Firewall Sequence */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>8-Stage AI Firewall Pipeline (Evaluating Every Action Before Execution):</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-[10px]">
                  {[
                    '1. Signature Check',
                    '2. Prompt Guard',
                    '3. Semantic Bounds',
                    '4. Policy Matrix',
                    '5. Risk Tier Scoring',
                    '6. Invariant Veto',
                    '7. Dual-Sign RBAC',
                    '8. Merkle Hash Audit'
                  ].map((stage, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-amber-400 font-bold">{stage}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {TRUST_LAYER_SPECS.features.map((f, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{f.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 5: OMNIFIN GLOBAL & AURAX L1 BEDROCK */}
          {selected100LayerTab === 'OMNIFIN_GLOBAL' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-sky-400" />
                    <div>
                      <div className="text-sm font-bold text-white">OMNIFIN Global Layer & AuraX Sovereign L1 Bedrock</div>
                      <div className="text-xs text-slate-400">Universal financial state layer operating above all blockchains and banking networks.</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">AUM Monitored</div>
                    <div className="text-lg font-black text-sky-400 mt-0.5">{OMNIFIN_GLOBAL_SPECS.aumMonitored}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Daily Netting Volume</div>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">{OMNIFIN_GLOBAL_SPECS.dailyNetting}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Causal Latency</div>
                    <div className="text-lg font-black text-purple-400 mt-0.5">{OMNIFIN_GLOBAL_SPECS.latency}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Settlement SLA</div>
                    <div className="text-lg font-black text-amber-400 mt-0.5">{OMNIFIN_GLOBAL_SPECS.settlementSla}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-sky-400 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>OMNIFIN Proof-Carrying Transaction (PCT) Rails</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Operates above SWIFT, ACH, Fedwire, and all L1/L2 blockchains across 15 asset classes and 14 trading surfaces. Saves over $245M in unnecessary liquidity buffers through continuous bilateral netting.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>AuraX Sovereign Layer-1 Physical Settlement</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The world's only L1 with Silicon Hardware Consensus (1-PC = 1-Validator) and consensus-level Anti-Drainer Threat Interception. 100,000+ TPS with zero-gas onboarding and non-inflationary 12.5% Proof-of-Yield (PoY).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 6: READY-TO-PUBLISH SOCIAL COPY KITS */}
          {selected100LayerTab === 'MANIFESTO_POSTS' && (
            <div className="space-y-6">
              {/* LinkedIn Mega-Manifesto */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Enterprise & VC Mega-Manifesto</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(FULL_STACK_COPY_KITS.LINKEDIN_MEGA_MANIFESTO, 'li_manifesto')}
                    className="px-3.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedKey === 'li_manifesto' ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'li_manifesto' ? 'Manifesto Copied!' : 'Copy LinkedIn Manifesto'}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  value={FULL_STACK_COPY_KITS.LINKEDIN_MEGA_MANIFESTO}
                  rows={10}
                  className="w-full bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed resize-none focus:outline-none font-mono select-all"
                />
              </div>

              {/* Twitter 8-Tweet Thread */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                    <Share2 className="w-4 h-4" />
                    <span>Twitter / 𝕏 8-Part Mega Thread</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(FULL_STACK_COPY_KITS.TWITTER_MEGA_THREAD.join('\n\n'), 'tw_thread_all')}
                    className="px-3.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedKey === 'tw_thread_all' ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'tw_thread_all' ? 'Thread Copied!' : 'Copy All 8 Tweets'}</span>
                  </button>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {FULL_STACK_COPY_KITS.TWITTER_MEGA_THREAD.map((tweet, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      {tweet}
                    </div>
                  ))}
                </div>
              </div>

              {/* Facebook Story */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                    <Facebook className="w-4 h-4" />
                    <span>Facebook Community Story (Entrepreneurs & Wealth Builders)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(FULL_STACK_COPY_KITS.FACEBOOK_STORY, 'fb_story_all')}
                    className="px-3.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedKey === 'fb_story_all' ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'fb_story_all' ? 'Story Copied!' : 'Copy Facebook Story'}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  value={FULL_STACK_COPY_KITS.FACEBOOK_STORY}
                  rows={8}
                  className="w-full bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed resize-none focus:outline-none font-mono select-all"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: OFFICIAL SOCIAL MEDIA PAGES SETUP (Twitter, LinkedIn, Facebook)  */}
      {/* ========================================================================= */}
      {activeMainTab === 'BRAND_PAGES' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Platform Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Select Platform Profile Blueprint:</span>
            </span>

            <div className="flex items-center gap-2 font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => setSelectedPlatform('TWITTER')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition cursor-pointer ${
                  selectedPlatform === 'TWITTER'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>𝕏 / Twitter</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlatform('LINKEDIN')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition cursor-pointer ${
                  selectedPlatform === 'LINKEDIN'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Company</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlatform('FACEBOOK')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition cursor-pointer ${
                  selectedPlatform === 'FACEBOOK'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook Page</span>
              </button>
            </div>
          </div>

          {/* Active Platform Blueprint Details */}
          {selectedPlatform === 'TWITTER' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (5 cols): Profile Settings & Bio */}
              <div className="lg:col-span-5 space-y-4 font-mono">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-2">
                      <span>𝕏 Profile Details & Spec</span>
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Standard Handle
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Display Name:</div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 mt-1">
                        <span className="font-bold text-white">{brandProfiles.TWITTER.name}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(brandProfiles.TWITTER.name, 'tw_name')}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          {copiedKey === 'tw_name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Recommended Handle:</div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 mt-1">
                        <span className="text-sky-300 font-bold">{brandProfiles.TWITTER.handle}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('@AuraXNetwork', 'tw_handle')}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          {copiedKey === 'tw_handle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold">
                        <span>Profile Bio ({brandProfiles.TWITTER.bio.length}/160 chars):</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(brandProfiles.TWITTER.bio, 'tw_bio')}
                          className="text-cyan-400 hover:text-cyan-300 lowercase text-[10px]"
                        >
                          {copiedKey === 'tw_bio' ? 'Copied!' : 'Copy Bio'}
                        </button>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs mt-1 leading-relaxed">
                        {brandProfiles.TWITTER.bio}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase">Website URL:</div>
                        <div className="text-[11px] font-bold text-cyan-400 truncate mt-0.5">https://econos-aistudio-update.vercel.app</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase">Location:</div>
                        <div className="text-[11px] font-bold text-slate-300 truncate mt-0.5">Global Decentralized</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Header Banner Preview for Twitter */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                      <span>𝕏 Header Banner (1500x500 Spec)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDownloadAsset('/aurax_brand_banner.jpg', 'aurax_twitter_header_banner.jpg')}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[3/1] bg-slate-900 relative">
                    <img
                      src="/aurax_brand_banner.jpg"
                      alt="AuraX Official Twitter Header Banner"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[10px] text-cyan-300 font-bold">AuraX Sovereign Layer-1 Header</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Pinned Launch Tweet & Thread */}
              <div className="lg:col-span-7 space-y-4 font-mono">
                {/* Pinned Launch Tweet Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Official Pinned Announcement Tweet</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(brandProfiles.TWITTER.pinnedTweet, 'pinned_tweet')}
                      className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedKey === 'pinned_tweet' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'pinned_tweet' ? 'Copied!' : 'Copy Pinned Tweet'}</span>
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={brandProfiles.TWITTER.pinnedTweet}
                    rows={10}
                    className="w-full bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-slate-200 text-xs leading-relaxed resize-none focus:outline-none select-all font-mono"
                  />

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 text-[11px]">Pin this tweet at the top of your @AuraXNetwork page.</span>
                    <button
                      type="button"
                      onClick={() => {
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(brandProfiles.TWITTER.pinnedTweet)}`, '_blank');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm text-xs"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Tweet This Directly</span>
                    </button>
                  </div>
                </div>

                {/* Educational Launch Thread (5 Tweets) */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-slate-300 font-bold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span>Viral 5-Part Architectural Thread</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(brandProfiles.TWITTER.firstThread.join('\n\n'), 'thread_copy')}
                      className="text-cyan-400 hover:text-cyan-300 text-[11px] font-bold flex items-center gap-1"
                    >
                      {copiedKey === 'thread_copy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'thread_copy' ? 'Thread Copied!' : 'Copy All 5 Tweets'}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {brandProfiles.TWITTER.firstThread.map((t, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex gap-2">
                        <div className="text-sky-400 font-bold shrink-0">{idx + 1}/5</div>
                        <div className="flex-1">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LINKEDIN COMPANY BLUEPRINT */}
          {selectedPlatform === 'LINKEDIN' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-blue-400 flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      <span>Company Profile Specifications</span>
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Organization
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Company Name:</div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 mt-1 font-bold text-white flex items-center justify-between">
                        <span>{brandProfiles.LINKEDIN.name}</span>
                        <button onClick={() => handleCopy(brandProfiles.LINKEDIN.name, 'li_name')} className="text-cyan-400">
                          {copiedKey === 'li_name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Company Tagline (max 120 chars):</div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 mt-1 text-slate-200 leading-snug flex items-center justify-between gap-2">
                        <span>{brandProfiles.LINKEDIN.tagline}</span>
                        <button onClick={() => handleCopy(brandProfiles.LINKEDIN.tagline, 'li_tag')} className="text-cyan-400 shrink-0">
                          {copiedKey === 'li_tag' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase">Industry:</div>
                        <div className="text-[11px] font-bold text-slate-200 mt-0.5">FinTech & Blockchain</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase">Company Size:</div>
                        <div className="text-[11px] font-bold text-slate-200 mt-0.5">11-50 employees</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center justify-between">
                        <span>Specialties (Tags):</span>
                        <button onClick={() => handleCopy(brandProfiles.LINKEDIN.specialties, 'li_specs')} className="text-cyan-400 text-[10px]">
                          {copiedKey === 'li_specs' ? 'Copied!' : 'Copy Tags'}
                        </button>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 mt-1 text-slate-300 text-[11px]">
                        {brandProfiles.LINKEDIN.specialties}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banner Asset for LinkedIn */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>LinkedIn Cover Banner (1584x396 Spec)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDownloadAsset('/aurax_brand_banner.jpg', 'aurax_linkedin_cover_banner.jpg')}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[4/1] bg-slate-900">
                    <img src="/aurax_brand_banner.jpg" alt="AuraX LinkedIn Cover Banner" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed About Us & First Corporate Launch Article */}
              <div className="lg:col-span-7 space-y-4">
                {/* About Us Section */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-white font-bold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span>Complete LinkedIn "About Us" Overview</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(brandProfiles.LINKEDIN.aboutUs, 'li_about')}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedKey === 'li_about' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'li_about' ? 'Copied!' : 'Copy About Us'}</span>
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={brandProfiles.LINKEDIN.aboutUs}
                    rows={8}
                    className="w-full bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed resize-none focus:outline-none select-all font-mono"
                  />
                </div>

                {/* First Company Announcement Post */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>First Corporate Announcement Post</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(brandProfiles.LINKEDIN.firstPost, 'li_post')}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedKey === 'li_post' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'li_post' ? 'Copied!' : 'Copy Launch Post'}</span>
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={brandProfiles.LINKEDIN.firstPost}
                    rows={7}
                    className="w-full bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed resize-none focus:outline-none select-all font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* FACEBOOK BLUEPRINT */}
          {selectedPlatform === 'FACEBOOK' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-2">
                      <Facebook className="w-4 h-4" />
                      <span>Facebook Page Setup Blueprint</span>
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Community
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Page Name:</div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 mt-1 font-bold text-white flex items-center justify-between">
                        <span>{brandProfiles.FACEBOOK.name}</span>
                        <button onClick={() => handleCopy(brandProfiles.FACEBOOK.name, 'fb_name')} className="text-cyan-400">
                          {copiedKey === 'fb_name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Category:</div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 mt-1 text-slate-300">
                        {brandProfiles.FACEBOOK.category}
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center justify-between">
                        <span>Bio (101 characters):</span>
                        <button onClick={() => handleCopy(brandProfiles.FACEBOOK.bio, 'fb_bio')} className="text-cyan-400 text-[10px]">
                          {copiedKey === 'fb_bio' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 mt-1 text-slate-200">
                        {brandProfiles.FACEBOOK.bio}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase">Primary Action Button:</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5">"Use App" &rarr; https://econos-aistudio-update.vercel.app</div>
                    </div>
                  </div>
                </div>

                {/* Banner Asset for Facebook */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Facebook Cover Graphic (820x312 Spec)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDownloadAsset('/aurax_brand_banner.jpg', 'aurax_facebook_cover.jpg')}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] bg-slate-900">
                    <img src="/aurax_brand_banner.jpg" alt="AuraX Facebook Cover Banner" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Story & Welcome Post */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-white font-bold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <span>Facebook Page "Our Story" / About</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(brandProfiles.FACEBOOK.aboutStory, 'fb_story')}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedKey === 'fb_story' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'fb_story' ? 'Copied!' : 'Copy Story'}</span>
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={brandProfiles.FACEBOOK.aboutStory}
                    rows={8}
                    className="w-full bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed resize-none focus:outline-none select-all font-mono"
                  />
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>First Welcome Post</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(brandProfiles.FACEBOOK.firstPost, 'fb_post')}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedKey === 'fb_post' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'fb_post' ? 'Copied!' : 'Copy First Post'}</span>
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={brandProfiles.FACEBOOK.firstPost}
                    rows={7}
                    className="w-full bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed resize-none focus:outline-none select-all font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: EXCLUSIVE FEATURES THAT NO OTHER BLOCKCHAIN HAS                  */}
      {/* ========================================================================= */}
      {activeMainTab === 'EXCLUSIVE_FEATURES' && (
        <div className="space-y-6 animate-in fade-in duration-200 font-mono">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-black text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>The Unmatched AuraX Sovereign Layer-1 Invariant Matrix</span>
              </div>
              <p className="text-xs text-slate-400">
                These 6 architectural breakthroughs do NOT exist on Ethereum, Solana, Bitcoin, or any other chain.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const matrixText = unmatchedFeatures.map(f => `${f.title}\n• Flaw in other chains: ${f.vsCompetitors}\n• The AuraX Solution: ${f.auraXSecret}\n• User Benefit: ${f.benefit}`).join('\n\n');
                handleCopy(matrixText, 'matrix_all');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm shrink-0"
            >
              {copiedKey === 'matrix_all' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'matrix_all' ? 'Copied Full Matrix!' : 'Copy Full Comparison Matrix'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unmatchedFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-bold text-white tracking-tight">{feat.title}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                        {feat.badge}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-900/30 text-[11px] text-rose-300 leading-snug">
                      <strong className="text-rose-400 font-bold block mb-0.5">❌ Why other chains fail:</strong>
                      {feat.vsCompetitors}
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-[11px] text-emerald-300 leading-snug">
                      <strong className="text-emerald-400 font-bold block mb-0.5">✅ The AuraX Breakthrough:</strong>
                      {feat.auraXSecret}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Impact: <strong className="text-cyan-300">{feat.benefit}</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopy(`${feat.title}\nProblem with others: ${feat.vsCompetitors}\nAuraX Breakthrough: ${feat.auraXSecret}`, feat.id)}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {copiedKey === feat.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === feat.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: VIRAL TESTNET POSTS & SHORT LINKS                                */}
      {/* ========================================================================= */}
      {activeMainTab === 'VIRAL_POSTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          {/* Left Column (5 cols): Chain Visual Graphic & Clean Link */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Official Chain Visual Asset</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  16:9 Ultra-HD
                </span>
              </div>

              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 group shadow-lg aspect-video bg-slate-900">
                <img
                  src="/aurax_chain_visual.jpg"
                  alt="AuraX Sovereign Layer-1 Blockchain Promotional Graphic"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/aurax_chain_visual_1790672021044.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold drop-shadow">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>AuraX Sovereign L1 Matrix</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-black/60 text-slate-300 text-[10px] backdrop-blur-xs">
                    Zero-Fraud PoY
                  </span>
                </div>
              </div>

              {/* Action Bar for Image */}
              <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => handleDownloadAsset('/aurax_chain_visual.jpg', 'aurax_layer1_blockchain_visual.jpg')}
                  className="flex-1 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image Banner</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.open('/aurax_chain_visual.jpg', '_blank')}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  title="View Full Resolution"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Direct Official Link Card */}
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Official Direct Invite Link (Zero Redirect)</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Instant Load
                </span>
              </div>

              {/* Link Display with 1-Click Copy */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 text-cyan-300 text-xs break-all border border-slate-800">
                <span className="flex-1 font-bold select-all truncate text-[11px] text-cyan-300">
                  {activeLink}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(activeLink, 'short_link')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 cursor-pointer transition shrink-0"
                  title="Copy Direct Official Link"
                >
                  {copiedKey === 'short_link' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>Code: <strong className="text-amber-300">{cleanCode}</strong></span>
                <span className="text-emerald-400 font-semibold">+100 $AURX for your referee</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Post Templates & Copy Kit */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">Choose Post Narrative:</span>
              <div className="flex gap-1.5">
                {[
                  { id: 'VIRAL_AIRDROP', label: '🔥 Viral Airdrop', icon: Flame },
                  { id: 'TECH_L1', label: '⚙️ Deep-Tech L1 Spec', icon: Layers },
                  { id: 'TWITTER_PUNCHY', label: '🐦 𝕏 Punchy', icon: Sparkles }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTemplate(t.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                      selectedTemplate === t.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Ready-To-Publish Announcement</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">
                    {templates[selectedTemplate].length} chars
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(templates[selectedTemplate], 'full_post')}
                    className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    {copiedKey === 'full_post' ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Full Post</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={templates[selectedTemplate]}
                rows={11}
                className="w-full bg-transparent text-slate-200 font-mono text-xs leading-relaxed resize-none focus:outline-none select-all"
              />
            </div>

            {/* Quick Action Tags */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold text-[11px]">
                  High-Reach English Crypto Tags:
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(englishHashtags, 'tags_only')}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedKey === 'tags_only' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'tags_only' ? 'Tags Copied!' : 'Copy Tags Only'}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '#AuraX', '#Layer1', '#Blockchain', '#CryptoAirdrop', 
                  '#Testnet', '#Web3', '#Crypto', '#AirdropAlert', 
                  '#FreeCrypto', '#DeFi', '#Ethereum', '#Solana', '#EarnCrypto'
                ].map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-slate-900 text-cyan-300 border border-slate-800 text-[10px] font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: MEDIA ASSET SUITE & DOWNLOADS                                    */}
      {/* ========================================================================= */}
      {activeMainTab === 'MEDIA_ASSETS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200 font-mono">
          {/* Asset 1: Header Brand Banner */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <span>1. Official Social Header Banner</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                16:9 / 1500x500
              </span>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-900">
              <img src="/aurax_brand_banner.jpg" alt="AuraX Official Social Banner" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-slate-400">
              Perfect for Twitter / 𝕏 Header (1500x500), LinkedIn Company Banner (1584x396), and Facebook Page Cover (820x312).
            </p>
            <button
              type="button"
              onClick={() => handleDownloadAsset('/aurax_brand_banner.jpg', 'aurax_official_brand_banner.jpg')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Header Banner (HD)</span>
            </button>
          </div>

          {/* Asset 2: L1 Node Architecture Visual */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>2. Layer-1 Blockchain Matrix Visual</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Post Graphic
              </span>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-900">
              <img src="/aurax_chain_visual.jpg" alt="AuraX Layer-1 Visual" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-slate-400">
              Attach to announcement tweets, LinkedIn articles, and telegram broadcast channels to drive maximum visual click-throughs.
            </p>
            <button
              type="button"
              onClick={() => handleDownloadAsset('/aurax_chain_visual.jpg', 'aurax_layer1_visual.jpg')}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Chain Visual Graphic</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
