// components/BreadcrumbJsonLD.tsx
'use client';

import { siteConfig } from '@/constant/config';

interface BreadcrumbJsonLDProps {
  items: { name: string; url: string }[];
}

export default function BreadcrumbJsonLD({ items }: BreadcrumbJsonLDProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}