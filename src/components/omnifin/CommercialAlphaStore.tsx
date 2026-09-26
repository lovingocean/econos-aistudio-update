import React, { useState, useEffect } from 'react';
import {
  Flame,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Wallet,
  CreditCard,
  Crown,
  BellRing,
  Volume2,
  VolumeX,
  ArrowRight,
  Sparkles,
  Bot,
  Activity,
  Layers,
  Award,
  DollarSign,
  PieChart,
  Percent,
  Sliders,
  Check,
  AlertCircle,
  HelpCircle,
  Clock,
  Target,
  Send,
  Lock,
  Unlock,
  Radio,
  BarChart3
} from 'lucide-react';

interface WhaleTransaction {
  id: string;
  timestamp: string;
  entityName: string;
  entityType: 'HEAVY_WHALE' | 'MARKET_MAKER' | 'INSTITUTIONAL_FUND' | 'SMART_MONEY';
  action: 'ACCUMULATING' | 'DUMPING' | 'COLD_STORAGE_INFLOW' | 'LEVERAGED_LONG';
  asset: string;
  amountUsd: number;
  tokensCount: string;
  txHash: string;
  urgency: 'HIGH' | 'EXTREME' | 'CRITICAL';
}

const INITIAL_WHALE_FEED: WhaleTransaction[] = [
  {
    id: 'WHALE-01',
    timestamp: '12s ago',
    entityName: 'Wintermute Strategic Alpha Cluster',
    entityType: 'MARKET_MAKER',
    action: 'ACCUMULATING',
    asset: 'ETH',
    amountUsd: 14250000,
    tokensCount: '5,420 ETH',
    txHash: '0x3a9f...89e2',
    urgency: 'CRITICAL'
  },
  {
    id: 'WHALE-02',
    timestamp: '48s ago',
    entityName: 'BlackRock iShares Bitcoin Reserve Vault',
    entityType: 'INSTITUTIONAL_FUND',
    action: 'COLD_STORAGE_INFLOW',
    asset: 'BTC',
    amountUsd: 48900000,
    tokensCount: '581 BTC',
    txHash: '0x7b12...c44d',
    urgency: 'HIGH'
  },
  {
    id: 'WHALE-03',
    timestamp: '2m ago',
    entityName: 'Top 100 GMX / Hyperliquid Smart Degen',
    entityType: 'SMART_MONEY',
    action: 'LEVERAGED_LONG',
    asset: 'SOL',
    amountUsd: 6800000,
    tokensCount: '48,200 SOL (20x)',
    txHash: '0x99e4...11b0',
    urgency: 'EXTREME'
  },
  {
    id: 'WHALE-04',
    timestamp: '5m ago',
    entityName: 'Jump Crypto Treasury Hot Wallet',
    entityType: 'MARKET_MAKER',
    action: 'ACCUMULATING',
    asset: 'BTC',
    amountUsd: 22100000,
    tokensCount: '262.5 BTC',
    txHash: '0x4f88...312e',
    urgency: 'HIGH'
  }
];

