// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PharmVerifyContract {
  address public immutable owner;

  // // State variable to track if a manufacturer exists
  //   bool public isManufacturer;

  struct Batch {
    uint256 id;
    string[] packetUniqueCodes;
    string batchNumber;
    uint256 batchQuantity;
    string productName;
    uint256 productId;
    string manufactureDate;
    string expirationDate;
  }

  struct Product {
    uint256 id;
    string productName;
    string productNafdacNo;
    string productForm;
    string activeIngredients;
    string manufacturerName;
    string manufacturerAddress;
    string dosageStrength;
    string packagingType;
    string storageConditions;
    string productImage;
    Batch[] batchList;
    bool isApproved;
  }

  struct ProductInfo {
    string productName;
    string productNafdacNo;
    string productForm;
    string dosageStrength;
    string batchNumber;
    string manufactureDate;
    string expirationDate;
    string manufacturerName;
    string manufacturerAddress;
    string storingCondition;
    string activeIngredients;
    string productImage;
    string comment;
}


  struct Manufacturer {
    uint256 id;
    address manufacturerAddress;
    string manufacturerName;
    string licenseNumber;
    string businessRegNo;
    string companyAddress;
    string companyPhoneNo;
    string companyEmail;
    string companyCountry;
    string companyCertification;
    string companyRegulatoryBody;
    Product[] productList;
    // bool isConfirmed;
    // bool hasPaid;
    bool isRegistered;
  }

   //events
   event ManufacturerAdded(string message);
   event ProductAdded(string message);
   event BatchAdded(string message);
   event PacketUniqueCodesGenerated(string message);
   event DebugRandomValue(uint256 indexed i, string randomStr);

  uint256 public _manufacturerCounter = 0;
  uint256 public _productCounter = 0;
  uint256 public _batchCounter = 0;

  // Mappings for manufacturer, product, and batch data storage
  struct DataStore {
    mapping(address => Manufacturer) manufacturers;
    address[] manufacturerAddresses;
    mapping(uint256 => Product) products;
    mapping(string => Batch) batches;
  }

  DataStore private dataStore;

  // Constructor: Called once on contract deployment
  // Check packages/foundry/deploy/Deploy.s.sol
  constructor(
    address _owner
  ) {
    owner = _owner;
  }

  // Modifier: used to define a set of rules that must be met before or after a function is executed
  // Check the withdraw() function
  modifier isOwner() {
    // msg.sender: predefined variable that represents address of the account that called the current function
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  // Add manufacturer details and ensure unique manufacturer address
  function addManufacturer(
    address _manufacturerAddress,
    string memory _manufacturerName,
    string memory _licenseNumber,
    string memory _businessRegNo,
    string memory _companyAddress,
    string memory _companyPhoneNo,
    string memory _companyEmail,
    string memory _companyCountry,
    string memory _companyCertification,
    string memory _companyRegulatoryBody
  ) public returns (string memory) {
    require(
      dataStore.manufacturers[_manufacturerAddress].manufacturerAddress
        == address(0),
      "Manufacturer already exists"
    );
    _manufacturerCounter += 1;

    Manufacturer storage newManufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    newManufacturer.id = _manufacturerCounter;
    newManufacturer.manufacturerAddress = _manufacturerAddress;
    newManufacturer.manufacturerName = _manufacturerName;
    newManufacturer.licenseNumber = _licenseNumber;
    newManufacturer.businessRegNo = _businessRegNo;
    newManufacturer.companyAddress = _companyAddress;
    newManufacturer.companyPhoneNo = _companyPhoneNo;
    newManufacturer.companyEmail = _companyEmail;
    newManufacturer.companyCountry = _companyCountry;
    newManufacturer.companyCertification = _companyCertification;
    newManufacturer.companyRegulatoryBody = _companyRegulatoryBody;
    newManufacturer.isRegistered = true;

    dataStore.manufacturers[_manufacturerAddress] = newManufacturer;
    dataStore.manufacturerAddresses.push(_manufacturerAddress);

    emit ManufacturerAdded("Manufacturer added successfully");
    return "Manufacturer added successfully";
  }

// Function to check if a manufacturer exists and update the state variable
    function checkManufacturer(address _manufacturerAddress)
    public
    view
    returns (bool)
{
    // Check if the _manufacturerAddress exists in the dataStore
    for (uint256 i = 0; i < dataStore.manufacturerAddresses.length; i++) {
        if (dataStore.manufacturerAddresses[i] == _manufacturerAddress) {
            return true; // Return true as soon as we find a match
        }
    }

    // If no match found, return false
    return false;
}




  // Function to get all manufacturers
function getAllManufacturers() public view returns (Manufacturer[] memory) {
    uint256 manufacturerCount = dataStore.manufacturerAddresses.length;
    Manufacturer[] memory allManufacturers = new Manufacturer[](manufacturerCount);

    // Iterate over the manufacturerAddresses array to fetch manufacturer details
    for (uint256 i = 0; i < manufacturerCount; i++) {
        address manufacturerAddress = dataStore.manufacturerAddresses[i];
        allManufacturers[i] = dataStore.manufacturers[manufacturerAddress];
    }

    return allManufacturers;
}

  // Add a product to the manufacturer's product list and ensure a unique product name
  function addProduct(
    address _manufacturerAddress,
    string memory _productName,
    string memory _productNafdacNo,
    string memory _productForm,
    string memory _activeIngredients,
    string memory _dosageStrength,
    string memory _packagingType,
    string memory _storageConditions,
    string memory _productImage
  ) public returns (string memory) {
    Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

    for (uint256 i = 0; i < manufacturer.productList.length; i++) {
      require(
        keccak256(abi.encodePacked(manufacturer.productList[i].productName))
          != keccak256(abi.encodePacked(_productName)),
        "Product name already exists"
      );
    }

    _productCounter += 1;
    uint256 productId = _productCounter;

    Product storage newProduct = dataStore.products[productId];
    newProduct.id = productId;
    newProduct.productName = _productName;
    newProduct.productNafdacNo = _productNafdacNo;
    newProduct.productForm = _productForm;
    newProduct.activeIngredients = _activeIngredients;
    newProduct.manufacturerName = manufacturer.manufacturerName;
    newProduct.manufacturerAddress = manufacturer.companyAddress;
    newProduct.dosageStrength = _dosageStrength;
    newProduct.packagingType = _packagingType;
    newProduct.storageConditions = _storageConditions;
    newProduct.productImage = _productImage;

    manufacturer.productList.push(newProduct);

    emit ProductAdded("Product added successfully");
    return "Product added successfully";
  }

//Function to get all products by the manufacturer
  function getAllProductsByManufacturer(address _manufacturerAddress) 
        public 
        view 
        returns (Product[] memory)
    {
     Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

    return manufacturer.productList; 
    }

  // Add a batch for a specific product
  function addBatch(
    address _manufacturerAddress,
    uint256 _productId,
    string memory _batchNumber,
    uint256 _batchQuantity,
    string memory _manufactureDate,
    string memory _expirationDate
  ) public returns (string memory) {
   Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

    _batchCounter += 1;
    uint256 newBatchId = _batchCounter;

    Product storage product = dataStore.products[_productId];
    require(bytes(product.productName).length > 0, "Product not found");



    Batch storage newBatch = dataStore.batches[_batchNumber];
      newBatch.id = newBatchId;
      newBatch.batchNumber = _batchNumber;
      newBatch.batchQuantity = _batchQuantity;
      newBatch.productName = product.productName;
      newBatch.productId = product.id;
      newBatch.manufactureDate = _manufactureDate;
      newBatch.expirationDate = _expirationDate;

    product.batchList.push(newBatch);

    emit BatchAdded("Batch added successfully");

    return "Batch added successfully";
  }

  function getBatchesForProduct(address _manufacturerAddress, uint256 _productId) public view returns (Batch[] memory) {

    Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

    // Check if the product exists
    Product storage product = dataStore.products[_productId];
    require(bytes(product.productName).length > 0, "Product not found");

    return product.batchList;
}

function getBatchByBatchNumber(address _manufacturerAddress, string memory _batchNumber) public view returns (Batch memory) {

  Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

    
    // Retrieve the batch from the dataStore using the batch number
    Batch storage batch = dataStore.batches[_batchNumber];

    // Check if the batch exists (assuming the batch has an id field or similar)
    require(batch.id != 0, "Batch not found"); // Adjust the condition based on your Batch struct

    return batch; // Return the batch details
}


  // Generate unique packet codes for a batch and return the list of generated codes
  function generatePacketUniqueCodes(
    address _manufacturerAddress,
    string memory _batchNumber
) public returns (string memory) {
    Manufacturer storage manufacturer = dataStore.manufacturers[_manufacturerAddress];

    require(manufacturer.isRegistered, "Manufacturer is not registered");

    Batch storage batch = dataStore.batches[_batchNumber];
    require(batch.batchQuantity > 0, "Invalid batch quantity");
    require(batch.batchQuantity <= 1000, "Batch quantity exceeds safe limit"); // Added limit

    require(batch.packetUniqueCodes.length == 0, "Packet codes have already been generated");

    for (uint256 i = 0; i < batch.batchQuantity; i++) {
        string memory packetCode = string(
            abi.encodePacked(uint2str(batch.productId),"PharmVerify", batch.batchNumber,"B", uint2str(i)) // Use uint2str to convert uint to string
        );
        batch.packetUniqueCodes.push(packetCode);
    }

    emit PacketUniqueCodesGenerated("Unique Codes generated successfully");

    return "Unique Codes generated successfully";
}

// Helper function to convert uint to string
function uint2str(uint _i) internal pure returns (string memory) {
    if (_i == 0) {
        return "0";
    }
    uint j = _i;
    uint len;
    while (j != 0) {
        len++;
        j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len;
    while (_i != 0) {
        bstr[--k] = bytes1(uint8(48 + _i % 10));
        _i /= 10;
    }
    return string(bstr);
}

  function getPacketUniqueCodesForBatch(
    address _manufacturerAddress,
    string memory _batchNumber
) public view returns (string[] memory) {
    // Check if the manufacturer is registered
    Manufacturer storage manufacturer = dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered == true, "Manufacturer is not registered");

    // Check if the batch exists and is valid
    Batch storage batch = dataStore.batches[_batchNumber];
    require(batch.batchQuantity > 0, "Invalid or non-existent batch");

    // Return the packet unique codes for the specified batch
    return batch.packetUniqueCodes;
}

// Helper function to convert string to uint
function str2uint(string memory _str) internal pure returns (uint256) {
    bytes memory b = bytes(_str);
    uint256 result = 0;
    for (uint256 i = 0; i < b.length; i++) {
        require(b[i] >= '0' && b[i] <= '9', "Product not Found"); // Validate input
        result = result * 10 + (uint256(uint8(b[i])) - 48);
    }
    return result;
}

function extractProductId(string memory _packetCode) public pure returns (uint256) {
    // Find the position of "PharmVerify" in the string
    bytes memory codeBytes = bytes(_packetCode);
    uint256 index = 0;

    // Loop to find the start of the "PharmVerify" section
    while (index < codeBytes.length) {
        if (
            index + 10 < codeBytes.length && // Check if there are enough bytes left
            codeBytes[index] == 'P' &&
            codeBytes[index + 1] == 'h' &&
            codeBytes[index + 2] == 'a' &&
            codeBytes[index + 3] == 'r' &&
            codeBytes[index + 4] == 'm' &&
            codeBytes[index + 5] == 'V' &&
            codeBytes[index + 6] == 'e' &&
            codeBytes[index + 7] == 'r' &&
            codeBytes[index + 8] == 'i' &&
            codeBytes[index + 9] == 'f' &&
            codeBytes[index + 10] == 'y'
        ) {
            break; // Found "PharmVerify"
        }
        index++;
    }

    // Extract the productId portion of the string
    string memory productIdStr = new string(index); // Create a new string
    bytes memory productIdBytes = bytes(productIdStr);
    for (uint256 i = 0; i < index; i++) {
        productIdBytes[i] = codeBytes[i]; // Copy bytes directly
    }

    // Convert the extracted string to uint256
    return str2uint(productIdStr);
}


//batchNumber
function extractBatchNumber(string memory _packetCode) public pure returns (string memory) {
    bytes memory codeBytes = bytes(_packetCode);
    uint256 startIndex = 0;
    uint256 endIndex = 0;

    // Find the start of "PharmVerify"
    while (startIndex < codeBytes.length) {
        if (
            codeBytes[startIndex] == 'P' && 
            codeBytes[startIndex + 1] == 'h' &&
            codeBytes[startIndex + 2] == 'a' &&
            codeBytes[startIndex + 3] == 'r' &&
            codeBytes[startIndex + 4] == 'm' &&
            codeBytes[startIndex + 5] == 'V' &&
            codeBytes[startIndex + 6] == 'e' &&
            codeBytes[startIndex + 7] == 'r' &&
            codeBytes[startIndex + 8] == 'i' &&
            codeBytes[startIndex + 9] == 'f' &&
            codeBytes[startIndex + 10] == 'y'
        ) {
            startIndex += 11; // Move past "PharmVerify"
            break;
        }
        startIndex++;
    }

    // Find the "B" that marks the end of the batchNumber
    endIndex = startIndex;
    while (endIndex < codeBytes.length) {
        if (codeBytes[endIndex] == 'B') {
            break;
        }
        endIndex++;
    }

    // Extract the batchNumber substring
    bytes memory batchNumberBytes = new bytes(endIndex - startIndex);
    for (uint256 i = 0; i < batchNumberBytes.length; i++) {
        batchNumberBytes[i] = codeBytes[startIndex + i];
    }

    return string(batchNumberBytes);
}



function searchPacket(string memory _uniqueCode) public view returns (ProductInfo memory) {
    uint256 productId = extractProductId(_uniqueCode);
    Product storage product = dataStore.products[productId];
    require(product.id == productId, "Product not found"); // Error handling for product

    string memory batchNumber = extractBatchNumber(_uniqueCode);
    Batch storage batch = dataStore.batches[batchNumber]; // Correctly access the batch mapping

    // Create an instance of ProductInfo to return
    ProductInfo memory productInfo = ProductInfo({
        productName: product.productName,
        productNafdacNo: product.productNafdacNo,
        productForm: product.productForm,
        dosageStrength: product.dosageStrength,
        batchNumber: batch.batchNumber,
        manufactureDate: batch.manufactureDate,
        expirationDate: batch.expirationDate,
        manufacturerName: product.manufacturerName,
        manufacturerAddress: product.manufacturerAddress,
        storingCondition: product.storageConditions,
        activeIngredients: product.activeIngredients,
        productImage: product.productImage,
        comment: "The product is in good condition"
    });

    return productInfo; // Return the found productInfo
}


  /**
   * Function that allows the owner to withdraw all the Ether in the contract
   * The function can only be called by the owner of the contract as defined by the isOwner modifier
   */
  function withdraw() public isOwner {
    (bool success,) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  /**
   * Function that allows the contract to receive ETH
   */
  receive() external payable { }
}
