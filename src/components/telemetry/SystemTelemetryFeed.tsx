import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  MASTER_100_LAYERS, 
  getLayerByNumber, 
  getLayerById 
} from '../../data/master100LayersData';
import { AppLayer } from '../../types/econos';
import { 
  Activity, 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  Search, 
  Download, 
  ExternalLink, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Radio, 
  Flame 
} from 'lucide-react';

export type TelemetrySeverity = 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL';
export type TelemetryEventType = 
  | 'CROSS_LAYER_SYNC' 
  | 'AUTONOMOUS_EXECUTION' 
  | 'ARBITRAGE_CAPTURE' 
  | 'AUDIT_PROOF_GENERATION' 
  | 'THREAT_MITIGATION' 
  | 'MARGIN_OPTIMIZATION';

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  timeMs: number;
  sourceLayerNumber: number;
  sourceLayerName: string;
  targetLayerNumber: number;
  targetLayerName: string;
  agentId: string;
  eventType: TelemetryEventType;
  severity: TelemetrySeverity;
  headline: string;
  detail: string;
  metricImpact?: string;
  cryptographicHash: string;
  latencyMs: number;
  verified: boolean;
}

interface SystemTelemetryFeedProps {
  currentLayer?: AppLayer;
  onSelectLayer: (layer: AppLayer) => void;
}

let globalEventCounter = 10000;
const createUniqueEventId = (): string => {
  globalEventCounter += 1;
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `EVT-${time}-${globalEventCounter}-${rand}`;
};

