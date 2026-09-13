#!/usr/bin/env node
/**
 * Refresh src/data/hireology-jobs.json from the public Hireology careers API.
 * No API key required. See docs/hireology-jobs.md.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CAREERS_SLUG = "meadowlarkhomecare3";
const CAREERS_URL = `https://careers.hireology.com/${CAREERS_SLUG}`;
const SOURCE = `https://api.hireology.com/v2/public/careers/${CAREERS_SLUG}`;
const OUTPUT = path.resolve(
  import.meta.dirname,
  "../src/data/hireology-jobs.json"
);

function htmlToText(html) {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

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

function summarizeDescription(html) {
  const text = htmlToText(html ?? "");
  const withoutBoiler = text
    .replace(
      /Meadowlark Home Care is looking to revitalize[\s\S]*?clients!/i,
      ""
    )
    .replace(
      /Meadowlark Home Care believes the industry[\s\S]*?care providers\./gi,
      ""
    )
    .replace(/\*\*We offer periodic[\s\S]*?\*\*/g, "")
    .replace(/The market is due[\s\S]*?providers\./gi, "")
    .replace(/Getting in with us[\s\S]*$/i, "")
    .replace(/\bJob Description:\s*/gi, "")
    .trim();

  const sentences = withoutBoiler
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.replace(/^[*•]+\s*/, "").trim())
    .filter(Boolean);

  const skip =
    /revitalize|industry is in trouble|growing very rapidly|getting in with us|readjustment|appreciated and supported|eligible for our full benefits|accrue paid time off|Raises are available/i;
  const prefer =
    /\$\d|\/hour|\/hr|friday|saturday|sunday|shift work|evenings?|starting at|nursing|ADL|certif|visit|med management|bowel|foot care|part-time|full-time|4-12|4–12/i;

  const preferred = sentences.filter(
    (sentence) => prefer.test(sentence) && !skip.test(sentence)
  );
  const fallback = sentences.filter((sentence) => !skip.test(sentence));
  let summary = (preferred.length ? preferred : fallback).slice(0, 2).join(" ");

  if (summary.length > 280) {
    summary = `${summary.slice(0, 277).replace(/\s+\S*$/, "")}…`;
  }

  return summary || "See the Hireology listing for the current description.";
}

function sortJobs(jobs) {
  const locationRank = (location) => {
    if (location.includes("Missoula")) return 0;
    if (location.includes("Great Falls")) return 1;
    return 2;
  };
  const positionRank = (position) => {
    if (position === "Caregiver") return 0;
    if (position === "Nurse") return 1;
    return 2;
  };

  return [...jobs].sort((a, b) => {
    return (
      locationRank(a.location) - locationRank(b.location) ||
      positionRank(a.position) - positionRank(b.position) ||
      a.title.localeCompare(b.title) ||
      a.id.localeCompare(b.id)
    );
  });
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

const previousSummaries = new Map();
try {
  const previous = JSON.parse(await readFile(OUTPUT, "utf8"));
  for (const job of previous.jobs ?? []) {
    if (job?.id && job.summary) {
      previousSummaries.set(String(job.id), String(job.summary));
    }
  }
} catch {
  // First run — no checked-in file yet.
}

const rawJobs = await fetchJobs();
const openJobs = rawJobs.filter((job) => job.status === "Open");

if (openJobs.length === 0) {
  throw new Error("Hireology returned no open jobs. JSON was not updated.");
}

const jobs = sortJobs(
  openJobs.map((job) => {
    const id = String(job.id);
    return {
      id,
      title: String(job.name ?? "").trim(),
      location: formatLocation(job.locations),
      employmentStatus: String(job.employment_status ?? "").trim(),
      url: job.career_site_url || `${CAREERS_URL}/${job.id}/description`,
      summary:
        previousSummaries.get(id) || summarizeDescription(job.job_description),
      position: mapTitleToPosition(String(job.name ?? "")),
    };
  })
);

const file = {
  fetchedAt: new Date().toISOString(),
  source: SOURCE,
  careersUrl: CAREERS_URL,
  jobs,
};

await writeFile(OUTPUT, `${JSON.stringify(file, null, 2)}\n`, "utf8");

console.log(`Wrote ${jobs.length} open Hireology jobs to ${OUTPUT}`);
for (const job of jobs) {
  console.log(`- ${job.id} ${job.title} (${job.location}) → ${job.position ?? "unmapped"}`);
}
