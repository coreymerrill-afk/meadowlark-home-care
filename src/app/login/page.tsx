import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginPanel } from "@/components/login-panel";
import {
  isGoogleAuthConfigured,
  isMagicLinkConfigured,
} from "@/lib/auth-env";
import { loginErrorMessage } from "@/lib/login-errors";
import { safeNextPath } from "@/lib/staff-access";
import { getOptionalStaffSession } from "@/lib/staff-session";
import { staffRobots } from "@/lib/staff";

export const metadata: Metadata = {
  title: "Staff login",
  description: "Sign in to the Meadowlark Home Care staff portal.",
  robots: staffRobots,
  alternates: { canonical: "/login" },
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string | string[];
    error?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = safeNextPath(firstParam(params.next));
  const error = loginErrorMessage(firstParam(params.error));
  const session = await getOptionalStaffSession();

  if (session) {
    redirect(next);
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Staff login</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Office staff use a Meadowlark Google account. Caregivers on the active
        AxisCare list can get a sign-in link at their personal email.
      </p>

      {error ? (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-8 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
        <LoginPanel
          next={next}
          googleEnabled={isGoogleAuthConfigured()}
          magicEnabled={isMagicLinkConfigured()}
        />
      </div>
    </section>
  );
}
