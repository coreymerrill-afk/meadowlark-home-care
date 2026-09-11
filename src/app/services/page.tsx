import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Home, Stethoscope, Users } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Skilled nursing, agency-based Montana CFCS/PCS, Big Sky / SDMI / DD waiver supports, private pay, and VA Community Care in Missoula.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    id: "nursing",
    eyebrow: "Skilled support at home",
    title: "Skilled nursing",
    icon: Stethoscope,
    intro:
      "Nurses can do work in the home that a regular caregiver cannot. If a typical day includes medication, a bowel program, or ongoing device care, a nurse may be the right person — whether you pay privately or have another funding source.",
    items: [
      "Medication management and refill coordination",
      "Bowel care programs and follow-through",
      "Skilled nursing visits",
      "Ongoing ostomy, tracheostomy, and catheter support",
    ],
  },
  {
    id: "cfc-pas",
    eyebrow: "Montana Medicaid entitlement",
    title: "CFCS / PCS (agency-based)",
    icon: HeartHandshake,
    intro:
      "Meadowlark is an agency-based provider for Montana’s Community First Choice and Personal Assistance programs. The state is renaming them CFCS and PCS. If you are eligible, this is an entitlement — there is no wait list for the program itself. The help is everyday support so you can stay in your own home.",
    items: [
      "Meal preparation and eating",
      "Bathing and general hygiene",
      "Light housekeeping",
      "Shopping and community integration",
    ],
  },
  {
    id: "waiver",
    eyebrow: "HCBS waivers",
    title: "Big Sky, SDMI, and DD waivers",
    icon: Home,
    intro:
      "Meadowlark serves members on Montana’s Big Sky, Severe Disabling Mental Illness (SDMI), and Developmental Disabilities (DD) waivers, as authorized on each person’s plan. Waiver supports go beyond typical CFCS/PCS. Some waivers have wait lists, and the state decides who is enrolled — not Meadowlark.",
    items: [
      "Social supervision — someone present when that is part of your plan",
      "Homemaker help with household tasks you cannot safely do yourself",
      "Specially trained attendants for more involved daily support",
      "Habilitation aide support that helps you practice and keep daily skills",
    ],
  },
  {
    id: "private-pay",
    eyebrow: "Private pay, insurance, and VA",
    title: "Private pay, third party, and VA Community Care",
    icon: Users,
    intro:
      "You do not have to be on Medicaid to ask for help. Meadowlark provides non-skilled home care through private pay and certain third-party insurance. We are a VA-contracted Community Care provider, and we also help veterans who use private pay or Aid & Attendance. The VA decides eligibility; we deliver the care it authorizes. We offer respite, and we can support a household when hospice is already in place — we are not a hospice provider.",
    items: [
      "Non-skilled home care paid privately or by third-party insurance",
      "Live-in caregiving, companion care, and social outings",
      "VA Community Care and Aid & Attendance, when authorized",
      "Respite, and support when hospice is already in place",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Home care shaped around daily life."
        description="Nursing, agency-based Montana personal assistance, Big Sky / SDMI / DD waiver supports, private pay, and VA Community Care — all delivered in the home."
      />

      <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 pt-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {services.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className="rounded-2xl border border-orange/50 bg-card px-4 py-4 text-left shadow-sm ring-1 ring-foreground/4 transition-colors hover:border-orange hover:bg-orange/8"
          >
            <service.icon className="size-5 text-orange" aria-hidden="true" />
            <p className="mt-3 font-heading text-base leading-snug">{service.title}</p>
            <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
              {service.eyebrow}
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
              {String(index + 1).padStart(2, "0")} · {service.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{service.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
              {service.intro}
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-secondary/80 px-4 py-3 text-sm leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <section
          id="eligibility"
          className="scroll-mt-36 rounded-[1.5rem] bg-teal px-5 py-8 text-white sm:px-8"
        >
          <p className="text-sm font-medium tracking-[0.16em] text-orange uppercase">
            Eligibility and signup
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl">
            Montana and the VA decide eligibility. We help you navigate.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">
            Meadowlark does not approve Medicaid or VA benefits. CFCS/PCS is an
            entitlement if you are eligible. Waiver enrollment — including Big
            Sky, SDMI, and DD — is decided by the state, and some waivers have
            wait lists. These official pages are the starting point.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">
            Call Meadowlark at{" "}
            <a href={site.phoneHref} className="font-medium text-white underline underline-offset-4">
              {site.phone}
            </a>{" "}
            if you want a person to walk through the next step. Montana Office
            of Public Assistance:{" "}
            <a href={site.opaPhoneHref} className="font-medium text-white underline underline-offset-4">
              {site.opaPhone}
            </a>
            . Mountain Pacific Quality Health (confirm the current line on the{" "}
            <a
              href="https://dphhs.mt.gov/sltc/csb/CFCS-PCS"
              className="font-medium text-white underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              DPHHS CFCS/PCS page
            </a>
            ):{" "}
            {site.mountainPacific.map((phone, index) => (
              <span key={phone.href}>
                {index > 0 ? ", " : ""}
                <a href={phone.href} className="font-medium text-white underline underline-offset-4">
                  {phone.label}
                </a>
              </span>
            ))}
            .
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {site.officialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/15"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-orange" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/75">
            Ready to talk about what Meadowlark can provide?{" "}
            <Link href="/contact" className="font-medium text-white underline underline-offset-4">
              Send a message
            </Link>{" "}
            or call the Missoula office.
          </p>
        </section>
      </div>

      <CtaBand
        title="Not sure which service fits?"
        body="Tell us what a typical day looks like. We will point you toward the right program pages and what we can provide."
      />
    </>
  );
}
