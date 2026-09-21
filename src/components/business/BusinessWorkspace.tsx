import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../api/client';
import { Business, EconomicProfile, Opportunity, Scenario, OutcomeVerification } from '../../types/econos';
import { useAuth } from '../../context/AuthContext';
import { EconomicSnapshot } from './EconomicSnapshot';
import { CommercialPricingWorkspace } from './CommercialPricingWorkspace';
import { CommercialPipelineWorkspace } from './CommercialPipelineWorkspace';
import { CommercialInvoicingWorkspace } from './CommercialInvoicingWorkspace';
import { CommercialExpenseWorkspace } from './CommercialExpenseWorkspace';
import { CommercialTreasuryWorkspace } from './CommercialTreasuryWorkspace';
import { CommercialCashFlowWorkspace } from './CommercialCashFlowWorkspace';
import { CommercialTaxWorkspace } from './CommercialTaxWorkspace';
import { CommercialReconciliationWorkspace } from './CommercialReconciliationWorkspace';
import { CommercialErpIntegrationWorkspace } from './CommercialErpIntegrationWorkspace';
import { CommercialRbacGovernanceWorkspace } from './CommercialRbacGovernanceWorkspace';
import { CommercialWhatIfStudioWorkspace } from './CommercialWhatIfStudioWorkspace';
import { CommercialAiCfoWorkspace } from './CommercialAiCfoWorkspace';
import { CommercialFxHedgingWorkspace } from './CommercialFxHedgingWorkspace';
import { CommercialCapTableWorkspace } from './CommercialCapTableWorkspace';
import { CommercialBoardDeckWorkspace } from './CommercialBoardDeckWorkspace';
import { CommercialProcureToPayWorkspace } from './CommercialProcureToPayWorkspace';
import { CommercialRevenueRecognitionWorkspace } from './CommercialRevenueRecognitionWorkspace';
import { CommercialContinuousCloseWorkspace } from './CommercialContinuousCloseWorkspace';
import { CommercialAuditVaultWorkspace } from './CommercialAuditVaultWorkspace';
import { OpportunityEngine } from './OpportunityEngine';
import { ScenarioEngine } from './ScenarioEngine';
import { OutcomeVerificationView } from './OutcomeVerification';
import { EconomicGraphView } from '../graph/EconomicGraphView';
import { AgenticOperationsHub } from './AgenticOperationsHub';
import { AppLayer } from '../../types/econos';
import { 
  BarChart3, 
  Tag,
  Briefcase,
  FileText,
  Receipt,
  Landmark,
  TrendingUp,
  Scale,
  Sparkles, 
  Sliders, 
  FileCheck,
  RefreshCw,
  Network,
  Bot,
  CheckCheck,
  Webhook,
  KeyRound,
  Gauge,
  Globe,
  PieChart,
  Presentation,
  ShoppingCart,
  FileSpreadsheet,
  CalendarCheck,
  ShieldCheck
} from 'lucide-react';

type BusinessSubTab = 
  | 'SNAPSHOT' 
  | 'PRICING' 
  | 'PIPELINE' 
  | 'INVOICES' 
  | 'EXPENSES' 
  | 'TREASURY' 
  | 'AI_CFO'
  | 'RECONCILIATION'
  | 'CASHFLOW' 
  | 'WHAT_IF_STUDIO'
  | 'FX_HEDGING'
  | 'TAX' 
  | 'ERP_INTEGRATION'
  | 'RBAC_GOVERNANCE'
  | 'CAP_TABLE'
  | 'BOARD_DECK'
  | 'PROCURE_TO_PAY'
  | 'REV_REC'
  | 'CONTINUOUS_CLOSE'
  | 'AUDIT_VAULT'
  | 'GRAPH'
  | 'AUTOMATION'
  | 'OPPORTUNITIES' 
  | 'SCENARIO' 
  | 'OUTCOMES';

