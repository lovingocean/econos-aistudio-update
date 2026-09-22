import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Sparkles, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Send, 
  PhoneCall, 
  Mic, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Sliders, 
  ExternalLink, 
  Eye, 
  Radio, 
  AlertTriangle,
  Bot,
  Compass,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { ScrapedLead, OutboundCallRecord } from '../../types/econos';
import { OutboundEmailModal } from './OutboundEmailModal';
import { LiveVoiceCallModal } from './LiveVoiceCallModal';
import { AutomatedPhoneDispatcherModal } from './AutomatedPhoneDispatcherModal';
import { ProspectCfoPortalModal } from './ProspectCfoPortalModal';

export const LeadDiscoveryWorkspace: React.FC = () => {
  // Leads state
  const [leads, setLeads] = useState<ScrapedLead[]>([]);
  const [calls, setCalls] = useState<OutboundCallRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScraping, setIsScraping] = useState(false);

  // Search parameters
  const [category, setCategory] = useState('Commercial HVAC & Mechanical');
  const [location, setLocation] = useState('Dallas, TX');
  const [scrapeLimit, setScrapeLimit] = useState(6);
  const [activeTab, setActiveTab] = useState<'LEADS' | 'CALL_LOGS' | 'WORKFLOW_EXPLAINER'>('LEADS');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals state
  const [selectedLeadForEmail, setSelectedLeadForEmail] = useState<ScrapedLead | null>(null);
  const [selectedLeadForVoice, setSelectedLeadForVoice] = useState<ScrapedLead | null>(null);
  const [selectedLeadForPhone, setSelectedLeadForPhone] = useState<ScrapedLead | null>(null);
  const [selectedLeadForPortal, setSelectedLeadForPortal] = useState<ScrapedLead | null>(null);

  useEffect(() => {
    fetchLeads();
    fetchCalls();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (e) {
      console.warn('Failed to fetch leads:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCalls = async () => {
    try {
      const res = await fetch('/api/leads/calls/history');
      if (res.ok) {
        const data = await res.json();
        setCalls(data);
      }
    } catch (e) {
      console.warn('Failed to fetch call history:', e);
    }
  };

  const handleRunMapsScraper = async () => {
    if (!category || !location) return;
    setIsScraping(true);
    try {
      const res = await fetch('/api/leads/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          location,
          limit: scrapeLimit
        })
      });
      if (res.ok) {
        await fetchLeads();
      }
    } catch (err) {
      console.error('Maps scraping error:', err);
    } finally {
      setIsScraping(false);
    }
  };

  const handleLeadEmailSent = (updatedLead: ScrapedLead) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  const handleCallFinished = () => {
    fetchLeads();
    fetchCalls();
  };

  // Metrics
  const totalLeads = leads.length;
  const emailsSent = leads.filter(l => ['EMAIL_SENT', 'CLICKED', 'IN_CHAT', 'VOICE_CALLED', 'CONVERTED'].includes(l.outreachStatus)).length;
  const voiceCallsMade = leads.reduce((sum, l) => sum + (l.callCount || 0), 0) + calls.length;
  const highIcpCount = leads.filter(l => l.icpScore >= 88).length;
  const conversions = leads.filter(l => l.outreachStatus === 'CONVERTED').length;

  const filteredLeads = filterStatus === 'ALL'
    ? leads
    : leads.filter(l => l.outreachStatus === filterStatus);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Overview of the Complete Automated Acquisition Loop */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700/60 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                GOOGLE MAPS SCRAPER KIT + OUTBOUND AI VOICE
              </span>
              <span className="text-slate-400 text-xs font-mono">• 2026 ROADMAP AUTOMATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Autonomous Client Acquisition Engine
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-mono">
              Scrape high-revenue commercial businesses from Google Maps, generate hyper-personalized outbound emails featuring our 2026 Implementation Roadmap, connect them via live interactive AI CFO Copilot, and trigger automated phone/voice calls on demand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('WORKFLOW_EXPLAINER')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold flex items-center gap-2 border border-slate-700 transition"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>How It Finds Clients Automatically</span>
            </button>

            <button
              onClick={handleRunMapsScraper}
              disabled={isScraping}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isScraping ? 'animate-spin' : ''}`} />
              <span>{isScraping ? 'Scraping Google Maps...' : 'Run Maps Scraper Kit'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 block">Total Scraped Leads</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalLeads}</span>
          <span className="text-[10px] text-emerald-600 mt-0.5 block font-bold">Google Maps Verified</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 block">High ICP Matches (&gt;88)</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{highIcpCount}</span>
          <span className="text-[10px] text-emerald-600 mt-0.5 block font-bold">High Net-Cash Potential</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 block">Roadmap Emails Dispatched</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{emailsSent}</span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Delivered with portal links</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-500 block">AI Voice Calls Engaged</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">{voiceCallsMade}</span>
          <span className="text-[10px] text-amber-700 mt-0.5 block font-bold">Telephony + Web Speech</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
          <span className="text-[11px] text-slate-500 block">Founder Walkthroughs</span>
          <span className="text-2xl font-bold text-emerald-600 mt-1 block">{conversions}</span>
          <span className="text-[10px] text-emerald-700 mt-0.5 block font-bold">Qualified Prospects</span>
        </div>
      </div>

      {/* Google Maps Scraper Kit Controls Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-700">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">
                Google Maps Lead Scraper Kit Search Parameters
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Harvest realistic local businesses with ratings, reviews, phone numbers, and cash flow pain points
              </p>
            </div>
          </div>

          {/* Quick Location Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
            <span className="text-slate-400 text-[10px]">Quick Geo:</span>
            {['Dallas, TX', 'Chicago, IL', 'Austin, TX', 'Atlanta, GA', 'Phoenix, AZ'].map(city => (
              <button
                key={city}
                onClick={() => setLocation(city)}
                className={`px-2 py-0.5 rounded-lg border transition ${
                  location === city
                    ? 'bg-slate-900 text-white border-slate-900 font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {city.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 font-mono text-xs">
          {/* Category Input */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-slate-700 font-bold block">Business Category / Niche</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50"
            >
              <option value="Commercial HVAC & Mechanical">Commercial HVAC & Mechanical</option>
              <option value="Logistics & Freight Forwarding">Logistics & Freight Forwarding</option>
              <option value="Healthcare & Specialized Clinics">Healthcare & Specialized Clinics</option>
              <option value="Wholesale Food Distribution">Wholesale Food Distribution</option>
              <option value="Commercial Roofing & Renewable Systems">Commercial Roofing & Renewable Systems</option>
              <option value="Commercial Electrical Contractors">Commercial Electrical Contractors</option>
              <option value="Precision Machine Shops">Precision Machine Shops</option>
            </select>
          </div>

          {/* Location Input */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-slate-700 font-bold block">Location (City, State / ZIP)</label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Dallas, TX or Chicago, IL"
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50"
              />
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Target Count */}
          <div className="sm:col-span-1 space-y-1">
            <label className="text-slate-700 font-bold block">Limit</label>
            <select
              value={scrapeLimit}
              onChange={e => setScrapeLimit(Number(e.target.value))}
              className="w-full px-2 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50 text-center"
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
            </select>
          </div>

          {/* Scrape Trigger Button */}
          <div className="sm:col-span-2 flex items-end">
            <button
              onClick={handleRunMapsScraper}
              disabled={isScraping}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-50 shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isScraping ? 'Extracting...' : 'Scrape Maps'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 font-mono text-xs pb-1">
        <div className="flex items-center gap-3">
          {[
            { id: 'LEADS', label: `Discovered Businesses (${leads.length})` },
            { id: 'CALL_LOGS', label: `Telephony & Voice Logs (${calls.length})` },
            { id: 'WORKFLOW_EXPLAINER', label: 'Automated Acquisition Blueprint' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-3 rounded-lg font-bold transition ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'LEADS' && (
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 font-mono text-[11px]"
            >
              <option value="ALL">All Statuses</option>
              <option value="NOT_CONTACTED">Not Contacted</option>
              <option value="EMAIL_SENT">Email Sent</option>
              <option value="CLICKED">Clicked Portal</option>
              <option value="VOICE_CALLED">Voice Called</option>
              <option value="CONVERTED">Walkthrough Booked</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: LEADS GRID & CARDS */}
      {activeTab === 'LEADS' && (
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 bg-white font-mono space-y-3">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">No businesses match the current filter</h4>
              <p className="text-xs text-slate-500">Run the Google Maps scraper above to harvest new verified businesses.</p>
              <button
                onClick={handleRunMapsScraper}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold font-mono"
              >
                Run Maps Scraper Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredLeads.map(lead => {
                const isContacted = lead.outreachStatus !== 'NOT_CONTACTED';
                return (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5 font-mono text-xs transition hover:shadow-md hover:border-slate-300"
                  >
                    {/* Top Row: Business Identity & Rating */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{lead.name}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            lead.outreachStatus === 'CONVERTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : lead.outreachStatus === 'VOICE_CALLED'
                              ? 'bg-amber-100 text-amber-800'
                              : lead.outreachStatus === 'EMAIL_SENT'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {lead.outreachStatus.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <span>{lead.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-amber-700">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                            {lead.rating}★ ({lead.reviewCount} reviews)
                          </span>
                        </p>
                      </div>

                      {/* ICP Score */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 block">ICP Fit Score</span>
                        <span className={`text-base font-bold ${
                          lead.icpScore >= 90 ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {lead.icpScore}/100
                        </span>
                      </div>
                    </div>

                    {/* Contact details */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-[11px] text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[280px]">{lead.address}</span>
                        </span>
                        <span className="text-slate-400 font-bold">{lead.priceLevel}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{lead.phone}</span>
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-700 font-medium">{lead.contactEmail}</span>
                        </span>
                      </div>
                    </div>

                    {/* Identified Financial Friction point */}
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                      <span className="font-bold block text-amber-950 mb-0.5">Identified Cash Flow Drag:</span>
                      {lead.cashFlowFriction}
                    </div>

                    {/* Operational Estimates */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Est. Annual Revenue:</span>
                        <span className="font-bold text-slate-800">{lead.estimatedRevenueRange}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Monthly Invoice Volume:</span>
                        <span className="font-bold text-slate-800">{lead.monthlyInvoiceVolume} invoices/mo</span>
                      </div>
                    </div>

                    {/* Interactive Actions Grid */}
                    <div className="pt-2 border-t border-slate-100 grid grid-cols-4 gap-2 text-[11px]">
                      {/* Action 1: Draft Email */}
                      <button
                        onClick={() => setSelectedLeadForEmail(lead)}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold flex flex-col items-center justify-center gap-1 transition text-center"
                        title="Draft email with 2026 Roadmap link"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-[10px]">Draft Email</span>
                      </button>

                      {/* Action 2: Client Portal */}
                      <button
                        onClick={() => setSelectedLeadForPortal(lead)}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold flex flex-col items-center justify-center gap-1 transition text-center"
                        title="Preview client's personalized AI CFO Copilot portal"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px]">Client Portal</span>
                      </button>

                      {/* Action 3: Live Voice Call */}
                      <button
                        onClick={() => setSelectedLeadForVoice(lead)}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold flex flex-col items-center justify-center gap-1 transition text-center"
                        title="Initiate interactive voice dialogue via browser"
                      >
                        <Mic className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px]">Voice Agent</span>
                      </button>

                      {/* Action 4: Automated Phone Call */}
                      <button
                        onClick={() => setSelectedLeadForPhone(lead)}
                        className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold flex flex-col items-center justify-center gap-1 transition text-center"
                        title="Trigger automated phone call to prospect"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-[10px]">Phone Call</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CALL LOGS */}
      {activeTab === 'CALL_LOGS' && (
        <div className="space-y-4 font-mono text-xs">
          {calls.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
              <PhoneCall className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">No phone or voice calls recorded yet</h4>
              <p className="text-slate-500 text-xs">Trigger a live voice call or automated outbound call from any lead card above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {calls.map(call => (
                <div key={call.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                        <Phone className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{call.leadName}</h4>
                        <p className="text-[11px] text-slate-500">
                          {call.phone} • {call.callType.replace(/_/g, ' ')} • {new Date(call.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        call.meetingBooked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {call.meetingBooked ? 'WALKTHROUGH BOOKED' : call.status}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1 font-bold">
                        Duration: {Math.floor(call.durationSeconds / 60)}m {call.durationSeconds % 60}s
                      </span>
                    </div>
                  </div>

                  {call.transcript && call.transcript.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-[11px] space-y-1.5 max-h-40 overflow-y-auto">
                      <span className="text-[10px] text-slate-400 font-bold block mb-1">
                        Call Speech Transcript:
                      </span>
                      {call.transcript.map((t, i) => (
                        <div key={i} className="flex gap-2">
                          <span className={`font-bold shrink-0 ${t.role === 'ai' ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {t.role === 'ai' ? 'AI CFO:' : 'Client:'}
                          </span>
                          <span className="text-slate-300">{t.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: HOW IT FINDS CLIENTS AUTOMATICALLY */}
      {activeTab === 'WORKFLOW_EXPLAINER' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 font-mono text-xs">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              AUTONOMOUS B2B REVENUE FLYWHEEL
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              How the System Discovers, Qualifies, and Converts Clients Automatically
            </h3>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Here is the exact step-by-step pipeline running inside ECONOS to turn Google Maps business data into booked client walkthroughs and daily treasury subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Google Maps Lead Scraper Kit',
                desc: 'Queries real-time commercial businesses based on geographic coordinates and high-margin B2B niches (HVAC, freight, healthcare, food distributors). Scrapes verified business names, telephone numbers, websites, star ratings, and review velocity.'
              },
              {
                step: '02',
                title: 'Financial Friction Profiling',
                desc: 'Gemini evaluates each business profile to infer cash flow vulnerabilities: 3-way invoice matching delays, Net-45 receivables lockup, or lack of 90-day cash burn visibility. Computes an Ideal Customer Profile (ICP) match score.'
              },
              {
                step: '03',
                title: 'Personalized Roadmap Emails',
                desc: 'Generates tailored outbound emails referencing their specific review count and location. Outlines our 2026 Implementation Roadmap and embeds an instant interactive portal link pre-configured for their company volume.'
              },
              {
                step: '04',
                title: 'Automated Voice & Telephony Agent',
                desc: 'When the prospect visits the portal or requests a call, our voice AI agent talks directly to them in their browser or dials their phone automatically. Explains invoice automation, answers objections, and locks in founder demos.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-2xl font-bold text-emerald-600 block">{item.step}</span>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-white">Ready to harvest leads in your target territory?</h4>
              <p className="text-[11px] text-slate-400">Specify your target location and category to discover immediate high-volume prospects.</p>
            </div>
            <button
              onClick={() => setActiveTab('LEADS')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0"
            >
              View Scraped Leads
            </button>
          </div>
        </div>
      )}

      {/* MODALS */}
      {/* 1. Outbound Email Modal */}
      <OutboundEmailModal
        lead={selectedLeadForEmail}
        isOpen={Boolean(selectedLeadForEmail)}
        onClose={() => setSelectedLeadForEmail(null)}
        onEmailSent={handleLeadEmailSent}
        onOpenProspectPortal={lead => {
          setSelectedLeadForEmail(null);
          setSelectedLeadForPortal(lead);
        }}
      />

      {/* 2. Prospect Portal Modal */}
      <ProspectCfoPortalModal
        lead={selectedLeadForPortal}
        isOpen={Boolean(selectedLeadForPortal)}
        onClose={() => setSelectedLeadForPortal(null)}
        onStartVoiceCall={lead => {
          setSelectedLeadForPortal(null);
          setSelectedLeadForVoice(lead);
        }}
        onStartPhoneCall={lead => {
          setSelectedLeadForPortal(null);
          setSelectedLeadForPhone(lead);
        }}
      />

      {/* 3. Live Browser Voice Call Modal */}
      <LiveVoiceCallModal
        lead={selectedLeadForVoice}
        isOpen={Boolean(selectedLeadForVoice)}
        onClose={() => setSelectedLeadForVoice(null)}
        onCallEnded={handleCallFinished}
      />

      {/* 4. Automated Phone Telephony Dispatcher */}
      <AutomatedPhoneDispatcherModal
        lead={selectedLeadForPhone}
        isOpen={Boolean(selectedLeadForPhone)}
        onClose={() => setSelectedLeadForPhone(null)}
        onCallDispatched={handleCallFinished}
      />
    </div>
  );
};
