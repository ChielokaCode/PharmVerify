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
          quantity: 10,
          manufactureDate: "10-04-2024",
          expirationDate: "03-01-2026",
        },
        {
          batchNumber: "BN67890",
          quantity: 15,
          manufactureDate: "10-04-2024",
          expirationDate: "03-01-2026",
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
          quantity: 20,
          manufactureDate: "10-04-2024",
          expirationDate: "03-01-2026",
        },
        {
          batchNumber: "BN67890",
          quantity: 20,
          manufactureDate: "10-04-2024",
          expirationDate: "03-01-2026",
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
