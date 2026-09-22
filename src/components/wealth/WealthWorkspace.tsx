import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../api/client';
import { WealthProfile, WealthEngineItem } from '../../types/econos';
import { useAuth } from '../../context/AuthContext';
import { WealthDashboard } from './WealthDashboard';
import { WealthEnginesGrid } from './WealthEnginesGrid';
import { AIWealthAdvisorView } from './AIWealthAdvisorView';
import { SovereignDataExportView } from './SovereignDataExportView';
import { 
  TrendingUp, 
  Cpu, 
  BrainCircuit, 
  RefreshCw,
  Download,
  FileJson
} from 'lucide-react';

type WealthSubTab = 'DASHBOARD' | 'ENGINES' | 'ADVISOR' | 'EXPORT';

export const WealthWorkspace: React.FC = () => {
  const { currentOrg } = useAuth();
  const [subTab, setSubTab] = useState<WealthSubTab>('DASHBOARD');
  const [wealthProfile, setWealthProfile] = useState<WealthProfile | null>(null);
  const [engines, setEngines] = useState<WealthEngineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWealthData = useCallback(async () => {
    try {
      setLoading(true);
      const [wpRes, engRes] = await Promise.all([
        api.getWealthProfile().catch(() => null),
        api.getWealthEngines().catch(() => [])
      ]);
      setWealthProfile(wpRes);
      setEngines(engRes || []);
    } catch (err) {
      console.error('Failed to load wealth data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWealthData();
  }, [loadWealthData, currentOrg?.id]);

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar">
          <button
            id="wealth-subtab-dashboard"
            onClick={() => setSubTab('DASHBOARD')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              subTab === 'DASHBOARD' 
                ? 'bg-slate-100 text-slate-900 font-bold shadow-2xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>1. Wealth Dashboard & Balance Sheet</span>
          </button>

          <button
            id="wealth-subtab-engines"
            onClick={() => setSubTab('ENGINES')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              subTab === 'ENGINES' 
                ? 'bg-slate-100 text-slate-900 font-bold shadow-2xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span>2. 20 Wealth Engines ({engines.length})</span>
          </button>

          <button
            id="wealth-subtab-advisor"
            onClick={() => setSubTab('ADVISOR')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              subTab === 'ADVISOR' 
                ? 'bg-slate-100 text-slate-900 font-bold shadow-2xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
            <span>3. AI Wealth Advisor (Gemini)</span>
          </button>

          <button
            id="wealth-subtab-export"
            onClick={() => setSubTab('EXPORT')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              subTab === 'EXPORT' 
                ? 'bg-slate-100 text-slate-900 font-bold shadow-2xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>4. Sovereign Data Export</span>
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            id="wealth-quick-export-btn"
            onClick={() => setSubTab('EXPORT')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-300 text-xs font-mono font-bold transition shadow-2xs cursor-pointer"
            title="Download JSON sovereign snapshot of layers and telemetry"
          >
            <FileJson className="w-3.5 h-3.5 text-amber-600" />
            <span>Sovereign Data Export</span>
          </button>

          <button
            onClick={loadWealthData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 text-xs font-mono transition shadow-2xs"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Wealth State</span>
          </button>
        </div>
      </div>

      {subTab === 'DASHBOARD' && (
        <WealthDashboard
          profile={wealthProfile}
          onRefresh={loadWealthData}
          onOpenAdvisor={() => setSubTab('ADVISOR')}
          onOpenExport={() => setSubTab('EXPORT')}
        />
      )}

      {subTab === 'ENGINES' && (
        <WealthEnginesGrid
          engines={engines}
          onLaunchAdvisor={() => setSubTab('ADVISOR')}
        />
      )}

      {subTab === 'ADVISOR' && (
        <AIWealthAdvisorView />
      )}

      {subTab === 'EXPORT' && (
        <SovereignDataExportView
          profile={wealthProfile}
          engines={engines}
        />
      )}
    </div>
  );
};
