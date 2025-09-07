"use client";

import React from "react";
import { motion } from "framer-motion";

const UploadingLoader = () => {
  const dotVariants = {
    move: {
      x: [0, 60, 120], // move dots from left to right
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
      {/* Servers */}
      <div className="flex items-center space-x-10 mb-8">
        {/* Source Server */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-800 rounded-lg flex justify-center items-center text-white font-bold">
            Source
          </div>
          <p className="text-white mt-2 text-sm">Local Server</p>
        </div>

        {/* Destination Server */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-800 rounded-lg flex justify-center items-center text-white font-bold">
            Dest
          </div>
          <p className="text-white mt-2 text-sm">Cloud Server</p>
        </div>
      </div>

      {/* Moving Dots */}
      <div className="relative w-36 h-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-green-400 rounded-full"
            variants={dotVariants}
            animate="move"
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.div
        className="mt-6 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-lg font-semibold">Transferring Files...</p>
        <p className="text-sm mt-1 text-gray-300">
          Moving your documents securely from source to server
        </p>
      </motion.div>
    </div>
  );
};

export default UploadingLoader;
