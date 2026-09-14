/**
 * PCA certificate print insert for gold-foil US Letter paper.
 *
 * The ornate border is physical stationery — this tool only prints the
 * inner text block. Measured inner clear area is about 6.0" × 8.25".
 * The safer default block is 5.75" × 8.0", centered, leaving ~0.125"
 * clearance so the cutout pastes inside the foil without covering it.
 *
 * Tweak `blockWidthIn` / `blockHeightIn` if a paper batch has a tighter
 * or wider frame. Keep both smaller than the inner clear area.
 */
export const PCA_CERTIFICATE_PRINT = {
  pageWidthIn: 8.5,
  pageHeightIn: 11,
  blockWidthIn: 5.75,
  blockHeightIn: 8,
  innerClearWidthIn: 6,
  innerClearHeightIn: 8.25,
  cutGuideClearanceIn: 0.125,
} as const;

export const PCA_CERTIFICATE_AGENCY = "Meadowlark Home Care";

export const PCA_CERTIFICATE_TITLE = "Personal Care Attendant";

export const PCA_CERTIFICATE_NAME_TOKEN = "{name}";

export const DEFAULT_PCA_CERTIFICATE_EXPLANATION = `This certificate recognizes that ${PCA_CERTIFICATE_NAME_TOKEN} has demonstrated the knowledge and competency Meadowlark Home Care expects of a Personal Care Attendant. It is a mark of trust — readiness to provide personal care and community support (CFCS/PCS) with dignity, reliability, and respect for the people we serve in their Montana homes.`;

export type PcaCertificateFields = {
  employeeName: string;
  certificationDate: string;
  supervisorName: string;
  explanation: string;
};

export type PcaCertificateFieldErrors = Partial<
  Record<keyof PcaCertificateFields, string>
>;

export function pcaCertificatePageMarginsIn(): { x: number; y: number } {
  return {
    x:
      (PCA_CERTIFICATE_PRINT.pageWidthIn - PCA_CERTIFICATE_PRINT.blockWidthIn) /
      2,
    y:
      (PCA_CERTIFICATE_PRINT.pageHeightIn -
        PCA_CERTIFICATE_PRINT.blockHeightIn) /
      2,
  };
}

export function pcaCertificatePrintStyleVars(): Record<string, string> {
  const margins = pcaCertificatePageMarginsIn();
  return {
    "--pca-page-width": `${PCA_CERTIFICATE_PRINT.pageWidthIn}in`,
    "--pca-page-height": `${PCA_CERTIFICATE_PRINT.pageHeightIn}in`,
    "--pca-block-width": `${PCA_CERTIFICATE_PRINT.blockWidthIn}in`,
    "--pca-block-height": `${PCA_CERTIFICATE_PRINT.blockHeightIn}in`,
    "--pca-page-margin-x": `${margins.x}in`,
    "--pca-page-margin-y": `${margins.y}in`,
  };
}

export function todayIsoDate(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatCertificateDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) {
    return "";
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function renderCertificateExplanation(
  template: string,
  employeeName: string
): string {
  const name = employeeName.trim() || "the named caregiver";
  return template.replaceAll(PCA_CERTIFICATE_NAME_TOKEN, name);
}

export function validatePcaCertificate(
  fields: PcaCertificateFields
):
  | { ok: true; value: PcaCertificateFields }
  | { ok: false; fieldErrors: PcaCertificateFieldErrors } {
  const employeeName = fields.employeeName.trim();
  const certificationDate = fields.certificationDate.trim();
  const supervisorName = fields.supervisorName.trim();
  const explanation = fields.explanation.trim();
  const fieldErrors: PcaCertificateFieldErrors = {};

  if (!employeeName) {
    fieldErrors.employeeName = "Enter the employee’s name.";
  }
  if (!certificationDate || !formatCertificateDate(certificationDate)) {
    fieldErrors.certificationDate = "Choose a valid certification date.";
  }
  if (!supervisorName) {
    fieldErrors.supervisorName = "Enter the nurse supervisor’s name.";
  }
  if (!explanation) {
    fieldErrors.explanation = "Add a short certificate explanation.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      employeeName,
      certificationDate,
      supervisorName,
      explanation,
    },
  };
}
