import type { Metadata } from "next";
import Link from "next/link";

import { LegalStubPage } from "@/components/legal-stub-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Provisional terms summary for Meadowlark Home Care account sign-in branding. Not a complete terms of service.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalStubPage
      eyebrow="Terms"
      title="Terms of service (provisional)."
      description="A short placeholder so account sign-in branding can list this URL. This is not a complete terms of service."
    >
      <p>
        This website is operated by {site.legalName} in Montana — Missoula and
        Great Falls.
      </p>
      <p>
        These paragraphs are a provisional summary for Google account sign-in
        branding. They are not a contract and do not replace caregiver
        employment paperwork or a later, reviewed legal page.
      </p>
      <p>
        The companion placeholder is the{" "}
        <Link
          href="/privacy"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Privacy policy
        </Link>
        .
      </p>
    </LegalStubPage>
  );
}
