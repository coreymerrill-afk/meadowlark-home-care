"use client";

import { useActionState } from "react";

import {
  submitRequestAccess,
  type RequestAccessState,
} from "@/app/actions/request-access";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const initial: RequestAccessState = { status: "idle" };

export function RequestAccessForm({
  defaultEmail,
  defaultName,
}: {
  defaultEmail?: string;
  defaultName?: string;
}) {
  const [state, action, pending] = useActionState(submitRequestAccess, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-teal/[0.07] p-5 ring-1 ring-foreground/5">
        <p className="font-heading text-xl">Request sent</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4" noValidate>
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <Label htmlFor="access-name">Name</Label>
        <Input
          id="access-name"
          name="name"
          required
          autoComplete="name"
          defaultValue={defaultName}
          className="h-12 bg-card"
          aria-invalid={Boolean(state.fieldErrors?.name)}
        />
        {state.fieldErrors?.name ? (
          <p className="text-sm text-destructive" role="alert">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="access-email">Email</Label>
        <Input
          id="access-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={defaultEmail}
          className="h-12 bg-card"
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        {state.fieldErrors?.email ? (
          <p className="text-sm text-destructive" role="alert">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="access-note">Why do you need access? (optional)</Label>
        <Textarea
          id="access-note"
          name="note"
          rows={3}
          className="bg-card text-base"
          placeholder="Office, role, or the tool you need"
        />
        {state.fieldErrors?.note ? (
          <p className="text-sm text-destructive" role="alert">
            {state.fieldErrors.note}
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
        className={cn(
          "h-12 w-full rounded-full bg-teal px-6 text-base text-white hover:bg-teal/90 sm:w-auto"
        )}
      >
        {pending ? "Sending…" : `Email ${site.careersEmail}`}
      </Button>
    </form>
  );
}
