import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  DollarSign,
  FileCheck2,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  FileText,
  Scale,
  Zap,
  HardHat,
  Shield,
  Download,
  PhoneCall,
  Calendar,
  X,
  Mail,
  User as UserIcon,
  Briefcase,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BillionDollarLandingPageProps {
  onEnterApp?: () => void;
}

export const BillionDollarLandingPage: React.FC<BillionDollarLandingPageProps> = ({ onEnterApp }) => {
  const { loginAsAuditor, login, isAuthenticated } = useAuth();
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [demoSubmitted, setDemoSubmitted] = useState<boolean>(false);

  // Demo Form State
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoCompany, setDemoCompany] = useState('');
  const [demoVolume, setDemoVolume] = useState('$5M - $20M');
  const [demoTrade, setDemoTrade] = useState('Commercial Mechanical / HVAC');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoEmail.trim()) return;
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setShowDemoModal(false);
    }, 3000);
  };

  const handleInstantSandbox = async () => {
    await loginAsAuditor();
    if (onEnterApp) onEnterApp();
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await login(loginEmail, loginPassword);
      setShowLoginModal(false);
      if (onEnterApp) onEnterApp();
    } catch (err: any) {
      setLoginError(err?.message || 'Invalid credentials. Click Instant Sandbox for 1-click access.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 relative overflow-x-hidden">
      {/* SOFT LUMINOUS AMBIENT GLOW BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-100/50 via-sky-50/40 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-10 left-[-10%] w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-3xl opacity-60" />
      </div>

      {/* TOP FROSTED WHITE NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/70 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-sm">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-slate-900 uppercase">ECONOS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                  FinOps Core
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Commercial Construction &amp; Capital Markets OS</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#architecture" className="hover:text-slate-900 transition">Architecture</a>
            <a href="#factoring" className="hover:text-slate-900 transition">Factoring Exchange</a>
            <a href="#tax-suite" className="hover:text-slate-900 transition">IRS §179D Suite</a>
            <a href="#pricing" className="hover:text-slate-900 transition">Institutional Pricing</a>
            <a href="#compliance" className="hover:text-slate-900 transition">Compliance</a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onEnterApp}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="px-3.5 py-2 text-xs font-mono font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={handleInstantSandbox}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Live Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-slate-700 text-xs font-mono font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>2026 Sovereign Enterprise Edition • Live Production Suite</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
            The Unified Financial Operating System for Commercial Contracting.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Eliminate 60-day invoice delays and lien disputes. Unified AIA G702 progress billing, 50-state statutory lien waivers, same-day invoice factoring liquidity, and IRS energy tax engineering in a single luminous platform.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              type="button"
              onClick={handleInstantSandbox}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Live 30-Workspace Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 text-xs font-mono font-bold shadow-2xs hover:shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Book Private Institutional Demo</span>
            </button>

            <a
              href="/econos-project.zip"
              download="econos-project.zip"
              className="px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/90 text-xs font-mono transition flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Audit Source (.ZIP)</span>
            </a>
          </div>

          <p className="text-xs font-mono text-slate-500 pt-2">
            No registration required. Click <strong className="text-slate-800">"Explore Live Sandbox"</strong> to enter the full verified operating environment with 1 click.
          </p>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono">
          <div className="space-y-1">
            <p className="text-3xl font-black text-slate-900">$391M+</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Receivables Managed</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-slate-900">50 States</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Statutory Lien Compliance</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-emerald-700">&lt; 24 Hours</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Same-Day Wire Advance</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-indigo-700">$5.65 / sq.ft.</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">IRS §179D Energy Rate</p>
          </div>
        </div>
      </section>

      {/* 4 CORE SOVEREIGN PILLARS */}
      <section id="architecture" className="relative z-10 py-16 border-t border-slate-200/60 bg-gradient-to-b from-transparent via-white/60 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Core Enterprise Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Built for Commercial Contracting &amp; Capital Markets.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Traditional accounting software fails in construction because it ignores pay-when-paid clauses, retainage withholding, and mechanics lien statutes. ECONOS orchestrates the complete financial lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PILLAR 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">AIA Document G702 / G703 Autonomous Progress Billing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automates the standard 9-line AIA application for payment and Schedule of Values (SOV). Computes work in place, stored materials, and statutory 10% retainage withholdings with architect certification stamps.
              </p>
              <div className="pt-2 text-xs font-mono font-bold text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Tab 25 in FinOps Core</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* PILLAR 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tri-Party Joint-Check &amp; Escrow Clearing Protocol</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminates material supplier mechanic liens. General Contractor deposits into FDIC escrow; ECONOS verifies delivery receipts and executes simultaneous atomic split wires to supplier and subcontractor with instant dual lien releases.
              </p>
              <div className="pt-2 text-xs font-mono font-bold text-indigo-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Tab 23 in FinOps Core (World-First)</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* PILLAR 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4 group" id="factoring">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Working Capital Factoring Exchange</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Converts slow 60-to-90-day progress invoices into same-day liquid working capital. Underwritten by real-time Altman Z''-Scores and protected under UCC Article 9 Secretary of State priority filings.
              </p>
              <div className="pt-2 text-xs font-mono font-bold text-emerald-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Tab 21 &amp; Tab 28 in FinOps Core</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* PILLAR 4 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4 group" id="tax-suite">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">IRS Federal Tax Harvesting &amp; Credit Master Suite</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct statutory deductions under the Inflation Reduction Act: IRC §179D energy deductions up to $5.65/sq.ft., §179 equipment expensing ($1.25M limit), §41 R&amp;D credits (Form 6765), and §1031 like-kind exchange capital gains deferrals.
              </p>
              <div className="pt-2 text-xs font-mono font-bold text-amber-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Tab 24 &amp; Tab 29 in FinOps Core</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL PRICING TIERS */}
      <section id="pricing" className="relative z-10 py-16 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Transparent Commercial Licensing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Enterprise Plans Tailored to Scale.
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              Clear monthly run-rates with zero hidden seat taxes. Dedicated deployment for high-volume commercial organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* TIER 1 */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900 font-sans">Trade Contractor Pro</span>
                  <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold border border-blue-200">
                    Subcontractor
                  </span>
                </div>
                <p className="text-3xl font-black text-slate-900">$1,490 <span className="text-xs text-slate-500 font-normal">/ mo</span></p>
                <ul className="space-y-2.5 text-slate-600 font-sans text-xs pt-3 border-t border-slate-100">
                  <li className="flex items-center gap-2">✓ Full AIA G702 / G703 Billing</li>
                  <li className="flex items-center gap-2">✓ 50-State Statutory Lien Waivers</li>
                  <li className="flex items-center gap-2">✓ IRS §179D Energy Tax Harvester</li>
                  <li className="flex items-center gap-2">✓ Working Capital Factoring Advances</li>
                  <li className="flex items-center gap-2">✓ Real-Time Cash Runway Forecast</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={handleInstantSandbox}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition cursor-pointer"
              >
                Access Sandbox
              </button>
            </div>

            {/* TIER 2 */}
            <div className="p-7 rounded-2xl bg-white border-2 border-indigo-600 shadow-md space-y-5 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900 font-sans">General Contractor</span>
                  <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold border border-indigo-200">
                    Most Popular
                  </span>
                </div>
                <p className="text-3xl font-black text-indigo-900">$4,850 <span className="text-xs text-slate-500 font-normal">/ mo</span></p>
                <ul className="space-y-2.5 text-slate-700 font-sans text-xs pt-3 border-t border-slate-100">
                  <li className="flex items-center gap-2 font-semibold">✓ Everything in Trade Contractor</li>
                  <li className="flex items-center gap-2">✓ Tri-Party Joint-Check &amp; Escrow Clearing</li>
                  <li className="flex items-center gap-2">✓ Davis-Bacon Form WH-347 Payroll</li>
                  <li className="flex items-center gap-2">✓ Altman Z''-Score Credit Underwriting</li>
                  <li className="flex items-center gap-2">✓ Miller Act Surety Bonding Desk</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-xs cursor-pointer"
              >
                Request Enterprise Demo
              </button>
            </div>

            {/* TIER 3 */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900 font-sans">Institutional Capital Desk</span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    Fund &amp; Factor
                  </span>
                </div>
                <p className="text-3xl font-black text-emerald-800">$12,500 <span className="text-xs text-slate-500 font-normal">/ mo + 1.25%</span></p>
                <ul className="space-y-2.5 text-slate-600 font-sans text-xs pt-3 border-t border-slate-100">
                  <li className="flex items-center gap-2 font-semibold">✓ Full 30-Workspace Sovereign OS</li>
                  <li className="flex items-center gap-2">✓ UCC Article 9 Secretary of State Perfection</li>
                  <li className="flex items-center gap-2">✓ Multi-Tenant Syndicated Factoring Desk</li>
                  <li className="flex items-center gap-2">✓ SOC-2 Type II Cryptographic Vault</li>
                  <li className="flex items-center gap-2">✓ Custom API &amp; ERP Webhook Bus</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition cursor-pointer"
              >
                Contact Capital Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE & LEGAL TRUST FOOTER */}
      <footer id="compliance" className="relative z-10 py-12 bg-white text-slate-500 font-mono text-xs border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-sm font-bold text-slate-900">ECONOS FinOps Sovereign Operating System</p>
              <p className="text-[11px] text-slate-500">
                Architected for commercial enterprise finance under US GAAP, UCC Article 9, and IRC Title 26.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[10px]">
              <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700">SOC-2 Type II Certified Audit Trail</span>
              <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700">UCC § 9-406 Statutory Compliance</span>
              <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700">PBKDF2 Cryptographic Security</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
            <p>© 2026 ECONOS Financial Technologies Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/econos-project.zip" download="econos-project.zip" className="text-slate-600 hover:text-slate-900 transition">
                Download Codebase (.zip)
              </a>
              <button type="button" onClick={handleInstantSandbox} className="text-slate-600 hover:text-slate-900 transition cursor-pointer">
                Auditor Fast-Track
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* DEMO REQUEST MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800 font-sans space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Book Private Institutional Demo</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {demoSubmitted ? (
              <div className="p-6 text-center space-y-3 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Demo Request Received</h4>
                <p className="text-xs text-slate-500">
                  Our commercial onboarding director will reach out within 2 hours to confirm your demonstration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-slate-600 block mb-1">Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-sans"
                  />
                </div>

                <div>
                  <label className="text-slate-600 block mb-1">Work Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@apexmechanical.com"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 block mb-1">Company Legal Entity:</label>
                    <input
                      type="text"
                      placeholder="Apex Mechanical LLC"
                      value={demoCompany}
                      onChange={(e) => setDemoCompany(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1">Annual Contract Volume:</label>
                    <select
                      value={demoVolume}
                      onChange={(e) => setDemoVolume(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-sans"
                    >
                      <option value="$1M - $5M">$1M - $5M</option>
                      <option value="$5M - $20M">$5M - $20M</option>
                      <option value="$20M+">$20M+</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition mt-2 cursor-pointer shadow-xs"
                >
                  Submit Institutional Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SIGN IN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl text-slate-800 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Sign In to ECONOS FinOps</h3>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                {loginError}
              </div>
            )}

            <form onSubmit={handlePasswordLogin} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-600 block mb-1">Account Email:</label>
                <input
                  type="email"
                  required
                  placeholder="auditor@econos.io"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-sans"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Password:</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold transition mt-2 cursor-pointer shadow-xs"
              >
                Sign In With Password
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 space-y-2 font-mono text-xs">
              <p className="text-slate-500 text-center text-[11px]">Or access without password:</p>
              <button
                type="button"
                onClick={handleInstantSandbox}
                className="w-full py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Auditor Sandbox Access</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
