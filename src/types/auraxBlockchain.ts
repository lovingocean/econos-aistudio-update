/**
 * AURA-X SOVEREIGN ZERO-FRAUD BLOCKCHAIN SPECIFICATION & ENGINE CORE
 * 
 * Formal Rules & Invariants:
 * 1. ZERO-MEMPOOL ENCRYPTED COMMITS (Threshold Decrypted Batches to eliminate MEV/Frontrunning)
 * 2. PROOF-CARRYING INVARIANTS (PCT): Mathematical drain prevention pre-execution
 * 3. GUARDIAN TIMELOCK & REVERSAL WINDOW: User-sovereign theft recovery & mistake revert
 * 4. ON-CHAIN DETERMINISTIC NEURAL VM: In-consensus fraud & manipulation detection
 * 5. DAG-BFT HIGH THROUGHPUT PARALLEL EXECUTION ENGINE
 */

export type TransactionClass = 'INSTANT_PAYMENT' | 'VAULT_PROTECTED' | 'SMART_CONTRACT_INVOKE' | 'GOVERNANCE_ACTION';

export type InvariantVerdict = 'SAFE' | 'POTENTIAL_DRAIN_HALT' | 'FRONT_RUN_MUTATION_REJECTED' | 'GUARDIAN_REVERT_ISSUED';

export interface AuraXTransaction {
  id: string;
  sender: string;
  recipient: string;
  amount: number;
  token: string;
  txClass: TransactionClass;
  timestamp: number;
  nonce: number;
  encryptedPayloadHash: string;
  guardianWindowSeconds: number; // 0 for instant, 300 to 86400 for vault
  guardianRevertActiveUntil?: number;
  isReverted?: boolean;
  invariantProof: {
    merkleRoot: string;
    drainCheckPassed: boolean;
    flashLoanRatio: number;
    anomalyScore: number;
  };
  status: 'PENDING_THRESHOLD_DECRYPT' | 'VALIDATED_PCT' | 'COMMITTED_BLOCK' | 'REVERTED_BY_GUARDIAN';
}

export interface AuraXBlock {
  blockNumber: number;
  blockHash: string;
  parentHash: string;
  timestamp: number;
  validator: string;
  transactions: AuraXTransaction[];
  gasConsumed: number;
  neuralAnomalyScore: number;
  stateRoot: string;
  proofOfInvariantRoot: string;
}

export interface ValidatorNode {
  id: string;
  name: string;
  region: string;
  stakeAmount: number;
  status: 'ACTIVE' | 'ATTESTING' | 'SLASHED';
  reputationScore: number;
  lastBlockProduced: number;
  blocksValidated: number;
  mevAttemptsBlocked: number;
  fraudTransactionsIntercepted: number;
}

export interface InvariantSecurityRule {
  id: string;
  title: string;
  category: 'ANTI_THEFT' | 'ANTI_MEV' | 'ANTI_DRAIN' | 'NEURAL_INTEGRITY';
  mathematicalExpression: string;
  description: string;
  enforcementLevel: 'CONSENSUS_CRITICAL' | 'PRE_EXECUTION_GATE' | 'POST_BLOCK_ATTEST';
  status: 'ENFORCING';
  blockedCount: number;
}
