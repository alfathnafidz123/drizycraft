/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Head from 'next/head';
import * as React from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import AffiliateBanner from '@/components/AffiliateBanner';
import ProductCard from '@/components/ProductCard';
import ProductCategories from '@/components/ProductCategories';
import { crafter1 } from '~/images';

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
  console.log(token);

  return (
    <main>
      <section className='bg-sky-200'>
        <div className="items-center flex min-h-screen justify-center text-center text-[64px] font-katide-heavy leading-[120%] text-indigo-950">
          Combating Loneliness<br></br>with Creative Projects
        </div>
      </section>

      <section className="flex justify-center items-center py-9 text-base font-bold leading-4 text-white bg-white max-md:px-5">
        <div className="flex flex-col w-full max-w-[1400px] max-md:max-w-full">
          <div className="self-center text-2xl whitespace-nowrap text-indigo-950">
            Browse Product Categories
          </div>
          <div className="flex flex-wrap mt-12 pl-[8%]">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] xl:w-[19%]">
                <ProductCategories />
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="flex justify-center items-center py-9 text-base font-katide-extrabold leading-4 text-white bg-[#E1E3F4]">
        <div className="flex flex-col w-full max-w-[1400px] max-md:max-w-full">
          <div className="self-center text-[24px] whitespace-nowrap text-indigo-950">
            Browse Season Categories
          </div>
          <div className='pl-[10%]'>
            <div className="flex justify-center items-center px-2.5 h-[150px] w-[150px]">
              <img
                loading="lazy"
                src="https://img.freepik.com/premium-photo/background-from-ripe-juicy-strawberries-fruit-summer-background_1048944-8456341.jpg?w=360"
                className="aspect-square rounded-full border-[8px] border-stone-300"
              />
            </div>
            <div className="font-katide-bold text-black pl-[5%]">
              Fall
            </div>
          </div>
        </div>
      </section>


      <section>
        <div className="flex flex-col px-[10%] pt-2 pb-12 font-bold bg-blue-200 max-md:px-5">
          <div className="flex justify-between max-md:flex-wrap max-md:max-w-full ">
            <div className="mt-[4%] text-[24px] font-katide-bold leading-10 text-indigo-950 max-md:mt-10">
              Crafters
            </div>
            <img
              loading="lazy"
              src={crafter1.src}
              className="aspect-square w-[80px]"
            />
            <div className="flex gap-5 px-[6%] py-3 mt-2 my-auto bg-[#EE4C73] rounded-lg border border-orange-200 border-solid shadow-2xl max-md:flex-wrap max-md:px-5 max-md:max-w-full" style={{ boxShadow: '2.16px 8.65px 12.97px rgba(0, 0, 0, 0.35)', }}>
              <div className="flex-auto my-auto text-base max-md:max-w-full" >
                <span className="text-white">Upgrade your membership </span>
                <span className="italic text-amber-400">
                  for unlimited downloads
                </span>
              </div>
              <button className="justify-center px-5 py-2.5 text-sm leading-6 whitespace-nowrap bg-amber-400 rounded-lg border-orange-200 border-solid shadow border-[1.422px] text-indigo-950" style={{boxShadow: '1.54px 6.15px 9.22px rgba(0, 0, 0, 0.35)'}}>
                DRIZY VIP+
              </button>
            </div>
            <div className=" justify-end items-center flex">
              <div className="text-right text-indigo-950 text-base font-bold mt-12 leading-none">
                Explore Crafters
              </div>
              <img
                loading="lazy"
                src=""
                className="self-start w-1.5 aspect-[0.43] fill-blue-600"
              />
            </div>
          </div>
          <div className="flex mt-10 sm:flex-row md:gap-4 lg:flex-col lg:flex-nowrap xl:flex-nowrap xl:flex-row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col px-[10%] pt-2 pb-12 font-bold bg-[#E1E3F4] max-md:px-5">
          <div className="flex justify-between max-md:flex-wrap max-md:max-w-full ">
            <div className="mt-[4%] text-[24px] font-katide-bold leading-10 text-indigo-950 max-md:mt-10">
              Crafters
            </div>
            <div className="pl-5 justify-end items-center flex">
              <div className="text-right text-indigo-950 text-base font-bold mx-16 mt-12 leading-none">
                Explore Crafters
              </div>
              <img
                loading="lazy"
                src=""
                className="self-start w-1.5 aspect-[0.43] fill-blue-600"
              />
            </div>
          </div>
          <div className="flex mt-10 sm:flex-row md:gap-4 lg:flex-col lg:flex-nowrap xl:flex-nowrap xl:flex-row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>

      </section>

      <section>
        <div className="header flex justify-center items-center px-16 py-12 bg-blue-400 max-md:px-5">
          <div className="flex flex-col mt-6 max-w-full w-[708px]">
            <p className="self-center text-base line-[20px] text-center text-indigo-950 max-md:max-w-full">
              <span className="">Get </span>
              <span className="text-indigo-950 font-bold">10% off</span>
              <span className=""> your order and abundle of </span>
              <span className="font-bold">INSTANT FREEBIES! </span>
            </p>
            <div className="flex gap-0 justify-between mt-7 text-sm whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
              <input
                type="email"
                placeholder="Subscribe by email"
                className="grow justify-center items-start px-16 py-7 tracking-normal bg-violet-100 leading-[186%] rounded-[60px_0px_0px_60px] text-black max-md:px-5 max-md:max-w-">
              </input>
              <button
                className="button justify-center px-16 py-7 font-[14px] text-center text-white font-katide-bold rounded-[0px_60px_60px_0px] bg-indigo-950 max-md:px-5 hover:bg-[#2A3B80]"
                role="button"
                aria-label="Subscribe"
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
