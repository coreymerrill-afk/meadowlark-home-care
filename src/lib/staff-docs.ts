import { readFile } from "node:fs/promises";
import path from "node:path";

export const STAFF_DOC_SLUGS = [
  "handbook",
  "hipaa",
  "axiscare-guide",
  "axiscare-tip-sheet",
  "employment-i9",
  "employment-w4",
  "employment-direct-deposit",
  "employment-emergency-contact",
] as const;

export type StaffDocSlug = (typeof STAFF_DOC_SLUGS)[number];
export type StaffDocAudience = "portal" | "admin";

export type StaffDoc = {
  slug: StaffDocSlug;
  file: string;
  downloadName: string;
  title: string;
  audience: StaffDocAudience;
};

export const staffDocs: Record<StaffDocSlug, StaffDoc> = {
  handbook: {
    slug: "handbook",
    file: "employee-handbook.pdf",
    downloadName: "employee-handbook.pdf",
    title: "Employee Handbook",
    audience: "portal",
  },
  hipaa: {
    slug: "hipaa",
    file: "hipaa-confidentiality-agreement.pdf",
    downloadName: "hipaa-confidentiality-agreement.pdf",
    title: "HIPAA Confidentiality Agreement",
    audience: "portal",
  },
  "axiscare-guide": {
    slug: "axiscare-guide",
    file: "axiscare-mobile-caregiver-guide.pdf",
    downloadName: "axiscare-mobile-caregiver-guide.pdf",
    title: "AxisCare Mobile Caregiver Guide",
    audience: "portal",
  },
  "axiscare-tip-sheet": {
    slug: "axiscare-tip-sheet",
    file: "axiscare-tip-sheet.pdf",
    downloadName: "axiscare-tip-sheet.pdf",
    title: "AxisCare tip sheet",
    audience: "portal",
  },
  "employment-i9": {
    slug: "employment-i9",
    file: "employment-i9.pdf",
    downloadName: "employment-i9.pdf",
    title: "Form I-9",
    audience: "admin",
  },
  "employment-w4": {
    slug: "employment-w4",
    file: "employment-w4.pdf",
    downloadName: "employment-w4.pdf",
    title: "Form W-4",
    audience: "admin",
  },
  "employment-direct-deposit": {
    slug: "employment-direct-deposit",
    file: "employment-direct-deposit.pdf",
    downloadName: "employment-direct-deposit.pdf",
    title: "Direct deposit authorization",
    audience: "admin",
  },
  "employment-emergency-contact": {
    slug: "employment-emergency-contact",
    file: "employment-emergency-contact.pdf",
    downloadName: "employment-emergency-contact.pdf",
    title: "Emergency contact",
    audience: "admin",
  },
};

export const employmentFormSlugs = STAFF_DOC_SLUGS.filter(
  (slug) => staffDocs[slug].audience === "admin"
);

export function isStaffDocSlug(value: string): value is StaffDocSlug {
  return STAFF_DOC_SLUGS.includes(value as StaffDocSlug);
}

export function staffDocsDirectory(): string {
  return path.join(process.cwd(), "content", "staff-docs");
}

export async function readStaffDoc(
  slug: StaffDocSlug
): Promise<{ bytes: Buffer; doc: StaffDoc } | { missing: true; doc: StaffDoc }> {
  const doc = staffDocs[slug];
  const filePath = path.join(staffDocsDirectory(), doc.file);

  try {
    const bytes = await readFile(filePath);
    if (bytes.length === 0) {
      return { missing: true, doc };
    }
    return { bytes, doc };
  } catch {
    return { missing: true, doc };
  }
}
