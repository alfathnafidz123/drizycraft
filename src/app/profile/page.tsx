/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import {
  accountIllustration,
  address,
  download,
  history,
  orders,
  paymentMethod,
  subscription,
} from '~/images';

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [activeMenu, setActiveMenu] = useState<number>(0);

  React.useEffect(() => {
    dispatch(setToken({ token: 'testing token' }));
  }, []);

  const items = [
    { src: address.src, text: 'Addresses' },
    { src: paymentMethod.src, text: 'Payment Methods' },
    { src: subscription.src, text: 'Subscriptions' },
    { src: orders.src, text: 'Orders' },
    { src: download.src, text: 'Download' },
    { src: history.src, text: 'History Project' },
  ];

  const renderMenu = () => {
    if (activeMenu == 0) {
      return (
        <>
          <div className='flex flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              New Password <span className='text-red-500'>*</span>
            </label>
            <input
              type='password'
              className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
              placeholder='Password'
              required
            ></input>
          </div>
          <div className='flex flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              Confirm Password <span className='text-red-500'>*</span>
            </label>
            <input
              type='password'
              className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
              placeholder='Password'
              required
            ></input>
          </div>
          <div className='mt-8 flex w-full justify-center'>
            <button className='rounded-full bg-[#008ECC] px-20 py-3 font-semibold text-[#e4f6fb]'>
              Set Password
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <main>
      <section className='flex gap-4 p-20'>
        <div className='flex basis-3/12 flex-col gap-12 pr-16'>
          <p className='text-3xl font-semibold'>My Account</p>
          <img
            className='w-[300px]'
            src={accountIllustration.src}
            alt='Sign Up'
          />
        </div>
        <div className='flex basis-2/12 flex-col'>
          <div className='flex flex-col gap-4 overflow-hidden rounded-lg border p-4 shadow-lg'>
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveMenu(index);
                }}
                className={
                  activeMenu === index
                    ? 'flex cursor-pointer items-center gap-4 text-[#4065D1]'
                    : 'flex cursor-pointer items-center gap-4 text-[#a2a6b6]'
                }
              >
                <Image src={item.src} width={24} height={24} alt='history' />
                <p className='font-semibold'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-[#F4F4F4] p-8 shadow-lg'>
          {renderMenu()}
        </div>
      </section>
    </main>
  );
}
