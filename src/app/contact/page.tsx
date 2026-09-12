import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone, Printer } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { FacebookIcon } from "@/components/facebook-icon";
import { PageHero } from "@/components/page-hero";
import { formatOfficeAddress, offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Meadowlark Home Care in Missoula or Great Falls: phone, office address, and a contact form for care or careers.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask about care at home, or joining the team."
        description="Call either office, visit in person, or send a message. Caregivers apply on a short form."
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 rounded-[1.5rem] border-l-4 border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
              Two offices
            </p>
            <h2 className="mt-2 text-3xl">How to reach us</h2>
            <p className="mt-3 text-base text-muted-foreground">
              Applying to work with us? Use{" "}
              <Link
                href={site.applyUrl}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Apply online
              </Link>{" "}
              — a short mobile-friendly form.
            </p>

            <ul className="mt-6 space-y-6">
              {offices.map((office) => (
                <li key={office.id} className="rounded-2xl bg-teal/[0.05] p-4 ring-1 ring-foreground/5">
                  <p className="font-heading text-xl">{office.name}</p>
                  <div className="mt-3 space-y-3 text-base">
                    <p className="flex gap-3">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                      <a
                        href={office.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {formatOfficeAddress(office, "\n")}
                      </a>
                    </p>
                    <p className="flex gap-3">
                      <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                      <a href={office.phoneHref} className="underline-offset-4 hover:underline">
                        {office.phone}
                      </a>
                    </p>
                    {office.fax ? (
                      <p className="flex gap-3">
                        <Printer className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                        <span>Fax {office.fax}</span>
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}

              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
                    General email
                  </p>
                  <a
                    href={site.contactEmailHref}
                    className="mt-1 block text-base underline-offset-4 hover:underline"
                  >
                    {site.contactEmail}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
                    Careers email
                  </p>
                  <a
                    href={site.careersEmailHref}
                    className="mt-1 block text-base underline-offset-4 hover:underline"
                  >
                    {site.careersEmail}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <FacebookIcon className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
                    Facebook
                  </p>
                  <a
                    href={site.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-base underline-offset-4 hover:underline"
                  >
                    Meadowlark Home Care
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock3 className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
                    Hiring
                  </p>
                  <p className="mt-1 text-base">Missoula and Great Falls</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-border/80 lg:pl-8">
            <h2 className="text-3xl">Send a message</h2>
            <p className="mt-2 text-base text-muted-foreground">
              Questions about care or the office go here. Applying to work with
              us? Use the short application instead — we will follow up by phone
              or email.
            </p>
            <div className="relative mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
