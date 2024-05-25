'use client';
import Image from 'next/image';
import * as React from 'react';
import Lottie from 'react-lottie';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import ProfileMenu from '@/components/sidebar/sidebar';

import { defaultAvatar } from '~/images';
import animationData from '~/lottie/002_EDIT_MY_ACCOUNT-600px.json';

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
//       name: 'Dionisius Aditya',
//       url: 'https://github.com/dionisius77',
//     },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <section className='flex gap-4 p-20'>
        <div className='flex basis-3/12 flex-col gap-12 pr-16'>
          <p className='text-3xl font-semibold'>My Account</p>
          {/* <Image
            className='w-[300px]'
            src={accountIllustration.src}
            alt='Sign Up'
            width={300}
            height={300}
          /> */}
          <div className='max-w-[300px]'>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData, // the animation data
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
            />
          </div>
        </div>
        <div className='flex basis-2/12 flex-col gap-8'>
          <ProfileMenu />
          <div className='flex flex-col items-center gap-4 overflow-hidden rounded-lg border p-4 shadow-lg'>
            <p className='font-semibold text-[#1A214C]'>My profile picture</p>
            <Image
              src={defaultAvatar.src}
              width={98}
              height={98}
              alt='Avatar'
            />
            <button className='rounded-full bg-[#E4F6FB] px-8 py-2 font-semibold text-[#4065D1]'>
              Change picture
            </button>
          </div>
        </div>
        <div className='flex h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-[#F4F4F4] p-8 shadow-lg'>
          {children}
        </div>
      </section>
    </main>
  );
}
