import React, { useState } from 'react';
import { 
  Eye, 
  Send, 
  Mountain, 
  Scale, 
  Zap, 
  ShieldAlert, 
  Truck, 
  Sparkles, 
  Lock, 
  RotateCcw,
  CheckCircle2,
  Activity,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Radio,
  FileCheck2,
  Anchor,
  Globe2,
  Flame,
  Binary
} from 'lucide-react';
import { 
  AppLayer,
  OmniTelemetryStreamRecord,
  OmniClearingGatewayRecord,
  OmniCrustTitleRecord,
  OmniLegalJurisdictionRecord,
  OmniBaseloadPowerRecord,
  OmniCreditMatrixRecord,
  OmniRoboticLaborRecord,
  OmniExecutiveDirectiveRecord,
  OmniQuantumCitadelRecord,
  OmniCivilizationEpochRecord
} from '../../types/econos';

interface OmniAccessNexusWorkspaceProps {
  initialLayer?: AppLayer;
  onSelectLayer?: (layer: AppLayer) => void;
}

export const OmniAccessNexusWorkspace: React.FC<OmniAccessNexusWorkspaceProps> = ({
  initialLayer,
  onSelectLayer
}) => {
  const [activeTab, setActiveTab] = useState<AppLayer>(
    initialLayer && [
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
    ].includes(initialLayer) 
      ? initialLayer 
      : 'OMNI_TELEMETRY_BUS'
  );

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationAlert, setSimulationAlert] = useState<string | null>(null);

  // 1. Telemetry State (L32)
  const [telemetryFeeds, setTelemetryFeeds] = useState<OmniTelemetryStreamRecord[]>([
    {
      id: 'FEED_SAR_001',
      feedType: 'OPTICAL_SAR_SATELLITE',
      location: 'Malacca Strait Container Chokepoint',
      samplingFrequencyHz: 120,
      uncompressedThroughputGbps: 18.4,
      anomalyConfidencePercent: 2.1,
      activeFeedStatus: 'STREAMING'
    },
    {
      id: 'FEED_AIS_002',
      feedType: 'AIS_MARITIME_CARGO',
      location: 'Rotterdam Europort Supertanker Terminal',
      samplingFrequencyHz: 60,
      uncompressedThroughputGbps: 6.2,
      anomalyConfidencePercent: 1.4,
      activeFeedStatus: 'STREAMING'
    },
    {
      id: 'FEED_PORT_003',
      feedType: 'PORT_GANTRY_LOGISTICS',
      location: 'Shanghai Yangshan Deep-Water Port',
      samplingFrequencyHz: 240,
      uncompressedThroughputGbps: 42.0,
      anomalyConfidencePercent: 0.8,
      activeFeedStatus: 'STREAMING'
    }
  ]);

  // 2. Sovereign Clearing (L33)
  const [clearingGateways] = useState<OmniClearingGatewayRecord[]>([
    {
      id: 'GW_FEDNOW_01',
      networkProtocol: 'FEDNOW_DIRECT',
      clearingLatencyMs: 45,
      volume24hUsd: 28400000000,
      dailyNettingCompressionRatio: '14.2x Compression',
      liquidityBufferUsd: 4500000000,
      status: 'HIGH_VOLUME'
    },
    {
      id: 'GW_SWIFT_02',
      networkProtocol: 'SWIFT_ISO20022_ATOMIC',
      clearingLatencyMs: 82,
      volume24hUsd: 42100000000,
      dailyNettingCompressionRatio: '18.9x Compression',
      liquidityBufferUsd: 7800000000,
      status: 'HIGH_VOLUME'
    },
    {
      id: 'GW_TARGET2_03',
      networkProtocol: 'TARGET2_REALTIME',
      clearingLatencyMs: 58,
      volume24hUsd: 19500000000,
      dailyNettingCompressionRatio: '12.4x Compression',
      liquidityBufferUsd: 3200000000,
      status: 'OPERATIONAL'
    }
  ]);

  // 3. Planetary Crust (L34)
  const [crustTitles] = useState<OmniCrustTitleRecord[]>([
    {
      id: 'TITLE_LITHIUM_01',
      resourceCategory: 'LITHIUM_BRINE_DEPOSIT',
      jurisdictionCadastre: 'Salar de Atacama Cadastral Block 4B',
      estimatedReserveTons: 4200000,
      tokenizedValuationUsd: 14800000000,
      royaltyStreamBps: 220,
      lienVerificationProof: '0x99a12c8b001948fc321d89'
    },
    {
      id: 'TITLE_RARE_EARTH_02',
      resourceCategory: 'RARE_EARTH_CARBONATITE',
      jurisdictionCadastre: 'Greenland Kvanefjeld Geological Tract',
      estimatedReserveTons: 11000000,
      tokenizedValuationUsd: 22400000000,
      royaltyStreamBps: 340,
      lienVerificationProof: '0x44c88910eb8201fa9900c2'
    },
    {
      id: 'TITLE_URANIUM_03',
      resourceCategory: 'URANIUM_CONCESSION',
      jurisdictionCadastre: 'Athabasca Basin McArthur Deep Sandstone',
      estimatedReserveTons: 185000,
      tokenizedValuationUsd: 9800000000,
      royaltyStreamBps: 180,
      lienVerificationProof: '0x33e091fa66b189201e77d8'
    }
  ]);

  // 4. Legal Synthesis (L35)
  const [legalJurisdictions] = useState<OmniLegalJurisdictionRecord[]>([
    {
      id: 'JUR_DELAWARE_01',
      sovereignJurisdiction: 'Delaware Statutory Trust Autonomous Registry',
      legalRegime: 'STATUTORY_COMMON_LAW',
      statutoryIngestionCoveragePct: 99.8,
      automatedFilingLatencySec: 1.2,
      activeDisputeResolutionRules: 'Delaware Chancery Fast-Track Protocol §3804',
      complianceConfidenceScore: 99.9
    },
    {
      id: 'JUR_SWISS_02',
      sovereignJurisdiction: 'Swiss Canton of Zug Algorithmic Verein',
      legalRegime: 'SWISS_VEREIN_AUTONOMOUS',
      statutoryIngestionCoveragePct: 99.4,
      automatedFilingLatencySec: 0.9,
      activeDisputeResolutionRules: 'Swiss Code of Obligations Autonomous Amendments',
      complianceConfidenceScore: 99.7
    },
    {
      id: 'JUR_ADGM_03',
      sovereignJurisdiction: 'Abu Dhabi Global Market Synthetic Freezone',
      legalRegime: 'SPECIAL_ECONOMIC_ZONE_DIFC',
      statutoryIngestionCoveragePct: 98.9,
      automatedFilingLatencySec: 1.5,
      activeDisputeResolutionRules: 'ADGM Common Law Digital Regulations 2026',
      complianceConfidenceScore: 99.5
    }
  ]);

  // 5. Baseload Power (L36)
  const [baseloadGrids] = useState<OmniBaseloadPowerRecord[]>([
    {
      id: 'GRID_SMR_01',
      facilityName: 'NuScale VOYGR-6 Small Modular Reactor Cluster',
      generationClass: 'SMR_ADVANCED_NUCLEAR',
      capacityMw: 462,
      currentCurtailmentPct: 0.0,
      marginalCostPerMwhUsd: 28.5,
      computeRedirectionReady: true
    },
    {
      id: 'GRID_HVDC_02',
      facilityName: 'Trans-Balkan & Adriatic HVDC 800kV Interconnector',
      generationClass: 'HVDC_INTERCONTINENTAL_INTERTIE',
      capacityMw: 3200,
      currentCurtailmentPct: 4.8,
      marginalCostPerMwhUsd: 19.2,
      computeRedirectionReady: true
    },
    {
      id: 'GRID_GEOTHERMAL_03',
      facilityName: 'Fervo Energy Super-Hot Enhanced Geothermal Array',
      generationClass: 'ULTRA_DEEP_GEOTHERMAL',
      capacityMw: 850,
      currentCurtailmentPct: 0.2,
      marginalCostPerMwhUsd: 34.0,
      computeRedirectionReady: true
    }
  ]);

  // 6. Credit Matrix (L37)
  const [creditExposures] = useState<OmniCreditMatrixRecord[]>([
    {
      id: 'CREDIT_01',
      obligorEntity: 'Trans-Pacific Petrochemical Conglomerate',
      industrySector: 'Refining & Energy Infrastructure',
      totalDebtExposureUsd: 2850000000,
      bayesianDefaultProbability90d: 0.04, // 4 bps
      liquidityRunwayDays: 480,
      automatedHedgeState: 'FULLY_COLLATERALIZED'
    },
    {
      id: 'CREDIT_02',
      obligorEntity: 'Nordic Clean Hydrogen Transport SPV',
      industrySector: 'Maritime Clean Fuel',
      totalDebtExposureUsd: 1420000000,
      bayesianDefaultProbability90d: 0.18,
      liquidityRunwayDays: 290,
      automatedHedgeState: 'DYNAMICALLY_SHORTED'
    },
    {
      id: 'CREDIT_03',
      obligorEntity: 'Global Titanium & Aerospace Alloy Syndicate',
      industrySector: 'Strategic Defense Metallurgy',
      totalDebtExposureUsd: 3400000000,
      bayesianDefaultProbability90d: 0.02,
      liquidityRunwayDays: 720,
      automatedHedgeState: 'FULLY_COLLATERALIZED'
    }
  ]);

  // 7. Robotic Labor (L38)
  const [roboticSwarms] = useState<OmniRoboticLaborRecord[]>([
    {
      id: 'FLEET_PILBARA_01',
      fleetIdentifier: 'Pilbara Autonomous Heavy Iron Hauler Swarm 09',
      hardwareClass: 'AUTONOMOUS_HAUL_TRUCK',
      operatorWalletAddress: '0x88f219001b...984c',
      unitsInSwarm: 140,
      settlementRatePerTaskUsd: 42.5,
      dailyTasksCompleted: 3840,
      status: 'ACTIVE_HAUL'
    },
    {
      id: 'FLEET_PORT_02',
      fleetIdentifier: 'Rotterdam Automated Straddle Carrier Battery Fleet',
      hardwareClass: 'CONTAINER_PORT_STRADDLE',
      operatorWalletAddress: '0x33c77192aa...4401',
      unitsInSwarm: 86,
      settlementRatePerTaskUsd: 18.0,
      dailyTasksCompleted: 9420,
      status: 'ACTIVE_HAUL'
    }
  ]);

  // 8. Executive Directives (L39)
  const [directives, setDirectives] = useState<OmniExecutiveDirectiveRecord[]>([
    {
      id: 'DIR_SUPPLY_01',
      mandateTitle: 'Hedge Pan-Asian Semiconductor Logistics & Secure Rare Earth Floor',
      naturalLanguageIntent: 'Acquire 60-day supply of Dysprosium and Neodymium with 100% price certainty while maintaining cash yield > 4.5%.',
      translatedConstraintsCount: 14,
      executionReadinessScore: 98.4,
      downstreamSmartContractsDispatched: 6,
      status: 'SYNTHESIZED_EXECUTING'
    },
    {
      id: 'DIR_ENERGY_02',
      mandateTitle: 'Dynamic Nuclear Basal Arbitrage in PJM Interconnection',
      naturalLanguageIntent: 'Arbitrage night-time SMR curtailment into high-density ZK-proof generation when wholesale power drops below $22/MWh.',
      translatedConstraintsCount: 9,
      executionReadinessScore: 99.1,
      downstreamSmartContractsDispatched: 3,
      status: 'SYNTHESIZED_EXECUTING'
    }
  ]);

  // 9. Quantum Citadel (L40)
  const [quantumCitadels] = useState<OmniQuantumCitadelRecord[]>([
    {
      id: 'CITADEL_01_ZURICH',
      enclaveNode: 'Zurich Post-Quantum Vault (Kyber-1024 Enclave)',
      cryptographicStandard: 'CRYSTALS_KYBER_1024',
      zeroKnowledgeProofLatencyMs: 42,
      quantumAttackResistanceYears: 50,
      keysUnderSequestration: 142000,
      auditState: 'PROVEN_SECURE'
    },
    {
      id: 'CITADEL_02_SINGAPORE',
      enclaveNode: 'Singapore Marina Bay Sovereign Lattice Enclave',
      cryptographicStandard: 'SPHINCS_PLUS_HASH_SIG',
      zeroKnowledgeProofLatencyMs: 68,
      quantumAttackResistanceYears: 75,
      keysUnderSequestration: 98000,
      auditState: 'PROVEN_SECURE'
    }
  ]);

  // 10. Civilization Epoch (L41)
  const [civilizationEpoch] = useState<OmniCivilizationEpochRecord>({
    id: 'EPOCH_2026_OMEGA_01',
    epochDesignation: 'Kardashev-0.8 Civilizational Baseline Epoch',
    globalWealthAnchorPeg: 'CALORIC_ENERGY_JOULES',
    immutableStateHash: '0x8821fa00bc1920038914ba99238e01fa284190c',
    deepVaultSynchronizationState: 'SVALBARD_ATACAMA_LUNAR_SYNCED',
    debtJubileeReadiness: true,
    recoveryTtlSeconds: 3.4
  });

  const handleTriggerConvergencePulse = () => {
    setIsSimulating(true);
    setSimulationAlert('Initiating Full Omni-Access Convergence Pulse across all 10 dimensions...');

    setTimeout(() => {
      setTelemetryFeeds(prev => prev.map(f => ({
        ...f,
        samplingFrequencyHz: f.samplingFrequencyHz * 1.5,
        anomalyConfidencePercent: Math.max(0.1, f.anomalyConfidencePercent * 0.8)
      })));

      setDirectives(prev => [
        {
          id: `DIR_CONVERGENCE_${Date.now().toString().slice(-4)}`,
          mandateTitle: 'Instant Multilateral Netting & Physical SAR Cargo Validation',
          naturalLanguageIntent: 'Synchronize 14,200 maritime AIS telemetry points with $90B daily FedNow & SWIFT settlement batches.',
          translatedConstraintsCount: 22,
          executionReadinessScore: 99.8,
          downstreamSmartContractsDispatched: 11,
          status: 'SYNTHESIZED_EXECUTING'
        },
        ...prev
      ]);

      setIsSimulating(false);
      setSimulationAlert('CONVERGENCE PULSE COMPLETE: All 10 Omni-Access Layers synchronized. Zero information lag between physical reality, legal charters, and settlement rails.');
    }, 2000);
  };

  const tabs: { id: AppLayer; label: string; num: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'OMNI_TELEMETRY_BUS', label: 'Telemetry Bus', num: '32', icon: Eye },
    { id: 'OMNI_CLEARING_MESH', label: 'Sovereign Clearing', num: '33', icon: Send },
    { id: 'OMNI_MINERAL_TITLE', label: 'Crust & Cadastre', num: '34', icon: Mountain },
    { id: 'OMNI_LEGAL_SYNTHESIS', label: '195-Nation Law', num: '35', icon: Scale },
    { id: 'OMNI_POWER_GRID', label: 'Baseload Grid', num: '36', icon: Zap },
    { id: 'OMNI_CREDIT_MATRIX', label: 'Credit Matrix', num: '37', icon: ShieldAlert },
    { id: 'OMNI_ROBOTIC_LABOR', label: 'Robotic Labor', num: '38', icon: Truck },
    { id: 'OMNI_INTENT_TRANSLATION', label: 'Thought to Action', num: '39', icon: Sparkles },
    { id: 'OMNI_QUANTUM_CITADEL', label: 'Quantum Citadel', num: '40', icon: Lock },
    { id: 'OMNI_CIVILIZATION_ANCHOR', label: 'Civilization Epoch', num: '41', icon: RotateCcw }
  ];

  return (
    <div className="space-y-6">
      {/* Omni-Access Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-indigo-900/60 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Tier 6 • Layers 32–41
              </span>
              <span className="text-xs font-mono text-slate-400">Omni-Access Planetary Convergence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              The Omni-Access Singularity & Global Control Nexus
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              10 omni-dimensional access layers unifying live planetary radar, global central bank clearing, subsurface mineral wealth, autonomous legal charters, baseload power grids, machine labor, and post-quantum sovereignty.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerConvergencePulse}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Radio className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Pulsing Grid...' : 'Trigger Convergence Pulse'}</span>
            </button>
          </div>
        </div>

        {/* Live Notification */}
        {simulationAlert && (
          <div className="mt-4 p-3 rounded-xl bg-amber-950/60 border border-amber-600/60 text-xs font-mono text-amber-200 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{simulationAlert}</span>
          </div>
        )}

        {/* Core Omni KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-indigo-900/40 font-mono text-xs">
          <div>
            <div className="text-slate-400">Total Systemic Reach</div>
            <div className="text-lg font-bold text-white mt-0.5">10 Omni Layers Live</div>
          </div>
          <div>
            <div className="text-slate-400">24h Netting Volume</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">$90.0B Instant Clearing</div>
          </div>
          <div>
            <div className="text-slate-400">Tokenized Crust Assets</div>
            <div className="text-lg font-bold text-amber-300 mt-0.5">$47.0B Cadastral Title</div>
          </div>
          <div>
            <div className="text-slate-400">Quantum Resilience</div>
            <div className="text-lg font-bold text-cyan-400 mt-0.5">50+ Yrs Kyber-1024</div>
          </div>
        </div>
      </div>

      {/* 10-Layer Tab Selector */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (onSelectLayer) onSelectLayer(tab.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  L{tab.num}
                </span>
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content by Active Tab */}
      {/* 1. L32: Telemetry & Earth Sensory Bus */}
      {activeTab === 'OMNI_TELEMETRY_BUS' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 32: Universal Telemetry & Earth Sensory Bus</h2>
                <p className="text-xs text-slate-500 font-mono">Real-time SAR satellites, AIS maritime beacons & container chokepoints</p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Zero Physical Asymmetry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {telemetryFeeds.map(feed => (
              <div key={feed.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-indigo-600">{(feed.feedType || '').replace(/_/g, ' ')}</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{feed.location}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                    {feed.activeFeedStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                  <div>
                    <div className="text-slate-400 text-[10px]">Sampling Rate</div>
                    <div className="font-bold text-slate-900">{feed.samplingFrequencyHz} Hz</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Throughput</div>
                    <div className="font-bold text-indigo-600">{feed.uncompressedThroughputGbps} Gbps</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-slate-400 text-[10px]">Anomaly Detection Index</div>
                    <div className="font-bold text-emerald-600">{feed.anomalyConfidencePercent}% (Nominal)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. L33: Sovereign Clearing & Liquidity Mesh */}
      {activeTab === 'OMNI_CLEARING_MESH' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 33: Omnichannel Sovereign Clearing & Liquidity Mesh</h2>
                <p className="text-xs text-slate-500 font-mono">Direct atomic clearing into FedNow, SWIFT ISO20022, TARGET2 & CIPS</p>
              </div>
            </div>
            <span className="text-xs font-mono text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              Multilateral Netting Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clearingGateways.map(gw => (
              <div key={gw.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600">{(gw.networkProtocol || '').replace(/_/g, ' ')}</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">${(gw.volume24hUsd / 1e9).toFixed(1)}B / 24h</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                    {gw.clearingLatencyMs}ms Latency
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                  <div>
                    <div className="text-slate-400 text-[10px]">Netting Ratio</div>
                    <div className="font-bold text-slate-900">{gw.dailyNettingCompressionRatio}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Standby Buffer</div>
                    <div className="font-bold text-emerald-700">${(gw.liquidityBufferUsd / 1e9).toFixed(1)}B</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. L34: Planetary Crust & Subsurface Cadastre */}
      {activeTab === 'OMNI_MINERAL_TITLE' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="w-5 h-5 text-amber-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 34: Planetary Crust & Subsurface Cadastre</h2>
                <p className="text-xs text-slate-500 font-mono">Cryptographic title to lithium brines, rare earths, aquifers & uranium deposits</p>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              $47.0B Ingestion
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {crustTitles.map(title => (
              <div key={title.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-700">{(title.resourceCategory || '').replace(/_/g, ' ')}</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{title.jurisdictionCadastre}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900">
                    +{title.royaltyStreamBps} bps Royalty
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                  <div>
                    <div className="text-slate-400 text-[10px]">Estimated Reserves</div>
                    <div className="font-bold text-slate-900">{title.estimatedReserveTons.toLocaleString()} Tons</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Tokenized Value</div>
                    <div className="font-bold text-emerald-600">${(title.tokenizedValuationUsd / 1e9).toFixed(1)}B USD</div>
                  </div>
                  <div className="col-span-2 text-[10px] text-slate-400 truncate" title={title.lienVerificationProof}>
                    Lien ZK-Proof: {title.lienVerificationProof}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. L35: 195-Nation Statutory Legal Engine */}
      {activeTab === 'OMNI_LEGAL_SYNTHESIS' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 35: Global Statutory & Jurisdiction Synthesis Engine</h2>
                <p className="text-xs text-slate-500 font-mono">Real-time statutory code ingestion, corporate charters & sub-second arbitration</p>
              </div>
            </div>
            <span className="text-xs font-mono text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              195 Sovereignties Synthesized
            </span>
          </div>

          <div className="space-y-3">
            {legalJurisdictions.map(jur => (
              <div key={jur.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{jur.sovereignJurisdiction}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                      {(jur.legalRegime || '').replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    Rules: {jur.activeDisputeResolutionRules}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right font-mono text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Filing Latency</div>
                    <div className="font-bold text-slate-900">{jur.automatedFilingLatencySec}s</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Coverage</div>
                    <div className="font-bold text-emerald-600">{jur.statutoryIngestionCoveragePct}%</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Confidence</div>
                    <div className="font-bold text-purple-600">{jur.complianceConfidenceScore}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. L36: High-Voltage Baseload Energy Grid */}
      {activeTab === 'OMNI_POWER_GRID' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 36: High-Voltage Electrodynamic & Baseload Energy Grid</h2>
                <p className="text-xs text-slate-500 font-mono">SMR advanced nuclear, HVDC lines & ultra-deep geothermal compute diversion</p>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              4,512 MW Baseload
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {baseloadGrids.map(grid => (
              <div key={grid.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-600">{(grid.generationClass || '').replace(/_/g, ' ')}</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{grid.facilityName}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                    {grid.capacityMw} MW
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                  <div>
                    <div className="text-slate-400 text-[10px]">Marginal Cost</div>
                    <div className="font-bold text-slate-900">${grid.marginalCostPerMwhUsd} / MWh</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Curtailment</div>
                    <div className="font-bold text-emerald-600">{grid.currentCurtailmentPct}%</div>
                  </div>
                  <div className="col-span-2 text-xs font-bold text-indigo-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Compute Redirection Ready</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. L37: Omniscient Counterparty Credit Matrix */}
      {activeTab === 'OMNI_CREDIT_MATRIX' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 37: Omniscient Counterparty Credit & Default Matrix</h2>
                <p className="text-xs text-slate-500 font-mono">Pre-cognitive 90-day default detection & automated dynamic balance sheet hedging</p>
              </div>
            </div>
            <span className="text-xs font-mono text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              $7.67B Under Watch
            </span>
          </div>

          <div className="space-y-3">
            {creditExposures.map(credit => (
              <div key={credit.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{credit.obligorEntity}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                      {credit.industrySector}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    Total Exposure: ${(credit.totalDebtExposureUsd / 1e9).toFixed(2)}B USD • Runway: {credit.liquidityRunwayDays} days
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right font-mono text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Default Risk (90d)</div>
                    <div className={`font-bold ${credit.bayesianDefaultProbability90d > 0.1 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {(credit.bayesianDefaultProbability90d * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="px-2 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {(credit.automatedHedgeState || '').replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. L38: Autonomous Robotic Labor Rails */}
      {activeTab === 'OMNI_ROBOTIC_LABOR' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 38: Autonomous Machine-to-Machine Labor Settlement</h2>
                <p className="text-xs text-slate-500 font-mono">Autonomous heavy haulers, container carriers & robotic swarm wallets</p>
              </div>
            </div>
            <span className="text-xs font-mono text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              13,260 Micro-Tasks / Day
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roboticSwarms.map(swarm => (
              <div key={swarm.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-600">{(swarm.hardwareClass || '').replace(/_/g, ' ')}</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{swarm.fleetIdentifier}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                    {swarm.unitsInSwarm} Units Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                  <div>
                    <div className="text-slate-400 text-[10px]">Settlement / Task</div>
                    <div className="font-bold text-slate-900">${swarm.settlementRatePerTaskUsd} USD</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Daily Completed</div>
                    <div className="font-bold text-emerald-600">{swarm.dailyTasksCompleted.toLocaleString()} Tasks</div>
                  </div>
                  <div className="col-span-2 text-[10px] text-slate-400">
                    Wallet: {swarm.operatorWalletAddress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. L39: Thought-to-Execution Executive Intent */}
      {activeTab === 'OMNI_INTENT_TRANSLATION' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 39: Direct Semantic Intent & Executive Translation Mesh</h2>
                <p className="text-xs text-slate-500 font-mono">Translating natural language mandates into mathematically constrained smart contracts</p>
              </div>
            </div>
            <span className="text-xs font-mono text-indigo-700 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              Zero Coding Required
            </span>
          </div>

          <div className="space-y-3">
            {directives.map(dir => (
              <div key={dir.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition space-y-2">
                <div className="flex items-start justify-between">
                  <div className="font-bold text-slate-900 text-sm">{dir.mandateTitle}</div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800">
                    {(dir.status || '').replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg font-mono">
                  &ldquo;{dir.naturalLanguageIntent}&rdquo;
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                  <span>Constraints: {dir.translatedConstraintsCount}</span>
                  <span>•</span>
                  <span>Readiness: {dir.executionReadinessScore}%</span>
                  <span>•</span>
                  <span className="text-indigo-600 font-bold">{dir.downstreamSmartContractsDispatched} Smart Contracts Dispatched</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. L40: Post-Quantum Cryptographic Citadel */}
      {activeTab === 'OMNI_QUANTUM_CITADEL' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 40: Post-Quantum Cryptographic Citadel & Privacy Sentry</h2>
                <p className="text-xs text-slate-500 font-mono">Lattice cryptography (Kyber-1024, SPHINCS+) protecting all institutional secrets</p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-700 font-bold bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
              50+ Year Immunity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quantumCitadels.map(citadel => (
              <div key={citadel.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-600">{citadel.cryptographicStandard}</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{citadel.enclaveNode}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                    {(citadel.auditState || '').replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                  <div>
                    <div className="text-slate-400 text-[10px]">Proof Latency</div>
                    <div className="font-bold text-slate-900">{citadel.zeroKnowledgeProofLatencyMs} ms</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Quantum Defense</div>
                    <div className="font-bold text-cyan-600">{citadel.quantumAttackResistanceYears} Years</div>
                  </div>
                  <div className="col-span-2 text-xs text-slate-600">
                    Active MPC Keys in Vault: <span className="font-bold text-slate-900">{citadel.keysUnderSequestration.toLocaleString()} Keys</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. L41: Civilizational Epoch Continuity Core */}
      {activeTab === 'OMNI_CIVILIZATION_ANCHOR' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900 font-mono">Layer 41: The Civilizational Epoch Continuity Core</h2>
                <p className="text-xs text-slate-500 font-mono">Subterranean sapphire quartz memory & caloric energy reboot anchors</p>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              3.4s Reboot Speed
            </span>
          </div>

          <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-900">{civilizationEpoch.epochDesignation}</div>
                <div className="text-xs text-slate-500">Synchronization: {(civilizationEpoch.deepVaultSynchronizationState || '').replace(/_/g, ' ')}</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-200 text-amber-950 text-xs font-bold">
                Jubilee Armed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-amber-200/80">
              <div>
                <div className="text-slate-400 text-[10px]">Anchor Standard</div>
                <div className="font-bold text-slate-900">{(civilizationEpoch.globalWealthAnchorPeg || '').replace(/_/g, ' ')}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px]">Reboot Latency</div>
                <div className="font-bold text-emerald-700">{civilizationEpoch.recoveryTtlSeconds} Seconds</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px]">State Hash</div>
                <div className="font-bold text-slate-800 truncate" title={civilizationEpoch.immutableStateHash}>
                  {civilizationEpoch.immutableStateHash.slice(0, 14)}...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
