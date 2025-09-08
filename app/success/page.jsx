"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />

        {/* English Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          ✅ Your form has been submitted successfully
        </h1>
        <p className="text-gray-600 mb-6">Our team will reach you soon.</p>

        {/* Urdu Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2 urdu-text">
          ✅ آپ کا فارم کامیابی سے جمع ہو گیا ہے
        </h1>
        <p className="text-gray-600 mb-6 urdu-text">
          ہماری ٹیم جلد آپ سے رابطہ کرے گی۔
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
