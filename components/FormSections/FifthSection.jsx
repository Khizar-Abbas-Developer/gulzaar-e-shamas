"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";
import SubmitButton from "../SubmitButton";
import { fifthSectionSchema } from "@/lib/schema";
import { useDispatch, useSelector } from "react-redux";
import { storeFifthSection } from "@/redux/information/info";

const FifthSection = ({ handleBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const agreementInformation = useSelector(
    (state) => state.info.agreements_information
  );
  const form = useForm({
    resolver: zodResolver(fifthSectionSchema),
    defaultValues: {
      infoAccuracy: false,
      inclusionConsent: false,
      legalAwareness: false,
      feeAgreement: false,
      verificationPeriod: false,
      rejectionConsent: false,
      dnatestagreement: false,
      whatsappConsent: false,
    },
    mode: "onSubmit",
  });

  // ✅ Populate form when agreementInformation is available
  useEffect(() => {
    if (agreementInformation && Object.keys(agreementInformation).length > 0) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        form.reset({
          infoAccuracy: agreementInformation.infoAccuracy ?? false,
          inclusionConsent: agreementInformation.inclusionConsent ?? false,
          legalAwareness: agreementInformation.legalAwareness ?? false,
          feeAgreement: agreementInformation.feeAgreement ?? false,
          verificationPeriod: agreementInformation.verificationPeriod ?? false,
          rejectionConsent: agreementInformation.rejectionConsent ?? false,
          dnatestagreement: agreementInformation.dnatestagreement ?? false,
          whatsappConsent: agreementInformation.whatsappConsent ?? false,
        });
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [agreementInformation, form]);

  const onSubmit = async (values) => {
    console.log("✅ Fifth section values:", values);
    dispatch(storeFifthSection(values));
  };

  return (
    <>
      <Form
        {...form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <section className="flex justify-between w-full">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Rules and Regulations*</h2>
          </div>
          <div className="mb-9 space-y-1">
            <h2 className="sub-header urdu-text">قواعد و ضوابط</h2>
          </div>
        </section>

        {/* ✅ Terms & Conditions Checkboxes */}
        <CustomFormField
          fieldType={FormFieldType.TERMS}
          control={form.control}
          name="infoAccuracy"
          label="I confirm that all provided information is correct, complete, and under my responsibility."
          labelUrdu="میں تصدیق کرتا ہوں کہ دی گئی تمام معلومات درست، مکمل اور میری ذاتی ذمہ داری پر ہیں۔"
        />

        <CustomFormField
          fieldType={FormFieldType.TERMS}
          control={form.control}
          name="inclusionConsent"
          label="I agree that my information may be included in Shajrah Gulzar-e-Shams."
          labelUrdu="میں اس بات پر رضامند ہوں کہ میری معلومات کو شجرۂ گلزارِ شمس میں شامل کیا جائے۔"
        />

        <CustomFormField
          fieldType={FormFieldType.TERMS}
          control={form.control}
          name="legalAwareness"
          label="I am aware that providing false information may result in legal action."
          labelUrdu="میں اس بات سے آگاہ ہوں کہ غلط معلومات دینے کی صورت میں قانونی کارروائی ہو سکتی ہے۔"
        />

        <CustomFormField
          fieldType={FormFieldType.TERMS}
          control={form.control}
          name="feeAgreement"
          label="I agree to pay the non-refundable verification fee of Rs. 100."
          labelUrdu="میں تصدیقی فیس *100 روپے* ہر فرد ادا کرنے کا پابند ہوں، جو ناقابلِ واپسی ہے۔"
        />

        <CustomFormField
          fieldType={FormFieldType.TERMS}
          control={form.control}
          name="verificationPeriod"
          label="I accept that the verification process will take 75 business days."
          labelUrdu="درخواست کا تصدیقی دورانیہ 75 دن تک ہو سکتا ہے۔"
        />

        <CustomFormField
          fieldType={FormFieldType.TERMS}
          control={form.control}
          name="rejectionConsent"
          label="I understand that missing or false information may lead to rejection of the request."
          labelUrdu="معلومات کی عدم موجودگی یا غلط معلومات کی صورت میں درخواست *خارج* کی جا سکتی ہے۔"
        />

        <CustomFormField
          fieldType={FormFieldType.TERMS}
          control={form.control}
          name="dnatestagreement"
          label="I understand that if my request is rejected, the only way to be included in the lineage record is through a DNA test, the cost of which I will bear."
          labelUrdu="میں سمجھتا ہوں کہ اگر میری درخواست مسترد ہو جائے تو شجرہ اندراج میں شامل ہونے کا واحد طریقہ ڈی این اے ٹیسٹ ہے، جس کے اخراجات مجھے برداشت کرنا ہوں گے۔"
        />

        <CustomFormField
          fieldType={FormFieldType.TERMS}
          control={form.control}
          name="whatsappConsent"
          label="I agree to keep my WhatsApp number active so representatives can contact me in time."
          labelUrdu="فون نمبر *آن رکھنا ضروری ہے* تاکہ نمائندگان بروقت رابطہ کر سکیں۔"
        />

        {/* ✅ Buttons */}
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
            Submit
          </SubmitButton>
        </div>
      </Form>
    </>
  );
};

export default FifthSection;
