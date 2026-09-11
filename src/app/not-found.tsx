import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
        404
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">That page isn’t here.</h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        The link may be from our older site. Try the home page, or call us if
        you need care or want to apply.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-8 h-12 rounded-full px-6 text-base"
        )}
      >
        Back to home
      </Link>
    </div>
  );
}
