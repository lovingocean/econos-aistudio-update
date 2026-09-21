import React, { useState } from 'react';
import { 
  Coins, 
  Landmark, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Percent, 
  Clock, 
  Building, 
  CheckCircle2, 
  Lock,
  Layers
} from 'lucide-react';
import { 
  INITIAL_TOKENIZED_RECEIVABLES, 
  INTRADAY_REPO_FACILITIES 
} from '../../data/sovereignDimensionsData';
import { TokenizedReceivable, IntradayRepoFacility } from '../../types/econos';

export const RwaRepoMarketWorkspace: React.FC = () => {
  const [receivables, setReceivables] = useState<TokenizedReceivable[]>(INITIAL_TOKENIZED_RECEIVABLES);
  const [facilities, setFacilities] = useState<IntradayRepoFacility[]>(INTRADAY_REPO_FACILITIES);
  const [selectedFacility, setSelectedFacility] = useState<string>('repo-fac-jpm');
  const [drawAmountUsd, setDrawAmountUsd] = useState(5000000);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [borrowSuccessMsg, setBorrowSuccessMsg] = useState<string | null>(null);

  // Toggle pledge status of an invoice
  const togglePledge = (id: string) => {
    setReceivables(receivables.map(r => {
      if (r.id === id) {
        const nextPledged = !r.isPledged;
        return {
          ...r,
          isPledged: nextPledged,
          pledgedToFacility: nextPledged ? selectedFacility : undefined
        };
      }
      return r;
    }));
  };

  const totalFaceValue = receivables.reduce((sum, r) => sum + r.faceValueUsd, 0);
  const totalBorrowCapacity = receivables.reduce((sum, r) => sum + r.availableCollateralBorrowUsd, 0);
  const pledgedCapacity = receivables.filter(r => r.isPledged).reduce((sum, r) => sum + r.availableCollateralBorrowUsd, 0);
  const totalFacilityLimits = facilities.reduce((sum, f) => sum + f.facilityLimitUsd, 0);
  const totalUtilizedBorrow = facilities.reduce((sum, f) => sum + f.utilizedBorrowUsd, 0);

  const handleExecuteDraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (drawAmountUsd > pledgedCapacity) {
      alert(`Draw amount exceeds currently pledged collateral capacity ($${(pledgedCapacity / 1000000).toFixed(2)}M). Pledge more invoices first.`);
      return;
    }

    setIsBorrowing(true);
    setBorrowSuccessMsg(null);

    setTimeout(() => {
      setFacilities(facilities.map(f => {
        if (f.id === selectedFacility) {
          return {
            ...f,
            utilizedBorrowUsd: f.utilizedBorrowUsd + drawAmountUsd
          };
        }
        return f;
      }));
      setIsBorrowing(false);
      setBorrowSuccessMsg(`Successfully executed $${(drawAmountUsd / 1000000).toFixed(2)}M intra-day repo draw at SOFR+22bps (5.53% APR). FedNow instant settlement cleared to operating account.`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Dimension 2 • RWA Collateral & Repo Rails
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Programmable RWA Collateral & Intra-Day Repo Market
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              Converts trapped enterprise receivables into yield-bearing ERC-3643 digital assets. Autonomous treasury agents borrow intra-day cash directly against tokenized collateral at benchmark SOFR rates, bypassing traditional 45-day invoice factoring.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>SOFR Benchmark: 5.31%</span>
            </span>
          </div>
        </div>

        {/* Macro Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Tokenized Receivables</span>
            <span className="text-base font-bold text-slate-900">
              ${(totalFaceValue / 1000000).toFixed(2)}M USD
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Pledged Collateral Line</span>
            <span className="text-base font-bold text-emerald-700">
              ${(pledgedCapacity / 1000000).toFixed(2)}M Active
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Active Repo Borrowing</span>
            <span className="text-base font-bold text-sky-700">
              ${(totalUtilizedBorrow / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">All-In Repo Rate</span>
            <span className="text-base font-bold text-purple-700">5.45% (vs 22% Factoring)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Receivables Tokenization Table + Flash Repo Draw Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Tokenized Invoices & Receivables (Col-7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <h2 className="font-bold text-slate-900 text-sm">Tokenized Accounts Receivable ({receivables.length})</h2>
            </div>
            <span className="text-[10px] text-slate-400">ERC-3643 Compliance Standard</span>
          </div>

          <div className="mt-4 space-y-3">
            {receivables.map(r => (
              <div
                key={r.id}
                className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  r.isPledged 
                    ? 'bg-emerald-50/40 border-emerald-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">{r.debtorName}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                      {r.debtorRating} Rating
                    </span>
                    <span className="text-[9px] text-slate-400">
                      {r.tokenStandard}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5 font-sans">
                    <span>Face Value: <strong className="text-slate-900 font-mono">${(r.faceValueUsd / 1000000).toFixed(2)}M</strong></span>
                    <span>•</span>
                    <span>LTV: <strong className="text-slate-800 font-mono">{r.loanToValuePct}%</strong></span>
                    <span>•</span>
                    <span>Yield: <strong className="text-emerald-700 font-mono">{r.annualYieldPct}%</strong></span>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono mt-1 truncate max-w-sm">
                    Contract: {r.tokenContractAddress.substring(0, 20)}...
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Available Borrow:</span>
                    <span className="font-bold text-slate-900 text-xs">
                      ${(r.availableCollateralBorrowUsd / 1000000).toFixed(2)}M
                    </span>
                  </div>

                  <button
                    onClick={() => togglePledge(r.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1.5 shadow-2xs ${
                      r.isPledged
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>{r.isPledged ? 'Pledged to Repo' : 'Pledge Collateral'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Pledged Borrow Capacity: <strong className="text-emerald-700 font-bold">${(pledgedCapacity / 1000000).toFixed(2)}M</strong></span>
            <span>Zero Unfunded Factoring Haircut</span>
          </div>
        </div>

        {/* Right Col: Intra-Day Repo Draw Studio (Col-5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-sky-600" />
                <h2 className="font-bold text-slate-900 text-sm">Intra-Day Liquidity Repo Facility</h2>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">Sub-Second FedNow</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-2 font-sans">
              Borrow immediate working capital at SOFR benchmark rates. Collateral is programmatically locked and unlocked upon daily cash sweep.
            </p>

            <form onSubmit={handleExecuteDraw} className="mt-4 space-y-3">
              <div>
                <label className="block text-slate-600 mb-1 text-[11px]">Select Counterparty Repo Desk</label>
                <select
                  value={selectedFacility}
                  onChange={e => setSelectedFacility(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800"
                >
                  {facilities.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.counterpartyName} ({f.allInRatePct}% APR)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 text-[11px]">Borrow Draw Amount ($)</label>
                <input
                  type="number"
                  step="500000"
                  min="500000"
                  max={pledgedCapacity}
                  value={drawAmountUsd}
                  onChange={e => setDrawAmountUsd(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800"
                />
              </div>

              {/* Terms summary box */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Benchmark SOFR Rate:</span>
                  <span className="font-bold text-slate-800">5.31%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Desk Spread:</span>
                  <span className="font-bold text-sky-700">+0.22% (22 bps)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">All-In Financing Cost:</span>
                  <span className="font-bold text-emerald-700">5.53% APR ($757/day per $5M)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Traditional Factoring Cost:</span>
                  <span className="text-rose-600 line-through">22.0% APR ($3,013/day)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500 font-bold">Daily Cash Savings:</span>
                  <span className="font-bold text-emerald-700">+$2,256 / day</span>
                </div>
              </div>

              {borrowSuccessMsg && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-sans flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{borrowSuccessMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isBorrowing || pledgedCapacity === 0}
                className="w-full py-2.5 px-4 rounded-xl bg-[#132338] hover:bg-[#0c1827] text-white font-bold transition flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                <Landmark className={`w-3.5 h-3.5 ${isBorrowing ? 'animate-spin' : ''}`} />
                <span>{isBorrowing ? 'Executing FedNow Transfer...' : 'Execute Intra-Day Repo Draw'}</span>
              </button>
            </form>
          </div>

          {/* Active facilities breakdown */}
          <div className="mt-5 pt-3 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 block mb-2 uppercase">Institutional Facilities Status</span>
            <div className="space-y-2">
              {facilities.map(f => {
                const pctUtilized = Math.round((f.utilizedBorrowUsd / f.facilityLimitUsd) * 100);
                return (
                  <div key={f.id} className="text-[11px]">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 font-medium truncate max-w-[200px]">{f.counterpartyName}</span>
                      <span className="text-slate-500 font-bold">${(f.utilizedBorrowUsd / 1000000).toFixed(1)}M / ${(f.facilityLimitUsd / 1000000).toFixed(0)}M</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${pctUtilized > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${pctUtilized}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
