import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Lock, 
  RotateCcw, 
  Terminal, 
  Zap, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Activity, 
  Flame, 
  Hash, 
  Copy, 
  Check, 
  FileCode2, 
  Share2, 
  ShieldAlert,
  Server
} from 'lucide-react';
import { 
  AuraXBlock, 
  AuraXTransaction, 
  ValidatorNode, 
  InvariantSecurityRule 
} from '../../types/auraxBlockchain';
import { 
  AURA_INVARIANT_RULES, 
  INITIAL_VALIDATOR_NODES 
} from '../../data/auraxBlockchainData';
import { AuraXRealNodeLive } from './AuraXRealNodeLive';

export const AuraXBlockchainConsole: React.FC = () => {
  const [consoleMode, setConsoleMode] = useState<'LIVE_NODE_ENGINE' | 'PROTOCOL_SPECS'>('LIVE_NODE_ENGINE');
  const [activeTab, setActiveTab] = useState<'EXPLORER' | 'INVARIANTS' | 'SIMULATE_FRAUD' | 'NODE_CONSENSUS'>('EXPLORER');
  
  // Real-time block simulation state
  const blockCounterRef = React.useRef<number>(1042182);
  const [currentBlockHeight, setCurrentBlockHeight] = useState<number>(1042182);
  const [blocks, setBlocks] = useState<AuraXBlock[]>([]);
  const [rules, setRules] = useState<InvariantSecurityRule[]>(AURA_INVARIANT_RULES);
  const [validators] = useState<ValidatorNode[]>(INITIAL_VALIDATOR_NODES);
  
  // Simulation: Attempt Fraud Attack against Blockchain
  const [attackType, setAttackType] = useState<'FLASH_LOAN_DRAIN' | 'MEV_FRONT_RUN' | 'UNAUTHORIZED_DRAINER'>('UNAUTHORIZED_DRAINER');
  const [simulatingAttack, setSimulatingAttack] = useState<boolean>(false);
  const [attackResult, setAttackResult] = useState<{
    intercepted: boolean;
    ruleTriggered: string;
    details: string;
    proofHash: string;
    savedCapitalUsd: number;
  } | null>(null);

  // User Interactive Vault Reversal Test
  const [testTransferAmount, setTestTransferAmount] = useState<number>(15000);
  const [activeVaultTx, setActiveVaultTx] = useState<{
    id: string;
    amount: number;
    recipient: string;
    expiresAt: number;
    status: 'ACTIVE_WINDOW' | 'REVERTED_BY_OWNER' | 'SETTLED_FINAL';
  } | null>(null);
  const [vaultSecondsLeft, setVaultSecondsLeft] = useState<number>(0);
  const [revertSuccessMsg, setRevertSuccessMsg] = useState<string | null>(null);

  // Initialize initial blocks once
  useEffect(() => {
    const initialBlocks: AuraXBlock[] = [
      {
        blockNumber: 1042182,
        blockHash: '0x8f2a1b9c7e4d3f2a1c0b8e7d6f5a4c3b2a1e0d9f8c7b6a5e4d3c2b1a0f9e8d7c',
        parentHash: '0x7e1a0b8c6d3f1a0c9b7e6d5f4a3c2b1a0e9d8f7c6b5a4e3d2c1b0a9f8e7d6c5b',
        timestamp: Date.now() - 400,
        validator: 'val-aurax-03 (New York)',
        transactions: [
          {
            id: 'tx-ax-9812',
            sender: '0x3a92...b41c',
            recipient: '0x0958...26cD',
            amount: 4500,
            token: 'USDC',
            txClass: 'VAULT_PROTECTED',
            timestamp: Date.now() - 400,
            nonce: 841,
            encryptedPayloadHash: '0x3f9a...88cc',
            guardianWindowSeconds: 1800,
            invariantProof: {
              merkleRoot: '0x99aa...22bb',
              drainCheckPassed: true,
              flashLoanRatio: 0.01,
              anomalyScore: 0.02
            },
            status: 'COMMITTED_BLOCK'
          }
        ],
        gasConsumed: 12040,
        neuralAnomalyScore: 0.01,
        stateRoot: '0x88cc...11aa',
        proofOfInvariantRoot: '0xbbdd...44ee'
      }
    ];
    setBlocks(initialBlocks);
  }, []);

  // Blockchain Heartbeat (Every 1.8s produce next block)
  useEffect(() => {
    const interval = setInterval(() => {
      blockCounterRef.current += 1;
      const nextHeight = blockCounterRef.current;
      setCurrentBlockHeight(nextHeight);

      const randomValidator = INITIAL_VALIDATOR_NODES[Math.floor(Math.random() * INITIAL_VALIDATOR_NODES.length)].name;
      const newBlock: AuraXBlock = {
        blockNumber: nextHeight,
        blockHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        parentHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        timestamp: Date.now(),
        validator: randomValidator,
        transactions: [
          {
            id: `tx-ax-${Math.floor(1000 + Math.random() * 9000)}`,
            sender: '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...',
            recipient: '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...',
            amount: parseFloat((Math.random() * 2500).toFixed(2)),
            token: 'USDC',
            txClass: Math.random() > 0.4 ? 'VAULT_PROTECTED' : 'INSTANT_PAYMENT',
            timestamp: Date.now(),
            nonce: Math.floor(Math.random() * 500),
            encryptedPayloadHash: '0x' + Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
            guardianWindowSeconds: 1800,
            invariantProof: {
              merkleRoot: '0x' + Array.from({ length: 10 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
              drainCheckPassed: true,
              flashLoanRatio: 0.005,
              anomalyScore: 0.01
            },
            status: 'COMMITTED_BLOCK'
          }
        ],
        gasConsumed: Math.floor(8000 + Math.random() * 6000),
        neuralAnomalyScore: 0.02,
        stateRoot: '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        proofOfInvariantRoot: '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      };

      setBlocks(prev => {
        // Prevent any accidental duplicate blockNumber in state
        const filtered = prev.filter(b => b.blockNumber !== newBlock.blockNumber);
        return [newBlock, ...filtered.slice(0, 9)];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Handle Vault countdown timer
  useEffect(() => {
    if (!activeVaultTx || activeVaultTx.status !== 'ACTIVE_WINDOW') return;
    const interval = setInterval(() => {
      const left = Math.max(0, Math.floor((activeVaultTx.expiresAt - Date.now()) / 1000));
      setVaultSecondsLeft(left);
      if (left === 0) {
        setActiveVaultTx(prev => prev ? { ...prev, status: 'SETTLED_FINAL' } : null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeVaultTx]);

  // Execute Simulated Attack to demonstrate Zero-Fraud Consensus Interception
  const handleLaunchSimulatedAttack = () => {
    setSimulatingAttack(true);
    setAttackResult(null);

    setTimeout(() => {
      setSimulatingAttack(false);
      if (attackType === 'UNAUTHORIZED_DRAINER') {
        setAttackResult({
          intercepted: true,
          ruleTriggered: 'PCT-03-GUARDIAN-REV (Vault Protected Reversal)',
          details: 'Drainer script attempted to siphon $450,000 to an unverified mixer. Invariant Engine halted execution immediately. Funds locked in Sovereign Vault.',
          proofHash: '0x7a89f921...c812bf',
          savedCapitalUsd: 450000
        });
        setRules(r => r.map(x => x.id === 'PCT-03-GUARDIAN-REV' ? { ...x, blockedCount: x.blockedCount + 1 } : x));
      } else if (attackType === 'MEV_FRONT_RUN') {
        setAttackResult({
          intercepted: true,
          ruleTriggered: 'PCT-02-ZERO-MEV (Threshold Decryption Batch)',
          details: 'MEV Bot submitted $2.50 higher gas fee to insert front-running sandwich trade before retail user. Block validator rejected ordering mutation due to threshold encryption.',
          proofHash: '0x4f128e10...99bb01',
          savedCapitalUsd: 18250
        });
        setRules(r => r.map(x => x.id === 'PCT-02-ZERO-MEV' ? { ...x, blockedCount: x.blockedCount + 1 } : x));
      } else {
        setAttackResult({
          intercepted: true,
          ruleTriggered: 'PCT-01-ANTI-DRAIN (Pool Invariant Conservation)',
          details: 'Flash loan borrowed $12M to manipulate Uniswap spot pool oracle. Mathematical Invariant k_post >= k_pre * (1-ε) was violated. Tx rejected pre-execution.',
          proofHash: '0x99cc44aa...112233',
          savedCapitalUsd: 12000000
        });
        setRules(r => r.map(x => x.id === 'PCT-01-ANTI-DRAIN' ? { ...x, blockedCount: x.blockedCount + 1 } : x));
      }
    }, 1200);
  };

  // Launch User Protected Vault Transfer Test
  const handleCreateVaultTransfer = () => {
    const tx = {
      id: `tx-rev-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: testTransferAmount,
      recipient: '0x71aC...882E',
      expiresAt: Date.now() + 60 * 1000, // 60 seconds demo window
      status: 'ACTIVE_WINDOW' as const
    };
    setActiveVaultTx(tx);
    setVaultSecondsLeft(60);
    setRevertSuccessMsg(null);
  };

  // Revert Transfer using Guardian Key
  const handleTriggerReversal = () => {
    if (!activeVaultTx) return;
    setActiveVaultTx(prev => prev ? { ...prev, status: 'REVERTED_BY_OWNER' } : null);
    setRevertSuccessMsg(`✅ SUCCESS: Transaction ${activeVaultTx.id} of $${activeVaultTx.amount.toLocaleString()} has been mathematically cancelled! 100% of funds returned to your Sovereign Vault.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: The Sovereign Mission */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 p-6 sm:p-8 text-white border border-indigo-900/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>AURA-X SOVEREIGN LAYER-1 PROTOCOL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              The World's First <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">Zero-Fraud Autonomous Blockchain</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Engineered specifically to solve the existential crisis of Web3: eliminating MEV front-running, blocking smart contract drains in-consensus, and giving every human an unhackable <strong>Guardian Reversal Rail</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-indigo-900/50 text-center font-mono">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Testnet Height</div>
              <div className="text-xl font-black text-cyan-400">#{currentBlockHeight.toLocaleString()}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-indigo-900/50 text-center font-mono">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Block Finality</div>
              <div className="text-xl font-black text-emerald-400">380 ms</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-indigo-900/50 text-center font-mono">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Hacks Prevented</div>
              <div className="text-xl font-black text-amber-400">270 Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector: Live Server Node vs Architecture Theorems */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 w-fit">
        <button
          onClick={() => setConsoleMode('LIVE_NODE_ENGINE')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer ${
            consoleMode === 'LIVE_NODE_ENGINE'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-emerald-400" />
          <span>⚡ Live Node Engine &amp; Bridge (/api/node)</span>
        </button>

        <button
          onClick={() => setConsoleMode('PROTOCOL_SPECS')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer ${
            consoleMode === 'PROTOCOL_SPECS'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Architectural Theorems &amp; Labs</span>
        </button>
      </div>

      {consoleMode === 'LIVE_NODE_ENGINE' ? (
        <AuraXRealNodeLive />
      ) : (
        <>
      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'EXPLORER', label: '1. Live Sovereign Explorer', icon: Layers },
          { id: 'INVARIANTS', label: '2. 5 Mathematical Invariants', icon: ShieldCheck },
          { id: 'SIMULATE_FRAUD', label: '3. Testnet Fraud Interceptor Lab', icon: Zap },
          { id: 'NODE_CONSENSUS', label: '4. Active Validator Mesh', icon: Server }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-500" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: LIVE SOVEREIGN EXPLORER */}
      {activeTab === 'EXPLORER' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span>Sub-Second Finality Genesis Stream</span>
                </h3>
                <p className="text-xs text-slate-500">Every block verified by DAG-BFT consensus with zero mempool exposure</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                100% MEV-Immune
              </span>
            </div>

            <div className="divide-y divide-slate-100 font-mono text-xs">
              {blocks.map(b => (
                <div key={`${b.blockNumber}-${b.blockHash}`} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700">
                      #{b.blockNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Hash: {b.blockHash.substring(0, 16)}...</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">{b.validator}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {b.transactions.length} Tx • State Root: {b.stateRoot} • Invariant Root: {b.proofOfInvariantRoot}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold">
                      Zero Invariant Violations
                    </span>
                    <span className="text-slate-400 text-[10px]">Just now</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 5 MATHEMATICAL INVARIANTS */}
      {activeTab === 'INVARIANTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map(rule => (
            <div key={rule.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-mono font-bold">
                    {rule.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    {rule.enforcementLevel}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900">{rule.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{rule.description}</p>

                <div className="p-3 rounded-xl bg-slate-950 text-cyan-300 font-mono text-[11px] break-all border border-slate-800">
                  <span className="text-slate-500 block mb-1">Formal Invariant Theorem:</span>
                  {rule.mathematicalExpression}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Consensus Interceptions:</span>
                <strong className="text-rose-600 font-black">{rule.blockedCount} Attacks Neutralized</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: TESTNET FRAUD INTERCEPTOR LAB & VAULT REVERSAL */}
      {activeTab === 'SIMULATE_FRAUD' && (
        <div className="space-y-6">
          {/* Section 1: Simulated Hack Attack */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Testnet Anti-Fraud Attack Simulator</span>
              </h3>
              <p className="text-xs text-slate-500">
                Execute real-world malicious attack scripts against the AuraX Invariant Engine to observe in-consensus interception.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'UNAUTHORIZED_DRAINER', label: 'Wallet Drainer Exploit', desc: 'Attempt to siphon $450k without 2FA Guardian key' },
                { id: 'MEV_FRONT_RUN', label: 'MEV Sandwich Bot', desc: 'Attempt to front-run retail order using high gas priority' },
                { id: 'FLASH_LOAN_DRAIN', label: 'Flash Loan Pool Drain', desc: 'Borrow $12M to distort liquidity pool invariant' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setAttackType(item.id as any)}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    attackType === item.id 
                      ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">{item.label}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={handleLaunchSimulatedAttack}
              disabled={simulatingAttack}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-rose-600/20 disabled:opacity-50"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{simulatingAttack ? 'Simulating Attack on Consensus Layer...' : 'Broadcast Malicious Transaction to Node'}</span>
            </button>

            {attackResult && (
              <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-rose-400 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>ATTACK INTERCEPTED BY AURAX ENGINE</span>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    +${attackResult.savedCapitalUsd.toLocaleString()} Protected
                  </span>
                </div>

                <div className="text-slate-300 leading-relaxed">
                  {attackResult.details}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-500 border-t border-slate-800">
                  <div>Triggered Invariant: <strong className="text-cyan-400">{attackResult.ruleTriggered}</strong></div>
                  <div>Zero-Knowledge Proof: <code className="text-slate-400">{attackResult.proofHash}</code></div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: User Interactive Vault Reversal Test */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-cyan-600" />
                <span>Try the "Guardian Reversal Rail" Yourself</span>
              </h3>
              <p className="text-xs text-slate-500">
                Experience how a user can instantly cancel and pull back an unauthorized or mistaken transfer before final settlement.
              </p>
            </div>

            {!activeVaultTx ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-800">Initiate Protected Transfer:</div>
                    <div className="text-xs text-slate-500">Protected by 60s demonstration guardian challenge window</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-600">Amount ($):</span>
                    <input
                      type="number"
                      value={testTransferAmount}
                      onChange={(e) => setTestTransferAmount(parseFloat(e.target.value) || 0)}
                      className="w-32 px-3 py-1.5 rounded-xl border border-slate-300 font-mono font-bold text-xs"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreateVaultTransfer}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-md"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Send Vault-Protected Transfer (${testTransferAmount.toLocaleString()} USDC)</span>
                </button>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 font-mono text-xs border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">Transfer In Transit ({activeVaultTx.id})</span>
                  {activeVaultTx.status === 'ACTIVE_WINDOW' && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold animate-pulse">
                      Challenge Window Active: {vaultSecondsLeft}s Left
                    </span>
                  )}
                  {activeVaultTx.status === 'REVERTED_BY_OWNER' && (
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold">
                      REVERTED & RETURNED
                    </span>
                  )}
                  {activeVaultTx.status === 'SETTLED_FINAL' && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                      SETTLED FINAL
                    </span>
                  )}
                </div>

                <div className="text-slate-300">
                  Amount: <strong className="text-white">${activeVaultTx.amount.toLocaleString()} USDC</strong> sent to <code className="text-slate-400">{activeVaultTx.recipient}</code>
                </div>

                {activeVaultTx.status === 'ACTIVE_WINDOW' && (
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={handleTriggerReversal}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-rose-600/20"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>HALT & REVERT THIS TRANSFER NOW</span>
                    </button>
                    <span className="text-slate-400 text-[11px]">
                      Demonstrates instant recovery without contacting any bank or central party.
                    </span>
                  </div>
                )}

                {revertSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs">
                    {revertSuccessMsg}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setActiveVaultTx(null);
                      setRevertSuccessMsg(null);
                    }}
                    className="text-slate-400 hover:text-white text-[11px] underline cursor-pointer"
                  >
                    Reset and Try Another Amount
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: ACTIVE VALIDATOR MESH */}
      {activeTab === 'NODE_CONSENSUS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 font-mono">Decentralized Validator Mesh</h3>
              <p className="text-xs text-slate-500">Autonomous consensus nodes executing Invariant PCT validation & Threshold Decryption</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              3/3 Nodes Attesting
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {validators.map(val => (
              <div key={val.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900">{val.name}</strong>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="text-[11px] text-slate-500">{val.region}</div>
                <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reputation:</span>
                    <strong className="text-emerald-600">{val.reputationScore}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">MEV Attempts Smashed:</span>
                    <strong className="text-indigo-600">{val.mevAttemptsBlocked}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hacks Intercepted:</span>
                    <strong className="text-rose-600">{val.fraudTransactionsIntercepted}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};
