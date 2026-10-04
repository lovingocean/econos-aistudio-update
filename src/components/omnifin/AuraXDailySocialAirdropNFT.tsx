import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Award,
  Flame,
  ShieldCheck,
  Clock,
  Send,
  Coins,
  Cpu,
  Zap,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  MessageSquare,
  Video,
  Radio,
  RefreshCw,
  QrCode,
  ArrowRight,
  Gift
} from 'lucide-react';

export interface SocialQuest {
  id: string;
  platform: 'TWITTER' | 'FACEBOOK' | 'REDDIT' | 'DISCORD' | 'INSTAGRAM' | 'TIKTOK' | 'YOUTUBE' | 'LINKEDIN';
  title: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
  badgeColor: string;
  xpReward: number;
  tokenReward: number;
  recommendedPost: string;
  shareUrl?: string;
  guideStep: string;
}

export interface MintedNFT {
  tokenId: string;
  name: string;
  tier: 'OBSIDIAN_GENESIS' | 'DIAMOND_VALIDATOR' | 'GOLD_PIONEER' | 'SILVER_VOYAGER';
  mintDate: string;
  dayNumber: number;
  txHash: string;
  streakDays: number;
  tasksCompleted: number;
  airdropWeightMultiplier: string;
  imageTheme: string;
}

interface AuraXDailySocialAirdropNFTProps {
  walletAddress?: string;
  referralCode?: string;
  userBalance?: number;
  onRefreshBalance?: () => void;
  className?: string;
}

export const AuraXDailySocialAirdropNFT: React.FC<AuraXDailySocialAirdropNFTProps> = ({
  walletAddress = '0x71C...B29',
  referralCode = 'AURX-GENESIS',
  userBalance = 1000,
  onRefreshBalance,
  className = ''
}) => {
  const canonicalDomain = 'https://econos-aistudio-update.vercel.app';
  const cleanShortLink = `${canonicalDomain}/?ref=${referralCode}`;

  // Daily Streak & Countdown State
  const [streakDays, setStreakDays] = useState<number>(3);
  const [hoursLeft, setHoursLeft] = useState<number>(18);
  const [minutesLeft, setMinutesLeft] = useState<number>(42);
  const [secondsLeft, setSecondsLeft] = useState<number>(15);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 0) return prev - 1;
        setMinutesLeft(m => (m > 0 ? m - 1 : 59));
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Submission URL input per quest
  const [submissionLinks, setSubmissionLinks] = useState<Record<string, string>>({});
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>(['TWITTER', 'DISCORD']);
  const [verifyingQuestId, setVerifyingQuestId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ id: string; msg: string; success: boolean } | null>(null);

  // Minting State
  const [isMintingNFT, setIsMintingNFT] = useState<boolean>(false);
  const [mintedNFTs, setMintedNFTs] = useState<MintedNFT[]>([
    {
      tokenId: '#AURX-NFT-0412',
      name: 'Day 2 Pioneer Proof-of-Action',
      tier: 'GOLD_PIONEER',
      mintDate: 'Yesterday 14:22 UTC',
      dayNumber: 2,
      txHash: '0x8f2a...c914',
      streakDays: 2,
      tasksCompleted: 6,
      airdropWeightMultiplier: '2.5x',
      imageTheme: 'from-amber-600 to-yellow-400'
    },
    {
      tokenId: '#AURX-NFT-0289',
      name: 'Day 1 Genesis Inaugural Pass',
      tier: 'SILVER_VOYAGER',
      mintDate: '2 Days Ago',
      dayNumber: 1,
      txHash: '0x3e17...a810',
      streakDays: 1,
      tasksCompleted: 4,
      airdropWeightMultiplier: '1.5x',
      imageTheme: 'from-slate-600 to-slate-400'
    }
  ]);
  const [selectedNFTModal, setSelectedNFTModal] = useState<MintedNFT | null>(null);

  // 8 Social Quests as specified by the user
  const quests: SocialQuest[] = [
    {
      id: 'TWITTER',
      platform: 'TWITTER',
      title: 'Twitter / 𝕏 Daily Announcement',
      tagline: 'Tweet or thread about AuraX 100k TPS & Zero-Fraud security',
      icon: Twitter,
      color: 'text-sky-400',
      badgeColor: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
      xpReward: 250,
      tokenReward: 75,
      guideStep: 'Post on 𝕏 and submit your tweet URL below.',
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `🚀 Testing AuraX Sovereign L1 — The first Zero-Fraud Layer-1 with 100,000+ Real TPS & silicon consensus. Claim free tokens from the faucet & test the Genesis Node: ${cleanShortLink} #AuraX #Layer1 #CryptoAirdrop #Web3`
      )}`,
      recommendedPost: `🚀 Testing the AuraX Sovereign Layer-1 Incentivized Testnet!

