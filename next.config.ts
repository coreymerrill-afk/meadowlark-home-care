import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./src/data/staff-whitelist.csv"],
    "/staff/docs/*": ["./content/staff-docs/**"],
    "/staff/docs/cfc-policy/*": ["./content/staff-docs/cfc-policy/**"],
    "/staff/employment-forms/*": ["./content/staff-docs/**"],
    "/staff/employment-forms/*/*": ["./content/staff-docs/employment-forms/**"],
  },
  async redirects() {
    return [
      {
        source: "/careers",
        destination: "/work-with-us",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: false,
      },
      {
        source: "/about-us.html",
        destination: "/",
        permanent: false,
      },
      {
        source: "/services.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/work-with-us.html",
        destination: "/work-with-us",
        permanent: true,
      },
      {
        source: "/request-access",
        destination: "/login/request-access",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
