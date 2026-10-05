import React, { useState, useMemo } from 'react';
import {
  FileText,
  DollarSign,
  Building,
  CheckCircle2,
  Printer,
  Sparkles,
  ArrowRight,
  Calculator,
  Download,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Scale
} from 'lucide-react';

interface SovItem {
  id: string;
  itemNo: string;
  description: string;
  scheduledValue: number;
  previousWork: number;
  thisPeriodWork: number;
  storedMaterials: number;
  retainageRate: number; // typically 10%
}

const INITIAL_SOV: SovItem[] = [
  {
    id: 'sov-1',
    itemNo: '01-100',
    description: 'Mobilization & Project Submittals',
    scheduledValue: 45000,
    previousWork: 45000,
    thisPeriodWork: 0,
    storedMaterials: 0,
    retainageRate: 10
  },
  {
    id: 'sov-2',
    itemNo: '15-400',
    description: 'Chilled Water Piping & Riser Mains',
    scheduledValue: 185000,
    previousWork: 95000,
    thisPeriodWork: 45000,
    storedMaterials: 15000,
    retainageRate: 10
  },
  {
    id: 'sov-3',
    itemNo: '15-500',
    description: 'Rooftop Trane Air Handling Units (AHU-1 to AHU-4)',
    scheduledValue: 320000,
    previousWork: 120000,
    thisPeriodWork: 85000,
    storedMaterials: 40000,
    retainageRate: 10
  },
  {
    id: 'sov-4',
    itemNo: '15-800',
    description: 'Heavy Sheet Metal Ductwork & VAV Terminal Boxes',
    scheduledValue: 140000,
    previousWork: 35000,
    thisPeriodWork: 50000,
    storedMaterials: 12000,
    retainageRate: 10
  },
  {
    id: 'sov-5',
    itemNo: '15-900',
    description: 'BMS DDC Controls & Building Automation Integration',
    scheduledValue: 95000,
    previousWork: 10000,
    thisPeriodWork: 30000,
    storedMaterials: 5000,
    retainageRate: 10
  },
  {
    id: 'sov-6',
    itemNo: '15-990',
    description: 'Testing, Adjusting & Balancing (TAB) & Commissioning',
    scheduledValue: 65000,
    previousWork: 0,
    thisPeriodWork: 15000,
    storedMaterials: 0,
    retainageRate: 10
  }
];

