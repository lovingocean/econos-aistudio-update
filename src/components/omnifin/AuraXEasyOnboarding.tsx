import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wallet, 
  Gift, 
  TrendingUp, 
  Coins, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Laptop, 
  MapPin, 
  Lock, 
  Terminal,
  RefreshCw,
  Copy,
  Check,
  ChevronRight
} from 'lucide-react';
import { User } from '../../types/econos';

interface AuraXEasyOnboardingProps {
  user: User | null;
  senderAddress: string;
  senderBalance: number;
  onConnectWallet: () => void;
  onAddNetwork: () => void;
  metaMaskStatus: string | null;
  isClaimingFaucet: boolean;
  onClaimFaucet: () => void;
  faucetFeedback: { success: boolean; msg: string } | null;
  hasClaimedFaucet: boolean;
  isDeviceLocked: boolean;
  sybilLockError: string | null;
  boundPrimaryWallet: string | null;
  clientIp: string;
  deviceFingerprint: string;
  // Staking
  onStake: (amount: number) => void;
  isStaking: boolean;
  stakingStatus: any;
  // Swap
  onSwap: (from: string, to: string, amount: number) => void;
  isSwapping: boolean;
  swapFeedback: { success: boolean; msg: string } | null;
  // Send
  onSendTx: (to: string, amount: number, isVault: boolean) => void;
  isSending: boolean;
  sendFeedback: { success: boolean; msg: string; txHash?: string } | null;
  // Switch to Pro mode
  onSwitchToPro: (tab?: string) => void;
  // Custom Tokens & Referral
  userTokens?: any[];
  referralStats?: any;
  onAddTokenToMetaMask?: (address: string, symbol: string, decimals?: number) => void;
  onGenerateGuestWallet?: () => void;
}

