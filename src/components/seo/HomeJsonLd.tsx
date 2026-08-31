// components/seo/HomeJsonLd.tsx
// Pasang di app/page.tsx (landing page drizycraft.com)
//
// FIX #2 & #8: landing page sebelumnya TIDAK punya structured data sama sekali.
// Untuk marketplace digital product, ini yang paling berdampak ke SERP:
// - Organization → branding di Knowledge Panel, logo muncul di hasil pencarian
// - WebSite + SearchAction → sitelinks search box di bawah hasil pencarian utama

export function HomeJsonLd() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Drizy Craft",
    url: "https://drizycraft.com",
    logo: "https://drizycraft.com/logo.png",
    sameAs: [
      // isi sosial media yang aktif, hapus baris yang tidak ada
      // "https://www.instagram.com/drizycraft",
      // "https://www.facebook.com/drizycraft",
      // "https://www.pinterest.com/drizycraft",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Drizy Craft",
    url: "https://drizycraft.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://drizycraft.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}