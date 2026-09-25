import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  Mic, 
  Headphones, 
  Zap, 
  ChevronRight, 
  Layers, 
  ExternalLink,
  Bot,
  Activity,
  CheckCircle2,
  Clock,
  AudioWaveform,
  Maximize2
} from 'lucide-react';
import { AppLayer } from '../../types/econos';
import { getLayerByNumber } from '../../data/master100LayersData';
import marcusImg from '../../assets/images/marcus_vance_host_1790155174205.jpg';
import marcusTalkingImg from '../../assets/images/marcus_vance_talking_1790156795899.jpg';
import elenaImg from '../../assets/images/elena_rostova_host_1790155197061.jpg';
import elenaTalkingImg from '../../assets/images/elena_rostova_talking_1790156817395.jpg';
import studioDeskImg from '../../assets/images/podcast_studio_desk_1790155140572.jpg';

interface TelemetryPodcastPlayerProps {
  currentLayer?: AppLayer;
  onSelectLayer?: (layer: AppLayer) => void;
  onOpenFullPodcast?: () => void;
}

export interface PodcastDialogue {
  id: string;
  speaker: 'marcus' | 'elena';
  speakerName: string;
  role: string;
  avatarText: string;
  badgeColor: string;
  text: string;
  layerRef?: number;
  metricHighlight?: string;
  timestamp: string;
}

