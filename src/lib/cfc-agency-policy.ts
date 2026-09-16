import { readFile } from "node:fs/promises";
import path from "node:path";

import { staffDocsDirectory } from "@/lib/staff-docs";

/**
 * Meadowlark’s working CFC Agency-Based policy set: seven section PDFs
 * from Business Docs. Served only through authenticated
 * `/staff/docs/cfc-policy/*` handlers — never Drive anyone-with-link URLs.
 *
 * `sourceDriveFileId` is the Business Docs file id used to place the
 * binary in this repo. Do not turn it into a public Drive href.
 */
export const CFC_AGENCY_POLICY_SOURCE_PAGE =
  "https://dphhs.mt.gov/SLTC/CFC-ABPolMan";

export const CFC_POLICY_DIRECTORY = "cfc-policy";

export const CFC_POLICY_SECTIONS = [
  {
    slug: "general-provisions-and-services",
    title: "General Provisions and Services",
    sourceDriveFileId: "1-3neffx2tzRPyBUXQh--JS8SHK6Umj1D",
  },
  {
    slug: "service-limitations",
    title: "Service Limitations",
    sourceDriveFileId: "1rDL2HzoCAmbScS4ZjKax7heApUqpJgJe",
  },
  {
    slug: "administrative-requirements",
    title: "Administrative Requirements",
    sourceDriveFileId: "1-9d87HRD26jjeeCOsx2FwmhtcNuMJ3Pm",
  },
  {
    slug: "agency-requirements",
    title: "Agency Requirements",
    sourceDriveFileId: "1-KQ49WkdWTmN80fVVOC46y4x1flv4K9O",
  },
  {
    slug: "general-utilization",
    title: "General Utilization",
    sourceDriveFileId: "1-J4At2VkbSREjQbAbTz8Y9NNDah_yVeU",
  },
  {
    slug: "medical-transportation",
    title: "Medical Transportation",
    sourceDriveFileId: "1-C-9Ivwkj72D-VNWsLVibQao6LuY1zvL",
  },
  {
    slug: "shopping-and-community-integration",
    title: "Shopping and Community Integration",
    sourceDriveFileId: "1-ENeENOO2Z1_cDfhuUmWukEInMeeHDit",
  },
] as const;

export type CfcPolicySection = (typeof CFC_POLICY_SECTIONS)[number];
export type CfcPolicySlug = CfcPolicySection["slug"];

export type CfcPolicyDoc = CfcPolicySection & {
  file: string;
  downloadName: string;
  href: string;
};

export function cfcPolicyFileName(slug: CfcPolicySlug): string {
  return `${slug}.pdf`;
}

export function cfcPolicyRelativeFile(slug: CfcPolicySlug): string {
  return `${CFC_POLICY_DIRECTORY}/${cfcPolicyFileName(slug)}`;
}

export function cfcPolicyDocHref(slug: CfcPolicySlug): string {
  return `/staff/docs/cfc-policy/${slug}`;
}

export function getCfcPolicyDoc(slug: CfcPolicySlug): CfcPolicyDoc {
  const section = CFC_POLICY_SECTIONS.find((item) => item.slug === slug);
  if (!section) {
    throw new Error(`Unknown CFC policy section: ${slug}`);
  }

  const downloadName = cfcPolicyFileName(section.slug);
  return {
    ...section,
    file: cfcPolicyRelativeFile(section.slug),
    downloadName,
    href: cfcPolicyDocHref(section.slug),
  };
}

export const cfcPolicyDocs: Record<CfcPolicySlug, CfcPolicyDoc> =
  Object.fromEntries(
    CFC_POLICY_SECTIONS.map((section) => [section.slug, getCfcPolicyDoc(section.slug)])
  ) as Record<CfcPolicySlug, CfcPolicyDoc>;

export function isCfcPolicySlug(value: string): value is CfcPolicySlug {
  return CFC_POLICY_SECTIONS.some((section) => section.slug === value);
}

export async function readCfcPolicyDoc(
  slug: CfcPolicySlug
): Promise<{ bytes: Buffer; doc: CfcPolicyDoc } | { missing: true; doc: CfcPolicyDoc }> {
  const doc = getCfcPolicyDoc(slug);
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
