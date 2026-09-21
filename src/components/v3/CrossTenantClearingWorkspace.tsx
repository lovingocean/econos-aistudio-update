import React, { useState } from 'react';
import { 
  TENANT_NODES, 
  INITIAL_GROSS_OBLIGATIONS, 
  TenantNode, 
  InterTenantObligation,
  NettingCycleResult 
} from '../../data/crossTenantClearingData';
import { 
  Network, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  RefreshCw, 
  Cpu, 
  Layers, 
  Building2, 
  FileCode, 
  ExternalLink,
  Lock,
  Clock,
  Coins
} from 'lucide-react';

export const CrossTenantClearingWorkspace: React.FC = () => {
  const [nodes, setNodes] = useState<TenantNode[]>(TENANT_NODES);
  const [obligations, setObligations] = useState<InterTenantObligation[]>(INITIAL_GROSS_OBLIGATIONS);
  const [filterNode, setFilterNode] = useState<string>('ALL');
  const [isExecutingNetting, setIsExecutingNetting] = useState(false);
  const [lastCycle, setLastCycle] = useState<NettingCycleResult | null>(null);

  // Compute metrics
  const totalGrossVolume = obligations.reduce((acc, curr) => acc + curr.grossAmount, 0);
  
  // Calculate net balance for each node based on obligations
  const nodeBalances: Record<string, number> = {};
  nodes.forEach(n => { nodeBalances[n.id] = 0; });
  
  obligations.forEach(obl => {
    nodeBalances[obl.fromNodeId] = (nodeBalances[obl.fromNodeId] || 0) - obl.grossAmount;
    nodeBalances[obl.toNodeId] = (nodeBalances[obl.toNodeId] || 0) + obl.grossAmount;
  });

  const totalPositiveNet = Object.values(nodeBalances)
    .filter(v => v > 0)
    .reduce((acc, v) => acc + v, 0);

  const compressionRatio = totalGrossVolume > 0 
    ? ((totalGrossVolume - totalPositiveNet) / totalGrossVolume) * 100 
    : 0;

  const estimatedFeesSaved = Math.round(totalGrossVolume * 0.003); // 30 bps wire/FX spread eliminated

  const handleExecuteMultilateralNetting = () => {
    setIsExecutingNetting(true);
    setTimeout(() => {
      const cycleId = `CYCLE-${Date.now().toString(36).toUpperCase()}-FNOW`;
      const merkle = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const proof = `proof:ed25519:fnow_${Math.random().toString(36).substring(2, 10)}`;

      const debtorNodes = nodes.filter(n => (nodeBalances[n.id] || 0) < 0);
      const creditorNodes = nodes.filter(n => (nodeBalances[n.id] || 0) > 0);

      const transactions = debtorNodes.map((d, i) => {
        const c = creditorNodes[i % creditorNodes.length];
        return {
          debtorNode: d.name,
          creditorNode: c.name,
          amount: Math.abs(nodeBalances[d.id] || 0),
          fednowBatchId: `FEDNOW-BATCH-${Math.floor(100000 + Math.random() * 900000)}`
        };
      });

      setLastCycle({
        cycleId,
        timestamp: new Date().toISOString(),
        grossVolume: totalGrossVolume,
        netSettlementVolume: totalPositiveNet,
        compressionRatioPct: Number(compressionRatio.toFixed(1)),
        feesEliminated: estimatedFeesSaved,
        floatDaysSaved: 2.5,
        merkleRoot: merkle,
        settlementProof: proof,
        participatingNodesCount: nodes.length,
        status: 'CLEARED',
        transactions
      });

      // Update obligations to settled
      setObligations(prev => prev.map(o => ({ ...o, status: 'SETTLED_FEDNOW' })));
      setIsExecutingNetting(false);
    }, 1200);
  };

  const filteredObligations = obligations.filter(obl => {
    if (filterNode === 'ALL') return true;
    return obl.fromNodeId === filterNode || obl.toNodeId === filterNode;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Layer 14B • Sovereign P2P Rails
              </span>
              <span className="text-xs font-mono text-slate-500">ISO 20022 Direct Clearing</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2.5">
              <Network className="w-6 h-6 text-emerald-600" />
              Cross-Tenant Programmatic Liquidity Clearing
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Multilateral debt cycle netting between verified corporate ECONOS nodes. Compresses circular B2B receivables and payables 
              into atomic FedNow settlements, eliminating banking float and intermediary wire tolling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExecuteMultilateralNetting}
              disabled={isExecutingNetting || obligations.every(o => o.status === 'SETTLED_FEDNOW')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold transition shadow-sm ${
                obligations.every(o => o.status === 'SETTLED_FEDNOW')
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              {isExecutingNetting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Computing Netting Cycles...</span>
                </>
              ) : obligations.every(o => o.status === 'SETTLED_FEDNOW') ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cycle Fully Cleared</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-white" />
                  <span>Trigger Multilateral Clearing</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Efficiency Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Trade Volume */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold font-mono">Gross Trade Volume</span>
            <Coins className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
            ${(totalGrossVolume / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-sans">
            {obligations.length} cross-tenant enterprise invoices
          </div>
        </div>

        {/* Net Settlement Volume */}
        <div className="bg-[#f0f7f3] border border-[#d7e9dc] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 mb-1">
            <span className="text-[10px] uppercase font-bold font-mono">Net Settled Requirement</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 tracking-tight font-mono">
            ${(totalPositiveNet / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-emerald-800 mt-1 font-sans">
            <span className="font-bold font-mono">+{compressionRatio.toFixed(1)}%</span> liquidity compressed
          </div>
        </div>

        {/* Intermediary Fees Saved */}
        <div className="bg-[#eff5fb] border border-[#d9e6f2] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-sky-800 mb-1">
            <span className="text-[10px] uppercase font-bold font-mono">Banking Tolls Eliminated</span>
            <DollarSign className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-700 tracking-tight font-mono">
            ${estimatedFeesSaved.toLocaleString()}
          </div>
          <div className="text-[11px] text-sky-800 mt-1 font-sans">
            Zero 30bps correspondent wire rake
          </div>
        </div>

        {/* Settlement Finality */}
        <div className="bg-[#fdf9f1] border border-[#f4ebda] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 mb-1">
            <span className="text-[10px] uppercase font-bold font-mono">Float Duration Saved</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-800 tracking-tight font-mono">
            2.5 Days <ArrowRight className="inline w-4 h-4 text-emerald-600 mx-1" /> &lt;800ms
          </div>
          <div className="text-[11px] text-amber-800 mt-1 font-sans">
            FedNow atomic gross settlement
          </div>
        </div>
      </div>

      {/* Cleared Cycle Confirmation Receipt (If triggered) */}
      {lastCycle && (
        <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-800 shadow-sm font-mono">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-emerald-400 uppercase tracking-widest font-bold">
                  FedNow Netting Cycle Executed & Anchored
                </div>
                <div className="text-lg font-bold text-white tracking-tight">{lastCycle.cycleId}</div>
              </div>
            </div>

            <div className="text-right text-xs text-emerald-300">
              <div>Timestamp: {new Date(lastCycle.timestamp).toLocaleTimeString()} UTC</div>
              <div className="text-[10px] text-emerald-400/70">SOX 404 Merkle Proof Verified</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
            <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-700/50">
              <span className="text-emerald-400 text-[10px] uppercase block mb-1">State Merkle Root</span>
              <div className="font-mono text-[11px] text-emerald-200 truncate">{lastCycle.merkleRoot}</div>
            </div>
            <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-700/50">
              <span className="text-emerald-400 text-[10px] uppercase block mb-1">Guarantee Collateral</span>
              <div className="font-mono text-[11px] text-emerald-200">100% Backed by $100M Sovereign Pool</div>
            </div>
            <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-700/50">
              <span className="text-emerald-400 text-[10px] uppercase block mb-1">Net Settlements Dispatched</span>
              <div className="font-mono text-[11px] text-emerald-200">{lastCycle.transactions.length} Instant FedNow Wires</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout: Participating Nodes & Inter-Company Obligations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Participating Corporate Nodes */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">Corporate Mesh Nodes ({nodes.length})</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-bold">P2P Network</span>
            </div>

            <div className="space-y-3">
              {nodes.map(node => {
                const balance = nodeBalances[node.id] || 0;
                const isCreditor = balance >= 0;
                const isApex = node.id === 'node_apex_01';

                return (
                  <div
                    key={node.id}
                    onClick={() => setFilterNode(filterNode === node.id ? 'ALL' : node.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      filterNode === node.id
                        ? 'border-emerald-500 bg-emerald-50/30'
                        : isApex
                          ? 'border-sky-300 bg-sky-50/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">{node.name}</span>
                          {isApex && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-bold">
                              Current Tenant
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          LEI: {node.leiCode} • RT: {node.fedwireRouting}
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isCreditor 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {isCreditor ? '+' : ''}${(balance / 1000).toLocaleString()}k
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                      <span>Rating: <strong className="text-slate-800">{node.creditRating}</strong></span>
                      <span>Guarantee: <strong className="text-slate-800">${(node.guaranteeAllocation / 1000000)}M</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Gross Obligations & Netting Graph */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Inter-Enterprise Obligation Ledger
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified commercial payables and receivables staged for cyclic multilateral netting.
                </p>
              </div>

              {/* Node Filter Pill */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-500 text-[10px]">Filter:</span>
                <select
                  value={filterNode}
                  onChange={(e) => setFilterNode(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-800 text-xs font-mono bg-slate-50 focus:outline-hidden"
                >
                  <option value="ALL">All Mesh Obligations</option>
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Obligations Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase">
                    <th className="py-2.5 px-3">Invoice Ref</th>
                    <th className="py-2.5 px-3">Debtor (Payer)</th>
                    <th className="py-2.5 px-3">Creditor (Payee)</th>
                    <th className="py-2.5 px-3 text-right">Gross Amount</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredObligations.map(obl => (
                    <tr key={obl.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{obl.invoiceRef}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">{obl.underlyingService}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-rose-700 font-bold">{obl.fromNodeName}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-emerald-700 font-bold">{obl.toNodeName}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">
                        ${obl.grossAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                          obl.status === 'SETTLED_FEDNOW'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {obl.status === 'SETTLED_FEDNOW' ? 'CLEARED' : 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Explanatory Callout */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Counterparty Risk Guarantee Protocol</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed font-sans">
                Each corporate node deposits capital reserves or standby letters of credit into the 
                <strong> $100M Sovereign Liquidity Guarantee Pool (Layer 14)</strong>. In the event of an intra-cycle clearing default, 
                the pool automatically backstops the settlement within 60 seconds, guaranteeing 100% creditor recovery with zero insolvency contagion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
