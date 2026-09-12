import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getStaffAccess, staffLoginUrl, type StaffAccess } from "@/lib/staff-access";

export type StaffSession = StaffAccess & {
  name: string | null;
};

export async function requireStaffSession(
  nextPath = "/staff"
): Promise<StaffSession> {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect(staffLoginUrl(nextPath));
  }

  return {
    ...getStaffAccess(email),
    name: session.user?.name ?? null,
  };
}

export async function requireAdminSession(
  nextPath = "/staff/forms"
): Promise<StaffSession> {
  const access = await requireStaffSession(nextPath);
  if (access.role !== "admin") {
    redirect("/staff?notice=admin-only");
  }
  return access;
}

export async function getOptionalStaffSession(): Promise<StaffSession | null> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return null;
  }
  return {
    ...getStaffAccess(email),
    name: session.user?.name ?? null,
  };
}
