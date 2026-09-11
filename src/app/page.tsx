import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, Home, Shield, Stethoscope, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ApplyButton } from "@/components/apply-button";
import { CtaBand } from "@/components/cta-band";
import { buttonVariants } from "@/components/ui/button";
import { serviceBlocks, type ServiceId } from "@/lib/services";
import { assertNever, site } from "@/lib/site";
import { cn } from "@/lib/utils";

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
    case "va-third-party":
      return Shield;
    default:
      return assertNever(id);
  }
}

const learningTopics = [
  "Caregiving",
  "Nursing",
  "Companion care",
  "Respite and family support",
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[28rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[38rem]">
        <Image
          src="/images/hero-mountains.jpg"
          alt="Mountain lake at sunrise with evergreen forest along the shore"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal/85 via-teal/55 to-teal/25" />
        <div className="relative mx-auto flex min-h-[28rem] w-full max-w-6xl flex-col justify-end px-4 py-14 sm:min-h-[34rem] sm:px-6 sm:py-20 lg:min-h-[38rem] lg:justify-center">
          <p className="text-sm font-medium tracking-[0.16em] text-white/80 uppercase">
            Missoula, Montana · Since {site.foundedYear}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Quality home care in Missoula.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            {site.missionLine}. Care for members at home — and a workplace built
            on trust for caregivers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 justify-center rounded-full bg-white px-6 text-base text-teal hover:bg-white/90"
              )}
            >
              Request care
            </Link>
            <ApplyButton />
          </div>
          <p className="mt-5 text-sm text-white/80">
            Call{" "}
            <a href={site.phoneHref} className="font-medium text-white underline-offset-4 hover:underline">
              {site.phone}
            </a>{" "}
            · {site.address.street}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <Link
            href="/contact"
            className="rounded-2xl border-2 border-orange/70 px-4 py-5 text-center transition-colors hover:bg-orange/8"
          >
            <p className="font-heading text-lg">Need care?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Contact us about services
            </p>
          </Link>
          <Link
            href="/work-with-us"
            className="rounded-2xl border-2 border-orange/70 px-4 py-5 text-center transition-colors hover:bg-orange/8"
          >
            <p className="font-heading text-lg">Join the team</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Work with us in Missoula or Great Falls
            </p>
          </Link>
          <a
            href={site.applyUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border-2 border-orange/70 px-4 py-5 text-center transition-colors hover:bg-orange/8"
          >
            <p className="font-heading text-lg">Apply online</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Caregiver application via AxisCare
            </p>
          </a>
          <a
            href={site.phoneHref}
            className="rounded-2xl border-2 border-orange/70 px-4 py-5 text-center transition-colors hover:bg-orange/8"
          >
            <p className="font-heading text-lg">{site.phone}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Call the Missoula office
            </p>
          </a>
        </div>
      </section>

      <section className="bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium tracking-[0.16em] text-primary uppercase">
                What we do
              </p>
              <h2 className="mt-3 max-w-xl text-3xl sm:text-4xl">
                Care that fits the home you already have.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              See all services
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceBlocks.map((service) => {
              const Icon = serviceIcon(service.id);
              return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group rounded-2xl border-l-4 border-orange bg-card p-5 shadow-sm ring-1 ring-foreground/6 transition-colors hover:bg-secondary/40"
              >
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-2xl">{service.chip ?? service.program}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-secondary">
            <Image
              src="/images/family-learning.jpg"
              alt="A person writing notes at a table with a cup of coffee nearby"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.16em] text-primary uppercase">
              <BookOpen className="size-4" />
              Family Learning Center
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Resources for families, friends, and caregivers.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Meadowlark Home Care offers the Family Learning Center, created
              with the Institute for Professional Care Education. It helps
              families, friends, caregivers, and other health care professionals
              understand the challenges some members of our community face —
              topics such as caregiving, nursing, companion care, and respite
              and family support.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
              {learningTopics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full bg-secondary px-3 py-2 text-center font-medium"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Ask us about access when you call or send a message.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Contact us for services — or become part of the team."
        body="The same office helps families start care and helps caregivers apply."
      />
    </>
  );
}
