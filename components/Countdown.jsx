"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Countdown = () => {
  const [loading, setLoading] = useState(true); // initially true
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [targetDate, setTargetDate] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Fetch countdown date from backend
  useEffect(() => {
    const fetchCountdown = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countdown/get-countdown`
        );
        const date = new Date(res.data.countdownDate);
        setTargetDate(date);
        setTimeLeft(calculateTimeLeft(date));
      } catch (error) {
        console.error("Error fetching countdown:", error);
        const fallbackDate = new Date();
        fallbackDate.setDate(fallbackDate.getDate() + 15);
        setTargetDate(fallbackDate);
        setTimeLeft(calculateTimeLeft(fallbackDate));
      } finally {
        setLoading(false);
      }
    };

    fetchCountdown();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!targetDate) return;

    // ✅ Start countdown only after we have targetDate
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      // ✅ Turn off loader once first countdown tick is calculated
      setLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic font size and box padding based on screen size
  const getFontSize = () => {
    if (windowWidth < 640) return "36px"; // mobile
    if (windowWidth < 768) return "48px"; // small tablet
    if (windowWidth < 1024) return "56px"; // medium tablet
    return "64px"; // desktop
  };

  const getPadding = () => {
    if (windowWidth < 640) return "8px";
    if (windowWidth < 768) return "12px";
    return "16px";
  };

  const countdownBoxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: getPadding(),
    backgroundColor: "#3d3d3d",
    borderRadius: "12px",
    color: "#ffffff",
    minWidth: "60px",
  };

  const countdownNumberStyle = {
    fontFamily: "monospace",
    fontSize: getFontSize(),
    fontWeight: "bold",
  };

  const containerStyle = {
    display: "grid",
    gridAutoFlow: "column",
    gap: windowWidth < 640 ? "10px" : "20px",
    textAlign: "center",
  };

  // Loader (only while waiting for targetDate + first countdown tick)
  if (loading) {
    return <></>;
  }

  return (
    <div style={containerStyle}>
      <div style={countdownBoxStyle}>
        <span style={countdownNumberStyle}>{timeLeft.days}</span>
        days
      </div>
      <div style={countdownBoxStyle}>
        <span style={countdownNumberStyle}>{timeLeft.hours}</span>
        hours
      </div>
      <div style={countdownBoxStyle}>
        <span style={countdownNumberStyle}>{timeLeft.minutes}</span>
        min
      </div>
      <div style={countdownBoxStyle}>
        <span style={countdownNumberStyle}>{timeLeft.seconds}</span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
