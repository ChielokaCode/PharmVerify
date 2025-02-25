import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
// import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { parseAbi } from "viem";
import { Field, Label, Switch } from "@headlessui/react";

const PacketForm = ({ id }) => {
  // State to toggle the form visibility
  const [showForm, setShowForm] = useState(false);
  const [batchNo, setBatchNo] = useState("");
  const [batchQuantity, setBatchQuantity] = useState(1);
  const [manufactureDate, setManufactureDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Toggle function to show/hide form
  const toggleForm = () => setShowForm(!showForm);

  const { writeContractAsync } = useWriteContract();
  const account = useAccount();
  const { isConnected } = useAccount();

  const abi = parseAbi([
    "function addBatch(address,uint256,string,uint256,string,string) returns (string)",
  ]);

  // Function to validate form fields
  const validateForm = () => {
    if (
      batchNo.trim() !== "" &&
      batchQuantity !== "" &&
      manufactureDate.trim() !== "" &&
      expirationDate.trim() !== "" &&
      !agreed
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Revalidate the form at the start of handleSubmit
    validateForm();

    if (!isFormValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isConnected) {
      toast.error("Please connect your Wallet!");
      return;
    }
    setLoading(true);
    try {
      // Call the contract's addManufacturer function
      await writeContractAsync(
        {
          address: pharmVerifyContract.address,
          abi: abi,
          functionName: "addBatch",
          args: [
            account.address,
            id,
            batchNo,
            batchQuantity,
            manufactureDate,
            expirationDate,
          ],
        },
        {
          onSettled(data, error) {
            if (error) {
              toast.error("Transaction failed");
              console.error("Transaction failed:", error);
            } else {
              toast.success("Batch added successfully!");
              window.location.reload();
            }
            setLoading(false);
            console.log("Settled", { data, error });
          },
        }
      );
    } catch (error) {
      setLoading(false);
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className="mt-6 mb-6">
      {/* Button to view the packet form */}
      <button
        onClick={toggleForm}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {showForm ? "Hide Batch Form" : "View Batch Form"}
      </button>

      {/* Form visibility is controlled by the state */}
      {showForm &&
        (loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-600"></div>
            <span className="ml-2 text-indigo-600">Processing...</span>
          </div>
        ) : (
          <form className="mt-4 bg-gray-100 p-4 rounded-md shadow-md">
            {/* Batch Number */}

            <div className="mb-4">
              <label
                htmlFor="batchNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Batch Number
              </label>
              <input
                type="text"
                id="batchNumber"
                name="batchNumber"
                value={batchNo}
                onChange={(e) => {
                  setBatchNo(e.target.value);
                  validateForm();
                }}
                placeholder="e.g, BN1234"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Batch Quantity */}
            <div className="mb-4">
              <label
                htmlFor="batchQuantity"
                className="block text-sm font-medium text-gray-700"
              >
                Batch Quantity
              </label>
              <input
                type="number"
                id="batchQuantity"
                name="batchQuantity"
                value={batchQuantity}
                onChange={(e) => {
                  setBatchQuantity(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Batch Quantity"
              />
            </div>

            {/* Manufacture Date */}
            <div className="mb-4">
              <label
                htmlFor="manufactureDate"
                className="block text-sm font-medium text-gray-700"
              >
                Manufacture Date (e.g yyyy-mm-dd)
              </label>
              <input
                type="text"
                id="manufactureDate"
                name="manufactureDate"
                value={manufactureDate}
                onChange={(e) => {
                  setManufactureDate(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                placeholder="Enter Manufacture date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="expirationDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expiration Date (e.g yyyy-mm-dd)
              </label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={expirationDate}
                onChange={(e) => {
                  setExpirationDate(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                placeholder="Enter Expiration date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <Field className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={(value) => {
                    setAgreed(value); // Update the state when switch changes
                    validateForm(); // Optional: validate form if needed
                  }}
                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                  />
                </Switch>
              </div>
              <Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  terms and conditions
                </a>
                .
              </Label>
            </Field>

            {/* Button to submit the form */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <i class="fa fa-address-book-o" aria-hidden="true"></i>Add Batch
            </button>
          </form>
        ))}
    </div>
  );
};

export default PacketForm;
