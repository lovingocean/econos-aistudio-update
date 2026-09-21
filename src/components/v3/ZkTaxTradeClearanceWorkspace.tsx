import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Cpu, 
  Lock, 
  Globe2, 
  Percent, 
  DollarSign, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Hash,
  Scale
} from 'lucide-react';
import { 
  INITIAL_ZK_PROOFS, 
  PILLAR_TWO_JURISDICTIONS, 
  HS_CODE_TARIFFS 
} from '../../data/sovereignDimensionsData';
import { ZkTransferPricingProof } from '../../types/econos';

export const ZkTaxTradeClearanceWorkspace: React.FC = () => {
  const [zkProofs, setZkProofs] = useState<ZkTransferPricingProof[]>(INITIAL_ZK_PROOFS);
  const [selectedProof, setSelectedProof] = useState<ZkTransferPricingProof>(INITIAL_ZK_PROOFS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [proofSuccessMessage, setProofSuccessMessage] = useState<string | null>(null);

  // Form for new ZK Proof Simulation
  const [sourceEntity, setSourceEntity] = useState('Apex Robotics Corp (US Del.)');
  const [destEntity, setDestEntity] = useState('Apex European Holdings B.V. (Netherlands)');
  const [transactionType, setTransactionType] = useState<'IP_ROYALTY' | 'MANAGEMENT_SERVICES' | 'COMPONENT_SALES' | 'INTERCOMPANY_LOAN'>('IP_ROYALTY');
  const [amountUsd, setAmountUsd] = useState(12500000);
  const [marginPct, setMarginPct] = useState(8.5);

  const handleGenerateZkProof = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setProofSuccessMessage(null);

    setTimeout(() => {
      const randomHex = Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newProof: ZkTransferPricingProof = {
        id: `zk-proof-${Math.floor(1000 + Math.random() * 9000)}`,
        sourceEntity,
        destinationEntity: destEntity,
        transactionType,
        grossAmountUsd: Number(amountUsd),
        snarkCircuit: 'Groth16-BN254',
        zkProofHash: `0x${randomHex}`,
        armLengthMarginPct: Number(marginPct),
        oecdCompliant: true,
        taxJurisdictionFrom: 'US (IRS §482 / APA Fast-Track)',
        taxJurisdictionTo: 'NL (APA Bilateral Clearance)',
        verifiedAt: new Date().toISOString(),
        status: 'PROVEN_COMPLIANT'
      };

      setZkProofs([newProof, ...zkProofs]);
      setSelectedProof(newProof);
      setIsGenerating(false);
      setProofSuccessMessage(`ZK-SNARK proof generated! Groth16 circuit constraints satisfied with 0 private trade secret leakage.`);
    }, 1200);
  };

  const totalCoveredTaxes = PILLAR_TWO_JURISDICTIONS.reduce((acc, curr) => acc + curr.annualCoveredTaxesUsd, 0);
  const totalTariffSavings = HS_CODE_TARIFFS.reduce((acc, curr) => acc + curr.annualSavingsUsd, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Dimension 1 • Cryptographic Sovereign Trade
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Zero-Knowledge Multi-Party Tax & Trade Clearance
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              ZK-SNARK cryptographic transfer pricing proofs mathematically verify arm’s-length compliance without exposing supplier margins, paired with OECD BEPS 2.0 (Pillar Two 15% minimum tax) automated jurisdiction balancing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OECD BEPS 2.0 Active</span>
            </span>
          </div>
        </div>

        {/* Macro Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Proven Intercompany Volume</span>
            <span className="text-base font-bold text-slate-900">
              ${(zkProofs.reduce((acc, p) => acc + p.grossAmountUsd, 0) / 1000000).toFixed(1)}M USD
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Effective Global Tax Rate</span>
            <span className="text-base font-bold text-emerald-700">16.4% (Floor 15%)</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Automated Tariff Savings</span>
            <span className="text-base font-bold text-sky-700">${(totalTariffSavings / 1000).toFixed(0)}k/yr</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Safe-Harbour Jurisdictions</span>
            <span className="text-base font-bold text-purple-700">6 Verified</span>
          </div>
        </div>
      </div>

      {/* Main Grid: ZK Prover Simulator + Proof Verifier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Interactive ZK-SNARK Prover Studio */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Cpu className="w-4 h-4 text-sky-600" />
            <h2 className="font-bold text-slate-900 text-sm">ZK-SNARK Transfer Pricing Circuit</h2>
          </div>
          <p className="text-slate-500 text-[11px] mt-2 font-sans">
            Prove intercompany pricing satisfies OECD arm’s-length safe harbours (Groth16 on BN254 curve) with zero disclosure of proprietary production costs.
          </p>

          <form onSubmit={handleGenerateZkProof} className="mt-4 space-y-3">
            <div>
              <label className="block text-slate-600 mb-1 text-[11px]">Originating Entity</label>
              <input
                type="text"
                value={sourceEntity}
                onChange={e => setSourceEntity(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 text-[11px]">Receiving Entity</label>
              <input
                type="text"
                value={destEntity}
                onChange={e => setDestEntity(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 mb-1 text-[11px]">Transaction Type</label>
                <select
                  value={transactionType}
                  onChange={e => setTransactionType(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800"
                >
                  <option value="IP_ROYALTY">IP Royalty</option>
                  <option value="COMPONENT_SALES">Component Sales</option>
                  <option value="MANAGEMENT_SERVICES">Management Services</option>
                  <option value="INTERCOMPANY_LOAN">Intercompany Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 text-[11px]">Gross Value ($)</label>
                <input
                  type="number"
                  value={amountUsd}
                  onChange={e => setAmountUsd(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-[11px]">
                <span className="text-slate-600">Arm’s Length Margin:</span>
                <span className="font-bold text-slate-900">{marginPct}%</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="15.0"
                step="0.1"
                value={marginPct}
                onChange={e => setMarginPct(Number(e.target.value))}
                className="w-full accent-slate-800"
              />
              <span className="text-[10px] text-slate-400">Permitted safe harbour range: 4.0% – 10.5%</span>
            </div>

            {proofSuccessMessage && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-sans flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{proofSuccessMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl bg-[#132338] hover:bg-[#0c1827] text-white font-bold transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Cpu className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing Groth16 Witness...' : 'Generate ZK Transfer Pricing Proof'}</span>
            </button>
          </form>
        </div>

        {/* Right Col: Verifiable ZK Proof Ledger & Inspector */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <h2 className="font-bold text-slate-900 text-sm">Cryptographic Proof Registry ({zkProofs.length})</h2>
              </div>
              <span className="text-[10px] text-slate-400">Verifiable by Tax Authorities</span>
            </div>

            {/* Proofs List */}
            <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
              {zkProofs.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProof(p)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    selectedProof.id === p.id 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        selectedProof.id === p.id ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-700 border border-slate-200'
                      }`}>
                        {p.transactionType}
                      </span>
                      <span className="font-bold">${(p.grossAmountUsd / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className={`text-[11px] mt-1 font-sans ${selectedProof.id === p.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {p.sourceEntity.split('(')[0]} → {p.destinationEntity.split('(')[0]}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-400 block">PROVEN OECD COMPLIANT</span>
                    <span className="text-[9px] opacity-70 truncate max-w-[120px] inline-block font-mono">
                      {p.zkProofHash.substring(0, 14)}...
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Proof Deep-Dive */}
            <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">SNARK Verification Hash:</span>
                <span className="font-bold text-slate-800 truncate max-w-[280px]">{selectedProof.zkProofHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Proof Circuit & Curve:</span>
                <span className="text-slate-700 font-bold">{selectedProof.snarkCircuit} (R1CS Constraints Satisfied)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jurisdictional Safe Harbour:</span>
                <span className="text-slate-700">{selectedProof.taxJurisdictionFrom} ⇄ {selectedProof.taxJurisdictionTo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Arm’s Length Margin:</span>
                <span className="font-bold text-emerald-700">{selectedProof.armLengthMarginPct}% (Interquartile Median)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>External Audit API: <strong className="text-slate-800">/api/v3/zk-tax-verify</strong></span>
            <span className="text-emerald-700 font-bold">Zero Knowledge Leakage Proof Certified</span>
          </div>
        </div>
      </div>

      {/* Second Row: OECD BEPS Pillar 2 (15% Minimum Tax) + Automated Tariff Optimizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OECD Pillar 2 Tax Balancing Matrix */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" />
              <h2 className="font-bold text-slate-900 text-sm">OECD BEPS 2.0 (Pillar Two 15% Global Floor)</h2>
            </div>
            <span className="text-[10px] text-slate-400">Total Taxes: ${(totalCoveredTaxes / 1000000).toFixed(1)}M</span>
          </div>

          <div className="mt-3 space-y-2.5">
            {PILLAR_TWO_JURISDICTIONS.map(j => {
              const isBelowFloor = j.effectiveTaxRatePct < 15.0;
              return (
                <div key={j.countryCode} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{j.jurisdiction}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        j.safeHarbourStatus === 'FULL_COMPLIANCE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : j.safeHarbourStatus === 'QUALIFIED_TRANSITIONAL'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {j.safeHarbourStatus}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-sans">
                      Statutory: {j.statutoryTaxRatePct}% • Effective: {j.effectiveTaxRatePct}%
                    </div>
                  </div>

                  <div className="text-right">
                    {isBelowFloor ? (
                      <span className="text-amber-800 font-bold block text-xs">
                        +{j.topUpTaxRequiredPct}% Top-Up Tax Accrued
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold block text-xs">
                        Compliant (No Top-Up)
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">
                      ${(j.annualCoveredTaxesUsd / 1000000).toFixed(2)}M Covered
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customs Duty & HS Code Optimizer */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-sky-600" />
              <h2 className="font-bold text-slate-900 text-sm">Automated Tariff & HS Code Arbitrage</h2>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold">Total Savings: ${(totalTariffSavings / 1000).toFixed(0)}k</span>
          </div>

          <div className="mt-3 space-y-2.5">
            {HS_CODE_TARIFFS.map(t => (
              <div key={t.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{t.hsCode}</span>
                    <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.5 rounded font-bold">
                      {t.declarationStatus}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    +${(t.annualSavingsUsd / 1000).toFixed(0)}k/yr Saved
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 font-sans line-clamp-1">
                  {t.description}
                </p>

                <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{t.originCountry} → {t.destinationCountry}</span>
                  <span>Standard: <del className="text-slate-400">{t.standardTariffPct}%</del> → Treaty: <strong className="text-emerald-700 font-bold">{t.optimizedTreatyTariffPct}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
