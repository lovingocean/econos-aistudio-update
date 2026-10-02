import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Layers, 
  ChevronRight, 
  Search, 
  CreditCard, 
  Zap, 
  Bot, 
  Clock, 
  Filter, 
  ExternalLink,
  MapPin,
  Scale,
  RefreshCw,
  Eye,
  Sliders,
  Maximize2
} from 'lucide-react';
import { AppLayer } from '../../types/econos';

interface MasterExecutiveDashboardProps {
  onNavigateToLayer?: (layer: AppLayer) => void;
  onOpenVoiceCloser?: () => void;
}

export const MasterExecutiveDashboard: React.FC<MasterExecutiveDashboardProps> = ({
  onNavigateToLayer,
  onOpenVoiceCloser
}) => {
  // Theme state: default to soft dimmed matte slate (Zero glare, soothing to the eyes)
  const [themeMode, setThemeMode] = useState<'DIMMED_SLATE' | 'WARM_MUTED_PAPER'>('DIMMED_SLATE');
  
  // Selected Feature Hub in the master architecture
  const [activeHub, setActiveHub] = useState<'HUB_WORKING_CAPITAL' | 'HUB_VOICE_ACQUISITION' | 'HUB_TAX_COMPLIANCE' | 'HUB_AI_CFO'>('HUB_WORKING_CAPITAL');

  // Simulated 1-click factor action state
  const [factoredInvoices, setFactoredInvoices] = useState<Record<string, boolean>>({});
  const [isFactoringLoading, setIsFactoringLoading] = useState<string | null>(null);

  // Invoices data (Real commercial contractors)
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-4821',
      contractor: 'Apex Mechanical & HVAC Systems',
      location: 'Dallas, TX',
      scope: 'Commercial Chiller Retrofit (AIA G702)',
      grossAmount: 185000,
      retentionAmount: 18500, // 10% GC retention
      advanceEligible: 148500, // 90% advance
      dueDate: 'Due in 38 days (Net-60)',
      gcName: 'Turner Construction Corp',
      status: 'VERIFIED_AIA',
      verifiedRating: 4.9
    },
    {
      id: 'INV-4822',
      contractor: 'LoneStar Commercial Roofing LLC',
      location: 'Austin, TX',
      scope: 'TPO Membrane 85,000 sq ft Logistics Hub',
      grossAmount: 240000,
      retentionAmount: 24000,
      advanceEligible: 194400,
      dueDate: 'Due in 42 days (Net-60)',
      gcName: 'DPR Construction',
      status: 'VERIFIED_AIA',
      verifiedRating: 4.8
    },
    {
      id: 'INV-4823',
      contractor: 'Centex Electrical Contractors',
      location: 'Houston, TX',
      scope: 'Substation & Switchgear Installation',
      grossAmount: 132000,
      retentionAmount: 13200,
      advanceEligible: 106920,
      dueDate: 'Due in 24 days (Net-45)',
      gcName: 'Hensel Phelps',
      status: 'VERIFIED_AIA',
      verifiedRating: 4.7
    },
    {
      id: 'INV-4824',
      contractor: 'Vanguard Freight & Hauling Logistics',
      location: 'Fort Worth, TX',
      scope: 'Aggregate Transport 400 Loads',
      grossAmount: 94500,
      retentionAmount: 0,
      advanceEligible: 85050,
      dueDate: 'Due in 18 days (Net-30)',
      gcName: 'CEMEX Supply Group',
      status: 'VERIFIED_AIA',
      verifiedRating: 4.9
    }
  ]);

  const handleInstantFactor = (invId: string) => {
    setIsFactoringLoading(invId);
    setTimeout(() => {
      setFactoredInvoices(prev => ({ ...prev, [invId]: true }));
      setIsFactoringLoading(null);
    }, 900);
  };

  // Color variables depending on soft dimmed mode vs warm paper mode (Zero harsh fluorescent white)
  const isDark = themeMode === 'DIMMED_SLATE';
  const bgClass = isDark ? 'bg-[#0a1120] text-slate-200' : 'bg-[#eef2f6] text-slate-800';
  const cardClass = isDark ? 'bg-[#0f1b2e] border-slate-800/90 shadow-lg' : 'bg-[#f8fafc] border-slate-300 shadow-sm';
  const cardMuted = isDark ? 'bg-[#0b1424] border-slate-800/60' : 'bg-[#f1f4f8] border-slate-200';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const headerText = isDark ? 'text-white' : 'text-slate-900';

  return (
    <div className={`rounded-3xl p-4 sm:p-6 transition-colors duration-200 space-y-6 font-sans ${bgClass} border ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
      
      {/* Top Dimmed Header: Purpose & Eye-Friendly Theme Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-400">
              ECONOS FinOps • Master Enterprise Dashboard Architecture
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
              Soft Eye-Friendly Palette
            </span>
          </div>
          <h1 className={`text-xl sm:text-2xl font-black tracking-tight mt-1 ${headerText}`}>
            Commercial Working Capital &amp; Treasury Acceleration
          </h1>
          <p className={`text-xs ${textMuted} mt-0.5 font-mono max-w-2xl`}>
            All 25 core enterprise features organized into 4 intuitive hubs — zero visual clutter, dimmed soothing contrast, and instant working capital release.
          </p>
        </div>

        {/* Eye-Friendly Tone Selector */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className={`text-[11px] ${textMuted}`}>Visual Mode:</span>
          <button
            type="button"
            onClick={() => setThemeMode('DIMMED_SLATE')}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition font-bold cursor-pointer ${
              themeMode === 'DIMMED_SLATE'
                ? 'bg-slate-900 border-emerald-500/60 text-emerald-300 shadow-sm'
                : 'bg-transparent border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <span>🌙 Dimmed Matte Slate (No Glare)</span>
          </button>

          <button
            type="button"
            onClick={() => setThemeMode('WARM_MUTED_PAPER')}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition font-bold cursor-pointer ${
              themeMode === 'WARM_MUTED_PAPER'
                ? 'bg-[#dfe5ec] border-slate-400 text-slate-900 shadow-sm'
                : 'bg-transparent border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📜 Warm Muted Paper</span>
          </button>
        </div>
      </div>

      {/* 4 TOP CORE METRICS RIBBON (BREATHING ROOM, NO MESS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
        <div className={`p-4 rounded-2xl border ${cardClass} space-y-1`}>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Liquid Working Capital</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className={`text-2xl font-black ${headerText}`}>$1,842,500</div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+$320,000 released this week</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${cardClass} space-y-1`}>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Net Receivables Due (AIA)</span>
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className={`text-2xl font-black ${headerText}`}>$480,200</div>
          <div className="text-[11px] text-cyan-400 font-bold">
            4 Pay Applications in 24h clearing
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${cardClass} space-y-1`}>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Days Sales Outstanding</span>
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className={`text-2xl font-black ${headerText}`}>21 Days</div>
          <div className="text-[11px] text-purple-400 font-bold">
            Down from 58-day industry lag (-63%)
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${cardClass} space-y-1`}>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Captured Early-Pay Yield</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className={`text-2xl font-black ${headerText}`}>+$34,200 / yr</div>
          <div className="text-[11px] text-amber-400 font-bold">
            2/10 Net-30 vendor discounts captured
          </div>
        </div>
      </div>

      {/* MASTER ARCHITECTURE: 4 FEATURE HUBS TOGGLE BAR (KAHAN KAHAN FEATURES FIT HAIN) */}
      <div className={`p-2 rounded-2xl border ${cardMuted} flex flex-wrap items-center justify-between gap-2 font-mono text-xs`}>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveHub('HUB_WORKING_CAPITAL')}
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 transition cursor-pointer font-bold ${
              activeHub === 'HUB_WORKING_CAPITAL'
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>1. Working Capital &amp; Factoring Desk</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-bold">
              ACTIVE
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveHub('HUB_VOICE_ACQUISITION')}
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 transition cursor-pointer font-bold ${
              activeHub === 'HUB_VOICE_ACQUISITION'
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>2. Maps Scraper &amp; Voice Closer AI</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 font-bold">
              LIVE CALLS
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveHub('HUB_TAX_COMPLIANCE')}
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 transition cursor-pointer font-bold ${
              activeHub === 'HUB_TAX_COMPLIANCE'
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span>3. Tax Credits (§41) &amp; Continuous Close</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-bold">
              IRS COMPLIANT
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveHub('HUB_AI_CFO')}
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 transition cursor-pointer font-bold ${
              activeHub === 'HUB_AI_CFO'
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-400" />
            <span>4. AI CFO Strategic Intelligence</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 font-bold">
              DAILY MEMO
            </span>
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-400 pr-2">
          <span>Zero Horizontal Overload</span>
        </div>
      </div>

      {/* HUB 1 CONTENT: WORKING CAPITAL & COMMERCIAL FACTORING LEDGER */}
      {activeHub === 'HUB_WORKING_CAPITAL' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Liquidity Trajectory Chart & 3-Way Reconciliation Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left 8 Cols: 90-Day Predictive Cash Flow Trajectory */}
            <div className={`lg:col-span-8 p-5 rounded-2xl border ${cardClass} space-y-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-bold font-mono uppercase tracking-wider ${headerText}`}>
                    90-Day Predictive Cash Flow &amp; Payroll Trajectory
                  </h3>
                  <p className={`text-xs ${textMuted} font-mono mt-0.5`}>
                    Green corridor shows protected working capital after Friday payroll and supplier early discounts
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span>Factored Inflow</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                    <span>Unfactored Lag</span>
                  </span>
                </div>
              </div>

              {/* Vector Cash Curve Visualization */}
              <div className={`h-48 rounded-xl ${cardMuted} border p-4 relative overflow-hidden flex flex-col justify-between`}>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Day 1 (Today: $1.84M)</span>
                  <span>Day 30 (Payroll 4x: $1.52M)</span>
                  <span>Day 60 (GC Retention: $2.14M)</span>
                  <span>Day 90 (Project Margin: $2.48M)</span>
                </div>

                {/* SVG Visual Smooth Curve */}
                <svg className="w-full h-24 overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
                  <defs>
                    <linearGradient id="corridorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Unfactored dipping curve (danger zone) */}
                  <path
                    d="M 0 50 Q 100 85 200 70 T 400 45"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Factored safe corridor fill */}
                  <path
                    d="M 0 40 Q 100 20 200 25 T 400 10 L 400 90 L 0 90 Z"
                    fill="url(#corridorGrad)"
                  />
                  {/* Factored safe line */}
                  <path
                    d="M 0 40 Q 100 20 200 25 T 400 10"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                  />
                  {/* Key Payroll marker */}
                  <circle cx="100" cy="20" r="4" fill="#10b981" />
                  <circle cx="200" cy="25" r="4" fill="#10b981" />
                  <circle cx="400" cy="10" r="4" fill="#10b981" />
                </svg>

                <div className="flex justify-between items-center text-[10px] font-mono border-t border-slate-800/40 pt-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">✓ Zero Payroll Shortfalls</span>
                  <span>GC Retention Clearing: DPR &amp; Turner</span>
                  <span>Early-Pay Savings: $2,850/mo</span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: 3-Way Subcontractor Payables & Lien Waivers */}
            <div className={`lg:col-span-4 p-5 rounded-2xl border ${cardClass} space-y-4`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold font-mono uppercase tracking-wider ${headerText}`}>
                  Lien Waiver &amp; Payables Reconciler
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  MATCHED 100%
                </span>
              </div>
              <p className={`text-xs ${textMuted} font-mono`}>
                Matches PO, delivery ticket &amp; invoice. Releases GC retention without 90-day dispute delays.
              </p>

              <div className="space-y-2.5 font-mono text-xs">
                <div className={`p-3 rounded-xl border ${cardMuted} flex items-center justify-between`}>
                  <div>
                    <div className="font-bold text-slate-200">ABC Supply Co.</div>
                    <div className="text-[10px] text-slate-400">Materials PO #8412 • Unconditional Waiver</div>
                  </div>
                  <span className="text-emerald-400 font-bold">$42,100</span>
                </div>

                <div className={`p-3 rounded-xl border ${cardMuted} flex items-center justify-between`}>
                  <div>
                    <div className="font-bold text-slate-200">Ferguson Enterprises</div>
                    <div className="text-[10px] text-slate-400">Valves &amp; Piping • 2/10 Net-30 Captured</div>
                  </div>
                  <span className="text-emerald-400 font-bold">$28,500</span>
                </div>

                <div className={`p-3 rounded-xl border ${cardMuted} flex items-center justify-between`}>
                  <div>
                    <div className="font-bold text-slate-200">United Rentals Crane</div>
                    <div className="text-[10px] text-slate-400">Equipment Delivery Verified</div>
                  </div>
                  <span className="text-emerald-400 font-bold">$14,200</span>
                </div>
              </div>
            </div>

          </div>

          {/* Real Commercial Factoring Ledger Table */}
          <div className={`p-5 rounded-2xl border ${cardClass} space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
              <div>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${headerText}`}>
                  Verified Commercial Pay Applications &amp; Instant Factoring
                </h3>
                <p className={`text-xs ${textMuted} mt-0.5`}>
                  AIA G702 certified commercial invoices with 90% same-day cash advances directly deposited via FedNow / ACH.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>General Contractor Credit Backed</span>
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className={`border-b border-slate-800 text-[11px] uppercase ${textMuted}`}>
                    <th className="py-2.5 px-3">Invoice &amp; Contractor</th>
                    <th className="py-2.5 px-3">GC &amp; Scope</th>
                    <th className="py-2.5 px-3">Gross / Retention</th>
                    <th className="py-2.5 px-3">Advance Eligible (90%)</th>
                    <th className="py-2.5 px-3">Terms Lag</th>
                    <th className="py-2.5 px-3 text-right">Instant Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {invoices.map(inv => {
                    const isFactored = factoredInvoices[inv.id];
                    const isLoading = isFactoringLoading === inv.id;

                    return (
                      <tr key={inv.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-200">{inv.contractor}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                            <span>{inv.id}</span>
                            <span>•</span>
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{inv.location}</span>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-300">{inv.gcName}</div>
                          <div className="text-[10px] text-slate-400">{inv.scope}</div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-200">${inv.grossAmount.toLocaleString()}</div>
                          <div className="text-[10px] text-amber-400/90 font-bold">-${inv.retentionAmount.toLocaleString()} (10% Ret)</div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-black text-emerald-400 text-sm">
                            ${inv.advanceEligible.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-emerald-500/80">FedNow 24h Wire</div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                            {inv.dueDate}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right">
                          {isFactored ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Cash Deposited</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleInstantFactor(inv.id)}
                              disabled={isLoading}
                              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition cursor-pointer shadow-md disabled:opacity-50 inline-flex items-center gap-1.5"
                            >
                              <Zap className="w-3.5 h-3.5 text-slate-950" />
                              <span>{isLoading ? 'Wiring Cash...' : '1-Click Advance'}</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* HUB 2 CONTENT: MAPS SCRAPER & VOICE CLOSER AI */}
      {activeHub === 'HUB_VOICE_ACQUISITION' && (
        <div className="space-y-4 animate-in fade-in duration-150 font-mono">
          <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <h3 className={`text-base font-bold ${headerText}`}>
                  Autonomous B2B Voice Closer &amp; Google Maps Scraper
                </h3>
              </div>
              <p className={`text-xs ${textMuted} mt-1 max-w-2xl`}>
                Scrapes verified commercial contractors across Texas and Midwest metros with real direct phone lines, triggers AI voice CFO negotiations, and closes $3,499 commercial subscriptions with immediate checkout.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onOpenVoiceCloser) onOpenVoiceCloser();
                else window.dispatchEvent(new CustomEvent('navigate-layer', { detail: 'CLIENT_ACQUISITION' }));
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:from-emerald-400 hover:to-teal-300"
            >
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>Launch Live Interactive Voice Closer &rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className={`p-4 rounded-2xl border ${cardClass} space-y-2`}>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Google Places API Discovery</span>
              </div>
              <p className={`text-[11px] ${textMuted} leading-relaxed`}>
                Verified commercial HVAC, Roofing, Electrical, and Mechanical trades pulled directly with owner contact info and Google ratings.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${cardClass} space-y-2`}>
              <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span>Outbound Voice Caller</span>
              </div>
              <p className={`text-[11px] ${textMuted} leading-relaxed`}>
                Speaks out loud with realistic contractor cash flow scripts: solves Net-60 delays, 10% GC retention lockups, and payroll matching.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${cardClass} space-y-2`}>
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>B2B Commercial Checkout</span>
              </div>
              <p className={`text-[11px] ${textMuted} leading-relaxed`}>
                Stripe Corporate Card, same-day ACH debit, and tax-deductible IRS Section 179 corporate invoices generated on call completion.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HUB 3 CONTENT: TAX CREDITS & CONTINUOUS CLOSE */}
      {activeHub === 'HUB_TAX_COMPLIANCE' && (
        <div className="space-y-4 animate-in fade-in duration-150 font-mono">
          <div className={`p-5 rounded-2xl border ${cardClass} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <h3 className={`text-base font-bold ${headerText}`}>
                  IRC Section 41 R&amp;D Tax Credits &amp; Continuous Close
                </h3>
              </div>
              <p className={`text-xs ${textMuted} mt-1 max-w-2xl`}>
                Recovers $150K to $600K in qualified research expenses for commercial engineering and design-build contractors with automated SOX-404 cryptographic ledger proof.
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-layer', { detail: 'LAYER_62_RD_TAX_CREDIT' }))}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Scale className="w-4 h-4 text-slate-950" />
              <span>Open Section 41 Tax Workspace &rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className={`p-4 rounded-2xl border ${cardClass} space-y-2`}>
              <div className="text-amber-400 font-bold">§41 Engineering Credits</div>
              <p className={`text-[11px] ${textMuted}`}>
                Automatic qualification of MEP (Mechanical, Electrical, Plumbing) redesigns, structural engineering, and green HVAC modeling.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${cardClass} space-y-2`}>
              <div className="text-emerald-400 font-bold">ASC 606 Revenue Recognition</div>
              <p className={`text-[11px] ${textMuted}`}>
                Percentage-of-completion accounting for commercial subcontracts with automated deferred revenue amortizations.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border ${cardClass} space-y-2`}>
              <div className="text-purple-400 font-bold">Autonomous Month-End Close</div>
              <p className={`text-[11px] ${textMuted}`}>
                Reconciles general ledger in 12 continuous minutes instead of taking 14 manual accountant days.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HUB 4 CONTENT: AI CFO BRIEFING */}
      {activeHub === 'HUB_AI_CFO' && (
        <div className="space-y-4 animate-in fade-in duration-150 font-mono">
          <div className={`p-5 rounded-2xl border ${cardClass} space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <h3 className={`text-base font-bold ${headerText}`}>
                  Autonomous AI CFO Daily Briefing (Oct 2, 2026)
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                CONFIDENTIAL • EXECUTIVE EYES ONLY
              </span>
            </div>

            <div className={`p-4 rounded-xl border ${cardMuted} space-y-2 text-xs`}>
              <p className="text-slate-300 leading-relaxed font-sans">
                <strong>Executive Summary:</strong> Liquidity is at peak strength with <strong>$1.84M in available working capital</strong>. All Friday payroll obligations ($320,000 across 34 field crews) are pre-funded with zero borrowing costs.
              </p>
              <p className="text-slate-300 leading-relaxed font-sans">
                <strong>Action Recommended:</strong> DPR Construction has approved AIA Pay App #4822 ($240,000). Accelerate via our 1-click advance to capture ABC Supply&apos;s 2% early-pay discount ($4,800 direct net margin expansion).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM FOOTER: DIRECT ACCESS TO ALL WORKSPACES WITHOUT MESS */}
      <div className={`p-4 rounded-2xl border ${cardMuted} flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono`}>
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Multi-Tenant Enterprise Isolation • SOX-404 Merkle Proofs Active</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate-layer', { detail: 'CLIENT_ACQUISITION' }))}
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Voice Closer AI</span>
          </button>
          <span className="text-slate-700">|</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate-layer', { detail: 'LAYER_62_RD_TAX_CREDIT' }))}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Section 41 Tax</span>
          </button>
          <span className="text-slate-700">|</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-buyer-funnel'))}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Commercial ROI Audit</span>
          </button>
        </div>
      </div>

    </div>
  );
};
