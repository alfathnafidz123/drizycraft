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
    `https://drizy-api.quadrakaryasantosa.com/crafter/product/meta/${id}`,
    { cache: 'no-store' }
  );
  const resMetadata: ResArticleMetadata = await res.json();

  return {
    title: {
      default: resMetadata.data.realTitle,
      template: `%s | ${siteConfig.url} Article`,
    },
    description: resMetadata.data.description,
    alternates: {
      canonical: `https://drizy-client.quadrakaryasantosa.com/product/${id}`,
    },
    robots: { index: true, follow: true },
    icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon-16x16.png',
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: `/favicon/site.webmanifest`,
    openGraph: {
      url: siteConfig.url,
      title: resMetadata.data.realTitle,
      description: resMetadata.data.description,
      siteName: siteConfig.title,
      images: [
        {
          url: resMetadata.data.image,
          width: 1200,
          height: 630,
          alt: resMetadata.data.title,
        },
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
      ],
    },
    authors: [
      {
        name: 'Drizy Studio',
        url: 'https://drizy-client.quadrakaryasantosa.com',
      },
    ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
