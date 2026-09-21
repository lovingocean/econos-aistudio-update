import {
  EsdrReserveAsset,
  CentralBankDiscountFacility,
  SatelliteCargoVoyage,
  PostQuantumCryptographicKey,
  EnclaveHostNode,
  FiduciaryBoardResolution,
  SovereignRegulatoryFiling,
  EnergyPpaContract,
  TokenizedComputeForward
} from '../types/econos';

// ==========================================
// Planetary Layer 22: Autonomous Synthetic Central Bank (E-SDR Basket)
// ==========================================
export const ESDR_RESERVE_BASKET: EsdrReserveAsset[] = [
  {
    id: 'res-us-treasuries',
    assetName: 'US Short-Duration Treasuries (4-Week Bills)',
    assetCode: 'UST-4W',
    category: 'SOVEREIGN_RWA',
    weightPct: 35.0,
    reserveValueUsd: 175000000,
    yieldAnnualPct: 5.28,
    custodianVenue: 'Bank of New York Mellon Tri-Party',
    auditVerificationMethod: 'ONCHAIN_PROOF_OF_RESERVE'
  },
  {
    id: 'res-physical-gold',
    assetName: 'Physical LBMA Good Delivery Allocated Gold',
    assetCode: 'XAU-LBMA',
    category: 'HARD_COMMODITY',
    weightPct: 20.0,
    reserveValueUsd: 100000000,
    yieldAnnualPct: 0.0,
    custodianVenue: 'Loomis International Vaults (Zurich Airport Freezone)',
    auditVerificationMethod: 'ISDA_TRIPARTY_VERIFIED'
  },
  {
    id: 'res-euro-bunds',
    assetName: 'German Bund Federal Bonds (AAA)',
    assetCode: 'BUND-10Y',
    category: 'SOVEREIGN_RWA',
    weightPct: 15.0,
    reserveValueUsd: 75000000,
    yieldAnnualPct: 2.45,
    custodianVenue: 'Euroclear Brussels Custody',
    auditVerificationMethod: 'ONCHAIN_PROOF_OF_RESERVE'
  },
  {
    id: 'res-singapore-bills',
    assetName: 'Monetary Authority of Singapore (MAS) Bills',
    assetCode: 'MAS-SDR',
    category: 'FIAT_RESERVE',
    weightPct: 15.0,
    reserveValueUsd: 75000000,
    yieldAnnualPct: 3.75,
    custodianVenue: 'DBS Bank Singapore Central Clearing',
    auditVerificationMethod: 'ONCHAIN_PROOF_OF_RESERVE'
  },
  {
    id: 'res-critical-lithium',
    assetName: 'Battery-Grade Lithium Carbonate & Copper Warrants',
    assetCode: 'LME-CU-LI',
    category: 'CRITICAL_METALS',
    weightPct: 15.0,
    reserveValueUsd: 75000000,
    yieldAnnualPct: 4.10,
    custodianVenue: 'London Metal Exchange (LME) Registered Depository (Rotterdam)',
    auditVerificationMethod: 'ISDA_TRIPARTY_VERIFIED'
  }
];

export const CENTRAL_BANK_DISCOUNT_FACILITIES: CentralBankDiscountFacility[] = [
  {
    id: 'cbank-fac-01',
    borrowerEntity: 'Apex European Semiconductor B.V.',
    creditLimitEsdr: 40000000,
    drawnBalanceEsdr: 14500000,
    benchmarkDiscountRatePct: 4.15,
    collateralPledgedUsd: 22000000,
    collateralRatioPct: 151.7,
    status: 'OPEN_LIQUID',
    maturityTermDays: 30
  },
  {
    id: 'cbank-fac-02',
    borrowerEntity: 'Quantum Logistics SG Pte',
    creditLimitEsdr: 25000000,
    drawnBalanceEsdr: 8200000,
    benchmarkDiscountRatePct: 4.15,
    collateralPledgedUsd: 12500000,
    collateralRatioPct: 152.4,
    status: 'OPEN_LIQUID',
    maturityTermDays: 60
  },
  {
    id: 'cbank-fac-03',
    borrowerEntity: 'Frontier Foundry Ireland Ltd',
    creditLimitEsdr: 15000000,
    drawnBalanceEsdr: 3100000,
    benchmarkDiscountRatePct: 4.15,
    collateralPledgedUsd: 5800000,
    collateralRatioPct: 187.1,
    status: 'OPEN_LIQUID',
    maturityTermDays: 14
  }
];

