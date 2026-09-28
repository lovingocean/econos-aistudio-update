import { 
  AuraXBlock, 
  AuraXTransaction, 
  ValidatorNode, 
  InvariantSecurityRule 
} from '../types/auraxBlockchain';

// 5 Consensus-Enforced Anti-Fraud Rules
export const AURA_INVARIANT_RULES: InvariantSecurityRule[] = [
  {
    id: 'PCT-01-ANTI-DRAIN',
    title: 'Pool Invariant Conservation (Anti-Flash-Drain)',
    category: 'ANTI_DRAIN',
    mathematicalExpression: 'ΔPoolLiquidity / TotalSupply <= MaxSlippageConstant (k_post >= k_pre * (1 - ε))',
    description: 'Intercepts anomalous multi-hop flash borrow calls that cause pool reserve divergence exceeding mathematical tolerance in a single block.',
    enforcementLevel: 'CONSENSUS_CRITICAL',
    status: 'ENFORCING',
    blockedCount: 38
  },
  {
    id: 'PCT-02-ZERO-MEV',
    title: 'Threshold Decryption Batch Order Invariance',
    category: 'ANTI_MEV',
    mathematicalExpression: 'Sequence(Tx) = PseudoRandomHash(BlockSeed, Nonce) | Decryption occurs post-commitment',
    description: 'Validators commit to an encrypted order batch before reading transactions, preventing bots from paying higher gas to front-run retail traders.',
    enforcementLevel: 'PRE_EXECUTION_GATE',
    status: 'ENFORCING',
    blockedCount: 142
  },
  {
    id: 'PCT-03-GUARDIAN-REV',
    title: 'Vault Protected Reversal Rail',
    category: 'ANTI_THEFT',
    mathematicalExpression: 'Revert(Tx) = Sign(SecondaryGuardianKey, Nonce) valid ∀ t ∈ [T_tx, T_tx + Δt_window]',
    description: 'Allows an account owner to instantly halt and reverse unauthorized wallet drainer transactions within the configurable safety window.',
    enforcementLevel: 'CONSENSUS_CRITICAL',
    status: 'ENFORCING',
    blockedCount: 29
  },
  {
    id: 'PCT-04-NEURAL-INTEGRITY',
    title: 'On-Chain Neural Anomaly Detection',
    category: 'NEURAL_INTEGRITY',
    mathematicalExpression: 'NeuralAnomaly(TxFeatures, GraphTopology) < 0.15 threshold',
    description: 'Deterministic neural weights run inside the validator engine to evaluate wallet cluster collusion, wash trading loops, and sybil drain attacks.',
    enforcementLevel: 'PRE_EXECUTION_GATE',
    status: 'ENFORCING',
    blockedCount: 61
  },
  {
    id: 'PCT-05-ATOMIC-SETTLE',
    title: 'Sub-Second DAG-BFT Finality Proof',
    category: 'ANTI_THEFT',
    mathematicalExpression: 'Finality(Block_h) = 2/3 + 1 Stake Attestations in < 400ms',
    description: 'Eliminates block re-orgs, selfish mining, and 51% rollbacks through instant BFT finality certificates.',
    enforcementLevel: 'CONSENSUS_CRITICAL',
    status: 'ENFORCING',
    blockedCount: 0
  }
];

export const INITIAL_VALIDATOR_NODES: ValidatorNode[] = [
  {
    id: 'val-aurax-01',
    name: 'Genesis Sovereign Node 01 (Zurich)',
    region: 'Europe (Switzerland)',
    stakeAmount: 5000000,
    status: 'ACTIVE',
    reputationScore: 99.98,
    lastBlockProduced: 1042180,
    blocksValidated: 421800,
    mevAttemptsBlocked: 48,
    fraudTransactionsIntercepted: 12
  },
  {
    id: 'val-aurax-02',
    name: 'Institutional Guard Node 02 (Tokyo)',
    region: 'Asia-Pacific (Japan)',
    stakeAmount: 4200000,
    status: 'ACTIVE',
    reputationScore: 99.95,
    lastBlockProduced: 1042181,
    blocksValidated: 398200,
    mevAttemptsBlocked: 39,
    fraudTransactionsIntercepted: 9
  },
  {
    id: 'val-aurax-03',
    name: 'Zero-Knowledge Attestation Node 03 (New York)',
    region: 'North America (US East)',
    stakeAmount: 4800000,
    status: 'ACTIVE',
    reputationScore: 99.99,
    lastBlockProduced: 1042182,
    blocksValidated: 412500,
    mevAttemptsBlocked: 55,
    fraudTransactionsIntercepted: 8
  }
];
