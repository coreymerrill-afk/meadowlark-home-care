import { site } from "@/lib/site";

export type ServiceLinkKind = "external" | "phone" | "internal";

export type ServiceLink = {
  label: string;
  href: string;
  kind: ServiceLinkKind;
};

export type ServiceId =
  | "cfcs-pcs"
  | "hcbs-waiver"
  | "nursing"
  | "private-pay"
  | "va-third-party";

export type ServiceBlock = {
  id: ServiceId;
  program: string;
  title: string;
  body: string;
  summary: string;
  chip?: string;
  primaryCta?: ServiceLink;
  links: ServiceLink[];
};

export const serviceBlocks: ServiceBlock[] = [
  {
    id: "cfcs-pcs",
    program: "Montana Medicaid personal care",
    chip: "CFCS/PCS (formerly CFC/PAS)",
    title: "Help at home through Montana Medicaid",
    summary:
      "In-home personal care once CFCS/PCS is authorized. Meadowlark can be your agency-based provider. We don’t decide eligibility.",
    body: "If you already have Montana Medicaid—or you’re applying—you may qualify for in-home personal care through Community First Choice Services (CFCS) and Personal Care Services (PCS) (formerly CFC/PAS). These help with everyday needs like bathing, dressing, meals, and light household tasks so you can stay safely at home. Meadowlark can be your agency-based provider once services are authorized. We don’t decide Medicaid eligibility—that’s the Office of Public Assistance—but we can walk you through what to expect and coordinate care after you’re approved.",
    primaryCta: {
      label: "Apply for Montana Medicaid",
      href: site.links.applyMedicaid,
      kind: "external",
    },
    links: [
      {
        label: "Montana CFCS/PCS program",
        href: site.links.cfcsPcs,
        kind: "external",
      },
      {
        label: "Montana Senior & Long Term Care programs",
        href: site.links.sltcHub,
        kind: "external",
      },
      {
        label: `Office of Public Assistance ${site.opaPhone}`,
        href: site.opaPhoneHref,
        kind: "phone",
      },
      {
        label: `Mountain Pacific CFCS assessment ${site.mountainPacific.cfcsAssessment.label}`,
        href: site.mountainPacific.cfcsAssessment.href,
        kind: "phone",
      },
      {
        label: `Call Meadowlark ${site.phone}`,
        href: site.phoneHref,
        kind: "phone",
      },
    ],
  },
  {
    id: "hcbs-waiver",
    program: "Medicaid HCBS waiver",
    title: "Extra support through a Medicaid waiver",
    summary:
      "Waiver supports beyond standard personal care, as authorized on your plan. The state decides enrollment.",
    body: "HCBS waivers—like Montana’s Big Sky Waiver—can cover supports beyond standard personal care when you meet Medicaid and level-of-care rules. Depending on your plan, that may include homemaker help, specially trained attendants, habilitation support, respite (and support when hospice is already in place), and other authorized services. If you’re already on a waiver (or being screened), Meadowlark can serve as your provider agency for the services we’re approved to deliver under your plan. We don’t decide waiver eligibility.",
    primaryCta: {
      label: "Apply for Montana Medicaid",
      href: site.links.applyMedicaid,
      kind: "external",
    },
    links: [
      {
        label: "Montana Senior & Long Term Care programs",
        href: site.links.sltcHub,
        kind: "external",
      },
      {
        label: "Big Sky Waiver program",
        href: site.links.bigSkyWaiver,
        kind: "external",
      },
      {
        label: "Montana HCBS waiver information sheet (PDF)",
        href: site.links.hcbsWaiverPdf,
        kind: "external",
      },
      {
        label: `Mountain Pacific waiver screening ${site.mountainPacific.waiverScreening[0].label}`,
        href: site.mountainPacific.waiverScreening[0].href,
        kind: "phone",
      },
      {
        label: `or ${site.mountainPacific.waiverScreening[1].label}`,
        href: site.mountainPacific.waiverScreening[1].href,
        kind: "phone",
      },
      {
        label: `Office of Public Assistance ${site.opaPhone}`,
        href: site.opaPhoneHref,
        kind: "phone",
      },
      {
        label: `Call Meadowlark ${site.phone}`,
        href: site.phoneHref,
        kind: "phone",
      },
    ],
  },
  {
    id: "nursing",
    program: "Skilled nursing",
    title: "Skilled nursing at home",
    summary:
      "Medication support, bowel-care programs, and ostomy, tracheostomy, and catheter care.",
    body: "When needs go beyond caregiver support, Meadowlark can provide skilled nursing—medication support, bowel-care programs, and ongoing care for ostomies, tracheostomies, catheters, and similar needs. Nursing may be private pay or another third-party funder. We’ll be clear about nursing versus personal care.",
    primaryCta: {
      label: `Call Meadowlark ${site.phone}`,
      href: site.phoneHref,
      kind: "phone",
    },
    links: [
      {
        label: "VA skilled home health care",
        href: site.links.vaSkilledHomeHealth,
        kind: "external",
      },
    ],
  },
  {
    id: "private-pay",
    program: "Private pay",
    title: "Paying privately for home care",
    summary:
      "Live-in care, companion support, personal assistance, or respite—without Medicaid.",
    body: "Not on Medicaid? Families often pay privately—or use certain third-party insurance—for live-in care, companion support, personal assistance, or respite (and support when hospice is already in place). Meadowlark is not a hospice provider. If you want extra hands at home and a clear private-pay path, we can talk through what a typical week would look like.",
    primaryCta: {
      label: `Call Meadowlark ${site.phone}`,
      href: site.phoneHref,
      kind: "phone",
    },
    links: [
      {
        label: "Send a message",
        href: "/contact",
        kind: "internal",
      },
    ],
  },
  {
    id: "va-third-party",
    program: "VA and other coverage",
    title: "Using VA or other third-party coverage",
    summary:
      "Aid & Attendance, Homemaker/Home Health Aide, and other coverage. VA decides eligibility.",
    body: "Veterans may explore Aid & Attendance or Homemaker/Home Health Aide services through VA, and some families use other third-party coverage. We don’t decide VA eligibility; we’re happy to explain how our services can fit once your funding path is clear.",
    primaryCta: {
      label: `Call Meadowlark ${site.phone}`,
      href: site.phoneHref,
      kind: "phone",
    },
    links: [
      {
        label: "VA Aid & Attendance",
        href: site.links.vaAidAttendance,
        kind: "external",
      },
      {
        label: "VA Homemaker and Home Health Aide care",
        href: site.links.vaHomemaker,
        kind: "external",
      },
      {
        label: "VA community care eligibility",
        href: site.links.vaCommunityCare,
        kind: "external",
      },
      {
        label: "VA skilled home health care",
        href: site.links.vaSkilledHomeHealth,
        kind: "external",
      },
      {
        label: "Apply for VA health care",
        href: site.links.vaApply,
        kind: "external",
      },
    ],
  },
];
