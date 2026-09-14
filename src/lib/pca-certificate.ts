import { assertNever } from "@/lib/site";

/**
 * PCA certificate print insert for gold-foil US Letter paper.
 *
 * Print is landscape (11″ × 8.5″). The ornate border is physical
 * stationery — this tool only prints the inner text block.
 *
 * Default cutout: 9.5″ × 6.5″, centered (0.75″ side margins, 1.0″
 * top/bottom). That assumes landscape-oriented foil, or a landscape
 * paste onto a landscape sheet. If you rotate the original portrait
 * foil (inner ~8.25″ × 6.0″), shrink `blockWidthIn` / `blockHeightIn`
 * to about 8.0″ × 5.75″ so the cutout still clears the gold frame.
 *
 * Tweak those two numbers if a paper batch has a tighter or wider
 * frame. Keep both smaller than the page, with a little paste clearance.
 */
export const PCA_CERTIFICATE_PRINT = {
  orientation: "landscape",
  pageWidthIn: 11,
  pageHeightIn: 8.5,
  blockWidthIn: 9.5,
  blockHeightIn: 6.5,
  innerClearWidthIn: 10,
  innerClearHeightIn: 7,
  cutGuideClearanceIn: 0.25,
} as const;

export const PCA_CERTIFICATE_AGENCY = "Meadowlark Home Care";

export const PCA_CERTIFICATE_TITLE = "Personal Care Attendant";

export const PCA_CERTIFICATE_PROGRAM = "Montana Community First Choice (CFC)";

export const PCA_CERTIFICATE_NAME_TOKEN = "{name}";

export const PCA_CERTIFICATE_PATHWAYS = ["training", "waiver"] as const;

export type PcaCertificatePathway = (typeof PCA_CERTIFICATE_PATHWAYS)[number];

export const PCA_CERTIFICATE_PATHWAY_LABELS = {
  training: "Completed the 20-hour CFC training class",
  waiver: "Waiver of training",
} as const;

export const DEFAULT_PCA_CERTIFICATE_EXPLANATIONS = {
  training: `This certificate records that ${PCA_CERTIFICATE_NAME_TOKEN} completed Montana’s 20-hour Community First Choice (CFC) personal care attendant training for Meadowlark Home Care. It recognizes readiness to provide CFC personal care in Montana homes with dignity and reliability.`,
  waiver: `This certificate records that ${PCA_CERTIFICATE_NAME_TOKEN} is recognized as a Personal Care Attendant for Montana’s Community First Choice (CFC) program at Meadowlark Home Care. The 20-hour CFC training class is waived per program rules.`,
} as const;

/** Default body for the 20-hour CFC class pathway. */
export const DEFAULT_PCA_CERTIFICATE_EXPLANATION =
  DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.training;

export type PcaCertificateFields = {
  employeeName: string;
  certificationDate: string;
  supervisorName: string;
  pathway: PcaCertificatePathway;
  explanation: string;
};

export type PcaCertificateFieldErrors = Partial<
  Record<keyof PcaCertificateFields, string>
>;

export function isPcaCertificatePathway(
  value: string
): value is PcaCertificatePathway {
  return (PCA_CERTIFICATE_PATHWAYS as readonly string[]).includes(value);
}

export function pcaCertificatePathwayLine(
  pathway: PcaCertificatePathway
): string {
  switch (pathway) {
    case "training":
      return "Completed Montana’s 20-hour Community First Choice (CFC) personal care attendant training.";
    case "waiver":
      return "Montana Community First Choice (CFC) training waived per program rules.";
    default:
      return assertNever(pathway);
  }
}

export function defaultExplanationForPathway(
  pathway: PcaCertificatePathway
): string {
  switch (pathway) {
    case "training":
      return DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.training;
    case "waiver":
      return DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.waiver;
    default:
      return assertNever(pathway);
  }
}

export function explanationMatchesKnownDefault(value: string): boolean {
  return (
    PCA_CERTIFICATE_PATHWAYS as readonly PcaCertificatePathway[]
  ).some((pathway) => defaultExplanationForPathway(pathway) === value);
}

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
  if (!isPcaCertificatePathway(fields.pathway)) {
    fieldErrors.pathway = "Choose the CFC training pathway.";
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
      pathway: fields.pathway,
      explanation,
    },
  };
}
