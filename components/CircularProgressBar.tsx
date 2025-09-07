"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const messages = [
  "Requesting",
  "Connecting...",
  "Saving data...",
  "Finalizing...",
];

interface CircularProgressBarProps {
  duration?: number; // in milliseconds, default 3000ms (3 seconds)
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  duration = 3000,
}) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalTime = duration / 100; // 100 steps for 1% each
    const interval = setInterval(() => {
      setProgress((prev: number) => {
        const next = prev + 1;

        if (next < 25) setMessage(messages[0]);
        else if (next < 50) setMessage(messages[1]);
        else if (next < 75) setMessage(messages[2]);
        else setMessage(messages[3]);

        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration]);

  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background Circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Circle */}
        <circle
          stroke="#22c55e"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 0.03s linear", // smooth animation
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Message Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={radius / 6} // smaller font
          fill="#ffffff"
          fontWeight="bold"
        >
          {message}
        </text>
      </svg>

      <div className="text-center text-gray-700 font-medium flex flex-col items-center">
        <ClipLoader color="white" size={20} />
        <span className="text-sm text-gray-700 mt-2">Please wait</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
