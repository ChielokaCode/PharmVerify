"use client";

import { useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";
import toast from "react-hot-toast";
import { useAccount, useWriteContract } from "wagmi";
import { pharmVerifyContract } from "../context/pharmVerifyContract";
import { parseAbi } from "viem";
import { useRouter } from "next/router";

const Kyc = () => {
  const [manufacturerName, setManufacturerName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [businessRegNo, setBusinessRegNo] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhoneNo, setCompanyPhoneNo] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyCountry, setCompanyCountry] = useState("");
  const [companyCertification, setCompanyCertification] = useState("");
  const [companyRegulatoryBody, setCompanyRegulatoryBody] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false); // Loading state

  const { writeContractAsync } = useWriteContract();
  const account = useAccount();
  const { isConnected } = useAccount();
  const abi = parseAbi([
    "function addManufacturer(address,string,string,string,string,string,string,string,string,string) returns (string)",
  ]);

  const router = useRouter();

  // Function to validate form fields
  const validateForm = () => {
    if (
      manufacturerName &&
      licenseNumber &&
      businessRegNo &&
      companyAddress &&
      companyPhoneNo &&
      companyEmail &&
      companyCountry &&
      companyCertification &&
      companyRegulatoryBody &&
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
          functionName: "addManufacturer",
          args: [
            account.address,
            manufacturerName,
            licenseNumber,
            businessRegNo,
            companyAddress,
            companyPhoneNo,
            companyEmail,
            companyCountry,
            companyCertification,
            companyRegulatoryBody,
          ], // Pass in the correct argument
        },
        {
          onSettled(data, error) {
            if (error) {
              toast.error(`${error.cause?.reason}`);
              router.push("/dashboard/addProduct");
            } else {
              toast.success("Manufacturer added successfully!");
              router.push("/dashboard/addProduct");
            }
            setLoading(false);
            console.log("Settled", { data, error });
          },
        }
      );
    } catch (err) {
      setLoading(false);
      console.error("Transaction failed:", err);
    }
  };

  return (
    <div id="verify" className="isolate px-6 py-14 sm:py-12 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Register Manufacturer
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Please complete the form below to register. By filling out this KYC
          (Know Your Customer) form, you help ensure that the Pharmaceutical
          products in the market are safe and legitimate.
        </p>
        <p className="mt-2 text-xs font-medium leading-8 text-red-600">
          All registration is subject to inspection before confirmation.
        </p>
      </div>
      {/* Show loading screen */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-600"></div>
          <span className="ml-2 text-indigo-600">Processing...</span>
        </div>
      ) : (
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* Manufacturer Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="manufacturer-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Manufacturer Business Name{" "}
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="manufacturer-name"
                  name="manufacturer-name"
                  type="text"
                  value={manufacturerName}
                  onChange={(e) => {
                    setManufacturerName(e.target.value);
                    validateForm(); // Validate whenever input changes
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* License Number */}
            <div className="sm:col-span-2">
              <label
                htmlFor="license-number"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Manufacturer License Number{" "}
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="license-number"
                  name="license-number"
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => {
                    setLicenseNumber(e.target.value);
                    validateForm(); // Validate whenever input changes
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Business Registration Number */}
            <div className="sm:col-span-2">
              <label
                htmlFor="business-reg-number"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Business Registration Number{" "}
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="business-reg-number"
                  name="business-reg-number"
                  type="text"
                  value={businessRegNo}
                  onChange={(e) => {
                    setBusinessRegNo(e.target.value);
                    validateForm(); // Validate whenever input changes
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Company Address <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={companyAddress}
                  onChange={(e) => {
                    setCompanyAddress(e.target.value);
                    validateForm(); // Validate whenever input changes
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="sm:col-span-2">
              <label
                htmlFor="phonenumber"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Company Phone number{" "}
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="text"
                  value={companyPhoneNo}
                  onChange={(e) => {
                    setCompanyPhoneNo(e.target.value);
                    validateForm(); // Validate whenever input changes
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Company Email */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Company Email <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={companyEmail}
                  onChange={(e) => {
                    setCompanyEmail(e.target.value);
                    validateForm(); // Validate whenever input changes
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Country */}
            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Country <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={companyCountry}
                  onChange={(e) => {
                    setCompanyCountry(e.target.value);
                    validateForm(); // Validate whenever input changes
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Certification */}
            <div className="sm:col-span-2">
              <label
                htmlFor="certification"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Certification (e.g., GMP, ISO){" "}
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="certification"
                  name="certification"
                  type="text"
                  value={companyCertification}
                  onChange={(e) => {
                    setCompanyCertification(e.target.value);
                    validateForm(); // Validate whenever input changes
                  }}
                  className="block w-full rounded-md border border-gray-300 px-3.5 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Regulatory Body */}
            <div className="sm:col-span-2">
              <label
                htmlFor="regulatory-body"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Regulatory Body <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  id="regulatory-body"
                  name="regulatory-body"
                  type="text"
                  value={companyRegulatoryBody}
                  onChange={(e) => {
                    setCompanyRegulatoryBody(e.target.value);
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
              Register Manufacturer
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Kyc;
