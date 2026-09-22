import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  Phone, 
  Globe, 
  Send, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Mic, 
  X, 
  Layers, 
  Sliders, 
  ExternalLink 
} from 'lucide-react';
import { ScrapedLead } from '../../types/econos';

interface ProspectCfoPortalModalProps {
  lead: ScrapedLead | null;
  isOpen: boolean;
  onClose: () => void;
  onStartVoiceCall: (lead: ScrapedLead) => void;
  onStartPhoneCall: (lead: ScrapedLead) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export const ProspectCfoPortalModal: React.FC<ProspectCfoPortalModalProps> = ({
  lead,
  isOpen,
  onClose,
  onStartVoiceCall,
  onStartPhoneCall
}) => {
  const [activeTab, setActiveTab] = useState<'COPILOT' | 'SIMULATOR' | 'ROADMAP' | 'CALL_REQUEST'>('COPILOT');
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Simulation state
  const [monthlyInvoiceCount, setMonthlyInvoiceCount] = useState(250);
  const [avgInvoiceValue, setAvgInvoiceValue] = useState(4800);
  const [dsoDays, setDsoDays] = useState(48);

  // Call request state
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callRequestSubmitted, setCallRequestSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && lead) {
      setMonthlyInvoiceCount(lead.monthlyInvoiceVolume || 250);
      setCallbackPhone(lead.phone || '');
      setCallRequestSubmitted(false);

      // Initialize greeting
      setMessages([
        {
          role: 'assistant',
          content: `Welcome to your tailored ECONOS Treasury Portal, ${lead.name}! I am your AI CFO Copilot, pre-configured with financial intelligence for ${lead.category} operations in ${lead.city}.\n\nI can model your working capital, explain how our autonomous 3-way invoice matching resolves ${lead.cashFlowFriction.toLowerCase()}, or walk you through our 2026 Implementation Roadmap. What would you like to explore?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen, lead]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !lead) return;
    const userText = inputMessage.trim();
    setInputMessage('');

    const newMsgs: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setMessages(newMsgs);
    setIsTyping(true);

    try {
      const history = newMsgs.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/leads/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          message: userText,
          history
        })
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply || `Thank you. For ${lead.name}, ECONOS connects directly to your accounts to eliminate reconciliation lag and keep your 90-day cash position fully visible. Would you like to speak to our AI CFO via live voice call right now?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `ECONOS delivers automated 3-way invoice matching, daily treasury forecasting, and working capital optimization. You can start a live voice call using the button above to speak with me directly.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRequestCallback = () => {
    if (!lead || !callbackPhone.trim()) return;
    setCallRequestSubmitted(true);
    onStartPhoneCall(lead);
  };

  // Calculations for Working Capital simulation
  const annualBillings = monthlyInvoiceCount * avgInvoiceValue * 12;
  const currentReceivablesLocked = (annualBillings / 365) * dsoDays;
  const optimizedDsoDays = Math.max(22, dsoDays - 16);
  const optimizedReceivablesLocked = (annualBillings / 365) * optimizedDsoDays;
  const capitalFreedUp = currentReceivablesLocked - optimizedReceivablesLocked;
  const manualHoursSavedMonthly = Math.round(monthlyInvoiceCount * 0.22);

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Prospect Branding Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                VERIFIED GOOGLE MAPS PROFILE
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {lead.rating}★ ({lead.reviewCount} reviews)
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              {lead.name}
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5 flex items-center gap-2">
              <span>{lead.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {lead.address}, {lead.city}, {lead.state}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartVoiceCall(lead)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Talk to AI CFO (Voice)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-5 gap-4 overflow-x-auto text-xs font-mono">
          {[
            { id: 'COPILOT', label: 'AI CFO Copilot (Live Chat)', icon: Bot },
            { id: 'SIMULATOR', label: 'Cash & Working Capital Simulator', icon: Sliders },
            { id: 'ROADMAP', label: '2026 Implementation Roadmap', icon: Calendar },
            { id: 'CALL_REQUEST', label: 'Request Phone Call', icon: PhoneCall }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap font-bold ${
                  isActive
                    ? 'border-emerald-600 text-emerald-800 bg-white/60 px-2'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50/40">
          {/* TAB 1: AI CFO COPILOT CHAT */}
          {activeTab === 'COPILOT' && (
            <div className="flex flex-col h-[520px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-3 bg-emerald-50/70 border-b border-emerald-100 text-xs font-mono text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">ECONOS Autonomous Commercial Advisor</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Tailored to {lead.name}
                  </span>
                </div>
                <button
                  onClick={() => onStartVoiceCall(lead)}
                  className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  Switch to Voice Call
                </button>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      m.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 mb-0.5">
                      {m.role === 'user' ? 'You' : 'ECONOS AI CFO'} • {m.time}
                    </span>
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-sm'
                          : 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Bot className="w-4 h-4 animate-bounce text-emerald-600" />
                    <span>AI CFO is analyzing cash models...</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Ask about invoice lag, 3-way matching, or 2026 roadmap for ${lead.name}...`}
                  className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: WORKING CAPITAL SIMULATOR */}
          {activeTab === 'SIMULATOR' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base mb-1 font-mono flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  Autonomous Working Capital Acceleration Model
                </h3>
                <p className="text-xs text-slate-500 font-mono mb-6">
                  Interactive calibration based on {lead.name}'s volume ({lead.monthlyInvoiceVolume} monthly invoices)
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-700 font-mono block mb-2">
                      Monthly Invoice Volume: {monthlyInvoiceCount}
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={1200}
                      step={25}
                      value={monthlyInvoiceCount}
                      onChange={e => setMonthlyInvoiceCount(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                    <span className="text-[10px] text-slate-400 font-mono">50 to 1,200 invoices/mo</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 font-mono block mb-2">
                      Average Invoice Value: ${avgInvoiceValue.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={1000}
                      max={25000}
                      step={500}
                      value={avgInvoiceValue}
                      onChange={e => setAvgInvoiceValue(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                    <span className="text-[10px] text-slate-400 font-mono">$1,000 to $25,000 per invoice</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 font-mono block mb-2">
                      Current DSO (Days Sales Outstanding): {dsoDays} days
                    </label>
                    <input
                      type="range"
                      min={30}
                      max={90}
                      step={2}
                      value={dsoDays}
                      onChange={e => setDsoDays(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                    <span className="text-[10px] text-slate-400 font-mono">Payment remittance lag</span>
                  </div>
                </div>
              </div>

              {/* Simulation Output Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[11px] text-emerald-800 block font-bold">
                    Projected Cash Unlocked
                  </span>
                  <span className="text-2xl font-bold text-emerald-950 mt-1 block">
                    +${Math.round(capitalFreedUp).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-700 mt-1 block">
                    Direct working capital liberated from collections lag
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800">
                  <span className="text-[11px] text-slate-300 block font-bold">
                    Labor Hours Eliminated
                  </span>
                  <span className="text-2xl font-bold text-emerald-400 mt-1 block">
                    {manualHoursSavedMonthly} hrs/mo
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Automated 3-way invoice matching & ERP sync
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[11px] text-amber-900 block font-bold">
                    Target DSO Acceleration
                  </span>
                  <span className="text-2xl font-bold text-amber-950 mt-1 block">
                    {optimizedDsoDays} days (-16d)
                  </span>
                  <span className="text-[10px] text-amber-700 mt-1 block">
                    Automated client reminders & early payment incentives
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-mono">Ready to activate this for {lead.name}?</h4>
                  <p className="text-[11px] text-slate-500 font-mono">We can connect your bank feed and accounting in under 15 minutes.</p>
                </div>
                <button
                  onClick={() => onStartVoiceCall(lead)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-2"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Discuss With AI CFO</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ROADMAP & 10 SOLUTIONS */}
          {activeTab === 'ROADMAP' && (
            <div className="space-y-5 font-mono">
              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  2026 COMMERCIAL EXPANSION BLUEPRINT
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  ECONOS: The $10B Sovereign AI CFO & Treasury Intelligence Stack
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  We are building the definitive operating system for mid-market commercial enterprise finance. Here is how our 10 core solutions roll out to your team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    quarter: 'Q1 2026',
                    name: 'Autonomous 3-Way Invoice Reconciliation',
                    desc: 'Instant PO to vendor invoice matching, error reconciliation, and automated AP approvals without human data entry.',
                    status: 'LIVE IN PRODUCTION'
                  },
                  {
                    quarter: 'Q2 2026',
                    name: 'Predictive 90-Day Cash Burn & DSO Compression',
                    desc: 'Real-time multi-account treasury aggregation, working capital optimization, and intelligent payment collection pacing.',
                    status: 'ROLLING OUT'
                  },
                  {
                    quarter: 'Q3 2026',
                    name: 'Automated Voice Telephony AI Agents',
                    desc: 'Real-time autonomous phone and web voice bridge for vendor inquiries, invoice disputes, and customer collections.',
                    status: 'INTEGRATED'
                  },
                  {
                    quarter: 'Q4 2026',
                    name: 'Continuous ASC 606 & Multi-Entity Audit Trail',
                    desc: 'Self-closing books at midnight daily with automated GAAP compliance, tax accruals, and sovereign audit verification.',
                    status: 'SCHEDULED'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.quarter}
                      </span>
                      <span className="text-[10px] text-slate-500">{item.status}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CALL REQUEST */}
          {activeTab === 'CALL_REQUEST' && (
            <div className="max-w-md mx-auto py-6 space-y-4 font-mono">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Request an Instant Automated Call
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your direct phone number below. Our automated voice AI CFO will ring your phone in 10 seconds to discuss {lead.name}'s cash optimization.
                </p>

                <div className="space-y-2 text-left pt-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    value={callbackPhone}
                    onChange={e => setCallbackPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-slate-50"
                    placeholder="+1 (xxx) xxx-xxxx"
                  />
                </div>

                <button
                  onClick={handleRequestCallback}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call My Phone Now</span>
                </button>

                {callRequestSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 text-left">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dialing carrier SIP trunk... Your phone will ring momentarily!</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">
            ECONOS Sovereign Intelligence • Dedicated Session ID: {lead.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
