import { assertNever, type InquiryType, site } from "@/lib/site";

export const DEFAULT_FROM_EMAIL =
  "Meadowlark Home Care <noreply@meadowlarkhomecare.com>";

export function publicFromEmail() {
  return process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
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
