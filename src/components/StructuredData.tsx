import { brandName, contactEmail, defaultOgImage, siteUrl, socialLinks } from "@/lib/seo";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: brandName,
        url: siteUrl,
        image: {
          "@type": "ImageObject",
          url: defaultOgImage,
          width: 1200,
          height: 630,
        },
        description:
          "Professional hand-edited photo retouching, portrait refinement, cinematic color grading, and RAW photo enhancement for clients worldwide.",
        email: contactEmail,
        sameAs: socialLinks,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: contactEmail,
          availableLanguage: "English",
          areaServed: "Worldwide",
        },
        knowsAbout: [
          "Photo retouching",
          "Portrait editing",
          "Color correction",
          "Color grading",
          "RAW photo editing",
          "Editorial photography",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: brandName,
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
