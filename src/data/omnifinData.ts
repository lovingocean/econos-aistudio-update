import {
  OmnifinUniversalAsset,
  AutonomousFinancialAgent,
  CausalEventNode,
  MarketIntegrityAlert,
  ProofCarryingTransaction,
  NettingObligation,
  CounterfactualSimulationResult
} from '../types/omnifin';

export const INITIAL_OMNIFIN_ASSETS: OmnifinUniversalAsset[] = [
  {
    id: 'asset-btc-01',
    symbol: 'BTC-INST',
    name: 'Bitcoin Sovereign Collateral Enclave',
    assetClass: 'CRYPTO',
    issuer: 'Decentralized / MPC Enclave',
    jurisdiction: 'Global Neutral',
    currentPrice: 94820.00,
    change24h: 3.42,
    liquidityUsd: 1420000000,
    marketDepthUsd: 480000000,
    collateralHaircutPct: 15.0,
    riskScore: 24,
    ownershipConcentrationPct: 8.2,
    contractPermissions: {
      isUpgradable: false,
      hasAdminPause: false,
      hasMintAuthority: false,
      isMpcGuarded: true
    },
    provenanceProofHash: '0x8f73a9e201bba097f481a5c31e98d92305a',
    settlementRails: ['Bitcoin Core', 'Lightning Mesh', 'ZK-Rollup Sovereign']
  },
  {
    id: 'asset-usdo-02',
    symbol: 'USD-O',
    name: 'Omnifin Sovereign Settlement Stablecoin',
    assetClass: 'STABLECOIN',
    issuer: 'Omnifin Global Reserve Trust',
    jurisdiction: 'Delaware / Switzerland Dual',
    currentPrice: 1.0002,
    change24h: 0.01,
    liquidityUsd: 4850000000,
    marketDepthUsd: 1250000000,
    collateralHaircutPct: 0.5,
    riskScore: 6,
    ownershipConcentrationPct: 4.1,
    contractPermissions: {
      isUpgradable: true,
      hasAdminPause: true,
      hasMintAuthority: true,
      isMpcGuarded: true
    },
    provenanceProofHash: '0x33b1e779a9cd88102ff934bca81920042a',
    settlementRails: ['Fedwire RTGS', 'Ethereum ZK', 'Solana Speed Rail']
  },
  {
    id: 'asset-ust3m-03',
    symbol: 'UST-3M',
    name: 'Tokenized US Treasury Bills 3-Month',
    assetClass: 'BOND',
    issuer: 'US Department of the Treasury (Custodian BNY Mellon)',
    jurisdiction: 'United States',
    currentPrice: 98.78,
    change24h: 0.04,
    liquidityUsd: 8900000000,
    marketDepthUsd: 3200000000,
    collateralHaircutPct: 1.2,
    riskScore: 4,
    ownershipConcentrationPct: 2.3,
    contractPermissions: {
      isUpgradable: true,
      hasAdminPause: false,
      hasMintAuthority: false,
      isMpcGuarded: true
    },
    provenanceProofHash: '0x9910ac7418290ecca71b56209418205739',
    settlementRails: ['Depository Trust & Clearing Corp (DTCC)', 'Omnifin Clear Rail']
  },
  {
    id: 'asset-nvda-04',
    symbol: 'NVDA-SYNTH',
    name: 'NVIDIA Enterprise Compute Synthetic Equity',
    assetClass: 'EQUITY',
    issuer: 'Omnifin Capital Synthetics LLC',
    jurisdiction: 'Cayman Islands / New York',
    currentPrice: 142.50,
    change24h: 4.15,
    liquidityUsd: 650000000,
    marketDepthUsd: 180000000,
    collateralHaircutPct: 18.5,
    riskScore: 31,
    ownershipConcentrationPct: 14.8,
    contractPermissions: {
      isUpgradable: false,
      hasAdminPause: false,
      hasMintAuthority: false,
      isMpcGuarded: true
    },
    provenanceProofHash: '0x12bbca8892019ee27400195728a0194857',
    settlementRails: ['NASDAQ Broker Net', 'Omnifin P2P Clearing']
  },
  {
    id: 'asset-gold-05',
    symbol: 'XAU-VAULT',
    name: 'Allocated London Good Delivery Gold Bar Deed',
    assetClass: 'COMMODITY',
    issuer: 'Zurich Vault Enclave SA',
    jurisdiction: 'Switzerland',
    currentPrice: 2742.80,
    change24h: 0.85,
    liquidityUsd: 3100000000,
    marketDepthUsd: 920000000,
    collateralHaircutPct: 5.0,
    riskScore: 12,
    ownershipConcentrationPct: 6.7,
    contractPermissions: {
      isUpgradable: false,
      hasAdminPause: false,
      hasMintAuthority: false,
      isMpcGuarded: true
    },
    provenanceProofHash: '0x44fa71109927bca1880491823750193856',
    settlementRails: ['LBMA Physical Vault Transfer', 'Omnifin Cross-Border Net']
  },
  {
    id: 'asset-rwa-port-06',
    symbol: 'PORT-INV-88',
    name: 'Singapore Deepwater Port Terminal Accounts Receivable',
    assetClass: 'INVOICE',
    issuer: 'Pacific Rim Trade Logistics Ltd',
    jurisdiction: 'Singapore',
    currentPrice: 100.00,
    change24h: 0.00,
    liquidityUsd: 84000000,
    marketDepthUsd: 42000000,
    collateralHaircutPct: 8.0,
    riskScore: 19,
    ownershipConcentrationPct: 22.0,
    contractPermissions: {
      isUpgradable: false,
      hasAdminPause: true,
      hasMintAuthority: false,
      isMpcGuarded: true
    },
    provenanceProofHash: '0x770194ba58204857182903487192837491',
    settlementRails: ['Monetary Authority of Singapore (MAS PayNow)', 'Omnifin RWA Engine']
  }
];

