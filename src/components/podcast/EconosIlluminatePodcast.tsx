import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Radio, 
  Youtube, 
  Film, 
  Sparkles, 
  Share2, 
  Download, 
  CheckCircle2, 
  Clock, 
  Mic, 
  Headphones, 
  Flame, 
  Layers, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Send,
  Zap,
  Check,
  Copy
} from 'lucide-react';

import marcusImg from '../../assets/images/marcus_vance_host_1790155174205.jpg';
import elenaImg from '../../assets/images/elena_rostova_host_1790155197061.jpg';
import studioDeskImg from '../../assets/images/podcast_studio_desk_1790155140572.jpg';

export interface DialogueLine {
  id: string;
  speaker: 'marcus' | 'elena';
  speakerName: string;
  role: string;
  avatar: string;
  color: string;
  text: string;
  timestamp: string;
  focusTopic: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  season: number;
  episode: number;
  description: string;
  dialogue: DialogueLine[];
  reelScript: {
    hook: string;
    body: string;
    callToAction: string;
    suggestedTags: string[];
  };
}

const EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-1',
    title: 'Deconstructing the 100-Layer Sovereign Stack',
    duration: '4:45',
    season: 1,
    episode: 1,
    description: 'Dr. Marcus Vance and Elena Rostova dissect how ECONOS replaces legacy fractional-reserve fragility with a zero-counterparty 100-layer autonomous architecture.',
    reelScript: {
      hook: "Did you know 94% of Fortune 500 capital reserves are trapped in legacy T+2 settlement friction? Here is how ECONOS fixed it.",
      body: "Elena Rostova and Dr. Marcus Vance uncover Layer 1 to 100: instantaneous atomic liquidity, cryptographic real-world asset collateral, and autonomous algorithmic governance.",
      callToAction: "Stream the full two-way breakdown in ECONOS Sovereign OS or deploy your node today.",
      suggestedTags: ['#ECONOS', '#FinTech', '#AutonomousFinance', '#AIReels', '#InstitutionalLiquidity', '#MacroEconomics']
    },
    dialogue: [
      {
        id: 'd-1',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatar: 'MV',
        color: 'from-amber-500 to-amber-700',
        text: "Welcome to ECONOS Illuminate. Today we're breaking down what traditional Wall Street thought was impossible: an autonomous, 100-layer institutional operating system that operates without counterparty risk.",
        timestamp: '00:04',
        focusTopic: 'Introduction & Sovereign Architecture'
      },
      {
        id: 'd-2',
        speaker: 'elena',
        speakerName: 'Elena Rostova',
        role: 'AI & Autonomous Governance Lead',
        avatar: 'ER',
        color: 'from-cyan-500 to-blue-600',
        text: "Thanks Marcus! What fascinates me most is the velocity jump. Traditional cross-border settlements take 48 to 72 hours. In ECONOS Layer 23 through 45, autonomous agent swarms clear atomic transfers in 0.04 seconds.",
        timestamp: '00:18',
        focusTopic: 'Atomic Velocity vs Legacy T+2'
      },
      {
        id: 'd-3',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatar: 'MV',
        color: 'from-amber-500 to-amber-700',
        text: "Exactly. And let's look at Layer 62—the autonomous Section 41 R&D tax credit engine. It continuously monitors engineering telemetry and converts eligible innovation into liquid capital yields in real time.",
        timestamp: '00:32',
        focusTopic: 'Layer 62 R&D Capital Compounding'
      },
      {
        id: 'd-4',
        speaker: 'elena',
        speakerName: 'Elena Rostova',
        role: 'AI & Autonomous Governance Lead',
        avatar: 'ER',
        color: 'from-cyan-500 to-blue-600',
        text: "Which feeds directly into the sovereign reserve vaults. We aren't relying on fiat promises; every tokenized asset is backed by verifiable mathematical proofs across all 100 layers.",
        timestamp: '00:46',
        focusTopic: 'Mathematical Verifiability'
      },
      {
        id: 'd-5',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatar: 'MV',
        color: 'from-amber-500 to-amber-700',
        text: "That is the fundamental breakthrough. Legacy banks operate on trust and debt. ECONOS operates on deterministic execution and algorithmic capital preservation.",
        timestamp: '01:00',
        focusTopic: 'The Death of Fractional Reserves'
      }
    ]
  },
  {
    id: 'ep-2',
    title: 'Autonomous Swarms & Zero-Knowledge Tax Clearance',
    duration: '5:12',
    season: 1,
    episode: 2,
    description: 'A deep dive into Layer 29 and Layer 62: continuous automated tax optimization and multi-tenant cryptographic liquidity pools.',
    reelScript: {
      hook: "Taxes are no longer an annual retrospective nightmare. In ECONOS, they are resolved every single second.",
      body: "Autonomous zero-knowledge algorithms verify compliance without exposing proprietary financial books, turning tax drag into compounded yield.",
      callToAction: "Watch the full podcast inside the ECONOS Command Center.",
      suggestedTags: ['#ZeroKnowledge', '#TaxAutomation', '#AIAgents', '#ECONOS', '#Web3Tech']
    },
    dialogue: [
      {
        id: 'd-201',
        speaker: 'elena',
        speakerName: 'Elena Rostova',
        role: 'AI & Autonomous Governance Lead',
        avatar: 'ER',
        color: 'from-cyan-500 to-blue-600',
        text: "Marcus, institutional partners keep asking us: how does the ECONOS 100-layer stack coordinate between business operations, wealth offices, and multi-generational trusts without regulatory collision?",
        timestamp: '00:05',
        focusTopic: 'Zero-Knowledge Compliance'
      },
      {
        id: 'd-202',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatar: 'MV',
        color: 'from-amber-500 to-amber-700',
        text: "The secret is our Layer 29 and Layer 62 cross-mesh. Instead of dumping raw books to external auditors, zero-knowledge proofs mathematically verify statutory tax clearance, while Layer 42 generates a synthetic real-time balance sheet every block.",
        timestamp: '00:21',
        focusTopic: 'Cryptographic Secrecy + Synthetic Balance Sheet'
      },
      {
        id: 'd-203',
        speaker: 'elena',
        speakerName: 'Elena Rostova',
        role: 'AI & Autonomous Governance Lead',
        avatar: 'ER',
        color: 'from-cyan-500 to-blue-600',
        text: "And don't forget the Sovereign Command 4-quadrant OS! If a macro contagion hits international repo markets, Quadrant 2 instantly fires autonomous delta-neutral hedges, protecting enterprise treasury liquidity in under 1 millisecond.",
        timestamp: '00:38',
        focusTopic: '4-Quadrant Sovereign Risk Isolation'
      },
      {
        id: 'd-204',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatar: 'MV',
        color: 'from-amber-500 to-amber-700',
        text: "Exactly Elena. And with our 10 automated problem solvers—from lead discovery to autonomous voice calling—a company doesn't just survive economic volatility; it continuously compounds sovereign yield.",
        timestamp: '00:54',
        focusTopic: 'Autonomous Yield & Enterprise Solvency'
      }
    ]
  },
  {
    id: 'ep-3',
    title: 'The Sovereign Command: 4 Quadrants & Institutional OS',
    duration: '6:15',
    season: 1,
    episode: 3,
    description: 'Dr. Marcus and Elena breakdown the 4-Quadrant Institutional OS, post-quantum enclave cryptography, and how traditional banking failure becomes obsolete.',
    reelScript: {
      hook: "Why is traditional banking terrified of ECONOS Sovereign Command? Because fractional reserve bank runs are mathematically prevented.",
      body: "Elena and Marcus demonstrate how 4 autonomous risk enclaves maintain 100% solvency even during global liquidity shocks.",
      callToAction: "Experience the Sovereign Command Center live in ECONOS.",
      suggestedTags: ['#SovereignCommand', '#MacroFinance', '#EnclaveSecurity', '#ECONOS', '#BankingRevolution']
    },
    dialogue: [
      {
        id: 'd-301',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatar: 'MV',
        color: 'from-amber-500 to-amber-700',
        text: "Elena, look at the Sovereign Command telemetry right now. All 100 layers are running at 100% solvency with zero counterparty contagion. Traditional bank credit freezes simply cannot happen here.",
        timestamp: '00:04',
        focusTopic: '100% Solvency Architecture'
      },
      {
        id: 'd-302',
        speaker: 'elena',
        speakerName: 'Elena Rostova',
        role: 'AI & Autonomous Governance Lead',
        avatar: 'ER',
        color: 'from-cyan-500 to-blue-600',
        text: "That's because every single dollar or asset token is backed by real-world cryptographic collateral in our Post-Quantum Enclaves at Layer 35. Even quantum computing attacks can't penetrate the sovereign vaults.",
        timestamp: '00:19',
        focusTopic: 'Post-Quantum Vaults'
      },
      {
        id: 'd-303',
        speaker: 'marcus',
        speakerName: 'Dr. Marcus Vance',
        role: 'Chief Macro Systems Architect',
        avatar: 'MV',
        color: 'from-amber-500 to-amber-700',
        text: "This is what enterprise leadership has been craving: true financial sovereignty, continuous automated tax shielding, and real-time execution that never sleeps.",
        timestamp: '00:36',
        focusTopic: 'True Enterprise Sovereignty'
      }
    ]
  }
];

export interface EconosIlluminatePodcastProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const EconosIlluminatePodcast: React.FC<EconosIlluminatePodcastProps> = ({
  isOpen = true,
  onClose
}) => {
  const [selectedEp, setSelectedEp] = useState<PodcastEpisode>(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'listen' | 'reel_generator' | 'youtube_syndicate'>('listen');
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // YouTube / Reel publishing simulation state
  const [isGeneratingReel, setIsGeneratingReel] = useState<boolean>(false);
  const [reelGenerated, setReelGenerated] = useState<boolean>(false);
  const [reelProgress, setReelProgress] = useState<number>(0);
  const [reelCurrentStage, setReelCurrentStage] = useState<string>('');
  const [isReelPlaying, setIsReelPlaying] = useState<boolean>(false);
  const [reelPlaybackTime, setReelPlaybackTime] = useState<number>(0);
  const [isPublishingToYoutube, setIsPublishingToYoutube] = useState<boolean>(false);
  const [youtubePublishedUrl, setYoutubePublishedUrl] = useState<string | null>(null);

  // Custom User Prompt / Ask the Hosts
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [liveAnswer, setLiveAnswer] = useState<{ speaker: 'marcus' | 'elena'; name: string; text: string } | null>(null);

  // Speech synthesis ref
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const reelTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (reelTimerRef.current) {
        clearInterval(reelTimerRef.current);
      }
    };
  }, []);

  const speakLine = (line: DialogueLine, onEnd?: () => void) => {
    if (!synthRef.current || isMuted) {
      if (onEnd) setTimeout(onEnd, 3500 / audioSpeed);
      return;
    }

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(line.text);
    utterance.rate = audioSpeed;
    
    // Choose voice characteristics: Marcus deeper/lower pitch, Elena slightly higher pitch
    if (line.speaker === 'marcus') {
      utterance.pitch = 0.85;
    } else {
      utterance.pitch = 1.15;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    synthRef.current.speak(utterance);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (synthRef.current) synthRef.current.cancel();
    } else {
      setIsPlaying(true);
      playSequence(currentLineIndex);
    }
  };

  const playSequence = (index: number) => {
    if (index >= selectedEp.dialogue.length) {
      setIsPlaying(false);
      setCurrentLineIndex(0);
      return;
    }

    setCurrentLineIndex(index);
    const line = selectedEp.dialogue[index];
    speakLine(line, () => {
      if (isPlaying) {
        playSequence(index + 1);
      }
    });
  };

  const handleLineClick = (idx: number) => {
    setCurrentLineIndex(idx);
    if (synthRef.current) synthRef.current.cancel();
    if (isPlaying) {
      playSequence(idx);
    } else {
      speakLine(selectedEp.dialogue[idx]);
    }
  };

  const handleGenerateReel = () => {
    setIsGeneratingReel(true);
    setReelGenerated(false);
    setReelProgress(0);
    setReelCurrentStage('Stage 1/4: Analyzing episode audio & detecting peak virality hook...');

    const stages = [
      { progress: 25, stage: 'Stage 1/4: Analyzing episode dialogue & extracting viral 60s hook...' },
      { progress: 50, stage: 'Stage 2/4: Synthesizing 9:16 vertical video layout & typography motion...' },
      { progress: 75, stage: 'Stage 3/4: Generating synchronized animated waveforms & audio cues...' },
      { progress: 95, stage: 'Stage 4/4: Encoding MP4 H.264 stream & sealing watermark proofs...' },
      { progress: 100, stage: 'Render Complete: Ready for immediate preview playback & syndication!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < stages.length) {
        setReelProgress(stages[currentStep].progress);
        setReelCurrentStage(stages[currentStep].stage);
      } else {
        clearInterval(interval);
        setIsGeneratingReel(false);
        setReelGenerated(true);
        setReelProgress(100);
      }
    }, 700);
  };

  const handlePlayReelAudio = () => {
    if (isReelPlaying) {
      setIsReelPlaying(false);
      if (synthRef.current) synthRef.current.cancel();
      if (reelTimerRef.current) clearInterval(reelTimerRef.current);
      setReelPlaybackTime(0);
      return;
    }

    setIsReelPlaying(true);
    setReelPlaybackTime(0);

    // Speak Hook then Body
    const script = `${selectedEp.reelScript.hook}. ${selectedEp.reelScript.body}. ${selectedEp.reelScript.callToAction}`;
    if (synthRef.current && !isMuted) {
      synthRef.current.cancel();
      const u = new SpeechSynthesisUtterance(script);
      u.rate = 1.05;
      u.pitch = 1.02;
      u.onend = () => {
        setIsReelPlaying(false);
        setReelPlaybackTime(0);
        if (reelTimerRef.current) clearInterval(reelTimerRef.current);
      };
      u.onerror = () => {
        setIsReelPlaying(false);
        if (reelTimerRef.current) clearInterval(reelTimerRef.current);
      };
      synthRef.current.speak(u);
    }

    // Playback progress ticker (18 seconds demo representation)
    reelTimerRef.current = setInterval(() => {
      setReelPlaybackTime(prev => {
        if (prev >= 18) {
          if (reelTimerRef.current) clearInterval(reelTimerRef.current);
          setIsReelPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handlePublishToYoutube = () => {
    setIsPublishingToYoutube(true);
    setTimeout(() => {
      setIsPublishingToYoutube(false);
      const generatedId = `ECONOS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setYoutubePublishedUrl(`https://youtube.com/shorts/${generatedId}?econos_syndication=active`);
    }, 2200);
  };

  const handleAskHosts = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsAsking(true);
    setLiveAnswer(null);

    setTimeout(() => {
      setIsAsking(false);
      const isElena = Math.random() > 0.5;
      const hostAnswer = isElena 
        ? {
            speaker: 'elena' as const,
            name: 'Elena Rostova',
            text: `Great question regarding "${userQuestion}". In Layer 45 through 62, autonomous agents parse that exact constraint directly on-chain, eliminating 100% of human settlement friction.`
          }
        : {
            speaker: 'marcus' as const,
            name: 'Dr. Marcus Vance',
            text: `Analyzing "${userQuestion}" from a macro-solvency viewpoint: ECONOS isolates that exact risk mathematically in the post-quantum enclaves, ensuring your capital remains 100% sovereign.`
          };
      setLiveAnswer(hostAnswer);
      
      // Auto speak the response
      if (synthRef.current && !isMuted) {
        const u = new SpeechSynthesisUtterance(hostAnswer.text);
        u.pitch = hostAnswer.speaker === 'marcus' ? 0.85 : 1.15;
        synthRef.current.speak(u);
      }
      setUserQuestion('');
    }, 1200);
  };

  const currentSpeaker = selectedEp.dialogue[currentLineIndex]?.speaker || 'marcus';

  if (!isOpen) return null;

  const content = (
    <div id="econos-illuminate-podcast-studio" className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-slate-100 font-sans">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0b1324] via-[#101c36] to-[#0d172e] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                ECONOS ILLUMINATE DUAL-HOST ENGINE
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Two-Way AI Synthesis
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-semibold flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-rose-400" />
                Auto-Reel & YouTube Shorts
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>Two-Way ECONOS Podcast & Reel Syndicate</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Experience dynamic two-way conversation between Chief Macro Architect <span className="text-amber-300 font-semibold">Dr. Marcus Vance</span> and AI Systems Lead <span className="text-cyan-300 font-semibold">Elena Rostova</span> as they deconstruct the 100-layer sovereign stack, generate viral vertical reels, and syndicate automatically to YouTube.
            </p>
          </div>

          {/* Quick Stats & Close Button */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 font-mono text-xs items-end">
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition cursor-pointer font-bold self-end"
              >
                ✕ Close Studio
              </button>
            )}
            <div className="flex gap-2">
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl px-4 py-3 min-w-[130px]">
                <div className="text-slate-400 text-[10px] uppercase">Dual Hosts</div>
                <div className="text-base font-bold text-cyan-400">Dr. Marcus & Elena</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl px-4 py-3 min-w-[130px]">
                <div className="text-slate-400 text-[10px] uppercase">YouTube Syndicate</div>
                <div className="text-base font-bold text-rose-400 flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-rose-500" /> Ready to Post
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('listen')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'listen'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Headphones className="w-4 h-4" />
            1. Dual-Host Studio
          </button>

          <button
            onClick={() => setActiveTab('reel_generator')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'reel_generator'
                ? 'bg-rose-500 text-white shadow-md font-bold'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Film className="w-4 h-4" />
            2. 60s Reel Generator
          </button>

          <button
            onClick={() => setActiveTab('youtube_syndicate')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'youtube_syndicate'
                ? 'bg-red-600 text-white shadow-md font-bold'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Youtube className="w-4 h-4" />
            3. YouTube Shorts Auto-Publisher
          </button>
        </div>
      </div>

      {/* TAB 1: DUAL-HOST PODCAST LISTENER */}
      {activeTab === 'listen' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Visualizer & Audio Stage (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Visual Dual-Host Stage Card with Virtual Studio Desk */}
            <div className="rounded-3xl bg-[#091122] border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-xl">
              
              {/* Active Speaker Dynamic Banner */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    {isPlaying ? 'Live Two-Way Broadcast Active • Studio Desk On-Air' : 'Studio Idle – Press Play to Start'}
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
                  Topic: {selectedEp.dialogue[currentLineIndex]?.focusTopic || 'Sovereign Architecture'}
                </div>
              </div>

              {/* VIRTUAL BROADCAST DESK SCENE WITH TWO CO-HOSTS */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl mb-6 bg-slate-950">
                {/* Background Studio Desk Image */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <img 
                    src={studioDeskImg} 
                    alt="ECONOS Broadcast Desk Studio"
                    className="w-full h-full object-cover object-center filter brightness-90 hover:brightness-100 transition duration-500"
                  />
                  {/* Subtle Studio Overlay Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-950/20 via-transparent to-cyan-950/20 pointer-events-none" />

                  {/* "ON AIR" Live Sign */}
                  <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-lg border ${
                      isPlaying 
                        ? 'bg-rose-600 text-white border-rose-400 animate-pulse' 
                        : 'bg-slate-900/80 text-slate-400 border-slate-700'
                    }`}>
                      <Radio className="w-3 h-3" />
                      {isPlaying ? 'ON AIR' : 'OFF AIR'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-slate-700">
                      ECONOS STUDIO A
                    </span>
                  </div>

                  {/* Studio Hologram Telemetry Badge */}
                  <div className="absolute top-3 right-4 z-20 hidden sm:flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      100 Layers Active
                    </span>
                  </div>

                  {/* VIRTUAL HOST OVERLAYS AT DESK */}
                  {/* Left Co-Host: Dr. Marcus Vance */}
                  <div className={`absolute bottom-3 left-3 sm:left-6 z-20 p-2 sm:p-3 rounded-2xl backdrop-blur-md transition-all duration-300 max-w-[210px] sm:max-w-[260px] border ${
                    currentSpeaker === 'marcus' && isPlaying
                      ? 'bg-amber-950/90 border-amber-400 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50 scale-102'
                      : 'bg-black/75 border-slate-700/80 opacity-85'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <img 
                          src={marcusImg} 
                          alt="Dr. Marcus Vance" 
                          className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl object-cover border-2 border-amber-400 shadow-md"
                        />
                        {currentSpeaker === 'marcus' && isPlaying && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full animate-ping" />
                        )}
                        <span className="absolute bottom-0 right-0 px-1 py-0.2 rounded bg-amber-500 text-slate-950 text-[8px] font-black">
                          HOST
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <span className="font-extrabold text-xs sm:text-sm text-white">Dr. Marcus Vance</span>
                          <Mic className={`w-3 h-3 ${currentSpeaker === 'marcus' && isPlaying ? 'text-amber-400 animate-bounce' : 'text-slate-500'}`} />
                        </div>
                        <div className="text-[10px] text-amber-300/90 font-mono">Macro Architect</div>
                        <div className="text-[9px] text-slate-300">Desk Position: Left Mic</div>
                      </div>
                    </div>

                    {/* Active Voice Waveform */}
                    <div className="mt-2 flex items-center gap-1 h-3.5">
                      {currentSpeaker === 'marcus' && isPlaying ? (
                        [40, 80, 55, 100, 65, 85, 45, 95, 70, 50, 85, 60].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-amber-400 rounded-full transition-all duration-150"
                            style={{ height: `${h}%` }}
                          />
                        ))
                      ) : (
                        <div className="w-full text-[9px] text-slate-400 font-mono italic">Mic on standby...</div>
                      )}
                    </div>
                  </div>

                  {/* Right Co-Host: Elena Rostova */}
                  <div className={`absolute bottom-3 right-3 sm:right-6 z-20 p-2 sm:p-3 rounded-2xl backdrop-blur-md transition-all duration-300 max-w-[210px] sm:max-w-[260px] border ${
                    currentSpeaker === 'elena' && isPlaying
                      ? 'bg-cyan-950/90 border-cyan-400 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/50 scale-102'
                      : 'bg-black/75 border-slate-700/80 opacity-85'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <img 
                          src={elenaImg} 
                          alt="Elena Rostova" 
                          className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl object-cover border-2 border-cyan-400 shadow-md"
                        />
                        {currentSpeaker === 'elena' && isPlaying && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full animate-ping" />
                        )}
                        <span className="absolute bottom-0 right-0 px-1 py-0.2 rounded bg-cyan-400 text-slate-950 text-[8px] font-black">
                          HOST
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <span className="font-extrabold text-xs sm:text-sm text-white">Elena Rostova</span>
                          <Mic className={`w-3 h-3 ${currentSpeaker === 'elena' && isPlaying ? 'text-cyan-400 animate-bounce' : 'text-slate-500'}`} />
                        </div>
                        <div className="text-[10px] text-cyan-300/90 font-mono">Autonomous AI Lead</div>
                        <div className="text-[9px] text-slate-300">Desk Position: Right Mic</div>
                      </div>
                    </div>

                    {/* Active Voice Waveform */}
                    <div className="mt-2 flex items-center gap-1 h-3.5">
                      {currentSpeaker === 'elena' && isPlaying ? (
                        [50, 90, 60, 95, 45, 80, 75, 100, 65, 80, 50, 70].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-cyan-400 rounded-full transition-all duration-150"
                            style={{ height: `${h}%` }}
                          />
                        ))
                      ) : (
                        <div className="w-full text-[9px] text-slate-400 font-mono italic">Mic on standby...</div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Live Prompter / Current Subtitle */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-slate-800 min-h-[95px] flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] font-bold">
                  <span className={`w-2 h-2 rounded-full ${currentSpeaker === 'marcus' ? 'bg-amber-400' : 'bg-cyan-400'} animate-pulse`} />
                  <span className={currentSpeaker === 'marcus' ? 'text-amber-400' : 'text-cyan-400'}>
                    {currentSpeaker === 'marcus' ? 'Dr. Marcus Vance (Broadcasting):' : 'Elena Rostova (Broadcasting):'}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed italic max-w-2xl">
                  &ldquo;{selectedEp.dialogue[currentLineIndex]?.text}&rdquo;
                </p>
              </div>

              {/* Master Player Controls */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayToggle}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    {isPlaying ? 'Pause Episode' : 'Play Illuminate Stream'}
                  </button>

                  <button
                    onClick={() => {
                      if (synthRef.current) synthRef.current.cancel();
                      setCurrentLineIndex(0);
                      setIsPlaying(false);
                    }}
                    className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (synthRef.current) synthRef.current.cancel();
                    }}
                    className={`p-2.5 rounded-full border transition cursor-pointer ${
                      isMuted 
                        ? 'bg-rose-950/50 border-rose-600/50 text-rose-400' 
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                    title={isMuted ? 'Unmute voice engine' : 'Mute voice engine'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="text-slate-500 mr-1 text-[11px]">Speed:</span>
                  {[1.0, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setAudioSpeed(spd)}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition cursor-pointer ${
                        audioSpeed === spd
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Interactive "Ask the Hosts" Two-Way Box */}
            <div className="rounded-3xl bg-[#091122] border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-sm sm:text-base text-white">Join the Conversation: Ask Marcus & Elena</h3>
                </div>
                <span className="text-[10px] font-mono uppercase bg-slate-800/80 px-2.5 py-1 rounded-full text-slate-400 border border-slate-700">
                  Instant Two-Way Response
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Type any question about ECONOS sovereign layers, R&D tax credits, or fractional reserve alternatives. Dr. Vance or Elena will answer live.
              </p>

              <form onSubmit={handleAskHosts} className="flex gap-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="e.g. How does Layer 62 compound R&D tax credits continuously?"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={isAsking || !userQuestion.trim()}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  {isAsking ? <Zap className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  Ask
                </button>
              </form>

              {liveAnswer && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Live Answer from {liveAnswer.name}:
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    "{liveAnswer.text}"
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Episode Dialogue Interactive Transcript (1 Col) */}
          <div className="space-y-4">
            <div className="rounded-3xl bg-[#091122] border border-slate-800 p-6 shadow-xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Interactive Transcript
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  Click line to seek & play
                </div>
              </div>

              {/* Scrollable Transcript */}
              <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1">
                {selectedEp.dialogue.map((line, idx) => {
                  const isActive = idx === currentLineIndex;
                  const isMarcus = line.speaker === 'marcus';

                  return (
                    <div
                      key={line.id}
                      onClick={() => handleLineClick(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs ${
                        isActive
                          ? isMarcus 
                            ? 'bg-amber-950/40 border-amber-500/60 shadow-md' 
                            : 'bg-cyan-950/40 border-cyan-500/60 shadow-md'
                          : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                        <span className={`font-bold ${isMarcus ? 'text-amber-400' : 'text-cyan-400'}`}>
                          {line.speakerName}
                        </span>
                        <span className="text-slate-500">{line.timestamp}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {line.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Episode selector footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">Current: Season {selectedEp.season}, Ep {selectedEp.episode}</span>
                <button
                  onClick={() => {
                    const nextEp = selectedEp.id === 'ep-1' ? EPISODES[1] : EPISODES[0];
                    setSelectedEp(nextEp);
                    setCurrentLineIndex(0);
                    if (synthRef.current) synthRef.current.cancel();
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Switch Episode <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: 60-SECOND REEL GENERATOR */}
      {activeTab === 'reel_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Reel Preview Stage (9:16 Vertical Phone Simulator) */}
          <div className="flex flex-col items-center justify-center p-6 bg-[#091122] border border-slate-800 rounded-3xl">
            <div className="w-[280px] h-[520px] rounded-3xl bg-slate-950 border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
              
              {/* Vertical Header Bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/80 z-10 pt-2">
                <span className="bg-rose-600 px-2 py-0.5 rounded-full font-bold">REEL #1</span>
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${isReelPlaying ? 'bg-emerald-400 animate-ping' : isGeneratingReel ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'}`} />
                  {isGeneratingReel ? 'RENDERING...' : isReelPlaying ? `00:${String(reelPlaybackTime).padStart(2, '0')} / 00:18` : 'READY'}
                </span>
              </div>

              {/* Dynamic Animated Waveform Center / Active Render Overlay */}
              <div className="my-auto space-y-4 text-center z-10">
                {isGeneratingReel ? (
                  <div className="space-y-3 py-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-cyan-500 p-0.5 animate-spin">
                      <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xs font-bold text-amber-300">
                        {reelProgress}%
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-amber-300 animate-pulse">
                      Rendering 9:16 MP4 Video...
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono px-2 leading-relaxed">
                      {reelCurrentStage}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-cyan-500 p-0.5 shadow-lg shadow-rose-500/30">
                      <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xs font-bold text-white relative">
                        {isReelPlaying ? (
                          <div className="flex items-end gap-0.5 h-6">
                            <span className="w-1 bg-amber-400 animate-pulse h-4 rounded-full" />
                            <span className="w-1 bg-rose-400 animate-pulse h-6 rounded-full" />
                            <span className="w-1 bg-cyan-400 animate-pulse h-3 rounded-full" />
                            <span className="w-1 bg-emerald-400 animate-pulse h-5 rounded-full" />
                          </div>
                        ) : (
                          <span>9:16</span>
                        )}
                      </div>
                    </div>

                    <div className="px-2">
                      <h4 className="text-xs font-extrabold text-white leading-tight uppercase tracking-wide">
                        {selectedEp.reelScript.hook}
                      </h4>
                    </div>

                    <div className="bg-black/70 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-200 leading-snug">
                      {selectedEp.reelScript.body}
                    </div>

                    {/* Preview Play/Pause Trigger inside phone */}
                    <div className="pt-1">
                      <button
                        onClick={handlePlayReelAudio}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center gap-1.5 mx-auto transition shadow-md cursor-pointer"
                      >
                        {isReelPlaying ? (
                          <>
                            <Pause className="w-3 h-3 fill-slate-950" /> Pause Preview
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-slate-950 ml-0.5" /> Play Video Preview
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Reel Footer & CTA */}
              <div className="z-10 space-y-2 pb-2">
                <div className="text-[9px] text-amber-300 font-mono text-center font-bold">
                  {selectedEp.reelScript.callToAction}
                </div>
                <div className="flex justify-center gap-1 flex-wrap text-[8px] text-cyan-400 font-mono">
                  {selectedEp.reelScript.suggestedTags.slice(0, 3).join(' ')}
                </div>
              </div>

              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/40 via-slate-950 to-rose-950/40 pointer-events-none" />
            </div>

            <p className="text-xs text-slate-400 font-mono mt-4 text-center">
              Live 9:16 Vertical Video Preview • Click &quot;Play Video Preview&quot; to test synthesized speech &amp; captions
            </p>
          </div>

          {/* Reel Parameters & Script Exporter */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#091122] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-rose-400" />
                  Autonomous Short-Form Video Synthesizer
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Extracts high-engagement 45-60 second dialogue bites from the podcast and structures them into high-converting viral reels.
                </p>
              </div>

              {/* Reel Generation Action */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300">Target Video Format</span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800">
                    1080x1920 (9:16 Vertical) • ~2.8s AI Render
                  </span>
                </div>

                <button
                  onClick={handleGenerateReel}
                  disabled={isGeneratingReel}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition cursor-pointer"
                >
                  {isGeneratingReel ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Rendering Video: {reelProgress}% Complete...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate New AI Reel from Episode
                    </>
                  )}
                </button>

                {/* Real-time Render Progress Tracker */}
                {isGeneratingReel && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Activity className="w-3 h-3 animate-spin" /> Live Video Generation
                      </span>
                      <span className="text-slate-300">{reelProgress}%</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${reelProgress}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {reelCurrentStage}
                    </div>
                  </div>
                )}

                {reelGenerated && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex flex-col gap-1.5 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Reel rendered & verified in preview simulator!
                    </div>
                    <p className="text-[11px] text-emerald-200/80">
                      Audio, waveform animations, and synced captions are ready. Click &quot;Play Video Preview&quot; in the phone display on the left to watch.
                    </p>
                  </div>
                )}
              </div>

              {/* Structured Reel Script & Copy Tool */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate-400 font-bold">Generated Reel Script</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `HOOK:\n${selectedEp.reelScript.hook}\n\nBODY:\n${selectedEp.reelScript.body}\n\nCTA:\n${selectedEp.reelScript.callToAction}\n\nTAGS:\n${selectedEp.reelScript.suggestedTags.join(' ')}`
                      );
                      setCopiedScript(true);
                      setTimeout(() => setCopiedScript(false), 2000);
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedScript ? 'Copied to Clipboard' : 'Copy Script'}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-xs space-y-3 font-mono">
                  <div>
                    <span className="text-amber-400 font-bold">1. Hook (0:00 - 0:05):</span>
                    <p className="text-slate-300 mt-0.5">{selectedEp.reelScript.hook}</p>
                  </div>
                  <div>
                    <span className="text-cyan-400 font-bold">2. Body (0:05 - 0:45):</span>
                    <p className="text-slate-300 mt-0.5">{selectedEp.reelScript.body}</p>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold">3. Call to Action (0:45 - 0:60):</span>
                    <p className="text-slate-300 mt-0.5">{selectedEp.reelScript.callToAction}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 3: YOUTUBE SHORTS SYNDICATE & PUBLISHER */}
      {activeTab === 'youtube_syndicate' && (
        <div className="rounded-3xl bg-[#091122] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Youtube className="w-6 h-6 text-red-500" />
                Automated YouTube Shorts Syndication Engine
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Publish podcast episodes, reels, and video overviews directly to your official YouTube channel with automated metadata, chapters, and hashtags.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Channel Connected: @EconosSovereign
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Metadata Configuration */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-slate-400 font-bold">Video Title</label>
                <input
                  type="text"
                  readOnly
                  value={`ECONOS 100-Layer Sovereign Stack Breakdown #Shorts #FinTech`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-slate-400 font-bold">Automated Description & Chapters</label>
                <textarea
                  readOnly
                  rows={5}
                  value={`Dr. Marcus Vance and Elena Rostova breakdown how the ECONOS 100-Layer Sovereign OS completely eliminates counterparty risk and unlocks atomic sub-second liquidity.\n\n0:00 - Introduction to ECONOS\n0:18 - Atomic Settlement Velocity (0.04s)\n0:32 - Layer 62 Continuous R&D Tax Yields\n0:46 - Mathematical Verifiability\n\nExperience the live system: https://econos.systems`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 font-mono leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-400 font-bold">Optimized Video Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedEp.reelScript.suggestedTags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Publishing Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-white">Direct Upload Status</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click below to publish the generated video reel directly to YouTube Shorts with public visibility and automated indexing.
                </p>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Target:</span>
                    <span className="text-white">YouTube Shorts</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Visibility:</span>
                    <span className="text-emerald-400">Public</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Category:</span>
                    <span className="text-white">Science & Technology</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePublishToYoutube}
                  disabled={isPublishingToYoutube}
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition cursor-pointer disabled:opacity-50"
                >
                  {isPublishingToYoutube ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Uploading & Syndicating to YouTube...
                    </>
                  ) : (
                    <>
                      <Youtube className="w-4 h-4" />
                      Post Reel to YouTube Now
                    </>
                  )}
                </button>

                {youtubePublishedUrl && (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Successfully Published!
                    </div>
                    <p className="text-[11px] text-slate-300 break-all font-mono">
                      {youtubePublishedUrl}
                    </p>
                    <a
                      href={youtubePublishedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline pt-1"
                    >
                      View on YouTube Shorts <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );

  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div className="relative w-full max-w-7xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#070d18] border border-cyan-500/40 shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
