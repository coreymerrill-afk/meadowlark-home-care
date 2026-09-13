import { readFileSync } from "node:fs";
import path from "node:path";

import whitelistFile from "@/data/caregiver-whitelist.json";

export type CaregiverWhitelistEntry = {
  email: string;
  name?: string;
  status?: string;
  role?: string;
};

type WhitelistFile = {
  _readme?: string[];
  caregivers?: CaregiverWhitelistEntry[];
};

/**
 * Server-side AxisCare ACTIVE caregiver allowlist.
 *
 * Sources (merged, case-insensitive):
 * 1. `src/data/staff-whitelist.csv` — AxisCare Active export (`email,name,status,role`)
 * 2. `STAFF_WHITELIST_EMAILS` — optional extra comma-separated emails
 * 3. `src/data/caregiver-whitelist.json` — optional extras
 *
 * Only rows with a non-empty email and status=Active count.
 * CSV `role=admin` does not grant admin by itself — admin is still
 * `STAFF_ADMIN_EMAILS` (comma list) or the defaults
 * `cmerrill@meadowlarkhomecare.com`, `corey.merrill@gmail.com`,
 * `nredman@meadowlarkhomecare.com`, and `nredman44@gmail.com`.
 * Setting the env replaces those defaults, so include all four.
 */
function parseEnvEmails(value: string | undefined): CaregiverWhitelistEntry[] {
  if (!value?.trim()) {
    return [];
  }

  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((email) => ({ email, status: "ACTIVE" }));
}

function isActive(entry: CaregiverWhitelistEntry): boolean {
  const status = entry.status?.trim().toUpperCase();
  return status === "ACTIVE";
}

export function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields;
}

export function parseStaffWhitelistCsv(text: string): CaregiverWhitelistEntry[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) {
    return [];
  }

  const header = parseCsvLine(lines[0]).map((part) => part.trim().toLowerCase());
  const emailIndex = header.indexOf("email");
  const nameIndex = header.indexOf("name");
  const statusIndex = header.indexOf("status");
  const roleIndex = header.indexOf("role");

  if (emailIndex === -1) {
    return [];
  }

  const entries: CaregiverWhitelistEntry[] = [];
  for (const line of lines.slice(1)) {
    const cols = parseCsvLine(line);
    const email = cols[emailIndex]?.trim() ?? "";
    if (!email) {
      continue;
    }

    entries.push({
      email,
      name: nameIndex >= 0 ? cols[nameIndex]?.trim() : undefined,
      status: statusIndex >= 0 ? cols[statusIndex]?.trim() : undefined,
      role: roleIndex >= 0 ? cols[roleIndex]?.trim() : undefined,
    });
  }

  return entries;
}

function readStaffWhitelistCsv(): string {
  try {
    return readFileSync(
      path.join(process.cwd(), "src/data/staff-whitelist.csv"),
      "utf8"
    );
  } catch {
    console.warn(
      "[staff whitelist] src/data/staff-whitelist.csv was not found. Using JSON/env only."
    );
    return "";
  }
}

export function loadCaregiverWhitelist(): CaregiverWhitelistEntry[] {
  const file = whitelistFile as WhitelistFile;
  const fromCsv = parseStaffWhitelistCsv(readStaffWhitelistCsv());
  const fromFile = file.caregivers ?? [];
  const fromEnv = parseEnvEmails(process.env.STAFF_WHITELIST_EMAILS);

  return [...fromCsv, ...fromFile, ...fromEnv].filter(
    (entry) => entry.email?.trim() && isActive(entry)
  );
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isWhitelistedCaregiver(email: string): boolean {
  const needle = normalizeEmail(email);
  if (!needle) {
    return false;
  }

  return loadCaregiverWhitelist().some(
    (entry) => normalizeEmail(entry.email) === needle
  );
}
