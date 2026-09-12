"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  sendMagicLink,
  signInWithGoogle,
  type MagicLinkState,
} from "@/app/actions/staff-auth";
import {
  signInWithPassword,
  type PasswordFormState,
} from "@/app/actions/staff-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const initialMagic: MagicLinkState = { status: "idle" };
const initialPassword: PasswordFormState = { status: "idle" };

export function LoginPanel({
  next,
  googleEnabled,
  magicEnabled,
  passwordEnabled,
}: {
  next: string;
  googleEnabled: boolean;
  magicEnabled: boolean;
  passwordEnabled: boolean;
}) {
  const [magicState, magicAction, magicPending] = useActionState(
    sendMagicLink,
    initialMagic
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    signInWithPassword,
    initialPassword
  );

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="font-heading text-xl">Google</h2>
        <form action={signInWithGoogle}>
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
          {!googleEnabled ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Google sign-in is not configured on this deploy yet.
            </p>
          ) : null}
        </form>
      </section>

      <Divider />

      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-xl">Email and password</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Password managers can save this. First time? Set a password first.
          </p>
        </div>
        <form action={passwordAction} className="space-y-4" noValidate>
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
            <Label htmlFor="password-email">Email</Label>
            <Input
              id="password-email"
              name="email"
              type="email"
              required
              autoComplete="username"
              disabled={!passwordEnabled}
              className="h-12 bg-card"
              aria-invalid={Boolean(passwordState.fieldErrors?.email)}
            />
            {passwordState.fieldErrors?.email ? (
              <p className="text-sm text-destructive" role="alert">
                {passwordState.fieldErrors.email}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-secret">Password</Label>
            <Input
              id="password-secret"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={!passwordEnabled}
              className="h-12 bg-card"
              aria-invalid={Boolean(passwordState.fieldErrors?.password)}
            />
            {passwordState.fieldErrors?.password ? (
              <p className="text-sm text-destructive" role="alert">
                {passwordState.fieldErrors.password}
              </p>
            ) : null}
          </div>
          {passwordState.status === "error" && passwordState.message ? (
            <p className="text-sm text-destructive" role="alert">
              {passwordState.message}
            </p>
          ) : null}
          <Button
            type="submit"
            disabled={passwordPending || !passwordEnabled}
            className="h-12 w-full rounded-full bg-teal px-6 text-base text-white hover:bg-teal/90"
          >
            {passwordPending ? "Signing in…" : "Sign in"}
          </Button>
          {!passwordEnabled ? (
            <p className="text-sm text-muted-foreground">
              Password sign-in is not configured on this deploy yet.
            </p>
          ) : (
            <p className="text-sm">
              <Link
                href={setPasswordHref(next)}
                className="font-medium text-teal underline-offset-4 hover:underline"
              >
                Forgot or set a password
              </Link>
            </p>
          )}
        </form>
      </section>

      <Divider />

      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-xl">Email a sign-in link</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We’ll send a 20-minute link if your email is allowed.
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
              <Label htmlFor="magic-email">Email</Label>
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
            ) : null}
          </form>
        )}
      </section>

      <p className="border-t border-border pt-6 text-sm text-muted-foreground">
        Need access?{" "}
        <Link
          href="/login/request-access"
          className="font-medium text-teal underline-offset-4 hover:underline"
        >
          Request access
        </Link>
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border" />
      </div>
      <p className="relative mx-auto w-fit bg-card px-3 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
        or
      </p>
    </div>
  );
}

function setPasswordHref(next: string): string {
  if (next === "/staff") {
    return "/login/set-password";
  }
  return `/login/set-password?next=${encodeURIComponent(next)}`;
}
