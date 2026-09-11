import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meadowlark Home Care was founded in 2015 by Corey Merrill and Natalie Redman to change home care in Missoula for the better.",
  alternates: { canonical: "/about" },
};

const placeholders = [
  {
    quote:
      "Add a short quote from a family about reliability, communication, or how care felt at home.",
    attribution: "Placeholder — family member",
  },
  {
    quote:
      "Add a short quote from a member about staying independent or feeling respected.",
    attribution: "Placeholder — member",
  },
  {
    quote:
      "Add a short quote from a caregiver about culture, scheduling, or being trusted to do good work.",
    attribution: "Placeholder — caregiver",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A different way to run home care."
        description={`Founded in ${site.foundedYear} by Corey Merrill and Natalie Redman, Meadowlark was built to change home care in our community for the better.`}
      />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl">The founders’ story</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Corey Merrill and Natalie Redman started Meadowlark Home Care in{" "}
              {site.foundedYear} with a single mission: to change the home care
              industry in our community for the better.
            </p>
            <p>
              With more than two decades of combined experience, they knew what
              works — and what does not — in home care. A different solution was
              needed: one that treats employees well enough that families can
              count on consistent care.
            </p>
            <p>
              Providing a positive workplace means the family members and
              friends we serve get the reliable, thoughtful care they deserve.
              Technology and a clearer administrative structure help the team
              stay focused on people, not paperwork for its own sake.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-secondary">
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
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium tracking-[0.16em] text-primary uppercase">
              Mission
            </p>
            <h2 className="mt-3 text-3xl">
              Quality care through compassion and innovation.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Meadowlark strives to provide the best in care and employment for
              our members and caregivers — a positive, caring environment that
              can be felt by the entire care team and the people we serve.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium tracking-[0.16em] text-primary uppercase">
              How we work
            </p>
            <h2 className="mt-3 text-3xl">Take charge of care or work.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Families can ask for help at home. Caregivers can build a career
              here. Either way, the invitation is the same: become part of the
              Meadowlark Home Care family.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.16em] text-primary uppercase">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl">What people say</h2>
          <p className="mt-3 text-muted-foreground">
            These cards are labeled placeholders so we do not invent quotes.
            Replace each one with a real comment before launch if you have
            permission to share it.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {placeholders.map((item) => (
            <figure
              key={item.attribution}
              className="flex flex-col rounded-2xl bg-card p-6 ring-1 ring-foreground/8"
            >
              <span className="w-fit rounded-full bg-gold/30 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-gold-foreground uppercase">
                Placeholder
              </span>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium">
                {item.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
