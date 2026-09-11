import { site } from "@/lib/site";

export type ServiceLinkKind = "external" | "phone" | "internal";

export type ServiceLink = {
  label: string;
  href: string;
  kind: ServiceLinkKind;
};

export type ServiceId = "cfcs-pcs" | "hcbs-waiver" | "nursing" | "private-pay";

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

const mountainPacificLinks: ServiceLink[] = site.mountainPacific.all.map(
  (phone) => ({
    label: `Mountain Pacific ${phone.label}`,
    href: phone.href,
    kind: "phone" as const,
  })
);

export const serviceBlocks: ServiceBlock[] = [
  {
    id: "cfcs-pcs",
    program: "Montana Medicaid personal care",
    chip: "CFCS/PCS (formerly CFC/PAS)",
    title: "Help at home through Montana Medicaid",
    summary:
      "In-home personal care through CFCS/PCS once authorized. Meadowlark can be your agency provider. The state decides eligibility.",
    body: "If you have Montana Medicaid—or you’re applying—you may qualify for in-home personal care through CFCS/PCS (formerly CFC/PAS). Help with meals, bathing and hygiene, light housekeeping, shopping, and community activities. Meadowlark can be your agency provider once services are authorized. We don’t decide eligibility—the state does. CFCS/PCS is an entitlement program: if you qualify, there’s no services waitlist (authorization still takes time).",
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
      ...mountainPacificLinks,
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
      "Authorized waiver supports such as social supervision, homemaker help, and habilitation. Some waivers have wait lists.",
    body: "If you’re on an HCBS waiver—or being screened for one—Meadowlark can provide authorized supports such as social supervision, homemaker services, specially trained attendants, and habilitation aide help. Some waivers (including Big Sky) have wait lists. The state handles eligibility; we deliver what’s on your approved plan.",
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
      ...mountainPacificLinks,
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
    program: "Nursing",
    title: "Skilled nursing at home",
    summary:
      "Medication management, bowel-care programs, and ostomy, tracheostomy, and catheter care.",
    body: "Skilled nursing at home—medication management and refills, bowel-care programs, and care for ostomies, tracheostomies, catheters, and similar needs. Available through private pay or other third-party funding. We’ll be clear about nursing vs personal care.",
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
    program: "Private pay & VA / third party",
    title: "Paying privately—or using VA / other coverage",
    summary:
      "Live-in care, companion support, personal assistance, or respite. We don’t decide VA eligibility.",
    body: "Not on Medicaid? You can still get help—private pay, VA, or other coverage for live-in care, companion support, personal assistance, or respite. We don’t decide VA eligibility; we help once your path is clear.",
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
      {
        label: "VA community care eligibility",
        href: site.links.vaCommunityCare,
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
