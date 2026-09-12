export const AUTH_MISSING_MESSAGE = {
  secret:
    "Staff auth is not configured. Set AUTH_SECRET before enabling the staff portal.",
  google:
    "Google sign-in is not configured. Set AUTH_SECRET, AUTH_GOOGLE_ID, and AUTH_GOOGLE_SECRET.",
  magic:
    "Email sign-in is not configured. Set AUTH_SECRET and RESEND_API_KEY (or AUTH_RESEND_KEY).",
  password:
    "Password sign-in is not configured. Set AUTH_SECRET and BLOB_READ_WRITE_TOKEN on Vercel (local uses .data/).",
} as const;

export function getAuthSecret(): string {
  return process.env.AUTH_SECRET?.trim() ?? "";
}

export function isAuthSecretConfigured(): boolean {
  return Boolean(getAuthSecret());
}

export function isGoogleAuthConfigured(): boolean {
  return Boolean(
    getAuthSecret() &&
      process.env.AUTH_GOOGLE_ID?.trim() &&
      process.env.AUTH_GOOGLE_SECRET?.trim()
  );
}

export function getResendApiKey(): string {
  return (
    process.env.AUTH_RESEND_KEY?.trim() ||
    process.env.RESEND_API_KEY?.trim() ||
    ""
  );
}

export function isMagicLinkConfigured(): boolean {
  return Boolean(getAuthSecret() && getResendApiKey());
}

export function isPasswordAuthConfigured(): boolean {
  const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
  const localStoreOk = !process.env.VERCEL;
  return Boolean(getAuthSecret() && (hasBlob || localStoreOk));
}

export function getAuthFromEmail(): string {
  return (
    process.env.CONTACT_FROM_EMAIL ??
    "Meadowlark Home Care <noreply@meadowlarkhomecare.com>"
  );
}

/** Secret passed to Auth.js so `next build` succeeds without credentials. */
export function authJsSecret(): string {
  return getAuthSecret() || "build-placeholder-not-for-production";
}
