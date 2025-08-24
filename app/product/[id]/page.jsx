import React from "react";
import CountDown from "@/components/CountDown";
const Page = () => {
  return (
    <>
      <CountDown />
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
