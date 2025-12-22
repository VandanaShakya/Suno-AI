import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131B27] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Cancelled</h1>
          <p className="text-gray-400 mb-6">
            Your payment was cancelled. No charges were made to your account.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => navigate("/Pricing")}
            className="w-full px-6 py-3 rounded-lg font-bold text-white transition duration-300"
            style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 rounded-lg font-bold text-gray-300 border border-gray-700 hover:bg-gray-800 transition duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;

