import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../api/client';
import { RateCardItem, ContractQuote, ContractQuoteItem } from '../../types/commercial-ops';
import { useAuth } from '../../context/AuthContext';
import {
  Tag,
  FileSpreadsheet,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  X,
  Trash2,
  Edit2,
  ExternalLink,
  DollarSign,
  Layers,
  Send,
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';

interface CommercialPricingWorkspaceProps {
  onNavigateToInvoices?: () => void;
}

export const CommercialPricingWorkspace: React.FC<CommercialPricingWorkspaceProps> = ({
  onNavigateToInvoices
}) => {
  const { currentOrg } = useAuth();
  const [activeSubView, setActiveSubView] = useState<'QUOTES' | 'RATE_CARDS'>('QUOTES');
  const [rateCards, setRateCards] = useState<RateCardItem[]>([]);
  const [quotes, setQuotes] = useState<ContractQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Quote Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [contractTermMonths, setContractTermMonths] = useState<number>(12);
  const [slaTier, setSlaTier] = useState<ContractQuote['slaTier']>('ENTERPRISE_99_99');
  const [quoteDiscountPct, setQuoteDiscountPct] = useState<number>(0);
  const [quoteItems, setQuoteItems] = useState<Array<{
    rateCardId: string;
    name: string;
    quantity: number;
    unitPriceUsd: number;
    discountPct: number;
  }>>([]);
  const [quoteNotes, setQuoteNotes] = useState('');

  // Rate Card Modal State
  const [isRateCardModalOpen, setIsRateCardModalOpen] = useState(false);
  const [editingRateCardId, setEditingRateCardId] = useState<string | null>(null);
  const [rcName, setRcName] = useState('');
  const [rcCategory, setRcCategory] = useState<RateCardItem['category']>('SUBSCRIPTION');
  const [rcUnit, setRcUnit] = useState('per seat / month');
  const [rcBasePrice, setRcBasePrice] = useState<number>(100);
  const [rcFloorPrice, setRcFloorPrice] = useState<number>(80);
  const [rcMinMarginPct, setRcMinMarginPct] = useState<number>(75);
  const [rcDescription, setRcDescription] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [rcRes, qRes] = await Promise.all([
        api.getRateCards().catch(() => []),
        api.getContractQuotes().catch(() => [])
      ]);
      setRateCards(rcRes || []);
      setQuotes(qRes || []);
    } catch (err) {
      console.error('Failed to load pricing data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentOrg?.id]);

  const showNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 5000);
  };

  // CPQ Calculation for Modal
  const calculatedQuoteData = useMemo(() => {
    const computedItems: ContractQuoteItem[] = quoteItems.map((item, idx) => {
      const card = rateCards.find(rc => rc.id === item.rateCardId);
      const floor = card?.floorPriceUsd || item.unitPriceUsd * 0.6;
      const effectivePrice = Math.max(0, item.unitPriceUsd * (1 - (item.discountPct || 0) / 100));
      const subtotal = effectivePrice * item.quantity;
      const estimatedCost = floor * item.quantity;
      const marginPct = subtotal > 0 ? Number((((subtotal - estimatedCost) / subtotal) * 100).toFixed(1)) : 0;

      return {
        id: `qi_${idx + 1}`,
        rateCardItemId: item.rateCardId,
        rateCardId: item.rateCardId,
        name: item.name,
        quantity: item.quantity,
        unitPriceUsd: item.unitPriceUsd,
        discountPct: item.discountPct,
        effectivePriceUsd: effectivePrice,
        subtotalUsd: subtotal,
        grossMarginPct: marginPct,
        estimatedMarginPct: marginPct
      };
    });

    const subtotal = computedItems.reduce((acc, curr) => acc + curr.subtotalUsd, 0);
    const finalTotal = subtotal * (1 - (quoteDiscountPct || 0) / 100);
    const totalCost = computedItems.reduce((acc, curr) => {
      const card = rateCards.find(rc => rc.id === curr.rateCardId);
      const floor = card?.floorPriceUsd || curr.unitPriceUsd * 0.6;
      return acc + floor * curr.quantity;
    }, 0);

    const blendedMargin = finalTotal > 0 ? Number((((finalTotal - totalCost) / finalTotal) * 100).toFixed(1)) : 0;
    const isMarginCompliant = blendedMargin >= 65;

    return {
      items: computedItems,
      subtotal,
      finalTotal,
      blendedMargin,
      isMarginCompliant
    };
  }, [quoteItems, quoteDiscountPct, rateCards]);

  const handleOpenNewQuoteModal = () => {
    setClientName('');
    setClientEmail('');
    setContractTermMonths(12);
    setSlaTier('ENTERPRISE_99_99');
    setQuoteDiscountPct(0);
    setQuoteNotes('Includes dedicated deployment engineer and quarterly executive business reviews.');

    if (rateCards.length > 0) {
      setQuoteItems([
        {
          rateCardId: rateCards[0].id,
          name: rateCards[0].name,
          quantity: 10,
          unitPriceUsd: rateCards[0].basePriceUsd,
          discountPct: 0
        }
      ]);
    } else {
      setQuoteItems([]);
    }
    setIsQuoteModalOpen(true);
  };

  const handleAddQuoteItem = () => {
    const defaultCard = rateCards[0];
    if (!defaultCard) return;
    setQuoteItems(prev => [
      ...prev,
      {
        rateCardId: defaultCard.id,
        name: defaultCard.name,
        quantity: 1,
        unitPriceUsd: defaultCard.basePriceUsd,
        discountPct: 0
      }
    ]);
  };

  const handleUpdateQuoteItem = (index: number, updates: Partial<{
    rateCardId: string;
    quantity: number;
    unitPriceUsd: number;
    discountPct: number;
  }>) => {
    setQuoteItems(prev => {
      const next = [...prev];
      if (updates.rateCardId && updates.rateCardId !== next[index].rateCardId) {
        const rc = rateCards.find(c => c.id === updates.rateCardId);
        if (rc) {
          next[index] = {
            ...next[index],
            ...updates,
            name: rc.name,
            unitPriceUsd: rc.basePriceUsd
          };
          return next;
        }
      }
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  const handleRemoveQuoteItem = (index: number) => {
    setQuoteItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || quoteItems.length === 0) return;

    try {
      const quoteNumber = `QTE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const validUntil = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

      await api.createContractQuote({
        organizationId: currentOrg?.id || 'org_real_default',
        quoteNumber,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        status: 'DRAFT',
        contractTermMonths,
        validUntil,
        slaTier,
        items: calculatedQuoteData.items as any,
        annualContractValueUsd: calculatedQuoteData.finalTotal,
        totalContractValueUsd: calculatedQuoteData.finalTotal,
        monthlyRecurringValueUsd: Math.round(calculatedQuoteData.finalTotal / Math.max(1, contractTermMonths)),
        blendedGrossMarginPct: calculatedQuoteData.blendedMargin,
        notes: quoteNotes
      } as any);

      setIsQuoteModalOpen(false);
      await loadData();
      showNotification(`Quote ${quoteNumber} generated with ${calculatedQuoteData.blendedMargin}% gross margin.`);
    } catch (err: any) {
      alert(err.message || 'Failed to save quote');
    }
  };

  const handleUpdateQuoteStatus = async (quote: ContractQuote, nextStatus: ContractQuote['status']) => {
    try {
      await api.updateContractQuote(quote.id, { status: nextStatus });
      await loadData();
      showNotification(`Quote ${quote.quoteNumber} status updated to ${nextStatus}.`);
    } catch (err: any) {
      alert(err.message || 'Failed to update quote');
    }
  };

  const handleConvertToInvoice = async (quote: ContractQuote) => {
    if (!confirm(`Convert Approved Quote ${quote.quoteNumber} ($${quote.totalContractValueUsd.toLocaleString()}) into an active customer invoice?`)) {
      return;
    }
    try {
      const res = await api.convertQuoteToInvoice(quote.id);
      await loadData();
      showNotification(`Approved Quote ${quote.quoteNumber} successfully converted to Invoice ${res.invoice.invoiceNumber}!`);
    } catch (err: any) {
      alert(err.message || 'Failed to convert quote to invoice');
    }
  };

  // Rate Card Management Handlers
  const handleOpenNewRateCard = () => {
    setEditingRateCardId(null);
    setRcName('');
    setRcCategory('SUBSCRIPTION');
    setRcUnit('per seat / month');
    setRcBasePrice(150);
    setRcFloorPrice(110);
    setRcMinMarginPct(75);
    setRcDescription('');
    setIsRateCardModalOpen(true);
  };

  const handleOpenEditRateCard = (item: RateCardItem) => {
    setEditingRateCardId(item.id);
    setRcName(item.name);
    setRcCategory(item.category);
    setRcUnit(item.unit);
    setRcBasePrice(item.basePriceUsd);
    setRcFloorPrice(item.floorPriceUsd);
    setRcMinMarginPct(item.minimumMarginPct);
    setRcDescription(item.description || '');
    setIsRateCardModalOpen(true);
  };

  const handleSaveRateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rcName.trim()) return;

    try {
      if (editingRateCardId) {
        await api.updateRateCard(editingRateCardId, {
          name: rcName.trim(),
          category: rcCategory,
          unit: rcUnit.trim(),
          unitPriceUsd: Number(rcBasePrice),
          costToDeliverUsd: Math.round(Number(rcBasePrice) * (1 - Number(rcMinMarginPct) / 100)),
          unitDescription: rcUnit.trim(),
          basePriceUsd: Number(rcBasePrice),
          floorPriceUsd: Number(rcFloorPrice),
          minimumMarginPct: Number(rcMinMarginPct),
          recommendedGrossMarginPct: Number(rcMinMarginPct),
          description: rcDescription.trim()
        } as any);
        showNotification(`Rate card item "${rcName}" updated.`);
      } else {
        await api.createRateCard({
          name: rcName.trim(),
          category: rcCategory,
          billingModel: 'PER_UNIT',
          unitPriceUsd: Number(rcBasePrice),
          costToDeliverUsd: Math.round(Number(rcBasePrice) * (1 - Number(rcMinMarginPct) / 100)),
          unitDescription: rcUnit.trim(),
          unit: rcUnit.trim(),
          basePriceUsd: Number(rcBasePrice),
          floorPriceUsd: Number(rcFloorPrice),
          minimumMarginPct: Number(rcMinMarginPct),
          recommendedGrossMarginPct: Number(rcMinMarginPct),
          description: rcDescription.trim()
        } as any);
        showNotification(`New rate card item "${rcName}" added to catalog.`);
      }
      setIsRateCardModalOpen(false);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to save rate card item');
    }
  };

  const handleDeleteRateCard = async (id: string, name: string) => {
    if (!confirm(`Delete rate card item "${name}"?`)) return;
    try {
      await api.deleteRateCard(id);
      await loadData();
      showNotification(`Rate card item "${name}" removed.`);
    } catch (err: any) {
      showNotification(err.message || 'Failed to delete rate card');
    }
  };

  // KPIs
  const totalQuoteVolume = quotes.reduce((acc, q) => acc + (q.totalContractValueUsd || q.annualContractValueUsd || 0), 0);
  const activeQuotesCount = quotes.filter(q => q.status !== 'REJECTED' && q.status !== 'CONVERTED_TO_INVOICE').length;
  const avgMargin = quotes.length > 0
    ? Number((quotes.reduce((acc, q) => acc + (q.grossMarginPct ?? q.blendedGrossMarginPct ?? 0), 0) / quotes.length).toFixed(1))
    : 0;

  const filteredQuotes = useMemo(() => {
    return quotes.filter(q => {
      const matchQuery =
        q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || q.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [quotes, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Contract Volume</span>
            <DollarSign className="w-4 h-4 text-[#132338]" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            ${totalQuoteVolume.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Across {quotes.length} total commercial quotes
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Active CPQ Pipeline</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600">
            {activeQuotesCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Draft, Sent, or in Negotiation
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Blended Gross Margin</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            {avgMargin}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Target floor compliance ≥ 65%
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Rate Card Catalog</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {rateCards.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            Standardized commercial line items
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubView('QUOTES')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              activeSubView === 'QUOTES'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Contract Quotes & CPQ ({quotes.length})</span>
          </button>
          <button
            onClick={() => setActiveSubView('RATE_CARDS')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              activeSubView === 'RATE_CARDS'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Standard Rate Cards ({rateCards.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeSubView === 'QUOTES' ? (
            <button
              onClick={handleOpenNewQuoteModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#132338] hover:bg-[#1e3450] text-white text-xs font-mono font-medium transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create CPQ Quote</span>
            </button>
          ) : (
            <button
              onClick={handleOpenNewRateCard}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#132338] hover:bg-[#1e3450] text-white text-xs font-mono font-medium transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Rate Card Item</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW A: CONTRACT QUOTES & CPQ PIPELINE */}
      {activeSubView === 'QUOTES' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          {/* Filter Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search quotes by client or quote #..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="DRAFT">Draft</option>
                <option value="SENT">Sent to Client</option>
                <option value="NEGOTIATION">Under Negotiation</option>
                <option value="APPROVED">Approved</option>
                <option value="CONVERTED_TO_INVOICE">Converted to Invoice</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          {/* Quotes Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Quote # & Client</th>
                  <th className="py-3 px-4">Term & SLA</th>
                  <th className="py-3 px-4">Total Contract Value</th>
                  <th className="py-3 px-4">Est. Gross Margin</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-mono">
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400 font-mono">
                      No commercial quotes found. Create a quote using the CPQ engine above.
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map(quote => {
                    const statusColors: Record<string, string> = {
                      DRAFT: 'bg-slate-100 text-slate-700 border-slate-200',
                      SENT: 'bg-blue-50 text-blue-700 border-blue-200',
                      NEGOTIATION: 'bg-amber-50 text-amber-700 border-amber-200',
                      APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      CONVERTED_TO_INVOICE: 'bg-purple-50 text-purple-700 border-purple-200',
                      REJECTED: 'bg-rose-50 text-rose-700 border-rose-200'
                    };

                    return (
                      <tr key={quote.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{quote.quoteNumber}</div>
                          <div className="text-[11px] text-slate-500">{quote.clientName}</div>
                          <div className="text-[10px] text-slate-400">{quote.clientEmail}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-800">{quote.contractTermMonths} Months</div>
                          <div className="text-[10px] text-slate-500 uppercase">{(quote.slaTier || '').replace(/_/g, ' ')}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">
                            ${((quote.totalContractValueUsd || quote.annualContractValueUsd || 0)).toLocaleString()}
                          </div>
                          {(quote.discountPct || 0) > 0 && (
                            <div className="text-[10px] text-amber-600">
                              {quote.discountPct}% volume discount applied
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-bold ${
                                (quote.grossMarginPct ?? quote.blendedGrossMarginPct ?? 0) >= 65 ? 'text-emerald-600' : 'text-amber-600'
                              }`}
                            >
                              {quote.grossMarginPct ?? quote.blendedGrossMarginPct ?? 0}%
                            </span>
                            {(quote.marginFloorCompliant !== false) ? (
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {(quote.marginFloorCompliant !== false) ? 'Floor Protected' : 'Requires Approval'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              statusColors[quote.status] || 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {(quote.status || '').replace(/_/g, ' ')}
                          </span>
                          {quote.convertedInvoiceId && (
                            <div className="text-[10px] text-purple-600 mt-0.5">
                              Live Invoice #{quote.convertedInvoiceId}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {quote.status === 'DRAFT' && (
                              <button
                                onClick={() => handleUpdateQuoteStatus(quote, 'SENT')}
                                className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[10px] transition"
                              >
                                Send Quote
                              </button>
                            )}

                            {quote.status === 'SENT' && (
                              <button
                                onClick={() => handleUpdateQuoteStatus(quote, 'APPROVED')}
                                className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[10px] transition"
                              >
                                Approve
                              </button>
                            )}

                            {quote.status === 'APPROVED' && (
                              <button
                                onClick={() => handleConvertToInvoice(quote)}
                                className="px-2.5 py-1 bg-[#132338] text-white hover:bg-[#1e3450] rounded-lg text-[10px] font-bold flex items-center gap-1 transition shadow-xs"
                              >
                                <ArrowRight className="w-3 h-3" />
                                <span>Convert to Invoice</span>
                              </button>
                            )}

                            {quote.status === 'CONVERTED_TO_INVOICE' && onNavigateToInvoices && (
                              <button
                                onClick={onNavigateToInvoices}
                                className="px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-[10px] flex items-center gap-1 transition"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>View Invoices</span>
                              </button>
                            )}
                          </div>
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

      {/* VIEW B: STANDARD RATE CARDS CATALOG */}
      {activeSubView === 'RATE_CARDS' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold font-mono text-slate-900">Standard Rate Card Catalog</h3>
              <p className="text-xs text-slate-500 font-mono">Standardized pricing floors and target gross margins for enterprise CPQ quotes</p>
            </div>
            <button
              onClick={handleOpenNewRateCard}
              className="px-3 py-1.5 bg-[#132338] hover:bg-[#1e3450] text-white text-xs font-mono rounded-xl flex items-center gap-1.5 transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Rate Item</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Item Name & Category</th>
                  <th className="py-3 px-4">Billing Unit</th>
                  <th className="py-3 px-4">Base List Price</th>
                  <th className="py-3 px-4">Floor Price (Hard Cost)</th>
                  <th className="py-3 px-4">Min Target Margin</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-mono">
                {rateCards.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.description}</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] uppercase tracking-wider font-semibold">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      {item.unit}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      ${item.basePriceUsd.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      ${item.floorPriceUsd.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-emerald-600 font-bold">{item.minimumMarginPct}%</span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditRateCard(item)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                          title="Edit Rate Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRateCard(item.id, item.name)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Rate Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: CREATE CONTRACT CPQ QUOTE */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-3xl my-8 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#132338]" />
                <div>
                  <h3 className="text-sm font-bold font-mono text-slate-900">Interactive CPQ Contract Quote Builder</h3>
                  <p className="text-xs text-slate-500 font-mono">Configure custom commercial scope with live margin protection</p>
                </div>
              </div>
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuote} className="p-6 space-y-6">
              {/* Client & Term Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 mb-1">
                    Client Legal Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Systems Corp"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 mb-1">
                    Commercial Point of Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="procurement@apexcorp.com"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 mb-1">
                    Contract Term (Commitment)
                  </label>
                  <select
                    value={contractTermMonths}
                    onChange={e => setContractTermMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none"
                  >
                    <option value={3}>3 Months (Quarterly Pilot)</option>
                    <option value={6}>6 Months (Semi-Annual)</option>
                    <option value={12}>12 Months (Annual Standard)</option>
                    <option value={24}>24 Months (2-Year Enterprise)</option>
                    <option value={36}>36 Months (3-Year Sovereign)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 mb-1">
                    Service Level Agreement (SLA Tier)
                  </label>
                  <select
                    value={slaTier}
                    onChange={e => setSlaTier(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none"
                  >
                    <option value="STANDARD_99_5">Standard Tier (99.5% Uptime)</option>
                    <option value="ENTERPRISE_99_99">Enterprise Tier (99.99% Uptime, 1-hr SLA)</option>
                    <option value="SOVEREIGN_MISSION_CRITICAL">Sovereign Mission-Critical (99.999% Dedicated)</option>
                  </select>
                </div>
              </div>

              {/* Line Items from Rate Card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                    Contract Deliverables & Rate Items
                  </label>
                  <button
                    type="button"
                    onClick={handleAddQuoteItem}
                    className="flex items-center gap-1 text-xs font-mono text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {quoteItems.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-12 gap-2 items-center text-xs font-mono">
                      <div className="col-span-5">
                        <select
                          value={item.rateCardId}
                          onChange={e => handleUpdateQuoteItem(idx, { rateCardId: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none"
                        >
                          {rateCards.map(rc => (
                            <option key={rc.id} value={rc.id}>
                              {rc.name} (${rc.basePriceUsd} {rc.unit})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[10px] text-slate-400">Qty / Units</label>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={e => handleUpdateQuoteItem(idx, { quantity: Number(e.target.value) })}
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[10px] text-slate-400">Unit Price ($)</label>
                        <input
                          type="number"
                          value={item.unitPriceUsd}
                          onChange={e => handleUpdateQuoteItem(idx, { unitPriceUsd: Number(e.target.value) })}
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-right"
                        />
                      </div>

                      <div className="col-span-2 text-right font-bold text-slate-900">
                        ${(item.unitPriceUsd * item.quantity).toLocaleString()}
                      </div>

                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveQuoteItem(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume Discount & Margin Protection Guardrail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 mb-1">
                    Overall Contract Volume Discount (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={quoteDiscountPct}
                    onChange={e => setQuoteDiscountPct(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    Discounts {'>'} 20% reduce margin near floor threshold
                  </p>
                </div>

                <div className="space-y-1 text-right font-mono">
                  <div className="text-xs text-slate-500">Gross Contract Subtotal:</div>
                  <div className="text-sm font-bold text-slate-700">
                    ${calculatedQuoteData.subtotal.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500">Net Annualized Value:</div>
                  <div className="text-xl font-bold text-[#132338]">
                    ${calculatedQuoteData.finalTotal.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs">
                    <span className="text-slate-500">Blended Gross Margin:</span>
                    <span
                      className={`font-bold ${
                        calculatedQuoteData.isMarginCompliant ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {calculatedQuoteData.blendedMargin}%
                    </span>
                    {calculatedQuoteData.isMarginCompliant ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 mb-1">
                  Contract Terms & Commercial Notes
                </label>
                <textarea
                  rows={2}
                  value={quoteNotes}
                  onChange={e => setQuoteNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-mono transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#132338] hover:bg-[#1e3450] text-white rounded-xl text-xs font-mono font-bold transition shadow-xs flex items-center gap-1.5"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Generate Contract Quote</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT RATE CARD ITEM */}
      {isRateCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#132338]" />
                <h3 className="text-sm font-bold font-mono text-slate-900">
                  {editingRateCardId ? 'Edit Rate Card Item' : 'Add Rate Card Item'}
                </h3>
              </div>
              <button
                onClick={() => setIsRateCardModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRateCard} className="p-6 space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Item / SKU Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Sovereign Seat"
                  value={rcName}
                  onChange={e => setRcName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Category</label>
                  <select
                    value={rcCategory}
                    onChange={e => setRcCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="SUBSCRIPTION">Subscription</option>
                    <option value="PROFESSIONAL_SERVICES">Professional Services</option>
                    <option value="COMPLIANCE_AUDIT">Compliance Audit</option>
                    <option value="CUSTOM_INTEGRATION">Custom Integration</option>
                    <option value="INFRASTRUCTURE">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Unit Description</label>
                  <input
                    type="text"
                    required
                    placeholder="per seat / month"
                    value={rcUnit}
                    onChange={e => setRcUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={rcBasePrice}
                    onChange={e => setRcBasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Floor Price ($)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={rcFloorPrice}
                    onChange={e => setRcFloorPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Min Margin %</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={rcMinMarginPct}
                    onChange={e => setRcMinMarginPct(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Scope Description</label>
                <textarea
                  rows={2}
                  value={rcDescription}
                  onChange={e => setRcDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRateCardModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#132338] text-white rounded-xl font-bold shadow-xs"
                >
                  Save Rate Card Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
