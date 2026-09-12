import { NextResponse } from "next/server";

import { isStaffDocSlug, readStaffDoc } from "@/lib/staff-docs";
import { staffLoginUrl } from "@/lib/staff-access";
import { getOptionalStaffSession } from "@/lib/staff-session";

type StaffDocContext = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: StaffDocContext) {
  const { slug } = await context.params;
  const session = await getOptionalStaffSession();

  if (!session) {
    const login = new URL(
      staffLoginUrl(`/staff/docs/${slug}`),
      request.url
    );
    return NextResponse.redirect(login);
  }

  if (!session.canAccessPortal) {
    return NextResponse.redirect(new URL("/staff", request.url));
  }

  if (!isStaffDocSlug(slug)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const result = await readStaffDoc(slug);
  if ("missing" in result) {
    return new NextResponse(
      `Staff document is not in the repo yet: ${result.doc.file}`,
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
      "Content-Disposition": `inline; filename="${result.doc.downloadName}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
