import { site } from "@/lib/site";

export type ServiceLinkKind = "external" | "phone" | "internal";

export type ServiceLink = {
  label: string;
  href: string;
  kind: ServiceLinkKind;
};

export type ServiceId = "cfcs-pcs" | "hcbs-waiver" | "nursing" | "private-pay";

export type HomeTeaserId = "cfcs-pcs" | "hcbs-waiver" | "private-pay" | "respite";

export type ServiceBlock = {
  id: ServiceId;
  program: string;
  title: string;
  body: string;
  summary: string;
  chip?: string;
  bullets?: string[];
  primaryCta?: ServiceLink;
  links: ServiceLink[];
};

export type HomeTeaser = {
  id: HomeTeaserId;
  href: `/services#${string}`;
  title: string;
  summary: string;
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
      "Agency-based CFCS/PCS. If you qualify, there is no services waitlist—authorization still takes time.",
    body: "Meadowlark is an agency-based provider for Montana CFCS/PCS (formerly CFC/PAS). If you have Montana Medicaid—or you are applying—you may qualify for in-home personal care: meals, bathing and hygiene, light housekeeping, shopping, and community activities. CFCS/PCS is an entitlement program: if you qualify, there is no services waitlist, though authorization still takes time. We do not decide eligibility—the state does. Once services are authorized, we can be your agency provider.",
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
    chip: "HCBS Big Sky / SDMI / DD",
    title: "Extra support through a Medicaid waiver",
    summary:
      "Big Sky, SDMI, and/or DD waiver supports as authorized on your plan. Some waivers have wait lists.",
    body: "Meadowlark serves members on Montana's Big Sky, Severe Disabling Mental Illness (SDMI), and/or Developmental Disabilities (DD) waivers, as authorized on each person's plan. Authorized supports can include social supervision, homemaker services, specially trained attendants, and habilitation aide help. Some waivers have wait lists. The state handles eligibility; we deliver what is on your approved plan.",
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
        label: "SDMI waiver information",
        href: site.links.sdmiWaiver,
        kind: "external",
      },
      {
        label: "DD waiver services",
        href: site.links.ddWaiver,
        kind: "external",
      },
      {
        label: "Montana HCBS waiver information sheet (PDF)",
        href: site.links.hcbsWaiverPdf,
        kind: "external",
      },
      ...mountainPacificLinks,
      {
        label: `Developmental Disabilities Program ${site.ddpPhone}`,
        href: site.ddpPhoneHref,
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
    program: "Nursing",
    title: "Skilled nursing at home",
    summary:
      "Medication support, bowel-care programs, and ostomy, tracheostomy, and catheter care.",
    body: "When needs go beyond caregiver support, Meadowlark can provide skilled nursing—medication management and refills, bowel-care programs, and ongoing care for ostomies, tracheostomies, catheters, and similar needs. Nursing may be private pay, another third-party funder, or VA when authorized. We will be clear about nursing versus personal care.",
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
    program: "Private pay, insurance & VA",
    chip: "Private pay / insurance / VA Community Care",
    title: "Paying privately—or using insurance or VA coverage",
    summary:
      "Non-skilled private pay or insurance, VA Community Care, and Aid & Attendance. VA decides eligibility.",
    body: "Not on Medicaid? Meadowlark provides non-skilled home care through private pay and certain third-party insurance. We participate in VA Community Care and also help veterans who use private pay or Aid & Attendance. The VA decides eligibility; we deliver care once it is approved or you are paying privately.",
    bullets: [
      "Live-in care",
      "Companion support",
      "Personal assistance",
      "Respite",
    ],
    primaryCta: {
      label: `Call Meadowlark ${site.phone}`,
      href: site.phoneHref,
      kind: "phone",
    },
    links: [
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
        label: "VA Homemaker and Home Health Aide care",
        href: site.links.vaHomemaker,
        kind: "external",
      },
      {
        label: "Apply for VA health care",
        href: site.links.vaApply,
        kind: "external",
      },
      {
        label: "VA Aid & Attendance",
        href: site.links.vaAidAttendance,
        kind: "external",
      },
      {
        label: "VA Montana health care",
        href: site.links.vaMontana,
        kind: "external",
      },
    ],
  },
];

export const homeServiceTeasers: HomeTeaser[] = [
  {
    id: "cfcs-pcs",
    href: "/services#cfcs-pcs",
    title: "CFCS/PCS (formerly CFC/PAS)",
    summary:
      "Agency-based CFCS/PCS. If you qualify, there is no services waitlist—authorization still takes time.",
  },
  {
    id: "hcbs-waiver",
    href: "/services#hcbs-waiver",
    title: "HCBS Big Sky / SDMI / DD",
    summary:
      "Big Sky, SDMI, and/or DD waiver supports as authorized on your plan. Some waivers have wait lists.",
  },
  {
    id: "private-pay",
    href: "/services#private-pay",
    title: "Private pay / insurance / VA Community Care",
    summary:
      "Non-skilled private pay or insurance, VA Community Care, and Aid & Attendance. VA decides eligibility.",
  },
  {
    id: "respite",
    href: "/services#private-pay",
    title: "Respite",
    summary:
      "Short-term relief at home for families and caregivers. Available through private pay or when authorized on a plan.",
  },
];
