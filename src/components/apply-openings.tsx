import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { type HireologyJob } from "@/lib/hireology-jobs";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ApplyOpenings({
  jobs,
  selectedJobId,
}: {
  jobs: HireologyJob[];
  selectedJobId?: string;
}) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <section id="openings" className="mx-auto w-full max-w-4xl px-4 pt-10 sm:px-6 sm:pt-12">
      <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
        Open roles
      </p>
      <h2 className="mt-2 text-3xl sm:text-4xl">Current listings</h2>
      <p className="mt-2 max-w-2xl text-base text-muted-foreground">
        Short summaries from our Hireology board. Choose one to apply, or send a
        general application in the form below.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {jobs.map((job) => {
          const selected = selectedJobId === job.id;
          return (
            <Link
              key={job.id}
              href={`/apply?job=${encodeURIComponent(job.id)}#application`}
              className={cn(
                "rounded-2xl bg-card p-5 ring-1 ring-foreground/10 transition-colors hover:ring-teal",
                selected && "border-l-[5px] border-teal ring-teal"
              )}
            >
              <p className="font-heading text-xl leading-snug">{job.title}</p>
              <p className="mt-1 text-sm font-medium text-primary">
                {job.location}
                {job.position ? ` · ${job.position}` : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {job.summary}
              </p>
              <p className="mt-3 text-sm font-medium text-primary">
                {selected ? "Selected — continue below" : "Apply for this opening"}
              </p>
            </Link>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground/80">
        <a
          href={site.hireologyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
        >
          Browse all listings on Hireology
          <ArrowUpRight className="size-3.5" />
        </a>
      </p>
    </section>
  );
}
