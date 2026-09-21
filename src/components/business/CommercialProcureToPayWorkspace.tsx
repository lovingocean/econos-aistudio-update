import React, { useState } from 'react';
import { 
  ShoppingCart, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  ArrowRight, 
  Percent, 
  DollarSign, 
  Plus, 
  Eye, 
  Truck, 
  FileText, 
  Receipt,
  Sparkles,
  ShieldCheck,
  Building2,
  Calendar,
  X
} from 'lucide-react';

export interface PurchaseOrderMatchItem {
  id: string;
  poNumber: string;
  vendorName: string;
  department: string;
  itemDescription: string;
  poQty: number;
  poUnitPrice: number;
  poTotal: number;
  grnQtyReceived: number;
  grnDate: string;
  invoiceNumber: string;
  invoiceQtyBilled: number;
  invoiceUnitPrice: number;
  invoiceTotal: number;
  varianceUsd: number;
  variancePct: number;
  matchStatus: 'PERFECT_MATCH' | 'PRICE_VARIANCE' | 'QTY_VARIANCE' | 'PENDING_DELIVERY';
  paymentTerms: string;
  earlyDiscountEligible: boolean;
  discountTerms: string; // e.g., '2/10 Net 30'
  potentialSavingsUsd: number;
  approvalStatus: 'APPROVED_FOR_PAYMENT' | 'FLAGGED_FOR_REVIEW' | 'PAID' | 'PENDING_PO_APPROVAL';
}

const SAMPLE_MATCH_ITEMS: PurchaseOrderMatchItem[] = [
  {
    id: 'p2p_001',
    poNumber: 'PO-2026-0891',
    vendorName: 'Snowflake Cloud Data Corp',
    department: 'Engineering / Infra',
    itemDescription: 'Annual Enterprise Compute Capacity Units (480 Credits)',
    poQty: 480,
    poUnitPrice: 325.00,
    poTotal: 156000.00,
    grnQtyReceived: 480,
    grnDate: '2026-09-15',
    invoiceNumber: 'INV-SNOW-99214',
    invoiceQtyBilled: 480,
    invoiceUnitPrice: 325.00,
    invoiceTotal: 156000.00,
    varianceUsd: 0,
    variancePct: 0.0,
    matchStatus: 'PERFECT_MATCH',
    paymentTerms: '2/10 Net 30',
    earlyDiscountEligible: true,
    discountTerms: '2% if paid in 10 days',
    potentialSavingsUsd: 3120.00,
    approvalStatus: 'APPROVED_FOR_PAYMENT'
  },
  {
    id: 'p2p_002',
    poNumber: 'PO-2026-0894',
    vendorName: 'Supermicro Hardware Labs',
    department: 'AI Infrastructure',
    itemDescription: 'H100 NVLink 8-GPU Chassis Node',
    poQty: 2,
    poUnitPrice: 42000.00,
    poTotal: 84000.00,
    grnQtyReceived: 1,
    grnDate: '2026-09-18',
    invoiceNumber: 'INV-SMC-88102',
    invoiceQtyBilled: 2,
    invoiceUnitPrice: 44500.00,
    invoiceTotal: 89000.00,
    varianceUsd: 5000.00,
    variancePct: 5.95,
    matchStatus: 'PRICE_VARIANCE',
    paymentTerms: 'Net 30',
    earlyDiscountEligible: false,
    discountTerms: 'None',
    potentialSavingsUsd: 0,
    approvalStatus: 'FLAGGED_FOR_REVIEW'
  },
  {
    id: 'p2p_003',
    poNumber: 'PO-2026-0902',
    vendorName: 'Datadog Observability Inc',
    department: 'Site Reliability Eng',
    itemDescription: 'Q3 APM & Distributed Log Ingestion Suite',
    poQty: 1,
    poUnitPrice: 18500.00,
    poTotal: 18500.00,
    grnQtyReceived: 1,
    grnDate: '2026-09-10',
    invoiceNumber: 'DD-88192-US',
    invoiceQtyBilled: 1,
    invoiceUnitPrice: 18500.00,
    invoiceTotal: 18500.00,
    varianceUsd: 0,
    variancePct: 0.0,
    matchStatus: 'PERFECT_MATCH',
    paymentTerms: '2/10 Net 45',
    earlyDiscountEligible: true,
    discountTerms: '2% if paid in 10 days',
    potentialSavingsUsd: 370.00,
    approvalStatus: 'APPROVED_FOR_PAYMENT'
  },
  {
    id: 'p2p_004',
    poNumber: 'PO-2026-0915',
    vendorName: 'Gartner Research Advisory',
    department: 'Executive / Strategy',
    itemDescription: 'Global Enterprise Tech Vendor Magic Quadrant Seat License',
    poQty: 4,
    poUnitPrice: 8750.00,
    poTotal: 35000.00,
    grnQtyReceived: 0,
    grnDate: 'Awaiting Onboarding',
    invoiceNumber: 'GART-4410-Q3',
    invoiceQtyBilled: 4,
    invoiceUnitPrice: 8750.00,
    invoiceTotal: 35000.00,
    varianceUsd: 0,
    variancePct: 0.0,
    matchStatus: 'PENDING_DELIVERY',
    paymentTerms: 'Net 30',
    earlyDiscountEligible: false,
    discountTerms: 'None',
    potentialSavingsUsd: 0,
    approvalStatus: 'FLAGGED_FOR_REVIEW'
  }
];

