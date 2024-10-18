import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { pharmVerifyContract } from "../../context/pharmVerifyContract";
import { parseAbi } from "viem";

import { SideBar, Header, ShowProduct } from "../../Components/index";

const showProducts = () => {
  const account = useAccount();
  const { isConnected } = useAccount();
  const [product, setProduct] = useState([]);

  const abi = parseAbi([
    `function getAllProductsByManufacturer(address) returns ((uint256, string, string, string, string, string, string,address, string, string, string,string, (uint256, string[], string, uint256, string, string)[], bool)[])`,
  ]);

  const manufacturerAddress = account.address;

  const result = useReadContract({
    address: pharmVerifyContract.address,
    abi: abi,
    functionName: "getAllProductsByManufacturer",
    args: isConnected ? [manufacturerAddress] : undefined,
  });

  useEffect(() => {
    if (result.data) {
      setProduct(result.data);
      console.log(result.data);
      toast.success("Products fetched successfully!");
    }

    if (result.error) {
      console.error(`${result.error.message}`);
      toast.error(`Transaction failed: ${result.error.message}`);
    }
  }, [result.data, result.error]);

  return (
    <>
      <Header />
      <SideBar />
      <ShowProduct products={result.data} />
    </>
  );
};

export default showProducts;
