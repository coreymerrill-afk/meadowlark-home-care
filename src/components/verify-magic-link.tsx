"use client";

import { useEffect, useRef } from "react";

import { completeMagicLinkSignIn } from "@/app/actions/staff-auth";
import { Button } from "@/components/ui/button";

export function VerifyMagicLink({
  token,
  next,
}: {
  token: string;
  next: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.requestSubmit();
  }, []);

  return (
    <form ref={formRef} action={completeMagicLinkSignIn} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="next" value={next} />
      <p className="text-sm text-muted-foreground">
        Completing sign-in. If nothing happens, tap the button.
      </p>
      <Button
        type="submit"
        className="h-12 w-full rounded-full bg-teal px-6 text-base text-white hover:bg-teal/90"
      >
        Continue to staff portal
      </Button>
    </form>
  );
}
