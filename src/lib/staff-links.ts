export type StaffResource = {
  title: string;
  href: string;
  description: string;
  external: boolean;
  note?: string;
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

export const adminFormResources: StaffResource[] = [
  {
    title: "Forms hub",
    href: "/staff/forms",
    description: "Internal Medicaid / SLTC tools, including the phone form filler.",
    external: false,
  },
];

export const adminAxisCareResources: StaffResource[] = [
  {
    title: "AxisCare home",
    href: "https://4170.axiscare.com",
    description: "AxisCare web home (server 4170).",
    external: true,
  },
  {
    title: "Scheduling",
    href: "https://4170.axiscare.com/?scheduling-calendar-active-customer.php",
    description: "Active customer scheduling calendar.",
    external: true,
  },
  {
    title: "Caregiver schedules report",
    href: "https://4170.axiscare.com/?/report/weekly/caregiver",
    description: "Weekly caregiver schedule report.",
    external: true,
  },
  {
    title: "Clock in/out report",
    href: "https://4170.axiscare.com/?reports-telephony-all_clock_ins_outs.php",
    description: "All clock-in and clock-out activity.",
    external: true,
  },
  {
    title: "Documents",
    href: "https://4170.axiscare.com/?/reports/documents",
    description: "AxisCare documents report.",
    external: true,
  },
  {
    title: "Forms",
    href: "https://4170.axiscare.com/?/report/forms",
    description: "AxisCare forms report.",
    external: true,
  },
  {
    title: "Caregivers list",
    href: "https://4170.axiscare.com/?caregivers.php",
    description: "AxisCare caregiver roster.",
    external: true,
  },
];

export const adminResources: StaffResource[] = [
  ...adminFormResources,
  ...adminAxisCareResources,
];
