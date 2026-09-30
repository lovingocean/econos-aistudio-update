import React, { useState } from 'react';
import {
  X,
  Target,
  Users,
  DollarSign,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Send,
  Zap,
  ShieldCheck,
  Building,
  CreditCard,
  Wallet,
  ArrowRight,
  Flame,
  Globe2,
  Sliders,
  Calculator,
  MessageSquare,
  Award,
  Layers,
  ChevronRight,
  QrCode
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BillionDollarBuyerFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPricing?: () => void;
}

export const BillionDollarBuyerFunnelModal: React.FC<BillionDollarBuyerFunnelModalProps> = ({
  isOpen,
  onClose,
  onOpenPricing
}) => {
  const { user, currentOrg, refreshSubscription } = useAuth();
  const [activeTab, setActiveTab] = useState<'BUYER_PERSONAS' | 'ROI_CALCULATOR' | 'PITCH_GENERATOR' | 'INSTANT_CHECKOUT'>('ROI_CALCULATOR');
  
  // ROI Calculator State
  const [buyerType, setBuyerType] = useState<'B2B_BUSINESS' | 'QUANT_TRADER' | 'FAMILY_OFFICE'>('B2B_BUSINESS');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(85000);
  const [manualAccountantCost, setManualAccountantCost] = useState<number>(4500);
  const [reconciliationDelayDays, setReconciliationDelayDays] = useState<number>(14);
  
  // Trader Calculator State
  const [tradingCapital, setTradingCapital] = useState<number>(10000);
  const [targetWinRate, setTargetWinRate] = useState<number>(62);
  const [selectedChallengeTier, setSelectedChallengeTier] = useState<number>(100000);

  // Pitch Generator State
  const [targetName, setTargetName] = useState<string>('Alex');
  const [targetCompany, setTargetCompany] = useState<string>('Apex Growth Agency');
  const [pitchChannel, setPitchChannel] = useState<'TWITTER' | 'LINKEDIN' | 'COLD_EMAIL' | 'WHATSAPP'>('LINKEDIN');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Instant Checkout State
  const [selectedCheckoutProduct, setSelectedCheckoutProduct] = useState<{
    id: string;
    title: string;
    price: number;
    billingPeriod: string;
    description: string;
    features: string[];
    badge: string;
  }>({
    id: 'AICFO_PRO',
    title: 'ECONOS AI CFO & Autonomous Close',
    price: 199,
    billingPeriod: '/month',
    description: 'Autonomous daily ledger reconciliation, 50-scenario stress studio & real-time board decks.',
    features: ['Continuous Real-Time Close', 'ASC 606 Revenue Engine', 'AI CFO Daily Intelligence', 'Multi-Bank Aggregation'],
    badge: 'Most Popular for SMBs'
  });
  const [paymentCurrency, setPaymentCurrency] = useState<'CARD' | 'USDC_BASE' | 'AURX_TOKEN'>('USDC_BASE');
  const [isProcessingCheckout, setIsProcessingCheckout] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
  const [generatedLicenseKey, setGeneratedLicenseKey] = useState<string>('');

  if (!isOpen) return null;

  const officialDomain = 'https://econos-aistudio-update.vercel.app';
  const referralCode = 'VIP-PARTNER';
  const directLink = `${officialDomain}/?ref=${referralCode}`;
  const OFFICIAL_TREASURY_ADDRESS = '0x095871Cfed26b28f03e409AE612c0A5F1e1726cD';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Calculations
  const annualAccountantCost = manualAccountantCost * 12;
  const estimatedLeakageDetected = Math.round(monthlyRevenue * 0.038 * 12);
  const econosAnnualCost = 199 * 12;
  const totalB2BSavings = annualAccountantCost + estimatedLeakageDetected - econosAnnualCost;
  const b2bRoiMultiple = ((totalB2BSavings / econosAnnualCost) * 100).toFixed(0);

  // Trader Calculations
  const fundedPotentialMonthlyPayout = Math.round(selectedChallengeTier * 0.08 * 0.85); // 8% profit with 85% split
  const leverageMultiplier = (selectedChallengeTier / tradingCapital).toFixed(1);

  // Pitches
  const generatePitchText = () => {
    if (pitchChannel === 'LINKEDIN') {
      return `Hey ${targetName}, noticed your rapid scale at ${targetCompany}. Most leadership teams lose 12-15 days every month-end just manually chasing invoices and bank reconciliations.

We engineered ECONOS — an autonomous AI CFO operating system that closes your books daily, detects duplicate payables, and generates investor-ready P&L in real time: ${directLink}

Curious to see what your financial leakage score looks like? You can run a zero-friction 3-minute audit directly in the live terminal.`;
    }
    if (pitchChannel === 'TWITTER') {
      return `Hey @${targetName || 'trader'}, saw your setups on the feed. Most prop firms keep 100% of your evaluation fees and trade against you.

AuraX is the first protocol that automatically burns 30% of challenge fees from the open market, permanently reducing $AURX supply while giving you up to $200K in funded capital with 85/15 splits.

Check out the live terminal & test your strategy: ${directLink}`;
    }
    if (pitchChannel === 'COLD_EMAIL') {
      return `Subject: Financial close automation for ${targetCompany} (${b2bRoiMultiple}% ROI estimate)

Hi ${targetName},

I was reviewing companies in your sector and noticed how fast ${targetCompany} is scaling. At your current volume, traditional accounting workflows typically suffer from 2-3 weeks of reporting lag and an average of $${(estimatedLeakageDetected / 12).toLocaleString()}/month in uncaptured supplier discounts and invoice discrepancies.

We built ECONOS — an autonomous financial operating system featuring:
1. Continuous 24/7 ledger close with multi-bank sync
2. 50-Scenario macro stress studio & 90-day cash runway
3. AI CFO executive briefing straight to your inbox daily

You can test our live terminal and run an automated financial audit here:
${directLink}

Best regards,
AuraX & ECONOS Enterprise Team`;
    }
    return `Hi ${targetName}! Join the AuraX & ECONOS institutional financial terminal. We provide autonomous AI financial operations and up to $200K funded trading accounts with transparent on-chain buyback-and-burns: ${directLink}`;
  };

  const handleSimulatePayment = () => {
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      const license = `AURX-ENT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setGeneratedLicenseKey(license);
      setCheckoutSuccess(true);
      if (refreshSubscription) {
        refreshSubscription().catch(() => {});
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0b1329] border border-cyan-500/40 rounded-3xl w-full max-w-5xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-[#0d1838] to-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AUTONOMOUS BUYER FUNNEL &amp; REVENUE ENGINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 font-mono">
              <span>Billion-Dollar Client Acquisition Studio</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                HIGH CONVERSION
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Attract high-intent buyers, calculate undeniable client ROI, dispatch 1-click personalized pitches, and collect instant payments.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer self-start sm:self-center border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto font-mono text-xs font-bold shrink-0">
          {[
            { id: 'ROI_CALCULATOR', label: '🧮 Interactive ROI & Leakage Audit', icon: Calculator },
            { id: 'BUYER_PERSONAS', label: '🎯 Target High-Paying Personas (ICP)', icon: Target },
            { id: 'PITCH_GENERATOR', label: '📨 1-Click Omnichannel Pitch Generator', icon: MessageSquare },
            { id: 'INSTANT_CHECKOUT', label: '💳 Direct Multi-Currency Checkout', icon: CreditCard }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: INTERACTIVE ROI CALCULATOR (CONVERSION MAGNET) */}
          {activeTab === 'ROI_CALCULATOR' && (
            <div className="space-y-6 font-mono">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Instant Client Value Diagnostic (Show Them The Numbers)</span>
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    Prospects buy when the economic gain mathematically exceeds the price. Adjust the parameters below to witness their exact return.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBuyerType('B2B_BUSINESS')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      buyerType === 'B2B_BUSINESS' ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    B2B Founder / CFO
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyerType('QUANT_TRADER')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      buyerType === 'QUANT_TRADER' ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Prop / Quant Trader
                  </button>
                </div>
              </div>

              {buyerType === 'B2B_BUSINESS' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Sliders */}
                  <div className="lg:col-span-6 space-y-5 bg-slate-950 p-6 rounded-3xl border border-slate-800">
                    <h4 className="text-xs uppercase text-slate-400 font-bold border-b border-slate-800 pb-2 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-cyan-400" />
                      <span>Input Business Parameters:</span>
                    </h4>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-300">Monthly Gross Revenue:</span>
                        <span className="text-cyan-400 font-bold">${monthlyRevenue.toLocaleString()} / mo</span>
                      </div>
                      <input
                        type="range"
                        min={10000}
                        max={1000000}
                        step={5000}
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-300">Current Monthly Accounting/CFO Cost:</span>
                        <span className="text-amber-400 font-bold">${manualAccountantCost.toLocaleString()} / mo</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={25000}
                        step={500}
                        value={manualAccountantCost}
                        onChange={(e) => setManualAccountantCost(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-300">Month-End Close Lag:</span>
                        <span className="text-purple-400 font-bold">{reconciliationDelayDays} Days</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={30}
                        step={1}
                        value={reconciliationDelayDays}
                        onChange={(e) => setReconciliationDelayDays(Number(e.target.value))}
                        className="w-full accent-purple-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right Column: Calculated Results */}
                  <div className="lg:col-span-6 space-y-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-cyan-500/40 shadow-xl">
                    <div className="text-[10px] uppercase text-cyan-300 font-bold tracking-wider">
                      ECONOS Annual Financial Impact
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Leakage &amp; Waste Stopped</div>
                        <div className="text-lg font-black text-amber-400 mt-0.5">${estimatedLeakageDetected.toLocaleString()}</div>
                        <div className="text-[9px] text-slate-500">Duplicate bills, missed discounts</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Manual Labor Replaced</div>
                        <div className="text-lg font-black text-emerald-400 mt-0.5">${annualAccountantCost.toLocaleString()}</div>
                        <div className="text-[9px] text-slate-500">Autonomous ledger sync</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/40 text-center space-y-1">
                      <div className="text-[11px] text-emerald-300 font-bold uppercase">Net Annual Cash Flow Retained:</div>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        +${totalB2BSavings.toLocaleString()}
                      </div>
                      <div className="text-xs font-bold text-emerald-400">
                        {b2bRoiMultiple}% Documented Return on Subscription ($199/mo)
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCheckoutProduct({
                          id: 'AICFO_PRO',
                          title: 'ECONOS AI CFO Enterprise',
                          price: 199,
                          billingPeriod: '/month',
                          description: 'Complete autonomous accounting, AI CFO briefings, and ASC 606 revenue recognition.',
                          features: ['Zero-day continuous close', '3-Way Procure-to-pay check', 'AI CFO copilot', 'Unlimited bank sync'],
                          badge: 'Recommended for High ROI'
                        });
                        setActiveTab('INSTANT_CHECKOUT');
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                    >
                      <span>Lock In ${totalB2BSavings.toLocaleString()} Annual Savings &rarr; Activate Now</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Trader View */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-6 space-y-5 bg-slate-950 p-6 rounded-3xl border border-slate-800">
                    <h4 className="text-xs uppercase text-slate-400 font-bold border-b border-slate-800 pb-2 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-cyan-400" />
                      <span>Trader Capital &amp; Challenge Level:</span>
                    </h4>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-300">Your Current Personal Trading Balance:</span>
                        <span className="text-cyan-400 font-bold">${tradingCapital.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={50000}
                        step={1000}
                        value={tradingCapital}
                        onChange={(e) => setTradingCapital(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="text-xs text-slate-300 mb-2">Select Funded Challenge Tier:</div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { size: 25000, fee: 149 },
                          { size: 100000, fee: 599 },
                          { size: 200000, fee: 999 }
                        ].map(tier => (
                          <button
                            key={tier.size}
                            type="button"
                            onClick={() => setSelectedChallengeTier(tier.size)}
                            className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                              selectedChallengeTier === tier.size
                                ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="text-sm font-black text-amber-300">${tier.size.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400">${tier.fee} Fee</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-amber-500/40 shadow-xl">
                    <div className="text-[10px] uppercase text-amber-300 font-bold tracking-wider">
                      AuraX Prop Desk Capital Advantage
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Capital Leverage</div>
                        <div className="text-lg font-black text-cyan-400 mt-0.5">{leverageMultiplier}x Multiplier</div>
                        <div className="text-[9px] text-slate-500">Trade institutional funds</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Target Monthly Payout</div>
                        <div className="text-lg font-black text-emerald-400 mt-0.5">${fundedPotentialMonthlyPayout.toLocaleString()}</div>
                        <div className="text-[9px] text-slate-500">85% Profit split to trader</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 to-orange-950/50 border border-amber-500/40 text-center space-y-1">
                      <div className="text-[11px] text-amber-300 font-bold uppercase">Zero Counterparty Risk:</div>
                      <div className="text-xs text-slate-200 font-sans">
                        30% of challenge fees are automatically used to buyback and burn $AURX tokens on Base, deflationarily increasing the token's value.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCheckoutProduct({
                          id: `PROP_${selectedChallengeTier}`,
                          title: `AuraX $${selectedChallengeTier.toLocaleString()} Funded Challenge`,
                          price: selectedChallengeTier === 25000 ? 149 : selectedChallengeTier === 100000 ? 599 : 999,
                          billingPeriod: ' one-time',
                          description: `Institutional challenge with 85/15 profit split, zero time limit, and automatic token burn.`,
                          features: ['85% Trader Profit Split', 'No Time Limit', 'Whale Radar signals included', 'Instant Evaluation Account'],
                          badge: 'Instant Setup'
                        });
                        setActiveTab('INSTANT_CHECKOUT');
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
                    >
                      <span>Claim Your ${selectedChallengeTier.toLocaleString()} Challenge Account &rarr; Checkout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TARGET BUYER PERSONAS (ICP) */}
          {activeTab === 'BUYER_PERSONAS' && (
            <div className="space-y-6 font-mono">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    title: '1. Prop & Quant Traders',
                    ticket: '$99 - $999 Challenge Buys',
                    color: 'border-amber-500/40 bg-amber-950/10',
                    painPoint: 'Retail traders lack capital ($5K-$10K accounts cannot produce full-time income). They need $50K-$200K funded accounts and institutional latency.',
                    trigger: 'Tell them 30% of their fee is recycled into market-buying and burning $AURX, and they get 85% profit split with zero time limits.',
                    whereToFind: ['r/Forex & r/CryptoCurrency', 'FTMO / FundedNext Twitter discussions', 'Crypto Discord trading servers', 'TradingView community idea authors']
                  },
                  {
                    title: '2. SMB & Agency Founders',
                    ticket: '$199 - $999/mo SaaS Subscriptions',
                    color: 'border-cyan-500/40 bg-cyan-950/10',
                    painPoint: 'Paying $3,000-$8,000/mo for fractional CFOs or suffering through 15-day delayed month-end close. They are blind to their true daily cash runway.',
                    trigger: 'Pitch them the "Autonomous 12-Step Continuous Close" that eliminates manual reconciliations and delivers daily AI CFO briefings to their phone.',
                    whereToFind: ['LinkedIn "Founder" / "CEO" in Marketing/SaaS', 'Google Maps Scraper (local accounting & service firms)', 'Founder Slack groups & MicroConf', 'Crunchbase newly funded Seed/Series A startups']
                  },
                  {
                    title: '3. Web3 Treasuries & Family Offices',
                    ticket: '$2,500 - $15,000/mo Institutional Clear',
                    color: 'border-purple-500/40 bg-purple-950/10',
                    painPoint: 'Fear of MEV frontrunning, wallet-drainer phishing attacks, and fragmented cross-chain liquidity across Ethereum, Base, and Solana.',
                    trigger: 'AuraX Sovereign L1 silicon consensus with built-in Zero-Drainer Invariant and $142B monitored AUM on OMNIFIN rails.',
                    whereToFind: ['DAO Treasury leaders on Agora / Snapshot', 'Family Office wealth conferences', 'Web3 institutional telegram groups', 'Base ecosystem developer directories']
                  }
                ].map((persona, idx) => (
                  <div key={idx} className={`p-5 rounded-3xl border ${persona.color} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">{persona.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 font-bold">
                        {persona.ticket}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Their Pain Point:</span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">{persona.painPoint}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-300 uppercase font-bold">Why They Buy From You:</span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">{persona.trigger}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Where to message them:</span>
                      <ul className="text-[11px] text-slate-400 space-y-0.5">
                        {persona.whereToFind.map((w, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-cyan-400">&bull;</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PITCH GENERATOR */}
          {activeTab === 'PITCH_GENERATOR' && (
            <div className="space-y-6 font-mono">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-4 bg-slate-950 p-6 rounded-3xl border border-slate-800">
                  <h3 className="text-xs font-bold uppercase text-slate-400 pb-2 border-b border-slate-800">
                    Target Prospect Details:
                  </h3>
                  
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase block mb-1">Prospect Name / Handle:</label>
                    <input
                      type="text"
                      value={targetName}
                      onChange={(e) => setTargetName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase block mb-1">Company / Project / Niche:</label>
                    <input
                      type="text"
                      value={targetCompany}
                      onChange={(e) => setTargetCompany(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase block mb-1">Outreach Channel:</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'LINKEDIN', label: '💼 LinkedIn InMail' },
                        { id: 'TWITTER', label: '🐦 Twitter / 𝕏 DM' },
                        { id: 'COLD_EMAIL', label: '📧 Cold Email' },
                        { id: 'WHATSAPP', label: '💬 WhatsApp / TG' }
                      ].map(ch => (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => setPitchChannel(ch.id as any)}
                          className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                            pitchChannel === ch.id
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4 bg-slate-950 p-6 rounded-3xl border border-cyan-500/30">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs text-slate-400 font-bold uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Ready-To-Send Personalized Pitch</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(generatePitchText(), 'pitch_text')}
                      className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedKey === 'pitch_text' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Pitch</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap border border-slate-800 select-all">
                    {generatePitchText()}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    {pitchChannel === 'TWITTER' && (
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(generatePitchText())}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-2 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Twitter / 𝕏 Tweet Composer</span>
                      </a>
                    )}
                    {pitchChannel === 'LINKEDIN' && (
                      <a
                        href="https://www.linkedin.com/messaging/"
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open LinkedIn Messaging</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopy(directLink, 'invite_link')}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer ml-auto"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedKey === 'invite_link' ? 'Copied Link' : 'Copy Direct Link'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INSTANT MULTI-CURRENCY CHECKOUT & LICENSE ACTIVATOR */}
          {activeTab === 'INSTANT_CHECKOUT' && (
            <div className="space-y-6 font-mono">
              {checkoutSuccess ? (
                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-950 border border-emerald-500/50 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">License Activated Successfully!</h3>
                    <p className="text-xs text-slate-300 font-sans max-w-lg mx-auto">
                      Thank you for your purchase of <strong>{selectedCheckoutProduct.title}</strong>. Your license has been cryptographically recorded on-chain and assigned to your organization.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-md mx-auto space-y-1.5 text-left">
                    <div className="text-[10px] text-slate-400 uppercase">Cryptographic License Key:</div>
                    <div className="flex items-center justify-between text-xs text-emerald-300 font-bold select-all bg-slate-950 p-2.5 rounded-xl border border-emerald-500/30">
                      <span>{generatedLicenseKey}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(generatedLicenseKey, 'license_copy')}
                        className="text-cyan-400 hover:text-white"
                      >
                        {copiedKey === 'license_copy' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-500 pt-1">
                      Status: Active &bull; Tier: Enterprise Sovereign &bull; Expiry: 365 Days
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutSuccess(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Make Another Purchase
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition cursor-pointer shadow-md"
                    >
                      Access Unlocked Features Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Product Selection */}
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-xs font-bold uppercase text-slate-400 pb-2 border-b border-slate-800">
                      Select Paid License or Challenge Tier:
                    </h3>

                    <div className="space-y-3">
                      {[
                        {
                          id: 'AICFO_PRO',
                          title: 'ECONOS AI CFO Enterprise',
                          price: 199,
                          billingPeriod: '/month',
                          description: 'Continuous 24/7 close, ASC 606 revenue engine & automated board deck builder.',
                          features: ['Continuous Real-Time Close', 'ASC 606 GAAP Compliance', 'AI CFO Daily Intelligence', 'Unlimited Bank Sync'],
                          badge: 'B2B Top Choice'
                        },
                        {
                          id: 'PROP_100K',
                          title: 'AuraX $100K Funded Prop Challenge',
                          price: 599,
                          billingPeriod: ' one-time',
                          description: 'Institutional funded evaluation account with 85/15 profit split and automated token burn.',
                          features: ['85% Trader Profit Split', 'Zero Time Limit', 'Whale Radar signals included', 'Instant Evaluation Account'],
                          badge: 'Traders #1 Pick'
                        },
                        {
                          id: 'WHALE_RADAR_VIP',
                          title: 'Whale Radar & VIP Quant Alpha Pass',
                          price: 999,
                          billingPeriod: ' lifetime',
                          description: 'Instant mempool alerts for $500K+ whale moves and automated cash-and-carry delta neutral bot.',
                          features: ['Sub-second Whale Alerts', '26.8% Cash & Carry Bot', 'Private Telegram Alpha Bot', 'Institutional Orderbook'],
                          badge: 'Lifetime Access'
                        },
                        {
                          id: 'SOVEREIGN_NODE',
                          title: 'AuraX Sovereign Validator Node License',
                          price: 2499,
                          billingPeriod: '/year',
                          description: 'Full hardware validation node rights, priority clearing throughput, and 12.5% Proof-of-Yield.',
                          features: ['Hardware Invariant Consensus', 'Zero-Drainer Protection', '100k TPS Dedicated Lane', 'Direct Settlement Fees'],
                          badge: 'Institutional'
                        }
                      ].map(prod => (
                        <div
                          key={prod.id}
                          onClick={() => setSelectedCheckoutProduct(prod)}
                          className={`p-4 rounded-2xl border transition cursor-pointer ${
                            selectedCheckoutProduct.id === prod.id
                              ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-white">{prod.title}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
                                {prod.badge}
                              </span>
                            </div>
                            <div className="text-base font-black text-amber-300">
                              ${prod.price}
                              <span className="text-xs text-slate-400 font-normal">{prod.billingPeriod}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 font-sans mt-1">{prod.description}</p>
                          <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-300 font-sans flex-wrap">
                            {prod.features.map((f, i) => (
                              <span key={i} className="flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>{f}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Payment Gateway */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-6 rounded-3xl border border-cyan-500/30">
                    <h3 className="text-xs font-bold uppercase text-slate-400 pb-2 border-b border-slate-800">
                      Payment &amp; Activation Method:
                    </h3>

                    {/* Method Selector */}
                    <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setPaymentCurrency('USDC_BASE')}
                        className={`py-2 px-2 rounded-lg transition cursor-pointer text-center ${
                          paymentCurrency === 'USDC_BASE' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        USDC (Base)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentCurrency('AURX_TOKEN')}
                        className={`py-2 px-2 rounded-lg transition cursor-pointer text-center ${
                          paymentCurrency === 'AURX_TOKEN' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        $AURX (-20%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentCurrency('CARD')}
                        className={`py-2 px-2 rounded-lg transition cursor-pointer text-center ${
                          paymentCurrency === 'CARD' ? 'bg-indigo-500 text-white font-black' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Card / Stripe
                      </button>
                    </div>

                    {/* Payment Details Box */}
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Item:</span>
                        <span className="text-white font-bold">{selectedCheckoutProduct.title}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Total Price:</span>
                        <span className="text-lg font-black text-amber-400">
                          {paymentCurrency === 'AURX_TOKEN' ? (
                            <span>${(selectedCheckoutProduct.price * 0.8).toFixed(0)} (20% Off)</span>
                          ) : (
                            <span>${selectedCheckoutProduct.price}</span>
                          )}
                        </span>
                      </div>

                      {paymentCurrency === 'USDC_BASE' && (
                        <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                          <span className="text-slate-400 block text-[10px] uppercase">Official Protocol Receiving Vault (Base):</span>
                          <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800 text-[10px] text-cyan-300">
                            <span className="truncate">{OFFICIAL_TREASURY_ADDRESS}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(OFFICIAL_TREASURY_ADDRESS, 'treasury_addr')}
                              className="text-cyan-400 ml-2"
                            >
                              {copiedKey === 'treasury_addr' ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                          <span className="text-[10px] text-emerald-400 block">⚡ Instant zero-gas confirmation on Base Mainnet.</span>
                        </div>
                      )}

                      {paymentCurrency === 'AURX_TOKEN' && (
                        <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                          <div className="text-amber-300 text-xs font-bold">
                            Paid with $AURX: {(selectedCheckoutProduct.price * 0.8 / 1.00).toFixed(0)} $AURX
                          </div>
                          <p className="text-[10px] text-slate-400">
                            30% of this transaction is automatically routed to the burn address to permanently reduce total circulating supply.
                          </p>
                        </div>
                      )}

                      {paymentCurrency === 'CARD' && (
                        <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                          <input
                            type="text"
                            placeholder="Card Number: 4242 •••• •••• 4242"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                            defaultValue="4242 •••• •••• 4242"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                              defaultValue="12/28"
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                              defaultValue="888"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleSimulatePayment}
                      disabled={isProcessingCheckout}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
                    >
                      {isProcessingCheckout ? (
                        <>
                          <Zap className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Processing On-Chain License Issuance...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-slate-950" />
                          <span>Complete Order &amp; Activate License ($ {paymentCurrency === 'AURX_TOKEN' ? (selectedCheckoutProduct.price * 0.8).toFixed(0) : selectedCheckoutProduct.price})</span>
                        </>
                      )}
                    </button>

                    <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Encrypted SOC-2 Vault &bull; 14-Day Money-Back Guarantee</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
