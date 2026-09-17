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
});
