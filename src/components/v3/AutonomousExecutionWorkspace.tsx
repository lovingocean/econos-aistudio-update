import React, { useState } from 'react';
import {
  CreditCard,
  Send,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Lock,
  ArrowRight,
  Database,
  Building,
  DollarSign,
  Activity,
  Layers,
  Key,
  RefreshCw,
  Terminal,
  FileCheck
} from 'lucide-react';
import {
  MOCK_BANKING_RAILS,
  MOCK_ERP_BRIDGES,
  INITIAL_EXECUTION_ORDERS,
  ExecutionOrder,
  BankingRail
} from '../../data/econosV3Data';
import { ExternalConnectorsGateway } from './ExternalConnectorsGateway';

export const AutonomousExecutionWorkspace: React.FC = () => {
  const [orders, setOrders] = useState<ExecutionOrder[]>(INITIAL_EXECUTION_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ord-881');
  const [bankingRails, setBankingRails] = useState<BankingRail[]>(MOCK_BANKING_RAILS);
  const [activeTab, setActiveTab] = useState<'DISPATCH_QUEUE' | 'BANKING_RAILS' | 'ERP_BRIDGES' | 'ROLLBACK_PROTOCOL' | 'LIVE_GATEWAY'>('DISPATCH_QUEUE');
  
  // Interactive Execution State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [rollbackSuccessMsg, setRollbackSuccessMsg] = useState<string | null>(null);

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleDispatchOrder = (orderId: string) => {
    setIsProcessing(true);
    setActionSuccessMsg(null);
    setRollbackSuccessMsg(null);

    setTimeout(() => {
      setOrders(prev => prev.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'SETTLED',
            dispatchedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            settledAt: new Date(Date.now() + 1500).toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
          };
        }
        return order;
      }));

      // Update rail allocation
      setBankingRails(prevRails => prevRails.map(rail => {
        if (rail.name === selectedOrder.rail) {
          return {
            ...rail,
            allocatedTodayUsd: rail.allocatedTodayUsd + selectedOrder.amountUsd
          };
        }
        return rail;
      }));

      setIsProcessing(false);
      setActionSuccessMsg(`Transaction successfully committed to ${selectedOrder.rail}. Merkle receipt validated.`);
    }, 1200);
  };

  const handleRollbackOrder = (orderId: string) => {
    setIsProcessing(true);
    setActionSuccessMsg(null);
    setRollbackSuccessMsg(null);

    setTimeout(() => {
      setOrders(prev => prev.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'ROLLED_BACK',
            rollbackAvailable: false
          };
        }
        return order;
      }));

      setIsProcessing(false);
      setRollbackSuccessMsg(`Compensation transaction executed. $${selectedOrder.amountUsd.toLocaleString()} returned to settlement account.`);
    }, 1000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-black">
              <Send className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Layer 11: Autonomous Execution Layer &amp; Banking Rails Bridge
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 font-bold uppercase">
              FedNow &bull; ISO 20022 Active
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            The bridge from mathematical economic decision packages to physical capital transfer. Enforces dual-key multi-signature limits, direct banking clearing rails, bi-directional ERP ledger posting, and deterministic transaction rollback protocols.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-right">
            <div className="text-[10px] text-slate-400">EXECUTION PROTOCOL</div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-Sig Dual-Key Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl px-4 pt-2 shadow-2xs gap-3">
        <button
          onClick={() => setActiveTab('DISPATCH_QUEUE')}
          className={`pb-2.5 px-3 font-mono text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'DISPATCH_QUEUE'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Execution Queue ({orders.filter(o => o.status === 'READY_TO_DISPATCH').length} Pending)</span>
        </button>
        <button
          onClick={() => setActiveTab('BANKING_RAILS')}
          className={`pb-2.5 px-3 font-mono text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'BANKING_RAILS'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Direct Banking Rails (4)</span>
        </button>
        <button
          onClick={() => setActiveTab('ERP_BRIDGES')}
          className={`pb-2.5 px-3 font-mono text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'ERP_BRIDGES'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>ERP Bi-Directional Bridges (3)</span>
        </button>
        <button
          onClick={() => setActiveTab('ROLLBACK_PROTOCOL')}
          className={`pb-2.5 px-3 font-mono text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'ROLLBACK_PROTOCOL'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Rollback &amp; Compensation Matrix</span>
        </button>
        <button
          onClick={() => setActiveTab('LIVE_GATEWAY')}
          className={`pb-2.5 px-3 font-mono text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'LIVE_GATEWAY'
              ? 'border-sky-600 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-sky-600" />
          <span>Live Connectors &amp; Webhooks (Layer 11B)</span>
        </button>
      </div>

      {/* Action Notification Banners */}
      {actionSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-center gap-3 text-xs font-mono text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}
      {rollbackSuccessMsg && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-center gap-3 text-xs font-mono text-amber-800">
          <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{rollbackSuccessMsg}</span>
        </div>
      )}

      {/* TAB 1: DISPATCH QUEUE */}
      {activeTab === 'DISPATCH_QUEUE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Order List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 font-bold px-1">
              <span>AUTHORIZED DISPATCH MANDATES</span>
              <span>{orders.length} TOTAL</span>
            </div>

            <div className="space-y-2.5">
              {orders.map(order => {
                const isSelected = order.id === selectedOrderId;
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-white border-emerald-500 shadow-xs ring-1 ring-emerald-500/20'
                        : 'bg-white/80 hover:bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-slate-900">{order.orderNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        order.status === 'SETTLED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'READY_TO_DISPATCH'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {(order.status || '').replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-800 line-clamp-1 mb-2">{order.title}</p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                      <span className="font-bold text-emerald-700 text-xs">${order.amountUsd.toLocaleString()}</span>
                      <span>{order.rail.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Order Detail & Interactive Dispatch Console */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-emerald-700">{selectedOrder.orderNumber}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                    {selectedOrder.governanceClass}
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900">{selectedOrder.title}</h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedOrder.proposingAgent}</p>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">TRANSFER AMOUNT</div>
                <div className="text-xl font-bold font-mono text-slate-900">${selectedOrder.amountUsd.toLocaleString()} USD</div>
              </div>
            </div>

            {/* Target Account & Rail Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block mb-0.5">TARGET BANKING RAIL</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedOrder.rail}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block mb-0.5">BENEFICIARY ACCOUNT</span>
                <span className="font-bold text-slate-800 truncate block">
                  {selectedOrder.targetAccount}
                </span>
              </div>
            </div>

            {/* Dual-Key Signers Matrix */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  Dual-Key Signatures Enforced
                </span>
                <span className="text-slate-500 text-[11px]">
                  {selectedOrder.signersApproved.length} of {selectedOrder.signersRequired.length} Validated
                </span>
              </div>

              <div className="space-y-1.5">
                {selectedOrder.signersRequired.map((signer, idx) => {
                  const isApproved = selectedOrder.signersApproved.includes(signer);
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-slate-400" />
                        {signer}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isApproved ? 'CRYPTOGRAPHICALLY SIGNED' : 'PENDING APPROVAL'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Merkle Proof & Cryptographic Integrity */}
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>MERKLE PROOF ROOT</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <FileCheck className="w-3 h-3" />
                  SHA-256 Validated
                </span>
              </div>
              <div className="text-[11px] text-slate-300 break-all bg-black/40 p-2 rounded border border-slate-800">
                {selectedOrder.merkleProofHash}
              </div>
            </div>

            {/* Compensation & Rollback Guarantee */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs font-mono text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-800">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                Rollback Compensation Protocol ({selectedOrder.rollbackWindowMinutes}m Window)
              </span>
              <p className="text-[11px] text-amber-800/90 leading-relaxed">
                {selectedOrder.compensationPlan}
              </p>
            </div>

            {/* Interactive Control Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {selectedOrder.status === 'READY_TO_DISPATCH' ? (
                <button
                  onClick={() => handleDispatchOrder(selectedOrder.id)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold transition shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting ISO 20022 Clearing Payload...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Authorize &amp; Dispatch to Banking Rails</span>
                    </>
                  )}
                </button>
              ) : selectedOrder.status === 'SETTLED' ? (
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Settled on Banking Rails ({selectedOrder.settledAt})</span>
                  </div>

                  {selectedOrder.rollbackAvailable && (
                    <button
                      onClick={() => handleRollbackOrder(selectedOrder.id)}
                      disabled={isProcessing}
                      className="px-3.5 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-mono font-bold transition border border-amber-300 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Trigger Rollback</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex-1 p-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-mono font-bold text-center">
                  Transaction Status: {selectedOrder.status}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BANKING RAILS */}
      {activeTab === 'BANKING_RAILS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bankingRails.map(rail => (
              <div key={rail.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="w-4 h-4 text-emerald-600" />
                      <h3 className="text-sm font-bold text-slate-900">{rail.name}</h3>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">Protocol: {rail.protocol}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    {rail.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 block">SETTLEMENT SPEED</span>
                    <span className="font-bold text-slate-800">{rail.settlementSpeed}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 block">NETWORK LATENCY</span>
                    <span className="font-bold text-slate-800">{rail.latencyMs} ms</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Daily Capacity Allocated</span>
                    <span>${(rail.allocatedTodayUsd / 1000000).toFixed(2)}M / ${(rail.dailyCapacityUsd / 1000000).toFixed(0)}M USD</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(rail.allocatedTodayUsd / rail.dailyCapacityUsd) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-900 text-[10px] font-mono text-slate-300 truncate">
                  Gateway: {rail.endpoint}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ERP BRIDGES */}
      {activeTab === 'ERP_BRIDGES' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_ERP_BRIDGES.map(bridge => (
              <div key={bridge.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{bridge.system}</h3>
                    <span className="font-mono text-[10px] text-slate-500">Sync: {(bridge.syncMode || '').replace(/_/g, ' ')}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    {bridge.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-mono leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  {bridge.protocol}
                </p>

                <div className="space-y-2 text-xs font-mono pt-1 border-t border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Last Sync:</span>
                    <span className="font-bold text-slate-800">{bridge.lastSyncTimestamp}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GL Reconciled Delta:</span>
                    <span className="font-bold text-emerald-600">$0.00 (Zero Drift)</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Unposted Queue:</span>
                    <span className="font-bold text-slate-800">{bridge.unpostedQueueCount} items</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ROLLBACK PROTOCOL */}
      {activeTab === 'ROLLBACK_PROTOCOL' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">Deterministic Transaction Rollback &amp; SAGA State Machine</h2>
            <p className="text-xs text-slate-500 font-mono">
              All autonomous transactions follow a distributed 2-phase commit protocol. If an execution anomaly is detected post-clearing, compensation hooks automatically reverse journal entries and invoke clawback rails.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">STAGE 1</span>
              <h4 className="font-bold text-slate-800">PREPARED</h4>
              <p className="text-slate-500 text-[11px]">Decision package verified against deterministic firewall rules and balance threshold checks.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">STAGE 2</span>
              <h4 className="font-bold text-slate-800">SIGNED</h4>
              <p className="text-slate-500 text-[11px]">Multi-signature keys collected (Ed25519) and anchored into the cryptographic block header.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">STAGE 3</span>
              <h4 className="font-bold text-slate-800">DISPATCHED</h4>
              <p className="text-slate-500 text-[11px]">Transmitted via FedNow / ISO 20022 clearing rails with SAGA compensation compensation hooks active.</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 text-[10px] font-bold">STAGE 4</span>
              <h4 className="font-bold text-emerald-800">SETTLED OR REVERSED</h4>
              <p className="text-emerald-700 text-[11px]">General Ledger verified against bank CAMT.053 intraday statement with zero variance.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LIVE CONNECTORS GATEWAY & WEBHOOKS */}
      {activeTab === 'LIVE_GATEWAY' && (
        <ExternalConnectorsGateway />
      )}
    </div>
  );
};
