import fs from 'fs';
import path from 'path';
import { ScrapedLead, OutboundCallRecord } from '../src/types/econos';
import { aiAdvisorService } from './gemini';

const LEADS_STORAGE_FILE = process.env.VERCEL 
  ? path.join('/tmp', 'econos-scraped-leads.json') 
  : path.join(process.cwd(), 'econos-scraped-leads.json');

const INITIAL_SEEDED_LEADS: ScrapedLead[] = [
  {
    id: 'lead_map_001',
    name: 'Vanguard Industrial Logistics',
    category: 'Logistics & Freight Forwarding',
    location: 'Chicago, IL',
    address: '4200 S Pulaski Rd, Chicago, IL 60632',
    city: 'Chicago',
    state: 'IL',
    zip: '60632',
    phone: '+1 (312) 555-0192',
    website: 'https://vanguard-freight-systems.com',
    rating: 4.8,
    reviewCount: 312,
    status: 'OPERATIONAL',
    priceLevel: '$$$',
    openingHours: '24/7 Operations',
    estimatedRevenueRange: '$4.5M - $8.2M',
    monthlyInvoiceVolume: 420,
    icpScore: 96,
    cashFlowFriction: 'Net-60 carrier billing delays causing $340k working capital drag and manual 3-way BOL invoice reconciliation',
    contactEmail: 'operations@vanguard-freight-systems.com',
    outreachStatus: 'NOT_CONTACTED',
    callCount: 0,
    tags: ['Logistics', 'High Volume Payables', 'Tier 1 Prospect']
  },
  {
    id: 'lead_map_002',
    name: 'Apex Commercial Climate Solutions',
    category: 'Commercial HVAC & Mechanical',
    location: 'Dallas, TX',
    address: '11830 Webb Chapel Rd, Dallas, TX 75234',
    city: 'Dallas',
    state: 'TX',
    zip: '75234',
    phone: '+1 (214) 555-0847',
    website: 'https://apexcommercialclimate.com',
    rating: 4.9,
    reviewCount: 245,
    status: 'OPERATIONAL',
    priceLevel: '$$',
    openingHours: 'Mon-Sat 7:00 AM - 7:00 PM',
    estimatedRevenueRange: '$3.2M - $5.5M',
    monthlyInvoiceVolume: 260,
    icpScore: 92,
    cashFlowFriction: 'Retainage holdbacks on commercial construction contracts and vendor parts price volatility',
    contactEmail: 'treasury@apexcommercialclimate.com',
    outreachStatus: 'EMAIL_SENT',
    lastEmailSentAt: '2026-09-18T14:20:00Z',
    lastEmailSubject: 'Financial workflow observation for Apex Commercial Climate (Dallas)',
    callCount: 1,
    tags: ['Contractor', 'Net-30 Vendors', 'High Cash Flow']
  },
  {
    id: 'lead_map_003',
    name: 'Summit Precision Medical & Dental',
    category: 'Healthcare & Specialized Clinics',
    location: 'Austin, TX',
    address: '3801 N Lamar Blvd, Suite 200, Austin, TX 78756',
    city: 'Austin',
    state: 'TX',
    zip: '78756',
    phone: '+1 (512) 555-9381',
    website: 'https://summitprecisionhealth.com',
    rating: 4.9,
    reviewCount: 488,
    status: 'OPERATIONAL',
    priceLevel: '$$$',
    openingHours: 'Mon-Fri 8:00 AM - 5:00 PM',
    estimatedRevenueRange: '$2.8M - $4.9M',
    monthlyInvoiceVolume: 190,
    icpScore: 89,
    cashFlowFriction: 'Insurance reimbursement remittance lag (45-60 days) and high medical supply inventory carrying costs',
    contactEmail: 'director@summitprecisionhealth.com',
    outreachStatus: 'CLICKED',
    lastEmailSentAt: '2026-09-19T09:15:00Z',
    lastEmailSubject: 'Treasury & working capital acceleration for Summit Precision Medical',
    lastInteractionAt: '2026-09-20T11:42:00Z',
    callCount: 0,
    tags: ['Healthcare', 'Multi-Provider', 'High Net Margin']
  },
  {
    id: 'lead_map_004',
    name: 'BluePeak Wholesale Food & Beverage',
    category: 'Wholesale Food Distribution',
    location: 'Atlanta, GA',
    address: '1605 Chattahoochee Ave NW, Atlanta, GA 30318',
    city: 'Atlanta',
    state: 'GA',
    zip: '30318',
    phone: '+1 (404) 555-6721',
    website: 'https://bluepeakwholesalefoods.com',
    rating: 4.7,
    reviewCount: 178,
    status: 'OPERATIONAL',
    priceLevel: '$$',
    openingHours: 'Mon-Fri 5:00 AM - 4:00 PM',
    estimatedRevenueRange: '$5.5M - $11.0M',
    monthlyInvoiceVolume: 580,
    icpScore: 95,
    cashFlowFriction: 'Thin net margins (4-6%) vulnerable to perishable shrinkage and delayed restaurant customer remittances',
    contactEmail: 'cfo@bluepeakwholesalefoods.com',
    outreachStatus: 'NOT_CONTACTED',
    callCount: 0,
    tags: ['Food Supply', 'High Invoice Velocity', 'Inventory Sensitive']
  },
  {
    id: 'lead_map_005',
    name: 'Titan Commercial Roofing & Solar',
    category: 'Commercial Roofing & Renewable Systems',
    location: 'Phoenix, AZ',
    address: '2400 E Thomas Rd, Phoenix, AZ 85016',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85016',
    phone: '+1 (602) 555-3920',
    website: 'https://titanroofingsolaraz.com',
    rating: 4.8,
    reviewCount: 395,
    status: 'OPERATIONAL',
    priceLevel: '$$$',
    openingHours: 'Mon-Sat 6:30 AM - 6:00 PM',
    estimatedRevenueRange: '$4.0M - $7.5M',
    monthlyInvoiceVolume: 220,
    icpScore: 91,
    cashFlowFriction: 'Project milestone billing cycles requiring significant upfront material deposits to vendors',
    contactEmail: 'finance@titanroofingsolaraz.com',
    outreachStatus: 'NOT_CONTACTED',
    callCount: 0,
    tags: ['Renewable Energy', 'High Ticket Transactions', 'Capital Intensive']
  }
];

