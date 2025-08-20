// lib/seo.ts
import { siteConfig } from '@/constant/config';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export function generateMetadata({ title,
                                   description,
                                   url,
                                   image,
                                 }: SEOProps) {
  const metaTitle = title
    ? `${title} | ${siteConfig.title}`
    : siteConfig.metaTitle;

  const metaDescription = description || siteConfig.description;
  const metaUrl = url || siteConfig.url;
  const metaImage = image || `${siteConfig.url}/images/og.jpg`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: siteConfig.title,
      images: [metaImage],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    robots: { index: true, follow: true },
  };
}
