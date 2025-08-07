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
        <div className="flex flex-col-reverse md:flex-row h-[100vh] md:h-screen w-full overflow-hidden">
          {isAdmin && <PasskeyModel user={user} />}

          {/* LEFT SIDE — FORM */}
          <section className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-[496px]">
              <Image
                src="/assets/icons/logo-full.svg"
                width={1000}
                height={1000}
                alt="patient"
                className="mb-12 h-10 w-fit"
              />
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
          <div className="relative z-0 w-full md:w-1/2 h-[400px] md:h-full">
            <BookViewerModel />
          </div>
        </div>
      )}
    </>
  );
}
