"use client";

import React from "react";
// import BookViewerModel from "../../../components/BookViewerModel";
import "./custom.css";

const Page = () => {
  // Set countdown for 8 days from now
  return (
    <>
      {/* For TSX uncomment the commented types below */}
      <div className="flex gap-5">
        <div>
          <span className="countdown font-mono text-4xl">
            <span
              style={{ "--value": 15 } /* as React.CSSProperties */}
              aria-live="polite"
              aria-label={counter}
            >
              15
            </span>
          </span>
          days
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span
              style={{ "--value": 10 } /* as React.CSSProperties */}
              aria-live="polite"
              aria-label={counter}
            >
              10
            </span>
          </span>
          hours
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span
              style={{ "--value": 24 } /* as React.CSSProperties */}
              aria-live="polite"
              aria-label={counter}
            >
              24
            </span>
          </span>
          min
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span
              style={{ "--value": 59 } /* as React.CSSProperties */}
              aria-live="polite"
              aria-label={counter}
            >
              59
            </span>
          </span>
          sec
        </div>
      </div>
    </>
  );
};

export default Page;

// <div className="flex flex-col-reverse md:flex-row h-screen w-full items-center justify-center mx-auto overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
//   {/* Countdown Section */}
//   <section className="relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 text-white">
//     <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
//       Countdown to Launch
//     </h1>
//     <Countdown
//       date={targetDate}
//       renderer={({ days, hours, minutes, seconds }) => (
//         <div className="flex flex-col items-center space-y-10 text-center">
//           {/* Days + Hours */}
//           <div className="font-extrabold tracking-wider leading-none text-[12vw] md:text-[10vw] lg:text-[8vw]">
//             {days}d {hours}h
//           </div>
//           {/* Minutes + Seconds */}
//           <div className="font-bold tracking-wide leading-none text-[8vw] md:text-[6vw] lg:text-[4vw]">
//             {minutes}m {seconds}s
//           </div>
//         </div>
//       )}
//     />
//   </section>

//   {/* Book Viewer Section */}
//   <div className="z-0 w-[100%] ml-16 md:ml-0 md:w-1/2 h-full flex justify-center items-center">
//     <BookViewerModel />
//   </div>
// </div>
