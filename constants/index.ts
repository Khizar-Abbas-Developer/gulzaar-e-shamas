export const GenderOptions = ["male", "female", "other"];
export const yesOrNoOptions = ["Yes", "No"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male",
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  // identificationNumber: "",
  // identificationDocument: [],
  // treatmentConsent: false,
  // disclosureConsent: false,
  // privacyConsent: false,
};

export const IdentificationTypes = [
  "Driver's License",
  "National Identity Card",
  "CNIC (National Identification Card)",
  "Passport",
];
export const IdentificationTypesUrdu = [
  "ڈرائیور کا لائسنس",
  "قومی شناختی کارڈ",
  "شناختی کارڈ",
  "پاسپورٹ",
];

export const listOfImams = [
  "حسنؑ بن علیؑ",
  "حسینؑ بن علیؑ",
  " علی زین العابدینؑ بن حسینؑ",
  "محمد الباقرؑ بن زین العابدینؑ",
  "جعفر الصادقؑ بن محمدؑ الباقرؑ",
  "موسىٰ الكاظمؑ بن جعفرؑ الصادقؑ",
  "على الرضاؑ بن موسىٰؑ الكاظمؑ",
  "محمد التقيؑ بن علىؑ الرضاؑ",
  "علی النقيؑ بن محمدؑ التقيؑ",
]

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
