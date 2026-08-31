import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import { generateMetadata } from '@/lib/seo';
import SEOJsonLD from '@/components/SEOJsonLD';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them

export const metadata = generateMetadata({
  title: 'Free Trial',
  description: 'Premium Craft SVG Cut Files for Cricut and Silhouette',
  url: 'https://drizycraft.com/free-trial',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <>
    {children}
    {/*<SEOJsonLD />*/}
  </>
  );
}
