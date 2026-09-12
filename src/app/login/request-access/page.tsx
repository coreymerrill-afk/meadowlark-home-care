import type { Metadata } from "next";
import Link from "next/link";

import { RequestAccessForm } from "@/components/request-access-form";
import { staffRobots } from "@/lib/staff";

export const metadata: Metadata = {
  title: "Request staff access",
  description:
    "Ask HR for Meadowlark staff portal access. Requests go to hr@meadowlarkhomecare.com.",
  robots: staffRobots,
  alternates: { canonical: "/login/request-access" },
};

export default function RequestAccessPage() {
  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff
      </p>
      <p className="mt-4 text-sm font-medium text-primary">
        <Link href="/login" className="underline-offset-4 hover:underline">
          Staff login
        </Link>
        <span className="text-muted-foreground"> / Request access</span>
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Request access</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Not on the admin or caregiver list yet? Send a note to HR. You can
        also use this if Google said this account isn’t approved.
      </p>

      <div className="mt-8 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
        <RequestAccessForm />
      </div>
    </section>
  );
}
