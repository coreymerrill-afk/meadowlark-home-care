"use server";

import { Resend } from "resend";
import { z } from "zod";

import { inquiryTypes, site } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email."),
  phone: z.string().trim().max(40).optional(),
  inquiryType: z.enum(inquiryTypes),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more so we can help.")
    .max(4000),
  companyWebsite: z.string().optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
  mode?: "sent" | "preview";
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    inquiryType: formData.get("inquiryType"),
    message: formData.get("message"),
    companyWebsite: formData.get("companyWebsite") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
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
      message: "Thanks — we received your message and will be in touch.",
      mode: "preview",
    };
  }

  const payload = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.careersEmail;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Meadowlark Home Care <noreply@meadowlarkhomecare.com>";

  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone ?? "Not provided"}`,
    `Inquiry: ${payload.inquiryType}`,
    "",
    payload.message,
  ].join("\n");

  if (!apiKey) {
    console.info("[contact form preview]", { to, ...payload });
    return {
      status: "success",
      mode: "preview",
      message:
        "Thanks — your message was recorded in preview mode. Add a Resend API key to send live email.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `${payload.inquiryType} — ${payload.name}`,
      text,
    });

    if (error) {
      console.error("[contact form]", error);
      return {
        status: "error",
        message:
          "We could not send that just now. Please call us or try again in a few minutes.",
      };
    }
  } catch (error) {
    console.error("[contact form]", error);
    return {
      status: "error",
      message:
        "We could not send that just now. Please call us or try again in a few minutes.",
    };
  }

  return {
    status: "success",
    mode: "sent",
    message: "Thanks — we received your message and will be in touch.",
  };
}
