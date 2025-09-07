import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => {
  return URL.createObjectURL(file); // returns string directly
};

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

// utils/cloudinaryUpload.js

//
//
//
//
//
//
// -------------------- Section Types --------------------

// Personal Information
// Personal Information
export interface PersonalInformation {
  fullName: string;
  fatherName: string;
  grandFatherName: string;
  greatGrandFatherName: string;
  birthDate: string | null;
  cnic: string;
  email: string;
  phone: string;
}

// Identification Information
export interface IdentificationInformation {
  identificationType: string;
  identificationNumber: string;
  identificationDocument: string | string[]; // URLs as string or array of strings
  lineageProof: string | string[]; // URLs as string or array of strings
}

// Lineage Information
export interface LineageInformation {
  AreYouFatmiSyed: string;
  identificationType: string;
  AreYouNajibUtarfainSyed: string;
  motherName: string;
  maternalGrandFatherName: string;
  note: string;
}

// Residential Information
export interface ResidentialInformation {
  countryName: string;
  stateOrProvince: string;
  districtOrCity: string;
  currentArea_Town_Village: string;
  livingSince: string;
  completeAddress: string;
  permanentAddress: string;
  lastMigration: string;
}

// Agreements Information
export interface AgreementsInformation {
  infoAccuracy: boolean;
  inclusionConsent: boolean;
  legalAwareness: boolean;
  feeAgreement: boolean;
  verificationPeriod: boolean;
  rejectionConsent: boolean;
  dnatestagreement: boolean;
  whatsappConsent: boolean;
}

// -------------------- Redux Data Shape --------------------
export interface ReduxData {
  personal_information?: Partial<PersonalInformation>;
  documents_information?: Partial<IdentificationInformation>;
  lineage_information?: Partial<LineageInformation>;
  residential_information?: Partial<ResidentialInformation>;
  agreements_information?: Partial<AgreementsInformation>;
}
// -------------------- Function --------------------
export const createDataToSend = (dataFromRedux: ReduxData) => {
  try {
    const formData = {
      personalInformation: {
        fullName: dataFromRedux.personal_information?.fullName || "",
        fatherName: dataFromRedux.personal_information?.fatherName || "",
        grandFatherName:
          dataFromRedux.personal_information?.grandFatherName || "",
        greatGrandFatherName:
          dataFromRedux.personal_information?.greatGrandFatherName || "",
        birthDate: dataFromRedux.personal_information?.birthDate || null,
        cnic: dataFromRedux.personal_information?.cnic || "",
        email: dataFromRedux.personal_information?.email || "",
        phone: dataFromRedux.personal_information?.phone || "",
      },

      identificationInformation: {
        identificationType:
          dataFromRedux.documents_information?.identificationType || "",
        identificationNumber:
          dataFromRedux.documents_information?.identificationNumber || "",
        identificationDocument: Array.isArray(
          dataFromRedux.documents_information?.identificationDocument
        )
          ? dataFromRedux.documents_information.identificationDocument
          : [dataFromRedux.documents_information?.identificationDocument || ""],

        lineageProof: Array.isArray(
          dataFromRedux.documents_information?.lineageProof
        )
          ? dataFromRedux.documents_information.lineageProof
          : [dataFromRedux.documents_information?.lineageProof || ""],
      },

      lineageInformation: {
        AreYouFatmiSyed:
          dataFromRedux.lineage_information?.AreYouFatmiSyed || "",
        identificationType:
          dataFromRedux.lineage_information?.identificationType || "",
        AreYouNajibUtarfainSyed:
          dataFromRedux.lineage_information?.AreYouNajibUtarfainSyed || "",
        motherName: dataFromRedux.lineage_information?.motherName || "",
        maternalGrandFatherName:
          dataFromRedux.lineage_information?.maternalGrandFatherName || "",
        note: dataFromRedux.lineage_information?.note || "",
      },

      residentialInformation: {
        countryName: dataFromRedux.residential_information?.countryName || "",
        stateOrProvince:
          dataFromRedux.residential_information?.stateOrProvince || "",
        districtOrCity:
          dataFromRedux.residential_information?.districtOrCity || "",
        currentArea_Town_Village:
          dataFromRedux.residential_information?.currentArea_Town_Village || "",
        livingSince: dataFromRedux.residential_information?.livingSince || "",
        completeAddress:
          dataFromRedux.residential_information?.completeAddress || "",
        permanentAddress:
          dataFromRedux.residential_information?.permanentAddress || "",
        lastMigration:
          dataFromRedux.residential_information?.lastMigration || "",
      },
    };

    return formData;
  } catch (error) {
    console.log("Error while creating data to send", error);
  }
};
