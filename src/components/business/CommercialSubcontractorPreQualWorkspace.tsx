import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  HardHat,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Scale,
  Printer,
  Sparkles,
  Users,
  Search,
  Award
} from 'lucide-react';

interface SubcontractorRiskProfile {
  id: string;
  legalName: string;
  trade: string;
  emrScore: number; // Experience Modification Rate (< 1.00 is good)
  trirRate: number; // Total Recordable Incident Rate (< 2.5 is good)
  generalLiabilityLimit: number; // $1M / $2M
  umbrellaLimit: number; // $5M
  workersCompStatus: 'VERIFIED_ACTIVE' | 'EXPIRED' | 'PENDING';
  additionalInsuredIncluded: boolean;
  waiverOfSubrogation: boolean;
  preQualRating: 'TIER_1_PREFERRED' | 'TIER_2_CONDITIONAL' | 'DISQUALIFIED';
}

const INITIAL_SUBS: SubcontractorRiskProfile[] = [
  {
    id: 'sub-1',
    legalName: 'Apex Mechanical Solutions LLC',
    trade: 'Mechanical, HVAC & Piping',
    emrScore: 0.74,
    trirRate: 0.85,
    generalLiabilityLimit: 2000000,
    umbrellaLimit: 10000000,
    workersCompStatus: 'VERIFIED_ACTIVE',
    additionalInsuredIncluded: true,
    waiverOfSubrogation: true,
    preQualRating: 'TIER_1_PREFERRED'
  },
  {
    id: 'sub-2',
    legalName: 'Vanguard Electrical Systems Inc.',
    trade: 'Commercial Electrical & High Voltage',
    emrScore: 0.88,
    trirRate: 1.40,
    generalLiabilityLimit: 2000000,
    umbrellaLimit: 5000000,
    workersCompStatus: 'VERIFIED_ACTIVE',
    additionalInsuredIncluded: true,
    waiverOfSubrogation: true,
    preQualRating: 'TIER_1_PREFERRED'
  },
  {
    id: 'sub-3',
    legalName: 'Lone Star Steel Erectors LLC',
    trade: 'Structural Steel & Heavy Rigging',
    emrScore: 1.15, // High EMR
    trirRate: 3.80, // High TRIR
    generalLiabilityLimit: 1000000,
    umbrellaLimit: 2000000,
    workersCompStatus: 'VERIFIED_ACTIVE',
    additionalInsuredIncluded: true,
    waiverOfSubrogation: false,
    preQualRating: 'TIER_2_CONDITIONAL'
  }
];

export const CommercialSubcontractorPreQualWorkspace: React.FC = () => {
  const [subs, setSubs] = useState<SubcontractorRiskProfile[]>(INITIAL_SUBS);
  const [selectedSubId, setSelectedSubId] = useState<string>(INITIAL_SUBS[0].id);
  const [showCoiModal, setShowCoiModal] = useState<boolean>(false);

  const selectedSub = subs.find(s => s.id === selectedSubId) || subs[0];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 text-white shadow-xl border border-amber-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OSHA EMR &amp; Insurance COI Underwriting</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Subcontractor Pre-Qualification &amp; Safety Risk Desk</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Standard General Contractor compliance engine used by Turner, Skanska, and Hensel Phelps. Audits subcontractor OSHA Experience Modification Rates (EMR &lt; 1.00), TRIR incident rates, and Certificate of Insurance (COI) endorsements before jobsite contract award.
            </p>
          </div>

          <div className="bg-amber-900/80 backdrop-blur-md rounded-xl p-4 border border-amber-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300">Underwritten Subs</p>
            <p className="text-2xl font-mono font-black text-amber-300">
              {subs.filter(s => s.preQualRating === 'TIER_1_PREFERRED').length} Preferred
            </p>
            <p className="text-[10px] text-slate-300">Zero Uninsured Jobsite Exposure</p>
          </div>
        </div>
      </div>

      {/* METRIC STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Industry EMR Benchmark</span>
          <p className="text-xl font-black text-emerald-700">0.74 Preferred</p>
          <p className="text-[10px] text-slate-500 font-sans">EMR &lt; 1.00 yields 26% insurance discount</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">OSHA TRIR Benchmark</span>
          <p className="text-xl font-black text-slate-900">0.85 Incidents</p>
          <p className="text-[10px] text-slate-500 font-sans">National industry average: 2.80</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Umbrella Coverage</span>
          <p className="text-xl font-black text-indigo-700">$5M - $10M</p>
          <p className="text-[10px] text-slate-500 font-sans">Excess commercial liability verified</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Risk Defense</span>
          <p className="text-xl font-black text-emerald-700">100% Indemnified</p>
          <p className="text-[10px] text-slate-500 font-sans">Waiver of subrogation active</p>
        </div>
      </div>

      {/* SUBCONTRACTORS TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Pre-Qualified Trade Contractor Directory</h3>
            <p className="text-xs text-slate-500">Automated safety scoring and statutory workers' comp audit</p>
          </div>

          <button
            type="button"
            onClick={() => setShowCoiModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Pre-Qual Audit Certificate</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {subs.map(sub => (
            <div
              key={sub.id}
              onClick={() => setSelectedSubId(sub.id)}
              className={`p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition cursor-pointer ${
                sub.id === selectedSubId ? 'bg-amber-50/40 border-l-4 border-l-amber-600' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 font-sans text-sm">{sub.legalName}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {sub.trade}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-[11px] pt-1">
                  <span>EMR: <strong className={sub.emrScore <= 1.0 ? 'text-emerald-700' : 'text-red-700'}>{sub.emrScore}</strong></span>
                  <span>TRIR: <strong className={sub.trirRate <= 2.5 ? 'text-emerald-700' : 'text-red-700'}>{sub.trirRate}</strong></span>
                  <span>Umbrella: ${(sub.umbrellaLimit / 1000000).toFixed(0)}M</span>
                  <span>Workers' Comp: <strong className="text-emerald-700">Active</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  sub.preQualRating === 'TIER_1_PREFERRED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : sub.preQualRating === 'TIER_2_CONDITIONAL'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {sub.preQualRating.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COI CERTIFICATE MODAL */}
      {showCoiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Certificate of Insurance (COI) Compliance Package</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCoiModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <p className="font-bold text-slate-900">ACORD 25 CERTIFICATE AUDIT AUDITOR LOG</p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                <p><strong>INSURED ENTITY:</strong> {selectedSub.legalName}</p>
                <p><strong>TRADE CLASSIFICATION:</strong> {selectedSub.trade}</p>
                <p><strong>GENERAL LIABILITY:</strong> ${selectedSub.generalLiabilityLimit.toLocaleString()} Aggregate</p>
                <p><strong>COMMERCIAL UMBRELLA:</strong> ${selectedSub.umbrellaLimit.toLocaleString()}</p>
                <p><strong>EXPERIENCE MODIFIER (EMR):</strong> {selectedSub.emrScore} (Preferred Rating)</p>
                <p><strong>ADDITIONAL INSURED:</strong> Verified Endorsed on ISO Form CG 20 10 / CG 20 37</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print COI Audit Verification</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCoiModal(false)}
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
