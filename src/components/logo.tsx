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
        className={cn(
          "size-10 shrink-0 sm:size-11",
          inverted ? "text-white" : "text-foreground",
          markClassName
        )}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.05rem] font-semibold tracking-tight sm:text-lg",
            inverted && "text-white"
          )}
        >
          Meadowlark
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.68rem] font-medium tracking-[0.16em] uppercase",
            inverted ? "text-white/75" : "text-muted-foreground"
          )}
        >
          Home Care
        </span>
      </span>
    </span>
  );
}

export function MeadowlarkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 56"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M58.2 20.4c2.2-1.6 4.6-4.2 5.4-7.2.3-1.2-.7-2.2-1.8-2-2.4.4-4.6 2-6.2 3.8-1.6-2.6-4.4-4.6-7.6-5.2-1.2-.2-2.2.8-2 1.9.6 3.4 3 6.2 6 7.8-1.8 2.2-4.4 3.6-7.2 4.2-.9.2-1.2 1.3-.6 1.9 3.4 3.4 8.2 4.8 12.8 3.6 1.8-.5 2.6-2.6 1.6-4.2-.8-1.3-1.8-2.6-2.4-4.6Z" />
      <path d="M14.8 29.2c6.2-8.4 15.6-13.6 25.6-14.2 1.6-.1 2.4 1.8 1.2 2.8-4.6 3.8-8.2 9-10 15 5.2 1.2 10.8 1 15.8-.8 1.4-.5 2.8.6 2.6 2.1-.4 3.6-2.6 6.8-5.6 8.8-6.2 4.2-14.4 4.6-21.2 1.4-5.2-2.4-9.2-7-10.8-12.4-.4-1.3.8-2.5 2.4-2.7Z" />
      <circle cx="59.6" cy="12.6" r="1.05" className="fill-background" />
      <path d="M8 42c10.4 1.4 22.2 1.2 32.6-1.2 1.2-.3 1.8 1.3.7 1.9-10.6 5.6-24.2 6.2-35.2 1.4-.9-.4-.7-1.4 1.9-2.1Z" />
    </svg>
  );
}
