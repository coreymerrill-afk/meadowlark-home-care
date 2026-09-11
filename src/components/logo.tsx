import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  inverted?: boolean;
};

export function Logo({ className, markClassName, inverted = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <MeadowlarkMark
        inverted={inverted}
        className={cn("size-11 shrink-0 sm:size-12", markClassName)}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.15rem] font-semibold tracking-tight sm:text-xl",
            inverted && "text-white"
          )}
        >
          Meadowlark
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase",
            inverted ? "text-white/75" : "text-muted-foreground"
          )}
        >
          Home Care
        </span>
      </span>
    </span>
  );
}

export function MeadowlarkMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  // Official MLHC Pic Logo (no background). `inverted` kept for API compat with
  // teal chrome; the PNG already reads on dark teal.
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15",
        className
      )}
    >
      <Image
        src="/brand/mlhc-logo.png"
        alt=""
        width={96}
        height={96}
        className={cn(
          "size-full object-contain p-0.5",
          inverted ? "brightness-110 contrast-105" : undefined
        )}
        priority
      />
    </span>
  );
}
