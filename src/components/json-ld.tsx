import { formatAddress, site } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeHealthCareService",
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    faxNumber: site.fax,
    email: site.careersEmail,
    foundingDate: String(site.foundedYear),
    founder: site.founders.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Missoula",
        containedInPlace: { "@type": "State", name: "Montana" },
      },
    ],
    sameAs: [site.facebookUrl],
    slogan: site.missionLine,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function AddressLine() {
  return <span>{formatAddress()}</span>;
}
