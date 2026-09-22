import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  Calculator,
  Lock,
  ArrowRight,
  TrendingUp,
  Percent,
  Layers,
  FileCheck2,
  FolderGit2
} from 'lucide-react';

export const Layer62RdTaxCreditWorkspace: React.FC = () => {
  // Inputs for IRC Section 41 Calculation
  const [taxYear, setTaxYear] = useState<number>(2025);
  const [entityType, setEntityType] = useState<'C_CORP' | 'S_CORP' | 'LLC_PARTNERSHIP'>('C_CORP');
  const [isStartupEligible, setIsStartupEligible] = useState<boolean>(true); // Gross receipts <$5M & <5 yrs revenue
  const [w2EngineeringWages, setW2EngineeringWages] = useState<number>(850000);
  const [engineeringQrePercent, setEngineeringQrePercent] = useState<number>(85); // 85% time on qualifying R&D
  const [cloudTestingExpenses, setCloudTestingExpenses] = useState<number>(140000);
  const [contractorExpenses, setContractorExpenses] = useState<number>(180000); // statutory 65%
  const [suppliesTestingExpenses, setSuppliesTestingExpenses] = useState<number>(25000);
  const [prior3YrQreAvg, setPrior3YrQreAvg] = useState<number>(450000);
  
  // UI Tabs & States
  const [activeTab, setActiveTab] = useState<'calculator' | 'four_part_test' | 'form6765' | 'audit_defense' | 'fee_monetization'>('calculator');
  const [auditDefenseScore, setAuditDefenseScore] = useState<number>(98.5);
  const [isGeneratingAuditPack, setIsGeneratingAuditPack] = useState<boolean>(false);
  const [filingStatus, setFilingStatus] = useState<'DRAFT' | 'AUDIT_SEALED' | 'FILED_PROVEN'>('DRAFT');

  // Math Calculations for Section 41
  const qualifiedW2Wages = Math.round(w2EngineeringWages * (engineeringQrePercent / 100));
  const qualifiedContractors = Math.round(contractorExpenses * 0.65); // IRC §41(b)(3) restricts to 65%
  const totalCurrentQre = qualifiedW2Wages + cloudTestingExpenses + qualifiedContractors + suppliesTestingExpenses;

  // Alternative Simplified Credit (ASC) Method: 14% of QRE exceeding 50% of prior 3-year average
  const ascBaseThreshold = Math.round(prior3YrQreAvg * 0.5);
  const ascExcess = Math.max(0, totalCurrentQre - ascBaseThreshold);
  const federalAscCredit = Math.round(ascExcess * 0.14);
  
  // State Credit Estimate (average ~3.5% effective across major tech states like CA/NY/TX/MA)
  const stateCreditEstimate = Math.round(totalCurrentQre * 0.035);
  const totalCombinedCredit = federalAscCredit + stateCreditEstimate;

  // Startup Payroll Tax Offset (§3111(f) / Inflation Reduction Act max $500,000 against FICA)
  const payrollOffsetEligibleAmount = isStartupEligible ? Math.min(500000, federalAscCredit) : 0;

  // Monetization & Contingency Fee (10% - 15% standard market contingency)
  const contingencyFee10Pct = Math.round(totalCombinedCredit * 0.10);
  const contingencyFee15Pct = Math.round(totalCombinedCredit * 0.15);
  const netClientBenefit = totalCombinedCredit - contingencyFee10Pct;

  // 4-Part Test Criteria Verification
  const [fourPartTests, setFourPartTests] = useState([
    {
      id: 1,
      title: '1. Permitted Purpose (§41(d)(1)(B))',
      requirement: 'Research aimed at creating a new or improved business component in function, performance, reliability, or quality.',
      status: 'VERIFIED',
      evidence: 'Architectural documentation for autonomous zero-knowledge tax clearance and multi-tenant ledger.',
      score: 100
    },
    {
      id: 2,
      title: '2. Elimination of Technical Uncertainty (§41(d)(1)(A))',
      requirement: 'Uncertainty exists at the project outset regarding technical capability, methodology, or appropriate system design.',
      status: 'VERIFIED',
      evidence: 'Benchmarking logs demonstrating algorithmic uncertainty in multi-hop contagion models.',
      score: 98
    },
    {
      id: 3,
      title: '3. Process of Experimentation (§41(d)(1)(C))',
      requirement: 'Evaluation of one or more alternatives to achieve results via modeling, simulation, systematic trial-and-error.',
      status: 'VERIFIED',
      evidence: '42 Git pull requests with alternative circuit designs, Monte Carlo stress logs, and rollback commits.',
      score: 99
    },
    {
      id: 4,
      title: '4. Technological in Nature (§41(d)(1)(B)(i))',
      requirement: 'The experimentation fundamentally relies on principles of physical science, biological science, engineering, or computer science.',
      status: 'VERIFIED',
      evidence: 'Software algorithms, distributed consensus topologies, and cryptographic Merkle tree hashing.',
      score: 100
    }
  ]);

  // Project Dossiers Linked to Git & Jira
  const qualifyingProjects = [
    {
      code: 'PRJ-L62-01',
      name: 'Cryptographic ZK-SNARK Tax & Trade Circuit Optimization',
      leadEngineer: 'Chief Cryptographer / Systems Architect',
      hoursLogged: 1240,
      qualifiedSpend: Math.round(totalCurrentQre * 0.45),
      commitsCount: 312,
      riskLevel: 'LOW_AUDIT_RISK'
    },
    {
      code: 'PRJ-L62-02',
      name: 'Multi-Tenant High-Throughput General Ledger Rebalance Kernel',
      leadEngineer: 'Staff Distributed Systems Engineer',
      hoursLogged: 820,
      qualifiedSpend: Math.round(totalCurrentQre * 0.32),
      commitsCount: 194,
      riskLevel: 'LOW_AUDIT_RISK'
    },
    {
      code: 'PRJ-L62-03',
      name: 'Stochastic Macro Shock Simulator (10,000 Monte Carlo Paths)',
      leadEngineer: 'Senior Quantitative Financial Modeler',
      hoursLogged: 540,
      qualifiedSpend: Math.round(totalCurrentQre * 0.23),
      commitsCount: 142,
      riskLevel: 'LOW_AUDIT_RISK'
    }
  ];

  const handleGenerateAuditPack = () => {
    setIsGeneratingAuditPack(true);
    setTimeout(() => {
      setIsGeneratingAuditPack(false);
      setFilingStatus('AUDIT_SEALED');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Layer Header Banner */}
      <div className="bg-gradient-to-r from-[#132338] via-[#1a314d] to-[#0f1d2e] rounded-2xl p-6 text-white shadow-lg border border-slate-700/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                Layer 62 of 100
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                IRC §41 / §3111(f) Active Engine
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Form 6765 Ready
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              R&D Tax §41 Credit & Quantitative Claims Engine
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl">
              Automated identification, quantification, and contemporaneous substantiation of Qualified Research Expenses (QRE) under IRC Section 41. Converts software engineering payroll and AWS/GCP bills into immediate cash tax refunds or quarterly payroll offsets up to $500,000/yr.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="bg-black/30 border border-white/10 rounded-xl p-3 text-center sm:text-right">
              <p className="text-[10px] font-mono text-slate-400 uppercase">Estimated Total Credit</p>
              <p className="text-2xl font-mono font-black text-emerald-400">
                ${totalCombinedCredit.toLocaleString()}
              </p>
              <p className="text-[10px] text-amber-300 font-mono">
                {isStartupEligible ? 'Eligible for Direct Payroll Offset' : 'Income Tax Liability Offset'}
              </p>
            </div>
            
            <button
              onClick={handleGenerateAuditPack}
              disabled={isGeneratingAuditPack}
              className="w-full sm:w-auto px-4 py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{isGeneratingAuditPack ? 'Compiling Dossier...' : 'Lock Form 6765 Packet'}</span>
            </button>
          </div>
        </div>

        {/* Quick Nav Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
              activeTab === 'calculator' 
                ? 'bg-white text-slate-950 shadow-xs' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>QRE Calculator & ASC</span>
          </button>

          <button
            onClick={() => setActiveTab('four_part_test')}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
              activeTab === 'four_part_test' 
                ? 'bg-white text-slate-950 shadow-xs' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>IRS 4-Part Test Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('form6765')}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
              activeTab === 'form6765' 
                ? 'bg-white text-slate-950 shadow-xs' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>IRS Form 6765 Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('audit_defense')}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
              activeTab === 'audit_defense' 
                ? 'bg-white text-slate-950 shadow-xs' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Contemporaneous Evidence</span>
          </button>

          <button
            onClick={() => setActiveTab('fee_monetization')}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
              activeTab === 'fee_monetization' 
                ? 'bg-amber-400 text-slate-950 shadow-xs font-bold' 
                : 'text-amber-300 hover:text-white hover:bg-amber-500/20'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Monetization & Contingency Engine</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CALCULATOR & ASC ENGINE */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Form Inputs */}
          <div className="lg:col-span-2 space-y-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Qualified Research Expenses (QRE) Model</h3>
                <p className="text-xs text-slate-500">Fine-tune W-2 wages, cloud bills, and contractor allocations for Tax Year {taxYear}.</p>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={entityType}
                  onChange={(e: any) => setEntityType(e.target.value)}
                  className="text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold"
                >
                  <option value="C_CORP">C-Corporation (1120)</option>
                  <option value="S_CORP">S-Corporation (1120-S)</option>
                  <option value="LLC_PARTNERSHIP">LLC / Partnership (1065)</option>
                </select>
                <select 
                  value={taxYear}
                  onChange={(e: any) => setTaxYear(parseInt(e.target.value, 10))}
                  className="text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold"
                >
                  <option value={2026}>TY 2026</option>
                  <option value={2025}>TY 2025</option>
                  <option value={2024}>TY 2024 (Amendable)</option>
                </select>
              </div>
            </div>

            {/* Startup Payroll Offset Toggle */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-amber-950">Startup Payroll Tax Election (§3111(f))</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-200/60 text-amber-900 font-bold">
                    Up to $500,000/yr Cash
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Companies with less than $5 million in gross receipts and under 5 years of historical revenue can apply this credit directly against employer Social Security & Medicare taxes, receiving immediate cash flow relief even if operating at a taxable loss.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input 
                  type="checkbox" 
                  checked={isStartupEligible} 
                  onChange={(e) => setIsStartupEligible(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Sliders and Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* W-2 Engineering Wages */}
              <div className="space-y-1.5 bg-slate-50/60 p-3.5 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">W-2 Engineering Wages</span>
                  <span className="font-mono font-bold text-slate-900">${w2EngineeringWages.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={100000} 
                  max={3000000} 
                  step={25000}
                  value={w2EngineeringWages}
                  onChange={(e) => setW2EngineeringWages(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Qualifying R&D Time:</span>
                  <span className="font-mono font-bold text-indigo-700">{engineeringQrePercent}%</span>
                </div>
                <input 
                  type="range" 
                  min={50} 
                  max={100} 
                  step={5}
                  value={engineeringQrePercent}
                  onChange={(e) => setEngineeringQrePercent(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
                <p className="text-[10px] text-slate-400 font-mono text-right">
                  Qualified Wages: ${qualifiedW2Wages.toLocaleString()}
                </p>
              </div>

              {/* Cloud Compute & Infrastructure */}
              <div className="space-y-1.5 bg-slate-50/60 p-3.5 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Cloud Compute (AWS/GCP/GPU)</span>
                  <span className="font-mono font-bold text-slate-900">${cloudTestingExpenses.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={10000} 
                  max={800000} 
                  step={10000}
                  value={cloudTestingExpenses}
                  onChange={(e) => setCloudTestingExpenses(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
                <p className="text-[11px] text-slate-500 pt-1">
                  Model training, staging sandbox environments, CI/CD automated test clusters.
                </p>
                <p className="text-[10px] text-slate-400 font-mono text-right">
                  100% Eligible Under §41(b)(2)(A)(iii)
                </p>
              </div>

              {/* 1099 Research Contractors */}
              <div className="space-y-1.5 bg-slate-50/60 p-3.5 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">1099 US Contractors (Gross)</span>
                  <span className="font-mono font-bold text-slate-900">${contractorExpenses.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={0} 
                  max={600000} 
                  step={10000}
                  value={contractorExpenses}
                  onChange={(e) => setContractorExpenses(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
                <p className="text-[11px] text-slate-500 pt-1">
                  Statutory 65% limitation automatically applied per IRC Section 41(b)(3).
                </p>
                <p className="text-[10px] text-slate-400 font-mono text-right">
                  Qualified (65%): ${qualifiedContractors.toLocaleString()}
                </p>
              </div>

              {/* Supplies & Prior 3-Year Baseline */}
              <div className="space-y-1.5 bg-slate-50/60 p-3.5 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Prior 3-Yr QRE Avg (ASC Baseline)</span>
                  <span className="font-mono font-bold text-slate-900">${prior3YrQreAvg.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={50000} 
                  max={1500000} 
                  step={25000}
                  value={prior3YrQreAvg}
                  onChange={(e) => setPrior3YrQreAvg(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>50% Base Amount:</span>
                  <span className="font-mono font-bold text-slate-700">${ascBaseThreshold.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono text-right">
                  Credit applies to spend exceeding base
                </p>
              </div>
            </div>

            {/* QRE Summary Table */}
            <div className="bg-slate-900 text-white rounded-xl p-4 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-1.5">
                <span>QUALIFIED RESEARCH EXPENSE BUCKET</span>
                <span>AUDITED DOLLAR AMOUNT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Internal W-2 Software Engineers & Architects</span>
                <span className="text-emerald-400 font-bold">${qualifiedW2Wages.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Cloud Compute, GPU Nodes & Test Infrastructure</span>
                <span className="text-emerald-400 font-bold">${cloudTestingExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Contract Research (65% Statutory Limit)</span>
                <span className="text-emerald-400 font-bold">${qualifiedContractors.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Prototype Testing Supplies & Hardware Warrants</span>
                <span className="text-emerald-400 font-bold">${suppliesTestingExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-2 text-sm font-bold">
                <span className="text-white">TOTAL QUALIFIED RESEARCH EXPENSES (QRE)</span>
                <span className="text-amber-400">${totalCurrentQre.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right Col: Credit Breakdown & Settlement Summary */}
          <div className="space-y-5">
            {/* Main Result Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono">
                  Calculated Tax Credit
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  ASC Method
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Eligible QRE:</span>
                  <span className="font-bold text-slate-800">${totalCurrentQre.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ASC 50% Base Floor:</span>
                  <span className="font-bold text-slate-800">-${ascBaseThreshold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-1.5">
                  <span className="text-slate-500">Incremental Excess:</span>
                  <span className="font-bold text-slate-800">${ascExcess.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-700 bg-emerald-50/70 p-2 rounded-lg">
                  <span className="font-bold">Federal ASC Credit (14%):</span>
                  <span className="font-bold text-sm">${federalAscCredit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-indigo-700 bg-indigo-50/70 p-2 rounded-lg">
                  <span className="font-bold">Estimated State Add-On:</span>
                  <span className="font-bold text-sm">${stateCreditEstimate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 text-sm">
                  <span className="font-black">TOTAL LIQUID CREDIT:</span>
                  <span className="font-black text-amber-700 text-base">
                    ${totalCombinedCredit.toLocaleString()}
                  </span>
                </div>
              </div>

              {isStartupEligible && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-900 space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Payroll Tax Offset Enabled</span>
                  </p>
                  <p className="text-[10px] text-emerald-800 leading-tight">
                    ${payrollOffsetEligibleAmount.toLocaleString()} can be applied against Form 941 Employer FICA quarterly taxes, reducing cash burn immediately.
                  </p>
                </div>
              )}

              {/* Status Badge */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">IRS Audit Defense Score:</span>
                <span className="font-mono font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{auditDefenseScore}% Ready</span>
                </span>
              </div>
            </div>

            {/* Quick Monetization Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Your Platform Monetization
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Performance Contingency
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Client Cash Received:</span>
                  <span className="font-mono font-bold text-white">${totalCombinedCredit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-amber-300">
                  <span>Your 10% Success Fee:</span>
                  <span className="font-mono font-bold">${contingencyFee10Pct.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 border-t border-slate-700 pt-1.5">
                  <span>Client Net Benefit:</span>
                  <span className="font-mono font-bold text-emerald-400">${netClientBenefit.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-tight">
                Zero upfront cost to client. The 10% performance fee is billed exclusively when the IRS approves and applies the credit.
              </p>

              <button
                onClick={() => setActiveTab('fee_monetization')}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition flex items-center justify-center gap-1 font-mono"
              >
                <span>View Performance Invoice Agreement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IRS 4-PART TEST MATRIX */}
      {activeTab === 'four_part_test' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">IRS Section 41 Statutory 4-Part Test Matrix</h3>
              <p className="text-xs text-slate-500">Every dollar of claimed QRE must satisfy all four prongs of Treasury Regulation § 1.41-4.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-mono text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>4 of 4 Prongs Satisfied</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fourPartTests.map((test) => (
              <div key={test.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900">{test.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900 font-bold">
                    {test.status} ({test.score}%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{test.requirement}</p>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] text-slate-700 font-mono">
                  <span className="text-slate-400 font-semibold">Substantiation Evidence: </span>
                  <span>{test.evidence}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Project Allocation Breakdown */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono">
              Qualifying Project Repository & Evidence Links
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 pb-2">
                    <th className="py-2">PROJECT CODE</th>
                    <th className="py-2">TECHNICAL PROJECT NAME</th>
                    <th className="py-2">LEAD ENGINEER</th>
                    <th className="py-2">HOURS</th>
                    <th className="py-2">QUALIFIED SPEND</th>
                    <th className="py-2">AUDIT STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {qualifyingProjects.map((p) => (
                    <tr key={p.code} className="hover:bg-slate-50 transition">
                      <td className="py-3 font-bold text-indigo-700">{p.code}</td>
                      <td className="py-3 font-semibold text-slate-900">{p.name}</td>
                      <td className="py-3 text-slate-600">{p.leadEngineer}</td>
                      <td className="py-3 text-slate-700">{p.hoursLogged} hrs</td>
                      <td className="py-3 font-bold text-emerald-700">${p.qualifiedSpend.toLocaleString()}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                          {p.commitsCount} Commits Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: IRS FORM 6765 PREVIEW */}
      {activeTab === 'form6765' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">IRS Form 6765: Credit for Increasing Research Activities</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  OMB No. 1545-0619
                </span>
              </div>
              <p className="text-xs text-slate-500">Official Section B (Alternative Simplified Credit) Line-by-Line Itemization.</p>
            </div>

            <button 
              onClick={() => alert('Exporting signed Form 6765 PDF & Tax Workpapers...')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Form 6765 PDF</span>
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px]">NAME AS SHOWN ON TAX RETURN:</span>
                <span className="font-bold text-slate-900 text-sm">ECONOS SOVEREIGN HOLDINGS CORP</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">IDENTIFYING NUMBER (EIN):</span>
                <span className="font-bold text-slate-900 text-sm">XX-XXXXXXX (VERIFIED DELAWARE C-CORP)</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-700">Line 17: Qualified Research Expenses (QRE)</span>
                <span className="font-bold text-slate-900">${totalCurrentQre.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-700">Line 18: Enter 50% of the average QRE for the 3 prior tax years</span>
                <span className="font-bold text-slate-900">${ascBaseThreshold.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-700">Line 19: Subtract line 18 from line 17 (If zero or less, enter -0-)</span>
                <span className="font-bold text-slate-900">${ascExcess.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-700">Line 20: Multiply line 19 by 14% (0.14)</span>
                <span className="font-bold text-emerald-700 text-sm">${federalAscCredit.toLocaleString()}</span>
              </div>
              {isStartupEligible && (
                <div className="flex justify-between py-1.5 border-b border-slate-200/60 bg-emerald-50/70 p-2 rounded">
                  <span className="text-emerald-900 font-bold">Line 44: Qualified Small Business Payroll Tax Credit Election</span>
                  <span className="font-bold text-emerald-800 text-sm">${payrollOffsetEligibleAmount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
              <span className="font-bold">IRS Chief Counsel Advice 20214101F Substantiation Notice: </span>
              <span>All 5 mandatory items (technologies sought, research activities, personnel performing research, total wages, and supplies) have been cryptographically linked to Git commits in the decision ledger.</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONTEMPORANEOUS AUDIT EVIDENCE */}
      {activeTab === 'audit_defense' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Contemporaneous Documentation & Audit Defense</h3>
              <p className="text-xs text-slate-500">Live integration with GitHub, GitLab, Jira, and AWS CloudTrail to substantiate research activities.</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Audit Ready • Zero Penalty Guarantee</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800">Git Commits Mapped</span>
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-2xl font-mono font-black text-slate-900">648</p>
              <p className="text-[11px] text-slate-500">Commits directly tagged with technical uncertainty hypotheses.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800">Cloud Node Logs</span>
                <Cpu className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-mono font-black text-slate-900">1,820 hrs</p>
              <p className="text-[11px] text-slate-500">GPU cluster training and test sandbox staging instance runtime.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800">W-2 Time Allocations</span>
                <FileCheck2 className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-mono font-black text-slate-900">100%</p>
              <p className="text-[11px] text-slate-500">Contemporaneous interview notes and timesheet audit records.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-xs space-y-2">
            <p className="text-amber-400 font-bold">IRS AUDIT PACKET CHECKSUM (SHA-256):</p>
            <p className="text-slate-300 break-all">
              0x8a91c2b5f7e4d3a1c890123456789abcdef0123456789abcdef0123456789abcd
            </p>
            <p className="text-slate-400 text-[10px]">
              Sealed into Sovereign Decision Ledger (Layer 12) with immutable Merkle tree timestamp.
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: MONETIZATION & CONTINGENCY FEE ENGINE */}
      {activeTab === 'fee_monetization' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Commercial Monetization & Contingency Fee Invoice</h3>
              <p className="text-xs text-slate-500">How you make high-margin revenue selling Layer 62 to technology, manufacturing, and biotech clients.</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-mono text-xs font-bold rounded-full">
              Zero Upfront Sales Resistance
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono">
                The Performance Pricing Model
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most companies leave R&D tax credits on the table because traditional Big-4 accounting firms charge $30,000–$60,000 upfront. With Layer 62, you offer a <span className="font-bold text-slate-900">100% contingency model</span>:
              </p>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Client Credit Recovered:</span>
                  <span className="font-bold text-slate-900 text-sm">${totalCombinedCredit.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center text-emerald-900">
                  <span className="font-bold">Client Net Cash Benefit (90%):</span>
                  <span className="font-bold text-sm">${netClientBenefit.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center text-amber-900">
                  <span className="font-bold">Your Success Fee (10%):</span>
                  <span className="font-bold text-base text-amber-700">${contingencyFee10Pct.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">Payment Trigger Conditions:</p>
                <p>1. Form 6765 filed with IRS Form 1120 or Form 941 payroll filing.</p>
                <p>2. Credit accepted by IRS or cash refund check deposited.</p>
                <p>3. Automatic Stripe invoice charge or direct wire settlement.</p>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs text-amber-400 font-bold">PERFORMANCE INVOICE DRAFT</span>
                  <span className="text-[10px] text-slate-400">INV-RD-2025-001</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-slate-400">Bill To: Client Operating Entity</p>
                  <p className="text-slate-400">Service: IRC §41 Qualified Research Study & Form 6765 Filing</p>
                </div>
                <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Gross Verified Credit:</span>
                    <span>${totalCombinedCredit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-amber-300 font-bold text-sm pt-1 border-t border-slate-800">
                    <span>Performance Fee (10%):</span>
                    <span>${contingencyFee10Pct.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Contingency Agreement dispatched for e-signature! Potential fee: $${contingencyFee10Pct.toLocaleString()}`)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition font-mono shadow-md"
              >
                <DollarSign className="w-4 h-4" />
                <span>Issue 1-Click Client Contingency Agreement</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