export const INITIAL_AUTONOMOUS_AGENTS: AutonomousFinancialAgent[] = [
  {
    id: 'agent-01',
    name: 'Omni-Market Intelligence Swarm',
    role: 'Market Intelligence Agent',
    leastPrivilegeScope: 'READ_MARKET_DEPTH, READ_ORACLE_FEEDS, EMIT_CAUSAL_TELEMETRY',
    spendingLimitUsd: 50000,
    currentCycleSpendUsd: 4200,
    reputationScore: 99.4,
    status: 'ACTIVE',
    lastAction: 'Mapped cross-market bond spread widening to crypto basis spread',
    lastActionTime: '12s ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-02',
    name: 'Delta-Neutral Execution Core',
    role: 'Trading Agent',
    leastPrivilegeScope: 'PROPOSE_HEDGE_TRADES, ROUTE_LIMIT_ORDERS, SIMULATE_SLIPPAGE',
    spendingLimitUsd: 5000000,
    currentCycleSpendUsd: 1240000,
    reputationScore: 98.8,
    status: 'ACTIVE',
    lastAction: 'Executed $12.4M FX hedge across Euronext and Chicago Merc',
    lastActionTime: '1m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-03',
    name: 'Sovereign Treasury Sentinel',
    role: 'Treasury Agent',
    leastPrivilegeScope: 'ALLOCATE_RESERVE_BUFFER, MONITOR_RUNWAY, REBALANCE_COLLATERAL',
    spendingLimitUsd: 25000000,
    currentCycleSpendUsd: 4800000,
    reputationScore: 99.9,
    status: 'ACTIVE',
    lastAction: 'Swept $4.8M net profits into 3-Month T-Bill yielding 5.12%',
    lastActionTime: '8m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-04',
    name: 'Multidimensional Risk Engine',
    role: 'Risk Agent',
    leastPrivilegeScope: 'INSPECT_HAIRCUTS, RUN_STRESS_MODELS, TRIGGER_MARGIN_CALLS',
    spendingLimitUsd: 100000,
    currentCycleSpendUsd: 1200,
    reputationScore: 99.7,
    status: 'ACTIVE',
    lastAction: 'Stress-tested 400bps rate shock across collateral matrices',
    lastActionTime: '3m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-05',
    name: 'Smart Contract Bytecode Auditor',
    role: 'Security Agent',
    leastPrivilegeScope: 'DECOMPILE_BYTECODE, INSPECT_PROXY_ADMINS, BLOCK_SUSPICIOUS_CALLS',
    spendingLimitUsd: 250000,
    currentCycleSpendUsd: 38000,
    reputationScore: 100.0,
    status: 'ACTIVE',
    lastAction: 'Intercepted malicious upgrade proposal in downstream routing pool',
    lastActionTime: '14m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-06',
    name: 'Cross-Venue Liquidity Router',
    role: 'Liquidity Agent',
    leastPrivilegeScope: 'AGGREGATE_ORDER_BOOKS, OPTIMIZE_AMM_ROUTING, DETECT_SLIPPAGE',
    spendingLimitUsd: 10000000,
    currentCycleSpendUsd: 2150000,
    reputationScore: 97.9,
    status: 'ACTIVE',
    lastAction: 'Routed $2.15M trade splitting across 4 venues with 0.01% price impact',
    lastActionTime: '4m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-07',
    name: 'Bilateral & Multilateral Clearing Net',
    role: 'Clearing Agent',
    leastPrivilegeScope: 'CALCULATE_NET_OBLIGATIONS, RESOLVE_CROSS_TENANT_DEBT, COMPUTE_FEES',
    spendingLimitUsd: 50000000,
    currentCycleSpendUsd: 18200000,
    reputationScore: 99.8,
    status: 'ACTIVE',
    lastAction: 'Netted $148M gross obligations down to $22M net physical transfer',
    lastActionTime: '15m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-08',
    name: 'Jurisdictional Policy Enforcer',
    role: 'Compliance Agent',
    leastPrivilegeScope: 'VALIDATE_TRAVEL_RULE, AUDIT_SANCTIONS_LIST, ATTEST_TAX_STATUS',
    spendingLimitUsd: 50000,
    currentCycleSpendUsd: 850,
    reputationScore: 99.9,
    status: 'ACTIVE',
    lastAction: 'Generated Zero-Knowledge non-sanctioned residency attestations',
    lastActionTime: '2m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-09',
    name: 'Macro Scenario & Alpha Researcher',
    role: 'Research Agent',
    leastPrivilegeScope: 'ANALYZE_CENTRAL_BANK_MINUTES, BACKTEST_STRATEGIES, DETECT_ANOMALIES',
    spendingLimitUsd: 100000,
    currentCycleSpendUsd: 15400,
    reputationScore: 96.5,
    status: 'ACTIVE',
    lastAction: 'Published sovereign capital flow forecast for Q4 fiscal year',
    lastActionTime: '22m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-10',
    name: 'Dynamic Sovereign Portfolio Balancer',
    role: 'Portfolio Agent',
    leastPrivilegeScope: 'OPTIMIZE_SHARPE_RATIO, ENFORCE_DIVERSIFICATION, REBALANCE_WEIGHTS',
    spendingLimitUsd: 15000000,
    currentCycleSpendUsd: 3400000,
    reputationScore: 98.4,
    status: 'ACTIVE',
    lastAction: 'Rebalanced real-world asset collateral pool to maintain 140% coverage',
    lastActionTime: '6m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-11',
    name: 'Causal State Recovery Guardian',
    role: 'Recovery Agent',
    leastPrivilegeScope: 'ARCHIVE_DAG_SNAPSHOTS, REPLAY_TRANSACTION_TREES, RESTORE_STATE',
    spendingLimitUsd: 500000,
    currentCycleSpendUsd: 0,
    reputationScore: 100.0,
    status: 'ACTIVE',
    lastAction: 'Verified independent cold storage backup hash across 3 continents',
    lastActionTime: '30m ago',
    emergencyFreezeAvailable: true
  },
  {
    id: 'agent-12',
    name: 'Cryptographic Audit & Proof Verifier',
    role: 'Audit Agent',
    leastPrivilegeScope: 'VERIFY_ZERO_KNOWLEDGE_PROOFS, EMIT_LEGAL_EVIDENCE, SEAL_LOGS',
    spendingLimitUsd: 50000,
    currentCycleSpendUsd: 620,
    reputationScore: 100.0,
    status: 'ACTIVE',
    lastAction: 'Emitted cryptographic proof-carrying bundle for institutional clearing',
    lastActionTime: '5s ago',
    emergencyFreezeAvailable: true
  }
];

