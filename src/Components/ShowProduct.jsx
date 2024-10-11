import React, { useEffect, useState } from "react";
import Link from "next/link";
import PacketForm from "./PacketForm";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import PacketInfo from "./PacketInfo";
import Image from "next/image";

const ShowProduct = ({ products }) => {
  // Check if products is undefined or null
  if (!products || products.length === 0) {
    return <p>Loading...</p>;
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const account = useAccount();
  const { isConnected } = useAccount();
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <div className="p-4 xl:pl-72 lg:pl-72 md:pl-72 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Product Details</h2>

      {products.map((productArray, productIndex) => {
        const [
          productId,
          productName,
          productNafdacNo,
          productForm,
          activeIngredients,
          manufacturerName,
          manufacturerAddress,
          dosageStrength,
          packagingType,
          storageConditions,
          productImage,
          packets,
          isApproved,
        ] = productArray;

        return (
          // Add a return here
          <div key={productId} className="mb-6">
            <strong className="text-2xl font-bold">{productIndex + 1}</strong>

            {/* Product Details Table */}
            <table className="table-auto mb-6 bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Field</th>
                  <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Product Name</td>
                  <td className="border px-4 py-2">{productName}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Manufacturer Name</td>
                  <td className="border px-4 py-2">{manufacturerName}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Manufacturer Address</td>
                  <td className="border px-4 py-2">{manufacturerAddress}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">NAFDAC Number</td>
                  <td className="border px-4 py-2">{productNafdacNo}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Form</td>
                  <td className="border px-4 py-2">{productForm}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Active Ingredients</td>
                  <td className="border px-4 py-2">{activeIngredients}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Dosage Strength</td>
                  <td className="border px-4 py-2">{dosageStrength} mg</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Packaging Type</td>
                  <td className="border px-4 py-2">{packagingType}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Storage Conditions</td>
                  <td className="border px-4 py-2">{storageConditions}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Approved</td>
                  <td className="border px-4 py-2">
                    {isApproved ? "Yes" : "No"}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Packets Table */}
            <h3 className="text-lg font-bold mt-6 mb-2">Batches</h3>

            <PacketInfo id={productId} />

            {/* Product Images */}
            <h3 className="text-lg font-bold mt-6 mb-2">Product Image</h3>
            <div className="flex space-x-4">
              <span>Click to view Product Image</span>
              {productImage ? (
                <a
                  href={productImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-400"
                >
                  View Product Image
                </a>
              ) : (
                <p>No image available.</p>
              )}
            </div>

            <PacketForm id={productId} />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default ShowProduct;
