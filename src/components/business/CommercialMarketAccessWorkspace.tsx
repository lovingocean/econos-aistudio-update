import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
  Sparkles,
  Globe,
  Copy,
  Check,
  Lock,
  Download,
  Building,
  ArrowRight
} from 'lucide-react';

interface LicenseRecord {
  id: string;
  licenseKey: string;
  clientName: string;
  tier: 'TIER_1_CONTRACTOR' | 'TIER_2_ENTERPRISE' | 'TIER_3_INSTITUTIONAL';
  monthlyFee: number;
  status: 'ACTIVE' | 'PENDING_PROVISIONING';
  assignedAt: string;
  modulesUnlocked: number;
}

const INITIAL_LICENSES: LicenseRecord[] = [
  {
    id: 'lic-1',
    licenseKey: 'ECN-PRO-2026-9841-A89F',
    clientName: 'Apex Mechanical Solutions LLC (Dallas, TX)',
    tier: 'TIER_1_CONTRACTOR',
    monthlyFee: 1490,
    status: 'ACTIVE',
    assignedAt: '2026-10-01',
    modulesUnlocked: 30
  },
  {
    id: 'lic-2',
    licenseKey: 'ECN-ENT-2026-7712-B20C',
    clientName: 'Turner Construction Co. Subcontractor Division',
    tier: 'TIER_2_ENTERPRISE',
    monthlyFee: 4850,
    status: 'ACTIVE',
    assignedAt: '2026-09-28',
    modulesUnlocked: 30
  },
  {
    id: 'lic-3',
    licenseKey: 'ECN-INST-2026-4401-F99E',
    clientName: 'Lone Star Commercial Liquidity & Factoring Fund LP',
    tier: 'TIER_3_INSTITUTIONAL',
    monthlyFee: 12500,
    status: 'ACTIVE',
    assignedAt: '2026-09-15',
    modulesUnlocked: 30
  }
];

