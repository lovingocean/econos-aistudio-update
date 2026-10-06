import React, { useState } from 'react';
import {
  ShieldAlert,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Sparkles,
  FileText,
  Scale,
  ShieldCheck,
  Building,
  ArrowRight
} from 'lucide-react';

interface DelayEvent {
  id: string;
  noticeNumber: string;
  cause: string;
  category: 'ARCHITECT_RFI_LAG' | 'UNFORESEEN_SITE_CONDITION' | 'FORCE_MAJEURE_WEATHER' | 'TRADE_STACKING';
  daysDelayed: number;
  dailyLdRate: number; // e.g. $2,500/day
  noticeStatus: 'TIMELY_SERVED_AIA' | 'DRAFT_PENDING' | 'ACCEPTED_BY_OWNER';
  dateOccurred: string;
  noticeServedDate: string;
  protectedLdAmount: number;
}

const INITIAL_DELAYS: DelayEvent[] = [
  {
    id: 'del-1',
    noticeNumber: 'NOD-2026-001',
    cause: 'Architect RFI #042 Response Delayed by 19 Calendar Days (Chilled Water Beam Penetration)',
    category: 'ARCHITECT_RFI_LAG',
    daysDelayed: 19,
    dailyLdRate: 3500,
    noticeStatus: 'ACCEPTED_BY_OWNER',
    dateOccurred: '2026-07-10',
    noticeServedDate: '2026-07-15', // Served within 5 days (well inside 14-day window)
    protectedLdAmount: 66500
  },
  {
    id: 'del-2',
    noticeNumber: 'NOD-2026-002',
    cause: 'Unforeseen Asbestos Encounter in Electrical Riser Shaft Level 2 (Hazard Abatement Stop-Work)',
    category: 'UNFORESEEN_SITE_CONDITION',
    daysDelayed: 12,
    dailyLdRate: 3500,
    noticeStatus: 'ACCEPTED_BY_OWNER',
    dateOccurred: '2026-08-01',
    noticeServedDate: '2026-08-04',
    protectedLdAmount: 42000
  },
  {
    id: 'del-3',
    noticeNumber: 'NOD-2026-003',
    cause: 'Drywall Framing Subcontractor Trade Stacking Blocking Mechanical Duct Installation in Corridor B',
    category: 'TRADE_STACKING',
    daysDelayed: 8,
    dailyLdRate: 3500,
    noticeStatus: 'TIMELY_SERVED_AIA',
    dateOccurred: '2026-09-22',
    noticeServedDate: '2026-09-25',
    protectedLdAmount: 28000
  }
];

export const CommercialLiquidatedDamagesWorkspace: React.FC = () => {
  const [delays, setDelays] = useState<DelayEvent[]>(INITIAL_DELAYS);
  const [dailyLiquidatedDamagesRate, setDailyLiquidatedDamagesRate] = useState<number>(3500);
  const [selectedDelayId, setSelectedDelayId] = useState<string>(INITIAL_DELAYS[0].id);
  const [showNoticeModal, setShowNoticeModal] = useState<boolean>(false);

  const totalProtectedLd = delays.reduce((sum, d) => sum + d.protectedLdAmount, 0);
  const totalDaysClaimed = delays.reduce((sum, d) => sum + d.daysDelayed, 0);

  const selectedDelay = delays.find(d => d.id === selectedDelayId) || delays[0];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-6 text-white shadow-xl border border-rose-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AIA Document A201™ General Conditions § 8.3</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Liquidated Damages Defense &amp; Forensic Delay Sentinel</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Protects subcontractors against $3,500/day liquidated damages penalties and backcharges. Automatically enforces the strict contractual 14-day Notice of Delay window under AIA A201, providing forensic delay documentation for owner-caused critical path hindrances.
            </p>
          </div>

          <div className="bg-rose-900/80 backdrop-blur-md rounded-xl p-4 border border-rose-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-rose-300">Protected From Backcharges</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${totalProtectedLd.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">{totalDaysClaimed} Calendar Days Defended</p>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Contractual Daily LD Rate</span>
          <p className="text-xl font-black text-rose-700">${dailyLiquidatedDamagesRate.toLocaleString()} / day</p>
          <p className="text-[10px] text-slate-500 font-sans">Late completion penalty clause</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Total Excusable Days</span>
          <p className="text-xl font-black text-slate-900">{totalDaysClaimed} Days</p>
          <p className="text-[10px] text-slate-500 font-sans">Forensically logged critical path lag</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Notice Timeliness</span>
          <p className="text-xl font-black text-emerald-700">100% Timely</p>
          <p className="text-[10px] text-slate-500 font-sans">Served within 14-day AIA mandate</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Dispute Immunity</span>
          <p className="text-xl font-black text-emerald-600">Zero LD Liability</p>
          <p className="text-[10px] text-slate-500 font-sans">All delays certified excusable</p>
        </div>
      </div>

      {/* DELAY LOG TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Forensic Delay Notices &amp; Excusable Schedule Extensions</h3>
            <p className="text-xs text-slate-500">Statutory Notice of Delay filings under AIA A201 § 8.3 &amp; ConsensusDocs 200</p>
          </div>

          <button
            type="button"
            onClick={() => setShowNoticeModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-rose-400" />
            <span>Generate Official Notice of Delay</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {delays.map(del => (
            <div
              key={del.id}
              onClick={() => setSelectedDelayId(del.id)}
              className={`p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition cursor-pointer ${
                del.id === selectedDelayId ? 'bg-rose-50/40 border-l-4 border-l-rose-600' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded text-[11px]">
                    {del.noticeNumber}
                  </span>
                  <h4 className="font-bold text-slate-900 font-sans text-sm">{del.cause}</h4>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Occurred: {del.dateOccurred} | Notice Served: <strong className="text-slate-800">{del.noticeServedDate}</strong> (Timely)
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <p className="font-black text-rose-700 text-sm">+{del.daysDelayed} Days Extension</p>
                  <p className="text-[10px] text-emerald-700 font-bold">${del.protectedLdAmount.toLocaleString()} Protected</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  ✓ {del.noticeStatus.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTICE MODAL */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-slate-900">FORMAL NOTICE OF DELAY (AIA A201 § 8.3)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNoticeModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <p className="font-bold text-slate-900">TO: GENERAL CONTRACTOR &amp; ARCHITECT OF RECORD</p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                <p><strong>NOTICE ID:</strong> {selectedDelay.noticeNumber}</p>
                <p><strong>EXCUSABLE CAUSE:</strong> {selectedDelay.cause}</p>
                <p><strong>DAYS OF TIME IMPACT:</strong> {selectedDelay.daysDelayed} Calendar Days</p>
                <p><strong>STATUTORY DEFENSE:</strong> Served within contractual notice period to preserve Substantial Completion extension rights.</p>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                "Contractor formally requests an extension of Contract Time corresponding to the full duration of said excusable delay, and reserves all rights under contract and law."
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Formal Notice PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowNoticeModal(false)}
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
