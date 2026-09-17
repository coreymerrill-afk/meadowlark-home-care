import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  HeartHandshake,
  HeartPulse,
  Home,
  Phone,
  Shield,
  Users,
} from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import {
  serviceBlocks,
  servicesContactCluster,
  type ServiceId,
  type ServiceLink,
} from "@/lib/services";
import { assertNever, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CFCS/PCS, HCBS Big Sky and SDMI, VA Community Care, private pay, and PCCA in Missoula and Great Falls.",
  alternates: { canonical: "/services" },
};

function serviceIcon(id: ServiceId): LucideIcon {
  switch (id) {
    case "cfcs-pcs":
      return HeartHandshake;
    case "va":
      return Shield;
    case "private-pay":
      return Users;
    case "hcbs":
      return Home;
    case "pcca":
      return HeartPulse;
    default:
      return assertNever(id);
  }
}

function ServiceResourceLink({ link }: { link: ServiceLink }) {
  const className =
    "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-teal/10";

  switch (link.kind) {
    case "external":
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          {link.label}
          <ArrowUpRight className="size-3.5 shrink-0 text-orange" />
        </a>
      );
    case "phone":
      return (
        <a href={link.href} className={className}>
          {link.label}
        </a>
      );
    case "internal":
      return (
        <Link href={link.href} className={className}>
          {link.label}
        </Link>
      );
    default:
      return assertNever(link.kind);
  }
}

function PrimaryCta({ link }: { link: ServiceLink }) {
  const className = cn(
    buttonVariants({ variant: "default", size: "lg" }),
    "mt-5 h-11 rounded-full px-5"
  );

  switch (link.kind) {
    case "external":
      return (
        <a href={link.href} target="_blank" rel="noreferrer" className={className}>
          {link.label}
          <ArrowUpRight className="size-4" />
        </a>
      );
    case "phone":
      return (
        <a href={link.href} className={className}>
          <Phone className="size-4" />
          {link.label}
        </a>
      );
    case "internal":
      return (
        <Link href={link.href} className={className}>
          {link.label}
        </Link>
      );
    default:
      return assertNever(link.kind);
  }
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Home care services in Missoula and Great Falls"
        description="In-home personal care through Montana Medicaid and VA pathways, private pay, and approved pediatric complex care support."
        note={site.eligibilityDisclaimer}
      />

      <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 pt-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        {serviceBlocks.map((service) => {
          const Icon = serviceIcon(service.id);
          return (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="rounded-2xl border-l-[5px] border-teal bg-card px-4 py-4 text-left shadow-[0_10px_28px_-14px_rgba(0,52,65,0.18)] ring-1 ring-foreground/5 transition-colors hover:bg-teal/[0.04]"
            >
              <Icon className="size-5 text-teal" aria-hidden="true" />
              <p className="mt-3 font-heading text-base leading-snug">
                {service.chip ?? service.program}
              </p>
            </a>
          );
        })}
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
        <div className="relative aspect-[21/8] overflow-hidden rounded-[1.5rem] bg-secondary">
          <Image
            src="/images/services-care.jpg"
            alt="A caregiver helping an older woman with her cardigan at home"
            fill
            className="object-cover object-[center_25%]"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 sm:py-12">
        {serviceBlocks.map((service) => {
          const Icon = serviceIcon(service.id);
          return (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-36 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.2)] ring-1 ring-foreground/5 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Icon className="size-5 text-teal" aria-hidden="true" />
                {service.program.toLowerCase() !== service.title.toLowerCase() ? (
                  <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
                    {service.program}
                  </p>
                ) : null}
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl">{service.title}</h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {service.body}
              </p>
              {service.bullets && service.bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-base text-muted-foreground">
                  {service.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {service.primaryCta ? <PrimaryCta link={service.primaryCta} /> : null}
              {service.links.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.links.map((link) => (
                    <li key={`${service.id}-${link.href}`}>
                      <ServiceResourceLink link={link} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          );
        })}
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 pb-2 sm:px-6">
        <div className="rounded-[1.5rem] bg-teal/[0.05] p-6 ring-1 ring-foreground/5 sm:p-8">
          <h2 className="text-2xl sm:text-3xl">Eligibility contacts</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Medicaid and waiver screening numbers. Request care if you need help
            with the next step.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {servicesContactCluster.map((link) => (
              <li key={link.href + link.label}>
                <ServiceResourceLink link={link} />
              </li>
            ))}
            <li>
              <ServiceResourceLink
                link={{
                  label: "Request care",
                  href: "/contact",
                  kind: "internal",
                }}
              />
            </li>
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        body="Tell us what a typical day looks like. We will point you to the right official pages and what we can provide."
        showOfficePhones={false}
      />
    </>
  );
}
