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
  QrCode,
  Server,
  Terminal,
  Cpu,
  HardDrive,
  Play,
  Square,
  RefreshCw,
  Key,
  Search,
  Tag,
  FileText,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BaseScanTreasuryInspector } from './BaseScanTreasuryInspector';
import { SecondaryNodeMarketplace } from './SecondaryNodeMarketplace';
import { InstantAffiliateEngine } from './InstantAffiliateEngine';
import { InstitutionalProofOfReserves } from './InstitutionalProofOfReserves';
import { CorporateTaxInvoiceVault } from './CorporateTaxInvoiceVault';
import { AutonomousVoiceCloser } from './AutonomousVoiceCloser';

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
  const [activeTab, setActiveTab] = useState<
    'BUYER_PERSONAS' | 'ROI_CALCULATOR' | 'PITCH_GENERATOR' | 'INSTANT_CHECKOUT' | 'NODE_DELIVERY' | 'BASESCAN_PROOF' | 'SECONDARY_MARKET' | 'INSTANT_AFFILIATE' | 'PROOF_OF_RESERVES' | 'TAX_INVOICES' | 'VOICE_CLOSER'
  >('ROI_CALCULATOR');
  
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
  const [generatedLicenseKey, setGeneratedLicenseKey] = useState<string>('AURX-VAL-8824-A1B9-PRO');

  // Node Validator Delivery & Live Attestation Simulator State
  const [nodeDeliveryMethod, setNodeDeliveryMethod] = useState<'BROWSER_NODE' | 'DOCKER_VPS' | 'MANAGED_CLOUD'>('BROWSER_NODE');
  const [isNodeActive, setIsNodeActive] = useState<boolean>(false);
  const [nodeBlocksValidated, setNodeBlocksValidated] = useState<number>(142);
  const [nodeRewardsEarned, setNodeRewardsEarned] = useState<number>(18.42);
  const [nodeTpsRate, setNodeTpsRate] = useState<number>(1240);
  const [rewardWalletAddress, setRewardWalletAddress] = useState<string>('0x9fF60030aC1e02E1302D3aFa6CaDf347E3fbb97A');

  // Live in-browser attestation ticker
  React.useEffect(() => {
    if (!isNodeActive) return;
    const interval = setInterval(() => {
      setNodeBlocksValidated(prev => prev + 1);
      setNodeRewardsEarned(prev => +(prev + 0.14).toFixed(2));
      setNodeTpsRate(1200 + Math.floor(Math.random() * 280));
    }, 1200);
    return () => clearInterval(interval);
  }, [isNodeActive]);

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
      fetch('/api/node/treasury-inflows/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: selectedCheckoutProduct.title,
          productType: selectedCheckoutProduct.id === 'SOVEREIGN_NODE' ? 'NODE_LICENSE' : 'AI_CFO',
          amount: selectedCheckoutProduct.price,
          currency: paymentCurrency === 'AURX_TOKEN' ? 'AURX' : 'USDC'
        })
      }).catch(() => {});
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
            { id: 'INSTANT_CHECKOUT', label: '💳 Direct Multi-Currency Checkout', icon: CreditCard },
            { id: 'NODE_DELIVERY', label: '⚡ Node Delivery ($3,499) Hub', icon: Cpu },
            { id: 'SECONDARY_MARKET', label: '🔄 P2P Node Market (OTC)', icon: Tag },
            { id: 'INSTANT_AFFILIATE', label: '💸 20% Instant Affiliate ($700)', icon: Zap },
            { id: 'PROOF_OF_RESERVES', label: '🏛️ Multi-Sig & PoR Vault', icon: ShieldCheck },
            { id: 'BASESCAN_PROOF', label: '🔍 BaseScan Proofs (Tx Hashes)', icon: Search },
            { id: 'TAX_INVOICES', label: '📄 Corporate Tax Invoice (ASC 606)', icon: FileText },
            { id: 'VOICE_CLOSER', label: '📞 Autonomous Voice Closer AI', icon: PhoneCall }
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

                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    {selectedCheckoutProduct.id === 'SOVEREIGN_NODE' && (
                      <button
                        type="button"
                        onClick={() => {
                          setCheckoutSuccess(false);
                          setActiveTab('NODE_DELIVERY');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:brightness-110 text-white text-xs font-black transition cursor-pointer shadow-md flex items-center gap-1.5"
                      >
                        <Cpu className="w-4 h-4 text-cyan-200" />
                        <span>Launch Validator Node &amp; Setup Hub &rarr;</span>
                      </button>
                    )}
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
                          price: 3499,
                          billingPeriod: '/year',
                          description: 'Full hardware validation node rights, priority clearing throughput, and 12.5% Proof-of-Yield.',
                          features: ['Hardware Invariant Consensus', 'Zero-Drainer Protection', '100k TPS Dedicated Lane', 'Direct Settlement Fees'],
                          badge: '🔥 Tier 1: 142/500 Claimed (Next: $4,999)'
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
                        <div className="pt-2 border-t border-slate-800 space-y-2 text-[11px]">
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
                          
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400 font-bold uppercase flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                Recent BaseScan Inflows:
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveTab('BASESCAN_PROOF')}
                                className="text-cyan-400 hover:text-white font-bold"
                              >
                                View All Hashes &rarr;
                              </button>
                            </div>
                            <div className="space-y-1 text-[10px] text-slate-300 font-mono">
                              <div className="flex justify-between items-center bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
                                <span className="text-cyan-300">0x3f72...ef54</span>
                                <span className="text-slate-400 font-sans">Node #142</span>
                                <span className="text-emerald-400 font-bold">$2,499 USDC</span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
                                <span className="text-cyan-300">0x8b21...10c2</span>
                                <span className="text-slate-400 font-sans">Node #141</span>
                                <span className="text-emerald-400 font-bold">$2,499 USDC</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-emerald-400">
                            <span>⚡ Instant zero-gas confirmation on Base Mainnet.</span>
                            <a
                              href={`https://basescan.org/address/${OFFICIAL_TREASURY_ADDRESS}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:underline flex items-center gap-1"
                            >
                              <span>BaseScan ↗</span>
                            </a>
                          </div>
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

          {/* TAB 5: SOVEREIGN VALIDATOR NODE ($2,499) DELIVERY & ONBOARDING HUB */}
          {activeTab === 'NODE_DELIVERY' && (
            <div className="space-y-6 font-mono">
              {/* Header Explanation Banner */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-slate-950 border border-purple-500/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                      <Cpu className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white flex items-center gap-2">
                        <span>Sovereign Node License Delivery &amp; Setup Architecture</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          INSTANT FULFILLMENT
                        </span>
                      </h3>
                      <p className="text-xs text-slate-300 font-sans">
                        How is the $3,499/year license delivered? The buyer receives an on-chain cryptographic certificate, automated validator consensus rights, and 3 turnkey ways to run their node.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCheckoutProduct({
                        id: 'SOVEREIGN_NODE',
                        title: 'AuraX Sovereign Validator Node License',
                        price: 3499,
                        billingPeriod: '/year',
                        description: 'Full hardware validation node rights, priority clearing throughput, and 12.5% Proof-of-Yield.',
                        features: ['Hardware Invariant Consensus', 'Zero-Drainer Protection', '100k TPS Dedicated Lane', 'Direct Settlement Fees'],
                        badge: '🔥 Tier 1: 142/500 Claimed (Next: $4,999)'
                      });
                      setActiveTab('INSTANT_CHECKOUT');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black transition cursor-pointer shrink-0 shadow-md"
                  >
                    Purchase License ($3,499)
                  </button>
                </div>
              </div>

              {/* TIERED SCARCITY ENGINE & FOMO PROGRESS BAR */}
              <div className="p-5 rounded-3xl bg-slate-950 border border-amber-500/40 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        <span>Genesis Node Scarcity: 5,000 Hard Limit Cap</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      Node licenses are mathematically capped at 5,000 to protect validator yield. Prices increment automatically as tiers sell out.
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-white">142 / 500 Tier 1 Claimed</span>
                    <span className="text-[10px] text-emerald-400 block font-bold">358 Remaining at $3,499</span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Tier 1 Progress (Genesis 500)</span>
                    <span className="text-amber-400 font-bold">28.4% Sold Out</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-lg shadow-amber-500/30 transition-all duration-500"
                      style={{ width: '28.4%' }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-rose-300 font-sans font-bold flex items-center gap-1 pt-0.5">
                    <span>⚠️ Urgency Notice:</span>
                    <span className="text-slate-400 font-normal">
                      Once all 500 Tier 1 nodes are minted, Tier 2 automatically activates at <strong>$4,999 per node</strong> (+$1,500 price increase).
                    </span>
                  </div>
                </div>

                {/* 4-Tier Pricing Schedule */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
                  <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-center">
                    <div className="text-[10px] text-amber-300 font-bold uppercase">Tier 1: Genesis 500</div>
                    <div className="text-sm font-black text-white mt-0.5">$3,499</div>
                    <div className="text-[9px] text-emerald-400 font-bold mt-0.5">Active (142 Sold)</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center opacity-75">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Tier 2: 1,500 Nodes</div>
                    <div className="text-sm font-black text-slate-300 mt-0.5">$4,999</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Locked (Upcoming)</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center opacity-60">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Tier 3: 2,000 Nodes</div>
                    <div className="text-sm font-black text-slate-400 mt-0.5">$6,499</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Locked</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center opacity-40">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Tier 4: 1,000 Final</div>
                    <div className="text-sm font-black text-slate-500 mt-0.5">$8,999</div>
                    <div className="text-[9px] text-slate-600 mt-0.5">Final Scarcity</div>
                  </div>
                </div>
              </div>

              {/* BUYER DUE DILIGENCE CHECKLIST (WHAT SMART INVESTORS CHECK BEFORE BUYING) */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-[#0a1228] to-slate-950 border border-cyan-500/30 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Institutional Buyer Due Diligence Checklist (5 Verification Pillars)
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 1. Payback Period
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      <strong>~8 Months</strong> to recoup $3,499 via ~$420/mo USD-O micro-gas settlement fees. Months 9-12 are 100% net cash profit.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-bold text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 2. Zero-DevOps Setup
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Runs 1-click in browser, via 1-line script on a $10/mo VPS, or 100% turnkey managed by protocol foundation.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-bold text-purple-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 3. Contract Proof
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Deployed on Base Mainnet Block #51827528. <strong>Sourcify Exact Match Verified</strong> with CertiK audit scheduled Q4 2026.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-bold text-amber-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 4. Transferable NFT
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      ERC-721 tokenized license. Can be resold on secondary NFT marketplaces (OpenSea) for capital exit at any time.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-bold text-rose-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 5. Anti-Drainer Safe
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Silicon Hardware Consensus (1-PC = 1-Validator) with consensus-level Zero-Drainer Invariant intercepting malicious exploits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Row: Visual NFT Certificate & Live Profit Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Visual NFT-Style License Card */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-gradient-to-br from-[#0c142e] via-slate-950 to-[#120f2e] border border-cyan-500/40 shadow-2xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-black text-white uppercase tracking-wider">
                        Sovereign Genesis Node License (NFT Proof)
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      ACTIVE_ATTESTOR
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assigned Node ID:</span>
                      <span className="text-cyan-300 font-bold">VAL-#142-BASE-L1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Consensus:</span>
                      <span className="text-purple-300 font-bold">AuraX DAG-BFT (Chain ID 9924)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Proof-of-Yield (PoY):</span>
                      <span className="text-emerald-400 font-bold">12.5% APY Base + Gas Fees</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CEX Airdrop Multiplier:</span>
                      <span className="text-amber-300 font-bold">5.0x Allocation Weight</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hardware Silicon Guard:</span>
                      <span className="text-slate-300 font-bold">Anti-Sybil 1-PC-1-Validator</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block">Cryptographic License Key:</span>
                    <div className="flex items-center justify-between text-xs text-amber-300 font-bold select-all">
                      <span>{generatedLicenseKey}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(generatedLicenseKey, 'node_license_key')}
                        className="text-cyan-400 hover:text-white"
                      >
                        {copiedKey === 'node_license_key' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                    <span>Smart Contract Standard: ERC-721 Transferable</span>
                    <span>Valid Through: 2027-09-30</span>
                  </div>
                </div>

                {/* Economic ROI & Cash Flow Model */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                  <h4 className="text-xs uppercase text-slate-400 font-bold border-b border-slate-800 pb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Why Buyers Pay $2,499 (Annual Cash Return):</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Micro-Gas Payouts</div>
                      <div className="text-lg font-black text-emerald-400 mt-0.5">~$280 / mo</div>
                      <div className="text-[9px] text-slate-500">100% settlement gas fees</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Annual Gross Yield</div>
                      <div className="text-lg font-black text-amber-400 mt-0.5">~$3,360 / yr</div>
                      <div className="text-[9px] text-slate-500">Paid in USD-O stablecoins</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1">
                    <div className="flex justify-between text-white font-bold">
                      <span>Net Cash Profit on $2,499 License:</span>
                      <span className="text-emerald-400">+$861 / year (34.4% Net ROI)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Plus, node operators receive 5x allocation weighting in the upcoming $AURX CEX token launch and can re-sell their transferable NFT license on the secondary market.
                    </p>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={rewardWalletAddress}
                      onChange={(e) => setRewardWalletAddress(e.target.value)}
                      placeholder="Enter Base/EVM wallet for reward payouts (0x...)"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopy(rewardWalletAddress, 'payout_wallet')}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-bold shrink-0 cursor-pointer"
                    >
                      {copiedKey === 'payout_wallet' ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>

              </div>

              {/* 3 Turnkey Delivery Methods Section */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-cyan-500/30 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span>Choose Your Operational Node Deployment Method:</span>
                    </h4>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Deliver instant validation without requiring complex DevOps or cloud engineering.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setNodeDeliveryMethod('BROWSER_NODE')}
                      className={`py-1.5 px-3 rounded-lg transition cursor-pointer text-center ${
                        nodeDeliveryMethod === 'BROWSER_NODE' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      1. In-Browser
                    </button>
                    <button
                      type="button"
                      onClick={() => setNodeDeliveryMethod('DOCKER_VPS')}
                      className={`py-1.5 px-3 rounded-lg transition cursor-pointer text-center ${
                        nodeDeliveryMethod === 'DOCKER_VPS' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      2. Docker / VPS
                    </button>
                    <button
                      type="button"
                      onClick={() => setNodeDeliveryMethod('MANAGED_CLOUD')}
                      className={`py-1.5 px-3 rounded-lg transition cursor-pointer text-center ${
                        nodeDeliveryMethod === 'MANAGED_CLOUD' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      3. We Host (Turnkey)
                    </button>
                  </div>
                </div>

                {/* METHOD 1: IN-BROWSER INSTANT NODE */}
                {nodeDeliveryMethod === 'BROWSER_NODE' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span>Zero-Setup In-Browser DAG-BFT Attestor</span>
                        </div>
                        <p className="text-xs text-slate-300 font-sans mt-0.5">
                          Runs directly inside the browser using WebWorker and WebCrypto silicon entropy. Requires zero installation.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsNodeActive(!isNodeActive)}
                        className={`px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-md ${
                          isNodeActive
                            ? 'bg-rose-500 hover:bg-rose-400 text-white'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950'
                        }`}
                      >
                        {isNodeActive ? (
                          <>
                            <Square className="w-3.5 h-3.5" />
                            <span>Stop In-Browser Node</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Launch Live Validator Now</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Live Validator Telemetry */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">Node Status</div>
                        <div className={`text-sm font-black mt-1 ${isNodeActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {isNodeActive ? 'ATTESTING BLOCKS' : 'STANDBY'}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">Blocks Validated</div>
                        <div className="text-sm font-black text-cyan-300 mt-1">{nodeBlocksValidated} Blocks</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">Accrued Settlement Gas</div>
                        <div className="text-sm font-black text-emerald-400 mt-1">${nodeRewardsEarned} USD-O</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">Causal Throughput</div>
                        <div className="text-sm font-black text-amber-400 mt-1">{isNodeActive ? `${nodeTpsRate} TPS` : '0 TPS'}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* METHOD 2: 1-LINE DOCKER / VPS CLI SCRIPT */}
                {nodeDeliveryMethod === 'DOCKER_VPS' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      For institutional quant traders, family offices, and developers running 24/7 on Ubuntu/Debian, AWS EC2, or Hetzner:
                    </p>

                    <div className="p-4 rounded-2xl bg-slate-900 text-xs border border-slate-800 space-y-2 select-all">
                      <div className="text-[10px] text-slate-500 uppercase"># 1-Line Universal Setup Command:</div>
                      <code className="text-cyan-300 font-mono block break-all">
                        curl -sSL https://auraxprotocol.com/scripts/install-node.sh | bash -s -- --license {generatedLicenseKey} --wallet {rewardWalletAddress}
                      </code>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 text-xs border border-slate-800 space-y-2 select-all">
                      <div className="text-[10px] text-slate-500 uppercase"># Or via Docker:</div>
                      <code className="text-emerald-300 font-mono block break-all">
                        docker run -d -p 9924:9924 --name aurax-validator -e CHAIN_ID=9924 -e LICENSE_KEY={generatedLicenseKey} -e PAYOUT_WALLET={rewardWalletAddress} aurax/sovereign-node:latest
                      </code>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-sans text-slate-400">
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <strong className="text-white block font-mono">Min Specs:</strong> 2 vCPU, 4GB RAM, 40GB SSD
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <strong className="text-white block font-mono">Monthly Server Cost:</strong> ~$10/mo on DigitalOcean / Hetzner
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <strong className="text-white block font-mono">Uptime Requirement:</strong> 98.5% for full reward share
                      </div>
                    </div>
                  </div>
                )}

                {/* METHOD 3: TURNKEY MANAGED CLOUD HOSTING */}
                {nodeDeliveryMethod === 'MANAGED_CLOUD' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 space-y-2">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Server className="w-4 h-4 text-purple-300" />
                        <span>Hands-Free Protocol Managed Node (0 Effort)</span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Don't have time to manage Linux servers? AuraX Foundation provisions a high-availability VPS cluster with 99.99% uptime on your behalf.
                      </p>
                      <ul className="text-xs text-slate-300 font-sans space-y-1 list-disc list-inside pt-1">
                        <li>Automatic zero-drainer invariant monitoring and continuous software upgrades.</li>
                        <li>Micro-gas settlement rewards wired directly to your Base wallet address monthly.</li>
                        <li>Zero additional hosting fees for the entire 12-month license duration.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-emerald-400">Turnkey Managed Hosting Included</div>
                        <div className="text-[11px] text-slate-400">Your node ID is pre-registered on cluster node #142</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(`Cluster Assigned: VAL-#142 | Wallet: ${rewardWalletAddress} | License: ${generatedLicenseKey}`, 'managed_confirm')}
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs transition cursor-pointer"
                      >
                        {copiedKey === 'managed_confirm' ? 'Saved Managed Settings' : 'Confirm Managed Setup'}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 6: BASESCAN VERIFIED INFLOW PROOFS & TRANSACTION HASHES */}
          {activeTab === 'BASESCAN_PROOF' && (
            <div className="space-y-4">
              <BaseScanTreasuryInspector />
            </div>
          )}

          {/* TAB 7: P2P SECONDARY NODE OTC ORDERBOOK */}
          {activeTab === 'SECONDARY_MARKET' && (
            <div className="space-y-4">
              <SecondaryNodeMarketplace />
            </div>
          )}

          {/* TAB 8: 20% INSTANT AFFILIATE ENGINE ($700 DROP) */}
          {activeTab === 'INSTANT_AFFILIATE' && (
            <div className="space-y-4">
              <InstantAffiliateEngine />
            </div>
          )}

          {/* TAB 9: INSTITUTIONAL MULTI-SIG & PROOF-OF-RESERVES VAULT */}
          {activeTab === 'PROOF_OF_RESERVES' && (
            <div className="space-y-4">
              <InstitutionalProofOfReserves />
            </div>
          )}

          {/* TAB 10: CORPORATE TAX INVOICE (ASC 606 & VAT) */}
          {activeTab === 'TAX_INVOICES' && (
            <div className="space-y-4">
              <CorporateTaxInvoiceVault />
            </div>
          )}

          {/* TAB 11: AUTONOMOUS REAL-TIME VOICE CLOSER AI */}
          {activeTab === 'VOICE_CLOSER' && (
            <div className="space-y-4">
              <AutonomousVoiceCloser />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