// ==========================================
// Planetary Layer 23: Planetary Physical Twin & Satellite IoT Escrow
// ==========================================
export const SATELLITE_CARGO_VOYAGES: SatelliteCargoVoyage[] = [
  {
    id: 'voyage-orbital-901',
    vesselName: 'Ever Apex Horizon (Post-Panamax Container)',
    imoNumber: 'IMO 9871234',
    flagState: 'Marshall Islands (MI)',
    cargoManifestDescription: '1,420 High-Purity Silicon Ingot & ASML Scanner Optic Modules',
    cargoValuationUsd: 42500000,
    escrowSmartContractAddress: '0x88f192b041a98e20984a1029e84019284019284a',
    originPort: 'Port of Kaohsiung (TW)',
    destinationPort: 'Port of Rotterdam (NL)',
    currentLat: 51.9851,
    currentLng: 4.1201,
    destinationGeofenceRadiusKm: 25.0,
    distanceToDestinationKm: 18.4,
    starlinkSignalQuality: 'OPTIMAL',
    tamperSealStatus: 'CRYPTOGRAPHICALLY_SEALED',
    escrowCondition: 'ARRIVAL_WITHIN_GEOFENCE',
    escrowStatus: 'RELEASED_AUTOMATICALLY'
  },
  {
    id: 'voyage-orbital-902',
    vesselName: 'Nordic Sovereign Titan (LNG Cryogenic Carrier)',
    imoNumber: 'IMO 9924510',
    flagState: 'Norway (NIS)',
    cargoManifestDescription: '174,000 m³ Ultra-Low Emission Liquid Methane for Data Center Baseload',
    cargoValuationUsd: 68000000,
    escrowSmartContractAddress: '0x33b194a0294e102948b19284019284019284019b',
    originPort: 'Hammerfest Arctic LNG (NO)',
    destinationPort: 'Zeebrugge Energy Hub (BE)',
    currentLat: 54.2104,
    currentLng: 3.4219,
    destinationGeofenceRadiusKm: 40.0,
    distanceToDestinationKm: 184.2,
    starlinkSignalQuality: 'OPTIMAL',
    tamperSealStatus: 'CRYPTOGRAPHICALLY_SEALED',
    escrowCondition: 'ARRIVAL_WITHIN_GEOFENCE',
    escrowStatus: 'LOCKED_IN_ORBITAL_ESCROW'
  },
  {
    id: 'voyage-orbital-903',
    vesselName: 'Pacific Vanguard (Heavy Autonomous Freighter)',
    imoNumber: 'IMO 9761928',
    flagState: 'Singapore (SG)',
    cargoManifestDescription: '2,800 Autonomous Mining Excavator Battery Packs',
    cargoValuationUsd: 28400000,
    escrowSmartContractAddress: '0x99c20184b291048b291048b291048b291048b29c',
    originPort: 'Busan New Port (KR)',
    destinationPort: 'Port of Long Beach (US)',
    currentLat: 33.7214,
    currentLng: -118.2612,
    destinationGeofenceRadiusKm: 15.0,
    distanceToDestinationKm: 4.8,
    starlinkSignalQuality: 'OPTIMAL',
    tamperSealStatus: 'CRYPTOGRAPHICALLY_SEALED',
    escrowCondition: 'CUSTOMS_RFID_CLEARED',
    escrowStatus: 'RELEASED_AUTOMATICALLY'
  }
];

