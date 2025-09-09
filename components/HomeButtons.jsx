"use client";

import Link from "next/link";
import { Button } from "./ui/button";

const HomeButtons = () => {
  const isLoading = false;

  return (
    <div>
      <form className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-0">
        <Link href="/user/register" className="flex justify-center md:flex-1">
          <Button
            type="submit"
            disabled={isLoading}
            className="shad-primary-btn w-full flex flex-col gap-2 px-4 bg-[#1f9367] text-white md:gap-4 md:py-12 md:px-6 hover:bg-[#4d9076]"
            style={{ paddingTop: "35px", paddingBottom: "35px" }}
          >
            <p className="text-base md:text-xl font-urdu">
              شجرے کا اندراج کروائیں
            </p>
            <p className="text-base md:text-xl">Register the family tree</p>
          </Button>
        </Link>

        <Link href="/product" className="flex justify-center md:flex-1">
          <Button
            type="submit"
            disabled={isLoading}
            className="shad-primary-btn w-full flex flex-col gap-2 px-4 bg-[#1f9367] text-white md:gap-4 md:py-12 md:px-6 hover:bg-[#4d9076]"
            style={{ paddingTop: "35px", paddingBottom: "35px" }}
          >
            <p className="text-base md:text-xl font-urdu">ابھی کتاب خریدیں</p>
            <p className="text-base md:text-xl">Buy Book Now</p>
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default HomeButtons;
