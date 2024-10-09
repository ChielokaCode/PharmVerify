import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAccount, useReadContract } from "wagmi";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
import { parseAbi } from "viem";

const VerifyProduct = ({ code }) => {
  const { isConnected } = useAccount();
  const [productInfo, setProductInfo] = useState(null); // Initialized to null

  const abi = parseAbi([
    "function searchPacket(string) returns ((string,string,string,string,string,string,string,string,string,string,string,string))",
  ]);

  // Use readContract to call the searchPacket function
  const result = useReadContract({
    address: pharmVerifyContract.address,
    abi: abi,
    functionName: "searchPacket",
    args: isConnected ? [code] : undefined, // Send 'code' as argument if connected
    enabled: isConnected, // Enable only if connected
  });

  useEffect(() => {
    if (result.data) {
      console.log(result.data);
      const [
        productName,
        productNafdacNo,
        productForm,
        dosageStrength,
        batchNumber,
        manufactureDate,
        expirationDate,
        manufacturerName,
        manufacturerAddress,
        storingCondition,
        activeIngredients,
        productImage,
      ] = result.data; // Destructure the array returned from the contract

      // Map it to your productInfo structure
      setProductInfo({
        productName,
        productNafdacNo,
        productForm,
        dosageStrength,
        batchNumber,
        manufactureDate,
        expirationDate,
        manufacturerName,
        manufacturerAddress,
        storingCondition,
        activeIngredients,
        productImage,
      });

      toast.success("Packet Information fetched successfully!");
    }

    if (result.error) {
      console.log(code);
      console.log(result.error);
      toast.error("Invalid Product Number");
    }
  }, [result.data, result.error]);

  return (
    <div>
      {productInfo ? (
        <div className="overflow-x-auto mt-8">
          <table className="min-w-[50%] xl:ml-72 lg:ml-72 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left font-semibold text-gray-700 border-b border-gray-300">
                  Field
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 border-b border-gray-300">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(productInfo).map(([key, value], index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300">{key}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Product not Found</div>
      )}
    </div>
  );
};

export default VerifyProduct;
