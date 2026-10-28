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
  Filter,
  Copy,
  Check,
  Share2,
  MessageSquare,
  Plus
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
  const [activeTab, setActiveTab] = useState<'LEADS' | 'CALL_LOGS' | 'WORKFLOW_EXPLAINER' | 'SOCIAL_MEDIA_TACTICS'>('LEADS');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  // Manual Social Lead Add Form
  const [socialLeadName, setSocialLeadName] = useState('');
  const [socialLeadCategory, setSocialLeadCategory] = useState('Commercial HVAC & Mechanical');
  const [socialLeadLocation, setSocialLeadLocation] = useState('Dallas, TX');
  const [socialLeadContact, setSocialLeadContact] = useState('');
  const [socialLeadPlatform, setSocialLeadPlatform] = useState<'LINKEDIN' | 'FACEBOOK' | 'INSTAGRAM'>('LINKEDIN');

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

  const handleCopyScript = (scriptId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(scriptId);
    setTimeout(() => setCopiedScriptId(null), 2500);
  };

  const handleAddSocialLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialLeadName.trim()) return;

    const newLead: ScrapedLead = {
      id: `lead_social_${Date.now()}`,
      name: socialLeadName.trim(),
      category: socialLeadCategory,
      location: socialLeadLocation,
      address: `${socialLeadLocation} (Sourced via ${socialLeadPlatform})`,
      city: socialLeadLocation.split(',')[0],
      state: socialLeadLocation.split(',')[1]?.trim() || 'TX',
      zip: '75001',
      phone: '+1 (555) 000-0000',
      website: socialLeadContact.startsWith('http') ? socialLeadContact : `https://linkedin.com/search`,
      rating: 4.8,
      reviewCount: 42,
      status: 'OPERATIONAL',
      priceLevel: '$$$',
      openingHours: 'Mon-Fri 7:00 AM - 6:00 PM',
      estimatedRevenueRange: '$4.5M - $9.0M',
      monthlyInvoiceVolume: 280,
      icpScore: 92,
      cashFlowFriction: 'Retainage holdbacks on commercial construction and manual AIA billing cycles',
      contactEmail: socialLeadContact.includes('@') ? socialLeadContact : 'executive@contractor.internal',
      outreachStatus: 'NOT_CONTACTED',
      callCount: 0,
      tags: [`Sourced via ${socialLeadPlatform}`, 'High Margin ICP', 'Social Discovery']
    };

    setLeads(prev => [newLead, ...prev]);
    setSocialLeadName('');
    setSocialLeadContact('');
    setActiveTab('LEADS');
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
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'LEADS', label: `🏢 Discovered Businesses (${leads.length})` },
            { id: 'CALL_LOGS', label: `📋 Verification Logs (${calls.length})` },
            { id: 'SOCIAL_MEDIA_TACTICS', label: '📱 Social Media Prospecting Playbook' },
            { id: 'WORKFLOW_EXPLAINER', label: '📐 Acquisition Architecture' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-3 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
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
              <option value="VOICE_CALLED">Called / Contacted</option>
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

      {/* 4. Social Media Prospecting Playbook Tab */}
      {activeTab === 'SOCIAL_MEDIA_TACTICS' && (
        <div className="space-y-6 font-mono text-xs animate-in fade-in">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/50 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Share2 className="w-4 h-4" />
              <span>B2B SOCIAL PROSPECTING ENGINE • LINKEDIN &amp; TRADE COMMUNITIES</span>
            </div>
            <h3 className="text-xl font-black text-white font-sans">
              How to Sign $1,490 – $4,850/mo Commercial Contractors via Social Media
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed max-w-3xl font-sans">
              Commercial contractor owners, CFOs, and controllers are highly active on LinkedIn and private Facebook trade groups. Use these proven boolean search strings and direct message hooks to book 15+ qualified demos per month without spending a dollar on ads.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* TACTIC 1: LINKEDIN SALES NAVIGATOR */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-bold">in</span>
                    <h4 className="font-bold text-slate-900 font-sans text-sm">
                      LinkedIn Executive Search &amp; 3-Touch InMail Sequence (75% Close Rate)
                    </h4>
                  </div>
                  <span className="text-[10px] text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full font-bold">
                    Primary Sourcing Channel
                  </span>
                </div>

                {/* Boolean Search String */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 text-[11px] font-bold block">
                    1. LinkedIn Search Query (Copy &amp; Paste in LinkedIn Search Bar):
                  </span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-slate-800 text-[11px] select-all">
                    <code>title:("Owner" OR "CFO" OR "President" OR "Controller") AND industry:"Construction" AND ("HVAC" OR "Mechanical" OR "Electrical" OR "Roofing") AND location:"United States"</code>
                    <button
                      type="button"
                      onClick={() => handleCopyScript('bool-1', 'title:("Owner" OR "CFO" OR "President" OR "Controller") AND industry:"Construction" AND ("HVAC" OR "Mechanical" OR "Electrical" OR "Roofing") AND location:"United States"')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      {copiedScriptId === 'bool-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScriptId === 'bool-1' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* InMail Template 1 */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs font-sans">
                      Template A: The Retainage Pain Hook (Highest Response Rate)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyScript('inmail-1', 'Hey [Name], saw your team just completed the mechanical work on the [Project Name] job. Quick question: are you guys dealing with the standard 10% retainage withhold ($200k+) from the GC? We built ECONOS so commercial trade contractors get same-day advance liquidity and §179D energy deductions ($5.65/sq.ft.) on those exact contracts. Open to taking a look at a 2-min interactive walkthrough?')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedScriptId === 'inmail-1' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedScriptId === 'inmail-1' ? 'Copied' : 'Copy Template'}</span>
                    </button>
                  </div>
                  <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-[11px] leading-relaxed font-sans">
                    "Hey [Name], saw your team just completed the mechanical work on the [Project Name] job. Quick question: are you guys dealing with the standard 10% retainage withhold ($200k+) from the GC? We built ECONOS so commercial trade contractors get same-day advance liquidity and §179D energy deductions ($5.65/sq.ft.) on those exact contracts. Open to taking a look at a 2-min interactive walkthrough?"
                  </p>
                </div>

                {/* InMail Template 2 */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs font-sans">
                      Template B: The Procore / Software Cost Slayer
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyScript('inmail-2', 'Hey [Name], noticed you guys run commercial operations in [City]. Most subs we talk to are fed up paying Procore $35k/year just to send AIA G702 billing and chase lien waivers. We condensed full AIA progress billing, 50-state statutory waivers, and factoring into a flat $1,490/mo platform. Happy to send you a sandbox link if you\'d like to test it.')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedScriptId === 'inmail-2' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedScriptId === 'inmail-2' ? 'Copied' : 'Copy Template'}</span>
                    </button>
                  </div>
                  <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-[11px] leading-relaxed font-sans">
                    "Hey [Name], noticed you guys run commercial operations in [City]. Most subs we talk to are fed up paying Procore $35k/year just to send AIA G702 billing and chase lien waivers. We condensed full AIA progress billing, 50-state statutory waivers, and factoring into a flat $1,490/mo platform. Happy to send you a sandbox link if you'd like to test it."
                  </p>
                </div>
              </div>

              {/* TACTIC 2: FACEBOOK TRADE GROUPS */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold">f</span>
                    <h4 className="font-bold text-slate-900 font-sans text-sm">
                      Facebook Trade Communities (Inbound Inquiries Machine)
                    </h4>
                  </div>
                  <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full font-bold">
                    100,000+ Trade Members
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-slate-600 font-sans text-xs">
                    Join these high-volume private trade groups: <strong className="text-slate-900">Commercial Subcontractors United (22k members)</strong>, <strong className="text-slate-900">HVAC Commercial &amp; Industrial Masters (38k members)</strong>, and <strong className="text-slate-900">Commercial Roofing Pros USA</strong>.
                  </p>
                  
                  <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-indigo-950 text-xs font-sans">The "Retainage Trap" Group Post Template:</span>
                      <button
                        type="button"
                        onClick={() => handleCopyScript('fb-post', 'PSA for commercial trade subs dealing with GCs dragging out retainage: If the GC is withholding your final 10% past substantial completion, make sure you don\'t sign an unconditional lien waiver until funds hit escrow. We put together a free 50-State Statutory Lien Waiver & Retainage Guide. Drop a comment below and I\'ll DM you the free cheat sheet.')}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1 cursor-pointer text-[10px]"
                      >
                        {copiedScriptId === 'fb-post' ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                        <span>Copy Post</span>
                      </button>
                    </div>
                    <p className="text-slate-700 font-sans text-[11px] italic">
                      "PSA for commercial trade subs dealing with GCs dragging out retainage: If the GC is withholding your final 10% past substantial completion, make sure you don't sign an unconditional lien waiver until funds hit escrow. We put together a free 50-State Statutory Lien Waiver &amp; Retainage Guide. Drop a comment below and I'll DM you the free cheat sheet."
                    </p>
                    <p className="text-[10px] text-slate-500 font-sans">
                      Result: Contractors comment "Send it to me!" — you reply in DM with your live ECONOS sandbox demo link!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* MANUAL QUICK INGEST: ADD SOCIAL LEAD DIRECTLY TO PIPELINE */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-slate-900 font-sans text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-600" />
                    <span>Quick-Add Social Lead</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans pt-1">
                    Found a contractor on LinkedIn or Facebook? Add them directly to your live acquisition pipeline.
                  </p>
                </div>

                <form onSubmit={handleAddSocialLead} className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="text-slate-600 block mb-1">Company / Contractor Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="Trident Mechanical Services"
                      value={socialLeadName}
                      onChange={e => setSocialLeadName(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-sans text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1">Sourced From:</label>
                    <select
                      value={socialLeadPlatform}
                      onChange={e => setSocialLeadPlatform(e.target.value as any)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-sans text-slate-900"
                    >
                      <option value="LINKEDIN">LinkedIn Sales Navigator / InMail</option>
                      <option value="FACEBOOK">Facebook Trade Group Discussion</option>
                      <option value="INSTAGRAM">Instagram / Video DM</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1">Trade Classification:</label>
                    <select
                      value={socialLeadCategory}
                      onChange={e => setSocialLeadCategory(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-sans text-slate-900"
                    >
                      <option value="Commercial HVAC & Mechanical">Commercial HVAC &amp; Mechanical</option>
                      <option value="Commercial Electrical Systems">Commercial Electrical &amp; High Voltage</option>
                      <option value="Commercial Plumbing & Piping">Commercial Plumbing &amp; Piping</option>
                      <option value="Commercial Roofing & Solar">Commercial Roofing &amp; Solar</option>
                      <option value="General Commercial Contractor">General Commercial Contractor</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1">City &amp; State:</label>
                    <input
                      type="text"
                      placeholder="Houston, TX"
                      value={socialLeadLocation}
                      onChange={e => setSocialLeadLocation(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-sans text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1">LinkedIn Profile or Email:</label>
                    <input
                      type="text"
                      placeholder="linkedin.com/in/john-doe or cfo@trident.com"
                      value={socialLeadContact}
                      onChange={e => setSocialLeadContact(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 font-sans text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-xs cursor-pointer mt-2"
                  >
                    Add to Acquisition Pipeline
                  </button>
                </form>
              </div>

              {/* QUICK NUMBERS STAT */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 font-mono">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  Weekly Outreach Equation
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  • Send <strong>25 LinkedIn InMails</strong> / week<br/>
                  • Post <strong>2 Value Guides</strong> in Facebook Trade Groups<br/>
                  • Expect <strong>6-8 Booked Demos</strong><br/>
                  • Close <strong>1-2 Paid Clients ($1,490/mo)</strong>
                </p>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Monthly Run-Rate:</span>
                  <span className="text-emerald-400 font-black">+$5,960 MRR</span>
                </div>
              </div>
            </div>
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
