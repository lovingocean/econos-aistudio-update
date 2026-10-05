import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Sparkles,
  Building2,
  Scale,
  Search,
  Lock,
  Download,
  AlertCircle
} from 'lucide-react';

interface UccFiling {
  id: string;
  filingNumber: string;
  filingJurisdiction: string;
  debtorName: string;
  debtorOrgId: string;
  securedPartyName: string;
  collateralDescription: string;
  status: 'PERFECTED_ACTIVE' | 'PENDING_SOS_SUBMISSION' | 'LAPSED';
  filedDate: string;
  lapseDate: string;
}

const INITIAL_UCC_FILINGS: UccFiling[] = [
  {
    id: 'ucc-1',
    filingNumber: 'TX-2026-0881920-UCC1',
    filingJurisdiction: 'Texas Secretary of State – Commercial Filing Section',
    debtorName: 'Apex Mechanical Solutions LLC',
    debtorOrgId: 'TX-SOS-080341902',
    securedPartyName: 'ECONOS Commercial Working Capital Liquidity Fund LP',
    collateralDescription: 'All present and after-acquired accounts receivable, chattel paper, payment intangibles, contract rights, inventory, and proceeds arising from construction contracts and AIA progress billings.',
    status: 'PERFECTED_ACTIVE',
    filedDate: '2026-04-12',
    lapseDate: '2031-04-12' // 5-year statutory perfection window
  },
  {
    id: 'ucc-2',
    filingNumber: 'DE-2026-4410982-UCC1',
    filingJurisdiction: 'Delaware Department of State – Division of Corporations',
    debtorName: 'Vanguard Electrical Systems Inc.',
    debtorOrgId: 'DE-DOS-7719204',
    securedPartyName: 'ECONOS Commercial Working Capital Liquidity Fund LP',
    collateralDescription: 'Blanket security interest in all equipment, machinery, copper inventory, tooling, accounts receivable, and general intangibles now owned or hereafter acquired.',
    status: 'PERFECTED_ACTIVE',
    filedDate: '2026-07-19',
    lapseDate: '2031-07-19'
  },
  {
    id: 'ucc-3',
    filingNumber: 'GA-2026-2201948-UCC1',
    filingJurisdiction: 'Georgia Superior Court Clerks’ Authority (GSCCCA)',
    debtorName: 'Peach State Structural Steel Fabricators LLC',
    debtorOrgId: 'GA-SOS-1902844',
    securedPartyName: 'ECONOS Commercial Working Capital Liquidity Fund LP',
    collateralDescription: 'All structural steel inventory, fabrication equipment, accounts, contract rights, and proceeds.',
    status: 'PENDING_SOS_SUBMISSION',
    filedDate: 'Pending',
    lapseDate: '2031-10-05'
  }
];

export const CommercialUccArticle9Workspace: React.FC = () => {
  const [filings, setFilings] = useState<UccFiling[]>(INITIAL_UCC_FILINGS);
  const [selectedFilingId, setSelectedFilingId] = useState<string>(INITIAL_UCC_FILINGS[0].id);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const selectedFiling = filings.find(f => f.id === selectedFilingId) || filings[0];

  const handlePerfectFiling = (id: string) => {
    setFilings(prev => prev.map(f => {
      if (f.id === id) {
        return {
          ...f,
          status: 'PERFECTED_ACTIVE',
          filedDate: new Date().toISOString().substring(0, 10),
          filingNumber: 'GA-2026-9920148-UCC1'
        };
      }
      return f;
    }));
    setNotification('UCC-1 Financing Statement successfully perfected with Secretary of State! First-priority lien secured.');
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 text-white shadow-xl border border-purple-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Uniform Commercial Code (UCC) Article 9</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>UCC Article 9 Secretary of State Priority Lien Perfection</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                UCC-1 Blanket Security
              </span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Legally perfects first-priority security interests over accounts receivable, heavy equipment, and contract rights across all 50 State Secretaries of State. Protects factoring advances against bankruptcy trustee clawbacks under 11 U.S.C. § 547.
            </p>
          </div>

          <div className="bg-purple-900/80 backdrop-blur-md rounded-xl p-4 border border-purple-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-purple-300">Active UCC-1 Filings</p>
            <p className="text-2xl font-mono font-black text-purple-300">
              {filings.filter(f => f.status === 'PERFECTED_ACTIVE').length} Perfected
            </p>
            <p className="text-[10px] text-slate-300">100% Bankruptcy Senior Priority</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* ACTIVE UCC-1 FILINGS TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Secretary of State UCC-1 Financing Ledgers</h3>
            <p className="text-xs text-slate-500">Official UCC-1 Article 9 registry filings establishing first-priority perfection</p>
          </div>

          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5 text-purple-400" />
            <span>Generate Official UCC-1 Form</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {filings.map(filing => {
            const isSelected = filing.id === selectedFilingId;
            return (
              <div
                key={filing.id}
                onClick={() => setSelectedFilingId(filing.id)}
                className={`p-6 transition cursor-pointer ${
                  isSelected ? 'bg-purple-50/40 border-l-4 border-l-purple-600' : 'hover:bg-slate-50/80'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded">
                        {filing.filingNumber}
                      </span>
                      <h4 className="font-bold text-slate-900 font-sans text-sm">{filing.debtorName}</h4>
                    </div>
                    <p className="text-slate-600 text-[11px] font-sans">
                      Jurisdiction: <span className="font-semibold text-slate-800">{filing.filingJurisdiction}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">
                      Collateral: {filing.collateralDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <p className="text-slate-500 text-[10px]">Statutory 5-Yr Window:</p>
                      <p className="font-bold text-slate-800">{filing.filedDate} → {filing.lapseDate}</p>
                    </div>

                    <div className="w-36 text-center">
                      {filing.status === 'PERFECTED_ACTIVE' ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          ✓ Perfected &amp; Active
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePerfectFiling(filing.id);
                          }}
                          className="px-3 py-1 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-[10px] font-bold shadow-xs transition"
                        >
                          Submit SOS E-Filing
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

      {/* UCC-1 FORM DETAIL MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 font-sans space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900">UCC FINANCING STATEMENT (FORM UCC-1)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 block font-bold">1. DEBTOR’S EXACT LEGAL NAME:</span>
                <p className="font-black text-slate-900 text-sm">{selectedFiling.debtorName}</p>
                <p className="text-[10px] text-slate-500">Org File Number: {selectedFiling.debtorOrgId}</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 block font-bold">2. SECURED PARTY’S NAME:</span>
                <p className="font-bold text-slate-900">{selectedFiling.securedPartyName}</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 block font-bold">3. COLLATERAL SPECIFICATION:</span>
                <p className="text-slate-700 leading-relaxed text-[11px] italic">
                  "{selectedFiling.collateralDescription}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official UCC-1</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition"
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