const INITIAL_TELEMETRY_EVENTS: TelemetryEvent[] = [
  {
    id: 'EVT-INIT-9921',
    timestamp: '03:28:44.120',
    timeMs: Date.now() - 4000,
    sourceLayerNumber: 62,
    sourceLayerName: 'Layer 62: R&D Tax Credit (§41)',
    targetLayerNumber: 42,
    targetLayerName: 'Layer 42: Synthetic Balance Sheet',
    agentId: 'Tax-Credit-Sentinel-v4',
    eventType: 'CROSS_LAYER_SYNC',
    severity: 'SUCCESS',
    headline: 'IRS Form 6765 Qualified Research Wage Allocation Synchronized',
    detail: 'Verified $284,500 software engineering QREs; locked contemporaneous evidence hash into balance sheet intangible asset ledger.',
    metricImpact: '+$56,900 Tax Credit Captured',
    cryptographicHash: '0x8f4c19...b72e',
    latencyMs: 1.4,
    verified: true
  },
  {
    id: 'EVT-INIT-9920',
    timestamp: '03:28:39.840',
    timeMs: Date.now() - 9000,
    sourceLayerNumber: 43,
    sourceLayerName: 'Layer 43: Autonomous Treasury Sweeper',
    targetLayerNumber: 13,
    targetLayerName: 'Layer 13: DeFi Reserve Engine',
    agentId: 'SOFR-Liquidity-Daemon',
    eventType: 'ARBITRAGE_CAPTURE',
    severity: 'SUCCESS',
    headline: 'Autonomous Overnight Liquidity Sweep Executed to SOFR Yield',
    detail: 'Detected $480,000 idle cash balance across Chase and Mercury operating accounts; reallocated into tokenized overnight reverse repo at 5.32% APY.',
    metricImpact: '+$71.20/day Net Yield',
    cryptographicHash: '0x3a91e4...d198',
    latencyMs: 2.1,
    verified: true
  },
  {
    id: 'EVT-INIT-9919',
    timestamp: '03:28:34.210',
    timeMs: Date.now() - 14000,
    sourceLayerNumber: 2,
    sourceLayerName: 'Layer 2: Client Acquisition & Maps Voice',
    targetLayerNumber: 1,
    targetLayerName: 'Layer 1: Enterprise Business FinOps',
    agentId: 'Maps-Voice-Dialer-AI',
    eventType: 'AUTONOMOUS_EXECUTION',
    severity: 'INFO',
    headline: 'Voice AI Outbound Prospect Converted to Signed Service Order',
    detail: 'Autonomous phone agent completed 4-minute diagnostic call with Apex Logistics; scheduled meeting and generated initial $14,500 onboarding invoice.',
    metricImpact: '+$174,000 Pipeline ARR',
    cryptographicHash: '0x17c88a...9f31',
    latencyMs: 0.8,
    verified: true
  },
  {
    id: 'EVT-INIT-9918',
    timestamp: '03:28:28.990',
    timeMs: Date.now() - 20000,
    sourceLayerNumber: 48,
    sourceLayerName: 'Layer 48: Sub-Tier Supplier Contagion',
    targetLayerNumber: 7,
    targetLayerName: 'Layer 7: Global Network Shock Propagation',
    agentId: 'Supply-Chain-Risk-Oracle',
    eventType: 'THREAT_MITIGATION',
    severity: 'WARNING',
    headline: 'Tier-2 Supplier Insolvency Pre-Empted via Alternate Node Router',
    detail: 'Early warning credit distress trigger detected on packaging supplier in Taoyuan (Altman-Z: 1.38); automatically redirected $45,000 PO to pre-cleared backup vendor.',
    metricImpact: '42 Days Delay Prevented',
    cryptographicHash: '0x62e49c...8b10',
    latencyMs: 3.4,
    verified: true
  },
  {
    id: 'EVT-INIT-9917',
    timestamp: '03:28:22.450',
    timeMs: Date.now() - 26000,
    sourceLayerNumber: 45,
    sourceLayerName: 'Layer 45: Multi-Currency FX Hedging',
    targetLayerNumber: 1,
    targetLayerName: 'Layer 1: FinOps Core',
    agentId: 'FX-Hedging-Oracle',
    eventType: 'MARGIN_OPTIMIZATION',
    severity: 'CRITICAL',
    headline: 'EUR/USD Open Variance Spike Triggered Forward Contract Lock',
    detail: 'Unhedged Q4 vendor disbursement of €420,000 triggered volatility guardrail; locked autonomous forward rate at 1.0842, eliminating $18,400 downside risk.',
    metricImpact: '$18,400 FX Variance Hedged',
    cryptographicHash: '0x992b41...7a04',
    latencyMs: 1.9,
    verified: true
  },
  {
    id: 'EVT-INIT-9916',
    timestamp: '03:28:15.110',
    timeMs: Date.now() - 33000,
    sourceLayerNumber: 52,
    sourceLayerName: 'Layer 52: Dynamic Pricing & Margin Engine',
    targetLayerNumber: 9,
    targetLayerName: 'Layer 9: Executive Command Center',
    agentId: 'Margin-Arbiter-Engine',
    eventType: 'MARGIN_OPTIMIZATION',
    severity: 'SUCCESS',
    headline: 'Real-Time Compute Cost Surge Adjusted via Dynamic Rate Card',
    detail: 'Upstream GPU cloud cluster wholesale pricing rose 3.8%; automatically adapted customer per-seat API overage rates to preserve 74.5% target gross margin.',
    metricImpact: '74.5% Gross Margin Protected',
    cryptographicHash: '0xbb1047...c291',
    latencyMs: 0.9,
    verified: true
  },
  {
    id: 'EVT-INIT-9915',
    timestamp: '03:28:08.620',
    timeMs: Date.now() - 40000,
    sourceLayerNumber: 23,
    sourceLayerName: 'Layer 23: Orbital Satellite Escrow',
    targetLayerNumber: 33,
    targetLayerName: 'Layer 33: Omni RTGS Clearing Mesh',
    agentId: 'Orbital-Escrow-Kernel',
    eventType: 'AUDIT_PROOF_GENERATION',
    severity: 'SUCCESS',
    headline: 'Maritime Bill of Lading Atomic Release via AIS Starlink Telemetry',
    detail: 'Container vessel CMA CGM Marco Polo crossed Rotterdam port GPS geofence; smart contract released $1.28M escrow balance to supplier within 840 milliseconds.',
    metricImpact: '840ms Atomic Settlement',
    cryptographicHash: '0x5501aa...e473',
    latencyMs: 0.84,
    verified: true
  },
  {
    id: 'EVT-INIT-9914',
    timestamp: '03:28:01.300',
    timeMs: Date.now() - 47000,
    sourceLayerNumber: 100,
    sourceLayerName: 'Layer 100: Kardashev Omega Core',
    targetLayerNumber: 41,
    targetLayerName: 'Layer 41: Omni Civilization Anchor',
    agentId: 'Omega-Core-Sentinel',
    eventType: 'AUDIT_PROOF_GENERATION',
    severity: 'INFO',
    headline: 'Planetary 100-Layer Sovereign Merkle Checkpoint Sealed',
    detail: 'Synchronized cross-layer state tree across Svalbard Arctic seed vault and Atacama deep optical nodes; zero drift detected across 100 layers.',
    metricImpact: '100-Year Audit Proof Sealed',
    cryptographicHash: '0x00fa99...ff01',
    latencyMs: 4.8,
    verified: true
  }
];