export const CommercialProcureToPayWorkspace: React.FC = () => {
  const [items, setItems] = useState<PurchaseOrderMatchItem[]>(SAMPLE_MATCH_ITEMS);
  const [filter, setFilter] = useState<'ALL' | 'NEEDS_REVIEW' | 'MATCHED' | 'DISCOUNTABLE'>('ALL');
  const [selectedItem, setSelectedItem] = useState<PurchaseOrderMatchItem | null>(null);
  const [isNewPoOpen, setIsNewPoOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // New PO form state
  const [newVendor, setNewVendor] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newQty, setNewQty] = useState(1);
  const [newUnitPrice, setNewUnitPrice] = useState(5000);
  const [newTerms, setNewTerms] = useState('2/10 Net 30');

  const totalPoVolume = items.reduce((acc, i) => acc + i.poTotal, 0);
  const totalBilledVolume = items.reduce((acc, i) => acc + i.invoiceTotal, 0);
  const totalPotentialSavings = items.filter(i => i.earlyDiscountEligible && i.approvalStatus !== 'PAID').reduce((acc, i) => acc + i.potentialSavingsUsd, 0);
  const flaggedCount = items.filter(i => i.matchStatus !== 'PERFECT_MATCH' || i.approvalStatus === 'FLAGGED_FOR_REVIEW').length;

  const filteredItems = items.filter(item => {
    if (filter === 'NEEDS_REVIEW') return item.approvalStatus === 'FLAGGED_FOR_REVIEW' || item.matchStatus !== 'PERFECT_MATCH';
    if (filter === 'MATCHED') return item.matchStatus === 'PERFECT_MATCH';
    if (filter === 'DISCOUNTABLE') return item.earlyDiscountEligible && item.approvalStatus !== 'PAID';
    return true;
  });

  const handleClaimDiscount = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          approvalStatus: 'PAID',
          invoiceTotal: item.invoiceTotal - item.potentialSavingsUsd
        };
      }
      return item;
    }));
    setActionNotice(`Successfully locked in 2% dynamic early-pay discount for item ${id}! Routed to Treasury Desk.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleApprovePayment = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          approvalStatus: 'PAID'
        };
      }
      return item;
    }));
    setActionNotice(`Payment for item ${id} approved and transmitted to Automated Clearing House (ACH).`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleCreatePo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor || !newItemDesc) return;

    const newId = `p2p_${Date.now()}`;
    const total = newQty * newUnitPrice;
    const isDiscount = newTerms.includes('2/10');
    const savings = isDiscount ? total * 0.02 : 0;

    const newPO: PurchaseOrderMatchItem = {
      id: newId,
      poNumber: `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      vendorName: newVendor,
      department: newDept,
      itemDescription: newItemDesc,
      poQty: newQty,
      poUnitPrice: newUnitPrice,
      poTotal: total,
      grnQtyReceived: 0,
      grnDate: 'Awaiting Shipment',
      invoiceNumber: 'Pending Invoicing',
      invoiceQtyBilled: 0,
      invoiceUnitPrice: newUnitPrice,
      invoiceTotal: total,
      varianceUsd: 0,
      variancePct: 0.0,
      matchStatus: 'PENDING_DELIVERY',
      paymentTerms: newTerms,
      earlyDiscountEligible: isDiscount,
      discountTerms: isDiscount ? '2% if paid in 10 days' : 'None',
      potentialSavingsUsd: savings,
      approvalStatus: 'PENDING_PO_APPROVAL'
    };

    setItems([newPO, ...items]);
    setIsNewPoOpen(false);
    setNewVendor('');
    setNewItemDesc('');
    setActionNotice(`Created Purchase Order ${newPO.poNumber} ($${(total || 0).toLocaleString()}). Enqueued for vendor acknowledgement.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#132338] text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PROCURE-TO-PAY AUTOMATION (P2P)
              </span>
              <span className="text-slate-400 text-xs font-mono">• Automated 3-Way Reconciliation</span>
            </div>
            <h2 className="text-xl font-bold font-mono tracking-tight text-white mt-1">
              Purchase Order, Receipt & Invoice 3-Way Match
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Automated optical matching comparing approved PO commitments against warehouse Goods Received Notes (GRN) and vendor invoices. Auto-flags line-item variances & optimizes early payment dynamic discount yields.
            </p>
          </div>

          <button
            onClick={() => setIsNewPoOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition shadow-sm self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Purchase Order</span>
          </button>
        </div>

        {actionNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Open PO Commitments</span>
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              ${(totalPoVolume || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">{items.length} Active Orders</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Invoiced Receivables</span>
              <Receipt className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              ${(totalBilledVolume || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Matched vs Billed</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Dynamic Discount Yield</span>
              <Percent className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
              +${(totalPotentialSavings || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400/80 font-mono mt-0.5">36.7% Annualized APR</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Discrepancy Flags</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className={`text-lg font-bold font-mono mt-1 ${flaggedCount > 0 ? 'text-rose-300' : 'text-slate-200'}`}>
              {flaggedCount} Exceptions
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Price or Qty Variance</div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              filter === 'ALL' ? 'bg-[#132338] text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Items ({items.length})
          </button>
          <button
            onClick={() => setFilter('NEEDS_REVIEW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition ${
              filter === 'NEEDS_REVIEW' ? 'bg-rose-700 text-white font-bold' : 'text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Exceptions ({flaggedCount})</span>
          </button>
          <button
            onClick={() => setFilter('MATCHED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition ${
              filter === 'MATCHED' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>3-Way Matched ({items.filter(i => i.matchStatus === 'PERFECT_MATCH').length})</span>
          </button>
          <button
            onClick={() => setFilter('DISCOUNTABLE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition ${
              filter === 'DISCOUNTABLE' ? 'bg-indigo-700 text-white font-bold' : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Early Discounts Available</span>
          </button>
        </div>

        <div className="text-xs font-mono text-slate-500 hidden sm:block">
          Auto-tolerance threshold: <span className="font-bold text-slate-700">±1.00%</span>
        </div>
      </div>

      {/* 3-Way Match Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
                <th className="p-3 font-semibold">PO # & Vendor</th>
                <th className="p-3 font-semibold">Line Description</th>
                <th className="p-3 font-semibold text-right">PO Commit</th>
                <th className="p-3 font-semibold text-center">GRN Received</th>
                <th className="p-3 font-semibold text-right">Vendor Invoiced</th>
                <th className="p-3 font-semibold text-center">Variance / Match</th>
                <th className="p-3 font-semibold text-center">Terms & Savings</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {filteredItems.map(item => {
                const isMatched = item.matchStatus === 'PERFECT_MATCH';
                const isPaid = item.approvalStatus === 'PAID';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{item.poNumber}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" />
                        <span>{item.vendorName}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.department}</div>
                    </td>

                    <td className="p-3">
                      <div className="text-slate-800 font-medium max-w-xs truncate">{item.itemDescription}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Invoice ID: <span className="font-mono text-slate-600">{item.invoiceNumber}</span>
                      </div>
                    </td>

                    <td className="p-3 text-right">
                      <div className="font-bold text-slate-900">
                        ${(item.poTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.poQty} units @ ${(item.poUnitPrice || 0).toLocaleString()}
                      </div>
                    </td>

                    <td className="p-3 text-center">
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.grnQtyReceived === item.poQty 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <Truck className="w-3 h-3" />
                        <span>{item.grnQtyReceived} / {item.poQty}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.grnDate}</div>
                    </td>

                    <td className="p-3 text-right">
                      <div className="font-bold text-slate-900">
                        ${(item.invoiceTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.invoiceQtyBilled} billed @ ${(item.invoiceUnitPrice || 0).toLocaleString()}
                      </div>
                    </td>

                    <td className="p-3 text-center">
                      {isMatched ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>3-WAY MATCH</span>
                        </span>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                            <AlertTriangle className="w-3 h-3" />
                            <span>+{item.variancePct.toFixed(1)}% VAR</span>
                          </span>
                          <div className="text-[10px] text-rose-600 font-medium">
                            +${(item.varianceUsd || 0).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      <div className="text-[11px] text-slate-700 font-semibold">{item.paymentTerms}</div>
                      {item.earlyDiscountEligible && !isPaid && (
                        <div className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5 border border-emerald-200">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Save ${(item.potentialSavingsUsd || 0).toLocaleString()}</span>
                        </div>
                      )}
                      {isPaid && (
                        <span className="text-[10px] font-bold text-slate-400">DISBURSED / SETTLED</span>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.earlyDiscountEligible && !isPaid && (
                          <button
                            onClick={() => handleClaimDiscount(item.id)}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition shadow-2xs flex items-center gap-1"
                          >
                            <span>Claim 2%</span>
                          </button>
                        )}

                        {!isPaid && (
                          <button
                            onClick={() => handleApprovePayment(item.id)}
                            className={`px-2.5 py-1 rounded font-bold text-[11px] transition shadow-2xs ${
                              isMatched 
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            {isMatched ? 'Pay ACH' : 'Override & Pay'}
                          </button>
                        )}

                        {isPaid && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Paid</span>
                          </span>
                        )}

                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
                          title="View 3-way documentation drill-down"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-cyan-600 uppercase tracking-wide">
                  3-Way Audit Proof Packet
                </span>
                <h3 className="text-base font-bold font-mono text-slate-900 mt-0.5">
                  {selectedItem.poNumber} — {selectedItem.vendorName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1 text-slate-500 font-bold">
                  <FileText className="w-3.5 h-3.5 text-cyan-600" />
                  <span>1. PO Commitment</span>
                </div>
                <div className="mt-2 text-slate-800 font-semibold">{selectedItem.poNumber}</div>
                <div className="text-slate-500 mt-1">Qty: {selectedItem.poQty}</div>
                <div className="text-slate-500">Rate: ${(selectedItem.poUnitPrice || 0).toLocaleString()}</div>
                <div className="font-bold text-slate-900 mt-2 border-t border-slate-200 pt-1">
                  ${(selectedItem.poTotal || 0).toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1 text-slate-500 font-bold">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>2. Goods Receipt</span>
                </div>
                <div className="mt-2 text-slate-800 font-semibold">GRN Verified</div>
                <div className="text-slate-500 mt-1">Qty Rcvd: {selectedItem.grnQtyReceived}</div>
                <div className="text-slate-500">Date: {selectedItem.grnDate}</div>
                <div className="font-bold text-slate-900 mt-2 border-t border-slate-200 pt-1">
                  {selectedItem.grnQtyReceived === selectedItem.poQty ? '100% Fulfilled' : 'Partial Delivery'}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1 text-slate-500 font-bold">
                  <Receipt className="w-3.5 h-3.5 text-indigo-600" />
                  <span>3. Vendor Invoice</span>
                </div>
                <div className="mt-2 text-slate-800 font-semibold">{selectedItem.invoiceNumber}</div>
                <div className="text-slate-500 mt-1">Qty Billed: {selectedItem.invoiceQtyBilled}</div>
                <div className="text-slate-500">Rate: ${(selectedItem.invoiceUnitPrice || 0).toLocaleString()}</div>
                <div className="font-bold text-slate-900 mt-2 border-t border-slate-200 pt-1">
                  ${(selectedItem.invoiceTotal || 0).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Variance Calculation:</span>
                <span className={`font-bold ${selectedItem.varianceUsd > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  ${(selectedItem.varianceUsd || 0).toLocaleString()} ({selectedItem.variancePct.toFixed(2)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Terms:</span>
                <span className="font-bold text-slate-800">{selectedItem.paymentTerms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Early Payment Discount:</span>
                <span className="font-bold text-emerald-600">
                  {selectedItem.earlyDiscountEligible ? `Save $${(selectedItem.potentialSavingsUsd || 0).toLocaleString()} (2% Net-10)` : 'None'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 hover:bg-slate-50 transition"
              >
                Close Packet
              </button>
              {selectedItem.approvalStatus !== 'PAID' && (
                <button
                  onClick={() => {
                    handleApprovePayment(selectedItem.id);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#132338] text-white text-xs font-mono font-bold hover:bg-slate-800 transition"
                >
                  Approve & Release Wire
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New PO Creation Modal */}
      {isNewPoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-cyan-600 uppercase tracking-wide">
                  Procurement Authorization
                </span>
                <h3 className="text-base font-bold font-mono text-slate-900 mt-0.5">
                  Create Authoritative Purchase Order (PO)
                </h3>
              </div>
              <button
                onClick={() => setIsNewPoOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePo} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Vendor Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Anthropic Enterprise API Inc"
                  value={newVendor}
                  onChange={e => setNewVendor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Department</label>
                  <select
                    value={newDept}
                    onChange={e => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="Engineering / Infra">Engineering / Infra</option>
                    <option value="AI Infrastructure">AI Infrastructure</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Finance & Operations">Finance & Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Payment Terms</label>
                  <select
                    value={newTerms}
                    onChange={e => setNewTerms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="2/10 Net 30">2/10 Net 30 (Dynamic Discount)</option>
                    <option value="2/10 Net 45">2/10 Net 45 (Extended Discount)</option>
                    <option value="Net 30">Net 30 Standard</option>
                    <option value="Net 60">Net 60 Corporate</option>
                    <option value="Due on Receipt">Due on Receipt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Item / Scope Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 20M Claude 3.5 Sonnet Tokens Bulk Commitment"
                  value={newItemDesc}
                  onChange={e => setNewItemDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={newQty}
                    onChange={e => setNewQty(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Unit Price ($ USD)</label>
                  <input
                    type="number"
                    min={1}
                    step={100}
                    value={newUnitPrice}
                    onChange={e => setNewUnitPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-cyan-50/70 border border-cyan-200 rounded-xl text-xs font-mono flex justify-between items-center text-cyan-950">
                <span>Calculated PO Total:</span>
                <span className="text-sm font-bold">${((newQty || 0) * (newUnitPrice || 0)).toLocaleString()} USD</span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewPoOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-mono font-bold hover:bg-cyan-500 transition shadow-sm"
                >
                  Issue PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
