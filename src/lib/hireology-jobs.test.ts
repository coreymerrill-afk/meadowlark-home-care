import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  describeApplyRole,
  findHireologyRole,
  getHireologyJobsFile,
  getHireologyRoles,
  hireologyStartingWage,
  mapHireologyTitleToPosition,
  positionFromApplyQuery,
} from "@/lib/hireology-jobs";

describe("mapHireologyTitleToPosition", () => {
  it("maps PCA/CNA titles to Caregiver", () => {
    assert.equal(mapHireologyTitleToPosition("PCA/CNA Needed"), "Caregiver");
    assert.equal(mapHireologyTitleToPosition("PCA/CNA Home Care"), "Caregiver");
    assert.equal(mapHireologyTitleToPosition("PCA/CNA (Caregiver)"), "Caregiver");
  });

  it("maps LPN/RN titles to Nurse", () => {
    assert.equal(
      mapHireologyTitleToPosition("LPN/RN Needed (Part-Time/Full-Time)"),
      "Nurse"
    );
    assert.equal(mapHireologyTitleToPosition("LPN/RN (Nurse)"), "Nurse");
  });

  it("does not invent a mapping for unrelated titles", () => {
    assert.equal(mapHireologyTitleToPosition("Warehouse Associate"), null);
  });
});

describe("checked-in generic Hireology roles", () => {
  const file = getHireologyJobsFile();
  const roles = getHireologyRoles();

  it("only includes the two generic role descriptions", () => {
    assert.equal(roles.length, 2);
    assert.match(file.source, /hireology\.com\/meadowlarkhomecare3/);
    assert.equal(file.careersUrl, "https://careers.hireology.com/meadowlarkhomecare3");
    assert.deepEqual(
      roles.map((role) => [role.id, role.title, role.position]),
      [
        ["pca-cna", "PCA/CNA (Caregiver)", "Caregiver"],
        ["lpn-rn", "LPN/RN (Nurse)", "Nurse"],
      ]
    );
    for (const role of roles) {
      assert.match(role.location, /Missoula/);
      assert.match(role.location, /Great Falls/);
      assert.ok(role.summary.trim().length > 80);
    }
  });

  it("keeps the caregiver starting wage at $19.75/hour", () => {
    assert.equal(hireologyStartingWage(), "$19.75/hour");
    const caregiver = findHireologyRole("pca-cna");
    assert.ok(caregiver);
    assert.match(caregiver.summary, /\$19\.75\/hour/);
    assert.doesNotMatch(caregiver.summary, /\$19\.25|\$18\.75/);
  });

  it("generalizes the real PCA/CNA Hireology content", () => {
    const caregiver = findHireologyRole("pca-cna");
    assert.ok(caregiver);
    assert.match(caregiver.summary, /activities of daily living|ADLs/);
    assert.match(caregiver.summary, /bathing/);
    assert.match(caregiver.summary, /CNA or PCA/);
    assert.match(caregiver.summary, /50 lb/);
    assert.match(caregiver.summary, /Friday/);
  });

  it("generalizes the real LPN/RN Hireology content", () => {
    const nurse = findHireologyRole("lpn-rn");
    assert.ok(nurse);
    assert.doesNotMatch(nurse.summary, /\$19\.25|\$18\.75/);
    assert.match(nurse.summary, /shift work/);
    assert.match(nurse.summary, /4–12 hours/);
    assert.match(nurse.summary, /medication management/);
    assert.match(nurse.summary, /bowel-care/);
    assert.match(nurse.summary, /foot care/);
    assert.match(nurse.summary, /RN or LPN/);
  });

  it("resolves apply query params to Caregiver or Nurse", () => {
    assert.equal(positionFromApplyQuery("pca-cna"), "Caregiver");
    assert.equal(positionFromApplyQuery("lpn-rn"), "Nurse");
    assert.equal(positionFromApplyQuery("Caregiver"), "Caregiver");
    assert.equal(positionFromApplyQuery("2568343"), undefined);
  });

  it("describes the selected role for HR email", () => {
    assert.deepEqual(describeApplyRole("Caregiver"), {
      title: "PCA/CNA (Caregiver)",
      url: file.careersUrl,
    });
    assert.deepEqual(describeApplyRole("Nurse"), {
      title: "LPN/RN (Nurse)",
      url: file.careersUrl,
    });
  });
});
