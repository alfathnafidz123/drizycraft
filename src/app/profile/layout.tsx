import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
const ProfileLottie = dynamic(() => import('@/components/lottie/profile'), { ssr: false });

import ChangeAvatar from '@/components/sidebar/change-avatar';
import ProfileMenu from '@/components/sidebar/sidebar';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.title,
//     template: `%s | ${siteConfig.title}`,
//   },
//   description: siteConfig.description,
//   robots: { index: true, follow: true },
//   // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
//   // ! copy to /favicon folder
//   icons: {
//     icon: '/favicon/favicon.ico',
//     shortcut: '/favicon/favicon-16x16.png',
//     apple: '/favicon/apple-touch-icon.png',
//   },
//   manifest: `/favicon/site.webmanifest`,
//   openGraph: {
//     url: siteConfig.url,
//     title: siteConfig.title,
//     description: siteConfig.description,
//     siteName: siteConfig.title,
//     images: [`${siteConfig.url}/images/og.jpg`],
//     type: 'website',
//     locale: 'en_US',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: siteConfig.title,
//     description: siteConfig.description,
//     images: [`${siteConfig.url}/images/og.jpg`],
//   },
//   authors: [
//     {
//       name: 'Drizycraft',
//       url: 'https://github.com/itdrizy',
//     },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      <section className='flex flex-col xl:flex-row gap-4 p-2 xl:py-20 mx-auto w-full max-w-[1164px]'>
        <div className='flex lg:basis-3/12 flex-col gap-12 min-w-[287px]'>
          <p className='text-3xl font-semibold'>My Account</p>
          {/* <Image
            className='w-[300px]'
            src={accountIllustration.src}
            alt='Sign Up'
            width={300}
            height={300}
          /> */}
          <div className='hidden md:block max-w-[300px]'>
            <ProfileLottie />
          </div>
        </div>
        <div className='flex basis-2/12 flex-col gap-8 min-w-[192px]'>
          <ProfileMenu />
          <ChangeAvatar />
        </div>
        <div className='flex h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-[#F4F4F4] p-8 shadow-lg'>
          {children}
        </div>
      </section>
    </main>
  );
}
