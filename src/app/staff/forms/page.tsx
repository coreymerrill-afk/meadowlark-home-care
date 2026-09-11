import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { staffRobots } from "@/lib/staff";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Staff forms",
  description:
    "Internal Meadowlark tools for completing Medicaid / SLTC paperwork.",
  robots: staffRobots,
  alternates: { canonical: "/staff/forms" },
};

export default function StaffFormsPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff only
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Staff forms</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Internal Meadowlark tools for completing Medicaid / SLTC paperwork.
        These pages are not linked from the public site — bookmark what you
        use. Sign in with your Meadowlark Google account
        (@meadowlarkhomecare.com) when a tool asks.
      </p>

      <article className="mt-8 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
        <ClipboardList className="size-6 text-teal" aria-hidden="true" />
        <h2 className="mt-4 text-2xl">SLTC phone form filler</h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          Complete Montana Medicaid / SLTC CFC–PAS forms on a phone or computer.
          Completed PDFs save to Drive.
        </p>
        <Link
          href="/staff/forms/sltc"
          className={cn(
            buttonVariants({ variant: "cta", size: "lg" }),
            "mt-6 h-12 rounded-full px-6 text-base"
          )}
        >
          Open SLTC form filler
          <ArrowRight className="size-4" />
        </Link>
      </article>
    </section>
  );
}
