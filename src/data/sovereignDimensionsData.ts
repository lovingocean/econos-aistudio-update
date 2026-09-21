import {
  ZkTransferPricingProof,
  OecdPillarTwoJurisdiction,
  HsCodeCustomsTariff,
  TokenizedReceivable,
  IntradayRepoFacility,
  MacroHedgingPosition,
  GeopoliticalChokepoint,
  CapitalStructureProfile,
  DebtCovenantRule,
  SyntheticMaTarget
} from '../types/econos';

// ==========================================
// Dimension 1: ZK Tax & Cross-Border Trade
// ==========================================
export const INITIAL_ZK_PROOFS: ZkTransferPricingProof[] = [
  {
    id: 'zk-proof-8801',
    sourceEntity: 'Apex Robotics Corp (US Del.)',
    destinationEntity: 'Apex European Holdings B.V. (Netherlands)',
    transactionType: 'IP_ROYALTY',
    grossAmountUsd: 14250000,
    snarkCircuit: 'Groth16-BN254',
    zkProofHash: '0x3c99f8d0e512ba77e6914a72d3f848c1e8095c731054a86b51df3',
    armLengthMarginPct: 8.45,
    oecdCompliant: true,
    taxJurisdictionFrom: 'United States (IRS Code §482)',
    taxJurisdictionTo: 'Netherlands (APA 2024-B)',
    verifiedAt: '2026-09-17T05:15:00Z',
    status: 'PROVEN_COMPLIANT'
  },
  {
    id: 'zk-proof-8802',
    sourceEntity: 'Quantum Logistics SG Pte (Singapore)',
    destinationEntity: 'Apex Robotics Corp (US Del.)',
    transactionType: 'COMPONENT_SALES',
    grossAmountUsd: 8920000,
    snarkCircuit: 'Plonk-KZG',
    zkProofHash: '0x7e8b91a20d44cf321689ea209bc53920146f88235dc9019b882',
    armLengthMarginPct: 5.20,
    oecdCompliant: true,
    taxJurisdictionFrom: 'Singapore (IRAS Sec 34D)',
    taxJurisdictionTo: 'United States (CBP Port 2704)',
    verifiedAt: '2026-09-17T05:40:00Z',
    status: 'PROVEN_COMPLIANT'
  },
  {
    id: 'zk-proof-8803',
    sourceEntity: 'Frontier Foundry Ireland Ltd (Ireland)',
    destinationEntity: 'Apex European Holdings B.V. (Netherlands)',
    transactionType: 'MANAGEMENT_SERVICES',
    grossAmountUsd: 4150000,
    snarkCircuit: 'Groth16-BN254',
    zkProofHash: '0x1a8f9024c09d5e7144e0b1652781b1029c78201b5a19e27301c',
    armLengthMarginPct: 6.80,
    oecdCompliant: true,
    taxJurisdictionFrom: 'Ireland (TCA 1997 Sec 835A)',
    taxJurisdictionTo: 'Netherlands (Corporate Tax Act)',
    verifiedAt: '2026-09-17T06:01:00Z',
    status: 'PROVEN_COMPLIANT'
  },
  {
    id: 'zk-proof-8804',
    sourceEntity: 'Obsidian Energy Cayman Ltd (Cayman Islands)',
    destinationEntity: 'Apex Robotics Corp (US Del.)',
    transactionType: 'INTERCOMPANY_LOAN',
    grossAmountUsd: 22000000,
    snarkCircuit: 'Plonk-KZG',
    zkProofHash: '0x9d44f128c0b5e91738e4a9015c72e9014b22c7104a8b5e9331f',
    armLengthMarginPct: 4.15,
    oecdCompliant: true,
    taxJurisdictionFrom: 'Cayman Islands (TIA Guidance 2025)',
    taxJurisdictionTo: 'United States (Subpart F / GILTI Guard)',
    verifiedAt: '2026-09-17T06:05:00Z',
    status: 'PROVEN_COMPLIANT'
  }
];

