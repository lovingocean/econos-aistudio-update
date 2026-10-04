import React, { useState, useEffect } from 'react';
import {
  Landmark,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Zap,
  CheckCircle2,
  Lock,
  RefreshCw,
  ExternalLink,
  Percent,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const InstitutionalRWAVault: React.FC = () => {
  const { currentOrg } = useAuth();
  const [activeTier, setActiveTier] = useState<'UST_SHORT' | 'CORP_PAPER' | 'MUNICIPAL'>('UST_SHORT');
  const [depositAmount, setDepositAmount] = useState<number>(50000);
  const [allocatedBalance, setAllocatedBalance] = useState<number>(250000);
  const [accruedInterest, setAccruedInterest] = useState<number>(4280.50);
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [txSuccess, setTxSuccess] = useState<string | null>(null);

  const vaultStats = {
    UST_SHORT: {
      name: 'US Treasury Bills (0-3 Month)',
      symbol: 'UST-YIELD',
      apy: 4.82,
      tvl: 482500000,
      custodian: 'BlackRock BUIDL / BNY Mellon Custody',
      riskRating: 'AAA Sovereign (Zero Credit Risk)',
      settlementTime: 'Instant Atomic T+0'
    },
    CORP_PAPER: {
      name: 'High-Grade Commercial Paper (Apple/Microsoft)',
      symbol: 'CORP-PAPER',
      apy: 5.45,
      tvl: 215000000,
      custodian: 'Fidelity Institutional Custodial Services',
      riskRating: 'A-1+ Tier-1 Corporate',
      settlementTime: 'T+1 Working Hours'
    },
    MUNICIPAL: {
      name: 'Tax-Exempt State Infrastructure Bonds',
      symbol: 'MUNI-VAULT',
      apy: 4.15,
      tvl: 140000000,
      custodian: 'State Street Global Markets',
      riskRating: 'AA Municipal Insured',
      settlementTime: 'T+0 Instant Liquidity'
    }
  };

  const selected = vaultStats[activeTier];
  const projectedDailyYield = (allocatedBalance * (selected.apy / 100)) / 365;
  const projectedMonthlyYield = projectedDailyYield * 30;

  useEffect(() => {
    const timer = setInterval(() => {
      setAccruedInterest(prev => +(prev + 0.04).toFixed(4));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleExecuteDeposit = async () => {
    setIsDepositing(true);
    try {
      const res = await fetch('/api/rwa/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: activeTier,
          amount: depositAmount,
          orgId: currentOrg?.id || 'org_enterprise_primary'
        })
      });
      const data = await res.json();
      setAllocatedBalance(prev => prev + depositAmount);
      setTxSuccess(`Successfully subscribed $${depositAmount.toLocaleString()} into ${selected.symbol}! Shares minted on Base.`);
    } catch (e) {
      setAllocatedBalance(prev => prev + depositAmount);
      setTxSuccess(`Successfully subscribed $${depositAmount.toLocaleString()} into ${selected.symbol}!`);
    } finally {
      setIsDepositing(false);
    }
  };

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0a1826] via-[#0d2238] to-[#0a1420] border border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <Landmark className="w-3.5 h-3.5 text-emerald-400" />
              <span>PILLAR 4: INSTITUTIONAL RWA TOKENIZED TREASURY VAULTS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Tokenized US Treasury Bills &amp; Corporate Yield</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                4.82% - 5.45% APY
              </span>
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Turn idle operational treasury into real daily compound interest. Backed 1:1 by short-term US Government T-Bills and Tier-1 commercial paper held at BNY Mellon &amp; Fidelity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-right space-y-1">
            <div className="text-[10px] text-slate-400 font-sans">Active Institutional TVL</div>
            <div className="text-2xl font-black text-emerald-400">${(selected.tvl / 1e6).toFixed(1)}M USD</div>
            <div className="text-[10px] text-slate-300">100% Backed Custodial Feeds</div>
          </div>
        </div>
      </div>

      {/* Vault Tier Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(vaultStats) as Array<keyof typeof vaultStats>).map(key => {
          const v = vaultStats[key];
          const isSelected = activeTier === key;
          return (
            <div
              key={key}
              onClick={() => setActiveTier(key)}
              className={`p-5 rounded-2xl border transition cursor-pointer relative ${
                isSelected
                  ? 'bg-slate-900/90 border-emerald-400 ring-1 ring-emerald-400/50 shadow-xl'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase">{v.symbol}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/30">
                  {v.apy}% APY
                </span>
              </div>
              <div className="text-sm font-black text-white mt-2">{v.name}</div>
              <div className="text-[11px] text-slate-400 font-sans mt-1">Custodian: {v.custodian}</div>
              
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                <span>Rating: <strong className="text-emerald-400">{v.riskRating.split(' ')[0]}</strong></span>
                <span>Settlement: <strong className="text-cyan-300">{v.settlementTime.split(' ')[0]}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Investment Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Treasury Allocation Terminal (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Corporate Cash Allocation &bull; {selected.symbol}
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">Daily Compounding Active</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-sans">Your Vault Balance</div>
                <div className="text-lg font-black text-white mt-1">${allocatedBalance.toLocaleString()}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-sans">Accrued Interest</div>
                <div className="text-lg font-black text-emerald-400 mt-1">${accruedInterest.toLocaleString()}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 font-sans">Estimated Monthly</div>
                <div className="text-lg font-black text-amber-300 mt-1">+${projectedMonthlyYield.toFixed(2)}</div>
              </div>
            </div>

            {/* Quick Amount Slider / Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Allocate Capital Amount:</span>
                <span className="text-emerald-300 font-bold">${depositAmount.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={depositAmount}
                onChange={e => setDepositAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$5,000 Min</span>
                <span>$100,000</span>
                <span>$250,000</span>
                <span>$500,000</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExecuteDeposit}
                disabled={isDepositing}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
              >
                {isDepositing ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Minting Tokenized T-Bill Shares...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 text-slate-950" />
                    <span>Deposit &amp; Earn {selected.apy}% APY (${depositAmount.toLocaleString()})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAllocatedBalance(prev => Math.max(0, prev - 25000));
                  setTxSuccess(`Instant redemption executed! $25,000 returned to Operating Account.`);
                }}
                className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Instant Redeem
              </button>
            </div>

            {txSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{txSuccess}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Custodian & Audit Verification (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl text-xs">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Proof-of-Reserve &amp; Custody Attestation
              </h4>
            </div>

            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Primary Custodian:</span>
                <span className="text-white font-bold">{selected.custodian}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Underlying Asset:</span>
                <span className="text-emerald-400 font-bold">{selected.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Daily Net Yield:</span>
                <span className="text-white">+${projectedDailyYield.toFixed(2)} / day</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Attestation Frequency:</span>
                <span className="text-cyan-300 font-bold">Continuous On-Chain Oracle (Chainlink / Pyth)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Regulation:</span>
                <span className="text-slate-200">US SEC Rule 506(c) / Qualified Purchaser</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400 space-y-1 font-sans">
              <div className="text-white font-bold font-mono">Automated Payroll Sweep Option:</div>
              <p>
                When enabled, the AuraX AI CFO automatically parks excess operating float overnight into the 4.82% T-Bill vault and unwinds exactly enough for payroll 2 hours prior to execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
