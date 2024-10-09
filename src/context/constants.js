// import { ethers } from "ethers";
// import Web3Modal from "web3modal";

// //INTERNAL IMPORT
// import pharmVerifyContract from "./PharmVerify_Contract.json";

// // export const TOKEN_ADDRESS = "0xA8AAe50c67Ac480D81aC54EcF61FD45e309F705C";

// // export const OWNER_ADDRESS = "0xd09B607c8466F5BbEc8A786D226eD1de7CBAeFf7";

// export const CONTRACT_ADDRESS = "0x344c2f097Ec7fA1bACFA5B625d0bEAda00664d4A";
// export const CONTRACT_ABI = pharmVerifyContract.abi;

// const networks = {
//   base_mainnet: {
//     chainId: `0x${Number(8453).toString(16)}`,
//     chainName: "Base Mainnet",
//     nativeCurrency: {
//       name: "ETH",
//       symbol: "ETH",
//       decimals: 18,
//     },
//     rpcUrls: ["https://mainnet.base.org/"],
//     blockExplorerUrls: ["https://bscscan.com"],
//   },
//   base_sepolia: {
//     chainId: `0x${Number(84532).toString(16)}`,
//     chainName: "Base Sepolia",
//     nativeCurrency: {
//       name: "ETH",
//       symbol: "ETH",
//       decimals: 18,
//     },
//     rpcUrls: ["https://rpc.ankr.com/base_sepolia"],
//     blockExplorerUrls: ["https://bscscan.com"],
//   },
// };

// const changeNetwork = async ({ networkName }) => {
//   try {
//     if (!window.ethereum) throw new Error("No crypto wallet found");
//     await window.ethereum.request({
//       method: "wallet_addEthereumChain",
//       params: [
//         {
//           ...networks[networkName],
//         },
//       ],
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const handleNetworkSwitch = async () => {
//   const networkName = "base_sepolia";
//   await changeNetwork({ networkName });
// };

// export const CHECK_WALLET_CONNECTED = async () => {
//   if (!window.ethereum) return console.log("Please Install MetaMask");
//   // await handleNetworkSwitch();

//   const account = await window.ethereum.request({ method: "eth_accounts" });

//   if (account.length) {
//     return account[0];
//   } else {
//     console.log("Please Install MetaMask & Connect, Reload");
//   }
// };

// export const CONNECT_WALLET = async () => {
//   try {
//     if (!window.ethereum) return console.log("Please Install MetaMask");
//     await handleNetworkSwitch();

//     const account = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });

//     window.location.reload();

//     return account[0];
//   } catch (error) {
//     console.log(error);
//   }
// };

// const fetchContract = (address, abi, signer) =>
//   new ethers.Contract(address, abi, signer);

// export const CONTRACT = async () => {
//   try {
//     const web3Modal = new Web3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();

//     const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//     return contract;
//   } catch (error) {
//     console.log(error);
//   }
// };
