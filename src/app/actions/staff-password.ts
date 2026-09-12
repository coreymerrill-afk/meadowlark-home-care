"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

import { signIn } from "@/auth";
import {
  AUTH_MISSING_MESSAGE,
  getAuthFromEmail,
  getResendApiKey,
  isAuthSecretConfigured,
  isPasswordAuthConfigured,
} from "@/lib/auth-env";
import { loginErrorMessage } from "@/lib/login-errors";
import { passwordPolicyError } from "@/lib/password-policy";
import {
  createPasswordResetToken,
  verifyPasswordResetToken,
} from "@/lib/password-reset";
import { getRequestOrigin } from "@/lib/request-origin";
import { site } from "@/lib/site";
import { resolveStaffRole, safeNextPath } from "@/lib/staff-access";
import { setPasswordHash } from "@/lib/staff-passwords";
import { getOptionalStaffSession } from "@/lib/staff-session";

export type PasswordFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"email" | "password" | "confirm", string>>;
};

const emailSchema = z.object({
  email: z.email("Please enter a valid email."),
  next: z.string().optional(),
  companyWebsite: z.string().optional(),
});

const passwordSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string(),
  next: z.string().optional(),
  companyWebsite: z.string().optional(),
});

const setPasswordSchema = z.object({
  token: z.string().optional(),
  password: z.string(),
  confirm: z.string(),
  next: z.string().optional(),
});

function fieldErrorState(
  fieldErrors: PasswordFormState["fieldErrors"],
  message = "Please check the highlighted fields and try again."
): PasswordFormState {
  return { status: "error", message, fieldErrors };
}

export async function signInWithPassword(
  _prev: PasswordFormState,
  formData: FormData
): Promise<PasswordFormState> {
  const parsed = passwordSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") || undefined,
    companyWebsite: formData.get("companyWebsite") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: PasswordFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }
    return fieldErrorState(fieldErrors);
  }

  if (parsed.data.companyWebsite) {
    return { status: "success", message: "Signed in." };
  }

  const next = safeNextPath(parsed.data.next);

  if (!isPasswordAuthConfigured()) {
    redirect(
      `/login?error=password-unconfigured&next=${encodeURIComponent(next)}`
    );
  }

  try {
    await signIn("password", {
      email: parsed.data.email.trim(),
      password: parsed.data.password,
      redirectTo: next,
    });
  } catch (error) {
    if (isNextRedirect(error)) {
      throw error;
    }
    redirect(`/login?error=bad-password&next=${encodeURIComponent(next)}`);
  }

  return { status: "error", message: loginErrorMessage("bad-password") ?? "" };
}

export async function sendPasswordReset(
  _prev: PasswordFormState,
  formData: FormData
): Promise<PasswordFormState> {
  const parsed = emailSchema.safeParse({
    email: formData.get("email"),
    next: formData.get("next") || undefined,
    companyWebsite: formData.get("companyWebsite") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: PasswordFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }
    return fieldErrorState(fieldErrors);
  }

  if (parsed.data.companyWebsite) {
    return {
      status: "success",
      message: "Check your email for a password link.",
    };
  }

  if (!isAuthSecretConfigured()) {
    return { status: "error", message: AUTH_MISSING_MESSAGE.secret };
  }

  if (!isPasswordAuthConfigured()) {
    return { status: "error", message: AUTH_MISSING_MESSAGE.password };
  }

  if (!getResendApiKey()) {
    return { status: "error", message: AUTH_MISSING_MESSAGE.magic };
  }

  const email = parsed.data.email.trim();
  const role = resolveStaffRole(email);
  if (role === "none") {
    return {
      status: "error",
      message:
        loginErrorMessage("not-whitelisted") ??
        "Request access if you are not on the list yet.",
    };
  }

  const token = await createPasswordResetToken(email);
  const origin = await getRequestOrigin();
  const resetUrl = new URL("/login/set-password", origin);
  resetUrl.searchParams.set("token", token);
  const next = safeNextPath(parsed.data.next);
  if (next !== "/staff") {
    resetUrl.searchParams.set("next", next);
  }

  const text = [
    "Set or reset your Meadowlark staff portal password with this link:",
    "",
    resetUrl.toString(),
    "",
    "This link expires in 60 minutes. If you did not ask for it, you can ignore this email.",
  ].join("\n");

  try {
    const resend = new Resend(getResendApiKey());
    const { error } = await resend.emails.send({
      from: getAuthFromEmail(),
      to: email,
      subject: "Set your Meadowlark staff password",
      text,
    });

    if (error) {
      console.error("[staff password reset]", error);
      return {
        status: "error",
        message: `We could not send that just now. Please call ${site.phone} or try again in a few minutes.`,
      };
    }
  } catch (error) {
    console.error("[staff password reset]", error);
    return {
      status: "error",
      message: `We could not send that just now. Please call ${site.phone} or try again in a few minutes.`,
    };
  }

  return {
    status: "success",
    message: "Check your email for a password link. It expires in 60 minutes.",
  };
}

export async function saveStaffPassword(
  _prev: PasswordFormState,
  formData: FormData
): Promise<PasswordFormState> {
  const parsed = setPasswordSchema.safeParse({
    token: formData.get("token") || undefined,
    password: formData.get("password"),
    confirm: formData.get("confirm"),
    next: formData.get("next") || undefined,
  });

  if (!parsed.success) {
    return fieldErrorState({ password: "Please enter a password." });
  }

  const policy = passwordPolicyError(parsed.data.password);
  if (policy) {
    return fieldErrorState({ password: policy });
  }

  if (parsed.data.password !== parsed.data.confirm) {
    return fieldErrorState({ confirm: "Passwords do not match." });
  }

  if (!isPasswordAuthConfigured()) {
    return { status: "error", message: AUTH_MISSING_MESSAGE.password };
  }

  const next = safeNextPath(parsed.data.next);
  let email = "";

  if (parsed.data.token) {
    const result = await verifyPasswordResetToken(parsed.data.token);
    if (!result.ok) {
      redirect(
        result.reason === "expired"
          ? "/login?error=expired-reset"
          : "/login?error=invalid-reset"
      );
    }
    email = result.email;
  } else {
    const session = await getOptionalStaffSession();
    if (!session?.canAccessPortal) {
      redirect("/login?error=auth-unconfigured");
    }
    email = session.email;
  }

  if (resolveStaffRole(email) === "none") {
    return {
      status: "error",
      message: loginErrorMessage("not-whitelisted") ?? "Request access.",
    };
  }

  try {
    await setPasswordHash(email, parsed.data.password);
  } catch (error) {
    console.error("[staff set password]", error);
    return { status: "error", message: AUTH_MISSING_MESSAGE.password };
  }

  if (parsed.data.token) {
    await signIn("password", {
      email,
      password: parsed.data.password,
      redirectTo: `${next}?notice=password-saved`,
    });
  }

  redirect("/staff?notice=password-saved");
}

function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  );
}
