import {
  MarketInstrument,
  RealtimeOrderBook,
  ExchangeOrder,
  MatchedTrade,
  UserPosition,
  PortfolioMarginState,
  MarketSurveillanceAlert,
  AutonomousTradingStrategy,
  ExchangeSolvencyAudit,
  DeterministicEventRecord
} from '../types/omnifinExchange';

export const INITIAL_EXCHANGE_INSTRUMENTS: MarketInstrument[] = [
  {
    symbol: 'BTC-PERP',
    name: 'Bitcoin Sovereign Perpetual Contract',
    type: 'PERPETUAL',
    baseAsset: 'BTC',
    quoteAsset: 'USD-O',
    lastPrice: 94850.50,
    markPrice: 94848.20,
    indexPrice: 94849.10,
    change24h: 3.48,
    high24h: 96200.00,
    low24h: 91750.00,
    volume24hUsd: 1845200000,
    openInterestUsd: 412000000,
    fundingRatePct: 0.0082,
    nextFundingInMin: 42,
    spreadBps: 0.45,
    tickSize: 0.50,
    minOrderSize: 0.001,
    maxLeverage: 50,
    maintenanceMarginPct: 1.5,
    externalVenues: {
      binanceRef: 94852.00,
      deribitRef: 94847.80,
      cmeRef: 94910.00
    }
  },
  {
    symbol: 'ETH-PERP',
    name: 'Ethereum ZK Settlement Perpetual',
    type: 'PERPETUAL',
    baseAsset: 'ETH',
    quoteAsset: 'USD-O',
    lastPrice: 3482.40,
    markPrice: 3481.90,
    indexPrice: 3482.10,
    change24h: 2.15,
    high24h: 3540.00,
    low24h: 3390.00,
    volume24hUsd: 890400000,
    openInterestUsd: 215000000,
    fundingRatePct: 0.0065,
    nextFundingInMin: 42,
    spreadBps: 0.60,
    tickSize: 0.10,
    minOrderSize: 0.01,
    maxLeverage: 25,
    maintenanceMarginPct: 2.0,
    externalVenues: {
      binanceRef: 3482.80,
      deribitRef: 3481.50,
      cmeRef: 3485.00
    }
  },
  {
    symbol: 'SOL-PERP',
    name: 'Solana High-Velocity Perpetual',
    type: 'PERPETUAL',
    baseAsset: 'SOL',
    quoteAsset: 'USD-O',
    lastPrice: 198.60,
    markPrice: 198.55,
    indexPrice: 198.58,
    change24h: 5.82,
    high24h: 204.50,
    low24h: 187.20,
    volume24hUsd: 540800000,
    openInterestUsd: 142000000,
    fundingRatePct: 0.0112,
    nextFundingInMin: 42,
    spreadBps: 1.20,
    tickSize: 0.05,
    minOrderSize: 0.1,
    maxLeverage: 20,
    maintenanceMarginPct: 3.0,
    externalVenues: {
      binanceRef: 198.70,
      deribitRef: 198.50,
      cmeRef: 198.90
    }
  },
  {
    symbol: 'UST-3M-SPOT',
    name: 'Tokenized US Treasury 3-Month T-Bill Spot',
    type: 'SPOT',
    baseAsset: 'UST-3M',
    quoteAsset: 'USD-O',
    lastPrice: 98.78,
    markPrice: 98.78,
    indexPrice: 98.78,
    change24h: 0.04,
    high24h: 98.80,
    low24h: 98.75,
    volume24hUsd: 3200000000,
    openInterestUsd: 0,
    fundingRatePct: 0.0,
    nextFundingInMin: 0,
    spreadBps: 0.05,
    tickSize: 0.01,
    minOrderSize: 100,
    maxLeverage: 10,
    maintenanceMarginPct: 0.5,
    externalVenues: {
      binanceRef: 98.78,
      deribitRef: 98.78,
      cmeRef: 98.79
    }
  },
  {
    symbol: 'NVDA-SYNTH',
    name: 'NVIDIA Enterprise Compute Synthetic Equity',
    type: 'FUTURES',
    baseAsset: 'NVDA',
    quoteAsset: 'USD-O',
    lastPrice: 142.50,
    markPrice: 142.45,
    indexPrice: 142.48,
    change24h: 4.15,
    high24h: 144.80,
    low24h: 136.20,
    volume24hUsd: 412000000,
    openInterestUsd: 84000000,
    fundingRatePct: 0.0035,
    nextFundingInMin: 120,
    spreadBps: 0.80,
    tickSize: 0.05,
    minOrderSize: 1,
    maxLeverage: 5,
    maintenanceMarginPct: 5.0,
    externalVenues: {
      binanceRef: 142.40,
      deribitRef: 142.55,
      cmeRef: 142.60
    }
  },
  {
    symbol: 'XAU-PERP',
    name: 'Allocated London Good Delivery Gold Perpetual',
    type: 'PERPETUAL',
    baseAsset: 'XAU',
    quoteAsset: 'USD-O',
    lastPrice: 2742.80,
    markPrice: 2742.70,
    indexPrice: 2742.75,
    change24h: 0.85,
    high24h: 2755.00,
    low24h: 2728.00,
    volume24hUsd: 680000000,
    openInterestUsd: 190000000,
    fundingRatePct: 0.0020,
    nextFundingInMin: 42,
    spreadBps: 0.35,
    tickSize: 0.10,
    minOrderSize: 0.1,
    maxLeverage: 20,
    maintenanceMarginPct: 2.5,
    externalVenues: {
      binanceRef: 2742.50,
      deribitRef: 2743.00,
      cmeRef: 2743.20
    }
  },
  {
    symbol: 'BTC-SPOT',
    name: 'Bitcoin Direct Spot Market (Physical Delivery)',
    type: 'SPOT',
    baseAsset: 'BTC',
    quoteAsset: 'USD-O',
    lastPrice: 94840.00,
    markPrice: 94840.00,
    indexPrice: 94841.20,
    change24h: 3.42,
    high24h: 96180.00,
    low24h: 91700.00,
    volume24hUsd: 1420000000,
    openInterestUsd: 0,
    fundingRatePct: 0.0,
    nextFundingInMin: 0,
    spreadBps: 0.20,
    tickSize: 0.10,
    minOrderSize: 0.001,
    maxLeverage: 1,
    maintenanceMarginPct: 0.0,
    externalVenues: {
      binanceRef: 94842.00,
      deribitRef: 94838.00,
      cmeRef: 94845.00
    }
  },
  {
    symbol: 'BTC-MARGIN-5X',
    name: 'Bitcoin Isolated & Cross Margin Facility',
    type: 'MARGIN',
    baseAsset: 'BTC',
    quoteAsset: 'USD-O',
    lastPrice: 94845.00,
    markPrice: 94844.00,
    indexPrice: 94844.50,
    change24h: 3.45,
    high24h: 96190.00,
    low24h: 91720.00,
    volume24hUsd: 620000000,
    openInterestUsd: 118000000,
    fundingRatePct: 0.0045,
    nextFundingInMin: 60,
    spreadBps: 0.40,
    tickSize: 0.50,
    minOrderSize: 0.01,
    maxLeverage: 5,
    maintenanceMarginPct: 5.0,
    externalVenues: {
      binanceRef: 94846.00,
      deribitRef: 94841.00,
      cmeRef: 94850.00
    }
  },
  {
    symbol: 'BTC-26DEC-FUT',
    name: 'Bitcoin Quarterly Dated Future (26 Dec 2026)',
    type: 'FUTURES',
    baseAsset: 'BTC',
    quoteAsset: 'USD-O',
    lastPrice: 96150.00,
    markPrice: 96145.00,
    indexPrice: 94849.10,
    change24h: 3.65,
    high24h: 97400.00,
    low24h: 93100.00,
    volume24hUsd: 840000000,
    openInterestUsd: 540000000,
    fundingRatePct: 0.0,
    nextFundingInMin: 0,
    spreadBps: 0.85,
    tickSize: 1.00,
    minOrderSize: 0.01,
    maxLeverage: 30,
    maintenanceMarginPct: 2.0,
    externalVenues: {
      binanceRef: 96160.00,
      deribitRef: 96140.00,
      cmeRef: 96180.00
    },
    futuresDetails: {
      expiryDate: '2026-12-26T08:00:00Z',
      settlementType: 'CASH',
      basisBps: 137.1
    }
  },
  {
    symbol: 'BTC-100K-CALL-26DEC',
    name: 'Bitcoin $100,000 European Call Option (26 Dec 2026)',
    type: 'OPTIONS',
    baseAsset: 'BTC',
    quoteAsset: 'USD-O',
    lastPrice: 6840.00,
    markPrice: 6835.00,
    indexPrice: 94849.10,
    change24h: 14.80,
    high24h: 7200.00,
    low24h: 5800.00,
    volume24hUsd: 310000000,
    openInterestUsd: 480000000,
    fundingRatePct: 0.0,
    nextFundingInMin: 0,
    spreadBps: 2.50,
    tickSize: 5.00,
    minOrderSize: 0.1,
    maxLeverage: 15,
    maintenanceMarginPct: 4.0,
    externalVenues: {
      binanceRef: 6830.00,
      deribitRef: 6845.00,
      cmeRef: 6860.00
    },
    optionDetails: {
      strikePrice: 100000,
      expiryDate: '2026-12-26T08:00:00Z',
      optionSide: 'CALL',
      impliedVolatilityPct: 54.2,
      delta: 0.44,
      gamma: 0.000021,
      theta: -38.4,
      vega: 142.8
    }
  },
  {
    symbol: 'BTC-85K-PUT-26DEC',
    name: 'Bitcoin $85,000 European Put Option (26 Dec 2026)',
    type: 'OPTIONS',
    baseAsset: 'BTC',
    quoteAsset: 'USD-O',
    lastPrice: 2420.00,
    markPrice: 2415.00,
    indexPrice: 94849.10,
    change24h: -11.40,
    high24h: 2900.00,
    low24h: 2200.00,
    volume24hUsd: 195000000,
    openInterestUsd: 320000000,
    fundingRatePct: 0.0,
    nextFundingInMin: 0,
    spreadBps: 2.80,
    tickSize: 5.00,
    minOrderSize: 0.1,
    maxLeverage: 15,
    maintenanceMarginPct: 4.0,
    externalVenues: {
      binanceRef: 2410.00,
      deribitRef: 2425.00,
      cmeRef: 2430.00
    },
    optionDetails: {
      strikePrice: 85000,
      expiryDate: '2026-12-26T08:00:00Z',
      optionSide: 'PUT',
      impliedVolatilityPct: 58.6,
      delta: -0.26,
      gamma: 0.000018,
      theta: -29.2,
      vega: 98.4
    }
  },
  {
    symbol: 'SOFR-IRS-1Y',
    name: 'USD SOFR 1-Year Fixed-for-Floating Interest Rate Swap',
    type: 'SWAP',
    baseAsset: 'SOFR-1Y',
    quoteAsset: 'USD-O',
    lastPrice: 4.15,
    markPrice: 4.15,
    indexPrice: 4.14,
    change24h: -0.02,
    high24h: 4.18,
    low24h: 4.12,
    volume24hUsd: 4800000000,
    openInterestUsd: 12400000000,
    fundingRatePct: 0.0,
    nextFundingInMin: 0,
    spreadBps: 0.10,
    tickSize: 0.001,
    minOrderSize: 10000,
    maxLeverage: 50,
    maintenanceMarginPct: 0.5,
    externalVenues: {
      binanceRef: 4.15,
      deribitRef: 4.15,
      cmeRef: 4.148
    },
    swapDetails: {
      tenor: '1 YEAR',
      fixedRatePct: 4.15,
      floatingBenchmark: 'SOFR Compounded In Arrears',
      notionalCurrency: 'USD-O',
      settlementFrequency: 'Quarterly Net DvP'
    }
  }
];

