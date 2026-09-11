import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ApplyButtonProps = {
  className?: string;
  children?: ReactNode;
  compact?: boolean;
};

export function ApplyButton({
  className,
  children = "Apply online",
  compact = false,
}: ApplyButtonProps) {
  return (
    <a
      href={site.applyUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        buttonVariants({ variant: "cta", size: "lg" }),
        compact ? "h-10 px-3.5 text-sm" : "h-12 px-5 text-base",
        "rounded-full",
        className
      )}
    >
      {children}
      <ArrowUpRight className={compact ? "size-3.5" : "size-4"} />
    </a>
  );
}
