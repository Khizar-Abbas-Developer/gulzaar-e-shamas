import React from "react";
import { registerFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";
import { useSelector } from "react-redux";
const FifthSection = () => {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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

  const language = useSelector((state) => state.language.language);
  return (
    <>
      <section className="space-y-6">
        <div
          className={`mb-9 space-y-1 flex ${
            language === "ur" ? "justify-end" : "justify-start"
          }`}
        >
          <h2 className="sub-header urdu-text">
            {`${
              language === "ur"
                ? "خاندانی سکونت و ہجرت سے متعلق سوالات"
                : "Family Residency and Migration Related Questions*"
            }`}{" "}
          </h2>
        </div>
      </section>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.YESORNO}
          control={form.control}
          name="gender"
          label={`${
            language === "ur"
              ? "کیا آپ فاطمی سّید ہیں؟"
              : "Are you Fatemi Syed?"
          }`}
          subCategory="radio"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={`${
            language === "ur"
              ? "  صوبہ / ریاست کا نام"
              : "State / Province  Name"
          }`}
          placeholder={`${
            language === "ur"
              ? "  صوبہ / ریاست کا نام"
              : "State / Province  Name"
          }`}
          iconAlt="user"
        />
      </div>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={`${
            language === "ur" ? "ضلع / شہر کا نام" : "District & City Name"
          }`}
          placeholder={`${
            language === "ur" ? "ضلع / شہر کا نام" : "District & City Name"
          }`}
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={`${
            language === "ur"
              ? "موجودہ علاقہ / ٹاؤن / گاؤں"
              : "Current Area / Town / Village"
          }`}
          placeholder={`${
            language === "ur"
              ? "موجودہ علاقہ / ٹاؤن / گاؤں"
              : "Current Area / Town / Village"
          }`}
          iconAlt="user"
        />
      </div>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={`${
            language === "ur"
              ? "کتنے سالوں سے یہاں مقیم ہیں؟"
              : "How many years have you been residing here?"
          }`}
          placeholder={`${
            language === "ur"
              ? "کتنے سالوں سے یہاں مقیم ہیں؟"
              : "How many years have you been residing here?"
          }`}
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={`${
            language === "ur"
              ? "موجودہ علاقہ / ٹاؤن / گاؤں"
              : "Current Area / Town / Village"
          }`}
          placeholder={`${
            language === "ur"
              ? "موجودہ علاقہ / ٹاؤن / گاؤں"
              : "Current Area / Town / Village"
          }`}
          iconAlt="user"
        />
      </div>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={`${
            language === "ur" ? " مکمل موجودہ پتہ" : " Complete Current Address"
          }`}
          placeholder={`${
            language === "ur" ? " مکمل موجودہ پتہ" : " Complete Current Address"
          }`}
          iconAlt="user"
        />
      </div>
    </>
  );
};

export default FifthSection;