export const INITIAL_ORDER_BOOK: RealtimeOrderBook = {
  symbol: 'BTC-PERP',
  bids: [
    { price: 94850.00, quantity: 4.82, totalQuantity: 4.82, orderCount: 6, depthPct: 18 },
    { price: 94849.50, quantity: 8.15, totalQuantity: 12.97, orderCount: 11, depthPct: 32 },
    { price: 94849.00, quantity: 12.40, totalQuantity: 25.37, orderCount: 19, depthPct: 54 },
    { price: 94848.50, quantity: 15.60, totalQuantity: 40.97, orderCount: 22, depthPct: 72 },
    { price: 94848.00, quantity: 24.80, totalQuantity: 65.77, orderCount: 35, depthPct: 88 },
    { price: 94847.50, quantity: 18.25, totalQuantity: 84.02, orderCount: 28, depthPct: 94 },
    { price: 94847.00, quantity: 32.50, totalQuantity: 116.52, orderCount: 42, depthPct: 100 }
  ],
  asks: [
    { price: 94851.00, quantity: 3.90, totalQuantity: 3.90, orderCount: 5, depthPct: 15 },
    { price: 94851.50, quantity: 7.45, totalQuantity: 11.35, orderCount: 9, depthPct: 28 },
    { price: 94852.00, quantity: 11.20, totalQuantity: 22.55, orderCount: 16, depthPct: 48 },
    { price: 94852.50, quantity: 19.80, totalQuantity: 42.35, orderCount: 24, depthPct: 75 },
    { price: 94853.00, quantity: 22.10, totalQuantity: 64.45, orderCount: 31, depthPct: 89 },
    { price: 94853.50, quantity: 16.50, totalQuantity: 80.95, orderCount: 21, depthPct: 95 },
    { price: 94854.00, quantity: 28.90, totalQuantity: 109.85, orderCount: 39, depthPct: 100 }
  ],
  spread: 1.00,
  spreadPct: 0.00105,
  midPrice: 94850.50,
  lastUpdateSeq: 18940294,
  timestamp: 'Just now'
};

