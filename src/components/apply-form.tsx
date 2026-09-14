"use client";

import { useActionState, useState, type ReactNode } from "react";

import { submitApply } from "@/app/actions/apply";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { initialApplyState, type ApplyField } from "@/lib/apply";
import {
  applyAvailabilityOptions,
  applyExperienceOptions,
  applyOfficeOptions,
  applyPositionOptions,
  applyYesNoOptions,
  site,
  type ApplyOffice,
  type ApplyPosition,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function ApplyForm({
  initialPosition,
}: {
  initialPosition?: ApplyPosition;
}) {
  const [state, action, pending] = useActionState(submitApply, initialApplyState);
  const [position, setPosition] = useState<ApplyPosition | "">(
    initialPosition ?? ""
  );
  const [office, setOffice] = useState<ApplyOffice>("Either");
  const [experience, setExperience] = useState("");

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-teal/[0.07] p-6 ring-1 ring-foreground/5">
        <p className="font-heading text-2xl">Application received</p>
        <p className="mt-2 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  const job1Required = experience !== "" && experience !== "None yet";

  return (
    <form id="application" action={action} className="space-y-8" noValidate>
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
          value={office}
          onChange={(value) => setOffice(value as ApplyOffice)}
        />
      </FormSection>

      <FormSection title="Role">
        <ChoiceGroup
          legend="Position interest"
          name="position"
          options={applyPositionOptions}
          error={state.fieldErrors?.position}
          value={position}
          onChange={(value) => setPosition(value as ApplyPosition)}
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
          value={experience}
          onChange={setExperience}
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
        <Field
          id="certifications"
          label="Certifications or license notes (optional)"
          error={state.fieldErrors?.certifications}
        >
          <Input
            id="certifications"
            name="certifications"
            maxLength={400}
            placeholder="CNA, RN/LPN license #, other…"
            aria-invalid={Boolean(state.fieldErrors?.certifications)}
            className="h-12 bg-card"
          />
        </Field>
      </FormSection>

      <FormSection title="Recent work">
        <p className="text-sm text-muted-foreground">
          Most recent job
          {job1Required ? "" : " — skip if you selected None yet"}.
        </p>
        <JobFields
          prefix="job1"
          required={job1Required}
          errors={state.fieldErrors}
        />
        <p className="pt-2 text-sm text-muted-foreground">
          Second job (optional)
        </p>
        <JobFields prefix="job2" errors={state.fieldErrors} />
      </FormSection>

      <FormSection title="References">
        <p className="text-sm text-muted-foreground">
          One reference is required. A second is helpful if you have one.
        </p>
        <ReferenceFields
          prefix="ref1"
          heading="Reference 1"
          required
          errors={state.fieldErrors}
        />
        <ReferenceFields
          prefix="ref2"
          heading="Reference 2 (optional)"
          errors={state.fieldErrors}
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
          label="Other notes (optional)"
          error={state.fieldErrors?.note}
        >
          <Textarea
            id="note"
            name="note"
            rows={3}
            maxLength={600}
            placeholder="Schedule questions, or anything else we should know"
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

function JobFields({
  prefix,
  required = false,
  errors,
}: {
  prefix: "job1" | "job2";
  required?: boolean;
  errors?: Partial<Record<ApplyField, string>>;
}) {
  const employer = `${prefix}Employer` as const;
  const title = `${prefix}Title` as const;
  const when = `${prefix}When` as const;
  const duties = `${prefix}Duties` as const;

  return (
    <div className="space-y-4 rounded-2xl bg-secondary/60 p-4 ring-1 ring-foreground/5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={employer}
          label={required ? "Employer" : "Employer (optional)"}
          error={errors?.[employer]}
        >
          <Input
            id={employer}
            name={employer}
            required={required}
            maxLength={120}
            autoComplete="organization"
            aria-invalid={Boolean(errors?.[employer])}
            className="h-12 bg-card"
          />
        </Field>
        <Field
          id={title}
          label={required ? "Role / title" : "Role / title (optional)"}
          error={errors?.[title]}
        >
          <Input
            id={title}
            name={title}
            required={required}
            maxLength={120}
            autoComplete="organization-title"
            aria-invalid={Boolean(errors?.[title])}
            className="h-12 bg-card"
          />
        </Field>
      </div>
      <Field
        id={when}
        label="When, or years (optional)"
        error={errors?.[when]}
      >
        <Input
          id={when}
          name={when}
          maxLength={80}
          placeholder="2023–2025, or 2 years"
          aria-invalid={Boolean(errors?.[when])}
          className="h-12 bg-card"
        />
      </Field>
      <Field
        id={duties}
        label="Brief duties (optional)"
        error={errors?.[duties]}
      >
        <Textarea
          id={duties}
          name={duties}
          rows={2}
          maxLength={400}
          placeholder="Personal care, companionship…"
          aria-invalid={Boolean(errors?.[duties])}
          className="bg-card"
        />
      </Field>
    </div>
  );
}

function ReferenceFields({
  prefix,
  heading,
  required = false,
  errors,
}: {
  prefix: "ref1" | "ref2";
  heading: string;
  required?: boolean;
  errors?: Partial<Record<ApplyField, string>>;
}) {
  const name = `${prefix}Name` as const;
  const relationship = `${prefix}Relationship` as const;
  const contact = `${prefix}Contact` as const;

  return (
    <div className="space-y-4 rounded-2xl bg-secondary/60 p-4 ring-1 ring-foreground/5">
      <p className="text-sm font-medium">{heading}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={name}
          label={required ? "Name" : "Name (optional)"}
          error={errors?.[name]}
        >
          <Input
            id={name}
            name={name}
            required={required}
            maxLength={120}
            autoComplete="off"
            aria-invalid={Boolean(errors?.[name])}
            className="h-12 bg-card"
          />
        </Field>
        <Field
          id={relationship}
          label="Relationship (optional)"
          error={errors?.[relationship]}
        >
          <Input
            id={relationship}
            name={relationship}
            maxLength={80}
            placeholder="Supervisor, coworker…"
            autoComplete="off"
            aria-invalid={Boolean(errors?.[relationship])}
            className="h-12 bg-card"
          />
        </Field>
      </div>
      <Field
        id={contact}
        label={required ? "Phone or email" : "Phone or email (optional)"}
        error={errors?.[contact]}
      >
        <Input
          id={contact}
          name={contact}
          required={required}
          maxLength={120}
          placeholder="Phone or email"
          autoComplete="off"
          aria-invalid={Boolean(errors?.[contact])}
          className="h-12 bg-card"
        />
      </Field>
    </div>
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
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  error?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
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
              checked={value === undefined ? undefined : value === option}
              defaultChecked={
                value === undefined ? defaultValue === option : undefined
              }
              onChange={onChange ? () => onChange(option) : undefined}
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
