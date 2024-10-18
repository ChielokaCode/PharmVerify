import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAccount, useReadContract } from "wagmi";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
import { parseAbi } from "viem";
import Image from "next/image";
import ReportIssue from "./ReportIssue"; // Make sure to import the ReportIssue component

const VerifyProduct = ({ code }) => {
  const { isConnected, address } = useAccount();
  const [productInfo, setProductInfo] = useState(null);
  const [manufacturerAddress, setManufacturerAddress] = useState(null);
  const [productName, setProductName] = useState("");
  const [productBatchNumber, setProductBatchNumber] = useState("");

  const abi = parseAbi([
    "function searchPacket(string) returns ((string,string,string,string,string,string,string,string,string,address,string,string,string,string))",
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
        CompanyAddress,
        ManufacturerAddress,
        StoringCondition,
        ActiveIngredients,
        ProductImage,
        Comment,
      ] = result.data;

      setProductInfo({
        ProductName,
        ProductNafdacNo,
        ProductForm,
        DosageStrength,
        BatchNumber,
        ManufactureDate,
        ExpirationDate,
        ManufacturerName,
        CompanyAddress,
        // ManufacturerAddress,
        StoringCondition,
        ActiveIngredients,
        ProductImage,
        Comment,
      });

      setManufacturerAddress(ManufacturerAddress);
      setProductName(ProductName);
      setProductBatchNumber(BatchNumber);

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
                  Product Details
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
                    {typeof value === "string" ? (
                      value.endsWith(".png") ||
                      value.endsWith(".jpg") ||
                      value.endsWith(".jpeg") ? (
                        <Image
                          src={value}
                          alt={key}
                          width={100}
                          height={100}
                          className="w-24 h-24 object-cover"
                        />
                      ) : value.includes("github") ||
                        value.includes("amazon") ? (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-500"
                        >
                          View Product Image
                        </a>
                      ) : (
                        value
                      )
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 ml-6 mb-4">
            <h2 className="text-md font-bold">
              Verify Nafdac Number with following link below
            </h2>
            <p className="text-sm font-medium mb-4">
              Copy and paste Nafdac Number into the input field in the link to
              confirm product
            </p>
            <a
              className="underline text-blue-500"
              href="https://www.napams.org/#search-domain"
            >
              Verify NafDac Number
            </a>
          </div>

          {manufacturerAddress && (
            <div className="mt-4 mb-4">
              <ReportIssue
                address={manufacturerAddress}
                productName={productName}
                productBatchNumber={productBatchNumber}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Loading Product Details...
              </h1>
              <div className="mt-10 flex items-center justify-center gap-x-6"></div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default VerifyProduct;
