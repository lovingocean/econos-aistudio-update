import React, { useState, useMemo } from 'react';
import {
  Shield,
  DollarSign,
  Building,
  CheckCircle2,
  Printer,
  Sparkles,
  Scale,
  Award,
  FileCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const CommercialSuretyBondingWorkspace: React.FC = () => {
  const [workingCapital, setWorkingCapital] = useState<number>(1250000);
  const [tangibleNetWorth, setTangibleNetWorth] = useState<number>(2800000);
  const [cashBankBalances, setCashBankBalances] = useState<number>(950000);
  const [currentBacklog, setCurrentBacklog] = useState<number>(3400000);
  const [suretyRating, setSuretyRating] = useState<'A+' | 'A' | 'A-'>('A+');
  const [showBondModal, setShowBondModal] = useState<boolean>(false);

  // Industry Standard Surety Underwriting Algorithms:
  // Single Job Capacity = 10x Adjusted Working Capital (or 10-12x based on rating)
  // Aggregate Bonding Capacity = 20x Tangible Net Worth
  const bondingLimits = useMemo(() => {
    const singleJobMultiplier = suretyRating === 'A+' ? 12 : suretyRating === 'A' ? 10 : 8;
    const aggregateMultiplier = suretyRating === 'A+' ? 22 : suretyRating === 'A' ? 20 : 16;

    const singleJobLimit = workingCapital * singleJobMultiplier;
    const aggregateLimit = tangibleNetWorth * aggregateMultiplier;
    const availableBondingCapacity = Math.max(0, aggregateLimit - currentBacklog);
    const utilizationRate = Number(((currentBacklog / aggregateLimit) * 100).toFixed(1));

    return {
      singleJobLimit,
      aggregateLimit,
      availableBondingCapacity,
      utilizationRate
    };
  }, [workingCapital, tangibleNetWorth, currentBacklog, suretyRating]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Federal Miller Act (40 U.S.C. § 3131)</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Commercial Surety Bonding &amp; Capacity Underwriting Desk</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Calculates single-job and aggregate bonding capacity for public works and commercial enterprise projects. Underwrites Bid, Performance, and Payment bonds using institutional surety balance sheet ratios, generating pre-qualification letters for multi-million dollar RFP bids.
            </p>
          </div>

          <div className="bg-indigo-900/80 backdrop-blur-md rounded-xl p-4 border border-indigo-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">Available Bonding Capacity</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${bondingLimits.availableBondingCapacity.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">Single Limit: ${bondingLimits.singleJobLimit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* SURETY CAPACITY METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Single Project Bonding Limit</span>
          <p className="text-xl font-black text-indigo-700">${bondingLimits.singleJobLimit.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 font-sans">Formula: 10x-12x Working Capital</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Aggregate Total Bonding Program</span>
          <p className="text-xl font-black text-slate-900">${bondingLimits.aggregateLimit.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 font-sans">Formula: 20x-22x Tangible Net Worth</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Bonding Line Utilization</span>
          <p className="text-xl font-black text-emerald-700">{bondingLimits.utilizationRate}% Utilized</p>
          <p className="text-[11px] text-slate-500 font-sans">Active Backlog: ${currentBacklog.toLocaleString()}</p>
        </div>
      </div>

      {/* INTERACTIVE BALANCE SHEET INPUTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Surety Underwriting Financial Inputs</span>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Treasury Rating: {suretyRating}
            </span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-slate-600 text-[11px] block mb-1">Adjusted Working Capital ($):</label>
              <input
                type="number"
                value={workingCapital}
                onChange={(e) => setWorkingCapital(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 text-[11px] block mb-1">Tangible Net Worth ($):</label>
              <input
                type="number"
                value={tangibleNetWorth}
                onChange={(e) => setTangibleNetWorth(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 text-[11px] block mb-1">Current Uncompleted Work Backlog ($):</label>
              <input
                type="number"
                value={currentBacklog}
                onChange={(e) => setCurrentBacklog(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 text-[11px] block mb-1">Surety Carrier A.M. Best Rating:</label>
              <select
                value={suretyRating}
                onChange={(e) => setSuretyRating(e.target.value as any)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              >
                <option value="A+">A+ Superior (Treasury Listed Circular 570)</option>
                <option value="A">A Excellent</option>
                <option value="A-">A- Good</option>
              </select>
            </div>
          </div>
        </div>

        {/* BOND ISSUANCE PREVIEW */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Miller Act Statutory Bond Pre-Qualification</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              ✓ Eligible to Bid
            </span>
          </h3>

          <div className="space-y-3 text-slate-600 font-sans text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900">Bid Bond (5% - 10% of Proposal):</p>
              <p className="text-slate-500 font-mono text-[11px]">Up to ${(bondingLimits.singleJobLimit * 0.10).toLocaleString()} Bid Guarantee</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900">Performance Bond (100% of Contract Value):</p>
              <p className="text-slate-500 font-mono text-[11px]">Guarantees completion up to ${bondingLimits.singleJobLimit.toLocaleString()}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900">Payment Bond (100% Material &amp; Labor Protection):</p>
              <p className="text-slate-500 font-mono text-[11px]">Protects 2nd-tier subs and materialmen under Miller Act</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowBondModal(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Formal Surety Pre-Qualification Letter</span>
          </button>
        </div>
      </div>

      {/* BOND LETTER MODAL */}
      {showBondModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Surety Pre-Qualification Letter</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBondModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <p className="font-bold text-slate-900">TO WHOM IT MAY CONCERN / PROCUREMENT OFFICERS</p>
              <p className="text-slate-600 leading-relaxed italic text-[11px]">
                "This letter serves to confirm that Apex Mechanical Solutions LLC is a client in good standing with our surety group. As of October 2026, we are prepared to consider providing Bid, Performance, and Payment bonds for single projects up to ${bondingLimits.singleJobLimit.toLocaleString()} and an aggregate bonding program of ${bondingLimits.aggregateLimit.toLocaleString()}."
              </p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500">
                <span>Surety: Travelers Casualty &amp; Surety (A+ Rated)</span>
                <span>U.S. Treasury Circular 570 Listed</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Surety Letter</span>
              </button>
              <button
                type="button"
                onClick={() => setShowBondModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
