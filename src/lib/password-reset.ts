import { SignJWT, jwtVerify } from "jose";

import { getAuthSecret } from "@/lib/auth-env";
import { normalizeEmail } from "@/lib/caregiver-whitelist";

const PURPOSE = "mlhc-password-reset";
const TOKEN_MAX_AGE = "60m";

function getSecretKey() {
  const secret = getAuthSecret();
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function createPasswordResetToken(email: string): Promise<string> {
  return new SignJWT({
    email: normalizeEmail(email),
    purpose: PURPOSE,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(normalizeEmail(email))
    .setIssuedAt()
    .setExpirationTime(TOKEN_MAX_AGE)
    .sign(getSecretKey());
}

export async function verifyPasswordResetToken(token: string): Promise<
  | { ok: true; email: string }
  | { ok: false; reason: "expired" | "invalid" }
> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.purpose !== PURPOSE || typeof payload.email !== "string") {
      return { ok: false, reason: "invalid" };
    }
    return { ok: true, email: normalizeEmail(payload.email) };
  } catch (error) {
    const expired =
      error instanceof Error &&
      (error.name === "JWTExpired" ||
        ("code" in error && error.code === "ERR_JWT_EXPIRED"));
    if (expired) {
      return { ok: false, reason: "expired" };
    }
    return { ok: false, reason: "invalid" };
  }
}