export const INITIAL_RECENT_TRADES: MatchedTrade[] = [
  {
    tradeId: 'TRD-8829104',
    buyOrderId: 'ORD-99120',
    sellOrderId: 'ORD-99118',
    instrumentSymbol: 'BTC-PERP',
    price: 94850.50,
    quantity: 1.45,
    amountUsd: 137533.22,
    buyerParty: 'Apex Prime Liquidity',
    sellerParty: 'Delta-Neutral Swarm #4',
    feeUsd: 13.75,
    timestamp: '00:00:01',
    matchingSequence: 498102,
    clearingStatus: 'SETTLED_FINAL',
    settlementRail: 'ATOMIC_INSTANT',
    proofHash: '0x99fa182049182375'
  },
  {
    tradeId: 'TRD-8829105',
    buyOrderId: 'ORD-99124',
    sellOrderId: 'ORD-99122',
    instrumentSymbol: 'BTC-PERP',
    price: 94851.00,
    quantity: 0.85,
    amountUsd: 80623.35,
    buyerParty: 'Zurich Vault Enclave',
    sellerParty: 'Avellaneda Market Maker',
    feeUsd: 8.06,
    timestamp: '00:00:03',
    matchingSequence: 498103,
    clearingStatus: 'SETTLED_FINAL',
    settlementRail: 'ATOMIC_INSTANT',
    proofHash: '0x8892019ee2740019'
  },
  {
    tradeId: 'TRD-8829106',
    buyOrderId: 'ORD-99130',
    sellOrderId: 'ORD-99128',
    instrumentSymbol: 'BTC-PERP',
    price: 94850.00,
    quantity: 3.20,
    amountUsd: 303520.00,
    buyerParty: 'Sovereign Treasury Vault Alpha',
    sellerParty: 'High-Frequency Cross Arb',
    feeUsd: 30.35,
    timestamp: '00:00:06',
    matchingSequence: 498104,
    clearingStatus: 'SETTLED_FINAL',
    settlementRail: 'ZK_ROLLUP',
    proofHash: '0x33b1e779a9cd8810'
  }
];

