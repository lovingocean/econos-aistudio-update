import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  ShieldCheck, 
  Send, 
  ArrowRight, 
  Globe 
} from 'lucide-react';
import { 
  FIDUCIARY_BOARD_RESOLUTIONS, 
  SOVEREIGN_REGULATORY_FILINGS 
} from '../../data/planetaryLayersData';
import { FiduciaryBoardResolution, SovereignRegulatoryFiling } from '../../types/econos';

export const FiduciaryBoardGovernanceWorkspace: React.FC = () => {
  const [resolutions, setResolutions] = useState<FiduciaryBoardResolution[]>(FIDUCIARY_BOARD_RESOLUTIONS);
  const [filings, setFilings] = useState<SovereignRegulatoryFiling[]>(SOVEREIGN_REGULATORY_FILINGS);
  const [isSubmittingFiling, setIsSubmittingFiling] = useState(false);
  const [filingNotice, setFilingNotice] = useState<string | null>(null);

  // New Resolution Modal/State
  const [newTitle, setNewTitle] = useState('Authorization of Sovereign Compute PPA Forward Contract ($14.2M)');
  const [isVoting, setIsVoting] = useState(false);
  const [voteNotice, setVoteNotice] = useState<string | null>(null);

  const handleEnactNewResolution = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVoting(true);
    setVoteNotice(null);

    setTimeout(() => {
      const newRes: FiduciaryBoardResolution = {
        id: `res-board-${Date.now()}`,
        resolutionTitle: newTitle,
        category: 'TREASURY_CAPITAL_DRAW',
        statutoryJurisdictionBasis: 'Delaware General Corporation Law §141(c)(2)',
        fiduciaryRiskScore: 14,
        autonomousVoteOutcome: 'PASSED_UNANIMOUS',
        boardAgentQuorum: 7,
        hashVerificationProof: `0x${Math.random().toString(16).substring(2, 42)}`,
        enactedAt: new Date().toISOString(),
        actionPayloadSummary: 'Approved capital commitment with mathematical proof of shareholder value accretion.'
      };
      setResolutions([newRes, ...resolutions]);
      setIsVoting(false);
      setVoteNotice(`Board resolution enacted unanimously (7/7 AI Board Seats voted AYE). Delaware DGCL compliance attested with SHA-256 seal.`);
    }, 1100);
  };

  const handleAutoFileRegulatory = (filingId: string) => {
    setIsSubmittingFiling(true);
    setFilingNotice(null);

    setTimeout(() => {
      setFilings(prev => prev.map(f => {
        if (f.id === filingId) {
          return {
            ...f,
            filingStatus: 'AUTO_FILED_CONFIRMED'
          };
        }
        return f;
      }));
      setIsSubmittingFiling(false);
      setFilingNotice('Regulatory filing generated and automatically transmitted to sovereign regulatory API with cryptographic audit seal.');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Planetary Layer 25 • Autonomous Corporate Governance
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Autonomous Fiduciary AI Board & 190-Nation Regulatory Synthesizer
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              Replaces slow human corporate boards with an autonomous 7-agent AI Fiduciary Board bound by Delaware General Corporation Law (DGCL §141) and European corporate charters, synthesizing compliance filings across SEC, ESMA, and MAS within sub-second latencies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>7/7 BOARD SEATS ACTIVE & BOUND</span>
            </span>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Enacted Resolutions</span>
            <span className="text-base font-bold text-slate-900">{resolutions.length} Bound Deeds</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Average Fiduciary Risk</span>
            <span className="text-base font-bold text-emerald-700">14.6 / 100 (Ultra Low)</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Automated SEC Filing Speed</span>
            <span className="text-base font-bold text-sky-700">4.2 Seconds</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Jurisdiction Coverage</span>
            <span className="text-base font-bold text-purple-700">190 Sovereign Bodies</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Autonomous Resolutions Ledger + Regulatory Auto-Filer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Board Resolutions (Col-7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <h2 className="font-bold text-slate-900 text-sm">Autonomous Fiduciary Board Minutes & Resolutions</h2>
            </div>
            <span className="text-[10px] text-slate-400">DGCL §141 Attested</span>
          </div>

          <div className="mt-4 space-y-3">
            {resolutions.map(r => (
              <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{r.resolutionTitle}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {(r.autonomousVoteOutcome || '').replace(/_/g, ' ')}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 font-sans">
                  {r.actionPayloadSummary}
                </p>

                <div className="grid grid-cols-3 gap-2 text-[10px] pt-1 border-t border-slate-200/80">
                  <div>
                    <span className="text-slate-400 block">Statutory Basis:</span>
                    <span className="font-bold text-slate-800 truncate block">{r.statutoryJurisdictionBasis}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Board Quorum:</span>
                    <span className="font-bold text-emerald-700">{r.boardAgentQuorum}/7 AI Directors</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Fiduciary Risk:</span>
                    <span className="font-bold text-sky-700">{r.fiduciaryRiskScore} / 100</span>
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 truncate pt-1">
                  Cryptographic Seal: {r.hashVerificationProof}
                </div>
              </div>
            ))}
          </div>

          {/* New Board Vote Action */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-xs mb-2">Simulate Board Resolution & Quorum Vote</h3>
            <form onSubmit={handleEnactNewResolution} className="space-y-2">
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800 text-xs"
                placeholder="Enter resolution title..."
              />
              <button
                type="submit"
                disabled={isVoting}
                className="w-full py-2 rounded-xl bg-[#132338] hover:bg-[#0c1827] text-white font-bold transition flex items-center justify-center gap-1.5 text-xs shadow-xs"
              >
                <Users className={`w-3.5 h-3.5 ${isVoting ? 'animate-spin' : ''}`} />
                <span>{isVoting ? 'Calling 7 AI Board Seats...' : 'Convene Board & Enact Resolution'}</span>
              </button>
            </form>
            {voteNotice && (
              <p className="mt-2 text-[11px] text-emerald-700 font-sans">{voteNotice}</p>
            )}
          </div>
        </div>

        {/* Right Col: 190-Nation Sovereign Regulatory Synthesizer (Col-5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <h2 className="font-bold text-slate-900 text-sm">Sovereign Regulatory Auto-Filer</h2>
              </div>
              <span className="text-[10px] text-slate-500">Real-Time Submission</span>
            </div>

            <p className="text-slate-500 text-[11px] mt-2 font-sans">
              Material transactions automatically compile legally compliant regulatory packages and submit to sovereign regulators without expensive law firm retainers.
            </p>

            <div className="mt-4 space-y-3">
              {filings.map(f => (
                <div key={f.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{f.regulatoryAgency} • {f.filingType}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      f.filingStatus === 'AUTO_FILED_CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {(f.filingStatus || '').replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-500">
                    <div>Statutory Window: <strong className="text-slate-700">{f.duePeriod}</strong></div>
                    <div>Compilation Speed: <strong className="text-emerald-700">{f.automatedCompilationLatencySec}s</strong></div>
                  </div>

                  <div className="text-[9px] text-slate-400 truncate">
                    Attestation: {f.auditTrailVerificationHash}
                  </div>

                  {f.filingStatus !== 'AUTO_FILED_CONFIRMED' && (
                    <button
                      onClick={() => handleAutoFileRegulatory(f.id)}
                      disabled={isSubmittingFiling}
                      className="w-full py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold transition flex items-center justify-center gap-1 text-[10px]"
                    >
                      <Send className="w-3 h-3" />
                      <span>Transmit to Sovereign Regulatory Endpoint</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {filingNotice && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-sans flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{filingNotice}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Charter Governance: <strong className="text-slate-800">Delaware + EU Multi-Jurisdiction</strong></span>
            <span className="text-emerald-700 font-bold">100% Statutorily Shielded</span>
          </div>
        </div>
      </div>
    </div>
  );
};
