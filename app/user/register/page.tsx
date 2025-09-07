"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
const Register = () => {
  return (
    <div className="flex h-auto max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className={`flex justify-end urdu-text`}>
            <div className="flex justify-center w-full">
              <Image
                src="/assets/icons/3.jpg"
                height={1000}
                width={1000}
                alt="patient"
                className="mb-12 h-20 w-fit rounded-lg"
              />
            </div>
          </div>
          <RegisterForm />
        </div>
      </section>
      <Image
        src="/assets/script/3.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[490px]"
      />
    </div>
  );
};

export default Register;
