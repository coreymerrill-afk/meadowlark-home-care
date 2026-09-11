import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meadowlark Home Care was founded in 2015 by Corey Merrill and Natalie Redman to change home care in Missoula for the better.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A different way to run home care."
        description={`Founded in ${site.foundedYear} by Corey Merrill and Natalie Redman, Meadowlark was built to change home care in our community for the better.`}
      />

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl">The founders’ story</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
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
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
              Mission
            </p>
            <h2 className="mt-2 text-3xl">
              Quality care through compassion and innovation.
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Meadowlark strives to provide the best in care and employment for
              our members and caregivers — a positive, caring environment that
              can be felt by the entire care team and the people we serve.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
              How we work
            </p>
            <h2 className="mt-2 text-3xl">Take charge of care or work.</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Families can ask for help at home. Caregivers can build a career
              here. Either way, the invitation is the same: become part of the
              Meadowlark Home Care family.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
