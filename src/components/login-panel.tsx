"use client";

import { useActionState } from "react";

import { sendMagicLink, signInWithGoogle, type MagicLinkState } from "@/app/actions/staff-auth";
import { RequestAccessForm } from "@/components/request-access-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const initialMagic: MagicLinkState = { status: "idle" };

export function LoginPanel({
  next,
  googleEnabled,
  magicEnabled,
}: {
  next: string;
  googleEnabled: boolean;
  magicEnabled: boolean;
}) {
  const [magicState, magicAction, magicPending] = useActionState(
    sendMagicLink,
    initialMagic
  );

  return (
    <div className="space-y-8">
      <form action={signInWithGoogle} className="space-y-3">
        <input type="hidden" name="next" value={next} />
        <Button
          type="submit"
          disabled={!googleEnabled}
          className={cn(
            "h-12 w-full rounded-full bg-teal px-6 text-base text-white hover:bg-teal/90"
          )}
        >
          Continue with Google
        </Button>
        <p className="text-sm text-muted-foreground">
          Meadowlark Workspace accounts ending in @meadowlarkhomecare.com.
        </p>
        {!googleEnabled ? (
          <p className="text-sm text-muted-foreground">
            Google sign-in is not configured on this deploy yet.
          </p>
        ) : null}
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <p className="relative mx-auto w-fit bg-card px-3 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
          or
        </p>
      </div>

      {magicState.status === "success" ? (
        <div className="rounded-2xl bg-teal/[0.07] p-5 ring-1 ring-foreground/5">
          <p className="font-heading text-xl">Check your email</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {magicState.message}
          </p>
        </div>
      ) : (
        <form action={magicAction} className="space-y-4" noValidate>
          <input type="hidden" name="next" value={next} />
          <input
            type="text"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className="space-y-2">
            <Label htmlFor="magic-email">Personal email on the caregiver list</Label>
            <Input
              id="magic-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={!magicEnabled}
              className="h-12 bg-card"
              aria-invalid={Boolean(magicState.fieldErrors?.email)}
            />
            {magicState.fieldErrors?.email ? (
              <p className="text-sm text-destructive" role="alert">
                {magicState.fieldErrors.email}
              </p>
            ) : null}
          </div>
          {magicState.status === "error" ? (
            <p className="text-sm text-destructive" role="alert">
              {magicState.message}
            </p>
          ) : null}
          <Button
            type="submit"
            disabled={magicPending || !magicEnabled}
            variant="outline"
            className="h-12 w-full rounded-full px-6 text-base"
          >
            {magicPending ? "Sending link…" : "Email me a sign-in link"}
          </Button>
          {!magicEnabled ? (
            <p className="text-sm text-muted-foreground">
              Email sign-in is not configured on this deploy yet.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              We’ll only send a link if your email is on the AxisCare ACTIVE
              caregiver list.
            </p>
          )}
        </form>
      )}

      <div className="border-t border-border pt-8">
        <h2 className="font-heading text-2xl">Request access</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Not on the list yet? Send a note to HR. Workspace users who can sign
          in with Google but don’t have portal access land here too.
        </p>
        <div className="mt-5">
          <RequestAccessForm />
        </div>
      </div>
    </div>
  );
}
