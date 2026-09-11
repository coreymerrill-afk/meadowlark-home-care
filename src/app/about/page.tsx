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
        title={`Founded in Missoula in ${site.foundedYear}.`}
        description="Corey Merrill and Natalie Redman started Meadowlark Home Care to change home care in this community for the better."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl">The founders</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Corey Merrill and Natalie Redman opened Meadowlark Home Care in{" "}
              {site.foundedYear}. Combined, they brought more than two decades
              of home-care experience — and a workplace that treats caregivers
              well enough that families can count on consistent care.
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
              For members at home and for the caregivers who work here.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
              Who we serve
            </p>
            <h2 className="mt-2 text-3xl">Members at home. Caregivers on the team.</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Families request care. Caregivers apply through AxisCare. The
              Missoula office handles both.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
