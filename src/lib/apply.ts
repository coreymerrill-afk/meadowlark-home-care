import { z } from "zod";

import { escapeHtml } from "@/lib/mail";
import {
  applyAvailabilityOptions,
  applyExperienceOptions,
  applyOfficeOptions,
  applyPositionOptions,
  applyYesNoOptions,
} from "@/lib/site";

export const applyFieldKeys = [
  "name",
  "email",
  "phone",
  "office",
  "position",
  "availability",
  "availabilityNotes",
  "experience",
  "licenseAndTransport",
  "eligibleToWork",
  "referralSource",
  "note",
  "consent",
] as const;

export type ApplyField = (typeof applyFieldKeys)[number];

export type ApplyState = {
  status: "idle" | "success" | "error";
  message?: string;
  mode?: "preview" | "sent";
  fieldErrors?: Partial<Record<ApplyField, string>>;
};

export const initialApplyState: ApplyState = { status: "idle" };

function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);
}

export const applySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number.")
    .max(40)
    .refine(
      (value) => (value.match(/\d/g) ?? []).length >= 7,
      "Please enter a phone number."
    ),
  office: z.enum(applyOfficeOptions, {
    error: "Please choose a preferred office.",
  }),
  position: z.enum(applyPositionOptions, {
    error: "Please choose a position.",
  }),
  availability: z.enum(applyAvailabilityOptions, {
    error: "Please choose your availability.",
  }),
  availabilityNotes: optionalText(200),
  experience: z.enum(applyExperienceOptions, {
    error: "Please choose your experience.",
  }),
  licenseAndTransport: z.enum(applyYesNoOptions, {
    error: "Please answer about a license and transportation.",
  }),
  eligibleToWork: z.enum(applyYesNoOptions, {
    error: "Please answer whether you are eligible to work in the U.S.",
  }),
  referralSource: optionalText(200),
  note: optionalText(600),
  consent: z
    .string()
    .refine((value) => value === "on", "Please confirm we may contact you."),
  companyWebsite: z.string().optional(),
});

export type ApplyPayload = z.infer<typeof applySchema>;

export function readApplyForm(formData: FormData) {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    office: formData.get("office"),
    position: formData.get("position"),
    availability: formData.get("availability"),
    availabilityNotes: (formData.get("availabilityNotes") as string) || undefined,
    experience: formData.get("experience"),
    licenseAndTransport: formData.get("licenseAndTransport"),
    eligibleToWork: formData.get("eligibleToWork"),
    referralSource: (formData.get("referralSource") as string) || undefined,
    note: (formData.get("note") as string) || undefined,
    consent: formData.get("consent") === "on" ? "on" : "",
    companyWebsite: formData.get("companyWebsite") || undefined,
  };
}

export function applyFieldErrors(
  error: z.ZodError
): NonNullable<ApplyState["fieldErrors"]> {
  const fieldErrors: NonNullable<ApplyState["fieldErrors"]> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      typeof key === "string" &&
      applyFieldKeys.includes(key as ApplyField) &&
      !(key in fieldErrors)
    ) {
      fieldErrors[key as ApplyField] = issue.message;
    }
  }
  return fieldErrors;
}

function display(value: string | undefined) {
  return value?.trim() ? value.trim() : "Not provided";
}

const emailSections = [
  {
    title: "Contact",
    rows: [
      ["Name", (payload: ApplyPayload) => payload.name],
      ["Email", (payload: ApplyPayload) => payload.email],
      ["Phone", (payload: ApplyPayload) => payload.phone],
    ],
  },
  {
    title: "Role",
    rows: [
      ["Preferred office", (payload: ApplyPayload) => payload.office],
      ["Position interest", (payload: ApplyPayload) => payload.position],
      ["Availability", (payload: ApplyPayload) => payload.availability],
      [
        "Days / times",
        (payload: ApplyPayload) => display(payload.availabilityNotes),
      ],
    ],
  },
  {
    title: "Background",
    rows: [
      [
        "Years of caregiving / relevant experience",
        (payload: ApplyPayload) => payload.experience,
      ],
      [
        "Driver’s license and reliable transportation",
        (payload: ApplyPayload) => payload.licenseAndTransport,
      ],
      [
        "Eligible to work in the U.S.",
        (payload: ApplyPayload) => payload.eligibleToWork,
      ],
      [
        "How they heard about us",
        (payload: ApplyPayload) => display(payload.referralSource),
      ],
    ],
  },
  {
    title: "Notes",
    rows: [
      ["Why Meadowlark / notes", (payload: ApplyPayload) => display(payload.note)],
      ["Consent to contact", () => "Yes"],
    ],
  },
] as const;

export function formatApplyEmail(payload: ApplyPayload) {
  const subject = `New employment application — ${payload.name} — ${payload.office}`;

  const text = [
    "New employment application",
    "",
    ...emailSections.flatMap((section) => [
      section.title.toUpperCase(),
      ...section.rows.map(([label, value]) => `${label}: ${value(payload)}`),
      "",
    ]),
  ]
    .join("\n")
    .trim();

  const html = `
    <div style="font-family:Georgia,serif;color:#003441;line-height:1.45;max-width:640px">
      <p style="font-size:20px;margin:0 0 16px">New employment application</p>
      ${emailSections
        .map(
          (section) => `
        <h3 style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#0f6b6c;margin:20px 0 8px">${escapeHtml(section.title)}</h3>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          ${section.rows
            .map(
              ([label, value], index) => `
            <tr>
              <th align="left" style="width:42%;padding:8px 12px;background:${index % 2 === 0 ? "#f3f7f6" : "#ffffff"};font-weight:600;vertical-align:top">${escapeHtml(label)}</th>
              <td style="padding:8px 12px;background:${index % 2 === 0 ? "#f3f7f6" : "#ffffff"};white-space:pre-wrap">${escapeHtml(value(payload))}</td>
            </tr>`
            )
            .join("")}
        </table>`
        )
        .join("")}
    </div>
  `.trim();

  return { subject, text, html };
}
