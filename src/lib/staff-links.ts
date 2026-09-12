export type StaffResourceLink = {
  label: string;
  href: string;
};

export type StaffResource = {
  title: string;
  href: string;
  description: string;
  external: boolean;
  note?: string;
  extraLinks?: StaffResourceLink[];
};

/**
 * Caregiver documents are hosted in-repo and served only through
 * authenticated `/staff/docs/*` handlers — not Google Drive.
 */
export const staffDocumentResources: StaffResource[] = [
  {
    title: "Employee Handbook",
    href: "/staff/docs/handbook",
    description: "Policies and expectations for Meadowlark caregivers.",
    external: false,
  },
  {
    title: "HIPAA Confidentiality Agreement",
    href: "/staff/docs/hipaa",
    description: "Read and keep a copy of the confidentiality agreement.",
    external: false,
  },
  {
    title: "AxisCare Mobile Caregiver Guide",
    href: "/staff/docs/axiscare-guide",
    description: "How to use the AxisCare mobile app for visits.",
    external: false,
  },
  {
    title: "AxisCare tip sheet",
    href: "/staff/docs/axiscare-tip-sheet",
    description: "Short reference for common AxisCare tasks.",
    external: false,
  },
];

export const caregiverAppResources: StaffResource[] = [
  {
    title: "AxisCare web",
    href: "https://4170.axiscare.com",
    description: "Open AxisCare in the browser. The mobile app uses server 4170.",
    external: true,
  },
  {
    title: "ADP",
    href: "https://workforcenow.adp.com",
    description: "Pay, time, and tax documents.",
    external: true,
  },
];

export const caregiverResources: StaffResource[] = [
  ...staffDocumentResources,
  ...caregiverAppResources,
];

export const adminPrimaryResources: StaffResource[] = [
  {
    title: "AxisCare",
    href: "https://4170.axiscare.com",
    description: "AxisCare web home (server 4170).",
    external: true,
  },
  {
    title: "Qliq",
    href: "https://www.qliqsoft.com/",
    description:
      "HIPAA-compliant QliqSOFT messaging. Sign in on the website, or install QliqCHAT Secure Texting (current QliqSECURE product).",
    external: true,
    extraLinks: [
      {
        label: "App Store",
        href: "https://apps.apple.com/app/qliqchat-secure-texting/id1520485466",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.qliqsoft.qliqchat",
      },
    ],
  },
  {
    title: "Employee Navigator",
    href: "https://www.employeenavigator.com/benefits/Account/Login",
    description: "Benefits enrollment and documents.",
    external: true,
  },
  {
    title: "Hireology",
    href: "https://app.hireology.com/",
    description: "Hiring and applicant tracking.",
    external: true,
  },
  {
    title: "ADP",
    href: "https://workforcenow.adp.com",
    description: "Pay, time, and tax documents.",
    external: true,
  },
  {
    title: "Employment forms",
    href: "/staff/employment-forms",
    description:
      "On-hire / employment PDFs for office staff. Not rolled out to caregivers yet.",
    external: false,
  },
];

export const adminSecondaryResources: StaffResource[] = [
  {
    title: "Forms hub",
    href: "/staff/forms",
    description: "Internal Medicaid / SLTC tools, including the phone form filler.",
    external: false,
  },
];
