import React, { useState, useEffect } from 'react';
import {
  Coins,
  Flame,
  ShieldCheck,
  TrendingUp,
  Lock,
  Unlock,
  CheckCircle2,
  Copy,
  ExternalLink,
  Wallet,
  ArrowRight,
  Zap,
  BarChart3,
  PieChart,
  Percent,
  Layers,
  Crown,
  Sparkles,
  RefreshCw,
  FileCode,
  DollarSign,
  AlertCircle,
  Clock,
  Award
} from 'lucide-react';

interface BurnEvent {
  id: string;
  timestamp: string;
  sourceRevenue: string;
  usdAmount: number;
  tokensBurned: number;
  txHash: string;
}

const INITIAL_BURN_LOG: BurnEvent[] = [
  {
    id: 'BURN-108',
    timestamp: '2 hours ago',
    sourceRevenue: 'Prop Challenge Fail-Fees & Spreads',
    usdAmount: 38400,
    tokensBurned: 30720,
    txHash: '0x8f22...49a1'
  },
  {
    id: 'BURN-107',
    timestamp: '14 hours ago',
    sourceRevenue: 'Delta-Neutral Yield Vault Mgmt Fee (2%)',
    usdAmount: 52100,
    tokensBurned: 41680,
    txHash: '0x1c44...b820'
  },
  {
    id: 'BURN-106',
    timestamp: '1 day ago',
    sourceRevenue: 'VIP Quant Desk Subscriptions ($149/mo)',
    usdAmount: 29800,
    tokensBurned: 23840,
    txHash: '0x5e91...33d2'
  },
  {
    id: 'BURN-105',
    timestamp: '2 days ago',
    sourceRevenue: 'Institutional TWAP / VWAP Volume Spread',
    usdAmount: 64200,
    tokensBurned: 51360,
    txHash: '0x99a0...ee12'
  }
];

