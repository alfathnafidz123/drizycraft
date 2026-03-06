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

import RootClientLayout from "./RootClientLayout";

// import LoadingComponent from '@/components/Loading';
import FacebookPixelEvents from '@/components/pixel-events';

import Loading from '@/app/loading';
import StoreProvider from '@/app/StoreProvider';
// const StoreProvider = lazy(() => import('@/app/StoreProvider'));
import { siteConfig } from '@/constant/config';
import AsyncCSSSlick from '@/layout/asyncCssSlick';
import AsyncCSSThemeSlick from '@/layout/asyncCssThemeSlick';
import { generateMetadata } from '@/lib/seo';
import { disableConsole } from '@/lib/disableConsole';

const Footer = lazy(() => import('@/layout/footer'));
const Navbar = lazy(() => import('@/layout/navbar'));

export const metadata: Metadata = {
  metadataBase: new URL("https://drizycraft.com"),
  title: {
    default:
      "Drizy Craft – Premium SVG Cut Files for Cricut & Silhouette",
    template: "%s",
  },
  description:
    "Drizy Craft provides premium SVG cut files for Cricut & Silhouette. Unique designs, instant downloads, and creative assets for makers worldwide.",
  keywords: [
    "SVG files",
    "Cricut SVG",
    "Silhouette SVG",
    "Craft SVG",
    "Cut files",
    "Drizycraft",
    "Drizy Craft",
    "3d svg file",
    "laser cut svg",
    "cnc svg",
    "digital svg product",
    "svg for laser cutting",
  ],
  authors: [{ name: "Drizy Craft" }],
  creator: "Drizy Craft",
  publisher: "Drizy Craft",

  alternates: {
    canonical: "https://drizycraft.com",
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
    url: "https://drizycraft.com",
    title:
      "Drizy Craft – Premium SVG Cut Files for Cricut & Silhouette",
    description:
      "Premium SVG cut files for Cricut & Silhouette. Instant download and high-quality designs for craft creators.",
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
      "Drizy Craft – Premium SVG Cut Files for Cricut & Silhouette",
    description:
      "Premium SVG cut files, instant downloads, and creative craft designs.",
    images: ["https://drizycraft.com/og-image.jpg"],
  },
};

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  disableConsole()
  return (
    <>
    <html className='!scroll-smooth' lang='en'>
      <head>
        <link rel="canonical" href="https://drizycraft.com/" />
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
            <RootClientLayout>{children}</RootClientLayout>
            {/*{children}*/}
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
    </>
  );
}
