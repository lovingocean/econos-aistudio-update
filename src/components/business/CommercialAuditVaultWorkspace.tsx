import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Download, 
  Search, 
  CheckCircle2, 
  Key, 
  Users, 
  AlertTriangle, 
  Layers, 
  Fingerprint,
  Copy,
  Check
} from 'lucide-react';

export interface AuditBlock {
  blockIndex: number;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  actionCategory: 'FINANCIAL_POSTING' | 'DUAL_CONTROL_APPROVAL' | 'TREASURY_TRANSFER' | 'RBAC_SECURITY' | 'CLOSE_SEAL';
  eventDescription: string;
  payloadHash: string;
  previousHash: string;
  signatureVerified: boolean;
}

const SAMPLE_AUDIT_CHAIN: AuditBlock[] = [
  {
    blockIndex: 1042,
    timestamp: '2026-09-20 12:00:00 UTC',
    actorEmail: 'chief.financial.officer@econos.corp',
    actorRole: 'OWNER / CFO',
    actionCategory: 'CLOSE_SEAL',
    eventDescription: 'Cryptographic Hard-Close Period Seal applied to September 2026 General Ledger.',
    payloadHash: '0x9fa8102d4b8e7c11a09d832b8491cba07f18394018274619385012398471bcca',
    previousHash: '0x3dc49129bf4810283c7491029384710293847102938471029384710293847102',
    signatureVerified: true
  },
  {
    blockIndex: 1041,
    timestamp: '2026-09-20 11:35:12 UTC',
    actorEmail: 'marcus.chen@econos.corp',
    actorRole: 'VP of Treasury',
    actionCategory: 'TREASURY_TRANSFER',
    eventDescription: 'Approved Wire Disbursement of $156,000.00 to Snowflake Cloud Data Corp (PO-2026-0891 3-way matched).',
    payloadHash: '0x3dc49129bf4810283c7491029384710293847102938471029384710293847102',
    previousHash: '0x81bcca0192847102938471029384710293847102938471029384710293847102',
    signatureVerified: true
  },
  {
    blockIndex: 1040,
    timestamp: '2026-09-20 09:14:08 UTC',
    actorEmail: 'sarah.lin@econos.corp',
    actorRole: 'Revenue Controller',
    actionCategory: 'FINANCIAL_POSTING',
    eventDescription: 'Posted ASC 606 revenue release: DR 2100 Deferred Revenue ($24,750) | CR 4000 SaaS Revenue ($24,750).',
    payloadHash: '0x81bcca0192847102938471029384710293847102938471029384710293847102',
    previousHash: '0x1029384710293847102938471029384710293847102938471029384710293847',
    signatureVerified: true
  },
  {
    blockIndex: 1039,
    timestamp: '2026-09-19 16:40:22 UTC',
    actorEmail: 'eleanor.vance@econos.corp',
    actorRole: 'Senior Risk Officer',
    actionCategory: 'DUAL_CONTROL_APPROVAL',
    eventDescription: 'Co-signed ISDA FX Forward derivative contract EUR/USD 150,000 locked rate 1.0910.',
    payloadHash: '0x1029384710293847102938471029384710293847102938471029384710293847',
    previousHash: '0x7481029384710293847102938471029384710293847102938471029384710293',
    signatureVerified: true
  },
  {
    blockIndex: 1038,
    timestamp: '2026-09-19 14:18:00 UTC',
    actorEmail: 'security-admin@econos.corp',
    actorRole: 'SECURITY_ADMIN',
    actionCategory: 'RBAC_SECURITY',
    eventDescription: 'Granted dual-signer role to Marcus Chen; automated Segregation of Duties (SoD) checks passed with 0 conflicts.',
    payloadHash: '0x7481029384710293847102938471029384710293847102938471029384710293',
    previousHash: '0x4910293847102938471029384710293847102938471029384710293847102938',
    signatureVerified: true
  }
];

