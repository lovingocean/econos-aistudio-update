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
  Scale,
  Truck,
  Layers,
  Download,
  Award,
  AlertCircle
} from 'lucide-react';

export const CommercialSection179DTaxWorkspace: React.FC = () => {
  const [activeIrsTab, setActiveIrsTab] = useState<'179D_ENERGY' | 'SECTION_179_EQUIP' | 'FORM_6765_RD' | 'SECTION_45W_FLEET' | 'COST_SEGREGATION' | 'ALTMAN_Z_SCORE'>('179D_ENERGY');
  const [corporateTaxRate, setCorporateTaxRate] = useState<number>(25); // Federal + State %
  const [showExportModal, setShowExportModal] = useState<string | null>(null);

  // ==========================================
  // 1. IRS §179D COMMERCIAL ENERGY TAX DEDUCTION
  // ==========================================
  const [squareFootage, setSquareFootage] = useState<number>(75000);
  const [energyReductionPct, setEnergyReductionPct] = useState<number>(45); // 25% to 50%+
  const [meetsPrevailingWage, setMeetsPrevailingWage] = useState<boolean>(true);
  const [buildingType, setBuildingType] = useState<'GOVERNMENT_MUNICIPAL' | 'COMMERCIAL_PRIVATE'>('GOVERNMENT_MUNICIPAL');
  const [systemCategory, setSystemCategory] = useState<'HVAC_HOT_WATER' | 'INTERIOR_LIGHTING' | 'BUILDING_ENVELOPE'>('HVAC_HOT_WATER');
  const [projectName179D, setProjectName179D] = useState('Dallas Independent School District – High School HVAC Modernization');
  const [allocatedAgency, setAllocatedAgency] = useState('Dallas County Public Works Agency');

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

  // ==========================================
  // 2. IRS §179 & §168(k) EQUIPMENT EXPENSING
  // ==========================================
  // 2026 Limit: $1,250,000 deduction cap, phase-out begins at $3,130,000
  const [equipmentCost, setEquipmentCost] = useState<number>(850000);
  const [equipmentType, setEquipmentType] = useState<'HEAVY_MACHINERY' | 'COMMERCIAL_TRUCKS' | 'HVAC_CRANES' | 'SOFTWARE_HARDWARE'>('HEAVY_MACHINERY');
  const [bonusDeprecPct, setBonusDeprecPct] = useState<number>(60); // 60% in 2026 (or 100% under state conformity)

  const calculation179Equip = useMemo(() => {
    const sec179Cap = 1250000;
    const sec179Deduction = Math.min(equipmentCost, sec179Cap);
    const remainingCost = Math.max(0, equipmentCost - sec179Deduction);
    const bonusDepreciation = Math.round(remainingCost * (bonusDeprecPct / 100));
    const totalFirstYearDeduction = sec179Deduction + bonusDepreciation;
    const directTaxSavings = Math.round(totalFirstYearDeduction * (corporateTaxRate / 100));

    return {
      sec179Deduction,
      remainingCost,
      bonusDepreciation,
      totalFirstYearDeduction,
      directTaxSavings
    };
  }, [equipmentCost, bonusDeprecPct, corporateTaxRate]);

  // ==========================================
  // 3. IRS FORM 6765 / IRC §41 R&D TAX CREDIT
  // ==========================================
  // Construction design, BIM modeling, custom duct fabrication, structural energy modeling
  const [engineeringWages, setEngineeringWages] = useState<number>(380000);
  const [contractorTestingFees, setContractorTestingFees] = useState<number>(120000);
  const [prototypingSupplies, setPrototypingSupplies] = useState<number>(65000);

  const calculation6765RD = useMemo(() => {
    // 65% of third-party contractor costs are qualified
    const qualifiedContractorCosts = Math.round(contractorTestingFees * 0.65);
    const totalQRE = engineeringWages + qualifiedContractorCosts + prototypingSupplies;
    // Alternative Simplified Credit (ASC): 14% of QRE in excess of 50% of historical average (simplified to ~9.8% effective)
    const netFederalCredit = Math.round(totalQRE * 0.098);
    const netStateCredit = Math.round(netFederalCredit * 0.35); // Average state R&D piggyback credit
    const totalDollarCredit = netFederalCredit + netStateCredit;

    return {
      totalQRE,
      netFederalCredit,
      netStateCredit,
      totalDollarCredit // Direct dollar-for-dollar reduction of tax liability
    };
  }, [engineeringWages, contractorTestingFees, prototypingSupplies]);

  // ==========================================
  // 4. IRS §45W COMMERCIAL CLEAN VEHICLE CREDIT
  // ==========================================
  // Up to $7,500 (<14,000 lbs) or $40,000 (>=14,000 lbs heavy trucks)
  const [lightFleetUnits, setLightFleetUnits] = useState<number>(4); // $7,500/unit
  const [heavyFleetUnits, setHeavyFleetUnits] = useState<number>(2); // $40,000/unit

  const calculation45WFleet = useMemo(() => {
    const lightCredit = lightFleetUnits * 7500;
    const heavyCredit = heavyFleetUnits * 40000;
    const totalFleetCredit = lightCredit + heavyCredit;
    return {
      lightCredit,
      heavyCredit,
      totalFleetCredit
    };
  }, [lightFleetUnits, heavyFleetUnits]);

  // ==========================================
  // 5. COST SEGREGATION (39-YR TO 5/15-YR MACRS)
  // ==========================================
  const [facilityAcquisitionCost, setFacilityAcquisitionCost] = useState<number>(4500000);
  const [fiveYearReclassPct, setFiveYearReclassPct] = useState<number>(16); // 16% to 5-year property (specialty wiring, plumbing, carpeting)
  const [fifteenYearReclassPct, setFifteenYearReclassPct] = useState<number>(12); // 12% to 15-year land improvements (parking, fencing, drainage)

  const calculationCostSeg = useMemo(() => {
    const fiveYearAmount = Math.round(facilityAcquisitionCost * (fiveYearReclassPct / 100));
    const fifteenYearAmount = Math.round(facilityAcquisitionCost * (fifteenYearReclassPct / 100));
    const acceleratedBasis = fiveYearAmount + fifteenYearAmount;
    // Year 1 accelerated deduction under 60% bonus
    const yearOneExtraDeduction = Math.round(acceleratedBasis * (bonusDeprecPct / 100));
    const yearOneCashSavings = Math.round(yearOneExtraDeduction * (corporateTaxRate / 100));

    return {
      fiveYearAmount,
      fifteenYearAmount,
      acceleratedBasis,
      yearOneExtraDeduction,
      yearOneCashSavings
    };
  }, [facilityAcquisitionCost, fiveYearReclassPct, fifteenYearReclassPct, bonusDeprecPct, corporateTaxRate]);

  // ==========================================
  // 6. ALTMAN Z''-SCORE CREDIT RISK UNDERWRITER
  // ==========================================
  const [workingCapital, setWorkingCapital] = useState<number>(3400000);
  const [retainedEarnings, setRetainedEarnings] = useState<number>(1950000);
  const [ebit, setEbit] = useState<number>(1200000);
  const [bookEquity, setBookEquity] = useState<number>(4800000);
  const [totalAssets, setTotalAssets] = useState<number>(8500000);
  const [totalLiabilities, setTotalLiabilities] = useState<number>(3700000);

  const altmanZScore = useMemo(() => {
    if (totalAssets <= 0 || totalLiabilities <= 0) return { score: 0, zone: 'DISTRESS', defaultProb: 'High' };

    const x1 = workingCapital / totalAssets;
    const x2 = retainedEarnings / totalAssets;
    const x3 = ebit / totalAssets;
    const x4 = bookEquity / totalLiabilities;

    const score = Number((6.56 * x1 + 3.26 * x2 + 6.72 * x3 + 1.05 * x4).toFixed(2));

    let zone: 'SAFE' | 'GREY' | 'DISTRESS' = 'SAFE';
    let defaultProb = '< 1.2% (Institutional Investment Grade)';
    let color = 'text-emerald-700 bg-emerald-100 border-emerald-300';

    if (score < 1.1) {
      zone = 'DISTRESS';
      defaultProb = '> 65.0% (High Bankruptcy Default Risk)';
      color = 'text-red-700 bg-red-100 border-red-300';
    } else if (score <= 2.6) {
      zone = 'GREY';
      defaultProb = '15.0% - 28.0% (Moderate Caution Zone)';
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

  // GRAND TOTAL OF ALL HARVESTED TAX CREDITS & DEDUCTIONS
  const grandTotalTaxCashHarvested = useMemo(() => {
    return (
      calculation179D.directCashTaxSavings +
      calculation179Equip.directTaxSavings +
      calculation6765RD.totalDollarCredit +
      calculation45WFleet.totalFleetCredit +
      calculationCostSeg.yearOneCashSavings
    );
  }, [calculation179D, calculation179Equip, calculation6765RD, calculation45WFleet, calculationCostSeg]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 text-white shadow-xl border border-emerald-900/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full IRS Federal Statutory Tax Suite (IRA 2026)</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>IRS Federal Tax Harvesting &amp; Credit Master Suite</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                IRC §§ 179D, 179, 168(k), 41 &amp; 45W
              </span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Complete automated federal tax engineering suite for commercial contractors, real estate developers, and trade businesses. Generates legally certified tax deductions, direct energy cash incentives, and IRS Form 179D Allocation Letters.
            </p>
          </div>

          <div className="bg-emerald-900/80 backdrop-blur-md rounded-xl p-4 border border-emerald-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-300">Total Tax Cash Harvested</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${grandTotalTaxCashHarvested.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">Combined Federal &amp; State Liquidity</p>
          </div>
        </div>

        {/* NAVIGATION SUB-TABS */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 border-t border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={() => setActiveIrsTab('179D_ENERGY')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeIrsTab === '179D_ENERGY'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. §179D Energy ($5.65/sqft)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveIrsTab('SECTION_179_EQUIP')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeIrsTab === 'SECTION_179_EQUIP'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>2. §179 &amp; §168(k) Equipment ($1.25M)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveIrsTab('FORM_6765_RD')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeIrsTab === 'FORM_6765_RD'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Form 6765 R&amp;D Credits (§41)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveIrsTab('SECTION_45W_FLEET')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeIrsTab === 'SECTION_45W_FLEET'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>4. §45W Clean Fleet ($40k/Truck)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveIrsTab('COST_SEGREGATION')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeIrsTab === 'COST_SEGREGATION'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>5. Cost Segregation (39→5 Yr)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveIrsTab('ALTMAN_Z_SCORE')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              activeIrsTab === 'ALTMAN_Z_SCORE'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>6. Altman Z''-Score Underwriter</span>
          </button>
        </div>
      </div>

      {/* CORPORATE TAX BENCHMARK BAR */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Percent className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800">Effective Corporate Tax Rate Benchmark:</span>
          <span className="text-xs font-mono font-black text-indigo-700">{corporateTaxRate}% (21% Federal + 4% State)</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="15"
            max="35"
            step="1"
            value={corporateTaxRate}
            onChange={(e) => setCorporateTaxRate(Number(e.target.value))}
            className="w-32 h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
          />
          <button
            type="button"
            onClick={() => setShowExportModal('FULL_PORTFOLIO')}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Full IRS Audit Defense Dossier</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: IRS §179D COMMERCIAL ENERGY TAX DEDUCTION ENGINE */}
      {/* ======================================================== */}
      {activeIrsTab === '179D_ENERGY' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono font-semibold text-slate-700 mb-1">
                  <span>Conditioned Floor Area:</span>
                  <span className="text-indigo-600 font-bold">{squareFootage.toLocaleString()} sq. ft.</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="5000"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono font-semibold text-slate-700 mb-1">
                  <span>ASHRAE 90.1 Energy Reduction Target:</span>
                  <span className="text-emerald-700 font-bold">{energyReductionPct}% (Target: 25% - 50%+)</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="50"
                  step="1"
                  value={energyReductionPct}
                  onChange={(e) => setEnergyReductionPct(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
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
            </div>
          </div>

          {/* FORM 179D GOVERNMENT ALLOCATION LETTER CARD */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">Government Form 179D Allocation Package</h4>
              </div>
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">
                IRS Notice 2008-40
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Project Name:</label>
                <input
                  type="text"
                  value={projectName179D}
                  onChange={(e) => setProjectName179D(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-white text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Public Agency / Government Building Owner:</label>
                <input
                  type="text"
                  value={allocatedAgency}
                  onChange={(e) => setAllocatedAgency(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-white text-slate-900 font-bold"
                />
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] leading-relaxed italic text-slate-600">
                "Under IRC Section 179D(d)(4), the {allocatedAgency} hereby formally allocates the full commercial energy tax deduction of ${calculation179D.totalDeductionAmount.toLocaleString()} to ECONOS Primary Contractor for design and installation of energy-efficient systems."
              </div>

              <button
                type="button"
                onClick={() => setShowExportModal('179D_LETTER')}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Generate Official Form 179D Allocation Letter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: IRS §179 & §168(k) ACCELERATED EQUIPMENT EXPENSING */}
      {/* ======================================================== */}
      {activeIrsTab === 'SECTION_179_EQUIP' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  §179
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Equipment &amp; Machinery Expensing Engine</h3>
                  <p className="text-xs text-slate-500">IRS Section 179 &amp; 168(k) Bonus Depreciation (2026)</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Cap: $1,250,000
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono font-semibold text-slate-700 mb-1">
                  <span>Total Qualified Equipment Purchased:</span>
                  <span className="text-indigo-600 font-bold">${equipmentCost.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2500000"
                  step="25000"
                  value={equipmentCost}
                  onChange={(e) => setEquipmentCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-600 block mb-1">Equipment Category</label>
                  <select
                    value={equipmentType}
                    onChange={(e) => setEquipmentType(e.target.value as any)}
                    className="w-full text-xs font-mono p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800"
                  >
                    <option value="HEAVY_MACHINERY">Excavators &amp; Heavy Earthmovers</option>
                    <option value="COMMERCIAL_TRUCKS">Commercial Work Trucks (&gt;6,000 lbs)</option>
                    <option value="HVAC_CRANES">HVAC Cranes &amp; Sheet Metal Presses</option>
                    <option value="SOFTWARE_HARDWARE">Enterprise Servers &amp; CAD Workstations</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-600 block mb-1">Bonus Depreciation %</label>
                  <select
                    value={bonusDeprecPct}
                    onChange={(e) => setBonusDeprecPct(Number(e.target.value))}
                    className="w-full text-xs font-mono p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800"
                  >
                    <option value={60}>60% Federal Bonus Depreciation</option>
                    <option value={100}>100% State Conformity Bonus</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2.5">
              <div className="flex justify-between items-center text-slate-700">
                <span>Section 179 Immediate Expensing:</span>
                <span className="font-bold text-slate-900">${calculation179Equip.sec179Deduction.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Section 168(k) Bonus Depreciation ({bonusDeprecPct}%):</span>
                <span className="font-bold text-slate-900">${calculation179Equip.bonusDepreciation.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Year 1 Written-Off:</span>
                <span className="text-indigo-700">${calculation179Equip.totalFirstYearDeduction.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-black text-emerald-700 pt-1">
                <span>Cash Tax Money Saved:</span>
                <span>${calculation179Equip.directTaxSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">IRS Section 179 Audit Defense Summary</h4>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Under Section 179, businesses can deduct the full purchase price of qualifying equipment and software purchased or financed during the tax year. Instead of writing off an asset through depreciation over 5 to 7 years, you write off the entire purchase in Year 1.
              </p>
              <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 font-mono text-[11px]">
                ✓ Eliminates taxable net income dollar-for-dollar up to $1,250,000 threshold.
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-[11px]">
                ✓ Qualified vehicles over 6,000 lbs GVWR are exempt from passenger automobile luxury caps.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: IRS FORM 6765 / IRC §41 R&D TAX CREDITS */}
      {/* ======================================================== */}
      {activeIrsTab === 'FORM_6765_RD' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  §41
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Construction R&amp;D Tax Credit Harvester</h3>
                  <p className="text-xs text-slate-500">IRS Form 6765 (Increasing Research Activities)</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Dollar-for-Dollar Credit
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-600 text-[11px] block mb-1">
                  Engineers &amp; CAD/BIM Designers W-2 Wages ($):
                </label>
                <input
                  type="number"
                  value={engineeringWages}
                  onChange={(e) => setEngineeringWages(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="text-slate-600 text-[11px] block mb-1">
                  Third-Party Engineering &amp; Testing Fees ($):
                </label>
                <input
                  type="number"
                  value={contractorTestingFees}
                  onChange={(e) => setContractorTestingFees(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
                />
                <span className="text-[10px] text-slate-500">Statutory 65% IRS inclusion rule applied</span>
              </div>

              <div>
                <label className="text-slate-600 text-[11px] block mb-1">
                  Prototyping &amp; Custom Fabrication Supplies ($):
                </label>
                <input
                  type="number"
                  value={prototypingSupplies}
                  onChange={(e) => setPrototypingSupplies(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-200 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-700">
                <span>Total Qualified Research Expenses (QRE):</span>
                <span className="font-bold text-slate-900">${calculation6765RD.totalQRE.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Federal R&amp;D Tax Credit (ASC Method):</span>
                <span className="font-bold text-slate-900">${calculation6765RD.netFederalCredit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>State R&amp;D Piggyback Credit:</span>
                <span className="font-bold text-slate-900">${calculation6765RD.netStateCredit.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-emerald-300 flex justify-between items-center text-base font-black text-emerald-800">
                <span>Total Dollar-for-Dollar Tax Credit:</span>
                <span>${calculation6765RD.totalDollarCredit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">4-Part IRS Statutory Qualification Test</h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-800">1. Permitted Purpose:</p>
                <p className="text-[11px] text-slate-500">Designing new or improved mechanical, electrical, or structural systems.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-800">2. Technological in Nature:</p>
                <p className="text-[11px] text-slate-500">Relies on engineering, physics, thermodynamics, and computer science.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-800">3. Elimination of Uncertainty:</p>
                <p className="text-[11px] text-slate-500">Overcoming structural load, air volume, or thermal heat loss challenges.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-800">4. Process of Experimentation:</p>
                <p className="text-[11px] text-slate-500">CAD 3D modeling, energy load simulations, and iterative prototyping.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: IRS §45W COMMERCIAL CLEAN VEHICLE FLEET CREDIT */}
      {/* ======================================================== */}
      {activeIrsTab === 'SECTION_45W_FLEET' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  §45W
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Commercial Clean Fleet Credit Calculator</h3>
                  <p className="text-xs text-slate-500">IRS IRC Section 45W (Inflation Reduction Act)</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Up to $40,000 / Truck
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-600 text-[11px] block mb-1">
                  Light-Duty Clean Work Vans / Trucks (&lt;14,000 lbs) – $7,500/unit:
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={lightFleetUnits}
                  onChange={(e) => setLightFleetUnits(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="text-slate-600 text-[11px] block mb-1">
                  Heavy-Duty Electric Bucket / Flatbed Trucks (≥14,000 lbs) – $40,000/unit:
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={heavyFleetUnits}
                  onChange={(e) => setHeavyFleetUnits(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-200 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-700">
                <span>Light-Duty Credit ({lightFleetUnits} units @ $7,500):</span>
                <span className="font-bold text-slate-900">${calculation45WFleet.lightCredit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Heavy-Duty Credit ({heavyFleetUnits} units @ $40,000):</span>
                <span className="font-bold text-slate-900">${calculation45WFleet.heavyCredit.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-emerald-300 flex justify-between items-center text-base font-black text-emerald-800">
                <span>Total Direct Tax Credit Harvested:</span>
                <span>${calculation45WFleet.totalFleetCredit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">IRS §45W Fleet Rules</h4>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Unlike personal EV credits, Section 45W has <strong>NO North American final assembly requirement</strong> and <strong>NO income or battery sourcing phase-outs</strong> for commercial businesses.
              </p>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-[11px]">
                ✓ Credit is 30% of the vehicle basis or incremental cost over gas equivalent (capped at $40,000 for Class 4-8 heavy vehicles).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: COST SEGREGATION (39-YR TO 5/15-YR RECLASSIFICATION) */}
      {/* ======================================================== */}
      {activeIrsTab === 'COST_SEGREGATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  MACRS
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Engineering Cost Segregation Study</h3>
                  <p className="text-xs text-slate-500">Accelerates 39-Year Building Depreciation into Year 1</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Frontloaded Write-off
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-600 text-[11px] block mb-1">
                  Facility Acquisition / Construction Cost Basis ($):
                </label>
                <input
                  type="number"
                  value={facilityAcquisitionCost}
                  onChange={(e) => setFacilityAcquisitionCost(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 text-[11px] block mb-1">5-Year Property Reclass %</label>
                  <input
                    type="number"
                    value={fiveYearReclassPct}
                    onChange={(e) => setFiveYearReclassPct(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Specialty power, HVAC wiring, data cabling</span>
                </div>

                <div>
                  <label className="text-slate-600 text-[11px] block mb-1">15-Year Land Improv %</label>
                  <input
                    type="number"
                    value={fifteenYearReclassPct}
                    onChange={(e) => setFifteenYearReclassPct(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-bold"
                  />
                  <span className="text-[10px] text-slate-500">Paving, lighting, security fencing</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-700">
                <span>5-Year Reclassified Assets:</span>
                <span className="font-bold text-slate-900">${calculationCostSeg.fiveYearAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>15-Year Reclassified Assets:</span>
                <span className="font-bold text-slate-900">${calculationCostSeg.fifteenYearAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Total Accelerated Basis Reclassified:</span>
                <span className="font-bold text-indigo-700">${calculationCostSeg.acceleratedBasis.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-emerald-700">
                <span>Year 1 Net Cash Tax Savings:</span>
                <span>${calculationCostSeg.yearOneCashSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Why Cost Segregation is Essential</h4>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Standard IRS rules force commercial real estate to be depreciated over 39 long years (only ~2.5% per year). A certified engineering Cost Segregation study breaks out 20% to 35% of the building into 5-year and 15-year buckets, allowing immediate expensing under bonus depreciation!
              </p>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-[11px]">
                ✓ Frees up hundreds of thousands of dollars in immediate cash flow for capital reinvestment.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: ALTMAN Z''-SCORE CREDIT RISK UNDERWRITER */}
      {/* ======================================================== */}
      {activeIrsTab === 'ALTMAN_Z_SCORE' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Credit Risk Thresholds</h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-800 font-mono">Z'' &gt; 2.60: SAFE ZONE</span>
                <p className="text-[11px] text-slate-600 mt-1">Excellent balance sheet health. Negligible probability of default. Prime factoring candidate.</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-800 font-mono">1.10 ≤ Z'' ≤ 2.60: GREY ZONE</span>
                <p className="text-[11px] text-slate-600 mt-1">Caution advised. Require joint check agreements and statutory lien waivers before milestone funding.</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <span className="font-bold text-red-800 font-mono">Z'' &lt; 1.10: DISTRESS ZONE</span>
                <p className="text-[11px] text-slate-600 mt-1">Imminent insolvency risk (&gt;65% default probability within 24 months). Mandatory escrow custody required.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT / PRINT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {showExportModal === '179D_LETTER' ? 'Official Form 179D Allocation Letter' : 'Federal Tax Audit Defense Dossier'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <p className="font-bold text-slate-900">IRS Audit Defense Certificate</p>
              <p className="text-slate-600">
                Project: {projectName179D}<br />
                Agency: {allocatedAgency}<br />
                Statutory Deduction: ${calculation179D.totalDeductionAmount.toLocaleString()} (${calculation179D.ratePerSqFt}/sq.ft.)<br />
                Net Cash Value: ${calculation179D.directCashTaxSavings.toLocaleString()}<br />
                Total Combined Portfolio Cash Harvested: ${grandTotalTaxCashHarvested.toLocaleString()}
              </p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-600 italic">
                "Certified under penalties of perjury that the systems meet ASHRAE Standard 90.1 energy savings targets and federal prevailing wage and apprenticeship requirements under IRC § 179D(b)(2)."
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
              <button
                type="button"
                onClick={() => setShowExportModal(null)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
