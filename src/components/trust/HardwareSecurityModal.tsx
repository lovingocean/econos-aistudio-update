import React, { useState } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Fingerprint, 
  Cpu, 
  Lock, 
  AlertCircle,
  RefreshCw,
  Copy,
  ExternalLink
} from 'lucide-react';

export interface HardwareToken {
  id: string;
  name: string;
  type: 'YUBIKEY_5C_NFC' | 'APPLE_SECURE_ENCLAVE' | 'WINDOWS_HELLO' | 'NITROKEY_PRO';
  aaguid: string;
  credentialId: string;
  algorithm: 'ED25519' | 'ES256 (P-256)';
  registeredAt: string;
  lastUsedAt: string;
  signCount: number;
}

export interface HardwareSecurityModalProps {
  isOpen?: boolean;
  onClose: () => void;
  mode?: 'MANAGE_KEYS' | 'SIGN_TRANSACTION';
  agentId?: string;
  agentName?: string;
  actionTitle?: string;
  amountUsd?: number;
  onSuccess?: (signature: any) => void | Promise<void>;
  transactionData?: {
    requestId?: string;
    actionTitle?: string;
    amount?: number;
    recipient?: string;
    merkleLeafHash?: string;
  };
  onSignatureSuccess?: (signatureResult: {
    hardwareTokenId: string;
    authenticatorData: string;
    clientDataHash: string;
    hardwareSignature: string;
  }) => void;
}

const DEFAULT_TOKENS: HardwareToken[] = [
  {
    id: 'tok_yubikey_01',
    name: 'Executive YubiKey 5C NFC (Primary)',
    type: 'YUBIKEY_5C_NFC',
    aaguid: 'cb69481e-8ff7-4039-93ec-0a2f3a9e2f91',
    credentialId: 'cred_fido2_yk5c_77189a',
    algorithm: 'ED25519',
    registeredAt: '2026-01-18T10:00:00Z',
    lastUsedAt: '2026-09-17T05:22:00Z',
    signCount: 142
  },
  {
    id: 'tok_touchid_02',
    name: 'MacBook Pro Secure Enclave (Biometric)',
    type: 'APPLE_SECURE_ENCLAVE',
    aaguid: 'adce0002-35bc-c60a-648b-0b25f1f05503',
    credentialId: 'cred_fido2_se_mac_99014',
    algorithm: 'ES256 (P-256)',
    registeredAt: '2026-02-04T14:30:00Z',
    lastUsedAt: '2026-09-16T19:40:00Z',
    signCount: 68
  }
];

