import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { staffLoginUrl } from "@/lib/staff-access";

export const proxy = auth((req) => {
  const { pathname, search } = req.nextUrl;

  if (!pathname.startsWith("/staff")) {
    return NextResponse.next();
  }

  if (!req.auth?.user?.email) {
    const loginUrl = new URL(
      staffLoginUrl(`${pathname}${search}`),
      req.nextUrl.origin
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/staff", "/staff/:path*"],
};
