import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MASTER_100_LAYERS, 
  getLayerByNumber, 
  getLayerById 
} from '../../data/master100LayersData';
import { AppLayer, MasterLayerSpec } from '../../types/econos';
import { 
  Search, 
  X, 
  Layers, 
  ArrowRight, 
  CornerDownLeft, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Activity, 
  ShieldCheck, 
  DollarSign, 
  ChevronRight, 
  Command, 
  Hash, 
  FileText, 
  ArrowUpRight 
} from 'lucide-react';

interface GlobalLayerSearchProps {
  isOpen: boolean;
  onClose: () => void;
  currentLayer?: AppLayer;
  onSelectLayer: (layer: AppLayer) => void;
}

const CATEGORY_TABS = [
  { id: 'ALL', label: 'All 100 Layers', range: '1–100' },
  { id: 'CORE_OS', label: 'Core OS', range: 'L1–5' },
  { id: 'V2_STRATEGIC', label: 'Strategic', range: 'L6–10' },
  { id: 'SOVEREIGN_INFRA', label: 'Sovereign Rails', range: 'L11–19' },
  { id: 'PLANETARY_SYSTEMS', label: 'Planetary Grid', range: 'L20–26' },
  { id: 'CIVILIZATIONAL_FRONTIER', label: 'Frontier', range: 'L27–31' },
  { id: 'OMNI_SINGULARITY', label: 'Omni Nexus', range: 'L32–41' },
  { id: 'ENTERPRISE_SYNTHETICS', label: 'Synthetics', range: 'L42–61' },
  { id: 'INSTITUTIONAL_TAX_PE', label: 'Tax & Audit', range: 'L62–75' },
  { id: 'DEEP_SPACE_CONTINUUM', label: 'Continuity', range: 'L76–100' },
];

const SPOTLIGHT_LAYER_NUMBERS = [1, 2, 3, 4, 19, 32, 42, 62];

