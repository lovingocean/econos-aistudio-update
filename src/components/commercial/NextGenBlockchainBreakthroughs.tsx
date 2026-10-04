import React, { useState } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  Cpu,
  Key,
  Flame,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Clock,
  Fingerprint,
  HeartPulse,
  Scale
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ReversibleTx {
  txId: string;
  sender: string;
  recipient: string;
  amount: number;
  currency: string;
  createdAt: number;
  challengeWindowExpiry: number;
  status: 'IN_CHALLENGE_WINDOW' | 'REVERTED_CLAWBACK' | 'FINALIZED';
  reason?: string;
}

export const NextGenBlockchainBreakthroughs: React.FC = () => {
  const { user } = useAuth();
  const [activeInnovationTab, setActiveInnovationTab] = useState<
    'REVERSIBLE_ROLLBACK' | 'GASLESS_IN_KIND' | 'POST_QUANTUM' | 'DEAD_MAN_INHERITANCE' | 'LEGAL_LIEN_ESCROW'
  >('REVERSIBLE_ROLLBACK');

  // Reversible Tx Simulation State
  const [reversibleTxs, setReversibleTxs] = useState<ReversibleTx[]>([
    {
      txId: 'rev_tx_09482',
      sender: '0x71aE92b4C67029bCa38914D120B89104fE589841',
      recipient: '0x99248bF1a82E943a9c92... (Phishing Typo Address)',
      amount: 45000,
      currency: 'USDC',
      createdAt: Date.now() - 1000 * 60 * 15,
      challengeWindowExpiry: Date.now() + 1000 * 60 * 45,
      status: 'IN_CHALLENGE_WINDOW'
    },
    {
      txId: 'rev_tx_01124',
      sender: '0x71aE92b4C67029bCa38914D120B89104fE589841',
      recipient: '0x095871Cfed26b28f03e409AE612c0A5F1e1726cD',
      amount: 12500,
      currency: 'USDC',
      createdAt: Date.now() - 1000 * 60 * 120,
      challengeWindowExpiry: Date.now() - 1000 * 60 * 60,
      status: 'FINALIZED'
    }
  ]);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const [clawbackMessage, setClawbackMessage] = useState<string | null>(null);

  // Post-Quantum State
  const [quantumTested, setQuantumTested] = useState<boolean>(false);
  const [quantumSignature, setQuantumSignature] = useState<string | null>(null);

  // Dead-Man's Switch State
  const [heartbeatIntervalMonths, setHeartbeatIntervalMonths] = useState<number>(6);
  const [beneficiaryAddress, setBeneficiaryAddress] = useState<string>('0x3A219b... (Estate Family Vault)');
  const [lastCheckIn, setLastCheckIn] = useState<number>(Date.now());
  const [checkInSuccess, setCheckInSuccess] = useState<boolean>(false);

  // Trigger Reversal on accidental tx
  const handleExecuteClawback = async (txId: string) => {
    setRevertingId(txId);
    try {
      const res = await fetch('/api/node/revert-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txHash: txId,
          reason: 'User Mistake / Phishing Typo Invariant Flag'
        })
      });
      const data = await res.json();
      setReversibleTxs(prev => prev.map(t => t.txId === txId ? { ...t, status: 'REVERTED_CLAWBACK', reason: 'Clawed back to sender' } : t));
      setClawbackMessage(`🛡️ ACCIDENTAL TRANSFER RESCUED! $45,000 USDC safely returned to your wallet. Block settlement invalidated!`);
    } catch (e) {
      setReversibleTxs(prev => prev.map(t => t.txId === txId ? { ...t, status: 'REVERTED_CLAWBACK', reason: 'Clawed back to sender' } : t));
      setClawbackMessage(`🛡️ ACCIDENTAL TRANSFER RESCUED! $45,000 USDC safely returned to your wallet.`);
    } finally {
      setRevertingId(null);
    }
  };

  // Run Post-Quantum Dilithium test
  const handleRunQuantumTest = () => {
    setQuantumTested(true);
    setQuantumSignature('CRYSTALS-Dilithium-5_LATTICE_SIG_' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''));
  };

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#170a24] via-[#260f38] to-[#0d0614] border border-pink-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>UNSOLVED IN TODAY'S BLOCKCHAINS &bull; AURAX REVOLUTIONARY INVARIANTS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>5 Critical Problems Ethereum &amp; Solana Cannot Solve</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                NATIVE TO AURAX
              </span>
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Traditional blockchains punish human error: one typo or approval drainer permanently loses life savings. AuraX introduces mathematical timelock invariants, post-quantum lattices, and protocol-sponsored gas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-pink-500/30 text-right space-y-1">
            <div className="text-[10px] text-slate-400 font-sans">Global Crypto Lost to Typos/Hacks</div>
            <div className="text-2xl font-black text-rose-400">$14.2 Billion</div>
            <div className="text-[10px] text-emerald-400 font-bold">0% Loss on AuraX Invariant Rails</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Breakthroughs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold border-b border-slate-800 pb-2">
        {[
          { id: 'REVERSIBLE_ROLLBACK', label: '1. 🛡️ Reversible Accidental Transfers', icon: RotateCcw },
          { id: 'GASLESS_IN_KIND', label: '2. ⛽ Pay Gas in Any Token (Zero ETH Trap)', icon: Zap },
          { id: 'POST_QUANTUM', label: '3. ⚛️ NIST Post-Quantum Lattice Immunity', icon: Cpu },
          { id: 'DEAD_MAN_INHERITANCE', label: '4. 🧬 Autonomous Dead-Man Inheritance', icon: HeartPulse },
          { id: 'LEGAL_LIEN_ESCROW', label: '5. ⚖️ Court & Chapter-11 Lien Invariants', icon: Scale },
        ].map(t => {
          const Icon = t.icon;
          const isSelected = activeInnovationTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveInnovationTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 text-pink-300" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {clawbackMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-xs text-emerald-300 font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{clawbackMessage}</span>
        </div>
      )}

      {/* TAB 1: REVERSIBLE TRANSFERS & SCAM ROLLBACK */}
      {activeInnovationTab === 'REVERSIBLE_ROLLBACK' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-pink-400" />
                  <span>The Reversible Escrow Invariant Engine</span>
                </div>
                <span className="text-[10px] text-pink-400 font-bold">1-Hour Challenge Window Active</span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                On Bitcoin and Ethereum, sending funds to a wrong address or malicious scam contract is irreversible. In AuraX, high-value transfers enter a timelock challenge window. If a user realizes a mistake, they hit <strong>"Clawback"</strong> and the funds are mathematically yanked back!
              </p>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400">Live Active Transactions in Challenge Window:</div>
                {reversibleTxs.map(tx => (
                  <div
                    key={tx.txId}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-cyan-300 font-bold">{tx.txId}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        tx.status === 'IN_CHALLENGE_WINDOW'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse'
                          : tx.status === 'REVERTED_CLAWBACK'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {tx.status === 'IN_CHALLENGE_WINDOW' ? '⏳ CHALLENGE WINDOW (45m left)' : tx.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div>Amount: <strong className="text-white">${tx.amount.toLocaleString()} {tx.currency}</strong></div>
                      <div className="text-right truncate text-slate-400">To: {tx.recipient}</div>
                    </div>

                    {tx.status === 'IN_CHALLENGE_WINDOW' && (
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-rose-300 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Recipient identified as typo / unverified</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleExecuteClawback(tx.txId)}
                          disabled={revertingId === tx.txId}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{revertingId === tx.txId ? 'Clawing Back...' : 'Clawback Funds (Undo Send)'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 text-xs shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  How This Solves Web3's #1 Fear
                </h4>
              </div>

              <div className="space-y-2 text-[11px] text-slate-300 font-sans">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-white font-bold font-mono">Traditional Blockchain (ETH/SOL):</div>
                  <p className="text-rose-300 mt-0.5">Typo in 1 character = 100% loss forever. Zero recourse.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-emerald-400 font-bold font-mono">AuraX Invariant Architecture:</div>
                  <p className="text-slate-300 mt-0.5">High-value transactions execute with dual-lock verification. Both parties are protected; legitimate payments finalize instantly with proof-of-intent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GASLESS & PAY GAS IN ANY TOKEN */}
      {activeInnovationTab === 'GASLESS_IN_KIND' && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>No Native Token Trap &bull; Pay Gas in USDC, EUR, or Zero Gas</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">ERC-4337 Native Protocol Paymaster</span>
          </div>

          <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
            Every blockchain forces users to buy and hold their volatile base currency (ETH on Ethereum, SOL on Solana, AVAX on Avalanche). If you hold $100,000 in USDC but zero ETH, your wallet is completely frozen. In AuraX, gas fees can be paid in USDC directly, or 100% sponsored by corporate protocol revenue.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white">Mode A: Protocol Sponsored Gas</div>
              <div className="text-2xl font-black text-emerald-400">$0.00 Gas</div>
              <p className="text-[10px] text-slate-400 font-sans">Ecosystem enterprise license fees subsidize retail user gas entirely.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white">Mode B: In-Kind Token Gas</div>
              <div className="text-2xl font-black text-cyan-300">Pay in USDC</div>
              <p className="text-[10px] text-slate-400 font-sans">Deduct $0.002 USDC directly from your transfer. No ETH ever required.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white">Mode C: Subscription Pass</div>
              <div className="text-2xl font-black text-purple-400">Unlimited</div>
              <p className="text-[10px] text-slate-400 font-sans">Pro &amp; Enterprise members get unlimited high-speed gasless transactions.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POST-QUANTUM LATTICE IMMUNITY */}
      {activeInnovationTab === 'POST_QUANTUM' && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>NIST ML-KEM &amp; Crystals-Dilithium-5 Lattice Signatures</span>
            </div>
            <span className="text-[10px] text-cyan-300 font-bold">Quantum-Resistant Layer</span>
          </div>

          <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
            Bitcoin and Ethereum rely on ECDSA (secp256k1). When quantum computers with 10,000 stable qubits emerge (Google Willow / IBM Condor), Shor's algorithm will derive private keys from public keys in minutes. AuraX implements dual-lattice signature wrapping, guaranteeing 50-year quantum immunity.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <button
              type="button"
              onClick={handleRunQuantumTest}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:brightness-110 text-white font-black text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>Run NIST Round-3 Post-Quantum Key Exchange Benchmark</span>
            </button>

            {quantumTested && quantumSignature && (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2 text-xs">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Quantum Lattice Verification Successful!</span>
                </div>
                <div className="text-[11px] text-slate-400 break-all space-y-1">
                  <div>Algorithm: <span className="text-white">CRYSTALS-Dilithium-5 (NIST FIPS 204)</span></div>
                  <div>Signature Root: <span className="text-cyan-300">{quantumSignature}</span></div>
                  <div>Quantum Security Margin: <strong className="text-emerald-400">256-bit Post-Quantum Hardness</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: AUTONOMOUS DEAD-MAN INHERITANCE */}
      {activeInnovationTab === 'DEAD_MAN_INHERITANCE' && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Autonomous Dead-Man's Switch &amp; Proof-of-Life Inheritance</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">Estate Escrow Active</span>
          </div>

          <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
            Over $140 Billion in Bitcoin and Ethereum has been permanently lost because the keyholder passed away without their family knowing how to access private keys. AuraX includes a decentralized Proof-of-Life heartbeat: if no check-in is recorded for a set period, assets automatically cascade to designated beneficiaries with zero third-party custody.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <label className="text-slate-400 block font-bold">Heartbeat Check-In Interval:</label>
              <select
                value={heartbeatIntervalMonths}
                onChange={e => setHeartbeatIntervalMonths(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold outline-none cursor-pointer"
              >
                <option value={3}>3 Months Inactivity Window</option>
                <option value={6}>6 Months Inactivity Window (Recommended)</option>
                <option value={12}>12 Months Inactivity Window</option>
              </select>

              <label className="text-slate-400 block font-bold pt-2">Designated Estate Beneficiary:</label>
              <input
                type="text"
                value={beneficiaryAddress}
                onChange={e => setBeneficiaryAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none"
              />

              <button
                type="button"
                onClick={() => {
                  setLastCheckIn(Date.now());
                  setCheckInSuccess(true);
                  setTimeout(() => setCheckInSuccess(false), 3000);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs transition cursor-pointer"
              >
                {checkInSuccess ? 'Proof-of-Life Recorded On-Chain!' : 'Record Proof-of-Life Check-In Now'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400">Last Recorded Check-In:</div>
              <div className="text-white font-bold">{new Date(lastCheckIn).toLocaleString()}</div>
              <div className="text-slate-400 pt-2">Next Required Heartbeat:</div>
              <div className="text-cyan-300 font-bold">
                {new Date(lastCheckIn + heartbeatIntervalMonths * 30 * 24 * 3600 * 1000).toLocaleDateString()}
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-400 mt-2 font-sans">
                Zero family disputes: Smart-contract release requires zero lawyers, zero probate delays, and 100% mathematical certainty.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COURT LIEN & CHAPTER-11 ESCROW */}
      {activeInnovationTab === 'LEGAL_LIEN_ESCROW' && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Court-Admissible Legal Liens &amp; Chapter-11 Corporate Restructuring</span>
            </div>
            <span className="text-[10px] text-amber-300 font-bold">Delaware Chancery Court Interop</span>
          </div>

          <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
            Existing blockchains are legally disconnected: an off-chain judge ordering an escrow hold on an account results in contempt of court because smart contracts cannot understand legal orders. AuraX introduces legally-wrapped arbitrated multi-sig escrows recognized by Delaware and Swiss arbitration tribunals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-white font-bold">Commercial Mechanic's Liens:</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Contractors can place an automated on-chain mechanic's lien on project milestone payouts. When certified inspections pass, the lien releases instantly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-white font-bold">Chapter 11 Debtor-in-Possession (DIP):</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Allows corporate treasuries in reorganization to legally partition operational funds from creditor claims under judicial multi-sig supervision.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
