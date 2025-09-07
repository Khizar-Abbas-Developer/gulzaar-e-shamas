"use client";

import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

const HomeButtons = () => {
  const router = useRouter();
  const isLoading = false;
  const handleRedictToProductPage = () => {
    router.push("/product/12345");
  };
  return (
    <>
      <div>
        <form className="flex flex-col md:flex-row gap-10 w-full justify-between">
          <Link href="/user/register" className="flex justify-start">
            <SubmitButton
              isLoading={isLoading}
              className="w-full flex flex-col gap-2 py-8 px-4 bg-[#1f9367] text-white md:gap-4 md:py-12 md:px-6 hover:bg-[#4d9076]"
            >
              <p className="text-base md:text-xl font-urdu">
                شجرے کا اندراج کروائیں
              </p>
              <p className="text-base md:text-xl">Register the family tree</p>
            </SubmitButton>
          </Link>

          <div className="flex justify-end">
            <SubmitButton
              handleClick={handleRedictToProductPage}
              isLoading={isLoading}
              type="button"
              className="w-full flex flex-col gap-2 py-8 px-4 bg-yellow-500 text-black hover:bg-yellow-600 md:gap-4 md:py-12 md:px-6"
            >
              <p className="text-base md:text-xl font-urdu">ابھی کتاب خریدیں</p>
              <p className="text-base md:text-xl">Buy Book Now</p>
            </SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
};
export default HomeButtons;
