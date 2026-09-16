import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  CFC_AGENCY_POLICY_SOURCE_PAGE,
  type CfcPolicySlug,
} from "@/lib/cfc-agency-policy";
import { cn } from "@/lib/utils";

export type CfcPolicyManualSection = {
  index: number;
  slug: CfcPolicySlug;
  title: string;
  href: string;
  ready: boolean;
};

export function CfcPolicyManual({
  sections,
}: {
  sections: readonly CfcPolicyManualSection[];
}) {
  return (
    <div className="lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start lg:gap-10">
      <nav
        aria-label="Policy sections"
        className="sticky top-0 z-10 -mx-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm lg:top-6 lg:mx-0 lg:rounded-[1.5rem] lg:border lg:border-transparent lg:bg-card lg:px-5 lg:py-6 lg:shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] lg:ring-1 lg:ring-foreground/5 lg:backdrop-blur-none"
      >
        <p className="hidden text-xs font-semibold tracking-[0.12em] text-orange uppercase lg:block">
          Sections
        </p>
        <ol className="flex gap-2 overflow-x-auto pb-1 lg:mt-4 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
          {sections.map((section) => (
            <li key={section.slug} className="shrink-0">
              <a
                href={`#${section.slug}`}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 ring-1 ring-foreground/10 transition-colors hover:bg-teal/[0.07] hover:text-foreground lg:rounded-xl lg:ring-0"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-orange/15 text-xs font-semibold text-orange">
                  {section.index}
                </span>
                <span className="max-w-[16rem] truncate lg:max-w-none lg:whitespace-normal">
                  {section.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-6 space-y-5 lg:mt-0">
        {sections.map((section) => (
          <article
            key={section.slug}
            id={section.slug}
            className="scroll-mt-28 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 target:ring-2 target:ring-orange/70 sm:p-7"
          >
            <p className="text-xs font-semibold tracking-[0.12em] text-orange uppercase">
              Section {section.index} of {sections.length}
            </p>
            <h2 className="mt-2 text-2xl">{section.title}</h2>
            {section.ready ? (
              <a
                href={section.href}
                className={cn(
                  buttonVariants({ variant: "cta", size: "lg" }),
                  "mt-6 h-12 rounded-full px-6 text-base"
                )}
              >
                Open PDF
                <ArrowRight className="size-4" />
              </a>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                PDF not in the repo yet. Drop{" "}
                <code className="text-foreground">{section.slug}.pdf</code> into{" "}
                <code className="text-foreground">
                  content/staff-docs/cfc-policy/
                </code>
                .
              </p>
            )}
          </article>
        ))}

        <aside className="rounded-[1.5rem] bg-teal/[0.06] px-5 py-5 sm:px-6">
          <BookOpen className="size-5 text-teal" aria-hidden="true" />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Need a section that is not listed here? The full state Agency-Based
            manual and updates live on DPHHS. Always check the effective date
            before relying on a printed copy.
          </p>
          <a
            href={CFC_AGENCY_POLICY_SOURCE_PAGE}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal underline-offset-4 hover:underline"
          >
            Full state manual on DPHHS
            <ArrowUpRight className="size-3.5" />
          </a>
        </aside>

        <p className="text-sm text-muted-foreground">
          <Link href="/staff" className="font-medium text-teal underline-offset-4 hover:underline">
            Back to staff portal
          </Link>
        </p>
      </div>
    </div>
  );
}
