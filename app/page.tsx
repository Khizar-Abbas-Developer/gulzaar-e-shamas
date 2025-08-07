"use client";
import BookViewerModel from "@/components/BookViewerModel";
import HomeButtons from "@/components/forms/PatientForm";
import PasskeyModel from "@/components/PasskeyModel";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
//
export default function Home() {
  const [user, setUser] = useState<"admin" | "patient" | "doctor">("patient");
  const searchParams = useSearchParams(); // Unwrap searchParams correctly
  const admin = searchParams.get("admin"); // Get the value safely
  const isAdmin = admin === "true";
  useEffect(() => {
    if (isAdmin) {
      setUser("admin");
    }
  }, [isAdmin]);
  const [loading, setLoading] = useState(false);
  const fetchLoading = (value: boolean) => {
    setLoading(value);
  };
  return (
    <>
      {loading ? (
        <div className="flex h-screen justify-center items-center">
          <ClipLoader color="shad-primary-btn" />
        </div>
      ) : (
        <div className="flex flex-col-reverse md:flex-row h-[100vh] md:h-screen w-full items-center justify-center mx-auto overflow-hidden">
          {isAdmin && <PasskeyModel user={user} />}

          {/* LEFT SIDE — FORM */}
          <section className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-[496px]">
              <HomeButtons fetchLoading={fetchLoading} />
              <div className="text-14-regular mt-20 flex justify-between items-center">
                <div className="text-dark-600 flex flex-row-reverse justify-center items-center gap-2">
                  <p> 2025</p>
                  <p>گلزارِ شمس تبریزؒ</p>
                  <p>©</p>
                </div>
                <Link href="/?admin=true" className="text-green-500">
                  Admin
                </Link>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE — BOOK VIEWER */}
          <div className="z-0 w-[100%] ml-16 md:ml-0 md:w-1/2 h-full md:h-full flex justify-center items-center">
            <BookViewerModel />
          </div>
        </div>
      )}
    </>
  );
}
