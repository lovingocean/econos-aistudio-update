import React, { useState } from 'react';
import { 
  DollarSign, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Printer, 
  CheckCircle2, 
  Building2, 
  Calendar,
  AlertCircle,
  FileText,
  Percent,
  Sliders,
  Lock,
  Download
} from 'lucide-react';

interface FactoringInvoice {
  id: string;
  invoiceNumber: string;
  debtorCompany: string;
  jobTitle: string;
  originalAmount: number;
  issueDate: string;
  dueDate: string;
  daysOutstanding: number;
  status: 'PENDING_APPROVAL' | 'ADVANCED' | 'SETTLED';
}

export const CommercialFactoringExchangeWorkspace: React.FC = () => {
  const [invoices, setInvoices] = useState<FactoringInvoice[]>([
    {
      id: 'inv_1',
      invoiceNumber: 'INV-2026-0842',
      debtorCompany: 'Turner Construction LLC',
      jobTitle: 'Central Medical Center HVAC Retrofit',
      originalAmount: 84500,
      issueDate: '2026-08-15',
      dueDate: '2026-10-15',
      daysOutstanding: 51,
      status: 'PENDING_APPROVAL'
    },
    {
      id: 'inv_2',
      invoiceNumber: 'INV-2026-0879',
      debtorCompany: 'Austin Commercial Builders',
      jobTitle: 'Industrial Distribution Hub Electrical Phase 1',
      originalAmount: 112000,
      issueDate: '2026-08-28',
      dueDate: '2026-10-28',
      daysOutstanding: 38,
      status: 'PENDING_APPROVAL'
    },
    {
      id: 'inv_3',
      invoiceNumber: 'INV-2026-0914',
      debtorCompany: 'Balfour Beatty Infrastructure',
      jobTitle: 'Highway 183 Drainage & Conduit Installation',
      originalAmount: 46200,
      issueDate: '2026-09-05',
      dueDate: '2026-11-05',
      daysOutstanding: 30,
      status: 'PENDING_APPROVAL'
    }
  ]);

  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('inv_1');
  const [advanceRate, setAdvanceRate] = useState<number>(90); // 90%
  const [factoringFeeRate, setFactoringFeeRate] = useState<number>(2.25); // 2.25%
  const [activeTab, setActiveTab] = useState<'CALCULATOR' | 'NOTICE_OF_ASSIGNMENT' | 'PORTFOLIO'>('CALCULATOR');

  const selectedInvoice = invoices.find(i => i.id === selectedInvoiceId) || invoices[0];

  // Mathematical Calculations
  const grossInvoiceAmount = selectedInvoice.originalAmount;
  const instantCashAdvance = grossInvoiceAmount * (advanceRate / 100);
  const factoringFeeAmount = grossInvoiceAmount * (factoringFeeRate / 100);
  const escrowReserveAmount = grossInvoiceAmount - instantCashAdvance;
  const netReserveReturnedUponPayment = escrowReserveAmount - factoringFeeAmount;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Commercial Factoring &amp; Same-Day Working Capital Terminal
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              NON-RECOURSE CAPITAL
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Convert 60-day unpaid General Contractor invoices into same-day liquid working capital. Automate factoring fee underwriting and statutory Notices of Assignment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('CALCULATOR')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'CALCULATOR' 
                ? 'bg-[#132338] text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Factoring Simulator
          </button>
          <button
            onClick={() => setActiveTab('NOTICE_OF_ASSIGNMENT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'NOTICE_OF_ASSIGNMENT' 
                ? 'bg-[#132338] text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Notice of Assignment
          </button>
          <button
            onClick={() => setActiveTab('PORTFOLIO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'PORTFOLIO' 
                ? 'bg-[#132338] text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            AR Aging Portfolio
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Select Invoice & Sliders */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center justify-between">
              <span>1. Select Outstanding Receivable</span>
              <span className="text-[11px] text-slate-400 font-normal">3 Eligible Invoices</span>
            </h3>

            <div className="space-y-2">
              {invoices.map(inv => (
                <button
                  key={inv.id}
                  onClick={() => setSelectedInvoiceId(inv.id)}
                  className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    selectedInvoiceId === inv.id
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-400'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900">{inv.invoiceNumber}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                        {inv.daysOutstanding} Days Old
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-700 mt-0.5">{inv.debtorCompany}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs">{inv.jobTitle}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-slate-900">
                      ${inv.originalAmount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium">Eligible 90% Advance</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Sliders */}
            <div className="border-t border-slate-100 pt-4 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                2. Underwriting Parameters
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Advance Rate (Instant Payout)</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {advanceRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="95"
                  step="1"
                  value={advanceRate}
                  onChange={(e) => setAdvanceRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>80% (Conservative)</span>
                  <span>90% (Industry Standard)</span>
                  <span>95% (Prime A-Rated GC)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Factoring Discount Fee (30-day term)</span>
                  <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {factoringFeeRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="3.5"
                  step="0.25"
                  value={factoringFeeRate}
                  onChange={(e) => setFactoringFeeRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1.5% (Prime)</span>
                  <span>2.25% (Standard B2B)</span>
                  <span>3.5% (Subprime)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Waterfall & Legal Notice */}
        <div className="lg:col-span-6 space-y-4">
          {activeTab === 'CALCULATOR' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Working Capital Liquidity Waterfall</span>
              </h3>

              {/* Instant Cash Highlight Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-300 text-center space-y-1">
                <div className="text-xs text-emerald-800 font-medium uppercase tracking-wider font-mono">
                  Instant Wire Transfer Available Today
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-900">
                  ${instantCashAdvance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  {advanceRate}% of ${grossInvoiceAmount.toLocaleString()} gross invoice
                </div>
              </div>

              {/* Waterfall Breakdown */}
              <div className="space-y-2.5 text-xs font-mono border-t border-slate-100 pt-4">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Total Invoice Face Value:</span>
                  <span className="font-bold text-slate-900">${grossInvoiceAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Initial Cash Advance ({advanceRate}%):</span>
                  <span className="font-bold text-emerald-700">+${instantCashAdvance.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Reserve Held in Escrow ({100 - advanceRate}%):</span>
                  <span className="font-medium text-slate-700">${escrowReserveAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Factoring Underwriting Fee ({factoringFeeRate}%):</span>
                  <span className="font-medium text-rose-700">-${factoringFeeAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 bg-slate-50 px-3 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-800">Net Returned When GC Pays:</span>
                  <span className="font-black text-slate-900">${netReserveReturnedUponPayment.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Payroll Protection Unlocked:</strong> Same-day funding bypasses the 60-day lag from {selectedInvoice.debtorCompany}, guaranteeing uninterrupted field crew payroll and material supply orders.
                </div>
              </div>

              <button
                onClick={() => setActiveTab('NOTICE_OF_ASSIGNMENT')}
                className="w-full py-3 rounded-xl bg-[#132338] hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Generate Statutory Notice of Assignment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === 'NOTICE_OF_ASSIGNMENT' && (
            <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-lg space-y-5 font-serif text-xs">
              <div className="flex items-center justify-between border-b pb-3 print:hidden">
                <span className="font-mono text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                  UCC ARTICLE 9 STATUTORY NOTICE
                </span>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#132338] text-white hover:bg-slate-800 transition text-xs font-semibold cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Notice</span>
                </button>
              </div>

              <div className="text-center space-y-1">
                <h2 className="text-base font-black uppercase text-slate-900">
                  FORMAL NOTICE OF ASSIGNMENT &amp; PAYMENT DIRECTION
                </h2>
                <div className="text-[11px] text-slate-500 italic">
                  Pursuant to Uniform Commercial Code (UCC) § 9-406
                </div>
              </div>

              <div className="border border-slate-300 p-4 rounded-lg bg-slate-50 space-y-2 text-slate-800">
                <div><strong>TO (Account Debtor):</strong> {selectedInvoice.debtorCompany}</div>
                <div><strong>FROM (Assignor / Subcontractor):</strong> Vance Mechanical &amp; Commercial HVAC LLC</div>
                <div><strong>REGARDING INVOICE:</strong> {selectedInvoice.invoiceNumber} | Face Value: ${grossInvoiceAmount.toLocaleString()} USD</div>
                <div><strong>PROJECT LOCATION:</strong> {selectedInvoice.jobTitle}</div>
              </div>

              <p className="leading-relaxed text-slate-800">
                PLEASE TAKE NOTICE that pursuant to UCC § 9-406, Vance Mechanical &amp; Commercial HVAC LLC has assigned its accounts receivable and rights to payment under the above-referenced invoice to the ECONOS Commercial Working Capital Facility.
              </p>

              <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-950 font-bold">
                MANDATORY PAYMENT INSTRUCTION: Effective immediately, payment of the invoice amount (${grossInvoiceAmount.toLocaleString()}) MUST be remitted directly to the designated lockbox depository account below. Payment to any other party will NOT discharge your obligation.
              </div>

              <div className="border border-slate-300 rounded-lg p-3 bg-white space-y-1 font-mono text-[11px]">
                <div><strong>Depository Bank:</strong> Silicon Valley Commercial Bank / First Republic Treasury</div>
                <div><strong>Account Title:</strong> ECONOS FBO Vance Mechanical Working Capital Lockbox</div>
                <div><strong>Routing Number (ABA):</strong> 121000358</div>
                <div><strong>Account Number:</strong> 8840291844</div>
              </div>

              <div className="border-t pt-4 flex justify-between text-[11px] text-slate-500 font-sans">
                <div>Authorized Executive: Michael Vance, Managing Partner</div>
                <div>Date of Issuance: {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          )}

          {activeTab === 'PORTFOLIO' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                Accounts Receivable Aging &amp; Liquidity Status
              </h3>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Current (0-30 Days)</div>
                  <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">$46,200</div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="text-[10px] text-amber-700 uppercase font-mono">31-60 Days</div>
                  <div className="text-lg font-bold text-amber-900 font-mono mt-0.5">$112,000</div>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <div className="text-[10px] text-rose-700 uppercase font-mono">61-90+ Days</div>
                  <div className="text-lg font-bold text-rose-900 font-mono mt-0.5">$84,500</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Total Factoring Capacity: $242,700</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  By factoring all 3 outstanding commercial receivables, you can immediately inject <strong>$218,430</strong> in liquid cash into company accounts today, completely eliminating supplier credit bottlenecks.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
