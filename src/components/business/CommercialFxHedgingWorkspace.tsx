import React, { useState } from 'react';
import { 
  Globe, 
  ArrowRightLeft, 
  ShieldCheck, 
  TrendingDown, 
  TrendingUp, 
  Scale, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  Lock, 
  Download,
  AlertCircle
} from 'lucide-react';
import { 
  CurrencyExposure, 
  FxRateQuote, 
  FxForwardHedgeContract, 
  InternationalTaxNexus, 
  CurrencyCode 
} from '../../types/enterprise-ops';

const INITIAL_RATES: FxRateQuote[] = [
  { pair: 'EUR/USD', baseCurrency: 'EUR', quoteCurrency: 'USD', spotRate: 1.0842, dayChangePct: 0.24, volatility30d: 5.8, updatedAt: 'Just now' },
  { pair: 'GBP/USD', baseCurrency: 'GBP', quoteCurrency: 'USD', spotRate: 1.2980, dayChangePct: -0.15, volatility30d: 6.2, updatedAt: 'Just now' },
  { pair: 'USD/JPY', baseCurrency: 'USD', quoteCurrency: 'JPY', spotRate: 154.20, dayChangePct: 0.42, volatility30d: 8.4, updatedAt: 'Just now' },
  { pair: 'USD/CAD', baseCurrency: 'USD', quoteCurrency: 'CAD', spotRate: 1.3650, dayChangePct: -0.08, volatility30d: 4.1, updatedAt: 'Just now' },
  { pair: 'USD/SGD', baseCurrency: 'USD', quoteCurrency: 'SGD', spotRate: 1.3280, dayChangePct: 0.05, volatility30d: 3.9, updatedAt: 'Just now' },
];

const INITIAL_EXPOSURES: CurrencyExposure[] = [
  {
    currency: 'EUR',
    symbol: '€',
    flag: '🇪🇺',
    balanceInCurrency: 245000,
    usdEquivalent: 265629,
    unhedgedExposurePct: 35,
    hedgedAmountUsd: 172658,
    hedgeRatioPct: 65,
    openReceivablesUsd: 85000,
    openPayablesUsd: 22000,
    riskStatus: 'BALANCED'
  },
  {
    currency: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    balanceInCurrency: 180000,
    usdEquivalent: 233640,
    unhedgedExposurePct: 60,
    hedgedAmountUsd: 93456,
    hedgeRatioPct: 40,
    openReceivablesUsd: 42000,
    openPayablesUsd: 15000,
    riskStatus: 'MODERATE_EXPOSURE'
  },
  {
    currency: 'JPY',
    symbol: '¥',
    flag: '🇯🇵',
    balanceInCurrency: 18500000,
    usdEquivalent: 119974,
    unhedgedExposurePct: 80,
    hedgedAmountUsd: 23995,
    hedgeRatioPct: 20,
    openReceivablesUsd: 35000,
    openPayablesUsd: 8000,
    riskStatus: 'HIGH_EXPOSURE'
  },
  {
    currency: 'CAD',
    symbol: 'C$',
    flag: '🇨🇦',
    balanceInCurrency: 65000,
    usdEquivalent: 47619,
    unhedgedExposurePct: 15,
    hedgedAmountUsd: 40476,
    hedgeRatioPct: 85,
    openReceivablesUsd: 12000,
    openPayablesUsd: 5000,
    riskStatus: 'BALANCED'
  }
];

const INITIAL_CONTRACTS: FxForwardHedgeContract[] = [
  {
    id: 'fwd_01',
    contractNumber: 'FWD-2026-EUR-089',
    currencyPair: 'EUR/USD',
    direction: 'SELL',
    notionalAmountForeign: 150000,
    lockedForwardRate: 1.0910,
    currentSpotRate: 1.0842,
    mtmGainLossUsd: 1020, // In the money
    maturityDate: '2026-11-30',
    status: 'ACTIVE',
    purpose: 'Lock European SaaS contract revenue against EUR depreciation'
  },
  {
    id: 'fwd_02',
    contractNumber: 'FWD-2026-GBP-044',
    currencyPair: 'GBP/USD',
    direction: 'SELL',
    notionalAmountForeign: 75000,
    lockedForwardRate: 1.3050,
    currentSpotRate: 1.2980,
    mtmGainLossUsd: 525,
    maturityDate: '2026-12-15',
    status: 'ACTIVE',
    purpose: 'Hedge London Enterprise SLA contract cash inflows'
  }
];

