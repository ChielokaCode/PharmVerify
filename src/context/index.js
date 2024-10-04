import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {
  CHECK_WALLET_CONNECTED,
  CONNECT_WALLET,
  GET_BALANCE,
  CHECK_ACCOUNT_BALANCE,
  TOKEN_ICO_CONTRACT,
  ERC20,
  ERC20_CONTRACT,
  TOKEN_ADDRESS,
  addtokenToMetaMask,
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from "./constants";

export const TOKEN_ICO_Context = React.createContext();

export const TOKEN_ICO_Provider = ({ children }) => {
  const DAPP_NAME = "PharmVerify DAPP";
  const currency = "ETH";
  const network = "Base";

  const [loader, setLoader] = useState(false);
  const [account, setAccount] = useState();
  const [count, setCount] = useState(0);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  //--- CONTRACT FUNCTION ---
  const BUY_TOKEN = async (amount) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();

        const avaliableToken = ethers.utils.formatEther(
          tokenDetails.balance.toString()
        );

        if (avaliableToken > 1) {
          const price =
            ethers.utils.formatEther(tokenDetails.tokenPrice.toString()) *
            Number(amount);

          const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

          console.log(payAmount);

          const transaction = await contract.buyToken(Number(amount), {
            value: payAmount.toString(),
            gasLimit: ethers.utils.hexlify(8000000),
          });

          await transaction.wait();
          setLoader(false);
          notifySuccess("Transaction completed successfully");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  const TOKEN_WITHDRAW = async () => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();

        const avaliableToken = ethers.utils.formatEther(
          tokenDetails.balance.toString()
        );

        if (avaliableToken > 1) {
          const transaction = await contract.withdrawAllTokens();

          await transaction.wait();
          setLoader(false);
          notifySuccess("Transaction completed successfully");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  const DONATE = async (AMOUNT) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(AMOUNT.toString(), "ether");

        const transaction = await contract.transferToOwner(payAmount, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  const TRANSFER_ETHER = async (transfer) => {
    try {
      setLoader(true);

      const { _receiver, _amount } = transfer;
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

        const transaction = await contract.transferEther(_receiver, payAmount, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  return (
    <TOKEN_ICO_Context.Provider
      value={{
        BUY_TOKEN,
        TRANSFER_ETHER,
        DONATE,
        TOKEN_WITHDRAW,
        CONNECT_WALLET,
        ERC20,
        CHECK_ACCOUNT_BALANCE,
        setAccount,
        setLoader,
        addtokenToMetaMask,
        TOKEN_ADDRESS,
        loader,
        account,
        currency,
      }}
    >
      {children}
    </TOKEN_ICO_Context.Provider>
  );
};
