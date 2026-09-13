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

  it("only includes real Hireology listing URLs", () => {
    assert.ok(jobs.length > 0);
    assert.match(file.source, /api\.hireology\.com/);
    for (const job of jobs) {
      assert.match(
        job.url,
        /^https:\/\/careers\.hireology\.com\/meadowlarkhomecare3\/\d+\/description$/
      );
      assert.ok(job.title.trim());
      assert.ok(job.location.trim());
      assert.ok(job.summary.trim());
      assert.ok(isHireologyJobId(job.id, jobs));
    }
  });

  it("maps current listings to Caregiver or Nurse", () => {
    for (const job of jobs) {
      assert.ok(job.position === "Caregiver" || job.position === "Nurse");
    }
  });
});