export const HardwareSecurityModal: React.FC<HardwareSecurityModalProps> = ({
  isOpen,
  onClose,
  mode = 'SIGN_TRANSACTION',
  actionTitle,
  amountUsd,
  onSuccess,
  transactionData,
  onSignatureSuccess
}) => {
  const [tokens, setTokens] = useState<HardwareToken[]>(DEFAULT_TOKENS);
  const [isPromptingTouch, setIsPromptingTouch] = useState(false);
  const [signatureSuccess, setSignatureSuccess] = useState(false);
  const [generatedSignature, setGeneratedSignature] = useState<string | null>(null);
  const [showAddKey, setShowAddKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('YubiKey 5 Nano (Backup)');
  const [newKeyType, setNewKeyType] = useState<'YUBIKEY_5C_NFC' | 'APPLE_SECURE_ENCLAVE' | 'WINDOWS_HELLO'>('YUBIKEY_5C_NFC');

  if (isOpen === false) return null;

  const handleSimulateHardwareTouch = () => {
    setIsPromptingTouch(true);
    setSignatureSuccess(false);

    // Simulate standard WebAuthn assertion delay & user touch
    setTimeout(() => {
      const sig = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const authData = `authData:0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const clientHash = transactionData?.merkleLeafHash || `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      setGeneratedSignature(sig);
      setIsPromptingTouch(false);
      setSignatureSuccess(true);

      // Increment token count
      setTokens(prev => prev.map(t => t.id === 'tok_yubikey_01' ? { ...t, signCount: t.signCount + 1, lastUsedAt: new Date().toISOString() } : t));

      if (onSignatureSuccess) {
        onSignatureSuccess({
          hardwareTokenId: 'tok_yubikey_01',
          authenticatorData: authData,
          clientDataHash: clientHash,
          hardwareSignature: sig
        });
      }
      if (onSuccess) {
        onSuccess(sig);
      }
    }, 1500);
  };

  const handleRegisterNewKey = () => {
    setIsPromptingTouch(true);
    setTimeout(() => {
      const newTok: HardwareToken = {
        id: `tok_${Date.now().toString(36)}`,
        name: newKeyName,
        type: newKeyType,
        aaguid: `${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 6)}`,
        credentialId: `cred_fido2_${Math.random().toString(36).substring(2, 8)}`,
        algorithm: 'ED25519',
        registeredAt: new Date().toISOString(),
        lastUsedAt: new Date().toISOString(),
        signCount: 0
      };
      setTokens([...tokens, newTok]);
      setIsPromptingTouch(false);
      setShowAddKey(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#132338] text-white flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                FIDO2 / WebAuthn Level 3 • Hardware Enclave
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {mode === 'SIGN_TRANSACTION' ? 'Hardware Dual-Custody Sign-Off' : 'Cryptographic Hardware Security Keys'}
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {mode === 'SIGN_TRANSACTION' ? (
            /* Transaction Signing Mode */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-amber-900">
                  <span>Class C / Class D Dual-Custody Requirement</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200 text-amber-900">M-of-N Quorum</span>
                </div>
                <div className="text-slate-700 font-sans text-xs">
                  This action requires physical confirmation via an accredited FIDO2 hardware token or Secure Enclave biometric assertion.
                </div>
              </div>

              {/* Transaction Spec */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Action:</span>
                  <span className="font-bold text-slate-900">{transactionData?.actionTitle || 'Class C Sovereign Decision Execution'}</span>
                </div>
                {transactionData?.amount && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount:</span>
                    <span className="font-bold text-emerald-700">${transactionData.amount.toLocaleString()} USD</span>
                  </div>
                )}
                {transactionData?.recipient && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Recipient:</span>
                    <span className="text-slate-700 font-bold">{transactionData.recipient}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Merkle Leaf Hash:</span>
                  <span className="text-[10px] text-slate-600 font-mono truncate max-w-[260px]">
                    {transactionData?.merkleLeafHash || 'sha256:7f8a92b3c...e014'}
                  </span>
                </div>
              </div>

              {/* Hardware Prompt Animation Container */}
              <div className={`p-6 rounded-2xl border text-center transition ${
                signatureSuccess 
                  ? 'bg-emerald-50/60 border-emerald-300' 
                  : isPromptingTouch 
                    ? 'bg-sky-50/60 border-sky-300 animate-pulse' 
                    : 'bg-slate-50 border-slate-200'
              }`}>
                {signatureSuccess ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="text-sm font-bold text-emerald-900">Hardware Assertion Verified</div>
                    <div className="text-xs font-mono text-emerald-700 truncate max-w-sm mx-auto">
                      Sig: {generatedSignature}
                    </div>
                  </div>
                ) : isPromptingTouch ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 mx-auto flex items-center justify-center animate-bounce">
                      <Fingerprint className="w-7 h-7" />
                    </div>
                    <div className="text-sm font-bold text-sky-900">Touch Hardware Token Now</div>
                    <div className="text-xs text-slate-500">
                      Waiting for capacitive touch on Executive YubiKey 5C NFC...
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 mx-auto flex items-center justify-center">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-slate-800">Ready to Sign with Hardware</div>
                    <button
                      onClick={handleSimulateHardwareTouch}
                      className="px-6 py-2.5 rounded-xl bg-[#132338] hover:bg-[#0b1726] text-white text-xs font-mono font-bold transition shadow-xs"
                    >
                      Authenticate with YubiKey / Touch ID
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Key Management Mode */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-bold">Registered Authenticators ({tokens.length})</span>
                <button
                  onClick={() => setShowAddKey(true)}
                  className="text-xs font-mono font-bold text-sky-700 hover:text-sky-900"
                >
                  + Add Security Key
                </button>
              </div>

              {showAddKey && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
                  <div className="font-bold text-slate-900">Register New Hardware Authenticator</div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Key Label:</label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Authenticator Type:</label>
                    <select
                      value={newKeyType}
                      onChange={(e) => setNewKeyType(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-white"
                    >
                      <option value="YUBIKEY_5C_NFC">YubiKey 5 Series (USB-C / NFC)</option>
                      <option value="APPLE_SECURE_ENCLAVE">Apple Touch ID / Face ID</option>
                      <option value="WINDOWS_HELLO">Windows Hello Biometrics</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowAddKey(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-mono"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRegisterNewKey}
                      disabled={isPromptingTouch}
                      className="px-4 py-1.5 rounded-lg bg-[#132338] text-white text-xs font-mono font-bold"
                    >
                      {isPromptingTouch ? 'Touch Key...' : 'Enroll Key'}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {tokens.map(token => (
                  <div
                    key={token.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition bg-white shadow-2xs font-mono text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-slate-900">{token.name}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                        ACTIVE
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 space-y-1 mt-2">
                      <div className="flex justify-between">
                        <span>Algorithm:</span>
                        <strong className="text-slate-800">{token.algorithm}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>AAGUID:</span>
                        <span className="text-slate-600">{token.aaguid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assertions Count:</span>
                        <strong className="text-slate-800">{token.signCount} signatures</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Verified:</span>
                        <span className="text-slate-600">{new Date(token.lastUsedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-mono">
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>FIDO2 / WebAuthn Certified</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