export const CommercialMarketAccessWorkspace: React.FC = () => {
  const [licenses, setLicenses] = useState<LicenseRecord[]>(INITIAL_LICENSES);
  const [newClientName, setNewClientName] = useState('');
  const [selectedTier, setSelectedTier] = useState<LicenseRecord['tier']>('TIER_1_CONTRACTOR');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const totalMonthlyRunRate = licenses.reduce((sum, l) => sum + l.monthlyFee, 0);
  const projectedArr = totalMonthlyRunRate * 12;

  const handleCreateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const fees = {
      TIER_1_CONTRACTOR: 1490,
      TIER_2_ENTERPRISE: 4850,
      TIER_3_INSTITUTIONAL: 12500
    };

    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newRecord: LicenseRecord = {
      id: `lic-${Date.now()}`,
      licenseKey: `ECN-${selectedTier.substring(5, 8)}-2026-${Math.floor(1000 + Math.random() * 9000)}-${randomSuffix}`,
      clientName: newClientName,
      tier: selectedTier,
      monthlyFee: fees[selectedTier],
      status: 'ACTIVE',
      assignedAt: new Date().toISOString().substring(0, 10),
      modulesUnlocked: 30
    };

    setLicenses([newRecord, ...licenses]);
    setNewClientName('');
    setNotification(`Production Enterprise License successfully minted for ${newRecord.clientName}!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commercial Go-To-Market &amp; Licensing Fortress</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Market Access, Commercial Pricing &amp; Enterprise Onboarding</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Manages commercial client subscriptions, enterprise license generation, and multi-tenant access controls. Configures institutional revenue tiers and provisions 30-module production workspaces for commercial contractors, GCs, and capital funds.
            </p>
          </div>

          <div className="bg-indigo-900/80 backdrop-blur-md rounded-xl p-4 border border-indigo-700/60 text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">Projected Enterprise ARR</p>
            <p className="text-2xl font-mono font-black text-emerald-400">
              ${projectedArr.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-300">${totalMonthlyRunRate.toLocaleString()}/mo Run Rate</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 3 COMMERCIAL TIERS SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 font-sans">Tier 1: Trade Contractor</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Pro FinOps</span>
          </div>
          <p className="text-2xl font-black text-slate-900">$1,490 <span className="text-xs text-slate-500 font-normal">/ month</span></p>
          <ul className="text-[11px] text-slate-600 font-sans space-y-1.5">
            <li>✓ Full AIA G702 / G703 Billing</li>
            <li>✓ 50-State Statutory Lien Waivers</li>
            <li>✓ IRS §179D Energy Tax Harvester</li>
            <li>✓ Same-Day Factoring Advances</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-indigo-50/60 border border-indigo-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-950 font-sans">Tier 2: General Contractor</span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">Enterprise</span>
          </div>
          <p className="text-2xl font-black text-indigo-900">$4,850 <span className="text-xs text-slate-500 font-normal">/ month</span></p>
          <ul className="text-[11px] text-slate-600 font-sans space-y-1.5">
            <li>✓ Everything in Tier 1</li>
            <li>✓ Tri-Party Joint-Check &amp; Escrow Clearing</li>
            <li>✓ Davis-Bacon Certified Payroll Engine</li>
            <li>✓ Altman Z''-Score GC Underwriting</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white font-sans">Tier 3: Institutional Fund</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">Liquidity Desk</span>
          </div>
          <p className="text-2xl font-black text-emerald-400">$12,500 <span className="text-xs text-slate-400 font-normal">/ mo + 1.25% GMV</span></p>
          <ul className="text-[11px] text-slate-300 font-sans space-y-1.5">
            <li>✓ Everything in Tier 1 &amp; 2</li>
            <li>✓ UCC Article 9 Secretary of State Perfection</li>
            <li>✓ Miller Act Surety Bonding Underwriting Desk</li>
            <li>✓ SOC-2 Type II Cryptographic Vault Access</li>
          </ul>
        </div>
      </div>

      {/* MINT PRODUCTION CLIENT LICENSE FORM */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-indigo-600" />
          <span>Mint Production Client Enterprise License Key</span>
        </h3>

        <form onSubmit={handleCreateLicense} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-600 text-xs font-mono block mb-1">Client Legal Entity Name:</label>
            <input
              type="text"
              placeholder="e.g. Whiting-Turner Contracting Co."
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-900 font-bold"
            />
          </div>

          <div>
            <label className="text-slate-600 text-xs font-mono block mb-1">Commercial Subscription Tier:</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as any)}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-mono bg-slate-50 text-slate-900 font-bold"
            >
              <option value="TIER_1_CONTRACTOR">Tier 1: Trade Contractor ($1,490/mo)</option>
              <option value="TIER_2_ENTERPRISE">Tier 2: General Contractor ($4,850/mo)</option>
              <option value="TIER_3_INSTITUTIONAL">Tier 3: Institutional Fund ($12,500/mo)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mint Client License Key</span>
            </button>
          </div>
        </form>
      </div>

      {/* ACTIVE CLIENT LICENSES TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active Production Customer Licenses</h3>
            <p className="text-xs text-slate-500">Cryptographically active client credentials with 30 modules unlocked</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200">
            {licenses.length} Commercial Clients Live
          </span>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {licenses.map(lic => (
            <div key={lic.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 font-sans text-sm">{lic.clientName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                    {lic.tier.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <span>Key: <strong className="text-indigo-700">{lic.licenseKey}</strong></span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(lic.licenseKey)}
                    className="p-1 text-slate-400 hover:text-slate-600 transition"
                  >
                    {copiedKey === lic.licenseKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <p className="font-black text-slate-900 text-sm">${lic.monthlyFee.toLocaleString()}/mo</p>
                  <p className="text-[10px] text-emerald-600 font-bold">30 Modules Unlocked</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  ✓ Active License
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
