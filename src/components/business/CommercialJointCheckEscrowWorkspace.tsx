import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Truck,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  FileCheck,
  Lock,
  Download,
  Printer,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Hash,
  Scale
} from 'lucide-react';

interface TriPartyEscrowContract {
  id: string;
  projectName: string;
  generalContractor: {
    name: string;
    contact: string;
    license: string;
    verified: boolean;
  };
  subcontractor: {
    name: string;
    contact: string;
    trade: string;
    bankAccount: string;
  };
  materialSupplier: {
    name: string;
    contact: string;
    materialType: string;
    bankAccount: string;
    supplierLienNoticeFiled: boolean;
  };
  totalContractValue: number;
  materialPortion: number;
  subcontractorLaborPortion: number;
  status: 'PENDING_FUNDING' | 'ESCROW_FUNDED' | 'DISBURSED_SETTLED';
  deliveryTicketNumber: string;
  deliveryVerified: boolean;
  blockReceiptHash?: string;
  settledAt?: string;
}

const INITIAL_CONTRACTS: TriPartyEscrowContract[] = [
  {
    id: 'ESC-2026-9041',
    projectName: 'Dallas Children’s Medical Center – Phase II HVAC Retrofit',
    generalContractor: {
      name: 'Turner Construction Co.',
      contact: 'compliance@turnerconstruction.com',
      license: 'TX-GC-884920',
      verified: true
    },
    subcontractor: {
      name: 'Apex Mechanical Solutions LLC',
      contact: 'billing@apexmechanical.com',
      trade: 'Commercial Mechanical / HVAC',
      bankAccount: 'JPMorgan Chase (****4829)'
    },
    materialSupplier: {
      name: 'Ferguson Commercial HVAC & Piping Supply',
      contact: 'ar-commercial@ferguson.com',
      materialType: 'Trane Chillers & Heavy Ductwork',
      bankAccount: 'Bank of America (****9104)',
      supplierLienNoticeFiled: true
    },
    totalContractValue: 115000,
    materialPortion: 42500,
    subcontractorLaborPortion: 72500,
    status: 'ESCROW_FUNDED',
    deliveryTicketNumber: 'FERG-DAL-889102-DLV',
    deliveryVerified: true,
    blockReceiptHash: '0x8f4b7a19c43d81992e59a4b3701f2bc88194cf921d7b3014c2b9a7f8e120da33',
    settledAt: '2026-10-04 14:22:00 CST'
  },
  {
    id: 'ESC-2026-9042',
    projectName: 'Austin Tech Innovation Hub – High-Rise Electrical Feed',
    generalContractor: {
      name: 'Balfour Beatty US',
      contact: 'payments@balfourbeattyus.com',
      license: 'TX-GC-774019',
      verified: true
    },
    subcontractor: {
      name: 'Vanguard Electrical Systems LLC',
      contact: 'ops@vanguardelectrical.com',
      trade: 'High-Voltage Commercial Electrical',
      bankAccount: 'Wells Fargo (****3301)'
    },
    materialSupplier: {
      name: 'Graybar Commercial Electric Supply',
      contact: 'credit@graybar.com',
      materialType: 'Copper Feeders & Switchgear Gear',
      bankAccount: 'Citibank (****7210)',
      supplierLienNoticeFiled: true
    },
    totalContractValue: 184000,
    materialPortion: 86000,
    subcontractorLaborPortion: 98000,
    status: 'PENDING_FUNDING',
    deliveryTicketNumber: 'GRAY-ATX-554109-POD',
    deliveryVerified: false
  },
  {
    id: 'ESC-2026-9043',
    projectName: 'Houston Logistics Parkway – Industrial Roofing & Membrane',
    generalContractor: {
      name: 'Austin Commercial LP',
      contact: 'lienmanagement@austin-ind.com',
      license: 'TX-GC-661048',
      verified: true
    },
    subcontractor: {
      name: 'Lone Star Commercial Roofing Inc.',
      contact: 'finance@lonestarroof.com',
      trade: 'TPO Single-Ply Roofing & Insulation',
      bankAccount: 'Frost Bank (****8192)'
    },
    materialSupplier: {
      name: 'ABC Supply Co. Commercial Roofing Division',
      contact: 'houston-credit@abcsupply.com',
      materialType: 'Firestone 60-mil TPO & Polyiso Insulation',
      bankAccount: 'PNC Bank (****6044)',
      supplierLienNoticeFiled: true
    },
    totalContractValue: 92000,
    materialPortion: 38000,
    subcontractorLaborPortion: 54000,
    status: 'ESCROW_FUNDED',
    deliveryTicketNumber: 'ABC-HOU-332014-BOL',
    deliveryVerified: true
  }
];

