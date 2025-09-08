"use client";

import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react"; // ✅ Upload icon

const UploadingLoader = ({ status = "uploading" }) => {
  const [progress, setProgress] = useState(0);

  // Auto progress to 100% in ~5 seconds
  useEffect(() => {
    if (status === "uploading") {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [status]);

  const renderStatusText = () => {
    switch (status) {
      case "uploading":
        return (
          <p className="text-lg font-semibold text-white">
            Uploading... {progress}%
          </p>
        );
      case "success":
        return (
          <p className="text-lg font-semibold text-green-400">
            Upload Complete!
          </p>
        );
      case "error":
        return (
          <p className="text-lg font-semibold text-red-400">Upload Failed.</p>
        );
      default:
        return (
          <p className="text-lg font-semibold text-white">Ready to Upload</p>
        );
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 rounded-2xl shadow-lg">
      {/* Circular Tank with Upload Icon */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Upload Icon (always visible, centered on tank) */}
        <Upload
          className="absolute text-white z-10"
          size={32}
          strokeWidth={2.5}
        />

        {/* Water Tank */}
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* ClipPath for circle */}
          <defs>
            <clipPath id="circleClip">
              <circle cx="50" cy="50" r="45" />
            </clipPath>
          </defs>

          {/* Circle outline */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#22c55e"
            strokeWidth="3"
            fill="none"
          />

          {/* Filling rectangle clipped inside circle */}
          <rect
            x="5"
            y={100 - (progress / 100) * 90}
            width="90"
            height={(progress / 100) * 90}
            fill="#06b6d4" // water color
            clipPath="url(#circleClip)"
          />

          {/* Outline on top */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#22c55e"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Status Text */}
      <div className="mt-6 text-center">{renderStatusText()}</div>

      {/* Urdu + English Instructions */}
      <div className="urdu-text flex flex-col-reverse justify-center items-center w-full mt-4">
        <span className="text-gray-300">
          دستاویزات کی اپلوڈنگ جاری ہے براہِ کرم انتظار فرمائیں۔
        </span>
        <span className="text-gray-400">
          Please wait... while uploading the documents
        </span>
      </div>
    </div>
  );
};

export default UploadingLoader;
