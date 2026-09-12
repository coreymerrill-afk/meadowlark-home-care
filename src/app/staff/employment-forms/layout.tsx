import type { ReactNode } from "react";

import { requireAdminSession } from "@/lib/staff-session";

export default async function EmploymentFormsLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminSession("/staff/employment-forms");
  return children;
}
