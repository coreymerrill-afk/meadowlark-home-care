import { AUTH_MISSING_MESSAGE } from "@/lib/auth-env";

const LOGIN_ERRORS: Record<string, string> = {
  "workspace-only":
    "That Google account isn’t on the admin or caregiver list. Request access.",
  "google-unconfigured": AUTH_MISSING_MESSAGE.google,
  "auth-unconfigured": AUTH_MISSING_MESSAGE.secret,
  "magic-unconfigured": AUTH_MISSING_MESSAGE.magic,
  "password-unconfigured": AUTH_MISSING_MESSAGE.password,
  "invalid-link": "That sign-in link is invalid. Request a new one.",
  "expired-link": "That sign-in link expired. Request a new one.",
  "invalid-reset": "That password link is invalid. Request a new one.",
  "expired-reset": "That password link expired. Request a new one.",
  "not-whitelisted":
    "That email isn’t on the admin or active caregiver list yet. Request access.",
  "workspace-magic":
    "That email isn’t on the admin or caregiver list yet. Request access.",
  "bad-password":
    "Email or password is incorrect, or no password is set yet. Use Google, an email link, or Forgot / set password.",
  AccessDenied:
    "Sign-in was denied. Use a Google account or email on the admin or caregiver list, or request access.",
  Configuration: AUTH_MISSING_MESSAGE.secret,
  CredentialsSignin:
    "Email or password is incorrect, or that sign-in link is invalid. Try again or request a new link.",
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
    "That page is for office staff. If you need it, email HR.",
  "password-saved":
    "Password saved. You can use email and password on the login page next time.",
};

export function staffNoticeMessage(code: string | undefined): string | null {
  if (!code) {
    return null;
  }
  return STAFF_NOTICES[code] ?? null;
}
