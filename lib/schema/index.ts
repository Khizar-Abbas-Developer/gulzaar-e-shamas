import { z } from "zod";

export const firstSectionSchema = z.object({
  fullName: z.string().min(2, { message: "Full Name is required" }),
  fatherName: z.string().min(2, { message: "Father Name is required" }),
  grandFatherName: z
    .string()
    .min(2, { message: "Grand Father Name is required" }),
  greatGrandFatherName: z
    .string()
    .min(2, { message: "Great Grand Father Name is required" }),
  birthDate: z.preprocess(
    (val) => (val instanceof Date ? val : val ? new Date() : undefined),
    z.date({ required_error: "Date of Birth is required" })
  ),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, {
    message: "CNIC must be in the format 35202-1234567-1",
  }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  phone: z.string().regex(/^(\+92\d{10}|\d{10,11})$/, {
    message:
      "Phone number must be 10–11 digits or in international format +92XXXXXXXXXX",
  }),
});

export const secondSectionSchema = z.object({
  identificationType: z.string().min(1, {
    message: "Document type is required",
  }),
  identificationNumber: z.string().min(3, {
    message: "Document number is required",
  }),
  identificationDocument: z
    .any()
    .refine(
      (file) =>
        file instanceof File || (Array.isArray(file) && file.length > 0),
      {
        message: "Please upload the identification document",
      }
    ),
  lineageProof: z
    .any()
    .refine(
      (file) =>
        file instanceof File || (Array.isArray(file) && file.length > 0),
      {
        message: "Please upload the paper proof of lineage",
      }
    ),
});

export const thirdSectionSchema = z.object({
  AreYouFatmiSyed: z.string().min(1, { message: "Please select Yes or No" }),
  identificationType: z
    .string()
    .min(1, { message: "Please select Imam lineage" }),
  AreYouNajibUtarfainSyed: z
    .string()
    .min(1, { message: "Please select Yes or No" }), // Najib al-Tarafayn Sayyid
  motherName: z.string().min(2, { message: "Mother name is required" }),
  maternalGrandFatherName: z
    .string()
    .min(2, { message: "Maternal Grand Father name is required" }),
  note: z.string().optional(),
});

export const fourthSectionSchema = z.object({
  countryName: z
    .string()
    .min(2, "Country name must be at least 2 characters long")
    .max(100, "Country name is too long"),
  stateOrProvince: z
    .string()
    .min(2, "State / Province name must be at least 2 characters long")
    .max(100, "State / Province name is too long"),
  districtOrCity: z
    .string()
    .min(2, "District / City name must be at least 2 characters long")
    .max(100, "District / City name is too long"),
  currentArea_Town_Village: z
    .string()
    .min(2, "Current area / town / village must be at least 2 characters long")
    .max(150, "Current area / town / village is too long"),
  livingSince: z
    .string()
    .min(1, "This field is required")
    .max(50, "Too long") // optional length limit
    .refine((val) => /^[\d\s\w-]+$/.test(val), {
      message: "Please enter a valid string like '1 year', '6 months'",
    }),

  completeAddress: z
    .string()
    .min(5, "Complete address must be at least 5 characters long")
    .max(250, "Complete address is too long"),
  permanentAddress: z
    .string()
    .min(5, "Complete address must be at least 5 characters long")
    .max(250, "Complete address is too long"),
  lastMigration: z
    .string()
    .min(
      2,
      "Please provide the information about your last migration year and from?"
    )
    .max(2000, "Migration information is too long"),
});

export const fifthSectionSchema = z.object({
  infoAccuracy: z.boolean().refine((val) => val === true, {
    message: "You must confirm information accuracy",
  }),
  inclusionConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to inclusion",
  }),
  legalAwareness: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge legal responsibility",
  }),
  feeAgreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to pay the fee",
  }),
  verificationPeriod: z.boolean().refine((val) => val === true, {
    message: "You must accept verification period",
  }),
  rejectionConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to rejection terms",
  }),
  dnatestagreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to rejection terms",
  }),
  whatsappConsent: z.boolean().refine((val) => val === true, {
    message: "You must keep WhatsApp number active",
  }),
});

export const patientSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(15, { message: "Phone number must not exceed 15 digits." })
    .regex(/^\+?[0-9]+$/, {
      message: "Phone number must contain only digits and may start with '+'.",
    }),
});

export const registerFormSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(15, { message: "Phone number must not exceed 15 digits." })
    .regex(/^\+?[0-9]+$/, {
      message: "Phone number must contain only digits and may start with '+'.",
    }),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const getAppointmentSchema = (
  type: "create" | "cancel" | "schedule"
) => {
  if (!["create", "cancel", "schedule"].includes(type)) {
    throw new Error(`Invalid schema type: ${type}`);
  }

  return type === "create"
    ? z.object({
        doctor: z.string().nonempty(),
        schedule: z.date(),
        reason: z.string().optional(),
        notes: z.string().optional(),
      })
    : type === "cancel"
    ? z.object({
        cancellationReason: z.string().nonempty(),
      })
    : z.object({}); // Schema for "schedule" (currently empty, update as needed)
};
