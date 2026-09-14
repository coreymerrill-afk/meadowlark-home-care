import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, ClipboardList } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { staffRobots } from "@/lib/staff";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Staff forms",
  description:
    "Internal Meadowlark tools for Medicaid / SLTC paperwork and PCA certificates.",
  robots: staffRobots,
  alternates: { canonical: "/staff/forms" },
};

export default function StaffFormsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff only
      </p>
      <p className="mt-4 text-sm font-medium text-primary">
        <Link href="/staff" className="underline-offset-4 hover:underline">
          Staff portal
        </Link>
        <span className="text-muted-foreground"> / Forms</span>
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Staff forms</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Internal Meadowlark tools for Medicaid / SLTC paperwork and PCA
        certificates. Admin only. When a tool asks, use your Meadowlark Google
        account (@meadowlarkhomecare.com).
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <article className="rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
          <ClipboardList className="size-6 text-teal" aria-hidden="true" />
          <h2 className="mt-4 text-2xl">SLTC phone form filler</h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Complete Montana Medicaid / SLTC CFC–PAS forms on a phone or
            computer. Completed PDFs save to Drive.
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

        <article className="rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
          <Award className="size-6 text-teal" aria-hidden="true" />
          <h2 className="mt-4 text-2xl">PCA certificate</h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Montana CFC Personal Care Attendant certificate — 20-hour training
            class or waiver. Print the landscape insert and paste it inside the
            gold-foil border.
          </p>
          <Link
            href="/staff/forms/pca-certificate"
            className={cn(
              buttonVariants({ variant: "cta", size: "lg" }),
              "mt-6 h-12 rounded-full px-6 text-base"
            )}
          >
            Open PCA certificate
            <ArrowRight className="size-4" />
          </Link>
        </article>
      </div>
    </section>
  );
}
