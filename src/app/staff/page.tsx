import type { Metadata } from "next";

import { RequestAccessForm } from "@/components/request-access-form";
import { StaffResourceCard } from "@/components/staff-resource-card";
import { staffNoticeMessage } from "@/lib/login-errors";
import { assertNever } from "@/lib/site";
import { staffRobots } from "@/lib/staff";
import {
  adminResources,
  caregiverResources,
  type StaffResource,
} from "@/lib/staff-links";
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

  switch (session.role) {
    case "admin":
    case "caregiver":
      return (
        <StaffPortalLinks
          includeForms={session.role === "admin"}
          notice={notice}
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

function StaffPortalLinks({
  includeForms,
  notice,
}: {
  includeForms: boolean;
  notice: string | null;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff portal
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">
        {includeForms ? "Office tools" : "Caregiver tools"}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {includeForms
          ? "Handbook, AxisCare, ADP, and the internal forms hub."
          : "Handbook, HIPAA, AxisCare, and ADP. Documents open only while you are signed in."}
      </p>

      {notice ? (
        <p
          role="status"
          className="mt-6 max-w-2xl rounded-xl bg-orange/10 px-4 py-3 text-sm text-foreground"
        >
          {notice}
        </p>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {portalCards(includeForms).map(({ resource, accent }) => (
          <StaffResourceCard
            key={resource.href}
            resource={resource}
            accent={accent}
          />
        ))}
      </div>
    </section>
  );
}

function portalCards(includeForms: boolean): {
  resource: StaffResource;
  accent: "teal" | "orange";
}[] {
  const cards: { resource: StaffResource; accent: "teal" | "orange" }[] = [];
  const seen = new Set<string>();

  const push = (
    resource: StaffResource,
    accent: "teal" | "orange"
  ) => {
    if (seen.has(resource.href)) {
      return;
    }
    seen.add(resource.href);
    cards.push({ resource, accent });
  };

  if (includeForms) {
    for (const resource of adminResources) {
      push(resource, resource.href === "/staff/forms" ? "orange" : "teal");
    }
  }

  for (const resource of caregiverResources) {
    push(resource, "teal");
  }

  return cards;
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
        You’re signed in with a Meadowlark Workspace account, but this email
        isn’t an admin and isn’t on the active caregiver whitelist yet. Ask HR
        to add you, or send a request below.
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
