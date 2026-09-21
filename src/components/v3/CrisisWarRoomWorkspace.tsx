import React, { useState } from 'react';
import {
  AlertOctagon,
  ShieldAlert,
  Flame,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  RotateCcw,
  RefreshCw,
  Radio,
  WifiOff,
  Wifi,
  Building,
  DollarSign,
  TrendingDown,
  Play,
  Terminal,
  Clock
} from 'lucide-react';
import {
  MOCK_CRISIS_SCENARIOS,
  MOCK_CRISIS_PLAYBOOKS,
  CrisisScenario,
  CrisisPlaybook
} from '../../data/econosV3Data';

export const CrisisWarRoomWorkspace: React.FC = () => {
  const [scenarios, setScenarios] = useState<CrisisScenario[]>(MOCK_CRISIS_SCENARIOS);
  const [playbooks, setPlaybooks] = useState<CrisisPlaybook[]>(MOCK_CRISIS_PLAYBOOKS);
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string>('pb-01');
  
  // Air-Gap Fallback State
  const [isAirGapped, setIsAirGapped] = useState<boolean>(false);
  
  // Interactive Drill Execution State
  const [isDrillRunning, setIsDrillRunning] = useState<boolean>(false);
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);
  const [drillLog, setDrillLog] = useState<string[]>([]);

  const selectedPlaybook = playbooks.find(p => p.id === selectedPlaybookId) || playbooks[0];

  const handleRunPlaybookDrill = () => {
    setIsDrillRunning(true);
    setDrillCompleted(false);
    setDrillLog(['Initiating Emergency War-Room Protocol: ' + selectedPlaybook.title]);

    // Step-by-step execution simulation
    selectedPlaybook.actionChecklist.forEach((action, idx) => {
      setTimeout(() => {
        setDrillLog(prev => [
          ...prev,
          `[STEP ${action.step}/4] Executed by ${action.responsibleAgent}: ${action.action.substring(0, 60)}...`
        ]);

        if (idx === selectedPlaybook.actionChecklist.length - 1) {
          setTimeout(() => {
            setIsDrillRunning(false);
            setDrillCompleted(true);
            setDrillLog(prev => [
              ...prev,
              `✅ PROTOCOL COMPLETED: $${selectedPlaybook.expectedLiquidityPreservedUsd.toLocaleString()} USD capital preserved. Runway protected by +${selectedPlaybook.runwayExtensionMonths} months.`
            ]);
          }, 800);
        }
      }, (idx + 1) * 700);
    });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#180a0a] text-white rounded-2xl p-5 sm:p-6 border border-red-950/60 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-black">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-tight text-white">
              Layer 16: Crisis / War-Room Sovereign Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-[10px] font-mono text-red-300 font-bold uppercase animate-pulse">
              DEFCON 2 Vigilance
            </span>
          </div>
          <p className="text-xs text-red-200/80 font-mono leading-relaxed">
            Autonomous emergency capital defense. Rapidly responds to counterparty bank runs, supply-chain embargoes, and macro stagflation shocks via automated 1-click capital preservation playbooks and sovereign air-gap offline operational continuity.
          </p>
        </div>

        {/* Air-Gap Fallback Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAirGapped(!isAirGapped)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition flex items-center gap-2 ${
              isAirGapped
                ? 'bg-red-600 text-white border-red-500 shadow-sm'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            {isAirGapped ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4 text-slate-400" />}
            <span>{isAirGapped ? 'AIR-GAP MODE: ENGAGED' : 'AIR-GAP MODE: STANDBY'}</span>
          </button>
        </div>
      </div>

      {/* Air-gap Alert Banner if enabled */}
      {isAirGapped && (
        <div className="bg-red-950/40 border border-red-800 rounded-xl p-3.5 text-xs font-mono text-red-300 flex items-center gap-3">
          <Radio className="w-4 h-4 text-red-400 animate-ping shrink-0" />
          <span>
            <strong>AIR-GAP OPERATIONAL MODE ENGAGED:</strong> External internet dependencies severed. 100% of financial decision intelligence routed to deterministic local quantized inference nodes. All payroll and treasury clearing executed autonomously via sovereign private ledger.
          </span>
        </div>
      )}

      {/* Active Systemic Threat Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-700 font-bold px-1">
          <span className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-500" />
            ACTIVE SYSTEMIC THREAT MONITOR
          </span>
          <span className="text-slate-500">{scenarios.length} THREAT SCENARIOS IDENTIFIED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map(sc => (
            <div key={sc.id} className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold">
                  {(sc.threatLevel || '').replace(/_/g, ' ')}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{sc.mitigationSpeed}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">{sc.name}</h3>
              <p className="text-xs text-slate-600 font-mono leading-relaxed line-clamp-2">
                {sc.triggerMechanism}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-100">
                <div className="p-2 rounded bg-slate-50">
                  <span className="text-[9px] text-slate-400 block">AT-RISK EXPOSURE</span>
                  <span className="font-bold text-red-700">${(sc.simulatedEnterpriseImpactUsd / 1000000).toFixed(2)}M USD</span>
                </div>
                <div className="p-2 rounded bg-slate-50">
                  <span className="text-[9px] text-slate-400 block">RUNWAY DROP</span>
                  <span className="font-bold text-slate-800">-{sc.cashRunwayDropMonths} Months</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-Click Capital Preservation Playbook Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Playbooks List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 font-bold px-1">
            <span>SOVEREIGN DEFENSE PLAYBOOKS</span>
            <span>{playbooks.length} READY</span>
          </div>

          <div className="space-y-2.5">
            {playbooks.map(pb => {
              const isSelected = pb.id === selectedPlaybookId;
              return (
                <div
                  key={pb.id}
                  onClick={() => setSelectedPlaybookId(pb.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-white border-red-500 shadow-xs ring-1 ring-red-500/20'
                      : 'bg-white/80 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900">{pb.code}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      AUTONOMOUS
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">{pb.title}</p>
                  <p className="text-[11px] text-slate-500 font-mono line-clamp-2 mb-2">{pb.objective}</p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                    <span className="text-emerald-700 font-bold">+${(pb.expectedLiquidityPreservedUsd / 1000000).toFixed(2)}M Protected</span>
                    <span className="text-slate-600">+{pb.runwayExtensionMonths}m Runway</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Playbook Execution Console */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-red-600">{selectedPlaybook.code}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                  {selectedPlaybook.targetCrisis}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">{selectedPlaybook.title}</h2>
              <p className="text-xs text-slate-600 font-mono mt-1">{selectedPlaybook.objective}</p>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400">LIQUIDITY PRESERVED</div>
              <div className="text-lg font-bold font-mono text-emerald-700">
                +${(selectedPlaybook.expectedLiquidityPreservedUsd / 1000000).toFixed(2)}M USD
              </div>
            </div>
          </div>

          {/* Action Checklist */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold uppercase text-slate-800 block">
              Autonomous Action Sequence ({selectedPlaybook.actionChecklist.length} Stages)
            </span>

            <div className="space-y-2">
              {selectedPlaybook.actionChecklist.map((item) => (
                <div key={item.step} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center font-bold">
                        {item.step}
                      </span>
                      <span>{item.responsibleAgent}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{item.estimatedExecutionSeconds}s SLA</span>
                  </div>
                  <p className="text-slate-600 pl-7">{item.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Terminal Output Log */}
          {drillLog.length > 0 && (
            <div className="p-3.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs space-y-1 max-h-36 overflow-y-auto">
              <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold uppercase border-b border-slate-800 pb-1 mb-1">
                <Terminal className="w-3 h-3" />
                <span>War-Room Telemetry Log</span>
              </div>
              {drillLog.map((log, idx) => (
                <div key={idx} className="text-[11px] leading-relaxed text-slate-300">
                  {log}
                </div>
              ))}
            </div>
          )}

          {/* Interactive Trigger Button */}
          <div className="pt-2">
            <button
              onClick={handleRunPlaybookDrill}
              disabled={isDrillRunning}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold transition shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isDrillRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing Crisis Playbook Maneuvers...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Execute Crisis Defense Protocol ({selectedPlaybook.code})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
