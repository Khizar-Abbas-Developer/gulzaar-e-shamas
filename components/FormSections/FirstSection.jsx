import React from "react";
import { registerFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";

const PersonalInformation = () => {
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
            <span>Personal Information</span>
          </h2>
        </div>
        <div className="mb-9 space-y-1">
          <h2 className="sub-header urdu-text ">
            <span>ذاتی معلومات*</span>
          </h2>
        </div>
      </section>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={"Full-Name"}
          labelUrdu={"مکمل نام"}
          placeholder="Full Name"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Father-Name"
          labelUrdu="والد کا نام"
          placeholder="Father Name"
          iconAlt="user"
        />
      </div>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Grand-Father Name"
          labelUrdu="دادا کا نام"
          placeholder="Grand-Father Name"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Great-Grand Father Name"
          labelUrdu="پردادا کا نام"
          placeholder="Great-Grand Father Name"
          iconAlt="user"
        />
      </div>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label="Date of Birth"
          labelUrdu="تاریخِ - پیدائش"
          showTimeSelect={false}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="CNIC Number"
          labelUrdu="شناختی کارڈ نمبر"
          placeholder="35202-1234567-1"
          iconAlt="user"
        />
      </div>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email (optional)"
          labelUrdu="ای میل"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="WhatsApp Number"
          labelUrdu="واٹس ایپ نمبر"
          placeholder="3204125714"
        />
      </div>
    </>
  );
};

export default PersonalInformation;
