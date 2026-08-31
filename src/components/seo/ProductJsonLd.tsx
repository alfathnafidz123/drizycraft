// components/seo/ProductJsonLd.tsx
// Pasang di halaman DETAIL PRODUK (misal /product/[slug]/page.tsx)
//
// FIX #2 (paling krusial): tanpa ini, listing produk SVG di Google hanya
// muncul sebagai link biasa. Dengan Product schema, Google BISA (tidak
// dijamin, tapi berpotensi) menampilkan harga, ketersediaan, dan rating
// langsung di hasil pencarian — meningkatkan CTR signifikan untuk
// marketplace digital product seperti Etsy/Creative Fabrica competitor.

type ProductJsonLdProps = {
  name: string;
  description: string;
  image: string;
  path: string;
};

export function ProductJsonLd({
                                name,
                                description,
                                image,
                                path,
                              }: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    offers: {
      "@type": "Offer",
      url: `https://drizycraft.com${path}`,
      availability: "https://schema.org/InStock",
      // Digital product: instant download, tidak perlu shipping
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}