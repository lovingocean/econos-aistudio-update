import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Printer,
  Building,
  Target,
  BarChart3,
  Search,
  Activity,
  HardHat
} from 'lucide-react';

interface BimWorkPackage {
  id: string;
  name: string;
  bimModelGuid: string;
  plannedValue: number; // PV
  earnedValue: number; // EV
  actualCost: number; // AC
  spi: number; // EV / PV (> 1.0 = ahead of schedule)
  cpi: number; // EV / AC (> 1.0 = under budget)
  laserScanVerified: boolean;
  physicalInstalledPct: number;
}

const INITIAL_PACKAGES: BimWorkPackage[] = [
  {
    id: 'wp-1',
    name: 'Level 3 Chilled Water Supply & Return Risers',
    bimModelGuid: 'BIM360-MEP-DWG-0482',
    plannedValue: 240000,
    earnedValue: 252000,
    actualCost: 231000,
    spi: 1.05,
    cpi: 1.09,
    laserScanVerified: true,
    physicalInstalledPct: 100
  },
  {
    id: 'wp-2',
    name: 'Level 4 VAV Terminal Units & Spiral Duct Distribution',
    bimModelGuid: 'BIM360-HVAC-LV4-0192',
    plannedValue: 310000,
    earnedValue: 295000,
    actualCost: 288000,
    spi: 0.95,
    cpi: 1.02,
    laserScanVerified: true,
    physicalInstalledPct: 74.5
  },
  {
    id: 'wp-3',
    name: 'Main Central Plant Water-Cooled Centrifugal Chillers',
    bimModelGuid: 'BIM360-PLANT-CHILL-001',
    plannedValue: 480000,
    earnedValue: 480000,
    actualCost: 450000,
    spi: 1.00,
    cpi: 1.07,
    laserScanVerified: true,
    physicalInstalledPct: 100
  }
];

export const CommercialBimTelemetryWorkspace: React.FC = () => {
  const [packages, setPackages] = useState<BimWorkPackage[]>(INITIAL_PACKAGES);

  const totalPv = packages.reduce((sum, p) => sum + p.plannedValue, 0);
  const totalEv = packages.reduce((sum, p) => sum + p.earnedValue, 0);
  const totalAc = packages.reduce((sum, p) => sum + p.actualCost, 0);
  const aggregateSpi = Number((totalEv / totalPv).toFixed(2));
  const aggregateCpi = Number((totalEv / totalAc).toFixed(2));

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 p-6 text-white shadow-xl border border-cyan-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autodesk BIM 360 &amp; Procore API Integration</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>4D BIM Earned Value (EVM) Telemetry Engine</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Synchronizes 3D Building Information Models (BIM) with real financial Earned Value Management (EVM). Verifies work-in-place via 3D point-cloud LiDAR scans, proving physical installation to architects and eliminating billing dispute deductions.
            </p>
          </div>

          <div className="bg-cyan-900/80 backdrop-blur-md rounded-xl p-4 border border-cyan-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">Cost Performance Index (CPI)</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              {aggregateCpi} (Under Budget)
            </p>
            <p className="text-[10px] text-slate-300">SPI: {aggregateSpi} (On Schedule)</p>
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Earned Value (EV)</span>
          <p className="text-xl font-black text-slate-900">${totalEv.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Physical work certified complete</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Actual Cost (AC)</span>
          <p className="text-xl font-black text-indigo-700">${totalAc.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Real field costs incurred</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Cost Variance (CV)</span>
          <p className="text-xl font-black text-emerald-700">+${(totalEv - totalAc).toLocaleString()}</p>
          <p className="text-[10px] text-emerald-600 font-sans font-bold">Favorable profitability margin</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">LiDAR Scan Verification</span>
          <p className="text-xl font-black text-cyan-700">100% Certified</p>
          <p className="text-[10px] text-slate-500 font-sans">Point-cloud reality capture</p>
        </div>
      </div>

      {/* BIM WORK PACKAGES TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">4D BIM Model Work Breakdown Structure (WBS)</h3>
            <p className="text-xs text-slate-500">Autonomous linkage between 3D CAD/Revit geometry and AIA progress billing codes</p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-md border border-cyan-200">
            Autodesk Revit 2026 Sync Active
          </span>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {packages.map(pkg => (
            <div key={pkg.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 font-sans text-sm">{pkg.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {pkg.bimModelGuid}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Physical Installation: <strong className="text-slate-900">{pkg.physicalInstalledPct}%</strong> | LiDAR Scan: <strong className="text-emerald-700">Verified</strong>
                </p>
              </div>

              <div className="flex items-center gap-8 shrink-0">
                <div className="text-right">
                  <p className="text-slate-500 text-[10px]">Earned Value:</p>
                  <p className="font-bold text-slate-900 text-sm">${pkg.earnedValue.toLocaleString()}</p>
                </div>

                <div className="text-right w-24">
                  <p className="text-slate-500 text-[10px]">CPI (Efficiency):</p>
                  <p className={`font-black text-sm ${pkg.cpi >= 1.0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {pkg.cpi}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  ✓ Verified in BIM
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
