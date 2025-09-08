"use client";

import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const HomeButtons = () => {
  const router = useRouter();
  const isLoading = false;
  const handleRedictToProductPage = () => {
    router.push("/product/12345");
  };
  return (
    <>
      <div>
        <form className="flex flex-col md:flex-row w-full justify-between">
          <Link href="/user/register" className="flex justify-start">
            <Button
              type="submit"
              disabled={isLoading}
              className={
                "shad-primary-btn w-[50%] md:w-full mx-auto flex flex-col gap-2 px-4 bg-[#1f9367] text-white md:gap-4 md:py-12 md:px-6 hover:bg-[#4d9076]"
              }
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
              onClick={() => {}}
            >
              <p className="text-base md:text-xl font-urdu">
                شجرے کا اندراج کروائیں
              </p>
              <p className="text-base md:text-xl">Register the family tree</p>{" "}
            </Button>
          </Link>
          <Link href="/user/register" className="flex justify-start">
            <Button
              type="submit"
              variant="yellow" // Now this works
              className={
                "shad-primary-btn w-[50%] md:w-full mx-auto flex flex-col gap-2 px-4 bg-[#1f9367] text-white md:gap-4 md:py-12 md:px-6 hover:bg-[#4d9076]"
              }
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <p className="text-base md:text-xl font-urdu">ابھی کتاب خریدیں</p>
              <p className="text-base md:text-xl">Buy Book Now</p>
            </Button>
          </Link>
        </form>
      </div>
    </>
  );
};
export default HomeButtons;
