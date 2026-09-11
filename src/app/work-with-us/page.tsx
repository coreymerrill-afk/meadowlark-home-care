import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Leaf, Sparkles } from "lucide-react";

import { ApplyButton } from "@/components/apply-button";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Join Meadowlark Home Care in Missoula or the Great Falls area. Apply online through AxisCare. We promote from within and offer paid time off and incremental raises.",
  alternates: { canonical: "/work-with-us" },
};

const facts = [
  {
    icon: Heart,
    title: "Missoula and Great Falls",
    body: `We hire in both areas. Questions go to ${site.careersEmail}.`,
  },
  {
    icon: Leaf,
    title: "Paid time off",
    body: "Incremental PTO for dependable team members.",
  },
  {
    icon: Sparkles,
    title: "Raises and advancement",
    body: "Incremental raises. Leadership roles are filled from people who have already earned trust here.",
  },
] as const;

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="Come work with us at Meadowlark."
        description="We hire in Missoula and the Great Falls area. If you prove yourself to us, we will do the same for you."
        actions={<ApplyButton>Apply online</ApplyButton>}
      />

      <section className="border-b border-teal/10 bg-teal/[0.07]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
              Start here
            </p>
            <p className="mt-1 text-base text-muted-foreground">
              Caregivers apply on AxisCare. Listed roles also appear on Hireology.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <ApplyButton className="hidden sm:inline-flex">Apply on AxisCare</ApplyButton>
            <a
              href={site.hireologyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Browse listed roles on Hireology
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-secondary">
          <Image
            src="/images/careers-team.jpg"
            alt="A caregiver helping an older woman stand in her kitchen"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl">Promote from within</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Advanced positions are drawn from people already on the team who
            have shown they are trustworthy and reliable.
          </p>
        </div>
      </section>

      <section className="bg-teal/[0.05]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="max-w-xl text-3xl sm:text-4xl">Hiring details</h2>
          <div className="mt-8 grid items-stretch gap-6 md:grid-cols-3">
            {facts.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-2xl border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5"
              >
                <item.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-2xl">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Questions about Missoula or Great Falls can go to{" "}
            <a href={site.careersEmailHref} className="font-medium text-primary underline-offset-4 hover:underline">
              {site.careersEmail}
            </a>
            . You can also{" "}
            <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
              send a message
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to apply?"
        body="Use Apply online in the header, or call the Missoula office."
      />
    </>
  );
}
