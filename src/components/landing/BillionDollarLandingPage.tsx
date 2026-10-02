import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  Building2,
  Lock,
  ExternalLink,
  ChevronRight,
  Globe2,
  Sparkles,
  Trophy,
  Flame,
  Award,
  Share2,
  Play,
  Terminal,
  Activity,
  CheckCircle2,
  Database,
  Coins,
  Target,
  PhoneCall,
  Moon,
  Sun,
  Maximize2
} from 'lucide-react';
import { AppLayer } from '../../types/econos';
import {
  OPERATING_LOOP_STEPS,
  BUSINESS_LAYER_MODULES,
  WEALTH_LAYER_ENGINES,
  TRUST_LAYER_SPECS,
  OMNIFIN_GLOBAL_SPECS
} from '../omnifin/AuraX100LayersData';

interface BillionDollarLandingPageProps {
  onEnterTestnet: () => void;
  onEnterAirdrop: () => void;
  onSelectLayer: (layer: AppLayer) => void;
}

export const BillionDollarLandingPage: React.FC<BillionDollarLandingPageProps> = ({
  onEnterTestnet,
  onEnterAirdrop,
  onSelectLayer
}) => {
  const [activeLoopStep, setActiveLoopStep] = useState<number>(1);
  const [activeLayersTab, setActiveLayersTab] = useState<'BUSINESS' | 'WEALTH' | 'TRUST' | 'OMNIFIN'>('BUSINESS');
  const [showcaseConcept, setShowcaseConcept] = useState<'DARK_LUXURY' | 'LIGHT_MINIMALIST'>('DARK_LUXURY');
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  const selectedStepData = OPERATING_LOOP_STEPS.find(s => s.step === activeLoopStep) || OPERATING_LOOP_STEPS[0];

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 font-sans antialiased overflow-x-hidden">
      {/* Subtle Aurora Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[140px]" />
        <div className="absolute top-[20%] right-[10%] w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[160px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[180px]" />
      </div>

      {/* Institutional Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#040711]/85 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-700 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/20">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white">ECONOS</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  AuraX Sovereign L1
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wide">
                Autonomous Financial Operating System
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-slate-300">
            <a href="#operating-loop" className="hover:text-cyan-400 transition">12-Step Loop</a>
            <a href="#100-layers" className="hover:text-cyan-400 transition">100 Real-World Layers</a>
            <a href="#airdrop-quests" className="hover:text-cyan-400 transition flex items-center gap-1.5 text-amber-300 font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Daily Airdrop & NFTs</span>
            </a>
            <a href="#metrics" className="hover:text-cyan-400 transition">Metrics</a>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-buyer-funnel'))}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden md:inline">Client ROI &amp; Checkout</span>
              <span className="md:hidden">ROI Audit</span>
            </button>

            <button
              type="button"
              onClick={onEnterAirdrop}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold transition cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily Airdrop Quests</span>
            </button>

            <button
              type="button"
              onClick={onEnterTestnet}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 text-xs font-mono font-black shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950" />
              <span>Launch Testnet Terminal</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Top Announcement Kicker (No Pill Enclosure Slop) */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-wide font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AUTONOMOUS FINOPS, INVOICE ACCELERATION &amp; COMMERCIAL WORKING CAPITAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            The Autonomous Cash Flow &amp; FinOps OS for Commercial Enterprises
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            ECONOS eliminates the fatal 60-day working capital lag for commercial contractors, freight operators, and high-volume trade businesses. Automate accounts receivable collections, 3-way payables reconciliation, and unlock same-day invoice factoring.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 font-mono text-xs font-black">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('navigate-layer', { detail: 'CLIENT_ACQUISITION' }));
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition cursor-pointer text-xs font-black"
            >
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>Launch Voice Closer AI &amp; Maps Scraper</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-buyer-funnel'))}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 transition cursor-pointer text-xs font-bold"
            >
              <Target className="w-4 h-4 text-amber-300" />
              <span>Free 3-Min Cash Flow &amp; Prop Audit</span>
            </button>

            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('navigate-layer', { detail: 'BUSINESS' }));
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer text-xs shadow-md"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Open FinOps Operating Core</span>
            </button>
          </div>

          {/* Social Proof / Trust Metadata */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Incentivized Testnet Live</span>
            </span>
            <span>·</span>
            <span>EVM Compatible</span>
            <span>·</span>
            <span>Silicon Hardware Consensus</span>
            <span>·</span>
            <span>Zero Balance-Draining Fraud</span>
          </div>
        </div>

        {/* Interactive Billion-Dollar Dashboard Design Showcase */}
        <div className="mt-14 relative max-w-6xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-slate-800/40 to-transparent shadow-2xl">
          <div className="rounded-[22px] overflow-hidden bg-slate-950 border border-emerald-500/40 relative">
            
            {/* Design Selector Bar */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold text-white uppercase tracking-wider text-xs">
                  Billion-Dollar Dashboard Design Preview:
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowcaseConcept('DARK_LUXURY')}
                  className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition cursor-pointer font-bold ${
                    showcaseConcept === 'DARK_LUXURY'
                      ? 'bg-slate-950 border-emerald-400 text-white shadow-md'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Concept A: Dark Luxury (Stripe / Ramp)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowcaseConcept('LIGHT_MINIMALIST')}
                  className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition cursor-pointer font-bold ${
                    showcaseConcept === 'LIGHT_MINIMALIST'
                      ? 'bg-white border-slate-300 text-slate-900 shadow-md'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Concept B: Swiss Clean White (Mercury)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsZoomOpen(true)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                  title="Zoom Full Screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The Direct Screenshot Image */}
            <div 
              onClick={() => setIsZoomOpen(true)}
              className="relative cursor-zoom-in group"
            >
              <img
                src={
                  showcaseConcept === 'DARK_LUXURY'
                    ? '/src/assets/images/fintech_dashboard_design_1790933281321.jpg'
                    : '/src/assets/images/fintech_dashboard_light_1790933302655.jpg'
                }
                alt={showcaseConcept === 'DARK_LUXURY' ? 'ECONOS Dark Luxury Fintech Dashboard' : 'ECONOS Swiss Minimalist Light Dashboard'}
                className="w-full h-auto object-cover max-h-[640px] transition duration-300 group-hover:scale-[1.005]"
                referrerPolicy="no-referrer"
              />

              {/* Click to expand overlay hint */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition shadow-lg flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Click image to view full-screen high-res</span>
              </div>
            </div>

            {/* In-Image Floating Stats Strip */}
            <div className="p-4 bg-slate-950/95 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Liquid Working Capital</div>
                <div className="text-base font-black text-emerald-400">$1,842,500</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Net Receivables Due</div>
                <div className="text-base font-black text-cyan-400">$480,200</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Days Sales Outstanding</div>
                <div className="text-base font-black text-purple-400">21 Days (was 58d)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Captured Early Discounts</div>
                <div className="text-base font-black text-amber-400">+$34,200 / yr</div>
              </div>
            </div>

          </div>
        </div>

        {/* Full-Screen Zoom Modal */}
        {isZoomOpen && (
          <div 
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-150"
          >
            <div className="relative max-w-7xl w-full">
              <img
                src={
                  showcaseConcept === 'DARK_LUXURY'
                    ? '/src/assets/images/fintech_dashboard_design_1790933281321.jpg'
                    : '/src/assets/images/fintech_dashboard_light_1790933302655.jpg'
                }
                alt="Full screen dashboard design preview"
                className="w-full h-auto object-contain max-h-[92vh] rounded-2xl shadow-2xl border border-slate-800"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 text-xs font-mono bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-700 text-white shadow-xl">
                Click anywhere to close full screen
              </div>
            </div>
          </div>
        )}

        {/* Live Autonomous Revenue & Burn Ticker Strip */}
        <div className="mt-8 max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-indigo-950/40 border border-amber-500/30 p-5 font-mono shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>30% Automated Gross Revenue Buyback &amp; Burn Ledger</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Every exchange trade, prop desk fee, and SaaS subscription automatically market-buys $AURX and destroys it permanently on Base.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-buyer-funnel'))}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Calculate Your Client ROI</span>
              </button>
              <a
                href="https://basescan.org/token/0x6a813C3a89b6776712f7Fa4a47E1d1D45fAcE1ED"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition flex items-center gap-1.5 border border-slate-800"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>BaseScan Verification</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-center">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase">Gross Platform Revenue</div>
              <div className="text-base font-black text-white mt-0.5">$1,425,890</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase">30% Hardcoded Burn Sink</div>
              <div className="text-base font-black text-amber-400 mt-0.5">$427,767</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase">Tokens Burned To Date</div>
              <div className="text-base font-black text-rose-400 mt-0.5">427,767 $AURX</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 uppercase">Circulating Supply on Base</div>
              <div className="text-base font-black text-emerald-400 mt-0.5">99,572,233 (Falling)</div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL METRICS SECTION */}
      <section id="metrics" className="relative z-10 py-16 border-y border-white/[0.08] bg-slate-950/60 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-white">$142B+</div>
              <div className="text-xs text-slate-400 uppercase">Institutional AUM</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">100,000+</div>
              <div className="text-xs text-slate-400 uppercase">Real DAG-BFT TPS</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">0.42ms</div>
              <div className="text-xs text-slate-400 uppercase">Causal Latency</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-purple-400">$18.2B</div>
              <div className="text-xs text-slate-400 uppercase">Daily Cross-Netting</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">99.999%</div>
              <div className="text-xs text-slate-400 uppercase">Settlement SLA</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-rose-400">100%</div>
              <div className="text-xs text-slate-400 uppercase">Zero-Drainer Defense</div>
            </div>
          </div>
        </div>
      </section>

      {/* THE 12-STEP AUTONOMOUS OPERATING LOOP */}
      <section id="operating-loop" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            THE CONTINUOUS COGNITIVE ENGINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The 12-Step Autonomous Financial Operating Loop
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unlike static software that waits for human data entry, ECONOS runs a relentless 12-step autonomous loop across all enterprise banking, treasury, accounting, and cryptographic rails.
          </p>
        </div>

        {/* Operating Loop Linear Sequence */}
        <div className="p-4 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-xl overflow-x-auto whitespace-nowrap scrollbar-thin mb-8">
          <div className="flex items-center gap-2">
            {OPERATING_LOOP_STEPS.map(s => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveLoopStep(s.step)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
                  activeLoopStep === s.step
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${
                  activeLoopStep === s.step ? 'bg-slate-950 text-cyan-400 font-black' : 'bg-slate-800 text-slate-300'
                }`}>
                  {s.step}
                </span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Step Deep Dive Spotlight Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/30 p-8 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-black flex items-center justify-center font-mono">
                  {selectedStepData.step}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Step {selectedStepData.step}: {selectedStepData.name}
                  </h3>
                  <div className="text-xs text-cyan-400 font-mono font-bold">{selectedStepData.tagline}</div>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {selectedStepData.description}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-3">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Cognitive Discipline:</div>
              <div className="text-sm font-bold text-emerald-400">{selectedStepData.category}</div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Executes autonomously 24/7 across all 25 business modules and multi-chain settlement rails.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100 REAL-WORLD LAYERS ARCHITECTURE EXPLORER */}
      <section id="100-layers" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono text-purple-400 font-bold tracking-wider uppercase">
            THE UNIFIED MULTI-LAYER STACK
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            100 Real-World Layers Solving Global Finance
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Eliminating trillions of dollars of fragmented ERP, banking, accounting, and manual compliance silos into one unified autonomous state layer.
          </p>

          {/* Layer Category Selector Tabs */}
          <div className="flex items-center justify-center gap-2 pt-4 flex-wrap font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveLayersTab('BUSINESS')}
              className={`px-5 py-2.5 rounded-xl transition cursor-pointer ${
                activeLayersTab === 'BUSINESS'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              🏢 Business Layer (25 Modules)
            </button>

            <button
              type="button"
              onClick={() => setActiveLayersTab('WEALTH')}
              className={`px-5 py-2.5 rounded-xl transition cursor-pointer ${
                activeLayersTab === 'WEALTH'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              💰 Wealth Layer (20 Engines)
            </button>

            <button
              type="button"
              onClick={() => setActiveLayersTab('TRUST')}
              className={`px-5 py-2.5 rounded-xl transition cursor-pointer ${
                activeLayersTab === 'TRUST'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              🛡️ Trust Layer (28 AI Agents)
            </button>

            <button
              type="button"
              onClick={() => setActiveLayersTab('OMNIFIN')}
              className={`px-5 py-2.5 rounded-xl transition cursor-pointer ${
                activeLayersTab === 'OMNIFIN'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              🌐 OMNIFIN Global & AuraX L1
            </button>
          </div>
        </div>

        {/* Tab 1: Business Layer (25 Modules) */}
        {activeLayersTab === 'BUSINESS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
            {BUSINESS_LAYER_MODULES.slice(0, 15).map(m => (
              <div key={m.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">{m.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {m.category}
                  </span>
                </div>
                <div className="text-[11px] text-purple-300 font-bold">{m.tagline}</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Wealth Layer (20 Engines) */}
        {activeLayersTab === 'WEALTH' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
            {WEALTH_LAYER_ENGINES.slice(0, 15).map(e => (
              <div key={e.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-emerald-500/50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">{e.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {e.category}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-300 font-bold">{e.tagline}</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{e.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Trust Layer (28 AI Agents & 8-Stage Firewall) */}
        {activeLayersTab === 'TRUST' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
                <div className="text-[10px] text-slate-400 uppercase">Autonomous Agents</div>
                <div className="text-xl font-black text-amber-400 mt-1">{TRUST_LAYER_SPECS.agentsCount} Regimes</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
                <div className="text-[10px] text-slate-400 uppercase">AI Firewall Stages</div>
                <div className="text-xl font-black text-amber-400 mt-1">{TRUST_LAYER_SPECS.firewallStages} Stages Pre-Execution</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
                <div className="text-[10px] text-slate-400 uppercase">Dynamic Risk Scoring</div>
                <div className="text-sm font-black text-emerald-400 mt-1.5">{TRUST_LAYER_SPECS.riskTiers.join(' · ')}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
                <div className="text-[10px] text-slate-400 uppercase">Audit Ledger</div>
                <div className="text-sm font-black text-cyan-400 mt-1.5">Cryptographic Merkle</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
              {TRUST_LAYER_SPECS.features.map((f, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-amber-500/50 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">{f.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Stage {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed pt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: OMNIFIN Global & AuraX L1 */}
        {activeLayersTab === 'OMNIFIN' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
            {[
              { title: 'Global Monitored AUM', value: OMNIFIN_GLOBAL_SPECS.aumMonitored, category: 'Institutional Liquidity', desc: 'Universal state layer aggregating sovereign and enterprise digital assets across all bank and blockchain ledgers.' },
              { title: 'Daily Cross-Clearing Netting', value: OMNIFIN_GLOBAL_SPECS.dailyNetting, category: 'Clearing Engine', desc: 'Continuous multi-tenant netting reducing balance sheet gross exposure and optimizing overnight collateral.' },
              { title: 'Deterministic Causal Latency', value: OMNIFIN_GLOBAL_SPECS.latency, category: 'DAG-BFT Performance', desc: 'Ultra-low sub-millisecond causal latency ensuring high-frequency enterprise trade execution.' },
              { title: 'Settlement Service SLA', value: OMNIFIN_GLOBAL_SPECS.settlementSla, category: 'Consensus Reliability', desc: 'Fault-tolerant distributed validator mesh guaranteeing uninterrupted enterprise operational availability.' },
              { title: 'Capital Netting Savings', value: OMNIFIN_GLOBAL_SPECS.capitalSaved, category: 'Capital Efficiency', desc: 'Capital saved daily through multilateral cross-counterparty compression and netting cycles.' },
              { title: 'Proof-Carrying Settlement', value: OMNIFIN_GLOBAL_SPECS.rails, category: 'Cryptographic Rails', desc: 'Zero-knowledge proofs carrying state transitions directly with transactions for zero-fraud assurance.' }
            ].map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-cyan-500/50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">{g.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {g.category}
                  </span>
                </div>
                <div className="text-sm font-black text-cyan-300">{g.value}</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed pt-1">{g.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* DAILY SOCIAL AIRDROP & NFT INVITATION SPOTLIGHT */}
      <section id="airdrop-quests" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950 border border-purple-500/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>COMMUNITY REWARD PROGRAM LIVE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Test Daily. Share on 8 Platforms. Mint Proof-of-Action NFTs.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Participate in our daily incentivized testnet quests across Facebook, Twitter / 𝕏, Reddit, Discord, Instagram, TikTok, YouTube, and LinkedIn. Earn verified testnet tokens and mint your daily cryptographic **Proof-of-Action NFT** guaranteeing your mainnet allocation!
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 font-mono text-xs font-black">
              <button
                type="button"
                onClick={onEnterAirdrop}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-purple-600 hover:from-amber-300 hover:to-purple-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition cursor-pointer text-sm"
              >
                <Trophy className="w-4 h-4 text-slate-950" />
                <span>Enter Daily Airdrop & NFT Hub</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                type="button"
                onClick={onEnterTestnet}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Claim 1,000 $AURX Faucet</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-white/[0.08] bg-[#040711] font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-bold text-white">ECONOS Sovereign OS</span>
            <span>·</span>
            <span>AuraX Sovereign Layer-1</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500">
            © 2026 ECONOS & AuraX Network. All 100 Autonomous Layers Verified On-Chain.
          </div>
        </div>
      </footer>
    </div>
  );
};
