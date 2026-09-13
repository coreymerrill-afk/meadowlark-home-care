import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { applySchema, formatApplyEmail } from "@/lib/apply";
import {
  GENERAL_HIREOLOGY_JOB_ID,
  getHireologyJobs,
} from "@/lib/hireology-jobs";
import { applyPositionOptions } from "@/lib/site";

const caregiverJob = getHireologyJobs().find(
  (job) => job.position === "Caregiver"
);
const nurseJob = getHireologyJobs().find((job) => job.position === "Nurse");

function validInput(overrides: Record<string, unknown> = {}) {
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "406-555-0100",
    office: "Missoula",
    hireologyJobId: caregiverJob?.id ?? GENERAL_HIREOLOGY_JOB_ID,
    position: "Caregiver",
    availability: "Part-time",
    availabilityNotes: "Weekends",
    experience: "1–2 years",
    licenseAndTransport: "Yes",
    eligibleToWork: "Yes",
    job1Employer: "Valley Home Care",
    job1Title: "CNA",
    job1When: "2023–2025",
    job1Duties: "Personal care and meal prep",
    ref1Name: "Alex Rivera",
    ref1Relationship: "Supervisor",
    ref1Contact: "alex@example.com",
    consent: "on",
    ...overrides,
  };
}

describe("applyPositionOptions", () => {
  it("only offers Caregiver and Nurse", () => {
    assert.deepEqual([...applyPositionOptions], ["Caregiver", "Nurse"]);
  });
});

describe("applySchema", () => {
  it("accepts a complete caregiver application", () => {
    const parsed = applySchema.safeParse(validInput());
    assert.equal(parsed.success, true);
  });

  it("accepts Nurse as a position", () => {
    const parsed = applySchema.safeParse(
      validInput({
        hireologyJobId: nurseJob?.id ?? GENERAL_HIREOLOGY_JOB_ID,
        position: "Nurse",
        certifications: "RN 12345",
      })
    );
    assert.equal(parsed.success, true);
  });

  it("rejects Office and Other positions", () => {
    for (const position of ["Office", "Other"]) {
      const parsed = applySchema.safeParse(validInput({ position }));
      assert.equal(parsed.success, false);
    }
  });

  it("requires a current opening or a general application", () => {
    const parsed = applySchema.safeParse(
      validInput({ hireologyJobId: "not-a-real-job" })
    );
    assert.equal(parsed.success, false);
    if (!parsed.success) {
      assert.equal(parsed.error.issues[0]?.path[0], "hireologyJobId");
    }
  });

  it("allows a general application", () => {
    const parsed = applySchema.safeParse(
      validInput({ hireologyJobId: GENERAL_HIREOLOGY_JOB_ID })
    );
    assert.equal(parsed.success, true);
  });

  it("requires recent work unless experience is None yet", () => {
    const parsed = applySchema.safeParse(
      validInput({
        job1Employer: undefined,
        job1Title: undefined,
        job1When: undefined,
        job1Duties: undefined,
      })
    );
    assert.equal(parsed.success, false);
  });

  it("skips recent work when experience is None yet", () => {
    const parsed = applySchema.safeParse(
      validInput({
        experience: "None yet",
        job1Employer: undefined,
        job1Title: undefined,
        job1When: undefined,
        job1Duties: undefined,
      })
    );
    assert.equal(parsed.success, true);
  });

  it("requires a reference name and phone or email", () => {
    const parsed = applySchema.safeParse(
      validInput({ ref1Name: undefined, ref1Contact: undefined })
    );
    assert.equal(parsed.success, false);
  });

  it("rejects a second reference that is only partly filled", () => {
    const parsed = applySchema.safeParse(
      validInput({ ref2Name: "Sam Lee", ref2Contact: undefined })
    );
    assert.equal(parsed.success, false);
  });
});

describe("formatApplyEmail", () => {
  it("labels new fields and includes the Hireology listing URL", () => {
    const parsed = applySchema.parse(validInput());
    const email = formatApplyEmail(parsed);

    assert.match(email.subject, /Jane Doe/);
    assert.match(email.subject, /Missoula/);
    assert.match(email.text, /Opening:/);
    assert.match(email.text, /Hireology listing:/);
    assert.match(email.text, /Most recent job/i);
    assert.match(email.text, /Valley Home Care/);
    assert.match(email.text, /Reference 1/i);
    assert.match(email.text, /Alex Rivera/);
    assert.match(email.text, /Other notes:/);
    assert.doesNotMatch(email.text, /Why Meadowlark/);

    if (caregiverJob) {
      assert.match(email.text, new RegExp(caregiverJob.title));
      assert.match(email.text, new RegExp(caregiverJob.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      assert.match(email.html, new RegExp(caregiverJob.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });

  it("uses a general-application label when no listing is selected", () => {
    const parsed = applySchema.parse(
      validInput({ hireologyJobId: GENERAL_HIREOLOGY_JOB_ID })
    );
    const email = formatApplyEmail(parsed);
    assert.match(email.text, /General application \(no specific listing\)/);
    assert.match(email.text, /careers\.hireology\.com\/meadowlarkhomecare3/);
  });
});
