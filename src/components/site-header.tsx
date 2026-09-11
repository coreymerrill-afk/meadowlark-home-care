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
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center gap-3 px-4 sm:h-[4.75rem] sm:px-6">
        <Link
          href="/"
          className="min-w-0 shrink rounded-md focus-visible:ring-3 focus-visible:ring-white/40"
        >
          <Logo inverted />
          <span className="sr-only">{site.name} home</span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-1 xl:flex"
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
                  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
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

        <div className="ml-auto flex items-center gap-2 xl:ml-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10 md:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phone}
          </a>
          <ApplyButton compact>
            <span className="sm:hidden">Apply</span>
            <span className="hidden sm:inline">Apply online</span>
          </ApplyButton>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white xl:hidden"
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
              <SheetClose
                render={
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-12 justify-center rounded-full"
                    )}
                  />
                }
              >
                Request care
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
