export type StaffResource = {
  title: string;
  href: string;
  description: string;
  external: boolean;
  note?: string;
};

/**
 * Caregiver portal links. Drive files may need Meadowlark domain
 * sharing before personal-email caregivers can open them.
 */
export const caregiverResources: StaffResource[] = [
  {
    title: "Employee Handbook",
    href: "https://drive.google.com/file/d/12mXEa4drk2qGCbMc7HIJv8t8DM1fvuPs/view",
    description: "Policies and expectations for Meadowlark caregivers.",
    external: true,
    note: "Google Drive — domain share may be required.",
  },
  {
    title: "HIPAA Confidentiality Agreement",
    href: "https://drive.google.com/file/d/12U_LCDEsgPE_4fxWMtUyU5awLWcPWedn/view",
    description: "Read and keep a copy of the confidentiality agreement.",
    external: true,
    note: "Google Drive — domain share may be required.",
  },
  {
    title: "AxisCare Mobile Caregiver Guide",
    href: "https://drive.google.com/file/d/16e-mMuAA8VqfjfgN8HAgEg8KnJIt4Hqo/view",
    description: "How to use the AxisCare mobile app for visits.",
    external: true,
    note: "Google Drive — domain share may be required.",
  },
  {
    title: "AxisCare tip sheet",
    href: "https://drive.google.com/file/d/1LiuKCY8Or_YCC0AQrtG3J64xY36jh2Fm/view",
    description: "Short reference for common AxisCare tasks.",
    external: true,
    note: "Google Drive — domain share may be required.",
  },
  {
    title: "AxisCare web",
    href: "https://4170.axiscare.com",
    description: "Open AxisCare in the browser (server 4170).",
    external: true,
  },
  {
    title: "ADP",
    href: "https://workforcenow.adp.com",
    description: "Pay, time, and tax documents.",
    external: true,
  },
];

export const adminResources: StaffResource[] = [
  {
    title: "Forms hub",
    href: "/staff/forms",
    description: "Internal Medicaid / SLTC tools, including the phone form filler.",
    external: false,
  },
];
