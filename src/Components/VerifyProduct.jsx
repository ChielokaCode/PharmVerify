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
        ProductName,
        ProductNafdacNo,
        ProductForm,
        DosageStrength,
        BatchNumber,
        ManufactureDate,
        ExpirationDate,
        ManufacturerName,
        ManufacturerAddress,
        StoringCondition,
        ActiveIngredients,
        ProductImage,
      ] = result.data; // Destructure the array returned from the contract

      // Map it to your productInfo structure
      setProductInfo({
        ProductName,
        ProductNafdacNo,
        ProductForm,
        DosageStrength,
        BatchNumber,
        ManufactureDate,
        ExpirationDate,
        ManufacturerName,
        ManufacturerAddress,
        StoringCondition,
        ActiveIngredients,
        ProductImage,
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
        <>
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">404</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Product not found
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Sorry, we couldn’t find the product you’re looking for.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6"></div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default VerifyProduct;
