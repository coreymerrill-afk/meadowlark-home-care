import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

const publicFiles = [
  "src/app/page.tsx",
  "src/app/services/page.tsx",
  "src/app/about/page.tsx",
  "src/app/apply/page.tsx",
  "src/app/work-with-us/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/layout.tsx",
  "src/lib/services.ts",
  "src/lib/site.ts",
  "src/components/apply-openings.tsx",
  "src/components/cta-band.tsx",
  "src/components/page-hero.tsx",
  "src/components/site-header.tsx",
  "src/components/site-footer.tsx",
] as const;

const forbidden = /\bDD\b|Developmental Disabilities|live-in/i;

function read(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("public copy constraints", () => {
  it("does not mention DD, Developmental Disabilities, or live-in care", () => {
    for (const file of publicFiles) {
      const text = read(file);
      const match = text.match(forbidden);
      assert.equal(
        match,
        null,
        `${file} still contains forbidden copy: ${match?.[0] ?? ""}`
      );
    }
  });

  it("shows PCCA and HCBS on Home, Services, and About", () => {
    const pages = {
      home: read("src/app/page.tsx") + read("src/lib/services.ts"),
      services: read("src/app/services/page.tsx") + read("src/lib/services.ts"),
      about: read("src/app/about/page.tsx"),
    };

    for (const [name, text] of Object.entries(pages)) {
      assert.match(text, /PCCA/, `${name} is missing PCCA`);
      assert.match(text, /HCBS/, `${name} is missing HCBS`);
    }
  });

  it("keeps Quill’s locked public strings verbatim", () => {
    const services = read("src/lib/services.ts");
    const about = read("src/app/about/page.tsx");
    const home = read("src/app/page.tsx");
    const apply = read("src/app/apply/page.tsx");
    const site = read("src/lib/site.ts");

    assert.match(services, /chip: "HCBS Big Sky \/ SDMI"/);
    assert.match(
      services,
      /Meadowlark serves members on Montana HCBS waivers—including Big Sky and SDMI—for authorized supports such as social supervision, homemaker services, specially trained attendants, and habilitation aide help. Some waivers have wait lists. The state handles eligibility; we deliver what is on your approved plan./
    );
    assert.match(about, /HCBS Big Sky and SDMI waiver supports/);
    assert.match(
      services,
      /Not on Medicaid or VA\? Meadowlark offers private pay and works with third-party insurance for non-skilled home care—companion support and outings, personal assistance, and respite./
    );
    assert.match(services, /title: "Private pay & insurance"/);
    assert.deepEqual(
      ["Companion support", "Personal assistance", "Respite"],
      JSON.parse(
        services.match(/bullets: (\[[^\]]+\])/)?.[1] ?? "null"
      )
    );
    assert.match(services, /title: "Pediatric Complex Care Assistant \(PCCA\)"/);
    assert.match(
      services,
      /Meadowlark is an approved PCCA provider agency. PCCA helps Montana Medicaid members under 21 with complex medical needs by employing licensed family caregivers to deliver physician-ordered care at home. The state decides eligibility and prior authorization; we coordinate as the provider agency./
    );
    assert.match(services, /label: "Learn more \(DPHHS\)"/);
    assert.match(site, /pcca: "https:\/\/dphhs\.mt\.gov\/sltc\/csb\/PCCA"/);
    assert.match(
      home,
      /CFCS\/PCS and HCBS waivers \(Big Sky and SDMI\), VA Community Care, private pay, and PCCA\./
    );
    assert.match(
      apply,
      /Caregiver or nurse roles in Missoula and Great Falls. Pick a role and office below\./
    );
  });
});
