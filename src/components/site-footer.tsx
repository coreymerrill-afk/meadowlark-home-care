import Link from "next/link";

import { ApplyButton } from "@/components/apply-button";
import { Logo } from "@/components/logo";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            {site.missionLine}. Serving members and caregivers in Missoula,
            Montana since {site.foundedYear}.
          </p>
          <div className="mt-5">
            <ApplyButton compact />
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-heading text-lg text-white">Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
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
          <h2 className="font-heading text-lg text-white">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
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
          <h2 className="font-heading text-lg text-white">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/80 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 text-xs leading-relaxed text-white/60 sm:px-6">
          <p>
            Eligibility and enrollment for Montana Medicaid waivers, CFCS/PCS,
            and VA Community Care are decided by the State of Montana or the
            U.S. Department of Veterans Affairs—not by Meadowlark. Some waivers
            have wait lists. CFCS/PCS is a Montana entitlement when you meet
            the program rules. Meadowlark is not a hospice provider; we can
            provide respite and support when hospice is already in place.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <p>Missoula, Montana</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
