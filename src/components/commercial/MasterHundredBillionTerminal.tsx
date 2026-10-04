import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Globe2,
  Landmark,
  ArrowLeftRight,
  EyeOff,
  TrendingUp,
  Trophy,
  X,
  Sparkles,
  Layers,
  Zap,
  Activity,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { SmartContractDeploymentHub } from './SmartContractDeploymentHub';
import { EnterprisePaymentGatewayModal } from './EnterprisePaymentGatewayModal';
import { P2PNodeFederationConsole } from './P2PNodeFederationConsole';
import { InstitutionalRWAVault } from './InstitutionalRWAVault';
import { CrossBorderFXClearing } from './CrossBorderFXClearing';
import { ZkTaxAuditEnclave } from './ZkTaxAuditEnclave';
import { InvoiceFactoringMarketplace } from './InvoiceFactoringMarketplace';
import { QuantitativePropClearing } from './QuantitativePropClearing';
import { NextGenBlockchainBreakthroughs } from './NextGenBlockchainBreakthroughs';
import { RealWeb3ProofInspector } from './RealWeb3ProofInspector';

interface MasterHundredBillionTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPillar?: number;
}

export const MasterHundredBillionTerminal: React.FC<MasterHundredBillionTerminalProps> = ({
  isOpen,
  onClose,
  initialPillar = 1
}) => {
  const [activePillar, setActivePillar] = useState<number>(initialPillar);
  const [showStripeModal, setShowStripeModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const pillars = [
    { id: 10, label: '🔬 Real Web3 & RPC Proofs', title: 'Live Base RPC & MetaMask Signing', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 1, label: '1. Smart Contracts', title: 'Sovereign Validator Contracts', icon: ShieldCheck, color: 'text-cyan-400' },
    { id: 2, label: '2. Stripe & Plaid', title: 'Corporate Payment Rails', icon: CreditCard, color: 'text-indigo-400' },
    { id: 3, label: '3. P2P Gossip Mesh', title: 'Global Multi-Server Relays', icon: Globe2, color: 'text-purple-400' },
    { id: 4, label: '4. RWA Treasury Vault', title: 'Tokenized US T-Bills (4.8%)', icon: Landmark, color: 'text-emerald-400' },
    { id: 5, label: '5. Cross-Border FX', title: 'Atomic PvP Multi-Currency', icon: ArrowLeftRight, color: 'text-blue-400' },
    { id: 6, label: '6. ZK Tax Audit', title: 'Zero-Knowledge Solvency Enclave', icon: EyeOff, color: 'text-purple-400' },
    { id: 7, label: '7. Invoice Factoring', title: 'B2B 95% Cash Advance Marketplace', icon: TrendingUp, color: 'text-emerald-400' },
    { id: 8, label: '8. Prop Clearing', title: 'Quantitative Funded Challenges', icon: Trophy, color: 'text-amber-400' },
    { id: 9, label: '🌟 Unsolved Invariants', title: '5 Things Other Chains Lack', icon: Sparkles, color: 'text-pink-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#0b1328] border border-cyan-500/40 rounded-3xl w-full max-w-7xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[94vh] font-mono">
        
        {/* Top Header Strip */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-[#0d1c3a] to-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>ENTERPRISE MULTI-MODULE OPERATIONS TERMINAL</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>ECONOS Complete Enterprise Business Architecture</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                ALL MODULES ACTIVE
              </span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer self-start sm:self-center border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 8-Pillar Quick Switcher Bar */}
        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs font-bold shrink-0">
          {pillars.map(p => {
            const Icon = p.icon;
            const isSelected = activePillar === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePillar(p.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap text-xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${p.color}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Pillar Viewport */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Pillar 1 */}
          {activePillar === 1 && (
            <SmartContractDeploymentHub />
          )}

          {/* Pillar 2 */}
          {activePillar === 2 && (
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-400" />
                    <span>Pillar 2: Stripe &amp; Plaid Corporate Payment Terminal</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Accept corporate credit cards with real-time Luhn algorithm checks and instant B2B ACH bank wires through Plaid.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowStripeModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Launch Interactive Stripe &amp; Plaid Modal</span>
                </button>
              </div>

              {/* Status info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Card Processor:</div>
                  <div className="text-white font-bold">Stripe Payments (PCI-DSS Level 1)</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-slate-400">ACH Settlement:</div>
                  <div className="text-emerald-400 font-bold">Federal Reserve ACH (Direct Debit)</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Accounting Standard:</div>
                  <div className="text-cyan-300 font-bold">ASC 606 &bull; Automatic Invoicing</div>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 3 */}
          {activePillar === 3 && (
            <P2PNodeFederationConsole />
          )}

          {/* Pillar 4 */}
          {activePillar === 4 && (
            <InstitutionalRWAVault />
          )}

          {/* Pillar 5 */}
          {activePillar === 5 && (
            <CrossBorderFXClearing />
          )}

          {/* Pillar 6 */}
          {activePillar === 6 && (
            <ZkTaxAuditEnclave />
          )}

          {/* Pillar 7 */}
          {activePillar === 7 && (
            <InvoiceFactoringMarketplace />
          )}

          {/* Pillar 8 */}
          {activePillar === 8 && (
            <QuantitativePropClearing />
          )}

          {/* Breakthroughs: 5 Unsolved Invariants */}
          {activePillar === 9 && (
            <NextGenBlockchainBreakthroughs />
          )}

          {/* Real Web3 Proof Inspector */}
          {activePillar === 10 && (
            <RealWeb3ProofInspector />
          )}
        </div>

        {/* Embedded Payment Modal if Pillar 2 launches it */}
        {showStripeModal && (
          <EnterprisePaymentGatewayModal
            isOpen={showStripeModal}
            onClose={() => setShowStripeModal(false)}
            productTitle="AuraX $100B Super-Infrastructure Enterprise Access"
            productPrice={3499}
            productType="SOVEREIGN_NODE"
          />
        )}
      </div>
    </div>
  );
};
