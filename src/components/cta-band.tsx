import Link from "next/link";

import { ApplyButton } from "@/components/apply-button";
import { buttonVariants } from "@/components/ui/button";
import { offices } from "@/lib/site";
import { cn } from "@/lib/utils";

type CtaBandProps = {
  title?: string;
  body?: string;
  /** Careers mode: primary Apply (/apply) + Call. Default: Request care + Call. */
  showApply?: boolean;
};

export function CtaBand({
  title = "Ready to talk?",
  body = "Call us about care at home, or apply to join the team from the header.",
  showApply = false,
}: CtaBandProps) {
  return (
    <section className="border-t border-teal/10 bg-teal/[0.07]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl">{title}</h2>
          {body ? <p className="mt-3 text-muted-foreground">{body}</p> : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {showApply ? (
            <>
              <ApplyButton className="h-12 justify-center rounded-full px-6 text-base">
                Apply online
              </ApplyButton>
              {offices.map((office) => (
                <a
                  key={office.id}
                  href={office.phoneHref}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 justify-center rounded-full border-teal/30 px-6 text-base"
                  )}
                >
                  Call {office.name}
                </a>
              ))}
            </>
          ) : (
            <>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 justify-center rounded-full bg-teal px-6 text-base text-white hover:bg-teal/90"
                )}
              >
                Request care
              </Link>
              {offices.map((office) => (
                <a
                  key={office.id}
                  href={office.phoneHref}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 justify-center rounded-full border-teal/30 px-6 text-base"
                  )}
                >
                  {office.name} {office.phone}
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
