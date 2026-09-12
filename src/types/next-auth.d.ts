import type { DefaultSession } from "next-auth";

import type { StaffRole } from "@/lib/staff-access";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: StaffRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: StaffRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    role?: StaffRole;
  }
}
