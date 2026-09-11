import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Nursing, Medicaid CFC/PAS, HCBS waiver services, and private-pay, VA, or third-party home care in Missoula, Montana.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    id: "nursing",
    eyebrow: "Skilled support at home",
    title: "Nursing",
    intro:
      "In a home care setting, nurses can provide skilled support that a regular caregiver cannot. Whether you pay privately or have funding through a third party, Meadowlark can arrange qualified nursing for those needs.",
    items: [
      "Medication management and refills",
      "Bowel care programs and management",
      "Skilled nursing care",
      "Ongoing care for ostomies, tracheostomies, catheters, and similar supports",
    ],
  },
  {
    id: "cfc-pas",
    eyebrow: "Montana Medicaid",
    title: "CFC / Medicaid PAS",
    intro:
      "If you receive Medicaid services, you may be eligible for personal assistance services in Montana. Personal Assistance Services (PAS) are available under the state’s Community First Choice (CFC) program for members who qualify. These services can help with daily living activities such as:",
    items: [
      "Meal preparation and eating",
      "Bathing and general hygiene",
      "Light housekeeping",
      "Shopping and community integration",
    ],
  },
  {
    id: "waiver",
    eyebrow: "HCBS",
    title: "Medicaid Waiver / HCBS",
    intro:
      "If you are an eligible Medicaid member and receive waiver services through Home and Community Based Services (HCBS), Meadowlark can serve as your provider agency. Waiver services go beyond the typical Medicaid CFC program. From a provider perspective, they can include:",
    items: [
      "Social supervision services",
      "Homemaker services",
      "Specially trained attendants",
      "Habilitation aide support",
    ],
  },
  {
    id: "private-pay",
    eyebrow: "Outside Medicaid",
    title: "Private pay, VA, and third party",
    intro:
      "If you need a little assistance at home and are not on Medicaid, we can still help. Any of the services we provide can be privately paid for, or arranged through another third party such as the VA or certain private health insurances:",
    items: [
      "Live-in caregiving or nursing",
      "Companion care or social outings",
      "Personal assistance services",
      "Respite or hospice support",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Home care shaped around daily life."
        description="Nursing, Medicaid personal assistance, waiver services, and privately arranged care — all delivered in the home."
      />

      <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 pt-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {services.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className="rounded-2xl border-2 border-orange/70 bg-card px-4 py-5 text-center transition-colors hover:bg-orange/8"
          >
            <p className="font-heading text-lg">{service.title}</p>
            <p className="mt-1 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {service.eyebrow}
            </p>
          </a>
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-14 sm:px-6 sm:py-16">
        {services.map((service, index) => (
          <article
            key={service.id}
            id={service.id}
            className="scroll-mt-36 rounded-[1.75rem] bg-card p-6 ring-1 ring-foreground/8 sm:p-10"
          >
            <p className="text-sm font-medium tracking-[0.16em] text-primary uppercase">
              {String(index + 1).padStart(2, "0")} · {service.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">{service.title}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              {service.intro}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-secondary/70 px-4 py-3 text-sm font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <aside className="rounded-[1.75rem] border border-dashed border-primary/25 bg-secondary/40 px-6 py-6 text-sm leading-relaxed text-muted-foreground sm:px-8">
          Eligibility for Medicaid CFC, PAS, and waiver programs is determined
          by the State of Montana, not by Meadowlark. We can help you understand
          what we provide as an agency and how to get in touch —{" "}
          <Link href="/contact" className="font-medium text-foreground underline-offset-4 hover:underline">
            start with a conversation
          </Link>
          .
        </aside>
      </div>

      <CtaBand title="Not sure which service fits?" body="Tell us what a typical day looks like. We will point you in the right direction." />
    </>
  );
}
