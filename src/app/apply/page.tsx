import type { Metadata } from "next";
import Link from "next/link";

import { ApplyForm } from "@/components/apply-form";
import { PageHero } from "@/components/page-hero";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to work with Meadowlark Home Care in Missoula or Great Falls. Short form — HR will follow up.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Apply to join the team."
        description="Missoula or Great Falls. Short form — HR will follow up."
      />

      <section className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
          <ApplyForm />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Hiring questions? Call{" "}
          {offices.map((office, i) => (
            <span key={office.id}>
              {i > 0 ? " or " : null}
              <a href={office.phoneHref} className="font-medium text-primary underline-offset-4 hover:underline">
                {office.name} {office.phone}
              </a>
            </span>
          ))}
          , or email{" "}
          <a href={site.careersEmailHref} className="font-medium text-primary underline-offset-4 hover:underline">
            {site.careersEmail}
          </a>
          .
        </p>
        <p className="mt-2 text-sm text-muted-foreground/80">
          Listed roles also appear on{" "}
          <a
            href={site.hireologyUrl}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Hireology
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          <Link href="/work-with-us" className="underline-offset-4 hover:underline">
            Back to Work With Us
          </Link>
        </p>
      </section>
    </>
  );
}
