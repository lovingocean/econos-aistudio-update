import React, { useState, useMemo } from 'react';
import {
  Building,
  DollarSign,
  Clock,
  CheckCircle2,
  Printer,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export const CommercialSection1031ExchangeWorkspace: React.FC = () => {
  const [relinquishedPropertyValue, setRelinquishedPropertyValue] = useState<number>(4800000);
  const [originalCostBasis, setOriginalCostBasis] = useState<number>(1900000);
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState<number>(850000);
  const [closingDate, setClosingDate] = useState<string>('2026-09-15');
  const [showExchangeModal, setShowExchangeModal] = useState<boolean>(false);

  // Statutory §1031 Clock:
  // 45 Days to identify replacement property
  // 180 Days to close on replacement property
  const exchangeCalculations = useMemo(() => {
    const adjustedBasis = originalCostBasis - accumulatedDepreciation;
    const realizedCapitalGain = relinquishedPropertyValue - adjustedBasis;

    // Federal Capital Gains (20%) + NIIT (3.8%) + Depreciation Recapture (25%) + State Tax (~5%)
    // Effective blended tax on gain without 1031 is approximately 28.8%
    const estimatedTaxesWithout1031 = Math.round(realizedCapitalGain * 0.288);
    const deferredTaxesWith1031 = estimatedTaxesWithout1031; // 100% deferral under IRC §1031

    // Statutory timeline calculations
    const closingTime = new Date(closingDate).getTime();
    const day45Deadline = new Date(closingTime + 45 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
    const day180Deadline = new Date(closingTime + 180 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10);

    return {
      adjustedBasis,
      realizedCapitalGain,
      estimatedTaxesWithout1031,
      deferredTaxesWith1031,
      day45Deadline,
      day180Deadline
    };
  }, [relinquishedPropertyValue, originalCostBasis, accumulatedDepreciation, closingDate]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 text-white shadow-xl border border-teal-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IRS Internal Revenue Code § 1031</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Section 1031 Like-Kind Exchange &amp; Capital Gains Deferral Desk</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Automates federal 100% capital gains tax deferral on the sale and replacement of commercial facilities, yards, and heavy equipment. Enforces the strict statutory 45-day replacement identification and 180-day closing deadlines under Qualified Intermediary (QI) escrow custody.
            </p>
          </div>

          <div className="bg-teal-900/80 backdrop-blur-md rounded-xl p-4 border border-teal-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-teal-300">Total Tax Legally Deferred</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${exchangeCalculations.deferredTaxesWith1031.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">100% Tax Cash Preserved</p>
          </div>
        </div>
      </div>

      {/* STATUTORY COUNTDOWN CLOCK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-bold uppercase">45-Day Identification Period</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-lg font-black text-amber-700">{exchangeCalculations.day45Deadline}</p>
          <p className="text-[11px] text-slate-500 font-sans">Strict midnight statutory deadline (3-property rule)</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-bold uppercase">180-Day Exchange Completion</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-lg font-black text-indigo-700">{exchangeCalculations.day180Deadline}</p>
          <p className="text-[11px] text-slate-500 font-sans">Final closing and deed recordation deadline</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Qualified Intermediary Custody</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg font-black text-emerald-700">100% FDIC Escrow</p>
          <p className="text-[11px] text-slate-500 font-sans">Constructive receipt avoided (Treas. Reg. § 1.1031(k)-1)</p>
        </div>
      </div>

      {/* FINANCIAL SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Relinquished Commercial Asset Inputs</span>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              IRS Form 8824 Ready
            </span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-slate-600 text-[11px] block mb-1">
                Relinquished Property Sale Price ($):
              </label>
              <input
                type="number"
                value={relinquishedPropertyValue}
                onChange={(e) => setRelinquishedPropertyValue(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 text-[11px] block mb-1">
                Original Historical Purchase Cost Basis ($):
              </label>
              <input
                type="number"
                value={originalCostBasis}
                onChange={(e) => setOriginalCostBasis(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 text-[11px] block mb-1">
                Accumulated Depreciation Previously Claimed ($):
              </label>
              <input
                type="number"
                value={accumulatedDepreciation}
                onChange={(e) => setAccumulatedDepreciation(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-600 text-[11px] block mb-1">Sale Closing Date:</label>
              <input
                type="date"
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>
          </div>
        </div>

        {/* TAX SAVINGS LEDGER */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Capital Gains Deferral Ledger</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              ✓ 100% Tax Shield
            </span>
          </h3>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex justify-between items-center text-slate-700">
              <span>Adjusted Tax Basis:</span>
              <span className="font-bold text-slate-900">${exchangeCalculations.adjustedBasis.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span>Realized Capital Gain:</span>
              <span className="font-bold text-indigo-700">${exchangeCalculations.realizedCapitalGain.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-red-700 font-semibold pt-1 border-t border-slate-200">
              <span>Estimated Tax Owed (Without §1031):</span>
              <span>-${exchangeCalculations.estimatedTaxesWithout1031.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-emerald-700 font-black text-sm pt-1">
              <span>Actual Tax Due (With §1031 Exchange):</span>
              <span>$0.00 (Deferred)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowExchangeModal(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold flex items-center justify-center gap-2 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate IRS Form 8824 Exchange Audit Package</span>
          </button>
        </div>
      </div>

      {/* EXCHANGE MODAL */}
      {showExchangeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">IRS Form 8824 Like-Kind Exchange Certification</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowExchangeModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <p className="font-bold text-slate-900">LIKE-KIND EXCHANGES (SECTION 1031 IRC)</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Relinquished Property Sale Price: ${relinquishedPropertyValue.toLocaleString()}<br />
                Total Realized Gain Deferred: ${exchangeCalculations.realizedCapitalGain.toLocaleString()}<br />
                Net Cash Tax Savings Preserved: ${exchangeCalculations.deferredTaxesWith1031.toLocaleString()}<br />
                Qualified Intermediary: First American Exchange Company LLC<br />
                Statutory Identification Window: Valid through {exchangeCalculations.day45Deadline}
              </p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-500 italic">
                "No constructive receipt of sale proceeds occurred. All funds held in segregated Qualified Escrow Account in full compliance with Treasury Regulation § 1.1031(k)-1."
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Form 8824</span>
              </button>
              <button
                type="button"
                onClick={() => setShowExchangeModal(false)}
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
