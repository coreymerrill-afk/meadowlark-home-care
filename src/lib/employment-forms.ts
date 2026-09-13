import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import { NATALIE_REDMAN_ADMIN_EMAIL } from "@/lib/staff-access";

export const EMPLOYMENT_FORM_PEOPLE = [
  {
    slug: "natalie-redman",
    name: "Natalie Redman",
    email: NATALIE_REDMAN_ADMIN_EMAIL,
    title: "Co-founder",
  },
] as const;

export type EmploymentFormPerson = (typeof EMPLOYMENT_FORM_PEOPLE)[number];
export type EmploymentFormPersonSlug = EmploymentFormPerson["slug"];

export const EMPLOYMENT_FORM_SLOTS = [
  {
    slug: "i9",
    title: "Form I-9",
    match: /i-?9/i,
    preferredFile: "i9.pdf",
  },
  {
    slug: "w4",
    title: "Form W-4",
    match: /w-?4/i,
    preferredFile: "w4.pdf",
  },
  {
    slug: "direct-deposit",
    title: "Direct deposit authorization",
    match: /direct[-_ ]?deposit/i,
    preferredFile: "direct-deposit.pdf",
  },
  {
    slug: "emergency-contact",
    title: "Emergency contact",
    match: /emergency[-_ ]?contact/i,
    preferredFile: "emergency-contact.pdf",
  },
] as const;

export type EmploymentFormSlot = (typeof EMPLOYMENT_FORM_SLOTS)[number];
export type PersonEmploymentFormKind = "expected" | "extra";

export type PersonEmploymentForm = {
  slug: string;
  title: string;
  file: string | null;
  ready: boolean;
  href: string;
  kind: PersonEmploymentFormKind;
};

type PdfEntry = {
  file: string;
  slug: string;
  mtimeMs: number;
};

export function isEmploymentFormPersonSlug(
  value: string
): value is EmploymentFormPersonSlug {
  return EMPLOYMENT_FORM_PEOPLE.some((person) => person.slug === value);
}

export function getEmploymentFormPerson(
  slug: string
): EmploymentFormPerson | undefined {
  return EMPLOYMENT_FORM_PEOPLE.find((person) => person.slug === slug);
}

export function employmentFormsDirectory(personSlug: string): string {
  return path.join(
    process.cwd(),
    "content",
    "staff-docs",
    "employment-forms",
    personSlug
  );
}

export function personEmploymentFormsHref(
  personSlug: EmploymentFormPersonSlug
): string {
  return `/staff/employment-forms/${personSlug}`;
}

export function personEmploymentFormHref(
  personSlug: EmploymentFormPersonSlug,
  slug: string
): string {
  return `/staff/employment-forms/${personSlug}/${slug}`;
}

export function isStaffPdfHref(href: string): boolean {
  if (href.startsWith("/staff/docs/")) {
    return true;
  }

  const parts = href.split("/").filter(Boolean);
  return (
    parts[0] === "staff" &&
    parts[1] === "employment-forms" &&
    parts.length >= 4
  );
}

function slugifyPdfStem(stem: string): string {
  const slug = stem
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
  return slug || "form";
}

function titleFromFilename(file: string): string {
  const stem = file.replace(/\.pdf$/i, "");
  const spaced = stem.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!spaced) {
    return file;
  }
  return spaced.replace(/\b\w/g, (char) => char.toUpperCase());
}

function disambiguateSlugs(pdfs: PdfEntry[]): void {
  const seen = new Map<string, number>();
  for (const pdf of pdfs) {
    const base = pdf.slug;
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    if (count > 1) {
      pdf.slug = `${base}-${count}`;
    }
  }
}

async function listPersonPdfs(personSlug: string): Promise<PdfEntry[]> {
  const dir = employmentFormsDirectory(personSlug);
  let names: string[];
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }

  const pdfs: PdfEntry[] = [];
  for (const name of names) {
    if (!name.toLowerCase().endsWith(".pdf")) {
      continue;
    }

    const filePath = path.join(dir, path.basename(name));
    try {
      const info = await stat(filePath);
      if (!info.isFile() || info.size === 0) {
        continue;
      }
      pdfs.push({
        file: path.basename(name),
        slug: slugifyPdfStem(name.replace(/\.pdf$/i, "")),
        mtimeMs: info.mtimeMs,
      });
    } catch {
      continue;
    }
  }

  pdfs.sort((a, b) => b.mtimeMs - a.mtimeMs);
  disambiguateSlugs(pdfs);
  return pdfs;
}

export async function listPersonEmploymentForms(
  personSlug: EmploymentFormPersonSlug
): Promise<PersonEmploymentForm[]> {
  const pdfs = await listPersonPdfs(personSlug);
  const used = new Set<string>();
  const forms: PersonEmploymentForm[] = [];

  for (const slot of EMPLOYMENT_FORM_SLOTS) {
    const latest = pdfs.find((pdf) => slot.match.test(pdf.file));
    if (latest) {
      used.add(latest.file);
    }
    forms.push({
      slug: slot.slug,
      title: slot.title,
      file: latest?.file ?? null,
      ready: Boolean(latest),
      href: personEmploymentFormHref(personSlug, slot.slug),
      kind: "expected",
    });
  }

  for (const pdf of pdfs) {
    if (used.has(pdf.file)) {
      continue;
    }
    forms.push({
      slug: pdf.slug,
      title: titleFromFilename(pdf.file),
      file: pdf.file,
      ready: true,
      href: personEmploymentFormHref(personSlug, pdf.slug),
      kind: "extra",
    });
  }

  return forms;
}

export type ReadPersonEmploymentFormResult =
  | { bytes: Buffer; downloadName: string; title: string }
  | { missing: true; fileHint: string }
  | { unknownPerson: true }
  | { unknownForm: true };

export async function readPersonEmploymentForm(
  personSlug: string,
  slug: string
): Promise<ReadPersonEmploymentFormResult> {
  if (!isEmploymentFormPersonSlug(personSlug)) {
    return { unknownPerson: true };
  }

  const forms = await listPersonEmploymentForms(personSlug);
  const form = forms.find((item) => item.slug === slug);
  if (!form) {
    return { unknownForm: true };
  }

  if (!form.file) {
    const slot = EMPLOYMENT_FORM_SLOTS.find((item) => item.slug === slug);
    return {
      missing: true,
      fileHint: slot?.preferredFile ?? `${slug}.pdf`,
    };
  }

  const filePath = path.join(
    employmentFormsDirectory(personSlug),
    path.basename(form.file)
  );

  try {
    const bytes = await readFile(filePath);
    if (bytes.length === 0) {
      return { missing: true, fileHint: form.file };
    }
    return {
      bytes,
      downloadName: form.file,
      title: form.title,
    };
  } catch {
    return { missing: true, fileHint: form.file };
  }
}