export const INITIAL_USER_POSITIONS: UserPosition[] = [
  {
    id: 'pos-btc-01',
    instrumentSymbol: 'BTC-PERP',
    side: 'LONG',
    size: 2.50,
    entryPrice: 93200.00,
    markPrice: 94848.20,
    liquidationPrice: 76500.00,
    leverage: 5,
    initialMargin: 46600.00,
    maintenanceMargin: 3556.80,
    marginRatioPct: 7.63,
    unrealizedPnl: 4120.50,
    unrealizedPnlPct: 8.84,
    realizedPnl: 1420.00,
    settlementMode: 'ATOMIC_INSTANT'
  },
  {
    id: 'pos-eth-02',
    instrumentSymbol: 'ETH-PERP',
    side: 'SHORT',
    size: 40.00,
    entryPrice: 3520.00,
    markPrice: 3481.90,
    liquidationPrice: 4180.00,
    leverage: 8,
    initialMargin: 17600.00,
    maintenanceMargin: 2785.52,
    marginRatioPct: 15.82,
    unrealizedPnl: 1524.00,
    unrealizedPnlPct: 8.66,
    realizedPnl: 850.00,
    settlementMode: 'ZK_ROLLUP'
  },
  {
    id: 'pos-ust-03',
    instrumentSymbol: 'UST-3M-SPOT',
    side: 'LONG',
    size: 50000.00,
    entryPrice: 98.74,
    markPrice: 98.78,
    liquidationPrice: 88.50,
    leverage: 2,
    initialMargin: 246850.00,
    maintenanceMargin: 2469.50,
    marginRatioPct: 1.00,
    unrealizedPnl: 2000.00,
    unrealizedPnlPct: 0.81,
    realizedPnl: 12400.00,
    settlementMode: 'FEDWIRE_RTGS'
  }
];