// Pool of dynamic realistic events for live simulation streaming
const DYNAMIC_EVENT_TEMPLATES = [
  {
    sourceNum: 62,
    targetNum: 57,
    agentId: 'Tax-Credit-Sentinel-v4',
    eventType: 'CROSS_LAYER_SYNC' as TelemetryEventType,
    severity: 'SUCCESS' as TelemetrySeverity,
    headline: 'Contemporaneous Engineering Git Commits Bound to §41 QRE Activity',
    detail: 'Processed 148 pull requests in repos matching R&D technical uncertainty criteria; mapped directly to Form 6765 audit binder.',
    metricImpact: '+$14,200 Incremental QRE',
    latencyMs: 1.1
  },
  {
    sourceNum: 1,
    targetNum: 43,
    agentId: 'FinOps-GL-Ingest',
    eventType: 'AUTONOMOUS_EXECUTION' as TelemetryEventType,
    severity: 'INFO' as TelemetrySeverity,
    headline: 'Continuous Ledger Reconciliation: 3-Way Match Verified',
    detail: 'Autonomous OCR matched Stripe payout, AWS cloud invoice, and bank debit memo with zero variance.',
    metricImpact: '100% Match Confidence',
    latencyMs: 0.6
  },
  {
    sourceNum: 44,
    targetNum: 1,
    agentId: 'Working-Capital-Arbitrageur',
    eventType: 'MARGIN_OPTIMIZATION' as TelemetryEventType,
    severity: 'SUCCESS' as TelemetrySeverity,
    headline: 'Dynamic Early Payment Discount (2/10 Net 30) Triggered',
    detail: 'Offered 1.8% accelerated settlement discount to Enterprise Tier customer; shortened cash conversion cycle by 18 days.',
    metricImpact: '+$64,000 Cash Accelerated',
    latencyMs: 1.8
  },
  {
    sourceNum: 61,
    targetNum: 42,
    agentId: 'LBO-Covenant-Monitor',
    eventType: 'THREAT_MITIGATION' as TelemetryEventType,
    severity: 'WARNING' as TelemetrySeverity,
    headline: 'Senior Leverage Headroom Stress Test Evaluated at 0.38x Buffer',
    detail: 'Monte Carlo macro rate increase (+50bps) simulated against Q4 debt service; verified compliance with lenders covenant terms.',
    metricImpact: 'Covenant Status: COMPLIANT',
    latencyMs: 2.7
  },
  {
    sourceNum: 36,
    targetNum: 30,
    agentId: 'Baseload-Thermodynamic-Arbiter',
    eventType: 'AUTONOMOUS_EXECUTION' as TelemetryEventType,
    severity: 'INFO' as TelemetrySeverity,
    headline: 'Curtailed Geothermal Baseload Power Redirected to AI Compute Nodes',
    detail: 'Direct transmission interconnect ingested 8.4 MW off-peak clean power at $0.019/kWh for batch autonomous training.',
    metricImpact: '8.4 MW Clean Power Dispatched',
    latencyMs: 1.3
  },
  {
    sourceNum: 16,
    targetNum: 17,
    agentId: 'Reg-Radar-Sentinel',
    eventType: 'CROSS_LAYER_SYNC' as TelemetryEventType,
    severity: 'INFO' as TelemetrySeverity,
    headline: 'Statutory Ingestion: Treasury FinCEN BOI Reporting Rule Synced',
    detail: 'Beneficial ownership updates compiled into zero-knowledge corporate disclosure vault with tamper-evident seal.',
    metricImpact: 'Statutory Shield Active',
    latencyMs: 0.9
  },
  {
    sourceNum: 2,
    targetNum: 9,
    agentId: 'Maps-Voice-Dialer-AI',
    eventType: 'AUTONOMOUS_EXECUTION' as TelemetryEventType,
    severity: 'SUCCESS' as TelemetrySeverity,
    headline: 'AI Voice Calling Campaign: 12 B2B Leads Contacted & Qualified',
    detail: 'Processed geographic cluster in Chicago Metro; 3 booked consultations for Econos Enterprise onboarding.',
    metricImpact: '25% Meeting Conversion Rate',
    latencyMs: 1.5
  }
];

