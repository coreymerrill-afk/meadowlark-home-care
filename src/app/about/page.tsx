import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meadowlark Home Care was founded in 2015 by Corey Merrill and Natalie Redman. Agency-based CFCS/PCS, waiver supports, nursing, private pay, insurance, VA Community Care, and respite in Missoula.",
  alternates: { canonical: "/about" },
};

const offerings = [
  "Agency-based CFCS/PCS (formerly CFC/PAS)",
  "HCBS Big Sky, SDMI, and DD waiver supports",
  "Skilled nursing at home",
  "Private pay, insurance, and VA Community Care",
  "Respite — we do not provide hospice",
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Home care in Missoula."
        description="An agency-based provider for personal care, waiver supports, nursing, private pay, and veterans’ pathways."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl">The founders</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Corey Merrill and Natalie Redman started Meadowlark Home Care in{" "}
            {site.foundedYear}. Combined, they brought more than two decades of
            home-care experience and built a workplace that treats caregivers
            well enough that families can count on consistent care.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-secondary">
          <Image
            src="/images/about-missoula.jpg"
            alt="The Clark Fork River running through Missoula, Montana"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <p className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-[0.7rem] text-muted-foreground backdrop-blur">
            Photo: w_lemay,{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Clark_Fork_River,_Missoula,_MT.jpg"
              className="underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              CC BY-SA 2.0
            </a>
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
            What we provide
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl">What we offer in the home.</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {offerings.map((item) => (
              <li
                key={item}
                className="rounded-2xl border-l-[5px] border-teal bg-card px-4 py-4 text-base shadow-[0_10px_28px_-14px_rgba(0,52,65,0.18)] ring-1 ring-foreground/5"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
            {site.eligibilityDisclaimer}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
