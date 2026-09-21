import React, { useState } from 'react';
import { 
  Presentation, 
  TrendingUp, 
  BarChart3, 
  Download, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';
import { InvestorSaaSMetrics, BoardDeckSlide } from '../../types/enterprise-ops';

const INITIAL_METRICS: InvestorSaaSMetrics = {
  mrrUsd: 118400,
  arrUsd: 1420800,
  arrGrowthYoYPct: 48.2,
  netRevenueRetentionPct: 124.0,
  grossMarginPct: 78.4,
  cacUsd: 4200,
  ltvUsd: 38500,
  ltvToCacRatio: 9.16,
  magicNumber: 1.42,
  ruleOf40Score: 48.2, // 34% growth + 14.2% FCF margin
  burnMultiple: 0.62, // Highly capital efficient
  cashRunwayMonths: 18.4,
  grossRetentionPct: 96.2,
  activeEnterpriseCustomers: 42
};

const INITIAL_SLIDES: BoardDeckSlide[] = [
  {
    id: 'slide_01',
    slideNumber: 1,
    title: 'Executive Summary & Operating Cadence',
    category: 'EXECUTIVE_SUMMARY',
    keyTakeaway: 'ECONOS achieved $1.42M ARR (+48.2% YoY) with an industry-leading Rule of 40 score of 48.2% and 18.4 months of runway.',
    chartType: 'ARR_BRIDGE',
    metricsSummary: [
      { label: 'ARR', value: '$1.42M', trend: 'POSITIVE' },
      { label: 'YoY Growth', value: '+48.2%', trend: 'POSITIVE' },
      { label: 'Runway', value: '18.4 Mo', trend: 'POSITIVE' }
    ]
  },
  {
    id: 'slide_02',
    slideNumber: 2,
    title: 'Unit Economics & Customer Efficiency',
    category: 'UNIT_ECONOMICS',
    keyTakeaway: '9.16x LTV/CAC ratio driven by autonomous self-serve land-and-expand. CAC payback achieved in 4.2 months.',
    chartType: 'WATERFALL',
    metricsSummary: [
      { label: 'LTV / CAC', value: '9.16x', trend: 'POSITIVE' },
      { label: 'CAC Payback', value: '4.2 Mo', trend: 'POSITIVE' },
      { label: 'Gross Margin', value: '78.4%', trend: 'POSITIVE' }
    ]
  },
  {
    id: 'slide_03',
    slideNumber: 3,
    title: 'Cohort Net Retention & Expansion (NRR)',
    category: 'GROWTH_METRICS',
    keyTakeaway: '124% Net Revenue Retention across enterprise cohorts. Enterprise tier expansion outpaces gross logo churn by 6.4x.',
    chartType: 'COHORT_NRR',
    metricsSummary: [
      { label: 'Net Retention', value: '124.0%', trend: 'POSITIVE' },
      { label: 'Gross Logo Retention', value: '96.2%', trend: 'POSITIVE' },
      { label: 'Enterprise ACV', value: '$33,800', trend: 'POSITIVE' }
    ]
  },
  {
    id: 'slide_04',
    slideNumber: 4,
    title: 'Capital Efficiency & Burn Multiple',
    category: 'FINANCIALS',
    keyTakeaway: 'Burn Multiple is 0.62 (Top Decile SaaS efficiency). Zero external venture debt; organic cash conversion cycle.',
    chartType: 'BURN_RUNWAY',
    metricsSummary: [
      { label: 'Burn Multiple', value: '0.62', trend: 'POSITIVE' },
      { label: 'Magic Number', value: '1.42', trend: 'POSITIVE' },
      { label: 'Operating Cash', value: '$1.43M', trend: 'POSITIVE' }
    ]
  }
];

export const CommercialBoardDeckWorkspace: React.FC = () => {
  const [metrics] = useState<InvestorSaaSMetrics>(INITIAL_METRICS);
  const [slides] = useState<BoardDeckSlide[]>(INITIAL_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeSlide = slides[currentSlideIndex];

  const handleCopyPortalLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportDeckMarkdown = () => {
    const content = `# ECONOS — Q3 2026 Board of Directors & Investor Presentation
Generated: September 20, 2026
Confidential Stakeholder Material

## Executive SaaS Metrics Summary
- **Current ARR**: $${(metrics.arrUsd / 1000000).toFixed(2)}M (+${metrics.arrGrowthYoYPct}% YoY)
- **Net Revenue Retention (NRR)**: ${metrics.netRevenueRetentionPct}%
- **Gross Margin**: ${metrics.grossMarginPct}%
- **Rule of 40 Score**: ${metrics.ruleOf40Score}%
- **LTV / CAC Ratio**: ${metrics.ltvToCacRatio}x
- **Magic Number**: ${metrics.magicNumber}
- **Burn Multiple**: ${metrics.burnMultiple}
- **Cash Runway**: ${metrics.cashRunwayMonths} Months ($1,428,500 Cash on Hand)

---
${slides.map(s => `
### Slide ${s.slideNumber}: ${s.title}
*Category: ${s.category}*
**Key Takeaway**: ${s.keyTakeaway}
Key Metrics: ${s.metricsSummary.map(m => `${m.label}: ${m.value}`).join(' | ')}
`).join('\n---\n')}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ECONOS_Board_Presentation_Q3_2026.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-violet-50 text-violet-800 border border-violet-200">
              INVESTOR RELATIONS & STAKEHOLDER PORTAL
            </span>
            <span className="text-slate-400 text-xs font-mono">• Board Presentation Studio</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Presentation className="w-5 h-5 text-violet-600" />
            <span>Investor Relations & Board Deck Generator</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated SaaS metrics telemetry (Rule of 40, Magic Number, CAC/LTV) and interactive presentation slides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPortalLink}
            className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Portal Link Copied!' : 'Share Data Room Link'}</span>
          </button>

          <button
            onClick={handleExportDeckMarkdown}
            className="px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Board Deck (.MD)</span>
          </button>
        </div>
      </div>

      {/* Top SaaS Health Benchmarks (Rule of 40, CAC/LTV, Magic Number) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs font-mono">
          <span className="text-[10px] text-slate-500 uppercase">ARR</span>
          <div className="text-lg font-bold text-slate-900">${(metrics.arrUsd / 1000000).toFixed(2)}M</div>
          <div className="text-[10px] text-emerald-600 font-bold">+{metrics.arrGrowthYoYPct}% YoY</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs font-mono">
          <span className="text-[10px] text-slate-500 uppercase">Rule of 40</span>
          <div className="text-lg font-bold text-violet-700">{metrics.ruleOf40Score}%</div>
          <div className="text-[10px] text-violet-600 font-medium">Top Quartile</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs font-mono">
          <span className="text-[10px] text-slate-500 uppercase">NRR</span>
          <div className="text-lg font-bold text-emerald-700">{metrics.netRevenueRetentionPct}%</div>
          <div className="text-[10px] text-slate-500">Gross Ret: 96%</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs font-mono">
          <span className="text-[10px] text-slate-500 uppercase">LTV / CAC</span>
          <div className="text-lg font-bold text-slate-900">{metrics.ltvToCacRatio}x</div>
          <div className="text-[10px] text-emerald-600 font-medium">Payback: 4.2 Mo</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs font-mono">
          <span className="text-[10px] text-slate-500 uppercase">Burn Multiple</span>
          <div className="text-lg font-bold text-emerald-600">{metrics.burnMultiple}</div>
          <div className="text-[10px] text-slate-500">&lt; 1.0 = High Eff.</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs font-mono">
          <span className="text-[10px] text-slate-500 uppercase">Magic Number</span>
          <div className="text-lg font-bold text-indigo-700">{metrics.magicNumber}</div>
          <div className="text-[10px] text-indigo-600">&gt; 1.0 = Reinvest</div>
        </div>
      </div>

      {/* Interactive Board Deck Viewer */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Slide Carousel Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span>Slide {activeSlide.slideNumber} of {slides.length}</span>
            <span>•</span>
            <span className="text-violet-400 font-bold">{activeSlide.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  currentSlideIndex === idx ? 'bg-violet-500 scale-125' : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slide Display Area */}
        <div className="space-y-6 min-h-[300px] flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
              {activeSlide.title}
            </h2>
            <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
              {activeSlide.keyTakeaway}
            </p>
          </div>

          {/* Metric Callout Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            {activeSlide.metricsSummary.map((m, mIdx) => (
              <div key={mIdx} className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 font-mono">
                <span className="text-xs text-slate-400 uppercase">{m.label}</span>
                <div className="text-2xl font-bold text-violet-300 mt-1">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-mono font-medium transition"
          >
            ← Previous Slide
          </button>

          <span className="text-xs font-mono text-slate-500">
            Press arrow buttons or bullets to advance presentation
          </span>

          <button
            onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-30 text-white text-xs font-mono font-bold transition"
          >
            Next Slide →
          </button>
        </div>
      </div>
    </div>
  );
};
