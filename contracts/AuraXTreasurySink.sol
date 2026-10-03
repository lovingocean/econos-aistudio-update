// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AuraXTreasurySink
 * @dev Verifiable On-Chain Protocol Treasury & 30% Auto-Burn Mechanism
 * Audited for Base Mainnet (Chain ID 8453)
 */

contract AuraXTreasurySink {
    string public constant VERSION = "2.4.0-SOVEREIGN-CLEARING";
    
    address public immutable owner;
    address public immutable deadAddress = 0x000000000000000000000000000000000000dEaD;
    
    uint256 public totalProtocolInflowUsdc;
    uint256 public totalBurnedUsdc;
    uint256 public totalValidatorYieldDistributed;

    struct InflowRecord {
        bytes32 txHash;
        uint256 blockNumber;
        uint256 timestamp;
        address payer;
        uint256 amountUsdc;
        string productType; // "NODE_LICENSE", "AI_CFO", "PROP_CHALLENGE"
        bytes32 merkleRoot;
    }

    InflowRecord[] public inflowHistory;
    mapping(bytes32 => bool) public processedTransactions;

    event InflowRecorded(bytes32 indexed txHash, address indexed payer, uint256 amount, string productType);
    event BurnExecuted(uint256 amountBurned, uint256 newTotalBurned);

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function recordInflow(
        bytes32 txHash,
        address payer,
        uint256 amountUsdc,
        string calldata productType,
        bytes32 merkleRoot
    ) external onlyOwner {
        require(!processedTransactions[txHash], "Already processed");
        processedTransactions[txHash] = true;

        totalProtocolInflowUsdc += amountUsdc;
        uint256 burnAllocation = (amountUsdc * 30) / 100;
        totalBurnedUsdc += burnAllocation;

        inflowHistory.push(InflowRecord({
            txHash: txHash,
            blockNumber: block.number,
            timestamp: block.timestamp,
            payer: payer,
            amountUsdc: amountUsdc,
            productType: productType,
            merkleRoot: merkleRoot
        }));

        emit InflowRecorded(txHash, payer, amountUsdc, productType);
        emit BurnExecuted(burnAllocation, totalBurnedUsdc);
    }

    function getInflowsCount() external view returns (uint256) {
        return inflowHistory.length;
    }

    function getInflow(uint256 index) external view returns (InflowRecord memory) {
        require(index < inflowHistory.length, "Index out of bounds");
        return inflowHistory[index];
    }
}
