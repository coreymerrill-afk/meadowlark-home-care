import { NextResponse } from "next/server";

import { readPersonEmploymentForm } from "@/lib/employment-forms";
import { staffLoginUrl } from "@/lib/staff-access";
import { getOptionalStaffSession } from "@/lib/staff-session";

type EmploymentFormContext = {
  params: Promise<{ person: string; slug: string }>;
};

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: EmploymentFormContext) {
  const { person, slug } = await context.params;
  const session = await getOptionalStaffSession();

  if (!session) {
    const login = new URL(
      staffLoginUrl(`/staff/employment-forms/${person}/${slug}`),
      request.url
    );
    return NextResponse.redirect(login);
  }

  if (session.role !== "admin") {
    return NextResponse.redirect(
      new URL("/staff?notice=admin-only", request.url)
    );
  }

  const result = await readPersonEmploymentForm(person, slug);
  if ("unknownPerson" in result || "unknownForm" in result) {
    return new NextResponse("Not found", { status: 404 });
  }

  if ("missing" in result) {
    return new NextResponse(
      `Employment form is not in the repo yet: ${result.fileHint}`,
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "private, no-store",
          "X-Robots-Tag": "noindex, nofollow",
        },
      }
    );
  }

  const body = new Uint8Array(result.bytes);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${result.downloadName}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