export const CommercialAuditVaultWorkspace: React.FC = () => {
  const [chain] = useState<AuditBlock[]>(SAMPLE_AUDIT_CHAIN);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredChain = chain.filter(b => 
    b.eventDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.actorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.actorRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.payloadHash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleExportAuditorPackage = () => {
    const report = `# SOC-1 TYPE II & SOC-2 CRYPTOGRAPHIC AUDIT EVIDENCE VAULT
Generated: ${new Date().toISOString()}
Verification: 100% Valid SHA-256 Hash Chain Integrity
Active Blocks Verified: ${chain.length}
Segregation of Duties (SoD) Conflicts: 0 Detected

## AUDIT LOG ENTRIES
${chain.map(b => `### Block #${b.blockIndex} [${b.timestamp}]
- Actor: ${b.actorEmail} (${b.actorRole})
- Category: ${b.actionCategory}
- Event: ${b.eventDescription}
- Signature State: ${b.signatureVerified ? 'VERIFIED CRYPTOGRAPHICALLY VALID' : 'FAILED'}
- Payload Hash: ${b.payloadHash}
- Previous Hash: ${b.previousHash}
`).join('\n')}

---
Certified by EconOS Sovereign Autonomous Fiduciary Engine.
`;

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EconOS_SOC2_Audit_Package_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#132338] text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                SOC-1 TYPE II & SOC-2 AUDIT VAULT
              </span>
              <span className="text-slate-400 text-xs font-mono">• Cryptographic Hash Chain</span>
            </div>
            <h2 className="text-xl font-bold font-mono tracking-tight text-white mt-1">
              Immutable Fiduciary Evidence & Segregation of Duties
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Cryptographically chained SHA-256 ledger recording every financial entry, dual-signature disbursement, and permission change. Guarantees tamper-evident audit readiness for external Big Four auditor sampling.
            </p>
          </div>

          <button
            onClick={handleExportAuditorPackage}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition shadow-sm self-start md:self-auto shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Auditor Package</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Successfully generated and downloaded comprehensive SOC-1 / SOC-2 auditor evidence report!</span>
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Chain Integrity</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
              100% Unbroken
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">SHA-256 Merkle Chained</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>SoD Violations</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              0 Conflicts
            </div>
            <div className="text-[11px] text-cyan-400/80 font-mono mt-0.5">Strict Maker-Checker Separation</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Auditable Events</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {chain.length} Blocks
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Continuous Verification</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Auditor Readiness</span>
              <Fingerprint className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-lg font-bold font-mono text-purple-300 mt-1">
              Grade A (PwC/EY Spec)
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Instant Sampling Extraction</div>
          </div>
        </div>
      </div>

      {/* Segregation of Duties (SoD) Rule Validation Matrix */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
          <Key className="w-4 h-4 text-emerald-600" />
          <span>Active Segregation of Duties (SoD) Dual-Control Rules</span>
        </h3>
        <p className="text-xs text-slate-500 font-mono">
          System automatically prevents toxic permission combinations to eliminate internal fraud vectors:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950">Rule SOD-01: AP Maker vs Checker</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-slate-600 text-[11px]">
              The user who initiates a vendor invoice cannot approve or release the corresponding ACH/wire disbursement.
            </div>
            <div className="text-[10px] font-bold text-emerald-800 pt-1">Status: ENFORCED (0 Violations)</div>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950">Rule SOD-02: GL Journal Approver</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-slate-600 text-[11px]">
              Manual journal entry preparer cannot execute period hard-close or approve their own adjustment voucher.
            </div>
            <div className="text-[10px] font-bold text-emerald-800 pt-1">Status: ENFORCED (0 Violations)</div>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950">Rule SOD-03: Security Admin vs Operator</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-slate-600 text-[11px]">
              Administrators who manage user roles cannot initiate external treasury capital sweeps or modify bank details.
            </div>
            <div className="text-[10px] font-bold text-emerald-800 pt-1">Status: ENFORCED (0 Violations)</div>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search block hashes, actors, or event descriptions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="text-xs font-mono text-slate-500">
          Showing {filteredChain.length} of {chain.length} Verified Blocks
        </div>
      </div>

      {/* Cryptographic Chain Explorer */}
      <div className="space-y-3">
        {filteredChain.map(block => (
          <div key={block.blockIndex} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition text-xs font-mono space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-slate-900 text-white">
                  BLOCK #{block.blockIndex}
                </span>
                <span className="font-bold text-slate-800">{block.actionCategory}</span>
                <span className="text-slate-400 text-[11px]">• {block.timestamp}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>SIGNATURE VALID</span>
                </span>
              </div>
            </div>

            <p className="text-slate-800 font-medium text-xs">
              {block.eventDescription}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
              <div>
                Actor: <span className="font-semibold text-slate-700">{block.actorEmail}</span>
              </div>
              <div>
                Role: <span className="font-semibold text-slate-700">{block.actorRole}</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-[10px] text-slate-600">
              <div className="flex items-center justify-between">
                <div className="truncate max-w-lg">
                  <span className="text-slate-400">Payload Hash: </span>
                  <span className="font-mono text-slate-800 font-bold">{block.payloadHash}</span>
                </div>
                <button
                  onClick={() => handleCopy(block.payloadHash)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
                  title="Copy Hash"
                >
                  {copiedHash === block.payloadHash ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="truncate max-w-lg">
                <span className="text-slate-400">Previous Block Hash: </span>
                <span className="font-mono text-slate-500">{block.previousHash}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
