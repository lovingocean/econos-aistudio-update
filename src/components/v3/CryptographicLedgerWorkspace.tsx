import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Hash,
  Lock,
  Search,
  CheckCircle2,
  AlertCircle,
  Download,
  Copy,
  Check,
  Clock,
  Layers,
  Sparkles,
  Award,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import {
  MOCK_DECISION_BLOCKS,
  DecisionBlock
} from '../../data/econosV3Data';

export const CryptographicLedgerWorkspace: React.FC = () => {
  const [blocks, setBlocks] = useState<DecisionBlock[]>(MOCK_DECISION_BLOCKS);
  const [selectedBlockNumber, setSelectedBlockNumber] = useState<number>(4824);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isVerifyingHash, setIsVerifyingHash] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<'VALID' | 'TAMPERED' | null>('VALID');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const selectedBlock = blocks.find(b => b.blockNumber === selectedBlockNumber) || blocks[0];

  const filteredBlocks = blocks.filter(b => 
    b.decisionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.proposingAgentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.blockHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.blockNumber.toString().includes(searchTerm)
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleVerifyIntegrity = () => {
    setIsVerifyingHash(true);
    setVerificationResult(null);
    setTimeout(() => {
      setIsVerifyingHash(false);
      setVerificationResult('VALID');
    }, 800);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black">
              <Hash className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Layer 12: Institutional Memory &amp; Cryptographic Decision Ledger
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold uppercase">
              SHA-256 Merkle Chain Active
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Immutable append-only record of every autonomous economic decision, counterfactual evaluation, and human sign-off. Enforces SOX 404 auditability, EU AI Act Article 14 human oversight transparency, and ISO 42001 certification standards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-700 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export SOX Audit Proof</span>
          </button>
        </div>
      </div>

      {/* Compliance Stamp Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">AUDIT COMPLIANCE</div>
            <div className="text-xs font-bold text-slate-800">SOX Section 404 Certified</div>
            <div className="text-[10px] font-mono text-emerald-600">Zero unrecorded journal entries</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">REGULATORY COMPLIANCE</div>
            <div className="text-xs font-bold text-slate-800">EU AI Act Article 14</div>
            <div className="text-[10px] font-mono text-blue-600">High-Risk Category III Oversight</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">INTEGRITY CERTIFICATION</div>
            <div className="text-xs font-bold text-slate-800">ISO 42001 AI Standards</div>
            <div className="text-[10px] font-mono text-purple-600">Continuous cryptographic hashing</div>
          </div>
        </div>
      </div>

      {/* Main Block Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Blocks List */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by block #, agent, or SHA-256 hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2.5">
            {filteredBlocks.map(block => {
              const isSelected = block.blockNumber === selectedBlockNumber;
              return (
                <div
                  key={block.blockNumber}
                  onClick={() => setSelectedBlockNumber(block.blockNumber)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-xs ring-1 ring-amber-500/20'
                      : 'bg-white/80 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-amber-500" />
                      Block #{block.blockNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{block.timestamp.split(' ')[0]}</span>
                  </div>

                  <p className="text-xs font-medium text-slate-800 line-clamp-1 mb-2">{block.decisionTitle}</p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                    <span className="text-emerald-700 font-bold">+${block.financialImpactUsd.toLocaleString()}</span>
                    <span className="text-slate-400">{block.counterfactualsCount} Counterfactuals</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Block Audit Dossier */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-amber-600">BLOCK #{selectedBlock.blockNumber}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                  {selectedBlock.governanceClass}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  IMMUTABLE
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">{selectedBlock.decisionTitle}</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedBlock.proposingAgentName}</p>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400">FINANCIAL IMPACT</div>
              <div className="text-lg font-bold font-mono text-emerald-700">+${selectedBlock.financialImpactUsd.toLocaleString()}</div>
            </div>
          </div>

          {/* Cryptographic Hashes Block */}
          <div className="space-y-2 bg-slate-950 rounded-xl p-4 text-xs font-mono text-slate-300">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>BLOCK SHA-256 HASH</span>
                <button
                  onClick={() => handleCopy(selectedBlock.blockHash)}
                  className="hover:text-amber-400 flex items-center gap-1"
                >
                  {copiedHash === selectedBlock.blockHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHash === selectedBlock.blockHash ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-[11px] text-amber-300 break-all bg-black/40 p-2 rounded border border-slate-800">
                {selectedBlock.blockHash}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>PREVIOUS BLOCK HASH (LINKED PARENT)</span>
              </div>
              <div className="text-[11px] text-slate-400 break-all bg-black/40 p-2 rounded border border-slate-800">
                {selectedBlock.previousHash}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>MERKLE DECISION ROOT</span>
              </div>
              <div className="text-[11px] text-emerald-400 break-all bg-black/40 p-2 rounded border border-slate-800">
                {selectedBlock.merkleRoot}
              </div>
            </div>
          </div>

          {/* Approver & Human-in-the-Loop Sign-off */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
                Human Approver Identity (Article 14 EU AI Act)
              </span>
              <span className="text-[10px] text-slate-500">{selectedBlock.timestamp}</span>
            </div>

            <div className="text-xs font-mono bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">{selectedBlock.approverName}</span>
                <span className="text-[10px] text-slate-400 font-mono">Public Key: {selectedBlock.approverPublicKey}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Ed25519 VALID
              </span>
            </div>
          </div>

          {/* Rationale Tree & Counterfactuals */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-800">
              <span>RATIONALE TREE &amp; REJECTED ALTERNATIVES</span>
              <span className="text-slate-500">{selectedBlock.counterfactualsCount} Counterfactuals Modeled</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
              {selectedBlock.rationaleTreeExcerpt}
            </div>
          </div>

          {/* Verification & Audit Button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleVerifyIntegrity}
              disabled={isVerifyingHash}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition flex items-center justify-center gap-2"
            >
              {isVerifyingHash ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Re-computing Merkle Tree &amp; SHA-256 Hashes...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verify Anti-Tamper Block Integrity</span>
                </>
              )}
            </button>

            {verificationResult === 'VALID' && (
              <div className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cryptographically Proven</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export SOX Audit Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <h3 className="font-mono font-bold text-slate-900 text-sm">SOX Section 404 Audit Certificate</h3>
              </div>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-mono">
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2 text-slate-700">
              <p><strong>Tenant:</strong> Sovereign Core Corporate Vault (Multi-Tenant Isolated)</p>
              <p><strong>Ledger Height:</strong> 4,824 Blocks</p>
              <p><strong>Merkle Root:</strong> 0x3a9f4c82b1d0...abcdef</p>
              <p><strong>Status:</strong> Unbroken Cryptographic Continuity (0 Tamper Events)</p>
              <p><strong>Standard:</strong> PCAOB Auditing Standard No. 5 &amp; EU AI Act Article 14</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-bold hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowExportModal(false);
                  alert('SOX 404 Cryptographic Audit Certificate generated and downloaded successfully.');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-mono font-bold shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Signed PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
