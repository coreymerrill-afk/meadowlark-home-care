import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./src/data/staff-whitelist.csv"],
    "/staff/docs/*": ["./content/staff-docs/**"],
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
        source: "/about-us.html",
        destination: "/about",
        permanent: true,
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
