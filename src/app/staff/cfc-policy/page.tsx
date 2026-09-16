import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CfcPolicyManual } from "@/components/cfc-policy-manual";
import {
  CFC_POLICY_SECTIONS,
  cfcPolicyDocHref,
  readCfcPolicyDoc,
} from "@/lib/cfc-agency-policy";
import { staffRobots } from "@/lib/staff";
import { requireStaffSession } from "@/lib/staff-session";

export const metadata: Metadata = {
  title: "CFC Agency-Based Policy Manual",
  description:
    "Meadowlark’s seven-section Montana DPHHS CFCS Agency-Based policy manual.",
  robots: staffRobots,
  alternates: { canonical: "/staff/cfc-policy" },
};

export default async function CfcPolicyPage() {
  const session = await requireStaffSession("/staff/cfc-policy");
  if (!session.canAccessPortal) {
    redirect("/staff");
  }

  const sections = await Promise.all(
    CFC_POLICY_SECTIONS.map(async (section, index) => {
      const result = await readCfcPolicyDoc(section.slug);
      return {
        index: index + 1,
        slug: section.slug,
        title: section.title,
        href: cfcPolicyDocHref(section.slug),
        ready: !("missing" in result),
      };
    })
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff only
      </p>
      <p className="mt-4 text-sm font-medium text-primary">
        <Link href="/staff" className="underline-offset-4 hover:underline">
          Staff portal
        </Link>
        <span className="text-muted-foreground"> / CFC policy</span>
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">
        CFC Agency-Based Policy Manual
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Montana DPHHS Community First Choice / Personal Care Services — the
        seven Agency-Based sections Meadowlark uses. Open a section PDF while
        you are signed in.
      </p>
      <p className="mt-4 max-w-2xl rounded-xl bg-orange/10 px-4 py-3 text-sm text-foreground">
        These copies live in Meadowlark’s staff files. DPHHS may update policy;
        check effective dates, and use the official state manual link at the
        bottom when you need the full table of contents.
      </p>

      <div className="mt-8">
        <CfcPolicyManual sections={sections} />
      </div>
    </section>
  );
}
