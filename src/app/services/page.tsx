import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  HeartHandshake,
  Home,
  Phone,
  Stethoscope,
  Users,
} from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import {
  serviceBlocks,
  type ServiceId,
  type ServiceLink,
} from "@/lib/services";
import { assertNever, getStartedLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Services that help you stay home in Missoula: Montana CFCS/PCS, HCBS waiver supports, skilled nursing, private pay, and VA or other coverage.",
  alternates: { canonical: "/services" },
};

function serviceIcon(id: ServiceId): LucideIcon {
  switch (id) {
    case "cfcs-pcs":
      return HeartHandshake;
    case "hcbs-waiver":
      return Home;
    case "nursing":
      return Stethoscope;
    case "private-pay":
      return Users;
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
        title="Services that help you stay home in Missoula"
        description="Montana Medicaid personal care, HCBS waiver supports, skilled nursing, private pay, and VA or other coverage — delivered in the home. Meadowlark does not decide eligibility. The State of Montana and the VA do."
      />

      <section
        id="get-started"
        className="border-b border-border bg-teal text-white"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:py-5">
          <p className="text-xs font-semibold tracking-[0.12em] text-orange uppercase">
            How to get started
          </p>
          <ul className="flex flex-col gap-2 text-sm font-medium sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            {getStartedLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                >
                  {link.label}
                  {link.external ? (
                    <ArrowUpRight className="size-3.5 text-orange" />
                  ) : (
                    <Phone className="size-3.5 text-orange" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 pt-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
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
              <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                Jump to details
              </p>
            </a>
          );
        })}
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 sm:py-12">
        {serviceBlocks.map((service, index) => {
          const Icon = serviceIcon(service.id);
          return (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-36 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.2)] ring-1 ring-foreground/5 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Icon className="size-5 text-teal" aria-hidden="true" />
                {service.chip ? (
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold tracking-[0.04em] text-foreground">
                    {service.chip}
                  </span>
                ) : (
                  <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
                    {String(index + 1).padStart(2, "0")} · {service.program}
                  </p>
                )}
              </div>
              {service.chip ? (
                <p className="mt-3 text-sm font-medium tracking-[0.12em] text-primary uppercase">
                  {String(index + 1).padStart(2, "0")} · {service.program}
                </p>
              ) : null}
              <h2 className="mt-2 text-3xl sm:text-4xl">{service.title}</h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {service.body}
              </p>
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

      <CtaBand
        title="Not sure which service fits?"
        body="Tell us what a typical day looks like. We will point you toward the right official pages and what we can provide. Eligibility is decided by the state or the VA—not by Meadowlark."
      />
    </>
  );
}
