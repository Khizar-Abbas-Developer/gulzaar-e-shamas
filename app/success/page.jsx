"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa6";
import { useSelector } from "react-redux";

const SuccessPage = () => {
  const router = useRouter();
  const trackingID = useSelector((state) => state.info.trackingId);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingID);
    setCopied(true);

    // Reset after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center">
          <Image
            src="/assets/images/success.gif"
            width={230}
            height={230}
            unoptimized
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
        <div
          className="flex flex-col"
          style={{
            gap: "10px",
            marginTop: "20px",
            marginBottom: "20px",
            color: "white",
          }}
        >
          <div
            className="flex justify-center items-center"
            style={{ gap: "20px" }}
          >
            <span className="text-4xl">
              <FaArrowLeftLong />
            </span>
            <span style={{ color: "yellow" }}>Tracking ID</span>
            <span className="text-4xl">
              <FaArrowRightLong />
            </span>
          </div>
          <div className="flex justify-center" style={{ gap: "15px" }}>
            <span style={{ color: "yellow" }}>{trackingID}</span>
            <span
              onClick={handleCopy}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                color: copied ? "limegreen" : "yellow",
              }}
              title={copied ? "Copied!" : "Copy Tracking ID"}
            >
              {copied ? <FaCheck size={18} /> : <FaRegCopy size={18} />}
            </span>
          </div>
        </div>
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
