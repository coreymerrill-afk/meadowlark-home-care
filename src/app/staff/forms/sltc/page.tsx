import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { staffRobots } from "@/lib/staff";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SLTC phone form filler",
  description:
    "Fill Montana Medicaid / SLTC CFC–PAS forms. Meadowlark Google account required.",
  robots: staffRobots,
  alternates: { canonical: "/staff/forms/sltc" },
};

export default function SltcFormEntryPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff only
      </p>
      <p className="mt-4 text-sm font-medium text-primary">
        <Link href="/staff/forms" className="underline-offset-4 hover:underline">
          Staff forms
        </Link>
        <span className="text-muted-foreground"> / SLTC</span>
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">SLTC phone form filler</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Fill Montana Medicaid / SLTC CFC–PAS forms on your phone or computer.
        Completed PDFs save to our Drive folder “Completed SLTC Forms.” You
        must be signed into a Meadowlark Google account; personal Gmail alone
        won’t open the app.
      </p>

      <article className="mt-8 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
        <FileText className="size-6 text-teal" aria-hidden="true" />
        <h2 className="mt-4 text-2xl">Open the form filler</h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          Use a Meadowlark Google account (@meadowlarkhomecare.com).
        </p>
        <a
          href={site.staff.sltcFormUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "cta", size: "lg" }),
            "mt-6 h-12 rounded-full px-6 text-base"
          )}
        >
          Open SLTC Form Filler
          <ArrowUpRight className="size-4" />
        </a>
        <p className="mt-3 text-sm text-muted-foreground">
          First visit may ask you to allow Drive access.
        </p>
      </article>
    </section>
  );
}