export const INITIAL_CAUSAL_GRAPH: CausalEventNode[] = [
  {
    eventId: 'node-01',
    parentHash: 'GENESIS_ROOT',
    timestamp: '00:02:14',
    source: 'FOMC / European Central Bank',
    category: 'MACRO_SHOCK',
    title: 'Surprise 25bps Rate Escalation & Yield Inversion',
    description: 'Central bank terminal rate projection adjusted upwards by 25 basis points',
    causalImpact: 'Triggers upward spike in 2Y Sovereign Yields (+14bps)',
    riskDelta: 12,
    proofSignature: '0xca810284719bb810'
  },
  {
    eventId: 'node-02',
    parentHash: 'node-01',
    timestamp: '00:02:18',
    source: 'Sovereign Debt Electronic Book',
    category: 'BOND_YIELD',
    title: 'Sovereign Bond Curve Steepening & Duration Stress',
    description: 'Long-term bonds drop 1.4% as secondary dealer bid-ask spreads double',
    causalImpact: 'USD Dollar Index (DXY) appreciates +0.8% against EUR and JPY',
    riskDelta: 18,
    proofSignature: '0x99201948ba582048'
  },
  {
    eventId: 'node-03',
    parentHash: 'node-02',
    timestamp: '00:02:22',
    source: 'FX Clearing Rail (CLS Bank & Bank of England)',
    category: 'FX_CURRENCY',
    title: 'FX Cross-Currency Basis Squeeze',
    description: 'Commercial banks repatriate offshore dollar liquidity; funding spreads widen',
    causalImpact: 'High-beta equities and tokenized tech indexes enter sharp sell-off',
    riskDelta: 24,
    proofSignature: '0x1837491028374910'
  },
  {
    eventId: 'node-04',
    parentHash: 'node-03',
    timestamp: '00:02:29',
    source: 'Equity Liquidity Venues',
    category: 'EQUITY_STRESS',
    title: 'Tech Equity Pullback & Corporate Credit Margin Call',
    description: 'Institutional prime brokers request $420M in additional collateral margins',
    causalImpact: 'Digital asset market makers pull spot bids to protect balance sheets',
    riskDelta: 31,
    proofSignature: '0x4918205739810294'
  },
  {
    eventId: 'node-05',
    parentHash: 'node-04',
    timestamp: '00:02:35',
    source: 'OMNIFIN Autonomous Defense Shield',
    category: 'POLICY_DEFENSE',
    title: 'OMNIFIN Pre-Emptive Collateral Firewall Activation',
    description: 'OMNIFIN Risk Engine autonomously increases haircuts on volatile collateral and re-routes settlement into USD-O enclaves',
    causalImpact: 'Contagion contained with ZERO customer liquidations and zero bad debt',
    riskDelta: -28,
    proofSignature: '0x8892019ee2740019'
  }
];

