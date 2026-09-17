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
  it("keeps Office of Public Assistance as the Medicaid applications number", () => {
    const opa = servicesContactCluster.find(
      (contact) => contact.org === "Office of Public Assistance"
    );

    assert.ok(opa);
    assert.equal(opa.phone, "1-888-706-1535");
    assert.equal(opa.href, site.opaPhoneHref);
    assert.match(opa.role, /Medicaid applications/i);
  });

  it("labels each Mountain Pacific number by role", () => {
    const mountainPacific = servicesContactCluster.filter(
      (contact) => contact.org === "Mountain Pacific"
    );

    assert.equal(mountainPacific.length, 3);
    assert.deepEqual(
      mountainPacific.map((contact) => eligibilityContactLabel(contact)),
      [
        "Mountain Pacific — CFCS/PCS referrals 1-800-219-7035",
        "Mountain Pacific — HCBS waiver screening 1-800-497-8232",
        "Mountain Pacific — HCBS waiver screening (Helena) 406-443-4020",
      ]
    );
    assert.equal(
      mountainPacific[0]?.href,
      site.mountainPacific.cfcsAssessment.href
    );
    assert.equal(
      mountainPacific[1]?.href,
      site.mountainPacific.waiverScreening[0].href
    );
    assert.equal(
      mountainPacific[2]?.href,
      site.mountainPacific.waiverScreening[1].href
    );
  });

  it("adds only the confirmed VA Montana Community Care consult number", () => {
    const vaContacts = servicesContactCluster.filter((contact) =>
      /\bVA\b/.test(contact.org)
    );

    const va = vaContacts[0];
    assert.ok(va);
    assert.equal(
      eligibilityContactLabel(va),
      "VA Montana Community Care Consult Call Center — Community Care consult questions 406-447-7400"
    );
    assert.equal(va.href, "tel:+14064477400");
    assert.equal(va.href, site.vaMontanaCommunityCare.href);
    assert.equal(va.role, "Community Care consult questions");
  });

  it("explains the Medicaid vs VA split on Services", () => {
    const servicesPage = readFileSync(
      join(root, "src/app/services/page.tsx"),
      "utf8"
    );

    assert.match(servicesPage, /Medicaid applications and/);
    assert.match(servicesPage, /eligibility questions/);
    assert.match(servicesPage, /separate numbers for/);
    assert.match(servicesPage, /CFCS\/PCS referrals/);
    assert.match(servicesPage, /HCBS waiver screening/);
    assert.match(servicesPage, /VA Community Care/);
    assert.match(servicesPage, /Consult Call Center/);
    assert.doesNotMatch(
      servicesPage,
      /Medicaid and waiver screening numbers/
    );
  });
});
