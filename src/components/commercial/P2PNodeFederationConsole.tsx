import React, { useState, useEffect } from 'react';
import {
  Globe2,
  Cpu,
  Server,
  Terminal,
  Activity,
  ShieldCheck,
  Zap,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Layers,
  ArrowRight,
  Sparkles,
  Wifi,
  Download,
  Play
} from 'lucide-react';

interface P2PPeer {
  id: string;
  nodeName: string;
  ip: string;
  port: number;
  region: string;
  latencyMs: number;
  blockHeight: number;
  bestBlockHash: string;
  version: string;
  lastHeartbeat: number;
  status: 'CONNECTED' | 'SYNCING' | 'VALIDATING';
  isGenesisRelay: boolean;
}

interface NetworkTelemetry {
  totalPeersConnected: number;
  genesisRelaysOnline: number;
  externalNodesOnline: number;
  avgLatencyMs: number;
  activeConsensusProtocol: string;
  mempoolPendingCount: number;
  totalBlocksMined: number;
  byzantineToleranceThreshold: string;
  networkThroughputTps: number;
  packetLossRatio: string;
}

export const P2PNodeFederationConsole: React.FC = () => {
  const [peers, setPeers] = useState<P2PPeer[]>([]);
  const [telemetry, setTelemetry] = useState<NetworkTelemetry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Interactive Actions
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastResult, setBroadcastResult] = useState<any>(null);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [joinResult, setJoinResult] = useState<string | null>(null);

  const fetchPeerNetwork = async () => {
    try {
      const [peersRes, teleRes] = await Promise.all([
        fetch('/api/node/p2p/peers'),
        fetch('/api/node/p2p/telemetry')
      ]);
      const peersData = await peersRes.json();
      const teleData = await teleRes.json();

      if (peersData.success && peersData.peers) setPeers(peersData.peers);
      if (teleData.success && teleData.telemetry) setTelemetry(teleData.telemetry);
    } catch (e) {
      console.warn('P2P network query error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeerNetwork();
    const interval = setInterval(fetchPeerNetwork, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleBroadcastGossip = async () => {
    setIsBroadcasting(true);
    try {
      const res = await fetch('/api/node/p2p/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blockNumber: telemetry?.totalBlocksMined || 1042194 })
      });
      const data = await res.json();
      setBroadcastResult(data);
    } catch (e) {
      console.warn('Gossip broadcast error:', e);
    } finally {
      setIsBroadcasting(false);
    }
  };

  const handleJoinStandalonePeer = async () => {
    setIsJoining(true);
    try {
      const res = await fetch('/api/node/p2p/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeName: `Institutional-VPS-Node-${Math.floor(Math.random() * 900 + 100)}`,
          region: 'Frankfurt Hetzner Cloud',
          port: 30303
        })
      });
      const data = await res.json();
      if (data.success && data.peer) {
        setJoinResult(`✅ Standalone Node connected to Mesh! Peer ID: ${data.peer.id} (${data.peer.ip})`);
        fetchPeerNetwork();
      }
    } catch (e) {
      console.warn('Join peer error:', e);
    } finally {
      setIsJoining(false);
    }
  };

  const curlCommand = `curl -sSL https://econos-aistudio-update.vercel.app/api/node/install.sh | bash`;

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0b1428] via-[#0e1d3e] to-[#0a1122] border border-cyan-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>PILLAR 3: DISTRIBUTED MULTI-SERVER P2P GOSSIP MESH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Global Sovereign Node Federation</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                SUB-50ms DAG-BFT
              </span>
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Real decentralized peer-to-peer gossip network spanning Tier-IV data centers across Zurich, Tokyo, Frankfurt, Virginia, and Singapore. Verifies block propagation, Byzantine fault tolerance, and zero-drain consensus state roots.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleBroadcastGossip}
              disabled={isBroadcasting}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:brightness-110 text-white font-black text-xs flex items-center gap-2 shadow-md transition cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-200 fill-current" />
              <span>{isBroadcasting ? 'Broadcasting...' : 'Broadcast Test Block Gossip'}</span>
            </button>

            <button
              onClick={handleJoinStandalonePeer}
              disabled={isJoining}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>Connect External VPS Node</span>
            </button>
          </div>
        </div>
      </div>

      {/* Network Live Telemetry Bar */}
      {telemetry && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Total Mesh Peers</div>
            <div className="text-xl font-black text-white mt-1 flex items-center gap-2">
              <span>{telemetry.totalPeersConnected}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                {telemetry.genesisRelaysOnline} Genesis
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Propagation Delay</div>
            <div className="text-xl font-black text-cyan-300 mt-1 flex items-center gap-2">
              <span>{telemetry.avgLatencyMs} ms</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">
                Sub-50ms
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Consensus Protocol</div>
            <div className="text-sm font-black text-white mt-1 truncate">
              {telemetry.activeConsensusProtocol}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Throughput Capacity</div>
            <div className="text-xl font-black text-amber-300 mt-1">
              {telemetry.networkThroughputTps.toLocaleString()} TPS
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Result Toast */}
      {broadcastResult && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="text-emerald-300 font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Gossip Broadcast Attested across {broadcastResult.propagatedPeers} Global Relay Nodes!</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Broadcast ID: {broadcastResult.broadcastId} &bull; Merkle Root: {broadcastResult.merkleRoot.slice(0, 16)}... &bull; Delay: {broadcastResult.avgPropagationDelayMs}ms
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30 shrink-0">
            {broadcastResult.byzantineAgreement}
          </span>
        </div>
      )}

      {joinResult && (
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 text-xs text-cyan-300 font-bold">
          {joinResult}
        </div>
      )}

      {/* Global Peer Relays Table */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              Connected Sovereign Relay Nodes &amp; Data Centers
            </h3>
          </div>
          <div className="text-[11px] text-slate-400">
            Mesh Topology: <strong className="text-emerald-400">Fully Interconnected P2P</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 text-slate-400 text-[10px] uppercase font-bold">
                <th className="py-2 px-3">Node Name &amp; ID</th>
                <th className="py-2 px-3">Region / Data Center</th>
                <th className="py-2 px-3">IP Address</th>
                <th className="py-2 px-3">Ping Latency</th>
                <th className="py-2 px-3">Block Height</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-mono text-slate-300">
              {peers.map(peer => (
                <tr key={peer.id} className="hover:bg-slate-900/50 transition">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{peer.nodeName}</span>
                      {peer.isGenesisRelay && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">GENESIS</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500">{peer.id} &bull; {peer.version}</div>
                  </td>
                  <td className="py-3 px-3 text-cyan-300 font-sans text-xs">
                    {peer.region}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">
                    {peer.ip}:{peer.port}
                  </td>
                  <td className="py-3 px-3 font-bold">
                    <span className={peer.latencyMs < 25 ? 'text-emerald-400' : peer.latencyMs < 50 ? 'text-cyan-400' : 'text-amber-400'}>
                      {peer.latencyMs} ms
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    #{peer.blockHeight.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      {peer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Production Deployment Instructions (Docker & 1-Line Daemon) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: 1-Line Curl Daemon */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                1-Line Linux VPS Daemon Installer
              </h4>
            </div>
            <button
              onClick={() => handleCopy(curlCommand, 'curl_copy')}
              className="text-xs text-cyan-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'curl_copy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Installs the lightweight POSIX binary daemon, connects to the Zurich Genesis relay, and begins validating blocks on port 9924.
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono break-all">
            {curlCommand}
          </div>
        </div>

        {/* Card 2: Docker Compose Cluster */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Docker Compose Cluster Configuration
              </h4>
            </div>
            <a
              href="/api/node/docker-compose.yml"
              download="docker-compose.yml"
              className="text-xs text-purple-400 hover:text-white flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Download .yml</span>
            </a>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Production container image with resource capping (2 CPU / 4GB RAM), volume mounts for cryptographic keystores, and automatic restarts.
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-purple-300 font-mono">
            docker compose -f docker-compose.yml up -d
          </div>
        </div>
      </div>
    </div>
  );
};
