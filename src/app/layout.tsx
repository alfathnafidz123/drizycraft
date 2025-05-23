import { GoogleAnalytics } from '@next/third-parties/google';
// import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from 'next';
// const Campaign = dynamic(() => import('@/components/campaign-wrapper'), { ssr: false, loading: () => <LoadingComponent /> });
// import Navbar from '@/layout/navbar';
// import dynamic from 'next/dynamic';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import 'react-toastify/dist/ReactToastify.css';

// import LoadingComponent from '@/components/Loading';
import FacebookPixelEvents from '@/components/pixel-events';

import Loading from '@/app/loading';
import StoreProvider from '@/app/StoreProvider';
// const StoreProvider = lazy(() => import('@/app/StoreProvider'));
import { siteConfig } from '@/constant/config';
import AsyncCSSSlick from '@/layout/asyncCssSlick';
import AsyncCSSThemeSlick from '@/layout/asyncCssThemeSlick';

const Footer = lazy(() => import('@/layout/footer'));
const Navbar = lazy(() => import('@/layout/navbar'));

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
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
    images: [
      { url: `/images/drizy-simple-icon.png`, width: 1200, height: 630, alt: 'Drizy' },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      { url: `/images/drizy-simple-icon.png`, width: 1200, height: 630, alt: 'Drizy' },
    ],
  },
  authors: [
    {
      name: 'Drizycraft',
      url: 'https://github.com/itdrizy',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='!scroll-smooth' lang='en'>
      <head>
        {/* preload Katide font */}
        <link
          rel='preload'
          href='/fonts/Katide-Heavy.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        {/* <link
          rel='preload'
          href='/fonts/Katide-ExtraBold.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        /> */}
        <link
          rel='preload'
          href='/fonts/Katide-Bold.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        {/* <link
          rel='preload'
          href='/fonts/Katide-SemiBold.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Katide-Medium.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        /> */}
        <link
          rel='preload'
          href='/fonts/Katide-Regular.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        {/* <link
          rel='preload'
          href='/fonts/Katide-Light.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Katide-Thin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        /> */}

        {/* preload Inter font */}
        {/* <link
          rel='preload'
          href='/fonts/Inter-ExtraLight.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Inter-Bold.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Inter-SemiBold.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Inter-Medium.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Inter-Regular.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Inter-Light.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Inter-Thin.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/Hastle.woff2'
          as='font'
          type='font/otf'
          crossOrigin='anonymous'
        /> */}
        <meta
          name="google-site-verification"
          content="ArmWovD8E6CQwNmlc2ghI_MFDPCBncuZKT7qjpTZfTM"
        />

        <AsyncCSSSlick />
        <AsyncCSSThemeSlick />
      </head>

      <body>
        <StoreProvider>
          {/* <Campaign /> */}
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          <ToastContainer />
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </StoreProvider>
        <Suspense fallback={null}>
          <FacebookPixelEvents />
        </Suspense>
      </body>
      {/* <GoogleAnalytics gaId='G-S80R5B2E8S' /> */}
      {/* <GoogleAnalytics gaId='G-5YWS2KPHSX' /> */}
    </html>
  );
}