export const CommercialJointCheckEscrowWorkspace: React.FC = () => {
  const [contracts, setContracts] = useState<TriPartyEscrowContract[]>(INITIAL_CONTRACTS);
  const [selectedContractId, setSelectedContractId] = useState<string>(INITIAL_CONTRACTS[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWaiverModal, setShowWaiverModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const selectedContract = contracts.find(c => c.id === selectedContractId) || contracts[0];

  const handleFundEscrow = (id: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setContracts(prev => prev.map(c => {
        if (c.id === id) {
          return {
            ...c,
            status: 'ESCROW_FUNDED',
            deliveryVerified: true
          };
        }
        return c;
      }));
      setIsProcessing(false);
      setNotification(`Escrow successfully funded for ${id}. Funds locked in FDIC-insured custody.`);
      setTimeout(() => setNotification(null), 4000);
    }, 700);
  };

  const handleExecuteAtomicSplit = (id: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setContracts(prev => prev.map(c => {
        if (c.id === id) {
          return {
            ...c,
            status: 'DISBURSED_SETTLED',
            blockReceiptHash: generatedHash,
            settledAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
          };
        }
        return c;
      }));
      setIsProcessing(false);
      setShowWaiverModal(true);
      setNotification(`Atomic Tri-Party wire split executed! Both Supplier and Subcontractor statutory lien waivers minted.`);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>World-First Construction FinOps Innovation</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Tri-Party Joint-Check &amp; Escrow Clearing Protocol</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                UCC § 9-406 &amp; Texas Prop. Code § 53
              </span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Solves the #1 cause of construction insolvency: General Contractor "Pay-When-Paid" payment delays and Material Supplier mechanic liens. Funds are locked into smart escrow, automatically split between supplier and subcontractor, and paired with simultaneous atomic statutory lien releases.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-3 border border-slate-700/60 text-right">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Total Escrow Volume</p>
              <p className="text-xl font-mono font-black text-emerald-400">$391,000.00</p>
              <p className="text-[10px] text-slate-400">100% Lien-Free Protection</p>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* THREE-PARTY ARCHITECTURE VISUALIZER */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-600" />
          <span>Autonomous Tri-Party Clearing Topology</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* PARTY 1: GENERAL CONTRACTOR */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">GC</div>
              <div>
                <p className="text-xs font-bold text-slate-900">{selectedContract.generalContractor.name}</p>
                <p className="text-[10px] font-mono text-slate-500">General Contractor (Payer)</p>
              </div>
            </div>
            <div className="space-y-1 text-[11px] text-slate-600 font-mono">
              <p>License: <span className="font-semibold text-slate-800">{selectedContract.generalContractor.license}</span></p>
              <p>Obligation: <span className="font-bold text-indigo-700">${selectedContract.totalContractValue.toLocaleString()} Total</span></p>
              <p className="text-[10px] text-emerald-600 font-bold">✓ 0% Mechanic Lien Exposure</p>
            </div>
          </div>

          {/* ESCROW CLEARING PROTOCOL */}
          <div className="p-4 rounded-xl bg-indigo-900 text-white border border-indigo-700 shadow-md text-center relative">
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-indigo-800 text-emerald-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <p className="text-xs font-black tracking-wide uppercase font-mono text-emerald-400">ECONOS Smart Escrow</p>
            <p className="text-[10px] text-indigo-200 mt-1">FDIC Insured Tri-Party Custody</p>
            <div className="mt-3 py-1.5 px-3 rounded-md bg-indigo-950/70 border border-indigo-700/60 font-mono text-xs text-white">
              Split: ${selectedContract.materialPortion.toLocaleString()} / ${selectedContract.subcontractorLaborPortion.toLocaleString()}
            </div>
            <p className="text-[9px] text-indigo-300 mt-2 font-mono">Simultaneous Atomic Disbursal</p>
          </div>

          {/* PARTY 2 & 3: SPLIT BENEFICIARIES */}
          <div className="space-y-2">
            {/* MATERIAL SUPPLIER */}
            <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{selectedContract.materialSupplier.name}</p>
                    <p className="text-[10px] text-emerald-700 font-mono font-semibold">Material Supplier (Direct Wire)</p>
                  </div>
                </div>
                <span className="font-mono font-black text-xs text-emerald-800">${selectedContract.materialPortion.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Item: {selectedContract.materialSupplier.materialType}</p>
            </div>

            {/* SUBCONTRACTOR */}
            <div className="p-3 rounded-lg bg-cyan-50/80 border border-cyan-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-700" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{selectedContract.subcontractor.name}</p>
                    <p className="text-[10px] text-cyan-700 font-mono font-semibold">Trade Subcontractor (Direct Wire)</p>
                  </div>
                </div>
                <span className="font-mono font-black text-xs text-cyan-800">${selectedContract.subcontractorLaborPortion.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Trade: {selectedContract.subcontractor.trade}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTRACT SELECTION & EXECUTION TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Active Joint-Check Clearing Ledgers</h2>
            <p className="text-xs text-slate-500">Select an escrow contract to inspect or execute atomic dual-party payout</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500">Live Status:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Escrow Node Online
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {contracts.map(contract => {
            const isSelected = contract.id === selectedContractId;
            return (
              <div
                key={contract.id}
                onClick={() => setSelectedContractId(contract.id)}
                className={`p-6 transition cursor-pointer ${
                  isSelected ? 'bg-indigo-50/40 border-l-4 border-l-indigo-600' : 'hover:bg-slate-50/80'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                        {contract.id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{contract.projectName}</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      General Contractor: <span className="font-semibold text-slate-800">{contract.generalContractor.name}</span> | Sub: <span className="font-semibold text-slate-800">{contract.subcontractor.name}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Supplier: {contract.materialSupplier.name} ({contract.materialSupplier.materialType})
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right font-mono">
                      <p className="text-sm font-black text-slate-900">${contract.totalContractValue.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500">
                        Sup: ${contract.materialPortion.toLocaleString()} | Sub: ${contract.subcontractorLaborPortion.toLocaleString()}
                      </p>
                    </div>

                    <div className="w-32 text-center">
                      {contract.status === 'PENDING_FUNDING' && (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                          Pending Funding
                        </span>
                      )}
                      {contract.status === 'ESCROW_FUNDED' && (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold">
                          Escrow Funded
                        </span>
                      )}
                      {contract.status === 'DISBURSED_SETTLED' && (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                          Settled &amp; Waivers Minted
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {contract.status === 'PENDING_FUNDING' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFundEscrow(contract.id);
                          }}
                          disabled={isProcessing}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold shadow-xs transition"
                        >
                          Lock Funds into Escrow
                        </button>
                      )}

                      {contract.status === 'ESCROW_FUNDED' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExecuteAtomicSplit(contract.id);
                          }}
                          disabled={isProcessing}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold shadow-xs transition flex items-center gap-1.5"
                        >
                          <span>Execute Atomic Wire Split</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}

                      {contract.status === 'DISBURSED_SETTLED' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowWaiverModal(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-mono font-bold shadow-xs transition flex items-center gap-1.5"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>View Signed Waivers</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SIGNED LIEN WAIVERS & CLEARANCE CERTIFICATE MODAL */}
      {showWaiverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Atomic Dual Statutory Lien Release Package</h3>
                  <p className="text-xs text-slate-500 font-mono">Contract Ref: {selectedContract.id} | Clearing Hash: {selectedContract.blockReceiptHash?.substring(0, 16)}...</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWaiverModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* CERTIFICATE BANNER */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>FDIC SMART ESCROW WIRE CLEARANCE RECEIPT</span>
                  <span>STATUS: SETTLED</span>
                </div>
                <p className="text-slate-300">
                  Transaction Hash: <span className="text-white">{selectedContract.blockReceiptHash}</span>
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-400">Supplier Wire ($42,500.00):</span>
                    <p className="text-white font-bold">{selectedContract.materialSupplier.bankAccount} (Fedwire Sent)</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Subcontractor Wire ($72,500.00):</span>
                    <p className="text-white font-bold">{selectedContract.subcontractor.bankAccount} (Fedwire Sent)</p>
                  </div>
                </div>
              </div>

              {/* STATUTORY WAIVER 1: MATERIAL SUPPLIER */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex justify-between items-center font-bold text-slate-900 pb-2 border-b border-slate-200">
                  <span className="font-mono text-indigo-700">1. MATERIAL SUPPLIER STATUTORY LIEN WAIVER (TEXAS § 53.281)</span>
                  <span className="text-emerald-700 font-mono">✓ Executed &amp; Released</span>
                </div>
                <p className="italic text-slate-600 leading-relaxed">
                  "The undersigned, {selectedContract.materialSupplier.name}, having received payment in the sum of ${selectedContract.materialPortion.toLocaleString()} via ECONOS Tri-Party Escrow Clearing, hereby waives and releases any and all mechanic's lien rights, claims, or stop notices for materials furnished on {selectedContract.projectName}."
                </p>
                <div className="flex justify-between pt-2 text-[11px] font-mono text-slate-500">
                  <span>Signatory: Authorized Officer, Ferguson Supply</span>
                  <span>Notary Seal: Digital Cryptographic SHA-256</span>
                </div>
              </div>

              {/* STATUTORY WAIVER 2: TRADE SUBCONTRACTOR */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex justify-between items-center font-bold text-slate-900 pb-2 border-b border-slate-200">
                  <span className="font-mono text-indigo-700">2. SUBCONTRACTOR UNCONDITIONAL PROGRESS WAIVER</span>
                  <span className="text-emerald-700 font-mono">✓ Executed &amp; Released</span>
                </div>
                <p className="italic text-slate-600 leading-relaxed">
                  "The undersigned, {selectedContract.subcontractor.name}, having received payment in the sum of ${selectedContract.subcontractorLaborPortion.toLocaleString()} via ECONOS Tri-Party Escrow Clearing, hereby waives and releases any and all lien rights for labor and services performed through milestone clearance."
                </p>
                <div className="flex justify-between pt-2 text-[11px] font-mono text-slate-500">
                  <span>Signatory: Managing Member, Apex Mechanical</span>
                  <span>Notary Seal: Digital Cryptographic SHA-256</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Legal compliance: UCC § 9-406 &amp; Texas Property Code § 53
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Formal Package</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowWaiverModal(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold transition"
                >
                  Close &amp; Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
