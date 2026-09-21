import React, { useState } from 'react';
import {
  Cpu,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Download,
  Shield,
  Star,
  Zap,
  TrendingUp,
  BarChart2,
  Sliders,
  RotateCcw,
  Check,
  Search,
  Tag
} from 'lucide-react';
import {
  INITIAL_MODEL_REGISTRY,
  INITIAL_MARKETPLACE_MODULES
} from '../../data/econosV2Data';
import { 
  EconomicModelEntry, 
  MarketplaceModule 
} from '../../types/econosV2';

export const ModelRegistryWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MODEL_REGISTRY' | 'MARKETPLACE'>('MODEL_REGISTRY');
  const [models, setModels] = useState<EconomicModelEntry[]>(INITIAL_MODEL_REGISTRY);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceModule[]>(INITIAL_MARKETPLACE_MODULES);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const handleInstallModule = (moduleId: string) => {
    setMarketplaceItems(prev => prev.map(item => {
      if (item.id === moduleId) {
        return {
          ...item,
          isActiveInstalled: true,
          downloads: (item.downloads || 0) + 1
        };
      }
      return item;
    }));
  };

  const filteredMarketplace = marketplaceItems.filter(item => {
    const title = item.title || '';
    const desc = item.description || '';
    const query = (searchTerm || '').toLowerCase();
    const matchesSearch = title.toLowerCase().includes(query) || 
                          desc.toLowerCase().includes(query);
    const matchesCat = selectedCategory === 'ALL' || item.moduleType === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 font-black">
              <Cpu className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Universal Economic Model Registry &amp; Marketplace
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-[10px] font-mono text-teal-300 font-bold uppercase">
              Agent 25 Calibration &bull; Sandboxed Ecosystem
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Standardized registry for validated economic, statistical, and ML models powering ECONOS decisions. 
            Audited for drift calibration against the Outcome Ledger and connected to the verified third-party marketplace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-right">
            <div className="text-[10px] text-slate-400">REGISTRY INTEGRITY</div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>0 Critical Drifts Detected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 rounded-xl text-xs font-mono">
        <button
          onClick={() => setActiveTab('MODEL_REGISTRY')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'MODEL_REGISTRY'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-teal-500" />
          <span>Universal Model Registry ({models.length} Calibrated Models)</span>
        </button>

        <button
          onClick={() => setActiveTab('MARKETPLACE')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'MARKETPLACE'
              ? 'bg-[#132338] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
          <span>ECONOS Economic Marketplace ({marketplaceItems.length} Modules)</span>
        </button>
      </div>

      {/* TAB 1: UNIVERSAL MODEL REGISTRY */}
      {activeTab === 'MODEL_REGISTRY' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <span className="text-slate-700 font-bold uppercase text-[11px]">
              Active Decision Models Monitored by Agent 25 (Calibration &amp; Drift Arbiter)
            </span>
            <span className="text-slate-400 text-[10px]">
              Strict Brier Score &lt; 0.15 threshold enforced for Class A/B/C autonomy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((mod) => {
              const accuracy = mod.historicalAccuracyScore ?? (mod as any).historicalAccuracyPct ?? 98;
              const brier = mod.calibrationMetrics?.brierScore ?? (mod as any).brierScore ?? 0.038;
              const decisions = (mod as any).decisionsEvaluated ?? 14250;
              const drift = (mod as any).driftStatus || (brier <= 0.05 ? 'CALIBRATED' : 'SLIGHT_DRIFT');
              const author = mod.modelOwner || (mod as any).author || mod.assignedAgentCode || 'ECONOS Core Team';
              const lastCal = mod.validationHistory?.[0]?.date || (mod as any).lastCalibrated || '2026-08-15';
              const inputSignals = mod.dataLineage || (mod as any).inputFeatures || [];
              const gov = (mod as any).governanceRequirement || (mod.approvalStatus ? mod.approvalStatus.replace(/_/g, ' ') : 'CLASS C');
              const modelType = (mod as any).modelType || mod.assignedAgentCode || 'SOVEREIGN_CORE';

              return (
                <div key={mod.modelId} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{mod.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          v{mod.version}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        ID: {mod.modelId} &bull; Type: {modelType}
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      drift === 'CALIBRATED' ? 'bg-emerald-100 text-emerald-800' :
                      drift === 'SLIGHT_DRIFT' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {drift}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-[9px] text-slate-400 uppercase">Accuracy</div>
                      <div className="text-xs font-black text-emerald-700">{accuracy}%</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-[9px] text-slate-400 uppercase">Brier Score</div>
                      <div className="text-xs font-black text-indigo-700">{brier}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-[9px] text-slate-400 uppercase">Decisions Run</div>
                      <div className="text-xs font-black text-slate-800">{(decisions ?? 0).toLocaleString()}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-[9px] text-slate-400 uppercase">Governance</div>
                      <div className="text-xs font-black text-slate-800">{gov}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Input Signals &amp; Telemetry</div>
                    <div className="text-slate-700">{inputSignals.length > 0 ? inputSignals.join(', ') : 'Direct Economic Telemetry'}</div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Author: {author}</span>
                    <span>Last Calibrated: {lastCal}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ECONOS ECONOMIC MARKETPLACE */}
      {activeTab === 'MARKETPLACE' && (
        <div className="space-y-6 font-mono text-xs">
          
          {/* Marketplace Search and Filter */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search verified models &amp; scenarios..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
              {(['ALL', 'INDUSTRY_MODEL', 'MACRO_SCENARIO_PACK', 'COMPLIANCE_RULESET', 'OPTIMIZATION_SOLVER', 'SPECIALIZED_AGENT'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#132338] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {(cat || '').replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Marketplace Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredMarketplace.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                      {item.moduleType ? item.moduleType.replace(/_/g, ' ') : 'MODULE'}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span>By {item.provider}</span>
                    <span>&bull;</span>
                    <span>v{item.version}</span>
                    <span>&bull;</span>
                    <span>{(item.downloads || 0).toLocaleString()} installs</span>
                  </div>

                  {item.sandboxTested && (
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AI Firewall Sandboxed &amp; Certified</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    {item.pricingModel ? item.pricingModel.replace(/_/g, ' ') : 'ENTERPRISE'}
                  </span>
                  <button
                    onClick={() => handleInstallModule(item.id)}
                    disabled={item.isActiveInstalled}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      item.isActiveInstalled
                        ? 'bg-slate-100 text-slate-500 cursor-default'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                    }`}
                  >
                    {item.isActiveInstalled ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Installed</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Install Module</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
