import { Metadata, ResolvingMetadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import SEOJsonLD from '@/components/SEOJsonLD';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;
  const cleanId = decodeURIComponent(id);
  return {
    title: {
      default: cleanId,
      template: '%s',
    },
    description:
      'Drizy Craft provides premium SVG cut files for Cricut & Silhouette. Unique designs, instant downloads, and creative assets for makers worldwide.',
    keywords: [
      `${cleanId} svg`,
      `${cleanId} 3d svg`,
      `${cleanId} file`,
      'SVG files',
      'Cricut SVG',
      'Silhouette SVG',
      'Craft SVG',
      'Cut files',
      'Drizycraft',
      'Drizy Craft',
      '3d svg file',
      'laser cut svg',
      'digital svg product',
      'svg for laser cutting',
    ],
    authors: [{ name: 'Drizy Craft' }],
    creator: 'Drizy Craft',
    publisher: 'Drizy Craft',

    alternates: {
      canonical: `https://drizycraft.com/category/${id}`,
    },

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

    openGraph: {
      type: 'website',
      url: 'https://drizycraft.com',
      title: 'Drizy Craft – Premium SVG Cut Files for Cricut & Silhouette',
      description:
        'Premium SVG cut files for Cricut & Silhouette. Instant download and high-quality designs for craft creators.',
      siteName: 'Drizy Craft',
      images: [
        {
          url: 'https://drizycraft.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Drizy Craft SVG Marketplace',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: 'Drizy Craft – Premium SVG Cut Files for Cricut & Silhouette',
      description:
        'Premium SVG cut files, instant downloads, and creative craft designs.',
      images: ['https://drizycraft.com/og-image.jpg'],
    },
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
