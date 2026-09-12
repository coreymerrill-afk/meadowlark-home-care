import { signOutStaff } from "@/app/actions/staff-auth";
import { Button } from "@/components/ui/button";
import type { StaffSession } from "@/lib/staff-session";

function roleLabel(role: StaffSession["role"]): string {
  switch (role) {
    case "admin":
      return "Admin";
    case "caregiver":
      return "Caregiver";
    case "none":
      return "Signed in";
    default: {
      const _exhaustive: never = role;
      return _exhaustive;
    }
  }
}

export function StaffSessionBar({ session }: { session: StaffSession }) {
  return (
    <div className="border-b border-border bg-card/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{session.email}</span>
          <span className="mx-2 text-border" aria-hidden="true">
            ·
          </span>
          {roleLabel(session.role)}
        </p>
        <form action={signOutStaff}>
          <Button
            type="submit"
            variant="outline"
            className="h-10 rounded-full px-4"
          >
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
