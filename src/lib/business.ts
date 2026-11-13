/**
 * Single source of truth for the business's structured-data identity (schema.org).
 * Pages reference it by `@id` (businessRef) or embed it in full (businessEntity) so
 * name, location and contact details stay consistent everywhere search engines read them.
 */
const SITE = "https://www.logie.nz";

export const BUSINESS_ID = `${SITE}/#business`;

export const businessRef = { "@id": BUSINESS_ID };

export const businessEntity = {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: "Logie Web Services",
    alternateName: "Logie Web Services NZ",
    description:
        "Affordable web design and development for small businesses, startups and charities in Whanganui and across New Zealand.",
    url: `${SITE}/`,
    email: "kiaora@logie.nz",
    image: `${SITE}/assets/images/og-image.jpg`,
    logo: `${SITE}/assets/images/logienz-640.webp`,
    founder: { "@type": "Person", name: "Nathan Addison" },
    address: {
        "@type": "PostalAddress",
        addressLocality: "Whanganui",
        addressRegion: "Manawatū-Whanganui",
        addressCountry: "NZ",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: -39.9301,
        longitude: 175.0479,
    },
    areaServed: [
        { "@type": "City", name: "Whanganui" },
        { "@type": "AdministrativeArea", name: "Manawatū-Whanganui" },
        { "@type": "Country", name: "New Zealand" },
        { "@type": "Country", name: "Australia" },
    ],
    hasMap: "https://share.google/KZHRxEVwJ7FY83Nue",
    sameAs: ["https://www.facebook.com/logienz/"],
    knowsAbout: ["Web Development", "Website Design", "E-commerce", "Search Engine Optimisation"],
    priceRange: "$$",
};
