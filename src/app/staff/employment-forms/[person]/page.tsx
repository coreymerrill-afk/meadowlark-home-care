import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StaffResourceCard } from "@/components/staff-resource-card";
import {
  EMPLOYMENT_FORM_PEOPLE,
  EMPLOYMENT_FORM_SLOTS,
  formatEmploymentFormPersonEmails,
  getEmploymentFormPerson,
  isEmploymentFormPersonSlug,
  listPersonEmploymentForms,
  personEmploymentFormsHref,
} from "@/lib/employment-forms";
import { assertNever } from "@/lib/site";
import { staffRobots } from "@/lib/staff";
import type { StaffResource } from "@/lib/staff-links";

type EmploymentPersonPageProps = {
  params: Promise<{ person: string }>;
};

export function generateStaticParams() {
  return EMPLOYMENT_FORM_PEOPLE.map((person) => ({ person: person.slug }));
}

export async function generateMetadata({
  params,
}: EmploymentPersonPageProps): Promise<Metadata> {
  const { person: personSlug } = await params;
  const person = getEmploymentFormPerson(personSlug);
  if (!person) {
    return {
      title: "Employment forms",
      robots: staffRobots,
    };
  }

  return {
    title: `${person.name} employment forms`,
    description: `Latest admin-only employment PDFs for ${person.name}.`,
    robots: staffRobots,
    alternates: { canonical: personEmploymentFormsHref(person.slug) },
  };
}

export default async function EmploymentPersonPage({
  params,
}: EmploymentPersonPageProps) {
  const { person: personSlug } = await params;
  if (!isEmploymentFormPersonSlug(personSlug)) {
    notFound();
  }

  const person = getEmploymentFormPerson(personSlug);
  if (!person) {
    notFound();
  }

  const forms = await listPersonEmploymentForms(person.slug);
  const expected = forms.filter((form) => form.kind === "expected");
  const extras = forms.filter((form) => form.kind === "extra");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Admin only
      </p>
      <p className="mt-4 text-sm font-medium text-primary">
        <Link href="/staff" className="underline-offset-4 hover:underline">
          Staff portal
        </Link>
        <span className="text-muted-foreground"> / </span>
        <Link
          href="/staff/employment-forms"
          className="underline-offset-4 hover:underline"
        >
          Employment forms
        </Link>
        <span className="text-muted-foreground"> / {person.name}</span>
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">{person.name}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Latest employment PDFs for {person.name} (
        {formatEmploymentFormPersonEmails(person)}). Every admin can open
        these, including Natalie. Drop files into{" "}
        <code className="text-foreground">
          content/staff-docs/employment-forms/{person.slug}/
        </code>
        . Preferred names:{" "}
        {EMPLOYMENT_FORM_SLOTS.map((slot) => slot.preferredFile).join(", ")}.
        Any other PDF appears below as an extra form.
      </p>

      <h2 className="mt-10 text-2xl">Latest packet</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {expected.map((form) => {
          const resource = formToResource(form, person.slug);
          return (
            <StaffResourceCard
              key={form.slug}
              resource={resource}
              accent={form.ready ? "teal" : "orange"}
            />
          );
        })}
      </div>

      {extras.length > 0 ? (
        <>
          <h2 className="mt-10 text-2xl">Other dropped PDFs</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {extras.map((form) => (
              <StaffResourceCard
                key={form.slug}
                resource={formToResource(form, person.slug)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}

function preferredFileName(slug: string): string {
  const slot = EMPLOYMENT_FORM_SLOTS.find((item) => item.slug === slug);
  return slot?.preferredFile ?? `${slug}.pdf`;
}

function formToResource(
  form: Awaited<ReturnType<typeof listPersonEmploymentForms>>[number],
  personSlug: string
): StaffResource {
  switch (form.kind) {
    case "expected":
      return {
        title: form.title,
        href: form.href,
        description: form.ready
          ? `Latest file: ${form.file}. Opens only while you are signed in as admin.`
          : `Drop ${preferredFileName(form.slug)} into content/staff-docs/employment-forms/${personSlug}/.`,
        external: false,
        note: form.ready ? undefined : "PDF not in the repo yet.",
      };
    case "extra":
      return {
        title: form.title,
        href: form.href,
        description: `Latest dropped file: ${form.file}.`,
        external: false,
      };
    default: {
      const _exhaustive: never = form.kind;
      return assertNever(_exhaustive);
    }
  }
}
