"use client";
import React, { useEffect, useState } from "react";
import { secondSectionSchema } from "@/lib/schema";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";
import { IdentificationTypes } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import SubmitButton from "../SubmitButton";
import { storeSecondSection, setUploading } from "@/redux/information/info";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import UploadingLoader from "@/components/UploadingLoader";
import { uploadToCloudinary } from "@/lib/cloudinary";

const DocumentsSection = ({ handleNext, handleBack }) => {
  const documentsInformation = useSelector(
    (state) => state.info.documents_information
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(secondSectionSchema),
    defaultValues: {
      identificationType: "",
      identificationNumber: "",
      identificationDocument: [],
      lineageProof: [],
    },
    mode: "onSubmit", // validate only on submit
  });

  // ✅ Populate Redux values & show loader while resetting
  useEffect(() => {
    if (documentsInformation && Object.keys(documentsInformation).length > 0) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        form.reset({
          identificationType: documentsInformation.identificationType || "",
          identificationNumber: documentsInformation.identificationNumber || "",
          identificationDocument:
            documentsInformation.identificationDocument || [],
          lineageProof: documentsInformation.lineageProof || [],
        });
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [documentsInformation, form]);

  const onSubmit = async (values) => {
    if (
      !values.identificationDocument?.length ||
      !values.lineageProof?.length
    ) {
      alert("Please upload all required documents before proceeding.");
      return;
    }
    setIsLoading(true);
    dispatch(setUploading(true)); // start uploading
    try {
      // Upload identificationDocument files to Cloudinary
      const idUrls = await uploadToCloudinary(
        values.identificationDocument || []
      );

      // Upload lineageProof files to Cloudinary
      const lineageUrls = await uploadToCloudinary(values.lineageProof || []);

      // Only proceed if uploads were successful
      if (idUrls.length === 0 || lineageUrls.length === 0) {
        alert("Failed to upload documents. Please try again.");
        setUploading(false);
        return;
      }

      // Save URLs in Redux instead of files
      dispatch(
        storeSecondSection({
          ...values,
          identificationDocument: idUrls,
          lineageProof: lineageUrls,
        })
      );

      // ✅ Wait a tiny tick to ensure Redux updates (optional, safe)
      setTimeout(() => {
        setIsLoading(false);
        dispatch(setUploading(false));
        handleNext(); // Navigate to next step only after uploads are stored
      }, 50);
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert("Something went wrong while uploading documents.");
      setIsLoading(false);
    }
  };

  const selectedType = form.watch("identificationType"); // 👈 watch the selected type
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
              placeholder="Select from the list"
            >
              {IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  <div className="flex justify-between w-full">
                    <span className="text-left">{type}</span>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            {/* Identification Number Input */}
            {(selectedType === "CNIC (National Identification Card)" ||
              selectedType === "B - Form") && (
              <CustomFormField
                fieldType={FormFieldType.CNIC}
                control={form.control}
                name="identificationNumber"
                label={
                  selectedType === "B - Form" ? " B-Form Number" : "CNIC Number"
                }
                labelUrdu={
                  selectedType === "B - Form"
                    ? "ب فارم نمبر"
                    : "شناختی کارڈ نمبر"
                }
                placeholder="35202-1234567-1"
                iconAlt="user"
              />
            )}

            {selectedType === "Passport" && (
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="identificationNumber"
                label="Passport Number"
                labelUrdu="پاسپورٹ نمبر"
                placeholder="SZ1011481"
                iconAlt="user"
              />
            )}
          </div>
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label={
              selectedType === "CNIC (National Identification Card)"
                ? "Upload Front & Back Pictures of CNIC"
                : "Please Upload the clear Picture of your Passport"
            }
            labelUrdu={"دستاویزات اپلوڈ کریں۔"}
            subCategory="fileSelector"
            initialUrls={documentsInformation.identificationDocument || []} // ✅ pass existing URLs
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="lineageProof"
            label="Paper Proof of Lineage"
            labelUrdu="شجرے کا کاغذی ثبوت"
            subCategory="fileSelector"
            initialUrls={documentsInformation.lineageProof || []} // ✅ pass existing URLs
          />

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

export default DocumentsSection;
