import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Zap,
  TrendingUp,
  ExternalLink,
  Gift,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';

export const InstantAffiliateEngine: React.FC = () => {
  const [partnerWallet, setPartnerWallet] = useState<string>('0x38Bc2149e0ca912b7a9184df629014bc81f9a204');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const referralLink = `https://econos-aistudio-update.vercel.app/?ref=${partnerWallet.substring(0, 10)}`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const recentAffiliatePayouts = [
    {
      txHash: '0x49a1bc019842a781048fbc812490ac901824cb019842a781048fbc812490ac90',
      affiliateWallet: '0x71aE92b4C67029bCa38914D120B89104fE589841',
      buyerItem: 'Sovereign Node #142 ($3,499)',
      commissionUsdc: 700,
      timestamp: '14 mins ago',
      status: 'DISPATCHED_INSTANT'
    },
    {
      txHash: '0x94A180fA1762c9081e7d01248Ac9071Bcf3410a9019842a781048fbc812490ac',
      affiliateWallet: '0x94A180fA1762c9081e7d01248Ac9071Bcf3410a9',
      buyerItem: 'Sovereign Node #141 ($3,499)',
      commissionUsdc: 700,
      timestamp: '52 mins ago',
      status: 'DISPATCHED_INSTANT'
    },
    {
      txHash: '0x184C01982bA901824cb019842a781048fbc812490ac901824cb019842a78104',
      affiliateWallet: '0x184C01982bA901824cb019842a781048fbc81249',
      buyerItem: 'Whale VIP Alpha Pass ($999)',
      commissionUsdc: 200,
      timestamp: '2 hrs ago',
      status: 'DISPATCHED_INSTANT'
    }
  ];

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-teal-950/40 to-slate-950 border border-emerald-500/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/40">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>20% Instant On-Chain Affiliate &amp; Partner Flywheel</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  $700 USDC PER NODE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Earn an instant 20% on every license and software sale. No minimums, no payout delays — smart contracts route USDC directly to your Base wallet.
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Your Payout Rate:</span>
            <span className="text-sm font-black text-emerald-400">20% Flat Commission</span>
          </div>
        </div>

        {/* Partner Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Commission Per Node:</span>
            <div className="text-sm font-black text-emerald-400">$700.00 USDC</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Payout Holding Period:</span>
            <div className="text-sm font-black text-white">0 Seconds (Block Confirmation)</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Settlement Currency:</span>
            <div className="text-sm font-black text-cyan-300">USDC on Base</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Cumulative Partner Paid:</span>
            <div className="text-sm font-black text-amber-400">$284,900 USDC</div>
          </div>
        </div>
      </div>

      {/* Referral Link Card */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>Your Unique Instant Affiliate Dispatch Link</span>
        </h4>

        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={partnerWallet}
              onChange={(e) => setPartnerWallet(e.target.value)}
              placeholder="Enter your Base Wallet address (0x...)"
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
            />
            <button
              type="button"
              onClick={() => handleCopy(referralLink, 'ref_link')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 shadow-md"
            >
              {copiedKey === 'ref_link' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'ref_link' ? 'Copied Link!' : 'Copy Partner Referral Link'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Target URL: <span className="text-cyan-400 font-mono">{referralLink}</span>. When someone buys from this link, smart contract executes <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-400">transfer(partner, $700)</code> in the exact same atomic transaction!
          </p>
        </div>
      </div>

      {/* Recent Dispatches Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-black uppercase text-white tracking-wider">
              Live On-Chain Partner Commission Dispatches
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">100% On-Chain Verified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/40 text-[10px] text-slate-400 uppercase border-b border-slate-800 font-bold">
              <tr>
                <th className="py-3 px-4">Tx Hash</th>
                <th className="py-3 px-4">Partner Wallet</th>
                <th className="py-3 px-4">Buyer License</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4 text-right">Commission (USDC)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px]">
              {recentAffiliatePayouts.map((pay) => (
                <tr key={pay.txHash} className="hover:bg-slate-900/50 transition">
                  <td className="py-3 px-4 text-cyan-300 font-mono">
                    {pay.txHash.substring(0, 10)}...{pay.txHash.substring(pay.txHash.length - 8)}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">
                    {pay.affiliateWallet.substring(0, 8)}...{pay.affiliateWallet.substring(pay.affiliateWallet.length - 6)}
                  </td>
                  <td className="py-3 px-4 text-white font-sans">{pay.buyerItem}</td>
                  <td className="py-3 px-4 text-slate-400 font-sans text-[10px]">{pay.timestamp}</td>
                  <td className="py-3 px-4 text-right font-black text-emerald-400 font-mono text-sm">
                    +${pay.commissionUsdc}.00 USDC
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      INSTANT DROP
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
