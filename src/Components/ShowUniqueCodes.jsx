import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAccount, useReadContract } from "wagmi";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
import { parseAbi } from "viem";
import QRCode from "react-qr-code";

const ShowUniqueCodes = () => {
  const { isConnected, address: manufacturerAddress } = useAccount();
  const [batchNumber, setBatchNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [productUniqueCodes, setProductUniqueCodes] = useState([]);

  const abi = parseAbi([
    "function getPacketUniqueCodesForBatch(address,string) returns (string[])",
  ]);

  const validateForm = () => {
    if (batchNumber) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const result = useReadContract({
    address: pharmVerifyContract.address,
    abi: abi,
    functionName: "getPacketUniqueCodesForBatch",
    args: isConnected ? [manufacturerAddress, batchNumber] : undefined,
    enabled: isConnected && isFormValid,
  });

  useEffect(() => {
    if (result.data) {
      setProductUniqueCodes(result.data);
      toast.success("Packet Unique Codes fetched successfully!");
    }

    if (result.error) {
      toast.error(`Transaction failed: ${result.error.message}`);
    }
  }, [result.data, result.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please enter a valid Batch Number.");
    }
  };

  return (
    <div>
      <div className="mt-4">
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Enter Batch Number</h2>
          <div className="relative">
            <input
              type="search"
              value={batchNumber}
              onChange={(e) => {
                setBatchNumber(e.target.value);
                validateForm();
              }}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Packet Unique Codes"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {productUniqueCodes.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left font-semibold text-gray-700 border-b border-gray-300">
                  Unique Code
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 border-b border-gray-300">
                  QR Code
                </th>
              </tr>
            </thead>
            <tbody>
              {productUniqueCodes.map((code, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300">{code}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <div
                      style={{
                        height: "auto",
                        margin: "0 auto",
                        maxWidth: 64,
                        width: "100%",
                      }}
                    >
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={`https://pharmverify.vercel.app/verify/${code}`}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowUniqueCodes;
