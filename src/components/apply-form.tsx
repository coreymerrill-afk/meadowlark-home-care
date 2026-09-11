"use client";

import { useActionState } from "react";

import { submitApply, type ApplyState } from "@/app/actions/apply";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { applyOfficeOptions } from "@/lib/site";
import { cn } from "@/lib/utils";

const initial: ApplyState = { status: "idle" };

export function ApplyForm() {
  const [state, action, pending] = useActionState(submitApply, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-teal/[0.07] p-6 ring-1 ring-foreground/5">
        <p className="font-heading text-2xl">Application received</p>
        <p className="mt-2 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required autoComplete="name" />
        {state.fieldErrors?.name ? (
          <p className="text-sm text-destructive">{state.fieldErrors.name}</p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
          {state.fieldErrors?.phone ? (
            <p className="text-sm text-destructive">{state.fieldErrors.phone}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
          {state.fieldErrors?.email ? (
            <p className="text-sm text-destructive">{state.fieldErrors.email}</p>
          ) : null}
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Preferred office</legend>
        <div className="flex flex-wrap gap-2">
          {applyOfficeOptions.map((office) => (
            <label
              key={office}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium ring-1 ring-foreground/10 has-[:checked]:bg-teal has-[:checked]:text-white"
            >
              <input
                type="radio"
                name="office"
                value={office}
                required
                className="sr-only"
                defaultChecked={office === "Either"}
              />
              {office}
            </label>
          ))}
        </div>
        {state.fieldErrors?.office ? (
          <p className="text-sm text-destructive">{state.fieldErrors.office}</p>
        ) : null}
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="note">Anything else? (optional)</Label>
        <Textarea id="note" name="note" rows={3} placeholder="Experience, availability, or questions" />
        {state.fieldErrors?.note ? (
          <p className="text-sm text-destructive">{state.fieldErrors.note}</p>
        ) : null}
      </div>

      {state.status === "error" ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          buttonVariants({ size: "lg" }),
          "h-12 w-full rounded-full bg-orange text-base text-orange-foreground hover:bg-orange/90 sm:w-auto sm:px-8"
        )}
      >
        {pending ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
