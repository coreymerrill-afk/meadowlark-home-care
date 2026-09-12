import { headers } from "next/headers";

import { resolvePublicSiteUrl } from "@/lib/public-site-url";

export async function getRequestOrigin(): Promise<string> {
  const configured = process.env.AUTH_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  const headerStore = await headers();
  const host =
    headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  if (!host) {
    return resolvePublicSiteUrl();
  }

  const proto =
    headerStore.get("x-forwarded-proto") ??
    (host.includes("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return `${proto}://${host}`;
}
