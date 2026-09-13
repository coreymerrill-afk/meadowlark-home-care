import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getHireologyJobs,
  getHireologyJobsFile,
  isHireologyJobId,
  mapHireologyTitleToPosition,
} from "@/lib/hireology-jobs";

describe("mapHireologyTitleToPosition", () => {
  it("maps PCA/CNA titles to Caregiver", () => {
    assert.equal(mapHireologyTitleToPosition("PCA/CNA Needed"), "Caregiver");
    assert.equal(mapHireologyTitleToPosition("PCA/CNA Home Care"), "Caregiver");
  });

  it("maps LPN/RN titles to Nurse", () => {
    assert.equal(
      mapHireologyTitleToPosition("LPN/RN Needed (Part-Time/Full-Time)"),
      "Nurse"
    );
  });

  it("does not invent a mapping for unrelated titles", () => {
    assert.equal(mapHireologyTitleToPosition("Warehouse Associate"), null);
  });
});

describe("checked-in Hireology jobs", () => {
  const file = getHireologyJobsFile();
  const jobs = getHireologyJobs();

  it("only includes the live Hireology listings, with no extras", () => {
    const expected = [
      ["2568343", "PCA/CNA Needed", "Missoula, MT", "Caregiver"],
      ["2492230", "PCA/CNA Needed Home Care", "Missoula, MT", "Caregiver"],
      ["2492229", "PCA/CNA Home Care", "Great Falls, MT", "Caregiver"],
      [
        "2492228",
        "LPN/RN Needed (Part-Time/Full-Time)",
        "Missoula, MT",
        "Nurse",
      ],
      ["2492227", "PCA/CNA Needed", "Missoula, MT", "Caregiver"],
      [
        "508576",
        "LPN/RN Needed (Part-Time/Full-Time)",
        "Great Falls, MT",
        "Nurse",
      ],
    ] as const;

    assert.equal(jobs.length, expected.length);
    assert.match(file.source, /hireology\.com\/meadowlarkhomecare3/);
    assert.deepEqual(
      jobs.map((job) => [job.id, job.title, job.location, job.position]),
      expected.map((row) => [...row])
    );
    for (const job of jobs) {
      assert.equal(
        job.url,
        `https://careers.hireology.com/meadowlarkhomecare3/${job.id}/description`
      );
      assert.ok(job.summary.trim().length > 80);
      assert.ok(isHireologyJobId(job.id, jobs));
    }
  });

  it("maps current listings to Caregiver or Nurse", () => {
    for (const job of jobs) {
      assert.ok(job.position === "Caregiver" || job.position === "Nurse");
    }
  });

  it("keeps the curated 2026-09-13 summaries", () => {
    const byId = Object.fromEntries(jobs.map((job) => [job.id, job.summary]));
    assert.match(byId["2568343"], /\$19\.25\/hour/);
    assert.match(byId["2568343"], /Friday-Sunday/);
    assert.match(byId["2492230"], /Full-time listing/);
    assert.match(byId["2492229"], /Great Falls|Friday-Sunday|\$19\.25/);
    assert.match(byId["2492228"], /primarily shift work/);
    assert.match(byId["2492227"], /\$18\.75\/hour/);
    assert.match(byId["508576"], /4-12 hours/);
    assert.match(byId["508576"], /bowel-care/);
  });
});
