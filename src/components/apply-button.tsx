import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ApplyButtonProps = {
  className?: string;
  children?: ReactNode;
  compact?: boolean;
  appearance?: "cta" | "secondary";
};

export function ApplyButton({
  className,
  children = "Apply online",
  compact = false,
  appearance = "cta",
}: ApplyButtonProps) {
  return (
    <Link
      href={site.applyUrl}
      className={cn(
        buttonVariants({
          variant: appearance === "secondary" ? "outline" : "cta",
          size: "lg",
        }),
        compact ? "h-10 px-3.5 text-sm" : "h-12 px-5 text-base",
        "rounded-full",
        className
      )}
    >
      {children}
      <ArrowUpRight className={compact ? "size-3.5" : "size-4"} />
    </Link>
  );
}
