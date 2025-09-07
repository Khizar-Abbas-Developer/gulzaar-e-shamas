"use client";
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { SelectItem } from "@/components/ui/select";
import { thirdSectionSchema } from "@/lib/schema";
import { listOfImams } from "@/constants";
import { useState, useEffect } from "react";
import SubmitButton from "../SubmitButton";
import { storeThirdSection } from "@/redux/information/info";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const ShajraInformation = ({ handleNext, handleBack }) => {
  const lineageInformation = useSelector(
    (state) => state.info.lineage_information
  );
  console.log(lineageInformation);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(thirdSectionSchema),
    defaultValues: {
      AreYouFatmiSyed: "", // yes/no
      identificationType: "", // imam lineage
      AreYouNajibUtarfainSyed: "", // yes/no
      motherName: "",
      maternalGrandFatherName: "",
      note: "",
    },
    mode: "onSubmit",
  });
  // Populate default values dynamically
  useEffect(() => {
    if (lineageInformation && Object.keys(lineageInformation).length > 0) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        form.reset({
          AreYouFatmiSyed: lineageInformation.AreYouFatmiSyed || "",
          identificationType: lineageInformation.identificationType || "",
          AreYouNajibUtarfainSyed:
            lineageInformation.AreYouNajibUtarfainSyed || "",
          motherName: lineageInformation.motherName || "",
          maternalGrandFatherName:
            lineageInformation.maternalGrandFatherName || "",
          note: lineageInformation.note || "",
        });
        setIsLoading(false);
      }, 300); // small delay to show loader

      return () => clearTimeout(timer);
    }
  }, [lineageInformation, form]);

  const onSubmit = async (values) => {
    console.log("✅ third section values:", values);
    dispatch(storeThirdSection(values));
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
                <span>Lineage Information*</span>
              </h2>
            </div>
            <div className="mb-9 space-y-1">
              <h2 className="sub-header urdu-text ">
                <span>سلسلہ نسب کی معلومات</span>
              </h2>
            </div>
          </section>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.YESORNO}
              control={form.control}
              name="AreYouFatmiSyed"
              label="Are you Fatemi Syed?"
              labelUrdu="کیا آپ فاطمی سیّد ہیں؟"
              subCategory="radio"
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Your Imam (A.S.) lineage?"
              labelUrdu="آپ کسِ امام علیہ السلام کی اولاد ہیں؟"
              placeholder="لسٹ میں سے منتخب کریں۔"
            >
              {listOfImams.map((type) => (
                <SelectItem key={type} value={type} className="urdu-text">
                  {`امام ${type}`}
                </SelectItem>
              ))}
            </CustomFormField>
          </div>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.YESORNO}
              control={form.control}
              name="AreYouNajibUtarfainSyed"
              label="Are you a Najib al-Tarafayn Sayyid?"
              labelUrdu="کیا آپ نجیب الطرفین سیّد ہیں؟"
              subCategory="radio"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="motherName"
              label="Mother Name"
              labelUrdu="ماں کا نام"
              placeholder="Mother Name"
              iconAlt="user"
            />
          </div>
          <div className="double-input-group">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="maternalGrandFatherName"
              label="Maternal Grand Father Name"
              labelUrdu="نانا کا نام"
              placeholder="Maternal Grand Father Name"
              iconAlt="user"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              label="Note"
              labelUrdu="نوٹ"
              placeholder="Anything to add?"
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

export default ShajraInformation;