// Generate contextual two-way dialogue based on current layer or general system telemetry
const generateLayerDialogue = (layer: AppLayer | undefined): { title: string; lines: PodcastDialogue[] } => {
  const layerStr = String(layer || 'BUSINESS');

  if (layerStr.includes('62') || layerStr === 'LAYER_62_RD_TAX_CREDIT') {
    return {
      title: 'Layer 62 Live Debrief: §41 R&D Continuous Credit Ingestion & Audit Shield',
      lines: [
        {
          id: 'l62-1',
          speaker: 'elena',
          speakerName: 'Elena Rostova',
          role: 'AI Governance Lead',
          avatarText: 'ER',
          badgeColor: 'from-cyan-500 to-blue-600',
          text: "Marcus, our autonomous ingest agents just parsed another 148 pull requests in the engineering repos. Every single commit with technical uncertainty is now linked to Form 6765 audit evidence.",
          layerRef: 62,
          metricHighlight: '+$14,200 Incremental QRE',
          timestamp: '00:04'
        },
        {
          id: 'l62-2',
          speaker: 'marcus',
          speakerName: 'Dr. Marcus Vance',
          role: 'Chief Macro Systems Architect',
          avatarText: 'MV',
          badgeColor: 'from-amber-500 to-amber-700',
          text: "Outstanding work, Elena. That brings this quarter's payroll tax offset to $312,000. Under traditional accounting, this study would take 4 months and cost $80,000 in CPA fees. In ECONOS, it clears autonomously every block.",
          layerRef: 62,
          metricHighlight: '99.4% Audit Shield Score',
          timestamp: '00:19'
        },
        {
          id: 'l62-3',
          speaker: 'elena',
          speakerName: 'Elena Rostova',
          role: 'AI Governance Lead',
          avatarText: 'ER',
          badgeColor: 'from-cyan-500 to-blue-600',
          text: "And notice how the credit compounds directly into our treasury liquidity reserves. Zero cash float delay. Real-time engineering transformed into liquid sovereign capital.",
          layerRef: 1,
          metricHighlight: 'Zero Float Delay',
          timestamp: '00:35'
        }
      ]
    };
  }

  if (layerStr === 'SOVEREIGN_COMMAND') {
    return {
      title: 'Institutional Sovereign Command: 4-Quadrant Macro Solvency & Risk Enclaves',
      lines: [
        {
          id: 'sc-1',
          speaker: 'marcus',
          speakerName: 'Dr. Marcus Vance',
          role: 'Chief Macro Systems Architect',
          avatarText: 'MV',
          badgeColor: 'from-amber-500 to-amber-700',
          text: "Welcome to the Sovereign Command briefing. The institutional telemetry feed confirms zero counterparty contagion across all 100 system layers today.",
          layerRef: 100,
          metricHighlight: '100% Solvency Ratio',
          timestamp: '00:05'
        },
        {
          id: 'sc-2',
          speaker: 'elena',
          speakerName: 'Elena Rostova',
          role: 'AI Governance Lead',
          avatarText: 'ER',
          badgeColor: 'from-cyan-500 to-blue-600',
          text: "Exactly Marcus. All four quadrants—from autonomous liquidity routing to post-quantum key rotations—are operating at sub-millisecond execution latencies.",
          layerRef: 24,
          metricHighlight: '0.84ms Settlement Latency',
          timestamp: '00:20'
        },
        {
          id: 'sc-3',
          speaker: 'marcus',
          speakerName: 'Dr. Marcus Vance',
          role: 'Chief Macro Systems Architect',
          avatarText: 'MV',
          badgeColor: 'from-amber-500 to-amber-700',
          text: "When traditional banking systems suffer from clearing delays or credit freezes, ECONOS relies on cryptographic verifiability. Sovereign capital never sleeps.",
          layerRef: 14,
          metricHighlight: '$100M Guarantee Pool',
          timestamp: '00:36'
        }
      ]
    };
  }

  // Default Sovereign Stack Breakdown
  return {
    title: 'ECONOS Telemetry Pulse: Real-Time Cross-Layer Mesh & Autonomous Liquidity',
    lines: [
      {
        id: 'gen-1',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatarText: 'MV',
        badgeColor: 'from-amber-500 to-amber-700',
        text: "Marcus here with the live telemetry analysis. Looking at the active cross-layer bus, our autonomous agents have settled 1,420 micro-arbitrage events across treasury and ERP rails.",
        layerRef: 11,
        metricHighlight: '1,420 Actions / min',
        timestamp: '00:04'
      },
      {
        id: 'gen-2',
        speaker: 'elena',
        speakerName: 'Elena Rostova',
        role: 'AI Governance Lead',
        avatarText: 'ER',
        badgeColor: 'from-cyan-500 to-blue-600',
        text: "And every transaction is cryptographically sealed into the decision ledger. If an auditor or regulator demands verification, the zero-knowledge proof verifies without leaking proprietary client data.",
        layerRef: 12,
        metricHighlight: 'Zero-Knowledge Verified',
        timestamp: '00:18'
      },
      {
        id: 'gen-3',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatarText: 'MV',
        badgeColor: 'from-amber-500 to-amber-700',
        text: "That is the power of the 100-layer architecture. We've eliminated legacy friction and replaced it with deterministic mathematical certainty.",
        layerRef: 41,
        metricHighlight: '100 Layers Active',
        timestamp: '00:33'
      }
    ]
  };
};

