import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone, Printer } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { FacebookIcon } from "@/components/facebook-icon";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Meadowlark Home Care in Missoula: phone, fax, office address, and a contact form for care or careers.",
  alternates: { canonical: "/contact" },
};

const details = [
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: Printer,
    label: "Fax",
    value: site.fax,
  },
  {
    icon: Mail,
    label: "Careers email",
    value: site.careersEmail,
    href: site.careersEmailHref,
  },
  {
    icon: MapPin,
    label: "Office",
    value: `${site.address.street}\n${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
    href: site.mapsUrl,
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    value: "Meadowlark Home Care",
    href: site.facebookUrl,
  },
  {
    icon: Clock3,
    label: "Hiring areas",
    value: "Missoula office · hiring also in the Great Falls area",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask about care at home, or joining the team."
        description="Call, fax, visit the Missoula office, or send a message. Caregivers apply on AxisCare."
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 rounded-[1.5rem] border-l-4 border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
              Missoula office
            </p>
            <h2 className="mt-2 text-3xl">How to reach us</h2>
            <p className="mt-3 text-base text-muted-foreground">
              Applying to work with us? Use{" "}
              <a
                href={site.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Apply online
              </a>{" "}
              in the header — that is our AxisCare caregiver application.
            </p>
            <ul className="mt-6 space-y-5">
              {details.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <item.icon className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block whitespace-pre-line text-base underline-offset-4 hover:underline"
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 whitespace-pre-line text-base">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-border/80 lg:pl-8">
            <h2 className="text-3xl">Send a message</h2>
            <p className="mt-2 text-base text-muted-foreground">
              Tell us whether you need care or want to apply. We will follow up
              by phone or email.
            </p>
            <div className="relative mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
