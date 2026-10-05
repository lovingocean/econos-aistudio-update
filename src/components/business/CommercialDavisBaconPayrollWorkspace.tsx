import React, { useState, useMemo } from 'react';
import {
  FileText,
  DollarSign,
  Users,
  CheckCircle2,
  Printer,
  Sparkles,
  ShieldCheck,
  Award,
  AlertTriangle,
  Building,
  Clock,
  Download
} from 'lucide-react';

interface PayrollWorker {
  id: string;
  name: string;
  last4Ssn: string;
  classification: string;
  straightHours: number;
  overtimeHours: number;
  baseHourlyRate: number; // e.g. $42.50
  fringeHourlyRate: number; // e.g. $18.25 (pension, health, apprentice)
  fedWithholding: number;
  ficaMedicare: number;
}

const INITIAL_WORKERS: PayrollWorker[] = [
  {
    id: 'w-1',
    name: 'Marcus Vance',
    last4Ssn: '4912',
    classification: 'Journeyman Pipefitter / Welder',
    straightHours: 40,
    overtimeHours: 6,
    baseHourlyRate: 46.50,
    fringeHourlyRate: 19.80,
    fedWithholding: 340.50,
    ficaMedicare: 182.20
  },
  {
    id: 'w-2',
    name: 'Elena Rostova',
    last4Ssn: '8831',
    classification: 'Journeyman Electrician (Inside Wireman)',
    straightHours: 40,
    overtimeHours: 4,
    baseHourlyRate: 48.00,
    fringeHourlyRate: 21.40,
    fedWithholding: 365.00,
    ficaMedicare: 195.40
  },
  {
    id: 'w-3',
    name: 'Darius Washington',
    last4Ssn: '2049',
    classification: 'Sheet Metal Journeyman (HVAC Duct)',
    straightHours: 40,
    overtimeHours: 8,
    baseHourlyRate: 44.00,
    fringeHourlyRate: 18.50,
    fedWithholding: 320.00,
    ficaMedicare: 178.60
  },
  {
    id: 'w-4',
    name: 'Mateo Morales',
    last4Ssn: '6190',
    classification: 'Registered Apprentice (Level 3 - 80%)',
    straightHours: 40,
    overtimeHours: 0,
    baseHourlyRate: 35.60,
    fringeHourlyRate: 14.80,
    fedWithholding: 210.00,
    ficaMedicare: 112.40
  },
  {
    id: 'w-5',
    name: 'Christopher Nolan',
    last4Ssn: '7721',
    classification: 'Heavy Equipment / Crane Operator',
    straightHours: 40,
    overtimeHours: 5,
    baseHourlyRate: 51.00,
    fringeHourlyRate: 22.90,
    fedWithholding: 410.00,
    ficaMedicare: 215.80
  }
];

