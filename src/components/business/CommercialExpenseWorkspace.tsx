import React, { useState, useEffect, useMemo } from 'react';
import { 
  Expense, 
  ExpenseCategory, 
  ExpenseStatus, 
  ExpensePaymentMethod 
} from '../../types/billing';
import { econosApi } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  X, 
  FileText, 
  Calendar, 
  Building2, 
  CreditCard, 
  Send, 
  ShieldCheck, 
  Trash2, 
  Edit3,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Tag,
  Ban
} from 'lucide-react';

interface CommercialExpenseWorkspaceProps {
  onExpenseUpdated?: () => void;
}

const CATEGORY_CONFIG: Record<ExpenseCategory, { label: string; color: string; border: string; bg: string }> = {
  SOFTWARE_SAAS: { 
    label: 'Software & Cloud SaaS', 
    color: 'text-sky-700', 
    border: 'border-sky-200', 
    bg: 'bg-sky-50' 
  },
  PAYROLL_CONTRACTORS: { 
    label: 'Payroll & Contractors', 
    color: 'text-purple-700', 
    border: 'border-purple-200', 
    bg: 'bg-purple-50' 
  },
  MARKETING_ADS: { 
    label: 'Marketing & Growth', 
    color: 'text-amber-700', 
    border: 'border-amber-200', 
    bg: 'bg-amber-50' 
  },
  OFFICE_FACILITIES: { 
    label: 'Facilities & Office', 
    color: 'text-emerald-700', 
    border: 'border-emerald-200', 
    bg: 'bg-emerald-50' 
  },
  LEGAL_COMPLIANCE: { 
    label: 'Legal & Compliance', 
    color: 'text-rose-700', 
    border: 'border-rose-200', 
    bg: 'bg-rose-50' 
  },
  HARDWARE_EQUIPMENT: { 
    label: 'Hardware & Compute', 
    color: 'text-indigo-700', 
    border: 'border-indigo-200', 
    bg: 'bg-indigo-50' 
  },
  TRAVEL_MEALS: { 
    label: 'Travel & Relations', 
    color: 'text-teal-700', 
    border: 'border-teal-200', 
    bg: 'bg-teal-50' 
  },
  OTHER: { 
    label: 'General Operations', 
    color: 'text-slate-700', 
    border: 'border-slate-200', 
    bg: 'bg-slate-50' 
  }
};

const PAYMENT_METHOD_LABELS: Record<ExpensePaymentMethod, string> = {
  corporate_card: 'Corporate Card',
  ach_wire: 'ACH / Wire Transfer',
  check: 'Commercial Check',
  reimbursement: 'Founder Reimbursement'
};