const INITIAL_NEXUS: InternationalTaxNexus[] = [
  {
    jurisdiction: 'European Union (One-Stop Shop)',
    code: 'EU-OSS',
    taxType: 'VAT',
    standardRatePct: 21.0,
    currentQuarterTaxableSalesUsd: 182400,
    accruedTaxLiabilityUsd: 38304,
    filingDeadline: '2026-10-31',
    status: 'COMPLIANT',
    autoReverseChargeEnabled: true
  },
  {
    jurisdiction: 'United Kingdom (HMRC)',
    code: 'UK-HMRC',
    taxType: 'VAT',
    standardRatePct: 20.0,
    currentQuarterTaxableSalesUsd: 114000,
    accruedTaxLiabilityUsd: 22800,
    filingDeadline: '2026-11-07',
    status: 'COMPLIANT',
    autoReverseChargeEnabled: true
  },
  {
    jurisdiction: 'State of California (CDTFA)',
    code: 'US-CA',
    taxType: 'SALES_TAX',
    standardRatePct: 8.75,
    currentQuarterTaxableSalesUsd: 420000,
    accruedTaxLiabilityUsd: 36750,
    filingDeadline: '2026-10-31',
    status: 'COMPLIANT',
    autoReverseChargeEnabled: false
  },
  {
    jurisdiction: 'Japan (National Tax Agency)',
    code: 'JP-NTA',
    taxType: 'DIGITAL_SERVICES',
    standardRatePct: 10.0,
    currentQuarterTaxableSalesUsd: 94000,
    accruedTaxLiabilityUsd: 9400,
    filingDeadline: '2026-11-30',
    status: 'THRESHOLD_APPROACHING',
    autoReverseChargeEnabled: true
  }
];

