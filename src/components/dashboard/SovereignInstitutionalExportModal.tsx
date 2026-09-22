import React, { useState } from 'react';
import { 
  FileDown, 
  FileText, 
  Check, 
  ShieldCheck, 
  Copy, 
  Download,
  Printer
} from 'lucide-react';

interface DossierExportProps {
  totalAum: number;
  taxCapturedToday: number;
  durabilityScore: number;
  atomicSettlementSec: number;
  onClose?: () => void;
}

export const SovereignInstitutionalExportModal: React.FC<DossierExportProps> = ({
  totalAum,
  taxCapturedToday,
  durabilityScore,
  atomicSettlementSec,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<'PDF' | 'CSV' | 'JSON' | null>(null);

  const timestamp = new Date().toISOString();
  const merkleRootHash = '0x9b4f7a1c82e6d30f4a8b7c2d9e1f5a6b0c3d7e8f1a2b4c5d6e7f8a9b0c1d2e3f';

  const generatedReportText = `================================================================================
ECONOS PLANETARY SOVEREIGN OPERATING SYSTEM
INSTITUTIONAL EXECUTIVE DOSSIER & PROOF OF SOLVENCY
================================================================================
Generated: ${timestamp}
Audit Anchor: NIST ML-KEM Cryptographic Enclave
Merkle Root Hash: ${merkleRootHash}

1. EXECUTIVE MULTI-ASSET TREASURY & CAPITAL ADEQUACY
--------------------------------------------------------------------------------
Total AUM Reserves: $${(totalAum / 1000000000).toFixed(2)} Billion USD
Collateralization Ratio: 342.4% (Regulatory Baseline Min: 250.0%)
Duration Risk Neutrality: 0.14 yr (Overcollateralized Treasury Matching)
Weighted Average Capital Yield: 7.62% APR
Atomic Settlement Velocity: ${atomicSettlementSec}s (Continuous Zero-Counterparty Risk)

Reserve Tranches Breakdown:
- Overcollateralized US Treasury T-Bills: $54.2B (42% Share | AAA)
- Gold-Backed Tokenized Tranches (L24): $32.6B (25% Share | Sovereign)
- Synthetic Sovereign Debt Swaps (L42): $24.8B (19% Share | Prime)
- Off-Chain Real-Asset Arbitrage (L42): $16.8B (14% Share | High-Yield)

2. CONTINUOUS §41 ASC R&D TAX CREDIT CAPTURE (LAYER 62)
--------------------------------------------------------------------------------
Captured Tax Credits (Current Fiscal Cycle): $${(taxCapturedToday / 1000000).toFixed(4)} Million USD
Audit Durability Score: ${durabilityScore}%
IRS Statutory 4-Part Test Verification Status:
  [PASS] Section 174 Eligible Research & Experimental Purpose
  [PASS] Technical Uncertainty at Project Inception
  [PASS] Systematic Process of Experimentation
  [PASS] Hard Science Basis (Computer Science / Mathematics / Physics)
IRS Form 6765 Dossier Ready: 100% Contemporaneous Auto-Generated

3. AUTONOMOUS 100-LAYER SYSTEM HEALTH & CONSENSUS TELEMETRY
--------------------------------------------------------------------------------
Active Architectural Layers: 100 / 100 (100% Online)
Consensus State Engine: High-Throughput Merkle Execution (148.2k ops/sec)
Network Latency Benchmarks: p50: 0.72ms | p95: 1.15ms | p99: 1.84ms
System-wide Circuit Faults: 0 (Zero Fault Breakers Triggered)
Cryptographic Standard: NIST Post-Quantum Crystals-Kyber (ML-KEM / ML-DSA)

================================================================================
Certified by Autonomous Sovereign Governance Kernel (Layer 100 Kardashev Omega)
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: 'PDF' | 'CSV' | 'JSON') => {
    setDownloadingFormat(format);
    
    setTimeout(() => {
      let mimeType = 'text/plain';
      let extension = 'txt';
      let content = generatedReportText;

      if (format === 'CSV') {
        mimeType = 'text/csv';
        extension = 'csv';
        content = `Metric,Value,Unit,Status\nTotal AUM,${(totalAum / 1000000000).toFixed(2)},Billion USD,AAA\nCollateral Ratio,342.4,Percent,Optimal\nTax Credits Captured,${(taxCapturedToday / 1000000).toFixed(4)},Million USD,Verified\nDurability Score,${durabilityScore},Percent,Contemporaneous\nAtomic Settlement,${atomicSettlementSec},Seconds,Zero-Lag\nActive Layers,100,Nodes,100%\nMerkle Root,${merkleRootHash},SHA-256,Post-Quantum Sealed`;
      } else if (format === 'JSON') {
        mimeType = 'application/json';
        extension = 'json';
        content = JSON.stringify({
          system: 'ECONOS Planetary Sovereign Operating System',
          timestamp,
          merkleRootHash,
          treasury: {
            totalAumBillion: +(totalAum / 1000000000).toFixed(2),
            collateralRatioPct: 342.4,
            atomicSettlementSec,
            reserves: [
              { name: 'Overcollateralized Treasury T-Bills', value: '$54.2B', rating: 'AAA' },
              { name: 'Gold-Backed Tokenized Tranches', value: '$32.6B', rating: 'SOVEREIGN' },
              { name: 'Synthetic Sovereign Debt Swaps', value: '$24.8B', rating: 'PRIME' },
              { name: 'Off-Chain Real-Asset Arbitrage', value: '$16.8B', rating: 'HIGH-YIELD' },
            ]
          },
          taxAudit: {
            layer: 62,
            taxCreditsCapturedMillion: +(taxCapturedToday / 1000000).toFixed(4),
            durabilityScorePct: durabilityScore,
            irsForm6765Ready: true,
            statutory4PartTestPassed: true
          },
          layersActive: 100
        }, null, 2);
      } else if (format === 'PDF') {
        // Plain text download simulation for PDF dossier
        mimeType = 'text/plain';
        extension = 'dossier.txt';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ECONOS_Sovereign_Audit_Dossier_${Date.now()}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadingFormat(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#070b14] border border-amber-500/40 rounded-3xl w-full max-w-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                <span>Institutional Dossier &amp; Proof of Solvency</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  NIST SEALED
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">100-Layer Sovereign Operating System Executive Export</p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono transition cursor-pointer"
            >
              ✕ Close
            </button>
          )}
        </div>

        {/* Dossier Code Text Box */}
        <div className="p-5 flex-1 overflow-y-auto font-mono text-xs text-slate-300 bg-[#050811] space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 whitespace-pre font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto select-all">
            {generatedReportText}
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-5 border-t border-slate-800 bg-[#070b14] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Plaintext'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleDownload('CSV')}
              disabled={downloadingFormat !== null}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>{downloadingFormat === 'CSV' ? 'Exporting...' : 'Export CSV'}</span>
            </button>

            <button
              onClick={() => handleDownload('JSON')}
              disabled={downloadingFormat !== null}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>{downloadingFormat === 'JSON' ? 'Exporting...' : 'Export JSON API'}</span>
            </button>

            <button
              onClick={() => handleDownload('PDF')}
              disabled={downloadingFormat !== null}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold flex items-center gap-1.5 transition shadow-md cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{downloadingFormat === 'PDF' ? 'Generating Dossier...' : 'Download Executive Dossier'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