export const INITIAL_PORTFOLIO_MARGIN: PortfolioMarginState = {
  totalEquityUsd: 1485200.00,
  availableMarginUsd: 1174150.00,
  usedMarginUsd: 311050.00,
  maintenanceMarginReqUsd: 8811.82,
  marginLevelPct: 20.94,
  crossUnrealizedPnl: 7644.50,
  liquidationRisk: 'SAFE',
  insuranceFundBufferUsd: 48500000.00
};

export const INITIAL_EXCHANGE_STRATEGIES: AutonomousTradingStrategy[] = [
  {
    id: 'strat-01',
    name: 'Avellaneda-Stoikov Adaptive Market Maker',
    type: 'MARKET_MAKING',
    instrumentSymbol: 'BTC-PERP',
    allocatedCapitalUsd: 5000000,
    currentPositionUsd: 124000,
    maxDrawdownLimitPct: 2.0,
    maxLeverage: 10,
    status: 'ACTIVE',
    winRatePct: 92.4,
    totalTrades: 4120,
    profitPnlUsd: 184200,
    lastExecution: '4s ago'
  },
  {
    id: 'strat-02',
    name: 'Triangular Cross-Venue Statistical Arb',
    type: 'CROSS_VENUE_ARBITRAGE',
    instrumentSymbol: 'ETH-PERP',
    allocatedCapitalUsd: 8000000,
    currentPositionUsd: 420000,
    maxDrawdownLimitPct: 1.5,
    maxLeverage: 15,
    status: 'ACTIVE',
    winRatePct: 96.8,
    totalTrades: 2890,
    profitPnlUsd: 342100,
    lastExecution: '12s ago'
  },
  {
    id: 'strat-03',
    name: 'Sovereign Treasury Collateral Delta Hedge',
    type: 'DELTA_NEUTRAL_HEDGE',
    instrumentSymbol: 'BTC-PERP',
    allocatedCapitalUsd: 25000000,
    currentPositionUsd: 237000,
    maxDrawdownLimitPct: 1.0,
    maxLeverage: 3,
    status: 'ACTIVE',
    winRatePct: 99.1,
    totalTrades: 840,
    profitPnlUsd: 491000,
    lastExecution: '1m ago'
  },
  {
    id: 'strat-04',
    name: 'Sub-Millisecond Liquidity Harvester',
    type: 'LIQUIDITY_HARVEST',
    instrumentSymbol: 'SOL-PERP',
    allocatedCapitalUsd: 3000000,
    currentPositionUsd: 89000,
    maxDrawdownLimitPct: 2.5,
    maxLeverage: 12,
    status: 'ACTIVE',
    winRatePct: 88.7,
    totalTrades: 6240,
    profitPnlUsd: 112400,
    lastExecution: '8s ago'
  }
];

