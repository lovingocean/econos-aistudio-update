import React, { useState } from 'react';
import { EconomicProfile } from '../../types/econos';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  ShieldCheck,
  Layers,
  BarChart3,
  PieChart
} from 'lucide-react';

interface LiveCapitalFlowGraphProps {
  profile: EconomicProfile | null;
}

export const LiveCapitalFlowGraph: React.FC<LiveCapitalFlowGraphProps> = ({ profile }) => {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [flowView, setFlowView] = useState<'WATERFALL' | 'RETENTION'>('WATERFALL');

  const revenue = profile?.monthlyRevenue || 85000;
  const cogs = profile?.monthlyCogs || 22000;
  const opex = profile?.monthlyOpex || 35000;
  const grossProfit = Math.max(0, revenue - cogs);
  const netIncome = revenue - cogs - opex;
  const treasuryCash = profile?.cashOnHand || 340000;

  const grossMarginPct = revenue > 0 ? ((grossProfit / revenue) * 100).toFixed(1) : '0';
  const netMarginPct = revenue > 0 ? ((netIncome / revenue) * 100).toFixed(1) : '0';
  const cogsPct = revenue > 0 ? ((cogs / revenue) * 100).toFixed(1) : '0';
  const opexPct = revenue > 0 ? ((opex / revenue) * 100).toFixed(1) : '0';

  // SVG dimensions for responsive waterfall
  const svgWidth = 840;
  const svgHeight = 260;
  const chartBottom = 220;
  const chartTop = 30;
  const chartHeight = chartBottom - chartTop;

  // Maximum value for scaling (either revenue or grossProfit)
  const maxVal = Math.max(revenue, 10000);
  const scale = (val: number) => (val / maxVal) * (chartHeight * 0.85);

  const steps = [
    {
      id: 'rev',
      label: 'Gross Inflow',
      sublabel: 'Customer Billing',
      value: revenue,
      displayVal: `+$${revenue.toLocaleString()}`,
      barHeight: scale(revenue),
      y: chartBottom - scale(revenue),
      color: '#10b981',
      gradient: ['#34d399', '#059669'],
      badge: '100% Inflow',
      description: 'Gross recurring SaaS, usage meters, and enterprise retainers.'
    },
    {
      id: 'cogs',
      label: 'Direct COGS',
      sublabel: 'Compute & Delivery',
      value: cogs,
      displayVal: `-$${cogs.toLocaleString()}`,
      barHeight: scale(cogs),
      y: chartBottom - scale(revenue), // sits at top of gross profit
      color: '#f59e0b',
      gradient: ['#fbbf24', '#d97706'],
      badge: `${cogsPct}% of Rev`,
      description: 'Cloud inference clusters, vendor infrastructure, and hosting delivery.'
    },
    {
      id: 'gp',
      label: 'Gross Profit',
      sublabel: 'Retained Yield',
      value: grossProfit,
      displayVal: `$${grossProfit.toLocaleString()}`,
      barHeight: scale(grossProfit),
      y: chartBottom - scale(grossProfit),
      color: '#3b82f6',
      gradient: ['#60a5fa', '#2563eb'],
      badge: `${grossMarginPct}% Margin`,
      description: 'Capital retained after direct cost-to-serve prior to company operating expenses.'
    },
    {
      id: 'opex',
      label: 'OpEx Outflow',
      sublabel: 'Team, SG&A, Tools',
      value: opex,
      displayVal: `-$${opex.toLocaleString()}`,
      barHeight: scale(opex),
      y: chartBottom - scale(grossProfit),
      color: '#ef4444',
      gradient: ['#f87171', '#dc2626'],
      badge: `${opexPct}% of Rev`,
      description: 'Engineering payroll, corporate SaaS, legal, and operational overhead.'
    },
    {
      id: 'net',
      label: 'Net Monthly Delta',
      sublabel: netIncome >= 0 ? 'Free Cash Accrual' : 'Net Monthly Burn',
      value: Math.abs(netIncome),
      displayVal: `${netIncome >= 0 ? '+' : '-'}$${Math.abs(netIncome).toLocaleString()}`,
      barHeight: Math.max(12, scale(Math.abs(netIncome))),
      y: netIncome >= 0 ? chartBottom - scale(netIncome) : chartBottom - 12,
      color: netIncome >= 0 ? '#059669' : '#e11d48',
      gradient: netIncome >= 0 ? ['#10b981', '#047857'] : ['#f43f5e', '#be123c'],
      badge: `${netMarginPct}% Net`,
      description: netIncome >= 0 ? 'Surplus cash deposited directly into Treasury reserves.' : 'Operating cash drain subsidized from cash on hand.'
    }
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
              Autonomous Capital Velocity
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
              LIVE WATERFALL
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
            Real-Time Monthly Value Stream Waterfall
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualizing how gross top-line revenue cascades through direct delivery costs and operating expenditures into net treasury cash.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
          <button
            onClick={() => setFlowView('WATERFALL')}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
              flowView === 'WATERFALL' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Waterfall
          </button>
          <button
            onClick={() => setFlowView('RETENTION')}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
              flowView === 'RETENTION' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            Retention
          </button>
        </div>
      </div>

      {/* Main Visual Display */}
      {flowView === 'WATERFALL' ? (
        <div className="relative overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto min-w-[720px]"
            style={{ maxHeight: '280px' }}
          >
            <defs>
              {steps.map(step => (
                <linearGradient key={step.id} id={`grad-${step.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={step.gradient[0]} />
                  <stop offset="100%" stopColor={step.gradient[1]} />
                </linearGradient>
              ))}

              {/* Grid line pattern */}
              <line id="baseline" x1="40" y1={chartBottom} x2={svgWidth - 40} y2={chartBottom} stroke="#e2e8f0" strokeWidth="1.5" />
            </defs>

            {/* Background dashed guide lines */}
            <line x1="40" y1={chartBottom} x2={svgWidth - 40} y2={chartBottom} stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="40" y1={chartBottom - chartHeight * 0.5} x2={svgWidth - 40} y2={chartBottom - chartHeight * 0.5} stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="40" y1={chartTop} x2={svgWidth - 40} y2={chartTop} stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />

            {/* Waterfall connecting bridges */}
            {/* Bridge 1: Rev to COGS */}
            <path
              d={`M 170 ${steps[0].y} L 210 ${steps[0].y}`}
              fill="none"
              stroke="#94a3b8"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
            {/* Bridge 2: Gross Profit to OpEx */}
            <path
              d={`M 490 ${steps[2].y} L 530 ${steps[2].y}`}
              fill="none"
              stroke="#94a3b8"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />

            {/* Waterfall Bars */}
            {steps.map((step, idx) => {
              const colWidth = 110;
              const colGap = 50;
              const x = 60 + idx * (colWidth + colGap);
              const isHovered = activeSegment === step.id;

              return (
                <g
                  key={step.id}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setActiveSegment(step.id)}
                  onMouseLeave={() => setActiveSegment(null)}
                >
                  {/* Subtle bar background glow on hover */}
                  {isHovered && (
                    <rect
                      x={x - 4}
                      y={step.y - 4}
                      width={colWidth + 8}
                      height={step.barHeight + 8}
                      rx="14"
                      fill={step.color}
                      opacity="0.25"
                    />
                  )}

                  {/* Primary Rounded Bar */}
                  <rect
                    x={x}
                    y={step.y}
                    width={colWidth}
                    height={step.barHeight}
                    rx="10"
                    fill={`url(#grad-${step.id})`}
                    className="transition-all duration-200"
                    filter={isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : undefined}
                  />

                  {/* Top Value Label */}
                  <text
                    x={x + colWidth / 2}
                    y={step.y - 10}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="13"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    {step.displayVal}
                  </text>

                  {/* Badge pill inside or right above */}
                  <rect
                    x={x + colWidth / 2 - 40}
                    y={step.y + 8}
                    width="80"
                    height="18"
                    rx="9"
                    fill="rgba(255, 255, 255, 0.88)"
                  />
                  <text
                    x={x + colWidth / 2}
                    y={step.y + 20}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {step.badge}
                  </text>

                  {/* Bottom Column Title & Subtitle */}
                  <text
                    x={x + colWidth / 2}
                    y={chartBottom + 18}
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    {step.label}
                  </text>
                  <text
                    x={x + colWidth / 2}
                    y={chartBottom + 32}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {step.sublabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        /* Retention Stacked Stream View */
        <div className="space-y-4 py-3">
          <div className="text-xs font-mono text-slate-500 uppercase flex justify-between">
            <span>Capital Absorption Ratio per $1.00 Top-Line</span>
            <span>Monthly Revenue: ${revenue.toLocaleString()}</span>
          </div>

          {/* Stacked Proportional Bar */}
          <div className="h-9 w-full rounded-2xl overflow-hidden flex border border-slate-200 shadow-inner bg-slate-100 font-mono text-xs font-bold text-white">
            <div
              style={{ width: `${cogsPct}%` }}
              className="bg-amber-500 flex items-center justify-center transition-all duration-300 relative group cursor-pointer"
              title={`COGS: ${cogsPct}%`}
            >
              <span className="truncate px-2">COGS {cogsPct}%</span>
            </div>
            <div
              style={{ width: `${opexPct}%` }}
              className="bg-rose-500 flex items-center justify-center transition-all duration-300 relative group cursor-pointer"
              title={`OpEx: ${opexPct}%`}
            >
              <span className="truncate px-2">OpEx {opexPct}%</span>
            </div>
            <div
              style={{ width: `${Math.max(5, Number(netMarginPct))}%` }}
              className="bg-emerald-600 flex items-center justify-center transition-all duration-300 relative group cursor-pointer"
              title={`Net Free Cash Flow: ${netMarginPct}%`}
            >
              <span className="truncate px-2">Net {netMarginPct}%</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] text-amber-700 block uppercase font-bold">Delivery Cost (COGS)</span>
              <span className="text-lg font-bold text-amber-900">${cogs.toLocaleString()}/mo</span>
              <span className="text-[10px] text-amber-700 block mt-0.5">{cogsPct}% of incoming dollar</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-[10px] text-rose-700 block uppercase font-bold">Operating Expenses (OpEx)</span>
              <span className="text-lg font-bold text-rose-900">${opex.toLocaleString()}/mo</span>
              <span className="text-[10px] text-rose-700 block mt-0.5">{opexPct}% of incoming dollar</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 block uppercase font-bold">Retained Net Cash</span>
              <span className="text-lg font-bold text-emerald-900">${netIncome.toLocaleString()}/mo</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">{netMarginPct}% cash capture rate</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Detail Box on Hover or Default */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-slate-700 font-semibold">
            {activeSegment ? steps.find(s => s.id === activeSegment)?.description : 'Hover any column in the waterfall to inspect cost drivers and conversion ratios.'}
          </span>
        </div>
        <div className="text-slate-500 text-[11px]">
          Runway Factor: <strong className="text-slate-900 font-bold">{profile?.runwayMonths ? `${profile.runwayMonths} Months` : 'Sustained'}</strong>
        </div>
      </div>

    </div>
  );
};
