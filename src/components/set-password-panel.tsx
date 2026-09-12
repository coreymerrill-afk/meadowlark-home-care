"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  saveStaffPassword,
  sendPasswordReset,
  type PasswordFormState,
} from "@/app/actions/staff-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PASSWORD_MIN_LENGTH } from "@/lib/password-policy";

const initial: PasswordFormState = { status: "idle" };

export function SetPasswordPanel({
  next,
  token,
  signedInEmail,
}: {
  next: string;
  token: string | null;
  signedInEmail: string | null;
}) {
  if (token || signedInEmail) {
    return (
      <SavePasswordForm
        next={next}
        token={token}
        signedInEmail={signedInEmail}
      />
    );
  }

  return <RequestPasswordForm next={next} />;
}

function RequestPasswordForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(sendPasswordReset, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-teal/[0.07] p-5 ring-1 ring-foreground/5">
        <p className="font-heading text-xl">Check your email</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4" noValidate>
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
        <Label htmlFor="reset-email">Email on the admin or caregiver list</Label>
        <Input
          id="reset-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="h-12 bg-card"
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        {state.fieldErrors?.email ? (
          <p className="text-sm text-destructive" role="alert">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>
      {state.status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-full bg-teal px-6 text-base text-white hover:bg-teal/90"
      >
        {pending ? "Sending…" : "Email me a password link"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Already have a password?{" "}
        <Link href="/login" className="font-medium text-teal underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

function SavePasswordForm({
  next,
  token,
  signedInEmail,
}: {
  next: string;
  token: string | null;
  signedInEmail: string | null;
}) {
  const [state, action, pending] = useActionState(saveStaffPassword, initial);

  return (
    <form action={action} className="space-y-4" noValidate>
      <input type="hidden" name="next" value={next} />
      {token ? <input type="hidden" name="token" value={token} /> : null}
      {signedInEmail ? (
        <p className="text-sm text-muted-foreground">
          Setting a password for{" "}
          <span className="font-medium text-foreground">{signedInEmail}</span>.
        </p>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="new-password">New password</Label>
        <Input
          id="new-password"
          name="password"
          type="password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          autoComplete="new-password"
          className="h-12 bg-card"
          aria-invalid={Boolean(state.fieldErrors?.password)}
        />
        {state.fieldErrors?.password ? (
          <p className="text-sm text-destructive" role="alert">
            {state.fieldErrors.password}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            At least {PASSWORD_MIN_LENGTH} characters.
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm password</Label>
        <Input
          id="confirm-password"
          name="confirm"
          type="password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          autoComplete="new-password"
          className="h-12 bg-card"
          aria-invalid={Boolean(state.fieldErrors?.confirm)}
        />
        {state.fieldErrors?.confirm ? (
          <p className="text-sm text-destructive" role="alert">
            {state.fieldErrors.confirm}
          </p>
        ) : null}
      </div>
      {state.status === "error" && state.message ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-full bg-teal px-6 text-base text-white hover:bg-teal/90"
      >
        {pending ? "Saving…" : "Save password"}
      </Button>
    </form>
  );
}
