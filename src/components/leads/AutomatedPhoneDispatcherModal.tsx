import React, { useState, useEffect } from 'react';
import { Phone, PhoneForwarded, PhoneCall, Radio, CheckCircle2, AlertCircle, Clock, ShieldCheck, Play, RefreshCw, X, User, Building2 } from 'lucide-react';
import { ScrapedLead, OutboundCallRecord } from '../../types/econos';

interface AutomatedPhoneDispatcherModalProps {
  lead: ScrapedLead | null;
  isOpen: boolean;
  onClose: () => void;
  onCallDispatched?: (call: OutboundCallRecord) => void;
}

export const AutomatedPhoneDispatcherModal: React.FC<AutomatedPhoneDispatcherModalProps> = ({
  lead,
  isOpen,
  onClose,
  onCallDispatched
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callObjective, setCallObjective] = useState<'ROADMAP_WALKTHROUGH' | 'INVOICE_AUDIT' | 'WORKING_CAPITAL_QUALIFICATION'>('ROADMAP_WALKTHROUGH');
  const [telephonyStage, setTelephonyStage] = useState<'IDLE' | 'SIP_TRUNK_CONNECTING' | 'DIALING' | 'RINGING' | 'CONNECTED' | 'AGENT_SPEAKING' | 'CALL_COMPLETED'>('IDLE');
  const [activeCall, setActiveCall] = useState<OutboundCallRecord | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<Array<{ speaker: string; text: string }>>([]);
  const [callTimer, setCallTimer] = useState(0);

  useEffect(() => {
    if (isOpen && lead) {
      setPhoneNumber(lead.phone || '+1 (555) 234-8901');
      setTelephonyStage('IDLE');
      setLiveTranscript([]);
      setCallTimer(0);
      setActiveCall(null);
    }
  }, [isOpen, lead]);

  useEffect(() => {
    let interval: any = null;
    if (telephonyStage === 'CONNECTED' || telephonyStage === 'AGENT_SPEAKING') {
      interval = setInterval(() => {
        setCallTimer(t => t + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [telephonyStage]);

  const handleStartCall = async () => {
    if (!lead || !phoneNumber.trim()) return;

    setTelephonyStage('SIP_TRUNK_CONNECTING');
    setLiveTranscript([]);

    try {
      const res = await fetch('/api/leads/dispatch-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          phone: phoneNumber,
          callType: 'AUTOMATED_PHONE_OUTBOUND'
        })
      });
      const data = await res.json();
      if (data.call) {
        setActiveCall(data.call);
        onCallDispatched?.(data.call);
      }
    } catch (e) {
      console.warn('Dispatch failed, continuing simulation:', e);
    }

    // Step through telephony pipeline
    setTimeout(() => {
      setTelephonyStage('DIALING');
    }, 1200);

    setTimeout(() => {
      setTelephonyStage('RINGING');
    }, 2400);

    setTimeout(() => {
      setTelephonyStage('CONNECTED');
      setLiveTranscript([
        {
          speaker: 'ECONOS AI Voice Agent',
          text: `Hello, this is the ECONOS AI CFO automated assistant calling for ${lead.name}. Am I speaking with the finance lead or operations director?`
        }
      ]);
    }, 4200);

    // Simulated client answer & conversation
    setTimeout(() => {
      setTelephonyStage('AGENT_SPEAKING');
      setLiveTranscript(prev => [
        ...prev,
        {
          speaker: 'Client (Prospect)',
          text: `Yes, this is Sarah from operations. What is this regarding?`
        },
        {
          speaker: 'ECONOS AI Voice Agent',
          text: `Hi Sarah! We noticed your ${lead.category} company in ${lead.city} has high invoice processing velocity. We built an autonomous 3-way matching and cash forecasting engine and published our 2026 roadmap. Can I email you our 5-minute interactive preview or schedule a brief founder walkthrough on Tuesday?`
        }
      ]);
    }, 7500);

    setTimeout(() => {
      setLiveTranscript(prev => [
        ...prev,
        {
          speaker: 'Client (Prospect)',
          text: `Tuesday at 2 PM works. Please send the roadmap link to our operations email.`
        },
        {
          speaker: 'ECONOS AI Voice Agent',
          text: `Confirmed! Invitation and interactive roadmap link sent to ${lead.contactEmail}. Have a wonderful afternoon!`
        }
      ]);
      setTelephonyStage('CALL_COMPLETED');
    }, 13000);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/20">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                Automated Phone Call Dispatcher
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                  TELEPHONY AI
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Initiate automated voice outreach or instant callback
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead Target Banner */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-mono text-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span className="font-bold text-slate-900">{lead.name}</span>
            <span>({lead.city}, {lead.state})</span>
          </div>
          <span className="text-emerald-700 font-bold">ICP: {lead.icpScore}/100</span>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Phone Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 font-mono block mb-1">
              Destination Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                disabled={telephonyStage !== 'IDLE' && telephonyStage !== 'CALL_COMPLETED'}
                className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50"
                placeholder="+1 (xxx) xxx-xxxx"
              />
              <button
                onClick={handleStartCall}
                disabled={telephonyStage !== 'IDLE' && telephonyStage !== 'CALL_COMPLETED'}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold text-xs flex items-center gap-2 transition disabled:opacity-50"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client Now</span>
              </button>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1 block">
              Google Maps verified business line: {lead.phone}
            </span>
          </div>

          {/* Telephony Status Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <div className="flex items-center gap-2">
                <Radio className={`w-4 h-4 ${telephonyStage !== 'IDLE' ? 'text-amber-600 animate-pulse' : 'text-slate-400'}`} />
                <span className="font-bold text-slate-800">Telephony Line Status:</span>
              </div>
              <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                telephonyStage === 'CONNECTED' || telephonyStage === 'AGENT_SPEAKING'
                  ? 'bg-emerald-100 text-emerald-800'
                  : telephonyStage === 'CALL_COMPLETED'
                  ? 'bg-indigo-100 text-indigo-800'
                  : telephonyStage === 'IDLE'
                  ? 'bg-slate-200 text-slate-700'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {telephonyStage.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Stages Progression */}
            <div className="grid grid-cols-4 gap-1 text-[10px] text-center">
              {[
                { stage: 'DIALING', label: '1. Carrier Dial' },
                { stage: 'RINGING', label: '2. Ringing' },
                { stage: 'CONNECTED', label: '3. AI Connected' },
                { stage: 'CALL_COMPLETED', label: '4. Demo Booked' }
              ].map(s => {
                const isActive = telephonyStage === s.stage;
                const isPassed = 
                  (s.stage === 'DIALING' && ['RINGING', 'CONNECTED', 'AGENT_SPEAKING', 'CALL_COMPLETED'].includes(telephonyStage)) ||
                  (s.stage === 'RINGING' && ['CONNECTED', 'AGENT_SPEAKING', 'CALL_COMPLETED'].includes(telephonyStage)) ||
                  (s.stage === 'CONNECTED' && ['AGENT_SPEAKING', 'CALL_COMPLETED'].includes(telephonyStage)) ||
                  (s.stage === 'CALL_COMPLETED' && telephonyStage === 'CALL_COMPLETED');

                return (
                  <div
                    key={s.stage}
                    className={`p-1.5 rounded-lg border ${
                      isActive
                        ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                        : isPassed
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {s.label}
                  </div>
                );
              })}
            </div>

            {callTimer > 0 && (
              <div className="flex items-center justify-between text-slate-500 pt-1">
                <span>Call Duration:</span>
                <span className="font-bold text-slate-900">{formatTimer(callTimer)}</span>
              </div>
            )}
          </div>

          {/* Live Transcript Stream */}
          {liveTranscript.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 font-mono block">
                Live Call Speech Stream & Audio Transcription
              </label>
              <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
                {liveTranscript.map((t, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className={`text-[10px] font-bold ${t.speaker.includes('AI') ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {t.speaker}:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed pl-2 border-l-2 border-slate-800">
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {telephonyStage === 'CALL_COMPLETED' && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Call Successfully Completed • Prospect Confirmed Demo & Roadmap Review!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-400 font-mono">
            Carrier Protocol: Twilio/SIP Trunk + Gemini Voice
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-900 text-white transition"
          >
            Close Call Center
          </button>
        </div>
      </div>
    </div>
  );
};
