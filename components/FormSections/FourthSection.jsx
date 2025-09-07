"use client";
import React, { useState, useEffect } from "react";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SelectItem } from "@/components/ui/select";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";
import { fourthSectionSchema } from "@/lib/schema";
import SubmitButton from "../SubmitButton";
import { livingSince } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { storeFourthSection } from "@/redux/information/info";
import { ClipLoader } from "react-spinners";
const ResidentialInfo = ({ handleNext, handleBack }) => {
  const residentialInformation = useSelector(
    (state) => state.info.residential_information
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(fourthSectionSchema),
    defaultValues: {
      countryName: "",
      stateOrProvince: "",
      districtOrCity: "",
      currentArea_Town_Village: "",
      livingSince: "",
      completeAddress: "",
      permanentAddress: "",
      lastMigration: "",
    },
    mode: "onSubmit",
  });

  // ✅ Populate form with lineageInformation when available
  useEffect(() => {
    if (
      residentialInformation &&
      Object.keys(residentialInformation).length > 0
    ) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        form.reset({
          countryName: residentialInformation.countryName || "",
          stateOrProvince: residentialInformation.stateOrProvince || "",
          districtOrCity: residentialInformation.districtOrCity || "",
          currentArea_Town_Village:
            residentialInformation.currentArea_Town_Village || "",
          livingSince: residentialInformation.livingSince || "",
          completeAddress: residentialInformation.completeAddress || "",
          permanentAddress: residentialInformation.permanentAddress || "",
          lastMigration: residentialInformation.lastMigration || "",
        });
        setIsLoading(false);
      }, 300); // ⏱️ small delay for loader paint

      return () => clearTimeout(timer);
    }
  }, [residentialInformation, form]);

  const onSubmit = async (values) => {
    console.log("✅ fourth section values:", values);
    dispatch(storeFourthSection(values));
    handleNext(values);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="white" />
        </div>
      ) : (
        <Form
          {...form}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <section className={`"space-y-6 flex justify-between w-full"`}>
            <div className="mb-9 space-y-1">
              <h2 className="sub-header urdu-text ">
                <span>Residential Information*</span>
              </h2>
            </div>
            <div className="mb-9 space-y-1">
              <h2 className="sub-header urdu-text ">
                <span>رہائش کی معلومات</span>
              </h2>
            </div>
          </section>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="countryName"
              label="Country Name"
              labelUrdu="مُلک کا نام"
              placeholder="Country Name"
              iconAlt="user"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="stateOrProvince"
              label="State / Province  Name"
              labelUrdu="صوبہ / ریاست کا نام"
              placeholder="State / Province  Name"
              iconAlt="user"
            />
          </div>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="districtOrCity"
              label="District & City Name"
              labelUrdu="ضلع / شہر کا نام"
              placeholder="District & City Name"
              iconAlt="user"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="currentArea_Town_Village"
              label="Current Area / Town / Village"
              placeholder="Current Area / Town / Village"
              labelUrdu="موجودہ علاقہ / ٹاؤن / گاؤں"
              iconAlt="user"
            />
          </div>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="livingSince"
              label="Living Since (in years)"
              labelUrdu="آپ یہاں کتنے سال سے مقیم ہیں؟"
              placeholder="لسٹ میں سے منتخب کریں۔"
            >
              {livingSince.map((type) => (
                <SelectItem key={type} value={type} className="urdu-text">
                  {`${type}`}
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="lastMigration"
              label="Your family did last migration?"
              labelUrdu="خاندان کی آخری ہجرت کب ہوئی؟"
              placeholder="Last migration place"
              placeholderUrdu="آخری ہجرت کا علاقہ"
              subCategory="radio"
            />
          </div>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="completeAddress"
              label="Complete Current Address"
              labelUrdu="مکمل موجودہ پتہ"
              placeholder="Complete Current Address"
              iconAlt="user"
            />
          </div>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="permanentAddress"
              label="Complete Permanent Address"
              labelUrdu="مکمل مستقل پتہ"
              placeholder="Complete Permanent Address"
              iconAlt="user"
            />
          </div>
          <div
            className="flex-1 flex gap-10 justify-center md:justify-start"
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

export default ResidentialInfo;
