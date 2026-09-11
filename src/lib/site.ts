export const site = {
  name: "Meadowlark Home Care",
  legalName: "Meadowlark Home Care, LLC",
  tagline: "Quality home care in Missoula",
  missionLine: "Quality care through compassion and innovation",
  description:
    "Meadowlark Home Care provides in-home nursing, agency-based Montana CFCS/PCS, Big Sky / SDMI / DD waiver supports, private-pay non-skilled care, and VA Community Care in Missoula, Montana.",
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
  mountainPacific: [
    { label: "1-800-219-7035", href: "tel:+18002197035" },
    { label: "1-800-497-8232", href: "tel:+18004978232" },
    { label: "(406) 443-4020", href: "tel:+14064434020" },
  ],
  officialLinks: [
    {
      label: "Apply for Montana Medicaid",
      href: "https://apply.mt.gov/",
    },
    {
      label: "Montana CFCS / PCS program",
      href: "https://dphhs.mt.gov/sltc/csb/CFCS-PCS",
    },
    {
      label: "Montana Senior & Long Term Care programs",
      href: "https://dphhs.mt.gov/SLTC/csb/",
    },
    {
      label: "VA skilled home health care",
      href: "https://www.va.gov/Geriatrics/pages/Skilled_Home_Health_Care.asp",
    },
    {
      label: "VA community care eligibility",
      href: "https://www.va.gov/resources/eligibility-for-community-care-outside-va/",
    },
    {
      label: "Apply for VA health care",
      href: "https://www.va.gov/health-care/apply/application/introduction",
    },
  ],
} as const;

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
