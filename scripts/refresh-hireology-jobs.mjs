#!/usr/bin/env node
/**
 * Print live Hireology openings for comparison with the curated generic roles.
 * Does not overwrite src/data/hireology-jobs.json. See docs/hireology-jobs.md.
 */

const CAREERS_SLUG = "meadowlarkhomecare3";
const SOURCE = `https://api.hireology.com/v2/public/careers/${CAREERS_SLUG}`;

function mapTitleToPosition(title) {
  const normalized = title.toLowerCase();
  if (/\b(lpn|r\.?n\.?|nurse|nursing)\b/.test(normalized)) {
    return "Nurse";
  }
  if (/\b(pca|cna|caregiver|home health aide|hha)\b/.test(normalized)) {
    return "Caregiver";
  }
  return null;
}

function formatLocation(locations) {
  const first = locations?.[0];
  if (!first) {
    return "Location not listed";
  }
  const city = first.city?.trim() ?? "";
  const state = first.state?.trim() ?? "";
  return [city, state].filter(Boolean).join(", ") || "Location not listed";
}

async function fetchJobs() {
  const jobs = [];
  let page = 1;
  let total = Infinity;

  while (jobs.length < total) {
    const url = new URL(SOURCE);
    url.searchParams.set("page", String(page));
    url.searchParams.set("page_size", "50");

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Hireology request failed: ${response.status} ${response.statusText}`
      );
    }

    const payload = await response.json();
    const rows = Array.isArray(payload.data) ? payload.data : [];
    total = typeof payload.count === "number" ? payload.count : rows.length;
    jobs.push(...rows);

    if (rows.length === 0 || jobs.length >= total) {
      break;
    }
    page += 1;
  }

  return jobs;
}

const rawJobs = await fetchJobs();
const openJobs = rawJobs.filter((job) => job.status === "Open");

if (openJobs.length === 0) {
  throw new Error("Hireology returned no open jobs.");
}

console.log(
  `${openJobs.length} open Hireology listings (apply page still uses two generic roles):`
);
for (const job of openJobs) {
  const title = String(job.name ?? "").trim();
  const location = formatLocation(job.locations);
  const position = mapTitleToPosition(title) ?? "unmapped";
  console.log(`- ${job.id} ${title} (${location}) → ${position}`);
}
console.log(
  "src/data/hireology-jobs.json was not changed. Edit the two generic role blurbs by hand."
);
