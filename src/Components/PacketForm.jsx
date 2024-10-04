import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const PacketForm = ({ product }) => {
  // State to toggle the form visibility
  const [showForm, setShowForm] = useState(false);
  const [batchNo, setBatchNo] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Toggle function to show/hide form
  const toggleForm = () => setShowForm(!showForm);

  // Function to validate form fields
  const validateForm = () => {
    if (batchNo && manufactureDate && expirationDate) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      // Proceed with form submission logic
      toast("Form submitted succesfully");
      console.log("Form submitted succesfully");
    } else {
      toast("Please fill in all required fields");
    }
  };

  return (
    <div className="mt-6 mb-6">
      {/* Button to view the packet form */}
      <button
        onClick={toggleForm}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {showForm ? "Hide Packet Form" : "View Packet Form"}
      </button>

      {/* Form visibility is controlled by the state */}
      {showForm && (
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
                validateForm(); // Validate whenever input changes
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter batch number"
            />
          </div>

          {/* Manufacture Date */}
          <div className="mb-4">
            <label
              htmlFor="manufactureDate"
              className="block text-sm font-medium text-gray-700"
            >
              Manufacture Date
            </label>
            <input
              type="date"
              id="manufactureDate"
              name="manufactureDate"
              value={manufactureDate}
              onChange={(e) => {
                setManufactureDate(e.target.value);
                validateForm(); // Validate whenever input changes
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="expirationDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration Date
            </label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={expirationDate}
              onChange={(e) => {
                setExpirationDate(e.target.value);
                validateForm(); // Validate whenever input changes
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Button to submit the form */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <i class="fa fa-address-book-o" aria-hidden="true"></i>Add Packet
          </button>
        </form>
      )}
    </div>
  );
};

export default PacketForm;
