import { offices, site } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeHealthCareService",
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    telephone: offices.map((o) => o.phone),
    faxNumber: site.fax,
    email: site.contactEmail,
    foundingDate: String(site.foundedYear),
    founder: site.founders.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    })),
    address: offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.street,
      addressLocality: office.city,
      addressRegion: office.state,
      ...(office.postalCode ? { postalCode: office.postalCode } : {}),
      addressCountry: "US",
    })),
    areaServed: offices.map((office) => ({
      "@type": "City",
      name: office.city,
      containedInPlace: { "@type": "State", name: "Montana" },
    })),
    sameAs: [site.facebookUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function AddressLine() {
  return (
    <span>
      {offices.map((o, i) => (
        <span key={o.id}>
          {i > 0 ? " · " : null}
          {o.city}
        </span>
      ))}
    </span>
  );
}
