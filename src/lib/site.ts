import { resolvePublicSiteUrl } from "@/lib/public-site-url";

export type Office = {
  id: "missoula" | "great-falls";
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  phoneHref: string;
  fax?: string;
  mapsUrl: string;
};

export const offices: Office[] = [
  {
    id: "missoula",
    name: "Missoula",
    street: "800 Kensington Ave. Ste. LL3",
    city: "Missoula",
    state: "MT",
    postalCode: "59801",
    phone: "(406) 926-3447",
    phoneHref: "tel:+14069263447",
    fax: "(406) 926-1501",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=800+Kensington+Ave+Ste+LL3+Missoula+MT+59801",
  },
  {
    id: "great-falls",
    name: "Great Falls",
    street: "318 1st Ave S",
    city: "Great Falls",
    state: "MT",
    postalCode: "",
    phone: "(406) 206-5993",
    phoneHref: "tel:+14062065993",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=318+1st+Ave+S+Great+Falls+MT",
  },
];

export const site = {
  name: "Meadowlark Home Care",
  legalName: "Meadowlark Home Care, LLC",
  tagline: "Quality home care in Montana",
  description:
    "Meadowlark Home Care provides agency-based Montana CFCS/PCS, HCBS Big Sky and SDMI, VA Community Care, private pay, and PCCA in Missoula and Great Falls, Montana.",
  eligibilityDisclaimer:
    "Eligibility is decided by the state or VA, not Meadowlark. Confirm details on official .gov pages.",
  footerLine: "Home care in Missoula and Great Falls since 2015.",
  foundedYear: 2015,
  founders: [
    { name: "Corey Merrill", role: "Co-founder" },
    { name: "Natalie Redman", role: "Co-founder" },
  ],
  url: resolvePublicSiteUrl(),
  /** @deprecated prefer offices[] — kept for older call sites (Missoula). */
  address: {
    street: "800 Kensington Ave. Ste. LL3",
    city: "Missoula",
    state: "MT",
    postalCode: "59801",
    region: "Montana",
  },
  phone: "(406) 926-3447",
  phoneHref: "tel:+14069263447",
  fax: "(406) 926-1501",
  contactEmail: "info@meadowlarkhomecare.com",
  contactEmailHref: "mailto:info@meadowlarkhomecare.com",
  careersEmail: "hr@meadowlarkhomecare.com",
  careersEmailHref: "mailto:hr@meadowlarkhomecare.com",
  applyUrl: "/apply",
  axisCareApplyUrl: "https://4170.axiscare.com/?caregivers-applications.php",
  hireologyUrl: "https://careers.hireology.com/meadowlarkhomecare3",
  facebookUrl: "https://www.facebook.com/meadowlarkhomecare/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=800+Kensington+Ave+Ste+LL3+Missoula+MT+59801",
  hiringAreas: ["Missoula", "Great Falls"],
  opaPhone: "1-888-706-1535",
  opaPhoneHref: "tel:+18887061535",
  vaMontanaCommunityCare: {
    org: "VA Montana Community Care Consult Call Center",
    role: "Community Care consult questions",
    label: "406-447-7400",
    href: "tel:+14064477400",
  },
  mountainPacific: {
    cfcsAssessment: {
      label: "1-800-219-7035",
      href: "tel:+18002197035",
      role: "CFCS/PCS referrals",
    },
    waiverScreening: {
      label: "1-800-497-8232",
      href: "tel:+18004978232",
      role: "HCBS waiver screening",
    },
  },
  links: {
    applyMedicaid: "https://apply.mt.gov/",
    cfcsPcs: "https://dphhs.mt.gov/SLTC/csb/CFCS-PCS",
    sltcHub: "https://dphhs.mt.gov/SLTC/csb/",
    bigSkyWaiver: "https://dphhs.mt.gov/SLTC/csb/BSW/BigSkyWaiverProgram",
    hcbsWaiverPdf: "https://dphhs.mt.gov/assets/hcbs/InfoSheetforMTHCBSWaivers.pdf",
    vaAidAttendance: "https://www.va.gov/pension/aid-attendance-housebound/",
    vaHomemaker: "https://www.va.gov/Geriatrics/pages/Homemaker_and_Home_Health_Aide_Care.asp",
    vaApply: "https://www.va.gov/health-care/apply/application/introduction",
    vaSkilledHomeHealth:
      "https://www.va.gov/Geriatrics/pages/Skilled_Home_Health_Care.asp",
    vaCommunityCare:
      "https://www.va.gov/resources/eligibility-for-community-care-outside-va/",
    vaMontana: "https://www.va.gov/montana-health-care/",
    sdmiWaiver: "https://dphhs.mt.gov/BHDD/mentalhealthservices/SDMI/",
    pcca: "https://dphhs.mt.gov/sltc/csb/PCCA",
  },
  staff: {
    sltcFormUrl:
      "https://script.google.com/a/macros/meadowlarkhomecare.com/s/AKfycbxR80-VQsBrgyYgxyrNA8TKIrk47u-gv8OS5o5IF9uKQlnbdExndT8eNiDZ2SWazRE/exec",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const staffLoginLink = { href: "/login", label: "Login" } as const;

export const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const inquiryTypes = [
  "Request care",
  "Join the team",
  "General",
] as const;

export const applyOfficeOptions = [
  "Missoula",
  "Great Falls",
  "Either",
] as const;

export const applyPositionOptions = [
  "Caregiver",
  "Nurse",
] as const;

export const applyAvailabilityOptions = [
  "Full-time",
  "Part-time",
  "PRN",
] as const;

export const applyExperienceOptions = [
  "None yet",
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6+ years",
] as const;

export const applyYesNoOptions = ["Yes", "No"] as const;

export type InquiryType = (typeof inquiryTypes)[number];
export type ApplyOffice = (typeof applyOfficeOptions)[number];
export type ApplyPosition = (typeof applyPositionOptions)[number];
export type ApplyAvailability = (typeof applyAvailabilityOptions)[number];
export type ApplyExperience = (typeof applyExperienceOptions)[number];
export type ApplyYesNo = (typeof applyYesNoOptions)[number];

export function formatOfficeAddress(office: Office, separator = ", ") {
  const zip = office.postalCode ? ` ${office.postalCode}` : "";
  return `${office.street}${separator}${office.city}, ${office.state}${zip}`;
}

export function formatAddress(separator = ", ") {
  return formatOfficeAddress(offices[0], separator);
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}
