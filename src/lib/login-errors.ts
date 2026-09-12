import { AUTH_MISSING_MESSAGE } from "@/lib/auth-env";

const LOGIN_ERRORS: Record<string, string> = {
  "workspace-only":
    "Use a Meadowlark Google account (@meadowlarkhomecare.com), or a magic link if your personal email is on the caregiver list.",
  "google-unconfigured": AUTH_MISSING_MESSAGE.google,
  "auth-unconfigured": AUTH_MISSING_MESSAGE.secret,
  "magic-unconfigured": AUTH_MISSING_MESSAGE.magic,
  "invalid-link": "That sign-in link is invalid. Request a new one below.",
  "expired-link": "That sign-in link expired. Request a new one below.",
  "not-whitelisted":
    "That email isn’t on the active caregiver list yet. Request access below, or use Google if you have a Meadowlark Workspace account.",
  "workspace-magic":
    "Use Google sign-in with your Meadowlark account. If you don’t have portal access yet, request access below.",
  AccessDenied:
    "Sign-in was denied. Use a Meadowlark Workspace account, a whitelisted personal email, or request access.",
  Configuration: AUTH_MISSING_MESSAGE.secret,
  CredentialsSignin: "That sign-in link is invalid or expired. Request a new one.",
  Verification: "That sign-in link is no longer valid.",
  Default: "Something went wrong signing in. Try again.",
};

export function loginErrorMessage(code: string | undefined): string | null {
  if (!code) {
    return null;
  }
  return LOGIN_ERRORS[code] ?? LOGIN_ERRORS.Default;
}

const STAFF_NOTICES: Record<string, string> = {
  "admin-only":
    "The forms hub is for office staff. If you need a form, email HR.",
};

export function staffNoticeMessage(code: string | undefined): string | null {
  if (!code) {
    return null;
  }
  return STAFF_NOTICES[code] ?? null;
}
