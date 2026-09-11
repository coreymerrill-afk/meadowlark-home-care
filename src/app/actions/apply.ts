"use server";

import { Resend } from "resend";
import { z } from "zod";

import { applyOfficeOptions, site } from "@/lib/site";

export type ApplyState = {
  status: "idle" | "success" | "error";
  message?: string;
  mode?: "preview" | "sent";
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "office" | "note", string>>;
};

const applySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email."),
  phone: z.string().trim().min(7, "Please enter a phone number.").max(40),
  office: z.enum(applyOfficeOptions),
  note: z.string().trim().max(1000).optional(),
  companyWebsite: z.string().optional(),
});

export async function submitApply(
  _prev: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const parsed = applySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    office: formData.get("office"),
    note: (formData.get("note") as string) || undefined,
    companyWebsite: formData.get("companyWebsite") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: ApplyState["fieldErrors"] = {};
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
      message: "Thanks — we received your application and will be in touch.",
    };
  }

  const payload = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.careersEmail;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Meadowlark Home Care <noreply@meadowlarkhomecare.com>";

  const text = [
    "New caregiver application (site form)",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Preferred office: ${payload.office}`,
    "",
    payload.note ? payload.note : "(No note)",
  ].join("\n");

  if (!apiKey) {
    console.info("[apply form preview]", { to, ...payload });
    return {
      status: "success",
      mode: "preview",
      message: "Thanks — we received your application and will be in touch.",
    };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `Caregiver application — ${payload.name} (${payload.office})`,
    text,
  });

  return {
    status: "success",
    mode: "sent",
    message: "Thanks — we received your application and will be in touch.",
  };
}
