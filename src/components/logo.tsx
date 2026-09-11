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
  const disc = inverted ? "fill-white" : "fill-teal";
  const bird = inverted ? "fill-teal" : "fill-white";
  const eye = inverted ? "fill-white" : "fill-teal";

  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="38" className={disc} />
      <path
        className={bird}
        d="M16 38.5 27 34.2v7.4L16 38.5Zm11.2-2.8c0-5.4 4.2-9.4 9.8-9.4 2.4 0 4.6.8 6.3 2.2 2.2-2.6 5.6-4.2 9.3-4.2 1.4 0 2.4 1.2 2.1 2.5-.8 3.6-3.4 6.4-6.8 7.8 3.4 2.2 5.6 6 5.6 10.2 0 6.8-5.6 11.6-13.2 11.6-6.4 0-11.6-3.6-13.1-8.6-2.2.4-4.4 0-6.2-1.2-1.2-.8-1.2-2.4 0-3.2 2.2-1.4 4.6-2.4 7-3.2.1-1.5.2-3.1 0-4.5Z"
      />
      <circle cx="31.4" cy="32.6" r="1.2" className={eye} />
      <path
        className={bird}
        d="M24 57.8c8.2 1.2 17.6.6 25.4-2.6.8-.3 1.3.8.6 1.3-8.2 5-19.4 6.2-28.4 2.6-.8-.3-.5-1.2 1.2-1.3.4 0 .8 0 1.2 0Z"
      />
    </svg>
  );
}