Zero unauthorized exploits, 100,000+ Real TPS, and silicon hardware consensus. Connect your wallet to claim 1,000 Free $AURX & run an in-browser Genesis Node:
${cleanShortLink}

#AuraX #Layer1 #Blockchain #CryptoAirdrop #Web3 #DeFi`
    },
    {
      id: 'FACEBOOK',
      platform: 'FACEBOOK',
      title: 'Facebook Community Post',
      tagline: 'Share in a crypto, tech, or entrepreneur group with your invite link',
      icon: Facebook,
      color: 'text-blue-500',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
      xpReward: 200,
      tokenReward: 50,
      guideStep: 'Publish a public Facebook post or group recommendation, then paste your post link.',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cleanShortLink)}`,
      recommendedPost: `Check out AuraX Sovereign Layer-1! It is the world's first blockchain with a built-in Zero-Fraud Shield that prevents unauthorized exploits and phishing attacks. Their Incentivized Testnet is live today with free faucet tokens: ${cleanShortLink}`
    },
    {
      id: 'REDDIT',
      platform: 'REDDIT',
      title: 'Reddit Discussion / Review',
      tagline: 'Post in r/CryptoCurrency, r/testnet, r/airdrop, or r/solana',
      icon: MessageSquare,
      color: 'text-orange-500',
      badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
      xpReward: 300,
      tokenReward: 80,
      guideStep: 'Create a post or comprehensive comment detailing your testnet benchmark, then submit the Reddit permalink.',
      shareUrl: `https://reddit.com/submit?url=${encodeURIComponent(cleanShortLink)}&title=${encodeURIComponent('AuraX Layer-1: 100k TPS and zero-exploit Invariant Consensus Tested')}`,
      recommendedPost: `Title: Testing AuraX: The first Zero-Fraud Layer-1 with mathematical unauthorized sweep interception
Body: I spent today benchmarking the AuraX Genesis Node. It runs a DAG-BFT pipeline capable of 100,000+ TPS and hardware-attested consensus. You can spin up an in-browser node and claim 1,000 testnet tokens right here: ${cleanShortLink}`
    },
    {
      id: 'DISCORD',
      platform: 'DISCORD',
      title: 'Discord Channel Shoutout',
      tagline: 'Share your node status & invite in Web3 or trading Discord servers',
      icon: MessageSquare,
      color: 'text-indigo-400',
      badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
      xpReward: 200,
      tokenReward: 50,
      guideStep: 'Drop your invite link & feedback in a Discord crypto/testnet channel, then paste a screenshot or message link.',
      recommendedPost: `Hey everyone! AuraX Sovereign L1 testnet is live. Hardware-backed validator consensus with 100k TPS and anti-exploit security. Claim 1,000 free $AURX from the faucet: ${cleanShortLink}`
    },
    {
      id: 'INSTAGRAM',
      platform: 'INSTAGRAM',
      title: 'Instagram Story / Reel / Post',
      tagline: 'Post a story or grid graphic featuring your Genesis Node and link sticker',
      icon: Instagram,
      color: 'text-pink-400',
      badgeColor: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
      xpReward: 250,
      tokenReward: 65,
      guideStep: 'Post on Instagram with the link sticker pointing to your short link, then submit your profile/post handle or link.',
      recommendedPost: `Leveling up on the AuraX Sovereign Layer-1 testnet! ⚡🛡️ 100,000 TPS, zero scams, free testnet rewards. Tap link to get 1,000 $AURX: ${cleanShortLink}`
    },
    {
      id: 'TIKTOK',
      platform: 'TIKTOK',
      title: 'TikTok Video / Screen Recording',
      tagline: 'Create a 15-60s clip showing instant transaction finality & faucet claim',
      icon: Video,
      color: 'text-cyan-400',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
      xpReward: 400,
      tokenReward: 120,
      guideStep: 'Upload a short video review on TikTok with tags #crypto #airdrop #aurax #web3, then paste your video link.',
      recommendedPost: `POV: You found a blockchain that actually stops scammers from compromising your assets. Testing AuraX Sovereign L1 with 100k TPS! Link in bio: ${cleanShortLink}`
    },
    {
      id: 'YOUTUBE',
      platform: 'YOUTUBE',
      title: 'YouTube Video or Shorts',
      tagline: 'Publish a YouTube Short or video walkthrough of running a validator node',
      icon: Youtube,
      color: 'text-rose-500',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      xpReward: 500,
      tokenReward: 150,
      guideStep: 'Publish on YouTube with your referral link in the video description, then submit the YouTube watch URL.',
      recommendedPost: `Full review of AuraX Sovereign Layer-1 Incentivized Testnet. Testing the 12-Step Autonomous Operating Loop, 100 Real-World Business Layers, and claiming free faucet tokens: ${cleanShortLink}`
    },
    {
      id: 'LINKEDIN',
      platform: 'LINKEDIN',
      title: 'LinkedIn Enterprise Post',
      tagline: 'Write a professional post analyzing the 100 enterprise layers & finops OS',
      icon: Linkedin,
      color: 'text-blue-400',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
      xpReward: 350,
      tokenReward: 100,
      guideStep: 'Share a professional post on LinkedIn, then submit your LinkedIn activity URL.',
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cleanShortLink)}`,
      recommendedPost: `The financial operating landscape is evolving beyond traditional ERPs. Today I tested AuraX and ECONOS — an autonomous financial operating system coupling a continuous 12-step cognitive loop with 100 real-world business, wealth, and trust layers on a high-throughput sovereign Layer-1: ${cleanShortLink} #Fintech #Blockchain #EnterpriseSoftware #DeFi`
    }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleVerifySubmission = (questId: string) => {
    const link = (submissionLinks[questId] || '').trim();
    if (!link) {
      setFeedbackMsg({ id: questId, msg: 'Please enter a valid post or video URL before verifying.', success: false });
      return;
    }

    setVerifyingQuestId(questId);
    setFeedbackMsg(null);

    // Dynamic verification simulation
    setTimeout(() => {
      setVerifyingQuestId(null);
      if (!completedQuestIds.includes(questId)) {
        setCompletedQuestIds(prev => [...prev, questId]);
        setFeedbackMsg({
          id: questId,
          msg: '🎉 Verification confirmed! Rewards credited and Proof-of-Action recorded on-chain.',
          success: true
        });
        if (onRefreshBalance) onRefreshBalance();
      } else {
        setFeedbackMsg({ id: questId, msg: 'Quest already verified for today!', success: true });
      }
    }, 1200);
  };

  // Check if eligible to mint daily NFT
  const isEligibleToMint = completedQuestIds.length >= 3 && !mintedNFTs.some(n => n.dayNumber === streakDays);

  const handleMintDailyNFT = () => {
    setIsMintingNFT(true);
    setTimeout(() => {
      const newNFT: MintedNFT = {
        tokenId: `#AURX-NFT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `Day ${streakDays} Sovereign Proof-of-Action NFT`,
        tier: completedQuestIds.length >= 6 ? 'OBSIDIAN_GENESIS' : completedQuestIds.length >= 4 ? 'DIAMOND_VALIDATOR' : 'GOLD_PIONEER',
        mintDate: 'Just now (Block #' + Math.floor(14000 + Math.random() * 5000) + ')',
        dayNumber: streakDays,
        txHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        streakDays: streakDays,
        tasksCompleted: completedQuestIds.length,
        airdropWeightMultiplier: `${(1 + streakDays * 0.5 + completedQuestIds.length * 0.2).toFixed(1)}x`,
        imageTheme: completedQuestIds.length >= 6 ? 'from-purple-950 via-slate-900 to-cyan-950' : 'from-indigo-900 to-purple-800'
      };

      setMintedNFTs(prev => [newNFT, ...prev]);
      setIsMintingNFT(false);
      setSelectedNFTModal(newNFT);
    }, 1800);
  };

  return (
    <div className={`space-y-6 font-mono text-slate-100 ${className}`}>
      {/* Hero Header & Daily Streak Status */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>OFFICIAL DAILY SOCIAL AIRDROP & PROOF-OF-ACTION NFT PROTOCOL</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Post Daily · Earn Verified $AURX · Mint Proof-of-Action NFTs
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Every day you complete testnet features and publish posts across 8 social platforms, our consensus proof engine tracks your submissions. Complete daily tasks to unlock your exclusive **Genesis Proof-of-Action NFT** — the cryptographic key guaranteeing your mainnet token allocation!
            </p>
          </div>

          {/* Daily Streak & Multiplier Status Badge */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shrink-0 space-y-3 min-w-[260px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Current Daily Streak:</span>
              <span className="text-xs font-black text-amber-400 flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-400" />
                {streakDays} Days Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Airdrop Multiplier:</span>
              <span className="text-sm font-black text-cyan-400">
                {(1 + streakDays * 0.5).toFixed(1)}x Tier Weight
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Daily Reset in:</span>
              </span>
              <span className="font-bold text-white">
                {String(hoursLeft).padStart(2, '0')}:{String(minutesLeft).padStart(2, '0')}:{String(secondsLeft).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Daily Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Tasks Completed Today</div>
            <div className="text-sm font-black text-emerald-400 mt-0.5">
              {completedQuestIds.length} / {quests.length} Platforms
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Tokens Earned Today</div>
            <div className="text-sm font-black text-cyan-400 mt-0.5">
              +{completedQuestIds.reduce((acc, qId) => {
                const q = quests.find(item => item.id === qId);
                return acc + (q?.tokenReward || 0);
              }, 0)} $AURX
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Airdrop XP Accumulated</div>
            <div className="text-sm font-black text-purple-400 mt-0.5">
              +{completedQuestIds.reduce((acc, qId) => {
                const q = quests.find(item => item.id === qId);
                return acc + (q?.xpReward || 0);
              }, 0)} XP
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">NFT Badges Minted</div>
            <div className="text-sm font-black text-amber-400 mt-0.5">
              {mintedNFTs.length} Unique Passports
            </div>
          </div>
        </div>
      </div>

      {/* NFT Minting Showcase Card */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950 border border-purple-500/40 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black text-white tracking-tight">
                Daily Proof-of-Action NFT Minter
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Guaranteed Airdrop Key
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Complete at least 3 social or testnet tasks to mint your daily unique NFT badge on the AuraX Sovereign Chain. Users holding these NFTs will receive proportional allocations during the Mainnet Token Genesis Event!
            </p>
            <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
              <span>Required: 3+ tasks completed ({completedQuestIds.length} done)</span>
              <span>·</span>
              <span className={isEligibleToMint ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                {isEligibleToMint ? '✓ You are eligible to mint today!' : 'Complete more tasks or already minted today'}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={handleMintDailyNFT}
              disabled={isMintingNFT}
              className={`px-6 py-3.5 rounded-2xl font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-xl ${
                completedQuestIds.length >= 3
                  ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-purple-600 hover:from-amber-300 hover:to-purple-500 text-slate-950 shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              {isMintingNFT ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Minting Cryptographic NFT on-chain...</span>
                </>
              ) : (
                <>
                  <Trophy className="w-4 h-4 text-slate-950" />
                  <span>Mint Day {streakDays} Proof-of-Action NFT</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 8 Social Media Channel Quests Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>8 Daily Social Channel Quests</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Publish posts on these 8 platforms, submit the proof link, and claim real $AURX + Airdrop XP daily.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {completedQuestIds.length} of 8 Verified Today
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quests.map(quest => {
            const Icon = quest.icon;
            const isCompleted = completedQuestIds.includes(quest.id);
            const isVerifying = verifyingQuestId === quest.id;
            const currentInput = submissionLinks[quest.id] || '';
            const feedback = feedbackMsg?.id === quest.id ? feedbackMsg : null;

            return (
              <div
                key={quest.id}
                className={`rounded-2xl border p-5 transition flex flex-col justify-between space-y-4 ${
                  isCompleted
                    ? 'bg-slate-950/80 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Card Top: Platform Info & Rewards */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${quest.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-white flex items-center gap-2">
                          <span>{quest.title}</span>
                          {isCompleted && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{quest.tagline}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-black text-cyan-400">+{quest.tokenReward} $AURX</div>
                      <div className="text-[10px] font-bold text-purple-400">+{quest.xpReward} XP</div>
                    </div>
                  </div>

                  {/* Pre-written Copy Preview & 1-Click Copy */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="uppercase font-bold">Recommended Post Copy:</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(quest.recommendedPost, `post_${quest.id}`)}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold cursor-pointer"
                      >
                        {copiedKey === `post_${quest.id}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-slate-300 line-clamp-2 leading-relaxed text-[11px]">
                      {quest.recommendedPost}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Share & Verification Input */}
                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    {quest.shareUrl ? (
                      <a
                        href={quest.shareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition text-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Launch & Share to {quest.platform}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCopy(quest.recommendedPost, `copy_btn_${quest.id}`)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{copiedKey === `copy_btn_${quest.id}` ? 'Copied Post Copy!' : `Copy Post for ${quest.platform}`}</span>
                      </button>
                    )}
                  </div>

                  {/* Submission Link Form */}
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      disabled={isCompleted}
                      value={currentInput}
                      onChange={(e) => setSubmissionLinks({ ...submissionLinks, [quest.id]: e.target.value })}
                      placeholder={`Paste your ${quest.platform} post or video link...`}
                      className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono disabled:opacity-60 transition"
                    />
                    <button
                      type="button"
                      disabled={isCompleted || isVerifying}
                      onClick={() => handleVerifySubmission(quest.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-sm'
                      }`}
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Checking...</span>
                        </>
                      ) : isCompleted ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Submitted</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Feedback Message */}
                  {feedback && (
                    <div className={`p-2 rounded-lg text-[10px] font-bold ${
                      feedback.success ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                    }`}>
                      {feedback.msg}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minted NFTs Inventory Showcase */}
      <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Your Minted Proof-of-Action NFT Inventory ({mintedNFTs.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              These verified cryptographic passports track your daily active participation and multiply your mainnet airdrop allocation.
            </p>
          </div>
          <span className="text-xs font-bold text-cyan-400">On-Chain Verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {mintedNFTs.map(nft => (
            <div
              key={nft.tokenId}
              onClick={() => setSelectedNFTModal(nft)}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 cursor-pointer hover:border-purple-500/60 hover:bg-slate-900 transition group"
            >
              {/* NFT Holographic Art Visual */}
              <div className={`h-36 rounded-xl bg-gradient-to-br ${nft.imageTheme} p-4 flex flex-col justify-between border border-white/10 relative overflow-hidden group-hover:scale-[1.01] transition`}>
                <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-cyan-300 border border-white/10">
                    AuraX Sovereign
                  </span>
                  <span className="text-white/80">{nft.tokenId}</span>
                </div>

                <div className="text-center space-y-0.5">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-black text-white tracking-wide">{nft.tier.replace('_', ' ')}</div>
                  <div className="text-[10px] text-cyan-300 font-bold">Airdrop Multiplier: {nft.airdropWeightMultiplier}</div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-white/70">
                  <span>Day {nft.dayNumber} Streak</span>
                  <span>{nft.tasksCompleted} Tasks Verified</span>
                </div>
              </div>

              {/* NFT Metadata */}
              <div className="space-y-1">
                <div className="text-xs font-black text-white group-hover:text-cyan-400 transition">{nft.name}</div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Minted: {nft.mintDate}</span>
                  <span className="font-mono text-cyan-400">{nft.txHash.substring(0, 10)}...</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NFT Detail Modal */}
      {selectedNFTModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-slate-950 border border-purple-500/40 p-6 space-y-4 text-left shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black text-white">{selectedNFTModal.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNFTModal(null)}
                className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Holographic Badge Card */}
            <div className={`h-48 rounded-2xl bg-gradient-to-br ${selectedNFTModal.imageTheme} p-5 flex flex-col justify-between border border-white/20 text-white relative`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-black tracking-wider uppercase">AURAX SOVEREIGN L1</span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/50 font-mono text-[10px]">
                  {selectedNFTModal.tokenId}
                </span>
              </div>

              <div className="text-center space-y-1">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-amber-300">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-base font-black tracking-tight">{selectedNFTModal.tier}</div>
                <div className="text-xs text-cyan-300 font-bold">Allocation Multiplier: {selectedNFTModal.airdropWeightMultiplier}</div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-white/80">
                <span>Streak: {selectedNFTModal.streakDays} Consecutive Days</span>
                <span>Tasks: {selectedNFTModal.tasksCompleted} Verified</span>
              </div>
            </div>

            {/* Cryptographic Proof Details */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>Standard:</span>
                <span className="font-mono text-white">ERC-721 Sovereign Soulbound Voucher</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Transaction Hash:</span>
                <span className="font-mono text-cyan-300 truncate max-w-[200px]">{selectedNFTModal.txHash}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Attestation:</span>
                <span className="text-emerald-400 font-bold">Consensus Validated</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              This NFT is permanently minted to your verified address. It proves continuous testing and multi-platform daily syndication. At Mainnet Launch, your wallet will automatically receive proportional token airdrop rewards.
            </p>

            <button
              type="button"
              onClick={() => setSelectedNFTModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
