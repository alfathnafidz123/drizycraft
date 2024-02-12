/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import AffiliateBanner from '@/components/AffiliateBanner';
import ProductCard from '@/components/ProductCard';
import ProductCategories from '@/components/ProductCategories';

import { coffeeHolder } from '~/images';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setToken({ token: 'testing token' }));
  }, []);

  // eslint-disable-next-line no-console
  console.log(coffeeHolder.src);

  return (
    <main>
      <section className='bg-sky-200'>
        <div className='font-katide-heavy flex min-h-screen items-center justify-center text-center text-6xl text-indigo-950'>
          <b>
            Combating Loneliness <br></br>with Creative Projects
          </b>
        </div>
      </section>

      <section className='flex items-center justify-center bg-white py-9 text-base font-bold leading-4 text-white max-md:px-5'>
        <div className='flex w-full max-w-[1400px] flex-col max-md:max-w-full'>
          <div className='self-center whitespace-nowrap text-2xl text-indigo-950'>
            Browse Product Categories
          </div>
          <div className='mt-12 flex flex-wrap pl-[8%]'>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className='w-full sm:w-[48%] md:w-[32%] lg:w-[24%] xl:w-[19%]'
              >
                <ProductCategories />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='flex items-center justify-center bg-[#E1E3F4] py-9 text-base font-bold leading-4 text-white'>
        <div className='flex w-full max-w-[1400px] flex-col max-md:max-w-full'>
          <div className='self-center whitespace-nowrap text-2xl text-indigo-950'>
            Browse Season Categories
          </div>
          <div className='pl-[10%]'>
            <div className='flex h-[150px] w-[150px] items-center justify-center px-2.5'>
              <img
                loading='lazy'
                src='https://img.freepik.com/premium-photo/background-from-ripe-juicy-strawberries-fruit-summer-background_1048944-8456341.jpg?w=360'
                className='aspect-square rounded-full border-[8px] border-stone-300'
              />
            </div>
            <div className='font-katide-bold pl-[5%] text-black'>Fall</div>
          </div>
        </div>
      </section>

      <section>
        <div className='flex flex-col bg-blue-200 px-16 pb-12 pt-2 font-bold max-md:px-5'>
          <div className='flex items-end justify-start gap-10 pb-8 max-md:max-w-full max-md:flex-wrap'>
            <div className='mt-10 flex grow flex-row items-end self-end pl-12 text-2xl leading-normal text-indigo-950 max-md:mt-10'>
              Crafters
              <img
                loading='lazy'
                src={coffeeHolder.src}
                className='ml-6 aspect-square w-[76px]'
                alt='coffee holder'
              />
            </div>
            <div
              className='flex gap-5 rounded-lg border border-solid border-orange-200 bg-rose-500 px-14 py-3.5 shadow-2xl max-md:max-w-full max-md:flex-wrap'
              style={{ boxShadow: '2.16px 8.65px 12.97px rgba(0, 0, 0, 0.35)' }}
            >
              <div className='my-auto flex-auto text-base leading-9 max-md:max-w-full'>
                <span className='text-white'>Upgrade your membership </span>
                <span className='italic text-amber-400'>
                  for unlimited downloads
                </span>
              </div>
              <div className='justify-center whitespace-nowrap rounded-lg border-[1.422px] border-solid border-orange-200 bg-amber-400 px-5 py-2.5 text-sm leading-6 text-indigo-950 shadow'>
                DRIZY VIP+
              </div>
            </div>
            <div className='flex items-center justify-end pl-5'>
              <div className='mx-16 mt-12 text-right text-base font-bold leading-none text-indigo-950'>
                Explore Crafters
              </div>
              <img
                loading='lazy'
                src=''
                className='aspect-[0.43] w-1.5 self-start fill-blue-600'
              />
            </div>
          </div>
          <div className='mt-10 flex sm:flex-row md:gap-4 lg:flex-col lg:flex-nowrap xl:flex-row xl:flex-nowrap'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      <section>
        <div className='header flex items-center justify-center bg-blue-400 px-16 py-12 max-md:px-5'>
          <div className='mt-6 flex w-[708px] max-w-full flex-col'>
            <p className='line-[20px] self-center text-center text-base text-indigo-950 max-md:max-w-full'>
              <span className=''>Get </span>
              <span className='font-bold text-indigo-950'>10% off</span>
              <span className=''> your order and abundle of </span>
              <span className='font-bold'>INSTANT FREEBIES! </span>
            </p>
            <div className='mt-7 flex justify-between gap-0 whitespace-nowrap text-sm max-md:max-w-full max-md:flex-wrap'>
              <input
                type='email'
                placeholder='Subscribe by email'
                className='max-md:max-w- grow items-start justify-center rounded-[60px_0px_0px_60px] bg-violet-100 px-16 py-7 leading-[186%] tracking-normal text-black max-md:px-5'
              ></input>
              <button
                className='button font-katide-bold justify-center rounded-[0px_60px_60px_0px] bg-indigo-950 px-16 py-7 text-center font-[14px] text-white hover:bg-[#2A3B80] max-md:px-5'
                role='button'
                aria-label='Subscribe'
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <AffiliateBanner />
    </main>
  );
}
