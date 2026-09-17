import Link from "next/link";

import { ApplyButton } from "@/components/apply-button";
import { FacebookIcon } from "@/components/facebook-icon";
import { Logo } from "@/components/logo";
import {
  formatOfficeAddress,
  legalLinks,
  navLinks,
  offices,
  site,
  staffLoginLink,
} from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            {site.footerLine}
          </p>
          <div className="mt-5">
            <ApplyButton compact />
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-heading text-lg text-white">Offices</h2>
          <ul className="mt-3 space-y-4 text-sm leading-relaxed text-white/80">
            {offices.map((office) => (
              <li key={office.id}>
                <p className="font-medium text-white">{office.name}</p>
                <a
                  href={office.mapsUrl}
                  className="underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {office.street}
                  <br />
                  {office.city}, {office.state}
                  {office.postalCode ? ` ${office.postalCode}` : ""}
                </a>
                <p className="mt-1">
                  <a href={office.phoneHref} className="hover:underline">
                    {office.phone}
                  </a>
                </p>
                {office.fax ? <p className="mt-0.5">Fax {office.fax}</p> : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-heading text-lg text-white">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a href={site.contactEmailHref} className="hover:underline">
                {site.contactEmail}
              </a>
              <span className="text-white/55"> · Care</span>
            </li>
            <li>
              <a href={site.careersEmailHref} className="hover:underline">
                {site.careersEmail}
              </a>
              <span className="text-white/55"> · Careers</span>
            </li>
            <li>
              <a
                href={site.facebookUrl}
                className="inline-flex items-center gap-1.5 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon className="size-3.5" />
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-heading text-lg text-white">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/80 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={staffLoginLink.href}
                className="text-white/80 hover:underline"
              >
                {staffLoginLink.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 text-xs leading-relaxed text-white/60 sm:px-6">
          <p>
            {offices.map((office, i) => (
              <span key={office.id}>
                {i > 0 ? " · " : null}
                <a
                  href={office.mapsUrl}
                  className="underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {formatOfficeAddress(office)}
                </a>
                {" · "}
                <a
                  href={office.phoneHref}
                  className="underline-offset-4 hover:underline"
                >
                  {office.phone}
                </a>
              </span>
            ))}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
              {legalLinks.map((link) => (
                <span key={link.href}>
                  {" · "}
                  <Link
                    href={link.href}
                    className="underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </p>
            <p>Missoula & Great Falls, Montana</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
