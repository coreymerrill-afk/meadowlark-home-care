import whitelistFile from "@/data/caregiver-whitelist.json";

export type CaregiverWhitelistEntry = {
  email: string;
  name?: string;
  status?: string;
};

type WhitelistFile = {
  _readme?: string[];
  caregivers?: CaregiverWhitelistEntry[];
};

/**
 * Server-side AxisCare ACTIVE caregiver allowlist.
 *
 * Sources (merged, case-insensitive):
 * 1. `STAFF_WHITELIST_EMAILS` — comma-separated emails in env
 * 2. `src/data/caregiver-whitelist.json` — placeholder list (empty until ingest)
 *
 * TODO: Ingest the AxisCare ACTIVE caregiver CSV (`email`, `name`, `status=ACTIVE`).
 * Drop the export at `src/data/axiscare-active.csv` (see
 * `src/data/axiscare-active.example.csv`) and parse ACTIVE rows here.
 * Do not treat the production staff portal as ready until that file is loaded.
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
  return !status || status === "ACTIVE";
}

export function loadCaregiverWhitelist(): CaregiverWhitelistEntry[] {
  const file = whitelistFile as WhitelistFile;
  const fromFile = (file.caregivers ?? []).filter(
    (entry) => entry.email?.trim() && isActive(entry)
  );
  const fromEnv = parseEnvEmails(process.env.STAFF_WHITELIST_EMAILS);

  return [...fromFile, ...fromEnv];
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
