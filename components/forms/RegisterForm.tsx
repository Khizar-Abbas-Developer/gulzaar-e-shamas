"use client";

import FirstSection from "@/components/FormSections/FirstSection";
import SecondSection from "@/components/FormSections/SecondSection";
import ThirdSection from "@/components/FormSections/ThirdSection";
import ResidentialInfo from "@/components/FormSections/FourthSection";
import FifthSection from "@/components/FormSections/FifthSection";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RegisterForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    console.log(currentStep);

    if (currentStep === 0) {
      router.push("/");
    }
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = ["Personal", "Documents", "Lineage", "Residential", "Terms"];

  const stepComponents = [
    <FirstSection
      key="first"
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <SecondSection
      key="second"
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <ThirdSection
      key="third"
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <ResidentialInfo
      key="residential"
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <FifthSection key="fifth" handleBack={handleBack} />,
  ];

  // Animation variants for sliding effect
  return (
    <>
      <form className="space-y-12 flex-1 pb-20 ">
        {/* Stepper Progress Bar */}
        <section
          className={`space-y-4 flex flex-col gap-6  justify-center items-center  `}
        >
          <h1 className="header urdu-text">
            <div className="flex gap-2 items-center">
              <span>
                <div className="flex items-center gap-4">
                  <Image
                    src="/assets/icons/tree.png"
                    width={60}
                    height={60}
                    alt="tree"
                  />
                </div>
              </span>
              <span> شجرہ اندراج فارم</span>
            </div>
          </h1>
          <h1 className="header urdu-text text-center">
            <div className="flex gap-2 items-center ">
              <span>{`Family ${" "} Tree ${" "} Registration Form`}</span>
            </div>
          </h1>
          <div className="space-y-4 flex flex-col gap-2  justify-center items-center ">
            <p className="text-dark-700 urdu-text">
              🌐 *صرف آن لائن اندراج ممکن ہے
            </p>
            <p className="text-dark-700 urdu-text">
              🌐 Online Registration Only
            </p>
          </div>
        </section>
        {/* Stepper container with horizontal scroll */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex flex-row items-center justify-between mb-6 gap-0 md:gap-4 min-w-max px-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex-1 flex flex-col items-center relative"
              >
                {/* Circle */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white z-50
            ${index <= currentStep ? "shad-primary-btn" : "bg-gray-300"}`}
                >
                  {index + 1}
                </div>

                {/* Label */}
                <p
                  className={`mt-2 text-[10px] sm:text-sm text-center whitespace-nowrap ${
                    index <= currentStep
                      ? "text-primary font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </p>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-1 
              ${index < currentStep ? "shad-primary-btn" : "bg-gray-300"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Render only the current step */}
        {/* Step Content with animation */}
        {stepComponents[currentStep]}
      </form>
    </>
  );
};

export default RegisterForm;

// {
//   /* <section className="space-y-6">
//   <div className="mb-9 space-y-1">
//     <h2 className="sub-header">Consent and Privacy</h2>
//   </div>
// </section>
// <CustomFormField
//   fieldType={FormFieldType.CHECKBOX}
//   control={form.control}
//   name="treatmentConsent"
//   label="I consent to treatment"
// />
// <CustomFormField
//   fieldType={FormFieldType.CHECKBOX}
//   control={form.control}
//   name="disclosureConsent"
//   label="I consent to disclosure of information"
// />
// <CustomFormField
//   fieldType={FormFieldType.CHECKBOX}
//   control={form.control}
//   name="privacyConsent"
//   label="I consent to privacy policy"
// /> */
// }
