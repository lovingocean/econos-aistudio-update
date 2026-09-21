import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  BookOpen, 
  PieChart, 
  Download,
  Building,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export interface PerformanceObligation {
  id: string;
  name: string;
  type: 'OVER_TIME' | 'POINT_IN_TIME';
  standaloneSellingPrice: number;
  allocatedAmountUsd: number;
  allocationPct: number;
  durationMonths: number;
  recognizedToDateUsd: number;
  deferredBalanceUsd: number;
  monthlyRunRateUsd: number;
  status: 'ACTIVE_AMORTIZING' | 'FULLY_SATISFIED' | 'AWAITING_MILESTONE';
}

export interface ContractRecognitionModel {
  id: string;
  customerName: string;
  contractNumber: string;
  effectiveDate: string;
  totalContractValueUsd: number;
  billingFrequency: 'ANNUAL_UPFRONT' | 'MULTI_YEAR_UPFRONT' | 'QUARTERLY';
  asc606Certified: boolean;
  performanceObligations: PerformanceObligation[];
}

const SAMPLE_CONTRACT: ContractRecognitionModel = {
  id: 'ctr_asc606_01',
  customerName: 'Astra Global Logistics Enterprise',
  contractNumber: 'CTR-2026-ASTRA-09',
  effectiveDate: '2026-01-01',
  totalContractValueUsd: 360000.00,
  billingFrequency: 'ANNUAL_UPFRONT',
  asc606Certified: true,
  performanceObligations: [
    {
      id: 'pob_01',
      name: 'EconOS Platform Enterprise Core License (500 Seats)',
      type: 'OVER_TIME',
      standaloneSellingPrice: 260000.00,
      allocatedAmountUsd: 252000.00,
      allocationPct: 70.0,
      durationMonths: 12,
      recognizedToDateUsd: 168000.00, // 8 months recognized
      deferredBalanceUsd: 84000.00,
      monthlyRunRateUsd: 21000.00,
      status: 'ACTIVE_AMORTIZING'
    },
    {
      id: 'pob_02',
      name: 'Custom ERP Data Warehouse Connector Deployment',
      type: 'POINT_IN_TIME',
      standaloneSellingPrice: 65000.00,
      allocatedAmountUsd: 63000.00,
      allocationPct: 17.5,
      durationMonths: 1,
      recognizedToDateUsd: 63000.00, // Fully recognized upon UAT acceptance
      deferredBalanceUsd: 0.00,
      monthlyRunRateUsd: 0.00,
      status: 'FULLY_SATISFIED'
    },
    {
      id: 'pob_03',
      name: '24/7 Mission-Critical Fiduciary SLA & TAM Advisory',
      type: 'OVER_TIME',
      standaloneSellingPrice: 48000.00,
      allocatedAmountUsd: 45000.00,
      allocationPct: 12.5,
      durationMonths: 12,
      recognizedToDateUsd: 30000.00, // 8 months recognized
      deferredBalanceUsd: 15000.00,
      monthlyRunRateUsd: 3750.00,
      status: 'ACTIVE_AMORTIZING'
    }
  ]
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const CommercialRevenueRecognitionWorkspace: React.FC = () => {
  const [contract, setContract] = useState<ContractRecognitionModel>(SAMPLE_CONTRACT);
  const [selectedPobId, setSelectedPobId] = useState<string>('ALL');
  const [journalPosted, setJournalPosted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Contract Unbundling Simulator State
  const [simCustomer, setSimCustomer] = useState('Apex Quantum Corp');
  const [simTcv, setSimTcv] = useState(240000);
  const [simLicensePct, setSimLicensePct] = useState(75);
  const [simServicesPct, setSimServicesPct] = useState(15);
  const [simSupportPct, setSimSupportPct] = useState(10);

  const totalRecognized = contract.performanceObligations.reduce((acc, p) => acc + p.recognizedToDateUsd, 0);
  const totalDeferred = contract.performanceObligations.reduce((acc, p) => acc + p.deferredBalanceUsd, 0);
  const currentMonthlyAmortization = contract.performanceObligations.reduce((acc, p) => acc + p.monthlyRunRateUsd, 0);

  const handlePostJournalEntry = () => {
    setJournalPosted(true);
    setStatusMessage(`Posted Balanced ASC 606 Journal Entry for Current Period: DR 2100 Deferred Revenue ($${(currentMonthlyAmortization || 0).toLocaleString()}) | CR 4000 Subscription Revenue ($${(currentMonthlyAmortization || 0).toLocaleString()})`);
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleApplySimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const sum = simLicensePct + simServicesPct + simSupportPct;
    if (sum !== 100) {
      setStatusMessage(`Validation error: Percentages must equal 100% (currently ${sum}%)`);
      setTimeout(() => setStatusMessage(null), 5000);
      return;
    }

    const licenseAmt = (simTcv * simLicensePct) / 100;
    const servicesAmt = (simTcv * simServicesPct) / 100;
    const supportAmt = (simTcv * simSupportPct) / 100;

    const newModel: ContractRecognitionModel = {
      id: `ctr_${Date.now()}`,
      customerName: simCustomer,
      contractNumber: `CTR-2026-${simCustomer.slice(0, 4).toUpperCase()}-11`,
      effectiveDate: '2026-09-01',
      totalContractValueUsd: simTcv,
      billingFrequency: 'ANNUAL_UPFRONT',
      asc606Certified: true,
      performanceObligations: [
        {
          id: 'pob_sim_1',
          name: `${simCustomer} Enterprise SaaS License Subscription`,
          type: 'OVER_TIME',
          standaloneSellingPrice: licenseAmt * 1.05,
          allocatedAmountUsd: licenseAmt,
          allocationPct: simLicensePct,
          durationMonths: 12,
          recognizedToDateUsd: licenseAmt / 12, // 1 month recognized
          deferredBalanceUsd: licenseAmt - (licenseAmt / 12),
          monthlyRunRateUsd: licenseAmt / 12,
          status: 'ACTIVE_AMORTIZING'
        },
        {
          id: 'pob_sim_2',
          name: 'Professional Architecture & Workflow Implementation',
          type: 'POINT_IN_TIME',
          standaloneSellingPrice: servicesAmt * 1.1,
          allocatedAmountUsd: servicesAmt,
          allocationPct: simServicesPct,
          durationMonths: 1,
          recognizedToDateUsd: 0,
          deferredBalanceUsd: servicesAmt,
          monthlyRunRateUsd: 0,
          status: 'AWAITING_MILESTONE'
        },
        {
          id: 'pob_sim_3',
          name: 'Priority Premier Fiduciary Support & SLA',
          type: 'OVER_TIME',
          standaloneSellingPrice: supportAmt * 1.05,
          allocatedAmountUsd: supportAmt,
          allocationPct: simSupportPct,
          durationMonths: 12,
          recognizedToDateUsd: supportAmt / 12,
          deferredBalanceUsd: supportAmt - (supportAmt / 12),
          monthlyRunRateUsd: supportAmt / 12,
          status: 'ACTIVE_AMORTIZING'
        }
      ]
    };

    setContract(newModel);
    setJournalPosted(false);
    setStatusMessage(`Synthesized ASC 606 Contract Model for ${simCustomer} ($${(simTcv || 0).toLocaleString()} TCV). Revenue recognition calendar deployed.`);
    setTimeout(() => setStatusMessage(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#132338] text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                ASC 606 & IFRS 15 COMPLIANCE
              </span>
              <span className="text-slate-400 text-xs font-mono">• 5-Step Revenue Amortization Engine</span>
            </div>
            <h2 className="text-xl font-bold font-mono tracking-tight text-white mt-1">
              Multi-Element Contract Revenue Recognition Waterfall
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Unbundles SaaS subscriptions, professional services, and SLA obligations into standalone selling prices (SSP). Calculates deferred liability amortization and auto-generates balanced double-entry GL journal vouchers.
            </p>
          </div>

          <button
            onClick={handlePostJournalEntry}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition shadow-sm self-start md:self-auto shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>Post Period GL Journal</span>
          </button>
        </div>

        {statusMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Metric Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Total Contract Value</span>
              <DollarSign className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              ${(contract.totalContractValueUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-teal-400/80 font-mono mt-0.5">100% Upfront Invoiced</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Recognized to Date</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
              ${(totalRecognized || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {(((totalRecognized || 0) / (contract.totalContractValueUsd || 1)) * 100).toFixed(1)}% Satisfied
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Deferred Revenue Liability</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold font-mono text-amber-300 mt-1">
              ${(totalDeferred || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Balance Sheet Account #2100</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Monthly Amortization</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              ${(currentMonthlyAmortization || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}/mo
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Straight-Line Over Time</div>
          </div>
        </div>
      </div>

      {/* 5-Step Methodology Badge Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs font-mono">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-teal-600">STEP 1</div>
          <div className="font-bold text-slate-900 mt-0.5">Identify Contract</div>
          <div className="text-[11px] text-slate-500 mt-0.5 truncate">{contract.contractNumber}</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-teal-600">STEP 2</div>
          <div className="font-bold text-slate-900 mt-0.5">Unbundle POBs</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{contract.performanceObligations.length} Distinct Obligations</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-teal-600">STEP 3</div>
          <div className="font-bold text-slate-900 mt-0.5">Transaction Price</div>
          <div className="text-[11px] text-slate-500 mt-0.5">${(contract.totalContractValueUsd || 0).toLocaleString()} TCV</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-teal-600">STEP 4</div>
          <div className="font-bold text-slate-900 mt-0.5">Allocate via SSP</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Relative Standalone Price</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-teal-600">STEP 5</div>
          <div className="font-bold text-slate-900 mt-0.5">Recognize Revenue</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Over Time vs Point-in-Time</div>
        </div>
      </div>

      {/* Performance Obligations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-mono text-slate-900">
              Unbundled Performance Obligations (POB Schedule)
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Client: <span className="font-bold text-slate-800">{contract.customerName}</span> ({contract.contractNumber})
            </p>
          </div>
          <span className="px-2.5 py-1 rounded font-mono text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
            ASC 606 AUDITOR CERTIFIED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="p-3 font-semibold">Obligation Description</th>
                <th className="p-3 font-semibold text-center">Timing Pattern</th>
                <th className="p-3 font-semibold text-right">Standalone Price</th>
                <th className="p-3 font-semibold text-right">Allocated (SSP)</th>
                <th className="p-3 font-semibold text-right">Recognized To Date</th>
                <th className="p-3 font-semibold text-right">Deferred Balance</th>
                <th className="p-3 font-semibold text-right">Monthly Run Rate</th>
                <th className="p-3 font-semibold text-center">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {contract.performanceObligations.map(pob => (
                <tr key={pob.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{pob.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">ID: {pob.id} • {pob.durationMonths} Months Duration</div>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      pob.type === 'OVER_TIME' 
                        ? 'bg-blue-50 text-blue-800 border border-blue-200' 
                        : 'bg-purple-50 text-purple-800 border border-purple-200'
                    }`}>
                      {pob.type === 'OVER_TIME' ? 'Over Time (Ratable)' : 'Point in Time (Milestone)'}
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-500">
                    ${(pob.standaloneSellingPrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-right">
                    <div className="font-bold text-slate-900">
                      ${(pob.allocatedAmountUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-slate-400">{pob.allocationPct.toFixed(1)}% of TCV</div>
                  </td>
                  <td className="p-3 text-right font-bold text-emerald-700">
                    ${(pob.recognizedToDateUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-right font-bold text-amber-700">
                    ${(pob.deferredBalanceUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-800">
                    {pob.monthlyRunRateUsd > 0 ? `$${(pob.monthlyRunRateUsd || 0).toLocaleString()}/mo` : '—'}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      pob.status === 'FULLY_SATISFIED' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : pob.status === 'ACTIVE_AMORTIZING'
                        ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {pob.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 12-Month Forward Revenue Waterfall Matrix */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-mono text-slate-900">
              12-Month Forward Revenue Recognition Waterfall ($ USD)
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Straight-line deferred revenue release schedule into profit & loss statement
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Total Recognized FY: <span className="font-bold text-slate-900">${(contract.totalContractValueUsd || 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 text-center font-mono">
          {MONTHS.map((month, idx) => {
            // Jan had implementation milestone ($63k) + monthly SaaS ($24.75k) = $87.75k
            // Months 2-12 have $24,750 each
            const isMilestoneMonth = idx === 0 && contract.id === 'ctr_asc606_01';
            const val = isMilestoneMonth ? 87750 : (contract.id === 'ctr_asc606_01' ? 24750 : currentMonthlyAmortization);
            const isPast = idx < 8; // Jan-Aug past

            return (
              <div 
                key={month}
                className={`p-2.5 rounded-xl border text-xs transition ${
                  isPast 
                    ? 'bg-teal-50/70 border-teal-200 text-teal-950 font-semibold' 
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="text-[10px] text-slate-500">{month} 2026</div>
                <div className="font-bold mt-1 text-[11px]">${Math.round(val / 1000)}k</div>
                <div className="text-[9px] mt-0.5 text-slate-400">{isPast ? 'Recognized' : 'Deferred'}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contract Synthesis / Simulator */}
      <div className="bg-gradient-to-r from-teal-50/80 via-white to-cyan-50/80 p-5 rounded-2xl border border-teal-200 shadow-xs">
        <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Synthesize New Enterprise ASC 606 Contract Model</span>
        </h3>
        <p className="text-xs text-slate-600 font-mono mt-1">
          Adjust multi-element allocation weights across SaaS core, professional implementation, and SLA support to recalculate the recognition schedule.
        </p>

        <form onSubmit={handleApplySimulation} className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs font-mono">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Customer Account</label>
            <input
              type="text"
              value={simCustomer}
              onChange={e => setSimCustomer(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Total Contract Value ($)</label>
            <input
              type="number"
              step={10000}
              value={simTcv}
              onChange={e => setSimTcv(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">SaaS License %</label>
            <input
              type="number"
              min={10}
              max={90}
              value={simLicensePct}
              onChange={e => setSimLicensePct(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Implementation %</label>
            <input
              type="number"
              min={0}
              max={50}
              value={simServicesPct}
              onChange={e => setSimServicesPct(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold font-mono transition shadow-sm"
            >
              Recalculate Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