export const SystemTelemetryFeed: React.FC<SystemTelemetryFeedProps> = ({
  currentLayer,
  onSelectLayer
}) => {
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_TELEMETRY_EVENTS);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedEvent, setInspectedEvent] = useState<TelemetryEvent | null>(INITIAL_TELEMETRY_EVENTS[0]);
  const [streamingSpeedSeconds, setStreamingSpeedSeconds] = useState<number>(3);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Live event ticker
  useEffect(() => {
    if (!isLiveStreaming) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      const template = DYNAMIC_EVENT_TEMPLATES[Math.floor(Math.random() * DYNAMIC_EVENT_TEMPLATES.length)];
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      const srcLayer = getLayerByNumber(template.sourceNum);
      const tgtLayer = getLayerByNumber(template.targetNum);

      const randomHex = Math.random().toString(16).substring(2, 8);
      const newEvent: TelemetryEvent = {
        id: createUniqueEventId(),
        timestamp: timeStr,
        timeMs: Date.now(),
        sourceLayerNumber: template.sourceNum,
        sourceLayerName: srcLayer ? `Layer ${template.sourceNum}: ${srcLayer.shortName}` : `Layer ${template.sourceNum}`,
        targetLayerNumber: template.targetNum,
        targetLayerName: tgtLayer ? `Layer ${template.targetNum}: ${tgtLayer.shortName}` : `Layer ${template.targetNum}`,
        agentId: template.agentId,
        eventType: template.eventType,
        severity: template.severity,
        headline: template.headline,
        detail: template.detail,
        metricImpact: template.metricImpact,
        cryptographicHash: `0x${randomHex}...${Math.random().toString(16).substring(2, 6)}`,
        latencyMs: template.latencyMs,
        verified: true
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 35)]);
    }, streamingSpeedSeconds * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLiveStreaming, streamingSpeedSeconds]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      if (selectedSeverity !== 'ALL' && evt.severity !== selectedSeverity && selectedSeverity !== 'CROSS_LAYER') {
        return false;
      }
      if (selectedSeverity === 'CROSS_LAYER' && evt.eventType !== 'CROSS_LAYER_SYNC') {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          evt.headline.toLowerCase().includes(q) ||
          evt.detail.toLowerCase().includes(q) ||
          evt.agentId.toLowerCase().includes(q) ||
          evt.sourceLayerName.toLowerCase().includes(q) ||
          evt.targetLayerName.toLowerCase().includes(q) ||
          evt.cryptographicHash.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [events, selectedSeverity, searchQuery]);

  // Statistics
  const eventStats = useMemo(() => {
    let crossLayerCount = 0;
    let criticalCount = 0;
    let avgLatency = 0;

    events.forEach(e => {
      if (e.eventType === 'CROSS_LAYER_SYNC') crossLayerCount++;
      if (e.severity === 'CRITICAL' || e.severity === 'WARNING') criticalCount++;
      avgLatency += e.latencyMs;
    });

    return {
      total: events.length,
      crossLayerCount,
      criticalCount,
      avgLatency: (avgLatency / (events.length || 1)).toFixed(1)
    };
  }, [events]);

  const handleLayerJump = (layerNum: number) => {
    if (layerNum === 62) {
      onSelectLayer('LAYER_62_RD_TAX_CREDIT');
    } else {
      const spec = getLayerByNumber(layerNum);
      if (spec && layerNum <= 41 && !spec.id.startsWith('LAYER_')) {
        onSelectLayer(spec.id as AppLayer);
      } else {
        onSelectLayer(`LAYER_${layerNum}` as AppLayer);
      }
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `econos-telemetry-feed-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div 
      id="system-telemetry-feed-container" 
      aria-label="System Telemetry Feed"
      className="rounded-2xl border border-slate-800 bg-[#0b1220] text-slate-100 shadow-xl overflow-hidden transition-all duration-300"
    >
      {/* Top Header Bar: Telemetry Status, Live Beacon & Quick Controls */}
      <div className="px-4 py-3 bg-[#0f172a] border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Radio className={`w-4 h-4 ${isLiveStreaming ? 'animate-pulse text-emerald-400' : 'text-slate-400'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                  System Telemetry Feed
                </h3>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold border ${
                  isLiveStreaming 
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                    : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                }`}>
                  {isLiveStreaming ? 'LIVE STREAMING' : 'STREAM PAUSED'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Real-time autonomous agent event ledger &amp; cross-layer state synchronizations.
              </p>
            </div>
          </div>

          {/* Real-Time Metric Badges */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {eventStats.total} Events Cached
            </span>
            <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-700/60 text-indigo-300 font-semibold">
              {eventStats.crossLayerCount} Cross-Layer Syncs
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
              Avg Latency: <span className="text-emerald-400 font-bold">{eventStats.avgLatency}ms</span>
            </span>
          </div>
        </div>

        {/* Action Controls: Pause/Play, Clear, Export, Expand/Collapse */}
        <div className="flex items-center gap-2 self-end md:self-auto text-xs font-mono">
          <button
            id="telemetry-pause-play-btn"
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`px-2.5 py-1 rounded-lg border font-bold transition flex items-center gap-1.5 cursor-pointer ${
              isLiveStreaming
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
            }`}
            title={isLiveStreaming ? 'Pause live stream' : 'Resume live stream'}
          >
            {isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLiveStreaming ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            id="telemetry-export-btn"
            onClick={handleExportJson}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1 cursor-pointer"
            title="Export event logs as JSON audit file"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            id="telemetry-collapse-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1 cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-3">
          {/* Secondary Control Bar: Search & Severity Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
              <span className="text-slate-500 text-[11px] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>

              <button
                onClick={() => setSelectedSeverity('ALL')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  selectedSeverity === 'ALL'
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({events.length})
              </button>

              <button
                onClick={() => setSelectedSeverity('CROSS_LAYER')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  selectedSeverity === 'CROSS_LAYER'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-950/60 text-indigo-300 hover:bg-indigo-900'
                }`}
              >
                Cross-Layer Mesh
              </button>

              <button
                onClick={() => setSelectedSeverity('SUCCESS')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  selectedSeverity === 'SUCCESS'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900'
                }`}
              >
                Success
              </button>

              <button
                onClick={() => setSelectedSeverity('WARNING')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  selectedSeverity === 'WARNING'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-950/60 text-amber-300 hover:bg-amber-900'
                }`}
              >
                Warnings
              </button>

              <button
                onClick={() => setSelectedSeverity('CRITICAL')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                  selectedSeverity === 'CRITICAL'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-950/60 text-rose-300 hover:bg-rose-900'
                }`}
              >
                Critical
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search telemetry (e.g. 62, SOFR, IRS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Main Feed Display: 2-Column Split (Event Log List & Event Detail Inspector) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            
            {/* Left/Main Column: Event Log List (Scrollable) */}
            <div className="lg:col-span-7 xl:col-span-8 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-[380px]">
              <div className="px-3 py-2 bg-slate-800/80 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>EVENT STREAM ({filteredEvents.length})</span>
                <span className="text-[10px] text-slate-500">Click any row to inspect proof</span>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 text-xs font-mono">
                {filteredEvents.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    No telemetry events match query "{searchQuery}".
                  </div>
                ) : (
                  filteredEvents.map((evt, idx) => {
                    const isSelected = inspectedEvent?.id === evt.id;
                    return (
                      <div
                        key={evt.id || `evt-row-${idx}`}
                        id={`telemetry-event-row-${evt.id || idx}`}
                        onClick={() => setInspectedEvent(evt)}
                        className={`p-2.5 transition flex flex-col gap-1 cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-800/90 border-l-2 border-amber-400' 
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        {/* Event Row Header */}
                        <div className="flex items-center justify-between gap-2 flex-wrap text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              evt.severity === 'CRITICAL' ? 'bg-rose-500' :
                              evt.severity === 'WARNING' ? 'bg-amber-500' :
                              evt.severity === 'SUCCESS' ? 'bg-emerald-400' : 'bg-blue-400'
                            }`} />
                            <span className="text-slate-400">{evt.timestamp}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-amber-300 font-semibold">{evt.agentId}</span>
                          </div>

                          {/* Cross-Layer Badges */}
                          <div className="flex items-center gap-1 text-[10px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLayerJump(evt.sourceLayerNumber);
                              }}
                              className="px-1.5 py-0.2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:text-white"
                              title={`Jump to Layer ${evt.sourceLayerNumber}`}
                            >
                              L{evt.sourceLayerNumber}
                            </button>
                            <ArrowRight className="w-2.5 h-2.5 text-slate-500" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLayerJump(evt.targetLayerNumber);
                              }}
                              className="px-1.5 py-0.2 rounded bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 hover:text-white"
                              title={`Jump to Layer ${evt.targetLayerNumber}`}
                            >
                              L{evt.targetLayerNumber}
                            </button>
                          </div>
                        </div>

                        {/* Headline */}
                        <div className="text-xs font-semibold text-white font-sans leading-tight">
                          {evt.headline}
                        </div>

                        {/* Detail / Metric snippet */}
                        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                          <span className="truncate max-w-[85%]">{evt.detail}</span>
                          {evt.metricImpact && (
                            <span className="text-emerald-400 font-bold shrink-0">
                              {evt.metricImpact}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Selected Event Diagnostic & Audit Proof Inspector */}
            <div className="lg:col-span-5 xl:col-span-4 bg-slate-900/90 rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between h-[380px] overflow-y-auto">
              {inspectedEvent ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      <span>{inspectedEvent.id}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/60 font-bold">
                      VERIFIED PROOF
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white font-sans">
                      {inspectedEvent.headline}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed">
                      {inspectedEvent.detail}
                    </p>
                  </div>

                  {/* Cross-Layer Interactive Connection */}
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono space-y-1.5">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Layer Interaction Path
                    </div>
                    
                    <div className="flex items-center justify-between gap-1">
                      <button
                        onClick={() => handleLayerJump(inspectedEvent.sourceLayerNumber)}
                        className="text-left hover:text-amber-300 transition group"
                      >
                        <div className="text-[10px] text-slate-400">Source:</div>
                        <div className="font-bold text-white group-hover:underline flex items-center gap-1">
                          <span>{inspectedEvent.sourceLayerName}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </div>
                      </button>

                      <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />

                      <button
                        onClick={() => handleLayerJump(inspectedEvent.targetLayerNumber)}
                        className="text-right hover:text-indigo-300 transition group"
                      >
                        <div className="text-[10px] text-slate-400">Target:</div>
                        <div className="font-bold text-indigo-300 group-hover:underline flex items-center justify-end gap-1">
                          <span>{inspectedEvent.targetLayerName}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Metadata key-value grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-slate-800/50 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Autonomous Agent</div>
                      <div className="text-amber-300 font-bold truncate">{inspectedEvent.agentId}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-800/50 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Event Class</div>
                      <div className="text-white font-bold truncate">{inspectedEvent.eventType}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-800/50 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Settlement Latency</div>
                      <div className="text-emerald-400 font-bold">{inspectedEvent.latencyMs} ms</div>
                    </div>
                    <div className="p-2 rounded bg-slate-800/50 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Metric Impact</div>
                      <div className="text-white font-bold truncate">{inspectedEvent.metricImpact || 'Nominal'}</div>
                    </div>
                  </div>

                  {/* Cryptographic Hash Verification */}
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span>Cryptographic Audit Proof Hash:</span>
                      <span className="text-emerald-400">ZK-Verified</span>
                    </div>
                    <div className="text-slate-300 font-bold mt-0.5 truncate select-all">
                      {inspectedEvent.cryptographicHash}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 my-auto text-xs font-mono">
                  Select an event on the left to inspect its cryptographic proof.
                </div>
              )}

              {/* Bottom Quick Jump Action */}
              {inspectedEvent && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 text-[10px]">Jump to Source Layer:</span>
                  <button
                    onClick={() => handleLayerJump(inspectedEvent.sourceLayerNumber)}
                    className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Launch L{inspectedEvent.sourceLayerNumber}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