export const GlobalLayerSearch: React.FC<GlobalLayerSearchProps> = ({
  isOpen,
  onClose,
  currentLayer,
  onSelectLayer,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      setHighlightedIndex(0);
    } else {
      setQuery('');
      setSelectedCategory('ALL');
    }
  }, [isOpen]);

  // Global ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Determine current active layer number
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

  // Spotlight curated layers
  const spotlightLayers = useMemo(() => {
    return SPOTLIGHT_LAYER_NUMBERS.map(num => getLayerByNumber(num)).filter(Boolean) as MasterLayerSpec[];
  }, []);

  // Multi-attribute search and scoring logic
  const filteredLayers = useMemo(() => {
    let list = MASTER_100_LAYERS;

    // Filter by category tab if not ALL
    if (selectedCategory !== 'ALL') {
      list = list.filter(l => l.category === selectedCategory);
    }

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return list;
    }

    // Check if query is directly a number e.g. "62", "l62", "layer 62"
    const parsedNum = trimmed.replace(/^l(ayer)?\s*/i, '');
    const isNumSearch = /^\d+$/.test(parsedNum);
    const targetNum = isNumSearch ? parseInt(parsedNum, 10) : null;

    return list
      .map(layer => {
        let score = 0;

        // Exact layer number match gets absolute highest priority
        if (targetNum !== null && layer.layerNumber === targetNum) {
          score += 1000;
        } else if (layer.layerNumber.toString().startsWith(parsedNum)) {
          score += 200;
        }

        // Exact or prefix ID match
        const idLower = layer.id.toLowerCase();
        if (idLower === trimmed) {
          score += 800;
        } else if (idLower.includes(trimmed)) {
          score += 250;
        }

        // Name match
        const nameLower = layer.name.toLowerCase();
        const shortNameLower = layer.shortName.toLowerCase();
        if (nameLower.includes(trimmed)) {
          score += 300;
          if (nameLower.startsWith(trimmed)) score += 100;
        }
        if (shortNameLower.includes(trimmed)) {
          score += 250;
        }

        // Subtitle match
        if (layer.subtitle.toLowerCase().includes(trimmed)) {
          score += 150;
        }

        // Business benefit match
        if (layer.businessBenefit.toLowerCase().includes(trimmed)) {
          score += 100;
        }

        // Key outputs match
        if (layer.keyOutputs?.some(o => o.toLowerCase().includes(trimmed))) {
          score += 120;
        }

        // Category / Tier label match
        if (layer.categoryLabel.toLowerCase().includes(trimmed)) {
          score += 80;
        }

        return { layer, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || a.layer.layerNumber - b.layer.layerNumber)
      .map(item => item.layer);
  }, [query, selectedCategory]);

  // Keep highlightedIndex in bounds
  useEffect(() => {
    setHighlightedIndex(0);
  }, [query, selectedCategory]);

  // Dispatch navigation to target layer
  const handleSelectLayer = (layer: MasterLayerSpec) => {
    const num = layer.layerNumber;
    if (num === 62) {
      onSelectLayer('LAYER_62_RD_TAX_CREDIT');
    } else if (layer.id && num <= 41 && !layer.id.startsWith('LAYER_')) {
      onSelectLayer(layer.id as AppLayer);
    } else {
      onSelectLayer(`LAYER_${num}` as AppLayer);
    }
    onClose();
  };

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredLayers.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % filteredLayers.length);
      // scroll into view
      scrollSelectedIntoView((highlightedIndex + 1) % filteredLayers.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + filteredLayers.length) % filteredLayers.length);
      scrollSelectedIntoView((highlightedIndex - 1 + filteredLayers.length) % filteredLayers.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredLayers[highlightedIndex];
      if (target) {
        handleSelectLayer(target);
      }
    }
  };

  const scrollSelectedIntoView = (index: number) => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll('[data-search-item]');
    if (items[index]) {
      (items[index] as HTMLElement).scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  };

  const activeHighlighted = filteredLayers[highlightedIndex] || filteredLayers[0] || null;

  if (!isOpen) return null;

  return (
    <div 
      id="global-layer-search-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Global System Layers Search"
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-6 pb-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[85vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-slate-50/70 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700 border border-amber-500/30 shrink-0">
            <Search className="w-5 h-5" />
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              id="global-layers-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search 100 system layers by number (e.g. 62, L42), name, ID, or benefit..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-mono text-sm sm:text-base outline-none pr-8"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ESC and Shortcut hints */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">↑↓ Navigate</span>
            <span className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">↵ Select</span>
            <button
              onClick={onClose}
              className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition shadow-2xs cursor-pointer"
              title="Close search modal (Esc)"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-3 sm:px-4 py-2 border-b border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-mono">
          <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Tiers:</span>
          </span>
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap text-[11px] font-medium cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#132338] text-white font-bold shadow-2xs'
                  : 'bg-slate-100/80 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-1 text-[9px] opacity-70 ${selectedCategory === tab.id ? 'text-amber-300' : 'text-slate-500'}`}>
                {tab.range}
              </span>
            </button>
          ))}
        </div>

        {/* Content Body: Dual Pane (List + Inspector Preview) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[360px]">
          
          {/* Results List */}
          <div 
            ref={listRef}
            className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[500px] scrollbar-thin scrollbar-thumb-slate-300"
          >
            {/* Spotlight Banner when query is empty */}
            {!query && selectedCategory === 'ALL' && (
              <div className="p-3 bg-amber-50/50 border-b border-amber-100">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-900 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Curated Spotlight Layers</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {spotlightLayers.map(l => (
                    <button
                      key={l.id}
                      onClick={() => handleSelectLayer(l)}
                      className="p-2 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200/80 text-left transition shadow-2xs font-mono group cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-amber-700">L{l.layerNumber}</span>
                        <span className="text-slate-400 group-hover:text-amber-700 transition">→</span>
                      </div>
                      <div className="text-xs font-bold text-slate-800 truncate mt-0.5">
                        {l.shortName}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {l.suggestedFee}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Count Header */}
            <div className="px-3 sm:px-4 py-1.5 bg-slate-50/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>
                {filteredLayers.length} {filteredLayers.length === 1 ? 'layer' : 'layers'} matching
                {query ? ` "${query}"` : ''}
              </span>
              <span className="text-[10px] text-slate-400">Total System: 100 Layers</span>
            </div>

            {/* List items */}
            {filteredLayers.map((layer, idx) => {
              const isSelected = idx === highlightedIndex;
              const isCurrent = layer.layerNumber === currentLayerNumber;
              const isLayer62 = layer.layerNumber === 62;

              return (
                <div
                  key={layer.id}
                  data-search-item
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => handleSelectLayer(layer)}
                  className={`p-3 sm:px-4 sm:py-3 transition flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected 
                      ? 'bg-amber-50/80 border-l-4 border-amber-500 pl-2 sm:pl-3' 
                      : 'hover:bg-slate-50/80'
                  } ${isCurrent ? 'bg-indigo-50/40' : ''}`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Layer Number Pill */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs ${
                      isLayer62
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                        : isSelected
                          ? 'bg-[#132338] text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      L{layer.layerNumber}
                    </div>

                    {/* Title & Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                          {layer.name}
                        </span>

                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                            CURRENT
                          </span>
                        )}

                        {isLayer62 && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-200 text-amber-900">
                            §41 ASC CAPTURE
                          </span>
                        )}

                        <span className="text-[10px] font-mono text-slate-400">
                          {layer.categoryLabel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {layer.subtitle}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 mt-1 flex-wrap">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-emerald-600" />
                          <span>{layer.suggestedFee}</span>
                        </span>
                        <span>•</span>
                        <span className="truncate max-w-xs">{layer.businessBenefit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="flex flex-col items-end shrink-0 gap-1.5 self-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold flex items-center gap-1 transition ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      <span>Navigate</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredLayers.length === 0 && (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-800 font-mono">No layers match "{query}"</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try searching by layer number (1–100), key outputs (e.g. FedNow, Merkle, Tax, Satellite), or reset the category filter.
                </p>
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('ALL');
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 font-semibold transition cursor-pointer"
                >
                  Reset Search Filter
                </button>
              </div>
            )}
          </div>

          {/* Right Inspector Preview Panel */}
          {activeHighlighted && (
            <div className="hidden md:flex w-72 lg:w-80 bg-slate-50/90 border-l border-slate-200 p-4 flex-col justify-between overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#132338] text-amber-300 font-mono font-bold text-xs">
                    Layer {activeHighlighted.layerNumber} / 100
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    {activeHighlighted.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {activeHighlighted.name}
                  </h4>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {activeHighlighted.categoryLabel}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-2 font-mono shadow-2xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Monetization &amp; Fee</span>
                    <span className="text-emerald-700 font-bold text-sm">{activeHighlighted.suggestedFee}</span>
                    <span className="text-slate-500 text-[10px] block truncate">{activeHighlighted.paymentCriteria}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Primary Operational Metric</span>
                    <span className="text-slate-800 font-semibold">{activeHighlighted.metric}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Strategic Benefit</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeHighlighted.businessBenefit}
                  </p>
                </div>

                {activeHighlighted.keyOutputs && activeHighlighted.keyOutputs.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Key Outputs</span>
                    <div className="flex flex-wrap gap-1">
                      {activeHighlighted.keyOutputs.map((out, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-600">
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200">
                <button
                  onClick={() => handleSelectLayer(activeHighlighted)}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                >
                  <span>Open Layer {activeHighlighted.layerNumber}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-2.5 px-4 bg-slate-100 border-t border-slate-200 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="w-3.5 h-3.5 text-slate-400" />
            <span>Global Layer Command Search</span>
            <span className="text-slate-300">•</span>
            <span>Tip: Press <strong className="text-slate-700">⌘K</strong> or <strong className="text-slate-700">Ctrl+K</strong> from anywhere</span>
          </div>
          <div className="text-slate-400 text-[10px]">
            ECONOS Planetary Sovereign OS
          </div>
        </div>
      </div>
    </div>
  );
};