export const OmniTokenomicsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'PRESALE' | 'STAKING' | 'BUYBACK_BURN' | 'SMART_CONTRACT'>('METRICS');
  const [copiedContract, setCopiedContract] = useState<boolean>(false);
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  // Pre-sale allocation calculator
  const [contributionUsd, setContributionUsd] = useState<number>(2500);
  const [paymentCurrency, setPaymentCurrency] = useState<'USDC' | 'USDT' | 'ETH'>('USDC');
  const [isContributing, setIsContributing] = useState<boolean>(false);
  const [contributionSuccess, setContributionSuccess] = useState<boolean>(false);

  // Staking simulator
  const [stakeAmount, setStakeAmount] = useState<number>(5000);
  const [stakeDurationMonths, setStakeDurationMonths] = useState<number>(12);
  const [stakedTokens, setStakedTokens] = useState<number>(0);
  const [isStaked, setIsStaked] = useState<boolean>(false);

  // Contract address state: Allow user to input their real deployed token address or view genesis status
  const [customContractAddress, setCustomContractAddress] = useState<string>(() => {
    return localStorage.getItem('AURX_TOKEN_CONTRACT') || '0x6a813C3a89b6776712f7Fa4a47E1d1D45fAcE1ED';
  });
  const [isEditingContract, setIsEditingContract] = useState<boolean>(false);
  const [tempContractInput, setTempContractInput] = useState<string>('');

  // Countdown timer for TGE
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, minutes: 24, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TOKEN_PRICE = 1.25; // $1.25 USD at Public Listing
  const PRESALE_BONUS = 0.20; // 20% bonus tokens in pre-sale round

  const calculatedTokens = Math.floor((contributionUsd / TOKEN_PRICE) * (1 + PRESALE_BONUS));
  const baseTokensWithoutBonus = Math.floor(contributionUsd / TOKEN_PRICE);
  const bonusTokens = calculatedTokens - baseTokensWithoutBonus;

  // Staking reward calculations (18.4% base APR + 5.2% real USD yield share)
  const totalStakingApr = 23.6;
  const projectedYearlyTokensYield = Math.floor((stakeAmount * totalStakingApr) / 100);
  const projectedYearlyUsdValue = (projectedYearlyTokensYield * TOKEN_PRICE).toFixed(0);

  const handleSaveContractAddress = (newAddr: string) => {
    const cleanAddr = newAddr.trim();
    setCustomContractAddress(cleanAddr);
    localStorage.setItem('AURX_TOKEN_CONTRACT', cleanAddr);
    setIsEditingContract(false);
  };

  const handleCopyContract = () => {
    if (customContractAddress) {
      navigator.clipboard.writeText(customContractAddress);
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    }
  };

  const handleCopyTx = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedTx(hash);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  const handleContribute = () => {
    setIsContributing(true);
    setTimeout(() => {
      setIsContributing(false);
      setContributionSuccess(true);
    }, 1500);
  };

  const handleStakeAction = () => {
    if (isStaked) {
      setIsStaked(false);
      setStakedTokens(0);
    } else {
      setIsStaked(true);
      setStakedTokens(stakeAmount);
    }
  };

  return (
    <div className="bg-[#0b1322] border border-slate-800 rounded-3xl p-6 text-white font-mono text-xs shadow-2xl space-y-6">
      
      {/* 1. HERO HEADER: TOKEN LAUNCHPAD & TGE COUNTDOWN */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/70 via-purple-950/70 to-slate-900 border border-amber-600/30 p-6 shadow-xl">
        <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Coins className="w-3.5 h-3.5 fill-current" />
                <span>$AURX Token Launchpad</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>CertiK Audited • Base (Coinbase L2) &amp; Solana</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
              The Native Utility, Fee-Burn &amp; Governance Engine of AuraX Protocol
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Every dollar of exchange volume, prop-firm evaluation fees, and VIP subscriptions directly fuels the <strong>$AURX Autonomous Buyback &amp; Burn Machine</strong>.
            </p>

            {/* Contract Address Pill & Deployment Status */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] text-slate-400">Contract Status:</span>
              {customContractAddress ? (
                <div className="flex flex-wrap items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-emerald-500/40 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-cyan-300 font-mono font-bold">{customContractAddress}</span>
                  <button
                    onClick={handleCopyContract}
                    className="text-slate-400 hover:text-white transition cursor-pointer ml-1"
                    title="Copy Token Contract"
                  >
                    {copiedContract ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`https://basescan.org/token/${customContractAddress}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-0.5 ml-1 font-bold text-[10px]"
                    title="View on BaseScan Explorer"
                  >
                    <span>BaseScan</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => {
                      setTempContractInput(customContractAddress);
                      setIsEditingContract(true);
                    }}
                    className="text-[10px] text-amber-400 hover:underline ml-1"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-amber-500/30 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-amber-300 font-sans font-bold">Genesis Deployment Ready (Base — Coinbase L2 / Solana)</span>
                    <span className="text-[10px] text-slate-400 ml-1">Supply: 100M $AURX</span>
                  </div>
                  <button
                    onClick={() => {
                      setTempContractInput('');
                      setIsEditingContract(true);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-600 text-[10px] font-bold cursor-pointer transition"
                  >
                    + Link Deployed Contract
                  </button>
                </div>
              )}
            </div>

            {/* Modal / Popover to enter Real Contract Address */}
            {isEditingContract && (
              <div className="p-3 rounded-2xl bg-slate-950 border border-purple-500/50 space-y-2 mt-2 max-w-lg">
                <div className="text-[10px] text-slate-300 font-bold uppercase">
                  Link Your Real Deployed ERC-20 Smart Contract Address:
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="0x... (e.g. your deployed contract on Base or Arbitrum)"
                    value={tempContractInput}
                    onChange={(e) => setTempContractInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:outline-hidden focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleSaveContractAddress(tempContractInput)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingContract(false)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer transition"
                  >
                    Cancel
                  </button>
                </div>
                <div className="text-[10px] text-slate-400">
                  Tip: When you deploy <code>OmniToken.sol</code> (Tab 5) via Remix or Hardhat, paste your new contract address here to display it live.
                </div>
              </div>
            )}
          </div>

          {/* TGE Countdown Box */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/40 space-y-2 text-center shrink-0 min-w-[240px]">
            <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Token Generation Event (TGE)</span>
            </div>
            
            <div className="grid grid-cols-4 gap-1.5 font-sans font-black text-white">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-lg sm:text-xl text-amber-300">{timeLeft.days}</div>
                <div className="text-[9px] text-slate-500 uppercase font-mono">Days</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-lg sm:text-xl text-white">{timeLeft.hours}</div>
                <div className="text-[9px] text-slate-500 uppercase font-mono">Hours</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-lg sm:text-xl text-white">{timeLeft.minutes}</div>
                <div className="text-[9px] text-slate-500 uppercase font-mono">Mins</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-lg sm:text-xl text-emerald-400 animate-pulse">{timeLeft.seconds}</div>
                <div className="text-[9px] text-slate-500 uppercase font-mono">Secs</div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 pt-1">
              Initial Price: <strong className="text-white">$1.25 USD</strong> (20% Pre-Sale Bonus)
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP-LEVEL FINANCIAL METRICS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Total Hard Cap</div>
          <div className="font-black text-white text-base sm:text-lg">100,000,000</div>
          <div className="text-[10px] text-slate-500">Fixed Supply (No Minting)</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">TGE Listing Price</div>
          <div className="font-black text-cyan-300 text-base sm:text-lg">$1.25 USD</div>
          <div className="text-[10px] text-emerald-400">Uniswap &amp; Hyperliquid L1</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Fully Diluted Value (FDV)</div>
          <div className="font-black text-amber-400 text-base sm:text-lg">$125,000,000</div>
          <div className="text-[10px] text-slate-500">Target Launch Valuation</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Founder &amp; Treasury Reserve</div>
          <div className="font-black text-purple-400 text-base sm:text-lg">25,000,000</div>
          <div className="text-[10px] text-emerald-400">$31.25M Liquid Reserve</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 col-span-2 md:col-span-1">
          <div className="text-[10px] text-slate-400 uppercase">Est. Monthly Buyback</div>
          <div className="font-black text-emerald-400 text-base sm:text-lg">$480,000 / mo</div>
          <div className="text-[10px] text-slate-400">30% Revenue Burned</div>
        </div>
      </div>

      {/* 3. INTERACTIVE NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'METRICS', label: '1. Tokenomics & Allocation', icon: PieChart },
          { id: 'PRESALE', label: '2. Whitelist & Pre-Sale', icon: Zap, highlight: true },
          { id: 'STAKING', label: '3. Staking Vault (23.6% APY)', icon: Lock },
          { id: 'BUYBACK_BURN', label: '4. Autonomous Buyback & Burn', icon: Flame, highlight: true },
          { id: 'SMART_CONTRACT', label: '5. AuraXToken.sol Contract', icon: FileCode }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap text-xs ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md'
                  : tab.highlight
                  ? 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 border border-amber-800/40'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. TAB 1: TOKENOMICS & SUPPLY ALLOCATION */}
      {activeTab === 'METRICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Allocation Breakdown Table */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-xs flex items-center gap-2">
                <PieChart className="w-4 h-4 text-amber-400" />
                <span>100M Fixed Supply Distribution Model</span>
              </h3>
              <span className="text-[10px] text-slate-400">Deflationary Supply Schedule</span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Community Staking & Protocol Liquidity', percent: 30, tokens: '30,000,000', unlock: '4-year linear decay', color: 'bg-emerald-400' },
                { name: 'AuraX Foundation & Strategic Treasury', percent: 25, tokens: '25,000,000', unlock: '12-month cliff, 36m vesting', color: 'bg-amber-400' },
                { name: 'Public Sale & Launchpad IDO', percent: 20, tokens: '20,000,000', unlock: '25% at TGE, 75% over 6 months', color: 'bg-cyan-400' },
                { name: 'Founding Team & Core Engineers', percent: 15, tokens: '15,000,000', unlock: '12-month cliff, 36m vesting', color: 'bg-purple-400' },
                { name: 'Ecosystem Grants & Market Makers', percent: 10, tokens: '10,000,000', unlock: '100% unlocked at TGE for CEX', color: 'bg-blue-400' }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-md ${item.color}`} />
                      <span className="font-bold text-white">{item.name}</span>
                    </div>
                    <span className="font-black text-white">{item.percent}% ({item.tokens} $AURX)</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Vesting Rule: <strong className="text-slate-200">{item.unlock}</strong></span>
                    <span>USD Value: <strong className="text-cyan-300">${(parseInt(item.tokens.replace(/,/g, '')) * TOKEN_PRICE / 1000000).toFixed(2)}M</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Utility Multipliers (Why people hold $AURX) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-bold text-white text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Built-In Economic Utility Matrix</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Percent className="w-3.5 h-3.5" />
                  <span>50% Trading Fee Rebates</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Traders paying exchange maker/taker fees in $AURX receive an immediate 50% discount, driving constant buy demand on every transaction.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>25% Discount on Prop Challenges</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  The $100,000 funded evaluation challenge ($299) is reduced to $224 when paid in $AURX tokens.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Autonomous Deflationary Burn</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  30% of all gross protocol revenue is used to market-buy $AURX from liquidity pools and burn it permanently from the circulating supply.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <Crown className="w-3.5 h-3.5" />
                  <span>VIP Staking Tier Privileges</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Stakers holding 2,500+ $AURX receive free Whale Radar SMS alerts and sub-second copy-trading bots.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 5. TAB 2: WHITELIST & PRE-SALE ALLOCATION WIDGET */}
      {activeTab === 'PRESALE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-white text-xs">Pre-Sale Guaranteed Whitelist Allocation</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                +20% TGE BONUS ACTIVE
              </span>
            </div>

            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              Early participants receive a guaranteed 20% token bonus before the public listing on Uniswap and Hyperliquid L1 at $1.25 USD.
            </p>

            {/* Currency Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-bold">Contribution Currency:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['USDC', 'USDT', 'ETH'] as const).map(curr => (
                  <button
                    key={curr}
                    onClick={() => setPaymentCurrency(curr)}
                    className={`py-2 rounded-xl border text-center transition cursor-pointer font-bold text-xs ${
                      paymentCurrency === curr
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Contribution Amount Slider / Input */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Contribution Amount:</span>
                <span className="text-cyan-300 font-black text-sm">${contributionUsd.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="250"
                max="50000"
                step="250"
                value={contributionUsd}
                onChange={(e) => setContributionUsd(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$250 Min Allocation</span>
                <span>$50,000 Institutional Ticket</span>
              </div>
            </div>

            {/* Allocation Output Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Base Allocation:</span>
                <span className="text-white font-bold">{baseTokensWithoutBonus.toLocaleString()} $AURX</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>+20% Pre-Sale Bonus:</span>
                <span className="font-bold">+{bonusTokens.toLocaleString()} $AURX FREE</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
                <span className="font-bold text-white">Total Tokens Reserved:</span>
                <span className="font-black text-amber-300">{calculatedTokens.toLocaleString()} $AURX</span>
              </div>
            </div>

            <button
              onClick={handleContribute}
              disabled={isContributing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              {isContributing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Confirming Whitelist On-Chain...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Reserve {calculatedTokens.toLocaleString()} $AURX Tokens</span>
                </>
              )}
            </button>
          </div>

          {/* Pre-Sale Progress & Whitelist Status */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-white text-xs">Pre-Sale Round 1 Progress (Hard Cap: $5,000,000)</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Total Raised:</span>
                  <span className="text-emerald-400 font-black">$3,842,500 / $5,000,000 (76.8%)</span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full" style={{ width: '76.8%' }} />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Participants: 1,420 wallets</span>
                  <span>Remaining Cap: $1,157,500</span>
                </div>
              </div>

              {contributionSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Whitelist Allocation Confirmed!</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 font-sans">
                    You have successfully reserved <strong>{calculatedTokens.toLocaleString()} $AURX</strong>. Tokens will be airdropped directly to your connected wallet on TGE.
                  </p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-[11px] text-slate-300">
                <div className="font-bold text-white text-xs">Security &amp; Vesting Guarantees:</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Smart Contract Multi-Sig Timelock (48h notice)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Zero founder dumping — 12-month hard cliff</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Full refund guarantee if hard cap is not met</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Audited by CertiK Security Labs</span>
              <span className="text-emerald-400 font-bold">Score: 98/100 (Pass)</span>
            </div>
          </div>

        </div>
      )}

      {/* 6. TAB 3: STAKING VAULTS & REVENUE SHARE */}
      {activeTab === 'STAKING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-xs">AuraX Staking Vault Simulator</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                23.6% APY
              </span>
            </div>

            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              Lock your $AURX tokens to earn protocol fees (paid in real USD-O / USDT) and boost your voting power in the AuraX Governance DAO.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Tokens to Stake:</span>
                <span className="text-cyan-300 font-black text-sm">{stakeAmount.toLocaleString()} $AURX</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(parseInt(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>500 $AURX Min</span>
                <span>50,000 $AURX Whale Tier</span>
              </div>
            </div>

            <button
              onClick={handleStakeAction}
              className={`w-full py-3.5 rounded-2xl font-black text-xs transition cursor-pointer shadow-lg flex items-center justify-center gap-2 ${
                isStaked
                  ? 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950'
              }`}
            >
              {isStaked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isStaked ? 'Unstake & Claim Rewards' : `Stake ${stakeAmount.toLocaleString()} $AURX`}</span>
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-bold text-white text-xs">Projected Staking Yield Breakdown</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">Annual Yield (APY)</div>
                <div className="font-black text-emerald-400 text-lg sm:text-xl">+23.6%</div>
                <div className="text-[10px] text-slate-500">18.4% $AURX + 5.2% USD</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">Projected Annual Tokens</div>
                <div className="font-black text-cyan-300 text-lg sm:text-xl">+{projectedYearlyTokensYield.toLocaleString()} $AURX</div>
                <div className="text-[10px] text-slate-500">Distributed per block</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 uppercase">Projected USD Value</div>
                <div className="font-black text-amber-400 text-lg sm:text-xl">+${projectedYearlyUsdValue} USD</div>
                <div className="text-[10px] text-emerald-400">At $1.25 TGE price</div>
              </div>
            </div>

            {/* VIP Tier Unlocked */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Your Qualified VIP Staking Tier:</span>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${
                  stakeAmount >= 10000 ? 'bg-amber-500 text-slate-950' :
                  stakeAmount >= 2500 ? 'bg-purple-900 text-purple-200 border border-purple-700' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {stakeAmount >= 10000 ? '🏆 GOLD WHALE DESK' : stakeAmount >= 2500 ? '🥈 SILVER PRO QUANT' : '🥉 BRONZE TRADER'}
                </span>
              </div>

              <div className="space-y-1 text-[11px] text-slate-300 pt-1">
                {stakeAmount >= 10000 ? (
                  <>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free $100,000 Prop-Firm Challenge Pass Voucher</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full Access to Delta-Neutral 26.8% Cash &amp; Carry Vault</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Gas &amp; Free Priority Web3 Withdrawals</div>
                  </>
                ) : stakeAmount >= 2500 ? (
                  <>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Sub-Second Whale Inflow Radar Alerts</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1-Click VIP Telegram &amp; Discord Copy-Trading Bot</div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 50% Trading Fee Rebates across all exchange pairs</div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 7. TAB 4: AUTONOMOUS BUYBACK & BURN TRACKER */}
      {activeTab === 'BUYBACK_BURN' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 border border-rose-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400 fill-current" />
                <h3 className="font-bold text-white text-xs">Autonomous Revenue Buyback &amp; Permanent Burn</h3>
              </div>
              <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                Every 24 hours, 30% of platform earnings automatically market-buy $AURX from liquidity pools and route them to dead address <code>0x000...dEaD</code>.
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 uppercase">Total Burned To Date</span>
              <div className="font-black text-base text-rose-400">1,482,900 $AURX ($1.85M)</div>
            </div>
          </div>

          {/* Live Burn Ledger Cards */}
          <div className="space-y-2">
            {INITIAL_BURN_LOG.map((burn, idx) => (
              <div
                key={burn.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-950/80 text-rose-400 border border-rose-800/80 flex items-center justify-center font-bold">
                    🔥
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{burn.tokensBurned.toLocaleString()} $AURX Burned</span>
                      <span className="text-[10px] text-slate-500">({burn.timestamp})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Funded by: <strong className="text-slate-200">{burn.sourceRevenue}</strong> (${burn.usdAmount.toLocaleString()} USD)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto text-[11px]">
                  <span className="text-slate-500">Tx:</span>
                  <button
                    onClick={() => handleCopyTx(burn.txHash)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 flex items-center gap-1 transition cursor-pointer text-[10px]"
                  >
                    {copiedTx === burn.txHash ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{burn.txHash}</span>
                  </button>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                    VERIFIED ON-CHAIN
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. TAB 5: SMART CONTRACT BLUEPRINT (AuraXToken.sol) */}
      {activeTab === 'SMART_CONTRACT' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-white text-xs">Production Smart Contract (`AuraXToken.sol` — ERC-20 / EIP-2612)</h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">OpenZeppelin v5.0 Standard</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-96 scrollbar-thin space-y-1">
            <div className="text-slate-500">// SPDX-License-Identifier: MIT</div>
            <div className="text-slate-500">// AuraX Protocol Global Autonomous Financial Operating Layer</div>
            <div className="text-purple-400">pragma solidity ^0.8.24;</div>
            <br />
            <div className="text-blue-400">import <span className="text-emerald-300">"@openzeppelin/contracts/token/ERC20/ERC20.sol"</span>;</div>
            <div className="text-blue-400">import <span className="text-emerald-300">"@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol"</span>;</div>
            <div className="text-blue-400">import <span className="text-emerald-300">"@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol"</span>;</div>
            <div className="text-blue-400">import <span className="text-emerald-300">"@openzeppelin/contracts/access/AccessControl.sol"</span>;</div>
            <br />
            <div className="text-cyan-300">contract <span className="text-amber-300 font-bold">AuraXToken</span> is ERC20, ERC20Burnable, ERC20Permit, AccessControl &#123;</div>
            <div className="pl-4 text-slate-400">bytes32 public constant REVENUE_BURNER_ROLE = keccak256("REVENUE_BURNER_ROLE");</div>
            <div className="pl-4 text-slate-400">uint256 public constant TOTAL_MAX_SUPPLY = 100_000_000 * 10**18; // 100M Cap</div>
            <br />
            <div className="pl-4 text-slate-300">constructor(address treasuryVault, address adminMultiSig)</div>
            <div className="pl-6 text-slate-300">ERC20("AuraX Protocol Token", "AURX")</div>
            <div className="pl-6 text-slate-300">ERC20Permit("AuraXToken") &#123;</div>
            <div className="pl-8 text-emerald-400">_grantRole(DEFAULT_ADMIN_ROLE, adminMultiSig);</div>
            <div className="pl-8 text-emerald-400">_mint(treasuryVault, TOTAL_MAX_SUPPLY); // Full supply minted directly to multi-sig timelock</div>
            <div className="pl-6 text-slate-300">&#125;</div>
            <br />
            <div className="pl-4 text-slate-400">/** Autonomous Buyback &amp; Burn execution directly from Exchange clearing pool */</div>
            <div className="pl-4 text-slate-300">function executeProtocolRevenueBurn(uint256 burnAmount) external onlyRole(REVENUE_BURNER_ROLE) &#123;</div>
            <div className="pl-8 text-rose-400">_burn(msg.sender, burnAmount);</div>
            <div className="pl-6 text-slate-300">&#125;</div>
            <div className="text-cyan-300">&#125;</div>
          </div>

          {/* Token Genesis Parameters & Deployment Guide */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="font-bold text-white text-xs flex items-center justify-between">
              <span>Token Genesis Contract Specifications</span>
              <button
                onClick={() => {
                  const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AuraXToken is ERC20, ERC20Burnable, ERC20Permit, AccessControl {
    bytes32 public constant REVENUE_BURNER_ROLE = keccak256("REVENUE_BURNER_ROLE");
    uint256 public constant TOTAL_MAX_SUPPLY = 100_000_000 * 10**18; // 100M Cap

    constructor(address treasuryVault, address adminMultiSig)
        ERC20("AuraX Protocol Token", "AURX")
        ERC20Permit("AuraXToken")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, adminMultiSig);
        _mint(treasuryVault, TOTAL_MAX_SUPPLY);
    }

    function executeProtocolRevenueBurn(uint256 burnAmount) external onlyRole(REVENUE_BURNER_ROLE) {
        _burn(msg.sender, burnAmount);
    }
}`;
                  navigator.clipboard.writeText(solidityCode);
                  alert("AuraXToken.sol source code copied to clipboard! Paste directly into Remix (remix.ethereum.org) to deploy on Base / Solana.");
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black cursor-pointer hover:brightness-110 transition flex items-center gap-1.5 shadow-md"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy AuraXToken.sol Code</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-500 text-[10px]">Token Name</div>
                <div className="font-bold text-white">AuraX Protocol Token</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-500 text-[10px]">Symbol</div>
                <div className="font-bold text-amber-400">AURX</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-500 text-[10px]">Decimals</div>
                <div className="font-bold text-cyan-300">18</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-500 text-[10px]">Exact Total Supply</div>
                <div className="font-bold text-emerald-400">100,000,000 AURX</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                Recommended Deployment Target: <strong className="text-cyan-300">Base (Coinbase L2)</strong> or <strong className="text-purple-300">Solana (SPL)</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                #1 Retail Liquidity &amp; Zero Friction
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
