"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center">
          <Image
            src="/assets/images/success.gif"
            width={230}
            height={230}
            className="object-contain"
            alt="success"
          />
        </div>

        {/* English Text */}
        <h1
          className="font-bold text-gray-800 mb-2"
          style={{ fontSize: "25px" }}
        >
          Your form has been submitted successfully
        </h1>
        <p className="text-gray-600 mb-6" style={{ fontSize: "22px" }}>
          Our team will reach you soon.
        </p>

        {/* Urdu Text */}
        <h1
          className=" font-bold text-gray-800 mb-2 urdu-text"
          style={{ fontSize: "22px", marginBotton: "15px" }}
        >
          آپ کا فارم کامیابی سے جمع ہو گیا ہے
        </h1>
        <p
          className="text-gray-600 mb-6 urdu-text"
          style={{ fontSize: "22px" }}
        >
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
