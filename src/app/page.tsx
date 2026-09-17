import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, HeartPulse, Home, Shield, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ApplyButton } from "@/components/apply-button";
import { CtaBand } from "@/components/cta-band";
import { buttonVariants } from "@/components/ui/button";
import { homeServiceTeasers, type HomeTeaserId } from "@/lib/services";
import { assertNever, offices, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function teaserIcon(id: HomeTeaserId): LucideIcon {
  switch (id) {
    case "cfcs-pcs":
      return HeartHandshake;
    case "hcbs":
      return Home;
    case "va":
      return Shield;
    case "private-pay":
      return Users;
    case "pcca":
      return HeartPulse;
    default:
      return assertNever(id);
  }
}

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[28rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[38rem]">
        <Image
          src="/images/hero-caregiver.jpg"
          alt="A caregiver and an older man sitting together at home in Missoula"
          fill
          priority
          className="object-cover object-[18%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal/55 via-teal/30 to-teal/10" />
        <div className="relative mx-auto flex min-h-[28rem] w-full max-w-6xl flex-col justify-end px-4 py-12 sm:min-h-[34rem] sm:px-6 sm:py-16 lg:min-h-[38rem] lg:justify-center">
          <p className="text-sm font-medium tracking-[0.12em] text-white/80 uppercase">
            Missoula & Great Falls · Since {site.foundedYear}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Quality home care in Montana.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            CFCS/PCS and HCBS waivers (Big Sky and SDMI), VA Community Care, private pay, and PCCA.
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
            <ApplyButton
              appearance="secondary"
              className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Apply
            </ApplyButton>
          </div>
          <p className="mt-5 text-sm text-white/80">
            {offices.map((office, i) => (
              <span key={office.id}>
                {i > 0 ? " · " : null}
                <a
                  href={office.phoneHref}
                  className="font-medium text-white underline-offset-4 hover:underline"
                >
                  {office.name} {office.phone}
                </a>
              </span>
            ))}
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
          <div className="flex flex-1 flex-col justify-center gap-2 px-4 py-5 text-center sm:px-6">
            {offices.map((office) => (
              <a
                key={office.id}
                href={office.phoneHref}
                className="rounded-lg px-2 py-1 transition-colors hover:bg-teal/[0.05]"
              >
                <p className="font-heading text-base sm:text-lg">{office.phone}</p>
                <p className="text-sm text-muted-foreground">{office.name} office</p>
              </a>
            ))}
          </div>
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
                Care at home.
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

          <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeServiceTeasers.map((teaser) => {
              const Icon = teaserIcon(teaser.id);
              return (
                <Link
                  key={teaser.id}
                  href={teaser.href}
                  className="group flex h-full flex-col rounded-2xl border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 transition-colors hover:bg-card/80"
                >
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-2xl">{teaser.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {teaser.summary}
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

      <CtaBand title="Need care at home?" body="" />
    </>
  );
}