export const INITIAL_INTEGRITY_ALERTS: MarketIntegrityAlert[] = [
  {
    id: 'alert-01',
    assetSymbol: 'MEME-ALPHA',
    category: 'WASH_TRADING',
    observedFacts: '6 separate wallet addresses funded from same Tornado Cash deposit executed 48 round-trip trades within 180 seconds across 2 decentralized liquidity pools.',
    riskSignals: 'Volume reported on public explorer is 94% circular; actual independent capital inflow is only $1,420 vs $42,000,000 claimed.',
    confirmedViolation: true,
    confidenceScore: 98.6,
    timestamp: '10m ago',
    evidenceHashes: ['0x99281a...', '0xfa0192...', '0x182736...'],
    recommendedAction: 'Restricted from Collateral Eligibility; flagged on Sovereign Terminal.'
  },
  {
    id: 'alert-02',
    assetSymbol: 'PERP-SOL-USDC',
    category: 'SPOOFING',
    observedFacts: 'A single institutional address placed 1,200 BTC equivalent in bid depth 0.2% below market and cancelled 99.4% of orders within 45 milliseconds of execution.',
    riskSignals: 'Artificial bid book depth created to lure momentum trading bots into aggressive longs before pulling liquidity.',
    confirmedViolation: true,
    confidenceScore: 94.2,
    timestamp: '25m ago',
    evidenceHashes: ['0x11aa92...', '0xcc8829...'],
    recommendedAction: 'Order routing dynamically penalized; execution latency buffer applied.'
  },
  {
    id: 'alert-03',
    assetSymbol: 'X-TOKEN-DEFI',
    category: 'INSIDER_DUMP',
    observedFacts: 'Deployer address transferred 18% of circulating supply to 4 unverified multisigs 2 hours prior to scheduled public emissions announcement.',
    riskSignals: 'Extreme owner concentration risk (Top 3 holders control 78.4% of non-locked tokens).',
    confirmedViolation: false,
    confidenceScore: 78.5,
    timestamp: '42m ago',
    evidenceHashes: ['0x55bb01...', '0x77dd82...'],
    recommendedAction: 'Automated Warning: Tier 3 High Risk. Margin haircut set to 90%.'
  }
];