export const INITIAL_SURVEILLANCE_EVENTS: MarketSurveillanceAlert[] = [
  {
    id: 'surv-01',
    seq: 10481,
    timestamp: '00:01:24',
    symbol: 'BTC-PERP',
    category: 'WASH_TRADE_DEFENSE',
    severity: 'HIGH',
    observation: 'Matched identical bid/ask timestamps within 0.02ms across two related sub-accounts.',
    riskSignal: 'Attempted self-trade to manufacture artificial taker volume without economic risk transfer.',
    confidenceScore: 98.9,
    actionTaken: 'Order rejected at Matching Engine pre-match filter; zero fill recorded.',
    evidenceSignature: '0x99201948ba582048'
  },
  {
    id: 'surv-02',
    seq: 10482,
    timestamp: '00:01:52',
    symbol: 'ETH-PERP',
    category: 'SPOOFING_DETECTED',
    severity: 'MEDIUM',
    observation: 'Large non-bona-fide bid placed at Level 3 depth and cancelled within 42ms as mark price approached.',
    riskSignal: 'Quote layering designed to induce momentum retail bots to bid higher.',
    confidenceScore: 94.5,
    actionTaken: 'Account quoting frequency throttled; latency delay penalty applied for 300s.',
    evidenceSignature: '0x1837491028374910'
  },
  {
    id: 'surv-03',
    seq: 10483,
    timestamp: '00:02:18',
    symbol: 'BTC-PERP',
    category: 'CROSS_VENUE_ARBITRAGE',
    severity: 'LOW',
    observation: 'CME basis widened to +$59.50 premium over OMNIFIN index price.',
    riskSignal: 'Legitimate institutional liquidity demand in Chicago futures session.',
    confidenceScore: 99.8,
    actionTaken: 'OMNIFIN Arbitrage Swarm deployed $4.2M hedge, stabilizing basis spread back to +$2.10.',
    evidenceSignature: '0x4918205739810294'
  }
];

export const INITIAL_SOLVENCY_AUDIT: ExchangeSolvencyAudit = {
  totalAssetsHeldUsd: 4892400000.00,
  totalCustomerLiabilitiesUsd: 4125800000.00,
  solvencyRatioPct: 118.58,
  hotWalletReservesUsd: 489240000.00,
  coldEnclaveReservesUsd: 4403160000.00,
  insuranceFundUsd: 48500000.00,
  proofOfReservesMerkleRoot: '0x7e88b9284102948bbca99281a5c31e98d92305a18290ecca71b5620941820573',
  lastAuditedAt: 'Continuous Real-Time (Last Block: 12s ago)',
  invariantStatus: 'SOLVENT_VERIFIED'
};

export const INITIAL_DETERMINISTIC_REPLAY_LOG: DeterministicEventRecord[] = [
  {
    seq: 1001,
    timestamp: '00:00:00.120',
    eventType: 'ORDER_RECEIVED',
    payloadSummary: 'LIMIT BUY 1.45 BTC @ 94850.50 (Apex Prime)',
    stateRootHash: '0xaa102847'
  },
  {
    seq: 1002,
    timestamp: '00:00:00.121',
    eventType: 'RISK_VERIFIED',
    payloadSummary: 'Pre-Trade Margin Check Passed (10/10 Invariants Valid)',
    stateRootHash: '0xbb394819'
  },
  {
    seq: 1003,
    timestamp: '00:00:00.122',
    eventType: 'ORDER_BOOK_PLACED',
    payloadSummary: 'Order Book Depth Updated at Level 1 (Price-Time Priority)',
    stateRootHash: '0xcc849102'
  },
  {
    seq: 1004,
    timestamp: '00:00:00.123',
    eventType: 'MATCH_EXECUTED',
    payloadSummary: 'MATCHED with resting ask ORD-99118 (1.45 BTC @ 94850.50)',
    stateRootHash: '0xdd192837'
  },
  {
    seq: 1005,
    timestamp: '00:00:00.124',
    eventType: 'CLEARING_OBLIGATION',
    payloadSummary: 'Bilateral Obligation Generated & Margin Locked',
    stateRootHash: '0xee482019'
  },
  {
    seq: 1006,
    timestamp: '00:00:00.125',
    eventType: 'SETTLEMENT_FINALIZED',
    payloadSummary: 'Atomic Instant Settlement Confirmed on ZK Fabric',
    stateRootHash: '0xff938102'
  },
  {
    seq: 1007,
    timestamp: '00:00:00.126',
    eventType: 'POSITION_UPDATED',
    payloadSummary: 'Position +1.45 BTC Long (Total Size: 2.50 BTC)',
    stateRootHash: '0x00a83719'
  }
];
