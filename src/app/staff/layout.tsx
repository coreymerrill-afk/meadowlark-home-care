import type { Metadata } from "next";
import type { ReactNode } from "react";

import { StaffSessionBar } from "@/components/staff-session-bar";
import { staffRobots } from "@/lib/staff";
import { requireStaffSession } from "@/lib/staff-session";

export const metadata: Metadata = {
  title: "Staff",
  robots: staffRobots,
};

export default async function StaffLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireStaffSession();

  return (
    <>
      <StaffSessionBar session={session} />
      {children}
    </>
  );
}
