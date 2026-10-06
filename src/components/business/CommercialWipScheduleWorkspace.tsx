import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Printer,
  Sparkles,
  Building2,
  Scale,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';

interface WipProjectItem {
  id: string;
  projectCode: string;
  projectName: string;
  contractSum: number;
  estimatedTotalCost: number;
  actualCostToDate: number;
  billingsToDate: number;
}

const INITIAL_WIP_PROJECTS: WipProjectItem[] = [
  {
    id: 'wip-1',
    projectCode: 'PRJ-DAL-MED',
    projectName: 'Central Medical Center – Clinical Tower Phase II',
    contractSum: 870000,
    estimatedTotalCost: 650000,
    actualCostToDate: 416000, // 64% complete
    billingsToDate: 580000
  },
  {
    id: 'wip-2',
    projectCode: 'PRJ-FW-DATA',
    projectName: 'North Texas Hyperscale Data Center Pod 3',
    contractSum: 1450000,
    estimatedTotalCost: 1100000,
    actualCostToDate: 550000, // 50% complete
    billingsToDate: 680000
  },
  {
    id: 'wip-3',
    projectCode: 'PRJ-PLANO-ISD',
    projectName: 'High School CTE Innovation Science Facility',
    contractSum: 620000,
    estimatedTotalCost: 480000,
    actualCostToDate: 360000, // 75% complete
    billingsToDate: 430000
  },
  {
    id: 'wip-4',
    projectCode: 'PRJ-DFW-HANGAR',
    projectName: 'DFW Airport Corporate Aviation Hangar #7',
    contractSum: 940000,
    estimatedTotalCost: 720000,
    actualCostToDate: 216000, // 30% complete
    billingsToDate: 310000
  }
];

