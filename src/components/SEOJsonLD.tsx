// components/ProductJsonLD.tsx
import { siteConfig } from '@/constant/config';

interface ProductJsonLDProps {
  product: {
    realTitle: string;
    description?: string;
    image: string[];
    price: number[];
    id: string;
    meta?: { title: string }[];
    product: {
      name: string;
      description: string; // HTML string dari product.description
      imageUrl: string[];
      price: number[];
      id: string;
    };
  };
}

export default function ProductJsonLD({ product }: ProductJsonLDProps) {
  const productUrl = product?.meta?.[0]?.title
    ? `${siteConfig.url}/product/${product.meta[0].title}`
    : siteConfig.url;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.realTitle,
    description: product.description || product.realTitle,
    image: product.image,
    url: productUrl,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: siteConfig.title,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: product.product.price?.[0] ?? 0,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}