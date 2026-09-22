import React, { useState, useEffect } from 'react';
import { Mail, Send, Sparkles, ExternalLink, CheckCircle2, RefreshCw, X, AlertCircle, Eye, Building2, MapPin, Star } from 'lucide-react';
import { ScrapedLead } from '../../types/econos';

interface OutboundEmailModalProps {
  lead: ScrapedLead | null;
  isOpen: boolean;
  onClose: () => void;
  onEmailSent: (updatedLead: ScrapedLead) => void;
  onOpenProspectPortal: (lead: ScrapedLead) => void;
}

export const OutboundEmailModal: React.FC<OutboundEmailModalProps> = ({
  lead,
  isOpen,
  onClose,
  onEmailSent,
  onOpenProspectPortal
}) => {
  const [focus, setFocus] = useState('ROADMAP_AND_AI_CFO');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (isOpen && lead) {
      handleGenerate(focus);
    } else {
      setStatusMessage(null);
    }
  }, [isOpen, lead]);

  const handleGenerate = async (selectedFocus: string) => {
    if (!lead) return;
    setIsGenerating(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/leads/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, focus: selectedFocus })
      });
      if (!res.ok) throw new Error('Failed to generate draft');
      const data = await res.json();
      setSubject(data.subject || '');
      setBody(data.body || '');
    } catch (e: any) {
      // Fallback
      setSubject(`Financial workflow observation for ${lead.name} (${lead.city})`);
      setBody(`Hi ${lead.name} Team,

I came across your profile while evaluating top-rated ${lead.category} businesses in ${lead.city} (congratulations on maintaining ${lead.rating}★ across ${lead.reviewCount} customer reviews).

In high-velocity operations like yours, managing ${lead.cashFlowFriction.toLowerCase()} often locks up substantial working capital and burns 15+ hours weekly on manual invoice reconciliations.

We have built ECONOS: An autonomous AI CFO Copilot & Daily Treasury Intelligence platform. We recently published our 2026 Implementation Roadmap and 10 Enterprise Solutions for commercial businesses.

I've initialized a tailored, interactive session pre-configured for ${lead.name}'s volume:
👉 Tailored AI CFO Session: [Private portal link will be provided upon deployment]

Inside the portal, you can:
1. Run an interactive 90-day cash flow & working capital simulation.
2. Review our full implementation roadmap.
3. Test our interactive Voice AI CFO agent directly in your browser or request an instant phone call.

Would you be open to exploring this for 5 minutes?

Best regards,
ECONOS Commercial Advisory Team`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!lead || !subject.trim() || !body.trim()) return;
    setIsSending(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/leads/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          subject,
          body
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to dispatch email');

      setStatusMessage({
        text: `Outbound email dispatched to ${data.lead?.contactEmail || lead.contactEmail}!`,
        type: 'success'
      });
      onEmailSent(data.lead || { ...lead, outreachStatus: 'EMAIL_SENT', lastEmailSentAt: new Date().toISOString() });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Error sending outbound message', type: 'error' });
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                Hyper-Personalized Outbound Dispatch
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  GEMINI 3.8 FLASH
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Target: {lead.name} • {lead.city}, {lead.state} ({lead.contactEmail})
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

        {/* Lead Context Snippet */}
        <div className="px-5 py-3 bg-amber-50/60 border-b border-amber-100 text-xs font-mono text-amber-900 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-bold">
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              {lead.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              {lead.rating}★ ({lead.reviewCount} reviews)
            </span>
            <span>•</span>
            <span className="text-amber-800">ICP: {lead.icpScore}/100</span>
          </div>
          <button
            onClick={() => onOpenProspectPortal(lead)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview Portal Link
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Angle Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 font-mono block mb-1.5">
              Outbound Angle & Value Proposition
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ROADMAP_AND_AI_CFO', label: 'Roadmap & AI CFO', desc: 'Implementation timeline & live copilot' },
                { id: 'WORKING_CAPITAL_FRICTION', label: '3-Way Match & DSO', desc: 'Accelerate payments & eliminate lag' },
                { id: 'DAILY_TREASURY_SAFEGUARD', label: 'Treasury & Margins', desc: 'Predictive 90d cash burn safeguard' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFocus(opt.id);
                    handleGenerate(opt.id);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition text-xs ${
                    focus === opt.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold block">{opt.label}</span>
                  <span className={`text-[10px] block truncate ${focus === opt.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 font-mono">
                Email Subject Line
              </label>
              <button
                onClick={() => handleGenerate(focus)}
                disabled={isGenerating}
                className="text-[11px] text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-mono font-medium disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                Regenerate with AI
              </button>
            </div>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
              placeholder="Email subject..."
            />
          </div>

          {/* Body */}
          <div>
            <label className="text-xs font-bold text-slate-700 font-mono block mb-1">
              Message Body (Personalized with Maps Intelligence)
            </label>
            <textarea
              rows={9}
              value={body}
              onChange={e => setBody(e.target.value)}
              className="w-full p-3 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 leading-relaxed"
              placeholder="Writing personalized email..."
            />
          </div>

          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 border ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="text-[11px] text-slate-500 font-mono">
            Direct to: <span className="font-bold text-slate-700">{lead.contactEmail}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSend}
              disabled={isSending || isGenerating || !subject.trim() || !body.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-2 transition disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Dispatching Outbound...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Outbound Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