export const CommercialExpenseWorkspace: React.FC<CommercialExpenseWorkspaceProps> = ({ 
  onExpenseUpdated 
}) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | ExpenseStatus>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | ExpenseCategory>('ALL');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [selectedExpenseForDetail, setSelectedExpenseForDetail] = useState<Expense | null>(null);

  // Form State
  const [formVendorName, setFormVendorName] = useState('');
  const [formCategory, setFormCategory] = useState<ExpenseCategory>('SOFTWARE_SAAS');
  const [formDescription, setFormDescription] = useState('');
  const [formInvoiceNumber, setFormInvoiceNumber] = useState('');
  const [formAmount, setFormAmount] = useState<number | ''>('');
  const [formIssueDate, setFormIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [formDueDate, setFormDueDate] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10)
  );
  const [formPaymentMethod, setFormPaymentMethod] = useState<ExpensePaymentMethod>('corporate_card');
  const [formStatus, setFormStatus] = useState<ExpenseStatus>('pending_approval');
  const [formNotes, setFormNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await econosApi.getExpenses();
      setExpenses(data || []);
    } catch (err: any) {
      console.error('Failed to load expenses', err);
      setError(err.message || 'Unable to retrieve expense records.');
    } finally {
      setLoading(false);
    }
  };

  // Metrics calculation
  const metrics = useMemo(() => {
    const totalSpent = expenses
      .filter(e => e.status === 'paid')
      .reduce((sum, e) => sum + e.amount, 0);

    const pendingApproval = expenses
      .filter(e => e.status === 'pending_approval')
      .reduce((sum, e) => sum + e.amount, 0);

    const pendingCount = expenses.filter(e => e.status === 'pending_approval').length;

    const approvedPayable = expenses
      .filter(e => e.status === 'approved')
      .reduce((sum, e) => sum + e.amount, 0);

    const nowStr = new Date().toISOString().slice(0, 10);
    const overdueCount = expenses.filter(
      e => e.status !== 'paid' && e.status !== 'rejected' && e.dueDate < nowStr
    ).length;

    return {
      totalSpent,
      pendingApproval,
      pendingCount,
      approvedPayable,
      overdueCount,
      totalRecords: expenses.length
    };
  }, [expenses]);

  // Filtered expenses list
  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      // Status
      if (statusFilter !== 'ALL' && e.status !== statusFilter) return false;
      // Category
      if (categoryFilter !== 'ALL' && e.category !== categoryFilter) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const vendor = e.vendorName.toLowerCase();
        const desc = (e.description || '').toLowerCase();
        const inv = (e.invoiceNumber || '').toLowerCase();
        const notes = (e.notes || '').toLowerCase();
        if (!vendor.includes(q) && !desc.includes(q) && !inv.includes(q) && !notes.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [expenses, statusFilter, categoryFilter, searchQuery]);

  const handleOpenCreateModal = (exp?: Expense) => {
    if (exp) {
      setEditingExpense(exp);
      setFormVendorName(exp.vendorName);
      setFormCategory(exp.category);
      setFormDescription(exp.description);
      setFormInvoiceNumber(exp.invoiceNumber || '');
      setFormAmount(exp.amount);
      setFormIssueDate(exp.issueDate);
      setFormDueDate(exp.dueDate);
      setFormPaymentMethod(exp.paymentMethod);
      setFormStatus(exp.status);
      setFormNotes(exp.notes || '');
    } else {
      setEditingExpense(null);
      setFormVendorName('');
      setFormCategory('SOFTWARE_SAAS');
      setFormDescription('');
      setFormInvoiceNumber(`BILL-${Date.now().toString().slice(-4)}`);
      setFormAmount('');
      setFormIssueDate(new Date().toISOString().slice(0, 10));
      setFormDueDate(new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10));
      setFormPaymentMethod('corporate_card');
      setFormStatus('pending_approval');
      setFormNotes('');
    }
    setIsCreateModalOpen(true);
  };

  const handleSaveExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formVendorName.trim() || !formAmount || Number(formAmount) <= 0) {
      alert('Please provide a valid vendor name and positive expense amount.');
      return;
    }

    try {
      setSubmitting(true);
      const payload: Partial<Expense> = {
        vendorName: formVendorName.trim(),
        category: formCategory,
        description: formDescription.trim() || 'Vendor operational bill',
        invoiceNumber: formInvoiceNumber.trim(),
        amount: Number(formAmount),
        currency: 'USD',
        issueDate: formIssueDate,
        dueDate: formDueDate,
        paymentMethod: formPaymentMethod,
        status: formStatus,
        notes: formNotes.trim()
      };

      if (editingExpense) {
        await econosApi.updateExpense(editingExpense.id, payload);
      } else {
        await econosApi.createExpense(payload);
      }

      await loadExpenses();
      setIsCreateModalOpen(false);
      if (onExpenseUpdated) onExpenseUpdated();
    } catch (err: any) {
      console.error('Failed to save expense', err);
      alert(err.message || 'Error saving expense record.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (
    id: string, 
    newStatus: ExpenseStatus, 
    approverName?: string
  ) => {
    try {
      await econosApi.updateExpenseStatus(id, newStatus, approverName || user?.name);
      await loadExpenses();
      if (onExpenseUpdated) onExpenseUpdated();
      if (selectedExpenseForDetail && selectedExpenseForDetail.id === id) {
        setSelectedExpenseForDetail(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      console.error('Status update failed', err);
      alert(err.message || 'Failed to update expense status.');
    }
  };

  const handleDeleteExpense = async (id: string, vendorName: string) => {
    if (!confirm(`Are you sure you want to delete the expense for ${vendorName}?`)) {
      return;
    }
    try {
      await econosApi.deleteExpense(id);
      await loadExpenses();
      if (selectedExpenseForDetail?.id === id) {
        setSelectedExpenseForDetail(null);
      }
      if (onExpenseUpdated) onExpenseUpdated();
    } catch (err: any) {
      console.error('Delete expense failed', err);
      alert(err.message || 'Failed to delete expense.');
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Vendor Name',
      'Category',
      'Invoice / Bill #',
      'Description',
      'Amount (USD)',
      'Status',
      'Payment Method',
      'Issue Date',
      'Due Date',
      'Approved By',
      'Notes'
    ];

    const rows = filteredExpenses.map(e => [
      e.id,
      `"${(e.vendorName || '').replace(/"/g, '""')}"`,
      e.category,
      `"${(e.invoiceNumber || '').replace(/"/g, '""')}"`,
      `"${(e.description || '').replace(/"/g, '""')}"`,
      e.amount.toFixed(2),
      e.status,
      e.paymentMethod,
      e.issueDate,
      e.dueDate,
      `"${(e.approvedBy || '').replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ECONOS_Accounts_Payable_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
            <span>Business Layer</span>
            <ChevronRight className="w-3 h-3" />
            <span>Outflow Ledger</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-rose-600 font-bold">Accounts Payable (AP)</span>
          </div>
          <h2 className="text-xl font-bold font-serif text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="w-5 h-5 text-rose-600" />
            Commercial Expense Management & Accounts Payable
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Authorize corporate vendor bills, track software licenses, contractor disbursements, and maintain strict multi-tier spending governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-export-expenses-csv"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-mono font-medium hover:bg-slate-50 transition shadow-2xs"
            title="Export full accounts payable ledger to CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            id="btn-new-expense"
            onClick={() => handleOpenCreateModal()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 text-white rounded-lg text-xs font-mono font-bold hover:bg-rose-700 transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Record Expense / Bill</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Paid YTD */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Settled Disbursements</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            ${metrics.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-700 font-mono mt-1 flex items-center gap-1">
            <span>Verified and fully settled disbursements</span>
          </div>
        </div>

        {/* Pending Approval */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Pending Sign-off</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-700">
            ${metrics.pendingApproval.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-amber-800 font-mono mt-1">
            {metrics.pendingCount} {metrics.pendingCount === 1 ? 'bill' : 'bills'} awaiting executive review
          </div>
        </div>

        {/* Approved Payable */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Approved for Payment</span>
            <DollarSign className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-sky-800">
            ${metrics.approvedPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-sky-700 font-mono mt-1">
            Scheduled for wire or card execution
          </div>
        </div>

        {/* Critical Overdue / Attention */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Overdue Alerts</span>
            <AlertTriangle className={`w-4 h-4 ${metrics.overdueCount > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className={`text-2xl font-bold font-mono ${metrics.overdueCount > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
            {metrics.overdueCount}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">
            {metrics.overdueCount > 0 ? 'Past contractual payment date' : 'All vendor terms in healthy standing'}
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {(['ALL', 'pending_approval', 'approved', 'paid', 'rejected'] as const).map(status => {
              const count = status === 'ALL' 
                ? expenses.length 
                : expenses.filter(e => e.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition ${
                    statusFilter === status
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {status === 'ALL' && `All Records (${count})`}
                  {status === 'pending_approval' && `Pending Approval (${count})`}
                  {status === 'approved' && `Approved (${count})`}
                  {status === 'paid' && `Paid (${count})`}
                  {status === 'rejected' && `Rejected (${count})`}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search vendor, bill # or description..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
            <Tag className="w-3 h-3" /> Category:
          </span>
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition ${
              categoryFilter === 'ALL' 
                ? 'bg-slate-200 text-slate-800 font-bold' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {(Object.keys(CATEGORY_CONFIG) as ExpenseCategory[]).map(cat => {
            const conf = CATEGORY_CONFIG[cat];
            const isSelected = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(isSelected ? 'ALL' : cat)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition border ${
                  isSelected 
                    ? `${conf.bg} ${conf.color} ${conf.border} font-bold` 
                    : 'border-transparent text-slate-600 hover:bg-slate-100'
                }`}
              >
                {conf.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expenses Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-mono text-xs">
            Loading commercial expense ledger...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-600 font-mono text-xs">
            {error}
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Receipt className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold font-serif text-slate-700">No matching vendor expenses found</h3>
            <p className="text-xs text-slate-500 font-mono max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL' 
                ? 'Try resetting the filters or clearing the search query.' 
                : 'Record your first operational bill, cloud vendor subscription, or contractor payment.'}
            </p>
            <button
              onClick={() => handleOpenCreateModal()}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-mono font-bold hover:bg-rose-700 transition"
            >
              + Record Vendor Expense
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase text-slate-500">
                  <th className="py-3 px-4">Vendor & Bill #</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-mono">
                {filteredExpenses.map(exp => {
                  const catConfig = CATEGORY_CONFIG[exp.category] || CATEGORY_CONFIG.OTHER;
                  const isOverdue = exp.status !== 'paid' && exp.status !== 'rejected' && exp.dueDate < new Date().toISOString().slice(0, 10);
                  
                  return (
                    <tr key={exp.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{exp.vendorName}</div>
                        <div className="text-[10px] text-slate-500">{exp.invoiceNumber || 'No ref'}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${catConfig.bg} ${catConfig.color} ${catConfig.border}`}>
                          {catConfig.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="text-slate-800 truncate" title={exp.description}>
                          {exp.description}
                        </div>
                        {exp.approvedBy && (
                          <div className="text-[10px] text-emerald-700 mt-0.5 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Signed by {exp.approvedBy}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {PAYMENT_METHOD_LABELS[exp.paymentMethod] || exp.paymentMethod}
                      </td>
                      <td className="py-3 px-4">
                        <div className={`text-[11px] ${isOverdue ? 'text-rose-600 font-bold' : 'text-slate-600'}`}>
                          {exp.dueDate}
                        </div>
                        {isOverdue && (
                          <span className="text-[9px] text-rose-600 uppercase font-bold flex items-center gap-0.5">
                            <AlertTriangle className="w-2.5 h-2.5" /> Overdue
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">
                        ${exp.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {exp.status === 'paid' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Paid
                          </span>
                        )}
                        {exp.status === 'approved' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                            <ShieldCheck className="w-2.5 h-2.5" /> Approved
                          </span>
                        )}
                        {exp.status === 'pending_approval' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-2.5 h-2.5" /> Pending
                          </span>
                        )}
                        {exp.status === 'rejected' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <Ban className="w-2.5 h-2.5" /> Rejected
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Approval button if pending */}
                          {exp.status === 'pending_approval' && (
                            <button
                              onClick={() => handleUpdateStatus(exp.id, 'approved')}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition flex items-center gap-1"
                              title="Authorize and approve this expenditure"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                          )}

                          {/* Pay button if approved */}
                          {exp.status === 'approved' && (
                            <button
                              onClick={() => handleUpdateStatus(exp.id, 'paid')}
                              className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-[10px] font-bold transition flex items-center gap-1"
                              title="Mark as settled & paid"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Pay</span>
                            </button>
                          )}

                          {/* Quick Edit */}
                          <button
                            onClick={() => handleOpenCreateModal(exp)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition"
                            title="Edit bill"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteExpense(exp.id, exp.vendorName)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition"
                            title="Delete record"
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

      {/* Record / Edit Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-bold font-serif text-slate-900">
                  {editingExpense ? 'Edit Commercial Expense' : 'Record New Vendor Bill / Expense'}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="p-5 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vendor Name */}
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Vendor / Entity Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AWS Cloud, Cooley LLP"
                    value={formVendorName}
                    onChange={e => setFormVendorName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Expense Category *</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as ExpenseCategory)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                  >
                    {(Object.keys(CATEGORY_CONFIG) as ExpenseCategory[]).map(cat => (
                      <option key={cat} value={cat}>
                        {CATEGORY_CONFIG[cat].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-slate-600 font-medium">Description / Deliverable</label>
                <input
                  type="text"
                  placeholder="e.g. GPU Compute Cluster, Monthly SaaS License"
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Amount */}
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Amount (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      min="0.01"
                      placeholder="0.00"
                      value={formAmount}
                      onChange={e => setFormAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                </div>

                {/* Invoice Ref # */}
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Invoice / Ref #</label>
                  <input
                    type="text"
                    placeholder="INV-9901"
                    value={formInvoiceNumber}
                    onChange={e => setFormInvoiceNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Payment Method</label>
                  <select
                    value={formPaymentMethod}
                    onChange={e => setFormPaymentMethod(e.target.value as ExpensePaymentMethod)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                  >
                    <option value="corporate_card">Corporate Card</option>
                    <option value="ach_wire">ACH / Wire</option>
                    <option value="check">Commercial Check</option>
                    <option value="reimbursement">Founder Reimbursement</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Issue Date */}
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Bill Issue Date</label>
                  <input
                    type="date"
                    value={formIssueDate}
                    onChange={e => setFormIssueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                {/* Due Date */}
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Payment Due Date</label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={e => setFormDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium">Status</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as ExpenseStatus)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                  >
                    <option value="pending_approval">Pending Approval</option>
                    <option value="approved">Approved</option>
                    <option value="paid">Paid & Settled</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-slate-600 font-medium">Internal Notes & GL Allocation</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Card ending 4920, allocated to Q3 R&D compute budget..."
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
                />
              </div>

              {/* Threshold policy callout */}
              {Number(formAmount) > 3000 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sovereign Threshold Policy:</strong> Expenses exceeding $3,000.00 will record an immutable authorization audit log with the approving executive's signature.
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-mono hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-mono font-bold hover:bg-rose-700 transition disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingExpense ? 'Save Changes' : 'Record Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
