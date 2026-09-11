import Link from "next/link";

import { Logo } from "@/components/logo";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-forest text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo
            className="text-primary-foreground"
            markClassName="brightness-110"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            {site.missionLine}. Serving members and caregivers in Missoula,
            Montana since {site.foundedYear}.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-heading text-lg">Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            <a
              href={site.mapsUrl}
              className="underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.postalCode}
            </a>
          </p>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-heading text-lg">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <a href={site.phoneHref} className="hover:underline">
                {site.phone}
              </a>
            </li>
            <li>Fax {site.fax}</li>
            <li>
              <a href={site.careersEmailHref} className="hover:underline">
                {site.careersEmail}
              </a>
            </li>
            <li>
              <a
                href={site.facebookUrl}
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-heading text-lg">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-primary-foreground/80 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Missoula, Montana</p>
        </div>
      </div>
    </footer>
  );
}
