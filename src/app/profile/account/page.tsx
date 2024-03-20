/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';

import { setToken } from '@/lib/slices/user';
import { useAppDispatch } from '@/lib/store';

export default function Register() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setToken({ token: 'testing token' }));
  }, []);

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
              className='my-2 w-[300px] rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
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
              className='my-2 w-[300px] rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
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
              className='my-2 w-[300px] rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
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
              className='my-2 w-[300px] rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='name@gmail.com'
              required
            ></input>
          </div>
        </div>
        <p className='w-1/2 text-sm italic text-[#1A214C]/50'>
          This will be how your name will be displayed in the account section
          and in reviews.
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
          className='my-2 w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          required
        ></input>
      </div>
      <div className='flex w-full flex-col'>
        <label className='pl-4 text-[#1A214C]'>
          New password (leave blank to leave unchanged)
        </label>
        <input
          type='text'
          className='my-2 w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
          required
        ></input>
      </div>
      <div className='flex w-full flex-col'>
        <label className='pl-4 text-[#1A214C]'>Confirm new password</label>
        <input
          type='text'
          className='my-2 w-full rounded-full border border-[#abaaab] p-4 placeholder-[#abaaab]'
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
