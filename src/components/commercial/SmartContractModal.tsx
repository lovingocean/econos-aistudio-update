import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { SmartContractDeploymentHub } from './SmartContractDeploymentHub';

interface SmartContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartContractModal: React.FC<SmartContractModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#0b1328] border border-cyan-500/40 rounded-3xl w-full max-w-5xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-[#0d1838] to-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider font-mono">
                PILLAR 1: LIVE ON-CHAIN SMART CONTRACT ARCHITECTURE
              </div>
              <h3 className="text-base font-black text-white font-mono">
                Sovereign Validator License &amp; BaseScan Verifier
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <SmartContractDeploymentHub />
        </div>
      </div>
    </div>
  );
};
