import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  DEFAULT_PCA_CERTIFICATE_EXPLANATION,
  DEFAULT_PCA_CERTIFICATE_EXPLANATIONS,
  PCA_CERTIFICATE_AGENCY,
  PCA_CERTIFICATE_PATHWAY_LABELS,
  PCA_CERTIFICATE_PRINT,
  defaultExplanationForPathway,
  explanationMatchesKnownDefault,
  formatCertificateDate,
  isPcaCertificatePathway,
  pcaCertificatePageMarginsIn,
  pcaCertificatePathwayLine,
  renderCertificateExplanation,
  todayIsoDate,
  validatePcaCertificate,
} from "@/lib/pca-certificate";

describe("PCA_CERTIFICATE_PRINT", () => {
  it("uses landscape letter and a centered paste-safe insert", () => {
    assert.equal(PCA_CERTIFICATE_PRINT.orientation, "landscape");
    assert.equal(PCA_CERTIFICATE_PRINT.pageWidthIn, 11);
    assert.equal(PCA_CERTIFICATE_PRINT.pageHeightIn, 8.5);
    assert.equal(PCA_CERTIFICATE_PRINT.blockWidthIn, 9.5);
    assert.equal(PCA_CERTIFICATE_PRINT.blockHeightIn, 6.5);
    assert.ok(
      PCA_CERTIFICATE_PRINT.blockWidthIn < PCA_CERTIFICATE_PRINT.pageWidthIn
    );
    assert.ok(
      PCA_CERTIFICATE_PRINT.blockHeightIn < PCA_CERTIFICATE_PRINT.pageHeightIn
    );
    assert.ok(
      PCA_CERTIFICATE_PRINT.innerClearWidthIn -
        PCA_CERTIFICATE_PRINT.blockWidthIn >=
        PCA_CERTIFICATE_PRINT.cutGuideClearanceIn
    );
    assert.ok(
      PCA_CERTIFICATE_PRINT.innerClearHeightIn -
        PCA_CERTIFICATE_PRINT.blockHeightIn >=
        PCA_CERTIFICATE_PRINT.cutGuideClearanceIn
    );
  });

  it("centers the insert with about 0.75–1.0 in margins", () => {
    const margins = pcaCertificatePageMarginsIn();
    assert.equal(margins.x, 0.75);
    assert.equal(margins.y, 1);
  });
});

describe("formatCertificateDate", () => {
  it("formats ISO dates without UTC day-shift", () => {
    assert.equal(formatCertificateDate("2026-01-01"), "January 1, 2026");
    assert.equal(formatCertificateDate("2026-12-31"), "December 31, 2026");
  });

  it("rejects empty or impossible dates", () => {
    assert.equal(formatCertificateDate(""), "");
    assert.equal(formatCertificateDate("2026-02-31"), "");
    assert.equal(formatCertificateDate("tomorrow"), "");
  });
});

describe("todayIsoDate", () => {
  it("uses the local calendar date", () => {
    assert.equal(todayIsoDate(new Date(2026, 8, 14)), "2026-09-14");
  });
});

describe("CFC pathways", () => {
  it("names the 20-hour class and the training waiver", () => {
    assert.equal(
      PCA_CERTIFICATE_PATHWAY_LABELS.training,
      "Completed the 20-hour CFC training class"
    );
    assert.equal(PCA_CERTIFICATE_PATHWAY_LABELS.waiver, "Waiver of training");
    assert.match(
      pcaCertificatePathwayLine("training").toLowerCase(),
      /20-hour/
    );
    assert.match(
      pcaCertificatePathwayLine("training").toLowerCase(),
      /community first choice/
    );
    assert.match(pcaCertificatePathwayLine("waiver").toLowerCase(), /waived/);
    assert.match(pcaCertificatePathwayLine("waiver").toLowerCase(), /cfc/);
  });

  it("seeds MT CFC defaults for each pathway", () => {
    for (const pathway of ["training", "waiver"] as const) {
      const copy = defaultExplanationForPathway(pathway).toLowerCase();
      assert.match(copy, /community first choice/);
      assert.match(copy, /cfc/);
      assert.match(copy, /personal care attendant/);
      assert.match(copy, /meadowlark home care/);
      assert.match(copy, /montana/);
      assert.doesNotMatch(copy, /hospice/);
      assert.doesNotMatch(copy, /skilled nursing/);
    }
    assert.match(
      DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.training.toLowerCase(),
      /20-hour/
    );
    assert.match(
      DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.waiver.toLowerCase(),
      /waived/
    );
    assert.equal(
      DEFAULT_PCA_CERTIFICATE_EXPLANATION,
      DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.training
    );
    assert.equal(PCA_CERTIFICATE_AGENCY, "Meadowlark Home Care");
  });

  it("detects known defaults so the form can swap pathway copy", () => {
    assert.equal(
      explanationMatchesKnownDefault(
        DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.training
      ),
      true
    );
    assert.equal(
      explanationMatchesKnownDefault(
        DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.waiver
      ),
      true
    );
    assert.equal(explanationMatchesKnownDefault("Custom sentence."), false);
  });

  it("accepts only the two pathway ids", () => {
    assert.equal(isPcaCertificatePathway("training"), true);
    assert.equal(isPcaCertificatePathway("waiver"), true);
    assert.equal(isPcaCertificatePathway("other"), false);
  });
});

describe("renderCertificateExplanation", () => {
  it("substitutes the employee name and keeps a fallback", () => {
    assert.equal(
      renderCertificateExplanation("Awarded to {name}.", "Jordan Lee"),
      "Awarded to Jordan Lee."
    );
    assert.equal(
      renderCertificateExplanation("Awarded to {name}.", "  "),
      "Awarded to the named caregiver."
    );
  });
});

describe("validatePcaCertificate", () => {
  it("accepts a complete training-pathway certificate", () => {
    const result = validatePcaCertificate({
      employeeName: " Jordan Lee ",
      certificationDate: "2026-09-14",
      supervisorName: " Natalie Redman ",
      pathway: "training",
      explanation: DEFAULT_PCA_CERTIFICATE_EXPLANATIONS.training,
    });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.value.employeeName, "Jordan Lee");
      assert.equal(result.value.pathway, "training");
    }
  });

  it("requires name, date, supervisor, pathway, and explanation", () => {
    const result = validatePcaCertificate({
      employeeName: "",
      certificationDate: "",
      supervisorName: "",
      pathway: "other" as never,
      explanation: "   ",
    });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.fieldErrors.employeeName);
      assert.ok(result.fieldErrors.certificationDate);
      assert.ok(result.fieldErrors.supervisorName);
      assert.ok(result.fieldErrors.pathway);
      assert.ok(result.fieldErrors.explanation);
    }
  });
});