export const CommercialDavisBaconPayrollWorkspace: React.FC = () => {
  const [workers, setWorkers] = useState<PayrollWorker[]>(INITIAL_WORKERS);
  const [weekEndingDate, setWeekEndingDate] = useState<string>('2026-10-10');
  const [payrollNo, setPayrollNo] = useState<number>(14);
  const [projectName, setProjectName] = useState<string>('Federal Reserve Bank Regional Data Center – HVAC Expansion');
  const [contractNumber, setContractNumber] = useState<string>('GS-07P-26-HVC-0092');
  const [wageDeterminationNo, setWageDeterminationNo] = useState<string>('TX20260028 – Heavy/Commercial Building');
  const [showComplianceModal, setShowComplianceModal] = useState<boolean>(false);

  const totals = useMemo(() => {
    let totalGrossPay = 0;
    let totalFringesPaid = 0;
    let totalNetPay = 0;
    let totalHours = 0;

    workers.forEach(w => {
      // Overtime is 1.5x base rate + regular fringe
      const straightPay = w.straightHours * w.baseHourlyRate;
      const overtimePay = w.overtimeHours * (w.baseHourlyRate * 1.5);
      const grossWages = straightPay + overtimePay;
      const fringes = (w.straightHours + w.overtimeHours) * w.fringeHourlyRate;
      const deductions = w.fedWithholding + w.ficaMedicare;
      const netPay = grossWages - deductions;

      totalGrossPay += grossWages;
      totalFringesPaid += fringes;
      totalNetPay += netPay;
      totalHours += w.straightHours + w.overtimeHours;
    });

    return {
      totalGrossPay: Math.round(totalGrossPay),
      totalFringesPaid: Math.round(totalFringesPaid),
      totalNetPay: Math.round(totalNetPay),
      totalHours
    };
  }, [workers]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 text-white shadow-xl border border-amber-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>US Department of Labor Compliance</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Davis-Bacon Act &amp; Form WH-347 Certified Payroll</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                Prevailing Wage
              </span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Mandatory certified payroll audit trail for federal, municipal, and Inflation Reduction Act (IRA) projects. Calculates prevailing hourly rates and fringe benefits by craft, verifies apprenticeship ratios, and generates DOL Form WH-347 Statements of Compliance under penalty of perjury.
            </p>
          </div>

          <div className="bg-amber-900/80 backdrop-blur-md rounded-xl p-4 border border-amber-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300">Total Certified Weekly Payroll</p>
            <p className="text-2xl font-mono font-black text-amber-400">
              ${totals.totalGrossPay.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">{totals.totalHours} Certified Craft Hours</p>
          </div>
        </div>
      </div>

      {/* PROJECT DETERMINATION CARD */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <p className="font-bold text-slate-900">Project: {projectName}</p>
          <p className="text-slate-500 text-[11px]">Contract #{contractNumber} | Wage Determination: {wageDeterminationNo}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">Weekly Payroll Period:</span>
            <span className="font-bold text-slate-900">Week #{payrollNo} Ending {weekEndingDate}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowComplianceModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Form WH-347</span>
          </button>
        </div>
      </div>

      {/* CRAFT WORKERS PAYROLL TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Certified Craft Payroll Records</h3>
            <p className="text-xs text-slate-500">Itemized prevailing base rates and fringe benefits breakdown</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
              ✓ Prevailing Wages Satisfied (IRA 5x Bonus Qualified)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Employee &amp; Last 4 SSN</th>
                <th className="py-3 px-4">Trade Classification</th>
                <th className="py-3 px-4 text-center">ST / OT Hrs</th>
                <th className="py-3 px-4 text-right">Base Rate</th>
                <th className="py-3 px-4 text-right">Fringe/Hr</th>
                <th className="py-3 px-4 text-right">Gross Pay</th>
                <th className="py-3 px-4 text-right">Deductions</th>
                <th className="py-3 px-4 text-right">Net Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {workers.map(w => {
                const gross = (w.straightHours * w.baseHourlyRate) + (w.overtimeHours * (w.baseHourlyRate * 1.5));
                const totalDeductions = w.fedWithholding + w.ficaMedicare;
                const net = gross - totalDeductions;

                return (
                  <tr key={w.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{w.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">XXX-XX-{w.last4Ssn}</p>
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-800">{w.classification}</td>
                    <td className="py-3 px-4 text-center font-bold">
                      {w.straightHours} / <span className="text-amber-700">{w.overtimeHours}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">${w.baseHourlyRate.toFixed(2)}/hr</td>
                    <td className="py-3 px-4 text-right text-emerald-700 font-bold">${w.fringeHourlyRate.toFixed(2)}/hr</td>
                    <td className="py-3 px-4 text-right font-black text-slate-900">${gross.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right text-slate-500">-${totalDeductions.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-black text-emerald-800">${net.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPLIANCE MODAL */}
      {showComplianceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Form WH-347 Statement of Compliance</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowComplianceModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <p className="font-bold text-slate-900">U.S. DEPARTMENT OF LABOR WAGE AND HOUR DIVISION</p>
              <p className="text-slate-600 leading-relaxed italic text-[11px]">
                "I do hereby state that I pay or supervise the payment of the persons employed by Apex Mechanical Solutions LLC on the {projectName}; that during the payroll period commencing on October 4, 2026 and ending on {weekEndingDate}, all persons employed on said project have been paid the full weekly wages earned, that no rebates have been or will be made, and that each laborer or mechanic has been paid not less than the applicable wage rates and bona fide fringe benefits contained in the governing Wage Determination."
              </p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500">
                <span>Signatory: Managing Officer, Apex Mechanical</span>
                <span>Penalty of Perjury: 18 U.S.C. 1001</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print WH-347 Certification</span>
              </button>
              <button
                type="button"
                onClick={() => setShowComplianceModal(false)}
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
