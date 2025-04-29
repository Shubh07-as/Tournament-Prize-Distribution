import { ethers } from 'ethers';

// Your deployed contract address here
const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';0x21573f626191124241900E0ce743c3CE4b889f62

// Contract ABI (interface)
const contractABI = [
    // Add only the functions you are going to use
    "function depositPrize() payable",
    "function distributePrizes(address[3] calldata _winners, uint[3] calldata _amounts) external",
    "function getAllWinners() external view returns (address[3], uint[3])",
    "function getContractBalance() external view returns (uint)",
    "function withdrawRemainingFunds() external",
    "function resetTournament() external",
    "function cancelTournamentAndRefund() external",
    "function emergencyWithdraw() external"
];

let provider;
let signer;
let contract;

// Connect to MetaMask
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Wallet connected:", await signer.getAddress());
    } else {
        alert('Please install MetaMask!');
    }
}

// Deposit prize pool
async function depositPrize(amountInEther) {
    try {
        const tx = await contract.depositPrize({ value: ethers.utils.parseEther(amountInEther) });
        await tx.wait();
        console.log('Prize deposited successfully.');
    } catch (error) {
        console.error('Error depositing prize:', error);
    }
}

// Distribute prizes
async function distributePrizes(winners, amounts) {
    try {
        const tx = await contract.distributePrizes(winners, amounts);
        await tx.wait();
        console.log('Prizes distributed successfully.');
    } catch (error) {
        console.error('Error distributing prizes:', error);
    }
}

// Get all winners
async function getAllWinners() {
    try {
        const [addresses, amounts] = await contract.getAllWinners();
        console.log('Winners:', addresses);
        console.log('Amounts:', amounts.map(amount => ethers.utils.formatEther(amount)));
    } catch (error) {
        console.error('Error fetching winners:', error);
    }
}

// Get contract balance
async function getContractBalance() {
    try {
        const balance = await contract.getContractBalance();
        console.log('Contract Balance:', ethers.utils.formatEther(balance));
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Withdraw remaining funds
async function withdrawRemainingFunds() {
    try {
        const tx = await contract.withdrawRemainingFunds();
        await tx.wait();
        console.log('Remaining funds withdrawn.');
    } catch (error) {
        console.error('Error withdrawing funds:', error);
    }
}

// Cancel tournament and refund
async function cancelTournamentAndRefund() {
    try {
        const tx = await contract.cancelTournamentAndRefund();
        await tx.wait();
        console.log('Tournament canceled and funds refunded.');
    } catch (error) {
        console.error('Error canceling tournament:', error);
    }
}

// Emergency withdrawal
async function emergencyWithdraw() {
    try {
        const tx = await contract.emergencyWithdraw();
        await tx.wait();
        console.log('Emergency withdrawal successful.');
    } catch (error) {
        console.error('Error during emergency withdrawal:', error);
    }
}

// Export functions (for React if needed)
export {
    connectWallet,
    depositPrize,
    distributePrizes,
    getAllWinners,
    getContractBalance,
    withdrawRemainingFunds,
    cancelTournamentAndRefund,
    emergencyWithdraw
};