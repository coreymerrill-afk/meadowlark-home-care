import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import {
  eligibilityContactLabel,
  servicesContactCluster,
} from "@/lib/services";
import { site } from "@/lib/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("servicesContactCluster", () => {
  it("lists service type first, then agency, then the confirmed number", () => {
    assert.deepEqual(
      servicesContactCluster.map((contact) => eligibilityContactLabel(contact)),
      [
        "Medicaid applications — Office of Public Assistance — 1-888-706-1535",
        "CFCS/PCS referrals — Mountain Pacific — 1-800-219-7035",
        "HCBS waiver screening — Mountain Pacific — 1-800-497-8232",
        "Community Care consult questions — VA Montana Community Care Consult Call Center — 406-447-7400",
      ]
    );
  });

  it("keeps Office of Public Assistance as the Medicaid applications number", () => {
    const opa = servicesContactCluster.find(
      (contact) => contact.org === "Office of Public Assistance"
    );

    assert.ok(opa);
    assert.equal(opa.role, "Medicaid applications");
    assert.equal(opa.phone, "1-888-706-1535");
    assert.equal(opa.href, site.opaPhoneHref);
  });

  it("keeps CFCS/PCS referrals and HCBS waiver screening on separate Mountain Pacific lines", () => {
    const mountainPacific = servicesContactCluster.filter(
      (contact) => contact.org === "Mountain Pacific"
    );

    assert.equal(mountainPacific.length, 2);
    assert.equal(mountainPacific[0]?.role, "CFCS/PCS referrals");
    assert.equal(mountainPacific[0]?.phone, "1-800-219-7035");
    assert.equal(
      mountainPacific[0]?.href,
      site.mountainPacific.cfcsAssessment.href
    );
    assert.equal(mountainPacific[1]?.role, "HCBS waiver screening");
    assert.equal(mountainPacific[1]?.phone, "1-800-497-8232");
    assert.equal(
      mountainPacific[1]?.href,
      site.mountainPacific.waiverScreening.href
    );
  });

  it("drops the Helena local when the HCBS waiver 800 exists", () => {
    const phones = servicesContactCluster.map((contact) => contact.phone);
    const siteSource = readFileSync(join(root, "src/lib/site.ts"), "utf8");

    assert.equal(phones.filter((phone) => phone.includes("497-8232")).length, 1);
    assert.ok(!phones.some((phone) => phone.includes("443-4020")));
    assert.doesNotMatch(siteSource, /443-4020/);
    assert.doesNotMatch(siteSource, /Helena/);
    assert.equal(site.mountainPacific.waiverScreening.label, "1-800-497-8232");
  });

  it("adds only the confirmed VA Montana Community Care consult number", () => {
    const vaContacts = servicesContactCluster.filter((contact) =>
      /\bVA\b/.test(contact.org)
    );

    const va = vaContacts[0];
    assert.ok(va);
    assert.equal(vaContacts.length, 1);
    assert.equal(
      eligibilityContactLabel(va),
      "Community Care consult questions — VA Montana Community Care Consult Call Center — 406-447-7400"
    );
    assert.equal(va.href, "tel:+14064477400");
    assert.equal(va.href, site.vaMontanaCommunityCare.href);
    assert.equal(va.role, "Community Care consult questions");
  });

  it("explains one number per role on Services without a second waiver line", () => {
    const servicesPage = readFileSync(
      join(root, "src/app/services/page.tsx"),
      "utf8"
    );

    assert.match(servicesPage, /Each line is for a different role/);
    assert.match(servicesPage, /Medicaid applications/);
    assert.match(servicesPage, /CFCS\/PCS/);
    assert.match(servicesPage, /referrals/);
    assert.match(servicesPage, /HCBS waiver screening/);
    assert.match(servicesPage, /Community Care consult/);
    assert.match(servicesPage, /\{contact\.role\}/);
    assert.match(servicesPage, /\{contact\.org\}/);
    assert.doesNotMatch(servicesPage, /Helena/);
    assert.doesNotMatch(servicesPage, /443-4020/);
    assert.doesNotMatch(
      servicesPage,
      /Medicaid and waiver screening numbers/
    );
    assert.doesNotMatch(
      servicesPage,
      /Mountain Pacific has separate numbers/
    );
  });
});
