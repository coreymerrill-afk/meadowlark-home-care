import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SetPasswordPanel } from "@/components/set-password-panel";
import { staffRobots } from "@/lib/staff";
import { safeNextPath } from "@/lib/staff-access";
import { getOptionalStaffSession } from "@/lib/staff-session";
import { verifyPasswordResetToken } from "@/lib/password-reset";
import { isAuthSecretConfigured } from "@/lib/auth-env";

export const metadata: Metadata = {
  title: "Set a staff password",
  description: "Set or reset a password for the Meadowlark staff portal.",
  robots: staffRobots,
  alternates: { canonical: "/login/set-password" },
};

type SetPasswordPageProps = {
  searchParams: Promise<{
    token?: string | string[];
    next?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SetPasswordPage({
  searchParams,
}: SetPasswordPageProps) {
  const params = await searchParams;
  const token = firstParam(params.token) ?? null;
  const next = safeNextPath(firstParam(params.next));
  const session = await getOptionalStaffSession();

  if (token && isAuthSecretConfigured()) {
    const result = await verifyPasswordResetToken(token);
    if (!result.ok) {
      redirect(
        result.reason === "expired"
          ? "/login?error=expired-reset"
          : "/login?error=invalid-reset"
      );
    }
  }

  const signedInEmail = session?.canAccessPortal ? session.email : null;

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff
      </p>
      <p className="mt-4 text-sm font-medium text-primary">
        <Link href="/login" className="underline-offset-4 hover:underline">
          Staff login
        </Link>
        <span className="text-muted-foreground"> / Password</span>
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">
        {token || signedInEmail ? "Set a password" : "Forgot or set a password"}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {token || signedInEmail
          ? "Choose a password you can save in your password manager."
          : "We’ll email a 60-minute link to set or reset your password."}
      </p>

      <div className="mt-8 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
        <SetPasswordPanel
          next={next}
          token={token}
          signedInEmail={token ? null : signedInEmail}
        />
      </div>
    </section>
  );
}
