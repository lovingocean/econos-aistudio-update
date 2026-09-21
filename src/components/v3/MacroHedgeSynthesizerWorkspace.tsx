import React, { useState } from 'react';
import { 
  TrendingUp, 
  Compass, 
  Anchor, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  RefreshCw, 
  Activity, 
  DollarSign, 
  Percent, 
  Navigation,
  Globe2,
  Sliders
} from 'lucide-react';
import { 
  MACRO_HEDGING_POSITIONS, 
  GEOPOLITICAL_CHOKEPOINTS 
} from '../../data/sovereignDimensionsData';
import { MacroHedgingPosition, GeopoliticalChokepoint } from '../../types/econos';

export const MacroHedgeSynthesizerWorkspace: React.FC = () => {
  const [positions, setPositions] = useState<MacroHedgingPosition[]>(MACRO_HEDGING_POSITIONS);
  const [chokepoints, setChokepoints] = useState<GeopoliticalChokepoint[]>(GEOPOLITICAL_CHOKEPOINTS);
  const [selectedChoke, setSelectedChoke] = useState<GeopoliticalChokepoint>(GEOPOLITICAL_CHOKEPOINTS[1]); // Bab-el-Mandeb
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [rebalanceNotice, setRebalanceNotice] = useState<string | null>(null);

  const totalHedgedNotional = positions.reduce((sum, p) => sum + p.notionalUsd, 0);
  const totalMtmPnl = positions.reduce((sum, p) => sum + p.currentMtmPnlUsd, 0);
  const avgHedgeRatio = positions.reduce((sum, p) => sum + p.hedgeRatioPct, 0) / positions.length;

  const handleRebalanceAllDeltas = () => {
    setIsRebalancing(true);
    setRebalanceNotice(null);

    setTimeout(() => {
      setPositions(positions.map(p => ({
        ...p,
        hedgeRatioPct: 98.5,
        notionalUsd: Math.round(p.unhedgedExposureUsd * 0.985)
      })));
      setIsRebalancing(false);
      setRebalanceNotice('Autonomous delta-neutral micro-hedge rebalanced across all FX and commodity books to 98.5% target coverage.');
    }, 1000);
  };

  const handleTriggerReroute = (chokeId: string) => {
    setChokepoints(chokepoints.map(c => {
      if (c.id === chokeId) {
        return {
          ...c,
          status: 'REROUTED',
          recommendedAction: `Autonomous reroute confirmed via ${c.alternativeRouteName}. Freight forwards and insurance surcharges stabilized.`
        };
      }
      return c;
    }));
    alert(`Autonomous reroute executed for ${selectedChoke.name}. Vessel freight redirected to ${selectedChoke.alternativeRouteName}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Dimension 3 • Macro Hedging & Geopolitical Defense
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Autonomous Macro-Hedging & Geopolitical Shock Synthesizer
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              Continuously balances FX currency risks, commodity price exposure (freight fuel, silicon wafers), and monitors maritime chokepoints with automated maritime rerouting and forward spot locks before market repricing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRebalanceAllDeltas}
              disabled={isRebalancing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#132338] hover:bg-[#0c1827] text-white font-mono text-xs font-bold transition shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRebalancing ? 'animate-spin' : ''}`} />
              <span>Delta Rebalance All Books</span>
            </button>
          </div>
        </div>

        {/* Macro Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Active Hedged Notional</span>
            <span className="text-base font-bold text-slate-900">
              ${(totalHedgedNotional / 1000000).toFixed(1)}M USD
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Average Hedge Ratio</span>
            <span className="text-base font-bold text-emerald-700">{avgHedgeRatio.toFixed(1)}% Coverage</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Net Unrealized MTM Gain</span>
            <span className="text-base font-bold text-emerald-700">+${(totalMtmPnl / 1000).toFixed(0)}k</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Monitored Chokepoints</span>
            <span className="text-base font-bold text-purple-700">4 Global Arteries</span>
          </div>
        </div>
      </div>

      {rebalanceNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{rebalanceNotice}</span>
        </div>
      )}

      {/* Main Grid: Continuous Micro-Hedging Portfolio + Geopolitical Maritime Chokepoint Defense */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Continuous Dynamic Micro-Hedging Positions (Col-6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h2 className="font-bold text-slate-900 text-sm">Autonomous FX & Commodity Micro-Hedges</h2>
            </div>
            <span className="text-[10px] text-slate-400">ISDA & CME Standard</span>
          </div>

          <div className="mt-4 space-y-3">
            {positions.map(pos => (
              <div key={pos.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                      {pos.assetClass}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">{pos.pairOrInstrument}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700">
                    +${(pos.currentMtmPnlUsd / 1000).toFixed(0)}k MTM
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 font-sans">
                  <span>Hedged: <strong className="text-slate-900 font-mono">${(pos.notionalUsd / 1000000).toFixed(1)}M</strong> / ${(pos.unhedgedExposureUsd / 1000000).toFixed(1)}M</span>
                  <span>Ratio: <strong className="text-emerald-700 font-mono">{pos.hedgeRatioPct}%</strong></span>
                </div>

                {/* Progress bar for hedge coverage */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${Math.min(100, pos.hedgeRatioPct)}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Venue: {pos.executionVenue}</span>
                  <span>Auto-Delta: {pos.autoRebalanceDelta ? 'ENABLED' : 'MANUAL'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Geopolitical Maritime Chokepoints (Col-6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-sky-600" />
                <h2 className="font-bold text-slate-900 text-sm">Geopolitical Maritime Chokepoints</h2>
              </div>
              <span className="text-[10px] text-amber-700 font-bold">Real-Time Naval AIS Telemetry</span>
            </div>

            <div className="mt-4 space-y-2.5">
              {chokepoints.map(c => {
                const isSelected = selectedChoke.id === c.id;
                const isCritical = c.status === 'CRITICAL_BLOCKAGE';
                const isElevated = c.status === 'ELEVATED_RISK';

                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedChoke(c)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">{c.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          isCritical
                            ? 'bg-rose-600 text-white'
                            : isElevated
                            ? 'bg-amber-500 text-white'
                            : isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <div className={`text-[11px] mt-1 font-sans ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {c.region} • Delay: +{c.averageDelayDays} days
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold block">
                        Risk Score: {c.transitRiskScore}/100
                      </span>
                      <span className={`text-[10px] ${isSelected ? 'text-sky-300' : 'text-sky-700'}`}>
                        +{c.insurancePremiumSurchargePct}% War Premium
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Chokepoint Deep-Dive & Action Box */}
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Artery:</span>
                <span className="font-bold text-slate-900">{selectedChoke.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Autonomous Alternative Route:</span>
                <span className="font-bold text-sky-700">{selectedChoke.alternativeRouteName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reroute Cost Delta:</span>
                <span className="font-bold text-slate-800">+${(selectedChoke.rerouteCostDeltaUsd / 1000).toFixed(0)}k per voyage</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-slate-600 font-sans">
                <strong>Autonomous Action:</strong> {selectedChoke.recommendedAction}
              </div>

              {selectedChoke.status !== 'REROUTED' && (
                <button
                  onClick={() => handleTriggerReroute(selectedChoke.id)}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold transition flex items-center justify-center gap-1.5 text-xs shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Authorize Autonomous Maritime Reroute</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
