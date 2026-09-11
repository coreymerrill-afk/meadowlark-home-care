export const site = {
  name: "Meadowlark Home Care",
  legalName: "Meadowlark Home Care, LLC",
  tagline: "Quality home care in Missoula",
  missionLine: "Quality care through compassion and innovation",
  description:
    "Meadowlark Home Care provides in-home nursing, Medicaid CFC/PAS, HCBS waiver, and private-pay care in Missoula, Montana.",
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
  hireologyUrl: "https://careers.hireology.com/meadowlarkhomecare3",
  facebookUrl: "https://www.facebook.com/meadowlarkhomecare",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=800+Kensington+Ave+Ste+LL3+Missoula+MT+59801",
  hiringAreas: ["Missoula", "Great Falls"],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
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
