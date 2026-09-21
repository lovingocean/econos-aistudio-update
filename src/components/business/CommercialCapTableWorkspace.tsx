import React, { useState } from 'react';
import { 
  PieChart, 
  Layers, 
  Calculator, 
  FileSpreadsheet, 
  TrendingUp, 
  Plus, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Download 
} from 'lucide-react';
import { 
  CapTableShareholder, 
  SafeNoteAgreement, 
  FixedAssetDepreciation, 
  ShareClass 
} from '../../types/enterprise-ops';

const INITIAL_SHAREHOLDERS: CapTableShareholder[] = [
  {
    id: 'sh_01',
    name: 'Meek Ifti',
    stakeholderType: 'FOUNDER',
    shareClass: 'COMMON',
    sharesCount: 4500000,
    ownershipPct: 45.0,
    investedCapitalUsd: 50000,
    currentValuationUsd: 9000000,
    liquidationPreferenceMultiple: 1.0,
    vestedPct: 75.0
  },
  {
    id: 'sh_02',
    name: 'Alex Sterling (Co-Founder)',
    stakeholderType: 'FOUNDER',
    shareClass: 'COMMON',
    sharesCount: 2500000,
    ownershipPct: 25.0,
    investedCapitalUsd: 50000,
    currentValuationUsd: 5000000,
    liquidationPreferenceMultiple: 1.0,
    vestedPct: 75.0
  },
  {
    id: 'sh_03',
    name: 'Sequoia & Horizon Ventures (Series A)',
    stakeholderType: 'INVESTOR',
    shareClass: 'PREFERRED_SERIES_A',
    sharesCount: 1800000,
    ownershipPct: 18.0,
    investedCapitalUsd: 3600000,
    currentValuationUsd: 3600000,
    liquidationPreferenceMultiple: 1.0,
    vestedPct: 100.0
  },
  {
    id: 'sh_04',
    name: 'Unallocated Employee Stock Option Pool (ESOP)',
    stakeholderType: 'EMPLOYEE_POOL',
    shareClass: 'OPTIONS_POOL',
    sharesCount: 1200000,
    ownershipPct: 12.0,
    investedCapitalUsd: 0,
    currentValuationUsd: 2400000,
    liquidationPreferenceMultiple: 0,
    vestedPct: 100.0
  }
];

const INITIAL_SAFES: SafeNoteAgreement[] = [
  {
    id: 'safe_01',
    investorName: 'Apex Angel Syndicate (Techstars)',
    investmentAmountUsd: 250000,
    valuationCapUsd: 15000000,
    discountPct: 20,
    dateSigned: '2026-03-15',
    conversionTriggerStatus: 'OUTSTANDING'
  },
  {
    id: 'safe_02',
    investorName: 'Silicon Valley AI Operators Fund',
    investmentAmountUsd: 500000,
    valuationCapUsd: 18000000,
    discountPct: 15,
    dateSigned: '2026-06-01',
    conversionTriggerStatus: 'OUTSTANDING'
  }
];

const INITIAL_ASSETS: FixedAssetDepreciation[] = [
  {
    id: 'ast_01',
    assetTag: 'AST-GPU-001',
    name: 'NVIDIA H100 GPU Cluster Staging Node (8x)',
    category: 'COMPUTING_HARDWARE',
    purchaseDate: '2026-01-10',
    costBasisUsd: 140000,
    salvageValueUsd: 20000,
    usefulLifeMonths: 36,
    method: 'STRAIGHT_LINE',
    accumulatedDepreciationUsd: 26666,
    currentBookValueUsd: 113334,
    monthlyDepreciationExpenseUsd: 3333,
    generalLedgerAccountId: '1500-Hardware-Assets'
  },
  {
    id: 'ast_02',
    assetTag: 'AST-SRV-002',
    name: 'Enterprise On-Prem Secure HSM Key Node',
    category: 'LAB_EQUIPMENT',
    purchaseDate: '2026-02-15',
    costBasisUsd: 35000,
    salvageValueUsd: 5000,
    usefulLifeMonths: 48,
    method: 'MACRS_5YR',
    accumulatedDepreciationUsd: 4375,
    currentBookValueUsd: 30625,
    monthlyDepreciationExpenseUsd: 625,
    generalLedgerAccountId: '1520-Security-Appliance'
  },
  {
    id: 'ast_03',
    assetTag: 'AST-SW-003',
    name: 'Oracle Enterprise Core Architecture License',
    category: 'ENTERPRISE_SOFTWARE',
    purchaseDate: '2026-03-01',
    costBasisUsd: 48000,
    salvageValueUsd: 0,
    usefulLifeMonths: 24,
    method: 'STRAIGHT_LINE',
    accumulatedDepreciationUsd: 12000,
    currentBookValueUsd: 36000,
    monthlyDepreciationExpenseUsd: 2000,
    generalLedgerAccountId: '1550-Intangible-Software'
  }
];

