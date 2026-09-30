import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  Send,
  Play,
  RotateCcw,
  Zap,
  Users,
  DollarSign,
  MessageSquare,
  ShieldCheck,
  Check,
  Copy
} from 'lucide-react';

interface VoiceTurn {
  speaker: 'AI_CLOSER' | 'PROSPECT';
  text: string;
  timestamp: string;
}

export const AutonomousVoiceCloser: React.FC = () => {
  const [selectedProspect, setSelectedProspect] = useState({
    name: 'Apex Commercial HVAC & Mechanical',
    category: 'Commercial HVAC Contractor',
    city: 'Austin, TX',
    contactPerson: 'David Miller (Managing Partner & CFO)',
    phone: '+1 (512) 894-2201',
    monthlyInvoices: 380,
    friction: 'Net-60 delayed receivables and manual 3-way invoice matching'
  });

  const [callActive, setCallActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<VoiceTurn[]>([]);
  const [dealSentiment, setDealSentiment] = useState<number>(88);
  const [outboundSwarmActive, setOutboundSwarmActive] = useState<boolean>(false);
  const [swarmProgress, setSwarmProgress] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callActive]);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsAiSpeaking(true);
      setTimeout(() => setIsAiSpeaking(false), 3000);
    }
  };

  const handleStartCall = () => {
    setCallActive(true);
    const openingMsg = `Hello David, this is the autonomous executive closer from AuraX and ECONOS. I am calling because your team at Apex Commercial HVAC processes over 350 invoices monthly while managing Net-60 delays. We have pre-approved your firm for our continuous financial close and priority Sovereign Node settlement lane.`;
    
    setTranscript([
      {
        speaker: 'AI_CLOSER',
        text: openingMsg,
        timestamp: '00:02'
      }
    ]);
    speakText(openingMsg);
  };

  const handleEndCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallActive(false);
    setIsAiSpeaking(false);
  };

  const handleSimulateObjection = (objectionText: string, aiResponse: string, intentDelta: number) => {
    if (!callActive) {
      setCallActive(true);
    }

    const currentMins = Math.floor(callDuration / 60).toString().padStart(2, '0');
    const currentSecs = (callDuration % 60).toString().padStart(2, '0');
    const timeFormatted = `${currentMins}:${currentSecs}`;

    // Add prospect dialogue
    setTranscript((prev) => [
      ...prev,
      {
        speaker: 'PROSPECT',
        text: objectionText,
        timestamp: timeFormatted
      }
    ]);

    // AI responds
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          speaker: 'AI_CLOSER',
          text: aiResponse,
          timestamp: timeFormatted
        }
      ]);
      speakText(aiResponse);
      setDealSentiment((prev) => Math.min(100, prev + intentDelta));
    }, 600);
  };

  const handleLaunchOutboundSwarm = () => {
    setOutboundSwarmActive(true);
    setSwarmProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setSwarmProgress(current);
      if (current >= 50) {
        clearInterval(interval);
        setOutboundSwarmActive(false);
      }
    }, 800);
  };

  const formatCallTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-950 to-teal-950/60 border border-emerald-500/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/40">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>Autonomous B2B Real-Time Voice Calling &amp; Telephony Closer</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  HIGH CONVERSION TELEPHONY
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Voice AI agent places real-time phone calls to decision makers, handles complex objections, presents verified ROI, and dispatches instant Base checkout links.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {!callActive ? (
              <button
                type="button"
                onClick={handleStartCall}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Prospect Live</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEndCall}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-rose-600/30"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Hang Up Call ({formatCallTime(callDuration)})</span>
              </button>
            )}
          </div>
        </div>

        {/* Selected Prospect Details */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Dialing Target:</span>
            <div className="font-bold text-white text-sm">{selectedProspect.name}</div>
            <div className="text-[11px] text-slate-400 font-sans">
              Contact: {selectedProspect.contactPerson} • {selectedProspect.phone}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Financial Friction:</span>
            <span className="text-amber-300 font-sans text-xs">{selectedProspect.friction}</span>
          </div>
        </div>
      </div>

      {/* Live Voice Simulator Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Audio Visualizer & Interactive Transcript */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${callActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`}></span>
              <span className="text-xs font-black uppercase text-white tracking-wider">
                {callActive ? `Live Line Connected (${formatCallTime(callDuration)})` : 'Line Ready for Dialing'}
              </span>
            </div>

            {/* Audio Waveform Simulator */}
            <div className="flex items-center gap-1">
              {[40, 75, 90, 60, 100, 45, 80, 50, 95, 65].map((height, idx) => (
                <div
                  key={idx}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isAiSpeaking
                      ? 'bg-emerald-400 animate-pulse'
                      : callActive
                      ? 'bg-cyan-500/50'
                      : 'bg-slate-700'
                  }`}
                  style={{
                    height: isAiSpeaking ? `${Math.max(10, Math.round(height * Math.random()))}px` : '10px'
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Transcript Dialogue Box */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {transcript.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                Click <strong>"Call Prospect Live"</strong> or trigger an objection chip below to begin the live AI closer telephone call.
              </div>
            ) : (
              transcript.map((turn, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                    turn.speaker === 'AI_CLOSER'
                      ? 'bg-slate-900/90 border border-emerald-500/30 text-slate-200'
                      : 'bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 ml-6'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold flex items-center gap-1">
                      {turn.speaker === 'AI_CLOSER' ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Autonomous AI Closer
                        </span>
                      ) : (
                        <span className="text-indigo-400">Prospect ({selectedProspect.contactPerson})</span>
                      )}
                    </span>
                    <span className="text-slate-500">{turn.timestamp}</span>
                  </div>
                  <p className="font-sans leading-relaxed text-[11px]">{turn.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Quick Objection Handler Buttons */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Simulate Real Prospect Objections &amp; Test AI Response:
            </span>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <button
                type="button"
                onClick={() =>
                  handleSimulateObjection(
                    "Why does the Sovereign Node cost $3,499? That sounds high for software.",
                    "Great question, David. It is not just software—it is an institutional validation license capped at strictly 5,000 units on Base Mainnet. You receive direct micro-gas settlement yields averaging $420 a month in USD-O, meaning full capital payback in roughly 8 months, after which it produces pure operational cash flow.",
                    6
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer text-left"
              >
                💬 "Why is the node $3,499?"
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSimulateObjection(
                    "Can our CPA and corporate finance team write this expense off legally?",
                    "100% yes, David. We provide an automated ASC 606 and IFRS 15 compliant corporate tax invoice with verified BaseScan cryptographic hashes, EU VAT reverse charge, and US EIN attribution so your accounting team can claim it immediately with zero friction.",
                    8
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer text-left"
              >
                💬 "Can we write this off on taxes?"
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSimulateObjection(
                    "Send me the complete agreement and payment link right now to my email.",
                    "Done, David! I have just dispatched our executive onboarding memorandum and direct BaseScan payment link straight to your inbox at finance@apexwealthcapital.com. You can settle in 1-click using USDC on Base.",
                    12
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 transition cursor-pointer text-left font-bold"
              >
                💬 "Send agreement & payment link"
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Call Intelligence & 50-Lead Autonomous Swarm */}
        <div className="lg:col-span-4 space-y-4">
          {/* Sentiment & Intent Gauge */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Deal Sentiment &amp; Close Probability:</span>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-black text-emerald-400">{dealSentiment}%</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                HIGH BUYER INTENT
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${dealSentiment}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              AI Closer detected strong interest in ASC 606 tax deductibility and 8-month node payback period.
            </p>
          </div>

          {/* Autonomous 50-Lead Swarm Dialer */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-[#0d1629] to-slate-950 border border-indigo-500/40 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Autonomous 50-Lead Voice Calling Swarm
              </h4>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Deploy AI telephony agents across 50 scraped B2B commercial leads simultaneously to book meetings and close $3,499 node contracts.
            </p>

            {outboundSwarmActive ? (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Dialing Leads:</span>
                  <span className="text-indigo-400 font-bold">{swarmProgress} / 50 Completed</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${(swarmProgress / 50) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-emerald-400 block font-bold">
                  ⚡ 3 Qualified Leads Requested Invoices!
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLaunchOutboundSwarm}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition cursor-pointer shadow-md"
              >
                Launch 50-Lead Telephony Swarm
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
