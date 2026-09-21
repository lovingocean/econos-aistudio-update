import React, { useState, useEffect, useMemo } from 'react';
import { 
  CashFlowForecastResponse, 
  CashFlowScenarioMode, 
  CashFlowSimulationParams 
} from '../../types/cashflow';
import { api } from '../../api/client';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  Clock, 
  ChevronRight, 
  BarChart3, 
  Percent, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  HelpCircle,
  FileText,
  Receipt
} from 'lucide-react';

const SCENARIO_PRESETS: Record<CashFlowScenarioMode, { label: string; desc: string; params: CashFlowSimulationParams }> = {
  BASE_CASE: {
    label: 'Standard Base Case',
    desc: 'Contractual payment terms and projected organic 2% monthly revenue expansion.',
    params: {
      collectionDelayDays: 0,
      expenseInflationPct: 0,
      revenueGrowthMoM: 0.02,
      capexOutflowNextQuarter: 0,
      emergencyReserveFloor: 50000
    }
  },
  CONSERVATIVE_STRESS: {
    label: 'Macro Stress Test',
    desc: 'Customer payments delayed by 30 days, vendor costs inflated by 12%, flat demand.',
    params: {
      collectionDelayDays: 30,
      expenseInflationPct: 12,
      revenueGrowthMoM: -0.01,
      capexOutflowNextQuarter: 15000,
      emergencyReserveFloor: 75000
    }
  },
  AGGRESSIVE_GROWTH: {
    label: 'Rapid Expansion',
    desc: 'Accelerating enterprise contract wins (+8% MoM) with expedited receivables.',
    params: {
      collectionDelayDays: 0,
      expenseInflationPct: 5,
      revenueGrowthMoM: 0.08,
      capexOutflowNextQuarter: 25000,
      emergencyReserveFloor: 50000
    }
  },
  DELAYED_RECEIVABLES: {
    label: '45-Day Customer Float',
    desc: 'Accounts receivable collection friction testing working capital buffer.',
    params: {
      collectionDelayDays: 45,
      expenseInflationPct: 0,
      revenueGrowthMoM: 0.01,
      capexOutflowNextQuarter: 0,
      emergencyReserveFloor: 50000
    }
  },
  CUSTOM: {
    label: 'Custom Sensitivity',
    desc: 'Bespoke parameters configured via the sensitivity matrix sliders.',
    params: {
      collectionDelayDays: 15,
      expenseInflationPct: 5,
      revenueGrowthMoM: 0.03,
      capexOutflowNextQuarter: 0,
      emergencyReserveFloor: 50000
    }
  }
};

