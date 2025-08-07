"use client";

import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const HomeButtons = ({
  fetchLoading,
}: {
  fetchLoading: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div>
        <form className="flex flex-col md:flex-row gap-10 w-full justify-between">
          <div className="flex justify-end">
            <SubmitButton
              isLoading={isLoading}
              className="w-full flex flex-col gap-2 py-8 px-4 bg-yellow-500 text-black hover:bg-yellow-600 md:gap-4 md:py-12 md:px-6"
            >
              <p className="text-base md:text-xl font-urdu">ابھی کتاب خریدیں</p>
              <p className="text-base md:text-xl">Buy Book Now</p>
            </SubmitButton>
          </div>

          <div className="flex justify-start">
            <SubmitButton
              isLoading={isLoading}
              className="w-full flex flex-col gap-2 py-8 px-4 bg-[#1f9367] text-white md:gap-4 md:py-12 md:px-6"
            >
              <p className="text-base md:text-xl font-urdu">
                شجرے کا اندراج کروائیں
              </p>
              <p className="text-base md:text-xl">Register the family tree</p>
            </SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
};
export default HomeButtons;