export const TelemetryPodcastPlayer: React.FC<TelemetryPodcastPlayerProps> = ({
  currentLayer,
  onSelectLayer,
  onOpenFullPodcast
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isSynthesizingNew, setIsSynthesizingNew] = useState<boolean>(false);
  const [synthSuccessMsg, setSynthSuccessMsg] = useState<string | null>(null);

  // Dynamic dialogue dataset
  const podcastData = generateLayerDialogue(currentLayer);
  const activeLine = podcastData.lines[currentLineIdx] || podcastData.lines[0];

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [mouthOpen, setMouthOpen] = useState<boolean>(false);
  const mouthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) setVoices(v);
      window.speechSynthesis.onvoiceschanged = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (mouthIntervalRef.current) {
        clearInterval(mouthIntervalRef.current);
      }
    };
  }, []);

  // Animate mouth flapping during active speech in Telemetry
  useEffect(() => {
    if (isPlaying) {
      mouthIntervalRef.current = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 180);
    } else {
      if (mouthIntervalRef.current) clearInterval(mouthIntervalRef.current);
      setMouthOpen(false);
    }
    return () => {
      if (mouthIntervalRef.current) clearInterval(mouthIntervalRef.current);
    };
  }, [isPlaying, currentLineIdx]);

  // Stop speech if layer changes
  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(false);
      if (synthRef.current) synthRef.current.cancel();
      setCurrentLineIdx(0);
    }
  }, [currentLayer]);

  const speakDialogueLine = (line: PodcastDialogue, onFinished?: () => void) => {
    if (!synthRef.current || isMuted) {
      if (onFinished) setTimeout(onFinished, Math.max(3000, line.text.length * 55) / playbackSpeed);
      return;
    }

    try {
      synthRef.current.cancel();

      if (synthRef.current.paused) {
        synthRef.current.resume();
      }

      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.rate = playbackSpeed;

      const avail = voices.length > 0 ? voices : synthRef.current.getVoices();

      // Pitch: Marcus deeper (0.85), Elena clearer/higher (1.15)
      if (line.speaker === 'marcus') {
        utterance.pitch = 0.85;
        const maleVoice = avail.find(v => 
          (v.name.toLowerCase().includes('male') || 
           v.name.toLowerCase().includes('david') || 
           v.name.toLowerCase().includes('george') || 
           v.name.toLowerCase().includes('daniel') ||
           v.name.toLowerCase().includes('james')) && v.lang.startsWith('en')
        );
        if (maleVoice) utterance.voice = maleVoice;
      } else {
        utterance.pitch = 1.15;
        const femaleVoice = avail.find(v => 
          (v.name.toLowerCase().includes('female') || 
           v.name.toLowerCase().includes('zira') || 
           v.name.toLowerCase().includes('samantha') || 
           v.name.toLowerCase().includes('victoria') ||
           v.name.toLowerCase().includes('karen') ||
           v.name.toLowerCase().includes('aria')) && v.lang.startsWith('en')
        );
        if (femaleVoice) utterance.voice = femaleVoice;
      }

      let ended = false;
      const finish = () => {
        if (!ended) {
          ended = true;
          if (onFinished) onFinished();
        }
      };

      utterance.onend = () => finish();
      utterance.onerror = () => finish();

      // Watchdog
      const watchdog = setTimeout(() => {
        if (!ended && isPlaying) finish();
      }, (line.text.length * 80) / playbackSpeed + 2000);

      const orig = utterance.onend;
      utterance.onend = (e) => {
        clearTimeout(watchdog);
        if (typeof orig === 'function') orig.call(utterance, e);
      };

      synthRef.current.speak(utterance);
    } catch {
      if (onFinished) setTimeout(onFinished, 3500 / playbackSpeed);
    }
  };

  const playSequence = (idx: number) => {
    if (idx >= podcastData.lines.length) {
      setIsPlaying(false);
      setCurrentLineIdx(0);
      return;
    }

    setCurrentLineIdx(idx);
    speakDialogueLine(podcastData.lines[idx], () => {
      if (isPlaying) {
        playSequence(idx + 1);
      }
    });
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (synthRef.current) synthRef.current.cancel();
    } else {
      setIsPlaying(true);
      playSequence(currentLineIdx);
    }
  };

  const handleLineClick = (idx: number) => {
    setCurrentLineIdx(idx);
    if (synthRef.current) synthRef.current.cancel();
    if (isPlaying) {
      playSequence(idx);
    } else {
      speakDialogueLine(podcastData.lines[idx]);
    }
  };

  const handleRegenerateVoiceBriefing = () => {
    setIsSynthesizingNew(true);
    setSynthSuccessMsg(null);
    if (synthRef.current) synthRef.current.cancel();
    setIsPlaying(false);

    setTimeout(() => {
      setIsSynthesizingNew(false);
      setSynthSuccessMsg('New 2-way conversational audio synthesized from active telemetry bus!');
      setCurrentLineIdx(0);
      setTimeout(() => setSynthSuccessMsg(null), 4000);
    }, 1400);
  };

  return (
    <div 
      id="telemetry-podcast-engine-player"
      className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-[#0a1122] to-slate-950 border border-amber-500/30 text-white font-mono shadow-xl relative overflow-hidden"
    >
      {/* Background Subtle Wave Glow */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
            <Radio className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-white' : 'text-slate-950'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AI Voice Synthesis • Podcast Engine
              </span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${
                isPlaying 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40 animate-pulse' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {isPlaying ? 'ON-AIR STREAMING' : 'AUDIO READY'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans truncate max-w-md">
              {podcastData.title}
            </p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={handleRegenerateVoiceBriefing}
            disabled={isSynthesizingNew}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition flex items-center gap-1.5 cursor-pointer"
            title="Re-synthesize conversational audio based on latest telemetry events"
          >
            <Zap className={`w-3 h-3 text-amber-400 ${isSynthesizingNew ? 'animate-spin' : ''}`} />
            <span className="text-[10px] hidden sm:inline">
              {isSynthesizingNew ? 'Synthesizing...' : 'Re-Synthesize'}
            </span>
          </button>

          {onOpenFullPodcast && (
            <button
              onClick={onOpenFullPodcast}
              className="px-2.5 py-1 rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
              title="Open full Dual-Host Studio with YouTube Syndicate & Reel Generator"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="text-[10px]">Studio &amp; Reels</span>
            </button>
          )}
        </div>
      </div>

      {synthSuccessMsg && (
        <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{synthSuccessMsg}</span>
        </div>
      )}

      {/* Main Dual-Host Speaker Visualizer & Active Transcript */}
      <div className="mt-3.5 grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
        
        {/* Left Column: Visual Host Indicators & Studio Desk (4 cols) */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-2.5">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-slate-300">
              <Radio className="w-3 h-3 text-rose-500 animate-pulse" /> Virtual Studio Desk
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
              isPlaying ? 'bg-rose-950 text-rose-300 border border-rose-600/50 animate-pulse' : 'bg-slate-800 text-slate-400'
            }`}>
              {isPlaying ? 'ON-AIR' : 'STANDBY'}
            </span>
          </div>

          {/* Mini Studio Desk Graphic */}
          <div className="relative rounded-lg overflow-hidden h-20 border border-slate-700/80 shadow-inner">
            <img 
              src={studioDeskImg} 
              alt="ECONOS Desk" 
              className="w-full h-full object-cover object-center filter brightness-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-1 left-2 text-[9px] font-mono text-cyan-300 bg-black/60 px-1.5 rounded">
              Two Virtual Hosts at Broadcast Console
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Host 1: Marcus */}
            <div className={`p-2 rounded-lg border transition-all flex flex-col justify-between ${
              activeLine.speaker === 'marcus' && isPlaying
                ? 'bg-amber-950/70 border-amber-500 text-amber-200 ring-2 ring-amber-500/40 shadow-lg animate-avatar-speaking animate-glow-amber'
                : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-2">
                <div className="relative shrink-0 w-9 h-9 rounded-lg overflow-hidden border border-amber-400 shadow-xs">
                  <img 
                    src={(activeLine.speaker === 'marcus' && isPlaying && mouthOpen) ? marcusTalkingImg : marcusImg} 
                    alt="Dr. Marcus Vance" 
                    className="w-full h-full object-cover"
                  />
                  {activeLine.speaker === 'marcus' && isPlaying && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                  )}
                  {activeLine.speaker === 'marcus' && isPlaying && (
                    <div className="absolute bottom-0 inset-x-0 bg-amber-500/90 text-slate-950 text-[6px] font-black text-center animate-mouth-talking">
                      TALK
                    </div>
                  )}
                </div>
                <div className="text-left overflow-hidden">
                  <div className="text-[11px] font-bold truncate">Dr. Marcus</div>
                  <div className="text-[8px] text-amber-400/90 font-mono">Macro Architect</div>
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[8px]">
                <span className="text-slate-500 font-mono">Left Mic</span>
                {activeLine.speaker === 'marcus' && isPlaying && (
                  <span className="px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-black animate-pulse">
                    SPEAKING
                  </span>
                )}
              </div>
            </div>

            {/* Host 2: Elena */}
            <div className={`p-2 rounded-lg border transition-all flex flex-col justify-between ${
              activeLine.speaker === 'elena' && isPlaying
                ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 ring-2 ring-cyan-500/40 shadow-lg animate-avatar-speaking animate-glow-cyan'
                : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-2">
                <div className="relative shrink-0 w-9 h-9 rounded-lg overflow-hidden border border-cyan-400 shadow-xs">
                  <img 
                    src={(activeLine.speaker === 'elena' && isPlaying && mouthOpen) ? elenaTalkingImg : elenaImg} 
                    alt="Elena Rostova" 
                    className="w-full h-full object-cover"
                  />
                  {activeLine.speaker === 'elena' && isPlaying && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
                  )}
                  {activeLine.speaker === 'elena' && isPlaying && (
                    <div className="absolute bottom-0 inset-x-0 bg-cyan-400/90 text-slate-950 text-[6px] font-black text-center animate-mouth-talking">
                      TALK
                    </div>
                  )}
                </div>
                <div className="text-left overflow-hidden">
                  <div className="text-[11px] font-bold truncate">Elena Rostova</div>
                  <div className="text-[8px] text-cyan-400/90 font-mono">AI Systems Lead</div>
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[8px]">
                <span className="text-slate-500 font-mono">Right Mic</span>
                {activeLine.speaker === 'elena' && isPlaying && (
                  <span className="px-1 py-0.2 rounded bg-cyan-400 text-slate-950 font-black animate-pulse">
                    SPEAKING
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Audio Transcript & Live Visual Wave (7 cols) */}
        <div className="md:col-span-7 bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3 h-3 text-amber-400" />
                Now Playing Line {currentLineIdx + 1} of {podcastData.lines.length}
              </span>
              {activeLine.metricHighlight && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-[9px]">
                  {activeLine.metricHighlight}
                </span>
              )}
            </div>

            {/* Active Dialogue Bubble */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs leading-relaxed text-slate-200">
              <span className={`font-bold mr-1.5 ${
                activeLine.speaker === 'marcus' ? 'text-amber-400' : 'text-cyan-400'
              }`}>
                [{activeLine.speakerName}]:
              </span>
              "{activeLine.text}"
            </div>
          </div>

          {/* Player Progress Bar & Timeline Clickers */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
            
            {/* Play/Pause Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition shadow-md cursor-pointer font-bold"
                title={isPlaying ? 'Pause conversation' : 'Play conversation'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  if (synthRef.current) synthRef.current.cancel();
                  setCurrentLineIdx(0);
                  setIsPlaying(false);
                }}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                title="Restart playback from beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                title={isMuted ? 'Unmute speech audio' : 'Mute speech audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Turn Buttons (Interactive Click-to-Jump) */}
            <div className="flex items-center gap-1">
              {podcastData.lines.map((ln, idx) => (
                <button
                  key={ln.id}
                  onClick={() => handleLineClick(idx)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                    currentLineIdx === idx
                      ? ln.speaker === 'marcus' ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                  }`}
                  title={`Jump to line ${idx + 1}`}
                >
                  Turn {idx + 1}
                </button>
              ))}
            </div>

            {/* Playback Speed Selector */}
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-slate-500 hidden sm:inline">Speed:</span>
              {[1.0, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    playbackSpeed === spd ? 'bg-slate-700 text-white font-bold' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
