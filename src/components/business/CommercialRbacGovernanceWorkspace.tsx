import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  DualControlApprovalTicket, 
  EnterpriseRolePermission, 
  EnterpriseRoleType,
  ApprovalRequestCategory
} from '../../types/econos';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  FileCheck2, 
  KeyRound, 
  ChevronRight, 
  Sliders, 
  Zap, 
  Sparkles,
  Printer,
  History,
  Check,
  Building
} from 'lucide-react';

export const CommercialRbacGovernanceWorkspace: React.FC = () => {
  const { currentOrg, user } = useAuth();

  const [activeTab, setActiveTab] = useState<'PENDING_QUEUE' | 'ROLE_MATRIX' | 'AUDIT_TRAIL'>('PENDING_QUEUE');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTicketForProof, setSelectedTicketForProof] = useState<DualControlApprovalTicket | null>(null);

  // Policy Thresholds State
  const [singleSignerLimitUsd, setSingleSignerLimitUsd] = useState(10000);
  const [dualSignerThresholdUsd, setDualSignerThresholdUsd] = useState(50000);
  const [maxDiscountWithoutCfoPct, setMaxDiscountWithoutCfoPct] = useState(15);
  const [policySaved, setPolicySaved] = useState(false);

  // Role Permissions
  const [roles, setRoles] = useState<EnterpriseRolePermission[]>([
    {
      role: 'CFO_SOVEREIGN_ADMIN',
      displayName: 'CFO & Sovereign Treasury Officer',
      description: 'Full sovereign fiduciary authority. Uncapped disbursement clearance, pricing floor override, and dual-key master authorization.',
      maxSingleSignerLimitUsd: 1000000,
      canApproveDualSignOff: true,
      canConfigureWebhooks: true,
      canOverridePricingFloor: true,
      canExecuteTreasurySweeps: true,
      canSignTaxFilings: true,
      activeMembersCount: 1
    },
    {
      role: 'CORPORATE_CONTROLLER',
      displayName: 'Corporate Controller',
      description: 'Second-signer dual-control authority. Authorizes wire disbursements up to $100,000, general ledger lock, and quarterly tax reserves.',
      maxSingleSignerLimitUsd: 25000,
      canApproveDualSignOff: true,
      canConfigureWebhooks: true,
      canOverridePricingFloor: false,
      canExecuteTreasurySweeps: true,
      canSignTaxFilings: true,
      activeMembersCount: 1
    },
    {
      role: 'TREASURY_OPERATOR',
      displayName: 'Treasury & Banking Specialist',
      description: 'First-signer disbursement initiator. Initiates ACH and Fedwire transfers up to $10,000, conducts bank reconciliation.',
      maxSingleSignerLimitUsd: 10000,
      canApproveDualSignOff: false,
      canConfigureWebhooks: false,
      canOverridePricingFloor: false,
      canExecuteTreasurySweeps: true,
      canSignTaxFilings: false,
      activeMembersCount: 2
    },
    {
      role: 'SALES_BILLING_LEAD',
      displayName: 'Commercial Sales & Billing Desk',
      description: 'CPQ quote generation, standard customer contracts, and invoice issuance. Can apply discounts up to the CFO policy ceiling.',
      maxSingleSignerLimitUsd: 0,
      canApproveDualSignOff: false,
      canConfigureWebhooks: false,
      canOverridePricingFloor: false,
      canExecuteTreasurySweeps: false,
      canSignTaxFilings: false,
      activeMembersCount: 3
    },
    {
      role: 'COMPLIANCE_AUDITOR',
      displayName: 'Tax & Compliance Auditor',
      description: 'Independent inspection role. Verifies Form 1099/W-9 vendor tax files, audits cryptographic receipts, read-only GL access.',
      maxSingleSignerLimitUsd: 0,
      canApproveDualSignOff: false,
      canConfigureWebhooks: false,
      canOverridePricingFloor: false,
      canExecuteTreasurySweeps: false,
      canSignTaxFilings: true,
      activeMembersCount: 1
    }
  ]);

  // Dual-Control Approval Tickets Queue
  const [tickets, setTickets] = useState<DualControlApprovalTicket[]>([
    {
      id: 'tkt_disb_01',
      organizationId: currentOrg?.id || 'org_real_econos',
      ticketNumber: 'DCT-2026-081',
      category: 'WIRE_DISBURSEMENT',
      title: 'High-Value Outbound Wire - AWS Cloud Infrastructure & Vector Compute',
      description: 'Quarterly cloud compute prepayment and dedicated GPU enclave reservation ($42,500.00 USD).',
      amountUsd: 42500,
      urgency: 'HIGH',
      status: 'PENDING_SECOND_SIGNATURE',
      initiatedBy: 'Sarah Vance (Treasury Operator)',
      initiatedAt: '2026-09-19T10:14:00Z',
      firstSignature: {
        signerName: 'Sarah Vance',
        signerRole: 'TREASURY_OPERATOR',
        signedAt: '2026-09-19T10:18:22Z',
        signatureHash: '0x918ba...4401'
      }
    },
    {
      id: 'tkt_quote_02',
      organizationId: currentOrg?.id || 'org_real_econos',
      ticketNumber: 'DCT-2026-082',
      category: 'CONTRACT_QUOTE_DISCOUNT',
      title: 'Enterprise CPQ Deal Floor Exception - Vanguard Global Infrastructure',
      description: 'Contract Quote with 28% volume discount (Exceeds 15% policy threshold). ACV: $164,160.00 USD.',
      amountUsd: 164160,
      urgency: 'HIGH',
      status: 'PENDING_FIRST_SIGNATURE',
      initiatedBy: 'David Miller (Sales Billing Lead)',
      initiatedAt: '2026-09-20T02:30:00Z'
    },
    {
      id: 'tkt_sweep_03',
      organizationId: currentOrg?.id || 'org_real_econos',
      ticketNumber: 'DCT-2026-079',
      category: 'TREASURY_SWEEP',
      title: 'Internal Operating Cash Sweep to Sovereign T-Bill Yield Facility',
      description: 'Transfer $250,000 from non-interest checking into 4.85% APY Treasury sweep.',
      amountUsd: 250000,
      urgency: 'MEDIUM',
      status: 'FULLY_APPROVED',
      initiatedBy: 'Sarah Vance (Treasury Operator)',
      initiatedAt: '2026-09-18T09:00:00Z',
      firstSignature: {
        signerName: 'Sarah Vance',
        signerRole: 'TREASURY_OPERATOR',
        signedAt: '2026-09-18T09:05:10Z',
        signatureHash: '0x38e12...b991'
      },
      secondSignature: {
        signerName: 'Meek Ifti',
        signerRole: 'CFO_SOVEREIGN_ADMIN',
        signedAt: '2026-09-18T09:20:44Z',
        signatureHash: '0x77d01...ff82'
      }
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Execute first signature
  const handleSignFirst = (ticketId: string) => {
    const hash = `0x${Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'PENDING_SECOND_SIGNATURE',
          firstSignature: {
            signerName: user?.name || 'Authorized First Signer',
            signerRole: 'TREASURY_OPERATOR',
            signedAt: new Date().toISOString(),
            signatureHash: hash
          }
        };
      }
      return t;
    }));
    showToast(`Signed as First Approver (${hash.substring(0, 10)}...). Escalated to Second Signer.`);
  };

  // Execute second signature (Ratification / Full Approval)
  const handleSignSecond = (ticketId: string) => {
    const hash = `0x${Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'FULLY_APPROVED',
          secondSignature: {
            signerName: `${user?.name || 'Meek Ifti'} (CFO Dual-Key)`,
            signerRole: 'CFO_SOVEREIGN_ADMIN',
            signedAt: new Date().toISOString(),
            signatureHash: hash
          }
        };
      }
      return t;
    }));
    showToast(`Dual-Control Signature Sealed! Ticket ratified and committed to sovereign execution.`);
  };

  // Reject ticket
  const handleRejectTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'REJECTED',
          rejectionReason: 'Rejected by CFO review: Quote discount must be renegotiated within 18% bounds.'
        };
      }
      return t;
    }));
    showToast(`Ticket rejected. Notification dispatched to initiator.`);
  };

  // Save policy thresholds
  const handleSavePolicy = () => {
    setPolicySaved(true);
    setTimeout(() => setPolicySaved(false), 3000);
    showToast(`Dual-Control governance policy thresholds saved and enforced.`);
  };

  // Statistics
  const pendingCount = tickets.filter(t => t.status === 'PENDING_FIRST_SIGNATURE' || t.status === 'PENDING_SECOND_SIGNATURE').length;
  const approvedCount = tickets.filter(t => t.status === 'FULLY_APPROVED').length;

  return (
    <div className="space-y-6 font-mono">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#132338] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200/80">
                Four-Eyes Governance & Dual Authorization
              </span>
              <span className="text-slate-400 text-xs">&bull; Enterprise RBAC Policy Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2 flex items-center gap-2 font-sans">
              Dual-Control Approval Chains & Role-Based Access Control
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl font-sans leading-relaxed">
              Enforce the four-eyes fiduciary principle across high-value wires, pricing quote discount overrides, and treasury asset reallocations. Cryptographically links dual signers before execution.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-purple-50 p-3 rounded-xl border border-purple-200/70 text-center">
              <div className="text-[10px] text-purple-600 font-bold uppercase">Pending Dual Approvals</div>
              <div className="text-xl font-bold text-purple-950 mt-0.5">{pendingCount} Actionable</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Active Roles</div>
              <div className="text-xl font-bold text-slate-900 mt-0.5">{roles.length} Tiered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs">
        <button
          onClick={() => setActiveTab('PENDING_QUEUE')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'PENDING_QUEUE'
              ? 'bg-[#132338] text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
          <span>Dual-Control Queue ({pendingCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('ROLE_MATRIX')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'ROLE_MATRIX'
              ? 'bg-[#132338] text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Role Matrix & Spending Limits</span>
        </button>

        <button
          onClick={() => setActiveTab('AUDIT_TRAIL')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
            activeTab === 'AUDIT_TRAIL'
              ? 'bg-[#132338] text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Ratified Sign-Off Archive ({approvedCount})</span>
        </button>
      </div>

      {/* TAB 1: Pending Dual-Control Queue */}
      {activeTab === 'PENDING_QUEUE' && (
        <div className="space-y-4">
          {tickets.map(tkt => {
            const isFullyApproved = tkt.status === 'FULLY_APPROVED';
            const isRejected = tkt.status === 'REJECTED';
            const isPendingFirst = tkt.status === 'PENDING_FIRST_SIGNATURE';
            const isPendingSecond = tkt.status === 'PENDING_SECOND_SIGNATURE';

            return (
              <div 
                key={tkt.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs space-y-4 transition ${
                  isFullyApproved 
                    ? 'border-emerald-200/80 bg-emerald-50/10' 
                    : isRejected 
                      ? 'border-rose-200/80 bg-rose-50/10'
                      : 'border-purple-200/90'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200/60">
                        {tkt.ticketNumber}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100">
                        {tkt.category.replace(/_/g, ' ')}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isFullyApproved 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isRejected 
                            ? 'bg-rose-100 text-rose-800'
                            : isPendingSecond 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-slate-100 text-slate-800'
                      }`}>
                        {tkt.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm font-sans mt-1">
                      {tkt.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans">
                      {tkt.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-400">Total Authorization Value</div>
                    <div className="text-xl font-bold text-slate-900 mt-0.5 font-mono">
                      ${tkt.amountUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                    </div>
                  </div>
                </div>

                {/* Dual Signature Progression Tracker */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                  {/* First Signature */}
                  <div className={`p-3 rounded-xl border ${
                    tkt.firstSignature 
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        {tkt.firstSignature ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-slate-400" />}
                        Primary Signer (Treasury / Billing)
                      </span>
                      <span className="text-[10px] font-mono">
                        {tkt.firstSignature ? 'Signed' : 'Awaiting Sign'}
                      </span>
                    </div>
                    {tkt.firstSignature ? (
                      <div className="mt-1 text-[11px] space-y-0.5">
                        <div className="font-medium text-slate-800">{tkt.firstSignature.signerName} ({tkt.firstSignature.signerRole.replace(/_/g, ' ')})</div>
                        <div className="text-[10px] text-slate-500">{tkt.firstSignature.signedAt}</div>
                        <div className="text-[10px] text-emerald-700 font-mono">Hash: {tkt.firstSignature.signatureHash}</div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <button
                          onClick={() => handleSignFirst(tkt.id)}
                          className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold transition"
                        >
                          Sign as First Approver
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Second Signature (Dual Control) */}
                  <div className={`p-3 rounded-xl border ${
                    tkt.secondSignature 
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                      : isPendingSecond
                        ? 'bg-purple-50/70 border-purple-200 text-purple-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        {tkt.secondSignature ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
                        Counter-Signer (CFO / Controller Dual-Key)
                      </span>
                      <span className="text-[10px] font-mono">
                        {tkt.secondSignature ? 'Dual Ratified' : isPendingSecond ? 'Action Required' : 'Locked'}
                      </span>
                    </div>
                    {tkt.secondSignature ? (
                      <div className="mt-1 text-[11px] space-y-0.5">
                        <div className="font-medium text-slate-800">{tkt.secondSignature.signerName} ({tkt.secondSignature.signerRole.replace(/_/g, ' ')})</div>
                        <div className="text-[10px] text-slate-500">{tkt.secondSignature.signedAt}</div>
                        <div className="text-[10px] text-emerald-700 font-mono">Dual Hash: {tkt.secondSignature.signatureHash}</div>
                      </div>
                    ) : isPendingSecond ? (
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleSignSecond(tkt.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1.5 transition"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Counter-Sign & Ratify</span>
                        </button>

                        <button
                          onClick={() => handleRejectTicket(tkt.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold transition border border-rose-200"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="mt-1 text-[10px] text-slate-400">
                        Second signature unlocks once primary sign-off is committed.
                      </div>
                    )}
                  </div>
                </div>

                {isFullyApproved && (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-mono">
                      <Check className="w-3.5 h-3.5" />
                      Executed under Four-Eyes Sovereign Fiduciary Protocol.
                    </span>
                    <button
                      onClick={() => setSelectedTicketForProof(tkt)}
                      className="text-xs text-indigo-700 hover:underline flex items-center gap-1"
                    >
                      <span>View Cryptographic Proof Slip</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Role Hierarchy & Policy Limits */}
      {activeTab === 'ROLE_MATRIX' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Role Matrix */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm font-sans">Enterprise Role Matrix & Access Hierarchy</h3>
            <div className="space-y-3">
              {roles.map(r => (
                <div key={r.role} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 font-sans text-sm">{r.displayName}</span>
                      <span className="text-[10px] text-slate-400 ml-2">({r.activeMembersCount} member)</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200/60">
                      Limit: ${r.maxSingleSignerLimitUsd > 0 ? r.maxSingleSignerLimitUsd.toLocaleString() : '0'} USD
                    </span>
                  </div>

                  <p className="text-slate-500 font-sans text-xs">
                    {r.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-[10px]">
                    <span className={`px-2 py-0.5 rounded ${r.canApproveDualSignOff ? 'bg-emerald-50 text-emerald-700 font-bold' : 'bg-slate-100 text-slate-400 line-through'}`}>
                      Dual Sign-off Authority
                    </span>
                    <span className={`px-2 py-0.5 rounded ${r.canOverridePricingFloor ? 'bg-emerald-50 text-emerald-700 font-bold' : 'bg-slate-100 text-slate-400 line-through'}`}>
                      CPQ Pricing Override
                    </span>
                    <span className={`px-2 py-0.5 rounded ${r.canExecuteTreasurySweeps ? 'bg-emerald-50 text-emerald-700 font-bold' : 'bg-slate-100 text-slate-400 line-through'}`}>
                      Treasury Sweeps
                    </span>
                    <span className={`px-2 py-0.5 rounded ${r.canSignTaxFilings ? 'bg-emerald-50 text-emerald-700 font-bold' : 'bg-slate-100 text-slate-400 line-through'}`}>
                      Tax Filings
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Interactive Policy Sliders */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-sans flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>Governance Policy Thresholds</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                Adjust corporate expenditure boundaries and dual-signature mandates.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-700">Single-Signer Wire Ceiling:</span>
                  <span className="text-indigo-700 font-mono">${singleSignerLimitUsd.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="25000"
                  step="2500"
                  value={singleSignerLimitUsd}
                  onChange={e => setSingleSignerLimitUsd(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 mt-0.5">Wires above this limit automatically require secondary approval.</div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-700">Dual-Signer Mandatory Threshold:</span>
                  <span className="text-indigo-700 font-mono">${dualSignerThresholdUsd.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="5000"
                  value={dualSignerThresholdUsd}
                  onChange={e => setDualSignerThresholdUsd(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 mt-0.5">Enforces mandatory CFO countersignature on all disbursements.</div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-700">Max CPQ Discount Without CFO:</span>
                  <span className="text-indigo-700 font-mono">{maxDiscountWithoutCfoPct}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={maxDiscountWithoutCfoPct}
                  onChange={e => setMaxDiscountWithoutCfoPct(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 mt-0.5">Sales quotes with discounts exceeding this trigger governance review.</div>
              </div>

              <button
                onClick={handleSavePolicy}
                className="w-full py-2.5 rounded-xl bg-[#132338] hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5"
              >
                {policySaved ? <Check className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4" />}
                <span>{policySaved ? 'Policy Ratified!' : 'Save & Enforce Policy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Ratified Sign-off Archive */}
      {activeTab === 'AUDIT_TRAIL' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm font-sans">Dual-Signature Governance Ledger</h3>
            <span className="text-[11px] text-slate-400">Immutable Audit Proofs with Counter-Signatures</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {tickets.filter(t => t.status === 'FULLY_APPROVED').map(tkt => (
              <div key={tkt.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{tkt.ticketNumber}</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">
                      FULLY RATIFIED
                    </span>
                  </div>
                  <div className="text-slate-600 text-xs mt-1 font-sans">{tkt.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Signers: {tkt.firstSignature?.signerName} &bull; {tkt.secondSignature?.signerName}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-900 text-sm">
                    ${tkt.amountUsd.toLocaleString()} USD
                  </div>
                  <button
                    onClick={() => setSelectedTicketForProof(tkt)}
                    className="text-[11px] text-indigo-700 hover:underline mt-1 block"
                  >
                    View Proof Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Proof Slip Modal */}
      {selectedTicketForProof && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm font-sans">Dual-Control Governance Attestation</h3>
              </div>
              <button 
                onClick={() => setSelectedTicketForProof(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2.5 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Ticket Ref:</span>
                <span className="font-bold text-slate-900">{selectedTicketForProof.ticketNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Action:</span>
                <span className="font-bold text-slate-900">{selectedTicketForProof.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authorized Value:</span>
                <span className="font-bold text-emerald-700">${selectedTicketForProof.amountUsd.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">First Signer:</span>
                <span className="text-slate-800">{selectedTicketForProof.firstSignature?.signerName} ({selectedTicketForProof.firstSignature?.signerRole})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Second Signer (Dual):</span>
                <span className="text-slate-800">{selectedTicketForProof.secondSignature?.signerName} ({selectedTicketForProof.secondSignature?.signerRole})</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 block mb-1">Dual-Key Consensus Hash:</span>
                <span className="text-[10px] break-all bg-white p-1.5 rounded border border-slate-200 text-slate-700 block">
                  {selectedTicketForProof.secondSignature?.signatureHash || '0x77d01...ff82'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Attestation</span>
              </button>
              <button
                onClick={() => setSelectedTicketForProof(null)}
                className="px-4 py-1.5 rounded-xl bg-[#132338] text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
