import React, { useState, useMemo } from 'react';
import {
  Coins,
  Layers,
  TrendingUp,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Printer,
  PieChart,
  ArrowRight,
  DollarSign
} from 'lucide-react';

interface AbsTranche {
  name: string;
  rating: string;
  allocationPercentage: number;
  couponYield: number;
  targetInvestor: string;
  lossSubordination: string;
}

const INITIAL_TRANCHES: AbsTranche[] = [
  {
    name: 'Class A Senior Notes',
    rating: 'AAA (Moody’s / S&P)',
    allocationPercentage: 75, // $37.5M of $50M pool
    couponYield: 6.20,
    targetInvestor: 'Institutional Life Insurers & State Pension Funds',
    lossSubordination: 'First Priority (Protected by 25% Junior Cushion)'
  },
  {
    name: 'Class B Mezzanine Notes',
    rating: 'BBB (Investment Grade)',
    allocationPercentage: 15, // $7.5M of $50M pool
    couponYield: 9.40,
    targetInvestor: 'Private Credit Funds & Family Offices',
    lossSubordination: 'Subordinated to Class A (Protected by 10% Equity Cushion)'
  },
  {
    name: 'Class C First-Loss Equity Residual',
    rating: 'Unrated (Retained Sponsor Equity)',
    allocationPercentage: 10, // $5.0M of $50M pool
    couponYield: 18.80,
    targetInvestor: 'ECONOS Liquidity Fund General Partner (GP)',
    lossSubordination: 'Absorbs First Defaults; Captures Excess Arbitrage Spread'
  }
];

export const CommercialSecuritizationWorkspace: React.FC = () => {
  const [securitizedPoolSize, setSecuritizedPoolSize] = useState<number>(50000000); // $50M ABS Pool
  const [averageInvoiceFactoringRate, setAverageInvoiceFactoringRate] = useState<number>(14.50); // 14.5% APR paid by contractors
  const [showSpvModal, setShowSpvModal] = useState<boolean>(false);

  const calculations = useMemo(() => {
    // Blended cost of capital paid to noteholders:
    // (75% * 6.20%) + (15% * 9.40%) + (10% * 18.80%) = 4.65% + 1.41% + 1.88% = 7.94%
    const blendedCostOfCapital = (0.75 * 6.20) + (0.15 * 9.40) + (0.10 * 18.80);
    const grossIncomeFromInvoices = securitizedPoolSize * (averageInvoiceFactoringRate / 100);
    const totalCouponPaidToInvestors = securitizedPoolSize * (blendedCostOfCapital / 100);
    const netExcessSpreadToFund = grossIncomeFromInvoices - totalCouponPaidToInvestors;

    return {
      blendedCostOfCapital: Number(blendedCostOfCapital.toFixed(2)),
      grossIncomeFromInvoices: Math.round(grossIncomeFromInvoices),
      totalCouponPaidToInvestors: Math.round(totalCouponPaidToInvestors),
      netExcessSpreadToFund: Math.round(netExcessSpreadToFund)
    };
  }, [securitizedPoolSize, averageInvoiceFactoringRate]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 text-white shadow-xl border border-purple-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wall Street Capital Markets &amp; Structured Finance</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Asset-Backed Securitization (ABS) &amp; Tranche Waterfall Desk</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Packages pooled commercial contractor receivables and factoring advances into bankruptcy-remote Special Purpose Vehicles (SPV). Issues AAA Senior, Mezzanine, and First-Loss Equity tranches to pension funds, unlocking infinite off-balance-sheet liquidity.
            </p>
          </div>

          <div className="bg-purple-900/80 backdrop-blur-md rounded-xl p-4 border border-purple-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-purple-300">Net Fund Excess Spread</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              +${calculations.netExcessSpreadToFund.toLocaleString()} / yr
            </p>
            <p className="text-[10px] text-slate-300">Blended Investor Cost: {calculations.blendedCostOfCapital}%</p>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">SPV Securitized Pool</span>
          <p className="text-xl font-black text-slate-900">${(securitizedPoolSize / 1000000).toFixed(0)}M Asset Pool</p>
          <p className="text-[10px] text-slate-500 font-sans">Bankruptcy-remote Delaware statutory trust</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Contractor Factor Rate</span>
          <p className="text-xl font-black text-indigo-700">{averageInvoiceFactoringRate}% APR Gross</p>
          <p className="text-[10px] text-slate-500 font-sans">Underwritten by UCC Article 9 filings</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">AAA Senior Allocation</span>
          <p className="text-xl font-black text-emerald-700">75% ($37.5M)</p>
          <p className="text-[10px] text-slate-500 font-sans">Priced at 6.20% fixed coupon</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">First-Loss Equity Yield</span>
          <p className="text-xl font-black text-purple-700">18.80% Net IRR</p>
          <p className="text-[10px] text-slate-500 font-sans">Retained GP sponsor cash flow</p>
        </div>
      </div>

      {/* TRANCHE WATERFALL TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Capital Structure Tranche Waterfall</h3>
            <p className="text-xs text-slate-500">Subordination priority and institutional investor debt issuance</p>
          </div>

          <button
            type="button"
            onClick={() => setShowSpvModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-purple-400" />
            <span>Generate ABS Offering Memorandum (Rule 144A)</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {INITIAL_TRANCHES.map((tranche, idx) => {
            const dollarAmount = securitizedPoolSize * (tranche.allocationPercentage / 100);
            return (
              <div key={idx} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 font-sans text-sm">{tranche.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                      {tranche.rating}
                    </span>
                  </div>
                  <p className="text-slate-600 font-sans text-xs">
                    Target: <strong className="text-slate-800">{tranche.targetInvestor}</strong>
                  </p>
                  <p className="text-slate-500 text-[10px]">{tranche.lossSubordination}</p>
                </div>

                <div className="flex items-center gap-8 shrink-0">
                  <div className="text-right">
                    <p className="text-slate-500 text-[10px]">Tranche Principal:</p>
                    <p className="font-bold text-slate-900 text-sm">
                      ${dollarAmount.toLocaleString()} ({tranche.allocationPercentage}%)
                    </p>
                  </div>

                  <div className="text-right w-28">
                    <p className="text-slate-500 text-[10px]">Coupon Yield:</p>
                    <p className="font-black text-emerald-700 text-sm">{tranche.couponYield.toFixed(2)}% APY</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OFFERING MEMO MODAL */}
      {showSpvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900">SEC RULE 144A ABS OFFERING MEMORANDUM</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSpvModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <p className="font-bold text-slate-900">ECONOS COMMERCIAL RECEIVABLES TRUST 2026-1</p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                <p>Total Securitized Assets: <strong>${securitizedPoolSize.toLocaleString()}</strong></p>
                <p>Class A Senior (AAA): <strong>$37,500,000 @ 6.20% Coupon</strong></p>
                <p>Class B Mezzanine (BBB): <strong>$7,500,000 @ 9.40% Coupon</strong></p>
                <p>Class C Retained Equity: <strong>$5,000,000 @ 18.80% Target IRR</strong></p>
                <p>Annual Net Fund Spread: <strong className="text-emerald-700">+${calculations.netExcessSpreadToFund.toLocaleString()}</strong></p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Memorandum PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSpvModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition cursor-pointer"
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