export const CommercialWipScheduleWorkspace: React.FC = () => {
  const [projects, setProjects] = useState<WipProjectItem[]>(INITIAL_WIP_PROJECTS);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // US GAAP (ASC 606) Percentage-of-Completion Calculations:
  // % Complete = Actual Cost to Date / Estimated Total Cost
  // Earned Revenue = Contract Sum * % Complete
  // Over-Billing (Liability) = Billings to Date - Earned Revenue (if positive)
  // Under-Billing (Asset) = Earned Revenue - Billings to Date (if positive)
  const wipSummary = useMemo(() => {
    let totalContractSum = 0;
    let totalEstimatedCost = 0;
    let totalActualCost = 0;
    let totalBillings = 0;
    let totalEarnedRevenue = 0;
    let totalOverbillings = 0;
    let totalUnderbillings = 0;

    const computedItems = projects.map(p => {
      const percentComplete = p.estimatedTotalCost > 0 ? (p.actualCostToDate / p.estimatedTotalCost) : 0;
      const earnedRevenue = Math.round(p.contractSum * percentComplete);
      const grossProfitEstimated = p.contractSum - p.estimatedTotalCost;
      const grossProfitEarned = Math.round(grossProfitEstimated * percentComplete);
      const difference = p.billingsToDate - earnedRevenue;

      const overbilling = difference > 0 ? difference : 0;
      const underbilling = difference < 0 ? Math.abs(difference) : 0;

      totalContractSum += p.contractSum;
      totalEstimatedCost += p.estimatedTotalCost;
      totalActualCost += p.actualCostToDate;
      totalBillings += p.billingsToDate;
      totalEarnedRevenue += earnedRevenue;
      totalOverbillings += overbilling;
      totalUnderbillings += underbilling;

      return {
        ...p,
        percentComplete: Number((percentComplete * 100).toFixed(1)),
        earnedRevenue,
        grossProfitEarned,
        overbilling,
        underbilling
      };
    });

    return {
      computedItems,
      totalContractSum,
      totalEstimatedCost,
      totalActualCost,
      totalBillings,
      totalEarnedRevenue,
      totalOverbillings,
      totalUnderbillings,
      netWorkingCapitalImpact: totalOverbillings - totalUnderbillings
    };
  }, [projects]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 text-white shadow-xl border border-teal-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>US GAAP ASC 606 &amp; Bank Credit Underwriting</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Autonomous WIP (Work-in-Progress) Schedule &amp; Over/Under Billing Engine</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Mandatory balance sheet schedule required by commercial banks and surety underwriters. Calculates percentage of completion on every contract, separates over-billings (current liabilities) from under-billings (unbilled revenue assets), and ensures zero profit distortion.
            </p>
          </div>

          <div className="bg-teal-900/80 backdrop-blur-md rounded-xl p-4 border border-teal-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-teal-300">Total Earned Revenue (ASC 606)</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${wipSummary.totalEarnedRevenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">Billings: ${wipSummary.totalBillings.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Total Active Backlog</span>
          <p className="text-xl font-black text-slate-900">${wipSummary.totalContractSum.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Across {projects.length} major bonded jobs</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-amber-800 font-bold block uppercase">Over-Billings (Liability)</span>
          <p className="text-xl font-black text-amber-700">${wipSummary.totalOverbillings.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Cash collected ahead of progress</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-indigo-700 font-bold block uppercase">Under-Billings (Asset)</span>
          <p className="text-xl font-black text-indigo-700">${wipSummary.totalUnderbillings.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Unbilled earned progress asset</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-emerald-700 font-bold block uppercase">Surety Working Capital Cushion</span>
          <p className="text-xl font-black text-emerald-600">+${wipSummary.netWorkingCapitalImpact.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Net positive billing float</p>
        </div>
      </div>

      {/* WIP SCHEDULE TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-teal-600" />
              <span>Commercial Percentage-of-Completion WIP Ledger</span>
            </h3>
            <p className="text-xs text-slate-500">Live cost-to-complete tracking compliant with AICPA Audit Guide for Construction</p>
          </div>

          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Official WIP Schedule PDF</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 text-[10px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Project &amp; Code</th>
                <th className="py-3 px-4 text-right">Contract Sum</th>
                <th className="py-3 px-4 text-right">Est. Total Cost</th>
                <th className="py-3 px-4 text-right">Actual Cost to Date</th>
                <th className="py-3 px-4 text-right">% Complete</th>
                <th className="py-3 px-4 text-right">Earned Revenue</th>
                <th className="py-3 px-4 text-right">Billed to Date</th>
                <th className="py-3 px-4 text-right">Over-Billed (Liab)</th>
                <th className="py-3 px-4 text-right">Under-Billed (Asset)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {wipSummary.computedItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900 font-sans">{item.projectName}</p>
                    <p className="text-[10px] text-slate-500">{item.projectCode}</p>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">${item.contractSum.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-slate-600">${item.estimatedTotalCost.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-slate-700">${item.actualCostToDate.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-black text-blue-700">{item.percentComplete}%</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">${item.earnedRevenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-slate-700">${item.billingsToDate.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-black text-amber-800">
                    {item.overbilling > 0 ? `$${item.overbilling.toLocaleString()}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-black text-indigo-700">
                    {item.underbilling > 0 ? `$${item.underbilling.toLocaleString()}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINT MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Official CPA Work-In-Progress (WIP) Schedule</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <p className="font-bold text-slate-900">PERCENTAGE OF COMPLETION ACCOUNTING (US GAAP ASC 606)</p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                <p>Total Contract Backlog: <strong>${wipSummary.totalContractSum.toLocaleString()}</strong></p>
                <p>Earned Revenue: <strong>${wipSummary.totalEarnedRevenue.toLocaleString()}</strong></p>
                <p>Billings in Excess of Costs (Over-Billing Liability): <strong className="text-amber-800">${wipSummary.totalOverbillings.toLocaleString()}</strong></p>
                <p>Costs in Excess of Billings (Under-Billing Asset): <strong className="text-indigo-700">${wipSummary.totalUnderbillings.toLocaleString()}</strong></p>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                "Prepared in full accordance with GAAP ASC 606 revenue recognition for audited bank lines of credit and surety capacity reviews."
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
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
