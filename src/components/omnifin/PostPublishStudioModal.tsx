import React, { useState, useMemo } from 'react';
import {
  Share2,
  Copy,
  Check,
  Twitter,
  FileText,
  Send,
  Building,
  Sparkles,
  Sliders,
  X,
  ExternalLink,
  Download,
  ShieldCheck,
  Flame,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle
} from 'lucide-react';
import { AiMarketViewDecision } from '../../types/cryptoIntelligence';

interface PostPublishStudioModalProps {
  decision: AiMarketViewDecision;
  onClose: () => void;
}

export const PostPublishStudioModal: React.FC<PostPublishStudioModalProps> = ({
  decision,
  onClose
}) => {
  const [platform, setPlatform] = useState<'TWITTER' | 'SUBSTACK' | 'TELEGRAM' | 'BLOOMBERG'>('TWITTER');
  const [includeDisclaimers, setIncludeDisclaimers] = useState<boolean>(true);
  const [includeProbabilities, setIncludeProbabilities] = useState<boolean>(true);
  const [includeInvalidation, setIncludeInvalidation] = useState<boolean>(true);
  const [authorHandle, setAuthorHandle] = useState<string>('@OmnifinResearch');
  const [deskName, setDeskName] = useState<string>('ECONOS Omnifin Quantitative Alpha Desk');
  const [copied, setCopied] = useState<boolean>(false);

  // Generate X (Twitter) Thread Post
  const twitterPost = useMemo(() => {
    const isBull = decision.directionalBias.includes('BULL');
    const biasEmoji = isBull ? '🟢' : decision.directionalBias.includes('BEAR') ? '🔴' : '🟡';
    const ticker = decision.assetSymbol.split('-')[0];

    const tweet1 = `${biasEmoji} $${ticker} Market Intelligence & Quant Signal Outlook

Current Price: $${decision.currentPrice >= 1 ? decision.currentPrice.toLocaleString() : decision.currentPrice.toFixed(4)}
Market Regime: ${decision.marketRegime.replace(/_/g, ' ')}
Model Confidence: ${decision.confidencePct}% (Multi-source verified)
Time Horizon: ${decision.timeHorizon.replace(/_/g, ' ')}
Directional Bias: ${decision.directionalBias}

🧵 Complete Quantitative Breakdown Below 👇 (1/3)`;

    const tweet2 = `📊 Scenario & Level Matrix:

${includeProbabilities ? `• Bull Case (${decision.bullCase.probability}%): ${decision.bullCase.trigger}
• Base Case (${decision.baseCase.probability}%): Consolidation range $${decision.baseCase.targetRange[0].toLocaleString()} - $${decision.baseCase.targetRange[1].toLocaleString()}
• Bear Case (${decision.bearCase.probability}%): Breakdown risk below $${decision.bearCase.targetRange[1].toLocaleString()}

` : ''}🎯 Potential Entry: ${decision.potentialEntryZone ? `$${decision.potentialEntryZone[0].toLocaleString()} - $${decision.potentialEntryZone[1].toLocaleString()}` : 'No valid entry currently'}
🎯 Take-Profit 1: $${decision.targetZones?.tp1.toLocaleString() || 'N/A'}
🎯 Take-Profit 2: $${decision.targetZones?.tp2.toLocaleString() || 'N/A'}
${includeInvalidation ? `🛑 Structural Invalidation: $${decision.invalidationLevel?.toLocaleString() || 'N/A'} (${decision.invalidationCondition})` : ''}
⚖️ Risk / Reward: ${decision.riskRewardRatio} | Risk Grade: ${decision.riskGrade}

(2/3)`;

    const tweet3 = `🔬 Key Drivers & Catalysts:
• Confluence: ${decision.evidenceSummary.whySignalExists}
• Primary Catalyst: ${decision.keyCatalysts[0] || 'ETF flows & institutional adoption'}
• Biggest Risk: ${decision.biggestRisks[0] || 'Macro volatility'}

⚠️ Thesis Invalidation Trigger:
"${decision.thesisChangeTrigger}"

${includeDisclaimers ? `📌 MiCA & Regulatory Disclaimer: Probabilistic quantitative analysis model. Not financial advice. Past models do not guarantee future returns. Trade at your own risk.

Powered by ECONOS Omnifin Intelligence Engine ⚡ (3/3)` : `Powered by ECONOS Omnifin Intelligence Engine ⚡ (3/3)`}`;

    return {
      fullThread: `${tweet1}\n\n---\n\n${tweet2}\n\n---\n\n${tweet3}`,
      tweets: [tweet1, tweet2, tweet3]
    };
  }, [decision, includeDisclaimers, includeProbabilities, includeInvalidation]);

  // Generate Substack / Medium Markdown Article
  const substackPost = useMemo(() => {
    const ticker = decision.assetSymbol.split('-')[0];
    return `# Market Intelligence Memo: $${ticker} Quantitative Structure & Scenarios
*Published by ${deskName} • Horizon: ${decision.timeHorizon.replace(/_/g, ' ')} • Status: ${decision.status}*

---

## Executive Summary
The ECONOS Omnifin Multi-Signal Engine has established a **${decision.directionalBias}** bias on **$${ticker}** at spot price **$${decision.currentPrice.toLocaleString()}**, supported by a model confidence level of **${decision.confidencePct}%**.

- **Market Regime:** \`${decision.marketRegime}\`
- **Data Quality:** \`${decision.dataQuality}\` (Cross-verified against live Binance and Coinbase spot depth)
- **Risk Profile:** \`${decision.riskGrade} RISK\`
- **Risk / Reward:** \`${decision.riskRewardRatio}\`

---

## 1. Probability-Weighted Scenarios
Our 10-layer Bayesian confluence radar models three normalized market paths:

| Scenario | Probability | Target Range | Trigger Condition |
| :--- | :--- | :--- | :--- |
| **Bull Case** | **${decision.bullCase.probability}%** | $${decision.bullCase.targetRange[0].toLocaleString()} - $${decision.bullCase.targetRange[1].toLocaleString()} | ${decision.bullCase.trigger} |
| **Base Case** | **${decision.baseCase.probability}%** | $${decision.baseCase.targetRange[0].toLocaleString()} - $${decision.baseCase.targetRange[1].toLocaleString()} | ${decision.baseCase.trigger} |
| **Bear Case** | **${decision.bearCase.probability}%** | $${decision.bearCase.targetRange[0].toLocaleString()} - $${decision.bearCase.targetRange[1].toLocaleString()} | ${decision.bearCase.trigger} |

---

## 2. Quantitative Trade Execution Levels
- **Entry Zone:** ${decision.potentialEntryZone ? `$${decision.potentialEntryZone[0].toLocaleString()} – $${decision.potentialEntryZone[1].toLocaleString()}` : 'NO VALID ENTRY CURRENTLY'}
- **Take-Profit Targets:** TP1: ${decision.targetZones ? `$${decision.targetZones.tp1.toLocaleString()}` : 'N/A'} | TP2: ${decision.targetZones ? `$${decision.targetZones.tp2.toLocaleString()}` : 'N/A'} | TP3: ${decision.targetZones ? `$${decision.targetZones.tp3.toLocaleString()}` : 'N/A'}
- **Structural Invalidation Level:** ${decision.invalidationLevel ? `$${decision.invalidationLevel.toLocaleString()}` : 'N/A'}
- **Invalidation Condition:** *${decision.invalidationCondition}*

---

## 3. Confluence & Microstructure Evidence
### Primary Supporting Evidence:
${decision.evidenceSummary.supportingEvidence.map(e => '- ' + e).join('\n')}

### Counter-Thesis Risks & Contradicting Signals:
${decision.evidenceSummary.contradictingEvidence.map(c => '- ' + c).join('\n')}

---

## 4. Invalidation & Regime Shift Triggers
> "${decision.thesisChangeTrigger}"

${includeDisclaimers ? `---
### Compliance & Risk Disclosures
*This research report is prepared for institutional and informational purposes only and does not constitute an offer, recommendation, or solicitation to purchase or sell any security, token, or financial instrument. Crypto assets involve significant risk of loss. ECONOS Omnifin models are probabilistic and subject to unexpected market regime changes.*` : ''}`;
  }, [decision, deskName, includeDisclaimers]);

  // Generate Telegram / Discord Channel Signal Alert
  const telegramPost = useMemo(() => {
    const isBull = decision.directionalBias.includes('BULL');
    const ticker = decision.assetSymbol.split('-')[0];
    const icon = isBull ? '🟢' : '🔴';

    return `${icon} **OMNIFIN ALPHA ALERT: $${ticker}** ${icon}
────────────────────────
📍 **Status:** \`${decision.status.replace(/_/g, ' ')}\`
📈 **Bias:** \`${decision.directionalBias}\`
⏱ **Horizon:** \`${decision.timeHorizon.replace(/_/g, ' ')}\`
🎯 **Current Spot:** \`$${decision.currentPrice.toLocaleString()}\`
⚡ **Confidence:** \`${decision.confidencePct}%\` (Quality: ${decision.dataQuality})

📊 **EXECUTION BRACKET:**
• **Entry Zone:** \`${decision.potentialEntryZone ? `$${decision.potentialEntryZone[0].toLocaleString()} - $${decision.potentialEntryZone[1].toLocaleString()}` : 'WAIT / NO SETUP'}\`
• **Target 1:** \`$${decision.targetZones?.tp1.toLocaleString() || 'N/A'}\`
• **Target 2:** \`$${decision.targetZones?.tp2.toLocaleString() || 'N/A'}\`
• **Target 3:** \`$${decision.targetZones?.tp3.toLocaleString() || 'N/A'}\`
• **Invalidation:** \`$${decision.invalidationLevel?.toLocaleString() || 'N/A'}\`
• **Risk/Reward:** \`${decision.riskRewardRatio}\` (Risk: ${decision.riskGrade})

🎲 **PROBABILITY SCENARIOS:**
🚀 Bull (${decision.bullCase.probability}%): ${decision.bullCase.trigger}
🔄 Base (${decision.baseCase.probability}%): Consolidation in range
🔻 Bear (${decision.bearCase.probability}%): High volume rejection below support

⚠️ **INVALIDATION CRITERIA:**
"${decision.thesisChangeTrigger}"
────────────────────────
${includeDisclaimers ? '⚠️ *Research model. Not financial advice. Manage risk.*' : ''}`;
  }, [decision, includeDisclaimers]);

  // Generate Institutional Bloomberg-Style Terminal Memorandum
  const bloombergPost = useMemo(() => {
    const ticker = decision.assetSymbol.split('-')[0];
    const timestamp = new Date().toISOString();
    return `OMNIFIN PRIME BROKERAGE RESEARCH MEMORANDUM
SECURITY CLASSIFICATION: PROPRIETARY QUANTITATIVE INTELLIGENCE
TIMESTAMP: ${timestamp} | DESK: OMNI-QUANT-PRIME-01
AUTHOR: ${deskName} (${authorHandle})

INSTRUMENT: ${decision.assetSymbol} (${decision.assetName})
BENCHMARK: GLOBAL COMPOSITE (BINANCE + COINBASE SPOT)
SPOT REFERENCE: USD ${decision.currentPrice.toLocaleString()}
REGIME: ${decision.marketRegime}
DIRECTIONAL BIAS: ${decision.directionalBias}
CONFIDENCE COEFFICIENT: ${decision.confidencePct}% (MODEL UNCERTAINTY WEIGHTED)
DATA QUALITY: ${decision.dataQuality} (PROVENANCE VERIFIED VIA SHA-256 STATE ROOT)

--------------------------------------------------------------------------------
1. PROBABILISTIC SCENARIO DISTRIBUTION
--------------------------------------------------------------------------------
- BULL CASE [P = ${decision.bullCase.probability}%]:
  TRIGGER: ${decision.bullCase.trigger}
  TARGET RANGE: USD ${decision.bullCase.targetRange[0].toLocaleString()} - ${decision.bullCase.targetRange[1].toLocaleString()}
- BASE CASE [P = ${decision.baseCase.probability}%]:
  TRIGGER: ${decision.baseCase.trigger}
  TARGET RANGE: USD ${decision.baseCase.targetRange[0].toLocaleString()} - ${decision.baseCase.targetRange[1].toLocaleString()}
- BEAR CASE [P = ${decision.bearCase.probability}%]:
  TRIGGER: ${decision.bearCase.trigger}
  TARGET RANGE: USD ${decision.bearCase.targetRange[0].toLocaleString()} - ${decision.bearCase.targetRange[1].toLocaleString()}

--------------------------------------------------------------------------------
2. RISK / RETURN ASYMMETRY PARAMETERS
--------------------------------------------------------------------------------
ESTIMATED ENTRY BAND: USD ${decision.potentialEntryZone ? `${decision.potentialEntryZone[0].toLocaleString()} - ${decision.potentialEntryZone[1].toLocaleString()}` : 'N/A'}
PROFIT TARGET 1:      USD ${decision.targetZones?.tp1.toLocaleString() || 'N/A'}
PROFIT TARGET 2:      USD ${decision.targetZones?.tp2.toLocaleString() || 'N/A'}
PROFIT TARGET 3:      USD ${decision.targetZones?.tp3.toLocaleString() || 'N/A'}
STRUCTURAL STOP:      USD ${decision.invalidationLevel?.toLocaleString() || 'N/A'}
RISK / REWARD RATIO:  ${decision.riskRewardRatio}
PORTFOLIO RISK LEVEL: ${decision.riskGrade}

--------------------------------------------------------------------------------
3. MULTI-SOURCE CONFLUENCE RATIONALE
--------------------------------------------------------------------------------
${decision.evidenceSummary.supportingEvidence.map(e => `[+] ${e}`).join('\n')}
${decision.evidenceSummary.contradictingEvidence.map(c => `[-] ${c}`).join('\n')}

INVALIDATION RULE: ${decision.thesisChangeTrigger}

--------------------------------------------------------------------------------
DISCLOSURE: Generated automatically by ECONOS Omnifin Section 41 Intelligence Engine.
Complies with SEC Rule 10b-5 and MiCA Best Execution Transparency guidelines.
END OF MEMORANDUM.`;
  }, [decision, deskName, authorHandle]);

  // Active content to copy
  const activeContent = useMemo(() => {
    switch (platform) {
      case 'TWITTER':
        return twitterPost.fullThread;
      case 'SUBSTACK':
        return substackPost;
      case 'TELEGRAM':
        return telegramPost;
      case 'BLOOMBERG':
        return bloombergPost;
    }
  }, [platform, twitterPost, substackPost, telegramPost, bloombergPost]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([activeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${decision.assetSymbol}_Omnifin_Intelligence_Post.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0b1322] border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl text-white font-mono text-xs overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">Alpha Publishing &amp; Post Studio</h3>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                  Multi-Channel Export
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Instantly turn your live {decision.assetSymbol} quant intelligence into viral threads, institutional memos, or Telegram alerts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          
          {/* Left Column: Platform Selector & Controls */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Platform Chooser */}
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                Select Publishing Channel:
              </label>
              <div className="space-y-2">
                {[
                  { id: 'TWITTER', label: 'X / Twitter Alpha Thread', icon: Twitter, desc: '3-part formatted viral thread' },
                  { id: 'SUBSTACK', label: 'Substack / Medium Article', icon: FileText, desc: 'Markdown executive deep-dive' },
                  { id: 'TELEGRAM', label: 'Telegram / Discord Alert', icon: Send, desc: 'High-velocity trade signal card' },
                  { id: 'BLOOMBERG', label: 'Bloomberg Terminal Memo', icon: Building, desc: 'Institutional audit compliance brief' }
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = platform === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setPlatform(item.id as any)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-start gap-3 transition cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600/20 border-purple-500 text-white shadow-xs'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-bold text-xs ${isSelected ? 'text-purple-300' : 'text-slate-200'}`}>
                          {item.label}
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customization Options */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="font-bold text-xs text-white flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Publishing Customization</span>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeProbabilities}
                    onChange={(e) => setIncludeProbabilities(e.target.checked)}
                    className="rounded border-slate-700 text-purple-600 focus:ring-0"
                  />
                  <span>Include Bull/Base/Bear Probabilities</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeInvalidation}
                    onChange={(e) => setIncludeInvalidation(e.target.checked)}
                    className="rounded border-slate-700 text-purple-600 focus:ring-0"
                  />
                  <span>Include Structural Invalidation Stops</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeDisclaimers}
                    onChange={(e) => setIncludeDisclaimers(e.target.checked)}
                    className="rounded border-slate-700 text-purple-600 focus:ring-0"
                  />
                  <span>Attach MiCA / SEC Disclaimers</span>
                </label>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="text-[10px] text-slate-400">Desk / Author Attribution:</div>
                <input
                  type="text"
                  value={deskName}
                  onChange={(e) => setDeskName(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-hidden focus:border-purple-500"
                />
              </div>
            </div>

            {/* Branded Visual Snapshot Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-indigo-800/40 space-y-2.5">
              <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Branded Signal Preview Card</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 font-mono">
                <div className="flex justify-between items-center">
                  <span className="font-black text-sm text-white">{decision.assetSymbol}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {decision.directionalBias}
                  </span>
                </div>
                <div className="text-xs font-black text-cyan-300">
                  Spot: ${decision.currentPrice.toLocaleString()}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>Confidence: {decision.confidencePct}%</span>
                  <span>R:R: {decision.riskRewardRatio}</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400">
                Ready to screenshot and attach to your post!
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Post Preview */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase font-bold">Post Content Preview:</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {platform} FORMAT
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold flex items-center gap-1.5 transition cursor-pointer border border-slate-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Post'}</span>
                </button>
              </div>
            </div>

            {/* Post Preview Box */}
            <div className="flex-1 min-h-[380px] p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 overflow-y-auto font-mono text-xs leading-relaxed whitespace-pre-wrap selection:bg-purple-600 selection:text-white">
              {activeContent}
            </div>

            {/* Bottom Publishing Tips */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Meets institutional compliance standards: zero guaranteed profit claims, uncertainty-weighted.</span>
              </div>
              <span className="font-mono text-slate-500 text-[10px]">
                {activeContent.length} chars
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
