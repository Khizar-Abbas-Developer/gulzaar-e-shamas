"use client";
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
const Register = () => {
  const patient = useSelector(
    (state: RootState) => state.patient.currentPatient
  );
  if (!patient || !patient.email) {
    // redirect("/");
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className={`flex justify-end urdu-text`}>
            <div className="flex justify-center">
              <Image
                src="/assets/icons/3.jpg"
                height={1000}
                width={1000}
                alt="patient"
                className="mb-12 h-20 w-fit rounded-lg"
              />
            </div>
          </div>
          {patient && (
            <RegisterForm
              id={patient.id}
              name={patient.name}
              email={patient.email}
              phone={patient.phone}
            />
          )}
          <p className="copyright mt-10 py-12">© 2025 CarePluse</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
