import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../api/client';
import { Invoice, InvoiceLineItem, InvoiceStatus, InvoicePaymentTerms } from '../../types/billing';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  Plus, 
  Search, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  Trash2, 
  Download, 
  DollarSign, 
  Building2, 
  X,
  Calendar,
  CreditCard,
  Edit3
} from 'lucide-react';

interface CommercialInvoicingWorkspaceProps {
  onInvoiceUpdated?: () => void;
}

export const CommercialInvoicingWorkspace: React.FC<CommercialInvoicingWorkspaceProps> = ({
  onInvoiceUpdated
}) => {
  const { currentOrg, currentBusiness } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | InvoiceStatus>('ALL');
  
  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientTaxId, setClientTaxId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10)
  );
  const [paymentTerms, setPaymentTerms] = useState<InvoicePaymentTerms>('NET_15');
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState<InvoiceStatus>('sent');
  const [discountTotal, setDiscountTotal] = useState<number>(0);
  const [notes, setNotes] = useState('Thank you for your business. Please remit payment by the due date.');
  const [paymentInstructions, setPaymentInstructions] = useState(
    'Wire / ACH: Silicon Valley Bank | Routing: 121140399 | Acct: 9948210394 | Beneficiary: Econos Holdings Inc.'
  );

  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    {
      id: 'li_init_1',
      description: 'Strategic Financial Advisory & Modeling',
      quantity: 1,
      unitPrice: 15000,
      taxRatePct: 0,
      amount: 15000
    }
  ]);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const data = await api.getInvoices();
      setInvoices(data || []);
    } catch (err) {
      console.error('Failed to load commercial invoices', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, [currentOrg?.id]);

  // Payment terms helper
  const handlePaymentTermsChange = (terms: InvoicePaymentTerms) => {
    setPaymentTerms(terms);
    const start = new Date(issueDate || Date.now());
    let daysToAdd = 0;
    if (terms === 'NET_15') daysToAdd = 15;
    else if (terms === 'NET_30') daysToAdd = 30;
    else if (terms === 'NET_60') daysToAdd = 60;
    const computedDue = new Date(start.getTime() + daysToAdd * 86400000).toISOString().slice(0, 10);
    setDueDate(computedDue);
  };

  // Line item handlers
  const handleAddLineItem = () => {
    setLineItems(prev => [
      ...prev,
      {
        id: `li_${Date.now()}_${prev.length}`,
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRatePct: 0,
        amount: 0
      }
    ]);
  };

  const handleUpdateLineItem = (id: string, field: keyof InvoiceLineItem, val: any) => {
    setLineItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: val };
      if (field === 'quantity' || field === 'unitPrice') {
        const qty = Number(field === 'quantity' ? val : item.quantity) || 0;
        const price = Number(field === 'unitPrice' ? val : item.unitPrice) || 0;
        updated.amount = Number((qty * price).toFixed(2));
      }
      return updated;
    }));
  };

  const handleRemoveLineItem = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems(prev => prev.filter(i => i.id !== id));
  };

  // Live Totals calculation
  const computedSubtotal = useMemo(() => {
    return Number(lineItems.reduce((acc, item) => acc + (item.amount || 0), 0).toFixed(2));
  }, [lineItems]);

  const computedTax = useMemo(() => {
    return Number(lineItems.reduce((acc, item) => {
      const taxRate = Number(item.taxRatePct) || 0;
      return acc + (item.amount * (taxRate / 100));
    }, 0).toFixed(2));
  }, [lineItems]);

  const computedGrandTotal = useMemo(() => {
    return Math.max(0, Number((computedSubtotal + computedTax - (Number(discountTotal) || 0)).toFixed(2)));
  }, [computedSubtotal, computedTax, discountTotal]);

  // Open Create Modal
  const openNewInvoiceModal = () => {
    setEditingInvoiceId(null);
    setClientName('');
    setClientEmail('');
    setClientAddress('');
    setClientTaxId('');
    const nextSeq = (invoices.length + 1).toString().padStart(3, '0');
    setInvoiceNumber(`INV-${new Date().getFullYear()}-${nextSeq}`);
    setIssueDate(new Date().toISOString().slice(0, 10));
    setDueDate(new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10));
    setPaymentTerms('NET_15');
    setCurrency('USD');
    setStatus('sent');
    setDiscountTotal(0);
    setLineItems([
      {
        id: `li_${Date.now()}`,
        description: 'Commercial Software & Advisory Services',
        quantity: 1,
        unitPrice: 10000,
        taxRatePct: 0,
        amount: 10000
      }
    ]);
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const openEditInvoiceModal = (inv: Invoice) => {
    setEditingInvoiceId(inv.id);
    setClientName(inv.clientName || '');
    setClientEmail(inv.clientEmail || '');
    setClientAddress(inv.clientAddress || '');
    setClientTaxId(inv.clientTaxId || '');
    setInvoiceNumber(inv.invoiceNumber || '');
    setIssueDate(inv.issueDate || new Date().toISOString().slice(0, 10));
    setDueDate(inv.dueDate || new Date().toISOString().slice(0, 10));
    setPaymentTerms(inv.paymentTerms || 'NET_15');
    setCurrency(inv.currency || 'USD');
    setStatus(inv.status || 'sent');
    setDiscountTotal(inv.discountTotal || 0);
    setNotes(inv.notes || '');
    setPaymentInstructions(inv.paymentInstructions || '');
    setLineItems(
      inv.lineItems && inv.lineItems.length > 0 
        ? inv.lineItems 
        : [{ id: 'li_1', description: 'Consulting Services', quantity: 1, unitPrice: inv.totalAmount || inv.amountPaid || 1000, amount: inv.totalAmount || 1000 }]
    );
    setIsCreateModalOpen(true);
  };

  // Save Invoice (Create or Update)
  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Please enter a client name.');
      return;
    }

    try {
      const payload: Partial<Invoice> = {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientAddress: clientAddress.trim(),
        clientTaxId: clientTaxId.trim(),
        invoiceNumber: invoiceNumber.trim(),
        issueDate,
        dueDate,
        paymentTerms,
        currency,
        status,
        lineItems,
        subtotal: computedSubtotal,
        taxTotal: computedTax,
        discountTotal: Number(discountTotal) || 0,
        totalAmount: computedGrandTotal,
        amountPaid: status === 'paid' ? computedGrandTotal : 0,
        notes,
        paymentInstructions
      };

      if (editingInvoiceId) {
        await api.updateInvoice(editingInvoiceId, payload);
      } else {
        await api.createInvoice(payload);
      }

      await loadInvoices();
      setIsCreateModalOpen(false);
      if (onInvoiceUpdated) onInvoiceUpdated();
    } catch (err: any) {
      alert(err.message || 'Failed to save invoice');
    }
  };

  // Quick Status Toggle
  const handleStatusChange = async (invoiceId: string, newStatus: InvoiceStatus) => {
    try {
      await api.updateInvoiceStatus(invoiceId, newStatus);
      setInvoices(prev => prev.map(inv => {
        if (inv.id === invoiceId) {
          const isPaid = newStatus === 'paid';
          return {
            ...inv,
            status: newStatus,
            amountPaid: isPaid ? (inv.totalAmount || inv.amountPaid) : inv.amountPaid
          };
        }
        return inv;
      }));
      if (onInvoiceUpdated) onInvoiceUpdated();
    } catch (err: any) {
      alert(err.message || 'Failed to update invoice status');
    }
  };

  // Delete Invoice
  const handleDeleteInvoice = async (invoiceId: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    try {
      await api.deleteInvoice(invoiceId);
      setInvoices(prev => prev.filter(i => i.id !== invoiceId));
      if (selectedInvoiceForPrint?.id === invoiceId) {
        setSelectedInvoiceForPrint(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete invoice');
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['Invoice Number', 'Client Name', 'Client Email', 'Issue Date', 'Due Date', 'Status', 'Currency', 'Total Amount', 'Amount Paid'];
    const rows = invoices.map(i => [
      i.invoiceNumber || i.id,
      `"${(i.clientName || 'Direct Client').replace(/"/g, '""')}"`,
      i.clientEmail || '',
      i.issueDate || i.createdAt.slice(0, 10),
      i.dueDate || '',
      i.status,
      i.currency,
      i.totalAmount || i.amountPaid || 0,
      i.amountPaid || 0
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ECONOS_Invoices_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Accounts Receivable Metrics
  const metrics = useMemo(() => {
    const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.totalAmount || inv.amountPaid || 0), 0);
    const totalCollected = invoices.reduce((sum, inv) => sum + (inv.amountPaid || (inv.status === 'paid' ? (inv.totalAmount || 0) : 0)), 0);
    const outstanding = Math.max(0, totalInvoiced - totalCollected);
    const overdueCount = invoices.filter(i => i.status === 'overdue').length;
    const paidCount = invoices.filter(i => i.status === 'paid').length;
    const collectionRate = totalInvoiced > 0 ? ((totalCollected / totalInvoiced) * 100).toFixed(1) : '100.0';

    return {
      totalInvoiced,
      totalCollected,
      outstanding,
      overdueCount,
      paidCount,
      collectionRate
    };
  }, [invoices]);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        (inv.invoiceNumber || '').toLowerCase().includes(q) ||
        (inv.clientName || '').toLowerCase().includes(q) ||
        (inv.clientEmail || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [invoices, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-mono font-medium">Total Invoiced</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            ${metrics.totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <span className="text-[11px] text-slate-500">{invoices.length} total billed invoices</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-mono font-medium">Cash Collected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            ${metrics.totalCollected.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] text-emerald-700 font-medium font-mono">{metrics.collectionRate}% collected</span>
            <span className="text-[10px] text-slate-400">({metrics.paidCount} paid)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-mono font-medium">Outstanding AR</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600">
            ${metrics.outstanding.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <span className="text-[11px] text-slate-500">Pending client remittances</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-mono font-medium">Overdue Balance</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-600">
            {metrics.overdueCount > 0 ? `${metrics.overdueCount} Invoices` : '$0'}
          </div>
          <span className="text-[11px] text-slate-500">
            {metrics.overdueCount > 0 ? 'Requires immediate dunning' : 'Zero past-due invoices'}
          </span>
        </div>
      </div>

      {/* Control & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['ALL', 'sent', 'paid', 'draft', 'overdue'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                statusFilter === tab
                  ? 'bg-[#132338] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab === 'ALL' ? 'All Invoices' : tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client or #..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#132338] focus:bg-white transition"
            />
          </div>

          <button
            onClick={handleExportCsv}
            title="Export CSV"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            id="btn-new-invoice"
            onClick={openNewInvoiceModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs">
            Loading commercial receivables ledger...
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-slate-800">No invoices found</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery ? 'No invoices match your current search filters.' : 'Create your first commercial invoice to start tracking billings and accounts receivable.'}
            </p>
            <button
              onClick={openNewInvoiceModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#132338] text-white text-xs font-mono font-bold shadow-xs hover:bg-[#1c3350] transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Invoice</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Issued</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Total Amount</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredInvoices.map(inv => {
                  const isPaid = inv.status === 'paid';
                  const isOverdue = inv.status === 'overdue';
                  const isDraft = inv.status === 'draft';
                  const isSent = inv.status === 'sent';

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {inv.invoiceNumber || inv.id.slice(0, 10)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800 font-sans">
                          {inv.clientName || 'Direct Client'}
                        </div>
                        {inv.clientEmail && (
                          <div className="text-[11px] text-slate-400 font-mono">
                            {inv.clientEmail}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {inv.issueDate || inv.createdAt.slice(0, 10)}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {inv.dueDate || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isPaid ? 'bg-emerald-100 text-emerald-800' :
                          isOverdue ? 'bg-rose-100 text-rose-800' :
                          isSent ? 'bg-blue-100 text-blue-800' :
                          isDraft ? 'bg-slate-100 text-slate-700' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">
                        ${(inv.totalAmount || inv.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Print / View */}
                          <button
                            onClick={() => setSelectedInvoiceForPrint(inv)}
                            title="Preview & Print PDF"
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Paid Toggle */}
                          {!isPaid ? (
                            <button
                              onClick={() => handleStatusChange(inv.id, 'paid')}
                              title="Mark as Paid"
                              className="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold transition flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Paid</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(inv.id, 'sent')}
                              title="Reopen / Mark as Sent"
                              className="px-2 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-medium transition"
                            >
                              Reopen
                            </button>
                          )}

                          {/* Edit */}
                          <button
                            onClick={() => openEditInvoiceModal(inv)}
                            title="Edit Invoice"
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteInvoice(inv.id)}
                            title="Delete Invoice"
                            className="p-1.5 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT INVOICE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#132338] text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingInvoiceId ? 'Edit Commercial Invoice' : 'Create Commercial Invoice'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculates line items, tax, and registers into accounts receivable ledger.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveInvoice} className="p-5 space-y-6 overflow-y-auto flex-1 font-sans">
              {/* Row 1: Invoice Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
                <div>
                  <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    required
                    value={invoiceNumber}
                    onChange={e => setInvoiceNumber(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={e => handlePaymentTermsChange(e.target.value as InvoicePaymentTerms)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                  >
                    <option value="DUE_ON_RECEIPT">Due on Receipt</option>
                    <option value="NET_15">Net 15 Days</option>
                    <option value="NET_30">Net 30 Days</option>
                    <option value="NET_60">Net 60 Days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">Issue Date</label>
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={e => setIssueDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                  />
                </div>
              </div>

              {/* Row 2: Client Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Client Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Client / Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Global Logistics Corp."
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Client Email Address</label>
                    <input
                      type="email"
                      placeholder="accounts.payable@client.com"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Billing Street Address</label>
                    <input
                      type="text"
                      placeholder="500 Tech Parkway, Suite 400, San Francisco, CA"
                      value={clientAddress}
                      onChange={e => setClientAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Tax / VAT ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="US-EIN 12-3456789 or VAT EU..."
                      value={clientTaxId}
                      onChange={e => setClientTaxId(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Itemized Line Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                    Line Items
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddLineItem}
                    className="flex items-center gap-1 text-xs font-mono text-emerald-600 hover:text-emerald-700 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-2 w-20 text-right">Qty</th>
                        <th className="py-2.5 px-2 w-28 text-right">Unit Price ($)</th>
                        <th className="py-2.5 px-2 w-20 text-right">Tax (%)</th>
                        <th className="py-2.5 px-3 w-28 text-right">Total ($)</th>
                        <th className="py-2.5 px-2 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {lineItems.map(item => (
                        <tr key={item.id}>
                          <td className="p-2">
                            <input
                              type="text"
                              required
                              placeholder="Description of deliverables or service..."
                              value={item.description}
                              onChange={e => handleUpdateLineItem(item.id, 'description', e.target.value)}
                              className="w-full px-2 py-1 text-xs font-sans bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-300 focus:bg-white rounded transition"
                            />
                          </td>
                          <td className="p-2 text-right">
                            <input
                              type="number"
                              min="1"
                              step="1"
                              value={item.quantity}
                              onChange={e => handleUpdateLineItem(item.id, 'quantity', e.target.value)}
                              className="w-full px-1.5 py-1 text-xs text-right font-mono bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-300 focus:bg-white rounded transition"
                            />
                          </td>
                          <td className="p-2 text-right">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={e => handleUpdateLineItem(item.id, 'unitPrice', e.target.value)}
                              className="w-full px-1.5 py-1 text-xs text-right font-mono bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-300 focus:bg-white rounded transition"
                            />
                          </td>
                          <td className="p-2 text-right">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={item.taxRatePct || 0}
                              onChange={e => handleUpdateLineItem(item.id, 'taxRatePct', e.target.value)}
                              className="w-full px-1.5 py-1 text-xs text-right font-mono bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-300 focus:bg-white rounded transition"
                            />
                          </td>
                          <td className="p-2 text-right font-bold text-slate-800">
                            ${(item.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="p-2 text-center">
                            {lineItems.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveLineItem(item.id)}
                                className="text-slate-400 hover:text-rose-500 transition p-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Calculation Summary Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-mono space-y-1">
                    <div>Status upon creation: <span className="font-bold text-slate-700 uppercase">{status}</span></div>
                    <div>Payment Due: <span className="font-bold text-slate-700">{dueDate}</span></div>
                  </div>

                  <div className="w-full sm:w-64 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span>${computedSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {computedTax > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Tax:</span>
                        <span>+${computedTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Discount:</span>
                      <div className="flex items-center gap-1">
                        <span>-$</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={discountTotal}
                          onChange={e => setDiscountTotal(Number(e.target.value))}
                          className="w-16 px-1 py-0.5 text-right text-xs bg-white border border-slate-200 rounded"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-200 pt-1.5">
                      <span>Grand Total:</span>
                      <span className="text-emerald-600">
                        ${computedGrandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Notes & Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Invoice Notes / Terms</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Payment Instructions (Wire / ACH)</label>
                  <textarea
                    rows={2}
                    value={paymentInstructions}
                    onChange={e => setPaymentInstructions(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#132338]"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#132338] hover:bg-[#1c3350] text-white text-xs font-mono font-bold shadow-xs transition"
                >
                  {editingInvoiceId ? 'Save Changes' : 'Issue & Save Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINT / PDF PREVIEW MODAL */}
      {selectedInvoiceForPrint && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto print:max-w-none print:shadow-none print:border-none">
            {/* Header / Actions Bar (Hidden on actual print) */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-mono font-bold text-slate-800">
                  {selectedInvoiceForPrint.invoiceNumber || selectedInvoiceForPrint.id} Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#132338] text-white text-xs font-mono font-bold shadow-xs hover:bg-[#1c3350] transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceForPrint(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actual Printable Invoice Document */}
            <div className="p-8 sm:p-10 font-sans space-y-8 overflow-y-auto bg-white text-slate-800" id="printable-invoice">
              {/* Top Banner: Issuer vs Invoice # */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-[#132338] text-white flex items-center justify-center font-black font-mono text-sm">
                      E
                    </div>
                    <span className="text-lg font-black tracking-tight text-slate-900">
                      {currentBusiness?.name || currentOrg?.name || 'ECONOS HOLDINGS INC.'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Commercial & Financial Systems</p>
                  <p className="text-xs text-slate-500">finance@{currentOrg?.slug || 'econos'}.internal</p>
                </div>

                <div className="text-right">
                  <h2 className="text-2xl font-black text-slate-900 font-mono tracking-tight">INVOICE</h2>
                  <div className="text-xs font-mono text-slate-500 mt-1">
                    #{selectedInvoiceForPrint.invoiceNumber || selectedInvoiceForPrint.id}
                  </div>
                  <div className="inline-block mt-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      selectedInvoiceForPrint.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                      selectedInvoiceForPrint.status === 'overdue' ? 'bg-rose-100 text-rose-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      STATUS: {selectedInvoiceForPrint.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Billed To vs Dates */}
              <div className="grid grid-cols-2 gap-8 text-xs">
                <div>
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-400 mb-1">BILLED TO:</div>
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedInvoiceForPrint.clientName || 'Direct Client'}
                  </div>
                  {selectedInvoiceForPrint.clientEmail && (
                    <div className="text-slate-600 mt-0.5">{selectedInvoiceForPrint.clientEmail}</div>
                  )}
                  {selectedInvoiceForPrint.clientAddress && (
                    <div className="text-slate-500 mt-0.5 whitespace-pre-line">{selectedInvoiceForPrint.clientAddress}</div>
                  )}
                  {selectedInvoiceForPrint.clientTaxId && (
                    <div className="font-mono text-slate-500 mt-1">Tax ID: {selectedInvoiceForPrint.clientTaxId}</div>
                  )}
                </div>

                <div className="space-y-1.5 text-right font-mono">
                  <div>
                    <span className="text-slate-400">Issue Date: </span>
                    <span className="font-bold text-slate-800">
                      {selectedInvoiceForPrint.issueDate || selectedInvoiceForPrint.createdAt.slice(0, 10)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Due Date: </span>
                    <span className="font-bold text-slate-800">
                      {selectedInvoiceForPrint.dueDate || 'Upon Receipt'}
                    </span>
                  </div>
                  {selectedInvoiceForPrint.paymentTerms && (
                    <div>
                      <span className="text-slate-400">Terms: </span>
                      <span className="font-bold text-slate-800">
                        {(selectedInvoiceForPrint.paymentTerms || '').replace('_', ' ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 text-right">Qty</th>
                      <th className="py-2.5 px-3 text-right">Rate</th>
                      <th className="py-2.5 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {(selectedInvoiceForPrint.lineItems && selectedInvoiceForPrint.lineItems.length > 0 
                      ? selectedInvoiceForPrint.lineItems 
                      : [{ id: '1', description: 'Enterprise Retainer', quantity: 1, unitPrice: selectedInvoiceForPrint.totalAmount || selectedInvoiceForPrint.amountPaid, amount: selectedInvoiceForPrint.totalAmount || selectedInvoiceForPrint.amountPaid }]
                    ).map((li, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-3 font-sans font-medium text-slate-800">{li.description}</td>
                        <td className="py-3 px-3 text-right text-slate-600">{li.quantity}</td>
                        <td className="py-3 px-3 text-right text-slate-600">
                          ${(li.unitPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-slate-900">
                          ${(li.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Subtotal & Balance */}
              <div className="flex justify-end text-xs font-mono">
                <div className="w-64 space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>${(selectedInvoiceForPrint.subtotal || selectedInvoiceForPrint.totalAmount || selectedInvoiceForPrint.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {Boolean(selectedInvoiceForPrint.taxTotal && selectedInvoiceForPrint.taxTotal > 0) && (
                    <div className="flex justify-between text-slate-600">
                      <span>Tax:</span>
                      <span>+${(selectedInvoiceForPrint.taxTotal || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {Boolean(selectedInvoiceForPrint.discountTotal && selectedInvoiceForPrint.discountTotal > 0) && (
                    <div className="flex justify-between text-slate-600">
                      <span>Discount:</span>
                      <span>-${(selectedInvoiceForPrint.discountTotal || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-200 pt-2">
                    <span>Total Due:</span>
                    <span className="text-emerald-700">
                      ${(selectedInvoiceForPrint.totalAmount || selectedInvoiceForPrint.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  {selectedInvoiceForPrint.status === 'paid' && (
                    <div className="flex justify-between text-xs font-bold text-emerald-600 border-t border-dashed border-emerald-200 pt-1">
                      <span>Paid in Full:</span>
                      <span>-${(selectedInvoiceForPrint.amountPaid || selectedInvoiceForPrint.totalAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes & Wire Instructions */}
              <div className="border-t border-slate-200 pt-6 space-y-3 text-xs">
                {selectedInvoiceForPrint.notes && (
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-0.5">NOTES:</span>
                    <p className="text-slate-600">{selectedInvoiceForPrint.notes}</p>
                  </div>
                )}
                {selectedInvoiceForPrint.paymentInstructions && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 font-mono text-[11px]">
                    <span className="font-bold text-slate-700 block mb-0.5">PAYMENT INSTRUCTIONS:</span>
                    <p className="text-slate-600">{selectedInvoiceForPrint.paymentInstructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
