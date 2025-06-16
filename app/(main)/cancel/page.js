import React from "react";
import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-300 text-red-800">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-2xl font-semibold">Payment Cancelled</h1>
        <p className="mt-2 text-gray-600">
          Your transaction was not completed. If this was a mistake, you can try again.
        </p>
        <Link href="/course">
          <button className="mt-6 inline-block px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg">
            Return to Buy Course
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
