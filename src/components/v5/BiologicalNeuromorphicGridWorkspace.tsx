import React, { useState } from 'react';
import { 
  Dna, 
  Cpu, 
  Leaf, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Layers, 
  Database,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { NeuromorphicWetwareNode, BioComputeForwardContract } from '../../types/econos';

export const BiologicalNeuromorphicGridWorkspace: React.FC = () => {
  const [nodes, setNodes] = useState<NeuromorphicWetwareNode[]>([
    {
      id: 'BIO_NODE_001_ORGANOID',
      facilityLocation: 'Cambridge Bio-Silicon Foundry',
      computeMedium: 'CORTICAL_ORGANOID_ARRAY',
      operatingWattage: 0.08, // 80 milliwatts vs 800W for GPU
      tflopsEquivalent: 42.5,
      neuralPlasticityLearningRate: 0.94,
      biologicalLifespanRemainingHours: 4280,
      thermalEfficiencyRatio: '99.99% lower than Nvidia H100',
      status: 'ONLINE_ACTIVE'
    },
    {
      id: 'BIO_NODE_002_DNA_VAULT',
      facilityLocation: 'Zurich Deep Synthetic Vault',
      computeMedium: 'SYNTHETIC_DNA_COLD_STORAGE',
      operatingWattage: 0.01,
      tflopsEquivalent: 12.0,
      storageDensityPetabytesPerGram: 215.0, // 215 PB per gram of DNA
      neuralPlasticityLearningRate: 0.12,
      biologicalLifespanRemainingHours: 876000, // 100+ years
      thermalEfficiencyRatio: 'Zero standby cooling power required',
      status: 'DNA_COLD_ARCHIVE'
    },
    {
      id: 'BIO_NODE_003_OPTICAL',
      facilityLocation: 'Kyoto Neuromorphic Photonics Center',
      computeMedium: 'OPTICAL_NEUROMORPHIC_TENSOR',
      operatingWattage: 1.4,
      tflopsEquivalent: 128.0,
      neuralPlasticityLearningRate: 0.88,
      biologicalLifespanRemainingHours: 85000,
      thermalEfficiencyRatio: '99.85% lower heat dissipation',
      status: 'ONLINE_ACTIVE'
    }
  ]);

  const [contracts, setContracts] = useState<BioComputeForwardContract[]>([
    {
      id: 'CONTRACT_PROTEIN_001',
      researchSponsor: 'Novartis & DeepMolecular Bio-Synthetics',
      jobSpecification: 'PROTEIN_DE_NOVO_SYNTHESIS',
      capacityUnitsAllocated: '480 Organoid Compute Hours',
      contractPriceUsd: 1450000,
      energySavedKwhVsSilicon: 84200,
      executionPhase: 'SYNTHESIZING'
    },
    {
      id: 'CONTRACT_DNA_002',
      researchSponsor: 'Global Sovereign Archive & Treaty Depository',
      jobSpecification: 'DNA_100TB_LONG_TERM_COLD_WRITE',
      capacityUnitsAllocated: '100 Terabytes Oligonucleotide Encapsulation',
      contractPriceUsd: 890000,
      energySavedKwhVsSilicon: 142000,
      executionPhase: 'VERIFYING_MOLECULAR_HASH'
    },
    {
      id: 'CONTRACT_BRAIN_003',
      researchSponsor: 'Frontier AI Neural Architecture Laboratory',
      jobSpecification: 'BRAIN_ORGANOID_SIMULATION',
      capacityUnitsAllocated: '1,200 Synaptic Plasticity Pod Hours',
      contractPriceUsd: 3200000,
      energySavedKwhVsSilicon: 210000,
      executionPhase: 'DELIVERED_TO_VAULT'
    }
  ]);

  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleAlert, setScheduleAlert] = useState<string | null>(null);

  const handleScheduleBioJob = () => {
    setIsScheduling(true);
    setScheduleAlert('Synthesizing de novo nucleotide sequence on Cambridge Organoid cluster...');

    setTimeout(() => {
      const newContract: BioComputeForwardContract = {
        id: `CONTRACT_BIO_${Date.now().toString().slice(-4)}`,
        researchSponsor: 'Regeneron Multi-Omic Discovery Engine',
        jobSpecification: 'PROTEIN_DE_NOVO_SYNTHESIS',
        capacityUnitsAllocated: '350 Organoid Tensor Pod Hours',
        contractPriceUsd: 920000,
        energySavedKwhVsSilicon: 62000,
        executionPhase: 'SYNTHESIZING'
      };

      setContracts(prev => [newContract, ...prev]);
      setIsScheduling(false);
      setScheduleAlert('WETWARE JOB SCHEDULED: Allocated 350 Organoid Tensor Pod Hours at 0.08W baseload power (saving 62,000 kWh vs silicon GPU clusters).');
    }, 2000);
  };

  const totalEnergySaved = contracts.reduce((sum, c) => sum + c.energySavedKwhVsSilicon, 0);
  const totalContractVolume = contracts.reduce((sum, c) => sum + c.contractPriceUsd, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-2xl p-6 text-white border border-emerald-900/60 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Tier 5 • Layer 30
              </span>
              <span className="text-xs font-mono text-slate-400">Bio-Compute & Wetware Rails</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Biological & Neuromorphic Synthetic Wetware Grid
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Trading forward commodities in cortical organoid intelligence, synthetic DNA data storage pipelines, and optical neuromorphic chips operating at 99.9% lower energy than silicon.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleScheduleBioJob}
              disabled={isScheduling}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Dna className={`w-4 h-4 ${isScheduling ? 'animate-spin' : ''}`} />
              <span>{isScheduling ? 'Synthesizing...' : 'Schedule Bio-Compute Batch'}</span>
            </button>
          </div>
        </div>

        {/* Live Notification */}
        {scheduleAlert && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/60 text-xs font-mono text-emerald-200 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{scheduleAlert}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-900/40 font-mono text-xs">
          <div>
            <div className="text-slate-400">Bio-Compute Clusters</div>
            <div className="text-lg font-bold text-white mt-0.5">{nodes.length} Wetware Nodes</div>
          </div>
          <div>
            <div className="text-slate-400">Energy Saved vs Silicon</div>
            <div className="text-lg font-bold text-emerald-300 mt-0.5">{totalEnergySaved.toLocaleString()} kWh</div>
          </div>
          <div>
            <div className="text-slate-400">Forward Contract Value</div>
            <div className="text-lg font-bold text-teal-300 mt-0.5">${(totalContractVolume / 1e6).toFixed(2)}M USD</div>
          </div>
          <div>
            <div className="text-slate-400">DNA Density Rating</div>
            <div className="text-lg font-bold text-cyan-300 mt-0.5">215 Petabytes / gram</div>
          </div>
        </div>
      </div>

      {/* Wetware Nodes Array */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900 font-mono">Neuromorphic Wetware Compute Nodes</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Continuous Synaptic Monitoring</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nodes.map(node => (
            <div 
              key={node.id} 
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-700">{(node.computeMedium || '').replace(/_/g, ' ')}</div>
                  <div className="font-bold text-slate-900 text-sm">{node.facilityLocation}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                  {node.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80">
                <div>
                  <div className="text-slate-400 text-[10px]">Power Consumption</div>
                  <div className="font-bold text-emerald-700">{node.operatingWattage} W</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">TFLOPS Equiv</div>
                  <div className="font-bold text-slate-900">{node.tflopsEquivalent} TFLOPS</div>
                </div>
                <div className="col-span-2">
                  <div className="text-slate-400 text-[10px]">Thermal Advantage</div>
                  <div className="text-[11px] font-bold text-teal-700">{node.thermalEfficiencyRatio}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bio-Compute Forward Contracts */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900 font-mono">Bio-Compute Forward Commodity Contracts</h2>
          </div>
          <span className="text-xs font-mono text-teal-700 font-bold">DNA Storage & Organoid Pipeline</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 pb-2">
                <th className="py-2.5 font-bold">Research Sponsor / Job</th>
                <th className="py-2.5 font-bold">Allocated Capacity</th>
                <th className="py-2.5 font-bold">Contract Value</th>
                <th className="py-2.5 font-bold">Energy Saved</th>
                <th className="py-2.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contracts.map(contract => (
                <tr key={contract.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-medium text-slate-900">
                    <div className="font-bold">{contract.researchSponsor}</div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-0.5">{(contract.jobSpecification || '').replace(/_/g, ' ')}</div>
                  </td>
                  <td className="py-3 text-slate-600">
                    {contract.capacityUnitsAllocated}
                  </td>
                  <td className="py-3 font-bold text-slate-900">
                    ${(contract.contractPriceUsd / 1e3).toFixed(0)}k USD
                  </td>
                  <td className="py-3 font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>{contract.energySavedKwhVsSilicon.toLocaleString()} kWh</span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      contract.executionPhase === 'DELIVERED_TO_VAULT'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-teal-100 text-teal-800 animate-pulse'
                    }`}>
                      {(contract.executionPhase || '').replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
