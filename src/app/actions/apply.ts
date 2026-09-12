"use server";

import { Resend } from "resend";

import {
  applyFieldErrors,
  applySchema,
  formatApplyEmail,
  readApplyForm,
  type ApplyState,
} from "@/lib/apply";
import { applyInbox, publicFromEmail } from "@/lib/mail";
import { site } from "@/lib/site";

export type { ApplyState } from "@/lib/apply";

export async function submitApply(
  _prev: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const parsed = applySchema.safeParse(readApplyForm(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: applyFieldErrors(parsed.error),
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
  const to = applyInbox();
  const from = publicFromEmail();
  const { subject, text, html } = formatApplyEmail(payload);

  if (!apiKey) {
    console.info("[apply form preview]", { to, subject, ...payload });
    return {
      status: "success",
      mode: "preview",
      message: "Thanks — we received your application and will be in touch.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[apply form]", error);
      return {
        status: "error",
        message: `We could not send that just now. Please call ${site.phone} or email ${site.careersEmail}.`,
      };
    }
  } catch (error) {
    console.error("[apply form]", error);
    return {
      status: "error",
      message: `We could not send that just now. Please call ${site.phone} or email ${site.careersEmail}.`,
    };
  }

  return {
    status: "success",
    mode: "sent",
    message: "Thanks — we received your application and will be in touch.",
  };
}
