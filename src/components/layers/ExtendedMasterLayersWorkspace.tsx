import React, { useState, useMemo } from 'react';
import { 
  MASTER_100_LAYERS, 
  getLayerByNumber, 
  getLayerById 
} from '../../data/master100LayersData';
import { MasterLayerSpec, AppLayer } from '../../types/econos';
import { Layer62RdTaxCreditWorkspace } from './Layer62RdTaxCreditWorkspace';
import { 
  Search, 
  Filter, 
  Layers, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Zap,
  Building2,
  TrendingUp,
  Cpu,
  RefreshCw
} from 'lucide-react';

interface ExtendedMasterLayersWorkspaceProps {
  currentLayer?: AppLayer;
  onSelectLayer: (layer: AppLayer) => void;
}

export const ExtendedMasterLayersWorkspace: React.FC<ExtendedMasterLayersWorkspaceProps> = ({
  currentLayer,
  onSelectLayer
}) => {
  // Determine initial selected layer
  const initialLayerNum = useMemo(() => {
    if (!currentLayer) return 42;
    if (currentLayer === 'LAYER_62_RD_TAX_CREDIT' || currentLayer === 'LAYER_62') return 62;
    const match = currentLayer.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= 1 && num <= 100) return num;
    }
    return 42; // default to Layer 42 (start of 42-61 range)
  }, [currentLayer]);

  const [selectedLayerNumber, setSelectedLayerNumber] = useState<number>(initialLayerNum);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  // Filtered layers
  const filteredLayers = useMemo(() => {
    return MASTER_100_LAYERS.filter((layer) => {
      // Category filter
      if (categoryFilter === 'ENTERPRISE_SYNTHETICS' && (layer.layerNumber < 42 || layer.layerNumber > 61)) {
        return false;
      }
      if (categoryFilter === 'INSTITUTIONAL_TAX_PE' && (layer.layerNumber < 62 || layer.layerNumber > 75)) {
        return false;
      }
      if (categoryFilter === 'DEEP_SPACE_CONTINUUM' && (layer.layerNumber < 76 || layer.layerNumber > 100)) {
        return false;
      }
      if (categoryFilter === 'CORE_V2' && (layer.layerNumber < 1 || layer.layerNumber > 10)) {
        return false;
      }
      if (categoryFilter === 'SOVEREIGN_PLANETARY' && (layer.layerNumber < 11 || layer.layerNumber > 26)) {
        return false;
      }
      if (categoryFilter === 'FRONTIER_OMNI' && (layer.layerNumber < 27 || layer.layerNumber > 41)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = layer.layerNumber.toString().includes(q);
        const matchesName = layer.name.toLowerCase().includes(q);
        const matchesSubtitle = layer.subtitle.toLowerCase().includes(q);
        const matchesBenefit = layer.businessBenefit.toLowerCase().includes(q);
        const matchesId = layer.id.toLowerCase().includes(q);
        return matchesNum || matchesName || matchesSubtitle || matchesBenefit || matchesId;
      }

      return true;
    });
  }, [categoryFilter, searchQuery]);

  const selectedLayer = useMemo(() => {
    return getLayerByNumber(selectedLayerNumber) || MASTER_100_LAYERS[41]; // Layer 42
  }, [selectedLayerNumber]);

  const handleRunSimulation = (layer: MasterLayerSpec) => {
    setSimulationRunning(true);
    setSimulationLogs([
      `[${new Date().toLocaleTimeString()}] Initializing Sovereign Rail for ${layer.name}...`,
      `[${new Date().toLocaleTimeString()}] Verifying Ed25519 Agent cryptographic signature & policy limits...`,
      `[${new Date().toLocaleTimeString()}] Telemetry feed linked: ${layer.metric}`,
      `[${new Date().toLocaleTimeString()}] Executing autonomous optimization cycle...`
    ]);

    setTimeout(() => {
      setSimulationLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] SUCCESS: ${layer.businessBenefit} - Verified on Sovereign Ledger.`
      ]);
      setSimulationRunning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Explaining the 100 Layers Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                100 Layers Sovereign Grid
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Comprehensive Architecture
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              All 100 Layers Operating Core
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl">
              Complete catalog and interactive runtime for all 100 sovereign layers — including <strong className="text-amber-300">Layers 42 to 61 (Enterprise Synthetics & Industrial Rails)</strong>, <strong className="text-amber-300">Layer 62 (R&D Tax §41 Credit Engine)</strong>, Institutional Private Equity (Layers 63–75), and Planetary Megastructures (Layers 76–100).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedLayerNumber(62);
                setCategoryFilter('INSTITUTIONAL_TAX_PE');
              }}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold font-mono transition flex items-center gap-2 shadow-md"
            >
              <span>Jump to Layer 62 (R&D Tax)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setSelectedLayerNumber(42);
                setCategoryFilter('ENTERPRISE_SYNTHETICS');
              }}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold font-mono transition flex items-center gap-2"
            >
              <span>Explore Layers 42–61</span>
            </button>
          </div>
        </div>

        {/* Quick Range Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800 text-xs font-mono">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Category:</span>
          </span>

          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              categoryFilter === 'ALL' 
                ? 'bg-white text-slate-950 font-bold' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            All 100 Layers
          </button>

          <button
            onClick={() => setCategoryFilter('ENTERPRISE_SYNTHETICS')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              categoryFilter === 'ENTERPRISE_SYNTHETICS' 
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' 
                : 'text-amber-300 hover:text-white hover:bg-slate-800 border border-amber-500/30'
            }`}
          >
            ⚡ Layers 42–61: Enterprise Synthetics
          </button>

          <button
            onClick={() => setCategoryFilter('INSTITUTIONAL_TAX_PE')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              categoryFilter === 'INSTITUTIONAL_TAX_PE' 
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-xs' 
                : 'text-emerald-300 hover:text-white hover:bg-slate-800 border border-emerald-500/30'
            }`}
          >
            🏛️ Layers 62–75: Tax §41 & Private Equity
          </button>

          <button
            onClick={() => setCategoryFilter('DEEP_SPACE_CONTINUUM')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              categoryFilter === 'DEEP_SPACE_CONTINUUM' 
                ? 'bg-blue-400 text-slate-950 font-bold' 
                : 'text-blue-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            🚀 Layers 76–100: Deep Space
          </button>

          <button
            onClick={() => setCategoryFilter('CORE_V2')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              categoryFilter === 'CORE_V2' 
                ? 'bg-slate-200 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Layers 1–10: Core OS & V2
          </button>

          <button
            onClick={() => setCategoryFilter('SOVEREIGN_PLANETARY')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              categoryFilter === 'SOVEREIGN_PLANETARY' 
                ? 'bg-slate-200 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Layers 11–26: Sovereign & Planetary
          </button>

          <button
            onClick={() => setCategoryFilter('FRONTIER_OMNI')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              categoryFilter === 'FRONTIER_OMNI' 
                ? 'bg-slate-200 text-slate-950 font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Layers 27–41: Frontier & Omni
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Layout: Left List + Right Detail/Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Layer Browser & Search (5 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search layer # (e.g. 42, 62) or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
              <span>Showing {filteredLayers.length} of 100 Layers</span>
              <span className="text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={() => { setSearchQuery(''); setCategoryFilter('ALL'); }}>
                Reset Filters
              </span>
            </div>

            {/* Scrollable Layer Card List */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredLayers.map((layer) => {
                const isSelected = layer.layerNumber === selectedLayerNumber;
                const isRequested42to61 = layer.layerNumber >= 42 && layer.layerNumber <= 61;
                const isLayer62 = layer.layerNumber === 62;

                return (
                  <button
                    key={layer.layerNumber}
                    onClick={() => {
                      setSelectedLayerNumber(layer.layerNumber);
                      if (layer.layerNumber <= 41) {
                        // Also trigger global layer navigation if desired
                      }
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 text-xs ${
                      isSelected
                        ? 'bg-slate-900 border-slate-800 text-white shadow-md'
                        : isLayer62
                        ? 'bg-amber-50/80 border-amber-300 text-slate-900 hover:bg-amber-100/80'
                        : isRequested42to61
                        ? 'bg-slate-50/80 border-slate-200 text-slate-900 hover:bg-slate-100'
                        : 'bg-white border-slate-200/70 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono font-bold text-[11px] px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-amber-400 text-slate-950' 
                          : isLayer62
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        Layer {layer.layerNumber}
                      </span>
                      <span className={`text-[10px] font-mono ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {layer.metric}
                      </span>
                    </div>

                    <p className={`font-semibold line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}>
                      {layer.shortName}
                    </p>

                    <p className={`text-[11px] line-clamp-1 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {layer.businessBenefit}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Layer Inspector & Active Interactive Engine (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* If Layer 62 is selected, render the dedicated full R&D Tax §41 Workspace! */}
          {selectedLayerNumber === 62 ? (
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs font-mono text-amber-900 flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Viewing Dedicated Layer 62 Interactive Environment</span>
                </span>
                <span className="text-[11px] text-amber-800">
                  Direct IRS §41 & Form 6765 Synthesis Active
                </span>
              </div>
              <Layer62RdTaxCreditWorkspace />
            </div>
          ) : (
            /* For all other layers (e.g. 42–61, 63–100, 1–41) */
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
              {/* Layer Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 text-white">
                      Layer {selectedLayer.layerNumber} of 100
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {selectedLayer.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {selectedLayer.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    {selectedLayer.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedLayer.subtitle}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-right shrink-0">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Live Metric</p>
                  <p className="text-lg font-mono font-bold text-slate-900">{selectedLayer.metric}</p>
                  <p className="text-[10px] font-mono text-emerald-600 font-semibold">{selectedLayer.suggestedFee}</p>
                </div>
              </div>

              {/* Core Value & Monetization Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 uppercase font-mono">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tangible Business Benefit</span>
                  </div>
                  <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                    {selectedLayer.businessBenefit}
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 uppercase font-mono">
                    <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                    <span>Commercial Payment Criteria</span>
                  </div>
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    {selectedLayer.paymentCriteria}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono">
                  Architectural Description & Operating Mechanics
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-200/60">
                  {selectedLayer.description}
                </p>
              </div>

              {/* Key Outputs */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono">
                  Verified Deliverables & Key Outputs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedLayer.keyOutputs.map((output, idx) => (
                    <div 
                      key={idx} 
                      className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2 text-xs text-slate-700 font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{output}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Execution & Simulation Box */}
              <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs font-bold text-white">
                      Autonomous Rail Execution Simulator
                    </span>
                  </div>
                  <button
                    onClick={() => handleRunSimulation(selectedLayer)}
                    disabled={simulationRunning}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs font-mono transition flex items-center gap-1.5 shadow-sm"
                  >
                    {simulationRunning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Simulating Rail...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Trigger Layer {selectedLayer.layerNumber} Optimization</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-black/50 border border-slate-800 rounded-lg p-3 font-mono text-[11px] space-y-1 min-h-[90px]">
                  {simulationLogs.length === 0 ? (
                    <p className="text-slate-500 italic">
                      Click "Trigger Layer {selectedLayer.layerNumber} Optimization" to execute live simulation of this layer's business benefit across sovereign accounts.
                    </p>
                  ) : (
                    simulationLogs.map((log, index) => (
                      <p key={index} className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                        {log}
                      </p>
                    ))
                  )}
                </div>
              </div>

              {/* If layer is within 1 to 41, offer switch to core workspace */}
              {selectedLayer.layerNumber <= 41 && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600">
                    This layer has a dedicated high-fidelity workspace in the Core/V2/Omni navigation tabs.
                  </span>
                  <button
                    onClick={() => onSelectLayer(selectedLayer.id as AppLayer)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-mono font-semibold flex items-center gap-1 transition"
                  >
                    <span>Open Dedicated Workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
