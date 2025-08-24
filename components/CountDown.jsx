"use client";
import React, { useState, useEffect } from "react";
import styles from "./CountDown.module.css"; // ✅ CSS Module import
const CountdownTimer = () => {
  // Set event name & date defaults
  const [eventName] = useState("My Event"); // default name
  const [eventDate] = useState(
    new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days from now
  );

  const [countdownStarted, setCountdownStarted] = useState(true); // start automatically
  const [timeRemaining, setTimeRemaining] = useState(
    15 * 24 * 60 * 60 * 1000 // initial 15 days in ms
  );

  useEffect(() => {
    if (countdownStarted && eventDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
          alert("Countdown complete!");
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdownStarted, eventDate]);

  useEffect(() => {
    if (countdownStarted) {
      document.title = eventName;
    }
  }, [countdownStarted, eventName]);

  const formatDate = (date) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className={styles.countdownDisplay}>
        <div className={styles.countdownValue}>
          {days.toString().padStart(2, "0")} <span>days</span>
        </div>
        <div className={styles.countdownValue}>
          {hours.toString().padStart(2, "0")} <span> hours</span>
        </div>
        <div className={styles.countdownValue}>
          {minutes.toString().padStart(2, "0")} <span>minutes</span>
        </div>
        <div className={styles.countdownValue}>
          {seconds.toString().padStart(2, "0")} <span>seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.countdownTimerContainer}>
      <h2 className={styles.countdownName}>{eventName}</h2>
      <p className={styles.countdownDate}>{formatDate(eventDate)}</p>

      {formatTime(timeRemaining)}

      <div className={styles.controlButtons}>
        <button onClick={() => setCountdownStarted(false)}>Stop</button>
        <button
          onClick={() => {
            setCountdownStarted(true);
            setTimeRemaining(15 * 24 * 60 * 60 * 1000);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
