// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract PharmVerifyContract {
    
    address public immutable owner;

    struct Batch {
        uint256 id;
        string[] packetUniqueCodes;
        string batchNumber;
        uint256 batchQuantity;
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
        bool isConfirmed;
        bool hasPaid;
        bool isRegistered;
    }

    

    uint256 public _manufacturerCounter = 0;
    uint256 public _productCounter = 0;
    uint256 public _batchCounter = 0;


    // Mappings for manufacturer, product, and batch data storage
    struct DataStore {
    mapping(address => Manufacturer) manufacturers;
    mapping(uint256 => Product) products;
    mapping(uint256 => Batch) batches;
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
        require(dataStore.manufacturers[_manufacturerAddress].manufacturerAddress == address(0), "Manufacturer already exists");
        _manufacturerCounter += 1;

        Manufacturer storage newManufacturer = dataStore.manufacturers[_manufacturerAddress];
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

        return "Manufacturer added successfully";
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
        Manufacturer storage manufacturer = dataStore.manufacturers[_manufacturerAddress];
        require(manufacturer.isRegistered, "Manufacturer not registered");

        for (uint256 i = 0; i < manufacturer.productList.length; i++) {
            require(keccak256(abi.encodePacked(manufacturer.productList[i].productName)) != keccak256(abi.encodePacked(_productName)), "Product name already exists");
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

        return "Product added successfully";
    }

    // Add a batch for a specific product
    function addBatch(
        uint256 _productId,
        string memory _batchNumber,
        uint256 _batchQuantity,
        string memory _manufactureDate,
        string memory _expirationDate
    ) public returns (string memory) {
        _batchCounter += 1;
        uint256 newBatchId = _batchCounter;

        Product storage product = dataStore.products[_productId];
        require(bytes(product.productName).length > 0, "Product not found");

        Batch memory newBatch = Batch({
            id: newBatchId,
            packetUniqueCodes: new string[](_batchQuantity),
            batchNumber: _batchNumber,
            batchQuantity: _batchQuantity,
            manufactureDate: _manufactureDate,
            expirationDate: _expirationDate
        });

        dataStore.batches[newBatchId] = newBatch;
        product.batchList.push(newBatch);

        return "Batch added successfully";
    }

    // Generate unique packet codes for a batch and return the list of generated codes
    function generatePacketUniqueCodes(address _manufacturerAddress, uint256 _batchId) public returns (string[] memory) {
    Manufacturer storage manufacturer = dataStore.manufacturers[_manufacturerAddress];
    require(manufacturer.isRegistered == true, "Manufacturer is not registered");

    Batch storage batch = dataStore.batches[_batchId];
    require(batch.batchQuantity > 0, "Invalid batch quantity");
    
    // Check if packetUniqueCodes have already been generated
    require(batch.packetUniqueCodes.length == 0, "Packet codes have already been generated for this batch");

    // Get the associated product with this batch
    Product storage product = dataStore.products[batch.id]; // Assuming batch.id exists

    // Loop through the batch quantity and create unique packet codes
    for (uint256 i = 0; i < batch.batchQuantity; i++) {
        string memory packetCode = string(abi.encodePacked(
            "P", 
            substring(batch.batchNumber, 0, 2), 
            uint2str(i + 1),
            substring(product.productName, 0, 2), 
            substring(manufacturer.manufacturerName, 0, 2)
        ));

        // Store the packet code in the batch's packetUniqueCodes
        batch.packetUniqueCodes.push(packetCode);
    }

    return batch.packetUniqueCodes;
}


    // Helper function to convert uint to string
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }

    // Helper function to get a substring from a string
    function substring(
        string memory str,
        uint256 startIndex,
        uint256 endIndex
    ) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }

    // Search for a packet and find the product it belongs to
    function searchPacket(string memory _uniqueCode) public view returns (Product memory) {
        for (uint256 i = 1; i <= _productCounter; i++) {
            Product storage product = dataStore.products[i];
            for (uint256 j = 0; j < product.batchList.length; j++) {
                Batch storage batch = product.batchList[j];
                for (uint256 k = 0; k < batch.packetUniqueCodes.length; k++) {
                    if (keccak256(abi.encodePacked(batch.packetUniqueCodes[k])) == keccak256(abi.encodePacked(_uniqueCode))) {
                        return product;
                    }
                }
            }
        }
        revert("Product with the given unique code not found");
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
