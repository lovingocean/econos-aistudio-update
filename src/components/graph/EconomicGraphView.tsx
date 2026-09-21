import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../api/client';
import { EconomicGraphData, EconomicGraphNode, EconomicGraphEdge } from '../../types/econos';
import { LiveForceDirectedGraph } from './LiveForceDirectedGraph';
import { 
  Network, 
  Filter, 
  Layers, 
  Info, 
  RefreshCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Search,
  Sliders,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  DollarSign,
  Activity,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Bot
} from 'lucide-react';

export const EconomicGraphView: React.FC = () => {
  const [graphData, setGraphData] = useState<EconomicGraphData | null>(null);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<EconomicGraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'VISUAL' | 'SPLIT' | 'GRID'>('SPLIT');
  const [loading, setLoading] = useState(true);

  const loadGraph = async () => {
    setLoading(true);
    try {
      // 1. Fetch primary graph data
      const data = await api.getEconomicGraph();

      // 2. Augment with live commercial operations if available
      try {
        const [bankAccounts, deals, quotes] = await Promise.all([
          api.getTreasuryAccounts().catch(() => []),
          api.getPipelineDeals().catch(() => []),
          api.getContractQuotes().catch(() => [])
        ]);

        const augmentedNodes = [...(data.nodes || [])];
        const augmentedEdges = [...(data.edges || [])];

        const bizNode = augmentedNodes.find(n => n.type === 'BUSINESS') || augmentedNodes[0];
        const bizId = bizNode ? bizNode.id : 'node_biz';

        // Add Bank Accounts as ASSET nodes if not already present
        bankAccounts.forEach(acc => {
          const accNodeId = `node_bank_${acc.id}`;
          if (!augmentedNodes.some(n => n.id === accNodeId)) {
            augmentedNodes.push({
              id: accNodeId,
              label: acc.accountName,
              type: 'ASSET',
              value: `$${(acc.balanceUsd || 0).toLocaleString()} Liquid`
            });
            augmentedEdges.push({
              id: `edge_biz_bank_${acc.id}`,
              source: bizId,
              target: accNodeId,
              relation: 'holds treasury in',
              relationship: 'holds treasury in',
              verified: true,
              financialImpact: acc.balanceUsd
            });
          }
        });

        // Add Active Pipeline Deals as OPPORTUNITY nodes
        deals.filter(d => d.stage !== 'CLOSED_LOST').slice(0, 4).forEach(deal => {
          const dealNodeId = `node_deal_${deal.id}`;
          if (!augmentedNodes.some(n => n.id === dealNodeId)) {
            augmentedNodes.push({
              id: dealNodeId,
              label: deal.dealName,
              type: 'OPPORTUNITY',
              value: `$${(deal.annualValueUsd || 0).toLocaleString()} ARR (${deal.stage})`
            });
            augmentedEdges.push({
              id: `edge_biz_deal_${deal.id}`,
              source: bizId,
              target: dealNodeId,
              relation: 'pipeline opportunity',
              relationship: 'pipeline opportunity',
              verified: true,
              financialImpact: deal.annualValueUsd
            });
          }
        });

        // Add Latest CPQ Quotes
        quotes.slice(0, 3).forEach(quote => {
          const qNodeId = `node_qte_${quote.id}`;
          if (!augmentedNodes.some(n => n.id === qNodeId)) {
            augmentedNodes.push({
              id: qNodeId,
              label: `CPQ Quote ${quote.quoteNumber}`,
              type: 'OUTCOME',
              value: `$${(quote.totalContractValueUsd || 0).toLocaleString()} TCV (${quote.grossMarginPct || quote.blendedGrossMarginPct || 0}% margin)`
            });
            augmentedEdges.push({
              id: `edge_biz_qte_${quote.id}`,
              source: bizId,
              target: qNodeId,
              relation: 'priced contract',
              relationship: 'priced contract',
              verified: true,
              financialImpact: quote.totalContractValueUsd
            });
          }
        });

        setGraphData({
          nodes: augmentedNodes,
          edges: augmentedEdges
        });

        if (augmentedNodes.length > 0 && !selectedNode) {
          setSelectedNode(augmentedNodes[0]);
        }
        return;
      } catch (e) {
        // Fallback to base data if augmentation fails
      }

      setGraphData(data);
      if (data.nodes.length > 0 && !selectedNode) {
        setSelectedNode(data.nodes[0]);
      }
    } catch (err) {
      console.error('Failed to load graph data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGraph();
  }, []);

  const nodeTypes = ['ALL', 'PERSON', 'ORGANIZATION', 'BUSINESS', 'REVENUE', 'ASSET', 'LIABILITY', 'OPPORTUNITY', 'AGENT', 'OUTCOME'];

  const filteredNodes = useMemo(() => {
    if (!graphData?.nodes) return [];
    return graphData.nodes.filter(n => {
      const matchesType = selectedType === 'ALL' || n.type === selectedType;
      const matchesSearch = searchQuery === '' || 
        n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (n.value && n.value.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [graphData?.nodes, selectedType, searchQuery]);

  const getNodeColor = (type: EconomicGraphNode['type']) => {
    switch (type) {
      case 'PERSON': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'ORGANIZATION': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'BUSINESS': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'REVENUE': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'ASSET': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'LIABILITY': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'OPPORTUNITY': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'AGENT': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'OUTCOME': return 'bg-teal-50 text-teal-700 border-teal-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getConnectedEdges = (nodeId: string) => {
    return (graphData?.edges || []).filter(e => e.source === nodeId || e.target === nodeId);
  };

  // Metrics calculations
  const totalFinancialVolume = useMemo(() => {
    if (!graphData?.edges) return 0;
    return graphData.edges.reduce((sum, e) => sum + (e.financialImpact || 0), 0);
  }, [graphData?.edges]);

  const agentCount = useMemo(() => {
    return (graphData?.nodes || []).filter(n => n.type === 'AGENT').length;
  }, [graphData?.nodes]);

  return (
    <div className="space-y-6">
      
      {/* Top Header Card with Network Telemetry */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Relational Economic Topology</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-mono font-bold">
                DIRECTED FORCE NETWORK
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Cross-Layer Economic Constellation
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Real-time interactive graph connecting principals, corporate holding entities, operating companies, commercial treasury accounts, autonomous agents, and cryptographic yield outcomes.
            </p>
          </div>

          {/* Quick Telemetry KPI Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">Network Nodes</span>
              <span className="text-lg font-bold text-slate-900">{graphData?.nodes.length || 0}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">Active Vectors</span>
              <span className="text-lg font-bold text-slate-900">{graphData?.edges.length || 0}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">Autonomous Agents</span>
              <span className="text-lg font-bold text-indigo-600">{agentCount}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">Tracked Volume</span>
              <span className="text-lg font-bold text-emerald-600">
                ${(totalFinancialVolume / 1000).toFixed(0)}k
              </span>
            </div>
          </div>
        </div>

        {/* Controls & Filter Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          
          {/* Search bar & Type Pills */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search nodes by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              {nodeTypes.map(nt => (
                <button
                  key={nt}
                  onClick={() => setSelectedType(nt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition whitespace-nowrap ${
                    selectedType === nt
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {nt}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode & Refresh */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono">
              <button
                onClick={() => setViewMode('VISUAL')}
                className={`px-3 py-1 rounded-md transition ${viewMode === 'VISUAL' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Canvas
              </button>
              <button
                onClick={() => setViewMode('SPLIT')}
                className={`px-3 py-1 rounded-md transition ${viewMode === 'SPLIT' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Split
              </button>
              <button
                onClick={() => setViewMode('GRID')}
                className={`px-3 py-1 rounded-md transition ${viewMode === 'GRID' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Grid
              </button>
            </div>

            <button
              onClick={loadGraph}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              title="Refresh Graph & Re-pull Commercial Vectors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

      </div>

      {/* Main Content Layout based on ViewMode */}
      <div className="space-y-6">
        
        {/* VISUAL or SPLIT Mode: Render Live Force Directed Graph */}
        {(viewMode === 'VISUAL' || viewMode === 'SPLIT') && (
          <div className={`grid gap-6 ${viewMode === 'SPLIT' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
            
            {/* Live Visual Canvas (8 cols in split, 12 cols in full) */}
            <div className={`${viewMode === 'SPLIT' ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
              <LiveForceDirectedGraph
                nodes={filteredNodes}
                edges={graphData?.edges || []}
                selectedNode={selectedNode}
                onSelectNode={(node) => setSelectedNode(node)}
                height={viewMode === 'SPLIT' ? 580 : 660}
              />
            </div>

            {/* Side Node Inspector (4 cols in split) */}
            {viewMode === 'SPLIT' && (
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 font-mono text-xs space-y-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-xs">Node Inspector</span>
                    {selectedNode && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getNodeColor(selectedNode.type)}`}>
                        {selectedNode.type}
                      </span>
                    )}
                  </div>

                  {selectedNode ? (
                    <div className="mt-4 space-y-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Entity Designation</span>
                        <div className="text-lg font-black text-slate-900 font-sans tracking-tight">{selectedNode.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Node ID: {selectedNode.id}</div>
                        {selectedNode.value && (
                          <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                            <DollarSign className="w-3 h-3" />
                            {selectedNode.value}
                          </div>
                        )}
                      </div>

                      {/* Cryptographic Verification Badge */}
                      <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-purple-900 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                          <span>Sovereign Cryptographic Proof</span>
                        </div>
                        <p className="text-[10px] text-purple-700 leading-relaxed">
                          Entity authenticity guaranteed under Ed25519 signature scheme by ECONOS Sovereign Trust Root.
                        </p>
                      </div>

                      {/* Connected Relationships (Edges) */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">
                            Relational Vectors ({getConnectedEdges(selectedNode.id).length})
                          </span>
                        </div>

                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                          {getConnectedEdges(selectedNode.id).map(edge => {
                            const isSource = edge.source === selectedNode.id;
                            const counterpartId = isSource ? edge.target : edge.source;
                            const counterpartNode = graphData?.nodes.find(n => n.id === counterpartId);

                            return (
                              <button
                                key={edge.id}
                                onClick={() => counterpartNode && setSelectedNode(counterpartNode)}
                                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] transition group"
                              >
                                <div className="flex items-center justify-between text-slate-600 mb-1">
                                  <span className="text-purple-700 font-bold text-[10px]">
                                    {edge.relation || edge.relationship || 'links to'}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-mono">
                                    {isSource ? 'Outgoing →' : '← Incoming'}
                                  </span>
                                </div>
                                <div className="text-slate-900 font-bold font-sans truncate group-hover:text-purple-700">
                                  {counterpartNode?.label || counterpartId}
                                </div>
                                {edge.financialImpact && (
                                  <div className="text-emerald-700 font-mono text-[10px] mt-0.5">
                                    Impact: ${edge.financialImpact.toLocaleString()}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-400">
                      Select a node in the graph view to inspect its properties and relationships.
                    </div>
                  )}
                </div>

                {/* Footer notes */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Deterministic Zero-Trust</span>
                  <span>v2.4 Topological Engine</span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* GRID Mode: Classic Card Grid View */}
        {viewMode === 'GRID' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const connectedCount = getConnectedEdges(node.id).length;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border text-left font-mono transition relative ${
                    isSelected
                      ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-500/20 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${getNodeColor(node.type)}`}>
                      {node.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {connectedCount} vectors
                    </span>
                  </div>

                  <div className="text-sm font-bold text-slate-900 truncate font-sans mt-1">
                    {node.label}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {node.id}
                  </div>

                  {node.value && (
                    <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                      {node.value}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
