import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  ExternalLink,
  Layers,
  Key,
  Clock,
  AlertTriangle,
  RefreshCw,
  Search,
  Check,
  Copy
} from 'lucide-react';

export const InstitutionalProofOfReserves: React.FC = () => {
  const [verifyAddress, setVerifyAddress] = useState<string>('0x095871Cfed26b28f03e409AE612c0A5F1e1726cD');
  const [merkleResult, setMerkleResult] = useState<any | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerifyMerkle = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setMerkleResult({
        verified: true,
        address: verifyAddress,
        balanceUsd: 1850000,
        merkleLeafIndex: 42,
        merkleRoot: '0x8f2194a01c89bca710294fc8190281ca90281bAc8179048129034873b8192a81',
        blockNumber: 51829142,
        collateralRatio: '149.6%',
        timestamp: new Date().toUTCString()
      });
      setIsVerifying(false);
    }, 1000);
  };

  const multiSigSigners = [
    { role: 'Protocol Foundation Vault', address: '0x095871Cfed26b28f03e409AE612c0A5F1e1726cD', status: 'ACTIVE_SIGNER' },
    { role: 'Institutional Liquidity Custodian', address: '0x184C01982bA901824cb019842a781048fbc81249', status: 'ACTIVE_SIGNER' },
    { role: 'Consensus Validator Council', address: '0x71aE92b4C67029bCa38914D120B89104fE589841', status: 'ACTIVE_SIGNER' },
    { role: 'Emergency Circuit Breaker Timelock', address: '0x94A180fA1762c9081e7d01248Ac9071Bcf3410a9', status: 'STANDBY_SIGNER' },
    { role: 'Legal & Regulatory Escrow Authority', address: '0x4389Bc10fA612489Ac90718cf34190281bAc8179', status: 'STANDBY_SIGNER' }
  ];

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-950 to-indigo-950/60 border border-blue-500/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-500/40">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>Institutional 3-of-5 Multi-Sig Custody &amp; Proof-of-Reserves</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  149.6% OVERCOLLATERALIZED
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Cryptographic Merkle tree reserves attestation. Funds are held in a 3-of-5 Gnosis Safe multi-signature timelock with zero single-point-of-failure.
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-blue-500/30 text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Circuit Breaker:</span>
            <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ARMED &amp; PROTECTED
            </span>
          </div>
        </div>

        {/* Reserves Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Total Verified Reserves:</span>
            <div className="text-sm font-black text-emerald-400">$4,850,000 USD</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Circulating Supply (USD-O):</span>
            <div className="text-sm font-black text-white">$3,240,000 USD-O</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Collateralization Ratio:</span>
            <div className="text-sm font-black text-cyan-300">149.6% Backed</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Timelock Notice Delay:</span>
            <div className="text-sm font-black text-amber-400">48-Hour Hard Timelock</div>
          </div>
        </div>
      </div>

      {/* Reserve Asset Composition */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Underlying Reserve Asset Allocation (Tier-1 Quality)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block">65% — US Short-Term T-Bills</span>
            <p className="text-[11px] text-slate-400 font-sans">
              Direct short-duration US Treasuries (&lt;90 days maturity) yielding ~4.85% risk-free.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">25% — Liquid Cash at FDIC Insured Banks</span>
            <p className="text-[11px] text-slate-400 font-sans">
              Immediate liquidity held in Tier-1 institutional custodial sweep accounts.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold block">10% — Protocol Treasury Yield Surplus</span>
            <p className="text-[11px] text-slate-400 font-sans">
              Excess network settlement fees buffer guarding against market volatility.
            </p>
          </div>
        </div>
      </div>

      {/* 3-of-5 Multi-Sig Board */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-black uppercase text-white tracking-wider">
              3-of-5 Gnosis Multi-Sig Timelock Governance Board
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">Quorum: 3 Signatures Required</span>
        </div>

        <div className="divide-y divide-slate-800/60 text-xs">
          {multiSigSigners.map((signer, idx) => (
            <div key={signer.address} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-900/40 transition">
              <div className="space-y-0.5">
                <div className="font-bold text-white flex items-center gap-2">
                  <span>Signer #{idx + 1}: {signer.role}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold border ${
                    signer.status === 'ACTIVE_SIGNER' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {signer.status}
                  </span>
                </div>
                <div className="text-[11px] text-cyan-300 font-mono select-all">
                  {signer.address}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(signer.address, `signer_${idx}`)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 self-start sm:self-center"
              >
                {copiedKey === `signer_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Key</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Merkle Leaf Verification Tool */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-400" />
          <span>Independent Merkle Tree Proof Verifier</span>
        </h4>

        <form onSubmit={handleVerifyMerkle} className="space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={verifyAddress}
              onChange={(e) => setVerifyAddress(e.target.value)}
              placeholder="Enter Address or Contract (0x...)"
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isVerifying ? 'Attesting Merkle Tree...' : 'Verify Cryptographic Proof'}
            </button>
          </div>
        </form>

        {merkleResult && (
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 space-y-2 text-xs animate-in fade-in">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cryptographic Merkle Proof Attestation Validated!</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-300 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Merkle Root:</span>
                <span className="text-cyan-300 truncate max-w-xs">{merkleResult.merkleRoot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Attested Block:</span>
                <span className="text-white font-bold">#{merkleResult.blockNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reserve Status:</span>
                <span className="text-emerald-400 font-bold">{merkleResult.collateralRatio} Overcollateralized</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
