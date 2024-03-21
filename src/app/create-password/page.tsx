/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import { loginImage } from '~/images';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function Register() {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setToken({ token: 'testing token' }));
  }, []);

  return (
    <main>
      <section className='flex p-20'>
        <div className='flex basis-5/12 flex-col gap-12 pr-16'>
          <p className='text-3xl font-semibold'>Create Password</p>
          <p>
            Your personal data will be used to enhance your website experience,
            manage account access, and fulfill other purposes outlined in our{' '}
            <span className='font-semibold'>privacy policy.</span>
          </p>
          <img className='w-[300px]' src={loginImage.src} alt='Sign Up' />
        </div>
        <div className='flex h-1/2 flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-[#E5F6FB] p-8 shadow-lg'>
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
        </div>
      </section>
    </main>
  );
}
