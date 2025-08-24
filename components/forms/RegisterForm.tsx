"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FirstSection from "@/components/FormSections/FirstSection";
import SecondSection from "@/components/FormSections/SecondSection";
import ThirdSection from "@/components/FormSections/ThirdSection";
import ResidentialInfo from "@/components/FormSections/FourthSection";
import FifthSection from "@/components/FormSections/FifthSection";
import { Form } from "../ui/form";
import { registerFormProps } from "@/types";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerFormSchema } from "@/lib/schema";
import { updatePatient } from "@/app/(actions)/patient.actions";

const RegisterForm = ({ id, name, email, phone }: registerFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name,
      email,
      phone,
      birthDate: new Date("01-01-2001"),
      gender: "male",
      address: "",
      occupation: "",
      insuranceProvider: "",
      currentMedication: "",
      insurancePolicyNumber: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      familyMedicalHistory: "",
      primaryPhysician: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      identificationDocument: [],
      treatmentConsent: false,
      disclosureConsent: false,
      privacyConsent: false,
    },
  });

  const steps = [
    "Personal",
    "Documents",
    "Lineage",
    "Residential",
    "Review & Consent",
  ];

  const stepComponents = [
    <FirstSection key="first" />,
    <SecondSection key="second" />,
    <ThirdSection key="third" />,
    <ResidentialInfo key="residential" />,
    <FifthSection key="fifth" />,
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push("/");
    }
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true);
    const result = await updatePatient(id, values);
    if (result?.success && result.data?.id) {
      router.push(`/patients/${result.data.id}/new-appointment`);
    } else {
      console.error("Failed to create patient:");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 flex-1"
        >
          {/* Stepper Progress Bar */}

          <section
            className={`space-y-4 flex flex-col gap-6  justify-center items-center  `}
          >
            <h1 className="header urdu-text"> 🌿 *شجرہ اندراج فارم*</h1>
            <p className="text-dark-700 urdu-text">
              🌐 *صرف آن لائن اندراج ممکن ہے
            </p>
          </section>

          <div className="w-full flex flex-col md:flex-row items-center justify-between mb-6 gap-4 md:gap-0">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex-1 flex flex-col items-center relative w-full"
              >
                {/* Circle */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white  z-50
        ${index <= currentStep ? "shad-primary-btn" : "bg-gray-300"}`}
                >
                  {index + 1}
                </div>

                {/* Label */}
                <p
                  className={`mt-2 text-sm text-center ${
                    index <= currentStep
                      ? "text-primary font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </p>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <>
                    {/* Horizontal connector for md+ */}
                    <div
                      className={`hidden md:block absolute top-4 left-1/2 w-full h-1 
            ${index < currentStep ? "shad-primary-btn" : "bg-gray-300"}`}
                    ></div>

                    {/* Vertical connector for mobile */}
                    <div
                      className={`block md:hidden w-1 h-6 mx-auto 
            ${index < currentStep ? "shad-primary-btn" : "bg-gray-300"}`}
                    ></div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Render only the current step */}
          {stepComponents[currentStep]}

          <div className="flex-1 flex justify-center md:justify-start gap-36">
            <SubmitButton isLoading={isLoading} handleClick={handleBack}>
              Back
            </SubmitButton>
            <SubmitButton
              isLoading={isLoading}
              handleClick={
                currentStep === stepComponents.length - 1
                  ? form.handleSubmit(onSubmit)
                  : handleNext
              }
            >
              {currentStep === stepComponents.length - 1 ? "Submit" : "Next"}
            </SubmitButton>
          </div>
        </form>
      </Form>
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
