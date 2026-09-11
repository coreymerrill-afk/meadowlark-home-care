import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, Home, Stethoscope, Users } from "lucide-react";
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
          src="/images/hero-home.jpg"
          alt="A caregiver and an older man looking through a photo album at home"
          fill
          priority
          className="object-cover object-[center_42%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal/55 via-teal/30 to-teal/10" />
        <div className="relative mx-auto flex min-h-[28rem] w-full max-w-6xl flex-col justify-end px-4 py-12 sm:min-h-[34rem] sm:px-6 sm:py-16 lg:min-h-[38rem] lg:justify-center">
          <p className="text-sm font-medium tracking-[0.12em] text-white/80 uppercase">
            Missoula, Montana · Since {site.foundedYear}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Quality home care in Missoula.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Agency-based CFCS/PCS, waiver supports, nursing, private pay, and VA
            Community Care — in the home.
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

      <section className="border-b border-border/70 bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col divide-y divide-border/80 sm:flex-row sm:divide-x sm:divide-y-0">
          <Link
            href="/contact"
            className="flex flex-1 flex-col justify-center px-4 py-5 text-center transition-colors hover:bg-teal/[0.05] sm:px-6"
          >
            <p className="font-heading text-lg">Need care?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Contact us about services
            </p>
          </Link>
          <Link
            href="/work-with-us"
            className="flex flex-1 flex-col justify-center px-4 py-5 text-center transition-colors hover:bg-teal/[0.05] sm:px-6"
          >
            <p className="font-heading text-lg">Join the team</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Work with us in Missoula or Great Falls
            </p>
          </Link>
          <a
            href={site.phoneHref}
            className="flex flex-1 flex-col justify-center px-4 py-5 text-center transition-colors hover:bg-teal/[0.05] sm:px-6"
          >
            <p className="font-heading text-lg">{site.phone}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Call the Missoula office
            </p>
          </a>
        </div>
      </section>

      <section className="bg-teal/[0.05]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
                What we do
              </p>
              <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
                Four ways we help people stay home.
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

          <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2">
            {serviceBlocks.map((service) => {
              const Icon = serviceIcon(service.id);
              return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group flex h-full flex-col rounded-2xl border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 transition-colors hover:bg-card/80"
              >
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-2xl">{service.chip ?? service.program}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-secondary">
            <Image
              src="/images/family-learning.jpg"
              alt="A family member and an older woman reviewing caregiver education materials at a kitchen table"
              fill
              className="object-cover object-[center_20%]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.12em] text-primary uppercase">
              <BookOpen className="size-4" />
              Family Learning Center
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">
              Family Learning Center
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Created with the Institute for Professional Care Education. Topics
              include caregiving, nursing, companion care, and respite. Ask us
              about access — we do not publish an open enrollment link.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              {learningTopics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full bg-card px-3 py-2 text-center font-medium ring-1 ring-teal/25"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-primary underline-offset-4 hover:underline"
            >
              Ask us about access
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need care at home?"
        body="Call the Missoula office. Caregivers apply from the header or footer."
      />
    </>
  );
}
