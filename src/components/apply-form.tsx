"use client";

import { useActionState, type ReactNode } from "react";

import { submitApply } from "@/app/actions/apply";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { initialApplyState } from "@/lib/apply";
import {
  applyAvailabilityOptions,
  applyExperienceOptions,
  applyOfficeOptions,
  applyPositionOptions,
  applyYesNoOptions,
  site,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function ApplyForm() {
  const [state, action, pending] = useActionState(submitApply, initialApplyState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-teal/[0.07] p-6 ring-1 ring-foreground/5">
        <p className="font-heading text-2xl">Application received</p>
        <p className="mt-2 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8" noValidate>
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <FormSection title="About you">
        <Field id="name" label="Name" error={state.fieldErrors?.name}>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            className="h-12 bg-card"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="phone" label="Phone" error={state.fieldErrors?.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel"
              aria-invalid={Boolean(state.fieldErrors?.phone)}
              className="h-12 bg-card"
            />
          </Field>
          <Field id="email" label="Email" error={state.fieldErrors?.email}>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(state.fieldErrors?.email)}
              className="h-12 bg-card"
            />
          </Field>
        </div>

        <ChoiceGroup
          legend="Preferred office"
          name="office"
          options={applyOfficeOptions}
          error={state.fieldErrors?.office}
          defaultValue="Either"
        />
      </FormSection>

      <FormSection title="Role">
        <ChoiceGroup
          legend="Position interest"
          name="position"
          options={applyPositionOptions}
          error={state.fieldErrors?.position}
        />
        <ChoiceGroup
          legend="Availability"
          name="availability"
          options={applyAvailabilityOptions}
          error={state.fieldErrors?.availability}
        />
        <Field
          id="availabilityNotes"
          label="Days or times (optional)"
          error={state.fieldErrors?.availabilityNotes}
        >
          <Input
            id="availabilityNotes"
            name="availabilityNotes"
            maxLength={200}
            placeholder="Weekdays, evenings, weekends…"
            aria-invalid={Boolean(state.fieldErrors?.availabilityNotes)}
            className="h-12 bg-card"
          />
        </Field>
      </FormSection>

      <FormSection title="Background">
        <ChoiceGroup
          legend="Years of caregiving or relevant experience"
          name="experience"
          options={applyExperienceOptions}
          error={state.fieldErrors?.experience}
        />
        <ChoiceGroup
          legend="Driver’s license and reliable transportation"
          name="licenseAndTransport"
          options={applyYesNoOptions}
          error={state.fieldErrors?.licenseAndTransport}
        />
        <ChoiceGroup
          legend="Eligible to work in the United States"
          name="eligibleToWork"
          options={applyYesNoOptions}
          error={state.fieldErrors?.eligibleToWork}
        />
      </FormSection>

      <FormSection title="Anything else">
        <Field
          id="referralSource"
          label="How did you hear about us? (optional)"
          error={state.fieldErrors?.referralSource}
        >
          <Input
            id="referralSource"
            name="referralSource"
            maxLength={200}
            placeholder="Indeed, Facebook, a friend…"
            aria-invalid={Boolean(state.fieldErrors?.referralSource)}
            className="h-12 bg-card"
          />
        </Field>
        <Field
          id="note"
          label="Why Meadowlark, or notes (optional)"
          error={state.fieldErrors?.note}
        >
          <Textarea
            id="note"
            name="note"
            rows={3}
            maxLength={600}
            placeholder="A sentence or two is plenty"
            aria-invalid={Boolean(state.fieldErrors?.note)}
            className="bg-card"
          />
        </Field>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-secondary p-4 text-sm leading-relaxed ring-1 ring-foreground/10 has-[:checked]:ring-teal">
            <input
              type="checkbox"
              name="consent"
              value="on"
              required
              className="mt-1 size-4 shrink-0 accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-invalid={Boolean(state.fieldErrors?.consent)}
            />
            <span>
              I agree that {site.name} may contact me about this application by
              phone or email.
            </span>
          </label>
          {state.fieldErrors?.consent ? (
            <p className="text-sm text-destructive" role="alert">
              {state.fieldErrors.consent}
            </p>
          ) : null}
        </div>
      </FormSection>

      {state.status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
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

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-5">
      <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
        {title}
      </p>
      {children}
    </div>
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

function ChoiceGroup({
  legend,
  name,
  options,
  error,
  defaultValue,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  error?: string;
  defaultValue?: string;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium ring-1 ring-foreground/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:checked]:bg-teal has-[:checked]:text-white"
          >
            <input
              type="radio"
              name={name}
              value={option}
              required
              className="sr-only"
              defaultChecked={defaultValue === option}
            />
            {option}
          </label>
        ))}
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
