import React, { useContext } from "react";

import { SideBar, Header, ShowProduct } from "../../Components/index";
import { TOKEN_ICO_Context } from "../../context/index";

const showProducts = () => {
  const product = [
    {
      id: 1,
      productName: "Panadol Extra",
      productNafdacNo: "A5-0054L",
      productForm: "Tablet",
      activeIngredients: "Paracetamol, Caffeine",
      dosageStrength: 500,
      packagingType: "Blister Pack",
      storageConditions: "Store in a cool, dry place away from direct sunlight",
      productImages: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      packets: [
        {
          batchNumber: "BN12345",
          serialNumber: "SN12345",
          // manufactureDate: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // 30 days ago
          // expirationDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
        },
        {
          batchNumber: "BN67890",
          serialNumber: "SN67890",
          // manufactureDate: Math.floor(Date.now() / 1000) - 60 * 24 * 60 * 60, // 60 days ago
          // expirationDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
        },
      ],
      isApproved: true,
      manufacturer: {
        manufacturerName: "Pharma Ltd.",
      },
    },
    {
      id: 2,
      productName: "Panadol Extra",
      productNafdacNo: "A5-0054L",
      productForm: "Tablet",
      activeIngredients: "Paracetamol, Caffeine",
      dosageStrength: 500,
      packagingType: "Blister Pack",
      storageConditions: "Store in a cool, dry place away from direct sunlight",
      productImages: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      packets: [
        {
          batchNumber: "BN12345",
          serialNumber: "SN12345",
          // manufactureDate: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // 30 days ago
          // expirationDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
        },
        {
          batchNumber: "BN67890",
          serialNumber: "SN67890",
          // manufactureDate: Math.floor(Date.now() / 1000) - 60 * 24 * 60 * 60, // 60 days ago
          // expirationDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
        },
      ],
      isApproved: true,
      manufacturer: {
        manufacturerName: "Pharma Ltd.",
      },
    },
  ];

  return (
    <>
      <Header />
      <SideBar />
      <ShowProduct products={product} />
    </>
  );
};

export default showProducts;
