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
  Headphones,
  Wallet,
  Trophy,
  Home,
  Target,
  PhoneCall
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
  onOpenOnboarding?: () => void;
  onOpenBuyerFunnel?: () => void;
  onOpenDesignModal?: () => void;
  onOpenSmartContracts?: () => void;
  onOpenPaymentGateway?: () => void;
  onOpenP2PConsole?: () => void;
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
  onOpenOnboarding,
  onOpenBuyerFunnel,
  onOpenDesignModal,
  onOpenSmartContracts,
  onOpenPaymentGateway,
  onOpenP2PConsole,
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
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  // Auto-detect connected Web3 wallet (MetaMask)
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts && accounts[0]) {
            setConnectedWallet(accounts[0]);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleConnectWalletNavbar = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      alert('No Web3 wallet detected. Please install MetaMask browser extension.');
      return;
    }
    setIsConnectingWallet(true);
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts[0]) {
        setConnectedWallet(accounts[0]);
        // Also auto-switch to OMNIFIN AuraX blockchain layer if not already there
        if (onSelectLayer && currentLayer !== 'OMNIFIN') {
          onSelectLayer('OMNIFIN');
        }
      }
    } catch (err: any) {
      console.error('Wallet connection failed', err);
    } finally {
      setIsConnectingWallet(false);
    }
  };

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)] w-full max-w-full">
      <div className="w-full max-w-full px-2.5 sm:px-4 md:px-5 h-16 flex items-center justify-between gap-1 sm:gap-2">
        
        {/* Left: Brand Identity & Tenant Context */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#132338] flex items-center justify-center text-white font-black shadow-sm tracking-tight text-sm shrink-0">
              E
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-base uppercase text-slate-900">ECONOS</span>
                <span className="hidden md:inline-flex text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  FinOps
                </span>
              </div>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden lg:block" />

          {/* Org Switcher with Clear DEMO vs REAL Isolation Tag */}
          <div className="relative hidden sm:block">
            <button
              id="org-switcher-button"
              onClick={() => setShowOrgMenu(!showOrgMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-xs shadow-xs"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-slate-800 truncate max-w-[110px]">{currentOrg?.name || 'Org'}</span>
                  {isDemo ? (
                    <span className="px-1 py-0.2 text-[8px] rounded font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      DEMO
                    </span>
                  ) : (
                    <span className="px-1 py-0.2 text-[8px] rounded font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      REAL
                    </span>
                  )}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
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
                    id="navbar-org-dropdown-create-btn"
                    onClick={() => {
                      setShowOrgMenu(false);
                      setOpenOnboarding(true);
                      if (onOpenOnboarding) onOpenOnboarding();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs bg-[#132338] hover:bg-[#0c1827] text-white transition font-medium cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Organization</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Security, Commercial, Tools & Account Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0 ml-auto">

          {/* OMNIFIN Global Autonomous Financial Operating Layer */}
          {onSelectLayer && (
            <button
              id="navbar-omnifin-btn"
              onClick={() => onSelectLayer('OMNIFIN')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition shadow-xs cursor-pointer shrink-0 ${
                currentLayer === 'OMNIFIN'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-300 shadow-md ring-2 ring-cyan-400/40'
                  : 'bg-[#071326] hover:bg-[#0c1f3d] text-cyan-300 border-cyan-500/40 shadow-sm'
              }`}
              title="Open OMNIFIN — Global Autonomous Financial Operating Layer"
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-extrabold tracking-tight hidden md:inline">OMNIFIN</span>
              <span className="px-1 py-0.2 rounded text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-black">
                OS
              </span>
            </button>
          )}

          {/* Unified Tools & Enclaves Dropdown */}
          <div className="relative shrink-0">
            <button
              id="navbar-tools-menu-btn"
              onClick={() => setShowToolsMenu(!showToolsMenu)}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition shadow-xs cursor-pointer ${
                showToolsMenu
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
              title="All Enterprise Enclaves, Tools & Pricing"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden lg:inline">Tools &amp; Enclaves</span>
              <span className="lg:hidden hidden sm:inline">Tools</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showToolsMenu && (
              <div className="absolute right-0 mt-1 w-64 max-w-[calc(100vw-24px)] rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 text-xs font-mono divide-y divide-slate-100 max-h-[85vh] overflow-y-auto">
                
                {/* Strategic Enclaves & Design */}
                <div className="px-3 py-1 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Enclaves &amp; Design
                </div>
                <div className="py-1">
                  {onOpenDesignModal && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onOpenDesignModal();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-cyan-50 transition flex items-center gap-2.5 text-cyan-950 font-bold"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-600" />
                      <div>
                        <div>🎨 Dashboard Design Showcase</div>
                        <div className="text-[10px] text-cyan-700/80 font-normal">YC Minimalist &amp; Dimmed Specs</div>
                      </div>
                    </button>
                  )}

                  {onOpenSolutions && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onOpenSolutions();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-amber-50 transition flex items-center gap-2.5 text-slate-800"
                    >
                      <Zap className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-bold">⚡ 10 Enterprise Solutions</div>
                        <div className="text-[10px] text-slate-400 font-normal">Core B2B Problem Solvers</div>
                      </div>
                    </button>
                  )}

                  {onSelectLayer && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onSelectLayer('SOVEREIGN_COMMAND');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2.5 text-slate-800"
                    >
                      <span className="text-amber-500 font-black text-sm">Ω</span>
                      <div>
                        <div className="font-bold">Sovereign Command (4Q)</div>
                        <div className="text-[10px] text-slate-400 font-normal">Institutional Mission Architecture</div>
                      </div>
                    </button>
                  )}

                  {onOpenPodcast && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onOpenPodcast();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-indigo-50 transition flex items-center gap-2.5 text-slate-800"
                    >
                      <Headphones className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-bold">🎙️ AI Podcast Studio</div>
                        <div className="text-[10px] text-slate-400 font-normal">Two-Way Voice Syndicate</div>
                      </div>
                    </button>
                  )}

                  {onSelectLayer && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onSelectLayer('LANDING');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-purple-50 transition flex items-center gap-2.5 text-slate-800"
                    >
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-bold">🚀 Landing Page</div>
                        <div className="text-[10px] text-slate-400 font-normal">Public Showcase &amp; Hero Overview</div>
                      </div>
                    </button>
                  )}
                </div>

                {/* Three $100B Core Foundation Pillars */}
                <div className="px-3 py-1.5 text-[10px] text-cyan-600 uppercase font-black tracking-wider pt-2 bg-cyan-50/50">
                  Three $100B Pillars (Live)
                </div>
                <div className="py-1 bg-cyan-50/20">
                  {onOpenSmartContracts && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onOpenSmartContracts();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-cyan-100/60 transition flex items-center gap-2.5 text-cyan-950 font-bold"
                    >
                      <ShieldCheck className="w-4 h-4 text-cyan-600" />
                      <div>
                        <div>📜 1. Sovereign Smart Contracts</div>
                        <div className="text-[10px] text-cyan-700/80 font-normal">Base Mainnet ERC-721 Capped (5,000)</div>
                      </div>
                    </button>
                  )}

                  {onOpenPaymentGateway && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onOpenPaymentGateway();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-cyan-100/60 transition flex items-center gap-2.5 text-indigo-950 font-bold"
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div>💳 2. Stripe &amp; Plaid Corporate Rails</div>
                        <div className="text-[10px] text-indigo-700/80 font-normal">Card Luhn Check &amp; ACH Bank Wire</div>
                      </div>
                    </button>
                  )}

                  {onOpenP2PConsole && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onOpenP2PConsole();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-cyan-100/60 transition flex items-center gap-2.5 text-purple-950 font-bold"
                    >
                      <Globe2 className="w-4 h-4 text-purple-600" />
                      <div>
                        <div>🌐 3. P2P Gossip Mesh &amp; Relays</div>
                        <div className="text-[10px] text-purple-700/80 font-normal">Zurich &bull; Tokyo &bull; Frankfurt &bull; Singapore</div>
                      </div>
                    </button>
                  )}
                </div>

                {/* Commercial & Pricing OS */}
                <div className="px-3 py-1.5 text-[10px] text-slate-400 uppercase font-bold tracking-wider pt-2">
                  Commercial &amp; Audit
                </div>
                <div className="py-1">
                  {onOpenBuyerFunnel && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onOpenBuyerFunnel();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-emerald-50 transition flex items-center gap-2.5 text-emerald-800 font-bold"
                    >
                      <Target className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div>🎯 Commercial Buyer Funnel</div>
                        <div className="text-[10px] text-emerald-600 font-normal">Revenue Acceleration Audit</div>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowToolsMenu(false);
                      onOpenPricing();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2.5 text-slate-800"
                  >
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold">Pricing &amp; Commercial Tiers</div>
                      <div className="text-[10px] text-slate-400 font-normal">Contractor &amp; Enterprise Licences</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowToolsMenu(false);
                      onOpenCommercialAnalytics();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2.5 text-slate-800"
                  >
                    <Activity className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="font-bold">Commercial Telemetry</div>
                      <div className="text-[10px] text-slate-400 font-normal">LTV, Churn &amp; Conversion Analytics</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowToolsMenu(false);
                      onOpenTestSuite();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2.5 text-slate-800"
                  >
                    <FlaskConical className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold">20-Point System Verification</div>
                      <div className="text-[10px] text-slate-400 font-normal">Comprehensive Test Suite</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowToolsMenu(false);
                      onOpenRoadmap();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center gap-2.5 text-slate-800"
                  >
                    <Milestone className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-bold">5-Phase Implementation Roadmap</div>
                      <div className="text-[10px] text-slate-400 font-normal">2026 Sovereign Architecture</div>
                    </div>
                  </button>

                  {isUserAdmin && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        onOpenAdminPricing();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-amber-50 transition flex items-center gap-2.5 text-amber-900 border-t border-slate-100"
                    >
                      <Sliders className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-bold">Admin Pricing Config</div>
                        <div className="text-[10px] text-amber-700/80 font-normal">Entitlements &amp; Multi-Tenant Setup</div>
                      </div>
                    </button>
                  )}

                  {isDemo && (
                    <button
                      onClick={() => {
                        setShowToolsMenu(false);
                        handleResetDemo();
                      }}
                      disabled={isResetting}
                      className="w-full text-left px-3 py-2 hover:bg-rose-50 transition flex items-center gap-2.5 text-rose-700 border-t border-slate-100"
                    >
                      <RotateCcw className={`w-4 h-4 text-rose-600 ${isResetting ? 'animate-spin' : ''}`} />
                      <div>
                        <div className="font-bold">Reset Demo Data</div>
                        <div className="text-[10px] text-rose-600/80 font-normal">Restore seed baseline state</div>
                      </div>
                    </button>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Compact Web3 Wallet Button */}
          <button
            onClick={handleConnectWalletNavbar}
            disabled={isConnectingWallet}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition shadow-xs cursor-pointer shrink-0 ${
              connectedWallet
                ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/40 text-emerald-800'
                : 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900'
            }`}
            title={connectedWallet ? `Connected: ${connectedWallet}` : 'Connect MetaMask to AuraX L1 (Chain ID: 9924)'}
          >
            <Wallet className={`w-3.5 h-3.5 ${connectedWallet ? 'text-emerald-600' : 'text-amber-600'}`} />
            <span className="hidden md:inline">
              {connectedWallet
                ? `${connectedWallet.substring(0, 6)}...${connectedWallet.substring(connectedWallet.length - 4)}`
                : isConnectingWallet
                ? 'Connecting...'
                : 'Wallet'}
            </span>
            <span className="px-1 py-0.2 rounded text-[9px] bg-amber-200 text-amber-950 font-black">
              9924
            </span>
          </button>

          {/* Role Switcher (RBAC simulation) */}
          <div className="relative shrink-0 hidden sm:block">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 shadow-xs"
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

          {/* Action Buttons: 100 Layers Search, Notification, Profile (Guaranteed strictly inside viewport) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button 
              id="navbar-global-search-btn"
              onClick={() => setShowGlobalSearch(true)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition shadow-xs cursor-pointer group"
              title="Search 100 System Layers (⌘K / Ctrl+K)"
              aria-label="Open 100 System Layers Search"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition" />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-500 font-mono font-semibold">
                ⌘K
              </kbd>
            </button>

            <button 
              className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition relative shadow-xs shrink-0"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
            </button>

            {/* Interactive User Profile & Identity Menu */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1 p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                title="Account & Identity Settings"
              >
                <div className="w-8 h-8 rounded-full bg-[#132338] text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
                  {user?.name?.charAt(0) || 'M'}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-semibold text-slate-800 leading-none">{user?.name || 'Meek Ifti'}</div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-24px)] rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 text-xs">
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
                      id="navbar-user-dropdown-create-btn"
                      onClick={() => {
                        setShowUserMenu(false);
                        setOpenOnboarding(true);
                        if (onOpenOnboarding) onOpenOnboarding();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800 flex items-center gap-2 font-medium transition cursor-pointer"
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
