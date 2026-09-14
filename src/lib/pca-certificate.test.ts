import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  DEFAULT_PCA_CERTIFICATE_EXPLANATION,
  PCA_CERTIFICATE_AGENCY,
  PCA_CERTIFICATE_PRINT,
  formatCertificateDate,
  pcaCertificatePageMarginsIn,
  renderCertificateExplanation,
  todayIsoDate,
  validatePcaCertificate,
} from "@/lib/pca-certificate";

describe("PCA_CERTIFICATE_PRINT", () => {
  it("uses a letter page and a paste-safe insert smaller than the foil opening", () => {
    assert.equal(PCA_CERTIFICATE_PRINT.pageWidthIn, 8.5);
    assert.equal(PCA_CERTIFICATE_PRINT.pageHeightIn, 11);
    assert.equal(PCA_CERTIFICATE_PRINT.blockWidthIn, 5.75);
    assert.equal(PCA_CERTIFICATE_PRINT.blockHeightIn, 8);
    assert.ok(
      PCA_CERTIFICATE_PRINT.blockWidthIn <
        PCA_CERTIFICATE_PRINT.innerClearWidthIn
    );
    assert.ok(
      PCA_CERTIFICATE_PRINT.blockHeightIn <
        PCA_CERTIFICATE_PRINT.innerClearHeightIn
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

  it("centers the insert on letter paper", () => {
    const margins = pcaCertificatePageMarginsIn();
    assert.equal(margins.x, 1.375);
    assert.equal(margins.y, 1.5);
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

  it("default copy is home-care PCA language, not hospice or SNF marketing", () => {
    const copy = DEFAULT_PCA_CERTIFICATE_EXPLANATION.toLowerCase();
    assert.match(copy, /personal care attendant/);
    assert.match(copy, /meadowlark home care/);
    assert.match(copy, /montana/);
    assert.match(copy, /cfcs\/pcs/);
    assert.doesNotMatch(copy, /hospice/);
    assert.doesNotMatch(copy, /skilled nursing/);
    assert.equal(PCA_CERTIFICATE_AGENCY, "Meadowlark Home Care");
  });
});

describe("validatePcaCertificate", () => {
  it("accepts a complete certificate", () => {
    const result = validatePcaCertificate({
      employeeName: " Jordan Lee ",
      certificationDate: "2026-09-14",
      supervisorName: " Natalie Redman ",
      explanation: DEFAULT_PCA_CERTIFICATE_EXPLANATION,
    });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.value.employeeName, "Jordan Lee");
      assert.equal(result.value.supervisorName, "Natalie Redman");
    }
  });

  it("requires name, date, supervisor, and explanation", () => {
    const result = validatePcaCertificate({
      employeeName: "",
      certificationDate: "",
      supervisorName: "",
      explanation: "   ",
    });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.fieldErrors.employeeName);
      assert.ok(result.fieldErrors.certificationDate);
      assert.ok(result.fieldErrors.supervisorName);
      assert.ok(result.fieldErrors.explanation);
    }
  });
});
