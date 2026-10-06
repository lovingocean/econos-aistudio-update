import React, { useState, useMemo } from 'react';
import {
  Landmark,
  Building,
  DollarSign,
  TrendingUp,
  ArrowRightLeft,
  CheckCircle2,
  Lock,
  Sparkles,
  Printer,
  ShieldCheck,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';

interface SubsidiaryEntity {
  id: string;
  name: string;
  entityType: 'OPERATING_CORP' | 'FLEET_EQUIPMENT_LLC' | 'REAL_ESTATE_HOLDINGS' | 'PROJECT_SPV_JV';
  bankBalance: number;
  targetWorkingBuffer: number;
  intercompanyPosition: number; // positive = owed from group, negative = owes group
  lastSweepTime: string;
}

const INITIAL_ENTITIES: SubsidiaryEntity[] = [
  {
    id: 'ent-1',
    name: 'Apex Mechanical Solutions Inc. (Parent Operating)',
    entityType: 'OPERATING_CORP',
    bankBalance: 1240000,
    targetWorkingBuffer: 250000,
    intercompanyPosition: 420000,
    lastSweepTime: 'Nightly 02:00 AM'
  },
  {
    id: 'ent-2',
    name: 'Apex Heavy Fleet & Crane Equipment LLC',
    entityType: 'FLEET_EQUIPMENT_LLC',
    bankBalance: 310000,
    targetWorkingBuffer: 75000,
    intercompanyPosition: -180000,
    lastSweepTime: 'Nightly 02:00 AM'
  },
  {
    id: 'ent-3',
    name: 'Apex Industrial Yard & Fabrication Facility LLC',
    entityType: 'REAL_ESTATE_HOLDINGS',
    bankBalance: 195000,
    targetWorkingBuffer: 50000,
    intercompanyPosition: -95000,
    lastSweepTime: 'Nightly 02:00 AM'
  },
  {
    id: 'ent-4',
    name: 'North Texas Hospital JV Special Purpose LLC',
    entityType: 'PROJECT_SPV_JV',
    bankBalance: 680000,
    targetWorkingBuffer: 150000,
    intercompanyPosition: -145000,
    lastSweepTime: 'Nightly 02:00 AM'
  }
];

export const CommercialIntercompanyTreasuryWorkspace: React.FC = () => {
  const [entities, setEntities] = useState<SubsidiaryEntity[]>(INITIAL_ENTITIES);
  const [treasuryVaultApy, setTreasuryVaultApy] = useState<number>(5.20); // 5.20% Treasury Yield
  const [sweepNotification, setSweepNotification] = useState<string | null>(null);

  const groupTotals = useMemo(() => {
    let consolidatedCash = 0;
    let totalBufferNeeded = 0;

    entities.forEach(e => {
      consolidatedCash += e.bankBalance;
      totalBufferNeeded += e.targetWorkingBuffer;
    });

    const sweepableSurplus = Math.max(0, consolidatedCash - totalBufferNeeded);
    const annualInterestYield = Math.round(sweepableSurplus * (treasuryVaultApy / 100));

    return {
      consolidatedCash,
      totalBufferNeeded,
      sweepableSurplus,
      annualInterestYield
    };
  }, [entities, treasuryVaultApy]);

  const handleExecuteManualSweep = () => {
    setSweepNotification(
      `Autonomous ZBA Cash Sweep Executed: $${groupTotals.sweepableSurplus.toLocaleString()} swept into 5.20% Yield Treasury Vault. Due-To/Due-From ledgers balanced under IRC § 7872.`
    );
    setTimeout(() => setSweepNotification(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Entity Corporate Liquidity &amp; Zero-Balance Accounting (ZBA)</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Multi-Entity Intercompany Cash Sweeping &amp; Treasury Pool</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Consolidates idle cash across parent operating entities, equipment LLCs, real estate yards, and project SPVs. Automatically sweeps surplus cash into a centralized 5.20% yield vault while tracking statutory arms-length intercompany promissory notes under IRC § 7872.
            </p>
          </div>

          <div className="bg-indigo-900/80 backdrop-blur-md rounded-xl p-4 border border-indigo-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">Annual Treasury Yield</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              +${groupTotals.annualInterestYield.toLocaleString()} / yr
            </p>
            <p className="text-[10px] text-slate-300">At {treasuryVaultApy}% Institutional APY</p>
          </div>
        </div>
      </div>

      {sweepNotification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{sweepNotification}</span>
        </div>
      )}

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Consolidated Group Cash</span>
          <p className="text-xl font-black text-slate-900">${groupTotals.consolidatedCash.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Across {entities.length} legal corporate entities</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Working Capital Reserves</span>
          <p className="text-xl font-black text-indigo-700">${groupTotals.totalBufferNeeded.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Protected operating payroll buffers</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Nightly Sweep Surplus</span>
          <p className="text-xl font-black text-emerald-700">${groupTotals.sweepableSurplus.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 font-sans">Available for master treasury yield</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Intercompany Balancing</span>
          <p className="text-xl font-black text-emerald-600">$0.00 Commingling</p>
          <p className="text-[10px] text-slate-500 font-sans">100% GAAP Due-To / Due-From compliant</p>
        </div>
      </div>

      {/* ENTITY LIST */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-indigo-600" />
              <span>Subsidiary Entity Balances &amp; Sweep Configurations</span>
            </h3>
            <p className="text-xs text-slate-500">Autonomous Zero-Balance Account (ZBA) sweeps with automated intercompany accounting</p>
          </div>

          <button
            type="button"
            onClick={handleExecuteManualSweep}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Execute Immediate Group Sweep</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {entities.map(ent => {
            const surplus = Math.max(0, ent.bankBalance - ent.targetWorkingBuffer);
            return (
              <div key={ent.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 font-sans text-sm">{ent.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                      {ent.entityType.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Target Working Buffer: ${ent.targetWorkingBuffer.toLocaleString()} | Frequency: {ent.lastSweepTime}
                  </p>
                </div>

                <div className="flex items-center gap-8 shrink-0">
                  <div className="text-right">
                    <p className="text-slate-500 text-[10px]">Bank Balance:</p>
                    <p className="font-bold text-slate-900 text-sm">${ent.bankBalance.toLocaleString()}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-500 text-[10px]">Sweepable Surplus:</p>
                    <p className="font-black text-emerald-700 text-sm">${surplus.toLocaleString()}</p>
                  </div>

                  <div className="text-right w-32">
                    <p className="text-slate-500 text-[10px]">Due-To / Due-From:</p>
                    <p className={`font-bold ${ent.intercompanyPosition >= 0 ? 'text-indigo-700' : 'text-slate-700'}`}>
                      {ent.intercompanyPosition >= 0 ? `+$${ent.intercompanyPosition.toLocaleString()}` : `-$${Math.abs(ent.intercompanyPosition).toLocaleString()}`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