type BusinessSubTabCategory = 'ALL' | 'ENTERPRISE' | 'CORE' | 'STRATEGY';

const SUBTABS: { 
  id: BusinessSubTab; 
  label: string; 
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>; 
  category: 'ENTERPRISE' | 'CORE' | 'STRATEGY'; 
  isNew?: boolean; 
  badge?: string;
  activeColor: string;
  inactiveColor: string;
}[] = [
  // CORE FINOPS
  { id: 'SNAPSHOT', label: '1. Economic Snapshot', shortLabel: 'Snapshot', icon: BarChart3, category: 'CORE', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'PRICING', label: '2. Pricing & CPQ', shortLabel: 'Pricing & CPQ', icon: Tag, category: 'CORE', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'PIPELINE', label: '3. Sales Pipeline CRM', shortLabel: 'Pipeline CRM', icon: Briefcase, category: 'CORE', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'INVOICES', label: '4. Invoicing & Receivables', shortLabel: 'Invoices AR', icon: FileText, category: 'CORE', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'EXPENSES', label: '5. Expenses & Payables', shortLabel: 'Expenses AP', icon: Receipt, category: 'CORE', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'TREASURY', label: '6. Banking & Treasury', shortLabel: 'Treasury Desk', icon: Landmark, category: 'CORE', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'CASHFLOW', label: '9. Cash Flow & Runway', shortLabel: 'Cash Flow', icon: TrendingUp, category: 'CORE', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'TAX', label: '12. Tax & Compliance', shortLabel: 'Tax 1099/W9', icon: Scale, category: 'CORE', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },

  // LATEST ENTERPRISE FEATURES
  { id: 'AI_CFO', label: '7. AI CFO Copilot & Briefing', shortLabel: 'AI CFO Copilot', icon: Bot, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-indigo-700 text-white', inactiveColor: 'text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200' },
  { id: 'RECONCILIATION', label: '8. Multi-Bank Reconciliation', shortLabel: 'Reconciliation', icon: CheckCheck, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200' },
  { id: 'WHAT_IF_STUDIO', label: '10. "What-If" Stress Studio', shortLabel: 'What-If Studio', icon: Gauge, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-rose-700 text-white', inactiveColor: 'text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200' },
  { id: 'FX_HEDGING', label: '11. FX Hedging & Global Nexus', shortLabel: 'FX Hedging & Tax', icon: Globe, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-cyan-800 text-white', inactiveColor: 'text-cyan-800 bg-cyan-50/80 hover:bg-cyan-100 border border-cyan-200' },
  { id: 'ERP_INTEGRATION', label: '13. ERP & Webhook Bus', shortLabel: 'ERP & Webhooks', icon: Webhook, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-blue-700 text-white', inactiveColor: 'text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200' },
  { id: 'RBAC_GOVERNANCE', label: '14. Dual-Control RBAC', shortLabel: 'RBAC Governance', icon: KeyRound, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-purple-800 text-white', inactiveColor: 'text-purple-800 bg-purple-50/80 hover:bg-purple-100 border border-purple-200' },
  { id: 'CAP_TABLE', label: '15. Cap Table & CapEx Assets', shortLabel: 'Cap Table & Assets', icon: PieChart, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-amber-700 text-white', inactiveColor: 'text-amber-800 bg-amber-50/80 hover:bg-amber-100 border border-amber-200' },
  { id: 'BOARD_DECK', label: '16. Investor Board Deck', shortLabel: 'Board Deck Studio', icon: Presentation, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-violet-700 text-white', inactiveColor: 'text-violet-800 bg-violet-50/80 hover:bg-violet-100 border border-violet-200' },
  { id: 'PROCURE_TO_PAY', label: '17. Procure-to-Pay (3-Way Match)', shortLabel: 'P2P 3-Way Match', icon: ShoppingCart, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-cyan-700 text-white', inactiveColor: 'text-cyan-800 bg-cyan-50/80 hover:bg-cyan-100 border border-cyan-200' },
  { id: 'REV_REC', label: '18. ASC 606 Rev Recognition', shortLabel: 'ASC 606 RevRec', icon: FileSpreadsheet, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-teal-700 text-white', inactiveColor: 'text-teal-800 bg-teal-50/80 hover:bg-teal-100 border border-teal-200' },
  { id: 'CONTINUOUS_CLOSE', label: '19. Autonomous Continuous Close', shortLabel: 'Month-End Close', icon: CalendarCheck, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-amber-800 text-white', inactiveColor: 'text-amber-800 bg-amber-50/80 hover:bg-amber-100 border border-amber-200' },
  { id: 'AUDIT_VAULT', label: '20. SOC-2 Cryptographic Vault', shortLabel: 'SOC-2 Audit Vault', icon: ShieldCheck, category: 'ENTERPRISE', isNew: true, badge: 'NEW', activeColor: 'bg-emerald-800 text-white', inactiveColor: 'text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200' },

  // STRATEGY & SIMULATION
  { id: 'GRAPH', label: '21. Live Network Graph', shortLabel: 'Network Graph', icon: Network, category: 'STRATEGY', activeColor: 'bg-purple-700 text-white', inactiveColor: 'text-purple-700 bg-purple-50/80 hover:bg-purple-100 border border-purple-200' },
  { id: 'AUTOMATION', label: '22. Agentic Operations (8 Agents)', shortLabel: '8 AI Agents', icon: Bot, category: 'STRATEGY', activeColor: 'bg-sky-700 text-white', inactiveColor: 'text-sky-800 bg-sky-50/80 hover:bg-sky-100 border border-sky-200' },
  { id: 'OPPORTUNITIES', label: '23. AI Opportunities', shortLabel: 'Opportunities', icon: Sparkles, category: 'STRATEGY', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'SCENARIO', label: '24. Simulation Engine', shortLabel: 'Simulation', icon: Sliders, category: 'STRATEGY', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
  { id: 'OUTCOMES', label: '25. Outcome Verification', shortLabel: 'Outcomes', icon: FileCheck, category: 'STRATEGY', activeColor: 'bg-[#132338] text-white', inactiveColor: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' },
];

interface BusinessWorkspaceProps {
  onNavigateToLayer?: (layer: AppLayer) => void;
}

export const BusinessWorkspace: React.FC<BusinessWorkspaceProps> = ({ onNavigateToLayer }) => {
  const { currentOrg, currentBusiness } = useAuth();
  const [subTab, setSubTab] = useState<BusinessSubTab>('SNAPSHOT');
  const [categoryFilter, setCategoryFilter] = useState<BusinessSubTabCategory>('ALL');
  
  const [profile, setProfile] = useState<EconomicProfile | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [outcomes, setOutcomes] = useState<OutcomeVerification[]>([]);
  const [loading, setLoading] = useState(true);

  // Cross-component handoffs
  const [prefilledOppForScenario, setPrefilledOppForScenario] = useState<Opportunity | null>(null);
  const [prefilledOppForOutcome, setPrefilledOppForOutcome] = useState<Opportunity | null>(null);

  const loadBusinessData = useCallback(async () => {
    try {
      setLoading(true);
      const [snapshotRes, oppsRes, scenRes, outRes] = await Promise.all([
        api.getEconomicSnapshot().catch(() => null),
        api.getOpportunities().catch(() => []),
        api.getScenarios().catch(() => []),
        api.getOutcomes().catch(() => [])
      ]);

      if (snapshotRes) {
        setProfile(snapshotRes.profile);
      }
      setOpportunities(oppsRes || []);
      setScenarios(scenRes || []);
      setOutcomes(outRes || []);
    } catch (err) {
      console.error('Failed to load business data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBusinessData();
  }, [loadBusinessData, currentOrg?.id]);

  const handleSimulateInScenario = (opp: Opportunity) => {
    setPrefilledOppForScenario(opp);
    setSubTab('SCENARIO');
  };

  const handleVerifyOutcome = (opp: Opportunity) => {
    setPrefilledOppForOutcome(opp);
    setSubTab('OUTCOMES');
  };

  return (
    <div className="space-y-6">
      {/* Enterprise Additions Quick-Launcher Banner */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-cyan-50/70 to-amber-50/80 border border-indigo-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-extrabold bg-indigo-600 text-white tracking-wide uppercase shadow-xs">
                ✨ LATEST ENTERPRISE FEATURES
              </span>
              <span className="text-xs font-mono text-slate-500">• Direct 1-Click Launch</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Immediate access to recently deployed modules: AI CFO, FX Hedging, Cap Table, Board Deck, P2P 3-Way Match, ASC 606 RevRec, Continuous Close & SOC-2 Vault.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="quick-launch-aicfo"
              onClick={() => setSubTab('AI_CFO')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                subTab === 'AI_CFO' 
                  ? 'bg-indigo-700 text-white shadow-xs' 
                  : 'bg-white text-indigo-800 hover:bg-indigo-50 border border-indigo-300/80 shadow-2xs'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>7. AI CFO</span>
            </button>

            <button
              id="quick-launch-fx"
              onClick={() => setSubTab('FX_HEDGING')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                subTab === 'FX_HEDGING' 
                  ? 'bg-cyan-800 text-white shadow-xs' 
                  : 'bg-white text-cyan-800 hover:bg-cyan-50 border border-cyan-300/80 shadow-2xs'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>11. FX</span>
            </button>

            <button
              id="quick-launch-captable"
              onClick={() => setSubTab('CAP_TABLE')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                subTab === 'CAP_TABLE' 
                  ? 'bg-amber-700 text-white shadow-xs' 
                  : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-300/80 shadow-2xs'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>15. Cap Table</span>
            </button>

            <button
              id="quick-launch-boarddeck"
              onClick={() => setSubTab('BOARD_DECK')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                subTab === 'BOARD_DECK' 
                  ? 'bg-violet-700 text-white shadow-xs' 
                  : 'bg-white text-violet-800 hover:bg-violet-50 border border-violet-300/80 shadow-2xs'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>16. Board Deck</span>
            </button>

            <button
              id="quick-launch-p2p"
              onClick={() => setSubTab('PROCURE_TO_PAY')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                subTab === 'PROCURE_TO_PAY' 
                  ? 'bg-cyan-700 text-white shadow-xs' 
                  : 'bg-white text-cyan-800 hover:bg-cyan-50 border border-cyan-300/80 shadow-2xs'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>17. P2P 3-Way Match</span>
            </button>

            <button
              id="quick-launch-revrec"
              onClick={() => setSubTab('REV_REC')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                subTab === 'REV_REC' 
                  ? 'bg-teal-700 text-white shadow-xs' 
                  : 'bg-white text-teal-800 hover:bg-teal-50 border border-teal-300/80 shadow-2xs'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>18. ASC 606</span>
            </button>

            <button
              id="quick-launch-close"
              onClick={() => setSubTab('CONTINUOUS_CLOSE')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                subTab === 'CONTINUOUS_CLOSE' 
                  ? 'bg-amber-800 text-white shadow-xs' 
                  : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-300/80 shadow-2xs'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>19. Close Seal</span>
            </button>

            <button
              id="quick-launch-auditvault"
              onClick={() => setSubTab('AUDIT_VAULT')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                subTab === 'AUDIT_VAULT' 
                  ? 'bg-emerald-800 text-white shadow-xs' 
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-300/80 shadow-2xs'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>20. SOC-2 Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-tab Filter Bar & Direct Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setCategoryFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                categoryFilter === 'ALL' 
                  ? 'bg-white text-slate-900 font-bold shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All ({SUBTABS.length})
            </button>
            <button
              onClick={() => setCategoryFilter('ENTERPRISE')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1 transition ${
                categoryFilter === 'ENTERPRISE' 
                  ? 'bg-indigo-700 text-white font-bold shadow-xs' 
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <span>✨ Latest Enterprise</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-indigo-200/50 text-indigo-900 font-bold">12</span>
            </button>
            <button
              onClick={() => setCategoryFilter('CORE')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                categoryFilter === 'CORE' 
                  ? 'bg-[#132338] text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Core FinOps (8)
            </button>
            <button
              onClick={() => setCategoryFilter('STRATEGY')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                categoryFilter === 'STRATEGY' 
                  ? 'bg-purple-700 text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Strategy & AI (5)
            </button>
          </div>

          {/* Direct Dropdown Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-slate-400">Jump:</span>
            <select
              value={subTab}
              onChange={(e) => setSubTab(e.target.value as BusinessSubTab)}
              className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
            >
              <optgroup label="✨ Latest Enterprise Modules">
                <option value="AI_CFO">7. AI CFO Copilot & Briefing</option>
                <option value="RECONCILIATION">8. Multi-Bank Reconciliation</option>
                <option value="WHAT_IF_STUDIO">10. &quot;What-If&quot; Stress Studio</option>
                <option value="FX_HEDGING">11. FX Hedging & Global Nexus</option>
                <option value="ERP_INTEGRATION">13. ERP & Webhook Bus</option>
                <option value="RBAC_GOVERNANCE">14. Dual-Control RBAC Governance</option>
                <option value="CAP_TABLE">15. Cap Table & CapEx Assets</option>
                <option value="BOARD_DECK">16. Investor Board Deck Studio</option>
                <option value="PROCURE_TO_PAY">17. Procure-to-Pay (3-Way Match)</option>
                <option value="REV_REC">18. ASC 606 Rev Recognition</option>
                <option value="CONTINUOUS_CLOSE">19. Autonomous Continuous Close</option>
                <option value="AUDIT_VAULT">20. SOC-2 Cryptographic Vault</option>
              </optgroup>
              <optgroup label="Core FinOps Operations">
                <option value="SNAPSHOT">1. Economic Snapshot</option>
                <option value="PRICING">2. Pricing & CPQ</option>
                <option value="PIPELINE">3. Sales Pipeline CRM</option>
                <option value="INVOICES">4. Invoicing & Receivables</option>
                <option value="EXPENSES">5. Expenses & Payables</option>
                <option value="TREASURY">6. Banking & Treasury</option>
                <option value="CASHFLOW">9. Cash Flow & Runway</option>
                <option value="TAX">12. Tax & Compliance</option>
              </optgroup>
              <optgroup label="Strategy, AI & Execution">
                <option value="GRAPH">21. Live Network Graph</option>
                <option value="AUTOMATION">22. Agentic Operations (8 Agents)</option>
                <option value="OPPORTUNITIES">23. AI Opportunities</option>
                <option value="SCENARIO">24. Simulation Engine</option>
                <option value="OUTCOMES">25. Outcome Verification</option>
              </optgroup>
            </select>
          </div>
        </div>

        <button
          onClick={loadBusinessData}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 text-xs font-mono transition self-end sm:self-auto shadow-xs shrink-0"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Filtered Sub-tab Navigation Scrollbar */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-200/90 shadow-xs overflow-x-auto">
        {SUBTABS
          .filter(t => categoryFilter === 'ALL' || t.category === categoryFilter)
          .map(tab => {
            const IconComponent = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`subtab-${tab.id.toLowerCase().replace(/_/g, '')}`}
                onClick={() => setSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition shrink-0 ${
                  isActive ? `${tab.activeColor} font-bold shadow-xs` : tab.inactiveColor
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && !isActive && (
                  <span className="px-1 py-0.2 rounded font-mono text-[9px] font-extrabold bg-indigo-100 text-indigo-800">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
      </div>

      {/* Active Tab Content */}
      {subTab === 'SNAPSHOT' && (
        <EconomicSnapshot
          business={currentBusiness}
          profile={profile}
          onRefresh={loadBusinessData}
        />
      )}

      {subTab === 'PRICING' && (
        <CommercialPricingWorkspace
          onNavigateToInvoices={() => setSubTab('INVOICES')}
        />
      )}

      {subTab === 'PIPELINE' && (
        <CommercialPipelineWorkspace
          onNavigateToQuotes={() => setSubTab('PRICING')}
        />
      )}

      {subTab === 'INVOICES' && (
        <CommercialInvoicingWorkspace
          onInvoiceUpdated={loadBusinessData}
        />
      )}

      {subTab === 'EXPENSES' && (
        <CommercialExpenseWorkspace
          onExpenseUpdated={loadBusinessData}
        />
      )}

      {subTab === 'TREASURY' && (
        <CommercialTreasuryWorkspace />
      )}

      {subTab === 'AI_CFO' && (
        <CommercialAiCfoWorkspace />
      )}

      {subTab === 'RECONCILIATION' && (
        <CommercialReconciliationWorkspace 
          onNavigateToTreasury={() => setSubTab('TREASURY')}
          onNavigateToInvoices={() => setSubTab('INVOICES')}
        />
      )}

      {subTab === 'CASHFLOW' && (
        <CommercialCashFlowWorkspace />
      )}

      {subTab === 'WHAT_IF_STUDIO' && (
        <CommercialWhatIfStudioWorkspace 
          onNavigateToCashFlow={() => setSubTab('CASHFLOW')}
        />
      )}

      {subTab === 'FX_HEDGING' && (
        <CommercialFxHedgingWorkspace />
      )}

      {subTab === 'TAX' && (
        <CommercialTaxWorkspace />
      )}

      {subTab === 'ERP_INTEGRATION' && (
        <CommercialErpIntegrationWorkspace />
      )}

      {subTab === 'RBAC_GOVERNANCE' && (
        <CommercialRbacGovernanceWorkspace />
      )}

      {subTab === 'CAP_TABLE' && (
        <CommercialCapTableWorkspace />
      )}

      {subTab === 'BOARD_DECK' && (
        <CommercialBoardDeckWorkspace />
      )}

      {subTab === 'PROCURE_TO_PAY' && (
        <CommercialProcureToPayWorkspace />
      )}

      {subTab === 'REV_REC' && (
        <CommercialRevenueRecognitionWorkspace />
      )}

      {subTab === 'CONTINUOUS_CLOSE' && (
        <CommercialContinuousCloseWorkspace />
      )}

      {subTab === 'AUDIT_VAULT' && (
        <CommercialAuditVaultWorkspace />
      )}

      {subTab === 'GRAPH' && (
        <EconomicGraphView />
      )}

      {subTab === 'AUTOMATION' && (
        <AgenticOperationsHub onNavigateToLayer={onNavigateToLayer} />
      )}

      {subTab === 'OPPORTUNITIES' && (
        <OpportunityEngine
          opportunities={opportunities}
          onRefresh={loadBusinessData}
          onSimulateInScenario={handleSimulateInScenario}
          onVerifyOutcome={handleVerifyOutcome}
        />
      )}

      {subTab === 'SCENARIO' && (
        <ScenarioEngine
          profile={profile}
          scenarios={scenarios}
          onRefresh={loadBusinessData}
          prefillOpportunity={prefilledOppForScenario}
        />
      )}

      {subTab === 'OUTCOMES' && (
        <OutcomeVerificationView
          verifications={outcomes}
          opportunities={opportunities}
          onRefresh={loadBusinessData}
          prefillOpportunity={prefilledOppForOutcome}
        />
      )}
    </div>
  );
};
