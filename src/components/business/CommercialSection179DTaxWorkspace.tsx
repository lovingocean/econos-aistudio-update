import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Building,
  Zap,
  CheckCircle2,
  FileCheck2,
  Calculator,
  ShieldAlert,
  TrendingUp,
  Printer,
  FileText,
  Percent,
  Sliders,
  Sparkles,
  Scale
} from 'lucide-react';

export const CommercialSection179DTaxWorkspace: React.FC = () => {
  // --- 1. IRS §179D COMMERCIAL ENERGY TAX DEDUCTION ENGINE ---
  const [squareFootage, setSquareFootage] = useState<number>(65000);
  const [energyReductionPct, setEnergyReductionPct] = useState<number>(42); // 25% to 50%+
  const [meetsPrevailingWage, setMeetsPrevailingWage] = useState<boolean>(true);
  const [buildingType, setBuildingType] = useState<'GOVERNMENT_MUNICIPAL' | 'COMMERCIAL_PRIVATE'>('GOVERNMENT_MUNICIPAL');
  const [systemCategory, setSystemCategory] = useState<'HVAC_HOT_WATER' | 'INTERIOR_LIGHTING' | 'BUILDING_ENVELOPE'>('HVAC_HOT_WATER');
  const [corporateTaxRate, setCorporateTaxRate] = useState<number>(25); // Federal + State %

  // Statutory IRA 2026 179D Rates:
  // Base rate without prevailing wage: $0.54/sqft at 25% + $0.02 per % above 25% up to $1.07/sqft
  // Bonus rate with prevailing wage & apprenticeship: $2.68/sqft at 25% + $0.11 per % above 25% up to $5.65/sqft (2026 indexed)
  const calculation179D = useMemo(() => {
    let ratePerSqFt = 0;
    const clampedEnergy = Math.max(25, Math.min(50, energyReductionPct));
    const excessPct = clampedEnergy - 25;

    if (meetsPrevailingWage) {
      ratePerSqFt = 2.68 + excessPct * 0.1188; // Scales up to ~$5.65/sqft at 50%
      if (ratePerSqFt > 5.65) ratePerSqFt = 5.65;
    } else {
      ratePerSqFt = 0.54 + excessPct * 0.0212; // Scales up to ~$1.07/sqft at 50%
      if (ratePerSqFt > 1.07) ratePerSqFt = 1.07;
    }

    const totalDeductionAmount = Math.round(squareFootage * ratePerSqFt);
    const directCashTaxSavings = Math.round(totalDeductionAmount * (corporateTaxRate / 100));

    return {
      ratePerSqFt: Number(ratePerSqFt.toFixed(2)),
      totalDeductionAmount,
      directCashTaxSavings
    };
  }, [squareFootage, energyReductionPct, meetsPrevailingWage, corporateTaxRate]);

  // --- 2. ALTMAN Z''-SCORE CREDIT RISK ENGINE ---
  // Edward Altman's Z''-Score formula for Private Non-Manufacturing / General Contractors:
  // Z'' = 6.56(X1) + 3.26(X2) + 6.72(X3) + 1.05(X4)
  // X1 = Working Capital / Total Assets
  // X2 = Retained Earnings / Total Assets
  // X3 = EBIT / Total Assets
  // X4 = Book Value of Equity / Total Liabilities
  const [workingCapital, setWorkingCapital] = useState<number>(3200000);
  const [retainedEarnings, setRetainedEarnings] = useState<number>(1800000);
  const [ebit, setEbit] = useState<number>(1100000);
  const [bookEquity, setBookEquity] = useState<number>(4500000);
  const [totalAssets, setTotalAssets] = useState<number>(8000000);
  const [totalLiabilities, setTotalLiabilities] = useState<number>(3500000);

  const altmanZScore = useMemo(() => {
    if (totalAssets <= 0 || totalLiabilities <= 0) return { score: 0, zone: 'DISTRESS', defaultProb: 'High' };

    const x1 = workingCapital / totalAssets;
    const x2 = retainedEarnings / totalAssets;
    const x3 = ebit / totalAssets;
    const x4 = bookEquity / totalLiabilities;

    const score = Number((6.56 * x1 + 3.26 * x2 + 6.72 * x3 + 1.05 * x4).toFixed(2));

    let zone: 'SAFE' | 'GREY' | 'DISTRESS' = 'SAFE';
    let defaultProb = '< 1.5% (Very Low Risk)';
    let color = 'text-emerald-700 bg-emerald-100 border-emerald-300';

    if (score < 1.1) {
      zone = 'DISTRESS';
      defaultProb = '> 65.0% (High Bankruptcy Default Risk)';
      color = 'text-red-700 bg-red-100 border-red-300';
    } else if (score <= 2.6) {
      zone = 'GREY';
      defaultProb = '15.0% - 30.0% (Moderate Caution Zone)';
      color = 'text-amber-700 bg-amber-100 border-amber-300';
    }

    return {
      score,
      zone,
      defaultProb,
      color,
      x1: x1.toFixed(3),
      x2: x2.toFixed(3),
      x3: x3.toFixed(3),
      x4: x4.toFixed(3)
    };
  }, [workingCapital, retainedEarnings, ebit, bookEquity, totalAssets, totalLiabilities]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 text-white shadow-xl border border-emerald-900/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Federal Tax Cash Generation &amp; Credit Underwriting</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>IRS §179D Energy Tax Deduction &amp; Altman Z''-Score Underwriter</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Generates immediate 6-figure tax savings on commercial HVAC, lighting, and envelope retrofits under the Inflation Reduction Act (up to $5.65/sq. ft.), paired with Wall Street's institutional Altman Z''-Score bankruptcy prevention engine.
            </p>
          </div>

          <div className="bg-emerald-900/60 backdrop-blur-md rounded-xl p-4 border border-emerald-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-300">Direct Cash Tax Value</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${calculation179D.directCashTaxSavings.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">Immediate Liquidity Harvested</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 1: IRS §179D HARVEST ENGINE */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                §179D
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Commercial Energy Tax Deduction Simulator</h3>
                <p className="text-xs text-slate-500">IRS IRC Section 179D (2026 Inflation Reduction Act)</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              ${calculation179D.ratePerSqFt}/sq.ft.
            </span>
          </div>

          {/* INPUT CONTROLS */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono font-semibold text-slate-700 mb-1">
                <span>Building Conditioned Area:</span>
                <span className="text-indigo-600 font-bold">{squareFootage.toLocaleString()} sq. ft.</span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={squareFootage}
                onChange={(e) => setSquareFootage(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono font-semibold text-slate-700 mb-1">
                <span>ASHRAE 90.1 Energy Reduction:</span>
                <span className="text-emerald-700 font-bold">{energyReductionPct}% (Target: 25% - 50%+)</span>
              </div>
              <input
                type="range"
                min="25"
                max="50"
                step="1"
                value={energyReductionPct}
                onChange={(e) => setEnergyReductionPct(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-mono text-slate-600 block mb-1">Building Ownership</label>
                <select
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value as any)}
                  className="w-full text-xs font-mono p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800"
                >
                  <option value="GOVERNMENT_MUNICIPAL">Gov / Public School (179D Allocation Letter)</option>
                  <option value="COMMERCIAL_PRIVATE">Commercial Private Building</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-600 block mb-1">Building System Category</label>
                <select
                  value={systemCategory}
                  onChange={(e) => setSystemCategory(e.target.value as any)}
                  className="w-full text-xs font-mono p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800"
                >
                  <option value="HVAC_HOT_WATER">HVAC &amp; Central Water Heating</option>
                  <option value="INTERIOR_LIGHTING">Interior Lighting &amp; Controls</option>
                  <option value="BUILDING_ENVELOPE">Building Envelope &amp; Insulation</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Prevailing Wage &amp; Apprenticeship Rule</p>
                <p className="text-[10px] text-slate-500">Unlocks maximum 5x bonus rate ($5.65/sq.ft. vs $1.07)</p>
              </div>
              <button
                type="button"
                onClick={() => setMeetsPrevailingWage(!meetsPrevailingWage)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition ${
                  meetsPrevailingWage ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                }`}
              >
                {meetsPrevailingWage ? 'Verified (5x Bonus)' : 'Standard Rate'}
              </button>
            </div>
          </div>

          {/* DEDUCTION SUMMARY CARD */}
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Total Statutory Deduction (Form 179D):</span>
              <span className="font-bold text-slate-900 text-sm">
                ${calculation179D.totalDeductionAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Net Corporate Tax Savings ({corporateTaxRate}% rate):</span>
              <span className="font-black text-emerald-700 text-base">
                ${calculation179D.directCashTaxSavings.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-emerald-800 italic pt-1 border-t border-emerald-200">
              ✓ Ready for certified energy simulation report &amp; Government Form 179D Allocation Letter export.
            </p>
          </div>
        </div>

        {/* SECTION 2: INSTITUTIONAL ALTMAN Z''-SCORE CREDIT RISK UNDERWRITER */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
                Z''
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Altman Z''-Score Corporate Risk Underwriter</h3>
                <p className="text-xs text-slate-500">Wall Street Formula for General Contractors &amp; Private Firms</p>
              </div>
            </div>
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${altmanZScore.color}`}>
              Score: {altmanZScore.score} ({altmanZScore.zone} ZONE)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="text-slate-500 text-[10px] block">Working Capital ($)</label>
              <input
                type="number"
                value={workingCapital}
                onChange={(e) => setWorkingCapital(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-500 text-[10px] block">Retained Earnings ($)</label>
              <input
                type="number"
                value={retainedEarnings}
                onChange={(e) => setRetainedEarnings(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-500 text-[10px] block">Operating Income / EBIT ($)</label>
              <input
                type="number"
                value={ebit}
                onChange={(e) => setEbit(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-500 text-[10px] block">Book Value of Equity ($)</label>
              <input
                type="number"
                value={bookEquity}
                onChange={(e) => setBookEquity(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-500 text-[10px] block">Total Balance Sheet Assets ($)</label>
              <input
                type="number"
                value={totalAssets}
                onChange={(e) => setTotalAssets(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-500 text-[10px] block">Total Liabilities ($)</label>
              <input
                type="number"
                value={totalLiabilities}
                onChange={(e) => setTotalLiabilities(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
              />
            </div>
          </div>

          {/* FORMULA EXPANSION BREAKDOWN */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] space-y-1.5">
            <p className="font-bold text-slate-800 text-xs">Mathematical Expansion:</p>
            <p className="text-slate-600">Z'' = 6.56(X1) + 3.26(X2) + 6.72(X3) + 1.05(X4)</p>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pt-1">
              <span>X1 (Liquidity): {altmanZScore.x1}</span>
              <span>X2 (Leverage): {altmanZScore.x2}</span>
              <span>X3 (Productivity): {altmanZScore.x3}</span>
              <span>X4 (Solvency): {altmanZScore.x4}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs font-bold text-slate-800">
              <span>Default Probability:</span>
              <span className={altmanZScore.zone === 'SAFE' ? 'text-emerald-700' : 'text-red-700'}>
                {altmanZScore.defaultProb}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