// ==========================================
// Planetary Layer 24: Post-Quantum Cryptographic Enclave & Air-Gap Mesh
// ==========================================
export const POST_QUANTUM_KEYS: PostQuantumCryptographicKey[] = [
  {
    id: 'pqc-key-root-01',
    keyAlias: 'ECONOS Sovereign Treasury Root Key',
    algorithmStandard: 'ML-KEM-1024 (Crystals-Kyber)',
    nistSecurityLevel: 5,
    quantumBitSecurityEquivalent: 256,
    activeShards: 5,
    totalShardsThreshold: 3,
    hardwareEnclaveType: 'AMD_SEV_SNP',
    geographicDistribution: ['Zurich (CH)', 'Reykjavik (IS)', 'Singapore (SG)', 'St. John’s (AG)', 'Tokyo (JP)'],
    lastRotationTimestamp: '2026-09-15T00:00:00Z',
    status: 'POST_QUANTUM_SECURE'
  },
  {
    id: 'pqc-key-sig-02',
    keyAlias: 'Intercompany Autonomous Settlement Signer',
    algorithmStandard: 'ML-DSA-87 (Crystals-Dilithium)',
    nistSecurityLevel: 5,
    quantumBitSecurityEquivalent: 256,
    activeShards: 3,
    totalShardsThreshold: 2,
    hardwareEnclaveType: 'INTEL_TDX',
    geographicDistribution: ['Amsterdam (NL)', 'Dublin (IE)', 'Singapore (SG)'],
    lastRotationTimestamp: '2026-09-16T12:00:00Z',
    status: 'POST_QUANTUM_SECURE'
  },
  {
    id: 'pqc-key-hash-03',
    keyAlias: 'Planetary Audit Trail Immutable Hash Attestor',
    algorithmStandard: 'SPHINCS+-SHA256',
    nistSecurityLevel: 5,
    quantumBitSecurityEquivalent: 256,
    activeShards: 4,
    totalShardsThreshold: 3,
    hardwareEnclaveType: 'AWS_NITRO_ENCLAVE',
    geographicDistribution: ['Frankfurt (DE)', 'Stockholm (SE)', 'Virginia (US)'],
    lastRotationTimestamp: '2026-09-17T04:00:00Z',
    status: 'POST_QUANTUM_SECURE'
  }
];

export const ENCLAVE_HOST_NODES: EnclaveHostNode[] = [
  {
    id: 'node-ch-zurich',
    jurisdiction: 'Switzerland (Bunker Datacenter, Mount Saint Gotthard)',
    datacenterProvider: 'Swiss Fort Knox Secure Cloud',
    attestationStatus: 'REMOTE_ATTESTATION_VERIFIED',
    memoryEncryptionKeyId: '0xSEV-SNP-CH-882194',
    tamperResponseAction: 'AIR_GAP_ISOLATE',
    latencyMs: 12
  },
  {
    id: 'node-is-reykjavik',
    jurisdiction: 'Iceland (100% Geothermal Powered Enclave)',
    datacenterProvider: 'Verne Global Borealis',
    attestationStatus: 'REMOTE_ATTESTATION_VERIFIED',
    memoryEncryptionKeyId: '0xTDX-IS-771092',
    tamperResponseAction: 'ZEROIZE_VOLATILE_KEYS',
    latencyMs: 24
  },
  {
    id: 'node-sg-jurong',
    jurisdiction: 'Singapore (MAS Cloud Security Framework)',
    datacenterProvider: 'Equinix SG3 Confidential Vault',
    attestationStatus: 'REMOTE_ATTESTATION_VERIFIED',
    memoryEncryptionKeyId: '0xSEV-SNP-SG-440192',
    tamperResponseAction: 'AIR_GAP_ISOLATE',
    latencyMs: 8
  }
];

