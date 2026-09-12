import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { VerifyMagicLink } from "@/components/verify-magic-link";
import { staffRobots } from "@/lib/staff";
import { safeNextPath } from "@/lib/staff-access";

export const metadata: Metadata = {
  title: "Finish signing in",
  robots: staffRobots,
};

type VerifyPageProps = {
  searchParams: Promise<{
    token?: string | string[];
    next?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function VerifyMagicLinkPage({
  searchParams,
}: VerifyPageProps) {
  const params = await searchParams;
  const token = firstParam(params.token);
  const next = safeNextPath(firstParam(params.next));

  if (!token) {
    redirect("/login?error=invalid-link");
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Finish signing in</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Confirm this sign-in link to open the staff portal.
      </p>
      <div className="mt-8 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
        <VerifyMagicLink token={token} next={next} />
      </div>
    </section>
  );
}
