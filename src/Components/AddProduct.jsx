"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useWriteContract } from "wagmi";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
import { parseAbi } from "viem";
import { Field, Label, Switch } from "@headlessui/react";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productNafdacNo, setProductNafdacNo] = useState("");
  const [productForm, setProductForm] = useState("");
  const [activeIngredients, setActiveIngredients] = useState("");
  const [dosageStrength, setDosageStrength] = useState("");
  const [packagingType, setPackagingType] = useState("");
  const [storageConditions, setStorageConditions] = useState("");
  const [productImages, setProductImages] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const account = useAccount();
  const { isConnected } = useAccount();
  const abi = parseAbi([
    "function addProduct(address,string,string,string,string,string,string,string,string) returns (string)",
  ]);

  // Function to validate form fields
  const validateForm = () => {
    if (
      productName &&
      productNafdacNo &&
      productForm &&
      activeIngredients &&
      dosageStrength &&
      packagingType &&
      storageConditions &&
      productImages &&
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

    validateForm();

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
          functionName: "addProduct",
          args: [
            account.address,
            productName,
            productNafdacNo,
            productForm,
            activeIngredients,
            dosageStrength,
            packagingType,
            storageConditions,
            productImages,
          ],
        },
        {
          onSettled(data, error) {
            if (error) {
              toast.error(`Transaction failed : ${error.cause?.reason}`);
            } else {
              toast.success("Product added successfully!");
              setProductName("");
              setProductNafdacNo("");
              setProductForm("");
              setActiveIngredients("");
              setDosageStrength("");
              setPackagingType("");
              setStorageConditions("");
              setProductImages("");
            }
            console.log("Settled", { data, error });
          },
        }
      );
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div
      id="addProduct"
      className="isolate px-6 py-14 sm:py-12 lg:px-8 xl:pl-72"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] z-30 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 z-30 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add Product
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Please complete the form below to add products
        </p>
        <p className="mt-2 text-xs font-medium leading-8 text-red-600">
          All products is subject to approval before confirmation.
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* product Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="product-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Product Name <span className="text-red-600 text-sm">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="product-name"
                name="product-name"
                type="text"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* product Nafdac No */}
          <div className="sm:col-span-2">
            <label
              htmlFor="product-nafdac-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Product Nafdac Number{" "}
              <span className="text-red-600 text-sm">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="product-nafdac-number"
                name="product-nafdac-number"
                type="text"
                value={productNafdacNo}
                onChange={(e) => {
                  setProductNafdacNo(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* product Form */}
          <div className="sm:col-span-2">
            <label
              htmlFor="product-form"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Product Form <span className="text-red-600 text-sm">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="product-form"
                name="product-form"
                type="text"
                value={productForm}
                onChange={(e) => {
                  setProductForm(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Active Ingredient */}
          <div className="sm:col-span-2">
            <label
              htmlFor="active-ingredient"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Active Ingredient <span className="text-red-600 text-sm">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="active-ingredient"
                name="active-ingredient"
                type="text"
                value={activeIngredients}
                onChange={(e) => {
                  setActiveIngredients(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Dosage Strength */}
          <div className="sm:col-span-2">
            <label
              htmlFor="doosage-strength"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Dosage Strength <span className="text-red-600 text-sm">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="doosage-strength"
                name="doosage-strength"
                type="text"
                value={dosageStrength}
                onChange={(e) => {
                  setDosageStrength(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* packaging Type */}
          <div className="sm:col-span-2">
            <label
              htmlFor="packaging-type"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Packaging Type <span className="text-red-600 text-sm">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="packaging-type"
                name="packaging-type"
                type="text"
                value={packagingType}
                onChange={(e) => {
                  setPackagingType(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Storage Conditions */}
          <div className="sm:col-span-2">
            <label
              htmlFor="storage-condition"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Storage Condition <span className="text-red-600 text-sm">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="storage-condition"
                name="storage-condition"
                type="text"
                value={storageConditions}
                onChange={(e) => {
                  setStorageConditions(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="sm:col-span-2">
            <label
              htmlFor="product-image"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Product Images (e.g., GMP, ISO){" "}
              <span className="text-red-600 text-sm">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="product-image"
                name="product-image"
                type="text"
                value={productImages}
                onChange={(e) => {
                  setProductImages(e.target.value);
                  validateForm(); // Validate whenever input changes
                }}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="sm:col-span-2">
            <label
              htmlFor="documents"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Upload Licenses and Certifications
            </label>
            <div className="mt-2.5">
              <input
                id="documents"
                name="documents"
                type="file"
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
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
        </div>

        <div className="mt-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
