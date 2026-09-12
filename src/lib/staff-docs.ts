import { readFile } from "node:fs/promises";
import path from "node:path";

export const STAFF_DOC_SLUGS = [
  "handbook",
  "hipaa",
  "axiscare-guide",
  "axiscare-tip-sheet",
] as const;

export type StaffDocSlug = (typeof STAFF_DOC_SLUGS)[number];

export type StaffDoc = {
  slug: StaffDocSlug;
  file: string;
  downloadName: string;
  title: string;
};

export const staffDocs: Record<StaffDocSlug, StaffDoc> = {
  handbook: {
    slug: "handbook",
    file: "employee-handbook.pdf",
    downloadName: "employee-handbook.pdf",
    title: "Employee Handbook",
  },
  hipaa: {
    slug: "hipaa",
    file: "hipaa-confidentiality-agreement.pdf",
    downloadName: "hipaa-confidentiality-agreement.pdf",
    title: "HIPAA Confidentiality Agreement",
  },
  "axiscare-guide": {
    slug: "axiscare-guide",
    file: "axiscare-mobile-caregiver-guide.pdf",
    downloadName: "axiscare-mobile-caregiver-guide.pdf",
    title: "AxisCare Mobile Caregiver Guide",
  },
  "axiscare-tip-sheet": {
    slug: "axiscare-tip-sheet",
    file: "axiscare-tip-sheet.pdf",
    downloadName: "axiscare-tip-sheet.pdf",
    title: "AxisCare tip sheet",
  },
};

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
