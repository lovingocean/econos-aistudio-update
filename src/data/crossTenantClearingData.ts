export interface TenantNode {
  id: string;
  name: string;
  legalEntity: string;
  jurisdiction: string;
  leiCode: string; // Legal Entity Identifier
  fedwireRouting: string;
  currentMeshBalance: number; // Positive = net creditor, negative = net debtor
  creditRating: string;
  clearingTier: 'PRIME_CORE' | 'INSTITUTIONAL' | 'VERIFIED_ENTERPRISE';
  guaranteeAllocation: number; // Allocated from $100M guarantee pool
  unsettledPayablesCount: number;
}

export interface InterTenantObligation {
  id: string;
  fromNodeId: string;
  fromNodeName: string;
  toNodeId: string;
  toNodeName: string;
  grossAmount: number;
  currency: string;
  invoiceRef: string;
  dueDate: string;
  underlyingService: string;
  verificationHash: string;
  status: 'PENDING_CYCLE' | 'NETTED' | 'SETTLED_FEDNOW';
}

export interface NettingCycleResult {
  cycleId: string;
  timestamp: string;
  grossVolume: number;
  netSettlementVolume: number;
  compressionRatioPct: number;
  feesEliminated: number;
  floatDaysSaved: number;
  merkleRoot: string;
  settlementProof: string;
  participatingNodesCount: number;
  status: 'CLEARED' | 'EXECUTING' | 'PENDING';
  transactions: {
    debtorNode: string;
    creditorNode: string;
    amount: number;
    fednowBatchId: string;
  }[];
}

export const TENANT_NODES: TenantNode[] = [
  {
    id: 'node_apex_01',
    name: 'Apex Robotics & Cloud Systems',
    legalEntity: 'Apex Robotics Inc. (Delaware)',
    jurisdiction: 'United States',
    leiCode: '5493006M3G59A30K9B12',
    fedwireRouting: '021000021',
    currentMeshBalance: 1420000, // +$1.42M net creditor
    creditRating: 'AA-',
    clearingTier: 'PRIME_CORE',
    guaranteeAllocation: 25000000,
    unsettledPayablesCount: 4
  },
  {
    id: 'node_sovereign_02',
    name: 'Sovereign Capital Holdings',
    legalEntity: 'Sovereign Capital Partners LLC',
    jurisdiction: 'United States',
    leiCode: '213800B89C82M98J2201',
    fedwireRouting: '121000358',
    currentMeshBalance: -3180000, // -$3.18M net debtor
    creditRating: 'AAA',
    clearingTier: 'PRIME_CORE',
    guaranteeAllocation: 35000000,
    unsettledPayablesCount: 6
  },
  {
    id: 'node_quantum_03',
    name: 'Quantum Logistics Net',
    legalEntity: 'Quantum Global Freight Corp',
    jurisdiction: 'United States & Singapore',
    leiCode: '549300H290L2919K1009',
    fedwireRouting: '026009593',
    currentMeshBalance: 840000, // +$840k net creditor
    creditRating: 'A+',
    clearingTier: 'INSTITUTIONAL',
    guaranteeAllocation: 15000000,
    unsettledPayablesCount: 3
  },
  {
    id: 'node_biosynth_04',
    name: 'BioSynth Compute Labs',
    legalEntity: 'BioSynth AI Genomics Inc.',
    jurisdiction: 'United States',
    leiCode: '254900A919018481B211',
    fedwireRouting: '122000496',
    currentMeshBalance: -720000, // -$720k net debtor
    creditRating: 'A',
    clearingTier: 'VERIFIED_ENTERPRISE',
    guaranteeAllocation: 10000000,
    unsettledPayablesCount: 5
  },
  {
    id: 'node_hyperscale_05',
    name: 'HyperScale Energy Grid',
    legalEntity: 'HyperScale Clean Power LLC',
    jurisdiction: 'United States',
    leiCode: '529900L3821094821098',
    fedwireRouting: '071000013',
    currentMeshBalance: 2250000, // +$2.25M net creditor
    creditRating: 'AA',
    clearingTier: 'PRIME_CORE',
    guaranteeAllocation: 20000000,
    unsettledPayablesCount: 2
  },
  {
    id: 'node_nexus_06',
    name: 'Nexus Autonomous Health',
    legalEntity: 'Nexus Healthcare Systems Inc.',
    jurisdiction: 'United States',
    leiCode: '549300C3891004128109',
    fedwireRouting: '051000033',
    currentMeshBalance: -610000, // -$610k net debtor
    creditRating: 'A+',
    clearingTier: 'INSTITUTIONAL',
    guaranteeAllocation: 12000000,
    unsettledPayablesCount: 4
  }
];

