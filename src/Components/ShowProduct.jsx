import React from "react";
import Link from "next/link";

const ShowProduct = ({ products }) => {
  // Check if products is undefined or null
  if (!products || products.length === 0) {
    return <p>Loading...</p>; // Show a loading state or a placeholder
  }

  return (
    <div className="p-4 xl:pl-72 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Product Details</h2>

      {products.map((product) => (
        <div key={product.id} className="mb-6">
          <strong className="text-2xl font-bold">{product.id}</strong>
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
                <td className="border px-4 py-2">{product.productName}</td>
              </tr>
              {product.manufacturer && (
                <tr>
                  <td className="border px-4 py-2">Manufacturer Name</td>
                  <td className="border px-4 py-2">
                    {product.manufacturer.manufacturerName}
                  </td>
                </tr>
              )}
              <tr>
                <td className="border px-4 py-2">NAFDAC Number</td>
                <td className="border px-4 py-2">{product.productNafdacNo}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Form</td>
                <td className="border px-4 py-2">{product.productForm}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Active Ingredients</td>
                <td className="border px-4 py-2">
                  {product.activeIngredients}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Dosage Strength</td>
                <td className="border px-4 py-2">
                  {product.dosageStrength} mg
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Packaging Type</td>
                <td className="border px-4 py-2">{product.packagingType}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Storage Conditions</td>
                <td className="border px-4 py-2">
                  {product.storageConditions}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Approved</td>
                <td className="border px-4 py-2">
                  {product.isApproved ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Packets Table */}
          <h3 className="text-lg font-bold mt-6 mb-2">Packets</h3>
          {product.packets && product.packets.length > 0 ? (
            <table className="table-auto mb-6">
              <thead>
                <tr>
                  <th className="px-2 py-2">Batch Number</th>
                  <th className="px-2 py-2">Serial Number</th>
                  <th className="px-2 py-2">Manufacture Date</th>
                  <th className="px-2 py-2">Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                {product.packets.map((packet, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border px-2 py-2">{packet.batchNumber}</td>
                    <td className="border px-2 py-2">{packet.serialNumber}</td>
                    <td className="border px-2 py-2">
                      {packet.manufactureDate
                        ? new Date(
                            packet.manufactureDate * 1000
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="border px-2 py-2">
                      {packet.expirationDate
                        ? new Date(
                            packet.expirationDate * 1000
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No packets available.</p>
          )}

          {/* Product Images */}
          <h3 className="text-lg font-bold mt-6 mb-2">Product Images</h3>
          <div className="flex space-x-4">
            {product.productImages && product.productImages.length > 0 ? (
              product.productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index}`}
                  className="w-32 h-32 object-cover"
                />
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>

          {/* Edit Product Link */}
          <div className="mt-6 mb-6">
            <Link
              href={`/edit-product/${product.id}`} // Link to edit page using product ID
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Product
            </Link>
          </div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default ShowProduct;
