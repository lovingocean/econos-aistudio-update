import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  ChevronDown, 
  RotateCcw, 
  Plus, 
  FlaskConical, 
  Bell,
  Sparkles,
  DollarSign,
  Activity,
  Sliders,
  Search,
  Check,
  LogOut,
  Milestone,
  Zap,
  Globe2,
  Layers,
  Command,
  Headphones
} from 'lucide-react';
import { UserRole, AppLayer } from '../../types/econos';
import { GlobalLayerSearch } from './GlobalLayerSearch';

interface NavbarProps {
  onOpenTestSuite: () => void;
  onOpenPricing: () => void;
  onOpenCommercialAnalytics: () => void;
  onOpenAdminPricing: () => void;
  onOpenCommercialSuite: () => void;
  onOpenRoadmap: () => void;
  onOpenSolutions?: () => void;
  onOpenPodcast?: () => void;
  currentLayer?: AppLayer;
  onSelectLayer?: (layer: AppLayer) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenTestSuite,
  onOpenPricing,
  onOpenCommercialAnalytics,
  onOpenAdminPricing,
  onOpenCommercialSuite,
  onOpenRoadmap,
  onOpenSolutions,
  onOpenPodcast,
  currentLayer,
  onSelectLayer
}) => {
  const { 
    currentOrg, 
    organizations, 
    currentBusiness, 
    businesses,
    user, 
    isDemo, 
    subscription,
    activePlan,
    switchOrganization, 
    switchRole,
    switchUser,
    setOpenOnboarding,
    resetDemoEnvironment,
    logout
  } = useAuth();

  const [showOrgMenu, setShowOrgMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showCommercialMenu, setShowCommercialMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K to toggle global layer search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowGlobalSearch(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResetDemo = async () => {
    if (confirm('Reset demo environment to original seed baseline?')) {
      setIsResetting(true);
      try {
        await resetDemoEnvironment();
      } finally {
        setIsResetting(false);
      }
    }
  };

  const roles: UserRole[] = ['OWNER', 'ADMIN', 'MEMBER', 'VIEWER'];
  const isUserAdmin = user?.role === 'OWNER' || user?.role === 'ADMIN';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity & Tenant Context */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#132338] flex items-center justify-center text-white font-black shadow-sm tracking-tight text-sm">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base uppercase text-slate-900">ECONOS</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">v4.0 Planetary</span>
                
                {/* 26-Layer Quick Switcher Button */}
                {onSelectLayer && (
                  <div className="relative">
                    <button
                      id="navbar-all-layers-button"
                      onClick={() => setShowLayerMenu(!showLayerMenu)}
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition shadow-xs cursor-pointer"
                      title="Quick jump directly to any of the 41 Sovereign Layers"
                    >
                      <Globe2 className="w-3 h-3 text-indigo-600 animate-pulse" />
                      <span>41 Layers</span>
                      <ChevronDown className="w-2.5 h-2.5 text-indigo-400" />
                    </button>

                    {showLayerMenu && (
                      <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 max-h-[75vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-indigo-600" />
                            <span className="text-xs font-bold text-slate-800 font-mono uppercase">41-Layer Architecture</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">Click to jump</span>
                        </div>

                        {/* Search 100 System Layers quick CTA */}
                        <div className="mb-2">
                          <button
                            id="navbar-layers-menu-search-trigger"
                            onClick={() => {
                              setShowLayerMenu(false);
                              setShowGlobalSearch(true);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-900 text-xs font-mono font-bold flex items-center justify-between transition cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Search className="w-3.5 h-3.5 text-amber-600" />
                              <span>Search All 100 Layers</span>
                            </div>
                            <span className="px-1.5 py-0.5 rounded bg-white text-[10px] text-amber-800 border border-amber-300/60 font-bold">
                              ⌘K
                            </span>
                          </button>
                        </div>

                        {/* Tier 6: Omni-Access Singularity (L32-41) */}
                        <div className="mb-2.5">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-slate-900 px-2 py-1 rounded-md mb-1 flex items-center justify-between border border-amber-400/30">
                            <span>Tier 6 • Omni-Access Singularity (L32–41)</span>
                            <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-bold">10 OMNI</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { id: 'OMNI_TELEMETRY_BUS' as AppLayer, num: '32', name: 'Universal Telemetry & Earth Sensory Bus' },
                              { id: 'OMNI_CLEARING_MESH' as AppLayer, num: '33', name: 'Omnichannel Sovereign Clearing & RTGS Mesh' },
                              { id: 'OMNI_MINERAL_TITLE' as AppLayer, num: '34', name: 'Planetary Crust & Subsurface Cadastre' },
                              { id: 'OMNI_LEGAL_SYNTHESIS' as AppLayer, num: '35', name: '195-Nation Statutory & Legal Synthesis' },
                              { id: 'OMNI_POWER_GRID' as AppLayer, num: '36', name: 'High-Voltage Electrodynamic & Baseload Grid' },
                              { id: 'OMNI_CREDIT_MATRIX' as AppLayer, num: '37', name: 'Omniscient Counterparty Credit Matrix' },
                              { id: 'OMNI_ROBOTIC_LABOR' as AppLayer, num: '38', name: 'Autonomous Machine Labor Settlement Rails' },
                              { id: 'OMNI_INTENT_TRANSLATION' as AppLayer, num: '39', name: 'Direct Semantic Intent-to-Execution Mesh' },
                              { id: 'OMNI_QUANTUM_CITADEL' as AppLayer, num: '40', name: 'Post-Quantum Cryptographic Citadel' },
                              { id: 'OMNI_CIVILIZATION_ANCHOR' as AppLayer, num: '41', name: 'Civilizational Epoch Continuity Core' },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  onSelectLayer(item.id);
                                  setShowLayerMenu(false);
                                }}
                                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                                  currentLayer === item.id 
                                    ? 'bg-slate-900 text-amber-300 font-bold border border-amber-400/40' 
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentLayer === item.id ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-600'}`}>L{item.num}</span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tier 5: Civilizational Frontier (L27-31) */}
                        <div className="mb-2.5">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2 py-1 rounded-md mb-1 flex items-center justify-between">
                            <span>Tier 5 • Civilizational Frontier (L27–31)</span>
                            <span className="text-[9px] bg-amber-600 text-white px-1.5 py-0.2 rounded font-bold">5 FRONTIER</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { id: 'RELATIVISTIC_LIGHT_CONE' as AppLayer, num: '27', name: 'Relativistic Light-Cone Clearing (Minkowski DAG)' },
                              { id: 'GEOENGINEERING_DERIVATIVE' as AppLayer, num: '28', name: 'Stratosphere & Geoengineering Derivatives' },
                              { id: 'POST_HUMAN_ENTERPRISE' as AppLayer, num: '29', name: 'Post-Human Autonomous Enterprise (Delaware DST)' },
                              { id: 'BIOLOGICAL_NEUROMORPHIC_GRID' as AppLayer, num: '30', name: 'Bio-Compute & Neuromorphic Wetware Grid' },
                              { id: 'KARDASHEV_OMEGA_PROTOCOL' as AppLayer, num: '31', name: 'Kardashev Omega Protocol (Civilization Reboot)' },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  onSelectLayer(item.id);
                                  setShowLayerMenu(false);
                                }}
                                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                                  currentLayer === item.id 
                                    ? 'bg-amber-600 text-white font-bold' 
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentLayer === item.id ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600'}`}>L{item.num}</span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tier 4: Planetary Systems (L22-26) */}
                        <div className="mb-2.5">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-1 rounded-md mb-1 flex items-center justify-between">
                            <span>Tier 4 • Planetary Grid (L22–26)</span>
                            <span className="text-[9px] bg-purple-200 text-purple-800 px-1 rounded">5 NEW</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { id: 'SYNTHETIC_CENTRAL_BANK' as AppLayer, num: '22', name: 'Synthetic Central Bank (E-SDR Basket)' },
                              { id: 'ORBITAL_ESCROW' as AppLayer, num: '23', name: 'Planetary Physical Twin & Satellite Escrow' },
                              { id: 'POST_QUANTUM_ENCLAVE' as AppLayer, num: '24', name: 'Post-Quantum Crystals-Kyber Enclaves' },
                              { id: 'FIDUCIARY_GOVERNANCE' as AppLayer, num: '25', name: 'Fiduciary AI Board & 190-Nation Filings' },
                              { id: 'COMPUTE_ENERGY_GRID' as AppLayer, num: '26', name: 'Compute FLOP & Baseload Energy Grid' },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  onSelectLayer(item.id);
                                  setShowLayerMenu(false);
                                }}
                                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                                  currentLayer === item.id 
                                    ? 'bg-purple-600 text-white font-bold' 
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentLayer === item.id ? 'bg-purple-800 text-white' : 'bg-slate-100 text-slate-600'}`}>L{item.num}</span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tier 3: Sovereign Rails & Defense (L11-19) */}
                        <div className="mb-2.5">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md mb-1">
                            Tier 3 • Sovereign Rails & Defense (L11–19)
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { id: 'AUTONOMOUS_EXECUTION' as AppLayer, num: '11', name: 'Autonomous Banking Rails (FedNow)' },
                              { id: 'DECISION_LEDGER' as AppLayer, num: '12', name: 'Cryptographic Decision Memory (Merkle)' },
                              { id: 'OUTCOME_LEARNING' as AppLayer, num: '13', name: 'Bayesian Outcome Learning Loop' },
                              { id: 'CAPITAL_NETWORK' as AppLayer, num: '14', name: '$100M Sovereign Guarantee Pool' },
                              { id: 'P2P_CLEARING' as AppLayer, num: '14B', name: 'Multilateral P2P Clearing Mesh' },
                              { id: 'ZK_TRADE_CLEARANCE' as AppLayer, num: '15', name: 'ZK-SNARK Trade & Tax Clearance' },
                              { id: 'RWA_REPO_MARKET' as AppLayer, num: '16', name: 'RWA Tri-Party Repo Rails' },
                              { id: 'MACRO_HEDGE_SYNTH' as AppLayer, num: '17', name: 'Macro & Geopolitics Micro-Hedge' },
                              { id: 'CAPITAL_MA_OPTIMIZER' as AppLayer, num: '18', name: 'Capital Structure & Synthetic M&A' },
                              { id: 'WAR_ROOM' as AppLayer, num: '19', name: 'DEFCON Sovereign Defense War Room' },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  onSelectLayer(item.id);
                                  setShowLayerMenu(false);
                                }}
                                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                                  currentLayer === item.id 
                                    ? 'bg-emerald-700 text-white font-bold' 
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentLayer === item.id ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'}`}>L{item.num}</span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tier 2: Strategic Expansion (L5-9) */}
                        <div className="mb-2.5">
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-1 rounded-md mb-1">
                            Tier 2 • Strategic Expansion (L5–9)
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { id: 'ECONOMIC_BRAIN' as AppLayer, num: '5', name: 'Economic Brain Orchestrator' },
                              { id: 'GLOBAL_NETWORK' as AppLayer, num: '6', name: 'Global Graph & Counterparty Twins' },
                              { id: 'SIMULATOR' as AppLayer, num: '7', name: 'Global Macro Shock Simulator' },
                              { id: 'EXECUTIVE' as AppLayer, num: '8', name: 'Executive Command Center & M&A' },
                              { id: 'MODEL_REGISTRY' as AppLayer, num: '9', name: 'Model Registry & Drift Calibrator' },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  onSelectLayer(item.id);
                                  setShowLayerMenu(false);
                                }}
                                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                                  currentLayer === item.id 
                                    ? 'bg-amber-600 text-white font-bold' 
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentLayer === item.id ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600'}`}>L{item.num}</span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tier 1: Foundational OS (L1-4) */}
                        <div>
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-1 rounded-md mb-1">
                            Tier 1 • Foundational OS (L1–4)
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { id: 'BUSINESS' as AppLayer, num: '1', name: 'Business Economic Reality' },
                              { id: 'WEALTH' as AppLayer, num: '2', name: 'Wealth Engines & Twin' },
                              { id: 'TRUST' as AppLayer, num: '3', name: 'Trust & AI Firewall' },
                              { id: 'GRAPH' as AppLayer, num: '4', name: 'Economic Graph Fabric' },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  onSelectLayer(item.id);
                                  setShowLayerMenu(false);
                                }}
                                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                                  currentLayer === item.id 
                                    ? 'bg-[#132338] text-white font-bold' 
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentLayer === item.id ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}>L{item.num}</span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="text-[10px] tracking-widest text-slate-500 font-mono uppercase">Planetary Sovereign OS</div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block" />

          {/* Org Switcher with Clear DEMO vs REAL Isolation Tag */}
          <div className="relative">
            <button
              id="org-switcher-button"
              onClick={() => setShowOrgMenu(!showOrgMenu)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-xs shadow-xs"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800 truncate max-w-[160px]">{currentOrg?.name || 'Loading Org...'}</span>
                  {isDemo ? (
                    <span className="px-1.5 py-0.2 text-[9px] rounded font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      DEMO TENANT
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 text-[9px] rounded font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      REAL TENANT
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500">{currentBusiness?.name || 'Primary Business'}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {showOrgMenu && (
              <div className="absolute left-0 mt-1 w-72 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 border-b border-slate-100 flex justify-between items-center">
                  <span>Switch Organization</span>
                  <span className="text-slate-400">Tenant Isolation</span>
                </div>
                <div className="py-1 max-h-60 overflow-y-auto">
                  {organizations.map(org => (
                    <button
                      key={org.id}
                      onClick={() => {
                        switchOrganization(org.id);
                        setShowOrgMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition ${
                        org.id === currentOrg?.id ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-medium truncate">{org.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{org.tier} Tier</div>
                      </div>
                      {org.isDemo ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          DEMO
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          REAL
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-100 p-1.5">
                  <button
                    onClick={() => {
                      setShowOrgMenu(false);
                      setOpenOnboarding(true);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs bg-[#132338] hover:bg-[#0c1827] text-white transition font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Organization</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Security, Commercial & Role Testing Controls */}
        <div className="flex items-center gap-2">
          
          {/* Active Plan & Pricing Button */}
          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono transition shadow-xs"
            title="Manage subscription and view pricing tiers"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold uppercase text-slate-800">
              {activePlan?.name || subscription?.planId || 'FREE'}
            </span>
            {subscription?.status === 'TRIALING' && (
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
                TRIAL
              </span>
            )}
          </button>

          {/* Commercial & Telemetry Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCommercialMenu(!showCommercialMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 transition shadow-xs"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline font-medium">Commercial</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showCommercialMenu && (
              <div className="absolute right-0 mt-1 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 text-xs font-mono">
                <div className="px-3 py-1.5 text-[10px] text-slate-400 uppercase border-b border-slate-100 font-bold">
                  Commercial & Pricing OS
                </div>
                <button
                  onClick={() => {
                    onOpenPricing();
                    setShowCommercialMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2 text-slate-700"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pricing & Tiers</span>
                </button>

                <button
                  onClick={() => {
                    onOpenCommercialAnalytics();
                    setShowCommercialMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2 text-slate-700"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Commercial Telemetry</span>
                </button>

                <button
                  onClick={() => {
                    onOpenCommercialSuite();
                    setShowCommercialMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2 text-emerald-700 font-medium"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                  <span>32-Point Audit Suite</span>
                </button>

                {(user?.role === 'OWNER' || user?.role === 'ADMIN') && (
                  <button
                    onClick={() => {
                      onOpenAdminPricing();
                      setShowCommercialMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2 text-slate-700 border-t border-slate-100"
                  >
                    <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Admin Pricing Config</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Demo Reset button if in Demo tenant */}
          {isDemo && (
            <button
              onClick={handleResetDemo}
              disabled={isResetting}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 text-xs transition shadow-xs"
              title="Reset demo data to baseline seed"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              <span className="text-[11px] font-mono">Reset Demo</span>
            </button>
          )}

          {/* 10 Business Solutions & Problem Solver Button */}
          {onOpenSolutions && (
            <button
              id="enterprise-solutions-btn"
              onClick={onOpenSolutions}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-emerald-500/10 hover:from-amber-500/20 hover:to-emerald-500/20 border border-amber-400/40 text-slate-800 text-xs font-mono font-bold transition shadow-xs"
              title="ECONOS 10 Enterprise Problem Solver & Solution Execution Engine"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">10 Solutions</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                10/10
              </span>
            </button>
          )}

          {/* Sovereign Command Center (Concept C 4-Quadrant Institutional OS) */}
          {onSelectLayer && (
            <button
              id="navbar-sovereign-command-btn"
              onClick={() => onSelectLayer('SOVEREIGN_COMMAND')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition shadow-xs cursor-pointer ${
                currentLayer === 'SOVEREIGN_COMMAND'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-[#080d1a] hover:bg-[#0f172a] text-amber-300 border-amber-500/50 shadow-sm'
              }`}
              title="Open Concept C 4-Quadrant Institutional Sovereign Command Center"
            >
              <span className="text-amber-400 font-black">Ω</span>
              <span className="hidden md:inline">Sovereign Command</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-950 text-amber-300 border border-amber-500/40 font-black">
                4Q
              </span>
            </button>
          )}

          {/* Implementation Roadmap & Vision Button */}
          <button
            id="roadmap-matrix-btn"
            onClick={onOpenRoadmap}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#132338] hover:bg-slate-800 border border-[#132338] text-amber-400 text-xs font-mono font-bold transition shadow-xs"
            title="ECONOS 5-Phase Implementation Roadmap & $10B Vision Architecture"
          >
            <Milestone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Roadmap</span>
          </button>

          {/* AI Podcast Studio Button */}
          {onOpenPodcast && (
            <button
              id="navbar-podcast-studio-btn"
              onClick={onOpenPodcast}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950 to-slate-900 hover:from-cyan-900 hover:to-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition shadow-xs"
              title="Open Two-Way AI Voice Podcast Studio & YouTube Syndicate"
            >
              <Headphones className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Podcast Studio</span>
              <span className="px-1 py-0.2 rounded text-[9px] bg-cyan-500 text-slate-950 font-black">
                AI
              </span>
            </button>
          )}

          {/* Test Suite Button */}
          <button
            id="test-suite-btn"
            onClick={onOpenTestSuite}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-400 text-slate-800 text-xs font-mono transition shadow-xs"
          >
            <FlaskConical className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-medium">System Tests</span>
          </button>

          {/* Admin Config Direct Button */}
          {isUserAdmin && (
            <button
              onClick={onOpenAdminPricing}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-semibold transition shadow-xs"
              title="Open Admin Pricing & Entitlements Configuration"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Admin Config</span>
            </button>
          )}

          {/* Role Switcher (RBAC simulation) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">{user?.role || 'OWNER'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 text-xs font-mono">
                <div className="px-3 py-1.5 text-[10px] text-slate-400 uppercase border-b border-slate-100 font-bold">
                  Simulate RBAC Role
                </div>
                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 transition flex items-center justify-between ${
                      user?.role === r ? 'text-[#132338] font-bold bg-slate-50' : 'text-slate-700'
                    }`}
                  >
                    <span>{r}</span>
                    {user?.role === r && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Round Pill Action Buttons (Search, Notification, Profile dropdown) */}
          <div className="flex items-center gap-1.5 pl-1">
            <button 
              id="navbar-global-search-btn"
              onClick={() => setShowGlobalSearch(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition shadow-xs cursor-pointer group"
              title="Search 100 System Layers by Name or ID (⌘K / Ctrl+K)"
              aria-label="Open 100 System Layers Search"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition" />
              <span className="hidden xl:inline text-xs font-mono text-slate-600 font-medium">Search Layers...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-500 font-mono font-semibold">
                ⌘K
              </kbd>
            </button>

            <button 
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition relative shadow-xs"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
            </button>

            {/* Interactive User Profile & Identity Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                title="Account & Identity Settings"
              >
                <div className="w-9 h-9 rounded-full bg-[#132338] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user?.name?.charAt(0) || 'M'}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-slate-800 leading-none">{user?.name || 'Meek Ifti'}</div>
                  <div className="text-[10px] font-mono text-slate-400 leading-none mt-0.5">{user?.email || 'meekifti@gmail.com'}</div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden lg:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 text-xs">
                  {/* User Profile Card */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 text-sm">{user?.name || 'Meek Ifti'}</div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {user?.role || 'OWNER'}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5 truncate">{user?.email || 'meekifti@gmail.com'}</div>
                    <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Active Plan:</span>
                      <span className="font-bold text-[#132338] uppercase">{activePlan?.name || subscription?.planId || 'PRO'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] mt-1">
                      <span className="text-slate-500">Tenant Org:</span>
                      <span className="font-semibold text-slate-700 truncate max-w-[140px]">{currentOrg?.name}</span>
                    </div>
                  </div>

                  {/* Primary Actions */}
                  <div className="space-y-1 mb-3">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenAdminPricing();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-amber-50/80 hover:bg-amber-100/80 text-amber-900 border border-amber-200 flex items-center gap-2 font-semibold transition"
                    >
                      <Sliders className="w-4 h-4 text-amber-700" />
                      <span>Admin Pricing & Entitlements</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenPricing();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800 flex items-center gap-2 font-medium transition"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Change Plan / View Tiers</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setOpenOnboarding(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800 flex items-center gap-2 font-medium transition"
                    >
                      <Plus className="w-4 h-4 text-emerald-600" />
                      <span>Create New Organization</span>
                    </button>
                  </div>

                  {/* Identity Switcher */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="px-1 text-[10px] font-mono uppercase text-slate-400 font-bold mb-1.5">
                      Switch Identity
                    </div>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          switchUser('usr_real_meeki');
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-[11px] transition ${
                          user?.id === 'usr_real_meeki' ? 'bg-slate-100 text-slate-900 font-bold' : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div>
                          <div>Meek Ifti (Owner / Admin)</div>
                          <div className="text-[9px] text-slate-400 font-mono">meekifti@gmail.com</div>
                        </div>
                        {user?.id === 'usr_real_meeki' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>

                      <button
                        onClick={() => {
                          switchUser('usr_demo_founder');
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-[11px] transition ${
                          user?.id === 'usr_demo_founder' ? 'bg-slate-100 text-slate-900 font-bold' : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div>
                          <div>Alex Sterling (Demo Founder)</div>
                          <div className="text-[9px] text-slate-400 font-mono">demo@econo-systems.internal</div>
                        </div>
                        {user?.id === 'usr_demo_founder' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    </div>
                  </div>

                  {/* Sign Out / Lock Session */}
                  <div className="pt-2 border-t border-slate-100 mt-2">
                    <button
                      id="navbar-logout-btn"
                      onClick={async () => {
                        setShowUserMenu(false);
                        await logout();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium transition text-xs"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out / Lock Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Global Layer Search Modal (100 System Layers) */}
      {onSelectLayer && (
        <GlobalLayerSearch
          isOpen={showGlobalSearch}
          onClose={() => setShowGlobalSearch(false)}
          currentLayer={currentLayer}
          onSelectLayer={onSelectLayer}
        />
      )}
    </header>
  );
};
