import {
  isWhitelistedCaregiver,
  normalizeEmail,
} from "@/lib/caregiver-whitelist";
import { site } from "@/lib/site";

export const STAFF_ROLES = ["admin", "caregiver", "none"] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

export type StaffAccess = {
  email: string;
  role: StaffRole;
  isAdmin: boolean;
  isCaregiver: boolean;
  canAccessPortal: boolean;
};

export const DEFAULT_STAFF_ADMIN_EMAIL = "cmerrill@meadowlarkhomecare.com";
export const COREY_GMAIL_ADMIN_EMAIL = "corey.merrill@gmail.com";
export const NATALIE_REDMAN_ADMIN_EMAIL = "nredman@meadowlarkhomecare.com";
export const NATALIE_REDMAN_GMAIL_ADMIN_EMAIL = "nredman44@gmail.com";
export const DEFAULT_STAFF_ADMIN_EMAILS = [
  DEFAULT_STAFF_ADMIN_EMAIL,
  COREY_GMAIL_ADMIN_EMAIL,
  NATALIE_REDMAN_ADMIN_EMAIL,
  NATALIE_REDMAN_GMAIL_ADMIN_EMAIL,
] as const;

/**
 * Google, magic-link, and password all require admin or the caregiver
 * whitelist. `STAFF_ADMIN_EMAILS` is a comma-separated list and replaces
 * these defaults when set — include all four: Corey (work + Gmail) and
 * Natalie Redman (work + Gmail). Anyone can use Request access on
 * `/login/request-access` without signing in. A leftover session with no
 * portal role still sees request-access on `/staff`.
 */
export function parseEmailList(
  value: string | undefined,
  fallback: readonly string[] = []
): string[] {
  const source = value?.trim()
    ? value.split(",")
    : fallback;
  return source.map((part) => normalizeEmail(part)).filter(Boolean);
}

export function getAdminEmails(): string[] {
  return parseEmailList(
    process.env.STAFF_ADMIN_EMAILS,
    DEFAULT_STAFF_ADMIN_EMAILS
  );
}

export function isStaffAdmin(email: string): boolean {
  return getAdminEmails().includes(normalizeEmail(email));
}

export function resolveStaffRole(email: string): StaffRole {
  const normalized = normalizeEmail(email);
  if (!normalized) {
    return "none";
  }
  if (isStaffAdmin(normalized)) {
    return "admin";
  }
  if (isWhitelistedCaregiver(normalized)) {
    return "caregiver";
  }
  return "none";
}

export function getStaffAccess(email: string): StaffAccess {
  const normalized = normalizeEmail(email);
  const role = resolveStaffRole(normalized);
  const isAdmin = role === "admin";
  const isCaregiver = role === "caregiver" || isAdmin;

  return {
    email: normalized,
    role,
    isAdmin,
    isCaregiver,
    canAccessPortal: isAdmin || role === "caregiver",
  };
}

/** Only allow in-app staff/login paths as post-login redirects. */
export function safeNextPath(next: string | null | undefined): string {
  if (!next) {
    return "/staff";
  }

  const trimmed = next.trim();
  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.includes("://") ||
    trimmed.includes("\\")
  ) {
    return "/staff";
  }

  if (
    trimmed === "/login" ||
    trimmed.startsWith("/login?") ||
    trimmed.startsWith("/login/")
  ) {
    return "/staff";
  }

  return trimmed;
}

export function staffLoginUrl(next?: string | null): string {
  const dest = safeNextPath(next);
  if (dest === "/staff") {
    return "/login";
  }
  return `/login?next=${encodeURIComponent(dest)}`;
}

export function requestAccessInbox(): string {
  return process.env.CONTACT_TO_EMAIL ?? site.careersEmail;
}
