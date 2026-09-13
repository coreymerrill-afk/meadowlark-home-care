import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { isStaffPdfHref } from "@/lib/employment-forms";
import type { StaffResource } from "@/lib/staff-links";
import { cn } from "@/lib/utils";

export function StaffResourceCard({
  resource,
  accent = "teal",
}: {
  resource: StaffResource;
  accent?: "teal" | "orange";
}) {
  const border =
    accent === "orange" ? "border-orange" : "border-teal";

  const usePlainAnchor = resource.external || isStaffPdfHref(resource.href);

  const action = (
    <>
      {usePlainAnchor ? "Open" : "Go to"} {resource.title}
      {resource.external ? (
        <ArrowUpRight className="size-4" />
      ) : (
        <ArrowRight className="size-4" />
      )}
    </>
  );

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[1.5rem] border-l-[5px] bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-7",
        border
      )}
    >
      <h2 className="text-2xl">{resource.title}</h2>
      <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
        {resource.description}
      </p>
      {resource.note ? (
        <p className="mt-3 text-sm text-muted-foreground">{resource.note}</p>
      ) : null}
      {resource.extraLinks?.length ? (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {resource.extraLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-teal underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {usePlainAnchor ? (
        <a
          href={resource.href}
          target={resource.external ? "_blank" : undefined}
          rel={resource.external ? "noreferrer" : undefined}
          className={cn(
            buttonVariants({ variant: "cta", size: "lg" }),
            "mt-6 h-12 rounded-full px-6 text-base"
          )}
        >
          {action}
        </a>
      ) : (
        <Link
          href={resource.href}
          className={cn(
            buttonVariants({ variant: "cta", size: "lg" }),
            "mt-6 h-12 rounded-full px-6 text-base"
          )}
        >
          {action}
        </Link>
      )}
    </article>
  );
}
