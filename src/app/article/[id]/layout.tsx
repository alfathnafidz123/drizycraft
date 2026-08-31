import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import { ResArticleMetadata } from '@/interfaces/article.interfaces';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/article/meta/${id}`,
    { cache: 'no-store' }
  );
  const resMetadata: ResArticleMetadata = await res.json();

  const keywords = generateKeywordsFromTitle(resMetadata.data.realTitle);

  const articleUrl = `${siteConfig.url}/article/${id}`;

  const shortDescription = truncate(resMetadata.data.description, 160);

  return {
    metadataBase: new URL(siteConfig.url),
    title: resMetadata.data.realTitle,
    description: shortDescription,
    keywords,
    alternates: { canonical: articleUrl },
    robots: { index: true, follow: true },
    icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon-16x16.png',
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: `/favicon/site.webmanifest`,
    openGraph: {
      url: articleUrl,
      title: resMetadata.data.realTitle,
      description: shortDescription,
      siteName: siteConfig.title,
      images: [
        {
          url: resMetadata.data.image,
          width: 1200,
          height: 630,
          alt: resMetadata.data.title,
        },
      ],
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: resMetadata.data.realTitle,
      description: shortDescription,
      images: [
        {
          url: resMetadata.data.image,
          width: 1200,
          height: 630,
          alt: resMetadata.data.title,
        },
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

function truncate(text: string, max: number): string {
  if (!text) return '';
  return text.length > max ? text.slice(0, max - 1).trim() + '…' : text;
}

// Stopwords umum (ID + EN) yang dibuang karena tidak relevan sebagai keyword
const STOPWORDS = new Set([
  // Indonesian
  'yang', 'untuk', 'dengan', 'dari', 'pada', 'dalam', 'ini', 'itu', 'dan',
  'atau', 'akan', 'adalah', 'tidak', 'ke', 'di', 'ada', 'juga', 'bisa',
  'agar', 'saat', 'oleh', 'karena', 'sebagai', 'para', 'apa', 'cara',
  // English
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'and', 'or', 'of', 'to',
  'in', 'on', 'for', 'with', 'at', 'by', 'from', 'how', 'what', 'why',
]);

function generateKeywordsFromTitle(title?: string): string[] {
  if (!title) return [];

  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, '') // buang simbol/tanda baca
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));

  // dedupe sambil pertahankan urutan kemunculan
  const uniqueWords = Array.from(new Set(words));

  return [...uniqueWords, title]; // sertakan juga full title sebagai satu keyword phrase
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
