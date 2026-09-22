import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MASTER_100_LAYERS, 
  getLayerByNumber, 
  getLayerById 
} from '../../data/master100LayersData';
import { AppLayer, MasterLayerSpec } from '../../types/econos';
import { 
  Activity, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Gauge, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Server, 
  Compass, 
  Flame, 
  Terminal, 
  Lock, 
  Workflow, 
  Share2, 
  Maximize2 
} from 'lucide-react';

interface SystemHealthPulseProps {
  currentLayer?: AppLayer;
  onSelectLayer: (layer: AppLayer) => void;
  onClose?: () => void;
}

interface HistoricalPoint {
  time: string;
  latencyMs: number;
  throughputOps: number;
  errorRatePct: number;
  p50: number;
  p95: number;
  p99: number;
}

interface TierHealthSummary {
  tierNumber: number;
  id: string;
  name: string;
  shortName: string;
  range: string;
  start: number;
  end: number;
  count: number;
  avgLatencyMs: number;
  throughputOps: number;
  errorRatePct: number;
  status: 'OPTIMAL' | 'DEGRADED' | 'ELEVATED';
  color: string;
  glowColor: string;
  angle: number; // for radial coordinate placement
}

interface LiveAuditEvent {
  id: string;
  timestamp: string;
  layerNumber: number;
  layerName: string;
  event: string;
  latencyMs: number;
  status: 'VERIFIED' | 'NOMINAL' | 'SYNCED';
}

const SYSTEM_TIER_CONFIG = [
  { tierNumber: 1, id: 'CORE_OS', name: 'Core Sovereign OS', shortName: 'Core OS', range: 'L1–5', start: 1, end: 5, color: '#10b981', glowColor: 'rgba(16,185,129,0.35)', angle: 0 },
  { tierNumber: 2, id: 'V2_STRATEGIC', name: 'Strategic Orchestration', shortName: 'Strategic', range: 'L6–10', start: 6, end: 10, color: '#6366f1', glowColor: 'rgba(99,102,241,0.35)', angle: 40 },
  { tierNumber: 3, id: 'SOVEREIGN_INFRA', name: 'Autonomous Sovereign Rails', shortName: 'Sovereign Rails', range: 'L11–19', start: 11, end: 19, color: '#f59e0b', glowColor: 'rgba(245,158,11,0.35)', angle: 80 },
  { tierNumber: 4, id: 'PLANETARY_SYSTEMS', name: 'Planetary Systems & Grid', shortName: 'Planetary Grid', range: 'L20–26', start: 20, end: 26, color: '#14b8a6', glowColor: 'rgba(20,184,166,0.35)', angle: 120 },
  { tierNumber: 5, id: 'CIVILIZATIONAL_FRONTIER', name: 'Civilizational Frontier', shortName: 'Frontier', range: 'L27–31', start: 27, end: 31, color: '#f43f5e', glowColor: 'rgba(244,63,94,0.35)', angle: 160 },
  { tierNumber: 6, id: 'OMNI_SINGULARITY', name: 'Omni-Access Singularity', shortName: 'Omni Nexus', range: 'L32–41', start: 32, end: 41, color: '#8b5cf6', glowColor: 'rgba(139,92,246,0.35)', angle: 200 },
  { tierNumber: 7, id: 'ENTERPRISE_SYNTHETICS', name: 'Enterprise Synthetics', shortName: 'Synthetics', range: 'L42–61', start: 42, end: 61, color: '#38bdf8', glowColor: 'rgba(56,189,248,0.35)', angle: 240 },
  { tierNumber: 8, id: 'INSTITUTIONAL_TAX', name: 'Institutional Tax, PE & Audit', shortName: 'Tax & Audit', range: 'L62–75', start: 62, end: 75, color: '#fbbf24', glowColor: 'rgba(251,191,36,0.35)', angle: 280 },
  { tierNumber: 9, id: 'CONTINUITY', name: 'Civilizational Continuity', shortName: 'Continuity', range: 'L76–100', start: 76, end: 100, color: '#ec4899', glowColor: 'rgba(236,72,153,0.35)', angle: 320 },
];

