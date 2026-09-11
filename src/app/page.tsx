import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  Home,
  Stethoscope,
  Users,
} from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const services = [
  {
    href: "/services#nursing",
    title: "Nursing",
    icon: Stethoscope,
    body: "Skilled nursing at home, including medication support, bowel care programs, and ongoing ostomy, tracheostomy, and catheter care.",
  },
  {
    href: "/services#cfc-pas",
    title: "CFC / Medicaid PAS",
    icon: HeartHandshake,
    body: "Personal assistance for qualifying Medicaid members — meals, bathing, light housekeeping, shopping, and community integration.",
  },
  {
    href: "/services#waiver",
    title: "Medicaid Waiver / HCBS",
    icon: Home,
    body: "Waiver services beyond typical CFC, including homemaker support, social supervision, specially trained attendants, and habilitation aides.",
  },
  {
    href: "/services#private-pay",
    title: "Private pay, VA & third party",
    icon: Users,
    body: "Live-in care, companion support, personal assistance, and respite when Medicaid is not the funding source.",
  },
] as const;

const learningTopics = [
  "Caregiving",
  "Nursing",
  "Companion care",
  "Respite and hospice support",
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-sm font-medium tracking-[0.16em] text-primary uppercase">
              Missoula, Montana · Since {site.foundedYear}
            </p>
            <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
              Quality home care, close to the people who matter.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {site.missionLine}. Meadowlark Home Care helps members stay at
              home — and gives caregivers a workplace built on trust.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 justify-center rounded-full px-6 text-base"
                )}
              >
                Get care
              </Link>
              <Link
                href="/careers"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 justify-center rounded-full px-6 text-base"
                )}
              >
                Join the team
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Call{" "}
              <a href={site.phoneHref} className="font-medium text-foreground underline-offset-4 hover:underline">
                {site.phone}
              </a>{" "}
              or visit us at {site.address.street}.
            </p>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary shadow-sm sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/hero-home.jpg"
                alt="A caregiver and an older adult talking outdoors, holding hands"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl bg-card/95 p-4 shadow-md ring-1 ring-foreground/8 backdrop-blur sm:left-auto sm:right-6 sm:max-w-xs">
              <p className="font-heading text-lg">Two ways to start</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Families can request care. Caregivers can apply in Missoula and
                the Great Falls area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl bg-card p-6 ring-1 ring-foreground/8 transition-colors hover:bg-secondary/40"
              >
                <service.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-2xl">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
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
              Meadowlark Home Care is proud to offer the Family Learning Center,
              in collaboration with the Institute for Professional Care
              Education. It is a tool for families, friends, caregivers, and
              other health care professionals who want to better understand the
              challenges some members of our community face.
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
        title="Contact us for services — or to become part of the team."
        body="The same office helps families start care and helps caregivers apply."
      />
    </>
  );
}
