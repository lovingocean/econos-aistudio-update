import React, { useState, useMemo, useEffect } from 'react';
import { 
  MASTER_100_LAYERS, 
  getLayerByNumber, 
  getLayerById 
} from '../../data/master100LayersData';
import { AppLayer, MasterLayerSpec } from '../../types/econos';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  RotateCcw, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpRight, 
  Layers, 
  Bot, 
  Sparkles, 
  Flame, 
  Compass, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

export type ActivityLevel = 'CRITICAL_ATTENTION' | 'HIGH_ACTIVITY' | 'NOMINAL_EXECUTION' | 'STANDBY';

export interface LayerActivityState {
  layerNumber: number;
  activityLevel: ActivityLevel;
  agentName: string;
  activeWorkload: string;
  pendingActions: number;
  throughputTps: number;
  lastAgentPing: string;
  attentionReason?: string;
}

interface LayerActivityHeatmapProps {
  currentLayer?: AppLayer;
  onSelectLayer: (layer: AppLayer) => void;
}

// Initial baseline realistic activity mapping across all 100 layers
const generateBaselineActivity = (): Record<number, LayerActivityState> => {
  const map: Record<number, LayerActivityState> = {};

  MASTER_100_LAYERS.forEach((layer) => {
    const num = layer.layerNumber;
    let level: ActivityLevel = 'NOMINAL_EXECUTION';
    let agentName = 'Autonomous Core Daemon';
    let activeWorkload = 'Heartbeat telemetry polling';
    let pendingActions = Math.floor((num * 7) % 5);
    let throughputTps = 12 + ((num * 13) % 45);
    let attentionReason: string | undefined = undefined;

    // Critical attention layers (flagged for agent intervention)
    if (num === 62) {
      level = 'CRITICAL_ATTENTION';
      agentName = 'Tax-Credit-Sentinel-v4';
      activeWorkload = 'IRS Form 6765 §41 QRE wage verification pending final sign-off';
      pendingActions = 4;
      throughputTps = 88;
      attentionReason = 'Q3 Software Dev QRE wages ($284,000) require contemporaneous audit lock';
    } else if (num === 48) {
      level = 'CRITICAL_ATTENTION';
      agentName = 'Supply-Distress-Radar';
      activeWorkload = 'Tier-2 component vendor Altman-Z score degraded to 1.4';
      pendingActions = 3;
      throughputTps = 42;
      attentionReason = 'Taiwan substrate supplier late shipment probability 78%';
    } else if (num === 45) {
      level = 'CRITICAL_ATTENTION';
      agentName = 'FX-Hedging-Oracle';
      activeWorkload = 'EUR/USD open exposure exceeds $500K variance limit';
      pendingActions = 2;
      throughputTps = 110;
      attentionReason = 'Unhedged Q4 payable requires automated forward contract';
    } else if (num === 61) {
      level = 'CRITICAL_ATTENTION';
      agentName = 'LBO-Covenant-Monitor';
      activeWorkload = 'Senior Leverage covenant headroom at 0.35x';
      pendingActions = 2;
      throughputTps = 35;
      attentionReason = 'Debt-to-EBITDA buffer testing required before quarterly close';
    } else if (num === 16) {
      level = 'CRITICAL_ATTENTION';
      agentName = 'Reg-Radar-Compliance';
      activeWorkload = 'OFAC SDN & EU Sanctions List delta ingestion';
      pendingActions = 5;
      throughputTps = 64;
      attentionReason = 'New maritime routing compliance rule requires contract update';
    } else if (num === 44) {
      level = 'CRITICAL_ATTENTION';
      agentName = 'Working-Capital-Arbitrageur';
      activeWorkload = 'DSO lengthened by 4.2 days across 3 enterprise accounts';
      pendingActions = 3;
      throughputTps = 56;
      attentionReason = 'Automate early payment discount incentives on $140K receivables';
    } 
    // High activity layers (heavy live autonomous compute)
    else if ([1, 2, 6, 7, 8, 11, 15, 23, 26, 33, 36, 42, 43, 47, 52, 53, 57, 63, 64, 65].includes(num)) {
      level = 'HIGH_ACTIVITY';
      agentName = num === 1 ? 'FinOps-GL-Ingest' : num === 2 ? 'Maps-AI-Voice-Dialer' : num === 43 ? 'SOFR-Overnight-Sweeper' : num === 52 ? 'Dynamic-Price-Optimizer' : 'High-Throughput-Agent';
      activeWorkload = num === 43 ? 'Executing $480K zero-balance sweep to SOFR yield account' : num === 2 ? 'Dialing 8 qualified B2B prospects via Maps pipeline' : 'Active autonomous workload execution';
      pendingActions = 8 + (num % 6);
      throughputTps = 120 + (num % 80);
    }
    // Deep standby layers
    else if (num >= 85) {
      level = 'STANDBY';
      agentName = 'Deep-Continuum-Observer';
      activeWorkload = 'Long-horizon relativistic cold-storage standby';
      pendingActions = 0;
      throughputTps = 2;
    }

    map[num] = {
      layerNumber: num,
      activityLevel: level,
      agentName,
      activeWorkload,
      pendingActions,
      throughputTps,
      lastAgentPing: 'Active just now',
      attentionReason
    };
  });

  return map;
};

