import React, { useEffect, useState } from "react";
import { Header, SideBar, ViewIssues } from "../../Components";
import { useAccount, useReadContract } from "wagmi";
import { parseAbi } from "viem";
import { pharmVerifyContract } from "../../context/pharmVerifyContract";
import toast from "react-hot-toast";

const issues = () => {
  const account = useAccount();
  const { isConnected } = useAccount();

  const abi = parseAbi([
    `function getManufacturerIssues(address) returns ((uint256,address,string,string,string,string,string,uint256)[])`,
  ]);

  const manufacturerAddress = account.address;

  const result = useReadContract({
    address: pharmVerifyContract.address,
    abi: abi,
    functionName: "getManufacturerIssues",
    args: isConnected ? [manufacturerAddress] : undefined,
  });

  useEffect(() => {
    if (result.data) {
      console.log(result.data);
      toast.success("Issues fetched successfully!");
    }

    if (result.error) {
      console.error(`${result.error.message}`);
      toast.error(`Transaction failed: ${result.error.message}`);
    }
  }, [result.data, result.error]);
  return (
    <div>
      <Header />
      <SideBar />
      <ViewIssues issuesDetails={result.data} />
    </div>
  );
};

export default issues;
