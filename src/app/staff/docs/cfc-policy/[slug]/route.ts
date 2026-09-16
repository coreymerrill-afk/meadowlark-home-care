import { NextResponse } from "next/server";

import {
  isCfcPolicySlug,
  readCfcPolicyDoc,
} from "@/lib/cfc-agency-policy";
import { staffLoginUrl } from "@/lib/staff-access";
import { getOptionalStaffSession } from "@/lib/staff-session";

type CfcPolicyDocContext = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: CfcPolicyDocContext) {
  const { slug } = await context.params;
  const session = await getOptionalStaffSession();

  if (!session) {
    const login = new URL(
      staffLoginUrl(`/staff/docs/cfc-policy/${slug}`),
      request.url
    );
    return NextResponse.redirect(login);
  }

  if (!session.canAccessPortal) {
    return NextResponse.redirect(new URL("/staff", request.url));
  }

  if (!isCfcPolicySlug(slug)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const result = await readCfcPolicyDoc(slug);
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