// ==========================================
// Planetary Layer 25: Autonomous Fiduciary AI Board & 190-Nation Compliance
// ==========================================
export const FIDUCIARY_BOARD_RESOLUTIONS: FiduciaryBoardResolution[] = [
  {
    id: 'res-board-2026-881',
    resolutionTitle: 'Authorization of $50M Autonomous E-SDR Discount Facility Liquidity Allocation',
    category: 'TREASURY_CAPITAL_DRAW',
    statutoryJurisdictionBasis: 'Delaware General Corporation Law (DGCL) §141(c)(2)',
    fiduciaryRiskScore: 12,
    autonomousVoteOutcome: 'PASSED_UNANIMOUS',
    boardAgentQuorum: 7,
    hashVerificationProof: '0x88e1024b910248e109248b192840192840192840',
    enactedAt: '2026-09-17T03:30:00Z',
    actionPayloadSummary: 'Permitted instant automated liquidity draw at 4.15% discount rate against pledged AAA Bunds.'
  },
  {
    id: 'res-board-2026-882',
    resolutionTitle: 'Autonomous Creation of Netherlands BV Special Purpose Vehicle for R&D IP Ringfencing',
    category: 'CROSS_BORDER_SPV_CREATION',
    statutoryJurisdictionBasis: 'Dutch Civil Code Book 2 (BW Art 2:175)',
    fiduciaryRiskScore: 18,
    autonomousVoteOutcome: 'PASSED_UNANIMOUS',
    boardAgentQuorum: 7,
    hashVerificationProof: '0x33f91048b192840192840192840192840192840a',
    enactedAt: '2026-09-17T04:15:00Z',
    actionPayloadSummary: 'Ringfences next-generation photonics patents with 9% Dutch Innovation Box tax treatment.'
  },
  {
    id: 'res-board-2026-883',
    resolutionTitle: 'Pre-Authorization of Synthetic M&A Tender Offer for Precision Photonics Corp ($78M EV)',
    category: 'MERGER_BID_AUTHORIZATION',
    statutoryJurisdictionBasis: 'SEC Rule 14d-1 / Delaware Revlon Standard Compliance Matrix',
    fiduciaryRiskScore: 24,
    autonomousVoteOutcome: 'PASSED_MAJORITY',
    boardAgentQuorum: 6,
    hashVerificationProof: '0x77b8192840192840192840192840192840192840',
    enactedAt: '2026-09-17T05:00:00Z',
    actionPayloadSummary: 'Conditioned on pro-forma accretion exceeding +14.5% and antitrust clearance index < 20.'
  }
];

export const SOVEREIGN_REGULATORY_FILINGS: SovereignRegulatoryFiling[] = [
  {
    id: 'filing-sec-8k',
    regulatoryAgency: 'US_SEC',
    filingType: 'FORM_8K_MATERIAL_EVENT',
    filingStatus: 'AUTO_FILED_CONFIRMED',
    auditTrailVerificationHash: '0xSEC-8K-2026-APEX-991204',
    duePeriod: 'Within 4 Business Days (Completed in 4.2 Seconds)',
    automatedCompilationLatencySec: 4.2
  },
  {
    id: 'filing-eu-csrd',
    regulatoryAgency: 'EU_ESMA',
    filingType: 'CSRD_ESG_SUSTAINABILITY',
    filingStatus: 'READY_FOR_SUBMISSION',
    auditTrailVerificationHash: '0xESMA-CSRD-2026-Q3-8819',
    duePeriod: 'Annual ESG Scope 1-3 Disclosures',
    automatedCompilationLatencySec: 8.5
  },
  {
    id: 'filing-sg-mas',
    regulatoryAgency: 'SG_MAS',
    filingType: 'MAS_NOTICE_637',
    filingStatus: 'AUTO_FILED_CONFIRMED',
    auditTrailVerificationHash: '0xMAS-637-TIER1-CAR-9021',
    duePeriod: 'Quarterly Risk-Weighted Capital Adequacy',
    automatedCompilationLatencySec: 3.1
  }
];

