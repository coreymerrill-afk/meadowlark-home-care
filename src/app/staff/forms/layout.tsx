import type { ReactNode } from "react";

import { requireAdminSession } from "@/lib/staff-session";

export default async function StaffFormsLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminSession();
  return children;
}
