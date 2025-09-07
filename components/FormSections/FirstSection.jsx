"use client";
import React, { useEffect, useState } from "react";
import { firstSectionSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";
import { Form } from "../ui/form";
import SubmitButton from "../SubmitButton";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { storeFirstSection } from "@/redux/information/info";

const PersonalInformation = ({ handleNext, handleBack }) => {
  const personalInformation = useSelector(
    (state) => state.info.personal_information
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(firstSectionSchema),
    defaultValues: {
      fullName: "",
      fatherName: "",
      grandFatherName: "",
      greatGrandFatherName: "",
      birthDate: null, // ⬅️ make it empty initially
      cnic: "",
      email: "",
      phone: "",
    },
    mode: "onSubmit", // validate only on submit
  });

  useEffect(() => {
    if (personalInformation && Object.keys(personalInformation).length > 0) {
      setIsLoading(true);

      // Small delay to allow loader to render before resetting form
      const timer = setTimeout(() => {
        form.reset({
          fullName: personalInformation.fullName || "",
          fatherName: personalInformation.fatherName || "",
          grandFatherName: personalInformation.grandFatherName || "",
          greatGrandFatherName: personalInformation.greatGrandFatherName || "",
          birthDate: personalInformation.birthDate
            ? new Date(personalInformation.birthDate)
            : null,
          cnic: personalInformation.cnic || "",
          email: personalInformation.email || "",
          phone: personalInformation.phone || "",
        });
        setIsLoading(false);
      }, 300); // ⏱️ show loader for ~300ms (enough for React to paint)

      return () => clearTimeout(timer);
    }
  }, [personalInformation, form]);

  const onSubmit = (values) => {
    dispatch(storeFirstSection(values));
    handleNext(values);
  };
  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Form
          {...form}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <section className={`"space-y-6 flex justify-between w-full"`}>
            <div className="mb-9 space-y-1">
              <h2 className="sub-header urdu-text ">
                <span>Personal Information</span>
              </h2>
            </div>
            <div className="mb-9 space-y-1">
              <h2 className="sub-header urdu-text ">
                <span>ذاتی معلومات</span>
              </h2>
            </div>
          </section>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="fullName"
              label={"Full-Name"}
              labelUrdu={"مکمل نام"}
              placeholder="Full Name"
              iconAlt="user"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="fatherName"
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
              name="grandFatherName"
              label="Grand-Father Name"
              labelUrdu="دادا کا نام"
              placeholder="Grand-Father Name"
              iconAlt="user"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="greatGrandFatherName"
              label="Great Grand Father"
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
              fieldType={FormFieldType.CNIC}
              control={form.control}
              name="cnic"
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
              label="WhatsApp / Phone Number"
              labelUrdu="واٹس ایپ / فون نمبر"
              placeholder="3204125714"
            />
          </div>

          <div
            className="flex-1 flex justify-center md:justify-start w-full"
            style={{ gap: "40px" }}
          >
            <SubmitButton
              type="button"
              isLoading={isLoading}
              handleClick={handleBack}
            >
              Back
            </SubmitButton>
            <SubmitButton
              isLoading={isLoading}
              handleClick={form.handleSubmit(onSubmit)}
            >
              Next
            </SubmitButton>
          </div>
        </Form>
      )}
    </>
  );
};

export default PersonalInformation;
