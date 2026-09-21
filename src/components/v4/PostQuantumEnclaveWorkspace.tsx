import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  KeyRound, 
  Server, 
  Lock, 
  Unlock, 
  RefreshCw, 
  CheckCircle2, 
  Globe2, 
  Radio, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { POST_QUANTUM_KEYS, ENCLAVE_HOST_NODES } from '../../data/planetaryLayersData';
import { PostQuantumCryptographicKey, EnclaveHostNode } from '../../types/econos';

export const PostQuantumEnclaveWorkspace: React.FC = () => {
  const [keys, setKeys] = useState<PostQuantumCryptographicKey[]>(POST_QUANTUM_KEYS);
  const [nodes, setNodes] = useState<EnclaveHostNode[]>(ENCLAVE_HOST_NODES);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationNotice, setRotationNotice] = useState<string | null>(null);
  const [isAirGapIsolated, setIsAirGapIsolated] = useState(false);

  const handleRotateKeys = () => {
    setIsRotating(true);
    setRotationNotice(null);

    setTimeout(() => {
      setKeys(prev => prev.map(k => ({
        ...k,
        lastRotationTimestamp: new Date().toISOString()
      })));
      setIsRotating(false);
      setRotationNotice(`Post-Quantum key rotation complete: Re-seeded 1,024-bit ML-KEM and Crystals-Dilithium keypairs across Zurich, Reykjavik, and Singapore secure enclaves.`);
    }, 1200);
  };

  const handleToggleAirGap = () => {
    setIsAirGapIsolated(prev => !prev);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                Planetary Layer 24 • Post-Quantum Cryptographic Fortress
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Post-Quantum Enclave & Air-Gap Hardware Mesh
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              Immune to Shor's Algorithm and next-generation quantum decryptor attacks. Multi-million dollar treasury signing relies on NIST-standardized Crystals-Kyber and Crystals-Dilithium executed inside confidential AMD SEV-SNP memory-encrypted silicon with autonomous air-gap isolation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
              isAirGapIsolated 
                ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' 
                : 'bg-purple-50 text-purple-800 border border-purple-200'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAirGapIsolated ? 'AIR-GAP MESH ISOLATED' : 'NIST LEVEL-5 SECURE'}</span>
            </span>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100 font-mono text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Cryptographic Standard</span>
            <span className="text-base font-bold text-purple-700">ML-KEM-1024</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Quantum Security Equiv.</span>
            <span className="text-base font-bold text-slate-900">256-Bit Post-Quantum</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Confidential Enclaves</span>
            <span className="text-base font-bold text-emerald-700">3 Global Nodes (AMD SEV)</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] uppercase">Key Shard Quorum</span>
            <span className="text-base font-bold text-sky-700">3 of 5 Shards Required</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Cryptographic Key Ring + Enclave Hardware Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: PQC Key Ring (Col-7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-purple-600" />
              <h2 className="font-bold text-slate-900 text-sm">Post-Quantum Active Key Ring</h2>
            </div>
            <span className="text-[10px] text-slate-400">NIST FIPS 203 / 204 Validated</span>
          </div>

          <div className="mt-4 space-y-3">
            {keys.map(k => (
              <div key={k.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{k.keyAlias}</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                    {k.algorithmStandard}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                  <div>
                    <span className="text-slate-400 block">Enclave Type:</span>
                    <span className="font-bold text-slate-800">{k.hardwareEnclaveType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Threshold Quorum:</span>
                    <span className="font-bold text-emerald-700">{k.totalShardsThreshold} of {k.activeShards} Shards</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Last Rotation:</span>
                    <span className="font-bold text-slate-700">{new Date(k.lastRotationTimestamp).toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 text-[10px] text-slate-500">
                  <span>Geographic Shards: </span>
                  <strong className="text-slate-700">{k.geographicDistribution.join(' • ')}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
            <button
              onClick={handleRotateKeys}
              disabled={isRotating}
              className="flex-1 py-2 px-3 rounded-xl bg-[#132338] hover:bg-[#0c1827] text-white font-bold transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span>{isRotating ? 'Rotating Post-Quantum Keys...' : 'Trigger Global Key Rotation'}</span>
            </button>

            <button
              onClick={handleToggleAirGap}
              className={`py-2 px-4 rounded-xl font-bold transition flex items-center gap-1.5 ${
                isAirGapIsolated
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isAirGapIsolated ? 'Reconnect Mesh' : 'Emergency Air-Gap'}</span>
            </button>
          </div>

          {rotationNotice && (
            <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-sans flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{rotationNotice}</span>
            </div>
          )}
        </div>

        {/* Right Col: Enclave Host Hardware Nodes (Col-5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-sky-600" />
                <h2 className="font-bold text-slate-900 text-sm">Confidential Silicon Nodes</h2>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold">100% Attested</span>
            </div>

            <p className="text-slate-500 text-[11px] mt-2 font-sans">
              Cryptographic keys are never decrypted in host RAM or operating system memory; CPU-level hardware encryption isolates state from cloud hypervisors and state-sponsored espionage.
            </p>

            <div className="mt-4 space-y-3">
              {nodes.map(node => (
                <div key={node.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{node.jurisdiction}</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                      VERIFIED
                    </span>
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    Provider: <strong className="text-slate-700">{node.datacenterProvider}</strong>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Memory Key ID:</span>
                    <span className="text-slate-700 font-bold">{node.memoryEncryptionKeyId}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Tamper Protocol:</span>
                    <span className="text-amber-700 font-bold">{node.tamperResponseAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Shor's Algorithm Defense: <strong className="text-purple-700">ACTIVE</strong></span>
            <span className="text-emerald-700 font-bold">Zero Plaintext Exposure</span>
          </div>
        </div>
      </div>
    </div>
  );
};
