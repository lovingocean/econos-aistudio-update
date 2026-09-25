/**
 * OMNIFIN REAL-TIME EXCHANGE & AUTONOMOUS TRADING CORE TYPES
 * Continuous: MARKET DATA → ORDER ENTRY → RISK CHECK → ORDER BOOK → MATCHING → TRADE → CLEARING → SETTLEMENT → POSITION UPDATE
 */

export type InstrumentType = 
  | 'SPOT' 
  | 'MARGIN' 
  | 'PERPETUAL' 
  | 'FUTURES' 
  | 'OPTIONS' 
  | 'SWAP' 
  | 'RWA' 
  | 'FX';

export type OrderSide = 'BUY' | 'SELL';

export type OrderType = 
  | 'LIMIT' 
  | 'MARKET' 
  | 'STOP_LIMIT' 
  | 'TAKE_PROFIT' 
  | 'ICEBERG';

export type TimeInForce = 'GTC' | 'IOC' | 'FOK';

export type OrderStatus = 
  | 'NEW'
  | 'VALIDATING'
  | 'BOOKED'
  | 'PARTIALLY_FILLED'
  | 'FILLED'
  | 'CANCELLED'
  | 'REJECTED_RISK'
  | 'REJECTED_POLICY';

export type SettlementMode =
  | 'ATOMIC_INSTANT'
  | 'ZK_ROLLUP'
  | 'FEDWIRE_RTGS'
  | 'DTCC_CLEAR'
  | 'LIGHTNING_MESH'
  | 'CUSTODIAL_ENCLAVE';

export interface MarketInstrument {
  symbol: string;
  name: string;
  type: InstrumentType;
  baseAsset: string;
  quoteAsset: string;
  lastPrice: number;
  markPrice: number;
  indexPrice: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24hUsd: number;
  openInterestUsd: number;
  fundingRatePct: number;
  nextFundingInMin: number;
  spreadBps: number;
  tickSize: number;
  minOrderSize: number;
  maxLeverage: number;
  maintenanceMarginPct: number;
  externalVenues: {
    binanceRef: number;
    deribitRef: number;
    cmeRef: number;
  };
  optionDetails?: {
    strikePrice: number;
    expiryDate: string;
    optionSide: 'CALL' | 'PUT';
    impliedVolatilityPct: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
  };
  swapDetails?: {
    tenor: string;
    fixedRatePct: number;
    floatingBenchmark: string;
    notionalCurrency: string;
    settlementFrequency: string;
  };
  futuresDetails?: {
    expiryDate: string;
    settlementType: 'PHYSICAL' | 'CASH';
    basisBps: number;
  };
}

export interface OrderBookLevel {
  price: number;
  quantity: number;
  totalQuantity: number;
  orderCount: number;
  depthPct: number;
}

export interface RealtimeOrderBook {
  symbol: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadPct: number;
  midPrice: number;
  lastUpdateSeq: number;
  timestamp: string;
}

export interface PreTradeVerificationSummary {
  authPassed: boolean;
  riskMarginPassed: boolean;
  collateralAvailable: boolean;
  positionLimitPassed: boolean;
  securityFirewallPassed: boolean;
  marketIntegrityPassed: boolean;
  simulationPassed: boolean;
  policyApprovalHash: string;
}

export interface ExchangeOrder {
  id: string;
  clientOrderId: string;
  instrumentSymbol: string;
  side: OrderSide;
  type: OrderType;
  timeInForce: TimeInForce;
  price: number;
  quantity: number;
  filledQuantity: number;
  status: OrderStatus;
  timestamp: string;
  preTradeChecks: PreTradeVerificationSummary;
  isAgentOrder: boolean;
  agentName?: string;
  rejectionReason?: string;
}

export interface MatchedTrade {
  tradeId: string;
  buyOrderId: string;
  sellOrderId: string;
  instrumentSymbol: string;
  price: number;
  quantity: number;
  amountUsd: number;
  buyerParty: string;
  sellerParty: string;
  feeUsd: number;
  timestamp: string;
  matchingSequence: number;
  clearingStatus: 'CLEARED' | 'SETTLEMENT_SUBMITTED' | 'SETTLED_FINAL';
  settlementRail: SettlementMode;
  proofHash: string;
}

