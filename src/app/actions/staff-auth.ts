"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

import { signIn, signOut } from "@/auth";
import {
  AUTH_MISSING_MESSAGE,
  getAuthFromEmail,
  getResendApiKey,
  isAuthSecretConfigured,
  isGoogleAuthConfigured,
  isMagicLinkConfigured,
} from "@/lib/auth-env";
import { loginErrorMessage } from "@/lib/login-errors";
import { createMagicLinkToken } from "@/lib/magic-link";
import { getRequestOrigin } from "@/lib/request-origin";
import { site } from "@/lib/site";
import { resolveStaffRole, safeNextPath } from "@/lib/staff-access";

export type MagicLinkState = {
  status: "idle" | "success" | "error";
  message?: string;
  mode?: "preview" | "sent";
  fieldErrors?: Partial<Record<"email", string>>;
};

const magicLinkSchema = z.object({
  email: z.email("Please enter a valid email."),
  next: z.string().optional(),
  companyWebsite: z.string().optional(),
});

export async function signInWithGoogle(formData: FormData) {
  const next = safeNextPath(String(formData.get("next") || "/staff"));

  if (!isGoogleAuthConfigured()) {
    redirect(`/login?error=google-unconfigured&next=${encodeURIComponent(next)}`);
  }

  await signIn("google", { redirectTo: next });
}

export async function sendMagicLink(
  _prev: MagicLinkState,
  formData: FormData
): Promise<MagicLinkState> {
  const parsed = magicLinkSchema.safeParse({
    email: formData.get("email"),
    next: formData.get("next") || undefined,
    companyWebsite: formData.get("companyWebsite") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: MagicLinkState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  if (parsed.data.companyWebsite) {
    return {
      status: "success",
      mode: "preview",
      message: "Check your email for a sign-in link.",
    };
  }

  if (!isAuthSecretConfigured()) {
    return { status: "error", message: AUTH_MISSING_MESSAGE.secret };
  }

  if (!isMagicLinkConfigured()) {
    return { status: "error", message: AUTH_MISSING_MESSAGE.magic };
  }

  const email = parsed.data.email.trim();
  const next = safeNextPath(parsed.data.next);
  const role = resolveStaffRole(email);

  if (role === "none") {
    return {
      status: "error",
      message: loginErrorMessage("not-whitelisted") ?? "Request access below.",
    };
  }

  const token = await createMagicLinkToken(email);
  const origin = await getRequestOrigin();
  const verifyUrl = new URL("/login/verify", origin);
  verifyUrl.searchParams.set("token", token);
  if (next !== "/staff") {
    verifyUrl.searchParams.set("next", next);
  }

  const apiKey = getResendApiKey();
  const from = getAuthFromEmail();
  const text = [
    "Sign in to the Meadowlark staff portal with this link:",
    "",
    verifyUrl.toString(),
    "",
    "This link expires in 20 minutes. If you did not ask for it, you can ignore this email.",
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: "Your Meadowlark staff sign-in link",
      text,
    });

    if (error) {
      console.error("[staff magic link]", error);
      return {
        status: "error",
        message: `We could not send that just now. Please call ${site.phone} or try again in a few minutes.`,
      };
    }
  } catch (error) {
    console.error("[staff magic link]", error);
    return {
      status: "error",
      message: `We could not send that just now. Please call ${site.phone} or try again in a few minutes.`,
    };
  }

  return {
    status: "success",
    mode: "sent",
    message: "Check your email for a sign-in link. It expires in 20 minutes.",
  };
}

export async function completeMagicLinkSignIn(formData: FormData) {
  const token = String(formData.get("token") || "");
  const next = safeNextPath(String(formData.get("next") || "/staff"));

  if (!isAuthSecretConfigured()) {
    redirect("/login?error=auth-unconfigured");
  }

  if (!token) {
    redirect("/login?error=invalid-link");
  }

  await signIn("magic-link", { token, redirectTo: next });
}

export async function signOutStaff() {
  await signOut({ redirectTo: "/login" });
}
