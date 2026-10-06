import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  DollarSign,
  Fuel,
  Building,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Smartphone,
  Tag,
  Receipt,
  Download,
  Filter
} from 'lucide-react';

interface FleetCardTransaction {
  id: string;
  cardholderName: string;
  role: string;
  merchantName: string;
  category: 'FUEL_FLEET' | 'JOB_SUPPLIES' | 'EQUIPMENT_RENTAL' | 'FIELD_TOOLS';
  amount: number;
  projectCode: string;
  csiCostCode: string;
  timestamp: string;
  receiptStatus: 'AUTO_MATCHED_AI' | 'PENDING_OCR' | 'FLAGGED';
  interchangeEarned: number; // 1.85% net fintech revenue
}

const INITIAL_TRANSACTIONS: FleetCardTransaction[] = [
  {
    id: 'tx-101',
    cardholderName: 'Dave Miller (Foreman)',
    role: 'Site Superintendent',
    merchantName: 'United Rentals #482 (Dallas, TX)',
    category: 'EQUIPMENT_RENTAL',
    amount: 3450.00,
    projectCode: 'PRJ-DAL-MED',
    csiCostCode: '01-500 Temporary Scaffolding & Hoist',
    timestamp: 'Today, 09:24 AM',
    receiptStatus: 'AUTO_MATCHED_AI',
    interchangeEarned: 63.82
  },
  {
    id: 'tx-102',
    cardholderName: 'Carlos Ortiz',
    role: 'Lead Journeyman',
    merchantName: 'Home Depot Pro Desk #0541',
    category: 'JOB_SUPPLIES',
    amount: 1820.40,
    projectCode: 'PRJ-DAL-MED',
    csiCostCode: '15-400 Chilled Water Valves & Copper Fittings',
    timestamp: 'Today, 08:15 AM',
    receiptStatus: 'AUTO_MATCHED_AI',
    interchangeEarned: 33.68
  },
  {
    id: 'tx-103',
    cardholderName: 'Marcus Vance',
    role: 'Senior Project Manager',
    merchantName: 'Chevron Commercial Fleet #890',
    category: 'FUEL_FLEET',
    amount: 240.50,
    projectCode: 'PRJ-DAL-MED',
    csiCostCode: '01-100 Field Mobilization & Fleet Fuel',
    timestamp: 'Yesterday, 04:45 PM',
    receiptStatus: 'AUTO_MATCHED_AI',
    interchangeEarned: 4.45
  },
  {
    id: 'tx-104',
    cardholderName: 'Darius Washington',
    role: 'Sheet Metal Foreman',
    merchantName: 'Grainger Industrial Supply',
    category: 'FIELD_TOOLS',
    amount: 980.00,
    projectCode: 'PRJ-DAL-MED',
    csiCostCode: '15-800 Heavy Sheet Metal Duct Fasteners',
    timestamp: 'Yesterday, 02:10 PM',
    receiptStatus: 'AUTO_MATCHED_AI',
    interchangeEarned: 18.13
  }
];

export const CommercialFleetCardWorkspace: React.FC = () => {
  const [transactions, setTransactions] = useState<FleetCardTransaction[]>(INITIAL_TRANSACTIONS);
  const [monthlyCardSpend, setMonthlyCardSpend] = useState<number>(145000);
  const [activeCardsCount, setActiveCardsCount] = useState<number>(24);
  const [virtualCardCreated, setVirtualCardCreated] = useState<string | null>(null);

  const totals = useMemo(() => {
    const totalSpend = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalInterchange = transactions.reduce((sum, tx) => sum + tx.interchangeEarned, 0);
    const annualInterchangeRunRate = (monthlyCardSpend * 0.0185) * 12;

    return {
      totalSpend,
      totalInterchange: Number(totalInterchange.toFixed(2)),
      annualInterchangeRunRate: Math.round(annualInterchangeRunRate)
    };
  }, [transactions, monthlyCardSpend]);

  const handleIssueInstantCard = () => {
    const cardId = `VISA-COMMERCIAL-${Math.floor(1000 + Math.random() * 9000)}`;
    setVirtualCardCreated(`Virtual Commercial Fleet Card issued: ${cardId} (Assigned to PRJ-DAL-MED with $15,000 monthly limit)`);
    setActiveCardsCount(prev => prev + 1);
    setTimeout(() => setVirtualCardCreated(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 text-white shadow-xl border border-emerald-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commercial Fintech Banking &amp; Interchange Engine</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Commercial Smart Fleet Cards &amp; Autonomous Job-Costing</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Issues smart Visa Commercial Fleet cards to project managers, superintendents, and foremen. Swipes at Home Depot, Chevron, and equipment rental yards are instantly categorized to CSI cost codes and AIA G703 line items, generating 1.85% net fintech interchange revenue.
            </p>
          </div>

          <div className="bg-emerald-900/80 backdrop-blur-md rounded-xl p-4 border border-emerald-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-300">Annual Interchange Run-Rate</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${totals.annualInterchangeRunRate.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">1.85% Pure Fintech Revenue</p>
          </div>
        </div>
      </div>

      {virtualCardCreated && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{virtualCardCreated}</span>
        </div>
      )}

      {/* METRIC STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Monthly Card Volume</span>
          <p className="text-xl font-black text-slate-900">${monthlyCardSpend.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Controlled via geofenced project limits</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Active Commercial Cards</span>
          <p className="text-xl font-black text-indigo-700">{activeCardsCount} Cards</p>
          <p className="text-[10px] text-slate-500 font-sans">Physical &amp; Apple Pay Virtual</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">AI Receipt Auto-Match</span>
          <p className="text-xl font-black text-emerald-700">98.4% Match Rate</p>
          <p className="text-[10px] text-slate-500 font-sans">Zero manual expense report filing</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Fintech Net Margin</span>
          <p className="text-xl font-black text-emerald-600">185 bps (1.85%)</p>
          <p className="text-[10px] text-slate-500 font-sans">Interchange revenue share model</p>
        </div>
      </div>

      {/* CARD ISSUANCE & LIVE SPEND TERMINAL */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Commercial Fleet Card Transactions &amp; Autonomous CSI Cost-Coding</span>
            </h3>
            <p className="text-xs text-slate-500">Real-time point-of-sale receipt OCR linked to AIA G703 work breakdown structure</p>
          </div>

          <button
            type="button"
            onClick={handleIssueInstantCard}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Issue New Virtual Fleet Card</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 text-[10px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Cardholder &amp; Role</th>
                <th className="py-3 px-4">Merchant &amp; Category</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4">Assigned CSI Cost Code</th>
                <th className="py-3 px-4 text-center">Receipt Status</th>
                <th className="py-3 px-4 text-right">Interchange</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{tx.cardholderName}</p>
                    <p className="text-[10px] text-slate-500">{tx.role}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{tx.merchantName}</p>
                    <p className="text-[10px] text-slate-500">{tx.timestamp}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">
                    ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                      {tx.csiCostCode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ AI Matched
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                    +${tx.interchangeEarned.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