// ==========================================
// Planetary Layer 26: Compute FLOP & Energy Arbitrage Grid
// ==========================================
export const ENERGY_PPA_CONTRACTS: EnergyPpaContract[] = [
  {
    id: 'ppa-er-cot-01',
    facilityLocation: 'West Texas AI Supercluster (Permian Clean Grid)',
    gridInterconnect: 'ERCOT Grid (TX)',
    capacityMegawatts: 250,
    baseloadPpaPriceMwhUsd: 38.50,
    currentSpotLocationalPriceUsd: 64.20,
    renewableSourceMix: '100% NUCLEAR',
    hedgeStatus: 'LOCKED_FORWARD_HEDGE',
    annualEnergyCostSavingsUsd: 14200000
  },
  {
    id: 'ppa-nord-pool-02',
    facilityLocation: 'Luleå Hydro-Cooled Datacenter (Sweden)',
    gridInterconnect: 'Nord Pool SE1',
    capacityMegawatts: 180,
    baseloadPpaPriceMwhUsd: 29.80,
    currentSpotLocationalPriceUsd: 44.10,
    renewableSourceMix: 'GEOTHERMAL_HYDRO',
    hedgeStatus: 'LOCKED_FORWARD_HEDGE',
    annualEnergyCostSavingsUsd: 8900000
  },
  {
    id: 'ppa-pjm-midwest',
    facilityLocation: 'Ohio River Hyperscale Campus',
    gridInterconnect: 'PJM Interconnection (AEP Zone)',
    capacityMegawatts: 120,
    baseloadPpaPriceMwhUsd: 46.00,
    currentSpotLocationalPriceUsd: 78.50,
    renewableSourceMix: 'WIND_SOLAR_BATTERY',
    hedgeStatus: 'SPOT_ARBITRAGING',
    annualEnergyCostSavingsUsd: 6800000
  }
];

export const TOKENIZED_COMPUTE_FORWARDS: TokenizedComputeForward[] = [
  {
    id: 'fl-h200-q4',
    clusterDescriptor: '4,096x NVIDIA H200 SXM Cluster Pod A',
    acceleratorHardware: 'NVIDIA H200 SXM',
    flopsCapacityEaPetaflops: 18.2,
    allocatedHours: 2160, // 90 days continuous
    contractExecutionPricePerHourUsd: 3.15,
    currentSpotMarketRentRateUsd: 4.85,
    arbitrageYieldUsd: 3672000,
    deliveryQuarter: '2026-Q4',
    hedgeMode: 'INTERNAL_MODEL_TRAINING'
  },
  {
    id: 'fl-b200-q1',
    clusterDescriptor: '2,048x NVIDIA Blackwell B200 NVL72 Liquid-Cooled',
    acceleratorHardware: 'NVIDIA B200 NVL',
    flopsCapacityEaPetaflops: 45.0,
    allocatedHours: 4320, // 180 days
    contractExecutionPricePerHourUsd: 4.90,
    currentSpotMarketRentRateUsd: 7.80,
    arbitrageYieldUsd: 6264000,
    deliveryQuarter: '2027-Q1',
    hedgeMode: 'MARKET_YIELD_ARBITRAGE'
  },
  {
    id: 'fl-tpu-v5p',
    clusterDescriptor: '1,024x TPU v5p Pod Slices (Amsterdam AI Campus)',
    acceleratorHardware: 'TPU v5p Tensor Pod',
    flopsCapacityEaPetaflops: 12.5,
    allocatedHours: 1440,
    contractExecutionPricePerHourUsd: 2.45,
    currentSpotMarketRentRateUsd: 3.60,
    arbitrageYieldUsd: 1656000,
    deliveryQuarter: '2026-Q4',
    hedgeMode: 'INTERNAL_MODEL_TRAINING'
  }
];
