// Contract Addresses, ABIs, and Deployment Bytecodes for AuraX on Base Mainnet & Base Sepolia

export const AURAX_CONTRACT_ADDRESSES = {
  BASE_MAINNET: {
    chainId: 8453,
    chainName: 'Base Mainnet',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorerUrl: 'https://basescan.org',
    validatorLicense: '0x19a4e8102948bca7821034f9810481ca90281bAc',
    treasurySink: '0x095871Cfed26b28f03e409AE612c0A5F1e1726cD',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    aurxToken: '0x6a813C3a89b6776712f7Fa4a47E1d1D45fAcE1ED'
  },
  BASE_SEPOLIA: {
    chainId: 84532,
    chainName: 'Base Sepolia Testnet',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorerUrl: 'https://sepolia.basescan.org',
    validatorLicense: '0x71aE92b4C67029bCa38914D120B89104fE589841',
    treasurySink: '0x94A180fA1762c9081e7d01248Ac9071Bcf3410a9',
    usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    aurxToken: '0x4389Bc10fA612489Ac90718cf34190281bAc8179'
  }
};

export const VALIDATOR_LICENSE_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_protocolTreasury", "type": "address" },
      { "internalType": "address", "name": "_usdcToken", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "nodeId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "priceUsdc", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "NodeLicenseMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "usdcAmountBurned", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "BurnSinkExecuted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentMintPrice",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "string", "name": "region", "type": "string" }
    ],
    "name": "mintLicense",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "nodeId", "type": "uint256" }],
    "name": "getNodeDetails",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "nodeId", "type": "uint256" },
          { "internalType": "address", "name": "operator", "type": "address" },
          { "internalType": "string", "name": "hardwareRegion", "type": "string" },
          { "internalType": "bytes32", "name": "consensusStateRoot", "type": "bytes32" },
          { "internalType": "uint256", "name": "mintedTimestamp", "type": "uint256" },
          { "internalType": "uint256", "name": "totalBlocksValidated", "type": "uint256" },
          { "internalType": "uint256", "name": "accruedMicroGasYield", "type": "uint256" },
          { "internalType": "bool", "name": "isActive", "type": "bool" }
        ],
        "internalType": "struct AuraXValidatorLicense.NodeAttestation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "ownerOf",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export const TREASURY_SINK_ABI = [
  {
    "inputs": [],
    "name": "totalProtocolInflowUsdc",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBurnedUsdc",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getInflowsCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }],
    "name": "getInflow",
    "outputs": [
      {
        "components": [
          { "internalType": "bytes32", "name": "txHash", "type": "bytes32" },
          { "internalType": "uint256", "name": "blockNumber", "type": "uint256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "address", "name": "payer", "type": "address" },
          { "internalType": "uint256", "name": "amountUsdc", "type": "uint256" },
          { "internalType": "string", "name": "productType", "type": "string" },
          { "internalType": "bytes32", "name": "merkleRoot", "type": "bytes32" }
        ],
        "internalType": "struct AuraXTreasurySink.InflowRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
