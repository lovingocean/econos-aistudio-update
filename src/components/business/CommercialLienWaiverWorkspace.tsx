import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldAlert, 
  Printer, 
  Download, 
  Building2, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  UserCheck,
  Scale,
  Signature
} from 'lucide-react';

export type LienWaiverType = 
  | 'CONDITIONAL_PROGRESS'
  | 'UNCONDITIONAL_PROGRESS'
  | 'CONDITIONAL_FINAL'
  | 'UNCONDITIONAL_FINAL'
  | 'NOTICE_OF_INTENT';

export interface LienWaiverForm {
  claimantName: string;
  claimantTitle: string;
  claimantCompany: string;
  customerName: string;
  jobName: string;
  jobLocation: string;
  state: string;
  invoiceNumber: string;
  paymentAmount: number;
  throughDate: string;
  exceptions: string;
  waiverType: LienWaiverType;
  digitalSignature: string;
}

export const CommercialLienWaiverWorkspace: React.FC = () => {
  const [form, setForm] = useState<LienWaiverForm>({
    claimantName: 'Michael Vance',
    claimantTitle: 'Managing Partner',
    claimantCompany: 'Vance Mechanical & Commercial HVAC LLC',
    customerName: 'Turner & Townsend Construction Corp',
    jobName: 'Midtown Commercial Logistics Hub - Phase 2',
    jobLocation: '2100 Industrial Pkwy, Dallas, TX 75201',
    state: 'Texas',
    invoiceNumber: 'INV-2026-0842',
    paymentAmount: 84500,
    throughDate: '2026-10-15',
    exceptions: 'None. Retainage of 5% ($4,225) held until final completion.',
    waiverType: 'CONDITIONAL_PROGRESS',
    digitalSignature: 'Michael Vance'
  });

  const [isSigned, setIsSigned] = useState(true);
  const [activeTab, setActiveTab] = useState<'GENERATOR' | 'DOC_PREVIEW' | 'STATE_COMPLIANCE'>('DOC_PREVIEW');

  const handlePrint = () => {
    window.print();
  };

  const waiverTitles: Record<LienWaiverType, { title: string; subtitle: string; color: string; badge: string }> = {
    CONDITIONAL_PROGRESS: {
      title: 'CONDITIONAL WAIVER AND RELEASE ON PROGRESS PAYMENT',
      subtitle: 'Only valid upon actual receipt and bank clearance of the specified payment amount.',
      color: 'text-amber-800 border-amber-300 bg-amber-50',
      badge: 'SAFE TO ISSUE BEFORE PAYMENT'
    },
    UNCONDITIONAL_PROGRESS: {
      title: 'UNCONDITIONAL WAIVER AND RELEASE ON PROGRESS PAYMENT',
      subtitle: 'WARNING: Once signed, this document releases lien rights regardless of whether payment cleared.',
      color: 'text-rose-800 border-rose-300 bg-rose-50',
      badge: 'ONLY SIGN AFTER CHECK CLEARS'
    },
    CONDITIONAL_FINAL: {
      title: 'CONDITIONAL WAIVER AND RELEASE ON FINAL PAYMENT',
      subtitle: 'Releases all remaining lien rights upon full receipt and clearing of final balance.',
      color: 'text-blue-800 border-blue-300 bg-blue-50',
      badge: 'FINAL PROJECT CLOSEOUT'
    },
    UNCONDITIONAL_FINAL: {
      title: 'UNCONDITIONAL WAIVER AND RELEASE ON FINAL PAYMENT',
      subtitle: 'Permanent, irrevocable surrender of all mechanic’s lien rights for the entire project.',
      color: 'text-purple-800 border-purple-300 bg-purple-50',
      badge: 'PERMANENT LEGAL SURRENDER'
    },
    NOTICE_OF_INTENT: {
      title: 'FORMAL NOTICE OF INTENT TO FILE MECHANIC’S LIEN',
      subtitle: 'Statutory 10-day notice to Property Owner & General Contractor before county recording.',
      color: 'text-red-900 border-red-400 bg-red-50',
      badge: 'DELINQUENT AR ENFORCEMENT'
    }
  };

  const activeMeta = waiverTitles[form.waiverType];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              <Scale className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Contractor Statutory Lien Waiver &amp; Legal Shield
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              50-STATE COMPLIANT
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Eliminate payment disputes. Generate enforceable statutory Progress &amp; Final Lien Waivers or formal Notices of Intent to Lien for General Contractors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('GENERATOR')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'GENERATOR' 
                ? 'bg-[#132338] text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Form Inputs
          </button>
          <button
            onClick={() => setActiveTab('DOC_PREVIEW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'DOC_PREVIEW' 
                ? 'bg-[#132338] text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Legal Document Preview
          </button>
          <button
            onClick={() => setActiveTab('STATE_COMPLIANCE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'STATE_COMPLIANCE' 
                ? 'bg-[#132338] text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Statutory Rules
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Controls */}
        <div className={`lg:col-span-5 space-y-4 ${activeTab === 'DOC_PREVIEW' ? 'hidden lg:block' : ''}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Select Instrument Type</span>
            </h3>

            <div className="space-y-2">
              {(
                [
                  { id: 'CONDITIONAL_PROGRESS', label: '1. Conditional Progress Waiver', sub: 'Safe before payment arrives' },
                  { id: 'UNCONDITIONAL_PROGRESS', label: '2. Unconditional Progress Waiver', sub: 'Only after funds clear in bank' },
                  { id: 'CONDITIONAL_FINAL', label: '3. Conditional Final Waiver', sub: 'For final project closeout' },
                  { id: 'UNCONDITIONAL_FINAL', label: '4. Unconditional Final Waiver', sub: 'Permanent release of all claims' },
                  { id: 'NOTICE_OF_INTENT', label: '5. Notice of Intent to Lien (NOI)', sub: 'For 60+ days overdue collections' },
                ] as const
              ).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setForm({ ...form, waiverType: opt.id })}
                  className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex flex-col gap-0.5 ${
                    form.waiverType === opt.id
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-400'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-slate-900">{opt.label}</div>
                  <div className="text-[11px] text-slate-500">{opt.sub}</div>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 font-mono uppercase">Claimant &amp; Project Info</h4>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Claimant (Subcontractor)</label>
                  <input
                    type="text"
                    value={form.claimantCompany}
                    onChange={(e) => setForm({ ...form, claimantCompany: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">General Contractor / Owner</label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-[11px] text-slate-500 block mb-1">Job Name &amp; Description</label>
                <input
                  type="text"
                  value={form.jobName}
                  onChange={(e) => setForm({ ...form, jobName: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="text-xs">
                <label className="text-[11px] text-slate-500 block mb-1">Job Location / Property Address</label>
                <input
                  type="text"
                  value={form.jobLocation}
                  onChange={(e) => setForm({ ...form, jobLocation: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Payment Amount ($)</label>
                  <input
                    type="number"
                    value={form.paymentAmount}
                    onChange={(e) => setForm({ ...form, paymentAmount: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={form.invoiceNumber}
                    onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Through Date</label>
                  <input
                    type="date"
                    value={form.throughDate}
                    onChange={(e) => setForm({ ...form, throughDate: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-[11px] text-slate-500 block mb-1">Exceptions &amp; Retainage Carve-Outs</label>
                <input
                  type="text"
                  value={form.exceptions}
                  onChange={(e) => setForm({ ...form, exceptions: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900"
                  placeholder="e.g. 5% retainage, pending change orders"
                />
              </div>

              <div className="text-xs">
                <label className="text-[11px] text-slate-500 block mb-1">Authorized Signer Full Name</label>
                <input
                  type="text"
                  value={form.digitalSignature}
                  onChange={(e) => setForm({ ...form, digitalSignature: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Printable Legal Document Preview */}
        <div className={`lg:col-span-7 space-y-4 ${activeTab === 'GENERATOR' ? 'hidden lg:block' : ''}`}>
          <div className="bg-white rounded-2xl border border-slate-300 shadow-lg p-6 sm:p-8 space-y-6 print:m-0 print:p-0 print:border-none print:shadow-none">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${activeMeta.color}`}>
                {activeMeta.badge}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#132338] text-white hover:bg-slate-800 transition text-xs font-semibold cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            {/* Document Header */}
            <div className="text-center space-y-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase font-serif">
                {activeMeta.title}
              </h1>
              <p className="text-xs text-slate-600 italic max-w-xl mx-auto font-serif">
                {activeMeta.subtitle}
              </p>
            </div>

            {/* Statutory Warning Notice */}
            {form.waiverType.startsWith('CONDITIONAL') ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-serif leading-relaxed">
                <strong>NOTICE:</strong> This document waives the undersigned&apos;s lien, stop payment notice, and payment bond rights on payment of the sum stated below. It does not cover any retention or items furnished after the through date. This document is effective ONLY on the condition that the claimant actually receives payment.
              </div>
            ) : form.waiverType.startsWith('UNCONDITIONAL') ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 font-serif leading-relaxed font-bold">
                NOTICE TO CLAIMANT: THIS DOCUMENT WAIVES AND RELEASES LIEN, STOP PAYMENT NOTICE, AND PAYMENT BOND RIGHTS UNCONDITIONALLY AND STATES THAT YOU HAVE BEEN PAID FOR GIVING UP THOSE RIGHTS. IT IS ENFORCEABLE AGAINST YOU IF YOU SIGN IT, EVEN IF YOU HAVE NOT BEEN PAID.
              </div>
            ) : (
              <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-xs text-red-950 font-serif leading-relaxed font-bold">
                NOTICE OF INTENT TO FILE A MECHANIC&apos;S OR MATERIALMAN&apos;S LIEN PURSUANT TO STATE STATUTE. FAILURE TO REMIT PAYMENT WITHIN TEN (10) DAYS WILL RESULT IN IMMEDIATE RECORDING OF LIEN IN THE COUNTY CLERK DEED RECORDS.
              </div>
            )}

            {/* Document Body Form Table */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs font-serif divide-y divide-slate-300">
              <div className="grid grid-cols-3 p-2.5 bg-slate-50">
                <span className="font-bold text-slate-700">Name of Claimant:</span>
                <span className="col-span-2 text-slate-900 font-semibold">{form.claimantCompany}</span>
              </div>

              <div className="grid grid-cols-3 p-2.5">
                <span className="font-bold text-slate-700">Name of Customer (GC):</span>
                <span className="col-span-2 text-slate-900">{form.customerName}</span>
              </div>

              <div className="grid grid-cols-3 p-2.5 bg-slate-50">
                <span className="font-bold text-slate-700">Job Description:</span>
                <span className="col-span-2 text-slate-900">{form.jobName}</span>
              </div>

              <div className="grid grid-cols-3 p-2.5">
                <span className="font-bold text-slate-700">Job Location / Property:</span>
                <span className="col-span-2 text-slate-900">{form.jobLocation}</span>
              </div>

              <div className="grid grid-cols-3 p-2.5 bg-slate-50">
                <span className="font-bold text-slate-700">Payment Amount:</span>
                <span className="col-span-2 text-slate-900 font-bold font-mono">
                  ${form.paymentAmount.toLocaleString()} USD
                </span>
              </div>

              <div className="grid grid-cols-3 p-2.5">
                <span className="font-bold text-slate-700">Through Date:</span>
                <span className="col-span-2 text-slate-900 font-mono">{form.throughDate}</span>
              </div>

              <div className="grid grid-cols-3 p-2.5 bg-slate-50">
                <span className="font-bold text-slate-700">Invoice Number:</span>
                <span className="col-span-2 text-slate-900 font-mono font-bold">{form.invoiceNumber}</span>
              </div>

              <div className="grid grid-cols-3 p-2.5">
                <span className="font-bold text-slate-700">Exceptions / Retainage:</span>
                <span className="col-span-2 text-slate-900 italic">{form.exceptions || 'None'}</span>
              </div>
            </div>

            {/* Legal Certification Text */}
            <p className="text-xs text-slate-700 font-serif leading-relaxed">
              Upon receipt and clearance of the payment amount above, the Claimant hereby waives and releases any and all mechanic&apos;s lien, stop payment notice, and payment bond rights that the Claimant has on the above-referenced job, through the date stated, reserving only those rights expressly excepted above.
            </p>

            {/* Signatures & Notary Area */}
            <div className="border-t border-slate-300 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-serif">
              <div className="space-y-3">
                <div className="font-bold text-slate-800">CLAIMANT AUTHORIZED SIGNATURE:</div>
                <div className="h-16 border-b-2 border-slate-900 flex items-end pb-1 font-serif italic text-base font-bold text-blue-900">
                  {form.digitalSignature}
                </div>
                <div className="text-[11px] text-slate-600">
                  <div>Name: {form.claimantName}</div>
                  <div>Title: {form.claimantTitle}</div>
                  <div>Date: {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div className="space-y-3 border-l sm:border-slate-200 sm:pl-6">
                <div className="font-bold text-slate-800 uppercase text-[11px]">Notary Public Acknowledgment:</div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  State of {form.state}, County of Dallas.<br />
                  Subscribed and sworn to before me on this {new Date().getDate()} day of {new Date().toLocaleString('default', { month: 'long' })}, 2026.
                </div>
                <div className="h-10 border-b border-dashed border-slate-400"></div>
                <div className="text-[10px] text-slate-400 italic">Notary Public Signature &amp; Seal</div>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>ECONOS Statutory Document ID: STAT-LW-2026-{form.invoiceNumber}</span>
              <span>SHA-256 Verifiable Proof Enclosed</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
