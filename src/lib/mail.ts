import { assertNever, type InquiryType, site } from "@/lib/site";

export const DEFAULT_FROM_EMAIL =
  "Meadowlark Home Care <noreply@meadowlarkhomecare.com>";

export function publicFromEmail() {
  return process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
}

export type ResendErrorDetails = {
  message: string;
  name?: string;
  statusCode?: number;
};

function redactSecrets(value: string) {
  return value.replace(/re_[A-Za-z0-9_]+/g, "[redacted]");
}

/** Safe server-side fields from a Resend error — never log API keys. */
export function resendErrorDetails(error: unknown): ResendErrorDetails {
  if (error && typeof error === "object") {
    const candidate = error as {
      message?: unknown;
      name?: unknown;
      statusCode?: unknown;
    };
    const message =
      typeof candidate.message === "string" && candidate.message.trim()
        ? redactSecrets(candidate.message.trim())
        : "Unknown Resend error";
    const name =
      typeof candidate.name === "string" && candidate.name.trim()
        ? candidate.name.trim()
        : undefined;
    const statusCode =
      typeof candidate.statusCode === "number" ? candidate.statusCode : undefined;

    return { message, name, statusCode };
  }

  if (error instanceof Error && error.message.trim()) {
    return { message: redactSecrets(error.message.trim()) };
  }

  return { message: "Unknown Resend error" };
}

export function logResendError(label: string, error: unknown) {
  console.error(`[${label}]`, resendErrorDetails(error));
}

/** Visitor-facing copy — no Resend codes, names, or secrets. */
export function publicSendFailureMessage(
  error: unknown,
  contact: { phone: string; email?: string }
) {
  const details = resendErrorDetails(error);
  const blob = `${details.name ?? ""} ${details.message} ${details.statusCode ?? ""}`.toLowerCase();
  const contactLine = contact.email
    ? `Please call ${contact.phone} or email ${contact.email}.`
    : `Please call ${contact.phone} or try again in a few minutes.`;

  if (
    details.statusCode === 401 ||
    details.statusCode === 403 ||
    /unauthorized|forbidden|invalid.+api.?key/.test(blob)
  ) {
    return `Email delivery is unavailable right now. ${contactLine}`;
  }

  if (details.statusCode === 429 || /rate.?limit/.test(blob)) {
    return `Too many messages were sent just now. ${contactLine}`;
  }

  return `We could not send that just now. ${contactLine}`;
}

/** General contact form inbox. Employment applications do not use this. */
export function contactInbox() {
  return process.env.CONTACT_TO_EMAIL ?? site.contactEmail;
}

/** Public employment applications — always HR, not CONTACT_TO_EMAIL. */
export function applyInbox() {
  return site.careersEmail;
}

/** Contact form: care + general → info@; join the team → hr@. */
export function inboxForInquiry(inquiryType: InquiryType) {
  switch (inquiryType) {
    case "Request care":
    case "General":
      return contactInbox();
    case "Join the team":
      return applyInbox();
    default:
      return assertNever(inquiryType);
  }
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
