import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Leaf, Sparkles } from "lucide-react";

import { ApplyButton } from "@/components/apply-button";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Join Meadowlark Home Care in Missoula or the Great Falls area. Apply online through AxisCare. We promote from within and offer paid time off and incremental raises.",
  alternates: { canonical: "/work-with-us" },
};

const culture = [
  {
    icon: Heart,
    title: "Trust first",
    body: "We rely on mutual trust and respect so caregivers and clients both have a smoother day.",
  },
  {
    icon: Leaf,
    title: "Room to grow",
    body: "Advanced positions are drawn from people who have already shown they are trustworthy and reliable.",
  },
  {
    icon: Sparkles,
    title: "Care is the work",
    body: "The goal is a comfortable place of employment that lets us do what we do best: care for others.",
  },
] as const;

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="Come work with us at Meadowlark."
        description="We hire in Missoula and the Great Falls area. If you prove yourself to us, we will do the same for you."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-secondary">
          <Image
            src="/images/careers-team.jpg"
            alt="Two colleagues talking over coffee in a bright, informal workspace"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl">A workplace built for caregivers</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Meadowlark was founded with the vision of a comfortable place to
            work — one that lets the team focus on care. We look for reliable,
            positive people so the environment stays steady for clients and for
            fellow caregivers.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Working here also means a chance to grow. Advancement is real, and
            it starts with the people already on the team.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="max-w-xl text-3xl sm:text-4xl">How we take care of the team</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {culture.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-card p-6 ring-1 ring-foreground/8"
              >
                <item.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-secondary/80 p-6">
              <h3 className="text-2xl">Paid time off</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Incremental paid time off is one of the ways we reward our most
                caring, dependable team members.
              </p>
            </div>
            <div className="rounded-2xl bg-secondary/80 p-6">
              <h3 className="text-2xl">Raises and advancement</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Incremental raises recognize good work. Leadership roles are
                filled from people who have already earned trust here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-[2rem] bg-teal px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-medium tracking-[0.16em] text-orange uppercase">
            Apply now
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            Start with the AxisCare application.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
            Caregivers apply online through AxisCare. You can also browse listed
            roles on our Hireology board. Questions about Missoula or Great
            Falls can go to{" "}
            <a href={site.careersEmailHref} className="underline underline-offset-4">
              {site.careersEmail}
            </a>
            .
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ApplyButton />
            <a
              href={site.hireologyUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 justify-center rounded-full border-white/25 bg-transparent px-6 text-base text-white hover:bg-white/10"
              )}
            >
              Hireology careers board
              <ArrowUpRight />
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-12 justify-center rounded-full px-6 text-base text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Know someone who would thrive here?"
        body="Share the application link, or send them to our office in Missoula."
      />
    </>
  );
}
