import React from "react";
import { registerFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";
import { IdentificationTypes, IdentificationTypesUrdu } from "@/constants";
import { SelectItem } from "@/components/ui/select";

const DocumentsSection = () => {
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

  return (
    <>
      <section className={`"space-y-6 flex justify-between w-full"`}>
        <div className="mb-9 space-y-1">
          <h2 className="sub-header urdu-text ">
            <span>Documents (All uploads are mandatory)*</span>
          </h2>
        </div>
        <div className="mb-9 space-y-1">
          <h2 className="sub-header urdu-text ">
            <span> تصاویر (تمام اپلوڈ لازمی ہیں)*</span>
          </h2>
        </div>
      </section>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Select Document"
          labelUrdu="ڈاکیومنٹ منتخب کریں"
          placeholder={`${
            language === "ur" ? "منتخب کریں" : "Select from the list"
          }`}
        >
          {language === "ur"
            ? IdentificationTypesUrdu.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))
            : IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Document Number"
          labelUrdu="ڈاکیومنٹ نمبر"
          placeholder={`${
            language === "ur" ? "ڈاکیومنٹ نمبر" : "Document Number"
          }`}
        />
      </div>
      <CustomFormField
        fieldType={FormFieldType.SKELETON}
        control={form.control}
        name="identificationDocument"
        label="Uploaded Document"
        labelUrdu="دستاویزات اپلوڈ کریں۔"
        subCategory="fileSelector"
      />
      <CustomFormField
        fieldType={FormFieldType.SKELETON}
        control={form.control}
        name="identificationDocument"
        label="Paper Proof of Lineage"
        labelUrdu="شجرے کا کاغذی ثبوت"
        subCategory="fileSelector"
      />
    </>
  );
};

export default DocumentsSection;
