"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { ApplyButton } from "@/components/apply-button";
import { FacebookIcon } from "@/components/facebook-icon";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, offices, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-teal text-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link
          href="/"
          className="min-w-0 shrink-0 rounded-md focus-visible:ring-3 focus-visible:ring-white/40"
        >
          <Logo inverted markClassName="size-10 sm:size-11" />
          <span className="sr-only">{site.name} home</span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors lg:px-3",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <div className="hidden items-center gap-1 lg:flex">
            {offices.map((office) => (
              <a
                key={office.id}
                href={office.phoneHref}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-2 text-xs font-medium text-white/90 hover:bg-white/10 xl:text-sm"
                title={`${office.name} office`}
              >
                <Phone className="size-3.5" aria-hidden="true" />
                <span className="hidden xl:inline">{office.name}</span>
                {office.phone}
              </a>
            ))}
          </div>
          <a
            href={site.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden size-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10 md:inline-flex"
            aria-label="Meadowlark Home Care on Facebook"
          >
            <FacebookIcon className="size-4" />
          </a>
          <ApplyButton compact>Apply</ApplyButton>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-white md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <SheetTitle className="sr-only">Site menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2 px-4">
                {offices.map((office) => (
                  <a
                    key={office.id}
                    href={office.phoneHref}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-12 justify-center rounded-full"
                    )}
                  >
                    Call {office.name} {office.phone}
                  </a>
                ))}
                <a
                  href={site.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-12 justify-center rounded-full"
                  )}
                >
                  <FacebookIcon />
                  Facebook
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
