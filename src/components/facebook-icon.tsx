import { cn } from "@/lib/utils";

type FacebookIconProps = {
  className?: string;
};

export function FacebookIcon({ className }: FacebookIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4 fill-current", className)}
    >
      <path d="M14.5 8.5h2.25V5.6c-.4-.05-1.7-.17-3.24-.17-3.2 0-5.4 1.96-5.4 5.56v3.01H5.5v3.3h2.61V23h3.74v-5.7h2.82l.45-3.3h-3.27V11.3c0-.95.26-1.6 1.65-1.8Z" />
    </svg>
  );
}
