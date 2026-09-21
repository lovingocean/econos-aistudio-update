import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  Activity, 
  Flame, 
  Sun 
} from 'lucide-react';
import { 
  ENERGY_PPA_CONTRACTS, 
  TOKENIZED_COMPUTE_FORWARDS 
} from '../../data/planetaryLayersData';
import { EnergyPpaContract, TokenizedComputeForward } from '../../types/econos';

export const ComputeEnergyGridWorkspace: React.FC = () => {
  const [ppas, setPpas] = useState<EnergyPpaContract[]>(ENERGY_PPA_CONTRACTS);
  const [computeForwards, setComputeForwards] = useState<TokenizedComputeForward[]>(TOKENIZED_COMPUTE_FORWARDS);
  const [selectedForward, setSelectedForward] = useState<TokenizedComputeForward>(TOKENIZED_COMPUTE_FORWARDS[1]);
  const [isArbitraging, setIsArbitraging] = useState(false);
  const [arbitrageNotice, setArbitrageNotice] = useState<string | null>(null);

  const totalMegawatts = ppas.reduce((sum, p) => sum + p.capacityMegawatts, 0);
  const totalEnergySavingsUsd = ppas.reduce((sum, p) => sum + p.annualEnergyCostSavingsUsd, 0);
  const totalArbitrageYieldUsd = computeForwards.reduce((sum, f) => sum + f.arbitrageYieldUsd, 0);

  const handleExecuteComputeArbitrage = () => {
    setIsArbitraging(true);
    setArbitrageNotice(null);

    setTimeout(() => {
      setComputeForwards(prev => prev.map(f => {
        if (f.id === selectedForward.id) {
          const updated: TokenizedComputeForward = {
            ...f,
            hedgeMode: 'MARKET_YIELD_ARBITRAGE',
            arbitrageYieldUsd: f.arbitrageYieldUsd + 1250000
          };
          setSelectedForward(updated);
          return updated;
        }
        return f;
      }));
      setIsArbitraging(false);
      setArbitrageNotice(`Forward compute arbitrage executed: Sub-leased ${selectedForward.clusterDescriptor} spot capacity to autonomous AI labs at $${selectedForward.currentSpotMarketRentRateUsd}/hr. Captured +$1.25M net cash yield.`);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Planetary Layer 26 • Sovereign Energy & Compute Arbitrage Grid
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Compute FLOP & Megawatt Energy Commodity Arbitrage Grid
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              In the AI-native economy, electricity (MWh) and compute (FLOPs) are the supreme monetary reserve commodities. ECONOS locks gigawatt nuclear/geothermal PPAs and trades tokenized GPU supercomputing forwards, turning enterprise compute costs into an active treasury yield asset.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>550 MW BASELOAD LOCKED</span>
            </span>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Secured Clean Energy</span>
            <span className="text-base font-bold text-amber-700">{totalMegawatts} Megawatts</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">PPA Annual Energy Savings</span>
            <span className="text-base font-bold text-emerald-700">
              ${(totalEnergySavingsUsd / 1000000).toFixed(1)}M USD/yr
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Tokenized Compute Forwards</span>
            <span className="text-base font-bold text-sky-700">75.7 PetaFLOPS</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Arbitrage Cash Yield</span>
            <span className="text-base font-bold text-purple-700">
              +${(totalArbitrageYieldUsd / 1000000).toFixed(2)}M USD
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Clean Energy PPAs + Tokenized GPU Forwards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Energy PPAs (Col-7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <h2 className="font-bold text-slate-900 text-sm">Long-Term Nuclear & Renewable Baseload PPAs</h2>
            </div>
            <span className="text-[10px] text-slate-400">Zero Carbon Baseload</span>
          </div>

          <div className="mt-4 space-y-3">
            {ppas.map(p => (
              <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{p.facilityLocation}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                    {p.renewableSourceMix}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                  <div>
                    <span className="text-slate-400 block">Locked PPA Price:</span>
                    <span className="font-bold text-emerald-700">${p.baseloadPpaPriceMwhUsd.toFixed(2)} / MWh</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Current Spot Grid:</span>
                    <span className="font-bold text-slate-800">${p.currentSpotLocationalPriceUsd.toFixed(2)} / MWh</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Annual Savings:</span>
                    <span className="font-bold text-sky-700">+${(p.annualEnergyCostSavingsUsd / 1000000).toFixed(1)}M/yr</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Interconnect: <strong className="text-slate-700">{p.gridInterconnect}</strong></span>
                  <span className="text-emerald-700 font-bold">{p.capacityMegawatts} MW Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Tokenized Compute Forwards & FLOP Yield Trading (Col-5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-600" />
                <h2 className="font-bold text-slate-900 text-sm">Tokenized FLOP Forward Market</h2>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">FLOP Arbitrage</span>
            </div>

            <p className="text-slate-500 text-[11px] mt-2 font-sans">
              GPU capacity locked at bulk rates is sub-leased dynamically into the spot market when model training is idle, converting compute infrastructure into a high-yielding treasury asset.
            </p>

            <div className="mt-4 space-y-3">
              {computeForwards.map(f => {
                const isSelected = selectedForward.id === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedForward(f)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      isSelected 
                        ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500' 
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{f.acceleratorHardware}</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[9px] font-bold">
                        {f.deliveryQuarter}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 mt-1">
                      {f.clusterDescriptor}
                    </div>

                    <div className="flex justify-between text-[10px] pt-2 border-t border-slate-200/80 mt-2">
                      <span>Cost: <strong className="text-slate-700">${f.contractExecutionPricePerHourUsd}/hr</strong></span>
                      <span>Spot: <strong className="text-emerald-700">${f.currentSpotMarketRentRateUsd}/hr</strong></span>
                      <span>Spread: <strong className="text-purple-700">+${(f.currentSpotMarketRentRateUsd - f.contractExecutionPricePerHourUsd).toFixed(2)}/hr</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>

            {arbitrageNotice && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-sans flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{arbitrageNotice}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={handleExecuteComputeArbitrage}
              disabled={isArbitraging}
              className="w-full py-2.5 px-4 rounded-xl bg-[#132338] hover:bg-[#0c1827] text-white font-bold transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Cpu className={`w-4 h-4 ${isArbitraging ? 'animate-spin' : ''}`} />
              <span>{isArbitraging ? 'Arbitraging Compute Grid...' : `Sub-Lease ${selectedForward.acceleratorHardware} Spot Spread`}</span>
            </button>
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
              <span>Energy Arbitrage: <strong className="text-emerald-700">Optimal Locational Pricing</strong></span>
              <span className="text-slate-800 font-bold">Zero GPU Idling</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
