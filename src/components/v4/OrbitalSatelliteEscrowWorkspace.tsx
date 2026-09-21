import React, { useState } from 'react';
import { 
  Globe2, 
  Radio, 
  Anchor, 
  ShieldCheck, 
  MapPin, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle2, 
  Satellite, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';
import { SATELLITE_CARGO_VOYAGES } from '../../data/planetaryLayersData';
import { SatelliteCargoVoyage } from '../../types/econos';

export const OrbitalSatelliteEscrowWorkspace: React.FC = () => {
  const [voyages, setVoyages] = useState<SatelliteCargoVoyage[]>(SATELLITE_CARGO_VOYAGES);
  const [selectedVoyage, setSelectedVoyage] = useState<SatelliteCargoVoyage>(SATELLITE_CARGO_VOYAGES[1]);
  const [isSimulatingGeofence, setIsSimulatingGeofence] = useState(false);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  const totalLockedEscrowUsd = voyages
    .filter(v => v.escrowStatus === 'LOCKED_IN_ORBITAL_ESCROW')
    .reduce((sum, v) => sum + v.cargoValuationUsd, 0);

  const totalReleasedEscrowUsd = voyages
    .filter(v => v.escrowStatus === 'RELEASED_AUTOMATICALLY')
    .reduce((sum, v) => sum + v.cargoValuationUsd, 0);

  const handleSimulateGeofenceArrival = () => {
    setIsSimulatingGeofence(true);
    setSimulationNotice(null);

    setTimeout(() => {
      setVoyages(prev => prev.map(v => {
        if (v.id === selectedVoyage.id) {
          const updated: SatelliteCargoVoyage = {
            ...v,
            distanceToDestinationKm: 8.2, // Now inside the 40km geofence!
            escrowStatus: 'RELEASED_AUTOMATICALLY'
          };
          setSelectedVoyage(updated);
          return updated;
        }
        return v;
      }));
      setIsSimulatingGeofence(false);
      setSimulationNotice(`Starlink AIS Orbital Ping verified: Vessel arrived at ${selectedVoyage.destinationPort} within ${selectedVoyage.destinationGeofenceRadiusKm}km geofence. Smart contract automatically released $${(selectedVoyage.cargoValuationUsd / 1000000).toFixed(1)}M USD to seller.`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Satellite className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Planetary Layer 23 • Physical Twin & Satellite IoT Escrow
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Planetary Physical Twin & Orbital Smart-Lock Escrow
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              Cross-border maritime bills of lading, silicon cargo shipments, and LNG carriers are tied directly to Starlink satellite telemetry and tamper seals. Smart contracts release tens of millions in escrow instantaneously the millisecond the physical vessel enters its target geofence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-mono font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse text-sky-600" />
              <span>STARLINK AIS CONSTELLATION ACTIVE</span>
            </span>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Locked in Orbital Escrow</span>
            <span className="text-base font-bold text-amber-700">
              ${(totalLockedEscrowUsd / 1000000).toFixed(1)}M USD
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Autonomous Auto-Released</span>
            <span className="text-base font-bold text-emerald-700">
              ${(totalReleasedEscrowUsd / 1000000).toFixed(1)}M USD
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Active Monitored Vessels</span>
            <span className="text-base font-bold text-slate-900">3 Maritime Freighters</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Tamper Seal Integrity</span>
            <span className="text-base font-bold text-sky-700">100% Cryptographic</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Vessel Monitor List + Orbital Geofence Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Vessels List (Col-7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-sky-600" />
              <h2 className="font-bold text-slate-900 text-sm">Real-Time Maritime Physical Twin Telemetry</h2>
            </div>
            <span className="text-[10px] text-slate-400">Starlink Telemetry Ping: 420ms</span>
          </div>

          <div className="mt-4 space-y-3">
            {voyages.map(v => {
              const isSelected = selectedVoyage.id === v.id;
              const isReleased = v.escrowStatus === 'RELEASED_AUTOMATICALLY';
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoyage(v)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    isSelected 
                      ? 'border-sky-500 bg-sky-50/40 ring-1 ring-sky-500' 
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{v.vesselName}</span>
                      <span className="text-[10px] text-slate-500 ml-2">({v.imoNumber} • {v.flagState})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isReleased 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {(v.escrowStatus || '').replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1 font-sans">
                    Cargo: {v.cargoManifestDescription}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-200/80 text-[10px]">
                    <div>
                      <span className="text-slate-400 block">Valuation:</span>
                      <span className="font-bold text-slate-800">${(v.cargoValuationUsd / 1000000).toFixed(1)}M USD</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Distance to Port:</span>
                      <span className={`font-bold ${v.distanceToDestinationKm <= v.destinationGeofenceRadiusKm ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {v.distanceToDestinationKm.toFixed(1)} km
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Tamper Seal:</span>
                      <span className="font-bold text-sky-700">{(v.tamperSealStatus || '').replace(/_/g, ' ')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Selected Vessel Orbital Escrow Smart Contract (Col-5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <h2 className="font-bold text-slate-900 text-sm">Orbital Escrow Contract Execution</h2>
              </div>
              <span className="text-[10px] text-slate-500">Smart Contract Escrow</span>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[11px]">
              <div>
                <span className="text-slate-400 text-[10px] block">TARGET VESSEL:</span>
                <span className="font-bold text-slate-900">{selectedVoyage.vesselName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">ESCROW CONTRACT:</span>
                <span className="text-[10px] text-sky-700 break-all">{selectedVoyage.escrowSmartContractAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Voyage Corridor:</span>
                <span className="font-bold text-slate-800">{selectedVoyage.originPort} → {selectedVoyage.destinationPort}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Geofence Radius:</span>
                <span className="font-bold text-slate-800">{selectedVoyage.destinationGeofenceRadiusKm} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Position:</span>
                <span className="font-bold text-slate-800">
                  {selectedVoyage.currentLat.toFixed(2)}°N, {selectedVoyage.currentLng.toFixed(2)}°E
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Auto-Release Trigger:</span>
                <span className="font-bold text-emerald-700">{(selectedVoyage?.escrowCondition || '').replace(/_/g, ' ')}</span>
              </div>
            </div>

            {/* Status Box */}
            <div className={`mt-4 p-3.5 rounded-xl border ${
              selectedVoyage.escrowStatus === 'RELEASED_AUTOMATICALLY'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2">
                {selectedVoyage.escrowStatus === 'RELEASED_AUTOMATICALLY' ? (
                  <Unlock className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-600" />
                )}
                <span className="font-bold text-xs">
                  {selectedVoyage.escrowStatus === 'RELEASED_AUTOMATICALLY'
                    ? `Funds Released: $${(selectedVoyage.cargoValuationUsd / 1000000).toFixed(1)}M Cleared to Shipper`
                    : `Escrow Locked: $${(selectedVoyage.cargoValuationUsd / 1000000).toFixed(1)}M Held Pending Arrival`}
                </span>
              </div>
              <p className="text-[10px] mt-1 font-sans text-slate-600">
                {selectedVoyage.escrowStatus === 'RELEASED_AUTOMATICALLY'
                  ? 'Autonomous confirmation received from Starlink AIS. Funds transferred with zero human intermediaries.'
                  : `Vessel is ${selectedVoyage.distanceToDestinationKm.toFixed(1)}km from port. Escrow triggers when distance <= ${selectedVoyage.destinationGeofenceRadiusKm}km.`}
              </p>
            </div>

            {simulationNotice && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-sans flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{simulationNotice}</span>
              </div>
            )}
          </div>

          {selectedVoyage.escrowStatus === 'LOCKED_IN_ORBITAL_ESCROW' && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={handleSimulateGeofenceArrival}
                disabled={isSimulatingGeofence}
                className="w-full py-2.5 px-4 rounded-xl bg-[#132338] hover:bg-[#0c1827] text-white font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Satellite className={`w-4 h-4 ${isSimulatingGeofence ? 'animate-spin' : ''}`} />
                <span>{isSimulatingGeofence ? 'Acquiring Starlink Lock...' : 'Simulate Geofence Arrival & Trigger Escrow'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
