import React, { useState } from 'react';
import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  Waves, 
  ShieldAlert, 
  Activity, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Droplets,
  DollarSign
} from 'lucide-react';
import { AtmosphericTelemetryStream, CatastropheLiquiditySwap } from '../../types/econos';

export const GeoengineeringDerivativeWorkspace: React.FC = () => {
  const [telemetry, setTelemetry] = useState<AtmosphericTelemetryStream[]>([
    {
      id: 'STREAM_AMOC_001',
      sensorNetwork: 'Argo Deep-Ocean Hydro-Mesh',
      region: 'North Atlantic Deep Water Corridor',
      metricType: 'GULF_STREAM_AMOC_SV',
      currentReading: 13.8, // Sverdrups (nominal is ~17 Sv)
      baseline1990Reference: 17.2,
      volatilityZScore: 2.14,
      derivativeTriggerThreshold: 12.5,
      status: 'ELEVATED_STRESS'
    },
    {
      id: 'STREAM_CO2_002',
      sensorNetwork: 'Copernicus Sentinel-5P Atmospheric LiDAR',
      region: 'Planetary Tropospheric Column',
      metricType: 'TROPOSPHERIC_CO2_PPM',
      currentReading: 427.4,
      baseline1990Reference: 354.2,
      volatilityZScore: 1.82,
      derivativeTriggerThreshold: 435.0,
      status: 'NOMINAL'
    },
    {
      id: 'STREAM_AEROSOL_003',
      sensorNetwork: 'Stratospheric Solar Radiation Monitoring Array',
      region: 'Equatorial Stratosphere (22km altitude)',
      metricType: 'STRATOSPHERIC_AEROSOL_OPTICAL_DEPTH',
      currentReading: 0.082,
      baseline1990Reference: 0.015,
      volatilityZScore: 0.94,
      derivativeTriggerThreshold: 0.150,
      status: 'NOMINAL'
    },
    {
      id: 'STREAM_ANTARCTIC_004',
      sensorNetwork: 'GRACE-FO Gravimetric Cryo-Satellites',
      region: 'West Antarctic Thwaites Glacier Margin',
      metricType: 'ANTARCTIC_MASS_LOSS_GT',
      currentReading: -148.2, // Gigatons / yr
      baseline1990Reference: -38.0,
      volatilityZScore: 2.45,
      derivativeTriggerThreshold: -180.0,
      status: 'ELEVATED_STRESS'
    }
  ]);

  const [swaps, setSwaps] = useState<CatastropheLiquiditySwap[]>([
    {
      id: 'SWAP_DROUGHT_001',
      hazardClass: 'PAN_CONTINENTAL_DROUGHT',
      coveredRegion: 'North American Agricultural Breadbasket & Ogallala Aquifer',
      standbyLiquidityPoolUsd: 12500000000,
      triggerParametricIndex: 'Soil Moisture Deficit Index > 3.2-sigma for 30 consecutive days',
      payoutSponsor: 'GLOBAL_REINSURANCE_SYN',
      drawdownExecutionSpeedMs: 420,
      isAutoDispatched: false,
      activeHedgingNotionalUsd: 8400000000
    },
    {
      id: 'SWAP_HURRICANE_002',
      hazardClass: 'CATEGORY_6_MEGA_HURRICANE',
      coveredRegion: 'Gulf Coast Energy & LNG Export Refining Complex',
      standbyLiquidityPoolUsd: 8000000000,
      triggerParametricIndex: 'Sustained Central Pressure < 890 hPa & Wind > 185 mph inside 200nm box',
      payoutSponsor: 'SUBNATIONAL_CONSORTIUM',
      drawdownExecutionSpeedMs: 380,
      isAutoDispatched: false,
      activeHedgingNotionalUsd: 5200000000
    },
    {
      id: 'SWAP_AMOC_003',
      hazardClass: 'AMOC_SLOWDOWN',
      coveredRegion: 'Western European Agronomic & Thermal Maritime Zone',
      standbyLiquidityPoolUsd: 15000000000,
      triggerParametricIndex: 'AMOC Circulation Flow < 12.5 Sv for 90 days',
      payoutSponsor: 'SOVEREIGN_EMERGENCY_FUND',
      drawdownExecutionSpeedMs: 600,
      isAutoDispatched: false,
      activeHedgingNotionalUsd: 11500000000
    }
  ]);

  const [isSimulatingEvent, setIsSimulatingEvent] = useState(false);
  const [eventAlert, setEventAlert] = useState<string | null>(null);

  const handleSimulateClimateShock = () => {
    setIsSimulatingEvent(true);
    setEventAlert('Simulating Sudden North Atlantic Salinity Plume & AMOC Flow Deviation...');

    setTimeout(() => {
      setTelemetry(prev => prev.map(item => {
        if (item.id === 'STREAM_AMOC_001') {
          return {
            ...item,
            currentReading: 12.1,
            volatilityZScore: 3.42,
            status: 'PARAMETRIC_BREACH'
          };
        }
        return item;
      }));

      setSwaps(prev => prev.map(s => {
        if (s.id === 'SWAP_AMOC_003') {
          return {
            ...s,
            isAutoDispatched: true
          };
        }
        return s;
      }));

      setIsSimulatingEvent(false);
      setEventAlert('PARAMETRIC BREACH CONFIRMED: $15,000,000,000 Liquidity automatically released to European Maritime Desalination & Energy Stabilizer in 600ms without claim adjusters.');
    }, 2200);
  };

  const totalStandbyLiquidity = swaps.reduce((sum, s) => sum + s.standbyLiquidityPoolUsd, 0);
  const totalHedgedNotional = swaps.reduce((sum, s) => sum + s.activeHedgingNotionalUsd, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 rounded-2xl p-6 text-white border border-teal-900/60 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Tier 5 • Layer 28
              </span>
              <span className="text-xs font-mono text-slate-400">Planetary Climate Macro-Derivatives</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Global Thermosphere & Geoengineering Derivative Engine
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Cryptographic catastrophe liquidity pools and real-time planetary sensor feeds executing sub-second emergency funding during climate and atmospheric anomalies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateClimateShock}
              disabled={isSimulatingEvent}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Flame className={`w-4 h-4 ${isSimulatingEvent ? 'animate-bounce' : ''}`} />
              <span>{isSimulatingEvent ? 'Measuring Sensor Mesh...' : 'Inject Parametric Climate Shock'}</span>
            </button>
          </div>
        </div>

        {/* Live Event Notification */}
        {eventAlert && (
          <div className="mt-4 p-3 rounded-xl bg-teal-900/40 border border-teal-700/60 text-xs font-mono text-teal-200 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{eventAlert}</span>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-teal-900/40 font-mono text-xs">
          <div>
            <div className="text-slate-400">Atmospheric Sensor Mesh</div>
            <div className="text-lg font-bold text-white mt-0.5">14,200 Satellite/Buoy Feeds</div>
          </div>
          <div>
            <div className="text-slate-400">Standby Emergency Liquidity</div>
            <div className="text-lg font-bold text-cyan-300 mt-0.5">${(totalStandbyLiquidity / 1e9).toFixed(1)}B USD</div>
          </div>
          <div>
            <div className="text-slate-400">Active Hedging Notional</div>
            <div className="text-lg font-bold text-teal-300 mt-0.5">${(totalHedgedNotional / 1e9).toFixed(1)}B USD</div>
          </div>
          <div>
            <div className="text-slate-400">Drawdown Execution</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">Sub-Second (380-600ms)</div>
          </div>
        </div>
      </div>

      {/* Real-time Atmospheric Telemetry */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900 font-mono">Real-Time Planetary Telemetry Stream</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Live Satellite & Gravimetric Feeds</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {telemetry.map(item => (
            <div 
              key={item.id} 
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-teal-300 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-teal-700">{item.metricType}</div>
                  <div className="font-bold text-slate-900 text-sm">{item.region}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{item.sensorNetwork}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  item.status === 'NOMINAL'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.status === 'ELEVATED_STRESS'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800 animate-pulse'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                <div>
                  <div className="text-slate-400 text-[10px]">Current Reading</div>
                  <div className="font-bold text-slate-900">{item.currentReading}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Volatility (Z-Score)</div>
                  <div className={`font-bold ${item.volatilityZScore > 2.0 ? 'text-red-600' : 'text-slate-700'}`}>
                    {item.volatilityZScore}σ
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Trigger Barrier</div>
                  <div className="font-bold text-teal-700">{item.derivativeTriggerThreshold}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catastrophe Liquidity Swaps */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-600" />
            <h2 className="text-base font-bold text-slate-900 font-mono">Algorithmic Catastrophe Liquidity Pools</h2>
          </div>
          <span className="text-xs font-mono text-cyan-700 font-bold">Zero-Adjuster Instant Payout</span>
        </div>

        <div className="space-y-3">
          {swaps.map(swap => (
            <div 
              key={swap.id} 
              className={`p-4 rounded-xl border transition ${
                swap.isAutoDispatched 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-md' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{swap.hazardClass}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                      {swap.payoutSponsor}
                    </span>
                    {swap.isAutoDispatched && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-600 text-white font-bold animate-pulse">
                        LIQUIDITY DISPATCHED
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 font-mono">{swap.coveredRegion}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    <span className="font-semibold text-slate-700">Trigger Formula:</span> {swap.triggerParametricIndex}
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-slate-100 sm:pl-4">
                  <div className="text-[10px] font-mono text-slate-400">Standby Pool</div>
                  <div className="text-base font-bold font-mono text-slate-900">
                    ${(swap.standbyLiquidityPoolUsd / 1e9).toFixed(1)}B USD
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 font-semibold">
                    Speed: {swap.drawdownExecutionSpeedMs}ms
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
