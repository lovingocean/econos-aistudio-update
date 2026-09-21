import React, { useState } from 'react';
import {
  Network,
  Globe2,
  Building2,
  Users,
  Shield,
  Send,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Filter,
  Lock,
  Unlock,
  Radio,
  FileCode,
  Layers,
  Zap,
  TrendingDown
} from 'lucide-react';
import {
  INITIAL_GLOBAL_GRAPH_NODES,
  INITIAL_GLOBAL_GRAPH_EDGES,
  INITIAL_COUNTERPARTY_TWINS,
  INITIAL_PROTOCOL_MESSAGES
} from '../../data/econosV2Data';
import { 
  GlobalGraphHierarchy, 
  GlobalGraphNode, 
  CounterpartyTwin,
  EconomicProtocolMessage
} from '../../types/econosV2';

export const GlobalGraphNetworkWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GLOBAL_GRAPH' | 'COUNTERPARTY_TWINS' | 'ECONOMIC_PROTOCOL'>('GLOBAL_GRAPH');
  const [selectedHierarchy, setSelectedHierarchy] = useState<string>('ALL');
  const [selectedTwinId, setSelectedTwinId] = useState<string>('ct-01');
  const [protocolMessages, setProtocolMessages] = useState<EconomicProtocolMessage[]>(INITIAL_PROTOCOL_MESSAGES);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);

  const hierarchyLevels: { level: GlobalGraphHierarchy; label: string; desc: string }[] = [
    { level: 'TRANSACTION', label: '1. Transaction', desc: 'Invoices, POs & wire settlements' },
    { level: 'COMPANY', label: '2. Company', desc: 'Host enterprise digital twin' },
    { level: 'CUSTOMER_SUPPLIER', label: '3. Customer / Supplier', desc: 'Direct trading counterparties' },
    { level: 'COUNTERPARTY', label: '4. Counterparty', desc: 'Banks, lenders, insurers & logistics' },
    { level: 'INDUSTRY', label: '5. Industry', desc: 'Sector indices & peer benchmarks' },
    { level: 'SUPPLY_CHAIN', label: '6. Supply Chain', desc: 'Corridors & logistics chokepoints' },
    { level: 'COUNTRY', label: '7. Country', desc: 'Macro sovereign jurisdictions & central banks' },
    { level: 'GLOBAL_MARKET', label: '8. Global Market', desc: 'SOFR, FX currencies & global commodities' },
  ];

  const filteredNodes = selectedHierarchy === 'ALL'
    ? INITIAL_GLOBAL_GRAPH_NODES
    : INITIAL_GLOBAL_GRAPH_NODES.filter(n => n.hierarchyLevel === selectedHierarchy);

  const selectedTwin = INITIAL_COUNTERPARTY_TWINS.find(t => t.id === selectedTwinId) || INITIAL_COUNTERPARTY_TWINS[0];

  const handleBroadcastSignal = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      const newMsg: EconomicProtocolMessage = {
        id: `msg-${Math.floor(Math.random() * 9000 + 1000)}`,
        protocolVersion: 'ECONOS-EEP-v2.1',
        senderInstanceId: 'inst-nexus-host-us.econos.net',
        recipientInstanceId: 'inst-tsmc-europe.econos.net',
        objectType: 'SUPPLY_SIGNAL',
        payloadSummary: 'Selective Disclosure: Emergency wafer capacity query for 40,000 unit batch #882.',
        selectiveDisclosureActive: true,
        encryptionStandard: 'AES-GCM-256',
        signatureAlgorithm: 'Ed25519',
        signerPassportId: 'PASS-US-0012-AGENT03',
        replayProtectionNonce: `0x${Math.random().toString(16).substring(2, 10)}`,
        auditHash: 'sha256:77bc9a12e34f89',
        timestamp: new Date().toISOString(),
        status: 'VERIFIED'
      };
      setProtocolMessages(prev => [newMsg, ...prev]);
    }, 800);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 font-black">
              <Globe2 className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Global Economic Graph, Counterparty Twins &amp; Economic Protocol
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-[10px] font-mono text-purple-300 font-bold uppercase">
              V2 Network Layer
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Expands internal enterprise graphs into a permissioned 8-level Global Economic Graph. 
            Connects external Counterparty Digital Twins for multi-hop ripple propagation, mediated by the cryptographic ECONOS Economic Protocol (EEP-v2.1).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-right">
            <div className="text-[10px] text-slate-400">SELECTIVE DISCLOSURE</div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Leakage Privacy Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 rounded-xl text-xs font-mono">
        <button
          onClick={() => setActiveTab('GLOBAL_GRAPH')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'GLOBAL_GRAPH'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Network className="w-3.5 h-3.5 text-purple-400" />
          <span>8-Level Global Graph Hierarchy</span>
        </button>

        <button
          onClick={() => setActiveTab('COUNTERPARTY_TWINS')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'COUNTERPARTY_TWINS'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Counterparty Digital Twins &amp; Ripple Trace</span>
        </button>

        <button
          onClick={() => setActiveTab('ECONOMIC_PROTOCOL')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'ECONOMIC_PROTOCOL'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-amber-500" />
          <span>ECONOS Economic Protocol (EEP-v2.1)</span>
        </button>
      </div>

      {/* TAB 1: 8-LEVEL GLOBAL ECONOMIC GRAPH */}
      {activeTab === 'GLOBAL_GRAPH' && (
        <div className="space-y-6">
          
          {/* Hierarchy Filter Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Global Graph Hierarchy Spectrum</span>
              </span>
              <button
                onClick={() => setSelectedHierarchy('ALL')}
                className={`px-2 py-1 rounded text-[10px] font-bold ${
                  selectedHierarchy === 'ALL'
                    ? 'bg-[#132338] text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                View All Levels ({INITIAL_GLOBAL_GRAPH_NODES.length} Entities)
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {hierarchyLevels.map((hl) => (
                <button
                  key={hl.level}
                  onClick={() => setSelectedHierarchy(hl.level)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    selectedHierarchy === hl.level
                      ? 'bg-[#132338] text-white border-[#132338] shadow-sm'
                      : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-[11px] truncate">{hl.label}</div>
                  <div className="text-[9px] opacity-70 truncate mt-0.5">{hl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Graph Entities & Relationship Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Entities List */}
            <div className="lg:col-span-7 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 font-bold uppercase text-[10px]">
                <span>Registered Graph Entities ({filteredNodes.length})</span>
                <span>Provenance &amp; Permission</span>
              </div>

              <div className="space-y-2">
                {filteredNodes.map((node) => (
                  <div key={node.id} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                            {node.entityType}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-800 font-bold text-[10px] border border-purple-200">
                            {node.hierarchyLevel}
                          </span>
                          {node.creditRating && (
                            <span className="text-[10px] font-bold text-slate-600">
                              Rating: {node.creditRating}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{node.label}</h4>
                      </div>

                      <div className="text-right">
                        {node.financialExposureUsd && (
                          <div className="font-bold text-slate-900 text-xs">
                            ${(node.financialExposureUsd / 1000000).toFixed(2)}M Exposure
                          </div>
                        )}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 inline-block mt-0.5">
                          {(node.permissionScope || '').replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Jurisdiction: {node.jurisdiction}</span>
                      <span>Source: {node.provenance}</span>
                      <span>Confidence: {(node.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Edge Relationships & Semantic Dependency */}
            <div className="lg:col-span-5 space-y-3 font-mono text-xs">
              <div className="text-slate-500 font-bold uppercase text-[10px]">
                Cross-Entity Economic Edges ({INITIAL_GLOBAL_GRAPH_EDGES.length} Verified Relations)
              </div>

              <div className="space-y-2.5">
                {INITIAL_GLOBAL_GRAPH_EDGES.map((edge) => (
                  <div key={edge.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-900 text-[11px]">
                        {(edge.relationshipType || '').replace(/_/g, ' ')}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        edge.dependencyLevel === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                        edge.dependencyLevel === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {edge.dependencyLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-700 text-[11px]">
                      <span className="font-semibold text-slate-900 truncate max-w-[120px]">{edge.source}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-900 truncate max-w-[120px]">{edge.target}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                      <span>Exposure: ${(edge.economicExposureUsd ?? 0).toLocaleString()}</span>
                      <span className="text-emerald-700 font-semibold">{edge.permission}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: COUNTERPARTY DIGITAL TWINS & RIPPLE TRACE */}
      {activeTab === 'COUNTERPARTY_TWINS' && (
        <div className="space-y-6">
          
          {/* Twin Selector Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {INITIAL_COUNTERPARTY_TWINS.map((twin) => (
              <button
                key={twin.id}
                onClick={() => setSelectedTwinId(twin.id)}
                className={`p-3 rounded-xl border text-left transition flex-1 min-w-[240px] ${
                  selectedTwinId === twin.id
                    ? 'bg-[#132338] text-white border-[#132338] shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold opacity-70">{twin.category}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Health: {twin.financialHealthScore}/100</span>
                </div>
                <div className="font-bold text-sm mt-1">{twin.name}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{twin.industry} &bull; {twin.country}</div>
              </button>
            ))}
          </div>

          {/* Selected Twin Ripple Propagation Architecture */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
            
            {/* Twin Header Details */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{selectedTwin.name}</h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Consent Verified &bull; Active Ping
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">
                  Selective Disclosure Scopes: {selectedTwin.selectiveDisclosureScopes.join(' • ')}
                </p>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-[10px] text-slate-400">ACTIVE EXPOSURE</div>
                  <div className="text-sm font-bold text-slate-900">${(selectedTwin.activeExposureUsd / 1000000).toFixed(2)}M</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">DELIVERY RELIABILITY</div>
                  <div className="text-sm font-bold text-emerald-700">{selectedTwin.deliveryReliabilityPct}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">DEFAULT PROBABILITY</div>
                  <div className="text-sm font-bold text-slate-700">{selectedTwin.defaultProbabilityPct}%</div>
                </div>
              </div>
            </div>

            {/* Ripple Propagation Engine (The Core Prompt Requirement) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 uppercase text-xs tracking-wider flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-rose-600" />
                    <span>Multi-Hop Ripple Propagation: Supplier Deterioration to Debt Covenant</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Trigger: {selectedTwin.rippleScenario.triggerEvent}
                  </p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  selectedTwin.rippleScenario.covenantBreachRisk 
                    ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {selectedTwin.rippleScenario.covenantBreachRisk ? 'Covenant Risk Alert' : 'Buffer Absorbed'}
                </span>
              </div>

              {/* Step Sequence */}
              <div className="space-y-2.5">
                {selectedTwin.rippleScenario.steps.map((step) => (
                  <div 
                    key={step.step}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      step.severity === 'CRITICAL' ? 'bg-rose-50/60 border-rose-200 text-rose-950' :
                      step.severity === 'WARNING' ? 'bg-amber-50/60 border-amber-200 text-amber-950' :
                      'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                        step.severity === 'CRITICAL' ? 'bg-rose-600 text-white' :
                        step.severity === 'WARNING' ? 'bg-amber-600 text-white' :
                        'bg-slate-700 text-white'
                      }`}>
                        {step.step}
                      </div>
                      <div>
                        <div className="font-bold text-xs uppercase">{(step.domain || '').replace('_', ' ')}</div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{step.description}</p>
                      </div>
                    </div>

                    <div className="text-right sm:shrink-0">
                      <div className="text-[10px] text-slate-500">{step.metric}</div>
                      <div className="font-bold text-xs">{step.delta}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Impact Summary */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-amber-400 font-bold text-xs">MODELED ENTERPRISE BOTTOM-LINE IMPACT</div>
                  <p className="text-slate-400 text-xs">
                    Economic Brain automatically synthesizes dual-sourcing intervention to neutralize $1.85M cash loss.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-rose-400 text-base font-black">
                    -${(selectedTwin.rippleScenario?.netEnterpriseCashLossUsd ?? 0).toLocaleString()} Unhedged
                  </span>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    +$2.2M Protected by Intervention
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 3: ECONOS ECONOMIC PROTOCOL (EEP-v2.1) */}
      {activeTab === 'ECONOMIC_PROTOCOL' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  ECONOS Economic Protocol (EEP-v2.1) Stream
                </h3>
              </div>
              <p className="text-slate-500 text-xs mt-0.5">
                Standardized protocol for authorized ECONOS instances &amp; counterparties. Enforces cryptographic passports, selective disclosure, replay protection, and verifiable audit hashes.
              </p>
            </div>

            <button
              onClick={handleBroadcastSignal}
              disabled={isBroadcasting}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-90 text-slate-950 font-bold text-xs transition shadow-xs flex items-center gap-1.5"
            >
              <Send className={`w-3.5 h-3.5 ${isBroadcasting ? 'animate-spin' : ''}`} />
              <span>Broadcast Selective Signal</span>
            </button>
          </div>

          {/* Protocol Message Feed */}
          <div className="space-y-3">
            {protocolMessages.map((msg) => (
              <div key={msg.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#132338] text-amber-400 font-bold text-[10px]">
                      {msg.objectType}
                    </span>
                    <span className="text-slate-500 text-[10px]">{msg.protocolVersion}</span>
                    <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      {msg.encryptionStandard} / {msg.signatureAlgorithm}
                    </span>
                  </div>
                  <span className="text-slate-400 text-[10px]">{msg.timestamp}</span>
                </div>

                <div className="text-slate-800 text-xs leading-relaxed">
                  <span className="font-semibold text-slate-900">Payload:</span> {msg.payloadSummary}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                  <div className="truncate">
                    <span className="font-semibold">From:</span> {msg.senderInstanceId}
                  </div>
                  <div className="truncate">
                    <span className="font-semibold">To:</span> {msg.recipientInstanceId}
                  </div>
                  <div className="truncate text-right">
                    <span className="font-semibold">Audit Hash:</span> {msg.auditHash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
