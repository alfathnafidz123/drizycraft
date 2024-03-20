'use client';

import * as React from 'react';

export default function Register() {
  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <p className='pl-4 text-lg font-semibold text-[#1A214C]'>Address</p>
        <p className='pl-4 text-lg text-[#1A214C]'>
          The following addresses will be used on the checkout page by default.
        </p>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <label className='my-4 pl-4 font-semibold text-[#1A214C]'>
              Billing address
            </label>
            <textarea
              className='my-2 w-[300px] rounded-2xl border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='Address'
              required
            ></textarea>
            <p className='text-[#61A9FA]'>edit</p>
          </div>
          <div className='flex flex-col'>
            <label className='my-4 pl-4 font-semibold text-[#1A214C]'>
              Shipping address
            </label>
            <textarea
              className='my-2 w-[300px] rounded-2xl border border-[#abaaab] p-4 placeholder-[#abaaab]'
              placeholder='Address'
              required
            ></textarea>
            <p className='text-[#61A9FA]'>edit</p>
          </div>
        </div>
      </div>
    </>
  );
}
