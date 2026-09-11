export const site = {
  name: "Meadowlark Home Care",
  legalName: "Meadowlark Home Care, LLC",
  tagline: "Quality home care in Missoula",
  missionLine: "Quality care through compassion and innovation",
  description:
    "Meadowlark Home Care provides agency-based Montana CFCS/PCS, Big Sky / SDMI / DD waiver supports, skilled nursing, private-pay non-skilled care, and VA Community Care in Missoula, Montana.",
  foundedYear: 2015,
  founders: [
    { name: "Corey Merrill", role: "Co-founder" },
    { name: "Natalie Redman", role: "Co-founder" },
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://meadowlarkhomecare.com",
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
  careersEmail: "hr@meadowlarkhomecare.com",
  careersEmailHref: "mailto:hr@meadowlarkhomecare.com",
  applyUrl: "https://4170.axiscare.com/?caregivers-applications.php",
  hireologyUrl: "https://careers.hireology.com/meadowlarkhomecare3",
  facebookUrl: "https://www.facebook.com/meadowlarkhomecare/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=800+Kensington+Ave+Ste+LL3+Missoula+MT+59801",
  hiringAreas: ["Missoula", "Great Falls"],
  opaPhone: "1-888-706-1535",
  opaPhoneHref: "tel:+18887061535",
  ddpPhone: "406-444-2995",
  ddpPhoneHref: "tel:+14064442995",
  mountainPacific: {
    cfcsAssessment: { label: "1-800-219-7035", href: "tel:+18002197035" },
    waiverScreening: [
      { label: "1-800-497-8232", href: "tel:+18004978232" },
      { label: "1-406-443-4020", href: "tel:+14064434020" },
    ],
    all: [
      { label: "1-800-219-7035", href: "tel:+18002197035" },
      { label: "1-800-497-8232", href: "tel:+18004978232" },
      { label: "406-443-4020", href: "tel:+14064434020" },
    ],
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
    ddWaiver:
      "https://dphhs.mt.gov/BHDD/DisabilityServices/developmentaldisabilities/MedicaidDDP0208WaiverServices",
  },
} as const;

export const getStartedLinks = [
  {
    label: "Apply Montana Medicaid",
    href: site.links.applyMedicaid,
    external: true,
  },
  {
    label: "Learn CFCS/PCS",
    href: site.links.cfcsPcs,
    external: true,
  },
  {
    label: "Big Sky Waiver info",
    href: site.links.bigSkyWaiver,
    external: true,
  },
  {
    label: `Call Meadowlark ${site.phone}`,
    href: site.phoneHref,
    external: false,
  },
] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const inquiryTypes = [
  "Request care",
  "Join the team",
  "General question",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export function formatAddress(separator = ", ") {
  const { street, city, state, postalCode } = site.address;
  return `${street}${separator}${city}, ${state} ${postalCode}`;
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}
