/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import {
  account,
  accountIllustration,
  address,
  defaultAvatar,
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
    { src: account.src, text: 'Account Details' },
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
          <div className='flex w-full flex-col gap-2'>
            <p className='pl-4 text-lg font-semibold text-[#1A214C]'>
              Account Details
            </p>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <label className='pl-4 text-[#1A214C]'>
                  First Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                  placeholder='Name'
                  required
                ></input>
              </div>
              <div className='flex flex-col'>
                <label className='pl-4 text-[#1A214C]'>
                  Last Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                  placeholder='Name'
                  required
                ></input>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <label className='pl-4 text-[#1A214C]'>
                  Display Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                  placeholder='Display Name'
                  required
                ></input>
              </div>
              <div className='flex flex-col'>
                <label className='pl-4 text-[#1A214C]'>
                  Email Address <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='border-grey-700 my-2 w-[300px] rounded-full border p-4'
                  placeholder='name@gmail.com'
                  required
                ></input>
              </div>
            </div>
            <p className='w-1/2 text-sm italic text-[#1A214C]/50'>
              This will be how your name will be displayed in the account
              section and in reviews.
            </p>
          </div>

          <div className='mb-4 mt-8 flex w-full'>
            <div className='basis-1/12 border-b border-[#1A214C]/25' />
            <p className='mx-4 -mb-3 font-semibold text-[#1A214C]'>
              Password change
            </p>
            <div className='flex-grow border-b border-[#1A214C]/25' />
          </div>
          <div className='flex w-full flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              Current password (leave blank to leave unchanged)
            </label>
            <input
              type='text'
              className='border-grey-700 my-2 w-full rounded-full border p-4'
              required
            ></input>
          </div>
          <div className='flex w-full flex-col'>
            <label className='pl-4 text-[#1A214C]'>
              New password (leave blank to leave unchanged)
            </label>
            <input
              type='text'
              className='border-grey-700 my-2 w-full rounded-full border p-4'
              required
            ></input>
          </div>
          <div className='flex w-full flex-col'>
            <label className='pl-4 text-[#1A214C]'>Confirm new password</label>
            <input
              type='text'
              className='border-grey-700 my-2 w-full rounded-full border p-4'
              required
            ></input>
          </div>
          <div className='mt-8 flex w-full justify-center'>
            <button className='rounded-full bg-[#008ECC] px-20 py-3 font-semibold text-[#e4f6fb]'>
              Submit
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
        <div className='flex basis-2/12 flex-col gap-8'>
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
            <button className='mx-4 mt-4 rounded-full bg-[#008ECC] px-4 py-2 text-white'>
              Logout
            </button>
          </div>
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
          {renderMenu()}
        </div>
      </section>
    </main>
  );
}
