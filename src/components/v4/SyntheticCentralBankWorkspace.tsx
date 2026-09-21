import React, { useState } from 'react';
import { 
  Landmark, 
  Coins, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  DollarSign, 
  Percent, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Building2,
  Lock
} from 'lucide-react';
import { 
  ESDR_RESERVE_BASKET, 
  CENTRAL_BANK_DISCOUNT_FACILITIES 
} from '../../data/planetaryLayersData';
import { EsdrReserveAsset, CentralBankDiscountFacility } from '../../types/econos';

export const SyntheticCentralBankWorkspace: React.FC = () => {
  const [basket, setBasket] = useState<EsdrReserveAsset[]>(ESDR_RESERVE_BASKET);
  const [facilities, setFacilities] = useState<CentralBankDiscountFacility[]>(CENTRAL_BANK_DISCOUNT_FACILITIES);
  const [selectedFacility, setSelectedFacility] = useState<CentralBankDiscountFacility>(CENTRAL_BANK_DISCOUNT_FACILITIES[0]);
  const [drawAmount, setDrawAmount] = useState(5000000);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawSuccessNotice, setDrawSuccessNotice] = useState<string | null>(null);

  // Mint / Redeem simulation
  const [mintAmountUsd, setMintAmountUsd] = useState(10000000);
  const [isMinting, setIsMinting] = useState(false);
  const [mintNotice, setMintNotice] = useState<string | null>(null);

  const totalReserveUsd = basket.reduce((sum, a) => sum + a.reserveValueUsd, 0);
  const totalEsdrIssued = totalReserveUsd; // 1 E-SDR = $1.00 USD value-pegged
  const totalFacilityLimits = facilities.reduce((sum, f) => sum + f.creditLimitEsdr, 0);
  const totalDrawnEsdr = facilities.reduce((sum, f) => sum + f.drawnBalanceEsdr, 0);

  const handleExecuteDiscountDraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    setDrawSuccessNotice(null);

    setTimeout(() => {
      setFacilities(facilities.map(f => {
        if (f.id === selectedFacility.id) {
          return {
            ...f,
            drawnBalanceEsdr: f.drawnBalanceEsdr + Number(drawAmount)
          };
        }
        return f;
      }));
      setIsDrawing(false);
      setDrawSuccessNotice(`Autonomous central bank liquidity window drawn: +${(drawAmount / 1000000).toFixed(1)}M E-SDR issued to ${selectedFacility.borrowerEntity} at 4.15% benchmark rate.`);
    }, 1000);
  };

  const handleMintEsdr = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    setMintNotice(null);

    setTimeout(() => {
      // Allocate 35% US Treasuries, 20% Gold, etc.
      setBasket(basket.map(a => ({
        ...a,
        reserveValueUsd: a.reserveValueUsd + (mintAmountUsd * (a.weightPct / 100))
      })));
      setIsMinting(false);
      setMintNotice(`Minted +${(mintAmountUsd / 1000000).toFixed(1)}M E-SDR backed by pro-rata physical gold and sovereign bonds with on-chain cryptographic proof-of-reserve.`);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Planetary Layer 22 • Autonomous Monetary Authority
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Autonomous Synthetic Central Bank & E-SDR Currency Protocol
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              An algorithmic lender-of-last-resort and private clearing unit (E-SDR) backed by a diversified basket of physical gold, short-duration sovereign treasuries, AAA bonds, and critical metals, liberating enterprise settlement from single-nation sanctions and SWIFT FX spreads.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>1 E-SDR = $1.00 USD PEG</span>
            </span>
          </div>
        </div>

        {/* Macro Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">E-SDR Reserve Basket</span>
            <span className="text-base font-bold text-slate-900">
              ${(totalReserveUsd / 1000000).toFixed(0)}M USD
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Lender of Last Resort Line</span>
            <span className="text-base font-bold text-emerald-700">${(totalFacilityLimits / 1000000).toFixed(0)}M Limit</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Central Bank Discount Rate</span>
            <span className="text-base font-bold text-sky-700">4.15% Fixed Floor</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Weighted Reserve Yield</span>
            <span className="text-base font-bold text-purple-700">3.68% Annual</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Reserve Basket Decomposition + Autonomous Discount Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Sovereign Reserve Basket Components (Col-7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              <h2 className="font-bold text-slate-900 text-sm">E-SDR Multilateral Reserve Basket Composition</h2>
            </div>
            <span className="text-[10px] text-slate-400">Audited 24/7 On-Chain</span>
          </div>

          <div className="mt-4 space-y-3">
            {basket.map(a => (
              <div key={a.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                      {a.assetCode}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">{a.assetName}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    ${(a.reserveValueUsd / 1000000).toFixed(1)}M ({a.weightPct}%)
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 rounded-full" 
                    style={{ width: `${a.weightPct}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Vault: {a.custodianVenue}</span>
                  <span className="text-slate-700 font-bold">{a.auditVerificationMethod}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mint E-SDR Action Box */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-xs mb-2">Mint E-SDR Against Collateral Deposit</h3>
            <form onSubmit={handleMintEsdr} className="flex gap-2">
              <input
                type="number"
                step="1000000"
                min="1000000"
                value={mintAmountUsd}
                onChange={e => setMintAmountUsd(Number(e.target.value))}
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800 text-xs"
              />
              <button
                type="submit"
                disabled={isMinting}
                className="px-4 py-1.5 rounded-lg bg-[#132338] hover:bg-[#0c1827] text-white font-bold text-xs transition flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3 h-3 ${isMinting ? 'animate-spin' : ''}`} />
                <span>{isMinting ? 'Minting E-SDR...' : 'Mint Sovereign Units'}</span>
              </button>
            </form>
            {mintNotice && (
              <p className="mt-2 text-[11px] text-emerald-700 font-sans">{mintNotice}</p>
            )}
          </div>
        </div>

        {/* Right Col: Autonomous Discount Window & Overnight Liquidity (Col-5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-sky-600" />
                <h2 className="font-bold text-slate-900 text-sm">Autonomous Discount Window</h2>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">Lender of Last Resort</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-2 font-sans">
              Subsidiaries borrow instant E-SDR liquidity during intra-day clearing crunches at 4.15% discount rate against pledged AAA assets.
            </p>

            <form onSubmit={handleExecuteDiscountDraw} className="mt-4 space-y-3">
              <div>
                <label className="block text-slate-600 mb-1 text-[11px]">Select Borrowing Subsidiary</label>
                <select
                  value={selectedFacility.id}
                  onChange={e => {
                    const f = facilities.find(fac => fac.id === e.target.value);
                    if (f) setSelectedFacility(f);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800"
                >
                  {facilities.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.borrowerEntity}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 text-[11px]">Discount Window Draw Amount (E-SDR)</label>
                <input
                  type="number"
                  step="1000000"
                  min="500000"
                  max={selectedFacility.creditLimitEsdr - selectedFacility.drawnBalanceEsdr}
                  value={drawAmount}
                  onChange={e => setDrawAmount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-800"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Benchmark Discount Rate:</span>
                  <span className="font-bold text-emerald-700">4.15% Annual</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pledged Collateral:</span>
                  <span className="font-bold text-slate-800">${(selectedFacility.collateralPledgedUsd / 1000000).toFixed(1)}M ({selectedFacility.collateralRatioPct}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Maturity Term:</span>
                  <span className="font-bold text-slate-800">{selectedFacility.maturityTermDays} Days Overnight Roll</span>
                </div>
              </div>

              {drawSuccessNotice && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-sans flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{drawSuccessNotice}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isDrawing}
                className="w-full py-2.5 px-4 rounded-xl bg-[#132338] hover:bg-[#0c1827] text-white font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Landmark className={`w-3.5 h-3.5 ${isDrawing ? 'animate-spin' : ''}`} />
                <span>{isDrawing ? 'Executing Settlement...' : 'Draw E-SDR Discount Liquidity'}</span>
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Clearing Protocol: <strong className="text-slate-800">E-SDR Sub-Second RTGS</strong></span>
            <span className="text-emerald-700 font-bold">100% Fully Solvent</span>
          </div>
        </div>
      </div>
    </div>
  );
};
