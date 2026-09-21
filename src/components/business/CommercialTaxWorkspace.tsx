import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../api/client';
import { QuarterlyTaxEstimate, VendorTaxComplianceRecord } from '../../types/commercial-ops';
import { useAuth } from '../../context/AuthContext';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileCheck2,
  Plus,
  Search,
  DollarSign,
  Building,
  Calendar,
  X,
  Edit2,
  ArrowUpRight,
  FileText,
  AlertCircle
} from 'lucide-react';

export const CommercialTaxWorkspace: React.FC = () => {
  const { currentOrg } = useAuth();
  const [taxEstimates, setTaxEstimates] = useState<QuarterlyTaxEstimate[]>([]);
  const [vendors, setVendors] = useState<VendorTaxComplianceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'QUARTERLY_TAX' | 'W9_COMPLIANCE'>('QUARTERLY_TAX');
  const [notification, setNotification] = useState<string | null>(null);

  // Reserve Adjustment Modal
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState<QuarterlyTaxEstimate | null>(null);
  const [reserveAmountInput, setReserveAmountInput] = useState<number>(0);
  const [reserveStatusInput, setReserveStatusInput] = useState<QuarterlyTaxEstimate['status']>('FUNDED');

  // Vendor W-9 Modal
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [entityType, setEntityType] = useState<VendorTaxComplianceRecord['entityType']>('SINGLE_MEMBER_LLC');
  const [tinInput, setTinInput] = useState('');
  const [w9Status, setW9Status] = useState<VendorTaxComplianceRecord['w9Status']>('VERIFIED');
  const [ytdPayments, setYtdPayments] = useState<number>(5000);

  const loadTaxData = async () => {
    try {
      setLoading(true);
      const [estRes, vndRes] = await Promise.all([
        api.getQuarterlyTaxEstimates().catch(() => []),
        api.getVendorTaxComplianceRecords().catch(() => [])
      ]);
      setTaxEstimates(estRes || []);
      setVendors(vndRes || []);
    } catch (err) {
      console.error('Failed to load tax data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTaxData();
  }, [currentOrg?.id]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // KPIs
  const totalTaxDueAnnual = useMemo(() => {
    return taxEstimates.reduce((acc, q) => acc + q.estimatedTaxDueUsd, 0);
  }, [taxEstimates]);

  const totalReservedAnnual = useMemo(() => {
    return taxEstimates.reduce((acc, q) => acc + q.currentTaxReserveUsd, 0);
  }, [taxEstimates]);

  const netSurplusOrDeficit = totalReservedAnnual - totalTaxDueAnnual;

  const compliantVendorsCount = useMemo(() => {
    return vendors.filter(v => v.w9Status === 'VERIFIED').length;
  }, [vendors]);

  const complianceRatePct = vendors.length > 0 ? Math.round((compliantVendorsCount / vendors.length) * 100) : 100;

  // Reserve Modal Handlers
  const handleOpenReserveModal = (item: QuarterlyTaxEstimate) => {
    setSelectedQuarter(item);
    setReserveAmountInput(item.currentTaxReserveUsd);
    setReserveStatusInput(item.status);
    setIsReserveModalOpen(true);
  };

  const handleSaveReserveAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuarter) return;

    try {
      await api.updateTaxEstimateReserve({
        quarter: selectedQuarter.quarter,
        year: selectedQuarter.year,
        reserveAmountUsd: Number(reserveAmountInput),
        status: reserveStatusInput
      });

      setIsReserveModalOpen(false);
      await loadTaxData();
      showToast(`Q${selectedQuarter.quarter} tax reserve updated to $${Number(reserveAmountInput).toLocaleString()}.`);
    } catch (err: any) {
      alert(err.message || 'Failed to update reserve');
    }
  };

  // Vendor Modal Handlers
  const handleOpenNewVendorModal = () => {
    setVendorName('');
    setEntityType('SINGLE_MEMBER_LLC');
    setTinInput('12-3456789');
    setW9Status('VERIFIED');
    setYtdPayments(5000);
    setIsVendorModalOpen(true);
  };

  const handleSaveVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName.trim()) return;

    try {
      const masked = tinInput.length >= 4 ? `XX-XXX${tinInput.slice(-4)}` : 'XX-XXXXXXX';
      const is1099Eligible = ytdPayments >= 600 && entityType !== 'C_CORPORATION';

      await api.createVendorTaxRecord({
        organizationId: currentOrg?.id || 'org_real_default',
        vendorName: vendorName.trim(),
        entityType,
        tinOnFileType: 'EIN',
        tinLast4Masked: masked,
        w9Status,
        w9SignedDate: new Date().toISOString().split('T')[0],
        totalPaymentsYtdUsd: Number(ytdPayments),
        is1099Eligible
      });

      setIsVendorModalOpen(false);
      await loadTaxData();
      showToast(`Vendor "${vendorName}" added to W-9 compliance vault.`);
    } catch (err: any) {
      alert(err.message || 'Failed to register vendor');
    }
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      return v.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [vendors, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Header Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Annual Estimated Corporate Tax</span>
            <Scale className="w-4 h-4 text-[#132338]" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            ${totalTaxDueAnnual.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            At statutory 21.0% Federal corporate rate
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Allocated Tax Reserves</span>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-600">
            ${totalReservedAnnual.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Held in segregated treasury escrow
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Tax Escrow Health</span>
            {netSurplusOrDeficit >= 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
          </div>
          <div className={`text-2xl font-bold font-mono ${netSurplusOrDeficit >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {netSurplusOrDeficit >= 0 ? '+' : ''}${netSurplusOrDeficit.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            {netSurplusOrDeficit >= 0 ? 'Fully funded surplus' : 'Accruing reserve balance'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">1099 / W-9 Compliance</span>
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            {complianceRatePct}% Verified
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            {compliantVendorsCount} of {vendors.length} vendors with valid W-9
          </p>
        </div>
      </div>

      {/* Subtab Toggle */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('QUARTERLY_TAX')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              activeSubTab === 'QUARTERLY_TAX'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Quarterly Corporate Tax Estimates (2026)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('W9_COMPLIANCE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              activeSubTab === 'W9_COMPLIANCE'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1099 & Vendor W-9 Vault ({vendors.length})</span>
          </button>
        </div>

        {activeSubTab === 'W9_COMPLIANCE' && (
          <button
            onClick={handleOpenNewVendorModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#132338] hover:bg-[#1e3450] text-white text-xs font-mono font-medium transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Vendor / Contractor</span>
          </button>
        )}
      </div>

      {/* VIEW A: QUARTERLY TAX ESTIMATES */}
      {activeSubTab === 'QUARTERLY_TAX' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden font-mono text-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Statutory Quarterly Tax Payment Schedule</h3>
              <p className="text-slate-500 text-[11px]">IRS & State corporate estimated tax deadlines, reserves, and remittance status</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Period & Due Date</th>
                  <th className="py-3 px-4 text-right">Est. Taxable Income</th>
                  <th className="py-3 px-4 text-right">Tax Due (21%)</th>
                  <th className="py-3 px-4 text-right">Current Reserve</th>
                  <th className="py-3 px-4 text-right">Surplus / Deficit</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {taxEstimates.map(q => {
                  const isPositive = q.reserveSurplusOrDeficitUsd >= 0;
                  const statusColors: Record<string, string> = {
                    ACCRUING: 'bg-amber-50 text-amber-700 border-amber-200',
                    FUNDED: 'bg-blue-50 text-blue-700 border-blue-200',
                    FILED_AND_PAID: 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  };

                  return (
                    <tr key={`${q.year}-Q${q.quarter}`} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">Q{q.quarter} {q.year}</div>
                        <div className="text-[11px] text-slate-500">Statutory Due: {q.dueDate}</div>
                      </td>

                      <td className="py-3.5 px-4 text-right text-slate-800 font-medium">
                        ${q.estimatedTaxableIncomeUsd.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                        ${q.estimatedTaxDueUsd.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-indigo-600">
                        ${q.currentTaxReserveUsd.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold">
                        <span className={isPositive ? 'text-emerald-600' : 'text-amber-600'}>
                          {isPositive ? '+' : ''}${q.reserveSurplusOrDeficitUsd.toLocaleString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusColors[q.status] || 'bg-slate-100 text-slate-700'}`}>
                          {q.status === 'FILED_AND_PAID' && <CheckCircle2 className="w-3 h-3" />}
                          {q.status === 'FUNDED' && <ShieldCheck className="w-3 h-3" />}
                          {q.status === 'ACCRUING' && <Clock className="w-3 h-3" />}
                          <span>{(q.status || '').replace(/_/g, ' ')}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenReserveModal(q)}
                          className="px-2.5 py-1 bg-[#132338] text-white hover:bg-[#1e3450] rounded-lg text-[10px] font-bold transition shadow-xs"
                        >
                          Adjust Reserve
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW B: 1099 & VENDOR W-9 COMPLIANCE VAULT */}
      {activeSubTab === 'W9_COMPLIANCE' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden font-mono text-xs">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">1099-NEC Vendor Compliance Vault</h3>
              <p className="text-slate-500 text-[11px]">Taxpayer identification numbers (TIN) and W-9 verification audits</p>
            </div>

            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search vendor name or TIN..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Vendor / Contractor</th>
                  <th className="py-3 px-4">Entity Type</th>
                  <th className="py-3 px-4">TIN Masked</th>
                  <th className="py-3 px-4">W-9 Form Status</th>
                  <th className="py-3 px-4 text-right">YTD Remittances</th>
                  <th className="py-3 px-4 text-center">1099-NEC Filing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400">
                      No vendor compliance records match your search.
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map(vnd => {
                    const statusBadge: Record<string, string> = {
                      VERIFIED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      PENDING_SIGNATURE: 'bg-amber-50 text-amber-700 border-amber-200',
                      EXPIRED: 'bg-rose-50 text-rose-700 border-rose-200'
                    };

                    return (
                      <tr key={vnd.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {vnd.vendorName}
                          {vnd.w9SignedDate && (
                            <div className="text-[10px] text-slate-400 font-normal">
                              Signed: {vnd.w9SignedDate}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-slate-700">
                          {(vnd.entityType || '').replace(/_/g, ' ')}
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 font-bold">
                          {vnd.tinLast4Masked}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusBadge[vnd.w9Status]}`}>
                            {vnd.w9Status === 'VERIFIED' && <CheckCircle2 className="w-3 h-3" />}
                            {vnd.w9Status === 'PENDING_SIGNATURE' && <Clock className="w-3 h-3" />}
                            {vnd.w9Status === 'EXPIRED' && <AlertCircle className="w-3 h-3" />}
                            <span>{(vnd.w9Status || '').replace(/_/g, ' ')}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                          ${vnd.totalPaymentsYtdUsd.toLocaleString()}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {vnd.is1099Eligible ? (
                            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold">
                              Required ({'>'} $600)
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">Exempt / Under Limit</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADJUST TAX RESERVE */}
      {isReserveModalOpen && selectedQuarter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-mono text-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#132338]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Adjust Q{selectedQuarter.quarter} {selectedQuarter.year} Tax Reserve
                </h3>
              </div>
              <button
                onClick={() => setIsReserveModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReserveAdjustment} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-slate-500 text-[10px]">ESTIMATED TAX DUE:</div>
                <div className="text-lg font-bold text-slate-900">
                  ${selectedQuarter.estimatedTaxDueUsd.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Statutory Due Date: {selectedQuarter.dueDate}</div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Allocated Tax Escrow Reserve ($ USD)
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  value={reserveAmountInput}
                  onChange={e => setReserveAmountInput(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-indigo-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Quarter Status</label>
                <select
                  value={reserveStatusInput}
                  onChange={e => setReserveStatusInput(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                >
                  <option value="ACCRUING">Accruing (In Progress)</option>
                  <option value="FUNDED">Fully Funded in Escrow</option>
                  <option value="FILED_AND_PAID">Filed and Remitted to IRS</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsReserveModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#132338] text-white rounded-xl font-bold shadow-xs hover:bg-[#1e3450]"
                >
                  Save Reserve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTER VENDOR / CONTRACTOR W-9 */}
      {isVendorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-mono text-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#132338]" />
                <h3 className="text-sm font-bold text-slate-900">Register Vendor / 1099 Contractor</h3>
              </div>
              <button
                onClick={() => setIsVendorModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVendor} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Legal Entity / Payee Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sovereign Cryptographic Labs LLC"
                  value={vendorName}
                  onChange={e => setVendorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Entity Classification</label>
                  <select
                    value={entityType}
                    onChange={e => setEntityType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  >
                    <option value="INDIVIDUAL_SOLE_PROP">Individual / Sole Proprietor</option>
                    <option value="SINGLE_MEMBER_LLC">Single-Member LLC</option>
                    <option value="C_CORPORATION">C-Corporation (1099 Exempt)</option>
                    <option value="S_CORPORATION">S-Corporation</option>
                    <option value="PARTNERSHIP">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Tax ID / SSN / EIN</label>
                  <input
                    type="text"
                    required
                    placeholder="12-3456789"
                    value={tinInput}
                    onChange={e => setTinInput(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Form W-9 Status</label>
                  <select
                    value={w9Status}
                    onChange={e => setW9Status(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  >
                    <option value="VERIFIED">Verified & Executed</option>
                    <option value="PENDING_SIGNATURE">Pending Signature</option>
                    <option value="EXPIRED">Expired / Needs Refresh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">YTD Remittance Volume ($)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={ytdPayments}
                    onChange={e => setYtdPayments(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsVendorModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#132338] text-white rounded-xl font-bold shadow-xs hover:bg-[#1e3450]"
                >
                  Register Payee Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
