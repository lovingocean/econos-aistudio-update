import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { LayerNavigation } from './components/layout/LayerNavigation';
import { BusinessWorkspace } from './components/business/BusinessWorkspace';
import { WealthWorkspace } from './components/wealth/WealthWorkspace';
import { TrustWorkspace } from './components/trust/TrustWorkspace';
import { EconomicGraphView } from './components/graph/EconomicGraphView';
import { SystemTestSuiteModal } from './components/testing/SystemTestSuite';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { PricingModal } from './components/commercial/PricingModal';
import { CommercialAnalyticsView } from './components/commercial/CommercialAnalyticsView';
import { AdminPricingConfigModal } from './components/commercial/AdminPricingConfigModal';
import { CommercialTestSuiteModal } from './components/commercial/CommercialTestSuiteModal';
import { RoadmapMatrixModal } from './components/roadmap/RoadmapMatrixModal';
import { EnterpriseSolutionsModal } from './components/solutions/EnterpriseSolutionsModal';
import { AuthScreen } from './components/auth/AuthScreen';
import { EconomicBrainWorkspace } from './components/v2/EconomicBrainWorkspace';
import { GlobalGraphNetworkWorkspace } from './components/v2/GlobalGraphNetworkWorkspace';
import { GlobalSimulatorWorkspace } from './components/v2/GlobalSimulatorWorkspace';
import { ExecutiveCommandCenterWorkspace } from './components/v2/ExecutiveCommandCenterWorkspace';
import { ModelRegistryWorkspace } from './components/v2/ModelRegistryWorkspace';
import { AutonomousExecutionWorkspace } from './components/v3/AutonomousExecutionWorkspace';
import { CryptographicLedgerWorkspace } from './components/v3/CryptographicLedgerWorkspace';
import { OutcomeLearningWorkspace } from './components/v3/OutcomeLearningWorkspace';
import { GlobalCapitalNetworkWorkspace } from './components/v3/GlobalCapitalNetworkWorkspace';
import { CrisisWarRoomWorkspace } from './components/v3/CrisisWarRoomWorkspace';
import { CrossTenantClearingWorkspace } from './components/v3/CrossTenantClearingWorkspace';
import { ZkTaxTradeClearanceWorkspace } from './components/v3/ZkTaxTradeClearanceWorkspace';
import { RwaRepoMarketWorkspace } from './components/v3/RwaRepoMarketWorkspace';
import { MacroHedgeSynthesizerWorkspace } from './components/v3/MacroHedgeSynthesizerWorkspace';
import { CapitalStructureMaWorkspace } from './components/v3/CapitalStructureMaWorkspace';
import { SyntheticCentralBankWorkspace } from './components/v4/SyntheticCentralBankWorkspace';
import { OrbitalSatelliteEscrowWorkspace } from './components/v4/OrbitalSatelliteEscrowWorkspace';
import { PostQuantumEnclaveWorkspace } from './components/v4/PostQuantumEnclaveWorkspace';
import { FiduciaryBoardGovernanceWorkspace } from './components/v4/FiduciaryBoardGovernanceWorkspace';
import { ComputeEnergyGridWorkspace } from './components/v4/ComputeEnergyGridWorkspace';
import { RelativisticLightConeWorkspace } from './components/v5/RelativisticLightConeWorkspace';
import { GeoengineeringDerivativeWorkspace } from './components/v5/GeoengineeringDerivativeWorkspace';
import { PostHumanEnterpriseWorkspace } from './components/v5/PostHumanEnterpriseWorkspace';
import { BiologicalNeuromorphicGridWorkspace } from './components/v5/BiologicalNeuromorphicGridWorkspace';
import { KardashevOmegaProtocolWorkspace } from './components/v5/KardashevOmegaProtocolWorkspace';
import { OmniAccessNexusWorkspace } from './components/v6/OmniAccessNexusWorkspace';
import { LeadDiscoveryWorkspace } from './components/leads/LeadDiscoveryWorkspace';
import { Layer62RdTaxCreditWorkspace } from './components/layers/Layer62RdTaxCreditWorkspace';
import { ExtendedMasterLayersWorkspace } from './components/layers/ExtendedMasterLayersWorkspace';
import { SovereignInstitutionalDashboard } from './components/dashboard/SovereignInstitutionalDashboard';
import { GlobalLayersProgressBar } from './components/layout/GlobalLayersProgressBar';
import { LayerActivityHeatmap } from './components/layout/LayerActivityHeatmap';
import { SystemTelemetryFeed } from './components/telemetry/SystemTelemetryFeed';
import { EconosIlluminatePodcast } from './components/podcast/EconosIlluminatePodcast';
import { OmnifinWorkspace } from './components/omnifin/OmnifinWorkspace';
import { AppLayer } from './types/econos';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Network, 
  FlaskConical,
  ExternalLink,
  DollarSign,
  Milestone,
  Zap,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { ErrorBoundary } from './components/layout/ErrorBoundary';

