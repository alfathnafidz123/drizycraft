import { Metadata, ResolvingMetadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import { ResArticleMetadata } from '@/interfaces/article.interfaces';
import SEOJsonLD from '@/components/SEOJsonLD';
import ErrorBoundary from '@/components/ErrorBoundary';
type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/meta/${id}`,
    { cache: 'no-store' }
  );
  const resMetadata: ResArticleMetadata = await res.json();

  const previousMetadata = await parent;

  const previousImages = previousMetadata.openGraph?.images || [];
  const previousTwitterImages = previousMetadata.twitter?.images || [];

  // Fungsi untuk menghasilkan URL gambar yang dioptimalkan
  const getOptimizedImageUrl = (url: string, width: number) =>
    `https://drizycraft.com/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=75`;

  // URL gambar yang dioptimalkan untuk OpenGraph dan Twitter
  const ogImageUrl = getOptimizedImageUrl(resMetadata.data.image, 1200);
  const twitterImageUrl = getOptimizedImageUrl(resMetadata.data.image, 1200);

  const title = resMetadata.data.realTitle;

  // helper: normalize title
  const cleanTitle = title
    .replace(/[-–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const words = cleanTitle.split(' ');

  // keyword dasar
  const baseKeywords = [
    title,
    cleanTitle,
    `${title} svg`,
    `${title} 3d svg`,
    `${title} file`,
  ];

  // keyword kombinasi
  const combinedKeywords = [
    `${words.slice(0, 2).join(' ')}`,            // coffee grinder
    `${words.slice(0, 2).join(' ')} storage`,    // coffee grinder storage
    `${words.slice(0, 3).join(' ')}`,            // coffee grinder storage
    `${words.join(' ')} svg`,                     // coffee grinder storage box 3d svg
  ];

  // keyword konteks niche
  const nicheKeywords = [
    "3d svg file",
    "laser cut svg",
    "cnc svg",
    "digital svg product",
    "svg for laser cutting",
  ];

  // gabungkan & hapus duplikat
  const keywords = Array.from(
    new Set([
      "drizy craft",
      "drizy",
      ...baseKeywords,
      ...combinedKeywords,
      ...nicheKeywords,
    ])
  );



  return {
    title: `${resMetadata.data.realTitle} | Drizy Craft`,
    description: resMetadata.data.description,
    alternates: {
      canonical: `https://drizycraft.com/product/${id}`,
    },
    keywords,
    robots: { index: true, follow: true },
    icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon-16x16.png',
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: `/favicon/site.webmanifest`,
    openGraph: {
      ...previousMetadata.openGraph,
      url: `https://drizycraft.com/product/${id}`,
      title: resMetadata.data.realTitle,
      description: resMetadata.data.description,
      siteName: siteConfig.title,
      images: [
        {
          url: resMetadata.data.image,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: resMetadata.data.realTitle,
          type: 'image/jpeg',
        },
        ...previousImages,
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: resMetadata.data.realTitle,
      description: resMetadata.data.description,
      images: [
        {
          url: resMetadata.data.image,
          width: 1200,
          height: 630,
          alt: resMetadata.data.title,
        },
        ...previousTwitterImages,
      ],
    },
    authors: [
      {
        name: 'Drizy Studio',
        url: 'https://drizycraft.com',
      },
    ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SEOJsonLD />
    </>
  );
}
