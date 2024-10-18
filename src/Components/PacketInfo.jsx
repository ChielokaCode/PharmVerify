import React, { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
import { parseAbi } from "viem";
import toast from "react-hot-toast";
import { ethers } from "ethers";

const PacketInfo = ({ id }) => {
  const [batch, setBatch] = useState([]);
  const { isConnected } = useAccount();
  const account = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState(false); // Loading state

  const getBatchForProductAbi = parseAbi([
    "function getBatchesForProduct(address,uint256) view returns ((uint256,string[],string,uint256,string,uint256,string,string)[])",
  ]);

  const generatePacketAbi = parseAbi([
    "function generatePacketUniqueCodes(address,string) returns (string)",
  ]);

  const result = useReadContract({
    address: pharmVerifyContract.address,
    abi: getBatchForProductAbi,
    functionName: "getBatchesForProduct",
    args: [account.address, Number(id)],
  });

  useEffect(() => {
    if (!isConnected) {
      toast.error("Please connect wallet");
    }
    if (result.data) {
      setBatch(result.data); // Un-commented to save the fetched batch data in state
      console.log(result.data);
      toast.success("Batch Information fetched successfully!");
    }

    if (result.error) {
      toast.error(`Transaction failed: ${result.error.message}`);
    }
  }, [result.data, result.error, isConnected]); // Ensure dependencies are set correctly

  return (
    <div>
      {batch.length > 0 ? ( // Checking if batches are available
        <table className="table-auto mb-2">
          <thead>
            <tr>
              <th className="px-2 py-2">Batch Number</th>
              <th className="px-2 py-2">Quantity</th>
              <th className="px-2 py-2">Manufacture Date</th>
              <th className="px-2 py-2">Expiration Date</th>
              <th className="px-2 py-2">Code</th>
            </tr>
          </thead>
          <tbody>
            {batch.map((batchItem, index) => {
              console.log(batchItem);
              const [
                batchId,
                packetUniqueCodes,
                batchNumber,
                batchQuantity,
                productName,
                productId,
                manufactureDate,
                expirationDate,
              ] = batchItem;

              return (
                <tr key={batchId} className="bg-white">
                  <td className="border px-2 py-2">{batchNumber}</td>
                  <td className="border px-2 py-2">{Number(batchQuantity)}</td>
                  <td className="border px-2 py-2">{manufactureDate}</td>
                  <td className="border px-2 py-2">{expirationDate}</td>
                  <td className="border px-2 py-2">
                    <button
                      type="submit"
                      onClick={async (e) => {
                        e.preventDefault();

                        if (!isConnected) {
                          toast.error("Please connect your Wallet!");
                          return;
                        }
                        setLoading(true);
                        try {
                          await writeContractAsync(
                            {
                              address: pharmVerifyContract.address,
                              abi: generatePacketAbi,
                              functionName: "generatePacketUniqueCodes",
                              args: [account.address, batchNumber],
                            },
                            {
                              onSettled(data, error) {
                                if (error) {
                                  toast.error("Transaction failed");
                                } else {
                                  toast.success(
                                    "Unique Codes generated successfully!"
                                  );
                                }
                                setLoading(false);
                                console.log("Settled", { data, error });
                              },
                            }
                          );
                        } catch (error) {
                          setLoading(false);
                          console.error("Transaction failed", error);
                        }
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      <i className="fa fa-address-book-o" aria-hidden="true" />
                      {loading ? (
                        <div className="flex justify-center items-center h-64">
                          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-600"></div>
                          <span className="ml-2 text-white">Processing...</span>
                        </div>
                      ) : (
                        <span>Generate Codes</span>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Batch available.</p>
      )}
    </div>
  );
};

export default PacketInfo;