export interface UserPosition {
  id: string;
  instrumentSymbol: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryPrice: number;
  markPrice: number;
  liquidationPrice: number;
  leverage: number;
  initialMargin: number;
  maintenanceMargin: number;
  marginRatioPct: number;
  unrealizedPnl: number;
  unrealizedPnlPct: number;
  realizedPnl: number;
  settlementMode: SettlementMode;
}

export interface PortfolioMarginState {
  totalEquityUsd: number;
  availableMarginUsd: number;
  usedMarginUsd: number;
  maintenanceMarginReqUsd: number;
  marginLevelPct: number;
  crossUnrealizedPnl: number;
  liquidationRisk: 'SAFE' | 'ELEVATED' | 'CRITICAL_MARGIN_CALL';
  insuranceFundBufferUsd: number;
}

export interface MarketSurveillanceAlert {
  id: string;
  seq: number;
  timestamp: string;
  symbol: string;
  category: 
    | 'WASH_TRADE_DEFENSE' 
    | 'SPOOFING_DETECTED' 
    | 'LAYERED_CANCEL' 
    | 'PRICE_BAND_REJECTION' 
    | 'ABNORMAL_FREQUENCY' 
    | 'LIQUIDATION_CONTAINMENT' 
    | 'CROSS_VENUE_ARBITRAGE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  observation: string;
  riskSignal: string;
  confidenceScore: number;
  actionTaken: string;
  evidenceSignature: string;
}

export interface AutonomousTradingStrategy {
  id: string;
  name: string;
  type: 
    | 'MARKET_MAKING' 
    | 'CROSS_VENUE_ARBITRAGE' 
    | 'TREND_MOMENTUM' 
    | 'DELTA_NEUTRAL_HEDGE' 
    | 'LIQUIDITY_HARVEST';
  instrumentSymbol: string;
  allocatedCapitalUsd: number;
  currentPositionUsd: number;
  maxDrawdownLimitPct: number;
  maxLeverage: number;
  status: 'ACTIVE' | 'PAUSED' | 'RISK_HALTED';
  winRatePct: number;
  totalTrades: number;
  profitPnlUsd: number;
  lastExecution: string;
}

export interface ExchangeSolvencyAudit {
  totalAssetsHeldUsd: number;
  totalCustomerLiabilitiesUsd: number;
  solvencyRatioPct: number;
  hotWalletReservesUsd: number;
  coldEnclaveReservesUsd: number;
  insuranceFundUsd: number;
  proofOfReservesMerkleRoot: string;
  lastAuditedAt: string;
  invariantStatus: 'SOLVENT_VERIFIED' | 'UNDER_COLLATERALIZED';
}

export interface DeterministicEventRecord {
  seq: number;
  timestamp: string;
  eventType: 
    | 'ORDER_RECEIVED' 
    | 'RISK_VERIFIED' 
    | 'ORDER_BOOK_PLACED' 
    | 'MATCH_EXECUTED' 
    | 'CLEARING_OBLIGATION' 
    | 'SETTLEMENT_FINALIZED' 
    | 'POSITION_UPDATED';
  payloadSummary: string;
  stateRootHash: string;
}

export type Web3Network = 'ethereum' | 'arbitrum' | 'solana' | 'base' | 'polygon';
export type Web3WalletProvider = 'metamask' | 'coinbase' | 'walletconnect' | 'phantom' | 'ledger';

export interface Web3WalletState {
  isConnected: boolean;
  address: string | null;
  walletProvider: Web3WalletProvider | null;
  network: Web3Network;
  chainId: number;
  walletBalances: {
    usdo: number;
    btc: number;
    eth: number;
    sol: number;
  };
  isSignatureVerified: boolean;
}

export interface DepositReceivingAddress {
  asset: string;
  network: string;
  networkKey: string;
  address: string;
  memoOrTag?: string;
  minConfirmations: number;
  expectedTime: string;
  minDeposit: number;
  depositFeePct: number;
}

export interface DepositTransaction {
  id: string;
  timestamp: string;
  asset: string;
  network: string;
  amount: number;
  amountUsd: number;
  fromAddress: string;
  toAddress: string;
  txHash: string;
  confirmations: number;
  requiredConfirmations: number;
  status: 'PENDING' | 'CONFIRMING' | 'CONFIRMED' | 'FAILED';
}