export const PILLAR_TWO_JURISDICTIONS: OecdPillarTwoJurisdiction[] = [
  {
    jurisdiction: 'United States',
    countryCode: 'US',
    statutoryTaxRatePct: 21.0,
    effectiveTaxRatePct: 18.4,
    pillarTwoThresholdPct: 15,
    topUpTaxRequiredPct: 0.0,
    annualCoveredTaxesUsd: 14200000,
    safeHarbourStatus: 'FULL_COMPLIANCE'
  },
  {
    jurisdiction: 'Ireland (Dublin Entity)',
    countryCode: 'IE',
    statutoryTaxRatePct: 15.0,
    effectiveTaxRatePct: 15.2,
    pillarTwoThresholdPct: 15,
    topUpTaxRequiredPct: 0.0,
    annualCoveredTaxesUsd: 3850000,
    safeHarbourStatus: 'QUALIFIED_TRANSITIONAL'
  },
  {
    jurisdiction: 'Netherlands (Amsterdam)',
    countryCode: 'NL',
    statutoryTaxRatePct: 25.8,
    effectiveTaxRatePct: 21.6,
    pillarTwoThresholdPct: 15,
    topUpTaxRequiredPct: 0.0,
    annualCoveredTaxesUsd: 6100000,
    safeHarbourStatus: 'FULL_COMPLIANCE'
  },
  {
    jurisdiction: 'Singapore (Pioneer Status)',
    countryCode: 'SG',
    statutoryTaxRatePct: 17.0,
    effectiveTaxRatePct: 11.8,
    pillarTwoThresholdPct: 15,
    topUpTaxRequiredPct: 3.2, // 15% - 11.8%
    annualCoveredTaxesUsd: 1840000,
    safeHarbourStatus: 'TOP_UP_ACCRUED'
  },
  {
    jurisdiction: 'Switzerland (Zug Branch)',
    countryCode: 'CH',
    statutoryTaxRatePct: 14.6,
    effectiveTaxRatePct: 13.9,
    pillarTwoThresholdPct: 15,
    topUpTaxRequiredPct: 1.1,
    annualCoveredTaxesUsd: 980000,
    safeHarbourStatus: 'TOP_UP_ACCRUED'
  },
  {
    jurisdiction: 'Cayman Islands (Financing Vehicle)',
    countryCode: 'KY',
    statutoryTaxRatePct: 0.0,
    effectiveTaxRatePct: 0.0,
    pillarTwoThresholdPct: 15,
    topUpTaxRequiredPct: 15.0,
    annualCoveredTaxesUsd: 0,
    safeHarbourStatus: 'TOP_UP_ACCRUED'
  }
];

export const HS_CODE_TARIFFS: HsCodeCustomsTariff[] = [
  {
    id: 'hs-8479-50',
    hsCode: '8479.50.00',
    description: 'Industrial Autonomous Robotic Arms & Manipulators',
    originCountry: 'Japan (JP)',
    destinationCountry: 'United States (US)',
    standardTariffPct: 4.5,
    optimizedTreatyTariffPct: 0.0,
    applicableTreaty: 'US-Japan Digital & Critical Trade Pact',
    annualSavingsUsd: 485000,
    declarationStatus: 'AUTO_CLEARED'
  },
  {
    id: 'hs-8542-31',
    hsCode: '8542.31.00',
    description: 'Monolithic Integrated Circuits (Processors & Controllers)',
    originCountry: 'Taiwan (TW)',
    destinationCountry: 'United States (US)',
    standardTariffPct: 3.8,
    optimizedTreatyTariffPct: 0.0,
    applicableTreaty: 'Information Technology Agreement (ITA-II)',
    annualSavingsUsd: 890000,
    declarationStatus: 'AUTO_CLEARED'
  },
  {
    id: 'hs-8708-29',
    hsCode: '8708.29.90',
    description: 'Specialized Titanium Chassis Assemblies for Defense Autonomous Vehicles',
    originCountry: 'Germany (DE)',
    destinationCountry: 'United States (US)',
    standardTariffPct: 6.2,
    optimizedTreatyTariffPct: 1.2,
    applicableTreaty: 'EU-US Transatlantic Green Procurement Framework',
    annualSavingsUsd: 640000,
    declarationStatus: 'DOCS_MATCHED'
  }
];

