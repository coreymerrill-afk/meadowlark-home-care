import type { Metadata } from "next";
import Link from "next/link";

import { LegalStubPage } from "@/components/legal-stub-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Provisional privacy summary for Meadowlark Home Care account sign-in branding. Not a complete privacy policy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalStubPage
      eyebrow="Privacy"
      title="Privacy policy (provisional)."
      description="A short placeholder so account sign-in branding can list this URL. This is not a complete privacy policy."
    >
      <p>
        This website is operated by {site.legalName} in Montana — Missoula and
        Great Falls.
      </p>
      <p>
        These paragraphs are a provisional summary for Google account sign-in
        branding. They are not a full privacy policy and do not describe how
        every form, cookie, or staff tool works.
      </p>
      <p>
        The companion placeholder is the{" "}
        <Link
          href="/terms"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Terms of service
        </Link>
        .
      </p>
    </LegalStubPage>
  );
}
