import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useWriteContract } from "wagmi";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
import { parseAbi } from "viem";

const VerifyProduct = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const { isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const abi = parseAbi([
    "function searchPacket(string) returns (uint256,string,string,string,string,string,string,string,string,string,string,(uint256,string[],string,uint256,string,string)[],bool)",
  ]);

  const validateForm = () => {
    if (searchProduct) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isConnected) {
      toast.error("Please connect your Wallet!");
      return;
    }

    try {
      // Call the contract's addManufacturer function
      await writeContractAsync(
        {
          address: pharmVerifyContract.address,
          abi: abi,
          functionName: "searchPacket",
          args: [searchProduct], // Pass in the correct argument
        },
        {
          onSettled(data, error) {
            if (error) {
              toast.error(`Transaction failed : ${error.cause?.reason}`);
            } else {
              console.log(`Products fetched : ${data}`);
              toast.success("Product Information Fetched Successfully!");
            }
            console.log("Settled", { data, error });
          },
        }
      );
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };

  return (
    <div>
      <div className="mt-4">
        <form className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold">
            Search Pharmaceutical Products here
          </h2>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-white sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={searchProduct}
              onChange={(e) => {
                setSearchProduct(e.target.value);
                validateForm(); // Validate whenever input changes
              }}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Pharmaceutical Products"
              required
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyProduct;
