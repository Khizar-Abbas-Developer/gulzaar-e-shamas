"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import server1 from "@/public/assets/images/server1.png";
import server2 from "@/public/assets/images/server2.png";
import { ClipLoader } from "react-spinners";

// Define the component's props for clear documentation and type safety
interface UploadingLoaderProps {
  isUploading: boolean;
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
}

const UploadingLoader = ({
  isUploading,
  progress,
  status,
}: UploadingLoaderProps) => {
  const dotVariants = {
    move: {
      x: ["0%", "180%"], // Adjust according to your server image spacing
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const renderStatusText = () => {
    switch (status) {
      case "uploading":
        return (
          <p className="text-lg font-semibold">
            Transferring Files... {Math.round(progress)}%
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
      case "idle":
      default:
        return <p className="text-lg font-semibold">Ready to Upload</p>;
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 rounded-lg">
      <Image
        src="/assets/images/saving.png"
        width={110}
        height={110}
        className="object-contain"
        alt="upload"
      />
      <div className="flex justify-center items-center flex-col">
        <ClipLoader color="white" />
        <div
          className="urdu-text flex flex-col-reverse justify-center items-center w-full"
          style={{ gap: "20px" }}
        >
          <span className="mb-5" style={{ marginBotton: "20px" }}>
            دستاویزات کی اپلوڈنگ جاری ہے براہِ کرم انتظار فرمائیں۔
          </span>
          <span>Please wait... while uploading the documents</span>
        </div>
      </div>
    </div>
  );
};

export default UploadingLoader;
