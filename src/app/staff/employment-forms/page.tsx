import type { Metadata } from "next";
import Link from "next/link";

import { StaffResourceCard } from "@/components/staff-resource-card";
import { staffRobots } from "@/lib/staff";
import {
  employmentFormSlugs,
  readStaffDoc,
  staffDocs,
} from "@/lib/staff-docs";
import type { StaffResource } from "@/lib/staff-links";

export const metadata: Metadata = {
  title: "Employment forms",
  description: "On-hire and employment PDFs for Meadowlark office staff.",
  robots: staffRobots,
  alternates: { canonical: "/staff/employment-forms" },
};

const onHireRelated: StaffResource[] = [
  {
    title: staffDocs.handbook.title,
    href: "/staff/docs/handbook",
    description: "Policies and expectations. Already in the staff-docs folder.",
    external: false,
  },
  {
    title: staffDocs.hipaa.title,
    href: "/staff/docs/hipaa",
    description: "Confidentiality agreement used at hire.",
    external: false,
  },
];

export default async function EmploymentFormsPage() {
  const employmentCards = await Promise.all(
    employmentFormSlugs.map(async (slug) => {
      const result = await readStaffDoc(slug);
      const ready = !("missing" in result);
      const resource: StaffResource = {
        title: staffDocs[slug].title,
        href: `/staff/docs/${slug}`,
        description: ready
          ? "Authenticated PDF. Opens only while you are signed in as admin."
          : `Drop ${staffDocs[slug].file} into content/staff-docs/ to publish this form. AxisCare export was not available in this environment.`,
        external: false,
        note: ready ? undefined : "PDF not in the repo yet.",
      };
      return { resource, ready };
    })
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Admin only
      </p>
      <p className="mt-4 text-sm font-medium text-primary">
        <Link href="/staff" className="underline-offset-4 hover:underline">
          Staff portal
        </Link>
        <span className="text-muted-foreground"> / Employment forms</span>
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Employment forms</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        On-hire packet for office staff. Visible to admins only — including
        Corey Merrill test accounts — not caregivers yet. Place AxisCare PDF
        exports in <code className="text-foreground">content/staff-docs/</code>.
      </p>

      <h2 className="mt-10 text-2xl">Already in the portal</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {onHireRelated.map((resource) => (
          <StaffResourceCard key={resource.href} resource={resource} />
        ))}
      </div>

      <h2 className="mt-10 text-2xl">On-hire forms to drop in</h2>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
        These routes are wired. Files are missing until someone copies the
        AxisCare / HR PDFs into the staff-docs folder.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {employmentCards.map(({ resource, ready }) => (
          <StaffResourceCard
            key={resource.href}
            resource={resource}
            accent={ready ? "teal" : "orange"}
          />
        ))}
      </div>
    </section>
  );
}
