import React, { useState } from 'react';
import { 
  Rocket, 
  Orbit, 
  Clock, 
  ShieldCheck, 
  Globe2, 
  Layers, 
  Radio, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { CelestialClearingNode, InterplanetaryCommodityEscrow } from '../../types/econos';

export const RelativisticLightConeWorkspace: React.FC = () => {
  const [nodes, setNodes] = useState<CelestialClearingNode[]>([
    {
      id: 'NODE_EARTH_LEO',
      name: 'Earth Primary Orbital Hub',
      celestialBody: 'EARTH_LEO',
      orbitalDistanceKm: 420,
      oneWayLightLagSeconds: 0.0014,
      localRelativisticTimestamp: new Date().toISOString(),
      dagBlockHeight: 14892011,
      activeLiquidityBufferUsd: 14200000000,
      status: 'SYNCHRONIZED'
    },
    {
      id: 'NODE_MOON_SHACKLETON',
      name: 'Moon Shackleton South Pole Foundry',
      celestialBody: 'MOON_SOUTH_POLE',
      orbitalDistanceKm: 384400,
      oneWayLightLagSeconds: 1.282,
      localRelativisticTimestamp: new Date(Date.now() - 1282).toISOString(),
      dagBlockHeight: 14891894,
      activeLiquidityBufferUsd: 4800000000,
      status: 'SYNCHRONIZED'
    },
    {
      id: 'NODE_LAGRANGE_L2',
      name: 'Sun-Earth L2 Deep-Space Deep-Book',
      celestialBody: 'LAGRANGE_L2',
      orbitalDistanceKm: 1500000,
      oneWayLightLagSeconds: 5.003,
      localRelativisticTimestamp: new Date(Date.now() - 5003).toISOString(),
      dagBlockHeight: 14891420,
      activeLiquidityBufferUsd: 2100000000,
      status: 'LIGHT_CONE_DELAY'
    },
    {
      id: 'NODE_MARS_JEZERO',
      name: 'Mars Jezero Crater Colony Gateway',
      celestialBody: 'MARS_JEZERO',
      orbitalDistanceKm: 78340000,
      oneWayLightLagSeconds: 261.3, // ~4.35 minutes
      localRelativisticTimestamp: new Date(Date.now() - 261300).toISOString(),
      dagBlockHeight: 14884219,
      activeLiquidityBufferUsd: 1850000000,
      status: 'LIGHT_CONE_DELAY'
    },
    {
      id: 'NODE_CERES_BELT',
      name: 'Asteroid Belt Ceres Hydro-Refinery',
      celestialBody: 'CERES_BELT',
      orbitalDistanceKm: 413700000,
      oneWayLightLagSeconds: 1379.9, // ~23 minutes
      localRelativisticTimestamp: new Date(Date.now() - 1379900).toISOString(),
      dagBlockHeight: 14867112,
      activeLiquidityBufferUsd: 620000000,
      status: 'LIGHT_CONE_DELAY'
    }
  ]);

  const [escrows, setEscrows] = useState<InterplanetaryCommodityEscrow[]>([
    {
      id: 'ESCROW_HE3_001',
      contractTitle: 'Helium-3 Superconducting Fusion Cargo (12 MT)',
      commodityType: 'HELIUM_3_ISOTOPE',
      originNode: 'Moon Shackleton South Pole Foundry',
      destinationNode: 'Earth Primary Orbital Hub',
      notionalValueUsd: 4250000000,
      causalDagProofHash: '0x9fa1c782b3d8100234e402891bbd7a04918e7c514',
      lightDelayCompensationBps: 4.8,
      settlementStatus: 'LOCKED_IN_TRANSIT',
      deliveryArrivalDate: '2026-11-04T12:00:00Z'
    },
    {
      id: 'ESCROW_H2O_002',
      contractTitle: 'Liquid Hydrogen & Water Propellant Depot Fuel (400k L)',
      commodityType: 'HYDROGEN_WATER_PROPELLANT',
      originNode: 'Asteroid Belt Ceres Hydro-Refinery',
      destinationNode: 'Mars Jezero Crater Colony Gateway',
      notionalValueUsd: 890000000,
      causalDagProofHash: '0x3cb01e479901ef4172a884391bc448109d173c091',
      lightDelayCompensationBps: 18.2,
      settlementStatus: 'CAUSAL_VERIFIED',
      deliveryArrivalDate: '2026-12-19T18:30:00Z'
    },
    {
      id: 'ESCROW_REGOLITH_003',
      contractTitle: 'Heavy Rare-Earth Regolith Neodymium Ingot Batch',
      commodityType: 'REGOLITH_RARE_EARTH',
      originNode: 'Moon Shackleton South Pole Foundry',
      destinationNode: 'Earth Primary Orbital Hub',
      notionalValueUsd: 1420000000,
      causalDagProofHash: '0x81df904321aaefc991823901bca00192e47812903',
      lightDelayCompensationBps: 5.1,
      settlementStatus: 'SETTLED_ON_ARRIVAL',
      deliveryArrivalDate: '2026-09-15T09:12:00Z'
    }
  ]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const handleBroadcastRelativisticTx = () => {
    setIsSimulating(true);
    setSimulationLog('Broadcasting Minkowski Causal DAG transaction across Deep-Space Laser Mesh...');
    
    setTimeout(() => {
      setSimulationLog('Light-lag packet received at Lunar Node (+1.28s). Local predictive escrow reserved.');
    }, 1200);

    setTimeout(() => {
      setSimulationLog('Transmitting to Mars Jezero relay via L2 optical cross-link. Relativistic timestamp anchored.');
      
      const newEscrow: InterplanetaryCommodityEscrow = {
        id: `ESCROW_SOLAR_${Date.now().toString().slice(-4)}`,
        contractTitle: 'Deep-Space Solar Satellite Microwave Energy Forward (250 MW)',
        commodityType: 'SOLAR_SATELLITE_POWER',
        originNode: 'Sun-Earth L2 Deep-Space Deep-Book',
        destinationNode: 'Moon Shackleton South Pole Foundry',
        notionalValueUsd: 650000000,
        causalDagProofHash: '0x7e819b33a01948df99182a0149bb88172901cfa99',
        lightDelayCompensationBps: 6.2,
        settlementStatus: 'CAUSAL_VERIFIED',
        deliveryArrivalDate: '2026-10-18T00:00:00Z'
      };

      setEscrows(prev => [newEscrow, ...prev]);
      setIsSimulating(false);
      setSimulationLog('Relativistic Light-Cone Settlement Verified: Causal DAG confirmed across 3 celestial bodies.');
    }, 2800);
  };

  const totalInterplanetaryLiquidity = nodes.reduce((sum, n) => sum + n.activeLiquidityBufferUsd, 0);
  const totalEscrowVolume = escrows.reduce((sum, e) => sum + e.notionalValueUsd, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 rounded-2xl p-6 text-white border border-indigo-900/60 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Tier 5 • Layer 27
              </span>
              <span className="text-xs font-mono text-slate-400">Interplanetary Clearing Rails</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Relativistic Light-Cone Clearing & Interplanetary Rails
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Causal Minkowski Spacetime DAG consensus reconciling 3-second to 23-minute speed-of-light delays across Earth, Moon, Mars, and Deep-Space mining concessions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBroadcastRelativisticTx}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Radio className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Propagating Light-Cone...' : 'Simulate Interplanetary Settlement'}</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Alert */}
        {simulationLog && (
          <div className="mt-4 p-3 rounded-xl bg-indigo-900/40 border border-indigo-700/60 text-xs font-mono text-indigo-200 flex items-center gap-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{simulationLog}</span>
          </div>
        )}

        {/* Key Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-indigo-900/40 font-mono text-xs">
          <div>
            <div className="text-slate-400">Deep-Space Nodes</div>
            <div className="text-lg font-bold text-white mt-0.5">{nodes.length} Celestial Hubs</div>
          </div>
          <div>
            <div className="text-slate-400">Interplanetary Liquidity</div>
            <div className="text-lg font-bold text-indigo-300 mt-0.5">${(totalInterplanetaryLiquidity / 1e9).toFixed(2)}B USD</div>
          </div>
          <div>
            <div className="text-slate-400">Escrow Volume in Transit</div>
            <div className="text-lg font-bold text-purple-300 mt-0.5">${(totalEscrowVolume / 1e9).toFixed(2)}B USD</div>
          </div>
          <div>
            <div className="text-slate-400">Spacetime Consensus</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">Minkowski Causal DAG</div>
          </div>
        </div>
      </div>

      {/* Celestial Node Matrix */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Orbit className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 font-mono">Celestial Clearing Node Array</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Autonomous Light-Delay Compensation Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map(node => (
            <div 
              key={node.id} 
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-700">{node.celestialBody}</div>
                  <div className="font-bold text-slate-900 text-sm">{node.name}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  node.status === 'SYNCHRONIZED' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {node.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                <div>
                  <div className="text-slate-400 text-[10px]">Orbital Distance</div>
                  <div className="font-bold text-slate-700">{node.orbitalDistanceKm.toLocaleString()} km</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">1-Way Light Delay</div>
                  <div className="font-bold text-purple-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{node.oneWayLightLagSeconds >= 60 ? `${(node.oneWayLightLagSeconds / 60).toFixed(1)} min` : `${node.oneWayLightLagSeconds.toFixed(2)}s`}</span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">DAG Block Height</div>
                  <div className="font-bold text-slate-700">#{node.dagBlockHeight.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Liquidity Buffer</div>
                  <div className="font-bold text-emerald-700">${(node.activeLiquidityBufferUsd / 1e9).toFixed(2)}B</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Off-Planet Commodity Escrows */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-bold text-slate-900 font-mono">Off-Planet Commodity Forward Escrows</h2>
          </div>
          <span className="text-xs font-mono text-purple-700 font-bold">Basis Points Capture: 3.5 - 6.0 bps</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 pb-2">
                <th className="py-2.5 font-bold">Contract / Commodity</th>
                <th className="py-2.5 font-bold">Route (Origin → Destination)</th>
                <th className="py-2.5 font-bold">Notional Value</th>
                <th className="py-2.5 font-bold">Delay Comp (bps)</th>
                <th className="py-2.5 font-bold">Status</th>
                <th className="py-2.5 font-bold">Causal Proof Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {escrows.map(escrow => (
                <tr key={escrow.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-medium text-slate-900">
                    <div className="font-bold">{escrow.contractTitle}</div>
                    <div className="text-[10px] text-indigo-600 font-bold mt-0.5">{escrow.commodityType}</div>
                  </td>
                  <td className="py-3 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span>{escrow.originNode.split(' ')[0]}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span>{escrow.destinationNode.split(' ')[0]}</span>
                    </div>
                  </td>
                  <td className="py-3 font-bold text-slate-900">
                    ${(escrow.notionalValueUsd / 1e6).toFixed(0)}M USD
                  </td>
                  <td className="py-3 font-bold text-indigo-600">
                    +{escrow.lightDelayCompensationBps} bps
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      escrow.settlementStatus === 'SETTLED_ON_ARRIVAL'
                        ? 'bg-emerald-100 text-emerald-800'
                        : escrow.settlementStatus === 'CAUSAL_VERIFIED'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {escrow.settlementStatus}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 truncate max-w-[140px]" title={escrow.causalDagProofHash}>
                    {escrow.causalDagProofHash.slice(0, 10)}...{escrow.causalDagProofHash.slice(-6)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
