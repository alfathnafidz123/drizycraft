'use client';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { fetchProfile } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import ProfileLottie from '@/components/lottie/profile';
import ProfileMenu from '@/components/sidebar/sidebar';

import { defaultAvatar } from '~/images';

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
  children: ReactNode;
}) {
  const { dataUser, token } = useAppSelector(state => state.user);
  const [avatar, setAvatar] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChangeAvatar = useCallback(async () => {
    if (avatar && avatar[0] && token) {
      try {
        setLoading(true);
        const bodyFormData = new FormData();
        bodyFormData.append("file", avatar[0]);
        bodyFormData.append("type", "OTHER_URL");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDIA_URL}/image`,
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
            body: bodyFormData,
          },
        );
        const imgResponse = await response.json();
        const imageUrl = imgResponse.data.filename;
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/avatar`,
          {
            "avatar": imageUrl,
          },
          { headers: { "Authorization": `Bearer ${token}` } }
        );
        dispatch(fetchProfile(token));
      } catch (error) {
        toast.error("Failed to update avatar");
      } finally {
        setLoading(false);
      }
    }
  }, [avatar, token]);

  useEffect(() => {
    handleChangeAvatar();
  }, [avatar, handleChangeAvatar])

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
          <div className='max-w-[300px]'>
            <ProfileLottie />
          </div>
        </div>
        <div className='flex basis-2/12 flex-col gap-8 min-w-[192px]'>
          <ProfileMenu />
          <div className='flex flex-col items-center gap-4 overflow-hidden rounded-lg border p-4 shadow-lg'>
            <p className='font-semibold text-[#1A214C]'>My profile picture</p>
            <Image
              src={dataUser?.avatar ?? defaultAvatar.src}
              width={98}
              height={98}
              alt='Avatar'
            />
            <label htmlFor="avatar" className='rounded-full bg-[#E4F6FB] py-2 font-semibold text-[#4065D1] w-full text-center cursor-pointer flex items-center justify-center'>
              {loading ? <Loader className='animate-spin' /> : "Change picture"}
            </label>
            <input id='avatar' type="file" className='hidden' accept='image/*' onChange={(e) => { setAvatar(e.target.files) }} />
          </div>
        </div>
        <div className='flex h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-[#F4F4F4] p-8 shadow-lg'>
          {children}
        </div>
      </section>
    </main>
  );
}
