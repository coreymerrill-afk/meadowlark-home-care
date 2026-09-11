"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link href="/" className="rounded-md focus-visible:ring-3 focus-visible:ring-ring/50">
          <Logo />
          <span className="sr-only">{site.name} home</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
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
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phone}
          </a>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-4")}
          >
            Get care
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
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
              <SheetClose
                render={
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-12 justify-center rounded-full"
                    )}
                  />
                }
              >
                Get care
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