export const CommercialFxHedgingWorkspace: React.FC = () => {
  const [rates] = useState<FxRateQuote[]>(INITIAL_RATES);
  const [exposures, setExposures] = useState<CurrencyExposure[]>(INITIAL_EXPOSURES);
  const [contracts, setContracts] = useState<FxForwardHedgeContract[]>(INITIAL_CONTRACTS);
  const [nexusList] = useState<InternationalTaxNexus[]>(INITIAL_NEXUS);
  const [activeTab, setActiveTab] = useState<'EXPOSURES' | 'HEDGES' | 'TAX_NEXUS'>('EXPOSURES');

  // Modal / Quick action state
  const [showNewHedgeModal, setShowNewHedgeModal] = useState(false);
  const [newHedgeCurrency, setNewHedgeCurrency] = useState<CurrencyCode>('JPY');
  const [newHedgeAmount, setNewHedgeAmount] = useState('10000000');
  const [isDeployingHedge, setIsDeployingHedge] = useState(false);

  const totalForeignUsd = exposures.reduce((sum, e) => sum + e.usdEquivalent, 0);
  const totalHedgedUsd = exposures.reduce((sum, e) => sum + e.hedgedAmountUsd, 0);
  const aggregateHedgeRatio = Math.round((totalHedgedUsd / (totalForeignUsd || 1)) * 100);

  const handleCreateHedge = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeployingHedge(true);

    setTimeout(() => {
      const foreignAmt = parseFloat(newHedgeAmount) || 5000000;
      const rateQuote = rates.find(r => r.baseCurrency === newHedgeCurrency || r.quoteCurrency === newHedgeCurrency);
      const spot = rateQuote ? rateQuote.spotRate : 1.0;

      const newContract: FxForwardHedgeContract = {
        id: `fwd_${Date.now()}`,
        contractNumber: `FWD-2026-${newHedgeCurrency}-0${Math.floor(Math.random() * 900) + 100}`,
        currencyPair: `${newHedgeCurrency}/USD`,
        direction: 'SELL',
        notionalAmountForeign: foreignAmt,
        lockedForwardRate: spot,
        currentSpotRate: spot,
        mtmGainLossUsd: 0,
        maturityDate: '2026-12-31',
        status: 'ACTIVE',
        purpose: `Autonomous hedge coverage for ${newHedgeCurrency} volatility risk`
      };

      setContracts(prev => [newContract, ...prev]);

      // Update exposure ratio
      setExposures(prev => prev.map(exp => {
        if (exp.currency === newHedgeCurrency) {
          const addedHedgeUsd = foreignAmt / (spot > 10 ? spot : 1);
          const newHedged = Math.min(exp.usdEquivalent, exp.hedgedAmountUsd + addedHedgeUsd);
          const newRatio = Math.round((newHedged / exp.usdEquivalent) * 100);
          return {
            ...exp,
            hedgedAmountUsd: newHedged,
            hedgeRatioPct: newRatio,
            unhedgedExposurePct: 100 - newRatio,
            riskStatus: newRatio >= 70 ? 'BALANCED' : 'MODERATE_EXPOSURE'
          };
        }
        return exp;
      }));

      setIsDeployingHedge(false);
      setShowNewHedgeModal(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
              GLOBAL TREASURY DESK
            </span>
            <span className="text-slate-400 text-xs font-mono">• Spot FX & Forward Hedging</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-600" />
            <span>Multi-Currency FX Hedging & International Tax Nexus</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time currency pair telemetry, forward derivative protection, cross-border VAT/GST nexus tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewHedgeModal(true)}
            className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deploy FX Forward Contract</span>
          </button>
        </div>
      </div>

      {/* Live FX Rates Bar */}
      <div className="bg-slate-900 text-white rounded-xl p-4 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between gap-6 min-w-[700px]">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold uppercase shrink-0">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Live Spot Matrix</span>
          </div>
          <div className="flex items-center gap-6 flex-1 justify-around">
            {rates.map(rate => (
              <div key={rate.pair} className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400 font-bold">{rate.pair}</span>
                <span className="text-white font-bold">{rate.spotRate.toFixed(4)}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                  rate.dayChangePct >= 0 ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                }`}>
                  {rate.dayChangePct >= 0 ? '+' : ''}{rate.dayChangePct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-mono font-medium">
        <button
          onClick={() => setActiveTab('EXPOSURES')}
          className={`pb-2.5 px-1 border-b-2 transition ${
            activeTab === 'EXPOSURES' ? 'border-cyan-600 text-cyan-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Foreign Currency Exposures ({exposures.length})
        </button>
        <button
          onClick={() => setActiveTab('HEDGES')}
          className={`pb-2.5 px-1 border-b-2 transition ${
            activeTab === 'HEDGES' ? 'border-cyan-600 text-cyan-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Active Forward Contracts ({contracts.length})
        </button>
        <button
          onClick={() => setActiveTab('TAX_NEXUS')}
          className={`pb-2.5 px-1 border-b-2 transition ${
            activeTab === 'TAX_NEXUS' ? 'border-cyan-600 text-cyan-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          International Tax & VAT/GST Nexus ({nexusList.length})
        </button>
      </div>

      {/* TAB 1: CURRENCY EXPOSURES */}
      {activeTab === 'EXPOSURES' && (
        <div className="space-y-6">
          {/* Aggregate Telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Total Foreign Currency AUM</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                ${Math.round(totalForeignUsd || 0).toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                4 Non-USD Currency Denominations
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Hedged Portfolio Ratio</span>
              <div className="text-2xl font-bold font-mono text-cyan-700 mt-1">
                {aggregateHedgeRatio}%
              </div>
              <div className="text-[11px] font-mono text-emerald-600 mt-1 font-medium">
                ${Math.round(totalHedgedUsd || 0).toLocaleString()} Protected via Forwards
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Derivative Net MTM</span>
              <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
                +${(contracts.reduce((sum, c) => sum + (c.mtmGainLossUsd || 0), 0) || 0).toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                Mark-to-Market In-the-Money Gain
              </div>
            </div>
          </div>

          {/* Exposure Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exposures.map(exp => (
              <div key={exp.currency} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{exp.flag}</span>
                    <div>
                      <h3 className="font-mono font-bold text-sm text-slate-900">
                        {exp.currency} Balance ({exp.symbol}{(exp.balanceInCurrency || 0).toLocaleString()})
                      </h3>
                      <span className="text-xs font-mono text-slate-500">
                        USD Equiv: ${Math.round(exp.usdEquivalent || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    exp.riskStatus === 'BALANCED' ? 'bg-emerald-100 text-emerald-800' :
                    exp.riskStatus === 'MODERATE_EXPOSURE' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {exp.riskStatus.replace('_', ' ')}
                  </span>
                </div>

                {/* Hedge Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600">Hedged: <strong>{exp.hedgeRatioPct}%</strong></span>
                    <span className="text-slate-400">Unhedged Risk: <strong>{exp.unhedgedExposurePct}%</strong></span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                    <div 
                      className="bg-cyan-600 h-full transition-all duration-500"
                      style={{ width: `${exp.hedgeRatioPct}%` }}
                    />
                    <div 
                      className="bg-amber-400 h-full transition-all duration-500"
                      style={{ width: `${exp.unhedgedExposurePct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Open Inflow AR:</span>
                    <div className="font-bold text-slate-800">${(exp.openReceivablesUsd || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Open Outflow AP:</span>
                    <div className="font-bold text-slate-800">${(exp.openPayablesUsd || 0).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE FORWARD HEDGES */}
      {activeTab === 'HEDGES' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono text-slate-900 uppercase">
              Active FX Forward Contracts (ISDA Master Compliant)
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              Total Protected Notional: ${contracts.reduce((sum, c) => sum + (c.notionalAmountForeign * (c.lockedForwardRate > 10 ? 1/c.lockedForwardRate : c.lockedForwardRate)), 0).toFixed(0)} USD
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Contract Ref</th>
                  <th className="p-3">Pair & Type</th>
                  <th className="p-3">Notional (Foreign)</th>
                  <th className="p-3">Locked Rate</th>
                  <th className="p-3">Current Spot</th>
                  <th className="p-3">MTM Gain/Loss</th>
                  <th className="p-3">Maturity</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contracts.map(contract => (
                  <tr key={contract.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">{contract.contractNumber}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 font-bold border border-cyan-200">
                        {contract.currencyPair} {contract.direction}
                      </span>
                    </td>
                    <td className="p-3 font-bold">{(contract.notionalAmountForeign || 0).toLocaleString()}</td>
                    <td className="p-3 text-slate-700">{contract.lockedForwardRate.toFixed(4)}</td>
                    <td className="p-3 text-slate-500">{contract.currentSpotRate.toFixed(4)}</td>
                    <td className="p-3 font-bold text-emerald-600">
                      +${(contract.mtmGainLossUsd || 0).toLocaleString()}
                    </td>
                    <td className="p-3 text-slate-600">{contract.maturityDate}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {contract.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: INTERNATIONAL TAX & VAT NEXUS */}
      {activeTab === 'TAX_NEXUS' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold font-mono text-slate-900">Cross-Border VAT/GST Nexus Engine</h3>
                <p className="text-xs text-slate-500">Autonomous digital services tax calculation with B2B reverse-charge exemptions.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded">
              Accrued Cross-Border Tax: ${(nexusList.reduce((sum, n) => sum + (n.accruedTaxLiabilityUsd || 0), 0) || 0).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nexusList.map(item => (
              <div key={item.code} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                      {item.code}
                    </span>
                    <h3 className="font-mono font-bold text-sm text-slate-900 mt-1">{item.jurisdiction}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    item.status === 'COMPLIANT' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Tax Type</span>
                    <div className="font-bold text-slate-800">{item.taxType} ({item.standardRatePct}%)</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Quarter Sales</span>
                    <div className="font-bold text-slate-800">${(item.currentQuarterTaxableSalesUsd || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Accrued Due</span>
                    <div className="font-bold text-indigo-700">${(item.accruedTaxLiabilityUsd || 0).toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Deadline: <strong className="text-slate-800">{item.filingDeadline}</strong></span>
                  <span>B2B Reverse Charge: <strong>{item.autoReverseChargeEnabled ? 'ENABLED' : 'MANUAL'}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Deploy Forward Contract */}
      {showNewHedgeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono font-bold text-sm text-slate-900">Deploy New FX Forward Hedge</h3>
              <button 
                onClick={() => setShowNewHedgeModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateHedge} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Target Currency</label>
                <select
                  value={newHedgeCurrency}
                  onChange={(e) => setNewHedgeCurrency(e.target.value as CurrencyCode)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                >
                  <option value="JPY">JPY - Japanese Yen (¥)</option>
                  <option value="GBP">GBP - British Pound (£)</option>
                  <option value="EUR">EUR - Euro (€)</option>
                  <option value="CAD">CAD - Canadian Dollar (C$)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Notional Foreign Amount</label>
                <input
                  type="number"
                  value={newHedgeAmount}
                  onChange={(e) => setNewHedgeAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>

              <div className="p-3 bg-cyan-50 border border-cyan-100 rounded-lg text-xs font-mono text-cyan-900">
                Locks forward settlement rate through December 31, 2026. Mitigates currency depreciation impact on customer ARR collections.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewHedgeModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeployingHedge}
                  className="px-4 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  {isDeployingHedge ? 'Executing Derivative...' : 'Ratify Forward'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