const INITIAL_AUDIT_LOGS: LiveAuditEvent[] = [
  { id: 'ev-1', timestamp: '04:12:08', layerNumber: 62, layerName: 'Continuous R&D Tax Credit §41', event: 'ASC 730 contemporaneous log verified', latencyMs: 0.82, status: 'VERIFIED' },
  { id: 'ev-2', timestamp: '04:12:06', layerNumber: 19, layerName: 'FedNow Instant Liquidity', event: 'Instantaneous reserve settlement cleared', latencyMs: 0.94, status: 'NOMINAL' },
  { id: 'ev-3', timestamp: '04:12:04', layerNumber: 42, layerName: 'Synthetic Balance Sheet', event: 'Off-chain collateralized debt ratio reconciled', latencyMs: 1.12, status: 'SYNCED' },
  { id: 'ev-4', timestamp: '04:12:02', layerNumber: 32, layerName: 'Post-Quantum Crystals-Kyber', event: 'NIST ML-KEM quantum handshake affirmed', latencyMs: 0.74, status: 'VERIFIED' },
  { id: 'ev-5', timestamp: '04:12:00', layerNumber: 1, layerName: 'Enterprise Business Core', event: 'Dual-entry general ledger consensus confirmed', latencyMs: 0.68, status: 'NOMINAL' },
];

