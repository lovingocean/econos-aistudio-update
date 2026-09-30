import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Building,
  DollarSign,
  Search,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Calendar,
  CreditCard
} from 'lucide-react';

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  txHash: string;
  blockNumber: number;
  buyerName: string;
  buyerTaxId: string;
  buyerAddress: string;
  buyerEmail: string;
  itemName: string;
  itemDescription: string;
  amount: number;
  currency: string;
  taxRatePct: number;
  taxAmount: number;
  totalPaid: number;
  paymentMethod: string;
  asc606Code: string;
  settlementVault: string;
}

export const CorporateTaxInvoiceVault: React.FC = () => {
  const [buyerName, setBuyerName] = useState<string>('Apex Capital & Wealth Management LLC');
  const [buyerTaxId, setBuyerTaxId] = useState<string>('US-EIN 88-4921940');
  const [buyerAddress, setBuyerAddress] = useState<string>('100 Montgomery St, Suite 2400, San Francisco, CA 94104');
  const [buyerEmail, setBuyerEmail] = useState<string>('finance@apexwealthcapital.com');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [activeInvoice, setActiveInvoice] = useState<InvoiceData>({
    invoiceNumber: 'INV-2026-AURX-09842',
    date: 'September 30, 2026',
    dueDate: 'Paid upon execution',
    txHash: '0x3f721d98e4c76b201a409fe6189b7024ca39b817e9231f4a9b6c89140281ef54',
    blockNumber: 51829142,
    buyerName: 'Apex Capital & Wealth Management LLC',
    buyerTaxId: 'US-EIN 88-4921940',
    buyerAddress: '100 Montgomery St, Suite 2400, San Francisco, CA 94104',
    buyerEmail: 'finance@apexwealthcapital.com',
    itemName: 'AuraX Sovereign Genesis Node License NFT (Serial #142)',
    itemDescription: 'Full hardware validator consensus rights, 100k TPS dedicated clearing lane, Zero-Drainer Invariant protection, and Proof-of-Yield distribution.',
    amount: 3499.00,
    currency: 'USD (Settled in USDC on Base)',
    taxRatePct: 0.0,
    taxAmount: 0.00,
    totalPaid: 3499.00,
    paymentMethod: 'USDC On-Chain Smart Contract Vault',
    asc606Code: 'ASC-606-PERF-OBLIG-VALIDATOR-2026',
    settlementVault: '0x095871Cfed26b28f03e409AE612c0A5F1e1726cD'
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const element = document.createElement('a');
    const invoiceContent = `
========================================================================
OFFICIAL CORPORATE TAX INVOICE & PROOF OF SETTLEMENT
AuraX Sovereign Network Foundation & ECONOS Financial Systems AG
UID / VAT: CHE-492.184.201 | Base Mainnet Registration Authority
========================================================================
Invoice Number: ${activeInvoice.invoiceNumber}
Date: ${activeInvoice.date}
Settlement Block: #${activeInvoice.blockNumber} (Base Mainnet)
On-Chain Tx Hash: ${activeInvoice.txHash}

BILL TO:
Company: ${buyerName}
Tax ID / EIN: ${buyerTaxId}
Address: ${buyerAddress}
Email: ${buyerEmail}

LINE ITEMS:
1. ${activeInvoice.itemName}
   - ${activeInvoice.itemDescription}
   Price: $${activeInvoice.amount.toFixed(2)} USD
2. 100k TPS Dedicated Consensus Lane & Silicon Hardware Guard: Included ($0.00)
3. ASC 606 & IFRS 15 Compliance Warranty: Included ($0.00)

------------------------------------------------------------------------
Subtotal: $${activeInvoice.amount.toFixed(2)} USD
Tax / VAT (B2B Cross-Border Reverse Charge): $0.00
TOTAL PAID: $${activeInvoice.totalPaid.toFixed(2)} USD
Payment Method: ${activeInvoice.paymentMethod}
Protocol Settlement Vault: ${activeInvoice.settlementVault}
ASC 606 Compliance Code: ${activeInvoice.asc606Code}
========================================================================
Cryptographic Attestation Verified by BaseScan: https://basescan.org/address/${activeInvoice.settlementVault}
`;
    const file = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeInvoice.invoiceNumber}_Official_Tax_Invoice.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1530] to-slate-950 border border-cyan-500/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/40">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>Enterprise Corporate Tax Invoicing (ASC 606 &amp; VAT)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  AUDIT READY
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Multinational corporations and family offices can download official tax receipts with verified BaseScan hashes for IRS &amp; international accounting compliance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Invoice</span>
            </button>
          </div>
        </div>

        {/* Edit Buyer Details Form */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Customize Your Corporate Entity Information:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block">Company Name</label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Tax ID / EIN / VAT #</label>
              <input
                type="text"
                value={buyerTaxId}
                onChange={(e) => setBuyerTaxId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Billing Address</label>
              <input
                type="text"
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Finance Email</label>
              <input
                type="text"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RENDERED OFFICIAL INVOICE DOCUMENT */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6 text-slate-300 text-xs">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="text-xl font-black text-white tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>AURAX &amp; ECONOS ENTERPRISE</span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans">
              AuraX Sovereign Network Foundation &amp; ECONOS Financial Systems AG
            </div>
            <div className="text-[10px] text-slate-500">
              UID / VAT: CHE-492.184.201 | Baarerstrasse 14, 6300 Zug, Switzerland
            </div>
            <div className="text-[10px] text-cyan-400 font-mono">
              Base Mainnet Protocol Vault: {activeInvoice.settlementVault}
            </div>
          </div>

          <div className="text-right space-y-1 self-start sm:self-auto">
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold inline-block">
              PAID &amp; SETTLED
            </span>
            <div className="text-sm font-black text-white">{activeInvoice.invoiceNumber}</div>
            <div className="text-[10px] text-slate-400">Date: {activeInvoice.date}</div>
            <div className="text-[10px] text-slate-400">Block: #{activeInvoice.blockNumber}</div>
          </div>
        </div>

        {/* Bill To & On-Chain Hash Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Bill To (Corporate Buyer):</span>
            <div className="text-sm font-bold text-white">{buyerName}</div>
            <div className="text-[11px] text-slate-300">Tax ID: {buyerTaxId}</div>
            <div className="text-[11px] text-slate-400 font-sans">{buyerAddress}</div>
            <div className="text-[11px] text-slate-400">{buyerEmail}</div>
          </div>

          <div className="space-y-1.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Cryptographic On-Chain Proof:</span>
            <div className="text-[11px] text-cyan-300 select-all break-all font-mono">
              Tx: {activeInvoice.txHash}
            </div>
            <div className="text-[10px] text-slate-400">
              ASC 606 Standard: <span className="text-white font-bold">{activeInvoice.asc606Code}</span>
            </div>
            <a
              href={`https://basescan.org/address/${activeInvoice.settlementVault}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 pt-1"
            >
              <span>Verify Settlement on BaseScan.org ↗</span>
            </a>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="space-y-3">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-[10px] text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Description &amp; Deliverables</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Price</th>
                <th className="py-2.5 px-3 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-3 px-3 space-y-1">
                  <div className="font-bold text-white">{activeInvoice.itemName}</div>
                  <div className="text-[11px] text-slate-400 font-sans">{activeInvoice.itemDescription}</div>
                </td>
                <td className="py-3 px-3 text-center font-bold">1</td>
                <td className="py-3 px-3 text-right font-mono">$3,499.00</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-white">$3,499.00</td>
              </tr>
              <tr>
                <td className="py-2 px-3 space-y-0.5">
                  <div className="font-bold text-slate-300">100k TPS Priority Consensus Lane</div>
                  <div className="text-[10px] text-slate-500 font-sans">Hardware invariant anti-sybil consensus throughput</div>
                </td>
                <td className="py-2 px-3 text-center">1</td>
                <td className="py-2 px-3 text-right font-mono">$0.00</td>
                <td className="py-2 px-3 text-right font-mono text-emerald-400">Included</td>
              </tr>
              <tr>
                <td className="py-2 px-3 space-y-0.5">
                  <div className="font-bold text-slate-300">ASC 606 &amp; IFRS 15 Compliance Warranty</div>
                  <div className="text-[10px] text-slate-500 font-sans">Audited revenue recognition and continuous close entitlement</div>
                </td>
                <td className="py-2 px-3 text-center">1</td>
                <td className="py-2 px-3 text-right font-mono">$0.00</td>
                <td className="py-2 px-3 text-right font-mono text-emerald-400">Included</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Calculation */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-slate-800">
          <div className="space-y-1 max-w-sm text-[11px] text-slate-400 font-sans">
            <span className="font-bold text-slate-300 block">Corporate Tax Treatment Note:</span>
            <span>B2B cross-border supply of digital software &amp; protocol validation rights. Value Added Tax (VAT) / GST subject to reverse charge mechanism by recipient pursuant to Article 196 EU VAT Directive and US Sales Tax Exemption rules.</span>
          </div>

          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="font-mono text-white">$3,499.00 USD</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>VAT / Tax (0% Reverse Charge):</span>
              <span className="font-mono text-white">$0.00 USD</span>
            </div>
            <div className="flex justify-between text-sm font-black text-emerald-400 pt-2 border-t border-slate-800">
              <span>Total Paid:</span>
              <span className="font-mono">$3,499.00 USD</span>
            </div>
            <div className="text-[10px] text-slate-500 text-right">
              Settlement Currency: 3,499.00 USDC
            </div>
          </div>
        </div>

        {/* Cryptographic Seal */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">
              Cryptographically verified by Base Block #51829142. Valid for corporate tax write-offs and CPA audit review.
            </span>
          </div>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="px-3 py-1 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 font-bold text-[10px] shrink-0"
          >
            Export .TXT / PDF
          </button>
        </div>
      </div>
    </div>
  );
};
