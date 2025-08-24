import CustomFormField from "@/components/CustomFormField";
import { FormFieldType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SelectItem } from "@/components/ui/select";
import { registerFormSchema } from "@/lib/schema";
import { listOfImams } from "@/constants";

const ShajraInformation = () => {
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
          name="gender"
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
            <SelectItem key={type} value={type}>
              {`امام ${type}`}
            </SelectItem>
          ))}
        </CustomFormField>
      </div>
      <div className="double-input-group">
        <CustomFormField
          fieldType={FormFieldType.YESORNO}
          control={form.control}
          name="gender"
          label="Are you a Najib al-Tarafayn Sayyid?"
          labelUrdu="کیا آپ نجیب الطرفین سیّد ہیں؟"
          subCategory="radio"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
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
          name="name"
          label="Maternal Grand Father Name"
          labelUrdu="نانا کا نام"
          placeholder="Maternal Grand Father Name"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="currentMedication"
          label="Note"
          labelUrdu="نوٹ"
          placeholder="Anything to add?"
        />
      </div>
    </>
  );
};

export default ShajraInformation;