export const CommercialCashFlowWorkspace: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<CashFlowScenarioMode>('BASE_CASE');
  const [params, setParams] = useState<CashFlowSimulationParams>(SCENARIO_PRESETS.BASE_CASE.params);
  const [forecast, setForecast] = useState<CashFlowForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'TRAJECTORY' | 'DAILY_SCHEDULE' | 'MONTE_CARLO'>('TRAJECTORY');

  const fetchForecast = async (overrideParams?: CashFlowSimulationParams) => {
    try {
      setLoading(true);
      setError(null);
      const activeP = overrideParams || params;
      const data = await api.getCashFlowForecast(activeP);
      setForecast(data);
    } catch (err: any) {
      console.error('Failed to compute cash flow forecast', err);
      setError(err.message || 'Error running cash flow simulation engine.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast(params);
  }, []);

  const handleSelectScenario = (mode: CashFlowScenarioMode) => {
    setActiveScenario(mode);
    const preset = SCENARIO_PRESETS[mode].params;
    setParams(preset);
    fetchForecast(preset);
  };

  const handleParamChange = (field: keyof CashFlowSimulationParams, val: number) => {
    setActiveScenario('CUSTOM');
    const updated = { ...params, [field]: val };
    setParams(updated);
  };

  const handleApplyCustomParams = () => {
    fetchForecast(params);
  };

  // SVG Chart Calculations
  const chartData = useMemo(() => {
    if (!forecast || !forecast.monthlyProjections.length) return null;

    const projections = forecast.monthlyProjections;
    const allValues = [
      ...projections.map(p => p.endingCash),
      ...projections.map(p => p.p90EndingCash),
      ...projections.map(p => p.p10EndingCash),
      params.emergencyReserveFloor,
      0
    ];

    const minVal = Math.min(...allValues);
    const maxVal = Math.max(...allValues) * 1.08;
    const range = maxVal - minVal || 1;

    const width = 800;
    const height = 280;
    const padX = 60;
    const padY = 30;
    const plotWidth = width - padX * 2;
    const plotHeight = height - padY * 2;

    const getX = (idx: number) => padX + (idx / (projections.length - 1)) * plotWidth;
    const getY = (val: number) => padY + plotHeight - ((val - minVal) / range) * plotHeight;

    const medianPoints = projections.map((p, i) => `${getX(i)},${getY(p.endingCash)}`).join(' ');
    const p90Points = projections.map((p, i) => `${getX(i)},${getY(p.p90EndingCash)}`).join(' ');
    const p10Points = projections.map((p, i) => `${getX(i)},${getY(p.p10EndingCash)}`).join(' ');

    // Area between P90 and P10
    const areaPoints = [
      ...projections.map((p, i) => `${getX(i)},${getY(p.p90EndingCash)}`),
      ...projections.map((p, i) => `${getX(projections.length - 1 - i)},${getY(projections[projections.length - 1 - i].p10EndingCash)}`)
    ].join(' ');

    const floorY = getY(params.emergencyReserveFloor);
    const zeroY = getY(0);

    return {
      width,
      height,
      minVal,
      maxVal,
      getX,
      getY,
      medianPoints,
      p90Points,
      p10Points,
      areaPoints,
      floorY,
      zeroY,
      projections
    };
  }, [forecast, params.emergencyReserveFloor]);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
            <span>Business Layer</span>
            <ChevronRight className="w-3 h-3" />
            <span>Treasury & Working Capital</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-emerald-600 font-bold">Cash Flow & Runway Engine</span>
          </div>
          <h2 className="text-xl font-bold font-serif text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Commercial Cash Flow & Monte Carlo Runway Simulator
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Consolidates live Accounts Receivable (inflow) and Accounts Payable (disbursements) to predict working capital horizons and solvency probabilities across 1,000 stochastic paths.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchForecast()}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-mono font-medium hover:bg-slate-50 transition shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-simulate (1,000 Paths)</span>
          </button>
        </div>
      </div>

      {/* Scenario Presets Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
        <div className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span>Active Simulation Scenario Model</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(SCENARIO_PRESETS) as CashFlowScenarioMode[]).map(mode => {
            const preset = SCENARIO_PRESETS[mode];
            const isSelected = activeScenario === mode;
            return (
              <button
                key={mode}
                onClick={() => handleSelectScenario(mode)}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                  isSelected 
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold font-mono ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                      {preset.label}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {preset.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Telemetry Metrics */}
      {forecast && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Liquid Cash On Hand */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-mono font-medium uppercase tracking-wider">Current Liquid Capital</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900">
              ${forecast.currentLiquidCash.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              Authoritative bank & treasury reserves
            </div>
          </div>

          {/* 30-Day Net Cash Flow */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-mono font-medium uppercase tracking-wider">30-Day Net Operating Flow</span>
              {forecast.projected30DayNet >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-rose-600" />
              )}
            </div>
            <div className={`text-2xl font-bold font-mono ${
              forecast.projected30DayNet >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}>
              {forecast.projected30DayNet >= 0 ? '+' : ''}
              ${forecast.projected30DayNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              AR Collections minus AP Outflows
            </div>
          </div>

          {/* Median Runway Months */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-mono font-medium uppercase tracking-wider">Median Projected Runway</span>
              <Clock className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-sky-900">
              {forecast.monteCarlo.medianRunwayMonths >= 24 ? '24+ Mo' : `${forecast.monteCarlo.medianRunwayMonths} Mo`}
            </div>
            <div className="text-[11px] text-sky-700 font-mono mt-1">
              Zero Cash Date: {forecast.monteCarlo.zeroCashDateMedian}
            </div>
          </div>

          {/* 12-Month Solvency Confidence */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-mono font-medium uppercase tracking-wider">12-Mo Solvency Confidence</span>
              <ShieldCheck className={`w-4 h-4 ${
                forecast.monteCarlo.probabilityOfSurvival12Months >= 90 ? 'text-emerald-600' : 'text-amber-500'
              }`} />
            </div>
            <div className={`text-2xl font-bold font-mono ${
              forecast.monteCarlo.probabilityOfSurvival12Months >= 90 ? 'text-emerald-700' : 'text-amber-700'
            }`}>
              {forecast.monteCarlo.probabilityOfSurvival12Months}%
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              P10 Worst Case: {forecast.monteCarlo.p10WorstCaseRunwayMonths} Mo runway
            </div>
          </div>
        </div>
      )}

      {/* Liquidity Warnings Banner */}
      {forecast && forecast.liquidityWarnings.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Working Capital & Liquidity Advisory</span>
          </div>
          <ul className="text-xs text-amber-800 font-mono space-y-1 pl-6 list-disc">
            {forecast.liquidityWarnings.map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Analysis Viewport (Tabs) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        {/* Navigation Subtabs */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('TRAJECTORY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeTab === 'TRAJECTORY'
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              12-Month Liquidity Trajectory
            </button>

            <button
              onClick={() => setActiveTab('DAILY_SCHEDULE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                activeTab === 'DAILY_SCHEDULE'
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>30-Day Working Capital Schedule ({forecast?.upcomingDailyEvents.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('MONTE_CARLO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                activeTab === 'MONTE_CARLO'
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Monte Carlo Probability Distribution</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            1,000 stochastic Brownian paths
          </span>
        </div>

        {/* Tab 1: 12-Month Cash Trajectory SVG Chart */}
        {activeTab === 'TRAJECTORY' && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold font-serif text-slate-900">
                  Projected Capital Balance (Next 12 Months)
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Enveloping 10th percentile conservative stress vs. 90th percentile optimistic demand.
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-emerald-600"></div>
                  <span className="text-slate-700 font-medium">Expected Median</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-emerald-100/70 border border-emerald-300 rounded-xs"></div>
                  <span className="text-slate-500">P10 - P90 Band</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 border-t border-dashed border-rose-500"></div>
                  <span className="text-rose-600 font-medium">Safety Floor ($50k)</span>
                </div>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            {chartData && (
              <div className="relative overflow-x-auto bg-slate-50/60 p-4 rounded-xl border border-slate-200">
                <svg
                  viewBox={`0 0 ${chartData.width} ${chartData.height}`}
                  className="w-full h-auto max-h-72 select-none overflow-visible"
                >
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                    const yVal = chartData.minVal + ratio * (chartData.maxVal - chartData.minVal);
                    const y = chartData.getY(yVal);
                    return (
                      <g key={i}>
                        <line
                          x1="60"
                          y1={y}
                          x2={chartData.width - 60}
                          y2={y}
                          stroke="#e2e8f0"
                          strokeDasharray="3 3"
                        />
                        <text
                          x="52"
                          y={y + 4}
                          textAnchor="end"
                          fontSize="9"
                          fill="#94a3b8"
                          fontFamily="monospace"
                        >
                          ${(yVal / 1000).toFixed(0)}k
                        </text>
                      </g>
                    );
                  })}

                  {/* Reserve Floor Line */}
                  <line
                    x1="60"
                    y1={chartData.floorY}
                    x2={chartData.width - 60}
                    y2={chartData.floorY}
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Confidence Envelope (Area) */}
                  <polygon
                    points={chartData.areaPoints}
                    fill="#10b981"
                    fillOpacity="0.12"
                  />

                  {/* P90 Line */}
                  <polyline
                    points={chartData.p90Points}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    strokeOpacity="0.8"
                  />

                  {/* P10 Line */}
                  <polyline
                    points={chartData.p10Points}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    strokeOpacity="0.8"
                  />

                  {/* Median Line */}
                  <polyline
                    points={chartData.medianPoints}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points */}
                  {chartData.projections.map((p, i) => {
                    const cx = chartData.getX(i);
                    const cy = chartData.getY(p.endingCash);
                    const isHovered = hoveredMonthIndex === i;

                    return (
                      <g key={i}>
                        {/* Interactive invisible hit area */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r="12"
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredMonthIndex(i)}
                          onMouseLeave={() => setHoveredMonthIndex(null)}
                        />
                        {/* Visible dot */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isHovered ? 6 : 4}
                          fill={p.isShortfall ? '#e11d48' : '#059669'}
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="transition-all duration-150"
                        />
                        {/* X-axis Month Label */}
                        <text
                          x={cx}
                          y={chartData.height - 8}
                          textAnchor="middle"
                          fontSize="9"
                          fill={isHovered ? '#0f172a' : '#64748b'}
                          fontWeight={isHovered ? 'bold' : 'normal'}
                          fontFamily="monospace"
                        >
                          {p.monthLabel.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Hover Tooltip Overlay */}
                {hoveredMonthIndex !== null && chartData.projections[hoveredMonthIndex] && (
                  <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg shadow-sm font-mono text-xs flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {chartData.projections[hoveredMonthIndex].monthLabel}:
                      </span>
                      <span className="text-emerald-700 font-bold">
                        Expected Ending: ${chartData.projections[hoveredMonthIndex].endingCash.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600 text-[11px]">
                      <span>Projected Inflow: <strong className="text-emerald-600">+${chartData.projections[hoveredMonthIndex].projectedInflow.toLocaleString()}</strong></span>
                      <span>Projected Outflow: <strong className="text-rose-600">-${chartData.projections[hoveredMonthIndex].projectedOutflow.toLocaleString()}</strong></span>
                      <span>P10 Stress: <strong>${chartData.projections[hoveredMonthIndex].p10EndingCash.toLocaleString()}</strong></span>
                      <span>P90 Bull: <strong>${chartData.projections[hoveredMonthIndex].p90EndingCash.toLocaleString()}</strong></span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Monthly Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase text-slate-500">
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3 text-right">Starting Cash</th>
                    <th className="py-2.5 px-3 text-right">Inflows (Revenue + AR)</th>
                    <th className="py-2.5 px-3 text-right">Outflows (Opex + AP)</th>
                    <th className="py-2.5 px-3 text-right">Net Flow</th>
                    <th className="py-2.5 px-3 text-right">Ending Capital</th>
                    <th className="py-2.5 px-3 text-center">Reserve Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {forecast?.monthlyProjections.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-2.5 px-3 font-bold text-slate-800">{row.monthLabel}</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">${row.startingCash.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-700">+${row.projectedInflow.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right text-rose-700">-${row.projectedOutflow.toLocaleString()}</td>
                      <td className={`py-2.5 px-3 text-right font-bold ${row.netCashFlow >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {row.netCashFlow >= 0 ? '+' : ''}${row.netCashFlow.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">${row.endingCash.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-center">
                        {row.isShortfall ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertTriangle className="w-2.5 h-2.5" /> Below $50k Floor
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Solvent
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: 30-Day Working Capital & Daily Liquidity Ledger */}
        {activeTab === 'DAILY_SCHEDULE' && (
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold font-serif text-slate-900">
                Daily Working Capital Calendar (Next 30 Days)
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Itemized timeline linking active Client Invoices awaiting collection, approved Vendor Bills scheduled for payment, and semi-monthly payroll cycles.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase text-slate-500">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Transaction / Counterparty</th>
                    <th className="py-2.5 px-3">Event Type</th>
                    <th className="py-2.5 px-3">Reference #</th>
                    <th className="py-2.5 px-3 text-right">Cash Delta</th>
                    <th className="py-2.5 px-3 text-right">Running Liquid Balance</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {forecast?.upcomingDailyEvents.map((evt, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-2.5 px-3 font-bold text-slate-800">{evt.date}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">{evt.counterparty}</td>
                      <td className="py-2.5 px-3">
                        {evt.type === 'INVOICE_RECEIVABLE' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <FileText className="w-2.5 h-2.5" /> Client AR Inflow
                          </span>
                        )}
                        {evt.type === 'EXPENSE_PAYABLE' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <Receipt className="w-2.5 h-2.5" /> Vendor AP Outflow
                          </span>
                        )}
                        {evt.type === 'RECURRING_PAYROLL' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            <Clock className="w-2.5 h-2.5" /> Payroll Cycle
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{evt.referenceId}</td>
                      <td className={`py-2.5 px-3 text-right font-bold ${evt.amount >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {evt.amount >= 0 ? '+' : ''}${evt.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        ${evt.runningBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-500">
                          {evt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Monte Carlo Probability Distribution */}
        {activeTab === 'MONTE_CARLO' && forecast && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold font-serif text-slate-900">
                Monte Carlo Stochastic Distribution (1,000 Iterations)
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Probability breakdown of capital depletion horizons under random volatility and demand shocks.
              </p>
            </div>

            {/* Distribution Histogram */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {forecast.monteCarlo.distributionBuckets.map((bucket, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center flex flex-col justify-between">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 font-medium">
                    {bucket.rangeLabel}
                  </div>
                  <div className="text-2xl font-bold font-mono text-slate-900 my-1">
                    {bucket.percentage}%
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full ${
                        idx === 4 ? 'bg-emerald-600' : idx === 0 ? 'bg-rose-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${bucket.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-2">
                    {bucket.count} / 1,000 sims
                  </div>
                </div>
              ))}
            </div>

            {/* Solvency Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono">
                <span className="text-emerald-800 font-bold uppercase block mb-1">12-Month Survival</span>
                <div className="text-xl font-bold text-emerald-900">{forecast.monteCarlo.probabilityOfSurvival12Months}%</div>
                <p className="text-emerald-700 mt-1 text-[11px]">Probability of remaining cash-flow solvent for 1 full calendar year.</p>
              </div>

              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs font-mono">
                <span className="text-sky-800 font-bold uppercase block mb-1">24-Month Survival</span>
                <div className="text-xl font-bold text-sky-900">{forecast.monteCarlo.probabilityOfSurvival24Months}%</div>
                <p className="text-sky-700 mt-1 text-[11px]">Probability of staying cash-positive over a 2-year horizon without capital raises.</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono">
                <span className="text-slate-700 font-bold uppercase block mb-1">P10 Worst Case</span>
                <div className="text-xl font-bold text-slate-900">{forecast.monteCarlo.p10WorstCaseRunwayMonths} Months</div>
                <p className="text-slate-500 mt-1 text-[11px]">Runway under severe multi-month macro demand shocks.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sensitivity Parameter Matrix (Sliders) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold font-serif text-slate-900">
              Sensitivity & Working Capital Stress Tuning
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Adjust variables to immediately recalculate 12-month projections
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          {/* Collection Delay Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Customer AR Collection Delay:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                +{params.collectionDelayDays} Days
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={params.collectionDelayDays}
              onChange={e => handleParamChange('collectionDelayDays', parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 (Prompt)</span>
              <span>30 (Net-30)</span>
              <span>60 (Severe Float)</span>
            </div>
          </div>

          {/* Expense Inflation Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Vendor AP / Opex Inflation:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {params.expenseInflationPct >= 0 ? '+' : ''}{params.expenseInflationPct}%
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="30"
              step="1"
              value={params.expenseInflationPct}
              onChange={e => handleParamChange('expenseInflationPct', parseInt(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-10% (Cost Cuts)</span>
              <span>0% (Baseline)</span>
              <span>+30% (High Inflation)</span>
            </div>
          </div>

          {/* Revenue Growth Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Revenue Growth Rate MoM:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {(params.revenueGrowthMoM * 100).toFixed(1)}% / mo
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="15"
              step="0.5"
              value={params.revenueGrowthMoM * 100}
              onChange={e => handleParamChange('revenueGrowthMoM', parseFloat(e.target.value) / 100)}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-5.0% (Contraction)</span>
              <span>+2.0% (Organic)</span>
              <span>+15.0% (High Growth)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2 border-t border-slate-100">
          <button
            onClick={handleApplyCustomParams}
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Apply Sensitivity Matrix</span>
          </button>
        </div>
      </div>

      {/* Strategic Capital Directives */}
      {forecast && forecast.strategicActions.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold font-serif text-slate-900">
              Strategic Treasury & Working Capital Directives
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {forecast.strategicActions.map(action => (
              <div key={action.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      action.urgency === 'HIGH' 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                        : action.urgency === 'MEDIUM' 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {action.urgency} PRIORITY
                    </span>
                    <span className="font-bold text-emerald-700">
                      +${action.impactUsd.toLocaleString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1.5 font-serif">{action.title}</h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{action.actionText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
