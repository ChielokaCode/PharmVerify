export const pharmVerifyContract = {
  address: "0x8Fd902875052bC682C27ef35527dAA7d82eCdf93",
  abi: [
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "BatchAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "uint256", name: "i", type: "uint256" },
        {
          indexed: false,
          internalType: "string",
          name: "randomStr",
          type: "string",
        },
      ],
      name: "DebugRandomValue",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "ManufacturerAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "PacketUniqueCodesGenerated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "ProductAdded",
      type: "event",
    },
    {
      inputs: [],
      name: "_batchCounter",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_manufacturerCounter",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_productCounter",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
        { internalType: "uint256", name: "_productId", type: "uint256" },
        { internalType: "string", name: "_batchNumber", type: "string" },
        { internalType: "uint256", name: "_batchQuantity", type: "uint256" },
        { internalType: "string", name: "_manufactureDate", type: "string" },
        { internalType: "string", name: "_expirationDate", type: "string" },
      ],
      name: "addBatch",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
        { internalType: "string", name: "_manufacturerName", type: "string" },
        { internalType: "string", name: "_licenseNumber", type: "string" },
        { internalType: "string", name: "_businessRegNo", type: "string" },
        { internalType: "string", name: "_companyAddress", type: "string" },
        { internalType: "string", name: "_companyPhoneNo", type: "string" },
        { internalType: "string", name: "_companyEmail", type: "string" },
        { internalType: "string", name: "_companyCountry", type: "string" },
        {
          internalType: "string",
          name: "_companyCertification",
          type: "string",
        },
        {
          internalType: "string",
          name: "_companyRegulatoryBody",
          type: "string",
        },
      ],
      name: "addManufacturer",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
        { internalType: "string", name: "_productName", type: "string" },
        { internalType: "string", name: "_productNafdacNo", type: "string" },
        { internalType: "string", name: "_productForm", type: "string" },
        { internalType: "string", name: "_activeIngredients", type: "string" },
        { internalType: "string", name: "_dosageStrength", type: "string" },
        { internalType: "string", name: "_packagingType", type: "string" },
        { internalType: "string", name: "_storageConditions", type: "string" },
        { internalType: "string", name: "_productImage", type: "string" },
      ],
      name: "addProduct",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
      ],
      name: "checkManufacturer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
        { internalType: "string", name: "_batchNumber", type: "string" },
      ],
      name: "generatePacketUniqueCodes",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllManufacturers",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "id", type: "uint256" },
            {
              internalType: "address",
              name: "manufacturerAddress",
              type: "address",
            },
            {
              internalType: "string",
              name: "manufacturerName",
              type: "string",
            },
            { internalType: "string", name: "licenseNumber", type: "string" },
            { internalType: "string", name: "businessRegNo", type: "string" },
            { internalType: "string", name: "companyAddress", type: "string" },
            { internalType: "string", name: "companyPhoneNo", type: "string" },
            { internalType: "string", name: "companyEmail", type: "string" },
            { internalType: "string", name: "companyCountry", type: "string" },
            {
              internalType: "string",
              name: "companyCertification",
              type: "string",
            },
            {
              internalType: "string",
              name: "companyRegulatoryBody",
              type: "string",
            },
            {
              components: [
                { internalType: "uint256", name: "id", type: "uint256" },
                { internalType: "string", name: "productName", type: "string" },
                {
                  internalType: "string",
                  name: "productNafdacNo",
                  type: "string",
                },
                { internalType: "string", name: "productForm", type: "string" },
                {
                  internalType: "string",
                  name: "activeIngredients",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "manufacturerName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "manufacturerAddress",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "dosageStrength",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "packagingType",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "storageConditions",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "productImage",
                  type: "string",
                },
                {
                  components: [
                    { internalType: "uint256", name: "id", type: "uint256" },
                    {
                      internalType: "string[]",
                      name: "packetUniqueCodes",
                      type: "string[]",
                    },
                    {
                      internalType: "string",
                      name: "batchNumber",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "batchQuantity",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "productName",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "manufactureDate",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "expirationDate",
                      type: "string",
                    },
                  ],
                  internalType: "struct YourContract.Batch[]",
                  name: "batchList",
                  type: "tuple[]",
                },
                { internalType: "bool", name: "isApproved", type: "bool" },
              ],
              internalType: "struct YourContract.Product[]",
              name: "productList",
              type: "tuple[]",
            },
            { internalType: "bool", name: "isRegistered", type: "bool" },
          ],
          internalType: "struct YourContract.Manufacturer[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
      ],
      name: "getAllProductsByManufacturer",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "string", name: "productName", type: "string" },
            { internalType: "string", name: "productNafdacNo", type: "string" },
            { internalType: "string", name: "productForm", type: "string" },
            {
              internalType: "string",
              name: "activeIngredients",
              type: "string",
            },
            {
              internalType: "string",
              name: "manufacturerName",
              type: "string",
            },
            {
              internalType: "string",
              name: "manufacturerAddress",
              type: "string",
            },
            { internalType: "string", name: "dosageStrength", type: "string" },
            { internalType: "string", name: "packagingType", type: "string" },
            {
              internalType: "string",
              name: "storageConditions",
              type: "string",
            },
            { internalType: "string", name: "productImage", type: "string" },
            {
              components: [
                { internalType: "uint256", name: "id", type: "uint256" },
                {
                  internalType: "string[]",
                  name: "packetUniqueCodes",
                  type: "string[]",
                },
                { internalType: "string", name: "batchNumber", type: "string" },
                {
                  internalType: "uint256",
                  name: "batchQuantity",
                  type: "uint256",
                },
                { internalType: "string", name: "productName", type: "string" },
                {
                  internalType: "string",
                  name: "manufactureDate",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "expirationDate",
                  type: "string",
                },
              ],
              internalType: "struct YourContract.Batch[]",
              name: "batchList",
              type: "tuple[]",
            },
            { internalType: "bool", name: "isApproved", type: "bool" },
          ],
          internalType: "struct YourContract.Product[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
        { internalType: "string", name: "_batchNumber", type: "string" },
      ],
      name: "getBatchByBatchNumber",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "id", type: "uint256" },
            {
              internalType: "string[]",
              name: "packetUniqueCodes",
              type: "string[]",
            },
            { internalType: "string", name: "batchNumber", type: "string" },
            { internalType: "uint256", name: "batchQuantity", type: "uint256" },
            { internalType: "string", name: "productName", type: "string" },
            { internalType: "string", name: "manufactureDate", type: "string" },
            { internalType: "string", name: "expirationDate", type: "string" },
          ],
          internalType: "struct YourContract.Batch",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
        { internalType: "uint256", name: "_productId", type: "uint256" },
      ],
      name: "getBatchesForProduct",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "id", type: "uint256" },
            {
              internalType: "string[]",
              name: "packetUniqueCodes",
              type: "string[]",
            },
            { internalType: "string", name: "batchNumber", type: "string" },
            { internalType: "uint256", name: "batchQuantity", type: "uint256" },
            { internalType: "string", name: "productName", type: "string" },
            { internalType: "string", name: "manufactureDate", type: "string" },
            { internalType: "string", name: "expirationDate", type: "string" },
          ],
          internalType: "struct YourContract.Batch[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_manufacturerAddress",
          type: "address",
        },
        { internalType: "string", name: "_batchNumber", type: "string" },
      ],
      name: "getPacketUniqueCodesForBatch",
      outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isManufacturer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_uniqueCode", type: "string" }],
      name: "searchPacket",
      outputs: [
        {
          components: [
            { internalType: "string", name: "productName", type: "string" },
            { internalType: "string", name: "productNafdacNo", type: "string" },
            { internalType: "string", name: "productForm", type: "string" },
            { internalType: "string", name: "dosageStrength", type: "string" },
            { internalType: "string", name: "batchNumber", type: "string" },
            { internalType: "string", name: "manufactureDate", type: "string" },
            { internalType: "string", name: "expirationDate", type: "string" },
            {
              internalType: "string",
              name: "manufacturerName",
              type: "string",
            },
            {
              internalType: "string",
              name: "manufacturerAddress",
              type: "string",
            },
            {
              internalType: "string",
              name: "storingCondition",
              type: "string",
            },
            {
              internalType: "string",
              name: "activeIngredients",
              type: "string",
            },
            { internalType: "string", name: "productImage", type: "string" },
          ],
          internalType: "struct YourContract.ProductInfo",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ],
};
