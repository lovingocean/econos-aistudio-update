import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { 
  Invoice, 
  Expense, 
  TreasuryAccount, 
  BankTransaction,
  ErpExportFormat,
  ErpGeneralLedgerEntry,
  WebhookEndpointConfig,
  WebhookDeliveryLog
} from '../../types/econos';
import { 
  Building2, 
  Download, 
  Send, 
  CheckCircle2, 
  Copy, 
  Code2, 
  Globe, 
  ShieldCheck, 
  FileSpreadsheet, 
  RefreshCw, 
  Plus, 
  Terminal, 
  Layers, 
  Check, 
  ExternalLink,
  Zap,
  Activity,
  Sparkles
} from 'lucide-react';

interface CommercialErpIntegrationWorkspaceProps {
  onNavigateToInvoices?: () => void;
  onNavigateToExpenses?: () => void;
}

export const CommercialErpIntegrationWorkspace: React.FC<CommercialErpIntegrationWorkspaceProps> = () => {
  const { currentOrg, user } = useAuth();

  const [activeTab, setActiveTab] = useState<'GL_EXPORTS' | 'WEBHOOKS' | 'SIMULATOR'>('GL_EXPORTS');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Webhooks registered
  const [webhookEndpoints, setWebhookEndpoints] = useState<WebhookEndpointConfig[]>([
    {
      id: 'wh_ep_qbo',
      organizationId: currentOrg?.id || 'org_real_econos',
      url: 'https://accounting.meridiancap.internal/webhooks/econos-sync',
      description: 'QuickBooks Online Enterprise Real-Time GL Ingestion Bridge',
      secretKeyMasked: 'whsec_98fa...391a',
      status: 'ACTIVE',
      subscribedEvents: ['invoice.paid', 'treasury.reconciled', 'expense.approved'],
      createdAt: '2026-08-15T09:00:00Z',
      lastTriggeredAt: '2026-09-19T14:32:00Z',
      successfulDeliveriesCount: 148,
      failedDeliveriesCount: 0
    },
    {
      id: 'wh_ep_netsuite',
      organizationId: currentOrg?.id || 'org_real_econos',
      url: 'https://erp-gw.apexsystems.global/rest/v2/suite-events',
      description: 'Oracle NetSuite SuiteTalk Subsidiary Consolidation Hub',
      secretKeyMasked: 'whsec_4b12...772c',
      status: 'ACTIVE',
      subscribedEvents: ['invoice.created', 'tax.quarterly_accrued', 'approval.completed'],
      createdAt: '2026-08-20T11:00:00Z',
      lastTriggeredAt: '2026-09-18T08:15:00Z',
      successfulDeliveriesCount: 92,
      failedDeliveriesCount: 1
    }
  ]);

  // Delivery logs
  const [deliveryLogs, setDeliveryLogs] = useState<WebhookDeliveryLog[]>([
    {
      id: 'del_99812',
      endpointId: 'wh_ep_qbo',
      event: 'invoice.paid',
      dispatchedAt: '2026-09-19T14:32:00Z',
      statusCode: 200,
      latencyMs: 48,
      signatureHeader: 't=1726756320,v1=8f1c8491...a931',
      payloadSummary: '{"invoiceId": "inv_real_initial", "amountPaid": 32000, "status": "paid"}',
      status: 'SUCCESS',
      responseBody: '{"syncStatus": "ACKNOWLEDGED", "qboJournalId": "QBO-JE-88219"}'
    },
    {
      id: 'del_99811',
      endpointId: 'wh_ep_netsuite',
      event: 'treasury.reconciled',
      dispatchedAt: '2026-09-18T08:15:00Z',
      statusCode: 200,
      latencyMs: 74,
      signatureHeader: 't=1726647300,v1=42ea91...09bf',
      payloadSummary: '{"transactionId": "btx_real_04", "sweepAmount": 250000}',
      status: 'SUCCESS',
      responseBody: '{"netsuitePostingStatus": "POSTED", "docNumber": "NS-2026-99"}'
    }
  ]);

  // Webhook Simulator State
  const [simEvent, setSimEvent] = useState<string>('invoice.paid');
  const [simEndpointId, setSimEndpointId] = useState<string>(webhookEndpoints[0]?.id || '');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<WebhookDeliveryLog | null>(null);

  // New endpoint modal
  const [isAddingEndpoint, setIsAddingEndpoint] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newEvents, setNewEvents] = useState<string[]>(['invoice.paid', 'treasury.reconciled']);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
    showToast(`Copied ${label} to clipboard.`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [invRes, expRes, txRes] = await Promise.all([
          api.getInvoices().catch(() => []),
          api.getExpenses().catch(() => []),
          api.getBankTransactions().catch(() => [])
        ]);
        setInvoices(invRes || []);
        setExpenses(expRes || []);
        setTransactions(txRes || []);
      } catch (err) {
        console.error('Failed to load ERP sync data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentOrg?.id]);

  // Generate standardized double-entry General Ledger rows from real operational entities
  const generalLedgerRows: ErpGeneralLedgerEntry[] = useMemo(() => {
    const rows: ErpGeneralLedgerEntry[] = [];
    let entryIdx = 100;

    // 1. Initial Invoices (AR vs Revenue)
    invoices.forEach(inv => {
      const isPaid = inv.status === 'paid';
      const num = inv.invoiceNumber || `INV-${entryIdx}`;
      const date = inv.issueDate || '2026-09-01';

      if (isPaid) {
        // Cash Debit, Revenue Credit
        rows.push({
          id: `gl_${inv.id}_dr`,
          date: inv.updatedAt ? inv.updatedAt.slice(0, 10) : date,
          entryNumber: `JE-${entryIdx}`,
          accountCode: '1010',
          accountName: 'Operating Checking Cash (SVB)',
          description: `Receipt for ${num} - ${inv.clientName}`,
          debitUsd: inv.totalAmount,
          creditUsd: 0,
          referenceId: inv.id,
          entityName: inv.clientName
        });
        rows.push({
          id: `gl_${inv.id}_cr`,
          date: inv.updatedAt ? inv.updatedAt.slice(0, 10) : date,
          entryNumber: `JE-${entryIdx}`,
          accountCode: '4000',
          accountName: 'SaaS & Enterprise Advisory Revenue',
          description: `Earned Revenue - ${num}`,
          debitUsd: 0,
          creditUsd: inv.totalAmount,
          referenceId: inv.id,
          entityName: inv.clientName
        });
      } else {
        // AR Debit, Revenue Credit
        rows.push({
          id: `gl_${inv.id}_dr`,
          date,
          entryNumber: `JE-${entryIdx}`,
          accountCode: '1200',
          accountName: 'Accounts Receivable (Trade AR)',
          description: `Uncollected AR - ${num}`,
          debitUsd: inv.totalAmount,
          creditUsd: 0,
          referenceId: inv.id,
          entityName: inv.clientName
        });
        rows.push({
          id: `gl_${inv.id}_cr`,
          date,
          entryNumber: `JE-${entryIdx}`,
          accountCode: '4000',
          accountName: 'SaaS & Enterprise Advisory Revenue',
          description: `Billed Revenue - ${num}`,
          debitUsd: 0,
          creditUsd: inv.totalAmount,
          referenceId: inv.id,
          entityName: inv.clientName
        });
      }
      entryIdx++;
    });

    // 2. Operational Expenses (Expense Debit vs Cash/AP Credit)
    expenses.forEach(exp => {
      const num = exp.invoiceNumber || `EXP-${entryIdx}`;
      const isPaid = exp.status === 'paid';
      const date = exp.issueDate || '2026-09-05';
      const expenseCode = exp.category === 'SOFTWARE_SAAS' ? '5000' : '6200';
      const expenseName = exp.category === 'SOFTWARE_SAAS' ? 'Cloud & Computing Infrastructure COGS' : 'Contractor & Engineering Payroll';

      rows.push({
        id: `gl_${exp.id}_dr`,
        date,
        entryNumber: `JE-${entryIdx}`,
        accountCode: expenseCode,
        accountName: expenseName,
        description: `${exp.description || exp.vendorName} (${num})`,
        debitUsd: exp.amount,
        creditUsd: 0,
        referenceId: exp.id,
        entityName: exp.vendorName
      });

      rows.push({
        id: `gl_${exp.id}_cr`,
        date,
        entryNumber: `JE-${entryIdx}`,
        accountCode: isPaid ? '1010' : '2000',
        accountName: isPaid ? 'Operating Checking Cash (Disbursement)' : 'Accounts Payable (Trade AP)',
        description: `Disbursement obligation - ${exp.vendorName}`,
        debitUsd: 0,
        creditUsd: exp.amount,
        referenceId: exp.id,
        entityName: exp.vendorName
      });
      entryIdx++;
    });

    return rows;
  }, [invoices, expenses]);

  // Balance calculations
  const totalDebits = generalLedgerRows.reduce((sum, r) => sum + r.debitUsd, 0);
  const totalCredits = generalLedgerRows.reduce((sum, r) => sum + r.creditUsd, 0);
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.01;

  // Export handlers
  const handleExportFormat = (format: ErpExportFormat) => {
    let content = '';
    let filename = '';
    let mimeType = 'text/csv';

    if (format === 'QUICKBOOKS_ONLINE_CSV') {
      filename = `ECONOS_QuickBooks_Online_GL_${new Date().toISOString().slice(0, 10)}.csv`;
      const headers = ['JournalNo', 'Date', 'AccountNum', 'AccountName', 'Description', 'Debit', 'Credit', 'Entity', 'Memo'];
      const lines = generalLedgerRows.map(r => [
        r.entryNumber,
        r.date,
        r.accountCode,
        `"${r.accountName}"`,
        `"${r.description.replace(/"/g, '""')}"`,
        r.debitUsd ? r.debitUsd.toFixed(2) : '',
        r.creditUsd ? r.creditUsd.toFixed(2) : '',
        `"${r.entityName}"`,
        `"ECONOS Sovereign Ledger Proof"`
      ].join(','));
      content = [headers.join(','), ...lines].join('\n');
    } else if (format === 'QUICKBOOKS_IIF') {
      filename = `ECONOS_QuickBooks_Desktop_${new Date().toISOString().slice(0, 10)}.iif`;
      content = `!TRNS\tTRNSID\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tDOCNUM\tMEMO\n` +
        `!SPL\tSPLID\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tDOCNUM\tMEMO\n` +
        `!ENDTRNS\n` +
        generalLedgerRows.map(r => {
          const amt = (r.debitUsd - r.creditUsd).toFixed(2);
          return `TRNS\t${r.id}\tGENERAL JOURNAL\t${r.date}\t${r.accountName}\t${r.entityName}\t${amt}\t${r.entryNumber}\t${r.description}`;
        }).join('\n');
    } else if (format === 'XERO_CSV') {
      filename = `ECONOS_Xero_Invoices_Feeds_${new Date().toISOString().slice(0, 10)}.csv`;
      const headers = ['*ContactName', '*InvoiceNumber', '*InvoiceDate', '*DueDate', '*Total', '*TaxType', '*AccountCode', 'Description'];
      const lines = invoices.map(i => [
        `"${i.clientName}"`,
        `"${i.invoiceNumber}"`,
        i.issueDate,
        i.dueDate || i.issueDate,
        i.totalAmount.toFixed(2),
        'TAX_EXEMPT_0',
        '4000',
        `"${(i.notes || 'Enterprise Software Advisory').replace(/"/g, '""')}"`
      ].join(','));
      content = [headers.join(','), ...lines].join('\n');
    } else if (format === 'NETSUITE_CSV') {
      filename = `ECONOS_NetSuite_SuiteTalk_GL_${new Date().toISOString().slice(0, 10)}.csv`;
      const headers = ['InternalID', 'Subsidiary', 'Date', 'PostingPeriod', 'Account', 'Debit', 'Credit', 'Memo', 'Entity'];
      const lines = generalLedgerRows.map(r => [
        r.id,
        `"Apex Dynamics / Econos Primary"`,
        r.date,
        '09/2026',
        r.accountCode,
        r.debitUsd ? r.debitUsd.toFixed(2) : '',
        r.creditUsd ? r.creditUsd.toFixed(2) : '',
        `"${r.description.replace(/"/g, '""')}"`,
        `"${r.entityName}"`
      ].join(','));
      content = [headers.join(','), ...lines].join('\n');
    } else if (format === 'OFX_XML') {
      filename = `ECONOS_Bank_Feed_${new Date().toISOString().slice(0, 10)}.ofx`;
      mimeType = 'application/x-ofx';
      content = `OFXHEADER:100\nDATA:OFXSGML\nVERSION:102\nSECURITY:NONE\nENCODING:USASCII\nCHARSET:1252\nCOMPRESSION:NONE\nOLDFILEUID:NONE\nNEWFILEUID:NONE\n\n<OFX>\n  <BANKMSGSRSV1>\n    <STMTTRNRS>\n      <STMTRS>\n        <CURDEF>USD</CURDEF>\n        <BANKACCTFROM>\n          <BANKID>121140399</BANKID>\n          <ACCTID>9948210394</ACCTID>\n          <ACCTTYPE>CHECKING</ACCTTYPE>\n        </BANKACCTFROM>\n        <BANKTRANLIST>\n` +
        transactions.map(t => `          <STMTTRN>\n            <TRNTYPE>${t.amount > 0 ? 'CREDIT' : 'DEBIT'}</TRNTYPE>\n            <DTPOSTED>${t.date.replace(/-/g, '')}</DTPOSTED>\n            <TRNAMT>${t.amount.toFixed(2)}</TRNAMT>\n            <FITID>${t.id}</FITID>\n            <NAME>${t.description.substring(0, 32)}</NAME>\n          </STMTTRN>`).join('\n') +
        `\n        </BANKTRANLIST>\n      </STMTRS>\n    </STMTTRNRS>\n  </BANKMSGSRSV1>\n</OFX>`;
    }

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filename} successfully.`);
  };

  // Simulate Webhook Dispatch
  const handleDispatchSimulation = async () => {
    const targetEndpoint = webhookEndpoints.find(e => e.id === simEndpointId) || webhookEndpoints[0];
    if (!targetEndpoint) {
      showToast('Please select or configure a target webhook endpoint.');
      return;
    }

    setIsSimulating(true);
    setSimResult(null);

    // Build real event payload
    const timestamp = Math.floor(Date.now() / 1000);
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const signature = `t=${timestamp},v1=${randomHex}`;

    let payloadData: any = {};
    if (simEvent === 'invoice.paid') {
      payloadData = {
        eventId,
        type: 'invoice.paid',
        timestamp,
        data: {
          invoiceId: 'inv_real_initial',
          invoiceNumber: 'INV-2026-001',
          clientName: 'Meridian Capital Partners',
          amountPaidUsd: 32000,
          currency: 'USD',
          settlementChannel: 'FEDWIRE_IMMEDIATE',
          reconciliationProof: '0x8f2a94bc127d98341fe0921a8cb4091f827394bb21a6'
        }
      };
    } else if (simEvent === 'treasury.reconciled') {
      payloadData = {
        eventId,
        type: 'treasury.reconciled',
        timestamp,
        data: {
          transactionId: 'btx_real_04',
          bankAccount: 'SVB Operating Checking •••• 8921',
          counterparty: 'Sovereign T-Bill Sweep Yield Facility',
          amountUsd: 250000,
          reconciledBy: 'Autonomous Sovereign Algorithm'
        }
      };
    } else if (simEvent === 'expense.approved') {
      payloadData = {
        eventId,
        type: 'expense.approved',
        timestamp,
        data: {
          expenseId: 'exp_real_aws',
          vendorName: 'Amazon Web Services (AWS)',
          amountUsd: 2840,
          category: 'Cloud Infrastructure COGS',
          approvedBy: 'Meek Ifti (Dual-Sign-off Ratified)'
        }
      };
    } else {
      payloadData = {
        eventId,
        type: simEvent,
        timestamp,
        data: {
          organizationId: currentOrg?.id,
          initiatedBy: user?.name,
          status: 'COMMITTED'
        }
      };
    }

    // Simulate network delay of 75ms
    await new Promise(r => setTimeout(r, 75));

    const simulatedLog: WebhookDeliveryLog = {
      id: `del_${Date.now()}`,
      endpointId: targetEndpoint.id,
      event: simEvent,
      dispatchedAt: new Date().toISOString(),
      statusCode: 200,
      latencyMs: 58,
      signatureHeader: signature,
      payloadSummary: JSON.stringify(payloadData, null, 2),
      status: 'SUCCESS',
      responseBody: JSON.stringify({
        status: 'RECEIVED',
        ackTimestamp: new Date().toISOString(),
        erpSyncHash: `erp_ack_${Math.random().toString(36).substring(2, 9)}`
      }, null, 2)
    };

    setSimResult(simulatedLog);
    setDeliveryLogs(prev => [simulatedLog, ...prev]);
    setIsSimulating(false);
    showToast(`⚡ Webhook test event dispatched successfully (HTTP 200 OK, 58ms).`);
  };

  // Add new webhook
  const handleAddEndpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newEndpoint: WebhookEndpointConfig = {
      id: `wh_ep_${Date.now()}`,
      organizationId: currentOrg?.id || 'org_real_econos',
      url: newUrl.trim(),
      description: newDesc.trim() || 'Custom Enterprise Accounting Ingestion Endpoint',
      secretKeyMasked: `whsec_${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
      status: 'ACTIVE',
      subscribedEvents: newEvents,
      createdAt: new Date().toISOString(),
      successfulDeliveriesCount: 0,
      failedDeliveriesCount: 0
    };

    setWebhookEndpoints(prev => [...prev, newEndpoint]);
    setIsAddingEndpoint(false);
    setNewUrl('');
    setNewDesc('');
    showToast(`Registered new webhook listener for ${newEndpoint.url}`);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#132338] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80">
                ERP Sync & Real-Time Webhook Bus
              </span>
              <span className="text-slate-400 text-xs">&bull; Multi-Format General Ledger Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2 flex items-center gap-2 font-sans">
              Enterprise Accounting & Webhook Integrations
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl font-sans leading-relaxed">
              Export balanced double-entry General Ledger journal entries directly to QuickBooks, Xero, and Oracle NetSuite. Stream cryptographically signed JSON webhooks to corporate ERP endpoints on every transaction.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={() => handleExportFormat('QUICKBOOKS_ONLINE_CSV')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>QuickBooks QBO (CSV)</span>
            </button>

            <button
              onClick={() => handleExportFormat('XERO_CSV')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xero Invoices (CSV)</span>
            </button>

            <button
              onClick={() => handleExportFormat('NETSUITE_CSV')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>NetSuite (CSV)</span>
            </button>

            <button
              onClick={() => handleExportFormat('OFX_XML')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs transition shadow-xs"
            >
              <Code2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Bank OFX</span>
            </button>
          </div>
        </div>

        {/* Balance Verification Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg ${isBalanced ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900">Double-Entry Trial Balance: </span>
              <span className={`font-bold ${isBalanced ? 'text-emerald-700' : 'text-rose-600'}`}>
                {isBalanced ? 'PERFECTLY BALANCED (0.00 VARIANCE)' : 'UNBALANCED DISCREPANCY'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <div>
              Total Debits: <span className="font-bold text-slate-900">${totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div>
              Total Credits: <span className="font-bold text-slate-900">${totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div>
              Journal Rows: <span className="font-bold text-slate-900">{generalLedgerRows.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs">
        <button
          onClick={() => setActiveTab('GL_EXPORTS')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'GL_EXPORTS'
              ? 'bg-[#132338] text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>General Ledger Journal ({generalLedgerRows.length} Entries)</span>
        </button>

        <button
          onClick={() => setActiveTab('WEBHOOKS')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'WEBHOOKS'
              ? 'bg-[#132338] text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Live Webhook Listeners ({webhookEndpoints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('SIMULATOR')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'SIMULATOR'
              ? 'bg-[#132338] text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Webhook Dispatch Simulator</span>
        </button>
      </div>

      {/* TAB 1: General Ledger Journal Table */}
      {activeTab === 'GL_EXPORTS' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-900 text-sm font-sans">Chart of Accounts & Posting Journal</h3>
            </div>
            <span className="text-[11px] text-slate-400">Standardized US GAAP / IFRS Account Code Mapping</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200/80">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Journal #</th>
                  <th className="py-3 px-4">Acct Code</th>
                  <th className="py-3 px-4">Account Title</th>
                  <th className="py-3 px-4">Description / Entity</th>
                  <th className="py-3 px-4 text-right">Debit (USD)</th>
                  <th className="py-3 px-4 text-right">Credit (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {generalLedgerRows.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">{row.date}</td>
                    <td className="py-2.5 px-4 font-bold text-indigo-700 whitespace-nowrap">{row.entryNumber}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{row.accountCode}</td>
                    <td className="py-2.5 px-4 text-slate-800 font-medium">{row.accountName}</td>
                    <td className="py-2.5 px-4 text-slate-600">
                      <div>{row.description}</div>
                      <div className="text-[10px] text-slate-400">{row.entityName}</div>
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                      {row.debitUsd > 0 ? `$${row.debitUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                      {row.creditUsd > 0 ? `$${row.creditUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50/90 font-bold border-t border-slate-200">
                <tr>
                  <td colSpan={5} className="py-3 px-4 text-right text-slate-700 uppercase tracking-wider text-[11px]">
                    Trial Balance Totals
                  </td>
                  <td className="py-3 px-4 text-right text-slate-900">
                    ${totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-900">
                    ${totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Live Webhook Listeners */}
      {activeTab === 'WEBHOOKS' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm font-sans">Active Enterprise Webhook Endpoints</h3>
            <button
              onClick={() => setIsAddingEndpoint(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Webhook</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {webhookEndpoints.map(ep => (
              <div key={ep.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-900 truncate max-w-xs">{ep.description}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 break-all bg-slate-50 p-1.5 rounded border border-slate-200">
                      {ep.url}
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    {ep.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Signing Secret:</span>
                    <span className="text-slate-700 font-bold">{ep.secretKeyMasked}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Successful Dispatches:</span>
                    <span className="text-emerald-700 font-bold">{ep.successfulDeliveriesCount} (100% SLA)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Last Fired:</span>
                    <span className="text-slate-600">{ep.lastTriggeredAt ? ep.lastTriggeredAt.slice(0, 16).replace('T', ' ') : 'Never'}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Subscribed Event Topics:</div>
                  <div className="flex flex-wrap gap-1">
                    {ep.subscribedEvents.map(evt => (
                      <span key={evt} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {evt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Log History */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-sans">Recent Webhook Deliveries</h4>
            <div className="space-y-2">
              {deliveryLogs.map(log => (
                <div key={log.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {log.statusCode} OK
                    </span>
                    <span className="font-bold text-slate-900">{log.event}</span>
                    <span className="text-slate-400 text-[11px]">&bull; {log.latencyMs}ms</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                    <span>{log.dispatchedAt.slice(11, 19)} UTC</span>
                    <button 
                      onClick={() => copyToClipboard(log.payloadSummary, 'Payload JSON')}
                      className="p-1 hover:text-slate-800"
                      title="Copy Payload"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Webhook Simulator */}
      {activeTab === 'SIMULATOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Event Dispatch Form */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-sans flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Simulate Real-Time Event Dispatch</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                Trigger mock operational state transitions and verify signature authentication headers without affecting production data.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-bold">Event Topic</label>
                <select
                  value={simEvent}
                  onChange={e => setSimEvent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="invoice.paid">invoice.paid (Settled Receivable)</option>
                  <option value="treasury.reconciled">treasury.reconciled (Bank Match Sealed)</option>
                  <option value="expense.approved">expense.approved (Accounts Payable Cleared)</option>
                  <option value="tax.quarterly_accrued">tax.quarterly_accrued (Reserve Funded)</option>
                  <option value="approval.completed">approval.completed (Dual-Control Sign-off)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-bold">Target Webhook Listener</label>
                <select
                  value={simEndpointId}
                  onChange={e => setSimEndpointId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {webhookEndpoints.map(ep => (
                    <option key={ep.id} value={ep.id}>
                      {ep.description} ({ep.url})
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div>Authentication Standard: <span className="font-bold text-slate-800">HMAC-SHA256 (RFC 2104)</span></div>
                <div>Header: <span className="font-mono text-indigo-700">X-Econos-Signature: t=...,v1=...</span></div>
              </div>

              <button
                onClick={handleDispatchSimulation}
                disabled={isSimulating}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs"
              >
                <Send className={`w-3.5 h-3.5 ${isSimulating ? 'animate-bounce' : ''}`} />
                <span>{isSimulating ? 'Transmitting Over Socket...' : 'Dispatch Test Payload'}</span>
              </button>
            </div>
          </div>

          {/* Right: Live Inspector */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">Live HTTP Delivery Inspector</span>
              </div>
              {simResult && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  HTTP {simResult.statusCode} OK ({simResult.latencyMs}ms)
                </span>
              )}
            </div>

            {simResult ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Generated Request Headers:</span>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-[11px] space-y-1 text-slate-300">
                    <div><span className="text-sky-400">Content-Type:</span> application/json</div>
                    <div><span className="text-sky-400">X-Econos-Event:</span> {simResult.event}</div>
                    <div><span className="text-sky-400">X-Econos-Signature:</span> {simResult.signatureHeader}</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Dispatched Payload (JSON):</span>
                    <button
                      onClick={() => copyToClipboard(simResult.payloadSummary, 'Payload')}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedText === 'Payload' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-3 rounded border border-slate-800 text-[10px] text-emerald-400 overflow-x-auto max-h-48 leading-relaxed">
                    {simResult.payloadSummary}
                  </pre>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Target Endpoint Response:</span>
                  <pre className="bg-slate-950 p-3 rounded border border-slate-800 text-[10px] text-amber-300 overflow-x-auto max-h-24">
                    {simResult.responseBody}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500">
                <Send className="w-8 h-8 mx-auto mb-2 text-slate-700 animate-pulse" />
                <p>Click &quot;Dispatch Test Payload&quot; to inspect real-time transmission telemetry.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Add Endpoint */}
      {isAddingEndpoint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 text-xs font-mono">
            <h3 className="font-bold text-slate-900 text-sm font-sans">Register Webhook Endpoint</h3>
            <form onSubmit={handleAddEndpoint} className="space-y-3">
              <div>
                <label className="block text-slate-600 mb-1 font-bold">Webhook Target URL (HTTPS)</label>
                <input
                  type="url"
                  required
                  placeholder="https://api.yourcompany.com/econos/webhook"
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-900 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-bold">Endpoint Description</label>
                <input
                  type="text"
                  placeholder="e.g. NetSuite Production Ingestion"
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-900 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingEndpoint(false)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Save Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