export const CommercialAlphaStore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'WHALE_RADAR' | 'CASH_CARRY_YIELD' | 'COPY_TRADING_BOT' | 'FUNDED_PROP_CHALLENGE' | 'VIP_PRICING'>('WHALE_RADAR');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [minWhaleFilter, setMinWhaleFilter] = useState<number>(5000000);
  const [whaleFeed, setWhaleFeed] = useState<WhaleTransaction[]>(INITIAL_WHALE_FEED);
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  // Cash & Carry Yield Simulator State
  const [cashCarryDeposit, setCashCarryDeposit] = useState<number>(25000);
  const [selectedYieldVenue, setSelectedYieldVenue] = useState<string>('HYPERLIQUID');
  const [isBotDeployed, setIsBotDeployed] = useState<boolean>(false);
  const [botAccruedYield, setBotAccruedYield] = useState<number>(142.85);

  // Prop Firm Challenge Selection
  const [selectedChallengeSize, setSelectedChallengeSize] = useState<number>(100000);
  const [hasActiveChallenge, setHasActiveChallenge] = useState<boolean>(true);
  const [challengePnL, setChallengePnL] = useState<number>(4820); // 4.82% out of 8% target

  // Checkout Modal State
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [checkoutProduct, setCheckoutProduct] = useState<{ title: string; price: number; period?: string }>({
    title: 'Omnifin Pro Quant VIP Pass',
    price: 149,
    period: '/month'
  });
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'CRYPTO_USDC' | 'SOLANA_PAY'>('CRYPTO_USDC');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);

  // Play notification beep sound when sound is enabled
  const playAlertSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.15); // E6
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext fallback
    }
  };

  // Simulate new whale transaction ticking every 15s
  useEffect(() => {
    const interval = setInterval(() => {
      const assets = ['BTC', 'ETH', 'SOL', 'AVAX', 'SUI'];
      const actions: WhaleTransaction['action'][] = ['ACCUMULATING', 'LEVERAGED_LONG', 'COLD_STORAGE_INFLOW'];
      const entities = [
        'Galaxy Digital Prime Flow',
        'Fidelity Wise Spot Vault',
        'Arthur Hayes Family Office',
        'Cumberland OTC Liquid Desk',
        'Jump Quantitative Liquidity Hub'
      ];
      const randomAsset = assets[Math.floor(Math.random() * assets.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomEntity = entities[Math.floor(Math.random() * entities.length)];
      const randomAmount = Math.floor(Math.random() * 35000000) + 2000000;

      const newTx: WhaleTransaction = {
        id: `WHALE-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: 'Just now',
        entityName: randomEntity,
        entityType: randomAmount > 20000000 ? 'HEAVY_WHALE' : 'MARKET_MAKER',
        action: randomAction,
        asset: randomAsset,
        amountUsd: randomAmount,
        tokensCount: `${(randomAmount / (randomAsset === 'BTC' ? 84000 : randomAsset === 'ETH' ? 2600 : 150)).toFixed(1)} ${randomAsset}`,
        txHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
        urgency: randomAmount > 15000000 ? 'CRITICAL' : 'HIGH'
      };

      setWhaleFeed(prev => [newTx, ...prev.slice(0, 9)]);
      playAlertSound();
    }, 14000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  // Simulate passive bot yield growth
  useEffect(() => {
    if (!isBotDeployed) return;
    const interval = setInterval(() => {
      setBotAccruedYield(prev => prev + 0.42);
    }, 3000);
    return () => clearInterval(interval);
  }, [isBotDeployed]);

  const handleCopyTx = (txHash: string) => {
    navigator.clipboard.writeText(txHash);
    setCopiedTx(txHash);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  const handleOpenCheckout = (title: string, price: number, period: string = '') => {
    setCheckoutProduct({ title, price, period });
    setIsPaymentSuccess(false);
    setShowCheckoutModal(true);
  };

  const handleExecutePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaymentSuccess(true);
    }, 1800);
  };

  // Yield venues data
  const yieldVenues = [
    { id: 'HYPERLIQUID', name: 'Hyperliquid DEX Perp', spotRate: 0, perpApr: 26.8, netApr: 26.8, risk: 'Zero Delta (Pure Hedged)' },
    { id: 'BYBIT', name: 'Bybit Institutional Basis', spotRate: 0, perpApr: 22.4, netApr: 22.4, risk: 'Zero Delta (Pure Hedged)' },
    { id: 'BINANCE', name: 'Binance VIP Cash & Carry', spotRate: 0, perpApr: 19.8, netApr: 19.8, risk: 'Zero Delta (Pure Hedged)' },
    { id: 'DERIBIT', name: 'Deribit Synthetic Reverse', spotRate: 0, perpApr: 17.5, netApr: 17.5, risk: 'Zero Delta (Pure Hedged)' }
  ];

  const currentYieldVenue = yieldVenues.find(v => v.id === selectedYieldVenue) || yieldVenues[0];
  const projectedYearlyReturnUsd = (cashCarryDeposit * currentYieldVenue.netApr) / 100;
  const projectedMonthlyReturnUsd = projectedYearlyReturnUsd / 12;

  return (
    <div className="bg-[#0b1322] border border-slate-800 rounded-3xl p-6 text-white font-mono text-xs shadow-2xl space-y-6">
      
      {/* 1. High-Converting Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-900 border border-purple-800/40 p-6 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-6 hidden lg:flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black text-emerald-300">14,820 Active VIP Subscribers</span>
          </div>
          <div className="text-[11px] text-slate-400">
            $4.2M+ In Monthly Yield &amp; PnL Distributed
          </div>
        </div>

        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Instant High-Alpha Monetization Suite</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
              Instant 1-Click Access
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
            The 4 Financial Products Every Pro Trader &amp; Fund Buys Immediately
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Whale wallet transaction radar, automated delta-neutral funding rate yield (26.8% APR), 1-click VIP copy-trading bots, and up to $250k funded trader evaluation challenges.
          </p>
        </div>
      </div>

      {/* 2. Interactive Product Surface Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2">
          {[
            { id: 'WHALE_RADAR', label: '1. Whale & Smart Money Radar', icon: Radio, highlight: true },
            { id: 'CASH_CARRY_YIELD', label: '2. Delta-Neutral Yield (26.8% APY)', icon: DollarSign, highlight: true },
            { id: 'COPY_TRADING_BOT', label: '3. 1-Click VIP Copy-Trading Bot', icon: Bot },
            { id: 'FUNDED_PROP_CHALLENGE', label: '4. Funded Trader Challenge ($25k-$250k)', icon: Award, highlight: true },
            { id: 'VIP_PRICING', label: '💎 VIP Access Plans', icon: Crown }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold transition cursor-pointer whitespace-nowrap text-xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : tab.highlight
                    ? 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/50 border border-purple-800/40'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleOpenCheckout('Omnifin Lifetime Alpha License', 499, 'One-time')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs hover:brightness-110 transition cursor-pointer shadow-md shrink-0"
        >
          <Crown className="w-3.5 h-3.5 fill-current" />
          <span>Unlock All VIP Alpha ($499)</span>
        </button>
      </div>

      {/* 3. PRODUCT 1: WHALE WALLET & SMART MONEY RADAR */}
      {activeTab === 'WHALE_RADAR' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="font-bold text-white text-sm">Real-Time Whale Inflow &amp; Smart Money Sniper</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                  Sub-Second Ingestion
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                Detects transactions over $1M from market makers (Jump, Wintermute) and institutional ETF custody vaults.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              {/* Min Size Filter */}
              <div className="flex items-center gap-1 text-[11px] bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-500">Min Size:</span>
                <select
                  value={minWhaleFilter}
                  onChange={(e) => setMinWhaleFilter(parseInt(e.target.value))}
                  className="bg-transparent text-cyan-300 font-bold focus:outline-hidden cursor-pointer"
                >
                  <option value={1000000} className="bg-slate-900">&gt; $1,000,000</option>
                  <option value={5000000} className="bg-slate-900">&gt; $5,000,000</option>
                  <option value={15000000} className="bg-slate-900">&gt; $15,000,000</option>
                </select>
              </div>

              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  soundEnabled
                    ? 'bg-purple-900/40 border-purple-600 text-purple-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
                title={soundEnabled ? 'Sound Alerts On' : 'Sound Alerts Muted'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleOpenCheckout('Whale Wallet Alert Webhook Feed', 79, '/month')}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition flex items-center gap-1.5 shadow-md"
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>Get SMS / Webhook Alerts</span>
              </button>
            </div>
          </div>

          {/* Whale Feed Cards */}
          <div className="space-y-2">
            {whaleFeed
              .filter(tx => tx.amountUsd >= minWhaleFilter)
              .map((tx, idx) => {
                const isAccumulating = tx.action === 'ACCUMULATING' || tx.action === 'LEVERAGED_LONG' || tx.action === 'COLD_STORAGE_INFLOW';
                return (
                  <div
                    key={`${tx.id}-${idx}`}
                    className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isAccumulating ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/80' : 'bg-rose-950/80 text-rose-400 border border-rose-800/80'
                      }`}>
                        {tx.asset}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-white text-xs">{tx.entityName}</span>
                          <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                            tx.urgency === 'CRITICAL' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {tx.action.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[10px] text-slate-500">{tx.timestamp}</span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span>Volume: <strong className="text-white">${(tx.amountUsd / 1000000).toFixed(2)}M USD</strong></span>
                          <span>Tokens: <strong className="text-cyan-300">{tx.tokensCount}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
                      <button
                        onClick={() => handleCopyTx(tx.txHash)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center gap-1 transition cursor-pointer text-[10px]"
                      >
                        {copiedTx === tx.txHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{tx.txHash}</span>
                      </button>

                      <button
                        onClick={() => alert(`Initiating 1-Click Copy-Trade following ${tx.entityName} on ${tx.asset}. Slippage limit: 5 bps.`)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition flex items-center gap-1 cursor-pointer shadow-md"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Copy Whale Order</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 4. PRODUCT 2: DELTA-NEUTRAL FUNDING RATE ARBITRAGE HARVESTER */}
      {activeTab === 'CASH_CARRY_YIELD' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Yield Configuration & Calculator */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-xs">Delta-Neutral Cash &amp; Carry Machine</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                0% Directional Risk
              </span>
            </div>

            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              Earn pure interest 24/7 with zero market exposure. The bot buys spot crypto and opens an identical 1x short perpetual swap to harvest perpetual funding rates.
            </p>

            {/* Venue Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-bold">Select Funding Rate Venue:</label>
              <div className="space-y-2">
                {yieldVenues.map(venue => (
                  <button
                    key={venue.id}
                    onClick={() => setSelectedYieldVenue(venue.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                      selectedYieldVenue === venue.id
                        ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-xs'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{venue.name}</div>
                      <div className="text-[10px] text-slate-400">{venue.risk}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-emerald-400 text-sm">+{venue.netApr}% APR</div>
                      <div className="text-[10px] text-slate-500">Paid Every 8h</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deposit Slider */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Capital Allocated:</span>
                <span className="text-cyan-300 font-black text-sm">${cashCarryDeposit.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="5000"
                value={cashCarryDeposit}
                onChange={(e) => setCashCarryDeposit(parseInt(e.target.value))}
                className="w-full accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$5,000 Min</span>
                <span>$250,000 Institutional Tier</span>
              </div>
            </div>

            {/* Deploy Button */}
            <button
              onClick={() => setIsBotDeployed(!isBotDeployed)}
              className={`w-full py-3.5 rounded-2xl font-black text-xs transition cursor-pointer shadow-lg flex items-center justify-center gap-2 ${
                isBotDeployed
                  ? 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950'
              }`}
            >
              {isBotDeployed ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{isBotDeployed ? 'Pause Arbitrage Harvester' : 'Deploy Automated Cash & Carry Bot'}</span>
            </button>
          </div>

          {/* Right Column: Projected Returns & Live Yield Accrual */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-bold text-white text-xs">Projected Cash &amp; Carry Performance</h3>

            {/* Return Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">Annual Yield (APY)</div>
                <div className="font-black text-emerald-400 text-lg sm:text-xl">+{currentYieldVenue.netApr}%</div>
                <div className="text-[10px] text-slate-500">Zero delta exposure</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">Monthly Passive Payout</div>
                <div className="font-black text-cyan-300 text-lg sm:text-xl">+${projectedMonthlyReturnUsd.toFixed(0)}</div>
                <div className="text-[10px] text-slate-500">Paid in USD-O / USDT</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 uppercase">12-Month Total Profit</div>
                <div className="font-black text-white text-lg sm:text-xl">+${projectedYearlyReturnUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <div className="text-[10px] text-emerald-400">Compounded auto-reinvest</div>
              </div>
            </div>

            {/* Live Bot Accrual Monitor */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isBotDeployed ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className="font-bold text-xs text-white">Live Vault Accrual Engine</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  isBotDeployed ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isBotDeployed ? 'HARVESTING LIVE YIELD' : 'STANDBY MODE'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between font-mono">
                <div>
                  <div className="text-[10px] text-slate-400">Total Accrued Cash Yield:</div>
                  <div className="font-black text-xl text-emerald-400 mt-0.5">
                    +${botAccruedYield.toFixed(2)} USD
                  </div>
                </div>
                <button
                  onClick={() => alert(`Claiming $${botAccruedYield.toFixed(2)} accrued yield directly to your Web3 wallet address!`)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer shadow-md"
                >
                  Claim Payout Now
                </button>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Hedged Spot Position:</span>
                  <span className="font-bold text-white">0.297 BTC ($25,000)</span>
                </div>
                <div className="flex justify-between">
                  <span>Short Perpetual Contract:</span>
                  <span className="font-bold text-white">-0.297 BTC-PERP</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Directional Price Risk:</span>
                  <span className="font-bold text-emerald-400">$0.00 (Perfect Hedge)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 5. PRODUCT 3: 1-CLICK VIP COPY-TRADING & WEBHOOK BOT */}
      {activeTab === 'COPY_TRADING_BOT' && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>Automated VIP Copy-Trading Bot &amp; Webhook Hub</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                  Directly connect Section 41 AI Signals to your Binance, Bybit, or OKX accounts, or auto-broadcast to your VIP Telegram &amp; Discord groups.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenCheckout('VIP Telegram Signal Webhook Bot', 69, '/month')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold transition flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Connect Telegram Bot</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'High-Confluence Macro Alpha (78.4% Win Rate)',
                horizon: '1-7 Days',
                monthlyPnl: '+24.8%',
                subscribers: '3,840 traders',
                risk: 'Moderate (Max 2% risk/trade)',
                autoExecute: true
              },
              {
                title: 'Intraday Order Book Microstructure Scalper',
                horizon: 'Minutes - Hours',
                monthlyPnl: '+38.2%',
                subscribers: '6,120 traders',
                risk: 'Active (Tight invalidation)',
                autoExecute: false
              },
              {
                title: 'Funding Rate & Basis Arbitrage Vault',
                horizon: 'Automated 24/7',
                monthlyPnl: '+2.1% / mo',
                subscribers: '4,860 traders',
                risk: 'Near-Zero (Delta neutral)',
                autoExecute: true
              }
            ].map((strategy, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      {strategy.horizon}
                    </span>
                    <span className="font-black text-emerald-400 text-sm">{strategy.monthlyPnl} 30d</span>
                  </div>
                  <div className="font-black text-white text-sm">{strategy.title}</div>
                  <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                    <div>Subscribers: <strong className="text-slate-200">{strategy.subscribers}</strong></div>
                    <div>Risk Guard: <strong className="text-slate-200">{strategy.risk}</strong></div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Activated copy-trading on ${strategy.title}! Real-time signals will execute with strict stop-losses.`)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-Click Auto-Copy Strategy</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PRODUCT 4: FUNDED TRADER PROP-FIRM CHALLENGE */}
      {activeTab === 'FUNDED_PROP_CHALLENGE' && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-800/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                    Highest Margin Retail Product
                  </span>
                  <span className="font-black text-white text-sm">Omnifin Funded Trader Evaluation</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans mt-1">
                  Pass our 2-step evaluation with the AI Intelligence Engine, get allocated up to <strong>$250,000 in real firm capital</strong>, and keep <strong>90% of all profits</strong>.
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase">Profit Split</span>
                <div className="font-black text-lg text-emerald-400">90% TRADER / 10% FIRM</div>
              </div>
            </div>
          </div>

          {/* Challenge Tier Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                size: 25000,
                price: 99,
                target: '$2,000 (8%)',
                maxLoss: '$2,500 (10%)',
                dailyLoss: '$1,250 (5%)',
                leverage: '10x',
                badge: 'Popular for Beginners'
              },
              {
                size: 100000,
                price: 299,
                target: '$8,000 (8%)',
                maxLoss: '$10,000 (10%)',
                dailyLoss: '$5,000 (5%)',
                leverage: '20x',
                badge: '🔥 Most Popular Choice'
              },
              {
                size: 250000,
                price: 699,
                target: '$20,000 (8%)',
                maxLoss: '$25,000 (10%)',
                dailyLoss: '$12,500 (5%)',
                leverage: '30x',
                badge: 'Institutional Pro'
              }
            ].map(tier => (
              <div
                key={tier.size}
                className={`p-5 rounded-3xl border transition space-y-4 flex flex-col justify-between cursor-pointer ${
                  selectedChallengeSize === tier.size
                    ? 'bg-blue-950/30 border-cyan-400 shadow-xl'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => setSelectedChallengeSize(tier.size)}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-cyan-300">{tier.badge}</span>
                    <span className="font-black text-white text-base">${tier.price}</span>
                  </div>

                  <div className="text-xl font-black text-white">
                    ${(tier.size / 1000)}k Capital Account
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Profit Target:</span>
                      <span className="font-bold text-emerald-400">{tier.target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Overall Drawdown:</span>
                      <span className="font-bold text-rose-400">{tier.maxLoss}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Daily Drawdown:</span>
                      <span className="font-bold text-slate-200">{tier.dailyLoss}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Profit Share:</span>
                      <span className="font-bold text-cyan-300">90% Payouts Every 14 Days</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenCheckout(`$${tier.size / 1000}k Funded Account Challenge Pass`, tier.price, 'One-time fee');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Buy Challenge Pass (${tier.price})</span>
                </button>
              </div>
            ))}
          </div>

          {/* Active Evaluation Progress Tracker */}
          {hasActiveChallenge && (
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white text-xs">Your Active Evaluation: $100k Account (Step 1 of 2)</span>
                </div>
                <span className="font-bold text-emerald-400 text-xs">
                  +${challengePnL.toLocaleString()} / $8,000 Target ({((challengePnL / 8000) * 100).toFixed(1)}%)
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${(challengePnL / 8000) * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Current Balance: <strong className="text-white">$104,820.00</strong></span>
                <span>Max Drawdown Buffer: <strong className="text-emerald-400">$9,820 remaining (Safe)</strong></span>
                <span>Evaluation Days: <strong className="text-white">6 / Unlimited</strong></span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 7. PRODUCT 5: VIP ACCESS TIERS & PRICING */}
      {activeTab === 'VIP_PRICING' && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-lg font-black text-white">Choose Your Omnifin Intelligence Tier</h3>
            <p className="text-xs text-slate-400 font-sans">
              Instant activation via Credit Card (Stripe) or Web3 Crypto (USDC/USDT on Base, Arbitrum, Solana).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Starter Plan */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div>
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Starter Alpha</div>
                  <div className="text-2xl font-black text-white mt-1">$49 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                </div>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Section 41 AI Market View Decisions</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Top 10 Major Crypto Feeds</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Alpha Post Publisher (X &amp; Telegram)</div>
                  <div className="flex items-center gap-2 text-slate-500"><AlertCircle className="w-3.5 h-3.5 shrink-0" /> No Whale Radar Alerts</div>
                  <div className="flex items-center gap-2 text-slate-500"><AlertCircle className="w-3.5 h-3.5 shrink-0" /> No Automated Copy-Trading</div>
                </div>
              </div>

              <button
                onClick={() => handleOpenCheckout('Starter Alpha Subscription', 49, '/month')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer text-xs"
              >
                Subscribe ($49/mo)
              </button>
            </div>

            {/* Pro Quant VIP Plan (Highlight) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-950/80 to-slate-900 border-2 border-purple-500 space-y-5 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-[10px] uppercase tracking-wider shadow-md">
                🔥 Most Popular Choice
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-purple-300 font-bold uppercase text-[10px]">Pro Quant VIP Desk</div>
                  <div className="text-2xl font-black text-white mt-1">$149 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                </div>

                <div className="space-y-2 text-[11px] text-slate-200">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Full 45-Section Confluence Radar</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Sub-Second Whale Inflow Sniping</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Automated Delta-Neutral Yield Machine</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 1-Click VIP Telegram &amp; Discord Bot</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Priority Support &amp; Discord Alpha Room</div>
                </div>
              </div>

              <button
                onClick={() => handleOpenCheckout('Pro Quant VIP Desk Pass', 149, '/month')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black transition cursor-pointer text-xs shadow-md"
              >
                Join Pro Quant Desk ($149/mo)
              </button>
            </div>

            {/* Lifetime Institutional Plan */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div>
                  <div className="text-amber-400 font-bold uppercase text-[10px]">Institutional Lifetime</div>
                  <div className="text-2xl font-black text-white mt-1">$499 <span className="text-xs text-slate-400 font-normal">one-time</span></div>
                </div>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Lifetime Unlimited Access (Zero Monthly Fees)</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Enterprise Prime Desk &amp; TWAP/VWAP Suite</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Free $100k Funded Challenge Voucher Included</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Direct API Key Webhooks for Trading Bots</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Founder's Telegram Private Group</div>
                </div>
              </div>

              <button
                onClick={() => handleOpenCheckout('Institutional Lifetime License', 499, 'One-time')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-black transition cursor-pointer text-xs shadow-md"
              >
                Buy Lifetime Pass ($499)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 8. INSTANT CHECKOUT MODAL (STRIPE / APPLE PAY / CRYPTO PAY) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0b1322] border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 text-white font-mono text-xs space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm">Instant VIP Checkout</h3>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {isPaymentSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-black text-white">Payment Successful &amp; Activated!</h4>
                <p className="text-xs text-slate-300 font-sans max-w-xs mx-auto">
                  Your license for <strong>{checkoutProduct.title}</strong> is active. All institutional features and webhook streams have been unlocked.
                </p>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition cursor-pointer shadow-md mt-2"
                >
                  Start Using VIP Alpha
                </button>
              </div>
            ) : (
              <>
                {/* Product Summary */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-xs">{checkoutProduct.title}</div>
                    <div className="text-[10px] text-slate-400">Instant Digital Delivery • Immediate Activation</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-base text-cyan-300">${checkoutProduct.price}</div>
                    <div className="text-[10px] text-slate-500">{checkoutProduct.period}</div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-bold">Select Payment Rail:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'CRYPTO_USDC', label: 'USDC / USDT', icon: Wallet, desc: 'Base / Arb' },
                      { id: 'SOLANA_PAY', label: 'Solana Pay', icon: Zap, desc: 'Instant 400ms' },
                      { id: 'CARD', label: 'Credit Card', icon: CreditCard, desc: 'Stripe 1-Click' }
                    ].map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                          paymentMethod === m.id
                            ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{m.label}</div>
                        <div className="text-[9px] text-slate-500">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {paymentMethod === 'CRYPTO_USDC' && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                    <div className="text-slate-400">Send exactly <strong className="text-white">${checkoutProduct.price} USDC</strong> to:</div>
                    <div className="font-mono text-cyan-300 text-[10px] break-all p-2 rounded bg-slate-900 border border-slate-800">
                      0x4f88921a9420b9e8432bc178829ef10c741e21b0
                    </div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Zero Gas fees on Base &amp; Arbitrum network</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'CARD' && (
                  <div className="space-y-2 text-[11px]">
                    <input
                      type="text"
                      placeholder="Card number (4242 •••• •••• 4242)"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="MM / YY" defaultValue="12/28" className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                      <input type="text" placeholder="CVC" defaultValue="888" className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleExecutePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming On-Chain Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Complete Purchase (${checkoutProduct.price})</span>
                    </>
                  )}
                </button>

                <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-bit Encrypted SSL • 30-Day Money-Back Guarantee</span>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
