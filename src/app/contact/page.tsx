import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone, Printer } from "lucide-react";

import { ApplyButton } from "@/components/apply-button";
import { ContactForm } from "@/components/contact-form";
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
    value: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
    href: site.mapsUrl,
  },
  {
    icon: FacebookGlyph,
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

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We’re here to help."
        description="Ask about care at home, or about joining the team. Call, fax, visit the Missoula office, or send a message."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-3xl">Office details</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Applying to work with us? Start on AxisCare — that is our primary
            caregiver application.
          </p>
          <div className="mt-5">
            <ApplyButton />
          </div>
          <ul className="mt-8 space-y-5">
            {details.map((item) => (
              <li key={item.label} className="flex gap-3">
                <item.icon className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                    {item.label}
                  </p>
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-base underline-offset-4 hover:underline"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-base">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] bg-card p-6 ring-1 ring-foreground/8 sm:p-8 lg:col-span-7">
          <h2 className="text-3xl">Send a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us whether you need care or want to apply. We will follow up
            by phone or email.
          </p>
          <div className="relative mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
