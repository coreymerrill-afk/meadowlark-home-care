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
import { navLinks, offices, site, staffLoginLink } from "@/lib/site";
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
          <Logo
            inverted
            markClassName="size-9 sm:size-11"
            wordmarkClassName="hidden min-[420px]:flex"
          />
          <span className="sr-only">{site.name} home</span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex"
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
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
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

        <div className="ml-auto flex items-center gap-2">
          <ApplyButton compact>Apply</ApplyButton>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-white"
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
              <nav className="flex flex-col gap-1 px-4 md:hidden" aria-label="Mobile">
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
              <div className="mt-2 flex flex-col gap-2 px-4">
                <SheetClose
                  render={
                    <Link
                      href={staffLoginLink.href}
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "h-12 justify-center rounded-full bg-teal text-white hover:bg-teal/90"
                      )}
                    />
                  }
                >
                  {staffLoginLink.label}
                </SheetClose>
                {offices.map((office) => (
                  <a
                    key={office.id}
                    href={office.phoneHref}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-12 justify-center rounded-full"
                    )}
                  >
                    <Phone className="size-4" aria-hidden="true" />
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
