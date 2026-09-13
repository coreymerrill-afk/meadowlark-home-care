import type { Metadata } from "next";
import Link from "next/link";

import { StaffResourceCard } from "@/components/staff-resource-card";
import {
  EMPLOYMENT_FORM_PEOPLE,
  formatEmploymentFormPersonEmails,
  getEmploymentFormPersonByEmail,
  listPersonEmploymentForms,
  personEmploymentFormsHref,
} from "@/lib/employment-forms";
import { staffRobots } from "@/lib/staff";
import {
  employmentFormSlugs,
  readStaffDoc,
  staffDocs,
} from "@/lib/staff-docs";
import type { StaffResource } from "@/lib/staff-links";
import { requireAdminSession } from "@/lib/staff-session";

export const metadata: Metadata = {
  title: "Employment forms",
  description:
    "Admin-only on-hire templates and Natalie Redman’s latest employment PDFs.",
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
  const session = await requireAdminSession("/staff/employment-forms");
  const signedInPerson = getEmploymentFormPersonByEmail(session.email);

  const peopleCards = await Promise.all(
    EMPLOYMENT_FORM_PEOPLE.map(async (person) => {
      const forms = await listPersonEmploymentForms(person.slug);
      const readyCount = forms.filter((form) => form.ready).length;
      const emails = formatEmploymentFormPersonEmails(person);
      const yours = signedInPerson?.slug === person.slug;
      const resource: StaffResource = {
        title: person.name,
        href: personEmploymentFormsHref(person.slug),
        description:
          readyCount > 0
            ? `${person.title}. ${readyCount} latest form${readyCount === 1 ? "" : "s"} ready to open.`
            : `${person.title}. Drop the latest AxisCare / HR PDFs into content/staff-docs/employment-forms/${person.slug}/.`,
        external: false,
        note: yours
          ? `Your packet · ${emails}`
          : readyCount > 0
            ? emails
            : `No PDFs in the repo yet · ${emails}`,
      };
      return { resource, ready: readyCount > 0 };
    })
  );

  const employmentCards = await Promise.all(
    employmentFormSlugs.map(async (slug) => {
      const result = await readStaffDoc(slug);
      const ready = !("missing" in result);
      const resource: StaffResource = {
        title: staffDocs[slug].title,
        href: `/staff/docs/${slug}`,
        description: ready
          ? "Shared blank / office template. Opens only while you are signed in as admin."
          : `Drop ${staffDocs[slug].file} into content/staff-docs/ to publish this shared template.`,
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
        Visible to every admin, including Natalie Redman. Person packets live
        under{" "}
        <code className="text-foreground">
          content/staff-docs/employment-forms/
        </code>
        . AxisCare exports are pulled separately — drop the PDFs in when they
        are ready.
      </p>

      <h2 className="mt-10 text-2xl">People</h2>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Open someone’s latest forms. New files in their folder show up here
        after deploy; the newest match wins for I-9, W-4, direct deposit, and
        emergency contact.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {peopleCards.map(({ resource, ready }) => (
          <StaffResourceCard
            key={resource.href}
            resource={resource}
            accent={ready ? "teal" : "orange"}
          />
        ))}
      </div>

      <h2 className="mt-10 text-2xl">Already in the portal</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {onHireRelated.map((resource) => (
          <StaffResourceCard key={resource.href} resource={resource} />
        ))}
      </div>

      <h2 className="mt-10 text-2xl">Shared on-hire templates</h2>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Blank office copies, not a person’s signed packet. Routes are wired;
        files are missing until someone copies the PDFs into staff-docs.
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
