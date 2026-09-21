import React, { useState } from 'react';
import {
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  PieChart,
  RefreshCw,
  Zap,
  Globe2,
  FileCheck
} from 'lucide-react';
import {
  MOCK_GUARANTEE_METRICS,
  MOCK_CREDIT_FACILITIES,
  GuaranteePoolMetrics,
  CreditFacility
} from '../../data/econosV3Data';

export const GlobalCapitalNetworkWorkspace: React.FC = () => {
  const [metrics, setMetrics] = useState<GuaranteePoolMetrics>(MOCK_GUARANTEE_METRICS);
  const [facilities, setFacilities] = useState<CreditFacility[]>(MOCK_CREDIT_FACILITIES);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('fac-cp-01');
  
  // Interactive Drawdown State
  const [drawdownAmount, setDrawdownAmount] = useState<number>(1000000);
  const [isDrawingDown, setIsDrawingDown] = useState<boolean>(false);
  const [drawdownSuccess, setDrawdownSuccess] = useState<string | null>(null);

  const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0];
  const maxAvailable = selectedFacility.totalLimitUsd - selectedFacility.drawnAmountUsd;

  const handleExecuteDrawdown = () => {
    if (drawdownAmount <= 0 || drawdownAmount > maxAvailable) return;

    setIsDrawingDown(true);
    setDrawdownSuccess(null);

    setTimeout(() => {
      setFacilities(prev => prev.map(f => {
        if (f.id === selectedFacilityId) {
          return {
            ...f,
            drawnAmountUsd: f.drawnAmountUsd + drawdownAmount
          };
        }
        return f;
      }));

      setIsDrawingDown(false);
      setDrawdownSuccess(`Successfully drawn down $${drawdownAmount.toLocaleString()} USD from ${selectedFacility.facilityName}. Funds routed to Primary Clearing Vault.`);
    }, 1100);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Banner */}
      <div className="bg-[#132338] text-white rounded-2xl p-5 sm:p-6 border border-[#1f3654] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black">
              <DollarSign className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Layer 14: Global Capital &amp; Risk Network
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 font-bold uppercase">
              $100M Underwritten Guarantee Pool
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Eliminates enterprise algorithmic adoption risk. Provides a $100M underwritten risk guarantee pool syndicated with Munich Re &amp; Aon, automated commercial paper issuance, dynamic receivables factoring, and institutional liquidity syndication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-right">
            <div className="text-[10px] text-slate-400">RISK SYNDICATION</div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AA+ Sovereign Underwritten</span>
            </div>
          </div>
        </div>
      </div>

      {/* $100M Execution Guarantee Pool Metrics */}
      <div className="bg-gradient-to-r from-slate-900 to-[#132338] text-white rounded-2xl p-5 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
              EXECUTION RISK SHIELD
            </span>
            <h2 className="text-lg font-bold font-mono text-white">
              $100,000,000 Sovereign Risk Guarantee Pool
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-mono text-emerald-300 font-bold">
            99.98% Coverage Ratio Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block mb-0.5">TOTAL INSURED POOL</span>
            <span className="text-base font-bold text-white">${(metrics.totalInsuredPoolUsd / 1000000).toFixed(0)}M USD</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block mb-0.5">AVAILABLE LIQUIDITY</span>
            <span className="text-base font-bold text-emerald-400">${(metrics.availableLiquidityUsd / 1000000).toFixed(2)}M USD</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block mb-0.5">HISTORICAL CLAIMS</span>
            <span className="text-base font-bold text-white">$0.00 (Zero Loss)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block mb-0.5">UNDERWRITING SYNDICATE</span>
            <span className="text-xs font-bold text-amber-300 block truncate">Munich Re &bull; Aon &bull; Lloyds</span>
          </div>
        </div>
      </div>

      {/* Credit Facilities & Drawdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Credit Facilities List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 font-bold px-1">
            <span>INSTITUTIONAL LIQUIDITY FACILITIES</span>
            <span>{facilities.length} FACILITIES</span>
          </div>

          <div className="space-y-2.5">
            {facilities.map(facility => {
              const isSelected = facility.id === selectedFacilityId;
              const remaining = facility.totalLimitUsd - facility.drawnAmountUsd;
              return (
                <div
                  key={facility.id}
                  onClick={() => setSelectedFacilityId(facility.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-xs ring-1 ring-amber-500/20'
                      : 'bg-white/80 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900">{facility.facilityName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      {facility.covenantStatus}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-mono mb-2">{facility.lenderSyndicate}</p>

                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Drawn: ${(facility.drawnAmountUsd / 1000000).toFixed(1)}M</span>
                      <span className="font-bold text-slate-900">Total: ${(facility.totalLimitUsd / 1000000).toFixed(0)}M</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(facility.drawnAmountUsd / facility.totalLimitUsd) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 mt-2 border-t border-slate-100">
                    <span className="text-amber-700 font-bold">{facility.interestRateSpread}</span>
                    <span className="text-emerald-700 font-bold">${(remaining / 1000000).toFixed(1)}M Available</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Facility Drawdown & Covenant Console */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-amber-600">{(selectedFacility?.facilityType || '').replace(/_/g, ' ')}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  COVENANT COMPLIANT
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">{selectedFacility.facilityName}</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedFacility.lenderSyndicate}</p>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400">AVAILABLE TO DRAW</div>
              <div className="text-xl font-bold font-mono text-emerald-700">
                ${(maxAvailable / 1000000).toFixed(2)}M USD
              </div>
            </div>
          </div>

          {/* Automated Debt Covenant Health */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Automated Debt Covenant Monitoring
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-400">DEBT SERVICE COVERAGE (DSCR)</span>
                  <span className="text-emerald-700 font-bold">{selectedFacility.dscrActual}x</span>
                </div>
                <div className="text-[10px] text-slate-500">Covenant Requirement: &gt; {selectedFacility.dscrMinimum}x (Safe)</div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-400">QUICK RATIO (LIQUIDITY)</span>
                  <span className="text-emerald-700 font-bold">{selectedFacility.quickRatioActual}x</span>
                </div>
                <div className="text-[10px] text-slate-500">Covenant Requirement: &gt; {selectedFacility.quickRatioMinimum}x (Safe)</div>
              </div>
            </div>
          </div>

          {/* Interactive Drawdown Simulator */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase text-amber-950 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                Execute Direct Capital Drawdown
              </h3>
              <span className="text-xs font-mono font-bold text-amber-900">
                Rate: {selectedFacility.effectiveRatePct}% APR
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-amber-900 block font-bold">
                Drawdown Amount (USD):
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-amber-600 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="100000"
                  max={maxAvailable}
                  step="100000"
                  value={drawdownAmount}
                  onChange={(e) => setDrawdownAmount(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-amber-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-amber-800">
                <span>Estimated Monthly Interest: ${Math.round((drawdownAmount * selectedFacility.effectiveRatePct) / 1200).toLocaleString()} USD</span>
                <span>Max Available: ${(maxAvailable / 1000000).toFixed(1)}M USD</span>
              </div>
            </div>

            <button
              onClick={handleExecuteDrawdown}
              disabled={isDrawingDown || drawdownAmount <= 0 || drawdownAmount > maxAvailable}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-mono font-bold transition shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isDrawingDown ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Submitting Syndicated Credit Issuance...</span>
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4" />
                  <span>Execute Liquidity Drawdown &amp; Settle via FedNow</span>
                </>
              )}
            </button>

            {drawdownSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{drawdownSuccess}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
