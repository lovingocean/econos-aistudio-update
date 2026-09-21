import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../api/client';
import { TreasuryAccount, BankTransaction } from '../../types/commercial-ops';
import { useAuth } from '../../context/AuthContext';
import {
  Landmark,
  ArrowLeftRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Filter,
  DollarSign,
  Building,
  RefreshCw,
  X,
  ShieldCheck,
  CreditCard,
  Layers,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

export const CommercialTreasuryWorkspace: React.FC = () => {
  const { currentOrg } = useAuth();
  const [accounts, setAccounts] = useState<TreasuryAccount[]>([]);
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNRECONCILED' | 'RECONCILED'>('ALL');
  const [notification, setNotification] = useState<string | null>(null);

  // Transfer Funds Modal State
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [transferAmount, setTransferAmount] = useState<number>(10000);
  const [transferMemo, setTransferMemo] = useState('Operating liquidity rebalancing sweep');
  const [transferError, setTransferError] = useState<string | null>(null);

  // Reconcile Modal State
  const [selectedTxForReconcile, setSelectedTxForReconcile] = useState<BankTransaction | null>(null);
  const [reconcileType, setReconcileType] = useState<'INVOICE' | 'EXPENSE' | 'SWEEP'>('INVOICE');
  const [reconcileRefId, setReconcileRefId] = useState('');

  const loadTreasuryData = async () => {
    try {
      setLoading(true);
      const [accRes, txRes] = await Promise.all([
        api.getTreasuryAccounts().catch(() => []),
        api.getBankTransactions().catch(() => [])
      ]);
      setAccounts(accRes || []);
      setTransactions(txRes || []);
    } catch (err) {
      console.error('Failed to load treasury data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTreasuryData();
  }, [currentOrg?.id]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // KPIs
  const totalLiquidityUsd = useMemo(() => {
    return accounts.reduce((acc, a) => acc + a.currentBalanceUsd, 0);
  }, [accounts]);

  const annualInterestYieldUsd = useMemo(() => {
    return Math.round(
      accounts.reduce((acc, a) => {
        return acc + a.currentBalanceUsd * (a.yieldRateApyPct / 100);
      }, 0)
    );
  }, [accounts]);

  const totalUnreconciledCount = useMemo(() => {
    return transactions.filter(t => t.status === 'UNRECONCILED').length;
  }, [transactions]);

  // Open Transfer Modal
  const handleOpenTransferModal = () => {
    if (accounts.length >= 2) {
      setFromAccountId(accounts[0].id);
      setToAccountId(accounts[1].id);
    } else if (accounts.length === 1) {
      setFromAccountId(accounts[0].id);
      setToAccountId(accounts[0].id);
    }
    setTransferAmount(15000);
    setTransferMemo('Weekly corporate liquidity sweep');
    setTransferError(null);
    setIsTransferModalOpen(true);
  };

  const handleExecuteTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError(null);

    if (fromAccountId === toAccountId) {
      setTransferError('Origin and destination accounts must be distinct.');
      return;
    }

    const sourceAcc = accounts.find(a => a.id === fromAccountId);
    if (!sourceAcc || sourceAcc.availableBalanceUsd < transferAmount) {
      setTransferError(`Insufficient available balance in ${sourceAcc?.accountName || 'source account'}.`);
      return;
    }

    try {
      const res = await api.transferTreasuryFunds({
        fromAccountId,
        toAccountId,
        amountUsd: Number(transferAmount),
        memo: transferMemo.trim()
      });

      if (!res.success) {
        setTransferError(res.error || 'Transfer failed');
        return;
      }

      setIsTransferModalOpen(false);
      await loadTreasuryData();
      showToast(`Transferred $${transferAmount.toLocaleString()} successfully. Double-entry bank records generated.`);
    } catch (err: any) {
      setTransferError(err.message || 'Transfer failed');
    }
  };

  // Execute Reconcile
  const handleOpenReconcileModal = (tx: BankTransaction) => {
    setSelectedTxForReconcile(tx);
    if (tx.amount > 0) {
      setReconcileType('INVOICE');
      setReconcileRefId('INV-2026-001');
    } else if (tx.category === 'INTERNAL_SWEEP') {
      setReconcileType('SWEEP');
      setReconcileRefId('SWEEP-TX-MATCH');
    } else {
      setReconcileType('EXPENSE');
      setReconcileRefId('EXP-2026-AWS');
    }
  };

  const handleExecuteReconcile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTxForReconcile) return;

    try {
      await api.reconcileBankTransaction(selectedTxForReconcile.id, {
        matchedReferenceType: reconcileType,
        matchedReferenceId: reconcileRefId.trim() || undefined
      });

      setSelectedTxForReconcile(null);
      await loadTreasuryData();
      showToast(`Transaction "${selectedTxForReconcile.description}" successfully reconciled against ${reconcileType}.`);
    } catch (err: any) {
      alert(err.message || 'Failed to reconcile transaction');
    }
  };

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchAccount = selectedAccountId === 'ALL' || tx.accountId === selectedAccountId;
      const matchStatus = statusFilter === 'ALL' || tx.status === statusFilter;
      const matchQuery =
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tx.matchedReferenceId && tx.matchedReferenceId.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchAccount && matchStatus && matchQuery;
    });
  }, [transactions, selectedAccountId, statusFilter, searchQuery]);

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

      {/* Treasury KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Consolidated Treasury Liquidity</span>
            <Landmark className="w-4 h-4 text-[#132338]" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            ${totalLiquidityUsd.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Across {accounts.length} institutionally backed accounts
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Annualized Yield Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            +${annualInterestYieldUsd.toLocaleString()} / yr
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Generated via high-yield sweeps (up to 4.95% APY)
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Unreconciled Bank Items</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600">
            {totalUnreconciledCount} Transactions
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Awaiting double-entry invoice/expense pairing
          </p>
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {accounts.map(acc => {
          const typeBadge: Record<string, string> = {
            CHECKING: 'bg-blue-50 text-blue-700 border-blue-200',
            HIGH_YIELD_SAVINGS: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            TREASURY_ESCROW: 'bg-purple-50 text-purple-700 border-purple-200',
            STAGING: 'bg-slate-100 text-slate-700 border-slate-200'
          };

          return (
            <div
              key={acc.id}
              className={`bg-white p-5 rounded-2xl border transition shadow-xs ${
                selectedAccountId === acc.id
                  ? 'border-[#132338] ring-1 ring-[#132338]'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-xs font-bold font-mono text-slate-900">{acc.accountName}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">{acc.institutionName} •••• {acc.accountNumberLast4}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold border ${typeBadge[acc.accountType]}`}>
                  {(acc.accountType || '').replace(/_/g, ' ')}
                </span>
              </div>

              <div className="mt-4 space-y-1 font-mono">
                <div className="text-xs text-slate-500">Available Balance:</div>
                <div className="text-xl font-bold text-slate-900">
                  ${acc.availableBalanceUsd.toLocaleString()}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1 text-slate-600">
                  <span>APY:</span>
                  <span className="font-bold text-emerald-600">{acc.yieldRateApyPct}%</span>
                </div>
                {acc.unreconciledItemsCount > 0 ? (
                  <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-semibold">
                    {acc.unreconciledItemsCount} to reconcile
                  </span>
                ) : (
                  <span className="text-emerald-600 flex items-center gap-1 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> Reconciled
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Bank Feed & Actions Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold font-mono text-slate-900">Live Bank Feeds & Double-Entry Ledger</h3>
            <p className="text-xs text-slate-500 font-mono">Real-time ACH, wires, and internal sweeping transaction feed</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenTransferModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#132338] hover:bg-[#1e3450] text-white text-xs font-mono font-medium transition shadow-xs"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Transfer / Sweep Funds</span>
            </button>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search transactions, memo, or match..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedAccountId}
              onChange={e => setSelectedAccountId(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Treasury Accounts</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.accountName} (•••• {acc.accountNumberLast4})
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNRECONCILED">Unreconciled Only</option>
              <option value="RECONCILED">Reconciled</option>
            </select>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Account</th>
                <th className="py-3 px-4">Transaction Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4">Reconciliation Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No transactions matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(tx => {
                  const isCredit = tx.amount > 0;
                  const acc = accounts.find(a => a.id === tx.accountId);

                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-4 text-slate-500">{tx.date}</td>

                      <td className="py-3.5 px-4 text-slate-800">
                        <div className="font-medium">{acc?.accountName || 'Primary Account'}</div>
                        <div className="text-[10px] text-slate-400">•••• {acc?.accountNumberLast4 || '0000'}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900">{tx.description}</div>
                        {tx.matchedReferenceId && (
                          <div className="text-[10px] text-purple-600 mt-0.5">
                            Matched to {tx.matchedReferenceType}: {tx.matchedReferenceId}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {(tx.category || '').replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold">
                        <span className={isCredit ? 'text-emerald-600' : 'text-slate-900'}>
                          {isCredit ? '+' : ''}${tx.amount.toLocaleString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {tx.status === 'RECONCILED' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Reconciled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-amber-200">
                            <Clock className="w-3 h-3" /> Unreconciled
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {tx.status === 'UNRECONCILED' ? (
                          <button
                            onClick={() => handleOpenReconcileModal(tx)}
                            className="px-2.5 py-1 bg-[#132338] text-white hover:bg-[#1e3450] rounded-lg text-[10px] font-bold transition shadow-xs"
                          >
                            Reconcile
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
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

      {/* MODAL: TRANSFER / SWEEP FUNDS */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden font-mono text-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-[#132338]" />
                <h3 className="text-sm font-bold text-slate-900">Transfer & Sweep Treasury Liquidity</h3>
              </div>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="p-6 space-y-4">
              {transferError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{transferError}</span>
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-medium mb-1">Source Account (Origin)</label>
                <select
                  value={fromAccountId}
                  onChange={e => setFromAccountId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                >
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.accountName} — Available: ${acc.availableBalanceUsd.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Destination Account</label>
                <select
                  value={toAccountId}
                  onChange={e => setToAccountId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                >
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.accountName} (APY: {acc.yieldRateApyPct}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Transfer Amount ($ USD)</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={transferAmount}
                  onChange={e => setTransferAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-base font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Audit Ledger Memo</label>
                <input
                  type="text"
                  required
                  value={transferMemo}
                  onChange={e => setTransferMemo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#132338] text-white rounded-xl font-bold shadow-xs hover:bg-[#1e3450]"
                >
                  Execute Sweep
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECONCILE TRANSACTION */}
      {selectedTxForReconcile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden font-mono text-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Reconcile Bank Transaction</h3>
              </div>
              <button
                onClick={() => setSelectedTxForReconcile(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteReconcile} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-500 text-[10px]">TRANSACTION DETAILS</div>
                <div className="font-bold text-slate-900 mt-1">{selectedTxForReconcile.description}</div>
                <div className="text-emerald-700 font-bold mt-0.5">
                  {selectedTxForReconcile.amount > 0 ? '+' : ''}${selectedTxForReconcile.amount.toLocaleString()} ({selectedTxForReconcile.date})
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Match Against Ledger Reference</label>
                <select
                  value={reconcileType}
                  onChange={e => setReconcileType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="INVOICE">Customer Invoice (Accounts Receivable)</option>
                  <option value="EXPENSE">Operating Expense (Accounts Payable)</option>
                  <option value="SWEEP">Internal Treasury Sweep / Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Reference ID / Voucher #</label>
                <input
                  type="text"
                  placeholder="e.g. INV-2026-001 or EXP-9821"
                  value={reconcileRefId}
                  onChange={e => setReconcileRefId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedTxForReconcile(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Confirm Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