export const AuraXEasyOnboarding: React.FC<AuraXEasyOnboardingProps> = ({
  user,
  senderAddress,
  senderBalance,
  onConnectWallet,
  onAddNetwork,
  metaMaskStatus,
  isClaimingFaucet,
  onClaimFaucet,
  faucetFeedback,
  hasClaimedFaucet,
  isDeviceLocked,
  sybilLockError,
  boundPrimaryWallet,
  clientIp,
  deviceFingerprint,
  onStake,
  isStaking,
  stakingStatus,
  onSwap,
  isSwapping,
  swapFeedback,
  onSendTx,
  isSending,
  sendFeedback,
  onSwitchToPro,
  userTokens = [],
  referralStats,
  onAddTokenToMetaMask,
  onGenerateGuestWallet
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  // Quick Action States
  const [stakeAmount, setStakeAmount] = useState<number>(500);
  const [swapAmount, setSwapAmount] = useState<number>(100);
  const [sendToAddress, setSendToAddress] = useState<string>('0x095871Cfed26b28f03e409AE612c0A5F1e1726cD');
  const [sendAmount, setSendAmount] = useState<number>(50);
  const [isVaultProtected, setIsVaultProtected] = useState<boolean>(true);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(txt);
    setTimeout(() => setCopied(null), 2000);
  };

  const isConnected = senderAddress && senderAddress.startsWith('0x') && senderAddress.length > 20;

  return (
    <div className="space-y-6">
      {/* 1. Welcome & Simplified Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#0d1c33] to-slate-950 p-6 sm:p-8 text-white border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EASY START GUIDE • 3 SIMPLE STEPS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              AuraX Sovereign Blockchain Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              No technical confusion! Connect your wallet, claim free starter tokens, and try Staking, Swapping, and Zero-Loss Transfers in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onSwitchToPro()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold transition shadow-lg cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Switch to Pro Terminal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THREE-STEP GUIDED ONBOARDING BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        {/* Step 1: User Account */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Step 1: Account</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">{user?.name || 'Sovereign Pioneer'}</div>
              <div className="text-xs text-slate-500 truncate">{user?.email || 'Logged in Session'}</div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Identity Status</span>
            <span className="text-emerald-600 font-bold">Verified Founder</span>
          </div>
        </div>

        {/* Step 2: Web3 Wallet */}
        <div className={`p-5 rounded-2xl border shadow-sm relative overflow-hidden flex flex-col justify-between ${
          isConnected ? 'bg-white border-slate-200' : 'bg-cyan-50/50 border-cyan-300'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Step 2: Web3 Wallet</span>
              {isConnected ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  Action Needed
                </span>
              )}
            </div>
            {isConnected ? (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-800">
                    {senderAddress.substring(0, 8)}...{senderAddress.substring(senderAddress.length - 6)}
                  </span>
                  <button onClick={() => copyText(senderAddress)} className="text-slate-400 hover:text-slate-600">
                    {copied === senderAddress ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs text-emerald-600 font-bold mt-1">
                  Balance: {senderBalance.toLocaleString()} AURX
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={onConnectWallet}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect MetaMask</span>
                </button>
                {onGenerateGuestWallet && (
                  <button
                    onClick={onGenerateGuestWallet}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[11px] transition cursor-pointer"
                  >
                    <span>⚡ Instant Guest Key (No Extension)</span>
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Network: AuraX L1 (9924)</span>
            <button onClick={onAddNetwork} className="text-cyan-600 hover:underline font-bold">
              1-Click Sync
            </button>
          </div>
        </div>

        {/* Step 3: Anti-Sybil Device & Physical Location Binding */}
        <div className={`p-5 rounded-2xl border shadow-sm relative overflow-hidden flex flex-col justify-between ${
          isDeviceLocked ? 'bg-rose-50 border-rose-300' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Step 3: Anti-Sybil Security</span>
              {isDeviceLocked ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Locked (Multi-Account)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  1 PC = 1 Wallet
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Laptop className="w-4 h-4 text-slate-500" />
                <span>PC Hardware Signature: Bound</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Location IP: {clientIp || '127.0.0.1'} (Verified)</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Sybil Farming Lock</span>
            <span className={isDeviceLocked ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
              {isDeviceLocked ? 'Blocked' : 'Enforced (Active)'}
            </span>
          </div>
        </div>
      </div>

      {/* MULTI-ACCOUNT WARNING BANNER (If duplicate account detected on same PC) */}
      {isDeviceLocked && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 space-y-2 font-mono">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Anti-Sybil Multi-Account Protection Activated!</span>
          </div>
          <p className="text-xs text-rose-700 leading-relaxed">
            {sybilLockError || `This computer and location is already bound to Primary Wallet (${boundPrimaryWallet?.substring(0, 10)}...). To maintain fairness and prevent bot token farming, a single machine cannot connect multiple testnet wallets.`}
          </p>
          <div className="text-[11px] text-rose-600 pt-1">
            💡 Solution: Please switch back to your primary registered wallet in MetaMask to continue.
          </div>
        </div>
      )}

      {/* 3. FOUR CLEAR ACTIONS (No Confusion for Regular Users) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* ACTION 1: CLAIM FAUCET */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col justify-between hover:border-cyan-400 transition group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Genesis Faucet</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                  1-Time Only
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Receive 1,000 Free $AURX coins directly to your wallet for testing. Strictly limited to 1 claim per PC & location.
              </p>
            </div>

            {faucetFeedback && (
              <div className={`p-3 rounded-xl text-xs font-mono ${
                faucetFeedback.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {faucetFeedback.msg}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            {hasClaimedFaucet ? (
              <div className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 text-slate-500 text-xs font-mono font-bold cursor-not-allowed">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Already Claimed (1 per PC)</span>
              </div>
            ) : (
              <button
                onClick={onClaimFaucet}
                disabled={isClaimingFaucet || isDeviceLocked}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-mono font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isClaimingFaucet ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Gift className="w-4 h-4" />}
                <span>{isClaimingFaucet ? 'Dispensing Coins...' : 'Claim 1,000 $AURX Free'}</span>
              </button>
            )}
          </div>
        </div>

        {/* ACTION 2: STAKING VAULT */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col justify-between hover:border-cyan-400 transition group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Native Staking</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  12.5% APY
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Lock your $AURX in the validator reward pool and earn auto-compounding yields every second.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 font-mono space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Currently Staked:</span>
                <span className="font-bold text-slate-800">{stakingStatus?.stakedAmount || 0} AURX</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Earned Yield:</span>
                <span className="font-bold text-emerald-600">+{stakingStatus?.earnedYield?.toFixed(4) || 0} AURX</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-500">Stake Amount</label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => onStake(stakeAmount)}
              disabled={isStaking || isDeviceLocked || senderBalance < stakeAmount}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {isStaking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
              <span>{isStaking ? 'Locking in Pool...' : `Stake ${stakeAmount} AURX`}</span>
            </button>
          </div>
        </div>

        {/* ACTION 3: DEX SWAP */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col justify-between hover:border-cyan-400 transition group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-sm">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Zero-Slippage DEX</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold">
                  0% Fee
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Instantly swap $AURX to USDT or ETH with mathematical invariant liquidity protection.
              </p>
            </div>

            {swapFeedback && (
              <div className={`p-3 rounded-xl text-xs font-mono ${
                swapFeedback.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {swapFeedback.msg}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-500">Swap Amount (AURX ➡️ USDT)</label>
              <input
                type="number"
                value={swapAmount}
                onChange={(e) => setSwapAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => onSwap('AURX', 'USDT', swapAmount)}
              disabled={isSwapping || isDeviceLocked || senderBalance < swapAmount}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-mono font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {isSwapping ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Coins className="w-4 h-4" />}
              <span>{isSwapping ? 'Executing Trade...' : `Swap ${swapAmount} AURX`}</span>
            </button>
          </div>
        </div>

        {/* ACTION 4: REVERSIBLE TRANSFER */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col justify-between hover:border-cyan-400 transition group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Zero-Loss Transfer</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                  Reversible
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Send tokens with Anti-Drain Vault security. If sent by mistake, pull them back within 15 minutes!
              </p>
            </div>

            {sendFeedback && (
              <div className={`p-3 rounded-xl text-xs font-mono ${
                sendFeedback.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {sendFeedback.msg}
              </div>
            )}

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-mono text-slate-500">Recipient</label>
                <input
                  type="text"
                  value={sendToAddress}
                  onChange={(e) => setSendToAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-500">Amount (AURX)</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => onSendTx(sendToAddress, sendAmount, isVaultProtected)}
              disabled={isSending || isDeviceLocked || senderBalance < sendAmount}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {isSending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{isSending ? 'Broadcasting...' : `Send ${sendAmount} AURX`}</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. CORE ECOSYSTEM FEATURES QUICK ACCESS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        {/* Card 1: Referral & Quests */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 font-bold">🎁</span>
                <span>Refer & Earn $AURX</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold">
                +50 AURX
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              Invite friends with your personal code. Earn +50 $AURX and +250 XP per unique verified PC! Your friend gets +100 bonus tokens.
            </p>
          </div>
          <div className="space-y-1.5">
            <button
              onClick={() => onSwitchToPro('REFERRAL_QUESTS')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <span>🔥 Viral Post & Media Kit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSwitchToPro('REFERRAL_QUESTS')}
              className="w-full py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <span>View Quests Leaderboard</span>
            </button>
          </div>
        </div>

        {/* Card 2: Liquidity Hub & Pools */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 font-bold">💧</span>
                <span>Liquidity & AMM Pools</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-bold">
                24.5% APR
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              Where does liquidity come from on launch? Protocol seed, Fair-Launch LBP curves, and community LP farming. Seed your pool now!
            </p>
          </div>
          <button
            onClick={() => onSwitchToPro('LIQUIDITY_POOLS')}
            className="w-full py-2.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>Launch AMM Pool</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Dedicated Block Explorer */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 font-bold">🔍</span>
                <span>Block Explorer</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                Merkle Real-Time
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              Verify live blocks, Merkle state roots, and transaction receipts on the sovereign L1 chain in real time.
            </p>
          </div>
          <button
            onClick={() => onSwitchToPro('BLOCK_EXPLORER')}
            className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>Open Explorer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CUSTOM TOKENS HOLDINGS IN WALLET (IF ANY) */}
      {userTokens.length > 0 && (
        <div className="p-5 rounded-3xl bg-white border border-slate-200 font-mono shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-4 h-4 text-purple-600" />
              <span>Custom Tokens in Your Wallet ({userTokens.length})</span>
            </div>
            <button
              onClick={() => onSwitchToPro('TOKEN_LAUNCHPAD')}
              className="text-[11px] text-cyan-600 hover:underline font-bold"
            >
              + Deploy More
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {userTokens.map(t => (
              <div key={t.contractAddress} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-black text-slate-900">${t.symbol} <span className="text-slate-500 font-normal">({t.name})</span></div>
                  <div className="text-[11px] text-emerald-600 font-bold">{t.balance.toLocaleString()} ${t.symbol}</div>
                </div>
                {onAddTokenToMetaMask && (
                  <button
                    onClick={() => onAddTokenToMetaMask(t.contractAddress, t.symbol, t.decimals)}
                    className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 font-bold text-[10px] cursor-pointer"
                  >
                    MetaMask 🦊
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PRO TOOLS CALLOUT (For advanced developers & operators) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Looking for Advanced Developer Tools?</div>
            <div className="text-xs text-slate-400">
              ERC-20 Token Launchpad, Anti-Drainer Threat Simulator, Airdrop Quests Leaderboard, SDK Docs & Explorer Search.
            </div>
          </div>
        </div>

        <button
          onClick={() => onSwitchToPro('TOKEN_LAUNCHPAD')}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-md whitespace-nowrap cursor-pointer"
        >
          <span>Open Pro Terminal & Explorer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
