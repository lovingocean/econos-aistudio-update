/**
 * INSTITUTIONAL MULTI-CURRENCY FX & ASSET EXCHANGE ENGINE
 * Real-world Financial Rules:
 * 1. Pre-trade Balance & Margin Validation (Zero Unbacked Trades)
 * 2. L2 Order Book Depth Ladder with Price-Time FIFO Priority
 * 3. Market Order Book-Walking with Real Weighted Average Price & Slippage
 * 4. Limit Order Resting & Crossing Detection (Maker vs Taker)
 * 5. Tiered Fee Schedule (0.10% Maker / 0.20% Taker)
 * 6. Interbank Settlement Conventions (T+0 Instant, T+1, T+2 Spot Value Dates)
 * 7. Double-Entry Accounting Ledger Posting with Auto-Reconciliation
 * 8. FINRA / MiFID II Regulatory Trade Confirmation Slip with SHA-256 Seal
 */

export type SettlementCycle = 'T_PLUS_0' | 'T_PLUS_1' | 'T_PLUS_2';

export interface ExchangePair {
  symbol: string;           // e.g. "EUR/USD"
  name: string;             // e.g. "Euro / US Dollar"
  baseCurrency: string;     // "EUR"
  quoteCurrency: string;    // "USD"
  category: 'FIAT_FX' | 'DIGITAL_ASSET' | 'STABLECOIN';
  lastPrice: number;
  bid: number;
  ask: number;
  spread: number;
  spreadBps: number;
  high24h: number;
  low24h: number;
  change24hPct: number;
  volume24h: number;
  tickSize: number;
  minOrderSize: number;
  standardSettlement: SettlementCycle;
}

export interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
  depthPct: number;
}

export interface OrderBookDepth {
  pair: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadBps: number;
  midPrice: number;
  timestamp: string;
}

export interface ExchangeOrder {
  id: string;
  organizationId: string;
  pair: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  price: number;
  quantity: number;
  filledQuantity: number;
  remainingQuantity: number;
  averageFillPrice: number;
  status: 'OPEN' | 'FILLED' | 'PARTIALLY_FILLED' | 'CANCELLED' | 'REJECTED';
  feeUsd: number;
  feeRatePct: number;
  isMaker: boolean;
  slippageBps: number;
  settlementCycle: SettlementCycle;
  settlementDate: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TradeExecution {
  tradeId: string;
  orderId: string;
  organizationId: string;
  pair: string;
  side: 'BUY' | 'SELL';
  fillPrice: number;
  quantity: number;
  quoteAmount: number;
  fee: number;
  feeCurrency: string;
  slippageBps: number;
  isMaker: boolean;
  executionTime: string;
  settlementDate: string;
  settlementCycle: SettlementCycle;
  counterparty: string;
  confirmationNumber: string;
  sha256Verification: string;
  ledgerTransactionIds?: string[];
}

export interface MultiCurrencyBalance {
  currency: string;
  name: string;
  symbol: string;
  flag: string;
  totalBalance: number;
  availableBalance: number;
  lockedInOrders: number;
  usdEquivalent: number;
  rateToUsd: number;
  accountId: string;
  accountName: string;
  institutionName: string;
}
