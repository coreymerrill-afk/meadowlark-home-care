import { z } from "zod";

import { describeApplyRole, hireologyCareersUrl } from "@/lib/hireology-jobs";
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
  "job1Employer",
  "job1Title",
  "job1When",
  "job1Duties",
  "job2Employer",
  "job2Title",
  "job2When",
  "job2Duties",
  "ref1Name",
  "ref1Relationship",
  "ref1Contact",
  "ref2Name",
  "ref2Relationship",
  "ref2Contact",
  "certifications",
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

function filled(...values: Array<string | undefined>) {
  return values.some((value) => Boolean(value?.trim()));
}

function isPhoneOrEmail(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes("@")) {
    return z.email().safeParse(trimmed).success;
  }
  return (trimmed.match(/\d/g) ?? []).length >= 7;
}

const applyShape = z.object({
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
  job1Employer: optionalText(120),
  job1Title: optionalText(120),
  job1When: optionalText(80),
  job1Duties: optionalText(400),
  job2Employer: optionalText(120),
  job2Title: optionalText(120),
  job2When: optionalText(80),
  job2Duties: optionalText(400),
  ref1Name: optionalText(120),
  ref1Relationship: optionalText(80),
  ref1Contact: optionalText(120),
  ref2Name: optionalText(120),
  ref2Relationship: optionalText(80),
  ref2Contact: optionalText(120),
  certifications: optionalText(400),
  referralSource: optionalText(200),
  note: optionalText(600),
  consent: z
    .string()
    .refine((value) => value === "on", "Please confirm we may contact you."),
  companyWebsite: z.string().optional(),
});

export const applySchema = applyShape.superRefine((data, ctx) => {
  const job1Started = filled(
    data.job1Employer,
    data.job1Title,
    data.job1When,
    data.job1Duties
  );
  if (data.experience !== "None yet" || job1Started) {
    if (!data.job1Employer) {
      ctx.addIssue({
        code: "custom",
        path: ["job1Employer"],
        message: "Please add your most recent employer.",
      });
    }
    if (!data.job1Title) {
      ctx.addIssue({
        code: "custom",
        path: ["job1Title"],
        message: "Please add your role or title.",
      });
    }
  }

  const job2Started = filled(
    data.job2Employer,
    data.job2Title,
    data.job2When,
    data.job2Duties
  );
  if (job2Started) {
    if (!data.job2Employer) {
      ctx.addIssue({
        code: "custom",
        path: ["job2Employer"],
        message: "Please add the employer for this job.",
      });
    }
    if (!data.job2Title) {
      ctx.addIssue({
        code: "custom",
        path: ["job2Title"],
        message: "Please add the role or title for this job.",
      });
    }
  }

  if (!data.ref1Name) {
    ctx.addIssue({
      code: "custom",
      path: ["ref1Name"],
      message: "Please add a reference name.",
    });
  }
  if (!data.ref1Contact) {
    ctx.addIssue({
      code: "custom",
      path: ["ref1Contact"],
      message: "Please add a phone number or email.",
    });
  } else if (!isPhoneOrEmail(data.ref1Contact)) {
    ctx.addIssue({
      code: "custom",
      path: ["ref1Contact"],
      message: "Please enter a phone number or email.",
    });
  }

  const ref2Started = filled(
    data.ref2Name,
    data.ref2Relationship,
    data.ref2Contact
  );
  if (ref2Started) {
    if (!data.ref2Name) {
      ctx.addIssue({
        code: "custom",
        path: ["ref2Name"],
        message: "Please add this reference’s name.",
      });
    }
    if (!data.ref2Contact) {
      ctx.addIssue({
        code: "custom",
        path: ["ref2Contact"],
        message: "Please add a phone number or email.",
      });
    } else if (!isPhoneOrEmail(data.ref2Contact)) {
      ctx.addIssue({
        code: "custom",
        path: ["ref2Contact"],
        message: "Please enter a phone number or email.",
      });
    }
  }
});

export type ApplyPayload = z.infer<typeof applySchema>;

function textField(formData: FormData, name: string) {
  return (formData.get(name) as string) || undefined;
}

