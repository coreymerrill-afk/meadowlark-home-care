import type { Metadata } from "next";
import Link from "next/link";

import { RequestAccessForm } from "@/components/request-access-form";
import { StaffResourceCard } from "@/components/staff-resource-card";
import { staffNoticeMessage } from "@/lib/login-errors";
import { assertNever } from "@/lib/site";
import { staffRobots } from "@/lib/staff";
import {
  adminPrimaryResources,
  adminSecondaryResources,
  caregiverResources,
  staffDocumentResources,
} from "@/lib/staff-links";
import { hasPasswordHash } from "@/lib/staff-passwords";
import { requireStaffSession } from "@/lib/staff-session";

export const metadata: Metadata = {
  title: "Staff portal",
  description: "Meadowlark Home Care staff links and tools.",
  robots: staffRobots,
  alternates: { canonical: "/staff" },
};

type StaffPageProps = {
  searchParams: Promise<{
    notice?: string | string[];
  }>;
};

export default async function StaffPortalPage({ searchParams }: StaffPageProps) {
  const session = await requireStaffSession();
  const params = await searchParams;
  const noticeCode = Array.isArray(params.notice)
    ? params.notice[0]
    : params.notice;
  const notice = staffNoticeMessage(noticeCode);
  const passwordSet = session.canAccessPortal
    ? await hasPasswordHash(session.email)
    : true;

  switch (session.role) {
    case "admin":
      return (
        <AdminPortal
          notice={notice}
          showPasswordHint={!passwordSet}
        />
      );
    case "caregiver":
      return (
        <CaregiverPortal
          notice={notice}
          showPasswordHint={!passwordSet}
        />
      );
    case "none":
      return (
        <WorkspaceRequestAccess
          email={session.email}
          name={session.name}
          notice={notice}
        />
      );
    default:
      return assertNever(session.role);
  }
}

function AdminPortal({
  notice,
  showPasswordHint,
}: {
  notice: string | null;
  showPasswordHint: boolean;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff portal
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Office tools</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        AxisCare, Qliq, benefits, hiring, payroll, and employment forms.
      </p>

      <PortalNotices notice={notice} showPasswordHint={showPasswordHint} />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {adminPrimaryResources.map((resource) => (
          <StaffResourceCard
            key={resource.href}
            resource={resource}
            accent={resource.href === "/staff/employment-forms" ? "orange" : "teal"}
          />
        ))}
      </div>

      <h2 className="mt-12 text-2xl">Staff documents</h2>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Handbook, HIPAA, AxisCare guides, and the CFC Agency-Based policy
        manual. Same documents caregivers see.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {staffDocumentResources.map((resource) => (
          <StaffResourceCard key={resource.href} resource={resource} />
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Medicaid / SLTC tools:{" "}
        {adminSecondaryResources.map((resource, index) => (
          <span key={resource.href}>
            {index > 0 ? " · " : null}
            <Link
              href={resource.href}
              className="font-medium text-teal underline-offset-4 hover:underline"
            >
              {resource.title}
            </Link>
          </span>
        ))}
        {" · "}
        <Link
          href="/staff/forms/sltc"
          className="font-medium text-teal underline-offset-4 hover:underline"
        >
          SLTC phone form filler
        </Link>
        {" · "}
        <Link
          href="/staff/forms/pca-certificate"
          className="font-medium text-teal underline-offset-4 hover:underline"
        >
          PCA certificate
        </Link>
      </p>
    </section>
  );
}

function CaregiverPortal({
  notice,
  showPasswordHint,
}: {
  notice: string | null;
  showPasswordHint: boolean;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff portal
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Caregiver tools</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Handbook, HIPAA, CFC policy, AxisCare, and ADP. Documents open only
        while you are signed in.
      </p>

      <PortalNotices notice={notice} showPasswordHint={showPasswordHint} />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {caregiverResources.map((resource) => (
          <StaffResourceCard key={resource.href} resource={resource} />
        ))}
      </div>
    </section>
  );
}

function PortalNotices({
  notice,
  showPasswordHint,
}: {
  notice: string | null;
  showPasswordHint: boolean;
}) {
  return (
    <>
      {notice ? (
        <p
          role="status"
          className="mt-6 max-w-2xl rounded-xl bg-orange/10 px-4 py-3 text-sm text-foreground"
        >
          {notice}
        </p>
      ) : null}
      {showPasswordHint ? (
        <p
          role="status"
          className="mt-6 max-w-2xl rounded-xl bg-teal/[0.07] px-4 py-3 text-sm text-foreground"
        >
          No password yet.{" "}
          <Link
            href="/login/set-password"
            className="font-medium text-teal underline-offset-4 hover:underline"
          >
            Set one
          </Link>{" "}
          so you can sign in with email and a password manager next time.
        </p>
      ) : null}
    </>
  );
}

function WorkspaceRequestAccess({
  email,
  name,
  notice,
}: {
  email: string;
  name: string | null;
  notice: string | null;
}) {
  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Request access
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">This account isn’t on the portal list</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        You’re signed in, but this email isn’t an admin and isn’t on the
        active caregiver whitelist yet. Ask HR to add you, or send a request
        below.
      </p>
      {notice ? (
        <p
          role="status"
          className="mt-6 rounded-xl bg-orange/10 px-4 py-3 text-sm text-foreground"
        >
          {notice}
        </p>
      ) : null}
      <div className="mt-8 rounded-[1.5rem] border-l-[5px] border-teal bg-card p-6 shadow-[0_10px_28px_-14px_rgba(0,52,65,0.22)] ring-1 ring-foreground/5 sm:p-8">
        <RequestAccessForm
          defaultEmail={email}
          defaultName={name ?? undefined}
        />
      </div>
    </section>
  );
}