export const SystemHealthPulse: React.FC<SystemHealthPulseProps> = ({
  currentLayer,
  onSelectLayer,
  onClose
}) => {
  const [isLive, setIsLive] = useState(true);
  const [lastDiagnosticPing, setLastDiagnosticPing] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [filterTier, setFilterTier] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'NUMBER' | 'LATENCY_DESC' | 'THROUGHPUT_DESC' | 'ERROR_DESC'>('NUMBER');
  const [selectedLayerNum, setSelectedLayerNum] = useState<number | null>(62);
  const [radarHoveredTier, setRadarHoveredTier] = useState<number | null>(null);
  const [radarRotation, setRadarRotation] = useState(0);

  // Global Billion-Dollar Telemetry State
  const [globalLatency, setGlobalLatency] = useState(0.84);
  const [globalThroughput, setGlobalThroughput] = useState(120450);
  const [globalErrorRate, setGlobalErrorRate] = useState(0.001);
  const [p50Latency, setP50Latency] = useState(0.84);
  const [p95Latency, setP95Latency] = useState(1.92);
  const [p99Latency, setP99Latency] = useState(2.86);
  const [jitterMs, setJitterMs] = useState(0.04);
  const [quantumSecurityScore, setQuantumSecurityScore] = useState(99.98);

  // 24-point historical telemetry buffer for SVG gradient area curves
  const [history, setHistory] = useState<HistoricalPoint[]>(() => {
    const initial: HistoricalPoint[] = [];
    const now = Date.now();
    for (let i = 24; i >= 0; i--) {
      const t = new Date(now - i * 2000);
      const baseLat = +(0.80 + Math.sin(i * 0.4) * 0.12 + Math.random() * 0.05).toFixed(2);
      initial.push({
        time: t.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
        latencyMs: baseLat,
        throughputOps: Math.floor(118000 + Math.cos(i * 0.5) * 4500 + Math.random() * 2000),
        errorRatePct: +(0.001 + (i % 8 === 0 ? 0.0008 : 0)).toFixed(4),
        p50: baseLat,
        p95: +(baseLat * 2.15).toFixed(2),
        p99: +(baseLat * 3.1).toFixed(2)
      });
    }
    return initial;
  });

  // Autonomous Micro-Event Audit Stream
  const [auditEvents, setAuditEvents] = useState<LiveAuditEvent[]>(INITIAL_AUDIT_LOGS);

  // Layer-by-layer dynamic latency/throughput state seed
  const [layerJitterSeed, setLayerJitterSeed] = useState(0);

  // Real-time radar sweep & telemetry ticker
  useEffect(() => {
    if (!isLive) return;

    // Smooth continuous radar sweep
    const sweepInterval = setInterval(() => {
      setRadarRotation(prev => (prev + 3) % 360);
    }, 50);

    // Telemetry tick every 2 seconds
    const telemetryInterval = setInterval(() => {
      setLayerJitterSeed(prev => (prev + 1) % 1000);

      const nextLatency = +(0.82 + Math.random() * 0.16 + (Math.sin(Date.now() / 7000) * 0.06)).toFixed(2);
      const nextThroughput = Math.floor(119000 + Math.random() * 5200 + (Math.cos(Date.now() / 8000) * 3100));
      const nextError = +(0.0008 + Math.random() * 0.0012).toFixed(4);
      const nextP50 = nextLatency;
      const nextP95 = +(nextLatency * 2.18 + Math.random() * 0.15).toFixed(2);
      const nextP99 = +(nextLatency * 3.22 + Math.random() * 0.22).toFixed(2);
      const nextJitter = +(0.03 + Math.random() * 0.05).toFixed(2);

      setGlobalLatency(nextLatency);
      setGlobalThroughput(nextThroughput);
      setGlobalErrorRate(nextError);
      setP50Latency(nextP50);
      setP95Latency(nextP95);
      setP99Latency(nextP99);
      setJitterMs(nextJitter);

      setHistory(prev => {
        const timeStr = new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });
        const updated = [...prev.slice(1), {
          time: timeStr,
          latencyMs: nextLatency,
          throughputOps: nextThroughput,
          errorRatePct: nextError,
          p50: nextP50,
          p95: nextP95,
          p99: nextP99
        }];
        return updated;
      });

      // Inject autonomous micro-audit log
      if (Math.random() > 0.3) {
        const sampleLayers = [1, 2, 4, 19, 32, 42, 62, 70, 88, 100];
        const randomLayerNum = sampleLayers[Math.floor(Math.random() * sampleLayers.length)];
        const spec = getLayerByNumber(randomLayerNum);
        if (spec) {
          const eventsList = [
            'Autonomous cryptographic consensus verified',
            'Cross-tier liquidity rebalance completed',
            'Sovereign circuit telemetry validated',
            'ZK-proof multi-tenant state anchored',
            'Contemporaneous ASC ledger sync complete'
          ];
          const newEv: LiveAuditEvent = {
            id: `ev-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            layerNumber: randomLayerNum,
            layerName: spec.name,
            event: eventsList[Math.floor(Math.random() * eventsList.length)],
            latencyMs: +(0.65 + Math.random() * 0.6).toFixed(2),
            status: Math.random() > 0.2 ? 'VERIFIED' : 'NOMINAL'
          };
          setAuditEvents(curr => [newEv, ...curr.slice(0, 14)]);
        }
      }
    }, 2000);

    return () => {
      clearInterval(sweepInterval);
      clearInterval(telemetryInterval);
    };
  }, [isLive]);

  // Synthetic Diagnostics Ping
  const handleDiagnosticsPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setLastDiagnosticPing(new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsPinging(false);
      setGlobalLatency(0.72);
      setP50Latency(0.72);
      setP95Latency(1.64);
      setP99Latency(2.41);
      // add instant audit event
      const pingEv: LiveAuditEvent = {
        id: `ping-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        layerNumber: 62,
        layerName: 'Continuous R&D Tax Credit §41',
        event: 'Cluster-wide diagnostics ping: 100/100 nodes replied < 1.1ms',
        latencyMs: 0.72,
        status: 'VERIFIED'
      };
      setAuditEvents(curr => [pingEv, ...curr.slice(0, 14)]);
    }, 700);
  };

  // Compute 9 Tier Summaries
  const tierSummaries: TierHealthSummary[] = useMemo(() => {
    return SYSTEM_TIER_CONFIG.map(cfg => {
      const count = cfg.end - cfg.start + 1;
      const tierSeed = (cfg.tierNumber * 37 + layerJitterSeed) % 100;
      const avgLatencyMs = +(0.68 + (cfg.tierNumber * 0.05) + (tierSeed / 500)).toFixed(2);
      const throughputOps = Math.floor((globalThroughput / 9) * (1 + (Math.sin(cfg.tierNumber + layerJitterSeed * 0.1) * 0.2)));
      const errorRatePct = +(0.0006 + (cfg.tierNumber === 8 ? 0.0002 : 0) + (tierSeed < 4 ? 0.0005 : 0)).toFixed(4);

      return {
        ...cfg,
        count,
        avgLatencyMs,
        throughputOps,
        errorRatePct,
        status: 'OPTIMAL'
      };
    });
  }, [globalThroughput, layerJitterSeed]);

  // Compute 100 Individual Layers Health Items
  const layerHealthItems = useMemo(() => {
    return MASTER_100_LAYERS.map(l => {
      const num = l.layerNumber;
      const tierObj = SYSTEM_TIER_CONFIG.find(t => num >= t.start && num <= t.end) || SYSTEM_TIER_CONFIG[0];
      
      const layerHash = ((num * 47) + layerJitterSeed) % 100;
      const latencyMs = +(0.62 + (num * 0.008) + (layerHash * 0.006)).toFixed(2);
      const throughputOps = Math.floor(750 + ((num * 43) % 850) + (layerHash * 5));
      const errorRatePct = +(0.000 + (num % 37 === 0 ? 0.001 : 0)).toFixed(3);
      const circuitStatus = 'HEALTHY_CLOSED';

      return {
        ...l,
        tierNumber: tierObj.tierNumber,
        tierName: tierObj.name,
        latencyMs,
        throughputOps,
        errorRatePct,
        circuitStatus
      };
    });
  }, [layerJitterSeed]);

  // Filtered & Sorted Layers
  const displayedLayers = useMemo(() => {
    return layerHealthItems
      .filter(l => {
        if (filterTier !== 'ALL' && l.tierNumber !== filterTier) return false;
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchNum = l.layerNumber.toString().includes(q);
          const matchName = l.name.toLowerCase().includes(q);
          const matchBenefit = l.businessBenefit.toLowerCase().includes(q);
          if (!matchNum && !matchName && !matchBenefit) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'LATENCY_DESC') return b.latencyMs - a.latencyMs;
        if (sortBy === 'THROUGHPUT_DESC') return b.throughputOps - a.throughputOps;
        if (sortBy === 'ERROR_DESC') return b.errorRatePct - a.errorRatePct;
        return a.layerNumber - b.layerNumber;
      });
  }, [layerHealthItems, filterTier, searchQuery, sortBy]);

  // Selected Layer details
  const activeSelectedLayer = useMemo(() => {
    if (!selectedLayerNum) return null;
    return layerHealthItems.find(l => l.layerNumber === selectedLayerNum) || null;
  }, [layerHealthItems, selectedLayerNum]);

  // SVG Multi-Percentile Area Chart Generator (p50, p95, p99)
  const renderMultiAreaChart = (width = 380, height = 110) => {
    if (history.length < 2) return null;
    const maxVal = Math.max(...history.map(h => h.p99)) * 1.15;
    const minVal = 0;
    const range = maxVal - minVal || 1;

    const getCoords = (key: 'p50' | 'p95' | 'p99') => {
      return history.map((h, i) => {
        const x = (i / (history.length - 1)) * (width - 16) + 8;
        const y = height - 12 - ((h[key] - minVal) / range) * (height - 24);
        return { x, y };
      });
    };

    const p99Points = getCoords('p99');
    const p95Points = getCoords('p95');
    const p50Points = getCoords('p50');

    const toAreaPath = (points: { x: number; y: number }[]) => {
      const lineStr = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
      const lastX = points[points.length - 1].x;
      const firstX = points[0].x;
      const bottomY = height - 8;
      return `${lineStr} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
    };

    const toLinePath = (points: { x: number; y: number }[]) => {
      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    };

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 overflow-visible">
        <defs>
          <linearGradient id="p99Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="p50Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid guide lines */}
        <line x1="8" y1={height * 0.25} x2={width - 8} y2={height * 0.25} stroke="#1e293b" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="8" y1={height * 0.5} x2={width - 8} y2={height * 0.5} stroke="#1e293b" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="8" y1={height * 0.75} x2={width - 8} y2={height * 0.75} stroke="#1e293b" strokeDasharray="3 3" strokeWidth="1" />

        {/* p99 Area & Line */}
        <path d={toAreaPath(p99Points)} fill="url(#p99Grad)" />
        <path d={toLinePath(p99Points)} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.85" />

        {/* p95 Line */}
        <path d={toLinePath(p95Points)} fill="none" stroke="#38bdf8" strokeWidth="1.25" strokeDasharray="4 2" strokeOpacity="0.8" />

        {/* p50 Area & Line */}
        <path d={toAreaPath(p50Points)} fill="url(#p50Grad)" />
        <path d={toLinePath(p50Points)} fill="none" stroke="#06b6d4" strokeWidth="2" />

        {/* Current Endpoint Markers */}
        <circle cx={p50Points[p50Points.length - 1].x} cy={p50Points[p50Points.length - 1].y} r="3" fill="#06b6d4" className="animate-pulse" />
        <circle cx={p99Points[p99Points.length - 1].x} cy={p99Points[p99Points.length - 1].y} r="3" fill="#f59e0b" />
      </svg>
    );
  };

  // SVG Circular Radar Topology (Left Stage)
  const renderRadarTopology = (size = 280) => {
    const center = size / 2;
    const outerRadius = (size / 2) - 24;
    const midRadius = outerRadius * 0.68;
    const innerRadius = outerRadius * 0.36;

    // Sweep line coordinates
    const sweepRad = (radarRotation * Math.PI) / 180;
    const sweepX = center + Math.cos(sweepRad) * (outerRadius + 8);
    const sweepY = center + Math.sin(sweepRad) * (outerRadius + 8);

    return (
      <div className="relative flex flex-col items-center justify-center p-3">
        <svg width={size} height={size} className="overflow-visible select-none">
          <defs>
            <radialGradient id="radarCenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Radar background glow */}
          <circle cx={center} cy={center} r={outerRadius + 10} fill="url(#radarCenterGlow)" />

          {/* Concentric tier range rings */}
          <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={center} cy={center} r={midRadius} fill="none" stroke="#1e293b" strokeWidth="1.25" />
          <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="#334155" strokeWidth="1.5" />

          {/* Crosshair axis markers */}
          <line x1={center - outerRadius - 8} y1={center} x2={center + outerRadius + 8} y2={center} stroke="#1e293b" strokeWidth="1" />
          <line x1={center} y1={center - outerRadius - 8} x2={center} y2={center + outerRadius + 8} stroke="#1e293b" strokeWidth="1" />

          {/* Sweeping Radar Scanner Line */}
          <line 
            x1={center} 
            y1={center} 
            x2={sweepX} 
            y2={sweepY} 
            stroke="#38bdf8" 
            strokeWidth="1.75" 
            strokeOpacity="0.75" 
          />

          {/* Center Singularity Node (ECONOS Core) */}
          <circle cx={center} cy={center} r="9" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
          <circle cx={center} cy={center} r="4" fill="#10b981" className="animate-pulse" />

          {/* 9 Tier Orbit Nodes placed along concentric circles */}
          {tierSummaries.map((t, idx) => {
            const rad = (t.angle * Math.PI) / 180;
            // Distribute across 3 orbital rings
            const orbitalDist = idx < 3 ? innerRadius : idx < 6 ? midRadius : outerRadius;
            const x = center + Math.cos(rad) * orbitalDist;
            const y = center + Math.sin(rad) * orbitalDist;
            const isHovered = radarHoveredTier === t.tierNumber;
            const isFiltered = filterTier === t.tierNumber;

            return (
              <g 
                key={t.id} 
                className="cursor-pointer transition-transform duration-200"
                onMouseEnter={() => setRadarHoveredTier(t.tierNumber)}
                onMouseLeave={() => setRadarHoveredTier(null)}
                onClick={() => setFilterTier(filterTier === t.tierNumber ? 'ALL' : t.tierNumber)}
              >
                {/* Radial connection line to center */}
                <line 
                  x1={center} 
                  y1={center} 
                  x2={x} 
                  y2={y} 
                  stroke={t.color} 
                  strokeWidth={isHovered || isFiltered ? "1.5" : "0.75"} 
                  strokeOpacity={isHovered || isFiltered ? "0.8" : "0.25"} 
                />

                {/* Node halo */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isHovered ? 12 : isFiltered ? 10 : 7} 
                  fill={t.glowColor} 
                  className={isHovered ? "animate-ping" : ""} 
                />

                {/* Node core */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isHovered ? 6 : isFiltered ? 5 : 4} 
                  fill={t.color} 
                  stroke="#090e1a" 
                  strokeWidth="1.5" 
                />

                {/* Node Tier Label */}
                <text 
                  x={x + (x > center ? 7 : -7)} 
                  y={y + (y > center ? 8 : -4)} 
                  textAnchor={x > center ? "start" : "end"} 
                  fill={isHovered || isFiltered ? "#fbbf24" : "#94a3b8"} 
                  fontSize="9" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                >
                  T{t.tierNumber} ({t.range})
                </text>
              </g>
            );
          })}
        </svg>

        {/* Radar Footnote Status */}
        <div className="mt-2 text-center text-[10px] font-mono text-slate-400">
          <span className="text-emerald-400 font-bold">100-LAYER SINGULARITY TOPOLOGY</span>
          <span className="text-slate-600 block">Click any Tier orbit node (T1–T9) to isolate telemetry</span>
        </div>
      </div>
    );
  };

  return (
    <div 
      id="billion-dollar-system-health-command-center" 
      className="bg-[#060a12] text-slate-100 rounded-2xl border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-4 sm:p-5 space-y-5 transition-all duration-300 relative overflow-hidden"
    >
      {/* Ambient background micro-glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Top Billion-Dollar Institutional Command Header */}
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/90 pb-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-transparent border border-emerald-500/40 text-emerald-400 relative shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '40s' }} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
                <span>SOVEREIGN CLUSTER HEALTH COMMAND</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold tracking-wider">
                  TIER-1 PRODUCTION
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100/100 Nodes Faultless</span>
              </span>
              <span className="text-slate-700">•</span>
              <span>SLA Target: <strong className="text-emerald-400 font-bold">99.999%</strong></span>
              <span className="text-slate-700">•</span>
              <span>NIST ML-KEM Quantum Verification: <strong className="text-amber-300">{quantumSecurityScore}%</strong></span>
            </div>
          </div>
        </div>

        {/* Global Controls & Diagnostics */}
        <div className="flex items-center gap-2 self-start lg:self-auto font-mono text-xs flex-wrap">
          {/* Pause / Resume Ticker */}
          <button
            id="health-pulse-toggle-live-btn"
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isLive
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                : 'bg-amber-950/70 hover:bg-amber-900 text-amber-300 border-amber-500/40'
            }`}
            title={isLive ? 'Pause real-time telemetry stream' : 'Resume real-time telemetry stream'}
          >
            {isLive ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isLive ? 'Live Stream 50Hz' : 'Stream Paused'}</span>
          </button>

          {/* Trigger Instant Diagnostics Ping */}
          <button
            id="health-pulse-diagnostic-ping-btn"
            onClick={handleDiagnosticsPing}
            disabled={isPinging}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(245,158,11,0.25)] disabled:opacity-50 cursor-pointer"
            title="Fire atomic cluster ping across all 100 system layers"
          >
            <Zap className={`w-3.5 h-3.5 ${isPinging ? 'animate-bounce' : ''}`} />
            <span>{isPinging ? 'Pinging 100 Nodes...' : 'Diagnostics Ping'}</span>
          </button>

          {/* Jump to Concept C Sovereign Dashboard */}
          <button
            id="health-pulse-open-concept-c-btn"
            onClick={() => onSelectLayer('SOVEREIGN_COMMAND')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Switch to Concept C (4-Quadrant Institutional Command Dashboard)"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Concept C 4-Quadrant OS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer ml-1"
              title="Close Health Command Center"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main 3-Column Command Stage (Concept 2: Radar Left, High-Density Telemetry Center, Micro-Audit Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: 100-Layer Circular Radar Topology */}
        <div className="lg:col-span-4 bg-[#090f1c] rounded-2xl border border-slate-800/90 p-4 flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-xs font-mono border-b border-slate-800/70 pb-2">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>RADAR TOPOLOGY (9 TIERS)</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
              ACTIVE VECTORS
            </span>
          </div>

          {/* SVG Radar Graphic */}
          <div className="py-2 flex items-center justify-center w-full">
            {renderRadarTopology(260)}
          </div>

          {/* Selected Tier / Filter state indicator */}
          <div className="w-full pt-2 border-t border-slate-800/70 text-xs font-mono flex items-center justify-between">
            <span className="text-slate-400">Filter Tier:</span>
            <span className="font-bold text-amber-300">
              {filterTier === 'ALL' ? 'All 100 System Layers' : `Tier ${filterTier} Isolated`}
            </span>
            {filterTier !== 'ALL' && (
              <button 
                onClick={() => setFilterTier('ALL')}
                className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Center Column: High-Density Telemetry & Multi-Area Performance Curves */}
        <div className="lg:col-span-5 bg-[#090f1c] rounded-2xl border border-slate-800/90 p-4 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/70 pb-2">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>SUB-MILLISECOND TELEMETRY DYNAMICS</span>
            </span>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> p50
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> p95
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> p99
              </span>
            </div>
          </div>

          {/* Key KPI Triad */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">p50 Latency</div>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">{p50Latency} <span className="text-[10px]">ms</span></div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">±{jitterMs}ms jitter</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Throughput</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{(globalThroughput / 1000).toFixed(1)}k <span className="text-[10px]">ops/s</span></div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">840 MB/s ingress</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Fault Rate</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{globalErrorRate}%</div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">Circuits Closed</div>
            </div>
          </div>

          {/* Multi-Area SVG Sparkline Curve */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Real-Time Latency Percentiles (24 Samples)</span>
              <span className="text-amber-400 font-bold">p99: {p99Latency}ms</span>
            </div>
            {renderMultiAreaChart(360, 100)}
          </div>

          {/* Subsystem SLA & Settlement Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">24h Settled Volume:</span>
              <span className="text-white font-bold">$14.28B</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">Audit Consensus:</span>
              <span className="text-emerald-400 font-bold">100% Merkle Zero-Lag</span>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Micro-Audit Event Stream */}
        <div className="lg:col-span-3 bg-[#090f1c] rounded-2xl border border-slate-800/90 p-4 flex flex-col justify-between">
          <div className="w-full flex items-center justify-between text-xs font-mono border-b border-slate-800/70 pb-2 mb-2">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE AUTONOMOUS AUDIT</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Audit events feed */}
          <div className="flex-1 overflow-y-auto max-h-[300px] space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            {auditEvents.map(ev => (
              <div 
                key={ev.id}
                onClick={() => setSelectedLayerNum(ev.layerNumber)}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-xs font-mono transition cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-400 group-hover:text-amber-300">
                    L{ev.layerNumber} • {ev.timestamp}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                    {ev.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 truncate mt-0.5 font-medium">
                  {ev.layerName}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {ev.event}
                </div>
                <div className="text-[9px] text-sky-400 font-semibold mt-1 flex items-center justify-between">
                  <span>Latency: {ev.latencyMs}ms</span>
                  <span className="text-slate-500 group-hover:text-amber-300">Inspect →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/70 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Continuous cryptographic log</span>
            <span className="text-emerald-400">Zero-Loss Tail</span>
          </div>
        </div>
      </div>

      {/* 9 Architectural Tiers Summary Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-white">9 Architectural Tiers Distribution</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 text-[11px]">Click to filter matrix below</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {lastDiagnosticPing ? `Last ping: ${lastDiagnosticPing}` : 'Continuous cluster sync active'}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {tierSummaries.map(t => {
            const isFiltered = filterTier === t.tierNumber;

            return (
              <button
                key={t.id}
                onClick={() => setFilterTier(filterTier === t.tierNumber ? 'ALL' : t.tierNumber)}
                className={`p-2 rounded-xl border text-left transition relative cursor-pointer font-mono ${
                  isFiltered
                    ? 'bg-slate-800 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)] ring-1 ring-amber-400'
                    : 'bg-[#090f1c] hover:bg-slate-800/80 border-slate-800'
                }`}
                title={`Filter 100-layer inspector by Tier ${t.tierNumber}: ${t.name}`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-bold text-white">T{t.tierNumber}</span>
                  <span className="text-slate-500">{t.range}</span>
                </div>
                <div className="text-[11px] font-bold text-slate-200 truncate mt-0.5">
                  {t.shortName}
                </div>
                <div className="mt-1 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-sky-400 font-bold">{t.avgLatencyMs}ms</span>
                  <span className="text-emerald-400">{(t.throughputOps / 1000).toFixed(1)}k</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 100 System Layers Precision Telemetry Matrix & Inspector */}
      <div className="pt-2 border-t border-slate-800/80 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 font-mono text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>100-Layer Nodes Inspector:</span>
            </span>

            <button
              onClick={() => setFilterTier('ALL')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                filterTier === 'ALL'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              All (100)
            </button>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(tNum => (
              <button
                key={tNum}
                onClick={() => setFilterTier(filterTier === tNum ? 'ALL' : tNum)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  filterTier === tNum
                    ? 'bg-sky-400 text-slate-950 font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                T{tNum}
              </button>
            ))}
          </div>

          {/* Search Box & Sort */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter layer name, #, benefit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort 100 system layers"
              className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-amber-400 font-mono cursor-pointer"
            >
              <option value="NUMBER">Order: L1–L100</option>
              <option value="LATENCY_DESC">Sort: Latency (High)</option>
              <option value="THROUGHPUT_DESC">Sort: Throughput</option>
              <option value="ERROR_DESC">Sort: Errors</option>
            </select>
          </div>
        </div>

        {/* High-Precision Table */}
        <div className="bg-[#050912] rounded-2xl border border-slate-800/90 overflow-hidden shadow-inner">
          <div className="grid grid-cols-12 px-3 py-2.5 bg-slate-900/90 border-b border-slate-800 text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
            <div className="col-span-1">Node</div>
            <div className="col-span-4 sm:col-span-5">Subsystem Name &amp; Spec</div>
            <div className="col-span-2 text-right">Latency</div>
            <div className="col-span-2 text-right">Throughput</div>
            <div className="col-span-1 text-center">Circuit</div>
            <div className="col-span-2 sm:col-span-1 text-right">Action</div>
          </div>

          <div className="max-h-64 overflow-y-auto divide-y divide-slate-850/60 font-mono text-xs scrollbar-thin scrollbar-thumb-slate-700">
            {displayedLayers.map(layer => {
              const isSelected = selectedLayerNum === layer.layerNumber;
              const isLayer62 = layer.layerNumber === 62;

              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayerNum(isSelected ? null : layer.layerNumber)}
                  className={`grid grid-cols-12 px-3 py-2 items-center hover:bg-slate-800/70 transition cursor-pointer ${
                    isSelected ? 'bg-slate-800/90 ring-1 ring-amber-400/50' : ''
                  } ${isLayer62 ? 'bg-amber-950/20' : ''}`}
                >
                  <div className="col-span-1 font-bold text-amber-400 text-[11px] flex items-center gap-1">
                    <span>L{layer.layerNumber}</span>
                  </div>

                  <div className="col-span-4 sm:col-span-5 pr-2 truncate">
                    <div className="text-white font-medium text-[11px] truncate flex items-center gap-1.5">
                      <span>{layer.name}</span>
                      {isLayer62 && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          §41 ASC CAPTURE
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {layer.businessBenefit}
                    </div>
                  </div>

                  <div className="col-span-2 text-right text-sky-400 font-semibold text-[11px]">
                    {layer.latencyMs} ms
                  </div>

                  <div className="col-span-2 text-right text-emerald-400 font-semibold text-[11px]">
                    {layer.throughputOps} ops/s
                  </div>

                  <div className="col-span-1 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" title="Circuit Closed (Healthy)" />
                  </div>

                  <div className="col-span-2 sm:col-span-1 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLayer(layer.id as AppLayer);
                      }}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 border border-slate-700 text-[10px] font-bold transition cursor-pointer"
                      title={`Navigate directly to Layer ${layer.layerNumber}`}
                    >
                      Open →
                    </button>
                  </div>
                </div>
              );
            })}

            {displayedLayers.length === 0 && (
              <div className="p-6 text-center text-slate-500 text-xs font-mono">
                No system layers matched your search or tier filter.
              </div>
            )}
          </div>
        </div>

        {/* Selected Layer Expanded Diagnostic Card */}
        {activeSelectedLayer && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0c1322] border border-amber-400/40 text-xs font-mono space-y-3 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
                  Layer {activeSelectedLayer.layerNumber}
                </span>
                <span className="font-bold text-white text-sm sm:text-base">{activeSelectedLayer.name}</span>
                <span className="text-slate-400 text-xs hidden sm:inline">({activeSelectedLayer.tierName})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectLayer(activeSelectedLayer.id as AppLayer)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Enter Layer {activeSelectedLayer.layerNumber} Workspace</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedLayerNum(null)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Real-Time Latency</span>
                <span className="text-sky-400 font-bold text-sm">{activeSelectedLayer.latencyMs} ms</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Active Throughput</span>
                <span className="text-emerald-400 font-bold text-sm">{activeSelectedLayer.throughputOps} ops/s</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Circuit Status</span>
                <span className="text-emerald-400 font-bold text-sm">HEALTHY (CLOSED)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Monetization Spec</span>
                <span className="text-amber-300 font-bold text-sm">{activeSelectedLayer.suggestedFee}</span>
              </div>
            </div>

            <div className="text-slate-300 text-xs font-sans leading-relaxed pt-1">
              <strong className="font-mono text-slate-400">Business Objective &amp; Yield: </strong> 
              {activeSelectedLayer.businessBenefit}
            </div>

            {activeSelectedLayer.keyOutputs && activeSelectedLayer.keyOutputs.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold mr-1">Outputs:</span>
                {activeSelectedLayer.keyOutputs.map((out, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">
                    {out}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
