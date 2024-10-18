// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PharmVerifyContract {
  address public immutable owner;

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
    string companyAddress;
    address manufacturerAddress;
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
    string companyAddress;
    address manufacturerAddress;
    string storingCondition;
    string activeIngredients;
    string productImage;
    string comment;
}

struct IssueReport {
    uint256 id;
    address userAddress;
    string userName;
    string location;
    string issue;
    string productName;
    string productBatchNumber;
    uint256 timestamp;
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
    bool isRegistered;
    IssueReport[] reports;
  }

  uint256 public _manufacturerCounter = 0;
  uint256 public _productCounter = 0;
  uint256 public _batchCounter = 0;
  uint256 public _issueReportCounter = 0;

  // Mappings for manufacturer, product, and batch data storage
  struct DataStore {
    mapping(address => Manufacturer) manufacturers;
    mapping(address => IssueReport) issueReports;
    address[] manufacturerAddresses;
    mapping(address => bool) isManufacturer;
    mapping(uint256 => Product) products;
    mapping(string => Batch) batches;
    mapping(address => IssueReport[]) manufacturerIssues;
  }

  DataStore private dataStore;

  constructor(address _owner) {
    owner = _owner;
  }

  modifier isOwner() {
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
      !dataStore.manufacturers[_manufacturerAddress].isRegistered,
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

    // dataStore.manufacturers[_manufacturerAddress] = newManufacturer;
    // dataStore.manufacturerAddresses.push(_manufacturerAddress);
    // dataStore.isManufacturer[_manufacturerAddress] = true;

    return "Manufacturer added successfully";
  }

// Function to check if a manufacturer exists and update the state variable
    function checkManufacturer(address _manufacturerAddress)
    public
    view
    returns (bool)
{
    return dataStore.manufacturers[_manufacturerAddress].isRegistered;
}




  // Function to get all manufacturers
function getAllManufacturers() public view isOwner returns (Manufacturer[] memory) {
    uint256 manufacturerCount = dataStore.manufacturerAddresses.length;
    Manufacturer[] memory allManufacturers = new Manufacturer[](manufacturerCount);

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

    _productCounter += 1;
    uint256 productId = _productCounter;

    Product storage newProduct = dataStore.products[productId];
    newProduct.id = productId;
    newProduct.productName = _productName;
    newProduct.productNafdacNo = _productNafdacNo;
    newProduct.productForm = _productForm;
    newProduct.activeIngredients = _activeIngredients;
    newProduct.manufacturerName = manufacturer.manufacturerName;
    newProduct.companyAddress = manufacturer.companyAddress;
    newProduct.manufacturerAddress = manufacturer.manufacturerAddress;
    newProduct.dosageStrength = _dosageStrength;
    newProduct.packagingType = _packagingType;
    newProduct.storageConditions = _storageConditions;
    newProduct.productImage = _productImage;

    manufacturer.productList.push(newProduct);
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

    Product storage product = dataStore.products[_productId];

   Batch storage newBatch = dataStore.batches[_batchNumber];

   newBatch.id = _batchCounter;
   newBatch.batchNumber = _batchNumber;
   newBatch.batchQuantity = _batchQuantity;
   newBatch.productName = product.productName;
   newBatch.productId = _productId;
   newBatch.manufactureDate = _manufactureDate;
   newBatch.expirationDate = _expirationDate;

    // dataStore.batches[_batchNumber] = newBatch;

    product.batchList.push(newBatch);
    return "Batch added successfully";
}


  function getBatchesForProduct(address _manufacturerAddress, uint256 _productId) public view returns (Batch[] memory) {

    Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

    Product storage product = dataStore.products[_productId];

    return product.batchList;
}

function getBatchByBatchNumber(address _manufacturerAddress, string memory _batchNumber) public view returns (Batch memory) {

  Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

    
    Batch storage batch = dataStore.batches[_batchNumber];

    return batch;
}


  // Generate unique packet codes for a batch and return the list of generated codes
  function generatePacketUniqueCodes(
    address _manufacturerAddress,
    string memory _batchNumber
) public returns (string memory) {
    Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

    Batch storage batch = dataStore.batches[_batchNumber];
    require(batch.packetUniqueCodes.length == 0, "Packet codes have already been generated");

    for (uint256 i = 0; i < batch.batchQuantity; i++) {
        string memory packetCode = string(
            abi.encodePacked(uint2str(batch.productId),"PharmVerify", uint2str(i),"-", batch.batchNumber)
        );
        batch.packetUniqueCodes.push(packetCode);
    }
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

    Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");
    Batch storage batch = dataStore.batches[_batchNumber];
    return batch.packetUniqueCodes;
}