export const CommercialAiaBillingWorkspace: React.FC = () => {
  const [sovItems, setSovItems] = useState<SovItem[]>(INITIAL_SOV);
  const [applicationNumber, setApplicationNumber] = useState<number>(4);
  const [periodToDate, setPeriodToDate] = useState<string>('2026-10-15');
  const [architectName, setArchitectName] = useState<string>('Perkins&Will Architecture & Engineering P.C.');
  const [contractorName, setContractorName] = useState<string>('Apex Mechanical Solutions LLC');
  const [ownerName, setOwnerName] = useState<string>('Dallas County Health & Hospital District');
  const [projectName, setProjectName] = useState<string>('Central Medical Center – Clinical Tower Phase II');
  const [previousCertificatesPaid, setPreviousCertificatesPaid] = useState<number>(274500);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [factoringNotification, setFactoringNotification] = useState<string | null>(null);

  // AIA G702 / G703 Mathematical Calculations
  const aiaCalculations = useMemo(() => {
    let originalContractSum = 0;
    let totalCompletedPrevious = 0;
    let totalCompletedThisPeriod = 0;
    let totalStoredMaterials = 0;
    let totalRetainage = 0;

    sovItems.forEach(item => {
      originalContractSum += item.scheduledValue;
      totalCompletedPrevious += item.previousWork;
      totalCompletedThisPeriod += item.thisPeriodWork;
      totalStoredMaterials += item.storedMaterials;

      const totalItemCompleted = item.previousWork + item.thisPeriodWork + item.storedMaterials;
      totalRetainage += totalItemCompleted * (item.retainageRate / 100);
    });

    const netChangeOrders = 0; // Assume base contract
    const contractSumToDate = originalContractSum + netChangeOrders;
    const totalCompletedAndStored = totalCompletedPrevious + totalCompletedThisPeriod + totalStoredMaterials;
    const percentComplete = (totalCompletedAndStored / contractSumToDate) * 100;
    const totalEarnedLessRetainage = totalCompletedAndStored - totalRetainage;
    const currentPaymentDue = totalEarnedLessRetainage - previousCertificatesPaid;
    const balanceToFinish = contractSumToDate - totalEarnedLessRetainage;

    return {
      originalContractSum,
      contractSumToDate,
      totalCompletedPrevious,
      totalCompletedThisPeriod,
      totalStoredMaterials,
      totalCompletedAndStored,
      percentComplete: Number(percentComplete.toFixed(1)),
      totalRetainage: Math.round(totalRetainage),
      totalEarnedLessRetainage: Math.round(totalEarnedLessRetainage),
      currentPaymentDue: Math.round(currentPaymentDue),
      balanceToFinish: Math.round(balanceToFinish)
    };
  }, [sovItems, previousCertificatesPaid]);

  const handleAdvanceOnG702 = () => {
    const advanceAmount = Math.round(aiaCalculations.currentPaymentDue * 0.90);
    setFactoringNotification(
      `Instant Wire Dispatched! $${advanceAmount.toLocaleString()} (90% of AIA G702 App #${applicationNumber} for $${aiaCalculations.currentPaymentDue.toLocaleString()}) funded same-day.`
    );
    setTimeout(() => setFactoringNotification(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white shadow-xl border border-blue-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Standard US Commercial Construction Billing</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>AIA Document G702 &amp; G703 Autonomous Progress Billing</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                10% Retainage Waterfall
              </span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Automates America's mandatory commercial payment certification application (AIA G702) and Continuation Sheet (AIA G703). Calculates exact Schedule of Values (SOV) work completed, stored materials, statutory 10% retainage withholdings, and links directly to instant factoring liquidity.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-3 border border-slate-700/60 text-right">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Current Payment Due (Line 8)</p>
              <p className="text-xl font-mono font-black text-emerald-400">
                ${aiaCalculations.currentPaymentDue.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400">Application #{applicationNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {factoringNotification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{factoringNotification}</span>
        </div>
      )}

      {/* AIA G702 SUMMARY FORM (THE 9 STATUTORY LINES) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>AIA Document G702™ – Application and Certificate for Payment</span>
            </h3>
            <p className="text-xs text-slate-500">Project: {projectName} | Contractor: {contractorName}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAdvanceOnG702}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs transition"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Instant 90% Wire Advance (${Math.round(aiaCalculations.currentPaymentDue * 0.90).toLocaleString()})</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPrintModal(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official G702/G703</span>
            </button>
          </div>
        </div>

        {/* 9 FORMAL G702 LINES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold block">1. ORIGINAL CONTRACT SUM</span>
            <p className="text-sm font-black text-slate-900">${aiaCalculations.originalContractSum.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold block">2. NET CHANGE BY CHANGE ORDERS</span>
            <p className="text-sm font-black text-slate-900">$0.00</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold block">3. CONTRACT SUM TO DATE</span>
            <p className="text-sm font-black text-blue-800">${aiaCalculations.contractSumToDate.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold block">4. TOTAL COMPLETED &amp; STORED TO DATE</span>
            <p className="text-sm font-black text-slate-900">
              ${aiaCalculations.totalCompletedAndStored.toLocaleString()} ({aiaCalculations.percentComplete}%)
            </p>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
            <span className="text-[10px] text-amber-800 font-semibold block">5. TOTAL RETAINAGE (10% WITHHELD)</span>
            <p className="text-sm font-black text-amber-900">-${aiaCalculations.totalRetainage.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold block">6. TOTAL EARNED LESS RETAINAGE</span>
            <p className="text-sm font-black text-slate-900">${aiaCalculations.totalEarnedLessRetainage.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold block">7. LESS PREVIOUS CERTIFICATES PAID</span>
            <p className="text-sm font-black text-slate-900">-${previousCertificatesPaid.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 space-y-1">
            <span className="text-[10px] text-emerald-800 font-semibold block">8. CURRENT PAYMENT DUE THIS CERTIFICATE</span>
            <p className="text-base font-black text-emerald-700">${aiaCalculations.currentPaymentDue.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-semibold block">9. BALANCE TO FINISH (INC. RETAINAGE)</span>
            <p className="text-sm font-black text-slate-900">${aiaCalculations.balanceToFinish.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* AIA G703 CONTINUATION SHEET (SCHEDULE OF VALUES TABLE) */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              <span>AIA Document G703™ – Continuation Sheet (Schedule of Values)</span>
            </h3>
            <p className="text-xs text-slate-500">Itemized line-by-line mechanical breakdown with stored materials tracking</p>
          </div>

          <span className="text-xs font-mono font-bold text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200">
            {sovItems.length} Cost Code Items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 text-[10px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Item #</th>
                <th className="py-3 px-4">Description of Work</th>
                <th className="py-3 px-4 text-right">Scheduled Value</th>
                <th className="py-3 px-4 text-right">Previous Work</th>
                <th className="py-3 px-4 text-right">This Period</th>
                <th className="py-3 px-4 text-right">Stored Materials</th>
                <th className="py-3 px-4 text-right">Total Complete</th>
                <th className="py-3 px-4 text-right">%</th>
                <th className="py-3 px-4 text-right">Balance to Finish</th>
                <th className="py-3 px-4 text-right">10% Retainage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sovItems.map((item) => {
                const totalComplete = item.previousWork + item.thisPeriodWork + item.storedMaterials;
                const pct = ((totalComplete / item.scheduledValue) * 100).toFixed(1);
                const balance = item.scheduledValue - totalComplete;
                const retainage = Math.round(totalComplete * (item.retainageRate / 100));

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900">{item.itemNo}</td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-800">{item.description}</td>
                    <td className="py-3 px-4 text-right font-semibold">${item.scheduledValue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-slate-500">${item.previousWork.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-bold text-indigo-700">${item.thisPeriodWork.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-slate-600">${item.storedMaterials.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-black text-slate-900">${totalComplete.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-bold text-blue-700">{pct}%</td>
                    <td className="py-3 px-4 text-right text-slate-500">${balance.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-semibold text-amber-800">${retainage.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ARCHITECT CERTIFICATION BLOCK */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>ARCHITECT’S CERTIFICATE FOR PAYMENT</span>
        </div>
        <p className="text-slate-600 leading-relaxed italic font-sans text-xs">
          "In accordance with the Contract Documents, based on on-site observations and the data comprising this application, the Architect certifies to the Owner that to the best of the Architect's knowledge, information and belief the Work has progressed as indicated, the quality of the Work is in accordance with the Contract Documents, and the Contractor is entitled to payment of the AMOUNT CERTIFIED."
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-[11px] text-slate-500">
          <div>
            <span>Amount Certified: </span>
            <span className="font-bold text-emerald-700">${aiaCalculations.currentPaymentDue.toLocaleString()}</span>
          </div>
          <div>
            <span>Architect: </span>
            <span className="font-bold text-slate-800">{architectName}</span>
          </div>
        </div>
      </div>

      {/* PRINT PREVIEW MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">AIA Document G702 / G703 Official Filing Package</h3>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-4">
              <div className="text-center pb-3 border-b border-slate-200">
                <h2 className="text-sm font-black text-slate-900">APPLICATION AND CERTIFICATE FOR PAYMENT</h2>
                <p className="text-[10px] text-slate-500">AIA DOCUMENT G702 – 1992 EDITION</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px]">
                <div>
                  <p><strong>TO OWNER:</strong> {ownerName}</p>
                  <p><strong>FROM CONTRACTOR:</strong> {contractorName}</p>
                </div>
                <div>
                  <p><strong>PROJECT:</strong> {projectName}</p>
                  <p><strong>APPLICATION NO:</strong> {applicationNumber}</p>
                  <p><strong>PERIOD TO:</strong> {periodToDate}</p>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                <p className="text-slate-700">Contract Sum to Date: <strong>${aiaCalculations.contractSumToDate.toLocaleString()}</strong></p>
                <p className="text-slate-700">Total Completed &amp; Stored: <strong>${aiaCalculations.totalCompletedAndStored.toLocaleString()}</strong></p>
                <p className="text-amber-800">Retainage Withheld (10%): <strong>-${aiaCalculations.totalRetainage.toLocaleString()}</strong></p>
                <p className="text-emerald-700 font-black text-sm">CURRENT PAYMENT DUE: ${aiaCalculations.currentPaymentDue.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
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
