import React, { useState } from 'react';
import {
  Globe,
  DollarSign,
  ArrowRightLeft,
  CheckCircle2,
  Lock,
  Printer,
  Sparkles,
  ShieldCheck,
  Building2,
  FileCheck2,
  TrendingDown,
  Layers
} from 'lucide-react';

interface LetterOfCredit {
  id: string;
  lcNumber: string;
  beneficiary: string; // e.g. Daikin Industries Ltd (Osaka, Japan)
  equipmentDescription: string;
  currency: 'EUR' | 'JPY' | 'GBP';
  foreignAmount: number;
  usdEquivalent: number;
  hedgedForwardRate: number;
  issuingBank: string;
  expiryDate: string;
  status: 'ISSUED_HEDGED' | 'CUSTOMS_CLEARED' | 'SETTLED';
}

const INITIAL_LCS: LetterOfCredit[] = [
  {
    id: 'lc-1',
    lcNumber: 'LC-2026-DK-0881',
    beneficiary: 'Daikin Applied Industries Ltd. (Osaka, Japan)',
    equipmentDescription: 'Two (2) 1,200-Ton Magnetic Bearing Centrifugal Water Chillers',
    currency: 'JPY',
    foreignAmount: 480000000, // ¥480,000,000
    usdEquivalent: 3200000,
    hedgedForwardRate: 150.00, // Locked via FX Forward
    issuingBank: 'JPMorgan Chase Bank N.A. (Global Trade Services)',
    expiryDate: '2026-12-15',
    status: 'ISSUED_HEDGED'
  },
  {
    id: 'lc-2',
    lcNumber: 'LC-2026-SM-4410',
    beneficiary: 'Siemens Energy AG (Munich, Germany)',
    equipmentDescription: 'High-Voltage Medium 13.8kV Gas-Insulated Switchgear (GIS) Lineup',
    currency: 'EUR',
    foreignAmount: 2450000, // €2,450,000
    usdEquivalent: 2695000,
    hedgedForwardRate: 1.10, // Locked EUR/USD Forward
    issuingBank: 'Bank of America N.A. (Trade & Supply Chain)',
    expiryDate: '2027-01-30',
    status: 'ISSUED_HEDGED'
  }
];

export const CommercialTradeFinanceWorkspace: React.FC = () => {
  const [credits, setCredits] = useState<LetterOfCredit[]>(INITIAL_LCS);
  const [showLcModal, setShowLcModal] = useState<boolean>(false);
  const [selectedLcId, setSelectedLcId] = useState<string>(INITIAL_LCS[0].id);

  const totalUsdCommitment = credits.reduce((sum, c) => sum + c.usdEquivalent, 0);
  const selectedLc = credits.find(c => c.id === selectedLcId) || credits[0];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 text-white shadow-xl border border-sky-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>International Trade Finance &amp; ICC UCP 600 Rules</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Cross-Border Trade Finance &amp; Letters of Credit (LC) Desk</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Manages multi-million dollar import contracts for heavy foreign equipment (chillers, transformers, high-voltage switchgear). Issues irrevocable commercial letters of credit and locks in forward FX contracts, eliminating currency volatility risks during 9-month manufacturing cycles.
            </p>
          </div>

          <div className="bg-sky-900/80 backdrop-blur-md rounded-xl p-4 border border-sky-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-sky-300">Total Hedged Import Commitment</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${totalUsdCommitment.toLocaleString()} USD
            </p>
            <p className="text-[10px] text-slate-300">100% FX Volatility Hedged</p>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Active Letters of Credit</span>
          <p className="text-xl font-black text-slate-900">{credits.length} Irrevocable LCs</p>
          <p className="text-[10px] text-slate-500 font-sans">Under ICC UCP 600 standards</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Issuing Banks</span>
          <p className="text-xl font-black text-indigo-700">JPMorgan &amp; BofA</p>
          <p className="text-[10px] text-slate-500 font-sans">Top-tier global credit lines</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">FX Hedging Efficiency</span>
          <p className="text-xl font-black text-emerald-700">0.00% Exposure</p>
          <p className="text-[10px] text-emerald-600 font-sans font-bold">100% Forward Locked</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Estimated FX Savings</span>
          <p className="text-xl font-black text-emerald-600">+$418,000 Saved</p>
          <p className="text-[10px] text-slate-500 font-sans">Protected from Yen/Euro surges</p>
        </div>
      </div>

      {/* LC LIST */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Commercial Letter of Credit Schedule</h3>
            <p className="text-xs text-slate-500">Documentary trade credits protecting high-value international equipment deliveries</p>
          </div>

          <button
            type="button"
            onClick={() => setShowLcModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-sky-400" />
            <span>Generate Official LC Verification</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {credits.map(lc => (
            <div
              key={lc.id}
              onClick={() => setSelectedLcId(lc.id)}
              className={`p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition cursor-pointer ${
                lc.id === selectedLcId ? 'bg-sky-50/40 border-l-4 border-l-sky-600' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded text-[11px]">
                    {lc.lcNumber}
                  </span>
                  <h4 className="font-bold text-slate-900 font-sans text-sm">{lc.beneficiary}</h4>
                </div>
                <p className="text-slate-600 font-sans text-xs">{lc.equipmentDescription}</p>
                <p className="text-slate-500 text-[10px]">Issuing Bank: {lc.issuingBank} | Expiry: {lc.expiryDate}</p>
              </div>

              <div className="flex items-center gap-8 shrink-0">
                <div className="text-right">
                  <p className="text-slate-500 text-[10px]">Foreign / USD Value:</p>
                  <p className="font-bold text-slate-900 text-sm">
                    {lc.currency === 'JPY' ? `¥${lc.foreignAmount.toLocaleString()}` : `€${lc.foreignAmount.toLocaleString()}`}
                  </p>
                  <p className="text-emerald-700 font-black text-xs">${lc.usdEquivalent.toLocaleString()} USD</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  ✓ {lc.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LC MODAL */}
      {showLcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">ICC UCP 600 IRREVOCABLE COMMERCIAL LETTER OF CREDIT</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLcModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                <p><strong>DOCUMENTARY CREDIT NUMBER:</strong> {selectedLc.lcNumber}</p>
                <p><strong>BENEFICIARY:</strong> {selectedLc.beneficiary}</p>
                <p><strong>COMMODITY / EQUIPMENT:</strong> {selectedLc.equipmentDescription}</p>
                <p><strong>CREDIT AMOUNT:</strong> ${selectedLc.usdEquivalent.toLocaleString()} USD Equivalent</p>
                <p><strong>ISSUING BANK:</strong> {selectedLc.issuingBank}</p>
                <p><strong>GOVERNING LAW:</strong> Subject to Uniform Customs and Practice for Documentary Credits (ICC Publication No. 600)</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official LC Packet</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPrev => setShowLcModal(false)}
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