export const INITIAL_PROOF_TRANSACTIONS: ProofCarryingTransaction[] = [
  {
    txId: 'PCT-2026-88190',
    intent: 'Multi-Venue Institutional Arbitrage & Collateral Shield',
    amountUsd: 14500000,
    asset: 'USD-O / UST-3M',
    sourceAccount: 'Sovereign Treasury Vault Alpha',
    destinationRail: 'Depository Trust & Clearing Corp (DTCC)',
    timestamp: '2m ago',
    proofs: {
      intentProof: true,
      identityProof: true,
      permissionProof: true,
      securityProof: true,
      riskProof: true,
      simulationProof: true,
      policyProof: true,
      authorizationProof: true,
      executionProof: true,
      settlementProof: true
    },
    status: 'SETTLED'
  },
  {
    txId: 'PCT-2026-88191',
    intent: 'Cross-Chain RWA Invoice Liquidity Provision',
    amountUsd: 2850000,
    asset: 'PORT-INV-88',
    sourceAccount: 'Pacific Rim Trade Logistics Ltd',
    destinationRail: 'MAS Singapore Fast Net',
    timestamp: '7m ago',
    proofs: {
      intentProof: true,
      identityProof: true,
      permissionProof: true,
      securityProof: true,
      riskProof: true,
      simulationProof: true,
      policyProof: true,
      authorizationProof: true,
      executionProof: true,
      settlementProof: true
    },
    status: 'SETTLED'
  },
  {
    txId: 'PCT-2026-88192',
    intent: 'Algorithmic High-Frequency Delta Hedge',
    amountUsd: 8900000,
    asset: 'BTC-INST',
    sourceAccount: 'Delta-Neutral Execution Core',
    destinationRail: 'Ethereum ZK Settlement Fabric',
    timestamp: '12m ago',
    proofs: {
      intentProof: true,
      identityProof: true,
      permissionProof: true,
      securityProof: true,
      riskProof: true,
      simulationProof: true,
      policyProof: true,
      authorizationProof: false, // simulated rejection missing auth
      executionProof: false,
      settlementProof: false
    },
    status: 'REJECTED_NO_PROOF'
  }
];

