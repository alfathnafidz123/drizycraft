// app/product/[id]/layout.tsx — FINAL VERSION
// (setelah opengraph-image.tsx ditambahkan)
//
// PERUBAHAN dari versi sebelumnya:
// - Hapus field `images` dari openGraph dan twitter
//   → sudah di-handle otomatis oleh opengraph-image.tsx
// - Hapus `getOptimizedImageUrl` — tidak lagi dibutuhkan
// - Hapus `previousImages` dan `previousTwitterImages` — tidak relevan
//   setelah images di-handle oleh file convention

import { Metadata, ResolvingMetadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';


import { siteConfig } from '@/constant/config';
import { ResArticleMetadata } from '@/interfaces/article.interfaces';

type Props = {
  params: { id: string };
};

const MAX_DESCRIPTION_LENGTH = 160;

function truncateDescription(description: string): string {
  const trimmed = (description || '').trim();
  if (trimmed.length <= MAX_DESCRIPTION_LENGTH) return trimmed;
  const sliced = trimmed.slice(0, MAX_DESCRIPTION_LENGTH);
  const lastSpace = sliced.lastIndexOf(' ');
  const safe = lastSpace > 50 ? sliced.slice(0, lastSpace) : sliced;
  return `${safe.trimEnd()}...`;
}

const FALLBACK_METADATA: Metadata = {
  title: `SVG Cut File | ${siteConfig.title}`,
  description:
    'Premium SVG cut files for Cricut & Silhouette. Instant download from Drizy Craft.',
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  let resMetadata: ResArticleMetadata;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/meta/${id}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return FALLBACK_METADATA;
    resMetadata = await res.json();
  } catch (error) {
    console.error(`[generateMetadata] Gagal fetch produk ${id}:`, error);
    return FALLBACK_METADATA;
  }

  if (!resMetadata?.data?.realTitle) return FALLBACK_METADATA;

  const title = resMetadata.data.realTitle;
  const description = truncateDescription(resMetadata.data.description);

  const cleanTitle = title
    .replace(/[-–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const words = cleanTitle.split(' ');

  const keywords = Array.from(
    new Set([
      'drizy craft',
      'drizy',
      title,
      cleanTitle,
      `${title} svg`,
      `${title} 3d svg`,
      `${title} file`,
      `${words.slice(0, 2).join(' ')}`,
      `${words.slice(0, 2).join(' ')} svg`,
      `${words.slice(0, 3).join(' ')}`,
      `${words.join(' ')} svg`,
      '3d svg file',
      'laser cut svg',
      'cnc svg',
      'digital svg product',
      'svg for laser cutting',
    ])
  );

  return {
    // FIX: title tanpa duplikasi brand — template "%s | Drizy Craft"
    // sudah di-set di root layout, jadi cukup pass title produk saja
    title,
    description,
    alternates: {
      canonical: `https://drizycraft.com/product/${id}`,
    },
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon-16x16.png',
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: '/favicon/site.webmanifest',
    openGraph: {
      url: `https://drizycraft.com/product/${id}`,
      title,
      description,
      siteName: siteConfig.title,
      // TIDAK ada field `images` di sini —
      // Next.js otomatis pakai opengraph-image.tsx sebagai og:image
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // TIDAK ada field `images` di sini —
      // Next.js otomatis pakai opengraph-image.tsx sebagai twitter:image
    },
    authors: [
      {
        name: 'Drizy Studio',
        url: 'https://drizycraft.com',
      },
    ],
  };
}

export default function ProductLayout({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}