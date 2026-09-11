import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, HeartHandshake, Home, Phone, Stethoscope, Users } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { assertNever, getStartedLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Montana CFCS/PCS, Medicaid HCBS waiver supports, skilled nursing, private pay, and VA coverage options for home care in Missoula.",
  alternates: { canonical: "/services" },
};

type ServiceLink = {
  label: string;
  href: string;
  kind: "external" | "phone";
};

type ServiceCard = {
  id: string;
  program: string;
  title: string;
  icon: LucideIcon;
  body: string;
  links: ServiceLink[];
  primaryCta?: ServiceLink;
};

const services: ServiceCard[] = [
  {
    id: "cfcs-pcs",
    program: "CFCS/PCS (formerly CFC/PAS)",
    title: "Help at home through Montana Medicaid",
    icon: HeartHandshake,
    body: "If you already have Montana Medicaid—or you’re applying—you may qualify for in-home personal care through Community First Choice Services (CFCS) and Personal Care Services (PCS) (formerly CFC/PAS). These help with everyday needs like bathing, dressing, meals, and light household tasks so you can stay safely at home. Meadowlark can be your agency-based provider once services are authorized. We don’t decide Medicaid eligibility—that’s the Office of Public Assistance—but we can walk you through what to expect and coordinate care after you’re approved.",
    links: [
      {
        label: "Apply for Montana Medicaid",
        href: site.links.applyMedicaid,
        kind: "external",
      },
      {
        label: "Montana CFCS/PCS program",
        href: site.links.cfcsPcs,
        kind: "external",
      },
      {
        label: `Office of Public Assistance ${site.opaPhone}`,
        href: site.opaPhoneHref,
        kind: "phone",
      },
    ],
  },
  {
    id: "waiver",
    program: "Medicaid HCBS waiver",
    title: "Extra support through a Medicaid waiver",
    icon: Home,
    body: "HCBS waivers—like Montana’s Big Sky Waiver—can cover supports beyond standard personal care when you meet Medicaid and level-of-care rules. Depending on your plan, that may include homemaker help, specially trained attendants, habilitation support, respite, and other authorized services. If you’re already on a waiver (or being screened), Meadowlark can serve as your provider agency for the services we’re approved to deliver under your plan.",
    links: [
      {
        label: "Big Sky Waiver program",
        href: site.links.bigSkyWaiver,
        kind: "external",
      },
      {
        label: "Montana HCBS waiver information sheet (PDF)",
        href: site.links.hcbsWaiverPdf,
        kind: "external",
      },
      {
        label: `Mountain Pacific ${site.mountainPacific.label}`,
        href: site.mountainPacific.href,
        kind: "phone",
      },
    ],
  },
  {
    id: "nursing",
    program: "Skilled nursing",
    title: "Skilled nursing at home",
    icon: Stethoscope,
    body: "When needs go beyond caregiver support, Meadowlark can provide skilled nursing—medication support, bowel-care programs, and ongoing care for ostomies, tracheostomies, catheters, and similar needs. Nursing may be private pay or another third-party funder.",
    links: [],
    primaryCta: {
      label: `Call ${site.phone}`,
      href: site.phoneHref,
      kind: "phone",
    },
  },
  {
    id: "private-pay",
    program: "Private pay, VA, and third party",
    title: "Paying privately—or using VA / other coverage",
    icon: Users,
    body: "Not on Medicaid? Families often pay privately for live-in care, companion support, personal assistance, or respite. Veterans may explore Aid & Attendance or Homemaker/Home Health Aide services through VA. We don’t decide VA eligibility; we’re happy to explain how our services can fit once your funding path is clear.",
    links: [
      {
        label: "VA Aid & Attendance",
        href: site.links.vaAidAttendance,
        kind: "external",
      },
      {
        label: "VA Homemaker and Home Health Aide care",
        href: site.links.vaHomemaker,
        kind: "external",
      },
      {
        label: "Apply for VA health care",
        href: site.links.vaApply,
        kind: "external",
      },
    ],
  },
];

function ServiceResourceLink({ link }: { link: ServiceLink }) {
  switch (link.kind) {
    case "external":
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-teal/10"
        >
          {link.label}
          <ArrowUpRight className="size-3.5 shrink-0 text-orange" />
        </a>
      );
    case "phone":
      return (
        <a
          href={link.href}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-teal/10"
        >
          {link.label}
        </a>
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
        title="Home care shaped around daily life."
        description="Montana Medicaid personal care, HCBS waiver supports, skilled nursing, private pay, and VA coverage options — delivered in the home. Meadowlark does not decide eligibility."
      />

      <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 pt-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {services.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className="rounded-2xl border border-orange/50 bg-card px-4 py-4 text-left shadow-sm ring-1 ring-foreground/4 transition-colors hover:border-orange hover:bg-orange/8"
          >
            <service.icon className="size-5 text-orange" aria-hidden="true" />
            <p className="mt-3 font-heading text-base leading-snug">{service.program}</p>
            <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
              Jump to details
            </p>
          </a>
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 sm:py-12">
        {services.map((service, index) => (
          <article
            key={service.id}
            id={service.id}
            className="scroll-mt-36 rounded-[1.5rem] border-l-4 border-orange bg-card p-5 shadow-sm ring-1 ring-foreground/6 sm:p-8"
          >
            <p className="text-sm font-medium tracking-[0.16em] text-primary uppercase">
              {String(index + 1).padStart(2, "0")} · {service.program}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{service.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
              {service.body}
            </p>
            {service.primaryCta ? (
              <a
                href={service.primaryCta.href}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "mt-5 h-11 rounded-full px-5"
                )}
              >
                <Phone className="size-4" />
                {service.primaryCta.label}
              </a>
            ) : null}
            {service.links.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.links.map((link) => (
                  <li key={link.href}>
                    <ServiceResourceLink link={link} />
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}

        <section
          id="get-started"
          className="scroll-mt-36 rounded-[1.5rem] bg-teal px-5 py-7 text-white sm:px-8"
        >
          <p className="text-sm font-medium tracking-[0.16em] text-orange uppercase">
            How to get started
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Official pages first. Then call us.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">
            Meadowlark does not decide Medicaid or VA eligibility. Use these
            official links to apply or learn more, then call the Missoula office
            if you want help navigating the next step.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {getStartedLinks.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/15"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-orange" />
                  </a>
                ) : (
                  <a
                    href={link.href}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/15"
                  >
                    <span>{link.label}</span>
                    <Phone className="size-4 shrink-0 text-orange" />
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/75">
            Prefer a message?{" "}
            <Link href="/contact" className="font-medium text-white underline underline-offset-4">
              Contact the office
            </Link>
            .
          </p>
        </section>
      </div>

      <CtaBand
        title="Not sure which service fits?"
        body="Tell us what a typical day looks like. We will point you toward the right official pages and what we can provide."
      />
    </>
  );
}