export function readApplyForm(formData: FormData) {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    office: formData.get("office"),
    position: formData.get("position"),
    availability: formData.get("availability"),
    availabilityNotes: textField(formData, "availabilityNotes"),
    experience: formData.get("experience"),
    licenseAndTransport: formData.get("licenseAndTransport"),
    eligibleToWork: formData.get("eligibleToWork"),
    job1Employer: textField(formData, "job1Employer"),
    job1Title: textField(formData, "job1Title"),
    job1When: textField(formData, "job1When"),
    job1Duties: textField(formData, "job1Duties"),
    job2Employer: textField(formData, "job2Employer"),
    job2Title: textField(formData, "job2Title"),
    job2When: textField(formData, "job2When"),
    job2Duties: textField(formData, "job2Duties"),
    ref1Name: textField(formData, "ref1Name"),
    ref1Relationship: textField(formData, "ref1Relationship"),
    ref1Contact: textField(formData, "ref1Contact"),
    ref2Name: textField(formData, "ref2Name"),
    ref2Relationship: textField(formData, "ref2Relationship"),
    ref2Contact: textField(formData, "ref2Contact"),
    certifications: textField(formData, "certifications"),
    referralSource: textField(formData, "referralSource"),
    note: textField(formData, "note"),
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

type EmailSection = {
  title: string;
  rows: Array<[string, string]>;
};

function emailSections(payload: ApplyPayload): EmailSection[] {
  const role = describeApplyRole(payload.position);

  return [
    {
      title: "Contact",
      rows: [
        ["Name", payload.name],
        ["Email", payload.email],
        ["Phone", payload.phone],
      ],
    },
    {
      title: "Role",
      rows: [
        ["Role", role.title],
        ["Position interest", payload.position],
        ["Preferred office", payload.office],
        ["Availability", payload.availability],
        ["Days / times", display(payload.availabilityNotes)],
        ["Hireology board", hireologyCareersUrl()],
      ],
    },
    {
      title: "Background",
      rows: [
        ["Years of caregiving / relevant experience", payload.experience],
        [
          "Driver’s license and reliable transportation",
          payload.licenseAndTransport,
        ],
        ["Eligible to work in the U.S.", payload.eligibleToWork],
        [
          "Certifications / license notes",
          display(payload.certifications),
        ],
        ["How they heard about us", display(payload.referralSource)],
      ],
    },
    {
      title: "Most recent job",
      rows: [
        ["Employer", display(payload.job1Employer)],
        ["Role / title", display(payload.job1Title)],
        ["When", display(payload.job1When)],
        ["Duties", display(payload.job1Duties)],
      ],
    },
    {
      title: "Prior job",
      rows: [
        ["Employer", display(payload.job2Employer)],
        ["Role / title", display(payload.job2Title)],
        ["When", display(payload.job2When)],
        ["Duties", display(payload.job2Duties)],
      ],
    },
    {
      title: "Reference 1",
      rows: [
        ["Name", display(payload.ref1Name)],
        ["Relationship", display(payload.ref1Relationship)],
        ["Phone or email", display(payload.ref1Contact)],
      ],
    },
    {
      title: "Reference 2",
      rows: [
        ["Name", display(payload.ref2Name)],
        ["Relationship", display(payload.ref2Relationship)],
        ["Phone or email", display(payload.ref2Contact)],
      ],
    },
    {
      title: "Notes",
      rows: [
        ["Other notes", display(payload.note)],
        ["Consent to contact", "Yes"],
      ],
    },
  ];
}

export function formatApplyEmail(payload: ApplyPayload) {
  const role = describeApplyRole(payload.position);
  const subject = `New employment application — ${payload.name} — ${role.title} — ${payload.office}`;
  const sections = emailSections(payload);

  const text = [
    "New employment application",
    "",
    ...sections.flatMap((section) => [
      section.title.toUpperCase(),
      ...section.rows.map(([label, value]) => `${label}: ${value}`),
      "",
    ]),
  ]
    .join("\n")
    .trim();

  const html = `
    <div style="font-family:Georgia,serif;color:#003441;line-height:1.45;max-width:640px">
      <p style="font-size:20px;margin:0 0 16px">New employment application</p>
      ${sections
        .map(
          (section) => `
        <h3 style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#0f6b6c;margin:20px 0 8px">${escapeHtml(section.title)}</h3>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          ${section.rows
            .map(
              ([label, value], index) => `
            <tr>
              <th align="left" style="width:42%;padding:8px 12px;background:${index % 2 === 0 ? "#f3f7f6" : "#ffffff"};font-weight:600;vertical-align:top">${escapeHtml(label)}</th>
              <td style="padding:8px 12px;background:${index % 2 === 0 ? "#f3f7f6" : "#ffffff"};white-space:pre-wrap">${escapeHtml(value)}</td>
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
