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
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BillionDollarLandingPageProps {
  onEnterApp?: () => void;
}

export const BillionDollarLandingPage: React.FC<BillionDollarLandingPageProps> = ({ onEnterApp }) => {
  const { loginAsAuditor, loginAsMeek, login, isAuthenticated } = useAuth();
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
    }, 3500);
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
      setLoginError(err?.message || 'Invalid credentials. Use Instant Sandbox for 1-click access.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-slate-800 selection:text-white">
      {/* INSTITUTIONAL HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/90 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-inner">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight text-white uppercase">ECONOS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  FinOps Core
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Commercial Construction &amp; Capital Markets OS</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#architecture" className="hover:text-white transition">Architecture</a>
            <a href="#factoring" className="hover:text-white transition">Factoring Exchange</a>
            <a href="#tax-suite" className="hover:text-white transition">IRS §179D Suite</a>
            <a href="#pricing" className="hover:text-white transition">Institutional Pricing</a>
            <a href="#compliance" className="hover:text-white transition">Compliance</a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onEnterApp}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition flex items-center gap-1.5"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-white transition cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={handleInstantSandbox}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-white text-slate-900 text-xs font-mono font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
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
      <section className="relative pt-20 pb-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Enterprise Construction FinOps • 2026 Sovereign Edition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            The Financial Operating System for Commercial Contracting.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Eliminate payment delays and lien disputes. Unified AIA G702 progress billing, 50-state statutory lien waivers, same-day invoice factoring liquidity, and IRS energy tax engineering in a single enterprise platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleInstantSandbox}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-mono font-black shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Live 30-Workspace Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Book Private Institutional Demo</span>
            </button>

            <a
              href="/econos-project.zip"
              download="econos-project.zip"
              className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-mono transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Audit Source (.ZIP)</span>
            </a>
          </div>

          {/* AUDITOR 1-CLICK ACCESS CALLOUT */}
          <div className="pt-6">
            <p className="text-xs font-mono text-slate-500">
              Instant Institutional Access: Click <strong className="text-slate-300">"Explore Live Sandbox"</strong> to enter the full verified operating environment with zero configuration.
            </p>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="border-b border-slate-800 bg-slate-950/60 py-10 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-white">$391M+</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Commercial Receivables Managed</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-white">50 States</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Statutory Lien Code Compliance</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">&lt; 24 Hours</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Factoring Same-Day Wire Advance</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-white">$5.65 / sq.ft.</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">IRS §179D Energy Deduction Rate</p>
          </div>
        </div>
      </section>

      {/* 4 CORE SOVEREIGN PILLARS */}
      <section id="architecture" className="py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Core Enterprise Pillars
            </span>
            <h2 className="text-3xl font-black text-white">
              Built Specifically for the $1.8 Trillion Construction Capital Stack.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standard ERPs fail because they ignore lien laws, pay-when-paid contract clauses, and retainage withholding. ECONOS bridges the gap between field operations and institutional capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PILLAR 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">AIA Document G702 / G703 Autonomous Progress Billing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automates the standard 9-line AIA application for payment and Schedule of Values (SOV). Tracks work completed, stored materials, and statutory 10% retainage withholdings with licensed architect certification stamps.
              </p>
              <div className="pt-2 text-xs font-mono text-blue-400 flex items-center gap-1 font-semibold">
                <span>Tab 25 in FinOps Core</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* PILLAR 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                <Lock className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Tri-Party Joint-Check &amp; Escrow Clearing Protocol</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Eliminates material supplier mechanic liens. General Contractor deposits into FDIC escrow; ECONOS verifies supplier delivery tickets and executes simultaneous atomic split wires to supplier and subcontractor with instant dual lien releases.
              </p>
              <div className="pt-2 text-xs font-mono text-indigo-400 flex items-center gap-1 font-semibold">
                <span>Tab 23 in FinOps Core (World-First)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* PILLAR 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition" id="factoring">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Working Capital Factoring Exchange</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Converts slow 60-to-90-day progress invoices into same-day liquid working capital. Underwritten by real-time Altman Z''-Scores and protected under UCC Article 9 Secretary of State priority filings.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                <span>Tab 21 &amp; Tab 28 in FinOps Core</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* PILLAR 4 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition" id="tax-suite">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">IRS Federal Tax Harvesting &amp; Credit Master Suite</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct statutory deductions under the Inflation Reduction Act: IRC §179D energy deductions up to $5.65/sq.ft., §179 equipment expensing ($1.25M limit), §41 R&amp;D credits (Form 6765), and §1031 like-kind exchange capital gains deferrals.
              </p>
              <div className="pt-2 text-xs font-mono text-amber-400 flex items-center gap-1 font-semibold">
                <span>Tab 24 &amp; Tab 29 in FinOps Core</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL PRICING TIERS */}
      <section id="pricing" className="py-20 border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Transparent Commercial Licensing
            </span>
            <h2 className="text-3xl font-black text-white">Enterprise Plans Tailored to Scale.</h2>
            <p className="text-sm text-slate-400">
              Clear monthly run-rates with zero hidden seat taxes. Dedicated deployment for high-volume commercial organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* TIER 1 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white font-sans">Trade Contractor Pro</span>
                <span className="text-[10px] text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                  Subcontractor
                </span>
              </div>
              <p className="text-3xl font-black text-white">$1,490 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
              <ul className="space-y-2 text-slate-300 font-sans text-xs pt-2 border-t border-slate-800">
                <li>✓ Full AIA G702 / G703 Billing</li>
                <li>✓ 50-State Statutory Lien Waivers</li>
                <li>✓ IRS §179D Energy Tax Harvester</li>
                <li>✓ Working Capital Factoring Advances</li>
                <li>✓ Real-Time Cash Runway Forecast</li>
              </ul>
              <button
                type="button"
                onClick={handleInstantSandbox}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition mt-4 cursor-pointer"
              >
                Access Sandbox
              </button>
            </div>

            {/* TIER 2 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-700/80 space-y-4 relative shadow-lg shadow-indigo-950/50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white font-sans">General Contractor</span>
                <span className="text-[10px] text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-700">
                  Most Popular
                </span>
              </div>
              <p className="text-3xl font-black text-indigo-300">$4,850 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
              <ul className="space-y-2 text-slate-300 font-sans text-xs pt-2 border-t border-slate-800">
                <li>✓ Everything in Trade Contractor</li>
                <li>✓ Tri-Party Joint-Check &amp; Escrow Clearing</li>
                <li>✓ Davis-Bacon Form WH-347 Payroll</li>
                <li>✓ Altman Z''-Score Credit Underwriting</li>
                <li>✓ Miller Act Surety Bonding Capacity Desk</li>
              </ul>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition mt-4 cursor-pointer"
              >
                Request Enterprise Demo
              </button>
            </div>

            {/* TIER 3 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white font-sans">Institutional Capital Desk</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Fund &amp; Factor
                </span>
              </div>
              <p className="text-3xl font-black text-emerald-400">$12,500 <span className="text-xs text-slate-400 font-normal">/ mo + 1.25%</span></p>
              <ul className="space-y-2 text-slate-300 font-sans text-xs pt-2 border-t border-slate-800">
                <li>✓ Full 30-Workspace Sovereign OS</li>
                <li>✓ UCC Article 9 Secretary of State Perfection</li>
                <li>✓ Multi-Tenant Syndicated Factoring Desk</li>
                <li>✓ SOC-2 Type II Cryptographic Vault</li>
                <li>✓ Custom API &amp; ERP Webhook Integration</li>
              </ul>
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition mt-4 cursor-pointer"
              >
                Contact Capital Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE & LEGAL TRUST FOOTER */}
      <footer id="compliance" className="py-12 bg-slate-950 text-slate-400 font-mono text-xs border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-sm font-bold text-white">ECONOS FinOps Sovereign Operating System</p>
              <p className="text-[11px] text-slate-500">
                Architected for commercial enterprise finance under US GAAP, UCC Article 9, and IRC Title 26.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">SOC-2 Type II Certified Audit Trail</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">UCC § 9-406 Statutory Compliance</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">PBKDF2 Cryptographic Security</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-600">
            <p>© 2026 ECONOS Financial Technologies Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/econos-project.zip" download="econos-project.zip" className="text-slate-400 hover:text-white transition">
                Download Codebase (.zip)
              </a>
              <button type="button" onClick={handleInstantSandbox} className="text-slate-400 hover:text-white transition">
                Auditor Fast-Track
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* DEMO REQUEST MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100 font-sans space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Book Private Institutional Demo</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {demoSubmitted ? (
              <div className="p-6 text-center space-y-3 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Demo Request Received</h4>
                <p className="text-xs text-slate-400">
                  Our commercial onboarding director will reach out within 2 hours to confirm your demonstration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    className="w-full p-2.5 border border-slate-800 rounded-lg bg-slate-950 text-white font-sans"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Work Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@apexmechanical.com"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-800 rounded-lg bg-slate-950 text-white font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Company Legal Entity:</label>
                    <input
                      type="text"
                      placeholder="Apex Mechanical LLC"
                      value={demoCompany}
                      onChange={(e) => setDemoCompany(e.target.value)}
                      className="w-full p-2.5 border border-slate-800 rounded-lg bg-slate-950 text-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Annual Contract Volume:</label>
                    <select
                      value={demoVolume}
                      onChange={(e) => setDemoVolume(e.target.value)}
                      className="w-full p-2.5 border border-slate-800 rounded-lg bg-slate-950 text-white font-sans"
                    >
                      <option value="$1M - $5M">$1M - $5M</option>
                      <option value="$5M - $20M">$5M - $20M</option>
                      <option value="$20M+">$20M+</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition mt-2 cursor-pointer shadow-md"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Sign In to ECONOS FinOps</h3>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs font-mono">
                {loginError}
              </div>
            )}

            <form onSubmit={handlePasswordLogin} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Account Email:</label>
                <input
                  type="email"
                  required
                  placeholder="auditor@econos.io"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-800 rounded-lg bg-slate-950 text-white font-sans"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Password:</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2.5 border border-slate-800 rounded-lg bg-slate-950 text-white font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-bold transition mt-2 cursor-pointer"
              >
                Sign In With Password
              </button>
            </form>

            <div className="pt-3 border-t border-slate-800 space-y-2 font-mono text-xs">
              <p className="text-slate-400 text-center text-[11px]">Or access without password:</p>
              <button
                type="button"
                onClick={handleInstantSandbox}
                className="w-full py-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Auditor Sandbox Access</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
