"use client";
import BookViewerModel from "@/components/BookViewerModel";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import Countdown from "../../components/Countdown";

const ProductPage = () => {
  const loading = false;
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 15);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row h-[100vh] md:h-screen w-full items-center justify-center mx-auto overflow-hidden">
        {/* LEFT SIDE — FORM */}
        <section className="relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-base-200 rounded-lg shadow-lg">
          <div className="flex justify-center gap-4 mb-6">
            {/* DaisyUI countdown */}
            <Countdown />
          </div>

          <div className="text-14-regular mt-6 flex justify-between items-center w-full max-w-[396px]">
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </section>

        {/* RIGHT SIDE — BOOK VIEWER */}
        <div className="z-0 w-[100%] ml-16 md:ml-0 md:w-1/2 h-full md:h-full flex justify-center items-center">
          <BookViewerModel />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
