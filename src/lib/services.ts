import { offices, site } from "@/lib/site";

export type ServiceLinkKind = "external" | "phone" | "internal";

export type ServiceLink = {
  label: string;
  href: string;
  kind: ServiceLinkKind;
};

export type ServiceId = "cfcs-pcs" | "va" | "private-pay" | "hcbs-waiver";

export type HomeTeaserId = "cfcs-pcs" | "va" | "private-pay";

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

/** Shared eligibility contacts — shown once on the Services page. */
export const servicesContactCluster: ServiceLink[] = [
  {
    label: `Office of Public Assistance ${site.opaPhone}`,
    href: site.opaPhoneHref,
    kind: "phone",
  },
  ...site.mountainPacific.all.map((phone) => ({
    label: `Mountain Pacific ${phone.label}`,
    href: phone.href,
    kind: "phone" as const,
  })),
  {
    label: `Developmental Disabilities Program ${site.ddpPhone}`,
    href: site.ddpPhoneHref,
    kind: "phone",
  },
  ...offices.map((office) => ({
    label: `Call Meadowlark ${office.name} ${office.phone}`,
    href: office.phoneHref,
    kind: "phone" as const,
  })),
];

export const serviceBlocks: ServiceBlock[] = [
  {
    id: "cfcs-pcs",
    program: "Montana Medicaid personal care",
    chip: "CFCS/PCS",
    title: "Medicaid personal care (CFCS/PCS)",
    summary:
      "Agency-based CFCS/PCS. If you qualify, there is no services waitlist—authorization still takes time.",
    body: "If you have Montana Medicaid—or you are applying—you may qualify for in-home personal care through CFCS/PCS (formerly CFC/PAS): meals, bathing and hygiene, light housekeeping, shopping, and community activities. Meadowlark is an agency-based provider. Once the state authorizes services, we can deliver them. We do not decide eligibility. CFCS/PCS is an entitlement program: if you qualify, there is no services waitlist, though authorization still takes time.",
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
    ],
  },
  {
    id: "va",
    program: "Veterans",
    chip: "VA Community Care",
    title: "Veterans & VA Community Care",
    summary:
      "VA Community Care provider. Veterans also use private pay or Aid & Attendance.",
    body: "Meadowlark participates in VA Community Care. Enrolled veterans may receive authorized in-home personal care through Community Care. Families also use private pay or Aid & Attendance. The VA decides eligibility; we deliver care once you are approved or paying privately.",
    primaryCta: {
      label: "Check VA Community Care eligibility",
      href: site.links.vaCommunityCare,
      kind: "external",
    },
    links: [
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
      ...offices.map((office) => ({
        label: `Call Meadowlark ${office.name} ${office.phone}`,
        href: office.phoneHref,
        kind: "phone" as const,
      })),
    ],
  },
  {
    id: "private-pay",
    program: "Private pay & insurance",
    chip: "Private pay / insurance",
    title: "Private pay & insurance",
    summary:
      "Non-skilled private pay and insurance, including respite.",
    body: "Not on Medicaid or VA? Meadowlark offers private pay and works with third-party insurance for non-skilled home care—live-in care, companion support, personal assistance, and respite.",
    bullets: [
      "Live-in care",
      "Companion support",
      "Personal assistance",
      "Respite",
    ],
    primaryCta: ...offices.map((office) => ({
        label: `Call Meadowlark ${office.name} ${office.phone}`,
        href: office.phoneHref,
        kind: "phone" as const,
      })),
    links: [],
  },
  {
    id: "hcbs-waiver",
    program: "Medicaid HCBS waiver",
    chip: "HCBS Big Sky / SDMI / DD",
    title: "Medicaid HCBS waiver",
    summary:
      "Big Sky, SDMI, and/or DD supports as authorized. Some waivers have wait lists.",
    body: "Meadowlark serves members on Montana HCBS waivers—including Big Sky, SDMI, and DD—for authorized supports such as social supervision, homemaker services, specially trained attendants, and habilitation aide help. Some waivers have wait lists. The state handles eligibility; we deliver what is on your approved plan.",
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
    ],
  },
];

export const homeServiceTeasers: HomeTeaser[] = [
  {
    id: "cfcs-pcs",
    href: "/services#cfcs-pcs",
    title: "CFCS/PCS",
    summary:
      "Agency-based Medicaid personal care. If you qualify, there is no services waitlist—authorization still takes time.",
  },
  {
    id: "va",
    href: "/services#va",
    title: "VA Community Care",
    summary:
      "VA Community Care provider. Veterans also use private pay or Aid & Attendance.",
  },
  {
    id: "private-pay",
    href: "/services#private-pay",
    title: "Private pay & insurance",
    summary:
      "Non-skilled home care, including respite.",
  },
];