export const INITIAL_GROSS_OBLIGATIONS: InterTenantObligation[] = [
  {
    id: 'obl_001',
    fromNodeId: 'node_sovereign_02',
    fromNodeName: 'Sovereign Capital Holdings',
    toNodeId: 'node_apex_01',
    toNodeName: 'Apex Robotics & Cloud Systems',
    grossAmount: 4800000,
    currency: 'USD',
    invoiceRef: 'INV-2026-APX-881',
    dueDate: '2026-09-20',
    underlyingService: 'Autonomous Hardware Fleet Lease & Compute API',
    verificationHash: 'sha256:4a8b9c...e01f',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_002',
    fromNodeId: 'node_apex_01',
    fromNodeName: 'Apex Robotics & Cloud Systems',
    toNodeId: 'node_quantum_03',
    toNodeName: 'Quantum Logistics Net',
    grossAmount: 1850000,
    currency: 'USD',
    invoiceRef: 'INV-2026-QTM-104',
    dueDate: '2026-09-22',
    underlyingService: 'Global Autonomous Container Freight & Air Express',
    verificationHash: 'sha256:7c8d9e...1a2b',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_003',
    fromNodeId: 'node_quantum_03',
    fromNodeName: 'Quantum Logistics Net',
    toNodeId: 'node_hyperscale_05',
    toNodeName: 'HyperScale Energy Grid',
    grossAmount: 2400000,
    currency: 'USD',
    invoiceRef: 'INV-2026-HYP-992',
    dueDate: '2026-09-21',
    underlyingService: 'Green Hydrogen Fleet Fueling & Port Megawatt Power',
    verificationHash: 'sha256:3e4f5a...6b7c',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_004',
    fromNodeId: 'node_hyperscale_05',
    fromNodeName: 'HyperScale Energy Grid',
    toNodeId: 'node_apex_01',
    toNodeName: 'Apex Robotics & Cloud Systems',
    grossAmount: 1200000,
    currency: 'USD',
    invoiceRef: 'INV-2026-APX-902',
    dueDate: '2026-09-25',
    underlyingService: 'Grid Substation Robotics Maintenance & Telemetry',
    verificationHash: 'sha256:5a6b7c...8d9e',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_005',
    fromNodeId: 'node_biosynth_04',
    fromNodeName: 'BioSynth Compute Labs',
    toNodeId: 'node_apex_01',
    toNodeName: 'Apex Robotics & Cloud Systems',
    grossAmount: 3100000,
    currency: 'USD',
    invoiceRef: 'INV-2026-APX-914',
    dueDate: '2026-09-24',
    underlyingService: 'Dedicated AI Inference Cluster Acceleration',
    verificationHash: 'sha256:9b0c1d...2e3f',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_006',
    fromNodeId: 'node_apex_01',
    fromNodeName: 'Apex Robotics & Cloud Systems',
    toNodeId: 'node_sovereign_02',
    toNodeName: 'Sovereign Capital Holdings',
    grossAmount: 5430000,
    currency: 'USD',
    invoiceRef: 'INV-2026-SOV-401',
    dueDate: '2026-09-28',
    underlyingService: 'Syndicated Working Capital Facility Principal Tranche',
    verificationHash: 'sha256:1f2a3b...4c5d',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_007',
    fromNodeId: 'node_nexus_06',
    fromNodeName: 'Nexus Autonomous Health',
    toNodeId: 'node_biosynth_04',
    toNodeName: 'BioSynth Compute Labs',
    grossAmount: 1890000,
    currency: 'USD',
    invoiceRef: 'INV-2026-BIO-220',
    dueDate: '2026-09-20',
    underlyingService: 'RNA Folding Compute Pipeline & Sequencing Analytics',
    verificationHash: 'sha256:6e7f8a...9b0c',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_008',
    fromNodeId: 'node_sovereign_02',
    fromNodeName: 'Sovereign Capital Holdings',
    toNodeId: 'node_hyperscale_05',
    toNodeName: 'HyperScale Energy Grid',
    grossAmount: 3450000,
    currency: 'USD',
    invoiceRef: 'INV-2026-HYP-310',
    dueDate: '2026-09-21',
    underlyingService: 'Solar Farm Off-Take Power Purchase Settlement',
    verificationHash: 'sha256:8a9b0c...1d2e',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_009',
    fromNodeId: 'node_quantum_03',
    fromNodeName: 'Quantum Logistics Net',
    toNodeId: 'node_nexus_06',
    toNodeName: 'Nexus Autonomous Health',
    grossAmount: 1280000,
    currency: 'USD',
    invoiceRef: 'INV-2026-NEX-712',
    dueDate: '2026-09-22',
    underlyingService: 'Cold-Chain Biologics Transport & Robotic Dispensation',
    verificationHash: 'sha256:2b3c4d...5e6f',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_010',
    fromNodeId: 'node_nexus_06',
    fromNodeName: 'Nexus Autonomous Health',
    toNodeId: 'node_sovereign_02',
    toNodeName: 'Sovereign Capital Holdings',
    grossAmount: 2500000,
    currency: 'USD',
    invoiceRef: 'INV-2026-SOV-818',
    dueDate: '2026-09-26',
    underlyingService: 'Equipment Capital Lease Amortization',
    verificationHash: 'sha256:4d5e6f...7a8b',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_011',
    fromNodeId: 'node_biosynth_04',
    fromNodeName: 'BioSynth Compute Labs',
    toNodeId: 'node_quantum_03',
    toNodeName: 'Quantum Logistics Net',
    grossAmount: 490000,
    currency: 'USD',
    invoiceRef: 'INV-2026-QTM-601',
    dueDate: '2026-09-25',
    underlyingService: 'Cryo-Specimen Hazardous Courier Express',
    verificationHash: 'sha256:7f8a9b...0c1d',
    status: 'PENDING_CYCLE'
  },
  {
    id: 'obl_012',
    fromNodeId: 'node_hyperscale_05',
    fromNodeName: 'HyperScale Energy Grid',
    toNodeId: 'node_sovereign_02',
    toNodeName: 'Sovereign Capital Holdings',
    grossAmount: 2100000,
    currency: 'USD',
    invoiceRef: 'INV-2026-SOV-109',
    dueDate: '2026-09-23',
    underlyingService: 'Battery Storage Project Debt Coupon Payment',
    verificationHash: 'sha256:0d1e2f...3a4b',
    status: 'PENDING_CYCLE'
  }
];
