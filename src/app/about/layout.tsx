import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import SEOJsonLD from '@/components/SEOJsonLD';
import { generateMetadata } from '@/lib/seo';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them

export const metadata = generateMetadata({
  title: 'About',
  description: siteConfig.description,
  url: 'https://drizycraft.com/about',
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
