import type { Metadata } from "next";
import Link from "next/link";

import { ApplyForm } from "@/components/apply-form";
import { ApplyOpenings } from "@/components/apply-openings";
import { PageHero } from "@/components/page-hero";
import {
  getHireologyRoles,
  positionFromApplyQuery,
} from "@/lib/hireology-jobs";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to work with Meadowlark Home Care in Missoula or Great Falls as a caregiver or nurse. PCA/CNA and LPN/RN role descriptions are on this page.",
  alternates: { canonical: "/apply" },
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ job?: string | string[]; role?: string | string[] }>;
}) {
  const params = await searchParams;
  const roles = getHireologyRoles();
  const selectedPosition = positionFromApplyQuery(
    firstParam(params.role) ?? firstParam(params.job)
  );

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Apply to join the team."
        description="Caregiver or nurse roles in Missoula and Great Falls. Choose a role, office, and availability — HR will follow up."
      />

      <ApplyOpenings roles={roles} selectedPosition={selectedPosition} />

      <section className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
          <ApplyForm
            key={selectedPosition ?? "choose"}
            initialPosition={selectedPosition}
          />
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
          Individual postings stay on{" "}
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
