import React, { useState, useMemo } from 'react';
import {
  FileText,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Sparkles,
  ShieldCheck,
  Plus,
  Scale
} from 'lucide-react';

interface ChangeOrder {
  id: string;
  pcoNumber: string; // Potential Change Order #
  title: string;
  description: string;
  amount: number;
  timeExtensionDays: number;
  status: 'APPROVED_EXECUTED' | 'PENDING_ARCHITECT_REVIEW' | 'REJECTED';
  submittedDate: string;
  approvedDate?: string;
  costCode: string;
}

const INITIAL_CHANGE_ORDERS: ChangeOrder[] = [
  {
    id: 'co-1',
    pcoNumber: 'PCO-001',
    title: 'Relocate Chilled Water Risers due to Structural Beam Conflict',
    description: 'Field conflict on Level 3 requires routing 6-inch chilled water supply/return lines around unexpected post-tensioned tendon beam.',
    amount: 38500,
    timeExtensionDays: 5,
    status: 'APPROVED_EXECUTED',
    submittedDate: '2026-08-12',
    approvedDate: '2026-08-18',
    costCode: '15-400 Chilled Water Piping'
  },
  {
    id: 'co-2',
    pcoNumber: 'PCO-002',
    title: 'Owner Added HEPA Filtration Units in Operating Rooms 4 & 5',
    description: 'Hospital owner request to upgrade standard MERV-14 filters to medical-grade HEPA filtration modules with dedicated differential pressure gauges.',
    amount: 62400,
    timeExtensionDays: 8,
    status: 'APPROVED_EXECUTED',
    submittedDate: '2026-09-04',
    approvedDate: '2026-09-11',
    costCode: '15-500 AHU Air Handling'
  },
  {
    id: 'co-3',
    pcoNumber: 'PCO-003',
    title: 'Emergency Generator Interlock DDC Sequence Revision',
    description: 'Architect Bulletin #04 requires emergency exhaust damper interlock sequence modification with BACnet MSTP gateway expansion.',
    amount: 24800,
    timeExtensionDays: 4,
    status: 'PENDING_ARCHITECT_REVIEW',
    submittedDate: '2026-10-02',
    costCode: '15-900 BMS Building Automation'
  }
];

export const CommercialChangeOrderWorkspace: React.FC = () => {
  const [changeOrders, setChangeOrders] = useState<ChangeOrder[]>(INITIAL_CHANGE_ORDERS);
  const [originalContractSum, setOriginalContractSum] = useState<number>(850000);
  const [originalContractDays, setOriginalContractDays] = useState<number>(180);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [selectedCoId, setSelectedCoId] = useState<string>(INITIAL_CHANGE_ORDERS[0].id);

  const calculations = useMemo(() => {
    let approvedAmount = 0;
    let pendingAmount = 0;
    let approvedDays = 0;
    let pendingDays = 0;

    changeOrders.forEach(co => {
      if (co.status === 'APPROVED_EXECUTED') {
        approvedAmount += co.amount;
        approvedDays += co.timeExtensionDays;
      } else if (co.status === 'PENDING_ARCHITECT_REVIEW') {
        pendingAmount += co.amount;
        pendingDays += co.timeExtensionDays;
      }
    });

    const revisedContractSum = originalContractSum + approvedAmount;
    const revisedContractDays = originalContractDays + approvedDays;

    return {
      approvedAmount,
      pendingAmount,
      approvedDays,
      pendingDays,
      revisedContractSum,
      revisedContractDays
    };
  }, [changeOrders, originalContractSum, originalContractDays]);

  const handleApproveCo = (id: string) => {
    setChangeOrders(prev => prev.map(co => {
      if (co.id === id) {
        return {
          ...co,
          status: 'APPROVED_EXECUTED',
          approvedDate: new Date().toISOString().substring(0, 10)
        };
      }
      return co;
    }));
  };

  const selectedCo = changeOrders.find(co => co.id === selectedCoId) || changeOrders[0];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white shadow-xl border border-blue-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AIA Document G701™ Legal Dispute Elimination</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Change Order Governance &amp; Time Extension Desk (AIA G701)</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Prevents the #1 cause of construction lawsuits and subcontractor write-downs. Enforces formal 3-party digital execution (Owner, Architect, Contractor) for scope modifications and contractual substantial completion time extensions before extra work begins.
            </p>
          </div>

          <div className="bg-blue-900/80 backdrop-blur-md rounded-xl p-4 border border-blue-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-blue-300">Revised Contract Sum</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${calculations.revisedContractSum.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">Original: ${originalContractSum.toLocaleString()} (+${calculations.approvedAmount.toLocaleString()})</p>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Approved Change Orders</span>
          <p className="text-xl font-black text-slate-900">${calculations.approvedAmount.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-600 font-sans font-bold">Legally executed into contract</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Pending Review (At Risk)</span>
          <p className="text-xl font-black text-amber-700">${calculations.pendingAmount.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Awaiting architect signature</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Approved Time Extensions</span>
          <p className="text-xl font-black text-indigo-700">+{calculations.approvedDays} Calendar Days</p>
          <p className="text-[10px] text-slate-500 font-sans">Liquidated damages protection</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Dispute Exposure</span>
          <p className="text-xl font-black text-emerald-700">$0.00 Legal Claims</p>
          <p className="text-[10px] text-slate-500 font-sans">100% formal AIA audit trail</p>
        </div>
      </div>

      {/* CHANGE ORDERS TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Contract Change Order Schedule</h3>
            <p className="text-xs text-slate-500">Itemized scope changes with cost impact and calendar day adjustments</p>
          </div>

          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Official AIA G701 PDF</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {changeOrders.map(co => (
            <div
              key={co.id}
              onClick={() => setSelectedCoId(co.id)}
              className={`p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition cursor-pointer ${
                co.id === selectedCoId ? 'bg-blue-50/40 border-l-4 border-l-blue-600' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded text-[11px]">
                    {co.pcoNumber}
                  </span>
                  <h4 className="font-bold text-slate-900 font-sans text-sm">{co.title}</h4>
                </div>
                <p className="text-slate-600 font-sans text-xs">{co.description}</p>
                <p className="text-slate-500 text-[10px]">Cost Code: {co.costCode}</p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <p className="font-black text-slate-900 text-sm">${co.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-indigo-700 font-semibold">+{co.timeExtensionDays} Days Extension</p>
                </div>

                <div className="w-36 text-center">
                  {co.status === 'APPROVED_EXECUTED' ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ Formally Executed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApproveCo(co.id);
                      }}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition shadow-xs"
                    >
                      Sign &amp; Execute
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRINT MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">AIA DOCUMENT G701™ – CHANGE ORDER</h3>
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
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                <p><strong>CHANGE ORDER NUMBER:</strong> {selectedCo.pcoNumber}</p>
                <p><strong>SCOPE DESCRIPTION:</strong> {selectedCo.title}</p>
                <p><strong>NET CONTRACT INCREASE:</strong> ${selectedCo.amount.toLocaleString()}</p>
                <p><strong>CONTRACT TIME EXTENSION:</strong> +{selectedCo.timeExtensionDays} Calendar Days</p>
                <p><strong>NEW CONTRACT SUM:</strong> ${calculations.revisedContractSum.toLocaleString()}</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-500 italic">
                "The Contract is changed as follows. Neither the Contract Sum nor Contract Time shall be further adjusted for this event unless explicitly stipulated in writing."
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official AIA G701</span>
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
