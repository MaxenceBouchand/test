import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plombier Artisan Montpellier | Urgence 24h/7j",
  description:
    "Plombier artisan indépendant à Montpellier. Interventions d'urgence 24h/7j, devis gratuit, travaux garantis. Dépannage, rénovation, installation sanitaire.",
  keywords: [
    "plombier Montpellier",
    "urgence plomberie",
    "dépannage plombier",
    "artisan plombier 34",
    "plomberie Hérault",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Plombier Artisan Montpellier",
    title: "Plombier Artisan Montpellier | Urgence 24h/7j",
    description:
      "Interventions rapides, devis gratuit, travail garanti. Votre plombier de confiance à Montpellier.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Artisan Plombier Montpellier",
  image: "/og-image.jpg",
  telephone: "+33-4-XX-XX-XX-XX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Montpellier",
    addressLocality: "Montpellier",
    postalCode: "34000",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6119,
    longitude: 3.8772,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  priceRange: "€€",
  areaServed: {
    "@type": "City",
    name: "Montpellier",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de plomberie",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
