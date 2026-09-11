import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
};

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <MeadowlarkMark className={cn("size-9 shrink-0", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.05rem] font-semibold tracking-tight">
          Meadowlark
        </span>
        <span className="mt-0.5 text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Home Care
        </span>
      </span>
    </span>
  );
}

export function MeadowlarkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" className="fill-primary" />
      <path
        d="M8.5 24.5c4.2-1.4 7.8-5.8 8.6-10.6.2-1.4 1.8-2 2.9-1.1 3.2 2.6 6.6 7.4 7.2 12.2"
        className="stroke-[var(--gold)]"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M19.2 14.2c2.8.4 6.8 1.2 9.8 3.8 1.6 1.4 3.6.4 4.5-1.2-2.2.2-4.1-.8-5.6-2.4-2.2-2.3-5.8-3.6-8.7-3.4-.8.1-1.2 1-.8 1.7.3.5.6 1.1.8 1.5Z"
        className="fill-[var(--gold)]"
      />
      <path
        d="M12.2 22.8c3.6 1.8 8.4 2.6 12.6 1.2 1.8-.6 3.6.8 3.2 2.6-.8 3.4-4.6 5.6-8.2 5.4-3.8-.2-7.8-2.4-9.2-5.8-.4-1 .4-2.1 1.6-1.8.6.1 1.4.3 0-1.6Z"
        className="fill-[var(--gold)]"
      />
      <circle cx="27.6" cy="15.4" r="0.7" className="fill-primary" />
    </svg>
  );
}