const AppContent: React.FC = () => {
  const { user, isLoading, isAuthenticated, openOnboarding, setOpenOnboarding } = useAuth();
  const [currentLayer, setCurrentLayer] = useState<AppLayer>('BUSINESS');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isAdminConfigOpen, setIsAdminConfigOpen] = useState(false);
  const [isCommercialSuiteOpen, setIsCommercialSuiteOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);

  // Sync AuthContext openOnboarding state with local onboarding modal state
  React.useEffect(() => {
    if (openOnboarding) {
      setIsOnboardingModalOpen(true);
    }
  }, [openOnboarding]);

  const handleCloseOnboarding = () => {
    setIsOnboardingModalOpen(false);
    setOpenOnboarding(false);
  };

  React.useEffect(() => {
    const handler = (e: any) => {
      if (e.detail) setCurrentLayer(e.detail);
    };
    window.addEventListener('navigate-layer', handler);
    return () => window.removeEventListener('navigate-layer', handler);
  }, []);

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-[#f8f9f6] flex flex-col items-center justify-center font-mono text-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-[#132338] flex items-center justify-center text-white font-black text-xl shadow-md animate-pulse mb-3">
          E
        </div>
        <p className="text-xs font-bold tracking-widest text-slate-600 uppercase">ECONOS SOVEREIGN OS</p>
        <p className="text-[10px] text-slate-400 mt-1">Resolving secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9f6] text-slate-900 bg-architect-grid flex flex-col selection:bg-amber-500/20 selection:text-amber-900">
      {/* Global 100 System Layers Progress Bar */}
      <GlobalLayersProgressBar
        currentLayer={currentLayer}
        onSelectLayer={setCurrentLayer}
      />

      {/* Top Fixed Navbar */}
      <Navbar
        onOpenTestSuite={() => setIsTestModalOpen(true)}
        onOpenPricing={() => setIsPricingModalOpen(true)}
        onOpenCommercialAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenAdminPricing={() => setIsAdminConfigOpen(true)}
        onOpenCommercialSuite={() => setIsCommercialSuiteOpen(true)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
        onOpenSolutions={() => setIsSolutionsOpen(true)}
        onOpenPodcast={() => setIsPodcastModalOpen(true)}
        onOpenOnboarding={() => setIsOnboardingModalOpen(true)}
        currentLayer={currentLayer}
        onSelectLayer={setCurrentLayer}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Layer Selector Bar */}
        <LayerNavigation
          currentLayer={currentLayer}
          onSelectLayer={setCurrentLayer}
        />

        {/* Dynamic Layer Content */}
        <div className="transition-all duration-200">
          <ErrorBoundary key={currentLayer} fallbackTitle={`Layer Shield (${currentLayer})`} onReset={() => setCurrentLayer('BUSINESS')}>
          {currentLayer === 'OMNIFIN' && (
            <OmnifinWorkspace />
          )}

          {currentLayer === 'SOVEREIGN_COMMAND' && (
            <SovereignInstitutionalDashboard onSelectLayer={setCurrentLayer} />
          )}

          {currentLayer === 'BUSINESS' && (
            <BusinessWorkspace onNavigateToLayer={setCurrentLayer} />
          )}

          {currentLayer === 'CLIENT_ACQUISITION' && (
            <LeadDiscoveryWorkspace />
          )}

          {currentLayer === 'WEALTH' && (
            <WealthWorkspace />
          )}

          {currentLayer === 'TRUST' && (
            <TrustWorkspace />
          )}

          {currentLayer === 'GRAPH' && (
            <EconomicGraphView />
          )}

          {currentLayer === 'ECONOMIC_BRAIN' && (
            <EconomicBrainWorkspace />
          )}

          {currentLayer === 'GLOBAL_NETWORK' && (
            <GlobalGraphNetworkWorkspace />
          )}

          {currentLayer === 'SIMULATOR' && (
            <GlobalSimulatorWorkspace />
          )}

          {currentLayer === 'EXECUTIVE' && (
            <ExecutiveCommandCenterWorkspace onSelectLayer={setCurrentLayer} />
          )}

          {currentLayer === 'MODEL_REGISTRY' && (
            <ModelRegistryWorkspace />
          )}

          {currentLayer === 'AUTONOMOUS_EXECUTION' && (
            <AutonomousExecutionWorkspace />
          )}

          {currentLayer === 'DECISION_LEDGER' && (
            <CryptographicLedgerWorkspace />
          )}

          {currentLayer === 'OUTCOME_LEARNING' && (
            <OutcomeLearningWorkspace />
          )}

          {currentLayer === 'CAPITAL_NETWORK' && (
            <GlobalCapitalNetworkWorkspace />
          )}

          {currentLayer === 'P2P_CLEARING' && (
            <CrossTenantClearingWorkspace />
          )}

          {currentLayer === 'ZK_TRADE_CLEARANCE' && (
            <ZkTaxTradeClearanceWorkspace />
          )}

          {currentLayer === 'RWA_REPO_MARKET' && (
            <RwaRepoMarketWorkspace />
          )}

          {currentLayer === 'MACRO_HEDGE_SYNTH' && (
            <MacroHedgeSynthesizerWorkspace />
          )}

          {currentLayer === 'CAPITAL_MA_OPTIMIZER' && (
            <CapitalStructureMaWorkspace />
          )}

          {currentLayer === 'WAR_ROOM' && (
            <CrisisWarRoomWorkspace />
          )}

          {currentLayer === 'SYNTHETIC_CENTRAL_BANK' && (
            <SyntheticCentralBankWorkspace />
          )}

          {currentLayer === 'ORBITAL_ESCROW' && (
            <OrbitalSatelliteEscrowWorkspace />
          )}

          {currentLayer === 'POST_QUANTUM_ENCLAVE' && (
            <PostQuantumEnclaveWorkspace />
          )}

          {currentLayer === 'FIDUCIARY_GOVERNANCE' && (
            <FiduciaryBoardGovernanceWorkspace />
          )}

          {currentLayer === 'COMPUTE_ENERGY_GRID' && (
            <ComputeEnergyGridWorkspace />
          )}

          {currentLayer === 'RELATIVISTIC_LIGHT_CONE' && (
            <RelativisticLightConeWorkspace />
          )}

          {currentLayer === 'GEOENGINEERING_DERIVATIVE' && (
            <GeoengineeringDerivativeWorkspace />
          )}

          {currentLayer === 'POST_HUMAN_ENTERPRISE' && (
            <PostHumanEnterpriseWorkspace />
          )}

          {currentLayer === 'BIOLOGICAL_NEUROMORPHIC_GRID' && (
            <BiologicalNeuromorphicGridWorkspace />
          )}

          {currentLayer === 'KARDASHEV_OMEGA_PROTOCOL' && (
            <KardashevOmegaProtocolWorkspace />
          )}

          {[
            'OMNI_TELEMETRY_BUS',
            'OMNI_CLEARING_MESH',
            'OMNI_MINERAL_TITLE',
            'OMNI_LEGAL_SYNTHESIS',
            'OMNI_POWER_GRID',
            'OMNI_CREDIT_MATRIX',
            'OMNI_ROBOTIC_LABOR',
            'OMNI_INTENT_TRANSLATION',
            'OMNI_QUANTUM_CITADEL',
            'OMNI_CIVILIZATION_ANCHOR'
          ].includes(currentLayer) && (
            <OmniAccessNexusWorkspace 
              initialLayer={currentLayer}
              onSelectLayer={setCurrentLayer}
            />
          )}

          {(currentLayer === 'LAYER_62_RD_TAX_CREDIT' || currentLayer === 'LAYER_62') && (
            <Layer62RdTaxCreditWorkspace />
          )}

          {(currentLayer === 'EXTENDED_LAYERS_WORKSPACE' || 
            (typeof currentLayer === 'string' && currentLayer.startsWith('LAYER_') && currentLayer !== 'LAYER_62_RD_TAX_CREDIT' && currentLayer !== 'LAYER_62')) && (
            <ExtendedMasterLayersWorkspace 
              currentLayer={currentLayer}
              onSelectLayer={setCurrentLayer}
            />
          )}
          </ErrorBoundary>
        </div>

        {/* Real-Time System Telemetry & Autonomous Event Stream */}
        <SystemTelemetryFeed
          currentLayer={currentLayer}
          onSelectLayer={setCurrentLayer}
          onOpenFullPodcast={() => setIsPodcastModalOpen(true)}
        />
      </main>

      {/* Layer Activity Heatmap Visualization in Footer */}
      <LayerActivityHeatmap
        currentLayer={currentLayer}
        onSelectLayer={setCurrentLayer}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-sm py-6 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-500">
        <div className="max-w-[1720px] w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-slate-800">ECONOS Sovereign Operating Core</span>
            <span>• Multi-Tenant Isolation Verified</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentLayer('CLIENT_ACQUISITION')}
              className="hover:text-emerald-700 flex items-center gap-1 transition text-emerald-800 font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Maps Scraper & AI Calls</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setIsSolutionsOpen(true)}
              className="hover:text-amber-600 flex items-center gap-1 transition text-slate-800 font-bold"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>10 Enterprise Solutions</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setIsRoadmapOpen(true)}
              className="hover:text-amber-600 flex items-center gap-1 transition text-amber-800 font-bold"
            >
              <Milestone className="w-3.5 h-3.5 text-amber-500" />
              <span>Implementation Roadmap ($10B Vision)</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="hover:text-amber-600 flex items-center gap-1 transition text-slate-700 font-medium"
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-500" />
              <span>Pricing & Plans</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setIsCommercialSuiteOpen(true)}
              className="hover:text-emerald-700 flex items-center gap-1 transition text-emerald-600 font-medium"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>24-Point Commercial Suite</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400">Gemini 3.8 Flash • Sovereign License</span>
          </div>
        </div>
      </footer>

      {/* 10 Enterprise Solutions & Problem Solver Modal */}
      <EnterpriseSolutionsModal
        isOpen={isSolutionsOpen}
        onClose={() => setIsSolutionsOpen(false)}
      />

      {/* Implementation Roadmap & Vision Architecture Modal */}
      <RoadmapMatrixModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        onOpenSolutions={() => setIsSolutionsOpen(true)}
      />

      {/* System Test Suite Modal */}
      <SystemTestSuiteModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />

      {/* Onboarding / Tenant Setup Modal */}
      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={handleCloseOnboarding}
      />

      {/* Pricing & Commercial Model Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onOpenAdminConfig={() => setIsAdminConfigOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Commercial Analytics View */}
      <CommercialAnalyticsView
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* Admin Pricing Configuration Modal */}
      <AdminPricingConfigModal
        isOpen={isAdminConfigOpen}
        onClose={() => setIsAdminConfigOpen(false)}
      />

      {/* 20-Point Commercial Verification Suite */}
      <CommercialTestSuiteModal
        isOpen={isCommercialSuiteOpen}
        onClose={() => setIsCommercialSuiteOpen(false)}
      />

      {/* Two-Way ECONOS Podcast & Reel Syndicate Studio Modal */}
      <EconosIlluminatePodcast
        isOpen={isPodcastModalOpen}
        onClose={() => setIsPodcastModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