// Helper function to convert string to uint
function str2uint(string memory _str) internal pure returns (uint256) {
    bytes memory b = bytes(_str);
    uint256 result = 0;
    for (uint256 i = 0; i < b.length; i++) {
        require(b[i] >= '0' && b[i] <= '9', "Product not Found");
        result = result * 10 + (uint256(uint8(b[i])) - 48);
    }
    return result;
}

function extractProductId(string memory _packetCode) public pure returns (uint256) {
    // Find the position of "PharmVerify" in the string
    bytes memory codeBytes = bytes(_packetCode);
    uint256 index = 0;

    while (index < codeBytes.length) {
        if (
            index + 10 < codeBytes.length && 
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
    string memory productIdStr = new string(index);
    bytes memory productIdBytes = bytes(productIdStr);
    for (uint256 i = 0; i < index; i++) {
        productIdBytes[i] = codeBytes[i];
    }

    // Convert the extracted string to uint256
    return str2uint(productIdStr);
}


//extract batchNumber
function extractBatchNumber(string memory packetCode) public pure returns (string memory) {
    bytes memory packetCodeBytes = bytes(packetCode);
    uint256 length = packetCodeBytes.length;
    
    // Find the position of the last "-"
    uint256 lastDashIndex = 0;
    for (uint256 i = length - 1; i > 0; i--) {
        if (packetCodeBytes[i] == "-") {
            lastDashIndex = i;
            break;
        }
    }
    
    // Extract the substring after the last "-"
    bytes memory batchNumberBytes = new bytes(length - lastDashIndex - 1);
    for (uint256 i = 0; i < batchNumberBytes.length; i++) {
        batchNumberBytes[i] = packetCodeBytes[lastDashIndex + 1 + i];
    }
    
    return string(batchNumberBytes);
}


function searchPacket(string memory _uniqueCode) public view returns (ProductInfo memory) {
    uint256 productId = extractProductId(_uniqueCode);
    Product storage product = dataStore.products[productId];
    require(product.id == productId, "Product not found");

    string memory batchNumber = extractBatchNumber(_uniqueCode);
    Batch storage batch = dataStore.batches[batchNumber];

    ProductInfo memory productInfo = ProductInfo({
        productName: product.productName,
        productNafdacNo: product.productNafdacNo,
        productForm: product.productForm,
        dosageStrength: product.dosageStrength,
        batchNumber: batch.batchNumber,
        manufactureDate: batch.manufactureDate,
        expirationDate: batch.expirationDate,
        manufacturerName: product.manufacturerName,
        companyAddress: product.companyAddress,
        manufacturerAddress: product.manufacturerAddress,
        storingCondition: product.storageConditions,
        activeIngredients: product.activeIngredients,
        productImage: product.productImage,
        comment: "This product is in good condition"
    });

    return productInfo;
}

function reportIssue(
    address _manufacturerAddress,
    address _userAddress,
    string memory _userName,
    string memory _location,
    string memory _issue,
    string memory _productName,
    string memory _productBatchNumber
) public returns (string memory) {
       Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");

_issueReportCounter += 1;
    // Create the issue report

IssueReport storage newIssue = dataStore.issueReports[_manufacturerAddress];

  newIssue.id = _issueReportCounter;
  newIssue.userAddress = _userAddress;
  newIssue.userName = _userName;
  newIssue.location = _location;
  newIssue.issue = _issue;
  newIssue.productName = _productName;
  newIssue.productBatchNumber = _productBatchNumber;
  newIssue.timestamp = block.timestamp;


    // Add the issue to the manufacturer's issues list
    manufacturer.reports.push(newIssue);

    return "Issue Reported Successfully";
}

function getManufacturerIssues(address _manufacturerAddress) public view returns (IssueReport[] memory) {
         Manufacturer storage manufacturer =
      dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered, "Manufacturer not registered");
    return manufacturer.reports;
}


  function withdraw() public isOwner {
    (bool success,) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable { }
}
