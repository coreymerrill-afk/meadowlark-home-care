import type { Metadata } from "next";
import Link from "next/link";

import { PcaCertificateForm } from "@/components/pca-certificate-form";
import { staffRobots } from "@/lib/staff";
import { requireAdminSession } from "@/lib/staff-session";

export const metadata: Metadata = {
  title: "PCA certificate",
  description:
    "Print a Personal Care Attendant certificate insert for gold-foil letter paper.",
  robots: staffRobots,
  alternates: { canonical: "/staff/forms/pca-certificate" },
};

export default async function PcaCertificatePage() {
  const session = await requireAdminSession("/staff/forms/pca-certificate");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="pca-no-print w-fit rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-orange uppercase">
        Staff only
      </p>
      <p className="pca-no-print mt-4 text-sm font-medium text-primary">
        <Link href="/staff" className="underline-offset-4 hover:underline">
          Staff portal
        </Link>
        <span className="text-muted-foreground"> / </span>
        <Link href="/staff/forms" className="underline-offset-4 hover:underline">
          Forms
        </Link>
        <span className="text-muted-foreground"> / PCA certificate</span>
      </p>
      <h1 className="pca-no-print mt-3 text-4xl sm:text-5xl">
        PCA certificate
      </h1>
      <p className="pca-no-print mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Fill this in, print on US Letter, then cut along the dashed guides and
        paste the insert inside the gold-foil certificate border. Admin only.
      </p>
      <PcaCertificateForm defaultSupervisorName={session.name ?? ""} />
    </section>
  );
}
