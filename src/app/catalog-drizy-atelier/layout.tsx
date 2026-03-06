import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import SEOJsonLD from '@/components/SEOJsonLD';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL("https://drizycraft.com/catalog-drizy-atelier/"),
  title: {
    default:
      "Drizy Atelier",
    template: "%s",
  },
  description:
    "Atelier is more than just a showcase. it's a heaven for those seeking the hottest and newest designs! Scroll down to discover our latest releases, fresh out of the oven, with sleek layouts, stunning visuals, and an unparalleled experience. Keep diving to uncover hidden treasures!.",
  keywords: [
    "SVG files",
    "Cricut SVG",
    "Silhouette SVG",
    "Craft SVG",
    "Cut files",
    "Drizycraft atelier",
    "Drizy Atelier",
  ],
  authors: [{ name: "Drizy Craft" }],
  creator: "Drizy Craft",
  publisher: "Drizy Craft",

  alternates: {
    canonical: "https://drizycraft.com/catalog-drizy-atelier",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://drizycraft.com/catalog-drizy-atelier",
    title:
      "Drizy Atelier",
    description:
      "Atelier is more than just a showcase. it's a heaven for those seeking the hottest and newest designs! Scroll down to discover our latest releases, fresh out of the oven, with sleek layouts, stunning visuals, and an unparalleled experience. Keep diving to uncover hidden treasures!.",
    siteName: "Drizy Craft",
    images: [
      {
        url: "https://drizycraft.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Drizy Craft SVG Marketplace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Drizy Atelier",
    description:
      "Atelier is more than just a showcase. it's a heaven for those seeking the hottest and newest designs! Scroll down to discover our latest releases, fresh out of the oven, with sleek layouts, stunning visuals, and an unparalleled experience. Keep diving to uncover hidden treasures!.",
    images: ["https://drizycraft.com/og-image.jpg"],
  },
};


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
