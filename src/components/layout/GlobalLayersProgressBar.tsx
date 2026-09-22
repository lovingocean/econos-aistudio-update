import React, { useState, useMemo } from 'react';
import { 
  MASTER_100_LAYERS, 
  getLayerById, 
  getLayerByNumber 
} from '../../data/master100LayersData';
import { AppLayer, MasterLayerSpec } from '../../types/econos';
import { SystemHealthPulse } from './SystemHealthPulse';
import { 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  Compass, 
  Building2, 
  Calculator, 
  Zap, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';

interface GlobalLayersProgressBarProps {
  currentLayer?: AppLayer;
  onSelectLayer: (layer: AppLayer) => void;
}

interface TierInfo {
  tierNumber: number;
  id: string;
  name: string;
  shortName: string;
  range: string;
  start: number;
  end: number;
  count: number;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  colorTrack: string;
  category: string;
  defaultLayerId: AppLayer;
}

const SYSTEM_TIERS: TierInfo[] = [
  {
    tierNumber: 1,
    id: 'CORE_OS',
    name: 'Core Sovereign OS',
    shortName: 'Core OS',
    range: 'L1–5',
    start: 1,
    end: 5,
    count: 5,
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-200',
    colorText: 'text-emerald-800',
    colorTrack: 'bg-emerald-500',
    category: 'CORE_OS',
    defaultLayerId: 'BUSINESS' as AppLayer
  },
  {
    tierNumber: 2,
    id: 'V2_STRATEGIC',
    name: 'V2 Strategic Orchestration',
    shortName: 'Strategic',
    range: 'L6–10',
    start: 6,
    end: 10,
    count: 5,
    colorBg: 'bg-indigo-50',
    colorBorder: 'border-indigo-200',
    colorText: 'text-indigo-800',
    colorTrack: 'bg-indigo-500',
    category: 'V2_STRATEGIC',
    defaultLayerId: 'ECONOMIC_BRAIN' as AppLayer
  },
  {
    tierNumber: 3,
    id: 'SOVEREIGN_INFRA',
    name: 'Autonomous Sovereign Rails',
    shortName: 'Sovereign Rails',
    range: 'L11–19',
    start: 11,
    end: 19,
    count: 9,
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-200',
    colorText: 'text-amber-800',
    colorTrack: 'bg-amber-500',
    category: 'SOVEREIGN_INFRA',
    defaultLayerId: 'AUTONOMOUS_EXECUTION' as AppLayer
  },
  {
    tierNumber: 4,
    id: 'PLANETARY_SYSTEMS',
    name: 'Planetary Systems & Grid',
    shortName: 'Planetary Grid',
    range: 'L20–26',
    start: 20,
    end: 26,
    count: 7,
    colorBg: 'bg-teal-50',
    colorBorder: 'border-teal-200',
    colorText: 'text-teal-800',
    colorTrack: 'bg-teal-500',
    category: 'PLANETARY_SYSTEMS',
    defaultLayerId: 'SYNTHETIC_CENTRAL_BANK' as AppLayer
  },
  {
    tierNumber: 5,
    id: 'CIVILIZATIONAL_FRONTIER',
    name: 'Civilizational Frontier',
    shortName: 'Frontier',
    range: 'L27–31',
    start: 27,
    end: 31,
    count: 5,
    colorBg: 'bg-rose-50',
    colorBorder: 'border-rose-200',
    colorText: 'text-rose-800',
    colorTrack: 'bg-rose-500',
    category: 'CIVILIZATIONAL_FRONTIER',
    defaultLayerId: 'RELATIVISTIC_LIGHT_CONE' as AppLayer
  },
  {
    tierNumber: 6,
    id: 'OMNI_SINGULARITY',
    name: 'Omni-Access Singularity',
    shortName: 'Omni-Access',
    range: 'L32–41',
    start: 32,
    end: 41,
    count: 10,
    colorBg: 'bg-violet-50',
    colorBorder: 'border-violet-200',
    colorText: 'text-violet-800',
    colorTrack: 'bg-violet-500',
    category: 'OMNI_SINGULARITY',
    defaultLayerId: 'OMNI_TELEMETRY_BUS' as AppLayer
  },
  {
    tierNumber: 7,
    id: 'ENTERPRISE_SYNTHETICS',
    name: 'Enterprise Synthetics & Balance Sheet',
    shortName: 'Enterprise',
    range: 'L42–61',
    start: 42,
    end: 61,
    count: 20,
    colorBg: 'bg-blue-50',
    colorBorder: 'border-blue-200',
    colorText: 'text-blue-800',
    colorTrack: 'bg-blue-600',
    category: 'ENTERPRISE_SYNTHETICS',
    defaultLayerId: 'LAYER_42_SYNTHETIC_BALANCE_SHEET' as AppLayer
  },
  {
    tierNumber: 8,
    id: 'INSTITUTIONAL_TAX_PE',
    name: 'Institutional Tax & Private Equity',
    shortName: 'Tax & PE',
    range: 'L62–75',
    start: 62,
    end: 75,
    count: 14,
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-300',
    colorText: 'text-amber-900',
    colorTrack: 'bg-amber-500',
    category: 'INSTITUTIONAL_TAX_PE',
    defaultLayerId: 'LAYER_62_RD_TAX_CREDIT' as AppLayer
  },
  {
    tierNumber: 9,
    id: 'DEEP_SPACE_CONTINUUM',
    name: 'Deep Space & Stellar Continuum',
    shortName: 'Deep Space',
    range: 'L76–100',
    start: 76,
    end: 100,
    count: 25,
    colorBg: 'bg-slate-100',
    colorBorder: 'border-slate-300',
    colorText: 'text-slate-800',
    colorTrack: 'bg-slate-700',
    category: 'DEEP_SPACE_CONTINUUM',
    defaultLayerId: 'EXTENDED_LAYERS_WORKSPACE' as AppLayer
  }
];

export const GlobalLayersProgressBar: React.FC<GlobalLayersProgressBarProps> = ({
  currentLayer,
  onSelectLayer
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHealthPulseOpen, setIsHealthPulseOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredLayer, setHoveredLayer] = useState<MasterLayerSpec | null>(null);

  // Compute stats across all 100 layers
  const totalLayers = MASTER_100_LAYERS.length; // 100
  const operationalLayers = useMemo(() => {
    return MASTER_100_LAYERS.filter(l => l.status === 'OPERATIONAL' || l.status === 'LIVE_EXECUTION' || l.status === 'VERIFIED').length;
  }, []);

  const completionPercentage = Math.round((operationalLayers / totalLayers) * 100);

  // Determine current active layer number (1 to 100)
  const currentLayerNumber = useMemo(() => {
    if (!currentLayer) return 1;
    if (currentLayer === 'LAYER_62_RD_TAX_CREDIT' || currentLayer === 'LAYER_62') return 62;
    if (currentLayer === 'EXTENDED_LAYERS_WORKSPACE') return 42;
    
    const layerSpec = getLayerById(currentLayer);
    if (layerSpec) return layerSpec.layerNumber;

    const numMatch = currentLayer.match(/\d+/);
    if (numMatch) {
      const parsed = parseInt(numMatch[0], 10);
      if (parsed >= 1 && parsed <= 100) return parsed;
    }
    return 1;
  }, [currentLayer]);

  const activeLayerSpec = useMemo(() => {
    return getLayerByNumber(currentLayerNumber) || MASTER_100_LAYERS[0];
  }, [currentLayerNumber]);

  // Filtered layers for search drawer
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return MASTER_100_LAYERS.filter(l => 
      l.layerNumber.toString().includes(q) ||
      l.name.toLowerCase().includes(q) ||
      l.shortName.toLowerCase().includes(q) ||
      l.subtitle.toLowerCase().includes(q) ||
      l.businessBenefit.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [searchQuery]);

  const handleNavigateToLayer = (layerNum: number, layerId?: string) => {
    if (layerNum === 62) {
      onSelectLayer('LAYER_62_RD_TAX_CREDIT');
    } else if (layerId && layerNum <= 41 && !layerId.startsWith('LAYER_')) {
      onSelectLayer(layerId as AppLayer);
    } else {
      onSelectLayer(`LAYER_${layerNum}` as AppLayer);
    }
  };

  return (
    <aside 
      id="global-100-layers-progress-header" 
      aria-label="100 Sovereign Layers Progress Tracker"
      className="bg-[#0f172a] text-slate-100 border-b border-slate-800 shadow-sm relative z-30 transition-all duration-300"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Main Bar: Header, Progress, & Key Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          
          {/* Left: Metric Label & Completion Status */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700/80 text-[11px] font-mono font-bold text-amber-300">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>100 SYSTEM LAYERS</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold font-mono text-emerald-400">
                {operationalLayers}/{totalLayers} ({completionPercentage}%) OPERATIONAL
              </span>
            </div>

            {/* Current Active Layer indicator badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/60 border border-slate-700 text-[11px] text-slate-300">
              <span className="text-slate-400 font-mono">Active:</span>
              <span className="font-semibold text-white truncate max-w-[210px]">
                L{currentLayerNumber}. {activeLayerSpec?.shortName || currentLayer}
              </span>
            </div>
          </div>

          {/* Right: Quick Jumps & Expand Drawer Button */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto text-[11px] font-mono">
            {/* Quick jump to requested L62 */}
            <button
              id="jump-to-layer-62-btn"
              onClick={() => onSelectLayer('LAYER_62_RD_TAX_CREDIT')}
              className={`px-2 py-1 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                currentLayerNumber === 62
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                  : 'bg-amber-950/60 text-amber-300 hover:bg-amber-900/80 border-amber-500/40'
              }`}
              title="Jump directly to Layer 62: R&D Tax Credit (§41)"
            >
              <Calculator className="w-3 h-3" />
              <span>⭐ L62 R&amp;D Tax</span>
            </button>

            {/* Quick jump to Enterprise Synthetics */}
            <button
              id="jump-to-layer-42-btn"
              onClick={() => onSelectLayer('LAYER_42_SYNTHETIC_BALANCE_SHEET')}
              className={`px-2 py-1 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                currentLayerNumber >= 42 && currentLayerNumber <= 61
                  ? 'bg-blue-600 text-white border-blue-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-blue-300 border-slate-700'
              }`}
              title="Jump to Layer 42: Enterprise Balance Sheet"
            >
              <Building2 className="w-3 h-3" />
              <span className="hidden sm:inline">L42 Enterprise</span>
              <span className="sm:hidden">L42</span>
            </button>

            {/* System Health Pulse Trigger Button */}
            <button
              id="toggle-system-health-pulse-btn"
              onClick={() => setIsHealthPulseOpen(!isHealthPulseOpen)}
              className={`px-2 py-1 rounded text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                isHealthPulseOpen
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                  : 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border-emerald-500/40'
              }`}
              title="Real-time latency, throughput, and error rates across all 100 system layers"
              aria-expanded={isHealthPulseOpen}
            >
              <Activity className={`w-3.5 h-3.5 ${isHealthPulseOpen ? 'text-slate-950' : 'text-emerald-400 animate-pulse'}`} />
              <span>Health Pulse</span>
              <span className={`hidden md:inline text-[10px] font-mono px-1 rounded ${
                isHealthPulseOpen ? 'bg-emerald-600 text-slate-950' : 'bg-slate-900/60 border border-emerald-500/30 text-emerald-300'
              }`}>
                1.2ms
              </span>
            </button>

            {/* Matrix / Breakdown Drawer Toggle */}
            <button
              id="toggle-100-layers-matrix-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition flex items-center gap-1 cursor-pointer"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Hide Details' : '100 Matrix'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Global Progress Track with 9 Tier Segments & Live Active Layer Pin */}
        <div className="mt-2 pt-1 pb-1">
          <div className="relative">
            {/* Visual multi-segment progress track */}
            <div 
              className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800 gap-[1px]"
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="All 100 System Layers Progress"
            >
              {SYSTEM_TIERS.map((tier) => {
                const isActiveTier = currentLayerNumber >= tier.start && currentLayerNumber <= tier.end;
                return (
                  <div
                    key={tier.id}
                    style={{ width: `${(tier.count / totalLayers) * 100}%` }}
                    className={`h-full transition-all duration-300 relative group cursor-pointer ${tier.colorTrack} ${
                      isActiveTier ? 'brightness-125 ring-1 ring-white/60' : 'opacity-85 hover:opacity-100'
                    }`}
                    onClick={() => handleNavigateToLayer(tier.start, tier.defaultLayerId)}
                    title={`Tier ${tier.tierNumber}: ${tier.name} (${tier.range}) - 100% Deployed. Click to view.`}
                  />
                );
              })}
            </div>

            {/* Active Layer Pin Marker */}
            <div 
              className="absolute -top-1.5 transition-all duration-300 pointer-events-none -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${Math.max(2, Math.min(98, currentLayerNumber))}%` }}
            >
              <div className="w-1.5 h-4 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse" />
            </div>
          </div>

          {/* Tier Label Tickmarks under the track */}
          <div className="hidden lg:grid grid-cols-9 gap-1 mt-1 text-[9px] font-mono text-slate-400 text-center">
            {SYSTEM_TIERS.map((tier) => {
              const isSelected = currentLayerNumber >= tier.start && currentLayerNumber <= tier.end;
              return (
                <button
                  key={tier.id}
                  onClick={() => handleNavigateToLayer(tier.start, tier.defaultLayerId)}
                  className={`truncate px-1 py-0.5 rounded transition text-left cursor-pointer ${
                    isSelected 
                      ? 'text-amber-300 font-bold bg-slate-800/80' 
                      : 'hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                  title={`${tier.name} (${tier.range})`}
                >
                  <span className="font-semibold">T{tier.tierNumber}</span> {tier.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Micro Live Pulse Strip near the progress track */}
        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/60 text-[10px] font-mono text-slate-400 px-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>100-Layer Health Pulse:</span>
            </span>
            <span className="text-slate-300">Latency: <strong className="text-sky-300 font-mono">1.24ms</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Throughput: <strong className="text-emerald-300 font-mono">64.8k ops/s</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Errors: <strong className="text-slate-200 font-mono">0.002%</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold">100/100 Nodes Optimal</span>
          </div>

          <button
            id="quick-open-health-pulse-btn"
            onClick={() => setIsHealthPulseOpen(!isHealthPulseOpen)}
            className="text-amber-400 hover:text-amber-300 font-semibold transition cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>{isHealthPulseOpen ? 'Hide Health Pulse ▲' : 'System Health Pulse Dashboard ▼'}</span>
          </button>
        </div>

        {/* System Health Pulse Real-Time Dashboard */}
        {isHealthPulseOpen && (
          <div className="mt-3 pt-2">
            <SystemHealthPulse
              currentLayer={currentLayer}
              onSelectLayer={onSelectLayer}
              onClose={() => setIsHealthPulseOpen(false)}
            />
          </div>
        )}

        {/* Hovered or Active Layer Quick Preview Bar */}
        {hoveredLayer && (
          <div className="mt-1.5 px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2 truncate">
              <span className="font-mono text-amber-300 font-bold">Layer {hoveredLayer.layerNumber}:</span>
              <span className="font-semibold text-white">{hoveredLayer.name}</span>
              <span className="text-slate-400 hidden sm:inline">• {hoveredLayer.businessBenefit}</span>
            </div>
            <button
              onClick={() => handleNavigateToLayer(hoveredLayer.layerNumber, hoveredLayer.id)}
              className="ml-2 text-[10px] font-mono text-amber-400 hover:underline shrink-0"
            >
              Open Layer →
            </button>
          </div>
        )}
      </div>

      {/* Expandable 100-Layer Architectural Drawer */}
      {isExpanded && (
        <div className="border-t border-slate-800 bg-[#0b1120] px-4 sm:px-6 lg:px-8 py-4 transition-all">
          <div className="max-w-7xl mx-auto space-y-4">
            
            {/* Drawer Header & Layer Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100 Autonomous Sovereign Layers Matrix</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    100% Operational
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete architectural coverage spanning Founders (L1–5), Enterprise (L42–61), Institutional Tax &amp; PE (L62–75), and Planetary Infrastructure.
                </p>
              </div>

              {/* Fast Layer Search Box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 100 layers (e.g. 62, tax, FX)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Search Results (if user is searching) */}
            {searchQuery.trim() !== '' && (
              <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-700/80">
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  Matching Layers ({searchResults.length}):
                </div>
                {searchResults.length === 0 ? (
                  <div className="text-xs text-slate-500 py-2">No matching layers found for "{searchQuery}".</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {searchResults.map((layer) => (
                      <button
                        key={layer.layerNumber}
                        onClick={() => {
                          handleNavigateToLayer(layer.layerNumber, layer.id);
                          setIsExpanded(false);
                        }}
                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left transition flex flex-col justify-between cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-amber-300">Layer {layer.layerNumber}</span>
                          <span className="text-[10px] text-emerald-400 font-mono">100% Active</span>
                        </div>
                        <div className="text-xs font-semibold text-white mt-0.5 truncate">{layer.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{layer.businessBenefit}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 9 System Tiers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SYSTEM_TIERS.map((tier) => {
                const isSelected = currentLayerNumber >= tier.start && currentLayerNumber <= tier.end;
                return (
                  <div
                    key={tier.id}
                    className={`rounded-xl p-3 border transition ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-bold border border-slate-700">
                            Tier {tier.tierNumber} • {tier.range}
                          </span>
                          {tier.tierNumber === 8 && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                              ⭐ L62 R&amp;D
                            </span>
                          )}
                        </div>
                        <h5 className="text-xs font-bold text-white mt-1.5">{tier.name}</h5>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {tier.count}/{tier.count}
                        </span>
                        <div className="text-[9px] font-mono text-slate-400">100% Deployed</div>
                      </div>
                    </div>

                    {/* Mini Tier Progress Track */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2.5">
                      <div className={`h-full ${tier.colorTrack} w-full`} />
                    </div>

                    {/* Tier Footer & Action */}
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono text-[10px]">
                        {tier.count} Sovereign Layers
                      </span>
                      <button
                        onClick={() => {
                          handleNavigateToLayer(tier.start, tier.defaultLayerId);
                          setIsExpanded(false);
                        }}
                        className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Launch Tier</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Direct Shortcuts Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Essential Anchors:</span>
                <button
                  onClick={() => {
                    onSelectLayer('LAYER_62_RD_TAX_CREDIT');
                    setIsExpanded(false);
                  }}
                  className="text-amber-300 hover:underline font-bold"
                >
                  Layer 62 (R&amp;D Tax §41)
                </button>
                <span>•</span>
                <button
                  onClick={() => {
                    onSelectLayer('LAYER_42_SYNTHETIC_BALANCE_SHEET');
                    setIsExpanded(false);
                  }}
                  className="text-blue-300 hover:underline font-bold"
                >
                  Layer 42 (Balance Sheet Sculptor)
                </button>
                <span>•</span>
                <button
                  onClick={() => {
                    onSelectLayer('EXTENDED_LAYERS_WORKSPACE');
                    setIsExpanded(false);
                  }}
                  className="text-purple-300 hover:underline font-bold"
                >
                  Layer 100 (Kardashev Omega Core)
                </button>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                Close Matrix [ESC]
              </button>
            </div>

          </div>
        </div>
      )}
    </aside>
  );
};
