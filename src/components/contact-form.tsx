"use client";

import { useActionState, type ReactNode } from "react";

import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { initialContactState } from "@/lib/contact";
import { inquiryTypes } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState
  );

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Full name"
          error={state.fieldErrors?.name}
        >
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
            className="h-11 bg-card"
          />
        </Field>
        <Field
          id="email"
          label="Email"
          error={state.fieldErrors?.email}
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            className="h-11 bg-card"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone" error={state.fieldErrors?.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-11 bg-card"
          />
        </Field>
        <Field
          id="inquiryType"
          label="How can we help?"
          error={state.fieldErrors?.inquiryType}
        >
          <select
            id="inquiryType"
            name="inquiryType"
            defaultValue="Request care"
            className={cn(
              "h-11 w-full rounded-lg border border-input bg-card px-2.5 text-sm outline-none",
              "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            )}
          >
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={state.fieldErrors?.message}>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          className="min-h-36 bg-card"
          placeholder="Tell us a little about the care you need, or the role you are interested in."
        />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status !== "idle" ? (
        <p
          role="status"
          className={cn(
            "rounded-xl px-4 py-3 text-sm",
            state.status === "success"
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-full px-6 text-base sm:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