// ==========================================
// Dimension 2: RWA Intra-Day Collateral & Repo
// ==========================================
export const INITIAL_TOKENIZED_RECEIVABLES: TokenizedReceivable[] = [
  {
    id: 'rwa-rec-001',
    invoiceId: 'INV-2026-APEX-9921',
    debtorName: 'Boeing Aerospace & Defense',
    debtorRating: 'AA',
    faceValueUsd: 5400000,
    maturityDate: '2026-11-15',
    tokenStandard: 'ERC-3643',
    tokenContractAddress: '0x88c42b1049281a742819e91048b284910248c891',
    annualYieldPct: 6.45,
    loanToValuePct: 88.0,
    availableCollateralBorrowUsd: 4752000,
    isPledged: true,
    pledgedToFacility: 'repo-fac-jpm'
  },
  {
    id: 'rwa-rec-002',
    invoiceId: 'INV-2026-APEX-9934',
    debtorName: 'Tesla Energy Megapack Division',
    debtorRating: 'A',
    faceValueUsd: 8250000,
    maturityDate: '2026-12-01',
    tokenStandard: 'CUSIP-ONCHAIN',
    tokenContractAddress: '0x491024b829e819b10428e91048b1928401928392',
    annualYieldPct: 6.80,
    loanToValuePct: 85.0,
    availableCollateralBorrowUsd: 7012500,
    isPledged: false
  },
  {
    id: 'rwa-rec-003',
    invoiceId: 'INV-2026-APEX-9948',
    debtorName: 'Siemens Industrial Automation AG',
    debtorRating: 'AAA',
    faceValueUsd: 3800000,
    maturityDate: '2026-10-30',
    tokenStandard: 'ERC-3643',
    tokenContractAddress: '0x10294b810294b819284019284019284019284019',
    annualYieldPct: 5.95,
    loanToValuePct: 92.0,
    availableCollateralBorrowUsd: 3496000,
    isPledged: true,
    pledgedToFacility: 'repo-fac-nyfed'
  },
  {
    id: 'rwa-rec-004',
    invoiceId: 'INV-2026-APEX-9972',
    debtorName: 'Lockheed Martin Space Systems',
    debtorRating: 'AA',
    faceValueUsd: 11500000,
    maturityDate: '2026-12-20',
    tokenStandard: 'CUSIP-ONCHAIN',
    tokenContractAddress: '0x77e9281049281b92019482019482019482019482',
    annualYieldPct: 6.25,
    loanToValuePct: 90.0,
    availableCollateralBorrowUsd: 10350000,
    isPledged: false
  }
];

export const INTRADAY_REPO_FACILITIES: IntradayRepoFacility[] = [
  {
    id: 'repo-fac-jpm',
    counterpartyName: 'J.P. Morgan Tri-Party Repo Desk',
    counterpartyType: 'TIER_1_TREASURY',
    facilityLimitUsd: 50000000,
    utilizedBorrowUsd: 18450000,
    sofrSpreadBps: 22,
    allInRatePct: 5.53, // SOFR 5.31% + 0.22%
    collateralType: 'TOKENIZED_RECEIVABLES',
    haircutPct: 8.0,
    settlementSpeed: 'INSTANT_SUB_SECOND',
    status: 'ACTIVE'
  },
  {
    id: 'repo-fac-nyfed',
    counterpartyName: 'Federal Reserve Fedwire Overnight Repo (FIMA)',
    counterpartyType: 'CENTRAL_CLEARING',
    facilityLimitUsd: 100000000,
    utilizedBorrowUsd: 35000000,
    sofrSpreadBps: 5,
    allInRatePct: 5.36,
    collateralType: 'US_TREASURY',
    haircutPct: 2.0,
    settlementSpeed: 'INSTANT_SUB_SECOND',
    status: 'ACTIVE'
  },
  {
    id: 'repo-fac-p2p',
    counterpartyName: 'Frontier Micro-Foundry & Helix Peer Syndicate',
    counterpartyType: 'P2P_PEER_CORP',
    facilityLimitUsd: 25000000,
    utilizedBorrowUsd: 6200000,
    sofrSpreadBps: 15,
    allInRatePct: 5.46,
    collateralType: 'INVESTMENT_GRADE_CP',
    haircutPct: 5.0,
    settlementSpeed: 'INSTANT_SUB_SECOND',
    status: 'ACTIVE'
  }
];

