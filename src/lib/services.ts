import { site } from "@/lib/site";

export type ServiceLinkKind = "external" | "phone" | "internal";

export type ServiceLink = {
  label: string;
  href: string;
  kind: ServiceLinkKind;
};

export type ServiceId = "cfcs-pcs" | "va" | "private-pay" | "hcbs" | "pcca";

export type HomeTeaserId = "cfcs-pcs" | "hcbs" | "va" | "private-pay" | "pcca";

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

const requestCare: ServiceLink = {
  label: "Request care",
  href: "/contact",
  kind: "internal",
};

export type EligibilityContact = {
  org: string;
  role: string;
  phone: string;
  href: string;
};

/** Shared eligibility contacts — shown once on the Services page. */
export const servicesContactCluster: EligibilityContact[] = [
  {
    org: "Office of Public Assistance",
    role: "Medicaid applications",
    phone: site.opaPhone,
    href: site.opaPhoneHref,
  },
  {
    org: "Mountain Pacific",
    role: site.mountainPacific.cfcsAssessment.role,
    phone: site.mountainPacific.cfcsAssessment.label,
    href: site.mountainPacific.cfcsAssessment.href,
  },
  {
    org: "Mountain Pacific",
    role: site.mountainPacific.waiverScreening.role,
    phone: site.mountainPacific.waiverScreening.label,
    href: site.mountainPacific.waiverScreening.href,
  },
  {
    org: site.vaMontanaCommunityCare.org,
    role: site.vaMontanaCommunityCare.role,
    phone: site.vaMontanaCommunityCare.label,
    href: site.vaMontanaCommunityCare.href,
  },
];

export function eligibilityContactLabel(contact: EligibilityContact) {
  return `${contact.role} — ${contact.org} — ${contact.phone}`;
}

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
      requestCare,
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
      requestCare,
    ],
  },
  {
    id: "private-pay",
    program: "Private pay & insurance",
    chip: "Private pay & insurance",
    title: "Private pay & insurance",
    summary: "Non-skilled private pay and insurance, including respite.",
    body: "Not on Medicaid or VA? Meadowlark offers private pay and works with third-party insurance for non-skilled home care—companion support and outings, personal assistance, and respite.",
    bullets: ["Companion support", "Personal assistance", "Respite"],
    primaryCta: requestCare,
    links: [],
  },
  {
    id: "hcbs",
    program: "HCBS Big Sky / SDMI",
    chip: "HCBS Big Sky / SDMI",
    title: "Medicaid HCBS waiver",
    summary:
      "Big Sky and SDMI waiver supports when authorized on the member’s plan. Some waivers have wait lists.",
    body: "Meadowlark serves members on Montana HCBS waivers—including Big Sky and SDMI—for authorized supports such as social supervision, homemaker services, specially trained attendants, and habilitation aide help. Some waivers have wait lists. The state handles eligibility; we deliver what is on your approved plan.",
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
        label: "Montana HCBS waiver information sheet (PDF)",
        href: site.links.hcbsWaiverPdf,
        kind: "external",
      },
      requestCare,
    ],
  },
  {
    id: "pcca",
    program: "Montana Medicaid",
    chip: "PCCA",
    title: "Pediatric Complex Care Assistant (PCCA)",
    summary:
      "Approved Pediatric Complex Care Assistant provider agency for Montana Medicaid members under 21 with complex medical needs.",
    body: "Meadowlark is an approved PCCA provider agency. PCCA helps Montana Medicaid members under 21 with complex medical needs by employing licensed family caregivers to deliver physician-ordered care at home. The state decides eligibility and prior authorization; we coordinate as the provider agency.",
    primaryCta: {
      label: "Learn more (DPHHS)",
      href: site.links.pcca,
      kind: "external",
    },
    links: [requestCare],
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
    id: "hcbs",
    href: "/services#hcbs",
    title: "HCBS waivers",
    summary:
      "Big Sky and SDMI waiver supports when authorized on the member’s plan. Some waivers have wait lists.",
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
    summary: "Non-skilled home care, including respite.",
  },
  {
    id: "pcca",
    href: "/services#pcca",
    title: "PCCA",
    summary:
      "Approved Pediatric Complex Care Assistant provider agency for Montana Medicaid members under 21 with complex medical needs.",
  },
];
