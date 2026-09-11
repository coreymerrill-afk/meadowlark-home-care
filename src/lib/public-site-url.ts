const PRODUCTION_SITE_URL = "https://meadowlarkhomecare.com";

function isLocalHostUrl(value: string): boolean {
  try {
    const { hostname } = new URL(value);
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "[::1]"
    );
  } catch {
    return true;
  }
}

function withHttps(hostOrUrl: string): string {
  const trimmed = hostOrUrl.trim().replace(/\/$/, "");
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Public origin for canonical URLs, Open Graph, sitemap, and robots.
 * Localhost from `.env.local` is ignored on production builds so preview
 * and Vercel deploys never emit `http://127.0.0.1` metadata.
 */
export function resolvePublicSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const productionBuild = process.env.NODE_ENV === "production";

  if (configured && !(productionBuild && isLocalHostUrl(configured))) {
    return withHttps(configured);
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) {
    return withHttps(vercelHost);
  }

  return PRODUCTION_SITE_URL;
}
