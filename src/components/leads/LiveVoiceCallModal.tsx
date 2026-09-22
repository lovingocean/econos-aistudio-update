import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Calendar, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Radio, 
  Send,
  X,
  Bot,
  Mail,
  Zap,
  FileText,
  ExternalLink,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { ScrapedLead, OutboundCallRecord } from '../../types/econos';

interface LiveVoiceCallModalProps {
  lead: ScrapedLead | null;
  isOpen: boolean;
  onClose: () => void;
  onCallEnded?: (callRecord?: OutboundCallRecord) => void;
}

interface TranscriptTurn {
  role: 'ai' | 'client';
  text: string;
  timestamp: string;
}

export const LiveVoiceCallModal: React.FC<LiveVoiceCallModalProps> = ({
  lead,
  isOpen,
  onClose,
  onCallEnded
}) => {
  const [callState, setCallState] = useState<'CONNECTING' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'ENDED'>('CONNECTING');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [manualInput, setManualInput] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [meetingBooked, setMeetingBooked] = useState(false);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);

  // Autonomous Flywheel & Email Dispatch state
  const [emailDispatchedInfo, setEmailDispatchedInfo] = useState<{
    subject: string;
    body: string;
    recipient: string;
  } | null>(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [showFlywheelModal, setShowFlywheelModal] = useState(false);
  const [isDispatchingDirect, setIsDispatchingDirect] = useState(false);

  const durationTimerRef = useRef<any>(null);
  const speechRecognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && lead) {
      startVoiceSession();
    } else {
      stopVoiceSession();
    }
    return () => {
      stopVoiceSession();
    };
  }, [isOpen, lead]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const startVoiceSession = async () => {
    if (!lead) return;
    setCallState('CONNECTING');
    setTranscript([]);
    setCallDuration(0);
    setMeetingBooked(false);

    try {
      // Register outbound/browser call in backend
      const res = await fetch('/api/leads/dispatch-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          phone: lead.phone,
          callType: 'WEB_BROWSER_VOICE'
        })
      });
      const data = await res.json();
      if (data.call?.id) {
        setActiveCallId(data.call.id);
      }
    } catch (err) {
      console.warn('Could not register call log:', err);
    }

    // Start timer
    durationTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Initial greeting from autonomous AI CFO with zero gatekeeping
    setTimeout(() => {
      const greeting = `Hello, this is the autonomous ECONOS AI CFO for ${lead.name}. I have full operational access to our 4-pillar flywheel, 90-day cash forecasting, and pricing models. What can I answer for you, or would you like me to send our complete flywheel briefing to your email?`;
      addAiTurn(greeting);
      setCallState('SPEAKING');
      speak(greeting, () => {
        setCallState('LISTENING');
        initSpeechRecognition();
      });
    }, 1200);
  };

  const stopVoiceSession = () => {
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (_) {}
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setCallState('ENDED');
  };

  const speak = (text: string, onEnd?: () => void) => {
    if (isSpeakerMuted || !synthRef.current) {
      setTimeout(() => onEnd?.(), 1500);
      return;
    }
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick warm voice if available
    const voices = synthRef.current.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };
    utterance.onerror = () => {
      onEnd?.();
    };

    synthRef.current.speak(utterance);
  };

  const initSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text && text.trim().length > 0) {
          handleClientSpeech(text.trim());
        }
      };

      recognition.onerror = () => {
        // Fallback to listening state
        setCallState('LISTENING');
      };

      recognition.onend = () => {
        if (callState === 'LISTENING' && !isMicMuted) {
          try {
            recognition.start();
          } catch (_) {}
        }
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech recognition start failed:', e);
    }
  };

  const addAiTurn = (text: string) => {
    setTranscript(prev => [
      ...prev,
      { role: 'ai', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }
    ]);
  };

  const addClientTurn = (text: string) => {
    setTranscript(prev => [
      ...prev,
      { role: 'client', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }
    ]);
  };

  const handleClientSpeech = async (speechText: string) => {
    if (!speechText.trim() || !lead) return;
    addClientTurn(speechText);
    setCallState('THINKING');

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (_) {}
    }

    try {
      const historyTurns = transcript.map(t => ({ role: t.role, text: t.text }));
      const res = await fetch('/api/leads/voice-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          speechText,
          history: historyTurns
        })
      });

      const data = await res.json();
      const aiResponseText = data.text || `Understood. For ${lead.name}, our automated reconciliation matches purchase orders against vendor invoices in under 3 seconds.`;

      if (data.bookMeeting) {
        setMeetingBooked(true);
      }

      if (data.emailDispatched) {
        setEmailDispatchedInfo({
          subject: data.emailSubject || `ECONOS Flywheel Blueprint & Working Capital Audit: ${lead.name}`,
          body: data.emailBody || '',
          recipient: data.emailRecipient || lead.contactEmail || 'your email'
        });
      }

      addAiTurn(aiResponseText);
      setCallState('SPEAKING');

      speak(aiResponseText, () => {
        setCallState('LISTENING');
        if (!isMicMuted) {
          initSpeechRecognition();
        }
      });

      // Update call record
      if (activeCallId) {
        fetch(`/api/leads/calls/${activeCallId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'CONNECTED',
            durationSeconds: callDuration,
            meetingBooked: data.bookMeeting || meetingBooked,
            transcript: [...transcript, { role: 'client', text: speechText }, { role: 'ai', text: aiResponseText }]
          })
        }).catch(() => {});
      }
    } catch (err) {
      const fallbackText = `I hear you. For ${lead.name}, our autonomous AI CFO handles 3-way invoice matching and 90-day cash forecasting with zero deflection. Would you like me to send the complete breakdown to your email?`;
      addAiTurn(fallbackText);
      setCallState('SPEAKING');
      speak(fallbackText, () => {
        setCallState('LISTENING');
      });
    }
  };

  const handleDispatchFlywheelDirectly = async () => {
    if (!lead || isDispatchingDirect) return;
    setIsDispatchingDirect(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}/dispatch-flywheel-brief`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.email) {
        setEmailDispatchedInfo({
          subject: data.email.subject,
          body: data.email.body,
          recipient: data.lead?.contactEmail || lead.contactEmail
        });
        addAiTurn(`I have just dispatched the complete ECONOS Flywheel Blueprint & Working Capital Audit directly to ${data.lead?.contactEmail || lead.contactEmail}!`);
      }
    } catch (err) {
      console.warn('Failed to dispatch flywheel directly:', err);
    } finally {
      setIsDispatchingDirect(false);
    }
  };

  const handleManualSend = () => {
    if (!manualInput.trim()) return;
    const text = manualInput.trim();
    setManualInput('');
    handleClientSpeech(text);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    stopVoiceSession();
    if (activeCallId) {
      fetch(`/api/leads/calls/${activeCallId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'COMPLETED',
          durationSeconds: callDuration,
          meetingBooked
        })
      }).catch(() => {});
    }
    onCallEnded?.();
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const quickPrompts = [
    { label: '✉️ Send Email With Flywheel Details', text: 'Please send me an email detailing how ECONOS helps my business and how the flywheel works' },
    { label: '⚡ How Can ECONOS Help In Detail?', text: 'Can you explain in detail how ECONOS helps my business operations?' },
    { label: '🔄 Open The 4-Pillar Flywheel', text: 'Can you open the flywheel and explain the four core pillars?' },
    { label: '💰 Pricing & QuickBooks Integration', text: 'What is your pricing and how does it integrate with QuickBooks or NetSuite?' }
  ];

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden text-white relative max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${callState === 'ENDED' ? 'bg-rose-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${callState === 'ENDED' ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
              AI CFO Sovereign Voice Terminal • {formatDuration(callDuration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFlywheelModal(true)}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold flex items-center gap-1.5 transition"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inspect Flywheel</span>
            </button>

            <button
              onClick={handleEndCall}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Call Stage */}
        <div className="p-5 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950/70 to-slate-900 border-b border-slate-800/80">
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              {lead.name}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {lead.category} • {lead.city}, {lead.state} • ~{lead.monthlyInvoiceVolume || 250} invoices/mo
            </p>
          </div>

          {/* Animated Waveform / Avatar Sphere */}
          <div className="relative my-1 flex items-center justify-center w-28 h-28">
            {/* Pulsing Aura */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-700 ${
                callState === 'SPEAKING'
                  ? 'bg-emerald-500/20 scale-125 animate-pulse'
                  : callState === 'LISTENING'
                  ? 'bg-amber-500/20 scale-110 animate-pulse'
                  : callState === 'THINKING'
                  ? 'bg-purple-500/20 scale-115 animate-spin'
                  : 'bg-slate-700/20 scale-100'
              }`}
            />

            {/* Core Orb */}
            <div
              className={`relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl border-2 transition-all duration-300 ${
                callState === 'SPEAKING'
                  ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 border-emerald-300 shadow-emerald-500/20'
                  : callState === 'LISTENING'
                  ? 'bg-gradient-to-tr from-amber-600 to-yellow-400 border-amber-300 shadow-amber-500/20'
                  : callState === 'THINKING'
                  ? 'bg-gradient-to-tr from-purple-600 to-indigo-400 border-purple-300 shadow-purple-500/20'
                  : 'bg-slate-800 border-slate-600'
              }`}
            >
              <Bot className="w-7 h-7 text-white mb-0.5" />
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase">
                {callState}
              </span>
            </div>
          </div>

          {/* Real-time Frequency simulation bars */}
          <div className="flex items-center gap-1.5 h-4 mt-2">
            {[40, 70, 90, 60, 100, 80, 50, 95, 60, 40].map((h, i) => (
              <span
                key={i}
                style={{ height: callState === 'SPEAKING' || callState === 'LISTENING' ? `${h}%` : '20%' }}
                className={`w-1 rounded-full transition-all duration-150 ${
                  callState === 'SPEAKING'
                    ? 'bg-emerald-400'
                    : callState === 'LISTENING'
                    ? 'bg-amber-400'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Dispatched Flywheel Email Banner */}
          {emailDispatchedInfo && (
            <div className="mt-3 w-full px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 truncate">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">
                  <strong className="text-white">Flywheel Briefing Dispatched</strong> to <span className="underline text-emerald-300">{emailDispatchedInfo.recipient}</span>
                </span>
              </div>
              <button
                onClick={() => setShowEmailPreview(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shrink-0 transition"
              >
                <Mail className="w-3 h-3" />
                <span>View Email</span>
              </button>
            </div>
          )}

          {/* Meeting Booked Banner */}
          {meetingBooked && (
            <div className="mt-2 w-full px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>High Intent Detected • Founder Demo Walkthrough Queued!</span>
            </div>
          )}
        </div>

        {/* Live Conversation Transcript */}
        <div className="p-4 flex-1 max-h-52 overflow-y-auto space-y-3 font-mono text-xs bg-slate-950/40">
          {transcript.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                item.role === 'ai' ? 'items-start' : 'items-end'
              }`}
            >
              <span className="text-[10px] text-slate-500 mb-0.5">
                {item.role === 'ai' ? 'ECONOS AI CFO' : 'Client'} • {item.timestamp}
              </span>
              <div
                className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                  item.role === 'ai'
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-sm'
                    : 'bg-emerald-600 text-white rounded-tr-sm'
                }`}
              >
                {item.text}
              </div>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>

        {/* Quick Flywheel Questions (No Deflection, Instant Answer & Dispatch) */}
        <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-400 shrink-0 uppercase font-bold">Ask AI CFO:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleClientSpeech(qp.text)}
              disabled={callState === 'THINKING'}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono whitespace-nowrap border border-slate-700 transition disabled:opacity-40"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Manual Speech Input Fallback */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/50 flex items-center gap-2">
          <input
            type="text"
            value={manualInput}
            onChange={e => setManualInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleManualSend()}
            placeholder="Type your message ('Send me details in email', 'How does it help?')..."
            className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleManualSend}
            disabled={!manualInput.trim()}
            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Controls Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`p-3 rounded-full transition ${
                isMicMuted
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
              title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
            >
              {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                if (!isSpeakerMuted && synthRef.current) {
                  synthRef.current.cancel();
                }
                setIsSpeakerMuted(!isSpeakerMuted);
              }}
              className={`p-3 rounded-full transition ${
                isSpeakerMuted
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
              title={isSpeakerMuted ? 'Unmute Speaker' : 'Mute Speaker'}
            >
              {isSpeakerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleDispatchFlywheelDirectly}
              disabled={isDispatchingDirect}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition disabled:opacity-40"
              title="Dispatch bespoke Flywheel Blueprint email immediately"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isDispatchingDirect ? 'Sending...' : 'Email Blueprint'}</span>
            </button>
          </div>

          <button
            onClick={handleEndCall}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-lg shadow-rose-600/20"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call</span>
          </button>
        </div>

        {/* SUB-MODAL 1: Flywheel 4-Pillar Architecture Modal */}
        {showFlywheelModal && (
          <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col overflow-y-auto animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white font-mono">
                  The ECONOS Autonomous Flywheel Blueprint
                </h3>
              </div>
              <button
                onClick={() => setShowFlywheelModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-mono mb-4 leading-relaxed">
              ECONOS operates as a self-reinforcing financial operating system tailored to {lead.name} in {lead.city}. Zero gatekeeping, 100% autonomous execution.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">1</span>
                  Autonomous 3-Way Matching
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sub-3-second verification across purchase orders, receiving bills, and vendor line items. Eliminates {lead.cashFlowFriction.toLowerCase()}.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-blue-500/30">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px]">2</span>
                  90-Day Cash Sentinel
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Rolling daily treasury forecasts with automated payroll and tax reserve locks 30 days ahead of any pinch.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px]">3</span>
                  Working Capital Liberation
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Accelerated AR collections and dynamic capture of 2/10 Net-30 vendor discounts, freeing ~$140,000+ in liquidity annually.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/30">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px]">4</span>
                  Live AI CFO Stress-Testing
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Instant simulation of supplier defaults, inflation surges, and bank-grade lender reporting packages on demand.
                </p>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                onClick={handleDispatchFlywheelDirectly}
                disabled={isDispatchingDirect}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-lg shadow-emerald-900/30"
              >
                <Mail className="w-4 h-4" />
                <span>{isDispatchingDirect ? 'Dispatching...' : `Dispatch This Blueprint to ${lead.contactEmail || 'Client Inbox'}`}</span>
              </button>
              <button
                onClick={() => setShowFlywheelModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Return to Call
              </button>
            </div>
          </div>
        )}

        {/* SUB-MODAL 2: Email Preview Modal */}
        {showEmailPreview && emailDispatchedInfo && (
          <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col overflow-hidden animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-sm text-white font-mono">
                    Dispatched Flywheel Blueprint Email
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Delivered to: <span className="text-emerald-300 font-bold">{emailDispatchedInfo.recipient}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEmailPreview(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl mb-3 font-mono text-xs text-slate-300">
              <span className="text-slate-500">Subject: </span>
              <span className="font-bold text-white">{emailDispatchedInfo.subject}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-900/80 border border-slate-800 rounded-2xl font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {emailDispatchedInfo.body}
            </div>

            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={() => setShowEmailPreview(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
