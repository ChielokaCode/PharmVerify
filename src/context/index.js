// import React, { useState } from "react";
// import { ethers } from "ethers";
// import toast from "react-hot-toast";

// import {
//   CHECK_WALLET_CONNECTED,
//   CONNECT_WALLET,
//   CONTRACT,
//   CONTRACT_ADDRESS,
//   CONTRACT_ABI,
// } from "./constants";

// export const TOKEN_ICO_Context = React.createContext();

// export const TOKEN_ICO_Provider = ({ children }) => {
//   const DAPP_NAME = "PharmVerify DAPP";
//   const currency = "ETH";
//   const network = "Base";

//   const [loader, setLoader] = useState(false);
//   const [account, setAccount] = useState();

//   const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
//   const notifyError = (msg) => toast.error(msg, { duration: 2000 });

//   //--- CONTRACT FUNCTION ---

//   const ADD_MANUFACTURER = async (
//     owner,
//     manufacturerName,
//     licenseNumber,
//     businessRegNo,
//     companyAddress,
//     companyPhoneNo,
//     companyEmail,
//     companyCountry,
//     companyCertification,
//     companyRegulatoryBody
//   ) => {
//     try {
//       setLoader(true);
//       const address = await CHECK_WALLET_CONNECTED();

//       if (address) {
//         console.log("Connected wallet address:", address);
//         const contract = await CONTRACT();

//         // Calling the addManufacturer function on the contract with the necessary arguments
//         const transaction = await contract.addManufacturer(
//           address,
//           manufacturerName,
//           licenseNumber,
//           businessRegNo,
//           companyAddress,
//           companyPhoneNo,
//           companyEmail,
//           companyCountry,
//           companyCertification,
//           companyRegulatoryBody,
//           {
//             gasLimit: ethers.utils.hexlify(8000000), // Set gas limit for the transaction
//           }
//         );

//         // Wait for the transaction to be mined/confirmed
//         await transaction.wait();
//         setLoader(false);
//         notifySuccess("Manufacturer added successfully");
//         window.location.reload(); // Reload the page to reflect changes
//       }
//     } catch (error) {
//       console.log("Error adding manufacturer:", error);
//       notifyError("Error, try again later");
//       setLoader(false); // Reset the loader in case of an error
//     }
//   };

//   // const TOKEN_WITHDRAW = async () => {
//   //   try {
//   //     setLoader(true);
//   //     const address = await CHECK_WALLET_CONNECTED();

//   //     if (address) {
//   //       const contract = await CONTRACT();

//   //       const tokenDetails = await contract.getTokenDetails();

//   //       const avaliableToken = ethers.utils.formatEther(
//   //         tokenDetails.balance.toString()
//   //       );

//   //       if (avaliableToken > 1) {
//   //         const transaction = await contract.withdrawAllTokens();

//   //         await transaction.wait();
//   //         setLoader(false);
//   //         notifySuccess("Transaction completed successfully");
//   //         window.location.reload();
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     notifyError("error try again later");
//   //     setLoader(false);
//   //   }
//   // };

//   // const DONATE = async (AMOUNT) => {
//   //   try {
//   //     setLoader(true);
//   //     const address = await CHECK_WALLET_CONNECTED();

//   //     if (address) {
//   //       const contract = await TOKEN_ICO_CONTRACT();
//   //       const payAmount = ethers.utils.parseUnits(AMOUNT.toString(), "ether");

//   //       const transaction = await contract.transferToOwner(payAmount, {
//   //         value: payAmount.toString(),
//   //         gasLimit: ethers.utils.hexlify(8000000),
//   //       });

//   //       await transaction.wait();
//   //       setLoader(false);
//   //       notifySuccess("Transaction completed successfully");
//   //       window.location.reload();
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     notifyError("error try again later");
//   //     setLoader(false);
//   //   }
//   // };

//   // const TRANSFER_ETHER = async (transfer) => {
//   //   try {
//   //     setLoader(true);

//   //     const { _receiver, _amount } = transfer;
//   //     const address = await CHECK_WALLET_CONNECTED();

//   //     if (address) {
//   //       const contract = await TOKEN_ICO_CONTRACT();
//   //       const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

//   //       const transaction = await contract.transferEther(_receiver, payAmount, {
//   //         value: payAmount.toString(),
//   //         gasLimit: ethers.utils.hexlify(8000000),
//   //       });

//   //       await transaction.wait();
//   //       setLoader(false);
//   //       notifySuccess("Transaction completed successfully");
//   //       window.location.reload();
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     notifyError("error try again later");
//   //     setLoader(false);
//   //   }
//   // };

//   return (
//     <TOKEN_ICO_Context.Provider
//       value={{
//         ADD_MANUFACTURER,
//         // BUY_TOKEN,
//         // TRANSFER_ETHER,
//         // DONATE,
//         // TOKEN_WITHDRAW,
//         CONNECT_WALLET,
//         // ERC20,
//         CHECK_ACCOUNT_BALANCE,
//         setAccount,
//         setLoader,
//         // addtokenToMetaMask,
//         // TOKEN_ADDRESS,
//         // loader,
//         // account,
//         // currency,
//       }}
//     >
//       {children}
//     </TOKEN_ICO_Context.Provider>
//   );
// };
