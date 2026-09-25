import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Zap,
  Lock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Sliders,
  DollarSign,
  Scale,
  Landmark,
  FileCheck2,
  Bot,
  Copy,
  Check,
  Search,
  Eye,
  Terminal,
  Cpu,
  Globe2,
  BarChart3,
  Flame,
  Clock,
  ExternalLink,
  GitBranch,
  ArrowLeftRight,
  Share2,
  Building2,
  Layers2,
  Wallet,
  QrCode,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  CreditCard,
  Coins
} from 'lucide-react';
import {
  MarketInstrument,
  RealtimeOrderBook,
  OrderBookLevel,
  ExchangeOrder,
  MatchedTrade,
  UserPosition,
  PortfolioMarginState,
  MarketSurveillanceAlert,
  AutonomousTradingStrategy,
  ExchangeSolvencyAudit,
  DeterministicEventRecord,
  OrderType,
  OrderSide,
  TimeInForce,
  Web3WalletState,
  Web3Network,
  Web3WalletProvider
} from '../../types/omnifinExchange';
import { OmnifinWalletFunding } from './OmnifinWalletFunding';
import {
  INITIAL_EXCHANGE_INSTRUMENTS,
  INITIAL_ORDER_BOOK,
  INITIAL_RECENT_TRADES,
  INITIAL_USER_POSITIONS,
  INITIAL_PORTFOLIO_MARGIN,
  INITIAL_EXCHANGE_STRATEGIES,
  INITIAL_SURVEILLANCE_EVENTS,
  INITIAL_SOLVENCY_AUDIT,
  INITIAL_DETERMINISTIC_REPLAY_LOG
} from '../../data/omnifinExchangeData';