// ==========================================
// Dimension 3: Macro-Hedging & Geopolitics
// ==========================================
export const MACRO_HEDGING_POSITIONS: MacroHedgingPosition[] = [
  {
    id: 'pos-fx-eurusd',
    assetClass: 'FX',
    pairOrInstrument: 'EUR/USD Forward 90-Day',
    direction: 'SHORT_HEDGE',
    notionalUsd: 32000000,
    unhedgedExposureUsd: 35000000,
    hedgeRatioPct: 91.4,
    currentMtmPnlUsd: 284000,
    executionVenue: 'DIRECT_ISDA_SWAP',
    autoRebalanceDelta: true
  },
  {
    id: 'pos-fx-usdsgd',
    assetClass: 'FX',
    pairOrInstrument: 'USD/SGD Non-Deliverable Forward',
    direction: 'LONG_HEDGE',
    notionalUsd: 14500000,
    unhedgedExposureUsd: 15000000,
    hedgeRatioPct: 96.6,
    currentMtmPnlUsd: 92000,
    executionVenue: 'DECENTRALIZED_RFQ',
    autoRebalanceDelta: true
  },
  {
    id: 'pos-com-brent',
    assetClass: 'COMMODITY',
    pairOrInstrument: 'Brent Crude Oil Swap (Freight Fuel Cap)',
    direction: 'LONG_HEDGE',
    notionalUsd: 8200000,
    unhedgedExposureUsd: 10000000,
    hedgeRatioPct: 82.0,
    currentMtmPnlUsd: 412000,
    executionVenue: 'CME_CLEARING',
    autoRebalanceDelta: true
  },
  {
    id: 'pos-com-semi',
    assetClass: 'COMMODITY',
    pairOrInstrument: 'TSMC 3nm Advanced Wafer Capacity Forward',
    direction: 'LONG_HEDGE',
    notionalUsd: 24000000,
    unhedgedExposureUsd: 25000000,
    hedgeRatioPct: 96.0,
    currentMtmPnlUsd: 1140000,
    executionVenue: 'DIRECT_ISDA_SWAP',
    autoRebalanceDelta: false
  }
];

export const GEOPOLITICAL_CHOKEPOINTS: GeopoliticalChokepoint[] = [
  {
    id: 'choke-malacca',
    name: 'Strait of Malacca & Singapore',
    region: 'Southeast Asia / Indo-Pacific',
    transitRiskScore: 32,
    status: 'NOMINAL',
    typicalDailyTransitVolumeUsd: '$9.4B Enterprise Freight',
    averageDelayDays: 0.8,
    insurancePremiumSurchargePct: 0.15,
    alternativeRouteName: 'Sunda Strait / Lombok Passage',
    rerouteCostDeltaUsd: 145000,
    recommendedAction: 'Maintain standard transit routes; trigger spot bunker hedges if risk exceeds 50.'
  },
  {
    id: 'choke-bab',
    name: 'Bab-el-Mandeb & Red Sea Corridor',
    region: 'Middle East / Horn of Africa',
    transitRiskScore: 84,
    status: 'CRITICAL_BLOCKAGE',
    typicalDailyTransitVolumeUsd: '$3.8B Enterprise Freight',
    averageDelayDays: 14.5,
    insurancePremiumSurchargePct: 3.80,
    alternativeRouteName: 'Cape of Good Hope Circumnavigation',
    rerouteCostDeltaUsd: 480000,
    recommendedAction: 'Autonomous reroute active via Cape route. Fuel swaps locked at $78/bbl.'
  },
  {
    id: 'choke-panama',
    name: 'Panama Canal (Freshwater Drought Draft)',
    region: 'Central America',
    transitRiskScore: 58,
    status: 'ELEVATED_RISK',
    typicalDailyTransitVolumeUsd: '$2.1B Enterprise Freight',
    averageDelayDays: 6.2,
    insurancePremiumSurchargePct: 1.10,
    alternativeRouteName: 'US West Coast Rail Intermodal (Long Beach Landbridge)',
    rerouteCostDeltaUsd: 290000,
    recommendedAction: 'Shift 40% container volume to LA/Long Beach intermodal rail line.'
  },
  {
    id: 'choke-hormuz',
    name: 'Strait of Hormuz',
    region: 'Persian Gulf',
    transitRiskScore: 65,
    status: 'ELEVATED_RISK',
    typicalDailyTransitVolumeUsd: '$12.5B Energy & Chemicals',
    averageDelayDays: 3.4,
    insurancePremiumSurchargePct: 2.25,
    alternativeRouteName: 'Fujairah Overland Pipeline Terminal',
    rerouteCostDeltaUsd: 310000,
    recommendedAction: 'Pre-fund escrow in UAE dirhams; monitor naval escort advisories.'
  }
];