export const INITIAL_NETTING_OBLIGATIONS: NettingObligation[] = [
  {
    id: 'net-01',
    partyA: 'Apex Prime Brokerage (NY)',
    partyB: 'Helios Sovereign Vault (Zurich)',
    asset: 'USD-O',
    grossObligationAtoB: 100000000,
    grossObligationBtoA: 80000000,
    netObligationAmount: 20000000,
    netPayer: 'Apex Prime Brokerage (NY)',
    netReceiver: 'Helios Sovereign Vault (Zurich)',
    settlementDeadline: 'T+0 End of Day (16:00 UTC)',
    capitalSavedUsd: 160000000,
    status: 'NETTED_VERIFIED'
  },
  {
    id: 'net-02',
    partyA: 'Tokyo Cross-Currency Fund',
    partyB: 'Singapore Trade Clearing House',
    asset: 'USD-O',
    grossObligationAtoB: 45000000,
    grossObligationBtoA: 42500000,
    netObligationAmount: 2500000,
    netPayer: 'Tokyo Cross-Currency Fund',
    netReceiver: 'Singapore Trade Clearing House',
    settlementDeadline: 'T+0 (Immediate)',
    capitalSavedUsd: 85000000,
    status: 'SETTLEMENT_QUEUED'
  }
];

export const INITIAL_COUNTERFACTUAL_SIMULATION: CounterfactualSimulationResult = {
  simulationId: 'SIM-GLOBAL-STRESS-409',
  scenarioName: 'Severe Macro Stagflation + Stablecoin De-peg Stress Test',
  expectedOutcome: 'Zero systemic default; collateral buffers absorb 34% drawdown without margin call triggers.',
  bestCase: 'Spread compresses back within 6 hours (+1.8% portfolio return).',
  baseCase: 'Controlled 2.1% rebalancing cost; all obligations settled within 400ms.',
  adverseCase: 'Liquidity depth across external AMMs dries up by 60%; OMNIFIN internal netting covers 94% of flows.',
  extremeCase: 'Top 3 prime brokers experience simultaneous API freeze; OMNIFIN activates Isolated Emergency Enclave.',
  invalidationCondition: 'Unconditional failure of US Federal Reserve Fedwire & DTCC rails concurrently for > 24 hours.',
  maxEstimatedDrawdownPct: 2.85,
  liquiditySurplusRequiredUsd: 18500000,
  policyApproved: true
};

export const SAMPLE_NFL_SCRIPTS = [
  {
    title: 'Institutional Delta Hedge with Zero-Knowledge Proof',
    code: `// Native Financial Language (NFL) Script
OBSERVE portfolio.exposure(asset="BTC-INST")
ANALYZE volatility_surface(horizon="24h", method="MONTE_CARLO")

SIMULATE price_shock(delta=-0.15, liquidity_reduction=0.40)
REQUIRE simulation(max_drawdown < 0.03)

IF risk_score > 35 THEN
  HEDGE delta_risk USING approved_assets=["UST-3M", "USD-O"]
  REQUIRE security_proof(level="STRICT_MPC")
  REQUIRE policy_proof(rule="NO_LEVERAGE_OVER_3X")
  
  EXECUTE spot_swap(from="BTC-INST", to="USD-O", max_slippage_bps=8)
  SETTLE through=["OMNIFIN_CLEAR_NET", "FEDWIRE_RTGS"]
  VERIFY state_transition(proof_type="ZK_SNARK")
END IF`
  },
  {
    title: 'Automated Multi-Party Netting & Liquidity Sweep',
    code: `// NFL Sovereign Netting Protocol
OBSERVE counterparties(status="SETTLEMENT_PENDING")
IDENTIFY bilateral_obligations(parties=["Apex_NY", "Helios_Zurich"])

CALCULATE gross_exposure()
EXECUTE multilateral_netting(algorithm="MIN_CASH_FLOW_DAG")

REQUIRE settlement_proof(validity="CRYPTOGRAPHIC_FINALITY")
CLEAR net_balance()
SETTLE remaining_deficit(asset="USD-O", rail="ETHEREUM_ZK")
RECONCILE ledger(tolerance=0.000001)`
  }
];