export const OmnifinRealtimeExchange: React.FC = () => {
  // Active selected instrument
  const [instruments, setInstruments] = useState<MarketInstrument[]>(INITIAL_EXCHANGE_INSTRUMENTS);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTC-PERP');

  // Order Book & Trade State
  const [orderBook, setOrderBook] = useState<RealtimeOrderBook>(INITIAL_ORDER_BOOK);
  const [recentTrades, setRecentTrades] = useState<MatchedTrade[]>(INITIAL_RECENT_TRADES);
  const [positions, setPositions] = useState<UserPosition[]>(INITIAL_USER_POSITIONS);
  const [portfolioMargin, setPortfolioMargin] = useState<PortfolioMarginState>(INITIAL_PORTFOLIO_MARGIN);
  const [surveillanceAlerts, setSurveillanceAlerts] = useState<MarketSurveillanceAlert[]>(INITIAL_SURVEILLANCE_EVENTS);
  const [strategies, setStrategies] = useState<AutonomousTradingStrategy[]>(INITIAL_EXCHANGE_STRATEGIES);
  const [solvencyAudit] = useState<ExchangeSolvencyAudit>(INITIAL_SOLVENCY_AUDIT);
  const [replayLog, setReplayLog] = useState<DeterministicEventRecord[]>(INITIAL_DETERMINISTIC_REPLAY_LOG);

  // Web3 Wallet & Exchange Deposit State
  const [showFundingModal, setShowFundingModal] = useState<boolean>(false);
  const [walletState, setWalletState] = useState<Web3WalletState>({
    isConnected: true,
    address: '0x71C8349281aE4aC9128490B82019482901a84b29',
    walletProvider: 'metamask',
    network: 'arbitrum',
    chainId: 42161,
    walletBalances: {
      usdo: 38400,
      btc: 1.45,
      eth: 12.8,
      sol: 85.0
    },
    isSignatureVerified: true
  });

  // Active Terminal View / Tab
  const [activeTerminalTab, setActiveTerminalTab] = useState<
    'TRADING' | 'WALLET_FUNDING' | 'ROUTING' | 'MARKET_MAKING' | 'SURVEILLANCE' | 'STRATEGIES' | 'CROSS_CHAIN_BANKING' | 'SOLVENCY' | 'REPLAY'
  >('TRADING');
  const [selectedAssetFilter, setSelectedAssetFilter] = useState<string>('ALL');

  // Web3 Wallet Handlers
  const handleConnectWallet = async (provider: Web3WalletProvider) => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum && provider === 'metamask') {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          setWalletState(prev => ({
            ...prev,
            isConnected: true,
            address: accounts[0],
            walletProvider: provider
          }));
          return;
        }
      }
    } catch (err) {
      console.warn('Web3 real connect fallback to simulated institutional provider', err);
    }

    setWalletState(prev => ({
      ...prev,
      isConnected: true,
      address: `0x71C8${Math.random().toString(16).substring(2, 6).toUpperCase()}...4B29`,
      walletProvider: provider,
      isSignatureVerified: true
    }));
  };

  const handleDisconnectWallet = () => {
    setWalletState(prev => ({
      ...prev,
      isConnected: false,
      address: null,
      walletProvider: null
    }));
  };

  const handleSwitchNetwork = (network: Web3Network) => {
    setWalletState(prev => ({
      ...prev,
      network,
      chainId: network === 'arbitrum' ? 42161 : network === 'ethereum' ? 1 : network === 'base' ? 8453 : network === 'polygon' ? 137 : 101
    }));
  };

  // Deposit funds to exchange margin balance
  const handleDepositFunds = (
    asset: string,
    amount: number,
    amountUsd: number,
    network: string,
    txHash: string
  ) => {
    setPortfolioMargin(prev => ({
      ...prev,
      availableMarginUsd: prev.availableMarginUsd + amountUsd,
      totalEquityUsd: prev.totalEquityUsd + amountUsd
    }));

    setReplayLog(prev => [
      {
        seq: prev.length + 1001,
        timestamp: new Date().toLocaleTimeString(),
        eventType: 'SETTLEMENT_FINALIZED',
        payloadSummary: `ON-CHAIN DEPOSIT CREDITED: +${amount} ${asset} ($${amountUsd.toLocaleString()}) via ${network} - Hash: ${txHash.substring(0, 10)}...`,
        stateRootHash: `0x${Math.random().toString(16).substring(2, 10)}`
      },
      ...prev
    ]);
  };

  // Withdraw funds from exchange margin balance
  const handleWithdrawFunds = (
    asset: string,
    amount: number,
    destinationAddress: string
  ) => {
    const amountUsd = asset === 'BTC' ? amount * 94850 : asset === 'ETH' ? amount * 3480 : amount;
    setPortfolioMargin(prev => ({
      ...prev,
      availableMarginUsd: Math.max(0, prev.availableMarginUsd - amountUsd),
      totalEquityUsd: Math.max(0, prev.totalEquityUsd - amountUsd)
    }));

    setReplayLog(prev => [
      {
        seq: prev.length + 1001,
        timestamp: new Date().toLocaleTimeString(),
        eventType: 'SETTLEMENT_FINALIZED',
        payloadSummary: `ON-CHAIN WITHDRAWAL: -${amount} ${asset} to ${destinationAddress.substring(0, 10)}... (MPC 3-of-5 Signed)`,
        stateRootHash: `0x${Math.random().toString(16).substring(2, 10)}`
      },
      ...prev
    ]);
  };

  // Smart Order Routing & Execution Quality State
  const [sorAggressiveness, setSorAggressiveness] = useState<'MIN_SLIPPAGE' | 'MIN_FEE' | 'MAX_SPEED' | 'TOTAL_RISK'>('TOTAL_RISK');
  const [sorSimulatedRoute, setSorSimulatedRoute] = useState<{
    internalNettingPct: number;
    cmeGlobexPct: number;
    deribitPct: number;
    zkRollupPct: number;
    uniswapV4Pct: number;
    effectiveSlippageBps: number;
    netSavingsUsd: number;
  }>({
    internalNettingPct: 62,
    cmeGlobexPct: 20,
    deribitPct: 10,
    zkRollupPct: 6,
    uniswapV4Pct: 2,
    effectiveSlippageBps: 0.12,
    netSavingsUsd: 1420.50
  });

  // Avellaneda-Stoikov Market Making Parameter Controls
  const [mmRiskAversion, setMmRiskAversion] = useState<number>(0.15); // gamma
  const [mmInventoryTarget, setMmInventoryTarget] = useState<number>(12); // target Q
  const [mmCurrentInventory, setMmCurrentInventory] = useState<number>(14.2); // current Q
  const [mmHalfSpreadBps, setMmHalfSpreadBps] = useState<number>(1.2);
  const [mmVolatilityEst, setMmVolatilityEst] = useState<number>(48.5); // sigma %

  // Order Form State
  const [orderSide, setOrderSide] = useState<OrderSide>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('LIMIT');
  const [orderPrice, setOrderPrice] = useState<string>('94850.50');
  const [orderQuantity, setOrderQuantity] = useState<string>('1.5');
  const [orderLeverage, setOrderLeverage] = useState<number>(10);
  const [timeInForce, setTimeInForce] = useState<TimeInForce>('GTC');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [orderPipelineStatus, setOrderPipelineStatus] = useState<string | null>(null);

  // Live Simulated Stream Toggle
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [lastTickTime, setLastTickTime] = useState<string>('Just now');
  const [orderBookViewMode, setOrderBookViewMode] = useState<'BOTH' | 'BIDS' | 'ASKS'>('BOTH');

  // Filtered instruments list
  const filteredInstruments = useMemo(() => {
    if (selectedAssetFilter === 'ALL') return instruments;
    return instruments.filter(i => i.type === selectedAssetFilter);
  }, [instruments, selectedAssetFilter]);

  const handleFilterChange = (filter: string) => {
    setSelectedAssetFilter(filter);
    const available = filter === 'ALL' ? instruments : instruments.filter(i => i.type === filter);
    if (available.length > 0 && !available.some(i => i.symbol === selectedSymbol)) {
      setSelectedSymbol(available[0].symbol);
    }
  };

  // Currently selected instrument spec
  const currentInstrument = useMemo(() => {
    return instruments.find(i => i.symbol === selectedSymbol) || instruments[0];
  }, [instruments, selectedSymbol]);

  // Sync order price default when switching instruments
  useEffect(() => {
    setOrderPrice(currentInstrument.lastPrice.toString());
  }, [selectedSymbol, currentInstrument]);

  // Real-time market tick generator simulation
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      // 1. Slightly fluctuate price (+- 0.05%)
      const deltaRatio = (Math.random() - 0.49) * 0.001;
      
      setInstruments(prev => prev.map(inst => {
        if (inst.symbol === selectedSymbol) {
          const newPrice = Number((inst.lastPrice * (1 + deltaRatio)).toFixed(2));
          const newHigh = Math.max(inst.high24h, newPrice);
          const newLow = Math.min(inst.low24h, newPrice);
          return {
            ...inst,
            lastPrice: newPrice,
            markPrice: Number((newPrice - 0.8).toFixed(2)),
            indexPrice: Number((newPrice - 0.4).toFixed(2)),
            high24h: newHigh,
            low24h: newLow
          };
        }
        return inst;
      }));

      // 2. Micro-adjust order book top levels
      setOrderBook(prev => {
        const topBid = prev.bids[0]?.price || 94850;
        const topAsk = prev.asks[0]?.price || 94851;
        const newBidQty = Number((Math.random() * 4 + 1.2).toFixed(2));
        const newAskQty = Number((Math.random() * 3 + 1.1).toFixed(2));

        const updatedBids = prev.bids.map((b, i) => i === 0 ? { ...b, quantity: newBidQty } : b);
        const updatedAsks = prev.asks.map((a, i) => i === 0 ? { ...a, quantity: newAskQty } : a);

        return {
          ...prev,
          bids: updatedBids,
          asks: updatedAsks,
          spread: Number((topAsk - topBid).toFixed(2)),
          lastUpdateSeq: prev.lastUpdateSeq + 1,
          timestamp: new Date().toLocaleTimeString()
        };
      });

      // 3. Occasionally generate a matched trade (every 2nd tick)
      if (Math.random() > 0.5) {
        const tradeSide = Math.random() > 0.5 ? 'BUY' : 'SELL';
        const tradePrice = currentInstrument.lastPrice;
        const tradeQty = Number((Math.random() * 1.8 + 0.1).toFixed(2));
        const newTrade: MatchedTrade = {
          tradeId: `TRD-${Math.floor(Math.random() * 9000000 + 1000000)}`,
          buyOrderId: `ORD-${Math.floor(Math.random() * 90000 + 10000)}`,
          sellOrderId: `ORD-${Math.floor(Math.random() * 90000 + 10000)}`,
          instrumentSymbol: selectedSymbol,
          price: tradePrice,
          quantity: tradeQty,
          amountUsd: Number((tradePrice * tradeQty).toFixed(2)),
          buyerParty: tradeSide === 'BUY' ? 'Avellaneda Market Maker' : 'Zurich Vault Enclave',
          sellerParty: tradeSide === 'BUY' ? 'Delta-Neutral Swarm #4' : 'Apex Prime Liquidity',
          feeUsd: Number((tradePrice * tradeQty * 0.0001).toFixed(2)),
          timestamp: new Date().toLocaleTimeString(),
          matchingSequence: Math.floor(Math.random() * 100000 + 500000),
          clearingStatus: 'SETTLED_FINAL',
          settlementRail: 'ATOMIC_INSTANT',
          proofHash: `0x${Math.random().toString(16).substring(2, 14)}`
        };

        setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]);
      }

      setLastTickTime(new Date().toLocaleTimeString());
    }, 1200);

    return () => clearInterval(interval);
  }, [isLiveStreaming, selectedSymbol, currentInstrument]);

  // Order Submission Pipeline Simulation
  const handleExecuteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingOrder(true);
    setOrderPipelineStatus('Initiating Pre-Trade Risk & Security Pipeline...');

    // Step 1: Pre-trade Verification & Policy Check
    setTimeout(() => {
      setOrderPipelineStatus('Verifying: Identity (MPC) → Balance ($1.48M) → Margin Haircut (1.5%) → Security Firewall → Zero Spoofing...');
    }, 400);

    // Step 2: Booked & Matched
    setTimeout(() => {
      const price = parseFloat(orderPrice) || currentInstrument.lastPrice;
      const qty = parseFloat(orderQuantity) || 1.0;
      const amount = price * qty;
      const initialMarginReq = amount / orderLeverage;

      // Check if user has available margin
      if (initialMarginReq > portfolioMargin.availableMarginUsd) {
        setIsSubmittingOrder(false);
        setOrderPipelineStatus(`ORDER REJECTED BY RISK ENGINE: Insufficient Available Margin ($${initialMarginReq.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} required, only $${portfolioMargin.availableMarginUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} available). Click "+ $50k Free" or "Deposit / QR" above to fund your account.`);
        return;
      }

      // Add to matched trades
      const newTrade: MatchedTrade = {
        tradeId: `TRD-${Math.floor(Math.random() * 9000000 + 1000000)}`,
        buyOrderId: `ORD-${Math.floor(Math.random() * 90000 + 10000)}`,
        sellOrderId: `ORD-RESTING-BOOK`,
        instrumentSymbol: selectedSymbol,
        price,
        quantity: qty,
        amountUsd: Number(amount.toFixed(2)),
        buyerParty: orderSide === 'BUY' ? 'You (Meek Ifti / Sovereign Key)' : 'Apex Prime Liquidity',
        sellerParty: orderSide === 'SELL' ? 'You (Meek Ifti / Sovereign Key)' : 'Avellaneda Market Maker',
        feeUsd: Number((amount * 0.0001).toFixed(2)),
        timestamp: new Date().toLocaleTimeString(),
        matchingSequence: Math.floor(Math.random() * 100000 + 500000),
        clearingStatus: 'SETTLED_FINAL',
        settlementRail: 'ATOMIC_INSTANT',
        proofHash: `0x${Math.random().toString(16).substring(2, 14)}`
      };

      setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]);

      // Update position
      setPositions(prev => {
        const existing = prev.find(p => p.instrumentSymbol === selectedSymbol);
        const positionSide = orderSide === 'BUY' ? 'LONG' : 'SHORT';
        if (existing) {
          const newSize = positionSide === existing.side ? existing.size + qty : Math.max(0.1, existing.size - qty);
          return prev.map(p => p.instrumentSymbol === selectedSymbol ? {
            ...p,
            size: Number(newSize.toFixed(2)),
            initialMargin: Number(((price * newSize) / orderLeverage).toFixed(2))
          } : p);
        } else {
          return [
            ...prev,
            {
              id: `pos-${Date.now()}`,
              instrumentSymbol: selectedSymbol,
              side: orderSide === 'BUY' ? 'LONG' : 'SHORT',
              size: qty,
              entryPrice: price,
              markPrice: price,
              liquidationPrice: orderSide === 'BUY' ? price * 0.82 : price * 1.18,
              leverage: orderLeverage,
              initialMargin: Number(initialMarginReq.toFixed(2)),
              maintenanceMargin: Number((amount * 0.015).toFixed(2)),
              marginRatioPct: 3.2,
              unrealizedPnl: 0,
              unrealizedPnlPct: 0,
              realizedPnl: 0,
              settlementMode: 'ATOMIC_INSTANT'
            }
          ];
        }
      });

      // Update Margin State
      setPortfolioMargin(prev => ({
        ...prev,
        usedMarginUsd: prev.usedMarginUsd + initialMarginReq,
        availableMarginUsd: Math.max(0, prev.availableMarginUsd - initialMarginReq)
      }));

      // Add to deterministic replay log
      setReplayLog(prev => [
        {
          seq: prev.length + 1001,
          timestamp: new Date().toLocaleTimeString(),
          eventType: 'MATCH_EXECUTED',
          payloadSummary: `${orderSide} ${qty} ${selectedSymbol} @ $${price} (${orderLeverage}x) - PROOF VERIFIED`,
          stateRootHash: `0x${Math.random().toString(16).substring(2, 10)}`
        },
        ...prev
      ]);

      setIsSubmittingOrder(false);
      setOrderPipelineStatus(`MATCHED & SETTLED: ${orderSide} ${qty} ${selectedSymbol} @ $${price.toLocaleString()} filled in 0.34ms via Price-Time Priority. 10/10 Proofs Sealed.`);
    }, 850);
  };

  // Close Position
  const handleClosePosition = (posId: string) => {
    setPositions(prev => {
      const target = prev.find(p => p.id === posId);
      if (target) {
        setPortfolioMargin(m => ({
          ...m,
          usedMarginUsd: Math.max(0, m.usedMarginUsd - target.initialMargin),
          availableMarginUsd: m.availableMarginUsd + target.initialMargin + target.unrealizedPnl,
          totalEquityUsd: m.totalEquityUsd + target.unrealizedPnl
        }));
      }
      return prev.filter(p => p.id !== posId);
    });
  };

  // Toggle Strategy Status
  const handleToggleStrategy = (stratId: string) => {
    setStrategies(prev => prev.map(s => {
      if (s.id === stratId) {
        const nextStatus = s.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  // Estimated Liquidation Price for order form
  const estimatedLiquidationPrice = useMemo(() => {
    const price = parseFloat(orderPrice) || currentInstrument.lastPrice;
    if (orderSide === 'BUY') {
      return price * (1 - (1 / orderLeverage) * 0.9);
    } else {
      return price * (1 + (1 / orderLeverage) * 0.9);
    }
  }, [orderPrice, orderLeverage, orderSide, currentInstrument]);

  return (
    <div className="space-y-5 text-slate-900 font-sans">
      
      {/* 1. TOP TICKER & INSTRUMENT SELECTOR BAR */}
      <div className="bg-[#0b1322] border border-slate-800 rounded-2xl p-4 text-white shadow-xl space-y-3">
        
        {/* Asset Class Filter Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono border-b border-slate-800/80">
          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mr-1">Market:</span>
          {['ALL', 'SPOT', 'MARGIN', 'FUTURES', 'OPTIONS', 'PERPETUAL', 'SWAP', 'RWA'].map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer whitespace-nowrap ${
                selectedAssetFilter === cat 
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-xs' 
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left: Instrument Selector & Live Price */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="bg-slate-900 text-sm sm:text-base font-black font-mono text-cyan-300 border border-slate-700 rounded-xl px-3 py-1.5 focus:outline-hidden focus:border-cyan-400 cursor-pointer shadow-inner"
              >
                {filteredInstruments.map(inst => (
                  <option key={inst.symbol} value={inst.symbol}>
                    {inst.symbol} ({inst.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Price & 24h Delta */}
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-xl sm:text-2xl font-black text-white">
                ${currentInstrument.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                currentInstrument.change24h >= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {currentInstrument.change24h >= 0 ? '+' : ''}{currentInstrument.change24h}%
              </span>
            </div>
          </div>

          {/* Center: Live Key Metrics */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Mark Price</div>
              <div className="font-bold text-slate-200 mt-0.5">${currentInstrument.markPrice.toFixed(2)}</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Index Price</div>
              <div className="font-bold text-slate-200 mt-0.5">${currentInstrument.indexPrice.toFixed(2)}</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">24h Volume</div>
              <div className="font-bold text-cyan-300 mt-0.5">${(currentInstrument.volume24hUsd / 1000000).toFixed(1)}M</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Open Interest</div>
              <div className="font-bold text-purple-300 mt-0.5">${(currentInstrument.openInterestUsd / 1000000).toFixed(1)}M</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Funding Rate (42m)</div>
              <div className="font-bold text-amber-300 mt-0.5">+{currentInstrument.fundingRatePct}%</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Spread</div>
              <div className="font-bold text-emerald-300 mt-0.5">${orderBook.spread} ({currentInstrument.spreadBps} bps)</div>
            </div>
          </div>

          {/* Right: Web3 Wallet Status, Deposit & Live Stream Toggle */}
          <div className="flex flex-wrap items-center gap-2 self-end lg:self-auto font-mono text-xs">
            
            {/* 1. Deposit / Receiving Address Button */}
            <button
              onClick={() => setShowFundingModal(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              title="Generate Deposit Receiving Address and QR Code"
            >
              <QrCode className="w-3.5 h-3.5 text-cyan-300" />
              <span>Deposit / Receive</span>
            </button>

            {/* 2. Instant Faucet Shortcut */}
            <button
              onClick={() => handleDepositFunds('USD-O', 50000, 50000, 'Instant Faucet', `0x${Math.random().toString(16).substring(2, 10)}`)}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1 transition cursor-pointer"
              title="Instantly Inject $50,000 USD-O Testnet Margin"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>+ $50k Free</span>
            </button>

            {/* 3. Connected Web3 Wallet Pill */}
            <button
              onClick={() => setActiveTerminalTab('WALLET_FUNDING')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="View Connected Wallet & Multi-Rail Bridge"
            >
              <Wallet className="w-3.5 h-3.5 text-blue-400" />
              {walletState.isConnected && walletState.address ? (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-cyan-300">{walletState.address.substring(0, 6)}...{walletState.address.substring(walletState.address.length - 4)}</span>
                  <span className="text-[10px] text-slate-400 uppercase hidden sm:inline">({walletState.network})</span>
                </span>
              ) : (
                <span className="text-amber-400">Connect Web3</span>
              )}
            </button>

            {/* 4. Stream Toggle */}
            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`px-2.5 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                isLiveStreaming 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="Toggle Live Price & Order Book Ingestion"
            >
              {isLiveStreaming ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-slate-400" />}
              <span>{isLiveStreaming ? 'LIVE' : 'PAUSED'}</span>
            </button>
          </div>

        </div>

        {/* Dynamic Contract Specification & Greeks Banner */}
        {currentInstrument.type === 'OPTIONS' && currentInstrument.optionDetails && (
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 font-mono text-xs text-purple-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-black text-[10px]">
                {currentInstrument.optionDetails.optionSide} OPTION
              </span>
              <span>Strike: <strong className="text-white">${currentInstrument.optionDetails.strikePrice.toLocaleString()}</strong></span>
              <span>Expiry: <strong className="text-white">{new Date(currentInstrument.optionDetails.expiryDate).toLocaleDateString()}</strong></span>
              <span>IV: <strong className="text-amber-300">{currentInstrument.optionDetails.impliedVolatilityPct}%</strong></span>
            </div>
            <div className="flex items-center gap-3 text-[11px] bg-slate-950/60 px-3 py-1 rounded-lg border border-purple-900/60">
              <span title="Delta: Option price change per $1 underlying move">Δ: <strong className="text-cyan-300">{currentInstrument.optionDetails.delta > 0 ? '+' : ''}{currentInstrument.optionDetails.delta}</strong></span>
              <span title="Gamma: Delta change per $1 underlying move">Γ: <strong className="text-cyan-300">{currentInstrument.optionDetails.gamma}</strong></span>
              <span title="Theta: Daily time decay per contract">Θ: <strong className="text-rose-400">{currentInstrument.optionDetails.theta}/day</strong></span>
              <span title="Vega: Price change per 1% implied vol shift">ν: <strong className="text-emerald-400">${currentInstrument.optionDetails.vega}</strong></span>
            </div>
          </div>
        )}

        {currentInstrument.type === 'SWAP' && currentInstrument.swapDetails && (
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 font-mono text-xs text-blue-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-black text-[10px]">
                INTEREST RATE SWAP (IRS)
              </span>
              <span>Fixed Rate: <strong className="text-white">{currentInstrument.swapDetails.fixedRatePct}%</strong></span>
              <span>Floating Benchmark: <strong className="text-cyan-300">{currentInstrument.swapDetails.floatingBenchmark}</strong></span>
              <span>Tenor: <strong className="text-white">{currentInstrument.swapDetails.tenor}</strong></span>
            </div>
            <div className="text-[11px] text-emerald-300 bg-slate-950/60 px-3 py-1 rounded-lg border border-blue-900/60">
              Settlement: {currentInstrument.swapDetails.settlementFrequency} • Max Leverage: 50x
            </div>
          </div>
        )}

        {currentInstrument.type === 'FUTURES' && currentInstrument.futuresDetails && (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 font-mono text-xs text-amber-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-black text-[10px]">
                DATED FUTURE
              </span>
              <span>Expiry: <strong className="text-white">{new Date(currentInstrument.futuresDetails.expiryDate).toLocaleDateString()}</strong></span>
              <span>Basis Premium: <strong className="text-emerald-300">+{currentInstrument.futuresDetails.basisBps} bps</strong></span>
              <span>Settlement: <strong className="text-white">{currentInstrument.futuresDetails.settlementType} FINALITY</strong></span>
            </div>
            <div className="text-[11px] text-slate-300 bg-slate-950/60 px-3 py-1 rounded-lg border border-amber-900/60">
              CME Globex Basis Offset Active • Max Leverage: 30x
            </div>
          </div>
        )}

        {/* Cross-Venue Arbitrage Strip */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-300 flex items-center gap-1">
              <Globe2 className="w-3 h-3 text-cyan-400" /> Cross-Venue References:
            </span>
            <span>Binance: <strong className="text-slate-200">${currentInstrument.externalVenues.binanceRef.toFixed(2)}</strong></span>
            <span>Deribit: <strong className="text-slate-200">${currentInstrument.externalVenues.deribitRef.toFixed(2)}</strong></span>
            <span>CME Globex: <strong className="text-slate-200">${currentInstrument.externalVenues.cmeRef.toFixed(2)}</strong></span>
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Matching Engine: Price-Time Priority • Deterministic • Zero Front-Running</span>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY NAVIGATION: EXCHANGE SURFACES */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'TRADING', label: 'Trading & Order Book', icon: BarChart3 },
            { id: 'WALLET_FUNDING', label: 'Web3 Wallet & Deposit', icon: Wallet, highlight: true },
            { id: 'ROUTING', label: 'Smart Order Routing (SOR)', icon: GitBranch },
            { id: 'MARKET_MAKING', label: 'Market Making & Skew', icon: Sliders },
            { id: 'SURVEILLANCE', label: 'Surveillance & Integrity', icon: ShieldAlert },
            { id: 'STRATEGIES', label: 'Autonomous Agents', icon: Bot },
            { id: 'CROSS_CHAIN_BANKING', label: 'Cross-Chain & Fiat Banking', icon: ArrowLeftRight },
            { id: 'SOLVENCY', label: 'Proof of Solvency', icon: Landmark },
            { id: 'REPLAY', label: 'Deterministic Replay', icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTerminalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTerminalTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer whitespace-nowrap ${
                  isSelected 
                    ? 'bg-[#132338] text-white shadow-xs' 
                    : tab.highlight
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : tab.highlight ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.highlight && !isSelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Global SLA Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 font-mono text-xs text-slate-500">
          <span>Engine Seq: #{orderBook.lastUpdateSeq}</span>
        </div>
      </div>

      {/* 3. PRIMARY TRADING SURFACE: ORDER BOOK, ORDER FORM & TRADES */}
      {activeTerminalTab === 'TRADING' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* 3A. REAL-TIME ORDER BOOK (COL 1-4) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span className="font-mono font-black text-xs text-slate-900">Real-Time Order Book</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono">
                    <button
                      onClick={() => setOrderBookViewMode('BOTH')}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${orderBookViewMode === 'BOTH' ? 'bg-slate-900 text-white font-bold' : 'text-slate-500'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setOrderBookViewMode('BIDS')}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${orderBookViewMode === 'BIDS' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-500'}`}
                    >
                      Bids
                    </button>
                    <button
                      onClick={() => setOrderBookViewMode('ASKS')}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${orderBookViewMode === 'ASKS' ? 'bg-rose-600 text-white font-bold' : 'text-slate-500'}`}
                    >
                      Asks
                    </button>
                  </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-3 text-[10px] font-mono text-slate-400 py-2 border-b border-slate-50">
                  <span>Price (USD-O)</span>
                  <span className="text-right">Size ({currentInstrument.baseAsset})</span>
                  <span className="text-right">Total Depth</span>
                </div>

                {/* Asks (Sell Orders) - Red */}
                {(orderBookViewMode === 'BOTH' || orderBookViewMode === 'ASKS') && (
                  <div className="space-y-0.5 py-1">
                    {[...orderBook.asks].reverse().map((ask, idx) => (
                      <div
                        key={`ask-${idx}`}
                        className="grid grid-cols-3 text-xs font-mono py-1 px-1 rounded hover:bg-rose-50/60 transition relative overflow-hidden"
                      >
                        {/* Visual Depth Bar */}
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-rose-100/60 -z-0 transition-all duration-300"
                          style={{ width: `${ask.depthPct}%` }}
                        />
                        <span className="font-bold text-rose-600 z-10">{ask.price.toFixed(2)}</span>
                        <span className="text-right text-slate-700 z-10">{ask.quantity.toFixed(2)}</span>
                        <span className="text-right text-slate-400 text-[11px] z-10">{ask.totalQuantity.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mid-Market Spread Banner */}
                <div className="py-2.5 my-1 px-3 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-[10px]">MID:</span>
                    <span className="font-black text-cyan-300">${orderBook.midPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Spread: <span className="text-emerald-400 font-bold">${orderBook.spread}</span>
                  </div>
                </div>

                {/* Bids (Buy Orders) - Green */}
                {(orderBookViewMode === 'BOTH' || orderBookViewMode === 'BIDS') && (
                  <div className="space-y-0.5 py-1">
                    {orderBook.bids.map((bid, idx) => (
                      <div
                        key={`bid-${idx}`}
                        className="grid grid-cols-3 text-xs font-mono py-1 px-1 rounded hover:bg-emerald-50/60 transition relative overflow-hidden"
                      >
                        {/* Visual Depth Bar */}
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-emerald-100/60 -z-0 transition-all duration-300"
                          style={{ width: `${bid.depthPct}%` }}
                        />
                        <span className="font-bold text-emerald-600 z-10">{bid.price.toFixed(2)}</span>
                        <span className="text-right text-slate-700 z-10">{bid.quantity.toFixed(2)}</span>
                        <span className="text-right text-slate-400 text-[11px] z-10">{bid.totalQuantity.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Book Footer Metadata */}
              <div className="pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>Queue: Price-Time Priority</span>
                <span>Seq: #{orderBook.lastUpdateSeq}</span>
              </div>
            </div>

            {/* 3B. DETERMINISTIC ORDER ENTRY & PRE-TRADE RISK (COL 5-8) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="font-mono font-black text-xs text-slate-900">Pre-Trade Risk &amp; Order Entry</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  10/10 Invariants Protected
                </span>
              </div>

              {/* Live Trading Margin & Quick Deposit Actions */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Wallet className="w-3 h-3 text-blue-600" />
                    <span>Free Margin Available:</span>
                  </div>
                  <div className="text-sm font-black text-emerald-700 mt-0.5">
                    ${portfolioMargin.availableMarginUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[10px] text-slate-400 font-normal">USD-O</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDepositFunds('USD-O', 50000, 50000, 'Instant Faucet', `0x${Math.random().toString(16).substring(2, 10)}`)}
                    className="px-2 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[10px] cursor-pointer transition border border-emerald-300 shadow-xs"
                    title="Quick Fund +$50,000"
                  >
                    + $50k Faucet
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFundingModal(true)}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] cursor-pointer transition flex items-center gap-1 shadow-xs"
                    title="Open Web3 Deposit & Receiving Address"
                  >
                    <QrCode className="w-3 h-3" />
                    <span>Deposit / QR</span>
                  </button>
                </div>
              </div>

              {/* Buy / Sell Side Switcher */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderSide('BUY')}
                  className={`py-2 rounded-xl font-mono text-xs font-black transition cursor-pointer ${
                    orderSide === 'BUY'
                      ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  BUY / LONG
                </button>
                <button
                  type="button"
                  onClick={() => setOrderSide('SELL')}
                  className={`py-2 rounded-xl font-mono text-xs font-black transition cursor-pointer ${
                    orderSide === 'SELL'
                      ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  SELL / SHORT
                </button>
              </div>

              {/* Order Type & Time In Force */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-600 mb-1">Order Type</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as OrderType)}
                    className="w-full bg-slate-50 text-xs font-mono text-slate-800 border border-slate-300 rounded-xl px-2.5 py-2 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="LIMIT">LIMIT (Resting Depth)</option>
                    <option value="MARKET">MARKET (Immediate Fill)</option>
                    <option value="STOP_LIMIT">STOP-LIMIT</option>
                    <option value="TAKE_PROFIT">TAKE-PROFIT</option>
                    <option value="ICEBERG">ICEBERG (Hidden Reserve)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-600 mb-1">Time in Force</label>
                  <select
                    value={timeInForce}
                    onChange={(e) => setTimeInForce(e.target.value as TimeInForce)}
                    className="w-full bg-slate-50 text-xs font-mono text-slate-800 border border-slate-300 rounded-xl px-2.5 py-2 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="GTC">Good-Till-Cancel (GTC)</option>
                    <option value="IOC">Immediate-Or-Cancel (IOC)</option>
                    <option value="FOK">Fill-Or-Kill (FOK)</option>
                  </select>
                </div>
              </div>

              {/* Price & Quantity Input */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-600 mb-1">Price (USD-O)</label>
                  <input
                    type="number"
                    step="0.1"
                    disabled={orderType === 'MARKET'}
                    value={orderPrice}
                    onChange={(e) => setOrderPrice(e.target.value)}
                    className="w-full bg-slate-50 text-xs font-mono font-bold text-slate-900 border border-slate-300 rounded-xl px-3 py-2 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-600 mb-1">Size ({currentInstrument.baseAsset})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(e.target.value)}
                    className="w-full bg-slate-50 text-xs font-mono font-bold text-slate-900 border border-slate-300 rounded-xl px-3 py-2 focus:bg-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Leverage Slider */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600 font-bold">Leverage:</span>
                  <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {orderLeverage}x (Max: {currentInstrument.maxLeverage}x)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={currentInstrument.maxLeverage}
                  value={orderLeverage}
                  onChange={(e) => setOrderLeverage(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>1x (Spot)</span>
                  <span>10x</span>
                  <span>25x</span>
                  <span>{currentInstrument.maxLeverage}x</span>
                </div>
              </div>

              {/* Pre-Trade Calculation Card */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Order Value:</span>
                  <strong className="text-slate-900">
                    ${((parseFloat(orderPrice) || currentInstrument.lastPrice) * (parseFloat(orderQuantity) || 1)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Initial Margin Required:</span>
                  <strong className="text-blue-700">
                    ${(((parseFloat(orderPrice) || currentInstrument.lastPrice) * (parseFloat(orderQuantity) || 1)) / orderLeverage).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Est. Liquidation Price:</span>
                  <strong className="text-rose-600">
                    ${estimatedLiquidationPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleExecuteOrder}
                disabled={isSubmittingOrder}
                className={`w-full py-3 rounded-xl font-mono text-xs font-black text-white shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  orderSide === 'BUY'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
                    : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500'
                }`}
              >
                <Play className={`w-3.5 h-3.5 ${isSubmittingOrder ? 'animate-spin' : ''}`} />
                <span>
                  {isSubmittingOrder ? 'Validating Rails & Matching...' : `${orderSide} ${orderQuantity} ${selectedSymbol}`}
                </span>
              </button>

              {/* Pipeline Status Message */}
              {orderPipelineStatus && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-900 leading-relaxed">
                  {orderPipelineStatus}
                </div>
              )}
            </div>

            {/* 3C. LIVE TRADES & MATCHING ENGINE STREAM (COL 9-12) */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span className="font-mono font-black text-xs text-slate-900">Matched Trades Stream</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">
                    Atomic Finality
                  </span>
                </div>

                <div className="grid grid-cols-3 text-[10px] font-mono text-slate-400 py-2 border-b border-slate-50">
                  <span>Price</span>
                  <span className="text-right">Size</span>
                  <span className="text-right">Time</span>
                </div>

                <div className="space-y-1 py-1 max-h-96 overflow-y-auto scrollbar-thin">
                  {recentTrades.map((t, idx) => (
                    <div
                      key={t.tradeId + idx}
                      className="grid grid-cols-3 text-xs font-mono py-1 px-1 rounded hover:bg-slate-50 transition"
                    >
                      <span className="font-bold text-slate-900">${t.price.toFixed(2)}</span>
                      <span className="text-right text-slate-600">{t.quantity.toFixed(2)}</span>
                      <span className="text-right text-slate-400 text-[10px]">{t.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settled Rail Badge */}
              <div className="pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>Clearing: OMNIFIN Mesh</span>
                <span>Zero Contagion</span>
              </div>
            </div>

          </div>

          {/* 4. REAL-TIME PORTFOLIO, POSITIONS & MARGIN MONITOR */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900 font-mono">Real-Time Positions &amp; Margin Ledger</h3>
                <p className="text-xs text-slate-500">Live positions across spot, perpetuals, synthetic equities, and tokenized T-Bills</p>
              </div>

              {/* Portfolio Margin Summary Pills */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <div className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Equity:</span> <strong className="text-slate-900">${portfolioMargin.totalEquityUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
                <div className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Available:</span> <strong className="text-emerald-700">${portfolioMargin.availableMarginUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
                <div className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Used:</span> <strong className="text-blue-700">${portfolioMargin.usedMarginUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  Risk Status: {portfolioMargin.liquidationRisk}
                </div>
              </div>
            </div>

            {/* Positions Table */}
            {positions.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-slate-400 bg-slate-50 rounded-xl">
                No active open positions. Submit an order above to execute.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-2.5">Instrument</th>
                      <th className="px-4 py-2.5">Side / Size</th>
                      <th className="px-4 py-2.5">Entry Price</th>
                      <th className="px-4 py-2.5">Mark Price</th>
                      <th className="px-4 py-2.5">Liq. Price</th>
                      <th className="px-4 py-2.5">Margin (Lev)</th>
                      <th className="px-4 py-2.5">Unrealized PnL</th>
                      <th className="px-4 py-2.5">Settlement Rail</th>
                      <th className="px-4 py-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {positions.map((pos) => (
                      <tr key={pos.id} className="hover:bg-slate-50/80 transition">
                        <td className="px-4 py-3 font-bold text-slate-900">{pos.instrumentSymbol}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pos.side === 'LONG' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {pos.side} {pos.size}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-700">${pos.entryPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-700 font-bold">${pos.markPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-rose-600 font-bold">${pos.liquidationPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-600">${pos.initialMargin.toFixed(0)} ({pos.leverage}x)</td>
                        <td className={`px-4 py-3 font-black ${pos.unrealizedPnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {pos.unrealizedPnl >= 0 ? '+' : ''}${pos.unrealizedPnl.toFixed(2)} ({pos.unrealizedPnlPct}%)
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-[10px]">{pos.settlementMode}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleClosePosition(pos.id)}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-[10px] font-bold transition cursor-pointer"
                          >
                            Close Position
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3.1 SMART ORDER ROUTING (SOR) & LIQUIDITY AGGREGATION (SECTION 16) */}
      {activeTerminalTab === 'ROUTING' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 font-mono">Smart Order Routing (SOR) &amp; Cross-Venue Liquidity Aggregation</h3>
              <p className="text-xs text-slate-500">Evaluates Price + Liquidity Depth + Slippage + Settlement Risk + Gas/Venue Fees + Counterparty Integrity</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">Routing Mode:</span>
              <select
                value={sorAggressiveness}
                onChange={(e) => setSorAggressiveness(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-800"
              >
                <option value="TOTAL_RISK">Total Risk Optimized (Default)</option>
                <option value="MIN_SLIPPAGE">Minimum Market Slippage</option>
                <option value="MIN_FEE">Lowest All-In Venue Fees</option>
                <option value="MAX_SPEED">Sub-Millisecond Atomic Speed</option>
              </select>
            </div>
          </div>

          {/* Route Decomposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950">OMNIFIN Netting Pool</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-200 text-blue-900 font-black text-[10px]">62%</span>
                </div>
                <div className="text-[10px] text-blue-700 mt-1">Internal Atomic Settlement</div>
              </div>
              <div className="mt-3 pt-2 border-t border-blue-200 text-[11px]">
                <div>Slippage: <strong className="text-emerald-700">0.00 bps</strong></div>
                <div>Fee: <strong className="text-slate-800">0.01%</strong></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">CME Globex Gateway</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-black text-[10px]">20%</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Institutional Cash/Future DvP</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 text-[11px]">
                <div>Slippage: <strong className="text-slate-700">0.24 bps</strong></div>
                <div>Fee: <strong className="text-slate-800">0.02%</strong></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Deribit Institutional</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-black text-[10px]">10%</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">European Options &amp; Futures</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 text-[11px]">
                <div>Slippage: <strong className="text-slate-700">0.31 bps</strong></div>
                <div>Fee: <strong className="text-slate-800">0.03%</strong></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Ethereum ZK Rollup</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-black text-[10px]">6%</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Verifiable Cryptographic Proofs</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 text-[11px]">
                <div>Slippage: <strong className="text-slate-700">0.45 bps</strong></div>
                <div>Fee: <strong className="text-slate-800">0.04%</strong></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Uniswap V4 Hooks</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-black text-[10px]">2%</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Concentrated Liquidity Tail</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 text-[11px]">
                <div>Slippage: <strong className="text-slate-700">0.82 bps</strong></div>
                <div>Fee: <strong className="text-slate-800">0.05%</strong></div>
              </div>
            </div>
          </div>

          {/* Aggregate Execution Quality Summary */}
          <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-slate-400 text-[10px]">Effective Routing Slippage</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">0.12 bps (Near-Zero)</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-slate-400 text-[10px]">TCOE Net Capital Savings</div>
                <div className="text-base font-black text-cyan-300 mt-0.5">+$1,420.50 per 10 BTC</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 max-w-md">
              The OMNIFIN SOR engine guarantees no order crosses the spread blindly. 100% of routes maintain continuous proof of non-manipulation.
            </div>
          </div>
        </div>
      )}

      {/* 3.2 AUTOMATED MARKET MAKING & INVENTORY SKEW (SECTION 14) */}
      {activeTerminalTab === 'MARKET_MAKING' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 font-mono">Autonomous Market Making Engine (Avellaneda-Stoikov Core)</h3>
              <p className="text-xs text-slate-500">Computes reservation price r(s,q) = s - q*γ*σ²*(T-t) and quotes optimal asymmetric bid-ask spreads</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              Delta-Neutral Active
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-mono text-xs">
            {/* Parameters Control */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="font-black text-slate-900 text-sm">Inventory Skew Parameters</div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Risk Aversion (γ):</span>
                  <strong className="text-slate-900">{mmRiskAversion}</strong>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={mmRiskAversion}
                  onChange={(e) => setMmRiskAversion(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Quoted Half-Spread (bps):</span>
                  <strong className="text-slate-900">{mmHalfSpreadBps} bps</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={mmHalfSpreadBps}
                  onChange={(e) => setMmHalfSpreadBps(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Target Inventory (Q):</span>
                  <strong className="text-slate-900">{mmInventoryTarget} BTC</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={mmInventoryTarget}
                  onChange={(e) => setMmInventoryTarget(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Inventory & Skew Calculations */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="font-black text-slate-900 text-sm">Live Valuation &amp; Reservation</div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-slate-400">Current Inventory (q)</div>
                  <div className="text-base font-black text-slate-900 mt-0.5">{mmCurrentInventory} BTC</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-slate-400">Inventory Delta</div>
                  <div className="text-base font-black text-amber-600 mt-0.5">+{(mmCurrentInventory - mmInventoryTarget).toFixed(1)} BTC</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950">
                <div className="font-bold mb-1">Calculated Reservation Price:</div>
                <div className="text-lg font-black text-emerald-800">
                  ${(currentInstrument.lastPrice - (mmCurrentInventory - mmInventoryTarget) * 2.8).toFixed(2)}
                </div>
                <div className="text-[10px] text-emerald-700 mt-1">
                  Quotes are skewed lower to attract buyers and offload excess +2.2 BTC surplus inventory.
                </div>
              </div>
            </div>

            {/* Active Quotes Matrix */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
              <div className="font-black text-sm text-cyan-300">Active Skewed Market Making Quotes</div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Bid (Buy):</span>
                  <span className="font-bold text-emerald-400">${(currentInstrument.lastPrice - 5.50).toFixed(2)} (Qty: 2.8 BTC)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ask (Sell):</span>
                  <span className="font-bold text-rose-400">${(currentInstrument.lastPrice + 2.20).toFixed(2)} (Qty: 4.5 BTC)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                  <span>Asymmetry Bias:</span>
                  <span className="text-amber-400">Aggressive Sell Skew</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 leading-relaxed">
                Delta hedge triggers automatically if inventory delta exceeds ±5 BTC, executing an offsetting future hedge on CME Globex.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3.3 CROSS-CHAIN SETTLEMENT & BANKING/FIAT CONNECTIVITY (SECTION 19 & 27) */}
      {activeTerminalTab === 'CROSS_CHAIN_BANKING' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900">Multi-Rail Cross-Chain Settlement &amp; Fiat Banking Corridors</h3>
              <p className="text-xs text-slate-500 font-sans">Direct clearing and DvP settlement through FedNow RTGS, SEPA Instant, SWIFT ISO 20022, and atomic cryptographic light client bridges</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
              All 6 Rails Operational
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* FedNow Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900">FedNow (Federal Reserve RTGS)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">LIVE 24/7</span>
              </div>
              <p className="text-slate-600 text-[11px]">Instant USD settlement against Federal Reserve Master Account with sub-2-second finality.</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500">
                <span>Throughput: 8,500 tx/s</span>
                <span>Finality: 1.4s</span>
              </div>
            </div>

            {/* SEPA Instant Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900">SEPA Instant (SCT Inst)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">EUR CLEARING</span>
              </div>
              <p className="text-slate-600 text-[11px]">European pan-continental real-time payments corridor supporting automated DvP against tokenized securities.</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500">
                <span>Max Limit: €100,000,000</span>
                <span>Finality: 2.1s</span>
              </div>
            </div>

            {/* SWIFT ISO 20022 Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900">SWIFT ISO 20022 Gateway</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">pacs.008 / pacs.009</span>
              </div>
              <p className="text-slate-600 text-[11px]">Standardized financial messages with end-to-end UETR cryptographic tracking and instant reconciliation.</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500">
                <span>Format: XML ISO 20022</span>
                <span>Recon: Continuous</span>
              </div>
            </div>

            {/* Ethereum ZK Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900">Ethereum L1 &amp; Arbitrum ZK</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">ZK-SNARK PROOFS</span>
              </div>
              <p className="text-slate-600 text-[11px]">Atomic dual-custody settlement with zero trust requirement. State commitments verified on Ethereum mainnet.</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500">
                <span>Gas Overhead: 12.4k gas/tx</span>
                <span>Proof: Groth16</span>
              </div>
            </div>

            {/* Solana SVM Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900">Solana SVM Atomic Mesh</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">400ms FINALITY</span>
              </div>
              <p className="text-slate-600 text-[11px]">Sub-second high-velocity collateral rebalancing and instant cross-asset atomic margin transfers.</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500">
                <span>Fee: $0.00025/tx</span>
                <span>Finality: 0.4s</span>
              </div>
            </div>

            {/* Bitcoin Lightning Mesh */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900">Bitcoin Lightning Mesh</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">ATOMIC HTLC</span>
              </div>
              <p className="text-slate-600 text-[11px]">Microsecond atomic payments channels with cryptographic hash-time locked contracts (HTLC) for instant BTC settlement.</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500">
                <span>Liquidity Pool: 450 BTC</span>
                <span>Finality: Instant</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MARKET SURVEILLANCE & ANTI-SPOOFING (SECTION 8 & 34) */}
      {activeTerminalTab === 'SURVEILLANCE' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 font-mono">Real-Time Market Integrity &amp; Surveillance Core</h3>
              <p className="text-xs text-slate-500">Autonomous detection of wash-trading, spoofing, quote stuffing, and circular market manipulation</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              Surveillance Engine Active
            </span>
          </div>

          <div className="space-y-4">
            {surveillanceAlerts.map(alert => (
              <div key={alert.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">{alert.symbol}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      alert.severity === 'HIGH' ? 'bg-rose-100 text-rose-800' :
                      alert.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.category} ({alert.severity})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Seq: #{alert.seq} • {alert.timestamp}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-400 font-bold mb-1">OBSERVED FACT</div>
                    <div className="text-slate-800 leading-relaxed">{alert.observation}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-400 font-bold mb-1">RISK SIGNAL &amp; INFERENCE</div>
                    <div className="text-slate-800 leading-relaxed">{alert.riskSignal}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-[11px]">
                  <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Action Taken: {alert.actionTaken}</span>
                  </div>
                  <div className="text-slate-400 text-[10px]">Confidence: {alert.confidenceScore}% • Hash: {alert.evidenceSignature}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. AUTONOMOUS TRADING STRATEGIES & AGENT SWARMS (SECTION 13 & 14) */}
      {activeTerminalTab === 'STRATEGIES' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 font-mono">Autonomous Trading Swarms &amp; Execution Algorithmic Core</h3>
              <p className="text-xs text-slate-500">Autonomous market makers and cross-venue arbitrageurs operating under strict capital boundaries</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 text-xs font-mono font-bold">
              4 Swarms Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategies.map(strat => (
              <div key={strat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{strat.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      strat.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {strat.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-purple-700 font-semibold mt-0.5">
                    {strat.type} • Instrument: {strat.instrumentSymbol}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-200 text-[10px]">
                    <div>
                      <div className="text-slate-400">Allocated Capital</div>
                      <div className="font-bold text-slate-800 mt-0.5">${(strat.allocatedCapitalUsd / 1000000).toFixed(1)}M</div>
                    </div>

                    <div>
                      <div className="text-slate-400">Win Rate</div>
                      <div className="font-bold text-emerald-700 mt-0.5">{strat.winRatePct}%</div>
                    </div>

                    <div>
                      <div className="text-slate-400">Total Profit PnL</div>
                      <div className="font-bold text-emerald-600 mt-0.5">+${strat.profitPnlUsd.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Last Execution: {strat.lastExecution}</span>
                  <button
                    onClick={() => handleToggleStrategy(strat.id)}
                    className={`px-2.5 py-1 rounded font-bold cursor-pointer ${
                      strat.status === 'ACTIVE' 
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200' 
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {strat.status === 'ACTIVE' ? 'Pause Strategy' : 'Resume Strategy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PROOF OF SOLVENCY & RESERVES (SECTION 23) */}
      {activeTerminalTab === 'SOLVENCY' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 font-mono">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900">Exchange Reserve &amp; Solvency Engine (Proof of Solvency)</h3>
              <p className="text-xs text-slate-500 font-sans">Continuous real-time verification of customer liabilities versus segregated reserve assets</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
              118.58% Over-Collateralized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500">Total Assets Held (Enclaves)</div>
              <div className="text-xl font-black text-slate-900 mt-1">${(solvencyAudit.totalAssetsHeldUsd / 1000000000).toFixed(3)}B</div>
              <div className="text-[10px] text-emerald-600 mt-1">Cold Enclave: 90% | Hot: 10%</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500">Customer Balance Liabilities</div>
              <div className="text-xl font-black text-slate-900 mt-1">${(solvencyAudit.totalCustomerLiabilitiesUsd / 1000000000).toFixed(3)}B</div>
              <div className="text-[10px] text-blue-600 mt-1">Full 1:1 Backing Enforced</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500">Dedicated Insurance Fund</div>
              <div className="text-xl font-black text-emerald-700 mt-1">${(solvencyAudit.insuranceFundUsd / 1000000).toFixed(1)}M</div>
              <div className="text-[10px] text-emerald-600 mt-1">Zero Socialized Losses</div>
            </div>
          </div>

          {/* Merkle Root Card */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">Proof of Reserves Merkle Root (Cryptographic Invariant)</span>
              <span className="text-[10px] text-emerald-400">Last Block: Continuous</span>
            </div>
            <div className="font-mono text-cyan-300 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] truncate">
              {solvencyAudit.proofOfReservesMerkleRoot}
            </div>
          </div>
        </div>
      )}

      {/* 7. DETERMINISTIC EVENT REPLAY ENGINE (SECTION 28) */}
      {activeTerminalTab === 'REPLAY' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900">Deterministic Event Replay Engine (Section 28)</h3>
              <p className="text-xs text-slate-500 font-sans">Given GENESIS_STATE + EVENT_SEQUENCE, reconstructs order books, balances, positions, and obligations</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold">
              Deterministic Verification OK
            </span>
          </div>

          <div className="space-y-2">
            {replayLog.map(ev => (
              <div key={ev.seq} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-700 font-bold">Seq #{ev.seq}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-bold">
                    {ev.eventType}
                  </span>
                  <span className="text-slate-700 font-medium">{ev.payloadSummary}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Time: {ev.timestamp} • State Root: {ev.stateRootHash}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. WEB3 WALLET & EXCHANGE FUNDING SURFACE */}
      {activeTerminalTab === 'WALLET_FUNDING' && (
        <OmnifinWalletFunding
          walletState={walletState}
          onConnectWallet={handleConnectWallet}
          onDisconnectWallet={handleDisconnectWallet}
          onSwitchNetwork={handleSwitchNetwork}
          onDepositFunds={handleDepositFunds}
          onWithdrawFunds={handleWithdrawFunds}
          availableMarginUsd={portfolioMargin.availableMarginUsd}
          totalEquityUsd={portfolioMargin.totalEquityUsd}
          onStartTradingPair={(symbol) => {
            setSelectedSymbol(symbol);
            setActiveTerminalTab('TRADING');
          }}
        />
      )}

      {/* FLOATING MODAL: WEB3 WALLET & RECEIVING ADDRESS GENERATOR */}
      {showFundingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <OmnifinWalletFunding
            walletState={walletState}
            onConnectWallet={handleConnectWallet}
            onDisconnectWallet={handleDisconnectWallet}
            onSwitchNetwork={handleSwitchNetwork}
            onDepositFunds={handleDepositFunds}
            onWithdrawFunds={handleWithdrawFunds}
            availableMarginUsd={portfolioMargin.availableMarginUsd}
            totalEquityUsd={portfolioMargin.totalEquityUsd}
            isModal={true}
            onClose={() => setShowFundingModal(false)}
            onStartTradingPair={(symbol) => {
              setSelectedSymbol(symbol);
              setShowFundingModal(false);
              setActiveTerminalTab('TRADING');
            }}
          />
        </div>
      )}

    </div>
  );
};
