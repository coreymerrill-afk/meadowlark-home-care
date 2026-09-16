import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  CFC_AGENCY_POLICY_SOURCE_PAGE,
  CFC_POLICY_DIRECTORY,
  CFC_POLICY_SECTIONS,
  cfcPolicyDocHref,
  cfcPolicyDocs,
  cfcPolicyFileName,
  cfcPolicyRelativeFile,
  getCfcPolicyDoc,
  isCfcPolicySlug,
} from "@/lib/cfc-agency-policy";

describe("CFC_POLICY_SECTIONS", () => {
  it("is the seven Meadowlark Business Docs sections in the agreed order", () => {
    assert.deepEqual(
      CFC_POLICY_SECTIONS.map((section) => section.slug),
      [
        "general-provisions-and-services",
        "service-limitations",
        "administrative-requirements",
        "agency-requirements",
        "general-utilization",
        "medical-transportation",
        "shopping-and-community-integration",
      ]
    );
    assert.equal(CFC_POLICY_SECTIONS.length, 7);
  });

  it("maps each section to a kebab-case PDF under content/staff-docs/cfc-policy/", () => {
    for (const section of CFC_POLICY_SECTIONS) {
      const doc = getCfcPolicyDoc(section.slug);
      assert.equal(doc.downloadName, `${section.slug}.pdf`);
      assert.equal(doc.file, `${CFC_POLICY_DIRECTORY}/${section.slug}.pdf`);
      assert.equal(cfcPolicyFileName(section.slug), `${section.slug}.pdf`);
      assert.equal(
        cfcPolicyRelativeFile(section.slug),
        `${CFC_POLICY_DIRECTORY}/${section.slug}.pdf`
      );
    }
  });

  it("serves PDFs through authenticated staff doc routes, not Drive links", () => {
    for (const section of CFC_POLICY_SECTIONS) {
      const href = cfcPolicyDocHref(section.slug);
      assert.equal(href, `/staff/docs/cfc-policy/${section.slug}`);
      assert.ok(href.startsWith("/staff/docs/cfc-policy/"));
      assert.equal(cfcPolicyDocs[section.slug].href, href);
      assert.match(section.sourceDriveFileId, /^[\w-]+$/);
    }

    const serialized = JSON.stringify(cfcPolicyDocs);
    assert.doesNotMatch(serialized, /drive\.google\.com/);
    assert.doesNotMatch(serialized, /\/file\/d\//);
  });

  it("keeps the official DPHHS manual as a reference URL only", () => {
    assert.equal(
      CFC_AGENCY_POLICY_SOURCE_PAGE,
      "https://dphhs.mt.gov/SLTC/CFC-ABPolMan"
    );
  });

  it("narrows known slugs", () => {
    assert.equal(isCfcPolicySlug("agency-requirements"), true);
    assert.equal(isCfcPolicySlug("cfc-policy"), false);
    assert.equal(isCfcPolicySlug("handbook"), false);
  });
});
