"use server";

import { Resend } from "resend";
import { z } from "zod";

import { getAuthFromEmail, getResendApiKey } from "@/lib/auth-env";
import { requestAccessInbox } from "@/lib/staff-access";
import { site } from "@/lib/site";

export type RequestAccessState = {
  status: "idle" | "success" | "error";
  message?: string;
  mode?: "preview" | "sent";
  fieldErrors?: Partial<Record<"name" | "email" | "note", string>>;
};

const requestAccessSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email."),
  note: z.string().trim().max(1000).optional(),
  companyWebsite: z.string().optional(),
});

export async function submitRequestAccess(
  _prev: RequestAccessState,
  formData: FormData
): Promise<RequestAccessState> {
  const parsed = requestAccessSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    note: (formData.get("note") as string) || undefined,
    companyWebsite: formData.get("companyWebsite") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: RequestAccessState["fieldErrors"] = {};
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
      message: "Thanks — we sent your request to HR.",
    };
  }

  const payload = parsed.data;
  const apiKey = getResendApiKey();
  const to = requestAccessInbox();
  const from = getAuthFromEmail();

  const text = [
    "Staff portal access request",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    payload.note ? payload.note : "(No note)",
  ].join("\n");

  if (!apiKey) {
    console.info("[staff request access preview]", { to, ...payload });
    return {
      status: "success",
      mode: "preview",
      message: "Thanks — we sent your request to HR.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `Staff access request — ${payload.name}`,
      text,
    });

    if (error) {
      console.error("[staff request access]", error);
      return {
        status: "error",
        message: `We could not send that just now. Please email ${site.careersEmail} or try again in a few minutes.`,
      };
    }
  } catch (error) {
    console.error("[staff request access]", error);
    return {
      status: "error",
      message: `We could not send that just now. Please email ${site.careersEmail} or try again in a few minutes.`,
    };
  }

  return {
    status: "success",
    mode: "sent",
    message: "Thanks — we sent your request to HR.",
  };
}
