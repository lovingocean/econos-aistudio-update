import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { EconomicGraphNode, EconomicGraphEdge } from '../../types/econos';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Compass, 
  Layers, 
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
  Sliders,
  Move,
  Eye,
  Info
} from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface SimNode extends EconomicGraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  iconBg: string;
  isDragging?: boolean;
}

interface Particle {
  edgeId: string;
  progress: number; // 0 to 1
  speed: number;
  sourceId: string;
  targetId: string;
  color: string;
  size: number;
}

interface LiveForceDirectedGraphProps {
  nodes: EconomicGraphNode[];
  edges: EconomicGraphEdge[];
  selectedNode: EconomicGraphNode | null;
  onSelectNode: (node: EconomicGraphNode) => void;
  height?: number;
}

export type LayoutMode = 'FORCE' | 'CONCENTRIC' | 'FLOW_DAG';

export const LiveForceDirectedGraph: React.FC<LiveForceDirectedGraphProps> = ({
  nodes,
  edges,
  selectedNode,
  onSelectNode,
  height = 560
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Simulation parameters
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('FORCE');
  const [isSimulating, setIsSimulating] = useState(true);
  const [particlesActive, setParticlesActive] = useState(true);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  // Pan & Zoom
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef<Point>({ x: 0, y: 0 });
  const draggingNodeRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  // Node styles by archetype
  const getNodeVisuals = useCallback((type: EconomicGraphNode['type']) => {
    switch (type) {
      case 'PERSON':
        return {
          radius: 28,
          color: '#8b5cf6', // Violet
          glowColor: 'rgba(139, 92, 246, 0.45)',
          iconBg: '#7c3aed',
          border: '#6d28d9',
          badge: 'PRINCIPAL'
        };
      case 'ORGANIZATION':
        return {
          radius: 34,
          color: '#2563eb', // Blue
          glowColor: 'rgba(37, 99, 235, 0.45)',
          iconBg: '#1d4ed8',
          border: '#1e40af',
          badge: 'HOLDINGS'
        };
      case 'BUSINESS':
        return {
          radius: 30,
          color: '#0d9488', // Teal
          glowColor: 'rgba(13, 148, 136, 0.45)',
          iconBg: '#0f766e',
          border: '#115e59',
          badge: 'OPERATING'
        };
      case 'REVENUE':
        return {
          radius: 26,
          color: '#059669', // Emerald
          glowColor: 'rgba(5, 150, 105, 0.45)',
          iconBg: '#047857',
          border: '#065f46',
          badge: 'ARR/INFLOW'
        };
      case 'ASSET':
        return {
          radius: 25,
          color: '#10b981', // Emerald
          glowColor: 'rgba(16, 185, 129, 0.45)',
          iconBg: '#059669',
          border: '#047857',
          badge: 'CAPITAL'
        };
      case 'LIABILITY':
        return {
          radius: 24,
          color: '#e11d48', // Rose
          glowColor: 'rgba(225, 29, 72, 0.45)',
          iconBg: '#be123c',
          border: '#9f1239',
          badge: 'OBLIGATION'
        };
      case 'OPPORTUNITY':
        return {
          radius: 27,
          color: '#d97706', // Amber
          glowColor: 'rgba(217, 119, 6, 0.45)',
          iconBg: '#b45309',
          border: '#92400e',
          badge: 'OPPORTUNITY'
        };
      case 'AGENT':
        return {
          radius: 29,
          color: '#6366f1', // Indigo
          glowColor: 'rgba(99, 102, 241, 0.5)',
          iconBg: '#4f46e5',
          border: '#4338ca',
          badge: 'SOVEREIGN AGENT'
        };
      case 'OUTCOME':
        return {
          radius: 26,
          color: '#14b8a6', // Teal
          glowColor: 'rgba(20, 184, 166, 0.45)',
          iconBg: '#0d9488',
          border: '#0f766e',
          badge: 'VERIFIED YIELD'
        };
      default:
        return {
          radius: 22,
          color: '#64748b',
          glowColor: 'rgba(100, 116, 139, 0.4)',
          iconBg: '#475569',
          border: '#334155',
          badge: 'NODE'
        };
    }
  }, []);

  // Internal simulated nodes & particles state
  const [simNodes, setSimNodes] = useState<SimNode[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Initialize node positions based on dimensions
  useEffect(() => {
    if (!nodes || nodes.length === 0) return;

    const width = containerRef.current?.clientWidth || 800;
    const cx = width / 2;
    const cy = height / 2;

    setSimNodes(prev => {
      const prevMap = new Map<string, SimNode>(prev.map(n => [n.id, n]));

      return nodes.map((node, index) => {
        const visuals = getNodeVisuals(node.type);
        const existing = prevMap.get(node.id);

        if (existing) {
          return {
            ...node,
            x: existing.x,
            y: existing.y,
            vx: existing.vx,
            vy: existing.vy,
            radius: visuals.radius,
            color: visuals.color,
            glowColor: visuals.glowColor,
            iconBg: visuals.iconBg
          };
        }

        // Layout seeds based on node type
        let initX = cx;
        let initY = cy;
        const angle = (index / nodes.length) * 2 * Math.PI;
        const radiusDist = 140 + (index % 3) * 60;

        if (node.type === 'PERSON') {
          initX = cx - 220;
          initY = cy - 80;
        } else if (node.type === 'ORGANIZATION') {
          initX = cx - 120;
          initY = cy;
        } else if (node.type === 'BUSINESS') {
          initX = cx;
          initY = cy;
        } else if (node.type === 'REVENUE' || node.type === 'ASSET') {
          initX = cx + 140 + Math.cos(angle) * 80;
          initY = cy - 110 + Math.sin(angle) * 50;
        } else if (node.type === 'AGENT') {
          initX = cx - 60 + Math.cos(angle) * 120;
          initY = cy + 130;
        } else if (node.type === 'OPPORTUNITY') {
          initX = cx + 160 + Math.cos(angle) * 90;
          initY = cy + 60;
        } else if (node.type === 'OUTCOME') {
          initX = cx + 260 + Math.cos(angle) * 60;
          initY = cy + 120;
        } else {
          initX = cx + Math.cos(angle) * radiusDist;
          initY = cy + Math.sin(angle) * radiusDist;
        }

        return {
          ...node,
          x: initX + (Math.random() - 0.5) * 20,
          y: initY + (Math.random() - 0.5) * 20,
          vx: 0,
          vy: 0,
          radius: visuals.radius,
          color: visuals.color,
          glowColor: visuals.glowColor,
          iconBg: visuals.iconBg
        };
      });
    });

    // Initialize particles on edges
    const newParticles: Particle[] = [];
    edges.forEach((edge, idx) => {
      const edgeParticlesCount = 2;
      for (let i = 0; i < edgeParticlesCount; i++) {
        newParticles.push({
          edgeId: edge.id,
          progress: i / edgeParticlesCount,
          speed: 0.006 + (idx % 3) * 0.002,
          sourceId: edge.source,
          targetId: edge.target,
          color: edge.verified ? '#10b981' : '#38bdf8',
          size: 3 + (i % 2)
        });
      }
    });
    setParticles(newParticles);
  }, [nodes, edges, height, getNodeVisuals]);

  // Concentric / Flow DAG positioning triggers
  useEffect(() => {
    if (!simNodes.length) return;
    const width = containerRef.current?.clientWidth || 800;
    const cx = width / 2;
    const cy = height / 2;

    if (layoutMode === 'CONCENTRIC') {
      setSimNodes(prev => prev.map(node => {
        let ringRadius = 0;
        if (node.type === 'PERSON') ringRadius = 50;
        else if (node.type === 'ORGANIZATION') ringRadius = 110;
        else if (node.type === 'BUSINESS') ringRadius = 170;
        else if (node.type === 'REVENUE' || node.type === 'ASSET' || node.type === 'LIABILITY') ringRadius = 240;
        else if (node.type === 'AGENT') ringRadius = 290;
        else if (node.type === 'OPPORTUNITY') ringRadius = 340;
        else ringRadius = 380; // OUTCOME

        const sameTypeNodes = prev.filter(n => n.type === node.type);
        const typeIndex = sameTypeNodes.findIndex(n => n.id === node.id);
        const total = sameTypeNodes.length;
        const angle = (typeIndex / Math.max(1, total)) * 2 * Math.PI - Math.PI / 2;

        return {
          ...node,
          x: cx + Math.cos(angle) * ringRadius,
          y: cy + Math.sin(angle) * ringRadius,
          vx: 0,
          vy: 0
        };
      }));
    } else if (layoutMode === 'FLOW_DAG') {
      // Linear value DAG Left to Right
      const typeCols: Record<string, number> = {
        PERSON: 80,
        ORGANIZATION: 200,
        BUSINESS: 340,
        AGENT: 480,
        REVENUE: 500,
        ASSET: 520,
        LIABILITY: 540,
        OPPORTUNITY: 660,
        OUTCOME: 780
      };

      setSimNodes(prev => prev.map(node => {
        const colX = typeCols[node.type] || 400;
        const sameTypeNodes = prev.filter(n => n.type === node.type);
        const typeIndex = sameTypeNodes.findIndex(n => n.id === node.id);
        const total = sameTypeNodes.length;
        const rowHeight = height - 120;
        const stepY = rowHeight / (total + 1);
        const nodeY = 60 + (typeIndex + 1) * stepY;

        return {
          ...node,
          x: colX,
          y: nodeY,
          vx: 0,
          vy: 0
        };
      }));
    }
  }, [layoutMode, height]);

  // Main Physics Simulation Loop & Particle Tracker
  useEffect(() => {
    let animFrame: number;

    const tick = () => {
      // 1. Advance particles
      if (particlesActive) {
        setParticles(prev => prev.map(p => {
          let nextProgress = p.progress + p.speed * particleSpeed;
          if (nextProgress > 1) nextProgress = 0;
          return { ...p, progress: nextProgress };
        }));
      }

      // 2. Force simulation (if active and mode is FORCE)
      if (isSimulating && layoutMode === 'FORCE') {
        setSimNodes(prev => {
          const width = containerRef.current?.clientWidth || 800;
          const cx = width / 2;
          const cy = height / 2;
          const nodeMap = new Map(prev.map(n => [n.id, n]));

          // Physics constants
          const repulsion = 4500;
          const springLength = 120;
          const springK = 0.035;
          const gravity = 0.015;
          const damping = 0.88;

          const updated = prev.map(node => {
            if (node.isDragging) return node;

            let fx = 0;
            let fy = 0;

            // Repulsion from other nodes
            prev.forEach(other => {
              if (node.id === other.id) return;
              const dx = node.x - other.x;
              const dy = node.y - other.y;
              const distSq = dx * dx + dy * dy + 100; // prevent divide by zero
              const dist = Math.sqrt(distSq);
              const force = repulsion / distSq;
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            });

            // Center gravity
            fx += (cx - node.x) * gravity;
            fy += (cy - node.y) * gravity;

            return {
              ...node,
              vx: (node.vx + fx) * damping,
              vy: (node.vy + fy) * damping
            };
          });

          // Attraction along edges
          edges.forEach(edge => {
            const src = updated.find(n => n.id === edge.source);
            const tgt = updated.find(n => n.id === edge.target);
            if (!src || !tgt) return;

            const dx = tgt.x - src.x;
            const dy = tgt.y - src.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const displacement = dist - springLength;
            const force = displacement * springK;

            const forceX = (dx / dist) * force;
            const forceY = (dy / dist) * force;

            if (!src.isDragging) {
              src.vx += forceX;
              src.vy += forceY;
            }
            if (!tgt.isDragging) {
              tgt.vx -= forceX;
              tgt.vy -= forceY;
            }
          });

          // Apply velocity and boundary bounds
          return updated.map(node => {
            if (node.isDragging) return node;
            const nextX = Math.max(40, Math.min(width - 40, node.x + node.vx));
            const nextY = Math.max(40, Math.min(height - 40, node.y + node.vy));

            return {
              ...node,
              x: nextX,
              y: nextY
            };
          });
        });
      }

      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isSimulating, layoutMode, particlesActive, particleSpeed, edges, height]);

  // Lookup map for fast position resolution
  const nodePositionMap = useMemo(() => {
    const map = new Map<string, SimNode>();
    simNodes.forEach(n => map.set(n.id, n));
    return map;
  }, [simNodes]);

  // Connected nodes map for hover highlighting
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId && !selectedNode) return new Set<string>();
    const targetId = hoveredNodeId || selectedNode?.id;
    if (!targetId) return new Set<string>();

    const set = new Set<string>();
    set.add(targetId);
    edges.forEach(e => {
      if (e.source === targetId) set.add(e.target);
      if (e.target === targetId) set.add(e.source);
    });
    return set;
  }, [hoveredNodeId, selectedNode, edges]);

  // Connected edges map for hover highlighting
  const connectedEdgeIds = useMemo(() => {
    if (!hoveredNodeId && !selectedNode) return new Set<string>();
    const targetId = hoveredNodeId || selectedNode?.id;
    if (!targetId) return new Set<string>();

    const set = new Set<string>();
    edges.forEach(e => {
      if (e.source === targetId || e.target === targetId) set.add(e.id);
    });
    return set;
  }, [hoveredNodeId, selectedNode, edges]);

  // Mouse / Pointer handlers for Pan & Node Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Left button only
    // If clicking on canvas background, initiate Pan
    setIsPanning(true);
    startPanRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingNodeRef.current) {
      // Dragging a specific node
      const { id, offsetX, offsetY } = draggingNodeRef.current;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseSvgX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseSvgY = (e.clientY - rect.top - pan.y) / zoom;

      setSimNodes(prev => prev.map(n => {
        if (n.id === id) {
          return {
            ...n,
            x: mouseSvgX - offsetX,
            y: mouseSvgY - offsetY,
            vx: 0,
            vy: 0,
            isDragging: true
          };
        }
        return n;
      }));
      return;
    }

    if (isPanning) {
      setPan({
        x: e.clientX - startPanRef.current.x,
        y: e.clientY - startPanRef.current.y
      });
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    if (draggingNodeRef.current) {
      const id = draggingNodeRef.current.id;
      setSimNodes(prev => prev.map(n => n.id === id ? { ...n, isDragging: false } : n));
      draggingNodeRef.current = null;
    }
  };

  const startNodeDrag = (e: React.PointerEvent, node: SimNode) => {
    e.stopPropagation();
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseSvgX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseSvgY = (e.clientY - rect.top - pan.y) / zoom;

    draggingNodeRef.current = {
      id: node.id,
      offsetX: mouseSvgX - node.x,
      offsetY: mouseSvgY - node.y
    };
    setSimNodes(prev => prev.map(n => n.id === node.id ? { ...n, isDragging: true } : n));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Calculate curved edge paths
  const getCurvedEdgePath = (src: SimNode, tgt: SimNode) => {
    const dx = tgt.x - src.x;
    const dy = tgt.y - src.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return `M ${src.x} ${src.y} L ${tgt.x} ${tgt.y}`;

    // Offset control point slightly for pleasant aesthetic curve
    const curvature = Math.min(25, dist * 0.12);
    const mx = (src.x + tgt.x) / 2;
    const my = (src.y + tgt.y) / 2;

    // Normal vector
    const nx = -dy / dist;
    const ny = dx / dist;
    const cx = mx + nx * curvature;
    const cy = my + ny * curvature;

    return `M ${src.x} ${src.y} Q ${cx} ${cy} ${tgt.x} ${tgt.y}`;
  };

  // Calculate particle position along edge curve
  const getParticlePosition = (src: SimNode, tgt: SimNode, t: number) => {
    const dx = tgt.x - src.x;
    const dy = tgt.y - src.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const curvature = Math.min(25, dist * 0.12);
    const mx = (src.x + tgt.x) / 2;
    const my = (src.y + tgt.y) / 2;
    const nx = -dy / (dist || 1);
    const ny = dx / (dist || 1);
    const cx = mx + nx * curvature;
    const cy = my + ny * curvature;

    // Quadratic Bezier Formula: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
    const u = 1 - t;
    const px = u * u * src.x + 2 * u * t * cx + t * t * tgt.x;
    const py = u * u * src.y + 2 * u * t * cy + t * t * tgt.y;
    return { x: px, y: py };
  };

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-[#0c1322] text-slate-100 overflow-hidden shadow-2xl select-none" ref={containerRef}>
      
      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Mode Switcher & Status */}
        <div className="flex items-center gap-2 pointer-events-auto bg-[#131e34]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg">
          <div className="flex items-center gap-1.5 mr-2 pr-2 border-r border-slate-700/60 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-emerald-300">LIVE TOPOLOGY</span>
          </div>

          <button
            onClick={() => setLayoutMode('FORCE')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
              layoutMode === 'FORCE'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Organic Force-Directed Constellation"
          >
            <Compass className="w-3.5 h-3.5" />
            Force
          </button>

          <button
            onClick={() => setLayoutMode('CONCENTRIC')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
              layoutMode === 'CONCENTRIC'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Concentric Planetary Orbits"
          >
            <Layers className="w-3.5 h-3.5" />
            Orbit
          </button>

          <button
            onClick={() => setLayoutMode('FLOW_DAG')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
              layoutMode === 'FLOW_DAG'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Hierarchical Value Stream Flow (DAG)"
          >
            <Zap className="w-3.5 h-3.5" />
            DAG Flow
          </button>
        </div>

        {/* Right: Zoom, Particles, Simulation Controls */}
        <div className="flex items-center gap-2 pointer-events-auto bg-[#131e34]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg">
          {layoutMode === 'FORCE' && (
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
              title={isSimulating ? 'Pause physics relaxation' : 'Resume live spring physics'}
            >
              {isSimulating ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
          )}

          <button
            onClick={() => setParticlesActive(!particlesActive)}
            className={`p-1.5 rounded-lg transition ${
              particlesActive ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50' : 'text-slate-500 hover:text-slate-300'
            }`}
            title={particlesActive ? 'Disable live capital particle flow' : 'Enable live capital particle flow'}
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            onClick={() => setZoom(z => Math.min(2.5, z + 0.15))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-mono text-slate-400 min-w-[38px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={() => setZoom(z => Math.max(0.4, z - 0.15))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={resetView}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Reset Pan & Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ height }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <defs>
          {/* Subtle architectural background grid */}
          <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(255, 255, 255, 0.1)" />
          </pattern>

          {/* Radial dark background gradient */}
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#172545" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0c1322" stopOpacity="1" />
          </radialGradient>

          {/* Arrow markers for edges */}
          <marker
            id="edge-arrow"
            viewBox="0 0 10 10"
            refX="28"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" opacity="0.75" />
          </marker>
          <marker
            id="edge-arrow-active"
            viewBox="0 0 10 10"
            refX="32"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
          </marker>

          {/* Glowing particle glow filter */}
          <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Node glow filter */}
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background rects */}
        <rect width="100%" height="100%" fill="url(#bg-glow)" />
        <rect width="100%" height="100%" fill="url(#graph-grid)" />

        {/* Transformed Stage */}
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          
          {/* Concentric orbit helper rings when in Orbit mode */}
          {layoutMode === 'CONCENTRIC' && (
            <g opacity="0.15">
              {[50, 110, 170, 240, 290, 340, 380].map(r => (
                <circle
                  key={r}
                  cx={containerRef.current ? containerRef.current.clientWidth / 2 : 400}
                  cy={height / 2}
                  r={r}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
            </g>
          )}

          {/* Edges Layer */}
          <g className="edges-layer">
            {edges.map(edge => {
              const src = nodePositionMap.get(edge.source);
              const tgt = nodePositionMap.get(edge.target);
              if (!src || !tgt) return null;

              const isHighlighted = connectedEdgeIds.has(edge.id) || hoveredEdgeId === edge.id;
              const isDimmed = (hoveredNodeId || selectedNode) && !isHighlighted;
              const pathD = getCurvedEdgePath(src, tgt);

              return (
                <g 
                  key={edge.id}
                  className="transition-opacity duration-300 cursor-pointer"
                  style={{ opacity: isDimmed ? 0.15 : isHighlighted ? 1 : 0.65 }}
                  onMouseEnter={() => setHoveredEdgeId(edge.id)}
                  onMouseLeave={() => setHoveredEdgeId(null)}
                >
                  {/* Invisible wider stroke for easy hover */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="16"
                  />

                  {/* Outer glow stroke when highlighted */}
                  {isHighlighted && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="5"
                      strokeOpacity="0.4"
                      filter="url(#particle-glow)"
                    />
                  )}

                  {/* Primary edge path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHighlighted ? '#38bdf8' : edge.verified ? '#334155' : '#1e293b'}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    strokeDasharray={edge.verified ? undefined : '5 3'}
                    markerEnd={isHighlighted ? 'url(#edge-arrow-active)' : 'url(#edge-arrow)'}
                  />

                  {/* Edge relation badge centered on midpoint */}
                  {(isHighlighted || hoveredEdgeId === edge.id) && (
                    <g transform={`translate(${(src.x + tgt.x) / 2}, ${(src.y + tgt.y) / 2 - 8})`}>
                      <rect
                        x="-45"
                        y="-10"
                        width="90"
                        height="20"
                        rx="10"
                        fill="#0f172a"
                        stroke="#38bdf8"
                        strokeWidth="1"
                        filter="url(#node-glow)"
                      />
                      <text
                        textAnchor="middle"
                        y="3"
                        fontSize="9"
                        fill="#e2e8f0"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {edge.relation || edge.relationship || 'links to'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* Flowing Energy Particles Layer */}
          {particlesActive && (
            <g className="particles-layer pointer-events-none">
              {particles.map((p, i) => {
                const src = nodePositionMap.get(p.sourceId);
                const tgt = nodePositionMap.get(p.targetId);
                if (!src || !tgt) return null;

                const pos = getParticlePosition(src, tgt, p.progress);
                const isEdgeHighlighted = connectedEdgeIds.has(p.edgeId);

                return (
                  <g key={`${p.edgeId}-${i}`} transform={`translate(${pos.x}, ${pos.y})`}>
                    {/* Glowing halo */}
                    <circle
                      r={p.size * (isEdgeHighlighted ? 2.2 : 1.4)}
                      fill={isEdgeHighlighted ? '#38bdf8' : p.color}
                      opacity={isEdgeHighlighted ? 0.7 : 0.4}
                      filter="url(#particle-glow)"
                    />
                    {/* Bright particle core */}
                    <circle
                      r={p.size}
                      fill="#ffffff"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Nodes Layer */}
          <g className="nodes-layer">
            {simNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isConnected = connectedNodeIds.has(node.id);
              const isDimmed = (hoveredNodeId || selectedNode) && !isConnected;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer transition-opacity duration-300"
                  style={{ opacity: isDimmed ? 0.22 : 1 }}
                  onPointerDown={(e) => startNodeDrag(e, node)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNode(node);
                  }}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  {/* Outer pulsating ring for selected/hovered node */}
                  {(isSelected || isHovered) && (
                    <circle
                      r={node.radius + 10}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      opacity="0.8"
                      className="animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                  )}

                  {/* Soft radial aura glow */}
                  <circle
                    r={node.radius + 6}
                    fill={node.glowColor}
                    filter="url(#node-glow)"
                  />

                  {/* Main Node Disc */}
                  <circle
                    r={node.radius}
                    fill={isSelected ? '#1e293b' : '#0f172a'}
                    stroke={isSelected ? '#38bdf8' : node.color}
                    strokeWidth={isSelected ? 3 : 2}
                  />

                  {/* Archetype Icon Glyph / Monogram */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={node.color}
                    fontSize={node.radius * 0.75}
                    fontWeight="black"
                    fontFamily="monospace"
                  >
                    {node.type === 'PERSON' && 'P'}
                    {node.type === 'ORGANIZATION' && 'O'}
                    {node.type === 'BUSINESS' && 'B'}
                    {node.type === 'REVENUE' && '$'}
                    {node.type === 'ASSET' && 'A'}
                    {node.type === 'LIABILITY' && 'L'}
                    {node.type === 'OPPORTUNITY' && '✦'}
                    {node.type === 'AGENT' && '🤖'}
                    {node.type === 'OUTCOME' && '✓'}
                  </text>

                  {/* Small Type Pill / Verified Dot */}
                  <circle
                    cx={node.radius * 0.7}
                    cy={-node.radius * 0.7}
                    r="4"
                    fill="#10b981"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />

                  {/* Node Name Label */}
                  <text
                    y={node.radius + 16}
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    className="drop-shadow-md"
                  >
                    {node.label}
                  </text>

                  {/* Node Subtitle / Value Pill */}
                  {node.value && (
                    <text
                      y={node.radius + 28}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {node.value}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

        </g>
      </svg>

      {/* Bottom Floating Telemetry Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none text-xs font-mono">
        <div className="bg-[#131e34]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-md flex items-center gap-4 text-slate-300 pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Entities: <strong className="text-white">{nodes.length}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Relational Vectors: <strong className="text-white">{edges.length}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ed25519 Provenance: 100% Verified</span>
          </div>
        </div>

        <div className="bg-[#131e34]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-md text-slate-400 pointer-events-auto flex items-center gap-2">
          <span>Drag nodes to reshape • Scroll to zoom • Click node to inspect</span>
        </div>
      </div>

    </div>
  );
};
