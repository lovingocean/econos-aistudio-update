import React, { useState, useEffect } from 'react';
import { 
  Server, 
  ShieldCheck, 
  RotateCcw, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  Database,
  ArrowRight,
  ArrowLeftRight,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Lock,
  Wallet,
  Terminal,
  Code2,
  Gift,
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Percent,
  Coins,
  FileCode,
  ShieldAlert,
  Play,
  Flame,
  Radio,
  Trophy,
  BookOpen,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';

interface RealBlock {
  blockNumber: number;
  blockHash: string;
  parentHash: string;
  timestamp: number;
  merkleRoot: string;
  transactions: any[];
  validator: string;
  nonce: number;
}

export const AuraXRealNodeLive: React.FC = () => {
  const [nodeStatus, setNodeStatus] = useState<any>(null);
  const [blocks, setBlocks] = useState<RealBlock[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Active sub-tab within Real Node
  const [activeEngineTab, setActiveEngineTab] = useState<
    'AIRDROP_PORTAL' | 'WHITEPAPER_DOCS' | 'TOKEN_LAUNCHPAD' | 'DRAIN_SIMULATOR' | 'STAKING' | 'DEX_SWAP' | 'BROADCAST' | 'FAUCET' | 'BASE_BRIDGE' | 'EXPLORER_SEARCH' | 'METAMASK_RPC' | 'RUN_VALIDATOR'
  >('AIRDROP_PORTAL');

  // Form: Broadcast Transaction
  const [senderAddress, setSenderAddress] = useState<string>('0x9fF60030aC1e02E1302D3aFa6CaDf347E3fbb97A');
  const [recipientAddress, setRecipientAddress] = useState<string>('0x095871Cfed26b28f03e409AE612c0A5F1e1726cD');
  const [transferAmount, setTransferAmount] = useState<number>(500);
  const [txType, setTxType] = useState<'INSTANT' | 'VAULT_PROTECTED'>('VAULT_PROTECTED');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{ success: boolean; msg: string; txHash?: string } | null>(null);

  // Airdrop & Leaderboard State
  const [airdropData, setAirdropData] = useState<any>({
    totalParticipants: 2,
    totalPointsAllocated: 8270,
    totalAirdropPool: 5000000,
    leaderboard: []
  });
  const [isPerformingQuest, setIsPerformingQuest] = useState<boolean>(false);
  const [questFeedback, setQuestFeedback] = useState<string | null>(null);

  // Code Snippet Tab in Docs
  const [selectedLanguage, setSelectedLanguage] = useState<'ETHERS_JS' | 'PYTHON_WEB3' | 'CURL_RPC'>('ETHERS_JS');

  // Staking State
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const [stakingStatus, setStakingStatus] = useState<any>({ poolTotalStaked: 1450000, annualApyPct: 12.5, userStaked: 0, pendingRewards: 0 });
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [stakeFeedback, setStakeFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  // DEX Swap State
  const [swapFromToken, setSwapFromToken] = useState<'AURX' | 'USDT' | 'ETH'>('AURX');
  const [swapToToken, setSwapToToken] = useState<'AURX' | 'USDT' | 'ETH'>('USDT');
  const [swapAmountIn, setSwapAmountIn] = useState<number>(1000);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [swapFeedback, setSwapFeedback] = useState<{ success: boolean; msg: string; txHash?: string } | null>(null);

  // Token Launchpad State
  const [newTokenName, setNewTokenName] = useState<string>('Super Falcon Token');
  const [newTokenSymbol, setNewTokenSymbol] = useState<string>('FLCN');
  const [newTokenSupply, setNewTokenSupply] = useState<number>(1000000);
  const [isDeployingToken, setIsDeployingToken] = useState<boolean>(false);
  const [deployedContracts, setDeployedContracts] = useState<any[]>([]);
  const [deployFeedback, setDeployFeedback] = useState<{ success: boolean; msg: string; contract?: any } | null>(null);

  // Anti-Drainer Threat Simulator State
  const [drainAttackPct, setDrainAttackPct] = useState<number>(92);
  const [isSimulatingDrain, setIsSimulatingDrain] = useState<boolean>(false);
  const [drainSimulationResult, setDrainSimulationResult] = useState<any>(null);

  // Faucet state
  const [faucetRecipient, setFaucetRecipient] = useState<string>('0x9fF60030aC1e02E1302D3aFa6CaDf347E3fbb97A');
  const [isClaimingFaucet, setIsClaimingFaucet] = useState<boolean>(false);
  const [faucetFeedback, setFaucetFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  // Account Balances
  const [senderBalance, setSenderBalance] = useState<number>(0);
  const [recipientBalance, setRecipientBalance] = useState<number>(0);

  // Reversal Action
  const [revertingHash, setRevertingHash] = useState<string | null>(null);
  const [revertFeedback, setRevertFeedback] = useState<string | null>(null);

  // Cross-Chain Base Bridge
  const [bridgeMode, setBridgeMode] = useState<'DEPOSIT' | 'WITHDRAW'>('DEPOSIT');
  const [bridgeBaseTxHash, setBridgeBaseTxHash] = useState<string>('0x4e8a912c4781df09812bc7812ea10c741e21b012489012c48192a01c4819a12c');
  const [bridgeAmount, setBridgeAmount] = useState<number>(1000);
  const [targetBaseRecipient, setTargetBaseRecipient] = useState<string>('0x095871Cfed26b28f03e409AE612c0A5F1e1726cD');
  const [isBridging, setIsBridging] = useState<boolean>(false);
  const [bridgeFeedback, setBridgeFeedback] = useState<{ success: boolean; msg: string; releaseProof?: string } | null>(null);

  // MetaMask integration state
  const [metaMaskStatus, setMetaMaskStatus] = useState<string | null>(null);

  // Explorer Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Auto-detect connected MetaMask account if available
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts && accounts[0]) {
            setSenderAddress(accounts[0]);
            setFaucetRecipient(accounts[0]);
          }
        })
        .catch(() => {});
    }
  }, []);

  // 1. Fetch Real Node Status & Blocks from Node API
  const fetchNodeData = async () => {
    try {
      const [statusRes, blocksRes, senderBalRes, recBalRes, stakeRes, contractsRes, airdropRes] = await Promise.all([
        fetch('/api/node/status').then(r => r.json()),
        fetch('/api/node/blocks?limit=12').then(r => r.json()),
        fetch(`/api/node/balance/${senderAddress}`).then(r => r.json()),
        fetch(`/api/node/balance/${recipientAddress}`).then(r => r.json()),
        fetch(`/api/node/staking/${senderAddress}`).then(r => r.json()),
        fetch('/api/node/contracts').then(r => r.json()).catch(() => ({ contracts: [] })),
        fetch('/api/node/airdrop/leaderboard').then(r => r.json()).catch(() => null)
      ]);

      setNodeStatus(statusRes);
      if (blocksRes.blocks) setBlocks(blocksRes.blocks);
      if (senderBalRes.balance !== undefined) setSenderBalance(senderBalRes.balance);
      if (recBalRes.balance !== undefined) setRecipientBalance(recBalRes.balance);
      if (stakeRes && stakeRes.annualApyPct) setStakingStatus(stakeRes);
      if (contractsRes && contractsRes.contracts) setDeployedContracts(contractsRes.contracts);
      if (airdropRes) setAirdropData(airdropRes);
    } catch (err) {
      console.error('Failed to fetch node data', err);
    }
  };

  useEffect(() => {
    fetchNodeData();
    const interval = setInterval(fetchNodeData, 2800);
    return () => clearInterval(interval);
  }, [senderAddress, recipientAddress]);

  // Complete Airdrop Quest Action
  const handlePerformQuest = async (questName: string, points: number) => {
    setIsPerformingQuest(true);
    setQuestFeedback(null);

    try {
      const res = await fetch('/api/node/airdrop/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: senderAddress,
          task: questName,
          points
        })
      });

      const data = await res.json();
      if (data.success) {
        setQuestFeedback(`🎉 Quest Completed! +${points} XP Points credited. Estimated Allocation: ${data.user.estimatedAirdropAllocation.toLocaleString()} AURX`);
        fetchNodeData();
      }
    } catch (err) {
      setQuestFeedback('Failed to log airdrop quest.');
    } finally {
      setIsPerformingQuest(false);
    }
  };

  // Token Launchpad Deploy Action
  const handleDeployToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeployingToken(true);
    setDeployFeedback(null);

    try {
      const res = await fetch('/api/node/contracts/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTokenName,
          symbol: newTokenSymbol,
          totalSupply: newTokenSupply,
          creatorAddress: senderAddress
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setDeployFeedback({ success: false, msg: data.error || 'Token deployment rejected.' });
      } else {
        setDeployFeedback({
          success: true,
          msg: `🎉 Contract Deployed! $${data.contract.symbol} (${data.contract.name}) is now live on AuraX L1 at ${data.contract.contractAddress}`,
          contract: data.contract
        });
        // Award quest points for deploying a token
        handlePerformQuest('DEPLOY_SMART_CONTRACT_L1', 500);
        fetchNodeData();
      }
    } catch (err) {
      setDeployFeedback({ success: false, msg: 'Failed to broadcast deployment transaction.' });
    } finally {
      setIsDeployingToken(false);
    }
  };

  // Anti-Drainer Attack Simulator Action
  const handleRunDrainSimulation = async () => {
    setIsSimulatingDrain(true);
    setDrainSimulationResult(null);

    try {
      const res = await fetch('/api/node/simulator/drain-attack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetAddress: senderAddress,
          drainerAddress: '0xBAD00000000000000000000000000000000DRAIN',
          drainPct: drainAttackPct
        })
      });

      const data = await res.json();
      setDrainSimulationResult(data);
      handlePerformQuest('SECURITY_INVARIANT_AUDIT', 250);
      fetchNodeData();
    } catch (err) {
      console.error('Threat simulator failure', err);
    } finally {
      setIsSimulatingDrain(false);
    }
  };

  // Staking Actions
  const handleStake = async (isUnstake: boolean = false) => {
    setIsStaking(true);
    setStakeFeedback(null);

    try {
      const endpoint = isUnstake ? '/api/node/staking/unstake' : '/api/node/staking/stake';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: senderAddress, amount: stakeAmount })
      });

      const data = await res.json();
      if (!res.ok) {
        setStakeFeedback({ success: false, msg: data.error || 'Staking operation failed.' });
      } else {
        setStakeFeedback({
          success: true,
          msg: isUnstake 
            ? `✅ Unstaked! ${data.unbondedAmount?.toFixed(2)} AURX (including yield) returned to your wallet.` 
            : `🎉 Successfully staked ${stakeAmount.toLocaleString()} AURX at 12.5% APY!`
        });
        if (!isUnstake) handlePerformQuest('STAKE_VAULT_PARTICIPATION', 350);
        fetchNodeData();
      }
    } catch (err) {
      setStakeFeedback({ success: false, msg: 'Failed to communicate with staking vault.' });
    } finally {
      setIsStaking(false);
    }
  };

  // DEX Swap Action
  const handleExecuteSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSwapping(true);
    setSwapFeedback(null);

    try {
      const res = await fetch('/api/node/dex/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress: senderAddress,
          fromToken: swapFromToken,
          toToken: swapToToken,
          amountIn: swapAmountIn
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setSwapFeedback({ success: false, msg: data.error || 'Swap failed.' });
      } else {
        setSwapFeedback({
          success: true,
          msg: `🎉 Swap Executed! Received ${data.amountOut?.toFixed(4)} ${swapToToken} at 0% slippage. Tx: ${data.txHash?.substring(0, 20)}...`,
          txHash: data.txHash
        });
        handlePerformQuest('DEX_SWAP_VOLUME', 200);
        fetchNodeData();
      }
    } catch (err) {
      setSwapFeedback({ success: false, msg: 'DEX router unreachable.' });
    } finally {
      setIsSwapping(false);
    }
  };

  // Claim Faucet (1,000 Free $AURX)
  const handleClaimFaucet = async () => {
    setIsClaimingFaucet(true);
    setFaucetFeedback(null);

    try {
      const res = await fetch('/api/node/faucet/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientAddress: faucetRecipient })
      });

      const data = await res.json();
      if (!res.ok) {
        setFaucetFeedback({ success: false, msg: data.error || 'Faucet claim failed.' });
      } else {
        setFaucetFeedback({
          success: true,
          msg: `🎉 Success! 1,000 $AURX dispensed directly to ${faucetRecipient.substring(0, 10)}... Tx: ${data.txHash.substring(0, 20)}...`
        });
        handlePerformQuest('CLAIM_GENESIS_FAUCET', 150);
        fetchNodeData();
      }
    } catch (err) {
      setFaucetFeedback({ success: false, msg: 'Unable to reach Faucet service.' });
    } finally {
      setIsClaimingFaucet(false);
    }
  };

  // Submit Real Transaction to Blockchain Node
  const handleBroadcastTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionFeedback(null);

    try {
      const res = await fetch('/api/node/transaction/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: senderAddress,
          recipient: recipientAddress,
          amount: transferAmount,
          txType: txType,
          challengeWindowSeconds: 60
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmissionFeedback({ success: false, msg: data.error || 'Transaction rejected by Invariant Engine.' });
      } else {
        setSubmissionFeedback({
          success: true,
          msg: `Transaction committed to Invariant Node Mempool! Cryptographic Hash: ${data.transaction.hash.substring(0, 24)}...`,
          txHash: data.transaction.hash
        });
        handlePerformQuest('BROADCAST_INVARIANT_TX', 100);
        fetchNodeData();
      }
    } catch (err) {
      setSubmissionFeedback({ success: false, msg: 'Failed to communicate with Blockchain Node RPC.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger Real Reversal via Guardian API
  const handleTriggerReversal = async (txHash: string) => {
    setRevertingHash(txHash);
    setRevertFeedback(null);

    try {
      const res = await fetch('/api/node/transaction/revert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txHash,
          requesterAddress: senderAddress
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setRevertFeedback(`❌ Error: ${data.error}`);
      } else {
        setRevertFeedback(`✅ SUCCESS: Transaction reversed! ${data.restoredAmount.toLocaleString()} AURX restored to your wallet.`);
        fetchNodeData();
      }
    } catch (err) {
      setRevertFeedback('❌ Failed to execute reversal.');
    } finally {
      setRevertingHash(null);
    }
  };

  // 2-Way Base Bridge Execution
  const handleExecuteBridge = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBridging(true);
    setBridgeFeedback(null);

    try {
      if (bridgeMode === 'DEPOSIT') {
        const res = await fetch('/api/node/bridge/deposit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            baseTxHash: bridgeBaseTxHash,
            depositorAddress: senderAddress,
            amount: bridgeAmount
          })
        });

        const data = await res.json();
        if (!res.ok) {
          setBridgeFeedback({ success: false, msg: data.error || 'Bridge attestation failed.' });
        } else {
          setBridgeFeedback({
            success: true,
            msg: `✅ Cross-Chain Attestation Verified! ${bridgeAmount.toLocaleString()} native AURX minted to ${senderAddress.substring(0, 10)}... on AuraX L1.`
          });
          handlePerformQuest('BRIDGE_BASE_TO_L1', 400);
          fetchNodeData();
        }
      } else {
        const res = await fetch('/api/node/bridge/withdraw', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senderAddress: senderAddress,
            targetBaseRecipient: targetBaseRecipient,
            amount: bridgeAmount
          })
        });

        const data = await res.json();
        if (!res.ok) {
          setBridgeFeedback({ success: false, msg: data.error || 'Withdrawal failed.' });
        } else {
          setBridgeFeedback({
            success: true,
            msg: `✅ ${bridgeAmount.toLocaleString()} AURX burned on AuraX L1! Cryptographic Release Proof generated for Base Mainnet.`,
            releaseProof: data.releaseProof
          });
          fetchNodeData();
        }
      }
    } catch (err) {
      setBridgeFeedback({ success: false, msg: 'Cross-chain bridge relay failure.' });
    } finally {
      setIsBridging(false);
    }
  };

  // Universal Explorer Search
  const handleExecuteExplorerSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const res = await fetch(`/api/node/explorer/search?q=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setSearchError(data.error || 'Nothing found matching query.');
      } else {
        setSearchResult(data);
      }
    } catch (err) {
      setSearchError('Search failed to query AuraX node.');
    } finally {
      setIsSearching(false);
    }
  };

  // Add Custom AuraX Sovereign Chain to MetaMask
  const handleAddAuraXToMetaMask = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      setMetaMaskStatus('⚠️ No Web3 wallet detected. Please install MetaMask or Trust Wallet extension.');
      return;
    }

    try {
      const currentOrigin = window.location.origin;
      const rpcUrl = `${currentOrigin}/api/rpc`;

      await (window as any).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x26c4',
            chainName: 'AuraX Sovereign Zero-Fraud L1',
            nativeCurrency: {
              name: 'AuraX Sovereign',
              symbol: 'AURX',
              decimals: 18
            },
            rpcUrls: [rpcUrl],
            blockExplorerUrls: [`${currentOrigin}/?surface=BLOCKCHAIN_L1`]
          }
        ]
      });

      setMetaMaskStatus('✅ AuraX Sovereign L1 (Chain ID: 9924) successfully configured in your MetaMask!');
      handlePerformQuest('METAMASK_EIP3085_SYNC', 200);
    } catch (err: any) {
      setMetaMaskStatus(`❌ Failed to add network: ${err.message || err}`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Node Engine Core Header */}
      <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE SERVER NODE OPERATIONAL (Chain ID: 9924)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-mono">
              AuraX Sovereign L1 Genesis Node Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-mono">
              Real cryptographic Merkle blocks computed by the server node. Built-in Incentivized Testnet Airdrop, Developer Code Hub, Token Launchpad, and AMM DEX.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500 uppercase">Chain ID</div>
              <div className="text-lg font-bold text-cyan-400">9924</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500 uppercase">Block Height</div>
              <div className="text-lg font-bold text-emerald-400">
                #{nodeStatus ? nodeStatus.chainLength - 1 : '...'}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500 uppercase">Airdrop Pool</div>
              <div className="text-lg font-bold text-amber-300">5,000,000</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500 uppercase">Consensus</div>
              <div className="text-xs font-bold text-indigo-400 mt-1">DAG-BFT + PCT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Engine Action Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'AIRDROP_PORTAL', label: '1. 🏆 Testnet Airdrop & Quests', icon: Trophy },
          { id: 'WHITEPAPER_DOCS', label: '2. 📚 Developer Docs & Web3 SDK', icon: BookOpen },
          { id: 'TOKEN_LAUNCHPAD', label: '3. 🚀 1-Click Token Launchpad', icon: FileCode },
          { id: 'DRAIN_SIMULATOR', label: '4. 🛡️ Anti-Drainer Threat Simulator', icon: ShieldAlert },
          { id: 'STAKING', label: '5. 💎 Native Staking (12.5% APY)', icon: TrendingUp },
          { id: 'DEX_SWAP', label: '6. 🔄 Zero-Slippage DEX & Swap', icon: Coins },
          { id: 'BROADCAST', label: '7. ⚡ Invariant Terminal', icon: Send },
          { id: 'FAUCET', label: '8. 🎁 Faucet (1,000 Free $AURX)', icon: Gift },
          { id: 'BASE_BRIDGE', label: '9. 🌉 Base ↔ AuraX Bridge', icon: ArrowLeftRight },
          { id: 'EXPLORER_SEARCH', label: '10. 🔍 Block Explorer Search', icon: Search },
          { id: 'METAMASK_RPC', label: '11. 🦊 MetaMask RPC Endpoint', icon: Wallet },
          { id: 'RUN_VALIDATOR', label: '12. 🐳 Run Validator Node', icon: Terminal }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeEngineTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveEngineTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-500" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Action Panel */}
        <div className="lg:col-span-5 space-y-6">

          {/* TAB 1: INCENTIVIZED TESTNET AIRDROP & LEADERBOARD */}
          {activeEngineTab === 'AIRDROP_PORTAL' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Incentivized Testnet Airdrop Hub</span>
                </h3>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-mono font-bold border border-amber-200">
                  5,000,000 $AURX Pool
                </span>
              </div>

              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Participate in early Genesis consensus, stress-test the Zero-Fraud invariant rails, and earn points redeemable for Mainnet token allocations!
              </p>

              {/* User Stats Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white font-mono space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Your Connected Address:</span>
                  <span className="text-cyan-300 font-bold">{senderAddress.substring(0, 10)}...</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-400">Your Airdrop XP</div>
                    <div className="text-xl font-black text-amber-400">
                      {airdropData.leaderboard.find((u: any) => u.address.toLowerCase() === senderAddress.toLowerCase())?.points || 0} XP
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Estimated Allocation</div>
                    <div className="text-xl font-black text-emerald-400">
                      ~{(airdropData.leaderboard.find((u: any) => u.address.toLowerCase() === senderAddress.toLowerCase())?.estimatedAirdropAllocation || 0).toLocaleString()} AURX
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Quests */}
              <div className="space-y-2 font-mono text-xs">
                <div className="font-bold text-slate-800 text-[11px] mb-1">Available On-Chain Quests:</div>

                {[
                  { id: 'CLAIM_GENESIS_FAUCET', label: 'Claim 1,000 $AURX from Genesis Faucet', xp: 150 },
                  { id: 'STAKE_VAULT_PARTICIPATION', label: 'Stake in 12.5% APY Invariant Vault', xp: 350 },
                  { id: 'DEX_SWAP_VOLUME', label: 'Execute a Zero-Slippage DEX Swap', xp: 200 },
                  { id: 'DEPLOY_SMART_CONTRACT_L1', label: 'Deploy a Custom Token via 1-Click Launchpad', xp: 500 },
                  { id: 'SECURITY_INVARIANT_AUDIT', label: 'Run Anti-Drainer Threat Interception Test', xp: 250 }
                ].map(q => (
                  <div key={q.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800 text-[11px]">{q.label}</div>
                      <div className="text-[10px] text-emerald-600 font-bold">+{q.xp} Points</div>
                    </div>
                    <button
                      type="button"
                      disabled={isPerformingQuest}
                      onClick={() => handlePerformQuest(q.id, q.xp)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] transition cursor-pointer"
                    >
                      Complete
                    </button>
                  </div>
                ))}
              </div>

              {questFeedback && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-xs font-bold">
                  {questFeedback}
                </div>
              )}

              {/* Live Leaderboard Table */}
              <div className="pt-2 border-t border-slate-100 font-mono text-xs space-y-2">
                <div className="font-bold text-slate-800 text-[11px] flex justify-between">
                  <span>Global Pioneer Leaderboard:</span>
                  <span className="text-cyan-600 font-bold">{airdropData.totalParticipants} Participants</span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {airdropData.leaderboard.map((item: any) => (
                    <div key={item.address} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          item.rank === 1 ? 'bg-amber-400 text-slate-900' :
                          item.rank === 2 ? 'bg-slate-300 text-slate-900' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {item.rank}
                        </span>
                        <span className="font-mono text-slate-700">{item.address.substring(0, 10)}...</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-indigo-600">{item.points} XP</span>
                        <div className="text-[9px] text-slate-400">{item.estimatedAirdropAllocation.toLocaleString()} AURX</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEVELOPER DOCS & WEB3 SDK HUB */}
          {activeEngineTab === 'WHITEPAPER_DOCS' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  <span>Developer Integration Hub & SDK</span>
                </h3>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 font-mono font-bold border border-cyan-200">
                  JSON-RPC 2.0 Spec
                </span>
              </div>

              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Connect your decentralized applications (dApps), bot architectures, or indexers directly to the AuraX L1 node using standard Web3 libraries:
              </p>

              {/* Language Switcher */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl font-mono text-[11px] font-bold">
                {[
                  { id: 'ETHERS_JS', label: 'ethers.js (v6)' },
                  { id: 'PYTHON_WEB3', label: 'Python web3.py' },
                  { id: 'CURL_RPC', label: 'cURL / Shell' }
                ].map(l => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setSelectedLanguage(l.id as any)}
                    className={`py-1.5 rounded-lg transition cursor-pointer ${
                      selectedLanguage === l.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Code Snippets */}
              <div className="relative">
                <button
                  onClick={() => {
                    const code = selectedLanguage === 'ETHERS_JS'
                      ? `import { JsonRpcProvider, formatEther } from 'ethers';\nconst provider = new JsonRpcProvider('${typeof window !== 'undefined' ? window.location.origin : ''}/api/rpc');\nconst balance = await provider.getBalance('0x...');`
                      : selectedLanguage === 'PYTHON_WEB3'
                      ? `from web3 import Web3\nw3 = Web3(Web3.HTTPProvider('${typeof window !== 'undefined' ? window.location.origin : ''}/api/rpc'))\nprint('AuraX Chain ID:', w3.eth.chain_id)`
                      : `curl -X POST ${typeof window !== 'undefined' ? window.location.origin : ''}/api/rpc \\\n  -H "Content-Type: application/json" \\\n  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'`;
                    copyToClipboard(code);
                  }}
                  className="absolute right-3 top-3 px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px] font-mono cursor-pointer"
                >
                  {copiedText ? 'Copied! ✓' : 'Copy 📋'}
                </button>

                <div className="p-4 rounded-2xl bg-slate-950 text-cyan-300 font-mono text-[11px] border border-slate-800 overflow-x-auto">
                  {selectedLanguage === 'ETHERS_JS' && (
                    <pre className="space-y-1">
                      <span className="text-slate-500">// Connect directly to AuraX Sovereign L1</span>{'\n'}
                      <span className="text-purple-400">import</span> {'{ JsonRpcProvider, formatEther }'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'ethers'</span>;{'\n\n'}
                      <span className="text-purple-400">const</span> provider = <span className="text-purple-400">new</span> <span className="text-amber-300">JsonRpcProvider</span>('{typeof window !== 'undefined' ? window.location.origin : ''}/api/rpc');{'\n'}
                      <span className="text-purple-400">const</span> block = <span className="text-purple-400">await</span> provider.<span className="text-cyan-400">getBlockNumber</span>();{'\n'}
                      <span className="text-cyan-400">console</span>.<span className="text-cyan-400">log</span>(<span className="text-emerald-300">"AuraX L1 Height: #" + block</span>);
                    </pre>
                  )}

                  {selectedLanguage === 'PYTHON_WEB3' && (
                    <pre className="space-y-1">
                      <span className="text-slate-500"># Connect via Python web3</span>{'\n'}
                      <span className="text-purple-400">from</span> web3 <span className="text-purple-400">import</span> Web3{'\n\n'}
                      w3 = Web3(Web3.<span className="text-amber-300">HTTPProvider</span>(<span className="text-emerald-300">'{typeof window !== 'undefined' ? window.location.origin : ''}/api/rpc'</span>)){'\n'}
                      <span className="text-cyan-400">print</span>(<span className="text-emerald-300">"Connected to AuraX L1:"</span>, w3.is_connected()){'\n'}
                      <span className="text-cyan-400">print</span>(<span className="text-emerald-300">"Chain ID:"</span>, w3.eth.chain_id)
                    </pre>
                  )}

                  {selectedLanguage === 'CURL_RPC' && (
                    <pre className="space-y-1">
                      <span className="text-slate-500"># Query Chain ID via CLI</span>{'\n'}
                      curl -X POST {typeof window !== 'undefined' ? window.location.origin : ''}/api/rpc \{'\n'}
                      {'  '}-H <span className="text-emerald-300">"Content-Type: application/json"</span> \{'\n'}
                      {'  '}--data <span className="text-emerald-300">{'\'{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}\''}</span>
                    </pre>
                  )}
                </div>
              </div>

              {/* Technical Whitepaper Abstract */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Whitepaper: Invariant Theorem & Anti-Drain Proof</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  "Traditional EVM architectures suffer from non-deterministic state execution vulnerabilities. AuraX L1 introduces <strong>Pre-Consensus Invariant Verification (PCT-V1)</strong>, mathematically guaranteeing that no single block can mutate state by more than the allowed velocity threshold (35% limit) without triggering a Guardian Reversal Challenge."
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: 1-CLICK TOKEN & SMART CONTRACT LAUNCHPAD */}
          {activeEngineTab === 'TOKEN_LAUNCHPAD' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-purple-600" />
                  <span>1-Click ERC-20 Token Launchpad</span>
                </h3>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-mono font-bold border border-purple-200">
                  Instant Opcode Deployment
                </span>
              </div>

              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Deploy your own custom token or smart contract on the AuraX Sovereign L1 in seconds with zero coding required.
              </p>

              <form onSubmit={handleDeployToken} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Token Name:</label>
                  <input
                    type="text"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.target.value)}
                    placeholder="e.g. AuraX Gold"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 block mb-1 font-bold">Token Symbol:</label>
                    <input
                      type="text"
                      value={newTokenSymbol}
                      onChange={(e) => setNewTokenSymbol(e.target.value.toUpperCase())}
                      placeholder="e.g. AGOLD"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs uppercase font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-bold">Total Supply:</label>
                    <input
                      type="number"
                      value={newTokenSupply}
                      onChange={(e) => setNewTokenSupply(parseFloat(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Deployer / Admin Address:</label>
                  <input
                    type="text"
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] bg-slate-50 select-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isDeployingToken}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-purple-600/20 disabled:opacity-50"
                >
                  <FileCode className="w-4 h-4" />
                  <span>{isDeployingToken ? 'Compiling Bytecode & Mining Contract...' : `Deploy $${newTokenSymbol} on AuraX L1`}</span>
                </button>
              </form>

              {deployFeedback && (
                <div className={`p-4 rounded-2xl font-mono text-xs border space-y-2 ${
                  deployFeedback.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="font-bold">{deployFeedback.msg}</div>
                  {deployFeedback.contract && (
                    <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 text-[10px] break-all select-all font-mono space-y-1">
                      <div>Contract: {deployFeedback.contract.contractAddress}</div>
                      <div>Tx Hash: {deployFeedback.contract.txHash}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Deployed Tokens Registry */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-[11px] font-bold text-slate-700 flex justify-between">
                  <span>Recently Deployed L1 Contracts:</span>
                  <span className="text-purple-600 font-mono">{deployedContracts.length} Active</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {deployedContracts.map((c) => (
                    <div key={c.contractAddress} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] flex justify-between items-center">
                      <div>
                        <strong className="text-slate-900">${c.symbol}</strong> <span className="text-slate-500">({c.name})</span>
                        <div className="text-[10px] text-slate-400">{c.contractAddress.substring(0, 14)}...</div>
                      </div>
                      <span className="text-emerald-600 font-bold text-[10px]">{c.totalSupply.toLocaleString()} Supply</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ANTI-DRAINER THREAT SIMULATOR */}
          {activeEngineTab === 'DRAIN_SIMULATOR' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Real-Time Anti-Drainer Threat Simulator</span>
                </h3>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 font-mono font-bold border border-rose-200">
                  Zero-Day Defense
                </span>
              </div>

              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Test how the <strong>Invariant PCT Protocol</strong> mathematically halts unauthorized drainer scripts and malicious sweepers in real-time.
              </p>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-rose-900 font-bold">Simulated Hacker Drain Attempt:</span>
                  <span className="text-rose-600 font-black text-base">{drainAttackPct}% of Wallet</span>
                </div>

                <input
                  type="range"
                  min="40"
                  max="99"
                  value={drainAttackPct}
                  onChange={(e) => setDrainAttackPct(parseInt(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Safe Velocity (0-35%)</span>
                  <span className="text-rose-600 font-bold">Critical Drain Vector ({drainAttackPct}%)</span>
                </div>
              </div>

              <button
                type="button"
                disabled={isSimulatingDrain}
                onClick={handleRunDrainSimulation}
                className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-rose-600/20 disabled:opacity-50"
              >
                <Flame className="w-4 h-4" />
                <span>{isSimulatingDrain ? 'Simulating Malicious Sweep...' : 'Trigger Simulated Drain Attack'}</span>
              </button>

              {drainSimulationResult && (
                <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs border border-rose-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>ATTACK 100% INTERCEPTED</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{drainSimulationResult.telemetry.latencyMs}ms Latency</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-[11px] leading-relaxed">
                    {drainSimulationResult.telemetry.sirenAlert}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div>Intercept Stage: <strong className="text-cyan-400">Pre-Consensus</strong></div>
                    <div>Safe Threshold: <strong className="text-amber-400">Max 35% / block</strong></div>
                    <div>Sweep Attempted: <strong className="text-rose-400">{drainSimulationResult.telemetry.drainAttemptAmount.toLocaleString()} AURX</strong></div>
                    <div>Funds Protected: <strong className="text-emerald-400">100% Preserved</strong></div>
                  </div>

                  <div className="text-[10px] text-slate-400 break-all pt-1 border-t border-slate-800">
                    Rule Triggered: <span className="text-cyan-300">{drainSimulationResult.invariantRuleTriggered}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: NATIVE STAKING POOL */}
          {activeEngineTab === 'STAKING' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <span>AuraX Invariant Staking Vault</span>
                </h3>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-mono font-bold border border-amber-200">
                  12.5% Fixed APY
                </span>
              </div>

              {/* Pool Overview Cards */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500">Your Staked Balance</div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {stakingStatus.userStaked?.toLocaleString() || 0} AURX
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <div className="text-[10px] text-amber-700 font-bold">Unclaimed Yield</div>
                  <div className="text-base font-bold text-amber-600 mt-1">
                    +{stakingStatus.pendingRewards?.toFixed(4) || 0} AURX
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 text-slate-300 font-mono text-[11px] flex justify-between items-center">
                <span>Total Pool Staked:</span>
                <strong className="text-cyan-400">{stakingStatus.poolTotalStaked?.toLocaleString()} AURX</strong>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1 font-bold">
                    <span>Stake Amount (AURX):</span>
                    <span className="text-[11px] text-indigo-600">Available: {senderBalance.toLocaleString()} AURX</span>
                  </div>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isStaking}
                    onClick={() => handleStake(false)}
                    className="py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50"
                  >
                    <Percent className="w-3.5 h-3.5" />
                    <span>Stake & Earn 12.5%</span>
                  </button>

                  <button
                    type="button"
                    disabled={isStaking || stakingStatus.userStaked <= 0}
                    onClick={() => handleStake(true)}
                    className="py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Unstake & Harvest</span>
                  </button>
                </div>
              </div>

              {stakeFeedback && (
                <div className={`p-4 rounded-2xl font-mono text-xs border ${
                  stakeFeedback.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  {stakeFeedback.msg}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ZERO-SLIPPAGE DEX & SWAP */}
          {activeEngineTab === 'DEX_SWAP' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <Coins className="w-4 h-4 text-indigo-600" />
                  <span>AuraX Native Zero-Slippage DEX</span>
                </h3>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 font-mono font-bold border border-indigo-200">
                  MEV-Proof AMM
                </span>
              </div>

              <form onSubmit={handleExecuteSwap} className="space-y-4 font-mono text-xs">
                {/* From Token Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>You Pay:</span>
                    <span>Balance: {senderBalance.toLocaleString()} AURX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={swapAmountIn}
                      onChange={(e) => setSwapAmountIn(parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent text-lg font-bold font-mono focus:outline-hidden"
                    />
                    <select
                      value={swapFromToken}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setSwapFromToken(val);
                        if (val === 'AURX') setSwapToToken('USDT');
                        else setSwapToToken('AURX');
                      }}
                      className="p-2 rounded-xl bg-white border border-slate-300 font-bold"
                    >
                      <option value="AURX">AURX</option>
                      <option value="USDT">USDT</option>
                      <option value="ETH">ETH</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center -my-2">
                  <div className="p-2 rounded-full bg-slate-900 text-white shadow-md">
                    <ArrowDownLeft className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* To Token Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>You Receive (Estimated):</span>
                    <span className="text-emerald-600 font-bold">0% Slippage Guaranteed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">
                      {swapFromToken === 'AURX' && swapToToken === 'USDT' ? (swapAmountIn * 0.05).toFixed(2) :
                       swapFromToken === 'AURX' && swapToToken === 'ETH' ? (swapAmountIn * 0.000016).toFixed(5) :
                       swapFromToken === 'USDT' && swapToToken === 'AURX' ? (swapAmountIn / 0.05).toFixed(0) :
                       swapFromToken === 'ETH' && swapToToken === 'AURX' ? (swapAmountIn / 0.000016).toFixed(0) : '0'}
                    </span>
                    <span className="p-2 rounded-xl bg-white border border-slate-300 font-bold text-slate-800">
                      {swapToToken}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-[11px] flex justify-between">
                  <span>Exchange Rate:</span>
                  <span className="font-bold">1 AURX = $0.05 USDT</span>
                </div>

                <button
                  type="submit"
                  disabled={isSwapping}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>{isSwapping ? 'Executing Atomic Swap on Chain...' : `Swap ${swapFromToken} for ${swapToToken}`}</span>
                </button>
              </form>

              {swapFeedback && (
                <div className={`p-4 rounded-2xl font-mono text-xs border ${
                  swapFeedback.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  {swapFeedback.msg}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: BROADCAST INVARIANT TRANSACTION */}
          {activeEngineTab === 'BROADCAST' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <Send className="w-4 h-4 text-indigo-600" />
                  <span>Broadcast to Node Consensus</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-bold">
                  Direct Invariant RPC
                </span>
              </div>

              <form onSubmit={handleBroadcastTransaction} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Sender Address:</label>
                  <input
                    type="text"
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] bg-slate-50 select-all"
                  />
                  <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                    <span>Ledger Balance:</span>
                    <strong className="text-indigo-600 font-bold">{senderBalance.toLocaleString()} AURX</strong>
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Recipient Address:</label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] select-all"
                  />
                  <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                    <span>Recipient Balance:</span>
                    <strong className="text-emerald-600 font-bold">{recipientBalance.toLocaleString()} AURX</strong>
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Transfer Amount (AURX):</label>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Execution Protection Mode:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTxType('VAULT_PROTECTED')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                        txType === 'VAULT_PROTECTED'
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Vault Protected</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">60s Reversal Window</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTxType('INSTANT')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                        txType === 'INSTANT'
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>Instant Finality</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Immediate Settlement</div>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Evaluating Invariants & Broadcasting...' : 'Submit to AuraX Node'}</span>
                </button>
              </form>

              {submissionFeedback && (
                <div className={`p-4 rounded-2xl font-mono text-xs border ${
                  submissionFeedback.success 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {submissionFeedback.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
                    <span>{submissionFeedback.success ? 'Consensus Acceptance' : 'Consensus Invariant Rejection'}</span>
                  </div>
                  <div className="mt-1 text-[11px] leading-relaxed break-all">
                    {submissionFeedback.msg}
                  </div>
                </div>
              )}

              {revertFeedback && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs border border-slate-800">
                  {revertFeedback}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: FAUCET (1,000 FREE $AURX) */}
          {activeEngineTab === 'FAUCET' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <Gift className="w-4 h-4 text-emerald-600" />
                  <span>AuraX L1 Genesis Faucet</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-bold">
                  Free Dispenser
                </span>
              </div>

              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Get <strong>1,000 Free $AURX</strong> directly deposited into your MetaMask wallet on the AuraX Sovereign L1 Network for instant testing!
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Your Web3 / MetaMask Wallet Address:</label>
                  <input
                    type="text"
                    value={faucetRecipient}
                    onChange={(e) => setFaucetRecipient(e.target.value)}
                    placeholder="0x..."
                    className="w-full p-3 rounded-xl border border-slate-300 font-mono text-[11px] select-all"
                  />
                </div>

                <button
                  type="button"
                  disabled={isClaimingFaucet}
                  onClick={handleClaimFaucet}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                >
                  <Gift className="w-4 h-4" />
                  <span>{isClaimingFaucet ? 'Dispensing 1,000 AURX & Mining Block...' : 'Claim 1,000 Free $AURX Now'}</span>
                </button>
              </div>

              {faucetFeedback && (
                <div className={`p-4 rounded-2xl font-mono text-xs border ${
                  faucetFeedback.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  {faucetFeedback.msg}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: 2-WAY BASE MAINNET CROSS-CHAIN BRIDGE */}
          {activeEngineTab === 'BASE_BRIDGE' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-cyan-600" />
                  <span>Base ↔ AuraX 2-Way Bridge</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-mono font-bold">
                  Bi-Directional Relay
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setBridgeMode('DEPOSIT')}
                  className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    bridgeMode === 'DEPOSIT' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <ArrowDownLeft className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Deposit (Base ➔ L1)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBridgeMode('WITHDRAW')}
                  className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    bridgeMode === 'WITHDRAW' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Withdraw (L1 ➔ Base)</span>
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Official Base Token:</span>
                  <a 
                    href="https://basescan.org/token/0x6a813C3a89b6776712f7Fa4a47E1d1D45fAcE1ED"
                    target="_blank" 
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>0x6a81...E1ED</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Bridge Vault:</span>
                  <span className="font-bold text-slate-800">0x0958...26cD</span>
                </div>
              </div>

              <form onSubmit={handleExecuteBridge} className="space-y-4 font-mono text-xs">
                {bridgeMode === 'DEPOSIT' ? (
                  <div>
                    <label className="text-slate-600 block mb-1 font-bold">Base Mainnet Deposit Tx Hash:</label>
                    <input
                      type="text"
                      value={bridgeBaseTxHash}
                      onChange={(e) => setBridgeBaseTxHash(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] select-all"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-slate-600 block mb-1 font-bold">Target Base Mainnet Wallet Address:</label>
                    <input
                      type="text"
                      value={targetBaseRecipient}
                      onChange={(e) => setTargetBaseRecipient(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] select-all"
                    />
                  </div>
                )}

                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Bridge Amount (AURX):</label>
                  <input
                    type="number"
                    value={bridgeAmount}
                    onChange={(e) => setBridgeAmount(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isBridging}
                  className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-cyan-600/20 disabled:opacity-50"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>
                    {isBridging 
                      ? 'Executing Cryptographic Relayer...' 
                      : bridgeMode === 'DEPOSIT' 
                        ? 'Relay Base Deposit to AuraX L1' 
                        : 'Burn on L1 & Generate Base Release Proof'}
                  </span>
                </button>
              </form>

              {bridgeFeedback && (
                <div className={`p-4 rounded-2xl font-mono text-xs border space-y-2 ${
                  bridgeFeedback.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div>{bridgeFeedback.msg}</div>
                  {bridgeFeedback.releaseProof && (
                    <div className="p-2 rounded bg-slate-900 text-cyan-300 text-[10px] break-all select-all font-mono">
                      Release Proof: {bridgeFeedback.releaseProof}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 10: UNIVERSAL EXPLORER SEARCH */}
          {activeEngineTab === 'EXPLORER_SEARCH' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-600" />
                  <span>AuraX Universal Explorer Search</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-mono font-bold">
                  Basescan Compatible
                </span>
              </div>

              <form onSubmit={handleExecuteExplorerSearch} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Search by Tx Hash, Block #, or Address:</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. 0x... or Block Number"
                      className="w-full p-3 pr-10 rounded-xl border border-slate-300 font-mono text-[11px]"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="absolute right-2 top-2 p-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>

              {searchError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 font-mono text-xs">
                  {searchError}
                </div>
              )}

              {searchResult && (
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-cyan-400 font-bold uppercase">{searchResult.type} MATCH FOUND</span>
                    <span className="text-[10px] text-emerald-400">Verified by Consensus</span>
                  </div>

                  {searchResult.type === 'BLOCK' && (
                    <div className="space-y-1 text-[11px]">
                      <div>Block Number: <strong className="text-cyan-300">#{searchResult.data.blockNumber}</strong></div>
                      <div className="break-all text-slate-400">Hash: {searchResult.data.blockHash}</div>
                      <div>Txs Count: {searchResult.data.transactions?.length || 0}</div>
                    </div>
                  )}

                  {searchResult.type === 'TRANSACTION' && (
                    <div className="space-y-1.5 text-[11px]">
                      <div className="break-all">Hash: <span className="text-cyan-300">{searchResult.data.hash}</span></div>
                      <div>From: <span className="text-slate-400">{searchResult.data.sender}</span></div>
                      <div>To: <span className="text-slate-400">{searchResult.data.recipient}</span></div>
                      <div>Amount: <strong className="text-emerald-400">{searchResult.data.amount} AURX</strong></div>
                      <div>Status: <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">{searchResult.data.status}</span></div>
                    </div>
                  )}

                  {searchResult.type === 'ADDRESS' && (
                    <div className="space-y-2 text-[11px]">
                      <div className="break-all">Address: <span className="text-indigo-300">{searchResult.data.address}</span></div>
                      <div>Balance: <strong className="text-emerald-400 text-sm">{searchResult.data.balance.toLocaleString()} AURX</strong></div>
                      <div>Total History: {searchResult.data.transactionsCount} txs</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 11: METAMASK 1-CLICK INTEGRATION & RPC */}
          {activeEngineTab === 'METAMASK_RPC' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-amber-500" />
                  <span>Connect MetaMask to AuraX L1</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono font-bold">
                  EIP-3085
                </span>
              </div>

              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Connect your real MetaMask, Coinbase Wallet, or Rabby directly to our live node via JSON-RPC 2.0.
              </p>

              <button
                onClick={handleAddAuraXToMetaMask}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white font-mono font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <Wallet className="w-4 h-4" />
                <span>Add AuraX L1 Network to MetaMask</span>
              </button>

              {metaMaskStatus && (
                <div className="p-3.5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 break-words">
                  {metaMaskStatus}
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
                <div className="text-slate-800 font-bold mb-1">Manual Network Parameters for Any Web3 Wallet:</div>
                <div className="flex justify-between text-[11px]"><span className="text-slate-500">Network Name:</span><span className="font-bold text-slate-900">AuraX Sovereign L1</span></div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Primary RPC URL:</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`${typeof window !== 'undefined' ? window.location.origin : ''}/api/rpc`)}
                      className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>{copiedText?.includes('/api/rpc') ? 'Copied! ✓' : 'Copy Full URL 📋'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 text-cyan-300 font-mono text-[10px] break-all select-all">
                    {typeof window !== 'undefined' ? `${window.location.origin}/api/rpc` : 'https://<your-app-host>/api/rpc'}
                  </div>
                </div>
                <div className="flex justify-between text-[11px]"><span className="text-slate-500">Chain ID:</span><span className="font-bold text-cyan-600">9924 (Hex: 0x26c4)</span></div>
                <div className="flex justify-between text-[11px]"><span className="text-slate-500">Currency Symbol:</span><span className="font-bold text-emerald-600">AURX</span></div>
                <div className="flex justify-between text-[11px]"><span className="text-slate-500">Block Explorer URL:</span><span className="font-bold text-slate-700">/ ?surface=BLOCKCHAIN_L1</span></div>
              </div>
            </div>
          )}

          {/* TAB 12: RUN VALIDATOR NODE SUITE */}
          {activeEngineTab === 'RUN_VALIDATOR' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-600" />
                  <span>Run a Sovereign Validator Node</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono font-bold">
                  Open Source
                </span>
              </div>

              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Run an autonomous attestation node on your own VPS or server using our Docker package:
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 text-cyan-300 font-mono text-xs border border-slate-800 space-y-2">
                <div className="text-slate-500 text-[10px]"># 1. Pull Genesis Node Docker Image</div>
                <div className="select-all">docker pull aurax/sovereign-node:latest</div>
                
                <div className="text-slate-500 text-[10px] pt-2"># 2. Launch Validator with Invariant Engine</div>
                <div className="select-all break-all text-emerald-300">
                  docker run -d -p 9924:9924 --name aurax-node -e CHAIN_ID=9924 -e VALIDATOR_KEY=0x... aurax/sovereign-node
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 font-mono text-[11px] text-indigo-900">
                Validators earn 100% of micro-gas settlement fees and rewards for intercepting unauthorized drainer transactions.
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Immutable Block Ledger */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-600" />
                <span>Immutable Server Ledger (Live Blocks)</span>
              </h3>
              <button 
                onClick={fetchNodeData}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                title="Refresh Ledger"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 font-mono text-xs max-h-[640px] overflow-y-auto">
              {blocks.map(b => (
                <div key={`${b.blockNumber}-${b.blockHash}`} className="py-4 space-y-2 hover:bg-slate-50 p-2 rounded-xl transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 font-bold border border-cyan-200">
                        Block #{b.blockNumber}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(b.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500">
                      Nonce: {b.nonce}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 break-all space-y-0.5">
                    <div>
                      <span className="text-slate-400">Hash: </span>
                      <code className="text-slate-900 font-bold">{b.blockHash}</code>
                    </div>
                    <div>
                      <span className="text-slate-400">Merkle Root: </span>
                      <code className="text-slate-500">{b.merkleRoot}</code>
                    </div>
                  </div>

                  {b.transactions.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-200 space-y-2">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        Transactions in Block ({b.transactions.length}):
                      </div>
                      {b.transactions.map((tx: any) => (
                        <div key={tx.hash} className="p-3 rounded-xl bg-slate-900 text-slate-300 text-[11px] space-y-2 border border-slate-800">
                          <div className="flex items-center justify-between">
                            <span className="text-cyan-300 font-bold">{tx.amount.toLocaleString()} AURX</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              tx.status === 'REVERTED' ? 'bg-rose-900/60 text-rose-300' :
                              tx.status === 'COMMITTED' ? 'bg-emerald-900/60 text-emerald-300' :
                              'bg-amber-900/60 text-amber-300'
                            }`}>
                              {tx.status} ({tx.txType})
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-400 break-all">
                            <div>From: {tx.sender}</div>
                            <div>To: {tx.recipient}</div>
                            <div>Hash: {tx.hash}</div>
                            {tx.sourceTxHash && (
                              <div className="text-indigo-400">Base Source: {tx.sourceTxHash}</div>
                            )}
                          </div>

                          {/* Guardian Reversal Button */}
                          {tx.txType === 'VAULT_PROTECTED' && tx.status !== 'REVERTED' && (
                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                              <span className="text-[10px] text-amber-400">
                                Protected by Guardian Rail
                              </span>
                              <button
                                onClick={() => handleTriggerReversal(tx.hash)}
                                disabled={revertingHash === tx.hash}
                                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] flex items-center gap-1 transition cursor-pointer disabled:opacity-50"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>{revertingHash === tx.hash ? 'Reverting...' : 'Revert & Pull Back'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