export class LeadAcquisitionService {
  private leads: ScrapedLead[] = [];
  private calls: OutboundCallRecord[] = [];

  constructor() {
    this.loadState();
  }

  private loadState() {
    try {
      if (fs.existsSync(LEADS_STORAGE_FILE)) {
        const raw = fs.readFileSync(LEADS_STORAGE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.leads = Array.isArray(data.leads) && data.leads.length > 0 ? data.leads : [...INITIAL_SEEDED_LEADS];
        this.calls = Array.isArray(data.calls) ? data.calls : [];
      } else {
        this.leads = [...INITIAL_SEEDED_LEADS];
        this.calls = [];
        this.saveState();
      }
    } catch (e) {
      console.warn('[LeadService] Could not read leads cache file, using in-memory baseline:', e);
      this.leads = [...INITIAL_SEEDED_LEADS];
      this.calls = [];
    }
  }

  private saveState() {
    try {
      const data = {
        leads: this.leads,
        calls: this.calls,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(LEADS_STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.warn('[LeadService] Could not write leads file:', e);
    }
  }

  public getLeads(): ScrapedLead[] {
    return this.leads;
  }

  public getLeadById(id: string): ScrapedLead | undefined {
    return this.leads.find(l => l.id === id);
  }

  public async discoverLeads(category: string, location: string, limit = 6): Promise<ScrapedLead[]> {
    const discovered = await aiAdvisorService.discoverMapsLeads(category, location, limit);
    
    // Merge new leads avoiding exact duplicate names
    const existingNames = new Set(this.leads.map(l => l.name.toLowerCase()));
    const newItems = discovered.filter(d => !existingNames.has(d.name.toLowerCase()));
    
    this.leads = [...newItems, ...this.leads];
    this.saveState();
    return newItems.length > 0 ? newItems : discovered;
  }

  public updateLead(id: string, updates: Partial<ScrapedLead>): ScrapedLead | undefined {
    const idx = this.leads.findIndex(l => l.id === id);
    if (idx === -1) return undefined;

    this.leads[idx] = {
      ...this.leads[idx],
      ...updates
    };
    this.saveState();
    return this.leads[idx];
  }

  public async generateEmailForLead(leadId: string, focus?: string): Promise<{ subject: string; body: string }> {
    const lead = this.getLeadById(leadId);
    if (!lead) throw new Error('Lead not found');

    const email = await aiAdvisorService.generateOutboundEmail(lead, focus);
    this.updateLead(leadId, {
      outreachStatus: lead.outreachStatus === 'NOT_CONTACTED' ? 'EMAIL_DRAFTED' : lead.outreachStatus,
      lastEmailSubject: email.subject
    });
    return email;
  }

  public sendEmailToLead(leadId: string, emailData: { subject: string; body: string }): ScrapedLead {
    const lead = this.getLeadById(leadId);
    if (!lead) throw new Error('Lead not found');

    const historyItem = {
      subject: emailData.subject,
      body: emailData.body,
      sentAt: new Date().toISOString()
    };
    const currentHistory = Array.isArray(lead.emailHistory) ? lead.emailHistory : [];

    const updated = this.updateLead(leadId, {
      outreachStatus: 'EMAIL_SENT',
      lastEmailSentAt: new Date().toISOString(),
      lastEmailSubject: emailData.subject,
      lastEmailBody: emailData.body,
      emailHistory: [historyItem, ...currentHistory],
      flywheelAuditSent: true,
      lastInteractionAt: new Date().toISOString()
    });

    return updated!;
  }

  public async dispatchFlywheelBrief(leadId: string): Promise<{ lead: ScrapedLead; email: { subject: string; body: string } }> {
    const lead = this.getLeadById(leadId);
    if (!lead) throw new Error('Lead not found');

    const email = await aiAdvisorService.generateFlywheelBriefingEmail(lead);
    const updatedLead = this.sendEmailToLead(leadId, email);
    return { lead: updatedLead, email };
  }

  public async chatWithProspect(
    leadId: string,
    message: string,
    history: Array<{ role: string; content: string }> = []
  ): Promise<{ reply: string; emailDispatched?: boolean; emailSubject?: string; emailBody?: string; emailRecipient?: string }> {
    const lead = this.getLeadById(leadId);
    if (!lead) throw new Error('Lead not found');

    this.updateLead(leadId, {
      outreachStatus: lead.outreachStatus === 'CONVERTED' ? 'CONVERTED' : 'IN_CHAT',
      lastInteractionAt: new Date().toISOString()
    });

    const result = await aiAdvisorService.chatWithProspect(lead, message, history);

    if (result.emailDispatched && result.emailSubject && result.emailBody) {
      this.sendEmailToLead(leadId, {
        subject: result.emailSubject,
        body: result.emailBody
      });
    }

    return {
      reply: result.reply,
      emailDispatched: result.emailDispatched,
      emailSubject: result.emailSubject,
      emailBody: result.emailBody,
      emailRecipient: lead.contactEmail || 'Client Designated Email'
    };
  }

  public async processVoiceTurn(
    leadId: string,
    speechText: string,
    history: Array<{ role: 'ai' | 'client'; text: string }> = []
  ): Promise<{
    text: string;
    intent: string;
    bookMeeting: boolean;
    triggerEmailDispatch?: boolean;
    emailDispatched?: boolean;
    emailSubject?: string;
    emailBody?: string;
    emailRecipient?: string;
  }> {
    const lead = this.getLeadById(leadId);
    if (!lead) throw new Error('Lead not found');

    this.updateLead(leadId, {
      outreachStatus: 'VOICE_CALLED',
      callCount: (lead.callCount || 0) + 1,
      lastInteractionAt: new Date().toISOString()
    });

    const turn = await aiAdvisorService.generateVoiceTurn(lead, speechText, history);

    let emailDispatched = false;
    let emailSubject: string | undefined;
    let emailBody: string | undefined;

    if (turn.triggerEmailDispatch) {
      try {
        const flywheelEmail = await aiAdvisorService.generateFlywheelBriefingEmail(lead);
        this.sendEmailToLead(leadId, flywheelEmail);
        emailDispatched = true;
        emailSubject = flywheelEmail.subject;
        emailBody = flywheelEmail.body;
      } catch (e) {
        console.warn('[LeadService] Automatic flywheel email dispatch failed:', e);
      }
    }

    return {
      ...turn,
      emailDispatched,
      emailSubject,
      emailBody,
      emailRecipient: lead.contactEmail || 'Client Designated Email'
    };
  }

  public initiateOutboundCall(leadId: string, phone: string, callType: 'WEB_BROWSER_VOICE' | 'AUTOMATED_PHONE_OUTBOUND' = 'AUTOMATED_PHONE_OUTBOUND'): OutboundCallRecord {
    const lead = this.getLeadById(leadId);
    const leadName = lead?.name || 'Prospective Commercial Client';

    const callRecord: OutboundCallRecord = {
      id: `call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      leadId,
      leadName,
      phone: phone || lead?.phone || '+1 (555) 019-2834',
      status: 'INITIATED',
      durationSeconds: 0,
      callType,
      transcript: [
        {
          role: 'ai',
          text: `Hi, this is the ECONOS AI CFO Copilot reaching out for ${leadName}. Am I speaking with the finance or operations team?`,
          timestamp: new Date().toISOString()
        }
      ],
      sentiment: 'NEUTRAL',
      detectedInterest: ['Working Capital Optimization', '2026 Implementation Roadmap'],
      createdAt: new Date().toISOString()
    };

    this.calls.unshift(callRecord);
    
    if (lead) {
      this.updateLead(leadId, {
        outreachStatus: 'VOICE_CALLED',
        callCount: (lead.callCount || 0) + 1,
        lastInteractionAt: new Date().toISOString()
      });
    }

    this.saveState();
    return callRecord;
  }

  public updateCallRecord(callId: string, updates: Partial<OutboundCallRecord>): OutboundCallRecord | undefined {
    const idx = this.calls.findIndex(c => c.id === callId);
    if (idx === -1) return undefined;

    this.calls[idx] = {
      ...this.calls[idx],
      ...updates
    };

    if (updates.meetingBooked && this.calls[idx].leadId) {
      this.updateLead(this.calls[idx].leadId, {
        outreachStatus: 'CONVERTED'
      });
    }

    this.saveState();
    return this.calls[idx];
  }

  public getCalls(leadId?: string): OutboundCallRecord[] {
    if (leadId) {
      return this.calls.filter(c => c.leadId === leadId);
    }
    return this.calls;
  }

  public resetToDefaultSeed() {
    this.leads = [...INITIAL_SEEDED_LEADS];
    this.calls = [];
    this.saveState();
  }
}

export const leadAcquisitionService = new LeadAcquisitionService();
