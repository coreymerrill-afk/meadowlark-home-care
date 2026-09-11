"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { ApplyButton } from "@/components/apply-button";
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
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-teal text-white">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center gap-3 px-4 sm:h-[5rem] sm:px-6">
        <Link
          href="/"
          className="min-w-0 shrink rounded-md focus-visible:ring-3 focus-visible:ring-white/40"
        >
          <Logo inverted />
          <span className="sr-only">{site.name} home</span>
        </Link>

        <div className="mx-auto hidden md:block">
          <ApplyButton />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 lg:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phone}
          </a>
          <a
            href={site.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 lg:inline-flex"
          >
            Facebook
          </a>
          <ApplyButton compact className="md:hidden">
            Apply
          </ApplyButton>
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
                <a
                  href={site.phoneHref}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 justify-center rounded-full"
                  )}
                >
                  Call {site.phone}
                </a>
                <ApplyButton className="w-full justify-center" />
                <a
                  href={site.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-12 justify-center rounded-full"
                  )}
                >
                  Facebook
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <nav
        className="hidden border-t border-white/15 md:block"
        aria-label="Primary"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-1 gap-y-1 px-4 py-2 sm:px-6">
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
                  "whitespace-nowrap rounded-full px-3.5 py-2 text-[0.8rem] font-semibold tracking-[0.12em] uppercase transition-colors",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
