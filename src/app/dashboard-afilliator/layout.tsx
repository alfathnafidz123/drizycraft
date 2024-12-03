import { Metadata } from 'next';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import AffiliatorNavigation from '@/components/affiliator/navigation';
import SectionContainer from '@/components/container/sectionContainer';

import { siteConfig } from '@/constant/config';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | Afilliator Dashboard`,
  },
  description: siteConfig.description,
  robots: { index: false, follow: false },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`/images/drizy-simple-icon.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`/images/drizy-simple-icon.png`],
  },
  authors: [
    {
      name: 'Dionisius Aditya',
      url: 'https://github.com/dionisius77',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SectionContainer className="max-md:p-2 lg:py-16">
      <AffiliatorNavigation />
      {children}
    </SectionContainer>
  );
}
