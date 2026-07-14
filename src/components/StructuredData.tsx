import { siteUrl, brandName } from "@/lib/seo";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: siteUrl,
    logo: `${siteUrl}/opengraph-image`,
    description:
      "Professional photo editing, portrait retouching, cinematic color grading and RAW photo enhancement."
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