// ==========================================
// Dimension 4: Capital Structure & M&A
// ==========================================
export const CAPITAL_STRUCTURE_PROFILE: CapitalStructureProfile = {
  totalEnterpriseValueUsd: 485000000,
  totalDebtUsd: 120000000,
  totalEquityUsd: 365000000,
  costOfDebtAfterTaxPct: 4.85,
  costOfEquityPct: 8.95,
  currentWaccPct: 7.42,
  optimalWaccPct: 6.18,
  annualInterestSavingsPotentialUsd: 4100000,
  creditRating: 'A- (Stable Outlook)',
  interestCoverageRatio: 8.4, // EBITDA / Interest
  debtToEbitdaRatio: 2.25 // Max limit is 3.5x
};

export const DEBT_COVENANTS: DebtCovenantRule[] = [
  {
    id: 'cov-debt-ebitda',
    covenantName: 'Maximum Leverage Ratio (Gross Debt / EBITDA)',
    lenderFacility: 'Syndicated Term Loan A ($80M)',
    covenantType: 'FINANCIAL_RATIO',
    thresholdValue: 3.50,
    currentValue: 2.25,
    headroomPct: 35.7,
    status: 'SAFE',
    actionOnViolation: 'BLOCK_AUTONOMOUS_PAYMENTS'
  },
  {
    id: 'cov-interest-cover',
    covenantName: 'Minimum Interest Coverage Ratio (EBITDA / Interest)',
    lenderFacility: 'Revolving Credit Facility ($40M)',
    covenantType: 'FINANCIAL_RATIO',
    thresholdValue: 4.00,
    currentValue: 8.40,
    headroomPct: 110.0,
    status: 'SAFE',
    actionOnViolation: 'ALERT_CFO'
  },
  {
    id: 'cov-min-liquidity',
    covenantName: 'Minimum Unencumbered Liquid Reserves',
    lenderFacility: 'Institutional Note Indenture 2029',
    covenantType: 'FINANCIAL_RATIO',
    thresholdValue: 25000000, // $25M min cash
    currentValue: 48200000,
    headroomPct: 92.8,
    status: 'SAFE',
    actionOnViolation: 'FORCE_COLLATERAL_INJECTION'
  }
];

export const SYNTHETIC_MA_TARGETS: SyntheticMaTarget[] = [
  {
    id: 'ma-target-01',
    targetName: 'Precision Photonics Corp (Sensors & Lidar)',
    industry: 'Advanced Autonomous Hardware',
    enterpriseValueUsd: 78000000,
    ebitdaAnnualUsd: 11200000,
    acquisitionMultipleEvEbitda: 6.96,
    postMergerSynergyAnnualUsd: 4800000,
    proFormaAccretionPct: 14.8,
    combinedWaccImpactBps: -34, // Reduces WACC by 34 bps
    antitrustRiskScore: 18,
    dealReadinessScore: 92
  },
  {
    id: 'ma-target-02',
    targetName: 'Nordic Energy Grid Solutions (Denmark)',
    industry: 'High-Voltage Power & Battery Storage',
    enterpriseValueUsd: 125000000,
    ebitdaAnnualUsd: 16500000,
    acquisitionMultipleEvEbitda: 7.58,
    postMergerSynergyAnnualUsd: 7200000,
    proFormaAccretionPct: 18.2,
    combinedWaccImpactBps: -48,
    antitrustRiskScore: 24,
    dealReadinessScore: 86
  },
  {
    id: 'ma-target-03',
    targetName: 'Cybernetic Logistics AI (Germany)',
    industry: 'Robotic Warehouse Fulfillment OS',
    enterpriseValueUsd: 54000000,
    ebitdaAnnualUsd: 6800000,
    acquisitionMultipleEvEbitda: 7.94,
    postMergerSynergyAnnualUsd: 3600000,
    proFormaAccretionPct: 11.4,
    combinedWaccImpactBps: -22,
    antitrustRiskScore: 12,
    dealReadinessScore: 95
  }
];
