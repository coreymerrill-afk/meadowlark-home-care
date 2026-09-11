import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type CtaBandProps = {
  title?: string;
  body?: string;
};

export function CtaBand({
  title = "Ready to talk?",
  body = "Call us about care at home, or apply to join the team.",
}: CtaBandProps) {
  return (
    <section className="border-t border-border bg-secondary/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted-foreground">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 justify-center rounded-full px-6 text-base"
            )}
          >
            Get care
          </Link>
          <Link
            href="/careers"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 justify-center rounded-full px-6 text-base"
            )}
          >
            Join the team
          </Link>
          <a
            href={site.phoneHref}
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "h-12 justify-center rounded-full px-6 text-base"
            )}
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