export const CommercialCapTableWorkspace: React.FC = () => {
  const [shareholders, setShareholders] = useState<CapTableShareholder[]>(INITIAL_SHAREHOLDERS);
  const [safes] = useState<SafeNoteAgreement[]>(INITIAL_SAFES);
  const [assets, setAssets] = useState<FixedAssetDepreciation[]>(INITIAL_ASSETS);
  const [activeTab, setActiveTab] = useState<'CAP_TABLE' | 'DEPRECIATION'>('CAP_TABLE');

  // Cap Table Simulation states
  const [targetNextRoundValuation, setTargetNextRoundValuation] = useState('25000000');
  const [newDilutionAmount, setNewDilutionAmount] = useState('5000000');

  const totalShares = shareholders.reduce((sum, s) => sum + s.sharesCount, 0);
  const totalCostBasis = assets.reduce((sum, a) => sum + a.costBasisUsd, 0);
  const totalBookValue = assets.reduce((sum, a) => sum + a.currentBookValueUsd, 0);
  const totalMonthlyDepreciation = assets.reduce((sum, a) => sum + a.monthlyDepreciationExpenseUsd, 0);

  // Dilution math
  const nextVal = parseFloat(targetNextRoundValuation) || 25000000;
  const newCapital = parseFloat(newDilutionAmount) || 5000000;
  const postMoneyValuation = nextVal + newCapital;
  const newInvestorOwnershipPct = Math.round((newCapital / postMoneyValuation) * 1000) / 10;
  const founderDilutedPct = Math.round(45.0 * (1 - newInvestorOwnershipPct / 100) * 10) / 10;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              EQUITY & CAPEX SUITE
            </span>
            <span className="text-slate-400 text-xs font-mono">• Multi-Class Waterfall & Asset Depreciation</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-amber-600" />
            <span>Cap Table Dilution & Fixed Asset Depreciation Engine</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time equity waterfall ownership, convertible SAFE notes modeling, and US GAAP/MACRS depreciation schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono font-medium">
            <button
              onClick={() => setActiveTab('CAP_TABLE')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'CAP_TABLE' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cap Table & SAFEs
            </button>
            <button
              onClick={() => setActiveTab('DEPRECIATION')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'DEPRECIATION' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fixed Assets & Depreciation ({assets.length})
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: CAP TABLE & SAFES */}
      {activeTab === 'CAP_TABLE' && (
        <div className="space-y-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Fully Diluted Shares</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                {(totalShares || 0).toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">Common & Preferred Pool</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Founder Equity (Meek)</span>
              <div className="text-2xl font-bold font-mono text-amber-700 mt-1">
                45.0%
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">4,500,000 Common Units</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Outstanding SAFEs</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                ${(safes.reduce((sum, s) => sum + (s.investmentAmountUsd || 0), 0) || 0).toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-indigo-600 mt-1 font-medium">2 Notes Pending Conversion</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Post-Series A Valuation</span>
              <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
                $20,000,000
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">$2.00 / Preferred Share</div>
            </div>
          </div>

          {/* Shareholder Breakdown Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-xs font-bold font-mono text-slate-900 uppercase">
                Cap Table Shareholder Ledger
              </h3>
              <span className="text-[11px] font-mono text-slate-500">100.0% Total Equity Accounted</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Stakeholder</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Share Class</th>
                    <th className="p-3">Units</th>
                    <th className="p-3">Ownership</th>
                    <th className="p-3">Vested</th>
                    <th className="p-3">Carrying Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {shareholders.map(sh => (
                    <tr key={sh.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-bold text-slate-900">{sh.name}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {sh.stakeholderType}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{sh.shareClass}</td>
                      <td className="p-3 font-bold">{(sh.sharesCount || 0).toLocaleString()}</td>
                      <td className="p-3 font-bold text-amber-700">{sh.ownershipPct.toFixed(1)}%</td>
                      <td className="p-3 text-slate-600">{sh.vestedPct}%</td>
                      <td className="p-3 font-bold text-slate-900">${(sh.currentValuationUsd || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Next-Round Dilution Simulator */}
          <div className="bg-gradient-to-br from-amber-50/60 via-white to-slate-50 border border-amber-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-700" />
                <h3 className="font-mono font-bold text-sm text-slate-900">
                  Series B Dilution & SAFE Conversion Simulator
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Real-Time Pro-Forma Modeling
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">
                    Pre-Money Target Valuation ($)
                  </label>
                  <input
                    type="number"
                    value={targetNextRoundValuation}
                    onChange={(e) => setTargetNextRoundValuation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">
                    New Capital to Raise ($)
                  </label>
                  <input
                    type="number"
                    value={newDilutionAmount}
                    onChange={(e) => setNewDilutionAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="bg-white/90 border border-amber-100 rounded-xl p-4 space-y-3 font-mono text-xs">
                <div className="text-slate-500 uppercase text-[10px] font-bold">Pro-Forma Post-Money Summary</div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Post-Money Valuation:</span>
                  <strong className="text-slate-900">${(postMoneyValuation || 0).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">New Investor Dilution:</span>
                  <strong className="text-rose-600">{newInvestorOwnershipPct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Founder Retained Equity (Meek):</span>
                  <strong className="text-amber-700">{founderDilutedPct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Founder Stake Value:</span>
                  <strong className="text-emerald-700">${Math.round(((founderDilutedPct || 0) / 100) * (postMoneyValuation || 0)).toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: DEPRECIATION */}
      {activeTab === 'DEPRECIATION' && (
        <div className="space-y-6">
          {/* Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Total CapEx Cost Basis</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                ${(totalCostBasis || 0).toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">Hardware & Software Infrastructure</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Net Book Value (Balance Sheet)</span>
              <div className="text-2xl font-bold font-mono text-indigo-700 mt-1">
                ${(totalBookValue || 0).toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">US GAAP Line 1500</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-mono text-slate-500 uppercase">Monthly Depreciation Run-Rate</span>
              <div className="text-2xl font-bold font-mono text-amber-600 mt-1">
                ${(totalMonthlyDepreciation || 0).toLocaleString()}/mo
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">Auto-Posted to General Ledger</div>
            </div>
          </div>

          {/* Asset List */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-xs font-bold font-mono text-slate-900 uppercase">
                Fixed Assets & Depreciation Schedules
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                Straight-Line & MACRS Active Protocols
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Asset Tag</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Cost Basis</th>
                    <th className="p-3">Accumulated Depr.</th>
                    <th className="p-3">Current Book Value</th>
                    <th className="p-3">Monthly Expense</th>
                    <th className="p-3">GL Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assets.map(ast => (
                    <tr key={ast.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-bold text-slate-900">{ast.assetTag}</td>
                      <td className="p-3 font-medium">{ast.name}</td>
                      <td className="p-3 text-slate-600">{ast.method}</td>
                      <td className="p-3 font-bold">${(ast.costBasisUsd || 0).toLocaleString()}</td>
                      <td className="p-3 text-rose-600">-${(ast.accumulatedDepreciationUsd || 0).toLocaleString()}</td>
                      <td className="p-3 font-bold text-indigo-700">${(ast.currentBookValueUsd || 0).toLocaleString()}</td>
                      <td className="p-3 font-bold text-amber-700">${(ast.monthlyDepreciationExpenseUsd || 0).toLocaleString()}</td>
                      <td className="p-3 text-slate-500">{ast.generalLedgerAccountId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
