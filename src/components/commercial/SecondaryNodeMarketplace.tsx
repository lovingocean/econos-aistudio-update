import React, { useState } from 'react';
import {
  Cpu,
  TrendingUp,
  Tag,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  Plus,
  Flame,
  Check,
  Copy
} from 'lucide-react';

interface SecondaryNodeListing {
  nodeId: number;
  tier: string;
  serialNumber: string;
  askPriceUsdc: number;
  mintPriceUsdc: number;
  sellerAddress: string;
  lifetimeYieldUsd: number;
  listedTime: string;
  verifiedAttestation: boolean;
}

export const SecondaryNodeMarketplace: React.FC = () => {
  const [listings, setListings] = useState<SecondaryNodeListing[]>([
    {
      nodeId: 42,
      tier: 'Genesis Ultra (Low Serial)',
      serialNumber: 'VAL-#042-BASE-L1',
      askPriceUsdc: 5400,
      mintPriceUsdc: 3499,
      sellerAddress: '0x19a4e8102948bca7821034f9810481ca90281bAc8',
      lifetimeYieldUsd: 2840,
      listedTime: '32 mins ago',
      verifiedAttestation: true
    },
    {
      nodeId: 88,
      tier: 'Genesis Tier 1',
      serialNumber: 'VAL-#088-BASE-L1',
      askPriceUsdc: 4800,
      mintPriceUsdc: 3499,
      sellerAddress: '0x71aE92b4C67029bCa38914D120B89104fE589841',
      lifetimeYieldUsd: 1980,
      listedTime: '1 hr ago',
      verifiedAttestation: true
    },
    {
      nodeId: 114,
      tier: 'Genesis Tier 1',
      serialNumber: 'VAL-#114-BASE-L1',
      askPriceUsdc: 4100,
      mintPriceUsdc: 3499,
      sellerAddress: '0x4389Bc10fA612489Ac90718cf34190281bAc8179',
      lifetimeYieldUsd: 940,
      listedTime: '2 hrs ago',
      verifiedAttestation: true
    },
    {
      nodeId: 129,
      tier: 'Genesis Tier 1',
      serialNumber: 'VAL-#129-BASE-L1',
      askPriceUsdc: 3950,
      mintPriceUsdc: 3499,
      sellerAddress: '0x94A180fA1762c9081e7d01248Ac9071Bcf3410a9',
      lifetimeYieldUsd: 580,
      listedTime: '4 hrs ago',
      verifiedAttestation: true
    }
  ]);

  const [showListModal, setShowListModal] = useState<boolean>(false);
  const [listNodeId, setListNodeId] = useState<number>(142);
  const [listAskPrice, setListAskPrice] = useState<number>(4500);
  const [purchasingNode, setPurchasingNode] = useState<SecondaryNodeListing | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: SecondaryNodeListing = {
      nodeId: Number(listNodeId),
      tier: 'Genesis Tier 1',
      serialNumber: `VAL-#${listNodeId}-BASE-L1`,
      askPriceUsdc: Number(listAskPrice),
      mintPriceUsdc: 3499,
      sellerAddress: '0x38Bc2149...71E4 (You)',
      lifetimeYieldUsd: 140,
      listedTime: 'Just now',
      verifiedAttestation: true
    };
    setListings([newListing, ...listings]);
    setShowListModal(false);
  };

  const handleExecutePurchase = (node: SecondaryNodeListing) => {
    setPurchasingNode(node);
    setTimeout(() => {
      setPurchaseSuccess(`Successfully acquired Node #${node.nodeId} for $${node.askPriceUsdc.toLocaleString()} USDC! Ownership NFT transferred to your wallet.`);
      setListings(listings.filter(l => l.nodeId !== node.nodeId));
      setPurchasingNode(null);
      setTimeout(() => setPurchaseSuccess(null), 6000);
    }, 1500);
  };

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Header Overview Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-purple-950/40 to-slate-950 border border-purple-500/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/40">
              <Cpu className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>P2P Secondary Sovereign Node OTC Marketplace</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  2.5% ROYALTY REPAIR SINK
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Node licenses are transferable ERC-721 institutional assets. Buy, sell, or exit capital anytime with automated escrow liquidity.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowListModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>List My Node For Sale</span>
          </button>
        </div>

        {/* Quick Market Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Primary Mint Price:</span>
            <div className="text-sm font-black text-white">$3,499 USDC</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Secondary Floor Price:</span>
            <div className="text-sm font-black text-emerald-400">$3,950 USDC (+12.8%)</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">24h Secondary Volume:</span>
            <div className="text-sm font-black text-cyan-300">$184,200 USDC</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Protocol Royalty:</span>
            <div className="text-sm font-black text-amber-400">2.5% Auto-Burned</div>
          </div>
        </div>
      </div>

      {purchaseSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{purchaseSuccess}</span>
        </div>
      )}

      {/* Secondary Listings Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-900/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-black uppercase text-white tracking-wider">
              Active Verified Secondary Node Orderbook
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">{listings.length} Active Secondary Listings</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/40 text-[10px] text-slate-400 uppercase border-b border-slate-800 font-bold">
              <tr>
                <th className="py-3 px-4">Node Serial &amp; Tier</th>
                <th className="py-3 px-4">Seller Wallet</th>
                <th className="py-3 px-4">Historical Yield</th>
                <th className="py-3 px-4">Listed</th>
                <th className="py-3 px-4 text-right">Asking Price</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px]">
              {listings.map((node) => {
                const profitPct = (((node.askPriceUsdc - node.mintPriceUsdc) / node.mintPriceUsdc) * 100).toFixed(1);
                return (
                  <tr key={node.nodeId} className="hover:bg-slate-900/50 transition">
                    <td className="py-3 px-4 space-y-0.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>Node #{node.nodeId}</span>
                        <span className="text-[10px] text-purple-300 font-sans">({node.serialNumber})</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">{node.tier}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-slate-400 font-mono">
                        {node.sellerAddress.substring(0, 8)}...{node.sellerAddress.substring(node.sellerAddress.length - 6)}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-emerald-400 font-bold font-mono">
                        +${node.lifetimeYieldUsd.toLocaleString()} USD-O
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-400 font-sans text-[10px]">
                      {node.listedTime}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="text-sm font-black text-amber-400">
                        ${node.askPriceUsdc.toLocaleString()} USDC
                      </div>
                      <div className="text-[10px] text-emerald-400 font-bold">
                        +{profitPct}% over mint
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleExecutePurchase(node)}
                        disabled={purchasingNode?.nodeId === node.nodeId}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition cursor-pointer disabled:opacity-50"
                      >
                        {purchasingNode?.nodeId === node.nodeId ? 'Executing Swap...' : 'Buy Node Now'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE SECONDARY LISTING MODAL */}
      {showListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0b1229] border border-purple-500/40 rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-purple-400" />
                <span>List Node NFT for Secondary Resale</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowListModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 block">Your Node ID to List:</label>
                <input
                  type="number"
                  value={listNodeId}
                  onChange={(e) => setListNodeId(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Asking Price (USDC):</label>
                <input
                  type="number"
                  value={listAskPrice}
                  onChange={(e) => setListAskPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-black text-sm outline-none"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Protocol Royalty (2.5%):</span>
                  <span className="text-slate-300 font-bold">${(listAskPrice * 0.025).toFixed(2)} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Estimated Payout:</span>
                  <span className="text-emerald-400 font-black">${(listAskPrice * 0.975).toFixed(2)} USDC</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowListModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-black transition cursor-pointer"
                >
                  Publish Orderbook Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
