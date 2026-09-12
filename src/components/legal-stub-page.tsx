import Link from "next/link";
import type { ReactNode } from "react";

import { PageHero } from "@/components/page-hero";
import { offices, site } from "@/lib/site";

type LegalStubPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalStubPage({
  eyebrow,
  title,
  description,
  children,
}: LegalStubPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="max-w-3xl rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
          <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
            Provisional
          </p>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            {children}
            <p>
              For staff or employment policies, email{" "}
              <a
                href={site.careersEmailHref}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {site.careersEmail}
              </a>
              .
            </p>
            <p>
              Questions about this website:{" "}
              <Link
                href="/contact"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Contact
              </Link>
              {offices.map((office) => (
                <span key={office.id}>
                  {", "}
                  <a
                    href={office.phoneHref}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {office.name} {office.phone}
                  </a>
                </span>
              ))}
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
