import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Moon, 
  Sun, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Eye, 
  Maximize2,
  ArrowRight
} from 'lucide-react';

interface BillionDollarDashboardDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStyle?: (style: 'DARK_LUXURY' | 'LIGHT_MINIMALIST') => void;
}

export const BillionDollarDashboardDesignModal: React.FC<BillionDollarDashboardDesignModalProps> = ({
  isOpen,
  onClose,
  onSelectStyle
}) => {
  const [selectedTheme, setSelectedTheme] = useState<'DARK_LUXURY' | 'LIGHT_MINIMALIST'>('DARK_LUXURY');
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b132a] border border-slate-700/80 rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden font-sans text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white tracking-wide">
                  Enterprise Financial Dashboard Architecture
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                  YC TIER • ZERO CLUTTER
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pristine layout inspired by Stripe, Mercury Bank, and Ramp — Clean hierarchy, high-finance typography, and zero mess.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Theme Switcher Ribbon */}
        <div className="px-6 py-3 bg-slate-950/70 border-b border-slate-800/80 flex items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px] uppercase font-bold">Select Visual Philosophy:</span>
            <button
              type="button"
              onClick={() => setSelectedTheme('DARK_LUXURY')}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition cursor-pointer font-bold ${
                selectedTheme === 'DARK_LUXURY'
                  ? 'bg-slate-900 border-emerald-400 text-white shadow-md'
                  : 'bg-transparent border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Concept A: Deep Slate &amp; Emerald (Dark Luxury)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTheme('LIGHT_MINIMALIST')}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition cursor-pointer font-bold ${
                selectedTheme === 'LIGHT_MINIMALIST'
                  ? 'bg-white border-slate-300 text-slate-900 shadow-md'
                  : 'bg-transparent border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Concept B: Swiss Crisp White (Mercury / Stripe Light)</span>
            </button>
          </div>

          <div className="text-[11px] text-emerald-400 font-bold hidden md:flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>High-Finance Typographic Rigor</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-950/50">
          
          {/* Main Visual Mockup Showcase */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 relative group shadow-2xl">
            {selectedTheme === 'DARK_LUXURY' ? (
              <div className="relative">
                <img
                  src="/src/assets/images/fintech_dashboard_design_1790933281321.jpg"
                  alt="ECONOS Dark Luxury Fintech Dashboard Design"
                  className="w-full h-auto object-cover max-h-[520px] rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setZoomImage('/src/assets/images/fintech_dashboard_design_1790933281321.jpg')}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition shadow-lg flex items-center gap-1.5 text-xs font-mono"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Full Screen</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <img
                  src="/src/assets/images/fintech_dashboard_light_1790933302655.jpg"
                  alt="ECONOS Swiss Light Minimalist Fintech Dashboard Design"
                  className="w-full h-auto object-cover max-h-[520px] rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setZoomImage('/src/assets/images/fintech_dashboard_light_1790933302655.jpg')}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition shadow-lg flex items-center gap-1.5 text-xs font-mono"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Full Screen</span>
                </button>
              </div>
            )}
          </div>

          {/* Design Philosophy & Layout Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <DollarSign className="w-4 h-4" />
                <span>1. Core Metric Quadrant</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                4 crisp KPI cards with ample breathing room. Shows Liquid Working Capital, Net Receivables Due, DSO (Days Sales Outstanding), and Early-Pay Discounts without noise.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>2. 90-Day Liquidity Trajectory</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                A single elegant forecasting curve showing exact payroll dates, GC retention releases, and supplier payment cycles so the CFO has instant peace of mind.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>3. Pristine Invoice Factoring Ledger</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Clean tabular data with verified contractor names, invoice numbers, amounts, and a 1-click &quot;Accelerate Cash&quot; button. Zero clutter, 100% actionable.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-xs">
          <div className="text-slate-400 text-[11px]">
            Ready to implement this exact layout into the primary workspace?
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
            >
              Reviewing Design
            </button>

            <button
              type="button"
              onClick={() => {
                if (onSelectStyle) onSelectStyle(selectedTheme);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <span>Apply This Clean Design &rarr;</span>
            </button>
          </div>
        </div>

        {/* Full Screen Image Zoom Modal */}
        {zoomImage && (
          <div 
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-7xl w-full">
              <img
                src={zoomImage}
                alt="Full screen preview"
                className="w-full h-auto object-contain max-h-[92vh] rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 text-xs font-mono bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700 text-white">
                Click anywhere to close
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