export const LayerActivityHeatmap: React.FC<LayerActivityHeatmapProps> = ({
  currentLayer,
  onSelectLayer
}) => {
  const [activityMap, setActivityMap] = useState<Record<number, LayerActivityState>>(generateBaselineActivity);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedHeatFilter, setSelectedHeatFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'TIER_7_8'>('ALL');
  const [activeHoverLayerNum, setActiveHoverLayerNum] = useState<number | null>(62);
  const [isRebalancing, setIsRebalancing] = useState<boolean>(false);
  const [rebalanceMessage, setRebalanceMessage] = useState<string | null>(null);

  // Compute counts
  const stats = useMemo(() => {
    let critical = 0;
    let high = 0;
    let nominal = 0;
    let standby = 0;

    Object.values(activityMap).forEach((st) => {
      if (st.activityLevel === 'CRITICAL_ATTENTION') critical++;
      else if (st.activityLevel === 'HIGH_ACTIVITY') high++;
      else if (st.activityLevel === 'NOMINAL_EXECUTION') nominal++;
      else standby++;
    });

    return { critical, high, nominal, standby, total: 100 };
  }, [activityMap]);

  // Current active layer number
  const currentLayerNum = useMemo(() => {
    if (!currentLayer) return 1;
    if (currentLayer === 'LAYER_62_RD_TAX_CREDIT' || currentLayer === 'LAYER_62') return 62;
    const spec = getLayerById(currentLayer);
    if (spec) return spec.layerNumber;
    const match = currentLayer.match(/\d+/);
    if (match) return parseInt(match[0], 10);
    return 1;
  }, [currentLayer]);

  // Hovered layer metadata
  const hoveredSpec = useMemo(() => {
    const targetNum = activeHoverLayerNum || currentLayerNum;
    return getLayerByNumber(targetNum) || MASTER_100_LAYERS[0];
  }, [activeHoverLayerNum, currentLayerNum]);

  const hoveredState = useMemo(() => {
    const targetNum = activeHoverLayerNum || currentLayerNum;
    return activityMap[targetNum];
  }, [activeHoverLayerNum, currentLayerNum, activityMap]);

  // Handler to simulate agent rebalance
  const handleTriggerAgentRebalance = () => {
    setIsRebalancing(true);
    setRebalanceMessage('Dispatching autonomous agent swarm across 100 layers...');

    setTimeout(() => {
      setActivityMap(prev => {
        const next = { ...prev };
        // Resolve one critical layer and simulate shift
        if (next[62]) {
          next[62] = {
            ...next[62],
            pendingActions: 1,
            activeWorkload: 'Form 6765 audit evidence verified; ready for electronic IRS transmission',
            attentionReason: 'Audit trail signed off by Autonomous Agent Tax-Sentinel'
          };
        }
        if (next[45]) {
          next[45] = {
            ...next[45],
            activityLevel: 'HIGH_ACTIVITY',
            pendingActions: 0,
            activeWorkload: 'Autonomous EUR forward hedge executed at 1.0842 spot parity'
          };
        }
        return next;
      });
      setIsRebalancing(false);
      setRebalanceMessage('Agent swarm rebalance complete: 2 critical bottlenecks resolved.');
      setTimeout(() => setRebalanceMessage(null), 4500);
    }, 1200);
  };

  const handleLayerClick = (num: number) => {
    if (num === 62) {
      onSelectLayer('LAYER_62_RD_TAX_CREDIT');
    } else {
      const spec = getLayerByNumber(num);
      if (spec && num <= 41 && !spec.id.startsWith('LAYER_')) {
        onSelectLayer(spec.id as AppLayer);
      } else {
        onSelectLayer(`LAYER_${num}` as AppLayer);
      }
    }
  };

  return (
    <section 
      id="layer-activity-heatmap-footer"
      aria-label="Layer Activity Heatmap"
      className="border-t border-slate-200 bg-white/95 text-slate-800 shadow-sm transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Header: Title, Telemetry Counters & Expand/Collapse Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-amber-400">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 tracking-wide font-mono uppercase flex items-center gap-2">
                  <span>Layer Activity Heatmap</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-normal bg-slate-100 text-slate-600 border border-slate-200">
                    100 Sovereign Layers
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 font-sans">
                  Real-time autonomous agent attention, active compute throughput, and operational friction.
                </p>
              </div>
            </div>

            {/* Quick Status Legend Counters */}
            <div className="flex items-center gap-2 text-[11px] font-mono flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>{stats.critical} Critical Attention</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{stats.high} High Activity</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{stats.nominal} Nominal</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>{stats.standby} Standby</span>
              </span>
            </div>
          </div>

          {/* Right Controls: Filter Buttons, Rebalance Agent Swarm & Toggle */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs font-mono">
            {/* Autonomous Rebalance Trigger */}
            <button
              id="rebalance-agents-btn"
              onClick={handleTriggerAgentRebalance}
              disabled={isRebalancing}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Dispatches autonomous agent swarm to resolve bottlenecks"
            >
              <Bot className={`w-3.5 h-3.5 ${isRebalancing ? 'animate-spin' : 'text-amber-400'}`} />
              <span>{isRebalancing ? 'Sweeping...' : 'Agent Rebalance'}</span>
            </button>

            {/* Collapse / Expand Toggle */}
            <button
              id="toggle-heatmap-drawer-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold transition flex items-center gap-1 cursor-pointer"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {rebalanceMessage && (
          <div className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{rebalanceMessage}</span>
          </div>
        )}

        {isExpanded && (
          <div className="mt-3 space-y-3">
            {/* Filter Tabs */}
            <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <span className="text-slate-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> View:
                </span>
                <button
                  onClick={() => setSelectedHeatFilter('ALL')}
                  className={`px-2 py-0.5 rounded transition cursor-pointer font-bold ${
                    selectedHeatFilter === 'ALL'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All 100
                </button>
                <button
                  onClick={() => setSelectedHeatFilter('CRITICAL')}
                  className={`px-2 py-0.5 rounded transition cursor-pointer font-bold ${
                    selectedHeatFilter === 'CRITICAL'
                      ? 'bg-rose-600 text-white'
                      : 'text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  Needs Attention ({stats.critical})
                </button>
                <button
                  onClick={() => setSelectedHeatFilter('HIGH')}
                  className={`px-2 py-0.5 rounded transition cursor-pointer font-bold ${
                    selectedHeatFilter === 'HIGH'
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  High Activity ({stats.high})
                </button>
                <button
                  onClick={() => setSelectedHeatFilter('TIER_7_8')}
                  className={`px-2 py-0.5 rounded transition cursor-pointer font-bold ${
                    selectedHeatFilter === 'TIER_7_8'
                      ? 'bg-amber-600 text-white'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  Enterprise &amp; Tax (L42–75)
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Hover over any cell for agent diagnostic • Click to jump directly to layer
              </div>
            </div>

            {/* 100-Cell Dense Interactive Heatmap Grid */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-inner">
              <div className="grid grid-cols-10 sm:grid-cols-20 md:grid-cols-25 lg:grid-cols-50 gap-1.5">
                {MASTER_100_LAYERS.map((layer) => {
                  const num = layer.layerNumber;
                  const st = activityMap[num];
                  const isCurrent = currentLayerNum === num;
                  const isHovered = activeHoverLayerNum === num;

                  // Filter visibility
                  if (selectedHeatFilter === 'CRITICAL' && st?.activityLevel !== 'CRITICAL_ATTENTION') {
                    return (
                      <div 
                        key={num} 
                        className="h-8 rounded opacity-15 bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-500"
                      >
                        {num}
                      </div>
                    );
                  }
                  if (selectedHeatFilter === 'HIGH' && st?.activityLevel !== 'HIGH_ACTIVITY') {
                    return (
                      <div 
                        key={num} 
                        className="h-8 rounded opacity-15 bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-500"
                      >
                        {num}
                      </div>
                    );
                  }
                  if (selectedHeatFilter === 'TIER_7_8' && (num < 42 || num > 75)) {
                    return (
                      <div 
                        key={num} 
                        className="h-8 rounded opacity-15 bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-500"
                      >
                        {num}
                      </div>
                    );
                  }

                  // Determine cell color by heat
                  let cellClasses = 'bg-slate-800 text-slate-400 border-slate-700';
                  if (st?.activityLevel === 'CRITICAL_ATTENTION') {
                    cellClasses = 'bg-gradient-to-br from-rose-600 to-rose-700 text-white font-bold border-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.4)] animate-pulse';
                  } else if (st?.activityLevel === 'HIGH_ACTIVITY') {
                    cellClasses = 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold border-blue-400 shadow-xs';
                  } else if (st?.activityLevel === 'NOMINAL_EXECUTION') {
                    cellClasses = 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900';
                  } else {
                    cellClasses = 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700';
                  }

                  if (isCurrent) {
                    cellClasses += ' ring-2 ring-amber-400 scale-105 z-10';
                  }

                  return (
                    <button
                      key={num}
                      id={`heatmap-cell-layer-${num}`}
                      onClick={() => handleLayerClick(num)}
                      onMouseEnter={() => setActiveHoverLayerNum(num)}
                      className={`h-8 rounded flex flex-col items-center justify-center text-[10px] font-mono border transition-all duration-150 relative cursor-pointer group ${cellClasses}`}
                      title={`Layer ${num}: ${layer.name} (${st?.activityLevel || 'NOMINAL'})`}
                    >
                      <span className="leading-none">{num}</span>
                      {st?.activityLevel === 'CRITICAL_ATTENTION' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 absolute top-0.5 right-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Inspection & Diagnostic Panel for Hovered / Active Layer */}
            {hoveredSpec && hoveredState && (
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg border font-mono font-bold text-center shrink-0 ${
                    hoveredState.activityLevel === 'CRITICAL_ATTENTION'
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : hoveredState.activityLevel === 'HIGH_ACTIVITY'
                      ? 'bg-blue-100 text-blue-900 border-blue-300'
                      : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}>
                    <div className="text-[10px] uppercase">Layer</div>
                    <div className="text-base font-black leading-tight">{hoveredSpec.layerNumber}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="font-bold text-slate-900 text-sm">
                        {hoveredSpec.name}
                      </h5>
                      <span className={`px-2 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                        hoveredState.activityLevel === 'CRITICAL_ATTENTION'
                          ? 'bg-rose-600 text-white'
                          : hoveredState.activityLevel === 'HIGH_ACTIVITY'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {hoveredState.activityLevel.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {hoveredSpec.categoryLabel}
                      </span>
                    </div>

                    <p className="text-slate-600 mt-0.5">
                      {hoveredSpec.subtitle}
                    </p>

                    {/* Attention Reason or Active Task */}
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] font-mono flex-wrap">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Bot className="w-3 h-3 text-slate-400" />
                        <span className="font-semibold text-slate-700">{hoveredState.agentName}</span>
                      </span>
                      <span>•</span>
                      <span className="text-slate-700">
                        <span className="text-slate-400">Workload:</span> {hoveredState.activeWorkload}
                      </span>
                      {hoveredState.attentionReason && (
                        <>
                          <span>•</span>
                          <span className="text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                            ⚠️ {hoveredState.attentionReason}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Metrics & Jump Button */}
                <div className="flex items-center gap-3 self-end md:self-auto shrink-0 font-mono">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] text-slate-400">Pending Actions</div>
                    <div className="text-sm font-bold text-slate-800">{hoveredState.pendingActions} tasks</div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] text-slate-400">Throughput</div>
                    <div className="text-sm font-bold text-slate-800">{hoveredState.throughputTps} TPS</div>
                  </div>

                  <button
                    onClick={() => handleLayerClick(hoveredSpec.layerNumber)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Launch Layer</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
